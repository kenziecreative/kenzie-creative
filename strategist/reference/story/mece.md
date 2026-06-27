---
name: strategist:reference/story/mece
type: strategist_framework
stage: story
title: MECE
slug: mece
aka: [Mutually Exclusive Collectively Exhaustive]
source: "Barbara Minto, The Pyramid Principle"
related: [minto-pyramid, hv-logic, scqa]
---
# MECE

> A two-part test for any list of arguments or categories: each item must be distinct from every other (mutually exclusive), and together they must cover the whole problem with nothing left out (collectively exhaustive).

## What It Is

MECE — pronounced "mee-see" — is a quality standard for how you group and list items in a structured argument. An argument list is MECE when it satisfies two conditions simultaneously:

**Mutually Exclusive:** each argument is clearly different from every other argument. They do not overlap. You could not move an evidence point from under one argument and have it also fit under another.

**Collectively Exhaustive:** the arguments together cover the full territory of the claim above them. Nothing material is left out. If the governing thought is true, the arguments in combination are sufficient to prove it — there is no missing pillar that a skeptic could raise to knock it down.

The standard applies to any level of the pyramid: the arguments at Level 2 relative to the governing thought, or the evidence items at Level 3 relative to each argument.

## Why It Works

Lists that are not MECE appear complete but are not. A list of three arguments where two of them are about the same thing, or where a fourth obvious argument is unaddressed, will feel off to a skeptical audience — and it should, because the argument structure is genuinely incomplete.

Mutual exclusivity matters because overlapping arguments inflate the apparent strength of a case. If two of your three arguments are really the same point with different labels, you have one argument and a false impression of corroboration. A sharp reader notices immediately.

Collective exhaustivity matters because a missing argument is an invitation to doubt the governing thought. The audience's unasked question — "but what about X?" — is exactly the hole an exhaustive list would have filled. Spotting that hole in the room, rather than finding it in the structure beforehand, is an avoidable embarrassment.

MECE also disciplines the thinking, not just the communication. The act of checking for overlaps reveals when two ideas you thought were separate are actually the same idea viewed from slightly different angles. And the act of checking for completeness forces you to ask whether you have actually covered all the grounds on which the argument could succeed or fail.

## How To Use It

1. **List your arguments or categories.** Don't try to make them MECE as you go — generate them freely first.
2. **Check for mutual exclusivity.** Take each pair of items and ask: could any evidence under one also plausibly belong under the other? If yes, they overlap. Reframe one or both items until they no longer do, or collapse them into a single item with a better label.
3. **Check for collective exhaustivity.** Ask: if every argument on this list is true, does the governing thought necessarily follow? Is there any major objection or alternative explanation not addressed? Is there any type of evidence that could matter but doesn't fit anywhere? If yes, add the missing item.
4. **Reorder for logic.** Once the list is MECE, arrange items in the order that best serves the argument — often largest to smallest impact, or in the order a reader will naturally question them.

## Worked Example

Acme Design is building a case for why subscriber growth has declined. The first draft of arguments at Level 2 is:

1. Marketing reach has fallen.
2. We are not converting enough trials.
3. Brand awareness has dropped.
4. Our pricing is too high.
5. Churned subscribers are not being replaced.

Running the **mutual exclusivity check**: arguments 1 and 3 ("marketing reach" and "brand awareness") heavily overlap — a drop in reach is one mechanism by which brand awareness falls. They are not distinct categories. Collapse them into "Acquisition funnel is underperforming."

Argument 5 ("churned subscribers are not being replaced") is not really an argument at all — it is a restatement of the problem (subscriber growth has declined), not a cause. Remove it.

After revision:
1. Acquisition funnel is underperforming. (Covers reach, awareness, and top-of-funnel conversion.)
2. Trial-to-paid conversion is too low. (Distinct: this is mid-funnel, not top-of-funnel.)
3. Pricing is misaligned with perceived value. (Distinct: a demand-side constraint, not a funnel issue.)

Running the **collective exhaustivity check**: is there a major cause of subscriber decline not covered? Retention — subscriber churn — is not explicitly addressed. If churn has increased, that would also explain declining subscriber growth. Add:

4. Subscriber churn has increased. (Now the list covers acquisition, conversion, pricing, and retention — the four main levers of subscriber growth.)

The revised list is MECE: four distinct causes, together covering the full problem space.

## When To Use It

Apply MECE any time you are constructing a list of arguments, categories, or drivers — not just in written communication, but in analysis. It is the natural companion to the [Driver Tree](../frame/driver-tree.md) in the Frame stage, where a problem is broken into its constituent drivers; those drivers must be MECE or the tree will double-count causes or miss them.

In the Story stage, it is the structural test for Level 2 arguments in the Minto Pyramid. It is also the test to run on any categorical breakdown in a slide: market segments, revenue streams, risk categories.

MECE is most valuable when the audience is analytical and will probe the structure — in board presentations, investor materials, or structured consulting deliverables where a missing argument or a redundant one undermines the credibility of the whole recommendation.

## Things To Watch Out For

- Perfect MECE is often impossible in practice — real-world phenomena overlap, and forcing non-overlapping categories can make each one feel artificially narrow. The standard is "good enough to not mislead," not "logically watertight." Be especially careful that the forced non-overlap doesn't create categories that are technically distinct but practically meaningless.
- Collectively exhaustive does not mean exhaustive in the sense of listing everything. It means covering all material ground. A long MECE list with twenty items of which four carry all the weight is less useful than a tight list of four.
- "We covered three areas, so we must be exhaustive" is circular. Completeness must be checked against the problem, not against the list itself.
- MECE can become a bureaucratic ritual where people debate category labels rather than the substance of the argument. Keep the purpose in view: you are checking whether the argument holds, not perfecting the taxonomy.

## Related Frameworks

- [Minto Pyramid](./minto-pyramid.md) — the structure MECE tests apply to.
- [HV Logic](./hv-logic.md) — the vertical and horizontal logic checks; horizontal logic depends on MECE.
- [SCQA](./scqa.md) — the narrative frame that positions the governing thought before the pyramid is delivered.
