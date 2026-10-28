---
layout: "default"
title: "Home Screen setup and the Add to Home Screen walkthrough (T-0450 slice 2, T-0503)"
section: "documents"
description: "Sheets, drawn by draw_home_setup.py (imports draw_run_screen.py and draw_ide.py; no image model): A-home-phone.png, A-home-ipad.png (light, A Paper), B-home-phone.png, B-home-ipad.png (dark, B Studio). QA\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/home-setup.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/design/ide/home-setup.md</code></span></div><h1>Home Screen setup and the Add to Home Screen walkthrough (T-0450 slice 2, T-0503)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-10-27. <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Ruling</span>: ADR-001 chair ruling 2026-10-27 10:05, s1 ("Make App" writes `app.json`; a lone script first goes into a new project), s2 (the walkthrough), s3 (container projects only), s5 (the words). Build spec for T-0449; Idris reads it, with [`run-screen.md`](run-screen.html) (slice 1), before building. Layout and behaviour are spec; every string is DRAFT <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>.

Sheets, drawn by `draw_home_setup.py` (imports `draw_run_screen.py` and `draw_ide.py`; no image model): `A-home-phone.png`, `A-home-ipad.png` (light, A Paper), `B-home-phone.png`, `B-home-ipad.png` (dark, B Studio). QA: `qa-home-setup.json` (4 sheets, 28 frames, 0 clipped, truncated, overlapping or under-11 pt texts; min contrast 5.49 light, 6.37 dark; each PNG under 300 KB). Regenerate: `python3 pywidget/docs/design/ide/draw_home_setup.py`; copy table: `--strings`.

## 1. The menu item: plain words, no coined name

"Make App" is the internal name only (ruling s5). In the interface:
- No `app.json` yet: **Set Up for Home Screen…** (frame 1).
- `app.json` exists: **Home Screen Setup…** (same sheet, to change name or script) and **Add to Home Screen…** (the walkthrough).
- Where: the long-press menu on a project row and on a lone script row in Projects, and the editor's project menu if T-0355 gives it one. In the drawing only the Home Screen rows are spec; Rename, Share and Delete stand in for T-0355's menu.

Plain words worked: the item says what the user gets, in the words the store page will use ("open a script from your Home Screen"). No coined feature name, so no C51 naming request.

## 2. Setup sheet

Large sheet on iPhone, 580 pt form sheet on iPad. Title "Home Screen"; Cancel left (writes nothing), Save right (writes `app.json`).
1. Intro line (first setup only).
2. **Name.** Text field, focused on open, clear button. Proposed from the folder name: `_` and `-` to spaces, first letter of each word capitalised (`tip_splitter` → Tip Splitter); a lone script's file name without `.py` (`dice.py` → Dice). Trimmed; 1 to 40 characters (my limit, so titles and Spotlight rows stay one line; Idris may change it). Empty or too long: the field gets a danger outline, a message replaces the footer, Save is disabled (frame 3).
3. **Script to Run.** Every `.py` file in the project, any depth, relative path under the name; one checkmark. Default: `main.py` if present, else the file open in the editor, else the first in path order. One file only: shown, checked, with the footer "The only script in this project." (frame 5).
4. Edit mode only (frame 7): **Add to Home Screen…** row (opens the walkthrough) and **Turn Off Home Screen Opening** (destructive, asks first, frame 8; deletes `app.json`; the project and files stay). The name footer changes to "Renaming here does not break an icon already on the Home Screen." That sentence is true only because `id` is written once (ruling s1); if T-0449 finds otherwise, cut it.

Save, first time: write `app.json` (schema `pywidget.app`, version 1, new UUID `id`, `name`, `entry`), then the sheet's content becomes the walkthrough with the "ready" intro (frame 6). Save later: write `name` and `entry` only, keep `id`, close the sheet.

## 3. A lone script

Long-press a script that is not in a project, then Set Up for Home Screen…: an alert first (frame 4), "Put dice.py in a new project?", **New Project** (default) and Cancel.
- Script in the Projects folder on this device: New Project makes a folder named from the name field and moves the file into it. Moves happen on Save, not on New Project; Cancel on the sheet leaves the file where it was.
- Script in a folder opened from Files or iCloud Drive (ruling s3: container projects only): the message says a copy goes into a new project and the original stays (iPad frame 3). Edits to the original do not follow the copy; Idris, say whether the project row should show that.
- Folder name clash: append " 2", as Files does.

## 4. Add to Home Screen walkthrough

One sheet, reached from: Save (first setup), the project menu, the edit sheet row, the run screen's ⋯ menu (slice 1, `menu.home`). Title "Add to Home Screen", Done right. All four steps on one scrolling list, so a reader sees the whole route and VoiceOver reads it in order. Bottom button **Open Shortcuts** (primary) leaves PyWidget for Shortcuts; the sheet stays open for the return.

Each step: a schematic diagram (device outline, grey bars, one accent mark in a dashed ring), "Step n", a title, one line. The diagrams are shapes drawn in `diagram()`; no screenshot, no tracing, no Apple icon, no text inside. They are `aria-hidden`: the text carries the step. At accessibility sizes the diagram moves above the text (frames 10, iPad portrait).

**Every step is marked CHECK: T-0449's Simulator hand run (F18) confirms or corrects it, with a screenshot each, before the copy leaves DRAFT.** I wrote them from how Shortcuts worked when I last used it, not from a run.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 4. Add to Home Screen walkthrough, scrolls sideways" style="--tw:1091px" markdown="1">

| Step | Title (DRAFT) | Line (DRAFT) | What T-0449's hand run checks | Status |
|---|---|---|---|---|
| 1 | Open Shortcuts, then tap + | The + at the top starts a new shortcut. | + is at the top of My Shortcuts on iOS 26 (iPhone and iPad); or whether our App Shortcut tile in the PyWidget section has its own Add to Home Screen, which would make steps 1-2 one step | CHECK |
| 2 | Add the Open action | Search for PyWidget, tap Open, then choose [name] from the list. | the action's real title as the intent shows it ("Open" or "Open [name] in PyWidget"); that the project picker lists only projects with a valid `app.json` | CHECK |
| 3 | Tap the name, then Add to Home Screen | Tap the shortcut's name at the top to see its menu. | where Add to Home Screen sits on iOS 26 (name menu, share sheet or info button) | CHECK |
| 4 | Pick a name and an icon, then tap Add | Tap the new icon to run [name] from the start. / iOS may show Shortcuts for a moment first. | what a tap on the icon shows (banner, a pass through Shortcuts, or straight to the run screen), ruling s2; the second line is kept, changed or cut by that | CHECK |
| button | Open Shortcuts | | that opening Shortcuts from the sheet is allowed and works (Shortcuts' URL scheme, or drop the button) | CHECK |

</div>


If the hand run finds a three-step route, cut a step and change "Four steps" in `walk.ready` and `walk.intro`; the sheet takes three or four without layout change.

## 5. Accessibility

- Dynamic Type through AX5 (frames 9, 10, iPad portrait). AX5 sizes are Apple's table as I recall it (Idris checks); the sheet scrolls; Save and Cancel do not scale (navigation bar, Large Content Viewer).
- VoiceOver: the checkmark row reads "[file], selected"; disabled Save reads "Save, dimmed" with the field's message as its hint. The walkthrough reads Step n, title, line, in order; diagrams are hidden.
- The field message has an icon and words, never the red outline alone.
- Glyphs are stand-ins; the build uses SF Symbols. The Open Shortcuts glyph is a generic stack, not Shortcuts' icon; Idris picks an SF Symbol that is not Apple's product mark.

## 6. Words

Plain descriptive words only; "app", "apps" and "mini app" never appear in user-facing text (ruling s5). Note "App Store" also fails the check, so no string sends people there. `--strings` checks every string, every filled-in string and the sample names: 0 hits.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 6. Words, scrolls sideways" style="--tw:846px" markdown="1">

| ID | String (DRAFT) | Where | C51 |
|---|---|---|---|
| `menu.setup` | Set Up for Home Screen… | project menu (long-press on a project or a lone script; the editor's project menu); no app.json yet | DRAFT |
| `menu.edit` | Home Screen Setup… | project menu once app.json exists; opens the same sheet to change name or script | DRAFT |
| `menu.home` | Add to Home Screen… | project menu once app.json exists; opens the walkthrough (also in the run screen's ⋯ menu) | DRAFT |
| `lone.title` | Put [file] in a new project? | alert on a lone script, before the setup sheet | DRAFT |
| `lone.msg` | To open from the Home Screen, a script needs a project of its own. [file] moves into a new project folder. | alert message, script in the Projects folder on this device | DRAFT |
| `lone.msg.copy` | To open from the Home Screen, a script needs a project of its own. A copy of [file] goes into a new project on this [device]; the original stays where it is. | alert message, script in a folder opened from Files or iCloud Drive (ruling s3: container projects only) | DRAFT |
| `lone.ok` | New Project | alert, default action; opens the setup sheet with the new project's name field | DRAFT |
| `lone.cancel` | Cancel | alert; nothing moves | DRAFT |
| `setup.title` | Home Screen | setup sheet title (first setup and later changes) | DRAFT |
| `setup.cancel` | Cancel | sheet, top left; nothing is written | DRAFT |
| `setup.save` | Save | sheet, top right; writes app.json; disabled until the name is valid | DRAFT |
| `setup.intro` | Choose a name and the script to run. Then it can be opened from Shortcuts, Spotlight and your Home Screen. | sheet, first line, first setup only | DRAFT |
| `name.head` | Name | section header | DRAFT |
| `name.foot` | The title while it runs, and the name in Shortcuts and Spotlight. The Home Screen icon gets its own name when you add it. | section footer | DRAFT |
| `name.empty` | Enter a name. | under the field when the trimmed name is empty; Save disabled | DRAFT |
| `name.long` | Use 40 characters or fewer. | under the field past 40 characters; Save disabled | DRAFT |
| `entry.head` | Script to Run | section header | DRAFT |
| `entry.foot` | Each time it opens, this script runs from the start, in the project folder. | section footer | DRAFT |
| `entry.one` | The only script in this project. | footer when the project <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> one .py file (the lone-script case) | DRAFT |
| `proj.head` | New Project | section header, lone-script case only | DRAFT |
| `proj.foot.move` | [file] moves into this folder in Projects. | footer, lone-script case, script on this device | DRAFT |
| `edit.home` | Add to Home Screen… | edit sheet row; opens the walkthrough | DRAFT |
| `edit.off` | Turn Off Home Screen Opening | edit sheet row, destructive; asks first | DRAFT |
| `edit.off.foot` | Renaming here does not break an icon already on the Home Screen. | edit sheet footer under the name | DRAFT |
| `off.title` | Turn off Home Screen opening for [name]? | alert after Turn Off | DRAFT |
| `off.msg` | Icons for it on the Home Screen will stop working. The project and its files stay. | alert message | DRAFT |
| `off.ok` | Turn Off | alert, destructive; deletes app.json | DRAFT |
| `off.cancel` | Cancel | alert | DRAFT |
| `walk.title` | Add to Home Screen | walkthrough sheet title | DRAFT |
| `walk.done` | Done | walkthrough, top right | DRAFT |
| `walk.ready` | [name] is ready in Shortcuts and Spotlight. Four steps put it on your Home Screen. | walkthrough intro after the first Save | DRAFT |
| `walk.intro` | Four steps in Shortcuts put [name] on your Home Screen. | walkthrough intro from a menu | DRAFT |
| `walk.step` | Step [n] | eyebrow over each step title | DRAFT |
| `s1.title` | Open Shortcuts, then tap + | step 1 title | DRAFT |
| `s1.body` | The + at the top starts a new shortcut. | step 1 body | DRAFT |
| `s2.title` | Add the Open action | step 2 title | DRAFT |
| `s2.body` | Search for PyWidget, tap Open, then choose [name] from the list. | step 2 body | DRAFT |
| `s3.title` | Tap the name, then Add to Home Screen | step 3 title | DRAFT |
| `s3.body` | Tap the shortcut's name at the top to see its menu. | step 3 body | DRAFT |
| `s4.title` | Pick a name and an icon, then tap Add | step 4 title | DRAFT |
| `s4.body` | Tap the new icon to run [name] from the start. | step 4 body | DRAFT |
| `s4.note` | iOS may show Shortcuts for a moment first. | step 4, second line; kept, changed or cut after T-0449's hand run | DRAFT |
| `walk.open` | Open Shortcuts | walkthrough bottom button, primary; leaves PyWidget for Shortcuts, the sheet stays open | DRAFT |

</div>


Word check ('app', 'apps', 'mini app'): 43 strings, hits none

## 7. Engineering read (Idris), 2026-10-27

Read for T-0504 before building T-0449: this file, [`run-screen.md`](run-screen.html), the sheets A-/B-run-* and A-/B-home-*, ADR-001's chair ruling of 2026-10-27 10:05, T-0448's reader (`_pywidget_runtime/app_manifest.py`) and T-0208's `RunScriptIntents.swift`. No Xcode run; every iOS behaviour below is from what I know, with how sure I am. Anything marked CHECK goes into T-0449's Simulator hand run (F18) with a screenshot, beside the five rows of s4. Redraws are board line T-0505 (Maren).

### 7.1 Edit while a script is running (run-screen.md s2): disabled

Ruling: **Edit Script is disabled while the run is running or waiting.** It stays in the ⋯ menu, dimmed, with a subtitle saying why (new string `menu.edit.running`, T-0505). Stop first, then Edit: two taps, both visible.

Why not hand the live run to the editor's console:
- The run started in Context `.app` with the run screen as its output and prompt host. Moving it means re-homing the console stream and, in the waiting state, a native prompt that is up while Python sits in `input()`. That is the hardest state to test, and it is exactly the one a user is likely to be in when they reach for Edit.
- Edits to the entry file do nothing to a run that has already imported it. A user who edits and watches the old run go on will read it as "my change did not work".
- The editor's Run button would then face "one run at a time" against a run it did not start.
- Stop is one tap away, needs no confirmation, and keeps the output on screen.

The bottom bar's Edit is only there once the run has ended, so it is unchanged. Add to Home Screen… stays enabled while running. Leaving for Shortcuts suspends the run the way going Home does, and nothing extra is done for it.

### 7.2 The name limit (s2): keep 40, counted the way the reader counts

What iOS does, as I know it:
- `AppEntity`'s `DisplayRepresentation` title has **no length limit** in the API. Sure.
- Shortcuts shows the entity title inside the action's sentence ("Open [Tip Splitter]") and wraps it. Its library tiles, the Spotlight rows and the App Shortcut tiles cut long titles with a tail ellipsis, at about two lines on a tile and one line in a Spotlight row, roughly 25 to 35 characters at the default text size on a 390 pt phone. Medium-sure on the behaviour, low-sure on the exact counts.
- The Home Screen label (about 12 characters) is the user's own choice in step 4, not our name.
- Our own navigation bar, with Close and ⋯ either side, fits about 24 to 28 characters before the middle truncation the spec already draws.

So 40 does not keep every surface on one line. It does keep every surface readable, which is the point of the limit. **Ruling: keep 40.** CHECK: one 40-character name in the Shortcuts picker, the action sentence and Spotlight, screenshotted.

There are three unit problems the drawing cannot show:
1. **T-0448's schema <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> `name` at 64 Unicode scalars** (`NAME_MAX`) and bans control, zero-width and direction characters, ZWJ (U+200D) among them. "40 characters" in the field means 40 Swift `Character`s (grapheme clusters). One flag is 2 scalars and a skin-toned emoji is 2, so 40 Characters can exceed 64 scalars. The field is valid only when all of these hold: trimmed, 1 to 40 Characters, at most 64 scalars, no banned scalar. A name over 64 scalars but under 40 Characters needs its own message, because "Use 40 characters or fewer" would be false for it. The same goes for a banned character, for example ZWJ in a pasted emoji. Two new strings, T-0505.
2. **The Swift reader follows the schema, not the field.** A hand-edited `app.json` with a 60-scalar name still resolves. The 40 limit is an editor rule, so a hand edit inside the schema never makes an icon stop working without a word.
3. **The folder name is a filesystem name.** 64 scalars at up to 4 UTF-8 bytes each is 256 bytes, which is over the 255-byte limit before " 2" is even added. The folder name is derived separately: `/` and `:` become `-`, a leading `.` is dropped, and it is cut at a grapheme boundary to 200 UTF-8 bytes. `app.json` keeps the full name. Tests: worst-case 64 four-byte scalars, a 40-flag name, and a name that only clashes after the cut.

Duplicate names are allowed, as the schema allows them. The entity's `DisplayRepresentation` subtitle is the project's folder name, so two projects both called "Dice" are still told apart in the Shortcuts picker ("Dice", "Dice 2").

### 7.3 A copied lone script (s3): a plain project, no link back

Ruling: **the copy is an ordinary project in Projects. No badge, no "copied from" line on its row, no link to the original.** 1.0 is container projects only (ruling s3). A row that points back at the original promises a connection that does not exist. Keeping one would need a security-scoped bookmark that goes stale when the file moves in Files or iCloud. The user is told once, at the moment it happens:
- in the alert (`lone.msg.copy`, as drawn), and
- in the setup sheet's New Project footer, which has no copy-case string today. `proj.foot.move` would be false for a copy. New `proj.foot.copy`, with the iPad sheet frame redrawn to show it (T-0505).

Moves on this device: I keep the move, with one engineering limit. Anything another surface finds by path or id gets **copied, not moved**: a widget library entry (`widgets/<id>/` in the App Group, which T-0208's `ScriptEntity` names) or a script that a Shortcuts Run Script action points at. `lone.msg.copy` already reads true for that case ("the original stays where it is"), so no new string is needed. Before the move, an open editor buffer for that file is saved. After it, the editor follows the file to its new path. Neither is drawn and neither needs drawing.

### 7.4 What App Intents cannot do as drawn, or does differently

- **Step 2's action name.** The Shortcuts action title is ours to choose. A bare "Open" sits next to the system's own Open App action and T-0208's Run Script in the PyWidget list. I build: entity type "Project", intent title **"Open Project"**, parameter summary "Open [name]", App Shortcut phrase "Open [name] in PyWidget" (the phrase must contain the app's own name; "PyWidget" passes the word check). So `s2.body` becomes "…tap Open Project, then choose [name]…" (T-0505). Still CHECK.
- **Modes.** `OpenIntent` opens the app. I set `openAppWhenRun = true` for iOS 18-25 and, behind `@available(iOS 26, *)`, `supportedModes = .foreground`. Medium-sure of the iOS 26 spelling; the compiler settles it. `perform()` runs in the app and only posts an open request to a main-actor router; it never waits on the Python run or on our alert. "Stop X and open Y?" is our own alert, not `requestConfirmation`, so it works as drawn. On a cold launch the request is held until the root view is up.
- **Over an open sheet.** If a sheet is up when the open arrives (setup, walkthrough, a file picker), it is dismissed first. Editor buffers are saved before any run starts, so a run never reads a stale file from disk.
- **The Shortcuts and Spotlight list** only updates when the app calls `updateAppShortcutParameters()`. It is called after every Save, rename and Turn Off. Not drawn, none needed.
- **Open Shortcuts button.** `UIApplication.open` of a `shortcuts://` URL needs no plist entry; only `canOpenURL` would. `shortcuts://create-shortcut` should open a new, empty shortcut. If it does, step 1's "tap +" goes, and the walkthrough becomes three steps (the sheet already takes three). Medium-sure; CHECK, and T-0505 keeps both versions of step 1 ready.
- **What cannot be done at all, and the design does not try:** an app cannot place an icon, preset the icon's name or image, or learn whether the user added one. The walkthrough cannot show a "done" state, and it does not.
- **"Renaming here does not break an icon"** holds: the entity resolves by the `app.json` `id`, and the run screen's title is read from `app.json` at each open. The shortcut editor may keep showing the old name until it re-resolves, which is harmless. CHECK: rename, then tap the icon.
- **Turn Off, then Set Up again** writes a new `id`, so old icons stay broken. `off.msg` could say so (optional, T-0505).
- **Stop and open when X is not a run screen.** The design draws X as another Home Screen script. On the one run queue X can also be (a) an editor console run, or (b) a short background run: a widget refresh, or T-0208's Run Script from Shortcuts. My ruling: in case (a) the same alert appears over the editor, with X as the file name. In case (b) there is no alert: Y's screen opens with a **Starting** status, and Y's run waits its turn. Stop cancels Y. Both need a frame (T-0505).
- **iPad windows.** If PyWidget has more than one window on iPad, the run screen opens in the active window, and one run at a time holds across windows.

### 7.5 Not mine to rule

`app_manifest.py`'s user-facing messages name the file `app.json`, for example "This project's app.json names the same field twice." Maren's word check counts "App Store" as a hit. Whether a file name counts under ruling s5 is Ines's call, and the answer may change Pernille's messages.

### 7.6 The hand run

T-0504's last part, the five s4 CHECK rows plus the three added here (40-character name, rename then tap, `create-shortcut`), runs inside T-0449's F18 Simulator hand run with a screenshot each. The answers are noted on T-0449. That is T-0449's done line already, so the rows travel with it.
{% endraw %}

</div>
