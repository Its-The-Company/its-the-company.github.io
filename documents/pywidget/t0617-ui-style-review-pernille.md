---
layout: "default"
title: "T-0619: review of 9053ecd6 (T-0585, -editor-bench-style) and 7cb4505d (T-0617, -ui-style)"
section: "documents"
description: "Verdict: approve with fixes. Both mechanisms do what they claim, nothing leaks into a window a person sees, and the pixel bounds have wide margins on every measured shot. Two fix lines: the pixel check passes a blank\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0617-ui-style-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/reviews/t0617-ui-style-review-pernille.md</code></span></div><h1>T-0619: review of 9053ecd6 (T-0585, -editor-bench-style) and 7cb4505d (T-0617, -ui-style)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Date: 2026-10-28.
Read: `git show 9053ecd6`, `git show 7cb4505d` and `git show e90cf68d` (code only), the files at HEAD, the
`SyntaxKeyword/String/Comment` and `BgCanvas` colour sets, and the `T-0617 shot <name>: <share>` lines from the six
T-0617 runs (ops/runs/xcodebuild-20261028-223527, -223849, -224053, -224339, -224716, -224918; grep only, not the
logs). No Xcode run: Idris has the Simulator (T-0497), and nothing below needed one.

**Verdict: approve with fixes.** Both mechanisms do what they claim, nothing leaks into a window a person sees, and
the pixel bounds have wide margins on every measured shot. Two fix lines: the pixel check passes a blank frame and
cannot tell whose window it saw (P2), and the two launch arguments should be one (P3). Neither blocks the alpha
commit; F1 should land before any of these PNGs goes to App Store Connect.

## 1. Debug-only and inert on a normal launch: pass, with one note

- `UITestStyle` (App/SceneFile.swift:121-148) is inside the `#if DEBUG` block that opens at :83 and closes at :149,
  and its only call site (PyWidgetApp.swift:19) is inside `#if DEBUG` at :17-20. A Release build has no symbol.
- On a Debug launch without `-ui-style`, `requested` is nil and `install()` returns before adding the observer. A
  bad value (`-ui-style Dark`) also gives nil, so the app follows the system: inert, not wrong.
- Note: `-editor-bench-style` is **not** Debug-only. EditorBench.swift has no `#if DEBUG` around it, and
  PyWidgetApp.swift:59 says why: `-editor-bench` stays in Release because the EditorBench scheme times a Release
  build. It is still inert on a normal launch: `expectedStyle` is read only by `EditorBenchController`, which exists
  only on the `-editor-bench` route (PyWidgetApp.swift:78-80), and a shipped app cannot be given launch arguments.
  No user path reaches it. It does mean the Release binary carries a style switch it never uses (F2 removes it).

## 2. The pixel checks: they prove the appearance, with three gaps

What <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>:

- Measured shares, all 68 shots across iPad Pro 11-inch (M5) and iPhone 17e: light 0.004 to 0.192 (worst:
  pro-phone-light-ax5-offer), dark 0.911 to 0.996 (worst: pro-phone-dark-large-offer, pro-offer-dark). Against the
  bounds (light under 0.40, dark over 0.60) the nearest shot is 0.21 inside. Thresholds are neither tight nor loose.
- A wrong-appearance shot fails: before T-0617, the iPad's dark shots were light, and a light screen of this app sits
  under 0.2. The dark half of each pair is the half that tests the mechanism, since the Simulator's system setting
  is light; the light half would pass with no override at all. That is fine for the shots' purpose, but it means one
  direction of the override is proved per run, not both.
- The editor bench still asserts the Quill/Lumen colours: `pixelProof` (EditorBench.swift:248-279) resolves the
  theme from the editor view's own trait collection, counts pixels within 12 per channel of the keyword, string and
  comment colours, and A2c (EditorGateUITests.swift:173-177) needs `px["style"] == style` and over 50 of each. The
  light and dark syntax colours differ by far more than 12 in every channel (keyword #8A2F8F vs #C59BFF, string
  #1D6B40 vs #7FE3BA, comment #6B675E vs #9198B5), so a wrong-theme draw cannot pass the counts. `style_by` is a
  constant set inside the parsed-argument branch: it proves the argument was read, nothing more. Harmless.

The gaps (F1):

- **A blank frame passes.** An all-black PNG has a dark share of 1.0 and passes "dark"; an all-white one passes
  "light". The failure this whole change works around is a headless Simulator not showing what it holds, so a black
  or stale capture is the likely bad frame, not a random one. The real minority share never fell below 0.004 (about
  1,000 pixels at quarter size on the iPad), so "fewer than 0.05% of pixels on the minority side of the luma line"
  rejects a uniform frame without touching a real shot. Printing the shot's most common RGB next to the share costs
  one line and makes a wrong ground visible in the log (BgCanvas is #F7F5F0 / #0A0C13, neither pure white nor black).
- **The check cannot say whose window it saw.** ProPaywallUITests.save shoots `XCUIScreen.main`, not the app; if the
  app has gone (crash, Springboard) a light ask passes on a light home screen. The waits before each shot make this
  unlikely, but one `XCTAssertEqual(app.state, .runningForeground)` in each `save` closes it.
- **Any style but "dark" is checked as light.** `assertDrawn(png, "Dark", ...)` and `pywidget(style: "drak")` both
  run a light check (or launch with no override) without a word. Fail any value other than "light" or "dark".
- The A2c shots kept by `keep(app, ...)` are not run through `ShotPixels.assertDrawn`; the bench's own proof is of
  the editor view drawn back, not of the PNG that is kept. One call binds the kept file to its name.
- No test proves `ShotPixels` bites. A small test in the UITests target, no app launch, on synthesized PNGs (white,
  black, 70% dark with text-like noise, 30% dark) with a seeded mutant (flip `>` to `<`) would.

## 3. Should the two mechanisms be one: yes (F2)

They are the same thing twice: read `<flag> light|dark` from the arguments, set the window's
`overrideUserInterfaceStyle`. Two flag names, two parsers, two hook points (`viewIsAppearing` on one controller,
`UIWindow.didBecomeVisibleNotification` on every window), and two Debug policies. The A2c test is the only user of
`-editor-bench-style` (grep: EditorGateUITests.swift:161), it runs in Debug, and the Release timing runs pass no
style. So: A2c launches with `XCUIApplication.pywidget(style:)` and appends (`+=`, not `=`) its bench arguments;
`EditorBenchController.expectedStyle` becomes `UITestStyle.requested` under `#if DEBUG` and nil in Release; the
bench's `viewIsAppearing` override goes (UITestStyle sets the window earlier, at first visibility); the bench keeps
its bounded wait and reports `style_by: "ui-style"`. One flag, one Debug guard, and the Release binary loses a
switch it never needed. Not urgent: both work today.

## 4. No override leaks into a window a person sees: pass

- Every `overrideUserInterfaceStyle` and `preferredColorScheme` in App/, Shared/ and the widget is one of the two
  above (grep at HEAD). The observer is the only process-wide one and does not exist in Release.
- The observer is added once (`observer == nil` guard) from `PyWidgetApp.init`, before the first window, so every
  window in a `-ui-style` process gets it, including later scenes; none outside such a process does.
- The bench override is set on the bench's own window, on a route only a launch argument reaches.

## Scan test (e90cf68d), in passing

`UITestLaunchScanTests` bans `XCUIDevice.shared.appearance` with comments stripped and has a mutant for each shape.
It does not see `let d = XCUIDevice.shared; d.appearance = .dark`. Same class of gap as the one it already names;
not worth a line.

## Fix lines

- F1 = T-0621 (P2, Idris): ShotPixels.assertDrawn fails a near-blank frame, a style other than light/dark, and a shot taken
  with the app not in the foreground; prints the modal RGB; A2c's kept shots go through it; a unit test with a
  seeded mutant proves it bites.
- F2 = T-0622 (P3, Idris): one appearance flag: the editor bench reads `-ui-style` through UITestStyle (Debug only) and
  `-editor-bench-style` is removed.
{% endraw %}

</div>
