# Changelog — strategist

All notable changes to the Strategist plugin. Per-plugin semver; tags are plugin-scoped
(`strategist-vX.Y.Z`).

## 0.2.1 — 2026-06-27

Critic restraint fix, caught by the internal strategist eval (golden `adv-sound-strategy`).
The pressure-test critic was over-applying v0.2.0's fabricated/unowned-premise check: on a
sound brief it labeled the user's own $80k budget a "FABRICATED PREMISE" and padded the
review with a generic 5-Whys critique and a "return to growth" gap — manufacturing serious
flaws where the reasoning actually held, which trains the user to ignore the critic.

- **`agents/strategist-critic.md`:** scoped the fabricated/unowned-premise check (#7) to fire
  only on a claim the *agent inferred* that the strategy's logic *depends on* — explicitly
  **not** on a decision the user owns (budget, timeline, target, scope). A number the user
  chose is not a premise to prove.
- Added a **"What Is Not A Finding"** section: user-owned decisions, generic method critiques
  not grounded in this brief, the standard reading of the problem, and non-load-bearing
  details are not flaws. Affirm sound reasoning and stop.

Verified by re-eval: `adv-sound-strategy` now passes 3/3 samples (critic affirms, no
manufactured premise); `adv-planted-contradiction` still catches the real cross-stage
contradiction (no loss of edge).

## 0.2.0 — 2026-06-19

Posture and deliverable refinement, driven by the first full real-world run (Hello Alice
Partner-Powered Agents). Additive and backward-compatible — existing projects keep working;
the reader brief is created the next time they run Story.

- **Posture rewritten as enumerable rules** in the stage engine (`strategist-stage`). The
  old "Facilitator, not Service Desk" tone guidance becomes behavioral rules in two halves:
  a *friction half* (push on the logic) and a *lane half* — conviction-source rule (assert
  only on the strategy's mechanism or what the user stated, never on your own inference),
  lane discipline (timing/feasibility/cost are the user's; don't gate the strategy on them),
  provisional framing (your own frames are proposals, dropped on redirect), and stall-don't-
  fabricate-don't-over-stall. Borrowed from Hello Alice's advisor "posture vs judgment" work.
- **Two-part Self-Audit** replaces the single Pushback Audit: a friction check plus a lane &
  fabrication check, run before each stage closes.
- **Two documents.** The loop now maintains a working record (`brief.md`) *and* a clean
  reader-facing brief (`strategy/strategy-brief.md`, configurable as `reader_brief`),
  generated at Story and refreshed through Decide/Act. Reader-Brief Style Rules strip
  process narration, framework labels, source links, and reconciliation notes, and enforce
  a falsifiability bar on every claim.
- **One isolated question per turn** — the ask is stated plainly on its own, not buried in
  analysis. Working Dynamic calibration now updates after the first substantive exchange.
- **Two new critic checks:** *fabricated/unowned premise* (a feasibility/timing/cost claim
  the assistant inferred rather than the user establishing) and *agent-introduced keystone*
  (a framing the assistant added quietly becoming the spine).
- Docs (README, AGENTS, template config) and `/strategist:progress` updated for the
  two-document model.

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
