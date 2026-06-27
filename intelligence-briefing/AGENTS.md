# AGENTS.md — intelligence-briefing

Maintainer/agent guidance for working **on** the Intelligence Briefing plugin. Triage-stream plugin; self-contained. (Current version lives in `plugin.json` and `CHANGELOG.md`.)

> Not to be confused with `intelligence-briefing/templates/CLAUDE.md`, which is the per-deployment config users create.

## What it is

A daily/weekly environmental brief: scans the outside world, filters against a deployment's **relevance context**, weighs survivors against an evidence bar, and renders the few that clear it as a self-contained HTML page — reporting only what *changed* since the last run (a ledger tracks what's already been said). A short brief on a quiet day is correct behaviour, not a failure.

## Structure

- `skills/environmental-briefing/SKILL.md` — the briefing logic (gather → filter → classify → evidence bar → lead → synthesis → verify).
- `skills/environmental-briefing/references/html-brief.md` — how to render the HTML brief.
- `commands/intel-setup.md`, `commands/brief.md`.
- `assets/brief.css` — the default brand-neutral stylesheet (system fonts).
- `templates/CLAUDE.md` — per-deployment config; the one input that matters is the relevance context (plus evidence bar, zones, cadence, output format/theme).

## Key points

- **Self-contained HTML brief** by default (`briefs/YYYY-MM-DD.html`, inlining `assets/brief.css`); `format: markdown` produces a plain brief. The brief's *content* is identical across formats — only presentation differs.
- **Cowork-safe rendering** is mandatory here: system fonts, no JavaScript, no content-hiding entrance animations, flat design. See the root `AGENTS.md`.
- **Brand-neutral plugin; branding per deployment.** A deployment applies its own brand by pointing `theme` at a local CSS override (e.g. the Hello Alice theme lives in its deployment, not in this plugin).
- **Tooling discipline:** uses built-in `WebSearch`/`WebFetch` only — never a required MCP or CLI — and scans **inline** (no subagents; they start from a stripped permission set and can't reach the web). All file ops via Read/Write/Edit, never shell.
- **Permissions:** web search + file ops only. Setup writes a `.claude/settings.json` pre-allow on Claude Code (inert in Cowork, which uses its own model).
- Can contribute `act`/`track`/lead items to the `/contract` shared queue when a deployment opts in. (The earlier "suite mode" / in-plugin `shared/` contract is superseded by the deployment-level `/contract` convention — see root `AGENTS.md`.)

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
  - **Cowork-safe HTML is mandatory.** The brief renders as a self-contained styled page:
    system fonts only, no JavaScript, no content-hiding entrance animations, flat design.
    These are hard rules (see `references/html-brief.md` and the root `AGENTS.md`), not
    aesthetic preferences — don't relax them.
  - **Tooling stays inline and built-in.** Scanning uses `WebSearch`/`WebFetch` only, run in
    this session — never a required MCP or CLI, and never delegated to a subagent (subagents
    start from a stripped permission set and can't reach the web). All file ops via
    Read/Write/Edit, never shell.
  - **Brand-neutral plugin; branding per deployment.** Keep the plugin's default stylesheet
    brand-neutral; a deployment applies its own brand by pointing `theme` at a local CSS
    override, not by editing this plugin.
  - **The ledger reports motion, not repetition.** It's the mechanism behind "report motion,
    not state" — the NOVELTY TEST matches against it by stable id so a story returns only when
    it genuinely advances. It belongs to the deployment directory (shared `/contract` state);
    this brief reads and writes only its own `source: "environmental"` rows.
