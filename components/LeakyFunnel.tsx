export default function LeakyFunnel() {
  const drops = Array.from({ length: 6 });
  return (
    <svg viewBox="0 0 400 200" className="h-48 w-full" aria-hidden>
      {/* Funnel outline */}
      <path
        d="M60 30 L340 30 L260 140 L260 180 L140 180 L140 140 Z"
        fill="none"
        stroke="rgba(124,90,236,0.35)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Inner traffic pipe */}
      <path
        d="M80 45 L320 45 L245 135 L245 170 L155 170 L155 135 Z"
        fill="rgba(124,90,236,0.06)"
      />

      {/* Ad spend icon (top) */}
      <text x="200" y="22" textAnchor="middle" className="fill-[var(--color-text-muted)] text-[11px] font-medium">
        Paid traffic
      </text>
      <text x="200" y="197" textAnchor="middle" className="fill-[var(--color-purple)] text-[11px] font-semibold">
        Revenue
      </text>

      {/* Leaking drops, escaping sideways */}
      {drops.map((_, i) => (
        <circle
          key={`l${i}`}
          cx={80 + i * 35}
          cy={60}
          r="3"
          fill="var(--color-accent-warm)"
          className="leak-drop-left"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
      {drops.map((_, i) => (
        <circle
          key={`r${i}`}
          cx={320 - i * 35}
          cy={60}
          r="3"
          fill="var(--color-accent-warm)"
          className="leak-drop-right"
          style={{ animationDelay: `${i * 0.4 + 0.2}s` }}
        />
      ))}

      {/* Conversion drops falling through */}
      {drops.map((_, i) => (
        <circle
          key={`c${i}`}
          cx={200}
          cy={40}
          r="4"
          fill="var(--color-purple)"
          className="convert-drop"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
    </svg>
  );
}
