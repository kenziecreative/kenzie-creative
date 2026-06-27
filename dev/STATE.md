# Work state — kenzie-creative-marketplace

**Last updated:** 2026-06-27 · **Session focus:** reshaped plugin-eval into an internal `eval/` runtime-QA harness — de-listed from the catalog, ported + hardened with the Hello Alice playbooks-evaluator rigor (script gates, iteration discipline, multi-sampling), strategist wired and proven end to end. Earlier in the session: made the marketplace self-maintaining (version checker, per-plugin Maintaining sections, plugin-dev conventions, `/new-plugin`). All on `main`.

## Where things stand

- **On `main`**, clean. This session's eval work: `4730687` (de-list + relocate), `ffdb693` (engine rigor + strategist pack). Plus the earlier self-maintaining commits.
- **Core 4 plugins** (intelligence-briefing 0.3.0, researcher 1.4.1, sage 0.2.0, strategist 0.2.0) — all validate, checker green across 4 mirrors. No version bumps in the eval work.
- **plugin-eval is gone as a published plugin** — now `eval/` (internal tooling, no manifest, not installable, removed from marketplace.json/README/AGENTS list).

## The eval/ harness (what it is now)

- **Form:** internal `eval/` dir + `.claude/skills/eval-run` + `.claude/agents/eval-runner`+`eval-judge`. Not a plugin. Runtime-QA complement to the authoring gate (check-version-prefix + validate + plugin-dev reviewers).
- **Pipeline:** blind `eval-runner` executes a target's real skills against scripted scenarios → `eval/lib/run-gates.mjs` computes deterministic gates + content-lint → `eval-judge` (opus) scores the capture against the per-target rubric, inheriting the gates. Two minds, two layers.
- **Rigor (the upgrades over the old plugin-eval):** `iteration-discipline.md` (fresh `_eval/iteration-N/`, provenance stamp, never grade stale captures); 3× **multi-sampling** of noisy judge-graded dimensions with spread reporting; **script-computed gates** (runner writes `gate-inputs.json`, doesn't eyeball); scenario schema enriched with `tone_notes` + `severity`; per-target `coverage.md`; human-first raw-capture surfacing.
- **Strategist pack** (`eval/targets/strategist/`): `adapter`, `principles`, `rubric` (+ `noisy_dimensions`), `scenarios.jsonl` (11, now with tone_notes+severity), `gates.json` (5 gates + 2 content-lint), `coverage.md`. The only target pack; engine is generic.
- **Proven:** single-golden proof run (`adv-invented-framework` → **pass**) exercised runner→gates→judge→scorecard end to end. Surfaced + fixed two bugs (run-gates trailing-section parser; framework-entry state gates now n/a) and a caveat (below).

## Key operational caveat

- **`.claude/agents/` need a session reload to register.** Adding `eval-runner`/`eval-judge` this session did not make them dispatchable subagent types until reload (symptom: "Agent type not found"). The run skill documents a `general-purpose` fallback (pass the agent file's content as the brief), which is what the proof run used. After a reload they dispatch by name.

## Next steps (in order)

1. **Full strategist golden run** once agents are registered: `/eval-run --target strategist --scope golden` (7 goldens; posture/critic ones multi-sample 3×). Confirms the suite, not just the wiring.
2. **Add packs for the other plugins** (researcher, sage, intelligence-briefing) — each needs its own adapter/rubric/scenarios (different output shapes: audited research, weekly round-up, HTML brief). Use `coverage.md` + `generate-scenarios.md`.
3. **Optional:** build the deferred `eval-new-target` pack-scaffolder skill (mirrors `/new-plugin`).
4. **Resolve the version-card question** (Open questions) — keep or strip the `v-prefix` workaround.

## Open questions / decisions pending

- **Does the Kenzie marketplace card surface the `version` field?** If yes, strip the `v<X.Y.Z> — ` prefixes and retire `check-version-prefix.mjs`.

## How to resume

1. Read `AGENTS.md` (orientation), then this file. For the eval harness: `eval/README.md` + `eval/AGENTS.md`. For a specific plugin: its own `AGENTS.md` → "Maintaining this plugin".
2. We are on `main` and clean. To eval a plugin: `/eval-run --target strategist` (reload first so the agents register). To add a plugin: `/new-plugin`.
