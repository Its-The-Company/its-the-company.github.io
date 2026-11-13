---
layout: "default"
title: "Launcher tap path, and where a flash would come from"
section: "documents"
description: "T-2551, Idris, 2026-11-08. The engineering half of the six launcher premades. Nothing here is released. The premades stay out of the app until the real-iPhone test (#192) says whether a tap flashes pywidget first, and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/tap-path.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 18 · Sun Nov 8</span><span><code>pywidget/docs/design/launcher/tap-path.md</code></span></div><h1>Launcher tap path, and where a flash would come from</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
T-2551, Idris, 2026-11-08. The engineering half of the six launcher premades. Nothing here is released. The
premades stay out of the app until the real-iPhone test (#192) says whether a tap flashes pywidget first, and the
Investors are told before any of them ships (#41 c6653117254).

## What happens on a tap today (built)

1. A launcher's tap area is a `Link` to `pywidget://open?slot=<id>` (`widgets/premade/launcher/_launch.py`
   `url()`). The script names a slot, never a URL, so L12 P5 holds: a widget tap only ever goes into this app
   (`TreeRules.linkURL`).
2. WidgetKit opens pywidget and hands it that URL. Apple: "the system activates the containing app and passes the
   URL to `onOpenURL(perform:)`" (research/app-launcher.md s1).
3. `LauncherTapHandling` (ios/App/LauncherTapHandling.swift) takes the URL in the window's `onOpenURL`. It looks
   the slot up in the saved launcher slots: one list for every launcher widget, in the App Group at
   `launcher/slots.json` (ios/Shared/LauncherSlots.swift).
4. If the slot holds a link that passes the check, the app opens it with `openURL` once the window is active.
5. If it does not, the "Set Up App" sheet opens instead and says why: the slot is unknown, it has no link, its
   saved link is refused, the widget's link names no slot, or iOS opened nothing for the saved link (the app was
   removed or its scheme changed). The sheet takes a pasted link and saves it. A tap is never a crash and never
   silently does nothing.
6. The sheet shows over whatever the window already has up (T-3666, Pernille's T-3663 M1). It was a `.sheet` at
   IDEScene's root, and SwiftUI shows one sheet at a time: with the gallery's detail sheet open, the Simulator logged
   "Currently, only presenting a single sheet is supported. The next sheet will be presented when the currently
   presented sheet gets dismissed", and the tap showed nothing (ios/UITests/LauncherTapUITests.swift, red on
   2026-11-08). Now `LauncherSheetPresenter` presents it with UIKit from the window's top-most presented controller,
   waits out a presentation still moving, and a second tap <span title="A numbered batch of planned work, with its own plan file.">refills</span> the sheet already up rather than dismissing it
   (T-3848, Pernille's T-3680 M2: a dismiss would also take down a script's prompt sitting on the sheet, with no
   answer; Tests/LauncherSheetPresenterTests.swift). The UI test opens a gallery
   entry, goes Home, comes back with `pywidget://open?slot=x` (a Debug launch argument, `-ui-launcher-url`, since
   XCUITest can't send an unregistered scheme), and checks that the sheet shows and that Cancel leaves the gallery's
   sheet under it.
7. A file the app can't read gets its own sheet that says so, with no link field, since a save would be refused
   (T-3663 L1). Unreadable means: not a JSON object, a `slots` that isn't a list, over 64 KiB (L2: a tap reads it on
   the main thread), or a `format` other than 1 (L3: this build never rewrites a later build's file). A tap reads the
   file once; the slot's name comes with the lookup (L2).

The link check (`LauncherTarget.check`) runs twice: when a link is saved, and again at every tap, so a file written
by anything else (an older build, a script) still can't get a refused link opened. Refused: `javascript`,
`vbscript`, `file`, `data`, `blob`, `about`, our own `pywidget` (a tap would loop straight back), and Settings'
private `app-prefs`/`prefs` (App Review 2.5.1). Any case. Also refused: a scheme that isn't RFC 3986, a space,
control character, DEL, C1 or backslash anywhere in the link, an `http(s)` link with no host, and anything over
2048 bytes. Kept: any app's own scheme (`music://`, `spotify:`), `https`/`http` web and universal links, `tel:`,
`facetime:`, and Shortcuts' `shortcuts://run-shortcut?name=...`. Tests: ios/Tests/Core/LauncherSlotsTests.swift
(23, run under `swift test` in ios/Core), with 38 mutants in ios/Core/mutants-t2551.json (31 from T-2551, 7 from T-3666), all caught.

Not built here: the editor where a person picks apps from a list, names them and chooses a symbol and colour
(T-3664/T-3688, editor.md). It writes this list. Since T-3852 it also writes each installed launcher's `premade.json`
slots from the same list, without the `url` key, then reloads the tree widget's kind (editor.md s11a). The draw code
never reads a link, and the tap reads only `launcher/slots.json`.

## Where the flash comes from

The documented path has two hops: widget -> pywidget -> the other app. Step 2 brings pywidget to the front before
step 4 can ask iOS to open anything, so on this path **pywidget shows first**. How long it shows is the #192
question: a cold launch (pywidget not in memory) is the worst case, because the app starts, draws its first frame,
and only then opens the link. The two places that time goes:

- **The hop itself** (widget -> app). WidgetKit does it, and nothing in our code shortens it.
- **Our wait before `openURL`.** We open only once the window is active, because `UIApplication` does not open
  links for an inactive app. On a cold launch that means after the launch work in `PyWidgetApp.init` and the
  first frame. If #192 shows a long flash on a cold launch but a short one on a warm launch, this is the part to
  trim. Moving the open earlier (in the app delegate's URL callback, before SwiftUI's scene) is the one change on
  our side. Whether that removes the flash or only shortens it is unknown until it is tried on a device.

Not checked on a device: whether `onOpenURL` gets a widget URL with no `CFBundleURLTypes` entry for `pywidget`. The
app registers none today, and existing premade links already open the app that way. Registering the scheme would
also let any web page or app send `pywidget://open?slot=...`. For that reason this change doesn't register it. #192
should confirm that the tap reaches the handler at all.

## The option if it flashes

If #192 shows a flash, the documented way out is to **skip our app**:

- **`Link` straight to the other app's URL.** Research s1: two launcher apps on the store say theirs open
  directly from iOS 17 on. That breaks L12 P5 as written (a widget tap goes only into pywidget), so it is an
  Investor-visible rule change, not an engineering switch. The tree would carry the person's saved URL, and the
  renderer would allow only the slot's checked URL, never one a script wrote.
- **`Button(intent:)` with `OpenURLIntent` in the widget.** It runs in the widget extension, which is why the
  slot list is in the App Group: the intent would read `launcher/slots.json` and run the same `LauncherTarget.check`.
  Apple documents it for our own universal links. Forum reports (secondhand, research s1) say it opens a
  third-party `https` link without our app showing, and does not open custom schemes. So it would cover web and
  universal links only.

The #192 device test (research s1, "What would settle it") covers all three: the current `pywidget://` hop, a
direct `Link` to a third-party scheme, and `OpenURLIntent` with an `https` link and with a custom scheme, each
recorded on screen. Until it runs, no store text may say a launcher "opens instantly".
{% endraw %}

</div>
