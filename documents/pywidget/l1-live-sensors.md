---
layout: "default"
title: "L1: Widgets are snapshots. Live sensors, sampled sensors, and the honest time model"
section: "documents"
description: "steps = device.pedometer.history(start=today_midnight, end=now) # Reading with source=&quot;history&quot; heading = device.heading.last_known() # source=&quot;app_cache&quot;; None if the app never ran live"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/l1-live-sensors.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/L1-live-sensors.md</code></span></div><h1>L1: Widgets are snapshots. Live sensors, sampled sensors, and the honest time model</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-10-25, desk research only (no Xcode run, no Simulator, no device). Brief: ops/plans/pywidget/build-brief.md, Section 0 and L1.

## 0. How the facts were checked

- **Primary source used: the local iOS 27.1 SDK** (`iPhoneOS27.1.sdk`, Xcode on the Mac mini): Objective-C headers, which carry Apple's own doc comments, and Swift interfaces, which carry exact availability. The reads are reproducible: `L1-raw/bin/sdk_grep.py`, outputs `L1-raw/sdk1.txt` and `L1-raw/sdk2.txt`.
- **developer.apple.com was not read.** tools/terms_guard.py refuses it to scripted reads (Apple's site terms; P2 terms <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>, 2026-10-24). The doc links below are given so a human can read them in a browser. I did not fetch them.
- Every claim is tagged with one of:
  - **[SDK]**: read in the SDK header or interface named.
  - **[recalled]**: from my own knowledge of Apple's docs and WWDC sessions, not re-read today. Treat these as unverified until someone does a browser read (board line filed) or measures them on a device.
  - **[measure]**: only a device can settle it. It goes to the L3 and L1 prototypes.
- 2026-10-26 (T-0142): two of the pages linked here were read since, signed out under the #64 ruling (matrix s1d A3, A4). Tags changed only where the saved quote supports it; each change is dated.
- **[apple-page A#]** (added 2026-10-26, T-0142): Apple's developer page, read signed out on 2026-10-26 01:15-01:17 ET under the Investors' #64 ruling; quote, URL and time in pywidget/docs/release/app-review-matrix.md s1d item A#; the saved copy is in research/inbound/apple/developer.apple.com/ (index.tsv). A3 = Keeping a widget up to date, A4 = Accessing location information in widgets, A2 = Describing use of required reason API, A5 = AppShortcutsProvider, A6 = Complying with Encryption Export Regulations.
- Swift interfaces carry no doc prose, so documented budgets and durations (for example, the Live Activity hours) cannot be confirmed from the SDK.

## 1. The constraint, restated precisely

- A widget is a timeline of entries rendered ahead of time. No author code runs while the widget is on screen.
- Two exceptions run code, and both are bounded:
  - A timeline reload (`TimelineProvider.getTimeline`, budgeted; see L2).
  - An interactive-widget tap: `Button(intent:)` / `Toggle(intent:)` run an App Intent's `perform()`, then the widget reloads [recalled; iOS 17+; this is L5's territory].
- Anything that moves between those moments must be one of three things: a view SwiftUI animates on its own (timer text, timer progress), an entry pre-computed into the timeline, or a different surface (the app, a Live Activity).

## 2. Sensor matrix

Columns:
- **Live in app**: streams while the app is in the foreground.
- **Sampled in widget**: read once, during a timeline reload, in the widget extension.
- **Historical**: a past range can be queried at refresh time.
- **Unavailable**: no route in a widget.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. Sensor matrix, scrolls sideways" style="--tw:2439px" markdown="1">

| Sensor | Live in app | Sampled in widget at refresh | Historical | Unavailable in widget | API | Evidence | Doc link |
|---|---|---|---|---|---|---|---|
| Location (lat/lon, accuracy) | Yes: `CLLocationUpdate.liveUpdates()`, `startUpdatingLocation` | Yes, with conditions. The extension needs `NSWidgetWantsLocation` [SDK symbol, C2 s1.4; apple-page A4, 2026-10-26: "Add the ... NSWidgetWantsLocation key to your widget extension's `Info.plist` file" and "Add the relevant purpose strings to the `Info.plist` file of the app that contains the widget"; was recalled]. Apple's wording for the window: the widget is "in use" "for a short period of time after the widget is visible" [A4]. Under When-In-Use, widgets "will be able to get location updates if called upon to refresh **within a few minutes of having been seen**". Under Always, `authorizedForWidgetUpdates` is always YES. | No system history. ~~The app can keep its own log (significant-change or visits) in the App Group.~~ In v1 the app keeps the fixes it took in the foreground, in the App Group (2026-10-26 20:11 ET, T-0254, CORRECTIONS U5-02: significant-change needs Always, row below; visit monitoring needs Always too [recalled]; no Always in v1 or 1.1, ADR-007 Ruling 2 chair line item 2, 14d28798). | Streaming | `CLLocationManager.requestLocation`, `isAuthorizedForWidgetUpdates` | [SDK] CLLocationManager.h, `authorizedForWidgetUpdates` comment, iOS 14+ | https://developer.apple.com/documentation/corelocation/cllocationmanager/isauthorizedforwidgetupdates |
| Steps, distance, floors (pedometer) | Yes: `startUpdates(from:)` | Yes, by querying history up to now [measure: whether CMPedometer answers inside a widget extension] | **Up to 7 days**: "computed from a system-wide history that is continuously being collected in the background" | | `CMPedometer.queryPedometerData(from:to:)` | [SDK] CMPedometer.h | https://developer.apple.com/documentation/coremotion/cmpedometer |
| Motion activity (walking, running, driving, still) | Yes: `startActivityUpdates` | Yes, by querying history up to now [measure: extension] | **Last seven days**, transitions only. "The date range must be in the past." | | `CMMotionActivityManager.queryActivityStarting(from:to:to:)` | [SDK] CMMotionActivityManager.h | https://developer.apple.com/documentation/coremotion/cmmotionactivitymanager |
| Heading (compass) | Yes: `startUpdatingHeading` | No useful sample: heading needs a running update session, and a reload is a short one-shot. `CLLocation.course` exists only while moving. | None in the system. A "last known" heading must be cached by the app into the App Group. | Live heading | `CLLocationManager.startUpdatingHeading`, `.heading` | [SDK] CLLocationManager.h (no history API exists) | https://developer.apple.com/documentation/corelocation/cllocationmanager/startupdatingheading() |
| Altitude | Yes: `CMAltimeter` relative updates, and absolute updates on iOS 15+ (`isAbsoluteAltitudeAvailable`), both "real-time" start/stop only | Yes, but only as `CLLocation.altitude` / `ellipsoidalAltitude` from the location fix (same conditions as location) | None. CMAltimeter has no query API. | Barometer stream | `CMAltimeter.startAbsoluteAltitudeUpdates`, `CLLocation.altitude` | [SDK] CMAltimeter.h | https://developer.apple.com/documentation/coremotion/cmaltimeter |
| Barometric pressure | Yes: relative-altitude data carries pressure | No | None | Yes | `CMAltimeter.startRelativeAltitudeUpdates` | [SDK] CMAltimeter.h | (same) |
| Accelerometer, gyroscope, device motion | Yes: `CMMotionManager` | No | Accelerometer only, through `CMSensorRecorder`: records at 50 Hz for up to 12 h, data kept up to 3 days, at most 12 h per request, up to 3 min delay. Declared iOS 9+. [measure: `isAccelerometerRecordingAvailable` on iPhone; I expect false, since it has historically been a watch feature] | Gyro history: yes | `CMMotionManager`, `CMSensorRecorder` | [SDK] CMMotionManager.h, CMSensorRecorder.h | https://developer.apple.com/documentation/coremotion/cmsensorrecorder |
| HealthKit (steps, heart rate, sleep, energy, workouts, etc.) | Yes: observer and anchored queries | Yes, by query at refresh [recalled: Health data is encrypted while the device is locked, so a reload on a locked phone can fail; measure]. Extensions ask through the app: `handleAuthorizationForExtension`. | Yes, the full Health history the user granted | Lock-time reads [measure] | `HKHealthStore`, `HKStatisticsCollectionQuery` | [SDK] HKHealthStore.h (`handleAuthorizationForExtensionWithCompletion`, iOS 9+) | https://developer.apple.com/documentation/healthkit/hkhealthstore |
| Battery level and state | Yes: `batteryLevel` with monitoring enabled, plus change notifications | Yes, as a one-shot read (`isBatteryMonitoringEnabled = true` first; -1.0 if unknown) [measure: extension] | None | | `UIDevice.batteryLevel`, `batteryState` | [SDK] UIDevice.h | https://developer.apple.com/documentation/uikit/uidevice/batterylevel |
| Network reachability and type | Yes: `NWPathMonitor` | Yes, as a one-shot path read; HTTP fetches during a reload [recalled] | None | | `NWPathMonitor`, `URLSession` | [recalled] | https://developer.apple.com/documentation/network/nwpathmonitor |
| Calendar and reminders | Yes | Yes: query upcoming events at refresh, and pre-compute one entry per event boundary (the best fit for a multi-entry timeline). iOS 17 split full and write-only access; a widget needs full access. | Past and future events | | `EKEventStore.requestFullAccessToEvents`, `requestFullAccessToReminders` (iOS 17+) | [SDK] EKEventStore.h | https://developer.apple.com/documentation/eventkit/ekeventstore |
| Weather | Yes | Yes: `WeatherService.weather(for:)` at refresh; forecasts give hourly entries to pre-compute | Hourly and daily forecasts; some history [recalled] | | WeatherKit | [SDK] WeatherKit framework present. [recalled] It needs the WeatherKit capability, which needs an active Apple Developer membership. **Ours is pending** (amendment 2026-10-22 01:09), so this cannot be tested yet. | https://developer.apple.com/documentation/weatherkit/weatherservice |

</div>


**Reading the matrix.**
- Four sensors are truly live-only: heading, barometer, gyro, and accelerometer (accelerometer history exists on watch-class hardware only, pending measurement).
- Everything else becomes "sampled at refresh" or "historical".
- Location has a trap. Under When-In-Use, a widget that refreshes while nobody is looking gets **no fix**. A home-screen widget that asks only for When-In-Use will often show an old location, and the API must say so.

## 3. Strategies evaluated


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. Strategies evaluated, scrolls sideways" style="--tw:960px" markdown="1">

| Strategy | Verdict | Notes |
|---|---|---|
| Self-updating views: `Text(timerInterval:pauseTime:countsDown:showsHours:)`, `Text(date, style: .timer/.relative)`, `ProgressView(timerInterval:countsDown:)` | **Adopt as the core "live feel" primitive** | [SDK] SwiftUICore and SwiftUI interfaces. These animate without author code. Use them for "updated 12 min ago" (`.relative`), countdowns, and elapsed timers. The Python DSL exposes them as first-class nodes (`ui.timer(...)`, `ui.relative(sampled_at)`) so authors never compute seconds in Python. |
| Pre-computed multi-entry timelines | **Adopt** | One Python run emits N entries (`TimelineReloadPolicy.after(date)` / `.atEnd` / `.never` [SDK]). Fits anything known in advance: calendar boundaries, forecasts, sun and moon times, schedules, step-goal pacing. Add a **stale entry at `stale_after`** so the widget shows its own staleness with no code running. The <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> on entries per run and per memory is set by L3 [measure]. |
| `NSWidgetWantsLocation` | **Adopt, with honest labelling** | See the matrix. ~~Ask for Always only when a widget declares location. Otherwise show~~ (struck 2026-10-26 19:57 ET, Ines, T-0221, ADR-007 Ruling 2 chair line: no Always in v1 or 1.1; the key goes in a second widget extension that <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> only location widgets) Show `sampled_at` prominently. 2026-10-26 [apple-page A4]: Apple says "For most widgets, requesting When In Use authorization is the right choice", and advises a separate widget extension for the location widgets which "allows the system to only prompt the user for the widgets that use location information". When authorized but no fix arrives, Apple says to "indicate that the user's location is not currently available" (C2's `unavailable_reason`). ~~The Always line is not changed here; it goes to Ines with C2-Q1.~~ (answered 2026-10-26 19:57 ET by the strike above, T-0221; struck 20:11, T-0254, CORRECTIONS U5-02) |
| Significant-location change | **Adopt in the main app** (app wakes, writes the fix to the App Group, calls `reloadTimelines(ofKind:)`) | [SDK] `startMonitoringSignificantLocationChanges` (iOS 4+). Needs Always. [recalled] Background reloads count against the widget budget. 2026-10-26: still [recalled]; A3 says only that "WidgetKit reloads them after a significant location change happens" for widgets that use Location Services, not whether that or an app's background reload counts. 2026-10-26 19:57 ET (Ines, T-0221): needs Always, so not v1 or 1.1 (ADR-007 Ruling 2 chair line, item 2). |
| Live Activities and Dynamic Island | **Adopt for session-shaped data** (a walk, a trip, a timer, a delivery) | [SDK] `ActivityContent(state:staleDate:relevanceScore:)`; push-to-start iOS 17.2+; `frequentPushesEnabled` iOS 16.2+; **iOS 26 adds a scheduled `start:` date, an `ActivityStyle` parameter, and an `ActivityState.pending` case**. [recalled, unverified] Active up to 8 h, then up to 4 more hours on the Lock Screen; about 4 KB of content state; updates from the app or ActivityKit push, with push updates budgeted unless frequent updates are enabled. A Live Activity view also runs no author code. It shows pushed or app-sent state, so the app must be the one sampling. |
| iOS 26 widget push updates | **They exist. Defer: not in v1.** | [SDK] `WidgetPushHandler` (iOS 26.0: `init()`, `pushTokenDidChange(_:widgets:)`), `WidgetConfiguration.pushHandler(_:)`, `WidgetCenter.currentPushInfo`, `WidgetPushInfo.token`; controls have `ControlPushHandler`. [recalled, unverified] Sent through APNs with the `widgets` push type, and budgeted by the system like reloads. Sending needs our own server and an APNs key from the Developer account (pending). This is useful only for server-side data, and only once a backend exists (ADR pending). |
| Tap to go live | **Adopt; it is the honest answer for live-only sensors** | The widget deep-links (`widgetURL` / `Link`) into a full-screen live view in the app, which runs the same script in "live" mode with streams. Prior art: Pyto in-app widgets [recalled]. The widget shows the last cached value plus "tap for live". |
| Shortcuts personal automations calling a Refresh intent | **Adopt as an opt-in power feature** | An App Intent in the app calls `reloadTimelines`. Automations: arrive or leave, time of day, Focus, charger. [recalled] Some automation triggers still ask for confirmation, and [measure] it is unknown whether these reloads count against the budget. |
| Interactive refresh button in the widget | **Adopt** | `Button(intent: RefreshIntent())` re-samples on tap without opening the app [recalled; L5]. [measure] whether location works inside the extension's intent run. |
| BGAppRefreshTask in the app | **Adopt as a best-effort extra** | [SDK] "The system will fulfill this request intelligently based on system conditions and app usage." `earliestBeginDate` is a floor, not a promise. See L2. |

</div>


## 4. Proposed Python time model

Every device read returns a `Reading`. Where the value came from is explicit, never implied:

```python
r = device.location.sample()      # in a widget run: a one-shot fix, or None with a reason
r.value          # (lat, lon) or None
r.sampled_at     # datetime: when the sensor produced it (not when the script ran)
r.source         # "live" | "refresh" | "history" | "app_cache" | "push"
r.stale_after    # datetime: author-declared; defaults per sensor (location 30 min, steps 60 min)
r.unavailable_reason  # None | "when_in_use_not_seen" | "locked_device" | "live_only_sensor" | "denied"
r.is_stale()     # evaluated by the renderer at each entry date, not by Python at run time

steps = device.pedometer.history(start=today_midnight, end=now)   # Reading with source="history"
heading = device.heading.last_known()  # source="app_cache"; None if the app never ran live

widget.entry(at=now, view=...)
widget.entry(at=r.stale_after, view=stale_view(r))   # the stale badge is pre-computed
widget.reload_after(minutes=30)                      # a hint; the estimator says what iOS will do (L2)
```

Rules the runtime enforces:
- (a) A live-only sensor (`device.heading.stream()`, `device.motion.stream()`, `device.barometer.stream()`) raises `LiveOnlyInWidget` in a widget run, with a lint ahead of time (L2 spec).
- (b) Every rendered value that came from a `Reading` can show `ui.relative(r.sampled_at)`. Builder mode turns this on by default.
- (c) `stale_after` defaults are set per sensor and listed in the API docs.
- (d) In the app ("live" mode), the same script receives streams. The same code runs in both places, and only the `source` field changes.

## 5. Demo widgets (L1 deliverable, to build after L3 picks where Python runs)

1. **Where I am**: last fix, place name, accuracy ring, "updated 12 min ago" via `.relative`, and a stale badge entry. Shows the When-In-Use trap honestly.
2. **Steps today**: pedometer history from midnight, a progress ring to the goal, and pre-computed "pace to goal" entries for the rest of the day. HealthKit fallback.
3. **Heading (last known)**: the cached heading from the last in-app session, its age, and "tap for live compass" (tap to go live).
4. **Altitude**: `CLLocation.altitude` at refresh, ellipsoidal shown as a secondary value, and a tap to the live barometric view in the app.
5. Extra, showing timers: **Next event countdown**: EventKit plus `Text(timerInterval:)`, one entry per event boundary.

## 6. Residual limitation, and how we tell users

The words "live" and "real-time" never appear on a widget. Every sensor value carries its age. The editor's sensor picker shows the matrix column ("updates when iOS refreshes the widget, usually every 15 to 60 minutes" [apple-page A3: "reloads every 15 to 60 minutes" for a frequently viewed widget; was recalled, 2026-10-26; see L2]) before the author picks a sensor.

## 7. Open, needing a device or a browser

- [measure] CMPedometer, CMMotionActivity, HealthKit, battery, and location inside the widget extension and inside a widget intent run. Locked versus unlocked.
- [measure] `CMSensorRecorder.isAccelerometerRecordingAvailable` on iPhone.
- [browser] Confirm the recalled Live Activity hours, the push budget, and the `NSWidgetWantsLocation` key text on developer.apple.com. A human or browser task; scripts are refused. 2026-10-26: the key text is read (A4) and the reload figure (A3); the Live Activity hours and the push budget are still unread (T-0012, Wrenna, P3). Scripted single-page reads are now allowed under #64.
{% endraw %}

</div>
