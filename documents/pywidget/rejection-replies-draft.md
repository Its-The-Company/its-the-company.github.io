---
layout: "default"
title: "pywidget v1: App Review rejection replies, starting draft"
section: "documents"
description: "Apple&#x27;s text (matrix 1b and 1c, p. 18): &quot;Apps should be self-contained in their bundles&quot; ... Apps &quot;may not read or write data outside the designated container area, nor may they download, install, or execute code which\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-store-drafts/' | relative_url }}">← App Store Drafts</a><a href="{{ '/documents/pywidget/rejection-replies-draft.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/release/rejection-replies-draft.md</code></span></div><h1>pywidget v1: App Review rejection replies, starting draft</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, market and product researcher. T-1761, 2026-11-04, started 9:24 PM ET (`date`). Draft only: **nothing here is sent**. The final replies are written on Fable in Days 49-54 (plan); this is their starting point. Worked from saved sources only; nothing was fetched.

## How to read this file

- **Which guidelines.** One section for each guideline named in a row that pywidget/docs/release/app-review-matrix.md rates **High**: row 2 (bundle strip: 2.5.1, 2.3.1, 2.5.19), row 36 (unreleased capabilities: 2.5.19, 2.3.1, 2.5.2) and row 38 (inputs are never code: 2.5.2, 2.5.11, 4.7.2). 2.5.2 comes first, as asked. Row 38's fourth tag, DPLA 3.3.1(B), is a licence clause, not a guideline; the v1 notes do not cite it (matrix s1e, ADR-006 s12.6), so it gets no section. Rows rated Medium-High (34, 2.3.7; 40, 4.4 and 2.5.11(iii)) are below the line; 2.5.11(iii) is covered inside the 2.5.11 section because it is the same reply.
- **Apple's text** is copied from the matrix's sections 1b and 1c (the Investors' PDF, "Last Updated: October 16, 2026", tagged [primary] there). No new quote was taken.
- **Claims.** Every factual sentence in a reply is numbered and has a row below it: **Backed** with `path:line` at HEAD 7cc994446, or **Not backed**, with the board line for Ines that carries it. A claim backed by absence names the search that returned nothing. Line numbers are HEAD's; `pywidget/ios/Shared/TreeRules.swift` has an uncommitted edit in the working tree today, so its numbers may move.
- **Rule for the final pass.** A reply sentence whose claim is still Not backed on the day is deleted, not softened (matrix s3(a)).

---

## 1. Guideline 2.5.2 (Software Requirements: self-contained, no downloaded code)

**Apple's text** (matrix 1b and 1c, p. 18): "Apps should be self-contained in their bundles" ... Apps "may not read or write data outside the designated container area, nor may they download, install, or execute code which introduces or changes features or functionality of the app, including other apps." Exception: "Educational apps ... may, in limited circumstances, download code provided that such code is not used for other purposes. Such apps must make the source code provided by the app completely viewable and editable by the user."

**Draft reply.** pywidget runs Python code that the user writes, or chooses from their own files, inside the app. The Python interpreter, its standard library and the bundled packages are copied into the app bundle when the app is built [2.5.2-1]. The app does not download or install code: there is no package installer, and the standard library's own installer module, ensurepip, is removed from the build [2.5.2-2]. The app makes no network request on its own account; the only network function it adds is `pywidget.net.get`, which runs when a user's script calls it [2.5.2-3]. Shortcuts actions name a script that is already in the user's library and pass arguments and input text to it as data, never as code [2.5.2-4]. A link inside a widget can only open pywidget itself [2.5.2-5], and the app registers no URL scheme and handles no incoming URL [2.5.2-6]. Files outside the app's container are reached only through the system document picker, one user choice at a time; the user can also import a project (.zip) or .py files the same way [2.5.2-7]. pywidget does not rely on the educational exception.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Guideline 2.5.2 (Software Requirements: self-contained, no downloaded code), scrolls sideways" style="--tw:1500px" markdown="1">

| # | Claim | Status |
|---|---|---|
| 2.5.2-1 | Interpreter, stdlib and packages are bundled at build time | **Backed.** `pywidget/ios/project.yml:174` (app target links `Vendor/python/Python.xcframework`); `pywidget/ios/scripts/install_stdlib.sh:48` (stdlib copied from the same XCframework into the bundle); `pywidget/ios/project.yml:301` (packages staged to `app_packages/` under the bundle root) |
| 2.5.2-2 | No package installer; ensurepip removed | **Backed.** `pywidget/runtime/stdlib-manifest.json:3298` (`ensurepip` in the `stripped` list that opens at :3280). No installer by absence: `git grep -iE "\bpip\b|pypi|ensurepip"` over `pywidget/ios` source (Tests, bench, scripts excluded) finds only `Acknowledgements/Acknowledgements.json` licence rows |
| 2.5.2-3 | No network request of the app's own; `pywidget.net.get` is the one added path, called by user scripts | **Backed.** `pywidget/ios/Shared/Bridge/NetCall.swift:15` (the only caller of `NetFetch.run`); `pywidget/ios/App/Runtime/pywidget/net.py:10`. `URLSession` appears in App, Shared, Widget and Core sources only in `Shared/NetFetch.swift`. Not claimed: what a user's own script does with data it fetches (with `requests` or the standard library) is the user's code, matrix row 16, rated Medium; StoreKit's own traffic is Apple's |
| 2.5.2-4 | Shortcuts take a library script; arguments and input are data | **Backed.** `pywidget/ios/App/Intents/RunScriptIntents.swift:178-179` and `:194-195` (parameters are `ScriptEntity`, `[String]` arguments, `String` input); `:98-108` (`source(for:)` runs a bundled premade's own file or `widgets/<id>/main.py`, regular file, no symlink); `:32` (only ids the library holds now resolve); tests `pywidget/ios/Tests/AppIntentsTests.swift:136`, `:146`. Matrix row 38 test (a), "no App Intent parameter takes or is described as code", has no dedicated test at HEAD; the parameter types above are the evidence today |
| 2.5.2-5 | A widget link only opens pywidget | **Backed.** `pywidget/ios/Shared/TreeRules.swift:64-70` (`linkURL` accepts `pywidget://` only); `pywidget/ios/Shared/TreeView.swift:217-218` and `:411-412` (Link and widgetURL go through it); tests `pywidget/ios/Tests/Core/LinkRuleTests.swift:9` |
| 2.5.2-6 | No URL scheme registered, no incoming URL handled | **Backed by absence.** `git grep -c -E "onOpenURL|CFBundleURLTypes|x-callback|handlesExternalEvents" HEAD -- pywidget/ios/App pywidget/ios/Widget pywidget/ios/Shared` returns no file |
| 2.5.2-7 | Outside-container files only through the document picker; .zip and .py import by the user | **Backed.** `pywidget/ios/App/Device/FilesCall.swift:379` (`UIDocumentPickerViewController`); `pywidget/ios/App/Projects/ProjectsView.swift:81` (`.fileImporter`, `.zip`) and `:233` (`.fileImporter`, `.pythonScript`) |

</div>


---

## 2. Guideline 2.5.1 (public APIs, intended purpose)

**Apple's text** (matrix 1c, p. 17): "Apps may only use public APIs and must run on the currently shipping OS." (matrix 1b, pp. 17-18): "Apps should use APIs and frameworks for their intended purposes and indicate that integration in their app description."

**Draft reply.** [T-0043 Simulator run + <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G8</span>: Python scripts reach iOS features only through a fixed set of functions in the app's Swift code, which call public frameworks on the user's behalf [2.5.1-1]. The ctypes module, its `_ctypes` extension and the CPython test modules are removed from release builds, and the build fails if any of them is found in the bundle [2.5.1-2]. A release build cannot be made with the full, unstripped standard library [2.5.1-3].] No fallback: until T-0043's Simulator escape run and G8 on a Release archive both pass, this paragraph is not used (Ines <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> T-2310, R2).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. Guideline 2.5.1 (public APIs, intended purpose), scrolls sideways" style="--tw:724px" markdown="1">

| # | Claim | Status |
|---|---|---|
| 2.5.1-1 | [T-0043 Simulator run + G8] Scripts reach iOS only through the app's Swift functions | **Not backed at HEAD.** The routing exists (`pywidget/ios/App/Device/DeviceRouter.swift:25`), but the sentence is only true once ctypes is gone from the shipped binary (matrix s3(a)), and that is unchecked: board T-0043 (bundle strip) is open, and a builtin or frozen `_ctypes` is outside the host escape check (`pywidget/tests/escape/cases.json:4`). Board **T-2310**. That the Swift layer calls only public APIs was not checked by this task and is not claimed |
| 2.5.1-2 | [T-0043 Simulator run + G8] ctypes and test modules removed; build fails if present | **Backed as a build rule, Not backed as a fact about a shipped binary.** Rule: `pywidget/ios/scripts/stdlib_cut.py:36` (denylist), `:284-285` (fails on a denylist name in the bundle), `:292-294` (the same check also reads the bundle's interpreter binary for a built-in or frozen `_ctypes`, T-2319); `pywidget/ios/scripts/install_stdlib.sh:88-97` (check runs in every mode); `pywidget/runtime/stdlib-manifest.json:3283` (`_ctypes` stripped). Interpreter scan: `stdlib_cut.py interp` on all three slices of the vendored `pywidget/ios/Vendor/python/Python.xcframework` (device arm64, Simulator x86_64 and arm64) found no denylist name built in, frozen or named by a `PyInit_` symbol, exit 0 (`pywidget/tests/stdlib/evidence/t2319-interp-scan.txt`, step 3); that reads the vendored framework, not an app built from it. No release archive has been checked (gate G8; this task ran no Xcode). Board **T-2310** |
| 2.5.1-3 | Release cannot use the full stdlib | **Backed.** `pywidget/ios/scripts/install_stdlib.sh:43-46` (any configuration but Debug needs `STDLIB_MODE=zip`, else exit 1) |

</div>


Not drafted: the second 2.5.1 duty (name each framework integration in the description) is row 39, rated Low; it belongs to the store page, not to a reply.

---

## 3. Guideline 2.5.19 (no hidden, dormant or undocumented features)

**Apple's text** (matrix 1b, p. 21): "Don't include any hidden, dormant, or undocumented features in your app; your app's functionality should be clear to end users and App Review."

**Draft reply.** pywidget has no server switch or remote configuration. What Pro contains comes from a file inside the app bundle that changes only with a new build [2.5.19-1]. Test hooks are compiled out of release builds [2.5.19-2]. Capabilities not in this version (online package install, a marketplace, sync, iMessage) have no code in the app [2.5.19-3]. In this version the widget extension draws widget documents the app has saved and runs no Python; running scripts inside the extension is switched off by a compile-time constant in every release build [2.5.19-4]. [G8: <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> out of the Release extension: "The build has no code paths for features not described here" (review-notes-draft.md:39) is not used in this reply until G8 passes; fallback "Nothing is switched on at runtime or from a server." (Ines ruling T-2309, R1); see 2.5.19-5.]


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3. Guideline 2.5.19 (no hidden, dormant or undocumented features), scrolls sideways" style="--tw:1494px" markdown="1">

| # | Claim | Status |
|---|---|---|
| 2.5.19-1 | No remote switch; Pro contents from a bundled file, changed only by rebuild | **Backed.** `pywidget/ios/Shared/ProFlags.swift:8`; `pywidget/runtime/pro-flags.json` is a bundle resource of the app and the extension (`pywidget/ios/project.yml:156`, `:335`), validated at build (`:309`, `:371`). No launch fetch: the one network path is 2.5.2-3 |
| 2.5.19-2 | Test hooks compiled out of Release | **Backed.** `pywidget/ios/App/WidgetRunView.swift:3` and `pywidget/ios/App/WidgetInstallView.swift:4` (`#if DEBUG`); `pywidget/ios/Shared/ExtensionLane.swift:527` (`#if PYWIDGET_LANE_FORCED && DEBUG`) |
| 2.5.19-3 | No code for pip, marketplace, sync, iMessage | **Backed by absence.** `git grep -iE "MSMessages|Messages\.framework|CloudKit|NSUbiquitous|marketplace|storefront"` over App, Shared, Widget, `project.yml` and the app entitlements returns nothing; pip as 2.5.2-2. The project's targets are the app, the widget extension, two test targets and EditorBench (`pywidget/ios/project.yml:139`, `:326`, `:376`, `:412`, `:436`) |
| 2.5.19-4 | Extension draws and runs no Python in Release | **Backed.** `pywidget/ios/Shared/LaneGuard.swift:13-17` (`extensionFlag` is `true` only under `PYWIDGET_LANE_FORCED && DEBUG`, else `false`); `pywidget/ios/Widget/PyWidget.swift:37` (the only call into `ExtensionLane` is behind that flag); `pywidget/ios/Tests/ExtensionBridgeTests.swift:48-58` (no target or configuration defines the condition) |
| 2.5.19-5 | [G8: lane out of the Release extension] "No code paths for features not described here" | **Not backed at HEAD.** The extension-lane code (`pywidget/ios/Shared/ExtensionLane.swift`, 557 lines) is compiled into the widget extension behind the constant above, and the extension links `Python.xcframework` (`pywidget/ios/project.yml:341`). Unreachable is not absent; a reviewer who finds Python symbols in the extension could read it as dormant. Board **T-2309** |

</div>


---

## 4. Guideline 2.3.1 (accurate metadata; notes describe the build)

**Apple's text** (matrix 1b, p. 12): "All new features, functionality, and product changes must be described with specificity in the Notes for Review section ... (generic descriptions will be rejected)"; "promoting content or services that it does not actually offer ... is grounds for removal".

**Draft reply.** Our Review Notes describe only what is in this build. Each sentence that depends on unfinished work was tied to a named check before submission and removed if that check had not passed [2.3.1-1]. [Fill on the day: which bracketed sentences were kept and which removed, from the gate table.]


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 4. Guideline 2.3.1 (accurate metadata; notes describe the build), scrolls sideways" style="--tw:724px" markdown="1">

| # | Claim | Status |
|---|---|---|
| 2.3.1-1 | Every conditional notes sentence is gated | **Backed for the process.** `pywidget/docs/release/review-notes-draft.md:53-57` (gate table) and matrix s4 (G1-G13). Whether each gate passed is a submission-day fact, not a HEAD fact |
| 2.3.1-2 | The notes' Home Screen route (the T-0449 bracket) | **Not backed at HEAD.** No Open intent or project entity is on main: the only App Shortcuts are Run Script, Run Script with Input and Refresh Widgets (`pywidget/ios/App/Intents/RunScriptIntents.swift:207-215`), and board T-0449 is open. Gate G13's date (2026-11-03 11:59 PM) has passed, so by its own rule the bracket and the code come out. Board **T-2311** |
| 2.3.1-3 | [T-0043 Simulator run + G8] The notes' ctypes and "only through our Swift functions" sentences | **Not backed at HEAD**, as 2.5.1-1 and 2.5.1-2. Board **T-2310** |
| 2.3.1-4 | [G8: lane out of the Release extension] The notes' "no code paths" sentence | **Not backed at HEAD**, as 2.5.19-5. Board **T-2309** |

</div>


---

## 5. Guideline 2.5.11 (SiriKit and Shortcuts)

**Apple's text** (matrix 1b, p. 19): "(i) Apps integrating SiriKit and Shortcuts should only sign up for intents they can handle without the support of an additional app and that users would expect from the stated functionality." "(iii) Resolve the Siri request or Shortcut in the most direct way possible and do not insert ads or other marketing between the request and its fulfillment."

**Draft reply.** pywidget offers three Shortcuts actions, each handled by pywidget alone: Run Script, Run Script with Input and Refresh Widgets [2.5.11-1]. They run without opening the app [2.5.11-2]. Run Script and Run Script with Input return what the user's script prints, or a plain error if the script fails or is not in the library [2.5.11-3]. A script parameter resolves only to a script the user's library holds now; a deleted or invented script name runs nothing [2.5.11-4]. No action shows a price, offer or purchase [2.5.11-5].


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 5. Guideline 2.5.11 (SiriKit and Shortcuts), scrolls sideways" data-n="4" style="--tw:1325px" markdown="1">

| # | Claim | Status |
|---|---|---|
| 2.5.11-1 | Three actions, handled in-app | **Backed.** `pywidget/ios/App/Intents/RunScriptIntents.swift:173`, `:189`; `pywidget/ios/Shared/RefreshWidgetsIntent.swift:14`; App Shortcuts list `RunScriptIntents.swift:207-215`; test `pywidget/ios/Tests/AppIntentsTests.swift:102` |
| 2.5.11-2 | Run without opening the app | **Backed.** `openAppWhenRun = false` at `RunScriptIntents.swift:176`, `:192`; `RefreshWidgetsIntent.swift:18` |
| 2.5.11-3 | Return printed output or a plain error | **Backed.** `RunScriptIntents.swift:60` onward (`ShortcutRunError.result`) and `:113-148` (`run`); test `AppIntentsTests.swift:66` |
| 2.5.11-4 | Only scripts in the library resolve | **Backed.** `RunScriptIntents.swift:32`, `:100`; tests `AppIntentsTests.swift:136`, `:146` |
| 2.5.11-5 | No price, offer or purchase in an action | **Backed by absence** for the intent files: `git grep -iE "upgrade|buy|unlock|purchase|price|subscribe"` over `RunScriptIntents.swift` and `RefreshWidgetsIntent.swift` finds only a code comment ("Subscribed", line 123). Matrix row 40's string scan of the whole extension target is not run here |

</div>


Seen while reading, for row 40 (not a reply claim): `source(for:)` (`RunScriptIntents.swift:101`) runs a bundled premade's file with no Pro check, so the row 40(a) error "This script is part of Pro." is not in the code at HEAD; the fix is board T-2316 (P1, Idris), and row 40(a)'s words hold only once T-2316 is on main. A Pro premade that is in the library still runs from Shortcuts after a refund. That is a product question, not a 2.5.11 one, and it is written into T-2311 for Ines.

---

## 6. Guideline 4.7.2 (native APIs not exposed to the software)

**Apple's text** (matrix 1c, p. 39): "Your app may not extend or expose native platform APIs or technologies to the software without prior permission from Apple."

**Draft reply.** pywidget's scripts are written by the user in the app; they are not downloaded software. They reach device features only through a fixed set of Swift functions the app defines (at HEAD: clipboard, files, keychain, local notifications and an HTTPS GET), each calling a public API on the user's behalf [4.7.2-1]. [T-0043 Simulator run + G8: With ctypes removed, a script has no route to call native APIs directly [4.7.2-2].]


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 6. Guideline 4.7.2 (native APIs not exposed to the software), scrolls sideways" style="--tw:687px" markdown="1">

| # | Claim | Status |
|---|---|---|
| 4.7.2-1 | A fixed set of Swift device functions | **Backed for the routing.** `pywidget/ios/App/Device/DeviceRouter.swift:8`, `:25`, with one `*Call.swift` per module in `pywidget/ios/App/Device/` (for example `FilesCall.swift:44`, `ClipboardCall.swift:31`). The router's table at `DeviceRouter.swift:8-22` registers exactly ClipboardCall, FilesCall, KeychainCall, NetCall and NotificationsCall. Location and motion (matrix rows 17-18) are not registered there at HEAD, so the reply does not name them; the native prompts take another path this task did not trace. The final pass copies the list from the router on the day |
| 4.7.2-2 | No direct route to native APIs | **Not backed at HEAD**, as 2.5.1-1. Board **T-2310** |

</div>


---

## Board lines raised for Ines (T-1761)

- **T-2309**: 2.5.19-5 and 2.3.1-4 (extension-lane code compiled into Release behind a constant).
- **T-2310**: 2.5.1-1, 2.5.1-2, 2.3.1-3 and 4.7.2-2 (ctypes absence unproven on a shipped binary until T-0043 and G8).
- **T-2311**: 2.3.1-2 (T-0449 Home Screen route missing at HEAD; G13 has fired by its date), with the row 40 Pro-premade observation.

Seen and not raised: `pywidget/ios/Privacy/Frameworks/_remote_debugging.xcprivacy` exists while `_remote_debugging` is on the denylist (`stdlib_cut.py:36`) and `project.yml` does not reference it. It makes no reply claim; it is a leftover for whoever next touches the manifests (matrix 1d A2 note).
{% endraw %}

</div>
