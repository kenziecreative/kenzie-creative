# Changelog

Notable changes to the Researcher plugin. As of v1.3.0 it ships from the Kenzie Creative marketplace as `researcher`; prior versions shipped as a standalone clone-and-use repo named `research-agent`. This changelog starts at v1.3.0 (the first marketplace release); pre-marketplace milestones lived in the source repo's planning artifacts rather than a published changelog.

## [1.5.0] — 2026-07-12

The convergence release: delivery-integrity, record-never-restrict, and honesty fixes from the 2026-07 blind review (9/9 findings citation-verified) and the convergence re-audit, plus the researcher eval target pack. Every behavioral change in this release is **SHIPPED-UNTESTED** per the marketplace's pattern-graduation rule — encoded from verified findings, not yet exercised in a live research project.

**What this release deliberately does NOT include, said honestly:** the plugin's two biggest open items ship later. The **evidence architecture** (immutable source snapshots, passage locators, note-against-snapshot verification — the blind review's Critical finding that the audit chain stops at AI-authored notes) is commissioned as its own design session (Decision B1) and lands in a future release; nothing here pretends to fix it, and the marketing copy has been softened accordingly (Decision C1: "audits every claim back to its source note — and every note to a declared source"). The **turn-level posture & register port** (Decision D1) is drafted and parked in the owner's review queue pending voice review — not shipped here.

### Added

- **Deliverable manifest — phases close against the whole contract** (blind F4). `/research:audit-claims` now reads the plan's promised output inventory before any closeout; a passing audit on one file cannot close a phase (or the project) that promised several deliverables. The final-phase branch requires every promised deliverable in `outputs/` with a passing audit.
- **Audience evidence standard enforced at the promotion gate** (blind F2, Decision D2). `/research:init` compiles the audience answer into `research/reference/evidence-standard.md` with enforceable rules; `/research:audit-claims` fails violating claims by default. The only other exit is a named waiver in the user's own words (`waive: <claim> — <rationale>`), recorded in the audit report and gate-log and inserted verbatim into the output's Methodology & Limitations. This deliberately narrows the "do not use confidence tier as a reason to fail" rule: the user's own commissioned standard is now enforced; the tier stays advisory for everything the standard doesn't name.
- **Source-exclusion ledger** (blind F3, contract invariant 11). Every candidate the user explicitly declines — during discovery batch selection, mid-batch, or at an access failure — is recorded with a verbatim reason in `research/discovery/exclusions.md`. `/research:check-gaps` and `/research:cross-ref` read it: excluded candidates appear beside the questions they addressed, and convergence reported on a curated evidence base says so. Record, never restrict — no exclusion is ever contested.
- **Counter-evidence gate valve** (blind F7). The gate now has an honest second exit: a documented adverse search (real queries, channels, dates) plus explicit user acknowledgment satisfies it, writes `research/discovery/negative-searches.md`, and stamps the output "no credible counter-evidence found after documented search." "Named, searched, none found" is a legitimate recorded outcome; manufacturing a challenger remains forbidden.
- **Commissioner-override disclosure downstream** (blind F6). A `user_override=true` contradiction resolution must be visibly labeled in the draft at the finding site and listed in Methodology & Limitations; `/research:audit-claims` fails a draft that presents an overridden resolution as evidence-driven (new high-severity class: Override undisclosed).
- **Methodology & Limitations section required in every draft.** Purposive-sampling disclosure, single-source findings, labeled commissioner overrides, counter-evidence status, and audit-time waivers — the deliverable now carries its own honesty record.
- **Mid-source interruption recovery branch** (blind F8). `process-source` handles the note-exists/registry-row-missing state: backfill the registry from the note, increment counters once with verification, never re-fetch.
- **Independence defaults to unknown** (blind F9). "Origin unclear" sources never count as independent corroboration; shared-wording/shared-figure heuristics demote matching sources to suspected shared-origin clusters at Echo level in `/research:cross-ref`, and `/research:check-gaps` flags questions whose coverage rests on independence-unknown sources.
- **Real-person protection for Person Research + Customer Safari** (Brand Compass 4.2.0 consent-doctrine port, Decision D3). Real specificity, not real identity: non-subject individuals are anonymized in drafts and outputs unless permission is on record; `summarize-section` defaults to anonymize and `audit-claims` fails identity exposure. The fail direction is over-anonymization.
- **Mid-phase session debrief** (Backstage element 6). Contact boundaries mid-phase now capture a Working Read entry to `commonplace.md` (in-flight hypotheses, half-formed reads) before any recommended clear; `start-phase` silently re-adopts them on return.
- **Backstage tasks** (Backstage element 7). `research/reference/backstage-tasks.md` — the agent's private prep queue, written at phase close and by cross-ref's suspected-cluster heuristics, worked through silently by `start-phase`.
- **Researcher eval target pack** (`eval/targets/researcher/` — marketplace-internal, not shipped in the plugin). Adapter, principles, gates, coverage map, and 9 scenarios seeded from the blind review's confirm/refute tests (7 adversarial goldens + 2 representative). Scaffolded from the strategist pack's shape (the goal-setting scaffold was not yet available). Rubric scoring anchors were drafted at a STOP point and **approved by the owner 2026-07-12** — the pack is fully runnable (`/eval-run --target researcher`); its 9 goldens are the regression tripwires for this release's fixes.

### Changed

- **D3 method softenings.** Coverage guide: gaps are acceptable when sources were "not found via the mapped discovery channels" — purposive sampling can never establish "does not exist." Academic discovery: the citation-count floor is a per-run choice with a default (>10 for established topics; dropped in favor of recency for emerging topics), stated per run and recorded in the retrieval log.
- **Marketing copy softened (Decision C1).** plugin.json, the marketplace catalog entry, and both READMEs now promise "audits every claim back to its source note — and every note to a declared source." The stronger claim returns when the B1 evidence architecture ships.
- **`start-phase` declares its real write surface** — frontmatter allowed-tools now includes Edit/Write (it always wrote the Phase Tier Record; it now also checks off backstage tasks).

### Fixed

- **Progress health-check contract mismatch** (re-audit finding; checklist row 2). `/research:progress` checked `.claude/settings.json` for separate Write/Edit hook matchers and STATE.md for YAML frontmatter — neither of which the plugin ships — producing false failures on every real project. The checks now read the deployment that actually exists: the plugin's `hooks.json` (combined `Write|Edit|MultiEdit` matcher), the init-written permissions pre-allow, and STATE.md's real sections (Current Position / Current Phase Cycle).

### Pass-2 re-attack repairs (same release window, pre-publication)

Before this version was tagged or merged, the disclosed external re-attack (pass 2 of the review protocol) graded the repairs: 3 CLOSED, 3 PARTIAL, 2 OPEN. All five actionable verdicts were verified against the files and repaired in the same release — v1.5.0 was never published, so the version stands. Full triage: `dev/blind-reviews/researcher-pass2-2026-07.md`.

- **Unselected candidates are no longer invisible (pass-2 F3, OPEN → repaired).** The exclusion ledger only caught explicit declines; a `top 5` reply stranded adverse candidates with no trace. `check-gaps` now computes a disposition (processed / excluded / unprocessed) for every discovered candidate and surfaces unprocessed counter-suggesting candidates per question; `cross-ref` reads the unselected remainder beside its convergence patterns.
- **`user_override` is now derived, never keyword-triggered (pass-2 F6, OPEN → repaired).** `confirm: side-A` against a side-B assessment previously set no flag, and every disclosure keyed on the flag. Resolution records now carry `suggested_resolution` + `user_resolution` + `rationale`, with `user_override` computed from the fields differing; synthesis and audit compare the fields and treat the boolean as corroborating only.
- **Methodology & Limitations became a structural audit gate (pass-2 shared seam behind F5 and F7, PARTIAL → repaired).** The section was required of the writer but never checked by the audit. `audit-claims` step 5b now fails drafts missing the section, the sampling disclosure, or an adverse-search stamp whose `negative-searches.md` record doesn't exist (new high-severity class: Methodology omission).
- **Saturation is computed over independent origins (pass-2 F9, PARTIAL → repaired).** The confirmatory ratio previously counted raw repeats, letting one file say "Echo — one data point" and "100% confirmatory, evidence converging" about the same sources. Saturation now collapses confirmed and suspected shared-origin clusters, gives unknown-origin repeats no confirmation credit, and reports high-repetition/low-independence as exactly that.
- **Two pass-2 bypass goldens added to the eval pack:** `adv-unselected-invisible` and `adv-confirm-side-override`.

### Deferred (named, with reasons)

- **Evidence architecture (blind F1, Critical)** — commissioned separately (Decision B1); researcher is the reference implementation and its release follows the design session. The permitted precursor (process-source persisting raw extractions) was NOT taken: it is not trivially separable from the current fetch flow, and a half-measure would prejudge B1's snapshot format.
- **D1 register port** — drafted in full (posture doctrine + debrief register check + wiring plan), parked in the review queue for voice review. STOP point honored; nothing shipped.
- **Doctrine-drift lint config** — the shared plugin-configurable lint (`dev/scripts/lint-doctrine-drift.mjs`, strategist builder's deliverable) did not exist when this release shipped; researcher's config (stale phrases, canon pairs, the progress-contract reader/writer check this release's own finding justifies) follows as a patch once the lint lands, per the coordination rule against duplicate builds.
- **Full PRISMA machinery** — deferred by decision (G1); not built.

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
