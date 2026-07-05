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
      return Number.isFinite(n) ? n : null;
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
      />

      <div id="forecast" className="mt-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-text">
          What would lifting your RPV be worth?
        </h2>
        <p className="mt-2 max-w-2xl text-text-muted">
          Set a target lift and the forecast shows the incremental revenue, profit, and
          break-even point of a CRO program using the numbers you entered above.
        </p>
        <div className="mt-6">
          {hydrated && (
            <Forecaster
              sessions={sessions}
              revenue={revenue}
              orders={orders}
              initialLift={initial.lift}
              initialMargin={initial.margin}
              initialCac={initial.cac}
              initialInvest={initial.invest}
            />
          )}
        </div>
      </div>
    </div>
  );
}
