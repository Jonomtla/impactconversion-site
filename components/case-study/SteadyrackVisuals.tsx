import type { CaseStudyVisual } from "@/lib/case-studies";

/* Revenue per visitor by landing page, indexed to the Classic MTB PDP = 100. */
const BASELINE_RPV = [
  { page: "Collection (bike racks)", v: 102 },
  { page: "Classic MTB PDP", v: 100 },
  { page: "Homepage", v: 69 },
  { page: "ProFlex PDP", v: 49, worst: true },
];

const FUNNEL = [
  { stage: "Landing to product view", before: 49.8, bm: 70 },
  { stage: "Product view to add to cart", before: 7.2, bm: 12 },
  { stage: "Add to cart to checkout", before: 80.8, bm: 60 },
  { stage: "Checkout completion", before: 49.0, bm: 60 },
];

function Caption({ children }: { children: React.ReactNode }) {
  return <figcaption className="mt-4 text-sm text-text-muted">{children}</figcaption>;
}

/* "Which rack do I need?" surfacing across five separate survey questions.
   Laid out like the research deck's question charts: title, subtitle, n= line,
   horizontal bars on a percentage axis, then a key-insight callout. */
const SELECTION_CONFUSION = [
  { q: "Biggest challenge finding a rack", v: 18.2 },
  { q: "What would make the decision easier", v: 12.0 },
  { q: "Biggest fear before buying", v: 9.7 },
  { q: "Reason for not purchasing", v: 8.2 },
  { q: "Biggest frustration", v: 5.1 },
];
const AXIS_MAX = 20;
const TICKS = [0, 5, 10, 15, 20];

/* Sampled from the research deck (Steadyrack Summary of the Research.pdf) so the
   chart reads as a page out of it: bar green, periwinkle accent, callout ground. */
const DECK_GREEN = "#77A986";
const DECK_BLUE = "#7695D7";
/* Same hue, darkened to clear WCAG AA on cream: the deck's #7695D7 is 2.79:1 as
   body-size text, which is fine on the deck's white slides but not here. */
const DECK_BLUE_TEXT = "#436DC8";
const DECK_CALLOUT_BG = "#EEF1F8";

function KeyInsight({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-6 border-l-[3px] px-5 py-4 text-sm leading-relaxed text-text"
      style={{ borderColor: DECK_BLUE, backgroundColor: DECK_CALLOUT_BG }}
    >
      <span className="font-semibold">Key insight: </span>
      {children}
    </p>
  );
}

function Research() {
  return (
    <figure className="my-10">
      <h3 className="text-xl font-semibold tracking-tight text-text md:text-2xl">
        &ldquo;Which rack do I need?&rdquo;
      </h3>
      <p className="mt-1 text-lg font-semibold" style={{ color: DECK_BLUE_TEXT }}>
        The same question, in every survey we ran
      </p>
      <p className="mt-2 text-sm text-text-muted">
        Share of responses describing product-selection confusion, by question asked.
        On-site and email surveys, Jan to Mar 2026.
      </p>

      <div className="mt-7 grid grid-cols-[minmax(7.5rem,14rem)_1fr] gap-x-4">
        {SELECTION_CONFUSION.map((d, i) => (
          <div key={d.q} className="contents">
            <div
              className={`flex items-center justify-end pr-1 text-right text-[13px] leading-tight ${
                i === 0 ? "font-semibold text-text" : "text-text-muted"
              } ${i === 0 ? "pt-3" : "pt-2"} pb-2`}
            >
              {d.q}
            </div>
            <div className={`relative flex items-center ${i === 0 ? "pt-3" : "pt-2"} pb-2`}>
              <div aria-hidden className="absolute inset-0">
                {TICKS.map((t) => (
                  <span
                    key={t}
                    className="absolute top-0 bottom-0 w-px bg-text/10"
                    style={{ left: `${(t / AXIS_MAX) * 100}%` }}
                  />
                ))}
              </div>
              <div
                className="relative h-6 rounded-r-[3px]"
                style={{
                  width: `${(d.v / AXIS_MAX) * 100}%`,
                  backgroundColor: DECK_GREEN,
                }}
              />
              <span
                className={`relative ml-2 text-[13px] tabular-nums ${
                  i === 0 ? "font-semibold text-text" : "text-text-muted"
                }`}
              >
                {d.v}%
              </span>
            </div>
          </div>
        ))}

        <div />
        <div className="relative mt-1 h-5 border-t border-text/15">
          {TICKS.map((t) => (
            <span
              key={t}
              className="absolute top-1 -translate-x-1/2 text-[11px] tabular-nums text-text-muted"
              style={{ left: `${(t / AXIS_MAX) * 100}%` }}
            >
              {t}%
            </span>
          ))}
        </div>
      </div>

      <KeyInsight>
        Product selection is the one friction that shows up no matter how the question is
        phrased. It is the single biggest addressable problem in the dataset, and it is a
        comprehension problem, not a trust or a price problem. Supporting it: 17% of
        support tickets are sizing questions and 80% of returns trace to fit and space.
      </KeyInsight>

      <Caption>
        Six independent sources agreed: on-site surveys (n=116 stated barriers), two email
        surveys, heatmaps, session recordings, mined reviews, support tickets and the
        funnel itself.
      </Caption>
    </figure>
  );
}

function BaselineRpv() {
  const max = Math.max(...BASELINE_RPV.map((d) => d.v));
  return (
    <figure className="my-10 rounded-2xl border border-text/10 bg-cream-2/60 p-6 md:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-purple">
        Before the program
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-text">
        What a visit to each page was worth
      </h3>
      <ul className="mt-6 space-y-3">
        {BASELINE_RPV.map((d) => (
          <li key={d.page} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 sm:grid-cols-[13rem_1fr_auto]">
            <span className={`text-sm ${d.worst ? "font-semibold text-text" : "text-text-muted"}`}>
              {d.page}
            </span>
            <span className="col-span-2 h-2.5 w-full overflow-hidden rounded-full bg-text/[0.07] sm:col-span-1">
              <span
                className={`block h-full rounded-full ${d.worst ? "bg-accent-warm" : "bg-purple/45"}`}
                style={{ width: `${(d.v / max) * 100}%` }}
              />
            </span>
            <span
              className={`text-right text-sm tabular-nums ${d.worst ? "font-semibold text-text" : "text-text-muted"}`}
            >
              {d.v}
            </span>
          </li>
        ))}
      </ul>
      <Caption>
        Revenue per visitor by landing page, indexed to the Classic MTB page at 100. GA4
        North America, 24 Apr to 11 Aug 2025, mid-June sale excluded. Of the six rack
        product pages, ProFlex, the premium one, earned the least per visit.
      </Caption>
    </figure>
  );
}

function Funnel() {
  return (
    <figure className="my-10 rounded-2xl border border-text/10 bg-cream-2/60 p-6 md:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-purple">
        Before the program
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-text">
        Where the funnel sat against benchmark
      </h3>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[30rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-text/15 text-left">
              <th className="py-2 pr-4 font-semibold text-text">Stage</th>
              <th className="py-2 pr-4 text-right font-semibold text-text">Steadyrack</th>
              <th className="py-2 pr-4 text-right font-semibold text-text-muted">Benchmark</th>
              <th className="py-2 text-right font-semibold text-text-muted">Gap</th>
            </tr>
          </thead>
          <tbody>
            {FUNNEL.map((r) => {
              const short = r.before < r.bm;
              const gap = r.before - r.bm;
              return (
                <tr key={r.stage} className="border-b border-text/10">
                  <td className="py-3 pr-4 text-text-muted">{r.stage}</td>
                  <td
                    className={`py-3 pr-4 text-right font-semibold tabular-nums ${
                      short ? "text-accent-warm" : "text-text"
                    }`}
                  >
                    {r.before.toFixed(1)}%
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums text-text-muted">
                    {r.bm}%
                  </td>
                  <td className="py-3 text-right tabular-nums text-text-muted">
                    {short ? `${gap.toFixed(1)}pp` : "Above"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Caption>
        North America, US and Canada, 24 Apr to 11 Aug 2025, the window before the program
        started, mid-June sale excluded. Landing and product stages from GA4; cart and
        checkout from Steadyrack&rsquo;s Shopify sessions with its bot classification applied.
        Product view to add-to-cart is the money step, and it was the furthest from benchmark.
      </Caption>
    </figure>
  );
}

/* Product mix, before against after. Mirrors the doughnut on the six-month
   review deck (slide 27); colours sampled from it. */
/* ProFlex Wide as a share of Wide + Classic MTB units, by month, Shopify NA.
   The two racks Steadyrack confirmed were unaffected by the range phase-out. */
const MIX_MONTHS = [
  { m: "Sep", y: "25", v: 46.0 },
  { m: "Oct", y: "25", v: 41.9 },
  { m: "Nov", y: "25", v: 44.8, promo: "Black Friday" },
  { m: "Dec", y: "25", v: 41.7 },
  { m: "Jan", y: "26", v: 43.4 },
  { m: "Feb", y: "26", v: 46.3 },
  { m: "Mar", y: "26", v: 42.3 },
  { m: "Apr", y: "26", v: 41.5 },
  { m: "May", y: "26", v: 49.6, after: true },
  { m: "Jun", y: "26", v: 44.3, after: true, promo: "Mid-year sale" },
  { m: "Jul", y: "26", v: 49.0, after: true },
  { m: "Aug", y: "26", v: 53.7, after: true },
];
const MIX_FLOOR = 30;
const MIX_CEIL = 60;
const MIX_TICKS = [30, 40, 50, 60];
const MIX_SIDE = [
  { v: "42.9%", l: "before their ad traffic was rerouted away from the page" },
  { v: "40.5%", l: "after the reroute, before the winning test went live" },
  { v: "48.0%", l: "after the test shipped" },
];

function Mix() {
  const span = MIX_CEIL - MIX_FLOOR;
  const pct = (v: number) => ((v - MIX_FLOOR) / span) * 100;
  return (
    <figure className="my-10 rounded-2xl border border-purple/25 bg-purple-soft/40 p-6 md:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-purple">
        The cleanest comparison
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-text">
        The premium rack took share the month the first win shipped
      </h3>

      <div className="mt-7 flex gap-3">
        <div className="flex h-56 flex-col justify-between pb-6 text-[10px] tabular-nums text-text-muted">
          {[...MIX_TICKS].reverse().map((t) => (
            <span key={t}>{t}%</span>
          ))}
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-x-0 top-0 h-56 pb-6">
            {MIX_TICKS.map((t) => (
              <span
                key={t}
                aria-hidden
                className="absolute inset-x-0 border-t border-text/10"
                style={{ bottom: `${(pct(t) / 100) * 100}%` }}
              />
            ))}
          </div>
          <ol className="relative flex h-56 items-end gap-1.5 sm:gap-2">
            {MIX_MONTHS.map((d, i) => (
              <li key={`${d.m}${d.y}`} className="relative flex h-full flex-1 flex-col justify-end">
                {i === 8 ? (
                  <span
                    aria-hidden
                    className="absolute -left-1 bottom-6 top-0 border-l-2 border-dashed border-purple/60"
                  />
                ) : null}
                <span className="mb-1 block text-center text-[10px] font-semibold tabular-nums text-text">
                  {d.v}
                </span>
                <span
                  className={`block w-full rounded-t-[3px] ${
                    d.after ? "bg-purple" : "bg-text/25"
                  } ${d.promo ? "opacity-50" : ""}`}
                  style={{ height: `${pct(d.v)}%` }}
                  title={d.promo ? `${d.m} ${d.y}: ${d.promo}` : `${d.m} ${d.y}`}
                />
                <span className="mt-1.5 block text-center text-[10px] leading-none text-text-muted">
                  {d.m}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-muted">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-text/25" />
          Before the first win
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-purple" />
          After
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-text/25 opacity-50" />
          Promotional month
        </span>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {MIX_SIDE.map((s2) => (
          <div key={s2.l} className="rounded-xl bg-cream p-4 text-center">
            <div className="text-lg font-semibold tracking-tight text-purple">{s2.v}</div>
            <div className="mt-1 text-xs leading-snug text-text-muted">{s2.l}</div>
          </div>
        ))}
      </div>

      <Caption>
        ProFlex Wide as a share of ProFlex Wide plus Classic MTB units, by month, from
        Steadyrack&rsquo;s own Shopify data. The dashed line is 24 April 2026, when the first
        winning test shipped to all traffic. These two racks were chosen because both were on
        sale throughout and neither was affected by the range changes elsewhere in the lineup.
        Share is used rather than volume, so the read is unaffected by traffic, seasonality,
        bot sessions or analytics tracking. Every month after the win sits above every month
        before it except the mid-year sale.
      </Caption>
    </figure>
  );
}

/* Revenue per visit to the ProFlex page, same months both years, each year
   restated against Shopify so the analytics capture change cancels out. */
const RPV_MONTHS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const RPV_2025 = [2.43, 1.86, 3.54, 5.88, 3.82, 3.52];
const RPV_2026 = [2.62, 3.97, 4.02, 6.34, 4.75, 4.37];
const RPV_MAX = 7;

function RpvYoY() {
  const W = 720, H = 250, L = 40, R = 12, T = 22, B = 30;
  const x = (i: number) => L + (i * (W - L - R)) / (RPV_MONTHS.length - 1);
  const y = (v: number) => T + (1 - v / RPV_MAX) * (H - T - B);
  const markX = (x(1) + x(2)) / 2 - (x(2) - x(1)) * 0.18;
  const line = (d: number[]) => d.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  return (
    <figure className="my-10 rounded-2xl border border-purple/25 bg-purple-soft/40 p-6 md:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-purple">
        Year on year, measured the same way
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-text">
        What a visit to the premium page was worth
      </h3>
      <div className="mt-6 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[34rem]"
          role="img"
          aria-label="Revenue per visit to the ProFlex page by month, 2025 against 2026. 2026 is higher in every month."
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((v) => (
            <g key={v}>
              <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="currentColor" className="text-text/10" />
              <text x={L - 7} y={y(v) + 4} textAnchor="end" fontSize="10" className="fill-text-muted">
                ${v}
              </text>
            </g>
          ))}
          {RPV_MONTHS.map((m, i) => (
            <text key={m} x={x(i)} y={H - 10} textAnchor="middle" fontSize="11" className="fill-text-muted">
              {m}
            </text>
          ))}
          <line
            x1={markX} x2={markX} y1={T} y2={H - B}
            stroke="currentColor" strokeWidth="2" strokeDasharray="5 4"
            className="text-purple/60"
          />
          <polyline points={line(RPV_2025)} fill="none" strokeWidth="3" strokeLinejoin="round"
            strokeLinecap="round" stroke="currentColor" className="text-text/30" />
          <polyline points={line(RPV_2026)} fill="none" strokeWidth="3" strokeLinejoin="round"
            strokeLinecap="round" stroke="currentColor" className="text-purple" />
          {RPV_2025.map((v, i) => (
            <g key={`a${i}`} className="text-text/40">
              <circle cx={x(i)} cy={y(v)} r="4" fill="var(--color-cream-2, #f3efe9)" stroke="currentColor" strokeWidth="3" />
              <text x={x(i)} y={y(v) + 19} textAnchor="middle" fontSize="10" fontWeight="700" className="fill-text-muted">
                ${v.toFixed(2)}
              </text>
            </g>
          ))}
          {RPV_2026.map((v, i) => (
            <g key={`b${i}`} className="text-purple">
              <circle cx={x(i)} cy={y(v)} r="4" fill="var(--color-cream-2, #f3efe9)" stroke="currentColor" strokeWidth="3" />
              <text x={x(i)} y={y(v) - 12} textAnchor="middle" fontSize="10" fontWeight="700" className="fill-purple">
                ${v.toFixed(2)}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-muted">
        <span className="flex items-center gap-2">
          <span className="h-[3px] w-4 rounded-full bg-text/30" />
          2025, before the program
        </span>
        <span className="flex items-center gap-2">
          <span className="h-[3px] w-4 rounded-full bg-purple" />
          2026
        </span>
        <span className="flex items-center gap-2">
          <span className="h-[3px] w-4 border-t-2 border-dashed border-purple/60" />
          First winning test shipped, 24 April
        </span>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {[
          { v: "$3.66", l: "March to August 2025" },
          { v: "$4.38", l: "March to August 2026" },
          { v: "+19.7%", l: "with both years measured the same way" },
        ].map((c) => (
          <div key={c.l} className="rounded-xl bg-cream p-4 text-center">
            <div className="text-lg font-semibold tracking-tight text-purple">{c.v}</div>
            <div className="mt-1 text-xs leading-snug text-text-muted">{c.l}</div>
          </div>
        ))}
      </div>
      <Caption>
        Revenue per session for visits landing on the ProFlex page, US and Canada, GA4, with each year
        restated against Steadyrack&rsquo;s Shopify totals so the capture change described above cancels
        out. Uncorrected, the same chart would read +84%, and that is the figure to ignore. The obvious
        objection is that 2026 simply had a warmer audience, since far more paid traffic landed here in
        2025. Inside paid social, the page&rsquo;s largest channel in both years and 43,000 sessions of it
        in 2025, revenue per visit rose 20.5%, which is the same answer the blended line gives. Two smaller
        channels disagree, direct most sharply, and direct is the least stable attribution on the page.
      </Caption>
    </figure>
  );
}

export default function SteadyrackVisual({ name }: { name: CaseStudyVisual }) {
  if (name === "sr-baseline-rpv") return <BaselineRpv />;
  if (name === "sr-research") return <Research />;
  if (name === "sr-funnel") return <Funnel />;
  if (name === "sr-mix") return <Mix />;
  if (name === "sr-rpv-yoy") return <RpvYoY />;
  return null;
}
