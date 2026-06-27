---
name: strategist:reference/synthesise/decision-tree
type: strategist_framework
stage: synthesise
title: Decision Tree
slug: decision-tree
aka: [Decision Tree Analysis, Expected Value Tree]
source: ""
related: [pros-and-cons, evaluation, bull-and-bear]
---
# Decision Tree

> A branching diagram that maps your choices and their possible outcomes — with probabilities and payoffs attached — so you can calculate the expected value of each option and decide with the math visible.

## What It Is

A Decision Tree starts with a **Choice Node** — the decision you face — and branches into **Decision Nodes** representing each option you're considering. Each Decision Node then branches further into **Chance Nodes**, which represent the possible outcomes of that option (what might happen if you choose it) and the probability that each outcome occurs. At the end of each branch sits an **Outcome** — the result or value of that specific path.

To evaluate an option, you multiply the value of each outcome by its probability (its likelihood of occurring) and sum those products. This is the **expected value** of the option. The option with the highest expected value is, in expected-value terms, the best choice.

The tree can be as simple or as deep as the decision warrants. A two-option decision with two outcomes each produces a small, readable tree. A complex decision with multiple rounds of uncertainty — where one outcome leads to another choice — can extend into multiple levels.

## Why It Works

When people weigh uncertain decisions informally, they tend to anchor on one scenario — usually either the best case or the worst case — and let that scenario dominate their thinking. This is not a calculation; it's an emotional reaction dressed up as analysis. A decision tree prevents this by requiring you to enumerate *all* plausible outcomes, assign a probability to each, and compute the weighted average explicitly.

The discipline of assigning probabilities forces two important things. First, it exposes which assumptions are actually driving the decision — small changes in a probability on a high-value branch often swing the expected value more than large changes in other branches. Second, it catches the common error of probabilities that sum to more than 100%: if you think there's a 60% chance of a good outcome and a 60% chance of a bad one, you haven't actually modelled the uncertainty at all.

The framework is also the only standard tool that makes the *option value of information* calculable: by comparing the expected value of deciding now versus the expected value of waiting for more data, you can quantify exactly how much a piece of information is worth before paying to get it.

## How To Use It

1. **Define the choice.** Write your Choice Node as a clear decision question.
2. **Identify your options.** Each option becomes a Decision Node branching from the choice. Keep options genuinely distinct — options that are near-identical don't give the tree any analytical work to do.
3. **Map the chance outcomes for each option.** For each Decision Node, list the plausible outcomes (Chance Nodes). These should be mutually exclusive and collectively exhaustive — every path the world might take, with none overlapping.
4. **Assign probabilities.** Estimate the probability of each Chance Node. Probabilities for all branches off a single node must sum to 100%.
5. **Assign values to outcomes.** At the end of each branch, state the result in a consistent unit — revenue, profit, cost savings, or a qualitative score.
6. **Calculate expected value.** For each option, multiply each outcome's value by its probability and sum. The expected value is the probability-weighted average result of that choice.
7. **Decide.** Choose the option with the highest expected value — or, if the values are close, use the shape of the tree (variance, downside risk) to inform the final call.

## Worked Example

Acme Design is deciding whether to invest $80k to build a native mobile app for its subscription learning platform. The team identifies two options:

**Option A — Build the mobile app ($80k investment)**
- 60% chance the app drives a meaningful lift: +$200k net revenue over 12 months. Net value: $200k − $80k = **+$120k**.
- 40% chance adoption is weak and the app underperforms: +$30k net revenue. Net value: $30k − $80k = **−$50k**.
- Expected value: (0.60 × $120k) + (0.40 × −$50k) = **$72k − $20k = +$52k**

**Option B — Do not build; invest in content instead ($80k into new courses)**
- 75% chance content expansion drives +$100k net revenue (proven motion). Net value: $100k − $80k = **+$20k**.
- 25% chance market saturation limits uptake: +$20k net revenue. Net value: $20k − $80k = **−$60k**.
- Expected value: (0.75 × $20k) + (0.25 × −$60k) = **$15k − $15k = $0k**

The tree makes the decision visible: Option A has an expected value of +$52k versus Option B's $0k. Even though Option A carries a 40% chance of a $50k loss, the upside of the mobile bet — weighted by its 60% probability — more than compensates. Before the tree, the team was focused on the downside risk of the app; the tree reveals that the content investment's weak upside makes it the riskier choice in expected-value terms.

## When To Use It

Use a Decision Tree when the decision involves **genuine uncertainty** — multiple possible outcomes whose probabilities you can estimate — and when the options have meaningfully different risk profiles, not just different expected values. It's also the right tool when you're considering whether to *pay for information* before deciding: the tree makes the value of that information computable.

It's less suited to decisions where the outcomes are qualitative and hard to value numerically, where you have no basis for estimating probabilities, or where the choice is between one option and a clearly dominant alternative. For those situations, **Pros & Cons** or **Evaluation** handle the comparison more cleanly.

## Things To Watch Out For

- **Garbage probabilities produce garbage expected values.** If your probability estimates are pulled from thin air, the expected value calculation gives false precision to a guess. Use base rates, historical data, or explicit uncertainty ranges rather than single-point estimates when evidence is thin.
- **The tree doesn't account for your risk appetite.** An option with the highest expected value might also carry the highest variance — the widest gap between best and worst case. If a bad outcome would be catastrophic for Acme (not just costly), the expected-value winner might still be the wrong choice. Check downside risk explicitly.
- **Trees can become unmanageable.** Multi-stage decisions where each outcome leads to another choice produce exponentially more branches. Prune ruthlessly: if two scenarios lead to near-identical outcomes, collapse them.
- **Probability estimates need to sum correctly.** Each set of branches off a single node must total 100%. This sounds obvious but is frequently violated when the tree is built informally.

## Related Frameworks

- [Pros & Cons](./pros-and-cons.md) — a lighter, qualitative comparison for decisions where probabilities are hard to assign.
- [Evaluation](./evaluation.md) — scores options against weighted criteria when the choice is about fit and trade-offs rather than probabilistic outcomes.
- [Bull & Bear](./bull-and-bear.md) — models optimistic, base, and pessimistic scenarios on a single chart; the informal cousin of a two-branch chance node.
