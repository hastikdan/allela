"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ── Types ──────────────────────────────────────────────────────────────────

type RiskTier = "high" | "elevated" | "average" | "below_average";
type Priority = "P1" | "P2" | "P3";

interface DiseaseRisk {
  condition: string;
  condition_key: string;
  method: string;
  lifetime_risk_pct: number;
  population_avg_pct: number;
  risk_tier: RiskTier;
  evidence_grade: string;
  key_findings: string[];
  prs_percentile?: number;
  coverage_pct?: number;
  note?: string;
}

interface PGxFinding {
  gene: string;
  rsid: string;
  star_allele?: string;
  copies: number;
  zygosity: string;
  effect: string;
  drug_classes: string[];
  clinical_guidance: string;
}

interface PriorityAction {
  priority: Priority;
  title: string;
  description: string;
  category: "disease" | "pgx" | "general";
  condition: string;
}

interface VariantRow {
  rsid: string;
  genotype: string;
  gene: string;
  condition: string;
  clinical_significance: string;
  gnomad_af: number | null;
  gwas_traits: string[];
}

interface EnrichmentStats {
  enriched: number;
  clinvar_hits: number;
  gwas_traits_total: number;
  pathogenic_count: number;
}

interface DoctorNote {
  drug: string;
  gene: string;
  star_allele?: string;
  zygosity: string;
  what_to_say: string;
}

interface Scores {
  disease_risks: DiseaseRisk[];
  pharmacogenomics: PGxFinding[];
  summary: {
    conditions_evaluated: number;
    high_risk_count: number;
    elevated_risk_count: number;
    pgx_findings_count: number;
  };
  overall_risk_score?: number;
  summary_sentence?: string;
  priority_actions?: PriorityAction[];
  variant_table?: VariantRow[];
  doctor_notes?: DoctorNote[];
  enrichment_stats?: EnrichmentStats;
  disclaimer: string;
}

interface Report {
  report_id: string;
  format_detected: string;
  snp_count: number;
  scores: Scores;
  created_at: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

const TIER_COLOR: Record<RiskTier, string> = {
  high: "#ef4444",
  elevated: "#f97316",
  average: "#eab308",
  below_average: "#22c55e",
};

const TIER_LABEL: Record<RiskTier, string> = {
  high: "HIGH",
  elevated: "ELEVATED",
  average: "AVERAGE",
  below_average: "BELOW AVG",
};

const PRIORITY_COLOR: Record<Priority, string> = {
  P1: "#ef4444",
  P2: "#f97316",
  P3: "#22c55e",
};

const PRIORITY_BG: Record<Priority, string> = {
  P1: "rgba(239,68,68,0.08)",
  P2: "rgba(249,115,22,0.08)",
  P3: "rgba(34,197,94,0.08)",
};

const PRIORITY_BORDER: Record<Priority, string> = {
  P1: "rgba(239,68,68,0.25)",
  P2: "rgba(249,115,22,0.25)",
  P3: "rgba(34,197,94,0.25)",
};

const CLIN_SIG_COLOR: Record<string, string> = {
  "Pathogenic": "#ef4444",
  "Likely Pathogenic": "#f97316",
  "VUS": "#eab308",
  "Likely Benign": "#22c55e",
  "Benign": "#6b7280",
};

function scoreLabel(score: number): { label: string; color: string } {
  if (score <= 20) return { label: "Low Risk", color: "#22c55e" };
  if (score <= 45) return { label: "Moderate", color: "#eab308" };
  if (score <= 70) return { label: "Elevated", color: "#f97316" };
  return { label: "High Risk", color: "#ef4444" };
}

function formatFreq(af: number | null): string {
  if (af === null || af === undefined) return "—";
  if (af < 0.0001) return "<0.01%";
  return (af * 100).toFixed(2) + "%";
}

// ── Main component ─────────────────────────────────────────────────────────

export default function ReportPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const reportId = params.reportId as string;
  const sessionId = searchParams.get("session_id");

  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [expandedVariants, setExpandedVariants] = useState(false);
  const [expandedDisease, setExpandedDisease] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;
    const url = sessionId
      ? `${API}/report/${reportId}?session_id=${sessionId}`
      : `${API}/report/${reportId}`;
    fetch(url)
      .then(r => {
        if (r.status === 402) throw new Error("payment_required");
        if (!r.ok) throw new Error("not_found");
        return r.json();
      })
      .then(setReport)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [reportId, sessionId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
      <div className="text-center">
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4"
          style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
        <p style={{ color: "var(--muted)" }}>Loading your report...</p>
      </div>
    </div>
  );

  if (error === "payment_required") return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
      <div className="text-center p-8 rounded-2xl max-w-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Payment required</h2>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>This report requires a completed payment to access.</p>
        <a href="/upload" className="inline-block px-6 py-3 rounded-lg font-semibold text-sm"
          style={{ background: "var(--accent)", color: "#fff" }}>Upload & Pay →</a>
      </div>
    </div>
  );

  if (error || !report) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
      <div className="text-center">
        <p className="text-red-400">Report not found or an error occurred.</p>
        <a href="/" className="text-xs underline mt-2 block" style={{ color: "var(--muted)" }}>Go home</a>
      </div>
    </div>
  );

  const { scores } = report;
  const {
    disease_risks,
    pharmacogenomics,
    summary,
    overall_risk_score = 0,
    summary_sentence = "",
    priority_actions = [],
    variant_table = [],
    doctor_notes = [],
    enrichment_stats,
    disclaimer,
  } = scores;

  const { label: riskLabel, color: riskColor } = scoreLabel(overall_risk_score);
  const protective = disease_risks.filter(r => r.risk_tier === "below_average");
  const p1Count = priority_actions.filter(a => a.priority === "P1").length;

  return (
    <main className="min-h-screen pb-24" style={{ background: "var(--background)" }}>

      {/* ── Header ── */}
      <div className="px-6 pt-8 pb-4 max-w-3xl mx-auto">
        <a href="/" className="text-lg font-bold tracking-tight" style={{ color: "var(--foreground)" }}>allela</a>
        <div className="mt-6 flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Your DNA Risk Report</h1>
          <span className="text-xs px-2 py-1 rounded-md" style={{ background: "var(--border)", color: "var(--muted)" }}>
            {report.format_detected} · {report.snp_count?.toLocaleString()} SNPs
          </span>
        </div>
        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
          {new Date(report.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* ── 1. Score Card ── */}
      <div className="px-6 max-w-3xl mx-auto mb-4">
        <div className="rounded-2xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>Overall Risk Score</div>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-bold" style={{ color: riskColor }}>{overall_risk_score}</span>
                <span className="text-sm font-bold px-2 py-1 rounded-md" style={{ background: riskColor + "20", color: riskColor }}>{riskLabel}</span>
              </div>
              {/* Score bar */}
              <div className="mt-3 w-48 h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${overall_risk_score}%`, background: riskColor }} />
              </div>
            </div>
            {/* Mini stats */}
            <div className="flex flex-col gap-2 min-w-36">
              {[
                { label: "Disease Risk", value: `${summary.high_risk_count + summary.elevated_risk_count} conditions`, color: summary.high_risk_count > 0 ? "#ef4444" : "#f97316" },
                { label: "PGx Flags", value: `${summary.pgx_findings_count} findings`, color: "#f97316" },
                { label: "Priority Actions", value: `${priority_actions.length} actions${p1Count > 0 ? ` (${p1Count} critical)` : ""}`, color: p1Count > 0 ? "#ef4444" : "var(--accent)" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <div>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{s.label}: </span>
                    <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{s.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {summary_sentence && (
            <p className="mt-4 text-sm italic" style={{ color: "var(--muted)", borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
              {summary_sentence}
            </p>
          )}
        </div>
      </div>

      {/* ── 2. Live DB Status ── */}
      {enrichment_stats && (
        <div className="px-6 max-w-3xl mx-auto mb-4">
          <div className="rounded-xl px-5 py-3 flex items-center justify-between flex-wrap gap-3"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { name: "NCBI", active: enrichment_stats.enriched > 0 },
                { name: "ClinVar", active: enrichment_stats.clinvar_hits > 0 },
                { name: "GWAS", active: enrichment_stats.gwas_traits_total > 0 },
                { name: "Ensembl", active: enrichment_stats.enriched > 0 },
              ].map(src => (
                <div key={src.name} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: src.active ? "#22c55e" : "#6b7280" }} />
                  <span className="text-xs font-semibold" style={{ color: src.active ? "var(--foreground)" : "var(--muted)" }}>{src.name}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { label: "enriched", value: enrichment_stats.enriched },
                { label: "ClinVar", value: enrichment_stats.clinvar_hits },
                { label: "GWAS traits", value: enrichment_stats.gwas_traits_total },
                { label: "pathogenic", value: enrichment_stats.pathogenic_count, color: enrichment_stats.pathogenic_count > 0 ? "#ef4444" : undefined },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-sm font-bold" style={{ color: s.color || "var(--accent)" }}>{s.value}</div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 3. Priority Actions ── */}
      {priority_actions.length > 0 && (
        <div className="px-6 max-w-3xl mx-auto mb-6">
          <h2 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
            🎯 Priority Actions
          </h2>
          <div className="space-y-2">
            {priority_actions.map((action, i) => (
              <div key={i} className="rounded-xl p-4"
                style={{ background: PRIORITY_BG[action.priority], border: `1px solid ${PRIORITY_BORDER[action.priority]}` }}>
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md flex-shrink-0 mt-0.5"
                    style={{ background: PRIORITY_COLOR[action.priority] + "25", color: PRIORITY_COLOR[action.priority], border: `1px solid ${PRIORITY_COLOR[action.priority]}40` }}>
                    {action.priority}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{action.title}</div>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>{action.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 4. What to Tell Your Doctor ── */}
      {doctor_notes.length > 0 && (
        <div className="px-6 max-w-3xl mx-auto mb-6">
          <h2 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
            🩺 What to Tell Your Doctor
          </h2>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
                  {["Drug / Class", "Gene", "What to Say"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: "var(--muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {doctor_notes.map((note, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "var(--card)" : "transparent" }}>
                    <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{note.drug}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}>
                        {note.gene}{note.star_allele ? ` ${note.star_allele}` : ""}
                      </span>
                    </td>
                    <td className="px-4 py-3 leading-relaxed" style={{ color: "var(--muted)" }}>{note.what_to_say}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--muted)" }}>
            Print this table and bring it to your next appointment.
          </p>
        </div>
      )}

      {/* ── 5. Detailed Findings (collapsed accordion) ── */}
      <div className="px-6 max-w-3xl mx-auto mb-6">
        <button
          onClick={() => setExpandedDetails(v => !v)}
          className="w-full flex items-center justify-between px-5 py-4 rounded-xl text-left"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
            Detailed Findings — {summary.conditions_evaluated} conditions analysed
          </span>
          <span style={{ color: "var(--muted)", fontSize: "11px" }}>{expandedDetails ? "▲ collapse" : "▼ expand"}</span>
        </button>

        {expandedDetails && (
          <div className="mt-2 space-y-2">
            {disease_risks.map(risk => (
              <div key={risk.condition_key}
                className="rounded-xl overflow-hidden cursor-pointer"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                onClick={() => setExpandedDisease(expandedDisease === risk.condition_key ? null : risk.condition_key)}>
                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{risk.condition}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                      {risk.evidence_grade} evidence · {risk.method === "prs" ? "Polygenic" : "Monogenic"}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-bold" style={{ color: TIER_COLOR[risk.risk_tier] }}>
                        {risk.lifetime_risk_pct}%
                      </div>
                      <div className="text-xs" style={{ color: "var(--muted)" }}>vs {risk.population_avg_pct}% avg</div>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-md"
                      style={{ background: TIER_COLOR[risk.risk_tier] + "20", color: TIER_COLOR[risk.risk_tier] }}>
                      {TIER_LABEL[risk.risk_tier]}
                    </span>
                    <span style={{ color: "var(--muted)", fontSize: "10px" }}>{expandedDisease === risk.condition_key ? "▲" : "▼"}</span>
                  </div>
                </div>
                {expandedDisease === risk.condition_key && (
                  <div className="px-5 pb-4" style={{ borderTop: "1px solid var(--border)" }}>
                    {risk.key_findings.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold mb-1" style={{ color: "var(--muted)" }}>Key Findings</p>
                        <ul className="space-y-1">
                          {risk.key_findings.map((f, i) => (
                            <li key={i} className="text-xs" style={{ color: "var(--foreground)" }}>• {f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {risk.prs_percentile !== undefined && (
                      <p className="mt-3 text-xs" style={{ color: "var(--muted)" }}>
                        Polygenic risk percentile: <strong style={{ color: "var(--foreground)" }}>{risk.prs_percentile}th</strong>
                        {risk.coverage_pct !== undefined && ` · ${risk.coverage_pct}% of variants found in your file`}
                      </p>
                    )}
                    {risk.note && (
                      <p className="mt-2 text-xs italic" style={{ color: "var(--muted)" }}>{risk.note}</p>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Variant details sub-accordion */}
            {variant_table.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={() => setExpandedVariants(v => !v)}
                  className="w-full flex items-center justify-between px-5 py-3 rounded-xl"
                  style={{ background: "var(--card-alt)", border: "1px solid var(--border)" }}>
                  <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
                    Live Variant Table — {variant_table.length} variants enriched from 4 databases
                  </span>
                  <span style={{ color: "var(--muted)", fontSize: "10px" }}>{expandedVariants ? "▲" : "▼"}</span>
                </button>

                {expandedVariants && (
                  <div className="mt-2 rounded-xl overflow-x-auto" style={{ border: "1px solid var(--border)" }}>
                    <table className="w-full text-xs min-w-[640px]">
                      <thead>
                        <tr style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
                          {["rsID", "Genotype", "Gene", "Condition", "Clinical Sig.", "gnomAD freq", "GWAS Traits"].map(h => (
                            <th key={h} className="text-left px-3 py-3 font-semibold whitespace-nowrap" style={{ color: "var(--muted)" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {variant_table.map((row, i) => {
                          const sigColor = CLIN_SIG_COLOR[row.clinical_significance] || "var(--muted)";
                          return (
                            <tr key={row.rsid} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "var(--card)" : "transparent" }}>
                              <td className="px-3 py-2 font-mono" style={{ color: "var(--accent)" }}>{row.rsid}</td>
                              <td className="px-3 py-2 font-mono font-bold" style={{ color: "var(--foreground)" }}>{row.genotype}</td>
                              <td className="px-3 py-2 font-semibold" style={{ color: "var(--foreground)" }}>{row.gene || "—"}</td>
                              <td className="px-3 py-2 max-w-[150px] truncate" style={{ color: "var(--muted)" }} title={row.condition}>{row.condition || "—"}</td>
                              <td className="px-3 py-2">
                                {row.clinical_significance
                                  ? <span className="px-1.5 py-0.5 rounded text-xs font-medium" style={{ background: sigColor + "20", color: sigColor }}>{row.clinical_significance}</span>
                                  : <span style={{ color: "var(--muted)" }}>—</span>
                                }
                              </td>
                              <td className="px-3 py-2">
                                {row.gnomad_af !== null && row.gnomad_af !== undefined ? (
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                                      <div className="h-full rounded-full" style={{ width: `${Math.min(100, row.gnomad_af * 500)}%`, background: "var(--accent)" }} />
                                    </div>
                                    <span style={{ color: "var(--muted)" }}>{formatFreq(row.gnomad_af)}</span>
                                  </div>
                                ) : <span style={{ color: "var(--muted)" }}>—</span>}
                              </td>
                              <td className="px-3 py-2">
                                {row.gwas_traits.length > 0
                                  ? <span style={{ color: "var(--muted)" }} title={row.gwas_traits.join(", ")}>{row.gwas_traits[0]}{row.gwas_traits.length > 1 ? ` +${row.gwas_traits.length - 1}` : ""}</span>
                                  : <span style={{ color: "var(--muted)" }}>—</span>
                                }
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── 6. Protective Findings ── */}
      {protective.length > 0 && (
        <div className="px-6 max-w-3xl mx-auto mb-6">
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--foreground)" }}>✦ Protective Findings</h2>
          <div className="rounded-xl p-4 space-y-2"
            style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.2)" }}>
            {protective.map(r => (
              <div key={r.condition_key} className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{r.condition}</span>
                  <span className="text-xs ml-2" style={{ color: "#22c55e" }}>
                    {r.lifetime_risk_pct}% vs {r.population_avg_pct}% population avg
                  </span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
                  BELOW AVG
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Disclaimer ── */}
      <div className="px-6 max-w-3xl mx-auto">
        <div className="p-4 rounded-xl text-xs text-center"
          style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>
          {disclaimer}
        </div>
      </div>
    </main>
  );
}
