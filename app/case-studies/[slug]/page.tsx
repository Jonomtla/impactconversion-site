import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import CountUp from "@/components/CountUp";
import Breadcrumbs from "@/components/Breadcrumbs";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study" };
  return {
    title: `${study.name} · Case study`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-ink text-cream pt-40 pb-20 md:pt-52 md:pb-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 30% 30%, var(--color-purple) 0%, transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-5xl px-6">
            <Breadcrumbs
              items={[
                { label: "Case studies", href: "/case-studies" },
                { label: study.name },
              ]}
            />
            <Reveal>
              <div className="flex flex-wrap items-center gap-3 text-sm text-text-inv-muted">
                <span className="rounded-full bg-purple/20 px-3 py-1 font-semibold uppercase tracking-wider text-purple-2">
                  {study.industry}
                </span>
                <span>·</span>
                <span>{study.duration}</span>
              </div>
              <h1
                className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
                dangerouslySetInnerHTML={{ __html: study.headline }}
              />
              <p
                className="mt-8 max-w-3xl text-lg text-text-inv-muted md:text-xl"
                dangerouslySetInnerHTML={{ __html: study.summary }}
              />
            </Reveal>

            {study.heroImage ? (
              <Reveal className="mt-14">
                <div className="relative overflow-hidden rounded-2xl border border-cream/10 bg-cream/5 p-2 md:p-3">
                  <Image
                    src={study.heroImage}
                    alt={study.heroImageAlt ?? `${study.name} site`}
                    width={1600}
                    height={1000}
                    className="h-auto w-full rounded-xl"
                    priority
                  />
                </div>
              </Reveal>
            ) : null}

            <StaggerGroup
              className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4"
              stagger={0.08}
            >
              {study.heroStats.map((s) => {
                const isNumeric = /^[+-]?\$?\d[\d,.]*[%+kMB]*$/i.test(s.v) || /^[↑↓]$/.test(s.v);
                return (
                  <StaggerItem key={s.l}>
                    <div className="flex h-full flex-col rounded-2xl border border-cream/10 bg-cream/5 p-6">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-inv-muted">
                        {s.l}
                      </div>
                      <div
                        className={`mt-3 font-semibold tracking-tight text-cream ${
                          isNumeric ? "text-4xl md:text-5xl" : "text-xl md:text-2xl"
                        }`}
                      >
                        {s.v.match(/^[+-]?\d+%?$/) ? (
                          <CountUp
                            to={parseInt(s.v)}
                            prefix={s.v.startsWith("+") ? "+" : ""}
                            suffix={s.v.includes("%") ? "%" : ""}
                          />
                        ) : (
                          s.v
                        )}
                      </div>
                      {s.sub ? (
                        <div className="mt-auto pt-3 text-xs text-text-inv-muted">
                          {s.sub}
                        </div>
                      ) : null}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        {/* Article body */}
        <section className="bg-cream py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6">
            {study.chapters.map((ch, i) => (
              <Reveal key={ch.heading} className={i === 0 ? "" : "mt-16"}>
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                  <span
                    dangerouslySetInnerHTML={{ __html: ch.heading }}
                  />
                </h2>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-text-muted">
                  {ch.body.map((p, j) => (
                    <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>
              </Reveal>
            ))}

            {/* Wins pullout */}
            <Reveal className="mt-16">
              <div className="rounded-2xl border border-purple/30 bg-purple-soft/40 p-8 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">
                  What actually moved
                </p>
                <ul className="mt-6 space-y-3 text-lg text-text">
                  {study.wins.map((w) => (
                    <li key={w} className="flex items-start gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple" />
                      <span dangerouslySetInnerHTML={{ __html: w }} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Quote */}
            <Reveal className="mt-16">
              <blockquote className="border-l-2 border-purple pl-6 text-xl italic leading-relaxed text-text md:text-2xl">
                <span
                  dangerouslySetInnerHTML={{
                    __html: `&ldquo;${study.quote}&rdquo;`,
                  }}
                />
                <footer className="mt-6 flex items-center gap-3 not-italic">
                  {study.photo ? (
                    <Image
                      src={study.photo}
                      alt={study.quoteBy}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : null}
                  <div>
                    <div className="text-sm font-semibold text-text">
                      {study.quoteBy}
                    </div>
                    <div className="text-sm text-text-muted">
                      {study.quoteRole}
                    </div>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* Other case studies */}
        <section className="bg-cream-2 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Keep reading
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Other programs, other results.
              </h2>
            </Reveal>
            <StaggerGroup
              className="mt-12 grid gap-4 md:grid-cols-3"
              stagger={0.08}
            >
              {others.map((c) => (
                <StaggerItem key={c.slug}>
                  <Link
                    href={`/case-studies/${c.slug}`}
                    className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-all hover:border-purple/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(124,90,236,0.3)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple">
                      {c.industry}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-text">
                      {c.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm text-text-muted">
                      {c.tagline}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-purple">
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
