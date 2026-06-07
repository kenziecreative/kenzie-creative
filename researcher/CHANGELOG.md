# Changelog

Notable changes to the Researcher plugin. As of v1.3.0 it ships from the Kenzie Creative marketplace as `researcher`; prior versions shipped as a standalone clone-and-use repo named `research-agent`. This changelog starts at v1.3.0 (the first marketplace release); pre-marketplace milestones lived in the source repo's planning artifacts rather than a published changelog.

## [1.3.1] — 2026-06-07

### Fixed

- `/research:init` now explicitly instructs the model to present Question 1's 11 research types (and Question 3's 6 audience examples) as plain text in the reply, not via `AskUserQuestion`. `AskUserQuestion` caps at 4 options and was silently truncating the list — making 7 of the 11 research types unreachable through the picker. This is a quick fix; Question 1's broader UX (e.g., leading with "describe what you're trying to research" instead of presenting the full type list up front) is on the v1.4 init-rework agenda.

## [1.3.0] — 2026-06-07

### Changed

- **First Kenzie Creative marketplace release.** Migrated from a clone-and-use repo (`github.com/kenziecreative/research-agent`) to a plugin (`researcher@kenzie-creative`). Logic and knowledge base now ship from the plugin and update in place; per-project state continues to live under `${CLAUDE_PROJECT_DIR}/research/` exactly as before. One install, many projects, in-flight updates.
- Internal reference paths repointed from `.claude/reference/...` to `${CLAUDE_PLUGIN_ROOT}/reference/...`. Read-only knowledge base lives in the installed plugin; per-project state stays project-local.

### Carried forward from v1.3 (pre-marketplace)

- **CLI-first tool architecture.** 3-tier CLI fallback chain (Tavily CLI → Firecrawl CLI → built-in WebSearch/WebFetch). CLIs return structured JSON; local PDFs go through `pdftotext`. Works out of the box with zero CLIs installed.
- **Claim graph.** Every factual claim is a node with edges to source notes and canonical figures. Figure revisions trace downstream drift.
- **Academic expansion.** Discovery now queries Crossref and Unpaywall alongside OpenAlex.
- **Web search diversity.** Exa neural search runs parallel to Tavily; results deduplicated.
- **Per-claim confidence.** Each claim gets its own confidence tier; section confidence equals the weakest claim.
- **Retrieval provenance.** Every discovery call is logged with query, channel, and URLs returned.
- **CLI polish.** All commands use consistent formatting, clear next-action guidance, plain language, and progressive disclosure.

### Known limitations in v1.3.0 (resolved in v1.4)

- `/research:init` retains some clone-rooted directory assumptions from the pre-marketplace era. Users may need to pre-create `research/` and `source-material/` in a fresh project. Fixed in v1.4.
- Hard hook gate to block unaudited writes to `research/outputs/` is not yet bundled — the gate is enforced by structural workflow rules only. v1.4 adds the hook backstop for Claude Code.
- Cowork is not yet a supported runtime; init's plan-generation step still relies on a subagent that requires Claude Code. v1.4 makes plan-gen inline-first and adds Cowork support.
- The clone→plugin migration path for existing users is documented in v1.4.
