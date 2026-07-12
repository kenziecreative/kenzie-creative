# Strategist

**A structured strategic-thinking system by [Kenzie Creative](https://www.kenzienotes.com).**

Part of the Kenzie Creative marketplace. A standalone system — self-contained,
project-shaped, runs on its own.

Strategist turns Claude Code into a thinking partner that walks one problem through a
single repeatable loop, the Strategy Spine — **Define → Frame → Analyse → Insight →
Synthesise → Story → Move** — and at each step puts the right framework in front of you, helps you apply it to your
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

1. **Define** — establish the objective and the real question the strategy must answer.
2. **Frame** — construct the lens: choose the dimensions and perspectives to examine the problem through.
3. **Analyse** — interrogate the evidence behind each dimension.
4. **Insight** — surface what the analysis means: the non-obvious truths, patterns, and tensions.
5. **Synthesise** — build the insights into a coherent whole; reconcile tensions, prioritize, and set the through-line.
6. **Story** — shape the strategy into a narrative that lands and can be carried.
7. **Move** — translate the strategy into action: ownership, priorities, and the conditions for execution.

Each stage presents its frameworks, recommends the one that fits your situation, applies
it with you, and writes the result into the working document, `strategy/brief.md` —
readable end to end, with the full record of how you got there. From the Story stage on,
Strategist also produces `strategy/strategy-brief.md`: the clean, reader-facing strategy
brief, structured around the strategy with no process residue, for an exec or a partner.
`strategy/STATE.md` tracks where you are; the loop is resumable across sessions —
`/strategist:save` when you stop (it works mid-stage), `/strategist:resume` when you're
back, and the return picks up the thread, not just the position.

Two more documents keep the loop honest. A short **engagement charter**
(`strategy/CHARTER.md`), captured at setup, records the decision being made, who makes
it, the stakes, and the boundaries — and the loop checks the strategy against it before
you commit. The commitment gate at Synthesise makes sure the through-line stands against
real alternatives, runs the critic automatically before the decision locks (never
blocking — declining is your call, and it's noted), and writes a standing **decision
record** (`strategy/DECISION.md`): what was decided, what lost and why, the trade-offs
and risky assumptions, and what would reopen the question.

Behind the loop is a **library of 70 frameworks**, one markdown entry each, organised by stage. You can also reach any framework directly with
`/strategist:framework <name>`, inside a project or not.

## Commands

- `/strategist:init` — scaffold a strategy project (state, brief, config).
- `/strategist:define` … `/strategist:move` — the seven stages of the loop.
- `/strategist:framework <name>` — apply or explain any single framework on its own.
- `/strategist:pressure-test` — stress-test the current reasoning with the critic.
- `/strategist:progress` — see where you are in the loop and what's next.
- `/strategist:save` — wrap up a session (works mid-stage); `/strategist:resume` — pick
  the thread back up in a new one.

## The Critic

`/strategist:pressure-test` dispatches the `strategist-critic` — a subagent that attacks
your reasoning, not your evidence. It looks for unstated assumptions, logical gaps, weak
inferences, alternative framings, failure modes, and contradictions *between* stages (the
Analyse data pointing one way while Synthesise commits the other). It also flags two failure
modes specific to an AI thinking-partner: a **fabricated premise** (a feasibility, timing,
or cost claim the assistant inferred rather than you establishing it) and an
**agent-introduced keystone** (a framing the assistant added quietly becoming the spine).
It reports findings and records them; acting on them is your call, made back in the
relevant stage. If your thinking holds, it says so — it doesn't manufacture concerns.
The Synthesise commitment gate also runs the critic once automatically before the
decision locks; it never blocks, and if you wave it off, the brief simply says so.

## Getting Started

1. Install: `/plugin marketplace add kenziecreative/kenzie-creative`, then
   `/plugin install strategist@kenzie-creative`.
2. In a fresh project directory, run `/strategist:init` — give it your problem in a
   line and the shape of the engagement (the decision, who makes it, the stakes) in a
   few more.
3. Run `/strategist:define` and work the loop from there. Run `/strategist:progress` any
   time to see where you stand.

## Library

The framework library lives in `reference/`, organised by stage, with a master
`reference/INDEX.md`. Each entry is written to teach a newcomer: What It Is, Why It Works,
How To Use It, a concrete Worked Example, When To Use It, Things To Watch Out For, and the
original diagram. Standalone and readable on its own, framework by framework.
