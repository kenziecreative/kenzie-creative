# Work state — kenzie-creative-marketplace

**Last updated:** 2026-07-12 · **Session focus:** **researcher v1.5.0 SHIPPED** — merged to main, tagged `researcher-v1.5.0`, pushed. Shipped deliberately with two documented conversational defects (owner's call; the red-golden ship rule was waived on the record). Evidence integrity is clean: 23/23 gates green across four eval iterations.

## Where things stand

- **researcher (1.5.0, BUILT + UNRELEASED)** — branch `convergence/researcher` (worktree `kenzie-build-researcher`). Full [M] scope + Codex pass-2 repairs + this session's fixes. **Golden set: 7 PASS / 2 FAIL.** Deterministic gates green 23/23 for four iterations running. Full account: `researcher/CHANGELOG.md` v1.5.0 — see § "Register work", which states the two open defects honestly.
- **goal-setting (0.2.1)** / **strategist (0.4.1)** — shipped and tagged; standing follow-ups unchanged (see `31531de`). Note: **all three plugins share the same register/machinery-narration defect family.** Researcher has now solved it, and the solution should port: *a doctrine file alone is not enough — each skill's Output section must name what stays backstage.*
- **eval harness** — drift lint (`dev/scripts/lint-doctrine-drift.mjs`) now has a researcher config: 8 stale-phrase guards, 9 reader/writer contracts, C1 copy pinned across all four surfaces. Negative-tested — it goes red on real reverts.

## Done this session

- `dec4b0d` — **waiver persistence fixed** (red golden 1). `research-audit-claims` gained a "Waiver Arriving Between Audits" branch + step 4b (re-audits honor standing waivers). Verified 3/3 twice (iterations 2 and 4). Ships with the drift-lint config.
- `37bbe6a`, `14b6de2` — eval harness batch: adapter scaffolds, three re-seeded scenarios (valve triage, manifest M&L, pinned side labels), judge-persistence protocol baked into `/eval-run`.
- `19dc621` — audit-claims copy: no false "Fixes applied", correct audit-report path spec.
- `b78829e` — **D1 register port** (approved by Kelsey): doctrine file + CLAUDE.md pointer + debrief self-check.
- `56f6a86` — **the register fix that actually worked**: every skill's Output section now points at the doctrine and names what stays backstage; the harness scaffolds the project CLAUDE.md so the doctrine loads at session start as it does in real deployment. Two check-gaps bugs fixed alongside.
- `8921496` — iteration-4 graded (23 runs, all cards persisted).

## In flight / uncommitted

None. **researcher v1.5.0 is SHIPPED** — merged (`7bb06b0`), tagged `researcher-v1.5.0`, pushed to origin/main. Eval artifacts (iterations 1–4) copied from the worktree into `eval/targets/researcher/_eval/` here in the primary checkout; **the `kenzie-build-researcher` worktree is now disposable.**

**The ship was a deliberate waiver of the red-golden rule**, made by the owner with the failures on the record. Rationale: the two remaining defects are conversational, not factual. Evidence integrity — sourcing, traceability, independence, audit gating, contract close — scored full marks on every scenario across four iterations, with 23/23 deterministic gates green each time. A slightly preachy research partner is not a reason to hold a release whose research is sound.

## Next steps (in order)

**Nothing is blocking. researcher is shipped.** The items below are a v1.5.1 backlog — take them or leave them.

1. **v1.5.1: the doctrine carve-out** (~10 lines in `researcher/reference/posture-register.md`). Its **preferred-conclusion-steering** passage fires *after* a user's decision and relitigates it — the record stays clean, but the conversation questions their stated reason. Add: *pushback is spent before the user decides; once a decision is recorded, state its consequence and stop.* Closes both red goldens (`adv-exclusion-visibility`, `adv-confirm-side-override`).
   **Grounding:** `eval/targets/researcher/_eval/iteration-4/scores.md` § "What the fix broke". Two independent judges, two goldens, one diagnosis.

2. **v1.5.1: two self-inflicted skill defects.**
   a. `research-audit-claims` contradicts itself — SKILL.md:365 forbids the mechanical/judgment taxonomy as user vocabulary; SKILL.md:252 prescribes the banned sentence verbatim. Strike the taxonomy clause from :252.
   b. `research-process-source`'s recovery branch was over-tightened ("exactly one line, and nothing more", SKILL.md:31) and beat its own Output block, so the user gets a plumbing receipt and nothing about the source. Restore the summary + NEXT alongside the one-line disclosure.

3. **v1.5.1: de-contaminate the worked examples.** The skills' "Say:" exemplars were written from the **eval scenarios' own content** (check-gaps' example *is* the exclusion golden's opener; cross-ref's *is* the independence golden's line). Runs reproduce them near-verbatim. Three judges flagged it: *"a transcription of the eval's own answer key."* Re-cut onto fact patterns in no golden; prefer descriptive constraints to quotable lines. **Until then, Register on exclusion/unselected/independence is PROVISIONAL** — the trustworthy evidence is `adv-override-disclosure` (0/0/0 → 3/3/2), where no turn is scripted.

4. **Small file-eligible bugs** (deterministic, uncaught by gates): STATE.md `Next Action` goes stale after cross-ref/check-gaps (add a `next_action_fresh` gate); `Cycle step:` contradicts the checkbox state; `process-source` leaves `Sources for current phase` stale; `backstage-tasks.md` has no create-if-absent instruction; adapter/template disagree on `canonical-figures.json` shape; the M&L `Waivers` placeholder evades `draft_no_placeholders`.

5. **Siblings:** goal-setting v0.2.2 + strategist v0.4.2 register patches. **Port researcher's solution** — a doctrine file alone will not fix it; each skill's Output section must name what stays backstage. That lesson cost three eval iterations here; don't re-learn it twice more.

## Open questions / decisions pending

- **Rubric threshold (Kelsey).** The adversarial threshold passes a scenario on its **critical dimensions alone**, with no floor on the rest. Register is critical on only 1 of 9 goldens — so a run can narrate machinery on every line, score Register 0, and still pass a golden blocker. That happened eight times in iteration-3. Options: a Register floor (≥2) on all goldens, or add it to `critical_dimensions` wherever posture is load-bearing.
- **The self-reported-flag ambiguity (Kelsey).** The waiver scenario's seeded standard says self-reported metrics must be "flagged as self-reported wherever cited." Runs read "TargetCo reports $40M ARR" as satisfying it; a stricter reader opens a **second** violation the waiver's scope would not clear. **Same seed, two defensible outcomes — a cross-run determinism hazard on a blocker golden.** Settle it before the next run.
- **Pass-2b** (scoped re-attack on the pass-2 repairs) — staged at `~/Projects/_scratch/kenzie-blind-reviews/researcher/PASS-2B-PROMPT.md`; optional, Kelsey runs.

## Session knowledge worth keeping

- **A doctrine file cannot override an explicit instruction.** The big lesson. D1 shipped a posture doctrine and Register *did not move* — because the skills' own Output templates still *instructed* the machinery narration. The fix was editing the templates. Corollary from the control run: the doctrine reliably transmits the rules it **models with worked lines** (opener, sourced pushback — 3/3) and unreliably transmits the rule it merely **forbids** (rule 7, machinery backstage — 2/1/3). **If a rule matters, demonstrate it; don't just ban its opposite.**
- **The eval could not test D1 until the harness scaffolded the project CLAUDE.md.** In real deployment the doctrine reaches every turn via init's CLAUDE.md pointer. The adapter never wrote that file, so the doctrine was reachable only from audit-claims' debrief — which runs **only on the PASS branch**. Iteration-3's Register numbers were measuring the harness, not the plugin. **When a fix "doesn't work," first check the harness exercises the real delivery path.**
- **Never write eval exemplars from eval fixtures.** It contaminated three of my own measurements this session (next step 3).
- **Two posture rules can be in genuine conflict.** "Pushback sourced" versus "record, never restrict" — and the plugin resolved it the wrong way twice, on two different goldens. Doctrine must say which wins *and when*.
- **Worst-sample sampling keeps earning its cost.** Both new red goldens failed on 1 of 3 samples. Single-sampled, both would have shipped.
- **Judges are read-only** — the orchestrator persists their scorecards from the returned message. Now baked into `/eval-run` Step 4.
- **Eval artifacts (iterations 1–4) live ONLY in this worktree** (`eval/targets/researcher/_eval/`, gitignored). **Do not discard this worktree before copying them to the primary checkout at merge.**
- Codex clean-room copy for researcher: `~/Projects/_scratch/kenzie-blind-reviews/researcher/`.

## How to resume

1. Read `AGENTS.md` (orientation), then this file.
2. Read `eval/targets/researcher/_eval/iteration-4/scores.md` — the grounding doc for every open item. Its "What the fix broke" section is the merge blocker.
3. Work in the `kenzie-build-researcher` worktree on `convergence/researcher`. Next steps 1–3 are all skill-text edits; then re-run the golden set (step 4).
