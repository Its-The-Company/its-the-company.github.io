---
layout: "default"
title: "T-3789: run-history wording in the privacy policy draft, against the code"
section: "documents"
description: "Verdict: FAIL as it stood, fixed in part. Two High: the timing sentences describe a commit that is not on main, and &quot;at most 24 MiB of run history in all&quot; is not true in any build. I corrected the size clause, the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3789-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 19 · Mon Nov 9</span><span><code>pywidget/docs/reviews/t3789-idris.md</code></span></div><h1>T-3789: run-history wording in the privacy policy draft, against the code</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris, 2026-11-09. From T-3778 (d740400f6). Commandment 6 (the policy must be true); reports and
records are true.
Read: pywidget/docs/release/privacy-policy-draft.md (the run-history bullet, "Keeping and deleting your data",
the source table's run-history row, publish gate 2a); at HEAD adcd9a234 (personal/b, same code as main for these
files): App/Bridge/LaunchRunLog.swift, App/PyWidgetApp.swift, App/Bridge/WidgetWriter.swift,
App/Intents/RunScriptIntents.swift, Shared/RunLog/RunLogStore.swift, RunLogRetention.swift, RunLogRecorder.swift,
RunDetail.swift, Shared/ExtensionLane.swift; and a683ba360 (T-3758, <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> on parked/b/20261109-040752-69382, not
on main) by `git show`, not checked out. Reading review: no build, no test run. Paths below are under
pywidget/ios/ unless they say otherwise. "Line :37" and ":81" are the draft's numbering before this review's edit.

**Verdict: FAIL as it stood, fixed in part.** Two High: the timing sentences describe a commit that is not on main,
and "at most 24 MiB of run history in all" is not true in any build. I corrected the size clause, the source-table
row and gate 2a (iii) (named below; the policy text is Wrenna's). The timing sentences stay as they are and wait
on T-3758 landing; T-3798 (Wrenna) carries the exact wording for either case.

## What the code does

**Main today (adcd9a234).** `RunLogRecorder.atLaunch` (Shared/RunLog/RunLogRecorder.swift:247-266) ends with
`store.pruneAll(now:)` (:264). It runs once per process, inside `LaunchRunLog.afterStart`
(App/Bridge/LaunchRunLog.swift:49-61: "The first call runs the pass ... Later calls do not run it again"), after
the first successful Python start. Callers: the console's boot (App/PyWidgetApp.swift:637-638), a widget pass
(App/Bridge/WidgetWriter.swift:229-234) and a Shortcut run, which runs in the background
(App/Intents/RunScriptIntents.swift:144; `openAppWhenRun = false` at :213, :229). The `.active` scene phase
(App/PyWidgetApp.swift:108-117) does not prune. So a process the system keeps suspended prunes once, at its start,
and never again, however often the person switches back.

**a683ba360 (T-3758).** Adds `LaunchRunLog.sceneBecameActive` (diff, LaunchRunLog.swift new lines 72-90), called
from the `.active` phase (`if writesWidgets { Task { await LaunchRunLog.app.sceneBecameActive() } }`). It awaits
a launch pass already under way, then:

    let due = lastPrune.withLock { last -> Bool in
        if let last, at.timeIntervalSince(last) <= Self.pruneEvery { return false }
        last = at
        return true
    }

with `pruneEvery = 24 * 60 * 60`, and runs `store.pruneAll(now: at)` alone (no recovery) in its own background
hold. The launch pass sets `lastPrune` too. So: the first activation of a fresh process always prunes
(`lastPrune` is nil), and a later activation prunes only when the last prune is more than 24 h old.

**Writes.** A widget run's append prunes that widget's own rows when its first row is past 14 days, its rows file
would pass 1 MiB, or out/ already holds 100 details (RunLogStore.swift:225-239, RunLogRetention.swift:80-85).
Both lanes write through it (the extension: Shared/ExtensionLane.swift:305). A write never applies the whole-log
cap.

**Nothing wakes the app to prune.** No `BGTaskScheduler` registration in App, Shared or Widget (grep);
Shared/RefreshSchedule.swift is a pure rule with no caller that submits a request.

## Findings

### F1 High: the timing sentences at :37 and :81 are not true on main

Doc :37: "Runs older than 14 days are deleted at a check pywidget makes when you open it or switch back to it,
at most once a day." Doc :81: "Run history older than 14 days is deleted at a check pywidget makes when you open
it or switch back to it, at most once a day, so it can stay longer while you leave the app unopened."

On main, switching back makes no check (App/PyWidgetApp.swift:108-117; the pass is once per process,
LaunchRunLog.swift:49-61). A person who uses the app every day while iOS keeps it suspended for three weeks keeps
rows past 14 days for those three weeks. The sentences are right only in a build with a683ba360.

Fix (not made in the text: it depends on what lands): gate 2a (iii) now says so, and T-3798 gives Wrenna both
wordings. With a683ba360, see F2. Without it:
- :37: "Runs older than 14 days are deleted at a check pywidget makes each time it starts; switching back to it
  while it is still running makes no check." and, in the next-but-one sentence, "so if you leave the app
  unopened, or it stays running in the background, runs older than 14 days ... can stay on your device for
  longer than 14 days, until the next check."
- :81: "Run history older than 14 days is deleted at a check pywidget makes each time it starts, so it can stay
  longer while you leave the app unopened or it stays running in the background."

### F2 Medium: "at most once a day" is not what a683ba360 does either

Every fresh start prunes, whatever the time since the last prune (first `sceneBecameActive` with `lastPrune` nil,
and the launch pass, which never reads `lastPrune`); the 24 h spacing applies only to switching back within one
process. Three cold opens in a day are three checks. The error is in the safe direction (more pruning than
said), but the policy must say what the build does, and "at most once a day" also hides the real bound: a row
can stay up to a day past 14 days while the person keeps switching back to a running app.

Fix (T-3798, Wrenna, once a683ba360 is on main):
- :37: "Runs older than 14 days are deleted at a check pywidget makes each time it starts and, while it stays
  running, when you switch back to it more than a day after its last check."
- :81: "Run history older than 14 days is deleted at a check pywidget makes each time it starts and, while it
  stays running, when you switch back to it more than a day after its last check, so it can stay longer while
  you leave the app unopened."

The rest of :37 holds in both builds: "A widget's runs can also be deleted sooner, when that widget logs a new
run" (RunLogStore.swift:225-239, either lane); "pywidget does not wake up just to make this check" (no
BGTaskScheduler); "including those of a widget you have removed" (pruneAll removes a log folder with no row
inside 14 days, RunLogStore.swift:155-164 and :271-274; a removed widget writes no rows, so only the check
reaches it). Note "each time it starts" on main needs Python to start: the pass runs after a successful
`PyBridge.start()`. a683ba360's activation prune does not need Python.

### F3 High: "at most 24 MiB of run history in all" is not true (fixed)

Doc :37: "within size limits (at most 24 KiB of output and error text per run, and at most 24 MiB of run history
in all)." Code: the 24 MiB cap (`RunLogRetention.logBytes`, RunLogRetention.swift:12) is applied only in
`pruneAll` (RunLogStore.swift:179-188), never at a write (`appendWidgetRow` :225-239 checks the widget's own 1 MiB
rows file and 100 details; `recordConsoleRun` :111-123 the 512 KiB console file). And `planLogCap`
(RunLogRetention.swift:96-110) deletes detail files only; rows are never cut for it. Between checks a widget can
hold about 1 MiB of rows and 100 x 24 KiB of details, and the number of widgets has no cap, so the log can pass
24 MiB until the next check, and past it after the check if rows alone are over. The 24 KiB per run is right
(RunDetail.swift:19, `fileBytes`).

Fix, made in the policy text (Idris, 2026-11-09; Wrenna owns the text, please check the wording):
"It is kept on your device only and within size limits: at most 24 KiB of output and error text per run, and
output and error text kept only for each widget's newest 100 runs. [timing sentence unchanged] At the same check,
while all run history is over 24 MiB, the oldest output and error text is deleted." True on main and with
a683ba360 (it does not touch RunLogStore). The 100-run clause: RunLogRetention.swift:8-9, :72, :84.

### F4 Medium: the source table's run-history row said the launch prune has no caller (fixed)

Doc :119: "the launch prune (RunLogRecorder.atLaunch, :153, pruneAll :162) has no caller at HEAD, so a widget that
stops running keeps its rows." State: "in build except the launch prune [planned: T-1140, launch recovery]".
Wrong since T-1677: callers above (PyWidgetApp.swift:638, WidgetWriter.swift:234, RunScriptIntents.swift:144). The
line numbers were stale too (atLaunch is RunLogRecorder.swift:247; pruneAll is RunLogStore.swift:151, not :162;
the append path is RunLogStore.swift:225-239).

Fix, made: the row's evidence is rewritten at HEAD adcd9a234 with the callers, the once-per-process rule, where
the 24 MiB cap applies, the removed-widget path, no BGTaskScheduler, and what a683ba360 adds; state "in build,
except the switch-back check", pointing to gate 2a (iii).

### F5 Medium: gate 2a (iii) asked for wiring that exists (fixed)

Doc gate 2a: "(iii) 'Removed after 14 days' holds for every widget only once launch recovery calls
RunLogRecorder.atLaunch (it runs pruneAll); at HEAD a widget that stops running keeps its rows until it writes
again." Wrong on main (F4). The real open condition is the switch-back check (F1).

Fix, made: (iii) now says the launch prune is wired; the "switch back" clause is true only with a683ba360; check
the release candidate and use T-3798's wording for the build it is (never soften); the 24 MiB clause now names
the check.

### I1 Info: a683ba360 details, no wording change

- `lastPrune` is set before the prune runs, so a widget skipped because its lock was busy (`report.busy`,
  RunLogStore.swift:170) waits for the next due check. Its own next write prunes it if its first row is past
  14 days, so no row outlives what F2's wording says by more than that run.
- A cold open can prune twice (the activation, then the launch pass once Python starts). Harmless: pruneAll is
  idempotent, both run under the same locks.
- If background refresh (T-0793) is wired, a background widget pass would start Python and run the launch pass
  (WidgetWriter.swift:234): "each time it starts" stays true, but re-read the "does not wake up" sentence then.

## Changes made in this review

pywidget/docs/release/privacy-policy-draft.md: the run-history bullet's size clause (F3, policy text, Wrenna's to
confirm); the source table's run-history row (F4); gate 2a (iii) (F5); a dated note in "How to read this file".
`python3 -I tools/privacy_prepublish_grep.py --policy pywidget/docs/release/privacy-policy-draft.md --core
pywidget/ios/Core` exits 0 after the edit ("ok: policy names the run log").

## Board

- T-3798 (Wrenna): the two timing sentences, F1 and F2, once it is known whether a683ba360 is in the release
  candidate; and a read of the F3 size clause.
{% endraw %}

</div>
