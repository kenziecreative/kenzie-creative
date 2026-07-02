# Changelog

Notable changes to the `photo-generator` plugin. Follows [Keep a Changelog](https://keepachangelog.com/) and [Semantic Versioning](https://semver.org/).

## [1.2.0] — 2026-07-01

### Changed

- **Decision-point UX.** Every enumerable choice now goes through the AskUserQuestion tool instead of prose bullets: the three essential questions (one call), scene type, full-mode camera/lens/lighting/grade picks (recommended option first), batch-list confirmation, the cost guard, the post-prompt "what next?" (render now / different platform / tweak / done), and the post-render refinement offer. Output sections are separated with `---` rules, and the assembled prompt is always delivered in a fenced code block.
- **Setup announces pre-existing key files loudly.** If a key already resolves, setup now names the source, states explicitly that it did not create/read/modify it, warns the user to check the file if they didn't put a key there, and asks keep-or-replace. The done-gate, dependency install, and default-style choice are AskUserQuestion flows.

### Security

- **Key-hygiene hard rules** added to both skills, the plugin AGENTS.md, and the marketplace AGENTS.md: no agent ever reads, prints, or copies an API-key value — between files, into tests, or into chat. Key presence is checked only via `--check-keys` (reports source, never value); legacy key files are reported by path for the user to migrate themselves. Prompted by the v1.1.0 build agent silently copying the user's key from a legacy `.env` into `~/.photo-generator/keys.env`.

## [1.1.0] — 2026-07-01

### Added

- **`/photo-setup`** — one-time setup command (beacon-pattern). Scaffolds `~/.photo-generator/` with a labeled, empty `keys.env` the user pastes their Gemini key into directly — the key never passes through the conversation — then verifies it via the script's new `--check-keys` mode (same load path a real run uses, plus a free live API validation). Checks the `google-genai` dependency, supports optional project-scoped setup (`.photo-generator/keys.env` + `.gitignore`), and is idempotent — existing key files are never clobbered.
- **Default style.** Setup can record a `default_style` in `~/.photo-generator/config.json` — pick an existing brand or describe a new one in plain language (setup maps it to library terms and writes a full brand section to `~/.photo-generator/photo-styles.md`). `/generate-photo` without `--style` uses it and says so; `--style none` bypasses it.
- **Batch mode** (`--batch <file>`). One image per shot-list entry: parsed list confirmed up front, essential questions asked once for the set, sequential renders that survive per-shot failures, summary table at the end.
- **Variations** (`--variations N`, max 8). N distinct takes of the final prompt, `-v1…-vN` suffixes; combines with batch. Runs over 3 images confirm the count first.
- **Search grounding** (`--grounded`). Generation informed by real-time Google Search data (current events, live subjects).
- **Refinement loop.** After a render, describe changes and the workflow re-renders using the previous image as the base (multi-turn editing via reference images), `-r1…` suffixes.
- **Reference library:** `nano-banana-engine.md` gains a Gemini 3 Pro capabilities section (14 refs = up to 5 humans + 6 objects, 1K/2K/4K, thinking pass, text rendering, grounding, multi-turn editing); `cameras.md` gains a Film & Cinema section (Pentax 67, Contax T2, ARRI Alexa 35).

### Changed

- **Key resolution order** is now: environment > cwd `.env` (legacy) > project `.photo-generator/keys.env` > `~/.photo-generator/keys.env`. Key-missing errors point at `/photo-setup` first.

## [1.0.0] — 2026-07-01

Ported from the standalone `photo-generator` repo into the Kenzie Creative marketplace as a proper plugin. `/generate-photo` now works from any directory instead of only when a CLI is launched inside the old repo.

### Added

- **Plugin packaging.** One thin command (`/generate-photo`) dispatching to the `photo-generate` skill; the 7-file reference library (cameras, lenses, lighting, post-processing, scene presets, brand styles, Nano Banana engine mechanics) ships inside the plugin and loads via `${CLAUDE_PLUGIN_ROOT}`.
- **Project-local brand styles.** A `photo-styles.md` in the working directory adds brands alongside the bundled ones (and wins on a name collision), so client projects can carry their own house style without editing the plugin.
- **`--size` flag** (1K/2K/4K output resolution) and **`--ref` flag** (repeatable reference/source images) surfaced in the command; both were previously unreachable or bash-only.

### Fixed

- **`--platform` was a no-op.** Both old scripts validated the aspect ratio and then never sent it to the API, so every image came back at the model default. The consolidated script now passes `image_config.aspect_ratio` (and `image_size`) properly.

### Changed

- **One script instead of two.** The bash/curl and Python scripts merged into a single `scripts/generate_image.py` on the official `google-genai` SDK, keeping the bash version's reference-image support. Reads `GEMINI_API_KEY` from the environment or a `.env` in the working directory; model overridable via `GEMINI_IMAGE_MODEL` or `--model`.
- **Dropped Gemini CLI support.** The duplicate `.gemini/` command definition and TOML shim are gone; Gemini remains involved only as the image API backend.
