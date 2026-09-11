import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Reveal from "@/components/motion/Reveal";
import WavyLines from "@/components/WavyLines";
import ScrollProgress from "@/components/case-study/ScrollProgress";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import CountUp from "@/components/CountUp";
import Breadcrumbs from "@/components/Breadcrumbs";
import WinsCarousel from "@/components/case-study/WinsCarousel";
import SteadyrackVisual from "@/components/case-study/SteadyrackVisuals";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

function stripHtml(s: string) {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&amp;/g, "&");
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
    title: `${study.name} Case Study · ${study.industry} CRO`,
    description: stripHtml(study.summary),
    alternates: { canonical: `/case-studies/${slug}` },
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

  const others = caseStudies.filter((c) => c.slug !== study.slug && !c.draft);

  const url = `https://impactconversion.com/case-studies/${study.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.headline,
    name: `${study.name} case study`,
    description: stripHtml(study.summary),
    articleSection: study.industry,
    author: {
      "@type": "Person",
      name: "Jono Matla",
      url: "https://impactconversion.com/about",
    },
    publisher: { "@id": "https://impactconversion.com/#organization" },
    about: { "@type": "Organization", name: study.name },
    mainEntityOfPage: url,
    url,
    ...(study.heroImage
      ? { image: `https://impactconversion.com${study.heroImage}` }
      : {}),
  };

  return (
    <>
      {study.draft ? (
        <div className="bg-[#ff7a59] px-4 py-2.5 text-center text-sm font-semibold text-[#14172a]">
          DRAFT — internal preview, pending {study.name} approval. Figures not
          yet signed off. Do not publish or share externally.
        </div>
      ) : null}
      <Nav />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <ScrollProgress />
        {/* Hero */}
        <section className="relative overflow-hidden bg-cream-2 text-ink pt-40 pb-20 md:pt-52 md:pb-28">
          {/* Wavy fan, multiplied onto the cream so the lavender reads on a light ground */}
          <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply">
            <WavyLines />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-72 h-[640px] w-[640px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(124,90,236,0.16), transparent 65%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-80 -left-44 h-[700px] w-[700px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(240,112,80,0.14), transparent 65%)",
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
              <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
                <span className="rounded-full bg-purple-soft px-3 py-1 font-semibold uppercase tracking-wider text-purple">
                  {study.industry}
                </span>
                <span>·</span>
                <span>{study.duration}</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.8vw,4rem)]">
                {study.headline}
              </h1>
              <p className="mt-8 max-w-3xl text-lg text-text-muted md:text-xl">
                {study.summary}
              </p>
            </Reveal>

            <StaggerGroup
              className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
              stagger={0.08}
            >
              {study.heroStats.map((s) => {
                const isNumeric = /^[+-]?\$?\d[\d,.]*[%+kMB]*$/i.test(s.v) || /^[↑↓]$/.test(s.v);
                return (
                  <StaggerItem key={s.l}>
                    <div className="flex h-full flex-col rounded-2xl border border-text/10 bg-cream p-6 shadow-[0_1px_2px_rgba(20,23,42,0.04)]">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                        {s.l}
                      </div>
                      <div
                        className={`mt-3 font-semibold tracking-tight text-text ${
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
                        <div className="mt-auto pt-3 text-xs text-text-muted">
                          {s.sub}
                        </div>
                      ) : null}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
            {study.heroImage ? (
              <Reveal className="mt-12">
                <div className="relative overflow-hidden rounded-2xl border border-text/10 bg-cream p-2 md:p-3">
                  <Image
                    src={study.heroImage}
                    alt={study.heroImageAlt ?? `${study.name} site`}
                    width={1600}
                    height={1000}
                    sizes="(min-width: 1024px) 960px, 100vw"
                    className="h-auto w-full rounded-xl"
                    priority
                  />
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>

        {/* Article body */}
        <section className="bg-cream py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6">
            {study.chapters.map((ch, i) => (
              <Reveal key={ch.heading} className={i === 0 ? "" : "mt-16"}>
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                  <span>{ch.heading}</span>
                </h2>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-text-muted">
                  {ch.body.map((p, j) => (
                    <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>
                {ch.visual ? <SteadyrackVisual name={ch.visual} /> : null}
                {ch.figure ? (
                  <figure className="my-10">
                    <div
                      className={`overflow-hidden rounded-2xl border border-text/10 bg-cream-2/60 p-2 ${
                        ch.figure.narrow ? "mx-auto max-w-sm" : ""
                      }`}
                    >
                      <Image
                        src={ch.figure.src}
                        alt={ch.figure.alt}
                        width={ch.figure.width}
                        height={ch.figure.height}
                        sizes="(min-width: 768px) 720px, 100vw"
                        className="h-auto w-full rounded-xl"
                      />
                    </div>
                    {ch.figure.caption ? (
                      <figcaption className="mt-4 text-sm text-text-muted">
                        {ch.figure.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null}
                {ch.showWins && study.winCards?.length ? (
                  <div className="mt-12">
                    <WinsCarousel cards={study.winCards} label="The wins, side by side" />
                  </div>
                ) : null}
              </Reveal>
            ))}

            {study.winCards?.length && !study.chapters.some((c) => c.showWins) ? (
              <Reveal className="mt-16">
                <WinsCarousel cards={study.winCards} label="The wins, side by side" />
              </Reveal>
            ) : null}

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
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Quote */}
            {study.quote ? (
              <Reveal className="mt-16">
                <blockquote className="border-l-2 border-purple pl-6 text-xl italic leading-relaxed text-text md:text-2xl">
                  <span>{`“${study.quote}”`}</span>
                  <footer className="mt-6 flex items-center gap-3 not-italic">
                    {study.photo ? (
                      <Image
                        src={study.photo}
                        alt={study.quoteBy ?? ""}
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
            ) : null}
          </div>
        </section>

        {/* Other case studies */}
        <section className="bg-cream-2 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
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
