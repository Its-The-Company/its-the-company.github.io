---
layout: "default"
title: "Dry run of the Day 10 visual fail lists (T-0386, for T-0360 and T-0361)"
section: "documents"
description: "None of these images is alpha evidence: they come from other commits and other commands (s0 item 3). The verdicts below are &quot;as written, on this stand-in&quot;, so the gaps show before the real run."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/alpha-fail-list-dry-run-maren.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/reviews/alpha-fail-list-dry-run-maren.md</code></span></div><h1>Dry run of the Day 10 visual fail lists (T-0386, for T-0360 and T-0361)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-10-27, started 18:55 ET. Rows A1, A2, A3, A4, A5, A7 of [`ops/plans/pywidget/alpha-day10-checklist.md`](alpha-day10-checklist.html), graded on the images that exist today, as the rows are written. The checklist is not changed here. Proposed wording is for Ines to rule before 2026-10-30 18:00 (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> does not apply: no new creative). I judge only what the images show (C33); where a fact needs the log or the test, I say so.

None of these images is alpha evidence: they come from other commits and other commands (s0 item 3). The verdicts below are "as written, on this stand-in", so the gaps show before the real run.

Contrast numbers come from pixel sampling (`tools/png_small.read_rgb`, darkest and lightest pixel in a box around the text, WCAG formula). Anti-aliasing makes that an approximation; it is fine for a 7:1 margin and useless at 4.6:1.

## Cross-row problem first

**X1. Two rows have no screenshot command, so their screenshots cannot count.** s0 item 3 says a screenshot not produced by the named test or command does not count. Odalys's dry run (`ops/site-checks/alpha-day10/dry-run-6f08d99c.txt` lines 17 and 25) records A2 and A7 as "NOT RUN (no command)". As written, on 10-31 my A2 and A7 reads would grade images that the same file says do not count.
*Proposed:* "A2 and A7 screenshots count only if the test that makes them is named on the board by 10-30 18:00; until then those rows' Maren parts cannot pass."

**X2. Each row should name its images.** A1, A3, A4 and A7 say "a screenshot" or "screenshots" with no state, appearance or count. A grader can pass a row on the one flattering frame.
*Proposed:* every row lists its PNG file names in `alpha-day10/<commit>/`, as A5 already does with its count of 68.

## A1. Console, `input()`, stop, tracebacks

**Images graded:** `ops/site-checks/console-t0312/t0312-input-waiting.png` (build, waiting for input), `t0312-copy-all-hud.png` (build, finished), against `pywidget/docs/design/ide/A-console-phone.png` (C5 screen 3).

**As written:** the Maren part **passes**. The input is a pill with an `input()` chip, the typed text and an accent send circle, under the output, as C5 draws it. The text part cannot be graded: the waiting image shows `Name?` and `Ada` in the field, but not `Hi Ada` or `Finished in`; the finished image is another script (`First? one`, `Finished in 4.21 s`).

**Wording problems.**
1. **One image cannot show both things the rule asks for.** "The console shows `Name? Ada`, `Hi Ada`, then `Finished in`" is the finished state. "The input is the sheet or REPL bar laid out as in her C5 screens" is the waiting state. After the run finishes the field is gone (in `t0312-copy-all-hud.png` there is no REPL bar at all). The row says "a console screenshot", singular.
2. **"Laid out as in her C5 screens" covers the input only.** These visible departures from C5 pass as written: no status strip ("Waiting for input · input() on line 1"); no run separator; the console is a full screen with a large title and the source pinned above it, not a sheet over the editor; and in the finished state there is no `>>>` REPL bar, which C5 pins at the bottom in every state. Some of these may be accepted for the alpha, but the rule should say which.
3. **The HUD covers the code.** In `t0312-copy-all-hud.png` the "Copied 5 lines" capsule sits on lines 1-2 of the source. C5 s3 puts the HUD under the status bar. That is not in the A1 test's path, but the rule does not say whether a HUD over content fails.
4. **`Finished in` is not C5's string.** C5's strip reads "Finished 0.42 s · run 14". If the build moves to C5's wording, the pass rule fails a correct build. The build string today is "Finished in 4.21 s", in the output.

**Proposed wording (Maren part):** "Two screenshots from testInputRoundTrip: (a) waiting, (b) finished. (a) shows the input as C5 screen 3 'Waiting for input': a pill under the output with the `input()` chip, the typed text and the send button, nothing covering it, the keyboard below. (b) shows `Name? Ada`, `Hi Ada` and a finished line with a time, in that order. Not graded for the alpha: the status strip, the run separator, sheet versus full screen. A HUD or overlay on output or input fails."

## A2. Editor with highlighting

**Images graded:** `pywidget/ios/bench/editor-g2g3-2026-10-27/g2-typing-iphone.png` (<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2</span> bench, light, a 10-line file). No 2,000-line file shot and no dark shot exist (ADR-004 line 259: "The dark appearance (Lumen dark) was not shot in this slice").

**As written:** **cannot be graded.** Light: keywords, strings, numbers, comments and function names carry distinct colours in the Quill light family, by eye. Dark: no image. "Past the first screen": no image.

**Wording problems.**
1. **"Nothing unhighlighted past the first screen" cannot be seen in a screenshot of the first screen.** The row asks for "screenshots of that file" with no scroll position.
2. **"Unhighlighted" is undefined.** Plain identifiers draw in `text` by design (`radius`, `r`, `math`), and ADR-004 line 258 already accepts `float` in an annotation as text. Read literally, every name in the file is unhighlighted. Read loosely, a file where highlighting stops at line 400 still has coloured keywords somewhere.
3. **"Capture colours" by eye cannot tell Quill from an off-set colour.** ADR-004 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 3 says a colour outside the set is a fault, and `palette_check.swift` already exists for that. The row does not call it.
4. **Visible defects that pass as written:** the debug JSON block above the editor (`{"cmd":"none","editors":...`, three lines of harness state in the shipping editor frame); no key row above the keyboard (C5 s3: 44 pt `inputAccessoryView`). Neither is a highlighting fault, so the rule lets both through.

**Proposed wording (Maren part):** "Six screenshots of the 2,000-line file from the named G1 test: light and dark, each at line 1, about line 1,000 and the last line. In each, every keyword, string, number, comment and function name in view draws its role colour; identifiers and the ADR-004 s7 exceptions draw `text`. `palette_check.swift` finds 0 pixels outside that appearance's set on the editor area. Any debug or harness text in the frame fails."

## A3. A fixture widget on the Simulator Home Screen

**Images graded:** `ops/site-checks/renderer-v1/widgetkit/wk-01-countdown-home-systemSmall-systemMedium.png` (Simulator Home Screen, premade countdown, small and medium), `ops/site-checks/stale-slot/stale-light.png` and `stale-dark.png` (in-app stale check, "Hello" cards). No `testAddWidget` image exists.

**As written:** the countdown Home Screen shot **passes**: the widget is drawn, the text reads ("Lisbon trip", "53 days"), and it is not a placeholder, redacted or error card. But it would pass on premade text, not fixture text, which is the first problem.

**Wording problems.**
1. **A premade or the widget's own placeholder can carry the fixture string.** "Drawn from the fixture tree" is judged only through the string Odalys names. If that string is something like "Hello" or "Lisbon trip", it also appears in the stale-check cards, the premades and possibly the extension's `placeholder()`. Then a widget showing the wrong timeline passes.
2. **Stale is not covered.** `stale-slot/stale-light.png` shows the stale badge (clock glyph, top right). A3's list (placeholder, redacted, error) says nothing about a stale or "Updated" card. A widget that never got the fixture timeline but shows an old snapshot would pass.
3. **"Readable" has no threshold.** On a real Home Screen the ground is the wallpaper and the glass, so contrast moves with the wallpaper (see A5 item 4).

**Proposed wording:** "The fixture string appears in no premade, no placeholder and no other test, and Odalys names it on the board before the run. It is on the image, inside the widget's frame, in full (not truncated). The card shows no stale badge, and no placeholder, redacted or error card. The Simulator wallpaper is the default one, named in the row."

## A4. End to end: a script written in the app reaches the Home Screen

**Images graded:** none exist (T-0359 part c has not run). Wording graded against the A3 Home Screen shot and the widget fonts in the renderer-v1 sheets.

**As written:** cannot be graded.

**Wording problems.**
1. **Reading a random token by eye.** In the widget faces (SF Pro text, the serif hero, the dark Rounded hero) `0`/`O`, `1`/`l`/`I` and `5`/`S` look alike at small sizes. A wrong token can be read as equal.
2. **Where the token must be.** "The token on the screenshot" passes if the token is visible in the app's console, a banner or the widget gallery, and not in a placed widget.
3. **Truncation.** A long token in systemSmall truncates with an ellipsis, and the rule does not say whether a partial match counts.

**Proposed wording:** "The token is 6 characters from `ABCDEFGHJKMNPQRSTUVWXYZ23456789` (no 0, O, 1, I, L, S, 5), drawn in a systemMedium widget placed on the Home Screen. The screenshot is the Home Screen with no app in front. I type the token from the image into the record before I open the log; the two must match character for character, with no ellipsis."

## A5. 6 premades, every family and mode they claim

**Images graded:** `ops/site-checks/renderer-v1/01-countdown-light.png` and `01-countdown-dark.png` in full; I also looked at `widget-card/card-light.png` and `renderer-v1/widgetkit/wk-gallery-09-toggle-off-accented-home.png` (system accented, real Home Screen) to compare. These are composite sheets from the T-0206 renderer, not the 68 T-0359(b) PNGs.

**As written, countdown, on these sheets:** systemSmall and systemMedium, full colour and accented, light and dark; three accessory families in vibrant. No error, placeholder or unknown-node card. No missing element, clip, wrong family. Text contrast measured: "today" and "Today, 7:30 PM" light 7.1:1; "Fri, Dec 18" accented 7.7:1; dark gradient "today" 8.5:1, "Today, 7:30 PM" 7.8:1. **Every image passes as written. Two of them show a defect.**

**Wording problems.**
1. **A wrong value passes.** The systemMedium "Next up" hero reads `0:00` beside "Today, 7:30 PM", in all six panels. ImageRenderer does not run timers, so the first frame shows 0:00 (the sheet's own footnote says so). The fail list has no entry for "wrong or impossible value for the fixed clock". With T-0358's fixed clock at 09:41, a 7:30 PM event should read about 9:49:00; a 0:00 passes as written.
2. **Snapshot stand-ins are not covered.** Four countdown panels are marked "Stand-in: timer ProgressView" or "Stand-in: AccessoryWidgetBackground". ImageRenderer draws "a placeholder or nothing" for those views. Does a stand-in count as "the renderer's placeholder card"? As written it is ambiguous both ways: a strict reading fails 4 of countdown's 11 images, and a loose reading passes a view the snapshot never really drew.
3. **Accented and vibrant are render.py stand-in grounds, not the system's rendering.** The sheet footnote: "the system's own recolouring, glass and Lock Screen material are not drawn." In the real system accented shot (`wk-gallery-09-toggle-off-accented-home.png`) the system's glass removes the card and puts the text over the wallpaper; the stand-in panel shows a flat dark card. "Accented or vibrant rendering that loses content" cannot be judged on the snapshot. Also, accented light and accented dark are the same image inside the widget: 1,170 of 24,964 pixels differ in the systemSmall panel, all at the corners where the sheet ground shows. 68 PNGs give about 50 different pictures.
4. **"4.5:1 in its mode" has no ground.** On the Home Screen the ground is the wallpaper; in the snapshot it is a stand-in colour; on the gradient card it changes across the card. A number needs a stated ground and a stated method (token pair by script, or the worst pixel under the text).
5. **Clear (iOS 26 glass) is not one of the four modes.** `widget-card/card-light.png` "clear, light wall" is visibly unreadable: white text on a near-white wash. A5 does not shoot clear, so that defect cannot reach the alpha read. That may be correct for the alpha (accented is the mode the user picks), but the row should say so.
6. **"Her design sheet" is not named.** I have `pywidget/docs/design/widgets/gallery`, the trees and `renderer-v1`; the row should name the file per premade, so "missing element" and "where the design does not truncate" have a source.
7. **Wrong face or colour token passes.** `check_widget_modes.py` exists because a hard-coded serif draws the light face in dark. On this sheet the dark hero is Rounded, correctly. But nothing in the fail list fails the wrong face, or a full-colour dark that draws the light card.

**Proposed wording (fail list):** "An image fails on: a missing element; text clipped or truncated where the sheet `<file>` does not truncate; the wrong family layout; a value that is wrong for the fixed clock and data (a timer or date text counts at its first frame only if the sheet marks it 'frozen in snapshot'); text under 4.5:1 (3:1 at 18 pt or 14 pt bold and above) measured by script against the token pair, or against the darkest ground pixel under the text on a gradient; the wrong face or appearance for the mode; or a stand-in for any view other than the three named in T-0365 (timer ProgressView, capacity Gauge, AccessoryWidgetBackground). Accented and vibrant are graded on content and grouping only (every element present, the hero in the accent group); the system's tint and glass are a device check (F1), not an A5 read. Clear mode is out of the alpha and goes to F1."

## A7. Pro paywall

**Images graded:** `ops/site-checks/pro-paywall-T-0484/` build shots (light offer, dark offer, light AX5 offer, light and dark purchased), against `pywidget/docs/design/ide/A-pro-phone.png` (T-0333, "Premades only" and "Purchased") and my review [`t0473-pro-screen-design-maren.md`](t0473-pro-screen-design-maren.html).

**As written:** "Maren: the layout passes". Light offer: eyebrow, headline, subline, one "Pro premade widgets" row with chips, the Always free box, pinned button with the price and the line under it, Restore purchase. That is the "Premades only" layout. **Passes.** It shows only the premades row, so the `on` rule passes on this image.

**Wording problems.**
1. **"The layout passes" has no list.** It does not say against which screen (T-0333's "Premades only" variant), which states, which appearances or which text sizes.
2. **A missing control passes.** The design has Terms of Use and Privacy Policy links beside Restore purchase; the build has neither. In the AX5 offer image, Restore purchase is not on screen at all, and one image cannot tell whether it scrolls into view. A paywall with no reachable Restore is the thing F8 says may not ship; A7's layout check does not catch it.
3. **The chips can name premades the build does not have.** The build lists 7 chips, including Shortcuts launcher and GitHub repository. A5 names 6 premades for the alpha and countdown is free, so at most 5 Pro premades are tested. The row rule checks rows, not chips. That is a store-claim problem as much as a layout one.
4. **The price rule cannot be seen in a screenshot.** `$0.99` on the button looks the same whether it came from `displayPrice` or a literal. The source grep proves it; the image does not.
5. **Presentation.** The design is a sheet with a close ×; the build pushes it with a back chevron. Probably fine; the rule should say whether it matters.

**Proposed wording (Maren part):** "Screenshots from the named test: offer light, offer dark, offer light at AX5 scrolled to the end, Pro is active light. Each matches T-0333 'Premades only' or 'Purchased': every element present, none clipped, button and its line pinned. Restore purchase, Terms of Use and Privacy Policy are visible in each offer shot or after the scroll shot. The chips name only premades whose A5 images exist and are Pro in pro-contract/expected.json. One extra offer shot in a second SKTestSession storefront shows that storefront's price."

## What I did not do

All six rows are covered. I graded one premade (countdown) of six on the A5 sheets; the other five sheets are in `renderer-v1/` and use the same stand-ins, so the wording findings <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> for them, but their image verdicts are not done. I did not run `palette_check.swift` or `check_widget_modes.py`.
{% endraw %}

</div>
