'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import QuickRpv from './QuickRpv';
import Forecaster from './Forecaster';

/**
 * Owns the numbers shared by both tools on the page: the quick RPV calculator
 * (top) and the CRO forecaster (below). Enter sessions/revenue once, both use it.
 */
export default function RpvTool() {
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<'site' | 'pages'>('site');
  const [pageTotals, setPageTotals] = useState({ sessions: 0, revenue: 0, example: false });
  const [sessions, setSessions] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);

  // Forecaster-only params still arrive via share links; parsed here once and
  // handed down as initial values.
  const [initial, setInitial] = useState({ lift: 20, margin: 0, cac: 0, invest: 0 });
  const [hydrated, setHydrated] = useState(false);

  // Load from URL params on mount (once: re-running would stomp user edits).
  const loadedFromUrl = useRef(false);
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (loadedFromUrl.current) return;
    loadedFromUrl.current = true;

    const num = (key: string) => {
      const v = searchParams.get(key);
      const n = v ? parseFloat(v) : NaN;
      return Number.isFinite(n) ? Math.max(0, n) : null;
    };

    const s = num('sessions');
    const r = num('revenue');
    const o = num('orders');
    if (s !== null) setSessions(s);
    if (r !== null) setRevenue(r);
    if (o !== null) setOrders(o);

    // Legacy share links: derive orders from a conversion-rate param.
    const cr = num('cr');
    if (cr !== null && o === null && s !== null && cr > 0) {
      setOrders(Math.round(s * (cr / 100)));
    }

    setInitial({
      lift: num('lift') ?? 20,
      margin: num('margin') ?? 0,
      cac: num('cac') ?? 0,
      invest: num('investment') ?? 0,
    });
    setHydrated(true);
  }, [searchParams]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <div className="mx-auto max-w-5xl">
      <QuickRpv
        sessions={sessions}
        revenue={revenue}
        orders={orders}
        onSessionsChange={setSessions}
        onRevenueChange={setRevenue}
        onOrdersChange={setOrders}
        onModeChange={setMode}
        onPageTotalsChange={setPageTotals}
      />

      <details id="forecast" className="mt-8 border-t border-ink/10 pt-6 scroll-mt-24" open={searchParams.has('lift') ? true : undefined}>
        <summary className="cursor-pointer text-lg font-semibold text-text">Estimate what an RPV lift could be worth</summary>
        <p className="mt-2 max-w-2xl text-text-muted">
          Set a target lift and the forecast shows the incremental revenue, profit, and
          break-even point of a CRO program using the numbers you entered above.
        </p>
        {mode === 'pages' && <p className="mt-3 text-sm font-medium text-text-muted">{pageTotals.example ? 'Example forecast: ' : 'Forecast baseline: '}totals from the complete page rows below your comparison. Use one full month of landing-page data.</p>}
        <div className="mt-6">
          {hydrated && (
            <Forecaster
              sessions={mode === 'pages' ? pageTotals.sessions : sessions}
              revenue={mode === 'pages' ? pageTotals.revenue : revenue}
              orders={mode === 'pages' ? 0 : orders}
              initialLift={initial.lift}
              initialMargin={initial.margin}
              initialCac={initial.cac}
              initialInvest={initial.invest}
            />
          )}
        </div>
      </details>
    </div>
  );
}
