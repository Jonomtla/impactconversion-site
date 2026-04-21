import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Contact · Impact Conversion",
  description: "Book a 15-minute intro call to look at your funnel together. No pitch deck, no sales script.",
};

const expect = [
  {
    n: "01",
    h: "We ask about your funnel",
    p: "We want to understand your traffic sources, the conversion bottlenecks that are costing you the most, and what you have already tried, without dragging it out.",
  },
  {
    n: "02",
    h: "We show you how we&apos;d approach it",
    p: "We walk you through where we would look first, what the early tests would be, and what a 90-day sprint would most likely ship on your funnel.",
  },
  {
    n: "03",
    h: "We&apos;re straight about fit",
    p: "If the traffic is not there or the budget is not aligned, we tell you, and if it lines up we send a proposal with the guarantee built in: you see a revenue uplift, or you don&apos;t pay.",
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
            <div className="mx-auto inline-block text-left">
              <Breadcrumbs items={[{ label: "Contact" }]} />
            </div>
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Book a call
              </p>
              <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
                Let&apos;s grab fifteen minutes to{" "}
                <span className="text-gradient-flow-light">look at your funnel.</span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg text-text-inv-muted md:text-xl">
                Tell us what your funnel looks like today, and we&apos;ll walk
                you through how we would approach it, whether we are a fit,
                and what a good outcome actually looks like for you.
              </p>
              <a
                href="#book"
                data-ga-event="book_call_click"
                data-ga-location="contact_hero"
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

        {/* Cal.com embed */}
        <section id="book" className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Pick a time
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Fifteen minutes, no prep needed.
              </h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
              <iframe
                src="https://cal.com/jono-matla-8ixyzk/15-minute-free-consult?embed=true"
                title="Book a 15-minute intro call"
                className="h-[680px] w-full"
                loading="lazy"
              />
            </div>
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
