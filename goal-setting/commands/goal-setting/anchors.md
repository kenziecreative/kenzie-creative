---
description: Setup Stage 3 — Anchor Areas. Score the seven, pick the one to three you'll work.
allowed-tools: Read, Write, Edit, Glob, Grep
---

Run the **Anchors** stage (Setup Stage 3) of the goal-setting method.

Use the `goal-setting-setup-stage` skill for the **anchors** stage and follow its steps
exactly. It reads `${CLAUDE_PLUGIN_ROOT}/reference/stages/03-anchors.md` (and points the user
to the chapters in `${CLAUDE_PLUGIN_ROOT}/reference/anchor-areas/` as needed), runs the
Anchor Areas Scorecard across all seven areas, applies the weakness/urgency/impact selection
logic, and writes the scored scorecard plus the active set to `goals/scorecard.md`.

**Hard constraint:** no more than three active anchor areas. If the user tries to mark a
fourth, the skill refuses and requires them to deactivate one first.
