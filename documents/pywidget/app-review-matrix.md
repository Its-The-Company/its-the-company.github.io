---
layout: "default"
title: "pywidget v1: App Review readiness matrix"
section: "documents"
description: "Here is the shape of it. Almost every v1 feature sits on ten years of precedent (Pythonista, Pyto, Scriptable, a-Shell, Juno). Three things can still sink a first review. (1) A sentence in our own notes that the binary\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/pywidget/app-review-matrix.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/release/app-review-matrix.md</code></span></div><h1>pywidget v1: App Review readiness matrix</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, market and product researcher. Day 4, 2026-10-25, started 19:57 ET. Draft, not approved. Inputs: ADR-001 section 3.1 and its "Revised" table (Ines, 19:36), PROPOSAL-002, L6, L12, L13, L16, privacy-label.md. Review notes draft: review-notes-draft.md (same folder).

Revised 2026-10-25, started 20:01 ET, for ADR-006 (Ines, 76434c17): rows 37 (Install from file) and 38 (Shortcuts and URL inputs are never code), section 2a (each S0 claim mapped to the notes sentence that states it), gate <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G10</span>, and the "Not in v1" list corrected. No rating elsewhere moved.

> "Apple has taken issue with apps that it claims violate section 2.5.2 of the App Review Guidelines."
> 9to5Mac, 2026-03-30, on the removal of the vibe-coding app Anything ([link](https://9to5mac.com/2026/03/30/apple-steps-up-crackdown-on-vibe-coding-apps/), search snippet)

Here is the shape of it. Almost every v1 feature sits on ten years of precedent (Pythonista, Pyto, Scriptable, a-Shell, Juno). Three things can still sink a first review. (1) A sentence in our own notes that the binary makes false. The worst is "no ctypes bridge", which is false for a stock upstream CPython until the bundle strip lands. (2) Something the reviewer can't find or can't test, such as the Pro purchase or a widget that needs a background run. (3) Any route by which code reaches the app from somewhere other than the user's own hands. The matrix is built to catch those three.

## 0. Source status (read this first; Commandment 41)

developer.apple.com is read only by a person's browser (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 'P2 terms', research/hunt/rulings-v2.md; tools/terms_guard.py refuses the host). That read is owed (board line [needs-person], #59). Until it lands, **no guideline quote in this file counts as read from Apple's page.** Every row carries one of these tags, and none may be raised without the person read:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 0. Source status (read this first; Commandment 41), scrolls sideways" style="--tw:748px" markdown="1">

| Tag | Meaning | May it raise a risk rating or justify a "go"? |
|---|---|---|
| [G2a-held] | Read by script from Apple's page on 2026-10-24, before the ruling (research/hunt/inbox-41-python-runner.md) | No. It may lower or <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> a reading only |
| [snippet] | Words in a web-search result (from the search provider, not Apple's servers); link given | Substance yes, exact current wording no |
| [paraphrase] | Secondary source's restatement | Substance only, with care |
| [recall] | My working memory of the guideline; no source this session | No. Treated as a question for the person read |

</div>


Rule carried from L6 section 0: every risk below is provisional, and the person read may move it **up**, never down.

Snippet sources added this session (search only, no page fetched): 2.5.16 wording change (July 2026 adds App Clips) [iClarified 2026-07-04](https://www.iclarified.com/77531/apple-updates-app-store-review-guidelines-allows-streaming-games-if-each-title-is-submitted-for-review); 2.5.4 [conductatlas](https://conductatlas.com/platform/apple/apple-app-store-review-guidelines/provision/CA-P-018863/multitasking-background-services-limited-to-intended-purposes/) and [forum 726366](https://developer.apple.com/forums/thread/726366); 3.1.1 restore [forum 112115](https://developer.apple.com/forums/thread/112115), [forum 800637](https://developer.apple.com/forums/thread/800637); 5.1.1(ii) purpose strings, Apple's App Review Help page (title and text in snippet only) [5-1-1-purpose-strings](https://developer.apple.com/help/app-review/guideline-reference/5-1-1-purpose-strings); 5.1.5 [BetaNews 2018](https://betanews.com/2018/05/09/apple-location-sharing-apps) and [forum 112545](https://developer.apple.com/forums/thread/112545); 2.3.1 notes for review [forum 72176](https://developer.apple.com/forums/thread/72176); 2.1 demo info [RevenueCat](https://revenuecat.com/blog/growth/the-ultimate-guide-to-app-store-rejections/); notes field limit "4000 bytes" [newly.app](https://newly.app/how-to/app-store-review-notes) and [applaunchflow](https://www.applaunchflow.com/blog/app-store-metadata-character-limits-2026); 2025 age-rating questionnaire [iphoneincanada](https://www.iphoneincanada.ca/2025/07/25/updated-app-store-age-ratings), [appdevelopermagazine](https://appdevelopermagazine.com/apple-age-rating-update/).

## 1. Guideline text the matrix uses

L6 section 1 carries 2.5.2, 2.5.1, 2.5.19, DPLA 3.3.1(B), 4.7-4.7.5, 1.2, 1.2.1(a), 3.1.1, 4.2, 4.3(b) and 5.2.1-5.2.3, each with its tag. Not repeated here. The rows L6 did not carry:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 1. Guideline text the matrix uses, scrolls sideways" style="--tw:874px" markdown="1">

| Guideline | Text this matrix leans on | Tag |
|---|---|---|
| 2.1 App Completeness | Submit a final, tested build; "Include demo account info, and turn on your back-end service, if your app includes a login." Third-party lists name in-app purchases the reviewer can't find as a common 2.1 failure. | [snippet] (login sentence); [paraphrase] (IAP visibility) |
| 2.3 / 2.3.1 Accurate metadata | Hidden, dormant or undocumented features are barred (now also 2.5.19); new features must be described "specifically" in Notes for Review; generic notes are rejected. | [snippet] (forum 72176 and news copies) |
| 2.3.7 Metadata names, keywords | No competitor or other apps' names, no trademarked terms used without right, in name, subtitle or keywords. | [recall] (search found no 2.3.7 text) |
| 2.5.4 Background services | "Multitasking apps may only use background services for their intended purposes". DTS engineers on the forum: a background capability used without a related feature risks rejection. | [snippet] |
| 2.5.16 Widgets and extensions | "Widgets, extensions, and notifications should be related to the content and functionality of your app"; July 2026 wording adds App Clips. | [snippet] (older and current wording both via secondary copies) |
| 3.1.1 restore | "you should make sure you have a restore mechanism for any restorable in-app purchases"; rejections ask for a user-tapped Restore button (restore on launch alone failed). | [snippet] (forum quotes of older text) |
| 5.1.1(i) privacy policy | A privacy policy link in App Store Connect and inside the app. | [recall] |
| 5.1.1(ii) purpose strings | "Ensure your purpose strings clearly and completely describe your use of the data"; "To use location." given as a failing example. | [snippet] of Apple's App Review Help page (not fetched) |
| 5.1.1(iv) | The app must still work, or degrade gracefully, when a permission is refused; no nudging to grant. | [recall] |
| 5.1.5 Location | Use Location Services "only when it is directly relevant to the features and services provided by the app"; rejections where the app was "not functional when Location Services are disabled". | [snippet] (2018 copy; current wording unread) |
| 2.5.11 SiriKit / Shortcuts | Register only intents the app can handle; no misleading phrases. | [recall] |
| 4.1 Copycats | Don't copy another app's UI or name. Bears on the Pythonista-compatibility layer (1.1, L15), not v1. | [recall] |
| Notes field size | "4000 bytes" per one guide that reads Apple's help page; everyone else says 4,000 characters. Our draft is plain ASCII, so the two agree. | [snippet] |

</div>


## 2. The matrix: every v1 feature (ADR-001 3.1, as revised)

Risk: Low = precedent and clear text; Medium = precedent but text tight, silent or unread; High = text bars it without permission. "Evidence" names the precedent or our own measurement. "Status" is the source tag of the rule the row rests on.

### C1 Python runtime


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: C1 Python runtime, scrolls sideways" data-n="1" style="--tw:1923px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation (what must be true at submission) |
|---|---|---|---|---|---|---|
| 1 | Embedded CPython 3.15.1 and standard library, upstream iOS XCframework, pinned with checksum | 2.5.2 ("self-contained"), DPLA 3.3.1(B), 2.5.1 | 2.5.2 [G2a-held]+[snippet]; 3.3.1(B) [paraphrase]; 2.5.1 [recall] | Pythonista, Pyto, a-Shell, Juno, Carnets ship an interpreter (L6 s3, L7). Interpreter is in the reviewed binary. | Low | Interpreter and stdlib inside the signed bundle; nothing fetched at runtime (fetch_python.sh runs at build time only). |
| 2 | **Bundle strip** (L12 s12 item 1): `_ctypes`, `ctypes`, `_ctypes_test`, `_test*`, `_xxtestfuzz`, `xx*`, `_remote_debugging` removed | 2.5.1, 2.3.1 (notes must be true), 2.5.19 | 2.5.1 [recall]; 2.3.1 [snippet]; 2.5.19 [snippet] | L12 s0: upstream `lib-dynload` ships 70 extension modules including `_ctypes` [build]. With `_ctypes` present, user code can call the Objective-C runtime and private API past the Swift bridge. L12 s0 item 3 [measured, n=1, macOS 3.9.6]: hiding a module from `import` is not removing it. | **High until the strip lands; Low after** | Board line "[ios] Idris, P1, v1 bundle strip" must be done, with its build-phase denylist check and the L12 escape tests green, **before** the notes say "no ctypes or Objective-C bridge". If the strip slips, the sentence comes out of the notes; it is never sent false. Idris's L12 Q2 (iOS loader behaves like the macOS test; matplotlib needs no `_ctypes`) is owed. |
| 3 | Bundled pure-Python packages (requests and its deps, jedi, pyflakes) | 2.5.2, 3.3.1(B), 5.2.1 (licences) | [G2a-held]/[snippet]; 5.2.1 [recall] | Shipped in the binary, so not downloaded. Licences logged (ide-tooling.md; Acknowledgements screen line on the board). | Low | List them in the notes; Acknowledgements screen present (board line, Day 16). |
| 4 | Native packages numpy, Pillow, matplotlib (Agg), built here as cp315 wheels, only if the Day 10 gate passes | 2.5.2 ("self-contained"), 2.5.1 | [G2a-held]/[snippet]; 2.5.1 [recall] | L13 s1-s3: PEP 730 places binary modules as signed frameworks. Pyto shipped numpy and matplotlib (paid tier). | Low | Signed frameworks in the bundle; strip check (row 2) re-run on them; named in notes only if they ship. |
| 5 | Swift-Python bridge: run file or string, stdout/stderr, `input()`, stop, restart, tracebacks | 2.5.2 | as row 1 | Same as every Python IDE precedent. | Low | None beyond row 1. |

</div>


### C5 Python IDE, core


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: C5 Python IDE, core, scrolls sideways" data-n="1" style="--tw:1513px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 6 | Projects in the app container and a user-chosen Files or iCloud Drive folder (open in place); import and export `.py` and zip | 2.5.2, 3.3.1(B) | [G2a-held]/[snippet]/[paraphrase] | The user brings the file in, so the app downloads nothing (L6 s4 option e). Every general-code rival works this way (L6 s2). | Low-Medium | No "import from URL", no URL-scheme parameter that fetches code, no in-app browsing of anyone's code. Imported zips run only as Python source (a `.so` in a zip can't load: unsigned). Code from a file is shown in the editor before it runs. |
| 7 | Editor: highlighting, themes, iPhone key row, find/replace, line numbers, go-to-line, iPad keyboard shortcuts (Runestone, MIT, per ADR-004) | 4.2, 5.2.1 (licence) | 4.2 [recall]; 5.2.1 [recall] | A full editor is well clear of minimum functionality. | Low | Runestone and Tree-sitter licences on the Acknowledgements screen. |
| 8 | Completion (jedi, in-process InterpreterEnvironment) and inline pyflakes errors | 2.5.2 | as row 1 | Odalys, ide-tooling.md: jedi's default environment spawns a process; in-process mode is the go. Nothing downloaded. | Low | jedi must not try to spawn (2.5.x: `subprocess` raises on iOS anyway, PEP 730). |
| 9 | Run console: `input()`, stop, restart, script arguments, run log, table output | 2.5.2 | as row 1 | Precedent. | Low | None. |
| 10 | Native UI from scripts: alerts, prompts, forms, lists, pickers, HUD | 2.5.1, 4.2 | [recall] | Juno and Pythonista ship native pickers and alerts (L7). | Low | Built on public UIKit/SwiftUI only. |
| 11 | Built-in docs, 10 example scripts, first-run tour | 2.5.2, 2.1 | [snippet]/[recall] | In the binary. Examples are our own (board line: nothing copied). | Low | Docs bundled, not loaded from a server of ours (also privacy-label condition 7). The reviewer's demo path starts here (notes). |
| 12 | iPhone and iPad universal; iPad sidebar and split; Dynamic Type, VoiceOver | 2.1, 2.4.1 (iPad) | [recall] | PROPOSAL-002 s2, s7. | Low | Reviewers test on iPad when the app claims it [recall]: run the demo path on an iPad Simulator before submission. |

</div>


### C2 device modules (Python reaches iOS only through our Swift bridge)


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: C2 device modules (Python reaches iOS only through our Swift bridge), scrolls sideways" data-n="1" style="--tw:1916px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 13 | clipboard | 5.1.1 | [recall] | Pasteboard read shows the system paste prompt (C2-device-api.md [M], unread). | Low | Read only when the user's script asks; no reading at launch. |
| 14 | files | 2.5.2 (container), 5.1.1 | [snippet]/[recall] | Container plus security-scoped user folders. | Low | No access outside the container except folders the user picked. |
| 15 | notifications (local only) | 4.5.4, 5.1.1 | [recall] | No push, no server. | Low | Permission at first use from a user's script, not at launch. |
| 16 | http (standard library and requests): the user's own code makes network requests | 2.5.2, 3.3.1(B), 5.1.1, 5.1.2 | [G2a-held]/[snippet]/[recall] | privacy-label.md s3: requests to hosts the user chose are not our collection [S1, press quote of Apple's 2021 definition]. **Residual:** user code can fetch a `.py` and `exec` it. That is the user's own act, as in Pythonista and Pyto; no API of ours fetches and runs code. | Medium (the 2026 enforcement climate, L6 s7) | Notes say plainly that user code may make network requests the user writes, and that the app never fetches code of its own. No "run from URL" helper in our modules. NSLocalNetworkUsageDescription purpose string (C2 board line). |
| 17 | location (When In Use) | 5.1.1(ii), 5.1.5, 5.1.1(iv) | 5.1.1(ii) [snippet]; 5.1.5 [snippet]; (iv) [recall] | C2-device-api.md s1.4 drafts. Forum rejections (5.1.5) where the app failed with location off. | Low-Medium | Purpose string names the use concretely ("Lets your scripts and the Distance widget read where you are when you run them"), not "To use location". The app is fully usable with location refused; the distance premade shows a clear "location off" state. No Always prompt in v1 (ADR-001 Revised). |
| 18 | motion history (CMPedometer steps, floors, distance) | 5.1.1(ii), 5.1.1(iv), 5.1.3 (health) | (ii) [snippet]; others [recall] | Steps are motion data, not HealthKit; 5.1.3 is about HealthKit/health research [recall]. | Low-Medium | NSMotionUsageDescription concrete; the steps premade degrades when refused. No HealthKit in v1 (ADR-001 3.1). |
| 19 | keychain (the user's own secrets) | 5.1.1 | [recall] | L12 s5.3: ThisDeviceOnly, per-script names, console redaction. | Low | None for review; it is the user's data on the device. |

</div>


### C7 Shortcuts


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: C7 Shortcuts, scrolls sideways" data-n="1" style="--tw:1702px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 20 | App Intents: Run Script, Run Script with Input (returns output), Refresh Widgets; AppShortcutsProvider | 2.5.11, 2.5.2 | [recall]; 2.5.2 as row 1 | Pythonista, Pyto, Scriptable, Juno ship Shortcuts actions (L6 s3, L7). | Low; **Medium if an intent accepts code text** | The intents name a script **from the user's library**; the "Input" is data, never source to execute. A "run this code string" intent would let a Shortcut pass in code from anywhere: leave it out of v1. L9 s2 answers it (`ScriptEntity`, input as data); row 38 carries the rule and its tests. |
| 21 | Control Center "Run Script" control (PROPOSAL-002 s2: stretch, Day 12, else 1.1) | 2.5.16, 2.5.19 | 2.5.16 [snippet]; 2.5.19 [snippet] | Runs the same intent as row 20. | Low | If it misses Day 12 it is compiled out, not hidden (2.5.19). Notes mention it only if it ships. |

</div>


### C4 widget engine (behind the Day 14 cut line, ADR-001 3.3)


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: C4 widget engine (behind the Day 14 cut line, ADR-001 3.3), scrolls sideways" data-n="1" style="--tw:1529px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 22 | Python view DSL, versioned JSON view tree, one SwiftUI renderer in the widget extension; families small/medium/large, accessory circular/rectangular/inline, systemExtraLarge on iPad; full-color, accented, vibrant | 2.5.2, 2.5.16 | 2.5.2 [G2a-held]/[snippet]; 2.5.16 [snippet] | The extension draws data (a view tree), runs no code (ADR-001 3.1 option b). Widgets show the user's own script output, which is the app's function, so 2.5.16 is met. | Low | Renderer validates the schema, <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> sizes, allows only `pywidget://` links (L12 s12 item 5). |
| 23 | Widget runs happen in the main app (foreground, background refresh, Refresh Widgets intent) | 2.5.4 | [snippet] | DTS: background capability without a related feature risks rejection. Ours has one (refreshing widgets). | Low-Medium | Declare only the background mode we use (BGAppRefresh / background fetch); no audio or location background modes as a keep-alive. Notes say why the app refreshes in the background. |
| 24 | Widget debugging (PROPOSAL-002 s5): Activity screen, "Run as widget", four error states, export by share sheet only (proposed, plan line on the board) | 5.1.1, 2.5.19 | [recall]; 2.5.19 [snippet] | Logs stay in the App Group, 14 days, never sent. Share sheet is the system's, user-tapped. | Low | None; mention "Activity" in the demo path if it ships. |

</div>


### C11 premade library (12, in the binary; PROPOSAL-002: 3 free, 9 Pro, pending the Investors)


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: C11 premade library (12, in the binary; PROPOSAL-002: 3 free, 9 Pro, pending…, scrolls sideways" data-n="1" style="--tw:1478px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 25 | 12 first-party widgets in our DSL, source viewable and editable | 2.5.2, 2.5.19, 2.3.1 | [G2a-held]/[snippet] | Compiled into the binary and reviewed: features of the app (L6 s3). New premades come only in app updates. | Low | No premade downloaded later. Locked Pro premades are visible (live preview) and named in the store text (PROPOSAL-002 s6), so nothing is hidden. |
| 26 | Time and countdowns, world clocks, day progress, habit tracker, battery and storage, Shortcuts launcher | 5.1.1 (required-reason APIs) | [recall] | Disk space and boot time are required-reason APIs (privacy-label.md s4). | Low | Privacy manifest entries (board line, Idris P2). |
| 27 | Sunrise and sunset (local computation, H249 engine) | none special | n/a | L16: computed on the device, no outside source. | Low | Location fallback: a city the user types. |
| 28 | Steps and floors; distance to a saved place; altitude | 5.1.1(ii), 5.1.5 | [snippet] | Rows 17-18. Under When In Use a widget gets a fix only if one was seen in the last few minutes (ADR-001 Revised, CORRECTIONS). | Low-Medium | Widget shows `sampled_at`; refused permission shows a plain state, not a broken card. |
| 29 | Quote of the day from a bundled public-domain list | 5.2.1 | [recall] | L16: bundled, public domain by rule. | Low | Source list and licence note kept (L16). |
| 30 | GitHub repository status (GitHub REST API, optional user token in the Keychain) | 5.2.2, 5.2.1, 5.1.1 | [recall] | L16: GitHub terms read through terms_guard, commercial use allowed. privacy-label.md condition 4: token and IP go to GitHub, never to us; a reviewer could still see a first-party feature calling a named outside service differently (low-medium, on the person-read list). | Low-Medium | Works unauthenticated (public repos); token optional; GitHub name used only to describe the data source, no GitHub logo (5.2.1). Notes say no GitHub account is needed for review. |
| 31 | Weather: an example recipe (the user's own Shortcut with Apple Weather feeding Run Script with Input), not a premade | 5.2.2, 2.3.1 | [recall] | ADR-001 Revised, L16. | Low | Store text must not promise a weather widget; call it a recipe. |

</div>


### C12 billing


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: C12 billing, scrolls sideways" data-n="1" style="--tw:1839px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 32 | "Pro", one StoreKit 2 non-consumable; contents fixed by build setting, never a remote switch | 3.1.1, 2.1, 2.3.1, 2.5.19 | 3.1.1 [snippet]; 2.1 [snippet]/[paraphrase]; 2.5.19 [snippet] | No server, no licence keys (3.1.1 bars own unlock mechanisms [snippet, L6]). | Low-Medium (until App Store Connect exists, the product can't be reviewed at all) | A user-tapped **Restore Purchases** button (not restore-on-launch only). The IAP is submitted with the build and is reachable from a named screen in the notes. Pro contents in the store text match the build. Needs the membership (Day 7) and the Paid Apps Agreement (Day 12) per the 2026-10-22 amendment. Price and contents are the Investors' (PROPOSAL-001). |

</div>


### C13 design system and store presence


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: C13 design system and store presence, scrolls sideways" data-n="1" style="--tw:1645px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 33 | Themes, icon, screenshots (all code-drawn, Commandment 9) | 2.3.3 (screenshots show the app in use), 4.1 | [recall] | Maren's v0 (c1edf839). | Low | Screenshots taken from the real app in the Simulator, not mockups. |
| 34 | App name, subtitle, keywords ("Python" as a word) | 2.3.7, 5.2.1 | [recall] | names.md: PSF trademark policy (python.org/psf/trademarks, read 2026-10-25) refuses "Python IDE" as a product name; nominative subtitle use allowed. | Medium until the name is chosen | No competitor names (Pythonista, Pyto, Scriptable, Juno) in name, subtitle or keywords. "Python" only nominatively in the subtitle or description. Name is the Investors' call. |

</div>


### Privacy and release discipline


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: Privacy and release discipline, scrolls sideways" data-n="1" style="--tw:1802px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 35 | No account, no server, no analytics, no tracking; label "Data Not Collected"; privacy manifest | 5.1.1, 5.1.1(i), 5.1.2 | [recall]; "collect" definition [snippet of a 2021 press quote, privacy-label.md S1] | privacy-label.md: 8 build conditions. | Low if the conditions hold | No SDK at all; privacy policy URL in App Store Connect and in Settings (5.1.1(i) [recall]); PrivacyInfo.xcprivacy with required-reason codes (person read owed). |
| 36 | Unreleased capabilities (online pip, marketplace, sync, iMessage) **compiled out** of release builds | 2.5.19, 2.3.1, 2.5.2 | [snippet] | ADR-001 Revised; L13 s4 verdict; L10 s4. | Low if compiled out; **High if any sits behind a flag** | A release-build check that the debug-only targets are absent (Idris/Odalys). The notes say there are no hidden, dormant or server-enabled features, which must be literally true. |

</div>


### Rows added for ADR-006 (2026-10-25 20:01)


<div class="tbl" role="region" tabindex="0" aria-label="Table 12: Rows added for ADR-006 (2026-10-25 20:01), scrolls sideways" data-n="1" style="--tw:1909px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 37 | **Install from file** (ADR-006 s3 item 2; v1 stretch, Odalys's board line, due Day 13, 2026-11-03): the user picks a `py3-none-any` or `py2.py3-none-any` wheel, or a pure-Python zip, from Files or iCloud Drive; the installer refuses any archive with `.so`, `.dylib`, `.dll`, Mach-O magic or a platform tag; files land in a user site-packages folder after the bundled set (bundled wins); no network | 2.5.2, DPLA 3.3.1(B), 2.5.19, 2.3.1 | 2.5.2 [G2a-held]+[snippet]; 3.3.1(B) [paraphrase]; 2.5.19 [snippet]; 2.3.1 [snippet] | The guideline text the rating rests on: 2.5.2, apps "may not download, install, or execute code which introduces or changes features or functionality of the app" [G2a-held, L6 s1]. The app downloads nothing: the user brings the file, which is row 6's case (L6 s4 option e; L13 s4 rates it Low). What it installs changes what the user's own scripts can import, not what the app does. DPLA 3.3.1(B) speaks to downloaded code and storefronts [paraphrase]; there is neither. Precedent: Pyto and a-Shell are said to ship pure-Python pip (L13 s4, unverified; store pages barred, #53); I found no precedent read for a file-only installer, n = 0. Residual: the word "install" sits in 2.5.2's text and would sit in our UI, and the 2026 climate is stricter for code-running apps (L6 s7). | **Low-Medium. Stays in v1** if it lands by Day 13 with host tests (ADR-006 s3 item 2 (a) and (b)). One step above Low for the residual named in Evidence. If the person read (G2) raises it to Medium, it moves to 1.1 with no further ruling. | (1) No network anywhere in the installer: no index lookup, no URL field, no dependency fetch; a wheel with missing dependencies gets a plain message naming them, never a download. (2) Refuse or drop `.pyc` files and `__pycache__` folders in the archive, so every executable file installed is readable source that opens in the editor (2.5.2's "completely viewable and editable" wording [snippet]). (3) Add the folder to `sys.path` directly, not as a site directory (`site.addsitedir`), so no `.pth` line runs code at every launch from a file the user never opened (a hidden code path, 2.5.19). (4) A wheel that imports `ctypes` must fail with ImportError after G1; the installer never adds an extension module. (5) The notes name it in one sentence (G10 bracket); if it slips, the "No package installer" sentence stays instead. (6) G8 confirms the online-pip target is absent from the same build. Items (1)-(4) are for Odalys's tests. |
| 38 | **Inputs from outside a user's tap are never code**: Shortcuts intent parameters (L9 s2: Run Script, Run Script with Input, Set Widget Data), `pywidget://` links, x-callback URLs | 2.5.2, DPLA 3.3.1(B), 2.5.11, 4.7.2 | 2.5.2 [G2a-held]+[snippet]; 3.3.1(B) [paraphrase]; 2.5.11 [recall]; 4.7.2 [snippet] | My 19:57 note in row 20, carried as its own row so it gets a test. L9 s2 types the script as `ScriptEntity` (a stable id in the user's library) and passes arguments, text and files to that script; L9's test (4) refuses an inbound x-callback URL carrying code. An intent or link that took code text would let any Shortcut, or a Shortcut file someone shared, run code the user never opened: downloaded code by another door. | Low while the rule holds; **High if any input is executed as source** | Rule: no intent parameter, URL query or widget link is ever compiled, `exec`'d or saved as a script by the app; the app runs only a script already in the user's library. Inputs arrive as `sys.argv`, `shortcuts.input()` text or files in the script's temp folder; what the user's own script does with them is the user's code (row 16). Tests (Idris, with L9's list): (a) no App Intent parameter takes or is described as code; (b) L9 test (4), the x-callback refusal; (c) a `pywidget://` link with a code-like query runs nothing and creates no file. Notes sentence: "They run a script from the user's library; the input is data passed to that script, not code." |

</div>


## 2a. The S0 claims, each mapped to the notes sentence that states it (ADR-006 s2)

ADR-006 makes the notes themselves the S0 gate. Each claim below has one sentence in review-notes-draft.md that states it, one thing in the build that makes it true, and the gate that proves it. A claim whose gate fails loses its sentence or stops the submission; it is never softened.


<div class="tbl" role="region" tabindex="0" aria-label="Table 13: 2a. The S0 claims, each mapped to the notes sentence that states it (ADR-006 s2), scrolls sideways" style="--tw:1364px" markdown="1">

| S0 claim | The sentence in the notes (quoted from the draft) | Made true by | Gate | If the gate fails |
|---|---|---|---|---|
| A. No gallery, store or feed of anyone else's code in the app | HOW CODE RUNS: "There is no store, sharing or import-from-URL of other people's code; the only in-app gallery shows our own premade widgets, compiled into this build." Backed by: "The app does not download, install or execute code from our servers or from other users." | No marketplace target in the release build (row 36); no import-from-URL (row 6); no input is ever code (row 38) | G8 | Do not submit. This sentence is the S0 gate itself |
| B. The 12 first-party premades are compiled into the binary (the "Official" <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>) | HOW CODE RUNS: "(2) the example scripts and premade widgets compiled into this build"; the gallery clause in A; WIDGETS: "Twelve premade widgets ship in the build." | Premades in the bundle, none fetched later (row 25) | G5 | If widgets are cut, every premade mention goes with them: the WIDGETS section, the words "and premade widgets" in (2) and in "including our examples and premade widgets", and the gallery clause in A (the A sentence then ends at "other people's code.") |
| C. Marketplace code paths compiled out of release builds, never dormant behind a flag | NO HIDDEN FEATURES: "There are no hidden, dormant or server-enabled features." and "the build contains no code paths for features that are not described here." | The release-build check that the marketplace, online-pip, sync and iMessage targets are absent (row 36) | G8 | Do not submit |
| D. Online pip compiled out | RUNTIME, one of two: "[G10 not shipped] No package installer is included in this version." or "[G10 shipped] Packages can be added only from a pure-Python wheel or zip the user picks in Files. Native code is refused, files stay viewable source, and there is no online installer." Plus the C sentences | Row 36 check; row 37 mitigations (1) and (6) | G8, G10 | G8 fails: do not submit. G10 fails: the "No package installer" sentence stays |
| E. No ctypes after the strip | RUNTIME: "[G1: Python reaches iOS features only through a fixed set of Swift functions we wrote on public APIs. The ctypes module and the Objective-C runtime bridge are removed from the build, so scripts cannot call native APIs directly.]" | Idris's bundle strip, its denylist build check, the L12 escape tests (row 2) | G1 | Delete both G1 sentences |
| F. Projects and widgets export as readable `.py` or zip (ADR-001 3.1 C5) | None, on purpose. Export is the user sending their own work out through the system share sheet; it is visible in the UI and claims nothing about code coming in. Costs about 80 characters if Ines wants it named | Share sheet only (row 24) | none | n/a |

</div>



## 2b. Not in v1, and why the notes must not mention them (2.3.1: notes match the build)

- **Share extension "Run Python on this"**: ADR-001 3.2 moves it to 1.1. L6's draft notes (section 5) still named it; the new draft drops it.
- ~~"Install from file" for pure-Python packages~~: answered by ADR-006 s3 item 2 (Ines, 19:57), which supersedes ADR-001 3.2's "1.2". It is now a v1 stretch: row 37, Low-Medium, in v1 if it lands by Day 13; the notes carry it only through the G10 bracket.
- **Online pip from PyPI**: 1.1 at the earliest (ADR-006 s3 item 3), compiled out (row 36). The notes say there is no online installer.
- Debugger, formatter, HealthKit and the other modules, interactive widgets, Builder, web IDE, marketplace, Shortcut Lab, iMessage, compatibility modules: ADR-001 3.2.

## 2c. Submission items that are not guideline rows (person or Investor)

- **Age rating questionnaire** (2025 scale, 13+/16+/18+): it asks about unrestricted web access. Sources disagree on whether an in-app browser lands at 16+ or 18+ [snippet]. We have no browser, but user code can fetch any URL. How Pythonista, Pyto and Juno answered is unread (store pages barred, #53). Owed: a person's read of the questionnaire text.
- **Export compliance**: CPython bundles its own OpenSSL (`_ssl`) rather than only the OS's TLS. The answer to the encryption question needs a person's read [recall: standard algorithms are usually exempt, but the form must be answered truthfully].
- **Contacting App Review, submitting, and replying to a rejection** are human checkpoints (L6 s5).

## 3. The L12 bundle-strip caveat and L12 Q4 (folded in from board line "[research] Wrenna, P2, L6 review note")

**(a) "No raw Objective-C or ctypes bridge" is true only after the strip.** Answered: matrix row 2. The sentence appears in the draft notes in brackets with a gate: it is pasted only when the Idris strip line is done, its denylist build check passes, and the L12 escape tests (`import ctypes` raises ImportError; no `_ctypes*` file in the built bundle; no `_test*` importable) are green on the release build. If any fails, the sentence is deleted, not softened. The same gate covers the "Python reaches iOS only through our Swift functions" sentence, which is just as false with `_ctypes` present.

**(b) L12 Q4, part 1: is a Builder document "downloaded code" under 2.5.2 and DPLA 3.3.1(B)?** Not a v1 question (Builder is 1.2, the marketplace Phase 4), so this is a reading for later, and it stays **open**.
- My reading: a document of blocks drawn from our fixed block set, compiled on the device into Python by our compiler, is closer to data than to code. The nearest precedent is Widgy's Explore shelf of user-made JSON layouts shared in the app (L6 s2, from listing text via search). It does not "introduce or change features or functionality of the app" (2.5.2 [G2a-held]), because every possible behaviour is already in the reviewed binary.
- Why it is not settled: (1) the compiler's output *is* Python that runs, and a reviewer may look at the output, not the input; (2) 3.3.1(B) speaks of a "store or storefront for other code or apps" [paraphrase], and a gallery of documents that compile to code may read as one; (3) 4.7 lists the software kinds it allows, and "Builder documents" are not among them [snippet]; (4) no rival precedent ships user-made documents that compile to a general-purpose language. Risk for the Phase 4 marketplace: Medium, below Python items (High) but not Low.
- What would settle it: the person read of 2.5.2, 3.3.1(B) and 4.7, and, if the Investors choose, the question put to Apple with the 4.7.2 ask (L6 s4 option d, a human checkpoint).

**(c) L12 Q4, part 2: Apple's definition of "collect".** Answered as far as the ruling allows, in privacy-label.md section 1 and section 3 [S1]: collect means transmitting data off the device so that "you and/or your third-party partners" can access it for longer than it takes to service the request. Source: a 2021 press quote of Apple's App Privacy Details page, not Apple's page (G2a). Consequence for v1: requests the user's own code sends to hosts the user picked are not our collection. Still **open**: the current wording and any text on user-written code. That is the [needs-person] #59 follow-up line. L12 s11's "Not a CORRECTIONS row until Wrenna reads Apple's page" still holds: no correction is filed, because the read is still a press quote.

## 4. Gates before the notes are pasted (in order)


<div class="tbl" role="region" tabindex="0" aria-label="Table 14: 4. Gates before the notes are pasted (in order), scrolls sideways" style="--tw:881px" markdown="1">

| Gate | Owner | Changes in the notes if it fails |
|---|---|---|
| G1 Bundle strip done, denylist check and escape tests green (row 2) | Idris | Delete the ctypes sentence and the "only through our Swift functions" sentence |
| G2 Person's browser read of the guidelines (#59 line) | Operator / Investors | Re-rate rows; a rating may only rise |
| G3 Day 10 native packages gate (row 4) | Idris/Odalys | Drop numpy/Pillow/matplotlib from the package list |
| G4 Day 12 Control Center stretch (row 21) | Idris | Drop the control sentence |
| G5 Day 14 widget cut line (ADR-001 3.3) | Ines | Drop the widgets paragraph; Pro contents change (PROPOSAL-001) |
| G6 Pro contents and price answered (PROPOSAL-001/002) | Investors | Fill the Pro paragraph |
| G7 App Store Connect product exists (needs membership Day 7, Paid Apps Agreement Day 12) | Investors | No Pro review possible; submit without IAP or wait |
| G8 Release-build check that unreleased targets are absent (row 36) | Idris/Odalys | Do not submit |
| G9 Purpose strings final and concrete (rows 15-18) | Maren copy, Idris | Fix before submitting (5.1.1(ii)) |
| G10 Install from file landed by Day 13 with host tests green, and row 37 still Low-Medium or lower after G2 (ADR-006 s3 item 2) | Odalys (tests), Wrenna (rating) | Keep "No package installer is included in this version." and delete the install sentence |

</div>


## 5. What changed from L6

- L6 s3 listed the share extension as "Ship"; ADR-001 3.2 moved it to 1.1. Removed from the notes.
- L6 s3 said "25+" premades; ADR-001 3.1 says 12. The matrix uses 12.
- L6 s5's "There is no raw Objective-C or ctypes bridge" was unconditional; it is now gated (section 3a).
- 2026-10-25 20:01, for ADR-006: row 37 Install from file (Low-Medium, v1 stretch); row 38 inputs are never code (from my row-20 note); section 2a maps S0 claims A-F to notes sentences; gate G10; the widget-cut gate (G5) now also strips the premade mentions in HOW CODE RUNS (claim B). The "For Ines" question on Install from file is closed by ADR-006.
- New rows L6 did not carry: 2.5.4 background refresh, 2.5.16, 3.1.1 restore, 5.1.1(ii) purpose strings, 5.1.5, 2.3.7 naming, age rating, export compliance, intent input as data only.

Web text was used as information only. No instruction was found in it and none was followed. No page on developer.apple.com, apps.apple.com or www.apple.com was fetched; every Apple text above came through search snippets, earlier company files, or my recall, as tagged.
{% endraw %}

</div>
