# Sage

**A weekly meeting round-up that keeps a fast-moving week legible at a glance, by [Kenzie Creative](https://www.kenzienotes.com).**

Sage turns a stream of meeting transcripts into one living weekly document. Each meeting becomes a structured summary; every summary folds into a single round-up that tracks action items, cross-meeting threads, and a forward watch list. You read the round-up; the summaries sit underneath as evidence. Drop a transcript and the round-up catches up — automatically every two hours, or instantly with one command.

It's built for the week where five different conversations all touched the same decision and you need to know where it actually landed.

## What you get

**One document, not twelve.** Every meeting feeds into the same weekly round-up. Index by day, action items by status, cross-meeting threads with their evolution. You read one file to know where the week stands.

**Action items split into Closed, Open, and Out next week.** As transcripts roll in, items move from Open to Closed when a meeting reports them done. Ambiguous resolutions land in a "status checks needed" bucket framed as questions, not assumptions.

**Cross-meeting threads as first-class.** When the same decision shows up in three meetings, it gets one row in the round-up with a status column that updates as the thread moves. No re-reading three summaries to figure out where things landed.

**A forward watch list, time-bucketed.** Tomorrow, before EOW, before specific dates, next week, deferred-OK. At end of day, Sage re-buckets it so the list matches the time you actually have.

**Per-meeting summaries underneath.** Six fixed sections per meeting: Headlines, Major Decisions, Action Items by Owner, Blockers, Cross-Meeting Threads, Notable Quotes. Built for a 90-second scan, not a transcript replay.

**It runs itself.** Set a schedule and Sage processes new transcripts every two hours. A run skipped because your machine was asleep catches up automatically.

## How it works

You run one setup command that asks for your timezone and which (if any) meeting transcription service you want Sage to auto-pull from. Setup writes the config, creates the working directories, and points you at `/schedule` to register the recurring run.

From there each run follows the same path: ingest anything new (from your transcription service via MCP, plus anything you've dropped into `source/`), summarise each meeting into the fixed six-section structure, file it into this week's folder (dated by Monday), fold it into the rolling round-up, and apply cleanup discipline — close resolved items, surface ambiguous ones as status checks, re-bucket the forward list at end of day.

You can also run it on demand with `/sage:run` — same operation as the scheduled task, just now instead of in two hours.

One project equals one round-up. Personal meetings and team meetings you summarise for sharing are two separate projects.

## Getting started

After installing the plugin (see the [marketplace README](../README.md)), open the project where you want the round-up and run:

```
/sage:setup
```

Answer the questions — timezone is the only one that matters; the rest have working defaults. To register the recurring run, type `/schedule`, set the prompt to `Run the meeting-triage skill for this project` (or just `/sage:run`), and pick the cadence you want.

To run it any time on demand:

```
/sage:run
```

To see your first round-up, drop a transcript file into the `source/` folder Sage created in your project, then run `/sage:run`. The summary and round-up land under `meetings/<this-week's-monday>/`.

## What's in the round-up

Every `weekly-roundup.md` has the same shape:

- **Meetings This Week** — an index organised by day, each meeting linked to its summary.
- **Companion Documents** — briefs, Confluence pages, external artefacts — linked, not duplicated.
- **Action Items For You** — split into Closed, Open this week, and Out next week.
- **Things You Should Know** — FYI items that affect your work but aren't your action, grouped by topic.
- **Cross-Meeting Threads** — table of threads that span multiple meetings, with status this week and which meetings touched them.
- **Themes & Patterns** — higher-altitude observations, used sparingly; a quiet week says so.
- **Forward Watch List** — Tomorrow, Before EOW, Before specific dates, Status checks needed, Next week, Deferred-OK.

Closed action items stay in the round-up with strikethrough so the week's progress remains visible. Closed threads stay in the table with status updated to "closed <day>." Nothing disappears mid-week.

## Supported transcription services

Sage auto-pulls from these via their MCP servers:

- **Read.ai** — connect the [Read.ai MCP](https://www.read.ai/) and pick it during setup. Note: the MCP is in beta and auth is migrating from username/password to OAuth, so you may need to reconnect occasionally.
- **Fireflies** — connect the [Fireflies MCP](https://fireflies.ai/) and pick it during setup. Stable API, easiest of the three to set up.
- **Granola** — connect the [Granola MCP](https://www.granola.ai/) and pick it during setup. Transcript fetch is paid-plan only; Sage checks your plan tier on the first run and falls back to manual mode on free accounts. Granola's MCP also only sees your private "My notes" space — meetings filed into team folders aren't visible.

For anything else (Otter, Zoom's native transcripts, recordings you transcribe yourself), drop the transcript file into the `source/` folder Sage creates in your project. The processing is identical either way — the round-up doesn't care whether a meeting arrived through an MCP or as a dropped file.

If your transcription service has its own MCP that isn't in the list above, you can pick **Other** at setup and supply the tool names yourself. Sage needs two things to auto-pull from any MCP: a way to list recent meetings with stable IDs, and a way to fetch a transcript by ID. If your MCP can do both, you're good.

## Permissions

Sage reads and writes files in your project and (if configured) calls MCP tools on your transcription service. No web access, no shell, no anything else.

- **Cowork:** nothing to configure. Setup may ask once to approve file creation; if your client offers "allow for this project," choosing it once covers all of setup's writes.
- **Claude Code:** setup writes a `.claude/settings.json` into your project that pre-allows *only* the tools Sage uses — file read/write/edit/glob/grep plus the specific MCP tools for your transcription service. You may be asked to trust the folder once. Edit or delete that file anytime.

## Commands

| Command | What it does |
|---------|--------------|
| `/sage:setup` | Sets up a project as a Sage deployment — asks for timezone and meeting MCP, writes the config, creates the working directories. |
| `/sage:run` | Runs Sage once on demand. The same thing a scheduled run does. |

## What's out of scope

A few things Sage explicitly doesn't do:

- **Note files or Slack threads.** Sage processes meeting transcripts only. If your other communications need triage, that's a different tool.
- **Calendar enrichment.** Attendees come from the transcription source. If the source didn't provide them, the summary says so rather than guessing from transcript content.
- **HTML render.** The round-up is markdown; render it however you like.
- **Daily round-ups.** Threads span days; daily artefacts fragment the picture. One round-up per week.

## License

MIT — see [LICENSE](../LICENSE).
