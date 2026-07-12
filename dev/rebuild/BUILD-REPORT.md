# intelligence-briefing v1.0.0 — Build Report

**Built:** 2026-07-12, one session, Fable 5 (`claude-fable-5`), effort xhigh, branch `review/intelligence-briefing`.
**Contract:** `dev/rebuild/intelligence-briefing-v1-build-spec.md`, built from it alone after reading the full source pack it names (the v0.3.0 corpus, the 2026-06-07 brief and its deployment config + ledger, the pass-1 blind review, foresight's `scanning-drivers.md`, root `AGENTS.md`).
**Outcome:** all ten review-standard points pass (checklist with command output at the end). Committed and tagged `intelligence-briefing-v1.0.0`. **Not pushed** — see Deviations.

---

## 1. What was built, file by file

### New files

- **`intelligence-briefing/skills/environmental-scan/SKILL.md`** — the collection skill (spec §5). Frontmatter verbatim from the spec. Contains: the §9.1 framing ("coverage agent at collection, triage agent at presentation"), tooling discipline (§2.9: inline WebSearch/WebFetch, no subagents, no shell), the full state layout and all seven JSON schemas with empty forms (§3.4, §4.1–4.7 — this skill is the writer of record, so the schemas live here in full), the ZONES section carried from v0.3.0 (§2.1, relocated here as §2 permits — zones are a collection lens set), the full CLASSIFICATION section (§2.2, relocated — classification happens at capture), and the eleven steps of §5 in order, including the three-part collection plan (due cells → due signposts → driver falsifiers), the captured-evidence discipline, thread matching with the attach-to-existing bias, signpost resolution (expired = information), the standing+cause reassessment gate ("if standing fails, no driver moves. Full stop."), emergent proposals (record, never create), and run-record closing rules.
- **`intelligence-briefing/skills/intelligence-review/SKILL.md`** — the conversation skill (spec §7). Frontmatter verbatim. The asymmetry argument (§7.2) stated as the skill's justification; no named entry points (§7.1); per-input procedures for question / miss / noise / driver confirm / driver kill / stated belief / relevance correction (§7.3 expanded into executable steps, including the full miss procedure: feedback record → locate cell → mark suspect → search and capture the missed item as a real observation → report what changed); feedback schema; the "schema now, math later" rule stated as a prohibition on computing rates.
- **`intelligence-briefing/commands/intel-export.md`** — the foresight export (spec §10). Drivers, not observations; the field-mapping table; the zone→STEEP table applied at export time only; `confidence_log` and `implication` exported despite having no foresight equivalent; no ratings or composite scores ever fabricated.

### Rewritten files

- **`intelligence-briefing/skills/environmental-briefing/SKILL.md`** — the presentation skill (spec §2 preserved + §6). Renamed `environmental-briefing-agent` → `environmental-briefing` (spec frontmatter, verbatim). Reads state, writes the document, does not collect. New: the movement priority order (§6.1), situated items (§6.2), the mandatory COLLECTION HEALTH section with all four paths and the exact quiet-vs-degraded rule (§6.3), the disconfirming mechanism reporting falsifier-search results (§6.4), the reckoning (§6.5, trigger and content), detail budget with compression-never-deletion (§6.6), the assemble/write/never-overwrite/ledger steps (§6.7), re-derivation VERIFICATION (§9.3, seven steps, hard gate), and the OUTPUT CONTRACT updated for all v1 sections. Preserved from v0.3.0 verbatim in substance: the RULES block (qualifiers, honest sourcing, type distinctness, earned relevance, empty slots, own words, varied language), the EVIDENCE BAR (two independent gates, four named bars) with the §9.5 exception propagated, the classification/disposition vocabulary (with §9.6's "honest default" sentence removed and `dig` named the success state), the halt contract, the ledger's /contract schema, format/theme handling.
- **`intelligence-briefing/skills/environmental-briefing/references/html-brief.md`** — all v0.3.0 content blocks carried verbatim; added the §6.8 blocks exactly as specified (collection health ×3, signpost fired/expired, driver clause, zone overflow, proposal, reckoning), the content-block order updated, the disconf copy updated to the falsifier-search empty state, and the Cowork-safe rules restated (no JS, no entrance animations, no shadows/edge bars, never overwrite).
- **`intelligence-briefing/commands/intel-setup.md`** — v0.3.0 kept verbatim in substance (three open questions word-for-word, all four guardrails, approvals pre-warning, `.claude/settings.json` pre-allow, web-search pre-flight, test run, scheduling) plus §8's changes: forces derived and played back (A, with the driver-not-outcome rule and the never-seed-High rule), domain cells (B), the coverage matrix with na_reasons and frequency defaults (C), held beliefs deleted — a belief stated at setup becomes a `user_asserted` driver (D), `zone detail budget` rename (E), and all state files created via Write (F).
- **`intelligence-briefing/commands/brief.md`** — now chains environmental-scan → environmental-briefing (§3.2, §12.7), with the failed-run refusal.
- **`intelligence-briefing/templates/CLAUDE.md`** — held beliefs section deleted (replaced by a comment pointing at the conversation mechanism); `Max items per zone` → `Zone detail budget` with the depth-ceiling comment; the action gate reworded to the §9.5 sentence (identical to the skill's two instances); Paths gains the `./intel/` row; intro updated for three skills. Everything else — the three [FILL] relevance fields, evidence bar options, cadence, zones with in/out slots, output/theme — carried unchanged.
- **`intelligence-briefing/assets/brief.css`** — §6.8's CSS appended verbatim. Nothing above the append point touched.
- **`intelligence-briefing/README.md`** — rewritten for v1 (§9.2): the breadth claim is now "reads broadly over its rotation and reports narrowly every day: every brief tells you exactly what it covered and what it did not" — mechanism stated, no within-run breadth claimed anywhere. Commands table gains `/intel-export`.
- **`intelligence-briefing/.claude-plugin/plugin.json`** — version `1.0.0`, description prefix `v1.0.0 — `, copy rewritten to the earned claims.
- **`intelligence-briefing/CHANGELOG.md`** — 1.0.0 entry: names the root defect, what changed, and what was deliberately not built.
- **`intelligence-briefing/AGENTS.md`** — updated for the three-skill structure; records the three-place action-gate invariant, the never-prune rules, the no-subagent lock **scope note** (§2.9's "recorded so a future maintainer knows"), the do-not-build list, and the STEEP-lives-only-in-export caution.
- **Root `​.claude-plugin/marketplace.json`, `README.md`, `AGENTS.md`** — catalog description (v1.0.0 prefix), "Plugins at a glance" row, and plugin-list entry updated per the release loop.

### Not touched

The 2026-06-07 deployment at `~/Projects/_shared/Core Intelligence/` (read only). `dev/blind-reviews/`, `dev/convergence/`. Every other plugin. The existing rules in `brief.css` above the appended block.

---

## 2. Judgment calls (spec left room; what I chose and what else was considered)

1. **Where emergent-driver proposals persist.** §5.10 says "record a proposal"; §6.1.5 renders it; §7.3 confirms it — but no §4 schema holds it. **Chose:** a top-level `"proposals"` array in `drivers.json` (empty form `{"drivers": [], "proposals": []}`), each `{proposal_id, thread_id, statement, observation_count, proposed, status: open|confirmed|dismissed}`; only the review conversation changes status. **Considered:** deriving proposals from threads at brief time (fails on dismissal — a rejected proposal would re-render forever); a separate `proposals.json` (a seventh state file, larger addition); a flag on the thread (spreads driver state into threads). Smallest addition that makes three specified behaviors mechanically coherent.

2. **STEEP fields vs "applied at export time only."** §4.2's schema example shows `steep_primary: "T"` populated, while §10 says the zone→STEEP mapping "does not live in the daily runtime." **Chose:** the fields stay in the schema (so the export is lossless by shape) but are seeded `null`/`[]` and never touched by scan or brief; `/intel-export` computes STEEP from supporting observations' zones at export time and emits it **without writing back**. A driver with no observations yet falls back to its `cell_ids` rows' zones. **Considered:** maintaining STEEP in scan step 9 (directly violates §10); backfilling drivers.json at export (an export command mutating source state is surprising). Recorded as a spec tension below; AGENTS.md carries a "don't fix that" caution.

3. **Reckoning trigger memory.** §6.5 triggers "30+ days since the last reckoning," but nothing in §4 stores when a reckoning last ran. **Chose:** the briefing sets `"reckoning": true` on the run record whose brief carried one; the last-reckoning date is derived from `runs.json`; if none exists, the clock starts at the deployment's first run. **Considered:** a marker file (another artifact); putting it in CLAUDE.md (config is not state). One optional field on an existing append-only record.

4. **"Checked in the last seven days" for null-due signposts.** §4.3 stores no `last_checked`. **Chose:** derive from `runs.json` `signposts_checked` arrays — a null-due signpost is due when no run in the last seven days lists it. No schema change.

5. **Grace window kept.** The spec's window derivation (§5 step 1) doesn't mention v0.3.0's 6-hour grace window, and §8 doesn't delete it from the template. **Chose:** keep it, as an overlap extending `window_start` earlier — harmless because already-captured observations are never duplicated, and it still covers indexing lag (its original purpose; catch-up after skipped runs is now handled by run records). The config field stays read by a step, avoiding the read-by-no-gate disease the review flagged.

6. **Ledger row identity.** v0.3.0's ledger id was an agent-generated slug re-derived every run — part of confirmed Finding 6. The spec shrinks the ledger's role but doesn't restate its id rule. **Chose:** `id` = the item's `thread_id` (assigned once by the scan, never re-derived). Entry shape otherwise unchanged so the /contract convention is undisturbed.

7. **"Empty forms" vs seeded content at setup.** Review-standard point 7 says the six state files are "created in their empty forms by `/intel-setup`," while §8.A–C have setup writing seeded drivers and a filled coverage matrix. **Interpreted as:** all six files exist after setup with their valid structural forms — `signposts`/`threads`/`runs`/`feedback` as literal empty forms, `coverage.json` and `drivers.json` in the same structural form carrying the content §8 explicitly requires. Setup also creates the current month's observation shard (which creates `intel/observations/`) and `ledger.json` — both required by §3.4/§8.F though outside the count of six.

8. **Distribution of §2 content across skills.** Zones and full classification moved to the scan skill (collection-side, where they operate); the briefing skill carries the evidence bar, verification, editorial rules, and a compact classification restatement sufficient to enforce the bar and re-check labels. §2 explicitly permits relocation. The disposition vocabulary is therefore stated in both skills (each must run cold on a possibly-weaker model); drift risk accepted and noted in AGENTS.md.

9. **Falsifier search for `Uncertain` drivers.** §5.3c mandates searching against each driver's "current direction"; an `Uncertain` driver has none. **Chose:** for those, search for whatever would settle the direction either way. Smallest coherent completion of a mandatory step.

10. **Export destination and scope.** §10 is silent on where the export file lands and which drivers go. **Chose:** `exports/scanning-drivers.json` in the deployment, `-02` on collision; writing into a named foresight project only when no file exists at its `outputs/scanning/scanning-drivers.json` (never clobber another system's state — stop and tell the user instead); **active drivers only** (retired drivers are history, not live forces; the reckoning reads them at home), with the exported/left-behind counts reported.

11. **Rotation percentage definition.** §6.3's example says "Rotation 78% complete this week" without defining it. **Chose:** the share of applicable cells whose `last_scanned` is within their `required_frequency_days`.

12. **No push.** See Deviations.

13. **Commit granularity.** One commit for the whole build including this report, then the tag — the spec's proof-trail and release sections imply a single releasable unit, and the two text-only fixes (§12.6) ride in the same rewritten files.

---

## 3. Where the spec was ambiguous, wrong, or silent

Stated plainly, per the handoff's instruction to assume defects:

- **§4.2 vs §10 (STEEP) is a genuine internal tension.** The schema example shows populated STEEP on a stored driver; §10 says the mapping is export-time-only. Both cannot be literally true for stored state. Resolved per judgment call 2 without building either contradictory branch into runtime behavior; a future session may prefer backfill-at-export.
- **Proposals have no home in the data model.** Three sections consume a record no schema defines (judgment call 1).
- **The reckoning trigger has no persistence** (judgment call 3).
- **Null-due signpost check cadence needs a derivation the spec doesn't state** (judgment call 4).
- **Review-standard point 7 ("empty forms") conflicts mildly with §8.A–C (seeded content)** (judgment call 7).
- **§6.3's rotation percentage is undefined** (judgment call 11).
- **§13 says "push"; THE HANDOFF's outcome says "committed and tagged."** Treated as a deliberate two-stage release with STOP B verification in between (see Deviations); flagging it here because the spec says both.
- Minor: §5.3c's mandatory falsifier search is undefined for `Uncertain` drivers (judgment call 9); §10's export omits a stance on retired drivers and on the output path (judgment call 10).

None of these rose to the "internally contradictory — build neither branch" bar: each had a conservative completion that adds no §11 item and no feature.

---

## 4. Deviations from the spec

1. **Not pushed.** §13's release loop ends "commit, tag, push." THE HANDOFF's outcome is "committed and tagged," and `dev/STATE.md` schedules a STOP B verification session before release. A push publishes; a pushed tag is effectively irreversible; a local one is not. I committed and tagged and stopped there. Pushing is one command (`git push origin review/intelligence-briefing intelligence-briefing-v1.0.0`) once STOP B is satisfied.
2. **No other deviations.** §2 items are carried in substance (several relocated between files, which §2 permits); every §11 item is absent; no subagents are used anywhere; the skills' shell prohibition is runtime-only (the build used Bash for validation, git, and grep sweeps only, per THE HANDOFF's tool-access note).

Things that may look like deviations but are not: the scan skill writing new signposts in step 9 (§4.3's lifecycle requires a writer; the "Watch for" → signpost promotion in §0/§1 requires it); the review skill using WebSearch (its spec frontmatter grants it, and the §7.3 miss procedure requires capturing the missed item); `environmental-briefing-agent` → `environmental-briefing` (the spec's frontmatter, stated verbatim).

---

## 5. Review-standard checklist

**1. `claude plugin validate ./intelligence-briefing` — PASS**

```
Validating plugin manifest: /Users/kelseyruger/Projects/_shared/kenzie-build-intelligence-briefing/intelligence-briefing/.claude-plugin/plugin.json

✔ Validation passed
```

**2. `claude plugin validate .` — PASS**

```
Validating marketplace manifest: /Users/kelseyruger/Projects/_shared/kenzie-build-intelligence-briefing/.claude-plugin/marketplace.json

✔ Validation passed
```

**3. `node dev/scripts/check-version-prefix.mjs` — PASS**

```
OK    intelligence-briefing  v1.0.0
OK    catalog:intelligence-briefing  v1.0.0
OK    readme:intelligence-briefing  v1.0.0
OK    agents:intelligence-briefing  v1.0.0
...
All 7 plugin(s) agree across plugin.json, the catalog, the README table, and the AGENTS list.
```

(Full output showed all seven plugins OK across all four surfaces.)

**4. Every §2 item present and substantively unchanged — PASS.** Verified by grep sweep and read-through: the five zones (scan skill, definitions verbatim); tier/corroboration as independent axes with the "primary *and* single" sentence (both skills); Note/Track/Act/Dig (both skills; only the §9.6 sentence removed); the two-gate bar with all four named bars (briefing skill); qualifier/range preservation (briefing RULES 5 + VERIFICATION 4, "among surveyed firms" example intact); the Signal uncertainty note (both skills); the HTML rendering rules (self-contained, CSS inlined verbatim, system fonts, no JS, no entrance animations, flat, theme-override mechanism unchanged, existing blocks carried); the editorial voice rules (own words, varied language, empty slots, no padding); tooling discipline (inline WebSearch/WebFetch, no subagents, no shell — stated in scan, briefing, review, and setup); the setup guardrails (three questions verbatim; no personas; no inference; no real names).

**5. Every §11 item absent — PASS.** Grep sweep for estimates/probabilities, weekly product, I&W apparatus, calibration math, velocity/numeric scores, quotas, composite score, driver status board, verifier subagent, intake wizard: the only hits are negations (the review skill's "no statistics" rule, the export's "no composite scores fabricated", CHANGELOG's "deliberately not built" list). No skill or command builds any of them.

**6. §9.5 action-gate rule worded identically in three places — PASS.** Grep for the exact sentence ("When ON, a single-source item may carry `note`, `track`, or `dig`, but never `act` — **unless** the single source is **primary and its authority is self-evident** (the issuing body publishing its own final, binding action). Acting otherwise requires corroboration.") returns exactly: `skills/environmental-briefing/SKILL.md` ×2 (EVIDENCE BAR, VERIFICATION step 6) and `templates/CLAUDE.md` ×1. Byte-identical in all three.

**7. All six state files created in their empty forms by `/intel-setup`, Write only — PASS.** `intel-setup.md` step 8c creates `coverage.json`, `drivers.json`, `signposts.json`, `threads.json`, `runs.json`, `feedback.json` (plus the month shard and `ledger.json`), every one via `Write`; the command's guardrails prohibit shell for all file ops. (Interpretation of "empty forms" for the two setup-seeded files: judgment call 7.)

**8. Three skills with valid frontmatter and third-person descriptions that would trigger — PASS.** All three SKILL.md files carry `name` (matching their directory), a `description` beginning "This skill should be used when…" with concrete trigger phrasing, and `allowed-tools`, all verbatim from the spec. `claude plugin validate` passed with no warnings.

**9. Collection-health line renders on every brief path, including the quiet one — PASS.** The briefing skill's COLLECTION HEALTH section: "no exception and no configuration that turns it off… There is no code path that omits it," with required renderings for rich, quiet, degraded, and no-scan, and a refusal (no brief at all) for a `failed` run. The OUTPUT CONTRACT places it directly under the title on every brief; `html-brief.md` marks the block mandatory with "no fourth state and no way to omit it" and repeats the rule in its Rules list.

**10. README no longer claims within-run breadth — PASS.** The only breadth language is "reads broadly over its rotation and reports narrowly every day: every brief tells you exactly what it covered and what it did not," plus "Coverage is earned across the week, cell by cell, not claimed in a morning." "Scan the world broadly" and unqualified "reads broadly" are gone.

---

## 6. For the next session (STOP B)

- Verify against this checklist, then **push** branch and tag if satisfied (the one release-loop step not performed).
- The pass-2 re-attack packet should be re-rsynced from the rebuilt plugin per `dev/STATE.md`.
- An eval pack for intelligence-briefing is a known follow-up (STATE.md); the spec did not include it in this build and none was built.
- Watch-list items from the judgment calls, if any prove wrong in use: proposals living in `drivers.json` (1), export-time-only STEEP with null stored fields (2), the run-record `reckoning` flag (3), active-only export (10).
