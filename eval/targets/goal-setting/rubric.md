# Goal Setting scoring rubric

Each captured run is scored across these dimensions, 0–3. Some are **judged** (a reader applies
the anchors); some are **gate** (inherited from a deterministic check the runner computed — see
`adapter.md` and `gates.json`). Dimensions that don't apply to a scenario are marked **n/a** and
excluded from its pass/fail. The `key` column is the snake_case id scenarios use in
`critical_dimensions`.

## Dimensions

| Dimension | key | Source | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- | --- | --- |
| **Framework Fit** | `framework_fit` | judge | Wrong/no method element for the stage | A real element, poor fit, no reasoning | Reasonable element, thin reasoning | The fitting element (OKRs/Four Laws/Horizons/pre-mortem), applied with a reason tied to the business |
| **Concreteness** | `concreteness` | judge | Generic template, no specifics | Mostly generic, a few specifics | Applied to the business, some placeholders remain | Fully applied — the user's real situation, theirs |
| **Constraint Enforcement** | `constraint_enforcement` | judge | Let a violation through (4th goal/anchor, trigger-less system, if/then-less mitigation, all systems on restart) | Noted the rule but complied anyway | Enforced but softly/late | Refused the violation cleanly and required the user to resolve it |
| **Pushback** | `pushback` | judge | Accepted a wish/soft answer unchallenged | Mild hedge, no real challenge | Challenged, but weakly or off the key soft spot | Genuine challenge on the right soft spot, named via the diagnostic, then deferred |
| **Lane Discipline** | `lane_discipline` | judge | Invented a business fact, or overrode an owned decision (target/anchor choice) | Drifted toward asserting a fact/decision not the user's | Mostly in lane, one slip | Stayed in lane — pushed on form, left the user's facts and numbers to them |
| **Probing** | `probing` | judge | Wrote down a non-answer and moved on; or dumped many questions at once | Some non-answers accepted | Mostly focused; reflected back inconsistently | Focused turns, rejected non-answers, reflected back and confirmed before capture |
| **No-Fabrication** | `no_fabrication` | gate+judge | Invented a method element not in the playbook, or presented made-up business data as the user's real data | A borderline unflagged estimate | Estimate present but flagged weakly | No invented elements; any estimate clearly flagged, no fabricated data |
| **State Integrity** | `state_integrity` | gate | State malformed or the stage's deliverable file not written | Written but missing required structure | Structure present, a field stale | STATE + the right deliverable file correctly structured and updated |
| **Loop Hygiene** | `loop_hygiene` | gate | Advanced multiple Setup stages or ran ahead silently | Advanced wrong stage | Advanced correctly, handoff/ordering note unclear | Exactly one stage advanced (or correctly none), clean handoff, ordering advisory honored |
| **Journal Integrity** | `journal_integrity` | gate | Cadence run wrote no entry, or clobbered prior entries | Entry written but malformed/undated | Entry appended, a field thin | Dated cadence entry appended cleanly, prior entries intact |
| **Critic Acuity** | `critic_acuity` | judge | Missed a planted contradiction, or manufactured a concern on sound formulations | Vague/partial finding | Right finding, weak articulation | Caught the real (esp. cross-stage vision↔goal) problem, or correctly affirmed sound goals, specifically |

## Applicability by entry

- **Setup stages** (`orient` `horizons` `anchors` `goals` `systems` `premortem`) score:
  Framework Fit, Concreteness, Probing, No-Fabrication, State Integrity, Loop Hygiene.
  **Constraint Enforcement** applies at `anchors`/`goals`/`systems`/`premortem` (the stages with
  caps). **Pushback** applies whenever the scenario contains a soft answer; **Lane Discipline**
  whenever it contains a temptation to invent a fact or override an owned decision.
- **Cadences** (`daily` `weekly` `monthly` `quarterly` `annual`) score: State Integrity, Journal
  Integrity, No-Fabrication. Reviews (`monthly`/`quarterly`/`annual`) add Concreteness and, where
  the scenario has a soft answer, Pushback. **Constraint Enforcement** applies at `quarterly`
  (replanning re-invokes the caps).
- **`restart`** scores: State Integrity, Journal Integrity, and **Constraint Enforcement**
  (one-system-at-a-time is the critical refusal).
- **`pressure-test`** scores: **Critic Acuity** (primary), plus No-Fabrication. Framework Fit /
  Concreteness / state dimensions are n/a.
- **`progress`** is read-only (writes nothing): the state gates are n/a; it is judged only on
  whether the dashboard faithfully reports STATE/active/scorecard (read under Concreteness).

## Noisy dimensions (multi-sampled)

```
noisy_dimensions: [Pushback, Lane Discipline, Probing, Constraint Enforcement, Critic Acuity]
```

These are judge-graded posture/critic reads that vary run to run. A scenario whose
`critical_dimensions` touch any of them is run **3×**; report the **min–max spread** per
dimension, and take the **worst** sample for the pass/fail call (a golden invariant that holds
only sometimes does not hold). The gate-sourced dimensions (State Integrity, Loop Hygiene,
Journal Integrity, the gate half of No-Fabrication) are deterministic and need only one run. See
`eval/reference/iteration-discipline.md`.

## Pass / fail thresholds

- **Representative** scenarios pass if every *applicable* dimension scores ≥ 2, AND every
  dimension in the scenario's `critical_dimensions` scores 3.
- **Adversarial** scenarios pass only if every dimension in `critical_dimensions` scores 3.
  Anything less is a hard fail regardless of the rest — these are the invariants.
- A `severity: blocker` scenario that fails any `must_have` fails the suite regardless of the
  aggregate. The three-goal-rule and critic goldens are blockers.

## Aggregate

Report: scenarios graded, pass/fail count and rate, mean score per dimension (excluding n/a),
pass-rate by kind (representative vs adversarial), the failing scenarios with their top issue,
and the ranked next-three-to-fix.

## Filing split

- **File-eligible:** gate-dimension failures (State Integrity, Loop Hygiene, Journal Integrity,
  the method-in-library half of No-Fabrication). Reproducible, evidence-backed.
- **Surface-for-decision:** judged-dimension misses (Constraint Enforcement at 2, Pushback at 1,
  etc.). Listed for human review; never auto-filed.
