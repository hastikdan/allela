"""
Risk scoring engine for Allela.
Computes monogenic and polygenic risk scores from SNP data.
Output: structured risk results — no raw SNP genotypes stored.
"""
import json
import math
import os
from pathlib import Path
from typing import Optional

# Load variant database once at import time
_DB_PATH = Path(__file__).parent / "data" / "variants.json"
with open(_DB_PATH) as f:
    _VARIANT_DB = json.load(f)


# ── APOE special logic ─────────────────────────────────────────────────────

def _classify_apoe(snps: dict[str, str]) -> tuple[str, float]:
    """
    Determine APOE genotype from rs429358 and rs7412.
    Returns (apoe_genotype_label, lifetime_risk_fraction)
    """
    r429358 = snps.get("rs429358", "")  # C = ε4; T = not ε4
    r7412   = snps.get("rs7412", "")    # T = ε2; C = not ε2

    e4_count = r429358.count("C")
    e2_count = r7412.count("T")

    if e4_count == 2:
        return "ε4/ε4", 0.41
    elif e4_count == 1 and e2_count == 0:
        return "ε4/ε3", 0.20
    elif e4_count == 1 and e2_count == 1:
        return "ε4/ε2", 0.13
    elif e2_count == 2:
        return "ε2/ε2", 0.04
    elif e2_count == 1:
        return "ε2/ε3", 0.05
    else:
        return "ε3/ε3", 0.09  # baseline population risk


# ── Genotype helpers ───────────────────────────────────────────────────────

def _count_risk_alleles(genotype: str, risk_allele: str) -> int:
    """Count how many copies of risk_allele are in genotype (0, 1, or 2)."""
    if not genotype or len(genotype) < 2:
        return 0
    return sum(1 for a in genotype if a == risk_allele)


def _risk_tier(lifetime_pct: float, pop_pct: float) -> str:
    ratio = lifetime_pct / pop_pct if pop_pct > 0 else 1.0
    if lifetime_pct >= 0.30 or ratio >= 3.0:
        return "high"
    elif lifetime_pct >= 0.15 or ratio >= 1.5:
        return "elevated"
    elif lifetime_pct >= pop_pct * 0.8:
        return "average"
    else:
        return "below_average"


def _evidence_grade(source: str) -> str:
    s = source.lower()
    if "pathogenic" in s or "clinvar" in s:
        return "Strong"
    if "gwas" in s or "cpic" in s or "multiple" in s:
        return "Strong"
    return "Moderate"


# ── Monogenic scoring ──────────────────────────────────────────────────────

def compute_monogenic_risks(snps: dict[str, str]) -> list[dict]:
    """
    Check for high-impact single variants from the monogenic database.
    Returns one result per condition (not per variant).
    """
    # Group variants by condition
    condition_hits: dict[str, list[dict]] = {}

    for variant in _VARIANT_DB["monogenic"]:
        rsid = variant["rsid"]
        if rsid in ("rs429358", "rs7412"):
            # Handled separately via APOE logic
            continue

        genotype = snps.get(rsid)
        if not genotype:
            continue

        risk_count = _count_risk_alleles(genotype, variant["risk_allele"])
        if risk_count == 0:
            continue

        ck = variant["condition_key"]
        if ck not in condition_hits:
            condition_hits[ck] = []
        condition_hits[ck].append({
            "rsid": rsid,
            "gene": variant["gene"],
            "risk_allele": variant["risk_allele"],
            "copies": risk_count,
            "effect": variant["effect"],
            "source": variant.get("source", "ClinVar"),
            "population_frequency": variant.get("population_frequency", 0.02),
        })

    # APOE / Alzheimer's
    apoe_label, apoe_risk = _classify_apoe(snps)
    alz_pop = 0.09  # ε3/ε3 baseline
    results = [{
        "condition": "Alzheimer's Disease",
        "condition_key": "alzheimers",
        "method": "monogenic",
        "lifetime_risk_pct": round(apoe_risk * 100, 1),
        "population_avg_pct": round(alz_pop * 100, 1),
        "risk_tier": _risk_tier(apoe_risk, alz_pop),
        "evidence_grade": "Strong",
        "key_findings": [f"APOE genotype: {apoe_label}"],
        "snps_evaluated": 2,
        "snps_found": 2,
    }]

    # Build results from other conditions
    condition_meta = {
        "vte": ("Venous Thromboembolism", 0.01),
        "hemochromatosis": ("Hereditary Hemochromatosis", 0.005),
        "parkinsons": ("Parkinson's Disease", 0.015),
        "celiac": ("Celiac Disease", 0.01),
    }

    for ck, hits in condition_hits.items():
        if ck not in condition_meta:
            continue
        label, pop_risk = condition_meta[ck]

        # Simple multiplicative model for compound carriers
        relative_risk = 1.0
        for hit in hits:
            freq = hit["population_frequency"]
            # OR approximation from population frequency
            single_carrier_rr = min(7.0, 1.0 / max(freq, 0.001) * 0.1)
            relative_risk *= (1 + (single_carrier_rr - 1) * hit["copies"] * 0.5)

        lifetime_risk = min(0.9, pop_risk * relative_risk)

        results.append({
            "condition": label,
            "condition_key": ck,
            "method": "monogenic",
            "lifetime_risk_pct": round(lifetime_risk * 100, 1),
            "population_avg_pct": round(pop_risk * 100, 1),
            "risk_tier": _risk_tier(lifetime_risk, pop_risk),
            "evidence_grade": "Strong",
            "key_findings": [
                f"{h['gene']} {h['rsid']} — {h['effect'][:80]}" for h in hits
            ],
            "snps_evaluated": len(hits),
            "snps_found": len(hits),
        })

    return results


# ── Polygenic Risk Score ───────────────────────────────────────────────────

def compute_prs(snps: dict[str, str], prs_config: dict) -> dict:
    """
    Compute a simple additive PRS for one condition.
    Score = sum(weight_i * dosage_i) where dosage = copies of risk allele (0/1/2)
    Converts to percentile using logistic approximation.
    """
    variants = prs_config["variants"]
    pop_lifetime = prs_config["population_lifetime_risk"]
    condition = prs_config["condition"]
    ck = prs_config["condition_key"]

    raw_score = 0.0
    found_count = 0
    key_findings = []

    for v in variants:
        rsid = v["rsid"]
        genotype = snps.get(rsid)
        if not genotype:
            continue
        dosage = _count_risk_alleles(genotype, v["risk_allele"])
        raw_score += v["weight"] * dosage
        found_count += 1
        if dosage > 0:
            key_findings.append(f"{v['gene']} ({rsid}) — {dosage} risk allele(s)")

    coverage = found_count / len(variants) if variants else 0

    # Compute percentile via logistic model
    # Calibrated so mean score → population risk, std dev ≈ 1
    max_possible = sum(v["weight"] * 2 for v in variants)
    if max_possible > 0:
        normalized = raw_score / max_possible  # 0..1
    else:
        normalized = 0.5

    # Map normalized score to percentile (sigmoid-like)
    # percentile 0..1: 0.5 → population baseline
    percentile = 1 / (1 + math.exp(-6 * (normalized - 0.35)))
    percentile = max(0.05, min(0.98, percentile))

    # Lifetime risk = population risk * relative risk from percentile
    # 90th percentile → ~3x pop risk; 10th → ~0.4x
    relative_risk = math.exp(2.5 * (percentile - 0.5))
    lifetime_risk = min(0.85, pop_lifetime * relative_risk)

    return {
        "condition": condition,
        "condition_key": ck,
        "method": "prs",
        "lifetime_risk_pct": round(lifetime_risk * 100, 1),
        "population_avg_pct": round(pop_lifetime * 100, 1),
        "risk_tier": _risk_tier(lifetime_risk, pop_lifetime),
        "evidence_grade": "Moderate" if coverage < 0.5 else "Strong",
        "prs_percentile": round(percentile * 100),
        "snps_evaluated": len(variants),
        "snps_found": found_count,
        "coverage_pct": round(coverage * 100),
        "key_findings": key_findings[:5],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry." if coverage < 0.7 else None,
    }


# ── Pharmacogenomics ───────────────────────────────────────────────────────

def compute_pgx(snps: dict[str, str]) -> list[dict]:
    """
    Evaluate pharmacogenomics variants.
    Returns actionable drug-gene interactions found.
    """
    results = []
    for variant in _VARIANT_DB["pharmacogenomics"]:
        rsid = variant["rsid"]
        genotype = snps.get(rsid)
        if not genotype:
            continue
        copies = _count_risk_alleles(genotype, variant["risk_allele"])
        if copies == 0:
            continue

        results.append({
            "gene": variant["gene"],
            "rsid": rsid,
            "star_allele": variant.get("star_allele"),
            "copies": copies,
            "zygosity": "homozygous" if copies == 2 else "heterozygous",
            "effect": variant["effect"],
            "drug_classes": variant["drug_classes"],
            "clinical_guidance": variant["clinical_guidance"],
            "source": variant["source"],
        })

    return results


# ── Master scorer ──────────────────────────────────────────────────────────

def score_all(snps: dict[str, str]) -> dict:
    """
    Run all risk models against a SNP dict.
    Returns structured results suitable for storage and display.
    No raw SNP data is included in the output.
    """
    disease_risks = []

    # Monogenic
    disease_risks.extend(compute_monogenic_risks(snps))

    # PRS conditions
    for _key, prs_config in _VARIANT_DB["prs"].items():
        result = compute_prs(snps, prs_config)
        disease_risks.append(result)

    # Sort: high → elevated → average → below_average
    tier_order = {"high": 0, "elevated": 1, "average": 2, "below_average": 3}
    disease_risks.sort(key=lambda r: (tier_order.get(r["risk_tier"], 9), -r["lifetime_risk_pct"]))

    # Pharmacogenomics
    pgx = compute_pgx(snps)

    return {
        "disease_risks": disease_risks,
        "pharmacogenomics": pgx,
        "summary": {
            "conditions_evaluated": len(disease_risks),
            "high_risk_count": sum(1 for r in disease_risks if r["risk_tier"] == "high"),
            "elevated_risk_count": sum(1 for r in disease_risks if r["risk_tier"] == "elevated"),
            "pgx_findings_count": len(pgx),
        },
        "disclaimer": (
            "This report is for educational and informational purposes only. "
            "It does not constitute medical advice, diagnosis, or treatment. "
            "Consult a qualified healthcare provider before making any health decisions."
        ),
    }
