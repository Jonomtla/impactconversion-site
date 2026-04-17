import Image from "next/image";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

type T = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
  initials?: string;
  stats: { k: string; v: string }[];
};

const testimonials: T[] = [
  {
    quote:
      "Having Impact on our team has been a major asset. The support and expertise we needed to finally make our funnel work. The project has been a game changer.",
    name: "Ryan Cartlidge",
    role: "Founder, Animal Training Academy",
    initials: "RC",
    stats: [
      { k: "+63%", v: "Revenue YoY" },
      { k: "+46%", v: "New members" },
    ],
  },
  {
    quote:
      "Their insights into the industry are second to none. We saw YoY performance improve straight away. The decision making culture it&apos;s built inside our team is arguably worth more than the numbers.",
    name: "Aden",
    role: "General Manager, EDMProd",
    photo: "/assets/avatar-aden.png",
    stats: [{ k: "+20%", v: "Qualified leads" }],
  },
  {
    quote:
      "Working with Impact didn&apos;t just lift conversion. It improved lead quality. More leads. Better leads. Lower CAC. It compounds.",
    name: "Matthew Morrison",
    role: "Founder",
    photo: "/assets/avatar-matt.png",
    stats: [{ k: "+20%", v: "More leads" }],
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
            More results
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
            Boring. Repeatable.{" "}
            <span className="text-gradient-purple">Compounding.</span>
          </h2>
          <p className="mt-6 text-lg text-text-muted">
            No viral redesigns. Tests that ship, hit significance, and show up
            in the P&amp;L.
          </p>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-6 lg:grid-cols-3" stagger={0.12}>
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-ink/10 bg-white p-8 transition-all hover:border-purple/30 hover:-translate-y-1">
                <svg
                  width="28"
                  height="24"
                  viewBox="0 0 28 24"
                  fill="none"
                  className="text-purple"
                >
                  <path
                    d="M0 24V14C0 6.268 4.477 0 12 0v4C7.582 4 4 7.582 4 12h4v12H0zm16 0V14C16 6.268 20.477 0 28 0v4c-4.418 0-8 3.582-8 8h4v12h-8z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote
                  className="mt-6 text-lg leading-relaxed text-text"
                  dangerouslySetInnerHTML={{ __html: t.quote }}
                />
                <div className="mt-8">
                  <div className="flex flex-wrap gap-6 border-t border-ink/10 pt-6">
                    {t.stats.map((s) => (
                      <div key={s.v}>
                        <div className="text-2xl font-semibold text-purple">
                          {s.k}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-text-muted">
                          {s.v}
                        </div>
                      </div>
                    ))}
                  </div>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {t.photo ? (
                      <Image
                        src={t.photo}
                        alt={t.name}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-soft text-sm font-semibold text-purple">
                        {t.initials}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-text">{t.name}</div>
                      <div className="text-sm text-text-muted">{t.role}</div>
                    </div>
                  </figcaption>
                </div>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
