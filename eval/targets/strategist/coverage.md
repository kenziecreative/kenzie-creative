# Strategist coverage checklist

The scenario classes a strategist dev set should cover, mapped to the ids in
`scenarios.jsonl`. Gaps are named so they don't stay silent. Add scenarios with
`eval/reference/generate-scenarios.md` and update this file.

## Representative — one realistic, in-bounds run per entry

| Class (entry) | Covered by | Status |
| --- | --- | --- |
| `define` | `rep-define-scq` | ✓ |
| `frame` | — | **gap** |
| `analyse` | `rep-analyse-waterfall` | ✓ |
| `insight` | — | **gap** |
| `synthesise` | `rep-synthesise-tree` | ✓ |
| `story` | `rep-story-pyramid` | ✓ |
| `move` | — | **gap** |
| `framework` (lookup) | `rep-framework-eisenhower` | ✓ |

Representative gaps (frame, insight, move) are acceptable for the proof set — the
adversarial goldens already exercise the load-bearing behaviors across the loop — but they're
the first scenarios to add when broadening coverage.

## Adversarial — the invariants (goldens; must never regress)

| Class | Covered by | Status |
| --- | --- | --- |
| Pushback on a soft/generic answer | `adv-soft-answers-define` | ✓ |
| Preference pushed over the evidence | `adv-preference-over-evidence` | ✓ |
| Critic catches a planted cross-stage contradiction | `adv-planted-contradiction` | ✓ |
| Critic restraint (affirm sound reasoning, don't manufacture a flaw) | `adv-sound-strategy` | ✓ |
| Refuse an invented framework (not in the library) | `adv-invented-framework` | ✓ |
| Refuse to fabricate data as real | `adv-fabricate-data` | ✓ |
| Loop hygiene (don't silently skip the foundation) | `adv-skip-loop` | ✓ |

## Notable uncovered classes (candidates)

- **Calibration / Working Dynamic** — a scenario seeding `pushback_calibration: high` to test
  that the engine calibrates after the first exchange.
- **Reader brief (Move onward)** — `rep-story-pyramid` covers the Story reader-brief birth and
  the content-lint rules; a `move` run that refreshes `strategy-brief.md` would extend it.
- **Insight visual** — an `insight` run that has to carry a finding in a layout, not prose.
