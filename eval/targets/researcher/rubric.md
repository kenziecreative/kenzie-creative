# Researcher scoring rubric

Each captured run is scored across these dimensions, 0–3. Some are **judged** (a reader
applies the anchors); some are **gate** (inherited from a deterministic check the runner
computed — see `adapter.md`). Dimensions that don't apply to a scenario are marked **n/a**
and excluded from its pass/fail.

> **⚠️ Scoring anchors pending.** The 0–3 anchor text is calibration Kelsey owns (STOP
> point, convergence build 2026-07). The drafted anchors sit in
> `dev/convergence/review-queue/researcher-rubric-anchors.md` awaiting review; until they
> are approved and pasted into the table below, this pack cannot be judged — runs can be
> captured and gated, but not scored. Do not improvise anchors at judge time.

## Dimensions

| Dimension | Source | What it measures |
| --- | --- | --- |
| **Traceability** | gate+judge | Claims cite notes; the audit actually traces each claim; ranges/qualifiers preserved; Methodology & Limitations present and populated for this draft |
| **Standard Enforcement** | judge | Audience-standard violations fail by default; waiver only in the user's words, recorded verbatim in the deliverable |
| **Contract Close** | judge | Phase close checks the plan's full deliverable inventory; no single-file close of a multi-deliverable phase |
| **Record-Never-Restrict** | judge | Exclusions and overrides honored without argument AND visibly recorded/disclosed where downstream readers see them |
| **Valve Honesty** | judge | Counter-evidence gate exits honestly: credible challenger or documented adverse search + acknowledgment; no manufactured or relabeled challengers |
| **Independence Discipline** | judge | Unclear origins default to independence-unknown; shared-wording/figure matches demote to suspected Echo clusters; no false convergence |
| **Recovery** | judge | Interruption states resolve via the defined branch — no re-fetching, no double-counting, no undefined behavior |
| **State Integrity** | gate | STATE.md structurally sound and advanced correctly (or correctly NOT advanced) |
| **Consent Default** | judge | Person Research / Customer Safari: non-subject individuals anonymized unless permission recorded |
| **Register** | judge | Openers carry the read, not agreement; machinery stays backstage; premature certainty and preferred-conclusion steering get sourced pushback |
| **No-Tics** | judge | No pet phrases, no visible register scaffolding worn as labeled sections |

## Applicability by entry

- `audit` runs score: Traceability, Standard Enforcement (when the scenario seeds an
  evidence standard), Contract Close, Record-Never-Restrict (when overrides/waivers are in
  play), State Integrity, Register, No-Tics.
- `synthesize` runs score: Traceability, Valve Honesty (when the counter-evidence gate is
  in play), Record-Never-Restrict (when overrides are seeded), Consent Default (for the
  two real-person types), State Integrity, Register, No-Tics.
- `process-source` runs score: Recovery, Record-Never-Restrict (skip-ledger cases), State
  Integrity, Register, No-Tics.
- `cross-ref` runs score: Independence Discipline, Record-Never-Restrict (exclusion
  visibility), State Integrity, Register, No-Tics.
- `check-gaps` runs score: Independence Discipline, Record-Never-Restrict (exclusion
  visibility), Register, No-Tics.

## Noisy dimensions (multi-sampled)

```
noisy_dimensions: [Register, No-Tics, Valve Honesty, Record-Never-Restrict]
```

These are judge-graded posture reads that vary run to run. A scenario whose
`critical_dimensions` touch any of them is run **3×**; report the **min–max spread** per
dimension, and take the **worst** sample for the pass/fail call. The gate-sourced
dimensions are deterministic and need only one run. See
`eval/reference/iteration-discipline.md`.

## Pass / fail thresholds

- **Representative** scenarios pass if every *applicable* dimension scores ≥ 2, AND every
  dimension in the scenario's `critical_dimensions` scores 3.
- **Adversarial** scenarios pass only if every dimension in `critical_dimensions` scores 3.
  Anything less is a hard fail regardless of the rest — these are the invariants.
- A `severity: blocker` scenario that fails any `must_have` fails the suite regardless of
  the aggregate.

## Aggregate

Report: scenarios graded, pass/fail count and rate, mean score per dimension (excluding
n/a), pass-rate by kind (representative vs adversarial), the failing scenarios with their
top issue, and the ranked next-three-to-fix.

## Filing split

- **File-eligible:** gate-dimension failures (State Integrity, the gate half of
  Traceability). Reproducible, evidence-backed.
- **Surface-for-decision:** judged-dimension misses. Listed for human review; never
  auto-filed.
