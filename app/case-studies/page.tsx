import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import CaseStudy from "@/components/CaseStudy";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/motion/Reveal";

export const metadata = {
  title: "Case studies — Impact Conversion",
  description: "Real results from real testing programs.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-ink text-cream pt-40 pb-24 md:pt-52 md:pb-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, var(--color-purple) 0%, transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Case studies
              </p>
              <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
                The proof is in{" "}
                <span className="text-gradient-glow">the P&amp;L.</span>
              </h1>
              <p className="mt-8 text-lg text-text-inv-muted md:text-xl">
                Not vanity metrics. Not pretty redesign screenshots. Revenue
                that showed up in the bank account.
              </p>
            </Reveal>
          </div>
        </section>

        <CaseStudy />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
