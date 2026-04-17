export default function LeakyFunnel() {
  const drops = Array.from({ length: 10 });
  return (
    <svg viewBox="0 0 400 240" className="h-56 w-full" aria-hidden>
      <defs>
        <linearGradient id="funnel-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c5aec" />
          <stop offset="100%" stopColor="#9b8ce8" />
        </linearGradient>
        <linearGradient id="funnel-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c5aec" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#7c5aec" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c5aec" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#9b8ce8" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Top bar — "100% traffic" */}
      <rect x="40" y="20" width="320" height="14" rx="4" fill="url(#revenue-fill)" opacity="0.95" />
      <text x="200" y="56" textAnchor="middle" className="fill-[var(--color-text)] text-[13px] font-bold uppercase tracking-[0.18em]">
        100 visitors in
      </text>

      {/* Funnel body */}
      <path
        d="M60 75 L340 75 L250 175 L250 210 L150 210 L150 175 Z"
        fill="url(#funnel-fill)"
        stroke="url(#funnel-stroke)"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Crack indicators — left */}
      <path d="M120 110 L95 100" stroke="var(--color-accent-warm)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <path d="M125 130 L100 128" stroke="var(--color-accent-warm)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      {/* Crack indicators — right */}
      <path d="M280 110 L305 100" stroke="var(--color-accent-warm)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <path d="M275 130 L300 128" stroke="var(--color-accent-warm)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

      {/* Leaking drops */}
      {drops.map((_, i) => (
        <circle
          key={`l${i}`}
          cx={90 + i * 22}
          cy={95}
          r="4"
          fill="var(--color-accent-warm)"
          className="leak-drop-left"
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}
      {drops.map((_, i) => (
        <circle
          key={`r${i}`}
          cx={310 - i * 22}
          cy={95}
          r="4"
          fill="var(--color-accent-warm)"
          className="leak-drop-right"
          style={{ animationDelay: `${i * 0.25 + 0.12}s` }}
        />
      ))}

      {/* Converting drops down the middle */}
      {drops.slice(0, 5).map((_, i) => (
        <circle
          key={`c${i}`}
          cx={200}
          cy={60}
          r="6"
          fill="var(--color-purple)"
          className="convert-drop"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}

      {/* Revenue out bar — tiny */}
      <rect x="165" y="215" width="70" height="8" rx="2" fill="var(--color-purple)" opacity="0.9" />

      {/* Labels left and right of leaks */}
      <text x="40" y="105" textAnchor="start" className="fill-[var(--color-accent-warm)] text-[12px] font-bold uppercase tracking-wider">
        Leak
      </text>
      <text x="360" y="105" textAnchor="end" className="fill-[var(--color-accent-warm)] text-[12px] font-bold uppercase tracking-wider">
        Leak
      </text>
    </svg>
  );
}
