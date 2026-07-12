---
name: goal-setting-progress
description: This skill should be used when the user asks where they are in the goal-setting method or what's next (e.g. "where am I in my goals", "goal-setting progress", "show my goals dashboard", "what's next"). Read-only — reports loop position, active goals, KR status, systems, mitigations, the cadence calendar, and the next action.
allowed-tools: Read, Glob, Grep
model: sonnet
---

# goal-setting-progress — The Dashboard

Show where the deployment stands. Read-only — this skill writes nothing.

Apply the *reading* half of `${CLAUDE_PLUGIN_ROOT}/reference/heartbeat.md` before reporting:
trust order (files win), and the overdue computation + routing. This skill performs no
route — it is read-only — but the **Next action it reports is the heartbeat's route**, not
a stale `Next due` line from STATE: a ~6-week gap reports the Restart Protocol as the next
action; a passed quarter boundary reports the closeout; a fired (or long-unchecked)
mitigation leads the warnings. A dashboard that shows a 42-day-old "next: Monday pulse" is
lying about where the user stands.

## Current State

!`cat goals/STATE.md 2>/dev/null || echo "No goals/STATE.md found — run /goal-setting:init first."`

## Step 1: Health checks

Collect results into a failures list (empty = all pass):

1. **Deployment present** — `goals/STATE.md` exists. If not, report "No active deployment —
   run `/goal-setting:init`" and stop; the rest is moot.
2. **STATE structurally sound** — STATE.md has the YAML frontmatter keys `mode`, `setup_status`,
   `current_stage`.
3. **State files present** — `goals/vision.md`, `goals/active.md`, `goals/scorecard.md`,
   `goals/journal.md` all exist (`goals/history.md` too on deployments scaffolded at v0.2.0+;
   its absence on an older deployment is a note, not a failure — the next writing skill adds
   it).
4. **Reference reachable** — Glob `${CLAUDE_PLUGIN_ROOT}/reference/` and confirm `playbook.md`,
   the `stages/` directory, and the `anchor-areas/` directory are present.

## Step 2: Read state

Read `goals/STATE.md` (mode, loop position, Setup Stage Record, cadence calendar + triggers,
flags, Candidate Backlog), `goals/scorecard.md` (active anchors + current scores),
`goals/active.md` (Objectives, KR status, Systems, Mitigations and their statuses), and the
latest entries in `goals/journal.md` (most recent cadence runs). If STATE says a stage is
complete but the state file still shows its placeholder, surface that discrepancy. Compute
overdue cadences from the last-run dates and today's date — arithmetic, not the `Next due`
line.

## Output

```
### Infrastructure
Infrastructure: N/4 checks passed
[list only failures, if any]

### Goal Setting — <Direction, trimmed>

**Period:** <Quarter Year>   ·   **Mode:** <setup | ongoing | restart (phase: stabilizing/reintroducing — held N of 2 clean weeks)>
**Loop position:** <Setup: Stage X (name)>  OR  <Ongoing>
[⚠ lines, only when live: fired mitigation awaiting response · quarter ended, closeout open ·
 cadence overdue by N days/weeks · stage completed out of order (dependency still pending)]

**Active Anchor Areas:** <name (score), name (score), …>   (max 3)

**Active Objectives:**
| Objective | Anchor | KR status |
|-----------|--------|-----------|
| <title>   | <anchor> | <on/off track per KR> |
[one row per active Objective; "none yet" if pre–Stage 4]

**Active Systems:** <system (trigger), …  — or "none yet">  [note any paused]
**Mitigations:** <N untriggered · N fired awaiting response · N resolved — or "none">
**Candidate backlog:** <N pending — reviewed at the quarterly · or omit if empty>
**Closed goals:** <N in history (A achieved · M missed · …) — or omit if none>

**Cadence calendar:**
- Daily: <last run / —>   ·   Weekly: <last run / —>
- Monthly: <last run / —>   ·   Quarterly: <last run / —>   ·   Annual: <last run / —>

**Next action:** <the heartbeat route when anything is overdue; otherwise the Next Action
line from STATE.md>
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
