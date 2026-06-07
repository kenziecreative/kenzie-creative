---
description: Run the environmental brief for this project now
allowed-tools: Read, Write, Edit, WebSearch, WebFetch
---

Run the environmental briefing skill once for the current project, on demand.

Use the `environmental-briefing` skill and follow its TASK steps exactly. Read `CLAUDE.md` in the project root for this deployment's configuration. If `CLAUDE.md` is missing or its relevance context is still a placeholder, do not produce a brief — tell the user to run `/intel-setup` first (or emit the skill's halt message).

This is the same operation a scheduled task performs; it just runs it now instead of on the schedule. The skill handles the cadence window, the ledger, and writing the dated brief to the briefs directory in the configured format.
