---
name: new-plugin
description: This skill should be used when the user asks to create, scaffold, or add a new plugin to this marketplace (e.g. "new plugin", "scaffold a plugin", "add a plugin called X"). Generates a fully-conformant plugin tree (manifest, AGENTS.md with a Maintaining section, README, CHANGELOG, starter command + skill), registers it in all three root indexes, and validates.
disable-model-invocation: true
---

# /new-plugin — Scaffold a New Marketplace Plugin

Create a new plugin in this marketplace that conforms to every convention from the start:
full `plugin.json` metadata, the standard `AGENTS.md` skeleton with a `## Maintaining this
plugin` section, a CHANGELOG, trigger-phrase skill descriptions, and registration in all
three root indexes — then validate. The point is that a freshly scaffolded plugin passes
`node dev/scripts/check-version-prefix.mjs` and `claude plugin validate .` with no manual
cleanup.

Templates live in `references/` next to this file. Read them; copy them; substitute the
placeholders. Do not improvise structure when a template exists.

## Step 1 — Gather inputs

Ask the user for (or infer from their request, then confirm):

- **name** — kebab-case, lowercase, the plugin's directory and install name (e.g.
  `meeting-notes`). Reject anything that isn't `^[a-z][a-z0-9-]*$`.
- **title** — Title Case display name for the README table and headings (e.g.
  `Meeting Notes`).
- **shape** — `triage-stream` (small, recurring, composes via `/contract`) or `standalone`
  (heavier, project-shaped, self-contained). See root `AGENTS.md` → "Plugins". This decides
  whether to stub `agents/`, `hooks/`, `reference/`.
- **description** — one line, no `v0.1.0 —` prefix (the templates add it). This is the
  reader-facing catalog copy; match the marketplace voice (em-dashes fine).
- **keywords** — 3–6, as a JSON array of quoted strings.

## Step 2 — Pre-flight checks

- Confirm `<name>/` does not already exist at the repo root. If it does, stop — this is a
  new-plugin scaffold, not an editor.
- Resolve today's date as `YYYY-MM-DD` for the CHANGELOG (ask the user if you can't
  determine it; never guess a wrong date).

## Step 3 — Generate the plugin tree

Create these files by copying the matching template from `references/` and replacing every
`{{PLACEHOLDER}}`. Placeholders: `{{NAME}}`, `{{TITLE}}`, `{{DESCRIPTION}}`, `{{SHAPE}}`
(triage-stream|standalone), `{{SHAPE_CAP}}` (Triage-stream|Standalone), `{{KEYWORDS}}`
(the JSON array contents, e.g. `"a", "b", "c"`), `{{DATE}}`.

**Every plugin (both shapes):**
- `<name>/.claude-plugin/plugin.json` ← `references/plugin.json.template`
- `<name>/AGENTS.md` ← `references/AGENTS.md.template`
- `<name>/README.md` ← `references/README.md.template`
- `<name>/CHANGELOG.md` ← `references/CHANGELOG.md.template`
- `<name>/templates/CLAUDE.md` ← `references/deployment-CLAUDE.md.template`
- `<name>/commands/<name>.md` ← `references/command.md.template` (a starter command wrapper)
- `<name>/skills/<name>/SKILL.md` ← `references/skill.SKILL.md.template` (a starter skill)

**Standalone only — also stub (delete what the plugin won't use):**
- `<name>/agents/<name>-agent.md` ← `references/agent.md.template`
- `<name>/hooks/hooks.json` — only if the plugin needs a hook; otherwise omit the dir.
- `<name>/reference/` — only if the plugin ships a read-only library; otherwise omit.

Write all files with the Write tool. In Cowork, writes under `.claude/` are blocked — but a
new plugin lives at the repo root, not under `.claude/`, so Write is fine here.

## Step 4 — Register in the three root indexes

A new plugin is invisible until it's listed in all three. Use the exact formats in
`references/registration.md`. Add, in alphabetical-ish order matching the existing entries:

1. `.claude-plugin/marketplace.json` — a new object in `plugins[]` with `name`, `source`
   (`./<name>`), and `description` (must start with `v0.1.0 — `, mirroring `plugin.json`).
2. `README.md` "Plugins at a glance" table — a row: `| {{TITLE}} | 0.1.0 | <short> |
   [guide](./<name>/README.md) |`.
3. `AGENTS.md` "Plugins (current versions)" list — a bullet: `- **<name>** (0.1.0) —
   <short>. *{{SHAPE_CAP}}.*`.

The version checker keys off the README guide-link and the AGENTS bold-name, and fails if a
plugin is missing from either — so all three must be present and consistent.

## Step 5 — Validate

Run from the repo root and report results:

- `node dev/scripts/check-version-prefix.mjs` — must be green (proves all four version
  mirrors agree and the plugin is registered everywhere).
- `claude plugin validate ./<name>` and `claude plugin validate .` — must pass.
- Optional authoring review: dispatch plugin-dev's `skill-reviewer` over the new skill and
  `plugin-validator` over the plugin to catch description/frontmatter issues early.

If validation fails on a frontmatter parse error, check for a colon-space (`: `) inside a
plain-scalar `description:` — that silently breaks YAML; use ` — ` or `,` instead.

## Step 6 — Hand back

Summarize what was created and registered. **Do not commit or tag** — leave that to the
user's review and the normal release loop (root `AGENTS.md` → Release & versioning). Remind
them the first real version is `0.1.0` and its tag will be `<name>-v0.1.0`.
