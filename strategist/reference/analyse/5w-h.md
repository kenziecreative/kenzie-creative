---
name: strategist:reference/analyse/5w-h
type: strategist_framework
stage: analyse
title: 5W+H
slug: 5w-h
aka: [Five Ws and How, Kipling Method, Who What When Where Why How]
source: "Rudyard Kipling (Six Honest Serving Men)"
related: [5-whys, yes-no, driver-tree, scq, htdq]
---
# 5W+H

> A six-angle investigation framework — Who, What, When, Where, Why, How — that maps the full terrain of a problem before you attempt to solve it.

## What It Is

The 5W+H framework structures problem investigation through six mandatory questions: **Who** is involved (causing, affected by, or able to resolve the problem)? **What** is the problem, stated precisely? **When** does it occur — how frequently, since when, and for how long? **Where** is it occurring — which location, channel, system, or team? **Why** did it happen — what is the underlying cause? **How** can it be resolved — what are the immediate and longer-term fixes?

Each question is a distinct lens on the same problem. The framework's value comes from requiring all six answers, not just the ones that come easily. The "Why" element of 5W+H typically connects to the **5 Why's** method for drilling into root cause; the full 5W+H canvas ensures the "why" is placed in context rather than pursued in isolation.

## Why It Works

When a problem appears, the natural impulse is to jump to either a cause or a fix. Both shortcuts carry the same risk: you are solving for a partial picture. A team that goes straight to "why" may land on the root cause but miss that the problem only occurs in one geography or customer segment — limiting the scope and making the solution more complex than necessary. A team that goes straight to "how" may solve the symptom efficiently while leaving the cause intact.

The 5W+H prevents premature closure by forcing a complete map of the problem before any fix is designed. The "Who" question, in particular, is often skipped — yet knowing who is affected tells you the urgency, and knowing who is causing the problem tells you who needs to change their behaviour. The "When" question uncovers whether the problem is chronic or episodic, which changes the approach entirely. Six questions, each non-negotiable, means you leave the session with a full picture rather than a confident but partial one.

The framework also serves as a communication tool. A 5W+H summary can be handed to anyone and understood without context — it contains everything needed to start working on the problem.

## How To Use It

1. **What:** State the problem precisely, using data where possible. Avoid vague formulations. Reference the Define frameworks (SCQ or HTDQ) if you have already structured the problem there.
2. **Who:** Identify everyone relevant — who is experiencing the problem, who may be contributing to it, and who has the authority or ability to fix it.
3. **When:** Establish the time dimension — when did it start, how long has it been occurring, is it constant or intermittent, is it getting worse or stabilising?
4. **Where:** Locate the problem in space — which product, channel, region, team, customer segment, or system step is affected, and whether the problem is contained or spreading.
5. **Why:** Investigate the root cause. Use the **5 Why's** method here to drill below the surface explanation to the underlying cause.
6. **How:** Identify both the immediate fix (what can be done now to stop the bleeding) and the longer-term solution (what systemic change prevents recurrence).

Work through these in order, but expect to loop back — the "When" answer often reshapes the "Who," and the "Why" often reframes the "What."

## Worked Example

Acme Design's subscriber churn rate has risen from 4% to 9% per month over the past eight weeks. The leadership team runs a 5W+H session:

**What:** Monthly churn has more than doubled — from 4% to 9% — over the past eight weeks, representing an annualised loss of approximately $540,000 in recurring revenue if the trend holds.

**Who:** Affected: all paying subscribers, particularly those on the $49/month individual plan (which shows 11% churn vs. 5% for the $99 team plan). Causing: preliminary data suggests churn is concentrated among subscribers who signed up via a Black Friday discount promotion. Able to resolve: product team (onboarding experience), customer success (at-risk outreach), and marketing (promotion design).

**When:** The spike began immediately after the Black Friday cohort hit their 60-day mark — the end of the initial commitment period. It is not spreading progressively; it appears cohort-specific and episodic rather than systemic.

**Where:** Concentrated on the individual plan, among the Black Friday cohort, across all geographies equally. The problem is isolated to this cohort — subscribers acquired through other channels are churning at the baseline 4% rate.

**Why:** The Black Friday promotion offered a steep discount but no structured onboarding or success checkpoint. This cohort had lower course-completion rates (22%) than the standard cohort (51%) and never reached the habit-formation moment that drives retention. Root cause: discount-led acquisition without differentiated onboarding.

**How:** Immediate fix — activate a personal outreach sequence for the remaining at-risk Black Friday subscribers with a curated learning path and 30-day check-in. Longer-term fix — gate any future discount promotions behind a mandatory onboarding module, and define a minimum completion milestone (first module within 7 days) as a success criterion for promotional cohorts.

## When To Use It

Use 5W+H early in the Analyse stage when a problem has surfaced but is not yet well understood — especially when the team has already jumped to a proposed fix or is debating causes without shared facts. It is a diagnostic canvas, not a decision-making tool. Once the six questions are answered, route to **5 Why's** for deeper root-cause work, or to **Yes/No** if the path forward involves conditional decisions. If the problem is already well-defined, you may not need the full canvas — reach for 5W+H when you sense the team is missing something about the scope or context of the problem.

## Things To Watch Out For

- The "Why" question is where most teams spend all their energy and skip the rest. Treat the other five questions as equally mandatory, not as preamble to the real work.
- "Who" is routinely answered too narrowly — the person reporting the problem, not the person causing or experiencing it. Be specific: which team, which customer segment, which role?
- "When" is often answered as "it started a while ago." Nailing the exact onset is important because it usually points to a triggering event — a product change, a campaign launch, a process switch — that explains the "why."
- The framework produces a map, not a decision. After completing 5W+H, you still need to prioritise which lever to pull — which requires a separate decision framework.

## Related Frameworks

- [5 Why's](./5-whys.md) — drills into the "Why" dimension with a sequential root-cause technique; use 5W+H to set context, then 5 Why's to find the cause.
- [Yes/No](./yes-no.md) — binary decision tree; use when the diagnostic path involves conditional "if-then" logic after the problem is mapped.
- [Driver Tree](../frame/driver-tree.md) — decomposes a metric into its drivers across multiple branches; use when the "What" from 5W+H is a quantitative metric with multiple contributing causes.
- [SCQ](../define/scq.md) — the Define-stage frame for stating the problem; use before 5W+H when the problem needs to be clearly articulated first.
- [HTDQ](../define/htdq.md) — the narrative Define frame; complements 5W+H by giving the problem a stakeholder-oriented story structure.
