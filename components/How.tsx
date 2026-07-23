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
    p: "Before we touch your site, we dig into why people actually leave, why they don’t convert, and why they do. The fixes come out of your customers’ own words rather than a best-practice checklist.",
    Visual: ResearchVisual,
  },
  {
    n: "02",
    h: "Prioritise",
    p: "We rank every idea by how valuable it is to you, so the tests go to the changes that matter most, not the ones that happen to be easy to build.",
    Visual: PrioritiseVisual,
  },
  {
    n: "03",
    h: "Test",
    p: "Every change is built, tested, and analysed so you know exactly what improves your sales and what doesn’t. No relying on algorithms, guessing or opinions.",
    Visual: TestVisual,
  },
  {
    n: "04",
    h: "Compound",
    p: "One 5% increase in conversion makes a difference. 12 of those winning tests month after month transforms the business in a year.",
    Visual: CompoundVisual,
  },
];

export default function How() {
  return (
    <section id="how" className="bg-cream-2 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3 text-[0.78rem] font-semibold tracking-[0.14em] text-purple">
            <span className="h-px w-7 bg-purple/60" />
            THE IMPACT CONVERSION METHOD
          </div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
            Research the problem. Test the answer. Compound the wins.
          </h2>
          <p className="mt-6 text-lg text-text-muted">
            The Impact Conversion Method is our answer to your ad spend
            problem. It&apos;s been proven in 4 different verticals so far,
            and driven more sales for every client we&apos;ve worked with.
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
                    <p className="mt-3 text-text-muted leading-relaxed">
                      {s.p}
                    </p>
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
