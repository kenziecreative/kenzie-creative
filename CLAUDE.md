# CLAUDE.md

This repository's agent guidance lives in **`AGENTS.md`** (marketplace-level) and in each plugin's own `AGENTS.md` (`intelligence-briefing/`, `researcher/`, `sage/`, `strategist/`, `plugin-eval/`). Start there.

**Current work state lives in `dev/STATE.md`** — where things stand, next steps, open questions. Read it when picking up work; it's written by the `/checkpoint` skill, which you should run before clearing context. Two things that bite immediately: **validate before you commit** (`claude plugin validate ./<plugin>` and `claude plugin validate .`), and in Cowork **file deletion is gated per folder** (approve the prompt once or `rm`/git lock-cleanup fail).

Note: a plugin's `templates/CLAUDE.md` is **not** agent guidance — it's the per-deployment config file that plugin ships to its users. Don't confuse the two.
