'use client';

interface ScenarioCardProps {
  title: string;
  profit: string;
  detail: string;
  variant: 'conservative' | 'target' | 'best';
  animationDelay?: number;
  isRevenueMode?: boolean;
}

export default function ScenarioCard({
  title,
  profit,
  detail,
  variant,
  animationDelay = 0,
}: ScenarioCardProps) {
  const styles = {
    conservative: {
      card: 'border-ink/10 bg-white',
      title: 'text-text-muted',
      profit: 'text-text',
    },
    target: {
      card: 'border-purple/30 bg-purple-soft/50',
      title: 'text-purple',
      profit: 'text-purple',
    },
    best: {
      card: 'border-ink/10 bg-white',
      title: 'text-text-muted',
      profit: 'text-text',
    },
  }[variant];

  return (
    <div
      className={`border rounded-2xl p-5 animate-fade-in-up ${styles.card}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className={`text-sm font-semibold ${styles.title}`}>{title}</div>
      <div className={`mt-2 text-2xl md:text-3xl font-bold tracking-tight ${styles.profit}`}>
        {profit}
      </div>
      <div className="mt-1 text-sm text-text-muted">{detail}</div>
    </div>
  );
}
