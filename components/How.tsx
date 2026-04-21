import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import {
  ResearchVisual,
  PrioritiseVisual,
  TestVisual,
  CompoundVisual,
} from "./HowVisuals";

const steps = [
  {
    n: "01",
    h: "Research",
    p: "Before we touch your site, we dig into why people actually leave, using surveys, session recordings, heatmaps, and analytics side by side. The fixes come out of your customers&apos; own words rather than a best-practice blog.",
    Visual: ResearchVisual,
  },
  {
    n: "02",
    h: "Prioritise",
    p: "Every idea gets scored on impact, confidence, and effort, so the test slots go to the changes most likely to move revenue rather than the ones that happen to be easy to ship.",
    Visual: PrioritiseVisual,
  },
  {
    n: "03",
    h: "Test",
    p: "Every change runs as a proper A/B test, and we only call it a win at 95% confidence, so the decisions rest on real data rather than opinion.",
    Visual: TestVisual,
  },
  {
    n: "04",
    h: "Compound",
    p: "One test moves a single needle, but thirty tests move the business. Month after month the winners stack up, and the revenue curve bends in the right direction.",
    Visual: CompoundVisual,
  },
];

export default function How() {
  return (
    <section id="how" className="bg-cream-2 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
            How we work
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
            Research first. Then test. Then repeat.
          </h2>
          <p className="mt-6 text-lg text-text-muted">
            There is no secret method, just a disciplined loop that runs on
            every engagement with the same four stages month after month. That
            repetition is what makes the results compound.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Connector line passing through the stage badges on desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 hidden h-px lg:block"
            style={{
              top: "calc(2rem + 1rem)", // p-8 padding (32px) + half of h-8 badge (16px) = 48px
              background:
                "linear-gradient(90deg, transparent 0%, var(--color-purple) 18%, var(--color-purple) 82%, transparent 100%)",
              opacity: 0.35,
            }}
          />
          <StaggerGroup className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {steps.map((s, i) => {
              const V = s.Visual;
              return (
                <StaggerItem key={s.n}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-ink/10 bg-white p-8 transition-all hover:border-purple/30 hover:shadow-[0_20px_40px_-20px_rgba(124,90,236,0.3)]">
                    <div className="flex items-center gap-3">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-purple text-xs font-semibold text-white ring-4 ring-cream-2">
                        {i + 1}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                        Stage {s.n}
                      </span>
                    </div>
                    <div className="mt-6">
                      <V />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight text-text">
                      {s.h}
                    </h3>
                    <p
                      className="mt-3 text-text-muted leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: s.p }}
                    />
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
