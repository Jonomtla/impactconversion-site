import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import About from "@/components/About";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "About · Impact Conversion",
  description: "Why we run narrow, on purpose.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-ink text-cream pt-40 pb-24 md:pt-52 md:pb-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 20% 30%, var(--color-purple) 0%, transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6">
            <Breadcrumbs items={[{ label: "About" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                About
              </p>
              <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
                We believe most sites leak revenue{" "}
                <span className="text-gradient-glow">because nobody&apos;s testing.</span>
              </h1>
              <p className="mt-8 text-lg text-text-inv-muted md:text-xl">
                Founded by Jono Matla. Built around the idea that revenue comes
                from running the loop, not from one big redesign.
              </p>
            </Reveal>
          </div>
        </section>

        <About />

        <section className="bg-cream py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                What we believe
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
                Three principles.{" "}
                <span className="text-gradient-purple">Non-negotiable.</span>
              </h2>
            </Reveal>
            <div className="mt-12 space-y-8">
              {[
                {
                  h: "Research is louder than opinion",
                  p: "If a test isn't tied to a real customer voice, it's a guess in a nice font. We listen first and build from what your buyers actually say.",
                },
                {
                  h: "Small wins compound",
                  p: "One viral test is a lottery ticket. Thirty disciplined wins stacked over a year is how serious revenue gets moved.",
                },
                {
                  h: "Honesty beats storytelling",
                  p: "If a test lost, we tell you. If your funnel is in decent shape, we tell you that too. You get the truth, not a pitch deck.",
                },
              ].map((v) => (
                <Reveal key={v.h}>
                  <div className="rounded-2xl border border-ink/10 bg-white p-8">
                    <h3 className="text-2xl font-semibold text-text">{v.h}</h3>
                    <p className="mt-3 text-lg text-text-muted leading-relaxed">
                      {v.p}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
