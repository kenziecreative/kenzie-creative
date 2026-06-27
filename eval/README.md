# eval/ — internal runtime-QA harness

Internal tooling for the Kenzie Creative marketplace. **Not a published plugin** — it isn't
in the catalog and isn't installable. It evaluates **what a marketplace plugin actually
produces** when someone uses it (not its source, not the model underneath), so we can change
a skill, re-run the suite, and see what moved.

This is the **runtime** half of QA. The **authoring** half — is the plugin well-formed and
well-written — is the release loop in the root `AGENTS.md` (`check-version-prefix` +
`claude plugin validate` + plugin-dev's `skill-reviewer`/`plugin-validator`). The eval never
judges whether a plugin's *recommendation* was correct (that's the user's call) — only
whether it *behaved* well.

## How it works

A blind **eval-runner** (`.claude/agents/`) executes a target plugin's real skills against a
scenario's scripted user turns in an isolated dir and records the transcript, the artifacts,
and the facts the gate script needs. `eval/lib/run-gates.mjs` computes the **deterministic
gates** (structure, library-membership, loop hygiene, content-lint). A separate **eval-judge**
then scores the capture against the target's rubric, *inheriting* the gates and judging only
the quality dimensions. Two minds, two layers: gates catch mechanical regressions, judgment
catches quality regressions.

Output is non-deterministic, so the harness runs with **iteration discipline**: every run is
a fresh `iteration-N/`, noisy (judge-graded) dimensions are multi-sampled 3× and reported as
a spread, and each run carries a provenance stamp. See `reference/iteration-discipline.md`.

## Run it

```
/eval-run --target strategist            # the golden set (invariants), the default
/eval-run --target strategist --scope all
/eval-run --target strategist --id adv-soft-answers-define
```

Artifacts land under `eval/targets/<name>/_eval/iteration-N/` (gitignored). A red **golden**
is a ship-blocker.

## Layout

```
eval/
  reference/     harness-principles · target-pack-spec · grade-procedure ·
                 generate-scenarios · iteration-discipline
  lib/           run-gates.mjs   (deterministic gates + content-lint)
  targets/<name>/  adapter · principles · rubric · scenarios.jsonl · gates.json · coverage.md
                   _eval/         (run artifacts; gitignored)
.claude/skills/eval-run/          the run command
.claude/agents/eval-runner.md · eval-judge.md
```

## Add a target

Write a pack under `eval/targets/<name>/` per `reference/target-pack-spec.md` (six files); the
engine doesn't change. `strategist` is the worked example. Use `reference/generate-scenarios.md`
for scenarios and keep `coverage.md` in sync.
