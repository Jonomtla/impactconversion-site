import WavyLines from "./WavyLines";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink text-cream">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-purple) 0%, transparent 65%)",
        }}
      />
      <WavyLines />
      {/* Bottom fade bridging into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-28 md:py-32">
        <StaggerGroup className="mx-auto max-w-4xl text-center" stagger={0.12}>
          <StaggerItem>
            <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              You already paid for the traffic.{" "}
              <span className="text-gradient-flow-light">Make it pay you back.</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg text-text-inv-muted md:text-xl">
              We find the leaks in your funnel, run research-led tests, and
              only ship wins that hold up in your P&amp;L. The winners stay
              live. The revenue compounds on the same ad spend, month after
              month.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/contact#book"
                data-ga-event="book_call_click"
                data-ga-location="homepage_hero"
                className="group inline-flex items-center gap-2 rounded-full bg-purple px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-purple-2 hover:scale-105"
              >
                Book a 15-min intro call
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-7 py-3.5 text-sm font-semibold text-cream hover:bg-cream/5 transition-colors"
              >
                See case studies
              </a>
            </div>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 text-xs text-text-inv-muted">
              Let&apos;s grab fifteen minutes to look at your funnel together,
              and you&apos;ll leave with a straight answer on whether a program
              is worth running.
            </p>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
