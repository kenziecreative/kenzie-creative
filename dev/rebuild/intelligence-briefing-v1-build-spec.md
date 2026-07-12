# intelligence-briefing v1.0.0 — Build Spec

**Status:** complete and self-contained. Nothing in this document is open. Build from it alone.

---

## THE HANDOFF — read this first

### Outcome

**A validated, releasable `intelligence-briefing` v1.0.0, committed and tagged.** Not a draft, not a set of skill files: a plugin that passes `claude plugin validate` at both scopes, whose promises match its mechanics, and whose CHANGELOG tells the truth about what changed.

### Source pack — read all of it before writing anything

**The plugin as it stands (v0.3.0).** Everything §2 preserves lives here, and §2 is the largest single constraint in this build.
- `intelligence-briefing/skills/environmental-briefing/SKILL.md`
- `intelligence-briefing/skills/environmental-briefing/references/html-brief.md`
- `intelligence-briefing/commands/intel-setup.md`, `commands/brief.md`
- `intelligence-briefing/templates/CLAUDE.md`
- `intelligence-briefing/assets/brief.css`
- `intelligence-briefing/README.md`, `plugin.json`, `CHANGELOG.md`, `AGENTS.md`

**The one real brief this product ever produced.** Read it. It is the proof that the editorial layer works and the reason §2 exists.
- `~/Projects/_shared/Core Intelligence/briefs/2026-06-07.html`
- `~/Projects/_shared/Core Intelligence/CLAUDE.md` and `ledger.json`

**The review that produced this rebuild**, with nine design decisions of record.
- `dev/blind-reviews/intelligence-briefing-pass1-2026-07.md`

**The Strategic Foresight framework**, which §10 exports into. Read the driver schema before building the export.
- `~/Projects/a-emporium-working/template-strategic-foresight/.claude/commands/scanning-drivers.md`

**Marketplace conventions.**
- Root `AGENTS.md` (release process, Cowork-safe rendering, the `/contract` convention).

### Tool access

**You may use `Bash`.** You need it: `claude plugin validate ./intelligence-briefing`, `claude plugin validate .`, `node dev/scripts/check-version-prefix.mjs`, and the git commit and tag.

> **Do not confuse the two shell rules.** §2.9 forbids shell **inside the skills you are writing** — that is a runtime rule for the plugin, and it is load-bearing (a shell call triggers a permission gate the brief has no reason to incur). It says nothing about you. **The builder may shell; the built thing may not.**

Everything else is `Read` / `Write` / `Edit` / `Grep` / `Glob`.

### Boundaries

**§2 is a do-not-touch list. §11 is a do-not-build list.** Both are the largest constraints in this spec and both will feel wrong to a capable model.

They are **product decisions, not scaffolding, and not a lack of trust in your judgment.** They exist because the failure mode of a strong one-shot build is helpfulness: adding the driver dashboard, the weekly product, the estimates, the composite score, the verifier subagent. Every one of those was considered and rejected on the merits, with the reasoning written down. **If you find yourself about to improve past §2 or §11, stop and write it in the build report instead.**

### Review standard — what "done" means

Check every one of these before you tag:

1. `claude plugin validate ./intelligence-briefing` passes.
2. `claude plugin validate .` passes.
3. `node dev/scripts/check-version-prefix.mjs` passes.
4. Every item in **§2** is present and substantively unchanged.
5. Every item in **§11** is **absent**.
6. The **§9.5 action-gate rule** is worded **identically** in all three places (the skill's evidence bar, the skill's verification gate, `templates/CLAUDE.md`). This was the only architecture-independent bug in the review; a build that leaves it inconsistent has failed.
7. All six state files (§3.4) are created in their empty forms by `/intel-setup`, using `Write` and never shell.
8. All three skills exist with valid frontmatter and third-person `description` fields that would actually trigger.
9. The collection-health line (§6.3) renders on **every** brief path, including the quiet one. There is no code path that omits it.
10. `README.md` no longer claims within-run breadth (§9.2).

### Proof trail — required

Write **`dev/rebuild/BUILD-REPORT.md`** as you go. It is read by the next session, on a different model, which did not watch you work. It must contain:

- **What you built**, file by file.
- **Every judgment call you made** where the spec left room, and what you chose.
- **Every place the spec was ambiguous, wrong, or silent.** Say so plainly. This document has not been built from before; assume it has defects.
- **Every deviation from the spec, and why.**
- **The review-standard checklist above, with each line marked pass or fail** and the actual command output for 1–3.

A build with no report has not finished, even if the code is right.

### Human gate

You are running unattended. **You cannot ask a question, so do not silently answer one.**

When you hit something this spec does not settle:

1. **Choose the most conservative option** — the one that adds the least, claims the least, and is easiest to reverse.
2. **Record it in the build report** under judgment calls, with the alternatives you considered.
3. **Never resolve an ambiguity by adding a feature**, and never by adding anything from §11.

If something in this spec is internally contradictory, **build neither branch**. Leave the surface unimplemented, note it in the report, and let the next session rule on it. A missing piece is recoverable. A wrong piece built confidently is what this entire rebuild exists to prevent.

---

## Model notes

**The build:** Fable 5, one turn, `effort: high`/`xhigh`. Expect minutes-long turns; that is normal.

**The runtime:** Opus 4.8-class, with realistic variance **downward** (a user on Sonnet; a scheduled Cowork run), never upward. **This is why the skills you write are prescriptive by design** — hard gates, numbered steps, explicit rules are what stop a weaker model from quietly skipping the coverage check or padding a thin day. Rules stay hard everywhere correctness depends on them; judgment stays loose only where a weaker model failing gracefully is acceptable.

**Do not de-prescribe the skills.** A documented aversion to over-prescriptive prompts is a *ceiling* problem, and the ceiling is not where this product runs.

---

## 0. What this rebuild is

The product already produces intelligence and throws it away every morning.

This is not a figure of speech. On 2026-06-07 the deployment at `~/Projects/_shared/Core Intelligence/` produced one real brief. It contains a synthesis paragraph that names a force, gives it a direction, and draws out an implication for what the reader should build. It contains a "Watch for" line with a due date on it. It contains a relevance judgment for every item. **All three were written into an HTML file for a human and none of them were kept by the machine.** The ledger retained titles, zones, dates, and dispositions — a shopping list.

The valuable output went to the reader and evaporated. The machine kept the least valuable part.

That is the root defect. Every one of the nine review findings is that defect showing at a different seam. The single sentence version: **the run is the system.** Collection, memory, analysis, verification, and publication all collapse into one morning.

**So the rebuild is not "add an intelligence layer to a scanner." The rebuild is: stop discarding the intelligence you already produce.**

- The synthesis stops being a paragraph and becomes a **driver** that persists and gets re-decided.
- The "Watch for" stops being decoration and becomes a **signpost** the system comes back and checks.
- The relevance judgment and the verbatim figures go into the **observation**, so verification can re-derive claims from evidence instead of re-reading its own draft.
- Coverage stops being asserted in a morning and becomes **earned across a rotation**, disclosed on every brief.

---

## 1. How it works, from the user's side

*This section is the narrative. Read it before any schema. It is written against the real deployment at `~/Projects/_shared/Core Intelligence/` — a Chief Product & Technology Officer at a company whose products are services delivered to small businesses (accelerators, events, grant programs) supported by a platform offering an AI-powered advisory board.*

### Setup — one conversation, no form

The user answers the same three open questions the product asks today. Nothing gets heavier.

Then the system plays back what it heard, as **forces to watch**:

> From what you told me, I think these are the forces:
> 1. AI advisory capability is commoditizing at the SMB front door.
> 2. Small businesses are shifting which decisions they'll trust an AI to make.
> 3. Regulatory obligations on AI-generated advice are hardening, with the EU ahead of the US.
> 4. The unit economics of running an advisory product are changing.
>
> Do these look right? What's missing, and what's too broad?

The user kills one, sharpens two, adds one. **That is the whole intake.** It is a conversation about their world, not a template with slots.

> **Design note.** The setup input is a *standing mandate*, not a decision. Real user phrasing: *"I am tracking what is impacting compliance for our market and clients in our space and how that might drive implementation approaches."* There are no options and no closing date. Do NOT derive decision questions, options, or Priority Intelligence Requirements. **Derive forces.** A driver is a force, not an outcome: "Automation Pressure" is a driver; "Jobs Disappear" is an outcome.

### Day 1

The brief runs and looks almost exactly like the 2026-06-07 brief on disk. Same lead, same items, same synthesis, same editorial voice. **The reader-facing product barely changes on day one, and that is the point.**

What changes is underneath. The six items become **observations**, each carrying its source URL, the verbatim figures and qualifiers as they were seen, and the reason the item landed. The synthesis becomes the first movement on a **driver**. The line *"Watch for: publication of the finalized EU Code of Practice, expected end of June"* becomes a **signpost with a due date**, attached to the regulatory driver.

### Day 2 — nothing happened

Today the brief says "Quiet day," and the reader cannot tell whether the world was quiet or the scan was blind.

Now it says:

> **Quiet day.** All cells due today were scanned; none are overdue. Nothing moved.

One line. That is the entire difference between silence and blindness.

### Day 5 — the search fails

Policy and SciTech rate-limit. Today, the brief publishes a plausible page and never mentions it.

Now:

> **Assessment degraded.** Policy Levers × AI-advisory regulation and SciTech Frontier × agentic patterns did not complete. This brief covers three of five zones. **No driver moved today, because collection is incomplete.**

Confidence cannot move on a partial look. Same rule as the quiet day, one level up.

### June 30 — the signpost fires

The system wrote a tripwire on June 7 and it owns it. It goes and checks.

> **Signpost fired.** On June 7 you were told to watch for the finalized EU Code of Practice on AI content labeling. **It published June 26.** Labeling obligations attach to AI-generated advisory output.
>
> This moves *"Regulatory obligations on AI advice are hardening"* from Medium to **High**.

The reader gets this **even if they read no brief in between.** Nothing in the current product does this.

### Mid-July — the same item, situated

Google ships an advisory agent in Workspace for small business. Today that arrives as one more item on one more morning.

Now:

> **Google adds an advisory agent to Workspace for small business.** · Fact · Track
>
> **The fourth move in six weeks on this force.** Commoditization at the SMB front door goes Medium → **High**.
>
> Your June 7 read was that the defensible edge sits in proprietary data and program integration. **Nothing since has cut against that.**

Same item. Same length. Vastly more use. **What compounds is context per item, not brevity.**

### Whenever — the user talks to it

> **User:** You missed the Intuit thing last week.
>
> **System:** You're right. That's Field Movements × SMB fintech. I scanned that cell on July 8 and came back empty, so I'm marking its sources suspect. Adding it as an observation against Commoditization — that makes five moves, not four.

Or:

> **User:** What do we actually know about the regulatory force?
>
> **System:** Hardening, High confidence, moved twice. Nine observations behind it. Here is what would tell us I'm wrong.

**This is the only place the user writes to the system after setup**, and it is why they can trust a quiet day.

### Monthly — the reckoning

> Two months ago you were Uncertain about commoditization at the front door. It is now **High**. It moved on June 7 (Meta), June 19 (pricing), and July 14 (Google).
>
> Your June 7 read — that the edge migrates to proprietary data and program integration — **still holds, and it is now the load-bearing assumption in your product strategy.**
>
> One thing you were wrong about: on June 7 you treated the US light-touch executive order as lowering compliance drag. Three observations since suggest state-level action is filling the federal gap. That force is stronger than you logged it.

Every other output tells the reader what to think about. **The reckoning tells them how their own picture has moved and where it was wrong.** It is the only output that makes the reader sharper rather than more dependent.

### Eventually — the foresight handoff

The user starts a Strategic Foresight cycle and exports.

They arrive with warm drivers, months of dated observations, and a confidence history. Foresight's `/scanning-drivers` normally refuses to cluster until thirty quality hits are collected. **They walk in with the drivers already made.**

---

## 2. What survives untouched — DO NOT REBUILD THIS

The reviewer attacked the v0.3.0 corpus for a full hostile pass and went **completely silent** on the following. Under the review protocol, silence after a hostile read is evidence the surface holds. The diagnosis of the product was *"a first-rate editor sitting on top of a newsroom that doesn't exist."* **The editor is the good part. Preserve it exactly.**

Carry these forward from v0.3.0 **verbatim in substance**. You may relocate them between files; you may not redesign them.

1. **The five zones.** Emerging Impact, Currents, SciTech Frontier, Policy Levers, Field Movements. The set is fixed and not user-editable. The relevance context refracts them; it does not replace them. Zones are a *collection* lens set, not a presentation taxonomy — their fixedness is what stops the scan drifting toward whatever the operator already finds interesting. (This mirrors STEEP in the foresight framework, which is tracked as a collection column, not a reporting one.)

2. **The classification axes.** Epistemic type (Fact / Signal / Frame / Pattern). Source tier (Primary / Secondary / Tertiary). Corroboration (Single / Corroborated). **Tier and corroboration are independent axes** — an original filing seen in one place is primary *and* single. Mark both.

3. **The disposition vocabulary.** Note / Track / Act / Dig. One change: see §9.6.

4. **The two-gate evidence bar.** Action gate and sharing gate as separable rules, because an under-supported item does damage in exactly two different places — when it drives a decision, and when it propagates to readers who cannot see its sourcing. The four named bars (`situational`, `decision`, `shareable`, `strict`) are combinations of the two gates. Default `decision`. One change: see §9.5.

5. **Qualifier and range preservation.** "Preliminary," "in one region," "1–3x," "among surveyed firms" are part of the claim, not trimmable filler. A written figure must not narrow a source's range.

6. **The uncertainty note on Signals.** Every Signal states what would confirm or falsify it. This is already the falsifier concept, at the item level. v1 promotes it to the driver level (§4.3) — it does not replace it.

7. **The HTML rendering.** Self-contained single file, `assets/brief.css` inlined verbatim, system fonts only, no JavaScript, no content-hiding entrance animations, flat design. Cowork-safe rendering is a hard rule, not an aesthetic preference. The theme-override mechanism (a deployment CSS file inlined after the default so its `:root` wins) is unchanged. All content blocks in `references/html-brief.md` are unchanged except the additions in §6.

8. **The editorial voice.** The headline-and-standfirst page head. Writing in your own words, no copied headlines or block quotes in the emitted brief. Varied language, no template-filler repetition. Empty slots stay empty; a manufactured section is a failure. **Do not pad a thin day.**

9. **Tooling discipline.** Built-in `WebSearch` / `WebFetch` only — never a required MCP or CLI. **Collection runs inline; never delegate scanning to a subagent** (subagents start from a stripped permission set and cannot reach the web). All file operations via `Read` / `Write` / `Edit` — **never shell**. To check whether a file exists, `Read` it and handle the missing-file result. To create a directory, write a file into its path.

> **On the no-subagent lock.** It binds *collection*, and its stated rationale is web access. It says nothing about *analysis*. Driver reassessment, signpost checking, the reckoning, and verification are all analysis over JSON already on disk and need `Read`, not the web. **This spec still does not use subagents anywhere** — the re-derivation design in §9.3 makes an independent verifier unnecessary. Recorded so a future maintainer knows the lock's scope is narrower than it reads.

10. **The setup guardrails.** Ask the three open questions in the user's own words. **Never** offer a menu of role personas or job titles. **Never** infer the user's role, employer, clients, or industry from other projects, open files, memory, or anything else in the environment — ask, never guess. **Never** put real company or product names into questions, options, or the drafted config.

---

## 3. Architecture

### 3.1 Three skills, split by who owns the cadence

| Skill | Cadence owner | Reads | Writes | Has a reader? |
|---|---|---|---|---|
| **`environmental-scan`** | The world, and a coverage obligation | config, all state | observations, threads, drivers, signposts, coverage, runs | **No.** Output is state. |
| **`environmental-briefing`** | The reader's attention | config, all state | the brief document; the shared ledger | Yes. Output is a document. |
| **`intelligence-review`** | The reader, ad hoc | config, all state | feedback, drivers, threads, coverage | Yes. Output is a conversation. |

The weld between the first two is the root defect in v0.3.0. **Splitting them is the rebuild.**

### 3.2 This is one product, not two

The user does not invoke two things every morning. `/brief` runs the scan and then the brief, in one command. The skills are separate because their *cadences* and *concerns* are separate, not because the user should have to think about both.

The scan can also run alone (on a rotation, unattended, producing no document). The brief can run alone (reporting on state already collected). Chaining them is the default.

### 3.3 Coverage is earned across the rotation, not claimed in a morning

**This is the answer to "reads broadly."** No amount of prompting turns a handful of morning searches into defensible breadth. Coverage cannot be established inside one run; it can only be guaranteed over an interval.

The coverage matrix is **zones × domain cells**. Each cell has a required frequency. Each run scans the cells that are *due*. Most cells are weekly; high-velocity cells are daily. So a daily brief performs a *partial* sweep every morning, and the full matrix completes over the week.

The brief discloses where in the rotation it is. **"Reads broadly over the week; reports narrowly every day"** is a claim the mechanics now earn.

### 3.4 State layout

All state lives in the **deployment directory**, not the plugin.

```
<deployment>/
  CLAUDE.md                       config
  briefs/
    YYYY-MM-DD.html               the brief (or .md)
    YYYY-MM-DD-02.html            a second run on the same date NEVER overwrites the first
  intel/
    coverage.json                 the matrix: zones × domain cells
    drivers.json                  the forces, with confidence history
    signposts.json                tripwires with due dates
    threads.json                  story-level identity, for novelty suppression
    runs.json                     run records (append-only)
    feedback.json                 misses, noise, corrections (append-only)
    observations/
      YYYY-MM.json                observations, sharded by month
  ledger.json                     shared /contract queue — see §3.5
```

**Observations are sharded by month.** They never prune. They are the archive, and they are the whole reason month six is richer than month one. Sharding keeps `Read` cheap: a run reads the current month plus whatever specific shards a driver's `supporting_observations` point into.

### 3.5 The ledger's role shrinks

In v0.3.0 the ledger was the brief's memory. **It is not any more — the observation store is.**

The ledger survives for exactly one purpose: it is shared `/contract` state that other plugins in the deployment directory may read. The brief writes its `act` / `track` / lead items there with `source: "environmental"`, and reads only its own rows. The 30-day prune stays **on the ledger only**. It never touches observations, threads, or drivers.

---

## 4. Data model

All files are JSON. Create any missing file with `Write`, containing its empty form. Never shell out to check for or create anything.

### 4.1 `intel/observations/YYYY-MM.json`

The accumulating record of what was seen. **This is the memory.**

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

**`captured_evidence` is the load-bearing field.** It holds the verbatim figures, ranges, and qualifiers **exactly as seen at gather time** — before any compression. It is what makes verification independent (§9.3).

> **Doctrine seam, resolve it explicitly in the skill text.** Rule 10 forbids block quotes **in the emitted brief**. `captured_evidence` is an internal working artifact that is **never emitted**. State this in `SKILL.md` in as many words, or the field will read as a contradiction of the plugin's own doctrine.

`material: false` marks an observation that was captured but did not clear the bar for the brief. Capture is cheap; the store is not the brief.

### 4.2 `intel/drivers.json`

The forces. **This is what the synthesis becomes.**

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
      "steep_primary": "T",
      "steep_secondary": ["E"],
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
  ]
}
```

**Vocabulary is deliberately borrowed from the Strategic Foresight framework so the export in §10 is lossless.**

- `direction`: `Increasing` | `Decreasing` | `Uncertain` | `Cyclical`
- `certainty`: `High` | `Medium` | `Low`
- `time_horizon`: `Near-term (1-3 years)` | `Mid-term (3-7 years)` | `Long-term (7+ years)`
- `steep_primary` / `steep_secondary`: `S` | `T` | `E` | `En` | `P`

Two fields foresight does not have, which are the whole point:

- **`confidence_log`** — append-only. Every movement, dated, with its reason and the observations that caused it. **Never rewrite history.** A driver's value is this log.
- **`implication`** — the "so what for what I'd build" clause. This is the second half of a standing mandate (*"...and how that might drive implementation approaches"*). It is what the reader actually consumes.

`origin`: `derived` (setup inferred it from the relevance context) | `user_asserted` (the user stated it; this is what "held beliefs" becomes) | `emergent` (the system proposed it from a thread and the user confirmed).

`status`: `active` | `retired`. **Retired drivers are never deleted.** They and their confidence logs are what the reckoning reads.

### 4.3 `intel/signposts.json`

Tripwires. **This is what "Watch for" becomes.**

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
- `due` may be null for an open-ended watch. A null-due signpost is checked weekly rather than on a date.

**A signpost does two jobs with one field, and this is deliberate.** For the reader it is *"here is what to watch for,"* which is the most direct expression of a targeting system for attention — if you know the two things that would change your position, everything else can go unread with a clear conscience. For the scanner it is a **directed collection query** (§5, step 3). Same statement, both jobs.

### 4.4 `intel/coverage.json`

The matrix. **This is what makes "reads broadly" earnable.**

```json
{
  "domain_cells": [
    { "cell_id": "ai-advisory-tools", "label": "AI advisory and decision-support tools for SMBs" },
    { "cell_id": "smb-platforms",     "label": "Platforms SMBs run their business on" },
    { "cell_id": "accelerators-grants","label": "Accelerator, boot-camp, and grant programs" },
    { "cell_id": "smb-operations",    "label": "How small businesses fund, price, and run themselves" },
    { "cell_id": "model-capability",  "label": "Model capability, cost, and agentic patterns" },
    { "cell_id": "ai-advice-regulation","label": "Regulation of AI-generated advice and SMB data" }
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
- `source_health`: `ok` | `suspect`. Set to `suspect` by a miss record (§7). A suspect cell tells the scanner to widen its channels for that cell rather than repeating the search that already failed to find something.
- `applicable: false` cells are set at setup with a stated reason and are excluded from the rotation. **Without this the rotation pads itself with nonsense crossings.**

**The matrix is a genuine cross-product of zones × cells, not each zone scanning its own pre-written examples.** That is the forcing function. It is what makes the system search "accelerators-grants × SciTech Frontier," which no operator would think to look for. If each zone only ever revisits the examples the user already wrote, the fixed lens set does no work.

### 4.5 `intel/runs.json`

Run records, append-only. **This is what Finding 2 needs.**

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
- **`last_successful_run` is derived from this file**, not stored separately. The catch-up window is `last completed-or-degraded run's window_end` → now. A quiet run still writes a run record, so a quiet day never causes the next day to think it is a first run.
- **A second run on the same date writes `YYYY-MM-DD-02.html`. It never overwrites the first.** Silent data loss was one of the confirmed defects.

### 4.6 `intel/threads.json`

Story-level identity, for novelty suppression.

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

- `status`: `live` | `dormant` | `closed`. **Threads are never deleted.** They go dormant. A story returning after 31 days is *the same story advancing*, not a new one — that was a confirmed defect and it is fixed by not pruning.
- **A thread is a story. A driver is a force. Many threads roll up to one driver.** They are different objects; do not merge them.

**Identity.** In v0.3.0 the item id was an agent-generated "normalized slug of the core subject," re-derived from fuzzy text every run — which is why identity was not actually stable. In v1 the `thread_id` is **assigned once, at thread creation, and never re-derived.** Each run matches new observations against the *visible list of existing threads*, using their labels and last states. Matching against a shown list is a far more reliable judgment than reconstructing a slug from scratch.

**Bias rule:** when it is unclear whether an observation belongs to an existing thread or a new one, **attach it to the existing thread.** Thread proliferation is the failure mode. The review conversation can split a thread later; it cannot easily merge forty of them.

### 4.7 `intel/feedback.json`

Append-only. **Written only by the review conversation.**

```json
{
  "feedback": [
    {
      "feedback_id": "FB-2026-07-15-001",
      "date": "2026-07-15",
      "kind": "miss",
      "statement": "Missed Intuit's SMB advisory launch, published 2026-07-07.",
      "zone": "Field Movements",
      "cell_id": "smb-fintech",
      "action_taken": "Marked Field Movements × smb-fintech source_health=suspect. Added OBS-2026-07-15-003 against DRV-001."
    }
  ]
}
```

- `kind`: `miss` | `noise` | `driver_confirm` | `driver_kill` | `relevance_correction`

**Capture these from day one and do no statistics on them.** The ground truth of what was missed in March is gone from human memory by June — it cannot be reconstructed later. But a calibration layer that scores rates has no honest basis until months of records exist. **Schema now, math later.** See §11.

---

## 5. Skill: `environmental-scan`

**Frontmatter:**
```yaml
---
name: environmental-scan
description: This skill should be used when collection needs to run for an intelligence-briefing deployment — the rotation-driven scan that gathers observations, checks signposts, updates threads, and re-decides drivers. Produces state on disk, not a document. Runs on its own before the brief, or standalone on a schedule. Reads the deployment's CLAUDE.md for relevance context, zones, coverage matrix, and paths.
allowed-tools: Read, Write, Edit, WebSearch, WebFetch
---
```

**This skill produces no document. Nobody reads its output. Its output is state.**

### Steps, in order

**0. Validate config.** Read `CLAUDE.md`. The only halting condition is a missing or placeholder **relevance context** — emit the structured halt and stop. Every other missing field silently takes its default.

**1. Open a run record.** Write a new row to `runs.json` with `run_id`, `started`, and `status: "failed"` (pessimistic — it is upgraded on completion). Derive `window_start` from the last completed-or-degraded run's `window_end`; if none, use one cadence interval back.

**2. Read state.** `coverage.json`, `drivers.json`, `signposts.json`, `threads.json`, and the current month's observation shard. Read prior shards only if a due signpost or a reassessment target points into them.

**3. Build the collection plan.** Three sources of queries, in this order:

   **(a) Due cells.** Every `matrix` row where `applicable: true` and `next_due <= today`. Each due cell is a zone × domain-cell search: apply the zone's lens to the domain cell's territory. A cell marked `source_health: "suspect"` must **widen its channels** — do not repeat the search that already missed something.

   **(b) Due signposts.** Every `signposts.json` row where `status: "open"` and (`due <= today` or `due` is null and it has not been checked in seven days). **This is a directed search for a specific named event.** It is not a zone sweep. Search for exactly the thing the signpost names.

   **(c) Driver falsifiers.** For each `active` driver, search for evidence that would move it *against* its current direction. **This is a mandatory step and it is what makes the disconfirming section actually disconfirm.** A driver at `Increasing / High` gets a search for evidence of weakening. This is the operation the old product promised in its README and never performed anywhere in its pipeline.

**4. Execute the plan.** Use built-in `WebSearch`; use `WebFetch` to open a source when you need to confirm a date, a figure, or a qualifier. Run every search **inline, in this session** — never delegate to a subagent.

   **Per cell, record the outcome in the matrix**: `ok`, `empty`, or `failed`. `empty` is a success. `failed` means the search errored, rate-limited, or timed out.

   **Scan budget per cell:** roughly three to eight high-signal channels. Stop early only when the pass produces no motion *and* the cell's `source_health` is `ok`. A `suspect` cell does not get to stop early.

**5. Filter.** Discard anything that does not clear the relevance context. When in doubt, discard — a strained relevance justification means the item does not belong. **Discard at the edge, never at the material.** Missing a material shift that plainly clears the bar is the one unacceptable failure.

**6. Capture observations.** For every survivor, write an observation per §4.1.

   **The `captured_evidence` field is filled here, at gather time, before any compression.** Record the verbatim figures, ranges, dates, and qualifiers exactly as the source states them. If a source says "1–3x among surveyed firms, preliminary," that whole string is evidence. **This is the single most important write in the entire system** — everything downstream re-derives from it.

   Classify per §2.2 (type, tier, corroboration, disposition). Attach to a thread (§4.6 matching rule). Attach to zero or more drivers.

**7. Update threads.** For each observation:
   - Matches an existing thread and represents a **material advance** (a new decision, a new publication *with a materially new result*, a funding event, a regulatory action, a measured outcome, a reversal, or a credible contradiction) → update `last_material_change` and `last_state`.
   - Matches an existing thread but is **derivative** (commentary, restatement, coverage of the same event) → attach the observation, do **not** update `last_material_change`. **The thread does not resurface in the brief.**
   - Matches nothing → create a new thread.

   > "A new publication" alone is **not** a material advance. Daily derivative commentary on an unchanged underlying state was a confirmed defect. It must produce an observation and no brief item.

**8. Resolve signposts.** For each signpost checked in step 3(b):
   - The named event occurred → `status: "fired"`, record `resolved_date` and `resolved_observation`.
   - The `due` date passed and the event did not occur → `status: "expired"`. **An expired signpost is information.** A predicted event that failed to happen is evidence about the driver, in the opposite direction from `if_fired`.
   - Still pending, `due` not reached → leave `open`.

**9. Reassess drivers.** A driver is re-decided **only when both conditions hold**:

   - **Standing.** No `applicable` cell in the matrix is past its `next_due`. Collection is current.
   - **Cause.** At least one new observation or resolved signpost has attached to this driver since its `last_reassessed`.

   **If standing fails, no driver moves. Full stop.** Confidence may not move on a partial look. This is the same doctrine as the quiet-day rule, applied one level up: *silence must be attributable, and so must confidence movement.*

   When both hold, re-read the driver's supporting observations and decide whether `direction` or `certainty` changes. If either moves, **append** a `confidence_log` entry with the date, the new values, a plain-language reason, and the `moved_by` observation ids. Update `implication` if the movement changes what the reader should build. **Never rewrite a prior log entry.**

   If nothing moved, that is a valid outcome. Update `last_reassessed` and write no log entry.

**10. Propose emergent drivers.** If a thread has accumulated three or more material observations and does not roll up to any existing driver, record a proposal. **Do not create the driver.** It is offered to the user in the next brief and confirmed through the review conversation (§7).

**11. Close the run record.** Set `completed`, counts, and `status`:
   - **`complete`** — every due cell returned `ok` or `empty`.
   - **`degraded`** — one or more due cells returned `failed`. List them in `cells_failed`.
   - **`failed`** — no cell completed. No brief may be written.

   Recompute `next_due` for every scanned cell. Write all state files back.

---

## 6. Skill: `environmental-briefing`

**Frontmatter:**
```yaml
---
name: environmental-briefing
description: This skill should be used when the user asks to run an environmental brief or daily brief for a configured intelligence-briefing deployment (e.g. "run the daily brief", "what's happening in my world", "environmental scan", or a scheduled run). Reads accumulated intelligence state — observations, drivers, signposts, threads, coverage — and writes a dated brief reporting what moved since the reader last looked. Reports assessment change, not article arrival.
allowed-tools: Read, Write, Edit, WebFetch
---
```

**This skill reads state and writes a document. It does not collect.** If collection has not run, it says so and reports on the state it has.

**Everything in §2 applies to this skill unchanged.** The editorial layer is the good part.

### 6.1 The unit of the brief changes

v0.3.0 reported **articles**. v1 reports **movements**. In order of priority:

1. **Signposts that fired or expired.** The highest-value item in the system, because the reader gets it even if they read nothing in between.
2. **Driver movements.** Direction or certainty changed, with the reason and the observations that moved it.
3. **Material thread advances.** A live story genuinely progressed.
4. **New observations that matter on their own** and do not yet belong to a driver or thread.
5. **Emergent driver proposals** from the scan (§5, step 10), offered for confirmation.

An item that is a derivative restatement of an unchanged thread **does not appear at all.** It is in the store; it is not news.

### 6.2 Every item arrives situated

This is what compounds. **The item does not get shorter. It gets placed.** When an observation attaches to a driver, the brief item carries:

- Which thread it belongs to and how many moves that makes (*"the fourth move in six weeks"*).
- Which driver it moves and in which direction (*"commoditization goes Medium → High"*).
- Whether it cuts for or against the driver's current direction.
- What the driver's `implication` now says (*"the defensible edge migrates to..."*).
- If a signpost fired: that the reader was told to watch for exactly this.

### 6.3 The collection-health line — MANDATORY, on every brief

**Every brief carries a collection-health disclosure. There is no exception and no configuration that turns it off.**

The rule, stated exactly:

> **A quiet-day judgment is permitted only if every mandatory collection cell due today completed. Otherwise the output says "assessment degraded," not "quiet day."**

This **defends** the quiet-day doctrine rather than colliding with it. "A quiet day is correct behavior" is only true if the system actually looked. Today a quiet world and a blind scan produce the same page, and the reader cannot tell which one they are holding. That makes the product negative-value, not merely incomplete.

Three renderings:

**Run `complete`, items found:**
> Collection current. 6 of 6 cells due today completed. Rotation 78% complete this week.

**Run `complete`, nothing found:**
> **Quiet day.** All cells due today were scanned; none are overdue. Nothing moved.

**Run `degraded`:**
> **Assessment degraded.** Policy Levers × AI-advice regulation and SciTech Frontier × model capability did not complete. This brief covers 4 of 6 due cells. **No driver moved today, because collection is incomplete.**

If the scan did not run at all, the brief says so and reports on the last known state, with the date of the last successful collection.

### 6.4 The disconfirming section now has a mechanism

In v0.3.0 "held beliefs" were captured at setup, promised in the README, and **read by no step in the pipeline.** Disconfirming evidence surfaced only when ordinary zone scanning happened to trip over it.

In v1 **held beliefs are drivers** with `origin: "user_asserted"`, and the scan performs a **mandatory falsifier search against every active driver** (§5, step 3c). The disconfirming section reports what that search found: observations that cut against a driver's current direction, naming the driver they challenge.

If the falsifier search genuinely found nothing, the section says so — and that is itself information: *"Nothing surfaced against your four active drivers this week."*

### 6.5 The reckoning

**Trigger:** the first `complete` run where 30 or more days have passed since the last reckoning.

**It is a section in that day's brief, not a separate document.** One less artifact, one less cadence to adopt.

It reads the `confidence_log` across all drivers, including retired ones, for the period, and reports:

- **What moved.** Each driver whose direction or certainty changed, the date it changed, and the observations that changed it.
- **What held.** Drivers whose position survived the period, and what tested them.
- **What you were wrong about.** Any driver retired, reversed, or moved against its original direction. Any `user_asserted` driver contradicted by the evidence. **Name it plainly.**
- **Signposts that fired, and signposts that expired unfired.** Both are results.
- **What it cost you.** Optionally, from feedback records: what the reader flagged as noise and what the reader had to tell it about.

Write it in the same editorial voice as the brief. It is a reckoning, not a report card. See the narrative in §1 for the register.

### 6.6 Length, and the end of the cap

In v0.3.0, `max items per zone: 5` was a **hard cap with no overflow rule, no secondary ranking, and no continuation mechanism** — while the ROLE section simultaneously declared that missing a material item was "the one unacceptable failure." Ten equally material items in one zone forced the agent to drop five material items. **No compliant output existed.** That was a confirmed defect.

The v1 rules:

1. **Observations have no cap.** Everything clearing relevance is captured. **The store is not the brief.**
2. **Length tracks the day.** A law passes or a company folds and the day is big. A hard cap is a gag, not a ceiling.
3. **`max items per zone` becomes a *detail* budget, not an *emission* budget.** At most N items per zone get full treatment. Beyond N, remaining material items appear in a compact "Also in this zone" line — title, disposition, source link. One line each.
4. **No material item is ever silently dropped.** The release valve is **compression, not deletion.**

This makes the contract satisfiable in every case: there is always a compliant output, because overflow compresses rather than disappears. It also dissolves most of the original pressure — ten regulatory actions in one zone are usually not ten items. They are **one driver movement with ten supporting observations**, which is one brief item.

Rename the config field to `zone detail budget` so the intent is legible.

### 6.7 The brief's write step

1. Assemble content per the OUTPUT CONTRACT (§2, unchanged, plus the additions in §6.1–6.5).
2. Run VERIFICATION (§9.3). **Hard gate. The lead, the synthesis, and any driver movement may not be emitted until they pass.**
3. Write to `briefs/YYYY-MM-DD.html` (or `.md`). **If that file already exists, write `-02`, `-03`. Never overwrite.**
4. Project `act` / `track` / lead items into `ledger.json` with `source: "environmental"` for the shared `/contract` convention. Prune only rows with that source, older than 30 days.

### 6.8 New HTML blocks

These are **additions to `references/html-brief.md`**, and the CSS below is **appended to `assets/brief.css`**. Everything in §2.7 still holds: one self-contained file, system fonts, no JavaScript, no entrance animations, flat design. **No colored edge bars and no drop shadows** — the existing stylesheet says so in its own header comment, and these blocks obey it.

The new blocks reuse the existing token vocabulary (`--accent`, `--sage`, `--warn-tint`, `--warn-ink`, `--rule`, `--fg-muted`) so a deployment's theme override recolors them for free.

#### CSS to append to `assets/brief.css`

```css
/* ── Collection health (mandatory on every brief) ───────────── */
.collect{font-family:var(--font-mono);font-size:11px;letter-spacing:.04em;color:var(--fg-muted);
  padding:var(--s-3) 0;border-bottom:1px solid var(--rule);
  display:flex;gap:var(--s-3);align-items:baseline;flex-wrap:wrap;}
.collect .state{font-weight:700;text-transform:uppercase;color:var(--sage);white-space:nowrap;}
.collect .detail{font-family:var(--font-body);font-size:var(--fs-sm);color:var(--fg-secondary);
  letter-spacing:normal;text-transform:none;}
.collect.is-quiet .state{color:var(--fg-muted);}
.collect.is-degraded{background:var(--warn-tint);border-radius:var(--r-sm);border-bottom:none;
  padding:var(--s-3) var(--s-4);margin-top:var(--s-4);}
.collect.is-degraded .state{color:var(--warn-ink);}

/* ── Signpost fired (the highest-value item in the system) ──── */
.card.is-signpost{border-color:var(--accent);}
.signpost-flag{align-self:flex-start;font-family:var(--font-mono);font-size:11px;font-weight:700;
  letter-spacing:var(--tracking);text-transform:uppercase;color:#fff;background:var(--accent);
  border-radius:var(--r-pill);padding:3px 10px;}

/* ── Driver movement (a clause on an item, never a dashboard) ─ */
.driver{border-top:1px solid var(--rule);padding-top:var(--s-3);
  font-size:var(--fs-sm);line-height:1.55;color:var(--fg-secondary);}
.driver .panel-label{color:var(--sage);}
.driver .move{font-weight:700;color:var(--ink);}

/* ── Zone overflow: compression, never deletion ─────────────── */
.also{border:1px dashed var(--rule);border-radius:var(--r-sm);padding:var(--s-3) var(--s-4);
  margin:var(--s-3) 0;font-size:var(--fs-sm);color:var(--fg-secondary);}
.also .panel-label{color:var(--fg-muted);}
.also ul{margin:var(--s-2) 0 0;padding-left:var(--s-4);}
.also li{margin:var(--s-1) 0;line-height:1.5;}
.also a{color:var(--accent);text-decoration:none;}
.also a:hover{text-decoration:underline;}

/* ── Emergent driver proposal ───────────────────────────────── */
.propose{border:1px dashed var(--accent);border-radius:var(--r-sm);padding:var(--s-4);
  margin:var(--s-3) 0;font-size:var(--fs-sm);line-height:1.55;color:var(--fg-secondary);}
.propose .panel-label{color:var(--accent);}

/* ── The reckoning (monthly section, not a separate document) ─ */
.reckoning{border:1px solid var(--rule-strong);border-radius:var(--r-md);
  padding:var(--s-6);margin:var(--s-4) 0;}
.reckoning-title{font-family:var(--font-display);font-size:23px;font-weight:600;line-height:1.25;
  letter-spacing:-.005em;margin:0 0 var(--s-5);}
.reck-block{border-top:1px solid var(--rule);padding-top:var(--s-4);margin-top:var(--s-4);}
.reck-block:first-of-type{border-top:none;padding-top:0;margin-top:0;}
.reck-block p{font-size:var(--fs-sm);line-height:1.6;color:var(--fg-secondary);margin:var(--s-2) 0 0;}
.reck-block.is-wrong{background:var(--warn-tint);border-radius:var(--r-sm);
  padding:var(--s-4);border-top:none;}
.reck-block.is-wrong .panel-label{color:var(--warn-ink);}
.moved{font-family:var(--font-mono);font-size:12px;font-weight:600;color:var(--ink);}

@media (max-width:600px){
  .reckoning{padding:var(--s-5);}
}
```

#### Block: collection health — **MANDATORY, immediately after the page head, on every brief**

Three variants. Exactly one always renders. There is no fourth state and no way to omit it.

```html
<!-- run complete, items found -->
<div class="collect">
  <span class="state">Collection current</span>
  <span class="detail">6 of 6 cells due today completed. Rotation 78% complete this week.</span>
</div>

<!-- run complete, nothing found -->
<div class="collect is-quiet">
  <span class="state">Quiet day</span>
  <span class="detail">All cells due today were scanned; none are overdue. Nothing moved.</span>
</div>

<!-- run degraded -->
<div class="collect is-degraded">
  <span class="state">Assessment degraded</span>
  <span class="detail">Policy Levers × AI-advice regulation and SciTech Frontier × model capability did not complete. This brief covers 4 of 6 due cells. <strong>No driver moved today, because collection is incomplete.</strong></span>
</div>
```

#### Block: signpost fired

A lead-weight card carrying the accent border and the flag. **This is the item the reader gets even if they read nothing in between**, so it sorts above everything else in the Lead.

```html
<article class="card is-lead is-signpost"><div class="card-body">
  <span class="signpost-flag">Signpost fired</span>
  <div class="tag-row"><span class="tag-pill">Fact</span><span class="tag-pill is-act">Act</span></div>
  <h3 class="card-title">The EU's AI content-labeling Code of Practice published</h3>
  <p class="card-desc">What happened, qualifiers intact.</p>
  <div class="driver">
    <span class="panel-label">What you were watching for</span>
    On 2026-06-07 you were told to watch for publication of the finalized Code of Practice, expected by end of June. <span class="move">It published 2026-06-26.</span> This moves <em>Regulatory obligations on AI advice are hardening</em> from Medium to <span class="move">High</span>.
  </div>
  <div class="src"><span class="cite">Publisher · YYYY-MM-DD · primary</span><a href="URL">domain.com →</a></div>
</div></article>
```

An **expired** signpost (the predicted event did not happen) renders the same way, with the flag reading `Signpost expired` and the driver block stating that the absence is evidence in the opposite direction. **A prediction that failed to happen is a result, not a non-event.**

#### Block: driver movement on an ordinary item

The `.driver` block sits between `.relevance` and `.src`, in the same position `.watch` occupies for a Signal. **It is a clause on an item. It is never a standalone card and never a status board.**

```html
<article class="card"><div class="card-body">
  <div class="tag-row"><span class="tag-pill">Fact</span><span class="tag-pill is-track">Track</span></div>
  <h3 class="card-title">Google adds an advisory agent to Workspace for small business</h3>
  <p class="card-desc">What happened, qualifiers intact.</p>
  <div class="relevance"><span class="panel-label">Why it lands</span>Why this clears the bar.</div>
  <div class="driver">
    <span class="panel-label">Where this sits</span>
    <span class="move">The fourth move in six weeks</span> on <em>AI advisory commoditization at the SMB front door</em>, which goes Medium → <span class="move">High</span>. Your June 7 read — that the defensible edge sits in proprietary data and program integration — still holds; nothing since has cut against it.
  </div>
  <div class="src"><span class="cite">Publisher · YYYY-MM-DD · secondary</span><a href="URL">domain.com →</a></div>
</div></article>
```

#### Block: zone overflow

Renders **only** when material items exceed the zone detail budget. Every dropped-to-a-line item still appears. **Compression, never deletion.**

```html
<div class="also">
  <span class="panel-label">Also in this zone</span>
  <ul>
    <li><a href="URL">Second state adopts an incompatible audit standard</a> — Fact · Track</li>
    <li><a href="URL">Trade body publishes model compliance guidance</a> — Frame · Note</li>
  </ul>
</div>
```

#### Block: emergent driver proposal

Renders at the foot of the brief when the scan proposed a new force (§5, step 10). **The brief proposes; it never creates.** Confirmation happens in the review conversation.

```html
<div class="propose">
  <span class="panel-label">A force may be forming</span>
  Five observations across six weeks now point at something I don't have a driver for: state-level AI rules filling the federal gap. Tell me to track it, or tell me it's noise.
</div>
```

#### Block: the reckoning

Renders as its own section, after Synthesis, on the first `complete` run 30+ days since the last one. **A section of the brief, not a fourth artifact.**

```html
<div class="section-head"><span class="label">The Reckoning</span><span class="line"></span><span class="count">last 30 days</span></div>

<div class="reckoning">
  <h3 class="reckoning-title">Your picture moved twice, and one thing you believed broke.</h3>

  <div class="reck-block">
    <span class="panel-label">What moved</span>
    <p><span class="moved">Commoditization at the SMB front door · Uncertain/Medium → Increasing/High</span><br>
    Moved 2026-06-07 (Meta goes global), 2026-06-19 (pricing tiers land), 2026-07-14 (Google enters). Seven observations behind it.</p>
  </div>

  <div class="reck-block">
    <span class="panel-label">What held</span>
    <p>Your June 7 read — that the defensible edge migrates to proprietary data and program integration — survived the period. It is now the load-bearing assumption in your product strategy.</p>
  </div>

  <div class="reck-block is-wrong">
    <span class="panel-label">What you were wrong about</span>
    <p>On June 7 you treated the US light-touch executive order as lowering compliance drag. Three observations since suggest state-level action is filling the federal gap. That force is stronger than you logged it.</p>
  </div>

  <div class="reck-block">
    <span class="panel-label">Signposts</span>
    <p>One fired: the EU Code of Practice published June 26. One expired unfired: no second jurisdiction converged on a common audit standard, which is itself evidence for fragmentation.</p>
  </div>
</div>
```

**Voice.** Write the reckoning in the same editorial register as the rest of the brief. **It is a reckoning, not a report card.** Do not score the reader and do not congratulate them. See the narrative in §1 for the tone.

---

## 7. Skill: `intelligence-review`

**Frontmatter:**
```yaml
---
name: intelligence-review
description: This skill should be used when the user wants to interrogate or correct their intelligence picture — asking what is known about a topic, what changed on a driver, where coverage is thin, or telling the system it missed something or wasted their time. Reads the accumulated observations, drivers, signposts, and coverage matrix; records misses, noise, and driver judgments. The only surface where the user writes to the system after setup.
allowed-tools: Read, Write, Edit, WebSearch, WebFetch
---
```

### 7.1 It is a conversation, not a set of commands

**Do not build four named entry points.** The user will not know which verb they are using. They will say *"you missed the Intuit thing, and what's happening with the fragmentation driver anyway"* — which is a miss record and a query in one sentence. A command with arguments cannot take that. Recognize intent from what they say.

### 7.2 The asymmetry that justifies this skill's existence

**The system can report what it observes about itself:**
- Answers to questions, read out of observations, drivers, signposts, and threads.
- **Coverage gaps.** The matrix knows which cells are overdue and which have `source_health: "suspect"`.
- **Proposed drivers.** Threads that have accumulated enough to be a force.
- **Stale drivers.** Ones that have not moved in months.

**Only the user can supply:**
- **A miss.** The system scanned that cell and still did not see the thing. **The matrix will never know this, because a miss is by definition what it did not see.**
- **Noise.** The system has no idea what the user read or ignored. Noise is invisible to it.
- **Whether a proposed driver is real.**
- **Whether a stale driver should die.**

**If the system could observe its own misses, this skill would not need to exist.** That asymmetry is its entire justification, and it is why an unattended system cannot learn what it missed without a human surface.

### 7.3 What each input does

| Input | Action |
|---|---|
| **Question** | Read-only. Answer from state. Show the driver, its confidence log, the observations behind it, and its open signposts. |
| **Miss** | Write a `miss` feedback record. **Locate the cell.** If that cell was scanned in the relevant window and returned `empty`, set its `source_health: "suspect"`. Search for the missed item, capture it as an observation, attach it to its thread and drivers. **Report what changed as a result.** |
| **Noise** | Write a `noise` feedback record against the item and its cell. If noise records accumulate against the same cell or the same kind of item, say so plainly and offer to sharpen the relevance context. |
| **Driver confirm** | Create the proposed driver with `origin: "emergent"`, seed its `confidence_log`. |
| **Driver kill / retire** | Set `status: "retired"`. **Never delete it.** The reckoning reads retired drivers. |
| **Relevance correction** | Write a `relevance_correction` record. Offer to edit the relevance context in `CLAUDE.md`. |

### 7.4 This is how requirements get deeper without a form

The setup interview stays exactly as light as it is today: three open questions, no personas, no menus.

**Everything after that happens here.** The system proposes a driver and the user kills it. The user says *"you keep missing the state-level stuff"* and that becomes a driver with a falsifier. Six months in, the drivers are specific and hard-won, and nobody ever filled out an intake form.

Evidence this is the right call: in the one real deployment on disk, `Held beliefs: [empty]`. The single field that would have enabled the disconfirming slot was left blank **by the person who built the plugin, in his own deployment.** Config-as-form does not get filled in.

---

## 8. Setup: `/intel-setup`

Keep everything in the v0.3.0 command **except** as noted. In particular keep the three open questions verbatim, the anti-persona guardrail, the anti-inference guardrail, the no-real-company-names guardrail, the approvals pre-warning, the `.claude/settings.json` pre-allow, the web-search pre-flight check, the test run, and the scheduling instructions.

### Changes

**A. After confirming the relevance context, derive and play back the forces.**

Derive three to five **forces** — not decisions, not questions, not Priority Intelligence Requirements. A force is what a driver is: *"Automation Pressure" is a driver; "Jobs Disappear" is an outcome.* Play them back in the user's own language:

> From what you told me, I think these are the forces worth tracking:
> 1. ...
> 2. ...
>
> Do these look right? What's missing, and what's too broad?

Take the corrections. Write them to `drivers.json` with `origin: "derived"`, `direction: "Uncertain"`, `certainty: "Low"` or `"Medium"`, and a seed `confidence_log` entry reading `"Seeded at setup from the relevance context."`

**Never seed a driver at `High` certainty.** The system has zero observations at this point. A driver's certainty is earned from evidence, and there is none yet.

**B. Derive the domain cells.**

The territory is already implicit in the relevance context and the zone in/out examples. Extract it as four to eight named domain cells and confirm them with the user. Write to `coverage.json`.

**C. Build the coverage matrix.**

Cross every zone with every domain cell. Present the grid. Ask the user to mark the genuinely non-applicable crossings — and **record a reason for each `applicable: false`.**

Set `required_frequency_days` per cell. Default 7. Offer 1–3 days for cells the user says move fast. **The rotation is what earns the coverage claim; a matrix where everything is weekly and the brief is daily will complete correctly over the week.**

**D. Delete the "Held beliefs" config section.** Beliefs are drivers now. If a user states a belief during setup, write it as a driver with `origin: "user_asserted"`.

**E. Rename `max items per zone` to `zone detail budget`** with a comment explaining it is a depth ceiling, not an emission cap (§6.6).

**F. Create the `intel/` directory and all state files in their empty forms.** Via `Write` only — never shell.

---

## 9. Rules that changed

### 9.1 `SKILL.md:38` splits

The old line — *"You are a triage agent, not a coverage agent"* — was written to make a single-run scanner honest about its ceiling, and in doing so hard-coded the ceiling into doctrine.

Now it splits:

- ***Report narrowly*** stays true permanently, at the presentation layer. Fewer and better always wins.
- ***Do not attempt coverage*** becomes **false at the collection layer and must go.** Collection is now rolling, obligated, and disclosed.

New framing for the scan skill: **"You are a coverage agent at collection and a triage agent at presentation."**

### 9.2 The README copy

`README.md:5` claims *"reads broadly and reports narrowly."* `README.md:27` says *"scan the world broadly."* In v0.3.0 these were unearned, and the skill's own doctrine (`SKILL.md:38`) contradicted them.

They are now earnable, but **state the mechanism**: *"Reads broadly over the rotation; reports narrowly every day. Every brief tells you exactly what it covered and what it did not."*

Do not claim within-run breadth. That is exactly the claim the mechanics cannot support and never will.

### 9.3 Verification becomes re-derivation, not self-review

**The old gate was self-review theater.** The same agent gathered, interpreted, drafted, classified, synthesized, and verified in one context, auditing "its own assembled draft as if you did not write it." **If the drafting pass misread a source, the verifying pass inherits the misreading.** It can check its labels against its own draft; it cannot check its draft against the world.

**The fix is not a second agent.** A second agent reading the same draft has exactly the same problem. **The fix is re-derivation from evidence captured at gather time.**

The verification pass:

1. For every claim in the assembled draft, locate its observation.
2. For every figure, range, date, and qualifier in the written claim, **find it in that observation's `captured_evidence`.**
3. If it is not there → **restore it from the evidence, or cut the claim.** A claim with no evidence backing is not emitted.
4. Re-check qualifier stripping, range narrowing, tier and corroboration labels, and type drift **against `captured_evidence`, not against the draft.**
5. Check that every synthesis thread and every driver movement draws only on observations actually present in the store.
6. Check evidence-bar compliance (§9.5).
7. Check manufactured fullness. **On a thin day, is the brief short?**

**Hard gate.** The lead, the synthesis, and any driver movement may not be emitted until this passes.

> **Say this in the skill text:** `captured_evidence` is an internal working artifact and is **never emitted**. Rule 10 forbids block quotes *in the brief*; it does not forbid the system from remembering what a source actually said.

### 9.4 Degraded is not quiet

Stated in §6.3. **It is the single most important rule in this spec after §9.3.** It is what makes the quiet-day doctrine safe.

Cross-plugin note for the marketplace: **silence must be attributable.** Any product whose empty output is a legitimate answer must record why it is empty. *"Quiet day is correct"* is only safe when paired with *"and here is proof I looked."*

### 9.5 The action gate keeps its primary-source exception

v0.3.0 contradicted itself across three files. The EVIDENCE BAR permitted `act` on *"a primary source whose authority is self-evident"* (`SKILL.md:163`). The VERIFICATION gate said *"a single-source item carrying `act` violates the action gate"* with **no exception** (`SKILL.md:192`). The deployment template stated the prohibition with **no exception** (`templates/CLAUDE.md:33`). A regulator publishing its own final binding rule is primary *and* single — one instruction permits `act`, the hard gate forbids it.

**Decision (Kelsey, 2026-07-12): keep the primary-source exception and propagate it.** A final rule published by the issuing body is authoritative on its own, and it is exactly the item a decision-maker most needs to act on.

Write the rule identically in all three places:

> **Action gate.** When ON, a single-source item may carry `note`, `track`, or `dig`, but never `act` — **unless** the single source is **primary and its authority is self-evident** (the issuing body publishing its own final, binding action). Acting otherwise requires corroboration.

**This is the only architecture-independent bug in the review. It must be fixed even if everything else in this spec is deferred.**

### 9.6 `dig` is the success state

The disposition vocabulary is unchanged, but its center of gravity moves. `note` is currently described as *"the honest default for most items."* That is correct for a reader who wants to be informed and **wrong for one who wants to be pointed.**

**The product is a targeting system for attention, not a replacement for it.** The reader is a reader. They are not fleeing information — their reading surface keeps growing and they have lost the ability to tell what deserves them. So `dig` — *"leave the brief and read this in full"* — is the product's success state, not an edge case. The source line is a **handoff**, not a citation.

Remove *"the honest default for most items"* from the `note` definition. Do not add a quota for `dig`.

---

## 10. The Strategic Foresight export

**Export drivers, not observations.**

The two *hit* schemas cannot and should not match. Foresight's scan hit is a **human judgment form**: twenty-one fields, a two-minute entry rule, a description in the scanner's own words, "how could the future be different," a named stakeholder and the implications for them, a Confirming/Creating/Resolving effect, and four 0–5 ratings. An observation is a **machine capture**. Forcing the match would require fabricating the ratings and the composite score, which §11 explicitly rejects.

The two *driver* schemas already nearly match, which is why the vocabulary in §4.2 was chosen to be foresight's.

### Field mapping

| intelligence-briefing | Strategic Foresight | Note |
|---|---|---|
| `name` | `name` | direct |
| `definition` | `definition` | direct |
| `direction` | `direction` | **same vocabulary by design** |
| `certainty` | `certainty` | **same vocabulary by design** |
| `time_horizon` | `time_horizon` | direct |
| `steep_primary` / `steep_secondary` | same | via the zone map below |
| `cell_ids` | `domain_categories` | cell label becomes category name |
| `supporting_observations` | `supporting_hits` | observation ids become hit ids |
| `observation_count` | `hit_count` | direct |
| `confidence_log` | *(no equivalent)* | **exported anyway.** Foresight has nothing like it and only benefits. |
| `implication` | *(no equivalent)* | **exported anyway.** |

### Zone → STEEP mapping

Applied **at export time only.** It does not live in the daily runtime. Zones and STEEP are the same *kind* of object — a fixed lens set that forces the scan across dimensions it would otherwise skip — so a translation between them is legitimate.

| Zone | Primary STEEP | Secondary |
|---|---|---|
| Emerging Impact | T | E |
| Currents | S | E |
| SciTech Frontier | T | — |
| Policy Levers | P | — |
| Field Movements | E | T |

A driver's STEEP is derived from the zones its supporting observations came from — primary = the modal zone, secondary = the rest.

### What the export buys

Foresight's `/scanning-drivers` **refuses to cluster until thirty quality hits exist** and warns the user if they have fewer. It uses the 0–5 composite score as a quality proxy because a human just dumped 150 hits in a session.

A deployment that has been running six months does not arrive with a pile to cluster. **It arrives with warm drivers** — direction, certainty, months of dated supporting evidence, and a confidence history nothing in foresight can currently produce. **The scanning phase already happened.**

The composite score is unnecessary here for the same reason. **The briefing has a better quality filter, which is time.** An observation still attached to a live driver after four months has earned its place more honestly than one that scored 14 on a Tuesday.

---

## 11. What is deliberately NOT built, and why

**This section exists because a one-shot build will helpfully add these back. Do not.** Each was considered and rejected on the merits.

**Estimates and probabilistic forecasts.** *"60% chance of X by Q2."* Cut on value, not deferred for cost. A solo operator does not place bets against a forecast; they decide what to read and what to act on. A number buys false precision, invites trust in a digit the system cannot support, and is the one output whose wrongness the reader has no way to detect. **It fails the only test that matters: what does the reader do differently?** Nothing. Do not add estimates until someone can name the decision one changes.

**A separate weekly or monthly product.** The brief's cadence already belongs to the reader. A reader who wants weekly sets their cadence to weekly, and the brief reports what moved since they last looked — that is its existing definition, honored. A distinct weekly artifact commits the user to a new habit they have not asked for. **The one thing that genuinely does not exist at any cadence is the reckoning, and §6.5 makes it a section of the brief rather than a fourth artifact.**

**An indications-and-warning subsystem.** Warning states, maintained indicator boards, monitoring plans with ownership and thresholds. These exist because institutions hand collection posture across shifts. **This reader has no shift change.** The value is already delivered by the signpost field (§4.3), which is one field doing two jobs. Do not build the apparatus around it.

**Calibration math.** No hit rates, no miss rates, no false-alarm scoring, no auto-tuning of the relevance context. **Feedback records are captured from day one (§4.7) because the ground truth cannot be reconstructed later** — what the reader was missing in March is gone from their memory by June. But statistics over three data points are worse than no statistics. The *trust* value of the review conversation is immediate and non-statistical: **a filter that can never be told it is wrong will be abandoned the first time it is obviously wrong.** That is the whole argument for §7. The math waits for months of records.

**Velocity, and any numeric driver score.** `direction` and `certainty` with an append-only movement log are sufficient. Velocity is a fourth axis that needs calibration data to mean anything, and it invites a number. The `confidence_log` makes velocity derivable later if it turns out to be wanted.

**Foresight's numerical quotas.** 40–50 signals triaged to 15–25 per session; 150–250 total; 10–15 driver clusters; a minimum of 3 supporting hits per cluster. **Verified in the framework and deliberately rejected.** Quotas make sense for a bounded exercise that must complete a sweep before it can proceed. In an unattended briefing system **they create exactly the padding pressure the quiet-day doctrine exists to prevent.** A quiet day must be allowed to produce nothing.

**Foresight's additive composite score.** Impact + Novelty + Credibility + Plausibility, threshold ≥ 10. It is useful for sorting a fixed pile once, and it **creates false comparability**: a binding regulation and a low-plausibility strategic surprise can both score 14 for entirely different reasons. Preserve the dimensions separately; use explicit admission rules. See §10 for why the export does not need it.

**A driver status board in the brief.** **Drivers are plumbing, not a surface.** The moment the brief opens with a dashboard of eight driver statuses, the reader has been handed eight more things to read and the product has become the problem it was built to solve. **A driver appears as a clause attached to an item, or it does not appear.** The only exception is the reckoning (§6.5), which is explicitly a periodic look at the picture itself.

**A verifier subagent.** See §9.3. A second agent that reads the same draft inherits the same misreading. Re-derivation from captured evidence does not. **This is strictly better than what the reviewer asked for**, and it keeps the no-subagent lock intact.

**A Framing phase or a domain-map wizard.** The territory is already implicit in the relevance context. §8.B extracts it in one confirmation step. Do not add an intake phase.

---

## 12. Build order

1. **State layer.** All six JSON schemas, created empty by setup. Nothing works without them.
2. **`/intel-setup`.** The v0.3.0 command plus §8's changes.
3. **`environmental-scan`.** The whole of §5. This is the largest piece.
4. **`environmental-briefing`.** §2 preserved plus §6.
5. **`intelligence-review`.** §7.
6. **The text-only fixes.** §9.5 (action gate, three files) and §9.2 (README copy). **These are independent of everything else and must land regardless.**
7. **`/brief` command** chains scan → briefing.
8. **`/intel-export`** command for §10. Lowest priority; nothing depends on it.

## 13. Release

Per the root `AGENTS.md`:

- Bump `version` in `plugin.json`. **Recommended: `1.0.0`.** Both the architecture and the config shape change, and it is the first version whose promises match its mechanics. Kelsey's call.
- Update the `v<X.Y.Z> — ` prefix in **both** descriptions (`plugin.json` and the catalog entry in `.claude-plugin/marketplace.json`), the README "Plugins at a glance" row, and the root `AGENTS.md` plugin list.
- Add a `CHANGELOG.md` entry.
- Run `node dev/scripts/check-version-prefix.mjs`.
- Run `claude plugin validate ./intelligence-briefing` **and** `claude plugin validate .`
- Commit, tag `intelligence-briefing-v1.0.0`, push.

## 14. Decisions locked (Kelsey, 2026-07-12)

- **Version: `1.0.0`.**
- **`required_frequency_days` default: 7.** Offer 1–3 at setup for cells the user says move fast.
- **Reckoning interval: 30 days.**
- **Zone → STEEP table (§10): approved as drafted.**

Nothing in this spec is open. Build it.
