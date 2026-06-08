# sage — changelog

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
