# AGENTS.md — intelligence-briefing

Maintainer/agent guidance for working **on** the Intelligence Briefing plugin. Current version: **0.3.0**. Triage-stream plugin; self-contained.

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
