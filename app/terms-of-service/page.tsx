import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import TermsForm from "./TermsForm";

export const metadata = {
  title: "Terms of engagement",
  description:
    "Impact Conversion Ltd (Peak Digital Ltd) terms of engagement for CRO services. Review and accept to begin an engagement.",
  alternates: { canonical: "/terms-of-service" },
  robots: { index: false, follow: false },
};

const sections: { title: string; clauses: string[] }[] = [
  {
    title: "1. Engagement",
    clauses: [
      "You may engage us to provide services by signing a written proposal, providing an authorised purchase order, or confirming in writing or verbally.",
      "These terms apply to each engagement unless replaced by a later written agreement.",
      "Our duties under these terms are owed solely to you. We do not accept responsibility to third parties.",
      "We may update these terms from time to time by notice on our website or by email.",
    ],
  },
  {
    title: "2. Services",
    clauses: [
      "You acknowledge that marketing, advertising platforms and search engines change over time and are outside our control.",
      "Impact will perform the services using best-practice strategies and current techniques, and will make recommendations.",
      "Results cannot be guaranteed.",
      "Service hours are 9:00am to 5:00pm New Zealand time, Monday to Friday, excluding public holidays. A response can be expected within 24 hours during those times.",
    ],
  },
  {
    title: "3. Fees",
    clauses: [
      "Invoices are payable on the 20th of the month following the invoice date.",
      "All payments must be made in cleared funds without deduction or set-off.",
      "If an amount remains unpaid 14 days after the due date we may suspend services until paid.",
      "Interest may be charged on overdue amounts at 2% per month, calculated daily.",
      "All fees, estimates and rates are exclusive of GST.",
    ],
  },
  {
    title: "4. Copyright and intellectual property",
    clauses: [
      "All work remains the property of Peak Digital Ltd trading as Impact Conversion until payment in full.",
      "Upon full payment you own the final deliverables created for you during the invoiced period.",
      "Pre-existing materials, methods, templates, software, code libraries and tools remain Impact's intellectual property.",
      "Third-party materials remain subject to the relevant licensor terms.",
      "You confirm you have permission to supply any images, content or materials you provide to us.",
    ],
  },
  {
    title: "5. Confidentiality",
    clauses: [
      "Each party must keep the other's confidential information in confidence and must not disclose it.",
      "The obligations do not apply to information that is public or already known to the recipient.",
      "These obligations continue after this agreement ends.",
    ],
  },
  {
    title: "6. Limitation of liability",
    clauses: [
      "Neither party is liable for any consequential, indirect or special loss, including loss of profits.",
      "Our total aggregate liability is limited to an amount equal to the fees paid in the three months before the event giving rise to liability.",
      "The parties contract out of the Consumer Guarantees Act 1993 and sections 9, 12A and 13 of the Fair Trading Act.",
    ],
  },
  {
    title: "7. Dispute resolution",
    clauses: [
      "A party must not start court or arbitration proceedings until it has given written notice of the dispute.",
      "If not resolved within 10 business days, the dispute must be referred to mediation.",
      "If not resolved within 20 business days after a mediator is appointed, either party may commence court proceedings.",
    ],
  },
  {
    title: "8. Third-party tools",
    clauses: [
      "We may provide or recommend third-party software or services as part of our work.",
      "Estimated fees exclude third-party costs unless specified in the proposal.",
      "Functionality, pricing and availability of third-party software are outside our control.",
      "You must accept and comply with the third party's terms.",
    ],
  },
  {
    title: "9. Termination",
    clauses: [
      "Either party may terminate for material breach not remedied within 30 days of written notice.",
      "If you do not pay on the due date, we may issue a 7-day demand.",
      "Either party may terminate on 30 days' written notice for convenience.",
      "On termination you must pay for services performed up to the termination date.",
    ],
  },
  {
    title: "10. GST",
    clauses: [
      "Fees and additional costs are exclusive of GST, which is payable in addition.",
      "If GST becomes payable, the GST amount will be added at the prevailing rate.",
    ],
  },
  {
    title: "11. General",
    clauses: [
      "Any notice must be in writing and addressed to the contact persons notified by each party.",
      "This agreement does not create a relationship of employment, agency or partnership.",
      "We may subcontract our obligations, but remain responsible for the deliverables.",
      "A failure or delay to exercise a right is not a waiver. A waiver must be in writing.",
    ],
  },
  {
    title: "12. Governing law",
    clauses: [
      "This agreement is governed by New Zealand law. The courts of New Zealand have exclusive jurisdiction.",
    ],
  },
  {
    title: "13. Interpretation",
    clauses: [
      "A reference to this agreement includes any proposal or purchase order that incorporates these terms.",
      "Headings are for convenience only.",
      "The singular includes the plural and vice versa.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-3xl px-6">
            <Breadcrumbs items={[{ label: "Terms of engagement" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Legal
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Terms of engagement
              </h1>
              <p className="mt-5 text-lg text-text-inv-muted">
                The working agreement between you and Peak Digital Ltd trading
                as Impact Conversion. Read through, and if you&rsquo;re happy,
                accept at the bottom to formalise the engagement.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <div className="rounded-2xl border border-ink/10 bg-white p-8 md:p-10">
                <p className="text-sm text-text-muted">
                  Peak Digital Ltd trading as Impact Conversion
                  (&ldquo;Impact&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) and
                  the client (&ldquo;you&rdquo;) agree to the following terms
                  for every engagement.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 space-y-10">
              {sections.map((s) => (
                <Reveal key={s.title}>
                  <h2 className="text-xl font-semibold text-text md:text-2xl">
                    {s.title}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {s.clauses.map((c, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-base leading-relaxed text-text-muted"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream-2 py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Accept the terms
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Confirm and we&rsquo;ll get started.
              </h2>
              <p className="mt-4 text-text-muted">
                Submitting this form records your acceptance of the terms above
                and notifies us by email. A copy goes to{" "}
                <a
                  href="mailto:jono@impactconversion.com"
                  className="text-purple hover:underline"
                >
                  jono@impactconversion.com
                </a>
                .
              </p>
            </Reveal>

            <div className="mt-8">
              <TermsForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
