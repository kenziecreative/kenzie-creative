---
description: Run Sage's meeting-triage skill for this project now
allowed-tools: Read, Write, Edit, Glob, Grep
---

Run the `meeting-triage` skill once for the current project, on demand.

Use the `meeting-triage` skill and follow its TASK steps exactly. Read `CLAUDE.md` in the project root for this deployment's configuration. If `CLAUDE.md` is missing or its `timezone` is still a placeholder, do not process anything — tell the user to run `/sage:setup` first (or emit the skill's halt message).

This is the same operation a scheduled task performs; it just runs it now instead of on the schedule. The skill handles ingestion (from a configured MCP and/or `source/`), per-transcript summarisation, filing into the current week's folder, round-up integration, and cleanup discipline.

Use this when:
- Testing setup,
- Forcing an off-cycle catch-up after a just-finished meeting,
- Running on a project where you prefer manual to scheduled.
