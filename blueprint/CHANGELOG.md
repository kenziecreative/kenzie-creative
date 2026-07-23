# Changelog — blueprint

All notable changes to the Blueprint plugin. Per-plugin semver; tags are plugin-scoped
(`blueprint-vX.Y.Z`).

## 0.2.0 — 2026-07-23

Adds a discovery front-door and makes the three jobs explicit. Blueprint was always excellent
once you could name a process; its first question was effectively "which process?", which
assumes you already see your work in process-shaped units. You often don't.

- **New: `/blueprint:discover`** — a short, time-boxed recall sweep that surfaces the recurring
  work you've stopped noticing you do, into a thin **Process Inventory** of candidates (each in
  your own words), then recommends a small first portfolio to capture. It leads with what you
  actually produced and touched recently rather than the org-chart version, stops when nothing
  new surfaces, and — crucially — **never sharpens a vague mention into a confident process
  name** ("monthly numbers work," not "Monthly Financial Reporting") and **never rates anything
  for automation** (no steps exist yet to judge). Ranks the inventory through three lenses —
  automation opportunity, operational exposure, knowledge-loss risk — so capture isn't only for
  automating chores.
- **New: `/blueprint:guide`** — explains the three jobs (discover, quick capture, deep capture)
  and routes you to the right first step. Triggers on "how does this work" / "where do I start."
- **Capture picks up from discovery.** Starting a capture on a candidate from your Process
  Inventory seeds it with what's already known and jumps to the real-run anchor, instead of
  re-asking. Inventory fields are treated as your words, not established facts — non-invention
  carries across the seam.
- **Positioning fix.** Quick mode is no longer described as "building an inventory of your
  processes" — discovery owns that job now. Quick and deep each model one process; discovery
  produces the inventory.
- Runtime-QA: a dedicated `blueprint-discover` eval target guards the discovery invariants
  (never invent a boundary, never rate at discovery, keep the inventory thin, flag duplicates
  without merging).

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
