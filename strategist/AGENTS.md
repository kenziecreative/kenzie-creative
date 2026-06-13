# AGENTS.md — strategist

Maintainer/agent guidance for working **on** the Strategist plugin. Current version:
**0.1.0**. Standalone, self-contained strategic-thinking system.

> A plugin's `templates/CLAUDE.md` is a different thing: it's the per-deployment config
> the plugin ships to *users*, not agent guidance. Don't conflate the two.

## What it is

Turns Claude Code / Cowork into a strategy thinking-partner: one repeatable loop —
Define → Split → Analyse → Insight → Story → Decide → Act (iterate) — backed by a
70-framework library. Each stage presents its frameworks, recommends and applies the
right one against the user's real problem, and captures the result in a single living
`strategy/brief.md`. A critic subagent pressure-tests the reasoning on request. The point
is *working the steps* and *picking the right tool per step*, not producing a template.

## Structure

- `commands/strategist/` — 11 thin command wrappers: `init`, the 7 stages (`define`,
  `split`, `analyse`, `insight`, `story`, `decide`, `act`), `framework`, `pressure-test`,
  `progress`.
- `skills/` — 5 skills: `strategist-init` (scaffold), `strategist-stage` (the generic
  engine all 7 stage commands drive), `strategist-framework` (single-framework
  apply/explain), `strategist-pressure-test` (dispatches the critic), `strategist-progress`
  (read-only dashboard).
- `agents/strategist-critic.md` — the reasoning-critic subagent (no web, no sources;
  tests logic, not evidence).
- `reference/` — read-only library: 70 framework entries across 7 stage directories, each
  with an embedded diagram, plus per-stage `README.md` indexes and a master `INDEX.md`.
  Frontmatter `name:` is namespaced `strategist:reference/<stage>/<slug>`.
- `hooks/` — one PreCompact staleness check. No outputs gate.
- `templates/CLAUDE.md` — the per-deployment config `/strategist:init` installs into the
  user's project root.

## Key mechanics

- **The loop is the spine.** `strategy/STATE.md` holds loop position (stage record,
  completed/active/pending, open pressure-test findings); `strategy/brief.md` is the
  evolving artefact, one section per stage. Sequential but resumable, and explicitly
  iterative — any stage can send the user back.
- **One engine, seven stages.** The 7 stage commands all invoke `strategist-stage` with a
  different stage; the skill reads the matching `reference/<stage>/` to drive the menu and
  application. Adding or renaming a stage = a command wrapper + a `reference/<stage>/`
  dir; no new skill.
- **Framework application, not recitation.** The stage and framework skills apply the
  chosen framework to the user's specifics using the entry's How-To and Worked Example as
  the concreteness bar. A generic templated output is a failure.
- **The critic tests logic, not evidence.** Deliberately *not* a research-integrity gate —
  no sources, no canonical figures, no audit. Its highest-value find is a contradiction
  between stages.
- **Judgment lives in the facilitation, not only the critic.** The stage engine carries a
  posture (facilitator, not service desk): reject non-answers, redirect preference toward
  what the work supports, and run a per-stage **Pushback Audit** (one genuine challenge
  per stage minimum, higher at Analyse/Decide/Act) before advancing. It calibrates to a
  `## Working Dynamic` block in STATE.md (`pushback_calibration: unknown|low|high`),
  updated as it learns how the user takes pushback, and `init` states the pushback
  contract up front. The critic remains the deeper, on-demand cross-stage pass; the stage
  engine handles live, in-the-moment judgment. (Pattern borrowed from brand-compass's
  Strategic Pushback + Pushback Audit.)

## Surface differences (Claude Code vs Cowork)

- The PreCompact staleness hook and the `.claude/settings.json` pre-allow (`strategist-init`
  Step 4) are Claude Code only; in Cowork both are no-ops and the loop holds structurally.
- `strategist-init` creates all files with the Write tool (no shell), so setup is
  Cowork-safe.
- No outputs gate exists on either surface — Strategist makes no source-rigor claim, so
  there's nothing to gate.

## Locked decisions

- **Name/namespace:** plugin `strategist`, commands `/strategist:*`, library frontmatter
  `strategist:reference/<stage>/<slug>`. (The library was built under an
  `overnight-strategist:` namespace and realigned on import.)
- **Critic in v1:** included (`/strategist:pressure-test` + `strategist-critic`).
- **No evidence layer:** intentionally absent. If a future version wants sourced
  strategy inputs, that's a separate, opt-in concern — don't bolt a research gate onto the
  loop.

## Left for the Claude Code / terminal pass

Per the marketplace build model (Cowork = reviewer/spec owner, Claude Code = executor for
Claude-Code mechanics + git): live-test the PreCompact hook and the settings pre-allow on
Claude Code; then bump/commit/tag (`strategist-v0.1.0`) and push. The marketplace
registration (`marketplace.json`, root README table, root AGENTS list) is written but the
git release is not done.
