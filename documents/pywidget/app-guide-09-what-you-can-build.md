---
layout: "default"
title: "App guide, part 9: What you can build"
section: "documents"
description: "What a script can do: refresh, memory and what it can reach."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-guide/' | relative_url }}">← App Guide</a><a href="{{ '/documents/pywidget/app-guide-09-what-you-can-build.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Guide</span><span>Day 9 · Fri Oct 30</span><span><code>pywidget/app-guide-09-what-you-can-build.md</code></span></div><h1>App guide, part 9: What you can build</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Part 9 of 10 of the pywidget app guide. The index, with the reading notes, is [app-guide.md](app-guide.html).

Written 2026-11-02 (T-0647) from the answer the company gave Investor an Investor on issue #41, and checked against the repository on that date. Nothing here was run on a real iPhone: that waits on #100. Marks used below: **works in v1** means the code and a test in the repository back it (named in each line); **[unverified]** means a widely reported figure, or a claim I could not confirm in the code today; **planned 1.1**, **later** and **out of reach** are as in section 4. The Simulator pictures in section 8.4 are the only renders used; this section adds none.

## 9.1 Refresh, and the refresh button

A widget's Python runs in the app, and the widget then redraws the saved result. A run starts when:

- **You open the app.** Works in v1 (the run script writes the widget's picture; section 5, T-0512).
- **A Shortcuts automation runs "Refresh Widgets"**, for example at 7:00 or on arriving at work. Works in v1: the app registers that action (`RefreshWidgetsIntent` in `ios/App/Intents/RunScriptIntents.swift`). Whether an automation fires on time is [unverified] until a device run.
- **iOS's own background refresh, about every 15 minutes or more.** [unverified]. I found no background-task code in the app today, so treat it as planned, not built. iOS decides when, and may not run it.
- **A pre-planned schedule of pictures.** A script can hand iOS several future pictures at least about 5 minutes apart (Apple). The World clocks and Countdown premades do this (`clocks.py`, `countdown.py`; `tests/widgets/test_clocks_after_horizon.py`).

Apple's budget is about 40 to 70 refreshes a day for a widget you look at often [unverified]. Clocks and timers tick without using any of it.

**A refresh button inside a widget is planned 1.1.** Apple says a tap on a widget button does not use the refresh budget. On iOS 27 and later, a tap may run the script in the background without opening the app [unverified, still to be tested on a device]. On iOS 18 to 26 a tap can change the widget's saved state at once with no Python (tick a habit, move a counter), but fetching new data means opening the app. Today's widgets have no buttons: the Habit tracker's rows open the app instead (`habits.py`, "no widget buttons in v1"). Detail: [`docs/research/L5-interactivity.md`](l5-interactivity.html).

A background run gets seconds, not minutes: about 30 seconds [unverified]. Plan a script to fetch and summarise, not to grind.

## 9.2 Memory

- The widget itself gets a small allowance, about 30 MB [unverified, the usual figure]. So pywidget never runs Python inside the widget (ADR-007); the widget only draws a saved description. Measured on the Simulator: 7.7 MB with nothing running.
- Python runs in the app, which has far more room. A script loading networking, SSL, SQLite and decimal maths peaked at 18.5 MB on the Simulator (a measurement, not a phone figure). Memory is not the ceiling for scripts. Time is.
- The widget's memory limits what it can draw: long timelines and big pictures. Text, symbols, gauges and shapes cost almost nothing.

## 9.3 What a script can reach


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 9.3 What a script can reach, scrolls sideways" style="--tw:640px" markdown="1">

| Reach | Status |
|---|---|
| The internet: web APIs, JSON, pages whose terms allow it | Works in v1, during app runs. The GitHub premade fetches through the app's http helper and keeps the last reading when offline (`github.py`; `tests/widgets/test_http_bundle.py`). |
| Files kept in pywidget: CSV, JSON, text, SQLite | Works in v1 (the CSV summary and word count examples). |
| Files from the Files app or iCloud Drive | Import a copy: works in v1 [unverified on a device]. Link a live folder: planned 1.1. |
| Location, steps, notifications, clipboard | Works in v1 with the person's permission, in the app and never in the widget (section 3.3). Real sensors [unverified] until a device run. |
| Shortcuts in and out | Works in v1 for running a script from Shortcuts (section 3.3). Passing input and returning a result back is in the code; three recipes use it (section 9.5); [unverified] until the end-to-end run. |
| numpy, Pillow, matplotlib | Not in 1.0. Planned for 1.1. |
| Calendar, Reminders, Health, contacts, photos | Read by PyWidget itself: later, each with its own permission and review. Calendar and Reminders through a Shortcut, with no PyWidget permission: section 9.5. |
| Other apps' private data, constant background tracking, live streams, code downloaded and run unseen | Out of reach. iOS refuses it, or App Review does (Guideline 2.5.2). |

</div>


## 9.4 The list of widgets you could build

Sample scripts: `widgets/premade/` (12, shipped inside the app), `widgets/gallery/` (15 reference designs), `examples/` (10 plain scripts), `widgets/recipes/` (3 Shortcut recipes, not yet in the app; section 9.5). Tests: `tests/widgets/`, `tests/examples/`. I checked that each file exists. I did not re-run the tests for this section.

**Live information from the web**


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 9.4 The list of widgets you could build, scrolls sideways" style="--tw:960px" markdown="1">

| Idea | Status | Sample |
|---|---|---|
| GitHub repository: stars, open issues, last push | Works in v1 | `widgets/premade/github.py` |
| "Is my site up?": status code and time for three URLs, with the stale mark after 15 minutes | Works in v1 as a script check; the widget is a reference design | `examples/http_status.py`, `widgets/gallery/endpoints.py` |
| Python package updates, from PyPI once a day | Reference design, planned | `widgets/gallery/package_updates.py` |
| Weather from a free API, drawn your own way | Works in v1 as a script [unverified, no weather sample exists]; the planned picture is yours to design | none yet |
| Transit departures as a pre-planned schedule | Later; no sample | none |
| News headlines from an RSS feed, API quota meters | Works in v1 as a script [unverified]; no sample | none |

</div>


**Your own files and data**


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 9.4 The list of widgets you could build, scrolls sideways" style="--tw:960px" markdown="1">

| Idea | Status | Sample |
|---|---|---|
| Habit tracker with streaks (Pro) | Works in v1 as rows that open the app; tap-to-check buttons planned 1.1 | `widgets/premade/habits.py` |
| Cards to review, reading progress | Reference designs, planned | `widgets/gallery/review_due.py`, `reading.py` |
| A CSV column as a sparkline | Reference design; the summary script works in v1 | `widgets/gallery/sparkline.py`, `examples/csv_summary.py` |
| Pinned note, a random quote of the day | Works in v1 (quote premade); pinned note is a reference design | `widgets/premade/quote.py`, `widgets/gallery/pinned_note.py` |
| Last lines your script printed | Reference design | `widgets/gallery/script_output.py` |
| A small SQLite log written to by Shortcuts or an NFC tag | Works in v1 for the file part [unverified for the trigger]; no sample | none |

</div>


**Calculation and time**


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 9.4 The list of widgets you could build, scrolls sideways" style="--tw:960px" markdown="1">

| Idea | Status | Sample |
|---|---|---|
| Countdowns to your events | Works in v1 | `widgets/premade/countdown.py` |
| World clocks | Works in v1 | `widgets/premade/clocks.py` |
| Sunrise and sunset, from location | Works in v1 [unverified, needs a device for location] | `widgets/premade/sun.py` |
| Day progress rings | Works in v1 | `widgets/premade/progress.py` |
| Moon phase, month at a glance, binary clock, number of the day, word and character of the day | Reference designs | `widgets/gallery/moon.py`, `month.py`, `binary_clock.py`, `number_day.py`, `word.py`, `character.py` |
| Date and unit maths, tip splitting, dice | Works in v1 as scripts | `examples/date_calculator.py`, `unit_converter.py`, `tip_splitter.py`, `dice_roller.py` |

</div>


**Device and place**


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 9.4 The list of widgets you could build, scrolls sideways" style="--tw:877px" markdown="1">

| Idea | Status | Sample |
|---|---|---|
| Steps and floors toward a goal | Works in v1 [unverified on a real phone] | `widgets/premade/steps.py` |
| Altitude, distance to a saved place | Works in v1 [unverified on a real phone] | `widgets/premade/altitude.py`, `distance.py` |
| Storage left | Works in v1 | `widgets/premade/storage.py` |
| Shortcuts launcher | Works in v1 | `widgets/premade/shortcuts.py` |

</div>


**Planned 1.1:** counters, toggles, next-page cycling, and a refresh button (fresh data on iOS 27 and later); a focus timer that counts down (`widgets/gallery/focus_timer.py`, a 1.1 reference). **Later:** Live Activities on the Lock Screen and Dynamic Island, and full-screen Home Screen tools beyond the console. **Charts:** native sparklines and gauges are in the renderer now; matplotlib pictures wait on the package decision, and look flatter on the tinted Lock Screen.

**Out of reach, whatever the version:** second-by-second live data in a widget, except clocks and timers; anything running all the time in the background; other apps' private data; scripts downloaded from the internet and run without the person writing or pasting them.

## 9.5 Shortcut recipes: other apps' data in a widget

Written 2026-11-05 (T-2376, Pernille). PyWidget cannot read another app's data, and should not try: iOS keeps each app's data to itself, and App Review rejects apps that reach past that (Guidelines 2.5.1 and 2.5.2). The Shortcuts app is the bridge Apple provides. A Shortcut reads the data with Apple's own actions (the Shortcuts app asks you for that permission, not PyWidget), then hands it to a PyWidget script as plain text with **Run Script with Input**. The script saves the text in its own folder, the one the widget part reads, and **Refresh Widgets** redraws the widget. PyWidget never sees your calendar or reminders, only the text the Shortcut sends. Nothing leaves the iPhone.

The three scripts are in `pywidget/widgets/recipes/` (`next_event.py`, `reminders_today.py`, `pinned_share.py`). Each one does two jobs. Run from Shortcuts, it saves what came in and answers with one line, such as "Saved: Book club". Run as a widget, it draws what was saved. The host tests (`pywidget/tests/widgets/test_shortcut_recipes.py`, 24 tests, Python 3.9 and 3.13; one runs only on 3.11 and later) feed each script its Shortcut's sample text and check the widget picture in every size.

**What is proved, and what is not.** On the Simulator (T-2857, `ios/Tests/ShortcutRecipeTests.swift`), each script was saved in the App Group as a widget, run through PyWidget's **Run Script with Input** with the text its Shortcut sends, then run as a widget the way **Refresh Widgets** runs it. The widget tree it wrote shows the text, in each case. Three things that run proved: the Shortcut run and the widget run use the same folder (the one a script's `files.shared()` names, which is the widget's id as saved in the library), so what the Shortcut saves is what the widget reads; **the name you save the script under must equal the id in its `ui.Widget(...)` line** (`next_event`, `reminders_today`, `pinned_share`); with another name the Shortcut still saves, but the widget run stops with "this script defines no widget with id ..." and draws nothing; and the app carries the `pywidget.context` module these scripts import. **Not proved:** the Shortcuts app itself and the Calendar and Reminders actions; the device run (T-0757) proves them. Refresh Widgets redraws the widgets that are on a Home or Lock Screen; a widget not yet placed is not redrawn. The app does not offer these scripts as ready-made starting points yet; until then, each script goes in as your own widget, saved under the name above.

**Which step names are checked.** PyWidget's own two actions are checked: **Run Script with Input** (with its Script and Input boxes) and **Refresh Widgets** are the names in the app's code (`ios/App/Intents/RunScriptIntents.swift`, `ios/Shared/RefreshWidgetsIntent.swift`). Every other name in the steps is Apple's: Get Upcoming Events, Text, Date Format: ISO 8601 and Include ISO 8601 Time, Find Reminders and its filters, Combine Text, Show in Share Sheet, the Share Sheet input line, and Stop and Respond. Those are still written from memory for iOS 17 and 18 and are not checked [unverified]. On 2026-11-07 Wrenna tried to check them against Apple's Shortcuts User Guide (support.apple.com/guide/shortcuts), and the company's page reader refused it. Apple's site terms forbid automated reading, and the Investors have opened only developer.apple.com and apple.com/legal to the company (their <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> of 2026-10-26). So no Apple page was read and none is saved, and nothing here was changed by guesswork. The Simulator run (T-2857) did not open the Shortcuts app, so it checked none of them. These names will be checked on the device run (T-0757), where the Shortcuts app shows Apple's own words. Apple's guide can check them too, if the Investors open its Shortcuts pages to the company the same way.

**Recipe 1: Next event (Calendar).** The widget shows your next event, its time and place, and how long until it starts. It changes by itself when the event starts ("Until 8:00 PM") and when it ends.

1. In Shortcuts, make a new shortcut called "Next event".
2. Add **Get Upcoming Events**, set it to 1 event, from all calendars.
3. Add **Text** and type four lines, putting each value in from the event (tap the event, then pick the detail): `Title:` then Title; `Starts:` then Start Date; `Ends:` then End Date; `Location:` then Location. For each date, tap it, choose **Date Format: ISO 8601**, and turn on **Include ISO 8601 Time**. The script refuses other date formats and says why, so the widget never shows a misread time.
4. Add **Run Script with Input** (PyWidget). Script: next_event. Input: the Text.
5. Add **Refresh Widgets** (PyWidget).
6. Optional: in Automation, make a personal automation (for example, Time of Day, 7:00, daily) that runs "Next event". The widget shows "Updated" with the time of the last run, and marks itself out of date after 12 hours, because the calendar can change at any time.

With no upcoming event, the widget says "No upcoming events". An all-day event has no all-day word in v1: it shows as "Today 12:00 AM" and says "Ended" at 11:59 PM.

**Recipe 2: Due today (Reminders).** The widget shows how many reminders are due today and the first few by name.

1. Make a new shortcut called "Due today".
2. Add **Find Reminders**. Filters: Is Completed is No, and Due Date is Today. Sort by Due Date.
3. Add **Combine Text**: combine the Reminders with New Lines (one title per line).
4. Add **Run Script with Input** (PyWidget). Script: reminders_today. Input: the Combined Text.
5. Add **Refresh Widgets** (PyWidget).
6. Optional: a daily automation at 7:00, as in recipe 1.

A reminder whose title has a line break in it shows as two rows and counts twice, because Combine Text gives the script no way to tell them apart. At midnight the widget stops calling the list today's and says "New day" until the Shortcut runs again. A widget cannot ask Reminders itself; only the Shortcut can.

**Recipe 3: Pinned (any app's Share button).** Select some text in Notes, Mail or Safari, or share a web page, tap Share, and pick "Pinned". The widget shows the text, or for a link, the site's name and the address.

1. Make a new shortcut called "Pinned". In its details, turn on **Show in Share Sheet**, and set it to receive Text and URLs.
2. The shortcut starts with **Receive Text and URLs input from Share Sheet**; set "If there's no input" to Stop and Respond.
3. Add **Run Script with Input** (PyWidget). Script: pinned_share. Input: Shortcut Input.
4. Add **Refresh Widgets** (PyWidget).

An empty share is refused and the old pin stays. The pin keeps up to 1,000 characters. A link is shown, never opened or fetched, and drawn without anything after a ? or #, or a name and password before the site, since those can carry a sign-in token and a widget can be read on a locked screen.

**Limits.** A run from Shortcuts has 20 seconds (bridge contract). If PyWidget is busy with another script, the Shortcut stops with "PyWidget is already running a script". When the iPhone has not been unlocked since it started, the script cannot open its folder and the Shortcut reports that. iOS decides when a widget redraws, so Refresh Widgets can take a moment.
{% endraw %}

</div>
