# Kenzie Creative

**Small, focused tools for staying on top of your world, by [Kenzie Creative](https://www.kenzienotes.com).**

A **plugin marketplace for Claude** — works in both Claude Cowork (the desktop app) and Claude Code (the CLI). This repo is the catalog; each tool below is a plugin you can install into Claude and use in any project.

Each tool does one thing well and runs on its own. Instead of one program that tries to do everything, you install only the few that fit how you actually work — a brief that triages the outside world, a research system that turns Claude into a rigorous research partner, a meeting round-up that keeps a fast-moving week legible, and (in time) tools that triage your messages and the decisions waiting on you. They stay out of each other's way: every tool works alone; some plugins coordinate through shared files in the project when they're run together; others run entirely on their own.

Once a tool is installed, it shows up as commands and skills you can run in any Claude project.

## Plugins at a glance

| Plugin | Version | What it does | Guide |
|---|---|---|---|
| Intelligence Briefing | 0.3.0 | Daily/weekly environmental brief that triages the outside world into a short, self-contained page | [guide](./intelligence-briefing/README.md) |
| Researcher | 1.4.1 | Structured, audited research system — every claim traces back to a source | [guide](./researcher/README.md) |
| Sage | 0.2.0 | Weekly meeting round-up built from transcripts — action items, cross-meeting threads, forward watch list | [guide](./sage/README.md) |

Each version mirrors that plugin's `plugin.json`, which is the source of truth for updates.

## The tools

### Intelligence Briefing

A daily or weekly **environmental brief**: it scans the outside world — news, industry movement, research, policy, science — and triages it down to the few items actually worth your attention, keyed to a relevance context you set once. It's built for triage, not coverage, so a quiet day produces a short brief and that's correct. The result is a clean, self-contained page you can read anywhere or forward to your team. You set it up in a project with one command, and it can run on a schedule.

→ **[Read the Intelligence Briefing guide](./intelligence-briefing/README.md)** for setup, scheduling, and tuning.

### Researcher

A **structured research system**: pick a topic, get a phased plan grounded in preliminary research, then work through it together — collecting sources, finding patterns, mapping gaps, synthesizing findings, and auditing every claim before it reaches output. Every claim traces back to a specific source. Not a summarizer; a research partner.

→ **[Read the Researcher guide](./researcher/README.md)** for setup, research types, and the integrity model.

### Sage

A **weekly meeting round-up** that keeps a fast-moving week legible at a glance. Each meeting becomes a structured summary; every summary folds into one living round-up that tracks action items, cross-meeting threads, and a forward watch list. Pulls transcripts from Read.ai, Fireflies, or Granola via MCP; works on manually dropped transcripts for anything else. Built for the week where five conversations all touched the same decision and you need to know where it actually landed.

→ **[Read the Sage guide](./sage/README.md)** for setup, supported services, and the round-up structure.

## Install

### Claude Cowork (desktop app)

1. Open the **Customize** menu (left sidebar) → **Plugins** tab.
2. Under **Personal plugins**, click **"+"** → **Add marketplace**.
3. Enter the repository: `kenziecreative/kenzie-creative`.
4. Install the tool you want.

### Claude Code (CLI)

```
/plugin marketplace add kenziecreative/kenzie-creative
/plugin install intelligence-briefing@kenzie-creative
/plugin install researcher@kenzie-creative
/plugin install sage@kenzie-creative
```

Once a tool is installed, open the project where you want to use it and follow that tool's guide — for the brief, run `/intel-setup`; for research, run `/research:init`; for the meeting round-up, run `/sage:setup`.

## Updates

New versions arrive only when one is published — nothing changes under you.

**Cowork:** Customize → Plugins → refresh the `kenzie-creative` marketplace, then update the tool.

**Claude Code:**

```
/plugin marketplace update kenzie-creative
/plugin update intelligence-briefing
/plugin update researcher
/plugin update sage
/reload-plugins
```

If a version won't change, your local catalog is cached — uninstall and reinstall the tool to force a clean pull.

## License

MIT — see [LICENSE](./LICENSE).
