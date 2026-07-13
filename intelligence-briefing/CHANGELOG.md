# Changelog — intelligence-briefing

All notable changes to the Intelligence Briefing plugin. Per-plugin semver; tags are
plugin-scoped (`intelligence-briefing-vX.Y.Z`). Entries below 0.3.0 are reconstructed from
git history; the plugin's pre-marketplace iterations moved quickly, so early dates cluster.

## 1.1.0 — 2026-07-12

**Durable collection.** A disclosed re-attack on 1.0.0 (pass 2 of the external blind review)
found the rebuild's state model sound but incomplete, with one disease showing through eight
seams: **collection success was not durable.** The system recorded an obligation, failed it,
and then lost the failure — a rate-limited cell was disclosed on the morning it failed, then
advanced as though it had succeeded, so the next day's brief could call the rotation current
while the missed interval was never recovered. 1.1.0 makes every mandatory collection
obligation record an outcome, and makes that outcome gate what the brief is allowed to claim.
No new dependencies, no subagents, no pruning; the editorial layer is untouched again.

- **A failed obligation is a debt, not a completed step.** A cell that fails keeps its old
  `last_successful_scan` and its old `next_due`, so it stays due and gets retried until it
  actually succeeds. New `last_successful_scan` / `last_attempted` / `consecutive_failures`
  fields separate "we tried" from "we saw," and **every gate reads the one that means
  something.** The brief's rotation percentage now counts successful scans, never attempts.
- **Signposts and driver falsifiers get outcomes too.** All three collection classes now share
  one vocabulary (`ok` / `empty` / `failed`), and the run record persists a row per due
  signpost and a row per active driver's falsifier search — the counter-hypothesis, the query,
  and what came back. **Any failed obligation degrades the run**, not just a failed cell.
  *"Nothing surfaced against your four active drivers"* is now legal only when all four
  searches actually completed; a failed falsifier renders as untested drivers, because an empty
  search and a search that never ran are different facts and must never read as the same
  sentence.
- **`idle`: a fourth run status.** With zero cells due, "every due cell succeeded" and "no cell
  completed" were both vacuously true, so the same morning could be reported as full health or
  as total collection failure. `idle` names the state where nothing was owed, and it gets its
  own honest rendering — never "0 of 0 cells due today completed."
- **The rotation is staggered at setup.** Cells' opening `next_due` dates now spread across the
  first cycle instead of all falling due on day one. This is what makes a weekly matrix behave
  as the "partial sweep each morning" it always promised: without it, a daily deployment had
  every cell due on day one, nothing due for six days, and a first run of well over a hundred
  searches that would rate-limit itself into a degraded first brief.
- **Per-cell collection windows.** Each cell now searches back to *its own* last successful
  scan, not to the last run's window. A weekly cell searches a week of territory even when
  yesterday's daily run completed; previously it inherited the run's one-day window and six
  days went missing. The run window, the cell windows, and the reader window are now three
  named things that cannot be mistaken for one another.
- **Derivative coverage no longer inflates drivers.** The material-advance judgment the scan
  already made at the thread layer is now recorded on the observation (`contribution`) and
  honored at the driver layer: a derivative observation attaches, but does not increment
  `observation_count` and does not satisfy the reassessment cause gate. Ten outlets restating
  one announcement used to make a driver look ten observations stronger; now it looks exactly
  one event stronger, which is what happened. `/intel-export` carries only material advances,
  so a foresight driver can't arrive backed by seventeen hits that are one story told
  seventeen times.
- **Observations dedupe on source URL** before capture — what the grace window always claimed
  and never implemented. This is a check before a write, never a prune: nothing in this system
  deletes an observation.
- **Verification checks the verb.** `captured_evidence` now carries the source's own claim in
  the source's own words, alongside the verbatim figures, plus a locator and a retrieval
  timestamp. A source that *proposed* a restriction, written up as one that *imposed* it, used
  to pass every check the brief could run — the date, the region, and the range all survive
  that misreading intact. The predicate is now checked first, against the source's own. Any
  item reaching `act`, or moving a driver, must rest on a source that was actually opened; a
  search snippet is a pointer, not a source.
- **Overflow preserves epistemic safety.** An item compressed to the "Also in this zone" line
  now carries its qualifiers, its type, its disposition, its non-default source marks, and —
  for a Signal — a compact uncertainty clause. Compressing a single-source tertiary preliminary
  finding down to a bare title didn't preserve it, it laundered it: the reader saw a clean
  claim exactly where they had least room to question it. Markdown and HTML now render this
  line identically, as the "content identical across formats" guarantee always required.
- **A corrected mandate now reaches the territory.** The relevance context says what matters;
  the coverage matrix says where the system actually looks, and they are different files.
  Editing the first no longer silently leaves the second scanning the old world: the review
  conversation re-derives the domain cells, names the ones the matrix is missing, and offers to
  add them — retiring the obsolete ones rather than deleting them, so the record of what the
  system used to be blind to survives.

## 1.0.0 — 2026-07-12

The rebuild. A hostile blind review of 0.3.0 confirmed nine findings with one root cause:
**the run was the system** — collection, memory, analysis, verification, and publication all
collapsed into one morning, so the product produced intelligence daily and threw it away.
1.0.0 splits the run from the system. The editorial layer, which the review left untouched,
is preserved intact. This is the first version whose promises match its mechanics; the
architecture and the config shape both change, hence the major version.

- **Three skills instead of one, split by who owns the cadence.** `environmental-scan`
  collects on a rotation and writes state (no document); `environmental-briefing` reads state
  and writes the brief; `intelligence-review` is a conversation for interrogating and
  correcting the picture — the only surface where the user writes to the system after setup.
  `/brief` chains scan → brief, so daily use is unchanged: one command.
- **A persistent state layer under `intel/`** in the deployment: observations (sharded by
  month, never pruned, each carrying verbatim `captured_evidence` from gather time), drivers
  (forces with an append-only confidence log and an implication clause), signposts (tripwires
  with due dates the scan actually comes back and checks), threads (story identity, assigned
  once, never re-derived), a zones × domain-cells coverage matrix, run records, and feedback.
- **Coverage is earned across the rotation, not claimed in a morning.** Each run scans the
  cells due today; the matrix completes over the week. The README claim is now "reads broadly
  over the rotation; reports narrowly every day" — within-run breadth is no longer claimed
  anywhere, because the mechanics cannot support it and never will.
- **A mandatory collection-health line on every brief.** A quiet-day judgment is permitted
  only if every cell due today completed; otherwise the brief says **assessment degraded**,
  names the failed cells, and no driver moves on the partial look. Silence is now attributable.
- **The brief reports movements, not articles**: signposts fired or expired, driver movements,
  material thread advances — each item situated (which story, which force, for or against,
  what it implies). Derivative coverage of an unchanged story is captured but never emitted.
- **Verification is re-derivation, not self-review.** Every figure, range, date, and qualifier
  in the draft must be found in its observation's `captured_evidence` — captured before any
  compression — or the claim is cut. No verifier subagent: a second reader of the same draft
  inherits the same misreading; re-derivation from evidence does not.
- **The disconfirming section has a mechanism.** Held beliefs are gone from config (the one
  real deployment left them empty); beliefs are now drivers with `origin: "user_asserted"`,
  and the scan runs a mandatory falsifier search against every active driver, every rotation.
- **A monthly reckoning** as a section of the brief: what moved, what held, what you were
  wrong about — read from the confidence logs, including retired drivers.
- **The hard per-zone cap is gone.** `max items per zone` becomes `zone detail budget` — a
  depth ceiling, not an emission cap. Overflow compresses to one-line entries; no material
  item is ever silently dropped. There is now a compliant output for every day.
- **The action-gate contradiction is fixed** (the review's only architecture-independent bug):
  the primary-source exception — a single primary source whose authority is self-evident may
  carry `act` — is now worded identically in the evidence bar, the verification gate, and the
  deployment template.
- **Run records end silent data loss**: a second run on the same date writes `-02`, never
  overwrites; a quiet day still writes a run record, so the next run never mistakes itself
  for a first run; catch-up windows derive from the last run record.
- **`/intel-export`** hands accumulated drivers to a Strategic Foresight cycle in its driver
  format (same `direction`/`certainty`/`time_horizon` vocabulary by design), with the
  confidence log and implication carried along. Drivers are exported, never observations —
  no ratings or composite scores are fabricated.
- **The ledger's role shrinks** to shared `/contract` state only (the observation store is
  the memory now); its 30-day prune touches nothing but its own rows.
- Deliberately **not** built, on the merits: estimates and probabilistic forecasts, a separate
  weekly/monthly product, an indications-and-warning subsystem, calibration math over the
  feedback records (schema now, math later), numeric driver scores, a driver status board in
  the brief, and a verifier subagent.

## 0.3.0 — 2026-06-07

Refocused to the **external scan only** and folded into the Kenzie Creative marketplace.

- The plugin is now squarely the outward-facing environmental brief — it scans the outside
  world (news, industry movement, research, policy, science) and triages it; the internal
  streams that earlier shared its spine moved out to their own plugins.
- **Shared state moved to the `/contract` convention.** The earlier in-plugin "suite mode" /
  `shared/` contract is superseded by the deployment-level `/contract` queue. The ledger now
  belongs to the deployment directory and carries a `source: "environmental"` tag so it works
  whether or not other plugins share the directory.
- Marketplace-level repositioning: catalog entry and READMEs rewritten to describe the brief
  for adopters.

## 0.2.0 — 2026-06-07

- **Self-contained HTML brief.** The brief renders as a single styled, self-contained HTML
  page by default (inlining the stylesheet), with `format: markdown` still available for the
  plain brief. The brief's *content* is identical across formats — only presentation differs.
- **`theme` option.** `default` ships brand-neutral system fonts; a deployment can point
  `theme` at a local CSS override to apply its own brand without editing the plugin.

## 0.1.5 — 2026-06-07

- **No-shell file ops.** Reading config and the ledger, and writing the brief, all go through
  Read/Write/Edit — never shell — so the brief incurs no needless permission gate.
- **Setup permission preamble.** `/intel-setup` now sets expectations on file-creation
  approvals up front, including the "allow for this project/session" shortcut.
- Folded the unreleased 0.1.4 documentation work into this release.

## 0.1.3 — 2026-06-07

- **WebSearch as the baseline, scanning inline.** The brief depends only on built-in
  `WebSearch`/`WebFetch`, never a required search MCP or CLI, and runs the scan in-session
  rather than delegating to subagents (which can't reach the web).
- `/intel-setup` writes a narrow project allowlist (`.claude/settings.json`) and runs a
  web-search pre-flight check before the test brief.
- Dropped the stray `metadata.version` from the marketplace entry.

## 0.1.2 — 2026-06-06

- Tightened the `/intel-setup` question contract — relevance context in the user's own words,
  no persona menus, no inferring the user's role or employer from the environment.
- Removed organization-specific examples from the shared docs.

## 0.1.1 — 2026-06-06

- Kept maintainer-facing content out of the user surfaces.
- Documented dual install instructions (Claude Code and Cowork).

## 0.1.0 — 2026-06-06

Initial release.

- The external environmental scan — five fixed zones (Emerging Impact, Currents, SciTech
  Frontier, Policy Levers, Field Movements) filtered against a deployment's relevance context,
  weighed against a configurable evidence bar, and written as a dated brief.
- Epistemic classification (fact / signal / frame / pattern), source tier and corroboration
  marking, the named evidence bars (`situational` / `decision` / `shareable` / `strict`), and
  a hard verification gate against qualifier-stripping and range-narrowing.
- A ledger so the brief reports motion, not repetition, with a novelty test for returning
  stories.
- `/intel-setup` to configure a deployment and `/brief` to run one on demand; the same
  operation a scheduled task performs.
