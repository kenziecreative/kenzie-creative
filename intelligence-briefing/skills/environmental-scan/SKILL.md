---
name: environmental-scan
description: This skill should be used when collection needs to run for an intelligence-briefing deployment — the rotation-driven scan that gathers observations, checks signposts, updates threads, and re-decides drivers. Produces state on disk, not a document. Runs on its own before the brief, or standalone on a schedule. Reads the deployment's CLAUDE.md for relevance context, zones, coverage matrix, and paths.
allowed-tools: Read, Write, Edit, WebSearch, WebFetch
---

# Environmental Scan

You are the collection half of an intelligence system. **This skill produces no document. Nobody reads its output. Its output is state** — observations, threads, signposts, drivers, and coverage records written to disk, which the environmental-briefing skill later reads and reports from.

You are a **coverage agent at collection and a triage agent at presentation**. Presentation is the brief's job, not yours. Yours is the coverage obligation: the rotation exists so that, over an interval, every applicable crossing of zone and territory actually gets looked at — and so the brief can disclose exactly what was looked at and what was not. Coverage cannot be established inside one run; it is earned across the rotation and recorded honestly, cell by cell.

This document is your operating instruction. Follow it exactly. Where it states a rule, the rule is not optional.

---

## CONFIGURATION (read from CLAUDE.md)

Read `CLAUDE.md` in the project root before doing anything. The only value with no defensible default is the **relevance context** — whose attention this deployment serves, what makes an item matter, what to ignore. If it is missing or still a placeholder, do not scan — emit the structured halt in step 0 and stop.

Everything else takes a default if absent:

- **Zones** — the fixed five-lens set (see ZONES). Per-zone in/out examples come from CLAUDE.md, derived from the relevance context at setup.
- **Cadence** — interval and timezone. Default: daily, user's timezone.
- **Grace window** — overlap added before the window start to recover items missed by indexing lag or a skipped run. Default: 6 hours. Already-captured observations are never duplicated, so overlap is harmless.
- **Paths** — briefs directory, ledger file, and the intelligence state directory. Defaults: `./briefs/`, `./ledger.json`, `./intel/`.

---

## TOOLING DISCIPLINE (fixed)

- Use the built-in `WebSearch` tool for scanning and `WebFetch` to open a source when you need to confirm a date, a figure, or a qualifier. These are the baseline and are sufficient — never require a specific search MCP or CLI. If a web-search MCP happens to be present and already permitted you may use it, but never depend on one.
- Run every search **inline, in this session**. Never delegate scanning to a spawned subagent — subagents start from a stripped permission set and cannot reach the web.
- Do every file operation with `Read`, `Write`, and `Edit` only. **Never run shell commands** (`ls`, `cat`, `mkdir`, `pwd`, etc.) to inspect or create files — a shell call triggers a permission gate this scan has no reason to incur. To check whether a file exists, `Read` it and handle the missing-file result. To create a directory, write a file into its path.
- Create any missing state file with `Write`, containing its empty form (given per file below).

---

## STATE FILES

All state lives in the deployment directory, never in the plugin. Layout:

```
<deployment>/
  CLAUDE.md                       config
  briefs/                         written by the briefing skill, never by the scan
  intel/
    coverage.json                 the matrix: zones × domain cells
    drivers.json                  the forces, with confidence history
    signposts.json                tripwires with due dates
    threads.json                  story-level identity
    runs.json                     run records (append-only)
    feedback.json                 misses, noise, corrections (append-only; written by the review skill)
    observations/
      YYYY-MM.json                observations, sharded by month
  ledger.json                     shared /contract queue (written by the briefing skill)
```

**Observations never prune.** They are the archive, and they are the whole reason month six is richer than month one. Sharding by month keeps `Read` cheap: a run reads the current month's shard plus whatever specific shards a driver's `supporting_observations` point into.

### `intel/observations/YYYY-MM.json` — the memory

Empty form: `{ "month": "YYYY-MM", "observations": [] }`

```json
{
  "month": "2026-06",
  "observations": [
    {
      "obs_id": "OBS-2026-06-07-001",
      "run_id": "RUN-2026-06-07-01",
      "seen_date": "2026-06-07",
      "title": "Meta Business Agent goes global on WhatsApp, Instagram, Messenger",
      "zone": "Field Movements",
      "cell_id": "smb-platforms",
      "thread_id": "THR-meta-business-agent",
      "driver_ids": ["DRV-001"],
      "type": "fact",
      "disposition": "act",
      "source": {
        "publisher": "TechCrunch",
        "url": "https://techcrunch.com/2026/06/03/...",
        "published": "2026-06-03",
        "tier": "secondary",
        "corroboration": "corroborated",
        "corroborating_sources": ["Yahoo Finance", "WhatsApp Business blog"]
      },
      "captured_evidence": [
        "over one million businesses",
        "free to start",
        "billed through WhatsApp Business Premium tiers ... in the coming months",
        "access is currently gated to selected accounts plus a waitlist"
      ],
      "summary": "Meta moved its Business Agent from regional pilots to global availability...",
      "relevance": "A distribution giant placing a conversational AI advisor directly into the channels small businesses already run on...",
      "material": true
    }
  ]
}
```

**`captured_evidence` is the load-bearing field.** It holds the verbatim figures, ranges, dates, and qualifiers **exactly as the source states them, at gather time, before any compression**. It is what lets the briefing's verification pass re-derive every written claim from evidence instead of re-reading its own draft.

> **Doctrine seam, resolved here in as many words:** the briefing's rule against copied headlines and block quotes applies to the **emitted brief**. `captured_evidence` is an internal working artifact that is **never emitted** into any brief or reader-facing output. Capturing what a source actually said is not quoting it to the reader. There is no contradiction.

`material: false` marks an observation that was captured but did not clear the bar for the brief. Capture is cheap; **the store is not the brief.**

`disposition` at capture time is provisional — the briefing skill enforces the evidence bar before anything is emitted.

### `intel/drivers.json` — the forces

Empty form: `{ "drivers": [], "proposals": [] }`

```json
{
  "drivers": [
    {
      "driver_id": "DRV-001",
      "name": "AI Advisory Commoditization at the SMB Front Door",
      "definition": "Distribution platforms are placing capable conversational AI advisors directly into the channels small businesses already operate in, while the cost of building comparable reasoning falls. Having an AI advisor is ceasing to be a differentiator.",
      "direction": "Increasing",
      "certainty": "High",
      "time_horizon": "Near-term (1-3 years)",
      "status": "active",
      "origin": "derived",
      "implication": "The defensible edge migrates to what a generic agent cannot replicate: proprietary data on these specific businesses, and integration with the programs and services they are already inside.",
      "steep_primary": null,
      "steep_secondary": [],
      "cell_ids": ["smb-platforms", "ai-advisory-tools"],
      "supporting_observations": ["OBS-2026-06-07-001", "OBS-2026-06-07-002"],
      "observation_count": 7,
      "confidence_log": [
        {
          "date": "2026-06-07",
          "direction": "Uncertain",
          "certainty": "Medium",
          "reason": "Seeded at setup from the relevance context.",
          "moved_by": []
        },
        {
          "date": "2026-07-14",
          "direction": "Increasing",
          "certainty": "High",
          "reason": "Fourth move in six weeks. Google's entry means the two largest SMB distribution channels now ship an advisory agent by default.",
          "moved_by": ["OBS-2026-07-14-002"]
        }
      ],
      "created": "2026-06-07",
      "last_reassessed": "2026-07-14"
    }
  ],
  "proposals": []
}
```

Vocabulary (deliberately borrowed from the Strategic Foresight framework so the export is lossless):

- `direction`: `Increasing` | `Decreasing` | `Uncertain` | `Cyclical`
- `certainty`: `High` | `Medium` | `Low`
- `time_horizon`: `Near-term (1-3 years)` | `Mid-term (3-7 years)` | `Long-term (7+ years)`
- `steep_primary` / `steep_secondary`: `S` | `T` | `E` | `En` | `P` — **export-domain fields.** They stay `null` / `[]` in daily state; the `/intel-export` command computes them from supporting observations' zones at export time. The daily runtime never reads or writes them.

Two fields foresight does not have, which are the whole point:

- **`confidence_log`** — append-only. Every movement, dated, with its reason and the observations that caused it. **Never rewrite history.** A driver's value is this log.
- **`implication`** — the "so what for what I'd build" clause. It is what the reader actually consumes.

`origin`: `derived` (setup inferred it from the relevance context) | `user_asserted` (the user stated it — this is what held beliefs are now) | `emergent` (the system proposed it from a thread and the user confirmed).

`status`: `active` | `retired`. **Retired drivers are never deleted.** They and their confidence logs are what the reckoning reads.

`proposals` holds emergent-driver proposals awaiting the user (see step 10). Each: `{ "proposal_id": "PRO-YYYY-MM-DD-NN", "thread_id": "...", "statement": "one-sentence force, in plain language", "observation_count": N, "proposed": "YYYY-MM-DD", "status": "open" }`. `status`: `open` | `confirmed` | `dismissed`. Only the review conversation changes it.

### `intel/signposts.json` — the tripwires

Empty form: `{ "signposts": [] }`

```json
{
  "signposts": [
    {
      "signpost_id": "SIG-2026-06-07-001",
      "statement": "Publication of the finalized EU Code of Practice on marking and labeling AI-generated content, with its concrete labeling requirements.",
      "driver_id": "DRV-003",
      "origin_observation": "OBS-2026-06-07-005",
      "created": "2026-06-07",
      "due": "2026-06-30",
      "status": "open",
      "if_fired": "strengthens",
      "resolved_date": null,
      "resolved_observation": null,
      "resolution_note": null
    }
  ]
}
```

- `status`: `open` | `fired` | `expired` | `withdrawn`
- `if_fired`: `strengthens` | `weakens` — what this event would do to the driver's direction. This is the falsifier.
- `due` may be null for an open-ended watch. A null-due signpost is checked weekly rather than on a date; "last checked" is derived from `runs.json` (`signposts_checked`), not stored here.

**A signpost does two jobs with one field, and this is deliberate.** For the reader it is *"here is what to watch for."* For you it is a **directed collection query** (step 3b). Same statement, both jobs.

### `intel/coverage.json` — the matrix

Empty form: `{ "domain_cells": [], "matrix": [] }`

```json
{
  "domain_cells": [
    { "cell_id": "ai-advisory-tools", "label": "AI advisory and decision-support tools for SMBs" },
    { "cell_id": "smb-platforms",     "label": "Platforms SMBs run their business on" }
  ],
  "matrix": [
    {
      "zone": "Policy Levers",
      "cell_id": "ai-advice-regulation",
      "applicable": true,
      "required_frequency_days": 3,
      "last_scanned": "2026-07-08",
      "last_status": "ok",
      "next_due": "2026-07-11",
      "scan_count": 12,
      "observation_count": 4,
      "source_health": "ok"
    },
    {
      "zone": "Policy Levers",
      "cell_id": "model-capability",
      "applicable": false,
      "na_reason": "Model capability is not a policy object in this deployment's world; regulation of its application is, and that is its own cell."
    }
  ]
}
```

- `last_status`: `ok` (scanned, found something) | `empty` (scanned, found nothing — **this is a success, not a failure**) | `failed` (search errored, rate-limited, or timed out)
- `source_health`: `ok` | `suspect`. Set to `suspect` by a miss record from the review conversation. A suspect cell tells you to **widen your channels** for that cell rather than repeating the search that already failed to find something.
- `applicable: false` cells were set at setup with a stated reason and are excluded from the rotation.

**The matrix is a genuine cross-product of zones × cells, not each zone scanning its own pre-written examples.** That is the forcing function: it makes the system search crossings no operator would think to look for. If each zone only ever revisits the examples the user already wrote, the fixed lens set does no work.

### `intel/runs.json` — the run records (append-only)

Empty form: `{ "runs": [] }`

```json
{
  "runs": [
    {
      "run_id": "RUN-2026-06-07-01",
      "started": "2026-06-07T07:02:00-05:00",
      "completed": "2026-06-07T07:11:00-05:00",
      "status": "complete",
      "window_start": "2026-06-06T07:02:00-05:00",
      "window_end": "2026-06-07T07:02:00-05:00",
      "cells_due": 6,
      "cells_completed": 6,
      "cells_failed": [],
      "signposts_checked": ["SIG-2026-06-07-001"],
      "observations_added": 6,
      "drivers_reassessed": ["DRV-001"],
      "brief_written": "briefs/2026-06-07.html"
    }
  ]
}
```

- `status`: `complete` (every due cell completed) | `degraded` (one or more due cells failed) | `failed` (no cell completed, or a config halt — **no brief is written**)
- `brief_written` is null when the scan runs standalone; the briefing skill fills it when it reports on this run. A run whose brief included a reckoning also carries `"reckoning": true`, set by the briefing skill.
- **`last_successful_run` is derived from this file**, never stored separately. The catch-up window is the last completed-or-degraded run's `window_end` → now. A quiet run still writes a run record, so a quiet day never causes the next day to think it is a first run.
- Run ids are `RUN-YYYY-MM-DD-NN`, the `NN` an ordinal within the day. A second run on the same date is a new record; nothing is overwritten.

### `intel/threads.json` — story identity

Empty form: `{ "threads": [] }`

```json
{
  "threads": [
    {
      "thread_id": "THR-meta-business-agent",
      "label": "Meta Business Agent",
      "status": "live",
      "driver_ids": ["DRV-001"],
      "observation_ids": ["OBS-2026-06-07-001"],
      "first_seen": "2026-06-07",
      "last_material_change": "2026-06-07",
      "last_state": "Global availability announced; free to start, paid SMB tiers and enterprise platform coming; access gated to selected accounts plus waitlist."
    }
  ]
}
```

- `status`: `live` | `dormant` | `closed`. **Threads are never deleted.** They go dormant. A story returning after a month is *the same story advancing*, not a new one.
- **A thread is a story. A driver is a force. Many threads roll up to one driver.** They are different objects; do not merge them.
- **Identity.** A `thread_id` is assigned **once, at thread creation, and never re-derived.** Each run matches new observations against the *visible list of existing threads*, using their labels and last states — matching against a shown list is a far more reliable judgment than reconstructing a slug from scratch.
- **Bias rule:** when it is unclear whether an observation belongs to an existing thread or a new one, **attach it to the existing thread.** Thread proliferation is the failure mode. The review conversation can split a thread later; it cannot easily merge forty of them.

### `intel/feedback.json` — append-only, written by the review conversation

Empty form: `{ "feedback": [] }`. The scan only reads it (a `miss` record explains why a cell is `suspect`). Never write to it from this skill.

---

## ZONES

The zone set is fixed and not user-editable. These five lenses are the forces any role has to reckon with at some level — an executive, an engineer, a marketer, an accountant watch the same zones; what differs is the relevance context, which refracts each zone toward their world. Editing the set away would lose that cross-domain validity, so the configuration tailors *through* the relevance context, not by swapping zones. Zones are a **collection** lens set, not a presentation taxonomy — their fixedness is what stops the scan drifting toward whatever the operator already finds interesting.

**The five zones:**

1. **Emerging Impact** — new and emerging products and services; conventional approaches being challenged; raw ideas becoming tangible solutions; new market opportunities.
2. **Currents** — forces reshaping the landscape at three levels: micro (individuals, their teams, direct customer interactions), meso (communities, networks, industry-specific dynamics), macro (economic, technological, societal trends).
3. **SciTech Frontier** — groundbreaking discoveries, emerging technologies, and scientific breakthroughs with transformative implications for medicine, industry, and understanding.
4. **Policy Levers** — creation, modification, and removal of policy at all levels; the intended and unintended consequences of regulation, incentive, and legislation.
5. **Field Movements** — specific named players making specific moves: launches, funding, partnerships, entrances and exits within the watched space. (Covers the competitive/peer layer the individual→industry→society progression of the other zones skips.)

Each zone, when run, draws on:

- **In/out examples** — supplied per deployment in CLAUDE.md, derived from the relevance context. This is how the fixed lens gets pointed at the user's world. If a zone's in/out examples are absent, derive provisional ones from the relevance context rather than halting.
- **Channels** — the kinds of sources to scan (for science: preprint servers, journals; for policy: legislative trackers, agency releases; for field movements: funding databases, company filings). Channels are source *types*, not a frozen URL list.
- **Credibility hierarchy** — which channels outrank which, used to assign source tier. A peer-reviewed result outranks a press release; a primary filing outranks secondary coverage.

A due cell is a **zone × domain-cell crossing**: apply the zone's lens to the domain cell's territory. The in/out examples calibrate the lens; the cell supplies the territory.

---

## CLASSIFICATION

Two axes are independent: how authoritative a source is (tier) is not the same as whether a claim is confirmed (corroboration). An original filing seen in one place is primary *and* single. Mark both.

**Epistemic type:**

- **Fact** — something verifiable happened or was established.
- **Signal** — an early indication; real but not yet confirmed. A Signal must carry an uncertainty note — the specific event that would confirm or falsify it — and is written in language that marks it as unconfirmed. Do not state a single-source signal in the flat declarative voice reserved for facts.
- **Frame** — a concept, model, or way of seeing that is gaining currency.
- **Pattern** — a synthesized read across multiple items. Used in synthesis only, never on an individual observation.

**Source tier** — how authoritative the origin is:

- **Primary** — original record: the filing, paper, dataset, official statement.
- **Secondary** — credible reporting on a primary source.
- **Tertiary** — aggregation, commentary, or coverage at further remove.

**Corroboration** — whether the claim is confirmed:

- **Single** — one uncorroborated source.
- **Corroborated** — independently confirmed by at least one other credible source.

**Disposition** — what the reader should do:

- **Note** — awareness only; no action.
- **Track** — a live thread worth watching as it develops.
- **Act** — warrants a decision or a step now.
- **Dig** — resists compression; the reader should leave the brief and read the source in full.

Dispositions assigned at capture are provisional. The briefing skill enforces the configured evidence bar (including the action gate) before anything is emitted.

---

## STEPS, IN ORDER

**0. Validate config.** Read `CLAUDE.md`. The only halting condition is a missing or placeholder **relevance context** — emit this and stop:

```
## Halt — missing relevance context
This scan needs a relevance context to know what matters. Edit CLAUDE.md to fill it in, or run /intel-setup.
```

Every other missing field silently takes its default.

**1. Open a run record.** Append a new row to `runs.json` with `run_id`, `started`, and `status: "failed"` — pessimistic; it is upgraded on completion. Derive `window_start` from the last completed-or-degraded run's `window_end`; if none exists, use one cadence interval back. Extend the start earlier by the grace window; already-captured observations are never duplicated, so the overlap only recovers, never repeats. Set `window_end` to now.

**2. Read state.** `coverage.json`, `drivers.json`, `signposts.json`, `threads.json`, and the current month's observation shard. Read prior shards only if a due signpost or a reassessment target points into them. Create any missing file with `Write`, containing its empty form.

**3. Build the collection plan.** Three sources of queries, in this order:

   **(a) Due cells.** Every `matrix` row where `applicable: true` and (`next_due <= today` or the cell has never been scanned). Each due cell is a zone × domain-cell search: apply the zone's lens to the domain cell's territory. A cell marked `source_health: "suspect"` must **widen its channels** — do not repeat the search that already missed something. Read that cell's `miss` records in `feedback.json` first: they name exactly what was missed, which tells you which kind of channel was blind.

   **(b) Due signposts.** Every `signposts.json` row where `status: "open"` and (`due <= today`, or `due` is null and no run in the last seven days lists it in `signposts_checked`). **This is a directed search for a specific named event.** It is not a zone sweep. Search for exactly the thing the signpost names.

   **(c) Driver falsifiers.** For each `active` driver, search for evidence that would move it *against* its current direction. **This is a mandatory step and it is what makes the disconfirming section actually disconfirm.** A driver at `Increasing / High` gets a search for evidence of weakening. Skip a driver only when its direction is `Uncertain` and there is no direction to cut against — then search for whatever would settle it either way.

**4. Execute the plan.** Use built-in `WebSearch`; use `WebFetch` to open a source when you need to confirm a date, a figure, or a qualifier. Run every search **inline, in this session** — never delegate to a subagent.

   **Per cell, record the outcome in the matrix:** `ok` (found something), `empty` (found nothing — a success, not a failure), or `failed` (the search errored, rate-limited, or timed out).

   **Scan budget per cell:** roughly three to eight high-signal channels. Stop early only when the pass produces no motion *and* the cell's `source_health` is `ok`. A `suspect` cell does not get to stop early.

**5. Filter.** Discard anything that does not clear the relevance context. When in doubt, discard — a strained relevance justification means the item does not belong. **Discard at the edge, never at the material.** Missing a material shift that plainly clears the bar is the one unacceptable failure.

**6. Capture observations.** For every survivor, write an observation into the current month's shard, per the schema above.

   **Fill `captured_evidence` here, at gather time, before any compression.** Record the verbatim figures, ranges, dates, and qualifiers exactly as the source states them. If a source says "1–3x among surveyed firms, preliminary," that whole string is evidence. **This is the single most important write in the entire system** — everything downstream re-derives from it.

   Classify (type, tier, corroboration, provisional disposition). Attach to a thread (step 7). Attach to zero or more drivers by `driver_ids` — and mirror every attachment on the driver side: append the `obs_id` to that driver's `supporting_observations` and increment its `observation_count`. Set `material` honestly: `false` still gets captured — the store is not the brief.

**7. Update threads.** For each observation:

   - Matches an existing thread and represents a **material advance** (a new decision, a new publication *with a materially new result*, a funding event, a regulatory action, a measured outcome, a reversal, or a credible contradiction) → attach the observation, update `last_material_change` and `last_state`.
   - Matches an existing thread but is **derivative** (commentary, restatement, coverage of the same event) → attach the observation, do **not** update `last_material_change`. **The thread does not resurface in the brief.**
   - Matches nothing → create a new thread. Assign its `thread_id` now; it is never re-derived. Carry the observation's `driver_ids` onto the thread, and keep a thread's `driver_ids` in step with the observations attached to it.

   Match against all threads regardless of status — a `dormant` thread that advances returns to `live`; it is the same story, not a new one. (Status transitions the other way — dormant, closed — happen in the review conversation on the user's say-so, never here.)

   > "A new publication" alone is **not** a material advance. Daily derivative commentary on an unchanged underlying state must produce an observation and no brief item.

   Match against the visible list of existing threads (labels and last states). When unsure, attach to the existing thread.

**8. Resolve signposts.** For each signpost checked in step 3(b):

   - The named event occurred → `status: "fired"`. Capture the confirming observation, record `resolved_date`, `resolved_observation`, and a one-line `resolution_note`.
   - The `due` date passed and the event did not occur → `status: "expired"`. **An expired signpost is information.** A predicted event that failed to happen is evidence about the driver, in the opposite direction from `if_fired`. Record a `resolution_note` saying so.
   - Still pending, `due` not reached → leave `open`.

**9. Reassess drivers.** A driver is re-decided **only when both conditions hold**:

   - **Standing.** No `applicable` cell in the matrix is past its `next_due`. Collection is current.
   - **Cause.** At least one new observation or resolved signpost has attached to this driver since its `last_reassessed`.

   **If standing fails, no driver moves. Full stop.** Confidence may not move on a partial look. This is the same doctrine as the quiet-day rule, applied one level up: *silence must be attributable, and so must confidence movement.*

   When both hold, re-read the driver's supporting observations and decide whether `direction` or `certainty` changes. If either moves, **append** a `confidence_log` entry with the date, the new values, a plain-language reason, and the `moved_by` observation ids. Update `implication` if the movement changes what the reader should build. **Never rewrite a prior log entry.**

   If nothing moved, that is a valid outcome. Update `last_reassessed` and write no log entry.

   New signposts: when an observation or a movement surfaces a specific, checkable future event that would strengthen or weaken a driver, write it into `signposts.json` as an `open` signpost with `if_fired` set and a `due` date if one is knowable. This is how "watch for" stops being decoration.

**10. Propose emergent drivers.** If a thread has accumulated three or more material observations and does not roll up to any existing driver, record a proposal in `drivers.json` → `proposals` with `status: "open"` (skip if an open or dismissed proposal already exists for that thread). **Do not create the driver.** It is offered to the user in the next brief and confirmed or dismissed through the review conversation.

**11. Close the run record.** Set `completed`, `cells_due`, `cells_completed`, `cells_failed`, `signposts_checked`, `observations_added`, `drivers_reassessed`, and `status`:

   - **`complete`** — every due cell returned `ok` or `empty`.
   - **`degraded`** — one or more due cells returned `failed`. List them in `cells_failed`.
   - **`failed`** — no cell completed. **No brief may be written from this run.**

   For every scanned cell, update `last_scanned`, `last_status`, `scan_count`, `observation_count`, and recompute `next_due` (`last_scanned + required_frequency_days`). Write all state files back whole.
