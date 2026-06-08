---
description: Scaffold a structured research project with state management, evidence standards, and agent-driven workflows
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, WebSearch, WebFetch
---

Initialize a structured research project for the current directory.

Use the `research-init` skill and follow its steps exactly. It scaffolds the directory tree (`research/`, `source-material/`), writes `CLAUDE.md`, `STATE.md`, the source registry, gap tracker, cross-reference file, the output gate policy, and a research plan tailored to the user's chosen project type. It also writes `.claude/settings.json` with the tools the plugin uses pre-allowed.

The skill's Step 0 is a fresh-project guard: if `research/STATE.md` already exists, it refuses to run and tells the user how to start over. Do not bypass that guard.
