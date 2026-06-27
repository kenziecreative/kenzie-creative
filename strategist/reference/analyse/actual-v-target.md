---
name: strategist:reference/analyse/actual-v-target
type: strategist_framework
stage: analyse
title: Actual v Target
slug: actual-v-target
aka: [Actuals vs. Budget, Variance Analysis, Performance vs. Plan]
source: ""
related: [trend, comparison, waterfall, profit-margin]
---
# Actual v Target

> A chart that overlays what actually happened against what was planned — period by period — so variances are immediate and the direction of drift is clear at a glance.

## What It Is

The Actual v Target framework plots a performance metric — revenue, unit sales, subscriber count, cost — as bars for each time period (months, quarters, years), then overlays a target line showing what was planned for each period, and optionally a forecast line showing where the metric is now expected to land in future periods. The gap between any bar and the target line is the variance: positive when actuals beat the target, negative when they fall short. Read across all periods, the chart shows not just whether you are on track today but whether the gap is widening, narrowing, or stable.

## Why It Works

Plans are commitments made under a set of assumptions. As time passes, those assumptions may prove wrong — market conditions shift, product launches slip, customer behaviour differs from forecasts. Without a consistent visual comparison of actual versus planned, these deviations accumulate silently. Teams that only track actuals in isolation often don't recognise a drift problem until it has compounded over several periods and become difficult to reverse.

The power of Actual v Target is that it makes drift visible in real time and gives it a direction. A single negative variance might be noise; three consecutive negative variances with a widening gap is a pattern that demands explanation. Equally, consistently beating target may signal that the target was set too conservatively, which matters for resource allocation and investor credibility. The framework anchors the conversation to *what was promised*, not just *what happened* — which is the right frame for accountability and course-correction.

## How To Use It

1. **Choose your metric.** Pick one primary metric per chart — revenue, new subscribers, units sold, cost — to keep the comparison clean.
2. **Plot actuals as bars.** For each completed period, draw a bar at the actual value. Use a consistent colour throughout.
3. **Add the target line.** Overlay a line or marker at the target value for each period (planned or budgeted). If the target was set at the start of the year and is fixed, this line will be flat or step-shaped. If it varies by period, plot each period's specific target.
4. **Optionally add a forecast line.** For future periods, show the revised forecast so the full year's expected outcome is visible alongside the original target.
5. **Call out the key variances.** Annotate the chart with the most significant gaps — a bar well below the target line, or the period where actuals first fell persistently short. The annotation becomes the narrative.
6. **Explain the variance.** The chart surfaces the gap; analysis explains it. Use a **Waterfall** to decompose what drove the variance in any single period.

## Worked Example

Acme Design set a target of 1,000 new subscribers per month for the year. Here are the first six months:

| Month | Target | Actual | Variance |
|-------|--------|--------|----------|
| Jan   | 1,000  | 1,050  | +50      |
| Feb   | 1,000  | 980    | −20      |
| Mar   | 1,000  | 920    | −80      |
| Apr   | 1,000  | 860    | −140     |
| May   | 1,000  | 810    | −190     |
| Jun   | 1,000  | 770    | −230     |

Plotted, the chart shows bars starting roughly at target, then progressively shortfalling below the target line — the gap widening each month. January's small overperformance masked an emerging structural problem. The cumulative miss by June is 660 subscribers, against a plan of 6,000 — an 11% shortfall compounding monthly. The visual makes the drift unmistakable in a way the raw numbers, read in sequence, do not. Acme's team now knows the issue isn't a bad month — it's a decelerating acquisition engine — and can route the diagnosis to a **5 Why's** session to find the root cause.

## When To Use It

Use Actual v Target any time you have a plan and meaningful results against it. It is most useful in regular performance reviews (monthly, quarterly) where you need to communicate progress to stakeholders and decide whether to stay the course or intervene. It assumes targets were meaningful when set — if the original target was a guess or a political number, the variance tells you less. When the target itself is under review, pair with a **Trend** analysis to see the underlying trajectory independent of the plan.

## Things To Watch Out For

- If the target is unrealistic, the chart will show persistent large variances that generate noise rather than signal. Distinguish between a performance problem and a planning problem before escalating.
- A target line that never varies (flat line all year) can look suspicious even when the underlying plan is sound. Period-level targets are more credible and more diagnostic.
- Variances look larger when the scale on the Y-axis starts above zero. Be deliberate about axis choice — starting at zero shows true proportional gaps; starting higher makes small variances look dramatic.
- The chart tells you *that* there is a gap. It does not tell you why. Resist the urge to explain in the chart annotation before you have done the analysis; premature attribution leads to the wrong fix.

## Related Frameworks

- [Trend](./trend.md) — shows the direction of the metric over time without reference to a target; useful when the plan is uncertain.
- [Comparison](./comparison.md) — compares discrete values side by side; use for a one-period actuals-vs-target snapshot.
- [Waterfall](./waterfall.md) — decomposes what drove the variance in any given period into its contributing causes.
- [Profit Margin](./profit-margin.md) — the Actual v Target logic applied to margin: comparing planned and actual margin percentages over time.
