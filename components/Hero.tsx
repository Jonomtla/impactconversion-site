import Link from "next/link";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import WavyLines from "./WavyLines";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[78vh] items-center overflow-hidden bg-cream-2 text-ink"
    >
      {/* Soft color blobs, echoing the deck covers */}
      <div
        aria-hidden
        className="hero-blob-a pointer-events-none absolute -right-40 -top-72 h-[640px] w-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,90,236,0.16), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="hero-blob-b pointer-events-none absolute -bottom-80 -left-44 h-[700px] w-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(240,112,80,0.14), transparent 65%)",
        }}
      />

      <WavyLines />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:py-28">
        <StaggerGroup className="max-w-4xl" stagger={0.1}>
          <StaggerItem>
            <h1 className="text-balance font-black leading-[0.95] tracking-[-0.035em] text-[clamp(2.6rem,7vw,5.5rem)]">
              More revenue from{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #7c5aec 0%, #b06090 55%, #f07050 100%)",
                }}
              >
                the traffic you already have.
              </span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70 md:text-xl">
              We find out why visitors leave without buying or booking, fix
              it, and prove the lift with A/B tests. For ecommerce, bookings
              and subscription businesses.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact#book"
                data-ga-event="book_call_click"
                data-ga-location="homepage_hero"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-purple px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
              >
                Let&apos;s have a chat
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
