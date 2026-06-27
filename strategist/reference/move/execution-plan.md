---
name: strategist:reference/move/execution-plan
type: strategist_framework
stage: move
title: Execution Plan
slug: execution-plan
aka: [E2E Integrated Roadmap, Implementation Roadmap, Activity Roadmap]
source: ""
related: [zero-to-one, decision-grid, comms-deploy, gtm-stack, capability-drop]
---
# Execution Plan

> An end-to-end integrated roadmap that maps each workstream's goals, activities, lead, and milestones across the programme's time horizon — the single source of truth for who does what, in what order, by when.

## What It Is

The Execution Plan is the most detailed of the Move-stage frameworks. It organises a programme into workstreams (rows), quarters or time blocks (columns), and within each cell lists the specific activities that need to happen. Each workstream has a named lead and a goal for each time block. Across the full plan, major milestones are called out to give the programme its structural anchors. The result is a single visual that shows the whole programme — not just one team's slice of it — so every participant can see where their work fits and what it depends on.

## Why It Works

Strategies fail at execution for a predictable reason: work that looks coherent at the strategy level turns out to be uncoordinated at the activity level. Teams move in parallel but without sequencing their dependencies. Someone builds a feature before the spec is agreed. Marketing plans a campaign before the product is ready. The launch date is set before anyone has mapped what needs to happen in the weeks before it.

The Execution Plan works because it makes the full activity landscape visible in one place, which exposes those sequencing problems before they become delays. When you can see Stream 1's activities and Stream 2's activities on the same page, it becomes obvious that Stream 2's Week 6 activity depends on Stream 1 completing something in Week 4. That dependency is invisible when each team is working in a separate project tracker.

The goal-per-time-block structure also matters. Without it, activity lists become laundry lists with no north star. Naming the goal for Q1 before you fill in Q1's activities keeps the team asking "does this activity serve the goal?" rather than "what are we all doing?"

## How To Use It

1. **Define the workstreams.** Identify the major workstreams required to deliver the initiative — typically two to five. Name a lead for each.
2. **Set the time horizon and time blocks.** Choose the time units that match the programme's cadence (quarters, months, or four-week sprints). A year-long programme typically uses quarters; a 90-day sprint uses months or fortnights.
3. **Set the goal for each workstream per time block.** Before listing activities, name what success looks like for each workstream in each period. This is the goal cell.
4. **List the activities.** Within each workstream-time-block cell, list the key activities (not tasks — activities are meaningful chunks of work, not individual to-do items). Keep the list to four to seven items per cell so the plan remains readable.
5. **Call out milestones.** Across the full plan, mark the three to six major milestones that represent the most important progress gates for the programme overall.
6. **Review and sequence.** Read across rows to check for cross-workstream dependencies. If Stream 2 needs something from Stream 1, does Stream 1's timeline support that?
7. **Keep it live.** Assign someone to update the plan fortnightly or monthly as activities complete and new ones emerge.

## Worked Example

Acme Design is running an eight-month programme to launch its cohort product and reach 500 enrolled students by end of Q4. The Execution Plan has three workstreams and a two-quarter view.

**Stream 1 — Platform. Lead: CTO. Q1 Goal: Launch-ready cohort platform.**
- Q1 activities: Finalise technical spec (Wk 1–2); build booking and payments module (Wk 3–8); integrate Zoom for live sessions (Wk 4–6); QA testing (Wk 9–10); bug fix and sign-off (Wk 11–12).
- Q2 Goal: Platform stable and instrumented for scale.
- Q2 activities: Post-launch monitoring and fixes (Wk 1–2); add cohort analytics dashboard (Wk 3–5); build instructor self-service upload tool (Wk 6–10).

**Stream 2 — Curriculum. Lead: Head of Content. Q1 Goal: Two launch cohorts fully ready.**
- Q1 activities: Select launch cohort subjects (Wk 1); recruit and contract two instructors (Wk 2–3); finalise curriculum for both cohorts (Wk 4–7); record any pre-work video assets (Wk 8–10); instructor rehearsal and technical test (Wk 11).
- Q2 Goal: Four new cohorts in market; instructor pipeline established.
- Q2 activities: Launch partner instructor programme (Wk 1–3); develop four new cohort curricula (Wk 2–8); QA second-round cohort materials (Wk 9–10).

**Stream 3 — Go-to-Market. Lead: Head of Marketing. Q1 Goal: Launch with 80% cohort capacity filled.**
- Q1 activities: Build launch landing pages (Wk 3–5); develop launch email sequence (Wk 4–6); activate paid social campaign (Wk 10); run founder webinar (Wk 11); launch day execution (Wk 12).
- Q2 Goal: 500 total students enrolled; re-enrolment rate >30%.
- Q2 activities: Post-cohort testimonial campaign (Wk 1–3); Cohort 3 & 4 open enrolment (Wk 4); affiliate programme launch (Wk 6–8); mid-year performance review and Q3 plan (Wk 10).

**Milestones:**
- Wk 12 Q1: Platform QA passed — launch green light.
- Wk 12 Q1: Both launch cohorts at 80% capacity.
- Wk 4 Q2: Cohorts 3 and 4 open for enrolment.
- Wk 10 Q2: 500 cumulative students enrolled.

## When To Use It

The Execution Plan is the right tool whenever a programme has more than one workstream running in parallel over a period longer than a few weeks. It is the activity-level backbone of the Move stage — the document teams return to in every programme review.

It sits below **Zero To One** (which provides the phased shape of the programme) and alongside **Decision Grid** (which tracks the governance decisions that allow activities to proceed). Use it in combination with **Comms Deploy** to keep communications activities visible as part of the overall programme, not managed separately.

For programmes focused on releasing capabilities in sequence rather than activities, **Capability Drop** may be a better primary frame — though the two can coexist.

## Things To Watch Out For

- Activity lists that are too granular turn the plan into a project tracker and make it unreadable at the programme level. Keep activities at the "meaningful chunk of work" level; individual tasks belong in a project management tool.
- Goals that are too vague ("make progress on platform") provide no test for whether the time block was successful. Each goal should be specific enough that the team can agree, at the end of the period, whether it was achieved.
- A plan that is never updated after it is created is a fiction. If reality has diverged from the plan, update the plan — or teams will stop consulting it.
- Milestones should be binary: achieved or not. A milestone that is "mostly done" is not done. If a milestone is consistently slipping, that is a programme risk that needs to be surfaced, not silently moved forward.

## Related Frameworks

- [Zero To One](./zero-to-one.md) — provides the phased shape of the programme; the Execution Plan fills in the activity detail within each phase.
- [Decision Grid](./decision-grid.md) — maps the steering-committee decisions that need to be made to unlock the activities in the Execution Plan.
- [Comms Deploy](./comms-deploy.md) — the communications-specific roadmap; comms activities should be reflected in the Execution Plan's GTM workstream.
- [Capability Drop](./capability-drop.md) — an alternative frame that maps capability releases rather than activities, useful when sequencing features rather than tasks.
- [Gantt](../insight/gantt.md) — the Insight-stage equivalent for showing scheduled activity over time; the Execution Plan adapts this logic for the Move stage with goal and workstream structure added.
