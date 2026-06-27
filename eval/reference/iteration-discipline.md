# Iteration discipline

The eval grades AI-generated behavior, which is non-deterministic. That makes *when* and
*how often* you run as important as the rubric. These rules keep a score defensible.

## The failure mode this prevents — stale-transcript reuse

Grading old captures against a new rubric or new scenarios, reusing a single sample for a
noisy dimension, or assuming "the target's skills didn't change" means "the output didn't
change." Model output varies run to run, so an unchanged target does **not** license reusing
prior transcripts — and a transcript produced before the current scenarios/rubric existed
was never elicited by the framing you're now grading against. Either move makes the grade
indefensible. Concretely: a posture/pushback read off one stale roll is not a read.

## The rules

1. **Every run is a fresh iteration.** `/eval-run` writes to `eval/targets/<name>/_eval/iteration-N/`, where `N` is the highest existing iteration + 1. Never grade a capture produced under a different target version, scenario set, or rubric. When any of those three change, the prior iteration's captures are not evidence — regenerate the full set into a new `iteration-N/`.
2. **Multi-sample the noisy dimensions.** The rubric names `noisy_dimensions` (the judge-graded posture/critic dimensions). A scenario whose `critical_dimensions` touch them runs **at least 3×**; record the **spread** (min–max per dimension), not a point estimate. A wide spread is itself the finding — report it rather than picking a number. Deterministic gate dimensions are reproducible and need only one run.
3. **Stamp provenance in `scores.md`.** Record what produced these captures, so staleness is *detectable*: the target's content hash (`git rev-parse --short HEAD`, plus a dirty-tree note), the pack + rubric version, the scope, the model under test (the runner's model — it executes the skills) and the judge model, the run timestamp, and what changed since `iteration-(N-1)` (the trigger for this run). If the stamp doesn't match the current state, the captures are stale and the grade is void.

## What survives a stale sample and what does not

A deterministic failure driven by a skill instruction — a malformed `STATE.md`, a framework
named that isn't in the library — reproduces every run, so that conclusion stands even from
an old capture (it's a `run-gates.mjs` gate, not a judgment). Everything judge-graded —
pushback, critic acuity, concreteness — does **not** survive; those come from fresh,
multi-sampled runs. When in doubt, regenerate: an extra run is cheap next to a number you
can't defend.

## What triggers a new iteration

Any edit to the target's skills, any change to the scenarios, any change to the rubric or
gates — and, periodically, a **drift re-run** on unchanged inputs, because model drift means
a known-good plugin can quietly regress and only a fresh run catches it.

## Layout

```
eval/targets/<name>/_eval/            (gitignored — regenerated, not committed)
└── iteration-N/
    ├── <scenario-id>/                # single-sample scenario
    │   ├── transcript.md
    │   ├── capture.md                # transcript pointer + artifacts
    │   ├── gate-inputs.json          # facts the runner wrote for run-gates.mjs
    │   └── <plugin artifacts>        # e.g. strategy/brief.md, strategy/STATE.md
    ├── <noisy-scenario-id>/
    │   ├── run-1/ · run-2/ · run-3/  # 3+ samples; spread is reported
    └── scores.md                     # provenance stamp + scorecards + spreads + aggregate
```

One folder per scenario, one `iteration-N/` per run, so a target's score trajectory across
review cycles is visible. A dimension that regresses between iterations is the signal to
look at what the last edit changed.
