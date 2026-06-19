# Strategist

**A structured strategic-thinking system by [Kenzie Creative](https://www.kenzienotes.com).**

Part of the Kenzie Creative marketplace. A standalone system — self-contained,
project-shaped, runs on its own.

Strategist turns Claude Code into a thinking partner that walks one problem through a
single repeatable loop — **Define → Split → Analyse → Insight → Story → Decide → Act** —
and at each step puts the right framework in front of you, helps you apply it to your
actual situation, and captures the result. You get two documents: a working record of how
the strategy was built, and a clean reader-facing brief for the people you need to move. A
critic can pressure-test your reasoning whenever you want it.

The result isn't a generic SWOT or a blank template. It's a worked strategy — your
problem, taken through the stages, with the thinking captured as you go and stress-tested
before you commit.

## Why I Built This

Good strategic thinking isn't a single framework — it's knowing *which* framework the
moment calls for, and actually working through it instead of nodding at it. I had a shelf
of frameworks and no system for moving from a blank problem to a decision I trusted.

So I built the loop. Seven stages, each with a library of frameworks behind it, and a
state machine that remembers where you are so you can put it down and pick it back up.
The frameworks do the structuring; the loop keeps you honest about doing every step; the
critic catches the assumptions you can't see from inside your own argument.

— **Kelsey**

## How It Works

Strategist is one loop with seven stages. You work them in order, and you iterate — a
later stage can send you back to revise an earlier one.

1. **Define** — frame the problem before solving it. *(SCQ, HTDQ, Outcome)*
2. **Split** — decompose the problem into its drivers. *(Driver Tree, Bucketing, Hypothesis)*
3. **Analyse** — interrogate the data behind each driver. *(18 chart & reasoning frameworks)*
4. **Insight** — turn analysis into a visual that carries the finding. *(25 layouts)*
5. **Story** — assemble the pieces into a narrative that lands. *(Minto, MECE, SCQA, StoryBrand…)*
6. **Decide** — weigh the options and commit. *(Eisenhower, Decision Tree, Bezos, SPADE…)*
7. **Act** — turn the decision into an executable plan. *(Execution Plan, GTM Stack…)*

Each stage presents its frameworks, recommends the one that fits your situation, applies
it with you, and writes the result into the working document, `strategy/brief.md` —
readable end to end, with the full record of how you got there. From the Story stage on,
Strategist also produces `strategy/strategy-brief.md`: the clean, reader-facing strategy
brief, structured around the strategy with no process residue, for an exec or a partner.
`strategy/STATE.md` tracks where you are; the loop is resumable across sessions.

Behind the loop is a **library of 70 frameworks**, one markdown entry each with an
embedded diagram, organised by stage. You can also reach any framework directly with
`/strategist:framework <name>`, inside a project or not.

## Commands

- `/strategist:init` — scaffold a strategy project (state, brief, config).
- `/strategist:define` … `/strategist:act` — the seven stages of the loop.
- `/strategist:framework <name>` — apply or explain any single framework on its own.
- `/strategist:pressure-test` — stress-test the current reasoning with the critic.
- `/strategist:progress` — see where you are in the loop and what's next.

## The Critic

`/strategist:pressure-test` dispatches the `strategist-critic` — a subagent that attacks
your reasoning, not your evidence. It looks for unstated assumptions, logical gaps, weak
inferences, alternative framings, failure modes, and contradictions *between* stages (the
Analyse data pointing one way while Decide commits the other). It also flags two failure
modes specific to an AI thinking-partner: a **fabricated premise** (a feasibility, timing,
or cost claim the assistant inferred rather than you establishing it) and an
**agent-introduced keystone** (a framing the assistant added quietly becoming the spine).
It reports findings and records them; acting on them is your call, made back in the
relevant stage. If your thinking holds, it says so — it doesn't manufacture concerns.

## Getting Started

1. Install: `/plugin marketplace add kenziecreative/kenzie-creative`, then
   `/plugin install strategist@kenzie-creative`.
2. In a fresh project directory, run `/strategist:init` and give it your problem in a
   line.
3. Run `/strategist:define` and work the loop from there. Run `/strategist:progress` any
   time to see where you stand.

## Library

The framework library lives in `reference/`, organised by stage, with a master
`reference/INDEX.md`. Each entry is written to teach a newcomer: What It Is, Why It Works,
How To Use It, a concrete Worked Example, When To Use It, Things To Watch Out For, and the
original diagram. Standalone and readable on its own, framework by framework.
