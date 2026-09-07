import Reveal from "./motion/Reveal";
import MethodPlayer from "./MethodPlayer";

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
            Research the problem. Test the answer. Keep what works.
          </h2>
          <p className="mt-6 text-lg text-text-muted">
            Every engagement follows the same four stages. Each one turns a
            customer problem into a decision you can defend.
          </p>
        </Reveal>

        <MethodPlayer />
      </div>
    </section>
  );
}
