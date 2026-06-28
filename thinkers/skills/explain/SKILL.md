---
name: explain
description: Look up and explain a specific named cognitive bias, logical fallacy,
  rhetorical fallacy, persuasion tactic, bad-faith move, manipulation tactic, or
  strategy by name. Use when the user explicitly references a named pattern —
  phrases like "what is confirmation bias", "explain anchoring", "tell me about
  the sunk cost fallacy", or `/thinkers:explain <name>`.
allowed-tools: Read, Glob, Grep
---

# /thinkers:explain — Direct Pattern Lookup

Direct lookup of a named pattern. The user knows what they want; deliver the entry cleanly.

## Step 0: Load the counsel contract

Read `${CLAUDE_PLUGIN_ROOT}/reference/counsel.md` and follow it. Even a direct lookup is delivered in the counselor register — talk it through, don't recite an entry (see counsel.md's "talk, don't present").

## Protocol

1. **Find the entry.** From the user's reference, extract the candidate name(s).
   - First `Grep` against `${CLAUDE_PLUGIN_ROOT}/reference/INDEX.md` for the slug or title.
   - Slugs are kebab-case (e.g., `confirmation-bias`, `sunk-cost-fallacy`, `gaslighting`).
   - If the user's phrasing doesn't match a slug exactly, fuzzy-match against the title column. If multiple match, ask which one.

2. **Read the file** at the path given in the index: `${CLAUDE_PLUGIN_ROOT}/reference/<type-dir>/<slug>.md`.

3. **Check the entry shape.** Three possibilities:
   - **Variant A** (cognitive_bias, logical_fallacy, rhetorical_fallacy, persuasion_tactic, most bad_faith_move): Description, How It Works, Signature Phrasing, Ask Yourself, Applying This Knowledge (Everyday/Work/Education), Related Patterns.
   - **Variant B** (strategy): Description, When to Use, When It Backfires, Practical Examples, Related Patterns.
   - **Variant C** (manipulation_tactic): Description, How It Works, Signature Phrasing, Ask Yourself, When It's Done to You, and (if `inside_view: true` in frontmatter) When You're Doing It + Why It Works for You + The Honest Version, plus Related Patterns.

4. **For Variant C entries with `inside_view: true`, orient the user before presenting** — let them know the entry has both an outside view (when it's done to you) and an inside view (when you might be doing it), and ask whether they want one or both. Wait for their answer. If they want one, present that view. If both, outside-view first then inside-view.

5. **Default presentation** (when not gated by the Variant C orientation) — pull what the question needs and say it in voice, not as a recited template:
   - The pattern, in a sentence, in your own words
   - How it works / when to use (whichever the entry has)
   - Signature phrasing or practical examples (whichever the entry has), if they sharpen it
   - The Ask Yourself prompt if present
   - One contextual angle — Everyday / Work / Education for Variant A; When It's Done to You for Variant C; When It Backfires for Variant B
   - Related patterns at the end as a short list, if useful

6. **Adapt to follow-ups.** "Where else does this show up" → read more Applying-This-Knowledge subsections. "What's similar" → lean on Related Patterns. "How do I respond" → surface counter-strategies. Asked about a Variant C entry's inside view after starting with the outside view → switch and present those sections.

7. **If the pattern is easily confused with a neighbor, name the contrast.** For gaslighting, control-vs-boundary, manipulation-vs-persuasion, appeal-to-emotion, or the overload trio (gish gallop / argument by verbosity / flooding the zone), `${CLAUDE_PLUGIN_ROOT}/reference/guides/high-risk-mislabels.md` and `${CLAUDE_PLUGIN_ROOT}/reference/guides/debate-and-information-overload.md` hold the this-not-that distinctions and a one-line diagnostic. Offer the contrast when it sharpens the definition; don't force it when the user just wants the gist.

## When NOT to use

- The user describes a situation but doesn't name a pattern — use `/thinkers:identify`.
- The user wants to be quizzed — use `/thinkers:practice`.

## Output style

Follow counsel.md. Match the entry's substance to the question's breadth:
- Narrow ("just give me the gist of confirmation bias") → the one-sentence what-it-is + how-it-works + the Ask Yourself, no more.
- Broad ("teach me about confirmation bias") → the whole entry, but still led human, not dumped verbatim.
- For Variant C inside-view sections, the self-recognition register from counsel.md applies with extra weight — non-accusatory, second-person, acknowledges ambivalence.
