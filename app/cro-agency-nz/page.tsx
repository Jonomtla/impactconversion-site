import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WavyLines from "@/components/WavyLines";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import GuaranteeBlock from "@/components/GuaranteeBlock";

export const metadata = {
  title: { absolute: "CRO Agency NZ · Conversion Rate Optimisation New Zealand" },
  description:
    "A New Zealand CRO agency for D2C brands, run from Queenstown. Research-led testing program, NZD pricing, local timezone, sized for the traffic NZ stores actually run.",
  alternates: { canonical: "/cro-agency-nz" },
};

const problems = [
  {
    h: "Testing that doesn’t move revenue",
    p: "You’re running tests, but the wins never add up to anything you can see in the P&L. Most of them turn out to be guesses dressed up as experiments.",
  },
  {
    h: "A generic checklist instead of your store",
    p: "Plenty of agencies arrive with the same twenty changes they make for everyone. Add a sticky bar, swap a button colour, call it optimisation. None of it is grounded in how your buyers actually behave.",
  },
  {
    h: "Offshore agencies that don’t fit NZ",
    p: "Results come back in your evening, you can’t get on a call without staying up late, and a program built for a $100M US brand quietly assumes traffic your store doesn’t have.",
  },
];

const steps = [
  {
    h: "Research how your buyers actually shop",
    p: "Review mining, on-site surveys, session recordings, funnel analysis. We find where your revenue is leaking before we touch a thing.",
  },
  {
    h: "Prioritise by opportunity and measurability",
    p: "Every idea gets ranked by how much it could move and how cleanly we can prove it. The biggest, most measurable leaks go first.",
  },
  {
    h: "Test with rigour you can sign off",
    p: "Each test is sized up front with a power analysis and run to a significance threshold we agree before launch. We call winners on the numbers, not on a feeling.",
  },
  {
    h: "Ship only what holds up",
    p: "When a result won’t survive the real world, we say so and move on. What ships is what we can still stand behind a month later.",
  },
];

const fit = [
  {
    h: "Local timezone, local accountability",
    p: "We’re NZ-based, so you’re not waiting until your evening for results or staying up late for a call. When a test needs a same-day decision, you get an answer the same day.",
  },
  {
    h: "NZD pricing, no FX surprises",
    p: "Engagements are priced and invoiced in NZD for New Zealand clients. No quoted-in-USD-then-rebilled-at-spot-rate, no invoice that swings ten percent on a bad week.",
  },
  {
    h: "Sized for the traffic you actually run",
    p: "NZ traffic is smaller than the US or AU, and that changes which tests are worth running and how long they need. We size every test up front, and if a surface can’t detect a lift you’d care about, we don’t run it.",
  },
];

const faqs = [
  {
    q: "Where are you based?",
    a: "Queenstown, NZ. We work with clients across the country, plus AU and offshore. Local clients sometimes prefer in-person workshops, which we’re happy to run quarterly.",
  },
  {
    q: "Do you only work with New Zealand brands?",
    a: "No. We work with brands across NZ, AU, US, and UK, and the methodology is the same everywhere. NZ-based clients get NZD pricing, your timezone, and the option of in-person work.",
  },
  {
    q: "What size brand do you work with?",
    a: "As a rough floor, around $1M in annual revenue for NZ-based brands, and a little higher in larger markets. Under that, the traffic-volume math doesn’t support a real testing program yet, so we’d tell you to put that budget into traffic until it does.",
  },
  {
    q: "Will the small NZ market hold the program back?",
    a: "Sometimes, on individual surfaces, and we handle it two ways. First, pre-test power analysis: if a surface can’t detect a lift you’d care about inside a reasonable window, we don’t run that test. Second, longer windows on borderline surfaces, paired with stricter calling rules. Most NZ brands have enough traffic to run a sensible program, and we don’t pretend otherwise when they don’t.",
  },
  {
    q: "Do you work with my testing tool?",
    a: "Probably. We’ve shipped tests through Intelligems, GrowthBook, Convert, ABTasty, and a few smaller platforms. If you don’t have a tool installed yet, we’ll help you pick one without taking a referral fee.",
  },
  {
    q: "Will you work with our existing dev team?",
    a: "Preferred. The cleanest engagements have your developers reviewing our code before it ships.",
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
    "New Zealand conversion rate optimisation agency for D2C brands.",
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

        {/* Hero */}
        <section className="relative overflow-hidden bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <WavyLines />
          <div className="relative mx-auto max-w-4xl px-6">
            <Breadcrumbs items={[{ label: "CRO Agency NZ" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                For New Zealand brands
              </p>
              <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                A New Zealand CRO agency for D2C brands.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                Conversion rate optimisation for New Zealand Shopify brands, run from Queenstown. Every test starts with research into how your buyers really shop, runs with the rigour your CFO can sign off, and is sized for the traffic NZ stores actually run.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact#book"
                  data-ga-event="book_call_click"
                  data-ga-location="geo_nz_hero"
                  className="inline-flex items-center gap-2 rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
                >
                  Book a 15-min intro call
                </Link>
                <Link
                  href="/services/conversion-rate-optimisation"
                  className="inline-flex items-center gap-2 rounded-xl border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
                >
                  How we run engagements
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-text-inv-muted">
                <span><strong className="font-semibold text-cream">$1M-$2M</strong> added on one engagement</span>
                <span><strong className="font-semibold text-cream">180 tests</strong> shipped</span>
                <span><strong className="font-semibold text-cream">12-month+</strong> retained clients</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Problem */}
        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Most CRO programs stall for the same three reasons.
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-text-muted">
                If you&rsquo;re already testing and the numbers aren&rsquo;t moving, the problem usually isn&rsquo;t effort. It&rsquo;s one of these three, and they&rsquo;re a big part of{" "}
                <Link href="/blog/why-most-cro-programs-fail" className="font-medium text-purple hover:underline">
                  why most CRO programs fail
                </Link>
                .
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {problems.map((c) => (
                <Reveal key={c.h}>
                  <div className="h-full rounded-2xl border border-ink/10 bg-white p-8">
                    <h3 className="text-xl font-semibold text-text">{c.h}</h3>
                    <p className="mt-3 text-text-muted">{c.p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Mechanism (dark band) */}
        <section className="bg-ink text-cream py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                How we work
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                It isn&rsquo;t a playbook. It&rsquo;s research.
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                There&rsquo;s no fixed list of changes that works on every store. What lifts revenue on yours is hiding in how your specific buyers shop, so that&rsquo;s where every engagement starts. It&rsquo;s the same approach behind{" "}
                <Link href="/blog/what-evergreen-cro-research-looks-like" className="font-medium text-purple-2 hover:underline">
                  evergreen CRO research
                </Link>
                .
              </p>
            </Reveal>
            <ol className="mt-10 space-y-5">
              {steps.map((s, i) => (
                <Reveal key={s.h}>
                  <li className="flex gap-5 rounded-2xl border border-cream/10 bg-ink-2 p-6">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-cream">{s.h}</h3>
                      <p className="mt-1 text-text-inv-muted">{s.p}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Proof */}
        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Eighteen months on one D2C engagement.
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-text-muted">
                The same loop, run properly, compounding month after month.
              </p>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">$1M-$2M</p>
                  <p className="mt-2 text-sm text-text-muted">added revenue across the engagement</p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">180 tests</p>
                  <p className="mt-2 text-sm text-text-muted">shipped, with a thirty-five percent win rate</p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">69%</p>
                  <p className="mt-2 text-sm text-text-muted">lift on the homepage that compounded for the rest of the engagement</p>
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

        {/* Practical fit */}
        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                The practical fit for New Zealand brands.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {fit.map((c) => (
                <Reveal key={c.h}>
                  <div className="h-full rounded-2xl border border-ink/10 bg-cream p-8">
                    <h3 className="text-xl font-semibold text-text">{c.h}</h3>
                    <p className="mt-3 text-text-muted">{c.p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Questions NZ operators ask before booking.
              </h2>
            </Reveal>
            <dl className="mt-10 space-y-6">
              {faqs.map((f) => (
                <Reveal key={f.q}>
                  <div className="rounded-2xl border border-ink/10 bg-white p-6">
                    <dt className="text-lg font-semibold text-text">{f.q}</dt>
                    <dd className="mt-2 text-text-muted">{f.a}</dd>
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
