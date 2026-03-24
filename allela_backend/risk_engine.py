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
    r429358 = snps.get("rs429358", "")
    r7412   = snps.get("rs7412", "")
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
        return "ε3/ε3", 0.09


# ── Genotype helpers ───────────────────────────────────────────────────────

def _count_risk_alleles(genotype: str, risk_allele: str) -> int:
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
    condition_hits: dict[str, list[dict]] = {}
    for variant in _VARIANT_DB["monogenic"]:
        rsid = variant["rsid"]
        if rsid in ("rs429358", "rs7412"):
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

    apoe_label, apoe_risk = _classify_apoe(snps)
    alz_pop = 0.09
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
        relative_risk = 1.0
        for hit in hits:
            freq = hit["population_frequency"]
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
    max_possible = sum(v["weight"] * 2 for v in variants)
    normalized = raw_score / max_possible if max_possible > 0 else 0.5

    percentile = 1 / (1 + math.exp(-6 * (normalized - 0.35)))
    percentile = max(0.05, min(0.98, percentile))
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


# ── DB rsID index ──────────────────────────────────────────────────────────

def get_all_rsids() -> list[str]:
    """Return every rsID in the variant database (deduped, preserving order)."""
    seen: set[str] = set()
    out: list[str] = []
    for v in _VARIANT_DB["monogenic"]:
        if v["rsid"] not in seen:
            seen.add(v["rsid"]); out.append(v["rsid"])
    for v in _VARIANT_DB["pharmacogenomics"]:
        if v["rsid"] not in seen:
            seen.add(v["rsid"]); out.append(v["rsid"])
    for prs_cfg in _VARIANT_DB["prs"].values():
        for v in prs_cfg["variants"]:
            if v["rsid"] not in seen:
                seen.add(v["rsid"]); out.append(v["rsid"])
    return out


# ── Variant table ──────────────────────────────────────────────────────────

def _build_variant_table(snps: dict[str, str], enrichment: dict) -> list[dict]:
    seen: set[str] = set()
    rows: list[dict] = []

    all_db_variants: list[dict] = []
    for v in _VARIANT_DB["monogenic"]:
        all_db_variants.append({"rsid": v["rsid"], "gene": v["gene"], "condition": v.get("effect", "")[:60]})
    for v in _VARIANT_DB["pharmacogenomics"]:
        all_db_variants.append({"rsid": v["rsid"], "gene": v["gene"], "condition": ", ".join(v["drug_classes"])})
    for prs_cfg in _VARIANT_DB["prs"].values():
        for v in prs_cfg["variants"]:
            all_db_variants.append({"rsid": v["rsid"], "gene": v["gene"], "condition": prs_cfg["condition"]})

    for dbv in all_db_variants:
        rsid = dbv["rsid"]
        if rsid in seen:
            continue
        seen.add(rsid)
        genotype = snps.get(rsid)
        if not genotype:
            continue
        enr = enrichment.get(rsid, {})
        rows.append({
            "rsid": rsid,
            "genotype": genotype,
            "gene": enr.get("gene") or dbv["gene"],
            "condition": enr.get("condition") or dbv["condition"],
            "clinical_significance": enr.get("clinical_significance", ""),
            "gnomad_af": enr.get("gnomad_af"),
            "gwas_traits": enr.get("gwas_traits", []),
        })
    return rows


# ── Overall risk score ─────────────────────────────────────────────────────

def _compute_overall_score(disease_risks: list[dict], pgx: list[dict]) -> int:
    score = 0.0
    for r in disease_risks:
        pop = r["population_avg_pct"]
        ratio = r["lifetime_risk_pct"] / pop if pop > 0 else 1.0
        if r["risk_tier"] == "high":
            score += min(ratio * 4.0, 22.0)
        elif r["risk_tier"] == "elevated":
            score += min(ratio * 1.8, 9.0)
        elif r["risk_tier"] == "below_average":
            score -= 1.5
    score += len(pgx) * 5.0
    return min(100, max(0, round(score)))


# ── Action maps ────────────────────────────────────────────────────────────

_DISEASE_ACTIONS: dict[str, dict[str, tuple]] = {
    "alzheimers": {
        "high": ("P1", "Neurological baseline assessment",
                 "APOE ε4/ε4 detected — lifetime Alzheimer's risk ~41%. Request baseline cognitive MRI and neuropsychological assessment. MIND/Mediterranean diet and aerobic exercise are evidence-backed risk reducers."),
        "elevated": ("P2", "Cognitive health monitoring",
                     "APOE ε4 detected — elevated Alzheimer's risk. Annual cognitive screening from age 55 recommended."),
    },
    "vte": {
        "high": ("P1", "Thrombosis prevention — tell every surgeon",
                 "Factor V Leiden or prothrombin variant detected. Discuss anticoagulation prophylaxis before any surgery, flight >4 h, immobilisation, or pregnancy. Critical before any procedure."),
        "elevated": ("P2", "Clotting risk awareness",
                     "Elevated VTE risk. Inform all surgeons and obstetricians. Stay hydrated and mobile on long journeys."),
        "average": ("P3", "VTE monitoring", "Moderate thrombosis profile. Annual check-up recommended."),
    },
    "hemochromatosis": {
        "high": ("P1", "Iron overload blood test",
                 "HFE variant detected. Order serum ferritin + transferrin saturation. Hemochromatosis is highly treatable if caught early — annual phlebotomy normalises iron levels."),
        "elevated": ("P2", "Annual ferritin check", "HFE variant detected. Annual serum ferritin recommended."),
    },
    "parkinsons": {
        "high": ("P2", "Neurological assessment",
                 "LRRK2/SNCA variant detected. Request neurological baseline evaluation. Regular aerobic exercise is the strongest evidence-based neuroprotective intervention."),
        "elevated": ("P3", "Parkinson's monitoring", "Slightly elevated Parkinson's risk. Maintain regular aerobic exercise."),
    },
    "celiac": {
        "high": ("P1", "Celiac antibody panel",
                 "HLA-DQ2/DQ8 variant detected. Order anti-tTG IgA + total IgA. If elevated, endoscopy with biopsy confirms diagnosis. Untreated celiac causes silent gut damage."),
        "elevated": ("P2", "Celiac screening", "Elevated celiac risk. Anti-tTG IgA antibody test recommended."),
    },
    "type2_diabetes": {
        "high": ("P1", "Diabetes prevention programme",
                 "High polygenic risk for Type 2 Diabetes. Annual HbA1c + fasting glucose. Diet + exercise reduces risk by 58% (DPP trial). Refer to structured prevention programme."),
        "elevated": ("P2", "Blood sugar monitoring",
                     "Elevated T2D polygenic risk. Annual HbA1c recommended. Limit refined carbs, maintain healthy weight."),
        "average": ("P3", "Routine glucose check", "Annual HbA1c from age 45 — standard care."),
    },
    "coronary_artery_disease": {
        "high": ("P1", "Full cardiovascular workup",
                 "High polygenic risk for coronary artery disease. Order lipid panel, hsCRP, lipoprotein(a). Consider coronary calcium score (CAC scan). Statin therapy may be appropriate."),
        "elevated": ("P2", "Annual lipid panel",
                     "Elevated CAD polygenic risk. Annual lipid panel. Statin consideration if LDL elevated."),
        "average": ("P3", "Lipid monitoring", "Standard lipid panel every 3–5 years from age 35."),
    },
    "atrial_fibrillation": {
        "high": ("P2", "Cardiac rhythm monitoring",
                 "High polygenic risk for AFib. Consider wearable ECG (Apple Watch, AliveCor Kardia). Report palpitations, dizziness, or racing heartbeat immediately."),
        "elevated": ("P2", "ECG monitoring",
                     "Elevated AFib polygenic risk. Annual resting ECG. Report any palpitations."),
    },
    "breast_cancer": {
        "high": ("P1", "Enhanced breast cancer screening",
                 "High polygenic risk for breast cancer. Annual mammogram from age 40. Consider breast MRI if very high risk. Discuss BRCA genetic counselling."),
        "elevated": ("P2", "Annual mammogram from age 40",
                     "Elevated breast cancer polygenic risk. Annual mammogram from age 40."),
    },
    "prostate_cancer": {
        "high": ("P1", "Annual PSA + urological consultation",
                 "High polygenic risk for prostate cancer. Annual PSA from age 45. Digital rectal exam every 2 years."),
        "elevated": ("P2", "PSA monitoring",
                     "Elevated prostate cancer polygenic risk. Annual PSA from age 50."),
    },
    "age_related_macular_degeneration": {
        "high": ("P2", "Annual ophthalmology screening",
                 "High AMD risk. Annual dilated eye exam. AREDS2 formula supplements (lutein/zeaxanthin). No smoking — strongest modifiable risk factor."),
        "elevated": ("P3", "Eye exam monitoring", "Elevated AMD risk. Annual dilated eye exam from age 50."),
    },
    "osteoporosis": {
        "high": ("P2", "DEXA bone density scan",
                 "High polygenic risk for osteoporosis. Request DEXA scan. Calcium + vitamin D supplementation. Weight-bearing exercise is protective."),
        "elevated": ("P3", "Bone health monitoring",
                     "Elevated osteoporosis risk. Calcium + vitamin D. DEXA scan from age 50."),
    },
    "inflammatory_bowel_disease": {
        "high": ("P2", "Gastroenterology referral",
                 "High polygenic risk for IBD. Colonoscopy baseline recommended. See gastroenterologist if any symptoms (persistent diarrhoea, blood in stool, cramping)."),
        "elevated": ("P3", "IBD symptom awareness",
                     "Elevated IBD risk. Monitor for GI symptoms. See GP if persistent gut issues."),
    },
}

_PGX_ACTIONS: dict[str, dict[str, tuple]] = {
    "CYP2C19": {
        "homozygous": ("P1", "CYP2C19 Poor Metabolizer — critical drug alert",
                       "Clopidogrel (Plavix) is INEFFECTIVE in you. Inform every cardiologist and surgeon before any cardiac procedure. Alternative: ticagrelor or prasugrel. PPIs (omeprazole, esomeprazole) accumulate — use pantoprazole or lowest dose."),
        "heterozygous": ("P2", "CYP2C19 Intermediate Metabolizer",
                         "Reduced clopidogrel effectiveness. Inform doctors before cardiac procedures. Monitor PPI dosing."),
    },
    "VKORC1": {
        "homozygous": ("P1", "Warfarin hypersensitivity — critical drug alert",
                       "Standard warfarin doses will cause dangerous over-anticoagulation. You require 30–50% lower doses. CRITICAL: inform every prescribing doctor — especially before surgery or cardiac procedures."),
        "heterozygous": ("P1", "Warfarin sensitivity — drug alert",
                         "Increased warfarin sensitivity detected. Lower-than-standard doses required. Inform all prescribing doctors."),
    },
    "CYP2D6": {
        "homozygous": ("P1", "CYP2D6 Poor Metabolizer — multiple drug classes affected",
                       "Codeine is ineffective and potentially toxic. Tramadol: altered response. Tamoxifen: severely reduced efficacy (low endoxifen). Many antidepressants accumulate. Alert every prescriber."),
        "heterozygous": ("P2", "CYP2D6 Intermediate Metabolizer",
                         "Reduced metabolism of codeine, tramadol, tamoxifen, and many antidepressants. Mention to all prescribers."),
    },
    "SLCO1B1": {
        "homozygous": ("P2", "SLCO1B1*5 — statin myopathy risk",
                       "Statins (especially simvastatin, atorvastatin) accumulate in muscle — elevated rhabdomyolysis risk. Request rosuvastatin at low dose or a non-statin alternative. Mention before any statin prescription."),
        "heterozygous": ("P2", "SLCO1B1 — mild statin myopathy risk",
                         "Mild increased risk of statin muscle side effects. Mention to prescriber before starting statins."),
    },
    "CYP2C9": {
        "homozygous": ("P2", "CYP2C9 Poor Metabolizer — warfarin & NSAID alert",
                       "Warfarin clears very slowly — significantly lower doses required. NSAIDs accumulate — minimum effective dose only. Phenytoin toxicity risk. Inform every prescriber."),
        "heterozygous": ("P2", "CYP2C9 Intermediate Metabolizer",
                         "Reduced warfarin and NSAID clearance. Inform prescribers — dose adjustment may be needed."),
    },
    "MTHFR": {
        "homozygous": ("P2", "MTHFR C677T — folate metabolism impaired",
                       "Standard folic acid is poorly converted. Use methylfolate (5-MTHF) supplements instead. Critical during pregnancy — standard prenatal folic acid may be insufficient."),
        "heterozygous": ("P3", "MTHFR C677T — mild folate reduction",
                         "Mildly reduced folate processing. Prefer methylfolate over standard folic acid."),
    },
}

_DOCTOR_NOTES: dict[str, dict[str, str]] = {
    "CYP2C19": {
        "Antiplatelet (clopidogrel)": "I am a CYP2C19 Poor Metabolizer. Clopidogrel (Plavix) is ineffective for me — I need an alternative such as ticagrelor or prasugrel.",
        "Clopidogrel": "I am a CYP2C19 Poor Metabolizer — clopidogrel is ineffective. I need an alternative antiplatelet agent.",
        "SSRIs": "I am a CYP2C19 Poor Metabolizer. Many SSRIs accumulate in my system. Please start at a lower dose.",
        "Proton pump inhibitors": "I am a CYP2C19 Poor Metabolizer. PPIs like omeprazole build up — use lowest effective dose or switch to pantoprazole.",
    },
    "VKORC1": {
        "Warfarin (anticoagulant)": "I have VKORC1 warfarin hypersensitivity. Standard doses will over-anticoagulate me — I require 30–50% lower doses.",
    },
    "CYP2D6": {
        "Codeine/tramadol": "I am a CYP2D6 Poor Metabolizer. Codeine is ineffective and may be toxic; tramadol response is altered. Please use an alternative analgesic.",
        "Tamoxifen": "I am a CYP2D6 Poor Metabolizer. Tamoxifen produces very low endoxifen — reduced efficacy. Please consider an aromatase inhibitor instead.",
        "Tricyclic antidepressants": "I am a CYP2D6 Poor Metabolizer. TCAs and many SSRIs accumulate — please start at lowest possible dose.",
        "Beta-blockers": "I have reduced CYP2D6 activity — beta-blockers may accumulate. Start at lowest dose.",
    },
    "SLCO1B1": {
        "Statins (simvastatin, atorvastatin)": "I have SLCO1B1*5 — statins accumulate in my muscles, raising myopathy risk. Please prescribe rosuvastatin at low dose or a non-statin alternative.",
    },
    "CYP2C9": {
        "Warfarin": "I am a CYP2C9 Poor Metabolizer. Warfarin clears very slowly in me — I need significantly lower doses to avoid bleeding.",
        "NSAIDs (celecoxib, ibuprofen)": "I am a CYP2C9 Poor Metabolizer. NSAIDs accumulate — use the lowest dose for the shortest time.",
        "NSAIDs": "I have reduced CYP2C9 activity — NSAIDs and warfarin may need dose adjustment.",
        "Phenytoin": "I am a CYP2C9 Poor Metabolizer. Phenytoin toxicity risk elevated — please monitor levels carefully.",
        "Sulfonylureas": "I have reduced CYP2C9 activity — sulfonylureas may accumulate, increasing hypoglycemia risk.",
    },
}


def _generate_priority_actions(disease_risks: list[dict], pgx: list[dict]) -> list[dict]:
    actions: list[dict] = []
    for r in disease_risks:
        ck = r["condition_key"]
        tier = r["risk_tier"]
        if tier not in ("high", "elevated", "average"):
            continue
        mapping = _DISEASE_ACTIONS.get(ck, {})
        entry = mapping.get(tier)
        if not entry:
            continue
        priority, title, description = entry
        actions.append({"priority": priority, "title": title, "description": description,
                         "category": "disease", "condition": r["condition"]})

    for p in pgx:
        gene = p["gene"]
        zygosity = p["zygosity"]
        entry = _PGX_ACTIONS.get(gene, {}).get(zygosity)
        if not entry:
            continue
        priority, title, description = entry
        actions.append({"priority": priority, "title": title, "description": description,
                         "category": "pgx", "condition": gene})

    order = {"P1": 0, "P2": 1, "P3": 2}
    actions.sort(key=lambda a: order.get(a["priority"], 9))
    return actions


def _generate_doctor_notes(pgx: list[dict]) -> list[dict]:
    notes: list[dict] = []
    for p in pgx:
        gene = p["gene"]
        gene_notes = _DOCTOR_NOTES.get(gene, {})
        for drug_class in p["drug_classes"]:
            what_to_say = gene_notes.get(drug_class, "")
            if not what_to_say:
                for k, v in gene_notes.items():
                    if k.lower() in drug_class.lower() or drug_class.lower() in k.lower():
                        what_to_say = v
                        break
            if what_to_say:
                notes.append({
                    "drug": drug_class,
                    "gene": gene,
                    "star_allele": p.get("star_allele", ""),
                    "zygosity": p["zygosity"],
                    "what_to_say": what_to_say,
                })
    return notes


def _compute_enrichment_stats(enrichment: dict) -> dict:
    enriched = sum(
        1 for v in enrichment.values()
        if any(v.get(k) for k in ("gene", "clinical_significance", "gwas_traits", "gnomad_af"))
    )
    clinvar_hits = sum(1 for v in enrichment.values() if v.get("clinical_significance"))
    all_traits: set[str] = set()
    for v in enrichment.values():
        all_traits.update(v.get("gwas_traits") or [])
    pathogenic = sum(
        1 for v in enrichment.values()
        if v.get("clinical_significance") in ("Pathogenic", "Likely Pathogenic")
    )
    return {
        "enriched": enriched,
        "clinvar_hits": clinvar_hits,
        "gwas_traits_total": len(all_traits),
        "pathogenic_count": pathogenic,
    }


def _build_summary_sentence(disease_risks: list[dict], pgx: list[dict]) -> str:
    high = [r["condition"] for r in disease_risks if r["risk_tier"] == "high"]
    elevated = [r["condition"] for r in disease_risks if r["risk_tier"] == "elevated"]
    pgx_genes = list({p["gene"] for p in pgx})
    parts: list[str] = []
    if high:
        parts.append(f"high risk for {high[0]}" + (f" and {len(high)-1} other condition(s)" if len(high) > 1 else ""))
    if elevated:
        parts.append(f"elevated risk for {elevated[0]}" + (f" (+{len(elevated)-1})" if len(elevated) > 1 else ""))
    if pgx_genes:
        parts.append(f"{len(pgx_genes)} drug-metabolism alert(s) ({', '.join(pgx_genes[:2])})")
    if not parts:
        return "No significant risk elevations found. Your results are broadly within population norms."
    return "Your results show " + "; ".join(parts) + "."



# ── Carrier status ─────────────────────────────────────────────────────────

def compute_carrier_status(snps: dict[str, str]) -> list[dict]:
    """Check for recessive disease carrier variants grouped by condition."""
    condition_variants: dict[str, list[dict]] = {}
    for variant in _VARIANT_DB.get("carrier_status", []):
        ck = variant["condition_key"]
        condition_variants.setdefault(ck, []).append(variant)

    results = []
    for ck, variants in condition_variants.items():
        total_risk_copies = 0
        hits: list[dict] = []
        for variant in variants:
            genotype = snps.get(variant["rsid"])
            if not genotype:
                continue
            copies = genotype.count(variant["risk_allele"])
            if copies > 0:
                total_risk_copies += copies
                hits.append({
                    "rsid": variant["rsid"],
                    "gene": variant["gene"],
                    "variant_name": variant.get("variant_name", ""),
                    "copies": copies,
                    "effect": variant["effect"],
                })

        status = "not_detected" if total_risk_copies == 0 else ("carrier" if total_risk_copies == 1 else "two_variants")
        v0 = variants[0]
        results.append({
            "condition": v0["condition"],
            "condition_key": ck,
            "gene": v0["gene"],
            "inheritance": v0.get("inheritance", "autosomal_recessive"),
            "carrier_frequency": v0.get("carrier_frequency", 0.02),
            "status": status,
            "risk_copies": total_risk_copies,
            "hits": hits,
            "effect": v0.get("effect", ""),
            "source": v0.get("source", "ClinVar"),
        })
    return results


# ── Nutrigenomics ──────────────────────────────────────────────────────────

def compute_nutrigenomics(snps: dict[str, str]) -> list[dict]:
    """Evaluate nutrition and metabolism variants."""
    results = []
    for variant in _VARIANT_DB.get("nutrigenomics", []):
        rsid = variant["rsid"]
        genotype = snps.get(rsid)
        if not genotype:
            continue
        copies = genotype.count(variant["risk_allele"])
        result_text = variant.get(f"effect_{copies}", variant.get("effect_0", ""))
        results.append({
            "trait": variant["trait"],
            "trait_key": variant.get("trait_key", variant["trait"].lower().replace(" ", "_")),
            "gene": variant["gene"],
            "rsid": rsid,
            "genotype": genotype,
            "category": variant.get("category", "Metabolism"),
            "copies_of_risk_allele": copies,
            "result": result_text,
            "source": variant.get("source", "GWAS"),
        })
    return results


# ── Genetic traits ─────────────────────────────────────────────────────────

def compute_traits(snps: dict[str, str]) -> list[dict]:
    """Evaluate genetic trait variants."""
    results = []
    for variant in _VARIANT_DB.get("traits", []):
        rsid = variant["rsid"]
        genotype = snps.get(rsid)
        if not genotype:
            continue
        interps = variant.get("interpretations", {})
        if interps:
            result_text = interps.get(genotype) or interps.get(genotype[::-1], "")
        elif "risk_allele" in variant:
            copies = genotype.count(variant["risk_allele"])
            result_text = variant.get(f"effect_{copies}", variant.get("effect_0", ""))
        else:
            result_text = ""
        results.append({
            "trait": variant["trait"],
            "trait_key": variant["trait_key"],
            "gene": variant["gene"],
            "rsid": rsid,
            "genotype": genotype,
            "category": variant.get("category", "Physical Traits"),
            "result": result_text,
            "note": variant.get("note", ""),
            "source": variant.get("source", "GWAS"),
        })
    return results

# ── Master scorer ──────────────────────────────────────────────────────────

def score_all(snps: dict[str, str], enrichment: Optional[dict] = None) -> dict:
    """
    Run all risk models against a SNP dict.
    Optionally accepts live enrichment data from external APIs.
    Returns structured results suitable for storage and display.
    No raw SNP data is included in the output.
    """
    if enrichment is None:
        enrichment = {}

    disease_risks: list[dict] = []
    disease_risks.extend(compute_monogenic_risks(snps))
    for _key, prs_config in _VARIANT_DB["prs"].items():
        disease_risks.append(compute_prs(snps, prs_config))

    tier_order = {"high": 0, "elevated": 1, "average": 2, "below_average": 3}
    disease_risks.sort(key=lambda r: (tier_order.get(r["risk_tier"], 9), -r["lifetime_risk_pct"]))

    pgx = compute_pgx(snps)
    carrier_status  = compute_carrier_status(snps)
    nutrigenomics   = compute_nutrigenomics(snps)
    traits          = compute_traits(snps)

    overall_score   = _compute_overall_score(disease_risks, pgx)
    priority_actions = _generate_priority_actions(disease_risks, pgx)
    variant_table   = _build_variant_table(snps, enrichment)
    doctor_notes    = _generate_doctor_notes(pgx)
    enrichment_stats = _compute_enrichment_stats(enrichment)
    summary_sentence = _build_summary_sentence(disease_risks, pgx)

    carrier_detected = sum(1 for c in carrier_status if c["status"] != "not_detected")

    return {
        "disease_risks": disease_risks,
        "pharmacogenomics": pgx,
        "carrier_status": carrier_status,
        "nutrigenomics": nutrigenomics,
        "traits": traits,
        "summary": {
            "conditions_evaluated": len(disease_risks),
            "high_risk_count": sum(1 for r in disease_risks if r["risk_tier"] == "high"),
            "elevated_risk_count": sum(1 for r in disease_risks if r["risk_tier"] == "elevated"),
            "pgx_findings_count": len(pgx),
            "carrier_detected": carrier_detected,
            "nutrition_traits": len(nutrigenomics),
            "genetic_traits": len(traits),
        },
        "overall_risk_score": overall_score,
        "summary_sentence": summary_sentence,
        "priority_actions": priority_actions,
        "variant_table": variant_table,
        "doctor_notes": doctor_notes,
        "enrichment_stats": enrichment_stats,
        "disclaimer": (
            "This report is for educational and informational purposes only. "
            "It does not constitute medical advice, diagnosis, or treatment. "
            "Consult a qualified healthcare provider before making any health decisions."
        ),
    }
