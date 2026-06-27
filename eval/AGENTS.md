# AGENTS.md — eval/ (internal runtime-QA harness)

Maintainer/agent guidance for working **on** the marketplace's evaluation tooling. `eval/`
is **not a published plugin** — no manifest, not in the catalog, not installable. It's how we
test the runtime output of the plugins we ship. See `README.md` for the user-facing summary.

## What it is

A native (no-browser) eval: a blind **eval-runner** executes a target plugin's real skills
against a scenario's scripted turns and captures the result; `lib/run-gates.mjs` computes the
deterministic gates; a separate **eval-judge** scores the capture against the target's rubric,
inheriting the gates. Two minds (runner ≠ judge, and the judge runs on a peer-or-stronger
model), two layers (gate vs judge). It grades whether a plugin *behaved* well, never whether
its recommendation was *correct*.

## Structure

- `.claude/skills/eval-run/SKILL.md` — the run command (orchestrates runner → gates → judge → scorecard).
- `.claude/agents/eval-runner.md` (blind clean-room) · `.claude/agents/eval-judge.md` (grader, opus).
- `eval/lib/run-gates.mjs` — deterministic structural gates + content-lint; reads a pack's `gates.json` + the runner's `gate-inputs.json`.
- `eval/reference/` — the engine docs: `harness-principles`, `target-pack-spec`, `grade-procedure`, `generate-scenarios`, `iteration-discipline`.
- `eval/targets/<name>/` — a per-target pack (`adapter`, `principles`, `rubric`, `scenarios.jsonl`, `gates.json`, `coverage.md`) + `_eval/` run artifacts (gitignored).

## Key mechanics

- **The runner is blind** — it sees `entry`/`setup`/`user_messages` only, never the rubric or `expected_behavior`, so it can't teach to the test. It executes the skills **as written** and never compensates for a gap (a missing instruction is the regression signal).
- **Gates are script-computed**, not runner-eyeballed — `run-gates.mjs` is deterministic and reproducible; the runner only records facts (`gate-inputs.json`, e.g. `claimed_frameworks`). The judge inherits gate verdicts.
- **Iteration discipline** governs every run: fresh `iteration-N/`, multi-sample noisy dimensions (3×, report the spread), provenance stamp. Never grade a stale capture. See `reference/iteration-discipline.md`.
- **Goldens are invariants** — the adversarial set that must never regress; a red golden is a ship-blocker. `expected_no_advance` inverts the advance/fill gates for stonewalling-user scenarios.

## Adding a target

Write a pack under `targets/<name>/` per `reference/target-pack-spec.md`; no engine change.
The `adapter.md` is the only place that knows how the target is driven and where its artifacts
and gates live; `gates.json` is the machine spec for `run-gates.mjs`; keep `coverage.md` in
sync as scenarios grow. `strategist` is the worked example.

## Maintaining this

No version/tag/CHANGELOG ritual — this is internal tooling, not a released plugin. When you
change the engine (`run-gates.mjs`, the reference docs, the agents, the run skill), re-run the
strategist suite (`/eval-run --target strategist --scope all`) to confirm the harness itself
didn't regress, and check `node eval/lib/run-gates.mjs` still behaves on a known-good/known-bad
capture. Run artifacts under `_eval/` are gitignored; don't commit them.

## Relationship to the authoring gate

`eval/` is the **runtime** QA half. The **authoring** half (is the plugin well-formed/written)
is the root `AGENTS.md` release loop: `check-version-prefix`, `claude plugin validate`, and
plugin-dev's `skill-reviewer`/`plugin-validator`. They compose; this harness does not duplicate
the static checks.
