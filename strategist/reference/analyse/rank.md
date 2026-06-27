---
name: strategist:reference/analyse/rank
type: strategist_framework
stage: analyse
title: Rank
slug: rank
aka: [Bump chart, Ranking chart, Rank movement chart]
source: ""
related: [comparison, cumulative, trend, scatter]
---
# Rank

> A chart that tracks the changing position of multiple items across a series of time periods — so you can see not just who is winning, but who is gaining and who is losing ground.

## What It Is

A Rank chart is an Analyse-stage visual that shows the **ordinal position** of several items (products, companies, markets, channels) across a set of discrete time periods. Each item's rank in each period is plotted as a point, and points for the same item are connected across periods to show movement. The chart reads left to right across time, and position 1 is typically shown at the top.

Unlike a **Comparison** chart — which shows the absolute value of each item at one point in time — a Rank chart strips away the absolute values and focuses entirely on order. What you see is not *how much* each item has but *where it stands relative to the others*, and how that standing has changed.

The key visual elements are:

- **Start position** (leftmost column) — where each item ranked at the beginning of the analysis period.
- **End position** (rightmost column) — where each item ranks now.
- **Lines between periods** — the slope of a line tells the story: steep upward lines mean fast gains; crossing lines mean two items swapped positions; flat lines mean stability.
- **Annotations at end points** — optionally, the reasons for notable moves are described beside the final position.

## Why It Works

Absolute revenue tables tell you who is biggest; they don't tell you who is *gaining*. A company at position 4 that was position 8 two years ago is a very different strategic concern than a company at position 4 that was position 2. Both look the same in a snapshot bar chart.

A Rank chart works because it makes **trajectory visible**. The crossing lines, the steep climbers, the steady decliners — these are the strategic facts that matter for competitive analysis, product portfolio decisions, and market monitoring. A position number in isolation is a fact; a rank movement across time is a signal.

The chart is particularly effective because the eye is extremely good at tracking line crossings and slope differences. A competitive chart with five companies plotted across eight quarters makes every overtake and every widening gap immediately legible — information that would require eight separate bar charts and considerable mental effort to reconstruct.

## How To Use It

1. **Define the items and the ranking metric.** What are you ranking? (Competitors, products, markets, channels.) On what basis? (Revenue, units, NPS, app store rating, market share.) The ranking metric should be consistent across all periods.
2. **Define the time periods.** Choose a series of comparable time blocks — months, quarters, years. Typically four to eight periods makes a readable chart.
3. **Assign ranks per period.** For each time period, rank all items from 1 (best) to n (last). If you have five items, each period has exactly five positions.
4. **Plot and connect.** For each item, plot its rank in each period and connect the dots with a line. Assign one consistent color to each item.
5. **Show start and end labels.** Label each item at the leftmost and rightmost positions. Between the two endpoints, the lines carry the story.
6. **Annotate notable moves.** For the final position column, briefly describe what drove the most significant rank changes — a product launch, a pricing move, a new competitor entering.

## Worked Example

Acme Design operates in the online design education market alongside four competitors: DesignCore, Craftly, StudioLearn, and PixelAcademy. The market research team tracked each platform's monthly active learner count and assigned ranks quarterly over two years (Q1 through Q8).

Starting positions (Q1):
1. DesignCore
2. Craftly
3. Acme Design
4. StudioLearn
5. PixelAcademy

Ending positions (Q8):
1. Acme Design
2. DesignCore
3. PixelAcademy
4. Craftly
5. StudioLearn

The rank chart made the story immediately clear. Acme's line climbed steadily from position 3 to position 1 over six quarters — not in a single jump but incrementally, overtaking DesignCore in Q6. Two lines crossed sharply between Q4 and Q5: PixelAcademy surged from 5th to 3rd after launching a mobile app, while Craftly fell from 2nd to 4th in the same period. StudioLearn's line was nearly flat through the entire period — consistent underperformance that a snapshot bar chart in any single quarter would have failed to highlight.

The annotations beside the Q8 positions explained each move: Acme's climb was attributed to its Studio tier launch in Q3; PixelAcademy's surge reflected a viral social media campaign; Craftly's fall correlated with a content quality controversy in Q4.

Without the rank chart, competitive briefings had focused on Acme's absolute learner count growing — which was true but missed that Craftly's decline had contributed to Acme's climb. The rank view separated earned gains from windfall gains.

## When To Use It

Use a Rank chart when the question is *who is gaining and losing ground over time?* rather than *how big is each one?* It is particularly powerful for competitive analysis, product portfolio prioritization, and market position monitoring.

Use a **Comparison** chart instead when you need the absolute value for each item at a single point in time and the ranking order is secondary. Use a **Trend** chart when you want to see how the absolute value of one or two items moves over time. Use a **Cumulative** chart when the question is which items in a ranked list account for most of the total.

## Things To Watch Out For

- **Rank is relative, not absolute.** An item that maintains its rank while declining in absolute terms looks stable on this chart but may be in serious trouble. Rank should always be accompanied by the underlying metric as context, either as an annotation or a separate chart.
- **The number of items and periods.** More than six or seven items on a rank chart produces a tangle of crossing lines that becomes unreadable. If you have many items, consider showing only the top five and grouping the rest.
- **Ties.** If two items have the same rank in a period, they share a position and the visual becomes ambiguous. Decide in advance how to break ties consistently (e.g. alphabetical, by secondary metric) and apply that rule throughout.
- **The chosen metric changes the chart.** Ranking by revenue, by units, by growth rate, and by NPS will produce completely different rank charts for the same group of competitors. Be explicit about what the ranking measures.
- **Period choice matters.** A chart showing quarterly ranks can hide month-to-month volatility that is analytically relevant. Equally, a chart showing annual ranks can smooth over a significant rise and fall within the year. Choose the period granularity that matches the pace of change in the market.

## Related Frameworks

- [Comparison](./comparison.md) — compares absolute values of discrete categories; use when you need the actual size, not the relative position.
- [Cumulative](./cumulative.md) — shows which items account for most of a total; use when concentration rather than position movement is the insight.
- [Trend](./trend.md) — tracks the absolute value of one or two metrics over time; use when absolute trajectory matters more than relative rank.
- [Scatter](./scatter.md) — plots items across two dimensions simultaneously; use when the relationship between two variables drives the classification.
