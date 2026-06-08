# Weekly round-up — fixed structure

One `weekly-roundup.md` per week, in `meetings/<monday-date>/`. Updated after every meeting summary, not at the end of the week. This is the single living document the user consults to know where things stand.

The folder is always **Monday's date**, even if no Monday meeting happened. The round-up represents the week, not the day.

```markdown
# Weekly Round-up — Week of <Monday Date>

## Meetings This Week
Index organized by day. Each meeting links to its summary.

### Monday <DD>
- [01-program-marketing-ops-huddle](./01-program-marketing-ops-huddle-summary.md)
- [02-execs-weekly](./02-execs-weekly-summary.md)

### Tuesday <DD>
- [03-alibaba-working-session](./03-alibaba-working-session-summary.md)

(Days with no meetings omitted.)

## Companion Documents
Briefs, Confluence pages, external artifacts — linked, not duplicated.
"_none this week_" if no companion docs.

- [Alibaba brief](https://...)
- [Ken onboarding](https://...)

## Action Items For <user-name>

**Closed**
- ~~Sync with Peter on dedup~~ (Mon)
- ~~Review Q2 plan~~ (Tue)

**Open — this week**
- Reply to Carolyn re: marketing page feedback (Tue)
- Confirm SES decision before Thursday (Tue)

**Out next week** (when applicable)
- (Items moved here when the user is OOO or capacity-constrained; context for next week's session.)

## Things <user-name> Should Know (FYI / watch)
Grouped by topic. Things that affect the user's work even if they aren't the actor.

### Email / Salesforce
- Dom + Peter own the dedup cleanup; Kelsey informed (Mon exec sync)
- SES decision evolving; her stance matters but she's not building it

### Operations / capacity
- Stacey's PTO Thu/Fri — affects design timeline
- Carolyn at AEO conference — affects availability

### Financial
- Q2 revenue picture informs Q3 prioritization

## Cross-Meeting Threads
| Thread | Status this week | Touched in |
|---|---|---|
| Salesforce dedup / suppression | Dom + Peter own cleanup; resolved Wed | 01, 02, 04, note-05 |
| Marketing page (gated on Carolyn) | Waiting on Carolyn return | 01, 02, 03, 06, 07 |
| SES build-vs-buy | Decision needed by Thursday | 02, 04, 06 |

(Closed threads stay in the table; status column reads "closed <day>".)

## Themes & Patterns
Higher-altitude observations across the week. Used sparingly — only when
something is genuinely recurring or shaping behavior at multiple levels.

"_nothing notable this week_" is a fine value.

## Forward Watch List
Time-bucketed. Re-bucket during end-of-day sweeps.

**Tomorrow**
- Reply to Carolyn before her flight back

**Before EOW**
- SES decision lands
- T-Mobile follow-up

**Status checks needed**
- Pilot.com social — confirm status with Stacey
- T-Mobile outcome — confirm with John

**Next week**
- Ken onboarding kickoff

**Deferred-OK**
- Q3 planning offsite logistics
```

## How updates work

After each summary lands, three integrations happen in order:

1. **Add the meeting to the index** under the correct day.
2. **Update action items.** New ones go to "Open — this week." Items that resolved move to "Closed" with strikethrough. Items whose nature changed get reframed in place (e.g., "Sync with Peter on dedup" becomes "Dom + Peter own the dedup cleanup" once that decision lands — not a new item, an updated one).
3. **Update cross-meeting threads.** If a meeting touches an existing thread, update the status column. If it surfaces a new thread, add a row.

## What goes in "Things the User Should Know"

Items that **affect the user's work but aren't their action**. The distinction matters: action items are things she owes; FYI items are things she should know to make good calls.

## What counts as a cross-meeting thread

Anything that surfaces in two or more meetings, _or_ that has evolution worth tracking explicitly even within one meeting. Each gets a row; the status column is updated each time the thread is touched. When a thread closes, the row stays but the status reads "closed <day>".

## What is deliberately NOT in this round-up

- **Per-day round-ups.** Threads span days; daily artifacts fragment the picture. Don't recreate them.
- **Heavy task-mirroring.** Don't sync action items to JIRA / Asana / etc. The round-up is the user's view; other systems are for other audiences.
- **One-shape-fits-all meeting summaries.** Standups, exec meetings, 1:1s, and partner sessions have different cadence and density. Summaries adapt — standups skew toward action items by owner; exec meetings include strategic decisions; partner sessions include open questions.
