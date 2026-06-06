# Intelligence Briefing

A daily/weekly intelligence routine that keeps you aware of the things you might care about — across both the outside world and your own work. It pairs an **external scan** (news, industry movement, research, policy, science) with **internal scans** (meetings, communications) and a **review step** that triages everything worth acting on into your backlog. Built for triage, not coverage: a quiet day produces a short brief, and that is correct.

This release ships the external scan. The internal scans and review step are on the roadmap below.

## What's installed today

| Component | Type | What it does |
|-----------|------|--------------|
| `environmental-briefing` | Skill | The external scan. Produces a triaged daily brief from the outside world, keyed to your relevance context. |
| `/intel-setup` | Command | Sets up a project as a briefing deployment — interviews you for your relevance context, writes the config, runs a first test brief. |
| `/brief` | Command | Runs the brief on demand (the same thing a scheduled run does). |

## Quick start

1. Create a Cowork **Project** and install this plugin.
2. In the project, run **`/intel-setup`** and answer the questions. The one that matters is your *relevance context* — who the brief serves and what makes something worth your attention. Everything else has a working default.
3. Setup runs one test brief so you see real output right away.
4. To run it daily: type **`/schedule`**, set the prompt to `Run the environmental briefing skill for this project` (or `/brief`), and pick a time. A run skipped because your machine was asleep catches up automatically.

One project = one brief. A personal scan and a brief you forward to your team are two projects.

## Tuning after a few runs

- **Briefs feel thin or noisy?** Sharpen the relevance context and the zone in/out examples in `CLAUDE.md` — the "out" near-misses do the most work.
- **Low-confidence items reaching conclusions?** Tighten the evidence bar in `CLAUDE.md` toward `decision`, `shareable`, or `strict`.
- **Same stories recurring?** The brief keeps a ledger so it reports what changed, not what it already told you.
- **Want it to challenge you?** Fill in the held-beliefs section in `CLAUDE.md` to enable the disconfirming slot.

## Roadmap

Coming in future releases, each feeding the same review step:

- **Meeting triage** — extracts explicit and implicit tasks and patterns from your meeting transcripts.
- **Comms triage** — surfaces what matters from email and chat, without duplicating what your meetings already raised.
- **Triage review** — presents everything worth acting on for your accept/reject, and adds accepted items to your backlog.
- **Source-directory triage** — pulls in items your other projects hand off, so you get one unified view.
