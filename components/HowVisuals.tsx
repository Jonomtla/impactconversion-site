export function ResearchVisual() {
  return (
    <svg viewBox="0 0 240 140" className="h-32 w-full" aria-hidden>
      <defs>
        <linearGradient id="r-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-purple)" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" />
        </linearGradient>
      </defs>

      {/* Quote-style data rows */}
      <rect x="20" y="20" width="180" height="10" rx="5" fill="rgba(124,90,236,0.12)" />
      <rect x="20" y="38" width="140" height="10" rx="5" fill="rgba(124,90,236,0.12)" />
      <rect x="20" y="56" width="170" height="10" rx="5" fill="rgba(124,90,236,0.2)" />
      <rect x="20" y="74" width="120" height="10" rx="5" fill="rgba(124,90,236,0.12)" />
      <rect x="20" y="92" width="160" height="10" rx="5" fill="rgba(124,90,236,0.12)" />
      <rect x="20" y="110" width="100" height="10" rx="5" fill="rgba(124,90,236,0.12)" />

      {/* Highlighted insights */}
      <circle cx="60" cy="25" r="6" fill="var(--color-purple)" className="research-ping-1" />
      <circle cx="120" cy="43" r="6" fill="var(--color-accent-warm)" className="research-ping-2" />
      <circle cx="80" cy="97" r="6" fill="var(--color-purple)" className="research-ping-3" />

      {/* Magnifier */}
      <g className="research-scan">
        <circle cx="170" cy="80" r="26" fill="rgba(255,255,255,0.85)" stroke="url(#r-grad)" strokeWidth="5" />
        <line x1="188" y1="98" x2="206" y2="116" stroke="url(#r-grad)" strokeWidth="6" strokeLinecap="round" />
        <text x="170" y="86" textAnchor="middle" className="fill-[var(--color-purple)] text-[18px] font-bold">
          ?
        </text>
      </g>
    </svg>
  );
}

export function PrioritiseVisual() {
  return (
    <svg viewBox="0 0 240 140" className="h-32 w-full" aria-hidden>
      <defs>
        <linearGradient id="p-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-purple)" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" />
        </linearGradient>
      </defs>

      {/* Podium */}
      <g className="sort-item-1">
        <rect x="90" y="20" width="60" height="110" rx="8" fill="url(#p-grad)" />
        <text x="120" y="80" textAnchor="middle" className="fill-white text-[34px] font-bold">
          1
        </text>
      </g>
      <g className="sort-item-2">
        <rect x="20" y="50" width="60" height="80" rx="8" fill="rgba(124,90,236,0.55)" />
        <text x="50" y="100" textAnchor="middle" className="fill-white text-[28px] font-bold">
          2
        </text>
      </g>
      <g className="sort-item-3">
        <rect x="160" y="70" width="60" height="60" rx="8" fill="rgba(124,90,236,0.3)" />
        <text x="190" y="110" textAnchor="middle" className="fill-[var(--color-purple)] text-[24px] font-bold">
          3
        </text>
      </g>
    </svg>
  );
}

export function TestVisual() {
  return (
    <svg viewBox="0 0 240 140" className="h-32 w-full" aria-hidden>
      <defs>
        <linearGradient id="t-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-purple)" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" />
        </linearGradient>
      </defs>
      <line x1="20" y1="120" x2="220" y2="120" stroke="rgba(124,90,236,0.25)" strokeWidth="2" />

      <rect
        x="40"
        y="65"
        width="60"
        height="55"
        rx="6"
        fill="rgba(124,90,236,0.35)"
        stroke="rgba(124,90,236,0.5)"
        strokeWidth="1.5"
        className="ab-bar-a"
      />
      <text x="70" y="138" textAnchor="middle" className="fill-[var(--color-text-muted)] text-[14px] font-bold">
        A
      </text>

      <rect
        x="140"
        y="25"
        width="60"
        height="95"
        rx="6"
        fill="url(#t-grad)"
        className="ab-bar-b"
      />
      <text x="170" y="138" textAnchor="middle" className="fill-[var(--color-purple)] text-[14px] font-bold">
        B
      </text>

      <g className="ab-check" style={{ transformOrigin: "210px 25px" }}>
        <circle cx="210" cy="25" r="16" fill="var(--color-purple)" />
        <path
          d="M203 25 L208 30 L218 19"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

export function CompoundVisual() {
  return (
    <svg viewBox="0 0 240 140" className="h-32 w-full" aria-hidden>
      <defs>
        <linearGradient id="c-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-purple)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-accent-warm)" />
        </linearGradient>
      </defs>

      <line x1="15" y1="120" x2="225" y2="120" stroke="rgba(124,90,236,0.25)" strokeWidth="2" />

      {/* Growing bars */}
      <rect x="22" y="95" width="30" height="25" rx="4" fill="url(#c-grad)" className="compound-bar-1" />
      <rect x="64" y="75" width="30" height="45" rx="4" fill="url(#c-grad)" className="compound-bar-2" />
      <rect x="106" y="55" width="30" height="65" rx="4" fill="url(#c-grad)" className="compound-bar-3" />
      <rect x="148" y="35" width="30" height="85" rx="4" fill="url(#c-grad)" className="compound-bar-4" />
      <rect x="190" y="15" width="30" height="105" rx="4" fill="url(#c-grad)" className="compound-bar-5" />

      {/* Trend arrow overlay */}
      <path
        d="M37 107 L79 85 L121 65 L163 45 L205 25"
        stroke="var(--color-accent-warm)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />
      <circle cx="205" cy="25" r="5" fill="var(--color-accent-warm)" />
    </svg>
  );
}
