# Work state — kenzie-creative-marketplace

**Last updated:** 2026-07-12 · **Session focus:** intelligence-briefing rebuild **designed**. The v1.0.0 build spec is written, complete, and passes STOP A. **Nothing in it is open. The next session is the Fable 5 build.**

## Where things stand

- **intelligence-briefing (0.3.0 → 1.0.0)** — **SPEC COMPLETE, BUILD PENDING.** Branch `review/intelligence-briefing`. The build spec is `dev/rebuild/intelligence-briefing-v1-build-spec.md` (committed, not gitignored — unlike `blind-reviews/` and `convergence/`). It is self-contained: a fresh agent builds from it with no conversation. All four previously-open decisions are locked (see below). **The next action is a model switch, not more design.**
- **strategist (0.4.1)** — convergence release + pass-2 hardening on main, tagged and pushed. Ported patterns SHIPPED-UNTESTED (no live session yet). Full account: `strategist/CHANGELOG.md`.
- **goal-setting (0.2.1)** — SHIPPED 2026-07-12. Rubric anchors calibrated; nothing open on Kelsey. Next verification step: first golden-set run (`/eval-run --target goal-setting`).
- **researcher (1.4.1)** — releases last (A1). Register port (D1) and evidence architecture (B1) still wait on Kelsey's sessions.
- **eval harness** — two pack follow-ups queued. No eval target exists for intelligence-briefing; one is a rebuild deliverable, not a prerequisite.

## Done this session

- **Read the one real brief this product ever produced** (`~/Projects/_shared/Core Intelligence/briefs/2026-06-07.html`, run once, 2026-06-07, never again — Kelsey paused it because the shape needed changing, not because it was useless). **This reframed the entire rebuild.**
- **The reframe, which is the load-bearing insight of the session:** the product already produces intelligence and throws it away every morning. The synthesis paragraph is a driver, born and killed the same day. The "Watch for" line is a signpost with a due date that nobody ever checks. The relevance judgment is written and discarded. The brief writes the *intelligence* into HTML for a human and writes a *shopping list* into the ledger for itself. **The rebuild is not "add an intelligence layer." It is "stop discarding the one you already produce."**
- **Tier 3 resolved:** build the loop (observation → driver → re-decision), do not build the products that read from it. Falsifiers first, drivers as plumbing (never a dashboard), the review conversation as the trust mechanism, the reckoning in. Estimates and the I&W apparatus cut **on value, not cost**.
- **Two Codex-assumed surfaces designed:** the review conversation (§7) and requirements-depth-without-a-form (§8).
- **Strategic Foresight interop designed** (§10): export **drivers, not observations**; foresight's driver vocabulary adopted verbatim so the handoff is lossless.
- **Build spec written** to `dev/rebuild/intelligence-briefing-v1-build-spec.md`, 14 sections, narrative first.
- **Spec audited against a Fable-5 whole-job-handoff rubric** and a real defect was found and fixed (see Session knowledge).
- **No plugin code changed.** Working tree was clean at `969bed5`; only the spec and this file are new.

## In flight / uncommitted

None. The spec is committed. `review/intelligence-briefing` is clean.

## Next steps (in order)

1. **STOP A → BUILD (Fable 5).** Clear context, switch model to **Fable 5**, set **effort `high` or `xhigh`**, stay on `review/intelligence-briefing`. Then paste the opening turn below. **Do not try to steer it conversationally.** Expect minutes-long turns; that is normal, not a hang.
2. **STOP B → verify (Opus 4.8).** Switch back. Read `dev/rebuild/BUILD-REPORT.md` **first** — the build is required to write it, and it is the only record of every judgment call Fable made where the spec left room. Then verify against the ten-point review standard in the spec's THE HANDOFF section. Then release (v1.0.0, tag `intelligence-briefing-v1.0.0`).
3. **Stage the pass-2 disclosed re-attack** against the *rebuilt* architecture per `dev/convergence/codex-review-protocol.md`. Re-rsync the clean-room packet from the rebuilt plugin into `~/Projects/_scratch/kenzie-blind-reviews/intelligence-briefing/`; do not create a parallel staging dir. Codex attacking a coverage matrix, a thread registry, and observation-backed re-derivation is a far more valuable review than attacking bolt-ons.
4. **Kelsey: strategist STOP package** — `dev/convergence/review-queue/strategist-rubric-anchors.md`, plus two eval-pack follow-ups (`single_stage_advance` must accept 0.4.1's honest statuses; pin `adv-preference-over-evidence`'s end-state).
5. **goal-setting: first golden-set run.** Nothing gates it.

## Opening turn for the Fable 5 build session

**Copy-paste this verbatim after clearing context, switching to Fable 5, and setting effort.** The spec carries everything; the prompt does not need to.

```
Build intelligence-briefing v1.0.0.

Read dev/rebuild/intelligence-briefing-v1-build-spec.md in full, starting with THE HANDOFF
section — it names the outcome, the source pack you must read before writing anything, your
tool access, the boundaries, the review standard, the proof trail, and what to do when you
hit something the spec doesn't settle.

Read the whole source pack it names, including the one real brief the product ever produced.
That artifact is the reason Section 2 exists.

Two constraints will feel wrong and are not negotiable. Section 2 is a do-not-touch list.
Section 11 is a do-not-build list. Both are product decisions with the reasoning written
down, not scaffolding. If you find yourself about to improve past either one, stop and write
it in the build report instead.

Stay on the current branch. Write dev/rebuild/BUILD-REPORT.md as you go. Run the ten-point
review standard before you tag.
```

## Open questions / decisions pending

- **Nothing is open on the intelligence-briefing spec.** All four decisions locked by Kelsey 2026-07-12: **version `1.0.0`**; **`required_frequency_days` default 7** (1–3 offered at setup for fast cells); **reckoning interval 30 days**; **zone → STEEP table approved as drafted**.
- **The no-subagent lock's scope** (recorded, not changed): it binds *collection*, and its stated rationale is web access. It says nothing about *analysis*. The v1 spec still uses no subagents anywhere — re-derivation from captured evidence made the verifier subagent unnecessary — but a future maintainer should know the lock reads narrower than it has been read.
- Strategist rubric anchors + golden scenario changes: Kelsey-gated, package in the review queue.
- **Strategist pass-3: SKIPPED** (Kelsey, 2026-07-12). Rationale and reopening tripwire in git history (`66fd768`).

## Session knowledge worth keeping

- **The June 7 brief is the most important artifact in this workstream and it was nearly missed.** Design was proceeding on theory until Kelsey pointed at `~/Projects/_shared/Core Intelligence/briefs/2026-06-07.html`. **Never design a rebuild without reading the thing's actual output.** The whole "stop discarding what you already produce" reframe came from that one file.
- **`Held beliefs: [empty]` in the one real deployment** — the single config field that would have enabled the disconfirming slot, left blank *by the person who built the plugin, in his own deployment*. That is the strongest available evidence that **config-as-form does not get filled in**, and it is why v1 deepens requirements through the review conversation rather than an intake template.
- **A driver is a force, not a decision.** The setup input is a *standing mandate* ("I am tracking what is impacting compliance for our market and clients, and how that might drive implementation approaches") — no options, no closing date. Deriving Priority-Intelligence-Requirement-style *decision questions* from it is wrong and was corrected mid-session. Foresight had this right: *"'Automation Pressure' is a driver; 'Jobs Disappear' is an outcome."*
- **Spec defect found by auditing against a Fable-5 whole-job rubric, worth repeating on future build specs:** the spec told the *skills* "never shell," and separately told the *builder* to run `claude plugin validate`. A careful agent would have read the first rule as binding on itself and refused to validate its own work. **Always disambiguate runtime rules from build rules in a one-shot spec.** The same audit surfaced four missing whole-job fields (tool access, review standard, proof trail, human gate) — all now in THE HANDOFF section.
- **Export drivers, not hits.** Foresight's scan hit is a 21-field *human judgment form* with a two-minute entry rule; an observation is a *machine capture*. Forcing a hit-level match would require fabricating the 0–5 ratings and composite score that were deliberately rejected. The *driver* schemas already nearly match, which is why v1 adopts foresight's `direction` / `certainty` / `time_horizon` vocabulary verbatim.
- **`dev/rebuild/` is NOT gitignored** (unlike `dev/blind-reviews/` and `dev/convergence/`). The build spec and build report are repo history on purpose — they are build artifacts, not candid defect lists.
- **The clean-room packet for pass 2** must be re-rsynced from the *rebuilt* plugin: `~/Projects/_scratch/kenzie-blind-reviews/intelligence-briefing/`. Do not create a parallel staging dir.
- Prior sessions' knowledge (worktree path guard vs. the one-inbox rule, Codex's heading-offset citation quirk, eval dispatch pattern, drift-lint usage, canon location) is unchanged — see `969bed5` and `66fd768` in git history.

## How to resume

1. Read `AGENTS.md` (orientation), then this file.
2. **If the next action is the build:** you are at STOP A. Clear context, switch to Fable 5, set effort, and paste the opening turn above. Do not start designing again — the spec is closed.
3. **If the build has run:** read `dev/rebuild/BUILD-REPORT.md` before anything else, then verify against the review standard in the spec's THE HANDOFF section.
4. Grounding docs, in order of authority: `dev/rebuild/intelligence-briefing-v1-build-spec.md` (the build contract), `dev/blind-reviews/intelligence-briefing-pass1-2026-07.md` (why the rebuild exists; nine design decisions), `intelligence-briefing/AGENTS.md` (locks).
