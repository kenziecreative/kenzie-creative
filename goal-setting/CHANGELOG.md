# Changelog — goal-setting

All notable changes to the Goal Setting plugin. Per-plugin semver; tags are plugin-scoped
(`goal-setting-vX.Y.Z`).

## 0.1.0 — 2026-06-28

Initial release.

- The **Setup Arc** — six stages in order (`orient`, `horizons`, `anchors`, `goals`,
  `systems`, `premortem`) — driven by a single parameterized engine (`goal-setting-setup-stage`).
  Each stage applies the playbook's framework against the user's real business, enforces the
  stage's hard constraints, and hands off to the next stage.
- The **Ongoing Arc** — five cadences across two skills: `goal-setting-pulse` (daily writing
  ritual + weekly pulse check) and `goal-setting-review` (monthly KR review, quarterly
  system/planning review with a recurring pre-mortem, annual vision check that loops back to
  the Setup Arc).
- **Restart Protocol** (`/goal-setting:restart`) — the five-step recovery for when you fall
  off, enforcing one-system-at-a-time on the way back.
- **The three-goal rule, enforced.** Max three active Anchor Areas, max three active
  Objectives, one Objective per active Anchor Area, one System per Anchor Area at setup.
  Every skill that touches goals refuses the fourth.
- **`goal-setting-critic`** subagent (`/goal-setting:pressure-test`) — red-teams goal
  *formulations*: Objective vagueness, KR drift, systems-that-are-hopes, incomplete
  mitigations, anchor mismatch, and cross-stage contradictions. Tests logic and methodology
  fidelity, not evidence. Mirrors the strategist-critic's restraint.
- **`/goal-setting:progress`** — read-only dashboard of loop position, active goals, KR
  status, systems, mitigations, and cadence calendar. Writes nothing.
- **State as Markdown** in the deployment's `goals/` directory: `STATE.md`, `vision.md`,
  `active.md`, `scorecard.md`, `journal.md`. Human-readable, parseable, resumable.
- **Reference library** — the canonical playbook, the seven anchor-area chapters, the Three
  Tyrants philosophical companion, the object-model schemas, and one file per Setup stage.
- One PreCompact staleness hook (warns if `STATE.md` lags the working files). Claude Code
  only; a no-op on Cowork.
- Cowork-safe setup (Write-only, no shell); works on Claude Code and Cowork.
