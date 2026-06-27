# Define

*Establish the objective and the real question. Refuse the question as handed until you've checked it's the right one.*

Define is the first stage of the Strategy Spine, and it runs on Exploring: the opening move is investigation, not assertion. For where Define sits in the spine and why, see the [Strategy Spine overview](../README.md). This page covers what the stage produces, how to choose among its tools, and how it runs.

## What it produces

A single, answerable question and a concrete definition of what success looks like. Recorded in `strategy/brief.md` under Define.

The stage is done when:

- **The strategy has one clear question, not a vague topic.** "Should we enter the SMB market, and on what basis?" is a question. "Growth strategy" is a topic.
- **Success is defined concretely** — you would know it if you hit it.
- **You have challenged the question as handed** rather than accepting the first framing. The problem as stated is rarely the problem worth solving.
- **The decision-maker and the real constraints are named,** not assumed away.

## Choosing the tool

Define holds 3 frameworks. They are three ways to do one thing — sharpen a messy problem into a question worth answering. You usually run one. Pick by how the problem arrives.

- [SCQ](scq.md) — when you have a tangled situation and need to compress it to one answerable question. Situation, Complication, Question.
- [HTDQ](htdq.md) — when you want to frame the problem as a quest, so the urgency and direction are vivid. Hero, Treasure, Dragon, Quest.
- [Outcome](outcome.md) — when the problem is high-stakes and you need to interrogate it from every angle (decision-maker, success criteria, forces, constraints, accuracy) before any work begins.

A common pattern: SCQ or HTDQ to find the question fast, then Outcome as a checklist to make sure nothing critical was assumed away.

## How it runs

The `strategist-stage` skill runs this stage. Starting from the problem as the user states it, it:

1. Frames the problem with the chosen tool, pushing past the surface statement to the real question.
2. Defines what success would look like, concretely enough to test the final strategy against.
3. Records the framed objective and question in `strategy/brief.md` under Define.
4. Advances `strategy/STATE.md` to Frame once the question and success definition clear the bar above.

The loop runs backward when it has to. Every later stage can send you back here: if Analyse or Synthesise reveals you framed the wrong question, Define is where you return.
