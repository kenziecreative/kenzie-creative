# Intelligence Briefing

**A daily environmental brief that keeps the outside world from piling up, by [Kenzie Creative](https://www.kenzienotes.com).**

Intelligence Briefing scans the world outside your work — news, industry movement, research, policy, science — and triages it down to the few things actually worth your attention. You tell it once who the brief serves and what makes something matter to you; from then on it reads broadly and reports narrowly, keyed to that context. It's built for triage, not coverage. On a quiet day it produces a short brief, and that is the correct answer, not a failure.

What you get isn't a feed or a digest of everything that happened. It's a judgment: here are the handful of items that crossed your bar, why each one matters to you specifically, and what changed since the last time — written as a clean, self-contained page you can read anywhere or forward to your team.

## What you get

**A triaged brief, not a firehose.** Every item has to clear a relevance bar you set. The brief surfaces the few that matter and stays silent on the rest — a short brief on a slow day is the system working, not failing.

**Reasons, not just links.** Each item comes with why it's on your desk, given who the brief serves. You're reading a take, not a headline list.

**A page that stands on its own.** Briefs render as a self-contained HTML file — clean cards on white, scannable, openable anywhere with no dependencies, and easy to forward.

**Memory across runs.** The brief keeps a ledger of what it's already told you, so it reports what *changed* rather than repeating yesterday's news.

**It runs itself.** Set it on a schedule and the brief lands on its own. A run skipped because your machine was asleep catches up automatically.

**It tunes to you.** A handful of knobs control how strict the relevance bar is, how it draws the line between in and out, and whether it actively challenges beliefs you've written down.

## How it works

You run one setup command that interviews you for your **relevance context** — who the brief serves and what makes something worth your attention. That's the one input that matters; everything else has a working default. Setup writes the config into your project and runs a first brief immediately, so you see real output right away.

From there each brief follows the same path: scan the world broadly, filter against your relevance context, weigh each survivor against the evidence bar, and render the survivors into a page — reporting only what's new since the last run. You run it on demand or on a schedule; both do the same thing.

One project equals one brief. A personal scan and a brief you forward to your team are two separate projects, each with its own relevance context.

## Getting started

After installing the plugin (see the [marketplace README](../README.md)), open the project where you want the brief and run:

```
/intel-setup
```

Answer the questions — the one that matters is your relevance context. Setup runs one test brief so you see output immediately. To run a brief any time after that:

```
/brief
```

To run it daily in Cowork, use `/schedule`, set the prompt to `Run the environmental briefing skill for this project` (or `/brief`), and pick a time.

## The brief itself

Briefs render as a self-contained HTML file by default (`briefs/YYYY-MM-DD.html`). Two settings in `CLAUDE.md` under **Output** control presentation:

- **Format** — `html` (default), or `markdown` for a plain-text brief.
- **Theme** *(html only)* — `default` is brand-neutral with system fonts. Point it at a CSS override in your project (e.g. `./brief-theme.css`) to apply your own brand; the markup stays identical, only the look changes.

## Tuning

The brief gets sharper after a few runs. Everything below is adjusted in your project's `CLAUDE.md`:

- **Brief feels thin or noisy?** Sharpen your relevance context and the in/out examples — the "out" near-misses do the most work.
- **Weak items reaching conclusions?** Tighten the evidence bar toward `decision`, `shareable`, or `strict`.
- **Want it to push back?** Fill in the held-beliefs section to turn on the disconfirming slot, where the brief looks for evidence against what you believe.

## Permissions

The brief needs **web search** to scan the world, and the ability to write its files into your project. It asks for these cleanly rather than failing halfway:

- **Cowork:** nothing to configure — web search is available by default. Setup may ask once to approve file creation; if your client offers "allow for this project," choose it and you won't be prompted again.
- **Claude Code:** setup writes a `.claude/settings.json` into your project that pre-allows *only* the brief's own tools (web search/fetch and file read/write), so later runs don't prompt. You may be asked to trust the folder once. Edit or delete that file anytime.

`/intel-setup` checks for web search up front and tells you exactly what to approve before running, so you never get a half-finished brief.

## Commands

| Command | What it does |
|---------|--------------|
| `/intel-setup` | Sets up a project as a briefing deployment — interviews you for your relevance context, writes the config, runs a first test brief. |
| `/brief` | Runs the brief on demand. The same thing a scheduled run does. |

## License

MIT — see [LICENSE](../LICENSE).
