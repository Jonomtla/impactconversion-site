'use client';

import { useState } from 'react';
import InputField from './InputField';
import BenchmarkScale from './BenchmarkScale';
import PageRpv from './PageRpv';
import { formatRPV, formatCurrency } from './format';

interface QuickRpvProps {
  sessions: number;
  revenue: number;
  orders: number;
  onSessionsChange: (v: number) => void;
  onRevenueChange: (v: number) => void;
  onOrdersChange: (v: number) => void;
}

type Mode = 'site' | 'pages';

export default function QuickRpv({
  sessions,
  revenue,
  orders,
  onSessionsChange,
  onRevenueChange,
  onOrdersChange,
}: QuickRpvProps) {
  const [mode, setMode] = useState<Mode>('site');

  const rpv = sessions > 0 ? revenue / sessions : 0;
  const cvr = sessions > 0 && orders > 0 ? (orders / sessions) * 100 : 0;
  const aov = orders > 0 ? revenue / orders : 0;

  return (
    <div className="bg-white border border-ink/10 rounded-3xl card-shadow overflow-hidden">
      {/* Mode switch */}
      <div className="flex items-center gap-1 border-b border-ink/10 bg-cream-2/60 px-4 pt-3 sm:px-6" role="tablist" aria-label="Calculator mode">
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
            onClick={() => setMode(t.key)}
            className={`relative px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-colors ${
              mode === t.key
                ? 'bg-white text-text border border-b-0 border-ink/10 -mb-px'
                : 'text-text-muted hover:text-text'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {mode === 'site' ? (
        <div className="p-5 sm:p-8">
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
              <InputField
                label="Monthly orders"
                hint="optional, adds CVR & AOV"
                value={orders || ''}
                onChange={onOrdersChange}
                placeholder="7,000"
              />
              <p className="text-xs text-text-muted pt-1">
                Any period works as long as sessions and revenue cover the same one.
                Numbers straight from GA4 or Shopify analytics.
              </p>
            </div>

            {/* Result */}
            <div className="flex flex-col justify-center rounded-2xl bg-ink px-6 py-8 sm:px-8 text-cream">
              <div className="text-sm font-medium text-text-inv-muted">
                Your revenue per visitor
              </div>
              <div className="mt-2 text-5xl md:text-6xl font-black tracking-[-0.02em] tabular-nums" aria-live="polite">
                {sessions > 0 && revenue > 0 ? formatRPV(rpv) : '$—'}
              </div>
              {sessions > 0 && revenue > 0 && (
                <div className="mt-3 text-sm text-text-inv-muted">
                  {formatCurrency(revenue)} ÷ {sessions.toLocaleString()} sessions
                </div>
              )}
              {orders > 0 && sessions > 0 && revenue > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-sm">
                    <span className="font-semibold">{cvr.toFixed(2)}%</span>{' '}
                    <span className="text-text-inv-muted">conversion rate</span>
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-sm">
                    <span className="font-semibold">{formatRPV(aov)}</span>{' '}
                    <span className="text-text-inv-muted">AOV</span>
                  </span>
                </div>
              )}
              {orders > 0 && sessions > 0 && revenue > 0 && (
                <p className="mt-4 text-xs text-text-inv-muted">
                  RPV = conversion rate × AOV. Those are the only two levers that move it.
                </p>
              )}
            </div>
          </div>

          {sessions > 0 && revenue > 0 && <BenchmarkScale rpv={rpv} />}
        </div>
      ) : (
        <div className="p-5 sm:p-8">
          <PageRpv siteRpv={sessions > 0 && revenue > 0 ? rpv : null} />
        </div>
      )}
    </div>
  );
}
