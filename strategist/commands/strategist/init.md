---
description: Scaffold a strategy project — state, the working brief, and the deployment config
allowed-tools: Read, Write, Edit, Glob, Grep
---

Initialize a Strategist project for the current directory.

Use the `strategist-init` skill and follow its steps exactly. It scaffolds `strategy/`
(`STATE.md`, `brief.md`), copies `templates/CLAUDE.md` into the project root and helps
the user fill the problem statement, and sets up the seven-stage loop.

The skill's Step 0 is a fresh-project guard: if `strategy/STATE.md` already exists, it
refuses to run and tells the user how to start over. Do not bypass that guard.
