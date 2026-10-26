---
layout: "default"
title: "L5 \u2014 Widget interactivity for 1.1: Python actions, App Intents, state, paging, deep links, controls"
section: "documents"
description: "Consequences: L4 s6&#x27;s &quot;or in the app if openAppWhenRun&quot; is wrong (3). ADR-007&#x27;s T5 &quot;app process&quot; holds only on iOS 27+ by explicit opt-in; on 18-26 a Python handler cannot be reached from a widget tap without opening\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/l5-interactivity.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/research/L5-interactivity.md</code></span></div><h1>L5 — Widget interactivity for 1.1: Python actions, App Intents, state, paging, deep links, controls</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span>: L5 (brief Section 5, C4). Board: T-0017. Author: Idris. 2026-10-26 (Day 5), 00:01-00:11 ET. Status: **spec, proposed; <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> items ruled 2026-10-26 00:15 (s15 chair note)**; nothing here is built, and the parts that change ADR-007 for 1.1 need Ines's chair line (s15). No Xcode in this task; every device fact still to be measured is a gate in s14.

Inputs: brief L5; ADR-001 (no buttons in v1, 1.1 list); ADR-007 (option b: Python only in the app; triggers <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span>-T7; App Group layout; batch rule); bridge contract v4 (b25dc911; `RunRequest`, `WidgetRequest`, the `widget_tree` record); L4 s6 and s8 (actions in the tree; additive versioning); L2 s1 (reload budget); L9 s2 (intents, entities, slots); the names review ([`pywidget/docs/reviews/pywidget_ui-names-idris.md`](pywidget-ui-names-idris.html), the 19 agreed renames; I use the reviewed names, not the package, which Pernille is renaming now); CORRECTIONS U1-06 and U1-34.

**Sources and tags.** Platform facts come from the iOS 27.1 SDK in this Xcode, read this session:
- `AIN:n` AppIntents.swiftinterface, `AIS:n` _AppIntents_SwiftUI.swiftinterface, `W:n` WidgetKit.swiftinterface, `S:n` SwiftUI.swiftinterface (line numbers).
- `doc(Symbol)` Apple's own doc comment for that symbol, from the module's `.swiftdoc` (`strings` of the file; quoted verbatim).
- `ARG p.n` the App Review Guidelines PDF from #59 (`/private/tmp/i59pdf/`, read with `tools/pdftext.swift`).
- **[recalled]** my memory of Apple docs or WWDC, not read this session. **[ours]** a design choice of this company, not Apple's.

## 0. Which process runs a widget Button's `perform()` (U1-34, settled)

The answer is not "the extension" (L4 s6) or "the app" (ADR-007 s5.1 T5). **It is whichever target contains the intent type, and from iOS 27 we can pin it.** Evidence, all from the SDK:

1. `doc(IntentExecutionTargets)`: "A set of options that describes which process performs an intent or entity query. If you reuse intents and entities between your app, widget extension, or App Intents extension by using a Swift package or framework, the system may perform your AppIntent or EntityQuery from the app or App Intents extension. By default, the system performs an intent or entity query using any available target."
2. The targets are `.main` ("The system performs the intent or query in the main app process"), `.appIntentsExtension`, `.widgetKitExtension` ("The system performs the intent or query in a widget extension") and `.default` ("in any available target"), AIN:3571-3583; chosen per intent with `static var allowedExecutionTargets`, **`@available(anyAppleOS 27.0, *)`**, AIN:3111-3112.
3. `doc(AppIntent.openAppWhenRun)`: "This property is deprecated. Use supportedModes instead. Setting this property to `true` generates an error if the app intent runs in an app extension." Deprecated iOS 26 (AIN:3100-3105); `supportedModes` is iOS 26 (AIN:3106-3107).
4. `doc(LiveActivityIntent)`: "When the system performs the intent, the system launches your app process without opening the app, performs the intent, and starts the Live Activity." iOS 17 (AIN:253-257).

So, for our floor (iOS 18.0, ADR-001 3.1):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 0. Which process runs a widget Button&#x27;s perform() (U1-34, settled), scrolls sideways" style="--tw:972px" markdown="1">

| OS | Intent compiled into | Process that runs `perform()` | Basis |
|---|---|---|---|
| 18-26 | the widget extension only | the extension (the only available target) | 1, by deduction; G-L5-1 confirms |
| 18-26 | app and extension (shared framework) | "may" be either; not ours to choose | 1 |
| 18-26 | any, with `LiveActivityIntent` | the app process, launched without opening the app | 4 |
| 27+ | app and extension, `allowedExecutionTargets = [.main]` | the app process | 2 |
| any | extension, with `openAppWhenRun = true` | error | 3 |

</div>


Consequences: L4 s6's "or in the app if `openAppWhenRun`" is wrong (3). ADR-007's T5 "app process" <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> only on iOS 27+ by explicit opt-in; on 18-26 a Python handler cannot be reached from a widget tap without opening the app, unless we misuse `LiveActivityIntent`. I reject that: ARG p.18 2.5.4 says apps "may only use background services for their intended purposes: VoIP, audio playback, location, task completion, local notifications, etc.", and a Live Activity intent that starts no Live Activity is not its intended purpose. Both docs get a dated fix (s15). The design below works on 18-26 without Python in the extension, and gets faster on 27.

## 1. What the platform allows (and what it does not)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 1. What the platform allows (and what it does not), scrolls sideways" data-n="4" style="--tw:1325px" markdown="1">

| Surface | Input | View | Min iOS | Source |
|---|---|---|---|---|
| Widget `Button(intent:label:)` | tap | any SwiftUI label | 17 | AIS:184-186 |
| Widget `Toggle(isOn:intent:label:)` | tap, flips | label; system switch look | 17 | AIS:235-237 |
| `invalidatableContent()` | none | dims content the action will change | 17 | S:2783-2785 |
| `widgetURL(_:)`, `Link` | tap, opens the app at a URL | any | 14 | W:614-617 |
| `RunSystemShortcutIntent` | tap; the **person** picks the target (another app, an App Shortcut, a custom shortcut, a system action) in widget configuration | Button label | **27** | AIN:3633-3642; doc: "Only use RunSystemShortcutIntent to initialize a Button ... and place the button in a widget." |
| Control Center / Lock Screen / Action button controls | `ControlWidgetButton` (any `AppIntent`, or an `OpenIntent` that opens the app), `ControlWidgetToggle` (`SetValueIntent` with `Bool`) | title, SF Symbol, value label only; no view tree | 18 | W:1182-1199, W:1277-1295, AIN:3657-3658 |
| Control reload | `ControlCenter.shared.reloadControls(ofKind:)` | | 18 | W:192-198; doc: "Changes in your app's state may affect a control's state. When this happens, you can tell ControlCenter to reload the template" |
| Live Activity buttons | `LiveActivityIntent` (app process) | ActivityKit views | 17 | AIN:253-257 |

</div>


Not available, by the SDK: text fields, scrolling, gestures, sliders in widgets (only `Button` and `Toggle` take intents in `_AppIntents_SwiftUI`). A control's `kind` is a string fixed at compile time (doc(AppIntentControlConfiguration): "Every control has a unique `kind`, a string that you choose"), so a user's Python cannot add new control kinds; it can only fill configurable ones (s8).

## 2. The design in one paragraph

An interaction is an **action** declared in Python. An action has up to two parts: **state ops**, a small closed set of JSON edits (`toggle`, `add`, `cycle`, ...) that Swift applies to the widget's state in the widget extension in milliseconds, with no Python; and a **Python handler**, the frozen `handler(state, args) -> state`, which runs in the app. The renderer reads state at display time through **state references** (`Text.state`, a Toggle's `is_on=ui.State(key)`, `When("state.<key>", ...)`), so an ops-only action redraws the widget without Python on any iOS from 18. A handler action runs in the app in the background on iOS 27+ (`allowedExecutionTargets = [.main]`), and on 18-26 either opens the app through a signed deep link or queues for the next app run, as the author chooses. Counter, habit check-off, paging and switches need ops only, so the common cases are instant and Python-free on every supported OS.

## 3. Python API (1.1)

### 3.1 Already in v1, frozen (names review, rows K)

`ui.Button(action, *label, args=None)`, `ui.Toggle(is_on, action, *label, args=None)`, `ui.Link(url, *label)`, `Node.widget_url(url)`, `Node.invalidatable_content()` (review rename from `invalidatable`), `ui.When(env, value, *then, otherwise=())`, `Widget.action(name, timeout=DEFAULT_ACTION_TIMEOUT)` as a decorator for `handler(state, args) -> state`, `Widget.run_action(name, state, args=None)`, `Widget.render`, `RenderContext.state`, `MAX_ACTION_TIMEOUT = 5.0`, `DEFAULT_ACTION_TIMEOUT = 2.0`. Nothing below renames or changes any of them; every 1.1 addition is a new name or a new keyword with a default (L4 s8: additive within a major).

### 3.2 New in 1.1

```python
import pywidget_ui as ui

w = ui.Widget("water", name="Water", families=["systemSmall", "accessoryCircular"])

# Ops-only action: no handler, runs in the widget extension, any iOS >= 18.
w.state_action("drink", ui.Op.add("glasses", 1, max=12))
w.state_action("reset", ui.Op.set("glasses", 0))

# Handler action with optimistic ops: ops apply at once in the extension;
# the handler runs in the app (s4) and its return value replaces the state.
@w.action("log", ops=[ui.Op.add("glasses", 1, max=12)], fallback="queue")
def log(state, args):
    state["history"] = (state.get("history", []) + [args["at"]])[-30:]
    return state

# Paging: registers ops-only actions "page.next" and "page.prev" (cycle mod count).
w.pager("page", count=3)

# Input that a widget cannot take: the tap opens a native sheet in the app,
# then runs the handler with args["text"].
@w.action("note", input=ui.Input.text("Note", placeholder="What happened?"))
def note(state, args):
    state["last_note"] = args["text"][:200]
    return state

@w.render
def render(ctx):
    return ui.VStack(
        ui.Text.state("glasses", fallback=str(ctx.state.get("glasses", 0))),
        ui.Button("drink", ui.Image.symbol("plus.circle.fill")),
        ui.Toggle(ui.State("reminders_on"), "reminders", ui.Text("Remind")),
    ).invalidatable_content()

w.state_action("reminders", ui.Op.toggle("reminders_on"))
```


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3.2 New in 1.1, scrolls sideways" style="--tw:960px" markdown="1">

| Name (new) | Meaning | Serializes to |
|---|---|---|
| `Widget.state_action(name, *ops, args_schema=None)` | Register an action that is ops only. `ops` non-empty. | `actions[name] = {"ops": [...]}` |
| `Widget.action(..., ops=(), fallback="open_app", input=None)` | Three new keywords on the frozen decorator, all defaulted. `fallback` in `"open_app"`, `"queue"`: what iOS 18-26 does (s4.2). `input` see s7.3. | `actions[name].ops`, `.fallback`, `.input` |
| `Widget.pager(key="page", count)` | Sugar: `state_action(key + ".next", Op.cycle(key, count, 1))` and `.prev` with `-1`. | two actions |
| `ui.Op.set(key, value)` | `state[key] = value` (JSON scalar or list of scalars) | `{"op": "set", "key", "value"}` |
| `ui.Op.set_arg(key, arg)` | `state[key] = args[arg]` (one action, many buttons: "select item 3") | `{"op": "set_arg", "key", "arg"}` |
| `ui.Op.toggle(key)` | bool flip; missing counts as false | `{"op": "toggle", "key"}` |
| `ui.Op.add(key, by, min=None, max=None)` | numeric add, clamped; missing counts as 0 | `{"op": "add", "key", "by", "min", "max"}` |
| `ui.Op.cycle(key, count, by=1)` | `(state[key] + by) mod count`; missing counts as 0 | `{"op": "cycle", "key", "count", "by"}` |
| `ui.Op.toggle_member(key, arg, max_len=366)` | list-as-set: add `args[arg]` if absent, else remove; oldest dropped past `max_len` | `{"op": "toggle_member", "key", "arg", "max_len"}` |
| `ui.Op.clear(key)` | delete `key` | `{"op": "clear", "key"}` |
| `ui.State(key, contains=None)` | A state reference, accepted as `Toggle`'s `is_on`. True when `state[key] is True`, or, with `contains`, when the list `state[key]` contains that value (habit days). | `p.isOn` = the value at render time (the v1 fallback) **and** `p.isOnState = {"key", "contains"}` |
| `ui.Text.state(key, format=None, fallback="")` | Text that shows `state[key]` at display time; `format` as `Text`'s number format | `content = {"kind": "state", "key", "format", "fallback"}` |
| `ui.When("state.<key>", value, ...)` | No new name: a new env family. Matches when `state[key] == value`, or, if `state[key]` is a list, when it contains `value`. | `When` with `env: "state.<key>"` |
| `ui.Input.text(prompt, placeholder="", max_len=200)`, `.number(prompt, min, max)`, `.choice(prompt, options)` | Declares the sheet the app shows before the handler | `actions[name].input` |
| `ui.Control(...)`, `Widget.control(...)` | s8 | `controls[...]` in the document |

</div>


Rules the DSL enforces at the caller's line (so the IDE points at it): keys are top-level strings matching `[a-z_][a-z0-9_]{0,31}`; values are JSON scalars or lists of scalars; an action has ops, a handler, or both; `args` under 1 KiB serialized (L4 s6); `ops` at most 8 per action; a `Button`/`Toggle` whose `action` is not registered on its widget is an error, not a dead button.

**Handler contract** (unchanged signature, defined semantics): the handler receives the state **after** this tap's ops, and `args` from the node plus, for `input` actions, the person's input. Returning a dict replaces the state; returning `None` leaves it as it is (friendlier than the stub's annotation; the stub widens to `Optional`). The runner then calls `render` with the new state and writes the tree, as in a widget run. Time limit: the action's `timeout` (default 2.0 s, max 5.0 s), enforced by the contract's stop <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> (s10).

## 4. Intent model

### 4.1 Intent types (Swift, in the shared framework; names are permanent once 1.1 ships)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 4.1 Intent types (Swift, in the shared framework; names are permanent once 1.1…, scrolls sideways" style="--tw:1520px" markdown="1">

| Type | Conforms to | Compiled into | `allowedExecutionTargets` (27+) | Parameters | Does |
|---|---|---|---|---|---|
| `WidgetOpsIntent` | `AppIntent` (`isDiscoverable = false`) | widget extension only | `[.widgetKitExtension]` | `widgetID: String`, `action: String`, `args: String` (JSON) | Applies the action's ops to `state.json` (s5), appends a queue row if the action has a handler and `fallback == "queue"`, returns. No Python. |
| `WidgetActionIntent` | `AppIntent`, `supportedModes = .background` | app and extension | `[.main]` | same | iOS 27+ only (`@available`). Applies ops, runs the handler through the bridge, writes `tree.json` and `state.json`, returns. |
| `ControlToggleIntent` | `SetValueIntent` (`ValueType == Bool`) | widget extension only | `[.widgetKitExtension]` | `control: ControlEntity`, `value: Bool` | `Op.set(key, value)`; handler routing as widget actions |
| `ControlActionIntent` | `AppIntent` | as `WidgetActionIntent` | `[.main]` | `control: ControlEntity` | Runs a control's action or script on 27+ |
| `OpenControlActionIntent` | `OpenIntent` | app and extension | `[.main]` | `target: ControlEntity` | 18-26 fallback for controls: opens the app and runs it there (W:1295 takes an `OpenIntent`) |

</div>


The renderer builds the intent from `actions[action]` and the node's `args`, as L4 s6 already says; it chooses the type:

```
if action has no handler:               WidgetOpsIntent
elif iOS >= 27:                          WidgetActionIntent
elif action.fallback == "queue":         WidgetOpsIntent (ops now, handler queued)
else ("open_app", the default):          the node is drawn as a Link to the signed action URL (s7)
```

`WidgetOpsIntent` is deliberately not in the app target, so on 18-26 the "any available target" rule of s0 can only pick the extension. On 27 it carries `[.widgetKitExtension]` as well, so adding it to a shared framework later cannot move it.

### 4.2 One tap, step by step

**Ops only (any iOS):** system flips a Toggle's look at once [recalled] and dims `invalidatable_content` views (S:2785) -> `WidgetOpsIntent.perform()` in the extension: lock, read, apply ops, `rev += 1`, write, unlock (s5) -> return -> the system reloads that widget's timeline after the intent [recalled; L2 s1 row "Interactive-widget intent"; G-L5-2] -> `getTimeline` reads `tree.json` (unchanged) and `state.json` (new) -> the renderer resolves state references. Target: tap to redraw under 300 ms on device [ours; G-L5-2].

**Handler, iOS 27+:** as above, but `WidgetActionIntent.perform()` runs in the app, launched in the background if it is not running (`.main`, AIN:3577; the background launch itself is G-L5-3). It applies the ops, then queues a bridge run: `RunRequest(context: .widget, budget_s: timeout, widget: {id, state, action: {name, args, tap_id}})` (contract reservation R7, s13). On `ok` it writes the returned document's `state` to `state.json` (rev check, s5.3) and its tree to `tree.json`, both before `perform()` returns, so the system's post-intent reload sees them. Trigger name in the run log: `widget_action`.

**Handler, iOS 18-26, `fallback="open_app"` (default):** the Button or Toggle is drawn as a `Link` to `pywidget://a/<widget>/<action>?args=...&t=...&sig=...` (s7). Tapping opens PyWidget; the app verifies the signature, applies the ops, runs the handler in the foreground (trigger `deep_link`), writes, calls `reloadTimelines(ofKind:)` (foreground: exempt [recalled], L2 s1) and shows a one-line result banner over the IDE, with "Back" to return. Visible, but correct at once.

**Handler, iOS 18-26, `fallback="queue"`:** `WidgetOpsIntent` applies the ops and appends `{tap_id, ts, action, args, rev_after}` to `widgets/<id>/actions.jsonl`, and touches `wants-run`. The renderer shows the `pending` mark (s9) while the queue is non-empty. The app drains the queue, oldest first, at the start of the next T1, T2 or T3 batch (ADR-007 5.1), each handler run on the then-current state. Good for logging and syncing; wrong for anything the person expects to see change now.

*Amended 2026-10-26 (review B1, B2):* every handler path, this one, the 27+ intent and the `open_app` link, first commits the ops and a `pending` row inside `state.json` in one write, before any Python runs; there is no `actions.jsonl`. Drain, order and failure: s5.6.

### 4.3 Why not run the handler in the extension

ADR-007 chose option (b): the extension links no Python, and its memory ceiling is unmeasured (about 30 MB [recalled]; spike: 7.7 MB before Python, 26.9 MB after one heavy run in the same process, ADR-007 s2). Ops cover what a tap must do at once without changing that decision.

## 5. State model

### 5.0 Amended after review (Idris, 2026-10-26)

Odalys's independent review ([`pywidget/docs/reviews/L5-state-review-odalys.md`](l5-state-review-odalys.html), 508b6e4b; replies in the same file) found that the queue as first written could lose a tap and run a handler twice (B1), and that a tap's ops and its queue row were two commits (B2). Amended here: the queue lives inside `state.json` as `pending`, written in the same commit as the tap's ops, before any Python runs, on every handler path; `actions.jsonl` is dropped. Struck text is kept with its date. Changes to the chair's s15 conditions S1, S6 and S7 and to ADR-007's amendment items 1, 4 and 6 wait on Ines's ruling; until then this section is the author's proposal and no 1.1 state code starts (chair S7).

### 5.1 Files (App Group, extending ADR-007 5.2)


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 5.1 Files (App Group, extending ADR-007 5.2), scrolls sideways" style="--tw:1194px" markdown="1">

| File | Writer | Reader | Content |
|---|---|---|---|
| `widgets/<id>/state.json` | app (handlers, runs, Shortcuts) **and** extension (ops) | both | `pywidget.state/1`, layout below |
| `widgets/<id>/state.lock` | both (`flock`); **created by the app only** (2026-10-26, review S2) | | empty; exists so the lock never touches the data file |
| ~~`widgets/<id>/actions.jsonl`~~ | ~~extension (append)~~ | ~~app (drain, then truncate under the lock)~~ | ~~queued handler taps (s4.2)~~ struck 2026-10-26 (review B1, B2, S1): rows live in `state.json` `pending` |
| `widgets/<id>/failed.jsonl` | app (temp file plus `rename`) | app (IDE log) | rows whose handler failed 3 times (s5.6; review S6), kept until the person clears them |
| `widgets/.trash/` | app | | folders being deleted (s5.7; review S2). Not a widget id |
| `widgets/<id>/tree.json` | app | extension | unchanged from v1; 1.1 adds ~~`state_rev` (the rev it was rendered from)~~ `state_at: [epoch, rev]` (2026-10-26, review S8) |
| `controls/index.json` | app (T1 sweep) | extension (entity queries, value providers) | declared controls (s8) |
| `secrets/link.key` | app, once | extension (to sign), app (to verify) | 32 random bytes (s7.2) |

</div>


~~`{"schema": "pywidget.state/1", "rev": 41, "scopes": {"shared": {...}}}`~~ (first layout, replaced 2026-10-26, review B1, B2, S4, S8). `pywidget.state/1` as of 2026-10-26:

```json
{"schema": "pywidget.state/1",
 "epoch": "0E6B4C1A-...",
 "rev": 41,
 "next_seq": 18,
 "scopes": {"shared": {"done": ["water"]}},
 "pending": [
   {"seq": 17, "tap_id": "...", "ts": "2026-11-20T08:01:12Z", "action": "log",
    "args": {"at": "08:01"}, "path": "queue", "rev_after": 41, "attempts": 0}
 ],
 "ops_log": [{"rev": 41, "tap_id": "...", "ops": [{"op": "add", "key": "n", "by": 1}]}]}
```

- `epoch`: a UUID set when the file is created (fresh state, `state.bad` reset, delete and re-create of the same id). Every comparison is on `(epoch, rev)`, never `rev` alone (review S8).
- `rev`: +1 on every commit. `next_seq`: the next row's `seq`, assigned under the lock, strictly increasing per file.
- `pending`: one row per handler tap not yet handled, oldest first. `path` is `queue` (18-26 `fallback="queue"`), `intent` (27+) or `link` (18-26 `open_app`). Rows with `path` `intent` or `link` also carry `before: {key: old value, or {"absent": true}}` for the keys the tap's ops touched, so a failed live handler can restore them (s5.3). `attempts` counts failed handler runs (s5.6).
- `ops_log`: the op lists of the last 16 commits that were ops, with their `rev`, so a handler result can be rebased without running the handler twice (s5.3; review S4).
- The `pending` env of s9 is true while `pending` is non-empty; it no longer reads `actions.jsonl` (2026-10-26).

`scopes.shared` is what Python sees as `state`. Every placed instance of one widget script shares it: a counter on two Home Screen pages shows the same count ~~[ours]~~ after its next reload (2026-10-26, review N5: the system reloads the tapped widget [recalled]; whether other instances of the kind follow is a G-L5-2 row; after an app-side commit the write path calls `reloadTimelines(ofKind:)`). The `scopes` level exists only so per-instance state (keyed by a widget configuration id) can come later without a format change; 1.1 reads and writes `shared` only.

### 5.2 Writes and the lock

This is a change to ADR-007 5.2's rule "everything the extension reads is a file written atomically by the app": in 1.1 the extension also writes `state.json` ~~and appends to `actions.jsonl`~~ (struck 2026-10-26, review S1: an append is not a `rename`; the extension writes `state.json` only). Every write: `flock(state.lock, LOCK_EX)`, read `state.json`, apply, write a temp file in the same directory, `fsync` it (added 2026-10-26, review N1), `rename`, unlock. A reader that does not lock still sees a whole file (rename is atomic). Lock hold time is the read, apply, temp write and `rename` ~~(microseconds)~~: milliseconds. Measured by Odalys on this Mac (macOS 27.0.1, APFS, Python, host only, 64 KiB file, n=500): median 0.45 ms, p99 2.2 ms, max 3.9 ms; with `fsync` median 0.54 ms, p99 2.3 ms, max 5.6 ms. Inside the 200 ms bound; the device p99, and the time at the 256 KiB <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> that `pending` makes possible, are G-L5-5 rows, not assumed (2026-10-26, review N1). Never held across a Python run. Whether `flock` works across the app and extension in an App Group container is [recalled: yes] and is gate G-L5-5; the fallback is `NSFileCoordinator` (not pre-approved, chair S7).

### 5.3 Handler runs and concurrent taps

~~A handler run reads state at `rev = r`, runs unlocked (up to 5 s), then locks: if `rev` is still `r`, write its result as `r + 1`; if not (a tap landed meanwhile), re-apply the handler once to the new state (it is a pure function of state and args by contract); if `rev` moved again, keep the newer state and log outcome `conflict` [ours]. On handler error, timeout or `stuck`: if `rev` is still the post-ops value, restore the pre-tap state (the queue row or intent kept it), so a failed Toggle snaps back as L4 s6 promised; otherwise keep the state and badge the widget (ADR-007 7.1 row 4).~~ (Struck 2026-10-26, review S4 and B2: nothing enforced purity, a second run repeats side effects, `conflict` lost the result, and no row kept the pre-tap values.)

As of 2026-10-26: a handler run reads state at `(epoch, r)`, runs unlocked (up to its `timeout`), then takes the lock and makes **one** commit:
- **ok, `(epoch, rev)` still `(epoch, r)`:** write the handler's state (unchanged if it returns `None`, R12), remove its row from `pending`.
- **ok, `rev` moved to r':** if every commit r+1..r' is in `ops_log` (taps and "Set Widget State" are ops), write the handler's state with those ops re-applied in rev order, and remove its row. The handler is never run twice. If any commit in the window is not ops (an in-app Python write, s5.5) or r is older than the ring, the row is not committed: it moves to `failed.jsonl` with reason `conflict` (s5.6), shown, not lost. One interpreter runs one handler at a time, so two handler commits never overlap; this branch is the 17-taps-during-one-run case.
- **error, timeout, `interrupted`, on a live row (`path` `intent` or `link`):** if `(epoch, rev)` is still the row's `(epoch, rev_after)`, restore each key in `before` and remove the row, so a failed Toggle snaps back as L4 s6 promised; otherwise keep the state, remove the row, badge the widget (ADR-007 7.1 row 4).
- **error or timeout on a `queue` row:** s5.6.
- **`stuck`, or the process dies:** nothing is committed; the row stays in `pending`.

This makes ops "optimistic" in the plain sense: shown at once, undone if a live handler refuses them at once. A queued handler that refuses hours later does not undo what the person saw succeed (s5.6).

### 5.4 Caps [ours]

`state.json` at most 64 KiB (read on every `getTimeline`); a write over the cap fails the action with `StateTooLarge`. `actions.jsonl` at most 100 rows; ~~older rows dropped with a log line~~ (struck 2026-10-26, chair note s15 S6: at 100 rows a tap that would queue is refused, never dropped). Keys and values as s3.2.

Amended 2026-10-26 (review B2, S6): the 64 KiB cap applies to `scopes`; `pending` is at most 100 rows, `args` at most 1 KiB per row; the whole file at most 256 KiB. The 100-row check and the size check run under the lock, before the ops apply; a tap that would pass either is refused (ops not applied, badge "Open PyWidget to catch up"). Rows in `failed.jsonl` do not count, so a handler that always fails cannot fill the queue.

### 5.5 Who else touches state

- Python in the app (console or IDE) can read and write a widget's state through a C2-style module, `pywidget.widgets.state(id)` (name for Pernille; open Q4). Added 2026-10-26 (review S9): the module calls the Swift write path through the bridge; Python never opens `state.json`. A write is a compare-and-swap on `(epoch, rev)`; a mismatch raises in the script. It is not an op, so a handler commit whose window holds one goes to `failed` (s5.3).
- Shortcuts: L9's "Get Widget State" adds `state` to its JSON; a new "Set Widget State" (key, value) applies `Op.set` under the lock, through the same Swift type in whichever process runs it (s0; added 2026-10-26, review S9). L9's slots (`Set Widget Data`) stay separate: slots are inputs a script reads, state is what the widget's actions change.
- Deleting a widget script deletes its `widgets/<id>/` folder (how: s5.7, review S2). Renaming a widget's `id` starts a fresh state (the IDE warns before save).

### 5.6 Write-ahead and the queue (new 2026-10-26, review B1, B2, S6, S7, N4)

- **Write ahead, every path.** A tap on an action with a handler makes one locked commit before any Python runs: the ops result and its `pending` row, in one `rename`. Extension (`queue`, 18-26), app intent (`intent`, 27+) and app link (`link`, 18-26 `open_app`) all do this through the one write path. A process killed after it leaves the row; s11's "the handler runs at the next T1" now follows from the row.
- **Drain.** At the start of a T1, T2 or T3 batch the app first turns any `intent` or `link` row whose process is gone into a queue row (drops `before`, one commit), then handles rows oldest `seq` first. Each row's handler commit removes that row (s5.3), so a tap appended during the drain is a new row that stays, and a <span title="A test written in advance. If it fires, we drop the idea.">kill</span> mid-drain re-runs nothing that committed.
- **Batch rule.** Each row counts against ADR-007 5.1 with the same `elapsed + budget_s + 5.0 <= 25` test. Per widget, its rows run first; an action run returns state and tree (R7), so the last successful handler's tree is that widget's render in the batch. Widgets without rows keep their place. Rows left over stay in `pending` (`deferred`).
- **Failure of a queued row.** `attempts += 1` in the same commit; its ops stand. At 3 the row moves to `failed.jsonl` (with the traceback) and leaves `pending`, the widget badges, and the IDE log shows it. Never deleted by the app; the person clears it or deletes the widget.
- **Order.** Within a batch, by `seq`. A live 27+ tap does not wait behind older queued rows; after a device upgrade to 27 with rows still pending, order across the upgrade is not kept.

### 5.7 Write-path rules (new 2026-10-26, review S2, S3, S5, N2, N3, N6)

One Swift type in the shared framework (chair S3) carries all of these:
- `flock`, never `fcntl` record locks. One in-process serial gate in front of `flock`; the type is not reentrant and says so.
- Extension wait: `LOCK_NB` retry every 5 ms, at most 40 tries (200 ms, chair S4); the wait is logged per tap.
- Only the app creates `widgets/<id>/` and `state.lock`. The extension opens `state.lock` without `O_CREAT`; missing means the tap fails visibly. After every `flock`, compare `fstat` of the descriptor with `stat` of the path (inode, `st_nlink`); on a mismatch release and retry inside the bound.
- Delete: under the lock, `rename` `widgets/<id>/` to `widgets/.trash/<id>-<uuid>`, then remove it.
- App side: every locked section runs inside a background-time assertion [recalled: `beginBackgroundTask` or `ProcessInfo.performExpiringActivity`]; no lock after the T2 expiration handler fires or after `setTaskCompleted`; the wait is bounded and off the main actor. Reason: a suspended app holding the lock is killed [recalled: 0xdead10cc].
- Data protection: every temp file, `state.json`, `state.lock` and `failed.jsonl` get complete-until-first-user-authentication [recalled: `NSFileProtectionCompleteUntilFirstUserAuthentication`], set on each temp file, since `rename` keeps the temp file's class.
- Unreadable state (chair S5), amended: copy aside as `state.bad.<ts>.json` (last 3 kept), then one `rename` of a fresh file (new `epoch`) over `state.json`, so a reader never sees no file.

### 5.8 Gate additions (2026-10-26, review S3, S5, S10, N1, N5)

- G-L5-5 adds a kill test: two writers plus a drainer, `SIGKILL` at random points (after the temp write, before the `rename`, mid-drain, during folder delete), 1,000 kills. Invariants: `state.json` always parses; `(epoch, rev)` never decreases within an epoch; every `tap_id` ends in exactly one of handled, pending, failed, refused-and-logged; no handler runs twice for one `tap_id`. Also the lock-to-rename time at 64 and 256 KiB. One run on a device before 1.1 ships (the Simulator proves macOS `flock` only).
- G-L5-7 (new, device): suspend the app inside a locked section; record what iOS does.
- G-L5-4 adds: toggle a control and tap a widget on a locked device.
- G-L5-2 adds: after an extension commit, do other placed instances of the kind reload.

## 6. Paging

`w.pager("page", count=n)` plus `ui.Pages("page", p0, p1, ...)`, which serializes as a `Group` of `When("state.page", i, p_i)` with `otherwise` = `p0`, so an out-of-range page (data shrank) shows the first page instead of nothing. All pages are in the tree, so the whole widget must fit `MAX_WIDGET_TREE_BYTES` (512 KiB, contract s7); a pager over 10 pages draws a lint warning [ours]. Next/prev are ops-only actions: instant, no Python, every iOS. Python re-renders the pages whenever the widget runs; `state.page` survives runs.

## 7. Deep links

### 7.1 URL grammar (custom scheme; no universal links, which need a server)


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 7.1 URL grammar (custom scheme; no universal links, which need a server), scrolls sideways" data-n="3" style="--tw:706px" markdown="1">

| URL | Meaning | Signed |
|---|---|---|
| `pywidget://w/<id>` | open the widget's script in the editor | no |
| `pywidget://w/<id>/run` | open the console and offer Run (one tap; never runs unasked) | no |
| `pywidget://a/<id>/<action>?args=<b64url JSON>&t=<unix>&sig=<b64url>` | run an action now (s4.2 open_app) | **yes** |
| `pywidget://i/<id>/<action>?args=...&t=...&sig=...` | show the action's input sheet, then run it (s7.3) | **yes** |
| `pywidget://s/` | open a script (Shortcuts, controls) | no |

</div>


A `Link` or `widget_url` to `https://` opens the browser as SwiftUI does. A `Link` in `systemSmall` is not its own tap target [recalled]: the whole widget takes `widget_url` (lint in names review row `Link`).

### 7.2 Why action links are signed

Any web page or app can open a `pywidget://` URL. Unsigned, `pywidget://a/journal/clear` on a web page would run the person's own handler with an attacker's args. So the renderer signs action URLs: `sig = HMAC-SHA256(link.key, "a/<id>/<action>?args=...&t=...")`, truncated to 16 bytes. The app verifies and refuses anything unsigned or older than 7 days (`t`), with "This link didn't come from your widget." Routes that only open a screen are unsigned and never run code. CryptoKit's HMAC is in both processes; the key never leaves the App Group [ours].

### 7.3 Input actions

Widgets take no text (s1). An action declared with `input=` is always drawn as a signed `pywidget://i/...` link, on every iOS: the app shows a native sheet built from the declaration (text, number, or choice), then runs the handler with `args` plus `{"text": ...}` or `{"value": ...}`, in the foreground. This is the brief's "deep links into in-app screens for complex input", without letting Python draw arbitrary app UI.

## 8. Control Center, Lock Screen and Action button controls

Three fixed control kinds ship in the widget extension; the person adds any of them as often as they like and picks what each one does in its configuration.


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 8. Control Center, Lock Screen and Action button controls, scrolls sideways" style="--tw:1330px" markdown="1">

| Kind (permanent strings) | Template | Configuration | Value | Action |
|---|---|---|---|---|
| `com.pywidget.control.script` | `ControlWidgetButton` | `script: ScriptEntity` (L9 s2.2) | none | 27+: `ControlActionIntent` runs the script in the app in the background (`budget_s` 20, as T4); 18-26: `OpenControlActionIntent` opens the app and runs it in the console |
| `com.pywidget.control.toggle` | `ControlWidgetToggle` | `control: ControlEntity` (toggles declared in Python) | `state[key]` read by the value provider in the extension | `ControlToggleIntent`: `Op.set(key, value)`; the control's handler, if any, routed as s4.1 |
| `com.pywidget.control.action` | `ControlWidgetButton` | `control: ControlEntity` (buttons declared in Python) | none | ops in the extension; handler 27+ in the app, 18-26 opens the app |

</div>


Python:

```python
w.control("away", title="Away mode", kind="toggle", key="away",
          symbol="house", symbol_on="figure.walk", value_labels=("Home", "Away"))
w.control("bump", title="Add a glass", kind="button", action="drink", symbol="drop.fill")
```

A control shows a title, an SF Symbol and a value label, nothing else (W:1182-1199, W:1277-1295); `title` at most 30 characters, `value_labels` at most 12 [ours; real truncation is G-L5-6]. Declared controls are collected into `controls/index.json` at every T1 sweep; a control whose declaration disappeared shows "Removed in PyWidget" and does nothing. After any state write that a control reads, the writer calls `ControlCenter.shared.reloadControls(ofKind: "com.pywidget.control.toggle")` (W:198).

PROPOSAL-002 row 2 calls the Run Script control "an App Intent we already build". On 18-26 that intent's process is not ours to pin once its type is linked into the extension (s0 item 1), so the 18-26 control opens the app; G-L5-6 measures whether the existing app-only `Run Script` intent can be used directly from a control without being linked into the extension (if it can, the 18-26 control runs in the background too).

## 9. What the renderer resolves (1.1)

- `content.kind == "state"`: format `state[key]` with `format`; a missing key or a non-scalar shows `fallback`.
- `p.isOnState`: `isOn = (state[key] == true)`, or with `contains`, list membership; missing key: `p.isOn`.
- `When` with `env` `state.<key>`: as s3.2. New computed env `pending` (true while ~~`actions.jsonl` has rows for this widget~~ `state.json` `pending` is non-empty, 2026-10-26, s5.1), beside v1's computed `stale` (L4 s8).
- Button/Toggle: intent per s4.1, or a signed `Link` (s4.2, s7.3).
- Lock Screen accessory families: Buttons and Toggles are drawn but inert there [recalled; G-L5-4]; the DSL lints `Button` in `accessory*` families until G-L5-4 says otherwise.

## 10. Limits


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: 10. Limits, scrolls sideways" style="--tw:960px" markdown="1">

| Limit | Value | Source |
|---|---|---|
| Interactive Button/Toggle in widgets | iOS 17+ (our floor 18) | AIS:184-186, 235-237 |
| Choosing the process for an intent | iOS 27+ only (`allowedExecutionTargets`) | AIN:3111-3112, 3570-3583 |
| `openAppWhenRun` in an extension | error; deprecated iOS 26 | doc(AppIntent.openAppWhenRun); AIN:3100-3105 |
| Background App Intent run time | **30 s** "unless you use the methods of this protocol to extend that runtime" (LongRunningIntent, iOS 27) | doc(LongRunningIntent): "In iOS, iPadOS, tvOS, visionOS, and watchOS, the system gives tasks 30 seconds to run in the background unless you use the methods of this protocol to extend that runtime." Upgrades ADR-007 T3's "about 30 s [recalled]" to read. |
| Widget intent `perform()` time in the extension | no published number; "keep it short" | [recalled] WWDC23 "Bring widgets to life"; ours: ops apply in under 10 ms |
| Python handler time | default 2.0 s, max 5.0 s; worst case `timeout + 5.0` s with the stop ladder | package constants (names review row K); contract s5; ADR-007 batch rule |
| Handler action on 27+ end to end | app launch (spike: 291 ms to probe, Simulator Debug) + Py init 13 ms + handler <= 5 s + ladder <= 5 s, well inside 30 s | ADR-007 s2; G-L5-3 on device |
| Widget extension memory | about 30 MB [recalled]; the extension runs no Python under (b) | ADR-007 s2, s6 |
| App Intents extension memory | unknown [recalled: tighter than the app]; we ship none | L9 s2.3 |
| Reload after an interactive intent | the system reloads the widget after `perform()`; [recalled] not charged to the daily budget | L2 s1; G-L5-2 |
| Daily reload budget | 40-70 a day for a frequently viewed widget [recalled] | L2 s1 |
| Control reload | `reloadControls(ofKind:)`, `reloadAllControls()` | W:198; doc(ControlCenter) |
| Controls: what they draw | title, symbol, value label; toggle actions are `SetValueIntent<Bool>` | W:1198-1199, W:1295 |
| `RunSystemShortcutIntent` | iOS 27; person-configured; widget Buttons only | AIN:3633-3642; doc(RunSystemShortcutIntent) |
| View tree | 512 KiB per document | contract s7 `MAX_WIDGET_TREE_BYTES` |
| Action args | under 1 KiB serialized | L4 s6 [ours] |
| State | 64 KiB per widget; keys `[a-z_][a-z0-9_]{0,31}`; scalars or lists of scalars | [ours] s5.4 |
| Queue | 100 taps per widget | [ours] s5.4 |
| Ops per action | 8 | [ours] |
| Action link age | 7 days | [ours] s7.2 |

</div>


## 11. Failure behaviour


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: 11. Failure behaviour, scrolls sideways" style="--tw:958px" markdown="1">

| Case | Shown | State |
|---|---|---|
| Ops apply fails (state over cap, bad key from an old tree) | error badge on the last good render (ADR-007 7.1 row 4); IDE log line | unchanged |
| Handler `error` | badge; traceback in the widget's run log in the IDE | restored if no later tap (s5.3) |
| Handler `timeout` / `interrupted` | badge "Took too long" | restored as above |
| Interpreter `stuck` (contract s5) | as ADR-007 5.3: refuse with `stuck`; widget keeps its last good render with the badge | ops stand; handler not run; queue row kept |
| 27+ background launch refused or killed | `killed` (ADR-007 7.2); ~~queue row written so the handler runs at the next T1~~ the `pending` row was written before the handler ran, so it runs at the next batch (2026-10-26, review B2; s5.6) | ops stand |
| Invalid or old action link | app banner "This link didn't come from your widget." | unchanged |
| Action name not in the current tree's `actions` (script changed since render) | nothing runs; reload | unchanged |

</div>


ADR-007 7.2 outcomes gain `conflict` (s5.3). <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G13</span> in L4 s14 stays as ruled in the names review: no error node; the badge comes from document-level status.

## 12. Three demo widgets (brief deliverable)

### 12.1 Habit check-off (ops only; every iOS)

```python
w = ui.Widget("stretch", name="Stretch", families=["systemSmall"])
w.state_action("check", ui.Op.toggle_member("done", arg="day"))

@w.render
def render(ctx):
    local = ctx.date.astimezone()          # entry date in the device's zone
    day = local.date().isoformat()
    week = [(local - dt.timedelta(days=i)).date().isoformat() for i in range(6, -1, -1)]
    return ui.VStack(
        ui.Text("Stretch").font(ui.Font.text_style("headline")),
        ui.HStack(*[ui.When("state.done", d, ui.Circle(fill=ui.Color.semantic("accent")),
                            otherwise=[ui.Circle(stroke=ui.Color.semantic("secondary"))]).frame(width=12, height=12)
                    for d in week], spacing=4),
        ui.Toggle(ui.State("done", contains=day), "check", ui.Text("Done today"), args={"day": day}),
    )
```

Writing this demo is what added `contains` to `ui.State` (s3.2): "today is in `done`" is not a plain key reference. Timeline: one entry per local midnight for 7 days (`Widget.timeline`, once L4 G18 is settled), each entry carrying its own `day` in the Toggle's args, so "today" moves without a run. Checks: tap at 23:59:59 and 00:00:01 toggle different days; seven taps leave the dots matching `done`; 367 distinct days keep 366.

### 12.2 Paginated list (ops only; every iOS)

Top 5 items per page, up to 3 pages, from a list the script fetched at its last run (for example open GitHub issues for a repo, premade 12's data source). `n = ceil(len(items) / 5)`; `w.pager("page", count=n)`; two Buttons `page.prev`, `page.next` with chevron symbols; `ui.Pages("page", *pages)`, each page carrying its own footer `Text("2 of 3")` (`state.page` is 0-based, so the footer is written per page, not formatted from state). Checks: next from the last page returns to the first; prev from the first goes to the last; a run that finds 4 items renders one page and no pager buttons; a run that shrinks from 3 pages to 1 while `state.page == 2` shows page 1 (`otherwise`), and the next tap cycles mod the new count; the tree for 3 pages of 5 rows stays under 32 KiB.

### 12.3 A toggle that a Shortcut reads (ops plus Shortcuts; every iOS) and runs (27+)

"Away mode": `w.state_action("away", ui.Op.toggle("away"))`, a Toggle bound to `ui.State("away")`, and the same as a control (`w.control("away", kind="toggle", key="away", ...)`). A personal automation in Shortcuts (for example "When I leave home") runs **Get Widget State** (L9, with the `state` key added, s5.5) and branches on `away` to turn lights off or skip. On iOS 27 the widget can also carry a "Run now" Button built on `RunSystemShortcutIntent`, whose shortcut the person chooses in the widget's configuration; Python cannot choose it (AIN:3633-3642, doc). Checks: the toggle flips in the widget and in Control Center together (one `state.json`; `reloadControls` after the write); the Shortcut reads the value written 1 s earlier; the iOS 27 button does nothing until configured, and says so.

## 13. What v1 must reserve so 1.1 does not break it

Each row is cheap now and a breaking change later. Owners named; none of these is done by this task.


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: 13. What v1 must reserve so 1.1 does not break it, scrolls sideways" data-n="1" style="--tw:1005px" markdown="1">

| # | Reserve in v1 | Why | Owner |
|---|---|---|---|
| R1 | Renderer: a Text whose `content.kind` it does not know draws `content.fallback` if present, else empty | 1.1 `state` text on a v1 renderer degrades to the render-time value | Idris (renderer) |
| R2 | Renderer: an unknown `When` env renders `otherwise` | `state.*` and `pending` on v1 | Idris |
| R3 | Renderer: v1 draws `Button`/`Toggle` as their label (Toggle with its `isOn` snapshot), not interactive, and ignores unknown props (`isOnState`) | no interactive buttons in v1 (ADR-001), and 1.1 trees still draw | Idris |
| R4 | Schema: `actions.*` stops requiring `handler` (any of `handler`, `ops`); entries keep allowing extra keys | ops-only actions are valid v1-major documents | Idris (schema; after Pernille's rename pass lands) |
| R5 | Schema: `When.env` accepts the pattern `^state\.[a-z_][a-z0-9_]{0,31}$` and `pending`; Text `content` allows `{"kind": "state", ...}`; Button/Toggle `p` allow `isOnState` | v1 validators accept 1.1 documents (L4 s8 additive) | Idris |
| R6 | App Group: `widgets/<id>/state.json` with `schema`, `rev`, `scopes.shared`; `state.lock`; `actions.jsonl`; `controls/`; `secrets/` names held, nothing else written there. *Amended 2026-10-26 (review B1, B2, S2, S6, S8), proposal for the chair:* `state.json` fields `schema`, `epoch`, `rev`, `next_seq`, `scopes.shared`, `pending`, `ops_log` (s5.1); `state.lock`; `failed.jsonl`; `widgets/.trash/`; `controls/`; `secrets/` held; `actions.jsonl` released. Still doc only: v1 writes none of them | ADR-007 5.2 lists `state.json` (1.1) without a shape | Idris (ADR-007 amendment) |
| R7 | Contract: `WidgetRequest.action: {name, args, tap_id}?` (optional, absent in v1), and "the document always carries `state` in an action run" | handler runs need no new record kind: the new state rides in the `widget_tree` document | Pernille (contract v5) |
| R8 | Run log: `trigger` values `widget_action`, `control`, `deep_link`; outcome `conflict` | log schema does not change in 1.1 | Idris (ADR-007 7.5) |
| R9 | URL router: register `pywidget://` in v1; unknown routes open the library; any `a/` or `i/` route without a valid signature is refused | an old app must not run an action link | Idris |
| R10 | `secrets/link.key` created at first launch in v1 | 1.1 trees signed by the extension verify in the app without a migration step | Idris |
| R11 | Intent and entity type names and parameter names in s4.1 and s8 (`WidgetOpsIntent`, `WidgetActionIntent`, `ControlEntity`, the three control kinds) | the system stores intents in widget archives and control configurations; renaming orphans placed controls | Idris |
| R12 | Package: `RenderContext.state` is the `scopes.shared` dict, and the handler stub widens to `Optional` return | names review froze both names, not their semantics | Pernille |
| R13 | The renderer reads `state.json` (absent in v1: empty) at every `getTimeline` from v1 on | a 1.1 update need not change the timeline provider | Idris |

</div>


## 14. Gates (Simulator first, device where marked)

Additions after review (2026-10-26): s5.8 (G-L5-5 kill test and device run, new G-L5-7, G-L5-4 and G-L5-2 rows).


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: 14. Gates (Simulator first, device where marked), scrolls sideways" style="--tw:1044px" markdown="1">

| Gate | Question | How | Pass |
|---|---|---|---|
| G-L5-1 | Process of `perform()` for (a) extension-only intent, (b) shared intent without targets, (c) shared with `[.main]` on 27 | `os_log` of `ProcessInfo.processName` and bundle id in `perform()`; Simulator iOS 27.x, and iOS 18 or 26 if a runtime is installed | (a) extension; (c) app; (b) recorded as found |
| G-L5-2 | Tap to redraw time; does a reload follow `perform()` on its own | log timestamps in `perform()` and `getTimeline`; device for the budget question | redraw under 300 ms; reload without an explicit call |
| G-L5-3 | Does `[.main]` launch a not-running app in the background from a widget tap (27) | device; app swiped away; tap | handler runs; app not shown |
| G-L5-4 | Are Buttons and Toggles live in Lock Screen accessory families | device | recorded; lint follows |
| G-L5-5 | `flock` across app and extension in the App Group container | two-process test, Simulator | exclusive both ways |
| G-L5-6 | Can a control use the app-only `Run Script` intent; control title truncation | Simulator 18+ | recorded |

</div>


## 15. Open questions (for Ines unless named)

1. Chair: accept that in 1.1 the extension writes `state.json` and `actions.jsonl` (ADR-007 5.2 amendment), and the s4.1 routing. Without it, every interaction on 18-26 opens the app.
2. Chair: default `fallback` for handler actions on 18-26, `open_app` (mine: correct at once, visible) or `queue` (invisible, late).
3. Maren: the `pending` mark, the open-app result banner, the input sheet, and the "Removed in PyWidget" control state.
4. Pernille: the module name for reading and writing widget state from in-app Python (`pywidget.widgets.state(id)`), and R7, R12.
5. Wrenna: whether App Review reads signed `pywidget://` action links and Control Center script runs under 2.5.11 or 4.4 in any way the L6 rows do not already cover.
6. Per-instance state (a configurable widget placed twice with different settings): needs widget configuration parameters from Python, which is not in 1.1. `scopes` leaves room.
7. Live Activities with buttons: 1.2 at the earliest (ADR-001 row "Interactive widgets, Control Center controls, Live Activities"). `LiveActivityIntent` is the one documented app-process route on 18-26 (s0 item 4), legitimate only for a real Live Activity; it gets its own small schema then (L4 s6).

### Chair note (Ines), 2026-10-26 00:15 ET: items 1 and 2, and what v1 reserves

Form: one author's spec read against the accepted architecture, then the chair (C13). Read: this spec (758ae032) s0-s14; ADR-007 5.1-5.2, 7.5, my 21:08 chair line and Idris's corrections; L4 s8 (versioning); ADR-001's Day 13 freeze row. No independent review of L5 exists yet. The v1 part of this ruling is small and reversible; the 1.1 part waits on one (S7).

**Item 1. Accepted: in 1.1 the extension writes `state.json` and appends to `actions.jsonl`, under seven conditions.** The alternative, only the app writes, means every tap on iOS 18-26 opens the app, including a habit check or a page turn. That is not a widget. An op journal the app folds in later does not escape it either: a person who taps daily and never opens the app fills the journal, and only a writer in the extension can compact it. So the question is how to make a second writer safe, not whether to have one. ADR-007's own 5.2 sentence ("everything the extension reads is a file written atomically by the app") was already not literal: T6 has the extension write `wants-run`, and C2-Q1 lets it write `location/last.json`. The amendment in ADR-007 says which files, and option (b) does not move: no Python in any extension.
- **S1. Which files.** The extension writes exactly `widgets/<id>/state.json` (under the lock), `widgets/<id>/actions.jsonl` (append, under the lock), and what it already may (`wants-run`, `location/last.json`). Never `tree.json`, `status.json`, `entitlement.json`, `widgets/index.json`, `controls/` or `secrets/`.
- **S2. Ops are data, not code.** The op set is closed and fixed in Swift: `set`, `set_arg`, `toggle`, `add`, `cycle`, `toggle_member`, `clear`. No expressions, conditions, loops, or reads of one key into another. A new op is an app update and a dated line here. This is what keeps "no Python in the extension" meaningful, and what lets us tell App Review in one sentence that the extension runs no code the person wrote or downloaded: it applies a fixed Swift function to a JSON file.
- **S3. One write path.** One Swift type in the shared framework does every read-apply-write for both processes, the app's handler writes (s5.3) included. Neither target carries its own copy. G-L5-5 widens to: two processes, 1,000 interleaved `add` ops each on one file; final `rev` 2,000 and the value matches.
- **S4. Lock discipline.** `flock` with `LOCK_NB` and bounded retry, at most 200 ms in the extension; held across read, apply, temp write and `rename` only; never across an `await`, a network call or a Python run. If the extension cannot take the lock in time, the tap fails visibly (state unchanged, the Toggle snaps back) and nothing is written without the lock. Reason: a blocking wait in `perform()` behind an app that was suspended mid-write would hang the extension, and iOS terminates a suspended process that holds a file lock in a shared container [recalled: code 0xdead10cc; the kernel then releases the lock].
- **S5. Crash safety.** Temp file plus `rename` in the same directory, so a reader always sees a whole file; a process that dies mid-op leaves the old state and, `flock` being per open file, no stale lock. A `state.json` that does not parse, or carries a schema major the reader does not know: the extension refuses to write (taps fail visibly), the renderer draws with empty state and the error badge, and the app moves the file to `state.bad.json` before it writes a fresh one. Never a silent reset.
- **S6. A queued tap is never dropped.** s5.4's "older rows dropped with a log line" is struck. At 100 rows, a handler tap that would queue is refused: ops not applied, badge "Open PyWidget to catch up". Ops-only actions do not queue and keep working. Dropping the oldest unprocessed tap is silent data loss; a refused tap is visible.
- **S7. Gates before 1.1 builds on this.** G-L5-1 (a) and the widened G-L5-5 pass in the Simulator, and Odalys reviews s5 and S1-S6 independently, before any 1.1 state code. If G-L5-5 fails, the fallback is a dated line here; `NSFileCoordinator` is not pre-approved [recalled: its record inside app extensions is uneven].

The s4.1 routing is accepted as written: `WidgetOpsIntent` only in the extension target (and `[.widgetKitExtension]` on 27), `WidgetActionIntent` 27+ with `[.main]`. Idris's rejection of a `LiveActivityIntent` that starts no Live Activity stands (ARG p.18 2.5.4).

**Item 2. Default `fallback` on iOS 18-26: `open_app`.** It is correct at once, the person sees what happened, and opening the app from a widget tap is ordinary widget behaviour. The signed link (s7.2) means no web page can run a person's handler. `queue` is invisible and late, and a handler that refuses the tap undoes it hours after the person saw it succeed; that is the wrong thing for a default. `queue` stays as an explicit choice for logging and sync, under S6. Many 1.1 buyers will still be on 18-26 when it ships (the share is unmeasured), so the default has to be right for them, not only for 27.

**What v1 reserves (before the Day 13 freeze, 2026-11-03).** The app and the extension ship in one bundle and update together, and trees on the device come from the bundled package, so a v1 renderer on the phone never meets a 1.1 tree. The cross-version path that is real is L4 s8's: a newer document on an older renderer (the web renderer, a shared gallery script). I keep the rows that serve that path or that cost nothing, and drop the rows that only guard a phone-side mismatch that cannot happen.


<div class="tbl" role="region" tabindex="0" aria-label="Table 12: Chair note (Ines), 2026-10-26 00:15 ET: items 1 and 2, and what v1 reserves, scrolls sideways" style="--tw:578px" markdown="1">

| Row | Ruling | Owner |
|---|---|---|
| R1, R2, R3 | v1, by Day 13. Already implied by L4 s8; name the cases in the renderer fixtures | Idris |
| R4, R5 | v1, by Day 13, after T-0020's rename pass. The schema today requires `handler` in every action | Idris |
| R8 | v1, as: the run-log reader shows an unknown `trigger` or `outcome` as text and never fails; ADR-007 7.5 lists the three triggers and `conflict` as reserved | Idris |
| R12 | v1, doc and stub only | Pernille |
| New, V1 | v1: a widget whose tree has a `Button` or `Toggle` prints one IDE console line, "Buttons and toggles are drawn but do not respond to taps until PyWidget 1.1." No v1 premade uses either, and the store page claims no interactivity | Pernille |
| R6 | doc only: names held in the ADR-007 amendment (this date) | done |
| R7 | doc only: Pernille notes the optional `WidgetRequest.action` in the contract the next time she edits it | Pernille |
| R11 | not v1: v1 ships none of these types; the names freeze when 1.1 ships | Idris, 1.1 |
| R9 | not v1: no URL scheme is registered today. If a v1 task registers one, it refuses every `a/` and `i/` route | whoever registers it |
| R10 | dropped: the app creates `link.key` at first 1.1 launch. Until it exists, the extension draws a handler action as the unsigned `pywidget://w/<id>`, which opens the script and runs nothing. No secret file in v1 that v1 never uses | Idris, 1.1 |
| R13 | dropped: the extension updates with the app, so the 1.1 provider starts reading `state.json` in 1.1 | Idris, 1.1 |

</div>


What this costs before the freeze: my estimate is under half a day for Idris, most of it fixtures inside the renderer work he is already doing, and under an hour for Pernille. Neither of these earns by <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span>. Both keep 1.1 from breaking documents people have already saved, so they go in at P2, behind the renderer and the Pro purchase.

## 16. Fixes to other documents (2026-10-26, this task)

- **ADR-007** s5.1 T5 corrected (dated note in the row and in a new "Corrections after acceptance" section): T5 runs in the app only on iOS 27+ with `allowedExecutionTargets = [.main]`; on 18-26 through an action link that opens the app or the queue; ops run in the extension. Citations fixed per CORRECTIONS U1-06: "L2 s5" -> "L2 s3.3" (three places), T7's "L2 s1" -> "L2 s2 item 6" (which says push is not v1; location wake rests on ADR-001 alone).
- **L4** s6: the "or in the app if `openAppWhenRun`" clause marked wrong (SDK: an error in an extension), with a pointer to s0 here.
{% endraw %}

</div>
