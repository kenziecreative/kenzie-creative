# Goal Setting coverage checklist

The scenario classes a goal-setting dev set should cover, mapped to the ids in
`scenarios.jsonl`. Gaps are named so they don't stay silent. Add scenarios with
`eval/reference/generate-scenarios.md` and update this file.

## Representative — one realistic, in-bounds run per entry

The build spec's bar: at least one scenario per Setup stage and per Ongoing cadence.

| Class (entry) | Covered by | Status |
| --- | --- | --- |
| `orient` | `rep-orient` | ✓ |
| `horizons` | `rep-horizons` | ✓ |
| `anchors` | `rep-anchors` | ✓ |
| `goals` | `rep-goals` | ✓ |
| `systems` | `rep-systems` | ✓ |
| `premortem` | `rep-premortem` | ✓ |
| `daily` | `rep-daily` | ✓ |
| `weekly` | `rep-weekly` | ✓ |
| `monthly` | `rep-monthly` | ✓ |
| `quarterly` | `rep-quarterly` | ✓ |
| `annual` | `rep-annual` | ✓ |
| `progress` (read-only dashboard) | — | **gap** |

The `progress` gap is acceptable for the proof set — it writes nothing, so it carries no
state/journal gate; a representative would only check that the dashboard faithfully reports
STATE/active/scorecard. First to add when broadening.

## Adversarial — the invariants (goldens; must never regress)

| Class | Covered by | Status |
| --- | --- | --- |
| Three-goal rule: refuse a 4th active anchor | `adv-fourth-anchor` | ✓ |
| Three-goal rule: refuse a 4th Objective / 2nd in an anchor | `adv-fourth-objective` | ✓ |
| System needs a trigger (refuse a hope-as-system) | `adv-system-no-trigger` | ✓ |
| Mitigation needs an if/then (refuse a bare risk) | `adv-incomplete-mitigation` | ✓ |
| Restart with ONE system, not all of them | `adv-restart-all-systems` | ✓ |
| Pushback: refuse a wish dressed as an Objective | `adv-vague-objective` | ✓ |
| Lane / no-fabrication: refuse to invent business data | `adv-fabricate-data` | ✓ |
| Critic catches a vision↔quarter contradiction | `adv-critic-contradiction` | ✓ |
| Critic restraint (affirm sound goals, don't manufacture) | `adv-critic-restraint` | ✓ |
| Loop hygiene (don't silently skip the Setup foundation) | `adv-skip-setup` | ✓ |

## Dimension coverage check

Every rubric dimension is exercised by at least one scenario:

- Framework Fit / Concreteness — all `rep-*` Setup stages.
- Constraint Enforcement — `adv-fourth-anchor`, `adv-fourth-objective`, `adv-system-no-trigger`, `adv-incomplete-mitigation`, `adv-restart-all-systems`, `rep-quarterly`.
- Pushback — `adv-vague-objective`, `adv-system-no-trigger`, `adv-skip-setup`, `rep-orient`.
- Lane Discipline / No-Fabrication — `adv-fabricate-data` (+ in-lane checks in `rep-anchors`/`rep-goals`).
- Probing — `adv-vague-objective`, `rep-*` Setup stages.
- State Integrity / Loop Hygiene — gate-checked on every Setup-stage run; `adv-skip-setup` for hygiene.
- Journal Integrity — `rep-daily`, `rep-weekly`, `rep-monthly`, `rep-annual`.
- Critic Acuity — `adv-critic-contradiction`, `adv-critic-restraint`.

## Notable uncovered classes (candidates)

- **`progress` dashboard accuracy** — a run that checks the dashboard matches a seeded STATE.
- **Calibration / Working Dynamic** — a scenario seeding `pushback_calibration: high` to test the
  engine calibrates after the first exchange.
- **Annual vision *change*** — `rep-annual` covers the vision *continuing*; a run where the
  Horizon 3 vision changes and the skill hands off to re-run `horizons` and downstream would
  extend it.
- **Iteration / revision pass** — re-entering a completed Setup stage to revise (not rebuild).
- **Monthly execution-wrong classification** — `rep-monthly` covers goal-wrong; the mirror case
  (didn't execute → revise the system, not the goal) is uncovered.
