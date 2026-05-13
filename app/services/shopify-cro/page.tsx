import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import GuaranteeBlock from "@/components/GuaranteeBlock";

export const metadata = {
  title: "Shopify CRO · Conversion Rate Optimisation for Shopify",
  description:
    "Shopify conversion rate optimisation for $5M to $20M D2C brands. Research-led testing on PDP, checkout, and post-purchase. 35% win rate, $1M+ added revenue on a single engagement.",
  alternates: { canonical: "/services/shopify-cro" },
};

const surfaces = [
  { h: "PDP above the fold", p: "Headline that names the outcome, top two objections in line, real in-use imagery. Most PDPs nail one. Few nail three. The lift here typically compounds across every paid traffic source you run." },
  { h: "Checkout", p: "Trust density at payment, shipping-threshold mechanics, address-to-shipping speed. Shopify Checkout Extensibility unlocks tests that were impossible eighteen months ago. The checkout is the funnel step where small lifts move the most revenue." },
  { h: "Post-purchase upsells", p: "The thank-you page is the highest-converting surface in the funnel and almost nobody tests it. For one client a single post-purchase offer hit a twenty-six percent take rate inside the first quarter." },
  { h: "Collection pages used for paid traffic", p: "If you&rsquo;re paying Meta to send people to a collection, it&rsquo;s a landing page. Treat it like one. Restate the promise, prime the category, put proof above the grid." },
  { h: "Cart drawer cross-sells", p: "Recommendation logic that fires on basket composition lifts AOV in a way bundle-app defaults never will. The test is which logic, not whether to test." },
];

const mistakes = [
  {
    h: "Editing the live theme and calling it a test",
    p: "Save the theme, ship to everyone. That&rsquo;s not a test, that&rsquo;s a rollout. The variation needs to live behind a flag, the audience needs to be split properly, and the result needs to be measured against a clean control.",
  },
  {
    h: "Stacking app overlays that don&rsquo;t talk to each other",
    p: "Three review apps, two upsell apps, an exit-intent modal, a wheel-spin. Each one added in isolation. Together they slow the site, double-fire on the same visitor, and tank conversion on mobile.",
  },
  {
    h: "Believing the Shopify Reports dashboard",
    p: "Directional, not statistical. A twelve percent lift in conversion rate week-over-week could be a real test win or it could be Tuesday versus Thursday. The dashboard won&rsquo;t tell you which.",
  },
];

const loop = [
  { h: "Research", p: "Weeks one to four. GA4 funnel audit, review mining on Trustpilot and Shopify reviews, on-site survey, session recordings, customer interviews." },
  { h: "Prioritise", p: "Top five hypotheses ranked by expected revenue and the cost of being wrong. ICE-L scoring. Pre-test power analysis for surfaces where AOV variance is high." },
  { h: "Test", p: "Two to four shipped experiments per month. We write the code, your team reviews, we deploy through your testing tool. Integrations with Intelligems, GrowthBook, Convert, and ABTasty." },
  { h: "Call wins properly", p: "At least 95% probability-to-beat-baseline, three consecutive stable days, primary and secondary metrics in agreement, minimum order volume per arm." },
  { h: "Hardcode and learn", p: "Wins go into your theme and into the learnings library. Losses go into the learnings library. After twelve months you have a research asset, not a list of failed experiments." },
];

const faqs = [
  {
    q: "Which Shopify testing tool do you recommend?",
    a: "Intelligems if you want server-side rendering and tight Shopify integration. GrowthBook if budget is the constraint and you want to self-host. ABTasty or Convert if you already have a global enterprise license. We don&rsquo;t take referral fees from any of them.",
  },
  {
    q: "Will testing slow my site down?",
    a: "Done badly, yes. Most flicker comes from client-side test scripts running before the page renders. Server-side rendering and properly placed anti-flicker snippets remove it. We won&rsquo;t ship a test that adds more than fifty milliseconds to LCP on mobile.",
  },
  {
    q: "Do you only work with Shopify Plus?",
    a: "No. The methodology is the same. Standard Shopify has more theme constraints but the same surfaces matter.",
  },
  {
    q: "Can you work with our existing dev team?",
    a: "Preferred, actually. The cleanest engagements have your devs reviewing our code before it ships. It reduces the chance of theme conflicts and keeps everyone aligned on what is live.",
  },
  {
    q: "How long is the engagement?",
    a: "Twelve months. We don&rsquo;t sell three-month packages, because three months isn&rsquo;t enough to run a real testing program. The first ninety days cover research and the first two shipped tests.",
  },
  {
    q: "Do you take a percentage of the revenue uplift?",
    a: "No. Flat monthly retainer. Performance pricing on CRO incentivises agencies to call wins early and ship volume over quality. We run the loop on a fixed fee and keep score on revenue moved.",
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
      text: f.a.replace(/&rsquo;/g, "'").replace(/&lsquo;/g, "'"),
    },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Shopify Conversion Rate Optimisation",
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
    "Shopify conversion rate optimisation for $5M to $20M D2C brands. PDP, checkout, post-purchase, collection pages.",
};

export default function ShopifyCROPage() {
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
            <Breadcrumbs items={[{ label: "Services" }, { label: "Shopify CRO" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Services · Shopify CRO
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Shopify conversion rate optimisation for $5M to $20M D2C brands.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                Shopify makes it easy to launch a store. It does not make it easy to find the leaks. We run a research-led testing program on the surfaces that actually move revenue on Shopify, and we call wins with the kind of statistical rigour your CFO can sign off.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact#book"
                  data-ga-event="book_call_click"
                  data-ga-location="services_shopify_hero"
                  className="inline-flex items-center gap-2 rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
                >
                  Book a 15-min intro call
                </Link>
                <Link
                  href="/services/conversion-rate-optimisation"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
                >
                  Full conversion rate optimisation services
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Who this is for
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Shopify stores doing $5M to $20M that suspect they&rsquo;re testing the wrong things.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                You have GA4 or can install it next week. You have a testing tool installed, or you&rsquo;re choosing one. Your team has tested some things but isn&rsquo;t sure which moved revenue and which moved noise.
              </p>
              <p className="mt-4 text-lg text-text-muted">
                If you&rsquo;re under $1M ARR, save your budget for traffic. The volume math doesn&rsquo;t support a Shopify CRO program yet.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Where the money usually hides
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Five Shopify surfaces that account for most of what we ship.
              </h2>
            </Reveal>
            <ol className="mt-10 space-y-5">
              {surfaces.map((s, i) => (
                <Reveal key={s.h}>
                  <li className="flex gap-5 rounded-2xl border border-ink/10 bg-cream p-6">
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
            <div className="mt-10 text-center">
              <Link
                href="/blog/cro-for-shopify-where-to-look"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple hover:gap-3 transition-all"
              >
                Read the full Shopify CRO breakdown
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                What goes wrong
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Three Shopify-specific mistakes we see over and over.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {mistakes.map((m) => (
                <Reveal key={m.h}>
                  <div className="h-full rounded-2xl border border-ink/10 bg-white p-8">
                    <h3
                      className="text-xl font-semibold text-text"
                      dangerouslySetInnerHTML={{ __html: m.h }}
                    />
                    <p
                      className="mt-3 text-text-muted"
                      dangerouslySetInnerHTML={{ __html: m.p }}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                How we run a Shopify engagement
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Same loop. Shopify-specific instrumentation.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {loop.map((l, i) => (
                <Reveal key={l.h}>
                  <div className="rounded-2xl border border-ink/10 bg-cream p-6">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple">Step {i + 1}</p>
                    <h3 className="mt-2 text-xl font-semibold text-text">{l.h}</h3>
                    <p className="mt-2 text-text-muted">{l.p}</p>
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
                Verified numbers
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                One D2C client. Eighteen months. The loop, properly run.
              </h2>
              <div className="mt-10 grid gap-6 md:grid-cols-4">
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">$1M-$2M</p>
                  <p className="mt-2 text-sm text-text-muted">added revenue across the engagement</p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">180</p>
                  <p className="mt-2 text-sm text-text-muted">tests shipped through the program</p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">35%</p>
                  <p className="mt-2 text-sm text-text-muted">win rate, roughly double industry average</p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">26%</p>
                  <p className="mt-2 text-sm text-text-muted">take rate on a single post-purchase upsell</p>
                </div>
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
                Questions Shopify operators ask before booking.
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
