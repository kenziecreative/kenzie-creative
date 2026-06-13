---
description: Run the evaluation — drive each scenario through a blind runner, score it, write a scorecard
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task
argument-hint: "[--scope golden|all|representative|adversarial] [--id <id>] [--target <name>]"
---

Run the plugin-eval loop. This is the regression command — run it after any change to the
target plugin's skills.

Use the `eval-run` skill and follow its steps exactly. It spawns a blind `eval-runner`
subagent per scenario (faithful, isolated execution of the target), scores each capture
with an `eval-judge` subagent against the target's rubric, and writes a timestamped
scorecard to `.eval/reports/`. Requires `/plugin-eval:init` first.
