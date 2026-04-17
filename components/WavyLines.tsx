export default function WavyLines() {
  const pinchX = 220;
  const pinchY = 640;
  const count = 32;
  const lines = [] as { d: string; opacity: number; width: number; delay: number }[];

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const angle = (-2 + t * 95) * (Math.PI / 180);
    const r = 1700;
    const endX = pinchX + r * Math.cos(angle);
    const endY = pinchY - r * Math.sin(angle);

    const cp1X = pinchX + 130 + Math.sin(i * 0.7) * 40;
    const cp1Y = pinchY - 110 * t + Math.sin(i * 1.4) * 60;
    const cp2X = pinchX + (endX - pinchX) * 0.55;
    const cp2Y = (pinchY + endY) / 2 + Math.sin(i * 0.55) * 90;

    lines.push({
      d: `M${pinchX},${pinchY} C${cp1X.toFixed(1)},${cp1Y.toFixed(1)} ${cp2X.toFixed(1)},${cp2Y.toFixed(1)} ${endX.toFixed(1)},${endY.toFixed(1)}`,
      opacity: 0.14 + (i % 5) * 0.04,
      width: i % 9 === 0 ? 1 : 0.6,
      delay: (i * 0.35) % 12,
    });
  }

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="fan-grad" x1="0.2" y1="1" x2="1" y2="0.1">
          <stop offset="0%" stopColor="rgba(124,90,236,0)" />
          <stop offset="30%" stopColor="rgba(155,140,232,1)" />
          <stop offset="75%" stopColor="rgba(200,180,255,1)" />
          <stop offset="100%" stopColor="rgba(255,122,89,0.7)" />
        </linearGradient>
      </defs>
      <g fill="none" strokeLinecap="round">
        {lines.map((l, i) => (
          <path
            key={i}
            d={l.d}
            stroke="url(#fan-grad)"
            strokeWidth={l.width}
            opacity={l.opacity}
            pathLength={1}
            strokeDasharray="0.35 0.65"
            className="fan-line"
            style={{ animationDelay: `-${l.delay}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
