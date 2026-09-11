export type Stat = { v: string; l: string; sub?: string };

export type CaseStudyFigure = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Constrain width for tall/narrow crops so they don't dominate the column. */
  narrow?: boolean;
};

/** Named data visuals recreated in markup, rendered by the case study page. */
export type CaseStudyVisual =
  | "sr-baseline-rpv"
  | "sr-research"
  | "sr-funnel"
  | "sr-mix"
  | "sr-rpv-yoy";

export type CaseStudyChapter = {
  heading: string;
  body: string[];
  figure?: CaseStudyFigure;
  visual?: CaseStudyVisual;
};

/** A card in the wins carousel. Opens the control-vs-variation screenshot. */
export type WinCard = {
  id: string;
  lift: string;
  name: string;
  image: string;
  width: number;
  height: number;
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
  winCards?: WinCard[];
  wins: string[];
  quote?: string;
  quoteBy?: string;
  quoteRole?: string;
  photo?: string;
  heroImage?: string;
  heroImageAlt?: string;
  featured?: boolean;
  /** Draft = renders at its URL but excluded from sitemap, listing grid, and "other studies". Shows a draft banner. */
  draft?: boolean;
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
      { v: "$1M-$2M", l: "Extra revenue", sub: "Without extra ad spend" },
      { v: "35%", l: "Win rate", sub: "Roughly 2x industry typical" },
      { v: "180", l: "Tests shipped", sub: "From a standing start" },
      { v: "69%", l: "Homepage lift", sub: "New-visitor purchases" },
    ],
    stats: [
      { v: "$1M-$2M", l: "Extra revenue" },
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
          "We scaled the testing cadence from zero to between five and ten live tests a month. Research kept feeding new hypotheses into the prioritisation queue. Wins stayed live. Losses got documented.",
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
      "Working with Impact Conversion has been epic. We’ve seen single wins that brought in six figures of additional revenue, which makes the ROI a no-brainer. Beyond the numbers, the testing process has instilled a culture of experimentation within our marketing team which has removed assumptions and helped us make better decisions.",
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
      "HPA’s evergreen $1 promo on a $99 course performed beautifully on Meta, then stalled on the mobile page where 95% of the traffic landed and conversion sat at 14%. Session recordings told us why: visitors thought it was a scam. We rewrote the first two sections to address that head-on, and mobile conversion rose 36%.",
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
          "Plain and specific, and it addressed the objection straight on rather than dancing around it.",
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
      "We’ve seen single wins that brought in six figures of additional revenue, which makes the ROI a no-brainer.",
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
      "By the time ATA came to us, their quarterly launch model was running on fumes: each cohort smaller than the last, churn climbing, and most new leads were casual pet owners rather than the professional trainers the program served. We rebuilt the acquisition model, from lead magnet through to a $1 trial offer.",
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
          "We added a single question to the signup form: &ldquo;Why do you want this training?&rdquo; We fed the responses through a Looker Studio dashboard back into Meta&rsquo;s audience signals, and rewrote the ad copy to speak directly to professional trainers.",
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
      "Kite is a VC-backed Australian startup making therapy more accessible to families of children with autism and developmental delays, by coaching parents to lead it. Paid was pulling traffic. The site wasn’t pulling its weight, until a heuristic review caught four issues nobody else had.",
    heroStats: [
      { v: "4", l: "Root causes", sub: "Found in heuristic review" },
      { v: "Higher", l: "Lead volume", sub: "Clearer UVP" },
      { v: "Higher", l: "Lead quality", sub: "Pre-qualified up front" },
      { v: "Lower", l: "CAC", sub: "Sustainable paid scale" },
    ],
    stats: [
      { v: "Higher", l: "Lead submissions" },
      { v: "Higher", l: "Lead quality" },
      { v: "Lower", l: "CAC" },
    ],
    chapters: [
      {
        heading: "Paid was working. The site wasn’t.",
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
      "Impact have been fantastic to work with. They’ve provided actionable advice and the changes have made a real difference.",
    quoteBy: "Matthew Morrison",
    quoteRole: "Co-founder, Kite Therapy",
    photo: "/assets/avatar-matt.png",
    heroImage: "/assets/case-studies/kite-hero.png",
    heroImageAlt: "Kite Therapy homepage",
  },
  {
    slug: "steadyrack",
    name: "Steadyrack",
    industry: "D2C e-commerce",
    duration: "Ongoing CRO program",
    tagline:
      "27 tests, one insight, and the premium rack started taking share from the rack it competes with.",
    headline:
      "Buyers could not tell which rack fitted their bike. Naming it worked on all five pages we tried.",
    summary:
      "Steadyrack sells wall-mounted vertical bike racks across the world from Perth. They came to us with rising acquisition costs, customers getting confused when buying the premium product, and no structured way to test. Six months in: 11 wins from 27 completed tests, premium rack units up 19.6% on flat total volume, and one finding that won on every surface we applied it to.",
    heroStats: [
      { v: "+10%", l: "Added annual run rate", sub: "What the shipped wins are worth over a full year once all are live" },
      { v: "+28%", l: "Premium rack orders", sub: "Collection page test, 98% confidence" },
      { v: "+19.6%", l: "Premium rack units sold", sub: "On flat total rack volume, Shopify" },
      { v: "41%", l: "Test win rate", sub: "11 wins from 27 completed tests" },
    ],
    stats: [
      { v: "+10%", l: "Added annual run rate" },
      { v: "+28%", l: "Premium rack orders" },
      { v: "41%", l: "Test win rate" },
    ],
    chapters: [
      {
        heading: "Why they brought us in",
        body: [
          "Customer acquisition costs were rising, especially in the US. Most Steadyrack customers buy once, so every first order has to be profitable on its own.",
          "In their words, the product was the other half of the problem. People can be very overwhelmed with a technical product, and the job is finding the line between giving the consumer too much and not giving them enough. Meanwhile there was no structured way to test website changes.",
          "Three Shopify Plus stores, earning less per visitor than the category benchmark. At that kind of volume, a small lift in revenue per visitor pays for itself quickly. The brief was a proper testing program with the research to back it, not best-practice guesses.",
        ],
      },
      {
        heading: "The premium product was the problem",
        body: [
          "Before the program, a visit to the ProFlex product page was worth less than half a visit to the cheaper Classic MTB page, and it converted at less than half the rate. Of the six rack product pages on the site, the premium one earned the least per visit.",
          "The funnel said the same thing. Steadyrack sat under benchmarks at every step except the cart.",
          "Product view to add-to-cart is the money step, and it was the furthest away from being at benchmark. People arrived, looked, and could not decide.",
        ],
        visual: "sr-baseline-rpv",
      },
      {
        heading: "The research.",
        body: [
          "Surveys, heatmaps, session recordings, support tickets, mined reviews and the funnel itself all converged on the same confusion: which rack do I need?",
          "Seventeen percent of support tickets were sizing questions, people asking the business what the website should have answered. Eighty percent of returns came from people who had been confused about sizing and space. Session recordings and user tests showed size buttons being ignored on the collection page, with add-to-cart possible without choosing a size at all.",
        ],
        visual: "sr-research",
      },
      {
        heading: "People shop by what’s in their garage",
        body: [
          "The ProFlex range came in three variants named Narrow, Wide and Fat. Those are brand names that describe the rack, not the bike. To find out which one fitted their bike, a buyer had to click through to a separate page, which only about 5% of users did.",
          "Everything that followed put the answer in the buyer&rsquo;s own language, in the path, without asking them to do anything: which bike you ride, which rack you need. We tested that idea on the collection page, the product page, the filters, the cart drawer and the homepage. All five came back positive.",
          "Splitting ProFlex into three bike-type products on the collection page lifted ProFlex orders 28 percent. A &ldquo;best suited for&rdquo; line above the variant selector lifted ProFlex conversion 24 percent. Bike-type filter buttons lifted conversion 8 percent and revenue per visitor 10 percent. Repeating the same line in the cart drawer lifted conversion 8.7 percent. Splitting the racks out in the homepage best sellers lifted it 9.6 percent.",
          "Five surfaces, one idea, five positive reads. A single test can get lucky. The same mechanism pointing the same way five times running is the finding.",
        ],
        figure: {
          src: "/assets/case-studies/steadyrack/tests/sr009.jpg",
          alt: "Control against variation on the ProFlex product page. The variation adds a Best suited for line naming the bike types each size fits.",
          width: 1600,
          height: 2207,
          caption:
            "Before and after. On the left, three sizes named Narrow, Wide and Fat with Best Suited For folded into an accordion further down the page. On the right, the bike types each size fits, named in the buyer’s own language, right where the choice is made.",
        },
      },
      {
        heading: "What turned out not to be a lever",
        body: [
          "Detail overwhelmed the customer. People exited buying mode, and went into analysis mode. A modal that asked buyers to measure their tyre lost, and lost badly. Have the detail available for anyone who goes looking, but keep it off the page where the decision happens.",
          "Trust surprisingly turned out not to be a lever here. Steadyrack has sold over 1 million racks worldwide and the brand carries that weight already. Repeated attempts to add trust signals did nothing, and sometimes did worse than nothing.",
          "Shipping was not a lever either. Three separate tests on thresholds and framing all came back flat. Neither was the navigation: two restructures lost, and only about 4 percent of visitors touch the nav at all.",
          "Eleven of the 27 tests we completed produced a winner worth shipping. The other sixteen either lost or came back flat, and both are cheaper than shipping a guess and finding out later.",
        ],
      },
      {
        heading: "What changed in what people bought",
        body: [
          "In their own sales data, the premium rack sold 19.6 percent more units year on year and earned 26.2 percent more revenue, while total rack volume stayed flat. Buyers were not buying more racks. They were choosing the premium one more often, which is exactly what the tests were designed to do. Across the whole range, ProFlex went from 44.4 percent of rack units to 53.8 percent, and from 50.6 percent of rack revenue to 60.4 percent.",
          "Steadyrack&rsquo;s own team was straight with us about what else moved in the same window: two Classic models were phased out, and the ad creative shifted heavily toward ProFlex. Both would push that range-wide number up on their own.",
          "So here is the same shift with those effects removed, month by month. ProFlex Wide against Classic MTB, the two racks neither the phase-out nor the creative change touched, both on sale throughout. For the seven months before the first win shipped it sat at 43.9 percent and never once cleared 47. In the four months after it averaged 48 percent, and every month except the mid-year sale is higher than every month that came before. August, the most recent full month, is the highest in the series at 53.7 percent.",
          "The calendar then does something useful. In the first week of April, three weeks before our test went live, Steadyrack&rsquo;s media team rerouted most of their paid traffic away from the ProFlex page. If the mix shift were really about advertising, that is the moment it should have moved. Week by week, share over those three weeks went to 40.5 percent, slightly down on the 42.9 percent that came before. It rose to 48 percent only once the test shipped, and it has stayed there. For the rest of the year the two series pull against each other: the weeks with the least paid traffic on that page are among the strongest for premium share.",
        ],
        visual: "sr-mix",
        figure: {
          src: "/assets/case-studies/steadyrack/proflex-studio.jpg",
          alt: "A gravel bike stored vertically on a wall-mounted Steadyrack ProFlex rack, studio shot",
          width: 1800,
          height: 1012,
          caption:
            "ProFlex, the premium rack. It was the page buyers hesitated on, and it is steadily becoming the one they choose.",
        },
      },
      {
        heading: "The number we will not quote",
        body: [
          "Most case studies would put a sitewide conversion lift at the top of this page. We are not going to, and the reason is worth more than the number would have been.",
          "Steadyrack&rsquo;s analytics captured 70 percent of their orders in one of the two years we were comparing and 97 percent in the other. Nothing about the business changed. The tracking got better. Any year-on-year rate built on top of that is measuring the tracking, not the work, and it would have flattered us by a wide margin.",
          "Their marketing manager caught it, we checked it, and it came out of this page. A/B tests do not have that problem: both versions run at the same time, on the same tracking, so whatever the analytics miss, they miss equally. That is why the numbers above come from tests and from their own sales data rather than from a year-on-year rate.",
        ],
      },
      {
        heading: "So what did a visit become worth",
        body: [
          "Which brings us back to the page the program was pointed at, measured properly this time. Same six months, both years, each year restated against Steadyrack&rsquo;s own Shopify totals so the capture problem above cancels out on both sides.",
          "A visit to the premium page was worth $3.66 in 2025 and $4.38 in 2026, up 19.7 percent. Left uncorrected, the same two years read +84 percent, which is roughly the figure we nearly published and four times the real one.",
          "The fair objection is that 2026 had a warmer audience, because far more paid traffic landed on this page the year before. So we checked inside the channel rather than across it. Among paid social visitors, the page&rsquo;s largest source in both years and 43,000 sessions of it in 2025, revenue per visit rose 20.5 percent. Same people, arriving the same way, worth a fifth more each. Two smaller channels move the other way, and we have left that on the chart rather than out of it.",
        ],
        visual: "sr-rpv-yoy",
      },
      {
        heading: "The overall result",
        body: [
          "We do not annualise every winning test and call it a day. Each winner is weighted by that page&rsquo;s share of site orders, annualised, then corrected for seasonality and for results that got statistically lucky, using the standard winner&rsquo;s-curse correction.",
          "That correction is not cosmetic. The uncorrected platform total is roughly three times larger than the number we actually quote. We quote the corrected one.",
          "On that basis, the wins shipped in the first six months are worth a little over 10 percent of Steadyrack&rsquo;s annual North American revenue. That is a forward run rate rather than money already banked. The wins went live one at a time between late April and August, so only a part of that value fell inside the first six months, and the rest accrues over the next twelve as they keep running. The wins have since been hardcoded across all three stores.",
          "One more read that does not depend on any of that modelling. In Steadyrack&rsquo;s own checkout data, filtered to real human sessions by Shopify itself, checkout completion rose from 49.9 percent to 52.2 percent year on year across the same six-week-plus window. That stage was already above benchmark before we started, and it still moved.",
        ],
      },
      {
        heading: "What’s next?",
        body: [
          "The biggest lever so far has been unblocking: making it easier to work out what to buy. That finding is tested and locked in, hardcoded across all three stores, and there are still more tests to come.",
          "The next phase moves from unblocking buyers to motivating them. Pricing and elasticity, economics, bundling and order value, and the messaging that makes someone want the premium rack rather than merely understand it. That work compounds: the same answers feed the product pages, the ads, the landing pages, and the markets where comprehension was never the problem.",
          "The endgame is a repeatable testing engine, so that every new product launch gets the same treatment the racks got.",
        ],
      },
    ],
    winCards: [
      {
        id: "SR-006",
        lift: "+28% ProFlex orders",
        name: "Collection page split by bike type",
        image: "/assets/case-studies/steadyrack/tests/sr006.jpg",
        width: 1600,
        height: 2607,
      },
      {
        id: "SR-009",
        lift: "+24% ProFlex conversion",
        name: "“Best suited for” on the product page",
        image: "/assets/case-studies/steadyrack/tests/sr009.jpg",
        width: 1600,
        height: 2207,
      },
      {
        id: "SR-016",
        lift: "+8% CVR, +10% RPV",
        name: "Filter pills by bike type",
        image: "/assets/case-studies/steadyrack/tests/sr016.jpg",
        width: 1600,
        height: 748,
      },
      {
        id: "SR-022",
        lift: "+8.7% conversion",
        name: "Compatibility repeated in the cart drawer",
        image: "/assets/case-studies/steadyrack/tests/sr022.jpg",
        width: 1600,
        height: 1618,
      },
      {
        id: "SR-025",
        lift: "+9.6% conversion",
        name: "Homepage best sellers split out",
        image: "/assets/case-studies/steadyrack/tests/sr025.jpg",
        width: 1600,
        height: 732,
      },
      {
        id: "SR-013",
        lift: "+24% add to cart",
        name: "ProFlex vs Classic comparison table",
        image: "/assets/case-studies/steadyrack/tests/sr013.jpg",
        width: 1600,
        height: 1905,
      },
      {
        id: "SR-012",
        lift: "+9% mobile conversion",
        name: "USP cards on the product hero image",
        image: "/assets/case-studies/steadyrack/tests/sr012.jpg",
        width: 1600,
        height: 1744,
      },
      {
        id: "SR-017",
        lift: "+16.2% mobile conversion",
        name: "Install and wall-spacing answers in the FAQ",
        image: "/assets/case-studies/steadyrack/tests/sr017.jpg",
        width: 1600,
        height: 915,
      },
      {
        id: "SR-011",
        lift: "+35% GearMate add to cart",
        name: "GearMate upsell in the cart",
        image: "/assets/case-studies/steadyrack/tests/sr011.jpg",
        width: 1600,
        height: 1239,
      },
      {
        id: "SR-027",
        lift: "+9% mobile product views",
        name: "Two-up mobile collection grid",
        image: "/assets/case-studies/steadyrack/tests/sr027.jpg",
        width: 1600,
        height: 1618,
      },
      {
        id: "SR-031",
        lift: "+9.6% revenue per visitor",
        name: "Video widget removed from the buy box",
        image: "/assets/case-studies/steadyrack/tests/sr031.jpg",
        width: 1600,
        height: 783,
      },
    ],
    wins: [
      "The same fix tested on five separate surfaces and came back positive on all five.",
      "Collection page bike-type split lifted premium-rack orders 28% at 98% confidence.",
      '"Best suited for" labelling lifted premium-rack conversion 24%.',
      "11 winners from 27 completed tests, with every loss written into the rules the next test obeys.",
      "Premium rack units up 19.6% and its revenue up 26.2%, on flat total rack volume.",
      "Premium rack share of the range up from 44.4% to 53.8% of units, and 50.6% to 60.4% of revenue.",
      "On the like-for-like cut that strips out the range and media changes, 43.9% to 48.0%, and every month after the first win above every month before it.",
      "Checkout completion up from 49.9% to 52.2% year on year in their own bot-filtered Shopify data.",
      "A documented learnings library where every loss became a rule the next test obeys.",
      "Shipped wins worth a little over 10% of annual North American revenue as a forward run rate, after a winner's-curse correction.",
    ],
    heroImage: "/assets/case-studies/steadyrack-hero.jpg",
    heroImageAlt:
      "A workshop wall of mountain bikes stored vertically on Steadyrack racks, with two racks left empty",
    featured: false,
    draft: true,
  },
  {
    slug: "destination-queenstown",
    name: "Destination Queenstown",
    industry: "Tourism",
    duration: "Research-led website rebuild",
    tagline: "Giving a landmark tourism strategy the digital home it deserved.",
    headline: "A regional tourism strategy, freed from a PDF.",
    summary:
      "Destination Queenstown is the regional tourism organisation for one of the world&rsquo;s best-known destinations. Its Regenerative Tourism plan is the blueprint for the region&rsquo;s future, and it lived inside a dense PDF on a microsite shoehorned into the main site. We rebuilt it as regenerativetourism.co.nz, designed around what each audience actually came to do.",
    heroStats: [
      { v: "1", l: "PDF retired as the front door", sub: "Strategy rewritten for the web" },
      { v: "4", l: "Audiences, each with a path", sub: "Operators, partners, community, visitors" },
      { v: "Own domain", l: "regenerativetourism.co.nz", sub: "Out of the parent site" },
    ],
    stats: [
      { v: "1 PDF", l: "Retired as the front door" },
      { v: "4", l: "Audience paths" },
      { v: "Own", l: "Domain and CMS" },
    ],
    chapters: [
      {
        heading: "The brief",
        body: [
          "We usually advise against full rebuilds in favour of iterative optimisation. This was the exception. The Regenerative Tourism program had a restrictive microsite inside the main Destination Queenstown website, which forced every stakeholder down the same confusing path and buried the strategy itself inside a multi-page PDF.",
          "The goal was not a redesign. It was to fix a broken conversion funnel: stop losing engaged visitors, make the strategy readable, and turn visitors into informed, supportive stakeholders.",
        ],
      },
      {
        heading: "What the research found",
        body: [
          "The PDF was where engagement went to die. Anyone who wanted to understand the plan had to download a file. The information existed, but it was inaccessible, and the drop-off showed it.",
          "There was no path for anyone in particular. Local operators, council and government partners, and community members each had a different job to do, and all of them were pushed down one route that suited none of them. The constrained parent-site layout could not build a narrative or guide people to what mattered to them.",
        ],
      },
      {
        heading: "The approach",
        body: [
          "Before any design work, we rebuilt the information architecture using the jobs-to-be-done framework, mapping the primary task for each audience into its own clear path. Moving the program to its own domain was the first step that made those paths possible.",
          "We treated the PDF as a conversion blocker and removed it. The strategic material was synthesised, rewritten for the web, and surfaced in short scannable sections, so a high-effort download became a low-effort read.",
          "To de-risk the build, we produced a full clickable prototype in Figma and tested the new flows with stakeholders before a line of code was written. It caught the rework early and got everyone aligned on the answer.",
        ],
      },
      {
        heading: "The result",
        body: [
          "Engagement and time on page rose once visitors could find and read what they came for. Operators, partners and the community each got a clear route to their task.",
          "The editor-friendly CMS lets the team publish progress updates, projects and stories without a developer, which is what keeps a strategy site alive after launch. Two years on, the site is still the program&rsquo;s home and we still maintain it.",
        ],
      },
    ],
    wins: [
      "A dense strategy PDF replaced with scannable on-page content.",
      "Dedicated paths for operators, partners, community and visitors, built from jobs-to-be-done research.",
      "A standalone domain and CMS the DQ team publishes to without a developer.",
      "Clickable Figma prototype validated with stakeholders before build.",
    ],
    quote:
      "Impact were instrumental in bringing our vision for regenerativetourism.co.nz to life. Their expertise in web design and UX helped us transform our Destination Management Plan into an accessible, user-friendly digital platform. What stood out was their ability to translate complex strategic content into a clear, engaging website that serves diverse stakeholders, from local businesses to visitors.",
    quoteBy: "Sherri Gibb",
    quoteRole: "Digital Marketing Manager, Destination Queenstown",
    heroImage: "/assets/case-studies/regen-hero.jpg",
    heroImageAlt: "regenerativetourism.co.nz homepage: Travel to a Thriving Future",
  },
  {
    slug: "wanaka-isite",
    name: "Wānaka isite",
    industry: "Tourism",
    duration: "Conversion-led site build, 2026",
    tagline: "One page, one job: get visitors to the counter.",
    headline: "A visitor centre website built around the only two things visitors do.",
    summary:
      "The Wānaka isite is the official visitor information centre for Wānaka. When it separated from Lake Wānaka Tourism it needed its own site, fast. Rather than a brochure, we built a single page around the two actions that matter: enquire, and get directions. Everything else on the page exists to make those two easier.",
    heroStats: [
      { v: "10%", l: "Conversion rate", sub: "Enquiry, directions or booking click, first two months" },
      { v: "1", l: "Page", sub: "No brochure, no PDFs" },
      { v: "2", l: "Actions the page is built for", sub: "Enquire and get directions" },
    ],
    stats: [
      { v: "10%", l: "Conversion rate" },
      { v: "1", l: "Page" },
      { v: "2", l: "Actions" },
    ],
    chapters: [
      {
        heading: "The brief",
        body: [
          "Visitor centre websites tend to become small brochures: a history, a list of services, a gallery, a PDF map. The person who lands on them has a simpler question. Where are you, when are you open, and can you help me plan and book my trip?",
          "The isite was decoupling from the regional tourism site and had no web presence of its own. It needed one that answered those questions immediately and captured the enquiries that used to arrive through the parent site.",
        ],
      },
      {
        heading: "The approach",
        body: [
          "We built one page. The hero states what the centre does in one line, and the strip beneath it carries opening hours, the street address, phone and email before anyone scrolls. Two calls to action, enquire and get directions, repeat through the page. Nothing competes with them.",
          "The contact form posts straight to the team&rsquo;s inbox and fires a tracked conversion event, so every enquiry is measured from the first day. Local business schema, geo metadata and a submitted sitemap give Google what it needs to show the centre for the searches visitors actually make.",
          "The design is the isite brand done properly: the national lozenge, the Pākati motif, local photography, and the accreditation badges that tell an international visitor this is the official source.",
        ],
      },
      {
        heading: "The result",
        body: [
          "The site went live in July 2026 with analytics, search console and enquiry tracking in place, so the centre can see what visitors ask for and where they come from.",
          "In its first two months, 10 percent of visits converted: an enquiry sent, directions requested, or a click through to book. Two thirds of that traffic arrived from organic search and referrals, on a site that did not exist in June. It is the same discipline we bring to a testing program: decide what the page is for, remove everything that gets in the way, and measure the outcome.",
        ],
      },
    ],
    wins: [
      "10% of visits convert to an enquiry, a directions request or a booking click in the first two months.",
      "One page built around two actions: enquire and get directions.",
      "Hours, address, phone and email above the fold, no PDF map.",
      "Every enquiry tracked as a conversion event from launch.",
      "Local business schema and search setup for the searches visitors make.",
    ],
    heroImage: "/assets/case-studies/wanaka-isite-hero.jpg",
    heroImageAlt: "wanakaisite.co.nz homepage: Walk in a visitor. Leave an explorer.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
