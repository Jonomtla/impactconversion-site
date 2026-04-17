import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import ShippingCalculator from "@/components/tools/shipping-calculator/ShippingCalculator";

export const metadata = {
  title: "Free Shipping Profitability Calculator",
  description:
    "Model the net profitability of offering free shipping above a threshold. See break-even lift, scenario matrix, and per-bucket margin impact.",
  alternates: { canonical: "/tools/shipping-calculator" },
};

export default function ShippingCalculatorPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="bg-ink text-cream pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Free tool
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
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
      </main>
      <Footer />
    </>
  );
}
