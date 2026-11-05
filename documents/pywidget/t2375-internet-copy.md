---
layout: "default"
title: "T-2375: B-staged copy (items 3, 6, 8): internet from Python, every premade free, Shortcuts"
section: "documents"
description: "So every sentence about background refresh sits under gate BR (T-0793 and T-2373 on main, T-0680 has seen a firing on a signed phone, T-0795 has not struck it). If BR fails, Pro is themes only (6b) and those sentences\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-store-drafts/' | relative_url }}">← App Store Drafts</a><a href="{{ '/documents/pywidget/t2375-internet-copy.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/release/t2375-internet-copy.md</code></span></div><h1>T-2375: B-staged copy (items 3, 6, 8): internet from Python, every premade free, Shortcuts</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, market and product researcher, 2026-11-04 22:16 ET (`date`). For the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> note of 2026-11-04 22:03 in [plan.md](pywidget-plan.html) (B-staged on #142), read as 6a). **DRAFT under <span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>: none of these words is approved.** They go to the Investors in the Day 41 packet with the store page; until then nothing here is pasted anywhere outside the repository.

> Listen to this, from the chair note itself: "Live" means "keeps itself fresh through the day" (Apple gives a widget 40 to 70 refreshes a day), never second by second. Here is the shape of it: the person who wants a weather or a train widget arrives expecting a ticker. If we promise a ticker, the one-star review writes itself. So every line below says what the phone will really do, and the one place it gets better with Pro is said plainly.

## 1. What the build has today (read 2026-11-04 at HEAD f326eeac6)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. What the build has today (read 2026-11-04 at HEAD f326eeac6), scrolls sideways" style="--tw:960px" markdown="1">

| Claim | True at HEAD? | Evidence |
|---|---|---|
| Scripts can reach the internet; requests is built in | Yes | ops/v1_scope.json `pure-packages` (done, A9); pywidget/examples/http_status.py uses urllib |
| A free widget's script reruns when the app comes to the front | Yes, at most once in 30 s for the same widgets | pywidget/ios/App/PyWidgetApp.swift scenePhase `.active` (T-0512); WidgetWriter.swift `WidgetPasses.spacing = .seconds(30)` (T-0690) |
| A Shortcut can rerun widgets, and pass data into a script | Yes | v1_scope `intents` (done): Run Script, Run Script with Input, Refresh Widgets |
| Background refresh (the Pro feature in 6a) | **No.** Nothing of it is on main | board T-0793 `[b]`, T-2373 waits on it, T-0795 cut check on 11-12 and 11-14 |
| Three themes | Approved look (creative/approved.md item 5); in the build under gate F13 of the store page | store-page-draft.md s9 |
| Every premade free | Not yet: T-2372 changes the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> and the placement rules | board T-2372 |
| Ready-made Shortcut recipes | Not yet | board T-2376 |

</div>


So every sentence about background refresh sits under gate **BR** (T-0793 and T-2373 on main, T-0680 has seen a firing on a signed phone, T-0795 has not struck it). If BR fails, Pro is themes only (6b) and those sentences go whole; nothing is softened into a weaker promise.

## 2. The rules for the words

- **Freshness:** "keeps itself fresh through the day", under BR only. Never "real-time", "live data", "instant", "every minute" or any number. Apple's page: "For a widget the user frequently views, a daily budget typically includes from 40 to 70 refreshes. This rate roughly translates to widget reloads every 15 to 60 minutes, but it's common for these intervals to vary" ([Keeping a widget up to date](https://developer.apple.com/documentation/widgetkit/keeping-a-widget-up-to-date), fetched signed out 2026-10-26 01:15 ET, saved at research/inbound/apple/developer.apple.com/documentation_widgetkit_keeping-a-widget-up-to-date.md-0b3389e1.html). "Typically" and "frequently views" are Apple's conditions, so we quote no figure to customers.
- **Without Pro:** "updates when you open the app or a Shortcut runs". True today (s1).
- **Other apps:** "works with your apps through Shortcuts". Never "integrates other apps' widgets", "reads your other apps", or any app's name.
- **Pro:** background refresh plus the three themes. Never premades, packages, numpy or Pillow, remixing, sharing, the Builder, AI, or "more coming".
- **Premades:** "all free", "every premade". Never "Pro premades", "unlock premades", "source opens with Pro".

## 3. Store page (pywidget/docs/release/store-page-draft.md, edited in place)

The revision note under the header lists every change: promo P0 (new, recommended, 116 to 148 of 170), the description led by internet from Python with an INTERNET FROM PYTHON section, the Shortcuts heading "WORKS WITH YOUR APPS THROUGH SHORTCUTS", all 12 premades free, the PRO paragraph and case table 6a rewritten for BR and F13. `tools/store_copy_check.py --names Lathe,Pith,Coilwork`: 15 fields, 0 problems. The description's worst case under Coilwork is exactly 4,000 of 4,000: any later addition must take words out first.

## 4. For Maren (T-2374): words to <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span>

### 4a. First-run tour (draw_ide.py `TOUR`; the tour is not approved, item "onboarding" in creative/approved.md's not-approved list)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4a. First-run tour (draw_ide.py TOUR; the tour is not approved, item…, scrolls sideways" data-n="1" style="--tw:933px" markdown="1">

| Page | Now | Proposed title | Proposed body |
|---|---|---|---|
| 1 | "Python 3.15, on this iPhone." / "Write a script, run it, keep it. It runs on this device and works offline." | Python 3.15, with the internet. | Call a web API in a few lines with requests, built in. The editor and Python itself work offline. |
| 2 | unchanged | | |
| 3 | "...This one is free and yours to edit." | unchanged | A widget is a Python script that returns a view. Every premade is free and yours to edit. |
| 4 | "...Three steps, once." | unchanged | iOS adds widgets from the Home Screen. Three steps, once. It updates when you open the app or a Shortcut runs. |

</div>


Page 1's visual may want a fetched value (a status code or a number from a feed) in the console; that is Maren's call. Check page 1 and 4 at AX3.

### 4b. Pro screen (PRO_STR in draw_ide.py; approved item 4 covered the old headlines, so the new ones are C51)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 4b. Pro screen (PRO_STR in draw_ide.py; approved item 4 covered the old…, scrolls sideways" style="--tw:755px" markdown="1">

| Key | Proposed words | Gate |
|---|---|---|
| h.refresh (new headline, 6a) | Widgets that keep themselves fresh. | BR |
| h.themes (headline, 6b) | More editor themes, light and dark. (as now) | F13, BR fails |
| sub | One purchase, no subscription. (as now) | |
| row.refresh.t | Background refresh | BR |
| row.refresh.l | Widgets that fetch from the internet update through the day with the app closed. iOS decides when. | BR |
| row.themes.t / .l | as now | F13 |
| free.eye | Always free (as now) | |
| free.base | Running any Python, internet from your scripts, the editor and console, projects and files, Shortcuts actions and the device modules | |
| free.widgets | , your own widgets and every premade, updated when you open the app or a Shortcut runs | |
| done.refresh | Thank you. Your widgets now refresh in the background through the day, as iOS allows. | BR |
| done.themes, done.theme, done.done, buttons, ln.*, links | as now | |
| **Remove** | h.premades, h.packages, row.premades.t/.l, row.packages.t/.l, free.packages, done.premades, done.packages, done.gallery, e.caption ("Source opens with Pro" contradicts T-0901), e.unlock unless the build still needs it for T-2316's locked Shortcut run | |

</div>


### 4c. The badge (T-2374 (a))

The chair note says "along the lines of 'Live with Pro'". I suggest **"Fresh with Pro"** on the gallery card and a plain **"Pro"** on a free user's widget (no price, no offer, Apple 4.4): the store page and s2 never call a widget "live", and one word that the store page forbids would be the first thing a reviewer or a one-star writer quotes. Maren and the Investors decide; the store page does not quote the badge.

## 5. Shortcuts (item 8, with Pernille on T-2376)

The store words are in place. T-2376's three recipes are Pernille's build; when they run end to end, the line for the app guide is: "pywidget works with your apps through Shortcuts: a shortcut takes what another app's action gives it and passes it to Run Script with Input, and the widget shows the result." No recipe may name an app the Investors have not seen in the guide.

## 6. New example ideas on public data (terms first: research/inbound/t2375-public-data/SOURCES.md)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 6. New example ideas on public data (terms first…, scrolls sideways" style="--tw:1131px" markdown="1">

| Idea | Source and terms | Why it fits | Shape |
|---|---|---|---|
| **E1. Earthquakes today** | USGS GeoJSON summary feeds (e.g. summary/2.5_day.geojson, listed on the feed page read). Public domain; credit asked: "Credit: U.S. Geological Survey"; the page says the feed "is intended to be used as a programatic interface for applications"; no robots.txt on the host | Worldwide, no key, no sign-in; a small widget with a count and the largest one is easy to read at a glance | Script: count, largest magnitude, place, time; optional distance from you through the location module. Widget: small and medium. Footer "Data: U.S. Geological Survey". Worded as information, never as a warning or safety alert |
| **E2. River level** | USGS Instantaneous Values service. Same USGS public-domain policy; no robots.txt on the host; "Readings are usually made every 15 minutes and transmitted hourly" | Data that really changes through the day, which shows what "keeps itself fresh" means without promising seconds | Script asks once for a USGS site number, saves it, shows gage height and its trend. US sites only, and the example says so |
| E3. Weather (held) | NWS api.weather.gov. Terms: open data, any purpose. But the host's robots.txt is `User-agent: *` / `Disallow: /` | | Held: the company cannot fetch it to test, and an untested example does not ship. A person's read decides |

</div>


Refused by terms_guard, and stopped there under T-0848: NOAA SWPC (Kp index; its robots.txt redirects to www.spaceweather.gov, terms unread) and Wikimedia's API (robots.txt redirects to www.mediawiki.org). Not retried another way.

Before E1 or E2 is written as code: read the USGS Feed Life Cycle Policy (policy.php answered 404) and check whether waterservices.usgs.gov is being retired for a newer USGS API. Both are on the continuation line.

## 7. Open

- Maren, T-2374: s4 into PRO_STR, the tour and the badge; Idris re-exports pro-strings.json.
- Gate BR decides half of this copy; T-0795 rules on 11-12 and 11-14.
- E1 and E2 code, after the two checks in s6: continuation line T-2409 on the board.
- Q for the Investors (via the Day 41 packet): the 6b price if BR fails (the 2026-10-30 case table had $4.99).
{% endraw %}

</div>
