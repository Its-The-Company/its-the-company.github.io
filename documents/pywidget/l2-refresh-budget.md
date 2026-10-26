---
layout: "default"
title: "L2: Refresh budget. What Apple documents, a draft strategy, and the estimator spec"
section: "documents"
description: "[recalled]: not re-read today, because developer.apple.com is refused to scripted reads."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/pywidget/l2-refresh-budget.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/L2-refresh-budget.md</code></span></div><h1>L2: Refresh budget. What Apple documents, a draft strategy, and the estimator spec</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-10-25, desk research only. Sources and tags follow L1 section 0:
- **[SDK]**: the local iOS 27.1 SDK.
- **[recalled]**: not re-read today, because developer.apple.com is refused to scripted reads.
- **[measure]**: needs a device.

The ADR comes later, after the L3 benchmarks.

## 1. What is documented


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. What is documented, scrolls sideways" style="--tw:1222px" markdown="1">

| Topic | What it says | Tag | Link (not fetched) |
|---|---|---|---|
| Daily budget | A frequently viewed widget typically gets **40 to 70 refreshes a day**, about **one every 15 to 60 minutes**. The budget depends on how often the widget is viewed, so rarely viewed widgets get fewer. The brief's figure matches this as I recall it. | [recalled] | https://developer.apple.com/documentation/widgetkit/keeping-a-widget-up-to-date |
| Exemptions from the budget | Reloads don't count when the containing app is in the foreground, when it has an active audio or navigation session, when the system locale changes, or when Dynamic Type or an accessibility setting changes. Debugging (Xcode, or WidgetKit Developer Mode) <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> the limits, **so a simulator run says nothing about real refresh rates**. | [recalled] | (same article) |
| Reload policies | `TimelineReloadPolicy.atEnd`, `.never`, `.after(Date)`. A date is a request, not a schedule. | [SDK] WidgetKit interface | https://developer.apple.com/documentation/widgetkit/timelinereloadpolicy |
| App-triggered reload | `WidgetCenter.reloadTimelines(ofKind:)`, `reloadAllTimelines()`. Calls from the background count against the budget; calls while the app is in the foreground do not. | [SDK] for the API; [recalled] for the accounting | https://developer.apple.com/documentation/widgetkit/widgetcenter |
| What is placed | `WidgetCenter.currentConfigurations()` (iOS 18+, async) lists the installed widgets. This is the input to batching and the estimator. | [SDK] | (same) |
| Push reloads (iOS 26+) | `WidgetPushHandler`, `.pushHandler(_:)`, `WidgetCenter.currentPushInfo`, `WidgetPushInfo.token`. Sent through APNs; budgeted by the system; delivery not guaranteed. | [SDK] for the API; [recalled] for the budget | https://developer.apple.com/documentation/widgetkit/widgetpushhandler |
| BGAppRefreshTask | "launch your app briefly so that you can download data… The system will fulfill this request intelligently based on system conditions and app usage." `earliestBeginDate`: "doesn't guarantee launching the task at the specified date, but only that it won't begin sooner." | [SDK] BGTaskRequest.h | https://developer.apple.com/documentation/backgroundtasks/bgapprefreshtaskrequest |
| BGProcessingTask | Runs "when conditions are favorable for battery life… within the next two days as long as the user has used your app within the past week." `requiresExternalPower` exists. | [SDK] BGTaskRequest.h | https://developer.apple.com/documentation/backgroundtasks/bgprocessingtaskrequest |
| BGContinuedProcessingTask (iOS 26) | Continues a task **the user started** (with a fail or queue submission strategy). Queued requests are cancelled if the user removes the app from the app switcher. It is not a periodic refresher. | [SDK] BGTaskRequest.h | https://developer.apple.com/documentation/backgroundtasks/bgcontinuedprocessingtaskrequest |
| Interactive-widget intent | A tap on `Button(intent:)` runs `perform()` and then reloads that widget. [recalled] This reload is not charged as a system refresh; [measure]. | [recalled] | https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities |
| Location in widgets | Under When-In-Use, a reload gets a fix only "within a few minutes of having been seen". | [SDK] CLLocationManager.h | see L1 |

</div>


**Not documented anywhere I could reach:**
- A per-widget versus per-app split of the budget. My working belief is per widget instance [recalled; measure].
- A maximum entry count per timeline.
- The time limit of one `getTimeline` call. L3 measures it.

## 2. Draft refresh strategy (inputs to the ADR)

1. **Pre-compute first.** Every widget run emits a timeline covering its horizon: entries at known boundaries (events, forecast hours, pacing steps) plus a stale entry at `stale_after`. Default policy `.after(now + interval)`, where the interval comes from the estimator, not from the author's wish.
2. **Self-animating views carry seconds and minutes.** Clocks, countdowns, and "updated N min ago" never cost a reload.
3. **Foreground sweep.** Each time the app comes to the foreground (and when the IDE saves a widget script), run all placed widgets in **one batched Python run**, write every view tree to the App Group, then call `reloadAllTimelines()`. This is free under the exemption.
4. **Batch in the background too.** BGAppRefreshTask, significant-location wakes, Shortcuts intents, and pushes all trigger the same single batched run: one interpreter start, every widget computed, results cached. Each extension `getTimeline` then reads the cache when it is fresh, instead of re-running Python. This keeps the extension inside the L3 limits, and it also helps a widget whose own reload comes later than another's.
5. **Event-driven extras, opt-in.** A "Refresh widgets" App Intent for Shortcuts automations, and a refresh button inside the widget.
6. **Push: not v1.** It waits for the backend ADR and the Developer membership. The API (`WidgetPushHandler`) is ready when we are.
7. **Measure, then tune.** An on-device refresh log (section 3.3) is the ground truth. The estimator calibrates to it.

## 3. IDE tooling spec

### 3.1 Budget estimator

Inputs, from the script's manifest and static analysis:
- `refresh` hint (`every`, `at`, `on`)
- sensors used (from the `device.*` calls)
- network use
- timeline horizon and entry count
- widget family
- the number of placed instances (`currentConfigurations()` on device; the user's guess on the web)

Model. Bands, never a single number:
- `B_hi = 70`, `B_lo = 40` reloads a day for a frequently viewed widget. A rarely viewed widget: `B_lo = 10` (placeholder until the device log calibrates it).
- Expected interval: `I_exp = max(requested, 1440 / B)` minutes, shown as a range from `1440/B_hi` to `1440/B_lo` (about 21 to 36 min frequently viewed; worse otherwise).
- Freshness of the shown value: `I_exp`, plus the sensor penalty (location under When-In-Use: "may not update unless you looked at the widget minutes before"), plus nothing for timer views.
- With the device log: replace the B bands with the observed median and p90 intervals for this widget kind over 7 days.

Output card:
- "iOS will likely refresh this every 20 to 40 minutes. Your hint: every 1 minute."
- Timeline entries per run.
- "Seconds-level parts: animated by iOS (free)."
- Data age at worst: X.
- A link to the matrix column for each sensor.

### 3.2 Lint warnings (code `PWL` + number; shown inline in the editor and in Builder mode)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3.2 Lint warnings (code PWL + number; shown inline in the editor and in Builder…, scrolls sideways" style="--tw:1014px" markdown="1">

| Code | Severity | Trigger | Message (draft) |
|---|---|---|---|
| PWL001 | warning | refresh hint under 15 min | "iOS will not refresh this every N minutes. Expect about 15 to 60 minutes. Use a timer view or pre-computed entries for anything faster." |
| PWL002 | error | a live-only sensor (`heading.stream`, `motion.stream`, `barometer.stream`, `gyro`) in a widget run | "Live sensors do not run in widgets. Use `last_known()` and a tap-to-go-live link." |
| PWL003 | warning | location with When-In-Use only | "With 'While Using' permission, iOS gives widgets a location only if the widget was seen in the last few minutes. Show `sampled_at`, or ask for 'Always'." |
| PWL004 | warning | a value derived from `now` with second or minute granularity computed in Python | "This text is frozen at run time. Use `ui.timer` or `ui.relative`, which iOS animates." |
| PWL005 | info | a `Reading` rendered without a time label or `stale_after` | "Show when this was measured." |
| PWL006 | warning | timeline entries above the L3 <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> (TBD), or a horizon over 48 h | "Too many entries for the widget's memory. Trim to N." |
| PWL007 | warning | a network call with no timeout or cached fallback | "If the network is slow, iOS stops the refresh. Add a timeout; the last good render stays." |
| PWL008 | info | freshness that depends only on background tasks | "Background refresh is best-effort. iOS may skip it for hours." |
| PWL009 | info | a requested push source | "Push updates need the server feature (not available yet)." |
| PWL010 | warning | HealthKit read with no locked-device fallback | "Health data can't be read while the phone is locked. The last value will show." [pending measure] |
| PWL011 | warning (bitmap, asset); info (symbol) | an `Image` with no `accessibilityLabel`, not `accessibilityHidden`, not under a hidden ancestor or a labelled Button/Toggle/Link (PROPOSAL-002 s7; code assigned 2026-10-25, Odalys; reference check `tools/pywidget_a11y_lint.py`, tests `pywidget/tests/a11y/`) | "VoiceOver reads nothing for this picture. Add .accessibility_label('what it shows'), or mark it hidden if it is decoration." |

</div>


### 3.3 On-device refresh log

- Each `getTimeline` and each batched run appends one row to the App Group: `ts`, `widget kind`, `instance id`, `trigger` (`system` \| `app_foreground` \| `bg_refresh` \| `intent` \| `shortcut` \| `location_wake` \| `push`), `duration ms`, `peak memory` [L3], `outcome` (`ok`, `timeout`, `oom`, `cache_hit`), `sensors_ok` / `sensors_missing`.
- The log keeps 14 days in a ring buffer and never leaves the device unless the user exports it.
- The IDE shows a per-widget timeline strip, intervals (median and p90), and trigger shares. These feed the estimator (3.1).

## 4. Open

- [measure] Budget per instance or per app. Accounting for Shortcuts-triggered and intent-triggered reloads. The `getTimeline` time limit. The rarely-viewed band.
- [browser] Read the "Keeping a widget up to date" article and the WWDC25 widgets session for the exact exemption list and the push budget wording.
{% endraw %}

</div>
