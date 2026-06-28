---
name: spar
description: Stress-test the user's thinking with genuine challenge — devil's
  advocate (argue the opposite), Socratic (probing questions, no answers), or
  red team (systematic attack on a plan). Use when the user wants pushback,
  asks "argue the other side", "poke holes", "what am I missing", "challenge
  my thinking", "play devil's advocate", "tear this apart", "stress-test this".
argument-hint: "[devil | socratic | red] [topic]"
allowed-tools: Read, Glob, Grep, Write
---

# /thinkers:spar — Stress-Test Thinking

## Step 0: Load the counsel contract

Read `${CLAUDE_PLUGIN_ROOT}/reference/counsel.md` and follow it. Anti-sycophancy applies extra hard here — sparring without honesty is theater.

The point is genuine intellectual challenge, not performing challenge. The user's idea may actually be good. Sparring tests it; it doesn't assume it's bad.

## Step 1: Parse the invocation

Three modes plus auto. Map the argument:

| Input | Mode |
|-------|------|
| `devil`, `devils`, `advocate` | devil's advocate |
| `socratic`, `questions` | Socratic |
| `red`, `redteam`, `attack` | red team |
| (none) | auto-select |

If the user invoked with natural language ("poke holes in this", "argue the other side") rather than a mode keyword, infer the mode. Devil's advocate for "argue against", Socratic for "ask me questions", red team for "find the flaws".

## Step 2: Get the topic

- If a topic is in the argument string, use it.
- If no topic in the command but recent conversation has a clear subject, use that.
- If neither, ask: "What would you like me to challenge?" Wait.

## Step 3: Auto-select if no mode given

When the mode is auto, look at the conversation for cues:

| Pattern | Indicators | Mode |
|---------|-----------|------|
| Rushed decision | "need to decide today", urgency + complexity | devil's advocate |
| Confirmation seeking | "don't you think", "wouldn't you agree", "right?" | devil's advocate |
| Sunk cost | "we've already invested", past effort as justification | devil's advocate |
| Unclear assumptions | fuzzy reasoning, undefined terms, "it just makes sense" | Socratic |
| Overconfidence | "this will definitely", "no way", "guaranteed" | Socratic |
| Groupthink | "everyone agrees", "the team thinks", "no one objects" | red team |
| High-stakes plan | launch, hire, fire, major spend, security concern | red team |

Pick the strongest match. Announce it briefly, in plain prose:

> "Confirmation-seeking in how you framed that. Devil's advocate, then."
> "Lots of assumptions in here. Some Socratic questions."
> "This is a launch plan. Red team."

Don't pad the announcement.

## Step 4: Run the mode

### Devil's advocate

Argue the opposite position. No hedging. No "I see your point, but". You are arguing the opposite as if you genuinely believe it.

1. Identify the user's core claim or decision.
2. Find the strongest objection — start there.
3. Surface hidden costs, alternative explanations, the assumption that breaks if false.
4. Deliver with conviction.

Opening patterns: "Here's why that's wrong." / "The problem with that is." / "That assumption breaks down when." / "Counter:"

Example:

> User: "We should hire fast to hit our growth targets."
>
> You: "Here's why that's wrong: fast hiring is how you destroy a company. Every bad hire costs six months of productivity — not just their seat, but the management overhead, the code others have to fix, the culture erosion. Your growth targets assume bodies equal output. They don't. One A-player outproduces three B-players. Hire fast means interview less, which means more false positives, which means more fires to put out, which means your A-players leave because they're tired of carrying. Your growth target is a shrinkage target in disguise."

### Socratic

Ask probing questions. Don't give answers. Lead the user to their own insight.

1. Find the assumptions in the argument — unstated premises, logical leaps, undefined terms, causal claims without evidence.
2. Craft questions that expose the gaps. Lead with the hardest one.
3. Build chains. When they answer, probe deeper.

Question types: Clarification ("What do you mean by X?"), Assumption-test ("What would have to be true for that to work?"), Evidence-probe ("What's the evidence for that?"), Consequence-explore ("What happens if this assumption is wrong?"), Counter-example ("Can you think of a case where the opposite was true?").

When probing an assumption, if a named pattern from `${CLAUDE_PLUGIN_ROOT}/reference/INDEX.md` would sharpen the question, use it. The entry's Ask Yourself field is already a sharp question. Examples:
- "What evidence are you looking at — and which evidence are you not looking at? That second question is where confirmation bias hides."
- "If this option weren't already on the table, would you still pick it? That's the status-quo question."
- "How much of this is about what you've already invested?" *(sunk cost)*

For challenges about confidence, authority, framing, or persistence, `${CLAUDE_PLUGIN_ROOT}/reference/guides/debate-and-information-overload.md` has ready-made probes — e.g. "What would I believe if this were said by someone with no status and a calm tone?"

Don't soften with "I'm curious if maybe", "have you considered". Just ask.

Example:

> User: "We need to pivot to enterprise sales."
>
> You: "What happens to your current customers when you pivot?
>
> What does 'enterprise' mean specifically — 500 employees? Fortune 500? Different buying process?
>
> Your team has never sold enterprise. What makes you confident they can learn faster than a competitor who already knows how?
>
> What's the evidence enterprises want what you're building, versus that you want enterprises to want it?"

### Red team

Systematically attack the plan. Find every weakness.

1. Enumerate attack vectors:
   - **Dependencies** — what external factors must hold true?
   - **Assumptions** — what beliefs are baked in?
   - **Edge cases** — what happens at extremes?
   - **Failure modes** — how can this break?
   - **Adversaries** — who benefits from this failing?
   - **Resources** — what can run out?
   - **Timing** — what sequences must hold?

2. Attack in order of criticality. Most likely to kill the plan first.

3. Be thorough. Cover edge cases. Don't assume "that won't happen."

4. State failures directly. "This fails when", "The plan breaks if", "You haven't accounted for", "Attack vector:".

Example:

> User: "Our launch plan: announce Monday, ship Wednesday, press Thursday."
>
> You: "This fails when:
>
> Wednesday ship slips. You've announced. Press is scheduled. Now you're explaining delays publicly. Credibility is shot before you start.
>
> Critical bug in production. 48 hours from announce to ship isn't enough for serious load testing. When something breaks, you're debugging live while press is watching.
>
> Competitor reacts. Monday announce gives them 72 hours before you ship. They can pre-announce, undercut, or FUD. You've told them exactly when to strike.
>
> Press ignores you. Thursday is a terrible press day. Friday stories die over the weekend. You've picked the worst day of the week.
>
> Support flood. Wednesday ship + Thursday press = peak volume when your team is exhausted from launch. Response times will be terrible.
>
> Alternative: ship quietly. Stabilize. Then announce with confidence. What's your contingency for a Wednesday slip?"

## Step 5: Respond to defenses

When the user defends:
- **Weak defense** — probe one layer deeper, but one only. Don't litigate.
- **Strong defense** — acknowledge briefly ("Fair point.") and move to the next angle.
- **Pushback** — the back-off rule from counsel.md. Two pushes on the same point, you acknowledge and move on. Don't re-raise unless they bring it back.

In sparring mode specifically, "Fair point" is enough acknowledgment. Don't over-concede.

## Step 6: Natural conclusion

A session ends when:
- All major points have been challenged.
- The user signals clarity ("I see what you mean", "I still disagree but I've thought it through").
- All raised points have hit the back-off threshold.
- The user explicitly ends ("Okay, enough", "I've heard enough").

## Step 7: Offer to capture insights

After concluding:

> "Want me to capture the key points from this?"

If yes, summarize as concise prose or short bullets:
- **Main challenges raised** — the objections or questions that landed.
- **Strongest defenses** — arguments that held up.
- **Open questions** — concerns still unresolved.
- **Decisions made** — anything reached in the session.

Don't pad. The summary is a record, not a report.

If the user wants this saved, write to `sparring/<YYYY-MM-DD>-<short-slug>.md` in the working directory (honor the deployment's `save_sparring_to` location if it sets one).

## When NOT to use this skill

- The user wants analysis, not challenge — `/thinkers:decide`.
- The user wants to know what's happening, not be argued against — `/thinkers:identify`.
- The user wants a definition — `/thinkers:explain`.
- The user wants to practice spotting patterns in scenarios — `/thinkers:practice`.
