# Work state — kenzie-creative-marketplace

**Last updated:** 2026-07-01 · **Session focus:** reviewed and released **photo-generator v1.1.0** — the plugin was built by an agent outside this project and committed to `main` unpushed; this session audited it (structure, script, key handling, docs), fixed what the audit found (missing root-index registrations, a stale command name), tagged, and pushed. `main` is fully pushed and green.

## Where things stand

- **Plugins (all released and pushed):** goal-setting 0.1.0 · intelligence-briefing 0.3.0 · **photo-generator 1.1.0 (NEW)** · researcher 1.4.1 · sage 0.2.0 · strategist 0.3.0 · thinkers 0.1.0. Checker (`dev/scripts/check-version-prefix.mjs`) green across all 7 × 4 mirrors; marketplace + all plugins validate.
- **Branch `goal-setting-eval-target`** (pushed, no PR open yet): one commit, `51f3676` — the goal-setting eval target pack (`eval/targets/goal-setting/`, 6 files). Built in a prior session; **the pack has not been run yet** and the branch awaits a PR into `main`.
- **Eval packs exist for:** strategist, thinkers, goal-setting (unrun, on its branch). Missing: researcher, sage, intelligence-briefing, photo-generator.

## Done this session

- **photo-generator v1.1.0 released.** Plugin commit `09a56ae` (was already on `main`, unpushed) + fix commit `aea7bc1`, tag `photo-generator-v1.1.0`, all pushed to origin.
- **Audit verdict:** structurally sound — thin commands → skills, `${CLAUDE_PLUGIN_ROOT}` reference library, correct catalog entry/URLs, script compiles, key handling honors the beacon pattern (key never in chat or config.json, `--check-keys` prints source only, project mode writes a keys.env `.gitignore`).
- **What the audit caught, fixed in `aea7bc1`:** photo-generator missing from ALL root-README registration points (glance table, tool card, install list, setup sentence, update list) and from both AGENTS.md lists; `reference/brand-styles.md` still cited the old standalone repo's `/create-photo-prompt` (now `/generate-photo`). Also added `photo-generator` + `thinkers` to the AGENTS.md per-plugin registry (thinkers was pre-existing drift).
- **Committed `dev/goal-setting/build-spec.md`** (was untracked) to `dev/goal-setting/` per the dev-docs convention.

## In flight / uncommitted

None. Working tree clean on both branches.

## Next steps (in order)

1. **goal-setting eval — run and land.** On `goal-setting-eval-target`: `/eval-run --target goal-setting --scope golden` (reload session first so `eval-runner`/`eval-judge` register), fix anything red, then open a PR into `main` (prior packs merged via PR). Pack docs: `eval/targets/goal-setting/coverage.md`.
2. **thinkers eval — finish coverage.** Only the 2 calibration goldens ever ran (both 3·3·3). Remaining: 3 adversarial goldens (`adv-over-label`, `adv-invented-pattern`, `adv-sycophancy-bait`) + 5 representatives. `eval/targets/thinkers/coverage.md`.
3. **photo-generator follow-ups (all optional):** Cowork-side review of the adopter-facing register per the build model (this session reviewed from the Code side only); an eval target pack (none exists); two accepted script nits — the 14-reference cap is documented but not enforced in `scripts/generate_image.py`, and the legacy cwd-`.env` loader imports every variable in the file (process-local, doesn't override real env).
4. **Strategist v0.3.0 backlog:** critic restraint guard (`adv-sound-strategy` Critic Acuity 3·3·0 — tighten the over-flagging guard in `strategist/agents/strategist-critic.md`); run `rep-story-pyramid`; representative scenarios for `frame`/`insight`/`move`; three open design/IP calls (see git history of this file, checkpoint `4aa6823`, for detail).
5. **Eval packs for researcher, sage, intelligence-briefing** — `eval/reference/target-pack-spec.md`.
6. **Version-card question (open):** if the marketplace card ever surfaces `version` natively, strip the `v<X.Y.Z> — ` description prefixes and retire `check-version-prefix.mjs`.

## Open questions / decisions pending

- **goal-setting eval branch:** run-then-PR is the assumed path (step 1) — confirm with Kelsey if the pack was meant to land unrun.
- **`dev/goal-setting/build-spec.md` references companions that aren't in the repo** (`playbook.md`, `anchor-areas.md`, `three-tyrants.md` — named as living in `dev/goal-setting/`). They exist only on the Cowork side, if anywhere. Kelsey to decide whether to bring them over.
- **Root `CHANGELOG.md` is actually intelligence-briefing's changelog** (pre-rename artifact; intelligence-briefing has no changelog in its own directory). Harmless but confusing — rehome it or leave it, Kelsey's call.

## Session knowledge worth keeping

- **Reviewing an unpushed commit made by another agent:** the work may be on a different branch than you're sitting on — check `git log --all -- <path>`. Use a scratch `git worktree add <scratchpad>/x main` to validate/review without disturbing the working branch; `claude plugin validate` works fine inside a worktree.
- **`check-version-prefix.mjs` is the fastest audit entry point** for a new plugin — it immediately pinpointed the two missing index registrations.
- **Branch-switch debris:** an agent committing on `main` while the tree sits on another branch leaves orphan dirs holding `.DS_Store` files after checkout (gitignored, so invisible in `git status` but present on disk — this session's `photo-generator/` shell). `rm` the `.DS_Store`s and the dirs vanish on next checkout.
- **Ports carry stale command names in reference files** — the plugin's own docs were clean but `reference/brand-styles.md` still had the old repo's slash command. Grep the whole plugin for the old command name when reviewing a port.

## How to resume

1. Read `AGENTS.md` (orientation), then this file. Eval harness: `eval/README.md` + `eval/AGENTS.md`. Per-plugin: each plugin's `AGENTS.md` → "Maintaining this plugin".
2. `main` is clean and pushed. For step 1, work on `goal-setting-eval-target`; reload the session before `/eval-run` so the eval agents register.
