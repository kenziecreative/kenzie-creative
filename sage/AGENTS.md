# AGENTS.md — sage

Maintainer/agent guidance for working **on** the Sage plugin. Standalone,
self-contained meeting round-up system. (Current version lives in `plugin.json` and
`CHANGELOG.md`.)

> Not to be confused with `sage/templates/CLAUDE.md`, which is the per-deployment config Sage ships to users. This file is for whoever is editing Sage itself.

## What Sage is

Turns a stream of meeting transcripts into one living weekly round-up: each transcript becomes a structured per-meeting summary, and every summary is folded into `weekly-roundup.md` (action items, cross-meeting threads, forward watch list). Standalone and self-contained — depends on nothing else being installed.

Design sources (kept in `.planning/`): `meeting-cataloging-workflow.md` is the authoritative processing methodology; `sage-PRD.md` is the design rationale and scope.

## Structure

- `commands/sage-setup.md` — interview + scaffolding. Writes the deployment `CLAUDE.md`, materialises `source/` and `meetings/` via Write, creates `manifest.json`, merges `.claude/settings.json`, and points the user at `/schedule`.
- `commands/sage-run.md` — thin wrapper that invokes the skill; identical operation to the scheduled task.
- `skills/meeting-triage/SKILL.md` — the service-agnostic pipeline: ingest from MCP → sweep `source/` → process per transcript → integrate round-up → cleanup discipline. Branches on `meeting_mcp:` and loads the matching adapter; the body never names a service.
- `skills/meeting-triage/references/` — `summary-template.md`, `roundup-template.md`, `cleanup-discipline.md`, and `adapters/{read-ai,fireflies,granola,_custom}.md`.
- `templates/CLAUDE.md` — the per-deployment config users create.

## Configuration

Read from the deployment `CLAUDE.md` at the start of every run. Required: `timezone` (the only thing that halts a run if missing). Optional: `meeting_mcp` (`read-ai`/`fireflies`/`granola`/`custom`/blank), the `custom_mcp` block, `cadence`, `no_em_dashes`, `paths`, `dictation_corrections`.

> Open idea (deferred): move machine config to a dedicated `sage.config.json` for consistency. If pursued, read JSON-if-present and fall back to `CLAUDE.md`, so existing live deployments don't break — and update the schedule prompt to point at whichever file holds config.

## Ingestion model

`source/` is the universal floor — drop any `.txt`, zero config. On top, an optional MCP auto-populator pulls new transcripts into `source/` on each scheduled run. A service qualifies for auto-pull only if its MCP can **enumerate-since deterministically** and **fetch by ID**. Named adapters: Granola, Read.ai, Fireflies; `_custom` is config-mapped (supports nested date args, `iso8601-utc-z` date floors, and oversized-transcript chunk/fallback). Otter and Google Meet are manual `source/` drops. One scheduled run does pull + sweep + process; the manifest (keyed on stable IDs or SHA-256) makes it idempotent; cross-source dedup (date ±1d + attendee overlap ≥50% + title similarity ≥0.7) collapses the same meeting from two sources into one summary.

## Adding a named adapter

A named adapter (`granola.md`, `read-ai.md`, …) is just a pre-filled, quirk-documented version of the `_custom` block: it lets a user pick the service by name in setup instead of hand-mapping tools, and ships the service's gotchas as defaults. Best authored by an agent with **live access** to the tool — it can probe the real tool schemas rather than guess. Workflow: (1) the live agent drafts `<service>.md` matching the structure of an existing adapter; (2) a maintainer drops it into `references/adapters/`, registers it in the SKILL's "READ THESE FIRST" adapter list, adds the service as an option in `sage-setup.md` step 3 (with its `.claude/settings.json` allowlist entry), and bumps the version. Quill is the first such contribution (from a live deployment).

## Locked decisions

- Cadence default 2h; the recommended schedule is every 2h, 7am–5pm, Mon–Fri.
- Numbering is assigned at **processing** time (auto-pulled transcripts arrive out of order).
- Calendar attendee-enrichment is **out of v1** — attendees come from the source or are flagged, never inferred.
- Scheduling via `/schedule`; the user registers their own task.
- **The scheduled-task prompt MUST carry the absolute deployment path.** The task runs from its own directory, not the project, so a bare "this project" leaves the run unable to find config and it halts every time. This was the v0.2.0 blocker fix (`sage-setup.md` step 11) — keep it. Setup also verifies config persisted before finishing, for the same reason.

## Surface split (testing)

- **Claude Code verifies:** marketplace install, `${CLAUDE_PLUGIN_ROOT}` resolution, `.claude/settings.json` pre-allow, MCP read tools resolving, manifest dedup, the scheduled task firing under `/schedule`.
- **Cowork verifies:** setup runs with no shell/permission friction, the round-up reads cleanly, and the register passes the read-aloud test (no real names, confident present tense).

## Out of scope (v2 ideas — don't build without a decision)

More adapters, an HTML round-up, `/contract` integration, a memory layer.

## Maintaining this plugin

- **Release:** follow **Release & versioning** in the root `AGENTS.md`. Bump `version` in
  `plugin.json`, update the `v<X.Y.Z> — ` prefix in both descriptions (`plugin.json` + the
  catalog entry in `.claude-plugin/marketplace.json`), the README "Plugins at a glance" row,
  and the root `AGENTS.md` plugin list; add a `CHANGELOG.md` entry; then
  `node dev/scripts/check-version-prefix.mjs` and `claude plugin validate ./sage` +
  `claude plugin validate .`; commit, tag **`sage-v<X.Y.Z>`**, push.
- **Authoring check (optional):** run plugin-dev's `skill-reviewer` over changed skills and
  `plugin-validator` over the plugin to catch frontmatter/description regressions.
- **Editing cautions specific to this plugin:**
  - One skill carries the whole pipeline (`skills/meeting-triage/SKILL.md`) and the body
    **never names a service** — service specifics live in `references/adapters/`. Change
    pipeline behaviour in the SKILL; change a service's quirks in its adapter.
  - **Adding a named adapter** is a fixed workflow: a live-access agent drafts
    `references/adapters/<service>.md`, then a maintainer registers it in the SKILL's "READ
    THESE FIRST" list, adds the option (with its `.claude/settings.json` allowlist) to
    `sage-setup.md` step 3, and bumps the version. See "Adding a named adapter" above.
  - **Ingestion is manifest-gated and idempotent** — `source/` is the universal floor, MCP
    auto-pull rides on top, and cross-source dedup collapses the same meeting from two
    sources. Don't loosen the dedup rule or write the manifest mid-run.
  - **The scheduled-task prompt MUST carry the absolute deployment path** (`sage-setup.md`
    step 11). The task runs from its own directory, so a bare "this project" halts every
    run. This was the v0.2.0 blocker fix — keep it, and keep setup's config-persisted
    verification.
- See **Locked decisions** above before changing the cadence default, the numbering-at-
  processing-time rule, the attendee-enrichment exclusion, or the scheduling model.
