# Intelligence Briefing — Marketplace

This repository is a **Claude plugin marketplace**. It hosts the `intelligence-briefing` plugin and is the thing that makes that plugin a managed, versioned product: people install from this repo, and they pull your updates from it. The plugin is not distributed as a one-off file — it lives here, under version control, and propagates through git.

> This repo is `kenziecreative/intelligence-brief`. The install commands below match it exactly.

## What's in here

```
intelligence-brief/                     ← this repo = the marketplace
├── .claude-plugin/
│   └── marketplace.json                ← the catalog: lists the plugin(s) and where to find them
└── intelligence-briefing/              ← the plugin itself (a self-contained directory)
    ├── .claude-plugin/plugin.json      ← plugin manifest (name, version — controls updates)
    ├── skills/environmental-briefing/  ← the external-world scan (fully built)
    ├── commands/                       ← /intel-setup, /brief
    ├── shared/                         ← the contract + conventions the rest of the suite builds on
    ├── templates/                      ← the per-deployment CLAUDE.md config
    ├── CONNECTORS.md
    └── README.md                       ← how the plugin works (start here for usage)
```

A marketplace can host more than one plugin. Today it lists one; as the suite grows you can either add skills inside `intelligence-briefing` or publish sibling plugins and add them to `marketplace.json`.

## Install (for users)

In Claude Code or Cowork:

```
/plugin marketplace add kenziecreative/intelligence-brief
/plugin install intelligence-briefing@intelligence-brief
```

The first command registers this repo as a marketplace; the second installs the plugin from it. After installing, run `/intel-setup` in a project to configure a brief. See the plugin's own [README](./intelligence-briefing/README.md) for usage.

## Getting updates (for users)

Because the install is bound to this repo rather than a copied file, updates flow through git:

```
/plugin marketplace update          # refresh the catalog from the repo
/plugin update intelligence-briefing
```

Users only receive a new version when the plugin's `version` is bumped (see below). That's deliberate — it means your in-progress commits don't reach installers until you decide to release.

## Releasing changes (for you, the maintainer)

This is the workflow that makes it a product:

1. Make your changes in `intelligence-briefing/` (edit a skill, add a command, etc.).
2. Bump `version` in `intelligence-briefing/.claude-plugin/plugin.json` following semver:
   - **patch** (0.1.0 → 0.1.1) — fixes, wording, no behavior change
   - **minor** (0.1.0 → 0.2.0) — new capability, backward compatible (e.g. adding meeting triage)
   - **major** (0.1.0 → 1.0.0) — a breaking change to how it's configured or to the candidate contract
3. Add an entry to [CHANGELOG.md](./CHANGELOG.md).
4. Commit, tag, and push:

   ```
   git add -A
   git commit -m "feat: add meeting triage producer"
   git tag v0.2.0
   git push && git push --tags
   ```

5. Installers pick it up on their next `/plugin marketplace update` + `/plugin update`.

The version in `plugin.json` is the single source of truth for update propagation. Tags are for your own history and GitHub releases; the plugin system keys off the manifest version.

## First push (this repo is new)

If you haven't pushed yet, from inside this folder:

```
git remote add origin https://github.com/kenziecreative/intelligence-brief.git
git branch -M main
git push -u origin main
git push --tags
```

(An initial commit and a `v0.1.0` tag are already in place — see `git log`.)

## Validate before you push

```
claude plugin validate ./intelligence-briefing/.claude-plugin/plugin.json
```

Run this after any change; it's the same check the community-marketplace review pipeline runs.

## License

MIT — see [LICENSE](./LICENSE).
