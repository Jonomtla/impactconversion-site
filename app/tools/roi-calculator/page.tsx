import { Suspense } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Calculator from "@/components/tools/roi-calculator/Calculator";

export const metadata = {
  title: "CRO ROI Calculator",
  description:
    "Estimate the incremental revenue and profit a CRO program could unlock from your existing traffic. 12-month forecast with break-even analysis.",
  alternates: { canonical: "/tools/roi-calculator" },
};

export default function RoiCalculatorPage() {
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
                CRO ROI Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                See exactly how much revenue you could unlock from the traffic
                you&rsquo;re already paying for. Fields auto-sync as you type.
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
      </main>
      <Footer />
    </>
  );
}
