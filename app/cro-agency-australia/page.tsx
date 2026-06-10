import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WavyLines from "@/components/WavyLines";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import GuaranteeBlock from "@/components/GuaranteeBlock";

export const metadata = {
  title: "CRO Agency Australia · Conversion Rate Optimisation",
  description:
    "An Australia-focused CRO agency for $5M to $20M D2C ecommerce brands. Research-led testing program, local timezone, AUD pricing, statistical rigour your CFO can sign off. Book a 15-minute call.",
  alternates: { canonical: "/cro-agency-australia" },
};

const problems = [
  {
    h: "Testing that doesn&rsquo;t move revenue",
    p: "You&rsquo;re running tests, but the wins never add up to anything you can see in the P&amp;L. Most of them turn out to be guesses dressed up as experiments.",
  },
  {
    h: "A generic checklist instead of your store",
    p: "Plenty of agencies arrive with the same twenty changes they make for everyone. Add a sticky bar, swap a button colour, call it optimisation. None of it is grounded in how your buyers actually behave.",
  },
  {
    h: "Results you can&rsquo;t take to the board",
    p: "A win you can&rsquo;t trust is worse than no win. When the call gets made on a hunch or a peek at half-significant data, it won&rsquo;t survive contact with the real world, and your CFO knows it.",
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
    p: "When a result won&rsquo;t survive the real world, we say so and move on. What ships is what we can still stand behind a month later.",
  },
];

const fit = [
  {
    h: "Your timezone, your hours",
    p: "We work AEDT and AEST. Test reviews land in your morning, and when a result needs a same-day decision you get an answer the same day, not overnight.",
  },
  {
    h: "AUD pricing, no FX surprises",
    p: "Engagements are priced and invoiced in AUD for Australian clients. No quoted-in-USD-then-rebilled-at-spot-rate, no invoice that swings ten percent on a bad week.",
  },
  {
    h: "Your team, your tools",
    p: "We work alongside your developers and inside the testing tool you already run. If you haven&rsquo;t picked one yet, we&rsquo;ll help you choose without taking a referral fee.",
  },
];

const faqs = [
  {
    q: "Are you based in Australia?",
    a: "No. We&rsquo;re based in New Zealand and work with Australian clients across AEDT and AEST. Calls land inside your business day, and test briefs are in your inbox by the time you start work. The timezone overlap is close enough that most clients forget we&rsquo;re not local.",
  },
  {
    q: "Which brands have you worked with?",
    a: "We work with D2C ecommerce brands in the $5M to $20M revenue band. You can read the full case studies, including engagements that have run twelve months or longer.",
  },
  {
    q: "Do you charge in AUD?",
    a: "Yes. Engagements are priced in AUD for Australian clients, with NZD or USD available on request.",
  },
  {
    q: "Will you work with our existing dev team?",
    a: "Preferred. The cleanest engagements have your developers reviewing our code before it ships, which keeps theme conflicts down and everyone aligned.",
  },
  {
    q: "Can you help us choose a CRO testing tool?",
    a: "Yes. Intelligems for Shopify, GrowthBook if you want to self-host, ABTasty or Convert for enterprise. We don&rsquo;t take referral fees, so the recommendation is honest.",
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
  description: "Conversion rate optimisation agency for Australian D2C ecommerce brands.",
  url: "https://impactconversion.com/cro-agency-australia",
  areaServed: { "@type": "Country", name: "Australia" },
  priceRange: "$$$",
  serviceType: "Conversion Rate Optimisation",
};

export default function CROAgencyAustraliaPage() {
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
            <Breadcrumbs items={[{ label: "CRO Agency Australia" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                For Australian brands
              </p>
              <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                A CRO agency for Australian D2C ecommerce brands.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                Conversion rate optimisation for $5M to $20M Australian Shopify brands. Every test starts with research into how your buyers actually shop, runs with the statistical rigour your CFO can sign off, and ships only when the result holds up.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact#book"
                  data-ga-event="book_call_click"
                  data-ga-location="geo_au_hero"
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
                    <h3
                      className="text-xl font-semibold text-text"
                      dangerouslySetInnerHTML={{ __html: c.h }}
                    />
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
                      <h3
                        className="text-lg font-semibold text-cream"
                        dangerouslySetInnerHTML={{ __html: s.h }}
                      />
                      <p
                        className="mt-1 text-text-inv-muted"
                        dangerouslySetInnerHTML={{ __html: s.p }}
                      />
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
                The practical fit for Australian brands.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {fit.map((c) => (
                <Reveal key={c.h}>
                  <div className="h-full rounded-2xl border border-ink/10 bg-cream p-8">
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

        {/* FAQ */}
        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Questions Australian operators ask before booking.
              </h2>
            </Reveal>
            <dl className="mt-10 space-y-6">
              {faqs.map((f) => (
                <Reveal key={f.q}>
                  <div className="rounded-2xl border border-ink/10 bg-white p-6">
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
