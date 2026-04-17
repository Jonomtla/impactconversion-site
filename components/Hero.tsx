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
              We run the testing program that turns your existing visitors into
              more revenue. No rebuilds. No guesswork. Research, experiments
              that ship, and winners that stay live.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#book"
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
                See the receipts
              </a>
            </div>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 text-xs text-text-inv-muted">
              No pitch deck. No pressure. We&apos;ll tell you in 15 minutes if
              there&apos;s a program worth running.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-20 grid grid-cols-1 gap-8 border-t border-cream/10 pt-12 sm:grid-cols-3">
              <div>
                <div className="text-4xl font-semibold tracking-tight text-purple-2">
                  <CountUp to={1} prefix="$" suffix="M+" />
                </div>
                <div className="mt-1 text-sm text-text-inv-muted">Extra revenue for one client in 18 months</div>
              </div>
              <div>
                <div className="text-4xl font-semibold tracking-tight text-purple-2">
                  <CountUp to={35} suffix="%" />
                </div>
                <div className="mt-1 text-sm text-text-inv-muted">Win rate on tests we ship</div>
              </div>
              <div>
                <div className="text-4xl font-semibold tracking-tight text-purple-2">
                  <CountUp to={180} suffix="+" />
                </div>
                <div className="mt-1 text-sm text-text-inv-muted">Experiments run, every one measured</div>
              </div>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
