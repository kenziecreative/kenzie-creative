# Changelog — blueprint

All notable changes to the Blueprint plugin. Per-plugin semver; tags are plugin-scoped
(`blueprint-vX.Y.Z`).

## 0.1.1 — 2026-07-23

Closes the one known limitation from 0.1.0. Full runtime-QA certification now green across
the whole set: all 8 adversarial goldens **and** both representative scenarios pass 3/3
(eval iterations 4 and 6).

- **Completeness sweep before writing.** Deep captures now do a final pass over every step
  still missing a "why" or evidence-of-success and ask for the gaps in one batch before the
  Blueprint is written, instead of leaving a field blank on the strength of a single earlier
  question the operator talked past. Whatever the operator still doesn't supply is marked
  "Not captured" and routed to Open Questions — never invented.
- **Non-Invention now guards the edge of a stated threshold**, not just invented values:
  "above $5k" is kept verbatim and the exact-boundary case ("what happens at exactly $5k?")
  goes to Open Questions rather than being silently hardened to "$5k and above."

## 0.1.0 — 2026-07-22

Initial release.

- Guided process-capture interview in two modes: quick (~15 min inventory pass) and deep
  (~45-60 min full extraction).
- Structured Process Blueprint template with per-step autonomy ratings (Automate, Monitor,
  Human) and an explicit Open Questions section for flagged unknowns.
- Worked example (blog content workflow) shipped in `reference/` as the specificity bar.
- Light validation pass after drafting; real stakeholder validation recommended, not simulated.

Runtime-QA certified against the `eval/` harness (30-run 3× golden set, iteration-4):
all 8 adversarial goldens pass 3/3 — including the two invariants the design turns on,
never-invent (refuses to fabricate or to quietly sharpen a vague answer, down to the edge
of a stated threshold) and never-collapse-into-a-form. Machinery stays out of the delivered
Blueprint.

(The per-step "why"/evidence gap noted here at 0.1.0 is resolved in 0.1.1 by the
completeness sweep.)
