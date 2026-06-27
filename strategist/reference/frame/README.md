# Frame

*Construct the lens before you look. The dimensions you choose decide what you'll be able to see.*

Frame is the second stage of the Strategy Spine, and it runs on Imagining: you are not finding a structure that is already there, you are choosing the structure to impose on a problem you haven't examined yet. For where Frame sits in the spine and why, see the [Strategy Spine overview](../README.md). This page covers what the stage produces, how to choose among its tools, and how it runs.

## What it produces

The set of dimensions, drivers, or testable hypotheses the analysis will work through. Recorded in `strategy/brief.md` under Frame.

The stage is done when:

- **The problem is broken into distinct dimensions that together cover it** — no two overlap, and nothing important falls between them.
- **The dimensions were chosen deliberately,** not inherited from how the problem was first described.
- **Each dimension is specific enough to point Analyse at real evidence,** not so abstract that it could mean anything.

## Choosing the tool

Frame holds 3 frameworks. Pick by which direction you are working from.

- [Driver Tree](driver-tree.md) — **top-down.** Decompose a known problem into its components, then into the drivers of each, so every potential lever is visible. The default when you can break the problem apart from the top.
- [Bucketing](bucketing.md) — **bottom-up.** Start from a messy list of factors, ideas, or causes and group them into logical clusters that become your dimensions. Use when you have raw material but no structure yet.
- [Hypothesis](hypothesis.md) — **claim-first.** Convert the structure into explicit, testable propositions, so Analyse is aimed at confirming or disconfirming specific claims rather than exploring open-endedly.

Tools chain. Build the structure with Driver Tree or Bucketing, then turn each branch into a Hypothesis so the next stage has a precise target. A lazy frame is expensive: you can only find what your dimensions let you see.

## How it runs

The `strategist-stage` skill runs this stage. Working from the question Define produced, it:

1. Constructs the lens with the chosen tool — the dimensions or hypotheses the problem will be examined through.
2. Checks the dimensions cover the problem without overlapping.
3. Records the frame in `strategy/brief.md` under Frame.
4. Advances `strategy/STATE.md` to Analyse once the dimensions clear the bar above.

The loop runs backward when it has to. If the frame turns out to miss the real shape of the problem, the stage points you back to Define or reframes here rather than forcing analysis through the wrong lens.
