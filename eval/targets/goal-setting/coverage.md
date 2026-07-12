# Goal-setting coverage checklist

The scenario classes a goal-setting dev set should cover, mapped to the ids in
`scenarios.jsonl`. The ten shipped scenarios are the proof set from the 2026-07 blind
review's confirm/refute conditions — all adversarial goldens, because the review's fire
concentrated on invariants, not typical runs. Gaps are named so they don't stay silent.
Add scenarios with `eval/reference/generate-scenarios.md` and update this file.

## Adversarial — the invariants (goldens; must never regress)

| Class | Covered by | Status |
| --- | --- | --- |
| 42-day return routed to Restart, not routine | `adv-42-day-return` | ✓ |
| Fourth goal: refusal + backlog + facilitated swap with closure | `adv-fourth-goal-swap` | ✓ |
| Revision preserves the original commitment | `adv-revision-preservation` | ✓ |
| Mixed three-goal week representable; UNKNOWN never inferred | `adv-mixed-week` | ✓ |
| Fired mitigation surfaces now, not at quarter end | `adv-fired-mitigation` | ✓ |
| Restart exits by criteria (pulse-evaluated hold) | `adv-restart-exit` | ✓ |
| Critic reasserts an unresolved finding across context loss | `adv-critic-memory` | ✓ |
| Out-of-order completion marked, not blocked, not silent | `adv-out-of-order` | ✓ |
| Closeout-before-activation at the quarter boundary | `adv-closeout-gate` | ✓ |
| Bad-goal vs bad-system differential (record over self-blame) | `adv-goal-vs-system` | ✓ |

## Representative — one realistic, in-bounds run per entry

| Class (entry) | Covered by | Status |
| --- | --- | --- |
| `orient` / `horizons` / `systems` / `premortem` | — | **gap** |
| `goals` (happy path incl. goal contract) | — | **gap** (adversarially exercised by `adv-fourth-goal-swap`) |
| `anchors` | — | **gap** (adversarially exercised by `adv-out-of-order`) |
| `daily` | — | **gap** |
| `weekly` (clean week) | — | **gap** (mixed week covered) |
| `monthly` / `quarterly` / `annual` | — | **gap** (adversarially exercised) |
| `restart` (entrance) | — | **gap** (exit covered by `adv-restart-exit`) |
| `pressure-test` restraint (sound setup affirmed, no manufactured concern) | — | **gap — first to add**; pairs with `adv-critic-memory` the way strategist's `adv-sound-strategy` pairs with its contradiction golden |
| `progress` (read-only fidelity) | — | **gap** |

Representative gaps are acceptable for the proof set — the goldens exercise every
load-bearing behavior the re-audit named — but critic-restraint and a clean daily/weekly
pair are the first additions when broadening, followed by a Setup-stage happy path.

## Notable uncovered classes (candidates)

- **Critic restraint** (above) — the other half of the valve.
- **Cadence-trigger design at Setup close** — a `premortem` run that must refuse "I'll
  remember" as a cadence trigger.
- **Working Dynamic calibration** — seed `pushback_calibration: low` and verify the
  challenge form adapts without losing the friction half.
- **Machinery-backstage sweep** — any entry, judged on zero plumbing vocabulary reaching
  the user (currently enforced via tone_notes on every golden, not a dedicated scenario).
- **Annual → Setup cascade** — vision changed, downstream stages marked stale.
