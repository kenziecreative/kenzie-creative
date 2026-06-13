# Sage — Product Requirements Document

**Plugin name:** `sage`
**Marketplace:** `kenzie-creative`
**Shape:** Standalone system (self-contained; no cross-plugin dependencies)
**Status:** PRD — not yet built. This document is the spec Claude Code builds from.

Sage turns a stream of meeting transcripts into a working management artifact: each transcript becomes a structured summary, and every summary is folded into a single living weekly round-up that surfaces action items, tracks threads that span meetings, and keeps a forward watch list. It is the automated, packaged form of the process documented in [`meeting-cataloging-workflow.md`](./meeting-cataloging-workflow.md), which remains the authoritative specification for *how transcripts are processed and how the round-up is maintained*. This PRD specifies the plugin around that workflow — chiefly how transcripts get in, how the plugin is configured, and how it is packaged and built.

---

## Guiding principle

Sage works best when it operates independently, the same way the environmental scan (`intelligence-briefing`) does. It does one job — meeting triage — owns its own files, and depends on nothing else being installed. Anything that looks like an integration with another plugin (a shared candidate queue, comms de-duplication, a review step) is deliberately **out of scope**. If those integrations ever matter, they become a later variant of Sage rather than complexity carried now. Planning for integrations that don't exist yet is the thing to avoid.

The same restraint applies inside Sage: it ships the smallest thing that delivers the round-up, with no speculative structure.

---

## Build model

This mirrors how the Research agent was handled (see `research-agent-HANDOFF.md`). The plugin must work in **both Claude Code and Cowork**, so the surface-specific mechanics are owned by the tool that can actually see them.

- **Claude Code — executor.** Owns the build: expands this PRD into a phased build plan (extended-thinking pass), writes the code, resolves all Claude-Code-specific mechanics (scheduled-task wiring, `${CLAUDE_PLUGIN_ROOT}` resolution, permission pre-allow via project `settings.json`, plugin/marketplace manifest entries), tests the Claude Code surface, and owns all git in the marketplace repo.
- **Cowork — reviewer + spec owner.** Owns judgment and the user-facing layer: reviews the build plan before code moves, reviews diffs against intent, tests the Cowork surface (scheduled run with no permission-prompt friction, the round-up rendering cleanly, ingestion from a connected MCP), and owns the adopter-facing register (README, marketplace description, setup copy).

**First step for Claude Code:** expand this PRD into a phased build plan with verification gates and return it to Cowork for review before executing.

---

## The workflow (locked, five stages)

The processing detail for stages 2–5 lives in `meeting-cataloging-workflow.md`. Below is the shape, with the deltas that automation introduces called out. There is **no note-file / written-exchange handling and no memory layer in v1** (see Out of Scope).

### Stage 1 — Scheduled ingestion

There is one trigger: a **scheduled check that runs every ~2 hours** (configurable cadence). It is not event-driven — nothing watches the folder. Each run does the whole ingestion pass:

1. If a meeting MCP is configured, pull any new transcripts from it and write each into `/source` as a file.
2. Sweep `/source` for transcripts dropped there by any other means.
3. Process everything the manifest shows as not-yet-processed.

`/source` is the single point of convergence, so there is exactly one processing path regardless of how a transcript arrived. There is no staging inbox — the scheduled run processes directly. See **Ingestion architecture** below for detail.

### Stage 2 — Per-transcript processing

For each unprocessed transcript: save the raw text as `NN-<slug>-transcript.txt` with light cleanup only (fix known dictation errors, preserve speaker labels where present, never invent detail); enrich attendees (from the source if it provided them, else by matching the meeting to a calendar event by date/title and pulling the attendee list there; where neither resolves, flag rather than guess); then write `NN-<slug>-summary.md` in the fixed structure — Headlines, Major Decisions, Action Items by Owner, Blockers & Decisions Needed, Cross-Meeting Threads, Notable Quotes. Full structure and cleanup discipline: see the workflow doc.

### Stage 3 — Filing conventions

Artifacts land in `meetings/YYYY-MM-DD/`, where the date is that week's **Monday**. Numbering is **cumulative across the week** and — the one automation change — **assigned at processing time, not arrival time**, because auto-pulled transcripts arrive out of order. Existing files are never moved.

### Stage 4 — Weekly round-up

`weekly-roundup.md` is one living document per week, updated after every meeting. Sections: Meetings index by day, Companion Documents (linked, not duplicated), Action Items for the user (Closed / Open this week / Out next week), Things the User Should Know (FYI, grouped by topic), Cross-Meeting Threads (table whose status column updates as threads recur), Themes & Patterns, and a time-bucketed Forward Watch List. After each summary, three integrations fire: add to the index, update action items, update or append threads. Full spec: workflow doc.

### Stage 5 — Cleanup discipline

Items close as they resolve (struck through, kept for visibility). A "status checks needed" bucket surfaces things Sage can't confirm without asking rather than assuming completion. End-of-day sweeps re-bucket the Forward Watch List around real deadlines. Full spec: workflow doc.

---

## Ingestion architecture (the new design)

This is the part not covered by the workflow doc and the core of what v1 adds.

### `/source` is the floor

Any transcript dropped into the `/source` directory of the deployment is processed. This path requires **zero configuration** and works for every user regardless of which meeting service they use — it covers Google Meet (export the transcript), Otter (export), and anything a user saves by hand. Sage is fully functional with `/source` alone.

### Optional MCP auto-populator

On top of the floor, a user may name **one meeting MCP** they have connected, and Sage will pull from it automatically on each scheduled run, landing new transcripts into `/source`. 

A service qualifies for auto-pull only if its MCP can do two things deterministically: **enumerate what's new since the last check**, and **return a transcript by ID**. 

- **Granola is the v1 reference adapter** and clears the bar: `list_meetings` returns meeting ID, title, date, and attendees; `get_meeting_transcript` returns the raw transcript by ID. The run lists recent meetings, diffs IDs against the manifest, and fetches the new ones. (Note plan/scope limits: Granola free tier is last-30-days and has no transcript fetch; MCP sees only the user's "My notes" private space, not team-space folders. Surface these in setup.)
- **Otter does not qualify** — its MCP is search/fetch-shaped with no deterministic enumerate-since. Otter is a manual `/source` drop.

The qualification rule is the criterion for adding adapters later; v1 ships the Granola adapter plus the universal `/source` path. Do not build speculative adapters.

### One scheduled run, one path

The MCP pull and the `/source` sweep are not two pipelines — the pull's only job is to land files into `/source`, after which everything follows the same processing path. The scheduled run (every ~2h) is the only moving part. Every-2-hours is deliberately chosen over anything real-time, because transcripts lag the end of a meeting while the service finishes generating them.

### Manifest and de-duplication

Sage maintains a small **manifest** of what it has already processed, keyed on **stable per-source IDs** (Granola meeting IDs; for `/source` drops, a content hash or filename). The manifest is what makes the ~2h re-poll idempotent — nothing is processed twice.

Separately, if the **same meeting** arrives from two sources (e.g. an auto-pulled Granola transcript and a manually dropped export of the same call), Sage collapses them into **one summary**, matched on date + time window + attendee overlap + title similarity — not two.

### The thin envelope

When a transcript is landed, it carries only what the source reliably knows: `source` (service), `meeting_title`, `date`, `ingested_at`. Attendees are **not** part of the envelope unless the source provides them for free (Granola via MCP does). Everything richer is enrichment in Stage 2 (calendar match), and where enrichment can't resolve, Sage flags rather than invents — consistent with the workflow doc's "no invented details" rule.

---

## Configuration & setup

A setup command (e.g. `/sage-setup`, run in the deployment folder) establishes:

- The deployment directory (where `meetings/`, `/source`, `weekly-roundup.md`, and the manifest live).
- **One branch:** "Do you have a meeting MCP you want Sage to auto-pull from? If yes, name it (Granola in v1) and confirm it's connected. If no, you'll drop transcripts into `/source` yourself." Default is source-only.
- The scheduled run (~2h cadence; cadence configurable).
- In Claude Code, writes a project `.claude/settings.json` pre-allowing the tools the scheduled run needs (the configured MCP's read tools, plus Read/Write/Edit and calendar read), so the run doesn't hit permission prompts. (Inert in Cowork; Cowork handles its own approvals.)

Setup should follow the friction rules learned on `intelligence-briefing`: file operations via Read/Write/Edit, never shell (`mkdir`/`ls`), so scaffolding doesn't trigger Bash prompts.

---

## Output format

v1 round-up and summaries are **Markdown** (matching the workflow doc). A styled self-contained HTML render of the round-up — as `intelligence-briefing` does for the brief — is a possible later enhancement and is **out of scope for v1**.

---

## Out of scope for v1 (explicit)

- **Any cross-plugin integration** — no shared candidate queue, no `/contract` convention participation, no comms de-duplication, no review-step handoff. Action items live in the round-up only.
- **Note files / written-exchange (e.g. Slack) handling** — transcripts only. The note convention returns if/when something targets it.
- **A memory layer** — no convention exists yet for durable cross-session judgment in a scheduled plugin; v1 does not carry one. Durable judgment stays with the user and the round-up. May be designed later.
- **Per-connector plugin variants** (the old `meeting-triage-granola` / `-read` idea) — superseded by the `/source` + single-adapter design. Sage is one plugin.
- **HTML render** of the round-up.
- **Speculative MCP adapters** beyond Granola.

---

## Claude Code specifics to resolve (executor owns)

- **Scheduled-run wiring on each surface.** How the ~2h check is registered differs between Claude Code and Cowork. Claude Code owns reconciling this so the same plugin schedules cleanly on both (mirrors how the Research agent let Claude Code own hook delivery).
- **`${CLAUDE_PLUGIN_ROOT}`** resolution for any plugin-bundled reference files; keep deployment state (`meetings/`, `/source`, manifest, round-up) **project-relative**, not plugin-relative.
- **Permission pre-allow** via project `.claude/settings.json` (manifests can't grant permissions; Claude Code only, inert in Cowork).
- **Manifest storage** — a single JSON in the deployment dir; create-if-absent via Write, never shell.
- **Packaging** — `.claude-plugin/plugin.json` (version = source of truth), new entry in `marketplace.json`, per-plugin `README.md` and `CHANGELOG.md`.
- **Git** — all git from Claude Code / a real terminal (the Cowork sandbox can't run git on the mounted folder). Stage by path; never stage `.claude/` or local-only planning files.

---

## Open questions

- **Calendar source for enrichment.** Stage 2 attendee enrichment assumes a calendar the plugin can read. Confirm which calendar connector the deployment uses and that read access is available on both surfaces; otherwise enrichment degrades to "source-provided attendees only, flag the rest."
- **Cadence default.** ~2h is the working assumption; confirm before shipping.
- **Manifest dedup key for `/source` drops.** Content hash vs filename — Claude Code to choose during build; note the trade-off (hash survives renames, filename is simpler).

---

## Addendum (2026-06-07) — resolved before build

These decisions were made during the build-plan session; the plan at `~/.claude/plans/logical-soaring-grove.md` is the source of truth where it disagrees with the body above.

- **Calendar enrichment is OUT for v1.** The original requirement was a phantom carry-over; attendees come from the source MCP (all three v1 adapters provide them) or get flagged in the summary.
- **Cadence: every 2 hours**, confirmed.
- **Manifest dedup key for `source/` drops: SHA-256 content hash**, confirmed.
- **v1 adapters: Read.ai, Fireflies, Granola** — three, not one. The body's "Granola is the v1 reference adapter" framing was an artifact of this PRD being drafted by a session whose context happened to be a Granola-captured meeting. The actual decision is the **qualification rule** (enumerate-since + fetch-by-ID); three services clear it and have been verified against current docs. Granola free tier is disqualified at runtime (transcript fetch is paid-only); Granola MCP only sees the user's "My notes" private space, not team folders; Read.ai is in beta with OAuth migration pending. Setup picks among the three with "Other (custom MCP)" and "None — source-only" alternatives. The skill is service-agnostic and branches on `meeting_mcp:` in the deployment `CLAUDE.md`.
- **Plugin name:** `sage`, confirmed.
- **Scheduling primitive:** `/schedule` (CronCreate-backed, same on both surfaces). `/loop` is in-session-only and not the right primitive for this.
