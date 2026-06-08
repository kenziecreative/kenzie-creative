# Changelog

Notable changes to the Researcher plugin. As of v1.3.0 it ships from the Kenzie Creative marketplace as `researcher`; prior versions shipped as a standalone clone-and-use repo named `research-agent`. This changelog starts at v1.3.0 (the first marketplace release); pre-marketplace milestones lived in the source repo's planning artifacts rather than a published changelog.

## [1.4.1] — 2026-06-08

A structural fix so the plugin works in Cowork as well as Claude Code. The eleven `/research:*` entry points were previously authored as skills living under `commands/research/<name>/SKILL.md`. Claude Code (which also surfaces skills) found them; Cowork (which discovers commands from flat `commands/*.md` files) found nothing, so no slash commands appeared. v1.4.1 splits each entry point into a model-invokable skill plus a slash-command wrapper, matching the pattern used by `sage` and `intelligence-briefing`.

### Changed

- **`commands/research/<name>/SKILL.md` moved to `skills/research-<name>/SKILL.md`.** Each skill's frontmatter `name` was rewritten from the bare verb (e.g. `init`) to the prefixed form (e.g. `research-init`), so they surface as `researcher:research-init`, `researcher:research-discover`, and so on. Skill bodies are unchanged. `research-init` retains its `disable-model-invocation: true` flag (it's destructive); the other ten remain auto-invokable.
- **New `commands/research/<name>.md` wrappers.** Eleven thin slash-command wrappers, one per skill, that delegate to the matching skill. Pattern matches `sage/commands/sage-run.md`. `/research:init`, `/research:discover`, `/research:process-source`, `/research:phase-insight`, `/research:check-gaps`, `/research:cross-ref`, `/research:start-phase`, `/research:progress`, `/research:summarize-section`, `/research:audit-claims`, `/research:graph-analysis` now resolve as real commands in both Cowork and Claude Code.

### Fixed

- **Slash commands now appear in Cowork.** Previously, none of the `/research:*` commands showed up in Cowork because no `commands/*.md` files existed — the directory contained skill bundles instead.

## [1.4.0] — 2026-06-07

Four behavioral rewrites that close out assumptions still living in v1.3.x. v1.4 makes init work in any fresh folder, adds a hook backstop on the audit gate, surfaces per-phase discovery quality, and runs plan generation in the main agent's context.

### Added

- **PreToolUse hook gate on `research/outputs/`.** A new `hooks/gate-outputs.sh` script blocks Write/Edit/MultiEdit operations targeting the output directory unless `/research:audit-claims` has appended a `pass` row to `research/audits/gate-log.md` within the last 120 seconds and the row's file path matches the write target. Claude Code only; the hook is inert in Cowork (the structural workflow rule remains).
- **PreCompact staleness check.** A new `hooks/state-staleness-check.sh` script warns to stderr when `research/STATE.md` is more than 5 minutes older than the most recent file in `research/notes/` or `research/drafts/`. Never blocks compaction.
- **Per-entry `tier` field in `research/reference/retrieval-log.json`.** Records which discovery tier (1 = Tavily, 2 = Firecrawl, 3 = built-in) actually returned results for each channel-tool execution. Complementary to the existing `degraded_to` field, which records the fallback chain.
- **Tier-3 banner in candidate files.** `/research:discover` prepends a warning banner above the Summary table when every entry in a run fell back to built-in WebSearch/WebFetch.
- **`## Phase Tier Record` table in `research/STATE.md`.** `/research:start-phase` writes (or updates) a row per phase showing the highest discovery tier that returned results for that phase. `/research:progress` surfaces the table verbatim.
- **`research/outputs/.gate-policy.md`** — a human-readable note about the gate, written by `/research:init` at scaffold time.
- **Fresh-project guard in `/research:init`.** A new Step 0 refuses to run when `research/STATE.md` already exists, and tells the user how to start over (`mv research research.old` or `rm -rf research`).

### Changed

- **`/research:init` Step 3 creates the directory tree.** No longer assumes `research/` and `source-material/` already exist from a clone. Init writes a `.gitkeep` into each leaf directory via the Write tool, rooted at `${CLAUDE_PROJECT_DIR}`.
- **`/research:init` Step 3b writes `.claude/settings.json`.** Pre-allows the tools researcher uses (`WebSearch`, `WebFetch`, `Read`, `Write`, `Edit`, `Grep`, `Glob`, `Bash(tvly:*)`, `Bash(npx:*)`, `Bash(ls:*)`, `Bash(mv:*)`). Additive merge — never overwrites an existing config.
- **`/research:init` Step 4 plan generation runs inline.** Default execution moves from a `general-purpose` subagent invocation to the main agent's own context. Subagent delegation is now an opt-in Claude Code optimization. Cowork is fully supported on the default path.
- **`/research:init` Step 5 writes use `${CLAUDE_PROJECT_DIR}/research/...` paths** instead of bare `research/...`, making the skill cwd-independent.
- **`/research:audit-claims` appends a gate-log row before promoting a draft.** The PreToolUse hook reads this row to authorize the write to `outputs/`. The row is the durable audit record of the promotion authorization regardless of which tool performs the move.
- **`/research:progress` glob tightened.** The discovery-strategy check (1e) now looks for `research/discovery/strategy.md` specifically (the canonical path written by `/research:init`), replacing the loose `research/discovery-strategy*.md` OR `research/discovery/*.md` pattern.
- **README "hard gate" language softened.** Now reads "a workflow gate — with a PreToolUse hook backstop on Claude Code — that prevents unaudited content from reaching the output directory." Honest about the Claude-Code-vs-Cowork distinction.

### Fixed

- `/research:init` no longer fails silently in a fresh marketplace-installed project. The clone-rooted Step 3 assumption ("directory structure already exists from the clone") is gone.

### Known limitations (deferred)

- Plugin-defined subagent behavior in Cowork is still unverified. Inline-first plan generation works on both surfaces; whether Cowork honors `subagent_type: "research-integrity"` against the plugin's own agents is a separate question with a dedicated post-v1.4 test.

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
