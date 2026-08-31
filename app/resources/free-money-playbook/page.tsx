import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import WavyLines from "@/components/WavyLines";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadMagnetForm from "@/components/LeadMagnetForm";

export const metadata = {
  title: "The Closest Thing to Free Money: the post-purchase upsell playbook",
  description:
    "The complete playbook for post-purchase upsells on Shopify: offer architecture, page templates, app picks, and the exact economics. Free.",
  alternates: { canonical: "/resources/free-money-playbook" },
};

export default function FreeMoneyPlaybookPage() {
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
            <Breadcrumbs
              items={[
                { label: "Resources", href: "/resources/free-money-playbook" },
                { label: "Free Money Playbook" },
              ]}
            />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Free playbook · Shopify
              </p>
              <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                Post-purchase upsells are the{" "}
                <span className="text-gradient-glow">closest thing to free money</span>{" "}
                for Shopify brands.
              </h1>
              <p className="mt-6 text-lg text-text-inv-muted md:text-xl">
                Grab your free playbook, the same playbook used to generate
                millions in extra revenue for e-commerce brands.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-xl px-6">
            <LeadMagnetForm
              formUid="b06fe8dacc"
              source="free_money_playbook"
              heading="Email me the playbook"
              subhead="Tell us where to send it and it lands in your inbox in a couple of minutes."
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
