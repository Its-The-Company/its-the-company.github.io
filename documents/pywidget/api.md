---
layout: "default"
title: "pywidget.prompts: native prompts from scripts (API v1)"
section: "documents"
description: "Code: pywidget/ios/App/Runtime/pywidget/prompts.py, stub prompts.pyi beside it. Wire: pywidget/tests/prompts/fixtures/prompt_calls.json (61 cases, written by prompt_calls_build.py; its rules are the wire contract). Host\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/api.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/design/prompts/API.md</code></span></div><h1>pywidget.prompts: native prompts from scripts (API v1)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Owner: Pernille (Python half, T-0446). Swift half: Idris (T-0447). Sources: ADR-001 3.1 C5 "Native UI from scripts" and the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> ruling of 2026-10-27 10:05, item 3; bridge contract s4 (DeviceCall) and s9 (shared fixtures); IDE spec s3 "Prompts" (how each kind is drawn). Status: **proposed**; Idris reads it before T-0447 starts.

Code: `pywidget/ios/App/Runtime/pywidget/prompts.py`, stub `prompts.pyi` beside it. Wire: `pywidget/tests/prompts/fixtures/prompt_calls.json` (61 cases, written by `prompt_calls_build.py`; its `rules` are the wire contract). Host tests: `pywidget/tests/prompts/test_prompts.py`.

## 1. The name

**Proposed: `pywidget.prompts`**, used as `from pywidget import prompts`.

- It is the word the IDE spec already uses for this row (s3 "Prompts"), and what a user would search for.
- It sits with the other device modules (`pywidget.clipboard`, `pywidget.files`) and reads as one thing: "the prompts".
- It is not `pywidget.ui` (reads as the widget DSL `pywidget_ui`), and not `dialogs` or `console`: those are the abandoned app's module names, and any compatibility with them is L15's human legal checkpoint, not this module. No function here copies one of their names or signatures (`hud_alert`, `input_alert`, `list_dialog`, `form_dialog` are not used).
- Second choice, if Maren or Idris finds `prompts` wrong: `pywidget.ask` (`ask.text("Name")` reads well, but `ask.hud` does not).

Plain descriptive name, no coined feature name: inside the style guide, no <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> request needed.

## 2. One rule for cancel

**Cancel returns None.** For every kind that waits for a person: the Cancel button, a swipe down on a sheet, a tap outside a confirmation dialog on iPad. Why None and not an exception: most scripts that ask want `if name is None: return`, and a `try` around every prompt is noise for a script that is ten lines long. An empty answer is never None: `text()` returns `""`, `pick(multiple=True)` returns `[]`. `hud()` returns None always; it cannot be cancelled.

## 3. Where a prompt can appear

Only in a run started from PyWidget itself (run context `app`: the console, or a project opened from its Home Screen shortcut). In a widget run, a Shortcut run or a gallery preview nobody is there to answer, so every call raises **`NotAvailableHere`** (a `RuntimeError`) **at once, before anything is sent to Swift**, with `.context` set to `"widget"`, `"shortcut"` or `"preview"`:

```
prompts.text can't show anything in a Shortcut run: nobody is there to see it.
fix: Check prompts.available() first and use a default value when it is False.
```

A widget run started from the Refresh button in PyWidget is still a widget run: refused. Swift checks the context again (C2 1.5) and answers the same error, with the same `fix` line, if a call ever reaches it.

**No run going on** (T-0463): the runner clears the run context when a run ends. A thread that outlives its run (a daemon thread still asking after the script's main code returned) gets `NotAvailableHere` with `.context` `""`, and nothing is sent; Python checks once before the flush and again after it <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the input lock, so a run that ends while a thread waits for the lock is refused too. Before this, such a call went out with run id 0, which no Stop can wake, and held the input lock for up to 86,400 s, so the next run's `input()` waited behind it.

```
prompts.alert can't show anything: the run that asked has ended.
fix: Ask before the script ends: join the thread that asks, or ask from the main thread.
```

On a Mac without the PyWidget runtime a call is `Unsupported`, as for every device module.

`available() -> bool`: True only where a prompt can be shown. A script that runs in both places:

```python
people = prompts.number("People", maximum=20) if prompts.available() else 2
```

## 4. Waiting, Stop, threads

Every call blocks the script's thread on `_pwbridge.call("prompts", kind, ...)` exactly as `input()` blocks on `request_line`. Before it asks, it flushes stderr then stdout, so what the script printed is in the console before the prompt appears. It holds the runtime's input lock, so an `input()` sheet and a prompt (or two prompts from two threads) are never up at once. **Stop** while a prompt is up: Swift dismisses it, the wait ends as `KeyboardInterrupt`, the run ends `interrupted`. The wait is 86,400 s, <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> by the run's time budget (contract s4); at the cap Swift dismisses the prompt and Python raises `BridgeTimeout`. `hud()` waits at most 10 s, for the HUD to appear.

## 5. The calls

Argument errors are `TypeError` or `ValueError`, raised on the caller's line, before the context check, so a bad call fails the same way everywhere. Labels (buttons, options, items, field labels) are non-empty text, up to 200 characters, each different within one call; titles, messages and defaults up to 4,000.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 5. The calls, scrolls sideways" style="--tw:960px" markdown="1">

| Call | Returns | Drawn as (IDE spec s3) |
|---|---|---|
| `alert(title, message="", *, buttons=("OK",), destructive=None, cancel=None)` | label of the button tapped; None for `cancel` | system `.alert`; 1 to 3 buttons; `destructive` (one of `buttons`) in danger; an alert with a destructive button must have `cancel` (Apple's rule; ValueError otherwise) |
| `text(title, message="", *, default="", placeholder="", secure=False, keyboard="text", done="OK")` | the text typed; None | alert with a text field, Cancel and `done` (the drawn "Save"); `keyboard`: `"text"`, `"email"`, `"url"`; `secure` hides the typing |
| `number(title, message="", *, default=None, decimals=False, minimum=0, maximum=None, placeholder="", done="OK")` | `int`, or `float` with `decimals=True`; None | alert with a field, Cancel and `done`: `.numberPad`, `.decimalPad` with `decimals`, `.numbersAndPunctuation` when `minimum` is None or below 0 (the pads have no minus key). Not a number, or out of range: asked again, same title, the message plus one line saying why ("Type a number from 0 to 20."), the typed text kept. The default is sent without an exponent (`1e-7` goes as `"0.0000001"`); a default longer than 40 characters on the wire is a ValueError, since nobody could type it back |
| `choose(title, options, *, message="", destructive=None)` | the option chosen; None | `.confirmationDialog` with 2 to 6 options and Cancel |
| `pick(title, items, *, multiple=False, selected=())` | the item tapped; with `multiple`, the items ticked in list order (`[]` if none); None | searchable `List` in a sheet, up to 2,000 items; `selected` ticked when it opens |
| `form(title, fields, *, message="", done="Done")` | `{key: value}`; None | sheet with a `Form`, Cancel / `done`; 1 to 20 fields; a number out of range asks again with the reason under the title |
| `hud(text, *, symbol=None, seconds=1.5)` | None, once it is on screen | a HUD that goes by itself; `symbol` `"done"`, `"failed"`, `"info"` or None; `seconds` 0.5 to 10 |
| `available()` | bool | nothing |

</div>


Form fields (frozen dataclasses; `key` is a Python name such as `"amount"`):


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 5. The calls, scrolls sideways" style="--tw:640px" markdown="1">

| Field | Value in the result |
|---|---|
| `TextField(key, label, default="", placeholder="", secure=False)` | str |
| `NumberField(key, label, default=None, decimals=False, minimum=0, maximum=None)` | int or float; None if left empty |
| `ToggleField(key, label, default=False)` | bool |
| `ChoiceField(key, label, options=(), default=None)` | the option chosen, or None |
| `DateField(key, label, default=None, with_time=False)` | `date`, or a local `datetime` with `with_time`; default None starts at today |

</div>


```python
from pywidget import prompts

entry = prompts.form("New expense", [
    prompts.TextField("what", "What"),
    prompts.NumberField("amount", "Amount", decimals=True),
    prompts.ChoiceField("who", "Who paid", ["Ada", "Bo"]),
    prompts.DateField("day", "Day"),
])
if entry is not None:
    print(entry["what"], entry["amount"])
    prompts.hud("Saved", symbol="done")
```

Errors from `pywidget.errors`: `NotAvailableHere` (section 3), `BridgeTimeout`, `RuntimeError` for a reply of the wrong shape (a PyWidget bug), `KeyboardInterrupt` on Stop.

## 6. For the Swift half (rows for Idris)

The wire is the fixture's `rules` (10 of them) and cases. The points that are Swift's to do:

1. Numbers cross the wire as text with `.` as the decimal point, in both directions, and the rule is the same both ways (fixture rule 4, T-0462). **Showing** a wire number in a field (a number prompt's default, a number field's default, the typed text sent back when Python asks again): every `.` becomes the locale's decimal separator, and no grouping is added (`de_DE` "84.2" shows "84,2"; "1234.5" shows "1234,5"). **Reading** the field at Done: the locale's grouping separator, spaces, U+00A0 and U+202F are removed, then its decimal separator becomes `.` (`de_DE` "1.234,5" sends "1234.5"; `fr_FR` "1 234,5" sends "1234.5"). So an untouched field comes back as exactly the text it was given, in every locale. The failure this prevents: a `de_DE` field given "84.2" as it is reads "." as grouping and sends "842", which Python accepts with no error, and the `de_DE` decimal pad has no "." key to correct it. Python parses and range-checks; Swift does not validate. The fixture's `locale_numbers` lists both directions for `en_US`, `de_DE` and `fr_FR`; the cases with `given.locale` (`de_DE`, `fr_FR`) are the ones the XCTest suite runs in that locale, and each exchange's `screen` says what a number field shows when it opens and holds when Done is tapped.
2. A refused context answers `NotAvailableHere` with `context` and Python's own `fix` line (each refused case's `swift_check`), and never presents anything. A call whose run id is 0 or not the current run's is refused too (T-0464); Python no longer sends one after its run (section 3), but a call already waiting when its run ends is Swift's to dismiss.
3. Stop dismisses the prompt and posts Stop to the slot; at the call's timeout the prompt is dismissed too.
4. `hud` answers `{"shown": true}` when it is on screen, not when it goes.
5. Indices on the wire, labels in Python: Swift never needs to compare strings.
6. Open: the iPad presentation of `choose` (popover anchor) and whether a form's reason line sits in the header or as a footer of the first bad field. Python sends it as the form's `message`; either works.

## 7. Changelog

- v1, 2026-10-27 (T-0446): every kind, cancel rule, context refusal, wire and 50 shared cases.
- v1.1, 2026-10-27 (T-0462, T-0463, T-0466 after Idris's review T-0459): rule 4 both ways, with `de_DE` and `fr_FR` cases and `locale_numbers`; a call with no run going on is refused; `text()` and `number()` take `done`; number defaults never have an exponent; Swift's refusal carries Python's fix line; cases for a negative minimum and a runner-level preview refusal; the mutants are committed in `pywidget/tests/prompts/mutants.json`. 61 cases.
{% endraw %}

</div>
