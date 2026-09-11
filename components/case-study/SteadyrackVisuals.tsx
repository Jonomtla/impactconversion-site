import type { CaseStudyVisual } from "@/lib/case-studies";

/* Revenue per visitor by landing page, indexed to the Classic MTB PDP = 100. */
/* Revenue per human session by landing page, Shopify, indexed to the Classic MTB
   product page at 100. No analytics platform involved. */
const BASELINE_RPV = [
  { page: "Classic MTB PDP", v: 100 },
  { page: "Classic Road PDP", v: 94 },
  { page: "Homepage", v: 82 },
  { page: "ProFlex PDP", v: 45, worst: true },
];

/* Of every 100 human sessions, how many reached each stage. Shopify, US+CA,
   24 Apr to 10 Jun plus 1 Jul to 11 Aug 2025, before the program. */
const FUNNEL = [
  { stage: "Arrived", per100: 100.0 },
  { stage: "Added something to the cart", per100: 3.6 },
  { stage: "Reached the checkout", per100: 2.8 },
  { stage: "Bought", per100: 1.4 },
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
        Revenue per session by landing page, indexed to the Classic MTB product page at 100.
        Steadyrack&rsquo;s own Shopify data, human sessions only by Shopify&rsquo;s
        classification, US and Canada, 24 Apr to 11 Aug 2025. A visit that began on the
        premium rack&rsquo;s page was worth less than half a visit that began on the cheaper
        Classic MTB page.
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
        Where the other 98 went
      </h3>
      <ul className="mt-7 space-y-3">
        {FUNNEL.map((r, i) => (
          <li key={r.stage} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 sm:grid-cols-[15rem_1fr_auto]">
            <span className={`text-sm ${i === 0 ? "text-text-muted" : "font-medium text-text"}`}>
              {r.stage}
            </span>
            <span className="col-span-2 h-3 w-full overflow-hidden rounded-full bg-text/[0.07] sm:col-span-1">
              <span
                className={`block h-full rounded-full ${i === 0 ? "bg-text/20" : "bg-accent-warm"}`}
                style={{ width: `${Math.max(r.per100, 0.8)}%` }}
              />
            </span>
            <span className={`text-right text-sm tabular-nums ${i === 0 ? "text-text-muted" : "font-semibold text-text"}`}>
              {r.per100.toFixed(1)}
            </span>
          </li>
        ))}
      </ul>
      <Caption>
        Of every 100 sessions, how many reached each stage. Steadyrack&rsquo;s own Shopify
        data, human sessions only by Shopify&rsquo;s classification, US and Canada, 24 Apr to
        11 Aug 2025 with the mid-June sale excluded, before the program started. Ninety-six
        of every hundred visitors never put anything in the cart, which is where the work had
        to go.
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

export default function SteadyrackVisual({ name }: { name: CaseStudyVisual }) {
  if (name === "sr-baseline-rpv") return <BaselineRpv />;
  if (name === "sr-research") return <Research />;
  if (name === "sr-funnel") return <Funnel />;
  if (name === "sr-mix") return <Mix />;
  return null;
}
