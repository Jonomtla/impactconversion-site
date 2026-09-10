import Reveal from "./motion/Reveal";

/**
 * The verified case-study proof block for the PPC landing pages. Sits high on
 * the page, right after the trust bar. Client stays anonymous by agreement.
 */
export default function VerifiedProofStrip() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-purple">
            A verified win
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
            28% more orders of the right model. Checked again seven weeks
            later. Still there.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-text-muted">
            A premium bike rack brand, sold direct to consumer, was converting
            below what its traffic deserved. We read 1,910 customer reviews and
            surveyed over 500 shoppers, then put the answer buyers needed on
            the page where they choose. Orders of the right model rose 28
            percent at 98 percent confidence. Seven weeks after rollout we went
            back and verified the win held: worth $7,000 to $16,000 a month,
            still there today.
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["+28%", "orders of the right model"],
              ["98%", "statistical confidence"],
              ["$7-16k", "per month, verified it held"],
            ].map(([n, label]) => (
              <div
                key={label}
                className="rounded-xl border border-ink/10 bg-cream px-4 py-5 text-center"
              >
                <div className="text-2xl font-black tracking-tight text-purple md:text-3xl">
                  {n}
                </div>
                <div className="mt-1 text-xs text-text-muted md:text-sm">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
