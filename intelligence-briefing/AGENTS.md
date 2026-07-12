# AGENTS.md — intelligence-briefing

Maintainer/agent guidance for working **on** the Intelligence Briefing plugin. Triage-stream plugin; self-contained. (Current version lives in `plugin.json` and `CHANGELOG.md`.)

> Not to be confused with `intelligence-briefing/templates/CLAUDE.md`, which is the per-deployment config users create.

## What it is

A daily brief that is the readout from a **persistent intelligence system**, not a one-morning scan. A rotation-driven scan collects against a zones × domain-cells coverage matrix and accumulates state in the deployment (`intel/`): observations with verbatim evidence captured at gather time, threads (story identity), signposts (tripwires it comes back and checks), and drivers (forces with an append-only confidence log). The brief reads that state and reports what *moved* — with a mandatory collection-health line so a quiet world and a blind scan can never look the same. A review conversation is where the user corrects the picture (misses, noise, driver judgments) — the only surface that can learn what the system missed.

Grounding for the 1.0.0 architecture: `dev/rebuild/intelligence-briefing-v1-build-spec.md` (repo root, not shipped) and the 1.0.0 CHANGELOG entry.

## Structure

- `skills/environmental-scan/SKILL.md` — collection: the rotation (due cells → due signposts → driver falsifiers), observation capture with `captured_evidence`, thread matching, signpost resolution, driver reassessment (standing + cause gate), run records. Output is state, never a document.
- `skills/environmental-briefing/SKILL.md` — presentation: movements not articles, the mandatory collection-health line, the evidence bar, re-derivation verification, the reckoning, the output contract.
- `skills/environmental-briefing/references/html-brief.md` — how to render the HTML brief.
- `skills/intelligence-review/SKILL.md` — the conversation: questions, misses, noise, driver confirm/kill, relevance corrections; sole writer of `feedback.json`.
- `commands/intel-setup.md` (interview → config + state files), `commands/brief.md` (chains scan → brief), `commands/intel-export.md` (drivers → Strategic Foresight format).
- `assets/brief.css` — the default brand-neutral stylesheet (system fonts).
- `templates/CLAUDE.md` — per-deployment config; the one input that matters is the relevance context.

## Key points

- **The run is not the system.** State lives in the deployment under `intel/` (observations sharded by month and never pruned; append-only `confidence_log`, `runs.json`, `feedback.json`; threads and drivers never deleted, only dormant/retired). Do not reintroduce mechanics that make the brief depend on its own prior drafts — verification re-derives from `captured_evidence`.
- **Silence must be attributable.** The collection-health line renders on every brief with no code path that omits it; a quiet day is only claimable when every due cell completed, else "assessment degraded." Don't weaken this to a config option.
- **The action-gate rule is worded identically in three places** — the briefing skill's EVIDENCE BAR, its VERIFICATION step 6, and `templates/CLAUDE.md`. If you edit it, edit all three to the same words; the 0.3.0 review's only architecture-independent bug was these drifting apart.
- **Self-contained HTML brief** by default (`briefs/YYYY-MM-DD.html`, inlining `assets/brief.css`; a same-date rerun writes `-02`, never overwrites); `format: markdown` produces the plain brief. Content identical across formats.
- **Cowork-safe rendering** is mandatory: system fonts, no JavaScript, no content-hiding entrance animations, flat design (no drop shadows, no colored edge bars). See the root `AGENTS.md`.
- **Brand-neutral plugin; branding per deployment** via `theme` pointing at a local CSS override.
- **Tooling discipline:** built-in `WebSearch`/`WebFetch` only — never a required MCP or CLI — and collection runs **inline** (never delegated to a subagent; subagents start from a stripped permission set and can't reach the web). All file ops via Read/Write/Edit, never shell. *Scope note for maintainers:* the no-subagent lock's stated rationale binds **collection**; analysis over JSON already on disk is outside its rationale. The 1.0.0 design still uses no subagents anywhere — re-derivation from captured evidence made a verifier subagent unnecessary — but the lock reads narrower than it has historically been read.
- **Deliberately not built** (product decisions, not gaps — reasoning in the build spec §11): estimates/probabilities, a separate weekly product, an I&W subsystem, calibration math (feedback records are captured from day one; the math waits), numeric driver scores, a driver status board, a verifier subagent, an intake wizard.
- **Permissions:** web search + file ops only. Setup writes a `.claude/settings.json` pre-allow on Claude Code (inert in Cowork).
- Contributes `act`/`track`/lead items to the `/contract` shared queue (`ledger.json`, `source: "environmental"`); the ledger is shared state only — the observation store is the memory. Its 30-day prune must never touch `intel/`.

## Maintaining this plugin

- **Release:** follow **Release & versioning** in the root `AGENTS.md`. Bump `version` in
  `plugin.json`, update the `v<X.Y.Z> — ` prefix in both descriptions (`plugin.json` + the
  catalog entry in `.claude-plugin/marketplace.json`), the README "Plugins at a glance" row,
  and the root `AGENTS.md` plugin list; add a `CHANGELOG.md` entry; then
  `node dev/scripts/check-version-prefix.mjs` and `claude plugin validate ./intelligence-briefing` +
  `claude plugin validate .`; commit, tag **`intelligence-briefing-v<X.Y.Z>`**, push.
- **Authoring check (optional):** run plugin-dev's `skill-reviewer` over changed skills and
  `plugin-validator` over the plugin to catch frontmatter/description regressions.
- **Editing cautions specific to this plugin:**
  - **State schemas are load-bearing.** The scan skill is the writer of record for
    `intel/*`; the briefing and review skills and `/intel-setup` carry compatible summaries.
    If a schema changes, update every surface that states it, and never add a pruning rule to
    observations, threads, or drivers.
  - **Prescriptive on purpose.** The runtime target is Opus-class with realistic variance
    *downward* (Sonnet, scheduled Cowork runs). Hard gates, numbered steps, and explicit rules
    are what stop a weaker model from skipping the coverage check or padding a thin day. Do
    not de-prescribe the skills.
  - **Cowork-safe HTML is mandatory** (see Key points). Hard rules, not preferences.
  - **`captured_evidence` is internal.** The no-block-quotes rule governs the emitted brief;
    the store remembers what sources actually said. Keep that seam stated in the skills.
  - **Zone → STEEP mapping lives only in `/intel-export`.** The daily runtime never computes
    STEEP; drivers carry `steep_primary: null` until export. Don't "fix" that.
