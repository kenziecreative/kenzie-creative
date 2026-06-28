# Thinkers — migration record

Migrated the **Thinkers Toolkit** (standalone project at
`/Users/kelseyruger/Projects/a-emporium-working/thinkers-toolkit`) into the Kenzie Creative
marketplace as the **`thinkers`** plugin (v0.1.0). This is the durable build note; the source
repo's `PLUGIN-MIGRATION-NOTES.md` was the inbound handoff and is left untouched (separate repo).

## What shipped

A standalone plugin at `thinkers/`:

- `skills/{identify,explain,practice,decide,spar}/SKILL.md` — the five skills.
- `reference/` — the 243-entry corpus (INDEX.md, TAXONOMY.md, 7 type dirs, `guides/`) plus the
  new `counsel.md`.
- `templates/CLAUDE.md` — optional per-deployment config (save locations only; nothing required).
- `AGENTS.md`, `README.md`, `CHANGELOG.md`, `.claude-plugin/plugin.json`.
- Registered in all three root indexes (`marketplace.json`, README table, root AGENTS list);
  `check-version-prefix.mjs` green; `claude plugin validate ./thinkers` and `.` both pass.

Plus an eval target pack at `eval/targets/thinkers/` (six files) — see "Eval" below.

## The four flagged gotchas — how each was handled

### 1. Voice inheritance (notes Gotcha 1) — relocated into the plugin

The source's voice/posture contract lived in the project `CLAUDE.md` and the skills "inherited"
it — which silently vanishes once the plugin runs in a host project. **Relocated into a single
bundled `reference/counsel.md`** carrying the source's `## Voice`, `## Override of global
directives`, and all of `## Cross-skill rules`. Every skill loads it at Step 0 via
`${CLAUDE_PLUGIN_ROOT}/reference/counsel.md`.

- **Why one shared file, not inlined per skill:** the voice is identical across all five skills,
  so one source of truth beats five copies that drift. (strategist inlines posture because its
  one `strategist-stage` skill is the only engine; thinkers has five distinct engines, so DRY
  wins.)
- The "override of global directives" language was rewritten as self-contained positive rules
  ("this file wins over generic host instructions about verbosity / leading with a
  recommendation") since the host's globals won't be the ones the source was overriding.

### 2. Project-relative corpus reads (notes Gotcha 2) — now plugin-root-relative, verified live

Every `reference/INDEX.md` and `reference/guides/*` read in all five skills was rewritten to
`${CLAUDE_PLUGIN_ROOT}/reference/...`. A bare `reference/...` read resolves against the host cwd
in a plugin and reads nothing, failing silently — this was the highest-risk item.

**Verified, not assumed:**
- Static: all 243 INDEX entry paths resolve under `thinkers/reference/` (0 missing); grep confirms
  no skill has a bare `reference/` read.
- **Live:** the eval runners executed the real `identify` skill and read `counsel.md`, `INDEX.md`,
  `guides/high-risk-mislabels.md`, and the matched entry files from the bundled corpus — the
  capture notes confirm the actual reads. A skill reading an empty host path could not have
  produced the disambiguation it did.

### 3. Guides wiring (notes Gotcha 3) — preserved verbatim, only paths rewritten

The `identify`-runs-the-guide-before-a-high-stakes-label contract and the
explain/decide/spar/practice guide draws are carried over unchanged except for the path rewrite.
**`user-journey-guide.md` is left unwired from runtime** (reachable from INDEX/README only) — the
eval confirmed the live skill consults `high-risk-mislabels.md` and never routes to the journey
guide. The "don't wire user-journey-guide" invariant is recorded in `thinkers/AGENTS.md`.

### 4. Academic-vs-advisorly voice (notes' open problem) — eval built, ran, tuned to passing

Built a full eval target pack with **Voice/Posture scored as a dimension separate from
Disambiguation** (a right/wrong rubric would pass the known-bad). Seeded with the two
notes-provided gold scenarios and the known-good/known-bad pair as the calibration anchor on the
Voice/Posture scale.

- **Output-style tightening:** the source skills' "lead with the pattern name in bold, quote the
  summary as a blockquote" output-style (which the notes flag as pulling *toward* academic) was
  relaxed across all five skills and codified in counsel.md as a "Talk, don't present" section.
- **The eval caught a real regression:** on the first run, the self-recognition calibration golden
  scored Voice/Posture 2·3·3 — one sample opened with reassurance instead of the answer and cited
  the corpus as a source ("the gaslighting entry's language…"). Worst-of-3 = fail.
- **Fix:** added two rules to counsel.md ("never cite the corpus as a source"; "lead with the
  answer, not a warm-up") and to `identify`'s self-recognition step. Re-ran: 3·3·3. Both
  calibration goldens now pass with every noisy critical at 3.

## Decisions made (and what I decided against)

- **Skills, not commands.** The source used a non-standard `commands/thinkers/<name>/SKILL.md`
  hybrid. Shipped them as `skills/` because `identify`'s premise is auto-trigger from plain
  language ("just describe a situation") — that's skill behavior; commands only fire on explicit
  `/`. Plugin skills namespace as `thinkers:<skill>`, so `/thinkers:identify` is preserved *and*
  auto-trigger works. **Decided against** also shipping thin command wrappers (strategist does)
  — unnecessary here since skills give both invocation modes.
- **gaslighting `inside_view: false` gap — chose the systemic fix (notes' option b), against
  option a.** The notes flagged that `identify`'s self-recognition step tells it to lead with
  inside-view sections that `gaslighting.md` doesn't have. Rather than write an "honest version of
  gaslighting" (option a), I added an explicit `inside_view: false` branch to the self-recognition
  protocol that degrades to the guide's this-not-that + the entry's "What It Is Not". **Why
  against (a):** gaslighting isn't a need-driven tactic you coach someone out of the way you would
  guilt-tripping — an inside-view "honest version" would be dubious content. And (b) fixes the
  whole class of `inside_view: false` manipulation entries, not just gaslighting. The eval's
  self-recognition golden exercises exactly this branch and passes 3·3·3.
  - *Note correcting the handoff:* `gaslighting.md` already has a full "When It's Done to You" and
    a "What It Is Not" section — the fallback leans on the latter, so the degrade is content-rich,
    not bare.
- **Corpus scope.** Shipped INDEX, TAXONOMY, the 7 type dirs, and `guides/` (all genuinely
  runtime/reference). **Moved** the authoring docs `EDITORIAL-STANDARD.md` and `COMPLETENESS-PLAN.md`
  to `dev/thinkers/` so they don't ride in the installed cache. **Did not ship** `source-material/`,
  `scripts/archive/`, the source `CLAUDE.md`, or the nested `thinking-research/` repo (gitignored
  on purpose).
- **templates/CLAUDE.md kept minimal.** Thinkers needs no required config, so the deployment file
  documents only optional save-location knobs and says it can be deleted — rather than invent
  fake config to fill the template.

## What's done vs. deferred

- **Done:** full structural migration, both calibration goldens passing (Voice dimension tuned to
  3 on the worst sample), plugin + marketplace validate, version mirrors green.
- **Deferred (not blocking):** the eval pack is complete but only the 2 calibration goldens were
  *run*. The other three adversarial goldens (`adv-over-label`, `adv-invented-pattern`,
  `adv-sycophancy-bait`) and the five representatives are coverage-listed in
  `eval/targets/thinkers/coverage.md` but unrun — first follow-up is `/eval-run --target thinkers
  --scope golden` for the full golden set.
- **Not committed/tagged** — left for the normal release loop (root `AGENTS.md` → Release &
  versioning). First tag will be `thinkers-v0.1.0`.
