---
name: strategist:reference/analyse/roic
type: strategist_framework
stage: analyse
title: ROIC
slug: roic
aka: [Return on Invested Capital, Return on Capital Employed]
source: ""
related: [cashflow, unit-economics, profit-margin, waterfall, marginal-return]
---
# ROIC

> A metric that measures how efficiently a business converts its invested capital into operating profit — and a decomposition tree that shows exactly which lever is driving that efficiency.

## What It Is

Return on Invested Capital (ROIC) is calculated as **Operating Profit divided by Net Invested Capital**. The framework doesn't just give you a ratio; it unpacks both sides of that equation into their component drivers, producing a tree structure that connects the headline efficiency metric back to the specific operational and financial decisions that produced it.

The **Operating Profit** branch decomposes into Gross Profit (Revenue less Cost of Goods Sold) minus Operating Expenses (SG&A — sales, general, and administrative costs). Revenue is itself a function of units sold and price; COGS is a function of units and variable cost rate. The **Net Invested Capital** branch decomposes into Working Capital (Current Assets less Current Liabilities — Accounts Receivable, Inventory, Accounts Payable) and Fixed Capital (property, plant, and equipment). The ROIC tree lets you trace a change in the headline ratio to its source, or identify which lever to pull to improve it.

## Why It Works

Raw profit is an incomplete measure of business performance. A business that earns $10m in profit while tying up $200m in capital is less impressive than one that earns the same profit on $50m of capital. The first returns 5%; the second returns 20%. ROIC captures this distinction by putting profit in the numerator and the capital required to generate it in the denominator — it is a measure of *how well the business uses what it has*, not just *how much it earns*.

The decomposition tree adds explanatory power. By separating operating efficiency (the profit branch) from capital efficiency (the invested capital branch), the framework pinpoints whether a ROIC problem is a margin problem, a capital-intensity problem, or both. That distinction matters because the fixes are different: margin problems call for pricing, cost, or volume changes; capital-intensity problems call for working-capital management, asset utilisation, or divestment.

## How To Use It

1. **Calculate Operating Profit.** Start with Revenue, subtract Cost of Goods Sold to get Gross Profit, then subtract Operating Expenses (SG&A) to get Operating Profit (pre-tax).
2. **Calculate Net Invested Capital.** Add Working Capital (Current Assets minus Current Liabilities: primarily accounts receivable and inventory, less accounts payable) to Fixed Capital (net property, plant, and equipment).
3. **Divide.** ROIC = Operating Profit ÷ Net Invested Capital. Express as a percentage.
4. **Benchmark.** Compare against your cost of capital (the return investors require). A ROIC above the cost of capital means the business is creating value; below it means capital is being consumed.
5. **Use the tree to diagnose.** If ROIC is declining, trace back through both branches. Is Gross Profit compressing (pricing or cost issue)? Are Operating Expenses growing faster than revenue (leverage problem)? Is Working Capital rising (collection or inventory issue)? Is Fixed Capital growing without proportional operating profit (asset efficiency problem)?
6. **Identify the lever.** Each node of the tree maps to an operational action — price increase, cost reduction, receivables acceleration, asset disposal — so the diagnosis leads directly to a decision.

## Worked Example

Acme Design has two business lines: its original self-paced video courses (the legacy catalogue) and a newer live-cohort programme.

**Legacy catalogue:**
- Revenue: $2.4m; COGS: $480k; Gross Profit: $1.92m
- Operating Expenses (SG&A): $720k; Operating Profit: $1.2m
- Working Capital: $200k (receivables); Fixed Capital: $300k (platform infrastructure)
- Net Invested Capital: $500k
- **ROIC: $1.2m ÷ $500k = 240%**

**Live cohort:**
- Revenue: $1.6m; COGS: $640k; Gross Profit: $960k
- Operating Expenses: $560k; Operating Profit: $400k
- Working Capital: $350k (deferred revenue timing, instructor advances); Fixed Capital: $450k (live platform, studio)
- Net Invested Capital: $800k
- **ROIC: $400k ÷ $800k = 50%**

Both lines are profitable. But the ROIC tree reveals a structural difference: the live cohort has meaningfully higher capital intensity (more infrastructure, more working capital tied up in instructor advances) and a lower gross margin (higher cost per student hour). Its ROIC of 50% is still healthy, but the gap explains why scaling the legacy catalogue is far more capital-efficient for Acme at this stage. The diagnosis points to two potential levers for the cohort line: reduce instructor advance terms (working capital) and automate more of the pre-session curriculum (COGS).

## When To Use It

Use ROIC when comparing business units, product lines, or investment alternatives where the capital required differs — otherwise you are comparing businesses on profit without accounting for what they cost to run. It is particularly valuable in strategic planning, capital-allocation decisions, and M&A analysis. For single-period operational reviews where capital investment is fixed and equal, simpler metrics like Profit Margin or Actual v Target may be sufficient.

## Things To Watch Out For

- ROIC is sensitive to how capital is defined. Different treatments of leases, goodwill, or internally developed assets will produce different results. Be consistent across comparisons.
- A very high ROIC can indicate under-investment rather than exceptional efficiency — a business that has depreciated its assets fully looks capital-light even if it needs reinvestment to sustain operations.
- ROIC is backward-looking. It measures how efficiently capital was deployed in the period measured, not whether the next dollar of investment will earn the same return.
- Working capital management can artificially inflate or deflate the denominator. A business that aggressively delays supplier payments will show a smaller capital base, but that is a financing choice, not an operational improvement.

## Related Frameworks

- [Cashflow](./cashflow.md) — the time-series companion: Cashflow maps the trajectory of investment and return over multiple periods; ROIC measures the efficiency at a point in time.
- [Unit Economics](./unit-economics.md) — applies ROIC logic at the individual-customer level (LTV vs. CAC).
- [Profit Margin](./profit-margin.md) — the numerator of ROIC in visual form; use together to see both margin and capital efficiency.
- [Waterfall](./waterfall.md) — decomposes a change in operating profit, which is the numerator of ROIC.
- [Marginal Return](./marginal-return.md) — asks how the next unit of investment affects output; ROIC summarises the historical answer to that question.
