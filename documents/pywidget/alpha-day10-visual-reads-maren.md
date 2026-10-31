---
layout: "default"
title: "Day 10 alpha visual reads (T-0360)"
section: "documents"
description: "A3 and A4 grade the same image, as s9 rules. Every file s9&#x27;s X2 names is in the record. The fails are listed at the end, in order of severity."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/alpha-day10-visual-reads-maren.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 10 · Sat Oct 31</span><span><code>pywidget/docs/reviews/alpha-day10-visual-reads-maren.md</code></span></div><h1>Day 10 alpha visual reads (T-0360)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, started 2026-10-31 05:49 ET. Record: `ops/site-checks/alpha-day10/8428b332/` (one run, 02:51-04:08). Rows A1, A2, A3, A4, A5, A7 of [`ops/plans/pywidget/alpha-day10-checklist.md`](alpha-day10-checklist.html), with the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line of s9 in force. I mark each image pass or fail with one reason. Row grades and the verdict are Ines's (T-0361). No new run, retake, build or Simulator was used.

## Counts


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Counts, scrolls sideways" data-n="2 3 4 5" style="--tw:400px" markdown="1">

| Row | Images marked | Pass | Fail | Missing |
| --- | --- | --- | --- | --- |
| A1 | 1 | 1 | 0 | 0 |
| A2 | 6 | 4 | 2 | 0 |
| A3 | 1 | 1 | 0 | 0 |
| A4 | 1 | 1 | 0 | 0 |
| A5, A5a set | 68 | 64 | 4 | 0 |
| A5, A5b timer faces | 7 | 5 | 2 | 0 |
| A7 | 8 | 5 | 3 | 0 |

</div>


A3 and A4 grade the same image, as s9 rules. Every file s9's X2 names is in the record. The fails are listed at the end, in order of severity.

## How I read

- Each image was read at native scale against the row and its s9 line. A5a's 68 went through per-premade contact sheets I built outside the repo, with no resampling. The A5a set, the design sheets and the trees were all open together.
- A2 used `palette_check.swift` through `xcrun swift`, as the rule names it. That only reads the PNG. Rectangle: x 146, y 142, 1024 x 2212 px, which is the text area right of the gutter. Colours: bg, currentLine, text, comment, keyword, string, number, function, type, builtin, operator, hairline from `tokens.json` (Quill.light, Lumen.dark). Default limit.
- A5 contrast on full colour light is the token pair on white, by script. On full colour dark it is measured on the gradient: text ink against the darkest ground pixel in the text's box, as s9 says, and against the lightest, which is the harder case for light text. Non-text marks (bars, dots, dividers, clock faces, the quote glyph, the storage ring) are left out; the "55" inside the ring is left out with it, and it is white on the gradient. Accented and vibrant are not contrast-graded (s9).
- Values were checked against T-0358's trees, not the sheets' sample data.

## Sheet per premade (named before the first image was opened, chair line s9, A5)

Design sheet: `origin/design-previews:widgets/premade/<file>` at 3fb09bd4, the approved look. Tree: `pywidget/docs/design/widgets/trees/<file>`, which gives the family list and elements.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Sheet per premade (named before the first image was opened, chair line s9, A5), scrolls sideways" style="--tw:450px" markdown="1">

| Premade | Sheet | Blob | Tree |
| --- | --- | --- | --- |
| countdown | 01-countdown.jpg | 57bfa095 | 01-countdown.json |
| progress | 09-progress.jpg | 5f5527de | 09-progress.json |
| clocks | 11-clocks.jpg | 887eb160 | 11-clocks.json |
| quote | 10-quote.jpg | 627b350a | 10-quote.json |
| habits | 06-habits.jpg | 51bc175b | 06-habits.json |
| storage | 08-storage.jpg | fad868c6 | 08-storage.json |

</div>


Values are checked against T-0358's trees (fixed clock 2026-10-31 09:41 America/New_York, fixed data). The sheet is the source for layout and elements, not for sample values.

## A1 (s9: the waiting shot only)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: A1 (s9: the waiting shot only), scrolls sideways" data-n="2" style="--tw:620px" markdown="1">

| Image | Mark | Reason |
| --- | --- | --- |
| A1/shots/t0312-input-waiting.png | pass | Input pill under the output with `input()` chip, typed "Ada" and send button; nothing on top; keyboard below, as C5 screen 3. |

</div>


## A2 (six shots of the 2,000-line file, A2c/attachments)

The record names the files by UUID; the manifest gives the shot names used here. Lines in view are read from the gutter; the test does not assert them.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: A2 (six shots of the 2,000-line file, A2c/attachments), scrolls sideways" data-n="2" style="--tw:662px" markdown="1">

| Image | Mark | Reason |
| --- | --- | --- |
| a2c-2000-lines-light (B60E5833) | pass | Lines 1-34, every role drawn; palette_check exit 0, 0 off-palette pixels. |
| a2c-2000-lines-light-middle (992B3598) | **fail** | Lines 1021-1054. palette_check exit 1: #4F3900 covers 47 px, over the limit of 40. Highlighting itself is complete by eye. |
| a2c-2000-lines-light-end (B12ED660) | pass | Lines 1968-2000 and 2001's number, every role drawn; palette_check exit 0, 0 off-palette pixels. |
| a2c-2000-lines-dark (65842B64) | pass | Lines 1-34, every role drawn; palette_check exit 0, 0 off-palette pixels. |
| a2c-2000-lines-dark-middle (8F822AB1) | **fail** | Lines 1022-1055. palette_check exit 1: #F2F4FA covers 82 px and #E2CDFF 46 px, over the limit of 40. Highlighting itself is complete by eye. |
| a2c-2000-lines-dark-end (AE180C45) | pass | Lines 1968-2000 and 2001's number, every role drawn; palette_check exit 0, 0 off-palette pixels. |

</div>


The bench's "done" strip sits below the editor on all six; s9 excludes it. No harness text is inside the editor area.

## A3 (s9: A4b's image)


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: A3 (s9: A4b&#x27;s image), scrolls sideways" data-n="2" style="--tw:606px" markdown="1">

| Image | Mark | Reason |
| --- | --- | --- |
| A4b/shots/t0508-token-home.png | pass | Widget on the Home Screen with the run's token in full and readable; no placeholder, redacted or error card, no stale badge, not truncated. |

</div>


`testAddWidget` is green in the record (1 test, 1 passed). That is Ines's to weigh.

## A4 <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> read (typed from the image before the log was opened, chair line s9)

`A4b/shots/t0508-token-home.png` (tracked copy, 585x1266) and `t0508-token-widget.png`: **PWT7FA9N**. Committed in 857c35a3 at 05:50 ET, before the log was opened. The log then read `T-0508 TOKEN made PWT7FA9N` and `T-0508 TOKEN PWT7FA9N on the Home Screen: read`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: A4 blind read (typed from the image before the log was opened, chair line s9), scrolls sideways" data-n="2" style="--tw:606px" markdown="1">

| Image | Mark | Reason |
| --- | --- | --- |
| A4b/shots/t0508-token-home.png | pass | Home Screen, no app in front, systemSmall; PWT7FA9N equals the log character for character, no ellipsis. |

</div>


## A5 (68 images, A5a)

The count is right: countdown 11, progress 11, clocks 10, quote 13, habits 13, storage 10. No image shows the error, placeholder or unknown-node card. No stand-in beyond the three s9 allows is visible. A5a's one Expected Failure is `testHarnessFailsOnTheErrorCardAndAnUnknownNode`; its log lines are the mutant cases, red on purpose through XCTExpectFailure.

A timer face is never value-read on A5a (s9), so those marks cover the rest of the image and the timer goes to the A5b table below. I treat progress's relative "left" text as a timer face: on A5a it reads 20 hr, 46 min, which is the wall clock, not 09:41.

**countdown** (11 images, sheet 01-countdown.jpg)


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: A5 (68 images, A5a), scrolls sideways" data-n="2" style="--tw:692px" markdown="1">

| Image | Mark | Reason |
| --- | --- | --- |
| countdown-systemSmall-fullColor-light | pass | Elements as sheet, small layout, Paper face; lowest text pair 7.08:1 (text.secondary on white). Bar: not value-read here, see A5b. |
| countdown-systemSmall-fullColor-dark | pass | Elements as sheet, small layout, Studio face; lowest text 6.67:1 on darkest ground, 4.90:1 on lightest. Bar: not value-read here, see A5b. |
| countdown-systemSmall-accented-light | pass | Content and grouping complete; Paper face. Bar: not value-read here, see A5b. |
| countdown-systemSmall-accented-dark | pass | Content and grouping complete; Studio face. Bar: not value-read here, see A5b. |
| countdown-systemMedium-fullColor-light | pass | Elements as sheet, medium layout, Paper face; lowest text pair 7.08:1 (text.secondary on white). Timer text: not value-read here, see A5b. |
| countdown-systemMedium-fullColor-dark | pass | Elements as sheet, medium layout, Studio face; lowest text 5.82:1 on darkest ground, 4.93:1 on lightest. Timer text: not value-read here, see A5b. |
| countdown-systemMedium-accented-light | pass | Content and grouping complete; Paper face. Timer text: not value-read here, see A5b. |
| countdown-systemMedium-accented-dark | pass | Content and grouping complete; Studio face. Timer text: not value-read here, see A5b. |
| countdown-accessoryCircular-vibrant-dark | pass | Content and grouping complete; family layout as sheet. |
| countdown-accessoryRectangular-vibrant-dark | pass | Content and grouping complete; family layout as sheet. Bar: not value-read here, see A5b. |
| countdown-accessoryInline-vibrant-dark | pass | Content and grouping complete; family layout as sheet. |

</div>


**progress** (11 images, sheet 09-progress.jpg)


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: A5 (68 images, A5a), scrolls sideways" data-n="2" style="--tw:690px" markdown="1">

| Image | Mark | Reason |
| --- | --- | --- |
| progress-systemSmall-fullColor-light | pass | Elements as sheet, small layout, Paper face; lowest text pair 7.08:1 (text.secondary on white). Bar and relative time: not value-read here, see A5b. |
| progress-systemSmall-fullColor-dark | pass | Elements as sheet, small layout, Studio face; lowest text 6.16:1 on darkest ground, 5.10:1 on lightest. Bar and relative time: not value-read here, see A5b. |
| progress-systemSmall-accented-light | pass | Content and grouping complete; Paper face. Bar and relative time: not value-read here, see A5b. |
| progress-systemSmall-accented-dark | pass | Content and grouping complete; Studio face. Bar and relative time: not value-read here, see A5b. |
| progress-systemMedium-fullColor-light | pass | Elements as sheet, medium layout, Paper face; lowest text pair 7.08:1 (text.secondary on white). Bars: not value-read here, see A5b. |
| progress-systemMedium-fullColor-dark | pass | Elements as sheet, medium layout, Studio face; lowest text 8.41:1 on darkest ground, 7.48:1 on lightest. Bars: not value-read here, see A5b. |
| progress-systemMedium-accented-light | pass | Content and grouping complete; Paper face. Bars: not value-read here, see A5b. |
| progress-systemMedium-accented-dark | pass | Content and grouping complete; Studio face. Bars: not value-read here, see A5b. |
| progress-accessoryCircular-vibrant-dark | pass | Content and grouping complete; family layout as sheet. |
| progress-accessoryRectangular-vibrant-dark | pass | Content and grouping complete; family layout as sheet. Bar: not value-read here, see A5b. |
| progress-accessoryInline-vibrant-dark | pass | Content and grouping complete; family layout as sheet. |

</div>


**clocks** (10 images, sheet 11-clocks.jpg)


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: A5 (68 images, A5a), scrolls sideways" data-n="2" style="--tw:676px" markdown="1">

| Image | Mark | Reason |
| --- | --- | --- |
| clocks-systemSmall-fullColor-light | **fail** | "12:41 AM" truncated to "12:41…"; the sheet truncates no time. |
| clocks-systemSmall-fullColor-dark | **fail** | "12:41 AM" truncated to "12:41…"; the sheet truncates no time. |
| clocks-systemSmall-accented-light | **fail** | "12:41 AM" truncated to "12:41…"; the sheet truncates no time. |
| clocks-systemSmall-accented-dark | **fail** | "12:41 AM" truncated to "12:41…"; the sheet truncates no time. |
| clocks-systemMedium-fullColor-light | pass | Elements as sheet, medium layout, Paper face; lowest text pair 7.08:1 (text.secondary on white). |
| clocks-systemMedium-fullColor-dark | pass | Elements as sheet, medium layout, Studio face; lowest text 7.49:1 on darkest ground, 6.10:1 on lightest. |
| clocks-systemMedium-accented-light | pass | Content and grouping complete; Paper face. |
| clocks-systemMedium-accented-dark | pass | Content and grouping complete; Studio face. |
| clocks-accessoryRectangular-vibrant-dark | pass | Content and grouping complete; family layout as sheet. |
| clocks-accessoryInline-vibrant-dark | pass | Content and grouping complete; family layout as sheet. |

</div>


**quote** (13 images, sheet 10-quote.jpg)


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: A5 (68 images, A5a), scrolls sideways" data-n="2" style="--tw:669px" markdown="1">

| Image | Mark | Reason |
| --- | --- | --- |
| quote-systemSmall-fullColor-light | pass | Elements as sheet, small layout, Paper face; lowest text pair 7.08:1 (text.secondary on white). |
| quote-systemSmall-fullColor-dark | pass | Elements as sheet, small layout, Studio face; lowest text 9.51:1 on darkest ground, 7.41:1 on lightest. |
| quote-systemSmall-accented-light | pass | Content and grouping complete; Paper face. |
| quote-systemSmall-accented-dark | pass | Content and grouping complete; Studio face. |
| quote-systemMedium-fullColor-light | pass | Elements as sheet, medium layout, Paper face; lowest text pair 7.08:1 (text.secondary on white). |
| quote-systemMedium-fullColor-dark | pass | Elements as sheet, medium layout, Studio face; lowest text 8.20:1 on darkest ground, 6.31:1 on lightest. |
| quote-systemMedium-accented-light | pass | Content and grouping complete; Paper face. |
| quote-systemMedium-accented-dark | pass | Content and grouping complete; Studio face. |
| quote-systemLarge-fullColor-light | pass | Elements as sheet, large layout, Paper face; lowest text pair 7.08:1 (text.secondary on white). |
| quote-systemLarge-fullColor-dark | pass | Elements as sheet, large layout, Studio face; lowest text 5.82:1 on darkest ground, 4.69:1 on lightest. |
| quote-systemLarge-accented-light | pass | Content and grouping complete; Paper face. |
| quote-systemLarge-accented-dark | pass | Content and grouping complete; Studio face. |
| quote-accessoryRectangular-vibrant-dark | pass | Content and grouping complete; family layout as sheet. |

</div>


**habits** (13 images, sheet 06-habits.jpg)


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: A5 (68 images, A5a), scrolls sideways" data-n="2" style="--tw:655px" markdown="1">

| Image | Mark | Reason |
| --- | --- | --- |
| habits-systemSmall-fullColor-light | pass | Elements as sheet, small layout, Paper face; lowest text pair 7.08:1 (text.secondary on white). |
| habits-systemSmall-fullColor-dark | pass | Elements as sheet, small layout, Studio face; lowest text 6.12:1 on darkest ground, 5.13:1 on lightest. |
| habits-systemSmall-accented-light | pass | Content and grouping complete; Paper face. |
| habits-systemSmall-accented-dark | pass | Content and grouping complete; Studio face. |
| habits-systemMedium-fullColor-light | pass | Elements as sheet, medium layout, Paper face; lowest text pair 7.08:1 (text.secondary on white). |
| habits-systemMedium-fullColor-dark | pass | Elements as sheet, medium layout, Studio face; lowest text 6.04:1 on darkest ground, 5.03:1 on lightest. |
| habits-systemMedium-accented-light | pass | Content and grouping complete; Paper face. |
| habits-systemMedium-accented-dark | pass | Content and grouping complete; Studio face. |
| habits-systemLarge-fullColor-light | pass | Elements as sheet, large layout, Paper face; lowest text pair 5.72:1 (text.tertiary on white). |
| habits-systemLarge-fullColor-dark | pass | Elements as sheet, large layout, Studio face; lowest text 5.52:1 on darkest ground, 4.83:1 on lightest. |
| habits-systemLarge-accented-light | pass | Content and grouping complete; Paper face. |
| habits-systemLarge-accented-dark | pass | Content and grouping complete; Studio face. |
| habits-accessoryCircular-vibrant-dark | pass | Content and grouping complete; family layout as sheet. |

</div>


**storage** (10 images, sheet 08-storage.jpg)


<div class="tbl" role="region" tabindex="0" aria-label="Table 12: A5 (68 images, A5a), scrolls sideways" data-n="2" style="--tw:683px" markdown="1">

| Image | Mark | Reason |
| --- | --- | --- |
| storage-systemSmall-fullColor-light | pass | Elements as sheet, small layout, Paper face; lowest text pair 5.72:1 (text.tertiary on white). |
| storage-systemSmall-fullColor-dark | pass | Elements as sheet, small layout, Studio face; lowest text 6.62:1 on darkest ground, 5.06:1 on lightest. |
| storage-systemSmall-accented-light | pass | Content and grouping complete; Paper face. |
| storage-systemSmall-accented-dark | pass | Content and grouping complete; Studio face. |
| storage-systemMedium-fullColor-light | pass | Elements as sheet, medium layout, Paper face; lowest text pair 5.72:1 (text.tertiary on white). |
| storage-systemMedium-fullColor-dark | pass | Elements as sheet, medium layout, Studio face; lowest text 6.82:1 on darkest ground, 5.86:1 on lightest. |
| storage-systemMedium-accented-light | pass | Content and grouping complete; Paper face. |
| storage-systemMedium-accented-dark | pass | Content and grouping complete; Studio face. |
| storage-accessoryCircular-vibrant-dark | pass | Content and grouping complete; family layout as sheet. |
| storage-accessoryRectangular-vibrant-dark | pass | Content and grouping complete; family layout as sheet. |

</div>


## A5b timer faces (extension process, read against the wall clock)

Step window: 03:13:34 to 03:26:05 ET, from `A5b/xcresult-summary.json` (see item 7 below). Shot times are from the attachment manifest.


<div class="tbl" role="region" tabindex="0" aria-label="Table 13: A5b timer faces (extension process, read against the wall clock), scrolls sideways" data-n="3" style="--tw:742px" markdown="1">

| Image | Shot time | Mark | Reason |
| --- | --- | --- | --- |
| wk-countdown-systemMedium.png | 03:18:22 | **fail** | Timer reads 5:25:00. The rule needs 3:06 PM minus a time in the window: 11:39:55 to 11:52:26. |
| wk-countdown-systemSmall.png | 03:18:22 | pass | Bar at about 51%; 50.8% is expected at that time on the tree's interval. |
| wk-countdown-accessoryRectangular.png | 03:22:22 | pass | Bar at about 51%, same interval; all text as A5a. |
| wk-progress-systemSmall.png | 03:19:25 | pass | "20 hr, 40 min left" equals midnight minus 03:19; bar at about 14%. |
| wk-progress-systemMedium.png | 03:19:25 | pass | Day, Week, Month and Year bars at about 14, 73, 97 and 83%, right for the wall clock. |
| wk-progress-accessoryRectangular.png | 03:24:00 | pass | Day bar at about 14%, right for the wall clock. |
| wk-clocks-systemSmall.png | 03:18:06 | **fail** | Cross-check, not a timer: "12:41 A…", the same truncation as A5a in the real extension. |

</div>


I also read the other 19 family shots of the six premades on A5b as a cross-check, unmarked. They show nothing new except item 9 below. The home and lock composites and the other six premades' shots were not read; no row calls for them.

## A7 (s9: eight shots against T-0333)

"Premades only" is `A-pro-phone.png` for light and `B-pro-phone.png` for dark. Sheet versus push and the Privacy Policy link are not graded (s9).


<div class="tbl" role="region" tabindex="0" aria-label="Table 14: A7 (s9: eight shots against T-0333), scrolls sideways" data-n="2" style="--tw:692px" markdown="1">

| Image | Mark | Reason |
| --- | --- | --- |
| A7b/shots/pro-phone-light-large-offer.png | pass | Premades only: every element present, one row, none clipped, button and line pinned. |
| A7b/shots/pro-phone-dark-large-offer.png | pass | Premades only in Studio: every element present, gradient button, none clipped, button and line pinned. |
| A7b/shots/pro-phone-light-ax5-offer.png | pass | Button and line pinned; the subline stops at the bar because the body scrolls, as T-0333's AX3 panel draws. |
| A7b/shots/pro-phone-light-large-purchased.png | **fail** | T-0333 "Purchased" has "Open the Gallery" and "Done"; neither is on the image. |
| A7b/shots/pro-phone-dark-large-purchased.png | **fail** | Same: no "Open the Gallery", no "Done". |
| A7a/shots/pro-phone-light-large-footer.png | pass | Restore purchase and Terms of Use in view; button and line pinned. |
| A7a/shots/pro-phone-light-ax5-footer.png | pass | Restore purchase and Terms of Use reachable at the end of the scroll; button and line pinned. |
| A7a/shots/pro-phone-light-ax5-landscape-footer.png | **fail** | Restore purchase and Terms of Use are reachable, but the button and its line are not on the image, so not pinned. |

</div>


## For Ines, T-0361

**Fails, most severe first.**

1. **A5, clocks-systemSmall, 4 of 68. A product defect.** "12:41 AM" truncates to "12:41…" in all four modes, and to "12:41 A…" in the extension. The sheet does not truncate. Sydney's "Sun +15h" label and "12:41 AM" do not fit on one row. A person loses AM or PM on the Home Screen. "All 68 must pass" cannot be met as the images stand.
2. **A5, wk-countdown-systemMedium, timer 5:25:00. The rule's clock, more likely than the product.** s9 expected a run after 09:41 and said the timer "will not read 5:25:00". The run was at 03:18, before the tree's timer start of 09:41 ET. `TreeView.swift` draws `Text(timerInterval: start...end)` with no pause time, and SwiftUI appears to <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> a timer at its full length until start. That is my inference from the tree and the source; nothing in the record tests it. As written it fails. It needs your ruling, because the A5a marks for countdown-systemMedium (4 images) pass only on the rest of the image, and a retake is not allowed.
3. **A7, purchased light and dark. Elements missing as written.** No caller in `App/` sets `onDoneAction`, so "Open the Gallery" never shows, while the line still says the premades are "open in the Gallery". "Done" exists only when the screen is a sheet, and s9 does not grade sheet versus push, so "Done" may fall under that clause; "Open the Gallery" does not. The Gallery is out of the alpha (s2), so the button has no target today. Both images also show Restore purchase and Terms of Use, which T-0333 does not draw there. That is not a fail item.
4. **A2, the two middle shots. palette_check exit 1 as written, not a highlighting fault.** All 93 and 184 off-palette pixels sit where the scroll indicators cross glyphs: x 1152-1160 (the vertical bar over `T` and `{`) and, dark only, x 392-409 at y 2340-2347 (the horizontal bar over `except`). Cropped to x 146-1145, y 142-2331, both exit 0 with 0 off-palette pixels. That crop is information, not my grade: the rule says the text area, and the indicators are inside it. The past-first-screen clause itself holds by eye on all four later shots.
5. **A7, ax5-landscape footer. Fails one clause, by design.** T-0485 moves the button and line into the scroll at an accessibility size in compact height, because a pinned bar would leave no room (`pinsFoot` in `ProPaywallView.swift`). s9 names the shot and asks for "button and its line pinned", with no exception. The source says the price stays on the first screen there; the record has no shot of that screen, so I cannot confirm it from an image.

**Count for your A5 trigger.** Progress, quote, habits and storage have every A5a image passing and their timer faces pass: 4 of 6. Clocks does not. Countdown turns on item 2. So the "fewer than 4" trigger is not met either way.

**Where the wording left me unsure.**

6. **A2, "every keyword".** `in` and `is` draw the operator colour, and `None` and `True` draw builtin, because the vendored `highlights.scm` captures them that way. All four are Python keywords, and the ADR-004 s7 exceptions do not name them. I read "its role colour" as the capture map's role and passed them. A stricter reading fails all six shots. The rule's wording is mine, from T-0386, so I flag it rather than settle it.
7. **A5, "the A5b step's window in results.json".** results.json carries a step's seconds, not its times. I used `A5b/xcresult-summary.json`, 03:13:34 to 03:26:05.
8. **A5, "darkest ground pixel".** On a gradient with light text, the darkest pixel is the easy case. My wording, and a poor choice for this card. Lowest text on the darkest ground is 5.52:1, habits-systemLarge; on the lightest ground it is 4.69:1, "QUOTE OF THE DAY" on quote-systemLarge. Both clear 4.5:1, so the mark does not change. The quote glyph measures 3.24:1 at worst; it is an image, not text, so the rule does not reach it.
9. **A5, s8.4 and s9 together.** s8.4 sends progress's 11 shots to A5b, but A5b has one mode per family, so I followed s9: all 68 on A5a, timer faces on A5b. Two things outside the fail list, for F1. On A5b, wk-progress-systemSmall pushes "left" to the far edge, away from "20 hr, 40 min"; A5a and the sheet keep them together. And at this run time the Day bar sits at 14% beside "40%", because the text is fixed at 09:41 and the bar follows the wall clock. That is the run's hour, not a defect.
10. **A2, "about line 1,000".** The rule gives no tolerance, and the test uses fixed swipes without asserting position. The middle shots open at 1021 and 1022, so line 1,000 itself is not in view. I took that as "about".
11. **A7, "none clipped" at AX5.** I read the subline's cut at the pinned bar as the scroll edge, as T-0333's AX3 panel draws it. At the end of the AX5 scroll, "Shortcuts" passes under the back button and earlier text blurs under the status bar. I read that as normal scrolling.
{% endraw %}

</div>
