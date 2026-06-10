import Link from "next/link";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[78vh] items-center overflow-hidden bg-ink text-cream"
    >
      {/* Crisp hairline grid, not a blurred glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-cream) 1px, transparent 1px), linear-gradient(90deg, var(--color-cream) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage:
            "radial-gradient(120% 90% at 15% 0%, #000 35%, transparent 80%)",
        }}
      />
      {/* Purple light sweeping up-and-to-the-right, lighting the grid as it passes */}
      <div
        aria-hidden
        className="hero-grid-sweep pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-purple-2) 1px, transparent 1px), linear-gradient(90deg, var(--color-purple-2) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:py-28">
        <StaggerGroup className="max-w-4xl" stagger={0.1}>
          <StaggerItem>
            <div className="mb-7 flex items-center gap-3 text-[0.78rem] font-semibold tracking-[0.14em] text-purple-2">
              <span className="h-px w-7 bg-purple-2/70" />
              CONVERSION RATE OPTIMISATION
            </div>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-balance font-black leading-[0.95] tracking-[-0.035em] text-[clamp(2.6rem,7vw,5.5rem)]">
              You already paid for the traffic.{" "}
              <span className="text-purple-2">Make it pay you back.</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-cream/80 md:text-xl">
              We find the leaks in your funnel, run research-led tests, and only
              ship wins that hold up in your P&amp;L. The winners stay live. The
              revenue compounds on the same ad spend, month after month.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact#book"
                data-ga-event="book_call_click"
                data-ga-location="homepage_hero"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-purple px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
              >
                Book a 15-min intro call
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/5"
              >
                See case studies
              </Link>
            </div>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-7 max-w-xl text-sm leading-relaxed text-cream/55">
              Fifteen minutes on your funnel together, and you leave with a
              straight answer on whether a program is worth running.
            </p>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
