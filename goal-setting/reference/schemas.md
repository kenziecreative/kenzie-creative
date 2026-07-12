# Data Structures — Object Reference

*The object model behind the [Goal Setting Playbook](playbook.md). This is the canonical reference for the state the plugin maintains in the deployment's `goals/` directory, and for anyone building tooling around the methodology.*

This appendix defines the core objects in the playbook and how they relate. It exists to make the methodology portable: into a Notion workspace, a custom dashboard, an AI agent that runs the cadences, or any other implementation. In this plugin, these objects are written as Markdown sections in `goals/vision.md`, `goals/active.md`, `goals/scorecard.md`, `goals/journal.md`, and `goals/history.md` (closed commitments, append-only) — the schema below is the contract those files follow.

## Core objects

**Direction** *(output of Stage 1 — Orient; stored in `goals/vision.md`)*
- `text`: one-sentence statement of what you actually want
- `passes_30_second_test`: bool
- `passes_human_aware_test`: bool
- `passes_actually_matters_test`: bool
- `created_at`, `revised_at`

**HorizonSet** *(output of Stage 2 — Horizons; stored in `goals/vision.md`)*
- `horizon_1_label`: e.g., "this quarter"
- `horizon_2_label`: e.g., "this year"
- `horizon_3_label`: e.g., "three years out"
- `horizon_3_vision`: paragraph-length vision statement
- `current_time_distribution`: {h1_pct, h2_pct, h3_pct, reactive_pct} — captured from the time audit

**AnchorArea** *(scored in Stage 3 — Anchors; stored in `goals/scorecard.md`)*
- `name`: string (one of the canonical seven for the business set: Demand Generation, Conversion, Delivery, Operations, Nurturing, Profit, Personal Leadership)
- `description`: string
- `current_score`: 1-10
- `is_active`: bool — whether goals are currently being set against this area
- `score_history`: array of {date, score}
- **Constraint:** max 3 AnchorAreas with `is_active = true` at any time.

**Objective** *(output of Stage 4 — Goals; stored in `goals/active.md` while open, moved to `goals/history.md` at closeout)*
- `id`, `title`, `description`
- `anchor_area_id`: foreign key to AnchorArea
- `period_start`, `period_end`
- `status`: planning | active | achieved | missed | abandoned | superseded — the four closed
  statuses are **dispositions**, set at the quarterly closeout (or at a mid-quarter swap /
  deep revision); every Objective that leaves `active` gets one, plus `lessons`
- `goal_contract`: the commitment made explicit at construction —
  { owner, baseline + evidence_source, target + deadline, leading_indicators,
  lagging_indicators, measurement_delay, countermetric (what must NOT deteriorate while this
  is pursued — checked at the monthly review), capacity_commitment, dependencies, non_goals,
  legitimate_revision_conditions }
- `revision_history`: append-only array of { date, field, original_value,
  actual_at_change, new_value, reason, classification: goal_wrong | execution_wrong } —
  a revision **never** overwrites the original commitment; it records it
- **Constraint:** max 3 Objectives in `active` status at any time across all anchor areas; one Objective per active anchor area.
- **Closeout rule:** a quarter does not replan until every Objective whose period ended has a disposition + lessons recorded in `goals/history.md`.

**CandidateBacklogEntry** *(stored in `goals/STATE.md` → Candidate Backlog)*
- `date`, `candidate`: the proposed fourth goal, as stated
- `decision`: pending | swapped_in | deferred | rejected
- `displaced_objective_id`: set only for a swap — the Objective closed (with disposition) to make room
- **Rule:** the three-goal refusal stands; the candidate is recorded, never silently adopted or silently dropped. Reviewed at every quarterly replanning.

**KeyResult** *(output of Stage 4; stored in `goals/active.md`)*
- `id`, `description`
- `objective_id`: foreign key to Objective
- `metric_name`: e.g., "qualified leads"
- `baseline_value`, `target_value`, `current_value`
- `status`: on_track | off_track | achieved | revised
- KR revisions append to the owning Objective's `revision_history` — the original target and the actual at the time of change are preserved, never overwritten

**System** *(output of Stage 5 — Systems; stored in `goals/active.md`)*
- `id`, `description`
- `objective_id`: foreign key to Objective (may also link to specific KRs)
- `trigger_type`: time | location | habit_stack
- `trigger_detail`: e.g., "Mondays 9-11am" or "after morning coffee"
- `four_laws`: { obvious, attractive, easy, satisfying } — short string per law
- `version`: integer — increments on revision (Version 3 works)
- `status`: active | retired | replaced
- **Constraint:** one System per active anchor area at initial setup.

**Mitigation** *(output of Stage 6 — Pre-mortem, and the Quarterly Recurring Pre-mortem; stored in `goals/active.md`)*
- `id`, `risk_description`
- `objective_id` or `system_id`: what it protects
- `likelihood`: low | medium | high
- `impact`: low | medium | high
- `trigger_condition`: the "if X" clause
- `action`: the "then Y" clause
- `monitored_signal`: the observable thing that tells you whether X happened (e.g., "gross margin on the weekly P&L")
- `threshold`: the value or event that counts as fired
- `check_frequency`: weekly | monthly | quarterly — which cadence sweeps this trigger (weekly sweeps at the pulse; the monthly review sweeps everything)
- `owner`: who watches the signal (single-user deployments: the user; named third parties are recorded facts, not accepted commitments)
- `deadline`: when the response must land once fired, if time-bound
- `status`: untriggered | triggered_active | resolved
- `response_evidence`: what was actually done once fired — required to move `triggered_active` → `resolved`
- `source`: launch_premortem | recurring_premortem
- **Constraint:** a Mitigation requires both a `trigger_condition` and an `action`. Without both it is a hope, not a mitigation.
- **Operating rule:** a fired trigger (`triggered_active`) surfaces at the next invocation of any skill, ahead of routine work — not at quarter end.

## Cadence entries

*All cadence entries are appended to `goals/journal.md`, reverse-chronological, tagged by cadence type.*

**DailyEntry**
- `date`, `location` (varies day to day), `written_text`

**WeeklyPulseEntry**
- `date`
- `per_objective`: array of { objective_id, system_executed: yes | no | **unknown**,
  kr_progressing: yes | no | unknown | n/a } — one record **per active Objective**; a mixed
  week ("A ran, B didn't, no read on C") is representable, and a half-answer is recorded as
  `unknown`, never inferred to yes or no
- `mitigations_checked`: none_fired | array of fired mitigation IDs (weekly-frequency triggers)
- `what_needs_to_change`: text (only if anything is no or unknown)

**MonthlyReview**
- `date`
- `per_objective_assessment`: array of { objective_id, on_track, classification: goal_wrong | execution_wrong | both, change_made }

**QuarterlyReview**
- `date`
- `closeouts`: array of { objective_id, disposition: achieved | missed | abandoned | superseded, final_actuals, lessons } — **required for every Objective whose period ended, before `next_quarter_objectives` may be set**
- `updated_scorecard`: snapshot of AnchorArea scores
- `system_changes`: array of { system_id, action: keep | revise | retire }
- `backlog_decisions`: array of { candidate, decision: swapped_in | deferred | rejected }
- `next_quarter_objectives`: array of new Objective IDs
- `recurring_premortem_mitigations`: array of new Mitigation IDs

**AnnualVisionCheck**
- `date`
- `vision_continued`: bool
- `revised_horizon_3_vision`: text (only if `vision_continued` is false)
- Triggers re-entry into the Setup Arc starting at Stage 2 if the vision changed.

## Key relationships

- **Setup flow:** Direction → HorizonSet → AnchorAreas (active subset) → Objectives → KeyResults + Systems → Mitigations.
- **Ongoing cadence references:** WeeklyPulse → per-Objective Systems + weekly-frequency Mitigations; MonthlyReview → Objective (incl. countermetric) + all Mitigation triggers; QuarterlyReview → closeouts + AnchorAreas + Systems + Objectives + CandidateBacklog + Mitigations.
- **Lifecycle:** an Objective's record is born in `active.md` and dies into `history.md` with a disposition — it is never deleted, and its original commitment survives every revision.
- **The three-goal constraint** is enforced at the Objective level (`status = active`), with secondary enforcement at the AnchorArea level (`is_active = true` capped at 3) and the System level (one per active anchor area at initial setup).

This object model is implementation-neutral. It can back a database, a Notion workspace, an Airtable base, or an LLM agent's state.
