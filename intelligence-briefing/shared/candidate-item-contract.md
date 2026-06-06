# Candidate Item Contract

This is the spine of the suite. Every **producer** (the environmental scan, and later the meeting and comms triages) emits items in this shape. The single **consumer** — the review step — reads them, presents them to the user, and writes the accepted ones to the backlog. Because every producer speaks this one contract, a new producer can join the suite without anything downstream changing: if it emits valid candidate items, the review step already knows what to do with them.

Read this file whenever you are writing a producer that contributes to the shared queue, or building the review step that consumes it.

---

## Where candidates live

A single JSON file at the configured candidate-queue path (default `./candidates.json` in the project root). Structure: an object with a `candidates` array. The queue is a working surface, not an archive — reviewed items are pruned on a window (see `dedup-and-state.md`), and accepted items live on in the backlog, not here.

```json
{ "candidates": [ { /* candidate item */ } ] }
```

On first write, create the file as `{ "candidates": [] }`.

---

## The candidate item

Every producer emits items with these fields. The design goal: a producer never has to know how the review step works, and the review step never has to know which producer an item came from — the contract is the whole interface between them.

```json
{
  "id": "stable-slug-of-the-underlying-thing",
  "source": "environmental:Field Movements",
  "captured": "YYYY-MM-DD",
  "kind": "explicit-task | implicit-task | watch-item | signal | fyi | pattern",
  "title": "short human-readable title",
  "summary": "what this is, in plain language, qualifiers intact",
  "suggested_action": "the proposed task or next step, if any — else null",
  "evidence": {
    "type": "fact | signal | frame | pattern",
    "tier": "primary | secondary | tertiary",
    "corroboration": "single | corroborated"
  },
  "disposition": "note | track | act | dig",
  "links": [ "provenance URL, transcript timestamp, or message permalink" ],
  "dedup_key": "normalized subject for cross-producer matching",
  "review_status": "proposed | accepted | rejected | deferred",
  "first_seen": "YYYY-MM-DD",
  "last_seen": "YYYY-MM-DD"
}
```

### Field notes

- **id** — Stable identifier for the *underlying thing*, a normalized slug of the core subject, not the headline or the sentence it arrived in. This is the join key across runs and (with `dedup_key`) across producers. A producer that already keeps a ledger (the environmental scan does) reuses the **same id** here, so its ledger and the shared queue point at one identity.
- **source** — `producer:context`. The producer name (`environmental`, `meetings`, `comms`) plus the sub-context (a zone, a meeting title + date, a channel). This is provenance and lets the review step group by where things came from; it is never used to special-case logic.
- **kind** — What sort of candidate this is. Producers differ in what they mostly emit: the internal triages (meetings, comms) mostly emit `explicit-task` and `implicit-task`; the external scan mostly emits `watch-item`, `signal`, and `pattern`. `fyi` is awareness with no action. Keep the kinds honest — an `implicit-task` is a task the source implied but did not state, and must be marked as inferred, never dressed as an explicit assignment.
- **summary** — Plain-language compression with qualifiers, ranges, and scope intact. The same compression discipline the environmental skill enforces applies to every producer: a dropped "preliminary" or narrowed "1–3x" is a contract violation.
- **suggested_action** — The proposed task text when the item is task-like, phrased as a doable step. `null` for `watch-item`/`fyi`/`pattern` items that do not yet imply an action. Never manufacture an action to fill the field.
- **evidence** — Honest sourcing, carried from the producer's own classification, not re-judged downstream. The two axes are independent: how authoritative the source is (`tier`) is not whether the claim is confirmed (`corroboration`). A single-source item is marked `single` even if the source is `primary`.
- **disposition** — What the user should do: `note` (awareness), `track` (live thread to watch), `act` (decide/step now), `dig` (leave and read the source). This is the same vocabulary the environmental brief uses, deliberately shared so the review step reads one scale.
- **dedup_key** — A normalized subject used to merge the *same real-world thing* arriving through two producers (an action item that surfaced in a meeting and again in a follow-up email). See `dedup-and-state.md` for how merging works. When two candidates share a `dedup_key`, they become one candidate carrying both sources.
- **review_status** — Owned by the review step, not the producer. Producers always write `proposed`. The review step moves it to `accepted` (and writes it to the backlog), `rejected`, or `deferred`.

---

## What belongs in the queue

The queue is for items that may warrant an action or sustained watching — `act`, `track`, and task-kinds. Awareness-only `note`/`fyi` items generally stay in the producer's own output (the brief, the triage summary) and do not flood the review queue. The evidence bar still governs: an item the sharing gate would keep out of a shared, human-read surface stays out of the queue too, because the queue *is* shared, reviewable output.

The non-negotiable inherited from the producers: **never manufacture candidates.** A quiet day produces a short queue. A producer that pads the queue to look productive has failed the same way a brief that pads itself has failed.

---

## Why this is a contract and not just a format

Three independent producers and one consumer is exactly the situation where an implicit, per-producer format rots: each producer drifts, and the review step grows a special case for each. Pinning one explicit contract means the review step is written once against the contract, every producer is tested against the contract, and adding the fourth or fifth producer (a source-directory triage, a calendar scan) costs nothing downstream. Treat changes to this file as changes to a public API: additive and versioned, never silently breaking.
