export type Stat = { v: string; l: string; sub?: string };

export type CaseStudyChapter = {
  heading: string;
  body: string[];
};

export type CaseStudy = {
  slug: string;
  name: string;
  industry: string;
  duration: string;
  tagline: string;
  headline: string;
  summary: string;
  stats: Stat[];
  heroStats: Stat[];
  chapters: CaseStudyChapter[];
  wins: string[];
  quote: string;
  quoteBy: string;
  quoteRole: string;
  photo?: string;
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "high-performance-academy",
    name: "High Performance Academy",
    industry: "Online education",
    duration: "Full-funnel testing program",
    tagline: "180 tests. Seven figures added. No extra ad spend.",
    headline: "Seven figures added. No extra ad spend.",
    summary:
      "Automotive education platform. 100,000+ students across 175 countries. Ad spend scaling, conversion rate stuck. Eighteen months of systematic testing moved that.",
    heroStats: [
      { v: "$1M+", l: "Extra revenue", sub: "Without extra ad spend" },
      { v: "35%", l: "Win rate", sub: "Industry avg ~22%" },
      { v: "180", l: "Tests shipped", sub: "From a standing start" },
      { v: "69%", l: "Homepage lift", sub: "New-visitor purchases" },
    ],
    stats: [
      { v: "$1M+", l: "Extra revenue" },
      { v: "35%", l: "Win rate" },
      { v: "180", l: "Tests shipped" },
      { v: "69%", l: "Lift on homepage" },
    ],
    chapters: [
      {
        heading: "The problem we walked into",
        body: [
          "HPA had built a great business teaching tuning and engineering to the aftermarket automotive industry. Their courses had been taken by over 100,000 students across 175 countries. The fundamentals were strong.",
          "But they&rsquo;d expanded their course catalogue without evolving the website or the messaging to match. Previous testing efforts had, in their words, humbled them. They needed to move from random experimentation to a system that compounded.",
        ],
      },
      {
        heading: "The research that unlocked it",
        body: [
          "We spent four weeks on discovery. On-site surveys. Email surveys. Analytics funnel analysis. Heatmap review. Session recordings. User testing.",
          "The insight that mattered: buyers weren&rsquo;t motivated by features. They were motivated by doing the job <em>the right way</em>. Three distinct purchase drivers surfaced. Self-improvement. Specific project builds. Career development. The homepage spoke to none of them directly.",
        ],
      },
      {
        heading: "Test 1: Homepage hero rewrite",
        body: [
          "We reframed the hero around the core motivation we&rsquo;d found in research. Variants like &ldquo;Learn how to build cars the right way&rdquo; and &ldquo;Build your project car the right way&rdquo; replaced the feature-led original.",
          "The winning variation lifted purchases from new visitors 69%. Add-to-carts went up 36%. The messaging rolled straight into paid ads and email, pulling the same insight through the whole funnel.",
        ],
      },
      {
        heading: "Test 2: Checkout friction removal",
        body: [
          "Customers had to sign up before they could buy. That friction was costing the team. We engineered a checkout that required only name and email at the start, keeping the login flow for returning customers.",
          "The variation shipped at 99% confidence. 8% lift across every checkout visitor. Projected annual value north of $300k on its own.",
        ],
      },
      {
        heading: "The program that kept paying",
        body: [
          "We scaled the testing cadence from zero to between five and ten live tests a month. Research kept feeding new hypotheses into the ICE-L prioritisation queue. Wins stayed live. Losses got documented.",
          "180 tests over 18 months. 35% win rate (industry average sits closer to 22%). Single wins bringing in six figures of additional revenue. None of it required an extra dollar of paid media.",
        ],
      },
      {
        heading: "What compounds harder than the numbers",
        body: [
          "The bigger shift is cultural. HPA&rsquo;s marketing team doesn&rsquo;t argue about ideas in meetings any more. They test them. Decisions that used to take weeks now take a sprint.",
          "That&rsquo;s the part we care about most. The tests pay for the program. The culture pays forever.",
        ],
      },
    ],
    wins: [
      "Homepage messaging rewrite drove 69% more new-visitor purchases and 36% more add-to-carts.",
      "Checkout friction removal shipped at 99% confidence with an 8% lift, projected $300k+/year.",
      "Insight from research rolled into paid ads, email, and product page copy.",
      "Testing cadence scaled from zero to 5-10 live experiments a month.",
      "35% win rate across 180 shipped experiments.",
    ],
    quote:
      "Working with Impact Conversion has been epic. We&rsquo;ve seen single wins that brought in six figures of additional revenue, which makes the ROI a no-brainer. Beyond the numbers, the testing process has instilled a culture of experimentation within our marketing team which has removed assumptions and helped us make better decisions.",
    quoteBy: "Ben Silcock",
    quoteRole: "Co-founder, High Performance Academy",
    featured: true,
  },
  {
    slug: "hpa-loss-leader",
    name: "High Performance Academy",
    industry: "Online education",
    duration: "Single test program",
    tagline: "36% more customers from a $1 offer.",
    headline: "One mobile page. CAC cut in half.",
    summary:
      "HPA&rsquo;s evergreen $1 trial on a normally $99 course. Great hook. Under-converting on mobile because it looked too good to be true. We fixed the believability problem.",
    heroStats: [
      { v: "+36%", l: "Conversion lift", sub: "99.8% confidence" },
      { v: "280", l: "New customers/mo", sub: "Incremental" },
      { v: "3,000+", l: "New customers/yr", sub: "Compounded" },
      { v: "-50%", l: "CAC", sub: "Halved" },
    ],
    stats: [
      { v: "+36%", l: "Conversion lift" },
      { v: "-50%", l: "CAC halved" },
      { v: "3,000+", l: "New customers/yr" },
    ],
    chapters: [
      {
        heading: "The offer that looked too good to be true",
        body: [
          "HPA ran an evergreen $1 promotional offer for a course that normally sold for $99. Great hook. Problem was, mobile visitors (95% of the traffic) weren&rsquo;t buying. The page converted at around 14% and most visitors didn&rsquo;t even scroll.",
          "Session recordings and heatmaps pointed to the same issue. Visitors thought it was a scam. Or that they&rsquo;d be locked into a subscription. The page did nothing to resolve either concern.",
        ],
      },
      {
        heading: "What we changed",
        body: [
          "We rebuilt the first two sections of the mobile page. Above the fold now explained exactly what the $1 bought, exactly what wasn&rsquo;t included (no recurring charge, no hidden fees), and why HPA was doing this in the first place.",
          "Plain. Specific. Addressed the objection straight on rather than dancing around it.",
        ],
      },
      {
        heading: "The numbers",
        body: [
          "36% lift in conversion at 99.8% confidence. About 280 additional new customers every month. Over 3,000 net-new customers a year without a dollar of extra ad spend.",
          "Customer acquisition cost effectively halved. The same paid traffic, twice as productive.",
        ],
      },
    ],
    wins: [
      "36% conversion lift on mobile at 99.8% confidence.",
      "~280 additional new customers every month.",
      "Over 3,000 additional new customers per year.",
      "CAC effectively halved on the paid channel funnelling into this offer.",
    ],
    quote:
      "We&rsquo;ve seen single wins that brought in six figures of additional revenue, which makes the ROI a no-brainer.",
    quoteBy: "Ben Silcock",
    quoteRole: "Co-founder, High Performance Academy",
  },
  {
    slug: "animal-training-academy",
    name: "Animal Training Academy",
    industry: "Online education",
    duration: "Funnel rebuild + ongoing program",
    tagline: "Membership up 57% in nine months. Revenue up 63%.",
    headline: "Membership up 57%. In nine months.",
    summary:
      "Quarterly launch model running out of steam. New member count falling. Churn rising. Lead quality dropping. We rebuilt the acquisition model end to end, from lead magnet through to the trial offer.",
    heroStats: [
      { v: "+57%", l: "Membership", sub: "In 9 months" },
      { v: "+43%", l: "YoY members", sub: "Sustained growth" },
      { v: "+63%", l: "MRR", sub: "In 9 months" },
      { v: "+30%", l: "Qualified leads", sub: "From better targeting" },
    ],
    stats: [
      { v: "+57%", l: "Membership in 9 months" },
      { v: "+63%", l: "MRR in 9 months" },
      { v: "+43%", l: "Members YoY" },
      { v: "+30%", l: "Qualified leads" },
    ],
    chapters: [
      {
        heading: "The scarcity model had run its course",
        body: [
          "ATA had been opening membership quarterly, using scarcity as the growth lever. For a while that worked. By the time we came in, each launch was delivering fewer new members than the last, and churn was eating into the base from the other end.",
          "Year-on-year was red. Lead volume looked fine on paper but closer to half of it was casual pet owners, not the professional trainer audience the product was built for.",
        ],
      },
      {
        heading: "Buying versus staying",
        body: [
          "Research pulled up a sharp split. Prospects signed up for a specific training problem. A reactive dog. A problem behaviour. Something immediate.",
          "Members stayed because of the community and the expert access. The sales messaging had been selling the staying reason to cold prospects. They weren&rsquo;t there for that yet. No wonder conversion had flatlined.",
        ],
      },
      {
        heading: "Fixing the leads first",
        body: [
          "We added a single question to the signup form: &ldquo;Why do you want this training?&rdquo; Fed responses through a Looker Studio dashboard back into Meta&rsquo;s audience signals. Rewrote ad copy to speak directly to professional trainers.",
          "Unqualified leads dropped out. Qualified leads went up 30%. The list stopped growing for growth&rsquo;s sake and started filtering for fit.",
        ],
      },
      {
        heading: "The $1 trial that changed the math",
        body: [
          "We introduced a $1, 30-day trial. Lower the cost of saying yes. Make the first month about solving the immediate problem, not about committing to community.",
          "Over 200 trial signups in the first two weeks. 50% converted straight to full paid membership. A dedicated landing page, tight USPs, objection handlers, social proof. Nothing fancy. Just research turned into copy.",
        ],
      },
      {
        heading: "The funnel after rebuild",
        body: [
          "New homepage with messaging mapped to the buying reason, not the staying reason. Lead magnet page offering a free training guide. Dedicated $1 trial page. A flexible webinar landing page template we could spin up for each expert guest.",
          "Membership up 57% in nine months. MRR up 63%. YoY members up 43%. The funnel finally carrying its weight.",
        ],
      },
    ],
    wins: [
      "Membership growth of 57% in nine months.",
      "Monthly recurring revenue up 63% in nine months.",
      "Year-on-year member growth of 43%.",
      "Qualified leads up 30% from targeting and screening changes.",
      "$1 trial converting 50% to full paid membership.",
    ],
    quote:
      "Working with Impact Conversion has been a super valuable experience for the Animal Training Academy. From the outset, the team has demonstrated a commitment to understanding our unique challenges and objectives. Having them on our team has been a major asset.",
    quoteBy: "Ryan Cartlidge",
    quoteRole: "Founder, Animal Training Academy",
  },
  {
    slug: "kite-therapy",
    name: "Kite Therapy",
    industry: "Lead generation",
    duration: "Heuristic analysis + testing",
    tagline: "Clarity beat persuasion.",
    headline: "More leads. Better leads. Lower CAC.",
    summary:
      "VC-backed Australian startup. Parent-led therapy coaching for children with autism and developmental delays. Strong paid traffic, but the site wasn&rsquo;t carrying the promise.",
    heroStats: [
      { v: "↑", l: "Lead volume", sub: "Clearer UVP" },
      { v: "↑", l: "Lead quality", sub: "Pre-qualified up front" },
      { v: "↓", l: "CAC", sub: "Sustainable paid scale" },
      { v: "4", l: "Root causes", sub: "Surfaced by heuristic review" },
    ],
    stats: [
      { v: "↑", l: "Lead submissions" },
      { v: "↑", l: "Lead quality" },
      { v: "↓", l: "CAC" },
    ],
    chapters: [
      {
        heading: "Paid was working. The site wasn&rsquo;t.",
        body: [
          "Kite&rsquo;s proposition was strong. Make therapy more accessible for families by coaching parents to lead it. Testimonials backed it up. Paid was pulling traffic.",
          "But the leads weren&rsquo;t matching the fit profile. Cost per acquisition was trending the wrong way. The site, bluntly, wasn&rsquo;t helping the paid channel do its job.",
        ],
      },
      {
        heading: "What the heuristic analysis surfaced",
        body: [
          "We ran a full heuristic review of the homepage and conversion pages alongside analytics, heatmaps, and user surveys. Four issues kept surfacing.",
          "One: the hero didn&rsquo;t spell out what Kite actually did, so visitors had to work to figure it out. Two: the online-only therapy model wasn&rsquo;t stated up front, so in-person-seeking prospects wasted their time and Kite&rsquo;s ad spend. Three: the differentiation from traditional providers wasn&rsquo;t landing. Four: visitors bounced between the consultation page and the About page looking for therapist information that wasn&rsquo;t easy to find.",
        ],
      },
      {
        heading: "What clarity did",
        body: [
          "We rewrote the UVP for clarity, not cleverness. Stated the online-only format up front as a benefit, not a caveat. Reframed the model&rsquo;s differences as advantages instead of letting visitors guess. Surfaced individual therapist profiles directly on the landing pages so trust-building didn&rsquo;t require a scavenger hunt.",
          "Clarity outperformed persuasion. Lead volume went up. Lead quality went up faster. And the paid channel had a better landing experience to work with.",
        ],
      },
    ],
    wins: [
      "Lead submissions increased from clearer UVP and above-the-fold clarity.",
      "Lead quality improved from stating the online-only model up front.",
      "CAC trended down on paid because the site finally matched the ad intent.",
    ],
    quote:
      "Impact have been fantastic to work with. They&rsquo;ve provided actionable advice and the changes have made a real difference.",
    quoteBy: "Matthew Morrison",
    quoteRole: "Co-founder, Kite Therapy",
    photo: "/assets/avatar-matt.png",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
