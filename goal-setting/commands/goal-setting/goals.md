---
description: Setup Stage 4 — Goal Construction. Turn each active anchor into an Objective + KRs.
allowed-tools: Read, Write, Edit, Glob, Grep
---

Run the **Goals** stage (Setup Stage 4) of the goal-setting method.

Use the `goal-setting-setup-stage` skill for the **goals** stage and follow its steps exactly.
It reads `${CLAUDE_PLUGIN_ROOT}/reference/stages/04-goals.md`, constructs one Objective per
active anchor area with 2–4 measurable Key Results each, rejects wishes and direction-headings
in favor of destinations with proof of arrival, and writes the Objectives to `goals/active.md`.

**Hard constraints:** one Objective per active anchor area, no more than three Objectives
total, and every Objective must link to an active anchor area. The skill refuses orphaned or
over-cap Objectives.
