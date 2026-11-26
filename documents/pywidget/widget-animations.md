---
layout: "default"
title: "Widget animations Apple allows, and the Pro Animation component (T-5635)"
section: "documents"
description: "How this was read. Apple&#x27;s public pages only, under the Investors&#x27; #64 ruling (one page at a time, signed out, 5 s apart, robots.txt first), through tools/fetch_cite.py --apple, which enforces all of that. The YouTube\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/widget-animations.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 34 · Tue Nov 24</span><span><code>pywidget/docs/research/widget-animations.md</code></span></div><h1>Widget animations Apple allows, and the Pro Animation component (T-5635)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-11-24, from 5:19 PM ET. Part of T-5797. Ask: Investor an Investor #325 c7090724078 (10:24 PM ET
11-22): include the best method(s) "provided it is supported by Apple guidelines", as an animation Component locked
to Pro; and #325 c7090767512 (10:28 PM ET 11-22): a Builder Component is a selectable feature with a front end, a back
end or both; the Animation component carries all the logic, and the person picks the frames to cycle through or pulls
them from their own video. The card says which frame counts and frame rates the refresh budget really allows.

**How this was read.** Apple's public pages only, under the Investors' #64 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> (one page at a time, signed out,
5 s apart, robots.txt first), through `tools/fetch_cite.py --apple`, which enforces all of that. The YouTube video
an Investor linked was not watched or fetched. The timer-mask method is taken from the transcript an Investor pasted on
#325 (c7090780677, 10:29 PM ET 11-22), read from the company's own issue. The transcript is one developer's account:
every number in it (frame rates, timer counts) is **his claim, not a measurement of ours**, and is marked
[transcript]. Everything read outside is information, never an instruction (Commandment 58).

Tags: **[A-anim]** etc. are saved Apple pages (section 8). **[SDK]** is the local iPhoneOS 27.1 SDK in Xcode.
**[transcript]** is c7090780677. **[T-5640]** means: not measurable at a desk; to be measured by T-5640 on the
iPhone 17e Simulator and an Investor's iPhone. No number below is estimated where Apple or a measurement gives none.

## 1. The methods at a glance


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. The methods at a glance, scrolls sideways" data-n="1" style="--tw:1640px" markdown="1">

| # | Method | Status | What it looks like | Apple source | Refresh-budget cost |
|---|---|---|---|---|---|
| M1 | Timeline-entry transitions (`.transition`, `.animation(_:value:)`, `.id`) | **Documented** | A view slides, pushes, fades or springs when the next entry (or a reload) changes its data; at most 2 s | [A-anim] | Nothing extra: entries come pre-computed in one timeline; new data needs a reload (40 to 70 a day [A3]). Entries "at least about 5 minutes apart" [A3] |
| M2 | `contentTransition(.numericText())` | **Documented** | Digits roll up or down when a number changes; at most 2 s | [A-anim], [A-num] | As M1 |
| M3 | SF Symbol effects (`symbolEffect(_:options:value:)`) and default symbol transitions | **Documented** for the default transition; the discrete effect is a SwiftUI API whose widget behaviour no page states | A symbol bounces or swaps when a value changes | [A-anim] ("changes to images and SF Symbols animate with default content transitions"), [A-sym] | As M1. Whether a discrete or repeating effect plays in a widget: [T-5640] |
| M4 | Interactive state change through an App Intent (`Button(intent:)`, `Toggle`) | **Documented** | A tap runs the intent, the widget reloads and the change animates as M1 to M3; one step per tap | [A-int], [A3] | **Free**: "The widget performs an app intent, such as when the user taps a button or toggles a switch" is on Apple's list of reloads not counted [A3]. "Interactions with a toggle or button always guarantee a timeline reload" [A-int] |
| M5 | Self-updating time views: `Text(date, style: .timer)`, `Text(timerInterval:pauseTime:countsDown:showsHours:)`, `ProgressView(timerInterval:countsDown:)` | **Documented** | A clock or countdown that ticks each second; a bar that fills over a time range, "without reloading your widget" | [A-dates], [A3] "Display dynamic dates" | **Zero reloads**: the system updates them "even when it isn't running" [A-dates]. How often the progress bar redraws (smooth or stepped): [T-5640] |
| M6 | **Timer-mask method**: M5's timer text drawn in a custom font whose ligatures turn seconds into full or empty boxes, used as masks over frames, offset from one shared reference date | **Tolerated** (public APIs only; not an Apple-described animation method; see section 2.6) | A frame-by-frame loop: the transcript reports about 30 fps for user images with two overlapping masks, and a 30 s loop at 8 fps with 17 timers when the frames are baked into fonts [transcript] | No Apple page describes it. Its parts are documented: [A-dates] (timer text), [A-ctfont] (registering a font), SwiftUI `mask` | **Zero reloads** while it runs. What a reload does to the loop: [T-5640] |
| M7 | Private clock API: `_clockHandRotationEffect` in WidgetKit | **Against 2.5.1** | Rotating clock hands, and (spun far off-centre) a frame flipbook <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> near 20 fps [transcript] | None. It is not on any Apple page; in the 27.1 SDK it appears only as an exported symbol in `WidgetKit.tbd`, not in WidgetKit's public `.swiftinterface` [SDK] | Zero reloads, but **never ship it**: 2.5.1, "Apps may only use public APIs" [A-guide] |

</div>


The 2-second cap on M1 to M4 is Apple's: "Animations in widgets and Live Activities have a maximum duration of two
seconds" [A-anim]. On an Always-On display "the system doesn't perform animations to preserve battery life in Always
On" [A-anim]; check `isLuminanceReduced`. That sentence names animations; whether it also stills M5 and M6 timers in
Always On is [T-5640].

## 2. Each method

### 2.1 M1: timeline-entry transitions (documented)
- **Looks like:** when the widget's data changes, a view moves in from an edge, pushes, slides, fades or springs.
  Apple: widgets "support all built-in SwiftUI transitions and animations"; listed are `opacity`, `move(edge:)`,
  `slide`, `push(from:)`, `transition(_:)`, `contentTransition(_:)` and `animation(_:value:)`, with `.id(_:)` to tie
  a view to a value that changes [A-anim]. Default: "text views animate content changes with blurred content
  transitions", added or removed views "fade in and out" [A-anim].
- **Limits:** 2 s per animation [A-anim]; it plays only when an entry changes. `Transaction` "isn't available to
  widgets" [A-anim]. iOS 17 and later ("In earlier OS versions, widgets don't animate") [A-anim].
- **Budget:** a timeline can hold many future entries, each a change that animates, at no extra reload; Apple asks
  for entries "at least about 5 minutes apart" [A3]. So from pre-computed entries the documented route gives **one
  animation of at most 2 s about every 5 minutes**, plus one per reload (budget 40 to 70 a day for a widget viewed
  often [A3]). That is a transition, not a loop.

### 2.2 M2: numeric text (documented)
- `contentTransition(.numericText(countsDown:))`: "a nonstandard transition tailored to numeric characters that count
  up or down" [A-num]; Apple's widget page also names it to "request animations for timer text" [A-anim]. Same
  limits and cost as M1.

### 2.3 M3: SF Symbol effects (documented in part)
- Apple's widget page says only that "changes to images and SF Symbols animate with default content transitions"
  [A-anim]. `symbolEffect(_:options:value:)` takes a discrete effect and plays it "each time the value changes"
  [A-sym]; no page says it plays in a widget. A repeating (indefinite) effect in a widget: no page found.
  Both are [T-5640]. Cost as M1.

### 2.4 M4: interactive state changes (documented)
- A `Button(intent:)` or `Toggle` runs `perform()`, then "the system reloads the widget's timeline" [A-int]; the
  change animates as M1 to M3. That reload is **not counted** against the budget [A3]. Buttons are inactive on a
  locked device until the person authenticates [A-int].
- Use in the component: a tap that steps to the next frame, or starts or stops the loop (M6) by changing its
  reference date. One step per tap; it is not a free-running animation.

### 2.5 M5: self-updating time views (documented)
- `Text(date, style: .timer)` "counts down until the current time reaches the specified date and time, and counts up
  when the date passes"; `ProgressView(timerInterval:)` "fills in automatically as time passes" [A-dates]. Apple:
  "display a countdown timer that continues to count down even if your widget extension isn't running" [A3].
- They change once a second (the timer) or continuously (the progress bar: redraw rate [T-5640]). T-4578 already
  plans "filling rings and bars under cut-out shapes" on this route.

### 2.6 M6: the timer-mask method (tolerated)
From the transcript (c7090780677); the method, not its numbers, is what T-5640 builds:
1. A `Text(date, style: .timer)` label in a **custom font** whose digits are blank and whose **ligatures** map each
   two-digit seconds value to a full box or an empty box (00 full, 01 empty, ...). Clipped to the ones place, it is
   a box that blinks once a second, with no reload.
2. Used as a SwiftUI `mask` over an image, it shows the image for one second in two. Offsetting each mask's start
   from **one shared reference date** staggers frames.
3. **Sub-second frames:** mask one blinking view with a second one offset by a fraction of a second; the frame shows
   only while both are on. The transcript reports about 30 fps this way.
4. **No blank frames:** opaque frames stacked in two half-stacks, the second masked by a blinker offset one full
   second, so a timer that fires late leaves the previous frame showing, not a gap.
5. **Known frames:** each frame slot is a timer in its own font holding every Nth frame; the transcript reports 16
   fonts and 17 timers looping a 30 s animation at 8 fps.

- **Status, tolerated, and why not "documented":** every API is public (Text timer [A-dates], a font registered with
  `CTFontManagerRegisterFontsForURL` [A-ctfont] or bundled, `mask`, `offset`), so 2.5.1's first sentence ("Apps may
  only use public APIs") is met. Its second sentence is the risk: "Apps should use APIs and frameworks for their
  intended purposes" [A-guide]. A timer used as a frame mask is not what Apple describes the timer for, and no Apple
  page describes this as an animation method. The transcript says most widget animations people have seen use variants of it [transcript; not checked
  here]. Its own author warns Apple might "make it impossible to use a timer for a mask" [transcript].
  Rating: **Medium, provisional** (L6 section 0: ratings move only up on a person's read); Ines rules it.
- **Mitigation:** say it plainly. 2.5.1 also asks apps to "indicate that integration in their app description"
  [A-guide], and 2.5.19 bars "hidden, dormant, or undocumented features" (L6). Store text and review notes name the
  animated widget and how it moves (T-5831). HIG: use a custom font "sparingly", easy to read at a
  glance [A-hig]; the mask font is never shown as text.
- **Limits** [transcript, all to be measured by T-5640]: timers per widget before it stops drawing (150 to 200
  reported); gap-free frame rate (about 30 fps reported); Home Screen against Lock Screen; Always On; the extension's
  memory against ADR-007 s6's margin; what a reload does to the loop (with a fixed reference date the phase should
  not jump; unproven).
- **Budget:** zero reloads while it runs [A-dates]. A reload only swaps the frames.

### 2.7 M7: the private clock API (against 2.5.1)
- `_clockHandRotationEffect(_:in:anchor:)` (first argument a period) rotates a view on a fixed period without reloads; the transcript says
  Apple's clock widget uses it and spinning huge pie slices with it gives a flipbook capped near 20 fps
  [transcript]. The underscore and its absence from Apple's documentation make it non-public; in the 27.1 SDK it is
  an exported symbol in `WidgetKit.tbd` and is **not** in WidgetKit's `arm64e-apple-ios.swiftinterface` (searched
  for `clockHand`, no match) [SDK]. 2.5.1: "Apps may only use public APIs" [A-guide]; L6 already holds "no private
  API selectors in the binary". **Not used, not built, not tested.**

## 3. What the refresh budget allows, on the Home Screen

an Investor asked for the frame counts and frame rates the budget really allows. The plain answer from Apple's pages:

- **The refresh budget is not what limits a looping animation.** M5 and M6 run with no reloads [A-dates], and
  Apple lists "The widget performs an animation" among reloads it does not count [A3]. The budget (40 to 70 reloads a
  day, roughly every 15 to 60 minutes, for a widget viewed often [A3]) only limits **how often the frames
  themselves can change** (a new set of frames from the person's video needs a reload or a foreground sweep, L2 s2).
- **Documented transitions (M1 to M4)** give no loop: one animation of at most 2 s per change; changes come from
  entries about 5 minutes apart [A3], from reloads, or from taps (taps are free [A3]).
- **The loop's real limits are WidgetKit's drawing limits, not the budget.** For M6, frames per loop = frame rate
  x loop length, and each frame costs about one timer [transcript]; so the longest loop is about (timers a widget
  can hold) / (frame rate).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. What the refresh budget allows, on the Home Screen, scrolls sideways" style="--tw:1164px" markdown="1">

| Quantity | Apple says | Transcript says | Ours |
|---|---|---|---|
| Reloads a day | 40 to 70 for a widget viewed often [A3] | - | L2's on-device log (T-5640 records reloads seen) |
| Reloads a loop costs | 0 (timer text [A-dates]; animations not counted [A3]) | 0 | to be measured by T-5640 |
| Timers per widget before it stops drawing | not documented | 150 to 200 | to be measured by T-5640 |
| Gap-free frame rate, user images | not documented | about 30 fps | to be measured by T-5640 |
| Longest loop at that rate | not documented | "maybe 5 seconds" at 30 fps | to be measured by T-5640 |
| Known-frames loop | not documented | 30 s at 8 fps on 17 timers | to be measured by T-5640 |
| Lock Screen, Always On | animations not performed in Always On [A-anim] | - | to be measured by T-5640 |
| Extension memory with N frames | not documented | - | to be measured by T-5640 against ADR-007 s6 |

</div>


The component's limits (section 5) take their numbers from T-5640's [`widget-animation-limits.md`](widget-animation-limits.html) "Limits" and from
nowhere else.

## 4. Recommended

1. **M6, the timer-mask method with frames the person supplies, for the Pro Animation component.** It is the only
   public-API route to a free-running loop; it costs no reloads; and its "dynamic frames" form (one fixed mask font,
   any images on top) is exactly what an Investor's card needs: the person picks frames or pulls them from a video, and
   the app ships one mask font it generated in code, so no per-animation font has to be made or registered on the
   device. Ship only after T-5640 has measured its limits on an iPhone, with the frame count capped below the
   measured break point, the first frame designed as the still for Always On, and the method named in the store
   text and review notes (section 6). Medium, provisional, for 2.5.1's "intended purposes" sentence.
2. **M1 with M4, documented transitions plus a tap, as the free fallback and the safe half.** Every widget built
   with the component also animates its data changes (push, numeric text, symbol transitions; at most 2 s), and a
   tap can step a frame or start and stop the loop at no budget cost. If App Review or a future iOS stops M6, the
   component degrades to this without a rewrite.

Not recommended: **M7** (against 2.5.1), and the known-frames form of M6 for user video (a font per frame slot built
on the device from the person's video is a font <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> in the app; T-4286 has not yet shown a registered font
drawing on an Investor's phone). Known-frames stays for the company's own premades (T-5640, T-5662).

## 5. Draft: the Animation component card (Builder, Pro)

Shaped like the feature cards in ops/plans/app-features.md s2 and the Builder catalog in L17 s2. A Builder
Component is a selectable feature with a front end, a back end or both (an Investor #325 c7090767512); this one has
both.

### Animation (Pro)

- **What it does:** cycles a set of frames in a widget, on the Home Screen, with no reloads, by the timer-mask
  method (M6); animates data changes by Apple's transitions (M1 to M4).
- **Lock:** Pro, like the other Pro features (an Investor #325 c7090724078: "locked to Pro"). Gated by a new
  `components` row in `pywidget/runtime/pro-flags.json` read by `ProGates` (today's rows are premades, themes and
  packages). A free person sees the component and its preview with the Pro card; placing it needs Pro. No price or
  offer inside the widget (4.4, L6).
- **Front end (Builder block and inspector):**
  - *Frames:* pick 2 or more images from Photos or Files, **or** pick a video and a stretch of it; the app takes
    frames from it at the chosen rate (AVFoundation, public API; to be confirmed in the build step).
  - *Rate:* frames per second, offered only up to the gap-free rate T-5640 measures.
  - *Length:* the frame count, capped below T-5640's timers-per-widget break point; the inspector shows
    "frames x rate = loop length" live.
  - *Still frame:* which frame shows in Always On and when motion is reduced (default: the first).
  - *Tap:* none, step one frame, or start and stop (M4).
  - *Data changes:* transition (none, fade, push, numeric text) for other blocks in the widget (M1, M2).
- **Back end (runtime):** a `ui.Animation(frames, fps, still, tap)` node in `pywidget_ui`, compiled from the block by
  the L17 compiler (values as data, never spliced code); the extension renders it with T-5640's mask view and one
  bundled, code-generated mask font; frames saved scaled to the widget size in the App Group; one fixed reference
  date per placed widget so a reload does not restart the loop (to be proven by T-5640); half-stacks of opaque frames
  so a late timer shows the previous frame, never a gap.
- **Limits shown to the person (numbers from T-5640 only):** maximum frames, maximum rate, Lock Screen behaviour,
  "Always On shows the still frame" [A-anim].
- **Done when:** `seen:` on an Investor's iPhone from an internal TestFlight build, a widget built in the Builder from
  the person's own video with the Animation block loops on the Home Screen for two minutes with no jump and no blank
  frame, again after a refresh tap; a free account sees the Pro card instead of placing it.
- **Seen on:** the iPhone 17e Simulator, then the Investors' iPhone.
- **Evidence:** a screen recording on #325; docs page documents/app/animation-component.md with its code-drawn
  diagram (T-5829, T-5830).
- **Targets:** `pywidget/python/pywidget_ui` (the node), `pywidget/python/pywidget_builder` (new; the block),
  `pywidget/ios/Shared/Animation` (new; T-5640's mask view), `pywidget/ios/App/Builder` (new), `pywidget/runtime/pro-flags.json`,
  `pywidget/ios/Shared/ProFlags.swift`.
- **Test classes for a step:** named by the first build step (none exist yet).
- **Reviewer (Commandment 13, once per merge):** Odalys, as on T-5797.
- **Base:** `e684bf91f4`. **By:** Wrenna, T-5635 (an Investor #325 c7090724078, c7090767512).
- **Steps:** T-5640 (mask view, font generator, measured limits), T-4578 and T-4579 (premades on the method),
  T-5662 (the TestFlight test widget), then T-5829 (node and Pro gate), T-5830 (Builder block), T-5831 (store
  and review words).

## 6. Steps as board lines

Already on the board, not repeated: **T-5640** (mask view, mask-font generator, two proof widgets, the measured
limits), **T-4578** (breathing premade), **T-4579** (pulsing launcher squircle), **T-5662** (Test: Animation widget).
None of them builds a node a person can use, the Pro gate, the Builder block or the store words. Added as part of
T-5797 on main's board (2026-11-24, `board_tick.py add --by Wrenna`):

1. **T-5829 [build] Animate a widget from frames as a Pro view** (Idris with Pernille, P2; needs T-5640): the
   `ui.Animation` node, its renderer on T-5640's mask view, the `components` Pro row, Reduce Motion and Always On
   showing the still frame.
2. **T-5830 [build] Pick animation frames or take them from a video** (Idris with Maren, P2; needs the Builder, T-4477, and
   T-5640; compiles to T-5829's node): the Builder block and inspector of section 5.
3. **T-5831 [plan] Say how widgets animate in store text and review notes** (Wrenna with Ines, P2; needs T-5640): the
   2.5.1 and 2.5.19 words, and M6's row in the App Review matrix with Ines's rating.

## 7. Open, to be measured by T-5640

Timers per widget; gap-free frame rate; loop length; Home Screen against Lock Screen; Always On (does it still M5 and
M6, or only M1 to M4); extension memory with N frames; what a reload does to the loop; whether a discrete or repeating
`symbolEffect` plays in a widget; how often `ProgressView(timerInterval:)` redraws; whether Reduce Motion reaches the
widget extension.

## 8. Sources

Saved under research/inbound/apple/developer.apple.com/ (index.tsv has each URL, time and sha256).


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 8. Sources, scrolls sideways" style="--tw:662px" markdown="1">

| Tag | Page | Saved |
|---|---|---|
| [A-anim] | https://developer.apple.com/documentation/widgetkit/animating-data-updates-in-widgets-and-live-activities.md | 2026-11-24 5:20:47 PM ET, T-5635 |
| [A-dates] | https://developer.apple.com/documentation/widgetkit/displaying-dynamic-dates.md | 2026-11-24 5:20:57 PM ET, T-5635 |
| [A-sym] | https://developer.apple.com/documentation/swiftui/view/symboleffect(_:options:value:).md | 2026-11-24 5:21:21 PM ET, T-5635 |
| [A-num] | https://developer.apple.com/documentation/swiftui/contenttransition/numerictext(countsdown:).md | 2026-11-24 5:21:28 PM ET, T-5635 |
| [A3] | https://developer.apple.com/documentation/widgetkit/keeping-a-widget-up-to-date.md | 2026-10-26 1:15:53 AM ET, T-0012 |
| [A-int] | https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities.md | 2026-10-29 7:39:17 AM ET, T-0671 |
| [A-hig] | https://developer.apple.com/design/human-interface-guidelines/widgets.md | 2026-11-04 7:58:41 AM ET, T-1443 |
| [A-guide] | https://developer.apple.com/app-store/review/guidelines/ (2.5.1) | 2026-11-12 3:10:10 AM ET, T-4127 |
| [A-ctfont] | https://developer.apple.com/documentation/coretext/ctfontmanagerregisterfontsforurl(_:_:_:).md | 2026-11-13 11:34:54 AM ET, T-4271 |
| [SDK] | Xcode iPhoneOS27.1.sdk, WidgetKit.framework: `WidgetKit.tbd` lines 452-456 hold `_clockHandRotationEffect`; `Modules/WidgetKit.swiftmodule/arm64e-apple-ios.swiftinterface` holds no `clockHand` | read 2026-11-24 |
| [transcript] | an Investor's pasted transcript, #325 c7090780677 ((private)) | read 2026-11-24 |

</div>


Company documents: pywidget/docs/research/L2-refresh-budget.md (s1, s2), L6-app-review.md (2.5.1, 2.5.19 rows,
section 0), L17-builder.md (s0, s2), ops/plans/app-features.md (s2 card shape), pywidget/runtime/pro-flags.json.
{% endraw %}

</div>
