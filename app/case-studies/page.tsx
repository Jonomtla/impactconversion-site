import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { caseStudies } from "@/lib/case-studies";

export const metadata = {
  title: "Case studies · Impact Conversion",
  description:
    "Real testing programs. Real revenue moved. Six-figure single wins and compounding programs.",
};

export default function CaseStudiesPage() {
  const featured = caseStudies.find((c) => c.featured) ?? caseStudies[0];
  const rest = caseStudies.filter((c) => c.slug !== featured.slug);

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-ink text-cream pt-40 pb-24 md:pt-52 md:pb-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, var(--color-purple) 0%, transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Case studies
              </p>
              <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
                Revenue moved.{" "}
                <span className="text-gradient-flow-light">Receipts attached.</span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg text-text-inv-muted md:text-xl">
                Real programs. Real numbers. Tests that shipped, hit
                significance, and showed up in the P&amp;L, not in a deck.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Featured case study card · big hero */}
        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <Link
                href={`/case-studies/${featured.slug}`}
                className="group relative block overflow-hidden rounded-3xl border border-ink/10 bg-white p-8 pt-16 transition-all hover:border-purple/40 hover:shadow-[0_30px_80px_-30px_rgba(124,90,236,0.35)] md:p-12"
              >
                <div className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-purple px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Featured
                </div>
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                  <div className="lg:col-span-6">
                    <p className="text-sm font-semibold uppercase tracking-wider text-purple">
                      {featured.industry} · {featured.duration}
                    </p>
                    <h2
                      className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-5xl"
                      dangerouslySetInnerHTML={{ __html: featured.headline }}
                    />
                    <p
                      className="mt-6 text-lg text-text-muted"
                      dangerouslySetInnerHTML={{ __html: featured.summary }}
                    />
                    <div className="mt-8 grid grid-cols-2 gap-3">
                      {featured.heroStats.slice(0, 4).map((s) => (
                        <div
                          key={s.l}
                          className="rounded-2xl border border-ink/10 bg-cream/50 p-5"
                        >
                          <div className="text-2xl font-semibold tracking-tight text-purple md:text-3xl">
                            {s.v}
                          </div>
                          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                            {s.l}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-purple group-hover:gap-3 transition-all">
                      Read the full story
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12h14M13 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="lg:col-span-6">
                    {featured.heroImage ? (
                      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream/50 p-2">
                        <Image
                          src={featured.heroImage}
                          alt={featured.heroImageAlt ?? `${featured.name} site`}
                          width={1600}
                          height={1000}
                          className="h-auto w-full rounded-xl"
                          priority
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Grid of other case studies */}
        <section className="bg-cream pb-24 md:pb-32">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                More programs
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Different stacks. Same loop.
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Online education. D2C. Lead generation. The method is the
                same. Research, prioritise, test, compound.
              </p>
            </Reveal>
            <StaggerGroup
              className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
              stagger={0.08}
            >
              {rest.map((c) => (
                <StaggerItem key={c.slug}>
                  <Link
                    href={`/case-studies/${c.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all hover:border-purple/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(124,90,236,0.35)]"
                  >
                    {c.heroImage ? (
                      <div className="aspect-[16/10] overflow-hidden bg-cream-2">
                        <Image
                          src={c.heroImage}
                          alt={c.heroImageAlt ?? `${c.name} site`}
                          width={800}
                          height={500}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-7">
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple">
                      {c.industry}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-text">
                      {c.name}
                    </h3>
                    <p className="mt-3 text-sm text-text-muted">{c.tagline}</p>
                    <div className="mt-6 grid grid-cols-2 gap-3 border-t border-ink/10 pt-5">
                      {c.heroStats.slice(0, 2).map((s) => (
                        <div key={s.l}>
                          <div className="text-xl font-bold text-purple">
                            {s.v}
                          </div>
                          <div className="text-[11px] uppercase tracking-wider text-text-muted">
                            {s.l}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-purple group-hover:gap-2.5 transition-all">
                      Read the case study
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12h14M13 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
