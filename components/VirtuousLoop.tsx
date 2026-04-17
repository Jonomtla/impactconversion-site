export default function VirtuousLoop() {
  // Larger viewBox, cleaner labels inside the ring
  const labels = [
    { angle: -90, t: "Ship", sub: "a test" },
    { angle: 0, t: "Find", sub: "a winner" },
    { angle: 90, t: "Lower", sub: "CAC" },
    { angle: 180, t: "More", sub: "to spend" },
  ];
  const cx = 250;
  const cy = 160;
  const r = 100;
  return (
    <svg viewBox="0 0 500 320" className="h-56 w-full" aria-hidden>
      <defs>
        <linearGradient id="loop-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-purple)" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" />
        </linearGradient>
        <radialGradient id="loop-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--color-purple)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-purple)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow backdrop */}
      <circle cx={cx} cy={cy} r="140" fill="url(#loop-glow)" />

      {/* Background ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(124,90,236,0.18)" strokeWidth="3" />

      {/* Animated traveling arc */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="url(#loop-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="0.3 0.7"
        className="loop-travel"
      />

      {/* Center label */}
      <text x={cx} y={cy - 6} textAnchor="middle" className="fill-[var(--color-purple)] text-[14px] font-bold uppercase tracking-[0.18em]">
        Compound
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" className="fill-[var(--color-text-muted)] text-[11px] font-medium uppercase tracking-wider">
        loop
      </text>

      {/* Nodes + external labels */}
      {labels.map((l, i) => {
        const rad = (l.angle * Math.PI) / 180;
        const nx = cx + r * Math.cos(rad);
        const ny = cy + r * Math.sin(rad);
        // Label position — push outward from node
        const lx = cx + (r + 50) * Math.cos(rad);
        const ly = cy + (r + 50) * Math.sin(rad);
        return (
          <g key={i}>
            <circle cx={nx} cy={ny} r="11" fill="var(--color-purple)" className="loop-node" style={{ animationDelay: `${i * 0.5}s` }} />
            <circle cx={nx} cy={ny} r="4" fill="white" />
            <text
              x={lx}
              y={ly - 2}
              textAnchor="middle"
              className="fill-[var(--color-text)] text-[14px] font-bold"
            >
              {l.t}
            </text>
            <text
              x={lx}
              y={ly + 14}
              textAnchor="middle"
              className="fill-[var(--color-text-muted)] text-[12px] font-medium"
            >
              {l.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
