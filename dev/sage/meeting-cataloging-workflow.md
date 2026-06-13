# Meeting Cataloging & Weekly Round-up Workflow

How meeting transcripts are processed into structured summaries and aggregated into a running weekly round-up for Kelsey, as operated during the week of May 4, 2026.

This document captures the working pattern as practiced, including the conventions, the structure of artifacts, the cleanup discipline, and the principles that shaped specific choices. It's written so a future session — or an automated agent — can pick up the workflow without re-deriving it.

---

## What this workflow exists to do

Kelsey processes a high volume of meetings each week — daily standups, executive syncs, partner working sessions, 1:1s, and informal Slack/written exchanges that function as meetings. The risk in that volume is twofold:

1. **Action items disappear** between meetings if no one is holding the cross-cutting picture.
2. **The same topic surfaces in multiple meetings**, and treating each instance in isolation misses the through-line — who decided what, what changed, what's still open.

This workflow exists to surface action items, track cross-meeting threads, and produce a single living document Kelsey can consult at any point during the week to know where things stand.

The output is not a meeting minutes archive. It's a working management artifact.

---

## Folder and file structure

```
Hello Alice Operations/
├── CLAUDE.md                         ← project conventions; lightweight pointer to this doc
├── meetings/
│   └── YYYY-MM-DD/                   ← folder name = Monday's date for the week
│       ├── 01-<slug>-transcript.txt  ← raw transcript, lightly cleaned
│       ├── 01-<slug>-summary.md      ← structured summary
│       ├── 02-<slug>-transcript.txt
│       ├── 02-<slug>-summary.md
│       ├── 03-<slug>-transcript.txt
│       ├── 03-<slug>-summary.md
│       ├── ...
│       ├── NN-<slug>-note.md         ← for Slack threads / written exchanges (not formal meetings)
│       └── weekly-roundup.md         ← the running aggregator
├── proposals/                         ← strategic proposals (e.g., architecture)
├── skills/                            ← skill packages produced for the team
└── workflows/                         ← this document and related process docs
```

Key conventions:

- **Folder name is Monday's date.** The folder represents the *week*, not the day. New weeks reset to `01-`.
- **Sequential numbering through the week.** Monday's first meeting is `01`. Tuesday's first meeting is whatever the next number is (e.g., `04` if Monday had three). The numbering is cumulative across the week.
- **Slug is short kebab-case** based on meeting topic, not full name. Example: `program-marketing-ops-huddle`, not `program-and-marketing-operations-huddle-monday`.
- **Slack threads and written exchanges** that function like meetings get the same numbering convention but with `-note` suffix instead of `-transcript` / `-summary`. They produce a single note file rather than separate transcript + summary.
- **Companion documents** (Confluence pages, partner briefs, etc.) are not saved locally — they're linked from the weekly round-up by URL in a dedicated "Companion Documents" section.

---

## Per-meeting processing

When a meeting transcript arrives (uploaded by Kelsey or — in a future automated setup — pulled from Google Drive), the workflow runs three steps in order: save, summarize, integrate.

### Step 1 — Save the transcript

The raw transcript is saved as `NN-<slug>-transcript.txt`. Light cleanup is applied, not heavy editing:

- **Fix obvious dictation errors.** Common ones in this workspace: "cloud" → "Claude", "co-work" → "Cowork", "vercell" / "versatile" → "Vercel", "cinco fancy" → "sycophancy", proper names from the attendee list.
- **Preserve speaker attribution where the original had it.** If the source format uses "Me/Them" (as some captures do), add speaker labels where context makes them clear; don't force attribution where uncertain.
- **Preserve content even when repetitive.** Dictation captures echo and false starts. Light trimming is OK; aggressive rewriting is not. The transcript is the source of truth if the summary is ever questioned.
- **No invented details.** If the transcript is ambiguous, the summary notes the ambiguity rather than making a call.

### Step 2 — Write the summary

The summary is `NN-<slug>-summary.md`. It uses a consistent structure so Kelsey can scan it the same way every time:

```markdown
# <Meeting Name> — <Date>

**Format:** <standup / 1:1 / planning / partner working session / etc.>
**Attendees:** <list>

## Headlines
3–6 bullets capturing what mattered. Not a recap of what was said —
a synthesis of what changed, what was decided, what's now in motion.

## Major Decisions (when applicable)
| Decision | Notes |
|---|---|
Single source for what got committed to. Comes from the meeting,
not from inference.

## Action Items by Owner
### <Owner Name>
- <action> — owner attribution makes scanning fast; Kelsey can read her own
  section, then check on others'
### <Owner Name>
- ...

## Blockers & Decisions Needed (when applicable)
Things waiting on someone or something.

## Cross-Meeting Threads (when applicable)
Where this meeting touches threads from other meetings — explicit pointers,
not just inference.

## Notable Quotes (used sparingly)
Only when a quote captures intent or framing better than paraphrase can.
> "Quote text"
> — Speaker
```

The summary is structured for Kelsey to read in 90 seconds. Headlines first. Owner-grouped action items. Decisions surfaced explicitly.

### Step 3 — Integrate into the weekly round-up

After the per-meeting summary is written, the weekly round-up is updated. This is where the cross-meeting work happens — see the next section.

---

## The weekly round-up

The round-up (`weekly-roundup.md`) is the single living document for the week. It's updated after every meeting, not at the end of the week.

### Structure

```markdown
# Weekly Round-up — Week of <Monday Date>

## Meetings This Week
Index organized by day. Each meeting links to its summary.

## Companion Documents
Briefs, Confluence pages, external artifacts — linked, not duplicated.

## Action Items For Kelsey
**Closed** — done items, struck through, kept for week-history visibility
**Open — this week** — what she owes in the near term
**Out next week (when applicable)** — context about her availability

## Things Kelsey Should Know (FYI / watch)
Grouped by topic (Email / Salesforce, Alibaba, Operations / capacity,
Financial picture, etc.). Things that affect her work even if she isn't
the actor.

## Cross-Meeting Threads
A table tracking topics that span multiple meetings. Each row is a thread;
the right column is current status, updated as new meetings land.

## Themes & Patterns
Higher-altitude observations across the week. Used sparingly — only when
something is genuinely recurring or shaping behavior at multiple levels.

## Forward Watch List
Time-bucketed: Tomorrow / Before EOW / Before Kelsey's PTO / Status checks
needed / Next week / Open recommendations Kelsey owes.
```

### How it gets updated

After each meeting summary is written, three integrations happen:

1. **Add the meeting to the index** under the correct day.
2. **Update action items.** New ones get added to "Open — this week." Items that resolved get moved to "Closed" with strikethrough. Items whose nature changed get reframed in place (e.g., "Sync with Peter on dedup" became "Dom + Peter own the dedup cleanup" once that decision landed).
3. **Update cross-meeting threads.** If a meeting touches an existing thread, update the thread's status with the new context. If a meeting surfaces a new thread, add a row.

### Things Kelsey Should Know — what goes here

This section is for items that **affect Kelsey's work but aren't her action**. Examples from this week:

- Salesforce dedup status (Dom + Peter own; Kelsey informed)
- SES decision evolution (her stance matters; she's not building it)
- Stacey's PTO Thu/Fri (affects design timeline)
- Carolyn at AEO conference (affects availability)
- Q2 revenue picture (informs prioritization)
- LLM-can't-do constraints surfaced in design conversations

The distinction matters: action items are things Kelsey owes. FYI items are things she should know to make good calls on her actions.

### Cross-meeting threads — what counts

A thread is anything that surfaces in two or more meetings *or* that has evolution worth tracking explicitly. Examples this week included:

- Salesforce dedup / suppression / email overcommitment (touched in standup, exec, Alibaba meeting, SES note)
- Marketing-page feedback gated on Carolyn (standup, exec, design note, Tue 1:1, Wed huddle)
- SES build-vs-buy (exec, John's SES note, Tue 1:1, Wed huddle)
- Alibaba volume + acquisition strategy (standup, exec, Alibaba meeting, Wed huddle)

Each gets its own row. The "status this week" column is updated each time the thread is touched. When a thread closes (decision lands, problem resolved), the row stays but is marked closed.

---

## Cleanup practice

The round-up only stays useful if it gets cleaned. Two patterns:

### Close items as they resolve

When Kelsey says "this is done," items move from Open to Closed (struck through, kept for visibility). When a thread resolves, its status column reflects that. When an FYI item is no longer load-bearing, it gets removed in the next cleanup pass.

### End-of-day cleanup sweeps

At natural break points (end of day, especially before transitions like PTO), the Forward Watch List gets restructured into useful time buckets:

- **Tomorrow** — what's actionable in the next 24 hours
- **Before EOW** — what needs to land before the weekend
- **Before Kelsey's PTO (or other transition)** — what needs to clear before a specific date
- **Status checks needed** — items I can't confirm without asking someone; surfaced so Kelsey can ping the owner
- **Next week** — what continues / what others own while she's out
- **Deferred-OK** — items with no time pressure that can wait

The status-checks bucket is the most useful pattern from this week — items where I don't have confirmation of completion (T-Mobile outcome, Pilot.com social, etc.). Surfacing them as questions rather than assuming status saves Kelsey from making decisions on stale information.

---

## Memory layer

This workflow runs against a persistent memory system. Things that should survive across sessions go to memory; things that are this-week-only stay in the round-up.

Memory categories used this week:

- **Feedback** — how Kelsey wants the work to be approached. Examples: how to interpret Carolyn's comments (treat as intent, not commitment); design is iterable, functional work has hard deadlines (don't frame design as a blocker on functional work).
- **Project** — durable workstream knowledge. Examples: skill-authoring approach (meta-skill in Claude Code → package for engineers); user-skills vs agent-skills categorization (capabilities vs disciplines).
- **Reference** — external resources worth knowing about. Examples: Main Street Tour Confluence page; Alice architecture doc; Hello Alice AI Advisor brief.

The triggering rule is: would a session three weeks from now benefit from this? If yes, memory. If it's this-week's open task, round-up only.

Memories are added to `MEMORY.md` as one-line pointers; the full body lives in a named file. The format is:

```markdown
---
name: <slug>
description: <one-line summary used in indexes>
type: <feedback | project | reference>
---

<body — for feedback/project, leads with rule, then **Why:** and
**How to apply:** sections>
```

---

## Special handling

### Carolyn's comments

Per a feedback memory saved this week: Carolyn's communication style sounds confident even when she isn't the primary expert. Her assertions about "taking over" work, technical conclusions, or expertise-area claims are captured as **intent or hypothesis**, not commitments — unless Kelsey or the actual domain owner confirms. Stronger signals (written commitments in Slack) carry more weight than verbal asides, but neither is "done until done."

When Carolyn appears to resolve a thread, the workflow checks whether Kelsey treated it as resolved — looking for redirects ("you probably want to see what she's done"), "we'll see," absence of explicit agreement. If Kelsey gently redirects, the thread stays open even if Carolyn sounded final.

### Private post-meeting conversations

Some captures include private debriefs after the formal meeting ends (e.g., Kelsey and Stacey after the Wed huddle). These contain operational substance worth capturing but also coaching/personnel content that shouldn't be amplified in the round-up.

The pattern used this week:

- The transcript file captures the full conversation including the debrief, with a marker noting where the private portion begins.
- The meeting summary captures the operational substance from the debrief (e.g., the naming-the-AI concern, Stacey-Carolyn dynamic) but doesn't quote personal-coaching specifics or venting.
- The round-up references the dynamics at a high level when they affect operational outcomes ("Stacey-Carolyn dynamic" thread), not as a personnel narrative.

### Dictation handling

Kelsey's primary capture is dictation. Common errors caught and corrected: "cloud" → "Claude", "cloud code" → "Claude Code", "co-work" → "Cowork", proper names. When uncertain about a correction, the transcript preserves what was captured and the summary uses the corrected version with a note. Going forward, when a new dictation pattern surfaces (e.g., "vercell" → "Vercel"), it gets added to the cleanup list.

### "Stop and ask" principle

When ambiguity arises about how to handle something — meeting type, what counts as actionable, whether something should be a summary or just a note — the workflow defaults to asking rather than guessing. Mistakes are costly: a misattributed action item or a closed-but-not-closed thread propagates.

---

## What's deliberately NOT in this workflow

A few patterns have been considered and consciously omitted:

- **Per-day round-ups.** The first day used an `eod-roundup.md` per day. By Tuesday, Kelsey shifted to a single weekly round-up because threads span days and a per-day artifact fragments the picture. Don't recreate daily round-ups unless explicitly asked.
- **Heavy task-management mirroring.** The workflow doesn't try to maintain action items in JIRA, Asana, or any other system. The round-up is the source of truth for Kelsey's view; other systems are for other audiences.
- **Auto-categorizing every meeting as the same shape.** Standups, exec meetings, 1:1s, and partner working sessions have different cadence and content density. Summaries adapt — standups skew toward action items by owner; exec meetings include financial/strategic decisions; partner sessions include open questions for the partner.

---

## Numbering and continuity rules

A few practical rules that keep the system consistent:

- **Sequential numbering through a week.** Don't restart at Tuesday. Monday meetings = 01, 02, 03; Tuesday's first meeting = 04; etc.
- **Notes use the same sequence.** A Slack thread captured as a note file uses the next sequential number with `-note` suffix.
- **The folder is always Monday's date.** Even if no Monday meeting happened, the folder name is Monday's date.
- **Don't move existing files when adding new ones.** If Tuesday's meeting is the fourth artifact of the week, it's `04-`; Monday's files stay as they were.

---

## Status and what's next

This workflow has been operational for the week of May 4, 2026. It has handled:

- 7 meetings (4 days), spanning ~3.5 hours of total transcript
- 2 substantive written exchanges (Slack threads treated as notes)
- 2 companion documents (Confluence pages — Alibaba brief, Ken's onboarding)
- 13 active action items at peak (now down to 8 open + 10 closed)
- 14 cross-meeting threads tracked, several closed during the week
- 5 memories saved (3 feedback, 1 project, 1 reference) across this and an earlier session

The next phase under discussion is automation: pulling Google Meet transcripts directly from Drive on a scheduled basis so Kelsey doesn't upload them manually. The workflow described here is the target state for that automation — same structure, same conventions, same cleanup discipline, just triggered by Drive arrival rather than upload.
