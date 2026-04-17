export default function ABTestBars() {
  return (
    <svg viewBox="0 0 400 240" className="h-56 w-full" aria-hidden>
      <defs>
        <linearGradient id="ab-grad-b" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-purple)" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" />
        </linearGradient>
        <linearGradient id="ab-grad-a" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="rgba(124,90,236,0.2)" />
          <stop offset="100%" stopColor="rgba(124,90,236,0.45)" />
        </linearGradient>
      </defs>

      {/* Confidence label pill */}
      <g>
        <rect x="140" y="8" width="120" height="24" rx="12" fill="rgba(124,90,236,0.1)" />
        <text x="200" y="25" textAnchor="middle" className="fill-[var(--color-purple)] text-[12px] font-bold uppercase tracking-[0.16em]">
          95% confidence
        </text>
      </g>

      {/* Grid lines */}
      <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(124,90,236,0.22)" strokeWidth="2" />
      <line x1="50" y1="150" x2="350" y2="150" stroke="rgba(124,90,236,0.08)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="50" y1="100" x2="350" y2="100" stroke="rgba(124,90,236,0.08)" strokeWidth="1" strokeDasharray="4 4" />

      {/* Bar A — Control */}
      <g>
        <rect
          x="90"
          y="120"
          width="100"
          height="80"
          rx="6"
          fill="url(#ab-grad-a)"
          stroke="rgba(124,90,236,0.4)"
          strokeWidth="1.5"
          className="ab-bar-a"
        />
        <text x="140" y="112" textAnchor="middle" className="fill-[var(--color-text)] text-[16px] font-bold">
          2.1%
        </text>
        <text x="140" y="222" textAnchor="middle" className="fill-[var(--color-text-muted)] text-[13px] font-bold uppercase tracking-wider">
          Control
        </text>
      </g>

      {/* Bar B — Variant */}
      <g>
        <rect
          x="210"
          y="60"
          width="100"
          height="140"
          rx="6"
          fill="url(#ab-grad-b)"
          className="ab-bar-b"
        />
        <text x="260" y="52" textAnchor="middle" className="fill-[var(--color-purple)] text-[16px] font-bold">
          3.4%
        </text>
        <text x="260" y="222" textAnchor="middle" className="fill-[var(--color-purple)] text-[13px] font-bold uppercase tracking-wider">
          Variant
        </text>

        {/* Winner badge */}
        <g className="ab-check" style={{ transformOrigin: "330px 60px" }}>
          <circle cx="330" cy="60" r="18" fill="var(--color-purple)" />
          <path
            d="M321 60 L328 67 L340 54"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}
