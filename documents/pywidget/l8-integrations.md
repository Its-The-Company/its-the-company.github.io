---
layout: "default"
title: "L8: Integration catalog (pywidget)"
section: "documents"
description: "developer.apple.com is read only by a person&#x27;s browser (rulings-v2 &#x27;P2 terms&#x27;, G2a), so this file reads Apple&#x27;s own SDK instead: the iOS 27.1 SDK in the installed Xcode (swiftinterface files, ObjC headers, and the doc\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/l8-integrations.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/L8-integrations.md</code></span></div><h1>L8: Integration catalog (pywidget)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-10-25, Day 4. Desk research for brief L8 (ops/plans/pywidget/build-brief.md, L8; Section 2.5 'Entry points').

## Sources and how to read the tags

developer.apple.com is read only by a person's browser (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>-v2 'P2 terms', <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2a</span>), so this file reads Apple's own SDK instead:
the iOS 27.1 SDK in the installed Xcode (swiftinterface files, ObjC headers, and the doc comments inside the .swiftdoc files),
plus the macOS 27.0.1 `shortcuts` command-line tool run locally. Script and output: `L8-L9-raw/bin/sdk_checks.sh`, `L8-L9-raw/sdk-checks.txt`.

- **[SDK]** the declaration, its availability, or its doc comment is in the iOS 27.1 SDK (line in sdk-checks.txt).
- **[CLI]** observed on this Mac with the `shortcuts` tool.
- **[M]** from memory, not in the SDK. A person checks it in a browser on developer.apple.com before anything is built on it. A widget row marked [M] is a prototype question for L1/L2, not a plan.
- **[apple-page A#]** (added 2026-10-26, T-0142): Apple's developer page, read signed out on 2026-10-26 01:15-01:17 ET under the Investors' #64 ruling; quote, URL and time in pywidget/docs/release/app-review-matrix.md s1d item A#; the saved copy is in research/inbound/apple/developer.apple.com/ (index.tsv). A3 = Keeping a widget up to date, A4 = Accessing location information in widgets, A2 = Describing use of required reason API, A5 = AppShortcutsProvider, A6 = Complying with Encryption Export Regulations.

Passed is not the same as correct: an [SDK] tag proves a symbol exists at that iOS version, not that it behaves in a widget extension. Every "widget" cell below still needs a device run.

## Ground rules that shape every row

1. **Widgets do not run arbitrary code on demand.** WidgetKit asks the timeline provider for entries; reloads are budgeted by the system [apple-page A3, 2026-10-26; was M]: "For a widget the user frequently views, a daily budget typically includes from 40 to 70 refreshes", "reloads every 15 to 60 minutes", one budget per widget the user adds; app-foreground reloads and app-intent taps do not count; entries "at least about 5 minutes apart" (detail in L2 s1). So the pattern for every live source is: fetch in the app, an App Intent, or the timeline provider, write to the App Group container, render from the cache.
2. **App extensions cannot use `UIApplication.shared`** (`NS_EXTENSION_UNAVAILABLE_IOS`) [SDK]. A widget, Share or Action extension cannot open another app's URL or launch our app by itself. Widgets open our app only through `widgetURL`/`Link` taps [M].
3. **App Intents run with a 30-second runtime limit** unless they report progress; the iOS 26+ SDK documents a wrapper that extends background time "past the standard 30-second limit present on some platforms" [SDK doc comment]. Long scripts belong in the app, not in an intent.
4. **No credentials for other services, ever** (brief Section 0). OAuth only; tokens in the Keychain.
5. **User code only.** Anything that arrives by URL, push or share is data handed to a script the user already has. It is never code we run (Guideline 2.5.2 exception requires code the user can see and edit; see L5).

## Catalog: Apple frameworks


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Catalog: Apple frameworks, scrolls sideways" style="--tw:1514px" markdown="1">

| Source | Method | In the app | In a widget | Notes, costs, review |
|---|---|---|---|---|
| Calendar, Reminders (EventKit) | `EKEventStore`; `requestFullAccessToEvents`, `requestWriteOnlyAccessToEvents`, `requestFullAccessToReminders` are iOS 17+ [SDK]; the old `requestAccessToEntityType` is deprecated [SDK] | Read, create, edit events and reminders | Read for the next entries, ideally from an App Group cache the app or an intent refreshes. Whether the extension reads the store directly with the app's grant: [M], prototype | Write-only access is a lighter prompt for "add event" scripts |
| Health (HealthKit) | `HKHealthStore`; the app-side `handleAuthorizationForExtension` is marked "Not available to extensions" [SDK], so extensions ask and the app completes the grant | Queries, statistics, writes for granted types | Cached summaries only. Health data is unreadable while the device is locked [M], so a widget must render the last cached value | Needs the HealthKit capability and a usage string. Guideline 5.1.3 limits on health data [M]: a user script posting health data to a web API is the user's act, but our own servers must never receive it. Medical claims are banned outright (Commandment 7); copy says "your Health data", never "health insights" |
| Home (HomeKit) | `HMHomeManager`, iOS 13+ [SDK] | Read and control accessories while the app is open | Not planned. Background HomeKit access is restricted [M] | Better route: Apple's own Home actions in Shortcuts, piped into our intents (see Shortcuts bus). A Control Center control (iOS 18 `ControlWidgetButton` [SDK]) can run a user script that then uses Shortcuts |
| Music (MusicKit) | MusicKit framework present [SDK]; needs the MusicKit app service on the App ID [M] | Library and catalog reads; playback needs the user's Apple Music subscription [M] | Cached "recently played"/"now playing" text from the app. Direct widget calls: [M] | App ID service is an account action (Investors). Data-driven only (Investors' taste: no music creation) |
| Weather (WeatherKit) | `WeatherService`, iOS 16+ [SDK] | Current, hourly, daily | Yes, in the timeline provider, within the reload budget; cache in the App Group | **Account and cost.** Needs the WeatherKit capability and app service on our Developer account [M]. Membership includes a monthly call allowance (I recall 500,000 calls a month) and paid tiers above it [M]. Every widget refresh for every user counts against our allowance, so a popular premade weather widget can create a bill. Any paid tier is a spend: the Investors' call. Attribution is "a legal requirement of using WeatherKit" [SDK doc comment] and must show in the app and on widgets that display its data. Alternative with no account cost: the user's own API key for a weather web API, OAuth or key in Keychain (that key is the user's credential for their own account, entered by them, which is not "collecting credentials" but needs a privacy line) |
| Contacts | `CNContactStore`; limited access `CNAuthorizationStatusLimited` iOS 18+ [SDK] | Search, read, write within the grant | Cached subset only (birthdays widget) | Contact data never leaves the device through our servers |
| Photos | `PhotosPicker` / PHPicker (no permission for picks) [M]; `PHPhotoLibrary` with limited library [M] | Pick, read, save, run scripts on images | Pre-sized images from the App Group; widget image memory is tight [M] | Picker first: no library prompt for most scripts |
| Location (CoreLocation) | `CLLocationManager`; `isAuthorizedForWidgetUpdates` iOS 14+ [SDK]: with When-In-Use plus that flag, widgets "will be able to get location updates if called upon to refresh within a few minutes of having been seen" [SDK header]; Always makes it always true [SDK header]. Info.plist key `NSWidgetWantsLocation` [SDK symbol, C2 s1.4; apple-page A4, 2026-10-26; was M]: in the widget extension's Info.plist, purpose strings in the app's; the extension gets location only "for a short period of time after the widget is visible" | One-shot, live updates. ~~geofences~~ (2026-10-26 20:11 ET, T-0254, CORRECTIONS U5-01: geofences not in v1, no C2 call; they would need their own ADR line, and Always for background delivery [recalled]) | Coarse refresh in the timeline provider under the rule above | ~~Ask When-In-Use; Always only for geofence scripts the user writes~~ Ask When-In-Use only (2026-10-26 20:11 ET, T-0254, CORRECTIONS U5-01: no Always in v1 or 1.1, ADR-007 Ruling 2 chair line item 2, Ines 19:57, 14d28798; for the Day 13 stretch, `NSWidgetWantsLocation` only in a second widget extension holding the location widgets) |
| Motion (CoreMotion) | `CMPedometer` queries and live updates [SDK]; `CMMotionActivityManager` [M] | Live streams (accelerometer, pedometer) | Historical pedometer queries (I recall a 7-day window [M]); no live streams | Motion usage string |
| Maps (MapKit) | `MKMapSnapshotter`, iOS 7+ [SDK]; SwiftUI `Map` in the app [M] | Interactive maps, search, routes | Static snapshot images rendered by the app or provider; no live map view in widgets [M] | MapKit's terms for redistribution of snapshots: a <span title="A figure we could not read because the source&#x27;s terms or robots file do not let our software read it. It never lowers a grade.">G2 gap</span> (rulings-v2 H193 <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span>); read before a marketplace widget ships map images |

</div>


## Catalog: bridges and outside sources


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Catalog: bridges and outside sources, scrolls sideways" style="--tw:1507px" markdown="1">

| Source | Method | In the app | In a widget | Notes |
|---|---|---|---|---|
| **Shortcuts, the bus** | Our App Intents (spec in L9-shortcuts.md). Any action from any app that adopted App Intents or SiriKit runs in a user's shortcut, and its output passes into "Run Script with Input" or "Set Widget Data" | Script receives text, files, URLs, dictionaries (as JSON text) | Yes, indirectly: the shortcut writes data, the widget renders it. Personal automations (time of day, arrive/leave, Focus) [M] can schedule it | This is the honest meaning of "works with other apps": what other apps expose to Shortcuts, nothing more. Templates below |
| x-callback-url | Outbound: `UIApplication.open` from the app only [SDK: extension-unavailable]. Inbound: our URL scheme `pywidget://x-callback-url/run?name=...&x-success=...` | Round trips with apps that support x-callback-url; results come back as URL query values | No (extensions cannot open URLs) | **Security rule:** an inbound URL may name an existing user script and pass it input; it may never carry code, and the first run from each source app asks the user. Any web page can fire our scheme |
| Web APIs with OAuth | `ASWebAuthenticationSession`; HTTPS callbacks (`ASWebAuthenticationSession.Callback`) iOS 17.4+ [SDK]; PKCE, no client secrets in the app [M]; tokens in a Keychain access group shared with the widget extension | Any HTTP API the user authorises; `requests`-style module in Python | Yes, with the token from the shared Keychain item (accessibility "after first unlock" so background reloads can read it [M]) | Each provider's API terms are read before we ship a template for it (Commandment 6). Users bring their own API keys for key-based APIs |
| Share extension | Receives text, URLs, images, files from any app's share sheet; runs a chosen script | n/a | n/a | **Memory:** Apple publishes no figure in the SDK. The often-quoted ceiling is about 120 MB [M, unverified]; measure CPython start-up plus a script on the oldest supported device. **Hand-off:** an extension cannot launch the app by itself [SDK rule 2]; it queues the job in the App Group and shows "Open pywidget to finish" (user tap). No responder-chain URL tricks (unsupported, banned by Section 0) |
| Action extension | Same input; returns modified content to the host app (for example, transformed text) | n/a | n/a | Same memory and hand-off limits |
| Files (outside our container) | `UIDocumentPickerViewController` / `fileImporter` [M]; keep access with `bookmarkData()` and `URL(resolvingBookmarkData:)`, then `startAccessingSecurityScopedResource` | Persistent access to user-picked files and folders, including iCloud Drive and other providers | Not direct: the app copies a snapshot into the App Group [M] | **Correction:** the `.withSecurityScope` bookmark options are macOS-only, `API_UNAVAILABLE(ios)` [SDK]. On iOS the scope rides on the picked URL; the bookmark is a plain bookmark (CORRECTIONS.md) |
| Clipboard | `UIPasteboard`; reading another app's content shows the system paste prompt (iOS 16+) [M]; `UIPasteControl` iOS 16+ gives prompt-free paste on a tap [SDK]; `detectPatterns` checks for a URL or number without reading [SDK] | Read/write with the prompt or the paste control | No | `clipboard` module mirrors this: `clipboard.get()` documents the prompt |
| Webhooks and push | (a) Background push to the app, which runs a script and calls `reloadTimelines` (throttled, best-effort [M]). (b) iOS 26+: `WidgetPushHandler` / `WidgetPushInfo` let a server push widget reloads directly [SDK]. (c) A phone cannot receive an inbound webhook: it needs a relay server | Yes with (a) | Yes with (b) on iOS 26+; otherwise the timeline's own polling | Both (a) and (b) need APNs on our Developer account and a server we run: account plus spend, the Investors' call. v1 recommendation: polling in timelines plus Shortcuts automations; push in a later version if the Investors fund a relay |

</div>


## Shortcuts bridge templates (recipes, v1)

We cannot generate shortcut files on iOS (L9). Each template ships as an in-app recipe card (numbered steps, the exact action names) and, once the Investors approve an iCloud account for the team, as an iCloud link a person builds and checks on a device.

1. **Weather to widget:** Get Current Weather → Set Widget Data (slot "weather", value: the weather as JSON text) → done. The widget renders it; no WeatherKit cost to us.
2. **Next meeting card:** Find Calendar Events (next 1) → Run Script with Input ("meeting_card.py") → Set Widget Data.
3. **Any web API on a schedule:** personal automation "Every hour" → Run Script ("poll_api.py") → Refresh Widget.
4. **Home state:** Get the state of a Home accessory → Set Widget Data (slot "home").
5. **Share anything into Python:** Receive input from the share sheet → Run Script with Input → Show Result.
6. **Arrive/leave:** automation on arrival → Run Script ("log_visit.py") → Get Widget State → Show Notification.

## Proposed marketing wording (proposal only; needs Investor approval, <span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>)

Replace "integrate with any app" with:

> **Connects to your Apple data, any Shortcuts action, and any web API.**
> Read your calendar, reminders, contacts, photos, location and motion with your permission. Chain any app's Shortcuts actions into your Python scripts and widgets. Sign in to web services you use, with the keys kept in your Keychain.

Shorter, for the App Store subtitle candidate list: "Python, widgets, and Shortcuts, together."

Words we must not use: "any app" (sandbox), "real-time widgets" (budgeted reloads), "health insights" (banned area), "automatic" for anything that needs a Shortcuts automation the user sets up.

## Open (for a person or a device)

- Browser checks on developer.apple.com for every [M] row that a feature rests on: WeatherKit allowance and tiers, widget reload budget, Share extension memory, `NSWidgetWantsLocation`, Health data while locked, HomeKit background rule. 2026-10-26 (T-0142): reload budget and `NSWidgetWantsLocation` read (matrix s1d A3, A4; tags changed above). WeatherKit struck from v1 scope and Share extension memory moved to 1.1 (Ines, T-0033, 02:10). Health data while locked and the HomeKit background rule are unread and stay [M].
- Device prototypes (L1/L2): EventKit and Keychain reads inside the widget extension; Share extension memory with CPython loaded.
- Accounts (Investors): WeatherKit and MusicKit app services, APNs, an iCloud account for template links.
{% endraw %}

</div>
