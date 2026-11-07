---
layout: "default"
title: "T-3153: re-review of the fixes for t3135 M1, M2 and L1"
section: "documents"
description: "Verdict: PASS-with-fixes. The first thing that broke was the 14-day bound. M1, M2 and L1 are fixed as asked, and each of the five tests that should fail on the old code does. dropStale adds one new Medium: F1, it drops\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3146-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 16 · Fri Nov 6</span><span><code>pywidget/docs/reviews/t3146-pernille.md</code></span></div><h1>T-3153: re-review of the fixes for t3135 M1, M2 and L1</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Verdict: PASS-with-fixes.** The first thing that broke was the 14-day bound. M1, M2 and L1 are fixed as asked, and
each of the five tests that should fail on the old code does. `dropStale` adds one new Medium: F1, it drops a real
<span title="A test written in advance. If it fires, we drop the idea.">kill</span> that is past 14 days when the app next starts, on a reason that is false. Three Lows follow. F1 is a small fix.
Do it before the first TestFlight build that ships the Activity screen. It does not block a build without that screen.

Read: 9a8cc9832 and, at HEAD (no later commit touches these files), CrashMarker.swift, RunLogRecorder.swift
(`atLaunch`, `recovered`, `hasRow`), PyBridge.swift (`doStart`, `clearRecovered`, the owed and last-run reports),
LaunchRunLog.swift, RunLogStore.recordWidgetRun, RunLogRetention.aged, WidgetStatus.swift (Recovery, LoopBreaker),
ExtensionLane.runInBridge, the new tests. I did not read Idris's notes on the work beyond the commit message.

Ran on the host, in pywidget/ios/Core:
- `swift test`: 646 tests, 0 failures.
- In a throwaway copy in /tmp, not committed: 8 probe tests, whose output is quoted below, and 12 seeded mutants of
  `dropStale`, the folder guard and `decide` against RunLogRecorderTests. 10 were killed, each by the test named for
  that behaviour. 2 survived (F4).
- The same copy with `recovered` from 9a8cc9832^ and `dropStale` stubbed to 0: 18 failures in 5 tests, 43 executed.

Owed, not a failure: the app, unit and UI targets were not built here. That is Idris's under T-3146.

## Re-check of the t3135 findings

- **M1, fixed.** `recovered` returns `.nothing` when `widgets/<id>/` is gone or is a file (RunLogRecorder.swift:296-298),
  and that sits before `hasRow`, so an old row does not change the answer. Probe: a `returned` and a `stuck` marker
  for a gone widget, and a plain one whose path is a file: 3 settled, 0 rows, neither `widgets/gone` nor
  `log/widgets/gone` made. `.nothing` settles, so `owed()` is empty and `found ?? owed.last` has nothing to repeat. If a delete lands
  between the guard and the lock, the result is `.notWritten` and the next launch settles it.
- **M2, fixed.** `decide` returns `.writeNothing` for `returned`, in `prepare` and again under the mutex, so a real
  kill keeps its old path exactly (`statusRunID` nil is still `.writeKilled`). Probe: kill, returned, kill on `bg_refresh`
  gives rows `killed:false, killed:true, killed:false`, `demote`, status `killed`. The returned run neither counts nor
  resets the streak. `LaunchReport.recovery` and `killedRow` have no consumer outside tests, so the last-one-wins
  `recovery` hides nothing. One corner is F3.
- **L1, fixed, with a side effect.** A torn left marker and its fault file are deleted. The check is too wide: F2.

## What holds in dropStale

- **Order in doStart** (PyBridge.swift:925-928): `collect`, `dropStale`, `owed`. `collect` first means a marker set
  aside this launch is counted, and its fault file is written before the orphan sweep sees it. `owed` last means no
  dropped marker is listed. Nothing else can touch the folder: `doStart` runs once on the runner thread, runs queue
  behind it, `markedRun` is 0, and the launch pass runs only after `start()` returns.
- **Own markers:** a marker or orphan fault of `except` is skipped by its name prefix. A 40-day-old one of mine stayed.
  At that point in a launch there are none anyway.
- **Bounds:** exactly 14 days is kept, one second more is dropped. 32 are kept with none dropped, 33 drops the oldest.
  Forty equal dates leave 32. A second pass drops 0. A missing folder gives 0. A date ahead of `now` is kept.
- **The count bound never costs the newest kill:** with 40 older markers, the marker `collect` just set aside stayed
  owed. Its date is the newest, because `rename` keeps the date of the last write during the run.
- **Fault files:** deleted with their marker on all three paths; an orphan goes; a kept marker's stays; `.fault` is not
  mistaken for `.marker`. Probe: `keptFault=true orphanGone=true mineOrphanStays=true tornGone=true tornFaultGone=true`.
- **Extension and background runs:** `CrashMarker.default` is in each process's own Caches, so the app and the extension
  never share a marker folder. The extension has no launch pass (LaunchRunLog is App/), so its left markers were
  unbounded before this commit and are now bounded. A second extension process would only drop what is already stale.
  Rows go through the widget's lock as before.

## Findings

### F1 (Medium): a real kill past 14 days is dropped before its row is written, on a false reason

CrashMarker.swift:170 and :204, PyBridge.swift:927. `dropStale` runs after `collect`, so the marker it can drop includes
the one just set aside: the last launch's real kill. `rename` keeps its date, which is the time of the run. If the app
next starts more than 14 days later, the age test deletes it and `owed()` omits it, so the launch pass writes no row and
no `killed` badge. The console line still appears (`lastRun = found`, PyBridge.swift:936), so the two surfaces disagree:
the console says the run died and Activity has no record of it.

The stated reason does not hold. The comment says such a row "would be pruned the day it was written". Recovery stamps
the row with `now` (RunLogRecorder.swift:310), and `aged` reads that stamp, so the row lives another 14 days.

Concrete case: a widget's run is killed by memory. The widget carries on in the extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, so the person has no
reason to open the app for three weeks. The extension lane is what makes this likely: scheduled runs do not start
the app process. Probe, the same marker dated 15 days back:

    with dropStale:    found=7 dropped=1 owed=0
    without dropStale: killedRows=1 status=killed rows=1 tsNow=true
    after prune:       rows=1

Likelihood is low and the loss is one row and one badge, so this is Medium and not High. It is Medium because it is
the case this pass must not lose, the bound was added as a backstop for markers that can never settle, and a fresh
kill is not one of those.

Fix: the age bound never applies to the marker `collect` returned this launch (pass it to `dropStale`, or age a marker
only from its second launch unsettled). Correct the comment. Test: a `run.marker` dated 15 days back, `collect`,
`dropStale`, and `owed()` still lists it. If the company decides a kill this old should go, say so in ADR-007 and make
`found` follow it, so the console and Activity agree.

### F2 (Low): a read that fails is treated as a torn file

CrashMarker.swift:202. `(try? String(contentsOf:encoding:)) != nil` is false for any read error, not only for bad UTF-8,
and deletion needs no read. So a marker that cannot be read at this moment is deleted for good. Probe: a valid left
marker at mode 000 gives `dropped=1 exists=false fault=false`. Cause on a device, not tested on one: a start before
first unlock, when a file under the default protection class cannot be opened, or a transient I/O failure. The launch
pass needs a later launch to retry, and this removes it. Fix: read `Data` first; skip on a read error; drop only when
`String(data:encoding:)` fails. Test with a marker that cannot be opened.

### F3 (Low): a stuck run that returned before its row loses its word's effect

RunLogRecorder.swift:305. `decide` checks `returned` before `stuck`. A marker with both gives a `stuck` row with
`after_expiry=true`, no status.json write and no loop-breaker count. Probe: `outcome=stuck afterExpiry=true
rec=writeNothing status=nil streak=0`. The window is narrow: the stop <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> gives up on the run, the run then returns
before the batch's `stuck` row lands, and the process is killed in that gap. But a run that wedged a thread is what
the loop breaker exists for, and T-1679 says marker-only `stuck` gets the row and status.json. Fix: `if last.returned
&& !last.stuck`. M2 was about a healthy run, and this one is not.

### F4 (Low): gaps in the new tests

The tests fail for the right reasons: each mutant of a behaviour was killed by that behaviour's test, not by a side
assertion. These are not covered:
- The orphan fault sweep (CrashMarker.swift:197-200): deleting it survives. No test has a `.fault` without a marker.
- `isFolder.boolValue` (RunLogRecorder.swift:297): deleting it survives. A file at `widgets/<id>` is not tested.
- The `doStart` order has no host test, and a swap of `dropStale` and `owed` would pass.
- `testUndecodableLeftMarkerIsDropped` passes no fault file, so its fault path is unasserted. It is the same `drop`.

Minor, the commit message: it says 18 failures in 6 tests. It is 18 in 5. `testRunKilledInsidePythonStillCounts` is green
on the old code, which is correct for the guard it is.

## Board

- F1: T-3179 (Idris, P1).
- F2, F3, F4: for Idris to fold in with F1, at his choice.
{% endraw %}

</div>
