---
name: goal-setting-progress
description: This skill should be used when the user asks where they are in the goal-setting method or what's next (e.g. "where am I in my goals", "goal-setting progress", "show my goals dashboard", "what's next"). Read-only — reports loop position, active goals, KR status, systems, mitigations, the cadence calendar, and the next action.
allowed-tools: Read, Glob, Grep
model: sonnet
---

# goal-setting-progress — The Dashboard

Show where the deployment stands. Read-only — this skill writes nothing.

## Current State

!`cat goals/STATE.md 2>/dev/null || echo "No goals/STATE.md found — run /goal-setting:init first."`

## Step 1: Health checks

Collect results into a failures list (empty = all pass):

1. **Deployment present** — `goals/STATE.md` exists. If not, report "No active deployment —
   run `/goal-setting:init`" and stop; the rest is moot.
2. **STATE structurally sound** — STATE.md has the YAML frontmatter keys `mode`, `setup_status`,
   `current_stage`.
3. **State files present** — `goals/vision.md`, `goals/active.md`, `goals/scorecard.md`,
   `goals/journal.md` all exist.
4. **Reference reachable** — Glob `${CLAUDE_PLUGIN_ROOT}/reference/` and confirm `playbook.md`,
   the `stages/` directory, and the `anchor-areas/` directory are present.

## Step 2: Read state

Read `goals/STATE.md` (mode, loop position, Setup Stage Record, cadence calendar, flags),
`goals/scorecard.md` (active anchors + current scores), `goals/active.md` (Objectives, KR
status, Systems, outstanding Mitigations), and the latest entries in `goals/journal.md` (most
recent cadence runs). If STATE says a stage is complete but the state file still shows its
placeholder, surface that discrepancy.

## Output

```
### Infrastructure
Infrastructure: N/4 checks passed
[list only failures, if any]

### Goal Setting — <Direction, trimmed>

**Period:** <Quarter Year>   ·   **Mode:** <setup | ongoing | restart>
**Loop position:** <Setup: Stage X (name)>  OR  <Ongoing>

**Active Anchor Areas:** <name (score), name (score), …>   (max 3)

**Active Objectives:**
| Objective | Anchor | KR status |
|-----------|--------|-----------|
| <title>   | <anchor> | <on/off track per KR> |
[one row per active Objective; "none yet" if pre–Stage 4]

**Active Systems:** <system (trigger), …  — or "none yet">  [note any paused]
**Outstanding mitigations:** <count, or "none">

**Cadence calendar:**
- Daily: <last run / —>   ·   Weekly: <last run / —>
- Monthly: <last run / —>   ·   Quarterly: <last run / —>   ·   Annual: <last run / —>

**Next action:** <the Next Action / Next due line from STATE.md>
```

For a deployment still in the Setup Arc, show the Setup Stage Record (which stages are complete,
active, pending) in place of the cadence calendar's prominence, and set Next action to the
current stage's command.

## Guardrails

1. Report exactly what STATE.md and the state files say. Don't editorialize on quality — that's
   the critic's job, not the dashboard's.
2. If STATE and a state file disagree (a stage complete in one, empty in the other), surface the
   discrepancy plainly.
3. Show outstanding mitigations and any overdue cadence prominently — they're easy to lose.
4. This skill is read-only. It does not write or modify any file.
