export default function VirtuousLoop() {
  const labels = [
    { x: 250, y: 22, t: "Ship a test" },
    { x: 420, y: 165, t: "Find a winner" },
    { x: 250, y: 296, t: "Lower your CAC" },
    { x: 80, y: 165, t: "More to spend" },
  ];
  return (
    <svg viewBox="0 0 500 320" className="h-64 w-full" aria-hidden>
      <defs>
        <linearGradient id="loop-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-purple)" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" />
        </linearGradient>
        <radialGradient id="loop-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--color-purple)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-purple)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow backdrop */}
      <circle cx="250" cy="160" r="120" fill="url(#loop-glow)" />

      {/* Background ring (thicker) */}
      <circle
        cx="250"
        cy="160"
        r="110"
        fill="none"
        stroke="rgba(124,90,236,0.18)"
        strokeWidth="3"
      />

      {/* Animated traveling arc (thicker) */}
      <circle
        cx="250"
        cy="160"
        r="110"
        fill="none"
        stroke="url(#loop-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="0.28 0.72"
        className="loop-travel"
      />

      {/* Nodes (bigger) */}
      {labels.map((l, i) => {
        const angle = (i * 90 - 90) * (Math.PI / 180);
        const cx = 250 + 110 * Math.cos(angle);
        const cy = 160 + 110 * Math.sin(angle);
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r="10"
              fill="var(--color-purple)"
              className="loop-node"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
            <circle
              cx={cx}
              cy={cy}
              r="4"
              fill="white"
            />
            <text
              x={l.x}
              y={l.y}
              textAnchor="middle"
              className="fill-[var(--color-text)] text-[13px] font-semibold"
              style={{ fontFamily: "inherit" }}
            >
              {l.t}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
