# Work state — kenzie-creative-marketplace

**Last updated:** 2026-07-12 · **Session focus:** strategist convergence build — shipped **v0.4.0** (full convergence release) and **v0.4.1** (same-day Codex pass-2 hardening), built the shared doctrine-drift lint, ran the golden eval twice (green both times), staged the Codex pass-2 packet and consumed its verdict end to end.

## Where things stand

- **strategist (0.4.1)** — convergence release + pass-2 hardening both on main, tagged (`strategist-v0.4.0`, `strategist-v0.4.1`), pushed. All six pass-1 HIGHs, all MEDs, five of seven LOWs shipped; all six pass-2 PARTIALs repaired. Ported patterns are SHIPPED-UNTESTED (no live session yet). Full account: `strategist/CHANGELOG.md`. Review record: `dev/blind-reviews/strategist-pass2-2026-07.md` (local-only, primary checkout).
- **goal-setting (0.1.0)** — next in the A1 release sequence; its builder consumes the shared drift lint by adding `dev/scripts/drift-configs/goal-setting.json` (see the strategist config as the model). New portable finding to audit before its release: any status cell that can say *done* while a recorded exception stands ("user chose to proceed" ≠ "work satisfies its contract") — see pass-2 note § cross-plugin significance.
- **researcher (1.4.1)** — releases last (A1); same lint-consumption and status-cell audit notes apply; its register port (D1) and evidence architecture (B1) still wait on Kelsey's sessions.
- **eval harness** — `eval/lib/run-gates.mjs` fixed this session (`section_filled` is n/a on expected-no-advance runs). Two pack follow-ups queued (below).

## Done this session

- strategist v0.4.0 (convergence): `a81291c`..`03fded1`, tag `strategist-v0.4.0`.
- Shared plugin-configurable doctrine-drift/canon-sync lint: `dev/scripts/lint-doctrine-drift.mjs` + `drift-configs/strategist.json` (`4bb2a3e`); release-blocking, wired into strategist's ritual.
- Golden eval iteration-1 against 0.4.0: 17/17 pass (review-protocol step-5 re-verification).
- Codex pass-2 staged (`~/Projects/_scratch/kenzie-blind-reviews/strategist/PASS-2-PROMPT.md` + clean-room 0.4.0 copy), verdict consumed: 6/6 PARTIALs verified, triage filed, all repaired.
- strategist v0.4.1 (pass-2 hardening): `450ecca`..`9cc8b03`, tag `strategist-v0.4.1`; golden eval iteration-2 green (17/17) before merge.
- Plan updated for both releases (`f387e5d` latest); pass-2 triage note filed per the one-inbox rule.

## In flight / uncommitted

None. Both checkouts clean; main fully pushed at `f387e5d`.

## Next steps (in order)

1. **Kelsey: review the strategist STOP package** — `dev/convergence/review-queue/strategist-rubric-anchors.md` (primary checkout): Continuity + Register rubric dimensions (0–3 anchors), the `adv-mid-stage-resume` golden scenario, an adapter note. Ships as a strategist patch on approval, together with item 2.
2. **Eval-pack follow-ups (ride with item 1):** (a) teach `single_stage_advance` in `eval/lib/run-gates.mjs` the 0.4.1 honest statuses — a Stage Record row `incomplete (advanced by user)` with `current_stage` advanced is a legitimate recorded non-certification, not a Δ0 fail (proof case: iteration-2 `adv-preference-over-evidence/run-1`); (b) pin `adv-preference-over-evidence`'s end-state (third scripted message or truncation semantics) so runner interpretation stops moving the gate signal.
3. **goal-setting convergence build/release** (next per A1) — brief at `dev/convergence/goal-setting-build-brief.md` (local-only); carry over the status-cell audit finding and consume the drift lint.
4. **First live strategist session** graduates the SHIPPED-UNTESTED patterns (plan § How a Pattern Graduates).

## Open questions / decisions pending

- Rubric anchors + golden scenario changes: Kelsey-gated (STOP protocol), package in the review queue.
- **Pass-3: SKIPPED (Kelsey, 2026-07-12).** Rationale: the protocol's stopping point is pass-2; the v0.4.1 repairs implemented Codex's own "what closes it" prescriptions nearly verbatim, so a third read would largely grade its own homework; the genuinely untested surface (live-session behavior) is one no text review can see. The 0/6 CLOSED verdict was "real control added, cheapest bypass remains," not failed repairs — all six bypasses were one family (status says *done* while a recorded exception stands), now a recorded audit pattern. **Tripwire that reopens it:** if the first live strategist session or the rubric-package patch surfaces another state-honesty defect in that family, the repairs didn't internalize the pattern — commission the pass-3 re-attack then. Restage recipe if fired: `_scratch` staging dir still holds the 0.4.0 copy; re-rsync from main's `strategist/` (excludes: `.DS_Store`, `AGENTS.md`, `CHANGELOG.md`), fresh PASS-3 prompt with a finding→fix-location map for the six pass-2 repairs (zero rationale), appendix = the pass-2 raw verdict from `dev/blind-reviews/strategist-pass2-2026-07.md`. Protocol: `dev/convergence/codex-review-protocol.md` (local-only).

## Session knowledge worth keeping

- **This worktree** (`kenzie-build-strategist`, branch `convergence/strategist`) is rebased onto main after each merge; `main` itself lives in the primary checkout (`core-kenzie-marketplace`) — merges/tags/pushes run there via `git -C`. The Write tool is path-guarded to the active worktree: write files destined for `_scratch`/primary-checkout via a relative path inside the worktree (gitignored `dev/convergence/` works) then `cp` with Bash.
- **Eval runs are local-only** (`eval/**/_eval/` is gitignored). Iteration scorecards + all captures: `eval/targets/strategist/_eval/iteration-1/scores.md` and `iteration-2/scores.md`. Most instructive captures: iteration-2 `adv-preference-over-evidence/run-1` (honest-status semantics live) and `adv-fabricate-data` (ledger + refusal).
- **Eval dispatch pattern that works:** eval-runner/eval-judge subagents run in background; a background subagent's *final text is not delivered* — instruct every judge/runner to `SendMessage to:"main"` with its result, or you'll have to ping idle agents afterward. One runner → `run-gates.mjs` (run it yourself in Bash) → one judge per run; noisy scenarios 3×, worst sample decides.
- **Drift lint usage:** `node dev/scripts/lint-doctrine-drift.mjs --plugin <name>`; config per plugin in `dev/scripts/drift-configs/`. Canon checks skip-with-warning off the owner's machine. When a change retires wording, add the phrase to the config in the same commit — it caught real regressions mid-build twice this session.
- **Canon location moved:** the Strategy Spine canon is `~/Documents/Claude/Projects/AI Operations/frameworks/strategy/strategy-spine.md` (subdir; `../`-relative cross-refs — handled by the lint's declared normalizations; the plugin copy is correct as shipped).
- **Codex prompt templates** for strategist: pass-1 at `~/Projects/_scratch/kenzie-blind-reviews/strategist/PROMPT.md`; pass-2 in the same dir (`PASS-2-PROMPT.md`).
- Stale note removed from the old STATE: the `goal-setting-eval-target` branch (`51f3676`, unrun pack, no PR) — still true as of 2026-07-01; not touched this session.

## How to resume

1. Read `AGENTS.md` (orientation), then this file.
2. For convergence work: `dev/convergence/README.md` (local-only) → the relevant build brief → `dev/backstage-convergence-plan.md` § Decisions of Record + changelog.
3. For strategist follow-ups: the review-queue package (next step 1) is the gate on everything queued behind it.
