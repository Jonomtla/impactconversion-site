import Link from "next/link";
import Image from "next/image";
import LeadMagnetForm from "@/components/LeadMagnetForm";

export const metadata = {
  title: "The Closest Thing to Free Money: the post-purchase upsell guide",
  description:
    "The ultimate post-purchase upsell guide for Shopify brands, plus a Claude skill that writes your upsell offers from your own reviews. Free.",
  alternates: { canonical: "/resources/free-money-playbook" },
  openGraph: {
    images: [{ url: "/assets/free-money-cover.png", width: 1200, height: 630 }],
  },
};

const inside = [
  "The four post-purchase offers that work, and which fits your product",
  "The 15-minute problem map that tells you what to offer",
  "The sequence: upsell, downsell, second upsell, inside Shopify's rules",
  "Pricing rules and benchmarks, from real tests",
  "Two page templates you can copy",
  "How to test it without fooling yourself",
  "The afternoon build plan and the apps that can do it",
];

function Stars() {
  return (
    <span className="text-[#f5a623]" aria-label="5 stars">
      &#9733;&#9733;&#9733;&#9733;&#9733;
    </span>
  );
}

export default function FreeMoneyPlaybookPage() {
  return (
    <main id="main" className="bg-cream text-text">
      <header className="mx-auto w-full max-w-5xl px-6 py-5">
        <span className="text-lg font-black tracking-tight">
          IMPACT<span className="text-purple">.</span>
        </span>
      </header>

      <section className="mx-auto grid w-full max-w-5xl gap-10 px-6 pb-16 pt-4 md:grid-cols-12 md:gap-12 md:pb-20 md:pt-8">
        <div className="contents md:col-span-7 md:block">
          <div className="order-1">
            <h1 className="text-balance font-black leading-[0.98] tracking-[-0.03em] text-[clamp(2.2rem,5.2vw,3.9rem)]">
              Post-purchase upsells are the{" "}
              <span className="text-gradient-flow">closest thing to free money</span>{" "}
              for Shopify brands.
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-text-muted">
              The ultimate post-purchase upsell guide, plus a Claude skill that
              writes your upsell offers from your own reviews. Free.
            </p>
            <p className="mt-4 text-sm font-medium text-text-muted">
              <Stars /> Trusted by 8 and 9 figure DTC brands
            </p>
          </div>
          <div className="order-3 mx-auto w-full max-w-sm md:mt-8 md:max-w-md">
            <Image
              src="/assets/free-money-book.png"
              alt="The Ultimate Post-Purchase Upsell Guide"
              width={1440}
              height={1640}
              priority
            />
          </div>
        </div>
        <div className="order-2 md:col-span-5">
          <div className="md:sticky md:top-8">
            <LeadMagnetForm
              formUid="b06fe8dacc"
              source="free_money_top"
              heading="Email me the guide"
              subhead="Free. No pitch, no drip sequence. Unsubscribe any time."
            />
          </div>
        </div>
      </section>

      <section className="bg-cream-2 py-14 md:py-16">
        <div className="mx-auto w-full max-w-5xl px-6 md:grid md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              What&rsquo;s inside
            </h2>
            <ul className="mt-5 grid gap-3 text-text-muted">
              {inside.map((l) => (
                <li key={l} className="flex gap-3">
                  <span className="mt-0.5 font-bold text-purple">&#10003;</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 md:mt-0">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Included: the Upsell Engine
            </h2>
            <p className="mt-5 text-text-muted">
              A free Claude skill (works in ChatGPT too). It reads your reviews
              for the words your customers use, designs the offer chain with
              prices, and writes the upsell pages. You paste them in.
            </p>
            <ul className="mt-5 grid gap-3 text-text-muted">
              {[
                "Store audit and owner interview",
                "Review mining for customer language",
                "Offer architecture with prices",
                "Upsell page copy, ready to paste",
              ].map((l) => (
                <li key={l} className="flex gap-3">
                  <span className="mt-0.5 font-bold text-purple">&#10003;</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto w-full max-w-xl px-6">
          <LeadMagnetForm
            formUid="b06fe8dacc"
            source="free_money_bottom"
            heading="Email me the guide"
            subhead="Free. No pitch, no drip sequence. Unsubscribe any time."
          />
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
