---
layout: "default"
title: "T-0615: review of 2da24abe (T-0601, PW_FRESH_SCENES)"
section: "documents"
description: "Verdict: approve with fixes. The fixes are small (one P3 board line, T-0616). Nothing here blocks the commit staying on main."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0601-fresh-scenes-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/reviews/t0601-fresh-scenes-review-pernille.md</code></span></div><h1>T-0615: review of 2da24abe (T-0601, PW_FRESH_SCENES)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Date: 2026-10-28.
Read: `git show 2da24abe` (code only) and the files at HEAD. No Xcode run: nothing below needed one to prove.

**Verdict: approve with fixes.** The fixes are small (one P3 board line, T-0616). Nothing here blocks the commit
staying on main.

## 1. Compiled out of Release, off on a normal launch: pass

- `FreshScenes` (App/SceneFile.swift:83-114) sits wholly inside `#if DEBUG`, and so do both call sites
  (PyWidgetApp.swift:17-19 in `init`, :130-132 in the IDEScene probe). A Release build has no symbol to call.
- `DEBUG` comes only from the project-level Debug configuration (`SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG`,
  project.pbxproj:1473). No Release configuration sets it, and project.yml does not add it. Archive uses Release.
- In a Debug build both halves check `PW_FRESH_SCENES == "1"` in the process environment. Only
  `XCUIApplication.pywidget()` sets it (grep: no script, scheme or yml sets it). A Debug app opened from the Home
  Screen or run from Xcode restores its windows as before.

## 2. User data: pass

- The one delete is `<sandbox>/Library/Saved Application State` (SceneFile.swift:99-100). Scripts and the bridge's
  files live in Documents (PyBridge.swift:21, FilesCall.swift:178). Bookmarks and the location cache are in
  Library/Application Support (FilesCall.swift:181, LocationCall.swift:416). Widgets are in the App Group container
  `group.app.pywidget`, which is a different container and cannot be reached from this path. No other code reads or
  writes "Saved Application State".
- `removeItem` on a fixed child of `.libraryDirectory`, with `try?`: a missing folder is a no-op, and no path is
  built from input.
- `requestSceneSessionDestruction` closes windows. It does not delete files. Each closed window goes through
  `didDiscardSceneSessions`, then `ConsoleModels.discard`, the same path a user's close takes (T-0567).

## 3. Every UI test launches through the helper: pass

- `grep -rn 'XCUIApplication(' UITests` finds only UITestLaunch.swift:12 (the helper) and the two SpringBoard
  handles (`bundleIdentifier: "com.apple.springboard"`, AddWidgetTests:218, WidgetKitCheckTests:18), which are
  correct as they are. All 21 `.launch()` calls across the 11 test files run on an `app` built by `.pywidget()`. That
  includes the ones behind helpers (`open`, `openPro`, `launchAndRun`, `launch`, `install`).
- The restoration test's second launch passes `fresh: false` (SceneWindowsUITests:68). Its first launch is fresh, so
  the only saved state it reads back is its own.
- The weak spot is that nothing keeps it this way. The next test someone writes with `XCUIApplication()` brings back
  the flake, and only on iPad. My lesson from T-0448 applies: a policy rule needs a source scan and a mutant. **Fix F1
  (T-0616).**

## 4. Session destroy on iPhone and iPad: pass, with two Lows

- `UIApplicationSupportsMultipleScenes` is true on both idioms. On iPhone `openSessions` is normally just the launch
  window, so the filter is empty and the loop does nothing. Destroying a session that is not connected is documented
  and works on both idioms.
- The id compared is `window.windowScene.session.persistentIdentifier` (SceneSessionView.didMoveToWindow), which is
  the same key as `openSessions[].persistentIdentifier`. The launch window can never match its own filter. The
  `launchWindow == nil` guard runs it once per process, so a window a test opens later (SceneWindowsUITests) is never
  touched.
- **L1.** The log line says "N other sessions destroyed", but `options: nil, errorHandler: nil` only *requests* it,
  and a refusal is silent. Pass an `errorHandler` that logs, and say "requested" (part of F1).
- **L2 (observation, no fix).** The first IDEScene window to report wins. If iPadOS reconnected two windows at launch
  even after the saved state was gone, the one destroyed could be the front one, and the test would land on the Home
  Screen. Deleting the saved state in `init`, before UIApplicationMain reads KnownSceneSessions, should leave only one
  window to connect, so I expect this never happens. If a "Home Screen in front" flake shows up after this commit,
  look here first.
- **L3 (note).** The EditorBench scheme runs this UI test bundle against a **Release** app (project.yml:302-312).
  There the flag is compiled out, so EditorBenchUITests gets no clean-scene guarantee. Its `-editor-bench` argument
  sets its own content, so I see no effect today. UITestLaunch.swift's comment already says "makes a Debug app",
  so nobody should expect the flag to work there.

## Fix lines

- F1 → T-0616 (Idris, P3): a source-scan check that fails on any `XCUIApplication()` in UITests outside
  UITestLaunch.swift, with a mutant proving it fails; plus an errorHandler log on the destroy request (L1).
{% endraw %}

</div>
