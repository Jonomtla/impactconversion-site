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

export const metadata = {
  title: { absolute: "CRO Agency Australia · Conversion Rate Optimisation" },
  description:
    "An Australia-focused CRO agency for D2C brands. Research-led testing program, local timezone, AUD pricing from $5,000 per month. Book a 15-minute call.",
  alternates: { canonical: "/cro-agency-australia" },
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
    h: "Results you can’t take to the board",
    p: "A win you can’t trust is worse than no win. When the call gets made on a hunch or a peek at half-significant data, it won’t survive contact with the real world, and your CFO knows it.",
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
    p: "We work alongside your developers and inside the testing tool you already run. If you haven’t picked one yet, we’ll help you choose without taking a referral fee.",
  },
];

const faqs = [
  {
    q: "Are you based in Australia?",
    a: "No. We’re based in New Zealand and work with Australian clients across AEDT and AEST. Calls land inside your business day, and test briefs are in your inbox by the time you start work. The timezone overlap is close enough that most clients forget we’re not local.",
  },
  {
    q: "Which brands have you worked with?",
    a: "D2C and online education brands doing 1,000+ orders a month or $1M+ a year in online revenue, up into the low tens of millions. Names like High Performance Academy, Animal Training Academy, and Kite Therapy. The full case studies are at /case-studies, including engagements that have run twelve months or longer.",
  },
  {
    q: "What does it cost?",
    a: "Engagements start at AUD $5,000 per month, priced and invoiced in AUD, and scale with scope. The retainer covers research, prioritisation, the experiments we ship, the test code, and regular review calls. Every engagement carries the guarantee: you see a revenue uplift, or you don’t pay.",
  },
  {
    q: "Will you work with our existing dev team?",
    a: "Preferred. The cleanest engagements have your developers reviewing our code before it ships, which keeps theme conflicts down and everyone aligned.",
  },
  {
    q: "Can you help us choose a CRO testing tool?",
    a: "Yes. We’re tool-agnostic across Intelligems, GrowthBook, Convert, and ABTasty, and we don’t take referral fees, so the recommendation is based on your stack and traffic, not on what pays us.",
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
  description: "Conversion rate optimisation agency for Australian D2C brands.",
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
          <div className="relative mx-auto max-w-6xl px-6">
            <Breadcrumbs items={[{ label: "CRO Agency Australia" }]} />
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-8">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                    CRO agency · Australia
                  </p>
                  <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                    More revenue from the traffic your Australian store already gets.
                  </h1>
                  <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                    Research-led A/B testing for Australian Shopify brands. We
                    find why your buyers leave, fix it, and keep only the
                    changes that lift revenue.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <a
                      href="#book"
                      data-ga-event="book_call_click"
                      data-ga-location="geo_au_hero"
                      className="inline-flex items-center gap-2 rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
                    >
                      Book a 15-min intro call
                    </a>
                    <span className="text-sm text-text-inv-muted">
                      From AUD $5,000/month, priced and invoiced in AUD
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
                      AEDT and AEST hours, same-day answers
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-cream/10 bg-ink-2 px-5 py-4">
                  <p className="text-2xl font-semibold text-cream">$1M+</p>
                  <p className="mt-1 text-sm text-text-inv-muted">added on one engagement</p>
                </div>
                <div className="rounded-xl border border-cream/10 bg-ink-2 px-5 py-4">
                  <p className="text-2xl font-semibold text-cream">180</p>
                  <p className="mt-1 text-sm text-text-inv-muted">tests shipped</p>
                </div>
                <div className="rounded-xl border border-cream/10 bg-ink-2 px-5 py-4">
                  <p className="text-2xl font-semibold text-cream">69%</p>
                  <p className="mt-1 text-sm text-text-inv-muted">largest single-test lift</p>
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

        <How />

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

        <GuaranteeBlock />

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
                    <dd className="mt-2 text-text-muted">{f.a}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <GeoBookingBand
          gaLocation="geo_au_booking"
          timezoneNote="Times shown in your timezone. Booked directly with Jono."
        />
      </main>
      <Footer />
    </>
  );
}
