import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata = {
  title: "Contact · Impact Conversion",
  description: "Book a 15-minute intro call. No pitch deck, no sales script.",
};

const expect = [
  {
    n: "01",
    h: "We ask about your funnel",
    p: "Traffic sources. Conversion bottlenecks. What you&apos;ve already tried. Quick, specific, no dragging it out.",
  },
  {
    n: "02",
    h: "We show you how we&apos;d approach it",
    p: "Where we&apos;d look first. What the early tests would be. What a 90-day sprint would likely ship.",
  },
  {
    n: "03",
    h: "We&apos;re straight about fit",
    p: "If the traffic isn&apos;t there or the budget is wrong, we say so. If it lines up, we send a proposal.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-ink text-cream pt-40 pb-24 md:pt-52 md:pb-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--color-purple) 0%, transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Book a call
              </p>
              <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
                Fifteen minutes.{" "}
                <span className="text-gradient-flow-light">No pitch.</span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg text-text-inv-muted md:text-xl">
                Tell us about your funnel. We&apos;ll tell you how we&apos;d
                approach it, whether we&apos;re a fit, and what good would
                look like.
              </p>
              <a
                href="https://app.cal.com/jono-matla-8ixyzk/15-minute-free-consult"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-purple px-8 py-4 text-base font-semibold text-white transition-all hover:bg-purple-2 hover:scale-105"
              >
                Book a 15-minute intro call
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <p className="mt-6 text-sm text-text-inv-muted">
                Or email{" "}
                <a
                  href="mailto:jono@impactconversion.com"
                  className="text-cream underline underline-offset-4"
                >
                  jono@impactconversion.com
                </a>
              </p>
            </Reveal>
          </div>
        </section>

        {/* What to expect */}
        <section className="bg-cream py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                What to expect
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
                Three things happen on the call.
              </h2>
            </Reveal>
            <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.1}>
              {expect.map((e) => (
                <StaggerItem key={e.n}>
                  <div className="h-full rounded-2xl border border-ink/10 bg-white p-8">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-soft text-xs font-bold text-purple">
                      {e.n}
                    </span>
                    <h3
                      className="mt-6 text-xl font-semibold tracking-tight text-text"
                      dangerouslySetInnerHTML={{ __html: e.h }}
                    />
                    <p
                      className="mt-3 text-text-muted leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: e.p }}
                    />
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
    </>
  );
}
