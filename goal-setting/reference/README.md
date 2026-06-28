# Goal Setting — Reference Library

The read-only library behind the goal-setting plugin. The skills read these files at runtime to drive the method; the user reads them when they want the depth behind a stage or a rule.

## What's here

- **[playbook.md](playbook.md)** — the canonical methodology. Two arcs (Setup and Ongoing), the science underneath, the six foundational principles, the quick-start, the Restart Protocol, the object model, and the one-page summary. This is the source of truth for the method; everything else supports it.
- **[three-tyrants.md](three-tyrants.md)** — the philosophical foundation underneath the playbook's constraints. Read it when a rule (especially the max-three rule) feels arbitrary and you want the *why*. The method works without it.
- **[schemas.md](schemas.md)** — the object model (Direction, HorizonSet, AnchorArea, Objective, KeyResult, System, Mitigation, and the cadence entries) and how it maps onto the deployment's `goals/` state files. The implementation-neutral contract.
- **[anchor-areas/](anchor-areas/README.md)** — one chapter per anchor area (beliefs, realities, practices, signals of strength, failure modes), plus a README carrying the body-systems metaphor and the scorecard mechanics. Companion to Stage 3.
- **[stages/](stages/README.md)** — one operating file per Setup stage (purpose, framework, diagnostics, constraints, deliverable), plus a README. These are what the `goal-setting-setup-stage` engine reads to run each stage.

## How the library maps to the method

| Stage / cadence | Reads |
|-----------------|-------|
| Setup stages 1–6 | `stages/0N-<stage>.md` (+ `anchor-areas/` at Stage 3) |
| Ongoing cadences | `playbook.md` Part Two (+ `stages/06-premortem.md` for the quarterly recurring pre-mortem) |
| Restart Protocol | `playbook.md` Appendix B |
| Pressure-test (critic) | the relevant state, judged against the playbook's tests and `schemas.md` constraints |
| Anything, when curious | `playbook.md`, then `three-tyrants.md` for the why |

## A note on canon

`playbook.md`, `three-tyrants.md`, and the `anchor-areas/` chapters are the canonical, user-facing versions of the methodology — migrated out of the build's `dev/goal-setting/` working drafts. Don't maintain parallel copies; this library is canonical going forward.
