'use client';

import { useEffect, useState } from 'react';
import InputField from './InputField';
import BenchmarkScale from './BenchmarkScale';
import PageRpv from './PageRpv';
import { parseGa4Csv } from './parseGa4Csv';
import { formatRPV, formatCurrency } from './format';

interface QuickRpvProps {
  sessions: number;
  revenue: number;
  orders: number;
  onSessionsChange: (v: number) => void;
  onRevenueChange: (v: number) => void;
  onOrdersChange: (v: number) => void;
  onModeChange: (mode: Mode) => void;
  onPageTotalsChange: (data: { sessions: number; revenue: number; example: boolean }) => void;
}

type Mode = 'site' | 'pages';

export default function QuickRpv({
  sessions,
  revenue,
  orders,
  onSessionsChange,
  onRevenueChange,
  onOrdersChange,
  onModeChange,
  onPageTotalsChange,
}: QuickRpvProps) {
  const [mode, setMode] = useState<Mode>('site');
  const switchMode = (next: Mode) => { setMode(next); onModeChange(next); };
  const [pendingImport, setPendingImport] = useState<string | null>(null);

  // Pasting page data anywhere on the calculator should just work: when the
  // Whole site tab is showing, a parseable paste switches to By page and
  // imports there.
  useEffect(() => {
    if (mode !== 'site') return;
    const onPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      const text = e.clipboardData?.getData('text');
      if (!text || !text.trim()) return;
      const result = parseGa4Csv(text);
      if ('error' in result) return;
      e.preventDefault();
      setPendingImport(text);
      setMode('pages');
      onModeChange('pages');
    };
    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
  }, [mode, onModeChange]);

  const rpv = sessions > 0 ? revenue / sessions : 0;
  const cvr = sessions > 0 && orders > 0 ? (orders / sessions) * 100 : 0;
  const aov = orders > 0 ? revenue / orders : 0;

  return (
    <div className="rounded-2xl border border-ink/10 bg-white px-5 sm:px-8">
      {/* Mode switch */}
      <div className="flex items-center gap-7 border-b border-ink/10" role="tablist" aria-label="Calculator mode">
        {(
          [
            { key: 'site', label: 'Whole site' },
            { key: 'pages', label: 'By page' },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={mode === t.key}
            id={`tab-${t.key}`}
            aria-controls={`panel-${t.key}`}
            onClick={() => switchMode(t.key)}
            className={`relative flex items-center gap-2 border-b-2 px-0 py-4 text-sm font-semibold transition-colors ${
              mode === t.key
                ? 'border-purple text-purple'
                : 'border-transparent text-text-muted hover:text-text'
            }`}
          >
            {t.label}

          </button>
        ))}
      </div>

      <div hidden={mode !== 'site'} id="panel-site" role="tabpanel" aria-labelledby="tab-site">
        <div className="py-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
            {/* Inputs */}
            <div className="space-y-4">
              <InputField
                label="Monthly sessions"
                value={sessions || ''}
                onChange={onSessionsChange}
                placeholder="350,000"
              />
              <InputField
                label="Monthly revenue"
                value={revenue || ''}
                onChange={onRevenueChange}
                prefix="$"
                placeholder="420,000"
              />
              <details open={orders > 0 ? true : undefined}>
                <summary className="cursor-pointer text-sm text-text-muted">Add orders to see conversion rate and AOV</summary>
                <div className="mt-3"><InputField
                label="Monthly orders"
                hint="optional, adds CVR & AOV"
                value={orders || ''}
                onChange={onOrdersChange}
                placeholder="7,000"
              /></div></details>
              <p className="text-xs text-text-muted pt-1">
                Use sessions and revenue from the same full month, in the same currency.
                The forecast uses these as your monthly baseline.
              </p>
            </div>

            {/* Result */}
            <div className="relative isolate flex flex-col justify-center overflow-hidden border-t border-ink/10 pt-6 text-text lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_65%_50%,rgba(139,112,233,0.13),transparent_68%)]" />
              <div className="flex items-center gap-2 text-sm font-medium text-text-muted">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-purple" />
                Your revenue per visitor
              </div>
              <div className="mt-2 bg-gradient-to-br from-ink via-ink to-purple bg-clip-text text-5xl md:text-6xl font-black tracking-[-0.02em] text-transparent tabular-nums" aria-live="polite">
                {sessions > 0 && revenue > 0 ? formatRPV(rpv) : '$—'}
              </div>
              {sessions > 0 && revenue > 0 && (
                <div className="mt-3 text-sm text-text-muted">
                  {formatCurrency(revenue)} ÷ {sessions.toLocaleString()} sessions
                </div>
              )}
              {orders > 0 && sessions > 0 && revenue > 0 && (
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  <span className="text-sm">
                    <span className="font-semibold">{cvr.toFixed(2)}%</span>{' '}
                    <span className="text-text-muted">conversion rate</span>
                  </span>
                  <span className="text-sm">
                    <span className="font-semibold">{formatRPV(aov)}</span>{' '}
                    <span className="text-text-muted">AOV</span>
                  </span>
                </div>
              )}
              {orders > 0 && sessions > 0 && revenue > 0 && (
                <p className="mt-4 text-xs text-text-muted">
                  RPV = conversion rate × AOV. Those are the only two levers that move it.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="font-semibold text-text">Your average is only the starting point.</h2>
              <p className="mt-1 text-sm text-text-muted">It can hide strong pages and weak ones. Compare similar landing pages to see where your revenue opportunities are.</p>
            </div>
            <button onClick={() => switchMode('pages')} className="shrink-0 rounded-xl bg-purple px-5 py-3 text-sm font-semibold text-white hover:bg-purple/90">Compare your pages →</button>
          </div>
          {sessions > 0 && revenue > 0 && <details className="mt-5 text-sm text-text-muted"><summary className="cursor-pointer">Shopify benchmark context</summary><BenchmarkScale rpv={rpv} /></details>}
        </div>
      </div>
      <div hidden={mode !== 'pages'} id="panel-pages" role="tabpanel" aria-labelledby="tab-pages" className="py-8">
        <PageRpv active={mode === 'pages'} pendingImport={pendingImport}
          onPendingConsumed={() => setPendingImport(null)} onTotalsChange={onPageTotalsChange} />
      </div>
    </div>
  );
}
