# RPV calculator UX update

Local branch: `codex/rpv-calculator-ux`. Not deployed.

## Changes
- Compact cream hero with matching light navigation.
- Whole-site default, with a prominent explanation and action leading to page comparison.
- Page and whole-site input state survives tab switching. Imported subsets do not overwrite whole-site figures.
- Fictional example data can be explored and dismissed, restoring the user's original rows.
- All positive page opportunities ranked against sessions-weighted averages within the same page type. Singleton types excluded; under-500-session rows labelled as low data (a heuristic, not significance).
- Responsive ranking cards on mobile, table on desktop. Editable inputs remain separate so changing a value does not reorder the focused row.
- One dominant incremental-revenue forecast output with explicit monthly-at-full-lift vs first-year ramped totals.
- Profitability and CAC controls disclosed on demand. Scenario targets follow the selected lift.
- Revenue scenario output excludes investment; profit output applies margin and deducts investment.
- Sticky booking bar suppressed only on this calculator.

## Verification
- Production build passed, including TypeScript and static page generation.
- Scoped ESLint, TypeScript and whitespace checks passed after final mobile and number-format adjustments.
- Browser: whole-site $100,000 revenue / 50,000 sessions = $2 RPV.
- Browser: fictional example ranks new arrivals at $7,200 monthly opportunity; single homepage excluded.
- Browser: pasted three-row CSV. Collection pages at $1 and $3 RPV, each with 1,000 sessions, produce a $2 baseline and $1,000 opportunity. Singleton product is excluded.
- Browser: whole-site inputs and page rows survive switching tabs. Exploring example data then returning restores pasted rows and the ranking.
- Browser: $100,000 monthly revenue, 30% selected lift -> $180,000 additional first-year revenue; scenario targets track 15% / 30% / 60%.
- Browser: 50% margin and $5,000 monthly investment -> $90,000 additional first-year gross profit, $30,000 after investment, 10% monthly break-even lift.
- Browser: 390px mobile viewport has no document-wide horizontal overflow; ranking cards show all key values. Desktop and mobile layouts visually inspected.

Forecast links share totals and assumptions, not the underlying page rows. Page state persists across tabs within this visit, not across reloads. Existing CSV file-reader route retained; paste import exercised with synthetic data. Publication requires fresh user approval under workspace AGENTS.md.
