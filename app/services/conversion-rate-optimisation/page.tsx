import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WavyLines from "@/components/WavyLines";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import GuaranteeBlock from "@/components/GuaranteeBlock";
import How from "@/components/How";
import VirtuousLoop from "@/components/VirtuousLoop";

export const metadata = {
  title: "Conversion Rate Optimisation Services",
  description:
    "Research-led conversion rate optimisation for direct-to-consumer brands. We find why visitors leave, ship the fixes, and compound the wins that move revenue.",
  alternates: { canonical: "/services/conversion-rate-optimisation" },
};

const surfaces = [
  { h: "PDP above the fold", p: "Headline that names the outcome, top two objections handled in line, in-use imagery. Most PDPs do one of these well. Almost none do all three." },
  { h: "Checkout", p: "Trust density at payment, shipping-threshold mechanics, post-purchase upsells. Shopify checkout has more headroom than most teams think, and Checkout Extensibility unlocks tests that were impossible eighteen months ago." },
  { h: "Webinar and launch funnels", p: "For online education brands: opt-in headline, urgency mechanics that don’t feel cheap, attendance-to-sale conversion in the replay window. The funnel between registration and purchase is where most of the revenue actually moves." },
  { h: "Collection and category pages for paid traffic", p: "If you run ads to a collection, it’s a landing page. Most teams treat it like a filing cabinet. Restate the promise, prime the category, put proof above the grid." },
  { h: "The free trial or onboarding flow", p: "For subscription and education brands: the first three sessions after signup decide whether the customer ever pays again. Most teams optimise the signup form and ignore everything after it." },
];

const faqs = [
  {
    q: "How long until I see results?",
    a: "The first shipped win usually lands inside the first ninety days. From there the wins compound, because each test sharpens the next.",
  },
  {
    q: "Who does the work?",
    a: "Us. Senior consultants and senior developers, start to finish. You don't get passed to a junior, and there is no account manager in the middle. You deal directly with the people designing and running your tests.",
  },
  {
    q: "Do you work with brands outside D2C?",
    a: "We focus on D2C. Sometimes the discipline travels, but that is where we are sharpest.",
  },
  {
    q: "Do you run paid media or SEO?",
    a: "No. Conversion rate optimisation is the one thing. No commission on platforms, no agency hours on traffic.",
  },
  {
    q: "What happens if a test loses?",
    a: "Most tests lose, across the whole industry. Losses still earn their keep: each one rules out a hypothesis cheaply and sharpens the next.",
  },
  {
    q: "What does it cost?",
    a: "Engagements start at $5,000 per month, billed monthly. Some clients kick off with a 90-day sprint and then move to month-to-month. The retainer covers research, prioritisation, the experiments we ship, the test code, the learnings library, and regular review calls.",
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
    "Research-led conversion rate optimisation for direct-to-consumer brands.",
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

        <section className="relative overflow-hidden bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <WavyLines />
          <div className="relative mx-auto max-w-4xl px-6">
            <Breadcrumbs items={[{ label: "Services" }, { label: "Conversion rate optimisation" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Services · Conversion rate optimisation
              </p>
              <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                Conversion rate optimisation for direct-to-consumer brands.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                You already pay for the traffic. Most of it leaves without doing what you wanted. We find out why, test the changes that actually move your revenue, and compound those wins into growth over time.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact#book"
                  data-ga-event="book_call_click"
                  data-ga-location="services_cro_hero"
                  className="inline-flex items-center gap-2 rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
                >
                  Book a 15-min intro call
                </Link>
                <Link
                  href="/how-we-work"
                  className="inline-flex items-center gap-2 rounded-xl border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
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
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                For the head of growth at a direct-to-consumer brand.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                You run paid traffic at scale. You have a CRO tool installed, or could install one in an afternoon. You suspect your current testing program is making noise without moving the revenue line.
              </p>
              <p className="mt-4 text-lg text-text-muted">
                Every month that leak compounds. The ad budget climbs, the conversion rate sits flat, and the revenue you should be capturing walks back out the door. Buying more traffic only makes the leak more expensive.
              </p>
              <p className="mt-4 text-lg text-text-muted">
                So we close it. Research-led testing on the surfaces that touch the most revenue, shipped as real experiments, and kept only when they prove out in your P&amp;L.
              </p>
            </Reveal>
          </div>
        </section>

        <How />

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
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
                      <p className="mt-1 text-text-muted">{s.p}</p>
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
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                One winner stays live. The revenue compounds.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                Every win is a permanent change to your site, so it keeps paying on the same ad spend month after month. Stack a year of them and the curve bends.
              </p>
            </Reveal>
            <div className="mt-10 rounded-3xl border border-ink/10 bg-cream p-8 md:p-12">
              <VirtuousLoop />
            </div>
            <div className="mt-8">
              <Link
                href="/tools/rpv-calculator"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple hover:gap-3 transition-all"
              >
                Model your own uplift in the revenue-per-visitor calculator
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
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Verified results from clients running this loop.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                One D2C client, eighteen months of the loop: $1.2M in added revenue across 180 tests, a sixty-nine percent lift on the homepage that compounded for the rest of the engagement, and a twenty-six percent take rate on a single post-purchase upsell.
              </p>
              <p className="mt-4 text-lg text-text-muted">
                One membership-education client: membership up fifty-seven percent and recurring revenue up sixty-three percent over nine months. Year-on-year members up forty-three percent. Qualified leads up thirty percent.
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
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Questions buyers ask before booking a call.
              </h2>
            </Reveal>
            <dl className="mt-10 space-y-6">
              {faqs.map((f) => (
                <Reveal key={f.q}>
                  <div className="rounded-2xl border border-ink/10 bg-cream p-6">
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
