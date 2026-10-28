---
layout: "default"
title: "C2: Device modules, Python API spec for v1"
section: "documents"
description: "The same script can run in three places. ADR-001 3.1 C4 sets the default execution: Python runs in the main app, the widget extension only renders (L3 option b). So a &quot;widget run&quot; is the app process producing a\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/c2-device-api.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/C2-device-api.md</code></span></div><h1>C2: Device modules, Python API spec for v1</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-10-25, Day 4. Desk spec, no Xcode run. Scope: ADR-001 section 3.1, C2 subset: clipboard, files, local notifications, http, location (When In Use), motion history (CMPedometer), keychain. Not in v1: HealthKit, contacts, photos, calendar, reminders (ADR-001).
Inputs read: build brief (C2, L1, L8, L12), ADR-001, L1-live-sensors.md (matrix, time model), L8-integrations.md, L9-shortcuts.md, L13-packages.md. L12 (Odalys, security) had not landed when this was written; section 1.5 says what it may change.
Host stubs: `pywidget/ios/python-stubs/` (section 10).

## 0. How the facts were checked

- developer.apple.com is a person-read source only (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>-v2 'P2 terms', <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2a</span>). Every Apple fact here was read in the **local iOS 27.1 SDK** headers instead. Script: `C2-raw/bin/sdk_checks.sh`; output: `C2-raw/sdk-checks.txt` (three passes; line numbers there).
- Tags:
  - **[SDK]**: declaration, availability or doc comment read in the iOS 27.1 SDK header named.
  - **[M]**: from memory, not in the SDK headers. A person checks it in a browser on developer.apple.com, or a device run settles it, before code depends on it.
  - **[apple-page A#]** (added 2026-10-26, T-0142): Apple's developer page, read signed out on 2026-10-26 01:15-01:17 ET under the Investors' #64 ruling; quote, URL and time in pywidget/docs/release/app-review-matrix.md s1d item A#; the saved copy is in research/inbound/apple/developer.apple.com/ (index.tsv). A3 = Keeping a widget up to date, A4 = Accessing location information in widgets, A2 = Describing use of required reason API, A5 = AppShortcutsProvider, A6 = Complying with Encryption Export Regulations.
- Passed is not the same as correct. An [SDK] tag proves the symbol exists at that iOS version. It does not prove it behaves the same in a background run or on a locked phone. Every "widget run" cell below is a device question until the L1/L3 prototypes run.

## 1. Rules shared by all seven modules

### 1.1 Run contexts

The same script can run in three places. ADR-001 3.1 C4 sets the default execution: **Python runs in the main app, the widget extension only renders** (L3 option b). So a "widget run" is the app process producing a timeline, not code inside the extension.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1.1 Run contexts, scrolls sideways" style="--tw:1225px" markdown="1">

| Context | `pywidget.context.mode` | How it starts | Can show a permission prompt | Typical lock state |
|---|---|---|---|---|
| App | `"app"` | User taps Run in the IDE | Yes | Unlocked, foreground |
| Widget run | `"widget"` | Foreground refresh, `BGAppRefreshTask`, or the Refresh Widgets intent from a Shortcuts automation | No | Often background; can be locked; can be before first unlock after a restart [M] |
| Shortcut | `"shortcut"` | Run Script / Run Script with Input (L9) | No, unless the intent continues in the foreground | Background or foreground; 30-second limit unless it reports progress (L8 rule 3, [SDK] AppIntents doc comment) |

</div>


`pywidget.context.foreground` (bool) is also exposed: a widget run started from the app's own Refresh button is foreground, and behaves like the app for sensors.

### 1.2 The Reading type (from L1 section 4)

Every sensor read returns a `Reading`, never a bare value, so no script can show stale data as live:

```python
@dataclass(frozen=True)
class Reading(Generic[T]):
    value: T | None
    sampled_at: datetime | None        # when the sensor produced it, not when the script ran
    source: str                        # "live" | "refresh" | "history" | "app_cache" | "network" | "cache"
    stale_after: datetime | None       # author-declared or the per-module default
    unavailable_reason: str | None     # why a fresh value could not be read; the value may still be a cached one
    def is_stale(self, at: datetime | None = None) -> bool
```

Used by location, pedometer and `http.get(cache_for=...)`. Clipboard, files, notifications and keychain are services, not sensors, and return plain values.

### 1.3 Errors

One hierarchy, in `pywidget.errors`, re-exported by each module. Each class also subclasses the nearest built-in, so plain `except PermissionError:` works.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 1.3 Errors, scrolls sideways" style="--tw:641px" markdown="1">

| Class | Built-in base | Raised when |
|---|---|---|
| `PyWidgetError` | `Exception` | Base class |
| `PermissionDenied` | `PermissionError` | The user said no, or a restriction applies. `.module`, `.fix` ("Settings > pywidget > Location") |
| `PermissionNotDetermined` | `PermissionError` | Never asked, and this context cannot prompt (widget run, shortcut). `.fix` = "Open pywidget and run this script once to allow it." |
| `NotAvailableHere` | `RuntimeError` | The call exists, but not in this context (e.g. clipboard in a widget run). `.context` |
| `LiveOnlyInWidget` | `NotAvailableHere` | A live stream asked for outside the app (L1 rule a) |
| `Unsupported` | `RuntimeError` | The hardware or OS lacks it (e.g. no floor counting) |
| `DeviceLocked` | `PermissionError` | Data is protected until the device is unlocked (or first unlocked after a restart) |
| `BridgeTimeout` | `TimeoutError` | The Swift side did not answer within `timeout` |

</div>


Native codes are mapped in each module section. The original code is kept in `.native` (e.g. `("CMErrorDomain", 105)`) for bug reports.

### 1.4 Permissions

- Prompts appear only in the `app` context, on first use or on an explicit `request_permission()`. Never in a widget run or a shortcut: those raise `PermissionNotDetermined` with the fix text.
- Builder mode and the linter (L2 PWL rules) read a script's imports and warn ahead of time: "This widget uses location; run it once in the app to allow it."
- Info.plist strings the app target needs (the spike owns the project; Ines or the spike owner adds them; copy is a draft for Maren):


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 1.4 Permissions, scrolls sideways" style="--tw:1358px" markdown="1">

| Key | Target | Module | Draft text | Evidence |
|---|---|---|---|---|
| `NSLocationWhenInUseUsageDescription` | App | location | "Your scripts and widgets use your location only when they ask for it. pywidget never sends it anywhere; your own script decides what to do with it." | [SDK] CLLocationManager.h, requestWhenInUseAuthorization comment (line 484) |
| `NSLocationTemporaryUsageDescriptionDictionary` (entry `ScriptLocation`) | App | location | "This script asked for your precise location for this session." | [SDK] CLLocationManager.h lines 547-555 |
| `NSMotionUsageDescription` | App | pedometer | "Your scripts and widgets read your step, distance and floor counts from the last seven days." | [M] key name not in the CoreMotion headers |
| `NSLocalNetworkUsageDescription` | App | http | "Your scripts can talk to devices on your own network, such as a home server." | [M] |
| `NSWidgetWantsLocation` | Widget extension | location, only if C2-Q1 is adopted | (boolean) | [SDK] symbol `_kCLCommonNSWidgetWantsLocationKey` exported in CoreLocation.tbd (pass 2). This confirms L1's "[recalled key name]". Placement [apple-page A4, 2026-10-26]: the key goes in the widget extension's Info.plist (as this row has it), the purpose strings in the app's; the extension gets location only "for a short period of time after the widget is visible". Apple advises a separate extension for location widgets so only they prompt. Nothing on the page covers the app's own background runs, so section 7's background rule stays [M] |

</div>


Notifications, clipboard, files and keychain need no Info.plist string. Notifications and the paste prompt use system text [M].

### 1.5 Enforcement lives in Swift (and what L12 may change)

The Python modules are thin. Every check (context, permission, scope) is made again at the Swift bridge, which is the only code that calls Apple APIs. The Python stubs only describe the contract. The brief's L12 asks for permission checks at the bridge. If Odalys's L12 adds per-script grants (likely for keychain scope and for any code that did not come from the user), section 9 and the error table gain a `GrantRequired` case. Nothing else here should move.

### 1.6 Threading and timeouts

Calls block the script's thread. The bridge does any main-thread work (prompts, pickers) and returns, or raises `BridgeTimeout` after `timeout` seconds (default 10; in a widget run, <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> by the run's remaining budget). Completion handlers that Apple delivers on its own queues (CMPedometer: "returned on a serial queue" [SDK]) are joined in Swift, never in Python.

## 2. Context matrix (summary)

Row cells say what the call does. "BFU" = before first unlock after a restart.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 2. Context matrix (summary), scrolls sideways" style="--tw:1615px" markdown="1">

| Module | App (foreground) | Widget run, foreground | Widget run, background, unlocked | Widget run, locked or BFU | Shortcut |
|---|---|---|---|---|---|
| clipboard | Read (system paste prompt [M]), write | Same as app | `NotAvailableHere` (policy; background pasteboard access is restricted [M]) | `NotAvailableHere` | `NotAvailableHere` (Shortcuts has its own clipboard actions; pass text as input) |
| files | Documents, shared, picker, bookmarks | Documents, shared, bookmarks | Same, no picker | Our files: readable after first unlock (we set `CompleteUntilFirstUserAuthentication`, [SDK] constant). BFU: `DeviceLocked` [M] | No picker |
| notifications | Request, schedule, list, cancel, badge | Schedule if authorized | Schedule if authorized [M] | Same [M] | Schedule if authorized |
| http | Yes | Yes | Yes, inside the run budget [M] | Yes; Keychain-held tokens follow section 9 | Yes, inside 30 s |
| location | One-shot, live updates, full-accuracy request | One-shot (`source="live"`) | **No fix under When In Use** [M]: returns `last_known()` with `source="app_cache"`, reason `"when_in_use_background"` (see C2-Q1) | Same | Foreground only; background as left |
| pedometer | Query (prompt on first use [M]), live updates | Query | Query [M] | [M] (device run) | Query if authorized |
| keychain | Read, write | Read, write | Read, write | After first unlock: yes. BFU: `DeviceLocked` (errSecInteractionNotAllowed, [SDK]) | Read, write |

</div>


## 3. clipboard

Wraps `UIPasteboard.generalPasteboard` [SDK]. App context only in v1.

```python
from pywidget import clipboard

clipboard.has_text() -> bool                     # hasStrings, iOS 10 [SDK]; no paste prompt [M]
clipboard.has_url() -> bool                      # hasURLs, iOS 10 [SDK]
clipboard.has_image() -> bool                    # hasImages, iOS 10 [SDK]
clipboard.detect(patterns=("url", "number", "search")) -> set[str]
                                                 # detectPatternsForPatterns, iOS 14 [SDK]; patterns ProbableWebURL,
                                                 # Number, ProbableWebSearch [SDK]; inspects without reading [M: no prompt]
clipboard.get_text() -> str | None               # .string [SDK]; shows the system paste prompt when the content came
                                                 # from another app (iOS 16+) [M]
clipboard.get_texts() -> list[str]               # .strings [SDK]
clipboard.set_text(text: str, *, local_only: bool = False, expires_in: float | None = None) -> None
                                                 # setItems:options: with UIPasteboardOptionLocalOnly /
                                                 # UIPasteboardOptionExpirationDate, iOS 10 [SDK]
clipboard.change_count() -> int                  # changeCount [SDK]
```

- **Denied paste.** If the user taps "Don't Allow", `string` comes back nil [M]. Nil also means "empty". The bridge tells them apart by reading back: if `hasStrings` was YES and `string` is nil, `get_text()` raises `PermissionDenied`, not `None`. This is the one place the module checks Apple's answer against a second read.
- `local_only=True` keeps the item off Universal Clipboard. Default `False` matches the system.
- No extension-unavailable marks on UIPasteboard.h [SDK: 0 marks], so the context rule is our policy, not an Apple restriction. It is still the right default: a background script that reads the clipboard is exactly what the iOS 16 prompt exists to stop.
- Errors: `NotAvailableHere` outside the app; `PermissionDenied` as above.
- Not in v1: images on the clipboard (Pillow is 1.1 at the earliest, ADR-001 C1), `UIPasteControl` (a view, not a script call; L8 lists it for the ui module).

## 4. files

Plain Python file I/O works without the bridge inside two folders the app owns. Anything else goes through the picker and bookmarks.

```python
from pywidget import files

files.documents() -> Path        # the app's Documents/Scripts data folder; where projects live (C5)
files.shared(script_id: str | None = None) -> Path
                                 # App Group folder for this script's widget data:
                                 # containerURLForSecurityApplicationGroupIdentifier, iOS 7 [SDK]
files.pick(types=("public.item",), *, multiple: bool = False, folder: bool = False,
           remember_as: str | None = None) -> list[Path]
                                 # UIDocumentPickerViewController initForOpeningContentTypes:, iOS 14 [SDK];
                                 # allowsMultipleSelection, iOS 11 [SDK]. App only. Cancel returns [].
files.bookmark(path: Path, name: str) -> None
files.bookmarks() -> list[str]
files.open_bookmark(name: str) -> ContextManager[Path]
                                 # resolves the stored bookmark, then start/stopAccessingSecurityScopedResource [SDK];
                                 # stop is guaranteed on exit
files.forget(name: str) -> None
```

- **iOS bookmarks are plain bookmarks.** `NSURLBookmarkCreationWithSecurityScope` is macOS only (CORRECTIONS.md, L8); on iOS the scope rides on the picked URL and is restored by `startAccessingSecurityScopedResource` after resolving [SDK NSURL.h doc comments]. If resolution reports the bookmark stale, the bridge re-creates it silently and keeps the name.
- **Protection class.** The bridge creates `documents()` and `shared()` with `NSFileProtectionCompleteUntilFirstUserAuthentication` [SDK constant], so widget runs on a locked phone can read them. The system default for app files is the same class [M]; we set it explicitly rather than trust a default.
- **Widget data size.** `shared()` is what the extension reads to render. The renderer only reads view trees and images the app wrote; the 'stale image' and memory rules come from L3 and ADR-002.
- **Coordinated reads** for iCloud Drive files use `NSFileCoordinator` in the bridge [SDK], because a file in iCloud may be a placeholder that is not downloaded yet [M]. `open_bookmark` downloads on demand with the run's timeout.
- **Privacy manifest.** CPython calls `stat()` everywhere; Apple counts file-timestamp reads as a required-reason API [M]. The app's privacy manifest must declare the file-timestamp category with the "inside the app container / user-picked files" reason [M]. Flag to whoever writes the manifest (L13 already flags OpenSSL's). 2026-10-26 [apple-page A2]: "For each executable or dynamic library in an app that uses a required reason API, the bundle that includes the executable or dynamic library needs to include a privacy manifest file that reports the API." So the app's manifest is not enough: the CPython framework and every native extension framework that calls one needs its own (T-0036). "Starting May 1, 2024, apps that don't describe their use of required reason API in their privacy manifest file aren't accepted by App Store Connect." Still [M]: that `stat()` is in the file-timestamp category, and the reason code (the key pages are unread; Maren's 85F4.1 is unconfirmed).
- Errors: `PermissionError` from the OS passes through outside the sandbox; `KeyError` for an unknown bookmark name; `NotAvailableHere` for `pick` outside the app; `DeviceLocked` when a read fails before first unlock (EPERM on a protected file maps to it only if `context.mode != "app"`).

## 5. notifications (local only)

Wraps `UNUserNotificationCenter` [SDK]. No push in v1 (L8: push needs APNs on our account and a server).

```python
from pywidget import notifications

notifications.status() -> str
    # "not_determined" | "denied" | "authorized" | "provisional" | "ephemeral"
    # UNAuthorizationStatus; Provisional iOS 12, Ephemeral iOS 14 [SDK]
notifications.request_permission(*, provisional: bool = False, badge: bool = True) -> str
    # requestAuthorizationWithOptions: Alert|Sound|(Badge)|(Provisional, iOS 12) [SDK]. App only.
notifications.schedule(title: str, body: str = "", *,
                       at: datetime | None = None,          # UNCalendarNotificationTrigger [SDK]
                       after: float | None = None,          # seconds; UNTimeIntervalNotificationTrigger [SDK]
                       repeat: str | None = None,           # None | "hourly" | "daily" | "weekly"
                       id: str | None = None,               # same id replaces the pending one [SDK header line 62]
                       sound: bool = True,
                       thread: str | None = None,           # threadIdentifier [SDK]
                       passive: bool = False,               # interruptionLevel Passive vs Active, iOS 15 [SDK]
                       open_script: bool = True) -> str     # returns the id
notifications.pending() -> list[Notification]     # getPendingNotificationRequests [SDK]; only this app's, tagged by script
notifications.cancel(id: str) -> None             # removePendingNotificationRequestsWithIdentifiers [SDK]
notifications.cancel_all(script_only: bool = True) -> None
notifications.set_badge(count: int) -> None       # setBadgeCount:withCompletionHandler:, iOS 16 [SDK]
```

- **Exactly one of `at` or `after`.** Neither raises `ValueError`. The native `UNErrorCodeNotificationInvalidNoDate` (1400) [SDK] maps to `ValueError` too.
- **Repeats.** A repeating time-interval trigger must be at least 60 seconds [M]; we only offer calendar repeats ("hourly" = minute matches; "daily" = hour and minute; "weekly" = weekday, hour, minute) and refuse `repeat` with `after`, so the limit never bites.
- **Pending cap.** iOS keeps at most 64 pending local notifications per app and drops the rest silently [M]. The bridge counts before adding and raises `TooManyPending(PyWidgetError)` at 64 across all scripts, with each script's share in `pending()`. It does not let iOS drop silently. Show me the bytes: after every `schedule`, the bridge reads `getPendingNotificationRequests` back and raises if the id is missing.
- **Levels.** Time Sensitive needs an entitlement (`UNAuthorizationOptionTimeSensitive` is deprecated: "Use time-sensitive entitlement" [SDK]) and Critical needs Apple's approval [M]. Neither in v1; `passive` and active only.
- **Tapping a notification** opens pywidget to that script's page. It never runs the script by itself (L12 rule: nothing runs code without the user's tap). `open_script=False` gives a plain notification.
- Not in v1: location triggers (`UNLocationNotificationTrigger` [SDK] needs location beyond When In Use for background use [M]), attachments, actions.
- Errors: `UNErrorCodeNotificationsNotAllowed` (1) [SDK] → `PermissionDenied`; status not determined outside the app → `PermissionNotDetermined`; `UNErrorCodeBadgeInputInvalid` (1600) [SDK] → `ValueError`.
- Review note: notifications must not be used for marketing by us [M, Guideline 4.5.4]. User scripts schedule only for their own user.

## 6. http

ADR-001: HTTP goes through the standard library and the bundled `requests` (L13 lists requests, urllib3, idna, certifi, charset-normalizer). Scripts may use those directly. `pywidget.http` adds only the two things a widget needs: an honest cache and a network status.

```python
from pywidget import http

http.get(url: str, *, headers: dict | None = None, params: dict | None = None,
         timeout: float = 10, cache_for: float | None = None) -> Response
http.post(url: str, *, json=None, data=None, headers=None, timeout: float = 10) -> Response
http.get_json(url: str, **kw) -> Any
http.status() -> Reading[NetworkStatus]
    # NetworkStatus(kind="wifi"|"cellular"|"wired"|"none", expensive: bool, constrained: bool)
    # one-shot NWPathMonitor read in the bridge [M]

class Response:
    status: int; headers: dict; text: str; content: bytes
    def json(self) -> Any
    sampled_at: datetime; source: str      # "network" | "cache"
    stale_after: datetime | None
```

- **Cache.** With `cache_for=seconds`, a good response is stored in `files.shared()`; when the network fails, `get` returns the stored body with `source="cache"` and its original `sampled_at`, so the widget can show "from 2 h ago" (L1 rule b). Without `cache_for`, offline raises `Offline(PyWidgetError, ConnectionError)`.
- **TLS.** CPython's `ssl` uses the OpenSSL built with the interpreter and certifi's CA list (L13), not Apple's trust store. User-installed root certificates and Apple's revocation checks therefore do not apply to Python requests [M]. Document it in the module help.
- **Export compliance** (2026-10-26, [apple-page A6]). `ITSAppUsesNonExemptEncryption` is answered for the app "including any third-party libraries it links against", and "encryption that's built into the operating system" is the typical exempt case. CPython's OpenSSL is a linked library, not the OS's, so it is part of the answer. We do not add the key to Info.plist until the Investors answer (matrix s2c).
- **ATS.** App Transport Security governs URLSession and CFNetwork; CPython uses BSD sockets, which ATS does not cover [M]. Policy: plain `http://` works and prints a one-line console warning. We do not add ATS exceptions to Info.plist.
- **Local network.** Connecting to a LAN address shows the iOS Local Network prompt and needs `NSLocalNetworkUsageDescription` [M]. Home servers are a common script target, so the string ships in v1.
- **Widget runs.** HTTP works inside the run's time budget. `timeout` is capped at the time left in the run (BGAppRefreshTask time is short [M]; the intent limit is 30 s [SDK doc comment, L8]). Low Data Mode: `status().value.constrained` lets a script skip big downloads; we do not block them.
- **Body cap, 10 MiB** (added by T-0394, accepted by Idris 2026-10-27, T-0424). `get` and `post` refuse a body over 10 MiB, before reading it when Content-Length says so. Reason: the body is held whole in memory inside a process that also renders widgets, and 10 MiB is far above any reply a widget can show; a script that needs more uses `requests` or `urllib` directly, which keep no cap.
- **`timeout` is the whole request** (added by T-0394, accepted by Idris 2026-10-27, T-0424): connecting, every redirect and the body, cut to the run's time left. Reason: a run's budget is wall-clock, and a per-read timeout (as in `requests`) lets a server that drips a byte at a time <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> the run past its budget indefinitely.
- **`status()`** (T-0424): Swift answers `http.status` with one NWPathMonitor update, then cancels the monitor. Not satisfied, or loopback only, is `"none"`; otherwise Wi-Fi wins over cellular (a path can list both), and any other link (wired Ethernet, or an interface iOS types as other) is `"wired"`. `expensive` and `constrained` are NWPath's own flags. The cases are in `pywidget/tests/device/fixtures/c2_calls.json` (rule 13).
- **Credentials.** Tokens come from `keychain`, never from source code (brief Section 0). The `requests` session we document reads the token at run time.
- Errors: `requests` and `urllib` exceptions pass through unchanged from direct use. `http.get` raises `HTTPStatusError(PyWidgetError)` for 4xx/5xx only if `raise_for_status=True`; `Offline`; `TimeoutError`.

## 7. location (When In Use)

Module `pywidget.device.location` (L1 naming). Always authorization is not in v1 (ADR-001).

```python
from pywidget.device import location

location.status() -> str          # "not_determined" | "restricted" | "denied" | "when_in_use" | "always"
                                  # instance authorizationStatus, iOS 14 [SDK]; class method deprecated [SDK]
location.accuracy() -> str        # "full" | "reduced"; accuracyAuthorization, iOS 14 [SDK]
location.request_permission() -> str
                                  # requestWhenInUseAuthorization, iOS 8 [SDK]. App only.
location.request_full_accuracy(purpose: str = "ScriptLocation") -> str
                                  # requestTemporaryFullAccuracyAuthorizationWithPurposeKey: [SDK]; "won't expire
                                  # while the user is still engaged with your app" [SDK]. App only.
location.sample(*, timeout: float = 10, max_age: float | None = 120,
                stale_after: timedelta = timedelta(minutes=30)) -> Reading[Location]
                                  # requestLocation, iOS 9 [SDK] (one-shot)
location.last_known() -> Reading[Location] | None
                                  # the bridge's own cache in the app's Application Support, not the App Group
                                  # (T-0540); source="app_cache"
location.updates(*, distance_filter: float = 10) -> Iterator[Reading[Location]]
                                  # app only; LiveOnlyInWidget elsewhere

@dataclass(frozen=True)
class Location:
    latitude: float; longitude: float
    horizontal_accuracy: float        # metres; larger under reduced accuracy
    altitude: float | None            # metres; [M] (CLLocation fields not found in the 27.1 ObjC headers; read the
    vertical_accuracy: float | None   #   Swift interface or the docs before relying on field names)
    speed: float | None; course: float | None
```

- **The trap, under ADR-001's execution default.** `isAuthorizedForWidgetUpdates` lets the widget **extension** get a fix "if called upon to refresh within a few minutes of having been seen" [SDK, CLLocationManager.h line 253]. Under ADR-001 the extension does not run Python. The Python widget run happens in the app; when the app is in the background with When In Use, it gets no fix [M]. So in a background widget run, `sample()` returns `last_known()` with `source="app_cache"` and `unavailable_reason="when_in_use_background"`, never a fresh fix and never an error.
- **C2-Q1 (open, for Ines and the L3/ADR-002 owner).** A Swift-only step in the widget extension's timeline provider could take a one-shot fix when `authorizedForWidgetUpdates` is YES and write it to the App Group (T-0540: the bridge's own location cache is no longer there, so this would be a new, separate file; no Python in the extension, so L3's memory reasons hold). Python's next run would read it as `source="refresh"`. It costs `NSWidgetWantsLocation` in the extension and one more code path. The premade "distance to a saved place" widget (ADR-001 C11) is the first thing that needs it. Without it, that widget is honest but often old.
- `CLBackgroundActivitySession` (iOS 17) keeps a When-In-Use app "in use" in the background with the blue indicator, and a new session "may only become active while the app is foregrounded" [SDK]. That is a live-tracking session (a walk), not a widget refresh. Not in v1.
- **Prompt wait (T-0541, T-0548).** In the app, `sample` and `updates_start` of location, `today`, `history`, `by_day` and `updates_start` of pedometer, and `clipboard.get_text` and `get_texts` can show a system prompt on first use, so Python waits `PERMISSION_WAIT_S` (120 s) for them; for `sample`, `max(120, timeout + 2)`. Elsewhere they keep the 10 s (`timeout + 2` for `sample`), because Swift never prompts there. Contract: bridge-contract s4 v5.3 item 1.
- `max_age`: if the system's cached fix is younger than this, return it without waking GPS.
- Errors: `kCLErrorDenied` [SDK] → `PermissionDenied`; `kCLErrorPromptDeclined` ("Authorization request not presented to user" [SDK]) → `PermissionNotDetermined`; `kCLErrorLocationUnknown` ("CL will keep trying" [SDK]) → keep waiting until `timeout`, then `Reading(None, reason="no_fix")`; `kCLErrorNetwork` [SDK] → `Reading(None, reason="network")`. Not determined outside the app → `PermissionNotDetermined`.
- Default `stale_after` 30 minutes (L1 rule c).

## 8. motion history (pedometer)

Module `pywidget.device.pedometer`. Wraps `CMPedometer` [SDK].

```python
from pywidget.device import pedometer

pedometer.available() -> dict[str, bool]
    # {"steps", "distance", "floors", "pace", "cadence"}: isStepCountingAvailable, isDistanceAvailable,
    # isFloorCountingAvailable, isPaceAvailable (iOS 9), isCadenceAvailable (iOS 9) [SDK]
pedometer.status() -> str          # "not_determined" | "restricted" | "denied" | "authorized"; iOS 11 [SDK]
pedometer.request_permission() -> str
    # CoreMotion has no request call; the bridge makes a one-minute query, which shows the prompt [M]. App only.
pedometer.history(start: datetime, end: datetime | None = None) -> Reading[PedometerData]
    # queryPedometerDataFromDate:toDate:withHandler: "Data is available for up to 7 days" [SDK]
pedometer.today() -> Reading[PedometerData]                 # local midnight to now
pedometer.by_day(days: int = 7) -> list[Reading[PedometerData]]   # one query per calendar day
pedometer.updates() -> Iterator[Reading[PedometerData]]     # startPedometerUpdatesFromDate [SDK], from local midnight: the day so far; app only

@dataclass(frozen=True)
class PedometerData:
    start: datetime; end: datetime                # startDate, endDate [SDK]
    steps: int                                    # numberOfSteps (non-null) [SDK]
    distance_m: float | None                      # distance (nullable) [SDK]
    floors_up: int | None; floors_down: int | None  # floorsAscended, floorsDescended (nullable) [SDK]
    average_active_pace: float | None             # seconds per metre, iOS 10 (nullable) [SDK]
    current_pace: float | None                    # iOS 9; meaningful in live updates only [M]
    current_cadence: float | None                 # steps per second, iOS 9; live updates only [M]
```

- **Seven days.** `start` older than seven days raises `ValueError("pedometer history covers the last 7 days")` before calling Apple. `by_day(days>7)` raises the same. We do not clamp quietly.
- **Nullable fields stay None.** A device without a barometer has no floors; we never fill in 0. `available()` lets the widget say "floors not counted on this iPhone".
- `sampled_at` = the query's `end`; `source="history"` (or `"live"` from `updates()`); default `stale_after` 60 minutes (L1). The system history can lag the present by minutes [M].
- **Simulator.** Step counting is unavailable in the Simulator [M]; tests use the host stubs, and the real reads need a device (L1 device checks line).
- Errors, from the CMError enum order in CMError.h (CMErrorNULL = 100, then +1 each) [SDK]: `CMErrorMotionActivityNotAvailable` (104) and `CMErrorNotAvailable` (109) → `Unsupported`; `CMErrorMotionActivityNotAuthorized` (105) and `CMErrorNotAuthorized` (111) → `PermissionDenied`; `CMErrorMotionActivityNotEntitled` (106) and `CMErrorNotEntitled` (110) → `PyWidgetError` (our bug: missing usage string); `CMErrorInvalidParameter` (107) → `ValueError`. Which code a pedometer query returns on denial is a device check [M].

## 9. keychain (the user's own secrets)

Module `pywidget.keychain`. Wraps `SecItemAdd`, `SecItemCopyMatching`, `SecItemUpdate`, `SecItemDelete` with `kSecClassGenericPassword` [SDK].

```python
from pywidget import keychain

keychain.set(name: str, value: str | bytes, *, shared: bool = False) -> None    # add, or update if it exists
keychain.get(name: str, *, shared: bool = False) -> str                         # KeyError if missing
keychain.get_bytes(name: str, *, shared: bool = False) -> bytes
keychain.exists(name: str, *, shared: bool = False) -> bool
keychain.delete(name: str, *, shared: bool = False) -> bool                     # False if it was not there
keychain.names(*, shared: bool = False) -> list[str]                            # names only, never values
```

- **Item shape.** `kSecAttrService` = `"pywidget.secrets"`, `kSecAttrAccount` = `"<project-id>/<name>"` by default, or `"shared/<name>"` when `shared=True` [SDK attribute names]. Per-project scope by default, so one project's script cannot read another project's token unless the user saved it as shared. L12 may tighten this (section 1.5).
- **Accessibility.** `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`: "recommended for items that need to be accessible by background applications ... will never migrate to a new device" [SDK SecItem.h]. Widget runs work on a locked phone after first unlock. Not synchronizable in v1: a token never leaves the device through us or iCloud.
- **Access group.** The app's default group [SDK: "new items are created in the application's default access group"]. Under ADR-001 the extension does not need secrets. If C2-Q1 or a later ADR moves any fetch into an extension, both targets need a shared `keychain-access-groups` entry (an entitlement in the spike's project).
- **Never printed.** `repr()` of a secret in the console shows `'••••(12 chars)'`; the run log stores no values. The IDE's variable inspector masks values from `keychain.get`.
- Size cap: 16 KB per value (our limit; keeps a script from using the Keychain as storage).
- **Scope without a script id (T-0528, bridge contract s4 v5.3).** The script id is the bridge's record of the run. An editor buffer has none, so there only `shared=True` works; the per-script calls raise `PyWidgetError`. A script whose id is `shared` is refused the per-script scope too, because `shared/<name>` would be the shared scope. Values travel as base64 on the wire.
- Errors (SecBase.h values [SDK]): `errSecItemNotFound` (−25300) → `KeyError`; `errSecDuplicateItem` (−25299) → handled inside `set` as an update; `errSecInteractionNotAllowed` (−25308; returned "if the item's data is not available until a device unlock occurs" [SDK]) → `DeviceLocked`; `errSecMissingEntitlement` (−34018) → `PyWidgetError` (our bug); `errSecParam` (−50) → `ValueError`.

## 10. Host-Python stubs (`pywidget/ios/python-stubs/`)

- A pure-Python package with the same module names, signatures and docstrings as above, for two uses: jedi completion and docs in the IDE, and tests on a Mac with no device.
- Behaviour is an in-memory fake controlled by `pywidget._host` (`set_mode`, `set_permission`, `set_locked`, `feed_location`, `feed_steps`, `fake_now`). The defaults are a foreground app with every permission not determined, so a test must state the permission it relies on.
- The stubs encode the context rules from section 2 (clipboard refuses outside the app, a background widget run gets `app_cache` locations, no prompts in widget runs, the seven-day window, the 64-pending cap, keychain BFU). A test that passes against the stubs and fails on a device is a bug in this spec. Fix the spec and the stub together.
- Host interpreter: written for Python 3.9 (the Mac's `/usr/bin/python3`) and later, so it also runs on the app's 3.13.
- Tests: `python3 -m unittest discover -s pywidget/ios/python-stubs/tests`: 33 tests, green on the Mac's Python 3.9.6 (2026-10-25). One test parses this file's code blocks (46 signatures) and fails if a stub lacks one, so spec and stubs cannot drift apart. Four mutations (drop `keychain.names`, give background runs a live fix, let widget runs prompt, drop the seven-day check) each turned the suite red.

## 11. Open


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 11. Open, scrolls sideways" style="--tw:1044px" markdown="1">

| # | Question | Who | Blocks |
|---|---|---|---|
| C2-Q1 | Swift-only location fix in the widget extension, handed to the next Python run (section 7) | Ines (chair), L3/ADR-002 owner | Fresh location in background widgets; premade "distance to a saved place" |
| C2-Q2 | Browser read of the [M] facts below, on developer.apple.com | A person (G2a) | Code that relies on them |
| C2-Q3 | Device run: pedometer and location from a background widget run, locked and unlocked; denial error codes; paste prompt and nil-on-deny | Spike owner, with a device | Section 2 cells marked [M] |
| C2-Q4 | Privacy manifest: file-timestamp reason for CPython's `stat()`; one manifest per bundle that calls it (CPython and each native extension framework, A2, 2026-10-26) | Whoever writes PrivacyInfo.xcprivacy (with L13's OpenSSL entry) | Upload (once membership is active) |
| C2-Q5 | L12 per-script grants: does keychain scope go further than per project? | Odalys (L12) | Section 9 item shape |

</div>


[M] facts to read in a browser (C2-Q2): paste-prompt behaviour and nil-on-deny; `detect` without a prompt; background pasteboard access; default file protection class; iCloud placeholders; required-reason file-timestamp API; 60-second repeat minimum; 64 pending notifications; Critical alerts approval; location triggers' authorization; Guideline 4.5.4; NWPathMonitor; CPython TLS vs Apple trust store; ATS scope (URLSession only); Local Network prompt and key; BGAppRefreshTask time; no background fix under When In Use; CLLocation field names on 27.1; `NSMotionUsageDescription`; pedometer prompt on first query; current pace and cadence in live updates only; pedometer history lag; Simulator has no step counting; pedometer denial code.

2026-10-26 (T-0142): of this list, only the required-reason placement rule was read (A2, section 4); the category and reason code stay [M]. The `NSWidgetWantsLocation` placement was read too (A4, section 1.4). No other item has moved.

2026-10-26 19:52 ET (Wrenna, T-0046): **Guideline 4.5.4 read** [primary], from the Investors' #59 PDF of the App Review Guidelines (research/inbound/App Review Guidelines - Apple Developer.pdf, sha256 a33b8f22..., p. 38; no fetch). Apple: "Push Notifications must not be required for the app to function, and should not be used to send sensitive personal or confidential information. Push Notifications should not be used for promotions or direct marketing purposes unless customers have explicitly opted in to receive them via consent language displayed in your app’s UI, and you provide a method in your app for a user to opt out from receiving such messages." Tag change for section 5's review note: [M, Guideline 4.5.4] -> [primary, 4.5.4 p. 38], with one correction for the owner: the guideline's words name Push Notifications, and v1 sends none (local only). So it does not bar marketing by local notification outright; it bars push marketing without opt-in consent and an in-app opt-out. Our "no marketing by us" rule is our own policy, stricter than 4.5.4, and worth keeping. Main text left to Idris.

2026-10-26 19:52 ET (Wrenna, T-0046): the other 23 items are not read yet. The company's Apple day cap (12 pages, terms_guard.APPLE_DAY_CAP) had 1 page left at 19:48 and T-0034 took it (CLGeocoder, L16). Page plan for 2026-10-27, one page per group, .md copies: UIPasteboard (paste prompt, nil-on-deny, `detect`, background access); UNTimeIntervalNotificationTrigger (60 s repeat); UNLocationNotificationTrigger (authorization); the critical-alerts entitlement page; NSAppTransportSecurity (ATS scope); NSLocalNetworkUsageDescription; NSMotionUsageDescription; CLLocation (field names); CMPedometerData (pace and cadence). Second wave if the day allows: NWPathMonitor, BGAppRefreshTask, file protection default. These stay [M] whatever the pages say, because a device run or a non-Apple source settles them: pedometer history lag, Simulator step counting, pedometer denial code, no background fix under When In Use (C2-Q3), CPython TLS vs Apple's trust store (CPython's own docs, not an Apple fact). The required-reason category and code wait on T-0035's refresh of the reasons page. The 64-pending figure is not on any page I can name yet; it stays [M] until one is found.

## Chair (Ines), 2026-10-25 21:16 ET: C2 and L12 names, and C2-Q5

Settles CORRECTIONS U1-17 for v1.
- **C2 governs v1 names**, because its stubs and 33 tests pin them: `pywidget.device.location`, `pywidget.device.pedometer`, `pywidget.keychain`; Keychain service `pywidget.secrets`, account `<project-id>/<name>` or `shared/<name>`. L12's `pywidget.location`, `pywidget.motion` and `pywidget.secret.<id>.<NAME>` are not v1 names.
- **C2-Q5 answered for v1: no.** Keychain scope stays per project, with shared on request. v1 runs only the user's own scripts (ADR-006 S0: marketplace compiled out; M1 struck), so a per-script wall guards against an author v1 does not have.
- **No `auth=` in v1.** `http.get` keeps its C2 signature; a script passes `headers={"Authorization": ...}` from `keychain.get`. L12's per-script grants and host-bound handles are the design for marketplace Python (M2, 1.1 or later) and come back with it, through a new ADR line and a C2 stub change together.
{% endraw %}

</div>
