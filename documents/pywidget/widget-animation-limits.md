---
layout: "default"
title: "Widget animation limits: the timer-mask method, measured (T-5640)"
section: "documents"
description: "WK_ANIM=1 WK_ONLY=testWAnimationLimitsOnTheHomeScreen pywidget/ios/scripts/widgetkit_check.sh &lt;out&gt; on the pywidget-wk-check Simulator (iPhone 17e, iOS 27.0), UITests/AnimationLimitsTests.swift. It first installs a font\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/widget-animation-limits.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 36 · Thu Nov 26</span><span><code>pywidget/docs/research/widget-animation-limits.md</code></span></div><h1>Widget animation limits: the timer-mask method, measured (T-5640)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-11-26. Part of T-5797. Feeds pywidget/docs/research/widget-animations.md ("Recommended", section 3's
"Ours" column) and T-5829's frame <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>. Every number here is a measurement of ours or is marked **not measured**;
nothing is copied from the transcript (widget-animations.md [transcript]) as if it were ours.

**Status: not finished.** The first Home Screen runs found that the loop, as built, does **not move** on the iPhone 17e
Simulator: so there is no gap-free frame rate, timer count or loop length to state yet, and no cap for T-5662 or
T-5829 to use. Section "Limits" says what was measured and what was not.

## How it is built

- **Fonts:** `pywidget/ios/scripts/make_mask_fonts.py` writes six TrueType fonts in our own code, no outside font,
  library or tool (Commandment 6). For loops of 2, 5 and 10 s: a frame font F*P* draws a full box for the seconds'
  ones digits d with d % P = 0 and nothing for the rest; a split font S*P* draws a box for the loop's second half.
  1.4 KB each; bundled in the app and the widget extension (UIAppFonts).
- **View:** `Shared/Animation/TimerMaskView.swift`. Each frame is masked by `Text(date, style: .timer)` in a mask
  font, pinned so only the ones digit shows, so the frame is visible for 1 s of every P. Frame *i* starts *i* x P / N
  seconds after one fixed reference date; frames stack in order, so the newest one on is on top. Two half-stacks
  (the second under the split font's mask) and an unmasked last frame underneath mean a late timer shows the frame
  before it, never a gap. Timers per widget: N + 1. Public APIs only; no private clock API (2.5.1).
- **Node:** `ui.Animation(drawn, frames, seconds, fill, ground)` (pywidget_ui, viewtree.schema.json,
  `Shared/Animation/TreeAnimation.swift`), reference date 2026-01-01 12:00 AM UTC for every widget, Always On shows
  frame 0.
- **Proven at a desk** (unit tests, ImageRenderer): the frame on top is the plan's at every sampled phase
  (TimerMaskRenderTests). ImageRenderer draws the timer as a plain string; the Home Screen does not (below).

## How it is measured

`WK_ANIM=1 WK_ONLY=testWAnimationLimitsOnTheHomeScreen pywidget/ios/scripts/widgetkit_check.sh <out>` on the
pywidget-wk-check Simulator (iPhone 17e, iOS 27.0), `UITests/AnimationLimitsTests.swift`. It first installs a font
probe (the loops' timer drawn visibly, once in the F2 mask font and once in the system font) and shoots it; then it
places a small (breathing circle) and a medium (strip) widget of a person's own id (`new_widget`) and, phase by
phase, installs a strip of N cells over P seconds and shoots the screen as fast as XCUIScreen allows for 12 s (55 to
62 shots a phase). Each shot reads which cell is lit (the red run on the widget's middle row) and compares it with the
frame due at the shot's time. One JSON line a phase goes to `<out>/anim-limits.jsonl`: gaps (no cell lit), lag
against the plan, and how many distinct cells were lit (`lit_distinct`: a loop that moves lights many, a stuck one
lights one). The script samples the extension's footprint every 2 s into `<out>/anim-footprint.tsv`.

Runs, 2026-11-26 (all kept in scratch T-5797-idris/, each with its xcodebuild log in ops/runs/):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: How it is measured, scrolls sideways" style="--tw:404px" markdown="1">

| Run | What it showed |
|---|---|
| 2:02 AM | Harness fault: the document had no `timeline.sampled_at`, which the install requires. Fixed |
| 2:13 AM | Every phase read as a gap: an unknown `pywidget.premade.*` id draws the Pro card. Fixed: the widget is `new_widget` |
| 2:24 AM | The loops draw: no gap in phases of 21 to 121 timers. The lag is spread over the whole loop (2 fps: within one frame in 15 of 58 shots) |
| 2:51 AM | With `lit_distinct`: **one cell lit in every shot of every phase, always the last** (the unmasked base frame). The font probe: the mask font does reach the widget (box glyphs drawn), and the timer reads "7903:54:00" (hours since the reference date) and is **truncated at its tail** ("7903:5..." in the small size), so the ones digit the mask needs is never drawn |
| 3:04 AM | Trial, not kept: the cell given four ems and `.truncationMode(.head)`. A masked frame now shows (cell 12 of 20, 46 of 60), but over the left part of the small circle only, and **still one cell in every shot of a phase**: the loop did not move in any 12 s window |

</div>


## Limits

Measured on the iPhone 17e Simulator, iOS 27.0, Home Screen, 2026-11-26:

- **Frames on screen without a gap:** no gap in any shot with 21, 51, 61 and 121 timers in the medium widget (the
  base frame under the stacks is always there). With 151, 201 and 301 timers no cell was read at all, but the test
  frame itself is the cause: the strip's 2 pt spacing leaves cells under a point wide past about 120 cells, so the
  widget draws only its green ground. Not a timer limit; not measured.
- **Gap-free frame rate:** **not measured.** The loop did not move: one cell lit through every 12 s phase.
- **Timers per widget before it stops drawing:** **not measured.** Up to 121 + 21 (two widgets) drew; above that the
  test frame cannot show.
- **Loop length:** **not measured.**
- **After a reload** (the same tree installed again): it draws with no gap; whether the phase carries on cannot be
  read while the loop does not move.
- **Extension memory:** the median footprint while a phase held was 18.5 to 23.1 MiB for 20 to 300 frames.
  Single 2 s samples jumped to 116 to 491 MiB: in the 2:24 AM run at 150, 200 and 300 frames (116, 248, 451 MiB), in
  the 2:51 AM run at 20 frames just after the probe (298) and at 300 (491), so a peak cannot be tied to the frame count
  yet, and the strip frame draws N cells in each of N frames (N squared views). The Simulator has no extension memory
  limit; a device figure against ADR-007 s6's margin needs a real iPhone. Not measured there.
- **Lock Screen and Always On:** **not measured** (the harness places Home Screen widgets only).
- **Cap, timers per widget view, and cap, frames a second:** none yet. T-5662's widget and T-5829's node wait for them.

## What is next

1. Why the masked timers do not change: a probe with two shots a few seconds apart shows whether the Home Screen
   redraws `Text(date, style: .timer)` at all on this Simulator, and whether XCUIScreen sees it.
2. Keep the ones digit inside the cell however the system lays out the timer: a reference date close to the widget's
   placing (a whole number of loops before it, so a reload keeps the phase) keeps the text short; or a frame wide
   enough for the whole text.
3. A strip test frame whose cells stay readable past 120 frames (no spacing, or one cell for several frames).
4. Then the measured caps, here, in the two lines T-5662's test reads.
{% endraw %}

</div>
