"""
Live variant enrichment via four free, no-key-required public databases.
Called during /analyze — fires real HTTP requests for every rsID found in the user's file.

Sources:
  NCBI dbSNP esummary  — gene name, global MAF
  ClinVar NLM          — clinical significance, phenotype
  EBI GWAS Catalog     — trait associations, p-values
  Ensembl REST         — population frequencies (gnomAD), consequence
"""
import asyncio
import logging
from typing import Optional

import httpx

logger = logging.getLogger(__name__)

_TIMEOUT = 7.0        # seconds per request
_CONCURRENCY = 8      # max simultaneous requests


# ── NCBI dbSNP esummary ────────────────────────────────────────────────────

async def _fetch_ncbi(client: httpx.AsyncClient, rsid: str) -> dict:
    rsid_num = rsid.lstrip("rs")
    try:
        r = await client.get(
            "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi",
            params={"db": "snp", "id": rsid_num, "retmode": "json"},
            timeout=_TIMEOUT,
        )
        if r.status_code != 200:
            return {}
        data = r.json()
        doc = data.get("result", {}).get(rsid_num, {})
        if not doc:
            return {}
        genes = doc.get("genes", [])
        gene = genes[0]["name"] if genes else ""
        # dbSNP sometimes embeds ClinVar significance
        clin_sig = doc.get("clinical_significance", "") or ""
        # Global MAF from dbSNP
        mafs = doc.get("global_mafs", [])
        maf = None
        for m in mafs:
            freq_dict = m.get("freq", {})
            vals = [v for v in freq_dict.values() if isinstance(v, (int, float)) and 0 < v < 1]
            if vals:
                maf = min(vals)  # minor allele freq
                break
        return {
            "gene": gene,
            "ncbi_clin_sig": clin_sig,
            "ncbi_maf": maf,
        }
    except Exception as exc:
        logger.debug("NCBI error for %s: %s", rsid, exc)
        return {}


# ── ClinVar NLM ────────────────────────────────────────────────────────────

async def _fetch_clinvar(client: httpx.AsyncClient, rsid: str) -> dict:
    try:
        r = await client.get(
            "https://clinicaltables.nlm.nih.gov/api/variants/v4/search",
            params={
                "terms": rsid,
                "maxList": 5,
                "df": "NucleotideChange,ProteinChange,ClinicalSignificance,PhenotypeList,Assembly",
            },
            timeout=_TIMEOUT,
        )
        if r.status_code != 200:
            return {}
        data = r.json()
        # [total_count, codes, extra, [[NucChange, ProtChange, ClinSig, Phenotype, Assembly], ...]]
        if not data or len(data) < 4 or not data[3]:
            return {}
        rows = data[3]
        # Prefer GRCh38 row
        best = next((row for row in rows if len(row) >= 5 and "GRCh38" in (row[4] or "")), rows[0])
        if not best or len(best) < 4:
            return {}
        clin_sig_raw = (best[2] or "").strip()
        phenotype = (best[3] or "").strip()
        # Normalise clinical significance
        sl = clin_sig_raw.lower()
        if "pathogenic" in sl and "likely" not in sl and "benign" not in sl:
            normalised = "Pathogenic"
        elif "likely pathogenic" in sl:
            normalised = "Likely Pathogenic"
        elif "likely benign" in sl:
            normalised = "Likely Benign"
        elif "benign" in sl:
            normalised = "Benign"
        elif "uncertain" in sl or "vus" in sl:
            normalised = "VUS"
        else:
            normalised = clin_sig_raw[:40] if clin_sig_raw else ""
        return {
            "clinical_significance": normalised,
            "condition": phenotype[:100] if phenotype else "",
        }
    except Exception as exc:
        logger.debug("ClinVar error for %s: %s", rsid, exc)
        return {}


# ── EBI GWAS Catalog ───────────────────────────────────────────────────────

async def _fetch_gwas(client: httpx.AsyncClient, rsid: str) -> dict:
    try:
        r = await client.get(
            f"https://www.ebi.ac.uk/gwas/rest/api/singleNucleotidePolymorphisms/{rsid}/associations",
            params={"projection": "associationBySnp", "size": 10},
            headers={"Accept": "application/json"},
            timeout=_TIMEOUT,
        )
        if r.status_code != 200:
            return {}
        data = r.json()
        associations = data.get("_embedded", {}).get("associations", [])
        if not associations:
            return {}
        traits: list[str] = []
        best_pval: Optional[float] = None
        for assoc in associations[:8]:
            for trait_obj in assoc.get("efoTraits", []):
                t = trait_obj.get("trait", "")
                if t and t not in traits:
                    traits.append(t)
            pval = assoc.get("pvalue")
            if pval is not None:
                if best_pval is None or pval < best_pval:
                    best_pval = pval
        return {
            "gwas_traits": traits[:5],
            "gwas_pvalue": best_pval,
        }
    except Exception as exc:
        logger.debug("GWAS error for %s: %s", rsid, exc)
        return {}


# ── Ensembl REST ───────────────────────────────────────────────────────────

async def _fetch_ensembl(client: httpx.AsyncClient, rsid: str) -> dict:
    try:
        r = await client.get(
            f"https://rest.ensembl.org/variation/homo_sapiens/{rsid}",
            params={"pops": "1"},
            headers={"Content-Type": "application/json"},
            timeout=_TIMEOUT,
        )
        if r.status_code != 200:
            return {}
        data = r.json()
        pops = data.get("populations", [])
        # Prefer gnomAD global AF
        gnomad_af: Optional[float] = None
        for pop in pops:
            name = pop.get("population", "")
            if "gnomAD" in name and "ALL" in name.upper():
                gnomad_af = pop.get("frequency")
                break
        if gnomad_af is None:
            for pop in pops:
                if "gnomAD" in pop.get("population", ""):
                    gnomad_af = pop.get("frequency")
                    break
        # Fallback: 1000 Genomes ALL
        if gnomad_af is None:
            for pop in pops:
                if "1000GENOMES" in pop.get("population", "").upper() and "ALL" in pop.get("population", "").upper():
                    gnomad_af = pop.get("frequency")
                    break
        consequence = data.get("most_severe_consequence", "")
        return {
            "gnomad_af": gnomad_af,
            "consequence": consequence,
        }
    except Exception as exc:
        logger.debug("Ensembl error for %s: %s", rsid, exc)
        return {}


# ── Per-rsID enrichment ────────────────────────────────────────────────────

async def _enrich_one(client: httpx.AsyncClient, rsid: str) -> dict:
    """Fire all 4 API calls concurrently for one rsID."""
    ncbi, clinvar, gwas, ensembl = await asyncio.gather(
        _fetch_ncbi(client, rsid),
        _fetch_clinvar(client, rsid),
        _fetch_gwas(client, rsid),
        _fetch_ensembl(client, rsid),
    )
    merged: dict = {"rsid": rsid}
    merged.update(ncbi)
    merged.update(clinvar)
    merged.update(gwas)
    merged.update(ensembl)
    # Prefer ClinVar normalised sig over NCBI raw
    if not merged.get("clinical_significance") and merged.get("ncbi_clin_sig"):
        sl = merged["ncbi_clin_sig"].lower()
        if "pathogenic" in sl and "benign" not in sl:
            merged["clinical_significance"] = "Pathogenic"
        elif "benign" in sl:
            merged["clinical_significance"] = "Benign"
        elif "uncertain" in sl:
            merged["clinical_significance"] = "VUS"
    merged.pop("ncbi_clin_sig", None)
    return merged


# ── Public interface ───────────────────────────────────────────────────────

async def enrich_variants_async(rsids: list[str]) -> dict[str, dict]:
    """
    Enrich a list of rsIDs with live data from all 4 public databases.
    Returns {rsid: enrichment_dict}.
    Any individual failure is logged and replaced with an empty dict.
    """
    sem = asyncio.Semaphore(_CONCURRENCY)

    async def bounded(rsid: str) -> dict:
        async with sem:
            return await _enrich_one(client, rsid)

    async with httpx.AsyncClient(follow_redirects=True) as client:
        results = await asyncio.gather(
            *[bounded(rsid) for rsid in rsids],
            return_exceptions=True,
        )

    out: dict[str, dict] = {}
    for rsid, result in zip(rsids, results):
        if isinstance(result, Exception):
            logger.warning("Enrichment failed for %s: %s", rsid, result)
            out[rsid] = {"rsid": rsid}
        else:
            out[rsid] = result
    return out
