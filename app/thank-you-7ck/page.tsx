import Link from "next/link";
import CalEmbed from "@/components/CalEmbed";

export const metadata = {
  title: "Your copy is on its way",
  description: "Check your inbox for the Free Money playbook.",
  robots: { index: false, follow: false },
};

export default function ThankYou7ckPage() {
  return (
    <main id="main" className="bg-cream text-text">
      <header className="mx-auto w-full max-w-5xl px-6 py-5">
        <span className="text-lg font-black tracking-tight">
          IMPACT<span className="text-purple">.</span>
        </span>
      </header>

      <section className="mx-auto w-full max-w-3xl px-6 pb-12 pt-4 md:pt-8">
        <h1 className="text-balance font-black leading-[0.98] tracking-[-0.03em] text-[clamp(2.2rem,5vw,3.6rem)]">
          Your copy is <span className="text-gradient-flow">on its way.</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-text-muted">
          Check your email for the guide. If it is not there in a couple of
          minutes, look in spam or promotions and drag it to your inbox.
        </p>
      </section>

      <section className="bg-cream-2 py-14 md:py-16">
        <div className="mx-auto w-full max-w-3xl px-6">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Upsells are one lever. Most stores have four or five more.
          </h2>
          <div className="mt-6 grid gap-4 text-lg leading-relaxed text-text-muted">
            <p>
              Post-purchase offers lift what each order is worth. That is the
              easy win, which is why I gave it away.
            </p>
            <p>
              But if your conversion rate has slipped, your ad costs keep
              climbing, or buyers are leaking out of your product pages, the
              upsell patches one hole in a bigger bucket.
            </p>
            <p>
              The bigger bucket is what we do. Impact Conversion runs CRO for 8
              and 9 figure D2C brands: we research why people do and don&rsquo;t
              buy, test the fixes on your live store, and go back weeks later to
              verify the money is still there. Every win is a permanent change
              to the site, so it compounds.
            </p>
          </div>
        </div>
      </section>

      <section id="book" className="py-14 md:py-16">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-purple">
            One-off, no retainer
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            The Leaky Funnel Audit
          </h2>
          <div className="mt-5 grid gap-4 text-lg leading-relaxed text-text-muted">
            <p>
              A one-off audit of your store. We read your reviews and surveys,
              watch where buyers drop, and hand you a ranked list of what to
              fix first and what each fix is worth. Fixed fee, yours to keep,
              no ongoing engagement required.
            </p>
            <p>
              Pick a time below for a fifteen-minute Leaky Funnel Game Plan
              call. We look at your store live, tell you straight whether the
              audit is worth it for you, and scope it if it is.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
            <CalEmbed location="free_money_thank_you" />
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 py-8">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 text-sm text-text-muted">
          <span>Impact Conversion · Queenstown, NZ</span>
          <Link href="/privacy" className="hover:text-text">
            Privacy
          </Link>
        </div>
      </footer>
    </main>
  );
}
