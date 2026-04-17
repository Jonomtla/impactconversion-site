import LeakyFunnel from "./LeakyFunnel";
import VirtuousLoop from "./VirtuousLoop";
import ABTestBars from "./ABTestBars";

const pillars = [
  {
    n: "01",
    h: "You&apos;re leaking money right now",
    p: "Most visitors who land on your site never come back. Each one cost you ad spend to get there. We find where they drop and why, then fix it so more of them buy.",
    Visual: LeakyFunnel,
  },
  {
    n: "02",
    h: "Conversion lifts compound",
    p: "Pay Facebook more, your CAC goes up. Lift the conversion rate on traffic you already have, and ROAS, LTV, and profit all move at once. Same spend. More output. The math doesn&apos;t lie.",
    Visual: VirtuousLoop,
  },
  {
    n: "03",
    h: "Guessing is expensive",
    p: "Design agencies sell rebuilds based on taste. We sell tests based on data. You&apos;ll know, with 95% confidence, whether a change moved the needle. Or didn&apos;t.",
    Visual: ABTestBars,
  },
];

export default function Problem() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
            The real problem
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
            You don&apos;t have a traffic problem.
            <br />
            You have a{" "}
            <span className="text-gradient-purple">conversion problem.</span>
          </h2>
          <p className="mt-6 text-lg text-text-muted">
            Throwing more budget at cold traffic is the expensive answer.
            Fixing what happens after the click is the cheap one. And it keeps
            paying every month you do it.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => {
            const V = p.Visual;
            return (
              <div
                key={p.n}
                className="flex flex-col rounded-3xl border border-ink/10 bg-white p-8 md:p-10 transition-all hover:border-purple/30 hover:shadow-[0_20px_50px_-20px_rgba(124,90,236,0.25)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-soft font-mono text-xs font-semibold text-purple">
                    {p.n}
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-cream/60 p-2">
                  <V />
                </div>
                <h3
                  className="mt-6 text-2xl font-semibold tracking-tight text-text"
                  dangerouslySetInnerHTML={{ __html: p.h }}
                />
                <p
                  className="mt-4 text-text-muted leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: p.p }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
