import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import GuaranteeBlock from "@/components/GuaranteeBlock";

export const metadata = {
  title: "CRO Agency NZ · Conversion Rate Optimisation New Zealand",
  description:
    "A New Zealand CRO agency for $3M to $20M D2C ecommerce and online education brands. Local timezone, NZD pricing, research-led testing program. Based in Queenstown.",
  alternates: { canonical: "/cro-agency-nz" },
};

const nzContext = [
  {
    h: "Local timezone, local accountability",
    p: "Most NZ ecommerce brands have run into the same problem with overseas CRO agencies: results come back in your evening, you can&rsquo;t get on a call without staying up late, and a result that needs a same-day decision waits a day. We&rsquo;re NZ-based. That goes away.",
  },
  {
    h: "NZD pricing without FX surprises",
    p: "Engagements are priced in NZD for New Zealand clients. No quoted-USD-then-rebilled-at-spot-rate, no monthly invoice that swings by ten percent on a bad week. NZD in, NZD out.",
  },
  {
    h: "Understanding the small-market math",
    p: "New Zealand traffic volumes are smaller than US or AU. That changes which tests are runnable, which surfaces are worth optimising, and how long tests need to run to detect a real lift. Most playbooks written for $100M US brands don&rsquo;t apply.",
  },
  {
    h: "The full NZ ecommerce stack",
    p: "Shopify, Afterpay NZ, Laybuy, Klarna, POLi, Account2Account, NZ Post and NZ Couriers integration, GST-inclusive pricing display. We know the stack because most NZ brands run a version of it.",
  },
];

const surfaces = [
  { h: "PDP above the fold", p: "Headline that names the outcome, top two objections handled in line, in-use imagery. Most PDPs on NZ stores inherit US theme defaults that don&rsquo;t reflect local buyer behaviour." },
  { h: "Checkout", p: "Trust density at payment, BNPL placement, free-shipping mechanics tuned to actual NZ Post and NZ Couriers economics." },
  { h: "Post-purchase upsells", p: "The thank-you page is the highest-converting surface in the funnel and almost nobody tests it." },
  { h: "Collection pages for paid traffic", p: "If you&rsquo;re paying Meta to send buyers to a collection, it&rsquo;s a landing page. Treat it like one." },
  { h: "Webinar funnels for course brands", p: "For NZ online education and coaching brands: opt-in headline, urgency mechanics that don&rsquo;t feel cheap, attendance-to-sale conversion in the replay window." },
];

const faqs = [
  {
    q: "Where are you based?",
    a: "Queenstown, NZ. We work with clients across the country, plus AU and offshore. Local clients sometimes prefer in-person workshops, which we&rsquo;re happy to run quarterly.",
  },
  {
    q: "Do you only work with New Zealand brands?",
    a: "No. We work with brands across NZ, AU, US, and UK. The methodology is the same. NZ-based clients get NZD pricing, local timezone, and the option of in-person work.",
  },
  {
    q: "What size brand do you work with?",
    a: "$3M to $20M revenue for NZ-based clients, slightly higher for larger markets. Under $1M and the traffic-volume math doesn&rsquo;t support a real testing program. Save that budget for traffic until it does.",
  },
  {
    q: "Will the small NZ market hold the program back?",
    a: "Sometimes, on individual surfaces. We address it two ways. First, pre-test power analysis. If a surface can&rsquo;t detect a lift you&rsquo;d care about inside a reasonable test window, we don&rsquo;t run that test. Second, longer test windows on borderline surfaces, paired with stricter calling rules. Most NZ brands have enough traffic to run a sensible program. We just don&rsquo;t pretend otherwise when they don&rsquo;t.",
  },
  {
    q: "Do you work with my testing tool?",
    a: "Probably. We&rsquo;ve shipped tests through Intelligems, GrowthBook, Convert, ABTasty, and a few smaller platforms. If you don&rsquo;t have a tool installed, we&rsquo;ll help you pick one without taking a referral fee.",
  },
  {
    q: "Will you work with our existing dev team?",
    a: "Preferred. The cleanest engagements have your devs reviewing our code before it ships.",
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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Impact Conversion",
  description:
    "New Zealand conversion rate optimisation agency for D2C ecommerce and online education brands.",
  url: "https://impactconversion.com/cro-agency-nz",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Queenstown",
    addressCountry: "NZ",
  },
  areaServed: { "@type": "Country", name: "New Zealand" },
  priceRange: "$$$",
  serviceType: "Conversion Rate Optimisation",
};

export default function CROAgencyNZPage() {
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        <section className="bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <Breadcrumbs items={[{ label: "CRO Agency NZ" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                For New Zealand brands
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                A New Zealand CRO agency for D2C ecommerce and online education brands.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                Conversion rate optimisation for $3M to $20M NZ ecommerce and course brands. Based in Queenstown. NZD pricing, local timezone, research-led testing program built for the volumes NZ stores actually run.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact#book"
                  data-ga-event="book_call_click"
                  data-ga-location="geo_nz_hero"
                  className="inline-flex items-center gap-2 rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
                >
                  Book a 15-min intro call
                </Link>
                <Link
                  href="/services/conversion-rate-optimisation"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
                >
                  How we run engagements
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Why local matters
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Four reasons NZ brands choose a local CRO agency.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {nzContext.map((c) => (
                <Reveal key={c.h}>
                  <div className="h-full rounded-2xl border border-ink/10 bg-white p-8">
                    <h3 className="text-xl font-semibold text-text">{c.h}</h3>
                    <p
                      className="mt-3 text-text-muted"
                      dangerouslySetInnerHTML={{ __html: c.p }}
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
                Where we tend to find the wins
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Five surfaces that account for most of what we ship.
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
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Verified numbers
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Eighteen months on one D2C engagement.
              </h2>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">$1M-$2M</p>
                  <p className="mt-2 text-sm text-text-muted">added revenue across the engagement</p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">180 tests</p>
                  <p className="mt-2 text-sm text-text-muted">shipped, thirty-five percent win rate</p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">69%</p>
                  <p className="mt-2 text-sm text-text-muted">homepage lift that compounded</p>
                </div>
              </div>
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
                Questions NZ operators ask before booking.
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
