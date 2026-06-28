---
name: thinkers-toolkit:reference/strategies/minimax
type: strategy
title: Minimax
slug: minimax
categories: [foundations-of-strategic-thinking]
contexts: [strategy, conflict, decision-making]
related: [zero-sum-games, dominant-strategy, backward-induction, the-war-of-attrition, scenario-analysis]
---

# Minimax

> Choosing the move that minimizes your maximum possible loss.

## Description

Minimax is a decision rule for adversarial settings: choose the move whose worst-case outcome is least bad.

It is most at home in two-player, zero-sum games where one player's gain is the other's loss and both sides can reason about possible moves. You assume the opponent will choose the response that is worst for you, then select the move that gives you the best result under that hostile assumption.

Minimax is not optimism. It is disciplined pessimism.

## Model Setup

The basic setup:

- Two players have opposed interests.
- You can list possible moves.
- For each move, the opponent has possible responses.
- You evaluate the outcome if the opponent chooses the response that hurts you most.
- You choose the move with the best worst-case outcome.

In formal games, this can be calculated. In real life, it is usually an approximation.

## Mechanism

Minimax protects against catastrophic loss by assuming competent opposition.

Instead of asking, "What if my plan works?", it asks, "What if the other side responds in the most damaging plausible way?" This can reveal fragile strategies that only look good when the opponent is passive.

## When to Use

Use minimax when:

- The cost of a severe downside is unacceptable.
- The situation is adversarial or close to zero-sum.
- The opponent is capable and motivated.
- You need a robust move more than a high-upside move.

It is useful in security, litigation, competitive strategy, crisis planning, and any situation where one bad exposure can dominate the upside.

## When It Backfires

Minimax backfires when the world is not as adversarial as the model assumes.

If you treat every situation as hostile, you will overprotect, under-invest, and miss cooperative upside. You may also become predictable: an opponent who knows you always minimize downside can pressure you with threats.

It also fails when the worst case is emotionally vivid but unlikely. Minimax should focus on plausible worst cases, not every nightmare the mind can generate.

## Real-World Translation

Outside formal games, use minimax as a stress test:

- What is the worst plausible response to this move?
- Can we survive it?
- Is there another move with a slightly lower upside but much better downside protection?
- Are we treating a cooperative situation as adversarial by mistake?

The right question is not always "How do we avoid the worst case?" Sometimes it is "Is the worst case bad enough to justify giving up the upside?"

## Decision Prompt

> If the other side responded in the most damaging plausible way, which option would I be glad I had chosen?

## Practical Examples

- In chess, minimax evaluates moves by assuming the opponent will choose the strongest counter-move at each branch.
- A security team chooses a design that is less convenient but prevents the worst plausible breach path.
- A company entering a hostile negotiation avoids a strategy that could win big but would expose it to a catastrophic legal concession if the other side countered well.

## Related Patterns

- [Zero-Sum Games](./zero-sum-games.md) — Minimax is most natural when one side's gain is the other's loss.
- [Dominant Strategy](./dominant-strategy.md) — Dominance asks whether one move is best across cases; minimax focuses on the worst case.
- [Backward Induction](./backward-induction.md) — Minimax often uses backward reasoning through possible move sequences.
- [The War of Attrition](./the-war-of-attrition.md) — Minimax thinking can prevent overexposure in costly endurance contests.
- [Scenario Analysis](./scenario-analysis.md) — Scenario analysis can identify plausible worst cases before minimax reasoning chooses among responses.
