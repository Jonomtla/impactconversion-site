# IC Site Copy Audit — Phase 1

**Date:** 2026-04-28
**Scope:** All public pages under `app/`, scored against `COPY-RULES.md` (Wilbers Tier 1) and CRE doctrine.
**Branch:** `copy-revision`

---

## TL;DR

The site has a strong CRO skeleton. Headlines mostly work. Direct-response architecture (problem → proof → method → guarantee → CTA) is in place. The doctrine gap is **Music** — specifically a fragment-stacking habit ("Boring. Repeatable. Compounding.") that runs from homepage section headers all the way through the case-study chapter bodies, where it becomes the default rhythm rather than earning its place as contrast.

The **three highest-leverage pages**, ranked by `(traffic × conversion impact × current copy gap × single-file edit footprint)`:

1. **`lib/case-studies.ts`** (drives `/case-studies/[slug]` — HPA, ATA, HPA-loss-leader, Kite). Largest single gap on the site. One file, four case studies, every prospect reads at least one.
2. **`app/for-d2c-ecommerce/page.tsx`**. Primary BD landing target per `CLAUDE.md`. Solid bones, runaway sentences in pain bodies, monotonous surface bullets.
3. **Homepage** (`components/Hero.tsx`, `Problem.tsx`, `CaseStudy.tsx`, `How.tsx`, `Testimonials.tsx`, `About.tsx`). Highest traffic, mostly already strong. Targeted fixes on section H2 fragment-stacks and one passive-voice paragraph.

Detailed scoring + violation lists below.

---

## How I scored

For each page block I checked the **Tier 1 hard rules** from `COPY-RULES.md`:

- Economy (no redundancies, no wordy expressions, no hollow intensifiers, no nominalizations)
- Action (verbs first, active voice, no noun stacks)
- Precision (right word, sensory specifics, named numbers)
- Music (sentence length variety, sentence structure variety, fragments only as contrast)
- Personality (alive, specific, not marketing-department)
- Plus the cross-cutting: `you` viewpoint, no em dashes, old-info-first coherence, no fabricated numbers.

Pass threshold per block: 7/9 Tier 1 rules clean. Anything below = priority for autoresearch or sweep.

---

## Page-by-page scoring

### Homepage (`app/page.tsx`)

The homepage composes 9 components. I scored each.

| Block | Score | Verdict | Top violations |
|---|---|---|---|
| `Hero.tsx` | 8/9 | **PASS** | Fine. "Make it pay you back" earns its place. Microcopy at line 71 a touch abstract ("a straight answer on whether a program is worth running"). |
| `ProofBar.tsx` | 9/9 | **PASS** | Clean. Specific numbers, named clients. |
| `Problem.tsx` | 9/9 | **PASS** | Strong antithetical H2 ("You don't have a traffic problem. You have a conversion problem."). Pillars use balanced + parallel structure. Concrete metaphor ("every click is a deposit"). |
| `CaseStudy.tsx` | 6/9 | **FIX** | Hollow intensifier `very different top line` (line 36 of `CaseStudy.tsx`). Long single sentence "HPA is an automotive education platform with huge paid traffic and a conversion rate that had flatlined…" — `huge paid traffic` is generic abstraction; replace with the actual number we know. Buried guarantee mention at end of paragraph 2. |
| `GuaranteeBlock.tsx` | 9/9 | **PASS** | Best-written block on the site. Strong rhythm: long → long → fragment-list. Antithetical headline. |
| `How.tsx` | 7/9 | **FIX** | H2 `Research first. Then test. Then repeat.` is three fragments stacked — Music monotony, no setup line to earn the rhythm. Step copy is otherwise good. |
| `Testimonials.tsx` | 7/9 | **FIX** | H2 `Boring. Repeatable. Compounding.` — same fragment-stack pattern. Pulls weight as a pull-quote elsewhere; here it's the section anchor. |
| `About.tsx` | 7/9 | **FIX** | H2 `We run narrow. On purpose.` — fragment stack. Body has passive voice: `too many good companies were being sold $100k redesigns by agencies that couldn't prove…` (line 41). Action violation. |
| `FAQ.tsx` | 9/9 | **PASS** | Strong. Long compound answers. Real numbers. Concrete contrast (redesign $50-150k vs. 6mo testing). |
| `CTA.tsx` | 8/9 | **PASS** | Clean. Minor: `whether we are a fit` is a touch passive-soft. |

**Homepage net:** Most blocks PASS. The pattern to fix is a recurring section-H2 fragment stack across `How.tsx`, `Testimonials.tsx`, `About.tsx`. Plus one paragraph in `CaseStudy.tsx` (homepage version) and one in `About.tsx`.

---

### `/for-d2c-ecommerce`

| Block | Score | Verdict | Top violations |
|---|---|---|---|
| Hero (`page.tsx:51-58`) | 8/9 | **PASS** | H1 strong. Subhead is a runner — single ~35-word sentence. Could split for breathing room. |
| Pains H2 (line 87) | 9/9 | **PASS** | Specific numbers ($5M-$20M). Clear scoping. |
| Pain 1 body | 8/9 | **PASS** | Specific 20-40% claim. |
| Pain 2 body (line 23) | 5/9 | **FIX** | Runaway 50-word sentence: `When your team ships redesigns, copy tweaks, and new sections based on taste and opinion, nobody really knows which ones are helping, hurting, or drifting, because revenue per visitor tells the truth and almost no one is measuring it properly.` Music monotony — no variety. Hollow intensifier `really`. Should split into 2-3 sentences with rhythm contrast. |
| Pain 3 body | 7/9 | **FIX** | `with any real rigour` is a hollow intensifier. |
| Surfaces H2 (line 110) | 7/9 | **FIX** | `Five surfaces, ranked by expected impact per unit of effort.` — `expected impact per unit of effort` is jargon-fancy + noun stack. Try: `Five surfaces, ranked by what moves the most for the least work.` |
| Surface bodies (5 entries) | 5/9 | **FIX** | All five entries are 1-2 sentences of similar length and similar compound structure. Music monotony. Top entry buries `tend to move the number` — passive-soft. |
| Engagement section | 8/9 | **PASS** | `Weeks one and two are deep discovery research…` is good parallel. |

**Page net:** Bones are strong. Hero, H2s, and stat blocks are CRO-correct. Two clear targets: pain-2 runaway sentence, and the five surface bullets need rhythmic variety so they don't read as a list of clones.

---

### `/for-online-education`

Same shape, same pattern, slightly tighter.

| Block | Score | Verdict | Top violations |
|---|---|---|---|
| Hero | 7/9 | **FIX** | Subhead is two sentences but #2 is 35+ words. Music monotony. |
| Pains | 7/9 | **FIX** | Same long-compound-sentence pattern as D2C. Pain 1 body sentence runs 41 words. |
| Surfaces | 6/9 | **FIX** | Same five-clone-bullet issue. All open with similar grammar (`The…`, `Usually…`, `The…`, `A…`, `The…`). |
| HPA proof block | 8/9 | **PASS** | Specific numbers. Active. |

**Page net:** Same fixes as D2C, plus the HPA quote could be pulled into voice-of-customer for additional Personality.

---

### `/how-we-work`

| Block | Score | Verdict | Top violations |
|---|---|---|---|
| Hero H1 (line 91-94) | 6/9 | **FIX** | `Same loop. Every time. Boring on purpose.` — three fragments in a row. The earlier `Hero` doesn't do this; section pages do. Pattern. |
| Hero subhead | 8/9 | **PASS** | Clean. |
| `How` component (reused) | 7/9 | (already noted above) | `Research first. Then test. Then repeat.` |
| Engagements H2 + body | 8/9 | **PASS** | Good metaphor `pricing is matched to scope` is mildly passive but acceptable. |
| Service blurbs (4) | 7/9 | **FIX** | Conversion Audit blurb has the `see the map before you hire the crew` metaphor — good. Landing Page blurb: `designed to convert rather than win a design award` — `designed to convert` is nominalization-passive; could be `built to convert, not to win design awards`. |

**Page net:** Mid-tier priority. Below the top-3 cut.

---

### `/case-studies` (index)

| Block | Score | Verdict | Top violations |
|---|---|---|---|
| Hero H1 | 8/9 | **PASS** | `Revenue moved, with the numbers to back it up.` — slightly passive but works as fragment-headline. |
| Hero subhead | 9/9 | **PASS** | Strong parallel (`shipped, hit significance, and showed up in the P&L`). |
| Featured card | 8/9 | **PASS** | (Pulls from `lib/case-studies.ts` — see below.) |
| `Different stacks. Same loop.` H2 | 7/9 | **FIX** | Fragment stack again. |
| Body | 8/9 | **PASS** | Clean parallel of method. |

**Page net:** Index itself is mostly clean. The fix lives in `lib/case-studies.ts`.

---

### `lib/case-studies.ts` — the biggest gap on the site

This file feeds every case-study detail page. Four studies. Every single one has the same pattern: **chapter bodies default to 4-8 fragment-style sentences in a row**, then occasionally a longer line. Wilbers Music — staccato as default rhythm rather than contrast.

Receipts (line numbers in `lib/case-studies.ts`):

**HPA (line 31-108):**
- `summary` (line 38): `Automotive education platform. 100,000+ students across 175 countries. Ad spend scaling, conversion rate stuck. Eighteen months of systematic testing moved that.` — four near-fragments. Halbert pattern as default, no setup.
- Chapter "The research that unlocked it" (line 62): `On-site surveys. Email surveys. Analytics funnel analysis. Heatmap review. Session recordings. User testing.` — **six fragments in a row.** Hardest single Music violation on the site.
- Same chapter (line 63): `Three distinct purchase drivers surfaced. Self-improvement. Specific project builds. Career development. The homepage spoke to none of them directly.` — fragment stack inside a paragraph.
- Chapter "Test 2: Checkout friction removal" (line 78): `The variation shipped at 99% confidence. 8% lift across every checkout visitor. Projected annual value north of $300k on its own.` — fragment stack.

**HPA loss-leader (line 110-165):**
- Chapter "What we changed" (line 142): `Plain. Specific. Addressed the objection straight on rather than dancing around it.` — fragment stack.
- Chapter "The numbers" (line 147): `36% lift in conversion at 99.8% confidence. About 280 additional new customers every month. Over 3,000 net-new customers a year without a dollar of extra ad spend.` — three fragments.

**ATA (line 167-237):**
- Chapter "Buying versus staying" (line 197): `A reactive dog. A problem behaviour. Something immediate.` — fragment stack inside a paragraph.
- Chapter "The $1 trial that changed the math" (line 213): `Over 200 trial signups in the first two weeks. 50% converted straight to full paid membership. A dedicated landing page, tight USPs, objection handlers, social proof. Nothing fancy. Just research turned into copy.` — five fragments.

**Kite (line 239-293):**
- Chapter "Paid was working. The site wasn't." (line 261): paragraph runs eight short simple-declarative sentences in a row. Same monotony class — different mechanism (declaratives instead of fragments) but same Music problem.

**This file is the highest-leverage rewrite on the site.** Single source of truth for four detail pages. Every prospect who progresses past the homepage reads at least one.

---

### `/about`

Already covered (uses `components/About.tsx`). Plus its own page-level hero.

| Block | Score | Verdict |
|---|---|---|
| Hero H1 (line 33-35) | 9/9 | **PASS** |
| `What we believe` H2 | 7/9 | **FIX** | `Three principles. Non-negotiable.` — fragment stack. |
| Three principles bodies | 9/9 | **PASS** | `guess in a nice font` is the kind of figurative line Wilbers Personality calls for. Keep. |

---

### `/contact`

| Block | Score | Verdict |
|---|---|---|
| Hero | 9/9 | **PASS** | Clean second-person, parallel triplet in subhead. |
| `Three things happen on the call.` | 9/9 | **PASS** | |
| Expectation list | 9/9 | **PASS** | |

Bottom-of-funnel page. Already converting-intent. Don't touch.

---

### `/resources/conversion-killers`

| Block | Score | Verdict |
|---|---|---|
| Hero H1 | 9/9 | **PASS** | Specific, concrete. |
| Subhead | 9/9 | **PASS** | Long → fragment-list rhythm. Earned. |
| 7 killer titles | 9/9 | **PASS** | `Upsells that feel like upsells` is the kind of antithetical title Wilbers calls for. Keep. |
| 7 killer bodies | 8/9 | **PASS** | All ~30-word compound sentences of similar length. Slight Music monotony but acceptable for a list format. |

This page is already the best-written prose on the site after `GuaranteeBlock.tsx`. Don't touch in this pass.

---

### `/blog` index, `/tools` index, `/tools/*` calculators, `/privacy`, `/terms-of-service`

Below the priority cut for this pass.

- Blog and tools indexes are short and clean.
- Tool inner pages are utility, not persuasive copy.
- Privacy and terms are legal and untouchable.

---

## The recurring patterns (apply globally on the sweep pass)

| Pattern | Location | Fix |
|---|---|---|
| **Fragment-stacked section H2s** | `How.tsx`, `Testimonials.tsx`, `About.tsx`, `/about`, `/case-studies`, `/how-we-work`, several others | Either build a longer setup line so the fragments earn their place, or rewrite as a balanced/antithetical full sentence. Don't fragment-stack as default. |
| **Runaway compound sentences** | `for-d2c-ecommerce` pain 2, `for-online-education` pain 1+2, `CaseStudy.tsx` opener | Split into 2-3 sentences with mixed length. Drop hollow `really` / `very`. |
| **Fragment-stacked chapter bodies** | All four case studies in `lib/case-studies.ts` | Combine consecutive fragments into compound sentences with subordinate clauses. Keep one or two fragments per chapter as deliberate emphasis. |
| **Passive-voice openers** | `About.tsx` line 41, `how-we-work` services line 64, occasional `case-study` chapters | Convert to active. |
| **Generic abstractions where numbers exist** | `huge paid traffic` (HPA homepage CaseStudy), `very different top line` (same), `move the number` (D2C surfaces) | Replace with the actual number we already publish elsewhere. |
| **Hollow intensifiers** | `really`, `very`, `actually` scattered through pain copy and FAQ | Cut unless they earn their place. |

---

## Top 3 — recommended phase 2 priority order

### 1. `lib/case-studies.ts` (highest leverage)
- **Why:** Single file, four case studies, biggest single Music violation on the site, hits every prospect who progresses past the homepage. Chapter bodies are the deepest doctrine miss.
- **Approach:** Autoresearch on each case study's `headline` + `summary` (8 fields total). Then a Wilbers sweep across all `chapters[].body[]` paragraphs to combine fragments into rhythmic prose. Keep a small number of deliberate fragments as emphasis after longer setup lines.
- **Risk:** Headline numbers ($1M+, 35%, 180, 69%, 36%, 99.8%, +57%, +63%, +43%, +30%) are real per `~/Claude/CLAUDE.md`. Confirm before launch but don't change them.

### 2. `app/for-d2c-ecommerce/page.tsx`
- **Why:** Primary BD destination per `CLAUDE.md` daily Apollo + LinkedIn outreach (90-day sprint restarting week of April 14 2026). Where prospects from outreach land. Solid skeleton, fixable copy.
- **Approach:** Autoresearch on H1 + subhead + surfaces H2. Wilbers sweep on pain-2 runaway and the five surface bullets to add length variety and structural mix.
- **Bonus:** `for-online-education` shares the same template — apply the same fixes pattern in the same pass.

### 3. Homepage section blocks (`components/Hero.tsx` skip, `Problem.tsx` skip, `CaseStudy.tsx` fix, `How.tsx` fix, `Testimonials.tsx` fix, `About.tsx` fix)
- **Why:** Highest traffic, mostly already strong, targeted small fixes. The fragment-stack H2 pattern in 4 components is the most-seen issue on the site.
- **Approach:** Autoresearch on the four section H2s as a single rubric pass (they're all the same surface — section anchor for a 24-32 wide block). Targeted Wilbers fixes on the homepage `CaseStudy.tsx` opener and `About.tsx` passive-voice paragraph.

### Out of scope this phase
- `/how-we-work`, `/about` page-level wrappers, `/case-studies` index, `/contact`, `/resources/conversion-killers`, `/blog`, `/tools` — Wilbers sweep only, after Phase 2.

---

## Verification claims to confirm before any rewrite ships

Per `CLAUDE.md`, these numbers are real:
- HPA: $1-2M added, 180 tests, 35% win rate, 18-month engagement, 69% homepage lift, 8% checkout lift, 99.8% confidence on $1 trial mobile, ~280 customers/mo, ~3,000/yr.
- ATA: +57% members in 9mo, +63% MRR, +43% YoY members, +30% qualified leads.
- Industry win-rate average ~22% (Speero / GoodUI / VWO benchmarks — verify the citation if anyone challenges it).

Numbers I do **not** see verified anywhere:
- `Most Shopify stores leave 20 to 40 percent on the table` (`for-d2c-ecommerce` pain 1) — flag for Jono.
- `15 to 25 percent take rate` on order bumps (`for-online-education` surface 4) — flag.
- `3 to 8 percent AOV` on cart drawer cross-sells (`for-d2c-ecommerce` surface 5) — flag.

These are doctrine-typical ranges (CRE / direct-response wisdom) but not citation-grounded on this site. Decide before launch: keep as expert-experience claims, soften, or pin to a source.
