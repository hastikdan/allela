// Auto-generated — do not edit manually
// Run allela_backend scorer on sample files to regenerate

export const SAMPLE_PROFILE_SCORES: Record<string, any> = {
  "high-cardiovascular-risk": {
    "disease_risks": [
      {
        "condition": "Venous Thromboembolism",
        "condition_key": "vte",
        "method": "monogenic",
        "lifetime_risk_pct": 3.0,
        "population_avg_pct": 1.0,
        "risk_tier": "high",
        "evidence_grade": "Strong",
        "key_findings": [
          "F5 rs6025 — Factor V Leiden — 5-7x increased risk of blood clots (DVT/PE)"
        ],
        "snps_evaluated": 1,
        "snps_found": 1
      },
      {
        "condition": "Atrial Fibrillation",
        "condition_key": "atrial_fibrillation",
        "method": "prs",
        "lifetime_risk_pct": 24.4,
        "population_avg_pct": 25.0,
        "risk_tier": "elevated",
        "evidence_grade": "Moderate",
        "prs_percentile": 49,
        "snps_evaluated": 5,
        "snps_found": 1,
        "coverage_pct": 20,
        "key_findings": [
          "PITX2 (rs2200733) — 2 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Alzheimer's Disease",
        "condition_key": "alzheimers",
        "method": "monogenic",
        "lifetime_risk_pct": 20.0,
        "population_avg_pct": 9.0,
        "risk_tier": "elevated",
        "evidence_grade": "Strong",
        "key_findings": [
          "APOE genotype: ε4/ε3"
        ],
        "snps_evaluated": 2,
        "snps_found": 2
      },
      {
        "condition": "Type 2 Diabetes",
        "condition_key": "type2_diabetes",
        "method": "prs",
        "lifetime_risk_pct": 18.7,
        "population_avg_pct": 11.0,
        "risk_tier": "elevated",
        "evidence_grade": "Moderate",
        "prs_percentile": 71,
        "snps_evaluated": 10,
        "snps_found": 4,
        "coverage_pct": 40,
        "key_findings": [
          "TCF7L2 (rs7903146) — 2 risk allele(s)",
          "KCNJ11 (rs5219) — 2 risk allele(s)",
          "PPARG (rs1801282) — 2 risk allele(s)",
          "SLC30A8 (rs13266634) — 1 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Osteoporosis / Low Bone Density",
        "condition_key": "osteoporosis",
        "method": "prs",
        "lifetime_risk_pct": 8.7,
        "population_avg_pct": 15.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 28,
        "snps_evaluated": 6,
        "snps_found": 1,
        "coverage_pct": 17,
        "key_findings": [
          "LRP5 (rs3736228) — 2 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Coronary Artery Disease",
        "condition_key": "coronary_artery_disease",
        "method": "prs",
        "lifetime_risk_pct": 7.6,
        "population_avg_pct": 10.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 39,
        "snps_evaluated": 8,
        "snps_found": 2,
        "coverage_pct": 25,
        "key_findings": [
          "9p21.3 (rs1333049) — 2 risk allele(s)",
          "CDKN2B-AS1 (rs4977574) — 2 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Prostate Cancer",
        "condition_key": "prostate_cancer",
        "method": "prs",
        "lifetime_risk_pct": 4.9,
        "population_avg_pct": 13.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 6,
        "snps_found": 0,
        "coverage_pct": 0,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Breast Cancer",
        "condition_key": "breast_cancer",
        "method": "prs",
        "lifetime_risk_pct": 4.7,
        "population_avg_pct": 12.5,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 7,
        "snps_found": 0,
        "coverage_pct": 0,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Age-Related Macular Degeneration",
        "condition_key": "amd",
        "method": "prs",
        "lifetime_risk_pct": 1.2,
        "population_avg_pct": 1.5,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 40,
        "snps_evaluated": 5,
        "snps_found": 2,
        "coverage_pct": 40,
        "key_findings": [
          "CFH (rs1061170) — 1 risk allele(s)",
          "ARMS2 (rs10490924) — 1 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Inflammatory Bowel Disease",
        "condition_key": "ibd",
        "method": "prs",
        "lifetime_risk_pct": 0.6,
        "population_avg_pct": 1.5,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 5,
        "snps_found": 0,
        "coverage_pct": 0,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      }
    ],
    "pharmacogenomics": [
      {
        "gene": "CYP2C19",
        "rsid": "rs4244285",
        "star_allele": "*2",
        "copies": 2,
        "zygosity": "homozygous",
        "effect": "Poor metabolizer allele — reduced metabolism of clopidogrel, SSRIs (escitalopram, citalopram), PPIs",
        "drug_classes": [
          "Antiplatelet (clopidogrel)",
          "SSRIs",
          "Proton pump inhibitors"
        ],
        "clinical_guidance": "Clopidogrel may be less effective; consider alternative antiplatelet therapy. SSRI dosing may need adjustment.",
        "source": "CPIC"
      },
      {
        "gene": "SLCO1B1",
        "rsid": "rs4149056",
        "star_allele": "*5",
        "copies": 1,
        "zygosity": "heterozygous",
        "effect": "Reduced statin transport into liver — elevated statin blood levels, increased myopathy risk",
        "drug_classes": [
          "Statins (simvastatin, atorvastatin)"
        ],
        "clinical_guidance": "High-dose simvastatin should be avoided; consider rosuvastatin or pravastatin with lower myopathy risk.",
        "source": "CPIC"
      },
      {
        "gene": "CYP2C9",
        "rsid": "rs1799853",
        "star_allele": "*2",
        "copies": 1,
        "zygosity": "heterozygous",
        "effect": "Intermediate metabolizer allele — reduced metabolism of warfarin, NSAIDs, and phenytoin",
        "drug_classes": [
          "Warfarin",
          "NSAIDs (celecoxib, ibuprofen)",
          "Sulfonylureas"
        ],
        "clinical_guidance": "Warfarin dose requirements are typically 15–20% lower. Monitor INR closely during initiation.",
        "source": "CPIC"
      }
    ],
    "carrier_status": [
      {
        "condition": "Cystic Fibrosis",
        "condition_key": "cystic_fibrosis",
        "gene": "CFTR",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.032,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "Most common CF-causing variant (~70% of CF alleles). Carriers are healthy.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Sickle Cell Anemia",
        "condition_key": "sickle_cell",
        "gene": "HBB",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.08,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "Sickle hemoglobin allele. Carriers (HbAS) are generally healthy with slight malaria protection.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Hereditary Hearing Loss",
        "condition_key": "hearing_loss_gjb2",
        "gene": "GJB2",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.025,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "Most common hereditary hearing loss variant in Europeans. Carriers have normal hearing.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Tay-Sachs Disease",
        "condition_key": "tay_sachs",
        "gene": "HEXA",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.033,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "Common Tay-Sachs variant in Ashkenazi Jewish population. Carriers are healthy.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Gaucher Disease",
        "condition_key": "gaucher",
        "gene": "GBA",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.005,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "GBA L444P — causes severe (type 3) Gaucher disease when homozygous. Carriers are healthy.",
        "source": "ClinVar Pathogenic"
      }
    ],
    "nutrigenomics": [
      {
        "trait": "Lactose Tolerance",
        "trait_key": "lactose_tolerance",
        "gene": "LCT",
        "rsid": "rs4988235",
        "genotype": "GG",
        "category": "Digestive",
        "copies_of_risk_allele": 0,
        "result": "Lactase persistence — tolerates dairy well into adulthood",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Caffeine Metabolism",
        "trait_key": "caffeine_metabolism",
        "gene": "CYP1A2",
        "rsid": "rs762551",
        "genotype": "CA",
        "category": "Metabolism",
        "copies_of_risk_allele": 1,
        "result": "Intermediate caffeine metabolizer — moderate clearance rate",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Vitamin D Levels",
        "trait_key": "vitamin_d",
        "gene": "GC",
        "rsid": "rs2282679",
        "genotype": "AC",
        "category": "Vitamins & Minerals",
        "copies_of_risk_allele": 0,
        "result": "Normal vitamin D-binding protein — typical transport capacity",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Folate Metabolism (C677T)",
        "trait_key": "mthfr_677",
        "gene": "MTHFR",
        "rsid": "rs1801133",
        "genotype": "CT",
        "category": "Vitamins & Minerals",
        "copies_of_risk_allele": 1,
        "result": "~35% reduced MTHFR activity — increased methylfolate and B12 needs",
        "source": "ClinVar / GWAS"
      },
      {
        "trait": "Folate Metabolism (A1298C)",
        "trait_key": "mthfr_1298",
        "gene": "MTHFR",
        "rsid": "rs1801131",
        "genotype": "CC",
        "category": "Vitamins & Minerals",
        "copies_of_risk_allele": 2,
        "result": "Reduced BH4 pathway — may affect dopamine/serotonin synthesis; consider methylfolate",
        "source": "ClinVar"
      },
      {
        "trait": "Alcohol Flush Reaction",
        "trait_key": "alcohol_flush",
        "gene": "ALDH2",
        "rsid": "rs671",
        "genotype": "GG",
        "category": "Alcohol Metabolism",
        "copies_of_risk_allele": 0,
        "result": "Normal aldehyde metabolism — no genetic alcohol flush",
        "source": "ClinVar / GWAS"
      },
      {
        "trait": "Omega-3 Fatty Acid Conversion",
        "trait_key": "omega3_conversion",
        "gene": "FADS1",
        "rsid": "rs174537",
        "genotype": "GG",
        "category": "Nutrition",
        "copies_of_risk_allele": 0,
        "result": "High FADS1 activity — efficient conversion of plant-based ALA to EPA/DHA",
        "source": "GWAS Catalog"
      },
      {
        "trait": "Bitter Taste Sensitivity",
        "trait_key": "bitter_taste",
        "gene": "TAS2R38",
        "rsid": "rs713598",
        "genotype": "GC",
        "category": "Taste & Food Preferences",
        "copies_of_risk_allele": 1,
        "result": "Medium taster — moderate bitter sensitivity",
        "source": "Multiple GWAS"
      }
    ],
    "traits": [
      {
        "trait": "Eye Color",
        "trait_key": "eye_color",
        "gene": "HERC2",
        "rsid": "rs12913832",
        "genotype": "AG",
        "category": "Physical Traits",
        "result": "Likely intermediate (hazel or green) eyes",
        "note": "Primary genetic determinant; other genes (OCA2, SLC45A2) also contribute.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Red Hair Risk",
        "trait_key": "red_hair",
        "gene": "MC1R",
        "rsid": "rs1805008",
        "genotype": "TT",
        "category": "Physical Traits",
        "result": "Two MC1R R151C alleles — strong red hair genetic signal; significantly increased UV sensitivity",
        "note": "MC1R variants also increase sensitivity to UV radiation and anesthetic requirements.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Earwax Type",
        "trait_key": "earwax_type",
        "gene": "ABCC11",
        "rsid": "rs17822931",
        "genotype": "CT",
        "category": "Physical Traits",
        "result": "Wet/sticky earwax (heterozygous)",
        "note": "",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Sleep Chronotype",
        "trait_key": "sleep_chronotype",
        "gene": "CLOCK",
        "rsid": "rs1801260",
        "genotype": "GG",
        "category": "Behavioral Traits",
        "result": "Evening preference (night owl) genetic tendency",
        "note": "",
        "source": "GWAS Catalog"
      },
      {
        "trait": "Muscle Fiber Composition",
        "trait_key": "muscle_composition",
        "gene": "ACTN3",
        "rsid": "rs1815739",
        "genotype": "CT",
        "category": "Athletic Traits",
        "result": "Mixed muscle fiber profile",
        "note": "Olympic sprinters rarely carry TT; endurance athletes have elevated TT frequency.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Androgenic Hair Loss Risk (Males)",
        "trait_key": "hair_loss",
        "gene": "AR",
        "rsid": "rs6152",
        "genotype": "GG",
        "category": "Physical Traits",
        "result": "Lower androgen receptor activity — reduced genetic hair loss risk from X-linked locus",
        "note": "X-linked; males have one copy, so effect is direct. Multiple autosomal loci also contribute.",
        "source": "Multiple GWAS"
      }
    ],
    "mental_health": [
      {
        "trait": "Dopamine & Stress Response",
        "trait_key": "comt_dopamine",
        "gene": "COMT",
        "rsid": "rs4680",
        "genotype": "AA",
        "category": "Dopamine & Cognition",
        "copies_of_risk_allele": 2,
        "result": "Met/Met — lower COMT activity, slower dopamine clearance. Sharper working memory and focus, but stress-sensitive. Higher anxiety tendency under chronic pressure.",
        "note": "The 'warrior vs worrier' polymorphism. Neither is better — Met shines in calm, Val shines under pressure.",
        "source": "Multiple GWAS / Meta-analyses"
      },
      {
        "trait": "Brain Plasticity & Memory",
        "trait_key": "bdnf_plasticity",
        "gene": "BDNF",
        "rsid": "rs6265",
        "genotype": "AG",
        "category": "Brain Plasticity",
        "copies_of_risk_allele": 1,
        "result": "Val/Met — reduced activity-dependent BDNF release. Slightly lower episodic memory. Responds well to aerobic exercise for mood.",
        "note": "Met carriers show greater antidepressant benefit from regular aerobic exercise than non-carriers.",
        "source": "Multiple GWAS / Nature Neuroscience"
      },
      {
        "trait": "Reward Sensitivity & Motivation",
        "trait_key": "drd2_reward",
        "gene": "DRD2",
        "rsid": "rs1800497",
        "genotype": "AA",
        "category": "Dopamine Receptor",
        "copies_of_risk_allele": 2,
        "result": "Two Taq1A — ~30% fewer D2 receptors. Lower baseline reward signal; elevated risk of reward-seeking behavior and reduced motivation without external stimulation.",
        "note": "Associated with addiction vulnerability, ADHD traits, and compulsive behavior. Also linked to exercise motivation.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Serotonin Transport & Stress Sensitivity",
        "trait_key": "serotonin_transport",
        "gene": "SLC6A4",
        "rsid": "rs25531",
        "genotype": "AA",
        "category": "Serotonin System",
        "copies_of_risk_allele": 2,
        "result": "S/S — lower serotonin transporter expression. Elevated anxiety and depression risk under chronic stress. Short allele carriers are generally more responsive to SSRIs.",
        "note": "Environment strongly moderates this variant. Adverse childhood experiences amplify the S/S risk significantly.",
        "source": "Multiple GWAS / Science"
      },
      {
        "trait": "Monoamine Oxidase Activity",
        "trait_key": "maoa_activity",
        "gene": "MAOA",
        "rsid": "rs6323",
        "genotype": "GG",
        "category": "Neurotransmitter Clearance",
        "copies_of_risk_allele": 2,
        "result": "Low activity — slower neurotransmitter breakdown. More emotionally reactive and empathetic; elevated aggression risk in adverse environments.",
        "note": "X-linked gene. Males have one copy; the effect is direct and stronger. MAOA-L in adversity context is the most studied gene-environment interaction.",
        "source": "Multiple GWAS / Science"
      }
    ],
    "longevity": [
      {
        "trait": "Longevity Pathway",
        "trait_key": "foxo3_longevity",
        "gene": "FOXO3",
        "rsid": "rs2802292",
        "genotype": "GG",
        "category": "Longevity",
        "copies_of_risk_allele": 2,
        "result": "TT — both protective alleles. Consistently enriched in centenarian cohorts across Japan, Germany, Italy, and the US. Associated with reduced oxidative stress and enhanced autophagy.",
        "note": "One of the most replicated longevity variants in human genetics. FOXO3 is a master regulator of cellular stress response.",
        "source": "PNAS 2008 / Multiple replication studies",
        "protective": false
      },
      {
        "trait": "Telomere Maintenance",
        "trait_key": "tert_telomere",
        "gene": "TERT",
        "rsid": "rs10069690",
        "genotype": "CT",
        "category": "Cellular Aging",
        "copies_of_risk_allele": 1,
        "result": "CT — intermediate. Modest association with telomere attrition.",
        "note": "Telomere length reflects cumulative oxidative stress and inflammation exposure.",
        "source": "Nature Genetics / GWAS Catalog",
        "protective": false
      },
      {
        "trait": "Metabolic Efficiency & Weight Regulation",
        "trait_key": "fto_metabolism",
        "gene": "FTO",
        "rsid": "rs9939609",
        "genotype": "AA",
        "category": "Metabolic Health",
        "copies_of_risk_allele": 2,
        "result": "AA — ~1.7× increased obesity risk vs TT. Increased appetite drive, higher BMI tendency, greater carbohydrate sensitivity. Responds strongly to physical activity intervention.",
        "note": "Most common obesity-associated variant worldwide. Physical activity almost fully abolishes the FTO effect.",
        "source": "Science 2007 / Multiple GWAS",
        "protective": false
      },
      {
        "trait": "Baseline Inflammation (IL-6)",
        "trait_key": "il6_inflammation",
        "gene": "IL6",
        "rsid": "rs1800795",
        "genotype": "CC",
        "category": "Inflammation",
        "copies_of_risk_allele": 2,
        "result": "CC — higher IL-6 production. Elevated CRP and systemic inflammation. Higher cardiovascular disease, metabolic syndrome, and all-cause mortality risk.",
        "note": "IL-6 is a master pro-inflammatory cytokine. Chronic elevation accelerates biological aging.",
        "source": "Multiple GWAS / Lancet",
        "protective": false
      },
      {
        "trait": "TNF-α Inflammatory Response",
        "trait_key": "tnf_inflammation",
        "gene": "TNF",
        "rsid": "rs1800629",
        "genotype": "GA",
        "category": "Inflammation",
        "copies_of_risk_allele": 1,
        "result": "GA — higher TNF-alpha production. Moderate inflammatory tendency. Elevated autoimmune disease risk.",
        "note": "TNF-alpha is a master inflammatory cytokine. Anti-TNF biologics (etanercept, adalimumab) specifically target this pathway.",
        "source": "Multiple GWAS",
        "protective": false
      }
    ],
    "summary": {
      "conditions_evaluated": 10,
      "high_risk_count": 1,
      "elevated_risk_count": 3,
      "pgx_findings_count": 3,
      "carrier_detected": 0,
      "nutrition_traits": 8,
      "genetic_traits": 6,
      "mental_health_variants": 5,
      "longevity_variants": 5
    },
    "overall_risk_score": 27,
    "summary_sentence": "Your results show high risk for Venous Thromboembolism; elevated risk for Atrial Fibrillation (+2); 3 drug-metabolism alert(s) (CYP2C19, CYP2C9).",
    "priority_actions": [
      {
        "priority": "P1",
        "title": "Thrombosis prevention — tell every surgeon",
        "description": "Factor V Leiden or prothrombin variant detected. Discuss anticoagulation prophylaxis before any surgery, flight >4 h, immobilisation, or pregnancy. Critical before any procedure.",
        "category": "disease",
        "condition": "Venous Thromboembolism"
      },
      {
        "priority": "P1",
        "title": "CYP2C19 Poor Metabolizer — critical drug alert",
        "description": "Clopidogrel (Plavix) is INEFFECTIVE in you. Inform every cardiologist and surgeon before any cardiac procedure. Alternative: ticagrelor or prasugrel. PPIs (omeprazole, esomeprazole) accumulate — use pantoprazole or lowest dose.",
        "category": "pgx",
        "condition": "CYP2C19"
      },
      {
        "priority": "P2",
        "title": "ECG monitoring",
        "description": "Elevated AFib polygenic risk. Annual resting ECG. Report any palpitations.",
        "category": "disease",
        "condition": "Atrial Fibrillation"
      },
      {
        "priority": "P2",
        "title": "Cognitive health monitoring",
        "description": "APOE ε4 detected — elevated Alzheimer's risk. Annual cognitive screening from age 55 recommended.",
        "category": "disease",
        "condition": "Alzheimer's Disease"
      },
      {
        "priority": "P2",
        "title": "Blood sugar monitoring",
        "description": "Elevated T2D polygenic risk. Annual HbA1c recommended. Limit refined carbs, maintain healthy weight.",
        "category": "disease",
        "condition": "Type 2 Diabetes"
      },
      {
        "priority": "P2",
        "title": "SLCO1B1 — mild statin myopathy risk",
        "description": "Mild increased risk of statin muscle side effects. Mention to prescriber before starting statins.",
        "category": "pgx",
        "condition": "SLCO1B1"
      },
      {
        "priority": "P2",
        "title": "CYP2C9 Intermediate Metabolizer",
        "description": "Reduced warfarin and NSAID clearance. Inform prescribers — dose adjustment may be needed.",
        "category": "pgx",
        "condition": "CYP2C9"
      }
    ],
    "variant_table": [
      {
        "rsid": "rs429358",
        "gene": "APOE",
        "condition": "APOE ε4 allele — significantly increases lifetime risk of la",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs7412",
        "gene": "APOE",
        "condition": "APOE ε2 allele — protective against Alzheimer's",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs6025",
        "gene": "F5",
        "condition": "Factor V Leiden — 5-7x increased risk of blood clots (DVT/PE",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1799963",
        "gene": "F2",
        "condition": "Prothrombin G20210A mutation — 3x increased risk of blood cl",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1800562",
        "gene": "HFE",
        "condition": "HFE C282Y — primary mutation for hereditary hemochromatosis ",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1799945",
        "gene": "HFE",
        "condition": "HFE H63D — modifier mutation; compound heterozygotes (C282Y ",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs34637584",
        "gene": "LRRK2",
        "condition": "LRRK2 G2019S — most common known genetic cause of Parkinson'",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs76763715",
        "gene": "GBA",
        "condition": "GBA N370S — 5x increased risk of Parkinson's; also associate",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs2187668",
        "gene": "HLA-DQA1",
        "condition": "HLA-DQ2.5 proxy — present in ~90% of celiac patients; necess",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs7454108",
        "gene": "HLA-DQB1",
        "condition": "HLA-DQ8 proxy — second major celiac risk HLA haplotype",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4244285",
        "gene": "CYP2C19",
        "condition": "Antiplatelet (clopidogrel), SSRIs, Proton pump inhibitors",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs12248560",
        "gene": "CYP2C19",
        "condition": "SSRIs, Proton pump inhibitors, Clopidogrel",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs3892097",
        "gene": "CYP2D6",
        "condition": "Tricyclic antidepressants, Codeine/tramadol, Tamoxifen, Beta-blockers",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4149056",
        "gene": "SLCO1B1",
        "condition": "Statins (simvastatin, atorvastatin)",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs9923231",
        "gene": "VKORC1",
        "condition": "Warfarin (anticoagulant)",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1799853",
        "gene": "CYP2C9",
        "condition": "Warfarin, NSAIDs (celecoxib, ibuprofen), Sulfonylureas",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1057910",
        "gene": "CYP2C9",
        "condition": "Warfarin, NSAIDs, Phenytoin, Sulfonylureas",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4986893",
        "gene": "CYP2C19",
        "condition": "SSRIs, Clopidogrel, Proton pump inhibitors",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs7903146",
        "gene": "TCF7L2",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs5219",
        "gene": "KCNJ11",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1801282",
        "gene": "PPARG",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs13266634",
        "gene": "SLC30A8",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1333049",
        "gene": "9p21.3",
        "condition": "Coronary Artery Disease",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4977574",
        "gene": "CDKN2B-AS1",
        "condition": "Coronary Artery Disease",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs2200733",
        "gene": "PITX2",
        "condition": "Atrial Fibrillation",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1061170",
        "gene": "CFH",
        "condition": "Age-Related Macular Degeneration",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs10490924",
        "gene": "ARMS2",
        "condition": "Age-Related Macular Degeneration",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs3736228",
        "gene": "LRP5",
        "condition": "Osteoporosis / Low Bone Density",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      }
    ],
    "doctor_notes": [
      {
        "drug": "Antiplatelet (clopidogrel)",
        "gene": "CYP2C19",
        "star_allele": "*2",
        "zygosity": "homozygous",
        "what_to_say": "I am a CYP2C19 Poor Metabolizer. Clopidogrel (Plavix) is ineffective for me — I need an alternative such as ticagrelor or prasugrel."
      },
      {
        "drug": "SSRIs",
        "gene": "CYP2C19",
        "star_allele": "*2",
        "zygosity": "homozygous",
        "what_to_say": "I am a CYP2C19 Poor Metabolizer. Many SSRIs accumulate in my system. Please start at a lower dose."
      },
      {
        "drug": "Proton pump inhibitors",
        "gene": "CYP2C19",
        "star_allele": "*2",
        "zygosity": "homozygous",
        "what_to_say": "I am a CYP2C19 Poor Metabolizer. PPIs like omeprazole build up — use lowest effective dose or switch to pantoprazole."
      },
      {
        "drug": "Statins (simvastatin, atorvastatin)",
        "gene": "SLCO1B1",
        "star_allele": "*5",
        "zygosity": "heterozygous",
        "what_to_say": "I have SLCO1B1*5 — statins accumulate in my muscles, raising myopathy risk. Please prescribe rosuvastatin at low dose or a non-statin alternative."
      },
      {
        "drug": "Warfarin",
        "gene": "CYP2C9",
        "star_allele": "*2",
        "zygosity": "heterozygous",
        "what_to_say": "I am a CYP2C9 Poor Metabolizer. Warfarin clears very slowly in me — I need significantly lower doses to avoid bleeding."
      },
      {
        "drug": "NSAIDs (celecoxib, ibuprofen)",
        "gene": "CYP2C9",
        "star_allele": "*2",
        "zygosity": "heterozygous",
        "what_to_say": "I am a CYP2C9 Poor Metabolizer. NSAIDs accumulate — use the lowest dose for the shortest time."
      },
      {
        "drug": "Sulfonylureas",
        "gene": "CYP2C9",
        "star_allele": "*2",
        "zygosity": "heterozygous",
        "what_to_say": "I have reduced CYP2C9 activity — sulfonylureas may accumulate, increasing hypoglycemia risk."
      }
    ],
    "enrichment_stats": {
      "enriched": 0,
      "clinvar_hits": 0,
      "gwas_traits_total": 0,
      "pathogenic_count": 0
    },
    "disclaimer": "This report is for educational and informational purposes only. It does not constitute medical advice, diagnosis, or treatment. Consult a qualified healthcare provider before making any health decisions."
  },
  "athletic-longevity": {
    "disease_risks": [
      {
        "condition": "Alzheimer's Disease",
        "condition_key": "alzheimers",
        "method": "monogenic",
        "lifetime_risk_pct": 41.0,
        "population_avg_pct": 9.0,
        "risk_tier": "high",
        "evidence_grade": "Strong",
        "key_findings": [
          "APOE genotype: ε4/ε4"
        ],
        "snps_evaluated": 2,
        "snps_found": 2
      },
      {
        "condition": "Type 2 Diabetes",
        "condition_key": "type2_diabetes",
        "method": "prs",
        "lifetime_risk_pct": 9.4,
        "population_avg_pct": 11.0,
        "risk_tier": "average",
        "evidence_grade": "Moderate",
        "prs_percentile": 44,
        "snps_evaluated": 10,
        "snps_found": 4,
        "coverage_pct": 40,
        "key_findings": [
          "TCF7L2 (rs7903146) — 1 risk allele(s)",
          "KCNJ11 (rs5219) — 1 risk allele(s)",
          "PPARG (rs1801282) — 1 risk allele(s)",
          "SLC30A8 (rs13266634) — 2 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Atrial Fibrillation",
        "condition_key": "atrial_fibrillation",
        "method": "prs",
        "lifetime_risk_pct": 13.6,
        "population_avg_pct": 25.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 26,
        "snps_evaluated": 5,
        "snps_found": 1,
        "coverage_pct": 20,
        "key_findings": [
          "PITX2 (rs2200733) — 1 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Osteoporosis / Low Bone Density",
        "condition_key": "osteoporosis",
        "method": "prs",
        "lifetime_risk_pct": 6.8,
        "population_avg_pct": 15.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 18,
        "snps_evaluated": 6,
        "snps_found": 1,
        "coverage_pct": 17,
        "key_findings": [
          "LRP5 (rs3736228) — 1 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Prostate Cancer",
        "condition_key": "prostate_cancer",
        "method": "prs",
        "lifetime_risk_pct": 4.9,
        "population_avg_pct": 13.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 6,
        "snps_found": 0,
        "coverage_pct": 0,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Breast Cancer",
        "condition_key": "breast_cancer",
        "method": "prs",
        "lifetime_risk_pct": 4.7,
        "population_avg_pct": 12.5,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 7,
        "snps_found": 0,
        "coverage_pct": 0,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Coronary Artery Disease",
        "condition_key": "coronary_artery_disease",
        "method": "prs",
        "lifetime_risk_pct": 4.2,
        "population_avg_pct": 10.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 15,
        "snps_evaluated": 8,
        "snps_found": 2,
        "coverage_pct": 25,
        "key_findings": [
          "CDKN2B-AS1 (rs4977574) — 1 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Age-Related Macular Degeneration",
        "condition_key": "amd",
        "method": "prs",
        "lifetime_risk_pct": 0.9,
        "population_avg_pct": 1.5,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 32,
        "snps_evaluated": 5,
        "snps_found": 2,
        "coverage_pct": 40,
        "key_findings": [
          "ARMS2 (rs10490924) — 2 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Inflammatory Bowel Disease",
        "condition_key": "ibd",
        "method": "prs",
        "lifetime_risk_pct": 0.6,
        "population_avg_pct": 1.5,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 5,
        "snps_found": 0,
        "coverage_pct": 0,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      }
    ],
    "pharmacogenomics": [],
    "carrier_status": [
      {
        "condition": "Cystic Fibrosis",
        "condition_key": "cystic_fibrosis",
        "gene": "CFTR",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.032,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "Most common CF-causing variant (~70% of CF alleles). Carriers are healthy.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Sickle Cell Anemia",
        "condition_key": "sickle_cell",
        "gene": "HBB",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.08,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "Sickle hemoglobin allele. Carriers (HbAS) are generally healthy with slight malaria protection.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Hereditary Hearing Loss",
        "condition_key": "hearing_loss_gjb2",
        "gene": "GJB2",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.025,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "Most common hereditary hearing loss variant in Europeans. Carriers have normal hearing.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Tay-Sachs Disease",
        "condition_key": "tay_sachs",
        "gene": "HEXA",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.033,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "Common Tay-Sachs variant in Ashkenazi Jewish population. Carriers are healthy.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Gaucher Disease",
        "condition_key": "gaucher",
        "gene": "GBA",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.005,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "GBA L444P — causes severe (type 3) Gaucher disease when homozygous. Carriers are healthy.",
        "source": "ClinVar Pathogenic"
      }
    ],
    "nutrigenomics": [
      {
        "trait": "Lactose Tolerance",
        "trait_key": "lactose_tolerance",
        "gene": "LCT",
        "rsid": "rs4988235",
        "genotype": "AT",
        "category": "Digestive",
        "copies_of_risk_allele": 1,
        "result": "Partial lactase persistence — may have mild lactose sensitivity",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Caffeine Metabolism",
        "trait_key": "caffeine_metabolism",
        "gene": "CYP1A2",
        "rsid": "rs762551",
        "genotype": "AA",
        "category": "Metabolism",
        "copies_of_risk_allele": 0,
        "result": "Fast caffeine metabolizer — caffeine clears quickly; lower cardiovascular risk at moderate intake",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Vitamin D Levels",
        "trait_key": "vitamin_d",
        "gene": "GC",
        "rsid": "rs2282679",
        "genotype": "CC",
        "category": "Vitamins & Minerals",
        "copies_of_risk_allele": 0,
        "result": "Normal vitamin D-binding protein — typical transport capacity",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Folate Metabolism (C677T)",
        "trait_key": "mthfr_677",
        "gene": "MTHFR",
        "rsid": "rs1801133",
        "genotype": "CC",
        "category": "Vitamins & Minerals",
        "copies_of_risk_allele": 0,
        "result": "Normal MTHFR C677T status — standard folate metabolism",
        "source": "ClinVar / GWAS"
      },
      {
        "trait": "Folate Metabolism (A1298C)",
        "trait_key": "mthfr_1298",
        "gene": "MTHFR",
        "rsid": "rs1801131",
        "genotype": "CC",
        "category": "Vitamins & Minerals",
        "copies_of_risk_allele": 2,
        "result": "Reduced BH4 pathway — may affect dopamine/serotonin synthesis; consider methylfolate",
        "source": "ClinVar"
      },
      {
        "trait": "Alcohol Flush Reaction",
        "trait_key": "alcohol_flush",
        "gene": "ALDH2",
        "rsid": "rs671",
        "genotype": "GG",
        "category": "Alcohol Metabolism",
        "copies_of_risk_allele": 0,
        "result": "Normal aldehyde metabolism — no genetic alcohol flush",
        "source": "ClinVar / GWAS"
      },
      {
        "trait": "Omega-3 Fatty Acid Conversion",
        "trait_key": "omega3_conversion",
        "gene": "FADS1",
        "rsid": "rs174537",
        "genotype": "GG",
        "category": "Nutrition",
        "copies_of_risk_allele": 0,
        "result": "High FADS1 activity — efficient conversion of plant-based ALA to EPA/DHA",
        "source": "GWAS Catalog"
      },
      {
        "trait": "Bitter Taste Sensitivity",
        "trait_key": "bitter_taste",
        "gene": "TAS2R38",
        "rsid": "rs713598",
        "genotype": "GG",
        "category": "Taste & Food Preferences",
        "copies_of_risk_allele": 0,
        "result": "Non-taster — insensitive to PROP/PTC bitter compounds; may enjoy bitter foods more",
        "source": "Multiple GWAS"
      }
    ],
    "traits": [
      {
        "trait": "Eye Color",
        "trait_key": "eye_color",
        "gene": "HERC2",
        "rsid": "rs12913832",
        "genotype": "GG",
        "category": "Physical Traits",
        "result": "Likely blue or light-colored eyes",
        "note": "Primary genetic determinant; other genes (OCA2, SLC45A2) also contribute.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Red Hair Risk",
        "trait_key": "red_hair",
        "gene": "MC1R",
        "rsid": "rs1805008",
        "genotype": "CC",
        "category": "Physical Traits",
        "result": "No MC1R R151C — low genetic red hair signal",
        "note": "MC1R variants also increase sensitivity to UV radiation and anesthetic requirements.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Earwax Type",
        "trait_key": "earwax_type",
        "gene": "ABCC11",
        "rsid": "rs17822931",
        "genotype": "TT",
        "category": "Physical Traits",
        "result": "Wet/sticky earwax — common in European and African populations",
        "note": "",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Sleep Chronotype",
        "trait_key": "sleep_chronotype",
        "gene": "CLOCK",
        "rsid": "rs1801260",
        "genotype": "AA",
        "category": "Behavioral Traits",
        "result": "Morning preference (early bird) genetic tendency",
        "note": "",
        "source": "GWAS Catalog"
      },
      {
        "trait": "Muscle Fiber Composition",
        "trait_key": "muscle_composition",
        "gene": "ACTN3",
        "rsid": "rs1815739",
        "genotype": "CC",
        "category": "Athletic Traits",
        "result": "R577R — power/sprint athlete profile; alpha-actinin-3 present in fast-twitch fibers",
        "note": "Olympic sprinters rarely carry TT; endurance athletes have elevated TT frequency.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Androgenic Hair Loss Risk (Males)",
        "trait_key": "hair_loss",
        "gene": "AR",
        "rsid": "rs6152",
        "genotype": "GG",
        "category": "Physical Traits",
        "result": "Lower androgen receptor activity — reduced genetic hair loss risk from X-linked locus",
        "note": "X-linked; males have one copy, so effect is direct. Multiple autosomal loci also contribute.",
        "source": "Multiple GWAS"
      }
    ],
    "mental_health": [
      {
        "trait": "Dopamine & Stress Response",
        "trait_key": "comt_dopamine",
        "gene": "COMT",
        "rsid": "rs4680",
        "genotype": "GG",
        "category": "Dopamine & Cognition",
        "copies_of_risk_allele": 0,
        "result": "Val/Val — higher COMT activity, faster dopamine clearance. Calmer under stress, lower anxiety baseline, but lower peak working memory.",
        "note": "The 'warrior vs worrier' polymorphism. Neither is better — Met shines in calm, Val shines under pressure.",
        "source": "Multiple GWAS / Meta-analyses"
      },
      {
        "trait": "Brain Plasticity & Memory",
        "trait_key": "bdnf_plasticity",
        "gene": "BDNF",
        "rsid": "rs6265",
        "genotype": "AA",
        "category": "Brain Plasticity",
        "copies_of_risk_allele": 2,
        "result": "Met/Met — significantly reduced BDNF secretion. Lower episodic memory, higher depression risk under stress. Exercise is especially beneficial.",
        "note": "Met carriers show greater antidepressant benefit from regular aerobic exercise than non-carriers.",
        "source": "Multiple GWAS / Nature Neuroscience"
      },
      {
        "trait": "Reward Sensitivity & Motivation",
        "trait_key": "drd2_reward",
        "gene": "DRD2",
        "rsid": "rs1800497",
        "genotype": "GG",
        "category": "Dopamine Receptor",
        "copies_of_risk_allele": 0,
        "result": "No Taq1A — normal D2 receptor density. Average reward sensitivity and motivation.",
        "note": "Associated with addiction vulnerability, ADHD traits, and compulsive behavior. Also linked to exercise motivation.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Serotonin Transport & Stress Sensitivity",
        "trait_key": "serotonin_transport",
        "gene": "SLC6A4",
        "rsid": "rs25531",
        "genotype": "GG",
        "category": "Serotonin System",
        "copies_of_risk_allele": 0,
        "result": "L/L — high serotonin transporter expression. Resilient to stress, lower anxiety, reduced depression risk.",
        "note": "Environment strongly moderates this variant. Adverse childhood experiences amplify the S/S risk significantly.",
        "source": "Multiple GWAS / Science"
      },
      {
        "trait": "Monoamine Oxidase Activity",
        "trait_key": "maoa_activity",
        "gene": "MAOA",
        "rsid": "rs6323",
        "genotype": "GG",
        "category": "Neurotransmitter Clearance",
        "copies_of_risk_allele": 2,
        "result": "Low activity — slower neurotransmitter breakdown. More emotionally reactive and empathetic; elevated aggression risk in adverse environments.",
        "note": "X-linked gene. Males have one copy; the effect is direct and stronger. MAOA-L in adversity context is the most studied gene-environment interaction.",
        "source": "Multiple GWAS / Science"
      }
    ],
    "longevity": [
      {
        "trait": "Longevity Pathway",
        "trait_key": "foxo3_longevity",
        "gene": "FOXO3",
        "rsid": "rs2802292",
        "genotype": "TT",
        "category": "Longevity",
        "copies_of_risk_allele": 0,
        "result": "GG — non-longevity genotype. Average lifespan genetics at this locus.",
        "note": "One of the most replicated longevity variants in human genetics. FOXO3 is a master regulator of cellular stress response.",
        "source": "PNAS 2008 / Multiple replication studies",
        "protective": true
      },
      {
        "trait": "Telomere Maintenance",
        "trait_key": "tert_telomere",
        "gene": "TERT",
        "rsid": "rs10069690",
        "genotype": "CC",
        "category": "Cellular Aging",
        "copies_of_risk_allele": 0,
        "result": "CC — lower risk variant. Associated with normal telomere dynamics.",
        "note": "Telomere length reflects cumulative oxidative stress and inflammation exposure.",
        "source": "Nature Genetics / GWAS Catalog",
        "protective": false
      },
      {
        "trait": "Metabolic Efficiency & Weight Regulation",
        "trait_key": "fto_metabolism",
        "gene": "FTO",
        "rsid": "rs9939609",
        "genotype": "TT",
        "category": "Metabolic Health",
        "copies_of_risk_allele": 0,
        "result": "TT — lowest obesity genetic risk. Normal energy regulation and satiety signaling.",
        "note": "Most common obesity-associated variant worldwide. Physical activity almost fully abolishes the FTO effect.",
        "source": "Science 2007 / Multiple GWAS",
        "protective": false
      },
      {
        "trait": "Baseline Inflammation (IL-6)",
        "trait_key": "il6_inflammation",
        "gene": "IL6",
        "rsid": "rs1800795",
        "genotype": "GG",
        "category": "Inflammation",
        "copies_of_risk_allele": 0,
        "result": "GG — lower baseline IL-6 production. Anti-inflammatory tendency. Better cardiovascular aging profile.",
        "note": "IL-6 is a master pro-inflammatory cytokine. Chronic elevation accelerates biological aging.",
        "source": "Multiple GWAS / Lancet",
        "protective": false
      },
      {
        "trait": "TNF-α Inflammatory Response",
        "trait_key": "tnf_inflammation",
        "gene": "TNF",
        "rsid": "rs1800629",
        "genotype": "GG",
        "category": "Inflammation",
        "copies_of_risk_allele": 0,
        "result": "GG — normal TNF-alpha production. No elevated inflammatory cytokine risk.",
        "note": "TNF-alpha is a master inflammatory cytokine. Anti-TNF biologics (etanercept, adalimumab) specifically target this pathway.",
        "source": "Multiple GWAS",
        "protective": false
      }
    ],
    "summary": {
      "conditions_evaluated": 9,
      "high_risk_count": 1,
      "elevated_risk_count": 0,
      "pgx_findings_count": 0,
      "carrier_detected": 0,
      "nutrition_traits": 8,
      "genetic_traits": 6,
      "mental_health_variants": 5,
      "longevity_variants": 5
    },
    "overall_risk_score": 8,
    "summary_sentence": "Your results show high risk for Alzheimer's Disease.",
    "priority_actions": [
      {
        "priority": "P1",
        "title": "Neurological baseline assessment",
        "description": "APOE ε4/ε4 detected — lifetime Alzheimer's risk ~41%. Request baseline cognitive MRI and neuropsychological assessment. MIND/Mediterranean diet and aerobic exercise are evidence-backed risk reducers.",
        "category": "disease",
        "condition": "Alzheimer's Disease"
      },
      {
        "priority": "P3",
        "title": "Routine glucose check",
        "description": "Annual HbA1c from age 45 — standard care.",
        "category": "disease",
        "condition": "Type 2 Diabetes"
      }
    ],
    "variant_table": [
      {
        "rsid": "rs429358",
        "gene": "APOE",
        "condition": "APOE ε4 allele — significantly increases lifetime risk of la",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs7412",
        "gene": "APOE",
        "condition": "APOE ε2 allele — protective against Alzheimer's",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs6025",
        "gene": "F5",
        "condition": "Factor V Leiden — 5-7x increased risk of blood clots (DVT/PE",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1799963",
        "gene": "F2",
        "condition": "Prothrombin G20210A mutation — 3x increased risk of blood cl",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1800562",
        "gene": "HFE",
        "condition": "HFE C282Y — primary mutation for hereditary hemochromatosis ",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1799945",
        "gene": "HFE",
        "condition": "HFE H63D — modifier mutation; compound heterozygotes (C282Y ",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs34637584",
        "gene": "LRRK2",
        "condition": "LRRK2 G2019S — most common known genetic cause of Parkinson'",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs76763715",
        "gene": "GBA",
        "condition": "GBA N370S — 5x increased risk of Parkinson's; also associate",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs2187668",
        "gene": "HLA-DQA1",
        "condition": "HLA-DQ2.5 proxy — present in ~90% of celiac patients; necess",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs7454108",
        "gene": "HLA-DQB1",
        "condition": "HLA-DQ8 proxy — second major celiac risk HLA haplotype",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4244285",
        "gene": "CYP2C19",
        "condition": "Antiplatelet (clopidogrel), SSRIs, Proton pump inhibitors",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs12248560",
        "gene": "CYP2C19",
        "condition": "SSRIs, Proton pump inhibitors, Clopidogrel",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs3892097",
        "gene": "CYP2D6",
        "condition": "Tricyclic antidepressants, Codeine/tramadol, Tamoxifen, Beta-blockers",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4149056",
        "gene": "SLCO1B1",
        "condition": "Statins (simvastatin, atorvastatin)",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs9923231",
        "gene": "VKORC1",
        "condition": "Warfarin (anticoagulant)",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1799853",
        "gene": "CYP2C9",
        "condition": "Warfarin, NSAIDs (celecoxib, ibuprofen), Sulfonylureas",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1057910",
        "gene": "CYP2C9",
        "condition": "Warfarin, NSAIDs, Phenytoin, Sulfonylureas",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4986893",
        "gene": "CYP2C19",
        "condition": "SSRIs, Clopidogrel, Proton pump inhibitors",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs7903146",
        "gene": "TCF7L2",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs5219",
        "gene": "KCNJ11",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1801282",
        "gene": "PPARG",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs13266634",
        "gene": "SLC30A8",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1333049",
        "gene": "9p21.3",
        "condition": "Coronary Artery Disease",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4977574",
        "gene": "CDKN2B-AS1",
        "condition": "Coronary Artery Disease",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs2200733",
        "gene": "PITX2",
        "condition": "Atrial Fibrillation",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1061170",
        "gene": "CFH",
        "condition": "Age-Related Macular Degeneration",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs10490924",
        "gene": "ARMS2",
        "condition": "Age-Related Macular Degeneration",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs3736228",
        "gene": "LRP5",
        "condition": "Osteoporosis / Low Bone Density",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      }
    ],
    "doctor_notes": [],
    "enrichment_stats": {
      "enriched": 0,
      "clinvar_hits": 0,
      "gwas_traits_total": 0,
      "pathogenic_count": 0
    },
    "disclaimer": "This report is for educational and informational purposes only. It does not constitute medical advice, diagnosis, or treatment. Consult a qualified healthcare provider before making any health decisions."
  },
  "nutrition-mthfr": {
    "disease_risks": [
      {
        "condition": "Alzheimer's Disease",
        "condition_key": "alzheimers",
        "method": "monogenic",
        "lifetime_risk_pct": 41.0,
        "population_avg_pct": 9.0,
        "risk_tier": "high",
        "evidence_grade": "Strong",
        "key_findings": [
          "APOE genotype: ε4/ε4"
        ],
        "snps_evaluated": 2,
        "snps_found": 2
      },
      {
        "condition": "Type 2 Diabetes",
        "condition_key": "type2_diabetes",
        "method": "prs",
        "lifetime_risk_pct": 9.4,
        "population_avg_pct": 11.0,
        "risk_tier": "average",
        "evidence_grade": "Moderate",
        "prs_percentile": 44,
        "snps_evaluated": 10,
        "snps_found": 4,
        "coverage_pct": 40,
        "key_findings": [
          "TCF7L2 (rs7903146) — 1 risk allele(s)",
          "KCNJ11 (rs5219) — 1 risk allele(s)",
          "PPARG (rs1801282) — 1 risk allele(s)",
          "SLC30A8 (rs13266634) — 2 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Atrial Fibrillation",
        "condition_key": "atrial_fibrillation",
        "method": "prs",
        "lifetime_risk_pct": 13.6,
        "population_avg_pct": 25.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 26,
        "snps_evaluated": 5,
        "snps_found": 1,
        "coverage_pct": 20,
        "key_findings": [
          "PITX2 (rs2200733) — 1 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Osteoporosis / Low Bone Density",
        "condition_key": "osteoporosis",
        "method": "prs",
        "lifetime_risk_pct": 5.6,
        "population_avg_pct": 15.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 6,
        "snps_found": 1,
        "coverage_pct": 17,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Coronary Artery Disease",
        "condition_key": "coronary_artery_disease",
        "method": "prs",
        "lifetime_risk_pct": 4.9,
        "population_avg_pct": 10.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 22,
        "snps_evaluated": 8,
        "snps_found": 2,
        "coverage_pct": 25,
        "key_findings": [
          "9p21.3 (rs1333049) — 1 risk allele(s)",
          "CDKN2B-AS1 (rs4977574) — 1 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Prostate Cancer",
        "condition_key": "prostate_cancer",
        "method": "prs",
        "lifetime_risk_pct": 4.9,
        "population_avg_pct": 13.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 6,
        "snps_found": 0,
        "coverage_pct": 0,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Breast Cancer",
        "condition_key": "breast_cancer",
        "method": "prs",
        "lifetime_risk_pct": 4.7,
        "population_avg_pct": 12.5,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 7,
        "snps_found": 0,
        "coverage_pct": 0,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Age-Related Macular Degeneration",
        "condition_key": "amd",
        "method": "prs",
        "lifetime_risk_pct": 0.9,
        "population_avg_pct": 1.5,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 32,
        "snps_evaluated": 5,
        "snps_found": 2,
        "coverage_pct": 40,
        "key_findings": [
          "ARMS2 (rs10490924) — 2 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Celiac Disease",
        "condition_key": "celiac",
        "method": "monogenic",
        "lifetime_risk_pct": 0.7,
        "population_avg_pct": 1.0,
        "risk_tier": "below_average",
        "evidence_grade": "Strong",
        "key_findings": [
          "HLA-DQA1 rs2187668 — HLA-DQ2.5 proxy — present in ~90% of celiac patients; necessary but not sufficie"
        ],
        "snps_evaluated": 1,
        "snps_found": 1
      },
      {
        "condition": "Inflammatory Bowel Disease",
        "condition_key": "ibd",
        "method": "prs",
        "lifetime_risk_pct": 0.6,
        "population_avg_pct": 1.5,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 5,
        "snps_found": 0,
        "coverage_pct": 0,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      }
    ],
    "pharmacogenomics": [
      {
        "gene": "CYP2C19",
        "rsid": "rs12248560",
        "star_allele": "*17",
        "copies": 1,
        "zygosity": "heterozygous",
        "effect": "Ultra-rapid metabolizer allele — faster metabolism of CYP2C19 substrates",
        "drug_classes": [
          "SSRIs",
          "Proton pump inhibitors",
          "Clopidogrel"
        ],
        "clinical_guidance": "Standard SSRI doses may have reduced effect; PPIs may be less effective at standard doses.",
        "source": "CPIC"
      }
    ],
    "carrier_status": [
      {
        "condition": "Cystic Fibrosis",
        "condition_key": "cystic_fibrosis",
        "gene": "CFTR",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.032,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "Most common CF-causing variant (~70% of CF alleles). Carriers are healthy.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Sickle Cell Anemia",
        "condition_key": "sickle_cell",
        "gene": "HBB",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.08,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "Sickle hemoglobin allele. Carriers (HbAS) are generally healthy with slight malaria protection.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Hereditary Hearing Loss",
        "condition_key": "hearing_loss_gjb2",
        "gene": "GJB2",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.025,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "Most common hereditary hearing loss variant in Europeans. Carriers have normal hearing.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Tay-Sachs Disease",
        "condition_key": "tay_sachs",
        "gene": "HEXA",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.033,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "Common Tay-Sachs variant in Ashkenazi Jewish population. Carriers are healthy.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Gaucher Disease",
        "condition_key": "gaucher",
        "gene": "GBA",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.005,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "GBA L444P — causes severe (type 3) Gaucher disease when homozygous. Carriers are healthy.",
        "source": "ClinVar Pathogenic"
      }
    ],
    "nutrigenomics": [
      {
        "trait": "Lactose Tolerance",
        "trait_key": "lactose_tolerance",
        "gene": "LCT",
        "rsid": "rs4988235",
        "genotype": "GG",
        "category": "Digestive",
        "copies_of_risk_allele": 0,
        "result": "Lactase persistence — tolerates dairy well into adulthood",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Caffeine Metabolism",
        "trait_key": "caffeine_metabolism",
        "gene": "CYP1A2",
        "rsid": "rs762551",
        "genotype": "CA",
        "category": "Metabolism",
        "copies_of_risk_allele": 1,
        "result": "Intermediate caffeine metabolizer — moderate clearance rate",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Vitamin D Levels",
        "trait_key": "vitamin_d",
        "gene": "GC",
        "rsid": "rs2282679",
        "genotype": "AC",
        "category": "Vitamins & Minerals",
        "copies_of_risk_allele": 0,
        "result": "Normal vitamin D-binding protein — typical transport capacity",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Folate Metabolism (C677T)",
        "trait_key": "mthfr_677",
        "gene": "MTHFR",
        "rsid": "rs1801133",
        "genotype": "CT",
        "category": "Vitamins & Minerals",
        "copies_of_risk_allele": 1,
        "result": "~35% reduced MTHFR activity — increased methylfolate and B12 needs",
        "source": "ClinVar / GWAS"
      },
      {
        "trait": "Folate Metabolism (A1298C)",
        "trait_key": "mthfr_1298",
        "gene": "MTHFR",
        "rsid": "rs1801131",
        "genotype": "AC",
        "category": "Vitamins & Minerals",
        "copies_of_risk_allele": 1,
        "result": "Mildly reduced BH4 synthesis — may affect neurotransmitter production",
        "source": "ClinVar"
      },
      {
        "trait": "Alcohol Flush Reaction",
        "trait_key": "alcohol_flush",
        "gene": "ALDH2",
        "rsid": "rs671",
        "genotype": "AG",
        "category": "Alcohol Metabolism",
        "copies_of_risk_allele": 1,
        "result": "Reduced ALDH2 activity — alcohol flush reaction likely; elevated acetaldehyde exposure",
        "source": "ClinVar / GWAS"
      },
      {
        "trait": "Omega-3 Fatty Acid Conversion",
        "trait_key": "omega3_conversion",
        "gene": "FADS1",
        "rsid": "rs174537",
        "genotype": "TT",
        "category": "Nutrition",
        "copies_of_risk_allele": 2,
        "result": "Lower ALA-to-EPA/DHA conversion — direct EPA/DHA from fish or algae oil recommended",
        "source": "GWAS Catalog"
      },
      {
        "trait": "Bitter Taste Sensitivity",
        "trait_key": "bitter_taste",
        "gene": "TAS2R38",
        "rsid": "rs713598",
        "genotype": "CC",
        "category": "Taste & Food Preferences",
        "copies_of_risk_allele": 2,
        "result": "Super-taster — very sensitive to bitter flavors; may dislike cruciferous vegetables and dark coffee",
        "source": "Multiple GWAS"
      }
    ],
    "traits": [
      {
        "trait": "Eye Color",
        "trait_key": "eye_color",
        "gene": "HERC2",
        "rsid": "rs12913832",
        "genotype": "AA",
        "category": "Physical Traits",
        "result": "Likely brown eyes",
        "note": "Primary genetic determinant; other genes (OCA2, SLC45A2) also contribute.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Red Hair Risk",
        "trait_key": "red_hair",
        "gene": "MC1R",
        "rsid": "rs1805008",
        "genotype": "CC",
        "category": "Physical Traits",
        "result": "No MC1R R151C — low genetic red hair signal",
        "note": "MC1R variants also increase sensitivity to UV radiation and anesthetic requirements.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Earwax Type",
        "trait_key": "earwax_type",
        "gene": "ABCC11",
        "rsid": "rs17822931",
        "genotype": "CT",
        "category": "Physical Traits",
        "result": "Wet/sticky earwax (heterozygous)",
        "note": "",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Sleep Chronotype",
        "trait_key": "sleep_chronotype",
        "gene": "CLOCK",
        "rsid": "rs1801260",
        "genotype": "AG",
        "category": "Behavioral Traits",
        "result": "Intermediate chronotype",
        "note": "",
        "source": "GWAS Catalog"
      },
      {
        "trait": "Muscle Fiber Composition",
        "trait_key": "muscle_composition",
        "gene": "ACTN3",
        "rsid": "rs1815739",
        "genotype": "TT",
        "category": "Athletic Traits",
        "result": "R577X — no alpha-actinin-3; endurance athlete profile; better aerobic training adaptation",
        "note": "Olympic sprinters rarely carry TT; endurance athletes have elevated TT frequency.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Androgenic Hair Loss Risk (Males)",
        "trait_key": "hair_loss",
        "gene": "AR",
        "rsid": "rs6152",
        "genotype": "AA",
        "category": "Physical Traits",
        "result": "Higher androgen receptor activity — elevated androgenic alopecia risk",
        "note": "X-linked; males have one copy, so effect is direct. Multiple autosomal loci also contribute.",
        "source": "Multiple GWAS"
      }
    ],
    "mental_health": [
      {
        "trait": "Dopamine & Stress Response",
        "trait_key": "comt_dopamine",
        "gene": "COMT",
        "rsid": "rs4680",
        "genotype": "AG",
        "category": "Dopamine & Cognition",
        "copies_of_risk_allele": 1,
        "result": "Val/Met — balanced dopamine metabolism. Moderate stress resilience and cognitive performance.",
        "note": "The 'warrior vs worrier' polymorphism. Neither is better — Met shines in calm, Val shines under pressure.",
        "source": "Multiple GWAS / Meta-analyses"
      },
      {
        "trait": "Brain Plasticity & Memory",
        "trait_key": "bdnf_plasticity",
        "gene": "BDNF",
        "rsid": "rs6265",
        "genotype": "AG",
        "category": "Brain Plasticity",
        "copies_of_risk_allele": 1,
        "result": "Val/Met — reduced activity-dependent BDNF release. Slightly lower episodic memory. Responds well to aerobic exercise for mood.",
        "note": "Met carriers show greater antidepressant benefit from regular aerobic exercise than non-carriers.",
        "source": "Multiple GWAS / Nature Neuroscience"
      },
      {
        "trait": "Reward Sensitivity & Motivation",
        "trait_key": "drd2_reward",
        "gene": "DRD2",
        "rsid": "rs1800497",
        "genotype": "GG",
        "category": "Dopamine Receptor",
        "copies_of_risk_allele": 0,
        "result": "No Taq1A — normal D2 receptor density. Average reward sensitivity and motivation.",
        "note": "Associated with addiction vulnerability, ADHD traits, and compulsive behavior. Also linked to exercise motivation.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Serotonin Transport & Stress Sensitivity",
        "trait_key": "serotonin_transport",
        "gene": "SLC6A4",
        "rsid": "rs25531",
        "genotype": "AA",
        "category": "Serotonin System",
        "copies_of_risk_allele": 2,
        "result": "S/S — lower serotonin transporter expression. Elevated anxiety and depression risk under chronic stress. Short allele carriers are generally more responsive to SSRIs.",
        "note": "Environment strongly moderates this variant. Adverse childhood experiences amplify the S/S risk significantly.",
        "source": "Multiple GWAS / Science"
      },
      {
        "trait": "Monoamine Oxidase Activity",
        "trait_key": "maoa_activity",
        "gene": "MAOA",
        "rsid": "rs6323",
        "genotype": "GG",
        "category": "Neurotransmitter Clearance",
        "copies_of_risk_allele": 2,
        "result": "Low activity — slower neurotransmitter breakdown. More emotionally reactive and empathetic; elevated aggression risk in adverse environments.",
        "note": "X-linked gene. Males have one copy; the effect is direct and stronger. MAOA-L in adversity context is the most studied gene-environment interaction.",
        "source": "Multiple GWAS / Science"
      }
    ],
    "longevity": [
      {
        "trait": "Longevity Pathway",
        "trait_key": "foxo3_longevity",
        "gene": "FOXO3",
        "rsid": "rs2802292",
        "genotype": "GT",
        "category": "Longevity",
        "copies_of_risk_allele": 1,
        "result": "GT — one protective allele. Moderately associated with longer healthy lifespan.",
        "note": "One of the most replicated longevity variants in human genetics. FOXO3 is a master regulator of cellular stress response.",
        "source": "PNAS 2008 / Multiple replication studies",
        "protective": false
      },
      {
        "trait": "Telomere Maintenance",
        "trait_key": "tert_telomere",
        "gene": "TERT",
        "rsid": "rs10069690",
        "genotype": "CC",
        "category": "Cellular Aging",
        "copies_of_risk_allele": 0,
        "result": "CC — lower risk variant. Associated with normal telomere dynamics.",
        "note": "Telomere length reflects cumulative oxidative stress and inflammation exposure.",
        "source": "Nature Genetics / GWAS Catalog",
        "protective": false
      },
      {
        "trait": "Metabolic Efficiency & Weight Regulation",
        "trait_key": "fto_metabolism",
        "gene": "FTO",
        "rsid": "rs9939609",
        "genotype": "AT",
        "category": "Metabolic Health",
        "copies_of_risk_allele": 1,
        "result": "AT — ~1.3× increased obesity risk vs TT. Moderate carbohydrate sensitivity. Benefit from portion awareness.",
        "note": "Most common obesity-associated variant worldwide. Physical activity almost fully abolishes the FTO effect.",
        "source": "Science 2007 / Multiple GWAS",
        "protective": false
      },
      {
        "trait": "Baseline Inflammation (IL-6)",
        "trait_key": "il6_inflammation",
        "gene": "IL6",
        "rsid": "rs1800795",
        "genotype": "GC",
        "category": "Inflammation",
        "copies_of_risk_allele": 1,
        "result": "GC — intermediate IL-6 levels.",
        "note": "IL-6 is a master pro-inflammatory cytokine. Chronic elevation accelerates biological aging.",
        "source": "Multiple GWAS / Lancet",
        "protective": false
      },
      {
        "trait": "TNF-α Inflammatory Response",
        "trait_key": "tnf_inflammation",
        "gene": "TNF",
        "rsid": "rs1800629",
        "genotype": "GG",
        "category": "Inflammation",
        "copies_of_risk_allele": 0,
        "result": "GG — normal TNF-alpha production. No elevated inflammatory cytokine risk.",
        "note": "TNF-alpha is a master inflammatory cytokine. Anti-TNF biologics (etanercept, adalimumab) specifically target this pathway.",
        "source": "Multiple GWAS",
        "protective": false
      }
    ],
    "summary": {
      "conditions_evaluated": 10,
      "high_risk_count": 1,
      "elevated_risk_count": 0,
      "pgx_findings_count": 1,
      "carrier_detected": 0,
      "nutrition_traits": 8,
      "genetic_traits": 6,
      "mental_health_variants": 5,
      "longevity_variants": 5
    },
    "overall_risk_score": 11,
    "summary_sentence": "Your results show high risk for Alzheimer's Disease; 1 drug-metabolism alert(s) (CYP2C19).",
    "priority_actions": [
      {
        "priority": "P1",
        "title": "Neurological baseline assessment",
        "description": "APOE ε4/ε4 detected — lifetime Alzheimer's risk ~41%. Request baseline cognitive MRI and neuropsychological assessment. MIND/Mediterranean diet and aerobic exercise are evidence-backed risk reducers.",
        "category": "disease",
        "condition": "Alzheimer's Disease"
      },
      {
        "priority": "P2",
        "title": "CYP2C19 Intermediate Metabolizer",
        "description": "Reduced clopidogrel effectiveness. Inform doctors before cardiac procedures. Monitor PPI dosing.",
        "category": "pgx",
        "condition": "CYP2C19"
      },
      {
        "priority": "P3",
        "title": "Routine glucose check",
        "description": "Annual HbA1c from age 45 — standard care.",
        "category": "disease",
        "condition": "Type 2 Diabetes"
      }
    ],
    "variant_table": [
      {
        "rsid": "rs429358",
        "gene": "APOE",
        "condition": "APOE ε4 allele — significantly increases lifetime risk of la",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs7412",
        "gene": "APOE",
        "condition": "APOE ε2 allele — protective against Alzheimer's",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs6025",
        "gene": "F5",
        "condition": "Factor V Leiden — 5-7x increased risk of blood clots (DVT/PE",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1799963",
        "gene": "F2",
        "condition": "Prothrombin G20210A mutation — 3x increased risk of blood cl",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1800562",
        "gene": "HFE",
        "condition": "HFE C282Y — primary mutation for hereditary hemochromatosis ",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1799945",
        "gene": "HFE",
        "condition": "HFE H63D — modifier mutation; compound heterozygotes (C282Y ",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs34637584",
        "gene": "LRRK2",
        "condition": "LRRK2 G2019S — most common known genetic cause of Parkinson'",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs76763715",
        "gene": "GBA",
        "condition": "GBA N370S — 5x increased risk of Parkinson's; also associate",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs2187668",
        "gene": "HLA-DQA1",
        "condition": "HLA-DQ2.5 proxy — present in ~90% of celiac patients; necess",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs7454108",
        "gene": "HLA-DQB1",
        "condition": "HLA-DQ8 proxy — second major celiac risk HLA haplotype",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4244285",
        "gene": "CYP2C19",
        "condition": "Antiplatelet (clopidogrel), SSRIs, Proton pump inhibitors",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs12248560",
        "gene": "CYP2C19",
        "condition": "SSRIs, Proton pump inhibitors, Clopidogrel",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs3892097",
        "gene": "CYP2D6",
        "condition": "Tricyclic antidepressants, Codeine/tramadol, Tamoxifen, Beta-blockers",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4149056",
        "gene": "SLCO1B1",
        "condition": "Statins (simvastatin, atorvastatin)",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs9923231",
        "gene": "VKORC1",
        "condition": "Warfarin (anticoagulant)",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1799853",
        "gene": "CYP2C9",
        "condition": "Warfarin, NSAIDs (celecoxib, ibuprofen), Sulfonylureas",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1057910",
        "gene": "CYP2C9",
        "condition": "Warfarin, NSAIDs, Phenytoin, Sulfonylureas",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4986893",
        "gene": "CYP2C19",
        "condition": "SSRIs, Clopidogrel, Proton pump inhibitors",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs7903146",
        "gene": "TCF7L2",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs5219",
        "gene": "KCNJ11",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1801282",
        "gene": "PPARG",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs13266634",
        "gene": "SLC30A8",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1333049",
        "gene": "9p21.3",
        "condition": "Coronary Artery Disease",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4977574",
        "gene": "CDKN2B-AS1",
        "condition": "Coronary Artery Disease",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs2200733",
        "gene": "PITX2",
        "condition": "Atrial Fibrillation",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1061170",
        "gene": "CFH",
        "condition": "Age-Related Macular Degeneration",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs10490924",
        "gene": "ARMS2",
        "condition": "Age-Related Macular Degeneration",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs3736228",
        "gene": "LRP5",
        "condition": "Osteoporosis / Low Bone Density",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      }
    ],
    "doctor_notes": [
      {
        "drug": "SSRIs",
        "gene": "CYP2C19",
        "star_allele": "*17",
        "zygosity": "heterozygous",
        "what_to_say": "I am a CYP2C19 Poor Metabolizer. Many SSRIs accumulate in my system. Please start at a lower dose."
      },
      {
        "drug": "Proton pump inhibitors",
        "gene": "CYP2C19",
        "star_allele": "*17",
        "zygosity": "heterozygous",
        "what_to_say": "I am a CYP2C19 Poor Metabolizer. PPIs like omeprazole build up — use lowest effective dose or switch to pantoprazole."
      },
      {
        "drug": "Clopidogrel",
        "gene": "CYP2C19",
        "star_allele": "*17",
        "zygosity": "heterozygous",
        "what_to_say": "I am a CYP2C19 Poor Metabolizer — clopidogrel is ineffective. I need an alternative antiplatelet agent."
      }
    ],
    "enrichment_stats": {
      "enriched": 0,
      "clinvar_hits": 0,
      "gwas_traits_total": 0,
      "pathogenic_count": 0
    },
    "disclaimer": "This report is for educational and informational purposes only. It does not constitute medical advice, diagnosis, or treatment. Consult a qualified healthcare provider before making any health decisions."
  },
  "carrier-screening": {
    "disease_risks": [
      {
        "condition": "Alzheimer's Disease",
        "condition_key": "alzheimers",
        "method": "monogenic",
        "lifetime_risk_pct": 20.0,
        "population_avg_pct": 9.0,
        "risk_tier": "elevated",
        "evidence_grade": "Strong",
        "key_findings": [
          "APOE genotype: ε4/ε3"
        ],
        "snps_evaluated": 2,
        "snps_found": 2
      },
      {
        "condition": "Type 2 Diabetes",
        "condition_key": "type2_diabetes",
        "method": "prs",
        "lifetime_risk_pct": 9.4,
        "population_avg_pct": 11.0,
        "risk_tier": "average",
        "evidence_grade": "Moderate",
        "prs_percentile": 44,
        "snps_evaluated": 10,
        "snps_found": 4,
        "coverage_pct": 40,
        "key_findings": [
          "TCF7L2 (rs7903146) — 1 risk allele(s)",
          "KCNJ11 (rs5219) — 1 risk allele(s)",
          "PPARG (rs1801282) — 1 risk allele(s)",
          "SLC30A8 (rs13266634) — 2 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Atrial Fibrillation",
        "condition_key": "atrial_fibrillation",
        "method": "prs",
        "lifetime_risk_pct": 13.6,
        "population_avg_pct": 25.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 26,
        "snps_evaluated": 5,
        "snps_found": 1,
        "coverage_pct": 20,
        "key_findings": [
          "PITX2 (rs2200733) — 1 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Osteoporosis / Low Bone Density",
        "condition_key": "osteoporosis",
        "method": "prs",
        "lifetime_risk_pct": 5.6,
        "population_avg_pct": 15.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 6,
        "snps_found": 1,
        "coverage_pct": 17,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Coronary Artery Disease",
        "condition_key": "coronary_artery_disease",
        "method": "prs",
        "lifetime_risk_pct": 4.9,
        "population_avg_pct": 10.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 21,
        "snps_evaluated": 8,
        "snps_found": 2,
        "coverage_pct": 25,
        "key_findings": [
          "CDKN2B-AS1 (rs4977574) — 2 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Prostate Cancer",
        "condition_key": "prostate_cancer",
        "method": "prs",
        "lifetime_risk_pct": 4.9,
        "population_avg_pct": 13.0,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 6,
        "snps_found": 0,
        "coverage_pct": 0,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Breast Cancer",
        "condition_key": "breast_cancer",
        "method": "prs",
        "lifetime_risk_pct": 4.7,
        "population_avg_pct": 12.5,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 7,
        "snps_found": 0,
        "coverage_pct": 0,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Age-Related Macular Degeneration",
        "condition_key": "amd",
        "method": "prs",
        "lifetime_risk_pct": 0.9,
        "population_avg_pct": 1.5,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 32,
        "snps_evaluated": 5,
        "snps_found": 2,
        "coverage_pct": 40,
        "key_findings": [
          "ARMS2 (rs10490924) — 2 risk allele(s)"
        ],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      },
      {
        "condition": "Inflammatory Bowel Disease",
        "condition_key": "ibd",
        "method": "prs",
        "lifetime_risk_pct": 0.6,
        "population_avg_pct": 1.5,
        "risk_tier": "below_average",
        "evidence_grade": "Moderate",
        "prs_percentile": 11,
        "snps_evaluated": 5,
        "snps_found": 0,
        "coverage_pct": 0,
        "key_findings": [],
        "note": "Based on published GWAS effect sizes. Accuracy varies by ancestry."
      }
    ],
    "pharmacogenomics": [
      {
        "gene": "CYP2C19",
        "rsid": "rs4244285",
        "star_allele": "*2",
        "copies": 2,
        "zygosity": "homozygous",
        "effect": "Poor metabolizer allele — reduced metabolism of clopidogrel, SSRIs (escitalopram, citalopram), PPIs",
        "drug_classes": [
          "Antiplatelet (clopidogrel)",
          "SSRIs",
          "Proton pump inhibitors"
        ],
        "clinical_guidance": "Clopidogrel may be less effective; consider alternative antiplatelet therapy. SSRI dosing may need adjustment.",
        "source": "CPIC"
      },
      {
        "gene": "VKORC1",
        "rsid": "rs9923231",
        "star_allele": null,
        "copies": 2,
        "zygosity": "homozygous",
        "effect": "Warfarin sensitivity — requires lower warfarin doses to achieve therapeutic INR",
        "drug_classes": [
          "Warfarin (anticoagulant)"
        ],
        "clinical_guidance": "Standard warfarin doses may cause over-anticoagulation and bleeding risk. Dose reduction typically required.",
        "source": "CPIC"
      },
      {
        "gene": "CYP2C19",
        "rsid": "rs4986893",
        "star_allele": "*3",
        "copies": 1,
        "zygosity": "heterozygous",
        "effect": "Loss-of-function allele — combined with *2 creates poor metabolizer phenotype",
        "drug_classes": [
          "SSRIs",
          "Clopidogrel",
          "Proton pump inhibitors"
        ],
        "clinical_guidance": "If combined with CYP2C19 *2, full poor metabolizer status — clopidogrel therapy likely ineffective.",
        "source": "CPIC"
      }
    ],
    "carrier_status": [
      {
        "condition": "Cystic Fibrosis",
        "condition_key": "cystic_fibrosis",
        "gene": "CFTR",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.032,
        "status": "carrier",
        "risk_copies": 1,
        "hits": [
          {
            "rsid": "rs113993960",
            "gene": "CFTR",
            "variant_name": "ΔF508 (c.1521_1523del)",
            "copies": 1,
            "effect": "Most common CF-causing variant (~70% of CF alleles). Carriers are healthy."
          }
        ],
        "effect": "Most common CF-causing variant (~70% of CF alleles). Carriers are healthy.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Sickle Cell Anemia",
        "condition_key": "sickle_cell",
        "gene": "HBB",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.08,
        "status": "carrier",
        "risk_copies": 1,
        "hits": [
          {
            "rsid": "rs334",
            "gene": "HBB",
            "variant_name": "HbS (E6V, c.20A>T)",
            "copies": 1,
            "effect": "Sickle hemoglobin allele. Carriers (HbAS) are generally healthy with slight malaria protection."
          }
        ],
        "effect": "Sickle hemoglobin allele. Carriers (HbAS) are generally healthy with slight malaria protection.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Hereditary Hearing Loss",
        "condition_key": "hearing_loss_gjb2",
        "gene": "GJB2",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.025,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "Most common hereditary hearing loss variant in Europeans. Carriers have normal hearing.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Tay-Sachs Disease",
        "condition_key": "tay_sachs",
        "gene": "HEXA",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.033,
        "status": "carrier",
        "risk_copies": 1,
        "hits": [
          {
            "rsid": "rs28931614",
            "gene": "HEXA",
            "variant_name": "c.1278insTATC",
            "copies": 1,
            "effect": "Common Tay-Sachs variant in Ashkenazi Jewish population. Carriers are healthy."
          }
        ],
        "effect": "Common Tay-Sachs variant in Ashkenazi Jewish population. Carriers are healthy.",
        "source": "ClinVar Pathogenic"
      },
      {
        "condition": "Gaucher Disease",
        "condition_key": "gaucher",
        "gene": "GBA",
        "inheritance": "autosomal_recessive",
        "carrier_frequency": 0.005,
        "status": "not_detected",
        "risk_copies": 0,
        "hits": [],
        "effect": "GBA L444P — causes severe (type 3) Gaucher disease when homozygous. Carriers are healthy.",
        "source": "ClinVar Pathogenic"
      }
    ],
    "nutrigenomics": [
      {
        "trait": "Lactose Tolerance",
        "trait_key": "lactose_tolerance",
        "gene": "LCT",
        "rsid": "rs4988235",
        "genotype": "AT",
        "category": "Digestive",
        "copies_of_risk_allele": 1,
        "result": "Partial lactase persistence — may have mild lactose sensitivity",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Caffeine Metabolism",
        "trait_key": "caffeine_metabolism",
        "gene": "CYP1A2",
        "rsid": "rs762551",
        "genotype": "AA",
        "category": "Metabolism",
        "copies_of_risk_allele": 0,
        "result": "Fast caffeine metabolizer — caffeine clears quickly; lower cardiovascular risk at moderate intake",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Vitamin D Levels",
        "trait_key": "vitamin_d",
        "gene": "GC",
        "rsid": "rs2282679",
        "genotype": "CC",
        "category": "Vitamins & Minerals",
        "copies_of_risk_allele": 0,
        "result": "Normal vitamin D-binding protein — typical transport capacity",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Folate Metabolism (C677T)",
        "trait_key": "mthfr_677",
        "gene": "MTHFR",
        "rsid": "rs1801133",
        "genotype": "CC",
        "category": "Vitamins & Minerals",
        "copies_of_risk_allele": 0,
        "result": "Normal MTHFR C677T status — standard folate metabolism",
        "source": "ClinVar / GWAS"
      },
      {
        "trait": "Folate Metabolism (A1298C)",
        "trait_key": "mthfr_1298",
        "gene": "MTHFR",
        "rsid": "rs1801131",
        "genotype": "CC",
        "category": "Vitamins & Minerals",
        "copies_of_risk_allele": 2,
        "result": "Reduced BH4 pathway — may affect dopamine/serotonin synthesis; consider methylfolate",
        "source": "ClinVar"
      },
      {
        "trait": "Alcohol Flush Reaction",
        "trait_key": "alcohol_flush",
        "gene": "ALDH2",
        "rsid": "rs671",
        "genotype": "GG",
        "category": "Alcohol Metabolism",
        "copies_of_risk_allele": 0,
        "result": "Normal aldehyde metabolism — no genetic alcohol flush",
        "source": "ClinVar / GWAS"
      },
      {
        "trait": "Omega-3 Fatty Acid Conversion",
        "trait_key": "omega3_conversion",
        "gene": "FADS1",
        "rsid": "rs174537",
        "genotype": "GG",
        "category": "Nutrition",
        "copies_of_risk_allele": 0,
        "result": "High FADS1 activity — efficient conversion of plant-based ALA to EPA/DHA",
        "source": "GWAS Catalog"
      },
      {
        "trait": "Bitter Taste Sensitivity",
        "trait_key": "bitter_taste",
        "gene": "TAS2R38",
        "rsid": "rs713598",
        "genotype": "GG",
        "category": "Taste & Food Preferences",
        "copies_of_risk_allele": 0,
        "result": "Non-taster — insensitive to PROP/PTC bitter compounds; may enjoy bitter foods more",
        "source": "Multiple GWAS"
      }
    ],
    "traits": [
      {
        "trait": "Eye Color",
        "trait_key": "eye_color",
        "gene": "HERC2",
        "rsid": "rs12913832",
        "genotype": "AG",
        "category": "Physical Traits",
        "result": "Likely intermediate (hazel or green) eyes",
        "note": "Primary genetic determinant; other genes (OCA2, SLC45A2) also contribute.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Red Hair Risk",
        "trait_key": "red_hair",
        "gene": "MC1R",
        "rsid": "rs1805008",
        "genotype": "CC",
        "category": "Physical Traits",
        "result": "No MC1R R151C — low genetic red hair signal",
        "note": "MC1R variants also increase sensitivity to UV radiation and anesthetic requirements.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Earwax Type",
        "trait_key": "earwax_type",
        "gene": "ABCC11",
        "rsid": "rs17822931",
        "genotype": "TT",
        "category": "Physical Traits",
        "result": "Wet/sticky earwax — common in European and African populations",
        "note": "",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Sleep Chronotype",
        "trait_key": "sleep_chronotype",
        "gene": "CLOCK",
        "rsid": "rs1801260",
        "genotype": "AG",
        "category": "Behavioral Traits",
        "result": "Intermediate chronotype",
        "note": "",
        "source": "GWAS Catalog"
      },
      {
        "trait": "Muscle Fiber Composition",
        "trait_key": "muscle_composition",
        "gene": "ACTN3",
        "rsid": "rs1815739",
        "genotype": "CT",
        "category": "Athletic Traits",
        "result": "Mixed muscle fiber profile",
        "note": "Olympic sprinters rarely carry TT; endurance athletes have elevated TT frequency.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Androgenic Hair Loss Risk (Males)",
        "trait_key": "hair_loss",
        "gene": "AR",
        "rsid": "rs6152",
        "genotype": "AA",
        "category": "Physical Traits",
        "result": "Higher androgen receptor activity — elevated androgenic alopecia risk",
        "note": "X-linked; males have one copy, so effect is direct. Multiple autosomal loci also contribute.",
        "source": "Multiple GWAS"
      }
    ],
    "mental_health": [
      {
        "trait": "Dopamine & Stress Response",
        "trait_key": "comt_dopamine",
        "gene": "COMT",
        "rsid": "rs4680",
        "genotype": "GG",
        "category": "Dopamine & Cognition",
        "copies_of_risk_allele": 0,
        "result": "Val/Val — higher COMT activity, faster dopamine clearance. Calmer under stress, lower anxiety baseline, but lower peak working memory.",
        "note": "The 'warrior vs worrier' polymorphism. Neither is better — Met shines in calm, Val shines under pressure.",
        "source": "Multiple GWAS / Meta-analyses"
      },
      {
        "trait": "Brain Plasticity & Memory",
        "trait_key": "bdnf_plasticity",
        "gene": "BDNF",
        "rsid": "rs6265",
        "genotype": "GG",
        "category": "Brain Plasticity",
        "copies_of_risk_allele": 0,
        "result": "Val/Val — full BDNF secretion. Optimal neuroplasticity, strong episodic memory, best antidepressant response to exercise.",
        "note": "Met carriers show greater antidepressant benefit from regular aerobic exercise than non-carriers.",
        "source": "Multiple GWAS / Nature Neuroscience"
      },
      {
        "trait": "Reward Sensitivity & Motivation",
        "trait_key": "drd2_reward",
        "gene": "DRD2",
        "rsid": "rs1800497",
        "genotype": "AA",
        "category": "Dopamine Receptor",
        "copies_of_risk_allele": 2,
        "result": "Two Taq1A — ~30% fewer D2 receptors. Lower baseline reward signal; elevated risk of reward-seeking behavior and reduced motivation without external stimulation.",
        "note": "Associated with addiction vulnerability, ADHD traits, and compulsive behavior. Also linked to exercise motivation.",
        "source": "Multiple GWAS"
      },
      {
        "trait": "Serotonin Transport & Stress Sensitivity",
        "trait_key": "serotonin_transport",
        "gene": "SLC6A4",
        "rsid": "rs25531",
        "genotype": "AG",
        "category": "Serotonin System",
        "copies_of_risk_allele": 1,
        "result": "L/S — intermediate serotonin reuptake. Moderate stress reactivity.",
        "note": "Environment strongly moderates this variant. Adverse childhood experiences amplify the S/S risk significantly.",
        "source": "Multiple GWAS / Science"
      },
      {
        "trait": "Monoamine Oxidase Activity",
        "trait_key": "maoa_activity",
        "gene": "MAOA",
        "rsid": "rs6323",
        "genotype": "GG",
        "category": "Neurotransmitter Clearance",
        "copies_of_risk_allele": 2,
        "result": "Low activity — slower neurotransmitter breakdown. More emotionally reactive and empathetic; elevated aggression risk in adverse environments.",
        "note": "X-linked gene. Males have one copy; the effect is direct and stronger. MAOA-L in adversity context is the most studied gene-environment interaction.",
        "source": "Multiple GWAS / Science"
      }
    ],
    "longevity": [
      {
        "trait": "Longevity Pathway",
        "trait_key": "foxo3_longevity",
        "gene": "FOXO3",
        "rsid": "rs2802292",
        "genotype": "GT",
        "category": "Longevity",
        "copies_of_risk_allele": 1,
        "result": "GT — one protective allele. Moderately associated with longer healthy lifespan.",
        "note": "One of the most replicated longevity variants in human genetics. FOXO3 is a master regulator of cellular stress response.",
        "source": "PNAS 2008 / Multiple replication studies",
        "protective": false
      },
      {
        "trait": "Telomere Maintenance",
        "trait_key": "tert_telomere",
        "gene": "TERT",
        "rsid": "rs10069690",
        "genotype": "CC",
        "category": "Cellular Aging",
        "copies_of_risk_allele": 0,
        "result": "CC — lower risk variant. Associated with normal telomere dynamics.",
        "note": "Telomere length reflects cumulative oxidative stress and inflammation exposure.",
        "source": "Nature Genetics / GWAS Catalog",
        "protective": false
      },
      {
        "trait": "Metabolic Efficiency & Weight Regulation",
        "trait_key": "fto_metabolism",
        "gene": "FTO",
        "rsid": "rs9939609",
        "genotype": "TT",
        "category": "Metabolic Health",
        "copies_of_risk_allele": 0,
        "result": "TT — lowest obesity genetic risk. Normal energy regulation and satiety signaling.",
        "note": "Most common obesity-associated variant worldwide. Physical activity almost fully abolishes the FTO effect.",
        "source": "Science 2007 / Multiple GWAS",
        "protective": false
      },
      {
        "trait": "Baseline Inflammation (IL-6)",
        "trait_key": "il6_inflammation",
        "gene": "IL6",
        "rsid": "rs1800795",
        "genotype": "GG",
        "category": "Inflammation",
        "copies_of_risk_allele": 0,
        "result": "GG — lower baseline IL-6 production. Anti-inflammatory tendency. Better cardiovascular aging profile.",
        "note": "IL-6 is a master pro-inflammatory cytokine. Chronic elevation accelerates biological aging.",
        "source": "Multiple GWAS / Lancet",
        "protective": false
      },
      {
        "trait": "TNF-α Inflammatory Response",
        "trait_key": "tnf_inflammation",
        "gene": "TNF",
        "rsid": "rs1800629",
        "genotype": "GG",
        "category": "Inflammation",
        "copies_of_risk_allele": 0,
        "result": "GG — normal TNF-alpha production. No elevated inflammatory cytokine risk.",
        "note": "TNF-alpha is a master inflammatory cytokine. Anti-TNF biologics (etanercept, adalimumab) specifically target this pathway.",
        "source": "Multiple GWAS",
        "protective": false
      }
    ],
    "summary": {
      "conditions_evaluated": 9,
      "high_risk_count": 0,
      "elevated_risk_count": 1,
      "pgx_findings_count": 3,
      "carrier_detected": 3,
      "nutrition_traits": 8,
      "genetic_traits": 6,
      "mental_health_variants": 5,
      "longevity_variants": 5
    },
    "overall_risk_score": 8,
    "summary_sentence": "Your results show elevated risk for Alzheimer's Disease; 2 drug-metabolism alert(s) (CYP2C19, VKORC1).",
    "priority_actions": [
      {
        "priority": "P1",
        "title": "CYP2C19 Poor Metabolizer — critical drug alert",
        "description": "Clopidogrel (Plavix) is INEFFECTIVE in you. Inform every cardiologist and surgeon before any cardiac procedure. Alternative: ticagrelor or prasugrel. PPIs (omeprazole, esomeprazole) accumulate — use pantoprazole or lowest dose.",
        "category": "pgx",
        "condition": "CYP2C19"
      },
      {
        "priority": "P1",
        "title": "Warfarin hypersensitivity — critical drug alert",
        "description": "Standard warfarin doses will cause dangerous over-anticoagulation. You require 30–50% lower doses. CRITICAL: inform every prescribing doctor — especially before surgery or cardiac procedures.",
        "category": "pgx",
        "condition": "VKORC1"
      },
      {
        "priority": "P2",
        "title": "Cognitive health monitoring",
        "description": "APOE ε4 detected — elevated Alzheimer's risk. Annual cognitive screening from age 55 recommended.",
        "category": "disease",
        "condition": "Alzheimer's Disease"
      },
      {
        "priority": "P2",
        "title": "CYP2C19 Intermediate Metabolizer",
        "description": "Reduced clopidogrel effectiveness. Inform doctors before cardiac procedures. Monitor PPI dosing.",
        "category": "pgx",
        "condition": "CYP2C19"
      },
      {
        "priority": "P3",
        "title": "Routine glucose check",
        "description": "Annual HbA1c from age 45 — standard care.",
        "category": "disease",
        "condition": "Type 2 Diabetes"
      }
    ],
    "variant_table": [
      {
        "rsid": "rs429358",
        "gene": "APOE",
        "condition": "APOE ε4 allele — significantly increases lifetime risk of la",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs7412",
        "gene": "APOE",
        "condition": "APOE ε2 allele — protective against Alzheimer's",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs6025",
        "gene": "F5",
        "condition": "Factor V Leiden — 5-7x increased risk of blood clots (DVT/PE",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1799963",
        "gene": "F2",
        "condition": "Prothrombin G20210A mutation — 3x increased risk of blood cl",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1800562",
        "gene": "HFE",
        "condition": "HFE C282Y — primary mutation for hereditary hemochromatosis ",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1799945",
        "gene": "HFE",
        "condition": "HFE H63D — modifier mutation; compound heterozygotes (C282Y ",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs34637584",
        "gene": "LRRK2",
        "condition": "LRRK2 G2019S — most common known genetic cause of Parkinson'",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs76763715",
        "gene": "GBA",
        "condition": "GBA N370S — 5x increased risk of Parkinson's; also associate",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs2187668",
        "gene": "HLA-DQA1",
        "condition": "HLA-DQ2.5 proxy — present in ~90% of celiac patients; necess",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs7454108",
        "gene": "HLA-DQB1",
        "condition": "HLA-DQ8 proxy — second major celiac risk HLA haplotype",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4244285",
        "gene": "CYP2C19",
        "condition": "Antiplatelet (clopidogrel), SSRIs, Proton pump inhibitors",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs12248560",
        "gene": "CYP2C19",
        "condition": "SSRIs, Proton pump inhibitors, Clopidogrel",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs3892097",
        "gene": "CYP2D6",
        "condition": "Tricyclic antidepressants, Codeine/tramadol, Tamoxifen, Beta-blockers",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4149056",
        "gene": "SLCO1B1",
        "condition": "Statins (simvastatin, atorvastatin)",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs9923231",
        "gene": "VKORC1",
        "condition": "Warfarin (anticoagulant)",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1799853",
        "gene": "CYP2C9",
        "condition": "Warfarin, NSAIDs (celecoxib, ibuprofen), Sulfonylureas",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1057910",
        "gene": "CYP2C9",
        "condition": "Warfarin, NSAIDs, Phenytoin, Sulfonylureas",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4986893",
        "gene": "CYP2C19",
        "condition": "SSRIs, Clopidogrel, Proton pump inhibitors",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs7903146",
        "gene": "TCF7L2",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs5219",
        "gene": "KCNJ11",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1801282",
        "gene": "PPARG",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs13266634",
        "gene": "SLC30A8",
        "condition": "Type 2 Diabetes",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1333049",
        "gene": "9p21.3",
        "condition": "Coronary Artery Disease",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs4977574",
        "gene": "CDKN2B-AS1",
        "condition": "Coronary Artery Disease",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs2200733",
        "gene": "PITX2",
        "condition": "Atrial Fibrillation",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs1061170",
        "gene": "CFH",
        "condition": "Age-Related Macular Degeneration",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs10490924",
        "gene": "ARMS2",
        "condition": "Age-Related Macular Degeneration",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      },
      {
        "rsid": "rs3736228",
        "gene": "LRP5",
        "condition": "Osteoporosis / Low Bone Density",
        "clinical_significance": "",
        "gnomad_af": null,
        "gwas_traits": []
      }
    ],
    "doctor_notes": [
      {
        "drug": "Antiplatelet (clopidogrel)",
        "gene": "CYP2C19",
        "star_allele": "*2",
        "zygosity": "homozygous",
        "what_to_say": "I am a CYP2C19 Poor Metabolizer. Clopidogrel (Plavix) is ineffective for me — I need an alternative such as ticagrelor or prasugrel."
      },
      {
        "drug": "SSRIs",
        "gene": "CYP2C19",
        "star_allele": "*2",
        "zygosity": "homozygous",
        "what_to_say": "I am a CYP2C19 Poor Metabolizer. Many SSRIs accumulate in my system. Please start at a lower dose."
      },
      {
        "drug": "Proton pump inhibitors",
        "gene": "CYP2C19",
        "star_allele": "*2",
        "zygosity": "homozygous",
        "what_to_say": "I am a CYP2C19 Poor Metabolizer. PPIs like omeprazole build up — use lowest effective dose or switch to pantoprazole."
      },
      {
        "drug": "Warfarin (anticoagulant)",
        "gene": "VKORC1",
        "star_allele": null,
        "zygosity": "homozygous",
        "what_to_say": "I have VKORC1 warfarin hypersensitivity. Standard doses will over-anticoagulate me — I require 30–50% lower doses."
      },
      {
        "drug": "SSRIs",
        "gene": "CYP2C19",
        "star_allele": "*3",
        "zygosity": "heterozygous",
        "what_to_say": "I am a CYP2C19 Poor Metabolizer. Many SSRIs accumulate in my system. Please start at a lower dose."
      },
      {
        "drug": "Clopidogrel",
        "gene": "CYP2C19",
        "star_allele": "*3",
        "zygosity": "heterozygous",
        "what_to_say": "I am a CYP2C19 Poor Metabolizer — clopidogrel is ineffective. I need an alternative antiplatelet agent."
      },
      {
        "drug": "Proton pump inhibitors",
        "gene": "CYP2C19",
        "star_allele": "*3",
        "zygosity": "heterozygous",
        "what_to_say": "I am a CYP2C19 Poor Metabolizer. PPIs like omeprazole build up — use lowest effective dose or switch to pantoprazole."
      }
    ],
    "enrichment_stats": {
      "enriched": 0,
      "clinvar_hits": 0,
      "gwas_traits_total": 0,
      "pathogenic_count": 0
    },
    "disclaimer": "This report is for educational and informational purposes only. It does not constitute medical advice, diagnosis, or treatment. Consult a qualified healthcare provider before making any health decisions."
  }
};
