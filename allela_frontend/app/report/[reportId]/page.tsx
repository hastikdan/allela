"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type RiskTier = "high" | "elevated" | "average" | "below_average";

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

interface Scores {
  disease_risks: DiseaseRisk[];
  pharmacogenomics: PGxFinding[];
  summary: {
    conditions_evaluated: number;
    high_risk_count: number;
    elevated_risk_count: number;
    pgx_findings_count: number;
  };
  disclaimer: string;
}

interface Report {
  report_id: string;
  format_detected: string;
  snp_count: number;
  scores: Scores;
  created_at: string;
}

const TIER_LABEL: Record<RiskTier, string> = {
  high: "HIGH",
  elevated: "ELEVATED",
  average: "AVERAGE",
  below_average: "BELOW AVG",
};

export default function ReportPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const reportId = params.reportId as string;
  const sessionId = searchParams.get("session_id");

  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

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
          style={{ background: "var(--accent)", color: "#fff" }}>
          Upload & Pay →
        </a>
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
  const { disease_risks, pharmacogenomics, summary } = scores;

  return (
    <main className="min-h-screen pb-20" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div className="px-6 py-8 max-w-3xl mx-auto">
        <a href="/" className="text-lg font-bold tracking-tight" style={{ color: "var(--foreground)" }}>allela</a>
        <div className="mt-8 mb-2 flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Your DNA Risk Report</h1>
          <span className="text-xs px-2 py-1 rounded-md" style={{ background: "var(--border)", color: "var(--muted)" }}>
            {report.format_detected} · {report.snp_count?.toLocaleString()} SNPs
          </span>
        </div>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {new Date(report.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        {/* Summary bar */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { label: "Conditions", value: summary.conditions_evaluated },
            { label: "High/Elevated", value: summary.high_risk_count + summary.elevated_risk_count, color: summary.high_risk_count > 0 ? "#ef4444" : "#f97316" },
            { label: "PGx findings", value: summary.pgx_findings_count },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="text-2xl font-bold" style={{ color: s.color || "var(--accent)" }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Disease risks */}
      <div className="px-6 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>Disease Risk Scores</h2>
        <div className="space-y-2">
          {disease_risks.map(risk => (
            <div key={risk.condition_key}
              className="rounded-xl overflow-hidden cursor-pointer"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              onClick={() => setExpanded(expanded === risk.condition_key ? null : risk.condition_key)}>
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{risk.condition}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                      {risk.evidence_grade} evidence · {risk.method === "prs" ? "Polygenic" : "Monogenic"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-xl font-bold risk-${risk.risk_tier}`}>
                      {risk.lifetime_risk_pct}%
                    </div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>
                      vs {risk.population_avg_pct}% avg
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md badge-${risk.risk_tier}`}>
                    {TIER_LABEL[risk.risk_tier]}
                  </span>
                  <span style={{ color: "var(--muted)", fontSize: "10px" }}>{expanded === risk.condition_key ? "▲" : "▼"}</span>
                </div>
              </div>

              {expanded === risk.condition_key && (
                <div className="px-5 pb-4 pt-0" style={{ borderTop: "1px solid var(--border)" }}>
                  {risk.key_findings.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>Key Findings</p>
                      <ul className="space-y-1">
                        {risk.key_findings.map((f, i) => (
                          <li key={i} className="text-xs" style={{ color: "var(--foreground)" }}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {risk.prs_percentile !== undefined && (
                    <div className="mt-3">
                      <p className="text-xs" style={{ color: "var(--muted)" }}>
                        Polygenic Risk Percentile: <span style={{ color: "var(--foreground)" }}>{risk.prs_percentile}th</span>
                        {risk.coverage_pct !== undefined && ` · ${risk.coverage_pct}% of variants found in your file`}
                      </p>
                    </div>
                  )}
                  {risk.note && (
                    <p className="mt-3 text-xs italic" style={{ color: "var(--muted)" }}>{risk.note}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PGx */}
      {pharmacogenomics.length > 0 && (
        <div className="px-6 max-w-3xl mx-auto mt-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>Medication Response (Pharmacogenomics)</h2>
          <div className="space-y-3">
            {pharmacogenomics.map(pgx => (
              <div key={pgx.rsid} className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                      {pgx.gene}{pgx.star_allele && ` ${pgx.star_allele}`} — {pgx.zygosity}
                    </div>
                    <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{pgx.effect}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {pgx.drug_classes.map(d => (
                        <span key={d} className="text-xs px-2 py-0.5 rounded-md"
                          style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-xs p-3 rounded-lg" style={{ background: "#0a0a0f", color: "var(--foreground)" }}>
                  <strong>Clinical guidance:</strong> {pgx.clinical_guidance}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="px-6 max-w-3xl mx-auto mt-10">
        <div className="p-4 rounded-xl text-xs text-center" style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>
          {scores.disclaimer}
        </div>
      </div>
    </main>
  );
}
