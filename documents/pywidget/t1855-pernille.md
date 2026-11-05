---
layout: "default"
title: "T-2659: review of T-1855 (T-1838 F6-F8), Pernille, 2026-11-05"
section: "documents"
description: "All three items do what the line asked. F7 is a one-line change with a source test and a killed mutant. F8 is correct: the mirror commit is the send&#x27;s last step, so the dropped undo entries are never replayed, and the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1855-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t1855-pernille.md</code></span></div><h1>T-2659: review of T-1855 (T-1838 F6-F8), Pernille, 2026-11-05</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewed at current main: 407f91f9 (mutant results) and the commit it records, 557aceb26 (the code and tests).
Author of both is Idris; I wrote neither. No later commit touches the five source files. No Xcode run here: I read
the diff, the code around it at HEAD and the tests. I did not rerun the mutants.

Intent (board line T-1855): (F6) LaneDemotions' unbounded flock takes WidgetStateLock's bounded LOCK_NB retry;
(F7) the extension ends with `_exit(0)`, not `Foundation.exit`; (F8) with the flag off, a failed mirror rename
removes `lane-scripts/<id>/` best-effort and the save stands. Tests red first.

## Verdict

All three items do what the line asked. F7 is a one-line change with a source test and a killed mutant. F8 is correct:
the mirror commit is the send's last step, so the dropped `undo` entries are never replayed, and the staging folder
takes whatever a half-done rename left. F6 bounds the wait as asked, but on one of its three call paths a timeout now
loses the demotion instead of keeping it for the next call. That one is Medium and is held (below). Red-first is shown
by 5/5 mutants killed in 407f91f9 and 8 of 9 Core mutants in 557aceb26, the survivor being the documented NSLock
one.

Findings: 0 High, 1 Medium (held), 3 Low, 1 Info.

## Medium

**M1 (held).** `Shared/LaneGuard.swift:197-200` (`WidgetLaneGuard.carryOut`), reached from
`Shared/ExtensionLane.swift:307`. This is a security weakness and isn't fixed yet, so the detail is on its board
line (T-2665), not here. In short: one case in the new bounded wait doesn't match the doc comment at `LaneGuard.swift:181-182`
("the caller keeps its marker for the next call"). Owner: Idris.

## Low

**L1.** `Shared/ExtensionLane.swift:248-252`. When the marker path finds a marker and `add` times out, the turn still
returns `.demoted`, but nothing was demoted and the marker stays. Nothing in the app reads the outcome today, but
`testAHeldDemotionLockTimesOutAndKeepsTheMarker` (`Tests/ExtensionLaneTests.swift`, added here) asserts `.demoted`
for that case, so the wrong word is now pinned by a test. Failure: a future caller or a run-log row that trusts
`.demoted` reports a widget as moved to the app <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> when it will run in the extension again at the next call. Fix:
return a separate outcome (or `.noTree("demotion not written")`) when `add` is false, and update the test. Owner: Idris.

**L2.** `App/Projects/LaneMirror.swift:97-102`. `drop` is `try?` with no record. Its comment says "so neither can
later run an older script", but if `removeItem` fails for the same reason the rename did (protection class before
first unlock, a permission change), the stale mirror stays and nothing notes it. With the flag off nothing reads it.
Failure: a build that opens the flag (the PYWIDGET_LANE_GATE gate build installed over a flag-off build on the same
App Group) runs the older script from that mirror. Fix: either soften the comment to say what holds, or have a
failed drop leave a mark the flag-on path checks (re-mirror or refuse that id). Owner: Idris.

**L3.** `App/Runtime/_pywidget_runtime/lane.py:173-179`. The Not held entry for `.lane-demoted.lock` still says
"LaneDemotions.add waits with no bound". After T-1855 a held lock costs each `add` 0.5 s and then ends the process
on a report (carryOut's `!written`), and "a lost id comes back with the next report" isn't a backstop against a
holder that holds again in every run. C2's matching sentence (`docs/research/C2-device-api.md:122`) needs the same change. Owner: Pernille (the lane.py
header is mine under Ines's 2026-11-02 04:02 item 7 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>). This is my own open thread from T-0953.

## Info

**I1.** `pywidget/ios/Tests/mutants-t1855-results.txt` (407f91f9) records F6 app-side and the flag-on mutant as
KILLED "rerun after a lock wait". The 557aceb26 message records the same two as WAITED with no verdict. The results
file names no log for the reruns, and the flag-on mutant's test scope is the whole WidgetScriptSaveTests class. The
result is believable, but a reader can't check the reruns from the repo. Next time, put the xc_mutants log path in
the results file.

## Checked and fine

- F6: `WidgetStateLock.with(lockFile:wait:)` rethrows over a non-throwing body, opens with O_CLOEXEC, polls
  LOCK_NB every 5 ms and gives up past `wait`. On a timeout `addLocked` never runs, so nothing is written. The marker
  path (`ExtensionLane.swift:247-252`) and the refusal path (`:373-377`) both keep their file for the next process.
  The app takes no `.lane-demoted.lock` at HEAD (T-1643 isn't built), so the fix protects against the future case.
- F6: the per-process NSLock is still held during the 0.5 s poll, so threads in one process queue for longer than the
  bound. Turns already run one at a time, so in the extension only one `add` is ever waiting. Not a finding.
- F7: `_exit` skips nothing the lane needs. The run row and status.json are written before judging
  (`ExtensionLane.swift:293-300`), the demotion is read back before `exit()`, and the bridge's crash marker is plain
  file writes cleared around `pw_rt_run`, not in an atexit handler. There are no other `exit(` calls in Shared/ or
  Widget/.
- F8: the case-only id change on a disk that ignores case (retiring and id are one folder) makes both removals
  no-ops after the retire. `.remove` and `.put` failures both end with no mirror. Flag on still undoes the send
  (killed mutant). `testFlagOffAFailedRenameOfTheWidgetStillPutsItBack` shows that failures before the mirror still
  undo the send with the flag off.
{% endraw %}

</div>
