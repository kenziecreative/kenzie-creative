# Custom MCP adapter

Used when the user named a meeting MCP that isn't Read.ai, Fireflies, or Granola. The SKILL loads this file when `meeting_mcp: custom` is set, and reads the deployment `CLAUDE.md` for the two tool names the user supplied.

## The contract

For Sage to auto-pull from a custom MCP, the MCP must expose two tools:

1. **An enumerate-since tool** — returns a list of recent meetings (with stable IDs, dates, ideally titles and attendees). Sage needs to filter or diff this to find what's new since the last run. Tools that only search by keyword or take a single-meeting ID don't qualify.
2. **A fetch-by-ID tool** — given a meeting ID from the enumerate result, returns the raw transcript text.

If either tool doesn't exist or doesn't behave deterministically, the MCP doesn't qualify. The fallback is the universal `source/` floor — user exports transcripts and drops them in.

## What the user must supply in `CLAUDE.md`

```yaml
meeting_mcp: custom
custom_mcp:
  server_name: my-meeting-service          # the MCP server's registered name (without mcp__ prefix)
  enumerate_tool: list_recent_meetings     # tool name (the part after the server name)
  enumerate_date_arg: since                # name of the date-filter argument on that tool
  enumerate_date_format: YYYY-MM-DD        # format the date arg expects
  fetch_tool: get_transcript               # tool name for fetch-by-ID
  fetch_id_arg: meeting_id                 # name of the ID argument on the fetch tool
  id_field: id                             # field name in the enumerate response that holds the meeting ID
  title_field: title                       # field name in the enumerate response that holds the title
  date_field: date                         # field name in the enumerate response that holds the date
  attendees_field: participants            # field name for attendees (optional; null if not provided)
```

## What the SKILL does with this

1. Calls `mcp__<server_name>__<enumerate_tool>` with `<enumerate_date_arg>` set to one day before the latest manifest entry, formatted per `<enumerate_date_format>`.
2. Maps each result entry: stable ID from `<id_field>`, title from `<title_field>`, date from `<date_field>`, attendees from `<attendees_field>` if present.
3. Diffs against manifest.
4. For each new entry, calls `mcp__<server_name>__<fetch_tool>` with `<fetch_id_arg>` set to the ID. Writes the transcript to `source/`.

Everything downstream is the same as any other adapter.

## What goes in `.claude/settings.json`

Add to `permissions.allow`:

```
mcp__<server_name>__<enumerate_tool>
mcp__<server_name>__<fetch_tool>
```

(Or `mcp__<server_name>__*` if the user prefers wildcard — works but allows tools Sage doesn't need.)

## Manifest stable-ID prefix

`custom_<id>`

## When this adapter doesn't fit

If the user's MCP doesn't have a clean enumerate-since (e.g. only search, only single-fetch, or enumerate returns unstable IDs), Sage shouldn't auto-pull from it. Setup should tell the user to use `source/` drops for this service. The qualification rule is load-bearing: ignoring it produces silent duplicates, missed meetings, or both.
