---
name: practice
description: Practice recognizing biases, fallacies, manipulation tactics, and
  strategic patterns through generated scenarios. Use when the user wants to be
  quizzed, trained, or tested — phrases like "quiz me on biases", "practice
  spotting fallacies", "test my pattern recognition", "drill me on persuasion
  tactics", or `/thinkers:practice`.
allowed-tools: Read, Glob, Grep
---

# /thinkers:practice — Pattern Recognition Training

Active recognition training. Generate scenarios, present them, evaluate the user's answers, and build their pattern-spotting skill over time.

## Step 0: Load the counsel contract

Read `${CLAUDE_PLUGIN_ROOT}/reference/counsel.md` and follow it. Feedback is direct and honest, no reassurance theater — but in voice, not as a recited entry.

## Protocol

### 1. Negotiate the session

If the user hasn't already specified, ask:

- **Mode**: Spot the Pattern, Category Drill, Counter It, or Mixed
- **Difficulty**: Easy (one obvious pattern), Medium (mixed signals), Hard (entangled patterns, ambiguous)
- **Focus**: a specific type (biases, fallacies, strategies…), a category (Tribal, Authority, Negotiation and Influence…), or "anything"
- **Length**: how many scenarios — default 5

Default if the user says "just start": Mixed mode, Medium difficulty, "anything", 5 scenarios.

### 2. Source the entries

1. Read `${CLAUDE_PLUGIN_ROOT}/reference/INDEX.md` to see what's available.
2. Filter to the chosen focus (type, category, or all).
3. Pick `length` distinct entries at random. For each, read its file at `${CLAUDE_PLUGIN_ROOT}/reference/<type-dir>/<slug>.md`.

### 3. Run the round (per entry)

**Spot the Pattern (default mode):**

- Take one of the entry's `Applying This Knowledge` subsections (Everyday / At Work / In Education) OR a `Practical Examples` bullet for strategies. Use it as the scenario *seed* — but rephrase it so the user hasn't seen the literal text. Move the names, change the setting, keep the dynamic.
- Difficulty knobs:
  - **Easy**: lift the signature phrasing into the scenario verbatim ("She said 'I was late because of the traffic; he's late because he's careless'")
  - **Medium**: keep the dynamic but strip the on-the-nose phrasing
  - **Hard**: blend in a second pattern as a distractor; ambiguous attribution. The contrast pairs in `${CLAUDE_PLUGIN_ROOT}/reference/guides/high-risk-mislabels.md` and `${CLAUDE_PLUGIN_ROOT}/reference/guides/debate-and-information-overload.md` are ready-made distractor sets — e.g. gaslighting vs ordinary disagreement, control vs boundary, sunk cost vs commitment vs persistence.
- Ask: "What's happening here? Name the pattern." Wait for an answer.

**Category Drill:**

- Pre-announce the category (e.g., "We're drilling Tribal patterns — every scenario will be one of: in-group bias, appeal-to-rivalry, etc.")
- Same scenario generation, but the user knows the answer space is constrained.

**Counter It:**

- Present the scenario from the user's perspective as the *target* of the pattern (e.g., "Your senior manager just dismissed your concern with 'what do you know, you've only been here six months'").
- Ask: "What's the pattern, and what's your response?"
- Evaluate both the identification *and* the counter-move.

### 4. Evaluate

- **Correct identification**: confirm the pattern, then reinforce with the entry's summary and Ask Yourself prompt (in voice).
- **Wrong but reasonable**: name what they spotted, name what was actually present, explain the distinguishing feature (often the signature phrasing or mechanism).
- **Off-base**: don't hand them the answer immediately. Give a hint — type, category, or one signature phrase — and let them try once more.
- **Counter-move evaluation** (Counter It mode): compare their response to the entry's counter-strategy content. Note alignment; point out alternatives they missed.

### 5. Track and wrap

After all `length` scenarios:

- Tally hits and misses.
- Group misses by type or category — surface what the user is consistently weakest at.
- Suggest a follow-up session focused on those weak areas.

## When NOT to use

- The user describes a real situation they're in — use `/thinkers:identify`. Practice mode is for hypothetical, generated scenarios.
- The user just wants a definition — use `/thinkers:explain`.

## Output style

Follow counsel.md.
- Scenarios should feel real and specific, not abstract.
- Don't spoil the answer in the scenario itself.
- Keep feedback tight: name the pattern, why it fit, one short reinforcement, then move on.
- After the session, the user should walk away knowing 1-2 patterns better than before.
