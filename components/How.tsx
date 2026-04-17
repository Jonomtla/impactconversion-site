const steps = [
  {
    n: "01",
    h: "Research",
    p: "We figure out why people aren&apos;t buying. Not from guesses. From surveys, session recordings, heatmaps, and analytics. The fixes come from your customers&apos; own words.",
  },
  {
    n: "02",
    h: "Prioritise",
    p: "Not every idea deserves a test slot. We pick the ones most likely to move revenue, based on what we found in the research.",
  },
  {
    n: "03",
    h: "Test",
    p: "Every change runs as a controlled experiment. You get real data, not opinions. Winners ship. Losers teach us what your buyers don&apos;t want.",
  },
  {
    n: "04",
    h: "Compound",
    p: "One test rarely moves the business. Thirty do. We stack wins over months, and the gains snowball into real revenue.",
  },
];

export default function How() {
  return (
    <section id="how" className="bg-cream-2 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
            How we work
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
            Research first. Then test. Then repeat.
          </h2>
          <p className="mt-6 text-lg text-text-muted">
            Every engagement runs the same loop. It&apos;s simple, it&apos;s
            honest, and it works.
          </p>
        </div>

        <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="relative rounded-2xl border border-ink/10 bg-white p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  Stage {s.n}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-text">
                {s.h}
              </h3>
              <p
                className="mt-3 text-text-muted leading-relaxed"
                dangerouslySetInnerHTML={{ __html: s.p }}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
