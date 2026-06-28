# AGENTS.md — thinkers

Maintainer/agent guidance for working **on** the Thinkers plugin. Standalone; self-contained.
(Current version lives in `plugin.json` and `CHANGELOG.md`.)

> A plugin's `templates/CLAUDE.md` is a different thing: it's the per-deployment config the
> plugin ships to *users*, not agent guidance. Don't conflate the two.

## What it is

A reasoning counselor: it names cognitive biases, fallacies, persuasion and manipulation
tactics, bad-faith moves, and strategic patterns at play in a situation, explains them,
drills them, and helps the user decide or stress-test their thinking. "Correct" output is a
*counselor's* answer — proportional, direct, no reassurance theater — that names the right
pattern without over-applying a high-stakes label, and that talks rather than lectures. The
academic register (lead with a bold pattern name, blockquote the definition, bullet the
analysis) is the characteristic failure mode, not the target.

## Structure

- `skills/` — the five user-facing skills (`identify`, `explain`, `practice`, `decide`,
  `spar`), one `SKILL.md` each. There are no `commands/` wrappers: the skills are invoked
  directly (`/thinkers:identify`) and auto-trigger from plain-language descriptions.
- `reference/` — the bundled read-only corpus:
  - `INDEX.md` — the single-table manifest (slug, type, title, severity, categories,
    contexts, summary, path) every skill reads first to find candidate patterns.
  - `TAXONOMY.md` — definitions of the seven pattern types and overlap rules.
  - `<type>/` — one dir per type, a `README.md` index plus one file per entry (243 entries).
  - `guides/` — the disambiguation layer (see Key mechanics).
  - `counsel.md` — the voice/posture contract every skill loads first.
- `templates/CLAUDE.md` — optional per-deployment config (save locations only; nothing
  required).

Authoring docs that do **not** ship (kept at repo-root `dev/thinkers/`): `EDITORIAL-STANDARD.md`,
`COMPLETENESS-PLAN.md`, and the migration record.

## Key mechanics

- **The corpus is read by plugin-root path.** Every skill reads
  `${CLAUDE_PLUGIN_ROOT}/reference/INDEX.md` and `${CLAUDE_PLUGIN_ROOT}/reference/guides/*`.
  This is load-bearing: a plugin runs in the *host* project's working directory, so a
  project-relative `reference/...` path resolves against the user's project and reads nothing,
  failing **silently**. Never reintroduce a bare `reference/...` read in a skill.
- **Voice lives in `reference/counsel.md`, not in a host `CLAUDE.md`.** The counselor register,
  anti-sycophancy, permission-gated recommendations, present-then-probe, the back-off rule, and
  self-recognition tone are all in `counsel.md`; every skill loads it at step 0. Edit the voice
  in one place. Do not re-scatter voice rules into individual skills, and do not assume the host
  project's `CLAUDE.md` carries any of it.
- **The guides layer is a routing aid, not pattern entries.** `guides/high-risk-mislabels.md`
  and `guides/debate-and-information-overload.md` hold the this-not-that distinctions that live
  *between* corpus entries. `identify` must run the relevant guide distinction *before* applying
  a high-stakes label (gaslighting, control-vs-boundary, manipulation-vs-persuasion,
  appeal-to-emotion, the overload trio); `explain`/`decide`/`spar`/`practice` draw on the
  contrast pairs where they sharpen the response. **`guides/user-journey-guide.md` is
  deliberately NOT wired into any skill** — it describes the skills, so routing a skill to it is
  circular. It is reachable from `INDEX.md`/`README.md` only. Keep it that way.
- **`inside_view: false` fallback.** Most `manipulation_tactic` entries carry inside-view
  sections (When You're Doing It / Why It Works for You / The Honest Version) that the
  self-recognition path leads with. Some — notably `gaslighting` — are `inside_view: false` and
  have none. `identify`'s self-recognition protocol checks the frontmatter and, when it's false,
  degrades to the guide's this-not-that distinction plus the entry's "What It Is Not", instead of
  leading with sections that don't exist. This is the systemic fix for the whole class, not a
  gaslighting-specific patch.

## Surface differences (Claude Code vs Cowork)

Nothing surface-specific. No hooks, no settings pre-allow, no subagents. The skills use
Read/Glob/Grep over the bundled corpus and Write only for the optional saved records
(`decisions/`, `sparring/`) in the user's working directory.

## Maintaining this plugin

- **Release:** follow **Release & versioning** in the root `AGENTS.md`. Bump `version` in
  `plugin.json`, update the `v<X.Y.Z> — ` prefix in both descriptions (`plugin.json` + the
  catalog entry in `.claude-plugin/marketplace.json`), the README "Plugins at a glance" row,
  and the root `AGENTS.md` plugin list; add a `CHANGELOG.md` entry; then
  `node dev/scripts/check-version-prefix.mjs` and `claude plugin validate ./thinkers` +
  `claude plugin validate .`; commit, tag **`thinkers-v<X.Y.Z>`**, push.
- **Eval:** `/eval-run --target thinkers` after changing any skill or the corpus voice. The
  pack (`eval/targets/thinkers/`) scores **Voice/Posture as a dimension separate from
  Disambiguation** — a response can be correct and still fail on register. A red golden is a
  ship-blocker.
- **Authoring check (optional):** run plugin-dev's `skill-reviewer` over changed skills and
  `plugin-validator` over the plugin.
- **Editing cautions specific to this plugin:**
  - Never reintroduce a project-relative `reference/...` read in a skill (silent failure — see
    Key mechanics). All corpus reads are `${CLAUDE_PLUGIN_ROOT}/reference/...`.
  - Keep voice rules in `reference/counsel.md` only; don't inline them per skill.
  - Keep `user-journey-guide.md` unwired from runtime.
  - When adding a `manipulation_tactic` entry, set `inside_view` honestly; the self-recognition
    path branches on it.
  - The output-style guidance is intentionally tuned *away* from the bold-label/blockquote lead
    toward an advisorly register. Don't restore the academic scaffolding "to look thorough."
