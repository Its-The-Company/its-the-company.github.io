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

- The notes field holds 4,000 (one guide says 4,000 bytes; matrix section 1). The text between the markers below is plain ASCII, so characters and bytes are the same. Count it with the command at the end before pasting.
- Square brackets are filled at submission. A bracketed sentence with a gate (G1-G9, matrix section 4) is **deleted** if its gate fails, never softened or kept "for now". The notes must match the build exactly (2.3.1, 2.5.19).
- Use the App Store name the Investors choose in place of [App Name].

## Notes text


[App Name] is a Python development environment for iPhone and iPad. Users write and run their own Python scripts, and a script can draw a home screen or Lock Screen widget.

HOW CODE RUNS
The app runs code from only two sources: (1) Python the user types or pastes[T-0355: , or opens from their own files (app storage, or a Files folder they pick)], and (2) the example scripts and premade widgets compiled into this build. The app does not download or run code from our servers or other users. There is no store, sharing or import-from-URL of others' code; [T-0191: the only in-app gallery shows our own premade widgets, compiled into this build. ]Examples open in the editor, where the user can read and edit them before they run.[T-0901: Premades open as editable copies.] A user's own script may make network requests it writes; the app itself never fetches code.

RUNTIME
CPython [3.15.1] and its standard library are bundled in the app. Bundled packages: [requests, jedi, pyflakes]. Compiled packages such as numpy are not in this version, and there is no package installer. Native modules are signed frameworks inside the bundle.
[T-0043 Simulator run + G8: Python reaches iOS features only through a fixed set of Swift functions we wrote on public APIs. The ctypes module and the Objective-C runtime bridge are removed from the build, so scripts cannot call native APIs directly.]

DEVICE FEATURES
Scripts can use: clipboard, files, local notifications, location (When In Use only), motion history (steps, floors, distance), and the Keychain for the user's own secrets. Location and motion are asked the first time a script needs them, with a purpose string, and notifications through the system prompt; the app stays usable if any is refused. Files, clipboard and Keychain have no prompt. There is no HealthKit, contacts, photos or calendar access.

WIDGETS [G5: delete this section if widgets are cut]
A script can describe a widget with our Python view library. Python runs in the main app (foreground, background app refresh, or the Refresh Widgets Shortcuts action) and saves the result; [<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">LANE</span>-OFF: the widget extension only draws it and runs no code.] Background refresh is used only to update the user's widgets.[T-2373: Pro unlocks it.][6b, T-0795 cut: drop this; Pro is themes.] Twelve premade widgets ship in the build[T-2372: , all free]. The GitHub status widget calls GitHub's public API from the device; it works without an account, and an optional personal token stays in the Keychain.

SHORTCUTS
App Intents: Run Script, Run Script with Input, Refresh Widgets. They run one of the user's widget scripts[T-0790: , or any script from the user's library]; the input is data passed to that script, not code.

IN-APP PURCHASE
One non-consumable, "[Pro name]", unlocks [G6: [T-2373: background refresh and ][T-0272: editor themes]]. More > pywidget Pro shows it and has a Restore purchase link[T-0657: ; Settings > Pro shows it too]. The free app is complete for writing and running your own Python.

PRIVACY
No account, no sign-in, no server, no analytics, no tracking. Scripts, widgets and logs stay on the device and in folders the user chooses.

NO HIDDEN FEATURES
There are no hidden, dormant or server-enabled features. [G8: lane out of the Release extension: The build has no code paths for features not described here.]

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
| ctypes and Swift-only sentences (bracket T-0043 Simulator run + G8; Ines <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> T-2310, R2) | T-0043's Simulator escape run and G8 on a Release archive both pass; a build rule (`pywidget/ios/scripts/stdlib_cut.py:36`, `:284-285`) and the `stdlib_cut.py interp` scan of the vendored Python.xcframework slices (T-2319, `pywidget/tests/stdlib/evidence/t2319-interp-scan.txt`) are not enough. No fallback that says ctypes is absent: if either fails the sentences are deleted |
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
| "no code paths for features not described" (bracket G8: lane out of the Release extension; Ines ruling T-2309, R1) | G8 Release-extension symbol check passes with the lane and its Shared/ bridge code compiled out (HEAD today: `pywidget/ios/Shared/LaneGuard.swift:13-17`, `pywidget/ios/project.yml:329-331`, `:341`). Fallback if Python must stay linked there: replace the sentence with "Nothing is switched on at runtime or from a server." |
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
| "extension only draws it and runs no code" | `Widget/PyWidget.swift` `timeline(for:)` draws the saved document (ADR-007 chair line 17:14) | Confirmed; bracketed LANE-OFF |
| [T-0043 Simulator run + G8] ctypes and the Objective-C bridge removed | `stdlib-manifest.json` L12 denylist; `stdlib_cut.py` DENY_EXACT | Confirmed in the build recipe; the sentence stays bracketed until T-0043's Simulator run and G8 pass |
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

Recount 2026-11-04 (T-2397, Wrenna), tools/store_copy_check.py --notes, every bracket in: 3993 characters, 3993 bytes, of 4,000 (was 3,890). Changed for B-staged 6a (#142): (a) the T-0191 bracket "the Pro ones once bought" is gone, replaced by [T-0901: Premades open as editable copies.]; (b) "Twelve premade widgets" gains [T-2372: , all free]; (c) the background refresh sentence gains [T-2373: Pro unlocks it.] with the 6b fallback beside it (if T-0795 cuts refresh, the sentence goes and Pro is themes only); (d) [contents - G6] now reads [G6: [T-2373: background refresh and ][T-0272: editor themes]]. Nothing at HEAD changed: no entitlement check on refresh and no theme picker were found (scope map rows below), so every new claim is bracketed. Seven characters of headroom: the next added bracket needs a cut first.

## Scope map (T-1762, Wrenna, 2026-11-04 22:10 ET): each claim and demo step against ops/v1_scope.json

Form as store-page-draft.md section 10. Scope is the B-staged re-plan (#142; ops/plans/pywidget/plan.md chair note 2026-11-04, Ines T-2354; ops/v1_scope.json as_of 2026-11-04T22:03). "Open line" is from `grep "^- \[.\]" ops/board.md` at 22:10 ET; "done" means the row is done and no line is needed, with the path. Source read at HEAD 858c96cfe, no build run. Where HEAD and a row disagree, HEAD is written here and the row goes to Ines (T-2381, T-2396). Freeze is 2026-11-30. A bracket whose line misses is deleted whole, never softened. This replaces the 2026-11-03 table, which was read against the old scope.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Scope map (T-1762, Wrenna, 2026-11-04 22:10 ET): each claim and demo step…, scrolls sideways" style="--tw:1869px" markdown="1">

| Notes claim or demo step | v1_scope row | Row state | HEAD 858c96cfe | Open line that finishes it, or done path | At risk for 11-30 |
|---|---|---|---|---|---|
| Intro and RUNTIME: write and run Python; CPython and stdlib bundled | runtime | done | as row | done: ops/site-checks/alpha-rehearsal-2026-10-29/423fbf49/INDEX.md row A1 | no |
| Bundled packages: requests, jedi, pyflakes | pure-packages | done | as row | done: same INDEX.md row A9 | no |
| "Compiled packages such as numpy are not in this version, and there is no package installer" | native-packages, install-from-file | cut to 1.2 (B-staged); cut to 1.1 | none staged | done: stated as absent, which is true; no date for 1.2 goes in the notes | no |
| T-0043 Simulator run + G8: ctypes and the ObjC bridge removed; Swift-only reach | bundle-strip | in progress | denylist is a build rule; no Release archive checked (ruling R2) | T-0043 (strip, Simulator escape run), G8, and T-2320 (b) puts the sentence behind that bracket | **yes**: out of the notes until T-0043 and G8 pass |
| HOW CODE RUNS: types or pastes; examples open in the editor | editor, examples | done; done | as rows | done: App/PyWidgetApp.swift:584, :632 | no |
| T-0355 bracket: "opens from their own files" | projects | in progress (stale) | ProjectsView with Import Files and Import Project ships (App/Projects/ProjectsView.swift; More > Projects, App/PyWidgetApp.swift:1028) | T-2381 (Ines marks the row); the bracket may stay on HEAD's evidence | no, on HEAD |
| T-0191 bracket: the only in-app gallery shows our own premades | gallery | not started (stale) | GalleryView reachable from More > Gallery (App/PyWidgetApp.swift:1055), slice 1 eab3728af | T-2267, T-2268 (T-0191's rest), T-2372 (all-free <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>); row state to Ines, T-2396 | **yes**: bracket goes if T-0191 misses |
| T-0191 bracket: "Each premade's source opens in the app, the Pro ones once bought" | gallery, pro-placement | not started; not started (B-staged) | no Open source action found | T-0901 (open as editable copy, free); **"the Pro ones once bought" is wrong under 6a (no Pro premade in 1.0): flagged for removal**, T-2397 (a) | **yes** |
| Device features: clipboard, files, notifications, location, motion, Keychain | device-modules | done | as row | done: T-0353 abe146d0, T-0354 a779625e (P3 follow-ups only) | no |
| WIDGETS: Python describes a widget, the main app runs it, the extension draws | widget-engine | done | as row | done: INDEX.md rows A3, A4a, A4b | no |
| LANE-OFF bracket: the extension runs no code | widget-engine | done | lane code and the Python link sit in the Release extension (ruling R1) | T-2317 (lane out of the Release extension), then G8; T-2320 (a) | **yes** |
| Background refresh sentence | pro-placement | not started (B-staged) | no entitlement check on refresh; refresh itself blocked | T-0793 [b], T-2373 (Pro gates refresh, 6a), T-0795 [b] cut check 11-12; wording T-2397 (c) | **yes**: if T-0795 cuts refresh, the sentence goes and Pro is themes only (6b) |
| Twelve premade widgets; GitHub status calls the public API | premades, gallery | in progress; not started | 12 files in widgets/premade | T-2268 (every premade through the Simulator), T-2372 (all free); "all free" wording T-2397 (b) | yes: "twelve" holds only if all 12 pass |
| SHORTCUTS: Run Script, Run Script with Input, Refresh Widgets | intents | done | App/Intents/RunScriptIntents.swift:207-215 | done: INDEX.md row A10 | no |
| T-0790 bracket: "or any script from the user's library" | intents | done (widget ids only) | picker lists widgets/<id> only | T-0790, T-0510 | yes: bracket goes |
| Locked premades in Shortcuts (not in the notes; reply row 40(a)) | pro-placement | not started (B-staged) | ShortcutRun.source never checks the lock (ruling R3) | T-2316 (check stays, locked set empty in 1.0) | no for the notes |
| IN-APP PURCHASE: one non-consumable; Restore at More > pywidget Pro | pro | done | Pro button label "pywidget Pro" (App/Store/pro-strings.json e.settings), shown only if sellsPro (App/PyWidgetApp.swift:1061) | done: INDEX.md rows A7a-c; product is gate G7 (human) | no |
| "[contents - G6]" | pro-placement, themes | not started (B-staged); not started | Settings has a themes flag; no theme picker found | G6 (Investors: name); contents now background refresh plus themes: T-2373, T-0272; wording T-2397 (d) | yes: each item named only if its line lands |
| T-0657 bracket: "Settings > Pro shows it too" | settings | not started (stale) | SettingsView with Pro row and Restore purchase, More > Settings (App/PyWidgetApp.swift:1057); T-2225 3/3 green | T-0657 still open; row state to Ines, T-2396 | low: built at HEAD |
| PRIVACY: no account, no server, no analytics | privacy | in progress | as row | label and policy link: gate G11 (human); T-0047 [b] | no for the sentence |
| NO HIDDEN FEATURES: "no code paths for features not described" | bundle-strip | in progress | lane code in the Release extension (ruling R1) | T-2317, G8; T-2320 (a) puts it behind G8 with the fallback "Nothing is switched on at runtime or from a server." | **yes** |
| Demo 1, iPad: More > Open in New Window > tip_splitter.py > Run | examples, ipad | done; in progress | App/PyWidgetApp.swift:1045-1051, iPad only | done: examples row; iPad layout F4 is not this step | no |
| Demo 1, iPhone: [Examples entry] > tip_splitter.py > Run | examples | done (files) | **no iPhone entry**: Open in New Window needs supportsMultipleWindows; no examples list in Projects or Gallery | T-1759 (Maren, where it lives), T-0811 (Idris builds it), T-1757 | **yes, highest**: if T-0811 misses, the notes and page say iPad only |
| Demo 1 text: three questions with input() | examples, prompts | done; in progress | tip_splitter.py uses input() | done for input(); T-0447, T-0458 would change the text if the example moves to native prompts | no, unless T-0458 lands |
| Demo 2: type print("hello") in the editor, Run | editor, runtime | done | Run in the toolbar (App/PyWidgetApp.swift:1036) | done | no |
| Demo 3 (G9): pedometer.today(), Allow Motion | device-modules | done | as row | done; purpose strings gate G9 (human) | no |
| Demo 4 (G5): add Python widget, Edit Widget > Sunrise | widget-by-tap, premades | in progress (stale) | T-0512 ticked 2251c18e3; T-0684 landed, review pass ce660a229 | T-0757 (signed-device promise), T-2268 (Sunrise through the checks); row state to Ines, T-2396 | yes, until T-0757 shows it on a device |
| Demo 4 follow-on: open its source | gallery | not started | no Open source action found | T-0901, T-2268 | **yes**: T-0191 bracket |
| Demo 5: More > pywidget Pro, see and test the purchase | pro | done | as IN-APP PURCHASE row | done; G7 (human) | no |
| In 1.0 now, not in the notes: preview pane and Run as widget; internet examples; Shortcut recipes; small website | preview-pane, internet-draw, shortcut-recipes, website-premades | in 1.0 (B-staged); not started (x3) | not built | T-0192, T-0048; T-2375; T-2376; T-0050. A notes sentence or demo step for any of them is added only after its line is on main | no: the notes claim none |
| Moved out of 1.0: Builder, own AI keys, web projects, widget buttons, advanced libraries, Control Center, install from file, share extension | (versions 1.1, 1.2) | 1.1 or 1.2 | not in the build | none for 1.0 (T-2377, T-2378 hold them). The notes name only numpy as absent; **no demo step uses any of them**, so none is flagged (the T-0449 bracket is deleted, T-2320 (c)) | no |
| Not in the notes, by design: themes, traceback taps, completion, rating, a11y, tour | themes, traceback-taps, completion-lint, rating, a11y, tour | not started or in progress | not checked here | T-0272, T-0389, T-0656, T-0273, T-0025, T-0193 | no |

</div>


Read for the freeze: demo step 1 on iPhone (T-0811) is still the step most at risk; demo step 4 and its source follow-on hang on T-0757, T-2268 and T-0901. One bracket is flagged for removal now, not at the freeze: "the Pro ones once bought" (no Pro premade in 1.0; T-2397 (a)). The T-0449 Home Screen sentence is deleted (G13 fired, 1.1; T-2320 (c)). The ctypes, "no code paths" and LANE-OFF sentences wait on T-0043, T-2317 and G8. Demo steps 2, 3 and 5 depend on no open build line. This table changes no sentence between the markers; the count is unchanged.

2026-11-05 (T-2482 for T-2320, Wrenna): T-2320's wording re-applied on this version. The ctypes and Swift-only sentences sit behind [T-0043 Simulator run + G8] with no fallback (Ines ruling T-2310, R2); "no code paths" sits behind [G8: lane out of the Release extension] with the fallback "Nothing is switched on at runtime or from a server." (T-2309, R1); the T-0449 bracket is deleted, gate G13 fired 2026-11-03 23:59 and the feature is 1.1 (T-2311, R3; ops/plans/release-rulings-2026-11-04.md). The text between the markers changed, so I recounted: `tools/store_copy_check.py --notes`, every bracket in, 3940 characters, 3940 bytes, of 4,000.

2026-11-05 (T-2527, Wrenna): the gate row's stdlib_cut.py cites checked at HEAD 966f36dce and moved from :31 and :280 to :36 (DENY_EXACT) and :284-285 (the bundle denylist test in check()); the row now names T-2319's vendored-slice interp scan as also not enough. The ctypes bracket stays: no Release archive has been checked. Nothing between the markers changed: `tools/store_copy_check.py --notes`, 3940 characters, 3940 bytes, of 4,000.
{% endraw %}

</div>
