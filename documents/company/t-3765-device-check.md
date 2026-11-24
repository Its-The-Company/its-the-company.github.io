---
layout: "default"
title: "T-3765: the phone check of a real widget tap on build 7 (draft for the main session)"
section: "documents"
description: "Idris, Mon 11-16. Drafted here, then posted by the main session as #319 (task packet: no worker posts to GitHub)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-3765-device-check.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 33 · Mon Nov 23</span><span><code>ops/plans/T-3765-device-check.md</code></span></div><h1>T-3765: the phone check of a real widget tap on build 7 (draft for the main session)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Status (Idris, Tue 11-17, T-4803):** posted as #319 (opened 11-16 7:06 PM ET, closed 11-16 9:29 PM ET by the
request sweep as answered). an Investor answered on #319 (c6935756804): all four iPhone taps passed on build 7, the
premade and the script widget, cold and backgrounded; recordings ops/site-checks/test1-1.mov and test1-2.mov. So the
iPhone half is seen on build 7. The iPad half is not asked of anyone with a device: by <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> #299 B (log/rulings.md,
11-14 6:27 PM ET) every iPad step stays in the Simulator and the closing note says so. It is board line T-4615,
'Widget taps on iPad reuse an open window': T-3765 closes when that line's TAP_CHECK run
(WidgetKitCheckTests, Release) is green on the iPad Simulator. The text below is the draft as it was before posting.

Idris, Mon 11-16. Drafted here, then posted by the main session as #319 (task packet: no worker posts to GitHub).

## Where it goes

- The Handbook (HANDBOOK.md, "Opening an <span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Request</span>") says an Urgent Request is opened only through
  `python3 tools/urgent.py`, and that the tool refuses a repeat of an open issue: "comment there instead". It names no
  worker as the one who posts, and this task's packet says the main session posts. So I post nothing.
- #315, the build 7 card, is closed: Jeremy chose A at 7:15 AM ET on 11-16 (c6916132306), so build 7 is internal-only
  and installable from TestFlight, and its card takes no more steps. Build 7 (0.1, bb4b184e34) carries the tap fix
  (T-3671 afaaa915d and T-3667 a3415f7c8, already in build 6) and the settings Page a widget tap pushes (T-4468
  23788b915a, new in build 7).
- **Recommended: fold this into T-4536's size-<span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> request**, the other phone work on build 7, which is not posted
  yet: one Urgent Request, one install, one sitting. If that request goes up first, post the section below on it as a
  comment; if it is not going up soon, open this alone through `tools/urgent.py` with the section below as its body.
- Board: posted alone as #319 (not folded into T-4536's request); its wait on #319 was cleared when #319 closed
  (requests_close sweep, 11-16 9:29 PM ET). T-3765 no longer waits on the Investors: it waits on T-4615 (see the top).

## What the company checked itself (Mac mini, Simulator)

A UI test, `WidgetKitCheckTests.testSReleaseWidgetTapOpensItsScreen` (runs only with `TEST_RUNNER_TAP_CHECK=1`),
taps a placed widget on the Simulator's Home Screen, so WidgetKit itself hands the widget's link to the app. It builds
the Release configuration (EditorBench scheme, the same Release settings as build 7 but no tester flags) and first
reads the installed app's Info.plist: build 7, no URL scheme registered, so the Debug-only scheme the older window
test leans on is not there. Each tap starts from another screen (another file, or no page), so a tap that only brings
the app forward fails. Built from main at 382010e28e: since build 7 (bb4b184e34) the app's tap, window and Gallery
code differs by one line (T-4286's font seed, a no-op in this build). Runs on 11-16 through `tools/xc.sh`, on private
Simulators made for this check, iOS 27.0:

- **iPhone 17e: passed, all four taps** (1:16 PM ET, 1 test, 0 failures; then again on the final test code,
  2:25 PM ET, 1 test, 0 failures). Countdown, cold and backgrounded: its Events page opened, once (since T-4468 a widget tap opens the
  premade's settings page over its detail sheet; the draft's steps below say so). The script widget, cold and
  backgrounded: its main.py in the editor, with that run's token in it. Shots and printed lines:
  `pywidget/docs/screenshots/t3765/iphone-*`.
- **iPad Air 11-inch (M4): every tap opened the right screen, but a backgrounded tap with two windows open made a third
  window** (2:14 PM ET, 1 test, 2 failures, both window counts). See the iPad section below.

Not checkable here: the app Apple signs and TestFlight installs, iOS on real hardware, the Lock Screen and StandBy.

## What only a phone can show

The Simulator's Home Screen is not a phone's. Three things stay unproven until a person taps on a real iPhone:
the TestFlight build itself (signed by Apple, installed by TestFlight, never by Xcode), iOS on real hardware handing
the widget's link to the app, and the Lock Screen and StandBy taps, which ask for an unlock first (review note L6).

**Not asked of the phone step:** the time a script-widget tap takes to scan every project file (Pernille's L3 in
ops/board_notes/T-3765.md) needs a library of about 1,000 files, which the Investors' phone does not have, so it is
the company's own Release Simulator measure, board line T-4638, and the steps below leave it out.

**iPad:** the Investors have no iPad and none is bought (ruling 6:27 PM ET on 11-14, #299: every iPad step of a phone
proof runs in the Simulator, and the closing note says so). So the iPad part, Windowed Apps with two windows, is the
company's own Simulator step and is **not** asked of the Investors below. On the Simulator, the iPad part ran on 11-16 and **found a fault**, fixed and seen on the Simulator on 11-23 (T-4615, below).
Windowed Apps was set in Settings and read back; a second window (tip_splitter.py) was opened; the widget was tapped
cold and backgrounded. Each tap opened the right screen (Countdown's Events page, the script's main.py), but:

- **Backgrounded, two windows open, both taps made a third window** instead of using an open one: after the
  Countdown tap the app had a third window (Gallery, Console, Console where Console, Console had been); after the
  script tap, a third window (main.py, Console, main.py where Console, main.py had been). The printed lines show the
  count, not which window is new (T-4698 L1); T-4615's red run prints each window's editor text to say that. That is the very thing T-3667's fix (`handlesExternalEvents(preferring:)`) was meant to
  stop, and its Debug test (a link opened through the Debug-only URL scheme) passes: WidgetKit's real tap in Release
  takes a path that test does not cover, which is review finding F4's worry, now seen.
- **Fixed and seen (T-4615, 11-23):** the path is SpringBoard's icon launch carrying the widget's link as an action, which
  no open window matching `"pywidget:"` accepted (T-4890's SceneResolution finding); IDEScene now prefers and allows
  `"*"` (T-4890, 7a7fb27930). On the iPad Simulator in Windowed Apps, Release: with `"pywidget:"` put back for one run
  the backgrounded taps made a third window, and the editor lines show it is new (the two windows from before keep
  their files, the third is the Gallery, then the tapped script's main.py): `ipad-run-windows-t4615-red.txt`. With
  `"*"` as on main, 2 windows after each backgrounded tap and 0 failures; the premade tap reused the dice_roller
  window, the script tap the Tip splitter one: `ipad-run-windows-t4615-green.txt`.
- **Cold:** after the app was ended, the system brought back one window, not two, so the cold tap met one window and
  added none. The two-window cold case was not reached on the Simulator.
- Evidence: `pywidget/docs/screenshots/t3765/ipad-*.png` (each shot is the front window only) and
  `ipad-run-windows.txt`, the window-by-window count the test printed.
- The fix was board line T-4615 ("Widget taps on iPad reuse an open window", P1); its test passed on the iPad Simulator
  on 11-23 (above), as the ruling says it must. Full Screen Apps and Stage Manager are not run (T-5283).

## The section to post (its own request, or a comment on T-4536's)

---

**A check on build 7: does tapping a widget open the right screen?**

Since build 6, tapping a widget should open that widget's own screen in the app; in build 7 a premade widget opens
its own settings page (for Countdown: Events), and your own script widget opens its file. Before this fix (your
report on #41), every tap opened the Console. Our tests pass, and we checked the same build setup on the Mac's iPhone Simulator, but only a real
iPhone with the TestFlight build shows whether iOS hands the tap to the app there. We will not tell you the fix works
until this check passes. (iPad is not part of this: on the iPad Simulator the taps open the right screen; an extra
window they also opened is fixed in our code and was seen fixed on the iPad Simulator on 11-23.)

What is needed: about 10 minutes on the iPhone, with build 7 installed from TestFlight (version 0.1, build 7). Please
delete any other PyWidget copy first, so the app the taps open is the TestFlight one.

**Before you start: turn on screen recording**
1. Settings > Control Center: if "Screen Recording" is not there, add it.
2. To record: swipe down from the top-right corner, tap the round Record button, and wait for the 3-second count.
3. To stop: tap the red mark at the top of the screen, then Stop. The recording is saved in Photos.
4. One recording for each part below keeps each file small. GitHub takes a video attached to a comment if it is not
   too large; if one is refused, trim it in Photos (Edit) or tell us and we find another way.

**Part 1: a premade widget**
1. Add the PyWidget widget to the Home Screen (small size), long-press it, tap Edit Widget, and choose **Countdown**.
2. **Cold:** open the app switcher (swipe up from the bottom and hold) and swipe PyWidget away, so it is fully closed.
   Start recording. Tap the Countdown widget. Expected: PyWidget opens on **Countdown's Events page** (a preview of
   the widget, then "Add Event"), not the Console. Stop recording.
3. **In the background:** in the app, tap the back arrow at the top left, then Done, to close that page. Go to the
   Home Screen with a swipe up (do not close the app). Start recording. Tap the Countdown widget again. Expected:
   Countdown's Events page again, shown once. Stop recording.

**Part 2: your own script widget**
1. In PyWidget, tap the folder button at the top left (Projects), tap New Project, name it **tapcheck**, open its **main.py**, delete what is there and
   type these three lines exactly:

   ```
   import pywidget_ui as ui
   widget = ui.Widget("tapcheck", name="Tap check", families=["systemSmall"])
   widget.render(lambda ctx: ui.VStack(ui.Spacer(), ui.Text("Tap check"), ui.Spacer()).padding())
   ```

2. Tap the folder button at the top left (Projects): that saves the file. Then open any other file (for example another project's main.py), so the app is
   not showing tapcheck's file.
3. On the Home Screen, long-press the PyWidget widget, Edit Widget, and choose **tapcheck**. It should draw "Tap check".
4. **Cold:** swipe PyWidget away in the app switcher. Start recording. Tap the widget. Expected: PyWidget opens with
   **tapcheck's main.py** in the editor (the three lines above). Stop recording.
5. **In the background:** in the app, open another file again. Swipe up to the Home Screen without closing the app.
   Start recording. Tap the widget. Expected: tapcheck's main.py again. Stop recording.

**Then reply here** with the four recordings (or as many as GitHub takes) and one line for each of the four taps:
what opened. If any tap opens the Console, the Projects list, or nothing new, that is the answer we need most; say
which one.

What it blocks: telling you on #41 that a widget tap opens its own screen (T-3765, under the premades work T-4180).
Until this passes, that fix stays "not confirmed on a phone".

The reply that settles it: the four lines (and the recordings), or "B" with what you saw if build 7 would not install
or the app crashed.

---
{% endraw %}

</div>
