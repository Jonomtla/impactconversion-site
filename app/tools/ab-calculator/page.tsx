import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WavyLines from "@/components/WavyLines";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import ABCalculator from "@/components/tools/ab-calculator/Calculator";

export const metadata = {
  title: { absolute: "A/B Test Significance & Duration Calculator · Impact Conversion" },
  description:
    "Free A/B test calculator: check statistical significance and confidence, work out the sample size you need, and see how many more days your test must run. Pre-test go/no-go plus live conversion rate and revenue per visitor analysis.",
  alternates: { canonical: "/tools/ab-calculator" },
  keywords: [
    "a/b test calculator",
    "ab test significance calculator",
    "ab test duration calculator",
    "ab test sample size calculator",
    "statistical significance calculator",
    "conversion rate test calculator",
  ],
};

const faqs = [
  {
    q: "How long should an A/B test run?",
    a: "Long enough to reach the sample size your effect needs, and at least two full weeks so weekday and weekend behaviour both land in the data. Paste your live numbers and days running into the calculator and it projects the additional days needed to reach 85% or 95% confidence at your current rate.",
  },
  {
    q: "What sample size do I need for an A/B test?",
    a: "It depends on your baseline conversion rate, the lift you want to detect, and your significance and power settings. Smaller lifts need far more traffic. The pre-test tab shows the per-variation sample size and whether you can realistically reach it in your test window.",
  },
  {
    q: "What is statistical significance in A/B testing?",
    a: "It is the probability the result is not down to chance. 95% significance means a 5% false-positive risk. This tool reports probability-to-beat-control so you can watch confidence build over time rather than reading a single pass or fail.",
  },
  {
    q: "Can I calculate revenue per visitor, not just conversion rate?",
    a: "Yes. The revenue-per-visitor tab handles continuous revenue data, which is driven by the coefficient of variation rather than a simple rate. It is the metric that tracks profitability, since a test can lift conversion while dropping average order value.",
  },
  {
    q: "When can I call an A/B test a winner?",
    a: "When you pre-committed the sample size, reached your significance threshold, and ran across at least two business cycles. Stopping at the first threshold crossing while peeking daily inflates false positives from 5% to 20 or 30 percent.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "A/B Test Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Free A/B test calculator. Pre-test go/no-go check, live conversion-rate analyzer, and revenue-per-visitor analyzer. Check significance, sample size, and the days your test still needs.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: {
    "@type": "Organization",
    name: "Impact Conversion",
    url: "https://impactconversion.com",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ABCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden bg-ink text-cream pt-32 pb-12 md:pt-40 md:pb-16">
          <WavyLines />
          <div className="relative mx-auto max-w-4xl px-6">
            <Breadcrumbs
              items={[
                { label: "Tools", href: "/tools" },
                { label: "A/B Test Calculator" },
              ]}
            />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Free tool
              </p>
              <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                A/B Test Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                Three calculators in one. Decide whether a test is worth
                briefing, paste in live data to see where you are, and project
                when the 85% or 95% threshold becomes reachable. Covers both
                conversion rate and revenue per visitor.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <ABCalculator />
          </div>
        </section>

        <section className="bg-cream pb-20 md:pb-28">
          <div className="mx-auto max-w-3xl px-6">
            <div className="rounded-2xl border border-ink/10 bg-white p-8">
              <h2 className="text-xl font-semibold text-text">
                A reminder before you ship the win
              </h2>
              <p className="mt-3 text-text-muted">
                Hitting 95% in this calculator is necessary, not sufficient.
                Three things worth checking before you call a test:
              </p>
              <ul className="mt-4 space-y-3 text-text-muted">
                <li>
                  <strong className="text-text">Sample size was pre-committed.</strong>{" "}
                  Peeking daily and stopping at the first crossing inflates
                  false positives from 5% to 20 to 30%.
                </li>
                <li>
                  <strong className="text-text">Test ran for at least two full business cycles.</strong>{" "}
                  Weekday and weekend traffic behave differently. A three-day
                  test captures one of them.
                </li>
                <li>
                  <strong className="text-text">Segments are hypothesis generation, not validation.</strong>{" "}
                  Slicing by device and re-running significance on the slice
                  is a false-positive factory.
                </li>
              </ul>
              <p className="mt-6 text-sm text-text-muted">
                This is the discipline behind our{" "}
                <a href="/services/ab-testing" className="font-medium text-purple underline-offset-2 hover:underline">A/B testing service</a>.
                Optimising for revenue, not just conversion rate? Try the{" "}
                <a href="/tools/rpv-calculator" className="font-medium text-purple underline-offset-2 hover:underline">revenue per visitor calculator</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-cream pb-20 md:pb-28">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-black tracking-tight text-text">
              A/B test calculator FAQ
            </h2>
            <dl className="mt-8 space-y-4">
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
      </main>
      <Footer />
    </>
  );
}
