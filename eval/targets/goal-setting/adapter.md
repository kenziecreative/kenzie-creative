# Goal Setting adapter

How the eval-runner drives the goal-setting plugin and where the eval-judge looks.

## Target plugin root

The runner reads and executes the goal-setting plugin's real skill files. The plugin is
in-repo: `PLUGIN_ROOT` is the repo-root `goal-setting/` directory, resolved by `/eval-run`
(no install/config step). The files the runner uses:

- `<root>/skills/goal-setting-setup-stage/SKILL.md` — the engine for all six Setup stages
- `<root>/skills/goal-setting-pulse/SKILL.md` — daily + weekly cadences
- `<root>/skills/goal-setting-review/SKILL.md` — monthly + quarterly + annual cadences
- `<root>/skills/goal-setting-restart/SKILL.md`
- `<root>/skills/goal-setting-pressure-test/SKILL.md`
- `<root>/agents/goal-setting-critic.md` — the critic the pressure-test step dispatches
- `<root>/reference/stages/` and `<root>/reference/anchor-areas/` — what the engine reads
- `<root>/reference/INDEX.md` and `<root>/reference/schemas.md` — the method-element index and the object model

## Invocation by `entry`

Each scenario names an `entry`. The runner executes the matching skill, following it literally:

| `entry` | Runner executes | Notes |
| --- | --- | --- |
| `orient` `horizons` `anchors` `goals` `systems` `premortem` | `goal-setting-setup-stage` for that stage | The main Setup path. The skill reads `reference/stages/<n>-<stage>.md`. |
| `daily` | `goal-setting-pulse` (cadence=daily) | The daily writing ritual. |
| `weekly` | `goal-setting-pulse` (cadence=weekly) | The Monday pulse check. |
| `monthly` `quarterly` `annual` | `goal-setting-review` (that cadence) | The periodic reviews. |
| `restart` | `goal-setting-restart` | The Restart Protocol. |
| `pressure-test` | `goal-setting-pressure-test` **and** `goal-setting-critic` | The skill dispatches the critic; since the runner can't nest a subagent, it plays the critic itself by reading `agents/goal-setting-critic.md` and producing exactly the findings that agent would, then has the skill present them. |
| `progress` | `goal-setting-progress` | Read-only dashboard; writes nothing. |

`init` is not run per-scenario; the runner establishes any needed prior state directly from
the scenario's `setup` (below), which is faster and fully controlled.

## Working dir and setup

Each run gets its own working dir, assigned by `/eval-run`:
`eval/targets/goal-setting/_eval/iteration-N/<scenario-id>/` (or `…/<scenario-id>/run-k/` for
multi-sampled scenarios). The plugin's artifacts live under `goals/` inside it.

If the scenario has a `setup` block, write it into the working dir **before** the first turn,
so the run starts from that state. The runner scaffolds the five state files as
`goal-setting-init` would, then applies:

- `setup.direction` → the Direction line in `goals/vision.md` (`## Direction`) and the
  `direction:` value implied for the run.
- `setup.mode` → `mode:` in `goals/STATE.md` frontmatter (`setup` | `ongoing` | `restart`).
- `setup.completed_stages` → mark those Setup stages complete in `goals/STATE.md` (frontmatter
  `completed_stages` + the Setup Stage Record), and set `current_stage` to the scenario's `entry`.
- `setup.vision` → the Horizon 3 vision paragraph, written into `goals/vision.md`
  (`## HorizonSet`). (This is how a planted vision↔goal contradiction is seeded.)
- `setup.scorecard` → a map of anchor → score (and which are active), written into
  `goals/scorecard.md` (Current Scores, Active Anchor Areas, a dated history row).
- `setup.active` → a map of Objective → markdown (Objective, KRs, System(s), Mitigations),
  written into `goals/active.md`, one section per Objective. This seeds the goals a
  pressure-test or review run operates on.
- `setup.working_dynamic` → optional `pushback_calibration` value to seed `## Working Dynamic`.

When there is no `setup`, scaffold a minimal fresh deployment (as `goal-setting-init` would)
in `setup` mode with the scenario's implied Direction, then run the entry.

## User-turn protocol

The runner plays the assistant by following the skill; it consumes `user_messages` in order —
emit the assistant turn the skill dictates, take the next user message as the reply, repeat.
The run ends when messages are exhausted or the skill reaches its transition/handoff. Every
turn is written to `transcript.md`.

## Artifacts the judge reads

- `<working-dir>/transcript.md` — the full conversation.
- `<working-dir>/goals/STATE.md` — loop state, mode, cadence calendar, flags.
- `<working-dir>/goals/vision.md` — Direction + HorizonSet.
- `<working-dir>/goals/active.md` — Objectives, KRs, Systems, Mitigations.
- `<working-dir>/goals/scorecard.md` — anchor scores + active set.
- `<working-dir>/goals/journal.md` — appended cadence entries (daily/weekly/monthly/…/restart).

## Deterministic gates

These are **script-computed** by `eval/lib/run-gates.mjs` from the machine spec in `gates.json`
— the runner does not eyeball them. Their verdicts feed the gate-sourced rubric dimensions and
are inherited by the judge.

| Gate | Check | Feeds |
| --- | --- | --- |
| `state_frontmatter` | `goals/STATE.md` frontmatter has `mode`, `current_stage`, `completed_stages` | State Integrity |
| `working_dynamic_present` | `goals/STATE.md` contains a `## Working Dynamic` section | State Integrity |
| `setup_stage_advance` | `completed_stages` grew by exactly 1 vs the `setup` baseline (Setup-stage entries only; n/a for cadences/restart/pressure-test/progress) | Loop Hygiene |
| `cadence_entry_logged` | `goals/journal.md` gained a dated cadence entry (cadence + restart entries only; n/a for Setup stages/pressure-test/progress) | Journal Integrity |
| `method_in_library` | every method element the assistant claimed to apply resolves to a term in `goal-setting/reference/INDEX.md` (the seven anchor names + OKRs, Three Time Horizons, Four Laws, Pre-mortem) | No-Fabrication |

Plus one `content_lint` on `goals/active.md` (optional — absent before the Goals stage): no
leftover `[FILL]`/`[TODO]`/`[placeholder]` tokens in the active goals doc (→ State Integrity).

**Note on the three-goal rule:** the cap (≤3 active anchors/Objectives, one Objective per
anchor, a trigger on every System, an if/then on every Mitigation) is **not** a deterministic
gate — counting Objectives by regex is too brittle. It is the **Constraint Enforcement** judge
dimension, read from the transcript (did the assistant refuse the fourth?) and `goals/active.md`
(did only three survive?). For the adversarial cap scenarios, the correct end-state often still
*advances* the stage with three captured, so those scenarios do **not** set `expected_no_advance`
— the signal is the refusal in the transcript, not a frozen stage.

### `expected_no_advance` scenarios

Some adversarial scenarios are *supposed* to end with the Setup stage not completing — a
stonewalling user who only gives wishes ("just grow the business") where the correct behavior
is to keep pushing and **refuse** to capture a vague Objective. A scenario sets
`"expected_no_advance": true`, the runner copies it into `gate-inputs.json`, and `run-gates.mjs`
**inverts** `setup_stage_advance`: not advancing is a `pass`, advancing is a `fail`. Use it only
when the *right* behavior is genuinely to not capture — not for the cap scenarios (see note above).

### What the runner must record (`gate-inputs.json`)

The script can't see these, so the runner writes them:

- `entry` — the scenario's entry.
- `baseline_completed_stages` — the count of `setup.completed_stages` (0 if none).
- `claimed_frameworks` — every method element the assistant said it was applying (e.g. `OKRs`,
  `Four Laws`, `Three Time Horizons`, `Pre-mortem`, an anchor-area name). The decisive input to
  `method_in_library`. (Business *facts* the assistant invents are judged under No-Fabrication,
  not gated here.)
- `expected_no_advance` — copied from the scenario.
