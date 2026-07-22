# AGENTS.md — blueprint

Maintainer/agent guidance for working **on** the Blueprint plugin. Standalone;
self-contained. (Current version lives in `plugin.json` and `CHANGELOG.md`.)

> A plugin's `templates/CLAUDE.md` is a different thing: it's the per-deployment config
> the plugin ships to *users*, not agent guidance. Don't conflate the two.

## What it is

A process extraction interviewer. It turns how a person actually works into a structured
Process Blueprint that a human, workflow, or AI agent could execute against — with explicit
per-step autonomy ratings (Automate / Monitor / Human) marking where automation is safe and
where a human must stay in the loop. "Correct" output is a Blueprint whose steps carry
intent and observable success criteria, whose judgment calls have explicit criteria, and
whose gaps are flagged in Open Questions rather than filled with invented detail. The target
is not "document the task" but "model the work as a system."

## Structure

- `commands/blueprint/` — one thin command wrapper: `capture` (`/blueprint:capture`).
- `skills/blueprint-capture/SKILL.md` — the interview engine (both modes).
- `reference/` — read-only library: `blueprint-template.md` (the output structure),
  `example-blog-content-blueprint.md` (a worked example that sets the specificity bar),
  and a `README.md` index.
- `templates/CLAUDE.md` — optional per-deployment config (`blueprints_dir`).

## Key mechanics

- **One skill, two modes.** Quick (~15 min) covers purpose, trigger, coarse step sequence,
  outputs, and first-cut autonomy ratings; uncaptured sections are marked "Not captured —
  quick mode," never silently omitted. Deep (~45-60 min) covers the full eight-area
  interview backbone (the eighth — timing, risk, and upkeep — feeds the autonomy ratings).
- **The interview rules are the product.** Small question batches (2-4, then stop); anchor
  in the operator's most recent real run, not the idealized flow; capture the reason for
  each step, not just the action; separate mechanical from judgment work and must-happen
  from expert shortcut; demand observable success evidence; flag unknowns instead of
  inventing.
- **Autonomy ratings are the automation bridge.** Every step gets Automate / Monitor /
  Human. The placement question — "if this step were done wrong with no review, what would
  happen?" — decides where checkpoints go. Checkpoints are deliberately sparse: review
  everywhere creates reviewer fatigue.
- **Doctrine lives once.** The output structure lives in `reference/blueprint-template.md`
  and the specificity bar in the worked example; the skill points at both and never copies
  their content inline.
- **State.** Blueprints are plain Markdown written to `blueprints/` in the deployment (or
  `blueprints_dir` from the deployment `CLAUDE.md`). No ledger/candidates participation —
  this is a standalone system, not a triage-stream.

## Surface differences (Claude Code vs Cowork)

None. The skill uses Read/Write/Edit/Glob/Grep only — no hooks, no shell, no subagents —
so behavior is identical on both surfaces.

## Maintaining this plugin

- **Release:** follow **Release & versioning** in the root `AGENTS.md`. Bump `version` in
  `plugin.json`, update the `v<X.Y.Z> — ` prefix in both descriptions (`plugin.json` + the
  catalog entry in `.claude-plugin/marketplace.json`), the README "Plugins at a glance" row,
  and the root `AGENTS.md` plugin list; add a `CHANGELOG.md` entry; then
  `node dev/scripts/check-version-prefix.mjs` and `claude plugin validate ./blueprint` +
  `claude plugin validate .`; commit, tag **`blueprint-v<X.Y.Z>`**, push.
- **Authoring check (optional):** run plugin-dev's `skill-reviewer` over changed skills and
  `plugin-validator` over the plugin to catch frontmatter/description regressions.
- **Editing cautions specific to this plugin:**
  - **The autonomy vocabulary is locked:** Automate / Monitor / Human, with the
    "done wrong with no review" placement question. Don't rename the ratings or add levels
    without a decision — downstream Blueprints and training material reference them.
  - **Never let the skill fill gaps.** The flag-unknowns-don't-invent rule is what makes a
    Blueprint trustworthy as an automation spec. Any edit that softens it into "make a
    reasonable assumption" breaks the product.
  - **Keep the interview conversational.** Small batches, anchored in a real run. Don't
    collapse the interview into a form the user fills in — that regenerates exactly the
    idealized-process documentation the plugin exists to avoid.
  - **The machinery stays backstage, in both channels.** Eval iteration-1 scored Register
    1.9/3 — the worst dimension in the suite — on leaks like "per the skill's rule,"
    "the full field set," "out of turns for this round," and, worse, "the timing/risk/upkeep
    interview area" written into a delivered Blueprint. Two rules guard this now (the
    interview rule, and the Step 4 clause forbidding the document from narrating the
    interview). When adding operator-facing copy anywhere in the skill, phrase it as what the
    operator gets, never as which part of the structure it covers — the old Step 1 wording
    ("the full field set") is what taught the model to say it aloud.
  - **Template changes are additive.** Existing Blueprints in user deployments must remain
    valid; don't remove or rename template sections.
