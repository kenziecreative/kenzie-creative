---
name: photo-setup
description: This skill should be used when the user asks to set up the photo-generator plugin, configure their Gemini API key for photo generation, set a default photo style, or invokes /photo-setup (e.g. "set up photo generation", "configure my Gemini key", "make Hello Alice my default style"). Creates the keys.env file the user pastes their key into (the key never passes through the conversation), verifies it, and optionally captures a default brand style.
allowed-tools: Read, Write, Glob, Bash, AskUserQuestion
---

# photo-setup — One-Time Plugin Setup

Get the user from freshly-installed to generating: API key in place (without the key
ever appearing in the conversation), dependency confirmed, and optionally a default
style so plain `/generate-photo` already looks like them.

**Idempotent.** Re-running reports what's already configured and only fills gaps.
**Never clobber** an existing `keys.env` or `photo-styles.md` — they may hold a real
key or hand-tuned styles. Config files are created with the Write tool, not shell.

## Step 1: Scaffold `~/.photo-generator/`

Check what exists. Create anything missing:

**`~/.photo-generator/keys.env`** (only if absent) — the one place to paste the key,
no shell profile required:

```
# photo-generator API key — LOCAL ONLY. Never commit or share this file.
# Paste your key after the = (no quotes needed), then save. That's it.
#
# The generation script loads this file automatically. If GEMINI_API_KEY is
# already set in your real environment, that wins. A project-scoped file at
# .photo-generator/keys.env in your working directory wins over this one.

# Gemini — https://aistudio.google.com/apikey
GEMINI_API_KEY=
```

**`~/.photo-generator/config.json`** (only if absent):

```json
{
  "_note": "photo-generator configuration. API keys are read from keys.env or the environment at run time and are NEVER stored here.",
  "default_style": null
}
```

## Step 2: Key entry

Check whether a key already resolves:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/generate_image.py" --check-keys
```

- **Already found and valid** → report the source, skip to Step 3.
- **Not found** → open the file for the user: `open -t ~/.photo-generator/keys.env`
  (fall back to `${EDITOR:-nano}` if `open` is unavailable). Tell them: get a key at
  https://aistudio.google.com/apikey, paste it after `GEMINI_API_KEY=`, save, then
  say "done". **Never ask them to paste the key into the chat.** When they confirm,
  re-run `--check-keys` and report the result.
- **Found but validation failed** → show the script's error; likely a bad or revoked
  key. Point them back at the file to fix and re-check.

A missing key is not fatal — prompt-only use (`/generate-photo` without `--generate`)
needs no key. Say so and continue.

## Step 3: Dependency check

```bash
python3 -c "import google.genai" 2>&1
```

If the import fails, offer to run `pip3 install google-genai`. (Only needed for
`--generate`; prompt-only use needs nothing.)

## Step 4: Default style (optional)

Ask whether they want a default style — the brand look `/generate-photo` applies
automatically when no `--style` flag is given. Three paths:

**a. Pick an existing brand.** List the brands found in
`${CLAUDE_PLUGIN_ROOT}/reference/brand-styles.md` plus any `photo-styles.md` in the
working directory or `~/.photo-generator/`. Write the chosen name to `default_style`
in `~/.photo-generator/config.json`.

**b. Describe a new style.** Interview them loosely — they should not need photography
vocabulary. Ask about: the overall feel (bright/moody, polished/candid), what they
photograph most, any brands or photographers whose look they admire, colors they
gravitate to. Map the answers to library terms by reading
`${CLAUDE_PLUGIN_ROOT}/reference/cameras.md`, `lenses.md`, `lighting.md`, and
`post-processing.md`, then write a complete brand section (camera, lens, lighting,
post-processing, brand rules, master prompt template — follow the structure of an
existing brand in `brand-styles.md`) to `~/.photo-generator/photo-styles.md`
(create the file if absent, append if it exists). Set the new brand's name as
`default_style` in `config.json`. Show them the section and remind them the file is
theirs to edit.

**c. No default.** Leave `default_style: null`.

## Step 5: Project mode (only if asked, or if they say keys/styles should be per-project)

When the user wants project-scoped setup in the current directory:

- `.photo-generator/keys.env` — same template as Step 1, same never-clobber rule.
- `.photo-generator/.gitignore` containing:
  ```
  # Local API-key file — must never be committed
  keys.env
  ```
- A project `photo-styles.md` can hold project-local brands (wins over user-level
  and bundled on a name collision).

## Step 6: Report

Summarize in a few lines: key status (resolved from where, or "not set — prompt-only
until you paste one into ~/.photo-generator/keys.env"), dependency status, default
style (name or none). Then the single next move: `/generate-photo` (or
`/generate-photo --generate` once the key is in).
