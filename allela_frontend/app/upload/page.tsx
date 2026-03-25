"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../components/Logo";

const SAMPLE_PROFILES = [
  {
    id: "high-cardiovascular-risk",
    label: "High Cardiovascular Risk",
    icon: "❤️",
    desc: "APOE e3/e4 · Factor V Leiden carrier · CYP2C19 poor metabolizer · high IL-6 inflammation",
    file: "/samples/high-cardiovascular-risk.txt",
  },
  {
    id: "athletic-longevity",
    label: "Athletic & Longevity",
    icon: "🏃",
    desc: "ACTN3 power gene · FOXO3 longevity alleles · low inflammation · fast caffeine metabolism",
    file: "/samples/athletic-longevity.txt",
  },
  {
    id: "nutrition-mthfr",
    label: "Nutrition & MTHFR",
    icon: "🥑",
    desc: "Compound MTHFR · lactose intolerant · low vitamin D · ALDH2 alcohol flush · low omega-3 conversion",
    file: "/samples/nutrition-mthfr.txt",
  },
  {
    id: "carrier-screening",
    label: "Carrier Screening Focus",
    icon: "🧬",
    desc: "CF carrier · Sickle Cell carrier · Tay-Sachs carrier · VKORC1 warfarin sensitive · DRD2 reward",
    file: "/samples/carrier-screening.txt",
  },
];

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Stage = "idle" | "parsing" | "scoring" | "checkout" | "error";

export default function UploadPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("idle");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [email, setEmail] = useState("");
  const handleFile = useCallback(async (file: File) => {
    if (!file.name.endsWith(".txt") && file.type !== "text/plain") {
      setError("Please upload a .txt file exported from 23andMe, AncestryDNA, or MyHeritage.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError("File too large. Please use the raw data .txt export (usually 5–30 MB).");
      return;
    }

    setError("");
    setStage("parsing");

    const formData = new FormData();
    formData.append("file", file);
    if (email) formData.append("email", email);

    let reportId: string;
    try {
      const res = await fetch(`${API}/analyze`, { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Analysis failed.");
      }
      const data = await res.json();
      reportId = data.report_id;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Analysis failed. Please try again.");
      setStage("error");
      return;
    }

    setStage("checkout");

    // Create Stripe checkout session
    try {
      const res = await fetch(`${API}/payment/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report_id: reportId, email: email || null }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Payment setup failed.");
      }
      const data = await res.json();
      // Redirect to Stripe Checkout
      window.location.href = data.checkout_url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Payment setup failed.");
      setStage("error");
    }
  }, [email]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const isProcessing = stage === "parsing" || stage === "scoring" || stage === "checkout";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: "var(--background)" }}>

      {/* Header */}
      <div className="text-center mb-10">
        <a href="/"><Logo size={26} /></a>
        <h1 className="text-3xl font-bold mt-6 mb-3" style={{ color: "var(--foreground)" }}>
          Upload your DNA file
        </h1>
        <p className="text-sm max-w-md" style={{ color: "var(--muted)" }}>
          Export your raw data from 23andMe, AncestryDNA, or MyHeritage.
          Your file is parsed in memory and never stored.
        </p>
      </div>

      {/* Upload Card */}
      <div className="w-full max-w-lg rounded-2xl p-8" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

        {/* Email (optional) */}
        <div className="mb-6">
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>
            Email (optional — for report delivery)
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg px-4 py-2 text-sm outline-none focus:ring-2"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>

        {/* Sample profiles */}
        {!isProcessing && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                Try a sample profile
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              <Link href="/demo" className="text-xs" style={{ color: "var(--accent)" }}>
                preview report →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_PROFILES.map(p => (
                <button
                  key={p.id}
                  onClick={() => router.push(`/demo?profile=${p.id}`)}
                  className="text-left p-3 rounded-xl transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer"
                  style={{ background: "var(--card-alt)", border: "1px solid var(--border)" }}
                >
                  <div className="text-lg mb-1">{p.icon}</div>
                  <div className="text-xs font-semibold leading-tight" style={{ color: "var(--foreground)" }}>{p.label}</div>
                  <div className="text-xs mt-1 leading-tight" style={{ color: "var(--muted)" }}>{p.desc}</div>
                  <div className="text-xs mt-2 font-semibold" style={{ color: "var(--accent)" }}>View sample report →</div>
                </button>
              ))}
            </div>
            <div className="mt-3 text-center text-xs" style={{ color: "var(--muted)" }}>
              — or upload your own file below —
            </div>
          </div>
        )}

        {/* Drop zone */}
        {!isProcessing && (
          <label
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className="flex flex-col items-center justify-center rounded-xl p-10 cursor-pointer transition-all"
            style={{
              border: `2px dashed ${dragOver ? "var(--accent)" : "var(--border)"}`,
              background: dragOver ? "var(--accent-glow)" : "transparent",
            }}
          >
            <input type="file" accept=".txt,text/plain" className="hidden" onChange={onInputChange} />
            <div className="text-4xl mb-4">🧬</div>
            <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
              Drop your DNA file here
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>or click to browse</p>
            <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>.txt format · 5–30 MB typical</p>
          </label>
        )}

        {/* Processing states */}
        {isProcessing && (
          <div className="flex flex-col items-center py-10 gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
            <p className="font-semibold" style={{ color: "var(--foreground)" }}>
              {stage === "parsing" && "Parsing your DNA file..."}
              {stage === "scoring" && "Scoring variants..."}
              {stage === "checkout" && "Setting up secure payment..."}
            </p>
            <p className="text-xs text-center max-w-xs" style={{ color: "var(--muted)" }}>
              {stage === "parsing" && "Identifying ~600,000 SNPs from your file."}
              {stage === "scoring" && "Matching against 30+ published studies."}
              {stage === "checkout" && "Redirecting to Stripe..."}
            </p>
          </div>
        )}

        {/* Error */}
        {stage === "error" && (
          <div className="mt-4 p-4 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
            <p className="text-sm text-red-400">{error}</p>
            <button onClick={() => setStage("idle")} className="text-xs mt-2 underline text-red-400">
              Try again
            </button>
          </div>
        )}

        {error && stage !== "error" && (
          <p className="text-sm text-red-400 mt-3">{error}</p>
        )}
      </div>

      {/* Privacy note */}
      <div className="mt-6 text-center text-xs max-w-sm" style={{ color: "var(--muted)" }}>
        🔒 Your raw DNA file is parsed in memory and immediately discarded.
        Only derived risk scores are stored to generate your report.
      </div>

      {/* How to export */}
      <details className="mt-6 max-w-lg w-full">
        <summary className="text-xs cursor-pointer font-semibold" style={{ color: "var(--accent)" }}>
          How do I export my raw data? (9 providers)
        </summary>
        <div className="mt-3 rounded-xl text-xs overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          {[
            { name: "23andMe",           steps: "Name → Settings → '23andMe Data' → Download Raw Data → All DNA Data → confirm via email" },
            { name: "AncestryDNA",       steps: "DNA → Settings (gear) → Download Raw DNA Data → confirm via email → extract .txt from .zip" },
            { name: "MyHeritage",        steps: "DNA → Manage DNA Kits → three-dot menu → Download raw DNA data → confirm via email" },
            { name: "FamilyTreeDNA",     steps: "My DNA → Download Raw Data → Autosomal Data → Download CSV" },
            { name: "LivingDNA",         steps: "Account → Raw data download → Download raw data → confirm via email" },
            { name: "Genos",             steps: "My Data → Download → Raw Genome Data → download VCF or flat file" },
            { name: "DNA.land",          steps: "Profile → Manage Files → click Download on your uploaded genome file" },
            { name: "Genes for Good",    steps: "My Data → Download Genetic Data → save .txt export" },
            { name: "GenomeStudio",      steps: "Analysis → Final Report → export tab-delimited .txt with rsID, Chr, Position, Allele columns" },
          ].map((p, i, arr) => (
            <div key={p.name} className="px-4 py-3" style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
              <span className="font-bold" style={{ color: "var(--foreground)" }}>{p.name}: </span>
              <span style={{ color: "var(--muted)" }}>{p.steps}</span>
            </div>
          ))}
        </div>
      </details>
    </main>
  );
}
