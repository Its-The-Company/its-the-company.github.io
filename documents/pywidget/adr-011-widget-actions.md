---
layout: "default"
title: "ADR-011: Widget actions: what a tap and a button do"
section: "documents"
description: "One value, the action, says what happens. The widget&#x27;s tap carries one; each button carries one. It is stored in the project manifest (phase C, T-4476), per widget output, and read strictly on every use. When nothing is\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/decisions/' | relative_url }}">← Decisions</a><a href="{{ '/documents/pywidget/adr-011-widget-actions.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 25 · Sun Nov 15</span><span><code>pywidget/docs/decisions/ADR-011-widget-actions.md</code></span></div><h1>ADR-011: Widget actions: what a tap and a button do</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: **accepted** (Idris, 2026-11-15 10:05 PM ET, T-4542). Proposed 9:40 PM ET; revised after Pernille's review (FIX FIRST, 9899cedabe), her re-read (FIX FIRST, narrowed to two sentences, 42677816c5) and Maren's review of sections 3, 8 and 9 (FIX FIRST, 8219925b84); every finding of all three is answered in section 14, and none is left open. Pernille and Maren are asked in T-4542's board notes (10:04 PM ET) to confirm; if either finds a finding still open, the status goes back to proposed. The dated lines in ADR-002, ADR-007 and L5 are in force from this status. Numbering: ADR-008 stays held for the Builder.
- Asked by: an Investor on #41, 8:59 PM ET 11-15 (c6905224905: people choose what a widget tap does, and buttons reuse the design), 9:11 PM ET 11-15 (c6905386313: "Add buttons to 1.0!") and 9:38 PM ET 11-15 (c6905759408: "Can tapping a button on a widget open other apps?"; answered on #41 at c6905782460, and added here as section 5a). All three are in `log/rulings.md`. The plan and date effect of buttons in 1.0 is Ines's, under T-4543.
- Checked at 3ba2879aa2. Apple's behavior is cited from pages saved under `research/inbound/apple/` (section 12), signed out, under the Investors' <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> of 2026-10-26 12:31 AM ET.

## Plain summary (for the Investors)

Each widget gets one setting, **When tapped**, on its project's page. The choices: open its Page, open its code, open pywidget's home, open a link, open another app, or run a Python function of the project. If the person never touches it, the widget does exactly what it does today. A widget's **buttons** use the same choices and the same code: a button is one more place to put an action, not a second system.

What iOS decides, and we cannot change:
- **Tapping a widget always opens pywidget.** That includes a link: pywidget comes forward for a moment, then opens the link in the browser. iOS gives a widget no way to open a web page by itself.
- **Opening another app goes through pywidget too**, the way the launcher widgets already do (built, not released): the person picks the app once, pywidget keeps its link, and on a tap pywidget opens that app. Only apps that publish a link can be opened. How long pywidget shows first on a real iPhone is the open #192 test; until it runs, nothing we publish says an app "opens instantly".
- **A tap on the widget itself can only open pywidget.** To run a Python function *without* opening pywidget, the widget needs a button.
- **A button runs inside the widget on iOS 18 to 26**, in the widget's small memory (about 23 MB free on the iPhone 15 measured so far). A function too big or too slow for that (it must finish, with the redraw, in 2 seconds) opens pywidget and runs there instead, so it always works, but visibly. From iOS 27, a button can run the function in pywidget in the background, with no screen change and no small memory limit.
- **Buttons don't work while the phone is locked**; iOS asks the person to unlock first.

A correction to what Evan was told at 9:01 PM ET on #41 (c6905252788): Apple's current documentation says a **small** widget can have several tap areas and buttons, not one. The single-area widgets are the Lock Screen's one-line (inline) widget and, in this design, the round one (section 3).

Nothing a person sets can make a tap run code from a web page or another app: a link that runs a function carries a signature only the widget can make (section 6). One widget never runs two functions at the same moment, even when one runs in the widget and one in pywidget: the second waits its turn briefly, and if it can't get one it says so instead of losing the first one's result (section 7).

## 1. Decision

**One value, the action**, says what happens. The widget's tap carries one; each button carries one. It is stored in the project manifest (phase C, T-4476), per widget output, and read strictly on every use. When nothing is stored, the widget's **default action** applies, which is today's routing, unchanged.

```json
{"do": "page"}
{"do": "page", "page": "forecast"}
{"do": "code"}
{"do": "code", "file": "views/today.py"}
{"do": "home"}
{"do": "link", "url": "https://example.com/train-times"}
{"do": "app", "slot": "music"}
{"do": "run", "function": "add_glass", "args": {"ml": 250}}
```


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Decision, scrolls sideways" data-n="1" style="--tw:692px" markdown="1">

| `do` | Means | Fields (all others refused) |
|---|---|---|
| `page` | the project's Page | `page`: a Page output's id in the same project; absent means the widget's own settings Page (premades) or the project's first Page |
| `code` | the editor, at the widget's file | `file`: a project-relative `.py` path; absent means the file the widget runs (`WidgetTapRouting.scriptFile`'s pick) |
| `home` | pywidget's Projects tab, at its top | none |
| `link` | the link, in the person's browser, after pywidget comes forward | `url`: section 5's grammar |
| `app` | another app, through the launcher's built tap path (section 5a) | `slot`: a launcher slot id (`LauncherLink.isSlotID`: 1 to 32 bytes, lower-case letters and digits, `-` after the first); never a URL |
| `run` | a declared function of the project (section 7) | `function`: a declared name; `args`: a JSON object, finite numbers only, at most 1 KiB canonical (section 7, L2) |

</div>


Six kinds, all in `formats.actions: 1`: `app` is in before the first build that writes actions, so no reader ever sees it as unknown (Pernille's review, L7).

Rules:
1. **Absent is the default, never a stored copy of it.** The default stays today's route even when today's route improves (T-4515's habit focus is an example), and an update never rewrites a person's choice.
2. **Same value, every place.** A tap, a button and (later) a Control Center control carry the same type, read by one Swift reader (`WidgetAction`) and one Python mirror. A field the reader does not know, a wrong type, or an unknown `do` makes the whole value bad (section 8), never partly read.
3. **One setting per widget output, shared by every placement of it.** iOS tells the app nothing about individual placements (ADR-007 s4). A per-placement choice in the system's Edit Widget sheet is possible later; it is not in 1.0.
4. **A choice wins over the tree's own tap.** Today a tree that sets its own `widgetURL` keeps it (the Shortcuts small tile, Habits rows' `Link`s). With a stored tap action, the renderer sets that action's link and drops the tree's `widgetURL`; the tree's `Link`s inside it stay, because they are places the script drew, not the tap.

## 2. Today's routes are the default action

The default action is exactly what `WidgetTapLink.target(of:)` and `WidgetTapRouting.destination` do at 3ba2879aa2 (T-3671, T-3763, T-4515; `premade-inputs.md` s2.5 route 1):


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. Today&#x27;s routes are the default action, scrolls sideways" style="--tw:832px" markdown="1">

| Widget | Default action | Route today |
|---|---|---|
| A premade | `page` (its settings Page), with `focus` when a row's own link names one | `pywidget://w/pywidget.<name>` or `pywidget://widget/<name>/open?habit=<id>` -> Gallery, the premade's sheet, its Page pushed |
| A person's script widget | `code` | `pywidget://w/<id>` -> the file ranked first, or Projects when none is found |

</div>


In phase C the premade's `page` opens the project's Page directly (`premade-inputs.md` s2.5, last paragraph); nothing in this ADR changes that move.

## 3. Places per widget size

Apple, from the saved pages (section 12):
- "By default, tapping or clicking your widget ... opens its corresponding app" and "the system activates the containing app and passes the URL" to `onOpenURL` [A1].
- "For widgets with enough space for more than one interaction target — `accessoryRectangular`, `systemSmall`, and larger system family sizes — add one or more `Link` controls" [A1]. "Widgets support one `widgetURL` modifier" [A2].
- Buttons and toggles: `systemSmall`, `systemMedium`, `systemLarge`, `systemExtraLarge`, `systemExtraLargePortrait`, and `accessoryCircular` and `accessoryRectangular` on iPhone and iPad [A3]. "Inline accessory widgets offer only one tap target" [A4].
- "An interaction with a button or toggle should do more than open the app. If you want to offer an interaction that opens the app, use `Link` and `widgetURL`" [A3].
- "On a locked device, buttons and toggles are inactive" until the person unlocks [A3].
- "Pay attention to the size of targets ... avoid creating app-like layouts in your widgets" [A4].

Our <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span>, set for glanceable widgets inside what Apple allows (a lint at save and a check in the renderer, which draws the first N and drops the rest with one console line). They count **drawn instances**, not names: five `Button("check", ...)` rows are five (H1). `Toggle` and `RefreshButton` count toward the same cap, though neither is person-settable (M9). The order is depth-first through the tree, the order the renderer draws in; the lint at `entry()` is one console line per family over its cap, never an error, because the phone would still draw the first N (L1). One fixture table drives the Python and Swift tests, so both drop the same buttons.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3. Places per widget size, scrolls sideways" data-n="2 3" style="--tw:728px" markdown="1">

| Family | The tap | Buttons (person-settable places) | Why |
|---|---|---|---|
| `accessoryInline` | 1 | 0 | one tap target [A4] |
| `accessoryCircular` | 1 | 0 | allowed by Apple; at 72 pt a button would be the whole face and leave no way to open pywidget. Revisit after 1.0 |
| `accessoryRectangular` | 1 | 1 | Lock Screen: inactive until unlock [A3]; the HIG asks Lock Screen widgets not to be launchers |
| `systemSmall` | 1 | 2 | 158 x 158 pt on a 390 pt phone [A4] |
| `systemMedium` | 1 | 4 | |
| `systemLarge`, `systemExtraLarge` | 1 | 8 | the Shortcuts premade already draws 8 tiles in Large |

</div>


The tap is the background: every point not inside a button or a tree's `Link`. A tree's own `Link`s (Habits rows, Shortcuts tiles) are not buttons and not counted here; they keep their links, which the default action reads as today.

Maren checked the caps against 44 x 44 pt targets with 12 pt between them on the smallest iOS 18 phone (375 x 667 pt: Small 148 pt, Medium 321 x 148, Large 321 x 324; her review's s3 table). All six hold: Small takes its 2 as one row (100 of 116 pt), Medium 4 in a row, Large two rows of four. `accessoryRectangular`'s one button reaches 44 pt only at the Lock Screen's own margins, which are smaller than 16 pt. On iPad the Small widget is drawn at 141 pt and shown at 120, so a 44 pt target lands at 37.4 pt: above Apple's 28 pt minimum, below its default [A8]; accepted (her L4).

**How a counted button is drawn (Maren's review M1, M5, L1, L3).** The caps count buttons; these rules set their size and what VoiceOver reads. Each is the renderer's, in Swift, for every drawn `Button` and its `Link` form (section 4):
- **A 44 x 44 pt hit area at least**, whatever the label's size: `.frame(minWidth: 44, minHeight: 44)` with `.contentShape(Rectangle())`. Apple: default control 44 x 44 pt, minimum 28 x 28 [A8]; "Pay attention to the size of targets" [A4]. The lint at `entry()` stays a count. API.md's `Button` row says the target is 44 pt and recommends one row of buttons in Small.
- **On the Lock Screen** (`accessoryRectangular`) the button reads without colour, because the vibrant rendering drops tints: a filled capsule, not a tint.
- **A VoiceOver label always.** The label's text, or, when the label has no text, the action name with `_` read as a space ("add glass"); the `entry()` lint then prints one console line: "Button 'add_glass' has no text; VoiceOver will read its name." A button drawn as a `Link` carries the hint "Opens pywidget" (DRAFT); an in-widget one carries none.
- **Dynamic Type** (widgets take Large to AX5 [A4]): a button label is one line, `.minimumScaleFactor(0.8)`, never under 11 pt [A4]; past that the button shows its symbol alone, with its VoiceOver label.
- **No added motion.** The redraw after a button press adds no moving `.transition`; the system's own content change stays (Apple caps animated updates at 2 s [A4]), so Reduce Motion needs nothing more here.

## 4. Which actions run where


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 4. Which actions run where, scrolls sideways" style="--tw:1096px" markdown="1">

| Action | On the tap (the background) | On a button, iOS 18 to 26 | On a button, iOS 27+ |
|---|---|---|---|
| `page`, `code`, `home` | pywidget opens there | drawn as a `Link` (Apple: a button must do more than open the app [A3]); pywidget opens there | same as 18 to 26 |
| `link` | pywidget comes forward, then opens the link | drawn as a `Link`; same | same |
| `app` | pywidget comes forward, then opens the slot's saved link (section 5a) | drawn as a `Link`; same | same |
| `run` | pywidget opens, runs the function in the foreground, shows a one-line result (L5 s4.2's banner) | **in the widget** when the widget is in the widget <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>; otherwise drawn as a signed `Link` and run as on the tap | **in pywidget, in the background**: the app process runs it, the screen does not change |

</div>


**Run in the widget (18 to 26).** `Button(intent: WidgetButtonIntent(widgetID:, button:, instance:, v:))`: the button's name, the drawn instance's index among that name's Buttons in depth-first order, and the `v` the renderer computed for that instance (section 6; H1). `isDiscoverable` is false, so Shortcuts does not list it [recalled; checked in step 6 against Apple's `AppIntent` page]. Apple: "By default, the system runs the app intent in the same process as the widget extension" [A3]. The intent is compiled into the extension only, so on 18 to 26 the extension is the only target (L5 s0). It is ADR-007's Refresh button exactly (`RefreshWidgetIntent`, s5 "The Refresh button"), with a handler in place of a full rerun:
- **Who may.** A widget the lane admits under ADR-007 s3: 2 x P <= W, T <= 2.0 s, imports only the allowlist. **And the time fits (M1):** the in-widget run has one `budget_s` of 2.0 s for the lock wait, the handler and the render together. The renderer draws the intent only when the action's declared `timeout` plus the widget's measured T is at most 2.0 s; otherwise it draws the signed link and the run happens in the app. A handler declared with the default `timeout=2.0` therefore never runs in the widget; an author who wants it there declares a shorter one (`timeout=0.5`), and API.md's `Widget.action` row says so. `timeout` keeps its 5.0 s ceiling for app runs. The renderer decides at render time from the widget's lane state, so a widget in the app lane never draws an in-widget button; it draws the signed link.
- **The numbers so far (T-4282).** W = 23 MB: the lowest free memory at rest seen, iPhone 15, iOS 26.6.2, 23.0 to 25.2 MB in 44 cold processes, so P <= 11 MB. Countdown completed 69 of 69 runs in the widget, cold peak 9 MB. A button press usually lands in a **warm** extension that has just rendered, where ADR-007 s3 carries 11 to 15 MB; by Pernille's count from T-4282's figures, the margin as first built would have refused 4 of the 69 runs there. `lane-peak` is shared by render and handler, which is safe (the higher figure wins). Step 9 counts button refusals in warm processes, not only the peak (L3). The size-ladder export from the Investors' phones is not in yet (T-2943 carries the ladder, T-4536 asks for it); when it lands, its W replaces 23 here and in ADR-007 by Ines's chair line, with no change to this design.
- **The run.** `perform()` first re-reads `.lane-demoted.json` and the widget's `ext.marker`, then runs the margin check (ADR-007 s5 "Margin, in the lane"); then it recomputes the effective action and its `v` (section 6) and runs nothing if `v` differs from the intent's; then it takes the widget's run lock, `run.lock` (section 7, H2), and runs the function and the render under the one 2.0 s budget; the state and tree are written (each under a short `state.lock` hold) before `run.lock` is released and before `perform()` returns, because "when you return from the `perform()` function, the system reloads the widget's timeline" [A3].
- **A tap that does not run is visible (M2).** A margin refusal, a widget already demoted, a kill marker from an earlier run, or a lock it cannot get in its budget writes one run-log row (trigger `widget_action`, outcome `oom_guard`, `demoted`, `killed` or `busy`) and shows the widget's badge (ADR-007 s7). The badge looks as it does for an error, but for a refusal (`oom_guard`, `demoted`, `busy`), which is not the script's fault, its VoiceOver label says what happened: "Didn't run. Tap again, or open pywidget." (DRAFT; Maren's review L2). Refusal and kill then follow ADR-007's demotion path, and the redraw shows that button in its link form, so the next tap opens pywidget and runs there. A refused tap is **not queued** in 1.0 (no `pending` queue, L5 s5.6 stays 1.1); the person taps again.

**Run in pywidget without showing it (27+).** A second intent type, `WidgetButtonAppIntent(widgetID:, button:, instance:, v:)`, `@available(iOS 27.0, *)`, in both targets, with `allowedExecutionTargets` `.main` ("the system performs the intent ... in the main app process" [A5]) and `supportedModes` `.background` ("indicates the action can run in the background" [A6], iOS 26+), as `RefreshWidgetIntent` does. Every widget qualifies, lane or not: the app process has the app's memory. The 30 s background limit (L5 s10, `LongRunningIntent`) is far above the 5 s cap. The app's background memory limit A is unmeasured (ADR-007 s6), so the margin is applied at the run's start. A run queue that is busy or `stuck` (ADR-007 s4.3) refuses the tap with the badge and a `busy` row rather than holding `perform()`. A cold background launch runs the one action, not T1's batch (L4). The run holds `run.lock` (section 7, H2) only inside a background-task assertion, released before the assertion ends: an app suspended while it holds a shared-container lock is killed (0xdead10cc; the rule `WidgetStateLock` already documents in `LaneGuard.swift`).

**Rejected.**
- *Making a small widget's whole face one button, so a tap runs code without pywidget.* It leaves the widget no way to open pywidget, and Apple's areas outside buttons are where the app opens [A4].
- *`LiveActivityIntent` to reach the app process on 18 to 26.* Its purpose is Live Activities (L5 s0; App Review Guideline 2.5.4).
- *`OpenURLIntent` for links.* It opens "one of your universal links" and "the system automatically brings your app to the foreground" [A7]; we have no universal links (L5 s7.1), and it would not avoid pywidget showing.

## 5. Links: the grammar, read strictly

**What the widget carries is always a `pywidget://` link.** A web link is never a `Link` destination in the tree: `TreeRules.linkURL` keeps refusing every scheme but `pywidget` (T-1179), and the app opens the stored link after it reads the widget's. (Amended after M3: an Open button's default *can* name a web link, inside the Button's `p.open`, as data the renderer never draws as a destination; section 7 item 3.) Apple says the app is activated and handed the URL either way [A1], so nothing is lost by this, and a link the person stored is never written into a file the extension draws (a script's own default is the script's, in `p.open`).

The routes `WidgetTapLink` reads (new rows marked):


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 5. Links: the grammar, read strictly, scrolls sideways" style="--tw:825px" markdown="1">

| Link | Means | Runs code |
|---|---|---|
| `pywidget://w/<id>` | the widget's tap: its stored action if that is `page`, `code`, `home`, `link` or `app`; the default if none is stored | never |
| **`pywidget://w/<id>/b/<button>/<i>`** | instance `i` of a button whose effective action opens something | never |
| **`pywidget://a/<id>/tap?v=<8 hex>&sig=<22 chars>`** | the tap's `run` action | yes, signed (section 6) |
| **`pywidget://a/<id>/b/<button>/<i>?v=<8 hex>&sig=<22 chars>`** | instance `i` of a button whose effective action is `run`, when it cannot run in the widget | yes, signed |
| `pywidget://widget/<name>/...` | a premade's own link (L4 s6, T-4515), unchanged | never |

</div>


Read as `WidgetTapLink.target(of:)` reads its own today: the scheme and host lower case, byte for byte; no user, password, port or fragment; the exact number of path parts; `<id>` passes the widget id rule and `<button>` the action name rule (section 7 item 1), so both go unescaped; `<i>` is decimal, no leading zero, below the largest cap, 8 (section 3): the link names no family and the app cannot know which one was tapped, so the instance is found by its `v` (section 6), not by a family's cap (Pernille's re-read, H1); on `a` links exactly the two query items `v` and `sig`, once each, `v` lower-case hex, `sig` base64url without padding; anything else is not a widget link, and the app does what it does with an unknown link today.

**The stored `link` URL**, checked when the person saves it and again at every tap:
- `https://` only, lower case. No `http`, no other app's scheme, no `javascript:`, `data:`, `file:`, `tel:` or `sms:`. Another app is the `app` action (section 5a), through a launcher slot, never a stored `link`; the Shortcuts premade already covers running a shortcut (ADR-010).
- A host: dot-separated labels of letters, digits and `-`, at most 253 bytes; an international name is stored in its `xn--` form, converted when saved, and shown to the person as typed. No user or password. A port only as digits 1 to 65535.
- The rest only RFC 3986 characters, `%` only before two hex digits: `TreeRules.keepsRFC3986`, the same check, so the two readers cannot differ. At most 2,048 bytes in all.
- The app opens it with `UIApplication.open`, so it goes to the person's default browser, or to the app that claims that universal link. pywidget shows no web content itself.

## 5a. Opening another app: the launcher's built path (an Investor #41, 9:38 PM ET 11-15)

The launcher premades already open apps a person chose (T-2551, T-3666, T-3848; [`pywidget/docs/design/launcher/tap-path.md`](tap-path.html); built, not released). The `app` action reuses that path. It is not a second one.

- **The widget carries a slot, never a URL.** The stored value is `{"do": "app", "slot": "<slot id>"}`; a script's default is `ui.Open.app(slot)` (section 7 item 3), which writes `{"do": "app", "slot": ...}` into the Button's `p.open`. The renderer draws `pywidget://w/<id>` for the tap and `pywidget://w/<id>/b/<name>/<i>` for a button, never the app's link. The slot's link lives only in `launcher/slots.json` in the App Group, written by the app under `launcher/slots.lock`. L12 P5 holds: a widget tap only ever goes into pywidget. The extension never reads `slots.json` for an action; it needs only the `do`.
- **The app opens it after its check.** The app resolves the action to its slot and hands the slot to `LauncherTapHandling`, the same entry the launcher's `pywidget://open?slot=` link reaches (tap-path steps 3 and 4): one read of `slots.json`, `LauncherTarget.check` again at the tap, then `openURL` once the window is active. The check is the launcher's, not section 5's: it is the tested one for app links (23 tests, 38 mutants caught), and a second check would let the two drift. It keeps an app's own scheme, `https`/`http` web and universal links, `tel:`, `facetime:` and `shortcuts://run-shortcut?name=...`, and refuses `javascript`, `file`, `data`, our own `pywidget`, Settings' private schemes and the rest that tap-path lists.
- **When it fails, the Set Up App sheet**, not the default action: the slot is unknown, has no link, its link is refused, the file is unreadable, or iOS opened nothing (the app was removed). The sheet says which, takes a pasted link and saves it to the slot, and shows over whatever the window already has up (`LauncherSheetPresenter`, tap-path steps 5 to 7). A tap is never a crash and never silently nothing. Two of the sheet's reasons change when the tap came from a stored `app` action, which has no script to check (Maren's review M7; build step 3): `LauncherSlotSheet.why`'s `.badLink` reason ends "Choose another app in the widget's settings." and the sheet offers Change, as section 8's notices do; a removed slot, which today shows only its id ("music-2") because the name went with the slot, reads "The app this widget opened was removed from your saved apps." (DRAFT). The launcher's own taps keep their words.
- **Choosing the app.** In the setting (section 9), "Open an app" lists the saved slots by name and symbol, and "Add an app" opens the launcher editor's app list (T-3664, T-3688, `editor.md`), which writes a new slot; the action stores only its id. The slots are one list shared with the launcher widgets, so changing a slot's app changes every widget that names it; the row says where else it is used, counting launcher widgets, stored `app` actions and scripts whose own `ui.Open.app("<slot>")` default names it (Pernille's re-read, s5a note: L6 resets stored `app` actions on import, but a script's default is code and stays, and it only ever opens an app the person keeps in that slot). A slot removed later leaves the action stored; its next tap opens the sheet, and the project page shows the row as "App not set up" (DRAFT).
- **The flash stays an open question.** The path has two hops, widget to pywidget to the other app, so pywidget shows first; how long, cold and warm, is the #192 device test, unchanged by this ADR. If #192 shows a flash, tap-path's two ways out (a direct `Link`, or `OpenURLIntent`) are Investor-visible rule changes for the launcher and this action alike; nothing here decides them in advance. No store text says an app "opens instantly" until #192 has run.
- **When it ships.** Under the launcher's own condition: after #192 has run on a phone and the Investors have been told the result (#41 c6653117254). If buttons ship before that, the readers still know `app` (it is in `formats.actions: 1`) and the setting hides the choice.
- **Not covered.** An app that publishes no link cannot be opened; iOS gives an app no way to open another by its bundle id. A Shortcut that opens it covers that case (a `shortcuts://` link in a slot; ADR-010).

## 6. A link that runs code is signed

Any web page or app can open a `pywidget://` link. So, as L5 s7.2 decided for action links:
- `sig` = HMAC-SHA256 with the per-install key (below), over `a/<id>/<place>?v=<v>`, where `<place>` is `tap` or `b/<name>/<i>`, so the instance index is inside the signed string; cut to 16 bytes, base64url. CryptoKit, in both processes; the extension signs at render time.
- **`v` covers what actually runs (H1).** `v` = the first 8 hex digits of SHA-256 over the **effective action** of that place: the stored action if there is one, else the tree's default for instance `i`, its `args` included. The bytes hashed are canonical (sorted keys, separators `,` and `:`, UTF-8, no ASCII escaping), made by one Swift function, `WidgetAction.canonicalBytes`, at draw and at tap; a stored action's bytes are the ones the app wrote into `actions.json` and are never re-serialized, because Python writes `250.0` where Swift writes `250` (L2). Python never computes `v`.
- **The arguments come from the files the widget drew, never from the URL.** At the tap the app (link) or the extension (intent) reads the stored action from `actions.json`, once, and compares its bytes' hash with `v`. With none stored, it reads the widget's `tree.json` once. That file is not one tree: it holds a timeline of entries, each drawn for every family the widget declares (`pywidget_ui.Entry`'s `views_by_family`), and neither the link nor the intent names an entry or a family (`perform()` is not told its family). So it looks at instance `i` of that name in every entry and every family, and runs the first whose canonical bytes hash to `v`; when none does, nothing runs (N4). The bytes run are still bytes the widget drew, because `v` matched them (Pernille's re-read, H1). The run request carries those canonical bytes and Python decodes them, so a handler gets an integral number as an `int` (`250`) where `Widget.run_action` in a test may have given it `250.0`; API.md's `Widget.action` row says so (her re-read, new Low). The bytes hashed are the bytes run. If the person changed the action, or the tree was rewritten since the draw with different args or fewer instances, `v` differs and nothing runs: the default action opens, with notice N4 (section 8). So a tap only ever runs what the widget showed.
- **One name, many instances.** A stored `run` for a name replaces the action of every instance of that name, its `args` included; the setting says so ("Applies to all 5 buttons named check", DRAFT). With nothing stored, each instance keeps its own default, so five habit rows run five different `args`.
- No `args` and no time in the link: a copied link can only repeat what the widget drew or the person stored, and a widget left unrefreshed for a week still works while its tree is unchanged.
- The intent (section 4) carries `v` but no `sig`: an intent is not a URL, and a web page cannot start one. `perform()` checks `v` the same way.
- An unsigned `pywidget://w/<id>` or `w/<id>/b/<name>/<i>` whose effective action is `run` does not run: the default opens with notice N5.

**The key (M8).** Only the app creates it: at first launch, and in any case before any action is saved, by an exclusive create (`O_CREAT | O_EXCL`) followed by a re-read, so two app launches cannot leave two keys. The extension only reads it; with no key it draws every place in its unsigned `w/` form, which never runs code. The file is `widgets/.action-key` (32 random bytes), beside `.lane-demoted.json`, named in ADR-007 s8 by this ADR's dated line; it takes the App Group's default protection (readable after first unlock, so the extension can sign while the phone is locked), and it is never in an export or a project; it is excluded from device backups (`isExcludedFromBackup`), so a restored phone makes a new key and the next redraw re-signs (until then a stale link reads as N5). `sig` is never written to the run log or the console.

## 7. The Python function: declared, then called (contract owned by Pernille; revised after her review)

**Declared.** The functions a person can choose are the project's declared actions, the existing `@widget.action(name, timeout=2.0)` handlers (`pywidget_ui`, API.md rows `Widget.action`, `Button`): `handler(state, args) -> state`, `None` keeps the state (L5 R12), timeout in (0, 5.0] s. Not any top-level function:
- a declared action is one the author meant to run from a tap, with a timeout;
- the list is known without importing code: it is the `actions` map the widget's last run already writes into its document, mirrored to the project page;
- the lane check (section 4) is per widget, and an action belongs to one widget.

So the picker lists the widget's own declared actions by name. In 1.0 a widget's tap or button runs only an action that widget declares; another widget's action is refused at save and at the tap, because the stored value names no widget and the run would write another widget's state. Allowing it later is an optional `widget` field and `formats.actions: 2` (Pernille's review, M5).

**Changes proposed to `pywidget_ui` (Pernille's call, each with tests):**
1. Action names become `[A-Za-z0-9_-][A-Za-z0-9_.-]{0,63}` (today any non-empty string): 1 to 64 letters, digits, `_`, `-` and `.`, no leading `.`, the `pywidget.` prefix still reserved, compared exactly. So a name can be a button's name in a link (section 5) unescaped. A second declaration of a name, or of one equal to it ignoring case, is refused with one error naming both lines. A script with another name gets one clear error at save; no premade uses an action today. (Pernille's review, M4.)
2. `Button(action, *label, args=None)` keeps its meaning: its **default action** is `{"do": "run", "function": action, "args": args}`, and its name for the setting is `action`. Buttons with the same action name in one tree are one **setting** but separate **taps** (H1): each drawn instance keeps its own `args` (the tree's `p.args`), its own index `i` in the link or intent, and its own `v` (section 6). A stored `run` for the name replaces every instance's action, `args` included, and the setting says how many instances that covers.
3. New: `Button(ui.Open.page(id=None) | ui.Open.code(file=None) | ui.Open.home() | ui.Open.link(url) | ui.Open.app(slot), *label, name=...)`: a button whose default opens something, with a required `name` (item 1's rule). In the tree it is `{"t": "Button", "p": {"action": "<name>", "open": {"do": "link", "url": "..."}}}` (M3): `action` stays required and *is* the name, so item 2 and item 3 read the same way in the manifest's `buttons` map; `open` takes section 1's value minus `run`. Checks, each in Python at the call and in Swift (`TreeRules`, and again at the tap): `ui.Open.link` and `open.url` with section 5's https grammar, separate from `linkURL` (as `LINK_URL_PATTERN` mirrors `TreeRules` today); `ui.Open.app` with the slot id rule; `ui.Open.code(file=)` a relative path ending `.py`, no `..` part, no leading `/`, resolving inside the project, a failure at the tap being N6 (L5). The renderer never puts `open.url` in a `Link`; it draws `pywidget://w/<id>/b/<name>/<i>`, and the app reads the default from `tree.json`. A tree that uses one name both for a run Button and for an Open button's `name` fails the lint (M4). `p.open` is a format change after the Day 13 freeze: ADR-002's dated line under Ruling 6 (M6).
4. The per-family caps of section 3 as a lint at `entry()`: one console line per family over its cap, never an error; drawn instances in depth-first order; Buttons, Toggles and `RefreshButton` counted; one fixture table shared with Swift's tests (L1).
5. ADR-002 Ruling 5 ("taps do nothing" in v1) and the one console line that says so are retired **for Button only** by a dated line in ADR-002 when this ADR is accepted (M9). **Toggle stays drawn and inert in 1.0**, with its console line: a Toggle tap has to change state at once, which needs L5's `isOnState` and ops, both 1.1. A Toggle is not person-settable and counts toward section 3's caps. `RefreshButton` counts toward the caps and is not settable.

**Called (M7: new code, Pernille's build step 5).** Today `widget_tree.REQUEST_KEYS` is `("id", "date", "state", "first_party")` and `parse_request` refuses any other key, so no action run exists in the runtime; only `Widget.run_action`, the test helper. The run is new in four places, each with tests:
- (a) `REQUEST_KEYS` gains `action`, checked before user code runs: the name rule, `args` a JSON object of finite numbers at most 1 KiB canonical, a `tap_id`.
- (b) One run does the handler, then the render with the returned state. A handler that raises, times out or returns a bad state writes nothing: state and tree stay as they were, the error goes to the widget's run log, and the widget keeps its last good tree. A commit told `replacedUnverified` is not a failed handler and does not keep its old tree (2026-11-19, T-5002; Pernille's review of 942e3aca8c, M1): still inside `run.lock`, in the `state.lock` hold where it would write its tree, the run re-reads `state.json` (`WidgetStateFile.read`); if that is `.file` the widget's tree is drawn from that state (the run's own tree when the re-read state is the one it committed; otherwise it writes none and asks for a reload, whose render reads `state.json` under `state.lock` as every render does), its run-log row's outcome is the new word `state_unverified` (not in `RunOutcomeWord` today: the wiring adds it to ADR-007 7.2 by a dated line, outside the Failed set, and it moves `status.json` as `ok` does), and the person sees what an `ok` run shows, no badge and no banner; if the re-read is `.none` or `.unreadable`, or `state.lock` is not taken, the run writes no tree, its row is `error` with error type `StateUnreadable`, and the person gets the badge in the widget or the result banner in the app, as for any run that fails.
- (c) Swift's `RunRequest(context: .widget, budget_s:, widget: {id, state, action: {function, args, tap_id}})` sends it (`function` is the declared function's name, not the button's; `args` as the canonical bytes of section 6), with a contract version line (v4.5 reserved the field; 1.0 implements it).
- (d) The lane runs the same path in the extension, through the same `_reset`, so a thread a handler leaves is counted as a render's is.

**One handler per widget, across both processes (H2).** L5 s5.3's commit rested on "one interpreter runs one handler at a time". This ADR adds a second interpreter: on iOS 18 to 26 a lane widget's button runs in the extension while the tap's `run`, or any signed link, runs in the app. Two taps reading `{"glasses": 3}` must not both commit 4 (ADR-007 s13 (d): ordinary concurrency loses nothing). So:
- **The 1.0 part of L5 s5:** `widgets/<id>/state.json` (`pywidget.state/1`) with `(epoch, rev)` and one result commit per run. No ops, no `pending` queue, no `failed.jsonl`; L5 s5.6 stays 1.1. Nothing writes `state.json` today, so this is new, with ADR-007 s8's dated line.
- **A separate lock spans the run: `widgets/<id>/run.lock`** (Pernille's re-read, H2). `state.lock` cannot be it: `WidgetStateLock` already takes it for short holds, with a 0.5 s wait and a fresh descriptor on each call, in `RunResultSink`'s tree compare-and-replace, `RunLogStore`'s row write and `WidgetStatus.update`. Held for a whole run, it would make the run's own tree write, row and status wait on the run itself and give up, lose the refused run's `busy` row, and fail every render's tree write for that widget meanwhile. So a run takes `run.lock` (the same bounded flock, its own file, created by the app as `state.lock` is; an extension that finds none draws the button's link form, ADR-007 s8) from reading the snapshot to the commit of state and tree; that is the one-handler rule. `state.lock` keeps its short holds, taken inside `run.lock` for the commit of `state.json` and the tree, and for each run-log row. A second run on the same widget waits for `run.lock` inside its own budget; if it cannot get it, it is **refused**: one run-log row (trigger `widget_action`, outcome `busy`, written under `state.lock`, which is free) and the badge in the widget, or the result banner in the app. Never silently dropped, never queued in 1.0. The window is at most 2.0 s in the widget (section 4) and the action's `timeout` plus ADR-007's <span title="A test written in advance. If it fires, we drop the idea.">kill</span> <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> in the app, inside a background-task assertion around the `run.lock` hold (section 4, 0xdead10cc). Because no other run can commit inside the window, the commit needs no re-apply: `rev` is checked once, and a `rev` that moved anyway (a writer outside `run.lock`) is outcome `conflict` with nothing written.
- **A commit's outcome says what is on disk (2026-11-17, T-4760; Pernille's review of dadba11da4, M1).** The state is encoded to its fixed point before it is written (JSON's `-0.0` reads back as `0`, so one pass is not always it), and bytes that would not read back as the same file are refused before the rename: `writeFailed`, nothing written. After the rename, the bytes read back are compared with the bytes written. If they differ, or the file can't be read, the outcome is **`replacedUnverified`**: `state.json` changed and the snapshot's `(epoch, rev)` is gone, so the run is not told "nothing written" and must not keep its old tree as if the old state stood; the next run starts from what is on disk.
- **The run lock is held across the awaited run, and a late commit is refused (2026-11-18, T-4762; Pernille's review of dadba11da4, M3).** The paths a run wraps are async (the extension's `ExtensionLane.turn` and `runInBridge`, the intents' `perform()`), so the run is async and so is its body: `run.lock` is held from the snapshot across every await of the handler run to the commit, and let go only when the body returns or throws. Every wait on that path, for `run.lock` and for `state.lock`, sleeps (`Task.sleep`) and holds no thread; a task cancelled while it waits stops at once with outcome `cancelled`, not `busy`, and writes no `busy` row. The run's one commit is good only inside its body: a commit made after the body has returned, by a `Commit` kept past it or by a task the body started, is refused **`late`** with nothing written, because `run.lock` no longer covers it. A commit already writing when the body returns finishes first, inside `run.lock`.
- **Renders do not wait on handlers.** A render never takes `run.lock`; it reads state and writes its tree under `state.lock`'s short holds, and falls back to the cached tree at its own deadline, as `getTimeline` does today. A process killed while holding either lock releases it (flock), and the kill marker demotes as ADR-007 s5 says.
- **Lock order, always:** `run.lock`, then `state.lock`, then the premade lock (premade-inputs s2.3.1's, for `premade.json`). No holder of a later lock takes an earlier one, so the two processes cannot deadlock.
- **The gates.** The 2026-10-27 chair line held every extension `state.json` write until G-L5-1 (a), the widened G-L5-5 with the kill test, and Odalys's review of the L5 s5 delta had passed; for a Button that does something it also named G-L5-2 on a device and G-L5-4. The Investors' 9:11 PM ruling moves buttons into 1.0; it does not <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> those gates. They are the done-when of build step 6a (section 13): G-L5-5 widened to two processes committing one widget, with the kill test; and Odalys reviews the s5 delta (this section) before step 6 lands.

**Answered by Pernille** ([`pywidget/docs/reviews/adr-011-review-pernille.md`](adr-011-review-pernille.html), 2026-11-15): another widget's action is refused in 1.0 (M5). Manifest `args` are passed as given after both readers' checks (a JSON object, finite numbers, at most 1 KiB canonical); there is no declared shape in 1.0, the picker stores none, and a handler treats `args` as untrusted (L2).

## 8. Fallbacks: the default action, with a notice

When an action cannot be carried out, the widget's default action (section 2) runs instead and pywidget shows one notice above the screen it opened. Never a partial action, never an empty screen.

**The notice has no timer (Maren's review H1, taken).** A notice that left after 6 s would be gone before VoiceOver reached it, and with it the only reason the tap did something else; Apple: "Minimize use of time-boxed interface elements ... Prefer dismissing views with an explicit action" [A8]. So the notice stays until the person closes it, with an X whose VoiceOver label is "Close", or leaves that screen. It is posted to VoiceOver as an announcement when it appears. A notice that tells the person to change a setting (N1, N2, N3) carries a **Change** button that opens that widget's settings (section 9). It slides in; under Reduce Motion it fades in instead (her L1).


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 8. Fallbacks: the default action, with a notice, scrolls sideways" style="--tw:960px" markdown="1">

| Case | Found | Notice (DRAFT copy, not approved, <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>) |
|---|---|---|
| N1 the Page is gone (output removed, premade not in this build) | at the tap | "The Page this widget opens was removed, so pywidget opened its usual screen instead. Choose what it opens in the widget's settings." (wording: Maren's review M3) |
| N2 the function is gone (not in the widget's last `actions`) | at render: the button is drawn as the signed link, and at the tap | "Nothing ran: “add_glass” isn't in this widget's script any more. Choose another in the widget's settings." (M3) |
| N3 the stored link fails section 5 (an edited or imported manifest) | at render and at the tap | "pywidget can't open the link saved for this widget. Set a new one in the widget's settings." The link is not shown. (M3) |
| N4 the action changed since the widget was drawn (`v` differs) | at the tap | "Nothing ran: this widget changed since it was last drawn. It's up to date now, so tap it again." The widget is reloaded. (M3) |
| N5 an unsigned link asked to run code | at the tap | "Nothing ran: this link didn't come from one of your widgets." (M3) |
| N6 the code file is gone, or `file` fails section 7 item 3's path rule | at the tap | today's route, the Projects list. With a `file` the person chose, a notice: "“views/today.py” isn't in the project any more, so pywidget opened Projects." With no `file` (the default), no notice, as today. (M3) |
| N7 an `app` action cannot open its app (slot unknown, no link, link refused, file unreadable, iOS opened nothing) | at the tap | not the default: the launcher's Set Up App sheet, which says which and takes a link (section 5a). For a stored `app` action its reason does not blame a script (section 5a, Maren's review M7) |

</div>


A tap the widget refuses before running (margin, demoted, kill marker, `busy`) is not a fallback either: it writes its run-log row and shows the badge (section 4, M2; section 7, H2). A run that starts and fails is not a fallback: it shows its error in the result banner (tap) or the widget's badge (in the widget), as ADR-007 s7 does today. An action stored for a button the tree no longer draws is kept, unused, and shown on the project page as "Not in the widget"; it is not deleted, so a button that comes back keeps its setting.

## 9. Where the setting lives (Maren draws it, inside the approved look)

On the project page (03-structure s1, "The project page"), under **Outputs**, each widget's row opens the widget's detail, which gains two parts:
- **When tapped**, one row: the current choice in words ("Opens its Page", "Runs add_glass", "Opens example.com", "Opens Music"), chevron. It opens a list of the six choices, in these words (DRAFT): "Open its Page", "Open its code", "Open Projects", "Open a web page", "Open an app", "Run a function", plus the default row first, which names that widget's own default (section 2): "Default: opens its Page" for a premade, "Default: opens its code" for a person's script widget (Maren's review M2). One checkmark. "Open its Page" is hidden when the project has no Page. Under "Run a function", a footer: "A tap on the widget opens pywidget to run it. To run it without opening pywidget, use a button." (M4). Under "Open a web page" and "Open an app": "pywidget opens first, then the page or app." (M4). Choosing Link shows one field with the section 5 check as the person types (its words below); choosing Open an app lists the saved apps and "Add an app" (section 5a), and is hidden until the launcher path ships; choosing Run lists that widget's own declared functions (Pernille's M5); choosing Page lists the project's Pages; choosing Code lists its files. A choice applies when the row is chosen and the person goes back, as iOS's pushed checkmark lists do in Settings; there is no Done, except on the link field's screen, where it is **Save** (Maren's review L5). With nothing to pick (her M8): "Run a function" with no declared functions shows "This widget has no functions yet. Add one with @widget.action in its script."; "Open an app" with no saved apps shows only "Add an app".
- **The link field (Maren's review M6; DRAFT, step 7 draws it).** Keyboard `.URL`, no autocorrect, no capitals. Typing `example.com` with no scheme saves `https://example.com` and shows it. Errors under the field, one at a time: "Links start with https://." (any other scheme, `http` included); "This isn't a web address." (no host, or bad characters); "This link is too long (2,048 characters at most)." Save stays disabled until the field passes section 5's check. The When tapped row shows the host only: "Opens example.com".
- **Buttons**, one row per button **name** the widget's tree draws, titled by its first drawn instance's text label (its name when that label has no text), with the same picker. A name drawn more than once says so on its row and in the picker ("Applies to all 5 buttons named check", H1). Toggles and `RefreshButton` are not listed; they are not settable (M9). A widget with none shows no section. A family that drops a button (section 3 caps) is noted under its row.
- **Imported projects (L6, proposed; Maren's to confirm with the words).** A manifest from someone else keeps its `page`, `code`, `home` and `run` actions: they stay inside the project, and `run` calls only the project's own declared code, which its widget already runs at every render. Its `link` and `app` actions are reset to the default, because a link the person never chose should not open from their Home Screen, and slot ids belong to one install. The import summary names how many were reset (DRAFT, with plural forms: "2 widget actions that opened links or other apps were reset. You can set them again in each widget's settings."; Maren's review L6 confirms the split).

Drawn in the approved look (`creative/approved.md` item 2: A Paper is the light appearance, B Studio the dark; two frames per screen, not four), with Dynamic Type and VoiceOver: each row reads its title and its choice ("When tapped, Opens its Page"; a Buttons row adds its count, "check, Runs check, 5 buttons"), and the picker's checked row has the Selected trait. At accessibility text sizes the rows stack their title above their choice, and a long link or file path truncates in the middle (Maren's review L3). In this ADR "the widget's settings" means this detail screen; notices use those words, never "the project's page", which a person reads as a Page (Maren's review M3). Strings are DRAFT until a copy guide is approved. A saved change reloads that widget's timeline at once (from the foreground, budget-free, ADR-007 s4 <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span>).

## 10. Stored in the project manifest

The phase C manifest (`pywidget.json`; 03-structure s1 "Layout"; the manifest ADR that opens T-4476) carries the actions on each widget output:

```json
"outputs": {
  "today": {"kind": "widget", "view": "views/today.py",
            "tap": {"do": "page"},
            "buttons": {"add_glass": {"do": "run", "function": "add_glass", "args": {"ml": 250}},
                        "help": {"do": "link", "url": "https://example.com/help"},
                        "music": {"do": "app", "slot": "music"}}}
}
```

- `tap` and `buttons` are optional; absent means the default. `buttons` is keyed by name (section 7 items 1 to 3); a `run` stored there with no `args` means `{}` (L2). `formats` gains `"actions": 1`. A manifest whose `actions` format is newer than the app's is refused in plain words, as `newer_version` is today.
- The extension never reads the manifest; it reads the App Group cache the app builds from it (03-structure: "a cache built from the folder, never a second original"): `widgets/<id>/actions.json`, written by the app on save, as one rename, each action as its canonical bytes (section 6). The renderer uses only each action's `do` (to pick `Link` or `Button(intent:)`) and computes `v` from those bytes; it never opens a stored link and never reads a slot. `actions.json` is named in ADR-007 s8 by this ADR's dated line.
- Premades are projects (03-structure), so their settings live in the same place. Moving existing projects (T-4476's tested move) writes no actions: absent is the default.
- Before phase C there is no manifest field, so tap choices ship with Projects in 1.0; until then every widget has its default.

## 11. What would make this fail

- **The ladder export shows W far below 23 MB on an older phone.** Fewer widgets qualify for in-widget buttons on 18 to 26; their buttons open pywidget instead. The design does not change; the feeling does.
- **A phone shows pywidget for too long before a link or another app opens.** Measured on a phone in step 9 (section 13) for links, and by #192 for apps; if it is long, the setting says so beside "Link" and "Open an app", and the ways out in section 5a go to the Investors.
- **`busy` refusals are common.** If people often tap a button while another run of the same widget holds `run.lock` (step 9 counts them), the lock window is too long: the fix is a shorter in-widget budget or a 1.1 queue (L5 s5.6), never a second commit without the lock.
- **The app is killed for holding `run.lock` at suspension (0xdead10cc).** Step 6a's kill test and a test that suspends the app mid-run catch it; the assertion in section 4 is the guard.
- **iOS 18 to 26 picks the app for `WidgetButtonIntent`.** It cannot (the type is not in the app target, L5 s0), and a test keeps it out, as the Refresh tests keep `RefreshWidgetsIntent` off buttons.
- **App Review reads a button that opens pywidget as a button.** Section 4 draws those as `Link`s, as Apple asks [A3].

## 12. Sources (Apple, saved signed out with URL and date; `research/inbound/apple/index.tsv`)

- [A1] Linking to specific app scenes from your widget or Live Activity, https://developer.apple.com/documentation/widgetkit/linking-to-specific-app-scenes-from-your-widget-or-live-activity.md, saved 2026-11-05 (T-2535).
- [A2] `widgetURL(_:)`, https://developer.apple.com/documentation/swiftui/view/widgeturl(_:).md, saved 2026-11-08 (T-3663).
- [A3] Adding interactivity to widgets and Live Activities, https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities.md, saved 2026-10-29 (T-0671).
- [A4] Human Interface Guidelines, Widgets, https://developer.apple.com/design/human-interface-guidelines/widgets.md, saved 2026-11-04 (T-1443).
- [A5] `IntentExecutionTargets` (iOS 27.0+), https://developer.apple.com/documentation/appintents/intentexecutiontargets.md, saved 2026-11-12 (T-4127).
- [A6] `IntentModes` (iOS 26.0+), https://developer.apple.com/documentation/appintents/intentmodes.md, saved 2026-11-15 9:18 PM ET for this ADR (T-4542).
- [A7] `OpenURLIntent` (iOS 18.0+), https://developer.apple.com/documentation/appintents/openurlintent.md, saved 2026-11-05 (T-2535).
- [A8] Human Interface Guidelines, Accessibility, https://developer.apple.com/design/human-interface-guidelines/accessibility.md, saved 2026-11-15 9:53 PM ET for Maren's review (T-4542; `research/inbound/apple/developer.apple.com/design_human-interface-guidelines_accessibility.md-b15ad1b2.html`).

Company sources: Pernille's review and re-read ([`pywidget/docs/reviews/adr-011-review-pernille.md`](adr-011-review-pernille.html), 9899cedabe and 42677816c5); Maren's review ([`pywidget/docs/reviews/adr-011-review-maren.md`](adr-011-review-maren.html), 8219925b84); the Set Up App sheet's strings (`ios/App/Launcher/LauncherEditor.swift`, `LauncherSlotSheet.why`); the launcher tap path ([`pywidget/docs/design/launcher/tap-path.md`](tap-path.html), `ios/Shared/LauncherSlots.swift`); `WidgetStateLock` (`ios/Shared/LaneGuard.swift`); ADR-001 3.1 (iOS 18.0 floor; decision 20 A, iOS 27 features used where present); ADR-002 Ruling 5; ADR-007 s3, s4, s5, s7; L5 ([`pywidget/docs/research/L5-interactivity.md`](l5-interactivity.html)) s0, s4, s7; `premade-inputs.md` s2.5; 03-structure s1; T-4282's board line for the numbers.

## 13. Build steps (proposed board lines for Ines; not added. She sets the order and dates under T-4543)

Each is a step of the named feature, added when it starts. Reviewer per merge (Commandment 13): Pernille for Idris's steps, Idris for Pernille's; Odalys also reviews the L5 s5 delta (step 6a).

1. `[build] Read one widget action value strictly` \| Idris, step of T-4476: `WidgetAction` in Shared (the six kinds, section 1's rules, section 5's link check reusing `keepsRFC3986`, the slot id rule, `canonicalBytes`) and its Python mirror; host tests for every refused shape. Done when: tests: both readers refuse the same table of bad values, and the canonical bytes of a shared fixture table match byte for byte.
2. `[build] Store tap and button actions in the manifest` \| Idris, step of T-4476, after the manifest ADR: `tap`, `buttons`, `formats.actions`; the App Group cache `widgets/<id>/actions.json` written on save; import resets `link` and `app` (L6). Done when: tests: a project with actions survives the move unchanged; a newer `actions` format is refused in words; an imported manifest keeps its `run` and loses its `link`.
3. `[build] Route a widget tap by its chosen action` \| Idris, step of T-4476: `WidgetTapRouting` resolves the stored tap action and each button instance's effective action (`w/<id>/b/<name>/<i>`, defaults read from `tree.json` across its entries and families, matched by `v`); fallbacks N1 to N6 with the notice (no timer, Close, announced to VoiceOver, Change on N1 to N3, fade under Reduce Motion; section 8); `link` opened by the app; `app` handed to `LauncherTapHandling`, N7 the Set Up App sheet with section 5a's two reasons for a stored `app` action (Maren's M7). Done when: seen: on the iPhone, each of the six choices from a placed widget, and a bad link and an unknown slot each falling back; with VoiceOver on, a fallback notice is read and stays until closed.
4. `[build] Sign the links that run a function` \| Idris, step of T-4478: the key made by the app only (exclusive create, re-read; M8), `v` over the effective action and `sig` over the instance's place (H1), the `a` routes. Done when: tests: a forged, unsigned or stale link runs nothing; two habit rows sharing one name run their own `args`; a Medium widget's fourth button, with a timeline of several entries and families in `tree.json`, runs its own `args`; a tree rewritten with other `args` gives N4; two concurrent key creations leave one key.
5. `[build] Python contract and action run for widget buttons` \| Pernille: section 7 items 1 to 5 (the `Open` buttons with `p.open`, name rule and clashes, caps lint, the Toggle line), and the run itself, section 7 "Called" (a) to (d): `REQUEST_KEYS` gains `action`, handler then render in one run, Swift `RunRequest` with its contract version line, the lane's same path through `_reset`; ADR-002's dated line made current. Done when: tests in tests/ and an API.md row per change (including the `timeout` note for in-widget runs, `args` as untrusted input that may carry integral numbers as `int`, the `Button` row's 44 pt target and one row in Small, and the lint line for a Button with no text); Idris reviews.
6a. `[build] One state commit per widget across app and widget` \| Idris, before step 6: `state.json` (`pywidget.state/1`, `(epoch, rev)`, one commit) and the run holding `widgets/<id>/run.lock` from snapshot to commit, with `state.lock`'s short holds inside it, the lock order `run.lock`, `state.lock`, premade lock, `busy` refusals, renders not waiting (section 7, H2). Done when: tests: the widened G-L5-5, two processes committing one widget's state many times with no lost commit and every refusal's `busy` row present; a run's own tree, row and status written while it holds `run.lock`; a render's tree write succeeding during a handler run; its kill test (a process killed holding `run.lock` frees it, and the marker demotes); G-L5-1 (a) recorded; the app suspended mid-run is not killed; Odalys's review of the s5 delta written.
6. `[build] Draw buttons as links or intents` \| Idris, step of T-4478, after 4, 5 and 6a: the renderer picks `Link`, `Button(intent: WidgetButtonIntent)` (extension only, only when `timeout` + T <= 2.0 s; M1) or, on iOS 27, `WidgetButtonAppIntent`; caps per family over drawn instances (L1); the extension's run under the lane margin and the one budget, writing state and tree before return; refused taps logged and badged (M2), the badge's refusal label (Maren's L2); section 3's drawing rules (44 pt hit area, Lock Screen capsule, VoiceOver label and hint, Dynamic Type, no added transition). Done when: seen: on the iPhone (iOS 26), a lane widget's button runs without pywidget opening, an app-lane widget's button opens pywidget and runs, and a demoted widget's tap shows the badge; screenshots of a Small widget with two buttons at 148 pt and a Rectangular one at 153 x 68 pt with their hit areas outlined, and VoiceOver reading an icon-only button by its name; G-L5-2 on a device (redraw time, budget) and G-L5-4 (Lock Screen accessories) recorded; tests keep the 18-26 intent out of the app target.
7. `[design] Draw the When tapped setting` \| Maren: frames for section 9 in Paper (light) and Studio (dark), the picker with its empty states, the link field and its errors (her M6 words), the fallback notice with Close and Change, VoiceOver order; DRAFT strings. Done when: frames under pywidget/docs/design/ and Idris's build notes answered.
8. `[build] Build the When tapped setting` \| Idris, step of T-4476, after 7: the project page rows and pickers. Done when: seen: on the iPhone, choosing each action updates the placed widget at once, light and dark.
9. `[measure] Check widget buttons on phones` \| Idris: on an Investor phone, time from tap to the link's page; a button on the locked phone; an in-widget run's peak against W, and the count of button refusals in warm processes (L3); `busy` refusals in ordinary use; on iOS 27 if a phone has it, a background run; if an Investor uses an iPad, a Small widget's buttons at their 37.4 pt shown size (Maren's L4). The app hop's flash is #192's, not this step's. Done when: the readings saved under research/inbound/ and noted in this ADR.
10. `[design] Choose which premades get buttons` \| Maren with Ines: which of the premades gain a button in 1.0 (for example, check off a habit), within section 3's caps. Done when: a dated line in premade-inputs.md.

Not a build step: Ines's T-4543 moves ADR-001's 1.2 row for buttons into 1.0 and posts the date effect.

## 14. Review answers

### Pernille's review (FIX FIRST, 9899cedabe)


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: Pernille&#x27;s review (FIX FIRST, 9899cedabe), scrolls sideways" style="--tw:960px" markdown="1">

| Finding | Answer | Sections changed |
|---|---|---|
| H1 per-row `args` lost; `v` cannot match | Taken as proposed: setting per name, tap per drawn instance; `<i>` in the link, intent and signed string; `v` over the effective action, `args` included; defaults read from `tree.json`, never the URL; a stored `run` covers every instance and says so | 4, 5, 6, 7 item 2, 9, 13 steps 3, 4 |
| H2 two interpreters commit one widget's state | Taken: 1.0 part of L5 s5 named (`state.json`, `(epoch, rev)`, one commit; no ops, queue or `failed.jsonl`); a lock held from snapshot to commit across both processes (first written as `state.lock`; now `run.lock`, re-read H2 below), `busy` refusal logged and badged; the 10-27 chair line's gates kept as step 6a's and 6's done-when; Odalys reviews the s5 delta before step 6 | Plain summary, 4, 7 "One handler per widget", 11, 13 step 6a |
| M1 in-widget time | Taken: one 2.0 s budget for lock, handler and render; intent drawn only when `timeout` + T <= 2.0 s | Plain summary, 4, 13 step 6 |
| M2 refused tap invisible | Taken: `perform()` re-reads demotion and marker, margin first; row and badge; not queued in 1.0 | 4, 8 |
| M3 Open buttons and the schema | Taken: `p.open` beside the required `action`; s5's sentence amended; ADR-002 dated line | 5, 7 item 3, ADR-002 |
| M4 name clashes | Pernille's s7 item 1 edit kept; run/Open clash fails the lint | 7 items 1, 3 |
| M5 another widget's action | Pernille's answer kept: refused in 1.0 | 7, 9 |
| M6 dated lines | Added, in force when this ADR is accepted: ADR-007 (s4.1 T5, s8 writers and names, s14), ADR-002 (Ruling 5 for Button, Ruling 6 for names and `p.open`), L5 (s4.3 and the 10-27 chair line point here) | ADR-007, ADR-002, L5 |
| M7 runtime run has no step | Taken: step 5 widened to the action run, (a) to (d), Pernille's, Idris reviews | 7 "Called", 13 step 5 |
| M8 two key creators | Taken: app-only exclusive create and re-read; extension reads; file named; protection, export and logging rules | 6, ADR-007 s8 line, 13 step 4 |
| M9 Toggle | Taken: Ruling 5 retired for Button only; Toggle drawn, inert, unsettable, counted; `RefreshButton` counted | 3, 7 item 5, 9, ADR-002 |
| L1 caps lint | Taken: console line, depth-first, instances, shared fixture table | 3, 7 item 4 |
| L2 manifest `args` | Taken: canonical bytes, `v` over written bytes, no args from the picker | 1, 6, 10 |
| L3 warm numbers | Taken: warm 11 to 15 MB cited; step 9 counts warm refusals | 4, 13 step 9 |
| L4 iOS 27 background runs | Taken: margin at start, busy queue refuses, no T1 batch; lock only inside a background-task assertion | 4 |
| L5 `ui.Open.code(file=)` | Taken: relative `.py`, no `..`, no leading `/`, inside the project; N6 | 7 item 3, 8 |
| L6 imported projects | Decided (Maren to confirm the words): keep `page`, `code`, `home`, `run`; reset `link` and `app`; the import summary says how many | 9, 13 step 2 |
| L7 'open an app' | Taken: sixth `do`, `app`, in `formats.actions: 1`; the launcher's path | 1, 5a, 8 N7 |
| Operator note (#41 c6905759408) | `app` action through a launcher slot; the app opens the saved link after `LauncherTarget.check`; Set Up App sheet on failure; #192's flash question stays open; ships under the launcher's own condition | Plain summary, 1, 4, 5, 5a, 8, 9, 10, 11 |

</div>


### Pernille's re-read (FIX FIRST, narrowed to two sentences; 42677816c5)


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: Pernille&#x27;s re-read (FIX FIRST, narrowed to two sentences; 42677816c5), scrolls sideways" style="--tw:960px" markdown="1">

| Finding | Answer | Sections changed |
|---|---|---|
| H1 `tree.json` holds a timeline of entries, each per family; the link and intent name neither | Taken: at the tap, instance `i` of that name is looked up in every entry and family, and the first whose canonical bytes hash to `v` runs; none is N4. `<i>` is checked against the largest cap, 8 | 5, 6, 13 steps 3, 4 |
| H2 `state.lock` is the short lock the tree write, run-log rows and status take | Taken: a separate `widgets/<id>/run.lock` from snapshot to commit; `state.lock` keeps its short holds inside it, the refused run's `busy` row included; order `run.lock`, `state.lock`, premade lock; the 0xdead10cc assertion around `run.lock` | 4, 7 "One handler per widget", 11, 13 step 6a, ADR-007 s8 dated line, L5 dated line |
| New Low: integral numbers reach Python as `int`; `action.name` reads as the button's | Taken: the run request carries the canonical bytes, Python decodes them, API.md says so; (c) names the field `function` | 6, 7 "Called" (c), 13 step 5 |
| s5a note: a script's `ui.Open.app` default stays on import | Taken: the slot row's "where else it is used" counts script defaults too | 5a |

</div>


### Maren's review of sections 3, 8 and 9 (FIX FIRST, 8219925b84)


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: Maren&#x27;s review of sections 3, 8 and 9 (FIX FIRST, 8219925b84), scrolls sideways" style="--tw:797px" markdown="1">

| Finding | Answer | Sections changed |
|---|---|---|
| H1 the notice leaves after 6 s, before VoiceOver reaches it | Taken as she proposed: no timer; Close (labelled) or leaving the screen; announced; Change on N1 to N3; fade under Reduce Motion | 8, 13 steps 3, 7 |
| M1 caps limit how many, not how small | Taken: 44 x 44 pt hit area for every drawn Button and its `Link` form; filled capsule on the Lock Screen; API.md note; step 6 frames at 148 pt and 153 x 68 pt | 3, 13 steps 5, 6 |
| M2 default row named the wrong default | Fixed by Maren in s9; kept | 9 |
| M3 notices did not say whether anything ran | Fixed by Maren in s8 N1 to N6; kept | 8 |
| M4 "Run a function" on the tap opens pywidget | Fixed by Maren in s9 footers; kept | 9 |
| M5 icon-only buttons have nothing for VoiceOver | Taken: label text, else the action name read with spaces, and a lint line; `Link` form hint "Opens pywidget" | 3, 13 steps 5, 6 |
| M6 link field words | Taken as drafted (DRAFT, step 7 draws it) | 9, 13 step 7 |
| M7 the Set Up App sheet blames the script | Taken: for a stored `app` action, "Choose another app in the widget's settings." with Change; removed slot named in words; launcher taps unchanged | 5a, 8 N7, 13 step 3 |
| M8 choices with nothing to pick | "Open its Page" hidden fixed by Maren; the two empty states added | 9 |
| L1 Reduce Motion | Taken: notice fades; no added transition on a redraw | 3, 8 |
| L2 refusal badge | Taken: VoiceOver label "Didn't run. Tap again, or open pywidget." for refusals; look unchanged | 4, 13 step 6 |
| L3 Dynamic Type | Taken: one-line label, 0.8 scale, never under 11 pt, then symbol only; rows stack, middle truncation | 3, 9 |
| L4 iPad's scaled Small widget | Accepted (37.4 pt); measured in step 9 if an Investor uses an iPad | 3, 13 step 9 |
| L5 Done versus apply-at-once | Taken: a choice applies on selection; Save only on the link field | 9 |
| L6 imported projects | Confirmed by Maren; her summary words kept | 9 |
| L7 "pywidget" versus "PyWidget" | Not changed here, as she wrote: the product name is not approved (`creative/approved.md` item 12) and the copy guide settles it for every string | none |
| L8 Paper and Studio as four panels | Fixed by Maren; kept | 9 |

</div>
{% endraw %}

</div>
