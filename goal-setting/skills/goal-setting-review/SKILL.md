---
name: goal-setting-review
description: This skill should be used when the user runs a periodic review of the goal-setting method — the monthly KR review, the quarterly review, or the annual vision check (e.g. "run my monthly review", "do the quarterly review", "annual vision check"). Drives the three periodic Ongoing cadences, enforces the three-goal rule on replanning, and writes the entry to goals/journal.md.
allowed-tools: Read, Write, Edit, Glob, Grep
model: opus
---

# goal-setting-review — The Periodic Reviews

This skill drives the three periodic Ongoing cadences: the **monthly** KR review, the
**quarterly** review (the deepest below the annual check), and the **annual** vision check. The
invoking command names the cadence (`monthly`, `quarterly`, `annual`). Where these reviews
replan goals, the **same hard constraints as setup apply** — carry the chief-of-staff posture
from the Setup Arc: push on soft answers, stay in the user's lane, enforce the three-goal rule.

## Current State

!`cat goals/STATE.md 2>/dev/null || echo "No goals/STATE.md — run /goal-setting:init first."`

## Step 0: Preconditions

1. If `goals/STATE.md` does not exist, tell the user to run `/goal-setting:init` and stop.
2. If `mode` is still `setup`, tell the user the reviews operate against a completed Setup Arc
   and point them to finish it. Respect their choice to proceed anyway.
3. Read `goals/active.md`, `goals/scorecard.md`, and recent `goals/journal.md` entries so the
   review works against real state, not from scratch.

---

## Monthly mode (~1 hour)

The diagnostic the five-minute pulse can't make: *are we on track, and if not, is the goal
wrong or the execution wrong?* The pulse catches problems; the monthly review classifies them.

For **each active Objective:**

1. Assess **on track / off track** against its KRs (current vs. target).
2. Classify why:
   - **Execution is wrong** — the system isn't being run consistently or isn't well designed.
     Fix: revise the system using the Four Laws. *Don't change the goal.*
   - **Goal is wrong** — the system is running consistently and the KR still isn't moving. Fix:
     revise the KR (or the Objective, if the misfit is deeper). *Don't blame execution.*

   Most owners default to blaming execution when the goal is actually wrong. Push against that
   default — if the user reports they executed and it's not moving, name that it points at the
   goal.
3. Record the specific change being made (if any) for next month.

If a change revises a KR or system, update `goals/active.md`. Write the per-Objective
assessment to `goals/journal.md` under a monthly section. Update `Monthly review last run`.

---

## Quarterly mode (half day to full day)

Four things in sequence. This is where replanning happens, so the three-goal rule is back in
force.

1. **Re-run the Anchor Areas Scorecard.** Fresh diagnostic, not a reaffirmation — has anything
   moved? Did the focused area improve? New vulnerabilities? Score all seven honestly (use the
   chapters in `${CLAUDE_PLUGIN_ROOT}/reference/anchor-areas/` and the signals of strength as
   the check). Append a dated snapshot row to the Score History in `goals/scorecard.md`.
2. **Audit each system: keep / revise / retire.** For each active system ask: is this still
   moving the KRs, or has it decayed into ceremony (doing the meeting, not gaining the
   insight)? Update `goals/active.md` accordingly.
3. **Plan next quarter's Objectives + KRs.** Set the new Objective and KRs for the next 90 days.
   **Enforce the same hard constraints as Stage 4** (see
   `${CLAUDE_PLUGIN_ROOT}/reference/stages/04-goals.md`): max three active Objectives, one per
   active anchor area, every Objective tagged to an active anchor, KRs measurable with baseline
   and target. Refuse a fourth Objective or an orphaned one. Each Objective must still pass the
   Stage 1 three tests.
4. **Run the recurring pre-mortem.** Different from the launch version — the user now has real
   data. Pull the protocol from `${CLAUDE_PLUGIN_ROOT}/reference/stages/06-premortem.md` and ask:
   which original mitigation triggers fired, and did they work? What unexpected risks surfaced?
   What's most likely to kill the *next* quarter, given what's now known? Produce a revised
   mitigation list (each with `if X` + `then Y`, tagged `source: recurring_premortem`). Refuse
   incomplete mitigations. Update `goals/active.md`.

Write the full quarterly entry to `goals/journal.md` (updated scorecard snapshot, system
keep/revise/retire decisions, next-quarter Objectives, revised mitigations). Update the
`Quarterly review last run` and the Current Period (advance the quarter) in `goals/STATE.md`.

---

## Annual mode (~1 day)

Where the Ongoing Arc loops back into the Setup Arc. Reopen the Stage 1 questions:

- *What game am I playing? Is this still the right game?*
- *What do I actually want? Is the Horizon 3 vision still true?*
- *Does last year's Direction still survive the three tests?*

Most years the answer is *yes, with refinements* — confirm the vision and note it.

If the vision changed: capture the new Horizon 3 vision in `goals/vision.md`, then **hand off
explicitly** — every downstream stage cascades from a revised Horizon 3:

> Your vision changed. Re-run `/goal-setting:horizons` and the downstream Setup stages — the
> new Horizon 3 reshapes your horizons, anchors, and goals.

Set `current_stage: horizons` and `mode: setup` in STATE.md if the vision changed; otherwise
keep `mode: ongoing`. Write the annual entry to `goals/journal.md` and update `Annual vision
check last run`.

Without this check, a user can spend a decade executing brilliantly against a goal they
outgrew years ago. That's the failure the annual check exists to prevent.

---

## Guardrails

1. **Replanning re-invokes the three-goal rule.** Quarterly Objective-setting enforces max
   three / one-per-anchor / no-orphans as refusals, exactly like Stage 4.
2. Carry the chief-of-staff posture: push on soft assessments ("it's fine" without evidence),
   but the calls that are the user's — which anchor, what target, whether to keep a system —
   stay theirs.
3. The monthly classification (goal-wrong vs. execution-wrong) is the load-bearing move; don't
   let the user default to blaming execution when the data points at the goal.
4. Append to `goals/journal.md`; update the matching `last run` line and Current Period in
   STATE.md so `/goal-setting:progress` stays accurate.
5. The recurring pre-mortem is sharper than the launch one because it has real data — make it
   specific to what actually broke this quarter, not theoretical.
