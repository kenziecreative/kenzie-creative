# Target pack specification

The engine is plugin-agnostic. Everything specific to *what* is being evaluated lives in a
**target pack** under `targets/<name>/`. To evaluate a new plugin, write a pack; the engine
doesn't change.

A pack is four files:

```
targets/<name>/
  adapter.md        how to drive the target and where its output lands
  principles.md     what "good output" means for this target (short, consensus)
  rubric.md         principles operationalized as 0–3 dimensions + thresholds
  scenarios.jsonl   representative + adversarial cases (goldens = invariants)
```

## adapter.md

The bridge between the generic engine and one target plugin. It tells the runner how to
drive the plugin and tells the judge where to look. It must specify:

- **Invocation** — which command/skill the runner executes for each scenario (e.g.
  `/strategist:init` then `/strategist:<stage>`), and how a scenario names the entry point.
- **User-turn protocol** — how the runner feeds the scripted `user_messages` to the plugin
  (one per assistant reply, in order) and when a scenario is "done."
- **Working dir** — the isolated scratch path per run (e.g.
  `.eval/runs/<run-stamp>/<scenario-id>/`) so runs never touch a real project.
- **Artifacts** — the files the plugin writes that the judge should read (e.g.
  `strategy/brief.md`, `strategy/STATE.md`), relative to the working dir.
- **Deterministic gates** — the checkable invariants, each with a name, how to check it,
  and which rubric dimension it feeds. Examples: "STATE.md has valid frontmatter with
  `current_stage`"; "every framework named appears in the target's library INDEX";
  "exactly one stage advanced this run."
- **Plugin location** — where the target's skill files are read from
  (`${target_plugin_root}`), so the runner can load the real skills under test.

## principles.md

The short, consensus statement of what good output from this target means — the yardstick.
Keep it to the handful of load-bearing principles whose violation has actually been
observed or designed against, not an aspirational list. Each principle should map to one or
more rubric dimensions.

## rubric.md

Each principle operationalized as a dimension scored 0–3, with concrete anchors at each
level. Include:

- The dimension table (0/1/2/3 anchors per dimension).
- Which dimensions are **deterministic** (inherited from adapter gates) vs **judged**.
- **Pass/fail thresholds** — typically: representative scenarios pass if every dimension
  ≥ 2 and the critical dimensions = 3; adversarial scenarios pass only if every dimension
  named in the scenario's `critical_dimensions` = 3.
- **Aggregate** reporting: mean per dimension, pass-rate overall and per scenario kind.

## scenarios.jsonl

One JSON object per line. Required fields:

```json
{
  "id": "kebab-id",
  "kind": "representative | adversarial",
  "golden": true,
  "entry": "<adapter-defined entry point, e.g. 'define' or 'pressure-test'>",
  "tags": ["..."],
  "setup": { "...": "optional pre-state the runner should establish (e.g. a prior brief)" },
  "user_messages": [ { "role": "user", "content": "..." }, "..." ],
  "expected_behavior": {
    "must_include": ["traits the output must have"],
    "must_not_include": ["traits that are an automatic miss"],
    "must_not_do": ["banned actions, e.g. invent a framework, fabricate a figure"],
    "critical_dimensions": ["dimension keys that must score 3 to pass"]
  }
}
```

Adversarial scenarios encode the bad-user behavior in `user_messages` (the soft answer, the
preference-over-evidence push, the planted contradiction, the fabricate-data request) and
name the dimensions that must hold in `critical_dimensions`.

Add scenarios with the meta-prompt in `reference/generate-scenarios.md`.
