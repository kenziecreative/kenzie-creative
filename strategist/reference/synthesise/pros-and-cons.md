---
name: strategist:reference/synthesise/pros-and-cons
type: strategist_framework
stage: synthesise
title: Pros & Cons
slug: pros-and-cons
aka: [Pros and Cons, Moral Algebra, T-Chart, Trade-off Analysis]
source: "Benjamin Franklin (moral algebra, letter to Joseph Priestley, 1772)"
related: [evaluation, decision-tree, eisenhower]
---
# Pros & Cons

> A structured side-by-side comparison of the positives and negatives of each option — with the trade-offs named explicitly — so a decision that feels tangled becomes a choice you can actually make.

## What It Is

Pros & Cons is the starting-point option evaluation model. You define a set of options (typically two to four) and, for each one, list its **Pros** — the positive features and reasons it serves your needs — and its **Cons** — the negatives, gaps, or limitations. You then state the **Trade-offs**: what you accept or give up if you pick that option. The comparison typically ends with a **Recommended** call that names the preferred option and the reasoning behind it.

The framework handles the full set of options on one page, so the comparison is simultaneous rather than sequential. You see all three options at once, and you see the trade-offs of each next to the trade-offs of the others.

## Why It Works

When people make decisions without structure, they tend to argue in favor of the option they already prefer — pulling in pros for their preferred choice and cons for the alternatives, without ever laying both sides down together in a way that can be inspected. The result is that the *trade-off* — what you're actually giving up by choosing one thing over another — stays invisible, and the conversation circles without resolution.

Pros & Cons works because it makes the trade-off explicit as its own named section. You're not just choosing the option with the best pros; you're accepting the trade-offs that come with it. Writing "trade-offs" as a required field forces the person doing the analysis to confront what they're giving up, not just celebrate what they're gaining. This is the step that most informal pro/con lists skip, and its absence is why those lists so rarely produce a decision.

Benjamin Franklin described the underlying logic in 1772 as "moral algebra": when you can't weigh consequences in your head simultaneously, write them down, cancel out equal-and-opposite items on each side, and see what's left. The visual structure of Pros & Cons operationalises exactly that.

## How To Use It

1. **Define the options.** Name two to four genuinely distinct alternatives — options that are near-identical don't reveal real trade-offs. Label them clearly (Option 1, Option 2, etc., or give them descriptive names).
2. **List the Pros for each option.** Be specific: "reduces time to first lesson from 3 minutes to 45 seconds" is more useful than "better UX."
3. **List the Cons for each option.** Apply the same standard of specificity. Avoid false cons — weaknesses that apply equally to all options don't differentiate.
4. **State the Trade-offs.** For each option, write what you are accepting or giving up in exchange for its benefits. This is the sentence that starts: "By choosing this, we are deciding that X matters more than Y."
5. **Compare across options.** Read the table horizontally: which option has the most compelling pros relative to its cons? Which trade-off is most acceptable given the decision's context?
6. **Make a Recommendation.** Name the preferred option and state the trade-off rationale — not just "the pros outweigh the cons" but *why* these specific pros matter more than those specific cons in this situation.

## Worked Example

Acme Design needs to choose a pricing structure for its new enterprise tier. Three options are on the table:

**Option 1 — Per-Seat Monthly ($49/seat/month)**
- **Pros:** Predictable MRR; scales directly with customer headcount growth; familiar to enterprise buyers.
- **Cons:** Creates friction at renewal as seat counts change; discourages wide internal adoption (teams cap seats to control cost).
- **Trade-off:** Choosing per-seat means accepting lower platform penetration within each account in exchange for revenue predictability.

**Option 2 — Unlimited Seats, Annual Flat Fee ($8,000/year per company)**
- **Pros:** Maximises adoption within each customer; simple to sell and administer; encourages viral internal spread.
- **Cons:** Revenue doesn't scale with account value; a 500-person company pays the same as a 20-person one; risk of under-pricing large accounts.
- **Trade-off:** Choosing flat fee means leaving money on the table at large accounts in exchange for frictionless adoption and a simpler sales conversation.

**Option 3 — Usage-Based ($0.30 per lesson completion)**
- **Pros:** Aligns cost to value delivered; naturally expands revenue as customers get more out of the platform.
- **Cons:** Unpredictable MRR; hard for customers to budget; requires robust usage tracking infrastructure Acme doesn't yet have.
- **Trade-off:** Choosing usage-based means accepting revenue unpredictability and an 18-month infrastructure investment in exchange for perfect value alignment.

**Recommended:** Option 2. Acme's primary growth constraint right now is customer acquisition, not average contract value. The simpler flat-fee model removes friction from the sales cycle, maximises adoption once landed, and creates the reference customers Acme needs before layering in more complex pricing. Revisit per-seat or usage-based when annual contract value becomes the primary optimisation target.

## When To Use It

Pros & Cons is the right first option evaluation tool — start here before reaching for **Evaluation** (the weighted scoring matrix). Use it when you have a manageable number of options (two to four), when the criteria that matter are qualitative and don't need to be scored numerically, and when the goal is to produce a recommendation the decision-maker can act on, not just a ranked list.

Step up to **Evaluation** when options are genuinely close and you need the rigour of weighted criteria to justify a choice. Use **Decision Tree** instead when the decision is primarily about managing uncertain outcomes rather than comparing attributes.

## Things To Watch Out For

- **False balance.** Listing exactly three pros and three cons for each option to look even-handed is almost always dishonest. The real picture is rarely balanced. Let the list be asymmetric — if one option has seven pros and one con, say so.
- **Vague language.** "More scalable" or "better for growth" are not pros; they're placeholders. Name the specific feature, risk, or trade-off. Vague language produces a comparison table that looks rigorous but doesn't actually differentiate.
- **Omitting the recommendation.** The analysis exists to produce a decision. A Pros & Cons table that ends without a recommendation has done half the work and left the hardest part — the actual choice — to someone else.
- **Too many options.** More than four options on a single Pros & Cons table become visually unmanageable. If you have six candidates, use a first-pass filter (Eisenhower, or a simple elimination criterion) to cut to three before building the table.

## Related Frameworks

- [Evaluation](./evaluation.md) — the weighted scoring upgrade: applies numerical criteria scores when options are close and qualitative comparison isn't sufficient to discriminate.
- [Decision Tree](./decision-tree.md) — the probabilistic alternative: maps outcomes with likelihoods when the decision hinges on uncertain events rather than attribute trade-offs.
- [Eisenhower](./eisenhower.md) — a triage tool for prioritising which decisions even warrant a structured comparison.
