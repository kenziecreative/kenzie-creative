# Cleanup discipline

The round-up only stays useful if it gets cleaned. Two patterns to apply every scheduled run, plus one end-of-day pattern.

## 1. Close items as they resolve

When a transcript indicates an item is done ("we wrapped the dedup", "I sent the email", "decision made — going with X"):
- Move the matching action item from **Open — this week** to **Closed**, struck through, kept for week-history visibility.
- If a cross-meeting thread reaches resolution (decision lands, problem fixed), keep the row in the table but update the **Status this week** column to "closed <day>".
- When an FYI item is no longer load-bearing (the constraint passed, the person returned from PTO), remove it on the next cleanup pass. Don't accumulate stale FYIs.

**The "stop and ask" rule applies here.** If the transcript only suggests resolution without confirming it ("we should be able to wrap this by Friday"), it doesn't close. Surface as a status-check instead.

## 2. The status-checks-needed bucket

The most useful cleanup pattern from real-world use: items you can't confirm without asking, surfaced as questions rather than assumptions.

When you can't tell from the transcripts whether something completed:
- Add it to the **Status checks needed** bucket in the Forward Watch List.
- Frame as a question pointing at an owner: `T-Mobile outcome — confirm with John` rather than `T-Mobile probably resolved`.
- The user can ping the owner or treat as still-open. Either way, you've saved them from making decisions on stale information.

This bucket is the right home for anything ambiguous. Better to over-surface than to silently mark something closed.

## 3. End-of-day re-bucketing (Forward Watch List)

At natural break points — last run of the day, or before a transition like PTO — re-bucket the Forward Watch List into useful time slots:

- **Tomorrow** — actionable in the next 24 hours
- **Before EOW** — needs to land before the weekend
- **Before <specific date>** — gated on a known transition (PTO, conference, deadline)
- **Status checks needed** — see above
- **Next week** — continues, or others own while user is out
- **Deferred-OK** — no time pressure; can wait

The skill knows when "end of day" is by the configured timezone in `CLAUDE.md`. A run at or after 5pm local time in the user's timezone, with no further meetings in `source/` to process, triggers the re-bucket sweep.

## Special handling that affects cleanup

**Carolyn's-style comments (named after a real pattern).** Some speakers sound confident about taking over work or making technical conclusions, but the actual commitment is softer than the language suggests. When a speaker appears to resolve a thread but the user gently redirects ("you probably want to see what she's done", "we'll see"), the thread stays open even if the resolver sounded final. Verbal asides are weaker signals than written commitments.

**Private post-meeting conversations.** Some transcripts include private debriefs after the formal meeting ends. Capture operational substance in the summary; keep coaching/personnel content out of the round-up unless it affects operational outcomes. Reference dynamics at a high level when load-bearing; don't quote personal venting.

## What "every run" looks like in practice

Each scheduled run, in order:
1. Process any new transcripts (see SKILL.md).
2. For each summary written, integrate into the round-up (index + action items + threads).
3. Run cleanup discipline against the round-up:
   - Close any items the new summaries resolved.
   - Update any threads the new summaries touched.
   - Move surfaced uncertainties to **Status checks needed**.
4. If end-of-day in the user's timezone, also re-bucket the Forward Watch List.

The cleanup is part of the run, not a separate operation. The round-up is "current" at the end of every run.
