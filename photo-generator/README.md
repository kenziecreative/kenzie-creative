# photo-generator

Get a professional-grade photo from a plain-language description — without knowing what a key light or an 85mm prime is.

`/generate-photo` walks you from a scene description to a complete, physics-aware Nano Banana Pro prompt: camera body, lens, lighting setup, semantic cleanup, and color grade, each chosen from a curated reference library. Add `--generate` and it renders the image directly via the Gemini API at the right aspect ratio and resolution for print, social, or hero-banner use.

## Install

From the Kenzie Creative marketplace:

```
/plugin marketplace add kenziecreative/kenzie-creative
/plugin install photo-generator@kenzie-creative
```

### Setup

Run `/photo-setup` once. It creates `~/.photo-generator/keys.env`, opens it so you can paste your Gemini API key directly into the file (the key never passes through the chat), verifies the key against the API, checks the `google-genai` dependency, and optionally captures a **default style** — the brand look applied whenever you run `/generate-photo` without `--style`.

Manual alternative: `export GEMINI_API_KEY='...'` in `~/.zshrc`, or paste the key into `~/.photo-generator/keys.env` yourself (get one at https://aistudio.google.com/apikey), plus `pip3 install google-genai`. Resolution order: environment > cwd `.env` > project `.photo-generator/keys.env` > `~/.photo-generator/keys.env`.

Prompt-only use (no `--generate`) needs no key at all.

## Usage

| Command | What you get |
|---------|--------------|
| `/photo-setup` | One-time setup — API key, dependency, optional default style |
| `/generate-photo` | Quick mode — your default style if set, minimal questions |
| `/generate-photo --full` | Full walkthrough — every option, with explanations |
| `/generate-photo --style "Hello Alice"` | Quick mode with Hello Alice brand defaults (`--style none` for generic) |
| `/generate-photo --generate` | Build the prompt, then render the image (1:1, 2K) |
| `/generate-photo --generate --platform hero-banner --size 4K` | Render a 16:9 4K image |
| `/generate-photo --generate --ref face.jpg --ref light.jpg` | Render with reference images |
| `/generate-photo --generate --grounded` | Ground the image in real-time Google Search data |
| `/generate-photo --generate --variations 4` | Four distinct takes of the same prompt |
| `/generate-photo --batch shots.md --platform social-square` | One image per entry in a shot-list file |
| `/generate-photo --generate --output "shot.png"` | Custom output filename |

Generated images land in `output/` under your current directory, timestamped unless you pass `--output`. After a render, the workflow offers a refinement pass — describe what to change and it re-renders using the previous image as the base.

**Batch mode:** put one scene per line (or bullet, or heading) in a file; each entry optionally takes a name and platform override. The workflow confirms the parsed shot list, asks the essential questions once for the whole set, and renders each shot, ending with a summary table. `--variations N` combines with batch for N takes per shot; runs over 3 images confirm the count first.

### Platforms

| Platform | Aspect Ratio | Use Case |
|----------|--------------|----------|
| `print-standard` | 4:5 | Standard print sizes (8x10, 16x20) |
| `print-panoramic` | 16:9 | Wide prints, banner displays |
| `social-square` | 1:1 | Instagram feed, portfolio thumbnails |
| `social-portrait` | 4:5 | Instagram portrait posts |
| `social-story` | 9:16 | Instagram/TikTok stories, reels |
| `hero-banner` | 16:9 | Website headers, billboard ads |
| `editorial` | 4:5 | Magazine layouts, editorial spreads |

## Brand styles

Hello Alice ships configured. Three ways to add more, searched in this order (first match wins):

**In a project (for client work):** drop a `photo-styles.md` in the project root, following the template in the bundled `reference/brand-styles.md`.

**Your own styles:** `/photo-setup` can interview you for a personal style — no photography vocabulary needed — and writes it to `~/.photo-generator/photo-styles.md`, optionally as your default.

**In the plugin:** add to `reference/brand-styles.md` and bump the plugin version.

To derive a brand's settings from real photos, upload 5–10 representative shots to Gemini with the analysis prompt at the top of `reference/brand-styles.md` — it returns camera, lens, lighting, and grade settings in the format the template expects.

## Structure

- `commands/generate-photo.md`, `commands/photo-setup.md` — entry points (thin wrappers)
- `skills/photo-generate/SKILL.md` — the guided workflow engine
- `skills/photo-setup/SKILL.md` — one-time setup (keys.env, dependency, default style)
- `reference/` — the photography knowledge library (7 files)
- `scripts/generate_image.py` — Gemini API generation script (`google-genai` SDK); also `--check-keys`
