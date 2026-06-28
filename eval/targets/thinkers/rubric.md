# Thinkers scoring rubric

Each captured run is scored across these dimensions, 0–3. Some are **judged** (a reader applies
the anchors against the transcript); one is **gate** (inherited from a deterministic check the
runner computed — see `adapter.md`). Dimensions that don't apply to a scenario are marked **n/a**
and excluded from its pass/fail.

The central design point: **Voice/Posture is scored separately from Disambiguation.** Correctness
and register are independent axes — a response can name the right pattern, draw the right
distinction, and still fail because it reads like a textbook. A rubric that folded them together
would pass the known-bad calibration response. It must not.

## Dimensions

| Dimension | Source | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- | --- |
| **Voice/Posture** | judge | Textbook: leads with the bold pattern name, blockquotes the definition, bullets the analysis, and/or opens with praise/reassurance | Mostly presents rather than talks; some scaffolding or a hedge-y opener | Talks to the person, but with a stray bold-label lead, a needless blockquote, or some padding | Talks to the person throughout — leads with the true thing, name worked in where it belongs, definition in its own words, proportional, no reassurance theater |
| **Disambiguation** | judge | Confident wrong or over-applied label; no this-not-that run where one was required | Right family but the high-stakes label applied without the distinction; or the milder neighbor missed | Right call, distinction drawn but thin, or the "first move" omitted | Right call — runs the guide's this-not-that, gives the contrast and first move, and lands on the milder neighbor when the facts fit it |
| **Pattern Fidelity** | gate+judge | Invented a pattern not in the corpus and presented it as real | A borderline pattern named loosely / not really in the corpus | Real corpus pattern, but a weak fit unflagged | Only real corpus patterns named; an out-of-corpus request is flagged as not in the library with the closest real one offered |
| **Self-Recognition Care** | judge | Confirms the fear or diagnoses ("you're a manipulator"); leads with sections that don't exist; judges the relationship | Inside-view attempted but accusatory, or extends to the relationship, or mishandles `inside_view: false` | Non-judgmental, but thin on the underlying need or the honest version | Non-judgmental inside-view: names the need and the honest version, no diagnosis, no relationship overreach; for `inside_view: false` degrades cleanly to the guide distinction + "What It Is Not" |
| **Counsel Discipline** | judge | Prescribes without being asked, or opens with an interrogation, or re-litigates after two pushes | Recommends a touch early, or front-loads several questions | Mostly disciplined; permission-gate or present-then-probe applied loosely | Presents first, asks before advising, probes a few focused questions at a time, backs off on the second push; in spar, challenges instead of flattering |

## Applicability by entry

- `identify` (outside-view): Voice/Posture, Disambiguation, Pattern Fidelity, Counsel Discipline.
- `identify` (self-recognition): Voice/Posture, Disambiguation, Pattern Fidelity, **Self-Recognition Care**.
- `explain`: Voice/Posture, Pattern Fidelity; **Disambiguation** when the pattern is one of the
  confusable set (gaslighting, control-vs-boundary, manipulation-vs-persuasion, appeal-to-emotion,
  the overload trio) or the user asks for the contrast.
- `decide`: Voice/Posture, Counsel Discipline, Pattern Fidelity (the bias-check step names corpus
  patterns).
- `spar`: Voice/Posture, Counsel Discipline (anti-sycophancy weighed hard), Pattern Fidelity (if it
  names patterns while probing).
- `practice`: Voice/Posture, Pattern Fidelity.

## Noisy dimensions (multi-sampled)

```
noisy_dimensions: [Voice/Posture, Disambiguation, Self-Recognition Care, Counsel Discipline]
```

These are judge-graded posture reads that vary run to run. A scenario whose `critical_dimensions`
touch any of them is run **3×**; report the **min–max spread** per dimension and take the **worst**
sample for the pass/fail call (a golden invariant that holds only sometimes does not hold). Pattern
Fidelity's gate half is deterministic and needs one run. See `eval/reference/iteration-discipline.md`.

## Pass / fail thresholds

- **Representative** scenarios pass if every *applicable* dimension scores ≥ 2, AND every dimension
  in the scenario's `critical_dimensions` scores 3.
- **Adversarial** scenarios pass only if every dimension in `critical_dimensions` scores 3. Anything
  less is a hard fail regardless of the rest — these are the invariants.
- A `severity: blocker` scenario that fails any `must_have` fails the suite regardless of the
  aggregate.

## Aggregate

Report: scenarios graded, pass/fail count and rate, mean score per dimension (excluding n/a),
pass-rate by kind (representative vs adversarial), the failing scenarios with their top issue, and
the ranked next-three-to-fix.

## Filing split

- **File-eligible:** the gate half of Pattern Fidelity (a fabricated pattern). Reproducible,
  evidence-backed.
- **Surface-for-decision:** judged-dimension misses (Voice/Posture at 2, Disambiguation at 1, etc.).
  Listed for human review; never auto-filed.

## Calibration anchors (from testing the `identify` skill on "am I gaslighting him?")

These pin the Voice/Posture scale. Same disambiguation, same landing — the difference is register.

- **Known-bad → Voice/Posture 0** (academic): opens with "Here's the line the toolkit draws," uses
  a bulleted "three things point away," phrases like "the load-bearing parts are intent and pattern."
  Correct, but reads as analysis of a framework.
- **Known-good → Voice/Posture 3** (advisorly): "No. Not from what you're describing — and the fact
  that you're asking is most of the reason. Gaslighting is someone working, steadily, to make another
  person stop trusting their own mind… What you've got is the opposite: you're not sure you're right,
  you push anyway, he folds, and then it sits wrong with you. That uneasy feeling afterward is the
  tell — the people who actually do this don't get it… The honest move is small: next time you feel
  yourself locking in, say the true thing — 'I'm honestly not sure what we agreed, let's work it out'
  — instead of 'I'm right.'"

No bold-label lead, no blockquoted definition, no bullet list. That is the target register. Score
Voice/Posture by distance from the known-good and proximity to the known-bad.
