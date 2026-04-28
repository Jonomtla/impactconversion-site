import Link from "next/link";
import CountUp from "./CountUp";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

export default function CaseStudy() {
  return (
    <section id="results" className="relative overflow-hidden bg-ink text-cream py-24 md:py-32">
      <div
        className="pointer-events-none absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-purple) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
              Case study
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              How we added{" "}
              <span className="text-gradient-glow">seven figures</span> to High
              Performance Academy.
            </h2>
            <p className="mt-6 text-lg text-text-inv-muted">
              HPA teaches automotive engineering to over 100,000 students
              across 175 countries, and by the time they came to us the ad
              spend was scaling fine while the site conversion rate refused to
              follow.
            </p>
            <p className="mt-4 text-lg text-text-inv-muted">
              We embedded a full testing program, rebuilt their hypothesis
              pipeline around customer research, and shipped experiments week
              after week. Eighteen months in, the same ad spend produces seven
              figures more revenue, and the guarantee kicks in if it doesn&apos;t.
            </p>
            <blockquote className="mt-10 border-l-2 border-purple-2 pl-6 text-lg italic text-cream">
              &ldquo;We&apos;ve seen single wins that brought in six figures of
              additional revenue. The ROI is a no-brainer. Beyond the numbers,
              the testing process has instilled a culture of experimentation
              that&apos;s removed assumptions from how we make decisions.&rdquo;
              <footer className="mt-4 not-italic text-sm text-text-inv-muted">
                Ben Silcock, Co-founder
              </footer>
            </blockquote>
            <Link
              href="/case-studies/high-performance-academy"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-5 py-2.5 text-sm font-semibold text-cream transition-all hover:bg-cream/10 hover:border-purple-2/40"
            >
              Read the full case study
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Reveal>

          <div className="lg:col-span-7">
            <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.1}>
              <StaggerItem className="sm:col-span-2">
                <HeroMetric label="Extra revenue" sub="No extra ad spend">
                  <CountUp to={1} prefix="$" suffix="M+" />
                </HeroMetric>
              </StaggerItem>
              <StaggerItem>
                <Metric label="Tests shipped" sub="Over 18 months">
                  <CountUp to={180} />
                </Metric>
              </StaggerItem>
              <StaggerItem>
                <Metric label="Win rate" sub="Roughly 2x industry typical">
                  <CountUp to={35} suffix="%" />
                </Metric>
              </StaggerItem>
            </StaggerGroup>
            <Reveal delay={0.3} className="mt-4 rounded-2xl border border-cream/10 bg-cream/5 p-8">
              <p className="text-sm uppercase tracking-wider text-text-inv-muted">
                What actually moved
              </p>
              <ul className="mt-4 space-y-3 text-lg text-cream">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-2" />
                  Messaging rewrite on the homepage drove 69% more new-visitor purchases.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-2" />
                  Post-cart upsells lifted AOV 15% at a 26% take rate.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-2" />
                  Logged-in cross-sells moved revenue per visitor up 30%.
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  children,
  sub,
}: {
  label: string;
  children: React.ReactNode;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-cream/10 bg-cream/5 p-6">
      <div className="text-xs uppercase tracking-wider text-text-inv-muted">
        {label}
      </div>
      <div className="mt-2 text-5xl font-semibold tracking-tight text-cream">
        {children}
      </div>
      <div className="mt-1 text-sm text-text-inv-muted">{sub}</div>
    </div>
  );
}

function HeroMetric({
  label,
  children,
  sub,
}: {
  label: string;
  children: React.ReactNode;
  sub: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-purple-2/30 bg-gradient-to-br from-purple/15 to-cream/5 p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-purple) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex items-end justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-text-inv-muted">
            {label}
          </div>
          <div className="mt-2 text-6xl font-semibold tracking-tight text-cream md:text-7xl">
            {children}
          </div>
          <div className="mt-2 text-sm text-text-inv-muted">{sub}</div>
        </div>
        <span className="hidden rounded-full border border-purple-2/40 bg-purple/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-purple-2 sm:inline-block">
          Headline win
        </span>
      </div>
    </div>
  );
}
