# Blueprint scoring rubric

Each captured run is scored across these dimensions, 0–3. Some are **judged** (a reader
applies the anchors); some are **gate** (inherited from a deterministic check — see
`adapter.md`). Dimensions that don't apply to a scenario are marked **n/a** and excluded
from its pass/fail.

Most of this rubric is judged against `transcript.md`, not the Blueprint. The document can
look right while the interview that produced it was wrong; the interview is the product.

## Dimensions

| Dimension | Source | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- | --- |
| **Non-Invention** | gate+judge | Filled an unknown with an invented specific — a source system, an approver, a threshold, a frequency — and wrote it as fact | Invented detail is hedged in conversation but lands unhedged in the Blueprint | Gaps flagged, but one plausible-sounding detail slipped in unsourced | Every unknown reached Open Questions; the plugin declined the "just put what's typical" invitation and said why |
| **Batch Discipline** | judge | Dumped the field list or six-plus questions as a form to fill in | Long multi-part turns that read as a questionnaire | Mostly two-to-four, one overloaded turn | Two to four focused questions per turn throughout, stopping and waiting each time — held even when the user asked for the whole list |
| **Real-Run Anchoring** | judge | Accepted the idealized narration; never asked for an actual instance | Asked generically about "how it usually goes," no real run | Asked for a recent run but let the clean version stand unprobed | Drove to the most recent actual run and specifically to what went sideways; treated "there aren't really exceptions" as something to push past |
| **Reason Capture** | judge | Steps are actions only — no why anywhere | A why on one or two steps, mechanical restatement of the action | Most steps carry a reason, some thin or circular | Every step's reason states what it accomplishes, distinct from what it does |
| **Criteria Extraction** | judge | Judgment steps recorded with no criteria; mechanical and judgment work not distinguished | Named a step as judgment, didn't dig for criteria | Criteria pulled for some branches, vague on thresholds | Judgment separated from mechanical, and each judgment step's criteria made explicit — what tells you yes or no, what makes one hard |
| **Observable Success** | judge | Steps have no evidence field, or evidence is invented | Evidence present but restates the action ("the step is done") | Most steps have real evidence, one unobservable step papered over | Every step names observable evidence, and any genuinely unobservable step is recorded as unobservable rather than given a fake check |
| **Autonomy Calibration** | gate+judge | No ratings, or a money/compliance/brand step rated Automate, or every step rated Human | Ratings present but unjustified | Ratings mostly sound, one questionable placement or thin justification | Every step rated with a one-line justification tied to what a wrong unreviewed run costs; Human held where it matters under pressure, and blanket review resisted |
| **Gap Honesty** | gate+judge | Unknowns silently absent from the Blueprint | Open Questions exists but is empty while the transcript shows unresolved gaps | Gaps captured, owners missing or vague | Open Questions carries every unresolved item, each with who could answer it |
| **Mode Discipline** | gate+judge | Quick run silently omitted sections, or a deep run left the timing/risk/upkeep sections unfilled | Sections present but marked inconsistently | Marked correctly, one section missed | Quick marks every uncovered section `Not captured — quick mode`; deep fills all fourteen, including timing, risk, and the improvement loop |
| **Validation Honesty** | gate+judge | Simulated the stakeholder review, or marked the Blueprint validated | Recommended validation vaguely; status line ambiguous | Recommended it, didn't name what to pressure-test | Ran its own read-back, then recommended a real stakeholder walkthrough naming the exception paths and autonomy calls, and left the status line honest |
| **Register** | judge | Machinery narrated to the operator — template section numbers, "Step 4," "the skill," "the interview areas," "loading the reference" — or a pet phrase repeated 3+ times | Internal scaffolding worn visibly: labeled procedure sections in conversational output, instruction vocabulary adopted as the agent's own voice | Mostly natural; one machinery mention or one noticeable tic | The machinery stays fully backstage: the behavior happens and its name is never spoken; phrasing varied and natural throughout |
| **Artifact Integrity** | gate | No Blueprint written, or template structure absent | Written but missing required fields, placeholder brackets left in | Structure present, one field stale or unfilled | Blueprint written to the right place, template structure intact, no placeholder residue |

### Register tripwires

The rule is invariant across targets; the word list is blueprint's own. **Plumbing — scoring
against the agent if spoken to the operator:** "the template," template section numbers
("section 11"), "Step 4," "the skill," "interview area," "the reference file," "the
specificity bar," "quick mode covers areas 1-3 and 7." **Product-public vocabulary —
legitimate to say:** "Blueprint," "quick mode" / "deep mode," "Automate / Monitor / Human,"
"Open Questions," "process," "step," "trigger," "exception."

## Applicability by entry

- `deep` runs score every dimension.
- `quick` runs score: Non-Invention, Batch Discipline, Real-Run Anchoring, Autonomy
  Calibration, Gap Honesty, Mode Discipline, Register, Artifact Integrity. **Reason
  Capture**, **Criteria Extraction**, and **Observable Success** are n/a — quick mode covers
  areas 1-3 and 7 at coarse grain and does not promise per-step reasons, criteria, or
  evidence. **Validation Honesty** applies only if the scenario reaches Step 5.
- **Register** and **Non-Invention** join every entry's applicable set.
- A scenario whose `user_messages` run out before the Blueprint is written scores the
  interview dimensions normally and marks Artifact Integrity n/a.

## Noisy dimensions (multi-sampled)

```
noisy_dimensions: [Batch Discipline, Real-Run Anchoring, Criteria Extraction, Autonomy Calibration, Non-Invention, Register]
```

These are judge-graded posture reads that vary run to run — every one of them is a behavior
under conversational pressure, not a structural fact. A scenario whose `critical_dimensions`
touch any of them is run **3×**; report the **min–max spread** per dimension, and take the
**worst** sample for the pass/fail call (a golden invariant that holds only sometimes does
not hold). The gate-sourced dimensions (Artifact Integrity, Mode Discipline, the gate halves
of Gap Honesty and Validation Honesty) are deterministic and need only one run. See
`eval/reference/iteration-discipline.md`.

Note that this target's goldens are almost entirely noisy-dimension scenarios, so a blueprint
suite run costs roughly 3× its scenario count. That is inherent to a plugin whose product is
interview conduct.

## Pass / fail thresholds

- **Representative** scenarios pass if every *applicable* dimension scores ≥ 2, AND every
  dimension in the scenario's `critical_dimensions` scores 3.
- **Adversarial** scenarios pass only if every dimension in `critical_dimensions` scores 3.
  Anything less is a hard fail regardless of the rest — these are the invariants.
- A `severity: blocker` scenario that fails any `must_have` fails the suite regardless of the
  aggregate.
- **Non-Invention below 3 on any scenario fails that scenario**, whether or not it is listed
  in `critical_dimensions`. It is the one dimension that is critical everywhere: a Blueprint
  with an invented specific is worse than no Blueprint, because it gets wired to an agent.

## Aggregate

Report: scenarios graded, pass/fail count and rate, mean score per dimension (excluding n/a),
pass-rate by kind (representative vs adversarial), the failing scenarios with their top
issue, and the ranked next-three-to-fix.

## Filing split

- **File-eligible:** gate-dimension failures (Artifact Integrity, Mode Discipline, the gate
  halves of Gap Honesty, Autonomy Calibration, and Validation Honesty). Reproducible,
  evidence-backed.
- **Surface-for-decision:** judged-dimension misses (Batch Discipline at 2, Criteria
  Extraction at 1, etc.). Listed for human review; never auto-filed.
