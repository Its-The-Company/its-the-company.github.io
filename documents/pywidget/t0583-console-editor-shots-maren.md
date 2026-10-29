---
layout: "default"
title: "T-0583: Console with the Runestone editor, eight shots against Quill, Lumen and the style guide"
section: "documents"
description: "The editor itself is right. The fails are its wrap rule and the screen around it. T-0565&#x27;s screenshot condition passes when F1 and F2 land and the eight are shot again; F3 and F4 do not block it."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0583-console-editor-shots-maren.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/reviews/t0583-console-editor-shots-maren.md</code></span></div><h1>T-0583: Console with the Runestone editor, eight shots against Quill, Lumen and the style guide</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-10-28. Shots: Idris, 54fe1c67 (iPad and AX5) and the iPhone default pair from AppPicturesUITests, all in pywidget/docs/guide/shots/editor-example-tip-splitter-*.png. Build under review: T-0565 slice 1, 5ac90a05, with T-0586 (158ac8da).

Method. Colours were sampled from the PNGs with tools/png_sample.py (new, no Pillow on this Mac), not by eye. Sizes are measured in pixels and divided by the scale (3x iPhone, 2x iPad). `check_tokens.py`: 1,156 pairs, 0 fails, so every token pair the editor uses clears its floor. Rules: creative/approved.md item 2 (B-editor, B-ipad, tokens), design-system-v0.md s2.0, s3.2, s7; IDE spec s2 (clamps, AX rules).

## What passes on all eight

- **Syntax palette.** On token, exactly. Editor ground #FCFBF8 (Quill bg, bg.editor) and #0E1120 (Lumen bg, bg.editor). Strings #1D6B40 / #7FE3BA, keywords #8A2F8F / #C59BFF, text #1C1B19 / #E6E9F5, line numbers #6A665D / #8089A6 (`gutter`), gutter hairline #E3DFD6 / #262C3E (`gutterHairline`). No colour outside the set.
- **Type sizes.** Code 15 pt at Large, clamped at 32 pt at AX5 (measured advance 19.5 pt, SF Mono ratio 0.6). Line numbers in the monospaced-digit face, clamp 17. Matches RunestoneEngine.swift:394-399 and IDE spec s2.
- **Chrome.** System navigation bar, large title and the Run / Clear / More glass group, as design principle 2 asks. At AX5 the bar buttons do not grow; that is the system's Large Content Viewer behaviour and the spec's rule.

## Per image


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Per image, scrolls sideways" data-n="2" style="--tw:359px" markdown="1">

| Image | Verdict | Fails |
|---|---|---|
| iPhone default light | **Fail** | F2, F3 |
| iPhone default dark | **Fail** | F2, F3 |
| iPhone AX5 light | **Fail** | F1, F2, F3 |
| iPhone AX5 dark | **Fail** | F1, F2, F3 |
| iPad default light | **Fail** | F2, F3, F4 |
| iPad default dark | **Fail** | F2, F3, F4 |
| iPad AX5 light | **Fail** | F1, F2, F3, F4 |
| iPad AX5 dark | **Fail** | F1, F2, F3, F4 |

</div>


The editor itself is right. The fails are its wrap rule and the screen around it. T-0565's screenshot condition passes when F1 and F2 land and the eight are shot again; F3 and F4 do not block it.

## Fixes

**F1, P0. No soft wrap at AX sizes.** At AX5 the iPhone shows 16 characters of each line and the rest runs off the right edge; the iPad shows 36. Reading code means a sideways scroll on every line, which is not usable. IDE spec s2: "AX1 and up: editor soft-wraps". ConsoleEditor builds `RunestoneEngine()` with `lineWrapping: false` (RunestoneEngine.swift:34). Fix: `isLineWrappingEnabled = preferredContentSizeCategory.isAccessibilityCategory`, set at init and in the trait handler already registered for `UITraitPreferredContentSizeCategory`. Off below AX1, as the spec says; the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span> bench found wrap on costs nothing material (ADR-004 s7).
  - *The hanging indent is impossible here.* The spec asks for a hanging indent of the line's indent plus 2 characters. Vendored Runestone 0.5.2 has no wrapped-line indent (no head-indent or hanging setting in TextView, TextInputView or LineController). Getting one means patching its typesetter, which is not a P0 job three days before alpha. 1.0 wraps flush left. The line number appears once per logical line, so the gutter still shows where each line starts. I have corrected IDE spec s2 and design-system s3.2 to match. This is a change to our own layout spec, not to an approved style, so it needs no <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> question.

**F2, P1. The grounds around the editor are system colours, not tokens.** Sampled: chrome and console #FFFFFF in light, #000000 in dark (`.systemBackground`). Pure black and pure white are in neither approved set. The divider is the system separator (#C6C6C8 / #323235), not `line.hairline`. In light the order comes out backwards: the editor page (#FCFBF8) sits darker than the console under it. Fix:
  - the Console screen's VStack gets `Color(.bgCanvas)` behind it, ignoring the top safe area, so the nav bar and large title sit on #F7F5F0 / #0A0C13;
  - ConsoleTextView's container gets `Color(.bgConsole)`, #F3F1EB / #080A12;
  - the editor/console `Divider()` becomes a 1 px `Color(.lineHairline)`, #E3DFD6 / #262C3E;
  - the no-model placeholder (PyWidgetApp.swift:122) gets `bgCanvas`;
  - the console face goes to the spec's 13 pt on `.subheadline`, clamp 32. Today it is 16 pt on `.callout` (ConsoleTextView.swift:41), the same size as the code, so console and editor read as one block. Design-system s3.2.

  The editor keeps `bg.editor`. All of this is inside creative/approved.md item 2. No approval is needed.

**F3, P2. Gutter spacing and leading are tighter than the mockups.** Measured on the iPhone at default size: line number to hairline 3.7 pt, hairline to first glyph 0.7 pt. The code touches the rule, and at AX5 the numbers read as part of the code. Line <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitch</span> is 18 pt where s3.2 and B-editor have 22. Fix in RunestoneEngine:
  - `gutterLeadingPadding = 8`, `gutterTrailingPadding = 8`, `textContainerInset.left = 8` (space step s3);
  - `lineHeightMultiplier` set so a 15 pt line pitches 22 pt: 1.22 on the 18 pt natural height. It scales with Dynamic Type as it is.

  This costs about one character of width at AX5, which wrapping (F1) absorbs.

**F4, P2. The editor gets half the height the mockup gives it.** The editor and console split the space about 1:1 (`.frame(minHeight: 160)` with nothing else): editor 43%, console 44% on iPad. The iPad shows 29 lines of code over half a screen of empty console. B-ipad gives the editor about 70%. Fix: editor 2/3, console 1/3 of the height between the nav bar and the REPL bar, each at least 160 pt. A GeometryReader, or `.layoutPriority(1)` on the editor with the console at `max(160, h/3)`. The full iPad layout (sidebar, preview pane) belongs to its own lines and is not judged here.

## <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Ruling</span>: the navy editor under a black bar and console

**The navy stays. The black goes.** #0E1120 is Lumen's background and `bg.editor` in B Studio, as approved. The fault is the pure #000000 around it, which is not in the Studio set. With F2 the dark screen reads canvas #0A0C13, editor #0E1120, console #080A12. Those are three near-blacks with a navy cast. The editor is the lightest of the three (1.04:1 over canvas, 1.05:1 over console), so it reads as the <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifted</span> page, as in B-editor. The hairline marks the edge. Against #000 the step is 1.12:1 and the hue jumps from neutral to blue, and that jump makes the editor look like a pasted-in panel. Light gets the same order after F2: editor #FCFBF8 over canvas #F7F5F0 and console #F3F1EB. No departure from the style guide, so nothing goes to the Investors.

## Board lines added (owner Idris)

F1 T-0604 (P0), F2 T-0605 (P1), F3 T-0606 (P2), F4 T-0607 (P2), inserted before the "Home: done vs queued tasks" section.

## Re-check (T-0608), 2026-10-28

Maren. Shots re-shot by Idris in 210a1362 after T-0604 (2f7428c8), T-0605 (eed16935), T-0606 (bb612974) and T-0607 (814f3953). I looked at all eight and measured them with tools/png_sample.py; I did not reuse the commit's numbers. Safe areas excluded from the split: 34 pt home indicator on iPhone, 20 pt on iPad. `check_tokens.py`: 1,156 pairs, 0 fails.

### Per finding


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Per finding, scrolls sideways" data-n="2" style="--tw:592px" markdown="1">

| Finding | Verdict | Measured |
|---|---|---|
| F1, AX wrap (P0) | **Pass** | AX5 wraps on iPhone and iPad, light and dark. The longest row ends inside the editor. Flush left, one line number per logical line. Wrapped row pitch 47 pt at the 32 pt clamp. Default size does not wrap, as the spec says. |
| F2, token grounds (P1) | **Pass** | Light / dark on all eight: canvas #F7F5F0 / #0A0C13, editor #FCFBF8 / #0E1120, a 1 px hairline #E3DFD6 / #262C3E, console #F3F1EB / #080A12. No #FFFFFF or #000000 ground is left. Console line 221 pt for 28 characters, an advance of about 8.1 pt, so a 13 pt face (it was 16). The placeholder is on `bgCanvas` (PyWidgetApp.swift:122, read in the source, not in a shot). |
| F3, gutter and pitch (P2) | **Pass** | Number ink to rule 10.0 pt (iPhone), 10.0 pt (iPad), 10.7 / 10.5 pt (AX5). Rule to the nearest code ink 8.0 / 7.5 pt at default and 8.7 / 8.5 pt at AX5, so the code no longer touches the rule. Line pitch 22.0 pt on iPhone and 21.5-22.5 pt on iPad (2x rounding). |
| F4, 2:1 split (P2) | **Pass** | The editor takes 0.666 of the height on all four sizes. Console 219 pt (iPhone) and 340 pt (iPad), so both stay above 160. |

</div>


The dark ruling <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> as built. The navy editor sits between near-black canvas and console, and the hairline marks the edge.

### Per image


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Per image, scrolls sideways" data-n="2 3 4 5" style="--tw:487px" markdown="1">

| Image | F1 | F2 | F3 | F4 | Verdict |
|---|---|---|---|---|---|
| iPhone default light | n/a | Pass | Pass | Pass | **Pass** |
| iPhone default dark | n/a | Pass | Pass | Pass | **Pass** |
| iPhone AX5 light | Pass | Pass | Pass | Pass | **Pass**, F5 note |
| iPhone AX5 dark | Pass | Pass | Pass | Pass | **Pass**, F5 note |
| iPad default light | n/a | Pass | Pass | Pass | **Pass** |
| iPad default dark | n/a | Pass | Pass | Pass | **Pass** |
| iPad AX5 light | Pass | Pass | Pass | Pass | **Pass**, F5 note |
| iPad AX5 dark | Pass | Pass | Pass | Pass | **Pass**, F5 note |

</div>


**T-0565's screenshot condition passes.** This review set the condition as F1 and F2 landing and the eight shots taken again. Both are done, and F3 and F4 pass as well.

### New: F5, P2. Line numbers ride high on wrapped lines at AX sizes

At AX5 the number of every wrapped line sits above its first row. Its ink bottom is 16.3 pt (iPhone) and 16.5 pt (iPad) above the baseline of the code beside it, and its top is above the code's <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> height. Before T-0604 the gap was about 5 pt. Single-row lines are close to right: the number is centred in the line, 4 pt high on iPad at default, and that reads fine.

Cause: vendored Runestone 0.5.2, LayoutManager.swift:493-499. When a line has more than one fragment, it places the number at `(lineNumberFont.lineHeight * lineHeightMultiplier - lineNumberFont.lineHeight) / 2` from the line top. That uses the number font (clamp 17), not the code row (clamp 32), so the number lands at the top of the line. Wrapping only happens at AX sizes, so this only shows there.

Fix: centre the number in the first fragment, the same way single-fragment lines are centred. That is `(lineController.lineHeight / numberOfLineFragments - fontLineHeight) / 2`, which is exact for a monospaced face with no mixed sizes. It is a one-line patch to vendored code, so record it in pywidget/ios/Vendor/Runestone/PIN beside the pinned version. Board line T-0610, Idris. It does not block T-0565 or the alpha. The numbers stay readable and in the right order; they only sit high.

## Re-check (T-0614), 2026-10-28

**F5 passes on all four AX5 shots.** Idris's T-0610 (8102ffdc) centres a wrapped line's number on its first row. I measured with tools/png_sample.py's loader: the ink box of each number against the ink box of a capital on the code row beside it (top of the cap to the baseline), both in the editor ground. Tolerance 2 pt.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Re-check (T-0614), 2026-10-28, scrolls sideways" data-n="4" style="--tw:558px" markdown="1">

| Shot | Line 1 (number vs "T") | Line 3 (number vs "A") | Result |
|---|---|---|---|
| iPhone AX5 light | 0.0 pt | 0.0 pt | **Pass** |
| iPhone AX5 dark | 0.0 pt | 0.0 pt | **Pass** |
| iPad AX5 light | 0.5 pt high | 0.2 pt high | **Pass** |
| iPad AX5 dark | 0.5 pt high | 0.2 pt high | **Pass** |

</div>


Both lines wrap in every shot (line 1 runs five rows on iPhone, two on iPad; line 3 three on each). The numbers agree with Idris's 0.0 pt and 0.5 pt. The number's ink bottom now sits 5.3 pt (iPhone) and 5.5 pt (iPad) above the code baseline, down from 16.3 and 16.5 pt, which is where a 17 pt clamp figure belongs when centred on a 32 pt clamp row. Looked at each image: lines 4 to 6 on iPad, which have no capital to measure against, read on their first row too. Light and dark match pixel for pixel in the measures. No fault left; nothing new for Idris.
{% endraw %}

</div>
