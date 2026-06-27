# Work state — kenzie-creative-marketplace

**Last updated:** 2026-06-27 · **Session focus:** made the marketplace self-maintaining for plugin work — hardened the version checker, added a per-plugin "Maintaining this plugin" loop, adopted plugin-dev authoring conventions across all five plugins, and shipped a `/new-plugin` scaffold. Working on `main`.

## Where things stand

- **On `main`**, clean. Two new commits this session (`f6b41f7` machinery, `d278a5a` per-plugin conformance) on top of the strategist-v0.2.0 landing.
- **All five plugins validate** (`claude plugin validate ./<plugin>` + `.`) and the version checker is green across all four mirrors. No version bumps this session — purely authoring/convention changes.
- **intelligence-briefing 0.3.0 / researcher 1.4.1 / sage 0.2.0 / strategist 0.2.0 / plugin-eval 0.1.0** — versions unchanged; each now carries full `plugin.json` metadata, a `## Maintaining this plugin` AGENTS section, trigger-phrase skill descriptions, and (where they have agents) `color` + example-block agent descriptions.

## What shipped this session

- **Version checker hardened** (`dev/scripts/check-version-prefix.mjs`): now also asserts the root README "Plugins at a glance" table and the root AGENTS "Plugins (current versions)" list match each `plugin.json` version, and **fails if a plugin is missing from either index**. Auto-discovers plugins by `.claude-plugin/plugin.json`. Root AGENTS "Release & versioning" updated to match (four mirrors, checker = backstop).
- **`## Maintaining this plugin`** section added to all five plugin AGENTS.md (release ritual + plugin-specific edit cautions + tag name). Dropped the redundant "Current version" header clause (version lives in `plugin.json` + CHANGELOG). Retired the stale "Left for the terminal pass" sections in strategist + plugin-eval.
- **plugin-dev conventions adopted** (full conformance): `homepage`/`repository`/`license`/`author.url` in every `plugin.json`; agent `color` + "Use this agent when… + <example>" descriptions; skill descriptions → third-person trigger-phrase format; `argument-hint` on the 4 researcher commands that take args. Spot-checked with plugin-dev `skill-reviewer`; tightened over-broad triggers (strategist progress/pressure-test, researcher start-phase — the last collided with GSD's "phase" vocabulary).
- **`/new-plugin` scaffold skill** (`.claude/skills/new-plugin/` + `references/` templates): generates a fully-conformant plugin tree and registers it in all three root indexes, then validates. Documented in root AGENTS "Adding a new plugin". Proven end to end via a throwaway-plugin dry-run (validated green, then torn down).
- **intelligence-briefing CHANGELOG.md** created (was the only plugin missing one).

## Two QA layers (kept distinct — important for next work)

- **Authoring/static QA** = plugin-dev `plugin-validator` + `skill-reviewer` + `check-version-prefix.mjs` + `claude plugin validate`. "Is the plugin well-formed and well-authored?" Now wired into the release loop + each Maintaining section.
- **Runtime/output QA** = plugin-eval → the planned internal `eval/` utility. "When you run it, is the output good and does it communicate well?" NOT built yet; this session only wired the authoring gate. See [[plugin-eval-becomes-internal-utility]].

## In flight / uncommitted

None. Working tree clean, on `main`. (STATE update pending commit + push of all session work.)

## Next steps (in order)

1. **plugin-eval → internal eval/QA utility** — the runtime-output evaluation direction (simulate a plugin, grade its output + how it talks to the user). De-register from the catalog, restructure to a root `eval/`/`qa/` dir, retire the plugin scaffolding. The checker drops it automatically once it loses its `plugin.json`.
2. **Optional:** run plugin-dev `plugin-validator` / `skill-reviewer` across the other four plugins (only strategist was spot-checked this session).
3. **Resolve the version-card question** (Open questions) — keep or strip the `v-prefix` workaround.

## Open questions / decisions pending

- **Does the Kenzie marketplace card surface the `version` field?** If yes, strip the `v<X.Y.Z> — ` prefixes and retire `check-version-prefix.mjs`. (Adopted from Hello Alice, whose card does NOT show version.)

## How to resume

1. Read `AGENTS.md` (orientation), then this file. To work on a specific plugin, read that plugin's `AGENTS.md` — its "Maintaining this plugin" section now carries the release ritual and edit cautions.
2. To add a plugin, run `/new-plugin`. We are on `main` and clean.
