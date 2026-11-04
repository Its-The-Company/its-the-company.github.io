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
The app runs code from only two sources: (1) Python the user types or pastes[T-0355: , or opens from their own files (app storage, or a Files folder they pick)], and (2) the example scripts and premade widgets compiled into this build. The app does not download or run code from our servers or other users. There is no store, sharing or import-from-URL of others' code; [T-0191: the only in-app gallery shows our own premade widgets, compiled into this build. ]Examples open in the editor, where the user can read and edit them before they run.[T-0191: Each premade's source opens in the app, the Pro ones once bought.] A user's own script may make network requests it writes; the app itself never fetches code.

RUNTIME
CPython [3.15.1] and its standard library are bundled in the app. Bundled packages: [requests, jedi, pyflakes]. Compiled packages such as numpy are not in this version, and there is no package installer. Native modules are signed frameworks inside the bundle.
[G1: Python reaches iOS features only through a fixed set of Swift functions we wrote on public APIs. The ctypes module and the Objective-C runtime bridge are removed from the build, so scripts cannot call native APIs directly.]

DEVICE FEATURES
Scripts can use: clipboard, files, local notifications, location (When In Use only), motion history (steps, floors, distance), and the Keychain for the user's own secrets. Location and motion are asked the first time a script needs them, with a purpose string, and notifications through the system prompt; the app stays usable if any is refused. Files, clipboard and Keychain have no prompt. There is no HealthKit, contacts, photos or calendar access.

WIDGETS [G5: delete this section if widgets are cut]
A script can describe a widget with our Python view library. Python runs in the main app (foreground, background app refresh, or the Refresh Widgets Shortcuts action) and saves the result; [<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">LANE</span>-OFF: the widget extension only draws it and runs no code.] Background refresh is used only to update the user's widgets. Twelve premade widgets ship in the build. The GitHub status widget calls GitHub's public API from the device; it works without an account, and an optional personal token stays in the Keychain.

SHORTCUTS
App Intents: Run Script, Run Script with Input, Refresh Widgets. They run one of the user's widget scripts[T-0790: , or any script from the user's library]; the input is data passed to that script, not code.[T-0449: A user can build a Shortcut that opens one of their own projects; nothing is downloaded, shared or offered.]

IN-APP PURCHASE
One non-consumable, "[Pro name]", unlocks [contents - G6]. More > pywidget Pro shows it and has a Restore purchase link[T-0657: ; Settings > Pro shows it too]. The free app is complete for writing and running your own Python.

PRIVACY
No account, no sign-in, no server, no analytics, no tracking. Scripts, widgets and logs stay on the device and in folders the user chooses.

NO HIDDEN FEATURES
There are no hidden, dormant or server-enabled features. The build has no code paths for features not described here.

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
| T-0449 bracket (SHORTCUTS, Home Screen route) | T-0449 on main and freeze row F18 green by 2026-11-03 23:59 (matrix row 46, gate G13); fails: the bracket goes and the code leaves the build. The words "app" and "mini app" never name a user's project |
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

Recount 2026-11-02 (T-0451, Wrenna), same method (text between the markers, by script), after the T-0449 bracket (the Home Screen sentence, 118 characters with its brackets): every bracket still in: 4115 characters, 4115 bytes, ascii=True, **115 over the 4,000 limit**; with every T-bracket deleted, 3590; with only the T-0449 bracket deleted, 3998. So the limit holds only if the bracket text left in at paste is trimmed (the Pro paragraph, G6, and the placeholders are filled or cut then), or a T-bracket's gate fails. Open: whoever pastes the notes trims about 115 characters, and the count is rerun after the fill; I have not cut another team's sentence.

Trim 2026-11-02 (T-1084, Wrenna): repetition cut, no fact removed. Worst case, every bracket and label in: 3890 characters, 3890 bytes, ascii, so 110 left for bracket edits. Check: `python3 tools/store_copy_check.py pywidget/docs/release/review-notes-draft.md --notes` (fails over 4,000 characters or bytes; seen red at 4114 on the T-0451 text).

## Scope map (T-1762, Wrenna, 2026-11-03): each claim against ops/v1_scope.json

Format as store-page-draft.md section 10. State is the file's (as_of 2026-10-29); the open line is from `grep "^- \[ \]" ops/board.md` on 2026-11-03. Freeze is 2026-11-30. A claim whose row is not done is deleted whole if its gate fails (see "Gates" above); no row is softened. At risk = the demo step or sentence fails if the line does not land.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Scope map (T-1762, Wrenna, 2026-11-03): each claim against ops/v1_scope.json, scrolls sideways" style="--tw:1570px" markdown="1">

| Notes claim or demo step | v1_scope row | State | Open line that finishes it | Risk |
|---|---|---|---|---|
| Intro: write and run Python, CPython and stdlib bundled | runtime | done | none | no |
| Bundled packages: requests, jedi, pyflakes; no numpy, no installer | pure-packages, native-packages, install-from-file | done; in progress (absent); cut to 1.1 | none for the sentence (stated as absent) | no |
| G1: ctypes and ObjC bridge removed | bundle-strip | in progress | T-0043 (strip, Idris); release-build check is gate G8 | yes: sentence is deleted if the check fails |
| HOW CODE RUNS: types or pastes; examples open in the editor | editor, examples | done; done | none | no |
| T-0355 bracket: opens from their own files | projects | in progress | T-0753 (re-review of the T-0355 branch); no open T-0355 line, slice 1 is on idris/t0355-projects | yes: bracket goes if not on main |
| T-0191 brackets: own-premade gallery; premade source opens in the app | gallery, premades | not started; in progress | T-0191 (gallery), T-0901 (open source), T-0051 (Pro placement), T-0624 (Maren's cut text if the gallery goes to 1.1) | yes: brackets go, source claim cannot be made |
| Device features: clipboard, files, notifications, location, motion, Keychain | device-modules | done | none (P3 review follow-ups only) | no |
| Native alerts and prompts (not in the notes today; demo step 1 relies on input() only) | prompts | in progress | T-0447 (Swift), T-0458 (tip splitter on prompts) | no for the notes; yes if step 1 text changes to native prompts |
| WIDGETS: Python describes a widget, main app runs it, extension draws | widget-engine | done | T-0675 (extension lane), T-0511 and T-0561 (WidgetRunView review) | LANE-OFF sentence yes: set by the Day 24 flag ruling |
| Background refresh sentence | widget-engine | done | T-0795 is [b] blocked; T-1758 (host-only, feeds T-0793) | yes: unchecked in code; left whole for Ines |
| Twelve premade widgets; GitHub status calls the public API | premades | in progress | T-0358 fixtures landed; all 12 through the checks is freeze row F1 (due 2026-11-02, no open line found); T-0306 (gallery Simulator check) | yes: count "twelve" holds only if F1 is green |
| SHORTCUTS: Run Script, Run Script with Input, Refresh Widgets | intents | done | none | no |
| T-0790 bracket: any script from the library | intents | done (for widget ids) | T-0790 (picker lists any script), T-0510 (Run intents follow-ups) | yes: bracket goes |
| T-0449 bracket: Shortcut opens a user's project | home-screen-scripts | in progress | T-0449 (Swift half); freeze row F18 by 2026-11-03 23:59 | yes: bracket goes and the code leaves the build |
| IN-APP PURCHASE: one non-consumable, Restore in More > pywidget Pro | pro | done | none; Pro name and contents are Investor gate G6 | no (G6 is a human gate) |
| T-0657 bracket: Settings > Pro | settings | not started | T-0657 (Settings screen, freeze row F8) | yes: bracket goes |
| Pro locked until bought (implied by "Pro ones once bought") | pro-placement | in progress | T-0051, T-0861 (paywall images, no Gallery screen) | yes |
| PRIVACY: no account, no server, no analytics | privacy | in progress | label and policy link: gate G11 (human); no open build line | no for the sentence |
| NO HIDDEN FEATURES | bundle-strip | in progress | T-0043 plus G8 release-build check | yes, same as G1 |
| Demo 1, iPad: More > Open in New Window > tip_splitter.py > Run | examples, ipad | done; in progress | none for the iPad path (sidebar and split: freeze row F4) | no on iPad |
| Demo 1, iPhone: [Examples entry] > tip_splitter.py > Run | examples | done (files); no iPhone entry | T-1759 (Maren designs the entry), then T-0811 (Idris builds it, Xcode slot); T-1757 (bundled files open clean in the editor) | **yes, highest: no iPhone route exists at HEAD**; if T-0811 misses, the notes and page say iPad only |
| Demo 2: type print("hello") in the editor, Run | editor, runtime | done | none | no |
| Demo 3 (G9): pedometer.today(), Allow Motion | device-modules | done | none; purpose strings are gate G9 (human) | no |
| Demo 4 (G5): Add Python widget, choose Sunrise | widget-by-tap, premades | in progress | T-0512 (P0, freeze row F19, no open line found), T-0757 (signed-device promise after T-0684 and T-0191), T-0675 | yes: if a tap does not place the widget the step is deleted with the WIDGETS section |
| Demo 4 follow-on: open the premade's source | gallery | not started | T-0191, T-0901 | yes: T-0191 bracket |
| Demo 5: More > pywidget Pro, see and test the purchase | pro | done | none; the App Store Connect product is gate G7 (human) | no |
| Not in the notes, by design: preview pane, install from file, share extension, themes, traceback taps, completion, rating, a11y | preview-pane, install-from-file, share-extension, themes, traceback-taps, completion-lint, rating, a11y | cut to 1.1; not started or in progress | T-0656 (completion), T-0389 (traceback), T-0032 (share stub probe) | no: nothing in the notes claims them |

</div>


Read for the freeze: demo steps 1 (iPhone) and 4 are the two at risk, and the T-0191, T-0449, T-0657 and T-0790 brackets each need their line on main. Demo steps 2, 3 and 5 depend on no open build line. This table adds no claim to the notes text; the count of the text between the markers is unchanged.
{% endraw %}

</div>
