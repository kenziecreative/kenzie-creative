# Intelligence Briefing

**A daily brief from a persistent intelligence system — it remembers what it saw, owns what it predicted, and tells you exactly how much it looked at, by [Kenzie Creative](https://www.kenzienotes.com).**

Intelligence Briefing watches the world outside your work — news, industry movement, research, policy, science — against a relevance context you set once, in your own words. **It reads broadly over its rotation and reports narrowly every day: every brief tells you exactly what it covered and what it did not.** Coverage is earned across the week, cell by cell, not claimed in a morning.

What lands each day isn't a digest of articles. It's what *moved*: a tripwire you were told to watch for actually firing, a force in your world strengthening from Medium to High and why, a story taking its fourth step in six weeks. On a quiet day it says so in one line — and tells you it actually looked, which is the only thing that makes a quiet day worth trusting.

## What you get

**Movements, not articles.** The system keeps forces ("drivers") under continuous assessment. An item doesn't arrive as one more headline — it arrives situated: which story it advances, which force it moves and in which direction, whether it cuts for or against what you currently believe, and what that now implies for what you'd build.

**Tripwires it comes back and checks.** When something is worth watching for, the brief writes it down with a due date — and then actually goes and checks. A watched event that fires reaches you even if you read nothing in between. One that fails to happen is reported too, because a prediction that didn't come true is evidence.

**Proof it looked.** Every brief opens with a collection-health line: how many due cells completed, where the rotation stands this week. A quiet world and a failed scan no longer look the same — a partial scan says **assessment degraded**, names what it missed, and refuses to move any assessment on an incomplete look.

**A picture you can argue with.** Just talk to it: *"you missed the Intuit thing"* — it records the miss, marks that cell's sources suspect, captures the item, and tells you what changed. *"What do we actually know about the regulatory force?"* — it answers from months of dated evidence, and tells you what would prove it wrong. This is how the brief gets sharper; nobody fills out a form.

**A monthly reckoning.** Once a month, a section of the brief looks at the picture itself: what moved, what held, and what you were wrong about — named plainly. It's the one output that makes you sharper rather than more dependent.

**A page that stands on its own.** Briefs render as a self-contained HTML file — clean cards on white, scannable, openable anywhere with no dependencies, easy to forward.

**A head start on strategic foresight.** `/intel-export` hands your accumulated drivers — direction, certainty, months of dated evidence, full confidence history — to a Strategic Foresight cycle in its own driver format. You arrive with the scanning phase already done.

## How it works

You run one setup command that interviews you for your **relevance context** — who the brief serves and what makes something worth your attention, in your own words. Setup plays back the three to five *forces* it heard you describe, you correct them, and those become the system's starting drivers. It also derives your territory as a handful of domain cells and crosses them with five fixed scanning lenses into a coverage matrix — the rotation that earns the breadth claim.

From there, each `/brief` runs two movements in one command: a **scan** that collects (the cells due today, a directed check on every due tripwire, and a mandatory search for evidence *against* each of your active drivers), then a **brief** that reports what moved since you last looked. The scan's output is state — observations with verbatim evidence captured at gather time, threads, signposts, driver reassessments. The brief's output is the page. Verification re-derives every written figure and qualifier from the captured evidence before anything is emitted.

One project equals one brief. A personal scan and a brief you forward to your team are two separate projects, each with its own relevance context.

## Getting started

After installing the plugin (see the [marketplace README](../README.md)), open the project where you want the brief and run:

```
/intel-setup
```

Answer the questions — the one that matters is your relevance context. Setup runs one test brief so you see real output, collection-health line included, before scheduling anything. To run a brief any time after that:

```
/brief
```

To run it daily in Cowork, use `/schedule`, set the prompt to `Run /brief for this project`, and pick a time. A run skipped because your machine was asleep catches up automatically — the scan knows where the last run ended.

And any time something's off or you're curious, just say so in the project: *"you missed X"*, *"that pricing item was noise"*, *"what's happening with the fragmentation driver?"*

## The brief itself

Briefs render as a self-contained HTML file by default (`briefs/YYYY-MM-DD.html`; a second run the same day writes `-02` rather than overwriting). Two settings in `CLAUDE.md` under **Output** control presentation:

- **Format** — `html` (default), or `markdown` for a plain-text brief.
- **Theme** *(html only)* — `default` is brand-neutral with system fonts. Point it at a CSS override in your project (e.g. `./brief-theme.css`) to apply your own brand; the markup stays identical, only the look changes.

## Tuning

- **Brief feels thin or noisy?** Sharpen your relevance context and the zone in/out examples in `CLAUDE.md` — the "out" near-misses do the most work. Or just tell it: noise you flag in conversation is recorded, and it will offer to sharpen the context itself.
- **It missed something?** Say so. A recorded miss marks that cell's sources suspect, which forces the next scan to widen its channels there.
- **Weak items reaching conclusions?** Tighten the evidence bar toward `decision`, `shareable`, or `strict`.
- **Want it to test what you believe?** Tell it what you believe. A stated belief becomes a tracked driver, and every rotation includes a search for evidence against it.

## Permissions

The system needs **web search** to scan, and the ability to write its files into your project. It asks for these cleanly rather than failing halfway:

- **Cowork:** nothing to configure — web search is available by default. Setup may ask once to approve file creation; if your client offers "allow for this project," choose it and you won't be prompted again.
- **Claude Code:** setup writes a `.claude/settings.json` into your project that pre-allows *only* the system's own tools (web search/fetch and file read/write), so later runs don't prompt. You may be asked to trust the folder once. Edit or delete that file anytime.

`/intel-setup` checks for web search up front and tells you exactly what to approve before running, so you never get a half-finished brief.

## Commands

| Command | What it does |
|---------|--------------|
| `/intel-setup` | Sets up a project as a briefing deployment — interviews you for your relevance context, plays back the forces it heard, builds the coverage rotation, runs a first test brief. |
| `/brief` | Runs the scan and then the brief, on demand. The same thing a scheduled run does. |
| `/intel-export` | Exports your accumulated drivers to the Strategic Foresight driver format. |

## License

MIT — see [LICENSE](../LICENSE).
