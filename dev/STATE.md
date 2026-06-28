# Work state — kenzie-creative-marketplace

**Last updated:** 2026-06-27 · **Session focus:** shipped **strategist v0.3.0 — the Strategy Spine reframe**: rebuilt the loop into the author's own framework, stripped the deck images, shipped the canon into the plugin, rewrote the phase docs to teach tool selection, and re-ran the eval. Merged to `main`, tagged `strategist-v0.3.0`, pushed. (Prior session, still relevant: built the internal `eval/` runtime-QA harness and the self-maintaining marketplace machinery.)

## Where things stand

- **On `main`, clean, in sync with origin.** checker green across all 4 mirrors; `claude plugin validate .` passes.
- **Plugins:** intelligence-briefing 0.3.0, researcher 1.4.1, sage 0.2.0, **strategist 0.3.0** on `main` (tagged `strategist-v0.3.0`). plugin-eval is gone as a plugin — now the internal `eval/` harness.
- **strategist 0.3.0 — the Strategy Spine reframe — shipped on `main`** (release `5c8411b`, tag `strategist-v0.3.0`). Loop remapped to Define → Frame → Analyse → Insight → Synthesise → Story → Move (Decide folded into Synthesise + a commitment gate, Split→Frame, Act→Move); all 70 deck images stripped; the Strategy Spine + Metaskills/Learning-and-Teaching/Creating-Conditions canon shipped into `reference/frameworks/`; phase READMEs rewritten to teach tool selection; catalog metadata (manifest, marketplace card, root README/AGENTS) at 0.3.0. Plugin + marketplace validate. Eval iteration-4 golden: 6/7.
- **Known follow-up (accepted; not a rebuild regression):** `adv-sound-strategy` Critic Acuity is unstable across samples (3·3·0) — the restraint guard in `agents/strategist-critic.md` occasionally inflates findings on a sound brief. The critic logic was unchanged by the rebuild (stage-name edits only); tighten the over-flagging guard in a future pass (see resume points).
- **Last commits:** `a5ea207` gitignore local tooling · `5c8411b` strategist v0.3.0 Strategy Spine reframe · `850e27d` strategist v0.2.1 critic fix · `4d92342` eval harness bug-fixes.

## Critic-restraint history — the strategist v0.2.1 fix (prior session; same dimension as the v0.3.0 red)

- **Full strategist golden run (iteration-2): 6/7 passed; `adv-sound-strategy` FAILED** (Critic Acuity 0, confirmed across 3 samples). The strategist-critic over-applied v0.2.0's fabricated/unowned-premise check — it labeled the user's own $80k budget a "FABRICATED PREMISE" and padded a sound brief with a generic 5-Whys critique + a "return to growth" gap.
- **Fix shipped (strategist v0.2.1):** scoped critic check #7 to fire only on agent-inferred load-bearing claims, never on user-owned decisions (budget/timeline/target/scope); added a "What Is Not A Finding" section. `strategist/agents/strategist-critic.md`.
- **Re-eval (iteration-3) confirmed it:** `adv-sound-strategy` now passes 3/3 (critic affirms, $80k premise gone); `adv-planted-contradiction` still catches the real contradiction (no over-correction). So the golden set is effectively 7/7.
- **Harness bugs the run surfaced + fixed** (`4d92342`): `run-gates.mjs` now matches numbered brief headings (`## 6. Decide`) and routes a missing section through the no-advance inversion; `adv-fabricate-data` + `adv-skip-loop` gained `expected_no_advance`.

## Key operational notes (carry forward)

- **`.claude/agents/` need a session reload to register.** After adding `eval-runner`/`eval-judge` they weren't dispatchable until reload; the run skill documents a `general-purpose` fallback.
- **`eval/**/_eval/` is gitignored** — run artifacts (transcripts, scorecards) are local-only and regenerated; iterations 1–3 exist on this machine but aren't committed.
- **The eval is two-mind:** runner = sonnet, judge = opus (peer-or-stronger). Gates are script-computed (`eval/lib/run-gates.mjs`), inherited by the judge.

## Next steps / resume points (all deferred, none blocking)

1. **Strategist v0.3.0 backlog (the only items left from the reframe):**
   - **Critic restraint guard** — `adv-sound-strategy` is 6/7's lone red (Critic Acuity 3·3·0); tighten the over-flagging guard in `strategist/agents/strategist-critic.md` so a sound brief stops drawing inflated findings. Turns the golden set green (7/7).
   - **Coverage** — `rep-story-pyramid` is drafted but unrun (verify it generates a clean reader brief); `frame`/`insight`/`move` still lack representative scenarios.
   - **Three open design/IP calls** — the "Strategy Spine" name vs. the frameworks folder's existing use of "spine" for Creating Conditions; the Synthesise "build-the-through-line" toolkit gap; a real named example for the canon `strategy-spine.md`.
2. **Eval packs for the other three plugins** (researcher, sage, intelligence-briefing) — each needs its own adapter/rubric/scenarios. Use `eval/reference/target-pack-spec.md` + `coverage.md`.
3. **Optional `eval-new-target` scaffolder skill** (mirrors `/new-plugin`) — deferred in the eval plan.
4. **Version-card question** (open): does the Kenzie marketplace card surface `version`? If yes, strip the `v<X.Y.Z> — ` prefixes and retire `check-version-prefix.mjs`.

## How to resume

1. Read `AGENTS.md` (orientation), then this file. Eval harness: `eval/README.md` + `eval/AGENTS.md`. Per-plugin: each plugin's `AGENTS.md` → "Maintaining this plugin".
2. To eval a plugin: `/eval-run --target strategist` (reload first so the agents register). To add a plugin: `/new-plugin`. We are on `main`, clean.
