# AGENTS.md — plugin-eval

Maintainer/agent guidance for working **on** the plugin-eval plugin. Current version:
**0.1.0**. Standalone evaluation harness for AI-output plugins.

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

## Left for the Claude Code / terminal pass

Live-run the suite on Claude Code (subagent spawning + slash-command resolution differ
slightly from Cowork), then bump/commit/tag (`plugin-eval-v0.1.0`) and push. The marketplace
registration is written; the git release is not done.
