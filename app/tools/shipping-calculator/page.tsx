import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WavyLines from "@/components/WavyLines";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShippingCalculator from "@/components/tools/shipping-calculator/ShippingCalculator";

export const metadata = {
  title: "Free Shipping Profitability Calculator",
  description:
    "Model the net profitability of offering free shipping above a threshold. See break-even lift, scenario matrix, and per-bucket margin impact.",
  alternates: { canonical: "/tools/shipping-calculator" },
  keywords: [
    "free shipping calculator",
    "free shipping threshold calculator",
    "shipping profitability calculator",
    "ecommerce shipping calculator",
    "free shipping break even calculator",
  ],
};

const faqs = [
  {
    q: "How do I calculate whether free shipping is profitable?",
    a: "Compare the margin you lose on absorbed shipping against the extra revenue from the conversion lift free shipping creates. This calculator models both sides: it shows the break-even lift required and how different threshold and price combinations change the outcome.",
  },
  {
    q: "What is a free shipping threshold?",
    a: "A minimum order value customers must reach before shipping becomes free. Setting it above your average order value encourages larger carts, which can offset the cost of absorbing shipping. The calculator lets you model different thresholds to find the sweet spot.",
  },
  {
    q: "Does free shipping actually increase conversion rate?",
    a: "In most D2C stores, yes. Unexpected shipping costs are one of the top reasons for cart abandonment. The question is whether the conversion lift is large enough to cover the margin hit. That is exactly what this calculator answers.",
  },
  {
    q: "Should I A/B test free shipping before rolling it out?",
    a: "Yes. The calculator gives you a forecast, but real customer behaviour is the proof. Test the threshold as a pricing experiment and measure revenue per visitor, not just conversion rate, so you catch any average-order-value shifts.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free Shipping Profitability Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Model the net profitability of offering free shipping above a threshold. See break-even lift required and how different threshold/price combos play out.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ShippingCalculatorPage() {
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
                { label: "Free Shipping Profitability Calculator" },
              ]}
            />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Free tool
              </p>
              <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                Free Shipping Profitability Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                Model the net profitability of offering free shipping above a
                threshold. See the break-even lift required and how different
                threshold/price combos play out.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <ShippingCalculator />
          </div>
        </section>

        <section className="bg-cream pb-20 md:pb-28">
          <div className="mx-auto max-w-3xl px-6">
            <div className="rounded-2xl border border-ink/10 bg-white p-8">
              <h2 className="text-xl font-semibold text-text">
                The forecast is step one. Testing is step two.
              </h2>
              <p className="mt-3 text-text-muted">
                This calculator tells you whether a free shipping threshold is
                worth testing. The test itself tells you whether customers agree.
                Use the{" "}
                <a href="/tools/ab-calculator" className="font-medium text-purple underline-offset-2 hover:underline">A/B test calculator</a>{" "}
                to plan sample size and check significance, or the{" "}
                <a href="/tools/rpv-calculator" className="font-medium text-purple underline-offset-2 hover:underline">RPV calculator</a>{" "}
                to forecast broader revenue impact from a CRO program.
              </p>
              <p className="mt-4 text-sm text-text-muted">
                Shipping threshold tests are part of our{" "}
                <a href="/services/conversion-rate-optimisation" className="font-medium text-purple underline-offset-2 hover:underline">conversion rate optimisation service</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-cream pb-20 md:pb-28">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-black tracking-tight text-text">
              Free shipping calculator FAQ
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
