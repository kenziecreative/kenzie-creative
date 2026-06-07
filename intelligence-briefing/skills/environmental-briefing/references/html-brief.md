# HTML brief rendering

How to render the brief as a self-contained HTML file. This governs **presentation only** — what content goes in each item is decided by the OUTPUT CONTRACT in SKILL.md. Render with the `Write` tool; no shell, no scripts.

Read this file at the render step only when `format` is `html` (the default). If `format` is `markdown`, skip all of this and write the Markdown brief per the OUTPUT CONTRACT instead.

## Assemble the file

Produce one self-contained `.html` file at `<briefs dir>/YYYY-MM-DD.html`. Structure:

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Daily Brief — <Month D, YYYY></title>
<!-- THEME_FONT_LINK -->
<style>
<!-- inline the FULL contents of ${CLAUDE_PLUGIN_ROOT}/assets/brief.css here, verbatim -->
<!-- THEME_TOKENS -->
</style>
</head>
<body>
<div class="wrap">
<!-- content blocks, in order: page head, Lead, Scan (by zone), Synthesis, Disconfirming, footer -->
</div>
</body>
</html>
```

**CSS is fixed; you only generate the body content.** Read `${CLAUDE_PLUGIN_ROOT}/assets/brief.css` and paste it whole inside `<style>`. Do not rewrite or restyle it — design consistency depends on it being inlined unchanged.

**Theming (optional).** If `theme` in CLAUDE.md names a CSS file (e.g. `./brief-theme.css`), read it and inline its contents **after** brief.css inside the same `<style>` block, so its `:root` overrides the defaults. Convention for web fonts: if the theme file's **first line** is a comment of the form `/* font-link: <url> */`, emit `<link rel="stylesheet" href="<url>">` at the `<!-- THEME_FONT_LINK -->` marker and inline the rest of the file (everything after that first line) after brief.css. Do not inline an `@import` (it would sit after other rules and be ignored). If `theme` is empty or `default`, omit both the link and the override — the default uses system fonts and needs no network. Never hard-fail because a theme file is missing or unreadable; fall back to the default silently. The brief must read correctly even if the web fonts fail to load (the theme's fallbacks and palette carry it).

## Content blocks

Use these exact patterns. They map 1:1 onto the brief's content — same items, same order, same marks as the Markdown contract.

**Page head** — eyebrow, title, one-line standfirst, dated meta. The title may be a short editorial line; keep it plain if a quiet day.
```
<div class="app-page-head">
  <div>
    <div class="app-page-sub">Environmental Daily Briefing</div>
    <h1 class="app-page-title">The Morning Scan</h1>
    <p class="app-page-desc">One-sentence standfirst: the shape of the day.</p>
  </div>
  <div class="page-meta">No. MM·DD·YY<br>Weekday</div>
</div>
```

**Section head** (Lead / Scan / Synthesis / Disconfirming):
```
<div class="section-head"><span class="label">Lead</span><span class="line"></span><span class="count">3 items</span></div>
```

**Lead item** — add class `is-lead` to the card. Tags: `Fact`/`Signal`/`Frame` as plain `tag-pill`; disposition as `is-act`/`is-track` (omit a chip for plain `note`); a non-default tier as `is-src`.
```
<article class="card is-lead"><div class="card-body">
  <div class="tag-row"><span class="tag-pill">Fact</span><span class="tag-pill is-act">Act</span></div>
  <h3 class="card-title">Headline in your words</h3>
  <p class="card-desc">What happened, qualifiers intact.</p>
  <div class="relevance"><span class="panel-label">Why it lands</span>Why this clears the bar.</div>
  <div class="src"><span class="cite">Publisher · YYYY-MM-DD · source type</span><a href="URL">domain.com →</a></div>
</div></article>
```

**Zone head** then its items. A scan item is the same card without `is-lead`. Signals add a watch block:
```
<div class="zone-head"><span class="label">Emerging Impact</span><span class="line"></span></div>
<article class="card"><div class="card-body">
  <div class="tag-row"><span class="tag-pill is-signal">Signal</span><span class="tag-pill is-src">tertiary</span></div>
  <h3 class="card-title">Headline</h3>
  <p class="card-desc">What happened.</p>
  <div class="relevance"><span class="panel-label">Why it lands</span>...</div>
  <div class="watch"><span class="panel-label">Watch for</span>What would confirm or falsify.</div>
  <div class="src"><span class="cite">Publisher · date · type</span><a href="URL">domain.com →</a></div>
</div></article>
```

**Promoted stub** (a lead item's pointer in its home zone):
```
<div class="promoted"><span class="arrow">↑</span>Short title — promoted to Lead.</div>
```

**Synthesis** (omit the block if none; show the section head with "No cross-zone pattern today."):
```
<div class="synthesis">
  <span class="panel-label">The pattern across today</span>
  <h3 class="synthesis-title">The pattern, named.</h3>
  <p>The thread, drawing only on items in the scan.</p>
  <p class="draws">Draws on: item · item · item</p>
</div>
```

**Disconfirming** / **footer**:
```
<div class="disconf">Empty — no held beliefs configured.</div>
<footer><span>Environmental Daily Briefing · zone taxonomy v1</span><span>Act · Track · Note · Watch</span></footer>
```

## Rules

- The HTML carries exactly the content the OUTPUT CONTRACT defines — nothing added, nothing dropped. The card chrome is presentation; the words are the brief.
- Escape `&`, `<`, `>` in any text you place into HTML.
- A quiet day still renders cleanly: empty zones can be omitted or shown with a one-line "No qualifying items in window." note; an empty Lead shows "Quiet day — nothing meets the lead bar."
- Keep it one file. Do not link external CSS/JS. The only allowed network reference is a theme's web-font `<link>`, and the page must still read correctly if it fails to load.
