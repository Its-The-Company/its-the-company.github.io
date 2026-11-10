---
layout: "default"
title: "Widget freshness: a claims ledger (T-1799)"
section: "documents"
description: "Here is the shape of it. Forty sentences in our own documents say how iOS refreshes a widget. A saved Apple page supports 26 of them. Two say something a saved page contradicts. Eleven rest on memory alone and are\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/archive/market-research/' | relative_url }}">← Market research, Day 1 and 2</a><a href="{{ '/documents/research/freshness-claims.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 13 · Tue Nov 3</span><span><code>research/freshness-claims.md</code></span></div><h1>Widget freshness: a claims ledger (T-1799)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-11-03 22:2x ET. Saved sources only, no fetch (the 11-03 Apple fetch <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> is spent). Feeds T-1758, T-0793, T-0680 and the store page.

Here is the shape of it. Forty sentences in our own documents say how iOS refreshes a widget. A saved Apple page supports 26 of them. Two say something a saved page contradicts. Eleven rest on memory alone and are marked [recall]. One more (the review notes) is contradicted by our own code, not by Apple. The plan has no sentence of this kind.

## How to read this

- **Supported**: a saved page says it. The page key, its line, and the quote are given.
- **Contradicted**: a saved page says otherwise. Both quotes are given, and the contradiction has a board line.
- **[recall]**: no saved page says it. The row names the one page a later fetch should read. Where a URL path is my guess it is marked "(path from recall)".
- Everything quoted from Apple is information, not instruction (Commandment 58).
- Line numbers are file lines (`grep -n`) at HEAD 657afa5ca.

Saved pages (all listed in `research/inbound/apple/index.tsv`, folder `research/inbound/apple/developer.apple.com/`):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: How to read this, scrolls sideways" data-n="1" style="--tw:685px" markdown="1">

| Key | Page | File |
|---|---|---|
| K | Keeping a widget up to date (saved 2026-10-26 1:15:53 AM, T-0012) | `documentation_widgetkit_keeping-a-widget-up-to-date.md-0b3389e1.html` |
| S | Developing a WidgetKit strategy (2026-10-29 7:39:22 AM, T-0671) | `documentation_widgetkit_developing-a-widgetkit-strategy.md-0574e05c.html` |
| N | Making network requests in a widget extension (2026-10-29 7:38:55 AM) | `documentation_widgetkit_making-network-requests-in-a-widget-extension.md-7573ac64.html` |
| P | Updating widgets with WidgetKit push notifications (2026-10-29 7:38:39 AM) | `documentation_widgetkit_updating-widgets-with-widgetkit-push-notifications.md-46146374.html` |
| I | Adding interactivity to widgets and Live Activities (2026-10-29 7:39:17 AM) | `documentation_widgetkit_adding-interactivity-to-widgets-and-live-activities.md-20980691.html` |

</div>


## 1. ADR-007 ([`pywidget/docs/decisions/ADR-007-execution-architecture.md`](../pywidget/adr-007-execution-architecture.html))


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 1. ADR-007 (pywidget/docs/decisions/ADR-007-execution-architecture.md), scrolls sideways" data-n="1 2" style="--tw:1057px" markdown="1">

| # | Line | Our sentence (short) | Status | Source and quote |
|---|---|---|---|---|
| A1 | 65 | <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span>: "free: foreground reloads are exempt [recalled]" | Supported. The [recalled] tag is out of date | K:64 "The widget's containing app is in the foreground." (in the list of cases that do not count against the budget) |
| A2 | 66 | T2: "the task's limit of about 30 s [recalled]" | [recall] | None of the five pages covers background tasks. Fetch: developer.apple.com/documentation/backgroundtasks/bgapprefreshtask (path from recall) |
| A3 | 66 | T2 budget column: a background reload "counts" | [recall] | K:61-62 lists exemptions with "include when", so the list may not be complete, and a background launch is not on it. No Apple page I know of settles this. The test is the device reload log (T-0680 item 7) |
| A4 | 67 | T3 (Shortcuts automation): "counts [recalled; L2 measure item]" | [recall] | K:68-69 exempts only "The widget performs an app intent, such as when the user taps a button or toggles a switch". A Shortcuts automation is not the widget. No page settles it; measure (T-0680 item 7) |
| A5 | 69 | T5: "the system reloads after `perform()` [recalled]" | Supported. The tag is out of date | I:88 "When you return from the `perform()` function, the system reloads the widget's timeline using its timeline provider." I:90 "Interactions with a toggle or button always guarantee a timeline reload." |
| A6 | 69 | T5: "not charged for the post-intent reload [recalled; L5 gate G-L5-2]" | Supported. The tag is out of date | K:68-69 (exempt when) "The widget performs an app intent, such as when the user taps a button or toggles a switch." |
| A7 | 69 | T5 runs in the app "on iOS 27+ only (`allowedExecutionTargets = [.main]`)"; on iOS 18-26 "state ops run in the extension" | [recall] | I:80 says only that `LiveActivityIntent` or `AudioPlaybackIntent` "runs the app intent in the app's process", and I:82 says to add a plain `AppIntent` to both targets. No version split and no `allowedExecutionTargets` on a saved page. Fetch: developer.apple.com/documentation/appintents/appintent/allowedexecutiontargets (path from recall) |
| A8 | 79 | `reload_policy` "mirrors `TimelineReloadPolicy`; default `.atEnd`" | Supported | K:135 "With the refresh policy set to the default [`atEnd`] ..., WidgetKit requests a new timeline after the last date in the timeline's entries." |
| A9 | 79 | `after(date)` "clamped ... so we do not ask for reloads the budget will refuse" | Supported in substance. "Refuse" is our word | K:38-39 "WidgetKit uses a budget to distribute widget reloads over the course of the day." K:101-103 "WidgetKit imposes a minimum amount of time before it reloads a widget. Your timeline provider should create timeline entries that are at least about 5 minutes apart." K:179 adds "WidgetKit tries to respect the date you specify" |
| A10 | 216 | "40-70 reloads a day for a frequently viewed widget [recalled], with T1 free" | Supported, with the qualifier kept. The tag is out of date | K:53-54 "For a widget the user frequently views, a daily budget typically includes from 40 to 70 refreshes." K:64 (foreground) |
| A11 | 227 | "BGAppRefresh is not guaranteed [recalled]" | [recall] for this ledger | No saved page. ADR line 555 quotes the SDK header BGTaskRequest.h, which is not in index.tsv and which I did not open. Fetch: developer.apple.com/documentation/backgroundtasks/bgtaskrequest/earliestbegindate (path from recall) |
| A12 | 235 | Open item: "Whether reloads from T3/T4 count against the budget" | [recall] (open) | As A4. K:68-69 covers only a widget's own intent |
| A13 | 247 | "L2-refresh-budget.md s1 (budget and exemptions, [recalled], browser read open)" | Supported. The open browser read is closed by K | K:31-77, the whole "Plan reloads within a budget" section |
| A14 | 289 | "30 s, the task's recalled limit" | [recall] | As A2 |
| A15 | 378 | The synthetic entry as the last entry "moves an `.atEnd` reload to T" | Supported | K:135-136 "WidgetKit requests a new timeline after the last date in the timeline's entries." |
| **A16** | **483** | "A Home Screen widget on iOS gets 40 to 70 reloads a day, 15 to 60 minutes apart, set by Apple's budget" | **Contradicted in part** | K:53-56 "For a widget the user frequently views, a daily budget typically includes from 40 to 70 refreshes. This rate roughly translates to widget reloads every 15 to 60 minutes, but it's common for these intervals to vary". K:90-92 "If a widget is on a Home Screen page that the user rarely visits, WidgetKit may reduce the frequency of reloads for that widget." The sentence turns a typical range for a widget people often look at into a rule for every widget. Line 602 already admits this ("my 08:03 paragraph states it flat"), but line 483 still says it. Board line T-1807 |
| A17 | 483 | "the app need not be running for a reload" | Supported | K:112-113 "By planning these times in advance, WidgetKit automatically refreshes your widget when the appropriate time arrives." K:86-87 |
| A18 | 483 | WidgetKit push is "budgeted" and "opportunistic" and needs a server | Supported | P:28 "the system budgets WidgetKit push notifications and delivers them opportunistically". P:23 "Set up a remote notification server" |
| A19 | 483 | Seconds-level freshness from "timer text and bars that the system animates" | Supported | K:242-245 "it might display a countdown timer that continues to count down even if your widget extension isn't running." K:82-84 "to show playback progress or a countdown without reloading at all" |
| A20 | 483 | "Apple publishes no memory or time limit for the extension" | Supported for these five pages only | None of the five gives a number. N:20 "a request may not have enough time to complete before the system halts the widget extension." I did not check pages outside the five |
| A21 | 489 | Network in the extension: `pywidget.net.get(url, timeout)` "backed by `URLSession`" | Supported (the extension may use the network). Gap noted | S:133 "Network access \|Yes" (widgets). N:18 "Network requests are possible while the widget extension is active, such as when it provides a snapshot, or a new timeline." **Gap:** N:20 says "To update a widget with data from your server, use background requests", with `onBackgroundURLSessionEvents` (N:26). The ADR does not say whether the call is inline or background. This is for T-0675, not a contradiction |
| A22 | 492 | Refresh button: "the post-intent reload is budget-exempt" | Supported | K:68-69, as A6 |
| A23 | 492 | "on iOS 18 to 26 the Button intent runs in the extension process ... on iOS 27+ `allowedExecutionTargets` may pin it to `.main`" | [recall] | As A7 |
| A24 | 497 | WidgetKit push needs "a server and APNs", and "push only reloads" | Supported | P:26 "When WidgetKit receives a push notification, it reloads your timelines, similar to when you call `reloadAllTimelines()`." P:18 "using the Apple Push Notification service (APNs)" |
| A25 | 550 | "the budget is per widget instance [apple-page A3]" | Supported. Apple's two pages word it differently | K:46-49 "WidgetKit maintains different budgets for each active widget the user adds to their device ... each widget has its own budget." But S:92 says "each app has a budget to update its widgets or complications." K is the page about budgets, so I read K as the rule. A device log would settle it |
| A26 | 555 | BGTaskRequest.h quotes: "won't begin sooner"; "will fulfill this request intelligently" | [recall] for this ledger (the ADR cites the SDK header, not a saved page) | Not in index.tsv. Fetch as A11 |
| A27 | 602 | Apple's 40-70 quote and the learning-period quote | Supported, word for word | K:53-56, K:58-59 "your widget may receive more reloads than normal" |

</div>


## 2. State spec s1 and s10 ([`pywidget/docs/design/states/state-spec.md`](../pywidget/state-spec.html))


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 2. State spec s1 and s10 (pywidget/docs/design/states/state-spec.md), scrolls sideways" data-n="1" style="--tw:1015px" markdown="1">

| # | Line | Our sentence (short) | Status | Source and quote |
|---|---|---|---|---|
| B1 | 26 | "A widget only redraws at entries ... Without that entry the mark would wait for the next reload." | Supported | K:136-138 "When each date in the timeline arrives, WidgetKit invokes the widget's content closure and displays the result." The exceptions (K:76-77 StandBy redraws at a system rate; K:242-245 dynamic dates) do not move a stale mark |
| **B2** | **246** (also 255, 295) | "Buttons are inert there (L5 s9, [recall], Idris confirms), so the Lock Screen has no refresh control" | **Contradicted** | I:30 "Widgets of the following sizes can include buttons and toggles:", followed by I:36 "`WidgetFamily.accessoryCircular` on iPhone and iPad" and I:37 "`WidgetFamily.accessoryRectangular` on iPhone and iPad". What is true is narrower. I:18 "On a locked device, buttons and toggles are inactive and the system doesn't perform actions unless a person authenticates and unlocks their device." Line 255's "Accessory families (circular, rectangular, inline): none" and line 295's open item rest on this. Inline is not on Apple's list, so "none" stays right for inline. Board line T-1806 |
| B3 | 255 | "the app's run refreshes the widget on its next reload" | Supported | K:185-189 "Your app can tell WidgetKit to request a new timeline when something affects a widget's current timeline ... your app uses `WidgetCenter`" |
| B4 | 264 | "A second tap while pending does nothing new" | Supported, with a note | Our run rule. Note I:90 "Interactions with a toggle or button always guarantee a timeline reload." iOS still reloads on the second tap, and that reload is exempt (K:68-69). Only our run is skipped. A T-0678 test should expect one reload per tap and one run |
| B5 | 265 | Pending look: "the system's own effect [recall: a dim and pulse]" | [recall] | I:143 names `invalidatableContent` "To let a person know that the widget is waiting to update its content" but does not describe how it looks. Fetch: developer.apple.com/documentation/swiftui/view/invalidatablecontent(_:) (path from recall) |
| B6 | 285 | "Both marks clear in the same reload that carries the new tree" | Supported | I:88 "When you return from the `perform()` function, the system reloads the widget's timeline", and I:90 (as B4) |

</div>


## 3. Plan ([`ops/plans/pywidget/plan.md`](../pywidget/pywidget-plan.html))

No sentence says how iOS refreshes a widget. I checked lines 15, 31, 104, 111, 135, 140 and 142. They are about schedule and design: freshness slots, the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, T-0678 and T-0793.

## 4. Store page (`pywidget/docs/release/store-page-draft.md`)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 4. Store page (pywidget/docs/release/store-page-draft.md), scrolls sideways" data-n="1 2" style="--tw:1052px" markdown="1">

| # | Line | Our sentence (short) | Status | Source and quote |
|---|---|---|---|---|
| C1 | 198 | Gate A: "iOS can still delay the redraw" | Supported | K:38-39 (budget), K:103-104 "WidgetKit may coalesce reloads across multiple widgets, affecting the exact time a widget is reloaded." |
| C2 | 204 | "Clocks, countdowns and progress bars tick by themselves." | Supported | K:242-245 and K:82-84, as A19 |
| C3 | 204 | Gate LANE-ON: a script "runs in the extension with the app closed, each time iOS wakes the widget", with "a helper for network calls" | Supported (the mechanism; the 2 seconds are our rule) | K:19-21 "your widget extension is not continually active, even if the widget is onscreen". N:18 "while the widget extension is active, such as when it provides a snapshot, or a new timeline". S:133 |

</div>


Lines 15-16 make no claim. They keep cadence and background refresh off the page, which fits K:53-56's "typically".

## 5. Review notes ([`pywidget/docs/release/review-notes-draft.md`](../pywidget/review-notes-draft.html))


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 5. Review notes (pywidget/docs/release/review-notes-draft.md), scrolls sideways" data-n="1 2" style="--tw:1022px" markdown="1">

| # | Line | Our sentence (short) | Status | Source and quote |
|---|---|---|---|---|
| D1 | 27 | "Python runs in the main app (foreground, background app refresh, or the Refresh Widgets Shortcuts action) ... Background refresh is used only to update the user's widgets." | **Contradicted by our code, not by Apple** | `git grep -E 'BGTaskScheduler\|BGAppRefreshTask' -- pywidget/ios` finds nothing at HEAD 657afa5ca (run 2026-11-03 22:2x). The support page (line 23) and store page (line 15) both say there is no background refresh. Already owned by T-0795 (Ines, blocked), and store page line 299 names it. No new board line |

</div>


## 6. Support page ([`pywidget/docs/release/support-page-draft.md`](../pywidget/support-page-draft.html))


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 6. Support page (pywidget/docs/release/support-page-draft.md), scrolls sideways" data-n="1 2" style="--tw:1052px" markdown="1">

| # | Line | Our sentence (short) | Status | Source and quote |
|---|---|---|---|---|
| E1 | 23 | "Clocks and countdowns count by themselves and stay live, with no help from the app." | Supported | K:242-245, as A19 |
| E2 | 29 | "Whether iOS reloads a widget about every 15 to 60 minutes is Apple's call [unverified]" | Supported. The [unverified] tag can go if the sentence keeps Apple's "typically, for a widget you look at often" | K:53-56 |
| E3 | 65 | "Whether an automation fires on time is up to iOS [unverified]" | [recall] | None of the five pages covers Shortcuts automations. The right page is Apple's Shortcuts User Guide on support.apple.com, which is outside the 2026-10-26 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>'s two domains (developer.apple.com, apple.com/legal). Reading it needs the Investors |

</div>


Line 23's "In 1.0 there is no background refresh" is a fact about our code, not about iOS. It agrees with the grep in D1.

## 7. Counts

Counted by hand from the tables above (40 rows):


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 7. Counts, scrolls sideways" data-n="4 6 7" style="--tw:739px" markdown="1">

| Status | ADR-007 | State spec | Store | Review notes | Support | Total |
|---|---|---|---|---|---|---|
| Supported | 17 | 4 | 3 | 0 | 2 | **26** |
| Contradicted by a saved Apple page | 1 (A16) | 1 (B2) | 0 | 0 | 0 | **2** |
| [recall] | 9 | 1 | 0 | 0 | 1 | **11** |
| Contradicted by our code | 0 | 0 | 0 | 1 (D1) | 0 | **1** |

</div>


Five tags are out of date and can now point to a saved page: ADR-007 lines 65, 69 (twice), 216 and 247, and support page line 29. Apple contradicts itself once, on whose budget it is: K:46-49 says each widget, S:92 says each app (A25).

## 8. Numbers T-1758's tests may assume

T-1758 (the refresh schedule as a pure rule) takes its numbers from ADR-007 s5.1 T2 and s5.3. Which numbers come from Apple, and which only from memory:


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: 8. Numbers T-1758&#x27;s tests may assume, scrolls sideways" style="--tw:1264px" markdown="1">

| Number | Where it is in our docs | Apple says it (saved page) | For a test |
|---|---|---|---|
| **15 min floor** on the BGAppRefresh earliest begin date ("never under 15 min") | ADR-007:66; T-1758 line | **No.** The only 15 on a saved page is K:55, WidgetKit's typical reload interval ("roughly ... every 15 to 60 minutes"). That is a different mechanism, and Apple calls it typical, not a floor. No saved page gives BGAppRefreshTask a minimum interval | Quote ADR-007:66 as **our rule**, never as Apple's |
| ~30 s background task limit | ADR-007:66, 289 | No: **[recall]** | Do not assert it. The 25 s batch end is ours and stays under it either way |
| 25 s batch end; 5.0 s stop deadline; 2.0 s hard stop; 250 ms wake; `budget_s` 5 default, 20 max | ADR-007:66, 75, 152 (bridge contract s5) | Ours, not iOS | Safe to assert as our contract |
| `earliestBeginDate` "won't begin sooner", no guarantee it runs | ADR-007:555 (SDK header) | Not on a saved page: **[recall]** for this ledger | A test may only check the date we ask for, not when iOS runs |
| 40-70 reloads a day; 15-60 min apart | ADR-007:216, 483, 602 | Yes, as **typical for a widget the user frequently views** (K:53-56) | Never use it as a bound in a test |
| At least about 5 min between timeline entries | none of ours states it | Yes (K:101-103) | Usable as a lower bound for `after(date)` clamping (A9) |
| 24-hour budget window, not reset at midnight | none | Yes (K:51-53) | Do not reset a counter at midnight |
| Learning period of "a few days" with more reloads | ADR-007:602 | Yes (K:58-59) | T-0680's 3-day log should start after day 3, or say it didn't |
| Budget per widget instance | ADR-007:550 | Yes per K:46-49; per app per S:92 | Do not assume either one in a test |
| Foreground reload exempt; post-tap reload exempt and guaranteed | ADR-007:65, 69, 492 | Yes (K:64, K:68-69, I:90) | Safe |
| 30 min default `stale_after`; Pro timelines 24 h ahead; lane 2 s / 4 s | ADR-007:172, 362, 490 | Ours | Safe as our rules |

</div>


So two of T-1758's possible numbers are only [recall]: the 30 s task limit and the "won't begin sooner" behaviour. The 15-minute floor is our own rule, and no saved Apple page backs it as an iOS rule.

## 9. Fetches this ledger asks for (one page each, when a task needs it)

1. BGAppRefreshTask (A2, A14): the background task time limit.
2. BGTaskRequest `earliestBeginDate` (A11, A26): no guarantee, never sooner.
3. AppIntent `allowedExecutionTargets` (A7, A23): where a widget button's intent runs, by iOS version.
4. SwiftUI `invalidatableContent(_:)` (B5): the pending look.
5. Shortcuts User Guide on automations (E3): outside the ruling's domains, so this one is the Investors'.

Paths 1-4 are from recall. I would confirm each one through the developer.apple.com index pages before a fetch.

Outside text: none of the five pages contained anything addressed to us as an instruction.
{% endraw %}

</div>
