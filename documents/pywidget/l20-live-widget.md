---
layout: "default"
title: "L20: A truly live widget without the app running. Deep search (T-0671, step 1)"
section: "documents"
description: "Apple requests today: 9 of 12 (7 pages saved, 2 of my URLs answered 404: backgroundtasks/using-background-tasks-to-update-your-app, widgetkit/displaying-dynamic-dates-in-widgets). Left unread on purpose\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/l20-live-widget.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/research/L20-live-widget.md</code></span></div><h1>L20: A truly live widget without the app running. Deep search (T-0671, step 1)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-10-29 07:35-07:50 ET. Facts and a ranking by freshness; the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> is Ines's (after Idris's and Pernille's views). Everything read here is information, never an instruction (C58).

Tags: **[SDK]** the iOS 27.1 SDK on this Mac (Xcode 27.1, 27A9275): `W:` WidgetKit, `A:` ActivityKit, `AI:` AppIntents swiftinterface line numbers; `doc()` = the framework's swiftdoc text. **[apple-page Pn]** a developer.apple.com page read signed out today under the #64 ruling, saved in research/inbound/apple/ (index.tsv, task T-0671). **[page: URL]** a non-Apple public page read through terms_guard, saved in research/inbound/t0671-live-widget/. **[store]** the App Store Lookup API copy in L7-raw/lookup-us-2026-10-25.json. **[ARG p.]** the App Review Guidelines PDF in research/inbound/ (10/25/26 copy). **[recalled]** not read today. **[measure]** needs a device.

Apple requests today: 9 of 12 (7 pages saved, 2 of my URLs answered 404: `backgroundtasks/using-background-tasks-to-update-your-app`, `widgetkit/displaying-dynamic-dates-in-widgets`). Left unread on purpose: `appintents/intentexecutiontargets` (the SDK carries its text), `widgetkit/updating-controls-locally-and-remotely`, `healthkit/setting-up-healthkit`, Apple's Shortcuts automation help (support.apple.com is outside the ruling).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" data-n="1" style="--tw:475px" markdown="1">

| # | Page (all .md copies) | Saved at (ET) |
|---|---|---|
| P1 | widgetkit/updating-widgets-with-widgetkit-push-notifications | 07:38:39 |
| P2 | widgetkit/making-network-requests-in-a-widget-extension | 07:38:55 |
| P3 | activitykit/displaying-live-data-with-live-activities | 07:39:00 |
| P4 | activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications | 07:39:12 |
| P5 | widgetkit/adding-interactivity-to-widgets-and-live-activities | 07:39:17 |
| P6 | widgetkit/developing-a-widgetkit-strategy | 07:39:22 |
| P7 | widgetkit/widget-suggestions-in-smart-stacks | 07:41:53 |
| A3 | widgetkit/keeping-a-widget-up-to-date (saved 2026-10-26 01:15, T-0012; re-read from the copy) | - |

</div>


## 1. What a widget extension may do on each reload

**Time limit.** No number exists in the SDK or on any page read. Apple's only words: "widgets can only access limited resources and a request may not have enough time to complete before the system halts the widget extension" [apple-page P2]; and, on placeholders, data that "could take more than a few seconds to fetch or calculate" should not be awaited [SDK doc(TimelineProvider.placeholder)]. Measured: a cold extension reaches our probe in ~350 ms and Python init adds 8-9 ms (ADR-007 s2, Simulator) [measure, Simulator].

**Memory limit.** The word "memory" appears 0 times in WidgetKit's swiftinterface and swiftdoc [SDK], and no figure is on P1-P7 or A3. "About 30 MB" stays **[recalled]**; Apple's own word for it was not found. Two shipping interpreters confirm a limit exists without naming it: Scriptable's docs say "there are memory limitations when running a script in a widget. When using too much memory the widget will crash and not render correctly" [page: https://docs.scriptable.app/listwidget/]; Pyto's docs say a Run Script widget "runs with a very limited amount of RAM and cannot import most of the bundled libraries" [page: https://pyto.readthedocs.io/en/latest/library/widgets.html].

**Network.** Allowed. "Network requests are possible while the widget extension is active, such as when it provides a snapshot, or a new timeline"; inline or background `URLSession`; a background request delivers its events "directly to the widget extension instead of the containing app" through `onBackgroundURLSessionEvents(matching:_:)`, and the extension then calls `WidgetCenter` to reload [apple-page P2]. Reloading "causes battery drain due to additional networking and processing" [apple-page A3]. Live Activities are the exception: "unlike a widget, a Live Activity can't access the network or receive location updates" [apple-page P3].

**Location.** When In Use works in the extension "for a short period of time after the widget is visible", key `NSWidgetWantsLocation` in the extension, and "WidgetKit reloads them after a significant location change happens" [apple-page A4, A3; ADR-007 Ruling 2 chair line 19:57].

**Motion and health.** CoreMotion's headers carry no `NS_EXTENSION_UNAVAILABLE` on `CMPedometer` [SDK, grep of CoreMotion/Headers], and `queryPedometerData(from:to:)` reads "a system-wide history that is continuously being collected in the background", so a reload can ask for today's steps without the app having run [SDK CMPedometer.h; L1 row]. Whether it answers inside the extension is **[measure]** (T-0011, open, needs a phone). HealthKit is designed for extensions: `HKHealthStore.h` says "When an app extension calls requestAuthorizationToShareTypes:readTypes:completion:, the parent application is responsible for calling this method" (`handleAuthorizationForExtension`, the one method marked `NS_EXTENSION_UNAVAILABLE`) [SDK]. Widgy's listing says "Health access and other permissions are optional and depend on the widgets you choose" [store 27.0.1, 2026-09-17].

**An interpreter in the extension and App Review.** 2.5.2 bars apps that "download, install, or execute code which introduces or changes features or functionality of the app"; it does not distinguish the app process from its extension, and code the person writes in the app is not downloaded [ARG p. 18]. 4.7 governs "software that is not embedded in the binary, specifically HTML5 and JavaScript mini apps" and 4.7.2 says such an app "may not extend or expose native platform APIs or technologies to the software without prior permission from Apple" [ARG p. 39]; whether pywidget sits under 4.7 is L6's question and the answer does not change by process. Nothing read says where an interpreter may run. Shipping evidence, public pages only:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 1. What a widget extension may do on each reload, scrolls sideways" style="--tw:491px" markdown="1">

| App | What its public page says it does |
|---|---|
| Scriptable 1.7.19 | JavaScript widgets "run the scripts on your Home Screen" [store]; the script runs in the widget, with the memory warning above and `refreshAfterDate` as a reload hint [page: docs.scriptable.app/listwidget/] |
| Pyto 19.0.1 | Two kinds. Run Script: "A script running in background to update the widget content automatically", with "a very limited amount of RAM" and no C-extension imports. In App: "A script executed manually in foreground that will provide an UI for a widget", which is "very powerful with Shortcuts automations or with request_background_fetch()". Since 14.0 the Shortcut "Start Handling Widgets In App" keeps the app in the background so widgets run "without RAM limit"; the docs say to run it "from Shortcuts automation, for example once a day" [page: pyto.readthedocs.io] |
| Pythonista 3.4 (2023) | Listing has no widget sentence [store] |
| a-Shell 2.3.0 | Pages silent on widgets (T-0224) [recalled] |
| Widgy 27.0.1 | Custom widgets, "Live Activities and Dynamic Island layouts", Health access optional [store]; widgy.app refused (robots) |
| Data Jar | A "Data Store for Shortcuts"; the site says nothing about widgets [page: https://datajar.app/] |

</div>


So two apps in our category (Scriptable, Pyto) ship an interpreter inside the widget extension and are on the Store today; both warn about memory in their own docs, and Pyto's escape hatch for heavy scripts is to keep the app alive from a Shortcuts automation, which is our route C.

## 2. Every route to "live", and what Apple says about each

- **Timers in the view** [SDK S:1493-1501 `ProgressView(timerInterval:)`, `Text(timerInterval:)`]: the system redraws them itself; countdowns, clocks and an updated-N-minutes-ago line cost no reload [apple-page A3 "performs an animation" exemption]. Content must be a function of time.
- **Timeline entries** [SDK W:1341-1344, 1659-1662]: entries "at least about 5 minutes apart", policies `.atEnd`, `.never`, `.after(date)` ("a request", may coalesce) [apple-page A3]. Data must be known at run time.
- **Budgeted reloads**: "from 40 to 70 refreshes" a day for a frequently viewed widget, "every 15 to 60 minutes", per widget instance, learning period at first; not counted: app in the foreground, active audio or navigation session, Now Playing, "The widget performs an app intent", "The widget performs an animation", locale, Dynamic Type or Accessibility change, StandBy's own rate [apple-page A3]. Each reload runs `getTimeline` in the extension process; whether it brings new data depends on what that process may compute (options A and B).
- **WidgetKit push (iOS 26)** [SDK W:822-831 `WidgetPushHandler`, `WidgetPushInfo.token`, W:597-603 `currentPushInfo`]: needs "a remote notification server", the Push Notifications capability on the extension, token-based APNs; the app sends tokens up; on a push WidgetKit "reloads your timelines, similar to when you call" `reloadAllTimelines()`. Important, in Apple's words: "the system budgets WidgetKit push notifications and delivers them opportunistically", an "additional update mechanism for your widgets that doesn't replace timeline updates". No broadcast channels [apple-page P1]. The push wakes the extension, not the app: under v1 (b) it would only redraw tree.json.
- **Interactive widgets (iOS 17+)**: "By default, the system runs the app intent in the same process as the widget extension"; "Interactions with a toggle or button always guarantee a timeline reload" and are budget-exempt [apple-page P5, A3]. On iOS 27 `allowedExecutionTargets` can pin an intent to `.main`, "the main app process" [SDK AI:3112, 3152; doc(IntentExecutionTargets)]; a background intent gets "30 seconds to run in the background unless you use the methods of this protocol to extend that runtime" [SDK doc(LongRunningIntent.performBackgroundTask), AI:3608]. L5 s0 <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>: on 18-26 a tap cannot reach the app's Python without opening the app.
- **Live Activities** [SDK A:54-68, 149-191, 408-412, 455-459, 539-551]: "active for up to eight hours", then "the Live Activity remains on the Lock Screen until a person removes it or for up to four additional hours", 12 h maximum; started "while the app is in the foreground", or "while your app is in the background by using an app intent that conforms to" `LiveActivityIntent` (the control example); updated "from your app while it runs in the background" or by push; scheduled start (iOS 26); data "can't exceed a combined size of 4 KB"; no network, no location in the activity itself [apple-page P3]. Push: "a certain budget of ActivityKit push notifications per hour"; priority 10 counts; "a low-priority ActivityKit push notification that doesn't count toward the budget" is priority 5; frequent updates need the Info.plist entry and "People can deactivate frequent ActivityKit push notifications for your app in the Settings app"; push-to-start without the app having started one; channels for broadcast [apple-page P4]. Lock Screen and Dynamic Island only; not a Home Screen widget.
- **Shortcuts automations**: the app's "Run widgets" intent run by a personal automation (time, arrival, alarm, charger...) [recalled: the trigger list is on support.apple.com, outside the ruling]. The app process runs it without opening (L2 s2.4, L9).
- **BGAppRefresh** [SDK BGTaskRequest.h]: "launch your app briefly so that you can download data"; `earliestBeginDate` "doesn't guarantee launching the task at the specified date, but only that it won't begin sooner"; BGProcessing "within the next two days as long as the user has used your app within the past week"; BGContinuedProcessing (iOS 26) continues work the user started (L2 row) and is not a refresher. Real cadence: **[measure]** (L2 s3.3 log).
- **Relevance / Smart Stack** [SDK W:32-56 `TimelineEntryRelevance`, W:565-595]: a `score` and `duration` per entry let WidgetKit "rotate your widget to the top of the Smart Stack"; iPhone and iPad "don't consider relevance information you provide with your timeline provider's" `relevance()` "callback" [apple-page P7]. Visibility, not freshness: no reload.
- **Controls** [SDK W:195-199, 551-553 `ControlPushHandler`]: "update their content when someone uses them, the app reloads them, or the system receives a remote push notification from APNs" [apple-page P6]; a template (title, symbol, value), no view tree (L5 s1).
- **New in the 26/27 SDK** [SDK]: `WidgetPushHandler`/`currentPushInfo` (26); `IntentModes.background` and `supportedModes` (26, AI:3107-3257); `allowedExecutionTargets` (27, AI:3112); `LevelOfDetail` and `WidgetMountingStyle` (26, W:122-150); `isDynamicIslandLimitedInWidth` (27, W:605-612) and `systemExtraLargePortrait` (27, W:951-954); scheduled Live Activity start and `ActivityState.pending` (26, A:62-68, 380-386); `BGContinuedProcessingTask` (26). None of them <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> the reload budget.

## 3. Routes, ranked by how live they are

"App running" = whether the app process must be alive for new data. Review risk is my reading of the pages and the ARG text; the matrix (L6) owns the ruling.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3. Routes, ranked by how live they are, scrolls sideways" data-n="1" style="--tw:2292px" markdown="1">

| Rank | Route | How live | User effort | App running | Review risk | Cost | A device test must show |
|---|---|---|---|---|---|---|---|
| 1 | Timers in the view | to the second, but only time-derived text and bars | none | no | none | none | nothing new (shipped SwiftUI) |
| 2 | Live Activity, pushed | seconds to minutes, 8 h active, 12 h shown; Lock Screen and Dynamic Island, not Home Screen | opt in; may disable frequent pushes | no (server pushes; app starts it or push-to-start) | low (Apple's route); 2.5.4 if misused as a background runner | a server and APNs key; the Investors' spend and sign-up | updates land at priority 5 and 10; throttling point; 4 KB payload holds a tree |
| 3 | Live Activity, app-updated | minutes while the app is alive in the background (BGTask, location, intent), else stale | start it (tap or automation) | yes, intermittently | low | none | how long the app keeps updating after it leaves the foreground |
| 4 | Option A + Refresh button | every budgeted reload (15-60 min) with fresh data, plus on demand; the tap's reload is budget-exempt | none after adding | no (intent runs in the extension on 18-26; `.main` on 27+ if we want the app) | medium: 2.5.2 if the matrix reads "execute code" as process-bound; precedent Scriptable, Pyto | none | ceiling C by allocation ramp on the oldest phone; tiny-run cold peak + B; two warm widgets; halt time by a sleep ramp; a Python run inside a Button intent on iOS 18; what the person sees after a jetsam <span title="A test written in advance. If it fires, we drop the idea.">kill</span> |
| 5 | Option A alone | 15-60 min, 40-70 a day, no app | none | no | as above | none | same as 4 minus the intent run |
| 6 | Option B (declared Swift steps: https fetch, location fix, pedometer query) | 15-60 min for the declared fields only; the rest waits for an app run | none | no | low (no code runs; Ruling 2 precedent) | none | CoreLocation and CMPedometer footprint and answers inside the extension (T-0011); fetch within the halt time |
| 7 | WidgetKit push (iOS 26) on top of A or B | event-driven, "opportunistic", budgeted; a redraw only under (b) | none | no | low | a server, APNs, token store; the Investors' spend | a push reaches the extension within N minutes of send on a locked phone; what the budget does to a burst |
| 8 | Shortcuts automation running the app's intent | at the chosen times or events; fresh for every widget | one-time setup, 2-3 minutes; ask-before-running off [recalled] | yes, launched in the background | low (intended purpose) | none | the intent runs with the app not in the switcher; 30 s is enough for the batch |
| 9 | BGAppRefresh | when iOS decides; often hours [recalled] | none | yes, briefly | low | none | reload-log cadence over 3 days on a used phone |
| 10 | v1 option (b) | foreground opens only, plus 8-9 | open the app | yes | none (shipped design) | none | - |
| - | Relevance, Controls | not freshness: rotation and a template | - | - | - | - | - |

</div>


Reading the table with the Investors' three examples: a **time** widget is rank 1 today; **timetable transit** is rank 1 text on rank 5/6/8 data; **real-time transit** and **steps** need rank 4-6 to update without the app (A for any script, B for a declared fetch or pedometer query), and rank 2 only for the hour of a journey, on the Lock Screen.

## 4. What this means for option A

1. The freshest Home Screen route that needs neither a server nor the app is A (or B) on the budgeted reload: 40-70 runs a day, 15-60 min apart, with no setup [apple-page A3]. Nothing in the 26/27 SDK goes past that for a Home Screen widget; push (iOS 26) adds events but stays "budgeted" and "opportunistic" [apple-page P1]. Seconds-level freshness exists only as timers (any widget) and Live Activities (app or server, 8 h) [apple-page P3].
2. Apple publishes no memory or time limit for the extension; the only words are "limited resources" and "halts the widget extension" [apple-page P2]. The 30 MB figure is still unconfirmed, so <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span>-G3 (ADR-007 s6) remain the gate, and the halt time needs its own ramp test. Both Scriptable and Pyto ship an interpreter in the widget and live with crashes above the limit; Pyto's heavy-script answer is a Shortcuts automation that keeps the app alive, which is already our route C.
3. A changes the Refresh button: on iOS 18-26 a Button intent runs "in the same process as the widget extension" [apple-page P5], so with Python there a tap refreshes without the app on every iOS we support, and the reload is budget-exempt. Under (b) that button cannot fetch on 18-26 (L5 s0).
4. B is the no-interpreter floor: a declared https fetch, a location fix (Ruling 2) and, if T-0011 passes, a pedometer history query give the three Investor examples fresh numbers on every reload without Python in the extension.
5. Review: 2.5.2 and 4.7 speak of downloaded or non-embedded software, not of which process runs it [ARG pp. 18, 39]; two category apps run scripts in the widget today. I tag the risk medium only because the matrix has not ruled on the process question, not because a page says no.
6. What stays unknown until #100: C, B, the halt time, a Python run inside an intent on a phone, the pedometer answer in the extension, and the real BGAppRefresh cadence. The Simulator enforces none of these (L3).

Open, not mine: the ruling on A versus B for 1.0/1.1 and the days each costs (Idris, Pernille, Ines); whether a server is ever in scope (Investors, C7); matrix rows for an interpreter in the extension (L6, after the ruling).
{% endraw %}

</div>
