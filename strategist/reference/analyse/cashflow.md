---
name: strategist:reference/analyse/cashflow
type: strategist_framework
stage: analyse
title: Cashflow
slug: cashflow
aka: [Discounted Cashflow, DCF, Net Present Value Analysis]
source: ""
related: [roic, unit-economics, waterfall, marginal-return, profit-margin]
---
# Cashflow

> A method of valuing a business or opportunity by mapping cash in and cash out over time, then discounting future flows back to today's value to arrive at a net present value.

## What It Is

The Cashflow framework plots cash movements — investments, costs, and revenues — across a series of time periods. Early periods typically show negative cashflows (the investment and early-loss phase); later periods show positive cashflows (the profit phase). Three key outputs are tracked: the **cashflow in each period** (revenue less costs, before accounting for the time value of money), the **discounted cashflow** for each period (adjusted for the fact that money received in the future is worth less than money in hand today), and the **Net Present Value (NPV)** — the sum of all discounted cashflows less the initial investment. A positive NPV means the opportunity is worth pursuing on financial grounds; a negative NPV means the projected returns do not justify the capital at the given discount rate.

## Why It Works

Cash is what keeps a business alive. Profit — an accounting concept — can look healthy while a company runs out of money, because profit can include revenue not yet collected or exclude investment already paid. Cashflow cuts through that abstraction: it tracks what actually moved in and out of the bank.

The discounting step adds a second layer of clarity. A dollar received three years from now is not worth the same as a dollar received today — it cannot be invested, spent, or used to cover a shortfall in the meantime. By discounting future cashflows at a chosen rate (the cost of capital, or an expected return benchmark), the framework puts every period on a common footing so you can compare a large investment today against a stream of smaller returns over years without confusing timing with value.

Together, the timeline and the NPV answer the fundamental investment question: does this opportunity return more than the capital it consumes, adjusted for when that return arrives?

## How To Use It

1. **Set the investment horizon.** Decide how many periods (months, quarters, years) to model. Three to five years is common for a business initiative; longer for capital-intensive projects.
2. **Map the cashflows by period.** For each period, estimate the net cashflow: revenue less all cash costs, including any ongoing capital expenditure. In early periods this will likely be negative.
3. **Choose a discount rate.** Use your cost of capital, a hurdle rate, or a benchmark return rate. A typical range is 8–15% per year; use a higher rate when the investment is riskier.
4. **Discount each period's cashflow.** Divide each period's cashflow by (1 + r)^n, where r is the annual discount rate and n is the period number. This shrinks future values appropriately.
5. **Sum to NPV.** Add all discounted cashflows and subtract the initial investment. A positive result means the opportunity clears the bar.
6. **Sensitivity-test.** Run the model with optimistic and pessimistic cashflow assumptions to understand how NPV moves with the key variables.

## Worked Example

Acme Design is considering building a new self-paced certification course. Development requires a one-time investment of $80,000 in content production and platform build. Once launched, the course is expected to generate the following net cashflows (revenue from course sales less ongoing hosting, support, and marketing costs):

- **Year 0 (investment):** −$80,000
- **Year 1:** +$20,000
- **Year 2:** +$35,000
- **Year 3:** +$40,000
- **Year 4:** +$40,000
- **Year 5:** +$30,000

Using a 10% discount rate, each year's cashflow is discounted:

| Year | Cashflow | Discount Factor | Discounted Cashflow |
|------|----------|-----------------|---------------------|
| 0    | −$80,000 | 1.000           | −$80,000            |
| 1    | +$20,000 | 0.909           | +$18,180            |
| 2    | +$35,000 | 0.826           | +$28,910            |
| 3    | +$40,000 | 0.751           | +$30,040            |
| 4    | +$40,000 | 0.683           | +$27,320            |
| 5    | +$30,000 | 0.621           | +$18,630            |

NPV = −$80,000 + $18,180 + $28,910 + $30,040 + $27,320 + $18,630 = **+$43,080**

The positive NPV confirms the course clears Acme's 10% hurdle. The team also runs a pessimistic scenario (revenue 20% lower each year), which produces an NPV of +$8,400 — still positive, giving confidence that the investment holds up even if launch uptake is slower than expected.

## When To Use It

Use Cashflow analysis when the decision involves a meaningful upfront investment and a return that accrues over multiple periods — a new product, a facility, an acquisition, a major technology platform. It is the right tool when the *timing* of returns matters as much as their total size. For year-over-year operational decisions with no large capital event, a simpler **Profit Margin** or **Actual v Target** analysis may be enough.

Cashflow pairs naturally with **ROIC** — the NPV analysis tells you whether an investment clears the return threshold; ROIC tells you how efficiently the invested capital is being used once the business is running.

## Things To Watch Out For

- The discount rate is a judgment call that has an outsized effect on NPV. A project that looks attractive at 8% may look borderline at 15%. Always show the discount rate explicitly, and stress-test it.
- Cashflow models are only as good as the underlying assumptions about revenue and cost timing. Optimism about when customers pay and pessimism about when costs land are the two most common distortions.
- NPV is a go/no-go signal, not a precision estimate. The model's value is in the structure it imposes — forcing you to think through *when* cash moves — more than in the final number.
- Do not confuse cashflow with profit. A high-margin business can run out of cash if its receivables cycle is long or its growth requires continuous re-investment. The cashflow timeline makes this visible in a way that a P&L does not.

## Related Frameworks

- [ROIC](./roic.md) — measures the ongoing efficiency of invested capital; pairs with Cashflow for full investment appraisal.
- [Unit Economics](./unit-economics.md) — the per-customer version of the investment-versus-return logic embedded in cashflow analysis.
- [Waterfall](./waterfall.md) — shows what drove a change in a net number; useful for explaining cashflow variances period to period.
- [Profit Margin](./profit-margin.md) — the accounting view of revenue less cost; Cashflow is the cash-movement view of the same business activity.
- [Marginal Return](./marginal-return.md) — examines the incremental output of additional investment; Cashflow maps the full investment-return arc over time.
