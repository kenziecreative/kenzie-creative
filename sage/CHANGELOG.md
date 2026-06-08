# sage — changelog

## 0.1.0

First marketplace release. Turns meeting transcripts into a running weekly round-up: per-meeting structured summaries plus one living document that tracks action items, cross-meeting threads, and a forward watch list.

- Scheduled ingestion every 2 hours (configurable). One processing path whether transcripts arrive via MCP auto-pull or get dropped into the deployment's `source/` folder.
- MCP adapters for Read.ai, Fireflies, and Granola. Universal `source/` floor for any other service.
- Per-source stable ID + SHA-256 content hash dedup. Cross-source dedup (date + attendee overlap + title similarity) so the same meeting from two services becomes one summary.
- `/sage:setup` configures a deployment; `/sage:run` processes the queue on demand. The scheduled task runs the same operation.
