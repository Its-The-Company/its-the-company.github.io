---
layout: "default"
title: "App guide, part 8: Lock Screen widgets"
section: "documents"
description: "Lock Screen widgets: what Apple provides, what pywidget adds, limits, and all twelve premade widgets."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-guide/' | relative_url }}">← App Guide</a><a href="{{ '/documents/pywidget/app-guide-08-lock-screen.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Guide</span><span>Day 9 · Fri Oct 30</span><span><code>pywidget/app-guide-08-lock-screen.md</code></span></div><h1>App guide, part 8: Lock Screen widgets</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div><p class="meta">Mockup screens are drawn; they go public after creative approval.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Part 8 of 10 of the pywidget app guide. The index, with the reading notes, is [app-guide.md](app-guide.html).

Lock Screen widgets are not a separate feature. They are three more **sizes** of the same widget, drawn by the same engine. This section is the page the Investors were offered on issue #41 and accepted ("Yes please!"). It repeats the explanation already given there and adds a picture of every premade widget in every Lock Screen size it offers.

## 8.1 What they are (Apple's part)

Since iOS 16 the iPhone Lock Screen can hold small widgets in two places: one line of text above the clock, and a row of up to four slots below it. Apple names the sizes:

- **Inline**: one line of text, optionally with a small symbol, above the clock.
- **Circular**: a small circle below the clock, good for a gauge, a ring or a number.
- **Rectangular**: a wider slot below the clock, two or three short lines or a tiny chart.

Apple draws them **without colour**. The system turns the widget into shades of one tint that match the clock, so a design has to read as a silhouette. With Always-On they are dimmed further. iPad Lock Screens and StandBy (a charging iPhone on its side) use the same sizes.

## 8.2 How pywidget does it (our part)

- A person's Python script says which sizes it supports and, for each size, returns a description of what to show: the same "view tree" as for Home Screen widgets. One script can show a full card on the Home Screen and a single ring on the Lock Screen.
- The Swift renderer draws Lock Screen sizes exactly as it draws Home Screen ones. Apple supplies the monochrome look; the renderer adds Apple's standard Lock Screen pieces, such as the soft circle or pill background and gauge styles made for that space.
- Freshness is the same as on the Home Screen. Python runs in the app (when it is open, or from a Shortcuts automation, which is in the code but not measured on a phone), saves the result, and the Lock Screen widget redraws it. Background refresh is planned for 1.0 and is not built at HEAD (T-0793; cut check T-0795; section 4.1). Times and countdowns tick by themselves without Python running.
- To add one, the person long-presses the Lock Screen, taps Customize, taps the widget row, and picks pywidget. This is Apple's standard flow.

## 8.3 Limits worth knowing

- No colour and very little room: one or two short facts at most. Photos turn into muddy silhouettes, so designs use text, symbols and simple shapes.
- Not interactive in version 1. Tapping opens the app. Buttons are planned for 1.1.
- iOS rations refreshes, as on the Home Screen: Apple says a widget people view often typically gets reloads roughly every 15 to 60 minutes, though it varies, so a widget shows its last result and when it was made, not live data (section 4.1). Clocks and timers are the exception.
- Nobody has yet seen them on a real iPhone. Device testing waits on the signing request (issue #100).

## 8.4 All twelve premade widgets

All twelve premade widgets offer at least one Lock Screen size (the `FAMILIES` line in each `pywidget/widgets/premade/*.py`). A cell says "not offered" where that premade does not list the size. There are 24 pictures.

**What these pictures are (Commandment 33).** Each is a **Simulator render**: the app's own SwiftUI renderer, the one the widget extension uses, run in a test on the iPhone Simulator and saved as a PNG. They are not screenshots of a Lock Screen, and not photos of a phone. What is stand-in: the grey background (real Lock Screens show the wallpaper), the sizes (72 by 72 points, 160 by 72, 210 by 20; real sizes differ by iPhone model), and the data, which is each premade's saved example from `pywidget/tests/widgets/fixtures/premade-trees/` with a fixed clock of 31 October 2026, 9:41 AM. The render uses the "vibrant" mode, which is how Apple tints Lock Screen widgets, shown here in white on grey because the real tint comes from the wallpaper. Countdown and Day progress timers read the Mac's clock, not the fixed one, so their time text can differ from run to run. Each picture is saved at twice the size.

The code that made them is the test `testLockScreenGuideRenders` in `pywidget/ios/Tests/PremadeSnapshotTests.swift`. It calls no image-making AI. To remake them: `tools/xc.sh -project PyWidget.xcodeproj -scheme PyWidget -destination "platform=iOS Simulator,name=iPhone 17e" test -only-testing:PyWidgetTests/PremadeSnapshotTests/testLockScreenGuideRenders`, run in `pywidget/ios/`. The pictures are in `pywidget/app-guide-shots/lockscreen/`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 8.4 All twelve premade widgets, scrolls sideways" style="--tw:502px" markdown="1">

| Premade | Circular | Rectangular | Inline |
|---|---|---|---|
| Altitude |  |  | not offered |
| World clocks | not offered |  |  |
| Countdown |  |  |  |
| Distance to a saved place | not offered |  |  |
| GitHub repository | not offered |  | not offered |
| Habit tracker |  | not offered | not offered |
| Day progress |  |  |  |
| Quote of the day | not offered |  | not offered |
| Shortcuts launcher |  | not offered | not offered |
| Steps and floors |  |  |  |
| Storage |  |  | not offered |
| Sunrise and sunset |  |  |  |

</div>
{% endraw %}

</div>
