---
name: eval-run
description: Run the evaluation loop against a target plugin — drive each scenario through a blind runner, score with the judge, write a timestamped scorecard. Use to "run the eval", "test the plugin", "run the golden set", "check for regressions". Requires /plugin-eval:init first.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task
---

# /plugin-eval:run — Run The Evaluation

The regression command. Drives each scenario through the **eval-runner** (a blind,
isolated execution of the target) and then the **eval-judge** (rubric scoring), and writes
a combined scorecard. Run it after any change to the target plugin's skills.

> **Subagents:** spawn `eval-runner` and `eval-judge` with the Task tool (in Cowork, the
> equivalent Agent tool). One runner then one judge per scenario; scenarios may run in
> parallel when the surface allows it.

## Preconditions (check first, fail fast)

1. `.eval/config.json` exists. If not: "Run `/plugin-eval:init` first." Stop.
2. The `target_plugin_root` in config still exists and contains the adapter's named skill
   files. If not, route the user back to `/plugin-eval:init`.

## Arguments

- `--scope <golden | all | representative | adversarial>` — default `golden`.
- `--id <scenario-id[,id...]>` — run specific scenarios.
- `--target <name>` — override the config default (must have a pack).

NL mapping: "run the eval" / "the full set" → default golden. "adversarial only" →
`--scope adversarial`. "everything including candidates" → `--scope all`. "just <id>" →
`--id <id>`.

## Procedure

Resolve `PROJECT` (where `.eval/` lives) and use absolute paths throughout.

### Step 0 — record the run

`RUN_STAMP` = `date +%Y%m%d-%H%M%S`. Read `.eval/config.json` for the target, the
`target_plugin_root`, and the `pack_root`.

### Step 1 — load the pack and resolve the scenario set

1. Read `<pack_root>/adapter.md`, `principles.md`, `rubric.md`, and `scenarios.jsonl`.
2. Filter scenarios by `--scope` / `--id`:
   - `golden` (default): `golden: true` only.
   - `all`: every scenario.
   - `representative` / `adversarial`: by `kind`.
   - `--id`: the named ids (error on unknown id — surface it and stop).

### Step 2 — run each scenario through the runner (blind)

For each scenario, spawn an **eval-runner** subagent. Pass it: the adapter, the scenario
object, the `target_plugin_root`, and its working dir
`.eval/runs/<RUN_STAMP>/<scenario-id>/`. Pass **only** `entry`, `setup`, and
`user_messages` from the scenario — **never** the rubric or `expected_behavior` (the runner
is blind). The runner writes `capture.md` (transcript + artifacts + gate results) into its
working dir and returns a confirmation.

Independent scenarios can run in parallel (multiple runner Tasks in one batch). Keep each
runner's working dir distinct.

### Step 3 — score each run through the judge

For each completed runner, spawn an **eval-judge** subagent. Pass it: the target's
`rubric.md` and `principles.md`, the full scenario object (now including
`expected_behavior` and `critical_dimensions`), the path to the runner's `capture.md` and
artifacts, and `reference/grade-procedure.md`. The judge returns a per-scenario scorecard.

### Step 4 — write the scorecard

Collect the judge scorecards into `.eval/reports/scorecard-<RUN_STAMP>.md`:

1. Each per-scenario scorecard (verbatim from the judge).
2. The **aggregate** (per `grade-procedure.md`): scenarios graded, pass/fail count, mean
   score by dimension, pass-rate by kind, failing scenarios → top issue, patterns, the
   ranked next-3-to-fix.
3. The **filing split**: file-eligible (deterministic-gate) failures listed separately
   from surface-for-decision (judgment) misses. Do not auto-file anything.

### Step 5 — readout

Print a short summary: scenarios graded, pass/fail, pass-rate by kind, mean-by-dimension
table, the top 3 fixes, and where the artifacts live (`.eval/runs/<RUN_STAMP>/` for the
captures, `.eval/reports/scorecard-<RUN_STAMP>.md` for the scorecard). Flag any
golden-scenario failure prominently — a red golden is a ship-blocker.

## Guardrails

1. The runner is blind. Never pass it the rubric or `expected_behavior`.
2. The judge scores the capture; it does not re-run the plugin.
3. Faithful execution: the runner follows the target's skills as written. If a skill lacks
   an instruction, the run reflects that — that's the regression signal, not a bug to fix
   mid-run.
4. Isolation: every run writes under `.eval/runs/<RUN_STAMP>/`; nothing touches a real
   project or the target plugin.
5. Report honestly. A smooth run that skipped the load-bearing behavior is a fail; say so.

## What this skill does not do

- File issues. The scorecard lists file-eligible failures; filing is a separate human step.
- Modify scenarios or the target. Scenarios live in the pack; edit them there (use
  `reference/generate-scenarios.md`).
