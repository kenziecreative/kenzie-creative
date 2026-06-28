# Work state — kenzie-creative-marketplace

**Last updated:** 2026-06-27 · **Session focus:** migrated the **Thinkers Toolkit** into the marketplace as the new **`thinkers`** plugin (v0.1.0) — corpus + 5 skills brought across, voice relocated into a bundled `reference/counsel.md`, all corpus reads made `${CLAUDE_PLUGIN_ROOT}`-relative (verified live), the guides wiring preserved, and a full eval target pack built with **Voice/Posture scored separately from correctness**. The eval caught and I fixed an academic-voice regression; both calibration goldens now pass 3·3·3. **Uncommitted on `main`** — not yet committed or tagged. (Prior session: shipped strategist v0.3.0 Strategy Spine reframe, tagged `strategist-v0.3.0`.)

## Where things stand

- **On `main` with uncommitted thinkers work.** checker green across all 5 mirrors; `claude plugin validate ./thinkers` and `claude plugin validate .` pass. The thinkers plugin, its eval pack, `dev/thinkers/`, and the 3 root-index edits are staged in the working tree, **not committed**.
- **Plugins:** intelligence-briefing 0.3.0, researcher 1.4.1, sage 0.2.0, strategist 0.3.0 (tagged `strategist-v0.3.0`), **thinkers 0.1.0 (NEW, uncommitted, untagged)**. plugin-eval is gone as a plugin — now the internal `eval/` harness.

## thinkers v0.1.0 — the migration (this session)

- **Migrated** from the standalone Thinkers Toolkit (`a-emporium-working/thinkers-toolkit`). Full record: `dev/thinkers/MIGRATION.md`. Plugin AGENTS: `thinkers/AGENTS.md`.
- **What it is:** a reasoning counselor over a 243-pattern corpus (biases, fallacies, persuasion/manipulation tactics, bad-faith moves, strategies) + a `guides/` disambiguation layer + 5 skills (identify, explain, practice, decide, spar).
- **The four handoff gotchas, all handled:** (1) voice relocated to bundled `reference/counsel.md`, loaded by every skill — no host-CLAUDE.md dependency; (2) all corpus reads `${CLAUDE_PLUGIN_ROOT}/reference/...`, verified live by the eval; (3) guides wiring preserved, `user-journey-guide.md` left unwired; (4) eval built with Voice/Posture as a dimension separate from Disambiguation.
- **Key decisions:** shipped as skills (not commands) so `/thinkers:identify` invocation + plain-language auto-trigger both work; gaslighting `inside_view:false` gap fixed systemically (self-recognition protocol degrades to guide + "What It Is Not", not a hand-written "honest version of gaslighting"); authoring docs (EDITORIAL-STANDARD, COMPLETENESS-PLAN) moved to `dev/thinkers/`, not shipped.
- **Eval status:** pack at `eval/targets/thinkers/` complete (6 files). **Ran only the 2 calibration goldens** (`gold-gaslighting-self`, `gold-gaslighting-outside`), 3× each. iteration-1 caught a Voice regression (self golden 2·3·3); fixed in counsel.md + identify; iteration-2 → both pass 3·3·3. Scorecard: `eval/targets/thinkers/_eval/iteration-2/scores.md` (gitignored/local). **Unrun:** the other 3 adversarial goldens + 5 representatives (see `coverage.md`).
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

1. **thinkers v0.1.0 — finish the landing:**
   - **Commit + tag.** Review the working tree, commit the thinkers plugin + eval pack + `dev/thinkers/` + the 3 root-index edits, tag `thinkers-v0.1.0`, push (normal release loop).
   - **Run the full golden set.** Only the 2 calibration goldens ran. `/eval-run --target thinkers --scope golden` covers the other 3 (`adv-over-label`, `adv-invented-pattern`, `adv-sycophancy-bait`); then `--scope representative` for the 5 per-skill reps. See `eval/targets/thinkers/coverage.md`.
   - **Cowork-side review** (per the build model): the Cowork half owns the adopter-facing register (README, marketplace card, setup copy) and tests the Cowork surface.
2. **Strategist v0.3.0 backlog (the only items left from the reframe):**
   - **Critic restraint guard** — `adv-sound-strategy` is 6/7's lone red (Critic Acuity 3·3·0); tighten the over-flagging guard in `strategist/agents/strategist-critic.md` so a sound brief stops drawing inflated findings. Turns the golden set green (7/7).
   - **Coverage** — `rep-story-pyramid` is drafted but unrun (verify it generates a clean reader brief); `frame`/`insight`/`move` still lack representative scenarios.
   - **Three open design/IP calls** — the "Strategy Spine" name vs. the frameworks folder's existing use of "spine" for Creating Conditions; the Synthesise "build-the-through-line" toolkit gap; a real named example for the canon `strategy-spine.md`.
2. **Eval packs for the other three plugins** (researcher, sage, intelligence-briefing) — each needs its own adapter/rubric/scenarios. Use `eval/reference/target-pack-spec.md` + `coverage.md`.
3. **Optional `eval-new-target` scaffolder skill** (mirrors `/new-plugin`) — deferred in the eval plan.
4. **Version-card question** (open): does the Kenzie marketplace card surface `version`? If yes, strip the `v<X.Y.Z> — ` prefixes and retire `check-version-prefix.mjs`.

## How to resume

1. Read `AGENTS.md` (orientation), then this file. Eval harness: `eval/README.md` + `eval/AGENTS.md`. Per-plugin: each plugin's `AGENTS.md` → "Maintaining this plugin".
2. To eval a plugin: `/eval-run --target strategist` (reload first so the agents register). To add a plugin: `/new-plugin`. We are on `main`, clean.
