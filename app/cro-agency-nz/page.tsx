import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WavyLines from "@/components/WavyLines";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import GuaranteeBlock from "@/components/GuaranteeBlock";
import How from "@/components/How";
import GeoBookingBand from "@/components/GeoBookingBand";
import VerifiedProofStrip from "@/components/VerifiedProofStrip";

export const metadata = {
  title: { absolute: "CRO Agency NZ · Conversion Rate Optimisation New Zealand" },
  description:
    "A New Zealand CRO agency for D2C brands, run from Queenstown. Research-led testing program, NZD pricing, local timezone, sized for the traffic NZ stores actually run.",
  alternates: { canonical: "/cro-agency-nz" },
};

const problems = [
  {
    h: "Tests that never reach a verdict",
    p: "A test runs for three weeks, the numbers wobble, somebody calls it. On New Zealand traffic most experiments never gather enough data to separate a real lift from noise, so the program quietly ships coin flips and calls them wins.",
  },
  {
    h: "A program sized for someone else’s traffic",
    p: "Imported playbooks assume the visitor counts of a US brand. Run that same list on a NZ store and half the surfaces on it cannot produce a readable result no matter how long you leave them running.",
  },
  {
    h: "Offshore agencies that don’t fit how you work",
    p: "Results land in your evening, a same-day decision takes two days, and the person who designed your test is three handoffs away from the call you are actually on.",
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
    a: "As a rough floor, 1,000+ orders or bookings a month or $1M+ a year in online revenue. Under that, the traffic-volume math doesn’t support a real testing program yet, so we’d tell you to put that budget into traffic until it does.",
  },
  {
    q: "What does it cost?",
    a: "Engagements start at NZD $5,000 per month, priced and invoiced in NZD, and scale with scope. The retainer covers research, prioritisation, the experiments we ship, the test code, and regular review calls. Every 90-day sprint carries the guarantee: if there is no measurable revenue uplift by the end, we refund the final 50% of the sprint fee.",
  },
  {
    q: "Will the small NZ market hold the program back?",
    a: "Sometimes, on individual surfaces. Before any test launches we check the page gets enough traffic to detect a lift you’d care about inside a reasonable window, and if it can’t, we don’t run that test. Borderline surfaces get longer windows. Most NZ brands have enough traffic to run a sensible program, and we don’t pretend otherwise when they don’t.",
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

// References the sitewide business entity declared in app/layout.tsx rather
// than declaring a second, competing one. Google merges on @id; two unlinked
// ProfessionalService nodes for the same business split the entity.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://impactconversion.com/cro-agency-nz#service",
  name: "Conversion Rate Optimisation, New Zealand",
  description:
    "Research-led conversion rate optimisation and A/B testing for New Zealand D2C and ecommerce brands, with every test power-sized against local traffic volumes before launch.",
  serviceType: "Conversion Rate Optimisation",
  url: "https://impactconversion.com/cro-agency-nz",
  provider: { "@id": "https://impactconversion.com/#localbusiness" },
  areaServed: [
    { "@type": "Country", name: "New Zealand" },
    { "@type": "AdministrativeArea", name: "Auckland" },
    { "@type": "AdministrativeArea", name: "Wellington" },
    { "@type": "AdministrativeArea", name: "Canterbury" },
    { "@type": "AdministrativeArea", name: "Otago" },
  ],
  offers: {
    "@type": "Offer",
    priceCurrency: "NZD",
    price: "5000",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      priceCurrency: "NZD",
      price: "5000",
      unitCode: "MON",
      description: "From NZD $5,000 per month",
    },
  },
};

export default function CROAgencyNZPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
          }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <WavyLines />
          <div className="relative mx-auto max-w-6xl px-6">
            <Breadcrumbs items={[{ label: "CRO Agency NZ" }]} />
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-8">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                    CRO agency · New Zealand
                  </p>
                  <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                    New Zealand traffic is too scarce to spend on guesswork.
                  </h1>
                  <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                    Research-led A/B testing for New Zealand Shopify brands, run
                    from Queenstown. Every test is sized against your real
                    traffic before it is briefed, so you find out whether a
                    change actually worked instead of arguing about it. Start with a free
                    15-minute Leaky Funnel Game Plan: we look at your funnel
                    live, show you where it leaks, and you keep the plan either
                    way.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <a
                      href="#book"
                      data-ga-event="book_call_click"
                      data-ga-location="geo_nz_hero"
                      className="inline-flex items-center gap-2 rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
                    >
                      Book your free Game Plan
                    </a>
                    <span className="text-sm text-text-inv-muted">
                      From NZD $5,000/month, priced and invoiced in NZD
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <div className="rounded-2xl border border-cream/10 bg-ink-2 p-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/assets/avatar-jono.png"
                        alt="Jono Matla"
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-cream">Jono Matla</p>
                        <p className="text-sm text-text-inv-muted">
                          Founder · Queenstown
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-text-inv-muted">
                      &ldquo;You deal directly with the person designing and
                      running your tests.&rdquo;
                    </p>
                    <p className="mt-3 text-sm font-medium text-purple-2">
                      Your timezone, same-day answers
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-cream/10 bg-ink-2 px-5 py-4">
                  <p className="text-2xl font-semibold text-cream">$1M-$2M</p>
                  <p className="mt-1 text-sm text-text-inv-muted">added on one engagement</p>
                </div>
                <div className="rounded-xl border border-cream/10 bg-ink-2 px-5 py-4">
                  <p className="text-2xl font-semibold text-cream">180</p>
                  <p className="mt-1 text-sm text-text-inv-muted">tests shipped</p>
                </div>
                <div className="rounded-xl border border-cream/10 bg-ink-2 px-5 py-4">
                  <p className="text-2xl font-semibold text-cream">28%</p>
                  <p className="mt-1 text-sm text-text-inv-muted">verified lift, still holding</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-b border-ink/5 bg-cream py-6">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-4 px-6">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              Trusted by
            </span>
            <Image src="/assets/logos/hpa.png" alt="High Performance Academy" width={800} height={525} className="h-10 w-auto opacity-70 grayscale mix-blend-multiply" />
            <Image src="/assets/logos/steadyrack.png" alt="Steadyrack" width={800} height={123} className="h-5 w-auto opacity-70 grayscale mix-blend-multiply" />
            <Image src="/assets/logos/kite-therapy.png" alt="Kite Therapy" width={800} height={140} className="h-5 w-auto opacity-70 grayscale mix-blend-multiply" />
            <Image src="/assets/logos/topmusic.png" alt="Topmusic" width={800} height={154} className="h-6 w-auto opacity-70 grayscale mix-blend-multiply" />
          </div>
        </section>

        <VerifiedProofStrip />

        {/* Problem */}
        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Why CRO programs stall on New Zealand traffic.
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-text-muted">
                If you&rsquo;re already testing and the numbers aren&rsquo;t moving, the problem usually isn&rsquo;t effort. It&rsquo;s one of these three.
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

        <How />

        {/* Practical fit */}
        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                What a New Zealand agency actually changes.
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
            <Reveal>
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

        {/* NZ traffic sizing — the NZ-specific substance */}
        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                How much traffic does a New Zealand store need to test?
              </h2>
              <p className="mt-5 max-w-3xl text-lg text-text-muted">
                This is the question that decides whether a CRO program works
                here, and most agencies will not answer it before they invoice
                you. Three things set it: the conversion rate of the surface
                today, the size of the lift you would actually care about, and
                how many people reach that surface each week.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Reveal>
                <div className="h-full rounded-2xl border border-ink/10 bg-white p-8">
                  <h3 className="text-xl font-semibold text-text">
                    Surfaces that usually work
                  </h3>
                  <p className="mt-3 text-text-muted">
                    Product pages, cart, and checkout carry most of your
                    traffic, so they reach a readable result inside a sensible
                    window on almost every NZ store above the revenue floor.
                    This is where a NZ program should spend its first quarter.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div className="h-full rounded-2xl border border-ink/10 bg-white p-8">
                  <h3 className="text-xl font-semibold text-text">
                    Surfaces that often cannot
                  </h3>
                  <p className="mt-3 text-text-muted">
                    Deep category pages, single campaign landing pages and
                    niche collections frequently do not see enough visitors in
                    New Zealand to detect anything short of an enormous lift.
                    Testing them anyway produces numbers, not answers.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div className="h-full rounded-2xl border border-ink/10 bg-white p-8">
                  <h3 className="text-xl font-semibold text-text">
                    What we do about it
                  </h3>
                  <p className="mt-3 text-text-muted">
                    Every test gets a power analysis before it is briefed. If a
                    surface cannot detect a lift worth having, we either widen
                    the window, change what we measure, or make the change on
                    judgment and say plainly that it was judgment, not a
                    result.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal>
              <p className="mt-8 max-w-3xl text-text-muted">
                The reason this matters more here than in the US is arithmetic,
                not theory. Smaller samples make it far easier to record a win
                that was never there, which is{" "}
                <Link href="/blog/ab-tests-statistically-broken" className="font-medium text-purple hover:underline">
                  how most A/B tests end up statistically broken
                </Link>{" "}
                and what makes{" "}
                <Link href="/blog/cost-of-a-false-positive" className="font-medium text-purple hover:underline">
                  a false positive so expensive
                </Link>{" "}
                once it is rolled out and quietly costing you revenue.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Trans-Tasman */}
        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Selling into Australia as well?
              </h2>
              <p className="mt-5 max-w-3xl text-lg text-text-muted">
                Most New Zealand brands that reach the revenue floor are already
                shipping across the Tasman, and the two markets do not behave the
                same way. Payment method order, GST display, shipping thresholds
                and the freight expectations of an Australian buyer all differ
                enough to change which tests belong at the top of the list.
              </p>
              <p className="mt-4 max-w-3xl text-text-muted">
                We run both sides from the same program, so an AU rollout does
                not mean a second agency and a second research phase. The{" "}
                <Link href="/cro-agency-australia" className="font-medium text-purple hover:underline">
                  CRO agency Australia
                </Link>{" "}
                page covers the AU-specific stack, and{" "}
                <Link href="/blog/conversion-rate-optimisation-australia-anz-market" className="font-medium text-purple hover:underline">
                  what changes across the ANZ market
                </Link>{" "}
                walks through the differences test by test. If Shopify is your
                platform, the{" "}
                <Link href="/services/shopify-cro" className="font-medium text-purple hover:underline">
                  Shopify CRO
                </Link>{" "}
                service is the delivery shape, and{" "}
                <Link href="/how-we-work" className="font-medium text-purple hover:underline">
                  how we work
                </Link>{" "}
                sets out the loop end to end.
              </p>
            </Reveal>
          </div>
        </section>

        <GuaranteeBlock ctaHref="#book" />

        {/* FAQ */}
        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Straight answers for New Zealand operators.
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

        <GeoBookingBand
          gaLocation="geo_nz_booking"
          timezoneNote="Times shown in NZST. Booked directly with Jono."
        />
      </main>
      <Footer />
    </>
  );
}
