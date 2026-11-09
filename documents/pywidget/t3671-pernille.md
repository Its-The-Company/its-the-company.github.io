---
layout: "default"
title: "Review: T-3671 widget tap routing and T-3667 iPad window routing (T-3692)"
section: "documents"
description: "PASS with fixes. The link grammar is tight and nothing a link carries ever becomes a file path. No route opens a file outside the app&#x27;s own containers. What is wrong is in the app&#x27;s state after a tap (F1), in which file\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3671-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 19 · Mon Nov 9</span><span><code>pywidget/docs/reviews/t3671-pernille.md</code></span></div><h1>Review: T-3671 widget tap routing and T-3667 iPad window routing (T-3692)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-09. Commandment 13, independent; pre-release standard (this holds the next TestFlight build).
Reviewed at main 0f5e0edd6: T-3671 Idris afaaa915d (gate J-20261108-1610-land-m-530184, 1498/0) and T-3667 Idris a3415f7c8.
Later commits touching these files (52377587a, 2dbf109d4, df2f223b4) change copy and the stuck banner only, not the routing.
No test runs: the MacBook runner is down (#238). Everything below is read from code; where I rely on platform behaviour
I did not re-read for this review, I say so.

## Verdict

**PASS with fixes.** The link grammar is tight and nothing a link carries ever becomes a file path. No route opens a file
outside the app's own containers. What is wrong is in the app's state after a tap (F1), in which file a script tap picks
(F2), and in what the tests prove (F3, F4). F1 should be fixed before the build goes to TestFlight: it is a one-line fix,
and every tester who taps a premade will see it. F2 to F5 can follow in the next build.

Counts: High 0, Medium 5, Low 6.

## What I checked and found sound

- **Malformed or unknown ids** (Shared/WidgetTapLink.swift:32-57). The scheme is checked byte for byte (`hasPrefix`), and
  so is the host (`pywidget://W/a` is refused by a test). User, password, port and fragment are refused, and so is a query
  on `w`. The path must split into exactly one part, and that part must pass `WidgetID.problem`. That check refuses empty
  ids, ids over 128 scalars, any scalar outside `[A-Za-z0-9_.-]`, a leading dot, `index.json`, and a `pywidget.` id that
  is not a premade's.
- **Path traversal and percent-encoding.** `URLComponents.path` is percent-decoded *before* the split and the id check. So
  `w/%2E%2E` decodes to `..` and is refused for its leading dot, and `w/a%2Fb` decodes to two parts and is refused. `%00`
  is refused as a bad character, and a bad `%FF` cannot pass either. The id is only ever compared by `WidgetID.key`
  (WidgetTapRouting.swift:37-46) or looked up in a directory listing (`Premades.named`, Shared/Premades.swift:85). Neither
  joins it onto a path. See L1 for the cosmetic side of decoding.
- **No file outside the app's containers.** `.file` URLs come only from `ProjectStore.app`, which is Documents/Scripts.
  `projects()` drops links and `files(in:)` keeps only regular files, and every `read` re-runs `check` on the folder and
  the file. Premades come from the bundle listing, which skips symlinks. No route reads the App Group or a security-scoped
  bookmark.
- **Ids of deleted widgets.** A premade this build does not bundle gives `nil`, and the window stays as it is (tested). A
  script whose project is gone opens Projects (tested). A widget whose folder was removed still has its `widgetID` set on
  the `.missing` entry (Widget/PyWidget.swift:61-63), so its tap still routes.
- **Every timeline branch names its widget.** The branches are firstDraw, firstRender, missing, proCard and drawn. The
  choose card and a nil id give no link, as intended.
- **The launcher link is unchanged.** `WidgetTapLink.target` returns nil for `pywidget://open?...`, and `LauncherLink`
  reads it as before (tested both ways). Launcher tiles are `ui.Link`, not `widgetURL`, so the extension adds a widget link
  around them (see L6).
- **Cold launch.** IDEScene holds the request until ContentView exists. `route` runs on appear, and a nil reset re-fires
  `onChange` harmlessly. Two taps are two requests, because each has its own UUID.
- **Debug-only scheme (T-3667).** The phase adds `CFBundleURLTypes` only when `CONFIGURATION` is exactly `Debug`.
  Archive/TestFlight is Release, and the EditorBench scheme (UI tests in Release) runs `-only-testing:EditorBenchUITests`
  only. Nothing else in project.yml or the app plist declares URL types. So a Release/TestFlight build carries no
  `pywidget` scheme. Confirmed. F5 is about what the script deletes, not what it adds.
- **Reachability from outside.** In Release no other app or web page can open `pywidget://`, because the scheme is not
  registered. In Debug it can, and the worst it does is switch the front window's file after saving. When #192 registers
  the scheme for Release, `route` becomes reachable from any web page. The reads above stay safe as long as no link part
  is ever joined onto a path. Keep that property.

## Findings

### F1 (Medium, T-3762): a widget tap's Gallery request is never cleared, so every later Gallery visit reopens that page

- Where: pywidget/ios/App/PyWidgetApp.swift:966 (`galleryOpen`), :1105 (`GalleryView(openRequest: galleryOpen)`), :1127 (set),
  :1089 (menu button sets only `showGallery = true`). pywidget/ios/App/Gallery/GalleryView.swift:120, :146, :151-154.
- Failure: tap the countdown widget and the Gallery opens on countdown's page. Close it with Done, then go back to the
  editor. Later, open the Gallery from the More menu. `navigationDestination(isPresented:)` builds a new GalleryView, and
  its `@State opened` starts nil. `onAppear` calls `show(galleryOpen)` with the old request, whose id is not `opened`, so
  countdown's page opens again. This repeats on every Gallery visit in that window until the next widget tap or a
  relaunch.
- Fix: the request is consumed once. Either clear `galleryOpen` when the Gallery is popped (`.onChange(of: showGallery)
  { if !$1 { galleryOpen = nil } }`) and in the menu button, or pass a `Binding` that GalleryView sets to nil after `show`.
- Test: extend `LauncherWindowsUITests.galleryPageShowsOnceAndCloses` (or a new UI test). After Done, go Back, open
  Gallery from More, and assert `gallery.done` does not appear within 3 s.

### F2 (Medium, T-3763): a script widget's tap opens the first file in Finder order that declares the id, and a conflict copy sorts first

- Where: pywidget/ios/App/WidgetTapRouting.swift:37-46. pywidget/ios/App/Projects/ProjectStore.swift:136 (projects sorted),
  :236 (`saveCopy` writes "`<stem>` (conflict).py" beside the file, or into the Recovered project). The test is
  pywidget/ios/Tests/WidgetTapRoutingTests.swift:45, where each file declares a different id.
- Failure: a refused save leaves `clock (conflict).py` beside `clock.py` (T-0654), and both declare `Widget("clock")`.
  `localizedStandardCompare` should put `clock (conflict).py` first, because a space sorts before a full stop. I have not
  run this. The same happens with a `Recovered` project whose name sorts before the real one, or with a project copied by
  hand. The tap then opens the copy, not the file the widget runs. If the person edits it, the next boundary sends the
  copy's text to widgets/clock/main.py ("later save wins", WidgetScriptSave.swift header). The Home Screen widget then
  runs the stale text, and nothing tells them why.
- Fix: widgets/`<id>`/main.py in the App Group holds the exact text last sent. Among the files that declare the id, prefer
  the one whose bytes equal it. If none or several match, open Projects (the current fallback) rather than guess. Skip
  `Recovered/` and `(conflict` names when ranking.
- Test: a host test with two projects (and one conflict copy) that declare the same id. One file's text is written as
  widgets/`<id>`/main.py in a temporary widgets folder, and that file must be the destination whatever the Finder order.

### F3 (Medium, T-3764): LauncherWindowsUITests cannot fail without the fix, so it does not show the fix was needed

- Where: pywidget/ios/UITests/LauncherWindowsUITests.swift:32-50 (`shown`, `scenes`, `settle`), :53-59 (`tap`), :146-156.
  pywidget/ios/App/PyWidgetApp.swift:173.
- Why it stays green on HEAD^: the run is a full-screen iPad, where only the foreground scene's accessibility tree is
  visible to XCUITest. A scene made in the background by the default routing rule may be connected but not foreground, or
  not connected yet. Either way it adds no `more` button and no `sceneTitle` probe that the test can see. So 4/4 green
  without the modifier says nothing either way.
- A test that would prove it:
  1. Count sessions, not views. Add a Debug-only probe, a label in the `-ui-scene-probe` view, that shows
     `UIApplication.shared.openSessions.count` and `connectedScenes.count`. Assert both are unchanged across the tap.
  2. Run it in the mode where the bug lives, iPadOS 26 Windowed Apps, set in the Simulator before the run. Full screen is
     where it does not reproduce.
  3. Show it can fail. Run once on a build with the `.handlesExternalEvents` line removed (a seeded mutation), and record
     that it is red there and green with the line. Without the red run, the test only guards behaviour that full-screen
     mode gives anyway.

### F4 (Medium, T-3765): the only tested path registers the scheme, and the shipping build does not; a real widget tap in Release is unverified

- Where: pywidget/ios/scripts/debug_url_scheme.sh:13-20, pywidget/ios/project.yml (phase "Register pywidget scheme (Debug
  only)"), pywidget/ios/UITests/LauncherWindowsUITests.swift:54 (`XCUIDevice.shared.system.open`).
- Risk: the UI test goes through LaunchServices (`system.open` and the "Open" prompt), which needs a registered scheme,
  so Debug adds one. A real tap goes through WidgetKit, which hands the widget's URL to its containing app. As far as I
  know from shipping widgets, that works with no registered scheme, but nothing in this repo shows it does for this
  build. The TestFlight build is Release and has no scheme. So the configuration we test differs from the one we ship in
  exactly the variable that matters. If WidgetKit drops the link there, every tap opens the app with no URL. That is
  Investor #41's original complaint, and it would look fixed in every test we have.
- Fix: make it an acceptance step on the TestFlight build itself, before the done-note tells #41 it is fixed. On a
  device, with no Debug build installed, tap a placed premade (expect its Gallery page) and a placed script widget
  (expect its file), once cold and once with the app in the background. Do it on iPhone and on iPad in Windowed Apps
  mode with two windows open, and check the window count after. Record the result with a screen recording as evidence.

### F5 (Medium, T-3766): debug_url_scheme.sh deletes every URL type in every configuration, which will silently strip the scheme #192 adds to Release

- Where: pywidget/ios/scripts/debug_url_scheme.sh:13 (`Delete :CFBundleURLTypes` runs for every configuration). It is
  pinned by tests/debug_url_scheme_test.py `test_release_removes_a_key_an_earlier_debug_build_left`.
- Failure: today nothing else declares URL types, so the delete costs nothing. #192 may decide that the released app
  registers `pywidget` (the launcher's open question), or a premade may later need an OAuth callback scheme. Either one
  is added to App/Info.plist and works in Debug, where this script replaces it with its own entry. In Release this
  phase deletes it after ProcessInfoPlistFile, with no warning, in Release only. The existing test calls that correct.
- Fix: touch only the entry this script owns. Delete only a `CFBundleURLTypes` element whose `CFBundleURLName` is
  `app.pywidget.debug-tests`, and in Debug append to the array rather than replace it. Add a test where the source plist
  already has another URL type: after both a Debug and a Release run, that entry is still there and in order.

### L1 (Low): percent-encoded spellings of host and id are accepted

- Where: pywidget/ios/Shared/WidgetTapLink.swift:37-38 (`c.host` and `c.path` are decoded values).
- `pywidget://w/%6D%79_clock` reads as `my_clock`, and `pywidget://%77/a` should read as host `w`. This is harmless,
  because the decoded id is re-checked and never becomes a path. But it contradicts the comment ("host byte for byte"),
  and two spellings of one link is how two parsers start to disagree.
- Fix: read `percentEncodedHost` and `percentEncodedPath` and refuse any `%`. The extension never writes one, since ids
  have no escapable characters. Add the vectors `w/%2E%2E`, `w/..%2F..%2Fx`, `w/a%2Fb`, `w/%00`, `w/%6D%79`, `%77/a` and
  `widget/%2E%2E/x` to `testOtherLinksAreNotAWidgetsTap`. Today only `a%20b` is there.

### L2 (Low): the script lookup reads every project file on the main actor

- Where: pywidget/ios/App/WidgetTapRouting.swift:39-44, called from `ContentView.route` (PyWidgetApp.swift:1116).
- Every `.py` in every project is read in full and scanned, synchronously, including on a cold launch. A few hundred
  small files are fine. A large Projects folder makes the tap hitch before the editor shows. The F2 fix helps here:
  hash-compare candidates against main.py and stop at the first exact match, and do the read off the main actor.

### L3 (Low): route from a non-root state is untested

- `route` pops Settings, Pro and Acknowledgements, but not a presented sheet or alert (the "Couldn't Save" alert, a
  GalleryDetail sheet, an input prompt). A push under a sheet is invisible, and the tap looks like it did nothing.
  `.gallery` also sets `showProjects = false` and `showGallery = true` in one update. SwiftUI's two-destination
  pop-and-push in one transaction has dropped the push before. Add UI cases: tap while Projects is pushed, and tap while
  the Gallery detail sheet for another premade is up.

### L4 (Low): with several windows, the link goes to whichever window the system picks

- `preferring: ["pywidget:"]` is the same in every window, so the system chooses. A `.file` route then switches that
  window's file even when another window already shows it, which gives two windows on one file. T-0654's replace check
  keeps that safe, but it is confusing. A later refinement: a window prefers the links for the file it holds.

### L5 (Low): a tree's widgetURL anywhere in the tree suppresses the tap link, even in a branch this family never draws

- Where: Shared/WidgetTapLink.swift:67-77, Widget/PyWidget.swift:118-123.
- A script that sets `widget_url` only inside `When(env="family")` for large gets no link in small, so its small tap
  opens the Console as before T-3671. Rare. Either document it in the DSL docs or make the scan family-aware.

### L6 (Low): launchers now get the widget link around their tiles; check small on a device before they ship

- Launcher designs (widgets/premade/launcher/) tap through `ui.Link`, and a small holds two tiles. As I know WidgetKit, a
  small widget is a single tap target and honours only `widgetURL`. If so, a small launcher's tiles never opened their
  slots, and after T-3671 the whole small widget opens the launcher's own screen. In medium and large, a tap in the gaps
  between tiles now opens that screen too. Launchers are unreleased (T-2551), so this changes nothing in this build.
  Check on a device before they ship.

## What the unchecked items leave (T-3667)

- **Windowed Apps mode is untested.** This is the mode where a WindowGroup with no external-events preference makes a new
  file-less window per URL, which is the bug T-3667 fixes. The fix follows Apple's documented rule, but no test has seen
  it work. Until F3's test runs red-then-green, the risk is that a tester in Windowed Apps mode gets a new empty window
  per widget tap, as before.
- **A real widget tap is untested.** The risk is F4: the shipping build lacks the scheme the test path needs, so the test
  path and the real path differ. There is also the WidgetKit side of `.widgetURL` on a tree with Links (L6), and Lock
  Screen and StandBy families, which ask for an unlock before opening the app. Only a device tap on the TestFlight build
  closes these.
{% endraw %}

</div>
