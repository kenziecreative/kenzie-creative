---
name: strategist:reference/synthesise/spade
type: strategist_framework
stage: synthesise
title: SPADE
slug: spade
aka: [SPADE Decision Framework, Square Decision Framework]
source: "Gokul Rajaram, Square's Framework for Difficult Decisions, via First Round Review"
related: [evaluation, bezos, abcd, pros-and-cons]
---
# SPADE

> A five-step framework for making high-stakes decisions collaboratively — defining the setting, assembling the right people, generating real alternatives, deciding through private vote, and explaining the outcome so everyone commits.

## What It Is

SPADE is an acronym for the five stages of a structured decision process designed for difficult, high-stakes choices:

- **Setting:** Precisely describe *what* the decision is, *why* it matters, and *when* it must be made. The Setting is the problem statement — it should be specific enough that two people reading it independently would be deciding the same thing.
- **People:** Identify who is involved and in what role. SPADE distinguishes three: those who are **Consulted** (their input informs the decision), those who **Approve** (they have veto power, to be used sparingly), and the person **Responsible** (who owns and executes the final decision).
- **Alternatives:** Generate the options — each of which must be **Feasible** (realistic to execute), **Diverse** (genuinely different from each other), and **Thorough** (broad enough to cover the real option space). For each alternative, describe its reasoning and its trade-offs.
- **Decide:** Collect votes *privately* from the relevant people, then the Responsible person reviews the votes and makes the call. Private voting prevents anchoring: people state their true view before they see anyone else's.
- **Explain:** The Responsible person articulates the rationale for the decision, gets the Approver's buy-in, and secures commitment from all stakeholders. This step closes the loop — the decision doesn't end at the choice; it ends when everyone understands it and has pledged to act on it.

## Why It Works

Most group decisions fail at one of three points: the alternatives aren't genuinely different (so the decision is really just a false choice between near-identical options), the loudest person anchors the group before others have formed independent views (so the "collective" decision is actually one person's view with social proof), or the decision is announced without sufficient explanation and stakeholders feel bypassed (so commitment is shallow and execution drags).

SPADE addresses all three. The **Alternatives** step requires diversity and thoroughness, which catches the false-choice trap. The **private vote** is the key structural innovation: by collecting votes before discussion, SPADE prevents the HiPPO effect (Highest Paid Person's Opinion) — the phenomenon where seniority rather than quality of reasoning drives consensus. And the **Explain** step treats commitment as a deliberate act, not a side effect of announcing the answer.

The framework is also honest about ownership. Many group processes are ambiguous about who actually decides. SPADE names a single Responsible person and reserves Approve as a sparingly-used veto rather than a default rubber stamp. This creates accountability without excluding input.

## How To Use It

1. **Setting.** Write the decision question precisely. Add: why this decision matters (the stakes), and the deadline (when the window closes). Review the Setting with a critical eye — if it's ambiguous, you will generate alternatives to the wrong question.
2. **People.** List the Consult people (whose expertise or perspective is needed to form good alternatives), the Approve person (typically a senior stakeholder or executive — ideally just one), and the Responsible person (typically the decision owner closest to the problem).
3. **Alternatives.** Generate at least three distinct options. For each: name it, describe the case for it, and state the main trade-off or risk. Apply the Feasible / Diverse / Thorough test: Could we actually do this? Is this genuinely different from the other options? Have we covered the real option space?
4. **Decide.** Send the Setting, People, and Alternatives to the Consult group and ask each person to vote privately — their preferred alternative and their reasoning. Collect all votes before sharing any. The Responsible person then reviews the votes, weighs the reasoning, and makes the decision.
5. **Explain.** Write up the decision: what was chosen, the alternatives that were not chosen and why, and the key reasoning. Present this to the Approver for sign-off (veto only if there's a material issue), then share with all stakeholders and ask for explicit commitment to execute.

## Worked Example

Acme Design needs to decide how to handle a growing backlog of customer support tickets. The current system — a shared inbox managed by two part-time contractors — is breaking down; median response time has slipped from 6 hours to 48 hours, and churn surveys consistently cite support quality as a top-three pain point.

**Setting:**
- *What:* Should Acme restructure its customer support function to bring median response time below 8 hours and reduce support-related churn?
- *Why:* Support quality is now cited in 28% of cancellation surveys. At current churn rates, this costs Acme approximately $18k MRR annually.
- *When:* Decision required by end of Q2 to allow implementation before the autumn content launch.

**People:**
- *Consult:* Head of Content (understands customer pain points), two affected contractors (operational realities), a part-time CS advisor (industry benchmarks).
- *Approve:* CEO (budget authority).
- *Responsible:* Head of Operations.

**Alternatives:**
1. *Hire a full-time Customer Success Manager ($70k/yr):* Deepens human relationship; can triage and escalate. Trade-off: fixed cost, 60-day hiring timeline.
2. *Implement a help centre + AI chat deflection (Intercom, ~$12k/yr):* Fast to deploy, handles 40–60% of tickets automatically. Trade-off: cold experience for complex issues; doesn't fix human escalation path.
3. *Outsource to a specialist edtech support vendor ($25k/yr):* Fast to launch; vendor has existing playbooks. Trade-off: less brand control; variable quality.

**Decide:** Private votes collected: the CS advisor and Head of Content favour Option 2 (fast and cost-efficient); the two contractors favour Option 3 (they have experience with vendors). The Head of Operations, reviewing all votes and reasoning, chooses **Option 2 + a lightweight escalation path** — implement Intercom for tier-1 deflection, retain one contractor for escalated human support at reduced hours. Expected blended cost: ~$16k/yr.

**Explain:** Decision shared with the CEO, who approves. Written rationale distributed to all stakeholders with implementation milestones. Both contractors formally acknowledge the new model and commit to the escalation protocol.

## When To Use It

Use SPADE for decisions that are high-stakes enough to warrant structured deliberation, involve multiple stakeholders with different perspectives, and risk being derailed by anchoring or unclear ownership. It maps naturally to **ABCD** A-category decisions (high impact, novel) and **Bezos** Type I decisions (consequential and hard to reverse).

It's too heavy a framework for fast-moving operational choices or decisions a single person can and should own independently. Don't SPADE a two-way door.

## Things To Watch Out For

- **The Setting drifts.** If the Responsible person rewrites the decision question partway through — adding scope, changing the deadline — the alternatives may be answering a different question than the one the Consult group weighed in on. Lock the Setting before moving to Alternatives.
- **Private voting isn't truly private.** If the Responsible person collects votes verbally in a meeting, anchoring still happens. Written, asynchronous voting is the mechanism that makes the private-vote step actually work.
- **Too many Approvers.** SPADE works best with a single Approver whose veto power is used sparingly. Multiple Approvers creates a committee structure where each one expects to shape the outcome, which reintroduces the very dynamic SPADE is designed to avoid.
- **Skipping Explain.** Announcing the decision without the Explain step leaves stakeholders without the reasoning they need to commit confidently. Execution suffers when people don't understand *why* a decision was made — they fill the gap with their own interpretation, which may or may not support the chosen path.

## Related Frameworks

- [Evaluation](./evaluation.md) — a weighted scoring matrix useful for structuring the Alternatives step when options need to be compared across multiple criteria.
- [Bezos](./bezos.md) — the first filter: determines whether a decision warrants SPADE-level process (Type I / one-way door) or can be handled with a lighter touch.
- [ABCD](./abcd.md) — categorises decisions by scope/impact and familiarity; SPADE is the right process for A-category decisions.
- [Pros & Cons](./pros-and-cons.md) — a lighter alternative for decisions that don't require the full SPADE governance structure.
