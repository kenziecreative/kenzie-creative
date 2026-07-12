---
name: intelligence-review
description: This skill should be used when the user wants to interrogate or correct their intelligence picture — asking what is known about a topic, what changed on a driver, where coverage is thin, or telling the system it missed something or wasted their time. Reads the accumulated observations, drivers, signposts, and coverage matrix; records misses, noise, and driver judgments. The only surface where the user writes to the system after setup.
allowed-tools: Read, Write, Edit, WebSearch, WebFetch
---

# Intelligence Review

This is a conversation with the intelligence picture — the one surface where the user writes to the system after setup. It exists because of an asymmetry nothing else can close:

**The system can report what it observes about itself:** answers to questions, read out of observations, drivers, signposts, and threads; coverage gaps (the matrix knows which cells are overdue and which have `source_health: "suspect"`); proposed drivers (threads that have accumulated enough to be a force); stale drivers (ones that have not moved in months).

**Only the user can supply:** a **miss** — the system scanned that cell and still did not see the thing, and the matrix will never know this, because a miss is by definition what it did not see; **noise** — the system has no idea what the user read or ignored; whether a **proposed driver is real**; whether a **stale driver should die**.

If the system could observe its own misses, this skill would not need to exist. That asymmetry is its entire justification — and it is why the user can trust a quiet day: a filter that can never be told it is wrong will be abandoned the first time it is obviously wrong.

---

## IT IS A CONVERSATION, NOT A SET OF COMMANDS

**There are no named entry points and no verbs to learn.** The user will say *"you missed the Intuit thing, and what's happening with the fragmentation driver anyway"* — which is a miss record and a query in one sentence. Recognize intent from what they say, handle each intent, and answer in plain language. One message can carry several of the inputs below; take them all.

---

## STATE

All state lives in the deployment directory (default `./intel/`, plus `CLAUDE.md` for config). Read and write with `Read` / `Write` / `Edit` only — **never shell**. To check whether a file exists, `Read` it and handle the missing-file result. Files and their schemas are established by the environmental-scan skill and `/intel-setup`:

- `intel/drivers.json` — the forces: `drivers` (each with `definition`, `direction`, `certainty`, `implication`, `status`, `origin`, append-only `confidence_log`, `supporting_observations`) and `proposals` (emergent-driver proposals, `status`: `open` | `confirmed` | `dismissed`).
- `intel/signposts.json` — tripwires: `statement`, `driver_id`, `due`, `status` (`open` | `fired` | `expired` | `withdrawn`), `if_fired` (`strengthens` | `weakens`).
- `intel/threads.json` — story identity: `label`, `status`, `observation_ids`, `last_state`. Never deleted.
- `intel/coverage.json` — the zones × domain-cells matrix: per-cell `last_scanned`, `last_status` (`ok` | `empty` | `failed`), `next_due`, `source_health` (`ok` | `suspect`).
- `intel/observations/YYYY-MM.json` — the archive, sharded by month. Each observation carries its source, verbatim `captured_evidence`, classification, `thread_id`, `driver_ids`.
- `intel/runs.json` — append-only run records; which cells ran when, and with what status.
- `intel/feedback.json` — append-only; **this skill is the only writer.** Empty form `{ "feedback": [] }`; create it with `Write` if missing.

A feedback record:

```json
{
  "feedback_id": "FB-2026-07-15-001",
  "date": "2026-07-15",
  "kind": "miss",
  "statement": "Missed Intuit's SMB advisory launch, published 2026-07-07.",
  "zone": "Field Movements",
  "cell_id": "smb-fintech",
  "action_taken": "Marked Field Movements × smb-fintech source_health=suspect. Added OBS-2026-07-15-003 against DRV-001."
}
```

`kind`: `miss` | `noise` | `driver_confirm` | `driver_kill` | `relevance_correction`.

**Capture feedback from day one and do no statistics on it.** The ground truth of what was missed in March is gone from human memory by June — it cannot be reconstructed later. But rates, scores, and auto-tuning have no honest basis until months of records exist. Schema now, math later. Never compute hit rates, miss rates, or false-alarm scores from this file.

---

## WHAT EACH INPUT DOES

### A question — read-only

Answer from state. For a driver: its direction and certainty, how many times it moved, the confidence log entries that moved it, the observations behind it, its open signposts — and **what would tell us it's wrong** (its falsifier signposts, and what the scan's falsifier search has been finding). For a topic: the threads and observations that touch it, read out of the shards. For coverage: which cells are overdue, which are suspect, when each was last scanned. Show evidence, not vibes — cite observation ids and dates from the store.

### A miss — the system scanned and still did not see it

1. Write a `miss` feedback record.
2. **Locate the cell.** Which zone × domain cell should have caught this? Say so plainly.
3. If that cell was scanned in the relevant window and returned `empty` or `ok` without catching the item, set its `source_health: "suspect"` in `coverage.json`. A suspect cell forces the next scan to widen its channels instead of repeating the search that already missed something.
4. **Search for the missed item now** (built-in `WebSearch` / `WebFetch`, inline — never a subagent). Capture it as an observation in the current month's shard, exactly as the scan would: source, verbatim `captured_evidence` (figures, ranges, dates, qualifiers exactly as the source states them), classification (type, tier, corroboration, provisional disposition), attach to its thread (create one if new; when unsure, attach to the existing thread), attach to its drivers.
5. **Report what changed as a result** — *"That's Field Movements × smb-fintech. I scanned that cell on July 8 and came back empty, so I'm marking its sources suspect. Adding it as an observation against Commoditization — that makes five moves, not four."*

### Noise — the item wasted the reader's time

Write a `noise` feedback record against the item and its cell. If noise records accumulate against the same cell or the same kind of item, say so plainly and offer to sharpen the relevance context in `CLAUDE.md`. Offer; do not silently edit.

### Confirming a proposed driver

Set the proposal's `status: "confirmed"`. Create the driver in `drivers.json` with `origin: "emergent"`, a `definition` in plain language (a force, not an outcome), `direction` and `certainty` as the evidence supports (never `High` certainty at creation), `status: "active"`, the thread's observations as `supporting_observations`, and a seed `confidence_log` entry naming the thread and observations it emerged from. Write a `driver_confirm` feedback record.

### Killing or retiring a driver

Set `status: "retired"`. **Never delete it.** Retired drivers and their confidence logs are what the reckoning reads. Append a final `confidence_log` entry recording the retirement and its reason. Write a `driver_kill` feedback record. (For a proposal the user rejects: set the proposal's `status: "dismissed"` — it will not be re-proposed.)

### A stated belief

If the user asserts a view of the world worth tracking (*"I think the edge is in proprietary data"*), offer to hold it as a driver with `origin: "user_asserted"` — direction and certainty as they state it (never seeded at `High` certainty without evidence on file), plus a seed `confidence_log` entry. This is how held beliefs enter the system, and it is what the scan's mandatory falsifier search will then actively test.

### A story that's over

If the user says a story is done ("stop watching the Meta agent thing"), set its thread's `status` to `closed`; a story that's merely gone quiet can be marked `dormant`. **Never delete the thread** — the scan matches against all threads regardless of status, and a dormant story that advances comes back as itself, not as a new one. Thread status moves only here, on the user's say-so.

### A relevance correction

Write a `relevance_correction` feedback record. Offer to edit the relevance context or the zone in/out examples in `CLAUDE.md` — show the proposed edit and apply it only on confirmation.

---

## RULES

1. **Append, never rewrite.** `feedback.json` and every `confidence_log` are append-only. Never delete a driver, a thread, or an observation.
2. **Report every write.** When a conversation changes state, end by saying exactly what changed: records written, cells marked, drivers created or retired, observations added.
3. **Evidence, not deference.** If the user's correction contradicts what is on file, show what is on file first — the point of the store is that disagreements get settled against captured evidence, not memory.
4. **No statistics.** No hit rates, no miss rates, no scoring. The records exist so the math is possible later, elsewhere.
5. **This is how requirements deepen.** The setup interview stays three open questions forever. Everything sharper than that — killed proposals, corrected relevance, hard-won drivers — happens here, one conversation at a time. Nobody ever fills out an intake form.
