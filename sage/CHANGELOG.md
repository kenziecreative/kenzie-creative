# sage — changelog

## 0.2.0

Fixes and adapter hardening from the first external deployment (Quill MCP, America/Chicago). The headline change is that scheduled runs no longer halt on a setup that didn't fully persist.

- **Schedule prompt now bakes in the absolute project path (blocker).** `/sage:setup` step 11 previously told users to schedule `Run the meeting-triage skill for this project` — with no path. Since the scheduled task runs from its own directory, not the project, the run had nowhere to find `CLAUDE.md` and halted every time. Setup now resolves and confirms the deployment's absolute path and hands the user a ready-to-paste prompt that names it, plus a default schedule of every 2 hours, 7am–5pm, Monday–Friday.
- **Setup verifies the config write.** After writing `CLAUDE.md`, setup reads it back and confirms `timezone:` and the `meeting_mcp:` block actually persisted; if not, it reports the failure and stops rather than finishing "successfully" with no config (which silently produced halting scheduled tasks for earlier users).
- **Custom adapter handles real-service quirks.** `enumerate_date_format` now supports `iso8601-utc-z` (convert the local floor to UTC `Z` form, for services that reject timezone-offset datetimes), `enumerate_date_arg` may be a nested path (e.g. `filter.after`), and new optional `chunk_*`/`fallback_tool` fields let Sage page or fall back to structured minutes when a transcript is too large for one tool result instead of failing.
- **`no_em_dashes` style flag.** Deployments that forbid em dashes can set it so Sage avoids them in summaries and the round-up, removing the need for a cleanup pass.
- **End-of-day clarified.** Setup now states that the regular run does the end-of-day Forward Watch List re-bucket inline (at/after 5pm when `source/` is clear); there is no separate end-of-day task to register.

## 0.1.1

Two fixes driven by the first real run.

- **Backfill-week guidance in the round-up template.** When a run processes a week that has already ended (first deployment with seven-day backfill, paused project resumed, etc.), the Forward Watch List buckets shift from future-tense (`Tomorrow`, `Before EOW`) to historical/spillover (`Before EOW (was <day>)`, `This week (week of <next Monday>)`). The model figured this out on its own in the first run; the template now documents it so the rule is shared, not improvised.
- **Deterministic settings.json write-failure message in `/sage:setup`.** When the `.claude/settings.json` write fails (the path is protected on the Cowork surface), setup now surfaces a canonical message that explains the file is inert in Cowork anyway and lists the exact entries to add manually in Claude Code. Previously the model improvised the message — same substance, but variance per run.

## 0.1.0

First marketplace release. Turns meeting transcripts into a running weekly round-up: per-meeting structured summaries plus one living document that tracks action items, cross-meeting threads, and a forward watch list.

- Scheduled ingestion every 2 hours (configurable). One processing path whether transcripts arrive via MCP auto-pull or get dropped into the deployment's `source/` folder.
- MCP adapters for Read.ai, Fireflies, and Granola. Universal `source/` floor for any other service.
- Per-source stable ID + SHA-256 content hash dedup. Cross-source dedup (date + attendee overlap + title similarity) so the same meeting from two services becomes one summary.
- `/sage:setup` configures a deployment; `/sage:run` processes the queue on demand. The scheduled task runs the same operation.
