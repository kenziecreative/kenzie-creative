# Work state — kenzie-creative-marketplace

**Last updated:** 2026-06-27 · **Session focus:** built the internal `eval/` runtime-QA harness, ran the first full strategist golden set (it caught a real critic regression), and shipped the fix as strategist v0.2.1. Earlier in the same long session: made the marketplace self-maintaining (`/new-plugin`, version checker, per-plugin Maintaining sections, plugin-dev conventions) and de-listed plugin-eval into `eval/`. All on `main`, clean and pushed.

## Where things stand

- **On `main`, clean, in sync with origin.** checker green across all 4 mirrors; `claude plugin validate .` passes.
- **Plugins:** intelligence-briefing 0.3.0, researcher 1.4.1, sage 0.2.0, **strategist 0.2.1** (tagged `strategist-v0.2.1`). plugin-eval is gone as a plugin — now the internal `eval/` harness.
- **Last commits:** `850e27d` strategist v0.2.1 critic fix · `4d92342` eval harness bug-fixes · `fc8a9dd`/`ffdb693`/`4730687` the eval reshape · earlier: self-maintaining machinery + plugin-dev conformance.

## What the eval proved (and fixed) this session

- **Full strategist golden run (iteration-2): 6/7 passed; `adv-sound-strategy` FAILED** (Critic Acuity 0, confirmed across 3 samples). The strategist-critic over-applied v0.2.0's fabricated/unowned-premise check — it labeled the user's own $80k budget a "FABRICATED PREMISE" and padded a sound brief with a generic 5-Whys critique + a "return to growth" gap.
- **Fix shipped (strategist v0.2.1):** scoped critic check #7 to fire only on agent-inferred load-bearing claims, never on user-owned decisions (budget/timeline/target/scope); added a "What Is Not A Finding" section. `strategist/agents/strategist-critic.md`.
- **Re-eval (iteration-3) confirmed it:** `adv-sound-strategy` now passes 3/3 (critic affirms, $80k premise gone); `adv-planted-contradiction` still catches the real contradiction (no over-correction). So the golden set is effectively 7/7.
- **Harness bugs the run surfaced + fixed** (`4d92342`): `run-gates.mjs` now matches numbered brief headings (`## 6. Decide`) and routes a missing section through the no-advance inversion; `adv-fabricate-data` + `adv-skip-loop` gained `expected_no_advance`.

## Key operational notes (carry forward)

- **`.claude/agents/` need a session reload to register.** After adding `eval-runner`/`eval-judge` they weren't dispatchable until reload; the run skill documents a `general-purpose` fallback.
- **`eval/**/_eval/` is gitignored** — run artifacts (transcripts, scorecards) are local-only and regenerated; iterations 1–3 exist on this machine but aren't committed.
- **The eval is two-mind:** runner = sonnet, judge = opus (peer-or-stronger). Gates are script-computed (`eval/lib/run-gates.mjs`), inherited by the judge.

## Next steps / resume points (all deferred, none blocking)

1. **Eval packs for the other three plugins** (researcher, sage, intelligence-briefing) — each needs its own adapter/rubric/scenarios (different output shapes). Use `eval/reference/target-pack-spec.md` + `coverage.md`.
2. **Full 3× multi-sampling of the four *passing* noisy goldens** — this session only multi-sampled the failing/fixed one; the four passes are single-sample (provisional).
3. **Optional `eval-new-target` scaffolder skill** (mirrors `/new-plugin`) — deferred in the eval plan.
4. **Minor critic polish:** in one iteration-3 sample the critic still *led* with "FAILURE MODE" framing before affirming (scored 3 anyway — presentation, not correctness). Watch if doing another critic pass.
5. **Version-card question** (open): does the Kenzie marketplace card surface `version`? If yes, strip the `v<X.Y.Z> — ` prefixes and retire `check-version-prefix.mjs`.

## How to resume

1. Read `AGENTS.md` (orientation), then this file. Eval harness: `eval/README.md` + `eval/AGENTS.md`. Per-plugin: each plugin's `AGENTS.md` → "Maintaining this plugin".
2. To eval a plugin: `/eval-run --target strategist` (reload first so the agents register). To add a plugin: `/new-plugin`. We are on `main`, clean.
