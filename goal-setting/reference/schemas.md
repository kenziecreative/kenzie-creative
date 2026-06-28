# Data Structures — Object Reference

*The object model behind the [Goal Setting Playbook](playbook.md). This is the canonical reference for the state the plugin maintains in the deployment's `goals/` directory, and for anyone building tooling around the methodology.*

This appendix defines the core objects in the playbook and how they relate. It exists to make the methodology portable: into a Notion workspace, a custom dashboard, an AI agent that runs the cadences, or any other implementation. In this plugin, these objects are written as Markdown sections in `goals/vision.md`, `goals/active.md`, `goals/scorecard.md`, and `goals/journal.md` — the schema below is the contract those files follow.

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

**Objective** *(output of Stage 4 — Goals; stored in `goals/active.md`)*
- `id`, `title`, `description`
- `anchor_area_id`: foreign key to AnchorArea
- `period_start`, `period_end`
- `status`: planning | active | achieved | abandoned | revised
- **Constraint:** max 3 Objectives in `active` status at any time across all anchor areas; one Objective per active anchor area.

**KeyResult** *(output of Stage 4; stored in `goals/active.md`)*
- `id`, `description`
- `objective_id`: foreign key to Objective
- `metric_name`: e.g., "qualified leads"
- `baseline_value`, `target_value`, `current_value`
- `status`: on_track | off_track | achieved | revised

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
- `status`: untriggered | triggered_active | resolved
- `source`: launch_premortem | recurring_premortem
- **Constraint:** a Mitigation requires both a `trigger_condition` and an `action`. Without both it is a hope, not a mitigation.

## Cadence entries

*All cadence entries are appended to `goals/journal.md`, reverse-chronological, tagged by cadence type.*

**DailyEntry**
- `date`, `location` (varies day to day), `written_text`

**WeeklyPulseEntry**
- `date`
- `system_executed`: bool
- `kr_progressing`: bool (null if `system_executed` is false)
- `what_needs_to_change`: text (only if either bool is false)

**MonthlyReview**
- `date`
- `per_objective_assessment`: array of { objective_id, on_track, classification: goal_wrong | execution_wrong | both, change_made }

**QuarterlyReview**
- `date`
- `updated_scorecard`: snapshot of AnchorArea scores
- `system_changes`: array of { system_id, action: keep | revise | retire }
- `next_quarter_objectives`: array of new Objective IDs
- `recurring_premortem_mitigations`: array of new Mitigation IDs

**AnnualVisionCheck**
- `date`
- `vision_continued`: bool
- `revised_horizon_3_vision`: text (only if `vision_continued` is false)
- Triggers re-entry into the Setup Arc starting at Stage 2 if the vision changed.

## Key relationships

- **Setup flow:** Direction → HorizonSet → AnchorAreas (active subset) → Objectives → KeyResults + Systems → Mitigations.
- **Ongoing cadence references:** WeeklyPulse → System; MonthlyReview → Objective; QuarterlyReview → AnchorAreas + Systems + Objectives + Mitigations.
- **The three-goal constraint** is enforced at the Objective level (`status = active`), with secondary enforcement at the AnchorArea level (`is_active = true` capped at 3) and the System level (one per active anchor area at initial setup).

This object model is implementation-neutral. It can back a database, a Notion workspace, an Airtable base, or an LLM agent's state.
