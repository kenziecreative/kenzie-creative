# AGENTS.md — plugin-eval

Maintainer/agent guidance for working **on** the plugin-eval plugin. Standalone evaluation
harness for AI-output plugins. (Current version lives in `plugin.json` and `CHANGELOG.md`.)

## What it is

Tests what a target plugin actually produces, natively (no browser — the targets already
run in the chat surface). A blind **runner** subagent executes the target's real skills
against scripted scenario turns in an isolated dir; a separate **judge** subagent scores the
capture against the target's rubric. The run skill orchestrates and writes a timestamped
scorecard. Two-layer scoring: deterministic gates inherited, judgment dimensions graded.

## Structure

- `commands/plugin-eval/` — `init`, `run` wrappers.
- `skills/eval-init` — scaffold `.eval/`, pick a target pack, locate the target plugin.
- `skills/eval-run` — the loop: runner per scenario → judge per capture → scorecard.
- `agents/eval-runner.md` — blind, isolated executor of the target (the "clean room").
- `agents/eval-judge.md` — rubric grader; inherits gates, judges the rest.
- `reference/` — `harness-principles.md`, `target-pack-spec.md`, `grade-procedure.md`,
  `generate-scenarios.md` (all plugin-agnostic).
- `targets/<name>/` — per-target packs (`adapter.md`, `principles.md`, `rubric.md`,
  `scenarios.jsonl`). `strategist` ships in v0.1.0.

## Key mechanics

- **Isolation is the whole trick.** Browser evals get a clean tab; we get a fresh subagent.
  The runner must be blind to the rubric, and must execute the target's skills **literally**
  — never compensating for a missing instruction, or it hides the bug the eval exists to
  catch. This is stated hard in `eval-runner.md`; don't soften it.
- **Inherit vs. judge.** Gates (structure, framework-in-library, single-stage-advance) are
  deterministic and inherited; quality dimensions are judged. The adapter defines a target's
  gates; the rubric marks each dimension's source.
- **Driver model (v1):** the runner reads and executes the target's skill *files* (path
  resolved at init). This tests skills-as-written — exactly what regression needs. A future
  mode could invoke the installed slash commands for full command→skill fidelity; noted, not
  built.
- **Scripted users, not reactive.** Deterministic and reproducible; adversarial behavior is
  baked into `user_messages`. Reactive user-sim is a v2 upgrade.
- **Goldens are invariants.** Default suite = `golden: true` (mostly the adversarial set).

## Adding a target

Write a pack under `targets/<name>/` per `reference/target-pack-spec.md`. No engine change.
The pack's `adapter.md` is the only place that knows how the target is driven and where its
artifacts and gates are.

## Surface differences (Claude Code vs Cowork)

- The run skill spawns subagents via the Task tool (Claude Code); in Cowork the equivalent
  Agent tool is used. Setup is Write-only (Cowork-safe). No hooks ship in v0.1.0.

## Maintaining this plugin

- **Release:** follow **Release & versioning** in the root `AGENTS.md`. Bump `version` in
  `plugin.json`, update the `v<X.Y.Z> — ` prefix in both descriptions (`plugin.json` + the
  catalog entry in `.claude-plugin/marketplace.json`), the README "Plugins at a glance" row,
  and the root `AGENTS.md` plugin list; add a `CHANGELOG.md` entry; then
  `node dev/scripts/check-version-prefix.mjs` and `claude plugin validate ./plugin-eval` +
  `claude plugin validate .`; commit, tag **`plugin-eval-v<X.Y.Z>`**, push.
- **Authoring check (optional):** run plugin-dev's `skill-reviewer` over changed skills and
  `plugin-validator` over the plugin to catch frontmatter/description regressions.
- **Editing cautions specific to this plugin:**
  - **Adding a target is a pack, not an engine change** — write a pack under
    `targets/<name>/` per `reference/target-pack-spec.md` (`adapter.md`, `principles.md`,
    `rubric.md`, `scenarios.jsonl`). The `adapter.md` is the only place that knows how a
    target is driven and where its artifacts and gates live; the run skill stays generic.
  - **Keep the runner/judge split clean.** The blind `eval-runner` executes the target's
    skills *literally* and never sees the rubric; the `eval-judge` scores the capture and
    never re-runs the plugin. If the runner starts compensating for a missing instruction,
    it hides the exact bug the eval exists to catch — don't soften that rule.
  - **Two-layer scoring: gates inherited, judgment graded.** Deterministic gates (structure,
    framework-in-library, single-stage-advance) are inherited from the runner; quality
    dimensions are judged against the rubric. The adapter defines a target's gates; the
    rubric marks each dimension's source.
  - **`expected_no_advance` is a real flag.** A scenario can assert the plugin *should not*
    advance (e.g. an adversarial soft-answer turn); it inverts the `single_stage_advance` and
    `brief_section_filled` gates. Don't treat non-advancement as a failure for those
    scenarios — see `targets/strategist/adapter.md`.
- **Planned move:** plugin-eval is slated to become an internal `eval/` utility rather than a
  published marketplace plugin. For now it's conformed and registered like the others; a
  future maintainer doing that move should expect to de-register it from the catalog then.
- See **Adding a target** above before adding a pack, and keep the runner blind and the
  judge non-re-running — those two invariants are what make a green score mean something.
