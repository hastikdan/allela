"""
DNA file parser for 23andMe, AncestryDNA, and MyHeritage raw data formats.
Processes files in memory — raw content is never written to disk or database.
"""
import re
from typing import IO


SUPPORTED_FORMATS = {
    "23andme": "23andMe",
    "ancestrydna": "AncestryDNA",
    "myheritage": "MyHeritage",
}

# rsid pattern
RSID_RE = re.compile(r"^rs\d+$")


def detect_format(header_lines: list[str]) -> str:
    """Detect DNA file format from header lines."""
    header = "\n".join(header_lines).lower()
    if "23andme" in header:
        return "23andme"
    if "ancestrydna" in header or "ancestry" in header:
        return "ancestrydna"
    if "myheritage" in header:
        return "myheritage"
    # fallback: try to detect by column structure
    return "23andme"


def parse_23andme(lines: list[str]) -> dict[str, str]:
    """
    Parse 23andMe raw data format.
    Columns: rsid, chromosome, position, genotype
    """
    snps = {}
    for line in lines:
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split("\t")
        if len(parts) < 4:
            continue
        rsid, _chrom, _pos, genotype = parts[0], parts[1], parts[2], parts[3]
        if not RSID_RE.match(rsid):
            continue
        if genotype and genotype not in ("--", "II", "DI", "DD"):
            snps[rsid] = genotype.upper()
    return snps


def parse_ancestrydna(lines: list[str]) -> dict[str, str]:
    """
    Parse AncestryDNA raw data format.
    Columns: rsid, chromosome, position, allele1, allele2
    """
    snps = {}
    for line in lines:
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split("\t")
        if len(parts) < 5:
            continue
        rsid = parts[0]
        if not RSID_RE.match(rsid):
            continue
        allele1, allele2 = parts[3].upper(), parts[4].upper()
        if allele1 not in "ACGT0" or allele2 not in "ACGT0":
            continue
        if allele1 == "0" or allele2 == "0":
            continue
        snps[rsid] = allele1 + allele2
    return snps


def parse_myheritage(lines: list[str]) -> dict[str, str]:
    """
    Parse MyHeritage raw data format (similar to 23andMe).
    Columns: RSID, CHROMOSOME, POSITION, RESULT
    """
    snps = {}
    for line in lines:
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split(",")
        if len(parts) < 4:
            # try tab-separated
            parts = line.split("\t")
        if len(parts) < 4:
            continue
        rsid = parts[0].strip('"')
        if not RSID_RE.match(rsid):
            continue
        genotype = parts[3].strip().strip('"').upper()
        if genotype and "--" not in genotype:
            snps[rsid] = genotype
    return snps


def parse_dna_file(file_content: bytes) -> tuple[dict[str, str], str, int]:
    """
    Parse raw DNA file bytes into a SNP dict.
    Returns: (snp_dict, format_detected, snp_count)

    PRIVACY: This function processes content in memory only.
    The caller must not persist file_content after calling this function.
    """
    try:
        text = file_content.decode("utf-8", errors="replace")
    except Exception:
        text = file_content.decode("latin-1", errors="replace")

    lines = text.splitlines()

    if len(lines) < 5:
        raise ValueError("File too short — does not appear to be a valid DNA data file.")

    if len(lines) > 2_000_000:
        raise ValueError("File too large — maximum 2 million lines supported.")

    # Collect header for format detection
    header_lines = [l for l in lines[:20] if l.startswith("#") or "rsid" in l.lower()]
    fmt = detect_format(header_lines)

    if fmt == "ancestrydna":
        snps = parse_ancestrydna(lines)
    elif fmt == "myheritage":
        snps = parse_myheritage(lines)
    else:
        snps = parse_23andme(lines)

    if len(snps) < 1000:
        raise ValueError(
            f"Only {len(snps)} SNPs parsed — file may be corrupted or in an unsupported format."
        )

    return snps, fmt, len(snps)
