import WavyLines from "./WavyLines";
import CountUp from "./CountUp";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-cream">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-purple) 0%, transparent 65%)",
        }}
      />
      <WavyLines />
      {/* Bottom fade bridging into the cream proof bar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-20 md:pb-40 md:pt-28">
        <StaggerGroup className="mx-auto max-w-4xl text-center" stagger={0.12}>
          <StaggerItem className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-xs text-text-inv-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-2" />
              CRO for D2C ecommerce and online education
            </div>
          </StaggerItem>
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
          <StaggerItem>
            <div className="mt-20 grid grid-cols-1 border-t border-cream/10 pt-12 sm:grid-cols-3 sm:divide-x sm:divide-cream/10">
              <div className="px-2 sm:px-6">
                <div className="text-4xl font-semibold tracking-tight text-purple-2 md:text-5xl">
                  <CountUp to={1} prefix="$" suffix="M+" />
                </div>
                <div className="mt-2 text-sm text-text-inv-muted">
                  Extra revenue for one client in 18 months
                </div>
              </div>
              <div className="mt-8 px-2 sm:mt-0 sm:px-6">
                <div className="text-4xl font-semibold tracking-tight text-purple-2 md:text-5xl">
                  <CountUp to={35} suffix="%" />
                </div>
                <div className="mt-2 text-sm text-text-inv-muted">
                  Win rate on tests we ship
                </div>
              </div>
              <div className="mt-8 px-2 sm:mt-0 sm:px-6">
                <div className="text-4xl font-semibold tracking-tight text-purple-2 md:text-5xl">
                  <CountUp to={180} suffix="+" />
                </div>
                <div className="mt-2 text-sm text-text-inv-muted">
                  Experiments run, every one measured
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
