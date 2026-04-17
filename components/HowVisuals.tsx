export function ResearchVisual() {
  return (
    <svg viewBox="0 0 200 120" className="h-28 w-full" aria-hidden>
      <defs>
        <linearGradient id="r-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-purple)" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" />
        </linearGradient>
      </defs>
      {/* Data rows */}
      <rect x="20" y="25" width="160" height="8" rx="4" fill="rgba(124,90,236,0.1)" />
      <rect x="20" y="45" width="120" height="8" rx="4" fill="rgba(124,90,236,0.1)" />
      <rect x="20" y="65" width="140" height="8" rx="4" fill="rgba(124,90,236,0.1)" />
      <rect x="20" y="85" width="100" height="8" rx="4" fill="rgba(124,90,236,0.1)" />

      {/* Highlighted data pings */}
      <circle cx="80" cy="29" r="5" fill="var(--color-purple)" className="research-ping-1" />
      <circle cx="110" cy="49" r="5" fill="var(--color-accent-warm)" className="research-ping-2" />
      <circle cx="60" cy="69" r="5" fill="var(--color-purple)" className="research-ping-3" />

      {/* Magnifier moving across data */}
      <g className="research-scan" style={{ transformOrigin: "40px 50px" }}>
        <circle cx="40" cy="50" r="18" fill="none" stroke="url(#r-grad)" strokeWidth="3" />
        <line x1="54" y1="64" x2="64" y2="74" stroke="url(#r-grad)" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function PrioritiseVisual() {
  return (
    <svg viewBox="0 0 200 120" className="h-28 w-full" aria-hidden>
      {/* Three ranked cards bubbling up */}
      <g className="sort-item-1">
        <rect x="20" y="60" width="50" height="40" rx="6" fill="var(--color-purple)" />
        <text x="45" y="84" textAnchor="middle" className="fill-white text-[14px] font-bold">1</text>
      </g>
      <g className="sort-item-2">
        <rect x="75" y="60" width="50" height="40" rx="6" fill="rgba(124,90,236,0.5)" />
        <text x="100" y="84" textAnchor="middle" className="fill-white text-[14px] font-bold">2</text>
      </g>
      <g className="sort-item-3">
        <rect x="130" y="60" width="50" height="40" rx="6" fill="rgba(124,90,236,0.25)" />
        <text x="155" y="84" textAnchor="middle" className="fill-[var(--color-purple)] text-[14px] font-bold">3</text>
      </g>
      {/* Arrow up indicator */}
      <path d="M100 20 L100 40 M94 26 L100 20 L106 26" stroke="var(--color-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="100" y="14" textAnchor="middle" className="fill-[var(--color-text-muted)] text-[10px] font-semibold uppercase tracking-wider">
        Impact
      </text>
    </svg>
  );
}

export function TestVisual() {
  return (
    <svg viewBox="0 0 200 120" className="h-28 w-full" aria-hidden>
      <defs>
        <linearGradient id="t-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-purple)" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" />
        </linearGradient>
      </defs>
      {/* Baseline */}
      <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(124,90,236,0.25)" strokeWidth="2" />

      {/* Control */}
      <rect
        x="40"
        y="60"
        width="40"
        height="40"
        rx="4"
        fill="rgba(124,90,236,0.35)"
        className="ab-bar-a"
        style={{ transformOrigin: "60px 100px" }}
      />
      <text x="60" y="115" textAnchor="middle" className="fill-[var(--color-text-muted)] text-[10px] font-semibold">A</text>

      {/* Winner */}
      <rect
        x="120"
        y="30"
        width="40"
        height="70"
        rx="4"
        fill="url(#t-grad)"
        className="ab-bar-b"
        style={{ transformOrigin: "140px 100px" }}
      />
      <text x="140" y="115" textAnchor="middle" className="fill-[var(--color-purple)] text-[10px] font-bold">B</text>

      {/* Winner check */}
      <g className="ab-check" style={{ transformOrigin: "170px 30px" }}>
        <circle cx="170" cy="30" r="10" fill="var(--color-purple)" />
        <path d="M165 30 L169 34 L175 27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

export function CompoundVisual() {
  return (
    <svg viewBox="0 0 200 120" className="h-28 w-full" aria-hidden>
      <defs>
        <linearGradient id="c-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-purple)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" />
        </linearGradient>
      </defs>
      {/* Baseline */}
      <line x1="15" y1="100" x2="185" y2="100" stroke="rgba(124,90,236,0.25)" strokeWidth="2" />

      {/* Growing bars */}
      <rect x="22" y="80" width="24" height="20" rx="3" fill="url(#c-grad)" className="compound-bar-1" />
      <rect x="54" y="65" width="24" height="35" rx="3" fill="url(#c-grad)" className="compound-bar-2" />
      <rect x="86" y="50" width="24" height="50" rx="3" fill="url(#c-grad)" className="compound-bar-3" />
      <rect x="118" y="35" width="24" height="65" rx="3" fill="url(#c-grad)" className="compound-bar-4" />
      <rect x="150" y="18" width="24" height="82" rx="3" fill="url(#c-grad)" className="compound-bar-5" />

      {/* Trend arrow */}
      <path
        d="M30 85 L65 72 L95 58 L130 42 L170 24"
        stroke="var(--color-purple)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="3 3"
        opacity="0.5"
      />
    </svg>
  );
}
