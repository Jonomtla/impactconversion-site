import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";

export const metadata = {
  title: "Privacy policy",
  description:
    "How Impact Conversion Ltd (Peak Digital Ltd) collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

const updated = "April 2026";

const sections: { title: string; body: string[] }[] = [
  {
    title: "Who we are",
    body: [
      "This privacy policy applies to impactconversion.com and the services offered by Peak Digital Ltd trading as Impact Conversion (NZBN 9429046780916), a New Zealand company based in Queenstown. For any privacy-related questions, contact jono@impactconversion.com.",
    ],
  },
  {
    title: "What we collect",
    body: [
      "Contact details you give us: name, work email, company, and role — provided when you book a call, accept our terms, or get in touch.",
      "Usage data: pages visited, referrer, device type, approximate location, and interaction events collected via Google Analytics 4 and Vercel Analytics to help us understand what's working on the site.",
      "Technical data: IP address, browser and OS details, and any information automatically sent by your browser when you make a request.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "To respond to your enquiries, run discovery conversations, send proposals, and deliver services you&rsquo;ve engaged us for.",
      "To record your acceptance of our terms of engagement and retain it as evidence of contract formation.",
      "To measure how the site performs so we can improve it (aggregate analytics, no ad targeting).",
      "To meet our legal obligations — tax, accounting, and records retention under New Zealand law.",
    ],
  },
  {
    title: "Who we share it with",
    body: [
      "Service providers who help us operate: Google (Analytics), Vercel (hosting and analytics), Resend (transactional email), Cal.com (scheduling), Xero (invoicing).",
      "We do not sell your information. We only share what&rsquo;s needed for each service to function and require each provider to keep it secure.",
      "We may disclose information when required by law or to protect our rights.",
    ],
  },
  {
    title: "Cookies and tracking",
    body: [
      "We use first-party analytics cookies from Google Analytics 4 and Vercel Analytics. These are set when you visit the site and help us measure traffic and page performance.",
      "We do not currently run retargeting pixels or advertising cookies on this site. You can block cookies in your browser settings if you prefer.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "Contact records and contract acceptances: seven years after the engagement ends, in line with New Zealand tax and records requirements.",
      "Analytics data: retained by Google and Vercel per their standard policies (typically 14 months for event-level data in GA4).",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can ask us what information we hold about you, correct anything inaccurate, or request deletion where we don&rsquo;t need to keep it for legal reasons. Email jono@impactconversion.com and we&rsquo;ll respond within 20 working days as required by the Privacy Act 2020.",
      "If you&rsquo;re in the EU/UK, you have equivalent rights under the GDPR/UK GDPR — same request process, same contact.",
    ],
  },
  {
    title: "Security",
    body: [
      "We store records in vendor-hosted systems with standard security (encrypted at rest and in transit). We don&rsquo;t store payment card details ourselves.",
      "No system is ever fully secure — if we become aware of a breach affecting your data we&rsquo;ll notify you and the Privacy Commissioner as required.",
    ],
  },
  {
    title: "International transfers",
    body: [
      "Most of our providers are based in the US or EU. When we transfer your data outside New Zealand we rely on the providers&rsquo; standard contractual clauses and security commitments.",
    ],
  },
  {
    title: "Changes",
    body: [
      `We may update this policy. The latest version lives at impactconversion.com/privacy — last updated ${updated}.`,
    ],
  },
  {
    title: "Complaints",
    body: [
      "If you&rsquo;re not happy with how we&rsquo;ve handled your information, you can complain to us at jono@impactconversion.com, or to the Office of the Privacy Commissioner at privacy.org.nz.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Legal
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Privacy policy
              </h1>
              <p className="mt-5 text-lg text-text-inv-muted">
                Plain-English summary of what we collect, how we use it, and
                what your rights are. Last updated {updated}.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 space-y-10">
            {sections.map((s) => (
              <Reveal key={s.title}>
                <h2 className="text-xl font-semibold text-text md:text-2xl">
                  {s.title}
                </h2>
                <div className="mt-4 space-y-3 text-base leading-relaxed text-text-muted">
                  {s.body.map((p, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
