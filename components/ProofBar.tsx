const receipts = [
  { n: "$1M+", l: "Added for High Performance Academy" },
  { n: "+57%", l: "Membership for Animal Training Academy" },
  { n: "+36%", l: "Mobile lift for HPA $1 trial" },
  { n: "Lower CAC", l: "For Kite Therapy" },
];

export default function ProofBar() {
  return (
    <section className="border-b border-ink/5 bg-cream py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-ink/15" />
          <p className="text-center text-xs uppercase tracking-[0.25em] text-text-muted">
            Real programs, real numbers
          </p>
          <span className="h-px w-8 bg-ink/15" />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-ink/10">
          {receipts.map((r) => (
            <div
              key={r.l}
              className="flex flex-col items-center px-4 text-center md:px-6"
            >
              <div className="text-3xl font-semibold tracking-tight text-purple md:text-4xl">
                {r.n}
              </div>
              <div className="mt-2 text-xs font-medium text-text-muted md:text-sm">
                {r.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
