---
description: Scaffold a goal-setting deployment — the goals/ state directory and the config
allowed-tools: Read, Write, Edit, Glob, Grep
---

Initialize a Goal Setting deployment for the current directory.

Use the `goal-setting-init` skill and follow its steps exactly. It scaffolds the `goals/`
directory (`STATE.md`, `vision.md`, `active.md`, `scorecard.md`, `journal.md`), copies
`templates/CLAUDE.md` into the project root, and lands the deployment in Setup mode with a
clear next step.

The skill's Step 0 is a fresh-project guard: if `goals/STATE.md` already exists it refuses
to run and tells the user how to resume or start over. Do not bypass that guard. It does not
begin Stage 1 — that's `/goal-setting:orient`.
