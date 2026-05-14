import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import GuaranteeBlock from "@/components/GuaranteeBlock";

export const metadata = {
  title: "Conversion Rate Optimisation Services",
  description:
    "Research-led conversion rate optimisation for $5M to $20M D2C ecommerce and online education brands. We find the leaks, ship the fixes, and prove the lift with statistical rigour.",
  alternates: { canonical: "/services/conversion-rate-optimisation" },
};

const outputs = [
  {
    h: "A ranked friction list in your customers' words",
    p: "Not &lsquo;users seem confused at checkout&rsquo;. The exact sentence three of them wrote in the survey. Surveys, session recordings, funnel analysis, review mining, customer interviews. The output is a research artefact, not a slide deck.",
  },
  {
    h: "A live testing pipeline that ships every fortnight",
    p: "Two to four experiments per month, prioritised by expected revenue and the cost of being wrong. ICE-L scoring. Pre-test power analysis. The brief locks the primary metric before launch.",
  },
  {
    h: "Verdicts that hold under scrutiny",
    p: "Tests called only when they meet the rule: at least 95% probability-to-beat-baseline, three consecutive stable days, primary and secondary metrics in agreement, minimum order count per arm.",
  },
  {
    h: "A learnings library that compounds",
    p: "Every test, win or loss, generates a one-paragraph insight. After twelve months you have a research asset, not a list of variations. Next quarter&rsquo;s hypotheses come from this quarter&rsquo;s data.",
  },
  {
    h: "Revenue moved",
    p: "The only number we keep score on. Reported in your currency, in your P&amp;L, with the test code hardcoded into your theme or platform on the way through.",
  },
];

const surfaces = [
  { h: "PDP above the fold", p: "Headline that names the outcome, top two objections handled in line, in-use imagery. Most PDPs do one of these well. Almost none do all three." },
  { h: "Checkout", p: "Trust density at payment, shipping-threshold mechanics, post-purchase upsells. Shopify checkout has more headroom than most teams think, and Checkout Extensibility unlocks tests that were impossible eighteen months ago." },
  { h: "Webinar and launch funnels", p: "For online education brands: opt-in headline, urgency mechanics that don&rsquo;t feel cheap, attendance-to-sale conversion in the replay window. The funnel between registration and purchase is where most of the revenue actually moves." },
  { h: "Collection and category pages for paid traffic", p: "If you run ads to a collection, it&rsquo;s a landing page. Most teams treat it like a filing cabinet. Restate the promise, prime the category, put proof above the grid." },
  { h: "The free trial or onboarding flow", p: "For subscription and education brands: the first three sessions after signup decide whether the customer ever pays again. Most teams optimise the signup form and ignore everything after it." },
];

const loop = [
  { h: "Research", p: "Weeks one to four. Surveys, session recordings, funnel analysis, review mining, customer interviews. Output is a ranked friction list in the customer&rsquo;s voice, not ours." },
  { h: "Prioritise", p: "ICE-L scoring. We wrote about why ICE alone breaks. Top two or three tests scheduled with the primary metric locked in the brief." },
  { h: "Test", p: "Two to four experiments per month. Code we write, code your team reviews, code that ships when both sides sign off. We deploy through your existing testing tool." },
  { h: "Compound", p: "Every test feeds the learnings library. We don&rsquo;t ship redesigns. We don&rsquo;t sell hours. The wins stack, the losses rule out hypotheses cheaply, and the program gets sharper every quarter." },
];

const faqs = [
  {
    q: "How long until I see results?",
    a: "The first shipped win usually lands inside the first ninety days. Compounding revenue typically shows up in months four to nine, once the learnings library has enough volume to feed back into hypothesis quality.",
  },
  {
    q: "Who does the work?",
    a: "Jono runs strategy and test-calling. A specialist developer writes test code under code review. You see who is on every Loom and every test brief.",
  },
  {
    q: "Do you work with brands outside D2C and online education?",
    a: "Sometimes. The discipline travels. The pattern recognition is sharper in the two categories we work in every day, which is why we lead with them.",
  },
  {
    q: "Do you run paid media or SEO?",
    a: "No. Conversion rate optimisation is the one thing. No commission on platforms, no agency hours on traffic.",
  },
  {
    q: "What happens if a test loses?",
    a: "Most do. Industry average sits around twenty percent win rate. Ours is closer to thirty-five percent. Losses still feed the learnings library and rule out hypotheses cheaply.",
  },
  {
    q: "What does it cost?",
    a: "Engagements start at NZD $4,000 per month. We run in 90-day sprints, and most clients run multiple sprints back to back. The retainer covers research, prioritisation, two to four shipped experiments per month, the test code, the learnings library, and monthly review calls.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a.replace(/&rsquo;/g, "'").replace(/&amp;/g, "&"),
    },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Conversion Rate Optimisation",
  provider: {
    "@type": "Organization",
    name: "Impact Conversion",
    url: "https://impactconversion.com",
  },
  areaServed: [
    { "@type": "Country", name: "New Zealand" },
    { "@type": "Country", name: "Australia" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  description:
    "Research-led conversion rate optimisation for $5M to $20M D2C ecommerce and online education brands.",
};

export default function CROServicePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

        <section className="bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <Breadcrumbs items={[{ label: "Services" }, { label: "Conversion rate optimisation" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Services · Conversion rate optimisation
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Conversion rate optimisation for $5M to $20M D2C ecommerce and online education brands.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                You already pay for the traffic. Most of it leaves without doing the thing you wanted them to do. We find out why, fix the worst of it first, and prove the lift with the kind of statistical discipline most agencies skip.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact#book"
                  data-ga-event="book_call_click"
                  data-ga-location="services_cro_hero"
                  className="inline-flex items-center gap-2 rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
                >
                  Book a 15-min intro call
                </Link>
                <Link
                  href="/how-we-work"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
                >
                  See how we work
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Who this is built for
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                The head of growth, founder, or CMO at a brand doing $5M to $20M.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                You run paid traffic at scale. You have a CRO tool installed or could install one in an afternoon. You suspect your current testing program is making noise without moving the revenue line.
              </p>
              <p className="mt-4 text-lg text-text-muted">
                If you do under $1M a year, the math doesn&rsquo;t work yet. You need traffic volume to detect real lifts. If you want &lsquo;ten quick conversion tips&rsquo;, wrong room.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                What we deliver
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Five outputs from every engagement.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                Most conversion rate optimisation agencies sell you a list of recommendations and call it a strategy. We run a research-led testing program built around five things you can hold in your hand.
              </p>
            </Reveal>
            <ol className="mt-10 space-y-5">
              {outputs.map((o, i) => (
                <Reveal key={o.h}>
                  <li className="flex gap-5 rounded-2xl border border-ink/10 bg-cream p-6">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-text">{o.h}</h3>
                      <p
                        className="mt-1 text-text-muted"
                        dangerouslySetInnerHTML={{ __html: o.p }}
                      />
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Where the wins usually hide
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Five surfaces that account for most of the revenue we move.
              </h2>
            </Reveal>
            <ol className="mt-10 space-y-5">
              {surfaces.map((s, i) => (
                <Reveal key={s.h}>
                  <li className="flex gap-5 rounded-2xl border border-ink/10 bg-white p-6">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-text">{s.h}</h3>
                      <p
                        className="mt-1 text-text-muted"
                        dangerouslySetInnerHTML={{ __html: s.p }}
                      />
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                How we run the engagement
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                One loop. Same shape on every engagement.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {loop.map((l, i) => (
                <Reveal key={l.h}>
                  <div className="rounded-2xl border border-ink/10 bg-cream p-6">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple">Step {i + 1}</p>
                    <h3 className="mt-2 text-xl font-semibold text-text">{l.h}</h3>
                    <p
                      className="mt-2 text-text-muted"
                      dangerouslySetInnerHTML={{ __html: l.p }}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                What the numbers look like
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Verified results from clients running this loop.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                One D2C client, eighteen months of the loop: $1M to $2M in added revenue, a thirty-five percent win rate across 180 tests, a sixty-nine percent lift on the homepage that compounded for the rest of the engagement, a twenty-six percent take rate on a single post-purchase upsell.
              </p>
              <p className="mt-4 text-lg text-text-muted">
                One online education client: four shipped wins inside the first six months. Plus fifty-seven percent. Plus sixty-three percent. Plus forty-three percent. Plus thirty percent. Different surface each time.
              </p>
              <p className="mt-4 text-lg text-text-muted">
                We don&rsquo;t promise either of those. We promise the loop, run with the same discipline, on your funnel.
              </p>
              <div className="mt-8">
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple hover:gap-3 transition-all"
                >
                  Read the full case studies
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Frequently asked
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Questions buyers ask before booking a call.
              </h2>
            </Reveal>
            <dl className="mt-10 space-y-6">
              {faqs.map((f) => (
                <Reveal key={f.q}>
                  <div className="rounded-2xl border border-ink/10 bg-cream p-6">
                    <dt className="text-lg font-semibold text-text">{f.q}</dt>
                    <dd
                      className="mt-2 text-text-muted"
                      dangerouslySetInnerHTML={{ __html: f.a }}
                    />
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <GuaranteeBlock />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
