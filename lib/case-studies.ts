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
  | "sr-mix";

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
      "27 tests, one insight, and the premium rack went from the worst page on the site to the majority of sales.",
    headline: "$660k a year, added in six months.",
    summary:
      "The premium rack was the worst page on the site. Now it outsells everything else. Steadyrack sells wall-mounted vertical bike racks across the world from Perth. They came to us with rising ad costs, customers getting confused when purchasing their premium product, and no testing in place. The results? A 10x return on our fee, $660k added in annual run rate after six months of working with us.",
    heroStats: [
      { v: "$660k", l: "Added annual run rate", sub: "Reached inside six months" },
      {
        v: "10x",
        l: "Return on investment",
        sub: "Conservatively, before taking into account all markets",
      },
      { v: "+74.5%", l: "ProFlex revenue per visitor", sub: "Year on year" },
    ],
    stats: [
      { v: "53.8%", l: "ProFlex share of units" },
      { v: "+74.5%", l: "ProFlex revenue per visitor" },
      { v: "41%", l: "Test win rate" },
    ],
    chapters: [
      {
        heading: "Why they brought us in",
        body: [
          "Costs of sale were coming in over budget, especially in the US, and a large slice of revenue was going straight to Meta. Steadyrack is mostly a one-purchase brand, so every first order has to be profitable on its own.",
          "In their words, the product was the other half of the problem. People can be very overwhelmed with a technical product, and the job is finding the line between giving the consumer too much and not giving them enough. Meanwhile the website changes themselves had no structure: no in-house developer, no testing framework, updates made on feel between busier jobs.",
          "Three Shopify Plus stores converting at 1.2 to 2 percent. At that kind of volume, a single point of conversion pays for itself quickly. The brief was a proper testing program with the research to back it, not best-practice guesses.",
        ],
      },
      {
        heading: "The premium product was the problem",
        body: [
          "Before the program, a visit to the ProFlex product page was worth $2.54. A visit to the cheaper Classic MTB page was worth $5.27. ProFlex converted at 0.86 percent against Classic&rsquo;s 2.07 percent, less than half the rate. The premium rack was the worst-earning page on the site.",
          "The funnel said the same thing. Steadyrack sat under benchmarks at every step except the cart.",
          "Product view to add-to-cart is the money step, and it was the furthest away from being at benchmark. People arrived, looked, and could not decide.",
        ],
        visual: "sr-baseline-rpv",
      },
      {
        heading: "The research.",
        body: [
          "Surveys, heatmaps, session recordings, support tickets, mined reviews and the funnel itself all converged on the same confusion: which rack do I need?",
          "Seventeen percent of support tickets were sizing questions, people asking the business what the website should have answered. Eighty percent of returns traced to fit and space. Session recordings and user tests showed size buttons being ignored on the collection page, with add-to-cart possible without choosing a size at all.",
        ],
        visual: "sr-research",
      },
      {
        heading: "People shop by what’s in their garage",
        body: [
          "The ProFlex range came in three variants named Narrow, Wide and Fat. Those are brand names that describe the rack, not the bike. To find out which one fitted their bike, a buyer had to click through to a separate page, which only about 5% of users did.",
          "Everything that followed put the answer in the buyer&rsquo;s own language, in the path, without asking them to do anything: which bike you ride, which rack you need. We tested that idea on the product page, the collection page, the cart drawer and the homepage, and it won every single time.",
          "Splitting ProFlex into three bike-type products on the collection page observed a 28 percent increase in ProFlex orders. A &ldquo;best suited for&rdquo; line above the variant selector observed a 24 percent lift in ProFlex conversion. Bike-type filter buttons on the collection page observed 8 percent conversion and 10 percent revenue per visitor. Repeating the same line in the cart drawer observed an 8.7 percent lift. Splitting the racks out in the homepage best sellers observed 9.6 percent.",
          "A comparison table putting the two ranges side by side answered the same question one step earlier. Measured on the visitors who actually saw it, we observed add-to-cart up 24 percent at 98 percent confidence.",
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
          "Trust surprisingly turned out not to be a lever here. Steadyrack has sold 1.2 million racks and the brand carries that weight already. Repeated attempts to add trust signals did nothing, and sometimes did worse than nothing.",
          "Eleven wins from 27 completed tests is a 41 percent win rate. Published benchmarks put advanced practitioners around 33 percent and a healthy program in the 20 to 30 percent band.",
        ],
      },
      {
        heading: "The product mix.",
        body: [
          "ProFlex&rsquo;s share of rack units went from 44.4 percent to 53.8 percent product share year on year, and its share of rack revenue from 50.6 percent to 60.4 percent.",
          "It has held for four months, since the first win shipped.",
          "The page RPV moved with it. ProFlex revenue per visitor went from $2.54 to $4.42, up 74.5 percent, and conversion from 0.86 percent to 1.28 percent, up 48.7 percent. View-to-purchase went from 4.55 percent to 7.36 percent on flat views. Same eyeballs, 62% more buying.",
          "Sitewide, across every session including pages we never touched, conversion is up 12.4 percent and revenue per visitor up 26.6 percent. On the funnel, the two steps the program set out to fix both moved: product view to add-to-cart up 16 percent, checkout completion up 6.7 percent. Both are still under benchmark, which is the focus of the next 6 months.",
        ],
        visual: "sr-mix",
        figure: {
          src: "/assets/case-studies/steadyrack/proflex-studio.jpg",
          alt: "A gravel bike stored vertically on a wall-mounted Steadyrack ProFlex rack, studio shot",
          width: 1800,
          height: 1012,
          caption:
            "ProFlex, the premium rack. It was the page buyers hesitated on, and it is now the majority of what they buy.",
        },
      },
      {
        heading: "The overall result: revenue and profit",
        body: [
          "For our projections, we don&rsquo;t just annualise every test win and call it a day. If we did that it would sit at $1.5M uplift in six months.",
          "Every winning test is weighted by that page&rsquo;s share of site orders, annualised, then corrected for seasonality and for statistically lucky results. The overall uplift in six months was $470k, North America only.",
          "The proposal&rsquo;s target scenario expected about $600k of added revenue across the full first year. Six months in, the program is pacing at $660k a year across the three markets, and at $470k in North America on its own. Either figure is ahead of a full-year target at the halfway mark, and it is a 10x to 14x return on fees.",
        ],
        visual: "sr-funnel",
      },
      {
        heading: "The same wins, different soil",
        body: [
          "The North American wins were hardcoded onto the Australian and European stores at the same time. They didn&rsquo;t have the traffic to test in those markets, so we rolled out wins and measured.",
          "Europe was the stand out: revenue per visitor up 23 percent on barely more traffic, add-to-cart up 34 percent, average order value up 15 percent, and ProFlex share of rack units up from 40.8 percent to 55.9 percent.",
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
      "ProFlex share of rack units 44.4% to 53.8%, and share of rack revenue 50.6% to 60.4%, held for four months.",
      "ProFlex revenue per visitor up 74.5%, conversion up 48.7% year on year.",
      "Sitewide conversion up 12.4% and revenue per visitor up 26.6%, including pages the program never touched.",
      "Collection page bike-type split observed +28% ProFlex orders.",
      '"Best suited for" labelling observed +24% ProFlex conversion.',
      "ProFlex vs Classic comparison table observed +24% add-to-cart at 98% confidence among visitors who saw it.",
      "41% win rate across 27 completed tests, against a 20-30% healthy-program benchmark.",
      "$470k annualised run rate in North America after correcting the platform figure down from $1.5M, roughly 10x on fees.",
      "Europe: revenue per visitor +23%, add-to-cart +34%, order value +15% on the transferred wins alone.",
    ],
    heroImage: "/assets/case-studies/steadyrack-hero.jpg",
    heroImageAlt:
      "A workshop wall of mountain bikes stored vertically on Steadyrack racks, with two racks left empty",
    featured: false,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
