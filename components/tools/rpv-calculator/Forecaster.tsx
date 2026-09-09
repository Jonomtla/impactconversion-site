'use client';

import { useState } from 'react';
import InputField from './InputField';
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
    results.push({ cumInvest, cumProfit: cumGrossProfit, net: useRevenueMode ? cumGrossProfit : cumGrossProfit - cumInvest });
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

  const [lift, setLift] = useState(Math.min(100, Math.max(0, initialLift)));
  const [margin, setMargin] = useState(Math.min(100, Math.max(0, initialMargin)));
  const [cac, setCac] = useState(initialCac);
  const [invest, setInvest] = useState(initialInvest);
  const [yearly, setYearly] = useState(false);
  const [forecastMode, setForecastMode] = useState<'net' | 'gross'>('net');
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);


  const rpv = sessions > 0 ? revenue / sessions : 0;
  const rpvWithCro = rpv * (1 + lift / 100);
  const cvr = sessions > 0 ? (orders / sessions) * 100 : 0;
  const aov = orders > 0 ? revenue / orders : 0;

  const mult = yearly ? 12 : 1;

  const incRevMonthly = revenue * (lift / 100);
  const incProfitMonthly = incRevMonthly * (margin / 100);

  const targetRevForecast = calculateForecastScenario(revenue, margin, invest, lift, 12, true);
  const targetProfitForecast = calculateForecastScenario(revenue, margin, invest, lift, 12, false);
  const year1IncRev = targetRevForecast.results[11]?.cumProfit || 0;
  const year1IncProfit = targetProfitForecast.results[11]?.cumProfit || 0;

  const incRev = yearly ? year1IncRev : incRevMonthly;
  const incProfit = yearly ? year1IncProfit : incProfitMonthly;

  // Illustrative sensitivity range, not a statistical confidence interval.
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
  const conservativeForecast = calculateForecastScenario(revenue, margin, invest, lift / 2, 12, useRevenueMode);
  const targetForecast = calculateForecastScenario(revenue, margin, invest, lift, 12, useRevenueMode);
  const bestForecast = calculateForecastScenario(revenue, margin, invest, lift * 2, 12, useRevenueMode);

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
12-MONTH FORECAST (Year 1 ${useRevenueMode ? 'Additional Revenue' : 'Net Profit After Investment'})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Conservative (${lift / 2}% lift): ${formatCompact(conservativeForecast.year1Profit)}${invest > 0 && !useRevenueMode ? ` · ${conservativeForecast.year1ROI.toFixed(0)}% ROI` : ''}
Target (${lift}% lift): ${formatCompact(targetForecast.year1Profit)}${invest > 0 && !useRevenueMode ? ` · ${targetForecast.year1ROI.toFixed(0)}% ROI` : ''}
Higher (${lift * 2}% lift): ${formatCompact(bestForecast.year1Profit)}${invest > 0 && !useRevenueMode ? ` · ${bestForecast.year1ROI.toFixed(0)}% ROI` : ''}
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

${yearly ? 'FIRST YEAR (RAMPED)' : 'MONTHLY AT FULL LIFT'} IMPACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Revenue: ${formatCurrency(revenue * mult)}
Projected Revenue: ${formatCurrency(yearly ? revenue * 12 + year1IncRev : revenue + incRevMonthly)}
Revenue per Visitor: ${formatRPV(rpv)} → ${formatRPV(rpvWithCro)} (at full lift)
Incremental Revenue: +${formatCurrency(incRev)}
  └ Illustrative range: ${formatCurrency(incRevLow)} - ${formatCurrency(incRevHigh)}
${margin > 0 ? `Incremental Profit: ${formatCurrency(incProfit)}
  └ Illustrative range: ${formatCurrency(incProfitLow)} - ${formatCurrency(incProfitHigh)}` : ''}
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
      <div className="bg-white py-2">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="lift-slider" className="text-sm font-semibold text-text">Target RPV lift by month 12</label>
              <div className="flex items-center gap-1">
                <input type="number" min={0} max={100} step={1} value={lift}
                  onChange={e => setLift(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
                  aria-label="Target RPV lift percentage" className="w-20 rounded-lg border border-ink/15 px-3 py-2 text-right font-semibold focus:outline-purple" />
                <span>%</span>
              </div>
            </div>
            <input id="lift-slider" type="range" min={0} max={100} step={1} value={lift}
              onChange={e => setLift(Number(e.target.value))} className="mt-5 w-full accent-purple" />
            <div className="mt-1 flex justify-between text-xs text-text-muted"><span>0%</span><span>50%</span><span>100%</span></div>
            <p className="mt-4 text-sm text-text-muted">Explore a possible improvement at your current traffic. This is a scenario, not a prediction.</p>
            {hasNumbers && <p className="mt-3 text-sm text-text-muted">RPV: {formatRPV(rpv)} today → <strong className="text-text">{formatRPV(rpvWithCro)}</strong> at full lift</p>}
            <details className="mt-6 border-t border-ink/10 pt-4" open={initialMargin > 0 || initialInvest > 0 || initialCac > 0 ? true : undefined}>
              <summary className="cursor-pointer text-sm font-semibold text-text">Explore profitability and costs</summary>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <InputField label="Gross margin" value={margin || ''} onChange={v => setMargin(Math.min(100, v))} suffix="%" placeholder="45" step="0.01" />
                <InputField label="Monthly CRO investment" value={invest || ''} onChange={setInvest} prefix="$" placeholder="5,000" />
              </div>
              <details className="mt-4"><summary className="cursor-pointer text-sm text-text-muted">Model acquisition cost (optional)</summary><div className="mt-3"><InputField label="Current CAC" value={cac || ''} onChange={setCac} prefix="$" placeholder="25" /></div></details>
            </details>
          </div>
          <div className="border-t border-ink/10 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0" aria-live="polite">
            {hasNumbers ? <>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Revenue impact period">
                <button onClick={() => setYearly(false)} aria-pressed={!yearly} className={`rounded-lg px-3 py-2 text-xs font-semibold ${!yearly ? 'bg-ink text-cream' : 'text-text-muted'}`}>Monthly at full lift</button>
                <button onClick={() => setYearly(true)} aria-pressed={yearly} className={`rounded-lg px-3 py-2 text-xs font-semibold ${yearly ? 'bg-ink text-cream' : 'text-text-muted'}`}>First year</button>
              </div>
              <p className="mt-5 text-sm text-text-muted">{yearly ? 'Additional revenue in year one' : 'Additional monthly revenue at full lift'}</p>
              <p className="mt-2 break-words text-4xl font-black tracking-tight text-purple sm:text-5xl">+{formatCurrency(incRev)}</p>
              <p className="mt-3 text-sm text-text-muted">{formatCurrency(revenue * mult)} → {formatCurrency(yearly ? revenue * 12 + year1IncRev : revenue + incRevMonthly)} total revenue</p>
              <p className="mt-3 text-xs leading-relaxed text-text-muted">{yearly ? 'Month 1 has no lift, then improvement ramps to your target by month 12. Year one captures six months of full-lift impact.' : 'This is the monthly increase once your full target is reached, not the average during year one.'}</p>
              {margin > 0 && <div className="mt-5 border-t border-ink/10 pt-4 text-sm">
                <p className="flex justify-between gap-3"><span>Additional gross profit</span><strong>{formatCurrency(incProfit)}</strong></p>
                {invest > 0 && <p className="mt-2 flex justify-between gap-3"><span>After CRO investment</span><strong>{formatCurrency(incProfit - invest * mult)}</strong></p>}
                {invest > 0 && <p className="mt-3 text-xs text-text-muted">Monthly break-even at full lift: {breakEvenLift.toFixed(1)}% RPV improvement. Year-one profitability also depends on the ramp.</p>}
              </div>}
              {cac > 0 && <p className="mt-4 text-xs text-text-muted">CAC could move from {formatCAC(cac)} to {formatCAC(improvedCAC)} if the entire lift comes from conversion rate and acquisition spend stays constant.</p>}
            </> : <div className="py-8"><p className="font-semibold text-text">Your revenue opportunity will appear here</p><p className="mt-2 text-sm text-text-muted">Enter monthly sessions and revenue above, or try the example in the by-page view.</p></div>}
          </div>
        </div>
      </div>
      {hasNumbers && <>
        <details className="mt-6 border-y border-ink/10 py-5">
          <summary className="cursor-pointer font-semibold text-text">Explore the 12-month forecast and scenarios</summary>
          <div className="mt-5">
            {margin > 0 && <div className="flex gap-2" role="group" aria-label="Forecast mode">
              <button onClick={() => setForecastMode('net')} aria-pressed={forecastMode === 'net'} className="rounded-lg border border-ink/15 px-3 py-2 text-sm">Net profit</button>
              <button onClick={() => setForecastMode('gross')} aria-pressed={forecastMode === 'gross'} className="rounded-lg border border-ink/15 px-3 py-2 text-sm">Additional revenue</button>
            </div>}
            <p className="mt-4 text-sm text-text-muted">Year-one {useRevenueMode ? 'additional revenue' : 'profit after CRO investment'}. Scenarios use half, all and twice your selected lift.</p>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[{label: 'Conservative', pct: lift / 2, result: conservativeForecast}, {label: 'Your target', pct: lift, result: targetForecast}, {label: 'Higher', pct: lift * 2, result: bestForecast}].map(item => <div key={item.label} className="border-l border-ink/15 pl-4"><dt className="text-sm text-text-muted">{item.label} · {item.pct}% lift</dt><dd className="mt-1 text-xl font-semibold">{formatCurrency(item.result.year1Profit)}</dd></div>)}
            </dl>
            <ForecastChart conservativeData={conservativeForecast.results} targetData={targetForecast.results} bestData={bestForecast.results} isRevenueMode={useRevenueMode} />
            <p className="mt-3 text-xs text-text-muted">Assumes constant traffic, month 1 for research and a linear ramp in months 2–12. These are illustrative scenarios, not confidence bounds. Revenue excludes costs; the profit view applies your margin and subtracts CRO investment.</p>
          </div>
        </details>
        <div className="mt-6 flex flex-wrap gap-3 no-print">
          <button onClick={copyResults} className="rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-medium">{copied ? 'Copied!' : 'Copy forecast'}</button>
          <button onClick={copyShareableLink} className="rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-medium">{linkCopied ? 'Link copied!' : 'Copy forecast link'}</button>
          <button onClick={exportToPDF} className="rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-medium">Print / save PDF</button>
        </div>
        <p className="mt-2 text-xs text-text-muted no-print">The forecast link shares these totals and assumptions. Individual page rows stay in your browser.</p>
        <div className="mt-10 border-t border-ink/10 pt-8 no-print">
          <h3 className="text-xl font-bold text-text">Work out where to start on your site</h3>
          <p className="mt-2 max-w-xl text-sm text-text-muted">Bring your results to a 15-minute call with Jono. We can talk through which pages deserve a closer look.</p>
          <a href="/contact#book" className="mt-4 inline-flex rounded-xl bg-purple px-5 py-3 font-semibold text-white hover:bg-purple/90">Book a 15-min consult →</a>
        </div>
      </>}
    </div>
  );
}
