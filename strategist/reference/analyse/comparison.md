---
name: strategist:reference/analyse/comparison
type: strategist_framework
stage: analyse
title: Comparison
slug: comparison
aka: [Bar chart, Column chart, Horizontal bar chart]
source: ""
related: [trend, rank, mix, waterfall, actual-v-target]
---
# Comparison

> A chart that places discrete values side by side so the differences between them are immediately readable — the default tool for answering "which is bigger and by how much?"

## What It Is

A Comparison chart is an Analyse-stage visual that shows two or more values as separate bars so they can be read against each other directly. It comes in two main orientations:

- **Vertical (column) bar chart:** categories on the x-axis, values on the y-axis. Best when you have a small number of items or when the category labels are short.
- **Horizontal bar chart:** categories on the y-axis, values on the x-axis. Better for longer category labels, many items, and when ranking is implied (the longest bar reads naturally as the leader).

The defining characteristic is that each bar is independent — its length represents its own value, not a portion of a whole or a movement over time.

## Why It Works

When values are listed in a table, comparing them requires mental arithmetic. The eye has to jump between cells, hold numbers in working memory, and compute the difference. A bar chart offloads that work to visual perception: the human eye reads relative bar lengths almost instantaneously and with high accuracy, especially when bars share a common baseline at zero.

This is why a Comparison chart is so often the right first chart to reach for. It converts "which is bigger?" from a cognitive task into a perceptual one. The larger the difference, the more obvious it is; even subtle differences become visible when bars sit adjacent to each other.

The Comparison chart also implies a ranking even when the bars are not sorted — the eye naturally identifies the longest and shortest bar. For this reason, sorting bars from longest to shortest almost always makes the chart more readable and the story clearer.

## How To Use It

1. **Define the axis of comparison.** What are you comparing? (Products, regions, competitors, time periods, channels.) Each becomes a bar.
2. **Choose orientation.** Use vertical bars for four or fewer items with short labels. Use horizontal bars for five or more items, long labels, or when ranking is the story.
3. **Start the value axis at zero.** Truncating the y-axis exaggerates differences. The baseline must be zero so bar lengths represent true proportions.
4. **Sort where it helps.** If the order is not intrinsically meaningful (e.g. not alphabetical or chronological), sort from largest to smallest so the ranking is implicit.
5. **Add the delta.** For two-bar comparisons, annotate the difference directly on the chart (e.g. "+22 percentage points") so the reader doesn't have to subtract.
6. **Label sparingly.** Add data labels when the exact values matter; skip them when the relative size is the point.

## Worked Example

Acme Design's marketing team ran three acquisition channels simultaneously in Q3: paid search, social media ads, and content/SEO. At the end of the quarter, they pulled conversion rates for each channel:

| Channel | Conversion Rate |
|---------|----------------|
| Content/SEO | 4.8% |
| Paid search | 3.1% |
| Social media ads | 1.4% |

A horizontal bar chart, sorted from longest to shortest, made the story impossible to miss: content/SEO converted at more than three times the rate of social media ads. The paid search and social budgets combined were larger than the content budget, yet the lowest-converting channel was absorbing the most spend. Without the visual comparison, the team had been reading these three numbers in a summary table where the difference looked like a rounding matter. The chart made the reallocation case in a single glance.

## When To Use It

Reach for a Comparison chart whenever the core question is *how do these specific values differ from each other?* — channel performance, competitor pricing, year-on-year revenue by product line, headcount by department. It is the right choice when the categories are discrete and the comparison itself is the insight.

Use a vertical bar chart when you have two values and want to emphasize the contrast (A vs. B). Use a horizontal bar chart when you have many items and ranking matters. If you need to show how values change across time rather than categories, switch to a **Trend** chart. If you want to show the relative size of segments within a whole, switch to a **Mix** chart. If the number of items is large and position in a hierarchy matters more than raw value, switch to a **Rank** chart.

## Things To Watch Out For

- **Non-zero baselines are the most common form of chart manipulation.** A bar chart with a y-axis starting at, say, 40% makes a 5 percentage-point gap look enormous. Always start at zero; if zero is impractical, use a dot or line plot instead.
- **Too many bars blur the point.** More than seven or eight bars on a single chart typically signals that you have a ranking or distribution question, not a comparison question. Consider using a **Rank** or **Distribution** chart.
- **Comparing unlike units.** Bars on the same chart must represent the same unit. Mixing absolute revenue with growth rates on a single axis produces a chart that cannot be read correctly.
- **Ignoring context.** A bar that is "bigger" is only meaningful relative to something — a baseline, a target, a competitor, a prior period. Provide that context either through annotation or by adding a reference line.
- **Color overload.** Using a different color for every bar draws attention to the categories rather than the differences. Use one consistent color with a highlight color reserved for the bar you want the reader to focus on.

## Related Frameworks

- [Trend](./trend.md) — use when the axis is time rather than discrete categories.
- [Rank](./rank.md) — shows the order of items across time, emphasizing position changes rather than absolute values.
- [Mix](./mix.md) — shows each category as a proportion of a whole rather than an independent absolute value.
- [Waterfall](./waterfall.md) — shows how a sequence of changes build from a start to an end total.
- [Actual v Target](./actual-v-target.md) — overlays a target line on bars to show performance gaps directly.
