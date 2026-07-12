---
name: goal-setting-init
description: This skill should be used when the user asks to start, initialize, or set up a Goal Setting deployment (e.g. "start goal setting", "set up goal-setting here", "init my goals"). Scaffolds the goals/ state directory, the five state files, and the per-deployment config, then lands in Setup mode.
allowed-tools: Read, Write, Edit, Glob, Grep
disable-model-invocation: true
model: opus
---

# /goal-setting:init — Initialize a Goal Setting Deployment

You are scaffolding a new goal-setting deployment. This skill creates the working
infrastructure: the deployment config (`CLAUDE.md`) and the six state files under `goals/`
(`STATE.md`, `vision.md`, `active.md`, `scorecard.md`, `journal.md`, `history.md`). It does
**not** start the method — that's `/goal-setting:orient` (Setup Stage 1).

In Cowork, create folders and files with the Write tool only. Do not use shell (`mkdir`,
`cp`, `touch`) — it triggers permission prompts. Writing a file into a path creates the
parent directories.

## Step 0: Fresh-project guard

Check whether `goals/STATE.md` already exists (Glob or Read).

- **If it exists:** stop. Tell the user: "A goal-setting deployment already exists here
  (`goals/STATE.md`). To see where you are, run `/goal-setting:progress`. To keep a separate
  set of goals, create it in a separate directory — one project is one set of active goals.
  To start over here, delete the `goals/` folder and the project `CLAUDE.md` first." Do not
  overwrite anything.
- **If it does not exist:** proceed.

## Step 1: Establish the Direction

1. Read the deployment template at `${CLAUDE_PLUGIN_ROOT}/templates/CLAUDE.md`.
2. Ask the user, in one prompt: "In one rough sentence — what do you actually want for the
   business over your strategic horizon? It's fine to leave it loose; `/goal-setting:orient`
   sharpens it." Accept whatever they give.
3. If it's genuinely empty after one re-ask, write `[FILL]` and note that
   `/goal-setting:orient` will require it before proceeding.

## Step 2: Write the deployment config

Write a filled copy of the template to `./CLAUDE.md` in the project root:

- Replace the `direction:` `[FILL]` line with the user's sentence.
- Leave all other fields at their template defaults (`goals_dir`, `no_em_dashes`).

If a `CLAUDE.md` already exists in the project root that is NOT a Goal Setting config (the
directory is used for something else), do not overwrite it — instead write the config to
`goals/goal-setting-config.md` and tell the user the skills will read it from there.
**But the session-start behavior must still be installed:** append the template's
"Session start (instruction to the assistant)" section to the END of the existing
`CLAUDE.md`, delimited as `## Goal Setting — session start` with a one-line pointer to
`goals/goal-setting-config.md`. Append only — never modify the file's existing content.
Without this, a returning session in this project has no overdue-state check unless the
user happens to run a goal-setting command.

## Step 3: Scaffold the state directory

Resolve today's date (absolute, `YYYY-MM-DD`) and the current quarter (`Q1`–`Q4` by calendar
month) before writing. Write these six files (creating `goals/` in the process).

**`goals/STATE.md`** — use this exact structure:

```markdown
---
mode: setup
setup_status: in-progress
current_stage: orient
completed_stages: []
period_quarter: <e.g. Q2 2026>
period_year: <e.g. 2026>
pushback_calibration: unknown
restart_phase: none
restart_quarterly_deferred: false
updated: <current UTC timestamp, ISO 8601>
---

# Goal Setting — State

**Direction:** <the user's sentence, or [FILL]>

## Current Period

- **Quarter:** <Q2 2026>
- **Year:** <2026>

## Loop Position

- **Mode:** setup _(setup | ongoing | restart)_
- **Setup status:** in-progress (stage: orient)
- **Last setup completed:** —

## Setup Stage Record

| # | Stage | Status | Deliverable captured |
|---|-------|--------|----------------------|
| 1 | Orient     | active  | — |
| 2 | Horizons   | pending | — |
| 3 | Anchors    | pending | — |
| 4 | Goals      | pending | — |
| 5 | Systems    | pending | — |
| 6 | Pre-mortem | pending | — |

## Cadence Calendar

(last-run dates maintained by the skills; the triggers are designed with the user at the end
of Setup — a cadence without a trigger is a hope, and that applies to the method itself)

- Daily last run: — · trigger: (designed at Setup close)
- Weekly pulse last run: — · trigger: —
- Monthly review last run: — · trigger: —
- Quarterly review last run: — · trigger: —
- Annual vision check last run: — · trigger: —
- Next due: complete Setup Arc (`/goal-setting:orient`)

## Working Dynamic

How this user takes pushback — used to calibrate how directly the skills challenge soft
answers. Update as you learn.

- **Pushback calibration:** unknown _(unknown | low | high)_ — low: lead with reasoning and
  invite; high: be direct. Start at the measured default; adjust after the first substantive
  exchange.
- **Notes:** (none yet)

## Coaching Memory

Private notebook — durable observations that make the coaching better across months:
recurring avoidance patterns, the challenge form that lands, what caused past restarts,
decisions the user rejected and why. Written sparingly, at cadence closes, when something
durable was learned. Calibration, never ammunition — nothing here is quoted back as an
accusation or surfaced as a list.

- (none yet)

## Backstage Tasks

Private prep queue for the next session, distinct from the user-facing Next Action (e.g.
"re-check whether the margin-floor mitigation is still cold at the next pulse"). Executed
silently at session start; completed items removed. The user never sees this list.

- (none yet)

## Candidate Backlog

Goals proposed while three were already active — recorded, not adopted. Reviewed at every
quarterly replanning. Each entry: date, the candidate, the decision (pending | swapped in |
deferred | rejected), and for a swap, which Objective was closed to make room.

- (none yet)

## Active Flags

- restart_phase: none _(none | stabilizing | reintroducing — set by the Restart Protocol)_
- restart_system: — _(the system whose hold the weekly pulse is evaluating)_
- restart_clean_weeks: 0 _(consecutive clean pulses for that system; 2 meets the hold)_
- restart_last_clean_pulse: — _(date of the most recent clean pulse counted)_
- restart_queue: — _(paused systems awaiting reintroduction, in order)_
- restart_quarterly_deferred: false

## Next Action

Run `/goal-setting:orient` — Setup Stage 1: what game are you playing, and what do you
actually want?
```

**`goals/vision.md`**:

```markdown
# Vision — Direction & Horizons

> *Direction (Stage 1) and the HorizonSet (Stage 2). The annual vision check reopens this.*

## Direction
_Not yet set. Run `/goal-setting:orient`._

## HorizonSet
_Not yet set. Run `/goal-setting:horizons`._
```

**`goals/active.md`**:

```markdown
# Active Goals

> *Objectives, Key Results, Systems, and Mitigations — one section per Objective.
> Maximum three active Objectives, one per active anchor area. See `reference/schemas.md`.*

_No active goals yet. Stage 4 (`/goal-setting:goals`) creates the first Objective._
```

**`goals/scorecard.md`**:

```markdown
# Anchor Areas Scorecard

> *Honest 1–10 scores across the seven anchor areas, with history. Re-scored every quarterly
> review. Active set capped at three. See `reference/anchor-areas/`.*

## Current Scores
_Not yet scored. Run `/goal-setting:anchors`._

## Active Anchor Areas
_None selected yet (max 3)._

## Score History
| Date | Demand Gen | Conversion | Delivery | Operations | Nurturing | Profit | Personal Ldrshp |
|------|-----------|-----------|----------|-----------|-----------|--------|-----------------|
```

**`goals/journal.md`**:

```markdown
# Journal

> *Append-only log of cadence entries, reverse chronological (newest at top). Each entry
> tagged by cadence: daily, weekly, monthly, quarterly, annual, restart, pressure-test.*

_No entries yet. The daily ritual and weekly pulse begin once Setup is complete._
```

**`goals/history.md`**:

```markdown
# Goal History

> *Closed commitments, immutable. Every Objective that leaves active status lands here with
> its original commitment, the final actuals, a disposition (achieved | missed | abandoned |
> superseded), and the lessons. Append-only — nothing here is ever rewritten. Revision
> records for still-active goals live with the goal in `active.md`; this file holds what's
> closed.*

_No closed goals yet._
```

## Step 4: (Claude Code only) Pre-allow tools

If running on Claude Code, write `.claude/settings.json` pre-allowing the tools the method
uses, so the user isn't prompted repeatedly:

```json
{
  "permissions": {
    "allow": ["Read", "Write", "Edit", "Glob", "Grep", "Task"]
  }
}
```

If the file already exists, merge the `allow` list rather than overwriting. In Cowork this
step is a no-op — skip it silently.

## Step 5: Orient the user

Present a short confirmation:

```
Goal Setting deployment initialized.

  Direction: <sentence, or "to be set in Orient">
  State:     goals/STATE.md
  Vision:    goals/vision.md
  Config:    CLAUDE.md

The method has two arcs. The **Setup Arc** runs once (then annually): six stages in order —
Orient → Horizons → Anchors → Goals → Systems → Pre-mortem. The **Ongoing Arc** runs
continuously after Setup: daily writing, a weekly pulse, and monthly/quarterly/annual reviews.

One thing up front, so you know how I'll work: I'm a rigorous chief-of-staff, not a cheerleader.
I'll push on a vague goal or a system that's really just a hope. But the calls that are yours —
which anchor to prioritize, what target to set — stay yours, and I won't invent facts about your
business. And the one rule I'll hold the hardest: never more than three active goals at once.

▶ NEXT: /goal-setting:orient — Setup Stage 1.
   Any time: /goal-setting:progress to see where you are.
```

## Guardrails

1. Never overwrite an existing deployment (Step 0 guard) or a non-Goal-Setting `CLAUDE.md`
   (Step 2 fallback).
2. Do not begin the Orient work here. Init prepares; the stages do the thinking.
3. Use the Write tool for all file and folder creation. No shell in Cowork.
4. Convert any relative date to an absolute one before writing.

## Common Failure Modes

| Failure Mode | Prevention |
|---|---|
| Clobbering an in-progress deployment | Step 0 guard checks `goals/STATE.md` first and refuses if present. |
| Overwriting an unrelated `CLAUDE.md` | Step 2 detects a non-Goal-Setting config and writes to `goals/goal-setting-config.md` instead — while still APPENDING the session-start block so the return protocol survives the fallback. |
| Starting the Orient analysis inside init | Init is scaffolding only. The first thinking happens in `/goal-setting:orient`. |
| Shell prompts derailing Cowork setup | Create everything with Write; never `mkdir`/`cp`/`touch`. |
