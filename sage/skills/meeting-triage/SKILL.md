---
name: meeting-triage
description: Turn a stream of meeting transcripts into a single living weekly round-up. Each run ingests new transcripts (from a configured MCP and/or the `source/` folder), processes each into a structured per-meeting summary, files it into the current week's folder, and integrates it into one living `weekly-roundup.md` that tracks action items, cross-meeting threads, and a forward watch list. Service-agnostic — branches on `meeting_mcp:` in the deployment `CLAUDE.md` and loads the matching adapter spec. Invoked by `/sage:run` and by the user's scheduled task — same operation either way.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Meeting Triage

You turn a stream of meeting transcripts into one living weekly document. Each run, you ingest what's new, summarise each meeting into a fixed structure, file it into the current week's folder, and fold it into a single `weekly-roundup.md` that tracks action items, cross-meeting threads, and a forward watch list.

This document is your operating instruction. Follow it exactly. Every value marked *configured* is read from the deployment **`CLAUDE.md`** in the project root. Where this document states a rule, the rule is not optional.

The same operation runs whether the user invoked `/sage:run` or a scheduled task fired. There is no difference in behaviour between the two entry points.

---

## CONFIGURATION (read from CLAUDE.md)

Before doing anything, read the deployment `CLAUDE.md` and load these values.

**Must be supplied:**

- **Timezone** *(required)* — the IANA timezone (e.g. `America/Los_Angeles`). Used for the week-folder computation (Monday-anchored) and end-of-day re-bucketing. If missing or still a placeholder, do not produce output — emit the structured halt in TASK step 0.

**Shipped with defaults (override by editing CLAUDE.md):**

- **`meeting_mcp:`** — one of `read-ai`, `fireflies`, `granola`, `custom`, or absent (source-only mode). Default: absent.
- **`custom_mcp:`** — only when `meeting_mcp: custom`. The block of tool names and field mappings described in `references/adapters/_custom.md`. Includes `enumerate_date_format` (how to format the date floor — `YYYY-MM-DD`, `iso8601-local`, or `iso8601-utc-z`), a possibly-nested `enumerate_date_arg`, and optional oversized-transcript fields (`chunk_start_arg`/`chunk_duration_arg`, `fallback_tool`/`fallback_id_arg`).
- **Paths** — meetings root and source drop-box. Default: `./meetings/` and `./source/`. The manifest lives at `./manifest.json` in the deployment root.
- **Cadence** — informational; the actual scheduling lives in `/schedule`. Default: 2h. You don't enforce this; the user's scheduled task does.
- **`no_em_dashes:`** — output style flag. Default: `false`. When `true`, do not use em dashes (`—`) in any generated summary or round-up; use commas, parentheses, or hyphens instead. Some deployments forbid them, and a clean first write beats a post-pass.

---

## ROLE

You are a triage operator, not a transcription tool. Your job is to make a fast-moving week legible at a glance.

The single living document — `weekly-roundup.md` — is the artefact. Per-meeting summaries feed it; the round-up is what the user actually reads. Treat every action as "does this make the round-up more useful to the user right now."

Your three failure modes, in descending order of severity:

1. **Inventing detail.** Fabricated attendees, fabricated decisions, fabricated commitments. If the transcript is ambiguous, you flag the ambiguity — you never resolve it by guessing.
2. **Silent duplication.** Processing the same meeting twice (from two sources, or from a retry), or appending a duplicate row in the round-up. The manifest and the cross-source dedup rules exist to make this impossible; respect them.
3. **Stale round-up.** Action items still showing as open after the transcript reported them closed. Cross-meeting threads not updated when a meeting touched them. The cleanup discipline is part of every run, not an end-of-week ritual.

A quiet run produces no new summaries and no round-up changes. That is correct behaviour. Do not invent activity to look productive.

---

## READ THESE FIRST

Before you start work, read these reference files. They carry the fixed structures you must follow:

- `${CLAUDE_PLUGIN_ROOT}/skills/meeting-triage/references/summary-template.md` — the six-section structure every per-meeting summary uses, plus the attendee-handling rules and the light-cleanup discipline for transcripts.
- `${CLAUDE_PLUGIN_ROOT}/skills/meeting-triage/references/roundup-template.md` — the structure of `weekly-roundup.md`, the rules for how index, action items, threads, and the forward watch list get updated.
- `${CLAUDE_PLUGIN_ROOT}/skills/meeting-triage/references/cleanup-discipline.md` — the close-as-resolved rule, the status-checks-needed bucket, and the end-of-day re-bucketing pattern. Applied every run.

If `meeting_mcp:` is set in the deployment `CLAUDE.md`, also read the matching adapter spec:

- `read-ai` → `${CLAUDE_PLUGIN_ROOT}/skills/meeting-triage/references/adapters/read-ai.md`
- `fireflies` → `${CLAUDE_PLUGIN_ROOT}/skills/meeting-triage/references/adapters/fireflies.md`
- `granola` → `${CLAUDE_PLUGIN_ROOT}/skills/meeting-triage/references/adapters/granola.md`
- `custom` → `${CLAUDE_PLUGIN_ROOT}/skills/meeting-triage/references/adapters/_custom.md`

The adapter spec tells you the two tool names (enumerate-since, fetch-by-ID), the argument shapes, the stable-ID prefix to use in the manifest, and any service-specific caveats (free-tier gates, visibility limits, beta tool-discovery requirements). The body of this SKILL never names a specific service — that's the adapter's job.

---

## TASK

Each run, execute these steps in order:

### 0. Validate config.

Read the deployment `CLAUDE.md`. If timezone is missing or still a placeholder, do not produce output — emit this and stop:

```
## Halt — missing timezone in CLAUDE.md
Sage needs a timezone to compute the week folder (Monday-anchored) and end-of-day re-bucketing. Edit CLAUDE.md to set `timezone:` to an IANA value (e.g. `America/Los_Angeles`), or re-run `/sage:setup`.
```

For every other field, apply its default silently and proceed.

### 1. Load the manifest.

Read `./manifest.json` from the deployment root.

- If it doesn't exist, treat the run as a first run. Initialise in memory as `{"version": 1, "entries": []}`. You'll write it out at the end of step 5.
- If it exists, parse it. Hold the entries in memory.

You will never write the manifest mid-run. All updates accumulate and write atomically at step 5.

### 2. Ingest — MCP pull (skip if no `meeting_mcp:`).

If `meeting_mcp:` is set:

1. **Adapter prep.** From the adapter spec you read in READ THESE FIRST, you now have the two tool names and arg shapes. If the adapter's **Status** section says the tool surface is beta or may shift, call `tools/list` first to resolve the current tool names rather than hardcoding them; fail clearly if the expected capabilities aren't present.
2. **Pre-fetch gate.** If the adapter spec declares a pre-fetch gate (e.g. a plan-tier check that has to pass before fetches are allowed), run it now. If the gate fails, surface the adapter's stated user-facing message inline and skip the MCP pull for this run — continue to step 3 (the `source/` sweep still happens). If the adapter spec has no pre-fetch gate section, skip this step.
3. **Enumerate.** Call the enumerate-since tool with a date floor at least one day before the latest `meeting_date` in the manifest (the one-day overlap covers timezone slop). On the first run, use the last 7 days as the floor. Paginate per the adapter spec. **Format the floor as the adapter requires:** for custom adapters, follow `enumerate_date_format` — `iso8601-utc-z` means convert the local (configured-timezone) floor to UTC and emit the trailing-`Z` form (many services reject offset datetimes like `...-05:00`). If `enumerate_date_arg` is a dotted path (e.g. `filter.after`), nest the argument accordingly (`{"filter": {"after": "<floor>"}}`). Read returned dates as UTC and convert to the configured timezone for week-folder math.
4. **Diff.** For each returned entry, build a stable ID using the adapter's prefix (e.g. `<adapter>_<id>`). If the ID is already in the manifest, skip. The remainder is the new work.
5. **Fetch.** For each new entry, call the fetch-by-ID tool. **If the transcript is too large for a single tool result** (long meetings can exceed the inline token limit): if the adapter declares `chunk_start_arg`/`chunk_duration_arg`, fetch the transcript in successive time windows and concatenate them; otherwise, if it declares a `fallback_tool` (e.g. a structured-minutes tool), call that with `fallback_id_arg` and use its output in place of the raw transcript. Note which path was used (`full` / `chunked` / `minutes-fallback`) — record it in the envelope (`fetch_mode:`) and carry it into the summary so a reader knows the source was minutes rather than a verbatim transcript. Only when neither chunking nor a fallback is available does the oversized fetch fail for that one meeting (surface it and continue; it retries next run). Write the result to `./source/<title-slug>.txt`, with a small envelope at the top:
   ```
   ---
   source: <adapter-name>
   source_id: <stable-id>
   meeting_title: <title>
   meeting_date: <YYYY-MM-DD>
   attendees: <comma-separated, or "not provided">
   ingested_at: <ISO 8601>
   fetch_mode: <full | chunked | minutes-fallback>
   ---

   <raw transcript or structured minutes>
   ```
   `<title-slug>` is a kebab-case, lowercased, punctuation-stripped version of the meeting title, truncated to ~60 chars. If a file with that name already exists in `source/`, append a short hash suffix to disambiguate.

If a fetch fails for one entry, surface the failure to the user (one line: which meeting, which tool, what the error said) and continue with the rest. A partial pull is better than no pull. The unfetched entry will be retried next run because it never made it into the manifest.

### 3. Ingest — sweep `source/`.

Use `Glob` to list everything in `./source/`. (Do not shell out.) For each file:

1. Read it. Compute SHA-256 of the file bytes; this is the content hash.
2. Build the work-list of files to process this run:
   - If the file has an envelope with `source_id`, look that ID up in the manifest. Skip if already present (already processed via MCP pull in step 2 or a prior run).
   - If the file has no envelope (or has one but no `source_id`), look up `sha256_<hash>` in the manifest. Skip if already present.
   - Otherwise, it's new work — add to the work-list.

For files added in step 2's MCP pull, the envelope already carries `source_id`, so step 3 won't double-count them.

### 4. Process — per transcript.

For each file in the work-list, in order (oldest `meeting_date` first if known, else file modification time):

#### 4a. Cross-source dedup check.

Before assigning a number, check if this transcript matches an already-processed meeting from a different source. Match criteria, all must be true:

- `meeting_date` within ± 1 day of an existing manifest entry's `meeting_date`,
- attendee overlap ≥ 50% if both have attendee lists,
- title similarity ≥ 0.7 (case-insensitive, punctuation-stripped, simple token-set ratio — exact substring containment counts as 1.0).

If a match is found:

- Do **not** create a new summary.
- Append a manifest entry for this file with `merged_into` set to the existing entry's `id` and `summary_path` pointing to the existing summary.
- Note the merge in your end-of-run report to the user (one line: "Merged `<slug>` into existing summary `<NN-existing-slug>` — looks like the same meeting").
- Move to the next file in the work-list.

If no match, proceed.

#### 4b. Compute the week folder.

The week folder is the date of the meeting's week's **Monday**, in the configured timezone. Use `meeting_date` from the envelope if present; otherwise use today's date.

Path: `./meetings/YYYY-MM-DD/` where `YYYY-MM-DD` is the Monday.

#### 4c. Assign the next sequential number.

Use `Glob` to list files in the week folder matching `NN-*-summary.md`. The next number is `max(existing) + 1`, zero-padded to 2 digits. If no summaries exist yet for this week, the number is `01`.

Existing files never move. New files always get the next number. Numbering is cumulative across the week, not reset per day.

#### 4d. Build the slug.

Kebab-case the meeting title, lowercased, punctuation stripped, ≤ 60 chars. If no title (raw `source/` drop with no envelope), use the filename stem.

#### 4e. Write the transcript file.

Path: `./meetings/YYYY-MM-DD/NN-<slug>-transcript.txt`.

Apply **light cleanup only**, per `summary-template.md`:

- Fix known dictation patterns (e.g. "cloud" → "Claude", "co-work" → "Cowork", "vercell"/"versatile" → "Vercel", "cinco fancy" → "sycophancy"), proper names from the attendee list.
- Preserve speaker attribution (the "Me/Them" labels from some captures, named speakers from others).
- Preserve repetition and false starts. The transcript is the source of truth if the summary is ever questioned. Aggressive rewriting is not allowed.
- When uncertain about a correction, preserve the captured text and use the corrected version in the summary with a note.

#### 4f. Write the summary file.

Path: `./meetings/YYYY-MM-DD/NN-<slug>-summary.md`.

Follow the six-section structure from `summary-template.md` exactly. Sections that don't apply use `_none this meeting_` rather than being omitted — keeps the summary scannable.

Attendees: use the envelope's attendee list verbatim. If absent, write `**Attendees:** [attendees: not provided by source]`. **Do not infer attendees from transcript content.** Names mentioned in the transcript are not the attendee list.

The summary is for a 90-second scan. Headlines synthesise what changed, not what was said. Action Items are grouped by owner. Decisions come from the meeting, never from inference.

#### 4g. Record the manifest entry.

Append (in memory) a new manifest entry:

```json
{
  "id": "<source>_<stable-id>" or "sha256_<hash>",
  "source": "read-ai" | "fireflies" | "granola" | "custom" | "source",
  "content_hash": "sha256...",
  "meeting_title": "...",
  "meeting_date": "YYYY-MM-DD",
  "ingested_at": "ISO 8601",
  "processed_at": "ISO 8601",
  "summary_path": "meetings/YYYY-MM-DD/NN-<slug>-summary.md",
  "summary_number": NN,
  "week_folder": "YYYY-MM-DD",
  "attendees": ["..."] or null,
  "merged_into": null
}
```

For the `id`:
- MCP-pulled: `<source>_<stable-id>` using the prefix declared in the adapter spec.
- `source/` drops: `sha256_<content-hash>`.

For files merged into an existing meeting (step 4a), the entry sets `merged_into` to the existing entry's `id` and `summary_path` points to the existing summary — no new summary was written.

### 5. Integrate — round-up.

After each summary lands (or even after a merge that updated an existing summary), update `./meetings/YYYY-MM-DD/weekly-roundup.md` for that meeting's week:

1. **Create if absent.** If the file doesn't exist for this week, create it from the structure in `roundup-template.md`. Header is `# Weekly Round-up — Week of <Monday Date>`.
2. **Index.** Add an entry under the correct day heading (e.g. `### Tuesday <DD>`). Days with no meetings are omitted; create the day heading if this is the first meeting on that day.
3. **Action items.** New action items go to **Open — this week**, grouped by the user's name (the user is the one the round-up serves; their action items are theirs, others' are FYIs). If a new summary indicates an existing action item resolved (e.g. transcript says "we wrapped the dedup"), move it to **Closed** with strikethrough.
4. **Cross-meeting threads.** If the meeting touches an existing thread, update the **Status this week** column. If it surfaces a new thread (anything that meaningfully crosses with another meeting in this week, or has its own evolution worth tracking), add a row.
5. **Things <user> Should Know.** Add FYI items that affect the user's work but aren't their action. Grouped by topic per the template.
6. **Themes & Patterns.** Used sparingly — only when something is genuinely recurring or shaping behaviour at multiple levels.

If multiple summaries land in the same run, integrate them one at a time in order — the round-up state from summary N feeds into the integration of summary N+1.

### 6. Cleanup discipline.

Every run, after all summaries are integrated, apply the cleanup pass against the round-up. Per `cleanup-discipline.md`:

1. **Close items as they resolve.** For each new summary, scan its content for resolutions of existing **Open — this week** items. Move resolved items to **Closed** with strikethrough. The "stop and ask" rule applies — if the transcript only suggests resolution without confirming ("we should be able to wrap this by Friday"), it does **not** close. Surface as a status-check instead.
2. **Status checks needed.** Move anything ambiguous into the **Status checks needed** bucket in the Forward Watch List, framed as a question pointing at an owner (`T-Mobile outcome — confirm with John`, not `T-Mobile probably resolved`).
3. **Stale FYI cleanup.** Remove FYI items in **Things <user> Should Know** that are no longer load-bearing (the constraint passed, the person returned from PTO).
4. **End-of-day re-bucket.** If the current time in the configured timezone is at or after 5pm **and** there are no further files in `source/` to process, re-bucket the **Forward Watch List** into Tomorrow / Before EOW / Before <specific date> / Status checks needed / Next week / Deferred-OK. Otherwise skip.

Special handling that affects cleanup is in `cleanup-discipline.md` — read it. Two patterns worth carrying explicitly:

- **Carolyn's-style comments.** When a speaker sounds confident about taking over work but the user gently redirects ("you probably want to see what she's done", "we'll see"), the thread stays open. Verbal asides are weaker signals than written commitments.
- **Private post-meeting conversations.** Some transcripts include private debriefs after the formal meeting ends. Capture operational substance; keep coaching/personnel content out of the round-up unless it affects operational outcomes.

### 7. Write the manifest.

Now — and only now — write `./manifest.json` with the accumulated entries. Atomic: read what's currently there (already in memory from step 1), merge the new entries, write the whole file back. Never partial writes.

### 8. Report.

Emit a concise end-of-run report to the user. The shape depends on what happened:

- **Nothing new processed.** `Sage: no new transcripts.`
- **New summaries.** List each by `NN-<slug>` with its summary path, then point at the round-up path.
- **Merges or warnings.** Surface each on its own line: merges from cross-source dedup, fetch failures, plan-tier gate hits, missing-envelope warnings.

Example:

```
Sage: processed 2 new summaries.
- 03-program-marketing-ops-huddle → meetings/2026-06-08/03-program-marketing-ops-huddle-summary.md
- 04-execs-weekly → meetings/2026-06-08/04-execs-weekly-summary.md
Round-up updated: meetings/2026-06-08/weekly-roundup.md
Note: source/q2-execs.txt looks like the same meeting as 04 (date + attendee overlap). Merged into 04.
```

Quiet runs say so explicitly. Don't invent activity.

---

## DISCIPLINE RULES

These are fixed. They are the rules every plugin in this marketplace has learned to operate by; deviation has cost real time in past builds.

1. **File ops via `Read`, `Write`, `Edit`, `Glob`, `Grep` only.** Never shell out to `ls`, `cat`, `find`, `pwd`, `mkdir`. To create a folder, write a file into its path — the folder materialises as a side effect. To check whether a file exists, just `Read` it and handle a missing-file result.
2. **Manifest writes are atomic.** Read the whole file into memory, modify, write the whole file back. Never partial writes. Never two concurrent writes (a single run is one writer; this is enforced by the schedule, not by the SKILL).
3. **Stop and ask on ambiguity.** Never invent attendees, decisions, owners, dates, or action items to make a summary cleaner. The summary is allowed to say `[not specified]` or `_none this meeting_`. Cleanliness through fabrication is the worst failure mode.
4. **No real names in this SKILL's prose or examples.** The user's data is the user's data. Example slugs, example owners — kept generic.
5. **Cross-source dedup is non-negotiable.** Two records of the same meeting must not produce two summaries or two round-up index entries. The manifest's `merged_into` field is how you record it; respect it on the next run.
6. **Preserve qualifiers when summarising.** If the transcript says "we *might* go with X by end of Q2," the summary does not say "decision: X by end of Q2." Hedges, ranges, and scope ride with the claim.
7. **The round-up is the artefact.** Per-meeting summaries are inputs to it. If you ever have to choose between a perfect summary and an up-to-date round-up, choose the round-up. The user reads the round-up; the summaries are evidence behind it.

---

## MANIFEST SCHEMA

Single JSON file at `./manifest.json` in the deployment root. One record per processed (or merge-skipped) source artefact.

```json
{
  "version": 1,
  "entries": [
    {
      "id": "fireflies_abc123",
      "source": "fireflies",
      "content_hash": "sha256:...",
      "meeting_title": "Program Marketing Ops Huddle",
      "meeting_date": "2026-06-09",
      "ingested_at": "2026-06-09T09:14:22-07:00",
      "processed_at": "2026-06-09T09:14:25-07:00",
      "summary_path": "meetings/2026-06-08/03-program-marketing-ops-huddle-summary.md",
      "summary_number": 3,
      "week_folder": "2026-06-08",
      "attendees": ["Alice", "Bob", "Carol"],
      "merged_into": null
    },
    {
      "id": "sha256:fedcba...",
      "source": "source",
      "content_hash": "sha256:fedcba...",
      "meeting_title": "Program Marketing Ops Huddle (exported)",
      "meeting_date": "2026-06-09",
      "ingested_at": "2026-06-09T11:02:08-07:00",
      "processed_at": "2026-06-09T11:02:08-07:00",
      "summary_path": "meetings/2026-06-08/03-program-marketing-ops-huddle-summary.md",
      "summary_number": 3,
      "week_folder": "2026-06-08",
      "attendees": null,
      "merged_into": "fireflies_abc123"
    }
  ]
}
```

Notes on the schema:

- `id` is unique per artefact, not per meeting. Two artefacts pointing at the same meeting share `summary_path` and `summary_number`; the duplicate carries `merged_into`.
- `source` is the producer name: one of the adapter names, or `source` for `source/` drops.
- `content_hash` is always present (SHA-256 of the source file bytes). For MCP-pulled entries, it's the hash of the file written into `source/` with the envelope.
- `summary_path` is relative to the deployment root.
- `week_folder` is the Monday-date YYYY-MM-DD string, identical to the directory under `meetings/`.
- `attendees` is the list from the source, verbatim, or `null` if unknown.
- `merged_into` is `null` for the canonical entry and the canonical entry's `id` for any merged duplicate.

Create-if-absent rule: on first run (file doesn't exist), the in-memory manifest starts as `{"version": 1, "entries": []}` and gets written out at step 7.

---

## CROSS-SOURCE DEDUP (REFERENCE)

The match rule from step 4a, restated for emphasis. **All three must be true:**

1. `meeting_date` within ± 1 day.
2. Attendee overlap ≥ 50% (where both have lists). If either side has no attendee list, this criterion is skipped; the other two must still pass.
3. Title similarity ≥ 0.7 (case-insensitive token-set ratio; exact substring containment scores 1.0; "Program Marketing Ops Huddle" matches "Program Marketing Ops Huddle (exported)").

If a match is found, the new file does not become a new summary — it becomes a merge record in the manifest pointing at the existing summary. The user is told inline.

Why this matters: the same meeting can arrive twice within a run (MCP pull at 10am, manual export at 11am) or across runs (MCP pull last week, manual export today). The manifest must hold both records so the *next* run doesn't re-process either. Dropping the duplicate without a manifest entry would mean a third copy gets processed next time.

---

## END
