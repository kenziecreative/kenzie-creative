# Strategist adapter

How the eval-runner drives the strategist plugin and where the eval-judge looks.

## Target plugin root

The runner reads and executes the strategist plugin's real skill files. `target_plugin_root`
is resolved at `/plugin-eval:init` time and stored in `.eval/config.json`. The files the
runner uses:

- `<root>/skills/strategist-init/SKILL.md`
- `<root>/skills/strategist-stage/SKILL.md`  — the engine for all seven stages
- `<root>/skills/strategist-framework/SKILL.md`
- `<root>/skills/strategist-pressure-test/SKILL.md`
- `<root>/agents/strategist-critic.md`  — the critic the pressure-test step dispatches
- `<root>/reference/INDEX.md` and `<root>/reference/<stage>/` — the framework library

## Invocation by `entry`

Each scenario names an `entry`. The runner executes the matching skill, following it
literally:

| `entry` | Runner executes | Notes |
| --- | --- | --- |
| `define` … `act` (any of the 7 stages) | `strategist-stage` SKILL for that stage | The main path. |
| `framework` | `strategist-framework` SKILL | First `user_message` carries the framework name/slug. |
| `pressure-test` | `strategist-pressure-test` SKILL **and** the `strategist-critic` agent | The pressure-test step dispatches the critic; since the runner can't nest a subagent, it plays the critic itself by reading `agents/strategist-critic.md` and producing exactly the findings that agent would, then has the skill present them. |

`init` is not run per-scenario; the runner establishes any needed prior state directly from
the scenario's `setup` (below), which is faster and fully controlled.

## Working dir and setup

Each scenario runs in its own working dir: `.eval/runs/<RUN_STAMP>/<scenario-id>/`. The
strategist artifacts live under `strategy/` inside it.

If the scenario has a `setup` block, write it into the working dir **before** the first
turn, so the run starts from that state:

- `setup.problem` → the problem statement (write into `strategy/STATE.md` frontmatter and
  the `strategy/brief.md` Problem line).
- `setup.completed_stages` → mark those stages complete in `strategy/STATE.md` (Stage
  Record + `completed_stages`), and set `current_stage` to the scenario's `entry`.
- `setup.brief` → a map of stage → markdown; write each into the matching `##` section of
  `strategy/brief.md` (this is how a planted cross-stage contradiction is seeded).
- `setup.working_dynamic` → optional `pushback_calibration` value to seed `## Working
  Dynamic` (for calibration scenarios).

When there is no `setup`, scaffold a minimal fresh `strategy/STATE.md` + `brief.md` (as
`strategist-init` would) with the scenario's implied problem, then run the entry stage.

## User-turn protocol

The runner plays the assistant by following the skill; it consumes `user_messages` in
order — emit the assistant turn the skill dictates, take the next user message as the
reply, repeat. The run ends when messages are exhausted or the skill reaches its transition/
handoff. Every turn is written to `transcript.md`.

## Artifacts the judge reads

- `<working-dir>/transcript.md` — the full conversation.
- `<working-dir>/strategy/brief.md` — the evolving strategy document.
- `<working-dir>/strategy/STATE.md` — loop state.

## Deterministic gates

The runner computes these and records pass/fail + one line of evidence. They feed the
gate-sourced rubric dimensions.

| Gate | Check | Feeds |
| --- | --- | --- |
| `state_frontmatter` | `strategy/STATE.md` has YAML frontmatter with `status`, `current_stage`, `completed_stages` | State Integrity |
| `working_dynamic_present` | `strategy/STATE.md` contains a `## Working Dynamic` section | State Integrity |
| `brief_section_filled` | the `entry` stage's `##` section in `brief.md` is no longer `_Not yet started._` (n/a for `framework`/`pressure-test`) | State Integrity |
| `single_stage_advance` | exactly one stage moved from pending/active to complete this run (`completed_stages` grew by 1) (n/a for `framework`/`pressure-test`) | Loop Hygiene |
| `framework_in_library` | every framework title/slug the transcript claims to apply matches an entry in `<root>/reference/INDEX.md` | No-Fabrication |

`framework_in_library` is the decisive fabrication gate: extract each framework name the
assistant says it is applying, normalize to a slug, and confirm it appears in `INDEX.md`. A
named framework absent from the index is a hard No-Fabrication failure.

### `expected_no_advance` scenarios

Some adversarial scenarios are *supposed* to end with the stage not completing — e.g. a
stonewalling user who only ever gives non-answers, where the correct behavior is to keep
pushing and **refuse** to capture a result. When a scenario sets
`"expected_no_advance": true`, the `single_stage_advance` and `brief_section_filled` gates
are **inverted**: not advancing is a `pass`, advancing is a `fail` (the plugin captured a
non-answer it should have rejected). Without this flag those two gates penalize correct
refusal-to-capture — which is the harness false-negative the first strategist run exposed.
