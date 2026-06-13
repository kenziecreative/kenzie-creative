# Meta-prompt: add scenarios to a target pack

> Paste this into Claude when you want to extend a target's `scenarios.jsonl`. Give it the
> target's `principles.md`, `rubric.md`, `adapter.md`, and the existing `scenarios.jsonl`.

You are extending the scenario suite for a plugin-eval target. Read the target's
`principles.md` (what good means), `rubric.md` (the dimensions), `adapter.md` (how the
plugin is driven and what its gates are), and the existing `scenarios.jsonl` (so you don't
duplicate coverage).

Produce new scenarios as JSONL, one object per line, in the schema defined by
`reference/target-pack-spec.md`. For each:

- **Pick a gap.** Cover an entry point, behavior, or failure mode the existing suite
  misses. Map each new scenario to at least one principle and the rubric dimension(s) it
  exercises.
- **Two kinds.**
  - *Representative* — a realistic, in-bounds use. Tests that the plugin does the normal
    job well. Pass bar: every dimension ≥ 2, criticals = 3.
  - *Adversarial* (`golden: true`) — engineered to provoke a specific failure. The bad
    behavior lives in the `user_messages` (a generic non-answer, a preference pushed over
    the evidence, a planted contradiction with an earlier turn, a request to fabricate
    data, a request for a capability the plugin doesn't have). Name the dimensions that
    must hold in `critical_dimensions`.
- **Script the turns.** Write `user_messages` as a fixed sequence. For adversarial soft-user
  cases, write the early turns soft/generic and a later turn slightly sharper — so the
  scenario tests whether the plugin pushed back, not whether the user was already clear.
- **Be specific.** Real numbers, a concrete situation, a named (fictional) business. Vague
  scenarios produce vague grades.
- **State the bar.** Fill `expected_behavior` with `must_include`, `must_not_include`,
  `must_not_do`, and `critical_dimensions`. These are what make the scenario gradable.

Only add a golden when its behavior is genuinely load-bearing — an invariant whose
regression would be a real bug. Goldens are few and consensus, not a wishlist.

Output only the new JSONL lines, ready to append. No preamble.
