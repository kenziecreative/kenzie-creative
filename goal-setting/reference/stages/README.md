# The Setup Arc — Stage Reference

*One file per Setup stage, distilled from the [Goal Setting Playbook](../playbook.md) for the `goal-setting-setup-stage` engine to drive. The playbook is the prose; these are the operating instructions.*

The Setup Arc is the construction sequence. You work through it once at launch and again at each annual vision check. It has six stages, and they go in order — each stage's output is the input to the next.

| # | Stage | File | Job | Deliverable |
|---|-------|------|-----|-------------|
| 1 | Orient | [01-orient.md](01-orient.md) | Establish direction; pass three tests; calibrate difficulty | One-sentence Direction |
| 2 | Horizons | [02-horizons.md](02-horizons.md) | Set time frames; calibrate to industry; capture vision | HorizonSet + Horizon 3 vision |
| 3 | Anchors | [03-anchors.md](03-anchors.md) | Score and select | Scored scorecard + 1–3 active anchors |
| 4 | Goals | [04-goals.md](04-goals.md) | Construct Objectives + KRs | One Objective per active anchor + 2–4 KRs each |
| 5 | Systems | [05-systems.md](05-systems.md) | Design weekly systems against the Four Laws | One System per Objective |
| 6 | Pre-mortem | [06-premortem.md](06-premortem.md) | Stress-test before launch | Revised KRs + named mitigation triggers |

## The ordering rule

Resist the urge to skip ahead. The most common failure mode is starting at Stage 4 (writing OKRs) without doing Stages 1–3 first — that's how you end up with technically correct goals that produce terrible results. The engine enforces order softly: it will note when a stage is being run out of sequence and offer to go back, but it respects the user's call to proceed.

Don't perfect each stage before moving on. Get to a working draft, move to the next stage, expect to revise. Version 3 of any stage is usually the one that works; Version 1 rarely is.

## How a stage runs

Each Setup stage command (`/goal-setting:orient` … `/goal-setting:premortem`) invokes the single `goal-setting-setup-stage` skill with a different `stage` argument. For each stage the engine:

1. Reads the matching stage file here for the framework, the diagnostics, the deliverable, and the hard constraints.
2. Reads existing state (`goals/vision.md`, `goals/scorecard.md`, `goals/active.md`, `goals/STATE.md`) so it never re-asks what's known and can offer a revision pass on an already-completed stage.
3. Applies the framework to the user's real business, one isolated question per turn, pushing back on vague answers and enforcing the stage's constraints.
4. Reflects the output back, confirms, and writes it into the right state file.
5. Updates `goals/STATE.md` and hands off to the next stage by name.

## What "done" looks like across the Arc

Setup is complete when the user has: a Direction that passes all three tests, three named horizons with a Horizon 3 vision, a scored scorecard with 1–3 active anchors, one Objective per active anchor (≤3 total) each with 2–4 KRs, one triggered weekly System per Objective, and a list of "if X, then Y" mitigations from the launch pre-mortem. At that point the deployment switches from Setup mode to Ongoing mode.
