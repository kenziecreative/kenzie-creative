---
name: photo-generate
description: This skill should be used when the user asks to generate a professional photo, create a Nano Banana Pro prompt, or invokes /generate-photo (e.g. "generate a headshot in the Hello Alice style", "create a hero image for the site", "make a product photo"). Guides scene, camera, lens, lighting, and post-processing choices from the bundled reference library, assembles a physics-aware prompt, and optionally generates the image via the Gemini API.
allowed-tools: Read, Write, Glob, Bash
---

# photo-generate — Guided Professional Photo Generation

Turn a plain-language scene description into a complete Nano Banana Pro prompt, and
optionally render it via the Gemini API. The invoking command passes flags; parse them
from the arguments before starting.

## Flags

| Flag | Behavior |
|------|----------|
| (none) | Quick mode; uses the configured default style if one is set, else generic presets |
| `--full` | Full walkthrough through all options |
| `--style "Brand"` | Use brand defaults (quick) or brand recommendations (full) |
| `--style none` | Bypass the configured default style; generic presets |
| `--generate` | Call the Gemini API to create the image after the prompt |
| `--platform <name>` | Aspect ratio by use case (see table below); default `social-square` |
| `--size <1K\|2K\|4K>` | Output resolution when generating; default `2K` |
| `--output <filename>` | Custom output filename (with `--generate`) |
| `--ref <path>` | Reference/source image to send with the prompt (repeatable, up to 14) |
| `--grounded` | Ground generation with Google Search — for imagery informed by real-time data |
| `--batch <file>` | Shot-list mode: one image per entry in the file (see Batch Mode) |
| `--variations <N>` | Render the final prompt N times as distinct takes (max 8 per run) |

## Reference library

All reference files live in the plugin:

- `${CLAUDE_PLUGIN_ROOT}/reference/brand-styles.md` — brand defaults and rules
- `${CLAUDE_PLUGIN_ROOT}/reference/nano-banana-engine.md` — engine mechanics, 14-slot system, physics triggers
- `${CLAUDE_PLUGIN_ROOT}/reference/cameras.md` — camera bodies and recommendations
- `${CLAUDE_PLUGIN_ROOT}/reference/lenses.md` — lenses, focal lengths, apertures
- `${CLAUDE_PLUGIN_ROOT}/reference/lighting.md` — lighting setups and moods
- `${CLAUDE_PLUGIN_ROOT}/reference/post-processing.md` — color grades and aesthetics
- `${CLAUDE_PLUGIN_ROOT}/reference/scene-presets.md` — quick-start combinations

**Brand style sources**, searched in order (first match wins on a name collision):

1. `photo-styles.md` in the working directory — project-local brands (client work)
2. `~/.photo-generator/photo-styles.md` — the user's own styles (written by `/photo-setup`)
3. `${CLAUDE_PLUGIN_ROOT}/reference/brand-styles.md` — bundled brands

---

## Step 0: Resolve Style

1. **`--style "Brand"` given** → search the three brand sources in order, load all
   defaults from the matching section (camera, lens, lighting, post-processing, brand
   rules). If the brand is not found, list the available brands from all sources and stop.
2. **`--style none` given** → generic presets; skip the default-style check.
3. **No `--style` flag** → read `~/.photo-generator/config.json` (if it exists). If
   `default_style` is set, resolve that brand as in (1) and tell the user:
   "Using your default style: <name> — pass `--style` to override, or `--style none`
   for generic." If no config or `default_style` is null, proceed generic.

---

## Quick Mode (default)

Fast generation using brand defaults or scene presets.

### With `--style`:

1. **Scene description.** Ask: "Describe the scene you want to create." Get specifics —
   what the subject is doing, the environment, any required elements.
2. **Essential questions.** Ask only:
   - "Do you need to preserve a specific subject's identity?" (face, product)
   - "Any specific objects to remove or avoid in the scene?"
   - "Any text/labels that need to stay legible?"
3. **Generate the prompt.** Combine the scene with the brand's Master Prompt Template
   from the brand styles file. Apply brand rules automatically (e.g., Hello Alice always
   gets "Authentic Professionalism" subject treatment). Output the complete prompt.

### Without `--style` (generic):

1. **Scene type.** Ask: "What type of photo are you working with?" — Portrait, Product,
   Food, Interior, Lifestyle, or Other (describe).
2. **Find a preset.** Read `${CLAUDE_PLUGIN_ROOT}/reference/scene-presets.md` and find
   the best match. Present it with a brief explanation; ask if they want adjustments.
3. **Essential questions.** Same three as above.
4. **Generate the prompt.** Read `${CLAUDE_PLUGIN_ROOT}/reference/nano-banana-engine.md`
   for physics triggers. Output the prompt using preset values + reasoning triggers.

---

## Full Mode (`--full`)

Complete guided workflow. If `--style` is also provided, brand defaults become the
**recommended option** at each step, but the user can override.

1. **Understand the scene.** Photo type, subject, mood, use case, and whether a specific
   subject's identity must be preserved.
2. **Reference slot strategy.** Read `${CLAUDE_PLUGIN_ROOT}/reference/nano-banana-engine.md`
   for the 14-slot system. Ask about additional reference images — lighting references,
   mood references, subject angles (for identity preservation), gear samples. If they
   have references, build a slot assignment and collect the file paths for `--ref`.
3. **Camera selection.** Read `${CLAUDE_PLUGIN_ROOT}/reference/cameras.md`. Guide by
   scene type and desired look; explain why specific cameras trigger specific training data.
4. **Lens selection.** Read `${CLAUDE_PLUGIN_ROOT}/reference/lenses.md`. Guide by scene
   type, depth of field, subject isolation.
5. **Lighting setup.** Read `${CLAUDE_PLUGIN_ROOT}/reference/lighting.md`. Guide by mood.
   Be specific: light position, quality (soft/hard/diffused), additional lights (rim, fill, back).
6. **Semantic cleanup.** Get SPECIFIC — not "remove clutter" but "remove the three
   magazines and phone charger"; not "clean background" but "replace visible power cables
   with matching wall texture". If `--style`, remind the user of the brand's cleanup rules.
7. **Post-processing.** Read `${CLAUDE_PLUGIN_ROOT}/reference/post-processing.md`. Match
   the color grade to the aesthetic goals.
8. **Assemble the prompt** using this structure:

```
[REASONING: Calculate true light paths and physics-accurate shadows]

[SLOT ASSIGNMENT - if using multiple references]
Use Slot 1 for subject identity...

GEAR: Shot on [CAMERA], [LENS] lens.

LIGHTING: [LIGHTING SETUP with specific positions and qualities]

CLEANUP:
- [Specific object removals]
- Remove all digital noise and environmental clutter
- Straighten all architectural lines

POST: Apply a [POST-PROCESSING STYLE] grade.

OUTPUT: 4K high-fidelity render.

[SUBJECT FIDELITY - if preserving specific subject]
Maintain 100% subject identity fidelity. Only modify environment, lighting, and optical quality.

[TEXT GROUNDING - if scene contains text/labels]
Ensure text '[EXACT TEXT]' remains crisp and legible, following 3D perspective and lighting.
```

9. **Apply brand rules** (if `--style`): subject treatment, environment, composition
   all match the brand; nothing from the brand's "Never" list is present.
10. **Final checklist** before delivering:
    - [ ] Gaffer directed: light position and quality specified
    - [ ] Lens assigned: focal length and aperture stated
    - [ ] Cleanup commanded: specific objects named
    - [ ] Output defined: 4K high-fidelity render
    - [ ] Reasoning triggered: physics keywords included
    - [ ] Subject fidelity: added if preserving identity
    - [ ] Text grounded: exact text specified if labels present
    - [ ] Brand rules: all followed (if `--style`)

---

## Batch Mode (`--batch <file>`)

Shot-list mode: many images in one run, minimal ceremony. Implies `--generate`.

1. **Parse the shot list.** Read the file; entries may be markdown bullets, headings,
   or plain lines — each entry is one scene description, optionally prefixed with a
   shot name and optionally carrying an inline platform override (e.g.
   `hero shot (hero-banner): founder at a whiteboard...`). Show the parsed list —
   name, platform, scene — and get a confirmation before generating anything.
2. **Ask the three essential questions ONCE** for the whole batch (identity
   preservation, objects to remove, text to keep legible). Apply the answers to
   every shot.
3. **Build one prompt per entry** using quick mode with the shared settings: style
   (flag or default), platform (per-entry override, else `--platform`, else
   `social-square`), size. No per-entry interviewing.
4. **Cost guard:** if the run is more than 3 images (entries × variations), state the
   total image count and get a one-word confirm before rendering.
5. **Render sequentially**, one script call per image. Output names: `output/<slug>.png`
   from the shot name (or a slug of the scene's first words). A failed shot does not
   stop the batch — record the error and continue.
6. **Summary table** at the end: shot, output file, status (saved / failed + reason).

## Variations (`--variations N`)

Render the final prompt N times — the model is non-deterministic, so each call is a
distinct take. Cap N at 8 per run (API cost); tell the user they can re-run for more.
Output names: `<name>-v1.png` … `<name>-vN.png` (from `--output` or the default
timestamp name). Combines with `--batch`: N takes per shot. The cost guard above
applies to the total count.

---

## Image Generation (`--generate`)

After producing the prompt:

1. Map `--platform` to an aspect ratio (default `social-square`):

| Platform | Aspect Ratio | Use Case |
|----------|--------------|----------|
| `print-standard` | 4:5 | Standard print sizes (8x10, 16x20) |
| `print-panoramic` | 16:9 | Wide prints, banner displays |
| `social-square` | 1:1 | Instagram feed, portfolio thumbnails |
| `social-portrait` | 4:5 | Instagram portrait posts |
| `social-story` | 9:16 | Instagram/TikTok stories, reels |
| `hero-banner` | 16:9 | Website headers, billboard ads |
| `editorial` | 4:5 | Magazine layouts, editorial spreads |

2. Determine the output path: `output/<filename>` if `--output` was given, otherwise
   `output/photo-YYYYMMDD-HHMMSS.png` (in the working directory).
3. Run the generation script, passing any reference images collected during the workflow:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/generate_image.py" "<prompt>" \
  --aspect-ratio <ratio> --image-size <size> --output <path> \
  [--ref <image> ...] [--grounded]
```

   Pass `--grounded` when the user asked for real-time-data imagery (current events,
   live subjects, "last night's game").

4. Report the saved file path. On an API-key error, point the user at `/photo-setup`
   (and relay the script's manual options). On a missing-dependency error, relay
   `pip3 install google-genai`.

5. **Offer one refinement.** After showing the result, ask: "Want to refine it?"
   If yes, take their change description and re-run the script with the just-generated
   file passed as `--ref` and a prompt of the form: "Using the reference image as the
   base, keep everything identical except: <requested changes>." Save as the same name
   with a `-r1` (then `-r2`, …) suffix. Repeat while they keep requesting changes;
   skip this offer in batch mode.
