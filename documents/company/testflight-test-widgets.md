---
layout: "default"
title: "Test widgets that ship only in TestFlight builds (T-5643)"
section: "documents"
description: "The Gallery (T-4183) is proved by all seven: the &quot;Test widgets&quot; section shows, previews and opens each one."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/testflight-test-widgets.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 33 · Mon Nov 23</span><span><code>ops/plans/testflight-test-widgets.md</code></span></div><h1>Test widgets that ship only in TestFlight builds (T-5643)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 12:3x AM ET 2026-11-23. From Investor an Investor, #325 c7091558334 (11:24 PM ET 11-22): "We should narrow
down a list of proof-of-<span title="One product idea inside a lane. C1 is the lane&#x27;s first idea.">concept</span> widgets to be used for testing on TestFlight ... These are distinct from pre-made
widgets that ship in the app; they only ship in the Testflight builds so investors can test all features without
needing to add many widgets to their phones ... we should be prioritizing proofs of concept rather than considering
any specific widget a finished product". The Investors' plain page is `documents/app/testflight-test-widgets.md`.

Written by Ines in one session, alone. The iOS parts are for Idris, the Python parts for Pernille and the look for
Maren: each checks and corrects its part in its own build line (section 4) before building it. Nothing here is
built yet.

## 0. In short

- Seven test widgets, each covering many features at once, so an Investor adds at most seven to a phone and tests
  every open feature.
- They ship only in the internal-only TestFlight build (the one `tools/upload.sh --internal` exports with
  `testFlightInternalTestingOnly`), never in an App Store build, an external TestFlight build or App Review.
- They are proofs of concept: one shared plain look, no polish, no Gallery card copy. A premade is a finished
  product; a test widget only has to make a pass or a fail plain to see.
- Every row on a test widget reads one of three ways: **pass** (a tick and the word), **fail** (a cross and the
  word, with what was expected), **not here** (a dash and the reason: the phone has no such sensor, or the check
  only runs in the app). A widget's top line counts them: "7 pass · 1 fail · 1 not here".
- Eight build lines: one for the TestFlight-only folder and its check, one per widget. They are written out in
  section 4, ready to add; they are not on the board yet (section 4 says why).

## 1. What a test widget is, and what it is not

1. Its file is in `pywidget/widgets/testflight/`, not in `pywidget/widgets/premade/`. It is never in the premade
   catalog, never counts as one of the 12 premades, and is never free or Pro: in the build that has it, it is free.
2. Its name starts "Test:" in the Gallery's "Test widgets" section and in the widget picker, so nobody mistakes it
   for a premade on a phone or in a screenshot.
3. It runs the same way as any widget: its Python in the widget first, in the app when it does not fit
   (T-4280, run each widget in the widget or app by size). It uses only the app's public Python (`pywidget`,
   `pywidget_ui`); a check that needs something the app does not offer yet shows "not here: not built yet" and
   names the line that builds it, never a fake pass.
4. A row is judged by the widget's own code only where code can see the answer (a permission's status, an
   import, a run time). Where only a person can judge (an animation is smooth, a button's hit area is easy to
   tap), the row says what to look for, and the plan's "Pass or fail" line says what a fail looks like.
5. It shows no personal data in a screenshot: never coordinates, never a contact, never the clipboard's text.
   Location is shown as "fix: yes, ±12 m, 3 min old"; steps as a count; the clipboard as "has text: yes".
6. Its look is one shared row style that Maren sets once (mark, name, state word; colour is never the only
   signal, so it reads in tinted and clear modes and with VoiceOver), inside the approved creative guide
   (`creative/approved.md`). No new look is approved by it.
7. Every test widget offers the Home Screen sizes it can fill and at least one Lock Screen size, so each feature is
   also seen where WidgetKit is tightest.

## 2. The list


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. The list, scrolls sideways" data-n="1" style="--tw:957px" markdown="1">

| # | Test widget | What it covers | Features it proves | Owner |
|---|---|---|---|---|
| 1 | Test: Permissions | every permission the app asks for, in each state | T-4188 | Pernille with Idris |
| 2 | Test: Taps and buttons | buttons, tap choices, refresh tap, launcher open | T-4478 buttons, T-4181, T-4185 | Idris |
| 3 | Test: Python in the widget | where Python runs, memory, time, failure, recovery, web fetch | T-4181, T-4182, T-4189, T-4280 | Pernille with Idris |
| 4 | Test: Libraries | every Python library and extension module the app ships | T-4192, T-4189 | Pernille |
| 5 | Test: Animation | the timer method and the breathing graphics, as test widgets | T-5640, T-4578, T-4579 | Idris with Maren |
| 6 | Test: Builder edge cases | the Builder's hard cases in every size and mode | T-4477, T-4191 | Idris with Pernille |
| 7 | Test: Page and project | a project's widget and its full-screen Page, prompts, Stop | T-4478, T-4476, T-4187 | Idris |

</div>


The Gallery (T-4183) is proved by all seven: the "Test widgets" section shows, previews and opens each one.

### 2.1 Test: Permissions

**What it shows.** One row per permission the app uses, with its state as iOS reports it and what the app can read
in that state. The large size shows every row; medium shows the first six; small shows the count line and the
first row that is not a pass. Tapping the widget opens the app on the same script, which asks for each permission
in turn (iOS only asks from the app: `request_permission` raises "not available here" in a widget).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2.1 Test: Permissions, scrolls sideways" style="--tw:776px" markdown="1">

| Row | States it can show | What it reads when allowed |
|---|---|---|
| Location | not asked, allowed while using, denied, restricted (Screen Time), location services off | fix yes or no, accuracy in metres, age of the fix; "precise" or "approximate" |
| Steps and motion | not asked, allowed, denied, restricted; per count "not on this device" | today's steps; which counts the phone measures (steps, distance, floors, pace, cadence) |
| Notifications | not asked, allowed, provisional (quiet), denied | pending count; a "Send test" button schedules one notification 10 s later |
| Network | online, offline, online but constrained (Low Data Mode) or expensive (cellular) | the path as iOS reports it |
| Clipboard | allowed in the app, not here in a widget | "has text: yes or no", never the text |
| Files | a saved folder bookmark readable, stale, or none saved | the bookmark reads back (T-0550) |
| Secure storage | a test value written and read back in the app's own secure storage, or not here | round trip yes or no |
| Time zone | read inside the widget | the zone name and offset, against the app's |

</div>


The app asks for nothing else, so the widget lists nothing else. Asking iOS about a permission the app does not
use (Contacts, Calendars, Photos, Health and the rest) would put that permission's code in the app, and an app
whose code names such a permission needs its purpose string at upload, while Commandment 6 has the app collect
only what the product needs. When a line adds a permission, that line adds its row here.

**Proves.** T-4188 (location, steps and notifications in scripts and widgets) and its steps: T-0053 (widget
extension location updates), T-0063 (location-off state), T-5365 (location refresh policy), T-0543 (notification
limits), T-2027 (notification test), T-4824 (motion and location probes); T-0047 (the purpose strings: each prompt
shows the approved words); T-0550 (bookmarks read back).

**Pass or fail on the phone.** For each row the Investor sets the state in Settings > PyWidget (or Settings >
Privacy & Security > Location Services off, or Airplane Mode for Network), taps the widget's refresh, and reads the
row. Pass: the row names the state they set, and in "allowed" shows a reading. Fail: the row shows a state they
did not set, shows a reading while denied, or is blank. "Not here" is a pass only with its reason (an iPad without
the step sensor says "steps: not on this device"). The test notification arrives once, about 10 s after the tap.

### 2.2 Test: Taps and buttons

**What it shows.** Medium and large: a "+1" button that runs in the widget, a toggle button, an "Open the Page"
button, and the refresh button with its age line. The whole widget's tap follows its project's When tapped setting
(open the app, open a link, run a function, or open an app from the launcher slots). Rows: the counter; the last
tap ("+1 at 12:20 AM, ran in the widget, 0.6 s"); taps counted against run log rows ("12 taps, 12 rows"); refused
taps with their badge.

**Proves.** The buttons lines: T-4548 (read one action value strictly), T-4549 (actions in the manifest), T-4550
(the Python contract), T-4552 (route a tap by its action), T-4553 (signed links), T-4554 (one state commit across
app and widget), T-4556 (buttons drawn as links or intents), T-4557 (the When tapped setting); the refresh tap:
T-0678, T-4772, T-4775, T-1833, T-1972, T-4433 (Lock Screen tap), T-4415 (what refresh shows when nothing can
run); T-4185 (launcher widgets open the chosen apps); T-4581 (taps in iPad windows).

**Pass or fail on the phone.** Pass: each "+1" tap raises the counter by exactly one within about 2 s without
opening the app; the toggle flips once per tap; each When tapped choice opens what it names; taps counted equals
run log rows. Fail: a tap that opens the app when it should not, a counter that jumps by two or not at all, a
count that differs from the rows, or a refused tap with no badge.

### 2.3 Test: Python in the widget

**What it shows.** Where this run happened and what it cost: "runs in: the widget" or "the app" and the reason in
plain words; Python's version; run time against the widget's 2.0 s; peak memory against the widget's free memory;
a run count kept between runs (state); one https fetch through `pywidget.net` with its status and age line. Five
modes, chosen with buttons on the large size and in the widget's settings on the others:


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 2.3 Test: Python in the widget, scrolls sideways" style="--tw:739px" markdown="1">

| Mode | What it does | What should happen |
|---|---|---|
| Normal | the rows above | runs in the widget, every row a pass |
| Heavy | allocates past the widget's free memory | moves to the app; the reason says it needed N MB |
| Slow | sleeps past 2.0 s | moves to the app; the reason says it took N s |
| Refused import | imports a module the widget refuses | moves to the app; the reason names the module |
| Fail | raises an error | red badge and a folded traceback; the say-so button <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> it, Normal draws again |

</div>


**Proves.** T-4181 (refresh on its own and by a tap; the age line, T-1440 and T-1441); T-4182 (a failing widget
says so and recovers: T-3291 red badge, T-0389 folded traceback, T-1643 and T-3791 the say-so lift, T-5438 recent
runs on a failing widget); T-4280 and T-4494 (widget or app by size); T-4281 (where it runs, memory and time);
T-2097 and T-2232 (free and peak memory on a device); T-1764 and T-0198 (run records); T-4189's fetch inside the
widget (T-0687, T-0696, T-1882).

**Pass or fail on the phone.** Pass: in each mode the widget shows what the table's last column says, and
returning to Normal brings back a pass in the widget within one refresh. Fail: a blank widget, a move to the app
in Normal, no move in Heavy or Slow, or a red badge that the say-so does not lift.

### 2.4 Test: Libraries

**What it shows.** One row per Python library the app ships and per extension module it ships, each imported and
used for one line of work, in two columns: in the widget and in the app. The rows are written at build time from
`pywidget/packages/manifest.toml` (shipped packages) and `pywidget/runtime/stdlib-manifest.json` ("shipped" and
"stripped"), so the list is always the build's own:

- packages: requests, urllib3, idna, certifi, charset-normalizer (one https GET, a non-ASCII domain encoded, the CA
  file found, an encoding detected); jedi, parso and pyflakes (one completion, one lint), which are the editor's and
  may say "not here: app only" in the widget column; numpy, pillow and matplotlib show "not in this build" until
  T-0243 ships them;
- extension modules: sqlite3 (an in-memory table), zlib, bz2 and lzma (a round trip), hashlib, json, decimal, csv,
  xml.etree (a parse), zoneinfo (a time zone), uuid, socket (imported only);
- expected absent: ctypes and the other stripped modules show "absent, as expected" as a pass; ssl turns to
  "absent, as expected" once T-4202 strips OpenSSL, and its row shows a fail if it is absent before then;
- one installable test package (a tiny pure-Python file kept with the test widget) installed through the app's
  package install, then imported (T-0212, T-4192).

**Proves.** T-4192 (smaller bundle, installable packages) and its steps: T-0043 (strip unneeded modules), T-0956
(the shipped Python layout), T-0631 (package folders counted as bundled), T-0212 (install a package file), T-0299
(real packages and the sandbox); T-4202 and T-3822 (no OpenSSL); T-4189 (requests through iOS).

**Pass or fail on the phone.** Pass: every row a tick, or "not here" with "app only" or "not in this build".
Fail: any import error, a row that works in the app but fails in the widget without "app only", or a stripped
module that imports.

### 2.5 Test: Animation

**What it shows.** The timer method of T-5640 and the breathing graphics of T-4578, as one test widget instead of
premades. Small: the breathing circle; its settings pick one of Maren's three breathing versions. Medium: the
breathing circle beside the launcher squircle that grows and shrinks (T-4579). Large: both, and a strip of frame
cells lit in turn, so a gap or a stall is plain to see. A fixed line names what is running (the number of timers, the loop length and the fonts), with the figures
T-5640's limits file records. Lock Screen: the same circle at what the Lock
Screen allows. Code-drawn frames only; no AI-made frames, fonts made in code under their licence (Commandment 6).
No health or meditation claim in any word (Commandment 7).

**Proves.** T-5640 (the timer method's limits: frame rate, timers per widget, loop length, Home Screen against
Lock Screen, after a reload), T-4578 (breathing loops gently), T-4579 (the squircle pulses), T-4286 (an imported
font draws in a widget), and T-5635's Animation component card.

**Pass or fail on the phone.** Watch two minutes, then tap refresh and watch one more. Pass: the circle grows and
shrinks with no jump at the loop point, the frame strip has no dark cell, and after the refresh it carries on
with no blank frame. Fail: a stutter, a jump, a blank or frozen frame, or a widget that goes blank after the
refresh. A screen recording is the evidence.

### 2.6 Test: Builder edge cases

**What it shows.** A project made from blocks, not code, whose settings pick one hard case at a time:


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 2.6 Test: Builder edge cases, scrolls sideways" style="--tw:428px" markdown="1">

| Case | What it draws |
|---|---|
| Long text | a very long word, emoji, right-to-left Arabic and Chinese in one block |
| Empty | no blocks at all: a plain "nothing to draw yet" line, never a blank widget |
| Deep | blocks nested to the Builder's limit |
| Many | blocks up to the tree size <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, then one more: the cap's plain message |
| Missing data | a block bound to a value that is not there: its placeholder |
| Every block | each block kind once |
| As code | the same project after "Edit as code" and back |
| Component | a custom block saved as a component and used twice |

</div>


**Proves.** T-4477 (the Builder) and its three phone proofs (the compiler runs in the app's Python, the preview is
fast enough on a phone, a widget built from blocks draws on the Home Screen); T-0245 (the view tree cap); T-4590
(sizes and label line breaks); T-0306 (trees in every family); T-4191 and T-0479 (VoiceOver and large text);
T-1100 (stripped colour modes); T-0024 and T-0472 (Lock Screen clipping and clock size).

**Pass or fail on the phone.** Check each case in each size, in light, dark and tinted, and once at the largest
text size. Pass: it draws without clipped or overlapping text, or shows its plain message. Fail: a blank or
crashed widget, clipped text, or a case that draws differently from its preview in the Builder. This widget waits
on the Builder: until T-4477's first block step lands, its line does not start.

### 2.7 Test: Page and project

**What it shows.** A project with a widget, a full-screen Page, a sibling data file and a settings Page. The
widget and the Page show the same counter and the same note from the sibling file. Tapping the widget opens the
Page; the Page's buttons add one (running its Python), Ask (native prompts: a text, a number, a choice) and Loop
(a script that never ends, for Stop). The Shortcuts Open action opens the same Page.

**Proves.** T-4478 (a full-screen Page that answers taps, on the one run queue beside a widget refresh); T-4476
(one file, one ID, guarded outside code); T-4187 (scripts ask questions and stop cleanly: T-0447 native prompts,
T-2583 no prompt lost); T-4554 (one state commit across app and widget); T-0749 and T-0866 (sibling files);
T-1905 and T-5634 (project files sent in one safe swap, and retried); T-4468 and T-4704 (settings Pages);
T-0790 and T-5630 (Shortcuts).

**Pass or fail on the phone.** Pass: after each tap on the Page the widget shows the same counter within one
refresh; each prompt appears, takes an answer and closes; Stop ends Loop and the next run starts; Shortcuts opens
the Page. Fail: the widget and the Page disagree, a prompt appears after its run ended, Stop leaves the app stuck,
or the Page opens anywhere but full screen.

### 2.8 What the list leaves to other proofs

- Settings and Pro (T-4190): Developer mode (T-4688, T-4865, still open) tests Pro in the same internal build; no
  test widget repeats it.
- The 12 premades (T-4180) are proved as themselves: they are the product.
- The gate build's memory <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> (`pywidget/widgets/gate/`) stays in the gate build (T-2943); it measures the
  extension, it does not test features.
- Background refresh (T-0793) can only be watched over hours; Test: Python in the widget's age line shows it when
  it is built, and no widget can prove it in one sitting.

## 3. Kept out of the App Store build

The app already has a switch that exists only in Debug builds and in the internal TestFlight build: the Swift
condition `PYWIDGET_TESTER_PRO` (T-4093, `pywidget/ios/project.yml`), set by the Debug configuration and by
`tools/upload.sh --internal` beside `PW_INTERNAL_TESTFLIGHT=YES`, whose export carries
`testFlightInternalTestingOnly` and whose build is listed in `ops/testflight-internal.tsv`.
`pywidget/ios/scripts/check_tester_pro.py` holds the rule three ways: before a build (the settings), after the
link (`--product`, the executable's bytes) and on an archive (`--archive`); `tools/upload.sh` reads the same mark
on every archive it exports. The test widgets use the same condition, not a new one, so there is one rule and one place it is set:

1. **The files.** A new build step, "Install test widgets (internal TestFlight only)", runs
   `pywidget/ios/scripts/testflight_widgets.py`: when the build's Swift conditions hold `PYWIDGET_TESTER_PRO` it
   copies `pywidget/widgets/testflight/` (the `.py` files and `catalog.json`) to `Runtime/testflight/`; in any
   other build it writes nothing and removes a stale `Runtime/testflight/`. The same pattern as the gate build's
   premade step (`scripts/gate_premade.py`). The widget picker's "Test:" names come the way `premade-titles.json`
   does, since the extension has no `Runtime/` of its own to read.
2. **The screens.** The Gallery's "Test widgets" section and the picker's "Test:" names are compiled only under
   `#if PYWIDGET_TESTER_PRO`; their type names join `check_tester_pro.py`'s list of code that must not be in an App
   Store build.
3. **The check.** `check_tester_pro.py --product` and `--archive` also fail a Release build or an archive (not
   `upload.sh --internal`'s) whose app holds `Runtime/testflight/`. So an App Store archive with a test widget in
   it fails while it is built. Whether every archive road runs the check, Xcode's Organizer included, is T-2691's
   open question for the gate mark; the same answer covers this folder.
4. **The test.** `pywidget/tests/widgets/test_testflight_widgets.py`: a Release build's settings copy nothing; an
   internal build's copy every file `catalog.json` names and nothing else; a stale folder is removed; a fake archive
   holding the folder fails the check unless internal; no test widget's id equals a premade's id, and the premade
   catalog names no test widget.

External TestFlight testers would get a build through Beta App Review, so the test widgets never go to external
testers; the internal build is for the Investors and the company's own phones.

## 4. The build lines

Eight lines: line 1 first, then the seven widgets, each needing line 1. Owners and priorities as in section 2:
proofs of concept come first (an Investor's words), so lines 1 to 6 are P1; the Builder and Page widgets follow
their features and are P2.

**Not on the board yet.** This session runs in its own copy and may not write to the main folder. From a copy,
`tools/board_tick.py add` writes the copy's own board and issues the next ID from the copy's own mark: on 11-23 at
12:20 AM it issued T-5650, which main's mark (`ops/board.md.ids`, T-5651) had already issued. The add was undone
in the copy before anything was committed. The lines below are for the coordinator to add on main's live board
once this plan has landed, line 1 first, then the seven with line 1's ID put in place of `<line 1>`. Checked at
12:4x AM with `tools/board_card.py`'s `add_problems` (form only, nothing written): titles of 5 to 9 words, each
Done when names the docs page, and the one reason given, the same for all eight, is that
`documents/app/testflight-test-widgets.md` is not on main yet; it is once this lands.

```
python3 tools/board_tick.py add --before "## Storage, top priority" --by "an Investor #325 c7091558334" < lines.txt
```

The lines (one per paragraph; each is one board line):

```
- [ ] [build] Title: Ship test widgets in internal TestFlight builds only | Idris with Pernille, P1, from T-5643 (Investor an Investor #325 c7091558334, 11:24 PM ET 11-22: "These are distinct from pre-made widgets that ship in the app; they only ship in the Testflight builds so investors can test all features without needing to add many widgets to their phones"; the list and the rule are in ops/plans/testflight-test-widgets.md, section 3): the test widgets' own folder pywidget/widgets/testflight/ (one .py per widget and a catalog.json); an install step that copies it to Runtime/testflight/ only in a build whose Swift conditions hold PYWIDGET_TESTER_PRO (Debug and tools/upload.sh --internal's archive, the internal-only TestFlight build) and removes a stale copy from any other build; the Gallery's "Test widgets" section and the widget picker's "Test:" names compiled only under that condition; check_tester_pro.py's --archive and --product failing an App Store archive or Release build that holds Runtime/testflight/ or the section's code. No premade changes; the 12 premades and their catalog stay as they are. Done when: test: land:host, pywidget/tests/widgets/test_testflight_widgets.py proves a Release build copies nothing, an internal build copies every catalog file, a stale folder is removed, an archive holding the folder fails the check unless internal, and no test widget id equals a premade id; docs page documents/app/testflight-test-widgets.md with its code-drawn diagram, its "Kept out of the App Store build" part checked against the built code. Reviewer: Odalys, once per merge (Commandment 13). Model: Opus high. Targets: pywidget/widgets/testflight (new), pywidget/ios/scripts/testflight_widgets.py (new), pywidget/ios/scripts/check_tester_pro.py, pywidget/ios/project.yml, pywidget/ios/App/Gallery/GalleryView.swift, pywidget/tests/widgets/test_testflight_widgets.py (new), documents/app/testflight-test-widgets.md. (owner: Idris, P1) Links: none

- [ ] [build] Title: Build the permissions test widget | Pernille with Idris, P1, from T-5643 (Investor an Investor #325 c7091558334: test widgets "so investors can test all features without needing to add many widgets to their phones"; ops/plans/testflight-test-widgets.md 2.1): Test: Permissions, one row per permission the app uses (location, steps and motion, notifications, network, clipboard, files, secure storage, time zone), each with the state iOS reports (not asked, allowed, denied, restricted, not on this device) and what the app reads in it, never coordinates or clipboard text; a tap opens the app to ask each in turn; a Send test button schedules one notification. Done when: seen: on an Investor's iPhone from an internal TestFlight build, each row names the state set in Settings and shows a reading when allowed, and the test notification arrives once, with screenshots of each state on #325; docs page documents/app/testflight-test-widgets.md with its code-drawn diagram, row 1 marked built. Reviewer: Idris, once per merge (Commandment 13). Model: Opus high. Targets: pywidget/widgets/testflight/permissions.py (new), documents/app/testflight-test-widgets.md. (owner: Pernille, P1) Links: needs <line 1>

- [ ] [build] Title: Build the taps and buttons test widget | Idris, P1, from T-5643 (Investor an Investor #325 c7091558334; ops/plans/testflight-test-widgets.md 2.2): Test: Taps and buttons, a +1 button run in the widget, a toggle, an Open the Page button, the refresh button with its age line, the whole-widget tap by its When tapped setting, and rows for the counter, the last tap (where it ran, how long), taps against run log rows, and refused taps with their badge; it uses the buttons work as each step lands and shows "not here: not built yet" with the line's name before then. Done when: seen: on an Investor's iPhone from an internal TestFlight build, each +1 tap raises the counter by one within about 2 s without opening the app, each When tapped choice opens what it names, and taps counted equal run log rows, on Home Screen and Lock Screen, with a screen recording on #325; docs page documents/app/testflight-test-widgets.md with its code-drawn diagram, row 2 marked built. Reviewer: Pernille, once per merge (Commandment 13). Model: Opus high. Targets: pywidget/widgets/testflight/taps.py (new), documents/app/testflight-test-widgets.md. (owner: Idris, P1) Links: needs <line 1>

- [ ] [build] Title: Build the Python in the widget test widget | Pernille with Idris, P1, from T-5643 (Investor an Investor #325 c7091558334; ops/plans/testflight-test-widgets.md 2.3): Test: Python in the widget, rows for where the run happened and why, Python's version, run time against 2.0 s, peak memory against free memory, a run count kept between runs and one https fetch with its age line; five modes (Normal, Heavy, Slow, Refused import, Fail) chosen by buttons on the large size and in settings on the others, each with the outcome the plan's table names. Done when: seen: on an Investor's iPhone from an internal TestFlight build, each mode shows its expected outcome and Normal returns to a pass in the widget within one refresh, with screenshots of the five modes on #325; docs page documents/app/testflight-test-widgets.md with its code-drawn diagram, row 3 marked built. Reviewer: Idris, once per merge (Commandment 13). Model: Opus high. Targets: pywidget/widgets/testflight/python_run.py (new), documents/app/testflight-test-widgets.md. (owner: Pernille, P1) Links: needs <line 1>

- [ ] [build] Title: Build the shipped libraries test widget | Pernille, P1, from T-5643 (Investor an Investor #325 c7091558334; ops/plans/testflight-test-widgets.md 2.4): Test: Libraries, one row per shipped package and extension module, imported and used for one line of work in the widget and in the app, its rows written at build time from pywidget/packages/manifest.toml and pywidget/runtime/stdlib-manifest.json; stripped modules shown absent as expected; one tiny test package installed through the app's package install and imported. Done when: seen: on an Investor's iPhone from an internal TestFlight build, every row is a pass or a not here with its reason, with a screenshot of both columns on #325; docs page documents/app/testflight-test-widgets.md with its code-drawn diagram, row 4 marked built. Reviewer: Odalys, once per merge (Commandment 13). Model: Opus high. Targets: pywidget/widgets/testflight/libraries.py (new), pywidget/ios/scripts/testflight_widgets.py (new), documents/app/testflight-test-widgets.md. (owner: Pernille, P1) Links: needs <line 1>

- [ ] [build] Title: Build the animation test widget from the timer method | Idris with Maren, P1, from T-5643 (Investor an Investor #325 c7091558334: test widgets are "distinct from pre-made widgets"; ops/plans/testflight-test-widgets.md 2.5): Test: Animation, T-5640's timer-method widgets and T-4578's three breathing versions shipped as one test widget, not as premades: the breathing circle (small, its version picked in settings), the circle beside the growing and shrinking launcher squircle of T-4579 (medium), both with a strip of frame cells lit in turn (large), a fixed line naming timers, loop length and fonts, and a Lock Screen circle; code-drawn frames, fonts made in code under their licence, no health or meditation words. Done when: seen: on an Investor's iPhone from an internal TestFlight build, two minutes of the circle and squircle with no jump, no dark frame cell and no blank frame, then one more after a refresh tap, in a screen recording on #325; docs page documents/app/testflight-test-widgets.md with its code-drawn diagram, row 5 marked built. Reviewer: Odalys, once per merge (Commandment 13). Model: Opus high. Targets: pywidget/widgets/testflight/animation.py (new), pywidget/ios/Widget, documents/app/testflight-test-widgets.md. (owner: Idris, P1) Links: needs <line 1>, T-5640

- [ ] [build] Title: Build the Builder edge cases test widget | Idris with Pernille, P2, from T-5643 (Investor an Investor #325 c7091558334; ops/plans/testflight-test-widgets.md 2.6): Test: Builder edge cases, a project made from blocks whose settings pick one case at a time (long text, empty, deep, many, missing data, every block, as code, component); starts when T-4477's first block step has landed. Done when: seen: on an Investor's iPhone from an internal TestFlight build, every case draws in each size in light, dark and tinted and at the largest text size without clipped or overlapping text, or shows its plain message, with screenshots on #325; docs page documents/app/testflight-test-widgets.md with its code-drawn diagram, row 6 marked built. Reviewer: Pernille, once per merge (Commandment 13). Model: Opus high. Targets: pywidget/widgets/testflight/builder_cases (new), documents/app/testflight-test-widgets.md. (owner: Idris, P2) Links: needs <line 1>, T-4477

- [ ] [build] Title: Build the Page and project test widget | Idris, P2, from T-5643 (Investor an Investor #325 c7091558334; ops/plans/testflight-test-widgets.md 2.7): Test: Page and project, a project with a widget, a full-screen Page, a sibling data file and a settings Page; the widget and the Page show the same counter and note; the Page's buttons add one, Ask (native text, number and choice prompts) and Loop (for Stop); the Shortcuts Open action opens the Page. Done when: seen: on an Investor's iPhone from an internal TestFlight build, the widget matches the Page after each tap within one refresh, each prompt opens and closes, Stop ends Loop and the next run starts, and Shortcuts opens the Page, in a screen recording on #325; docs page documents/app/testflight-test-widgets.md with its code-drawn diagram, row 7 marked built. Reviewer: Pernille, once per merge (Commandment 13). Model: Opus high. Targets: pywidget/widgets/testflight/page_project (new), documents/app/testflight-test-widgets.md. (owner: Idris, P2) Links: needs <line 1>, T-4478
```

## 5. What this changes for lines already on the board

- **T-5640** (animated test widgets from the timer method) and **T-4578** (a breathing premade) both say
  "premade". Under an Investor's comment their widgets become Test: Animation (line 6 of section 4) and are not
  premades; T-4579 (the squircle pulse) joins the same test widget. Each keeps its own measurement and its phone
  proof; only where the widget ships changes. Noted on T-5643 for the coordinator, who can note the three lines.
- No other line changes. A feature line is still done by its own Done when; a test widget is how an Investor sees
  it on one phone.

## 6. Open points

1. The internal TestFlight build also carries Developer mode and the tester Pro switch. Sharing their condition
   keeps one rule; if the Investors want a TestFlight build without the test widgets, the widgets get their own
   condition set in the same two places, and the check reads both.
2. External TestFlight testers are not planned. If the Investors invite any, the test widgets would need Beta App
   Review to pass with them in, and this plan would need a new decision before that build.
3. The row look (section 1, point 6) is Maren's to set in the first widget line that starts; the others reuse it.
{% endraw %}

</div>
