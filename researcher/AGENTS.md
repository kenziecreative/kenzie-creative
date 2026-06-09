# AGENTS.md — researcher

Maintainer/agent guidance for working **on** the Researcher plugin. Current version: **1.4.1**. Standalone, self-contained research system.

## What it is

Turns Claude Code / Cowork into an audited research partner: a phased plan grounded in preliminary research, then collect → cross-reference → gap-check → synthesize → audit every claim before it reaches `outputs/`. The point is traceability and anti-drift, not summarization — every claim traces to a specific source.

## Structure

- `commands/research/` — 11 command SKILLs: `init`, `discover`, `process-source`, `cross-ref`, `check-gaps`, `summarize-section`, `audit-claims`, `start-phase`, `phase-insight`, `progress`, `graph-analysis`.
- `agents/research-integrity.md` — the integrity-checking subagent (no web dependencies).
- `reference/` — read-only knowledge base: root guides, templates, and per-type discovery playbooks + channel maps (11 research types).
- `hooks/` — Claude Code hooks (the `outputs/` gate and the `PreCompact` save warning).

## Key mechanics

- **Outputs gate.** Nothing reaches `research/outputs/` without passing `/research:audit-claims`. On Claude Code this is a `PreToolUse` hook that blocks Write/Edit/MultiEdit to `outputs/` unless an audit authorized the write within the last 120s (via a row in `research/audits/gate-log.md`). In Cowork, hooks don't run; the gate holds as a structural rule — `audit-claims` is the only skill that writes to `outputs/`.
- **3-tier discovery:** Tavily CLI → Firecrawl CLI → built-in WebSearch/WebFetch. Works with zero CLIs installed (built-ins are the floor). `retrieval-log.json` records the tier per run; a Tier-3 banner appears in candidate files when CLIs were unavailable.
- **Integrity spine:** canonical figures registry (numbers can't drift across phases), a claim graph (claims as nodes with edges to sources/figures), and the integrity agent that runs after every write to catch fabrication, range-narrowing, and qualifier stripping.
- State lives in `STATE.md`; phases are sequential and resumable across sessions.

## Surface differences (Claude Code vs Cowork)

Hooks (the `outputs/` gate and `PreCompact`) and the `.claude/settings.json` pre-allow are Claude Code only; in Cowork the gate holds structurally and the plugin detects the surface automatically. Plan generation in `/research:init` runs inline on both surfaces — subagent delegation is an optional Claude Code optimization, not required.

## v1.4 notes

Init scaffolds `research/` and `source-material/` from scratch (rooted at `${CLAUDE_PROJECT_DIR}`); the `outputs/` hook gate landed as the hard backstop; per-phase discovery tier recording (Tier-3 banner + STATE.md table); inline-first plan generation so Cowork and Claude Code behave the same.
