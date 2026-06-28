# AGENTS.md — goal-setting

Maintainer/agent guidance for working **on** the Goal Setting plugin. Standalone,
self-contained business goal-setting system. (Current version lives in `plugin.json` and
`CHANGELOG.md`.)

> A plugin's `templates/CLAUDE.md` is a different thing: it's the per-deployment config
> the plugin ships to *users*, not agent guidance. Don't conflate the two.

## What it is

Turns Claude Code / Cowork into a goal-setting chief-of-staff for a small-business owner. It
runs one canonical methodology in two arcs: a **Setup Arc** (six stages — Orient → Horizons →
Anchors → Goals → Systems → Pre-mortem) that constructs goals from scratch, and an **Ongoing
Arc** (five cadences — daily, weekly pulse, monthly, quarterly, annual) that operates against
them. The method draws on OKRs, the Three Time Horizons, the Four Laws of Behavior Change, and
the pre-mortem, sequenced with hard constraints — the load-bearing one being **never more than
three active goals.** The point is *working the method honestly under its constraints*, not
producing a filled-in template. "Correct" output is a goal a critic can't tear apart and a
system with a real trigger, not encouragement.

## Structure

- `commands/goal-setting/` — 15 thin command wrappers: `init`, the 6 Setup stages (`orient`,
  `horizons`, `anchors`, `goals`, `systems`, `premortem`), the 5 Ongoing cadences (`daily`,
  `pulse`, `monthly`, `quarterly`, `annual`), `restart`, `pressure-test`, `progress`.
- `skills/` — 7 skills: `goal-setting-init` (scaffold), `goal-setting-setup-stage` (the
  generic engine all 6 Setup stage commands drive), `goal-setting-pulse` (daily + weekly,
  parameterized by `cadence`), `goal-setting-review` (monthly + quarterly + annual,
  parameterized by `cadence`), `goal-setting-restart` (Restart Protocol),
  `goal-setting-pressure-test` (dispatches the critic), `goal-setting-progress` (read-only
  dashboard).
- `agents/goal-setting-critic.md` — the goal-formulation critic subagent (no web, no Write;
  tests logic and methodology fidelity, not evidence).
- `reference/` — read-only library: the canonical `playbook.md`, `three-tyrants.md`,
  `schemas.md` (the object model), `anchor-areas/` (one chapter per area + README), and
  `stages/` (one file per Setup stage + README), plus `INDEX.md` and `README.md`.
- `hooks/` — one PreCompact staleness check. No outputs gate.
- `templates/CLAUDE.md` — the per-deployment config `/goal-setting:init` installs into the
  user's project root.

## Key mechanics

- **Two arcs, one state directory.** The user's deployment keeps state in `goals/`:
  `STATE.md` (loop position, mode, cadence calendar, flags), `vision.md` (Direction +
  HorizonSet), `active.md` (Objectives + KRs + Systems + Mitigations), `scorecard.md` (Anchor
  scores + history), `journal.md` (append-only cadence log). All Markdown with consistent
  headers — human-readable, parseable, resumable across sessions.
- **One engine, six Setup stages.** The 6 Setup stage commands all invoke
  `goal-setting-setup-stage` with a different `stage` arg; the skill reads the matching
  `reference/stages/<n>-<stage>.md` to drive the work and enforce that stage's constraints.
  Adding/renaming a stage = a command wrapper + a `reference/stages/` file; no new skill.
- **Two parameterized Ongoing skills.** Per the locked decision: `goal-setting-pulse` covers
  the two high-frequency cadences (daily, weekly), `goal-setting-review` covers the three
  periodic reviews (monthly, quarterly, annual). The `templates/CLAUDE.md` makes the
  mode-switch between arcs explicit because users must understand it.
- **The three-goal rule is the wedge — enforced everywhere.** Max 3 active Anchor Areas
  (`anchors`, `quarterly`), max 3 active Objectives (`goals`, `quarterly`), one Objective per
  active Anchor Area (`goals`), one System per Anchor Area at setup (`systems`), one system at
  a time on restart (`restart`). See the Constraint enforcement table in
  `dev/goal-setting/build-spec.md`. Any skill that touches Objectives/Anchors/Systems must
  refuse the fourth, not warn.
- **Posture: rigorous chief-of-staff, not motivational coach.** Two halves that pull apart: a
  **friction half** (push on vague Objectives, KRs that measure activity not outcome, systems
  with no trigger — reference the Stage 1 diagnostic tests by name) and a **lane half** (stay
  inside the user's domain; don't invent business facts; don't second-guess decisions that are
  theirs — which anchor to prioritize, what target to set). This is borrowed structurally from
  the strategist stage engine's advisor posture. Don't dilute it into encouragement.
- **The critic tests formulation, not the goals' correctness.** It red-teams whether goals are
  well-*formed* and methodology-faithful (vagueness, KR drift, hope-systems, incomplete
  mitigations, anchor mismatch, cross-stage contradiction). It never judges whether the chosen
  goal is the *right* business call — that's the user's. Its highest-value find is a
  cross-stage contradiction (Horizon 3 vision vs. this quarter's Objective). Mirrors
  `strategist-critic`'s restraint — the "What Is Not A Finding" discipline is load-bearing.

## Surface differences (Claude Code vs Cowork)

- The PreCompact staleness hook and the `.claude/settings.json` pre-allow
  (`goal-setting-init` Step 4) are Claude Code only; in Cowork both are no-ops and the method
  holds structurally.
- `goal-setting-init` creates all files with the Write tool (no shell), so setup is
  Cowork-safe.
- No outputs gate exists on either surface — the plugin makes no source-rigor claim, so
  there's nothing to gate.

## Locked decisions

(From the spec session — see `dev/goal-setting/build-spec.md` → "Locked decisions". Don't
re-litigate; build to them.)

- **Name/namespace:** plugin `goal-setting`, commands `/goal-setting:*`.
- **One engine** drives all six Setup stages, parameterized by stage (mirrors strategist).
- **Two Ongoing skills:** one high-frequency (`pulse` = daily + weekly), one periodic
  (`review` = monthly + quarterly + annual).
- **Critic in v1:** included (`/goal-setting:pressure-test` + `goal-setting-critic`). It
  stress-tests goal *formulations*, not evidence.
- **State format:** Markdown, mirroring strategist's STATE.md/brief.md pattern.
- **Restart Protocol in v1:** a first-class command.
- **Out of v1:** calendar/Slack/Jira/Notion integrations, dashboards beyond the text
  `progress` command, multi-user/team orchestration, a custom MCP server, and a
  personal-goals variant (an architectural fork for a future project).

## Maintaining this plugin

- **Release:** follow **Release & versioning** in the root `AGENTS.md`. Bump `version` in
  `plugin.json`, update the `v<X.Y.Z> — ` prefix in both descriptions (`plugin.json` + the
  catalog entry in `.claude-plugin/marketplace.json`), the README "Plugins at a glance" row,
  and the root `AGENTS.md` plugin list; add a `CHANGELOG.md` entry; then
  `node dev/scripts/check-version-prefix.mjs` and `claude plugin validate ./goal-setting` +
  `claude plugin validate .`; commit, tag **`goal-setting-v<X.Y.Z>`**, push.
- **Authoring check (optional):** run plugin-dev's `skill-reviewer` over changed skills and
  `plugin-validator` over the plugin to catch frontmatter/description regressions.
- **Editing cautions specific to this plugin:**
  - The 6 Setup stage commands all drive the single `goal-setting-setup-stage` engine —
    change posture or constraint enforcement **there**, not per stage.
  - **The three-goal rule is non-negotiable.** It's the product's wedge. Every skill that
    touches Objectives, Anchor Areas, or Systems enforces it; don't let it slip into a warning.
  - The critic mirrors `strategist-critic` — small, restrained, logic-not-evidence. Don't
    expand its scope; its "What Is Not A Finding" section is what keeps its alarms credible.
  - `reference/playbook.md`, `reference/anchor-areas/`, and `reference/three-tyrants.md` are
    the canonical user-facing versions (migrated out of `dev/goal-setting/`); don't maintain
    parallel copies in `dev/`.
