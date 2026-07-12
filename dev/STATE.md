# Work state — kenzie-creative-marketplace

**Last updated:** 2026-07-12 · **Session focus:** goal-setting convergence build — shipped **v0.2.0** (waves 1–3 + Codex pass-2 repairs) and **v0.2.1** (approved F1/F2 playbook release), consumed pass-2 end to end, calibrated the golden-set rubric, and ran eval iteration-1 (6/10 green; triage complete).

## Where things stand

- **goal-setting (0.2.1)** — convergence release + F1/F2 playbook release both on main, tagged (`goal-setting-v0.2.0`, `goal-setting-v0.2.1`), pushed. All [M] items shipped incl. heartbeat/return, immutable history + closeout gate, per-goal pulse with unknown/mixed, operated mitigations, restart state machine (typed flags), critic memory, provenance valve, fourth-goal backlog, goal contract + countermetric, drift-lint config, systems-as-experiments + 7-way differential (F2), reconciled diagnosis (F1). Pass-2: 2 CLOSED · 5 PARTIAL · 1 OPEN, all bypasses repaired same-day; F7 full-enforcement filed as a collision with the advisory lock. All ported patterns SHIPPED-UNTESTED (no live session yet). Full account: `goal-setting/CHANGELOG.md`. Review records: `dev/blind-reviews/goal-setting-pass2-2026-07.md`. Both STOP drafts approved and closed (playbook F1/F2; rubric anchors → rubric v1.0.0).
- **goal-setting eval (iteration-1, 2026-07-12)** — **6/10 goldens PASS.** Of the 4 reds: **1 real plugin defect** (42-day-return: two register misses across samples — a "state file" backstage leak and an "either is fine" routing hedge); **3 harness-caused** (out-of-order + closeout scripts end one turn before the confirm-before-capture gate can close; goal-vs-system seed predates the F2 experiment-terms schema). Zero plugin gate failures on valid runs. Pass-2 repairs went 9-for-9 across samples (fired-mitigation, restart-exit, critic-memory). Scorecard + full triage: `eval/targets/goal-setting/_eval/iteration-1/scores.md` (**local-only, in the `kenzie-build-goal-setting` worktree** — see Session knowledge).
- **strategist (0.4.1)** — unchanged this session. Convergence + pass-2 hardening shipped previously; STOP package (rubric anchors + continuity golden) still awaiting Kelsey (their next step 1 below). Pass-3 skipped with a recorded tripwire (see Open questions).
- **researcher (1.4.1)** — releases last (A1). Consumes the drift lint + copies the goal-setting eval-scaffold shape. Carry-over lessons for its builder (recorded in the plan § goal-setting): typed state for every ported state machine; the return protocol must ride the read-only/status entry point too.
- **eval harness** — strategist follow-ups still queued (their item 2 below). New goal-setting-found defects queued in next step 1 here.

## Done this session

- goal-setting v0.2.0 (convergence, waves 1–3): branch `convergence/goal-setting`, merged at `220b8e5`, tag `goal-setting-v0.2.0`. Includes same-day Codex pass-2 repairs (`98b075d`) and the drift-lint config (`86d03b7`).
- Codex pass-2 staged + consumed (10/10 citations verified, 0 refuted; two builder misses caught that the internal sweep missed). Triage filed per one-inbox rule: `dev/blind-reviews/goal-setting-pass2-2026-07.md`.
- goal-setting v0.2.1 (F1/F2 approved as drafted): merged at `2df2e72`, tag `goal-setting-v0.2.1`. Playbook diagnosis reconciled; systems-as-experiments + 7-way differential shipped playbook+skills+schemas in one touch; 4 retired binary phrasings added to the drift lint same commit.
- Rubric anchors calibrated (all five questions resolved as recommended) → `eval/targets/goal-setting/rubric.md` v1.0.0, DRAFT banner removed (`0a6e50f`).
- Golden eval iteration-1: 24 runs (7 noisy ×3 + 3 single; 1 blindness-breached run excluded and cleanly re-run), gates scripted, 24 judge verdicts, scorecard written with filing split.
- F3 claim-softening sweep + C3 promise reconciliation shipped inside v0.2.0.

## In flight / uncommitted

None. Both checkouts clean; main fully pushed at `66fd768` + this checkpoint commit. All eval subagents idle/terminated; no background processes.

## Next steps (in order)

1. **goal-setting eval harness batch** (maintainer-executable, ~1 session): (a) gates.json — make `revision_preserves_original` conditional (only meaningful when a revision occurred; false-failed 3 runs), teach `journal_dated_entry`/`single_stage_advance` the confirm-gate-open/refusal case or set `expected_no_advance` semantics per scenario, `journal_dated_entry` n/a for Setup entries; (b) scenarios.jsonl — add one confirming user turn each to `adv-out-of-order`, `adv-closeout-gate`, `adv-fourth-goal-swap` (all three end one turn before the tested write is reachable — unanimous judge finding); (c) re-seed `adv-goal-vs-system` System with F2 experiment terms (hypothesis/lag/min-duration/dose/decision-rule); (d) adapter.md — stage `scenario-full.json` OUTSIDE runner working dirs (blindness breach root cause). Grounding: `scores.md` § Filing split, items 1–5.
2. **goal-setting v0.2.2 register patch** (maintainer-executable, small): heartbeat.md §5 — add the two leaked forms as tripwires ("the state file", internal classification labels shown raw → require the plain gloss, e.g. "too early to call" not `insufficient_time`); heartbeat.md §4 ~6-week row — de-hedge ("recommend the restart plainly; the user may decline, but don't bless skipping it as equally fine"). Then release ritual + re-run iteration-2 for a clean baseline. Grounding: `scores.md` § Filing split, items 6–7.
3. **Kelsey (goal-setting, from the eval):** (a) differential stall vs. provisional classification when lag data is missing (goal-vs-system r3 — judges split); (b) one-line pulse clarification for paused-system Objectives during restart. Both in `scores.md` § surface-for-decision.
4. **Kelsey (strategist, unchanged):** review the strategist STOP package — `dev/convergence/review-queue/strategist-rubric-anchors.md`; ships as a strategist patch together with the strategist eval-pack follow-ups (single_stage_advance honest statuses; pin adv-preference-over-evidence end-state).
5. **researcher convergence build** (last per A1): brief at `dev/convergence/researcher-build-brief.md` (local-only); copies the goal-setting eval-scaffold shape; carries the typed-state and read-only-entry-point lessons.
6. **First live sessions** graduate the SHIPPED-UNTESTED patterns for strategist and goal-setting (plan § How a Pattern Graduates).

## Open questions / decisions pending

- Goal-setting eval decisions (next step 3) — Kelsey.
- Strategist STOP package (next step 4) — Kelsey.
- **Strategist pass-3: SKIPPED (Kelsey, 2026-07-12)** with tripwire: another state-honesty defect in the "status says done while a recorded exception stands" family (live session or rubric patch) reopens it. Restage recipe in the previous STATE (git history, `e648b20^`) and `dev/convergence/codex-review-protocol.md`.
- **Goal-setting pass-3: not scheduled** (protocol stops at pass-2). The golden set is now the standing instrument; the F2 systems-as-experiments sections are new method surface — if a fresh external read is ever wanted, that's the surface to point it at.

## Session knowledge worth keeping

- **The goal-setting worktree is now disposable:** `kenzie-build-goal-setting` (branch `convergence/goal-setting`) is fully merged, and the gitignored eval run was copied to the primary checkout at this checkpoint — `eval/targets/goal-setting/_eval/iteration-1/` (scorecard + all 25 captures, ~1.2M) now exists in BOTH checkouts; the primary copy is canonical. The local-only `dev/convergence/` docs also exist in both.
- **Eval dispatch pattern (goal-setting run, confirming the strategist notes):** eval-judge agents are read-only (Read/Grep/Glob) — never ask them to write files; their deliverable is their final message, and background finals aren't auto-delivered, so instruct SendMessage-to-main up front or ping idle agents after. Stage the runner dir with the blind slice ONLY (`scenario-full.json` in the run dir caused one blindness breach → excluded + re-run).
- **Runner date-pinning fights the harness:** mid-run system date-change reminders reached runners; the adapter's `setup.today` pin must win (both affected runners handled it correctly and flagged it).
- **Worst-sample rule earns its cost:** 42-day-return passed 1 of 3 samples; single-sampled it would have shipped a register defect. The two register leaks matched no drift-lint tripwire — text lints can't catch spoken-register defects; only the eval (and live use) can.
- **Codex prompt templates** for goal-setting: `~/Projects/_scratch/kenzie-blind-reviews/goal-setting/PROMPT.md` (pass-1) + `PASS-2-PROMPT.md`; clean-room copy there is current to v0.2.1.
- Stale note carried: the old `goal-setting-eval-target` branch (`51f3676`, unrun pack, no PR) is superseded by the shipped `eval/targets/goal-setting/` — safe to delete the branch whenever.

## How to resume

1. Read `AGENTS.md` (orientation), then this file.
2. For the eval-harness batch + v0.2.2 patch (next steps 1–2): read `eval/targets/goal-setting/_eval/iteration-1/scores.md` in the goal-setting worktree first — it is the grounding doc for both.
3. For convergence work generally: `dev/convergence/README.md` (local-only) → the relevant build brief → `dev/backstage-convergence-plan.md` § Decisions of Record + changelog.
