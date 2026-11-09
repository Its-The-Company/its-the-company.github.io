---
layout: "default"
title: "T-1677 review: the run log recorder (0cfa6404b + 94f1203da + 45210ae2a), read against main at 28653bc67"
section: "documents"
description: "PASS with fixes. Nothing High. Two Medium, both small, both to land before the TestFlight build that ships the Run log: M1 is a regression T-3393 brought in after the reviewed commits (an App Group lock taken outside\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1677-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 19 · Mon Nov 9</span><span><code>pywidget/docs/reviews/t1677-pernille.md</code></span></div><h1>T-1677 review: the run log recorder (0cfa6404b + 94f1203da + 45210ae2a), read against main at 28653bc67</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (not the author). Author: Idris. Date: 2026-11-09.
Scope: RunLogRecorder (Shared/RunLog/RunLogRecorder.swift), its app wiring in WidgetWriter, ConsoleModel and
ShortcutRun, LaunchRunLog (the once-per-launch pass), BackgroundHold, RunInfo.backgrounded in PyBridge; and how
3b6d5321c (T-3393, the run sink's refusals and the not-started rows) changed what those commits assumed.
Method: diffs read with `git show`, then the current files. No test run queued: the claims below are read, not
measured; item 6's UI run (J-20261108-0936-xc-test) is the author's evidence, not mine.

## Verdict

**PASS with fixes.** Nothing High. Two Medium, both small, both to land before the TestFlight build that ships the
Run log: M1 is a regression T-3393 brought in after the reviewed commits (an App Group lock taken outside the
assertion), M2 is the privacy policy's "removed after 14 days" still being only mostly true. Five Low.

What holds, checked:

- **Once per launch.** `LaunchRunLog.afterStart` (App/Bridge/LaunchRunLog.swift:49-61) stores one detached Task
  under an unfair lock; every caller awaits the same task, so N concurrent first callers run one pass and all
  return after it. `LaunchRunLog.app` is one `static let`; WidgetWriter.app, ConsoleModel (bridge) and ShortcutRun
  (shared bridge only) all use it. Called only after a `start()` that succeeded, so `owedRunReports` is set.
  Tested: LaunchRunLogTests.testThePassRunsOnceInsideTheHoldAndEveryCallerWaitsForIt (three concurrent callers, one
  hold, one marker read, one row).
- **Pass before the first outcome.** WidgetWriter.run awaits it after start and before `bridge.run`
  (WidgetWriter.swift:234); testTheLaunchPassLandsBeforeTheFirstWidgetRun shows the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> order. Previews never write
  status or rows, so GalleryPreview's start without the pass is fine. Exception: L1.
- **Assertion always ended.** `BackgroundHold.app` (WidgetWriter.swift:358-362) runs a synchronous, non-throwing body
  between begin and end; `BackgroundTask.end` is idempotent and the expiration handler calls it. The only path that
  skips `end` is a trap in the body. Every write in 94f1203da/45210ae2a (widget run, console run, Shortcut run,
  launch pass) is inside one. Exception: M1 (T-3393's new rows).
- **Threading.** RunInfo.backgrounded is written under markerLock into contextLock (a leaf), read after the run;
  RunClaims and the pass use OSAllocatedUnfairLock; the console's write is detached off the main actor.
- **Atomic, inside the App Group.** Rows are single O_APPEND writes (a torn tail reads as no row), detail files and
  every prune rewrite use `.atomic`, all under `RunLogRecorder.appGroup` (WidgetFolder.appGroup). Locks are bounded
  (0.5 s).
- **Privacy.** Widget rows carry what the draft's "Your run history" bullet lists (when, how it ended, output and
  error text, within the <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span>); console and Shortcut rows carry a name and no output, as the draft says; console
  and Shortcut names are last path components, never the sandbox path (except L2's new `reason` text). The 14-day
  prune now has a caller (`atLaunch` -> `pruneAll`), which settles gate 2a (iii) for every launch that starts Python;
  M2 is the rest.

## Medium

### M1. T-3393's not-started rows take a widget's state.lock outside the background-task assertion

- Where: pywidget/ios/App/Bridge/WidgetWriter.swift:276-280 (`notStarted` -> `recorder?.recordNotStarted`), reached
  from :225 (no script), :231 (Python unavailable) and :245 (not queued). RunLogRecorder.swift:161-170 writes the row
  and status.json under `widgets/<id>/state.lock`.
- Failure: 3b6d5321c added these rows after 94f1203da put every App Group write inside `hold(...)`; the new path has
  none. RunLogStore's header and RunLogRecorder's ("every locked call here runs in the app inside a background-task
  assertion") are now false. A foreground pass (`app_foreground`) over a premade missing from the bundle, or a user
  widget whose main.py is gone, while the user swipes home: the app is suspended holding a flock in the shared
  container and iOS <span title="A test written in advance. If it fires, we drop the idea.">kills</span> it with 0xdead10cc (T-0737 L3); meanwhile the extension's <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> waits on that lock and
  gives up. Small window, real crash report.
- Why tests missed it: WidgetRunReasonTests builds its writer with `holds: HoldLog()` (lines 70, 90, 111) and never
  asserts on it.
- Fix: make `notStarted` async and wrap the write in `await hold("pywidget.widget-run") { ... }`, as `record` is.
  Assert the hold in WidgetRunReasonTests: for the no-script and not-queued cases, `holds.all` brackets the row.

### M2. "Run history is removed after 14 days" holds only at the next process launch

- Where: App/Bridge/LaunchRunLog.swift:49-61 (the only `pruneAll` caller, via RunLogRecorder.swift:264);
  pywidget/docs/release/privacy-policy-draft.md:37 and :81.
- Failure: the prune runs once per process, after the first `start()`. Two cases keep rows past 14 days: (a) the app
  stays alive suspended for days (iOS keeps it; foregrounding is not a launch), so nothing prunes again; (b) a widget
  removed from the Home Screen writes no more rows, and the user who keeps the widgets but stops opening the app
  never runs the pass, so that widget's folder stays. The policy says "removed after 14 days" plainly; per gate 2a
  that sentence must be what the build does, never softened.
- Fix (either, Idris's choice; tell Wrenna which): run `store.pruneAll` alone (not recovery) inside the hold on scene
  activation when the last prune is more than 24 h old (one timestamp, no new file needed beyond the process), with a
  test that a second activation 25 h later prunes; or ask Wrenna to word the bullet as what the app does ("deleted
  once it is older than 14 days, the next time pywidget opens"). Case (b) needs the wording either way, since nothing
  of ours runs while the app is closed.

## Low

- **L1. Ordering: a no-script row can land before the launch pass.** WidgetWriter.swift:225 writes the row and
  status.json before `start()` and before :234's `afterStart`. If the last launch's killed run was this widget, the
  pass that runs later writes `killed` over this launch's `error NoScript`, the order LaunchRunLog.swift:8-10 says
  must not happen. Rare (a premade dropped by an update, a main.py removed). Fix: when `launchLog` is set and the
  bridge has started, await `afterStart()` before any `notStarted` write; otherwise leave status.json alone for
  NoScript until the pass has run.
- **L2. `reason` carries raw error descriptions.** RunResultSink.swift:143 (`"write failed: \(error)"`) and
  WidgetWriter.swift:231/:245 (`"\(error)"`). A CocoaError's description includes `NSFilePath=` with the absolute App
  Group container path, which T-1682's rule keeps out of the log; it is also not text a user can read in the Run log.
  Not personal data, so not a policy issue. Fix: log a fixed word plus domain and code (and at most the last path
  component); keep the full error in os_log.
- **L3. `backgrounded` is false for runs in a scene-less background launch.** PyBridge.swift:416 starts
  `inBackground = false` and only scenePhase changes it (PyWidgetApp.swift:108-110). A Refresh Widgets intent from a
  Shortcuts automation or a Run Script launch never has a scene, so its rows and marker say `backgrounded: false`
  while the app was never in front. Fix: seed `inBackground` from `UIApplication.shared.applicationState` (read on
  the main actor) at start, or have the intent paths mark it; add a test with a background-launch state.
- **L4. Expiration does not stop the pass.** The expiration handler ends the assertion (WidgetWriter.swift:371) while
  the body may still hold a lock; the launch pass walks every widget (`pruneAll`, render faults, a 0.5 s lock wait
  each). With many widgets and a busy extension this can outrun a background launch's time. Fix: hand the body an
  expired flag; `pruneAll` and `recordRenderFaults` check it between widgets and stop (the next launch finishes).
- **L5. T-3393 turns a transient lock miss into an error status.** WidgetRunLog.swift:42 maps a `state locked` sink
  refusal to `.refused`, so status.json gets `error`/NotWritten (RunLogRecorder.swift:113) for a run that worked and
  whose old tree still draws; the reviewed commits assumed a valid tree meant `ok`. Consider 7.2's `deferred` for
  `state locked` (not drawn, the next pass runs it), keeping `error` for write failures and a missing folder.
  Maren's call on what the widget shows.

## Tests, claim by claim


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Tests, claim by claim, scrolls sideways" style="--tw:930px" markdown="1">

| Claim | Covered by | Gap |
|---|---|---|
| Pass once per launch, all callers wait | LaunchRunLogTests (3 concurrent callers, later call) | none |
| Pass before first widget outcome | WidgetWriterTests.testTheLaunchPassLandsBeforeTheFirstWidgetRun | no-script path (L1) |
| Console and Shortcut wait on the pass | only `WidgetWriter.app.launchLog === LaunchRunLog.app` | no test that ConsoleModel.boot or ShortcutRun.run awaits it |
| Writes inside the assertion | widget run, console run, launch pass tests | T-3393 rows (M1); no test of BackgroundHold.app / BackgroundTask end-once |
| `backgrounded` on rows | BridgeSlice2Tests:528, WidgetWriterTests:435 | console row via `runBackgrounded`; background launch (L3) |
| 14-day removal | RunLogRetention/RunLogStore prune tests; pass calls pruneAll | no test of a prune after the first activation (M2) |

</div>


Board lines: M1 = T-3757, M2 = T-3758 (Idris, P1).
{% endraw %}

</div>
