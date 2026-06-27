---
name: strategist:reference/analyse/waterfall
type: strategist_framework
stage: analyse
title: Waterfall
slug: waterfall
aka: [Waterfall chart, Bridge chart]
source: ""
related: [trend, comparison, cumulative]
---
# Waterfall

> A chart that explains the gap between a starting number and an ending number by showing every step that moved it — so you see not just *what* changed, but *what caused* the change.

## What It Is

A Waterfall is an Analyse-stage chart. It starts with an opening total (a full bar on
the left), then shows a sequence of increases and decreases as floating bars — one per
move that pushes the number up or down — and lands on a closing total (a full bar on
the right). The full bars are *where you stand*; the floating bars are *what moved you*.

## Why It Works

A single number hides its own story. If revenue fell from 120 to 110, a bar chart tells
you it fell by 10 — and stops there. But "down 10" might mean almost nothing happened,
or it might mean a lot happened in both directions and the forces nearly cancelled out.
Those are completely different situations that call for completely different responses,
and the net number can't tell them apart.

The Waterfall works because it **decomposes a net change into its causes** and lays them
out in order. By forcing every gain and loss onto the page as its own bar, it makes the
*offsetting* visible: you can see that a small net move was actually a large gain fighting
a large loss. That's the insight a Waterfall delivers that almost no other chart does —
it turns "the number changed" into "*here is why* the number changed, and which single
move mattered most."

## How To Use It

To **read** one: start at the left bar, follow each floating bar up or down as a running
total, and the right bar is where you end. The tallest bars are your biggest causes.

To **build** one:

1. **Anchor the start.** Plot the opening value as a full bar (e.g. "Q1 MRR").
2. **Add each driver as a step.** One floating bar per cause, sized to its positive or
   negative contribution, in a sensible order (often largest-to-smallest, or
   chronological).
3. **Mark milestone totals.** Where useful, drop a full bar back to the axis to show a
   subtotal, then close with the final total.
4. **Read the bridge.** The steps together explain the move from start to end — and
   usually one or two bars carry the whole story.

## Worked Example

Acme Design's monthly recurring revenue slipped from **$120k to $110k** over a quarter,
and leadership assumed acquisition had stalled. A Waterfall of the change tells a
different story:

- **Start — Q1 MRR:** $120k
- **+ New subscriptions:** +$18k
- **+ Upgrades:** +$6k
- **− Churn (cancellations):** −$28k
- **− Downgrades:** −$6k
- **End — Q2 MRR:** $110k

The net drop is $10k — but the Waterfall shows Acme actually *added* $24k and *lost* $34k.
Acquisition wasn't the problem; **churn was**, and no amount of new-subscriber spend
fixes it. A single "down $10k" number would have sent the team chasing the wrong lever.
It's the same churn problem SCQ helps you frame — the Waterfall is what makes its cause
visible.

## When To Use It

Use a Waterfall in the Analyse stage when the story you need to tell is *the sequence of
changes between two totals*: a revenue bridge quarter over quarter, a headcount change
broken down by cause, a margin walk from list price to net price. Prefer it over a
**Trend** line when the audience needs to see the contribution of each discrete step,
and over a plain **Comparison** when the steps *accumulate* into a total rather than
standing alone as independent categories.

## Things To Watch Out For

- A Waterfall implies the steps are additive and happen in order. If the drivers actually
  interact, or the order is arbitrary, the chart can suggest a causal sequence that isn't
  real.
- Too many small steps bury the signal. Group minor drivers into a single "Other" bar so
  the two or three decisive moves stay legible.
- The order you choose shapes the narrative. Putting the biggest loss last makes the
  ending feel like a collapse; putting it first makes the recovery feel like the story.
  Pick the order deliberately and stay honest about it.

## Related Frameworks

- [Trend](../analyse/trend.md) — shows a value's movement over time as a continuous line.
- [Comparison](../analyse/comparison.md) — compares discrete categories side by side.
- [Cumulative](../analyse/cumulative.md) — shows a running total accumulating across a series.
