---
name: strategist-init
description: This skill should be used when the user asks to start, initialize, or set up a Strategist project (e.g. "start a strategy", "set up strategist here", "new strategy project"). Scaffolds the loop state, the working brief, and the per-deployment config.
disable-model-invocation: true
model: opus
---

# /strategist:init — Initialize a Strategy Project

You are scaffolding a new strategy project. This skill creates the working
infrastructure: the deployment config (`CLAUDE.md`), the loop state (`strategy/STATE.md`),
and the working strategy document (`strategy/brief.md`). The clean reader-facing brief
(`strategy/strategy-brief.md`) is produced later, at the Story stage — init does not create
it. This skill does **not** start the loop — that's `/strategist:define`.

In Cowork, create folders and files with the Write tool only. Do not use shell
(`mkdir`, `cp`, `touch`) — it triggers permission prompts. Writing a file into a path
creates the parent directories.

## Step 0: Fresh-project guard

Check whether `strategy/STATE.md` already exists (Glob or Read).

- **If it exists:** stop. Tell the user: "A strategy project already exists here
  (`strategy/STATE.md`). To resume it, run `/strategist:progress`. To start a different
  strategy, create it in a separate directory — one project is one strategy. To start
  over in this directory, delete the `strategy/` folder and the project `CLAUDE.md`
  first." Do not overwrite anything.
- **If it does not exist:** proceed.

## Step 1: Establish the problem

1. Read the deployment template at `${CLAUDE_PLUGIN_ROOT}/templates/CLAUDE.md`.
2. Ask the user, in one prompt: "What problem is this strategy for? One line is enough —
   we'll sharpen it in the Define stage." Accept whatever they give; it can be rough.
3. If the problem is genuinely empty after one re-ask, write `[FILL]` and note that
   `/strategist:define` will require it before proceeding.

## Step 2: Write the deployment config

Write a filled copy of the template to `./CLAUDE.md` in the project root:

- Replace the `problem:` `[FILL]` line with the user's problem statement.
- Leave all other fields at their template defaults (`strategy_dir`, `depth`,
  `pressure_test`, `no_em_dashes`).

If a `CLAUDE.md` already exists in the project root that is NOT a Strategist config
(e.g. the directory is also used for something else), do not overwrite it — instead
write the config to `strategy/strategist-config.md` and tell the user the skills will
read it from there.

## Step 3: Scaffold the working directory

Write these two files (creating `strategy/` in the process):

**`strategy/STATE.md`** — use this exact structure:

```markdown
---
status: active
current_stage: define
completed_stages: []
problem: "<the user's problem statement>"
pushback_calibration: unknown
updated: <current UTC timestamp, ISO 8601>
---

# Strategy Loop — State

**Problem:** <problem statement>

## Position

- **Active:** Define
- **Completed:** (none yet)
- **Pending:** Split → Analyse → Insight → Story → Decide → Act

## Stage Record

| # | Stage | Status | Framework(s) applied | Pressure-tested |
|---|-------|--------|----------------------|-----------------|
| 1 | Define  | active  | — | — |
| 2 | Split   | pending | — | — |
| 3 | Analyse | pending | — | — |
| 4 | Insight | pending | — | — |
| 5 | Story   | pending | — | — |
| 6 | Decide  | pending | — | — |
| 7 | Act     | pending | — | — |

## Working Dynamic

How this user takes pushback — used to calibrate how directly the loop challenges soft
answers. Update as you learn.

- **Pushback calibration:** unknown _(unknown | low | high)_ — low: lead with reasoning
  and invite; high: be direct. Start at the measured default; adjust based on how the
  user responds to challenge.
- **Notes:** (none yet) — e.g. welcomes directness, goes defensive when pushed, prefers
  to reason it through, decisive vs. deliberative.

## Open Pressure-Test Findings

(none)

## Next Action

Run `/strategist:define` — frame the problem before solving it.
```

**`strategy/brief.md`** — use this exact structure:

```markdown
# Strategy Brief — Working Document

> **Problem:** <problem statement>
>
> *This is the **working document**: the full record of how the strategy is built —
> frameworks, dead-ends, reframes, the pressure-test. Each stage adds its section below.
> Iterate freely; a later stage can send you back. The clean, reader-facing strategy brief
> is generated separately at the Story stage (`strategy/strategy-brief.md`).*

## 1. Define
_Not yet started._

## 2. Split
_Not yet started._

## 3. Analyse
_Not yet started._

## 4. Insight
_Not yet started._

## 5. Story
_Not yet started._

## 6. Decide
_Not yet started._

## 7. Act
_Not yet started._
```

## Step 4: (Claude Code only) Pre-allow tools

If running on Claude Code, write `.claude/settings.json` pre-allowing the tools the
loop uses, so the user isn't prompted repeatedly:

```json
{
  "permissions": {
    "allow": ["Read", "Write", "Edit", "Glob", "Grep", "Task"]
  }
}
```

If the file already exists, merge the `allow` list rather than overwriting. In Cowork
this step is a no-op — skip it silently.

## Step 5: Orient the user

Present a short confirmation:

```
Strategy project initialized.

  Problem:   <problem statement>
  State:     strategy/STATE.md
  Brief:     strategy/brief.md
  Config:    CLAUDE.md

The loop has seven stages — Define → Split → Analyse → Insight → Story → Decide → Act —
and it iterates: any stage can send you back to an earlier one.

One thing up front, so you know how I'll work: I'll push hard on the *logic* of the
strategy — where an answer looks too safe, too generic, or doesn't follow from what an
earlier stage established. But timing, feasibility, and cost are yours: I'll ask about
them, I won't assert them or gate the strategy on them. And when I introduce a framing,
it's a proposal you can throw out. You always have the final call; I just want you making
it with the full picture.

▶ NEXT: /strategist:define — frame the problem before solving it.
   Also: /strategist:framework <name> to apply any single framework on its own,
         /strategist:progress to see where you are at any time.
```

## Guardrails

1. Never overwrite an existing strategy project (Step 0 guard) or a non-Strategist
   `CLAUDE.md` (Step 2 fallback).
2. Do not begin the Define work here. Init prepares; the stages do the thinking.
3. Use the Write tool for all file and folder creation. No shell in Cowork.
4. Convert any relative date the user gives in the problem to an absolute one before
   writing it.

## Common Failure Modes

| Failure Mode | Prevention |
|---|---|
| Clobbering an in-progress strategy | Step 0 guard checks `strategy/STATE.md` first and refuses if present. |
| Overwriting an unrelated `CLAUDE.md` | Step 2 detects a non-Strategist config and writes to `strategy/strategist-config.md` instead. |
| Starting the Define analysis inside init | Init is scaffolding only. The first thinking happens in `/strategist:define`. |
| Shell prompts derailing Cowork setup | Create everything with Write; never `mkdir`/`cp`/`touch`. |
