import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import WavyLines from "@/components/WavyLines";

export const metadata = {
  title: "Your copy is on its way",
  description: "Check your inbox for the Free Money playbook.",
  robots: { index: false, follow: false },
};

export default function ThankYou7ckPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <WavyLines />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 80% 30%, var(--color-purple) 0%, transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                You&rsquo;re in
              </p>
              <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.5rem)]">
                Your copy is{" "}
                <span className="text-gradient-glow">on its way.</span>
              </h1>
              <p className="mt-6 text-lg text-text-inv-muted md:text-xl">
                Check your email for the playbook. If it is not there in a
                couple of minutes, look in spam or promotions and drag it to
                your inbox.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <div className="rounded-2xl border border-ink/10 bg-white p-8 shadow-sm md:p-10">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                  Wait, before you go
                </p>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-text md:text-3xl">
                  Want to see what this looks like on your brand?
                </h2>
                <p className="mt-4 text-text-muted md:text-lg">
                  The playbook shows you the system. On a short call we can run
                  it against your actual store: where the money is hiding, what
                  to build first, and what it is roughly worth. No pitch deck,
                  just your numbers.
                </p>
                <Link
                  href="/contact#book"
                  data-ga-event="book_call_click"
                  data-ga-location="free_money_thank_you"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-purple px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
                >
                  Book a free call
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
