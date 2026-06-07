# Intelligence Briefing

The **external scan**: a daily/weekly environmental brief that surveys the outside world — news, industry movement, research, policy, science — and triages it down to the few items worth your attention. Built for triage, not coverage: a quiet day produces a short brief, and that is correct.

This is a self-contained plugin. It's part of the [Kenzie Creative](../README.md) marketplace, where companion plugins (meeting triage, comms triage, review) cover the *internal* scan and the triage-to-backlog step — each installed separately. They coordinate through a shared directory convention, never by depending on each other, so this brief works perfectly on its own.

## What's installed today

| Component | Type | What it does |
|-----------|------|--------------|
| `environmental-briefing` | Skill | The external scan. Produces a triaged daily brief from the outside world, keyed to your relevance context. |
| `/intel-setup` | Command | Sets up a project as a briefing deployment — interviews you for your relevance context, writes the config, runs a first test brief. |
| `/brief` | Command | Runs the brief on demand (the same thing a scheduled run does). |

## Quick start

1. Install the plugin, then open the project where you want this brief.
2. Run **`/intel-setup`** and answer the questions. The one that matters is your *relevance context* — who the brief serves and what makes something worth your attention. Everything else has a working default.
3. Setup runs one test brief so you see real output right away.
4. To run it daily (Cowork): type **`/schedule`**, set the prompt to `Run the environmental briefing skill for this project` (or `/brief`), and pick a time. A run skipped because your machine was asleep catches up automatically.

One project = one brief. A personal scan and a brief you forward to your team are two projects.

## Setup & permissions

- **First run:** setup creates a few files in the project, so you may be asked to approve file creation once. If your client offers an "allow for this project/session" option, choose it — one approval covers all of setup's writes instead of prompting on each.
- The brief needs **web search** to scan the world. `/intel-setup` checks this up front; if web search isn't available yet, it tells you exactly what to approve before running — no half-finished brief.
- **Claude Code:** setup writes a `.claude/settings.json` into your project that pre-allows *only* the brief's own tools (web search/fetch and file read/write), so later runs don't prompt. You may be asked to trust the project folder once. You can edit or delete that file anytime.
- **Cowork:** nothing to configure — web search is available by default and that file isn't used.

## The brief itself

Briefs render as a **self-contained HTML file** by default (`briefs/YYYY-MM-DD.html`) — clean cards on white, scannable, openable anywhere with no dependencies. Two knobs in `CLAUDE.md` under **Output**:

- **Format** — `html` (default) or `markdown` for a plain text brief.
- **Theme** *(html)* — `default` is brand-neutral with system fonts. Point it at a CSS override file in your project (e.g. `./brief-theme.css`) to apply your own brand tokens; the markup stays the same, only the look changes.

## Tuning after a few runs

- **Briefs feel thin or noisy?** Sharpen the relevance context and the zone in/out examples in `CLAUDE.md` — the "out" near-misses do the most work.
- **Low-confidence items reaching conclusions?** Tighten the evidence bar in `CLAUDE.md` toward `decision`, `shareable`, or `strict`.
- **Same stories recurring?** The brief keeps a ledger so it reports what changed, not what it already told you.
- **Want it to challenge you?** Fill in the held-beliefs section in `CLAUDE.md` to enable the disconfirming slot.

## Companion plugins

These live alongside this one in the Kenzie Creative marketplace and are installed separately when you want them. Each writes into the same project's shared files (the [directory convention](../contract/README.md)), so adding one composes automatically with the brief — and skipping them changes nothing here.

- **Meeting triage** — explicit and implicit tasks and patterns from your meeting transcripts.
- **Comms triage** — what matters from email and chat, without duplicating what your meetings already raised.
- **Triage review** — presents everything worth acting on for accept/reject, and adds accepted items to your backlog.
- **Source-directory triage** — pulls in items your other projects hand off.
