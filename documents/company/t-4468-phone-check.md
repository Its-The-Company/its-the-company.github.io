---
layout: "default"
title: "T-4468: the phone check for the premade settings pages"
section: "documents"
description: "Give the widget up to a minute to change after you leave the app. If it has not changed after a minute, write that down with the time; do not keep retrying."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4468-phone-check.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 29 · Thu Nov 19</span><span><code>ops/plans/T-4468-phone-check.md</code></span></div><h1>T-4468: the phone check for the premade settings pages</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Written by Idris, 2026-11-19. This is the step T-4468's Done when asks for ("seen: on the iPhone, a person sets
Countdown's event and Sun's place from the app and the placed widgets show them, and each of the other five takes its
input the same way"). A person runs it on a real iPhone; the company cannot, since the Simulator is not a phone. The
steps below were not run by anyone yet. Everything before the phone is done: the build (slices 1 to 3a, the file lock,
the Habits tap), its unit tests on the runner, and the UI test of the three ways in (T-4516, PremadePageUITests, green
in the daily full suites, ops/runs/t4516-runner-result.txt).

## Before you start

- **Which build.** The TestFlight build that T-5050 sends, the first with Developer mode, or a later one. It goes
  out only once the review lines that hold TestFlight are closed (see "What still holds TestFlight" at the end), so
  it carries everything this check looks at (main at or after cb4bce57e4, 15 Nov, the Habits tap). Its request card,
  "Install the Developer mode build from TestFlight and try Pro widgets on the iPhone"
  (ops/requests/t4865-developer-mode-phone-card.md), names its build number; write it down. This check uses the same
  build, so one phone session covers both cards.
- **Pro.** In this build four of the seven sit behind Pro: World clocks, Habit tracker, GitHub repository and Shortcuts
  launcher (pywidget/runtime/pro-flags.json). A locked premade has no settings row, by design. So unlock Pro first,
  with nothing bought: open PyWidget, tap the **More** button (the round "..." at the top right), then **Settings**.
  The **Developer mode** group is just below the Pro group. Check its row **This copy** says **TestFlight**, then
  turn **Unlock Pro** on. The four now show their settings rows in the Gallery. If there is no Developer mode group,
  or no Unlock Pro switch in it, do the free three (Countdown, Sunrise and sunset, Distance), then write down what
  Settings showed and that the other four were locked, and stop there. (T-4692 will make every premade work for
  everyone, with only editing a Pro one's code behind Pro; until it lands, the lock above is what you see.)
- **Order, with the Developer mode card.** That card's step 5, **Reset to first launch**, erases everything the app
  holds, including the events, places and lists set here, and turns Unlock Pro off. Run this whole check before that
  step, or after it turn Unlock Pro on again and start from section 1.
- **Location.** Sunrise and sunset can and Distance must use the phone's location. When iOS asks, choose
  **Allow While Using App**.
- **Record it.** Turn on Screen Recording in Control Center before step 1 and keep it running through each premade,
  or take a screenshot at every "Check" below. Send the recordings or shots with the answers; they are the evidence.
- **How to place a PyWidget widget** (used in every section): on the Home Screen, touch and hold an empty spot, tap
  **Edit** (top left), then **Add Widget**. Search for **PyWidget**, pick the size named in the section, and tap
  **Add Widget**. Tap **Done**. The new widget says "Choose a widget". Touch and hold it, tap **Edit Widget**, tap
  the **Widget** row and choose the premade by name. Tap outside the panel to close it.
- **How to open the Gallery:** open PyWidget, tap the **More** button (the round "..." at the top right), then
  **Gallery**. Each premade is a tile; tapping a tile opens its sheet. Under the size chips the sheet has one row with
  the page's name and a short summary (for Countdown: "Events, No events yet"). Tapping that row opens the settings
  page. The page saves as you go; there is no Save button on the page itself, only in the sheets that add an item.

Give the widget up to a minute to change after you leave the app. If it has not changed after a minute, write that
down with the time; do not keep retrying.

## 1. Countdown: an event

1. Open the Gallery, tap **Countdown**. Check: the sheet shows the row **Events** (with "No events yet" if you have
   none).
2. Tap the **Events** row. Check: a page titled **Events** with a preview of the widget at the top and an
   **Add Event** row.
3. Tap **Add Event**. Name: `Phone test` (at most 16 characters). Date: three days from today (leave Time off).
   Tap **Save**. Check: the event is listed under Events; the preview at the top shows "Phone test" and 3 days.
4. Tap the back button. Check: the sheet's row now reads **Events, 1 event** (or one more than before).
5. Place a **Medium** PyWidget widget and choose **Countdown** in Edit Widget (see "How to place").
   Check: the widget shows **Phone test** and **3 days**.
6. Tap the widget. Check: PyWidget opens on the Gallery with Countdown's **Events** page already showing.
7. Optional, the refusal: tap **Add Event** again, name it `Phone test` again, tap Save. Check: it is refused with
   "You already have an event called "Phone test"." Tap Cancel.

## 2. Sunrise and sunset: a place

1. In the Gallery, tap **Sunrise and sunset**, then the **Place** row (summary "No place yet").
2. Leave **Use Current Location** off. Tap the **Choose a Place** row. Type `Lisbon` in the City field and tap the
   first **Lisbon** (its line ends in Portugal). Check: the page shows Lisbon as the place; the preview shows Lisbon's sunrise and
   sunset with the name **Lisbon**.
3. Optional: put the phone in Airplane Mode before typing. Check: Lisbon is still found (the city list is on the
   phone; nothing is sent).
4. Back to the sheet. Check: the row reads **Place, Lisbon**.
5. Place a **Small** PyWidget widget and choose **Sunrise and sunset**.
   Check: the widget shows the name **Lisbon** and times that match Lisbon's sunrise or sunset today, written in
   your phone's own time (Lisbon is on UK time in winter, so from New York they read about 5 hours later than
   Lisbon's clock). The widget must not say "No place set".
6. Back on the page, turn **Use Current Location** on and allow location if asked. Check: within a minute the widget
   shows your own area's times (its name reads "Here"). Turn it off again; the widget goes back to Lisbon.

## 3. World clocks: cities (Pro in this build)

1. In the Gallery, tap **World clocks**, then the **Cities** row. Check: four cities are listed, London, Tokyo,
   Sydney, Los Angeles (what the widget shows before any change).
2. Tap **Sydney**, tap its **City** row, search `Lisbon`, choose it. Set Name to `Lisbon`. Tap **Save**.
   Check: the list reads London, Tokyo, Lisbon, Los Angeles.
3. Place a **Medium** PyWidget widget and choose **World clocks**. Check: it shows **Lisbon** with Lisbon's time
   (the same time as London) in place of Sydney.
4. Optional: try to delete the last city when only one is left. Check: it cannot be deleted; the footer says
   "A clock needs at least one city."

## 4. Distance to a saved place: places

1. In the Gallery, tap **Distance to a saved place**, then the **Places** row.
2. Tap **Add Place**, then the **Place** row. Check: **Use Current Location** is the first row above the search.
   Search `Lisbon`, choose it; Name: `Lisbon`. Tap **Save**.
3. Tap **Add Place** again, then the **Place** row, then **Use Current Location** (allow location if asked). Name:
   `Here`. Tap **Save**. Check: both places are listed.
4. Place a **Medium** PyWidget widget and choose **Distance to a saved place**. Check: it lists **Lisbon** with a
   distance that is right for where you are (from New York, about 5,400 km), and **Here** at about 0 km.
   It must not say "No saved places". "Open PyWidget once to take a fix" means the app has no location yet: open
   PyWidget once, then look again.
5. Optional: on the page change **Units** to Miles. Check: the widget's distances change to miles.

## 5. Habit tracker: habits (Pro in this build)

Steps 4 to 13 were added on 2026-11-22 (T-5318, from the review of the Habits tap, T-5192 M2): with one habit the
row is on screen already, so "scrolled to Walk" passes whether or not the scroll works. What the app does on a
Habits row's tap, read from its code (SettingsPage.showFocus): the Habit tracker sheet opens with the Habits page
already showing; about a third of a second (350 ms) later the page scrolls to the tapped habit, with a short smooth
movement (0.3 s), bringing its row as near the middle of the screen as the list can scroll. At the same moment the
row gets a 2-point accent-coloured border inside its own background, which stays 1.5 seconds and then fades out
quickly (0.2 s). VoiceOver's cursor moves to that row. A habit the file no longer has opens the page at the top, with
nothing outlined and no message. **Between taps** (every step from 6 on except 8 and 9): close the sheet first with
**Done** at its top right, so each tap opens it fresh.

1. In the Gallery, tap **Habit tracker**, then the **Habits** row.
2. Tap **Add Habit**. Name: `Walk`. Under **Check-ins**, tap today (the last of the seven days) so it fills.
   Tap **Save**. Check: Walk is listed with 1 check-in.
3. Optional: tap Walk, tap yesterday under Check-ins, Save. Check: the count goes to 2.
4. Add five more the same way, with no check-ins: `Read`, `Water`, `Stretch`, `Journal`, `Run`. Check: six habits
   are listed, Walk first and Run last (if not, tap **Edit** at the top and drag Run to the bottom), and **Add Habit**
   is greyed out (six is the most the list takes). Now look at the page without scrolling: Run's row must be below
   the bottom edge of the screen. If all six fit, raise the text size (Settings, Accessibility, Display & Text Size,
   **Larger Text**) until Run is off screen when the page is opened, and write down the size you used.
5. Place a **Large** PyWidget widget and choose **Habit tracker** (a Medium one shows only the first three). Check:
   it shows all six, **Walk** at the top with today checked and **Run** at the bottom.
6. From a cold start. Close PyWidget fully: swipe up from the bottom edge and pause to show the open apps, then swipe
   PyWidget's card up. Tap **Run** on the widget. Check: PyWidget opens on the Habits page (its Back button leads to
   the Habit tracker sheet), the page moves down to Run on its own, and Run's row is outlined in the accent colour
   for about a second and a half. If the page stays at the top with nothing outlined, write that down: it means the
   app's wait was too short for a cold start.
7. From the background. Close the sheet with **Done**, go to the Home Screen (do not close the app), and tap **Run**.
   Check: the same as step 6.
8. A second habit with the page still up. After step 7, leave the Habits page showing at Run and go to the Home
   Screen without tapping Done. Tap **Walk**. What the tap should do: the page moves up to Walk and outlines it.
   What the review found by reading the code (T-5192 M1, fixed by T-5317, open as of 2026-11-22): the page stays
   where it was and nothing is outlined. Write down which you see.
9. The same, from the sheet's summary. Tap the page's Back button so the Habit tracker sheet shows, go to the Home
   Screen, and tap **Read**. What the tap should do: the Habits page opens again at Read, outlined. What the review
   found (the same M1): the sheet stays as it was and the page is not opened. Write down which you see, then tap
   **Done**.
10. Reduce Motion. Turn on Settings, Accessibility, Motion, **Reduce Motion**. Tap **Run** on the widget. Check: the
    page shows Run with no scrolling movement (it jumps there), and the outline appears and goes after about a
    second and a half with no fade either way. The sheet's own arrival is iOS's and may cross-fade instead of
    sliding; that is not part of this check. Turn Reduce Motion off again.
11. VoiceOver. In Settings, Accessibility, **Accessibility Shortcut**, choose **VoiceOver**, so three presses of the
    side button turn it on and off. Close the sheet, go to the Home Screen, press the side button three times. Touch
    **Run** on the widget once (VoiceOver reads it) and double-tap to open it. Check: VoiceOver's cursor lands on
    Run's row and it reads Run (with the number shown under the name, if any), then "Opens its settings."; it does
    not start at the page's title or the Back button. Write down the words it read. Press the side button three
    times to turn VoiceOver off.
12. A deleted habit. On the Habits page, tap **Run**, tap **Delete** and confirm ("Delete “Run”? Its check-ins are
    deleted too."). Tap **Done** to close the sheet and go straight to the Home Screen. If the widget still shows
    Run, tap it. Check: PyWidget opens on the Habits page at the top, nothing is outlined, and no message or alert
    appears. If the widget had already redrawn without Run, write "redrawn first" with the time; this check was then
    not reached (a typed pywidget:// link does not open a TestFlight build, so there is no other way in).
13. Put things back: Larger Text to your usual size if you changed it, and the Accessibility Shortcut as it was. The
    habits can stay or be deleted on the page.

On a Simulator, pywidget/ios/UITests/HabitsFocusUITests.swift (T-5542, 2026-11-23) does steps 4, 7 and 12 without a
phone: it writes six habits into the file, opens `pywidget://widget/habits/open?habit=<Run's id>` from the Home Screen
at Accessibility Large text, and checks that Run's row is on screen and outlined in the accent colour, then not; an id
the file does not hold opens the page at the top, with Run below the screen and nothing outlined. Steps 5, 6, 8 to 11
and the widget itself stay with the phone.

## 6. GitHub repository: a repository (Pro in this build)

1. In the Gallery, tap **GitHub repository**, then the **Repository** row.
2. Type `python/cpython` in the Repository field and tap return on the keyboard. Check: it is accepted. Then try `not a repo`. Check: it is refused with
   "Enter it as owner/name, like python/cpython." Put `python/cpython` back.
3. Place a **Small** PyWidget widget and choose **GitHub repository**. Check: within a few minutes (the widget asks
   GitHub at most every 15 minutes) it shows **cpython** with its star count. "Not read yet" means GitHub was not
   reached; write down the time and look again later. It must not say "No repository".

## 7. Shortcuts launcher: shortcuts (Pro in this build)

1. In the Shortcuts app, make sure you have a shortcut you can run safely, for example one that shows an alert.
   Note its exact name.
2. In the Gallery, tap **Shortcuts launcher**, then the **Shortcuts** row. Tap **Add Shortcut**, type the name
   exactly, pick a symbol. Tap **Save**. Check: the shortcut is listed. (The design gives this sheet a **Try It**
   row; as of 2026-11-22 the build does not draw one, so the tile in step 3 is the first place the name is tried.
   If a Try It row is there, tap it and write down whether the shortcut ran.)
3. Place a **Medium** PyWidget widget and choose **Shortcuts launcher**. Check: it shows a tile with that name and
   symbol. Tap the tile. Check: the shortcut runs.
4. Tap the widget's background (not a tile). Check: PyWidget opens on the Shortcuts page.

## What to send back

For each of the seven: passed or not, and for any "not", what the widget showed instead, with the time. The build
number and the iPhone model. The recordings or screenshots. Anything that surprised you, even if every check passed.

For the Habit tracker, one answer per step from 6 to 12, since each looks at a different part:
- Step 4: whether Run was below the bottom edge as the page opened, and the Larger Text size if you changed it.
- Steps 6, 7 and 10: whether the page moved to the tapped habit (or stayed at the top), whether its row was
  outlined and for about how long; for step 10, whether you saw any scrolling movement or fade.
- Steps 8 and 9: which of the two outcomes you saw.
- Step 11: the words VoiceOver read, and where its cursor was.
- Step 12: what the page showed, or "redrawn first" with the time.

## What still holds TestFlight (owners, as of 2026-11-22)

- Pernille: the review of T-4183 at 14765044 (T-5561). Nothing <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-landed goes to TestFlight with it open. The two
  reviews this list named on 11-19 are done: T-4921 (T-4516 at 54a0c7cb, a99dc30359, PASS with findings, which are
  T-5269 and T-5270) and T-5192 (the Habits tap at cb4bce57, 2d9c651f24, PASS with findings, which are T-5317,
  T-5318 and T-5319).
- Not holding TestFlight: Maren's confirmation of five page strings (T-5193, whose merge T-5561 covers); the second
  Habits tap with the page up (T-5317, open: steps 8 and 9 record which outcome the phone shows); the all-day event
  after travel (T-4835, Pernille, before the App Store release); the smaller review points (T-4639, T-4640, T-4641,
  Idris).
{% endraw %}

</div>
