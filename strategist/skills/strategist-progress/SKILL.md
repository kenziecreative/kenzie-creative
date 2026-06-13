---
name: strategist-progress
description: Show the strategy loop dashboard — stage status, frameworks applied, open findings, next action
allowed-tools: Read, Glob, Grep
model: sonnet
---

# strategist-progress — Loop Dashboard

Show where the strategy stands. Read-only — this skill writes nothing.

## Current State

!`cat strategy/STATE.md 2>/dev/null || echo "No strategy/STATE.md found — run /strategist:init first."`

## Step 1: Health checks

Collect results into a failures list (empty = all pass):

1. **Project present** — `strategy/STATE.md` exists. If not, report "No active strategy
   project — run `/strategist:init`" and stop; the rest of the dashboard is moot.
2. **STATE structurally sound** — STATE.md has YAML frontmatter with `status`,
   `current_stage`, and `completed_stages`.
3. **Brief present** — `strategy/brief.md` exists.
4. **Library reachable** — Glob `${CLAUDE_PLUGIN_ROOT}/reference/` and confirm
   `INDEX.md` plus the seven stage directories (`define`, `split`, `analyse`, `insight`,
   `story`, `decide`, `act`) are present.

## Step 2: Read state

Read `strategy/STATE.md` for the Stage Record, Position, and Open Pressure-Test
Findings. Read `strategy/brief.md` to confirm which sections are actually filled (a
stage marked complete in STATE but still `_Not yet started._` in the brief is a
discrepancy — report it).

## Output

```
### Infrastructure
Infrastructure: N/4 checks passed
[list only failures, if any]

### Strategy: <problem statement, trimmed>

| # | Stage | Status | Framework(s) | Pressure-tested |
|---|-------|--------|--------------|-----------------|
| 1 | Define  | Complete | SCQ | ✓ |
| 2 | Split   | Active   | —   | — |
| ... |

**Loop position:** Define ▸ [Split] ▸ Analyse ▸ Insight ▸ Story ▸ Decide ▸ Act
**Open pressure-test findings:** [count, or "none"]
[if any, list each with the stage it bears on]

**Next action:** <the Next Action line from STATE.md>
```

## Guardrails

1. Report exactly what STATE.md and brief.md say. Don't editorialize on quality.
2. If STATE.md and brief.md disagree (a stage complete in one but empty in the other),
   surface the discrepancy plainly.
3. Show open pressure-test findings prominently — an unaddressed load-bearing finding is
   a blocker, not a footnote.
4. This skill is read-only. It does not write or modify any file.
