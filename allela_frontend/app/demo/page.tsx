"use client";

import { useState } from "react";

// ── Sample report data ─────────────────────────────────────────────────────

const SAMPLE_REPORT = {
  format_detected: "23andMe v5",
  snp_count: 638_442,
  created_at: "2026-03-23T10:00:00.000Z",
  scores: {
    overall_risk_score: 68,
    summary_sentence:
      "Your results show high risk for Venous Thromboembolism; elevated risk for Coronary Artery Disease; 3 drug-metabolism alerts (VKORC1, CYP2C19, CYP2D6).",
    summary: {
      conditions_evaluated: 13,
      high_risk_count: 2,
      elevated_risk_count: 3,
      pgx_findings_count: 3,
    },
    enrichment_stats: {
      enriched: 47,
      clinvar_hits: 21,
      gwas_traits_total: 38,
      pathogenic_count: 4,
    },
    priority_actions: [
      {
        priority: "P1",
        title: "Warfarin hypersensitivity — critical drug alert",
        description:
          "Standard warfarin doses will cause dangerous over-anticoagulation. You require 30–50% lower doses. CRITICAL: inform every prescribing doctor — especially before surgery or cardiac procedures.",
        category: "pgx",
        condition: "VKORC1",
      },
      {
        priority: "P1",
        title: "Thrombosis prevention — tell every surgeon",
        description:
          "Factor V Leiden detected (heterozygous). Discuss anticoagulation prophylaxis before any surgery, flight >4 h, immobilisation, or pregnancy. Critical before any procedure.",
        category: "disease",
        condition: "Venous Thromboembolism",
      },
      {
        priority: "P2",
        title: "CYP2C19 Intermediate Metabolizer",
        description:
          "Reduced clopidogrel effectiveness. Inform doctors before cardiac procedures. Monitor PPI dosing (omeprazole may accumulate).",
        category: "pgx",
        condition: "CYP2C19",
      },
      {
        priority: "P2",
        title: "Cognitive health monitoring",
        description:
          "APOE ε4/ε3 detected — elevated Alzheimer's risk (~20% lifetime). Annual cognitive screening from age 55. Mediterranean/MIND diet strongly recommended.",
        category: "disease",
        condition: "Alzheimer's Disease",
      },
      {
        priority: "P2",
        title: "Full cardiovascular workup",
        description:
          "High polygenic risk for coronary artery disease. Order lipid panel, hsCRP, lipoprotein(a). Consider coronary calcium score (CAC scan). Statin therapy may be appropriate.",
        category: "disease",
        condition: "Coronary Artery Disease",
      },
      {
        priority: "P2",
        title: "Blood sugar monitoring",
        description:
          "Elevated T2D polygenic risk (72nd percentile). Annual HbA1c recommended. Limit refined carbs, maintain healthy weight.",
        category: "disease",
        condition: "Type 2 Diabetes",
      },
      {
        priority: "P2",
        title: "CYP2D6 Intermediate Metabolizer",
        description:
          "Reduced metabolism of codeine, tramadol, tamoxifen, and many antidepressants. Mention to all prescribers.",
        category: "pgx",
        condition: "CYP2D6",
      },
      {
        priority: "P3",
        title: "Lipid monitoring",
        description:
          "Standard lipid panel every 3–5 years from age 35. LDL target <100 mg/dL given overall cardiovascular risk profile.",
        category: "disease",
        condition: "Coronary Artery Disease",
      },
      {
        priority: "P3",
        title: "Eye exam monitoring",
        description:
          "Slightly elevated AMD polygenic risk. Annual dilated eye exam from age 50. Lutein + zeaxanthin supplement (AREDS2).",
        category: "disease",
        condition: "Age-Related Macular Degeneration",
      },
    ],
    doctor_notes: [
      {
        drug: "Warfarin (anticoagulant)",
        gene: "VKORC1",
        star_allele: "",
        zygosity: "homozygous",
        what_to_say:
          "I have VKORC1 warfarin hypersensitivity. Standard doses will over-anticoagulate me — I require 30–50% lower doses.",
      },
      {
        drug: "Antiplatelet (clopidogrel)",
        gene: "CYP2C19",
        star_allele: "*2",
        zygosity: "heterozygous",
        what_to_say:
          "I have reduced CYP2C19 activity. Clopidogrel may have reduced effectiveness for me — please confirm my antiplatelet therapy before any cardiac procedure.",
      },
      {
        drug: "Proton pump inhibitors",
        gene: "CYP2C19",
        star_allele: "*2",
        zygosity: "heterozygous",
        what_to_say:
          "I am a CYP2C19 Intermediate Metabolizer. PPIs like omeprazole accumulate — please use the lowest effective dose.",
      },
      {
        drug: "Codeine/tramadol",
        gene: "CYP2D6",
        star_allele: "*4",
        zygosity: "heterozygous",
        what_to_say:
          "I have reduced CYP2D6 activity. Codeine efficacy may be reduced. Please consider an alternative analgesic or confirm dosing.",
      },
      {
        drug: "Tamoxifen",
        gene: "CYP2D6",
        star_allele: "*4",
        zygosity: "heterozygous",
        what_to_say:
          "I have reduced CYP2D6 activity — tamoxifen produces less active endoxifen in me. Please discuss whether an aromatase inhibitor is more appropriate.",
      },
    ],
    disease_risks: [
      {
        condition: "Venous Thromboembolism",
        condition_key: "vte",
        method: "monogenic",
        lifetime_risk_pct: 12.4,
        population_avg_pct: 1.0,
        risk_tier: "high",
        evidence_grade: "Strong",
        key_findings: [
          "F5 rs6025 — Factor V Leiden (Leiden mutation) — heterozygous carrier",
          "Relative risk: ~5× population baseline",
        ],
        snps_evaluated: 2,
        snps_found: 2,
      },
      {
        condition: "Alzheimer's Disease",
        condition_key: "alzheimers",
        method: "monogenic",
        lifetime_risk_pct: 20.0,
        population_avg_pct: 9.0,
        risk_tier: "elevated",
        evidence_grade: "Strong",
        key_findings: ["APOE genotype: ε4/ε3"],
        snps_evaluated: 2,
        snps_found: 2,
      },
      {
        condition: "Coronary Artery Disease",
        condition_key: "coronary_artery_disease",
        method: "prs",
        lifetime_risk_pct: 19.8,
        population_avg_pct: 12.0,
        risk_tier: "elevated",
        evidence_grade: "Strong",
        prs_percentile: 81,
        coverage_pct: 88,
        key_findings: [
          "LPA (rs10455872) — 2 risk allele(s)",
          "PCSK9 (rs11591147) — 1 risk allele(s)",
          "LDLR (rs2228671) — 1 risk allele(s)",
        ],
        snps_evaluated: 32,
        snps_found: 28,
      },
      {
        condition: "Type 2 Diabetes",
        condition_key: "type2_diabetes",
        method: "prs",
        lifetime_risk_pct: 17.3,
        population_avg_pct: 11.0,
        risk_tier: "elevated",
        evidence_grade: "Strong",
        prs_percentile: 72,
        coverage_pct: 91,
        key_findings: [
          "TCF7L2 (rs7903146) — 2 risk allele(s)",
          "KCNJ11 (rs5219) — 1 risk allele(s)",
        ],
        snps_evaluated: 28,
        snps_found: 25,
      },
      {
        condition: "Atrial Fibrillation",
        condition_key: "atrial_fibrillation",
        method: "prs",
        lifetime_risk_pct: 14.2,
        population_avg_pct: 10.0,
        risk_tier: "average",
        evidence_grade: "Strong",
        prs_percentile: 58,
        coverage_pct: 85,
        key_findings: ["PITX2 (rs2200733) — 1 risk allele(s)"],
        snps_evaluated: 18,
        snps_found: 15,
      },
      {
        condition: "Breast Cancer",
        condition_key: "breast_cancer",
        method: "prs",
        lifetime_risk_pct: 12.8,
        population_avg_pct: 12.5,
        risk_tier: "average",
        evidence_grade: "Moderate",
        prs_percentile: 52,
        coverage_pct: 79,
        key_findings: ["FGFR2 (rs2981582) — 1 risk allele(s)"],
        snps_evaluated: 22,
        snps_found: 17,
        note: "Based on published GWAS effect sizes. Accuracy varies by ancestry.",
      },
      {
        condition: "Inflammatory Bowel Disease",
        condition_key: "inflammatory_bowel_disease",
        method: "prs",
        lifetime_risk_pct: 7.8,
        population_avg_pct: 8.5,
        risk_tier: "below_average",
        evidence_grade: "Moderate",
        prs_percentile: 38,
        coverage_pct: 82,
        key_findings: [],
        snps_evaluated: 20,
        snps_found: 16,
      },
      {
        condition: "Parkinson's Disease",
        condition_key: "parkinsons",
        method: "monogenic",
        lifetime_risk_pct: 1.1,
        population_avg_pct: 1.5,
        risk_tier: "below_average",
        evidence_grade: "Strong",
        key_findings: ["No LRRK2 or SNCA risk variants detected"],
        snps_evaluated: 3,
        snps_found: 3,
      },
      {
        condition: "Hereditary Hemochromatosis",
        condition_key: "hemochromatosis",
        method: "monogenic",
        lifetime_risk_pct: 0.3,
        population_avg_pct: 0.5,
        risk_tier: "below_average",
        evidence_grade: "Strong",
        key_findings: ["No HFE C282Y or H63D variants detected"],
        snps_evaluated: 2,
        snps_found: 2,
      },
    ],
    pharmacogenomics: [
      {
        gene: "VKORC1",
        rsid: "rs9923231",
        star_allele: null,
        copies: 2,
        zygosity: "homozygous",
        effect: "Warfarin hypersensitivity — strongly reduced dose requirement",
        drug_classes: ["Warfarin (anticoagulant)"],
        clinical_guidance:
          "Requires 30–50% lower warfarin doses. Standard doses risk life-threatening bleeding. Inform all prescribers.",
        source: "CPIC",
      },
      {
        gene: "CYP2C19",
        rsid: "rs4244285",
        star_allele: "*2",
        copies: 1,
        zygosity: "heterozygous",
        effect: "CYP2C19 Intermediate Metabolizer — reduced clopidogrel and PPI metabolism",
        drug_classes: ["Antiplatelet (clopidogrel)", "SSRIs", "Proton pump inhibitors"],
        clinical_guidance:
          "Reduced clopidogrel activation (~30% reduced efficacy). Inform cardiologist before procedures. PPIs accumulate — use lowest dose.",
        source: "CPIC",
      },
      {
        gene: "CYP2D6",
        rsid: "rs3892097",
        star_allele: "*4",
        copies: 1,
        zygosity: "heterozygous",
        effect: "CYP2D6 Intermediate Metabolizer — reduced opioid and antidepressant metabolism",
        drug_classes: ["Tricyclic antidepressants", "Codeine/tramadol", "Tamoxifen", "Beta-blockers"],
        clinical_guidance:
          "Reduced metabolism of codeine, tramadol, tamoxifen, and many antidepressants. Start at lower doses. Mention to all prescribers.",
        source: "CPIC",
      },
    ],
    variant_table: [
      { rsid: "rs6025", genotype: "AG", gene: "F5", condition: "Venous thromboembolism", clinical_significance: "Pathogenic", gnomad_af: 0.0241, gwas_traits: ["Venous thromboembolism", "Deep vein thrombosis"] },
      { rsid: "rs9923231", genotype: "AA", gene: "VKORC1", condition: "Warfarin sensitivity", clinical_significance: "Pathogenic", gnomad_af: 0.381, gwas_traits: ["Warfarin dose", "Anticoagulant response"] },
      { rsid: "rs429358", genotype: "TC", gene: "APOE", condition: "Alzheimer disease", clinical_significance: "Likely Pathogenic", gnomad_af: 0.155, gwas_traits: ["Alzheimer disease", "LDL cholesterol"] },
      { rsid: "rs7412", genotype: "CC", gene: "APOE", condition: "Apolipoprotein E", clinical_significance: "Benign", gnomad_af: 0.074, gwas_traits: ["Cholesterol", "Alzheimer's"] },
      { rsid: "rs4244285", genotype: "AG", gene: "CYP2C19", condition: "Clopidogrel response", clinical_significance: "Pathogenic", gnomad_af: 0.148, gwas_traits: ["Clopidogrel response", "PPI metabolism"] },
      { rsid: "rs3892097", genotype: "AG", gene: "CYP2D6", condition: "Drug metabolism", clinical_significance: "VUS", gnomad_af: 0.182, gwas_traits: ["Antidepressant response", "Codeine metabolism"] },
      { rsid: "rs7903146", genotype: "CT", gene: "TCF7L2", condition: "Type 2 diabetes", clinical_significance: "Likely Pathogenic", gnomad_af: 0.299, gwas_traits: ["Type 2 diabetes", "Fasting glucose", "Insulin secretion"] },
      { rsid: "rs10455872", genotype: "AG", gene: "LPA", condition: "Coronary artery disease", clinical_significance: "Likely Pathogenic", gnomad_af: 0.062, gwas_traits: ["Coronary artery disease", "Lp(a) levels"] },
      { rsid: "rs5219", genotype: "CT", gene: "KCNJ11", condition: "Type 2 diabetes", clinical_significance: "VUS", gnomad_af: 0.371, gwas_traits: ["Type 2 diabetes", "HbA1c"] },
      { rsid: "rs2981582", genotype: "AG", gene: "FGFR2", condition: "Breast cancer", clinical_significance: "VUS", gnomad_af: 0.399, gwas_traits: ["Breast cancer"] },
      { rsid: "rs1801133", genotype: "AG", gene: "MTHFR", condition: "Methylenetetrahydrofolate reductase deficiency", clinical_significance: "Likely Benign", gnomad_af: 0.312, gwas_traits: ["Homocysteine levels", "Folate metabolism"] },
      { rsid: "rs2200733", genotype: "CT", gene: "PITX2", condition: "Atrial fibrillation", clinical_significance: "VUS", gnomad_af: 0.118, gwas_traits: ["Atrial fibrillation"] },
    ],
    carrier_status: [
      { condition: "Cystic Fibrosis", condition_key: "cystic_fibrosis", gene: "CFTR", inheritance: "autosomal_recessive", carrier_frequency: 0.032, status: "carrier", risk_copies: 1, hits: [{ rsid: "rs113993960", gene: "CFTR", variant_name: "ΔF508 (c.1521_1523del)", copies: 1, effect: "Most common CF-causing variant (~70% of CF alleles). Carriers are healthy." }], effect: "" },
      { condition: "Sickle Cell Anemia", condition_key: "sickle_cell", gene: "HBB", inheritance: "autosomal_recessive", carrier_frequency: 0.08, status: "not_detected", risk_copies: 0, hits: [], effect: "" },
      { condition: "Hereditary Hearing Loss", condition_key: "hearing_loss_gjb2", gene: "GJB2", inheritance: "autosomal_recessive", carrier_frequency: 0.025, status: "not_detected", risk_copies: 0, hits: [], effect: "" },
      { condition: "Tay-Sachs Disease", condition_key: "tay_sachs", gene: "HEXA", inheritance: "autosomal_recessive", carrier_frequency: 0.033, status: "not_detected", risk_copies: 0, hits: [], effect: "" },
      { condition: "Gaucher Disease", condition_key: "gaucher", gene: "GBA", inheritance: "autosomal_recessive", carrier_frequency: 0.005, status: "not_detected", risk_copies: 0, hits: [], effect: "" },
    ],
    nutrigenomics: [
      { trait: "Lactose Tolerance", trait_key: "lactose_tolerance", gene: "LCT", rsid: "rs4988235", genotype: "TT", category: "Digestive", copies_of_risk_allele: 0, result: "Lactase persistence — tolerates dairy well into adulthood." },
      { trait: "Caffeine Metabolism", trait_key: "caffeine_metabolism", gene: "CYP1A2", rsid: "rs762551", genotype: "AC", category: "Metabolism", copies_of_risk_allele: 1, result: "Intermediate caffeine metabolizer — moderate clearance rate. Limit to 2–3 cups/day." },
      { trait: "Vitamin D Levels", trait_key: "vitamin_d", gene: "GC", rsid: "rs2282679", genotype: "TT", category: "Vitamins & Minerals", copies_of_risk_allele: 2, result: "Significantly reduced vitamin D transport — higher deficiency risk; supplementation recommended (2000 IU/day)." },
      { trait: "Folate Metabolism (C677T)", trait_key: "mthfr_c677t", gene: "MTHFR", rsid: "rs1801133", genotype: "CT", category: "Vitamins & Minerals", copies_of_risk_allele: 1, result: "~35% reduced MTHFR activity — increased methylfolate and B12 needs. Use methylfolate over folic acid." },
      { trait: "Folate Metabolism (A1298C)", trait_key: "mthfr_a1298c", gene: "MTHFR", rsid: "rs1801131", genotype: "AA", category: "Vitamins & Minerals", copies_of_risk_allele: 0, result: "Normal MTHFR A1298C status." },
      { trait: "Alcohol Flush Reaction", trait_key: "alcohol_flush", gene: "ALDH2", rsid: "rs671", genotype: "GG", category: "Alcohol Metabolism", copies_of_risk_allele: 0, result: "Normal aldehyde metabolism — no genetic alcohol flush reaction." },
      { trait: "Omega-3 Fatty Acid Conversion", trait_key: "omega3_conversion", gene: "FADS1", rsid: "rs174537", genotype: "GT", category: "Nutrition", copies_of_risk_allele: 1, result: "Intermediate omega-3 conversion efficiency. Mixed plant + marine omega-3 sources recommended." },
      { trait: "Bitter Taste Sensitivity", trait_key: "bitter_taste", gene: "TAS2R38", rsid: "rs713598", genotype: "CG", category: "Taste & Food Preferences", copies_of_risk_allele: 1, result: "Medium taster — moderate bitter sensitivity. May find some bitter foods unpleasant." },
    ],
    traits: [
      { trait: "Eye Color", trait_key: "eye_color", gene: "HERC2", rsid: "rs12913832", genotype: "AG", category: "Physical Traits", result: "Likely intermediate (hazel or green) eyes", note: "Primary genetic determinant; other genes (OCA2, SLC45A2) also contribute." },
      { trait: "Earwax Type", trait_key: "earwax_type", gene: "ABCC11", rsid: "rs17822931", genotype: "CT", category: "Physical Traits", result: "Wet/sticky earwax (heterozygous)", note: "" },
      { trait: "Red Hair Risk", trait_key: "red_hair", gene: "MC1R", rsid: "rs1805008", genotype: "GT", category: "Physical Traits", result: "One MC1R R151C allele — increased red/auburn hair possibility; heightened UV sensitivity", note: "MC1R variants also increase sensitivity to UV radiation and anesthetic requirements." },
      { trait: "Androgenic Hair Loss Risk (Males)", trait_key: "hair_loss", gene: "AR", rsid: "rs6152", genotype: "AG", category: "Physical Traits", result: "Intermediate androgenic hair loss risk", note: "X-linked; males have one copy, so effect is direct." },
      { trait: "Muscle Fiber Composition", trait_key: "muscle_composition", gene: "ACTN3", rsid: "rs1815739", genotype: "CT", category: "Athletic Traits", result: "Mixed muscle fiber profile — balanced fast-twitch and slow-twitch composition", note: "Olympic sprinters rarely carry TT; endurance athletes have elevated TT frequency." },
      { trait: "Sleep Chronotype", trait_key: "sleep_chronotype", gene: "CLOCK", rsid: "rs1801260", genotype: "GG", category: "Behavioral Traits", result: "Evening preference (night owl) genetic tendency — natural sleep timing skews later", note: "" },
    ],
    mental_health: [
      { trait: "Dopamine & Stress Response", trait_key: "comt_dopamine", gene: "COMT", rsid: "rs4680", genotype: "AA", category: "Dopamine & Cognition", copies_of_risk_allele: 2, result: "Met/Met — lower COMT activity, slower dopamine clearance. Sharper working memory and focus, but stress-sensitive. Higher anxiety tendency under chronic pressure.", note: "The 'warrior vs worrier' polymorphism. Neither is better — Met shines in calm, Val shines under pressure." },
      { trait: "Brain Plasticity & Memory", trait_key: "bdnf_plasticity", gene: "BDNF", rsid: "rs6265", genotype: "AG", category: "Brain Plasticity", copies_of_risk_allele: 1, result: "Val/Met — reduced activity-dependent BDNF release. Slightly lower episodic memory. Responds well to aerobic exercise for mood.", note: "Met carriers show greater antidepressant benefit from regular aerobic exercise than non-carriers." },
      { trait: "Reward Sensitivity & Motivation", trait_key: "drd2_reward", gene: "DRD2", rsid: "rs1800497", genotype: "AG", category: "Dopamine Receptor", copies_of_risk_allele: 1, result: "One Taq1A — ~20% fewer D2 receptors. Lower reward sensitivity; may seek more stimulation.", note: "Associated with addiction vulnerability, ADHD traits, and compulsive behavior. Also linked to exercise motivation." },
      { trait: "Serotonin Transport & Stress Sensitivity", trait_key: "serotonin_transport", gene: "SLC6A4", rsid: "rs25531", genotype: "AA", category: "Serotonin System", copies_of_risk_allele: 2, result: "S/S — lower serotonin transporter expression. Elevated anxiety and depression risk under chronic stress. Short allele carriers are generally more responsive to SSRIs.", note: "Environment strongly moderates this variant. Adverse childhood experiences amplify the S/S risk significantly." },
      { trait: "Monoamine Oxidase Activity", trait_key: "maoa_activity", gene: "MAOA", rsid: "rs6323", genotype: "GG", category: "Neurotransmitter Clearance", copies_of_risk_allele: 0, result: "High activity — rapid breakdown of serotonin, dopamine, norepinephrine. Generally calmer but may respond less to environmental stimuli.", note: "X-linked gene. Males have one copy; the effect is direct and stronger." },
    ],
    longevity: [
      { trait: "Longevity Pathway", trait_key: "foxo3_longevity", gene: "FOXO3", rsid: "rs2802292", genotype: "GG", category: "Longevity", copies_of_risk_allele: 2, result: "GG — non-longevity genotype. Average lifespan genetics at this locus.", note: "One of the most replicated longevity variants in human genetics. FOXO3 is a master regulator of cellular stress response.", protective: false },
      { trait: "Telomere Maintenance", trait_key: "tert_telomere", gene: "TERT", rsid: "rs10069690", genotype: "CT", category: "Cellular Aging", copies_of_risk_allele: 1, result: "CT — intermediate. Modest association with telomere attrition.", note: "Telomere length reflects cumulative oxidative stress and inflammation exposure.", protective: false },
      { trait: "Metabolic Efficiency & Weight Regulation", trait_key: "fto_metabolism", gene: "FTO", rsid: "rs9939609", genotype: "AA", category: "Metabolic Health", copies_of_risk_allele: 2, result: "AA — ~1.7× increased obesity risk vs TT. Increased appetite drive, higher BMI tendency, greater carbohydrate sensitivity. Responds strongly to physical activity intervention.", note: "Most common obesity-associated variant worldwide. Physical activity almost fully abolishes the FTO effect.", protective: false },
      { trait: "Baseline Inflammation (IL-6)", trait_key: "il6_inflammation", gene: "IL6", rsid: "rs1800795", genotype: "CC", category: "Inflammation", copies_of_risk_allele: 2, result: "CC — higher IL-6 production. Elevated CRP and systemic inflammation. Higher cardiovascular disease, metabolic syndrome, and all-cause mortality risk.", note: "IL-6 is a master pro-inflammatory cytokine. Chronic elevation accelerates biological aging.", protective: false },
      { trait: "TNF-α Inflammatory Response", trait_key: "tnf_inflammation", gene: "TNF", rsid: "rs1800629", genotype: "GA", category: "Inflammation", copies_of_risk_allele: 1, result: "GA — higher TNF-alpha production. Moderate inflammatory tendency. Elevated autoimmune disease risk.", note: "TNF-alpha is a master inflammatory cytokine. Anti-TNF biologics (etanercept, adalimumab) specifically target this pathway.", protective: false },
    ],
    disclaimer:
      "This report is for educational and informational purposes only. It does not constitute medical advice, diagnosis, or treatment. Consult a qualified healthcare provider before making any health decisions.",
  },
};

// ── Types ──────────────────────────────────────────────────────────────────

type RiskTier = "high" | "elevated" | "average" | "below_average";
type Priority = "P1" | "P2" | "P3";

interface CarrierResult { condition: string; condition_key: string; gene: string; inheritance: string; carrier_frequency: number; status: string; risk_copies: number; hits: any[]; effect: string; }
interface NutritionResult { trait: string; trait_key: string; gene: string; rsid: string; genotype: string; category: string; copies_of_risk_allele: number; result: string; }
interface TraitResult { trait: string; trait_key: string; gene: string; rsid: string; genotype: string; category: string; result: string; note: string; }
interface MentalHealthResult { trait: string; trait_key: string; gene: string; rsid: string; genotype: string; category: string; copies_of_risk_allele: number; result: string; note: string; }
interface LongevityResult { trait: string; trait_key: string; gene: string; rsid: string; genotype: string; category: string; copies_of_risk_allele: number; result: string; note: string; protective: boolean; }

const TIER_COLOR: Record<RiskTier, string> = {
  high: "#ef4444",
  elevated: "#f97316",
  average: "#eab308",
  below_average: "#22c55e",
};
const TIER_LABEL: Record<RiskTier, string> = {
  high: "HIGH RISK",
  elevated: "ELEVATED",
  average: "AVERAGE",
  below_average: "BELOW AVG",
};
const PRIORITY_COLOR: Record<Priority, string> = {
  P1: "#ef4444",
  P2: "#f97316",
  P3: "#22c55e",
};
const CLIN_SIG_COLOR: Record<string, string> = {
  Pathogenic: "#ef4444",
  "Likely Pathogenic": "#f97316",
  VUS: "#eab308",
  "Likely Benign": "#22c55e",
  Benign: "#6b7280",
};

function scoreColor(s: number) {
  if (s <= 20) return "#22c55e";
  if (s <= 45) return "#eab308";
  if (s <= 70) return "#f97316";
  return "#ef4444";
}
function scoreLabel(s: number) {
  if (s <= 20) return "Low Risk";
  if (s <= 45) return "Moderate";
  if (s <= 70) return "Elevated";
  return "High Risk";
}
function formatFreq(af: number | null) {
  if (af === null || af === undefined) return "—";
  if (af < 0.001) return "<0.1%";
  return (af * 100).toFixed(1) + "%";
}

// ── Component ──────────────────────────────────────────────────────────────

export default function DemoPage() {
  const { scores } = SAMPLE_REPORT;
  const {
    overall_risk_score,
    summary_sentence,
    summary,
    priority_actions,
    doctor_notes,
    disease_risks,
    pharmacogenomics,
    variant_table,
    enrichment_stats,
    disclaimer,
  } = scores;

  const { carrier_status = [], nutrigenomics = [], traits = [], mental_health = [], longevity = [] } = scores as any;

  const [expandedDetails, setExpandedDetails] = useState(false);
  const [expandedVariants, setExpandedVariants] = useState(false);
  const [expandedDisease, setExpandedDisease] = useState<string | null>(null);
  const [expandedPgx, setExpandedPgx] = useState<string | null>(null);

  const riskColor = scoreColor(overall_risk_score);
  const riskLabel = scoreLabel(overall_risk_score);
  const protective = disease_risks.filter((r: any) => r.risk_tier === "below_average");
  const p1Count = priority_actions.filter((a: any) => a.priority === "P1").length;

  return (
    <main className="min-h-screen pb-28" style={{ background: "var(--background)" }}>

      {/* ── Demo banner ── */}
      <div className="py-2 text-center text-xs font-semibold"
        style={{ background: "rgba(99,102,241,0.15)", color: "var(--accent)", borderBottom: "1px solid rgba(99,102,241,0.2)" }}>
        SAMPLE REPORT — showing how your report will look with real DNA data
      </div>

      {/* ── Header ── */}
      <div className="px-6 pt-8 pb-2 max-w-3xl mx-auto">
        <a href="/" className="text-xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>allela</a>
        <div className="mt-6 mb-1 flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Your DNA Risk Report</h1>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: "var(--border)", color: "var(--muted)" }}>
            {SAMPLE_REPORT.format_detected} · {SAMPLE_REPORT.snp_count.toLocaleString()} SNPs
          </span>
        </div>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          {new Date(SAMPLE_REPORT.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          1. SCORE CARD
      ══════════════════════════════════════════════════════════════ */}
      <div className="px-6 mt-5 max-w-3xl mx-auto">
        <div className="rounded-2xl p-6 relative overflow-hidden"
          style={{ background: "var(--card)", border: `1px solid ${riskColor}30` }}>
          {/* Glow blob */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${riskColor}12 0%, transparent 70%)`, transform: "translate(20%, -20%)" }} />

          <div className="relative flex items-start justify-between gap-6 flex-wrap">
            {/* Score */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>
                Overall Risk Score
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-bold" style={{ fontSize: "72px", lineHeight: 1, color: riskColor }}>
                  {overall_risk_score}
                </span>
                <div>
                  <div className="text-sm font-bold px-2.5 py-1 rounded-lg inline-block"
                    style={{ background: riskColor + "20", color: riskColor }}>
                    {riskLabel}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>out of 100</div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-4 w-56 h-2.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div className="h-full rounded-full" style={{ width: `${overall_risk_score}%`, background: `linear-gradient(90deg, #22c55e, #eab308, ${riskColor})` }} />
              </div>
              <div className="flex justify-between w-56 mt-1">
                <span className="text-xs" style={{ color: "var(--muted)" }}>Low</span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>High</span>
              </div>
            </div>

            {/* Mini stats */}
            <div className="flex flex-col gap-3 min-w-44">
              {[
                { label: "Disease Risk", value: `${summary.high_risk_count + summary.elevated_risk_count} of ${summary.conditions_evaluated} elevated`, dot: summary.high_risk_count > 0 ? "#ef4444" : "#f97316" },
                { label: "PGx Flags", value: `${summary.pgx_findings_count} drug alerts`, dot: "#f97316" },
                { label: "Priority Actions", value: `${priority_actions.length} total${p1Count > 0 ? ` · ${p1Count} critical` : ""}`, dot: p1Count > 0 ? "#ef4444" : "var(--accent)" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                  <div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>{s.label}</div>
                    <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary sentence */}
          <div className="mt-5 pt-4 relative" style={{ borderTop: "1px solid var(--border)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              <span className="font-semibold" style={{ color: "var(--foreground)" }}>Summary: </span>
              {summary_sentence}
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          2. LIVE DB STATUS
      ══════════════════════════════════════════════════════════════ */}
      <div className="px-6 mt-3 max-w-3xl mx-auto">
        <div className="rounded-xl px-5 py-3.5 flex items-center justify-between flex-wrap gap-4"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-xs mr-2" style={{ color: "var(--muted)" }}>Live data from</span>
            {["NCBI dbSNP", "ClinVar NLM", "GWAS Catalog", "Ensembl"].map(src => (
              <span key={src} className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#22c55e" }} />
                {src}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            {[
              { value: enrichment_stats.enriched, label: "variants enriched" },
              { value: enrichment_stats.clinvar_hits, label: "ClinVar hits" },
              { value: enrichment_stats.gwas_traits_total, label: "GWAS traits" },
              { value: enrichment_stats.pathogenic_count, label: "pathogenic", color: "#ef4444" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-bold leading-tight" style={{ color: s.color || "var(--accent)" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          3. PRIORITY ACTIONS
      ══════════════════════════════════════════════════════════════ */}
      <div className="px-6 mt-7 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🎯</span>
          <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Priority Actions</h2>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium ml-1"
            style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>
            {p1Count} critical
          </span>
        </div>

        <div className="space-y-2.5">
          {priority_actions.map((action: any, i: number) => {
            const c = PRIORITY_COLOR[action.priority as Priority];
            return (
              <div key={i} className="rounded-xl p-4"
                style={{ background: c + "0d", border: `1px solid ${c}30` }}>
                <div className="flex items-start gap-3">
                  {/* Priority badge */}
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="text-xs font-black px-2 py-1 rounded-md"
                      style={{ background: c + "25", color: c, border: `1px solid ${c}50`, letterSpacing: "0.05em" }}>
                      {action.priority}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{action.title}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded font-medium"
                        style={{ background: "var(--border)", color: "var(--muted)" }}>
                        {action.category === "pgx" ? "💊 PGx" : "🧬 Disease"}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          4. WHAT TO TELL YOUR DOCTOR
      ══════════════════════════════════════════════════════════════ */}
      <div className="px-6 mt-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🩺</span>
          <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>What to Tell Your Doctor</h2>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--card-alt)", borderBottom: "1px solid var(--border)" }}>
                {["Drug / Class", "Gene", "What to Say"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider"
                    style={{ color: "var(--muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {doctor_notes.map((note: any, i: number) => (
                <tr key={i} style={{ borderBottom: i < doctor_notes.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td className="px-4 py-3.5 text-sm font-semibold" style={{ color: "var(--foreground)", minWidth: "140px" }}>
                    {note.drug}
                  </td>
                  <td className="px-4 py-3.5" style={{ minWidth: "100px" }}>
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded-md"
                      style={{ background: "rgba(249,115,22,0.12)", color: "#f97316", border: "1px solid rgba(249,115,22,0.25)" }}>
                      {note.gene}{note.star_allele ? ` ${note.star_allele}` : ""}
                    </span>
                    <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>{note.zygosity}</div>
                  </td>
                  <td className="px-4 py-3.5 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                    {note.what_to_say}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-2 flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
          <span>🖨️</span> Print this table and bring it to your next appointment — one conversation covers all your drug alerts.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          5. DETAILED FINDINGS (collapsed accordion)
      ══════════════════════════════════════════════════════════════ */}
      <div className="px-6 mt-8 max-w-3xl mx-auto">
        <button
          onClick={() => setExpandedDetails(v => !v)}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-left transition-colors"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div>
            <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>
              Detailed Findings
            </span>
            <span className="text-xs ml-2" style={{ color: "var(--muted)" }}>
              {summary.conditions_evaluated} conditions · disease risks + longevity markers
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[
                { count: summary.high_risk_count, color: "#ef4444" },
                { count: summary.elevated_risk_count, color: "#f97316" },
              ].map((b, i) => b.count > 0 && (
                <span key={i} className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: b.color + "20", color: b.color }}>
                  {b.count}
                </span>
              ))}
            </div>
            <span className="text-xs font-medium px-3 py-1.5 rounded-lg"
              style={{ background: "var(--border)", color: "var(--muted)" }}>
              {expandedDetails ? "↑ collapse" : "↓ expand"}
            </span>
          </div>
        </button>

        {expandedDetails && (
          <div className="mt-3 space-y-2">
            {disease_risks.filter((r: any) => r.risk_tier !== "below_average").map((risk: any) => (
              <div key={risk.condition_key}
                className="rounded-xl overflow-hidden cursor-pointer transition-all"
                style={{ background: "var(--card)", border: `1px solid ${TIER_COLOR[risk.risk_tier as RiskTier]}25` }}
                onClick={() => setExpandedDisease(expandedDisease === risk.condition_key ? null : risk.condition_key)}>
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 rounded-full flex-shrink-0"
                      style={{ background: TIER_COLOR[risk.risk_tier as RiskTier] }} />
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{risk.condition}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        {risk.evidence_grade} evidence · {risk.method === "prs" ? "Polygenic Risk Score" : "Monogenic"}
                        {risk.prs_percentile !== undefined && ` · ${risk.prs_percentile}th percentile`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-xl font-black" style={{ color: TIER_COLOR[risk.risk_tier as RiskTier] }}>
                        {risk.lifetime_risk_pct}%
                      </div>
                      <div className="text-xs" style={{ color: "var(--muted)" }}>
                        vs {risk.population_avg_pct}% avg
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg whitespace-nowrap"
                      style={{ background: TIER_COLOR[risk.risk_tier as RiskTier] + "20", color: TIER_COLOR[risk.risk_tier as RiskTier] }}>
                      {TIER_LABEL[risk.risk_tier as RiskTier]}
                    </span>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>
                      {expandedDisease === risk.condition_key ? "▲" : "▼"}
                    </span>
                  </div>
                </div>
                {expandedDisease === risk.condition_key && (
                  <div className="px-5 pb-4" style={{ borderTop: "1px solid var(--border)" }}>
                    {risk.key_findings.length > 0 && (
                      <div className="mt-3 space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>Key Findings</p>
                        {risk.key_findings.map((f: string, i: number) => (
                          <div key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--foreground)" }}>
                            <span style={{ color: TIER_COLOR[risk.risk_tier as RiskTier] }}>•</span>
                            {f}
                          </div>
                        ))}
                      </div>
                    )}
                    {risk.prs_percentile !== undefined && (
                      <div className="mt-3">
                        <p className="text-xs" style={{ color: "var(--muted)" }}>
                          Polygenic risk percentile:{" "}
                          <strong style={{ color: "var(--foreground)" }}>{risk.prs_percentile}th</strong>
                          {risk.coverage_pct !== undefined && (
                            <span> · {risk.coverage_pct}% of variants found in your file</span>
                          )}
                        </p>
                        {/* Percentile bar */}
                        <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                          <div className="h-full rounded-full"
                            style={{ width: `${risk.prs_percentile}%`, background: `linear-gradient(90deg, #22c55e, ${TIER_COLOR[risk.risk_tier as RiskTier]})` }} />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs" style={{ color: "var(--muted)" }}>0th</span>
                          <span className="text-xs font-semibold" style={{ color: TIER_COLOR[risk.risk_tier as RiskTier] }}>{risk.prs_percentile}th percentile</span>
                          <span className="text-xs" style={{ color: "var(--muted)" }}>100th</span>
                        </div>
                      </div>
                    )}
                    {risk.note && (
                      <p className="mt-3 text-xs italic px-3 py-2 rounded-lg"
                        style={{ color: "var(--muted)", background: "var(--card-alt)", border: "1px solid var(--border)" }}>
                        ℹ️ {risk.note}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* PGx section inside accordion */}
            {pharmacogenomics.map((pgx: any) => (
              <div key={pgx.rsid}
                className="rounded-xl overflow-hidden cursor-pointer"
                style={{ background: "var(--card)", border: "1px solid rgba(249,115,22,0.2)" }}
                onClick={() => setExpandedPgx(expandedPgx === pgx.rsid ? null : pgx.rsid)}>
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: "#f97316" }} />
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                        {pgx.gene}{pgx.star_allele ? ` ${pgx.star_allele}` : ""} — {pgx.zygosity}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        💊 PGx · {pgx.drug_classes.slice(0, 2).join(", ")}{pgx.drug_classes.length > 2 ? ` +${pgx.drug_classes.length - 2}` : ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg"
                      style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}>
                      {pgx.zygosity === "homozygous" ? "HOMO" : "HETERO"}
                    </span>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>
                      {expandedPgx === pgx.rsid ? "▲" : "▼"}
                    </span>
                  </div>
                </div>
                {expandedPgx === pgx.rsid && (
                  <div className="px-5 pb-4" style={{ borderTop: "1px solid var(--border)" }}>
                    <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>{pgx.effect}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {pgx.drug_classes.map((d: string) => (
                        <span key={d} className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>
                          {d}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-xs p-3 rounded-lg leading-relaxed"
                      style={{ background: "rgba(249,115,22,0.06)", color: "var(--foreground)", border: "1px solid rgba(249,115,22,0.15)" }}>
                      <strong>Clinical guidance:</strong> {pgx.clinical_guidance}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Variant table sub-accordion */}
            <div className="mt-2">
              <button
                onClick={() => setExpandedVariants(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left"
                style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  🔬 Live Variant Table — {variant_table.length} variants · data fetched from 4 real-time databases
                </span>
                <span className="text-xs px-2 py-1 rounded font-medium ml-2 flex-shrink-0"
                  style={{ background: "rgba(99,102,241,0.15)", color: "var(--accent)" }}>
                  {expandedVariants ? "▲ hide" : "▼ show"}
                </span>
              </button>

              {expandedVariants && (
                <div className="mt-2 rounded-xl overflow-x-auto" style={{ border: "1px solid var(--border)" }}>
                  <table className="w-full text-xs min-w-[700px]">
                    <thead>
                      <tr style={{ background: "var(--card-alt)", borderBottom: "1px solid var(--border)" }}>
                        {["rsID", "Genotype", "Gene", "Condition", "Clinical Sig.", "gnomAD freq", "GWAS Traits"].map(h => (
                          <th key={h} className="text-left px-3 py-3 font-bold uppercase tracking-wider text-xs whitespace-nowrap"
                            style={{ color: "var(--muted)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {variant_table.map((row: any, i: number) => {
                        const sigColor = CLIN_SIG_COLOR[row.clinical_significance] || "var(--muted)";
                        return (
                          <tr key={row.rsid}
                            style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--card-alt)" }}>
                            <td className="px-3 py-2.5 font-mono text-xs" style={{ color: "var(--accent)" }}>{row.rsid}</td>
                            <td className="px-3 py-2.5">
                              <span className="font-mono font-black text-sm" style={{ color: "var(--foreground)" }}>{row.genotype}</span>
                            </td>
                            <td className="px-3 py-2.5 font-semibold" style={{ color: "var(--foreground)" }}>{row.gene || "—"}</td>
                            <td className="px-3 py-2.5 max-w-[140px]" style={{ color: "var(--muted)" }}>
                              <span className="truncate block" title={row.condition}>{row.condition || "—"}</span>
                            </td>
                            <td className="px-3 py-2.5">
                              {row.clinical_significance
                                ? <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                                    style={{ background: sigColor + "20", color: sigColor, border: `1px solid ${sigColor}40` }}>
                                    {row.clinical_significance}
                                  </span>
                                : <span style={{ color: "var(--muted)" }}>—</span>}
                            </td>
                            <td className="px-3 py-2.5">
                              {row.gnomad_af != null ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-14 h-1.5 rounded-full overflow-hidden flex-shrink-0" style={{ background: "var(--border)" }}>
                                    <div className="h-full rounded-full" style={{ width: `${Math.min(100, row.gnomad_af * 300)}%`, background: "var(--accent)" }} />
                                  </div>
                                  <span style={{ color: "var(--foreground)", fontWeight: 500 }}>{formatFreq(row.gnomad_af)}</span>
                                </div>
                              ) : <span style={{ color: "var(--muted)" }}>—</span>}
                            </td>
                            <td className="px-3 py-2.5">
                              {row.gwas_traits.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {row.gwas_traits.slice(0, 2).map((t: string) => (
                                    <span key={t} className="text-xs px-1.5 py-0.5 rounded"
                                      style={{ background: "rgba(99,102,241,0.1)", color: "var(--accent)" }}>
                                      {t}
                                    </span>
                                  ))}
                                  {row.gwas_traits.length > 2 && (
                                    <span className="text-xs" style={{ color: "var(--muted)" }}>+{row.gwas_traits.length - 2}</span>
                                  )}
                                </div>
                              ) : <span style={{ color: "var(--muted)" }}>—</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ══ CARRIER STATUS ══ */}
      <div className="px-6 mt-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🧬</span>
          <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Carrier Status</h2>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: "var(--card-alt)", color: "var(--muted)" }}>
            {(carrier_status as CarrierResult[]).length} conditions screened
          </span>
        </div>
        {(carrier_status as CarrierResult[]).filter((c: CarrierResult) => c.status !== "not_detected").length === 0 ? (
          <div className="rounded-2xl px-6 py-5 flex items-center gap-4"
            style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <span className="text-2xl">✅</span>
            <div>
              <div className="font-bold text-sm" style={{ color: "var(--foreground)" }}>No carrier variants detected across all {(carrier_status as CarrierResult[]).length} conditions</div>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Screened for CF, Sickle Cell, Hearing Loss, Tay-Sachs, and Gaucher Disease.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {(carrier_status as CarrierResult[]).filter((c: CarrierResult) => c.status !== "not_detected").map((c: CarrierResult) => (
              <div key={c.condition_key} className="rounded-2xl p-5"
                style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.25)" }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🟡</span>
                    <div>
                      <div className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{c.condition}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        {c.gene} · {c.hits.map((h: any) => h.variant_name).filter(Boolean).join(", ")}
                      </div>
                      {c.hits.map((h: any, i: number) => (
                        <p key={i} className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>{h.effect}</p>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg flex-shrink-0"
                    style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}>CARRIER</span>
                </div>
                <div className="mt-3 text-xs p-3 rounded-xl leading-relaxed"
                  style={{ background: "rgba(249,115,22,0.08)", color: "var(--foreground)", border: "1px solid rgba(249,115,22,0.15)" }}>
                  <strong>Family planning note:</strong> If your partner also carries a <strong>{c.gene}</strong> variant, each pregnancy has a 25% chance of an affected child. Partner testing recommended.
                </div>
              </div>
            ))}
            <div className="text-xs px-4 py-2 rounded-xl" style={{ color: "var(--muted)", background: "var(--card-alt)" }}>
              ✓ Not detected: {(carrier_status as CarrierResult[]).filter((c: CarrierResult) => c.status === "not_detected").map((c: CarrierResult) => c.condition).join(" · ")}
            </div>
          </div>
        )}
      </div>

      {/* ══ NUTRITION & METABOLISM ══ */}
      {(nutrigenomics as NutritionResult[]).length > 0 && (
        <div className="px-6 mt-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🥑</span>
            <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Nutrition & Metabolism</h2>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            {["Digestive", "Metabolism", "Vitamins & Minerals", "Alcohol Metabolism", "Nutrition", "Taste & Food Preferences"].map(cat => {
              const items = (nutrigenomics as NutritionResult[]).filter((n: NutritionResult) => n.category === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <div className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
                    style={{ background: "var(--card-alt)", borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>
                    {cat}
                  </div>
                  {items.map((n: NutritionResult) => {
                    const dotColor = n.copies_of_risk_allele === 2 ? "#ef4444" : n.copies_of_risk_allele === 1 ? "#f97316" : "#22c55e";
                    return (
                      <div key={n.rsid} className="flex items-start gap-4 px-5 py-4"
                        style={{ borderBottom: "1px solid var(--border)" }}>
                        <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: dotColor }} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{n.trait}</span>
                            <span className="font-mono text-xs px-2 py-0.5 rounded-md"
                              style={{ background: "rgba(99,102,241,0.08)", color: "var(--accent)" }}>
                              {n.gene} · {n.rsid}
                            </span>
                          </div>
                          <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>{n.result}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══ GENETIC TRAITS ══ */}
      {(traits as TraitResult[]).length > 0 && (
        <div className="px-6 mt-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🏃</span>
            <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Genetic Traits</h2>
          </div>
          <div className="space-y-3">
            {["Physical Traits", "Athletic Traits", "Behavioral Traits"].map(cat => {
              const items = (traits as TraitResult[]).filter((t: TraitResult) => t.category === cat);
              if (items.length === 0) return null;
              const catIcon: Record<string, string> = { "Physical Traits": "👁️", "Athletic Traits": "💪", "Behavioral Traits": "🧠" };
              return (
                <div key={cat} className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                  <div className="px-5 py-3 flex items-center gap-2"
                    style={{ background: "var(--card-alt)", borderBottom: "1px solid var(--border)" }}>
                    <span className="text-base">{catIcon[cat] || "🔬"}</span>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>{cat}</span>
                  </div>
                  <div>
                    {items.map((t: TraitResult, i: number) => (
                      <div key={t.rsid} className="flex items-start justify-between gap-4 px-5 py-4"
                        style={{ borderBottom: i < items.length - 1 ? "1px solid var(--border)" : "none" }}>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{t.trait}</div>
                          <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                            {t.gene} · <span className="font-mono">{t.rsid}</span> · genotype: <span className="font-mono font-bold">{t.genotype}</span>
                          </div>
                          {t.note && <p className="text-xs mt-1 italic" style={{ color: "var(--muted)" }}>{t.note}</p>}
                        </div>
                        <div className="text-right flex-shrink-0 max-w-xs">
                          <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{t.result}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MENTAL HEALTH & BRAIN CHEMISTRY
      ══════════════════════════════════════════════════════════════ */}
      {(mental_health as MentalHealthResult[]).length > 0 && (
        <div className="px-6 mt-8 max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden card-shadow" style={{ border: "1px solid var(--border)" }}>
            <div className="px-6 py-4 flex items-center gap-3" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
              <span className="text-xl">🧠</span>
              <div>
                <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Mental Health & Brain Chemistry</h2>
                <p className="text-xs" style={{ color: "var(--muted)" }}>Neurotransmitter system variants — informational only, not diagnostic</p>
              </div>
            </div>
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {(mental_health as MentalHealthResult[]).map(m => {
                const dotColor = m.copies_of_risk_allele === 0 ? "#22c55e" : m.copies_of_risk_allele === 1 ? "#f59e0b" : "#f97316";
                return (
                  <div key={m.rsid} className="px-6 py-4" style={{ background: "var(--card)" }}>
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: dotColor }} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{m.trait}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(139,92,246,0.1)", color: "#7c3aed", border: "1px solid rgba(139,92,246,0.2)" }}>{m.gene}</span>
                          <span className="text-xs" style={{ color: "var(--muted)" }}>{m.category}</span>
                        </div>
                        <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--foreground)" }}>{m.result}</p>
                        {m.note && <p className="text-xs mt-1.5 italic" style={{ color: "var(--muted)" }}>{m.note}</p>}
                        <div className="text-xs mt-2 font-mono" style={{ color: "var(--muted)" }}>
                          {m.rsid} · genotype <span className="font-bold" style={{ color: "var(--foreground)" }}>{m.genotype}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          LONGEVITY & INFLAMMATION
      ══════════════════════════════════════════════════════════════ */}
      {(longevity as LongevityResult[]).length > 0 && (
        <div className="px-6 mt-8 max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden card-shadow" style={{ border: "1px solid var(--border)" }}>
            <div className="px-6 py-4 flex items-center gap-3" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
              <span className="text-xl">⏳</span>
              <div>
                <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Longevity & Inflammation</h2>
                <p className="text-xs" style={{ color: "var(--muted)" }}>Aging pathway variants — FOXO3, telomeres, metabolic efficiency, inflammatory cytokines</p>
              </div>
            </div>
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {(longevity as LongevityResult[]).map(l => {
                const dotColor = l.protective ? "#22c55e" : l.copies_of_risk_allele === 0 ? "#22c55e" : l.copies_of_risk_allele === 1 ? "#f59e0b" : "#ef4444";
                return (
                  <div key={l.rsid} className="px-6 py-4" style={{ background: "var(--card)" }}>
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: dotColor }} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{l.trait}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(13,148,136,0.1)", color: "#0d9488", border: "1px solid rgba(13,148,136,0.2)" }}>{l.gene}</span>
                          <span className="text-xs" style={{ color: "var(--muted)" }}>{l.category}</span>
                          {l.protective && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(34,197,94,0.12)", color: "#16a34a", border: "1px solid rgba(34,197,94,0.25)" }}>★ Longevity allele</span>
                          )}
                        </div>
                        <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--foreground)" }}>{l.result}</p>
                        {l.note && <p className="text-xs mt-1.5 italic" style={{ color: "var(--muted)" }}>{l.note}</p>}
                        <div className="text-xs mt-2 font-mono" style={{ color: "var(--muted)" }}>
                          {l.rsid} · genotype <span className="font-bold" style={{ color: "var(--foreground)" }}>{l.genotype}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          6. PROTECTIVE FINDINGS
      ══════════════════════════════════════════════════════════════ */}
      {protective.length > 0 && (
        <div className="px-6 mt-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✦</span>
            <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Protective Findings</h2>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}>
              {protective.length} below population average
            </span>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.2)" }}>
            {protective.map((r: any, i: number) => (
              <div key={r.condition_key}
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: i < protective.length - 1 ? "1px solid rgba(34,197,94,0.12)" : "none" }}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">✅</span>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{r.condition}</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>
                      {r.method === "prs" ? "Polygenic Risk Score" : "Monogenic"}
                      {r.key_findings.length > 0 && ` · ${r.key_findings[0]}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-base font-black" style={{ color: "#22c55e" }}>{r.lifetime_risk_pct}%</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>vs {r.population_avg_pct}% avg</div>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg"
                    style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
                    BELOW AVG
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div className="px-6 mt-10 max-w-3xl mx-auto">
        <div className="rounded-2xl p-6 text-center"
          style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <div className="text-2xl mb-2">🧬</div>
          <h3 className="font-bold text-base mb-1" style={{ color: "var(--foreground)" }}>
            This is a sample report
          </h3>
          <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
            Upload your real DNA file from 23andMe, AncestryDNA, or MyHeritage to get your personalised report with live data from NCBI, ClinVar, GWAS Catalog, and Ensembl.
          </p>
          <a href="/upload"
            className="inline-block px-8 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
            style={{ background: "var(--accent)", color: "#fff" }}>
            Upload Your DNA File →
          </a>
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div className="px-6 mt-6 max-w-3xl mx-auto">
        <div className="p-4 rounded-xl text-xs text-center"
          style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>
          {disclaimer}
        </div>
      </div>

    </main>
  );
}
