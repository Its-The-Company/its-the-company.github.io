---
layout: "default"
title: "T-1662: independent review of T-0543 at 5accafbee (L1 host slice, Idris&#x27;s 6ce0b3410)"
section: "documents"
description: "Verdict: passes with fixes. The Python floor and length checks match item 7&#x27;s values and fire before any call is sent. Two Low defects (a test that does not hold the boundary, a wrong error for a non-str thread) and one\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t-1662-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/T-1662-pernille.md</code></span></div><h1>T-1662: independent review of T-0543 at 5accafbee (L1 host slice, Idris's 6ce0b3410)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. 2026-11-03. Base: 5accafbee (no change to the five files between 5accafbee and this branch's
HEAD). Read: `git show 6ce0b3410`; bridge-contract s4 items 5 and 7; runtime `pywidget/notifications.py`
`schedule` and `_limits`; `_wire.number`, `text`, `name`; the stub `schedule`; both new tests. Swift L1-L5 are not
written and were not reviewed; Xcode not run.

**Verdict: passes with fixes.** The Python floor and length checks match item 7's values and fire before any call
is sent. Two Low defects (a test that does not hold the boundary, a wrong error for a non-str `thread`) and one
Medium in the contract: the per-run <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> as written does not deliver what item 7 says it does.

## Tests run

- `tests/device/test_device_modules.py` (27 tests) and `ios/python-stubs/tests/test_stubs.py` (34 tests), both
  green on host CPython 3.9.6 and 3.13.
- Mutants planted in a `git archive 5accafbee` scratch copy (/tmp, not kept):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Tests run, scrolls sideways" style="--tw:576px" markdown="1">

| mutant | device test | stub test |
|---|---|---|
| R1 runtime `len(v) > most` to `>=` | **survives** | n/a |
| R2 runtime `wait < MIN_AFTER_S` to `<=` | **survives** | n/a |
| R3 runtime first `_limits` call removed | killed | n/a |
| R4 runtime second `_limits` call removed | survives (redundant call) | n/a |
| R5 runtime floor removed | killed | n/a |
| S1 stub `len(v) > most` to `>=` | n/a | killed |
| S2 stub `after < MIN_AFTER_S` to `<=` | n/a | killed |

</div>


## Findings

**F1 (Low, test). The runtime test checks only across the boundary, never at it.**
`tests/device/test_device_modules.py:228-236` sends title 101, body 501, thread 129 and after 0.5 and expects
`ValueError`; nothing sends title 100, body 500, thread 128, after 1.0 and expects the call to go out. So R1 and R2
pass: a runtime that refused a 100-character title or `after=1` would ship green. The stub test has the accepting
call (`test_stubs.py:186`); the runtime test needs the same through `Replay` with one staged `schedule` reply.
Board line T-1670.

**F2 (Low, error text). A non-str `thread` gets the wrong error.** `notifications.py:87` calls
`_limits(title, body, wait, thread)` before `_wire.text("thread", thread)` at :98. Measured: `thread=5` raises
`TypeError: object of type 'int' has no len()` (no argument named), and `thread=["x"]*200` raises
`ValueError: thread is 200 characters; the most is 128` for a list. Fix: pass `None` for thread in the first call;
the second call at :99 already checks it after the type check. Not a crash: both reach the script as Python
exceptions. Also in the stub (`python-stubs/pywidget/notifications.py:59-62`, older than this commit):
`after=float("nan")` passes both `after <= 0` and `after < MIN_AFTER_S`, where the runtime refuses it in
`_wire.number`. Board line T-1671.

**F3 (Medium, contract s4 item 7). A per-run cap does not bound what a script holds.** Item 7 says the cap of 16
per `run_id` means "a script never holds more than a quarter of the 64". It does not: the counter starts again at
every run, and a widget script runs on every timeline refresh. A script that schedules 16 fresh ids per run fills
all 64 pending slots in four runs, which is the starvation Odalys's T-0529 review found. The cap that keeps the
promise counts the script's pending requests (identifiers under `/`, or `.editor/` for the editor) at
`schedule`, with a replacement of an id already pending not counted. A per-run count can stay as a burst limit if
wanted, but the "quarter" sentence must hang on the pending count. Board line T-1672, for Idris before the Swift
half of L1 is written.

## Agreement on item 7's values (I was asked)

- Floor on `after` 1 s, title 100, body 500, thread 128 counted in Python characters: agreed. When Swift checks
  lengths too, it must count `unicodeScalars`, not `String.count` (grapheme clusters), or a title of 100 code points
  with combining marks passes one side and fails the other.
- Per-script cap 16: agreed as a number, not as a per-run counter (F3).

## The b5 landing failure (Operator's question)

The b5 landing at 14:55 (`ops/runs/personal-land-b5.log` in the main checkout) failed
`BridgeTests.testNotificationScheduleAndCancelThroughTheBridge` (DeviceModulesSlice2Tests.swift:605-608). The
suggested cause, 6ce0b3410's checks rejecting the test's values, does not hold:

1. The test calls `_pywidget_runtime.device_call` directly, not `pywidget.notifications.schedule`, so
   `_limits` is never on its path. 6ce0b3410 changed no Swift, so there is no Swift cap or check either.
2. Its values are inside every limit anyway: title "Slice 2" (7), body "check" (5), `after` 3600, thread None.
3. The failing run printed nothing (`r.stdout == ""`), so the script failed before its first `print`, at
   `request_permission`, before `schedule` was reached. The case took 122.25 s, about `_wire.PERMISSION_WAIT_S`
   (120 s): consistent with the permission call waiting out its full wait, not with a `ValueError`.
4. The same failure is already T-1466 (Idris, P2): red on the Mac mini at 01:46 on 11-03, before 6ce0b3410 was
   written at 09:13, and tied there to the Simulator's notification permission state. I added this run's evidence
   to T-1466 as a note; no new line.

App Review: nothing in this slice. Crash: none found; every refusal is a Python exception raised before the call.
{% endraw %}

</div>
