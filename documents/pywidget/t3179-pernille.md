---
layout: "default"
title: "T-3283: review of T-3179, a collected real crash is recorded whatever its age"
section: "documents"
description: "Verdict: PASS. No finding blocks the build. F1 from t3146 is fixed: the marker collect sets aside at this launch is now never dropped by the age or count bound, and the pass writes its killed row and badge. F2, F3 and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3179-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 17 · Sat Nov 7</span><span><code>pywidget/docs/reviews/t3179-pernille.md</code></span></div><h1>T-3283: review of T-3179, a collected real crash is recorded whatever its age</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Verdict: PASS.** No finding blocks the build. F1 from t3146 is fixed: the marker `collect` sets aside at this
launch is now never dropped by the age or count bound, and the pass writes its `killed` row and badge. F2, F3 and the
F4 test gaps are fixed. The leftover loss named in the code is acceptable for build 3, but it is wider than the
comment says. That is L1. L2 is a test gap on the one line that makes F1 true on a device. Both are Low.

Read: `git show 1e161ed5b`, and at HEAD CrashMarker.swift (`collect`, `leftURL`, `owed`, `dropStale`),
PyBridge.swift `doStart`, RunLogRecorder.swift `recovered`/`decide`, LaunchRunLog.afterStart and its three
callers (PyWidgetApp.boot, WidgetWriter.run, RunScriptIntents), the new tests. I did not read Idris's notes beyond the
commit message.

Ran on the host:
- `swift test` in pywidget/ios/Core, in the checkout: 652 tests, 0 failures. That is 651 at HEAD plus 1 from an
  uncommitted change to Tests/Core/RunLogTests.swift that someone else is working on. It is not part of this commit.
- In a scratch copy (HEAD sources, HEAD RunLogTests.swift), `--filter RunLogRecorderTests`: 48 + 5 probe tests, 0
  failures. The probes print what happens and are quoted below.
- 5 seeded mutants via tools/mutation_check.py against RunLogRecorderTests: all 5 killed, each by its own test.
  Mutants: no `keep` (6 failures), unreadable marker dropped (4), `returned` beats `stuck` (3), no orphan fault sweep
  (1), a file at `widgets/<id>` counts as a folder (2).

Not run here, owed: the Simulator run of PyWidgetTests/RunLogRecorderTests. It can only be queued once the commit is
pushed. I did not check the commit message's claim that the app build succeeded.

## Re-check of the t3146 findings

- **F1, fixed.** `dropStale(now:keep:)` works out the set-aside name with the same `leftURL(runID:launch:)` that
  `collect` renames to (CrashMarker.swift:194, :252), and skips that marker before the read, the age test and the
  count list (:209). `doStart` passes `found` (PyBridge.swift:928). Probes: a 15-day-old <span title="A test written in advance. If it fires, we drop the idea.">kill</span> plus 40 older markers
  gives 8 dropped and 33 owed, with the kill among them. The other 32 are the count bound, and the kept marker is extra
  to it, which is right. A launch id that is not file-safe ("L 1/x" becomes `none`) still matches: 0 dropped, 1 owed.
  The new test also checks the row survives a prune 13 days later. The comment no longer gives the false reason.
- **F2, fixed.** A read that fails is skipped (CrashMarker.swift:210). Only bytes that are not UTF-8 are dropped. A
  marker that cannot be read is not added to the kept list either, so it does not use up one of the 32 places. If it
  stays unreadable for good, it stays on disk for good, but `owed` skips it too, so nothing reaches the user. That
  costs a few hundred bytes. I accept it.
- **F3, fixed.** `if last.returned && !last.stuck` (RunLogRecorder.swift:307). The test checks the `stuck` row,
  `after_expiry=false` and status `stuck`. A healthy run that returned (M2) still writes nothing to status.json.
- **F4, fixed.** There are tests for the orphan fault sweep, a file at `widgets/<id>`, and the torn marker's fault
  file. Each mutant above is killed by the test named for it. One item stays open: L2.

## Findings

### L1 (Low): the leftover loss is counted from the run, not from the launch, so any later launch can drop it

CrashMarker.swift:174-175 (the comment), :252 (`rename` keeps the date), PyWidgetApp.swift:624.

The comment says the marker is lost if a launch "collects and is killed before its pass, then a next start more than
14 days on". The age is the marker's modification date. That is the time of its run, and `rename` keeps it. So once
the kill is more than 14 days old, the next launch drops it whenever it comes, even seconds later. Probes:

    run 15 days back: L2 collects, keeps it (dropped=0 owed=1); L2 dies before its pass;
                      L3 60 s later: found=false dropped=1 owed=0
    run 10 days back: L2 keeps it; L2 dies before its pass; L3 5 days later: dropped=1 owed=0

"Killed before its pass" also covers more than a kill. If `start()` throws ("Python couldn't start"), `boot`,
`WidgetWriter.run` and the Shortcut intent all skip `afterStart`. That launch collects the marker and never records
it.

What breaks for a user: a widget's run is killed by memory. They do not open the app for over two weeks. When they
do, the app is killed during its first second or two, or Python fails to start. After that, Activity never shows the
kill and the widget never shows the `killed` badge. The console line is lost too, because the launch that would show
it is the one that died.

Why this is acceptable: three unlikely things have to happen together. There is a kill, then no app start for 14 days,
then a failure inside the short window between `collect` and the pass. What is lost is one row and one badge. Nothing
corrupts and nothing crashes. It does not need to block build 3.

Fix (one line, with a test): in `collect`, after the `rename`, set the set-aside file's modification date to now. The
bound then counts from the first launch that saw the marker unsettled. That is what its own reason asks for: it is a
backstop for a marker that can never be settled. I simulated this: re-dated, then L3 60 s later gives dropped=0
owed=1 killedRows=1 left=0. This does not change the order `owed` returns in a real run. The collected marker belongs
to the previous launch, which is the newest one anyway, and `owed` sorts a launch by its oldest marker. Then correct
the comment so it says the 14 days are counted from the first launch that collected the marker.

### L2 (Low): no test runs the line that makes F1 true on a device

PyBridge.swift:928. Only RunLogRecorderTests and PyBridge call `dropStale`. If `keep: found` is deleted, every host
test still passes, because `keep` defaults to `nil`. As far as I can find, no Simulator test reaches an aged marker
either. So a later edit can undo F1 with nothing failing. It is the same gap as my t3146 F4 point about `doStart`
order, and that is still open. Fix: remove the `= nil` default, so every caller has to say what it keeps and leaving
it out is a compile error. The `dropStale` tests that pass no `keep` would then pass `keep: nil` explicitly.

## Board

No FAIL finding, so no new line. L1 and L2 are for Idris to fold into his next change to CrashMarker, if he chooses.
Owed: the Simulator run of PyWidgetTests/RunLogRecorderTests after the push.
{% endraw %}

</div>
