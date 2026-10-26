---
layout: "default"
title: "pywidget v1: App Review notes, draft"
section: "documents"
description: "[App Name] is a Python development environment for iPhone and iPad. Users write and run their own Python scripts, and a script can draw a home screen or Lock Screen widget."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/pywidget/review-notes-draft.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/release/review-notes-draft.md</code></span></div><h1>pywidget v1: App Review notes, draft</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-10-25, started 19:57 ET; revised 20:01 ET for ADR-006 (<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G10</span> package sentence; G5 now strips every premade mention). Draft, not approved. Pasting it into App Store Connect, submitting, and any reply to App Review are human checkpoints. Matrix and sources: app-review-matrix.md (same folder). Every guideline reading behind this text is provisional until a person reads Apple's page (matrix section 0).

## How to use this draft

- The notes field <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> 4,000 (one guide says 4,000 bytes; matrix section 1). The text between the markers below is plain ASCII, so characters and bytes are the same. Count it with the command at the end before pasting.
- Square brackets are filled at submission. A bracketed sentence with a gate (G1-G9, matrix section 4) is **deleted** if its gate fails, never softened or kept "for now". The notes must match the build exactly (2.3.1, 2.5.19).
- Use the App Store name the Investors choose in place of [App Name].

## Notes text


[App Name] is a Python development environment for iPhone and iPad. Users write and run their own Python scripts, and a script can draw a home screen or Lock Screen widget.

HOW CODE RUNS
The app runs code from only two sources: (1) Python the user types, pastes, or opens from their own files (app storage, or a Files/iCloud Drive folder they pick), and (2) the example scripts and premade widgets compiled into this build. The app does not download, install or execute code from our servers or from other users. There is no store, sharing or import-from-URL of other people's code; the only in-app gallery shows our own premade widgets, compiled into this build. All source, including our examples and premade widgets, is fully viewable and editable by the user before it runs. A user's own script may make network requests the user writes (standard library or requests); the app itself never fetches code.

RUNTIME
CPython [3.15.1] and its standard library are bundled in the app. Bundled packages: [requests, jedi, pyflakes][, numpy, Pillow, matplotlib - G3]. Native modules are signed frameworks inside the bundle. [G10 not shipped: No package installer is included in this version.][G10 shipped: Packages can be added only from a pure-Python wheel or zip the user picks in Files. Native code is refused, files stay viewable source, and there is no online installer.]
[G1: Python reaches iOS features only through a fixed set of Swift functions we wrote on public APIs. The ctypes module and the Objective-C runtime bridge are removed from the build, so scripts cannot call native APIs directly.]

DEVICE FEATURES
Scripts can use: clipboard, files, local notifications, location (When In Use only), motion history (steps, floors, distance), and the Keychain for the user's own secrets. Each permission is asked the first time a user's script needs it, with a purpose string, and the app stays fully usable if it is refused. There is no HealthKit, contacts, photos or calendar access.

WIDGETS [G5: delete this section if widgets are cut]
A script can describe a widget with our Python view library. Python runs in the main app (in the foreground, in background app refresh, or from the Refresh Widgets Shortcuts action) and saves the result; the widget extension only draws it and runs no code. Background refresh is used only to update the user's widgets. Twelve premade widgets ship in the build. The GitHub status widget calls GitHub's public API from the device; it works without an account, and an optional personal token stays in the Keychain.

SHORTCUTS
App Intents: Run Script, Run Script with Input, Refresh Widgets. They run a script from the user's library; the input is data passed to that script, not code. [G4: A Control Center control runs Run Script.]

IN-APP PURCHASE
One non-consumable, "[Pro name]", unlocks [contents - G6]. Settings > [Pro] shows it and has a Restore Purchases button. The free app is complete for writing and running your own Python.

PRIVACY
No account, no sign-in, no server, no analytics, no tracking. Scripts, widgets and logs stay on the device and in folders the user chooses.

NO HIDDEN FEATURES
There are no hidden, dormant or server-enabled features. Everything in the app is reachable from the screens listed below, and the build contains no code paths for features that are not described here.

DEMO (no account needed)
1. Open the app. Examples > [Tip Splitter] > Run. It asks two questions with input() and prints the result.
2. Projects > + > New Script. Type print("hello") and tap Run.
3. [Examples > Steps Today > Run. Allow Motion when asked.]
4. [Long-press the home screen > + > [App Name] > add the [Sunrise] widget. Open Widgets in the app to see its Python source.]
5. Settings > [Pro] to see and test the purchase.


## Gates the bracketed text depends on


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Gates the bracketed text depends on, scrolls sideways" style="--tw:640px" markdown="1">

| Bracket | Gate (matrix section 4) |
|---|---|
| ctypes and Swift-only sentences | G1 bundle strip, denylist check and L12 escape tests green on the release build |
| numpy, Pillow, matplotlib | G3 Day 10 native packages gate |
| Control Center sentence | G4 Day 12 stretch |
| WIDGETS section, demo step 4, and every premade mention in HOW CODE RUNS ("and premade widgets", "including our examples and premade widgets", the gallery clause) | G5 Day 14 cut line (matrix 2a claim B) |
| Package sentence: keep exactly one of the two G10 brackets | G10 Install from file landed by Day 13 (matrix row 37) |
| Pro name and contents | G6 Investors (PROPOSAL-001, PROPOSAL-002 s6) |
| IN-APP PURCHASE section at all | G7 App Store Connect product exists |
| "no code paths for features not described" | G8 release-build check |
| Demo step 3 wording | G9 purpose strings final |

</div>


## Count

`python3 -c "import re,sys;t=open(sys.argv[1]).read();n=re.search(r'\n(.*?)\n',t,re.S).group(1);print(len(n),'chars',len(n.encode()),'bytes')" pywidget/docs/release/review-notes-draft.md`

Count at draft time, with every bracket still in: 3,578 characters, 3,578 bytes, all ASCII (2026-10-25 19:59 ET, by the command above); 422 left for fills. Bracket fills (version, package list, Pro name and contents) must keep it under 4,000.

Recount 2026-10-25 20:01 ET after the ADR-006 revision (G10 brackets added), same command: 3,781 characters, 3,781 bytes, all ASCII, with both G10 brackets in. Only one is kept at paste: 3,713 if Install from file ships, 3,597 if not (by script, each bracket removed in turn). Worst case leaves 287 for the other fills; the Pro paragraph (G6) is the one to watch.
{% endraw %}

</div>
