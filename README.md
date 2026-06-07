# Kenzie Creative

**Small, focused tools for staying on top of your world, by [Kenzie Creative](https://www.kenzienotes.com).**

A **plugin marketplace for Claude** — works in both Claude Cowork (the desktop app) and Claude Code (the CLI). This repo is the catalog; each tool below is a plugin you can install into Claude and use in any project.

Each tool does one thing well and runs on its own. Instead of one program that tries to do everything, you install only the few that fit how you actually work — a brief that triages the outside world, a research system that turns Claude into a rigorous research partner, and (in time) tools that triage your meetings, your messages, and the decisions waiting on you. They stay out of each other's way: every tool works alone; some plugins coordinate through shared files in the project when they're run together; others run entirely on their own.

Once a tool is installed, it shows up as commands and skills you can run in any Claude project.

## The tools

### Intelligence Briefing

A daily or weekly **environmental brief**: it scans the outside world — news, industry movement, research, policy, science — and triages it down to the few items actually worth your attention, keyed to a relevance context you set once. It's built for triage, not coverage, so a quiet day produces a short brief and that's correct. The result is a clean, self-contained page you can read anywhere or forward to your team. You set it up in a project with one command, and it can run on a schedule.

→ **[Read the Intelligence Briefing guide](./intelligence-briefing/README.md)** for setup, scheduling, and tuning.

### Researcher

A **structured research system**: pick a topic, get a phased plan grounded in preliminary research, then work through it together — collecting sources, finding patterns, mapping gaps, synthesizing findings, and auditing every claim before it reaches output. Every claim traces back to a specific source. Not a summarizer; a research partner.

→ **[Read the Researcher guide](./researcher/README.md)** for setup, research types, and the integrity model.

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
```

Once a tool is installed, open the project where you want to use it and follow that tool's guide — for the brief, run `/intel-setup`; for research, run `/research:init`.

## Updates

New versions arrive only when one is published — nothing changes under you.

**Cowork:** Customize → Plugins → refresh the `kenzie-creative` marketplace, then update the tool.

**Claude Code:**

```
/plugin marketplace update kenzie-creative
/plugin update intelligence-briefing
/plugin update researcher
/reload-plugins
```

If a version won't change, your local catalog is cached — uninstall and reinstall the tool to force a clean pull.

## License

MIT — see [LICENSE](./LICENSE).
