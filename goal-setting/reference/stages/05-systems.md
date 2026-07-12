# Stage 5 — System Design

*Setup Arc stage reference. Full prose in [playbook.md → Stage 5](../playbook.md#stage-5--system-design). The engine reads this file to run the stage.*

## Purpose

Key Results are inert without systems. This is where the playbook diverges most sharply from standard goal-setting advice — most frameworks stop at the goal; this one assumes the goal is meaningless until the user has built the weekly habits that make it inevitable. Systems produces one weekly system per active anchor area, each with an explicit trigger, feeding Stage 6.

## The principle: you fall to your systems

You don't rise to your goals; you fall to your systems. If a system requires motivation, discipline, and perfect conditions, it will fail — not because the user is weak, but because that's not how humans work. The teams that win consistently aren't more disciplined; they've designed systems that work even when motivation is gone.

## Diagnostic: a system needs a trigger, or it's a hope

This is the practical test that separates real systems from wishes. A real system has one of three triggers attached:

- **Time trigger:** "Every Monday at 9am, I will…"
- **Location trigger:** "When I sit at my desk in the morning, I will…"
- **Habit-stack trigger:** "Right after my morning coffee, I will…"

If a system requires the user to *remember* to do it, it's not a system — it's a hope, and hopes get displaced by whatever's urgent.

## Framework: the Four Laws of Behavior Change

Apply all four to every system:

1. **Make it Obvious.** Build the trigger into the environment — a recurring calendar block, an automatic report, a standing one-on-one. Don't rely on memory.
2. **Make it Attractive.** Pair the habit with something rewarding — the good coffee shop, a specific tea, a podcast reserved for that time.
3. **Make it Easy.** Remove friction — pre-written templates, a one-page dashboard instead of a 47-tab spreadsheet, a standing meeting doc.
4. **Make it Satisfying.** Build in immediate feedback — a habit checklist, a "done" list, reporting completed execution to one accountability partner.

**The accountability nuance — get this right.** *Don't* broadcast goals to a social circle for encouragement *before* executing (the validation lands like an accomplishment before anything has been done, and takes the edge off the drive). *Do* report completed execution to one trusted partner *after* the work is done (that's satisfaction, not premature reward). Marcus texting his coach "5/5 this week" works because it celebrates execution, not intention.

**Tactical tool:** when actually doing the work, physically narrow the visual field — close tabs, turn the monitor from the window, single-task. Contracting the visual aperture increases clarity of pursuit.

## A system is an experiment, not a ritual

A trigger makes a system run; it doesn't make it *work*. Each system states its experiment terms at design time (see `System` in [schemas.md](../schemas.md)): the **causal hypothesis** (how this activity moves this KR — said as a mechanism, not a vibe), the **expected signal and its lag**, the **minimum test duration**, the **dose**, and the **decision rule** (what result by when means keep, revise, or kill — decided now, while the user is calm). A system without a decision rule is a ritual, not an experiment. These terms are what the monthly review's differential reads.

## Constraint enforcement (HARD)

- **Every System must have a trigger** — `trigger_type` one of `time`, `location`, or `habit_stack` (per [schemas.md](../schemas.md)) — with a concrete `trigger_detail`. **Reject** any system without one as "a hope, not a system."
- **One System per active anchor area at initial setup.** You cannot design six systems at once and probably can't sustain three. Start with one per active anchor; get it working consistently for a month before adding a second. **Refuse** to register multiple systems per anchor at setup.
- **Every System states its experiment terms.** Hypothesis, expected signal + lag, minimum test duration, dose, decision rule. Gaps are captured as gaps and named (like the goal contract) — but a missing *decision rule* gets one push, because it's the term that stops the week-3 panic and the month-6 zombie system alike.

## Posture notes

- **Friction half:** a system phrased as "I'll do business development more" has no trigger and isn't a system. Make the user attach a real trigger and run it through all four laws, one law at a time. Expect Version 1 to be too ambitious — the playbook's Marcus blocked four hours and it lasted three weeks; Version 3 was two hours with a permission rule.
- **Lane half:** *when* and *where* the user can realistically run a system is theirs to know. You insist on a trigger and the four laws; you don't tell them Monday 9am works for their life.

## Deliverable

One weekly System per active anchor area, designed against all four laws, each with an explicit trigger type and detail plus its experiment terms (hypothesis, signal + lag, minimum duration, dose, decision rule), versioned (expect revision). Write to `goals/active.md` under the matching Objective. These systems are the inputs to Stage 6.

## Hand off

> Stage 6 (Pre-mortem) is next — run `/goal-setting:premortem` when ready.
