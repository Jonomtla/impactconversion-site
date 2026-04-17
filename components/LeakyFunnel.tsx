export default function LeakyFunnel() {
  const drops = Array.from({ length: 8 });
  return (
    <svg viewBox="0 0 400 260" className="h-64 w-full" aria-hidden>
      <defs>
        <linearGradient id="funnel-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c5aec" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#9b8ce8" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="funnel-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c5aec" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#7c5aec" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Funnel outline (thick) */}
      <path
        d="M40 40 L360 40 L260 180 L260 240 L140 240 L140 180 Z"
        fill="url(#funnel-fill)"
        stroke="url(#funnel-grad)"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Top traffic indicator */}
      <text x="200" y="28" textAnchor="middle" className="fill-[var(--color-text-muted)] text-[12px] font-semibold uppercase tracking-wider">
        Paid traffic in
      </text>
      <text x="200" y="258" textAnchor="middle" className="fill-[var(--color-purple)] text-[12px] font-semibold uppercase tracking-wider">
        Revenue out
      </text>

      {/* Leaking drops left */}
      {drops.map((_, i) => (
        <circle
          key={`l${i}`}
          cx={70 + i * 30}
          cy={80}
          r="5"
          fill="var(--color-accent-warm)"
          className="leak-drop-left"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
      {/* Leaking drops right */}
      {drops.map((_, i) => (
        <circle
          key={`r${i}`}
          cx={330 - i * 30}
          cy={80}
          r="5"
          fill="var(--color-accent-warm)"
          className="leak-drop-right"
          style={{ animationDelay: `${i * 0.3 + 0.15}s` }}
        />
      ))}

      {/* Converting drops down the middle (thicker) */}
      {drops.map((_, i) => (
        <circle
          key={`c${i}`}
          cx={200}
          cy={50}
          r="7"
          fill="var(--color-purple)"
          className="convert-drop"
          style={{ animationDelay: `${i * 0.45}s` }}
        />
      ))}

      {/* Crack indicators */}
      <path d="M100 75 L80 68" stroke="var(--color-accent-warm)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M300 75 L320 68" stroke="var(--color-accent-warm)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
