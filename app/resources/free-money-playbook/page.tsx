import Link from "next/link";
import Image from "next/image";
import LeadMagnetForm from "@/components/LeadMagnetForm";

export const metadata = {
  title: "The Closest Thing to Free Money: the post-purchase upsell playbook",
  description:
    "The complete post-purchase upsell playbook for Shopify brands: the four offers, the sequence, pricing rules, benchmarks, two page templates and an afternoon build plan. Free.",
  alternates: { canonical: "/resources/free-money-playbook" },
  openGraph: {
    images: [{ url: "/assets/free-money-cover.png", width: 1200, height: 630 }],
  },
};

const inside = [
  ["The four offers that work", "More of the same, faster results, longer results, the next problem. Which one fits your product and why."],
  ["The problem map", "A 15-minute exercise that tells you what to offer, in your customers' words."],
  ["The sequence", "Upsell, downsell, second upsell. How to chain offers without breaking Shopify's rules."],
  ["Pricing rules", "Where to price each offer, and the test where 15% off beat 20% off."],
  ["Benchmarks", "Take rates by offer slot, and why the lower-converting offer made 81% more money."],
  ["Two page templates", "Copy-and-paste layouts for a same-product offer and a complementary offer."],
  ["How to test without fooling yourself", "The order count you need before you call a result."],
  ["Get it live in an afternoon", "An hour-by-hour build plan, plus the apps that can actually do this on Shopify."],
];

function FormCard({ location }: { location: string }) {
  return (
    <div id={location}>
      <LeadMagnetForm
        formUid="b06fe8dacc"
        source={`free_money_${location}`}
        heading="Email me the playbook"
        subhead="It lands in your inbox in a couple of minutes, with the Upsell Engine AI skill included."
      />
    </div>
  );
}

export default function FreeMoneyPlaybookPage() {
  return (
    <main id="main" className="bg-cream text-text">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
        <span className="text-lg font-black tracking-tight">
          IMPACT<span className="text-purple">.</span>
        </span>
        <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-text-muted sm:inline">
          Free playbook for Shopify brands
        </span>
      </header>

      {/* Hero: promise + form above the fold */}
      <section className="mx-auto grid w-full max-w-5xl gap-10 px-6 pb-16 pt-6 md:grid-cols-12 md:gap-12 md:pb-20 md:pt-10">
        <div className="order-2 md:order-1 md:col-span-7">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-purple">
            Free playbook + AI skill
          </p>
          <h1 className="mt-4 text-balance font-black leading-[0.98] tracking-[-0.03em] text-[clamp(2.2rem,5.2vw,3.9rem)]">
            Post-purchase upsells are the{" "}
            <span className="text-gradient-flow">closest thing to free money</span>{" "}
            for Shopify brands.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-text-muted">
            The customer has just paid. Trust and motivation are at their
            peak, and the sale costs you nothing in ads. This playbook shows
            you what to offer them, at what price, in what order, and how to
            have it live by tonight.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
            <Image
              src="/assets/free-money-cover.png"
              alt="The Closest Thing to Free Money: the post-purchase upsell playbook"
              width={1200}
              height={630}
              priority
            />
          </div>
        </div>
        <div className="order-1 md:order-2 md:col-span-5">
          <div className="md:sticky md:top-8">
            <FormCard location="top" />
            <p className="mt-4 text-sm text-text-muted">
              Written by Jono Matla, Impact Conversion. A CRO consultancy for
              8 and 9 figure D2C brands.
            </p>
          </div>
        </div>
      </section>

      {/* The maths */}
      <section className="bg-cream-2 py-16 md:py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            One offer after checkout changes the whole order.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-text-muted">
            A $149 order with a $119 upsell accepted by one buyer in five. Same
            ad spend, same traffic.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["$25", "margin per order, before"],
              ["$104", "margin per order, with the upsell"],
              ["$0", "extra ad spend"],
            ].map(([n, label]) => (
              <div
                key={label}
                className="rounded-xl border border-ink/10 bg-white px-4 py-5 text-center"
              >
                <div className="text-2xl font-black tracking-tight text-purple md:text-3xl">
                  {n}
                </div>
                <div className="mt-1 text-xs text-text-muted md:text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-purple">
            What&rsquo;s inside
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Ten parts, no theory without a worked example.
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {inside.map(([t, b], i) => (
              <li key={t} className="flex gap-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-purple-soft text-sm font-bold text-purple">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold">{t}</h3>
                  <p className="mt-1 text-text-muted">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The skill */}
      <section className="bg-ink py-16 text-cream md:py-20">
        <div className="mx-auto w-full max-w-5xl px-6 md:grid md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-purple-2">
              Included
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              The Upsell Engine: an AI skill that builds your offers for you.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/80">
              Drop it into Claude or ChatGPT. It pulls your store&rsquo;s
              numbers, mines your reviews for the words your customers use,
              designs the offer chain with pricing, and writes the upsell
              pages. What used to take an agency a fortnight.
            </p>
          </div>
          <div className="mt-8 md:col-span-5 md:mt-0">
            <ul className="grid gap-3 text-cream/80">
              {[
                "Store audit and owner interview",
                "Review mining for customer language",
                "Offer architecture with prices",
                "Upsell page copy, ready to paste",
              ].map((l) => (
                <li
                  key={l}
                  className="rounded-xl border border-cream/15 bg-cream/5 px-5 py-4"
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Who */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Who this is from
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-text-muted">
            Jono Matla runs Impact Conversion, a CRO consultancy for 8 and 9
            figure D2C brands. Every test we ship is judged on revenue per
            visitor, and we go back weeks later to verify the win held. Our
            average client program adds $600k+ of revenue in its first six
            months, over 14x the fee.
          </p>
        </div>
      </section>

      {/* Second form */}
      <section className="bg-cream-2 py-16 md:py-20">
        <div className="mx-auto w-full max-w-xl px-6">
          <FormCard location="bottom" />
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
