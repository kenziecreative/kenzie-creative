# Changelog — strategist

All notable changes to the Strategist plugin. Per-plugin semver; tags are plugin-scoped
(`strategist-vX.Y.Z`).

## 0.1.0 — 2026-06-13

Initial release.

- The seven-stage strategy loop — Define → Split → Analyse → Insight → Story → Decide →
  Act — as 11 commands over 5 skills, with resumable `strategy/STATE.md` state and a
  single living `strategy/brief.md` artefact.
- A library of **70 frameworks** across the seven stages, one markdown entry each with an
  embedded diagram, per-stage indexes, and a master `INDEX.md`. Each entry written to
  teach a newcomer (What It Is, Why It Works, How To Use It, Worked Example, When To Use
  It, Things To Watch Out For).
- `/strategist:framework <name>` — apply or explain any single framework, in or out of a
  project.
- `/strategist:pressure-test` + the `strategist-critic` subagent — stress-tests reasoning
  (assumptions, logical gaps, weak inferences, alternative framings, failure modes,
  cross-stage contradictions). Tests logic, not evidence.
- Live facilitation posture in the stage engine — a per-stage Pushback Audit (one genuine
  challenge minimum, higher at Analyse/Decide/Act), non-answer rejection, preference-vs-
  evidence redirect, reflect-back-and-confirm before capture, and per-user calibration via
  a `## Working Dynamic` block in STATE.md, with the pushback contract stated up front in
  `init`. The critic stays the deeper cross-stage pass; judgment also lives in the moment.
- `/strategist:progress` — read-only loop dashboard with infrastructure health checks.
- One PreCompact staleness hook (warns if `STATE.md` lags `brief.md`). No outputs gate —
  Strategist makes no source-rigor claim.
- Cowork-safe setup (Write-only, no shell); works on Claude Code and Cowork.
