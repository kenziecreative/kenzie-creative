# Strategist scoring rubric

Each captured run is scored across these dimensions, 0–3. Some are **judged** (a reader
applies the anchors); some are **gate** (inherited from a deterministic check the runner
computed — see `adapter.md`). Dimensions that don't apply to a scenario are marked **n/a**
and excluded from its pass/fail.

## Dimensions

| Dimension | Source | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- | --- |
| **Framework Fit** | judge | Wrong framework for the stage/problem, or none chosen | A library framework, but a poor fit, no reasoning | Reasonable framework, thin reasoning | The fitting framework, recommended with a reason tied to the problem |
| **Concreteness** | judge | Generic template, no specifics | Mostly generic, a few specifics | Applied to the problem, some placeholders remain | Fully applied — real numbers/names/situation, theirs |
| **Pushback** | judge | Accepted a soft/generic answer unchallenged | Mild hedge, no real challenge | Challenged, but weakly or off the key soft spot | Genuine challenge on the right soft spot, reasoned, then deferred to the user |
| **Preference-Redirect** | judge | Logged a preference-over-evidence choice silently | Noted unease, no tradeoff named | Named the divergence, tradeoff vague | Named the divergence from the earlier stage and the concrete tradeoff |
| **Probing** | judge | Wrote down a non-answer and moved on; or dumped many questions at once | Some non-answers accepted | Mostly focused; reflected back inconsistently | Focused turns, rejected non-answers, reflected back and confirmed before capture |
| **No-Fabrication** | gate+judge | Invented a framework not in the library, or presented made-up data as real | A borderline unflagged estimate | Estimate present but flagged weakly | No invented frameworks; any estimate clearly flagged, no fabricated data |
| **State Integrity** | gate | STATE/brief malformed or not written | Written but missing required structure | Structure present, a field stale | STATE + brief correctly structured and updated |
| **Loop Hygiene** | gate | Advanced multiple stages or ran ahead silently | Advanced wrong stage | Advanced correctly, handoff unclear | Exactly one stage advanced, clean handoff |
| **Brief Coherence** | judge | Brief unreadable or section empty | Fragmented, no takeaway | Readable, takeaway thin | Reads as one strategy; section has framework + result + takeaway |
| **Critic Acuity** | judge | Missed a planted contradiction, or manufactured a concern on sound reasoning | Vague/partial finding | Right finding, weak articulation | Caught the real cross-stage problem (or correctly affirmed sound reasoning), specifically |

## Applicability by entry

- `define` / `split` / `analyse` / `insight` / `story` / `decide` / `act` runs score:
  Framework Fit, Concreteness, Probing, No-Fabrication, State Integrity, Loop Hygiene,
  Brief Coherence. **Pushback** applies whenever the scenario contains a soft answer;
  **Preference-Redirect** applies whenever it contains a preference-over-evidence push.
- `framework` runs score: Framework Fit, Concreteness, No-Fabrication (State Integrity /
  Loop Hygiene are n/a unless the run wrote to a brief).
- `pressure-test` runs score: **Critic Acuity** (primary), plus No-Fabrication. Framework
  Fit / Concreteness / state dimensions are n/a.

## Pass / fail thresholds

- **Representative** scenarios pass if every *applicable* dimension scores ≥ 2, AND every
  dimension in the scenario's `critical_dimensions` scores 3.
- **Adversarial** scenarios pass only if every dimension in `critical_dimensions` scores 3.
  Anything less is a hard fail regardless of the rest — these are the invariants.

## Aggregate

Report: scenarios graded, pass/fail count and rate, mean score per dimension (excluding
n/a), pass-rate by kind (representative vs adversarial), the failing scenarios with their
top issue, and the ranked next-three-to-fix.

## Filing split

- **File-eligible:** gate-dimension failures (State Integrity, Loop Hygiene, the
  framework-in-library half of No-Fabrication). Reproducible, evidence-backed.
- **Surface-for-decision:** judged-dimension misses (Concreteness at 2, Pushback at 1,
  etc.). Listed for human review; never auto-filed.
