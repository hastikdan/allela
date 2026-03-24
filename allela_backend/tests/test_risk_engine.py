"""Tests for risk scoring engine."""
import pytest
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from risk_engine import (
    _classify_apoe, _count_risk_alleles, compute_monogenic_risks,
    compute_prs, compute_pgx, score_all, _VARIANT_DB
)


# ── APOE tests ─────────────────────────────────────────────────────────────

def test_apoe_e4e4():
    snps = {"rs429358": "CC", "rs7412": "CC"}
    label, risk = _classify_apoe(snps)
    assert label == "ε4/ε4"
    assert risk == pytest.approx(0.41)


def test_apoe_e3e3():
    snps = {"rs429358": "TT", "rs7412": "CC"}
    label, risk = _classify_apoe(snps)
    assert label == "ε3/ε3"
    assert risk == pytest.approx(0.09)


def test_apoe_e2e3():
    snps = {"rs429358": "TT", "rs7412": "TC"}
    label, risk = _classify_apoe(snps)
    assert label == "ε2/ε3"
    assert risk == pytest.approx(0.05)


def test_apoe_e4e3():
    snps = {"rs429358": "TC", "rs7412": "CC"}
    label, risk = _classify_apoe(snps)
    assert label == "ε4/ε3"
    assert risk == pytest.approx(0.20)


# ── Risk allele counting ───────────────────────────────────────────────────

def test_count_risk_alleles_homozygous():
    assert _count_risk_alleles("TT", "T") == 2


def test_count_risk_alleles_heterozygous():
    assert _count_risk_alleles("TC", "T") == 1


def test_count_risk_alleles_none():
    assert _count_risk_alleles("CC", "T") == 0


def test_count_risk_alleles_missing():
    assert _count_risk_alleles("", "T") == 0


# ── Monogenic ──────────────────────────────────────────────────────────────

def test_monogenic_factor_v_leiden():
    snps = {"rs6025": "TT", "rs429358": "TT", "rs7412": "CC"}
    results = compute_monogenic_risks(snps)
    vte = next((r for r in results if r["condition_key"] == "vte"), None)
    assert vte is not None
    assert vte["risk_tier"] in ("high", "elevated")
    assert vte["lifetime_risk_pct"] >= 5.0


def test_monogenic_no_variants():
    snps = {"rs429358": "TT", "rs7412": "CC"}
    results = compute_monogenic_risks(snps)
    # Should still have Alzheimer's result
    alz = next((r for r in results if r["condition_key"] == "alzheimers"), None)
    assert alz is not None
    # No VTE without rs6025
    vte = next((r for r in results if r["condition_key"] == "vte"), None)
    assert vte is None


def test_monogenic_always_has_apoe():
    snps = {}
    results = compute_monogenic_risks(snps)
    alz = next((r for r in results if r["condition_key"] == "alzheimers"), None)
    assert alz is not None
    assert "ε3/ε3" in alz["key_findings"][0]


# ── PRS ────────────────────────────────────────────────────────────────────

def test_prs_t2d_high_risk():
    # Homozygous risk alleles at key variants
    snps = {
        "rs7903146": "TT",  # TCF7L2 — strong T2D variant
        "rs5219": "TT",
        "rs1801282": "GG",
        "rs13266634": "CC",
    }
    prs_config = _VARIANT_DB["prs"]["type2_diabetes"]
    result = compute_prs(snps, prs_config)
    assert result["lifetime_risk_pct"] > 12.0  # above population avg
    assert result["condition_key"] == "type2_diabetes"


def test_prs_low_risk():
    snps = {
        "rs7903146": "CC",  # No risk alleles
        "rs5219": "CC",
    }
    prs_config = _VARIANT_DB["prs"]["type2_diabetes"]
    result = compute_prs(snps, prs_config)
    assert result["lifetime_risk_pct"] < 15.0


def test_prs_no_snps_found():
    snps = {}
    prs_config = _VARIANT_DB["prs"]["type2_diabetes"]
    result = compute_prs(snps, prs_config)
    assert result["snps_found"] == 0
    assert result["lifetime_risk_pct"] > 0  # still returns a result


# ── PGx ───────────────────────────────────────────────────────────────────

def test_pgx_cyp2c19_poor():
    snps = {"rs4244285": "AA"}  # CYP2C19*2 homozygous
    results = compute_pgx(snps)
    cyp = next((r for r in results if r["gene"] == "CYP2C19"), None)
    assert cyp is not None
    assert cyp["zygosity"] == "homozygous"
    assert "SSRI" in " ".join(cyp["drug_classes"]) or "antiplatelet" in cyp["drug_classes"][0].lower()


def test_pgx_no_variants():
    snps = {"rs4244285": "GG"}  # No risk allele
    results = compute_pgx(snps)
    assert len(results) == 0


# ── Full scoring ───────────────────────────────────────────────────────────

def test_score_all_structure():
    snps = {
        "rs429358": "TC",
        "rs7412": "CC",
        "rs7903146": "CT",
        "rs4244285": "GA",
    }
    result = score_all(snps)
    assert "disease_risks" in result
    assert "pharmacogenomics" in result
    assert "summary" in result
    assert "disclaimer" in result
    assert len(result["disease_risks"]) > 0
    assert "medical advice" in result["disclaimer"].lower()


def test_score_all_no_raw_snps_in_output():
    """Ensure raw SNP genotypes don't leak into disease/pgx/carrier output sections.
    Genotypes are intentionally included in variant_table for display; all other
    sections must not contain raw genotype values."""
    snps = {"rs429358": "SECRET_GENOTYPE", "rs7412": "CC"}
    result = score_all(snps)
    # Check sections that must never contain raw genotypes
    for key in ("disease_risks", "pharmacogenomics", "carrier_status", "nutrigenomics", "traits", "priority_actions"):
        assert "SECRET_GENOTYPE" not in str(result.get(key, "")), f"Raw genotype leaked into {key}"


def test_score_all_sorted_by_risk():
    snps = {
        "rs6025": "TT",        # Factor V Leiden homozygous — high risk
        "rs429358": "TT",
        "rs7412": "CC",
    }
    result = score_all(snps)
    risks = result["disease_risks"]
    tiers = [r["risk_tier"] for r in risks]
    tier_order = {"high": 0, "elevated": 1, "average": 2, "below_average": 3}
    tier_values = [tier_order.get(t, 9) for t in tiers]
    assert tier_values == sorted(tier_values), "Results should be sorted by risk tier"
