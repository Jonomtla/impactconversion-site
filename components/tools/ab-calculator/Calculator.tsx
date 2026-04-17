"use client";

import { useMemo, useState } from "react";

// Abramowitz & Stegun approximation of normal CDF.
function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp(-z * z / 2);
  const p =
    d *
    t *
    (0.319381530 +
      t *
        (-0.356563782 +
          t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z > 0 ? 1 - p : p;
}

type Result = {
  controlRate: number;
  variantRate: number;
  relativeLift: number;
  absoluteLift: number;
  pValue: number;
  confidence: number;
  zScore: number;
  significant: boolean;
  direction: "variant" | "control" | "flat";
};

function runTest(
  cV: number,
  cC: number,
  vV: number,
  vC: number
): Result | null {
  if (cV <= 0 || vV <= 0) return null;
  if (cC < 0 || vC < 0) return null;
  if (cC > cV || vC > vV) return null;

  const p1 = cC / cV;
  const p2 = vC / vV;
  const pPool = (cC + vC) / (cV + vV);

  const se = Math.sqrt(pPool * (1 - pPool) * (1 / cV + 1 / vV));
  if (se === 0) {
    return {
      controlRate: p1,
      variantRate: p2,
      relativeLift: 0,
      absoluteLift: 0,
      pValue: 1,
      confidence: 0,
      zScore: 0,
      significant: false,
      direction: "flat",
    };
  }

  const z = (p2 - p1) / se;
  const twoSidedP = 2 * (1 - normalCdf(Math.abs(z)));
  const confidence = (1 - twoSidedP) * 100;

  return {
    controlRate: p1,
    variantRate: p2,
    relativeLift: p1 === 0 ? 0 : ((p2 - p1) / p1) * 100,
    absoluteLift: (p2 - p1) * 100,
    pValue: twoSidedP,
    confidence,
    zScore: z,
    significant: confidence >= 95,
    direction: p2 > p1 ? "variant" : p2 < p1 ? "control" : "flat",
  };
}

function pct(n: number, digits = 2) {
  return `${n.toFixed(digits)}%`;
}

export default function ABCalculator() {
  const [cVisitors, setCVisitors] = useState(10000);
  const [cConv, setCConv] = useState(200);
  const [vVisitors, setVVisitors] = useState(10000);
  const [vConv, setVConv] = useState(240);

  const result = useMemo(
    () => runTest(cVisitors, cConv, vVisitors, vConv),
    [cVisitors, cConv, vVisitors, vConv]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-2 rounded-2xl border border-ink/10 bg-white p-6 md:p-8">
        <h3 className="text-lg font-semibold text-text">Inputs</h3>
        <p className="mt-1 text-sm text-text-muted">
          Enter totals for each variation. Results update live.
        </p>

        <div className="mt-6 space-y-6">
          <fieldset>
            <legend className="text-sm font-semibold text-text">Control (A)</legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-medium text-text-muted">Visitors</span>
                <input
                  type="number"
                  min={0}
                  value={cVisitors}
                  onChange={(e) => setCVisitors(Number(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm focus:border-purple focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-text-muted">Conversions</span>
                <input
                  type="number"
                  min={0}
                  value={cConv}
                  onChange={(e) => setCConv(Number(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm focus:border-purple focus:outline-none"
                />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-text">Variant (B)</legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-medium text-text-muted">Visitors</span>
                <input
                  type="number"
                  min={0}
                  value={vVisitors}
                  onChange={(e) => setVVisitors(Number(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm focus:border-purple focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-text-muted">Conversions</span>
                <input
                  type="number"
                  min={0}
                  value={vConv}
                  onChange={(e) => setVConv(Number(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm focus:border-purple focus:outline-none"
                />
              </label>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="lg:col-span-3 rounded-2xl border border-ink/10 bg-ink text-cream p-6 md:p-8">
        <h3 className="text-lg font-semibold">Result</h3>

        {!result ? (
          <p className="mt-4 text-text-inv-muted">
            Enter valid numbers. Conversions cannot exceed visitors.
          </p>
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-cream/10 bg-white/5 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-text-inv-muted">Control rate</p>
                <p className="mt-1 text-2xl font-semibold">{pct(result.controlRate * 100)}</p>
              </div>
              <div className="rounded-xl border border-cream/10 bg-white/5 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-text-inv-muted">Variant rate</p>
                <p className="mt-1 text-2xl font-semibold">{pct(result.variantRate * 100)}</p>
              </div>
              <div className="rounded-xl border border-cream/10 bg-white/5 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-text-inv-muted">Relative lift</p>
                <p className={`mt-1 text-2xl font-semibold ${result.direction === "variant" ? "text-emerald-400" : result.direction === "control" ? "text-orange-400" : ""}`}>
                  {result.relativeLift > 0 ? "+" : ""}{result.relativeLift.toFixed(2)}%
                </p>
              </div>
              <div className="rounded-xl border border-cream/10 bg-white/5 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-text-inv-muted">Absolute lift</p>
                <p className="mt-1 text-2xl font-semibold">
                  {result.absoluteLift > 0 ? "+" : ""}{result.absoluteLift.toFixed(2)} pp
                </p>
              </div>
            </div>

            <div className={`mt-6 rounded-xl p-5 ${result.significant ? "bg-emerald-500/15 border border-emerald-400/30" : "bg-orange-500/10 border border-orange-400/30"}`}>
              <p className="text-xs font-medium uppercase tracking-wider text-text-inv-muted">Statistical confidence</p>
              <p className="mt-1 text-4xl font-bold">{result.confidence.toFixed(2)}%</p>
              <p className="mt-2 text-sm text-text-inv-muted">
                {result.significant
                  ? `Significant at 95%. Variant is the likely winner.`
                  : `Not yet significant. Keep running, or redesign the test.`}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-text-inv-muted">
                <div>
                  <span className="block font-semibold text-cream">p-value</span>
                  {result.pValue < 0.0001 ? "< 0.0001" : result.pValue.toFixed(4)}
                </div>
                <div>
                  <span className="block font-semibold text-cream">z-score</span>
                  {result.zScore.toFixed(3)}
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-text-inv-muted">
              Two-tailed z-test for proportions, pooled standard error.
              Assumes random assignment, independent samples, and that you
              pre-committed to sample size. If you&rsquo;re peeking daily, the
              confidence number above understates your false-positive rate.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
