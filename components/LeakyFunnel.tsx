// 10x10 dot grid: 3 dots convert (solid purple), 97 leave (outlined).
// Matches the "97 of 100 visitors leave without buying" stat on the card.
export default function LeakyFunnel() {
  const rows = 10;
  const cols = 10;
  // Three "converters" placed to read as naturally scattered.
  const converters = [12, 47, 83];
  const converterSet = new Set(converters);

  const cellW = 34;
  const cellH = 26;
  const startX = 28;
  const startY = 55;

  return (
    <svg viewBox="0 0 400 320" className="h-56 w-full" aria-hidden>
      <defs>
        <linearGradient id="dot-convert" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c5aec" />
          <stop offset="100%" stopColor="#9b8ce8" />
        </linearGradient>
      </defs>

      {/* Corner labels */}
      <text
        x="20"
        y="30"
        className="fill-[var(--color-text-muted)] text-[13px] font-bold uppercase tracking-[0.2em]"
      >
        100 visitors
      </text>
      <g>
        <circle cx="322" cy="25" r="4" fill="url(#dot-convert)" />
        <text
          x="332"
          y="30"
          className="fill-[var(--color-purple)] text-[13px] font-bold uppercase tracking-[0.2em]"
        >
          3 buy
        </text>
      </g>

      {/* Grid */}
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const cx = startX + c * cellW;
        const cy = startY + r * cellH;
        const isConverter = converterSet.has(i);

        if (isConverter) {
          const delay = `${converters.indexOf(i) * 0.6}s`;
          return (
            <g key={i}>
              {/* Soft halo */}
              <circle
                cx={cx}
                cy={cy}
                r="14"
                fill="url(#dot-convert)"
                opacity="0.2"
              >
                <animate
                  attributeName="r"
                  values="12;18;12"
                  dur="2.4s"
                  repeatCount="indefinite"
                  begin={delay}
                />
              </circle>
              {/* Solid dot */}
              <circle cx={cx} cy={cy} r="9" fill="url(#dot-convert)">
                <animate
                  attributeName="r"
                  values="8;10;8"
                  dur="2.4s"
                  repeatCount="indefinite"
                  begin={delay}
                />
              </circle>
            </g>
          );
        }

        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="5"
            fill="none"
            stroke="var(--color-ink)"
            strokeOpacity="0.18"
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}
