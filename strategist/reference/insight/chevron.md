---
name: strategist:reference/insight/chevron
type: strategist_framework
stage: insight
title: Chevron
slug: chevron
aka: [Process arrow diagram, Phase flow diagram]
source: ""
related: [gantt, horizon, one-pager, timeline]
---
# Chevron

> A sequence of arrow-shaped blocks — one per phase — that visualises the step-by-step path from start to finish, so an audience can see both the destination and the route in a single view.

## What It Is

The Chevron is an Insight-stage layout that uses a horizontal chain of pointed arrow shapes (chevrons) to represent a process or plan as a series of phases. Each chevron carries a phase name at the top and a short list of the specific steps or activities within that phase below it. The arrow shape signals direction — left-to-right progression — and the interlocking points emphasise that each phase leads directly into the next. A typical Chevron page shows three to five phases.

## Why It Works

A list of activities presented without structure leaves the audience to infer the sequence and the grouping themselves. Two people reading the same list can walk away with different mental models of what comes first, what's parallel, and what is the hardest transition. The Chevron eliminates that ambiguity by making the sequence explicit and visual.

The arrow shape does work that words cannot: it communicates momentum and directionality at a glance, before the audience reads a single word. The interlocking structure also communicates dependency — Phase 2's chevron starts where Phase 1's ends, signalling that Phase 2 cannot begin until Phase 1 is complete. For a strategy audience, that sequencing signal is often the most important message on the page: "we cannot skip steps."

The phase groupings also force the author to distinguish between activities that happen in parallel within a phase and steps that must be sequential across phases, a distinction that prose typically papers over.

## How To Use It

1. **Define the phases.** Break the overall journey into three to five distinct stages. A good phase break is a point where the nature of the work shifts — not just a time break. Label each phase with a short active noun or phrase (e.g. "Discover," "Design," "Build," "Launch," "Scale").
2. **List the steps within each phase.** Under each phase name, add two to four bullet points describing the specific activities or deliverables in that phase. These should be concrete — not "do research" but "run 20 user interviews; synthesise findings into themes."
3. **Optionally, add key outcomes.** Below the activity list for each phase, note the deliverable or decision gate that signals the phase is complete and enables the move to the next. This turns the Chevron into a phase-gate model.
4. **Check the sequence.** Read across: does each phase produce what the next phase needs? If not, the phase boundaries may be in the wrong place.
5. **Use a main headline.** The page headline should state the overall endpoint or objective ("How we will grow from 12k to 50k subscribers over 18 months"), so the Chevron shows the route to a defined destination.

## Worked Example

Acme Design's plan to redesign its subscriber onboarding experience:

Main headline: "Five phases to reduce month-1 churn from 22% to under 10% by Q4."

**Phase 1 — Discover (Weeks 1–2)**
- Conduct exit interviews with 30 recent churned subscribers
- Analyse in-product engagement data for months 1–3
- Map the current onboarding email sequence
- Key outcome: Validated list of top three drop-off moments

**Phase 2 — Design (Weeks 3–4)**
- Redesign day-1 to day-7 onboarding flow
- Write new email sequence (7 emails over 14 days)
- Design in-app "learning path" prompt for first login
- Key outcome: Approved mockups and copy, ready for build

**Phase 3 — Build (Weeks 5–7)**
- Develop in-app changes on staging environment
- Configure email automation in CRM
- QA and cross-browser testing
- Key outcome: Onboarding v2 live on staging

**Phase 4 — Test (Week 8)**
- A/B test new vs. old onboarding with 20% of new signups
- Monitor 7-day and 14-day activation metrics daily
- Key outcome: Statistically significant result (minimum 500 users per variant)

**Phase 5 — Scale (Weeks 9–10)**
- Roll out winning variant to 100% of new signups
- Brief customer success team on new sequence
- Set up monthly monitoring dashboard
- Key outcome: New onboarding live globally; baseline churn metric reset

An audience reading this knows exactly what happens in what order, what each phase produces, and what it takes to cross from one phase to the next.

## When To Use It

Use the Chevron when the path to a goal is sequential and phased, and when the audience needs to understand the order of operations before they can evaluate or commit to the plan. It is the right layout whenever you're communicating "here is how we will get from where we are to where we need to be."

Use **Gantt** instead when the audience needs to see specific timing, durations, and overlapping workstreams — the Gantt adds a time axis that the Chevron lacks. Use **Horizon** when the timeframe is multi-year and the communication priority is the strategic themes of each period rather than the operational steps within them.

## Stage Boundary (Insight)

A phased route presumes a destination, and the destination is what Synthesise decides. At Insight, a Chevron may only map a sequence that already exists — the current process, an inherited plan, how the incumbent operates — as perception of the present: where the phases actually break, where handoffs fail, which step everything queues behind. That reading is legitimate insight. Building the forward route to a chosen goal is generative work: the destination locks at Synthesise, Move builds the route, Story presents it.

## Things To Watch Out For

- Chevron phases that all have the same length of activity lists suggest the grouping may be artificial. Phases should reflect the natural rhythm of the work, not a desire for visual symmetry.
- A phase with only one activity in it is probably not a phase — it's a step inside another phase. Merge it.
- Five chevrons is about the maximum legible on a single slide. Beyond that, the text within each chevron becomes too small to read at presentation size. Consider combining phases or spreading across two slides.
- The arrow shape implies strict sequence. If two phases can or must run in parallel, a Chevron will misrepresent the plan. Use a Gantt with overlapping bars for parallel workstreams.

## Related Frameworks

- [Gantt](./gantt.md) — adds a time axis to show when each phase starts and ends; the natural companion when phase timing and overlaps matter.
- [Horizon](./horizon.md) — a higher-altitude view of the same journey; better when the communication priority is multi-year strategic themes rather than near-term operational phases.
- [One Pager](./one-pager.md) — the Chevron often illustrates the execution layer of a One Pager's strategic pillars.
- [Timeline](./timeline.md) — for showing historical milestones rather than forward-looking phases; use when the sequence is in the past, not the plan.
