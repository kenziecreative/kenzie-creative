# AGENTS.md — photo-generator

Maintainer/agent guidance for working **on** the photo-generator plugin. Standalone,
self-contained photo prompt-and-generation system. (Current version lives in
`plugin.json` and `CHANGELOG.md`.)

## What it is

Turns Claude Code into a photography director: a guided workflow (quick or `--full`)
that converts a plain-language scene into a physics-aware Nano Banana Pro prompt —
camera, lens, lighting, semantic cleanup, color grade — then optionally renders it via
the Gemini image API (`--generate`). Brand presets apply a house style in one flag.

## Structure

- `commands/generate-photo.md`, `commands/photo-setup.md` — thin wrappers.
- `skills/photo-generate/SKILL.md` — the workflow engine (quick mode, full mode, style
  resolution, batch/variations orchestration, refinement loop, generation dispatch).
  Commands stay thin; behavior changes go here.
- `skills/photo-setup/SKILL.md` — one-time setup (beacon-pattern): scaffolds
  `~/.photo-generator/` (keys.env + config.json), walks key entry via the file (never
  the chat), verifies via the script's `--check-keys`, optional default style.
- `reference/` — read-only photography library, loaded via `${CLAUDE_PLUGIN_ROOT}`:
  `cameras.md`, `lenses.md`, `lighting.md`, `post-processing.md`, `scene-presets.md`,
  `nano-banana-engine.md` (engine mechanics, 14-slot system, physics triggers), and
  `brand-styles.md` (brand defaults + the analysis prompt for deriving new brands).
- `scripts/generate_image.py` — the only script, single-image by design (batch and
  variations loop in the skill, one call per image). `google-genai` SDK; argparse flags
  `--aspect-ratio`, `--image-size`, `--output`, `--ref` (repeatable), `--grounded`,
  `--model`, `--check-keys`. Model overridable via `GEMINI_IMAGE_MODEL`. Carries
  PEP 723 inline metadata so `uv run --script` also works.

## Key mechanics

- **Key resolution** (mirrors beacon `harness/run-panel.mjs`): real environment >
  cwd `.env` (legacy) > `.photo-generator/keys.env` in cwd > `~/.photo-generator/keys.env`.
  `--check-keys` reports the resolved source and live-validates with `client.models.get()`
  — it is the single source of truth `/photo-setup` calls. Setup **never clobbers** an
  existing `keys.env` or `photo-styles.md`, and keys are never stored in `config.json`
  or asked for in conversation.
- **Style resolution:** project `photo-styles.md` > `~/.photo-generator/photo-styles.md`
  > bundled `reference/brand-styles.md`; no `--style` flag falls back to
  `default_style` in `~/.photo-generator/config.json` (`--style none` bypasses).
- **Deployment-directory state, per the `/contract` spirit:** generated images go to
  `output/` under the user's cwd; project/user style files live outside the plugin.
  The plugin itself stays read-only at runtime.
- **Aspect ratio is passed via `image_config`** (`types.ImageConfig(aspect_ratio=...,
  image_size=...)`). The pre-plugin scripts validated but never sent it — don't
  regress this.
- **Model id** is pinned to `gemini-3-pro-image-preview` as the default in the script;
  when Google renames it, update `DEFAULT_MODEL` there (users can bridge with
  `GEMINI_IMAGE_MODEL` meanwhile).

## History

Ported 2026-07 from the standalone `photo-generator` repo (which also carried a Gemini
CLI command surface — dropped; Claude Code is the only runtime, Gemini is the API
backend). See CHANGELOG 1.0.0 for what changed in the port.
