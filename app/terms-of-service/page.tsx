import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WavyLines from "@/components/WavyLines";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import TermsForm from "./TermsForm";

export const metadata = {
  title: "Terms of engagement",
  description:
    "Impact Conversion Limited terms of engagement for CRO services. Review and accept to begin an engagement.",
  alternates: { canonical: "/terms-of-service" },
  robots: { index: false, follow: false },
};

const sections: { title: string; clauses: string[] }[] = [
  {
    title: "1. Engagement",
    clauses: [
      "You may engage us to provide services by signing a services agreement, signing a written proposal, or confirming acceptance in writing.",
      "These terms apply to each engagement unless replaced by a later written agreement signed by both parties.",
      "If there is any inconsistency, the order of precedence is: (a) a signed services agreement; (b) the signed proposal; (c) these terms. Terms in a client purchase order or similar document do not apply unless we expressly accept them in writing.",
      "Our duties under these terms are owed solely to you. We do not accept responsibility to third parties.",
    ],
  },
  {
    title: "2. Services",
    clauses: [
      "You acknowledge that marketing, advertising platforms and search engines change over time and are outside our control.",
      "We will perform the services with the reasonable care and skill expected of a competent provider of comparable services, and will make recommendations. Results cannot be guaranteed.",
      "Service hours are 9:00am to 5:00pm New Zealand time, Monday to Friday, excluding public holidays. We aim to respond within one business day.",
    ],
  },
  {
    title: "3. Fees and payment",
    clauses: [
      "Unless a proposal states otherwise, invoices are payable within 7 days of the invoice date.",
      "Recurring fees (including retainers) are invoiced monthly in advance.",
      "The first invoice under an engagement is payable before services commence.",
      "Where a signed proposal sets out a specific payment schedule (for example a deposit or staged milestone payments), that schedule applies.",
      "All payments must be made in cleared funds, in full, without deduction, set-off or bank charges. If you are required by law to withhold or deduct any tax from a payment, the amount payable is increased so that we receive the amount we would have received without that deduction.",
      "If an amount remains unpaid 14 days after its due date, we may give written notice suspending the services until all overdue amounts are received in cleared funds. We are not liable for delay caused by a suspension. For a recurring engagement, the agreed recurring fees continue during a suspension because scheduled capacity remains reserved, but only until termination takes effect under the Termination section. Suspension does not affect either party's termination rights.",
      "If an amount is not paid when due, we may charge default interest on the unpaid amount at 24% per annum, calculated daily on a simple, non-compounding basis from the due date until we receive payment in cleared funds. If that rate is held to be unenforceable, it is reduced to the highest rate that is enforceable.",
      "You must reimburse us on demand for all reasonable costs and expenses actually incurred in recovering or attempting to recover an overdue amount, including debt collection agency commissions and fees, tracing and service costs, court or tribunal filing fees, and legal costs and disbursements on a full indemnity basis. This applies whether the costs are incurred before or after proceedings are commenced and includes the cost of enforcing any judgment or order.",
      "All fees, estimates and rates are exclusive of GST and any similar tax, which is payable in addition at the prevailing rate where applicable.",
    ],
  },
  {
    title: "4. Client responsibilities and change control",
    clauses: [
      "You must provide timely access, accurate information, materials, decisions and approvals reasonably required for the services.",
      "Delays or inaccuracies in what you provide may extend delivery dates and do not reduce recurring fees where capacity has been reserved.",
      "Work outside the agreed scope requires written agreement (email is sufficient) on any change to fees, timing and deliverables before that work begins.",
    ],
  },
  {
    title: "5. Copyright and intellectual property",
    clauses: [
      "Materials you provide to us remain yours. You confirm you have the rights needed to supply them, and you grant us a licence to use them to provide the services.",
      "All work remains the property of Impact Conversion Limited until payment in full. Upon full payment you own the final deliverables created for you during the invoiced period, and we will obtain any assignment needed from our subcontractors to give effect to this.",
      "Pre-existing materials, methods, templates, software, code libraries and tools (“background IP”) remain Impact's property. To the extent background IP is embedded in a deliverable, we grant you a perpetual, non-exclusive, royalty-free licence to use it as part of that deliverable.",
      "Third-party materials remain subject to the relevant licensor terms.",
    ],
  },
  {
    title: "6. Confidentiality",
    clauses: [
      "Each party must keep the other's confidential information in confidence and use it only for the purposes of the engagement.",
      "These obligations do not apply to information that is public (other than through a breach of this clause), already known to the recipient, or independently developed. A party may disclose confidential information to its employees, subcontractors and professional advisers who need it and are bound by confidentiality obligations, and where disclosure is required by law, provided (where lawful) it gives the other party prompt notice.",
      "These obligations continue after this agreement ends.",
    ],
  },
  {
    title: "7. Privacy and data",
    clauses: [
      "Each party must comply with applicable privacy and data-protection law.",
      "You confirm that you have lawful authority to give us access to personal information and to instruct us to process it.",
      "We will process personal information only to provide the services and on your lawful instructions, restrict access to those who need it, maintain reasonable security safeguards, and notify you without undue delay after becoming aware of a suspected privacy breach affecting that information.",
      "On request or on termination, we will return or securely delete personal information we hold for you, subject to legal retention obligations and routine backups.",
    ],
  },
  {
    title: "8. Limitation of liability",
    clauses: [
      "Neither party is liable to the other for any indirect, consequential or special loss, including any loss of profit, revenue, anticipated savings, business opportunity, goodwill or data, to the extent that the loss is indirect or consequential.",
      "To the maximum extent permitted by law, Impact's total aggregate liability arising out of or in connection with an engagement, whether in contract, tort (including negligence), equity, statute or otherwise, and whether arising from one event or a series of related events, is limited to: (a) for a recurring engagement, the fees paid or payable for the three months immediately preceding the first event giving rise to the claim; or (b) for a fixed-fee project, the total fees paid or payable for that project.",
      "Each party acknowledges and agrees that: (a) it is in trade; (b) the services are supplied and acquired in trade; and (c) having regard to the nature and value of the services, the parties' respective bargaining positions and their opportunity to obtain advice, it is fair and reasonable that they are bound by this clause. To the maximum extent permitted by law, the parties agree that the Consumer Guarantees Act 1993 does not apply to this agreement and contract out of sections 9, 12A and 13 of the Fair Trading Act 1986.",
      "The two preceding limitation clauses do not limit your payment obligations or any right, remedy or liability that cannot lawfully be excluded or limited, and do not apply to fraud or wilful misconduct.",
    ],
  },
  {
    title: "9. Dispute resolution",
    clauses: [
      "A party must not start court proceedings until it has given written notice of the dispute.",
      "If not resolved within 10 business days, the dispute must be referred to mediation.",
      "If not resolved within 20 business days after a mediator is appointed, either party may commence court proceedings.",
      "Nothing in this clause prevents either party from seeking urgent interim relief, or prevents us from taking debt recovery action for undisputed overdue invoices.",
    ],
  },
  {
    title: "10. Third-party tools",
    clauses: [
      "We may provide or recommend third-party software or services as part of our work.",
      "Estimated fees exclude third-party costs unless specified in the proposal. Functionality, pricing and availability of third-party software are outside our control, and you must accept and comply with the third party's terms.",
    ],
  },
  {
    title: "11. Force majeure",
    clauses: [
      "Neither party is liable for delay or failure caused by an event beyond its reasonable control, except for payment obligations already accrued. The affected party must promptly notify the other, take reasonable steps to mitigate the effect, and resume performance when reasonably possible.",
      "If such an event materially prevents performance for more than 30 days, either party may terminate the affected services by written notice, with fees adjusted for services not provided after termination.",
    ],
  },
  {
    title: "12. Termination",
    clauses: [
      "Either party may terminate immediately by written notice if the other suffers an insolvency event, commits a material breach that cannot be remedied, or commits a material breach that is not remedied within 30 days of written notice.",
      "If you do not pay on the due date, we may issue a 7-day demand and may terminate if it is not met.",
      "Either party may terminate on 30 days' written notice for convenience. Termination for convenience cannot take effect before the end of any minimum term in a signed proposal.",
      "On termination: (a) you must pay all fees and approved expenses accrued up to the effective termination date, including recurring fees for any applicable notice period; (b) any advance payment is first applied against those amounts; (c) if you terminate for convenience, any advance payment attributable to a period after the effective termination date is refunded, less any approved non-cancellable third-party commitments; (d) if we terminate for convenience and elect not to provide services for all or part of the notice period, we will refund the corresponding unused portion of any advance payment within 10 business days; and (e) if we terminate for your breach, any unused advance payment may be applied against amounts you owe, with any balance refunded.",
      "Termination does not affect rights or liabilities accrued before termination.",
    ],
  },
  {
    title: "13. Non-solicitation",
    clauses: [
      "During the engagement and for six months afterwards, neither party will knowingly solicit for employment or direct engagement any employee or contractor of the other who was directly involved in the services. This does not prevent general advertising or hiring someone who approaches independently.",
    ],
  },
  {
    title: "14. General",
    clauses: [
      "Notices must be in writing and sent to the contact persons and email addresses notified by each party (for Impact: jono@impactconversion.com). An emailed notice is treated as received when sent, unless sent after 5:00pm or on a non-business day at the recipient's location, in which case it is received the next business day.",
      "This agreement does not create a relationship of employment, agency or partnership.",
      "We may subcontract our obligations, but remain responsible for the deliverables.",
      "A failure or delay to exercise a right is not a waiver. A waiver, and any variation to this agreement, must be in writing.",
      "This agreement (together with the signed proposal or services agreement) is the entire agreement between the parties about its subject matter and replaces all earlier discussions and representations.",
      "Neither party may assign this agreement without the other's written consent, which must not be unreasonably withheld.",
      "If any provision is unenforceable, it is severed to the minimum extent necessary and the rest of the agreement remains in force.",
      "This agreement may be signed or accepted electronically and in counterparts.",
      "Clauses that by their nature should survive termination (including fees and payment, intellectual property, confidentiality, privacy, limitation of liability and this clause) survive.",
    ],
  },
  {
    title: "15. Governing law and jurisdiction",
    clauses: [
      "This agreement is governed by New Zealand law. Subject to the next clause, the courts of New Zealand have exclusive jurisdiction.",
      "Nothing in this agreement prevents Impact from bringing debt recovery proceedings, seeking interim relief, or enforcing a judgment or order in any court with jurisdiction over the client or its assets.",
    ],
  },
  {
    title: "16. Interpretation",
    clauses: [
      "A reference to this agreement includes any services agreement or proposal that incorporates these terms.",
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
        <section className="relative overflow-hidden bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <WavyLines />
          <div className="relative mx-auto max-w-3xl px-6">
            <Breadcrumbs items={[{ label: "Terms of engagement" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Legal
              </p>
              <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                Terms of engagement
              </h1>
              <p className="mt-5 text-lg text-text-inv-muted">
                The working agreement between you and Impact Conversion
                Limited. Read through, and if you&rsquo;re happy, accept at the
                bottom to formalise the engagement.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <div className="rounded-2xl border border-ink/10 bg-white p-8 md:p-10">
                <p className="text-sm text-text-muted">
                  Impact Conversion Limited (NZBN 9429051688387)
                  (&ldquo;Impact&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) and
                  the client (&ldquo;you&rdquo;) agree to the following terms
                  for every engagement.
                </p>
                <p className="mt-3 text-sm font-medium text-text-muted">
                  Version 2.0 &middot; 28 August 2026
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
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
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
