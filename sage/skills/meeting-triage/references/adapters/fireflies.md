# Fireflies adapter

How Sage pulls transcripts from Fireflies via its MCP server. The SKILL loads this file when `meeting_mcp: fireflies` is set in the deployment `CLAUDE.md`.

## Endpoint

`https://api.fireflies.ai/mcp` (Streamable HTTP).

## Status

**Stable.** Tool surface is documented and consistent.

## Enumerate-since

Tool: `fireflies_get_transcripts`

Accepts `fromDate`, `toDate`, `limit`, `skip`, `keyword` filters. Returns a list of `{id, title, date, participants, summary, ...}`. This is the cleanest enumerate-since primitive of the three v1 adapters.

**How to use:**
1. Set `fromDate` to one day before the latest `meeting_date` in the manifest (one-day overlap covers timezone slop).
2. Paginate via `limit` / `skip` if the result set is large; otherwise a single call covers most cases.
3. Anything not in the manifest is the new work.

## Fetch by ID

Tool: `fireflies_get_transcript`

Returns full sentences with speaker attribution, timestamps, and metadata for a single meeting ID.

## Auth

OAuth or bearer API key. Whichever the user configured when connecting the MCP is fine — Sage doesn't care, it just uses the configured tools.

## Visibility caveats

The authenticated user sees their own meetings plus anything shared with them at the Fireflies workspace level. Team-wide visibility depends on the user's Fireflies workspace role. **Test with the user's actual account** during setup — confirm a recent meeting appears.

## Plan tier

Lower tiers may have retention windows or quota limits not documented in the MCP docs. Worth a glance at Fireflies' pricing page during setup if the user is on a free/Pro plan. If a meeting older than retention is needed, `source/` drop.

The MCP tool `fireflies_get_rule_executions` is the only explicitly Enterprise-gated tool documented. Sage doesn't use it.

## What goes in `.claude/settings.json`

Add to `permissions.allow`:

```
mcp__fireflies__fireflies_get_transcripts
mcp__fireflies__fireflies_get_transcript
```

Exact names, not a wildcard — Fireflies' surface is stable enough to lock down.

## Manifest stable-ID prefix

`fireflies_<id>`

## Attendees

Returned as `participants` on each entry from `fireflies_get_transcripts`. Use verbatim in the summary's `**Attendees:**` line.
