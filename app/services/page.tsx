import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import GuaranteeBlock from "@/components/GuaranteeBlock";

export const metadata = {
  title: "Services",
  description:
    "Three ways to engage with Impact Conversion. Conversion rate optimisation, Shopify CRO, and A/B testing. Same loop, different surface area. From NZD $4,000 per month.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    href: "/services/conversion-rate-optimisation",
    label: "Conversion rate optimisation",
    headline: "The full program. For brands ready to run a real testing loop.",
    body: "Research-led testing across your highest-leverage surfaces. PDP, checkout, post-purchase, webinar and launch funnels, collection pages. Two to four shipped experiments per month, called only when they meet the rule. Built for $5M to $20M D2C ecommerce and online education brands.",
  },
  {
    href: "/services/shopify-cro",
    label: "Shopify CRO",
    headline: "For Shopify operators who suspect they&rsquo;re testing the wrong things.",
    body: "Same loop, Shopify-specific instrumentation. Checkout Extensibility tests, post-purchase upsells, mobile-first PDP rebuilds, cart drawer logic. Tool-agnostic. We deploy through Intelligems, GrowthBook, Convert, or ABTasty.",
  },
  {
    href: "/services/ab-testing",
    label: "A/B testing",
    headline: "Statistical rigour for teams that have run testing programs that didn&rsquo;t move the revenue line.",
    body: "Pre-test power analysis, primary metric locked at brief time, Bayesian peeking under rules, stable-signal calling. The methodology that catches the false positives most programs ship without noticing.",
  },
];

const loop = [
  {
    h: "Research",
    p: "Surveys, session recordings, funnel analysis, review mining, customer interviews. Output is a ranked friction list in the customer&rsquo;s voice, not ours.",
  },
  {
    h: "Prioritise",
    p: "ICE-L scoring. Top tests scheduled with primary metric locked in the brief.",
  },
  {
    h: "Test",
    p: "Two to four shipped experiments per month. We write the code, your team reviews, we deploy through your testing tool.",
  },
  {
    h: "Compound",
    p: "Every test feeds the learnings library. Wins stack. Losses rule out hypotheses cheaply. The program gets sharper every quarter.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://impactconversion.com${s.href}`,
    name: s.label,
  })),
};

export default function ServicesIndexPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

        <section className="bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <Breadcrumbs items={[{ label: "Services" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Services
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Three ways to engage. Same loop, run on different surface area.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                Every engagement runs the same four-stage loop: research, prioritise, test, compound. The service you pick decides the surface area we cover and the tooling we plug into. Pricing starts at NZD $4,000 per month.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact#book"
                  data-ga-event="book_call_click"
                  data-ga-location="services_index_hero"
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
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Pick a starting point
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Three engagement shapes. One underlying methodology.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {services.map((s) => (
                <Reveal key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-8 transition-all hover:border-purple/40 hover:shadow-lg"
                  >
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple">
                      {s.label}
                    </p>
                    <h3
                      className="mt-3 text-xl font-semibold text-text"
                      dangerouslySetInnerHTML={{ __html: s.headline }}
                    />
                    <p className="mt-3 flex-1 text-text-muted">{s.body}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-purple group-hover:gap-2.5 transition-all">
                      Read the service page
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                The loop, common to every service
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Four stages. Run on every engagement.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                There is no secret method. There is a disciplined loop that runs on every engagement with the same four stages, month after month. That repetition is what makes the results compound.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {loop.map((l, i) => (
                <Reveal key={l.h}>
                  <div className="rounded-2xl border border-ink/10 bg-cream p-6">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple">
                      Stage {i + 1}
                    </p>
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
                Geo
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Based in Queenstown. Working with brands in NZ, AU, US, and the UK.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                If you&rsquo;re running an Australian or New Zealand brand, the geo-specific pages walk through what changes about the loop on your local stack: payment-method mix, GST display, EOFY messaging, state-by-state shipping economics.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/cro-agency-australia"
                  className="inline-flex items-center gap-2 rounded-full border border-purple/30 bg-white px-5 py-2 text-sm font-semibold text-purple transition-colors hover:bg-purple hover:text-white"
                >
                  CRO Agency Australia
                </Link>
                <Link
                  href="/cro-agency-nz"
                  className="inline-flex items-center gap-2 rounded-full border border-purple/30 bg-white px-5 py-2 text-sm font-semibold text-purple transition-colors hover:bg-purple hover:text-white"
                >
                  CRO Agency NZ
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <GuaranteeBlock />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
