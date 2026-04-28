# IC Site Copy — Autoresearch Results Log

Branch: `copy-revision`
Doctrine: Wilbers (`COPY-RULES.md`) + CRE Library (Making Websites Win) + Halbert/Schwartz/Hopkins/Ogilvy DR tradition
Approach: per the brief in the new-chat handoff, autoresearch on high-leverage copy blocks (rubric → variants → score → winner → mutation). For deterministic doctrine fixes (fragment-stack repair, passive→active, drop hollow intensifier), principles-only sweeps without variant generation.

---

## Phase 2.1 — Case studies (`lib/case-studies.ts`)

### Scope decision

The Phase 1 audit named the 4 case-study **summaries** and the **chapter bodies** as the largest single Music violation on the site. Headlines (e.g., `Seven figures added. No extra ad spend.`) already pass as direct-response card-headlines per Wilbers ch5 Personality and CRE doctrine, so they're left as-is. Autoresearch was run on summaries; chapter bodies got a principles-only Wilbers sweep.

Rubric used: `autoresearch/case_study_summary_rubric.md` — 15 binary items, pass threshold 12/15.

---

### Summary 1 — HPA flagship

**Current (CONTROL):**
> Automotive education platform. 100,000+ students across 175 countries. Ad spend scaling, conversion rate stuck. Eighteen months of systematic testing moved that.

CONTROL score: 12/15. Passes the threshold but fails M1, M2, M3 (Music) — exactly the named gap.

| Variant | Angle | Score |
|---|---|---|
| V1 (CONTROL) | Fragment-stack default | 12/15 |
| V2 | Long-with-fragment relief (Halbert) | 15/15 |
| V3 | Long-then-paired-fragment closer | 15/15 |
| V4 | Stat-first result-led (Schwartz) | 15/15 |
| V5 | Antithetical setup, rhythm-shift body | 15/15 |
| V6 | Periodic + prospect-recognition + earned closing fragments | 15/15 |
| V7 | Customer-research-insight opener (Halbert "what they're thinking") | 15/15 |
| V8 | V6 + V7 mutation: 4-beat structure | **15/15 (winner)** |

**Winner V8 (49 words):**
> After expanding their course catalogue without updating the site to match, HPA had hit the wall every scaling brand hits: more ad spend, same conversion rate, no compounding. Customer research found the actual motivation. Eighteen months of testing rolled it through every page. Seven figures added. Same ad spend.

**Why it wins:**
- Strongest M1-M3: long periodic setup (28w) → mid-narrative beat → 2 earned closing fragments. Fragments earn their place because the long setup builds tension first.
- Strongest D1: "the wall every scaling brand hits" gives prospects a place to put themselves without using direct second-person.
- P3: names BOTH levers — research AND testing — which is IC's actual differentiator.
- D2: 4-beat narrative arc (situation → wall → research insight → result).

Top failure pattern across rejected variants: V4 (stat-first) lost to placement of fragments BEFORE the setup line, which is what `COPY-RULES.md` explicitly bans.

---

### Summary 2 — HPA loss-leader

**Current:**
> HPA's evergreen $1 trial on a normally $99 course. Great hook. Under-converting on mobile because it looked too good to be true. We fixed the believability problem.

CONTROL score: 13/15. Fails M1.

| Variant | Score |
|---|---|
| V1 (CONTROL) | 13/15 |
| V2 (long opener with stat density) | 14/15 |
| V2-revised (trimmed to 41w) | 15/15 |
| V3 (4-beat narrative with `actually` removed) | **15/15 (winner)** |

**Winner V3 (49 words):**
> HPA's evergreen $1 promo on a $99 course performed beautifully on Meta and converted at 14% on mobile, where 95% of the traffic landed. The reason was simple: visitors thought it was a scam. We rewrote the first two sections to address that head-on. Mobile conversion rose 36%.

**Why it wins:** more numbers (14%, 95%, 36%) than V2-revised, 4-beat structure (situation → reason → fix → result), strongest read-aloud test.

---

### Summary 3 — ATA

**Current:**
> Quarterly launch model running out of steam. New member count falling. Churn rising. Lead quality dropping. We rebuilt the acquisition model end to end, from lead magnet through to the trial offer.

CONTROL score: ~12/15. Fails M2, M3 (4 fragments stacked then 1 long sentence — fragment-as-default).

| Variant | Score |
|---|---|
| V1 (CONTROL) | 12/15 |
| V2 / V2-r2 (combine fragments into colon-list compound) | 15/15 |
| V3 (before-after antithetical, 65w at length-budget edge) | 15/15 |
| V4-revised (concise periodic, drops customer-voice detail) | 15/15 |
| V5 mutation (V4-revised + casual-pet-owners customer-voice insight) | **15/15 (winner)** |

**Winner V5 (49 words):**
> By the time ATA came to us, their quarterly launch model was running on fumes: each cohort smaller than the last, churn climbing, and most new leads were casual pet owners rather than the professional trainers the program served. We rebuilt the acquisition model. Lead magnet to trial offer.

**Why it wins:** keeps the strongest customer-voice detail (`casual pet owners rather than professional trainers`) from research while delivering a long-then-fragment-closer rhythm. "Lead magnet to trial offer." earns its fragment status.

---

### Summary 4 — Kite

**Current:**
> VC-backed Australian startup. Parent-led therapy coaching for children with autism and developmental delays. Strong paid traffic, but the site wasn't carrying the promise.

CONTROL score: ~12/15. Fails M1, M3.

| Variant | Score |
|---|---|
| V1 (CONTROL) | 12/15 |
| V2 (long opener + 0 fragments, no named lever) | 14/15 |
| V3 (long + named lever "heuristic review surfaced four issues") | **15/15 (winner)** |
| V4 (antithetical 2-fragment opener — failed M3 ordering rule) | 14/15 |
| V5 ("Clarity beat persuasion." opener — FAILED redundancy with existing tagline) | rejected |

**Winner V3 (45 words):**
> Kite is a VC-backed Australian startup making therapy more accessible to families of children with autism and developmental delays, by coaching parents to lead it. Paid was pulling traffic. The site wasn't pulling its weight, until a heuristic review surfaced four issues nobody had flagged.

**Why V5 was rejected despite scoring 15/15:** opener `Clarity beat persuasion.` is the existing tagline (`/case-studies` index card displays headline + tagline + summary together — same line twice = bad UX). This is a hidden constraint not in the rubric — flagged for the rubric's next iteration.

---

### Chapter-body Wilbers sweep (principles-only, no autoresearch)

Doctrine being applied is deterministic for these patterns: fragment-stack → mixed-rhythm prose, passive → active, hollow intensifier → cut. No multi-variant generation needed.

| Case study | Chapter | Issue | Fix applied |
|---|---|---|---|
| HPA | "The problem we walked into" | passive (`had been taken by`) | combined into single active compound sentence |
| HPA | "The research that unlocked it" | **6-fragment stack** (worst Music violation on the site) | combined methods into one parallel-list sentence + earned 2-fragment emphasis closer (`Six methods. One question:...`) |
| HPA | "Test 1: Homepage hero rewrite" | three same-length declaratives | combined first two into compound, varied opener of next |
| HPA | "Test 2: Checkout friction removal" | 3-fragment stat stack | merged into single subordinate-clause sentence with `which` |
| HPA | "The program that kept paying" | 4-fragment stat stack | merged into single periodic sentence with parenthetical, kept 1 punch closer |
| HPA loss-leader | "The numbers" | 5-fragment stack across 2 paragraphs | merged stats into one long sentence; kept one short rhythm break (`Same paid traffic. Twice as productive.`) |
| ATA | "Buying versus staying" | 5-fragment stack inside paragraph | combined into long compound with parenthetical list; rebalanced para 2 to maintain antithetical staying-vs-buying contrast |
| ATA | "The $1 trial that changed the math" | 5-fragment closer | merged into long-medium-short rhythm (3 sentences) |
| ATA | "The funnel after rebuild" | 4-fragment opener | added 1-line setup (`The rebuild ran top to bottom.`) before the parallel list, so the fragment list earns its place |
| Kite | "What the heuristic analysis surfaced" | hollow `actually` | dropped |

Net change: every case study now has at least one paragraph that opens with a long periodic or compound sentence before any fragment work. The Halbert pattern (long → punch fragment) is preserved where it earns its place; the default-staccato is gone.

---

## Hidden constraint surfaced

The Kite V5 rejection (tagline-summary redundancy on the same card) means the rubric needs an extra item for surfaces where multiple text fields render together:

> **R-redundancy:** if this block renders alongside another text field on the same card/page, no opening line should repeat verbatim from the adjacent field.

Folded into homepage rubric (Phase 4) — surfaced to keep H1 + subhead + section H2s from echoing each other.

---

## Phase 4 — Homepage full pass (`components/Hero.tsx`, `Problem.tsx`, `CaseStudy.tsx`, `How.tsx`, `Testimonials.tsx`, `About.tsx`)

### Scope decision

Per user follow-up: full homepage pass with autoresearch specifically on the headline + subheading, then doctrine sweep on remaining homepage components. Rubric used: `autoresearch/homepage_hero_rubric.md`.

### H1 — `Hero.tsx`

**Current:** `You already paid for the traffic. Make it pay you back.` (12w)

CONTROL score: 7/7. Generated 8 variants (Halbert relief, Hopkins reason-why, antithetical, ownership-reversal, prospect-direct, stat-anchored, etc.).

| Variant | Score |
|---|---|
| V1 (CONTROL) | 7/7 |
| V2 (`Leaks bigger than fixing them`) | 7/7 |
| V3 (`Same ads. Better site. More revenue.`) | 6/7 (fails H1-3, no verb) |
| V5 (`Your ad spend is fine, your site is leaking`) | rejected — already H1 of `/for-d2c-ecommerce` |
| V6 (`Don't buy more traffic. Convert more...`) | 7/7 — preachy |
| V7 (`Most of your traffic is leaving without spending. We fix the why.`) | 7/7 — direct but lacks ownership twist |

**Winner = V1 CONTROL.** No change. The ownership-reversal pivot (`paid → pay you back`) is the hardest-working single line on the site. None of the rewrites improved on it.

### Subhead — `Hero.tsx`

**Current:** `We find the leaks in your funnel and fix them with research-led testing, so the same ad spend earns more every month. Every winning test stays live, and the revenue compounds.` (32w)

CONTROL score: 7/8. Fails S-2 (no sentence ≤10w — both mid-length).

| Variant | Score |
|---|---|
| V1 (CONTROL) | 7/8 |
| V2 (add `Winners stay live.` earned closer) | 8/8 |
| V3 (Halbert direct, drops `leaks` metaphor) | 8/8 |
| V4 (Hopkins reason-why with 95% confidence) | 8/8 |
| V5 (Outcome-first opener) | 7/8 (fails S-7 coherence) |
| V6 (Periodic mechanism + earned closer, 40w) | 8/8 |
| V8 (Schwartz prospect-direct) | 8/8 — drops metaphor |
| V10 — V4+V6 mutation | **8/8 (winner)** |

**Winner V10 (revised, 44w):**
> We find the leaks in your funnel, run research-led tests with the sample size and primary metric locked before launch, and read the result once at the end. The winners stay live. The revenue compounds on the same ad spend, month after month.

**Why it wins:** keeps IC's core `leaks in your funnel` metaphor (Personality), adds the rigor signal that wasn't in current copy (CRE method-anchoring), and resolves the Music gap with a long → short → medium 3-beat rhythm.

**Revision note (post-Jono review):** the original V10 read `only call it a winner at 95% confidence`, which implies waiting for the test to cross the threshold then declaring a win — i.e. peeking + early-stopping, the exact false-positive pattern the `/blog/ab-tests-statistically-broken` post warns against. Replaced with the actual discipline: sample size + primary metric locked pre-launch, result read once. Same fix propagated to `How.tsx` step 3 and `Problem.tsx` pillar 3 stat label, which carried the same pre-existing house phrasing.

### Section H2 autoresearch (lighter — H2 doctrine constraints are tighter)

| Component | Current H2 | Verdict |
|---|---|---|
| `Problem.tsx` | `You don't have a traffic problem. You have a conversion problem.` | 9/9 — antithetical complete sentences. **No change.** |
| `About.tsx` | `We run narrow. On purpose.` | Re-scored — first sentence is complete (S-V-Adv), second is 1 earned fragment. Music PASS. **No change.** |
| `CTA.tsx` | `Let's move your numbers.` | Strong. **No change.** |
| `How.tsx` | `Research first. Then test. Then repeat.` | Three fragments, no S-V. **Fix.** |
| `Testimonials.tsx` | `Boring. Repeatable. Compounding.` | Three single-word fragments. **Fix.** |

#### How.tsx winner

| Variant | Score |
|---|---|
| V1 (control) | fragment-stack — Music fail |
| V2 (`We research, we test, we repeat.`) | 3 parallel COMPLETE sentences. Repetitive. |
| V3 (`Research the problem. Test the answer. Compound the wins.`) | **Winner.** 3 parallel imperatives, each S-V-O complete sentence. Adds semantic content. |
| V4 (`The same loop, every engagement: research, test, ship, repeat.`) | Redundant with subhead (`disciplined loop... every engagement`) |

#### Testimonials.tsx winner

| Variant | Score |
|---|---|
| V1 (control) | 3 single-word fragments — Music fail |
| V2 (`Boring on the surface. Compounding underneath.`) | Antithetical |
| V3 (`We stay boring. The numbers don't.`) | Antithetical |
| V4 (`Boring is the point. Compounding is the result.`) | **Winner.** Balanced antithetical, two complete sentences with parallel `X is the Y`. |
| V5 (`Boring tests, repeatable wins, compounding revenue.`) | Single-sentence parallel — no main verb |

### Wilbers sweep on remaining homepage prose

| Component | Issue | Fix applied |
|---|---|---|
| `CaseStudy.tsx` | hollow `very different top line`; abstraction `huge paid traffic` | rewrote with concrete `100,000 students across 175 countries` + `seven figures more revenue` |
| `About.tsx` | passive opener `too many good companies were being sold $100k redesigns by agencies` | active rewrite: `too many agencies were charging good companies $100k for redesigns` (subject is the actor) |

### Skipped after second-pass review

- `ProofBar.tsx` — 9/9 already PASS
- `GuaranteeBlock.tsx` — 9/9, best-written block on the site
- `FAQ.tsx` — `actually` in the H2 and Q1 plays into the candid-voice register; not a hollow intensifier in this context. Kept.
- `CTA.tsx` — already strong. Risk-reversal pills + concrete subhead. Kept.
- Hero microcopy under SprintSlotBadge (`Let's grab fifteen minutes...`) — minor abstraction in `whether a program is worth running` but acceptable for microcopy register. Kept.

---

## Phase 2.2 — D2C + Online-Ed combined pass (`app/for-d2c-ecommerce/page.tsx`, `app/for-online-education/page.tsx`)

### Scope decision

Both ICP pages share the same template (hero / pains H2 + 3 pain cards / surfaces H2 + 5 surface bullets / engagement / guarantee / CTA), so they got a combined pass. Same rubric as homepage hero (`homepage_hero_rubric.md`).

### H1s

| Page | H1 | Verdict |
|---|---|---|
| D2C | `Your ad spend is fine, your site is leaking.` | 7/7 PASS — antithetical, second-person, concrete. **Keep.** |
| Online-Ed | `More buyers from the funnel you already have.` | 7/7 PASS — clean, second-person. **Keep.** |

### Subheads

**Both controls scored ~6/8** — same hidden problem: each opened with a noun-phrase fragment (`Research-led CRO for [audience]`) with no main verb, then ran a long second sentence with no rhythm contrast.

#### D2C subhead winner — V8-r (40w):
> We run research-led CRO for Shopify brands doing $5M to $20M, turning the traffic you're already paying for into revenue with tests that hold up in the P&L. Every engagement runs the same promise. Revenue uplift, or you don't pay.

Score 8/8. Long → short → fragment closer. Real verb in opener. Earned 1-fragment closing.

#### Online-Ed subhead winner — V8-r (49w):
> We run research-led CRO for online education brands doing $5M to $20M a year on Kajabi, Teachable, or custom platforms. Eighteen months at High Performance Academy added one to two million in revenue on the same ad spend. Every engagement runs the same promise. Revenue uplift, or you don't pay.

Score 8/8. Long → long → short → fragment closer. Adds the HPA proof line that sat in the original control.

### Surfaces H2 (D2C)

| Variant | Verdict |
|---|---|
| `Five surfaces, ranked by expected impact per unit of effort.` (control) | jargon-fancy + noun stack |
| `Five surfaces, ranked by what moves the most for the least work.` (winner) | plain, concrete, same meaning |

Online-Ed surfaces H2 was already cleaner (`Five surfaces, ranked by expected impact per unit of effort.` — same line, but the page register was different). Applied the same fix for consistency. Wait — actually checked, the Online-Ed surfaces H2 in the file uses the same exact phrase. Will need to update both. Did D2C only in this commit; flagging Online-Ed for the same edit.

(NOTE: re-checking the file confirms Online-Ed surfaces H2 is `Five surfaces, ranked by expected impact per unit of effort.` — needs the same fix. Applying.)

### Pain bodies (Wilbers sweep, deterministic doctrine)

| Page | Issue | Fix |
|---|---|---|
| D2C pain 2 | 50-word runaway with hollow `really` | Split into 3 sentences (long compound + short SVO + short SVO), dropped `really` |
| D2C pain 3 | hollow `with any real rigour` | Split into 2 sentences, dropped `any real` |
| Online-Ed pain 1 | 29w single sentence with hollow `actually` | Split into short opener + medium compound, dropped `actually` |
| Online-Ed pain 2 | 32w single sentence | Restructured as colon-led list (`Three pages decide whether a launch hits forecast: ...`) + short follow-up |
| Online-Ed pain 3 | 28w single sentence | Restructured: short fragment-opener (`Evergreen funnels decay.`) + long compound |

### Surface bullets (Wilbers sweep)

Both pages had 5 surface bullets in identical compound-sentence rhythm (~22-30w each). Rewrote all 10 to mix short + long, with at least 3 different sentence-structure patterns across each set of 5.

#### D2C
- PDP: short SVO + colon-led triplet
- Checkout: 2 sentences, dropped `real AOV` to `AOV worth caring about`
- Collections: short conditional + colon-led imperative triplet
- Hero: tightened to one medium compound (`describes most of your repeat traffic`)
- Cart: 2 sentences (8w + 17w)

#### Online-Ed
- Webinar reg→show-up: long colon-led list + 5w punch (`Few teams test any of them.`)
- Replay page: short SVO + colon-led list, dropped `actually`
- Sales page: long SVO + 6w punch (`The headline has to do the work.`)
- Checkout/order bumps: split into 2 sentences (15w + 9w)
- Post-purchase: split into 2 sentences (15w + 6w), dropped `single`

---

## Phase 3 — Principles-only sweep across remaining pages

No autoresearch — doctrine-deterministic fixes only (fragment-stack repair, passive→active, drop hollow intensifier).

| File | Block | Fix |
|---|---|---|
| `app/how-we-work/page.tsx` | Hero H1 (`Same loop. Every time. Boring on purpose.`) | Combined first two fragments into one complete SVO sentence. New: `We run the same loop, every time. Boring on purpose.` (1 fragment as earned closing emphasis after a complete sentence — the legal Halbert pattern) |
| `app/how-we-work/page.tsx` | Service blurb 4 (Landing Page builds) — multiple passives + nominalization | Active rewrite: `Research drives the copy, direct response drives the structure, and analytics ship before launch. The pages convert. They don't win design awards.` |
| `app/how-we-work/page.tsx` | Engagements section: `Pricing is matched to scope` | Active: `We match pricing to scope` |
| `app/case-studies/page.tsx` | `Different stacks. Same loop.` H2 | Two complete antithetical sentences: `The stacks differ. The loop doesn't.` |
| `app/about/page.tsx` | `What we believe` H2 (`Three principles. Non-negotiable.`) | Two complete sentences: `Three principles run our work. None of them bend.` |

### Skipped after second-pass review

- `/contact` — already 9/9 PASS in Phase 1 audit. Strong second-person voice throughout. Untouched.
- `/resources/conversion-killers` — second-best-written prose on the site after `GuaranteeBlock.tsx`. Untouched.
- `/blog` index — short, clean. Untouched.
- `/tools` index + `/tools/*` calculators — utility pages. Untouched.
- `/privacy`, `/terms-of-service` — legal. Untouched.
- Blog MDX posts (`/blog/[slug]`) — flagged for a separate pass. The Phase 1 audit didn't deeply score them; they're long-form prose where doctrine-application is more involved than headline rewrites.

---

## Status — all phases done

- ✅ Phase 1: Audit (`copy-audit.md`)
- ✅ Phase 2.1: Case studies (4 summaries via autoresearch + 10 chapter sweeps)
- ✅ Phase 2.2: D2C + Online-Ed combined (2 subheads via autoresearch + 5 pain rewrites + 10 surface-bullet rewrites + 2 surfaces H2 fixes)
- ✅ Phase 3: Remaining pages (5 doctrine fixes)
- ✅ Phase 4: Homepage full pass (2 H2 winners via autoresearch + subhead via autoresearch + 2 prose fixes + statistical-rigor language correction across 3 components)

### Numbers flagged for verification before launch (per audit, unchanged this pass)

- `Most Shopify stores leave 20 to 40 percent on the table` (D2C pain 1)
- `15 to 25 percent take rate` on order bumps (Online-Ed surface 4)
- `3 to 8 percent AOV` on cart drawer cross-sells (D2C surface 5)
- `Industry avg ~22%` win rate (homepage CaseStudy + HPA detail)

### Verified per `~/Claude/CLAUDE.md`, unchanged

HPA: $1-2M added, 180 tests, 35% win rate, 18mo, 69% homepage, 8% checkout, 99.8% trial mobile, ~280/mo, ~3,000/yr. ATA: +57%/+63%/+43%/+30%.
