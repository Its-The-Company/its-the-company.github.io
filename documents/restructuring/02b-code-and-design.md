---
layout: "default"
title: "Phase 2, part b: the code and the design as built"
section: "documents"
description: "Model: claude-fable-5-2. Commit read: 765f0785d8 for sections 1 to 3, 1ed0074989 for sections 4 and 5 (git log -1 --format=%h, 2026-11-12). Pernille, step 2b of T-4127."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/restructuring/work/' | relative_url }}">← Working drafts</a><a href="{{ '/documents/restructuring/02b-code-and-design.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Working draft</span><span>Day 22 · Thu Nov 12, 9:34 PM ET</span><span><code>documents/restructuring/work/02b-code-and-design.md</code></span></div><h1>Phase 2, part b: the code and the design as built</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Model: claude-fable-5-2. Commit read: 765f0785d8 for sections 1 to 3, 1ed0074989 for sections 4 and 5 (`git log -1 --format=%h`, 2026-11-12). Pernille, step 2b of T-4127.


Plan only; nothing was built or run for this file. Swift paths are relative to `pywidget/ios/`.

## 1. What exists against the product statement

"Code" below means I read it at this commit. The app guide is dated 2026-10-30 and is behind the code: [`pywidget/app-guide-05-being-built.md`](../pywidget/app-guide-05-being-built.html) calls the Gallery and Projects "not built", and both exist now.

**Measured on a device: one record, and it is a failure.** On an Investor's iPhone the internal TestFlight builds drew only Countdown of the 12 premades; the cause is not found (T-3783, open; `ops/state.md` "Live blockers", `log/state-history.md` 11-08). Every figure in `bench/` is a Simulator figure and says so. Nothing below is proven on a phone.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. What exists against the product statement, scrolls sideways" style="--tw:741px" markdown="1">

| Product | State (code) | Where |
|---|---|---|
| Widgets | Built. One WidgetKit kind, six sizes, chosen per placement; 12 premades (5 free, 7 Pro), a template, 3 recipes. Buttons and toggles draw but do not respond | `Widget/PyWidget.swift`, `Shared/TreeView.swift`, `Shared/WidgetPlacement.swift`, `pywidget/widgets/`, `pywidget/python/pywidget_ui/` |
| IDE | Built. Highlighting, completion, inline errors, a console with `input()`, Stop, iPad windows, a Shortcuts "Run Script" action | `App/Editor/`, `App/PyWidgetApp.swift`, `App/Intents/RunScriptIntents.swift` |
| Previews | Gallery only: each premade runs live in a preview mode that writes nothing. No preview beside the editor | `App/Gallery/GalleryPreview.swift`, `Shared/Bridge/RunResultSink.swift` |
| Projects | The floor: flat folders of `.py` files; new, rename, delete, zip import and export | `App/Projects/` |
| Pages | Not built. Two seeds: a project file (`pywidget.json`) with its Python half and a Swift reader that only the tests compile, and no run screen; native prompts, of which only the alert is wired | `App/Runtime/_pywidget_runtime/app_manifest.py`, `Core/Sources/PyWidgetCore/ProjectManifestReader.swift`, `App/Device/PromptDesk.swift` |
| Builder | Not built. Nearest thing: the launcher editor, a form that writes one premade's settings (switched off, unreleased) | `App/Launcher/LauncherEditor.swift` |
| Marketplace | Not built. A permissions manifest is drafted; nothing reads it | `pywidget/docs/design/manifest.schema.json` |
| iMessage | Nothing: one app target, one widget extension | `project.yml` |

</div>


Also absent: background refresh (a schedule rule in `Shared/RefreshSchedule.swift`, no scheduler call), the first-run tour, a run-history screen. About 160 test files exist (`Tests/`, `UITests/`); I ran none.

## 2. The architecture as built

**Where Python runs.** One CPython 3.15 interpreter per process, one run at a time (`Shared/Bridge/PyBridge.swift`); a script's modules are cleared between runs (`App/Runtime/_pywidget_runtime/runner.py`). In a shipping build it runs in the app only. Code that runs a project marked `lane: widget` inside the widget extension exists (`Shared/ExtensionLane.swift`: 2 s budget, 4 s deadline), but its switch is off outside test and gate builds (`Shared/LaneGuard.swift`) until a phone gives memory numbers.

**How output reaches a widget: views, not data.** The script builds a tree of SwiftUI-like nodes with `pywidget_ui`. The run writes it as JSON, checked against `pywidget/docs/design/viewtree.schema.json`, to `widgets/<id>/tree.json` in the App Group (the folder the app and its extension share). The extension draws it with Apple's own views (`Shared/TreeView.swift`) and the script's timeline entries (`Shared/TreeTimeline.swift`). A widget is as fresh as the app's last run: on foreground, on an editor save, or from the Refresh Widgets shortcut (`App/Bridge/WidgetWriter.swift`).

**The project on disk: three places joined by copying.**
- `Documents/Scripts/<name>/*.py`: the project. Flat, Python files only: no assets, no subfolders (`App/Projects/ProjectStore.swift`).
- App Group `widgets/<id>/`: a copy of every `.py`, made when a saved file's text contains `Widget("<id>")`, beside `tree.json` and `status.json`. The link is found by scanning the source (`App/Projects/WidgetScriptSave.swift`).
- App Group `lane-scripts/<id>/`: a second copy for the extension.

A project has five identities: its folder name, the widget id in its source, the `pywidget.json` UUID, the Shortcuts entity (the widget id again) and the keychain's script id. There is no database: JSON files and lock files. A premade's settings are one `premade.json`.

**Shareable as it stands.** The renderer and schema sit in `Shared/` and draw in both targets, so a Page or a Messages card can reuse them for display. The run contexts (`app`, `widget`, `shortcut`, `preview`; `records.py`) are the place to add `page` and `message`. Premades already split `read()` (data) from `draw()` (view) (`pywidget/widgets/premade/_premade.py`): that is the component boundary a Builder and a marketplace need. Every device call passes one router (`App/Device/DeviceRouter.swift`).

**Needs rewriting.** The project store (one folder, one identity, assets, outputs declared in a manifest, not found by scanning). Interaction: tree nodes only display; a Page needs live buttons, fields, lists, scrolling and an event path back to Python. The router answers any call from any script; nothing checks permissions. `ConsoleModel` (about 770 lines in `App/PyWidgetApp.swift`) holds the editor, run, save and widget-send state for one file.

## 3. Navigation and design as built

**Built.** One navigation stack whose root is the editor over the console (`ContentView` in `App/PyWidgetApp.swift`). Projects is pushed from a toolbar button; Gallery, Settings, Acknowledgements and Pro hang off a "More" menu. The code's own comments call each of these temporary, "until the tab bar lands". iPad gets extra windows and a two-column Gallery, not a different layout.

**Drawn and approved** (`creative/approved.md` item 2; `pywidget/docs/design/mockups/`). A four-tab bar (Projects, Gallery, Docs, Settings) with Projects as home: search, filters by type (Scripts, Widgets, Shortcuts), pinned and recent, a New button. An editor with file tabs and non-Python files. On iPad a file sidebar, run history and a live widget preview with size and colour-mode switches. None of that is built. Also drawn and not built: the run screen for Home Screen scripts (`pywidget/docs/design/ide/A-home-rev-phone.png`), the tour, Docs.

**What matches.** Colour and type. Every Paper and Studio token is generated into `Shared/Theme.xcassets`; the editor and console grounds use them; the display faces follow the appearance (`Shared/DisplayFont.swift`); widgets draw from the same tokens. Projects is a plain system list.

So Paper and Studio are honoured in colour and type, and the approved layout is mostly absent. The app opens on a code editor, which is the wrong front door for the casual creator and the user of finished products, and the stack has no place for a Builder or a marketplace.

## 4. What an expert would do differently

In build order; 2 and 3 need 1.

**1. One project, one identity, one manifest.** One folder holds a project's code, assets and one `pywidget.json`. That file exists (id, name, entry; `App/Runtime/_pywidget_runtime/app_manifest.py`); extend it to list outputs (widgets, Pages, message cards) and permissions. Its UUID is the identity; the widget id, Shortcuts entity and keychain scope derive from it. The app reads outputs from the manifest, not by scanning saved text for `Widget("id")` (`App/Projects/WidgetScriptSave.swift`), and the extension gets one copy, not two. A Builder then has a file to write and a marketplace a unit to list. No migration is written.

**2. Components from the premades.** Each premade declares its capabilities, network hosts, `read()` (data) and `draw()` (a view from data only) (`pywidget/widgets/premade/_premade.py`). Make that contract public in `pywidget_ui`: a component is a data source and a view over it. A widget and a Page then share one `read()`, and a Builder document is component names and settings, no code: what [`pywidget/docs/decisions/ADR-006-marketplace-staging.md`](../pywidget/adr-006-marketplace-staging.html) section 4 lets a marketplace list first.

**3. Permissions at the router.** Every device call passes one function, which answers any script (`App/Device/DeviceRouter.swift`). Check there: find the calling run's project and refuse a capability its manifest lacks (drafted: `pywidget/docs/design/manifest.schema.json`). It is a wall only for calls that pass it: plain file reads do not, and inside the app's process the app sandbox is the only hard boundary [from the company's research doc, `pywidget/docs/research/L12-security.md` section 0].

**4. A tab shell.** Replace the stack rooted on the editor with the approved four tabs (`creative/approved.md` item 2): Projects as home, the editor opened from a project. Builder and Pages live inside a project, a marketplace inside Gallery. First split `ConsoleModel`, which knows one file, into a per-project run session and an editor model.

## 5. Risks, ranked

1. **Nothing is proven on a phone.** The only device record is section 1's failure (T-3783, still open); the rest is Simulator results or code read. Reduce: close T-3783 before restructuring.

2. **Imported code has no trust model.** A zip import checks names, size and UTF-8 (`App/Projects/ProjectTransfer.swift`), gives no warning about outside code, and the code runs with the user's own reach. A permission granted to the app is granted to every script in it [from the company's research doc, `pywidget/docs/research/L12-security.md` P2]; the banner it recommends for outside code (8.1) is not built. Guideline 4.7.3, if it covers shared projects (unsettled, `work/01b-review-and-marketplace.md`), wants "explicit user consent in each instance" [from Apple's page, https://developer.apple.com/app-store/review/guidelines/, read 2026-11-12]. Reduce: section 4 items 1 and 3, the banner, and ADR-006's separate process for other people's Python.

3. **Extension memory is unmeasured.** No number was found (`work/01a-platform-limits.md`): extension limits are "significantly lower than the memory limits imposed on a foreground app" [from Apple's page, https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/ExtensionCreation.html, read 2026-11-12]; 30 MB is [recalled, verify]. Measured, Simulator only (no limit enforced): Python in the extension peaks near 12 MB on a small script, 18.2 to 21.6 MB on a heavy one (medians), then holds about 27 MB ([`pywidget/docs/decisions/ADR-007-execution-architecture.md`](../pywidget/adr-007-execution-architecture.html) sections 1 and 2). Not measured: any phone, any Messages extension. Reduce: one device session before extension Python or iMessage is promised.
{% endraw %}

</div>
