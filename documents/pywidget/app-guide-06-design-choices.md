---
layout: "default"
title: "App guide, part 6: Design choices"
section: "documents"
description: "The icon, name and store page options, approved and waiting for the Investors."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-guide/' | relative_url }}">← App Guide</a><a href="{{ '/documents/pywidget/app-guide-06-design-choices.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Guide</span><span>Day 9 · Fri Oct 30</span><span><code>pywidget/app-guide-06-design-choices.md</code></span></div><h1>App guide, part 6: Design choices</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Part 6 of 10 of the pywidget app guide. The index, with the reading notes, is [app-guide.md](app-guide.html).

Every look-and-feel decision made for the app, with the pictures that exist for it. Each is marked **approved** (an Investor said yes in writing; the words and the link are in `creative/approved.md`) or **pending** (shown to the Investors, no answer yet, so nothing here is decided). These pictures are drawings made by the company's own scripts from the colours and type in the design files, not photos of the running app, and no image-making AI was used (Commandment 9). The screens in section 2 are the real app; these show what was proposed or approved. This section is the one place that lists them, and it is updated as decisions land.

## Approved

**6.1 Light and dark look: "Paper" and "Studio" (issue #60). Approved 2026-10-25.** The app has two looks and follows the phone's Light/Dark setting: Paper (light, a serif heading face) and Studio (dark, a rounded heading face). There is no in-app switch. Pictures: the Console in light and dark.

<p class="guide-shots"><img src="app-guide-shots/design-mockups-A-console.png" alt="Console in Paper (light)" loading="lazy"> <img src="app-guide-shots/design-mockups-B-console.png" alt="Console in Studio (dark)" loading="lazy"></p>

**6.2 The Pro purchase screen: its look and words (issue #94). Approved 2026-10-28.** The screen that offers pywidget Pro, and the small entry points to it. The price and what Pro contains were not part of this approval; issue #87 decided them on 2026-10-30 (one purchase, $14.99, 7 Pro premades and 3 themes).

<p class="guide-shots"><img src="app-guide-shots/design-ide-A-pro-phone.png" alt="Pro screen, light" loading="lazy"> <img src="app-guide-shots/design-ide-B-pro-phone.png" alt="Pro screen, dark" loading="lazy"></p>
<p class="guide-shots"><img src="app-guide-shots/design-ide-A-proentry-phone.png" alt="Pro entry point, light" loading="lazy"> <img src="app-guide-shots/design-ide-B-proentry-phone.png" alt="Pro entry point, dark" loading="lazy"></p>

**6.3 Colour of search matches in the code editor (issue #95). Approved 2026-10-28.** Every match gets a pale amber tint; the current match keeps the selection colour. One picture, with the options that were compared.

<p class="guide-shots"><img src="app-guide-shots/design-ide-find-options.png" alt="Search-match colour options" loading="lazy"></p>

**6.4 Three extra editor colour themes: Ember, Fern, Graphite (issue #93). Approved 2026-10-28.** Each comes as a light and a dark pair. They are part of Pro (decided 2026-10-30, issue #87); the theme picker is not built yet (T-0272).

<p class="guide-shots"><img src="app-guide-shots/design-themes-pro-preview.png" alt="The extra editor themes, light and dark" loading="lazy"></p>

**6.5 The website's chat page and Now panel (issue #29). Approved 2026-10-25.** This is the company's website, not the app, so no picture is repeated here; the approval record is in `creative/approved.md`.

## Pending: waiting for the Investors

**6.6 The app icon (issue #92, open, answer wanted by 2026-11-02).** Three directions, each in light, dark and tinted: Indent (the company's recommendation), Prompt and Trace. Nothing is decided, and the icon in test builds is a plain placeholder. How each one is built from numbers and formulas is in section 7. Shown at their real small size (60 pixels), top row Indent, then Prompt, then Trace; each row is light, dark, tinted.

<p class="guide-shots"><img src="app-guide-shots/design-icon-png-indent-light-60.png" alt="Indent, light" loading="lazy"> <img src="app-guide-shots/design-icon-png-indent-dark-60.png" alt="Indent, dark" loading="lazy"> <img src="app-guide-shots/design-icon-png-indent-tinted-60.png" alt="Indent, tinted" loading="lazy"></p>
<p class="guide-shots"><img src="app-guide-shots/design-icon-png-prompt-light-60.png" alt="Prompt, light" loading="lazy"> <img src="app-guide-shots/design-icon-png-prompt-dark-60.png" alt="Prompt, dark" loading="lazy"> <img src="app-guide-shots/design-icon-png-prompt-tinted-60.png" alt="Prompt, tinted" loading="lazy"></p>
<p class="guide-shots"><img src="app-guide-shots/design-icon-png-trace-light-60.png" alt="Trace, light" loading="lazy"> <img src="app-guide-shots/design-icon-png-trace-dark-60.png" alt="Trace, dark" loading="lazy"> <img src="app-guide-shots/design-icon-png-trace-tinted-60.png" alt="Trace, tinted" loading="lazy"></p>

**6.7 The App Store screenshots (issue #92, open, same card).** Two layouts are proposed, "Open" (recommended) and "Framed". Gap: no contact sheet for either layout is in the repository at HEAD, so there is no picture here. The real screenshots are taken from the running app after the feature freeze (Day 21, 2026-11-11), not on the Day 13 of the earlier plan; the date the Investors review them is not set in the current plan.

**6.8 The app's public name (issue #90, open, answer wanted by 2026-11-02).** Three coined names are on the card (Coilwork is recommended). Gap: there is no picture of the three names. The only picture that exists is of how the placeholder name "pywidget" or "PyWidget" would be written under the icon and in copy (option E on the card).

<p class="guide-shots"><img src="app-guide-shots/design-ide-name-options.png" alt="How the placeholder name could be written" loading="lazy"></p>

**6.9 Other screens drawn but not yet built or not separately approved.** These are drawings of the home, run, settings and gallery screens and of the Home Screen widget states. They are drawn from the approved colours of 6.1, but no Investor decision on them is recorded, so they are shown as pending and nothing in them is final. The real versions, where built, are in section 2.

<p class="guide-shots"><img src="app-guide-shots/design-ide-A-home-phone.png" alt="Home, light" loading="lazy"> <img src="app-guide-shots/design-ide-B-home-phone.png" alt="Home, dark" loading="lazy"></p>
<p class="guide-shots"><img src="app-guide-shots/design-ide-A-run-phone.png" alt="Run screen, light" loading="lazy"> <img src="app-guide-shots/design-ide-B-run-phone.png" alt="Run screen, dark" loading="lazy"></p>
<p class="guide-shots"><img src="app-guide-shots/design-ide-A-settings-phone.png" alt="Settings, light" loading="lazy"> <img src="app-guide-shots/design-ide-B-settings-phone.png" alt="Settings, dark" loading="lazy"></p>
<p class="guide-shots"><img src="app-guide-shots/design-ide-A-gallery-phone.png" alt="Gallery, light" loading="lazy"> <img src="app-guide-shots/design-ide-B-gallery-phone.png" alt="Gallery, dark" loading="lazy"></p>
<p class="guide-shots"><img src="app-guide-shots/design-states-states-small.png" alt="Widget states, small size" loading="lazy"></p>

Not design choices and so not listed: the privacy policy facts (issue #98) have no pictures.


<style>.guide-shots{display:flex;gap:.5rem;flex-wrap:wrap}.guide-shots img{max-width:calc(50% - .25rem);height:auto;border:1px solid var(--line);border-radius:12px}</style>
{% endraw %}

</div>
