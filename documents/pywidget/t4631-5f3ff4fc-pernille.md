---
layout: "default"
title: "Review of 5f3ff4fcf2: T-4631, premades the extension refuses are placed in the app by the build; the finder notes every refusal"
section: "documents"
description: "PASS with findings. Every LaneImportError the finder raises is now noted before the raise, caught or not, and the router marks only the run&#x27;s own widget, so a caught refusal is judged refused_import. The build places\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4631-5f3ff4fc-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4631-5f3ff4fc-pernille.md</code></span></div><h1>Review of 5f3ff4fcf2: T-4631, premades the extension refuses are placed in the app by the build; the finder notes every refusal</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4915, Commandment 13). Author: Idris. Reviewed: 5f3ff4fcf2 as a whole, the 13 product files
(<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.py, scripts/premade_lanes.py, project.yml's Install premades phase, Premades.swift, LaneDevice.swift,
ExtensionLane.swift, how-it-works/extension.md, test_lane.py, test_bundle_runtime.py and the four Swift test files),
read on their own; the author's memory files were not read. Since 5f3ff4fcf2 only `.claude/agent-memory/idris/MEMORY.md`
has changed among the commit's files; every reviewed file is the same at HEAD (fbf1569bf2), so line numbers hold at
both. Date: 2026-11-18.

## Tests run

- `python3 pywidget/tests/run_host.py --both bridge widgets`: OK on Python 3.9.6 and 3.13.18, 2 suites each,
  802 tests each, 1604 in all, 0 failed suites.
- `/usr/bin/python3 pywidget/tests/bridge/test_lane.py PremadePlacesTests FinderNotesRefusalTests`: 10 tests, OK.
- Seven mutants on a `git archive 5f3ff4fcf2` export in my scratch folder (T-4915-pernille), each run against
  PremadePlacesTests, FinderNotesRefusalTests and PremadesInTheLaneTests (19 tests; baseline green):
  1. `_note_refusal()` removed from `LaneFinder.find_spec`: KILLED (`test_a_caught_refusal_is_one_call...`).
  2. note sent only for user-frame refusals, not for a denied name (`if not denied(name): _note_refusal()`): KILLED
     (the caught `pywidget.http` case).
  3. note sent as `lane.refuse` (Python and Swift names apart): KILLED on the Python side; the Swift side's name is
     held by LaneChoiceTests through the real finder and router.
  4. sibling modules not followed in `premade_hits`: KILLED (`test_a_sibling_module_is_followed_once`).
  5. `files.shared` exemption removed from `_device_refused`: KILLED (`test_device_calls_through_the_wire`,
     `test_the_bundled_premades`: every premade importing `_premade` goes to the app).
  6. `app_only` dropped from `_premade_refused`: KILLED (both tests above; altitude, distance, steps, sun fall back to
     the widget).
  7. `_wire.call` hits ignored: KILLED (`test_device_calls_through_the_wire`).
- A four-line Swift script (`swift b.swift`, scratch) on Premades.appLane's schema test: `{"schema": true}` and
  `{"schema": 1.0}` both pass `doc["schema"] as? Int == 1`; `1.5` does not (L2).
- Not run: the Swift suites (ExtensionLaneTests, LaneChoiceTests, ExtensionRuntimeTests, PremadesTests). The land gate
  J-20261118-1618-land-m2-27fcef ran them green, 2115/0; I read them instead, below.

## What I checked

- **Every raise is noted.** `find_spec` (lane.py:683-689) is the only place lane.py raises `LaneImportError`, and the
  note sits immediately before that raise, for both branches (denied from anywhere, off-list from a user frame).
  `_note_refusal` (lane.py:699-713) imports nothing, reads `runner._bridge` through captured builtins, and swallows
  an `Exception` from the call, so it cannot recurse into the finder or replace the refusal.
- **Who is marked.** LaneDeviceRouter marks `script` from `bridge.runInfo(of: runID)` (ExtensionLane.swift:724), never
  from the payload, so no run can mark another widget. A refusal outside a run (bootstrap) has no script and marks
  nothing. ExtensionLane clears the mark before the run and takes it after (ExtensionLane.swift:424-426), as for an
  app-only ask; LaneGuard judges `askedAppOnly` as `.refusedImport` first, so no badge.
- **The build.** Install premades runs `set -e`, starts with `rm -rf "$DEST"`, and ends with premade_lanes.py, so a
  premade that does not parse fails the build and no stale lane-app.json survives. The gate build's overrun premade
  is copied in a later phase and is not scanned; that is right, it must run in the widget.
- **The rule agrees with the finder.** A premade's frames are in the bundle (trusted), so only NEVER and denied names
  and the app-only device modules can stop it there; the scan counts exactly those, plus `_wire.call`s naming any
  of LaneDeviceRouter.appOnlyModules (all eight are in DENIED_SUBMODULES or APP_ONLY_SUBMODULES, held by
  SendLaneTests). The output (seven to the app, five to the widget) matches the bundled premades' imports as I read
  them: github's keychain and http (caught), shortcuts' `urllib.parse`, storage's `pywidget.files`, and the
  location and pedometer sensors.
- **The reader.** `.none` (no file) keeps T-4280's behaviour, and the built bundle is held to having the file by
  `testEveryBuiltPremadeIsInTheLaneUnlessItsScanPlacedItInTheApp`; anything else that does not read is `.unreadable`
  and keeps every premade out of the extension. The direction is safe: the app lane can run every premade.
- **Docs.** extension.md's new section matches the code and the seven names.

## Findings

### L1 (Low): the note waits a fixed 1.0 s outside the run's budget, and a lost note fails open

`bridge.call("lane", "refused", b"{}", 1.0)` (lane.py:710) does not go through `device.effective_timeout`, which <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span>
every other device call at the run's remaining budget less the drawing reserve. Today the router answers inline on
a concurrent queue (PyBridge.deliver, `deviceQueue` `.concurrent`), so the wait is microseconds and I could not make
it slow. But if it ever does time out, the refusal still stands and the mark is lost: a script that catches it is
judged `fits`, the case this commit exists to close. Cap the wait (remaining budget less `BUDGET_RESERVE_S`, or a
short fixed cap) and test a slow stand-in bridge. Board line T-5004.

### L2 (Low): Premades.appLane takes `"schema": true` and `1.0` as schema 1

Premades.swift:131 reads `doc["schema"] as? Int == 1`; JSONSerialization gives NSNumber, which bridges a Bool and a
whole Double to Int (checked above). The build only ever writes the integer 1, so nothing ships wrong, but the
reader's stated contract is "a file that is not the build's: fail closed". Require a non-Bool integer and add both
cases to `testThePlacementFileDecidesBeforeAnyRun`. Folded into T-5004.

### I1 (Info): the scan reads a premade's own imports, not the stdlib's

A NEVER name that a stdlib module imports for a premade (transitively) is not seen at build time. That is
acceptable now because the finder's note is the backstop: the first run that meets it is marked and moved, caught
or not. Worth one sentence in extension.md when T-5004 touches it.

### I2 (Info): a caught refusal inside the runtime or stdlib also moves the widget

The note does not ask who caught the refusal. A guarded `try: import <NEVER name>` in an allowed module, during a run,
now moves that widget to the app (no badge) where before it ran on. I searched the bundled runtime and `pywidget`
package for guarded imports of NEVER or denied names: only `systls.py:482` and `http.py:215`, both behind names the
lane already denies. No case today; the direction is the safe one.

### I3 (Info): small notes

- extension.md says the widget "notes each module it refuses"; the mark is one per run, not per module. True in
  effect, slightly loose in words.
- test_bundle_runtime.py:158 inserts App/Runtime on `sys.path` inside a test method and never removes it.
- A person's script can send `lane.refused` itself through `_pwbridge` and move its own widget to the app. That is
  no new reach: `"lane": "app"` in pywidget.json, or any app-only device call, already does the same, and only to
  its own widget.

## Verdict

**PASS with findings.** Every `LaneImportError` the finder raises is now noted before the raise, caught or not, and
the router marks only the run's own widget, so a caught refusal is judged `refused_import`. The build places the
seven premades that cannot run in the widget by the finder's own rule, writes the file last in a `set -e` phase,
and the reader fails closed on anything it cannot read. Host suites are green on 3.9.6 and 3.13.18, and all seven
mutants of the key rules die. Two Low edges (a lost note fails open; the schema check takes a Bool) go to Idris as
T-5004; nothing blocks the commit.
{% endraw %}

</div>
