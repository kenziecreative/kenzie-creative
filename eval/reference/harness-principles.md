# How plugin-eval works

The harness evaluates **what a plugin actually produces** when someone uses it — not
the plugin's source, not the model underneath. It does this natively, without a browser,
because the plugins it tests already live in the chat surface the eval runs in.

## The core idea: isolation, then judgment

A trustworthy eval needs the thing-under-test and the grader to be different minds. A
browser-based eval gets that for free — a clean tab is isolated from the grader. Running
natively, we reconstruct it with two subagents:

1. **The runner** (`agents/eval-runner.md`) is the clean room. It receives the target
   plugin's real skill files and a scenario's scripted user turns, executes the plugin
   faithfully — playing the assistant, consuming the user turns in order — and writes the
   full transcript plus any artifacts the plugin produces to an isolated scratch dir. The
   runner **never sees the rubric.** It doesn't know which behaviors are being scored, so
   it can't teach to the test.
2. **The judge** (`agents/eval-judge.md`) is the grader. It reads the transcript, the
   artifacts, and the scenario's `expected_behavior`, and scores the rubric. It does
   **not** re-run the plugin — it judges the captured run only.

The run skill orchestrates: runner → capture → judge → scorecard. This is the native
equivalent of "the tester drives, the grader scores."

## Two layers: inherit vs. judge

Every scenario is scored on two kinds of dimension:

- **Deterministic gates** — checkable without judgment: did the expected artifact get
  written with the right structure, did a banned behavior occur (an invented framework that
  isn't in the target's library, a skipped confirmation), did the plugin stay within one step
  when it should. These are computed by a **script** (`eval/lib/run-gates.mjs`) against the
  capture — not eyeballed by the runner — so the verdicts are reproducible, and **inherited**
  by the judge, which doesn't re-litigate them. The runner only records the facts the script
  needs (`gate-inputs.json`).
- **Judgment dimensions** — need a reader: was the output concrete or a generic template,
  was the recommendation right, did the facilitation push back substantively. These the
  judge scores against the rubric's 0–3 anchors.

A scenario's pass/fail combines both. The gates catch mechanical regressions; the judgment
dimensions catch quality regressions. Either alone is half the picture.

## Scripted users (v1)

Scenarios carry **scripted** multi-turn user messages — adversarial behavior is baked into
the turns (turn 1 gives a generic non-answer; the next turn, if the plugin pushed back,
gives a slightly sharper but still soft answer). This is deterministic and reproducible,
which is what regression testing needs, and it still exercises every load-bearing behavior:
a scripted soft answer is all you need to test whether the plugin challenges it. A reactive
user-simulator (turns that adapt to the plugin's replies) is a clean later upgrade, not a
v1 requirement.

## Non-determinism is managed, not wished away

The output is non-deterministic, so a single run of a judge-graded dimension is a sample,
not a reading. The harness handles this with **iteration discipline** (`iteration-discipline.md`):
every run is a fresh `iteration-N/` (never grade stale captures), noisy dimensions are
**multi-sampled** (3× runs, report the spread), and each run carries a **provenance stamp**
(target hash, pack/rubric version, model-under-test, judge model) so a stale grade is
detectable. The value of the eval is *sensitivity to change* across iterations — re-run after
editing a skill and see what moved — not a certificate of correctness.

## Goldens are invariants

Scenarios flagged `golden: true` are the behaviors that must never regress — usually the
adversarial set (the plugin must push back on a soft answer, must not fabricate data, must
not invent a tool it doesn't have). The default suite is the goldens; a green golden run is
the ship signal.

## Install posture, don't script judgment

The marketplace house rule applies to what the eval does with a failure:

- **File-eligible** — deterministic gate failures. They have evidence and are
  reproducible; they can be turned into tickets.
- **Surface-for-decision** — judgment-dimension misses (Concreteness at 2, Calibration at
  1). The scorecard lists these for a human to decide whether they're real misses or
  rubric-calibration issues. The harness never auto-files a judgment call.

## What plugin-eval is not

- It is not a unit-test runner. It evaluates AI-generated behavior, which is graded, not
  asserted. A dimension scoring 2 is a signal, not a red build.
- It is not a guarantee. An LLM judge needs calibration and a scripted user only
  approximates a real one. The value is *sensitivity to change* — re-run after editing a
  skill and see what moved — not a certificate of correctness.
