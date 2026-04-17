export default function VirtuousLoop() {
  const labels = [
    { x: 200, y: 28, t: "Ship a test" },
    { x: 360, y: 154, t: "Find a winner" },
    { x: 200, y: 276, t: "Lower your CAC" },
    { x: 40, y: 154, t: "More to spend" },
  ];
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-48 w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="loop-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-purple)" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" />
        </linearGradient>
      </defs>

      {/* Background ring */}
      <circle
        cx="200"
        cy="152"
        r="100"
        fill="none"
        stroke="rgba(124,90,236,0.15)"
        strokeWidth="1.5"
      />

      {/* Animated traveling arc */}
      <circle
        cx="200"
        cy="152"
        r="100"
        fill="none"
        stroke="url(#loop-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="0.22 0.78"
        className="loop-travel"
      />

      {/* Nodes */}
      {labels.map((l, i) => {
        const angle = (i * 90 - 90) * (Math.PI / 180);
        const cx = 200 + 100 * Math.cos(angle);
        const cy = 152 + 100 * Math.sin(angle);
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r="6"
              fill="var(--color-purple)"
              className="loop-node"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
            <text
              x={l.x}
              y={l.y}
              textAnchor="middle"
              className="fill-[var(--color-text)] text-[12px] font-medium"
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
