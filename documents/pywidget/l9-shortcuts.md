---
layout: "default"
title: "L9: Shortcuts, App Intents spec and Shortcut Lab feasibility (pywidget)"
section: "documents"
description: "Recommend iOS 18.0, with iOS 26 additions behind #available. Reasons, all [SDK]: ControlConfigurationIntent and ControlWidgetButton (run a script from Control Center, the Lock Screen and the Action button) are iOS 18\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/l9-shortcuts.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/L9-shortcuts.md</code></span></div><h1>L9: Shortcuts, App Intents spec and Shortcut Lab feasibility (pywidget)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-10-25, Day 4. Brief L9 (Blocking for the C7 Shortcut Lab parts). Same sources and tags as L8-integrations.md:
**[SDK]** iOS 27.1 SDK, **[CLI]** macOS 27.0.1 `shortcuts` tool run here, **[M]** memory, to be checked in a person's browser.
- **[apple-page A#]** (added 2026-10-26, T-0142): Apple's developer page, read signed out on 2026-10-26 01:15-01:17 ET under the Investors' #64 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>; quote, URL and time in pywidget/docs/release/app-review-matrix.md s1d item A#; the saved copy is in research/inbound/apple/developer.apple.com/ (index.tsv). A3 = Keeping a widget up to date, A4 = Accessing location information in widgets, A2 = Describing use of required reason API, A5 = AppShortcutsProvider, A6 = Complying with Encryption Export Regulations.
Evidence: `L8-L9-raw/sdk-checks.txt` (script `L8-L9-raw/bin/sdk_checks.sh`).

## 1. Verdicts first


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Verdicts first, scrolls sideways" style="--tw:640px" markdown="1">

| Question | Verdict |
|---|---|
| Can the app list, read or edit the user's shortcuts? | **No.** The iOS SDK has no API for it. The only listing API, `INVoiceShortcutCenter` (iOS 12) [SDK], returns voice shortcuts made from *this app's* SiriKit intents, nothing else |
| Is there a supported way to create an importable shortcut from iOS? | **No.** No public iOS API creates, imports or signs a shortcut. Signing exists only as the macOS `shortcuts sign` tool [CLI], and it refuses to run unless the Mac is signed into iCloud (observed 19:21 ET: "Error: In order to do this, you must be signed into iCloud.") |
| What does work with no setup? | App Shortcuts from an `AppShortcutsProvider` (iOS 16+) [SDK]: our actions appear in Shortcuts, Spotlight and Siri as soon as the app is installed |
| Shortcut Lab: history | **Feasible, supported** (stores the files the user shares; no parsing needed) |
| Shortcut Lab: diff | **Two tiers.** "Changed since last snapshot" by hash: feasible, supported. Action-level diff: **feasible but fragile** (needs the undocumented format) |
| Shortcut Lab: flow view | **Feasible but fragile** (undocumented format); not v1 |
| Shortcut Lab: lint | **Not recommended** before flow view is stable: fragile format plus undocumented action semantics; rules would be guesses |
| macOS helper | **Little value.** The CLI has only `run`, `list`, `view`, `sign` [CLI]; no export, so a helper cannot read a shortcut's contents either |

</div>


## 2. App Intents spec (v1)

### 2.1 Version floor

**Recommend iOS 18.0**, with iOS 26 additions behind `#available`. Reasons, all [SDK]:
`ControlConfigurationIntent` and `ControlWidgetButton` (run a script from Control Center, the Lock Screen and the Action button) are iOS 18;
`FileEntity` and `IndexedEntity` are iOS 18; Contacts limited access is iOS 18; `WidgetConfigurationIntent` and `AppIntentConfiguration` are iOS 17.
iOS 26 adds `IntentModes`/`supportedModes` (which deprecates `openAppWhenRun` from 26.0), `SnippetIntent`, `IntentValueQuery`, `continueInForeground`, and `WidgetPushHandler`.
Python's own iOS floor (PEP 730) is lower [M] and does not bind. iOS 18 vs 26 is an ADR for Ines; it turns on install-base share, which this file did not read.

### 2.2 Entities


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2.2 Entities, scrolls sideways" style="--tw:954px" markdown="1">

| Entity | ID | Display | Query |
|---|---|---|---|
| `ScriptEntity` | stable UUID of a script file in the app's library | name, folder, last run | `EntityStringQuery` (iOS 16) [SDK] so "Run Script" accepts a typed name; `suggestedEntities` = pinned and recent. iOS 18+: `IndexedEntity` for Spotlight [SDK] |
| `WidgetSlotEntity` | slot key (user-named, e.g. "weather") | key, last write time | `EntityQuery` over slots declared by the user's widgets |
| `WidgetEntity` | widget kind + configuration id | widget name | `EntityQuery`; nil means "all widgets" |

</div>


### 2.3 Intents

All run in the **main app process**, launched in the background, not in an `AppIntentsExtension`: the Python runtime needs the app's memory, and extension memory is tighter [M].
iOS 18 to 25: `openAppWhenRun = false`. iOS 26+: `supportedModes = .background`; a script that calls a UI module asks to continue in the foreground (`continueInForeground`, iOS 26) [SDK].
Runtime: 30 seconds unless progress is reported [SDK doc comment]; the intent reports progress per script stage and stops the interpreter cleanly on cancellation, returning the partial stdout and an error string.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 2.3 Intents, scrolls sideways" style="--tw:1187px" markdown="1">

| Intent | Parameters | Result | Behaviour |
|---|---|---|---|
| **Run Script** | `script: ScriptEntity`; `arguments: [String]` (optional, becomes `sys.argv[1:]`) | `ReturnsValue<String>` & `ProvidesDialog` | Runs the script. Result = the value passed to `shortcuts.set_output(...)`, else stdout. Dialog is the short form for Siri |
| **Run Script with Input** | `script: ScriptEntity`; `input: [IntentFile]` (files, images, text and URLs arrive as files) [SDK: `IntentFile` iOS 16]; `text: String?` | `ReturnsValue<String>` | Same, with `shortcuts.input()` returning the text and file paths (files copied into the script's temp dir). Structured output: scripts return JSON text; the recipe uses "Get Dictionary from Input" |
| **Set Widget Data** | `slot: WidgetSlotEntity`; `value: String` (plain text or JSON); `refresh: Bool = true` | `ReturnsValue<String>` (the stored value, read back from the App Group) | Writes the slot into the App Group store, then reads it back and returns what is actually on disk. Then `WidgetCenter.reloadTimelines(ofKind:)` for widgets that use the slot |
| **Refresh Widget** | `widget: WidgetEntity?` | none | `reloadTimelines(ofKind:)` or `reloadAllTimelines()` [SDK]. Reloads are budgeted by the system [apple-page A3, 2026-10-26; was M: 40 to 70 a day for a frequently viewed widget; whether a Shortcuts-triggered reload counts is not stated, L2 s4]; the intent says so in its description |
| **Get Widget State** | `widget: WidgetEntity` | `ReturnsValue<String>` (JSON: slot values, last timeline date, last script error) | Read-only, from the App Group |
| Open Script (support) | `target: ScriptEntity` | opens the editor | `OpenIntent` (iOS 16) [SDK] |
| Choose Script (widget config) | `script: ScriptEntity` | n/a | `WidgetConfigurationIntent` (iOS 17) [SDK] for a configurable "Script Output" widget |
| Run Script control | `script: ScriptEntity` | n/a | `ControlConfigurationIntent` + `ControlWidgetButton` (iOS 18) [SDK] |

</div>


Why one result type: an intent's `PerformResult` is a fixed type [SDK: `associatedtype PerformResult`], so file output waits for a separate "Run Script for File" intent (v1.1) instead of a mode switch.

### 2.4 AppShortcutsProvider

Four App Shortcuts, phrases with the app name token (required [M]): "Run a script in ${applicationName}" (parameterised on `ScriptEntity`, refreshed with `updateAppShortcutParameters()` when scripts change [SDK, iOS 16]), "Refresh my ${applicationName} widgets", "Set widget data in ${applicationName}", "Open ${applicationName} scratchpad". The per-app ceiling on App Shortcuts (I recall 10) is [M]. 2026-10-26: the AppShortcutsProvider page states no ceiling on shortcuts or phrases, and nothing on the app name token, so both stay [M] [apple-page A5]. New on that page: "Apple may extract anonymized App Shortcuts data such as localized phrases, display representation values, and the title and description of related intents." `ScriptEntity` display representations are the user's script names, so a parameterised phrase can carry them; for the privacy-label owner (A1: "You are not responsible for disclosing data collected by Apple").
In-app discovery: `ShortcutsLink` (iOS 16) and `SiriTipView` (iOS 16) [SDK] on the Shortcuts settings page and after a user's first successful script run.

### 2.5 Tests (written before the intents)

XCTest on the intent `perform()` with a fake runtime: (1) Set Widget Data returns the value read back from the App Group, and a test with a read-only store proves the intent fails rather than returning the input; (2) cancellation at 30 s returns partial output and a non-empty error; (3) `EntityStringQuery` finds a script by a typed name with different case and diacritics; (4) an inbound x-callback URL carrying code is refused.

## 3. Creating shortcuts: what is supported

1. **App Shortcuts** (above): zero setup, developer-defined, cannot be user-composed.
2. **Recipes in the app**: numbered steps with exact action names (L8 templates). Supported, always works, costs the user taps.
3. **iCloud links made by a person**: a team member builds the template on a device, shares "Copy iCloud Link", and the app links to it; Shortcuts shows its own add sheet. Supported. Needs an iCloud account on a team device: an account, the Investors' call. Each link is checked by hand on every major iOS release.
4. **Generated files signed on a Mac** (`shortcuts sign --mode anyone|people-who-know-me` [CLI]): the signing is supported, but producing the unsigned file means writing Apple's undocumented WFWorkflow plist keys [M], and the signer must be signed into iCloud [observed]. Signing on our own server would need a company Apple ID on a server Mac (account and spend). **Not recommended.**
5. No private APIs, no URL-scheme imports of unsigned files, no automation of the Shortcuts app UI.

## 4. File format and signing facts

- `shortcuts sign` takes an unsigned file and writes a signed one; modes "anyone" and "people-who-know-me" (default) [CLI]. It also "supports signing a shortcut in the old format" [CLI help text].
- It requires iCloud sign-in, even in "anyone" mode [observed; L8-L9-raw/sdk-checks.txt last line]. No signed file was produced here, so I have not seen the signed bytes.
- From community knowledge [M, unverified]: the unsigned payload is a binary property list with `WFWorkflowActions` and related keys; signed files are Apple Encrypted Archives (magic `AEA1`) in the signed, unencrypted profile, with the signer's certificate chain in the auth data.
- The SDK does ship a public Apple Encrypted Archive API with exactly such a profile: `AEA_PROFILE__HKDF_SHA256_HMAC__NONE__ECDSA_P256 = 0` and a `AEA_CONTEXT_FIELD_SIGNING_PUBLIC_KEY` field [SDK, usr/include/AppleArchive]. So *if* shortcut files use it, opening the container uses a public API; reading the actions inside it still depends on an undocumented schema.
- Show me the bytes: the first device task is to have a person share one real shortcut into a test build and save it, then check the magic, the profile number, and whether the context opens with the key from the auth data.

## 5. Shortcut Lab ingestion design

1. **Entry:** our Share extension accepts files (`public.data`, `public.file-url`) and URLs. What Shortcuts' own share sheet hands to a third-party extension (a file, an iCloud URL, or both) is [M]; the device prototype answers it first.
2. **File received:** the extension does no parsing (memory, and fragility kept out of the extension). It writes `raw/<sha256>.shortcut` into the App Group with the time, the source app if known, and the name the user confirms (pre-filled from the file name), and returns at once.
3. **iCloud link received:** stored as a link only. Resolving an icloud.com link to its contents means reading Apple web pages or undocumented endpoints by program, barred by Apple's site terms (rulings-v2 <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2a</span>) and undocumented. We never fetch it; the card says "share the file instead: Share → Options → File" (exact menu path [M]).
4. **History:** every share is a snapshot; same name plus different hash = a new version; same hash = "unchanged" note. Pure file storage, supported, works even if the parser is gone.
5. **Parser (isolated):** a separate Swift module `ShortcutFormat` with no dependants except the Lab's views. Input: raw bytes. Output: a versioned model or an explicit `.unsupported(reason)`. Unknown actions become generic blocks showing their identifier. Fixtures: real files shared by people (never generated by us), tested on every iOS beta (brief L9). If it breaks, history and hash-diff keep working.
6. **Reminder:** the app offers a recipe for a weekly personal automation that sends a notification "Share any changed shortcuts to pywidget". Open device question: whether Shortcuts' own "Get My Shortcuts" action can pass shortcuts as files into "Run Script with Input" [M]. If it can, a user-built automation snapshots everything with public actions only; if not, the reminder is manual.

## 6. Per-feature verdicts with reasons


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 6. Per-feature verdicts with reasons, scrolls sideways" style="--tw:1222px" markdown="1">

| Feature | Verdict | Depends on | Ship |
|---|---|---|---|
| History (snapshots on share) | Feasible, supported | Share extension, App Group | v1 of Shortcut Lab |
| Diff, hash level ("changed since") | Feasible, supported | History | v1 |
| Diff, action level | Feasible, fragile | Parser | after flow view <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> through one iOS beta cycle |
| Flow view | Feasible, fragile | AEA container fact [M] + undocumented schema | later; gated on the "show me the bytes" device test |
| Lint | Not recommended now | Parser + guessed semantics | revisit with real user files |
| Reminder automation | Feasible (notification recipe); bulk snapshot unverified | "Get My Shortcuts" behaviour [M] | v1 recipe |
| macOS helper | Low value | CLI has no export [CLI]; signing needs iCloud | no |

</div>


## 7. Open

- Device: what the Shortcuts share sheet delivers; real file bytes; "Get My Shortcuts" into our intent; 30-second behaviour with CPython start-up.
- Person's browser checks: App Shortcuts ceiling and phrase rules, Shortcuts share menu path, the signing requirement for imports (brief: "since iOS 15"). 2026-10-26: the AppShortcutsProvider page gives neither the ceiling nor the phrase rules (A5); the `AppShortcut` and phrase pages are the next single reads (#64).
- Investors: iCloud account for template links; iOS floor ADR input (install share).
{% endraw %}

</div>
