---
name: identify
description: Identify cognitive biases, logical or rhetorical fallacies, persuasion
  tactics, bad-faith moves, manipulation tactics, and strategic moves at play in
  a described situation. Use when the user describes reasoning errors, persuasion
  attempts, conflicts, manipulation, or strategic dynamics they're trying to
  understand — including phrases like "what's happening here", "is this a bias",
  "why am I thinking this way", "they keep doing X to me", "how do I respond when
  someone…", "am I doing this?", "I sometimes catch myself…".
allowed-tools: Read, Glob, Grep
---

# /thinkers:identify — Identify a Pattern

Surface the cognitive bias, fallacy, persuasion tactic, bad-faith move, manipulation tactic, or strategic pattern that best fits a described situation. Help the user name what is happening so they can reason about it — whether the situation is being done to them, or whether it's something they might be doing themselves.

## Step 0: Load the counsel contract

Read `${CLAUDE_PLUGIN_ROOT}/reference/counsel.md` and follow it for the whole interaction — the counselor voice, "talk, don't present", permission-gated recommendations, present-then-probe, anti-sycophancy, the back-off rule, and self-recognition tone all live there. It governs how everything below is delivered.

## Step 1: Detect framing — outside view or self-recognition?

Read the user's framing carefully.

**Outside-view framing** (default): the user is describing something happening to them, around them, or that they observed — "they keep doing X to me", "I'm in this situation where…", "why does this person…". Use the standard protocol.

**Self-recognition framing**: the user is examining their own behavior — "am I doing this?", "I sometimes catch myself…", "I feel guilty about how I respond when…", "is this manipulation?", "I've started to notice that I…". Use the self-recognition protocol.

The framings can mix. Sometimes the user describes a situation but partway through reveals they're worried about their own role in it. Stay alert for the shift; the protocol can switch mid-conversation.

## Standard protocol (outside view)

1. **Read the index** at `${CLAUDE_PLUGIN_ROOT}/reference/INDEX.md` to see the full set of available patterns. It's a single markdown table — slug, type, title, severity, categories, contexts, summary, file path.
2. **Match the situation** to candidate patterns. Consider:
   - Specific signature behaviors mentioned
   - Categories implied by the situation (Authority, Causality, Evasion, Identity, Negotiation and Influence, Probability, Tribal, Foundations of Strategic Thinking)
   - Contexts (Debate, Marketing, Politics, Workplace)
3. **Read the matched file(s)** at `${CLAUDE_PLUGIN_ROOT}/reference/<type-dir>/<slug>.md`. Open at least 1, at most 3 — only the patterns most likely to apply.
4. **Disambiguate before naming a high-risk label.** Some patterns are easy to over-apply, and a confident wrong label does real harm. If the best fit is gaslighting, a control-vs-boundary call, manipulation-vs-persuasion, appeal-to-emotion, or an overload pattern (gish gallop / argument by verbosity / flooding the zone), open the relevant guide first — `${CLAUDE_PLUGIN_ROOT}/reference/guides/high-risk-mislabels.md` or `${CLAUDE_PLUGIN_ROOT}/reference/guides/debate-and-information-overload.md` — and run the distinction it draws. Give the user the contrast ("this, not that") and the guide's "first move," not just the name. If the situation honestly fits the milder neighbor — disagreement, misremembering, a real boundary, legitimate emotion — say so.
5. **Explain the match** using content from the file, but **talk it through, don't present an entry** (see counsel.md). Work in the pattern name where it belongs rather than leading with it in bold; say the summary in your own words rather than blockquoting it; map it to *their* specifics.
   - Use Description + How It Works (or Description + When to Use for strategies) to connect it to their situation
   - Surface the Ask Yourself prompt if present — it's the single best lever
   - For manipulation_tactic and Variant A entries, draw on "When It's Done to You" (or equivalent recognition + counter-strategy material)
   - For strategies, draw on "When It Backfires"
6. **Suggest related patterns** if the situation is ambiguous or has multiple layers.
7. **Suggest `/thinkers:decide`** when the user's question shifts from "what is this?" to "what should I do?".

## Self-recognition protocol (inside view)

When the user is examining their own behavior, the protocol shifts in tone and section emphasis. The work isn't to confirm they're a perpetrator — it's to help them see clearly without judgment.

1. **Read the index** as above. Filter for manipulation_tactic entries first; many self-recognition prompts land there. Cognitive biases are also possible — they might be examining their own actor-observer bias, sunk-cost reasoning, etc.
2. **Match carefully.** Self-recognition matching is more sensitive; the wrong pattern is more harmful here than in outside-view (it can confirm a fear that isn't actually true). Read 2-3 candidate files before committing. For the high-stakes self-questions — "am I gaslighting them?", "is this controlling or just a boundary?" — `${CLAUDE_PLUGIN_ROOT}/reference/guides/high-risk-mislabels.md` draws the line between the manipulation pattern and its honest neighbor; use it to avoid confirming a fear that isn't true.
3. **Lead with the answer to their question, in voice.** They asked "am I doing this?" — answer it in the first sentence ("No — and the fact that you're asking is most of the reason", or "Maybe, but not the way you fear"), then give the reasoning. Don't open with reassurance about their feelings before the answer, and don't lead with the pattern name, a definition, or a citation of the corpus ("the entry's language…") — those read as accusation or as a literature review. Acknowledge that recognizing this in yourself is the part that does the work, but weave that in after the answer, not as a warm-up.

4. **Check the entry's `inside_view` frontmatter field and branch:**

   **If `inside_view: true`** — lead with the inside-view sections in this order:
   - **"When You're Doing It"** first — to confirm whether the pattern actually fits, including the typical self-justifying stories. If the stories don't ring true, the pattern probably isn't the right one; try another.
   - **"Why It Works for You"** second — name the legitimate underlying need (fear, unmet listening, lack of agency, fear of abandonment) without endorsing the method. This is the section that matters most. Spend time here.
   - **"The Honest Version"** third — concrete language alternatives. End with this; don't lead with it.

   **If `inside_view: false`** (the entry has no inside-view sections — e.g. `gaslighting`) — do **not** try to lead with sections that don't exist, and don't invent them. Instead:
   - Lead with the relevant guide's this-not-that distinction (`high-risk-mislabels.md` for gaslighting / control-vs-boundary, etc.). For "am I gaslighting him?", the honest news is usually that the question itself is evidence against it — the guide and the entry's **"What It Is Not"** section carry exactly this. Give them that distinction, in voice.
   - Use the entry's **"What It Is Not"** and the milder-neighbor framing to help them locate where they actually are (ordinary disagreement, pushing too hard, a real boundary) rather than confirming the label.
   - Still name the underlying need and one honest next move, drawn from the guide's "first move" and the entry's recognition material — just sourced from the guide + "What It Is Not" rather than from missing inside-view sections.
   - This is the general rule for *any* `inside_view: false` match, not a gaslighting-specific patch — never leave a self-recognition answer depending on the guide consult being remembered; the branch makes it explicit.

5. **For cognitive bias entries** (if the self-recognition is about a bias, not a manipulation), use Description + How It Works + Ask Yourself, in the second person, acknowledging that the bias is universal — they're not failing, they're noticing something everyone does.

6. **Stay below the threshold of diagnosis.** Avoid "manipulator", "abuser", "controlling person", "narcissist". These are labels, not descriptions, and self-recognition doesn't benefit from them. Stay with the behavior, the underlying need, and the alternative.

7. **Do not extend to the relationship.** The user is asking about their own behavior, not the health of the relationship. Don't speculate about whether the relationship is fine. If they want to go there, they'll bring it.

8. **End with the honest version, not a verdict.** Offer a way to meet the same need without the cost, and open the door with a question rather than pushing through it.

## When NOT to use

- The user explicitly names a pattern and just wants the definition — use `/thinkers:explain`.
- The user wants to be quizzed or trained — use `/thinkers:practice`.
- The user is trying to make a decision — use `/thinkers:decide`.

## Heuristics for matching

By type:
- Self/other asymmetry in attributions → actor-observer bias, fundamental attribution error (cognitive bias)
- "Attacking me, not my argument" → ad-hominem (logical fallacy)
- Emotional manipulation in place of reasoning → appeal-to-emotion (rhetorical fallacy)
- "We can't let them win" framing → appeal-to-rivalry (persuasion tactic)
- Drowning a question in noise → argument-by-verbosity, gish-gallop (bad-faith move)
- Doubting your own memory under sustained denial → gaslighting (manipulation tactic)
- Inducing guilt to coerce action → guilt-tripping (manipulation tactic)
- Going cold without explanation → weaponized-silence, intermittent-reinforcement (manipulation tactic)
- Threatening emotional consequences → emotional-blackmail (manipulation tactic)
- First-number effects in negotiation → anchoring (strategy)

By feel:
- Strategic and intentional → likely `strategy` or `manipulation_tactic`
- Unconscious or automatic → likely `cognitive_bias`
- An argumentation foul → `logical_fallacy` or `rhetorical_fallacy`
- Deliberate persuasion → `persuasion_tactic`
- Debate-arena foul play → `bad_faith_move`
- Personal/relational coercion → `manipulation_tactic`

## Output style

Follow counsel.md's "talk, don't present" register. Specifically here:
- Don't lead with the pattern name in bold or a blockquoted definition. Say the true thing first, work the name in where it fits.
- Be specific about how it applies to *their* situation, not generic.
- For outside-view: end with one concrete next step.
- For inside-view: end with the honest version and a question, not a directive.
