import type { CaseStudyVisual } from "@/lib/case-studies";

/* Revenue per visitor by landing page, indexed to the Classic MTB PDP = 100. */
const BASELINE_RPV = [
  { page: "Collection (bike racks)", v: 107 },
  { page: "Classic MTB PDP", v: 100 },
  { page: "Homepage", v: 80 },
  { page: "ProFlex PDP", v: 48, worst: true },
];

const FUNNEL = [
  { stage: "Landing to product view", before: 49.5, after: 40.5, bm: 70 },
  { stage: "Product view to add to cart", before: 8.6, after: 10.0, bm: 12 },
  { stage: "Add to cart to checkout", before: 80.8, after: 84.0, bm: 60 },
  { stage: "Checkout completion", before: 49.0, after: 52.3, bm: 60 },
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
        North America, 24 Apr to 11 Aug 2025, mid-June sale excluded. ProFlex, the
        premium rack, was the worst-earning page on the site.
      </Caption>
    </figure>
  );
}

function Funnel() {
  return (
    <figure className="my-10 rounded-2xl border border-text/10 bg-cream-2/60 p-6 md:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-purple">
        Before and after
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-text">
        The funnel against benchmarks
      </h3>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[30rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-text/15 text-left">
              <th className="py-2 pr-4 font-semibold text-text">Stage</th>
              <th className="py-2 pr-4 text-right font-semibold text-text">Change, 2025 to 2026</th>
              <th className="py-2 text-right font-semibold text-text-muted">Against benchmark</th>
            </tr>
          </thead>
          <tbody>
            {FUNNEL.map((r) => {
              const moved = r.after > r.before;
              const change = ((r.after - r.before) / r.before) * 100;
              const status = r.after >= r.bm ? "Above" : "Still below";
              return (
                <tr key={r.stage} className="border-b border-text/10">
                  <td className="py-3 pr-4 text-text-muted">{r.stage}</td>
                  <td
                    className={`py-3 pr-4 text-right font-semibold tabular-nums ${
                      moved ? "text-purple" : "text-text-muted"
                    }`}
                  >
                    {change > 0 ? "+" : ""}
                    {change.toFixed(1)}%
                  </td>
                  <td className="py-3 text-right text-text-muted">{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Caption>
        North America, 24 Apr to 11 Aug each year, US and CA, bots excluded. Landing and
        product stages from GA4; cart and checkout from Shopify. The two steps the program
        set out to fix are the two that moved.
      </Caption>
    </figure>
  );
}

/* Product mix, before against after. Mirrors the doughnut on the six-month
   review deck (slide 27); colours sampled from it. */
const MIX_PURPLE = "#7C5AEC";
const MIX_GREY = "#A8AEC9";
const MIX = [
  { year: "2025", label: "ProFlex share, 2025", v: 44.4 },
  { year: "2026", label: "ProFlex share, 2026", v: 53.8 },
];
const MIX_SIDE = [
  { v: "50.6% \u2192 60.4%", l: "ProFlex share of rack revenue" },
  { v: "+19.6%", l: "ProFlex units YoY, on flat total volume" },
  { v: "4 months", l: "and holding, since the first win shipped" },
];

function Doughnut({ v, after }: { v: number; after?: boolean }) {
  const R = 54;
  const C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 140 140" className="h-32 w-32" role="img"
      aria-label={`ProFlex ${v}% of rack units, the rest Classic and other racks`}>
      <circle cx="70" cy="70" r={R} fill="none" stroke={MIX_GREY} strokeWidth="22" />
      <circle
        cx="70" cy="70" r={R} fill="none"
        stroke={MIX_PURPLE} strokeWidth="22"
        strokeDasharray={`${(v / 100) * C} ${C}`}
        transform="rotate(-90 70 70)"
        style={after ? { transition: "stroke-dasharray .6s ease" } : undefined}
      />
    </svg>
  );
}

function Mix() {
  return (
    <figure className="my-10 rounded-2xl border border-purple/25 bg-purple-soft/40 p-6 md:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-purple">
        The clearest read
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-text">
        ProFlex went from minority to majority
      </h3>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
        {MIX.map((d, i) => (
          <div key={d.year} className="contents">
            {i === 1 ? (
              <span aria-hidden className="text-2xl text-purple/50">&rarr;</span>
            ) : null}
            <figure className="m-0 text-center">
              <Doughnut v={d.v} after={i === 1} />
              <figcaption className="mt-3">
                <span
                  className={`block text-2xl font-semibold tracking-tight ${
                    i === 1 ? "text-purple" : "text-text-muted"
                  }`}
                >
                  {d.v}%
                </span>
                <span className="mt-0.5 block text-xs text-text-muted">{d.label}</span>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-muted">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: MIX_PURPLE }} />
          ProFlex
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: MIX_GREY }} />
          Classic + other racks
        </span>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {MIX_SIDE.map((s) => (
          <div key={s.l} className="rounded-xl bg-cream p-4 text-center">
            <div className="text-lg font-semibold tracking-tight text-purple">{s.v}</div>
            <div className="mt-1 text-xs leading-snug text-text-muted">{s.l}</div>
          </div>
        ))}
      </div>

      <Caption>
        Share of rack sales, Shopify, all channels, 24 Apr to 11 Aug, 2025 against 2026,
        mid-June sale excluded.
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
