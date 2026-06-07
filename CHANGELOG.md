# Changelog

Notable changes to the `intelligence-briefing` plugin. Follows [Keep a Changelog](https://keepachangelog.com/) and [Semantic Versioning](https://semver.org/). (The marketplace it ships in was renamed to `kenzie-creative` as of 0.3.0; companion plugins — meeting triage, comms triage, review — are now separate plugins in that marketplace, not future releases of this one.)

## [Unreleased]

Planned as separate Kenzie Creative plugins, each conforming to the directory convention in `/contract`: meeting triage, comms triage, triage review, source-directory triage.

## [0.3.0] — 2026-06-07

### Changed

- **Refocused to the external scan only.** Removed the suite scaffolding so the plugin does one thing well: the environmental brief. Dropped the optional SUITE INTEGRATION step and the candidate-queue config from the skill, the Suite-mode section from the config template, and `CONNECTORS.md` (the external scan needs no connectors).
- **Shared state is now a directory convention, not in-plugin scaffolding.** The candidate-item / dedup / source-directory docs moved out of the plugin to the marketplace repo's `/contract`. The `ledger.json` is documented as directory-owned shared state with `source`-tagged rows; this brief reads/writes only its `source: "environmental"` rows, so a shared ledger works whether or not other plugins are installed. Legacy untagged ledger entries are treated as environmental (backward compatible).

### Notes

- Marketplace renamed `intelligence-brief` → `kenzie-creative`. Re-add the marketplace and reinstall: `intelligence-briefing@kenzie-creative`.

## [0.2.0] — 2026-06-07

### Added

- **Styled HTML briefs.** The brief now renders as a self-contained HTML file (`YYYY-MM-DD.html`) by default — clean bordered cards on white, scannable lead/scan/synthesis layout, openable anywhere with no external dependencies. The design ships as `assets/brief.css` (system fonts, brand-neutral, no CDN), inlined into every brief; the skill fills it via a Write-only render step (no shell), following `skills/environmental-briefing/references/html-brief.md`.
- **Output format + theme config.** New `Output` section in CLAUDE.md: `format` (`html` default, or `markdown` for the plain brief) and `theme` (`default`, or a path to a CSS override file supplying brand tokens). Same content and structure either way — only presentation changes.

### Notes

- The brief's content pipeline (gather → filter → classify → evidence bar → lead → synthesis → verify) is unchanged; the OUTPUT CONTRACT remains the canonical content spec and is now rendered into HTML or written as Markdown per `format`.
- Theming is brand-neutral by design: the public plugin ships only the default theme. A deployment supplies its own brand by pointing `theme` at a local CSS file, keeping the distributed plugin tool- and brand-agnostic.

## [0.1.5] — 2026-06-07

### Fixed

- The skill and `/intel-setup` now do all file operations with `Read`/`Write`/`Edit` only and never shell out (`ls`, `cat`, `mkdir`, `pwd`) to inspect or create files — removing needless Bash permission prompts. Existence checks are done by reading and handling the result; folders are made by writing a file into the path.

### Added

- `/intel-setup` opens with a one-line expectations note: it will create a few files, and choosing an "allow for this project/session" option once (if the client offers it) covers all of setup's writes instead of prompting per file. Worded to be harmless in Cowork, which may not prompt at all.
- Documentation refresh: the marketplace README gives concrete install and update steps for both Cowork (GUI) and Claude Code (CLI), including the catalog-refresh sequence and a clean-reinstall fallback for stale caches; the plugin README documents the web-search requirement, the pre-flight check, the project `.claude/settings.json` setup writes, and first-run approval behavior.

### Changed

- Added `.claude/settings.local.json` to `.gitignore` so local Claude Code permission state isn't committed to the distributed repo.

> Note: an unreleased 0.1.4 (docs-only) was folded into this release rather than tagged separately.

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
