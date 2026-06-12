import Image from "next/image";
import CalEmbed from "./CalEmbed";
import Reveal from "./motion/Reveal";

type Props = {
  /** GA4 location tag for booked calls, e.g. "geo_nz_booking" */
  gaLocation: string;
  /** Timezone note under the calendar, e.g. "Times shown in your timezone. Booked directly with Jono." */
  timezoneNote: string;
};

/**
 * Final conversion section for the geo pages: Ben's testimonial beside an
 * inline Cal.com embed, so proof sits at the decision point and booking
 * happens without leaving the page.
 */
export default function GeoBookingBand({ gaLocation, timezoneNote }: Props) {
  return (
    <section id="book" className="bg-ink text-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Let&rsquo;s look at your funnel together.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-text-inv-muted">
            Fifteen minutes, your timezone, and a straight answer on whether a
            program is worth running.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <figure className="flex h-full flex-col justify-between rounded-2xl border border-cream/10 bg-ink-2 p-8">
              <div>
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" className="text-purple-2">
                  <path
                    d="M0 24V14C0 6.268 4.477 0 12 0v4C7.582 4 4 7.582 4 12h4v12H0zm16 0V14C16 6.268 20.477 0 28 0v4c-4.418 0-8 3.582-8 8h4v12h-8z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote className="mt-5 text-lg leading-relaxed text-cream">
                  &ldquo;We&rsquo;ve seen single wins that brought in six
                  figures of additional revenue. The ROI is a
                  no-brainer.&rdquo;
                </blockquote>
              </div>
              <div>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Image
                    src="/assets/avatar-ben.png"
                    alt="Ben Silcock"
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-cream">Ben Silcock</div>
                    <div className="text-sm text-text-inv-muted">
                      Co-founder, High Performance Academy
                    </div>
                  </div>
                </figcaption>
                <div className="mt-6 flex gap-8 border-t border-cream/10 pt-5">
                  <div>
                    <div className="text-2xl font-semibold text-purple-2">$1M+</div>
                    <div className="text-xs uppercase tracking-wider text-text-inv-muted">
                      Extra revenue
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-purple-2">Same</div>
                    <div className="text-xs uppercase tracking-wider text-text-inv-muted">
                      Ad spend
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl bg-white p-2">
              <CalEmbed location={gaLocation} />
            </div>
            <p className="mt-3 text-sm text-text-inv-muted">{timezoneNote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
