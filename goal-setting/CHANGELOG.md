# Changelog — goal-setting

All notable changes to the Goal Setting plugin. Per-plugin semver; tags are plugin-scoped
(`goal-setting-vX.Y.Z`).

## 0.2.0 — 2026-07-12

The convergence release: the Ongoing Arc gets the operating machinery the 2026-07 blind
review and re-audit showed it was missing. **Every ported pattern in this release is
SHIPPED-UNTESTED** (Brand Compass provenance noted per item; nothing graduates until a
live engagement exercises it).

### Shipped

- **The operating heartbeat + the return** (H1+H2; consolidates blind F1/F4/F6) —
  SHIPPED-UNTESTED, ported from Brand Compass resume (PROVEN there). New
  `reference/heartbeat.md`, applied at Step 0 of every skill: files-win-over-chat trust
  order, stance restoration (Working Dynamic now read by *every* skill, not just Setup),
  additive state migration, and overdue-cadence routing (missed pulse → offer; several →
  recovery check; ~6 weeks → Restart Protocol; quarter boundary → closeout gate; fired
  mitigation → surfaces immediately). `templates/CLAUDE.md` gains a session-start block.
  Setup now **designs the cadence triggers with the user** at the pre-mortem close — the
  playbook's own trigger test applied to the method itself. The PreCompact staleness
  hook's message re-addressed to the agent (register-leak fix, invariant 3).
- **Immutable goal history + quarterly closeout** (H3; blind F3; invariant 11) —
  SHIPPED-UNTESTED. New `goals/history.md`; every KR/Objective revision appends a record
  preserving the original target + actual at change + reason; quarter-end forces a
  disposition (achieved / missed / abandoned / superseded + lessons) per outgoing
  Objective **before** replanning opens; the schema's closed statuses finally get set.
- **Per-goal weekly records + explicit UNKNOWN** (H4; blind F5a; invariant 7) —
  SHIPPED-UNTESTED. One executed/progressing pair per Objective (still five minutes); a
  half-answer records `unknown`, never an inference.
- **Operational mitigations** (M6; blind F6; checklist row 12) — SHIPPED-UNTESTED. Fuller
  Mitigation schema (monitored signal, threshold, check frequency, owner, deadline,
  response evidence); weekly pulse sweeps weekly-frequency triggers, monthly sweeps all;
  a fired trigger surfaces at the next invocation via the heartbeat, ahead of routine work.
- **Restart state machine** (M7; blind F4) — SHIPPED-UNTESTED. lapsed → stabilizing →
  reintroducing → ongoing with a criterion per transition; the weekly pulse evaluates the
  two-clean-weeks hold, reactivates paused systems one at a time, and restores
  `mode: ongoing`. Two-moment recovery kept (resume first, diagnose after one clean week).
- **Critic memory** (M8; blind F2 survivor) — SHIPPED-UNTESTED. Every pressure-test
  dispatch carries prior findings + dispatch history; findings get an open/resolved/
  recurring lifecycle; reworded ≠ resolved. Memory extension only — the
  formulation-not-truth remit is untouched.
- **Provenance valve on the Self-Audit** (M9; blind F8) — SHIPPED-UNTESTED, ported from
  Brand Compass 4.2.0. Naming the relatively weakest answer is mandatory; challenging it
  requires provenance in the user's material; "named, graded sound" is a legitimate
  recorded outcome.
- **Out-of-order completion marking** (M11; blind F7; invariant 11) — SHIPPED-UNTESTED.
  Advisory-not-blocking stays; the jump now records `complete (out of order — X pending)`,
  surfaced by `/goal-setting:progress`, reconciled when the dependency lands.
- **Fourth-goal protocol** (Decision F4; invariant 11) — SHIPPED-UNTESTED. The refusal
  semantics are unchanged; the refused candidate lands in a Candidate Backlog with an
  explicit swap/defer/reject decision, a swap requiring formal closure of the displaced
  goal. Backlog reviewed at every quarterly replanning.
- **Goal contract + countermetric** (Decision F4) — SHIPPED-UNTESTED. Per-Objective:
  owner, baseline + evidence source, target + deadline, leading/lagging indicators,
  measurement delay, countermetric (checked at the monthly review), capacity,
  dependencies, non-goals, legitimate-revision conditions. Gaps captured as gaps.
- **Durable coaching memory + backstage tasks** (Decision F4; element 7) —
  SHIPPED-UNTESTED, private-notebook register per the BC Client Dynamic precedent:
  calibration, never ammunition; executed silently at session start.
- **C3 marketing-promise reconciliation** (Decision C3; checklist row 6): "a critic that
  won't let you lie to yourself" → **"a critic that red-teams every goal before you
  commit"** in README, plugin.json, and the marketplace catalog line — shipped alongside
  M8 so the softened promise is also strengthened behavior.
- **F3 claim-softening sweep** (Decision F3): neuroscience claims softened to defensible
  attention/commitment framing across the playbook ("The science underneath" → "The model
  underneath"), stage files, and the pulse skill. Daily handwriting stays a core cadence.
  The playbook's schema appendix mechanically synced to `reference/schemas.md` (statuses,
  revision history, per-goal pulse entries, operational mitigations) so no live
  contradiction ships.
- **Golden-set scaffold** (`eval/targets/goal-setting/`) — adapter, deterministic gates,
  principles, coverage map, and ten adversarial goldens seeded from the blind review's
  confirm/refute conditions. The scaffold shape for plugins without an eval target
  (researcher copies it).

### Pass-2 hardening (2026-07-12, same unpublished release — v0.2.0 had not shipped to any installer)

The disclosed external re-attack (pass 2) returned 2 CLOSED (immutable history/closeout;
provenance valve) · 5 PARTIAL · 1 OPEN. All verified bypasses repaired in-place; triage
note at `dev/blind-reviews/goal-setting-pass2-2026-07.md` (primary checkout):

- **Return routing blind paths (F1):** `/goal-setting:progress` now applies the heartbeat's
  reading half — its Next action is the computed route, never a stale STATE line; the init
  fallback for projects with an existing `CLAUDE.md` now APPENDS the session-start block
  instead of dropping it; blank last-run dates compute overdue state from `Last setup
  completed`; the annual check joined the cadence-trigger design.
- **The pre-commit promise now has a producer (F2):** the pressure-test runs by default at
  the two commitment moments — Setup close and quarterly replan — non-blocking, decline
  recorded (the strategist E2 pattern). README says so.
- **Restart state typed (F4):** `restart_system` / `restart_clean_weeks` /
  `restart_last_clean_pulse` / `restart_queue` in STATE, written by restart, updated by
  every pulse (clean or not) so week-one-vs-week-two survives context loss; `paused` added
  to the System status enum (schemas + playbook appendix — a pre-existing v0.1.0 seam).
- **Mixed state within a goal (F5a):** `mixed` joins yes/no/unknown for both weekly fields,
  requiring a one-line note naming the split; the monthly untangles it. (Full per-KR/
  per-System records were considered and set aside — one question per goal, five minutes,
  is the decided shape.)
- **Unchecked ≠ clear (F6):** mitigation sweeps record fired / clear / **unchecked** (with
  date); `last_checked` added to the schema; a weekly signal unchecked 2+ sweeps is routed
  at session start; weekly check slots capped at ~3 so the pulse stays five minutes.
- **Setup-close reconciliation (F7, narrowed):** closing the arc with a missing or
  unreconciled out-of-order stage now requires an explicit recorded decision — fill it, or
  proceed with a visible gaps waiver revisited at the first monthly. The advisory
  no-blocking philosophy is locked; the reviewer's full predecessor-enforcement ask is
  recorded as a collision price tag, not adopted.

### Pending Kelsey review (drafted, NOT shipped — in `dev/convergence/review-queue/`)

- **F1/F2 playbook wording** — the reconciled pulse diagnosis line + the
  systems-as-experiments sections (7-way differential, per-system hypothesis/lag/
  duration/dose/decision-rule), one combined review so the playbook is touched once. The
  skills still carry the current (coherent) goal-vs-system binary until approved.
- **Golden-set rubric anchors** — the 0–3 anchor text ships with a DRAFT banner; scores
  are uncalibrated until approved.

### Deferred

- **Drift-lint config** — the shared plugin-configurable lint
  (`dev/scripts/lint-doctrine-drift.mjs`, strategist builder's deliverable) did not exist
  at build time; goal-setting's config (stale phrases, playbook-vs-skill canon pairs,
  reader/writer contract checks) follows as a patch once it lands. Not built twice, per
  the coordination guide.
- **Organizational-operation fork** (G1) — deferred by Decision of Record.

## 0.1.0 — 2026-06-28

Initial release.

- The **Setup Arc** — six stages in order (`orient`, `horizons`, `anchors`, `goals`,
  `systems`, `premortem`) — driven by a single parameterized engine (`goal-setting-setup-stage`).
  Each stage applies the playbook's framework against the user's real business, enforces the
  stage's hard constraints, and hands off to the next stage.
- The **Ongoing Arc** — five cadences across two skills: `goal-setting-pulse` (daily writing
  ritual + weekly pulse check) and `goal-setting-review` (monthly KR review, quarterly
  system/planning review with a recurring pre-mortem, annual vision check that loops back to
  the Setup Arc).
- **Restart Protocol** (`/goal-setting:restart`) — the five-step recovery for when you fall
  off, enforcing one-system-at-a-time on the way back.
- **The three-goal rule, enforced.** Max three active Anchor Areas, max three active
  Objectives, one Objective per active Anchor Area, one System per Anchor Area at setup.
  Every skill that touches goals refuses the fourth.
- **`goal-setting-critic`** subagent (`/goal-setting:pressure-test`) — red-teams goal
  *formulations*: Objective vagueness, KR drift, systems-that-are-hopes, incomplete
  mitigations, anchor mismatch, and cross-stage contradictions. Tests logic and methodology
  fidelity, not evidence. Mirrors the strategist-critic's restraint.
- **`/goal-setting:progress`** — read-only dashboard of loop position, active goals, KR
  status, systems, mitigations, and cadence calendar. Writes nothing.
- **State as Markdown** in the deployment's `goals/` directory: `STATE.md`, `vision.md`,
  `active.md`, `scorecard.md`, `journal.md`. Human-readable, parseable, resumable.
- **Reference library** — the canonical playbook, the seven anchor-area chapters, the Three
  Tyrants philosophical companion, the object-model schemas, and one file per Setup stage.
- One PreCompact staleness hook (warns if `STATE.md` lags the working files). Claude Code
  only; a no-op on Cowork.
- Cowork-safe setup (Write-only, no shell); works on Claude Code and Cowork.
