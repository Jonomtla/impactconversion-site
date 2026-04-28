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
  heroImage?: string;
  heroImageAlt?: string;
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
      "After expanding their course catalogue without updating the site to match, HPA had hit the wall every scaling brand hits: more ad spend, same conversion rate, no compounding. Customer research found the actual motivation. Eighteen months of testing rolled it through every page. Seven figures added. Same ad spend.",
    heroStats: [
      { v: "$1M+", l: "Extra revenue", sub: "Without extra ad spend" },
      { v: "35%", l: "Win rate", sub: "Roughly 2x industry typical" },
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
          "HPA had built a strong business teaching tuning and engineering to the aftermarket automotive industry, with over 100,000 students across 175 countries already through the courses. The fundamentals were there.",
          "But they&rsquo;d expanded their course catalogue without evolving the website or the messaging to match. Previous testing efforts had, in their words, humbled them. They needed to move from random experimentation to a system that compounded.",
        ],
      },
      {
        heading: "The research that unlocked it",
        body: [
          "We spent four weeks on discovery, running on-site surveys, email surveys, analytics funnel analysis, heatmap review, session recordings, and user testing all at once. Six methods. One question: why do these buyers actually buy?",
          "The insight that mattered: buyers weren&rsquo;t motivated by features. They wanted to do the job <em>the right way</em>. Three purchase drivers came out of the research (self-improvement, specific project builds, career development), and the homepage spoke to none of them directly.",
        ],
      },
      {
        heading: "Test 1: Homepage hero rewrite",
        body: [
          "We reframed the hero around the core motivation we&rsquo;d found in research. Variants like &ldquo;Learn how to build cars the right way&rdquo; and &ldquo;Build your project car the right way&rdquo; replaced the feature-led original.",
          "The winning variation lifted purchases from new visitors by 69% and add-to-carts by 36%. From there the messaging rolled straight into paid ads and email, pulling the same insight through the whole funnel.",
        ],
      },
      {
        heading: "Test 2: Checkout friction removal",
        body: [
          "Customers had to sign up before they could buy. That friction was costing the team. We engineered a checkout that required only name and email at the start, keeping the login flow for returning customers.",
          "The variation shipped at 99% confidence with an 8% lift across every checkout visitor, which on its own projected to over $300k a year.",
        ],
      },
      {
        heading: "The program that kept paying",
        body: [
          "We scaled the testing cadence from zero to between five and ten live tests a month. Research kept feeding new hypotheses into the ICE-L prioritisation queue. Wins stayed live. Losses got documented.",
          "180 tests in 18 months, at a 35% win rate (roughly double the industry typical), with single wins bringing in six figures of additional revenue. None of it required an extra dollar of paid media.",
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
    heroImage: "/assets/case-studies/hpa-hero.png",
    heroImageAlt: "High Performance Academy homepage",
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
      "HPA&rsquo;s evergreen $1 promo on a $99 course performed beautifully on Meta and converted at 14% on mobile, where 95% of the traffic landed. The reason was simple: visitors thought it was a scam. We rewrote the first two sections to address that head-on. Mobile conversion rose 36%.",
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
          "Mobile conversion lifted 36% at 99.8% confidence, which translated to roughly 280 additional new customers every month and over 3,000 net-new customers in the year that followed, without a dollar of extra ad spend.",
          "Customer acquisition cost was effectively halved. Same paid traffic. Twice as productive.",
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
    heroImage: "/assets/case-studies/hpa-loss-leader.png",
    heroImageAlt: "High Performance Academy $1 trial mobile landing page",
  },
  {
    slug: "animal-training-academy",
    name: "Animal Training Academy",
    industry: "Online education",
    duration: "Funnel rebuild + ongoing program",
    tagline: "Membership up 57% in nine months. Revenue up 63%.",
    headline: "Membership up 57%. In nine months.",
    summary:
      "By the time ATA came to us, their quarterly launch model was running on fumes: each cohort smaller than the last, churn climbing, and most new leads were casual pet owners rather than the professional trainers the program served. We rebuilt the acquisition model. Lead magnet to trial offer.",
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
          "Research pulled up a sharp split. Prospects signed up to solve a specific training problem (a reactive dog, a stubborn problem behaviour, something immediate), and they were buying that fix, not a community.",
          "Members stayed for a different reason entirely: the community and the expert access. The sales messaging had been selling the staying reason to cold prospects, who weren&rsquo;t there for it yet, and the conversion rate had flatlined as a result.",
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
          "Over 200 trial signups landed in the first two weeks, and 50% of them converted straight to full paid membership. The landing page itself was nothing fancy: tight USPs, the right objection handlers, social proof at the right beats. Just research turned into copy.",
        ],
      },
      {
        heading: "The funnel after rebuild",
        body: [
          "The rebuild ran top to bottom. A new homepage mapped to the buying reason rather than the staying reason. A lead magnet page offering a free training guide. A dedicated $1 trial page. A flexible webinar landing page template we could spin up for each expert guest.",
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
    heroImage: "/assets/case-studies/ata-hero.png",
    heroImageAlt: "Animal Training Academy homepage",
  },
  {
    slug: "kite-therapy",
    name: "Kite Therapy",
    industry: "Lead generation",
    duration: "Heuristic analysis + testing",
    tagline: "Clarity beat persuasion.",
    headline: "More leads. Better leads. Lower CAC.",
    summary:
      "Kite is a VC-backed Australian startup making therapy more accessible to families of children with autism and developmental delays, by coaching parents to lead it. Paid was pulling traffic. The site wasn&rsquo;t pulling its weight, until a heuristic review surfaced four issues nobody had flagged.",
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
          "One: the hero didn&rsquo;t spell out what Kite did, so visitors had to work to figure it out. Two: the online-only therapy model wasn&rsquo;t stated up front, so in-person-seeking prospects wasted their time and Kite&rsquo;s ad spend. Three: the differentiation from traditional providers wasn&rsquo;t landing. Four: visitors bounced between the consultation page and the About page looking for therapist information that wasn&rsquo;t easy to find.",
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
    heroImage: "/assets/case-studies/kite-hero.png",
    heroImageAlt: "Kite Therapy homepage",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
