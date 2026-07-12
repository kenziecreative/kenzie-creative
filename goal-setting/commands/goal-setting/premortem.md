---
description: Setup Stage 6 — Pre-mortem. Assume the goal failed, and build the mitigations now.
allowed-tools: Read, Write, Edit, Glob, Grep
---

Run the **Pre-mortem** stage (Setup Stage 6, launch variant) of the goal-setting method.

Use the `goal-setting-setup-stage` skill for the **premortem** stage and follow its steps
exactly. It reads `${CLAUDE_PLUGIN_ROOT}/reference/stages/06-premortem.md`, runs the six-step
pre-mortem protocol (set the failure scene, external causes, internal causes, hidden
assumptions, likelihood×impact triage, mitigations), revises any KRs the exercise exposes as
unrealistic, and writes the mitigations to `goals/active.md`.

**Hard constraint:** every mitigation needs both an "if X" trigger condition and a "then Y"
action — plus the signal that's watched and how often — the skill rejects incomplete
mitigations. Completing this stage designs the cadence triggers with the user, closes the
Setup Arc, and switches the deployment to Ongoing mode.
