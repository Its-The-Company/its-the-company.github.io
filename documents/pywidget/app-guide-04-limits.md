---
layout: "default"
title: "App guide, part 4: Limits and the decisions behind them"
section: "documents"
description: "What the app cannot do, the decisions behind each limit, and how fresh a widget can be."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-guide/' | relative_url }}">← App Guide</a><a href="{{ '/documents/pywidget/app-guide-04-limits.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Guide</span><span>Day 9 · Fri Oct 30</span><span><code>pywidget/app-guide-04-limits.md</code></span></div><h1>App guide, part 4: Limits and the decisions behind them</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Part 4 of 10 of the pywidget app guide. The index, with the reading notes, is [app-guide.md](app-guide.html).

Each limit has the record it comes from. Records are in pywidget/docs/decisions/ (Documents > Pywidget > Build Plan > Decisions).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:960px" markdown="1">

| Limit | Why | Record |
| --- | --- | --- |
| Version 1 is the editor plus a narrow widget engine plus 12 premades. The full brief (web editor, block builder, marketplace and more) is several products. | One engineer and one test slot at a time. A first review of a code-running app is careful and one rejection costs about a week. | ADR-001 |
| Widget cut line, Days 22 to 23 (2026-11-12 to 2026-11-13; moved from Day 14 on 2026-10-29): widgets ship in 1.0 only if 8 of 12 premades draw correctly in every size and mode, a user-written widget reaches the Home Screen, and the design checks pass. Otherwise 1.0 is the editor only. | Decided in advance so the call is not made under pressure. If cut, Pro has little to sell, which is why the pricing proposal exists. | ADR-001, section 3.3 |
| Home Screen widgets are not live. Apple decides refreshes; Apple says a widget people look at often typically gets 40 to 70 a day, which roughly translates to every 15 to 60 minutes, though the intervals vary. The company states no refresh number for its widgets. Until Python in the widget part is proved on a phone, they show what the app last drew. Apple gives fewer if you rarely look. | Apple's published budget, in Apple's own words on its current developer page "Keeping a widget up to date" (read signed out on 26 October 2026 under the Investors' <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> of that day; the saved copy is in research/inbound/apple/). The page does not tie the figure to an iOS version; it is the page Apple publishes now, and Apple calls it typical, not a promise. The company's team believes test tools on the Mac <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> the limit, but that sentence is not on Apple's page, so it is a belief, not a fact; only a real phone gives real numbers. | ADR-007; research note L2; App Review notes, item A3 |
| Python in the widget part is built for version 1.0 but ships switched on only if it passes tests on a real iPhone. Until then, and if it fails, the widget part never runs Python. | Apple publishes no memory or time limit for the widget part. The figure of about 30 MB is widely reported but not confirmed by Apple or by us. A script that goes over is simply stopped, with no error anyone can see. The switch is set from real-phone numbers before the release candidate, never from the Simulator (the Mac's phone stand-in). Only light scripts run there: a short list of Python modules (dates, maths, JSON, text) is checked when a script is saved and again when it runs. | ADR-007, chair line 2026-10-29 8:03 AM |
| No buttons or toggles inside widgets in the first release; widgets are static pictures that update over time. | Cut to 1.1 to protect the date (the description format already reserves room for them). | ADR-001 section 3.2; ADR-002 |
| A fixed set of bundled packages in version 1. No online installs and no browsing for packages. Install from a file is a stretch goal and is not in the app at HEAD (T-0212, class 1.1); it moves to 1.1 if not built. | Apple's rules on downloading code carry review risk; the bundled set is checked for licence and size. Compiled add-ons such as NumPy, Pillow and matplotlib are not in 1.0: native packages come in 1.1 (ADR-003 s4.1, 638f21ff). | ADR-003; ADR-006 |
| No marketplace, gallery of other people's code, or sharing in the app. The 12 premades are inside the app; any script exports as a readable file. | Apple's rule on apps that run code from other people is unclear and risky. A web gallery comes after approval, an in-app one much later. | ADR-006 |
| Location only while the app is open; a distance widget may show an old reading, and says when it was taken. | Asking for "always" location in a first review would raise the risk. | ADR-001 (revised table) |
| No compatibility layer for another app's scripts. | Needs a legal review and a ruling on collecting public scripts, held until the Investors answer. | ADR-005 |
| Not in 1.0 (moved to 1.1 or later): debugger, code formatter, share-sheet "Run Python on this", interactive widgets, health/contacts/photos/calendar, Install from file if late, block builder, web editor, marketplace, Watch, Mac. | Each adds work, permissions or review risk. | ADR-001 section 3.2 |
| The editor is accepted only after its three checks. If they fail, a plainer editor replaces it. | Speed, screen-reader and iPad use must pass first. | ADR-004 |
| No account, no server, no analytics. Pro's contents and price are the Investors' call. | Keeps the privacy story simple and the review easy; Investor rule. | ADR-001; PROPOSAL-001 |

</div>


## 4.1 Widget freshness: the options and their limits

The Investors asked on 29 October 2026 (issue #41) for the freshest widget possible, delay accepted. The ruling is recorded in ADR-007 (chair line of 2026-10-29 8:03 AM). For a Home Screen widget, Apple's published budget is typically 40 to 70 reloads a day for a widget viewed often, which roughly translates to every 15 to 60 minutes, though the intervals vary (Apple's page, "Keeping a widget up to date"). That is Apple's typical range, not a limit we measured and not a promise; the company prints no refresh number (ADR-007, chair line 2026-10-30 5:14 PM). This guide does not call options A or B "live". Seconds-level content exists only as timers (time-derived text and bars) and Live Activities (Lock Screen and Dynamic Island). Where a number comes from the Simulator or a widely reported figure rather than a real iPhone, it is marked. The memory ceiling is unconfirmed until a real iPhone is tested (issue #100, signing).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4.1 Widget freshness: the options and their limits, scrolls sideways" style="--tw:1792px" markdown="1">

| Option | What it does | What it can't do | Limits to know | Needs the app running? | Delay to launch |
|---|---|---|---|---|---|
| **A. Python in the widget part** (ruled: built for 1.0, switched on by device tests) | Reruns the script whenever iOS wakes the widget (Apple's typical range is every 15 to 60 minutes, not a promise) and on a Refresh tap; any logic, any JSON feed | Go faster than Apple's budget; use heavy Python modules; survive a memory overrun (it falls back to the last picture with a badge) | Apple typically gives 40 to 70 reloads a day to a widget people look at often; the script gets 2 seconds; memory ceiling unconfirmed until #100; the first device test is whether the widget part can even load Python under a real signature | No | +8 days (submission Day 17 to Day 25, 2026-11-15), plus day-for-day if #100 lands after Day 21 |
| **B. Declared Swift steps** (building blocks in 1.0; "bound fields" only if A fails) | On every wake-up, fetches one URL and shows named fields; no Python. (Steps and a location fix in the widget part were cut from 1.0 on 2026-10-30 2:35 PM unless a second widget target lands by Day 21; ADR-007.) | Compute anything (a feed that needs more than "this field" is A's); change colours or layout by rules | Same 15 to 60 minute budget; only declared fields are fresh; public URLs with no key | No | +3 days on top of A if needed (Day 28, 2026-11-18); alone it would have been about +5 (Day 22) |
| **Timers in the view** (shipped) | Clocks, countdowns, "updated 4 min ago", progress bars that move by themselves, to the second | Show anything that isn't a function of time | None | No | 0 |
| **Shortcuts automation** (in the code; not measured on a phone) | Meant to run every widget's script fresh at times or events you pick ("7:00", "when I arrive") | Run without a one-time 2 to 3 minute setup | Needs iOS to launch the app briefly in the background; the Refresh Widgets action is in the code, but nobody has measured it on a phone from a background launch | Briefly, launched by iOS | 0 |
| **iOS background refresh** (ruled: built for 1.0; not built at HEAD, T-0793; cut check T-0795) | Would let iOS run the app briefly when it chooses | Promise a cadence or a time | iOS decides when; how often is known only from a real iPhone (#100) | Briefly, launched by iOS | 0; moves to 1.1 if not in the main code by Day 21 (2026-11-11), or not seen running on a real iPhone by Day 24 (2026-11-14) |
| **Live Activity, updated by the app** (1.1) | A journey or a run on the Lock Screen and Dynamic Island, updated for minutes at a time while the app works in the background, up to 8 hours | Sit on the Home Screen; last past 12 hours | 4 KB of data; no network inside the activity itself | Yes, intermittently | 0 to 1.0 (3 to 4 days in 1.1) |
| **Server push** (WidgetKit push, pushed Live Activities) | Event-driven updates | Beat the budget (Apple calls widget push "opportunistic") | Needs a server and Apple push keys: the Investors' spend and sign-up | No | Not planned; needs an Investor decision on a server first |
| **Keeping the app alive** (audio, decoy activity) | - | - | Breaks App Review rule 2.5.4 | - | Never |

</div>


If option A fails its device tests, the code stays dormant and the widget is as fresh as the last app run, with a badge. If the Investors' signing step (#100) lands after Day 21, the release candidate waits for it day for day. One consequence: version 1.0 would be on sale around Day 27 to 28 at best, so the $200-by-Day-30 line can be measured over only two or three selling days.

## 4.2 Four examples under the ruling


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 4.2 Four examples under the ruling, scrolls sideways" style="--tw:1243px" markdown="1">

| Widget | A switched on (passes device tests) | A off (fails them), with bound fields | Today's design |
|---|---|---|---|
| **Time** (clock, countdown, day progress) | Live, to the second, no budget used | Same | Same |
| **Transit, timetable** | One run plans the day; each departure counts down live; the plan refetches itself whenever iOS reloads the widget (typically every 15 to 60 minutes by Apple's page; not promised) | Same picture; the table refreshes only when the app runs | Same, table from the last app run |
| **Transit, real-time delays** | New data when iOS reloads the widget (Apple typically allows 15 to 60 minutes between reloads) and on a Refresh tap, no app; any feed, parsed in Python | New data when iOS reloads the widget, and on a tap, but only for feeds where the value is a named JSON field | Delay as of the last app run, with "updated N min ago" |
| **Steps** | Same as today: the count is read by the app, so it moves when the app runs. Reading steps inside the widget part needs a second widget target that is not built (T-0053) and is 1.1 if it misses Day 21 (ADR-007, 2026-10-30 2:35 PM) | Same as today (steps were cut from the bound-fields build) | Count from the last app run |

</div>


The seconds-level version of "transit" (a bus arriving) is a Live Activity in 1.1, on the Lock Screen, for the hour of the journey.

## 4.3 How fresh is a widget: five examples

A widget gets fresh in two different ways. A **redraw** shows a picture that already exists; iOS can do it without the app, and it brings no new facts. **New data** needs a script to run, and in 1.0 as built only the app runs scripts. This table updates the answer the company gave the Investors on issue #41 (the comment of 2026-10-29, Day 9) to the ruling in ADR-007 (chair lines 2026-10-29 8:03 AM, 2026-11-01 6:17 PM and 2026-11-01 6:38 PM). Marks: **works in v1** means the repository's code backs it; **planned** means not built; **[unverified]** means no phone has shown it (issue #100, signing).


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 4.3 How fresh is a widget: five examples, scrolls sideways" style="--tw:1243px" markdown="1">

| Widget | Redraw or new data? | What starts an app run | What the ruling puts where |
| --- | --- | --- | --- |
| **Time** (clock, countdown, day progress) | Redraw only. iOS animates the time text and bars itself, so nothing is fetched. | None needed. | **1.0, works in v1**: World clocks and Countdown do this. Live to the second, no budget used. |
| **Transit, by timetable** | Both. One run fetches the day's departures and plans a row of pictures; each is a redraw and counts down live. The plan itself is new data. | You open the app; a Shortcuts automation; background refresh (planned, T-0793, not built). With the widget-part <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> on, iOS's own reload reruns the plan too. | **1.0, works in v1**: the plan and the countdowns (section 9.1). The lane is built behind a flag that is **off** in the code at HEAD and is set only from real-phone numbers [unverified]. Background refresh: planned for 1.0, moves to 1.1 if not on main by Day 21 (2026-11-11). |
| **Transit, real-time delays** | New data. A redraw shows the delay as of the last run. | The same as timetable. With the lane on: each iOS reload (typically every 15 to 60 minutes, Apple's range, not a promise) and each Refresh tap, with no app. | **1.0 today**: the delay as of the last app run, with "updated N min ago". **1.0 if the lane passes its phone tests**: fetch in the widget part through `pywidget.net` (built, flag off). If it fails: only a feed that is one named field of public JSON, no key (bound fields, built only then, submission Day 28). **1.1**: Refresh tap fetching without opening the app (iOS 27 and later [unverified]); Live Activity for the hour of a journey. |
| **Steps** | New data. The phone's step counter is read by the app, not the widget part. | You open the app; a Shortcuts automation; background refresh (planned). | **1.0**: the count from the last app run, in every outcome. Steps in the widget part were cut on 2026-10-30 14:35: it needs a second widget target (T-0053) that is not at HEAD, and it is **1.1** if it misses Day 21 [unverified]. |
| **Weather** | New data from a public feed. A forecast changes slowly, so a redraw an hour old is usually fine. | The same as real-time transit. A fixed city works with any of them; "where I am" uses the last location the app read. | **1.0 today**: as of the last app run. **1.0 if the lane passes**: refetched on iOS's reload. No weather premade is in the app at HEAD (checked by search); a person writes it [unverified until a phone]. |

</div>


Three things hold for every row. Nothing here is "live" except time and timers; the widget-part lane is Apple's 15 to 60 minute rhythm at best. The send chooses a script's lane, a person never types it: a script that imports something the widget part forbids stays on the app lane and is told so in one line (ADR-007, 2026-11-01 6:17 PM). A run that began before the person's latest send writes nothing, so old work never lands over new (2026-11-01 6:38 PM; built in T-0976, flag on only). If the lane fails or the flag stays off, every row above falls back to "as of the last app run, with a badge".
{% endraw %}

</div>
