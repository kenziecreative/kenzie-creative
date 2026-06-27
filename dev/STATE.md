# Work state — kenzie-creative-marketplace

**Last updated:** 2026-06-27 · **Session focus:** landed strategist v0.2.0 on `main`; now working directly on `main`. Core 4 plugins committed and clean, ready for ongoing changes. Recorded the plugin-eval → internal-utility direction (not yet executed).

## Where things stand

- **Branch:** working on `main` (at `6a968e0`, in sync with `origin/main`). The `strategist-v0.2.0-posture` branch is merged (fast-forward) and can be deleted.
- **intelligence-briefing 0.3.0** — unchanged.
- **researcher 1.4.1** — unchanged.
- **sage 0.2.0** — unchanged. Build docs in `dev/sage/`; the `.planning/` originals are duplicates still pending deletion.
- **strategist 0.2.0** — SHIPPED to `main` (commit `6a968e0`, tag `strategist-v0.2.0`). v0.2.0 rewrote the stage-engine posture as enumerable behavioral rules (friction half + lane half), replaced the Pushback Audit with a two-part Self-Audit, moved to one isolated question per turn, split output into a working `brief.md` + a clean reader-facing `strategy-brief.md`, and added two critic checks (fabricated/unowned premise, agent-introduced keystone). Driven by the first real-world run (Hello Alice Partner-Powered Agents). Docs: `strategist/AGENTS.md`, `strategist/CHANGELOG.md`.
- **plugin-eval 0.1.0** — currently still registered as a plugin in the catalog, but **slated to stop being a published plugin** (see Direction below).
- **Maintenance conventions (live):** `v<X.Y.Z> — ` prefix on both descriptions for every plugin, asserted green by `dev/scripts/check-version-prefix.mjs`; `/checkpoint` skill writes this file; `dev/<plugin>/` holds non-shipped build docs; AGENTS release loop includes validate + the checker + the prefix step.

## Direction (understood, not yet executed)

- **plugin-eval becomes an internal marketplace utility, not a published plugin.** It is really tooling the marketplace uses to validate the output of the plugins we ship. The intended end state is an `eval/` (or `qa/`) directory at the repo root that we point at any plugin and re-run over time as we make changes — a standing evaluation harness, not a catalog entry. Transition work (de-register from `marketplace.json`, restructure the directory, retire the plugin scaffolding) is **deferred** — captured here so it isn't treated as a first-class plugin going forward.

## Done this session

- Validated strategist + the marketplace manifest; ran the version-prefix checker (all green, 5/5).
- Fast-forwarded `main` to `6a968e0` (strategist v0.2.0).
- Rewrote this STATE; committed on `main`, tagged `strategist-v0.2.0`, pushed `main` + tag.

## In flight / uncommitted

None. Working tree clean, on `main`.

## Next steps (in order)

1. **Continue plugin work on `main`** — that's the working branch now.
2. **plugin-eval → internal eval/QA utility** (Direction above) when ready: de-register from the catalog, restructure to a root `eval/`/`qa/` dir, retire the plugin scaffolding.
3. **Delete the duplicated `.planning/` sage docs** now that `dev/sage/` holds them.
4. **Resolve the version-card question** (Open questions) — keep or strip the `v-prefix` workaround.
5. **Housekeeping:** delete the merged `strategist-v0.2.0-posture` branch (local + remote).

## Open questions / decisions pending

- **Does the Kenzie marketplace card surface the `version` field?** If it does, the `v<X.Y.Z> — ` description prefix is unnecessary — strip the prefixes and retire `check-version-prefix.mjs`. (Adopted from Hello Alice, whose card does NOT show version.)
- **Status-column convention** considered and not adopted (user choice). Revisit if the catalog grows.

## How to resume

1. Read `AGENTS.md` (orientation), then this file.
2. We are on `main` and clean. Pick up from Next steps. No build state is mid-flight.
