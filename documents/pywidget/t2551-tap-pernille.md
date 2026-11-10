---
layout: "default"
title: "T-3663: review of 18e7e6118 (Idris, T-2551): the launcher tap handler"
section: "documents"
description: "Verdict: PASS with findings. Nothing High. I found no way to get a refused scheme opened. Case, percent-encoding, leading or trailing Unicode spaces, zero-width and full-width tricks are all refused (probes below). A\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2551-tap-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 18 · Sun Nov 8</span><span><code>pywidget/docs/reviews/t2551-tap-pernille.md</code></span></div><h1>T-3663: review of 18e7e6118 (Idris, T-2551): the launcher tap handler</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-08. Commandment 13, before the next TestFlight build (the handler is in every build).
Read: `git show 18e7e6118`: pywidget/ios/Shared/LauncherSlots.swift, pywidget/ios/App/LauncherTapHandling.swift,
the IDEScene hook in pywidget/ios/App/PyWidgetApp.swift, pywidget/ios/Tests/Core/LauncherSlotsTests.swift,
pywidget/docs/design/launcher/tap-path.md. Also read: pywidget/ios/project.yml (Info keys),
pywidget/widgets/premade/launcher/_launch.py (my own 089904eda, the link's writer).

**Verdict: PASS with findings.** Nothing High. I found no way to get a refused scheme opened. Case,
percent-encoding, leading or trailing Unicode spaces, zero-width and full-width tricks are all refused (probes below).
A missing, empty or corrupt slots.json gives the Set Up App sheet, not a crash, and a save never overwrites a file
it could not read. Two Medium findings are in the window code, not the Core logic, and no test reaches that code.
M1: the sheet can fail to show when another sheet or alert is already up. M2: on iPad, every tap opens a new
window. The next TestFlight build can carry this commit: the launcher premades are unreleased, and the `pywidget`
scheme is not registered, so in that build only a person's own script `Link` can reach the handler. M1 and M2 must be
fixed before any launcher premade ships (the #192 run).

## Runs

- Host, `tools/swift_test_head.py` at 18e7e6118, `--filter LauncherSlotsTests`: 21 executed, 0 failures.
- Probes: a throwaway test in the scratch export (deleted, not committed), 4 tests, 0 failures. Results are quoted
  below.
- No Simulator or device run. M1 and M2 are read from the code and Apple's documentation. Neither has been run.
- Mutants: not re-run. Idris's file records 31 of 31 caught.

## Apple's documentation (standing <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> #64, signed out, one page at a time, through tools/fetch_cite.py --apple)

- `widgetURL(_:)`, https://developer.apple.com/documentation/swiftui/view/widgeturl(_:).md, fetched 2026-11-08
  1:23:28 PM ET: "The URL to open in the containing app." Saved under research/inbound/apple/developer.apple.com/.
- `Link`, https://developer.apple.com/documentation/swiftui/link.md, fetched 2026-11-08 1:23:39 PM ET: nothing about
  widgets or schemes.
- `handlesExternalEvents(matching:)`, https://developer.apple.com/documentation/swiftui/scene/handlesexternalevents(matching:).md,
  fetched 2026-11-08 1:25:38 PM ET (for M2).
- Already saved for T-2535: "Linking to specific app scenes from your widget or Live Activity" (2026-11-05): "the
  system activates the containing app and passes the URL to [onOpenURL] ...".

None of the four pages says the containing app must register the scheme in `CFBundleURLTypes`, and none says it
need not. See L6.

## Findings

### M1 (Medium): the Set Up App sheet may not show when the window already has a modal up

`.sheet(item: $setUp)` is attached at the root of IDEScene (LauncherTapHandling.swift:30). Deeper views in the same
window present their own modals: the gallery entry sheet (Gallery/GalleryView.swift:131), the measurement export
share sheet, the Projects file importers, alerts and confirmation dialogs, and a script's prompts. UIKit gives a
presenter one presented controller at a time. A root sheet requested while a child's sheet is up is normally
dropped with an "already presenting" log line. Then the tap does nothing visible, which breaks the note's own rule
("never silently does nothing"). The `.open` path is not affected. The `.unknown`, `.empty`, `.refused`, `.badLink`
and `.didNotOpen` paths are. The likeliest case is the first tap on a new launcher. A person opens the launcher's
entry in the gallery, goes to the Home Screen to add the widget, and taps it while that sheet is still open. I have
not run this. It is the expected UIKit behaviour, and a Simulator run should confirm it before the fix.
Fix: present the set-up sheet above whatever is up (dismiss the open modal first, or present from the top-most
presented controller). Add a UI test that opens a gallery entry and then delivers a launcher link (see "Tests").

### M2 (Medium): on iPad, each launcher tap opens a new IDE window

The app supports multiple scenes (`UIApplicationSupportsMultipleScenes: true`) and has one
`WindowGroup(for: SceneFile.self)` with no `handlesExternalEvents`. Apple's page gives the routing order. First, an
open scene that prefers the event through the `handlesExternalEvents(preferring:allowing:)` view modifier. Then a
scene declaration whose `matching:` conditions match. Last, "the first scene declaration that doesn't have the scene
modifier. Create a new instance of this scene and route the event there." Nothing in pywidget declares a
preference, so on iPad the last rule applies, and every launcher tap makes a new window. That window has no file
(`SceneFile.launchDefault` is nil outside UI tests). The handler runs in the new window and opens the other app,
and the blank windows pile up behind it. Every existing `widgetURL` tap already does this. The launcher makes it the
main path. iPhone has one scene and is not affected. Not run.
Fix: `handlesExternalEvents(preferring:allowing:)` on IDEScene's view, so an open window takes the launcher's link.
Check on an iPad Simulator with zero, one and two windows open.

### L1 (Low): an unreadable slots.json is a dead end with the wrong words

`slots()` treats an unreadable file as no slots, so the sheet says "“inbox” isn’t set up in PyWidget yet". When the
person pastes a link, `save` throws `.unreadableFile` (correct: it must not overwrite the other slots), and the sheet
says "Try again". Trying again fails every time, and nothing in the app can repair the file. Today the only writer
is the app's atomic save, so this is unlikely. Fix: a separate `Why` for an unreadable file, with text that says so.
Keep refusing to overwrite it.

### L2 (Low): no size <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> on the read, and the open path reads the file twice on the main thread

Probe: a 48,600,064-byte slots.json resolved in 1.10 s on the host Mac. On a tap, `handle` runs on the main thread,
and the `.open` path reads and parses the file a second time just for the name (LauncherTapHandling.swift:44). On a
cold launch that time goes into the flash, and at worst toward the launch watchdog. The file can only be that big if
something other than the app wrote it. Fix: treat a file over a set cap (64 KiB is plenty for 32-byte ids) as
unreadable, and have `.open` carry the slot's name so there is one read.

### L3 (Low): `format` is never read

Probe: `{"format": 2, "slots": [{"id": "a", "target": {...}}]}` resolves slot `a` as `.empty`. Saving then writes a
v1 `url` key into the format-2 file and keeps `"format": 2`. A later build that changes the shape would have its
file read and rewritten by this one. Fix: read and write only `format` 1 (or no `format` key). Treat anything else
as unreadable (L1's case).

### L4 (Low): concurrent writes are safe today, but not once a second writer exists

Today the app is the only writer. `save` runs on the main actor, so two iPad windows' sheets save one after the
other, and `.atomic` means a reader in the app or the widget extension sees the old file or the new one, never a
torn one. No update is lost today. The read-modify-write has no file coordination, though. Once T-3664's editor, a
widget-extension intent (the note's no-flash option) or anything else writes the file, the two can lose each
other's slots. Fix: `NSFileCoordinator` around the read-modify-write when T-3664 lands. Noted for that line, not a
fix to this commit.

### L5 (Low, mine, 089904eda): the Python half accepts a slot id ending in a newline

`_launch.SLOT_RE` is `^[a-z0-9][a-z0-9-]{0,31}$` with `re.match`, and Python's `$` matches before a final newline.
So `read_slots` keeps `"inbox\n"`, `url()` builds `pywidget://open?slot=inbox\n`, and pywidget_ui raises
`ViewTreeError` ("Link url ... has a space, control character or backslash"). The whole launcher then draws an
error instead of its tiles. Swift's `isSlotID` refuses that id, so the two halves disagree. This is my bug, not
Idris's: `fullmatch` (or `\Z`) and a test. Not a fix for Idris's line.

### L6 (Low): delivery to `onOpenURL` with no registered scheme is unverified

pywidget/ios/project.yml has no `CFBundleURLTypes`. Apple's pages say the system "activates the containing app and
passes the URL" to `onOpenURL`, and they say nothing about registration. The note already leaves this to #192. That
run must show that `handle` ran (a DEBUG log line or the sheet for an unknown slot), not only that pywidget came to
the front: a plain widget tap does that too. Keeping the scheme unregistered is right. It means no web page or
other app can send `pywidget://open`. If the scheme is ever registered for another feature, this handler needs a
fresh review, because it opens a saved link for whoever sends it.

## What I checked and found sound

- Save and tap run the same check. `LauncherTarget.check` trims, refuses C0, space, DEL, C1 and backslash, takes the
  text before the first `:`, requires an ASCII RFC 3986 scheme, compares it lowercased against the refused set, and
  requires `URL(string:)`'s scheme to be that same scheme. A scheme cannot differ between check and open. Probes,
  all refused: `%6Aavascript:`, U+200B, U+3000, U+2028 and U+FEFF before `javascript:`, `java\0script:`,
  `javascript :x`, full-width `ｊavascript:`, a soft hyphen inside it, `javascript%3A...`, `JaVaScRiPt:`,
  `Pywidget://x`, `pywidget:open?slot=a`, `APP-PREFS:root`, `Prefs:root`, `file:/etc/hosts`, `data:,x`,
  `https:/x`, `https:x`.
- Passed, and fine to pass: `x-web-search://?q`, `shortcuts://x`, `https://(email withheld)/` and
  `https://%00/` (the open goes to Safari or the other app, which decodes it there), and `itms-services://...`.
  That last one asks the person before installing anything, and they pasted it. Information only, not a finding.
- Slot ids: unknown → sheet with the id. Repeated (`slot=a&slot=b`), extra items, a trailing `&`, `;slot=`,
  `SLOT=`, bare `slot`, `+`, `%0A` → `.badLink` sheet. Percent-encoded letters decode to the same id
  (`inbo%78`, `%73lot`, `%6Fpen` → `inbox`). That is harmless, because the id is only a lookup key. `open/` and
  `open.` → `.notLauncher`: the app opens and nothing else happens. The Python half never writes those.
- The first of two slots with one id wins, the same as `_launch.read_slots`.
- `.didNotOpen` uses `openURL`'s completion. The pending link waits for `.active`, which is what UIKit needs.
- No force-unwrap or subscript can trap: `items[0]` after `count == 1`, `b[0]` after `1...32`, `newName!` after a
  non-empty check.

## Tests

The 21 Core tests pin the parse, the check, the read and the save well, and they would catch a refused scheme
slipping through. They would not catch M1, M2, L1, L2 or L3, and nothing tests LauncherTapHandling at all: not
the pending open on `scenePhase`, not `.didNotOpen`, not the sheet. A UI test cannot send the link through
`XCUIApplication.open` while the scheme is unregistered. A DEBUG launch argument that feeds a URL to `handle` would
let one test M1, M2 (on an iPad Simulator) and `.didNotOpen`. Also worth pinning in
`testSchemesThatAreNeverOpened`: the probe inputs above. Today they are refused only as a side effect of the trim
and `isScheme`.

## Board

- M1 and M2: new lines for Idris (T-3666 for M1, T-3667 for M2).
- L4: belongs with T-3664 (the editor is the second writer).
- L5: mine.
- L1-L3 and L6: Idris's call. Fold them into T-3666 if they fit.
{% endraw %}

</div>
