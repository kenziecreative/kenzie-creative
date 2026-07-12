# Work state — kenzie-creative-marketplace

**Last updated:** 2026-07-12 · **Session focus:** researcher convergence build — v1.5.0 built end to end (all [M] items + Codex pass-2 repairs), eval pack run (iteration-1: 5 PASS / 2 FAIL / 2 INVALID-AS-SEEDED). **Red golden 1 (waiver persistence) is now FIXED and verified green at 3/3 samples (iteration-2); the harness batch and drift-lint config shipped with it.** **The merge is now blocked by exactly one thing: D1 (red golden 2), which needs Kelsey's voice review.**

## Where things stand

- **researcher (1.5.0, BUILT + UNRELEASED)** — branch `convergence/researcher` (worktree `kenzie-build-researcher`), rebased onto main at `31531de` and pushed. Full [M] scope shipped: deliverable manifest (F4), exclusion ledger (F3), D2 audience-standard gate with named waivers (F2), counter-evidence valve (F7), override disclosure (F6), interruption branch (F8), independence-defaults-to-unknown (F9), progress health-check fix, D3 softenings + consent port, mid-phase debrief + backstage tasks, C1 copy soften. Codex pass-2 consumed same day (8/8 verdicts verified, 0 refuted): all five actionable repairs shipped pre-release — candidate dispositions, derived `user_override`, M&L structural audit gate, independence-basis saturation. All behavior SHIPPED-UNTESTED. Full account: `researcher/CHANGELOG.md` v1.5.0. Reviews: `dev/blind-reviews/researcher-pass2-2026-07.md` (primary checkout, canonical).
- **researcher eval (iteration-1, 2026-07-12)** — pack at `eval/targets/researcher/` (11 scenarios; rubric anchors approved → 1.0.0). Golden run: 23 runs, 22 judged, **0 deterministic gate failures**. Verdicts: 5 PASS / **2 FAIL (red goldens, ship-blockers)** / 2 INVALID-AS-SEEDED. Evidence machinery scored 3.0 across the board; Register averaged ~1.3 (machinery narration everywhere — the measured D1 gap). Scorecard + all captures: `eval/targets/researcher/_eval/iteration-1/` (**local-only, in THIS worktree** — copy to primary at merge, per the goal-setting convention).
- **goal-setting (0.2.1)** — shipped and tagged; standing follow-ups below (eval harness batch, v0.2.2 register patch). Full state in git history of this file (`31531de`) and `goal-setting/CHANGELOG.md`.
- **strategist (0.4.1; rubric 1.2.0)** — shipped; iteration-3 8/8 green; standing follow-ups below (v0.4.2 register patch candidate, annotation-convention pin).
- **eval harness** — shared drift lint exists (`dev/scripts/lint-doctrine-drift.mjs`, strategist-built, plugin-configurable). Researcher's config is NOT yet added (was deferred when the lint didn't exist; it exists now — see next step 4).

## Done this session (researcher builder)

- v1.5.0 built on `convergence/researcher`: commits `575ad91` ([M] scope), `2ddcd1e` (eval pack), `6d25f98` (release metadata + C1), `f4c6a0e` (pass-2 repairs), `6e53f13` (rubric anchors approved). Rebased onto main (`31531de`) at checkpoint; validations + version-prefix check green post-rebase.
- Codex pass-2 staged, run by Kelsey, consumed per protocol; triage filed at the one-inbox path. Pass-2b packet (scoped re-attack on the five repairs) staged at `~/Projects/_scratch/kenzie-blind-reviews/researcher/PASS-2B-PROMPT.md` — optional, Kelsey runs, ideally post-iteration-2.
- STOP items: rubric anchors APPROVED + shipped (rubric 1.0.0). D1 register port still PENDING in the inbox (`core-kenzie-marketplace/dev/convergence/review-queue/researcher-D1-register-port.md`) — now with a failing golden attached.
- Golden iteration-1: 23 blind runs, gates scripted, 22 judge scorecards persisted, `scores.md` written with filing split and harness-fix queue.

## In flight / uncommitted

None uncommitted after this checkpoint. The branch is UNMERGED by design — merge is blocked by the two red goldens (next steps 1–3), not by the A1 slot (open).

## Next steps (in order)

1. ~~**Fix the waiver-persistence defect**~~ **DONE** (`dec4b0d`) and **verified green** (`19dc621`, iteration-2). `research-audit-claims` gained a "Waiver Arriving Between Audits" branch (validate → scope → record in all three loci → hand the re-run back) plus step 4b (re-audits honor standing waivers). Re-ran the golden at 3 samples: **3/3 PASS**, both criticals at 3 in every sample, Record-Never-Restrict 0 → 3. **Red golden 1 is cleared.** Scorecard: `eval/targets/researcher/_eval/iteration-2/scores.md`.
2. **Kelsey: review + ship D1** (red golden 2, `adv-independence-unknown`) — **now the ONLY thing blocking the merge.** The drafted register port in the inbox is the fix: doctrine file + CLAUDE.md pointer + debrief register check, wiring plan in the draft. Two independent measurements behind it now: iteration-1's failing golden, and Register scoring 0–1 in all three iteration-2 samples. Two judges noted the audit skill *itself* mandates some of the machinery narration, so D1 must rewrite skill copy, not just add doctrine (the waiver fix's own verification language likely made this marginally worse — an honest cost, and D1's to sweep up).
3. ~~**Iteration-2 harness batch**~~ **DONE** (`37bbe6a`, `14b6de2`), except (f). (a) manifest re-seeded with a truthful M&L so the audit reaches the PASS branch where the manifest probe lives; (b) side labels pinned (side-A = FlowCo 40%, side-B = Forrester 12–18%, suggested = side-B) so `confirm: side-A` actually contradicts; (c) valve **re-seeded AND broadened** per Kelsey's call — per-URL triage dispositions make the stamp supportable, and must_include #4 now credits an honest refusal that names what the record lacks; (d) adapter scaffolds `source-standards.md` + `writing-standards.md`; (e) judge-persistence protocol baked into `/eval-run` Step 4. **(f) still open:** grade the missing `adv-independence-unknown/run-3` card — folds into the next full run.
4. ~~**Add researcher's drift-lint config**~~ **DONE** (`dec4b0d`). `dev/scripts/drift-configs/researcher.json`: 8 stale-phrase guards, 9 reader/writer contracts, C1 copy pinned across all four surfaces (including `plugin.json` and the marketplace catalog, which `requiredSections` can reach). Negative-tested: goes red on reverts of the waiver branch, the F9 independence qualifier, and the C1 copy.
5. **Re-run the FULL golden set** once D1 lands — not just the reds. Three scenarios were re-seeded and have never been validly exercised (valve, manifest, confirm-side-override), and two audit-claims copy repairs (`19dc621`) are so far unexercised. All green = merge unblocked.
6. **Merge + tag `researcher-v1.5.0`**: slot is open; protocol = re-validate on the branch → merge to main → validate again → tag → push main + tag. Then copy `_eval/iteration-1..N/` to the primary checkout (canonical) and mark this worktree disposable.
7. **Decide the self-reported-flag ambiguity** (new, from iteration-2). The waiver scenario's seeded standard says self-reported metrics must be "flagged as self-reported wherever cited." All three runs read the draft's "TargetCo reports $40M ARR" as satisfying it and documented that judgment on the record. Defensible, and harmless here (nothing promoted) — but whether a *second* violation was intended is the author's call. Settle it before the next full run so the golden tests one violation or two by intent, not by accident.
8. Standing sibling follow-ups (unchanged from previous checkpoint, see `31531de` for detail): goal-setting eval-harness batch + v0.2.2 register patch; strategist v0.4.2 register patch + annotation-convention pin; Kelsey's two goal-setting eval decisions. Note: all three plugins show the SAME register/machinery-narration defect family — the three register patches (goal-setting v0.2.2, strategist v0.4.2, researcher D1) are one pattern and could ship as one pass.

## Open questions / decisions pending

- **D1 register port** — Kelsey's voice review (next step 2). The draft's two open questions (cycle-step tripwire line; whether to port BC's typography layer) are stated in the draft header.
- **Valve golden must_include #4** — accept the honest-refusal stamp as a valid outcome, or re-seed for a clean empty search? Judge-3's adjudication (run-3 scorecard) argues refusal was the MORE honest behavior; my recommendation is re-seed AND broaden.
- **Pass-2b (scoped re-attack on the five pass-2 repairs)** — staged, optional, Kelsey runs; recommended after iteration-2 is green.
- Standing: goal-setting eval decisions (see `31531de`).

## Session knowledge worth keeping

- **Researcher eval artifacts live ONLY in this worktree** (`kenzie-build-researcher/eval/targets/researcher/_eval/iteration-1/`, gitignored) until copied to primary at merge. Do not discard this worktree before the copy.
- **Judge persistence confirmed as a protocol requirement** (matches the goal-setting session's finding): eval-judge agents are read-only; ask for the scorecard in the final message AND expect to ping idle judges — one card (indep-3) was unrecoverable this run; its scenario's verdict was already settled by worst-sample.
- **Worst-sample rule earned its cost again:** the waiver defect appeared in 1 of 3 samples; single-sampled, it would have shipped.
- **The A1 ordering paid off in data:** researcher consumed the strategist-built lint (pending config) and the judge/adapter lessons from both siblings' eval runs; its two seed defects (manifest M&L, confirm side-labels) were both caused by scenarios authored BEFORE the pass-2 repairs changed the plugin's behavior — re-validate seeds after any repair that adds a gate.
- **Codex staging for researcher:** clean-room copy current to the pass-2-repaired v1.5.0 at `~/Projects/_scratch/kenzie-blind-reviews/researcher/` (PROMPT.md pass-1, PASS-2-PROMPT.md, PASS-2B-PROMPT.md).
- One-inbox rule honored: pass-2 triage + both STOP drafts live in the primary checkout (`core-kenzie-marketplace/dev/blind-reviews/`, `.../dev/convergence/review-queue/`); the D1 draft is the only inbox item still open.

## How to resume

1. Read `AGENTS.md` (orientation), then this file.
2. For the researcher work (next steps 1–6): work in the `kenzie-build-researcher` worktree on branch `convergence/researcher`; read `eval/targets/researcher/_eval/iteration-1/scores.md` first — it is the grounding doc for every open item.
3. For convergence work generally: `dev/convergence/README.md` (local-only) → the relevant build brief → `dev/backstage-convergence-plan.md` § Decisions of Record + changelog.
