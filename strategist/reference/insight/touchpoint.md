---
name: strategist:reference/insight/touchpoint
type: strategist_framework
stage: insight
title: Touchpoint
slug: touchpoint
aka: [Touchpoint map, Multi-channel touchpoint map, Channel map]
source: ""
related: [journey, circular, segmentation, heat-map, from-to]
---
# Touchpoint

> A multi-channel map that shows which device or channel a customer uses at each stage of their journey — so you can see where channels are missing, redundant, or switching customers off their path.

## What It Is

A Touchpoint map is a grid. Columns represent the phases of the customer journey (Learn, Explore, Buy, Pay, Activate, Help — or similar). Rows represent the channels or devices through which a customer can interact with the product (Store, Web, Mobile, Call Centre — or whichever are relevant). Inside the grid, you plot the actual path a customer takes: which cell they are in at each phase, and how they move between channels across phases. You can plot multiple customer paths on the same grid using different colours, showing how a Store customer's journey differs from a Web-first customer's.

## Why It Works

A customer journey map shows what the customer does. A Touchpoint map adds where — which channel or device they're using at each moment. These two dimensions together reveal something neither can show alone: whether the channels are working together or working against each other.

Most organisations design channels separately — the store team, the web team, the app team, the call centre team. Customers, however, experience all channels as a single company. A Touchpoint map makes the seams visible: if a customer starts on Mobile but must switch to Web to complete a purchase, that switch is a designed-in friction point that only appears when you lay out both channels and both phases on the same grid. The same map reveals gaps: phases where no channel is present, meaning the customer is left without support at a critical moment.

The ability to plot multiple paths (e.g., a "Mobile-first" path in blue and a "Store + Web" path in orange) is particularly powerful in strategy work — it shows that different customer segments may have fundamentally different journeys, and that a channel investment might serve one segment well while doing nothing for another.

## How To Use It

1. **Define your phases (columns).** Start with the default phases — Learn, Explore, Buy, Pay, Activate, Help — and modify them to fit your product. These are the stages of the customer experience from discovery to ongoing support.
2. **Define your channels (rows).** List every channel through which a customer can interact with your business: physical store, website, mobile app, call centre, chatbot, email, partner, and so on. Only include channels that actually exist or that you are considering.
3. **Plot the primary journey.** Starting at the top-left, trace the path a representative customer takes: which channel are they in at the Learn phase? Do they stay in the same channel for Explore, or switch? Mark each active cell and connect them with a line showing the direction of movement.
4. **Plot alternate journeys.** Add one or two additional paths using different colours to represent meaningfully different customer types or entry points.
5. **Read the map.** Look for: phases with no channel coverage (gaps); phases where multiple channels are active simultaneously (potential duplication or confusion); forced channel switches mid-journey (friction); and phases where all paths converge or diverge.

## Worked Example

Acme Design has three channels: its **website** (course browsing and checkout), a **mobile app** (lesson delivery and community), and a **help email** (support). It maps two customer paths:

**Path A — Website-first student (blue):**
- **Learn:** Website (finds Acme via Google; reads course pages and blog).
- **Explore:** Website (watches a free sample lesson embedded on course page; reads reviews).
- **Buy:** Website (enrols and pays via course page checkout).
- **Pay:** Website (payment confirmation page).
- **Activate:** ← *Gap: no clear handoff to the mobile app.* Student receives a welcome email with a link to "download the app," but 40% don't click it.
- **Help:** Email (students who haven't found the app email support when they can't find their course).

**Path B — Mobile-app student (orange):**
- **Learn:** App store listing / App (organic discovery through the app store).
- **Explore:** App (browses free preview content inside the app).
- **Buy:** ← *Friction: app doesn't support in-app purchase for subscription tiers; redirects to website checkout.*
- **Pay:** Website (completes checkout on mobile browser — poor experience).
- **Activate:** App (logs back into app post-purchase; starts first lesson).
- **Help:** Email.

The map immediately surfaces two issues: (1) the Activate gap for Path A, where the handoff from website checkout to app is broken — solved by a post-purchase modal with a QR code and deep link; and (2) the forced channel switch for Path B at Buy, which drives a 22% drop-off on mobile checkout — solved by enabling in-app purchase for the relevant subscription tier.

## When To Use It

Use a Touchpoint map when the problem is cross-channel: when you need to understand how customers navigate multiple channels, or when a key business problem (low conversion, high support volume, poor activation) may be caused by channel friction rather than product quality.

Use a **Journey** map instead when channel information is less relevant and you're focused on the quality of the experience within each phase. The two are often paired: the Journey map is built first to establish the phases and steps, then the Touchpoint map is layered on to show the channel dimension. Use a **From:To** when you've already diagnosed the cross-channel problem and want to show the before/after of the proposed solution.

## Things To Watch Out For

- The map is only useful if the channels you've listed are the channels your customers actually use. If a large share of customers use a channel you haven't mapped (a WhatsApp group, a reseller, a third-party review site), the map will have a blind spot at every phase where that channel is the real entry point.
- Plotting too many journeys on one map makes it unreadable. Two or three distinct paths is the practical limit for a single diagram — if you need to show more, consider separate maps by segment.
- A Touchpoint map shows the current state. It doesn't automatically suggest what the future state should look like. Pair the current-state map with a future-state version (see **From:To**) to make the strategic recommendation concrete.
- The map treats each channel switch as neutral. In practice, some channel switches are positive (moving from email to app means a higher-quality experience) and some are negative (forced to web from mobile to complete a purchase). Annotate which switches are friction points and which are designed handoffs.

## Related Frameworks

- [Journey](./journey.md) — the phase-and-step experience map without the channel dimension; build this first, then overlay channels.
- [From:To](./from-to.md) — shows the desired state after the channel problem has been solved.
- [Segmentation](./segmentation.md) — pair with a Touchpoint map to show how different customer segments take different channel paths.
- [Heat Map](./heat-map.md) — useful for rating channel performance across phases when the problem is prioritisation rather than path-tracing.
