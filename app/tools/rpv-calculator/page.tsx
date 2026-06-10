import { Suspense } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WavyLines from "@/components/WavyLines";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import Calculator from "@/components/tools/rpv-calculator/Calculator";

export const metadata = {
  title: { absolute: "Revenue Per Visitor (RPV) Calculator · Impact Conversion" },
  description:
    "Free revenue per visitor (RPV) calculator. Model the incremental revenue and profit a CRO program could unlock, with a 12-month forecast and break-even analysis.",
  alternates: { canonical: "/tools/rpv-calculator" },
  keywords: [
    "revenue per visitor calculator",
    "rpv calculator",
    "revenue per session calculator",
    "cro revenue calculator",
    "ecommerce revenue forecast calculator",
  ],
};

const faqs = [
  {
    q: "What is revenue per visitor (RPV)?",
    a: "Total revenue divided by total sessions. It folds conversion rate and average order value into one number, so it tracks profitability better than conversion rate on its own.",
  },
  {
    q: "Why optimise for RPV instead of conversion rate?",
    a: "A test can lift conversion while quietly dropping average order value, leaving revenue flat or down. RPV catches that. It is the metric that actually tracks the money rather than just the count of orders.",
  },
  {
    q: "How do I increase revenue per visitor?",
    a: "Lift conversion rate, average order value, or both, through research-led testing on pricing, merchandising, and the path to purchase. This calculator forecasts the revenue impact of a given RPV lift across 12 months.",
  },
  {
    q: "How is the 12-month forecast calculated?",
    a: "It applies your target RPV lift across a ramp: month one is research with no lift yet, then a linear climb to full lift by the end of year one. The result is netted against program cost to show your break-even point.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Revenue Per Visitor Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Model the incremental revenue and profit a CRO program could unlock by lifting your revenue per visitor. 12-month forecast with break-even analysis.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  provider: {
    "@type": "Organization",
    name: "Impact Conversion",
    url: "https://impactconversion.com",
  },
};

export default function RpvCalculatorPage() {
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
                { label: "Revenue Per Visitor Calculator" },
              ]}
            />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Free tool
              </p>
              <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                Revenue Per Visitor Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                See how much revenue you could unlock by lifting your revenue per
                visitor, the metric that actually tracks profitability, not just
                conversion rate.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Suspense fallback={<div className="text-center text-text-muted py-20">Loading calculator…</div>}>
              <Calculator />
            </Suspense>
          </div>
        </section>

        <section className="bg-cream pb-20 md:pb-28">
          <div className="mx-auto max-w-3xl px-6">
            <div className="rounded-2xl border border-ink/10 bg-white p-8">
              <h2 className="text-xl font-semibold text-text">
                Why revenue per visitor, not conversion rate?
              </h2>
              <p className="mt-3 text-text-muted">
                Conversion rate tells you how many people buy. Revenue per visitor
                tells you how much money each session is worth. A test can lift
                conversion while quietly dropping average order value, leaving
                revenue flat or down. RPV catches that because it folds both
                metrics into one number.
              </p>
              <p className="mt-4 text-text-muted">
                This is the forecasting model we use inside{" "}
                <a href="/services/conversion-rate-optimisation" className="font-medium text-purple underline-offset-2 hover:underline">client engagements</a>{" "}
                to pressure-test whether a CRO program can pay for itself.
                Running a live test? Use the{" "}
                <a href="/tools/ab-calculator" className="font-medium text-purple underline-offset-2 hover:underline">A/B test calculator</a>{" "}
                to check significance and project when you can call it.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-cream pb-20 md:pb-28">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-black tracking-tight text-text">
              Revenue per visitor calculator FAQ
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
