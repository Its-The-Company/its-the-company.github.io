---
layout: "default"
title: "pywidget v1: App Review notes, draft"
section: "documents"
description: "[App Name] is a Python development environment for iPhone and iPad. Users write and run their own Python scripts, and a script can draw a home screen or Lock Screen widget."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-store-drafts/' | relative_url }}">← App Store Drafts</a><a href="{{ '/documents/pywidget/review-notes-draft.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/release/review-notes-draft.md</code></span></div><h1>pywidget v1: App Review notes, draft</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-10-25, started 19:57 ET; revised 20:01 ET for ADR-006 (<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G10</span> package sentence; G5 now strips every premade mention). Revised 2026-10-30 (T-0812) against the code at HEAD 01af3633 (app code unchanged since 6f3cade5): section HEAD CHECK below lists each claim. Draft, not approved. Pasting it into App Store Connect, submitting, and any reply to App Review are human checkpoints. Matrix and sources: app-review-matrix.md (same folder). Every guideline reading behind this text is provisional until a person reads Apple's page (matrix section 0).

## How to use this draft

- The notes field <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> 4,000 (one guide says 4,000 bytes; matrix section 1). The text between the markers below is plain ASCII, so characters and bytes are the same. Count it with the command at the end before pasting.
- Square brackets are filled at submission. A bracketed sentence with a gate (G1-G9, matrix section 4) is **deleted** if its gate fails, never softened or kept "for now". The notes must match the build exactly (2.3.1, 2.5.19).
- Use the App Store name the Investors choose in place of [App Name].

## Notes text


[App Name] is a Python development environment for iPhone and iPad. Users write and run their own Python scripts, and a script can draw a home screen or Lock Screen widget.

HOW CODE RUNS
The app runs code from only two sources: (1) Python the user types or pastes[T-0355: , or opens from their own files (app storage, or a Files folder they pick)], and (2) the example scripts and premade widgets compiled into this build. The app does not download, install or execute code from our servers or from other users. There is no store, sharing or import-from-URL of other people's code; [T-0191: the only in-app gallery shows our own premade widgets, compiled into this build. ]The example scripts open in the editor, where the user can read and edit them before they run.[T-0191: Each premade's source opens in the app, the Pro ones once bought.] A user's own script may make network requests the user writes (standard library or requests); the app itself never fetches code.

RUNTIME
CPython [3.15.1] and its standard library are bundled in the app. Bundled packages: [requests, jedi, pyflakes]. Compiled packages such as numpy are not in this version. Native modules are signed frameworks inside the bundle. No package installer is included in this version.
[G1: Python reaches iOS features only through a fixed set of Swift functions we wrote on public APIs. The ctypes module and the Objective-C runtime bridge are removed from the build, so scripts cannot call native APIs directly.]

DEVICE FEATURES
Scripts can use: clipboard, files, local notifications, location (When In Use only), motion history (steps, floors, distance), and the Keychain for the user's own secrets. Location and motion are asked the first time a user's script needs them, with a purpose string, and notifications through the system prompt; the app stays fully usable if any is refused. The Files picker, clipboard and Keychain have no prompt of their own. There is no HealthKit, contacts, photos or calendar access.

WIDGETS [G5: delete this section if widgets are cut]
A script can describe a widget with our Python view library. Python runs in the main app (in the foreground, in background app refresh, or from the Refresh Widgets Shortcuts action) and saves the result; [<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">LANE</span>-OFF: the widget extension only draws it and runs no code.] Background refresh is used only to update the user's widgets. Twelve premade widgets ship in the build. The GitHub status widget calls GitHub's public API from the device; it works without an account, and an optional personal token stays in the Keychain.

SHORTCUTS
App Intents: Run Script, Run Script with Input, Refresh Widgets. They run one of the user's widget scripts[T-0790: , or any script from the user's library]; the input is data passed to that script, not code.

IN-APP PURCHASE
One non-consumable, "[Pro name]", unlocks [contents - G6]. More > pywidget Pro shows it and has a Restore purchase link[T-0657: ; Settings > Pro shows it too]. The free app is complete for writing and running your own Python.

PRIVACY
No account, no sign-in, no server, no analytics, no tracking. Scripts, widgets and logs stay on the device and in folders the user chooses.

NO HIDDEN FEATURES
There are no hidden, dormant or server-enabled features. Everything in the app is reachable from the screens listed below, and the build contains no code paths for features that are not described here.

DEMO (no account needed)
1. [iPad: More > Open in New Window > tip_splitter.py > Run.][T-0811: iPhone: [Examples entry] > tip_splitter.py > Run.] It asks three questions with input() and prints the result.
2. On the main screen, type print("hello") in the editor and tap Run.
3. [G9: In the editor type: from pywidget.device import pedometer; print(pedometer.today()). Tap Run. Allow Motion when asked.]
4. [G5: Long-press the home screen > + > [App Name] > Python widget, then Edit Widget > [Sunrise].][T-0191: Open its source in the app.]
5. More > pywidget Pro to see and test the purchase.


## Gates the bracketed text depends on


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Gates the bracketed text depends on, scrolls sideways" style="--tw:640px" markdown="1">

| Bracket | Gate (matrix section 4) |
|---|---|
| ctypes and Swift-only sentences | G1 bundle strip, denylist check and L12 escape tests green on the release build |
| WIDGETS section, demo step 4, and every premade mention in HOW CODE RUNS ("and premade widgets", "including our examples and premade widgets", the gallery clause) | G5 Day 14 cut line (matrix 2a claim B) |
| T-0355 bracket (opens from their own files) | T-0355 Projects and Files on main; fails: the bracket goes |
| T-0191 brackets (gallery clause, premade source) | T-0191 gallery screen on main; fails: the brackets go, and the premade source cannot be claimed |
| T-0790 bracket | T-0790 picker lists any script; fails: the bracket goes |
| T-0657 bracket (Settings > Pro) | T-0657 Settings screen on main (freeze row F8); fails: the bracket goes |
| T-0811 bracket (iPhone path to the examples) | T-0811 on main; fails: only the iPad path stays, and the page and the notes say iPad |
| LANE-OFF bracket | The flag default ruled by Day 24 (launch plan LANE gate); if LANE-ON, this sentence is rewritten from the launch plan's LANE-ON text, through <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> |
| Background refresh clause in WIDGETS | T-0795 (Ines): left as it was, not checked here |
| Pro name and contents | G6 Investors (PROPOSAL-001, PROPOSAL-002 s6) |
| IN-APP PURCHASE section at all | G7 App Store Connect product exists |
| "no code paths for features not described" | G8 release-build check |
| Demo step 3 wording | G9 purpose strings final |

</div>


G3 (packages), G4 (Control Center) and G10 (install from file) are decided for 1.0: not in this version, and their sentences are gone (store page draft, section 7 rows 5, 24, 25).

## HEAD check (T-0812, 2026-10-30, read by Wrenna; no build run)

Method as in store-page-draft.md section 7: **Confirmed** means I read the code at HEAD 01af3633 (pywidget/ios and pywidget/runtime unchanged since 6f3cade5, per T-0789). **Failed** means the sentence was untrue at HEAD; it is now fixed or carries the task that makes it true. No Simulator or device run in this task.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: HEAD check (T-0812, 2026-10-30, read by Wrenna; no build run), scrolls sideways" style="--tw:960px" markdown="1">

| Claim | At HEAD | Result |
|---|---|---|
| G3 numpy, Pillow, matplotlib bundled | `packages/manifest.toml`: all "pending T-0243", not pinned, so `pkg_stage.py` skips them; store page row 5 | **Failed.** Replaced by "not in this version" |
| G4 Control Center control | No `ControlWidget` anywhere in App, Shared, Widget | **Failed.** Sentence and gate deleted |
| G10 install from file | No installer in App; T-0212 dated 1.1 | **Failed** for the shipped form. "No package installer" stays, the other bracket is gone |
| "Each permission is asked ... with a purpose string" | Purpose strings only for location (When In Use) and motion in `App/Info.plist`; notifications use `requestAuthorization`; files use the picker; clipboard and Keychain have no prompt | **Failed.** Reworded per permission. Refusal handling confirmed in `LocationCall`, `NotificationsCall`, `PedometerCall` (PermissionDenied) |
| "Settings > [Pro]" and Restore Purchases | No Settings screen (T-0657 open). The Pro screen is under More > "pywidget Pro" (`PyWidgetApp.swift`), shown only if `gates.sellsPro`; its link reads "Restore purchase" (`pro-strings.json`) | **Failed.** Now says More > pywidget Pro; Settings carries T-0657 |
| "Examples > [Tip Splitter] > Run" | No Examples screen. iPad only: More > Open in New Window lists the 10 examples (`SceneFile.all`). iPhone has no entry (T-0811) | **Failed on iPhone.** iPad path stated; iPhone path carries T-0811 |
| Tip Splitter "asks two questions" | `examples/tip_splitter.py` `main()` asks bill, tip percent and number of people | **Failed.** Now "three" |
| "All source, including our examples and premade widgets, is fully viewable and editable" | Examples open in the editor and run edited (`ContentView`/`open`, `BundledExamples.runSource`). No screen opens a premade's source; the Pro caption says "Source opens with Pro" (`pro-strings.json` `e.caption`); no gallery (T-0191) | **Failed.** Now examples only; premade source carries T-0191, "Pro ones once bought" |
| "the only in-app gallery shows our own premade widgets" | No gallery screen (T-0191 open) | **Failed.** Bracketed under T-0191 |
| "opens from their own files" | No Projects or Files screen in the editor (T-0355 open) | **Failed.** Bracketed under T-0355; "iCloud Drive" dropped, as on the store page |
| Demo 2 "Projects > + > New Script" | No Projects screen; the main screen is the editor and console | **Failed.** Rewritten to the main screen |
| Demo 3 "Examples > Steps Today" | Steps Today is a premade widget, not an example, and no screen runs it | **Failed.** Rewritten as a two-line script (G9: the prompt wording is checked on a device) |
| Demo 4 "add the Sunrise widget; open Widgets in the app" | One widget, "Python widget", with a ChooseWidgetIntent picker (`Widget/PyWidget.swift`, `WidgetPlacement.swift`); no Widgets screen | **Failed.** Add Python widget, then choose Sunrise; the source step carries T-0191 |
| Run Script "from the user's library" | The picker lists widgets/<id> ids only (T-0790) | **Failed.** Reworded; T-0790 bracket |
| "extension only draws it and runs no code" | `Widget/PyWidget.swift` `timeline(for:)` draws the saved document (ADR-007 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 17:14) | Confirmed; bracketed LANE-OFF |
| ctypes and the Objective-C bridge removed | `stdlib-manifest.json` L12 denylist; `stdlib_cut.py` DENY_EXACT | Confirmed in the build recipe; G1 stays until the release build is checked |
| requests, jedi, pyflakes bundled | Pinned pure wheels staged by `install_packages.sh`; no run | Confirmed in the recipe; Simulator row A9 for requests |
| No HealthKit, contacts, photos, calendar | No such API or plist key in App, Shared, Widget, Core | Confirmed |
| Run Script, Run Script with Input, Refresh Widgets | `RunScriptIntents.swift`, `RefreshWidgetsIntent.swift` titles | Confirmed |
| Twelve premades; GitHub status widget, token in Keychain | 12 files in `widgets/premade`; `github.py` header | Confirmed (gate N) |
| Free app complete for your own Python | #87; Run has no entitlement check | Confirmed |
| Background refresh sentence | Left for T-0795 | Not checked here |

</div>


Follow-ups for code, on the board: T-0811 (iPhone examples), T-0191, T-0355, T-0657, T-0790. Nothing new needed.

## Count

`python3 -c "import re,sys;t=open(sys.argv[1]).read();n=re.search(r'\n(.*?)\n',t,re.S).group(1);print(len(n),'chars',len(n.encode()),'bytes')" pywidget/docs/release/review-notes-draft.md`

Count at draft time, with every bracket still in: 3,578 characters, 3,578 bytes, all ASCII (2026-10-25 19:59 ET, by the command above); 422 left for fills. Bracket fills (version, package list, Pro name and contents) must keep it under 4,000.

Recount 2026-10-25 20:01 ET after the ADR-006 revision (G10 brackets added), same command: 3,781 characters, 3,781 bytes, all ASCII, with both G10 brackets in. Only one is kept at paste: 3,713 if Install from file ships, 3,597 if not (by script, each bracket removed in turn). Worst case leaves 287 for the other fills; the Pro paragraph (G6) is the one to watch.

Recount 2026-10-30 (T-0812), same command, every bracket still in: 3997 characters, 3997 bytes, ascii=True; with every T-bracket deleted, 3563. Other brackets (G1, G5, G6, G9, LANE-OFF) are filled or deleted at paste; the Pro paragraph (G6) is the one to watch.
{% endraw %}

</div>
