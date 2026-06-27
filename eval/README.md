# plugin-eval

**An evaluation harness for plugins that produce AI-generated output, by [Kenzie Creative](https://www.kenzienotes.com).**

Part of the Kenzie Creative marketplace. Standalone.

plugin-eval tests **what a plugin actually produces** when someone uses it — not its
source, not the model underneath. It drives a target plugin natively (no browser, because
these plugins already live in the chat surface), captures what it produces, and scores it
against a rubric of representative and adversarial scenarios. Change a skill, re-run the
suite, see what moved — without standing up a full live project each time.

## Why I built this

The plugins in this marketplace produce judgment, not deterministic output, and the only
way I had to test a change was to run a whole project by hand and eyeball it. That doesn't
scale, and it misses regressions. I wanted what software teams have — a suite you re-run
after every change — but for AI behavior: graded, not asserted.

— **Kelsey**

## How it works

Two subagents give the eval the isolation a browser-based tester gets for free:

1. **The runner** executes the target plugin's real skills against a scenario's scripted
   user turns, in an isolated scratch dir, and captures the transcript + artifacts. It's
   **blind to the rubric** — it can't teach to the test.
2. **The judge** scores the captured run against the target's rubric — inheriting the
   deterministic gates, judging the rest.

The run skill orchestrates both and writes a timestamped scorecard. Deterministic gate
failures are file-eligible; judgment-dimension misses are surfaced for a human to decide —
"install posture, don't script judgment."

## Two commands

```
/plugin-eval:init     # pick a target pack, locate the target plugin, scaffold .eval/
/plugin-eval:run      # drive each scenario → grade → timestamped scorecard
```

`init` runs once per project. `run` is the regression command — run it after any change to
the target plugin's skills, and on a cadence to catch drift.

## Targets

The engine is plugin-agnostic. Each target ships a **pack** under `targets/<name>/`:
`adapter.md` (how to drive it), `principles.md` (what good means), `rubric.md` (0–3
dimensions + thresholds), `scenarios.jsonl` (representative + adversarial goldens). Adding a
target is writing a pack; the engine doesn't change.

Shipped in v0.1.0: **strategist** — 11 scenarios (4 representative, 7 adversarial goldens)
covering framework fit, concreteness, the facilitation pushback discipline,
no-fabrication (invented frameworks and made-up data), state integrity, loop hygiene, and
the pressure-test critic (both catching a planted cross-stage contradiction and staying
quiet on sound reasoning).

## Getting started

1. Install: `/plugin marketplace add kenziecreative/kenzie-creative`, then
   `/plugin install plugin-eval@kenzie-creative`.
2. In a scratch project directory, run `/plugin-eval:init` (defaults to the strategist
   target; point it at your strategist plugin when asked).
3. Run `/plugin-eval:run`. The scorecard lands in `.eval/reports/`.

New to it? [`docs/HOW-TO-RUN.md`](docs/HOW-TO-RUN.md) is the end-to-end guide.

## What's in the box

```
plugin-eval/
├── commands/plugin-eval/   init, run
├── skills/                 eval-init, eval-run
├── agents/                 eval-runner (blind SUT), eval-judge (grader)
├── reference/              harness-principles, target-pack-spec, grade-procedure, generate-scenarios
├── targets/strategist/     adapter, principles, rubric, scenarios.jsonl
└── docs/HOW-TO-RUN.md
```

## Limits, honestly

An LLM judge needs calibration and a scripted user only approximates a real one. The value
is *sensitivity to change* — re-run after an edit and see what moved — not a certificate of
correctness. Treat a dimension scoring 2 as a signal, not a red build.
