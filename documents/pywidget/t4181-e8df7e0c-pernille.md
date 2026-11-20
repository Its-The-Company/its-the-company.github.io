---
layout: "default"
title: "Review of T-4181 at e8df7e0c (T-0972): each send asks lane.py in the app&#x27;s Python which lane the widget runs in"
section: "documents"
description: "The design is right, and it is the one I would have built. The scan runs in the app&#x27;s own Python (no Swift port) on a thread of its own. That thread takes the GIL with PyGILState_Ensure (SendLaneScan.swift:126). The\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4181-e8df7e0c-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>pywidget/docs/reviews/t4181-e8df7e0c-pernille.md</code></span></div><h1>Review of T-4181 at e8df7e0c (T-0972): each send asks <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.py in the app's Python which lane the widget runs in</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5215, Commandment 13). Author: Idris. Reviewed: e8df7e0caa as a whole. The board line names
70d84962fd, which is only an Operator records commit (one ops/lane-outbox file), so the code is e8df7e0caa. The
review covers: App/Projects/SendLaneScan.swift (new), LaneMirror.swift (`plan`, `typedLane`), WidgetScriptSave.swift
(`laneScanner`, `laneRequest`, `prefetchLane`, `sendDeciding`, `send`), PyWidgetApp.swift (`save(widget:)`,
`widgetSave`), Tests/SendLaneTests.swift and mutants-t0972.json/-results.txt. I checked it against the T-0972 and T-4181 board
lines and my earlier reviews in this area (t4181-572ddeb8 M1 and L1, t4181-b08e9352 H1 and M1, and the open lines
T-4657, T-4658, T-4819, T-4820 and T-4836 that came from them). I also read, for what the new code leans on: lane.py
(`send_lane`, `_imports`, `LANES`, `MESSAGES`); ExtensionLane.swift `LaneEntry.inLane` (:799-802); PyBridge.swift
(`isStarted`, `stuck`, `isStopping` under `lock`, and the places that hold `lock`); EditorTooling.swift (the
other GIL worker, to compare); where the app starts Python (ConsoleModel `boot`); Tests/HoldGIL.c. I did not read the
author's memory, handoff or board notes. A first command that included the T-0972 notes file was refused by the
classifier ("Undermining Oversight"). I stopped that item and did not read the notes by any other route.
Paths are under pywidget/ios/ unless they say otherwise. Line numbers are at main 3492295d65. Since e8df7e0caa only
PyWidgetApp.swift has changed (T-0048, e20f8c3ba5), and that change is away from the T-0972 lines. Date: 2026-11-20.

## Tests run

- Host, `tests/bridge/test_lane.py` on its own: 69 tests OK on 3.9.6 (103.7 s) and 69 OK on 3.13 (57.0 s).
- Host, `python3 pywidget/tests/run_host.py --both bridge`: 3.13.18 PASS, 347 tests (346.5 s). 3.9.6 TIMEOUT: the
  suite was killed at its 600 s limit with no failure printed (the load average was 66 at the time). That is no
  result, not a pass. This commit changes no Python.
- Host probe of the glue (`SendLaneScan.prepare`'s `_send_lane`, copied as written) over every value
  `LaneMirror.typedLane` can pass, on both Pythons, in my scratch copy. The answers are the same on both, and every
  row matches `LaneEntry.inLane`, except `"lane": null` (L1 below) and a text with a NUL in it (L2).
- Host mutants on lane.py `send_lane` (the rows the Swift reads), scratch copy, `test_lane.SendLaneTests` on 3.13:
  (A) a missing key read as a bad lane (`if typed not in LANES`): 6 failures, KILLED. (B) a typed "widget" wins over a
  refused import: 2 failures, KILLED.
- Swift mutants: none run. The MacBook runner only runs a commit that is on main, and this packet forbids
  XC_LOCAL=1, so a planted Swift fault cannot reach any Simulator. I checked the author's four <span title="A test written in advance. If it fires, we drop the idea.">kills</span> by reading
  each test against its mutant, and all four are sound (details under Verdict). I also worked out by reading which
  further mutants would live (M1).
- Simulator, MacBook runner: J-20261120-0239-xc-test at 3492295d65, `-only-testing` SendLaneTests, LaneMirrorTests,
  WidgetScriptSaveTests, WidgetRefusalMoveTests, WidgetRefusalRetryTests, WidgetScriptSavedPlacementTests,
  WidgetHeldIDCaseTests, WidgetMoveRaceTests, ExtensionLaneTests and LaneChoiceTests: passed, exit 0, 251 executed,
  0 skipped, 0 failures (164.3 s; ops/runs/xcodebuild-20261120-034058.log on the runner).
- Simulator, the daily full suite on the runner, J-20261120-0227-xc-test at ec63ed6caf (the first full run to include
  e8df7e0caa): exit 65, 2301 executed, 40 skipped, 2 failures. Both are UI tests, and neither is caused by this commit.
  `WidgetKitCheckTests/testETokenOnTheHomeScreen` was already red on the 11-19 daily, before e8df7e0caa (T-5047, P0).
  `testTPremadeDrawsPaperInLightAndStudioGreyInDark` came in with T-4681 (e242f87128, 11-19 5:27 AM), so this is its
  first full run. It checks premade colours, and no premade passes through the send scan (T-5218 reviews T-4681).
  Every unit test passed, the SendLaneTests among them.

## Verdict: PASS with findings (two Medium, three Low)

The design is right, and it is the one I would have built. The scan runs in the app's own Python (no Swift port)
on a thread of its own. That thread takes the GIL with `PyGILState_Ensure` (SendLaneScan.swift:126). The main
thread never touches Python. It only waits on an `NSCondition`, until a deadline (`answer`, :80-89; `sendWait` =
0.2 s, :55). The reference counting is correct. `PyTuple_SetItem` steals each new string and the `Py_GetConstant`
None. `PyDict_GetItemString` is borrowed and then increffed before `globals` drops. `PyUnicode_AsUTF8` is read
before `out` is released. `PyObject_Call` failure is cleared. The app never finalizes or restarts the interpreter
(no `Py_Finalize`/`Py_EndInterpreter` anywhere), so the cached `call` stays valid. `ready()` reads three PyBridge
flags under PyBridge's own lock, and nothing holds that lock across a Python call. So the main thread's wait is
bounded by the deadline, plus a lock that is never held long. Answers are keyed by (text, filename, typed) and
`send_lane` is a pure function of those, so a kept answer cannot go stale.

The decision matches the rows Ines ruled and T-4656 left. `LaneMirror.plan` keeps a send out when the key says so
(the same test as before, LaneMirror.swift:72-74) or when the scan says `app`. A typed "widget" over a refused
import has no mirror, and the key's bytes are left as they are (`testAHandTypedWidgetOverARefusedImportKeepsTheKey`).
No answer falls back to the key alone, which is the behaviour before this commit. T-4280's refusal path then
catches it at the first run.

My earlier findings, closed or not:
- t4181-572ddeb8 M1 (T-4819) is met by `testRefusedImportThenCleanSendPlansNoMirrorThenPutAndWritesNothing`
  (SendLaneTests.swift:172-192). It sends twice, refused then clean, checks `.put` for the clean plan, and compares
  pywidget.json's bytes, absent and present with no key, after each send. A Swift write of `"lane": "app"` would fail
  it. T-4819's owner can tick it with this test as the evidence.
- t4181-b08e9352 H1 had two guards. This is the send-time half: a top-level refused or app-only import now stays in
  the app before any run, and the person is told why. That holds only when the scan answers within 0.2 s (L3). T-4631's
  finder half was separate.
- t4181-572ddeb8 L1 (T-4820) is still open: the T-0972 line still says "Clean: `lane: widget` in pywidget.json".
  The code follows the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>, not the line.

The author's mutants all hold up on reading. (1) Dropping `scanned == .app` mirrors the no-manifest refused send,
and `testARefusedImport...` asserts there is no mirror. (2) A send that never asks gets nil, so the typed "widget" in
`testAnAppOnlyModule...` mirrors. (3) Saying the line every time gives a count of 2 in `testTheConsoleSaysTheLineOnce`,
because the second text differs, so a send happens. (4) Passing `typed: nil` turns the typed-"app" case into
`widget`, which `testATypedAppStaysWithNoLine` compares exactly.

## Findings

### M1. Nothing tests the bound that keeps the main thread from waiting on the GIL

- Where: SendLaneScan.swift:55 (`sendWait`) and :80-89 (`answer`'s deadline loop); SendLaneTests.swift:17-18 and :70
  (every live call passes `wait: 20`); :97-99 (the one short wait uses `ready = { false }`, so it returns before any
  wait). Tests/HoldGIL.c already gives `_pw_test_native.hold_gil(seconds)` (used at BridgeSlice2Tests.swift:407).
- Why it matters: `answer` runs on the main actor at every boundary send (Run, opening a file, leaving the
  foreground: PyWidgetApp.swift `save(widget:)` then `widgetSave`). This commit adds the only place where the main
  thread waits for Python. Its whole safety is the deadline. If the deadline stops working, the editor freezes for
  as long as a run holds the GIL, and a C call can hold it for seconds. The watchdog then kills the app, which is a
  crash in review. By reading, each of these mutants lives through all twelve SendLaneTests: `while answers[r] == nil
  { cond.wait() }` (no deadline), `sendWait = 20`, and `answer` taking the GIL itself. No test in the suite holds the
  GIL while a send asks. (Not run, for the reason under Tests run.)
- Fix (Idris): add a test that holds the GIL from another thread with `hold_gil(2.0)` (install `_pw_test_native` as
  BridgeSlice2Tests does). Then call the app's own scanner, `SendLaneScanner.app.answer` (so `sendWait` is
  what is tested), for a request with no kept answer. Assert nil in under 0.5 s. Then send through
  `WidgetScriptSave` and assert that the key's rule decided (a refused import with no manifest mirrors, the
  fallback), with no line. Run the three mutants above with tools/xc_mutants.py and record them in
  mutants-t0972-results.txt.

### M2. The new console line reaches people with words Maren has not reviewed

- Where: lane.py:314-315 (`MESSAGES[CODE_SEND]`, marked "T-0972's draft" at :311-312); PyWidgetApp.swift:467-473
  (the line is now said in the console after every send that keeps a widget in the app). The T-0972 line says
  "(Maren reviews the words)" and its Done list depends on it.
- Before this commit, `send_lane` had no caller in the app, so the draft reached nobody. Now any person whose
  script imports `ssl`, `pywidget.http`, `pywidget.device.location` and similar sees "main.py: This widget updates
  when PyWidget runs it, not on its own, because it uses ssl. The script was still sent." I found no record that
  Maren has seen it, and no open line asks her to: no board line, inbox message or decision names `lane_send` or
  the text. Its sister text, CODE_IMPORT, is already wrong for people (T-4836), and both may appear for the same
  script: the scan's line at the send, and the finder's at the first widget run if the scan was late (L3). They
  should be read together.
- Fix (Maren, with Idris): review CODE_SEND, with T-4836's CODE_IMPORT, as a pair. Idris updates the text and the
  tests that pin "because it uses" and "This widget updates". No lane-on TestFlight build carries the draft
  until then.

### L1. `"lane": null` is now a live case: the send says "widget", keeps no mirror, and says nothing (T-4658 L2)

- Where: LaneMirror.swift:108-113 (`typedLane` turns NSNull into the JSON `null`); the glue at SendLaneScan.swift:155
  (`json.loads("null")` is None, the same as no key); ExtensionLane.swift:799-802 (`inLane`: a null key is not
  "widget", so it stays out). Probe: `null` with `import json` gives `{"lane": "widget", "line": null}` on both
  Pythons, while `plan` keeps no mirror.
- Effect: the widget runs only in the app, `sendDeciding` returns `.widget`, and the console is silent. A person
  who wrote `"lane": null` is not told why. It is rare, because only a hand-made pywidget.json has it, and T-4658
  already holds it. This commit makes it reachable and gives T-4658 an easy place to fix it: send the raw JSON and
  let `send_lane` tell null apart from no key, or have `typedLane` map NSNull to the bad-lane row. No new line,
  noted here so T-4658's owner sees that the Swift half now exists.

### L2. A text with a NUL is scanned only up to the NUL

- Where: SendLaneScan.swift:130 (`PyUnicode_FromString(r.text)`; Swift passes a C string, so it ends at the first NUL).
- Probe: `"import json\n# \0\nimport ssl\n"` gives `widget` cut at the NUL, and `app` for the whole text (a
  SyntaxError, as the run would give). Only a paste can put a NUL in the editor, and the run fails anyway with a
  SyntaxError, so no one is harmed. Fix: `PyUnicode_FromStringAndSize` over the text's UTF-8 bytes
  and their count. The same applies to `filename` and `typed`.

### L3. The 0.2 s budget is not measured, and the first scan of a launch pays the import

- Where: SendLaneScan.swift:53-55; PyWidgetApp.swift:406-407 (the only prefetch is at a typing pause). Python starts
  at launch (`boot`), but the scan's thread starts, and `prepare` imports `_pywidget_runtime.lane`, only on the
  first request.
- Effect: an edit followed by Run within the 600 ms pause sends with no kept answer. The first scan of a launch then
  also pays the import from python315.zip on a phone. If that takes more than 0.2 s, the send falls back to the key:
  a refused import gets mirrored and the line is lost. The finder then catches it at the first widget run, as
  before. No test measures either figure (all live waits are 20 s), and the commit gives none.
- Fix: warm the scanner once after `boot`'s `start()` (a `prefetch` of an empty request, or `prepare` alone), and
  record the first scan and a warm scan on the Simulator and on the iPhone with the T-0680 bench. The answer
  request could also go ahead of queued prefetches, as EditorTooling puts keystrokes before primes.

### Info (no line)

- The scan reads the entry only, as the T-0972 line says. A sibling module that imports `ssl` is still caught only
  at the first widget run (T-4280's move).
- T-4657 (`from pywidget import device` and `net.request` forms come out `widget`) is untouched and still open. Those
  scripts mirror and move at their first run.
- The author's evidence log (ops/runs/xcodebuild-20261119-115348.log) is not on main, so I could not read it. The
  runner result above stands in for it.
- The Simulator test `testANewProjectSentWithTheFlagOnRunsInTheLane` runs the mirror through
  `ExtensionLane.runInBridge` in the app's process, the same stand-in earlier lane tests use. It is not the widget
  extension process. The real-process run is T-4181's own evidence on the iPhone.
{% endraw %}

</div>
