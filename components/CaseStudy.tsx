import Link from "next/link";
import Image from "next/image";
import CountUp from "./CountUp";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

export default function CaseStudy() {
  return (
    <section id="results" className="relative overflow-hidden bg-ink text-cream py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              How Steadyrack&apos;s revenue per visitor rose{" "}
              <span className="text-gradient-glow">26.6% sitewide</span> in
              six months.
            </h2>
            <p className="mt-6 text-lg text-text-inv-muted">
              Steadyrack sells wall-mounted bike racks to the world from Perth.
              Ad costs were over budget, and their premium rack was the
              worst-earning page on the site. Research found buyers could not
              tell which rack fitted their bike. Twenty-seven tests later, the
              premium rack is the majority of sales, revenue per visitor on its
              page is up 74.5 percent, and the program is pacing at $660k a
              year in added revenue, a 10x return on fees.
            </p>
            <Link
              href="/case-studies/steadyrack"
              data-ga-event="case_study_click"
              data-ga-location="homepage_results"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
            >
              Read the Steadyrack case study
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
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
            <Reveal>
              <Link
                href="/case-studies/steadyrack"
                aria-label="Read the Steadyrack case study"
                className="group relative block overflow-hidden rounded-2xl border border-cream/10 bg-cream/5"
              >
                <Image
                  src="/assets/case-studies/steadyrack/proflex-studio.jpg"
                  alt="A gravel bike stored vertically on a wall-mounted Steadyrack ProFlex rack"
                  width={1800}
                  height={1012}
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-8">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-cream/70">
                      Sitewide revenue per visitor
                    </div>
                    <div className="mt-1 text-6xl font-semibold tracking-tight text-cream md:text-7xl">
                      <CountUp to={26.6} decimals={1} prefix="+" suffix="%" />
                    </div>
                    <div className="mt-1 text-sm text-cream/70">Same traffic, six months in</div>
                  </div>
                  <span className="hidden rounded-full border border-purple-2/40 bg-ink/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-purple-2 backdrop-blur sm:inline-block">
                    Headline win
                  </span>
                </div>
              </Link>
            </Reveal>
            <StaggerGroup className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.1}>
              <StaggerItem>
                <Metric label="Return on fees" sub="Conservatively, before all markets">
                  <CountUp to={10} suffix="x" />
                </Metric>
              </StaggerItem>
              <StaggerItem>
                <Metric label="Tests completed" sub="11 wins, a 41% hit rate">
                  <CountUp to={27} />
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
                  Naming the bike each rack fits, at the point of choice, lifted premium-rack orders 28%.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-2" />
                  Premium rack went from 44% to 54% of units sold, and held for four months.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-2" />
                  Sitewide revenue per visitor up 26.6%, including pages we never touched.
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
