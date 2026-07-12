# Work state — kenzie-creative-marketplace

**Last updated:** 2026-07-12 · **Session focus:** intelligence-briefing v1.0.0 **BUILT, VERIFIED, TAGGED, PUSHED**. Pass-2 packet staged. **The next action is Kelsey running Codex pass 2.**

## Where things stand

- **intelligence-briefing (1.0.0)** — **SHIPPED on branch `review/intelligence-briefing`**, tag `intelligence-briefing-v1.0.0` (commit `0bc256c`), branch + tag pushed to origin. Built by Fable 5 in one session from `dev/rebuild/intelligence-briefing-v1-build-spec.md`; proof trail in `dev/rebuild/BUILD-REPORT.md` (read it first — §2 has every judgment call, §7 the STOP B outcome). All ten review-standard points pass. **Caveat of record: STOP B ran in the build session at Kelsey's direction** (builder checked its own work; it hunted the pass-1 failure family and found/fixed four read-by-nobody gaps, commit `0bc256c`). The independent check is pass 2. **Not yet merged to main** — that call follows the pass-2 verdict.
- **strategist (0.4.1)** — convergence release + pass-2 hardening on main, tagged and pushed. Ported patterns SHIPPED-UNTESTED (no live session yet). Full account: `strategist/CHANGELOG.md`.
- **goal-setting (0.2.1)** — SHIPPED 2026-07-12. Rubric anchors calibrated; nothing open on Kelsey. Next verification step: first golden-set run (`/eval-run --target goal-setting`).
- **researcher (1.4.1)** — releases last (A1). Register port (D1) and evidence architecture (B1) still wait on Kelsey's sessions.
- **eval harness** — two pack follow-ups queued. No eval target exists for intelligence-briefing; one is a v1.x deliverable now that the rebuild has shipped (the spec deliberately excluded it from the build).

## Done this session

- **intelligence-briefing v1.0.0 built** per the spec, one pass: three skills (environmental-scan / environmental-briefing / intelligence-review), the `intel/` state layer (observations with `captured_evidence`, drivers with append-only confidence logs, signposts, threads, coverage matrix, run records, feedback), `/brief` chaining scan→brief, `/intel-export`, re-derivation verification, the reckoning, the two text-only fixes (action gate identical in three places; README breadth claim earned). §2 preserved; every §11 item absent.
- **STOP B verification** (same-session, caveat above): four gaps in the read-by-nobody/written-by-nobody family found and fixed (`0bc256c`); validation green at both scopes; tag moved to the fix commit; branch + tag pushed.
- **Pass-2 packet staged** per `dev/convergence/codex-review-protocol.md`: clean-room copy refreshed at `~/Projects/_scratch/kenzie-blind-reviews/intelligence-briefing/plugin/` (11 files, narrative stripped, leak-grepped); `PASS-2-PROMPT.md` written (break-the-repairs, finding→fix map zero-rationale, Finding 8 disclosed NOT addressed, §11 locks disclosed, raw pass-1 verdict appended).

## Next steps (in order)

1. **Kelsey: run Codex pass 2.** Fresh Codex context. Packet: `~/Projects/_scratch/kenzie-blind-reviews/intelligence-briefing/PASS-2-PROMPT.md` + `plugin/`. Paste the verdict back into a session for consumption.
2. **Consume the verdict** per the protocol pipeline: verify every citation both directions, triage against `intelligence-briefing/AGENTS.md` locks (collisions are price tags, not work), file the note to `/Users/kelseyruger/Projects/_shared/core-kenzie-marketplace/dev/blind-reviews/intelligence-briefing-pass2-2026-07.md` (ONE INBOX — absolute path, not this worktree), repairs ship as a normal release.
3. **Merge to main** (in `core-kenzie-marketplace`) when Kelsey is satisfied with the pass-2 outcome — installers pull main, so this is the real ship.
4. **Build the intelligence-briefing eval pack** (golden set + rubric) — now unblocked; grade behavior (health line always present, degraded ≠ quiet, no padding), never recommendation correctness.
5. **Kelsey: strategist STOP package** — `dev/convergence/review-queue/strategist-rubric-anchors.md`, plus two eval-pack follow-ups (`single_stage_advance` must accept 0.4.1's honest statuses; pin `adv-preference-over-evidence`'s end-state).
6. **goal-setting: first golden-set run.** Nothing gates it.

## Open questions / decisions pending

- **Pass-2 verdict** — everything intelligence-briefing now waits on it (merge to main, any v1.0.1 repairs).
- **Finding 8 (relevance-context staleness) is deliberately open** — not in the build spec, disclosed as unaddressed in the pass-2 prompt. If pass 2 re-confirms it against v1, the fix shape from pass-1 triage stands: record-don't-restrict (a `Context confirmed:` stamp + an age line in the brief past a threshold).
- **Build-report watch list** (judgment calls that might prove wrong in use): proposals living in `drivers.json`; export-time-only STEEP with null stored fields; the run-record `reckoning: true` flag; active-only export. See BUILD-REPORT §2.
- Strategist rubric anchors + golden scenario changes: Kelsey-gated, package in the review queue.
- **Strategist pass-3: SKIPPED** (Kelsey, 2026-07-12). Rationale and reopening tripwire in git history (`66fd768`).

## Session knowledge worth keeping

- **The one-shot build held, but the post-build sweep still earned its keep:** four real gaps survived a spec-faithful build, all in the family pass-1 taught (config read by no step; schema field written by nobody). **On any future one-shot build, run that family sweep before tagging** — it found what the ten-point checklist could not.
- **The worktree path guard blocks Write/Edit outside this repo, including the scratch staging dir.** The ONE INBOX rule still governs; place scratch files via bash (`cat > path <<'EOF'`) — that's how PASS-2-PROMPT.md landed. (Known tension, previously recorded at `969bed5`.)
- **The pass-2 appendix is Codex's RAW verdict only** — never the triage note, which carries internal vocabulary and Kelsey's design decisions the reviewer must not see.
- **Spec-defect patterns worth repeating on future build specs** (all hit this build, all had conservative completions): a record consumed by three sections but defined by none (proposals); a schema example contradicting a lifecycle rule (STEEP populated vs export-time-only); a trigger with no persistence (the reckoning's "30 days since last"); "empty forms" colliding with "setup seeds content." Full list: BUILD-REPORT §3.
- **The June 7 brief remains the most important artifact in this workstream** — the rebuild exists because the machine wrote the intelligence into HTML for the human and kept a shopping list for itself. Never design a rebuild without reading the thing's actual output.
- Prior sessions' knowledge (worktree path guard vs. one-inbox, Codex's heading-offset citation quirk, eval dispatch pattern, drift-lint usage, canon location) is unchanged — see `969bed5` and `66fd768` in git history.

## How to resume

1. Read `AGENTS.md` (orientation), then this file.
2. **If the pass-2 verdict is in hand:** run the consumption pipeline (protocol §"Consuming the verdict"); the triage note files to the core checkout by absolute path.
3. **If not:** nothing on intelligence-briefing is actionable except the eval pack (next step 4); the other plugins' queues stand.
4. Grounding docs, in order of authority: `dev/rebuild/intelligence-briefing-v1-build-spec.md` (the build contract), `dev/rebuild/BUILD-REPORT.md` (what was actually built and every judgment call), `dev/blind-reviews/intelligence-briefing-pass1-2026-07.md` (why the rebuild exists), `intelligence-briefing/AGENTS.md` (locks).
