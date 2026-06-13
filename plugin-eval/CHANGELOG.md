# Changelog — plugin-eval

Per-plugin semver; tags are plugin-scoped (`plugin-eval-vX.Y.Z`).

## 0.1.0 — 2026-06-13

Initial release.

- Native evaluation harness for AI-output plugins — no browser. A blind `eval-runner`
  subagent executes a target's real skills against scripted scenarios in an isolated dir; a
  separate `eval-judge` subagent scores the capture against the target's rubric. Two-layer
  scoring (deterministic gates inherited, judgment dimensions graded).
- Two commands: `/plugin-eval:init`, `/plugin-eval:run`.
- Plugin-agnostic engine + per-target packs. Generic reference: `harness-principles`,
  `target-pack-spec`, `grade-procedure`, `generate-scenarios`.
- **strategist** target pack: principles, a 10-dimension 0–3 rubric, and 11 scenarios
  (4 representative, 7 adversarial goldens) covering framework fit, concreteness, the
  facilitation pushback discipline, no-fabrication (invented frameworks + made-up data),
  state integrity, loop hygiene, and critic acuity (catches a planted cross-stage
  contradiction; stays quiet on sound reasoning).
- Cowork-safe setup (Write-only); runs on Claude Code and Cowork.
