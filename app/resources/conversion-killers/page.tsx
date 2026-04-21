import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadMagnetForm from "@/components/LeadMagnetForm";

export const metadata = {
  title: "7 Conversion Killers quietly draining revenue from D2C sites",
  description:
    "A plain-English PDF on the seven patterns we see over and over in D2C ecommerce funnels, and what to do about each one. Free.",
  alternates: { canonical: "/resources/conversion-killers" },
  openGraph: {
    title: "7 Conversion Killers quietly draining revenue from D2C sites",
    description:
      "A plain-English PDF on the seven patterns we see over and over in D2C ecommerce funnels. Free.",
    url: "https://impactconversion.com/resources/conversion-killers",
  },
};

const killers = [
  {
    n: "01",
    t: "The hero that talks about you instead of them",
    b: "Most homepage heroes name the product, the brand, and the year founded, without ever naming the problem the buyer is trying to solve, so one rewrite usually pays for itself many times over.",
  },
  {
    n: "02",
    t: "Price anchoring that works against you",
    b: "The first price a buyer sees sets the anchor for every cart that follows, and most D2C sites lead with their cheapest SKU, which quietly caps AOV across the entire range.",
  },
  {
    n: "03",
    t: "PDPs that answer questions nobody is asking",
    b: "When the FAQ block covers returns and shipping but says nothing about whether the product fits the buyer&rsquo;s specific use case, you are usually one paragraph of copy away from the sale.",
  },
  {
    n: "04",
    t: "Free shipping thresholds that cost you margin",
    b: "A free-shipping threshold that looks like a conversion win can quietly be a profit loser once you account for increased fulfilment cost, so the threshold needs to be modelled on real basket data.",
  },
  {
    n: "05",
    t: "The checkout that re-introduces doubt",
    b: "You spend the whole site building trust, and then the checkout asks for a coupon code, surfaces a strange shipping fee, and hands the buyer one more reason to leave.",
  },
  {
    n: "06",
    t: "Upsells that feel like upsells",
    b: "Bundles and cross-sells work when they extend the job the buyer hired the product to do, and they stall whenever they look like the store is just trying to add another line to the order.",
  },
  {
    n: "07",
    t: "Post-purchase pages that sell nothing",
    b: "The thank-you page holds the highest-intent traffic on the entire site, and most brands use it simply to say thank you, leaving a large pile of margin sitting on the floor.",
  },
];

export default function ConversionKillersPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 80% 30%, var(--color-purple) 0%, transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6">
            <Breadcrumbs
              items={[
                { label: "Resources", href: "/resources/conversion-killers" },
                { label: "7 Conversion Killers" },
              ]}
            />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Free PDF · D2C ecommerce
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                7 conversion killers quietly{" "}
                <span className="text-gradient-glow">draining revenue</span>{" "}
                from D2C sites.
              </h1>
              <p className="mt-6 text-lg text-text-inv-muted md:text-xl">
                These are the patterns we see on almost every audit, along
                with the damage each one causes and the fastest way to fix it.
                Fourteen pages, plain English, no fluff.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-5">
            <div className="md:col-span-3">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                What&rsquo;s inside
              </p>
              <ol className="mt-6 space-y-6">
                {killers.map((k) => (
                  <li key={k.n} className="flex gap-5">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-soft text-sm font-bold text-purple">
                      {k.n}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-text">
                        {k.t}
                      </h3>
                      <p className="mt-2 text-text-muted">{k.b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="md:col-span-2">
              <div className="md:sticky md:top-28">
                <LeadMagnetForm
                  source="conversion_killers_pdf"
                  heading="Email me the PDF"
                  subhead="Fourteen pages, arriving in under a minute, and you can unsubscribe any time."
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
