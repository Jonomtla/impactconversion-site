import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import How from "@/components/How";
import Reveal from "@/components/motion/Reveal";

export const metadata = {
  title: "How we work · Impact Conversion",
  description: "Research. Prioritise. Test. Compound. Every engagement runs the same loop.",
};

type Service = {
  name: string;
  price: string;
  blurb: string;
  inclusions: string[];
  featured?: boolean;
};

const services: Service[] = [
  {
    name: "Conversion Audit",
    price: "from $2,500",
    blurb:
      "A full analytics, funnel, and heatmap review with prioritised recommendations. The right call if you want a roadmap before you commit to a program.",
    inclusions: [
      "Analytics + funnel analysis",
      "Heatmap + session recording review",
      "Customer research synthesis",
      "Competitor benchmarking",
      "Prioritised recommendation list",
    ],
  },
  {
    name: "90-Day Optimisation Sprint",
    price: "from $15,000",
    featured: true,
    blurb:
      "Twelve weeks of focused experimentation. Deep research up front, then 8 to 12 tests in market. Guarantee: at least three winning tests with measurable impact, or you don&apos;t pay.",
    inclusions: [
      "Weeks 1-2 deep-dive research",
      "8-12 experiments in market",
      "Weekly async updates",
      "Fortnightly strategy calls",
      "Results guarantee",
    ],
  },
  {
    name: "Ongoing CRO Program",
    price: "from $4,500 / month",
    blurb:
      "Continuous research, three to five experiments running at once, monthly reporting tied to revenue. For teams serious about compounding gains over quarters.",
    inclusions: [
      "Continuous research pipeline",
      "3-5 live experiments at all times",
      "Fortnightly strategy calls",
      "Monthly revenue attribution reporting",
      "Dedicated experimentation lead",
    ],
  },
  {
    name: "Landing Page & Funnel Builds",
    price: "from $3,500",
    blurb:
      "Research-led pages written in a direct response voice. Built to convert, not to look busy in a pitch deck.",
    inclusions: [
      "Research-led copy",
      "Direct response structure",
      "Conversion-first design",
      "Analytics + test instrumentation",
    ],
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-ink text-cream pt-40 pb-24 md:pt-52 md:pb-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 80% 30%, var(--color-purple) 0%, transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                How we work
              </p>
              <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
                Same loop. Every time.{" "}
                <span className="text-gradient-glow">Boring on purpose.</span>
              </h1>
              <p className="mt-8 text-lg text-text-inv-muted md:text-xl">
                We don&apos;t have a secret method. We have a disciplined one.
                Here&apos;s what you get, what it costs, and how we run it.
              </p>
            </Reveal>
          </div>
        </section>

        <How />

        <section className="bg-cream py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Engagements
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
                Four ways to{" "}
                <span className="text-gradient-purple">work with us.</span>
              </h2>
              <p className="mt-6 text-lg text-text-muted">
                Most clients start with an audit or a 90-day sprint, then move
                into an ongoing program once the loop is running.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {services.map((s) => (
                <Reveal key={s.name}>
                  <div className={`relative flex h-full flex-col rounded-2xl p-8 md:p-10 ${
                    s.featured
                      ? "border-2 border-purple bg-white shadow-[0_20px_60px_-20px_rgba(124,90,236,0.4)]"
                      : "border border-ink/10 bg-white"
                  }`}>
                    {s.featured ? (
                      <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-purple px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        Most popular
                      </span>
                    ) : null}
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-2xl font-semibold text-text">
                        {s.name}
                      </h3>
                      <span className="text-sm font-semibold text-purple">
                        {s.price}
                      </span>
                    </div>
                    <p
                      className="mt-4 text-text-muted leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: s.blurb }}
                    />
                    <ul className="mt-6 space-y-2 text-sm text-text">
                      {s.inclusions.map((inc) => (
                        <li key={inc} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
