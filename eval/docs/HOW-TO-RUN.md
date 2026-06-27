# How to run plugin-eval

End to end, no terminal required.

## One-time setup per project

1. Open a **scratch project directory** (not a real strategy project — the eval writes its
   own `.eval/` workspace and isolated run dirs).
2. Run `/plugin-eval:init`. It will:
   - pick the target pack (defaults to `strategist` since it's the only one shipped),
   - ask where the target plugin lives if it can't auto-resolve it (point it at your
     installed strategist plugin, or the strategist directory in the marketplace repo),
   - scaffold `.eval/` and validate the pack.

## Running the suite

- `/plugin-eval:run` — runs the **golden** set (the invariants) and writes a scorecard.
- `/plugin-eval:run --scope all` — also runs the representative scenarios.
- `/plugin-eval:run --scope adversarial` — only the adversarial goldens.
- `/plugin-eval:run --id adv-soft-answers-define` — a single scenario, e.g. while
  debugging one behavior.

Each run writes to `.eval/`:

- `.eval/runs/<stamp>/<scenario-id>/` — the captured transcript, the strategist artifacts
  (`strategy/brief.md`, `strategy/STATE.md`), and the gate results for that scenario.
- `.eval/reports/scorecard-<stamp>.md` — the per-scenario scorecards plus the aggregate.

## Reading the scorecard

- **Pass-rate by kind** — representative vs. adversarial. A failing **golden** (adversarial)
  is a ship-blocker; that behavior regressed.
- **Mean by dimension** — where the plugin is strong and weak across the suite.
- **Filing split** — gate failures (structure, fabrication) are reproducible and
  file-eligible; judgment misses (Concreteness at 2, Pushback at 1) are surfaced for you to
  decide whether they're real or rubric calibration.

## The regression loop

1. Change a strategist skill (e.g. tune the pushback discipline in `strategist-stage`).
2. `/plugin-eval:run`.
3. Compare the new scorecard to the last — did the dimension you touched move, and did
   anything else regress?

That's the whole point: you no longer need a full live project to know whether a change
helped or hurt.

## Adding scenarios

Give Claude the prompt in `reference/generate-scenarios.md` along with the strategist pack
files. It outputs new JSONL lines to append to `targets/strategist/scenarios.jsonl`. Add a
`golden` only for a genuinely load-bearing invariant.
