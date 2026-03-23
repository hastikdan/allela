import Link from "next/link";

const conditions = [
  "Alzheimer's Disease", "Type 2 Diabetes", "Coronary Artery Disease",
  "Breast Cancer", "Venous Thromboembolism", "Parkinson's Disease",
  "Celiac Disease", "Atrial Fibrillation", "Hemochromatosis", "Prostate Cancer",
];

const pgxDrugs = [
  "SSRIs & Antidepressants", "Statins", "Clopidogrel (antiplatelet)", "Warfarin",
];

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <span className="text-xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
          allela
        </span>
        <Link
          href="/upload"
          className="text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Get Report →
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-6"
          style={{ background: "var(--accent-glow)", color: "var(--accent)", border: "1px solid var(--accent)" }}
        >
          Privacy-first · One-time fee · No account required
        </div>
        <h1 className="text-5xl font-bold leading-tight mb-6" style={{ color: "var(--foreground)" }}>
          Your DNA file.<br />Your health picture.
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: "var(--muted)" }}>
          Upload your raw data from 23andMe or AncestryDNA. Get a prioritized, plain-English
          risk report for 10+ conditions — scored against 30+ published genetic studies.
          We analyse and immediately delete your file. You get the insights, not the exposure.
        </p>
        <Link
          href="/upload"
          className="inline-block text-lg font-bold px-8 py-4 rounded-xl transition-all hover:opacity-90"
          style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 0 30px var(--accent-glow)" }}
        >
          Upload your DNA file — $49
        </Link>
        <p className="text-xs mt-4" style={{ color: "var(--muted)" }}>
          Accepts 23andMe · AncestryDNA · MyHeritage raw data export files
        </p>
      </section>

      {/* What you get */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-12" style={{ color: "var(--foreground)" }}>
          What your report covers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Disease risk */}
          <div className="p-6 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="text-2xl mb-3">🧬</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "var(--foreground)" }}>Disease Risk Scores</h3>
            <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
              Lifetime probability estimates for {conditions.length} conditions, ranked by risk tier and evidence strength.
            </p>
            <div className="flex flex-wrap gap-2">
              {conditions.map(c => (
                <span key={c} className="text-xs px-2 py-1 rounded-md" style={{ background: "var(--border)", color: "var(--muted)" }}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* PGx */}
          <div className="p-6 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="text-2xl mb-3">💊</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "var(--foreground)" }}>Medication Response</h3>
            <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
              Pharmacogenomics: how your genes affect how you metabolize common drug classes.
            </p>
            <div className="flex flex-wrap gap-2">
              {pgxDrugs.map(d => (
                <span key={d} className="text-xs px-2 py-1 rounded-md" style={{ background: "var(--border)", color: "var(--muted)" }}>
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="p-8 rounded-2xl text-center" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="text-3xl mb-4">🔒</div>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--foreground)" }}>Your DNA stays yours</h2>
          <p style={{ color: "var(--muted)" }} className="max-w-xl mx-auto text-sm leading-relaxed">
            Your raw file is parsed in memory and immediately discarded — never written to disk, never stored in our database.
            Only your derived risk scores are saved, and only to generate your report.
            No account. No data broker. No 23andMe-style bankruptcy risk.
          </p>
        </div>
      </section>

      {/* Sample report card */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "var(--foreground)" }}>
          Sample report output
        </h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <div className="px-6 py-4" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
            <span className="text-sm font-semibold" style={{ color: "var(--muted)" }}>Risk Report Preview</span>
          </div>
          {[
            { condition: "Alzheimer's Disease", yours: "28%", pop: "9%", tier: "elevated", evidence: "Strong" },
            { condition: "Type 2 Diabetes", yours: "34%", pop: "11%", tier: "elevated", evidence: "Strong" },
            { condition: "Coronary Artery Disease", yours: "8%", pop: "10%", tier: "average", evidence: "Moderate" },
            { condition: "Venous Thromboembolism", yours: "0.9%", pop: "1%", tier: "average", evidence: "Strong" },
          ].map((r) => (
            <div
              key={r.condition}
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid var(--border)", background: "var(--card)" }}
            >
              <div>
                <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{r.condition}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Evidence: {r.evidence}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className={`text-lg font-bold risk-${r.tier}`}>{r.yours}</div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>vs {r.pop} avg</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-md badge-${r.tier}`}>
                  {r.tier}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Ready to know your risks?</h2>
        <p className="mb-8" style={{ color: "var(--muted)" }}>One-time $49. Report ready in under 2 minutes. No account needed.</p>
        <Link
          href="/upload"
          className="inline-block text-lg font-bold px-8 py-4 rounded-xl transition-all hover:opacity-90"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Get Your Report →
        </Link>
        <p className="text-xs mt-4" style={{ color: "var(--muted)" }}>
          Educational/informational only — not medical advice. Consult your physician for clinical guidance.
        </p>
      </section>
    </main>
  );
}
