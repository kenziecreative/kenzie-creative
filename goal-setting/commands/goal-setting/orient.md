---
description: Setup Stage 1 — Orient. What game are you playing, and what do you actually want?
allowed-tools: Read, Write, Edit, Glob, Grep
---

Run the **Orient** stage (Setup Stage 1) of the goal-setting method.

Use the `goal-setting-setup-stage` skill for the **orient** stage and follow its steps
exactly. It reads `${CLAUDE_PLUGIN_ROOT}/reference/stages/01-orient.md`, applies the
finite/infinite-games frame and the three diagnostic tests to the user's business, calibrates
difficulty, and writes a one-sentence Direction into `goals/vision.md` before advancing
`goals/STATE.md` to the next stage.

This is the first stage — work it before the others. The skill enforces that softly: it will
note if a later stage is run before this one.
