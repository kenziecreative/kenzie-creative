# Work state — kenzie-creative-marketplace

**Last updated:** 2026-06-13 · **Session focus:** built two new plugins (strategist, plugin-eval) end to end in Cowork, plus adopted Hello-Alice maintenance conventions (v-prefix + checker, /checkpoint + this file, dev/ build docs).

## Where things stand

- **intelligence-briefing 0.3.0** — unchanged this session.
- **researcher 1.4.1** — unchanged this session.
- **sage 0.2.0** — unchanged. Its planning docs moved to `dev/sage/` (PRD + meeting-cataloging-workflow); the originals still sit in `.planning/` (couldn't delete in Cowork — see Session knowledge).
- **strategist 0.1.0** — NEW this session. Seven-stage loop (Define→Split→Analyse→Insight→Story→Decide→Act) over a 70-framework library (built from the Overnight Strategist deck in `business-strategy/`), with a `strategist-critic` pressure-test. Refined with brand-compass-style facilitation posture: per-stage Pushback Audit, `## Working Dynamic` calibration in STATE, gut-vs-evidence redirect, up-front pushback contract in init. Full account: `strategist/AGENTS.md`, `strategist/CHANGELOG.md`. **Not yet live-run on Claude Code; not committed/tagged.**
- **plugin-eval 0.1.0** — NEW this session. Native eval harness (no browser): blind `eval-runner` subagent executes a target's real skills, separate `eval-judge` scores against a per-target rubric; two-layer (gates inherited + judgment graded). Generic engine + per-target packs; ships the **strategist** pack (10-dim rubric, 11 scenarios: 4 representative, 7 adversarial goldens). Full account: `plugin-eval/AGENTS.md`. **Not yet live-run on Claude Code; not committed/tagged.**
- **Maintenance conventions added** — every plugin's version is now a `v<X.Y.Z> — ` prefix in both descriptions (plugin.json + catalog); `node dev/scripts/check-version-prefix.mjs` asserts all three agree (currently green, 5/5). `/checkpoint` skill (`.claude/skills/checkpoint/`) writes this file. `dev/<plugin>/` now holds non-shipped build docs. AGENTS.md release loop updated to include validate + the checker + the v-prefix step.

## Done this session

- Built `business-strategy/reference/` — 70-framework corpus from the Overnight Strategist deck (markdown + rendered diagrams + INDEX + stage READMEs).
- Built `strategist/` plugin (11 commands, 5 skills, critic agent, hook, library copy, docs) and registered it; then folded in the posture refinements.
- Built `plugin-eval/` plugin (engine reference, runner + judge agents, init/run skills, strategist target pack, docs) and registered it.
- Ran the eval once vs strategist (5 adversarial goldens): **5/5 pass**; caught a harness false-negative (gates penalized correct refusal-to-capture) → fixed by adding the `expected_no_advance` scenario flag.
- Adopted maintenance conventions (above).

## In flight / uncommitted

**Everything from this session is uncommitted** — this was a Cowork build session and nothing has been committed or pushed. The working tree contains: `strategist/`, `plugin-eval/`, `dev/`, `.claude/skills/checkpoint/`, and edits to `.claude-plugin/marketplace.json`, root `README.md`, `AGENTS.md`. No tags exist yet for the two new plugins.

## Next steps (in order)

1. **Live-run strategist on Claude Code.** `/strategist:init` in a scratch dir → one stage → `/strategist:pressure-test` → `/strategist:progress`. Confirm the command→skill resolution, STATE/brief writes, and the Pushback Audit all fire under real invocation. Fix anything that only shows live.
2. **Live-run plugin-eval on Claude Code.** `/plugin-eval:init` (point at the strategist plugin) → `/plugin-eval:run`. Subagent spawning (Task tool) and slash-command resolution differ from the Cowork Agent path used to prototype it — verify the runner/judge orchestration works as written.
3. **Validate + lint.** `claude plugin validate ./strategist`, `./plugin-eval`, and `.`; `node dev/scripts/check-version-prefix.mjs`.
4. **Commit + tag + push from a terminal.** Logical units; tags `strategist-v0.1.0` and `plugin-eval-v0.1.0` (plugin-scoped, never plain vX.Y.Z). Push from a real terminal (network + creds).
5. **Optional follow-ups:** run the 4 representative strategist scenarios (confirm normal flows clear the ≥2 bar); stub a `plugin-eval/targets/brand-compass/` pack (proves the engine generalizes); delete the now-duplicated `.planning/` sage docs once in a terminal.

## Open questions / decisions pending

- **Does the Kenzie marketplace card surface the `version` field?** If it does, the `v<X.Y.Z> — ` description prefix is unnecessary cosmetic noise — strip the prefixes and retire the checker. Confirm in the Cowork Plugins tab / Claude Code marketplace card. (Hello Alice adopted the prefix precisely because the card does NOT show version; verify Kenzie has the same limitation.)
- **Status-column convention** was considered and NOT adopted this session (user choice). Revisit if the plugin list grows.

## Session knowledge worth keeping

- **Writing under `.claude/` is blocked by the Write tool in Cowork** ("protected location"); create files there with the bash tool instead (it writes to the VM mount). This is how `.claude/skills/checkpoint/SKILL.md` was created.
- **File deletion is gated per folder in Cowork** — `rm` fails with "Operation not permitted" until the folder's delete prompt is approved. The `.planning/` sage docs were copied to `dev/sage/` rather than moved for this reason; delete the originals from a terminal.
- **The strategist eval demo artifacts** live in the session outputs scratch (`outputs/eval-demo/`), not in the repo — ephemeral. Recreate with `/plugin-eval:run`.

## How to resume

1. Read `AGENTS.md` (orientation), then this file.
2. The immediate queue is the git pass: Next steps 1–4. Grounding docs: `strategist/AGENTS.md`, `plugin-eval/AGENTS.md`, and the release loop in `AGENTS.md`.
