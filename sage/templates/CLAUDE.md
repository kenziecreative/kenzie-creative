# Sage — Project Configuration

This file configures one Sage deployment. The `meeting-triage` skill reads it at the start of every run. Most of it ships with working defaults — you can run a useful round-up by supplying only your timezone (and, if you want auto-pull from a meeting service, the `meeting_mcp:` line). Everything else is editable here at any time; the next run picks up your changes. No need to re-run setup to adjust anything.

One project = one round-up. A personal scan and a round-up you forward to your team are two projects, not one.

> The only thing that will halt a run is a missing **timezone** — the skill needs it to compute the Monday-anchored week folder and end-of-day re-bucketing. Everything else below has a working default.

> This template is installed by the `/sage:setup` command, which copies it into your project root and fills in the [FILL] fields by interviewing you. You can also copy it by hand and edit it directly.

---

## Timezone  ← the one thing only you can supply

IANA timezone (e.g. `America/Los_Angeles`, `Europe/London`, `Asia/Tokyo`). Used for the week folder (which Monday a meeting belongs to) and end-of-day re-bucketing of the Forward Watch List.

```yaml
timezone: [FILL]
```

---

## Meeting MCP  (default: none — `source/` drops only)

If you've connected a meeting transcription service via MCP, Sage will auto-pull new transcripts from it on every scheduled run. If you haven't, leave this blank — drop transcripts into `source/` manually instead. The processing path is the same either way.

Supported services (each has a small reference file the skill loads at runtime):

- `read-ai` — Read.ai. Beta tool surface; the skill resolves tool names at runtime via `tools/list`.
- `fireflies` — Fireflies. Stable, clean API. The simplest of the three to set up.
- `granola` — Granola. **Paid plans only** — the transcript-fetch tool is gated. The skill checks plan tier on first run and falls back to `source/` mode for free accounts. Also: Granola MCP only sees your private "My notes" space — team folders are invisible.
- `custom` — A meeting MCP that isn't one of the above. You'll need to supply tool names and field mappings (see the `custom_mcp:` block below).

```yaml
meeting_mcp: [FILL or leave blank]
```

### Custom MCP details  (only when `meeting_mcp: custom`)

```yaml
custom_mcp:
  server_name: [FILL]              # the MCP server's registered name (without mcp__ prefix)
  enumerate_tool: [FILL]           # tool name (the part after the server name)
  enumerate_date_arg: [FILL]       # date-filter arg; may be a nested path, e.g. filter.after
  enumerate_date_format: iso8601-utc-z   # YYYY-MM-DD | iso8601-local | iso8601-utc-z
  fetch_tool: [FILL]               # tool name for fetch-by-ID
  fetch_id_arg: [FILL]             # name of the ID argument on the fetch tool
  id_field: id                     # field name in the enumerate response that holds the meeting ID
  title_field: title               # field name for title
  date_field: date                 # field name for date
  attendees_field: participants    # field name for attendees (or null if not provided)
  # Optional — only if the fetch tool can blow the token limit on long meetings:
  chunk_start_arg: [FILL]          # arg that sets a transcript window's start (minutes)
  chunk_duration_arg: [FILL]       # arg that sets the window length (minutes)
  fallback_tool: [FILL]            # structured-minutes tool to use if the transcript is too large
  fallback_id_arg: [FILL]          # ID arg on the fallback tool
```

For Sage to auto-pull from a custom MCP, the MCP must expose two tools: one that enumerates recent meetings (with stable IDs + dates), and one that fetches a transcript by ID. If either is missing, use `source/` drops instead.

Two quirks worth knowing: (1) **Date format.** Some services reject ISO datetimes carrying a timezone offset (`...-05:00`) and accept only UTC `Z` form — set `enumerate_date_format: iso8601-utc-z` for those, and Sage converts your local date floor to UTC. (2) **Long transcripts.** If a single transcript can exceed the model's input limit, fill the optional `chunk_*` and/or `fallback_tool` fields so Sage pages the transcript or falls back to structured minutes instead of failing.

---

## Cadence  (default: every 2 hours — informational)

The actual scheduling lives in `/schedule`, not here. This line is a reminder of what you set up; changing it doesn't change the schedule.

```yaml
cadence: 2h
```

To change the schedule, run `/schedule` and update the task there. The default of every 2 hours catches meetings within a useful window without spamming the project state.

---

## Paths  (defaults shown)

```yaml
source_dir: ./source/         # drop-box for transcript files
meetings_dir: ./meetings/     # per-week folders (Monday-anchored)
manifest_path: ./manifest.json   # what's been processed
```

These rarely need changing. `meetings/` will fill with `YYYY-MM-DD/` directories — one per week, dated by Monday — each containing the per-meeting summaries, transcript files, and the rolling `weekly-roundup.md` for that week.

---

## Output style  (optional)

If your deployment forbids em dashes (some house styles do), set this and Sage will avoid them in generated summaries and the round-up — using commas, parentheses, or hyphens instead — so you don't need a cleanup pass.

```yaml
no_em_dashes: false
```

---

## Dictation corrections  (optional)

Words your transcription service consistently mangles. The skill applies these as part of light cleanup before writing the transcript file. Add to this list as patterns surface in your own meetings.

```yaml
dictation_corrections:
  # cloud: Claude
  # co-work: Cowork
  # vercell: Vercel
```

---

## What Sage does, in two lines

Every scheduled run, Sage looks for new transcripts (pulled from your MCP if configured, plus anything in `source/`), turns each into a structured per-meeting summary, files it into the current week's folder under `meetings/`, and folds it into one living `weekly-roundup.md` for that week — index, action items, cross-meeting threads, forward watch list.

The round-up is the artefact. The summaries are evidence behind it. Drop a transcript in `source/`, wait two hours (or run `/sage:run` immediately), and the round-up catches up.
