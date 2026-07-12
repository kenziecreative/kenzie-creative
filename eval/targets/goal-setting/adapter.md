# Goal-setting adapter

How the eval-runner drives the goal-setting plugin and where the eval-judge looks.

## Target plugin root

The runner reads and executes the goal-setting plugin's real skill files. The plugin is
in-repo: `PLUGIN_ROOT` is the repo-root `goal-setting/` directory, resolved by `/eval-run`
(no install/config step). The files the runner uses:

- `<root>/skills/goal-setting-setup-stage/SKILL.md` — the engine for all six Setup stages
- `<root>/skills/goal-setting-pulse/SKILL.md` — daily + weekly (parameterized by cadence)
- `<root>/skills/goal-setting-review/SKILL.md` — monthly + quarterly + annual
- `<root>/skills/goal-setting-restart/SKILL.md`
- `<root>/skills/goal-setting-pressure-test/SKILL.md`
- `<root>/skills/goal-setting-progress/SKILL.md`
- `<root>/agents/goal-setting-critic.md` — the critic the pressure-test skill dispatches
- `<root>/reference/heartbeat.md` — the return protocol every skill applies at Step 0
- `<root>/reference/stages/`, `<root>/reference/schemas.md` — stage specs + object model

## Invocation by `entry`

| `entry` | Runner executes | Notes |
| --- | --- | --- |
| `orient` … `premortem` (any of the 6 stages) | `goal-setting-setup-stage` for that stage | |
| `daily`, `weekly` | `goal-setting-pulse` for that cadence | |
| `monthly`, `quarterly`, `annual` | `goal-setting-review` for that cadence | |
| `restart` | `goal-setting-restart` | |
| `pressure-test` | `goal-setting-pressure-test` **and** the critic | The runner can't nest a subagent; it plays the critic itself by reading `agents/goal-setting-critic.md` and producing exactly the findings that agent would (including its Prior Findings behavior), then has the skill present them. |
| `progress` | `goal-setting-progress` | Read-only. |

`init` is not run per-scenario; the runner establishes prior state directly from the
scenario's `setup` (below).

**The heartbeat is part of every entry.** Each skill's Step 0 applies
`reference/heartbeat.md` — the runner must execute it faithfully (compute overdue state
from the seeded dates and TODAY, restore stance, route) before the cadence work. Several
goldens exist precisely to catch a runner-or-plugin that skips it.

## TODAY

Cadence routing is date arithmetic, so every scenario pins the clock: `setup.today`
(`YYYY-MM-DD`) is the date the runner treats as "today" for the entire run. All seeded
last-run dates are absolute. The runner must not use the real date.

## Working dir and setup

Each run gets its own working dir, assigned by `/eval-run`:
`eval/targets/goal-setting/_eval/iteration-N/<scenario-id>/` (or `…/run-k/` for
multi-sampled scenarios). The goal-setting artifacts live under `goals/` inside it.

If the scenario has a `setup` block, write it into the working dir **before** the first
turn:

- `setup.today` → the pinned date (above).
- `setup.state` → a map merged into `goals/STATE.md`: frontmatter keys (`mode`,
  `setup_status`, `current_stage`, `completed_stages`, `restart_phase`, flags), cadence
  last-run lines, and optional `working_dynamic` (pushback calibration), `coaching_memory`,
  `backstage_tasks`, `candidate_backlog` section bodies. Anything unspecified comes from
  the init template's structure (all sections present — the migration gates check them).
- `setup.active_md` → written as `goals/active.md` (Objectives + contracts + KRs + Systems
  + Mitigations; this is how a fired trigger or a reworded-but-unfixed formulation is
  planted).
- `setup.journal_md` → written as `goals/journal.md` (seeded prior entries — how prior
  pressure-test findings and prior clean restart weeks are planted).
- `setup.scorecard_md`, `setup.vision_md`, `setup.history_md` → same pattern; minimal
  defaults when absent.

When there is no `setup`, scaffold a minimal fresh deployment (as `goal-setting-init`
would) and run the entry.

## User-turn protocol

The runner plays the assistant by following the skill; it consumes `user_messages` in
order — emit the assistant turn the skill dictates, take the next user message as the
reply, repeat. The run ends when messages are exhausted or the skill reaches its handoff.
Every turn is written to `transcript.md`.

## Artifacts the judge reads

- `<working-dir>/transcript.md` — the full conversation.
- `<working-dir>/goals/STATE.md`, `goals/active.md`, `goals/journal.md`,
  `goals/history.md` — the state the run left behind.

## Deterministic gates

Script-computed by `eval/lib/run-gates.mjs` from `gates.json`; verdicts feed the
gate-sourced rubric dimensions.

| Gate | Check | Feeds |
| --- | --- | --- |
| `state_frontmatter` | `goals/STATE.md` frontmatter has `mode`, `setup_status`, `current_stage` | State Integrity |
| `restart_phase_recorded` | `goals/STATE.md` carries a `restart_phase:` line (template or additive migration) | State Integrity |
| `journal_dated_entry` | `goals/journal.md` has a dated `- **[YYYY-MM-DD] …**` entry (n/a for `progress`) | State Integrity |
| `revision_preserves_original` | `goals/active.md` contains a `revised [date]: … was …` record (monthly revision scenarios only) | Record Preservation |
| `closeout_recorded` | `goals/history.md` contains a disposition line (quarterly scenarios only) | Record Preservation |
| `single_stage_advance` | `completed_stages` grew by exactly 1 vs baseline (Setup-stage entries only) | Loop Hygiene |

Plus `content_lint`: no `[TODO]/[TBD]/[FILL]` residue in `goals/STATE.md` or
`goals/active.md` (→ State Integrity).

**What the runner must record** (`gate-inputs.json`): `entry`,
`baseline_completed_stages` (from `setup`), and `expected_no_advance`.

### `expected_no_advance` scenarios

Refusal scenarios (e.g. a user stonewalling a Setup stage, or demanding a fourth active
Objective with no swap) are *supposed* to end without a capture/advance; they set
`"expected_no_advance": true` and the advance-shaped gates invert, exactly as in the
strategist pack.
