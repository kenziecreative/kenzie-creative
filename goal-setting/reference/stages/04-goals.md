# Stage 4 — Goal Construction

*Setup Arc stage reference. Full prose in [playbook.md → Stage 4](../playbook.md#stage-4--goal-construction). The engine reads this file to run the stage.*

## Purpose

Turn direction into testable goals. This is where most goal-setting advice *starts* — and it's the fourth stage here for a reason. Without Stages 1–3, the user doesn't know what game they're playing, what time frames they're in, or which domain they're improving. Goals produces one Objective per active anchor area, each with 2–4 Key Results, feeding Stage 5.

## Framework: OKRs

- **The Objective.** Qualitative, aspirational, clear enough to guide decisions but inspirational enough to get the user out of bed on hard days. It answers: *if we succeed this period, what will be different?*
- **The Key Results.** Two to four specific, quantifiable outcomes that prove the Objective is happening. They answer: *what metrics would prove we're succeeding?*

## Diagnostics

**Wishes vs. goals.** A wish is something you want to happen; a goal is something you're going to make happen. The difference is specificity, not motivation.
- "Grow my business" (wish) → "Become the go-to consulting firm for mid-size tech companies in the Southeast" (goal).
- "Make more money" (wish) → "Build a business that generates $500K annual revenue while I work 35-hour weeks" (goal).

**Directions vs. destinations.** "Increase revenue," "get more customers," "build a better team" are compass headings, not destinations — six months later you can't tell progress from motion. A real goal has a destination (the Objective) and proof of arrival (the KRs).

**Specificity is non-negotiable.** The goal circuit needs something concrete to track. You cannot set a state ("be fit," "be rich") — you need verbs and actions defined by *how much* and *by when*. Every KR needs a baseline, a target, and a metric.

**The KR-measures-the-Objective check.** A KR can be quantifiable and still wrong — measuring adjacent activity rather than the outcome. Ask of each KR: if this hits and nothing else moves, is the Objective actually achieved? If not, the KR has drifted.

## Constraint enforcement (HARD)

- **One Objective per active anchor area.** If the user tries to create a second Objective in an anchor area that already has one active, **refuse** unless the first is archived.
- **Max three Objectives total**, across all anchor areas. If the user has three active anchors and wants two Objectives each, **refuse** — that's six Objectives and twelve-plus KRs, and the system gets abandoned within a quarter.
- **Every Objective must carry an `anchor_area_id`** linking it to an *active* AnchorArea. **Reject** orphaned Objectives — an Objective not tied to an active anchor doesn't belong here.

## Posture notes

- **Friction half:** reject wishes and directions. "Grow the business" is not an Objective; "improve customer service" is not a KR. Name it and ask for the specific, measurable version — reference the wishes-vs-goals and directions-vs-destinations tests by name.
- **Lane half:** the *target numbers* are the user's to set. Don't tell them $75K is the right contract size or 50% is the right referral rate. Push on whether the KR is measurable and actually measures the Objective; let the user own the number.

## Deliverable

One Objective per active anchor area (≤3 total), each with 2–4 Key Results carrying metric, baseline, and target. Write to `goals/active.md`, one section per Objective with its anchor tag and KRs. These feed Stage 5.

## Hand off

> Stage 5 (Systems) is next — run `/goal-setting:systems` when ready.
