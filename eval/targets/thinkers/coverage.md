# Thinkers coverage checklist

The scenario classes a thinkers dev set should cover, mapped to ids in `scenarios.jsonl`. Gaps
are named so they don't stay silent. Add scenarios with `eval/reference/generate-scenarios.md`
and update this file.

## Representative — one realistic, in-bounds run per entry

| Class (entry) | Covered by | Status |
| --- | --- | --- |
| `identify` (outside-view) | `rep-identify-sunkcost` | ✓ |
| `explain` | `rep-explain-confirmation` | ✓ |
| `practice` | `rep-practice-quiz` | ✓ |
| `decide` | `rep-decide-simple` | ✓ |
| `spar` | `rep-spar-devil` | ✓ |

## Adversarial — the invariants (goldens; must never regress)

| Class | Covered by | Status |
| --- | --- | --- |
| High-stakes label fits — run the distinction + first move, advisorly voice | `gold-gaslighting-outside` | ✓ |
| Self-recognition of own behavior — inside-view care, `inside_view:false` fallback, don't confirm the fear (THE calibration scenario) | `gold-gaslighting-self` | ✓ |
| High-stakes label does NOT fit — refuse to over-apply, land on the milder neighbor | `adv-over-label` | ✓ |
| Refuse an invented pattern (not in the corpus) | `adv-invented-pattern` | ✓ |
| Anti-sycophancy under confirmation bait (spar) | `adv-sycophancy-bait` | ✓ |
| Present-then-probe / permission-gate — don't prescribe off a fuzzy vent | `adv-premature-prescribe` | ✓ |

## What each dimension is exercised by

- **Voice/Posture** — every scenario (it's the cross-cutting axis); the two goldens are the
  calibration anchors.
- **Disambiguation** — `gold-gaslighting-outside`, `gold-gaslighting-self`, `adv-over-label`,
  `rep-identify-sunkcost`.
- **Pattern Fidelity** — `adv-invented-pattern` (gate-critical), plus the gate runs on every
  scenario that names a pattern.
- **Self-Recognition Care** — `gold-gaslighting-self` (the only self-recognition scenario).
- **Counsel Discipline** — `adv-sycophancy-bait`, `adv-premature-prescribe`, `rep-decide-simple`,
  `rep-spar-devil`.

## Notable uncovered classes (candidates)

- **`explain` of a confusable pattern with the contrast requested** — an `explain` run that must
  draw the this-not-that (e.g. "explain manipulation vs persuasion"), exercising Disambiguation
  on the `explain` entry.
- **`decide` complex (STRUX)** — a high-stakes, multi-stakeholder decision that runs the full
  twelve steps with the bias-check (step 9) naming corpus patterns; current `decide` coverage is
  the simple path and the fuzzy path only.
- **Self-recognition with `inside_view: true`** — a self-recognition scenario on a manipulation
  tactic that *has* the inside-view sections (e.g. guilt-tripping), to test the other branch of
  the protocol against the `inside_view:false` golden.
- **`spar` Socratic / red team** — only devil's advocate is covered representatively.
- **Overload trio** — a debate/meeting scenario testing gish-gallop vs argument-by-verbosity vs
  flooding-the-zone via `debate-and-information-overload.md`.
