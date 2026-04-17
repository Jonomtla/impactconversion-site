import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import ABCalculator from "@/components/tools/ab-calculator/Calculator";

export const metadata = {
  title: "A/B Test Significance Calculator",
  description:
    "Free two-tailed z-test calculator for A/B testing. Compute confidence, p-value, and lift from visitor and conversion counts.",
  alternates: { canonical: "/tools/ab-calculator" },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "A/B Test Significance Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Free two-tailed z-test calculator for A/B testing. Compute confidence, p-value, and lift from visitor and conversion counts.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: {
    "@type": "Organization",
    name: "Impact Conversion",
    url: "https://impactconversion.com",
  },
};

export default function ABCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <Nav />
      <main id="main">
        <section className="bg-ink text-cream pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="mx-auto max-w-4xl px-6">
            <Breadcrumbs
              items={[
                { label: "Tools", href: "/tools" },
                { label: "A/B Test Significance Calculator" },
              ]}
            />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Free tool
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                A/B Test Significance Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                Drop in visitors and conversions for each variation. Get
                confidence, p-value, and relative lift. Two-tailed z-test,
                pooled standard error. The same maths your testing platform
                uses at the end of the run.
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
