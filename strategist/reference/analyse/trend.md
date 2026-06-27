---
name: strategist:reference/analyse/trend
type: strategist_framework
stage: analyse
title: Trend
slug: trend
aka: [Line chart, Time-series chart, Trend line]
source: ""
related: [comparison, mix, cumulative, waterfall, actual-v-target]
---
# Trend

> A chart that traces how a single value (or two values side by side) moves across time — so you can see the direction, pace, and inflection points of change.

## What It Is

A Trend chart is an Analyse-stage visual that plots one or more metrics against a time axis. The most common form is a **line chart**: each data point is plotted at its time position and connected to the next, producing a continuous line that the eye reads as movement. A second common form is a **stacked bar chart over time**: bars for each period are divided into segments representing sub-categories, so you can read both total change and shifting composition in the same view.

The defining feature of any Trend chart is the time axis on the x-axis. Without time, it's a Comparison or Distribution; the moment the x-axis becomes "Q1, Q2, Q3, Q4" or "Jan–Dec," you're reading a Trend.

## Why It Works

Numbers in isolation are static. A metric of 1,200 tells you nothing — it's only when you can see that it was 800 six months ago, peaked at 1,400 last quarter, and is now declining that the number means something. A Trend chart works because **it makes the direction and rate of change visible**, not just the current level.

The shape of the line carries analytical content that a table of numbers obscures. A straight upward slope means consistent growth. A curve that steepens means accelerating growth. A curve that flattens before turning down is the classic early warning of a reversal — and the human eye picks up that shape in a fraction of a second. Trend charts let pattern recognition do heavy analytical lifting before a single number is examined closely.

The stacked-bar variant adds a second layer: it shows whether the growth or decline is evenly distributed across sub-types or whether one segment is doing all the work. That distinction often changes the strategic response entirely.

## How To Use It

1. **Choose your metric and time horizon.** Pick the variable whose trajectory matters (revenue, subscribers, churn rate, NPS). Set a time range long enough to show a meaningful pattern — typically at least four to eight periods.
2. **Select line or stacked bar.** Use a line chart when you have a single metric or two metrics you want to compare across the same time axis. Use a stacked bar when you want to show both the total and the composition of sub-types within each period.
3. **Plot and connect.** For a line chart, connect data points in chronological order. For a stacked bar, align bars left-to-right in time order and stack segments consistently.
4. **Add a callout at the key inflection.** Mark the point where the trend changed direction — that's usually the insight you want the reader to see first.
5. **Label axes clearly.** The y-axis should state the unit of measure (revenue in $k, subscribers, churn rate %). The x-axis should show the time unit (months, quarters, years).

## Worked Example

Acme Design's leadership noticed that monthly new subscriber sign-ups had been volatile. Plotting the last 12 months on a line chart revealed something that the monthly reports had buried:

| Month | New Subscribers |
|-------|----------------|
| Jan   | 820 |
| Feb   | 870 |
| Mar   | 910 |
| Apr   | 960 |
| May   | 1,050 |
| Jun   | 1,140 |
| Jul   | 1,180 |
| Aug   | 1,090 |
| Sep   | 980 |
| Oct   | 870 |
| Nov   | 800 |
| Dec   | 760 |

The line chart made it immediately clear: growth was healthy from January through July, then reversed sharply from August onward. The turn coincided with a competitor launching a lower-priced tier in late July. Monthly reports showing individual month-over-month changes had hidden this because each monthly dip looked modest in isolation — but the trend line showed a consistent, accelerating decline across five months. Without the Trend view, the team had been treating each month's drop as noise.

## When To Use It

Reach for a Trend chart whenever the core question is *what is happening over time* — is growth accelerating or slowing, when did a metric turn, how consistent is the movement? It is the right tool at the start of almost any analysis involving time-series data because it orients everyone to the current trajectory before any deeper investigation begins.

Use a line chart when you have one or two metrics to compare directly. Step up to the stacked-bar variant when you also need to show how the composition within a category is shifting. If your question is about *why* the trend changed, combine the Trend chart with a **Waterfall** (to decompose the change into causes) or a **5 Why's** (to drill down to root causes). If the question is about hitting a goal, layer a target line and move to **Actual v Target**.

## Things To Watch Out For

- **Misleading y-axis scaling.** Starting the y-axis at a number other than zero (or the natural baseline for a rate) can make a small change look dramatic. Always check what the axis implies about the scale of the movement.
- **Cherry-picking the time window.** Every trend looks different depending on where you start and end. A chart starting at a low trough will show growth even if the overall trajectory is flat. Show enough history to include context, and be explicit about why you chose the range.
- **Too many lines.** More than three or four lines on the same chart turns it into a tangle. If you have more series, use small multiples or reduce to the two or three that matter most.
- **Correlation versus causation.** A trend that turns at the same time as an event doesn't prove the event caused it. Name the pattern, then investigate separately.
- **Smoothing that hides signal.** Rolling averages can make a volatile line readable, but they also delay inflection points visually. Label any smoothing you apply.

## Related Frameworks

- [Comparison](./comparison.md) — compares discrete categories side by side; use when time is not the axis.
- [Mix](./mix.md) — shows how composition across sub-categories shifts between two points in time.
- [Cumulative](./cumulative.md) — shows a running total building across periods or categories.
- [Waterfall](./waterfall.md) — decomposes the gap between a start and end total into its contributing causes.
- [Actual v Target](./actual-v-target.md) — overlays performance against a goal on a time axis.
