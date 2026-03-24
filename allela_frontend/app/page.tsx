import Link from "next/link";
import Logo from "./components/Logo";

// ── Data ────────────────────────────────────────────────────────────────────

const reportSections = [
  {
    icon: "🧬",
    title: "Disease Risk Scores",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.07)",
    border: "rgba(99,102,241,0.20)",
    description:
      "Lifetime probability estimates for 13 conditions — ranked by risk tier, scored against 40+ published GWAS studies.",
    tags: [
      "Alzheimer's Disease", "Type 2 Diabetes", "Coronary Artery Disease",
      "Breast Cancer", "Parkinson's Disease", "Atrial Fibrillation",
      "Venous Thromboembolism", "Celiac Disease", "Hemochromatosis",
      "Prostate Cancer", "Macular Degeneration", "Osteoporosis", "IBD",
    ],
  },
  {
    icon: "💊",
    title: "Medication Response (PGx)",
    color: "#f97316",
    bg: "rgba(249,115,22,0.07)",
    border: "rgba(249,115,22,0.20)",
    description:
      "Know before you take. How your genes affect metabolism of 8+ drug classes — critical before any cardiac, pain, or psychiatric prescription.",
    tags: ["Clopidogrel", "Warfarin", "Statins", "SSRIs", "TCAs", "Codeine", "NSAIDs", "PPIs"],
  },
  {
    icon: "🧪",
    title: "Carrier Status",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.07)",
    border: "rgba(245,158,11,0.20)",
    description:
      "Are you carrying recessive disease variants? Essential if you're planning a family — checked against 6 serious inherited conditions.",
    tags: ["Cystic Fibrosis", "Sickle Cell Anemia", "Tay-Sachs", "Gaucher Disease", "Hearing Loss", "CFTR G542X"],
  },
  {
    icon: "🥑",
    title: "Nutrition & Metabolism",
    color: "#10b981",
    bg: "rgba(16,185,129,0.07)",
    border: "rgba(16,185,129,0.20)",
    description:
      "Stop guessing what diet works for you. Your DNA reveals how you process lactose, caffeine, folate, omega-3, vitamin D, and alcohol.",
    tags: ["Lactose Tolerance", "Caffeine Metabolism", "MTHFR / Folate", "Vitamin D", "Omega-3 Conversion", "Alcohol Flush"],
  },
  {
    icon: "🏃",
    title: "Genetic Traits",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.07)",
    border: "rgba(139,92,246,0.20)",
    description:
      "Physical, athletic, and behavioural tendencies baked into your genome — from muscle fibre composition to sleep chronotype.",
    tags: ["Eye Color", "Muscle Fiber Type", "Sleep Chronotype", "Earwax Type", "Red Hair Risk", "Hair Loss Risk"],
  },
];

const useCases = [
  {
    emoji: "👩‍👧",
    persona: "Planning a Family",
    headline: "\"Are we both carriers of the same thing?\"",
    detail:
      "Before IVF or pregnancy, couples want to know if they carry recessive variants for CF, Sickle Cell, or Tay-Sachs. A single report tells you in minutes — no clinic visit, no waiting weeks.",
    accent: "#f59e0b",
  },
  {
    emoji: "💊",
    persona: "Starting a New Medication",
    headline: "\"Will this drug actually work for me?\"",
    detail:
      "Before your doctor writes a clopidogrel, SSRI, or statin prescription, know if your CYP2C19, CYP2D6, or SLCO1B1 genotype means you'll metabolise it differently. Bring the table to your appointment.",
    accent: "#f97316",
  },
  {
    emoji: "🏋️",
    persona: "Optimising Performance",
    headline: "\"Should I train for endurance or power?\"",
    detail:
      "Your ACTN3, FADS1 (omega-3 conversion), and caffeine metabolism variants tell you what your body is actually built for — and how to fuel it.",
    accent: "#6366f1",
  },
  {
    emoji: "🔬",
    persona: "Ex-23andMe User",
    headline: "\"I already have the raw file. Now what?\"",
    detail:
      "15 million users were left in limbo when 23andMe filed for bankruptcy. You already paid for the genotyping. Allela turns that file into something actionable — in under 2 minutes, with zero data re-exposure.",
    accent: "#10b981",
  },
];

const uniquePoints = [
  {
    icon: "📡",
    title: "Live database cross-referencing",
    body:
      "Your variants are cross-matched in real time against ClinVar, GWAS Catalog, gnomAD, and the PGS Catalog — not a static spreadsheet frozen in 2022. When research updates, your next report reflects it.",
    color: "#6366f1",
  },
  {
    icon: "🏗️",
    title: "Five report layers in one",
    body:
      "Most tools give you one thing: disease risk OR pharmacogenomics OR carrier status. Allela does all five — disease risk, drug response, carrier status, nutrition, and traits — from a single file upload.",
    color: "#f97316",
  },
  {
    icon: "🎯",
    title: "Actionable, not just informational",
    body:
      "Every elevated finding generates a Priority Action: what to tell your doctor, what test to order, what supplement to take. The report is designed to change behaviour, not just satisfy curiosity.",
    color: "#10b981",
  },
  {
    icon: "🔐",
    title: "Zero DNA retention architecture",
    body:
      "Your raw file is parsed in memory and deleted in the same request. We store only derived risk scores — never your genotype sequence. A data breach at Allela cannot expose your DNA.",
    color: "#f59e0b",
  },
];

const stats = [
  { value: "600k+", label: "SNPs analysed per report" },
  { value: "13", label: "Disease conditions covered" },
  { value: "40+", label: "Published GWAS studies" },
  { value: "< 2 min", label: "Report generation time" },
  { value: "0", label: "DNA files stored" },
  { value: "5", label: "Report sections" },
];

const sampleRows = [
  { condition: "Alzheimer's Disease", yours: "28%", pop: "9%", tier: "elevated", evidence: "Strong" },
  { condition: "Type 2 Diabetes",     yours: "34%", pop: "11%", tier: "elevated", evidence: "Strong" },
  { condition: "Coronary Artery Disease", yours: "8%", pop: "10%", tier: "average", evidence: "Moderate" },
  { condition: "Venous Thromboembolism",  yours: "0.9%", pop: "1%", tier: "average", evidence: "Strong" },
];

// ── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>

      {/* ── Nav ── */}
      <nav style={{ background: "rgba(255,255,255,0.85)", borderBottom: "1px solid var(--border)", backdropFilter: "blur(8px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <Logo size={22} />
          <div className="flex items-center gap-4">
            <a href="#how-it-works" className="text-sm hidden sm:block" style={{ color: "var(--muted)" }}>How it works</a>
            <a href="#use-cases" className="text-sm hidden sm:block" style={{ color: "var(--muted)" }}>Use cases</a>
            <Link href="/upload"
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90"
              style={{ background: "var(--accent)", color: "#fff" }}>
              Get Report →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero-gradient px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(99,102,241,0.10)", color: "var(--accent)", border: "1px solid rgba(99,102,241,0.25)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            Privacy-first · One-time $49 · No account · DNA deleted immediately
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6" style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}>
            Your 23andMe file contains<br />
            <span style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              answers you haven't read yet
            </span>
          </h1>

          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--muted)" }}>
            Upload your raw DNA export. In under 2 minutes, get a clinically-informed report covering disease risks,
            drug responses, carrier status, nutrition genetics, and physical traits —
            scored against 40+ published studies, enriched live from four global databases.
          </p>

          <Link href="/upload"
            className="inline-block text-lg font-bold px-10 py-4 rounded-xl transition-all hover:opacity-90 card-shadow-lg"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}>
            Analyse my DNA file — $49
          </Link>
          <p className="text-xs mt-4" style={{ color: "var(--muted-light)" }}>
            Accepts 23andMe · AncestryDNA · MyHeritage · raw .txt/.csv export files
          </p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ background: "#fff", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-3 md:grid-cols-6 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold" style={{ color: "var(--accent)" }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The problem ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>The problem</div>
            <h2 className="text-3xl font-bold mb-5 leading-tight" style={{ color: "var(--foreground)" }}>
              15 million people have a raw DNA file that's doing nothing
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              When 23andMe filed for bankruptcy in 2025, it left millions of users holding a goldmine of
              genetic data with nowhere to use it. The only real alternative — Promethease — outputs a
              raw data dump that requires a biology degree to interpret.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
              Allela was built for the gap: a beautiful, plain-English report that translates your genome
              into action — without storing a single base pair.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: "Promethease", note: "Raw data dump, no prioritization, complex UI", bad: true },
              { label: "23andMe Health", note: "Bankrupt. Limited conditions. Data sold to Regeneron.", bad: true },
              { label: "Allela", note: "5 report sections, priority actions, zero DNA storage", bad: false },
            ].map(row => (
              <div key={row.label} className="flex items-start gap-4 p-4 rounded-xl card-shadow"
                style={{
                  background: row.bad ? "var(--card-alt)" : "rgba(99,102,241,0.06)",
                  border: `1px solid ${row.bad ? "var(--border)" : "rgba(99,102,241,0.25)"}`,
                }}>
                <span className="text-lg mt-0.5">{row.bad ? "✗" : "✓"}</span>
                <div>
                  <div className="font-semibold text-sm" style={{ color: row.bad ? "var(--muted)" : "var(--foreground)" }}>{row.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted-light)" }}>{row.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why unique ── */}
      <section className="section-alt px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Why Allela is different</div>
            <h2 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              DNA data alone is not insight.<br />
              <span style={{ color: "var(--accent)" }}>Enriched DNA data is.</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto mt-4" style={{ color: "var(--muted)" }}>
              Your raw file contains 600,000+ genotype calls. On their own, those letters mean nothing.
              Allela cross-references every relevant variant in real time against four global databases —
              turning raw data into ranked, actionable findings.
            </p>
          </div>

          {/* Data pipeline visual */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-14 flex-wrap">
            {[
              { label: "Your raw .txt file", sub: "600k+ SNPs", color: "#6366f1", icon: "🧬" },
              { label: "→", color: "transparent", sub: "", icon: "" },
              { label: "ClinVar", sub: "Pathogenic variants", color: "#ef4444", icon: "🔴" },
              { label: "GWAS Catalog", sub: "Trait associations", color: "#f97316", icon: "📊" },
              { label: "PGS Catalog", sub: "Polygenic scores", color: "#8b5cf6", icon: "📈" },
              { label: "gnomAD", sub: "Population frequencies", color: "#10b981", icon: "🌍" },
              { label: "→", color: "transparent", sub: "", icon: "" },
              { label: "Your report", sub: "5 sections, ranked", color: "#6366f1", icon: "✅" },
            ].map((item, i) =>
              item.label === "→" ? (
                <span key={i} className="text-2xl hidden md:block" style={{ color: "var(--muted-light)" }}>→</span>
              ) : (
                <div key={i} className="text-center px-4 py-3 rounded-xl card-shadow"
                  style={{ background: "#fff", border: `2px solid ${item.color}20`, minWidth: 110 }}>
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{item.label}</div>
                  {item.sub && <div className="text-xs mt-0.5" style={{ color: "var(--muted-light)" }}>{item.sub}</div>}
                </div>
              )
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {uniquePoints.map(p => (
              <div key={p.title} className="p-6 rounded-xl card-shadow"
                style={{ background: "#fff", border: "1px solid var(--border)" }}>
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--foreground)" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>What's in your report</div>
          <h2 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>Five sections. One upload. One price.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reportSections.map(s => (
            <div key={s.title} className="p-6 rounded-xl card-shadow"
              style={{ background: "#fff", border: `1px solid ${s.border}` }}>
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-base mb-2" style={{ color: "var(--foreground)" }}>{s.title}</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted)" }}>{s.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.slice(0, 6).map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-md"
                    style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                    {t}
                  </span>
                ))}
                {s.tags.length > 6 && (
                  <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: "var(--card-alt)", color: "var(--muted)" }}>
                    +{s.tags.length - 6} more
                  </span>
                )}
              </div>
            </div>
          ))}
          {/* Filler card */}
          <div className="p-6 rounded-xl flex flex-col items-center justify-center text-center"
            style={{ background: "linear-gradient(135deg, #eef2ff, #fdf4ff)", border: "2px dashed rgba(99,102,241,0.25)", minHeight: 200 }}>
            <div className="text-3xl mb-2">🔮</div>
            <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>Phase 2 coming</p>
            <p className="text-xs mt-2" style={{ color: "var(--muted)" }}>Pharmacogenomics deep-dive add-on + ancestry composition</p>
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section id="use-cases" className="section-alt px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Real use cases</div>
            <h2 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>Who uses Allela — and why</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map(u => (
              <div key={u.persona} className="p-7 rounded-2xl card-shadow"
                style={{ background: "#fff", border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{u.emoji}</span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: u.accent }}>{u.persona}</div>
                    <div className="font-bold text-base mt-0.5" style={{ color: "var(--foreground)" }}>{u.headline}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{u.detail}</p>
                <div className="mt-5">
                  <Link href="/upload" className="text-sm font-semibold" style={{ color: u.accent }}>
                    Get this report →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>How it works</div>
          <h2 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>Three steps. Under two minutes.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              icon: "📤",
              title: "Export your raw file",
              body: "From 23andMe, AncestryDNA, or MyHeritage — go to Settings → Download raw data. It's a .txt file, ~30MB.",
              color: "#6366f1",
            },
            {
              step: "2",
              icon: "⚡",
              title: "Upload & pay once",
              body: "Drop your file and complete the $49 payment. We parse your 600k+ SNPs in memory and cross-reference four live databases.",
              color: "#f97316",
            },
            {
              step: "3",
              icon: "📋",
              title: "Get your report",
              body: "Receive a ranked, plain-English report with Priority Actions. Print the medication table for your doctor. Your file is already gone.",
              color: "#10b981",
            },
          ].map(s => (
            <div key={s.step} className="text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 card-shadow"
                style={{ background: `${s.color}14`, border: `2px solid ${s.color}30` }}>
                {s.icon}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: s.color }}>Step {s.step}</div>
              <h3 className="font-bold text-base mb-2" style={{ color: "var(--foreground)" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Privacy ── */}
      <section className="px-6 py-16" style={{ background: "rgba(16,185,129,0.04)", borderTop: "1px solid rgba(16,185,129,0.15)", borderBottom: "1px solid rgba(16,185,129,0.15)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#10b981" }}>Privacy architecture</div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Zero DNA storage. By design.</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                We engineered Allela around a single non-negotiable rule: your raw genotype sequence is never written
                to disk or stored in any database. Your file is parsed in memory, risk scores are computed, and the
                raw data is discarded in the same server request — before we even save the report.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: "✅", text: "File parsed in-memory only — never written to disk" },
                { icon: "✅", text: "Only derived risk scores saved — not your genotype" },
                { icon: "✅", text: "No account required — report tied to payment ID only" },
                { icon: "✅", text: "A breach at Allela cannot expose your DNA sequence" },
                { icon: "✅", text: "No data broker partnerships, ever" },
              ].map(item => (
                <div key={item.text} className="flex items-start gap-3">
                  <span className="text-base mt-0.5" style={{ color: "#10b981" }}>{item.icon}</span>
                  <span className="text-sm" style={{ color: "var(--foreground)" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sample report ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>See it first</div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Sample report output</h2>
          <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>Real format. Illustrative numbers.</p>
        </div>
        <div className="rounded-2xl overflow-hidden card-shadow" style={{ border: "1px solid var(--border)" }}>
          <div className="px-6 py-4 flex items-center justify-between"
            style={{ background: "var(--card-alt)", borderBottom: "1px solid var(--border)" }}>
            <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Disease Risk Preview</span>
            <span className="text-xs px-2 py-1 rounded-md" style={{ background: "rgba(99,102,241,0.10)", color: "var(--accent)" }}>
              Sample data
            </span>
          </div>
          {sampleRows.map((r, i) => (
            <div key={r.condition} className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: i < sampleRows.length - 1 ? "1px solid var(--border)" : "none", background: "#fff" }}>
              <div>
                <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{r.condition}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--muted-light)" }}>Evidence: {r.evidence}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className={`text-lg font-bold risk-${r.tier}`}>{r.yours}</div>
                  <div className="text-xs" style={{ color: "var(--muted-light)" }}>vs {r.pop} avg</div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md badge-${r.tier}`}>
                  {r.tier.replace("_", " ").toUpperCase()}
                </span>
              </div>
            </div>
          ))}
          <div className="px-6 py-3 flex items-center justify-between gap-2"
            style={{ background: "var(--card-alt)", borderTop: "1px solid var(--border)" }}>
            <span className="text-xs" style={{ color: "var(--muted)" }}>+ Medication response · Carrier status · Nutrition · Traits · Priority actions</span>
            <Link href="/demo" className="text-xs font-semibold whitespace-nowrap" style={{ color: "var(--accent)" }}>
              See full interactive report →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24 text-center hero-gradient">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}>
            Ready to read your genome?
          </h2>
          <p className="text-base mb-10" style={{ color: "var(--muted)" }}>
            One-time $49. Report in under 2 minutes. No account. No data retained.
          </p>
          <Link href="/upload"
            className="inline-block text-lg font-bold px-10 py-4 rounded-xl transition-all hover:opacity-90 card-shadow-lg"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}>
            Upload your DNA file →
          </Link>
          <p className="text-xs mt-4" style={{ color: "var(--muted-light)" }}>
            Educational/informational only — not medical advice. Consult your physician for clinical guidance.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size={20} />
          <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
            © 2026 Allela · Educational use only · Not a medical device · Not FDA evaluated
          </p>
          <Link href="/upload" className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
            Get your report →
          </Link>
        </div>
      </footer>

    </main>
  );
}
