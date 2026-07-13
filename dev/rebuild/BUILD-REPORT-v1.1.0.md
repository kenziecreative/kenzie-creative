# intelligence-briefing v1.1.0 — Build Report ("durable collection")

The pass-2 repair release. Read `BUILD-REPORT.md` first for the v1.0.0 build; this one assumes it.

**Input:** Codex pass-2 verdict (disclosed re-attack on v1.0.0) — 1 CLOSED, 7 PARTIAL, 1 disclosed-open-and-worsened.
**Triage:** `core-kenzie-marketplace/dev/blind-reviews/intelligence-briefing-pass2-2026-07.md` (ONE INBOX). 9/9 citations verified, 0 refuted, 1 narrowed, **zero lock collisions**.
**Output:** v1.1.0, commit `2ac3f4e` + the verification fixes below, tag `intelligence-briefing-v1.1.0`, branch `review/intelligence-briefing`.
**Caveat of record, stated up front:** this release was built and self-verified in one session. That is the same caveat v1.0.0 carried into pass 2 — **and pass 2 found eight things.** The verification below is real and it caught real defects, but it is not an independent check. See §6.

---

## 1. What was built, file by file

| File | Change |
|---|---|
| `skills/environmental-scan/SKILL.md` | The bulk of the release. Coverage schema (`last_successful_scan`, `last_attempted`, `consecutive_failures`); run schema (`idle` status, `signposts` + `falsifiers` outcome arrays, `run_window_*` renamed); observation schema (`captured_evidence` becomes an object with `claim`/`details`/`locator`/`retrieved`/`source_opened`; new `contribution`). Steps 1, 3, 4, 6, 7, 8, 9, 11 all rewritten. |
| `skills/environmental-briefing/SKILL.md` | COLLECTION HEALTH (5 renderings, mandatory obligations = 3 classes, rotation reads `last_successful_scan`); step 8 disconfirming gated on falsifier outcomes; THE OVERFLOW LINE (new subsection); VERIFICATION (predicate check first, evidence-boundary check, derivative check; renumbered to 10 steps). |
| `skills/environmental-briefing/references/html-brief.md` | Collection-health markup (5 variants incl. `idle` and zero-cells-due); overflow markup carrying qualifiers + source marks + uncertainty clause; disconfirming markup for a failed falsifier. |
| `skills/intelligence-review/SKILL.md` | Schema summary realigned; matrix reconciliation on relevance correction (F8); coverage + driver answers now read the new fields (`last_successful_scan` vs `last_attempted` divergence, `counter_hypothesis`, run windows). |
| `commands/intel-setup.md` | Stagger the matrix at creation (step 6); coverage init fields (step 8c); first-run expectation-setting (step 10). |
| `commands/intel-export.md` | `supporting_hits` carries only `material_advance` observations, so it agrees with `hit_count`. |
| `commands/brief.md` | Only `failed` stops the brief; `idle` and `degraded` both brief. |
| `templates/CLAUDE.md` | The "adjust anything" over-promise corrected (config ≠ territory); grace-window comment realigned to per-cell windows. |
| `assets/brief.css` | `.mark` (source marks in overflow), `.disconf.is-degraded`, `.also em`. Flat, no shadows, no edge bars. |
| `AGENTS.md` (plugin) | New locks: durable-collection's three rules; four run statuses; the stagger; three windows; derivative ≠ evidence; **every field needs a reader**. |
| `CHANGELOG.md`, `plugin.json`, `marketplace.json`, `README.md`, root `AGENTS.md` | 1.1.0 entry + version prefixes across all four surfaces. |

---

## 2. Judgment calls (where the verdict left room)

1. **Finding 5 narrowed, and the remedy re-priced.** Codex's diagnosis was epistemological (evidence produced by the reading pass cannot audit the reading pass) and its prescription was heavy: re-open every emitted claim, store locators and retrieval timestamps, re-extract high-impact claims at verification. **I took the diagnosis and rejected half the remedy.** The demonstrable defect is narrower: `captured_evidence` was scoped to *figures, ranges, dates, qualifiers* and verification checked exactly those, so **the claim's main predicate was outside the scope of both.** That is why "proposed → imposed" survived — not because self-audit is impossible, but because no rule looked at the verb. Fix: capture the source's own claim *with its own verb*, check the predicate first. Kept the locator (cheap, genuinely missing). **Dropped the mandatory double-fetch** — it doubles collection cost on a product that was already facing a 100+ search first run (Finding 4). Instead, `source_opened: true` is required only for observations that reach `act` or move a driver. *Risk if wrong: a misread verb on a `note`-disposition item captured from a snippet still survives. Accepted — that item cannot drive a decision or move a driver.*
2. **The stagger formula is naive.** `today + (i mod required_frequency_days)`. It is one line, it works, and it can bunch cells unevenly on a small matrix (a 3-cell weekly matrix puts all 3 on different days but leaves 4 days empty). A proper round-robin by frequency class would be better. **Chose the simple version deliberately** — this is prose instructing a model, not code, and a formula a model can execute reliably beats one it will approximate. *Watch item.*
3. **`idle` is nearly unreachable, and I kept it anyway.** An active driver always owes a falsifier search, so a deployment with drivers essentially never idles. `idle` therefore fires only on a genuine zero-obligation morning (every driver retired). **Kept it because the alternative is the bug**: without a name for zero-due, the same morning is vacuously both `complete` and `failed`, and a weaker runtime picks either. The state is rare; the *contradiction* it resolves was not. Documented as rare in the skill so nobody "simplifies" it away.
4. **Standing gate treats a not-yet-due unscanned cell as fine.** In week one, most cells have never been scanned but their staggered turn hasn't come. The standing gate (`no applicable cell with next_due <= today still outstanding`) lets drivers move anyway. **This is correct and it is the only workable reading** — the alternative is that no driver can move for the first full cycle. The rotation percentage discloses the true sweep depth (20% on day one, climbing to 100% by the end of the first cycle), so the brief is honest about it. *This is the one place where "collection is current" and "the matrix is mostly unswept" are both true at once, and I chose to let the rotation line carry that.*
5. **Dedup on `source.url`, with thread-match as backstop.** Same event under a different URL (syndication) is not a duplicate — it is a `derivative` observation, captured once. Chose this over event-normalization (which Codex suggested) because event identity is a judgment and URL identity is not, and the derivative mechanism already absorbs the syndication case correctly.
6. **`retrieved` and `last_attempted` have thin readers** (the review conversation only). They passed the field-consumer rule, but barely. Kept because both are provenance a user can ask for and neither gates anything — but flagged here rather than quietly.

---

## 3. Where the verdict was ambiguous, wrong, or silent

- **Codex missed three things, all found by grep** (full detail in the triage note): `last_status` was read by nobody; `window_start`/`window_end` were read by nobody, meaning there was effectively **no collection window at all** (not merely a *wrong* one); and **zero-due was the default state, not a corner case** — it found the no-stagger defect and the zero-due contradiction as separate findings and never multiplied them. Unstaggered weekly cells on a daily cadence = zero cells due six mornings in seven, which under the `failed` reading meant **no brief at all six days a week.** That was the most dangerous item in the review and it was nobody's finding.
- **Finding 8 is two different defects sharing a number.** Pass-1's Finding 8 was the *staleness cadence* (nothing ever asks whether the mandate still holds) and remains **deliberately unbuilt**. Pass-2's Finding 8 is a *new* defect the rebuild introduced — a correction the user *does* make never reaches the coverage matrix — and **that one is fixed.** Anyone reading "Finding 8" in either note must check which is meant.
- **Codex was silent on** the zone taxonomy, the classification axes, the two-gate bar, the driver/thread distinction, the confidence log, the reckoning, the never-prune rule, the HTML rendering, and the entire editorial layer. Under the protocol, silence after a hostile second read is evidence those surfaces hold.

---

## 4. Deviations

- **None from §2 or §11.** No do-not-touch item changed; no do-not-build item was built (checklist points 4 and 5 below).
- **One schema field renamed rather than added:** `last_scanned` → `last_successful_scan` + `last_attempted`. A rename in a shipped schema is normally a deviation worth flagging, but the plugin is not deployed anywhere, so there is no migration surface. All four consuming surfaces updated; grep confirms zero stale references.
- **`signposts_checked` (a list of ids) → `signposts` (a list of outcomes).** Same reasoning.

---

## 5. Review-standard checklist (build spec §"Review standard")

**1. `claude plugin validate ./intelligence-briefing` — PASS**
```
✔ Validation passed
```

**2. `claude plugin validate .` — PASS**
```
✔ Validation passed
```

**3. `node dev/scripts/check-version-prefix.mjs` — PASS**
```
OK    intelligence-briefing  v1.1.0
OK    catalog:intelligence-briefing  v1.1.0
OK    readme:intelligence-briefing  v1.1.0
OK    agents:intelligence-briefing  v1.1.0
All 7 plugin(s) agree across plugin.json, the catalog, the README table, and the AGENTS list.
```

**4. Every §2 item present and substantively unchanged — PASS.** Grep-verified: five zones (8 hits, definitions intact); tier/corroboration independence with the "primary *and* single" sentence (both skills); Note/Track/Act/Dig (both skills); all four named bars (10 hits); qualifier/range preservation with "1–3x" (5 hits) and "among surveyed firms" (4 hits) intact; Signal uncertainty note (3 hits); HTML hard rules verbatim (no JS, no content-hiding animations, flat, no colored edge bars, no drop shadows, one file); tooling discipline stated in scan, briefing, review, and setup. **CSS check:** the `box-shadow` and `transition` hits in `brief.css` are `inset 0 0 0 1px` (a border technique, not a drop shadow) and `transition:border-color` (a hover, not a content-hiding entrance animation) — `git diff v1.0.0..HEAD` confirms **both predate this release**; my three additions carry no shadow, edge bar, animation, or JS.

**5. Every §11 item absent — PASS.** Grep sweep for probabilities/estimates, numeric or composite driver scores, velocity, a driver status board, a verifier subagent, calibration math and hit/miss rates, a weekly product, an intake wizard: **every hit is a negation or the AGENTS.md do-not-build list itself.** Nothing in §11 was built. (Specifically checked because this release adds counters — `consecutive_failures` and `observation_count` are cell/driver *health* counts, not scores, and nothing computes a rate from them; the review skill's "no statistics" rule is intact.)

**6. §9.5 action-gate rule identical in three places — PASS.** Normalized grep returns **exactly one unique string** across `skills/environmental-briefing/SKILL.md` ×2 (EVIDENCE BAR, VERIFICATION step 8) and `templates/CLAUDE.md` ×1. Byte-identical. (This was the one repair pass 2 marked CLOSED; the verification renumbering touched the step number and not one word of the rule.)

**7. Six state files created in empty forms by `/intel-setup`, Write only — PASS.** All six present in step 8c; shell prohibited by the command's guardrails. Coverage rows now initialize with `next_due` as a **real staggered date** rather than null — a deliberate change (judgment call 2), and the scan's due test was changed in the same commit to honor it (see §6, defect 0).

**8. Three skills, valid frontmatter, triggering descriptions — PASS.** Frontmatter untouched; `claude plugin validate` clean. The briefing skill's `allowed-tools` already included `WebFetch`, which the new evidence-boundary check (VERIFICATION step 6) requires — no permission surface was widened.

**9. Collection-health line on every brief path — PASS.** Four run statuses (`complete` / `degraded` / `idle` / `failed`), five renderings (the four, plus no-scan), matching 1:1 across `SKILL.md` and `html-brief.md`. Both files still carry the "no exception and no configuration that turns it off" / "no way to omit it" language. **Zero-cells-due variants added for `complete`, `quiet`, and `degraded`** after the trace found the bug in §6.

**10. README claims no within-run breadth — PASS.** Unchanged from v1.0.0 and now *more* earned: "reads broadly over its rotation," "Coverage is earned across the week, cell by cell, not claimed in a morning." The stagger is what finally makes the rotation deliver that.

---

## 6. What the checklist does not test — the state-machine trace

**The 10-point checklist cannot catch a repair that introduces its own defect.** (Brand Compass's pass-2 caught exactly that.) So I traced a synthetic deployment day by day: 15 applicable cells, all weekly, 4 seeded drivers, daily cadence — setup, day 1, days 2–7, a cell failure, the recovery, the second cycle. **It found two defects I had introduced, both now fixed.**

**Defect 0 — the stagger vs. the due test (caught mid-build).** The scan's due rule was `next_due <= today OR never scanned`. Staggering sets future `next_due` dates on never-scanned cells — so the "never scanned" clause would have made **every cell due on day one anyway**, collapsing the stagger completely and re-creating the 100+ search first run the stagger exists to prevent. The fix (due = `next_due <= today`, null-only fallback) is in the shipped commit, and the reasoning is now written into the skill so nobody "restores" the old clause.

**Defect 1 — "0 of 0" reintroduced through the door I didn't lock.** I banned `idle` from rendering *"0 of 0 cells due today completed."* But `idle` only fires when **nothing at all** is due — and an active driver always owes a falsifier search. So on a staggered morning where no cell falls due but four drivers get tested, the run is `complete`, and the `complete` rendering emits **the exact banned string.** I had locked the state and left the sentence reachable from a different state. Fixed: the health line now counts only the classes that actually had something due, in both renderers, with explicit zero-cells-due variants and the prohibition restated as a rule about *any* variant rather than about `idle`.

**Defect 2 — `run_window_start` was written by a step and read by no step.** My own field. My own rule. The run windows lost their last consumer the moment collection moved to per-cell windows, and I kept them anyway "for legibility" — which is the precise self-justification the read-by-nobody family runs on. Fixed by giving it a real consumer: the review conversation now answers *"what did you actually cover that week, and how well?"* out of `runs.json`, which is the question a user asks the instant they find a miss.

**Field-consumer sweep, re-run after the fixes: all 11 new/changed fields have a reader outside their writer.** Two (`retrieved`, `last_attempted`) have thin ones and are flagged in §2.6 rather than quietly passed.

---

## 7. What I would still not call verified

Honest scope of the above:

- **This is self-verification.** The builder checked its own work, against a checklist the builder also interpreted. It caught three real defects, which is evidence the process has teeth — and pass 2 caught eight things that v1.0.0's identical self-check missed, which is evidence it is not sufficient.
- **No live run has ever executed.** Every check is static: greps, reads, validation, and a hand-traced state machine. **No deployment has been set up, no scan has collected, no brief has rendered.** The stagger formula, the per-cell windows, and the falsifier records have never touched a real `WebSearch`.
- **No eval pack exists.** The behaviors this release adds are exactly the ones a golden set should pin: the health line always present; `degraded` ≠ `quiet` ≠ `idle`; a failed falsifier never rendering as "nothing surfaced"; a failed cell still due next run; overflow keeping its source marks. That pack is the single highest-value follow-up and it is still unbuilt.

**The next real check is a pass-3 re-attack** (or a first live deployment). v1.1.0 is a large state-machine change made in one session, and its predecessor — held to this same standard, and passing it — still had eight open findings when someone independent looked.
