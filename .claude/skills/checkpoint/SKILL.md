---
name: checkpoint
description: Capture the state and progress of work in this marketplace repo so the session context can be safely cleared — survey what happened, clean up loose ends, write dev/STATE.md, commit. Run before /clear or at the end of any substantial work session.
---

# /checkpoint

Make the current session disposable: a fresh session reading `AGENTS.md` + `dev/STATE.md`
should be able to pick up exactly where this one left off, with nothing living only in
conversation context.

## Step 1: Survey

Gather the facts before writing anything:

```bash
git status --short          # uncommitted and untracked work
git log --oneline -15       # what landed recently
git tag --sort=-creatordate | head -5
```

- Check the task list for anything in_progress or pending.
- Check for background tasks (servers, watchers) started this session.
- Note anything decided or learned this session that is NOT yet written down in the repo —
  decisions, gotchas, verified facts, open questions. This is the most important survey
  item; conversation-only knowledge is what a context clear destroys.

## Step 2: Clean up

- **Validate anything touched.** For each plugin changed this session:
  `claude plugin validate ./<plugin>`, plus `claude plugin validate .` from the repo root.
  If any plugin's version/description changed, also run
  `node dev/scripts/check-version-prefix.mjs`.
- **Resolve uncommitted work.** Either commit it in logical units (following the release
  loop in AGENTS.md if a plugin changed: version bump → both descriptions' v-prefix →
  CHANGELOG → root README row → checker → validate), or — if it's genuinely half-done —
  leave it uncommitted and record exactly what it is and what finishing it looks like in
  STATE.md. Never let uncommitted work go unrecorded.
- **Stop background tasks** this session started; list anything deliberately left running.
- **Scratch artifacts** (sample projects, temp dirs, eval `.eval/` runs): don't chase
  deleting them — note their paths and how to recreate them in STATE.md. (File deletion is
  gated per folder in Cowork; don't fight it for scratch.)

## Step 3: Write dev/STATE.md

Overwrite `dev/STATE.md` (a snapshot, not a log — git history holds old versions):

```markdown
# Work state — kenzie-creative-marketplace

**Last updated:** <date> · **Session focus:** <one line>

## Where things stand

<Per-plugin: current version, what state it's in, one or two lines. Only entries with
activity or pending work — link to the plugin's CHANGELOG for full history.>

## Done this session

<Outcome-level: what shipped/landed, with commit hashes or tags. Not a play-by-play.>

## In flight / uncommitted

<Anything half-done, with exactly what finishing it looks like. "None" is a good answer.>

## Next steps (in order)

<The queue a fresh session should execute, most specific first. Enough context per item
that no conversation memory is needed: what, why, where the grounding doc is.>

## Open questions / decisions pending

<Things waiting on a human call. Name who or what unblocks each.>

## Session knowledge worth keeping

<Facts verified or learned this session not recorded elsewhere: gotchas, environment
quirks, verified commands, scratch paths and how to recreate them. If a fact belongs in
AGENTS.md or a plugin doc instead, put it THERE and skip it here.>

## How to resume

1. Read `AGENTS.md` (orientation), then this file.
2. <Any session-specific resume steps.>
```

## Step 4: Commit

Commit `dev/STATE.md` (and any clean work) in logical units. In Cowork, commits work once
folder deletion is approved; `git push` is safest from a real terminal.

## Rules for the content

- STATE.md is a **snapshot**. Overwrite it; don't append. The next session reads the
  current state, not a diary.
- Be specific in Next Steps: a fresh session should be able to execute each item without
  asking. Point at the grounding doc (`dev/<plugin>/PRD.md`, a CHANGELOG, a skill file).
- Record conversation-only knowledge, or it's lost. That's the whole point of the skill.
- Don't duplicate what AGENTS.md or a plugin's own docs already say — link to them.
