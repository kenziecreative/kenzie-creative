# Changelog — intelligence-briefing

All notable changes to the Intelligence Briefing plugin. Per-plugin semver; tags are
plugin-scoped (`intelligence-briefing-vX.Y.Z`). Entries below 0.3.0 are reconstructed from
git history; the plugin's pre-marketplace iterations moved quickly, so early dates cluster.

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
