# Changelog — thinkers

All notable changes to the Thinkers plugin. Per-plugin semver; tags are plugin-scoped
(`thinkers-vX.Y.Z`).

## 0.1.0 — 2026-06-27

Initial release — migrated from the standalone Thinkers Toolkit project into the marketplace.

- A 243-pattern reference corpus across seven types (cognitive biases, logical fallacies,
  rhetorical fallacies, persuasion tactics, bad-faith moves, manipulation tactics,
  strategies), plus a `reference/guides/` disambiguation layer.
- Five skills: `identify`, `explain`, `practice`, `decide`, `spar`.
- Voice and posture relocated from the source project's `CLAUDE.md` into a bundled
  `reference/counsel.md` that every skill loads, so the counselor register no longer depends
  on the host project's instructions.
- All corpus reads rewritten to `${CLAUDE_PLUGIN_ROOT}/reference/...` so the bundled corpus
  is read regardless of the host working directory.
- Self-recognition protocol gains an explicit `inside_view: false` fallback so a pattern
  without inside-view sections (e.g. gaslighting) degrades to the guide's this-not-that
  distinction instead of leading with sections that don't exist.
