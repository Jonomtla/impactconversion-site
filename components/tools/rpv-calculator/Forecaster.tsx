'use client';

import { useState, useEffect, useRef } from 'react';
import InputField from './InputField';
import ResultItem from './ResultItem';
import ScenarioCard from './ScenarioCard';
import ForecastChart from './ForecastChart';
import { formatCurrency, formatRPV, formatCompact } from './format';

interface ForecastResult {
  cumInvest: number;
  cumProfit: number; // profit or revenue depending on mode
  net: number;
}

interface ForecastScenario {
  results: ForecastResult[];
  year1Profit: number;
  year1ROI: number;
}

const formatCAC = (n: number) => '$' + n.toFixed(2);

function calculateForecastScenario(
  revenue: number,
  margin: number,
  investment: number,
  targetLift: number,
  months: number,
  useRevenueMode: boolean = false
): ForecastScenario {
  const results: ForecastResult[] = [];
  let cumInvest = 0;
  let cumIncrementalRevenue = 0;

  // CRO ramp model: month 1 is research (no lift), then a linear climb to the
  // target lift by month 12. Year 1 lands at roughly 6 months of full lift.
  for (let m = 1; m <= months; m++) {
    cumInvest += investment;
    const rampProgress = m <= 1 ? 0 : (m - 1) / 11;
    const currentLift = targetLift * rampProgress;

    // RPV lift at constant traffic == revenue lift, so apply directly to revenue.
    const monthlyIncrementalRevenue = revenue * (currentLift / 100);
    cumIncrementalRevenue += monthlyIncrementalRevenue;

    const cumGrossProfit = useRevenueMode
      ? cumIncrementalRevenue
      : cumIncrementalRevenue * (margin / 100);
    results.push({ cumInvest, cumProfit: cumGrossProfit, net: cumGrossProfit - cumInvest });
  }

  const year1Net = results[11]?.net || 0;
  const totalInvest = results[11]?.cumInvest || 0;
  const year1ROI = totalInvest > 0 ? (year1Net / totalInvest) * 100 : 0;

  return { results, year1Profit: year1Net, year1ROI };
}

interface ForecasterProps {
  sessions: number;
  revenue: number;
  orders: number;
  initialLift: number;
  initialMargin: number;
  initialCac: number;
  initialInvest: number;
}

export default function Forecaster({
  sessions,
  revenue,
  orders,
  initialLift,
  initialMargin,
  initialCac,
  initialInvest,
}: ForecasterProps) {
  const forecastRef = useRef<HTMLDivElement>(null);

  const [lift, setLift] = useState(initialLift);
  const [margin, setMargin] = useState(initialMargin);
  const [cac, setCac] = useState(initialCac);
  const [invest, setInvest] = useState(initialInvest);
  const [yearly, setYearly] = useState(false);
  const [forecastMode, setForecastMode] = useState<'net' | 'gross'>('net');
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const rpv = sessions > 0 ? revenue / sessions : 0;
  const rpvWithCro = rpv * (1 + lift / 100);
  const cvr = sessions > 0 ? (orders / sessions) * 100 : 0;
  const aov = orders > 0 ? revenue / orders : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowScrollButton(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (forecastRef.current) observer.observe(forecastRef.current);
    return () => observer.disconnect();
  }, []);

  const mult = yearly ? 12 : 1;
  const period = yearly ? 'yearly' : 'monthly';

  const incRevMonthly = revenue * (lift / 100);
  const incProfitMonthly = incRevMonthly * (margin / 100);

  const targetRevForecast = calculateForecastScenario(revenue, margin, invest, lift, 12, true);
  const targetProfitForecast = calculateForecastScenario(revenue, margin, invest, lift, 12, false);
  const year1IncRev = targetRevForecast.results[11]?.cumProfit || 0;
  const year1IncProfit = targetProfitForecast.results[11]?.cumProfit || 0;

  const incRev = yearly ? year1IncRev : incRevMonthly;
  const incProfit = yearly ? year1IncProfit : incProfitMonthly;

  // Confidence range (conservative -20%, optimistic +30%)
  const incRevLow = incRev * 0.8;
  const incRevHigh = incRev * 1.3;
  const incProfitLow = incProfit * 0.8;
  const incProfitHigh = incProfit * 1.3;

  const improvedCAC = cac > 0 ? cac / (1 + lift / 100) : 0;
  const cacReduction = cac - improvedCAC;
  const cacReductionPct = cac > 0 ? (cacReduction / cac) * 100 : 0;

  const breakEvenLift =
    invest > 0 && margin > 0 && revenue > 0 ? ((invest / (margin / 100)) / revenue) * 100 : 0;

  const useRevenueMode = margin <= 0 || forecastMode === 'gross';
  const conservativeForecast = calculateForecastScenario(revenue, margin, invest, 10, 12, useRevenueMode);
  const targetForecast = calculateForecastScenario(revenue, margin, invest, 20, 12, useRevenueMode);
  const bestForecast = calculateForecastScenario(revenue, margin, invest, 40, 12, useRevenueMode);

  const showForecast = revenue > 0;

  const generateShareableLink = () => {
    const baseUrl =
      typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    const params = new URLSearchParams({
      sessions: sessions.toString(),
      lift: lift.toString(),
      revenue: revenue.toString(),
      orders: orders.toString(),
      margin: margin.toString(),
      cac: cac.toString(),
      investment: invest.toString(),
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const copyShareableLink = () => {
    navigator.clipboard.writeText(generateShareableLink()).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  const copyResults = () => {
    const forecastSection = showForecast
      ? `
12-MONTH FORECAST (Year 1 ${useRevenueMode ? 'Revenue' : 'Net Profit'})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Conservative (10% lift): ${formatCompact(conservativeForecast.year1Profit)}${invest > 0 && !useRevenueMode ? ` · ${conservativeForecast.year1ROI.toFixed(0)}% ROI` : ''}
Target (20% lift): ${formatCompact(targetForecast.year1Profit)}${invest > 0 && !useRevenueMode ? ` · ${targetForecast.year1ROI.toFixed(0)}% ROI` : ''}
Best Case (40% lift): ${formatCompact(bestForecast.year1Profit)}${invest > 0 && !useRevenueMode ? ` · ${bestForecast.year1ROI.toFixed(0)}% ROI` : ''}
`
      : '';

    const text = `REVENUE PER VISITOR CALCULATOR RESULTS
Impact Conversion · impactconversion.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOUR INPUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Monthly Sessions: ${sessions.toLocaleString()}
Monthly Revenue: ${formatCurrency(revenue)}
Monthly Orders: ${orders.toLocaleString()}
Revenue per Visitor: ${formatRPV(rpv)}
Conversion Rate: ${cvr.toFixed(2)}% (reference)
AOV: ${formatRPV(aov)} (reference)
Target RPV Lift: ${lift}%
${margin > 0 ? `Gross Margin: ${margin}%` : ''}
${invest > 0 ? `Monthly CRO Investment: ${formatCurrency(invest)}` : ''}

${period.toUpperCase()} IMPACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Revenue: ${formatCurrency(revenue * mult)}
Projected Revenue: ${formatCurrency(yearly ? revenue * 12 + year1IncRev : revenue + incRevMonthly)}
Revenue per Visitor: ${formatRPV(rpv)} → ${formatRPV(rpvWithCro)} (at full lift)
Incremental Revenue: +${formatCurrency(incRev)}
  └ Range: ${formatCurrency(incRevLow)} - ${formatCurrency(incRevHigh)}
${margin > 0 ? `Incremental Profit: ${formatCurrency(incProfit)}
  └ Range: ${formatCurrency(incProfitLow)} - ${formatCurrency(incProfitHigh)}` : ''}
${cac > 0 ? `
CAC Impact: ${formatCAC(cac)} → ${formatCAC(improvedCAC)} (-${cacReductionPct.toFixed(1)}%)` : ''}
${invest > 0 && margin > 0 ? `
Break-even RPV Lift Required: ${breakEvenLift.toFixed(1)}%${lift >= breakEvenLift ? ' ✓ Target exceeds this!' : ''}` : ''}
${forecastSection}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Book a free 15-min consult: https://impactconversion.com/contact#book`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const exportToPDF = () => {
    window.print();
  };

  const hasNumbers = sessions > 0 && revenue > 0;

  return (
    <div>
      {/* Controls */}
      <div className="bg-white border border-ink/10 rounded-3xl card-shadow p-5 sm:p-8">
        {!hasNumbers && (
          <p className="mb-6 rounded-xl bg-cream-2 px-4 py-3 text-sm text-text-muted">
            Enter your sessions and revenue in the calculator above and the forecast fills in from there.
          </p>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* Lift slider */}
          <div>
            <div className="flex items-end justify-between gap-4">
              <label htmlFor="lift-slider" className="text-sm font-medium text-text">
                Target RPV lift
                <span className="ml-2 font-normal text-purple text-xs px-2 py-0.5 bg-purple-soft rounded-full">
                  year 1, compounded across tests
                </span>
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={100}
                  step={1}
                  value={lift || ''}
                  onChange={(e) => setLift(Math.min(100, parseFloat(e.target.value) || 0))}
                  aria-label="Target RPV lift percentage"
                  className="w-20 rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-right text-lg font-bold text-purple focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/10"
                />
                <span className="text-lg font-bold text-purple">%</span>
              </div>
            </div>
            <input
              id="lift-slider"
              type="range"
              min={0}
              max={50}
              step={1}
              value={Math.min(lift, 50)}
              onChange={(e) => setLift(parseFloat(e.target.value))}
              className="mt-4 w-full accent-purple"
            />
            <div className="mt-1 flex justify-between text-xs text-text-muted">
              <span>0%</span>
              <span>10% conservative</span>
              <span>20% typical target</span>
              <span>50%</span>
            </div>
            {hasNumbers && (
              <p className="mt-4 text-sm text-text-muted">
                {formatRPV(rpv)} today → <span className="font-semibold text-text">{formatRPV(rpvWithCro)}</span> at full lift
              </p>
            )}
          </div>

          {/* Optional refinements */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:border-l lg:border-ink/10 lg:pl-8">
            <InputField
              label="Gross margin"
              hint="optional"
              value={margin || ''}
              onChange={setMargin}
              step="0.01"
              suffix="%"
              placeholder="45"
            />
            <InputField
              label="Monthly CRO investment"
              hint="optional"
              value={invest || ''}
              onChange={setInvest}
              prefix="$"
              placeholder="5,000"
            />
            <InputField
              label="Current CAC"
              hint="optional"
              value={cac || ''}
              onChange={setCac}
              prefix="$"
              placeholder="25"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {hasNumbers && (
        <>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {/* Without CRO */}
            <div className="bg-white border border-ink/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-text-muted">Without CRO</h3>
              <div className="mt-2 text-3xl font-bold text-text-muted">
                {formatCurrency(revenue * mult)}
              </div>
              <div className="text-sm text-text-muted capitalize">{period} revenue</div>
              <div className="mt-3 pt-3 border-t border-ink/10 space-y-1 text-sm text-text-muted">
                <div>
                  <span className="font-medium text-text">{formatRPV(rpv)}</span> revenue per visitor
                </div>
                <div>
                  <span className="font-medium text-text">{(sessions * mult).toLocaleString()}</span> sessions
                </div>
              </div>
            </div>

            {/* With CRO */}
            <div className="bg-ink text-cream rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-purple-2">With CRO</h3>
              <div className="mt-2 text-3xl font-bold">
                {formatCurrency(yearly ? revenue * 12 + year1IncRev : revenue + incRevMonthly)}
              </div>
              <div className="text-sm text-text-inv-muted capitalize">{period} revenue</div>
              <div className="mt-3 pt-3 border-t border-white/10 space-y-1 text-sm text-text-inv-muted">
                <div>
                  <span className="font-medium text-cream">{formatRPV(rpvWithCro)}</span> revenue per visitor at full lift
                </div>
                <div>
                  <span className="font-medium text-cream">{(sessions * mult).toLocaleString()}</span> sessions
                </div>
              </div>
            </div>
          </div>

          {/* Impact */}
          <div className="mt-6 bg-white border border-ink/10 rounded-3xl card-shadow p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h3 className="text-lg font-semibold text-text">Revenue impact</h3>
              <div className="flex items-center bg-cream-2 rounded-lg p-1" role="group" aria-label="Period">
                <button
                  onClick={() => setYearly(false)}
                  aria-pressed={!yearly}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    !yearly ? 'bg-ink text-cream' : 'text-text-muted hover:text-text'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setYearly(true)}
                  aria-pressed={yearly}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    yearly ? 'bg-ink text-cream' : 'text-text-muted hover:text-text'
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>

            <ResultItem
              label={`Incremental ${period} revenue`}
              value={`+${formatCurrency(incRev)}`}
              subValue={`Range: ${formatCurrency(incRevLow)} - ${formatCurrency(incRevHigh)}`}
              variant="highlight"
              highlighted
            />
            <ResultItem
              label={`Incremental ${period} profit`}
              value={margin > 0 ? formatCurrency(incProfit) : 'Add margin to see'}
              subValue={
                margin > 0
                  ? `Range: ${formatCurrency(incProfitLow)} - ${formatCurrency(incProfitHigh)}`
                  : undefined
              }
              variant={margin > 0 ? 'default' : 'muted'}
            />

            {invest > 0 && margin > 0 && (
              <div className="mt-4 p-4 bg-cream-2/70 border border-ink/10 rounded-xl">
                <p className="text-sm text-text-muted">
                  <span className="font-semibold text-text">Break-even:</span> you need a{' '}
                  <span className="font-bold text-purple">{breakEvenLift.toFixed(1)}%</span> RPV lift
                  to cover the investment.
                  {lift >= breakEvenLift ? (
                    <span className="ml-1 font-medium text-purple">
                      Your {lift}% target clears it.
                    </span>
                  ) : (
                    <span className="ml-1 font-medium text-accent-warm">
                      Your {lift}% target falls short of it.
                    </span>
                  )}
                </p>
              </div>
            )}

            {cac > 0 && (
              <div className="mt-6 pt-6 border-t border-ink/10">
                <h4 className="text-sm font-semibold text-text mb-2">CAC impact</h4>
                <ResultItem label="Current CAC" value={formatCAC(cac)} variant="baseline" />
                <ResultItem
                  label="Improved CAC (if the lift comes from conversion rate)"
                  value={formatCAC(improvedCAC)}
                  variant="default"
                />
                <ResultItem
                  label="CAC reduction"
                  value={`-${formatCAC(cacReduction)} (${cacReductionPct.toFixed(1)}%)`}
                  variant="highlight"
                />
              </div>
            )}
          </div>

          {/* Forecast */}
          {showForecast && (
            <div
              ref={forecastRef}
              className="mt-6 bg-white border border-ink/10 rounded-3xl card-shadow p-5 sm:p-8 scroll-mt-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-text">12-month forecast</h3>
                  <p className="text-sm text-text-muted">
                    Three lift scenarios with a month-one research period, then a linear ramp
                  </p>
                </div>
                {margin > 0 ? (
                  <div className="flex items-center bg-cream-2 rounded-lg p-1" role="group" aria-label="Forecast mode">
                    <button
                      onClick={() => setForecastMode('net')}
                      aria-pressed={forecastMode === 'net'}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                        forecastMode === 'net' ? 'bg-ink text-cream' : 'text-text-muted hover:text-text'
                      }`}
                    >
                      Net profit
                    </button>
                    <button
                      onClick={() => setForecastMode('gross')}
                      aria-pressed={forecastMode === 'gross'}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                        forecastMode === 'gross' ? 'bg-ink text-cream' : 'text-text-muted hover:text-text'
                      }`}
                    >
                      Gross revenue
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-medium text-text-muted bg-cream-2 rounded-lg px-3 py-2">
                    Add margin for the profit view
                  </span>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <ScenarioCard
                  title="Conservative"
                  profit={formatCompact(conservativeForecast.year1Profit)}
                  detail={
                    invest > 0 && !useRevenueMode
                      ? `10% lift · ${conservativeForecast.year1ROI.toFixed(0)}% ROI`
                      : '10% lift target'
                  }
                  variant="conservative"
                  isRevenueMode={useRevenueMode}
                />
                <ScenarioCard
                  title="Target"
                  profit={formatCompact(targetForecast.year1Profit)}
                  detail={
                    invest > 0 && !useRevenueMode
                      ? `20% lift · ${targetForecast.year1ROI.toFixed(0)}% ROI`
                      : '20% lift target'
                  }
                  variant="target"
                  isRevenueMode={useRevenueMode}
                />
                <ScenarioCard
                  title="Best case"
                  profit={formatCompact(bestForecast.year1Profit)}
                  detail={
                    invest > 0 && !useRevenueMode
                      ? `40% lift · ${bestForecast.year1ROI.toFixed(0)}% ROI`
                      : '40% lift target'
                  }
                  variant="best"
                  isRevenueMode={useRevenueMode}
                />
              </div>

              <ForecastChart
                conservativeData={conservativeForecast.results}
                targetData={targetForecast.results}
                bestData={bestForecast.results}
                isRevenueMode={useRevenueMode}
              />

              <p className="mt-4 text-xs text-text-muted">
                Assumptions: month 1 is research (no lift), months 2-12 ramp linearly to the
                scenario&rsquo;s lift, so year 1 captures roughly six months of full-lift impact.
                Scenario cards show cumulative {useRevenueMode ? 'revenue' : 'net profit after investment'} at month 12.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 no-print">
            <button
              onClick={copyResults}
              className="px-5 py-3 bg-white hover:bg-cream-2 border border-ink/15 rounded-xl text-sm font-semibold text-text transition-colors"
            >
              {copied ? 'Copied!' : 'Copy results'}
            </button>
            <button
              onClick={copyShareableLink}
              className="px-5 py-3 bg-white hover:bg-cream-2 border border-ink/15 rounded-xl text-sm font-semibold text-text transition-colors"
            >
              {linkCopied ? 'Link copied!' : 'Copy share link'}
            </button>
            <button
              onClick={exportToPDF}
              className="px-5 py-3 bg-ink hover:bg-ink-2 text-cream rounded-xl text-sm font-semibold transition-colors"
            >
              Download PDF
            </button>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center bg-ink rounded-3xl p-8 no-print">
            <h3 className="text-2xl font-bold text-cream mb-3">Ready to unlock this revenue?</h3>
            <p className="text-text-inv-muted mb-6 max-w-xl mx-auto">
              Book a free 15-min consult with Jono and we&rsquo;ll talk through where the
              highest-leverage wins are hiding on your site.
            </p>
            <a
              href="/contact#book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple hover:bg-purple-2 text-white font-bold rounded-xl transition-colors"
            >
              Book a 15-min consult
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Floating jump-to-forecast */}
          {showForecast && showScrollButton && (
            <button
              onClick={() => forecastRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 bg-ink text-cream rounded-full text-sm font-semibold shadow-xl hover:bg-ink-2 transition-colors z-40 no-print"
            >
              Jump to 12-month forecast ↓
            </button>
          )}
        </>
      )}
    </div>
  );
}
