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

**The accountability nuance — get this right.** *Don't* broadcast goals to a social circle for encouragement *before* executing (the validation fires the reward system prematurely and reduces drive). *Do* report completed execution to one trusted partner *after* the work is done (that's satisfaction, not premature reward). Marcus texting his coach "5/5 this week" works because it celebrates execution, not intention.

**Tactical tool:** when actually doing the work, physically narrow the visual field — close tabs, turn the monitor from the window, single-task. Contracting the visual aperture increases clarity of pursuit.

## Constraint enforcement (HARD)

- **Every System must have a trigger** — `trigger_type` one of `time`, `location`, or `habit_stack` (per [schemas.md](../schemas.md)) — with a concrete `trigger_detail`. **Reject** any system without one as "a hope, not a system."
- **One System per active anchor area at initial setup.** You cannot design six systems at once and probably can't sustain three. Start with one per active anchor; get it working consistently for a month before adding a second. **Refuse** to register multiple systems per anchor at setup.

## Posture notes

- **Friction half:** a system phrased as "I'll do business development more" has no trigger and isn't a system. Make the user attach a real trigger and run it through all four laws, one law at a time. Expect Version 1 to be too ambitious — the playbook's Marcus blocked four hours and it lasted three weeks; Version 3 was two hours with a permission rule.
- **Lane half:** *when* and *where* the user can realistically run a system is theirs to know. You insist on a trigger and the four laws; you don't tell them Monday 9am works for their life.

## Deliverable

One weekly System per active anchor area, designed against all four laws, each with an explicit trigger type and detail, versioned (expect revision). Write to `goals/active.md` under the matching Objective. These systems are the inputs to Stage 6.

## Hand off

> Stage 6 (Pre-mortem) is next — run `/goal-setting:premortem` when ready.
