# Kenzie Creative — Plugin Marketplace

A **Claude plugin marketplace**: a catalog of small, focused plugins for staying on top of your world. Install only the ones you need; they compose through a shared directory convention without depending on one another.

> Marketplace name: `kenzie-creative`. Repo: `kenziecreative/kenzie-creative`. The install steps below match exactly.

## What's in here

```
kenzie-creative/                          ← this repo = the marketplace
├── .claude-plugin/
│   └── marketplace.json                  ← the catalog of plugins
├── contract/                             ← the directory convention plugins share (author docs)
└── intelligence-briefing/                ← plugin: the external scan
    ├── skills/environmental-briefing/    ← the environmental brief
    ├── commands/                         ← /intel-setup, /brief
    ├── assets/, templates/               ← brief stylesheet + per-deployment config
    └── README.md                         ← how the plugin works (usage)
```

### Plugins

| Plugin | What it does |
|--------|--------------|
| **intelligence-briefing** | The external scan — a daily/weekly environmental brief that triages the outside world into the few items worth your attention. Self-contained; writes a styled HTML brief. |

More are planned (meeting triage, comms triage, review), each a separate small plugin you install independently. They share the directory convention in [`/contract`](./contract/README.md), so they coordinate through files in your project rather than depending on each other.

## Install

### Claude Cowork (desktop app)

1. Open the **Customize** menu (left sidebar) → **Plugins** tab.
2. Under **Personal plugins**, click **"+"** → **Add marketplace**.
3. Enter this repository: `kenziecreative/kenzie-creative`.
4. Install the plugin(s) you want.

### Claude Code (CLI)

```
/plugin marketplace add kenziecreative/kenzie-creative
/plugin install intelligence-briefing@kenzie-creative
```

After installing intelligence-briefing, run **`/intel-setup`** in a project to configure your brief. See the [plugin README](./intelligence-briefing/README.md) for usage.

## Getting updates

Updates arrive as deliberate releases — you only get a new version when one is published.

**Claude Cowork:** Customize → Plugins → refresh the `kenzie-creative` marketplace, then update the plugin.

**Claude Code:**

```
/plugin marketplace update kenzie-creative
/plugin update intelligence-briefing
/reload-plugins
```

Confirm with `/plugin list`. If a version doesn't change, your local catalog is cached — force a clean pull:

```
/plugin uninstall intelligence-briefing@kenzie-creative
/plugin marketplace update kenzie-creative
/plugin install intelligence-briefing@kenzie-creative
/reload-plugins
```

> Naming: the **marketplace** is `kenzie-creative`; a **plugin** is e.g. `intelligence-briefing`. The qualified name is `intelligence-briefing@kenzie-creative`.

## License

MIT — see [LICENSE](./LICENSE).
