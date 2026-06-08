# Read.ai adapter

How Sage pulls transcripts from Read.ai via its MCP server. The SKILL loads this file when `meeting_mcp: read-ai` is set in the deployment `CLAUDE.md`.

## Endpoint

`https://api.read.ai/mcp/` (Streamable HTTP).

## Status

**Beta.** Tool surface may shift. The SKILL should call `tools/list` at the start of every run to confirm tool names rather than hardcoding them, and fail clearly if the expected capabilities aren't present.

## Enumerate-since

Read.ai exposes a meeting-history browse tool with date-range filtering and cursor pagination. The REST analog is `GET /v1/meetings?cursor=<ulid>` returning `{data, has_more}`. Each entry includes the meeting ID (ULID), date, title, and attendees.

**How to use:**
1. Call `tools/list` to find the meeting-listing tool by description.
2. Call it with a date floor at least one day before the latest `meeting_date` in the manifest.
3. Walk pages until you hit an ID already in the manifest, or run out of pages.
4. Anything not in the manifest is the new work.

## Fetch by ID

A per-meeting fetch tool returns the full meeting info (including transcript) by ULID. Discover the exact name via `tools/list`.

## Auth

Currently username/password. **OAuth is rolling out** — when Read.ai migrates, Sage's MCP config will change. Surface this in setup; tell the user they may need to reconnect the MCP after the migration.

## Visibility caveats

Workspace/team visibility rules are not fully verified. **Test with the user's actual account** during setup — confirm a recent meeting they expect to see appears in the enumerate-since result. If not, the MCP scope may be private-meetings-only.

## What goes in `.claude/settings.json`

Add to `permissions.allow` (real names depend on what the MCP server registers; setup checks via `tools/list` at first run):

```
mcp__read-ai__*
```

A coarse wildcard is appropriate here because the beta surface may add tools. If you prefer specifics, resolve them at setup time from `tools/list` and write exact names.

## Manifest stable-ID prefix

`read-ai_<ulid>`

## Attendees

Returned by the enumerate-since tool. Use verbatim in the summary's `**Attendees:**` line.

## Free-tier and retention notes

Historically, Read.ai's free tier has gated reports older than 30 days. Re-verify the current retention window during setup if the user is on a free plan; if transcripts older than the window are needed, they fall back to `source/` drops.
