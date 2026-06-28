# Thinkers

A wise counselor for thinking through what's happening, what to do about it, and where your own reasoning might be wrong. Backed by a 243-pattern reference corpus of cognitive biases, fallacies, persuasion tactics, bad-faith moves, manipulation tactics, and strategic moves.

Part of the [Kenzie Creative marketplace](https://github.com/kenziecreative/kenzie-creative).

## Install

```
/plugin marketplace add kenziecreative/kenzie-creative
/plugin install thinkers@kenzie-creative
```

## Use

Five skills, invokable by name or triggered when you describe a situation in plain language:

- `/thinkers:identify` — describe a situation, get the patterns that fit. Also handles **self-recognition** when you're examining your own behavior ("am I gaslighting him?"), shifting to a non-judgmental, inside-view register.
- `/thinkers:explain <name>` — direct lookup of a named pattern.
- `/thinkers:practice` — generate scenarios and quiz your pattern recognition.
- `/thinkers:decide` — work through a decision (STRUX 12-step, adaptive depth — a tight tradeoff for simple calls, the full walk for complex ones).
- `/thinkers:spar` — stress-test your thinking (devil's advocate / Socratic / red team).

You can also just describe a situation in plain language — `identify`'s description triggers it automatically.

## What it does

Names what's happening so you can reason about it, without over-applying high-stakes labels. Before it calls something gaslighting, control, manipulation, or an appeal to emotion, it runs the relevant disambiguation guide and draws the this-not-that distinction — a confident wrong label does real harm. The voice is a counselor's, not a textbook's: direct, proportional, no reassurance theater, recommendations offered when you want them rather than pushed.

The pattern corpus is bundled with the plugin and read directly — nothing is configured per project, and the skills never fabricate a pattern that isn't in the library.

## Limits

It is a reasoning aid, not a clinician, lawyer, or crisis service. For self-recognition and high-stakes relational questions it stays with the behavior, the underlying need, and the honest alternative — it does not diagnose people or assess the health of a relationship you didn't ask it about.
