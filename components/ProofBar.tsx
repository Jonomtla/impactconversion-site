const clients = [
  "High Performance Academy",
  "Animal Training Academy",
  "Top Music Co",
  "EDMProd",
  "Steadyrack",
];

export default function ProofBar() {
  return (
    <section className="border-b border-ink/5 bg-cream py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-text-muted">
          Working with teams at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {clients.map((c) => (
            <span
              key={c}
              className="text-base font-medium text-text/60 transition-colors hover:text-text"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
