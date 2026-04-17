export default function ABTestBars() {
  return (
    <svg viewBox="0 0 400 200" className="h-48 w-full" aria-hidden>
      {/* Axis baseline */}
      <line x1="50" y1="170" x2="350" y2="170" stroke="rgba(124,90,236,0.2)" strokeWidth="1.5" />

      {/* Bar A (Control) */}
      <g>
        <rect
          x="100"
          y="100"
          width="70"
          height="70"
          rx="4"
          fill="rgba(124,90,236,0.35)"
          className="ab-bar-a"
        />
        <text x="135" y="190" textAnchor="middle" className="fill-[var(--color-text-muted)] text-[11px] font-medium">
          Control
        </text>
      </g>

      {/* Bar B (Winner) */}
      <g>
        <rect
          x="230"
          y="40"
          width="70"
          height="130"
          rx="4"
          fill="url(#ab-grad)"
          className="ab-bar-b"
        />
        <text x="265" y="190" textAnchor="middle" className="fill-[var(--color-purple)] text-[11px] font-semibold">
          Variant
        </text>

        {/* Check badge */}
        <g className="ab-check" style={{ transformOrigin: "265px 25px" }}>
          <circle cx="265" cy="25" r="14" fill="var(--color-purple)" />
          <path
            d="M258 25 L263 30 L272 21"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>

      <defs>
        <linearGradient id="ab-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-purple)" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
