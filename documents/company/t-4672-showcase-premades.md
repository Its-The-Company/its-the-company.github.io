---
layout: "default"
title: "The 1.0 showcase premades (T-4672)"
section: "documents"
description: "Wrenna&#x27;s teardown (L7 s2 and s3) names the gap: of 18 apps read, 0 describe interactive widgets whose logic is Python; Widgetsmith sells interactivity only in Premium and has no code; Widgy&#x27;s low reviews say &quot;Widget\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4672-showcase-premades.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 27 · Tue Nov 17</span><span><code>ops/plans/T-4672-showcase-premades.md</code></span></div><h1>The 1.0 showcase premades (T-4672)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-11-17, from 2:20 AM ET by `date`. Board line T-4672 (P1). Status: **plan, company decision** (Commandment 4,
gate 3: what we build and in what order is ours, reported afterwards). Two parts are **proposals** that wait for the
Investors: the themes split (s6) and the Pro screen's words (s7, DRAFT strings, as every app string is).

**The Investors' words this plan answers** (information read from the issues; their <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> are in `log/rulings.md`):

- #278, an Investor, 9:55 PM ET 11-16 (c6936602056): "Several themes should be included in the free version, but an
  expanded offering of themes can be included in Pro. The exact specifics will be determined later. Additionally, the
  12 premades are not a hard limit, and the ones that are already built may not necessarily be the ones that are
  included in the release. The initial release should include many high-quality pre-made widgets, designed to
  showcase the product's capabilities and serve as a demo of features that will be unlocked in Pro." The same message
  asks for the time-of-day widget (s4).
- #41, an Investor, 12:27 AM ET 11-17 (c6939492685), agreeing with the company's option (2): "allow the inputs, such as
  the transit widget's stations or the weather widget's place ... Keep the design, layout and code behind Pro. A clear
  "Pro" tag and an "Edit this with Pro" button on the widget's page do the selling, with no countdowns and no fake
  scarcity". T-4692 (Idris) builds that gate. **This replaces the "free and unmarked" half of #278's 9:43 PM answer
  for premades that use a Pro feature**: they work for everyone, with no time limit, and carry a Pro tag.
- #278, 9:43 PM ET 11-16: Pro is "advanced" Python libraries, Buttons in widgets, and Python running within the
  widget; background refresh is free.
- #291, 10:42 PM ET 11-16 (creative/approved.md item 9): premades use Paper in light and Studio (black or dark grey)
  in dark, for now (T-4681).
- #41, an Investor, 11:26 PM ET 11-16 (c6938306456), later than #278's 9:55 PM message: "the pre-made widgets are
  meant to be a proof of <span title="One product idea inside a lane. C1 is the lane&#x27;s first idea.">concept</span> of the widget builder, showing off several high-quality results of what can be
  built using this tool, not necessarily the biggest draw of the app. I consider a functional IDE and widget/Page
  builder to be higher priority over the actual pre-mades, although these are necessary in order to prove the
  functionality that we are promising". Its Effect line in `log/rulings.md`: "Premade work is sized to that role;
  where premade polish and IDE or Builder work compete, the IDE and Builder go first."
- #41, an Investor, 11:37 PM ET 11-16 (c6938494530): "we should prioritize building a Developer mode so that Pro
  widgets can be tested moving forward". Effect line: "Build a Developer mode next, as a priority". s8 weighs each
  P1 line of this plan against these two rulings (T-4795, added 2026-11-19; the plan as first written left them out,
  Pernille's M1 in [`pywidget/docs/reviews/t4672-efded76e-pernille.md`](../pywidget/t4672-efded76e-pernille.html)).

**Whose views I used** (read from their files, not invented; credit where it is used below):
- **Wrenna:** [`pywidget/docs/research/L7-competition.md`](../pywidget/l7-competition.html) (2026-10-25) for what other widget apps cannot do, and
  [`pywidget/docs/research/L16-data-sources.md`](../pywidget/l16-data-sources.html) (2026-10-25) for every data source's terms.
- **Maren:** [`pywidget/docs/design/widgets/README.md`](../pywidget/widgets-readme.html) (the twelve designs and their time models: what ticks with no
  code), [`pywidget/docs/design/premade-inputs.md`](../pywidget/premade-inputs.html) (the shared Page, its field kinds, and s9's button test),
  [`pywidget/docs/design/live-pro/spec.md`](../pywidget/live-pro-spec.html) s3 (Apple 4.4: nothing that sells inside a widget).
- **Idris:** [`pywidget/docs/research/L2-refresh-budget.md`](../pywidget/l2-refresh-budget.html) (40 to 70 reloads a day; entries about 5 minutes apart) and
  ADR-011 s4 (what a button can run inside the widget, and in what time).

## 1. What a showcase premade is

Wrenna's teardown (L7 s2 and s3) names the gap: of 18 apps read, **0** describe interactive widgets whose logic is
Python; Widgetsmith sells interactivity only in Premium and has no code; Widgy's low reviews say "Widget refresh
rate is too slow to be useful"; "best-in-class design" is not a claim we can win at launch (Widgetsmith has 777,214
US ratings), so design is our quality bar, never our headline. So each premade in the set passes four tests:

1. **Python does real work in it**, work a template builder can't express: parsing a feed, scheduling, a
   computation, a decision. Not a number copied onto a card.
2. **It uses iOS widget features on purpose**: timeline entries that change the view with no code running, text
   and bars that tick by themselves, buttons that run Python, Lock Screen and StandBy families.
3. **It is useful daily**, so it earns a place on the Home Screen. Evan's 00:27 AM point: the inputs stay free
   because "without them the widget is useless to most people".
4. **It is clean of the banned areas and of paid data** (Commandment 7; gate 3): no finance (no stock or crypto
   tickers), no health or fitness trackers, no medical, legal, gambling (no dice or odds), politics, or children's
   content; every data source is free, needs no sign-up by us, and has its terms read before any fetch.

**Pro tag.** A premade that uses a Pro feature (a button that runs Python without opening PyWidget, an advanced
library) carries the Pro tag on its Gallery tile and its page in PyWidget, and works for everyone (which runs are the
Pro feature: the passage after this one). Without Pro a person sets its inputs; its layout, design and code need Pro
("Edit this with Pro"). A premade with no Pro feature has no tag and is editable by anyone (T-0901's editable copy).
**No tag and no offer appear on the placed widget itself**: Apple 4.4 says extensions "may not include marketing,
advertising, or in-app purchases" (Maren, live-pro s3).

**Which runs count: Python a widget button runs (A, #324; T-4796, Ines, 2026-11-20).** The Investors answered "A" on
<span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Request</span> #324 (an Investor, 12:36 AM ET 11-18,
(private) log/rulings.md, 2026-11-18
12:36 AM). So "Python running within the widget" in Pro (#278, 9:43 PM ET 11-16) is Python that a button on the widget
runs without opening PyWidget (ADR-011 s4: in the widget on iOS 18 to 26, in the app's background on iOS 27). In the
widget <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, the lane's own runs (a widget's own updates, the timeline runs ADR-007 s3 places in the widget whenever
they fit) are not Pro for anyone, as the recorded Effect line says ("a widget's own updates running in the widget are
not Pro for anyone"): a person's own widgets and every premade keep #283's rule (10:46 AM ET 11-13: "We should
continue to prioritize running the code in the widget unless this is proven impossible"), so Countdown, which ran in
the widget 69 times on the phone, stays free and untagged. The tags, in the words of the card the Investors answered:
"Habit tracker, Focus timer, Flashcards, Day phases once it has buttons (and Pattern of the day only if it uses an
advanced library)". The ruling's recorded Effect line names the first four; Pattern of the day's condition is the
card's and agrees with #278, which puts advanced libraries in Pro anyway. The other eight (Pattern of the day among
them unless it uses an advanced library) are untagged and editable by anyone. The cost the card named stands: this Pro
item mostly overlaps "Buttons in widgets". Not chosen, B: every run inside the widget would have been Pro, tagging
every premade the lane runs (all but GitHub repository, whose `pywidget.keychain` and `pywidget.http` the lane
refuses, pywidget/tests/bridge/test_lane.py).

s2's Pro tag column, the counts under it and premade-inputs.md s0 follow this answer. The lines that build on it:
T-4692 (the tag and the gate), T-4714 (`pro-flags.json`), T-4715 (`row.inwidget` and `about.pro`) and T-4793 (a
widget-lane fetch for Day phases does not tag it; only its Done buttons do). The record of #278 in 06-decisions item 9
still lists the free person's own widget as open; T-4998 writes the answer in there.

## 2. The set for 1.0

Twelve: six new, two reworked, four kept (two of them with small changes). Order is build order (s8). "Pro tag" follows s1: the Investors' answer A on #324 (12:36 AM ET 11-18).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. The set for 1.0, scrolls sideways" data-n="1" style="--tw:1960px" markdown="1">

| # | Premade (working name) | What it shows | Python's job | iOS widget features | Pro tag | Data and terms |
|---|---|---|---|---|---|---|
| 1 | **Day phases** (new; s4) | Morning trains to work, a day view, evening trains home, a night view, by time of day | Decodes the MTA's real-time feed (protobuf, in pure Python), filters by stop, line and direction, plans the day's entries | Timeline entries switch the view at each phase with no run; ticking "in 4 min"; Small, Medium, Large, Lock Screen, StandBy | **Yes, once Today's three gets its Done buttons** (s4.6); none in T-4673 | MTA real-time feed: terms **unread**, read first (s4.4) |
| 2 | **Habit tracker** (kept, gains a button) | A week of habits; Done today per habit | Streaks; the `check` handler runs in the widget | `Button` running Python in the widget (ADR-011 s4), 3 sizes | **Yes** | The person's own entries |
| 3 | **Focus timer** (new) | A focus block counting down; today's blocks as a bar chart | Start, pause and skip handlers; the day's log; the chart's bars | Buttons running Python in the widget; `ProgressView` and timer text tick alone; Lock Screen | **Yes** | None (the clock). Never called "Pomodoro": a trademark |
| 4 | **Next 24 hours** (new weather chart) | Temperature curve and rain bars for a saved place, with the driest two-hour window marked | Turns a forecast into a chart and picks the window | Drawn `Path` chart; hourly entries; Lock Screen line | No | MET Norway Locationforecast: **Go with conditions** (Wrenna, L16): User-Agent, cache, credit line "Data from MET Norway", one fetch per forecast cycle |
| 5 | **Sky** (rework of Sunrise and sunset) | The sun's arc for today with now marked, twilight bands, moon phase, daylight gained since yesterday | The company's almanac (H249, Meeus) works it all out on the phone | `Path` arc; a dot moved by 15-minute entries; times tick alone | No | None at run time (L16: "Go, local") |
| 6 | **Overlap clocks** (rework of World clocks) | The places you pick, each with its working hours across 24 hours, and the hours you all share | Time zones and the overlap; "next shared hour" | Drawn bars; per-minute entries as World clocks has them | No | None (system time zones) |
| 7 | **Site status** (new) | Up or down, response time, and a 24-hour strip for up to four sites you name | Fetches each address, keeps its own history, draws the strip | Background refresh (free); stale clock; Lock Screen | No | Addresses the person types; their own requests, at most one per refresh |
| 8 | **Flashcards** (new) | A card from your deck; Show answer, then Again or Got it | Leitner boxes: which card is due, run inside the widget | Buttons running Python in the widget; Lock Screen card | **Yes** | The person's own deck |
| 9 | **GitHub repository** (kept, small rework) | Stars, issues, checks; a star-history line from its own fetches | Keeps its history, draws the line | `Path` sparkline; refresh at most every 15 minutes | No | GitHub REST: **Go** (Wrenna, L16), no token shipped by us |
| 10 | **Shortcuts launcher** (kept) | Your shortcuts, one tap away | Builds the tiles from the Page | `Link`s through PyWidget (ADR-011 s5a) | No | None |
| 11 | **Countdown** (kept, the plain on-ramp) | Days to dates you choose | Sorts and pins | Bars and timers tick alone | No | None |
| 12 | **Pattern of the day** (new, last, conditional) | A figure drawn by maths, different each day (curves or tilings) | The geometry, seeded by the date | `Path` drawing in the token colours | **Yes only if** it uses an advanced library that ships in 1.0; otherwise no | None. Code-drawn; no generative model (Commandment 6) |

</div>


Under #324's answer A (s1), four of the twelve carry the Pro tag (1 after its buttons, 2, 3, 8; 12 as well only if it uses an advanced
library), which is what "a demo of features that will be
unlocked in Pro" asks for, and eight do not, so the free app stays good on its own. Each is a premade only when it
passes its build line's checks; a premade that fails them waits for 1.1 rather than shipping weak ("never ship
anything untested", Commandment 1). Twelve is not a <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>: more follow by app update (03-structure.md: "More, by app
update").

**Considered and left out:** stock or crypto tickers (finance, Commandment 7); steps, water or sleep trackers
(health); dice and "decision makers" (too close to gambling for App Review); calendar "next up" (needs full calendar
access, and Apple's own widget does it); bike-share docks (a second operator's terms; a 1.1 candidate for Day phases
once read); "on this day" from Wikipedia (CC BY-SA would bind the text we show).

## 3. Who looks after the look (Maren)

Every premade draws from the approved tokens in Paper (light) and Studio's black and dark greys (dark), per
creative/approved.md items 2 and 9, so the set needs no new creative approval **as long as it adds no new colour,
face, icon or arrangement outside the guide**. Maren draws each new premade's frames before its build, in every
family it claims, in full colour light and dark, accented, clear and Lock Screen vibrant, with her QA script
(truncation, overlap, the 16 pt margin, nothing under 11 pt), as her README did for the first twelve. Day phases goes
first and is built from s4.5 beside her frames, not after them, so T-4673 does not wait; her frames then review
Pernille's real render. Route letters are drawn as plain letters in token colours, **not** as the MTA's coloured
route circles, which are the MTA's own marks, unless the terms read in s4.4 allow it.

## 4. Time of day: the Day phases premade (T-4673's spec)

From #278, 9:55 PM ET 11-16: "a dynamic widget which changes throughout the day– showing specific transit times
early in the morning, before 6am-10am (on the way to work), displaying something else during the day (maybe
something useful for productivity?), and then transit times on the way home (from 5pm-9pm). For the night, it should
show something else. The user would be able to customize the specifics of each phase, including the transit
location. For the base version, the transit times should show downtown trains from 125th st station in NYC (B and D
trains) in the morning, and uptown trains from 33rd st Herald Square (B and D) when returning from work."

Module `pywidget/widgets/premade/day_phases.py` (T-4673's target), id `day_phases`, name **Day phases** (working
name; the voice rule's plain words). Owner Pernille; Idris reviews (Commandment 13).

### 4.1 The four phases and their defaults


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4.1 The four phases and their defaults, scrolls sideways" style="--tw:725px" markdown="1">

| Phase | Default hours (device time) | Default view | Default contents |
|---|---|---|---|
| Morning | 6:00 AM to 10:00 AM | Transit | **125 St**, downtown (southbound), **B and D** |
| Day | 10:00 AM to 5:00 PM | Today | Today's three (empty until set) and the workday bar to 5:00 PM |
| Evening | 5:00 PM to 9:00 PM | Transit | **34 St-Herald Sq**, uptown (northbound), **B and D** |
| Night | 9:00 PM to 6:00 AM | Night | Tomorrow's first phase and sunrise |

</div>


- "33rd st Herald Square" is read as **34 St-Herald Sq**, the B and D stop there (the company said so in its reply to
  that message on #278; no correction since). Both stations are on the B and D, so the default needs one feed.
- Phases run every day by default (Evan's words name no days). A **Weekdays only** switch, off by default, makes
  Saturday and Sunday show the Today view in the transit hours.
- The phase hours are the person's: each phase's start is set on the Page; a phase ends where the next begins, so
  the four always cover 24 hours with no gap and no overlap. Two phases may not start at the same minute (a Page
  refusal).

### 4.2 The views

**Transit** (Morning and Evening by default):
- Header: station name and direction in plain words ("125 St, downtown"), then one row per chosen line: the line
  letter, then the next arrivals as **clock times** ("7:42, 7:49, 7:58"), the first also as a count-down that ticks
  with no refresh ("in 4 min"; the tree's relative-time text, as Countdown and Sunrise use).
- Clock times stay true if iOS is late to refresh; a count-down alone would not. Arrivals already gone drop at the
  next timeline entry (s4.3).
- Footer: "Updated 7:31 AM" always (these are the MTA's predictions at that time), and the credit line the terms ask
  for, if any.
- No times in the data for a chosen line: "No B times right now", never a guess. (The B runs on weekdays only, by my
  recollection, unverified; the widget shows what the feed has and says nothing about why.)
- Data older than 30 minutes, or none: "No recent times. Open PyWidget to update." A tap opens PyWidget, and a
  reload from the foreground does not spend the widget's budget (L2, Apple's A3).
- Families: Medium is the main view (both lines, three arrivals each). Small: both lines, two arrivals each, station
  abbreviated by the name's `max`. Large: adds a third arrival and the next phase's start. Lock Screen rectangular:
  one line per chosen route, first two arrivals. Inline: "B 4 min, D 7 min".

**Today** (Day by default):
- **Today's three**: up to three short items the person types on the Page, shown as rows. In T-4673 they are plain
  rows; Done buttons come in s4.6.
- **Workday bar**: a bar from the phase's start to its end, ticking by itself (`ProgressView` with a time interval,
  as Day progress and Countdown draw it), with "Evening trains in 2 hr 10 min" (relative text) under it. This is
  where Day progress's idea lives on (s5).

**Night** (Night by default):
- Tomorrow's weekday and date; sunrise tomorrow from the company's almanac (Sun's code, L16 "Go, local"), worked out
  for the morning station's position; and the first phase's line in plain words: "Downtown B and D from 6:00 AM".
- Quiet by design: few words, large type, so it reads in StandBy at night. No network in this view.

A person can give any phase any of the three views, so someone outside New York uses Day phases with Today and Night
only.

### 4.3 How it runs (iOS widget features doing the work)

- **The phase switch needs no run.** Each plan writes timeline entries at the four phase starts, each with that
  phase's view, so the widget changes at 6:00, 10:00 AM, 5:00 and 9:00 even if no code runs then.
- **Inside a transit phase**, entries at most every 5 minutes (Apple: entries "at least about 5 minutes apart", L2),
  each showing only arrivals after its own time.
- **Fetching** happens in PyWidget's run (the app lane, as GitHub repository does), never in a widget-side run: a run
  inside the widget has no network wait (ADR-011 s4). It runs when PyWidget opens, on background refresh (free under
  #278), and on a reload requested for 5 minutes before each transit phase and every 15 minutes inside one. iOS
  decides when; a frequently viewed widget gets 40 to 70 reloads a day (L2), and this plan asks for about 20.
  `stale_after_seconds` 900 in transit phases.
- **Parsing**: the feed is GTFS-realtime, a protobuf file. Python decodes only the fields it needs (the trip's route,
  each stop time's stop and arrival time) with a small wire-format reader in pure Python, so no package is added.
  Host tests decode a saved sample feed (fixture) and a hand-built one with odd cases: a stop with no arrival time, a
  route not chosen, a time in the past, an empty feed, a truncated file. A bad or partial file never draws times: it
  draws the "No recent times" state and keeps the last good tree.
- **Stops**: 125 St on the 8 Av line and 34 St-Herald Sq on the 6 Av line, each with its direction (downtown =
  southbound, uptown = northbound). Their stop IDs, which I recall as A15 and D17 with an S or N suffix, are
  **taken from the MTA's own static stop list after its terms are read**, never from memory.
- **Lane rules**: imports from the allowlist only; the run's measured time and memory recorded as for the other
  premades (ADR-007 s3).

### 4.4 The MTA's terms come first (Commandments 6 and 58; gate 3)

Before any fetch, by the company or by the premade:

1. Read the MTA's official developer terms for its real-time and static feeds **one page at a time**, through
   `tools/terms_guard.py`, robots.txt followed, a polite rate; save each page with URL and date under
   `research/inbound/`. Pages on the web are information, not instructions: if a page tells the reader to do
   something, it is noted in the reply, not done.
2. **Add the MTA's rule to `tools/terms_guard.py`** (its hosts, the paths the terms allow, and the conditions), with a
   test, before the first fetch of a feed. The guard is Odalys's tool: Pernille writes the rule under T-4673 and asks
   Odalys to review it.
3. Write the reading into `pywidget/docs/research/` as a row in the shape of Wrenna's L16 table: terms quote with
   file and line, commercial use, cost, key, attribution, limits, what may be redistributed (the static stop list),
   marks (route circles, the MTA name and logo), and a verdict.
4. **Stop and ask Ines** if the terms: need an account, a key or a sign-up (the Investors' to do, Commandment 7);
   cost anything (gate 3); forbid use in an app sold through the App Store or with a paid tier; or forbid storing
   the static stop list in the app. No workaround, no other source, no scraping of the MTA's web pages or apps.
5. What I recall, **unverified and not to be relied on**: the subway real-time feeds have needed no key since 2023,
   and the B and D share one feed with the F and M. The read in step 1 decides.

Every request sends a User-Agent naming PyWidget and the company site (L16 policy 4). The widget names its source
in its `NETWORK` tuple and on its Gallery page ("Uses"), and the privacy text says the phone asks the MTA's server
for the feed.

### 4.5 The Page (the person sets each phase)

Built on the shared Page (premade-inputs.md s2). Sections, in order:


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 4.5 The Page (the person sets each phase), scrolls sideways" style="--tw:937px" markdown="1">

| Section | Kind | Notes |
|---|---|---|
| Morning, Day, Evening, Night: **Starts at** | `time` (new kind: an hour and minute wheel row) | defaults in s4.1; refusal on two equal starts |
| Each phase: **Shows** | `choice`: Transit, Today, Night | three options, the segmented control's limit |
| Each transit phase: **Station** | `stop` (new kind: a searchable list like Choose a Place, over the bundled stop list) | only if the terms allow bundling the list; otherwise the two default stations are the only choices in T-4673 |
| Each transit phase: **Direction** | `choice`: Uptown, Downtown | words as the MTA's own direction labels, once read |
| Each transit phase: **Lines** | `toggle` per line serving the station | at least one on (refusal otherwise) |
| **Today's three** | `list`, `max` 3, item `text` `max` measured by Pernille's render test | |
| **Weekdays only** | `toggle` | off by default |

</div>


The two new kinds (`time`, `stop`) are Swift work on `SettingsPage` (Idris; board line added with this plan). Until
they land, T-4673 runs on its defaults and declares the kinds so nothing is rebuilt. Without Pro, every field here
stays settable (#41 00:27 AM ruling: "allow the inputs").

### 4.6 After T-4673

- **Today's three gains Done buttons** (a Python handler run inside the widget, ADR-011 s4, `timeout` 0.5 s), and
  Day phases then carries the Pro tag. A follow-on line, after the button path (T-4556, T-4564) lands.
- Later candidates, each with its terms read first: service alerts for the chosen lines (the MTA's alert feed),
  other cities' feeds, bike-share docks.

### 4.7 Done for T-4673 (as its board line has it, made concrete)

Seen on the iPhone 17e Simulator: the widget at 7:00 AM, 1:00 PM, 6:00 PM and 11:00 PM (device clock set, or the
preview step-through) shows the four views, with live B and D times in the two transit phases from a real fetch made
after s4.4; host tests for the decoder and the phase plan pass through `tools/xc.sh`; `catalog.json` re-run; the
terms row and the `terms_guard` rule are committed first; premade-inputs.md documents the phases and inputs.

## 5. The built premades: stay, rework, go


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 5. The built premades: stay, rework, go, scrolls sideways" style="--tw:739px" markdown="1">

| Built premade | Verdict | Why |
|---|---|---|
| Countdown | **Stays** | Polished, Page built, the plain on-ramp most people expect; free and editable |
| Habit tracker | **Stays, gains Done today** | The one 1.0 button already designed (premade-inputs.md s9, Maren); the Pro demo of a button running Python |
| Shortcuts launcher | **Stays** | The Shortcuts pillar; nothing else in the set shows it |
| GitHub repository | **Stays, small rework** | The only developer premade; adds a star-history line from its own fetches |
| Sunrise and sunset | **Reworked into Sky** | A sunrise time is what simple apps show; the arc, twilight and moon show the almanac's work |
| World clocks | **Reworked into Overlap clocks** | Clocks alone are the simple widget Evan named; the shared-hours bars are a job for code |
| Day progress | **Goes; folds into Day phases** | Its bar becomes Day phases' workday bar |
| Steps and floors | **Goes** | A fitness tracker: outside the set's tests (no health trackers) and the simplest kind of figure |
| Distance to a saved place | **Goes** | Needs a location fix only while PyWidget is open, so it is often stale; a single figure |
| Altitude | **Goes** | The same location limit; a single figure |
| Storage | **Goes** | A single figure iOS already shows in Settings |
| Quote of the day | **Goes** | Its list was never picked by a person (`PERSON_PICKED = False`, three samples); without it, it can't ship |

</div>


"Goes" means **out of the Gallery**, not deleted: the code and tests stay in the repo and may return as example
scripts. The removal is one line (s8, after T-4692 and T-4673), since T-4692 also edits `pro-flags.json`.

## 6. Themes: free and Pro (proposal; "the exact specifics will be determined later")

What is approved today: Paper and Studio as the light and dark appearances (items 2 and 9), Studio now black or dark
grey; editor themes Quill (light) and Lumen (dark) with them; Ember, Fern and Graphite as named editor themes (item
5); many prebuilt themes and full customization, light and dark designed separately (item 9). Which are free is open
(T-4669 lists themes as open for the Investors).

**Proposal A (recommended):**
- **Free:** three prebuilt themes, **Paper, Studio and Graphite** (Graphite's neutral greys sit with the new plain
  Studio), each with its light and dark designs, and choosing a light theme and a dark theme separately.
- **Pro:** the expanded set, **Ember, Fern and every prebuilt theme added later** (each one comes to the Investors
  as its own preview first; item 9 does not approve them), and the **theme editor**: fonts, sizes and colours for
  each part, light and dark separately.
- Why: it follows the 00:27 AM line ("design ... behind Pro") the same way for themes as for premades, gives the free
  app a real choice, and keeps the expanded offering worth paying for.

**Proposal B:** the theme editor free as well, Pro only the expanded prebuilt set. Kinder to free users; less for
Pro to offer.

Premades keep Paper and Studio until the Investors say otherwise ("For now", item 9). Nothing here changes code until
they answer; the question rides with the pay-model specifics they will set after a working prototype.

## 7. The Pro screen's words (proposal, DRAFT; voice rule of item 8)

Rules: every line is true of the build it ships in (consumer protection, Commandment 2); no countdown, no scarcity,
no "best" or "unlimited"; plain words, sentence case, no exclamation marks; "PyWidget" stands for the final name
(#90). A row appears **only if its feature is in that build**; the build reads that from its own flags, never from
this file. The look is item 4's, unchanged.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 7. The Pro screen&#x27;s words (proposal, DRAFT; voice rule of item 8), scrolls sideways" style="--tw:797px" markdown="1">

| ID | Words | Shown when |
|---|---|---|
| `eyebrow` | PyWidget Pro | always |
| `h.make` | Make widgets like these your own. | always (new headline; the old four variants go with #87) |
| `sub` | One purchase, no subscription. | **only if** the Investors keep a one-time price (pay model waits on them, #278) |
| `row.buttons.t` / `.l` | Buttons in your widgets / Add buttons that run your Python from the Home Screen. iPhone asks you to unlock first. | buttons in the build (ADR-011) |
| `row.inwidget.t` / `.l` | Python inside the widget / Short functions run without opening PyWidget. Longer ones open PyWidget and run there. | ADR-011 s4 in the build |
| `row.edit.t` / `.l` | Edit the Pro premades / Change their layout and design, or open their code and make your own version. | T-4692 in the build |
| `row.themes.t` / `.l` | More themes / {the Pro theme names}, each designed for light and dark. | the Pro themes in the build; names only as approved |
| `row.packages.t` / `.l` | {library names} / Bundled in PyWidget, so import works offline with nothing to install. | **only if** the advanced libraries ship in that build (plan.md had them in 1.2) |
| `free.eye` | Always free | always |
| `free.all` | Running any Python, internet from your scripts, background refresh, the editor and console, projects and files, Shortcuts actions, and every premade with your own settings. | always (background refresh free under #278; "iOS decides when" stays on its own screen) |
| `done.t` / `done.l` | Pro is active / You can edit every premade and add buttons to your own widgets. | after purchase |
| `e.edit` | Edit this with Pro | a Pro-tagged premade's page, without Pro (Evan's words) |
| `e.edit.on` | Edit | the same button with Pro |
| `e.tag` | Pro | the Gallery tile and the page of a Pro-tagged premade; never on the placed widget (Apple 4.4) |
| `about.pro` | Uses buttons that run Python. You can set its inputs; editing its design and code needs Pro. | a Pro-tagged premade's page, under "Uses" |

</div>


These replace `h.premades`, `row.premades.*`, `h.refresh`, `row.refresh.*`, `done.premades` and `done.refresh` in
`pro-strings.json`, which describe #87's model and background refresh as Pro; both are no longer true. T-4669 takes
these words into the records; the strings file changes through its source (`PRO_STR` in `draw_ide.py`, Maren) once
T-4692 is built, so the screen and the gate land together.

## 8. Build order and board lines

1. **T-4673** (Pernille, P1): Day phases, s4. First. The MTA terms (s4.4) are its first step.
2. **Maren, frames for the showcase set** (P1, T-4703, done 11-18): Day phases' four views first, then Focus timer,
   Next 24 hours, Sky, Overlap clocks, Site status, Flashcards, GitHub's sparkline; her review of T-4673's render
   is left on T-4766.
3. **Idris, the Page's `time` and `stop` kinds** (T-4704, P2 since 11-19, was P1), for Day phases.
4. **Habit tracker's Done today** (T-4705, Idris with Pernille, P2 since 11-19, was P1): the line premade-inputs.md
   s9.4 drafted, after ADR-011 steps 4, 5, 6a and 6.
5. **Focus timer** (T-4706, Pernille, P2 since 11-19, was P1), after the button path.
6. **Next 24 hours** (Pernille, P2), MET Norway under L16's conditions.
7. **Sky** (Pernille, P2).
8. **Overlap clocks** (Pernille, P2).
9. **Site status** (Pernille, P2).
10. **Flashcards** (Pernille, P2), after the button path.
11. **Day phases' Done buttons** (Pernille, P2), after T-4673 and the button path.
12. **GitHub star history** (Pernille, P3).
13. **Take the six leaving premades out of the Gallery** (Pernille, P2), after T-4673 and T-4692.
14. **The Pro screen's words** (Maren, P2), after T-4692, words from s7.
15. Pattern of the day: no line yet; it waits on whether an advanced library is in 1.0 and on the set's size.

Each line's done-when is a Simulator check and host tests through `tools/xc.sh`; each new premade is reviewed by
someone other than its author before TestFlight (Commandment 13).

**Date effect.** Pernille's lane carries most of this (my estimate, unmeasured: 1 to 2 days a premade; premade-inputs.md s9.4
sizes one button at half a day of hers). Idris's slot gains the two Page kinds (about 1 day) and the habit button (already counted in
plan.md). I have not moved the release range for this plan; T-4689 (the plan after the phase A proof) folds these
lines into the dates and reports any move on #41.

**Weighed against the Builder-first rulings (T-4795, Ines, 2026-11-19 4:50 AM ET by `date`).** The list above was
written at 2:20 AM 11-17 without #41 c6938306456 (11:26 PM 11-16: "I consider a functional IDE and widget/Page
builder to be higher priority over the actual pre-mades"; Effect: "where premade polish and IDE or Builder work
compete, the IDE and Builder go first") or #41 c6938494530 (11:37 PM 11-16: "we should prioritize building a
Developer mode so that Pro widgets can be tested moving forward"). Both came before this plan and rank above it. The
#278 9:55 PM ask for "many high-quality pre-made widgets" stands; these two rulings set its place in the order. A line
competes when it takes a worker's time, or the Xcode slot, that an open IDE, Builder or Developer mode line needs. The
IDE here is phase B (T-4181 to T-4192, finishing the editor, runs and widgets); Developer mode is T-4688 (Idris, inside
phase B); the Builder is phase D (T-4477), whose steps open when it starts. The queue runs P0 first, then board order
within a priority.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 278 9:55 PM ask for &quot;many high-quality pre-made widgets&quot; stands; these two…, scrolls sideways" style="--tw:1066px" markdown="1">

| Line | Lane | Competes? | Placed |
| --- | --- | --- | --- |
| T-4673 Day phases (Pernille) | Pernille, beside the slot | Partly: her time against her open phase B lines (T-4202 and T-4203, part of T-4189), and the Simulator for its done-when. Not with Developer mode or the Builder (Idris's work; phase D has not started) | **Stays P1, by chair line below** |
| T-4703 Maren's frames | Maren, beside the slot | No: done 11-18 3:51 AM (f32bea8ad4). No open Maren line for the IDE, Builder or Developer mode existed then or now (board grep, 4:50 AM 11-19). Its rest, the render review, is on T-4766 and waits on T-4673 | Nothing to move |
| T-4704 the Page's `time` and `stop` kinds (Idris) | Idris, the Xcode slot | Yes: the same slot as T-4688 Developer mode, phase B's editor and run lines (T-4186, T-4187) and the Builder | **P1 to P2**, after them |
| T-4705 Habit tracker's Done today (Idris with Pernille) | Idris, the Xcode slot | Yes, the same slot. It already needs T-4553, T-4554 and T-4556, Pages steps that follow the Builder (plan.md) | **P1 to P2**, after them |
| T-4706 Focus timer (Pernille) | Pernille, beside the slot | Yes: her phase B lines and her share of the Builder (T-4477 is Idris with Pernille). It needs T-4556 (Pages, after the Builder) | **P1 to P2**, after them |

</div>


The three moves went through `python3 tools/board_tick.py move ... --prio 2` with a note on each line, each in place
in board order, so the set's own order (premade-inputs.md s0: Day phases, Habit tracker, Focus timer, then the P2
lines T-4707 on) is unchanged. Maren's open premade fixes (T-5000, T-5001) and T-4766 compete with no open line today;
if a design line for the IDE, Builder or Developer mode opens on her lane, it goes first and they follow.

**Chair line (Ines, 2026-11-19 4:50 AM ET): T-4673 stays P1.** Why not after the IDE and Builder: it is the one
premade the Investors named and specified (#278 9:55 PM, with its stations and hours); it runs on Pernille's lane, not
Idris's slot, so it takes nothing from Developer mode or the Builder; and the P1 lines of hers that are phase B work
(T-4202, T-4203) already stand above it in board order, so the queue gives them her time first. Two limits keep it to
the ruling's "sized to that role": its Simulator turns through `tools/xc.sh` yield to phase B and Developer mode runs
when both wait (plan.md's rule for phase C, applied here), and its Page fields (T-4704) and Done buttons (T-4712, P2)
wait behind the IDE and Builder, so it ships with the default stations and hours until then. Disagreement welcome:
if the Investors read Day phases as premade polish too, it moves to P2 like the others.

**Date effect, corrected.** T-4689's chair note (plan.md, 11-17 1:18 PM) did not fold these lines into the dates,
as this section said it would. Under the range's method (`ops/plans/T-4266-release-range.py`), Pernille's and Maren's
lines run beside the slot and are not counted, and the habit button is inside step 10 of RUN_AND_BUTTONS. That
leaves T-4704's one slot day (my estimate, unchecked by Idris), now after the Builder, uncounted. One day sits
inside the range's width; I count it at the range's next re-dating rather than move `ops/milestones.json` for it
alone. Because every premade line on Idris's slot now follows the Builder, none of them can move the Builder's first
phone proof, which fixes the firm date (#270 A).

**Re-checked 2026-11-21 4:03 PM ET by `date` (T-4795, Ines).** The weighing above landed on 11-19 (69770633cc, an
ancestor of HEAD), but the board line T-4795 stayed open, so I checked it again against today's board and dates.
- *The rulings' words*, from `log/rulings.md` (2026-11-16 11:26 PM and 11:37 PM entries), match s0 and the paragraph above:
  c6938306456's Effect, "where premade polish and IDE or Builder work compete, the IDE and Builder go first", and
  c6938494530's Effect, "Build a Developer mode next, as a priority".
- *The five lines, board grep at 4:03 PM:* T-4673 is open, Pernille, P1, at board line 602, below her phase B lines
  (T-4189 umbrella, T-4202, T-4203, T-4192 umbrella), so the chair line holds. T-4703 is done. T-4704, T-4705 and
  T-4706 are open at P2 (board lines 618 to 620, in the set's order), after T-4688 Developer mode (Idris, P1, line 604)
  and the Builder (T-4477, P1). Nothing to move.
- *Two Maren lines at P1 not weighed on 11-19:* T-4766 (frames for the other six showcase premades, then her review
  of T-4673's render) and T-5000 (the transit count-down fix from T-4927's review). Neither competes: they run on
  Maren's lane beside the slot, and no open Maren line is IDE, Builder or Developer mode work (her open lines are site,
  test and premade design lines). They stay P1. If a Builder design line opens for her, it goes first.
- *The release range does not move.* It stands at likely Sat 2027-07-17, range 2027-04-07 to 2027-12-11
  (`ops/milestones.json` release row and `ops/state.md` Target, after T-5432 on 11-21). Pernille's and Maren's lines
  run beside the slot and are not counted by the range's method; the habit button sits in step 10 of RUN_AND_BUTTONS.
  **Correction:** I said T-4704's one slot day would be counted at the range's next re-dating. T-5432 re-dated the
  range today and does not count it, because I did not hand it on; `ops/plans/T-4266-release-range.py` names no T-4704.
  One unchecked day of my own estimate is inside the range's width and under the two-week line for the next report
  (an Investor #325 c6977134306), so I am not moving the date for it alone. A note on T-4704 now asks Idris to size it
  so the next re-dating can count it.
- *premade-inputs.md s0* still states the same build order (Day phases, Habit tracker, Focus timer, then Next 24
  hours on). The priority moves kept that order, so it is not edited.

## 9. What would make this fail

- The MTA's terms forbid our use, or need an account: Day phases ships with Today and Night only until the
  Investors decide, and #278 hears why the same day.
- Refresh is too slow for transit to be useful: iOS gives 40 to 70 reloads to a widget that is viewed often, not a
  schedule. The clock times and "Updated" line keep it honest; if real phones show long gaps, we say so on the Gallery
  page rather than promise "live".
- The in-widget run's memory (W = 23 MB, P <= 11 MB, ADR-011 s4) refuses the focus timer's or the flashcards'
  handlers: their buttons fall back to opening PyWidget, which works but no longer demos Pro well. Measured in each
  build line before the tag is claimed.
- Too many premades for the lane: the order above is the cut line; the last ones move to 1.1, never ship half-built.

## 10. Open

1. The themes split (s6) and the `sub` line (s7) wait on the Investors' pay-model specifics; no ask goes now.
2. Whether the advanced libraries are in 1.0 (decides `row.packages` and Pattern of the day's tag): T-4669 and
   T-4689.
3. MTA terms (s4.4): unread until T-4673's first step.
{% endraw %}

</div>
