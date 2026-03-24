/**
 * Allela logo — the "ll" is rendered as a DNA double-helix ladder.
 * Two parallel backbone strands with four angled base-pair rungs
 * that alternate direction to suggest the characteristic helix twist.
 */

interface LogoProps {
  /** Height in px — width scales proportionally. Defaults to 22. */
  size?: number;
  /** CSS color for the backbone strands. Defaults to currentColor. */
  color?: string;
  /** Extra className for the outer <span>. */
  className?: string;
  style?: React.CSSProperties;
}

/** DNA "ll" — two backbone strands + four alternating base-pair rungs */
function DnaLL({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  // All values are proportional to `size`
  const W  = size * 0.82;    // total SVG width
  const H  = size;           // total SVG height
  const lx = size * 0.16;   // left backbone x
  const rx = size * 0.66;   // right backbone x
  const sw = size * 0.115;  // backbone stroke-width
  const rw = size * 0.085;  // rung stroke-width

  // Four rungs: y-centre, leftY offset, rightY offset, color
  // Alternating tilt creates the helix twist feel
  const rungs: [number, number, number, string][] = [
    [size * 0.20, -size * 0.05,  size * 0.05,  "#6366f1"],   // tilts ↙↗
    [size * 0.41,  size * 0.05, -size * 0.05,  "#a855f7"],   // tilts ↘↖
    [size * 0.62, -size * 0.05,  size * 0.05,  "#6366f1"],   // tilts ↙↗
    [size * 0.83,  size * 0.05, -size * 0.05,  "#a855f7"],   // tilts ↘↖
  ];

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
      aria-hidden="true"
    >
      {/* ── Left backbone ── */}
      <line
        x1={lx} y1={size * 0.02}
        x2={lx} y2={size * 0.98}
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* ── Right backbone ── */}
      <line
        x1={rx} y1={size * 0.02}
        x2={rx} y2={size * 0.98}
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* ── Base-pair rungs ── */}
      {rungs.map(([cy, ly, ry, stroke], i) => (
        <line
          key={i}
          x1={lx}    y1={cy + ly}
          x2={rx}    y2={cy + ry}
          stroke={stroke}
          strokeWidth={rw}
          strokeLinecap="round"
        />
      ))}
      {/* ── Nucleotide dots at rung endpoints ── */}
      {rungs.map(([cy, ly, ry, stroke], i) => (
        <g key={`dot-${i}`}>
          <circle cx={lx} cy={cy + ly} r={rw * 1.1} fill={stroke} opacity={0.9} />
          <circle cx={rx} cy={cy + ry} r={rw * 1.1} fill={stroke} opacity={0.9} />
        </g>
      ))}
    </svg>
  );
}

export default function Logo({ size = 22, color = "currentColor", className = "", style }: LogoProps) {
  const fontSize = size;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontWeight: 700,
        fontSize,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        userSelect: "none",
        ...style,
      }}
    >
      <span style={{ color }}>a</span>
      <DnaLL size={size * 1.15} color={color} />
      <span style={{ color }}>ela</span>
    </span>
  );
}
