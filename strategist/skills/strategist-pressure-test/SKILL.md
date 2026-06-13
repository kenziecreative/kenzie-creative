---
name: strategist-pressure-test
description: Stress-test the current strategy's reasoning by dispatching the critic agent
allowed-tools: Read, Write, Edit, Glob, Grep, Task
model: opus
---

# strategist-pressure-test — Interrogate The Reasoning

Stress-test the strategy's reasoning — not its evidence, its *logic*. This skill gathers
the material, dispatches the `strategist-critic` agent to attack it, and records the
findings for the user to address back in the relevant stage. It does not rewrite the
strategy.

## Current State

!`cat strategy/STATE.md 2>/dev/null || echo "No strategy/STATE.md — pressure-test runs against an active strategy; run /strategist:init first."`

## Step 1: Determine scope

1. If `strategy/STATE.md` does not exist, tell the user pressure-test works against an
   active strategy and stop (or, if they paste a strategy inline, test that instead).
2. Otherwise read `strategy/brief.md`. Decide scope:
   - **No argument:** test the whole brief as it currently stands.
   - **A stage named** (e.g. "pressure-test the decide stage"): test that section,
     plus the brief context it depends on.

## Step 2: Dispatch the critic

Use the Task tool to launch the `strategist-critic` agent. Pass it:

- The problem statement (from STATE.md).
- The brief content in scope (the relevant section(s), plus enough surrounding context
  for the reasoning to be judged fairly).
- The instruction to return findings in its standard format: each finding as
  `[type] — the issue — why it matters — what would resolve it`, where `type` is one of
  *Unstated Assumption, Logical Gap, Weak Inference, Alternative Framing, Failure Mode,
  Internal Contradiction*.

The critic is generative and self-contained — it does no web research and checks no
sources. It attacks the thinking, not the facts.

## Step 3: Present findings

Relay the critic's findings to the user, ordered by severity (load-bearing problems
first). For each: name the issue plainly, say why it matters to *this* strategy, and
give the concrete thing that would resolve it. Don't soften and don't pad — this is the
stage where being direct earns its keep.

If the critic finds little of substance, say so honestly rather than manufacturing
concerns: "The reasoning holds up on the dimensions I tested. The one thing worth a
second look is …" or "Nothing load-bearing — this is solid."

## Step 4: Record open findings

Write the findings into the `## Open Pressure-Test Findings` section of
`strategy/STATE.md` (replace `(none)` or append). Each as a short line tagged with the
stage it bears on, so `/strategist:progress` can surface them and the user can clear
them as they address them. Mark the stage's `Pressure-tested` cell in the Stage Record
table.

Do **not** edit `brief.md`. Acting on a finding is the user's call, made by re-running
the relevant stage — point them there:

```
▶ To address these: re-run /strategist:<stage> for the affected stage(s), or talk them
  through with me here. Run /strategist:progress to see open findings any time.
```

## Guardrails

1. Test the logic, not the evidence. Strategist makes no claim to source-rigor; don't
   invent an evidence-audit it isn't built for.
2. Honesty over theater. If it's sound, say it's sound. Manufactured concerns waste the
   user's attention and erode trust in the tool.
3. The critic interrogates; the user decides. Never rewrite the strategy from findings —
   record them and hand back.
4. Keep findings specific to this strategy. Generic "have you considered risks?" is
   noise; "the Decide stage assumes churn is price-driven, but the Analyse stage's data
   points to onboarding — that contradiction is load-bearing" is signal.
