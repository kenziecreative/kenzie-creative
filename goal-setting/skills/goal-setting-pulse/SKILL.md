---
name: goal-setting-pulse
description: This skill should be used when the user runs the daily writing ritual or the weekly pulse check of the goal-setting method (e.g. "do my daily goal writing", "log today's goal", "run my weekly pulse", "Monday pulse check"). Drives the two high-frequency Ongoing cadences and appends the entry to goals/journal.md.
allowed-tools: Read, Write, Edit, Glob, Grep
model: sonnet
---

# goal-setting-pulse — The High-Frequency Cadences

This skill drives the two highest-frequency Ongoing cadences: the **daily** writing ritual and
the **weekly** pulse check. The invoking command names the cadence (`daily` from
`/goal-setting:daily`, `weekly` from `/goal-setting:pulse`). These are the most important
cadences and the easiest to skip — so they have to be the easiest to do. **Be terse.** Do not
turn either into a coaching session.

## Current State

!`cat goals/STATE.md 2>/dev/null || echo "No goals/STATE.md — run /goal-setting:init first."`

## Step 0: Preconditions

1. If `goals/STATE.md` does not exist, tell the user to run `/goal-setting:init` and stop.
2. If `mode` is still `setup` (Setup Arc not complete), say so gently: "The daily/weekly
   cadences begin once Setup is done — you're on the Setup Arc. Finish it with
   `/goal-setting:<current_stage>`, or run the cadence anyway if you want to start the habit
   early." Respect their choice.
3. Read the active Objective(s) (and the current week's System) from `goals/active.md` so you
   can show them what to write / check against.

---

## Daily mode

The highest-frequency touchpoint, based on direct neuroscience: writing the goal by hand
embeds it in the nervous system, and *varying the location* defeats the adaptation that turns
a fixed note into wallpaper. Takes 60–90 seconds.

1. **Ask where they are today** — one line: "Where are you writing today? (Different
   room/spot than yesterday — that's the point.)" Read the last daily entry's location from
   `goals/journal.md` and nudge if it matches.
2. **Prompt the hand-writing.** Show the active Objective(s) — and optionally the quarter's
   most important KR or this week's System — and ask them to **write it by hand** and confirm
   done. The act of writing is the intervention; you are not writing it for them.
3. **Append the entry** to `goals/journal.md` under a daily section (newest at top):
   `- **[YYYY-MM-DD] daily** — location: <where>. Wrote: <objective(s) / what they wrote>.`
4. Update `Daily last run` in `goals/STATE.md`. Close in one line. Done.

Keep it under two minutes of interaction. No formatting demands, no journaling prompts.

---

## Weekly mode (Mondays)

Five minutes, one question. This is intelligent adaptation, not a guilt ritual — you're asking
"is the design working?", not "did I work hard enough?"

1. **Ask the single question:**

   > *"Last week, did you execute your systems? If yes, are you seeing progress in your Key
   > Results? If no, what needs to change?"*

   Capture: `system_executed` (yes/no), and if yes, `kr_progressing` (yes/no). If either is
   no, capture the free-text "what needs to change."

2. **Surface the classification** (don't lecture — one or two lines):
   - **Executed + not progressing** → the *goal* may be wrong. The system is running and the
     KR isn't moving; that points at the goal, not the effort. Flag it for the monthly review.
   - **Didn't execute** → the *system* may be wrong. The design isn't holding; revise the
     system (the Four Laws), don't blame willpower.
   - **Executed + progressing** → working. Say so plainly and stop.

3. **Append the entry** to `goals/journal.md` under a weekly section (newest at top):
   `- **[YYYY-MM-DD] weekly** — executed: <yes/no>; progressing: <yes/no/—>; change: <text or "none">.`

4. Update `Weekly pulse last run` in `goals/STATE.md`. Five minutes max.

---

## Guardrails

1. **Terseness is the feature.** These cadences fail when they get heavy. Daily is ~90 seconds;
   weekly is 5 minutes. Don't expand them.
2. The daily ritual is the user writing *by hand* — your job is to prompt and log, not to
   compose the entry for them.
3. Append to `goals/journal.md`; never overwrite prior entries. Newest at top.
4. The weekly classification is a pointer for the monthly review, not a verdict. Surface it and
   move on; don't relitigate the goal in five minutes.
5. Update the matching `last run` line in STATE.md so `/goal-setting:progress` stays accurate.
