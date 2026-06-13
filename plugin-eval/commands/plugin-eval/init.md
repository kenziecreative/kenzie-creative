---
description: Set up an evaluation — pick a target pack, locate the target plugin, scaffold .eval/
allowed-tools: Read, Write, Glob, Grep
argument-hint: "[target name, default: strategist] [path to target plugin]"
---

Set up plugin-eval in the current project.

Use the `eval-init` skill and follow its steps exactly. It picks a target pack from
`${CLAUDE_PLUGIN_ROOT}/targets/`, resolves where the target plugin's real skill files live
(the runner executes them), scaffolds `.eval/`, and validates the pack before any run.
