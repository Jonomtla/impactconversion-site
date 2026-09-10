'use client';

interface ResultItemProps {
  label: string;
  value: string;
  variant?: 'default' | 'baseline' | 'highlight' | 'muted';
  highlighted?: boolean;
  subValue?: string;
  animationDelay?: number;
}

export default function ResultItem({
  label,
  value,
  variant = 'default',
  highlighted = false,
  subValue,
  animationDelay = 0,
}: ResultItemProps) {
  const valueColor = {
    default: 'text-text',
    baseline: 'text-text-muted',
    highlight: 'text-purple font-extrabold text-xl',
    muted: 'text-text-muted/50',
  }[variant];

  if (highlighted) {
    return (
      <div
        className="bg-purple-soft/60 border border-purple/20 rounded-xl p-4 my-3 animate-scale-in"
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div className="flex justify-between items-center gap-4">
          <span className="font-medium text-text">{label}</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-purple tracking-tight">
              {value}
            </span>
            {subValue && (
              <div className="text-xs text-text-muted mt-0.5">{subValue}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex justify-between items-center gap-4 py-3 border-b border-ink/10 last:border-b-0 animate-fade-in"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <span className="font-medium text-text-muted">{label}</span>
      <div className="text-right">
        <span className={`text-lg font-semibold ${valueColor}`}>{value}</span>
        {subValue && <div className="text-xs text-text-muted">{subValue}</div>}
      </div>
    </div>
  );
}
