# Granola adapter

How Sage pulls transcripts from Granola via its MCP server. The SKILL loads this file when `meeting_mcp: granola` is set in the deployment `CLAUDE.md`.

## Endpoint

`https://mcp.granola.ai/mcp` (Streamable HTTP).

## Status

**Stable**, with two hard scope limits called out below.

## Enumerate-since

Tool: `list_meetings`

Returns `{id, title, date, attendees}` per meeting.

**How to use:**
1. Call `list_meetings`.
2. Diff returned IDs against the manifest.
3. Anything not in the manifest is the new work.

Granola also exposes `get_meetings` (search), `query_granola_meetings`, `list_meeting_folders`, and `get_account_info`. Sage uses `list_meetings`, `get_meeting_transcript`, and `get_account_info` (for the plan-tier check below). The others aren't needed.

## Fetch by ID

Tool: `get_meeting_transcript`

Returns the raw transcript by meeting ID. **Paid plans only** — see the plan-tier gate below.

## Plan-tier gate (run at first invocation per session)

Call `get_account_info` once per scheduled run, before attempting any fetches.

- If the response indicates **free / Basic tier**: Sage cannot pull transcripts at all (the fetch tool is paid-only). Surface a clear message to the user: _"Granola free tier doesn't expose transcript fetch. Drop transcripts into `source/` instead, or upgrade Granola."_ Skip the MCP pull for this run; continue to sweep `source/` as normal.
- If the response indicates **paid tier**: proceed normally.

This is the right place to fail-fast rather than discovering it three calls deep into the pull.

## Visibility caveats

**Granola MCP only sees the user's "My notes" private space.** Team-space folders are never accessible, even ones the user created and added members to. `list_meeting_folders` itself is paid-only.

If the user's meetings live in a team folder, Granola auto-pull won't see them. They'll need to either (a) move meetings to "My notes", or (b) use `source/` drops.

Free tier additionally caps to the **last 30 days**.

## Auth

OAuth (Granola's standard MCP auth). Configured when the user connects the MCP outside Sage; Sage just uses the configured tools.

## What goes in `.claude/settings.json`

Add to `permissions.allow`:

```
mcp__granola__list_meetings
mcp__granola__get_meeting_transcript
mcp__granola__get_account_info
```

## Manifest stable-ID prefix

`granola_<id>`

## Attendees

Returned by `list_meetings` per meeting. Use verbatim in the summary's `**Attendees:**` line.
