# Kenzie Creative

**Small, focused tools for staying on top of your world, by [Kenzie Creative](https://www.kenzienotes.com).**

Each tool here does one thing well and runs on its own. Instead of one program that tries to do everything, you install only the few that fit how you actually work — a brief that triages the outside world, and (in time) tools that triage your meetings, your messages, and the decisions waiting on you. They stay out of each other's way: every tool works alone, and when you run several in the same project they coordinate through shared files in that project rather than depending on one another.

You install them through Claude — once a tool is added, it shows up as commands and skills you can run in any project.

## The tools

### Intelligence Briefing

A daily or weekly **environmental brief**: it scans the outside world — news, industry movement, research, policy, science — and triages it down to the few items actually worth your attention, keyed to a relevance context you set once. It's built for triage, not coverage, so a quiet day produces a short brief and that's correct. The result is a clean, self-contained page you can read anywhere or forward to your team. You set it up in a project with one command, and it can run on a schedule.

→ **[Read the Intelligence Briefing guide](./intelligence-briefing/README.md)** for setup, scheduling, and tuning.

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
```

Once a tool is installed, open the project where you want to use it and follow that tool's guide — for the brief, run `/intel-setup`.

## Updates

New versions arrive only when one is published — nothing changes under you.

**Cowork:** Customize → Plugins → refresh the `kenzie-creative` marketplace, then update the tool.

**Claude Code:**

```
/plugin marketplace update kenzie-creative
/plugin update intelligence-briefing
/reload-plugins
```

If a version won't change, your local catalog is cached — uninstall and reinstall the tool to force a clean pull.

## License

MIT — see [LICENSE](./LICENSE).
