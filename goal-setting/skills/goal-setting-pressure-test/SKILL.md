---
name: goal-setting-pressure-test
description: This skill should be used when the user asks to pressure-test, stress-test, or red-team their goal setup (e.g. "pressure-test my goals", "stress-test my OKRs", "are these goals actually solid?"). Dispatches the goal-setting-critic subagent to interrogate goal formulations; tests logic and methodology fidelity, not evidence.
allowed-tools: Read, Write, Edit, Glob, Grep, Task
model: opus
---

# goal-setting-pressure-test — Interrogate The Goal Formulations

Stress-test the *formulations* — not whether the goals are the right business calls, but
whether they're well-*formed* and faithful to the method. This skill gathers the relevant
state, dispatches the `goal-setting-critic` agent to attack it, and relays the findings. It
does not rewrite the goals.

## Current State

!`cat goals/STATE.md 2>/dev/null || echo "No goals/STATE.md — pressure-test runs against an active deployment; run /goal-setting:init first."`

## Step 1: Determine scope

1. If `goals/STATE.md` does not exist, tell the user pressure-test works against an active
   deployment and stop (or, if they paste goals inline, test those instead).
2. Apply the return protocol in `${CLAUDE_PLUGIN_ROOT}/reference/heartbeat.md` — trust order,
   stance, overdue routing — silently.
3. Otherwise read `goals/vision.md`, `goals/active.md`, and `goals/scorecard.md`. Decide scope:
   - **No argument:** test the whole current setup (vision, anchors, Objectives, KRs, Systems,
     Mitigations) as it stands.
   - **A target named** (e.g. "pressure-test my KRs", "check Objective 2"): test that, plus the
     surrounding context it depends on (the Objective's anchor, the vision it should serve).

## Step 2: Dispatch the critic

Use the Task tool to launch the `goal-setting-critic` agent. Pass it:

- The Direction and Horizon 3 vision (from `goals/vision.md`).
- The active Anchor Areas (from `goals/scorecard.md`).
- The Objectives, KRs, Systems, and Mitigations in scope (from `goals/active.md`), with enough
  surrounding context for the formulation to be judged fairly.
- **The critic's memory** — the prior `pressure-test` entries from `goals/journal.md`: every
  prior finding with its recorded status (open / resolved), plus the dispatch history (dates
  and scopes). The critic must be able to see whether a prior objection was actually resolved
  or merely reworded — omitting this is how an objection gets laundered away by
  ignore-revise-rerun.
- The user's specific question if they asked one, or "general review" as the scope.
- The instruction to return findings in its standard format: `[TYPE] — issue in one line / Why
  it matters / What resolves it`, drawing on its check list (vagueness, KR drift, system-is-a-
  hope, incomplete mitigation, constraint violation, diagnostic-test failure, anchor mismatch,
  internal contradiction), and to open with its read on the prior findings (resolved /
  recurring / superseded) when any exist.

The critic is self-contained — no web, no sources. It tests logic and methodology fidelity, not
evidence, and never judges whether a goal is the *right* business call. Feeding it its own
prior findings extends its memory, not its remit.

## Step 3: Present findings

Relay the critic's findings, ordered by severity (load-bearing first — a cross-stage
contradiction outranks a minor KR phrasing note). For each: name the issue plainly, say why it
matters to *this* setup, and give the concrete thing that would resolve it. Don't soften, don't
pad.

If the critic finds little of substance, say so honestly: "The formulations hold up on what I
tested. The one thing worth a second look is …" or "Nothing load-bearing — these are solid."
Manufactured concerns train the user to ignore the critic.

## Step 4: Record findings with a status

Append the findings to `goals/journal.md` under a `pressure-test` entry tagged with the date.
Each as a short line naming what it bears on, with an explicit status: new findings open as
`open`; prior findings the critic confirmed addressed are marked `resolved [date]`; prior
findings still standing are re-listed as `open (recurring since [date])` — a finding the user
chose not to act on stays visible, it doesn't expire. Do **not** edit `goals/active.md` or
`goals/vision.md` — acting on a finding is the user's call, made by re-running the relevant
Setup stage:

```
▶ To address these: re-run /goal-setting:<stage> for the affected stage, or talk them through
  with me here. /goal-setting:progress to see where you stand.
```

## Guardrails

1. Test the formulation and methodology fidelity, not the evidence and not the business
   judgment. Whether a target is *achievable* or an anchor is the *right* priority is the
   user's call, not a finding.
2. Honesty over theater. If it's sound, say so. Manufactured concerns erode trust in the tool.
3. The critic interrogates; the user decides. Never rewrite the goals from findings — relay
   them and hand back.
4. Keep findings specific to this setup. "Have you considered risks?" is noise; "Objective 2 is
   tagged to Profit but its KRs all measure outreach activity — that's an anchor mismatch" is
   signal.
