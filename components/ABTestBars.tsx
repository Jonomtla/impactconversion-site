export default function ABTestBars() {
  return (
    <svg viewBox="0 0 400 260" className="h-64 w-full" aria-hidden>
      <defs>
        <linearGradient id="ab-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-purple)" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" />
        </linearGradient>
        <linearGradient id="ab-grad-a" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="rgba(124,90,236,0.25)" />
          <stop offset="100%" stopColor="rgba(124,90,236,0.5)" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      <line x1="40" y1="220" x2="360" y2="220" stroke="rgba(124,90,236,0.2)" strokeWidth="2" />
      <line x1="40" y1="170" x2="360" y2="170" stroke="rgba(124,90,236,0.08)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="40" y1="120" x2="360" y2="120" stroke="rgba(124,90,236,0.08)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="40" y1="70" x2="360" y2="70" stroke="rgba(124,90,236,0.08)" strokeWidth="1" strokeDasharray="4 4" />

      {/* Bar A (Control) — thicker */}
      <g>
        <rect
          x="80"
          y="130"
          width="110"
          height="90"
          rx="6"
          fill="url(#ab-grad-a)"
          stroke="rgba(124,90,236,0.4)"
          strokeWidth="1.5"
          className="ab-bar-a"
        />
        <text x="135" y="245" textAnchor="middle" className="fill-[var(--color-text-muted)] text-[13px] font-semibold uppercase tracking-wider">
          Control
        </text>
        <text x="135" y="118" textAnchor="middle" className="fill-[var(--color-text-muted)] text-[14px] font-bold">
          2.1%
        </text>
      </g>

      {/* Bar B (Winner) — thicker */}
      <g>
        <rect
          x="210"
          y="50"
          width="110"
          height="170"
          rx="6"
          fill="url(#ab-grad)"
          className="ab-bar-b"
        />
        <text x="265" y="245" textAnchor="middle" className="fill-[var(--color-purple)] text-[13px] font-bold uppercase tracking-wider">
          Variant
        </text>
        <text x="265" y="38" textAnchor="middle" className="fill-[var(--color-purple)] text-[14px] font-bold">
          3.4%
        </text>

        {/* Winner badge — bigger */}
        <g className="ab-check" style={{ transformOrigin: "330px 50px" }}>
          <circle cx="330" cy="50" r="20" fill="var(--color-purple)" />
          <path
            d="M321 50 L328 57 L340 44"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>

      {/* Confidence label */}
      <text x="200" y="20" textAnchor="middle" className="fill-[var(--color-purple)] text-[11px] font-semibold uppercase tracking-[0.2em]">
        95% confidence
      </text>
    </svg>
  );
}
