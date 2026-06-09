# AGENTS.md — Kenzie Creative marketplace

Guidance for any agent (Claude Code, Cowork, or otherwise) working **on** this repository. This is the marketplace-level file; each plugin has its own `AGENTS.md` with plugin-specific detail.

> A plugin's `templates/CLAUDE.md` is a different thing: it's the per-deployment config file the plugin ships to *users*, not agent guidance. Don't conflate the two.

## What this is

A Claude plugin marketplace published from one GitHub repo (`kenziecreative/kenzie-creative`), hosting a family of small, focused plugins. Owner: Kelsey Ruger. License: MIT.

Install: `/plugin marketplace add kenziecreative/kenzie-creative`, then `/plugin install <plugin>@kenzie-creative`.

## Plugins (current versions)

- **intelligence-briefing** (0.3.0) — a daily/weekly environmental brief that triages the outside world into a self-contained HTML brief. *Triage-stream.*
- **researcher** (1.4.1) — a structured, audited research system. *Standalone.*
- **sage** (0.2.0) — meeting-transcript triage into a single living weekly round-up. *Standalone.*

Two author-side shapes (not surfaced to users as taxonomy): **triage-stream** plugins are small, recurring, and can compose through the `/contract` convention; **standalone systems** are heavier, project-shaped, and self-contained.

## How plugins compose (the `/contract` convention)

Shared state lives in the **deployment directory** (the project where a plugin runs), never inside a plugin — installed plugins are copied to a cache and can't read each other. The files: `ledger.json` (what's already been reported), `candidates.json` (review queue; rows tagged by a `source` field), `sources/` (drop-box inbox). Any plugin creates them if absent (with the Write tool, never shell), reads/prunes only its own `source` rows, and makes additive changes only. No plugin depends on another being installed. Canonical spec: `contract/README.md` (author documentation, not loaded at runtime).

## Build model

Every plugin must work on **both Claude Code and Cowork**. Surface-specific mechanics are owned by the tool that can actually see them:

- **Claude Code = executor.** Writes the code, resolves Claude-Code mechanics (hooks, `${CLAUDE_PLUGIN_ROOT}`, `.claude/settings.json` pre-allow, manifest entries), owns git.
- **Cowork = reviewer + spec owner.** Reviews build plans and diffs against intent, tests the Cowork surface, owns the adopter-facing register (READMEs, marketplace descriptions, setup copy).

Verification is split, not duplicated — each surface is tested by the only tool that can see it. A single code executor avoids split-brain edits.

## Working in Cowork (the real constraints)

- **File deletion is gated per folder.** Until you approve it (a delete prompt appears the first time), `rm` and git's own lock-cleanup fail with `Operation not permitted` on the FUSE mount — even on files you just created. Approve once and both `rm` and sandbox `git` work normally for that folder. This — not "git is broken in Cowork" — is why earlier sessions saw commits leave stale `.git/*.lock` files behind.
- **git tag/push is still safest from a real terminal** (network + credentials), but commits and tags work from the Cowork sandbox once deletion is enabled for the folder.
- **Setup commands use Read/Write/Edit/Glob, never shell** (`mkdir`/`ls`/`cat`) — shell triggers permission prompts. To create a folder, write a file into its path.

## Release & versioning

- `plugin.json` `version` is the **single source of truth** for update propagation (not the git tag).
- Per-plugin semver. Loop: edit → bump `version` → CHANGELOG entry → update the plugin's row in the root README "Plugins at a glance" table (a manual mirror of `plugin.json`) → commit → tag → push.
- **Tags are plugin-scoped:** `sage-v0.2.0`, `researcher-v1.4.1`, `intelligence-briefing-v0.3.0`. Legacy plain `vX.Y.Z` tags exist from early intelligence-briefing releases — don't reuse plain tags; they collide across plugins (there is already a plain `v0.2.0` and `v0.3.0`).
- Installers update via the Cowork Plugins tab, or Claude Code `/plugin marketplace update kenzie-creative` + `/plugin update <plugin>`.

## Cowork-safe HTML (for plugins that render HTML)

Learned the hard way: system fonts as the real basis (web fonts are progressive enhancement only); **no JavaScript**; **no content-hiding entrance animations** (a CSS `opacity:0` reveal renders blank if the viewer doesn't run animations); flat design — bordered cards on white, no drop shadows. Plugins stay brand-neutral; a deployment applies its own brand by pointing a `theme` at a local CSS override.

## Per-plugin detail

Each plugin's own `AGENTS.md` carries its structure, mechanics, locked decisions, and surface differences: `intelligence-briefing/AGENTS.md`, `researcher/AGENTS.md`, `sage/AGENTS.md`.
