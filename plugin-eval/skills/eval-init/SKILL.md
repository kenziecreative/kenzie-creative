---
name: eval-init
description: This skill should be used when the user asks to set up or initialize a plugin evaluation (e.g. "set up plugin-eval", "init the eval against strategist", "get the eval ready to run"). Picks a target pack from targets/, resolves where the target plugin's real skill files live, scaffolds the .eval/ working directory, and validates the pack before any run.
disable-model-invocation: true
allowed-tools: Read, Write, Glob, Grep
---

# /plugin-eval:init — Set Up An Evaluation

Prepare the current project directory to run evaluations against a target plugin. This is
run once per project (or when the target's location changes). It writes nothing into the
target plugin and nothing into a real strategy/research project — only a `.eval/` working
area.

In Cowork, create files and folders with the Write tool only (no shell `mkdir`).

## Step 1: Pick the target pack

1. The available packs are the directories under `${CLAUDE_PLUGIN_ROOT}/targets/`. List
   them. Default and currently shipped: `strategist`.
2. Take the target name from the user's argument, or default to `strategist` if only one
   pack exists. If the named pack doesn't exist, list what's available and stop.
3. Read the pack's `adapter.md` to learn what it needs — most importantly, the
   **target plugin root** (where the target's real skill files live, which the runner
   reads and executes).

## Step 2: Locate the target plugin

The runner executes the target's *actual* skill files, so it needs their location.

1. If the user provided a path, use it. Otherwise try to resolve it: when running inside the
   marketplace repo, the target is a sibling directory (e.g. `../strategist` relative to
   this plugin); when the target is installed, ask the user for its plugin root.
2. Verify the path exists and contains the skill files the adapter names (e.g.
   `skills/strategist-stage/SKILL.md`). If not, tell the user the path looks wrong and ask
   for the correct one. Do not proceed with an unresolved target.

## Step 3: Scaffold `.eval/`

Write `.eval/config.json`:

```json
{
  "target": "<name>",
  "target_plugin_root": "<resolved absolute path>",
  "pack_root": "${CLAUDE_PLUGIN_ROOT}/targets/<name>",
  "created": "<UTC timestamp>"
}
```

Create `.eval/runs/` and `.eval/reports/` (write a `.gitkeep` into each to create them).

## Step 4: Sanity-check the pack

Confirm the pack is complete: `adapter.md`, `principles.md`, `rubric.md`, and
`scenarios.jsonl` all exist, and `scenarios.jsonl` parses (one JSON object per non-empty
line). Report the scenario count split by `kind` and how many are `golden`. If anything is
missing or malformed, say so and stop — a run against a broken pack wastes effort.

## Step 5: Orient

```
Evaluation ready.

  Target:   <name>  (<N> scenarios — <R> representative, <A> adversarial, <G> golden)
  Plugin:   <target_plugin_root>
  Work dir: .eval/

▶ NEXT: /plugin-eval:run               — run the golden set and score it.
        /plugin-eval:run --scope all   — include non-golden scenarios.
        /plugin-eval:run --id <id>     — run one scenario.
```

## Guardrails

1. Never write into the target plugin or a real project. Only `.eval/` is yours.
2. Don't proceed with an unresolved or malformed target — fail loud, not silently.
3. Use the Write tool for all scaffolding (Cowork-safe).
