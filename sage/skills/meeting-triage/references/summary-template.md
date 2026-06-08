# Per-meeting summary — fixed structure

Every `NN-<slug>-summary.md` uses this structure. Six sections, in this order. Skip sections that don't apply (mark "Major Decisions" / "Blockers" / "Cross-Meeting Threads" / "Notable Quotes" with "_none this meeting_" rather than omitting the header — keeps the summary scannable).

The summary is for a 90-second scan, not a transcript. Headlines first, owner-grouped action items, decisions surfaced explicitly. No invented detail — if the transcript is ambiguous, note the ambiguity rather than make a call.

```markdown
# <Meeting Name> — <YYYY-MM-DD>

**Format:** <standup / 1:1 / planning / partner working session / etc.>
**Attendees:** <list>

## Headlines
3–6 bullets capturing what mattered. Not a recap of what was said —
a synthesis of what changed, what was decided, what's now in motion.

## Major Decisions
| Decision | Notes |
|---|---|
Single source for what got committed to. Comes from the meeting,
not from inference. Omit table rows; replace with "_none this meeting_"
if nothing decided.

## Action Items by Owner

### <Owner Name>
- <action> — owner attribution makes scanning fast; the user can read her own
  section, then check on others'

### <Owner Name>
- ...

## Blockers & Decisions Needed
Things waiting on someone or something. "_none this meeting_" if nothing pending.

## Cross-Meeting Threads
Where this meeting touches threads from other meetings — explicit pointers,
not just inference. "_none this meeting_" if no cross-meeting overlap.

## Notable Quotes
Only when a quote captures intent or framing better than paraphrase can.
> "Quote text"
> — Speaker

"_none this meeting_" if nothing rises to this bar.
```

## Attendee handling

- If the source MCP provided attendees, use them verbatim.
- If the source didn't provide attendees (e.g. `source/` drop with no envelope), write `**Attendees:** [attendees: not provided by source]` and move on. **Do not infer attendees from the transcript content** — names mentioned in the transcript are not the same as the attendee list.
- If attendees were partial (e.g. some speakers identified, others labeled "Speaker 2"), list what's known and flag the rest: `**Attendees:** Alice, Bob, [+ 2 unidentified speakers]`.

## Light cleanup discipline (transcript file, not summary)

- Fix known dictation patterns: "cloud" → "Claude", "co-work" → "Cowork", "vercell" / "versatile" → "Vercel", "cinco fancy" → "sycophancy", proper names from the attendee list.
- Preserve speaker attribution where the source had it (e.g. "Me/Them" format from some captures).
- Preserve repetition and false starts. Light trimming is OK; aggressive rewriting is not. The transcript is the source of truth if the summary is ever questioned.
- When uncertain about a correction, preserve what was captured in the transcript and use the corrected version in the summary with a note.
- New dictation patterns surface as they're encountered; add them to the local cleanup list (a deployment-level note, not this template).
