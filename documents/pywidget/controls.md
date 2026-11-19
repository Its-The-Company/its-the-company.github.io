---
layout: "default"
title: "Controls that run a person&#x27;s Python: design and size (T-4842)"
section: "documents"
description: "A control is the small round button or switch iOS 18 added to Control Center, the Lock Screen&#x27;s two bottom corners, and the Action button. pywidget would offer two: Run Python (a button) and Python Switch (an on/off\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/' | relative_url }}">← Build Plan</a><a href="{{ '/documents/pywidget/controls.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 29 · Thu Nov 19</span><span><code>ops/plans/pywidget/controls.md</code></span></div><h1>Controls that run a person's Python: design and size (T-4842)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Plan only, Idris, 2026-11-19. Nothing here is built, and no build line is on the board. The version and the date effect are for Ines to report to the Investors (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> below); the proposed build lines in section 9 are text for her.
- Asked by: an Investor on #41, 12:09 AM ET 11-18 (c6969694208; `log/rulings.md` 2026-11-18 12:09 AM): "include this into an option that's integrated with the Widgets feature ... let me know if something else is required of this integration". The ruling's effect: Controls that run a person's Python become an option of the Widgets feature, out of plan.md's "Maybe later" row "A Control Center button" (#279 A), "sized first, its version and date effect reported before it takes the Builder's slot".
- Builds on: ADR-011 (widget actions; rule 2 already says a control carries the same action type), ADR-007 (where Python runs: the two <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>, the size rule, the 2.0 s budget), and the extension memory reading T-2097 recorded (section 4).
- Apple's behavior is cited from pages saved signed out under the #64 ruling (section 11). Where a saved page does not say something, this plan says "not on a saved page" and a check in section 8 settles it.

## Plain summary (for the Investors)

A **control** is the small round button or switch iOS 18 added to Control Center, the Lock Screen's two bottom corners, and the Action button. pywidget would offer two: **Run Python** (a button) and **Python Switch** (an on/off toggle; both names DRAFT). A person adds one from iOS's controls gallery, and iOS asks them which of their pywidget controls it is. They make that control in pywidget, on their project's page: what it runs (one of their widget's declared functions, or any of the widget tap choices: open its Page, its code, a link, another app), its symbol, its title, a short value it shows (for example "3 glasses"), and its colour.

What this needs that the question assumed it would not:
- **iOS draws controls itself, in its own style, the same for every app.** A control has a symbol, a title, an optional value, and a tint, and nothing else: no fonts, backgrounds, pictures, or our own glass. So a control cannot mirror a widget's look. The closest we can offer is "Match my widget", which copies the widget's accent colour as the tint and lets the person pick a symbol. On a button the tint shows only in the Dynamic Island after an Action button press; on a switch it colours the symbol when the switch is on (Apple's design guide, [C3]).
- **On the Lock Screen and the Action button only the symbol shows** (and on the Action button, the value), so the symbol has to say what the control does [C3].
- **iOS adds it, not us.** We cannot place a control for a person; they add it from Control Center's edit mode, the Lock Screen editor or Settings > Action Button, and choose which pywidget control it is.
- **The Action button is only on some iPhones** (the iPhone 15 Pro and later; recalled, not from a saved page). The phone the company has measured is an iPhone 15, which has none, so the Action button part needs an Investor phone that has one (open question 2).
- **Where the Python runs is the same rule as a widget button.** On iOS 18 to 26 it runs inside the widget's small memory (about 23 MB free on the iPhone 15) with a 2 second limit, so the screen does not change. A script too big or too slow for that opens pywidget and runs there. From iOS 27 it runs in pywidget in the background with no small limit.
- **By default a control asks the person to unlock first** (Face ID or passcode) before it runs their code, because a person's script can do anything a script can do, and Apple asks for that where an action "would be problematic if done unintentionally or not by the device owner" [C2].

Size: **2.8 weeks on the iOS slot (1.6 to 4.8)**, after the widget buttons are built, because controls reuse their run path. My recommendation is **1.0, in the Pages phase after the widget buttons**, never before the Builder's first phone proof, so it does not take the Builder's slot. The other choice is 1.1, with no 1.0 date effect. Section 10 has the weeks; Ines reports the date.

## 1. What Apple gives, from the saved pages

- Controls "can be buttons or toggles: buttons perform an action, and toggles perform an action and switch between two states" [C1]. A button has no state ("fire-and-forget") [C4]; a toggle has two, "off" and "on" [C5].
- The look is fixed by the system: "Controls contain a symbol image, a title, and, optionally, a value" [C3]. In Control Center a control shows its symbol and, at larger sizes, its title and value; on the Lock Screen its symbol; on the Action button, its symbol and value in the Dynamic Island [C3]. The tint is set with a `.tint(_:)` modifier on the control's template [C2]; "The system applies this tint color to a control toggle's symbol in its on state" and to the Dynamic Island [C3].
- The symbol is "a symbol image, such as one from" SF Symbols, or a custom symbol built into the app [C1].
- Loading: "When the system loads or reloads a control, it runs the body of the control from the widget extension and asks for the control's current value" [C1], through a value provider's `currentValue()` [C1]. The app asks for a reload with `ControlCenter.shared.reloadControls(ofKind:)` [C7].
- The action: an `AppIntent` or `OpenIntent` for a button, a `SetValueIntent` for a toggle [C1]. "The system queries for the state of a control when `perform()` returns; finish all actions and save all state data before it returns" [C1]. For a toggle, "The system populates the value parameter ... Don't set or manage the value parameter" [C1].
- An `OpenIntent` opens the app, and "The system requires the Target Membership of the app intent to be set to both the app and the widget extension to open the app" [C1].
- Per-control choice: `AppIntentControlConfiguration` with a `ControlConfigurationIntent` [C6]; the person configures it "when they long press the control, in edit mode, in Control Center, on the Lock Screen, and when they configure the control for the Action button" [C2]; `promptsForUserConfiguration` asks when it is first added [C2]. The app can list the placed controls and their configurations with `ControlCenter.currentControls()` [C7], which widgets do not offer us today (ADR-007 s4.1).
- Privacy: an intent's `authenticationPolicy` can require unlocking; `privacySensitive()` redacts the state, title and value while locked [C2].
- Feedback: a button's `actionLabel` closure takes a `Bool` (its pending state) [C4]; the HIG asks a button whose action takes time to "animate indefinitely while the action performs" [C3]; `controlWidgetStatus(_:)` shows "momentary status text in Control Center" [C2]; `displayName` and `controlWidgetActionHint` give the Action button's hint ("Hold to ...") [C2].

**Not on a saved page, settled by step C0 (section 9):** which process runs a control's `AppIntent` on iOS 18 to 26. For widget buttons Apple says "By default, the system runs the app intent in the same process as the widget extension" (ADR-011 s4, [A3]), and ADR-011 compiles the button intent into the extension only, so the extension is its one target. This plan assumes the same for controls and checks it on a phone. Also not on a saved page: any time limit on a control's `perform()`, and the memory a control-launched extension process gets.

## 2. The diagram: a control, from adding it to a tap

Drawn by hand as text.

```text
  pywidget (app)                         App Group                            iOS + widget extension
  ---------------                        ---------                            ----------------------
  Project page > Controls                                                     Person adds "Run Python" in
  [title] [symbol] [tint]   -- save -->  controls/controls.json  <-- query --  Control Center / Lock Screen /
  [value: state key]                     (canonical bytes, v)                  Action button; iOS asks which
  [what it runs: WidgetAction]                                                 control (ControlEntity) [C2]
                                         widgets/<id>/state.json                        |
                                         (ADR-011 s7, step 6a)  <-- read -- currentValue(configuration:)
                                                                               -> symbol, title, value, tint,
                                                                                  isOn, mode, v   (no Python)
                                                                                        |
                                                                                   person taps
                                                                                        |
                         +--------------------------------------------------------------+
                         |                              |                               |
                 iOS 18-26, lane fits           iOS 18-26, does not fit          iOS 27+
                 (2xP <= W, timeout+T <= 2 s)   (or not a `run` action)          (any widget)
                         |                              |                               |
             ControlRunIntent.perform()        ControlOpenIntent (OpenIntent)   ControlRunAppIntent
             in the extension:                 pywidget comes forward,          .main, .background:
             re-read lane state, check v,      routes or runs in the            app process, no screen
             take run.lock, run handler        foreground (5 s cap)             change (30 s limit)
             + write state (2.0 s budget)               |                               |
                         |                              |                               |
                         +------------- state.json committed, run.lock released --------+
                                                        |
                                 perform() returns -> iOS asks currentValue() again [C1]
                                 app runs also call ControlCenter.reloadControls(ofKind:) [C7]
```

Where it sits in the plan's phase order:

```text
 B ---- C (tap choice: ADR-011 1,2,3,8) ---- D  the Builder (its slot; untouched) ---- Pages ------------------------------------- E
                                                                                       ADR-011 4,5,6a,6,9 (buttons)  ->  C0..C5 (controls, 2.8 wk)
```

## 3. The control's settings and how they are stored

A control is its own **output** of a project, beside widgets and Pages (ADR-011 rule 3: one setting per output, shared by every placement of it). It belongs to one widget output, whose declared actions it may run and whose state it shows, because ADR-011 s7 runs only an action that widget declares and its run writes that widget's `state.json`.

In the project manifest (phase C's `pywidget.json`), `formats` gains `"controls": 1`:

```json
"outputs": {
  "water": {"kind": "control", "control": "button", "widget": "today",
            "action": {"do": "run", "function": "add_glass", "args": {"ml": 250}},
            "title": "Add a glass", "symbol": "drop.fill", "tint": "#2F7BF6", "value": "glasses"},
  "heater": {"kind": "control", "control": "toggle", "widget": "home",
             "action": {"do": "run", "function": "set_heater"}, "on": "heater_on",
             "title": "Heater", "symbol": "flame.fill", "symbol_off": "flame", "tint": "#E5533D"}
}
```


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 3. The control&#x27;s settings and how they are stored, scrolls sideways" style="--tw:470px" markdown="1">

| Field | Rule |
|---|---|
| `control` | `button` or `toggle`; anything else makes the whole output bad |
| `widget` | a widget output id in the same project |
| `action` | ADR-011's `WidgetAction`, read by the same Swift reader and Python mirror (rule 2). A button takes any of the six `do`s; a toggle takes only `run`, because `SetValueIntent` hands it the new value [C1] |
| toggle `args` | the person's `args` plus `on`: `1` or `0` (ADR-011 L2 allows only finite numbers, so not `true`/`false`); `args` that already name `on` are refused at save |
| `on` (toggle) | a key of the widget's state whose value is the switch's state: `true`/`false`, or a number (non-zero is on). Missing or another type reads as off |
| `value` | optional key of the widget's state shown as the value text: a string or finite number, cut to 20 characters. For a toggle with no `value`, iOS's own on/off text |
| `title` | 1 to 24 characters (DRAFT limit, Maren's to set); shown only at larger Control Center sizes [C2] |
| `symbol`, `symbol_off` | an SF Symbols name, checked at save in the app (`UIImage(systemName:)` on that phone's iOS); a name the extension cannot draw falls back to `bolt.circle` (DRAFT). The HIG asks toggles for both states' symbols [C3]. No person-made symbols: custom symbols are built into the app [C1] |
| `tint` | `#RRGGBB`; absent means the app's accent colour [C2]. "Match my widget" copies the widget's accent |

</div>


The extension never reads the manifest; the app writes the App Group cache `controls/controls.json` on save (one rename, each action as its canonical bytes, as `actions.json` is in ADR-011 s10). The control's `v` is ADR-011 s6's: the first 8 hex digits of SHA-256 over the action's canonical bytes.

The system's configuration sheet has one parameter, the control (a `ControlEntity` listing the person's controls of that kind from `controls.json`), with `promptsForUserConfiguration` so iOS asks when it is added [C2]. The look is not a system-sheet parameter: symbol, title and tint come from the pywidget control, so one control placed in three places looks the same in all three, and an edit in pywidget reaches every placement at the next reload.

**What the Builder sets.** Exactly the table's look fields: symbol (and the off symbol for a switch), title, value text (which state key), tint (with "Match my widget"), plus what it runs. In 1.0 they are a form on the project page, drawn by Maren (step C4); a Builder block for a control is not counted here and does not enter the Builder's slot. A preview in that form draws the control with iOS's own template sizes where the SDK allows; where it cannot, it shows a labelled approximation, never a claim that it is exact.

## 4. Where the script runs, and its memory and time limits

The same rule as a widget button (ADR-011 s4), with a control's place in place of a button's:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4. Where the script runs, and its memory and time limits, scrolls sideways" style="--tw:960px" markdown="1">

| Action | iOS 18 to 26 | iOS 27+ |
|---|---|---|
| `page`, `code`, `home`, `link`, `app` | `ControlOpenIntent` (an `OpenIntent`, both targets [C1]): pywidget opens and routes as ADR-011 step 3 does | same |
| `run`, widget in the lane and `timeout` + T <= 2.0 s | **In the widget extension:** `ControlRunIntent` (button) or `ControlSetIntent` (toggle), compiled into the extension only, running ADR-011 step 6's in-widget path | **In pywidget, in the background:** `ControlRunAppIntent` / `ControlSetAppIntent`, `allowedExecutionTargets` `.main` [A5], `supportedModes` `.background` [A6], as `RefreshWidgetIntent` does today |
| `run`, otherwise | `ControlOpenIntent`: pywidget opens and runs it in the foreground, then shows ADR-011's one-line result | as the row above |

</div>


- **Who decides.** `currentValue()` reads the widget's lane state (`.lane-demoted.json`, `lane-peak`, the declared `timeout`, T) from the App Group, as the renderer does for a button, and the content closure picks the intent. A toggle that cannot run in place is drawn as a button that opens pywidget (a toggle's action must be a `SetValueIntent` [C1]), with value text "Opens pywidget" (DRAFT). Whether one control's content closure may pick between two intent types is not on a saved page; step C0 checks it, and if it cannot, each kind ships as two controls in the gallery, "Run Python" and "Open and Run Python" (DRAFT), and the in-place one shows "Open pywidget to run" as its value when the lane refuses.
- **The run, in the extension.** `perform()` does what ADR-011 s4 "The run" does: re-reads the lane state and <span title="A test written in advance. If it fires, we drop the idea.">kill</span> marker, runs the margin check, recomputes `v` from `controls.json` and runs nothing if it differs from the intent's, takes the widget's `run.lock` (ADR-011 s7, H2), runs the handler and commits `state.json` under one 2.0 s budget, and releases the lock before returning [C1]. The intent carries only the control id and `v`; the action and its `args` come from the files, never from the intent, so no signature is needed (a link is never involved). `isDiscoverable` is false, so Shortcuts does not list it.
- **No render.** A control draws no view tree, so its run is the handler only; `currentValue()` reads `state.json` and never starts Python. That leaves more of the 2.0 s for the handler than a widget button has. Whether the widget that owns the control should also re-render after a control run: yes, by the app's or extension's existing reload of that widget, outside the control's budget.
- **Memory (ADR-007 s3, s6).** The extension's budget W is what T-2097's bench (LaneRestBench, on main since b3131df07) read on a phone: `available_mb` 23.0 to 25.2 MB at rest in 44 cold extension processes, iPhone 15, iOS 26.6.2, footprint 4.8 to 7.0 MB, none zero (`research/inbound/231/20261113T153754-lane-rest.jsonl`, 11-09 to 11-13), so P <= 11 MB at the 2x margin. Two figures are not read yet: the oldest supported phone (T-2196, phase B) and **a process iOS starts for a control's action**, which may differ from one started to render a widget. Step C5 reads it with the same bench and a new `step: "control"` row; until then a control uses the widget's W and the same margin, and a control in a process with less headroom is refused (`oom_guard`) and falls to its open form at the next reload, as a button does.
- **Time.** 2.0 s budget in the extension (ADR-007 s5: deadline 4 s); handler `timeout` ceiling 5.0 s for foreground app runs (ADR-011 s7); iOS 27 background runs inside the 30 s background limit L5 s10 read from Apple's `LongRunningIntent` page. No control-specific limit is on a saved page; C5 measures tap to committed state.
- **Concurrency.** A control and a widget button of the same widget share `run.lock`, so they never commit over each other; the loser is `busy` (ADR-011 s7).
- **Unlock.** The run intents set `authenticationPolicy` `.requiresAuthentication` [C2], so on a locked phone iOS asks for Face ID or the passcode first. The value text is `privacySensitive()` [C2] by default, since a state value may be personal. A "run without unlocking" choice is a second intent type with another policy (the policy is a property of the type); it is not in the first version and is listed in section 10's choices.
- **What a refused or failed run shows.** A control has no badge. A refusal (`oom_guard`, `demoted`, `busy`) or an error writes ADR-007's run-log row (trigger `control_action`, new) and the status text "Didn't run" (DRAFT) via `controlWidgetStatus` [C2]; the next reload draws the open form where the cause is the lane. While a run is in progress the button's `actionLabel` shows its pending state and the symbol animates, as the HIG asks [C3, C4]. A failed toggle run commits nothing, so the reload after `perform()` shows the true state, not the tapped one.
- **Reloads.** After any `state.json` commit (app or extension, control, button or render), the committer calls `ControlCenter.shared.reloadControls(ofKind:)` for both kinds [C7], so a control showing a widget's state follows it. Saving a control's settings does the same.

## 5. Shared with ADR-011, and what is new

Reused unchanged: `WidgetAction` and its Python mirror (step 1), the manifest's `formats` pattern (step 2), opening routes (step 3), the Python action run and `REQUEST_KEYS` `action` (step 5, Pernille), `state.json` and `run.lock` (step 6a), the in-widget run path and the iOS 27 app-intent pattern (step 6). New: the `control` output and its cache, `ControlEntity` and its query, the two `ControlWidget`s and their value provider, four or six intent types, the toggle's `on` argument, the `control_action` trigger, reload calls after commits, the settings form, and the phone checks. ADR-011 needs a dated line (rule 2 made current, a control as a place) and ADR-007 s4.1's T5 one for controls; both come with step C1.

## 6. Python side (Pernille's, beside the slot)

No new `pywidget_ui` API is needed in the first version: a control runs a declared `@widget.action` handler (ADR-011 s7) and reads the state it returns. Needed: an API.md section "Controls" (what a handler gets from a toggle, `args["on"]` as `1` or `0`; that a control's run has no render; that `timeout` + T <= 2.0 s decides where it runs), and tests that a handler receives `on` and that a toggle handler returning `None` keeps the state. About a day; Idris reviews.

## 7. Design (Maren's, beside the slot)

Frames in Paper and Studio for the project page's Controls rows and form (kind, what it runs, symbol picker, title, value key, tint with "Match my widget"), its empty state, the preview, and the DRAFT strings: the gallery names and descriptions, the Action button hints (`controlWidgetActionHint`, verbs first [C2]), "Didn't run", "Opens pywidget". About three days, before step C4.

## 8. Phone proof plan

On a Release gate build (as T-2196's), one Investor iPhone per row where named. Evidence: screen recordings and the App Group's run log and `lane-rest.jsonl`, saved under `research/inbound/<issue>/` and noted in this plan.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 8. Phone proof plan, scrolls sideways" data-n="1" style="--tw:998px" markdown="1">

| # | Check | Phone | Passes when |
|---|---|---|---|
| P1 | Which process runs a control's run intent on iOS 18 to 26 | iPhone 15 (iOS 26) | 10 of 10 in-place runs' rows have `process` PyWidgetExtension, and the app is not launched (no app launch row) |
| P2 | Memory in a control-launched process | iPhone 15, then the oldest supported phone | n >= 6 cold `step: "control"` rows with `available_mb` > 0; the lowest is compared with W and, if lower, becomes the control's own W by Ines's chair line |
| P3 | Time from tap to committed state | iPhone 15 | 20 taps of a Countdown-sized handler: all `ok` inside 2.0 s; the median and worst saved |
| P4 | Locked phone | any; and an Action button phone | Lock Screen control and Action button on a locked phone ask for Face ID or passcode, then run once; redacted value while locked |
| P5 | Fallbacks | iPhone 15 | an app-lane widget's control opens pywidget and runs; a demoted one shows "Didn't run" then its open form; a toggle that cannot run in place opens pywidget |
| P6 | Toggle truth | iPhone 15 | on and off follow the state 10 of 10; a handler that raises leaves the switch showing the old state after the reload |
| P7 | Look and VoiceOver | iPhone 15; Action button phone | symbol, title, value and tint at each Control Center size; Dynamic Island shows symbol and value in the tint; VoiceOver reads title and value |
| P8 | One commit per widget | iPhone 15 | 50 alternating taps of a control and the same widget's button: no lost commit, every refusal has its `busy` row |
| P9 | iOS 27 | a phone on 27, if any | a background run with no screen change; skipped and noted if no phone has 27 |

</div>


## 9. Proposed build lines (text for Ines; not on the board)

Each a step of the Widgets feature, added when it starts, after ADR-011 steps 1, 2, 3, 5, 6a and 6 have landed. Reviewer per merge (Commandment 13): Pernille for Idris's steps.

- C0. `[spike] Check controls before building them` \| Idris: a throwaway control on the Simulator and the iPhone 15: an extension-only intent as a control's action and the process it runs in (P1's question), whether one content closure may pick between two intents, `OpenIntent` from the extension, `authenticationPolicy` on the Lock Screen. Done when: answers noted in this plan, the throwaway archived, nothing on main. 1 day (0.5 to 2).
- C1. `[build] Store controls in the manifest` \| Idris: the `control` output, `formats.controls: 1`, section 3's checks in Swift and the Python mirror, `controls/controls.json` on save, `ControlEntity` and its query; ADR-011 and ADR-007 dated lines. Done when: tests: both readers refuse the same bad-control table; a project with controls survives the move; a newer format is refused in words. 2 days (1 to 3).
- C2. `[build] Draw Run Python and Python Switch` \| Idris: two `ControlWidget`s with `AppIntentControlConfiguration`, the value provider reading `controls.json` and `state.json`, symbol, title, value, tint, `privacySensitive`, pending label, `promptsForUserConfiguration`, names, descriptions and hints. Done when: seen: on the Simulator, both kinds added and configured, at every Control Center size, light and dark; tests for the value provider's table. 3 days (2 to 5).
- C3. `[build] Run a control's action` \| Idris: the in-extension run intents on ADR-011 step 6's path, the toggle's `SetValueIntent`, `ControlOpenIntent`, the iOS 27 app types, `.requiresAuthentication`, `control_action` rows and status text, reloads after every commit. Done when: tests: a stale `v` runs nothing; a refusal writes its row; the 18 to 26 run intents stay out of the app target; a toggle failure commits nothing. 4 days (2 to 7).
- C4. `[build] Build the Controls setting` \| Idris, after Maren's frames: the project page's rows and form, symbol check at save, "Match my widget". Done when: seen: on the iPhone, a control made, placed, and edited, with the placed control updating. 2.5 days (1.5 to 4).
- C5. `[measure] Check controls on phones` \| Idris: section 8's P1 to P9. Done when: readings saved under research/inbound/ and noted here. 1.5 days (1 to 3).
- Beside the slot: `[design] Draw the Controls setting` (Maren, about 3 days, before C4); `[build] Controls in API.md and tests` (Pernille, about 1 day, before C3).

## 10. Weeks

On the iOS slot (Idris), in slot days of five to the week, as plan.md counts the ADR-011 steps:


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 10. Weeks, scrolls sideways" style="--tw:590px" markdown="1">

| Step | Likely | Range |
|---|---|---|
| C0 spike | 1 | 0.5 to 2 |
| C1 manifest and entity | 2 | 1 to 3 |
| C2 draw the two controls | 3 | 2 to 5 |
| C3 run the action | 4 | 2 to 7 |
| C4 the setting | 2.5 | 1.5 to 4 |
| C5 phones | 1.5 | 1 to 3 |
| **Total** | **14 days = 2.8 weeks** | **8 to 24 days = 1.6 to 4.8 weeks** |

</div>


Beside the slot, not counted (as the method counts Maren's and Pernille's ADR-011 steps): Maren about 3 days, Pernille about 1.

**Why this small.** ADR-011's steps carry the hard part: the action type, the state commit across two processes, the lock, and the in-widget run. Controls add a new system surface on top of them. The figure assumes those steps have landed; started before them, controls would build half of them again.

**Where it lands.** My recommendation: **1.0, in the Pages phase, after ADR-011 step 9** (the widget buttons' phone check), before phase E. It never runs before the Builder's first phone proof, which fixes the firm date (#270 A), and it takes no day of phase D's slot. On the cautious count it moves the release by its slot weeks, about 2.8 (1.6 to 4.8); Ines turns that into dates with `ops/plans/T-4266-release-range.py` and reports it. The other choice, **1.1**, costs 1.0 nothing and ships controls with 1.1's first iOS work. Which one is the Investors' to answer when Ines reports.

**Cheaper choices, for Ines to offer with the date.**
- *Button only, the switch later:* about 0.5 weeks less (C2 1 day, C3 1 day, C5 0.5 days). The switch needs its `on` key and the truth check (P6); the button covers "run my script from Control Center".
- *Always open pywidget to run (no in-place run on iOS 18 to 26):* about 1 week less, but every control then opens the app, against Apple's first best practice, "Offer controls for actions that provide the most benefit without having to launch your app" [C3]. Not recommended.
- *Run without unlocking:* about 1 day more, a second intent type per kind with another `authenticationPolicy`, and a setting saying what it allows. Not in the figure.

**What would make this fail.**
- A control's intent runs in the app on iOS 18 to 26 rather than the extension (C0, P1): the in-place run would launch pywidget in the background, which the 18 to 26 SDK has no way to keep unseen for us (ADR-011 s4 "Rejected"); controls would then open pywidget on 18 to 26, the cheaper choice above, and the figure falls.
- A control-launched process has far less memory than W (P2): fewer controls run in place; the design holds, the feel changes.
- One content closure cannot pick between intents (C0): two gallery entries per kind, about a day more inside C2's range.
- ADR-011's steps 6a or 6 slip or change: controls wait on them.

## 11. Sources

Apple, saved signed out under the #64 ruling (`research/inbound/apple/index.tsv`), fetched 2026-11-19 for this task:
- [C1] Creating controls to perform actions across the system, https://developer.apple.com/documentation/widgetkit/creating-controls-to-perform-actions-across-the-system.md, `research/inbound/apple/developer.apple.com/documentation_widgetkit_creating-controls-to-perform-actions-across-the-system.md-f2e423d9.html`.
- [C2] Adding refinements and configuration to controls, https://developer.apple.com/documentation/widgetkit/adding-refinements-and-configuration-to-controls.md, `research/inbound/apple/developer.apple.com/documentation_widgetkit_adding-refinements-and-configuration-to-controls.md-ebef944b.html`.
- [C3] Human Interface Guidelines, Controls, https://developer.apple.com/design/human-interface-guidelines/controls.md, `research/inbound/apple/developer.apple.com/design_human-interface-guidelines_controls.md-c03fc9c0.html`.
- [C4] `ControlWidgetButton` (iOS 18.0+), https://developer.apple.com/documentation/widgetkit/controlwidgetbutton.md, `research/inbound/apple/developer.apple.com/documentation_widgetkit_controlwidgetbutton.md-40546b7b.html`.
- [C5] `ControlWidgetToggle`, https://developer.apple.com/documentation/widgetkit/controlwidgettoggle.md, `research/inbound/apple/developer.apple.com/documentation_widgetkit_controlwidgettoggle.md-c61ba634.html`.
- [C6] `AppIntentControlConfiguration`, https://developer.apple.com/documentation/widgetkit/appintentcontrolconfiguration.md, `research/inbound/apple/developer.apple.com/documentation_widgetkit_appintentcontrolconfiguration.md-239c01cf.html`.
- [C7] `ControlCenter`, https://developer.apple.com/documentation/widgetkit/controlcenter.md, `research/inbound/apple/developer.apple.com/documentation_widgetkit_controlcenter.md-81806bca.html`.
- Saved earlier, cited through ADR-011 s12: [A3] Adding interactivity to widgets and Live Activities; [A5] `IntentExecutionTargets`; [A6] `IntentModes`.

Company sources: `log/rulings.md` 2026-11-18 12:09 AM; ADR-011 s1, s4, s6, s7, s10, s13; ADR-007 s3, s4.1, s5, s6; plan.md's chair notes of 11-15 10:00 PM (the slot-day method, the phase order) and 11-17 1:18 PM, its "Maybe later" table; `ops/milestones.json` (phase D, Pages, release rows, as of 11-18); `research/inbound/231/20261113T153754-lane-rest.jsonl` (T-2097's bench on a phone); `pywidget/ios/Shared/RefreshWidgetIntent.swift` (the iOS 27 split by OS), `pywidget/ios/App/Intents/RunScriptIntents.swift` (`ScriptEntity`, app-only Shortcut runs), `pywidget/ios/Widget/PyWidget.swift` (the bundle that gains the two controls). The app has no `WidgetAction` type yet (ADR-011 step 1 is not built); this plan reads nothing from code that does not exist.
{% endraw %}

</div>
