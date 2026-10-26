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

Odalys's independent review ([`pywidget/docs/reviews/L5-state-review-odalys.md`](l5-state-review-odalys.html), 508b6e4b; replies in the same file) found that the queue as first written could lose a tap and run a handler twice (B1), and that a tap's ops and its queue row were two commits (B2). Amended here: the queue lives inside `state.json` as `pending`, written in the same commit as the tap's ops, before any Python runs, on every handler path; `actions.jsonl` is dropped. Struck text is kept with its date. Changes to the chair's s15 conditions S1, S6 and S7 and to ADR-007's amendment items 1, 4 and 6 wait on Ines's ruling; until then this section is the author's proposal and no 1.1 state code starts (chair S7). *Ruled 2026-10-26 01:12 ET (Ines, s15 chair note 2): accepted, with A1 (an attempt is counted before the handler runs), A2 (`failed.jsonl` <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span>) and A3 (a delta review joins the S7 gate). Until Idris writes A1 and A2 into s5.3, s5.4 and s5.6, the chair note governs.*

**Changes for A1 and A2 (Idris, 2026-10-26 01:42 ET, T-0130).** Written from s15 chair note 2 (ff41ed1e); no ruling changed. Every changed paragraph carries "(A1, T-0130)" or "(A2, T-0130)" in its text, so a delta review can find them by search. Each item is marked *ruled* (the chair's words, placed) or *mine* (my reading of how to carry out a ruling; Odalys, review these first):
1. s5.1, `failed.jsonl` row: the reasons it holds and the A2 cap. *Ruled.*
2. s5.1, the `attempts` bullet: it now counts claimed runs, not failed ones. *Ruled* (A1); writing a live row with `attempts: 1` is *mine* (item 5).
3. s5.3, opening paragraph: the claim commit comes first, and the handler reads state at the claim's `rev`. *Mine*: the claim is a commit, so it moves `rev` like every commit (s5.1); one interpreter means no claim can fall inside another run's rebase window.
4. s5.3, last bullet: `stuck`, `expired` and a dead process commit nothing beyond the claim, so the attempt stands. *Ruled* (A1); naming `expired` here is *mine*, and Q-T130-1 asks the chair about it.
5. s5.6, **Write ahead**: a live row (`intent`, `link`) is written with `attempts: 1`, because the app runs it at once. That write-ahead commit is the claim for the first run, so the live path needs no extra commit. *Ruled* ("a live row's first run counts as attempt 1"); the one-commit form is *mine*.
6. s5.6, **Drain** and **Batch rule**: the `attempts >= 3` check, then the claim, then the run; a row the batch rule defers is not claimed. *Ruled*; that deferred rows are not counted is *mine*, and it follows from "before each handler run".
7. s5.6, **Failure of a queued row**: there is no increment at failure time now. At `attempts >= 3` the row moves with reason `error` or `timeout`. *Mine*: it keeps the 3-run rule without counting a run twice.
8. s5.4, new A2 paragraph: the `failed.jsonl` caps, the refusal when it is full, live taps still run, the 100-row `pending` cap refuses `queue` taps only, the 256 KiB cap binds every tap. *Ruled*. The traceback marker and which badge shows when both refusals apply are *mine*.
9. s5.8: A1's invariant added to the <span title="A test written in advance. If it fires, we drop the idea.">kill</span> test. *Ruled.*
10. New s5.9: three questions for Ines (Q-T130-1, -2, -3). s5.8 also gets a pointer to Q-T130-3, where a ruling and the s5 text conflict and the line does not settle it. Until she answers, s5 follows the ruling as written.

### 5.1 Files (App Group, extending ADR-007 5.2)


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 5.1 Files (App Group, extending ADR-007 5.2), scrolls sideways" style="--tw:1194px" markdown="1">

| File | Writer | Reader | Content |
|---|---|---|---|
| `widgets/<id>/state.json` | app (handlers, runs, Shortcuts) **and** extension (ops) | both | `pywidget.state/1`, layout below |
| `widgets/<id>/state.lock` | both (`flock`); **created by the app only** (2026-10-26, review S2) | | empty; exists so the lock never touches the data file |
| ~~`widgets/<id>/actions.jsonl`~~ | ~~extension (append)~~ | ~~app (drain, then truncate under the lock)~~ | ~~queued handler taps (s4.2)~~ struck 2026-10-26 (review B1, B2, S1): rows live in `state.json` `pending` |
| `widgets/<id>/failed.jsonl` | app (temp file plus `rename`) | app (IDE log) | rows whose handler failed 3 times (s5.6; review S6), kept until the person clears them. Amended 2026-10-26 (A1, A2, T-0130): rows with reason `error`, `timeout` (3 claimed runs, s5.6), `killed` (reached the drain with `attempts >= 3`, s5.6) or `conflict` (s5.3); at most 100 rows and at most 4 KiB of traceback per row (s5.4). Ruled 2026-10-26 01:46 ET (Ines, s5.9 Q-T130-2): 100 is the line at which every handler tap on the widget is refused, not a limit on writing. A row already in `pending` still moves in past 100, so the file holds at most 100 plus the rows `pending` held when it reached 100 |
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
- `pending`: one row per handler tap not yet handled, oldest first. `path` is `queue` (18-26 `fallback="queue"`), `intent` (27+) or `link` (18-26 `open_app`). Rows with `path` `intent` or `link` also carry `before: {key: old value, or {"absent": true}}` for the keys the tap's ops touched, so a failed live handler can restore them (s5.3). ~~`attempts` counts failed handler runs (s5.6).~~ (struck 2026-10-26, A1, T-0130: a handler that kills the process commits no failure.) `attempts` counts claimed handler runs: +1 in a locked commit before each run starts, whatever the run's outcome. A `queue` row is written with 0, and a live row with 1 (s5.6). Added 2026-10-26 01:46 ET (Ines, s5.9 Q-T130-1): each claim also writes the run's `run_id` into the row (a live row's write-ahead writes its first `run_id`), so that the next drain can tell whether that run was `expired`.
- `ops_log`: the op lists of the last 16 commits that were ops, with their `rev`, so a handler result can be rebased without running the handler twice (s5.3; review S4).
- The `pending` env of s9 is true while `pending` is non-empty; it no longer reads `actions.jsonl` (2026-10-26).

`scopes.shared` is what Python sees as `state`. Every placed instance of one widget script shares it: a counter on two Home Screen pages shows the same count ~~[ours]~~ after its next reload (2026-10-26, review N5: the system reloads the tapped widget [recalled]; whether other instances of the kind follow is a G-L5-2 row; after an app-side commit the write path calls `reloadTimelines(ofKind:)`). The `scopes` level exists only so per-instance state (keyed by a widget configuration id) can come later without a format change; 1.1 reads and writes `shared` only.

### 5.2 Writes and the lock

This is a change to ADR-007 5.2's rule "everything the extension reads is a file written atomically by the app": in 1.1 the extension also writes `state.json` ~~and appends to `actions.jsonl`~~ (struck 2026-10-26, review S1: an append is not a `rename`; the extension writes `state.json` only). Every write: `flock(state.lock, LOCK_EX)`, read `state.json`, apply, write a temp file in the same directory, `fsync` it (added 2026-10-26, review N1), `rename`, unlock. A reader that does not lock still sees a whole file (rename is atomic). Lock hold time is the read, apply, temp write and `rename` ~~(microseconds)~~: milliseconds. Measured by Odalys on this Mac (macOS 27.0.1, APFS, Python, host only, 64 KiB file, n=500): median 0.45 ms, p99 2.2 ms, max 3.9 ms; with `fsync` median 0.54 ms, p99 2.3 ms, max 5.6 ms. Inside the 200 ms bound; the device p99, and the time at the 256 KiB cap that `pending` makes possible, are G-L5-5 rows, not assumed (2026-10-26, review N1). Never held across a Python run. Whether `flock` works across the app and extension in an App Group container is [recalled: yes] and is gate G-L5-5; the fallback is `NSFileCoordinator` (not pre-approved, chair S7).

### 5.3 Handler runs and concurrent taps

~~A handler run reads state at `rev = r`, runs unlocked (up to 5 s), then locks: if `rev` is still `r`, write its result as `r + 1`; if not (a tap landed meanwhile), re-apply the handler once to the new state (it is a pure function of state and args by contract); if `rev` moved again, keep the newer state and log outcome `conflict` [ours]. On handler error, timeout or `stuck`: if `rev` is still the post-ops value, restore the pre-tap state (the queue row or intent kept it), so a failed Toggle snaps back as L4 s6 promised; otherwise keep the state and badge the widget (ADR-007 7.1 row 4).~~ (Struck 2026-10-26, review S4 and B2: nothing enforced purity, a second run repeats side effects, `conflict` lost the result, and no row kept the pre-tap values.)

As of 2026-10-26: a handler run reads state at `(epoch, r)`, runs unlocked (up to its `timeout`), then takes the lock and makes **one** commit. Amended 2026-10-26 (A1, T-0130): the run is preceded by its claim, the locked commit that adds 1 to the row's `attempts` (s5.6). The handler reads state in the same locked section as the claim, so `r` is the claim's `rev`. Like every commit, the claim moves `rev` (s5.1). It is not an op, but it never falls inside another run's window: one interpreter runs one handler at a time. The result commit is one of these:
- **ok, `(epoch, rev)` still `(epoch, r)`:** write the handler's state (unchanged if it returns `None`, R12), remove its row from `pending`.
- **ok, `rev` moved to r':** if every commit r+1..r' is in `ops_log` (taps and "Set Widget State" are ops), write the handler's state with those ops re-applied in rev order, and remove its row. The handler is never run twice. If any commit in the window is not ops (an in-app Python write, s5.5) or r is older than the ring, the row is not committed: it moves to `failed.jsonl` with reason `conflict` (s5.6), shown, not lost. One interpreter runs one handler at a time, so two handler commits never overlap; this branch is the 17-taps-during-one-run case.
- **error, timeout, `interrupted`, on a live row (`path` `intent` or `link`):** if `(epoch, rev)` is still the row's `(epoch, rev_after)`, restore each key in `before` and remove the row, so a failed Toggle snaps back as L4 s6 promised; otherwise keep the state, remove the row, badge the widget (ADR-007 7.1 row 4).
- **error or timeout on a `queue` row:** s5.6.
- ~~**`stuck`, or the process dies:** nothing is committed; the row stays in `pending`.~~ (struck 2026-10-26, A1, T-0130: as written, `attempts` never rose for such a row, so it ran first in every batch and died every time.)
- **`stuck`, `expired`, or the process dies (A1, T-0130):** no result commit. The claim has already counted the run, so the row stays in `pending` with that attempt counted. At the next drain, a row with `attempts >= 3` moves to `failed.jsonl` with reason `killed` and does not run (s5.6). A live row whose process is gone is first turned into a `queue` row (s5.6), keeping its `attempts`. `expired` commits nothing because s5.7 allows no lock after the T2 expiration handler fires. ~~Whether it should count is Q-T130-1.~~ Ruled 2026-10-26 01:46 ET (Ines, s5.9 Q-T130-1): an `expired` run does not count. The next drain gives the attempt back, without an extra commit (s5.6, **Drain**). `stuck` and a dead process still count.

This makes ops "optimistic" in the plain sense: shown at once, undone if a live handler refuses them at once. A queued handler that refuses hours later does not undo what the person saw succeed (s5.6).

### 5.4 Caps [ours]

`state.json` at most 64 KiB (read on every `getTimeline`); a write over the cap fails the action with `StateTooLarge`. `actions.jsonl` at most 100 rows; ~~older rows dropped with a log line~~ (struck 2026-10-26, chair note s15 S6: at 100 rows a tap that would queue is refused, never dropped). Keys and values as s3.2.

Amended 2026-10-26 (review B2, S6): the 64 KiB cap applies to `scopes`; `pending` is at most 100 rows, `args` at most 1 KiB per row; the whole file at most 256 KiB. The 100-row check and the size check run under the lock, before the ops apply; a tap that would pass either is refused (ops not applied, badge "Open PyWidget to catch up"). *(Amended 2026-10-26, A2, T-0130: the 100-row check refuses `queue` taps only; the size check refuses any tap. See below.)* Rows in `failed.jsonl` do not count, so a handler that always fails cannot fill the queue.

Amended 2026-10-26 (A2, T-0130; s15 chair note 2):
- **`failed.jsonl` cap.** At most 100 rows, and at most 4 KiB of traceback per row. A longer traceback keeps its last 4 KiB, where the exception line is, and the row carries `"traceback_truncated": true`. The cut is shown, never silent. The 4 KiB is the ruling; keeping the tail and the marker are mine. No row is ever dropped or trimmed. The person clears rows in the IDE, or deletes the widget.
- **When `failed.jsonl` is full**, a tap on that widget that would queue (`path` `queue`) is refused: its ops are not applied, and the widget shows a badge. The wording is Maren's; the chair's example is "Fix this widget in PyWidget". ~~Live taps (`intent`, `link`) still run.~~ Opening the app fixes this: the person reads the tracebacks and clears the rows. ~~A row that has to move to a full file is Q-T130-2.~~ Ruled 2026-10-26 01:46 ET (Ines, s5.9 Q-T130-2), replacing the two struck sentences:
  - At 100 rows, **every handler tap** on that widget is refused, `queue` and live alike. Its ops are not applied and no row is written. A refused `link` tap still opens the app, and the app shows that widget's failed rows. Actions with no handler (ops only) are never refused by this rule.
  - A row that must move (killed at 3, failed a third time, `conflict`) **always moves**, even past 100. It is never held and never dropped. Because no new handler row can be written once the file holds 100, the only rows that can still arrive are those `pending` held at that moment. So the file is bounded by 100 plus that `pending`, and the 256 KiB cap bounds `pending`.
- **The 100-row `pending` cap refuses `queue` taps only.** Live taps are not refused by it. A live row that becomes a `queue` row after its process died (s5.6) may take `pending` past 100, by one row per kill.
- **The 256 KiB whole-file cap binds every tap**, live or queued (ops not applied, badge as above). Turning a live row into a `queue` row drops `before`, so the row gets smaller and the cap never blocks the conversion. The 64 KiB `scopes` cap is unchanged (`StateTooLarge`).
- **Order of checks**, all under the lock, before the ops apply: `scopes` size, whole-file size, then ~~for a `queue` tap the `failed.jsonl` cap and the `pending` cap~~ for any handler tap the `failed.jsonl` cap, then for a `queue` tap the `pending` cap (2026-10-26 01:46 ET, Ines, Q-T130-2). When both refusals apply, the `failed.jsonl` badge shows, because only the person can clear that file; the drain clears `pending` on its own. The order is mine.

### 5.5 Who else touches state

- Python in the app (console or IDE) can read and write a widget's state through a C2-style module, `pywidget.widgets.state(id)` (name for Pernille; open Q4). Added 2026-10-26 (review S9): the module calls the Swift write path through the bridge; Python never opens `state.json`. A write is a compare-and-swap on `(epoch, rev)`; a mismatch raises in the script. It is not an op, so a handler commit whose window holds one goes to `failed` (s5.3).
- Shortcuts: L9's "Get Widget State" adds `state` to its JSON; a new "Set Widget State" (key, value) applies `Op.set` under the lock, through the same Swift type in whichever process runs it (s0; added 2026-10-26, review S9). L9's slots (`Set Widget Data`) stay separate: slots are inputs a script reads, state is what the widget's actions change.
- Deleting a widget script deletes its `widgets/<id>/` folder (how: s5.7, review S2). Renaming a widget's `id` starts a fresh state (the IDE warns before save).

### 5.6 Write-ahead and the queue (new 2026-10-26, review B1, B2, S6, S7, N4)

- **Write ahead, every path.** A tap on an action with a handler makes one locked commit before any Python runs: the ops result and its `pending` row, in one `rename`. Extension (`queue`, 18-26), app intent (`intent`, 27+) and app link (`link`, 18-26 `open_app`) all do this through the one write path. A process killed after it leaves the row; s11's "the handler runs at the next T1" now follows from the row. Amended 2026-10-26 (A1, T-0130): a `queue` row is written with `attempts: 0`. A live row (`intent`, `link`) is written with `attempts: 1`, because the app runs it at once: its write-ahead commit is the claim for its first run, and the live path needs no extra commit.
- **Drain.** At the start of a T1, T2 or T3 batch the app first turns any `intent` or `link` row whose process is gone into a queue row (drops `before`, one commit), then handles rows oldest `seq` first. Amended 2026-10-26 (A1, T-0130), for each row in order: (added 2026-10-26 01:46 ET, Ines, Q-T130-1: first, if the row's `run_id` is the run that the widget's `status.json` records as `expired`, read `attempts` as one less; the claim below writes that corrected count plus 1, so the give-back costs no commit of its own. If the record is missing or names another run, the attempt counts.) if `attempts >= 3`, move it to `failed.jsonl` with reason `killed` and do not run it (one commit). Otherwise claim it, `attempts += 1` in one locked commit, and only then start Python. A converted live row keeps its `attempts`. So a handler that kills the process on every run gets exactly 3 runs: the live run plus 2 claimed runs, or 3 claimed runs for a `queue` row. Each row's handler commit removes that row (s5.3), so a tap appended during the drain is a new row that stays, and a kill mid-drain re-runs nothing that committed.
- **Batch rule.** Each row counts against ADR-007 5.1 with the same `elapsed + budget_s + 5.0 <= 25` test. Per widget, its rows run first; an action run returns state and tree (R7), so the last successful handler's tree is that widget's render in the batch. Widgets without rows keep their place. Rows left over stay in `pending` (`deferred`). A row is claimed only once the batch rule has admitted it, so a deferred row is not counted (A1, T-0130).
- **Failure of a queued row.** ~~`attempts += 1` in the same commit;~~ (struck 2026-10-26, A1, T-0130: the claim already counted this run, so counting it again here would make 2 failures look like 3.) Its ops stand. ~~At 3~~ If the row's `attempts` is already 3 or more (A1, T-0130), the result commit moves it to `failed.jsonl` with reason `error` or `timeout` and the traceback (4 KiB cap, s5.4), and it leaves `pending`. The widget badges, and the IDE log shows it. Never deleted by the app; the person clears it or deletes the widget.
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

- G-L5-5 adds a kill test: two writers plus a drainer, `SIGKILL` at random points (after the temp write, before the `rename`, mid-drain, during folder delete), 1,000 kills. Invariants: `state.json` always parses; `(epoch, rev)` never decreases within an epoch; every `tap_id` ends in exactly one of handled, pending, failed, refused-and-logged; ~~no handler runs twice for one `tap_id`; added 2026-10-26 (A1, T-0130): a row whose handler always kills the process reaches `failed` with reason `killed` after exactly 3 runs, both for a `queue` row and for a live row that is converted. As the two read side by side, this invariant and "no handler runs twice" contradict each other: Q-T130-3.~~ (struck 2026-10-26 01:46 ET by the chair, s5.9 Q-T130-3: the two sentences contradicted each other; one restated set replaces them.) For each `tap_id`:
  - **(I1) One result, then no more runs.** At most one result commit exists (handled, restored, or moved to `failed`), and no handler run starts after it. This is review invariant 4 as Odalys meant it (B1: a handler re-run after its result had committed).
  - **(I2) No run without a claim.** Every handler run starts after a locked commit that counted it (a live row's write-ahead is its first). So the runs not recorded `expired` never exceed 3.
  - **(I3) Three runs, then `failed`.** A row whose handler always kills the process reaches `failed` with reason `killed` after exactly 3 runs. This holds for a `queue` row and for a live row that is converted, with no expiry injected.
  - **(I4) Expiry is ours.** A row whose run is cut by an injected T2 expiry k times (k = 1 to 5), then runs cleanly, ends `handled`. A run cut by expiry and then killed while suspended is not counted either.
  - **(I5) Full `failed.jsonl`.** With the file at 100 rows and 100 `queue` rows pending, all of which fail, every row reaches `failed` (none held, none dropped), every handler tap is refused and logged, and an ops-only tap still applies. Also the lock-to-rename time at 64 and 256 KiB. One run on a device before 1.1 ships (the Simulator proves macOS `flock` only).
- G-L5-7 (new, device): suspend the app inside a locked section; record what iOS does.
- G-L5-4 adds: toggle a control and tap a widget on a locked device.
- G-L5-2 adds: after an extension commit, do other placed instances of the kind reload.

### 5.9 Open after T-0130 (for Ines; Idris, 2026-10-26 01:42 ET)

These are the places where s15 chair note 2 and the s5 text conflict, and the T-0130 line does not settle which wins. Until Ines rules, s5 follows the chair note as written. I have changed no ruling.

- **Q-T130-1. Does a T2 `expired` run count as an attempt?** A1 counts every claimed run, and the chair names "T2 expiry inside the handler" as one of its causes. ADR-007 5.3 says `expired` "never counts toward the loop breaker (7.2 `killed`), so a healthy widget is never demoted for our own scheduling". Those are two different counters, but they rest on opposite reasons. As written, a queued handler that is healthy but slow, cut off by our T2 expiry three times, lands in `failed` as `killed`. Options: (a) it counts, as ruled. That is simple, and the kill test needs nothing more. (b) It does not count: at the next launch the app reads `expired` for that run from `status.json` and gives the attempt back (`attempts -= 1`) in a locked commit. This cannot happen at expiry itself, because s5.7 allows no lock after the expiration handler fires. My lean is (b), because of the ADR-007 principle. It costs one more commit path and one more kill-test case. s5 stays at (a) until you rule.
- **Q-T130-2. Where does a row go when it must move to a full `failed.jsonl`?** A2 says no row is ever dropped, and that when the file is full only `queue` taps are refused. A row still has to move when it is killed at 3, fails a third time, or hits a `conflict`, and that last one can be a live row. Options: (a) the row stays in `pending`, gets `"held": "failed_full"`, is not run or claimed again, and still counts toward the `pending` cap. Once the person clears `failed.jsonl`, the next drain moves it. (b) `failed.jsonl` takes it past 100, with a hard ceiling (say 110). My lean is (a): no new cap, and the widget already shows the "fix this widget" badge. Both keep "never dropped".
- **Q-T130-3. The kill-test invariant "no handler runs twice for one `tap_id`"** (s5.8, review invariant 4) contradicts A1's "reaches `failed` after exactly 3 runs", and it already conflicted with the 3-attempt retry in s5.6. I read Odalys's intent as: no handler runs again once a result commit for its `tap_id` exists (the double-run fault of B1). Proposed wording: "no handler runs again for a `tap_id` once a result commit (handled, restored, or moved to `failed`) exists for it". That changes the wording of an invariant you accepted, so it waits on you. Odalys should see it in T-0131.

#### Chair note (Ines), 2026-10-26 01:46 ET: Q-T130-1, -2, -3

Read: s5 in full and s5.9 at 7c1286dd; my s15 chair note 2 (ff41ed1e); ADR-007 5.3 (expiration handler, recovery), 7.2 (`expired`, `killed` rows) and amendment 2 item 6; Odalys's review invariant 4 and B1 (508b6e4b). I ran nothing. The test I used for each: what is simplest to build and test in the Simulator, and what is safest for the person, meaning no handler is lost without a trace and no file grows without bound. I have written each ruling into the s5 text, dated, so there are not two texts.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: Chair note (Ines), 2026-10-26 01:46 ET: Q-T130-1, -2, -3, scrolls sideways" style="--tw:853px" markdown="1">

| Q | Ruling | Why |
|---|---|---|
| Q-T130-1, `expired` | **Does not count** (Idris's (b), in a cheaper form). The claim writes the run's `run_id` into the row. At the next drain, if the widget's `status.json` records that `run_id` as `expired`, the drain reads `attempts` as one less, and its claim writes the corrected count plus 1. No new commit path. If the record is missing or names another run, the attempt counts. `stuck` and a dead process still count | A1 named "T2 expiry inside the handler" as a cause. That was my error: ADR-007 5.3 had already ruled that our scheduling never counts against a script, and I broke that principle without saying so. Counting expiry would put a healthy handler in `failed` as `killed` and show the person a "fix this widget" badge for our fault. T1 has no expiry, so on the next T1 a slow handler either finishes or meets its own `timeout`, which counts. Not counting expiry therefore cannot make a loop that never ends. The give-back rides on the claim, so it costs one field and one comparison. Errors go the safe way: a lost record counts the run, and that is visible in `failed` |
| Q-T130-2, full `failed.jsonl` | **The row always moves; 100 refuses every handler tap.** Neither held (a) nor a second ceiling (b). At 100 rows, every handler tap on that widget is refused, `queue` and live; ops-only actions still run. A refused `link` tap opens the app on that widget's failed rows. Rows already in `pending` move in past 100 | (a) <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parks</span> rows in the file every `getTimeline` reads, with nowhere to keep a 4 KiB traceback, and adds a state that never runs. (b)'s 110 needs a rule for 111. Both fail because live taps kept making rows: a converted kill and a live `conflict` both reach `failed`. So my A2 "live taps still run" is what left the file unbounded, and I withdraw it. With every handler tap refused at 100, no new row can start, and the file is bounded by 100 plus what `pending` held at that moment, which the 256 KiB cap bounds. It is one check, `failed.count >= 100 && action.hasHandler`, and one test (I5). A widget with 100 failed runs is broken, and the honest response is to send the person to the tracebacks |
| Q-T130-3, invariant | **Restated in s5.8 as I1-I5.** The struck pair is replaced. I1 keeps review invariant 4's purpose (no run after a result commit, B1). I2 says every run is claimed first. I3 is A1's exactly-3, with no expiry injected. I4 and I5 are the tests for Q1 and Q2 | Idris read Odalys's intent rightly, and his wording is I1. "No handler runs twice" was already false the moment s5.6 allowed 3 attempts. I accepted both texts at 01:12 without reading them side by side. A gate whose invariants contradict cannot pass, so each now names one thing a test can check |

</div>


**What follows outside L5.** These are not written here, because this commit touches L5 only:
- ADR-007 5.3 expiration handler: it also records the stopped run's `run_id` with `last_outcome=expired` (Idris names the field). The write is `status.json`'s usual atomic rename, not under `state.lock`, so s5.7 still holds.
- ADR-007 amendment 2 item 6: "a `queue` tap is refused ... when that widget's `failed.jsonl` holds 100 rows" becomes "every handler tap". Add one line saying an `expired` run gives its attempt back.
- Badge and VoiceOver wording for the full-file refusal, now on live taps too, and the in-app view a refused `link` tap opens (Maren).
Board lines: T-0157 (Maren, wording) and T-0158 (Idris, ADR-007). Odalys's T-0131 delta review now covers these rulings too. If she finds that I4's give-back or I5's bound fails, her finding reopens the row; it is not settled because I wrote it.

#### Chair note (Ines), 2026-10-26 02:32 ET: T-0131 blockers B1-B4, and S1-S6, N1-N6

Read: Odalys's delta review [`pywidget/docs/reviews/L5-s5-review-odalys.md`](l5-s5-review-odalys.html) (64d48ed3) in full; s5.0-s5.9 here at ea962266; s4.2 (the 27+ handler path); ADR-007 chair amendment 2 items 6 and 7. I ran nothing. I traced each blocker myself against the text it cites before ruling, because an agreed fix to a wrong trace is still wrong. All four traces hold. The tests are the 01:46 ones: simplest to build and test in the Simulator, and safest for the person (no tap lost without a trace, no handler run after its result, no file without a bound). This note rules; Idris writes the rulings into s5.1-s5.8 as dated lines (board line from this task), so there is one text.


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: Chair note (Ines), 2026-10-26 02:32 ET: T-0131 blockers B1-B4, and S1-S6, N1-N6, scrolls sideways" style="--tw:804px" markdown="1">

| # | Ruling | Why |
|---|---|---|
| B1, snapshot | **Accepted as written.** Every run reads `(epoch, r, scopes.shared)` under the lock at the moment its bridge run starts. For a queue row that is the claim's locked section, as now. For a live row's first run it is a locked read with no commit, so the live path still needs no extra commit. The `RunRequest` carries that snapshot, never the state read in `perform()`. `ops_log` records every pending-only commit (claim, conversion, move, the B2 repair, the C3 fold) as `{"rev": n, "ops": []}`, so the rebase steps over them and `conflict` has one cause: a window longer than the ring. The s5.0 item 3 sentence ("one interpreter means no claim can fall inside another run's rebase window") is struck with this date. The ring stays 16 entries; empty entries count against it. If a G-L5-5 trace of ordinary use (two taps inside 2 s during a drain) overflows it, Idris raises it with a dated line | I checked the trace against s5.3 para 2 and s4.2: for a live row the claim is the write-ahead, so tap B's `r` is taken when B arrives, and tap A's result commit, which is not ops, lands inside B's window. B's handler runs and its result is thrown away. Two taps inside a 2-second handler is ordinary use, so this is a fault a person would meet in the first week, not an edge. Item 3's reasoning is true for a queue claim made just before its run. Idris marked it as his own reading for the review to check first, and the review did that job. I did not test it on a live row at 01:46 either. A snapshot at run start is also what the person expects: B's handler sees A's result |
| B2, move order | **Accepted as written.** Both under `state.lock`: write `failed.jsonl` (temp, `fsync`, `rename`) first, then commit `state.json` without the row. Before appending, the app checks `failed.jsonl` for the row's `tap_id`. At the start of each drain, a `pending` row whose `tap_id` is already in `failed.jsonl` leaves `pending` with no claim and no run. `failed_count` lives in `state.json`, written in the commit that removes the row and set again from the file's line count at each drain and at each IDE clear. Clearing rows in the IDE takes `state.lock` (s5.4). Both kill points join s5.8. One addition: after a kill between the two renames, `failed_count` reads one low until the next drain, so the extension may admit one extra handler tap per such kill. I accept that and want it stated in s5.4 | Of the two orders, only "in both files" can be repaired; "in neither" loses the tap with nothing left to find, which breaks s5.8. Checking by `tap_id` turns the duplicate into a no-op, so I1 holds through a kill at either point. `failed_count` keeps the extension's check on the file it already holds the lock on and inside the 200 ms bound. The one-low window is bounded by one tap per kill and closed by the next drain; a second counter or a journal to close it would cost more code than the tap it saves |
| B3, give-back record | **Accepted, replacing my 01:46 `last_outcome` form, with one change (C3).** The expiration handler appends the run's `run_id` to `status.json` `expired_runs` (last 8). Other outcome writes carry the list over unchanged. Launch recovery for a crash marker whose `run_id` is in the list keeps it there and records `killed` for the Activity row only, as ADR-007 7.2 already does. **C3:** at the start of each drain, in the same locked section as the B4 conversion and the B2 repair, every `pending` row whose `run_id` is in `expired_runs` and which has no `t1_only` gets `attempts` minus 1 and `t1_only: true`, in one pending-only commit (no commit if no row changes). A claim clears `t1_only` and writes a new `run_id`, so a stale list entry never matches again. S4's skip on T2 and T3 reads `t1_only` from the row, not the list. The drain's claim no longer corrects the count itself | My 01:46 test read a fact that two ordinary paths overwrite. I checked both of Odalys's paths against ADR-007 7.2 and 5.3; both are right, and the second turns a healthy slow row into `killed` after three cycles, the outcome I ruled to prevent. Why C3: with S4, a given-back row waits for a T1, which can be days away. Each T2 can cut one more row of the same widget, so a widget with 9 slow rows pushes the first `run_id` out of an 8-entry list, and that run counts after all. Every expiry happens inside a batch and every batch starts with a drain, so folding the fact into the row at the next drain means the list only has to hold the expiries since the last drain: one, plus slack for a drain that was killed. The bound no longer depends on the list's length. It costs one pending-only commit on the rare drain that gives an attempt back. At 01:46 I said the give-back costs no commit of its own; I withdraw that, because a bound is worth more than a commit |
| B4, ownership | **Accepted as written, with one addition (B4-a).** Every live row carries `launch_id`, a UUID made once per process launch, written in the write-ahead commit. "Gone" means its `launch_id` differs from this process's. The drain never claims or converts a live row of its own launch. The kill test adds the case: a live row of the current launch is never claimed by a drain. **B4-a:** the owner of a live row whose run never starts (the intent is cancelled, or the run request is refused before Python starts) turns its own row into a `queue` row in a locked commit, keeping `attempts`. If the process dies first, the next launch's drain does it | I checked the trace: on the 18-26 `link` path, the scene becoming active starts T1 before the link's run reaches the interpreter, and nothing in the row says who owns it. A wrong guess is two runs of one tap. One field fixes it. B4-a: without it, a row of the current launch whose own run was dropped has no owner until the app is next launched, and a resident app can live for days. Keeping `attempts` errs the visible way and is one less path to test |
| S1-S6 | **Accepted as written**, except S4, which takes the C3 form above (the skip reads the row's `t1_only`). S6's host model is accepted as a G-L5-5 row: "the model and the Swift type agree on N = 10,000 random sequences, and I1-I5 hold". The model is gate work, not 1.1 state code: Idris may build it once the B1-B4 text has landed. The Swift state type stays gated | Each one names a test or closes a reading that would be built wrong. S6's model is the cheapest way to have found B1-B4 before a review did, so the next delta gets checked by the model first. S6's one v1 item (the run-log reader ignores unknown keys, for `tap_id` and `seq`) goes on T-0106, which already carries the v1 run-log reservations, by Day 13 (2026-11-03) |
| N1-N6 | **Accepted as written.** N2 (reason is the last counted outcome, `stuck` added to the reason list) and N6 (item 6 wording) go into T-0158's ADR-007 edit with B3 | Text that lags the rulings gets built as written |

</div>


**The gate (ADR-007 chair amendment 2 item 7).** Its review part is not passed. It passes when Idris has written B1-B4, C3 and B4-a into s5 and Odalys confirms by search that each is there and says what this note says. That is a check of placement, not a new review. If she finds a new fault while checking, it is a finding like any other. G-L5-1 (a) and G-L5-5 with the kill test still stand. No 1.1 state code starts before all three.

**Priority.** This is 1.1 work and earns nothing by <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span>. Idris's s5 edit is P3 and comes after his v1 lines. The T-0106 addition is v1 and goes in by Day 13.

#### Design note (Maren), 2026-10-26 02:41 ET: Q-T130-2 wording (T-0157). Draft copy, NOT APPROVED (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>)

Full design in [`pywidget/docs/design/states/state-spec.md`](state-spec.html) s3.3; sheet `states-taps-off.png` (drawn by `draw_taps_off.py`, QA 0 faults). No ruling here is changed. In short:
- **Badge:** the last good render stays; the corner slot shows `exclamationmark.octagon.fill` [recall]. No words on the widget: "Fix this widget in PyWidget" is 226.8 pt at the xxxLarge clamp and the small widget's layout is 116 pt wide on the iPhone SE; "Fix this widget" (121.6 pt) fits only as a strip that takes 26% of the layout height and clips the user's buttons.
- **VoiceOver:** label "{widget}. Fix this widget. Buttons that run its script are off."; hint "Double-tap to open its failed runs in {app}."; each handler node keeps its own label, value "Off".
- **Tap (mine, for Idris and Ines):** while `failed_count >= 100`, the s4.1 chooser draws every handler action as a link to the widget's Activity screen on its failed runs (small: drawn plain, `widgetURL` to the same screen); ops-only actions stay intents. This shows nothing that did not happen (no Toggle flips back). The tap-time refusal stays the authority.
- **In-app view:** "Buttons are off" header with the file's own count, the most common failure, "Open script at line {line}", "Clear {n} failed runs" (asks first), "Export"; after a refused tap, the banner "That tap did not run. Fix this widget to turn its buttons back on."

## 6. Paging

`w.pager("page", count=n)` plus `ui.Pages("page", p0, p1, ...)`, which serializes as a `Group` of `When("state.page", i, p_i)` with `otherwise` = `p0`, so an out-of-range page (data shrank) shows the first page instead of nothing. All pages are in the tree, so the whole widget must fit `MAX_WIDGET_TREE_BYTES` (512 KiB, contract s7); a pager over 10 pages draws a lint warning [ours]. Next/prev are ops-only actions: instant, no Python, every iOS. Python re-renders the pages whenever the widget runs; `state.page` survives runs.

## 7. Deep links

### 7.1 URL grammar (custom scheme; no universal links, which need a server)


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: 7.1 URL grammar (custom scheme; no universal links, which need a server), scrolls sideways" data-n="3" style="--tw:706px" markdown="1">

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


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: 8. Control Center, Lock Screen and Action button controls, scrolls sideways" style="--tw:1330px" markdown="1">

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


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: 10. Limits, scrolls sideways" style="--tw:960px" markdown="1">

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


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: 11. Failure behaviour, scrolls sideways" style="--tw:958px" markdown="1">

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


<div class="tbl" role="region" tabindex="0" aria-label="Table 12: 13. What v1 must reserve so 1.1 does not break it, scrolls sideways" data-n="1" style="--tw:1005px" markdown="1">

| # | Reserve in v1 | Why | Owner |
|---|---|---|---|
| R1 | Renderer: a Text whose `content.kind` it does not know draws `content.fallback` if present, else empty | 1.1 `state` text on a v1 renderer degrades to the render-time value | Idris (renderer) |
| R2 | Renderer: an unknown `When` env renders `otherwise` | `state.*` and `pending` on v1 | Idris |
| R3 | Renderer: v1 draws `Button`/`Toggle` as their label (Toggle with its `isOn` snapshot), not interactive, and ignores unknown props (`isOnState`) | no interactive buttons in v1 (ADR-001), and 1.1 trees still draw | Idris |
| R4 | Schema: `actions.*` stops requiring `handler` (any of `handler`, `ops`); entries keep allowing extra keys | ops-only actions are valid v1-major documents | Idris (schema; after Pernille's rename pass lands) |
| R5 | Schema: `When.env` accepts the pattern `^state\.[a-z_][a-z0-9_]{0,31}$` and `pending`; Text `content` allows `{"kind": "state", ...}`; Button/Toggle `p` allow `isOnState` | v1 validators accept 1.1 documents (L4 s8 additive) | Idris |
| R6 | App Group: `widgets/<id>/state.json` with `schema`, `rev`, `scopes.shared`; `state.lock`; `actions.jsonl`; `controls/`; `secrets/` names held, nothing else written there. *Amended 2026-10-26 (review B1, B2, S2, S6, S8), proposal for the chair:* `state.json` fields `schema`, `epoch`, `rev`, `next_seq`, `scopes.shared`, `pending`, `ops_log` (s5.1); `state.lock`; `failed.jsonl`; `widgets/.trash/`; `controls/`; `secrets/` held; `actions.jsonl` released. Still doc only: v1 writes none of them. *Ruled 2026-10-26 01:12 (s15 chair note 2): accepted as listed* | ADR-007 5.2 lists `state.json` (1.1) without a shape | Idris (ADR-007 amendment) |
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


<div class="tbl" role="region" tabindex="0" aria-label="Table 13: 14. Gates (Simulator first, device where marked), scrolls sideways" style="--tw:1044px" markdown="1">

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


<div class="tbl" role="region" tabindex="0" aria-label="Table 14: Chair note (Ines), 2026-10-26 00:15 ET: items 1 and 2, and what v1 reserves, scrolls sideways" style="--tw:578px" markdown="1">

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


What this costs before the freeze: my estimate is under half a day for Idris, most of it fixtures inside the renderer work he is already doing, and under an hour for Pernille. Neither of these earns by Day 30. Both keep 1.1 from breaking documents people have already saved, so they go in at P2, behind the renderer and the Pro purchase.

### Chair note 2 (Ines), 2026-10-26 01:12 ET: the review answers; S1, S6, S7 and ADR-007 items 1, 4, 6

Form: independent review (Odalys, T-0108, 508b6e4b), the author's replies (Idris, 312d6a1e), then the chair (C13). Read: the review and reply table in full; s5.0-s5.8, s13 R6 and s14 at 312d6a1e; my 00:15 note above and the ADR-007 chair amendment (b36d0ea4); `viewtree.schema.json` `widget.id`; `pywidget_ui.Widget(id)`; the premade tree ids. I ran nothing. Every [recalled] below stays a gate item.

**Verdict.** The write-ahead design is accepted. It is better than what I ruled at 00:15: my S6 promised "never dropped", and the layout I accepted could not keep that promise (B1, B2). I should have asked for the review before writing the promise, not after. Three amendments of mine (A1-A3) follow. All three are 1.1 doc changes. The only v1 code this review produces is the widget id rule, and that rule is wider than the board line says (last part of this note).


<div class="tbl" role="region" tabindex="0" aria-label="Table 15: Chair note 2 (Ines), 2026-10-26 01:12 ET: the review answers; S1, S6, S7 and…, scrolls sideways" style="--tw:1131px" markdown="1">

| Item | Idris's proposal (312d6a1e) | Ruling | Why |
|---|---|---|---|
| s15 S1 | The extension writes `state.json` only; `actions.jsonl` dropped | **Accept** | Ops and the pending row land in one `rename`, so they cannot split (B2), and no append can tear (review S1). Add to S1: the extension never creates `widgets/<id>/` or `state.lock` (s5.7). Its other writes stay as before: `wants-run`, `location/last.json` |
| s15 S6 | The 100-row refusal counts `pending` only; a row moves to `failed.jsonl` after 3 failed attempts | **Accept, amended (A1, A2)** | Three strikes is what keeps "never dropped" true when a handler is broken. Odalys's case is real: a full queue that opening the app cannot fix. Two holes remain. Attempts only count failures that get committed, and `failed.jsonl` has no cap |
| s15 S7 | G-L5-5 adds the kill test and one device run | **Accept, amended (A3)** | The kill test is the only gate that finds faults of the B1 and B2 kind. The list of what must pass before 1.1 state code gets one review added |
| B2 amendment | `before` only on live rows (`intent`, `link`); a queued row's ops stand if its handler fails | **Accept** | Matches my 00:15 item 2: undoing a tap hours after the person saw it succeed is the wrong behaviour. It also keeps 100 queued rows small |
| S4 amendment | Rebase on `ops_log` (16 entries), never re-run the handler; anything else goes to `failed` with reason `conflict` | **Accept** | "Keep the newer state and log" lost the handler's result where nobody could see it. `failed` keeps it and shows it. Because there is one interpreter, the window can only hold taps and Shortcuts ops, apart from an `epoch` change |
| ADR-007 items 1, 4, 6 | Restated for the above | **Accept, as restated in the ADR-007 amendment of this date** | Items 2, 3, 5 and 7 are unchanged, except item 7's gate list (A3) |

</div>


**A1. Count an attempt before the handler runs, not after it fails.** As written (s5.3, last bullet; s5.6), a handler that kills the process commits nothing, so `attempts` never rises. The causes are ordinary: jetsam over the memory budget, a native crash, or T2 expiry inside the handler. That row then runs first in every batch, dies every time, and takes down every widget later in the batch. Fix: the drain claims each row with one locked commit (`attempts += 1`) before Python starts. A row that reaches the drain with `attempts >= 3` moves to `failed.jsonl` with reason `killed` and does not run. A live row's first run counts as attempt 1. The cost is one extra locked write per handled row (Odalys's host median is 0.45 ms). New kill-test invariant: a row whose handler always kills the process reaches `failed` after exactly 3 runs.

**A2. `failed.jsonl` is capped.** At most 100 rows, and at most 4 KiB of traceback per row. When it is full, a tap on that widget that would queue is refused: the ops are not applied, and the widget shows a badge (wording for Maren, e.g. "Fix this widget in PyWidget"). Live taps still run. No row is ever dropped or silently trimmed. Without a cap, a daily tap on a broken handler grows the file forever. This is not Odalys's S6 trap, because opening the app does fix it: the person reads the traceback and clears the rows. Also: the 100-row `pending` cap refuses only `queue` taps. A live row converted after its process died may take `pending` past 100, by one row per kill. The 256 KiB whole-file cap still binds, and the conversion drops `before`, so the row gets smaller.

**A3. S7, restated.** Before any 1.1 state code, three things pass:
- G-L5-1 (a), in the Simulator;
- G-L5-5 as widened, in the Simulator: the interleaved `add` ops, and the kill test with Odalys's four invariants plus A1's;
- Odalys's independent review of the delta: s5.0-s5.8 at 312d6a1e plus A1 and A2. Her review proposed the design, but Idris's two amendments, `ops_log` and the live-to-queue conversion are not reviewed yet.

Before 1.1 ships: G-L5-5 on a device, G-L5-7, and the locked-device row of G-L5-4. Device runs need the Apple membership (pending, due Day 7) and an App Group on a paid team [recalled]. These are 1.1 gates and not on the Day 30 path. `NSFileCoordinator` is still not pre-approved.

**What v1 reserves before the Day 13 freeze (2026-11-03).** For state, Idris is right: nothing new in v1 code. The app and the extension update together, iOS has no downgrade, and v1 never reads or writes `state.json` (R13 dropped at 00:15). So no v1 file on a phone constrains this layout. The confirmed list:
- **`state.json` layout:** doc only. Names are held in ADR-007 amendment item 4, as restated today: fields `schema`, `epoch`, `rev`, `next_seq`, `scopes.shared`, `pending`, `ops_log`; files `state.lock` and `failed.jsonl`; folder `widgets/.trash/`. `actions.jsonl` is released.
- **Schema:** R4 and R5 as at 00:15 (T-0106). The `pending` env string stays; only its source moved. One test is added to T-0106: a v1 validator accepts a document with an unknown top-level key. 1.1's `tree.json` field `state_at` rides at that level. The schema's top level has no `additionalProperties: false` today, and the test keeps it that way.
- **Run log:** R8 unchanged. Its reader rule (an unknown value shows as text) already covers any value 1.1 adds, such as `deferred` or `killed`. Nothing new to reserve.
- **Widget id:** T-0118, below. This is the only v1 code change.

**T-0118 needs more than Pernille's check.** Refusing `..`, `/`, a leading dot and the empty string closes path traversal and `.trash`. Reading the layout and the premade ids, I found three more collisions:
1. **`index.json`.** `widgets/index.json` is a file at the same level as the id folders (ADR-007 5.2). A script with id `index.json` would put its folder at the index file's path. Reserve that id, compared without regard to case. Standing rule: `widgets/` holds id folders, `index.json` and `.trash/`, and nothing else. Any new file there needs a dated line in ADR-007 and a reserved id.
2. **The `pywidget.` prefix.** Every premade id is `pywidget.premade.<name>`. A person who copies a premade's script to change it keeps that id, so their widget writes into the premade's folder (and in 1.1, into its state). If T-0031's Pro flag is keyed on the id (its file is not written yet), the Pro lock would follow a user script. Reserve the prefix `pywidget.` (any case) for first-party ids. A user script that uses it fails to save, and the message tells the person to change the id. Where the check sits (runtime or IDE save) is Pernille's and Idris's call. The test: a user script with id `pywidget.premade.steps` is refused, and the bundled premade is not.
3. **Case.** [recalled] On a phone the data volume is case-sensitive. The Simulator keeps app data on the Mac's volume, which is case-insensitive by default. So `Water` and `water` are two folders on a phone and one folder in the Simulator. Rule: the library treats ids as unique without regard to case (Idris, Swift side). Behaviour is then the same on both, with nothing to check on a device.

The pattern becomes `^[A-Za-z0-9_-][A-Za-z0-9_.-]{0,127}$` plus the reserved names. Dots stay, because every premade id has them. Tightening a pattern is not an additive change (L4 s8), so it lands before the Day 13 freeze or waits for v2's major. No v1 documents are saved anywhere yet, so it breaks nothing now. T-0118 stays P1, due by Day 13.

## 16. Fixes to other documents (2026-10-26, this task)

- **ADR-007** s5.1 T5 corrected (dated note in the row and in a new "Corrections after acceptance" section): T5 runs in the app only on iOS 27+ with `allowedExecutionTargets = [.main]`; on 18-26 through an action link that opens the app or the queue; ops run in the extension. Citations fixed per CORRECTIONS U1-06: "L2 s5" -> "L2 s3.3" (three places), T7's "L2 s1" -> "L2 s2 item 6" (which says push is not v1; location wake rests on ADR-001 alone).
- **L4** s6: the "or in the app if `openAppWhenRun`" clause marked wrong (SDK: an error in an extension), with a pointer to s0 here.
{% endraw %}

</div>
