"""
Allela Backend — DNA risk analysis API
FastAPI application: file upload, risk scoring, Stripe payments, report retrieval.
"""
import os
import uuid
import stripe
from fastapi import FastAPI, File, UploadFile, HTTPException, Request, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from typing import Optional
from dotenv import load_dotenv
from supabase import create_client, Client

from parser import parse_dna_file
from risk_engine import score_all

load_dotenv()

# ── Config ─────────────────────────────────────────────────────────────────
SUPABASE_URL              = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
STRIPE_SECRET_KEY         = os.getenv("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET     = os.getenv("STRIPE_WEBHOOK_SECRET", "")
STRIPE_PRICE_ID           = os.getenv("STRIPE_PRICE_ID", "")
FRONTEND_URL              = os.getenv("FRONTEND_URL", "http://localhost:3000")
REPORT_PRICE_CENTS        = int(os.getenv("REPORT_PRICE_CENTS", "4900"))

stripe.api_key = STRIPE_SECRET_KEY

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

# ── App ────────────────────────────────────────────────────────────────────
app = FastAPI(title="Allela API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Health ─────────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "ok", "service": "allela-backend"}


# ── Step 1: Upload + Analyze DNA ───────────────────────────────────────────
@app.post("/analyze")
async def analyze(file: UploadFile = File(...), email: Optional[str] = None):
    """
    Accept raw DNA file, parse and score it.
    Returns a report_id. Report is gated behind payment.
    Raw file content is never stored — discarded after parsing.
    """
    # File validation
    if file.size and file.size > 50 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Maximum 50MB.")

    content = await file.read()
    # Do NOT store content — parse immediately and discard
    try:
        snps, fmt, snp_count = parse_dna_file(content)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    finally:
        del content  # explicit discard

    # Score
    try:
        scores = score_all(snps)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scoring error: {str(e)}")
    finally:
        del snps  # explicit discard

    # Create pending report in DB
    report_id = str(uuid.uuid4())
    supabase.table("reports").insert({
        "id": report_id,
        "status": "pending_payment",
        "format_detected": fmt,
        "snp_count": snp_count,
        "scores": scores,
        "email": email,
    }).execute()

    return {"report_id": report_id, "snp_count": snp_count, "format": fmt}


# ── Step 2: Create Stripe Checkout ────────────────────────────────────────
class CheckoutRequest(BaseModel):
    report_id: str
    email: Optional[str] = None


@app.post("/payment/checkout")
async def create_checkout(body: CheckoutRequest):
    """Create a Stripe Checkout session for a pending report."""
    # Verify report exists and is awaiting payment
    result = supabase.table("reports").select("id,status").eq("id", body.report_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Report not found.")
    report = result.data[0]
    if report["status"] not in ("pending_payment",):
        raise HTTPException(status_code=400, detail=f"Report status is '{report['status']}' — cannot create payment.")

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": "Allela DNA Risk Report"},
                    "unit_amount": REPORT_PRICE_CENTS,
                },
                "quantity": 1,
            }],
            mode="payment",
            customer_email=body.email,
            success_url=f"{FRONTEND_URL}/report/{body.report_id}?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{FRONTEND_URL}/upload?cancelled=1",
            metadata={"report_id": body.report_id},
        )
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=500, detail=f"Stripe error: {str(e)}")

    # Create pending payment record
    supabase.table("payments").insert({
        "stripe_session_id": session.id,
        "stripe_payment_intent_id": session.payment_intent or session.id,
        "amount_cents": REPORT_PRICE_CENTS,
        "status": "pending",
    }).execute()

    return {"checkout_url": session.url, "session_id": session.id}


# ── Step 3: Stripe Webhook ────────────────────────────────────────────────
@app.post("/payment/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    """Handle Stripe payment events. Verifies webhook signature."""
    payload = await request.body()

    try:
        event = stripe.Webhook.construct_event(
            payload, stripe_signature, STRIPE_WEBHOOK_SECRET
        )
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid webhook signature.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Webhook error: {str(e)}")

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        report_id = session.get("metadata", {}).get("report_id")
        session_id = session["id"]

        if report_id:
            # Mark payment as paid
            supabase.table("payments").update({"status": "paid"}).eq("stripe_session_id", session_id).execute()

            # Get payment id
            pay = supabase.table("payments").select("id").eq("stripe_session_id", session_id).execute()
            payment_id = pay.data[0]["id"] if pay.data else None

            # Unlock report
            supabase.table("reports").update({
                "status": "ready",
                "payment_id": payment_id,
            }).eq("id", report_id).execute()

    return {"received": True}


# ── Step 4: Retrieve Report ────────────────────────────────────────────────
@app.get("/report/{report_id}")
async def get_report(report_id: str, session_id: Optional[str] = None):
    """
    Return risk report. Requires either:
    - Report status = 'ready' (payment confirmed via webhook), OR
    - Valid Stripe session_id proving payment just completed
    """
    result = supabase.table("reports").select("*").eq("id", report_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Report not found.")

    report = result.data[0]

    # Access control: check payment
    if report["status"] != "ready":
        # Fallback: verify session_id directly with Stripe
        if session_id:
            try:
                session = stripe.checkout.Session.retrieve(session_id)
                if session.payment_status == "paid" and session.metadata.get("report_id") == report_id:
                    # Unlock now (webhook may have been delayed)
                    supabase.table("reports").update({"status": "ready"}).eq("id", report_id).execute()
                    report["status"] = "ready"
                else:
                    raise HTTPException(status_code=402, detail="Payment required.")
            except stripe.error.StripeError:
                raise HTTPException(status_code=402, detail="Payment required.")
        else:
            raise HTTPException(status_code=402, detail="Payment required.")

    return {
        "report_id": report["id"],
        "format_detected": report["format_detected"],
        "snp_count": report["snp_count"],
        "scores": report["scores"],
        "created_at": report["created_at"],
    }


# ── Entrypoint ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
