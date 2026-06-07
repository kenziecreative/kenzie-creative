# Changelog

All notable changes to the `intelligence-briefing` plugin are documented here. This project follows [Keep a Changelog](https://keepachangelog.com/) and [Semantic Versioning](https://semver.org/).

## [Unreleased]

Planned producers and consumer on the shared candidate-item contract:

- Meeting triage (producer) — extract explicit/implicit tasks and patterns from meeting transcripts.
- Comms triage (producer) — surface items from email and chat, cross-checked against meeting candidates to avoid duplication.
- Triage review (consumer) — present the candidate queue for accept/reject and write accepted items to a backlog.
- Source-directory triage (producer) — triage drops other projects push into the shared inbox.

## [0.1.3] — 2026-06-06

### Fixed

- The briefing skill now names the built-in `WebSearch` (and `WebFetch`) as its baseline scan tools and runs the scan inline. Previously it said only "scan channels," so a host session could reach for an uninstalled search MCP or fan the scan out to subagents that lack web access — producing a multi-option permission wall. Subagent delegation for scanning is now explicitly disallowed.
- Declared `allowed-tools` on the skill and commands (`Read, Write, Edit, WebSearch, WebFetch`) so the tool dependency is explicit.

### Added

- `/intel-setup` now writes a project `.claude/settings.json` that pre-allows only the brief's own tools (`WebSearch, WebFetch, Read, Write, Edit`), so Claude Code users aren't prompted on every run. Merges into an existing file rather than overwriting. (No effect in Cowork, which doesn't use this file.)
- `/intel-setup` runs a pre-flight web-search capability check before the test brief, surfacing a single clear approval message instead of letting the run fail partway.

### Removed

- Dropped the redundant `metadata.version` from `marketplace.json` so the plugin's `version` is the single source of truth for updates.

## [0.1.2] — 2026-06-06

### Fixed

- `/intel-setup` now asks specific, predefined questions instead of improvising. The relevance context is gathered as open free-text in the user's own words (no role/persona menus), and the command explicitly forbids inferring the user's role, employer, or clients from the surrounding environment. Multiple-choice is reserved for genuinely discrete fields (evidence bar, timezone).
- Removed specific company/product names from shared-doc examples so nothing implies the plugin is scoped to a particular organization (generic placeholders only).

## [0.1.1] — 2026-06-06

### Changed

- Kept maintainer-only content out of user-facing surfaces: trimmed the repo README and plugin README to user content (install, usage, tuning), and moved the release loop, push/validate steps, and architecture-for-builders detail into a git-ignored `maintainer-notes.md`.
- Repo README install section now documents both Claude Cowork (GUI) and Claude Code (CLI) paths.

### Verified

- Full functional test pass: first-run brief, ledger novelty/cadence suppression on a second run, quiet-day handling, and suite-mode candidate-queue emission all confirmed against the candidate-item contract.

## [0.1.0] — 2026-06-06

Initial release.

### Added

- `environmental-briefing` skill — the external-world scan. Produces a triaged daily brief (news, industry, research, policy, science) keyed to a per-deployment relevance context, with epistemic typing, a configurable evidence bar, a ledger for "report motion, not state," and a hard verification pass.
- Shared spine for the wider suite: `shared/candidate-item-contract.md` (the schema every producer emits and the review step consumes), `shared/dedup-and-state.md` (the two-store model), and `shared/source-directory.md` (cross-project inbox convention).
- Optional, non-breaking suite-integration step in the briefing skill: when a candidate queue is configured, the brief contributes its actionable findings to the shared queue.
- `/intel-setup` command — interviews the user and writes the per-project `CLAUDE.md` config, creates `briefs/` and the ledger.
- `/brief` command — runs the brief on demand.
- `templates/CLAUDE.md` — the per-deployment configuration template, including a suite-mode switch.
- `CONNECTORS.md` — tool-agnostic connector categories for current and planned components.
