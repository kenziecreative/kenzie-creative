# Deduplication and State

The suite keeps two distinct stores. Conflating them is the most likely design mistake, so they are defined separately here, with a clear rule for which is which.

---

## The two stores

### 1. Per-producer ledger — "have I already reported this?"

Each producer that scans a stream over time keeps its **own** ledger to answer one question: *have I already surfaced this, and has it genuinely advanced since?* This is what powers "report motion, not state." The environmental scan already has one (`./ledger.json`); a comms triage would keep its own so it does not re-raise the same Slack thread every morning.

A ledger is private to its producer. It is lightweight, it is not shared, and it is not the review queue. Its schema is the producer's business — the environmental scan's ledger schema is defined in its own SKILL.md.

### 2. Shared candidate queue — "what is waiting to be reviewed?"

One queue, written by all producers, read by the review step (`./candidates.json`, the contract in `candidate-item-contract.md`). This is where cross-producer work happens: merging duplicates, and handing accepted items to the backlog.

**The rule of thumb:** a ledger keeps a producer from repeating *itself*; the queue keeps the producers from duplicating *each other* and feeds review. A producer reads and writes its own ledger; it only ever appends to the shared queue.

---

## Cross-producer deduplication

This is the mechanism behind "comms triage cross-checks meeting triage to avoid duplication." The same real-world thing — say, an action item raised verbally in a standup and then restated in a follow-up email — should reach review as **one** candidate carrying both sources, not two near-identical rows.

How it works:

1. Every producer computes a `dedup_key`: a normalized form of the item's core subject (lowercased, stripped of dates/filler, reduced to the stable noun phrase — e.g. "ship the Q3 pricing page" not "can you get to the pricing page thing before Q3?"). The key targets the *thing*, not the wording.
2. Before appending a new candidate, the producer scans the existing queue for an unreviewed candidate with a matching `dedup_key`.
3. **On a match:** merge instead of adding. Append this producer's `source` and `links` to the existing candidate, update `last_seen`, and keep the stronger evidence (a `corroborated` beats a `single`; a `primary` source beats a `tertiary` one). The merged candidate now records that the same thing showed up in two places — which is itself signal the review step can show.
4. **On no match:** append as a new candidate with `review_status: proposed`.

Matching is on the normalized key, never on fuzzy full-text each run — stable keys are what make identity hold as wording drifts. When two producers' keys *should* match but don't, that is a key-normalization bug to fix, not a reason to abandon merging.

A producer that also keeps a ledger uses the **same id** in both its ledger and the queue, so the three surfaces — its ledger, the shared queue, and the backlog — all refer to one underlying identity.

---

## Pruning

Keep both stores lightweight; neither is a research archive.

- **Ledgers:** prune entries whose `last_seen` is older than a sensible window for the cadence (the environmental scan uses ~30 days for a daily brief).
- **Queue:** once the review step has dispositioned a candidate (`accepted`/`rejected`), it no longer needs to live in the queue — accepted items live in the backlog, rejected ones are gone. Prune reviewed candidates on a short window (e.g. 7 days) so recently-rejected items still suppress immediate re-proposal, then drop them. `deferred` items stay until reviewed.

---

## Why separate stores

It is tempting to make one file do both jobs. Resist it. The ledger's job is suppression *within* a producer and it churns every run; the queue's job is accumulation *across* producers until a human reviews it. They have different lifetimes, different writers, and different readers. Keeping them separate means a producer can be developed and tested on its own ledger logic without touching shared state, and the shared queue stays a clean, single-purpose handoff to review.
