# Changelog — blueprint

All notable changes to the Blueprint plugin. Per-plugin semver; tags are plugin-scoped
(`blueprint-vX.Y.Z`).

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

Known limitation (tracked for 0.1.1): on the most demanding deep captures — a 7-8 step
process with a dodging operator and a tight turn budget — the interview can leave a per-step
"why" or evidence-of-success field unfilled rather than re-asking. It marks these "Not
captured" honestly (never invents), so the Blueprint stays trustworthy, but a long deep
capture may need a manual second pass over blank reason/evidence fields.
