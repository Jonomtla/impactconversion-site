// Compounding revenue curve — smooth bezier that draws in, soft area fill,
// data dots that appear as the line sweeps past, pulsing endpoint at the summit.
export default function VirtuousLoop() {
  // Smooth cubic bezier — flat early, steep late (classic compounding shape).
  const path = "M 30 260 C 90 258, 150 245, 200 215 S 300 130, 370 55";
  const area =
    "M 30 260 C 90 258, 150 245, 200 215 S 300 130, 370 55 L 370 275 L 30 275 Z";

  // Approximate data points along the curve.
  const points = [
    { x: 30, y: 260 },
    { x: 90, y: 255 },
    { x: 150, y: 240 },
    { x: 210, y: 210 },
    { x: 270, y: 165 },
    { x: 320, y: 110 },
    { x: 370, y: 55 },
  ];

  return (
    <svg viewBox="0 0 400 320" className="h-56 w-full" aria-hidden>
      <defs>
        <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c5aec" />
          <stop offset="70%" stopColor="#9b8ce8" />
          <stop offset="100%" stopColor="#ff7a59" />
        </linearGradient>
        <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c5aec" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7c5aec" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="endpoint-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ff7a59" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff7a59" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Labels */}
      <text
        x="18"
        y="28"
        className="fill-[var(--color-text-muted)] text-[13px] font-bold uppercase tracking-[0.2em]"
      >
        Revenue
      </text>
      <g>
        <path
          d="M 363 24 L 369 18 L 375 24"
          fill="none"
          stroke="var(--color-purple)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="356"
          y="28"
          textAnchor="end"
          className="fill-[var(--color-purple)] text-[13px] font-bold uppercase tracking-[0.2em]"
        >
          Compounds
        </text>
      </g>

      {/* Baseline + faint gridlines */}
      <line
        x1="20"
        y1="275"
        x2="380"
        y2="275"
        stroke="var(--color-ink)"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
      <line
        x1="20"
        y1="200"
        x2="380"
        y2="200"
        stroke="var(--color-ink)"
        strokeOpacity="0.06"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <line
        x1="20"
        y1="125"
        x2="380"
        y2="125"
        stroke="var(--color-ink)"
        strokeOpacity="0.06"
        strokeWidth="1"
        strokeDasharray="3 4"
      />

      {/* Glow behind endpoint */}
      <circle cx="370" cy="55" r="40" fill="url(#endpoint-glow)" />

      {/* Area fill — fades in after line draws */}
      <path d={area} fill="url(#area-grad)" opacity="0">
        <animate
          attributeName="opacity"
          values="0;0;1;1;0"
          keyTimes="0;0.35;0.55;0.9;1"
          dur="5s"
          repeatCount="indefinite"
        />
      </path>

      {/* The line — draws in via stroke-dashoffset */}
      <path
        d={path}
        fill="none"
        stroke="url(#line-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="700"
        strokeDashoffset="700"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="700;0;0;0;700"
          keyTimes="0;0.35;0.55;0.9;1"
          dur="5s"
          repeatCount="indefinite"
        />
      </path>

      {/* Data point dots — appear in sequence as the line sweeps past */}
      {points.map((p, i) => {
        const appearAt = 0.05 + (i / (points.length - 1)) * 0.3;
        const isHero = i === points.length - 1;
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={isHero ? 5 : 3}
            fill={isHero ? "#ff7a59" : "white"}
            stroke={isHero ? "#ff7a59" : "var(--color-purple)"}
            strokeWidth={isHero ? 0 : 2}
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;1;1;0"
              keyTimes={`0;${appearAt.toFixed(3)};${(appearAt + 0.05).toFixed(3)};0.9;1`}
              dur="5s"
              repeatCount="indefinite"
            />
          </circle>
        );
      })}

      {/* Pulsing halo on endpoint */}
      <circle cx="370" cy="55" r="8" fill="#ff7a59" opacity="0">
        <animate
          attributeName="opacity"
          values="0;0;0.5;0;0.5;0;0"
          keyTimes="0;0.4;0.5;0.6;0.7;0.9;1"
          dur="5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="6;6;14;6;14;6;6"
          keyTimes="0;0.4;0.5;0.6;0.7;0.9;1"
          dur="5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* X-axis month labels */}
      {["M1", "M2", "M3", "M4", "M5", "M6", "M7"].map((m, i) => {
        const x = 30 + i * ((370 - 30) / 6);
        return (
          <text
            key={m}
            x={x}
            y="298"
            textAnchor="middle"
            className="fill-[var(--color-text-muted)] text-[10px] font-semibold uppercase tracking-wider"
          >
            {m}
          </text>
        );
      })}
    </svg>
  );
}
