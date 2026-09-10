'use client';

import { formatRPV } from './format';

// Derived from Littledata's published Shopify benchmarks (2,800 stores, 2023):
// 1.4% average conversion rate × US$85 average AOV ≈ US$1.19 revenue per session.
// We show the derivation openly rather than inventing a quartile table.
export const SHOPIFY_AVG_RPV = 1.19;

export default function BenchmarkScale({ rpv }: { rpv: number }) {
  if (!Number.isFinite(rpv) || rpv <= 0) return null;

  const max = Math.max(2.6, rpv * 1.3, SHOPIFY_AVG_RPV * 1.3);
  const userPct = Math.min(97, (rpv / max) * 100);
  const avgPct = (SHOPIFY_AVG_RPV / max) * 100;

  const ratio = rpv / SHOPIFY_AVG_RPV;
  const verdict =
    ratio >= 2
      ? 'well above the Shopify average'
      : ratio >= 1.1
        ? 'above the Shopify average'
        : ratio >= 0.85
          ? 'around the Shopify average'
          : 'below the Shopify average';

  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-sm font-semibold text-text">How you compare</h3>
        <span className="text-sm text-text-muted">
          Your RPV is <span className="font-semibold text-text">{verdict}</span>
        </span>
      </div>

      <div className="relative mt-8 mb-7" role="img" aria-label={`Your revenue per visitor of ${formatRPV(rpv)} compared with the Shopify average of ${formatRPV(SHOPIFY_AVG_RPV)}`}>
        {/* Track */}
        <div className="h-2 rounded-full bg-cream-2" />
        {/* Fill to user position */}
        <div
          className="absolute top-0 h-2 rounded-full bg-purple/80 transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${userPct}%` }}
        />
        {/* Shopify average tick */}
        <div className="absolute -top-1.5 h-5 w-0.5 bg-ink/50" style={{ left: `${avgPct}%` }} />
        <div
          className="absolute top-4 -translate-x-1/2 whitespace-nowrap text-[11px] leading-tight text-text-muted"
          style={{ left: `${avgPct}%` }}
        >
          Shopify avg {formatRPV(SHOPIFY_AVG_RPV)}
        </div>
        {/* User marker */}
        <div
          className="absolute -top-2 -translate-x-1/2 transition-[left] duration-300 ease-out motion-reduce:transition-none"
          style={{ left: `${userPct}%` }}
        >
          <div className="h-6 w-6 rounded-full border-4 border-purple bg-white shadow-sm" />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2 py-0.5 text-[11px] font-semibold text-cream">
            You {formatRPV(rpv)}
          </div>
        </div>
      </div>

      <p className="text-xs text-text-muted">
        Shopify average derived from{' '}
        <a
          href="https://www.littledata.io/average-website-performance"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-purple underline-offset-2 hover:underline"
        >
          Littledata&rsquo;s benchmarks
        </a>{' '}
        (1.4% average conversion rate × $85 average order value, 2,800 stores). Averages hide a lot:
        a $300-AOV store should sit far above this line.
      </p>
    </div>
  );
}
