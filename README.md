# Intelligence Briefing — Marketplace

This repository is a **Claude plugin marketplace**. It hosts the `intelligence-briefing` plugin: a daily/weekly intelligence routine that surfaces what you should care about — across the outside world and your own work. Because you install from this repo rather than a one-off file, you receive updates as they're released.

> This marketplace is `kenziecreative/intelligence-brief`. The install steps below match it exactly.

## What's in here

```
intelligence-brief/                     ← this repo = the marketplace
├── .claude-plugin/
│   └── marketplace.json                ← the catalog of plugins
└── intelligence-briefing/              ← the plugin
    ├── skills/environmental-briefing/  ← the external-world scan
    ├── commands/                       ← /intel-setup, /brief
    ├── shared/                         ← contracts the suite is built on
    ├── templates/                      ← the per-deployment config
    └── README.md                       ← how the plugin works (usage)
```

A marketplace can host more than one plugin. Today it lists one; the suite grows over time.

## Install

### Claude Cowork (desktop app)

1. Open the **Customize** menu (left sidebar) → **Plugins** tab.
2. Under **Personal plugins**, click **"+"** → **Add marketplace**.
3. Enter this repository: `kenziecreative/intelligence-brief`.
4. Install **intelligence-briefing** from the marketplace.

### Claude Code (CLI)

```
/plugin marketplace add kenziecreative/intelligence-brief
/plugin install intelligence-briefing@intelligence-brief
```

After installing, run **`/intel-setup`** in a project to configure your brief. See the [plugin README](./intelligence-briefing/README.md) for usage.

## Getting updates

Updates arrive as deliberate releases — you only get a new version when one is published, not on every change.

**Claude Cowork:** Customize → Plugins → refresh the `intelligence-brief` marketplace, then update **intelligence-briefing**.

**Claude Code:**

```
/plugin marketplace update intelligence-brief
/plugin update intelligence-briefing
/reload-plugins
```

Confirm it landed with `/plugin list` (or the `/plugin` → Installed tab). If the version doesn't change, your local catalog is cached — force a clean pull:

```
/plugin uninstall intelligence-briefing@intelligence-brief
/plugin marketplace update intelligence-brief
/plugin install intelligence-briefing@intelligence-brief
/reload-plugins
```

> Naming: the **plugin** is `intelligence-briefing`; the **marketplace** is `intelligence-brief`. The qualified name is `intelligence-briefing@intelligence-brief`.

## License

MIT — see [LICENSE](./LICENSE).
