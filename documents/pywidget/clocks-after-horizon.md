---
layout: "default"
title: "Clocks: what the widget shows after its last minute (T-0396)"
section: "documents"
description: "Add one more entry, dated 21 minutes after the run&#x27;s first whole minute (the instant entry 20 ends). It shows only what stays true: each city&#x27;s offset from the device&#x27;s zone, no time of day, no dial, no sun or moon, no\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/clocks-after-horizon.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/design/widgets/clocks-after-horizon.md</code></span></div><h1>Clocks: what the widget shows after its last minute (T-0396)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-10-28. For Ines to confirm in one read. Builds on T-0391 (clocks.py: 20 one-minute entries, then reload).

## Problem
Entry 20 is the last. After it WidgetKit keeps showing it, and a reload runs no Python (ADR-007 T6), so the time is wrong until the app opens. Wrong is worse than blank.

## Could WidgetKit keep the time right with no Python?
No. Checked against clocks.py's time model and API.md: `Text(date, style: .time)` (with or without `timeZone`, R2) draws the entry's own date once and does not tick. Only `.relative`, `.offset` and `.timer` count on their own, and none of them gives a time of day (a timer since local midnight shows seconds and 24-hour time). The dial hands do not move either. So a live city time is not available in v1 and no schema or Swift change fixes it.

## Decision
Add one more entry, dated 21 minutes after the run's first whole minute (the instant entry 20 ends). It shows only what stays true: each city's offset from the device's zone, no time of day, no dial, no sun or moon, no "tomorrow". Offsets are exact except across a DST change in either zone before the app next opens (accepted; rare, and the next app open corrects it). Reload policy stays `at_end` (a reload only re-reads this tree).

## On-widget text (existing tokens and faces only; offset() unchanged: "+9h", "−3h", "+5:30h", "here")
Name keeps its current style. The offset takes the place of the time, same font and size as the time today (20 pt big / 15 pt small, monospaced digits, primary colour).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: On-widget text (existing tokens and faces only; offset() unchanged: &quot;+9h&quot;…, scrolls sideways" style="--tw:484px" markdown="1">

| Family | Text |
|---|---|
| systemSmall | Up to 3 rows: name left, offset right. The caption2 sub-line and dividers drop. Footer, caption2 secondary: `Open pywidget for times` |
| systemMedium | Up to 4 columns, no dials: name (caption, semibold), offset (20 pt) under it. Footer, caption2 secondary: `Offsets from here. Open pywidget for times.` |
| accessoryRectangular | Up to 3 rows: name left, offset right (footnote). No footer (no room) |
| accessoryInline | `Tokyo +9h` (first city; globe symbol kept). No hint (inline has about 20 characters) |

</div>


VoiceOver (describe): `World clocks, times paused. London here, Tokyo +9h, Sydney +11h. Open pywidget for times.` With no cities, the existing "No cities" card.

## Build contract for Pernille
- `plan()` returns `1 + HORIZON_MIN + 1` entries; the last is the offsets-only entry. Accented/vibrant modes lose nothing (offset text is widget_accentable like the time).
- Tree bytes shrink for that entry; the 75% bundle test must still pass.
- Test: render the last entry in all four families. Assert no `\d{1,2}:\d{2}` string and no dial Path/Circle node in any of them; assert each city's offset string appears; assert the second-to-last entry still has times; assert the entry count and its date. Describe() text as above.
- Needs no schema change and no Swift change.
{% endraw %}

</div>
