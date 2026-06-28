# Editorial Standard

This is the quality bar for entries in `reference/`. The goal is consistent usefulness, not identical length or identical section structure. A complete entry helps someone understand a pattern, recognize it in context, avoid over-labeling it, and act more cleanly because they understand it.

## Core Promise

Every entry should help a user answer five questions:

1. What is happening?
2. What mechanism makes it work?
3. How would I recognize it in myself, someone else, or a system?
4. What is the nearest legitimate or non-harmful version?
5. What should I do with the recognition?

If an entry only defines the term, it is not complete enough for this toolkit.

## Minimum Entry Requirements

Every entry should include:

- A plain-language summary in the blockquote below the title.
- A `Description` that defines the pattern and its boundaries.
- A mechanism section: `How It Works` for biases, fallacies, persuasion, bad-faith moves, and manipulation tactics; `Mechanism` or a mechanism paragraph inside `Description` for strategies.
- Recognition cues: signature phrasing, behavioral tells, decision cues, or situational triggers.
- A user-facing reflection question.
- A false-positive guard: what this pattern is not, when the label is too strong, or the legitimate cousin.
- A practical response: counter-move, honest version, decision prompt, boundary, or repair move.
- Related patterns that are specific, not generic.

## Metadata Requirements

Frontmatter should support lookup and filtering:

- `type`: one of the seven taxonomy types.
- `title`: human-readable name.
- `slug`: filename-compatible slug.
- `severity`: use for every non-strategy entry; add to strategy entries where the strategy can cause harm or serious consequences.
- `categories`: use stable conceptual categories.
- `contexts`: fill when the pattern has common use contexts.
- `related`: only include related entries that exist.
- `inside_view`: use on manipulation tactics when the entry includes safe self-recognition material.

Strategy entries currently have the most metadata gap. They should gain contexts and better related links during the enrichment pass.

## Recommended Shapes

The shapes below are defaults, not cages. Some concepts need a different structure because they do different jobs. Cognitive biases often need self-recognition and evidence calibration. Game-theory concepts often need model setup, players, incentives, equilibrium logic, and translation limits. Applied strategies need use conditions and ethical boundaries.

The editorial test is: does this shape help the user think more accurately about this kind of concept?

### Cognitive Bias

Use this shape when revising bias entries:

- `Description`
- `How It Works`
- `Recognition Cues`
- `Signature Phrasing`
- `Ask Yourself`
- `Common False Positives`
- `What Helps`
- `Related Patterns`

Emphasis: normalize the bias without excusing it. The user should feel invited to check their mind, not accused of being irrational.

Bias entries should usually emphasize:

- The mental mechanism: attention, memory, motivation, identity, probability, affect, or social reward.
- The inside-view feel: what the bias sounds like in your own head.
- Conditions that strengthen the bias.
- A debiasing move that is practical rather than magical.
- Evidence status when the concept is contested, over-popularized, or often misused.

### Logical Fallacy

Use this shape when revising logical fallacies:

- `Description`
- `How It Works`
- `Signature Phrasing`
- `Ask Yourself`
- `Common False Positives`
- `How to Respond`
- `Related Patterns`

Emphasis: distinguish flawed reasoning from bad intent. A fallacy can be a mistake, a habit, or a tactic.

### Rhetorical Fallacy

Use this shape when revising rhetorical fallacies:

- `Description`
- `How It Works`
- `Signature Phrasing`
- `Ask Yourself`
- `What It Is Not`
- `How to Respond`
- `Related Patterns`

Emphasis: show the shift in frame, burden, emotion, standard, or target.

### Persuasion Tactic

Use this shape when revising persuasion tactics:

- `Description`
- `How It Works`
- `Signature Phrasing`
- `Ask Yourself`
- `Legitimate Cousin`
- `When It Becomes Manipulative`
- `How to Respond`
- `Related Patterns`

Emphasis: keep the ethical distinction alive. Persuasion is not automatically manipulation.

### Bad-Faith Move

Use this shape when revising bad-faith moves:

- `Description`
- `How It Works`
- `Signature Phrasing`
- `Ask Yourself`
- `What It Avoids`
- `How to Respond`
- `Related Patterns`

Emphasis: name the move, restore the conditions for fair exchange, avoid diagnosing the person.

### Manipulation Tactic

The existing manipulation-tactic entries are closest to the desired standard. Preserve this shape:

- `Description`
- `How It Works`
- `Signature Phrasing`
- `Ask Yourself`
- `When It's Done to You`
- `When You're Doing It` when safe
- `Why It Works for You` when safe
- `The Honest Version` when safe
- `Related Patterns`

Outside-view-only entries are appropriate when inside-view treatment would become instructional in a harmful way.

### Strategy

Use this shape when revising strategy entries:

- `Description`
- `Mechanism`
- `When to Use`
- `When It Backfires`
- `Ethical Boundary`
- `Practical Examples`
- `Decision Prompt`
- `Related Patterns`

Emphasis: strategies should teach discernment, not domination.

Strategy is the broadest type, so it needs sub-shapes.

#### Applied Strategy

For deliberate practices such as BATNA, boundary setting, OODA, scenario analysis, or resource management:

- `Description`
- `Mechanism`
- `When to Use`
- `When It Backfires`
- `Ethical Boundary`
- `Practical Examples`
- `Decision Prompt`
- `Related Patterns`

These entries should help a user decide whether and how to apply the tool.

#### Game-Theory Model

For concepts such as Nash equilibrium, Prisoner's Dilemma, Stag Hunt, dominant strategy, minimax, mixed strategies, Stackelberg leadership, public goods, dollar auction, and war of attrition:

- `Description`
- `Model Setup`
- `Mechanism`
- `What It Explains`
- `Where People Misread It`
- `Real-World Translation`
- `Decision Prompt`
- `Related Patterns`

These entries should help a user understand incentives and interaction structures. They should not imply that human beings are always clean utility maximizers or that the model captures the whole situation.

#### Ethical or Philosophical Frame

For concepts such as the Golden Rule, categorical imperative, utilitarianism, veil of ignorance, and social contract:

- `Description`
- `Core Test`
- `What It Helps You See`
- `Where It Breaks Down`
- `Practical Use`
- `Decision Prompt`
- `Related Patterns`

These entries should clarify moral reasoning rather than flatten ethics into tactics.

#### Descriptive Social Pattern

For concepts such as groupthink, herd behavior, Peter principle, impostor syndrome, tragedy of the commons, and Abilene paradox:

- `Description`
- `How It Forms`
- `Recognition Cues`
- `What Sustains It`
- `What Helps`
- `False Positives`
- `Related Patterns`

These entries should help the user recognize a system pattern without assuming everyone involved is acting strategically.

## Related Pattern Standards

Related links are part of the teaching system. They should not be generic filler.

Good related links answer one of these:

- What pattern is commonly confused with this?
- What pattern often appears alongside this?
- What pattern explains the mechanism underneath this?
- What pattern is the counter-move or ethical alternative?
- What pattern is the same concept viewed through another taxonomy lens?

Avoid repeating the same related list across large batches of entries. If the relation is not specific enough to explain in one sentence, it probably should not be listed.

## False-Positive Guards

Each enriched entry should prevent over-labeling.

Examples:

- Gaslighting is not ordinary disagreement, imperfect memory, or a single defensive denial.
- Boundary setting is not controlling someone else's behavior.
- Appeal to emotion is not every argument that includes emotion.
- Confidence is not automatically an authority play.
- Persistence is not automatically sunk-cost reasoning.

False-positive guards are essential because the toolkit gives users powerful language. The entry should teach the restraint that makes the language useful.

## Evidence Status

Some entries are well-established research findings. Some are contested. Some are folk labels, rhetorical concepts, book-derived frameworks, or strategic models.

Add an evidence note during later enrichment when useful:

- `Evidence status: robust`
- `Evidence status: mixed`
- `Evidence status: contested`
- `Evidence status: conceptual`
- `Evidence status: practitioner model`

This is especially important for psychology entries where replication or popular misuse matters.

## Tone

The voice should be clear, humane, and practical.

Avoid:

- Diagnostic labels for people.
- Moral panic.
- Over-certainty from thin evidence.
- Advice that makes users paranoid.
- Tactical instruction that teaches manipulation better than defense.

Prefer:

- Behavioral descriptions.
- Mechanism-level explanation.
- Concrete recognition cues.
- Honest alternatives.
- Questions that return agency to the user.

The ideal effect: more perception, less paranoia; more agency, less coercion; more self-awareness, less self-condemnation.
