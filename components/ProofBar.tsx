const receipts = [
  { n: "$1M+", l: "Added for High Performance Academy" },
  { n: "+57%", l: "Membership for Animal Training Academy" },
  { n: "+36%", l: "Mobile lift for HPA $1 trial" },
  { n: "Lower CAC", l: "For Kite Therapy" },
];

export default function ProofBar() {
  return (
    <section className="border-b border-ink/5 bg-cream py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-text-muted">
          Results shipped for real programs
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {receipts.map((r) => (
            <div
              key={r.l}
              className="flex flex-col items-center text-center"
            >
              <div className="text-2xl font-semibold tracking-tight text-purple md:text-3xl">
                {r.n}
              </div>
              <div className="mt-1 text-xs font-medium text-text-muted md:text-sm">
                {r.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
