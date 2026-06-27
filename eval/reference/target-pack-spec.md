# Target pack specification

The engine is plugin-agnostic. Everything specific to *what* is being evaluated lives in a
**target pack** under `eval/targets/<name>/`. To evaluate a new plugin, write a pack; the
engine doesn't change. (Scaffold one with the `eval-new-target` skill if present.)

A pack is six files:

```
eval/targets/<name>/
  adapter.md        how to drive the target and where its output lands
  principles.md     what "good output" means for this target (short, consensus)
  rubric.md         principles operationalized as 0–3 dimensions + thresholds
  scenarios.jsonl   representative + adversarial cases (goldens = invariants)
  gates.json        machine-readable deterministic gate + content-lint specs (run-gates.mjs)
  coverage.md       the scenario-class checklist a dev set must cover, mapped to ids
```

## adapter.md

The bridge between the generic engine and one target plugin. It tells the runner how to
drive the plugin and tells the judge where to look. It must specify:

- **Invocation** — which skill the runner executes for each scenario, and how a scenario
  names the entry point (`entry`).
- **User-turn protocol** — how the runner feeds the scripted `user_messages` (one per
  assistant reply, in order) and when a scenario is "done."
- **Plugin location** — the in-repo plugin dir whose real skills the runner loads (resolved
  by the run skill as `<repo>/<name>`; the runner reads them fresh).
- **Working dir** — the per-run capture path the run skill assigns
  (`eval/targets/<name>/_eval/iteration-N/<scenario-id>/`), so runs never touch a real project.
- **Artifacts** — the files the plugin writes that the judge should read (e.g.
  `strategy/brief.md`, `strategy/STATE.md`), relative to the working dir.
- **gate-inputs** — what facts the runner must record in `gate-inputs.json` for the gate
  script (e.g. `claimed_frameworks` extracted from the transcript, the `setup` baseline).
- **Deterministic gates** — a human-readable table of the invariants, each pointing at its
  machine spec in `gates.json` and the rubric dimension it feeds.

## principles.md

The short, consensus statement of what good output from this target means — the yardstick.
Keep it to the handful of load-bearing principles whose violation has actually been observed
or designed against, not an aspirational list. Each maps to one or more rubric dimensions.

## rubric.md

Each principle operationalized as a dimension scored 0–3, with concrete anchors. Include:

- The dimension table (0/1/2/3 anchors per dimension).
- Which dimensions are **gate** (inherited from `run-gates.mjs`) vs **judge** vs **gate+judge**.
- **`noisy_dimensions`** — the judge-graded dimensions that vary run to run (posture, critic
  acuity, etc.). A scenario whose `critical_dimensions` touch these is multi-sampled (3×) and
  reported as a spread. See `iteration-discipline.md`.
- **Pass/fail thresholds** — typically: representative passes if every applicable dimension
  ≥ 2 and the critical dimensions = 3; adversarial passes only if every `critical_dimensions`
  entry = 3. A **`severity: blocker`** scenario that fails any `must_have` fails the suite
  regardless of total.
- **Aggregate** reporting: mean per dimension, pass-rate overall and per kind.

## gates.json

The machine spec `eval/lib/run-gates.mjs` reads. `{ "target", "gates": [...], "content_lint": [...] }`.
Each gate is `{name, type, …params, feeds, na_for_entries?}`. Supported types:

- `frontmatter_keys` — a file's frontmatter contains the named `keys`.
- `file_contains` — a file matches a `pattern` (regex).
- `section_filled` — the `## <section>` for the run's entry is not the `placeholder`.
- `completed_stages_delta` — the frontmatter list grew by `delta` (honors `expected_no_advance` inversion).
- `framework_in_library` — every `claimed_frameworks` entry (from `gate-inputs.json`) resolves to a slug in the target's `index` file.

`content_lint` rules are `{name, file, forbid (regex), feeds, optional_file?}` — a forbidden
pattern that must **not** appear (em dashes, placeholder tokens, process-residue leakage).

## scenarios.jsonl

One JSON object per line. Fields (`tone_notes` and `severity` are optional but recommended):

```json
{
  "id": "kebab-id",
  "kind": "representative | adversarial",
  "golden": true,
  "severity": "blocker | high | medium",
  "entry": "<adapter-defined entry point, e.g. 'define' or 'pressure-test'>",
  "tags": ["..."],
  "setup": { "...": "optional pre-state the runner establishes (e.g. a prior brief)" },
  "user_messages": [ { "role": "user", "content": "..." } ],
  "expected_behavior": {
    "must_include": ["traits the output must have"],
    "must_not_include": ["traits that are an automatic miss"],
    "must_not_do": ["banned actions, e.g. invent a framework, fabricate a figure"],
    "critical_dimensions": ["dimension keys that must score 3 to pass"]
  },
  "tone_notes": "how a good response should feel here (the judge reads this for voice/tone)",
  "expected_no_advance": false
}
```

Adversarial scenarios encode the bad-user behavior in `user_messages` and name the
dimensions that must hold in `critical_dimensions`. Add scenarios with the meta-prompt in
`generate-scenarios.md`, and keep `coverage.md` in sync.

## coverage.md

The checklist of scenario classes a dev set must include (one representative per entry, plus
each adversarial invariant), each mapped to the scenario id(s) that cover it, with gaps named
explicitly. This is what stops silent coverage holes.
