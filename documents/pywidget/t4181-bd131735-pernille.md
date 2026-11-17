---
layout: "default"
title: "Review of T-4181 at bd131735: the refresh tap (covers T-0678)"
section: "documents"
description: "The code is sound as far as it goes, and it is the right shape for what the handoff measured. RefreshTapRule chooses by the process the intent lands in, not by OS, so a tap that iOS 26 runs in the app goes through the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4181-bd131735-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/t4181-bd131735-pernille.md</code></span></div><h1>Review of T-4181 at bd131735: the refresh tap (covers T-0678)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4612, Commandment 13). Author: Idris. Reviewed: T-0678's commits up to bd131735 (0ae1c2d2d2 rule,
2b1cbd1634 intent and getTimeline call, 9ab6cbe2af T-4414, 0cfbba35c0 slice 3 intent row, bd13173564 note and memory)
and, because they close my earlier findings and sit on HEAD, 802ac4b30d (T-4416) and 2ea528157a (T-4417). Also read:
the handoff 7500ae478a (ops/plans/T-0678-handoff.md) and its two logs (ops/runs/xcodebuild-20261116-224433.log and
-225820.log, both print `T-0678 TAP rows in any lane +1 ["app/intent/error"] app state 3`); Shared/RefreshAsks.swift
(askDate); App/PyWidgetApp.swift:62-63; App/Bridge/WidgetWriter.swift:206-213, 722-732; the ExtensionLane changes
after bd131735 (T-4494 inLane, T-4630, T-1764: none touches the tap). Paths are under pywidget/ios/. Line numbers are at
HEAD c53c383761. Date: 2026-11-17.

Prior review: pywidget/docs/reviews/t0678-pernille.md (feb15a1ceb, FIX FIRST). Closure below.

Tests:
- Core, `swift test --filter 'LaneRerunRuleTests|RefreshTapRuleTests|RefreshAsks'` in Core/: 38 executed, 0 failures.
- Simulator, local (XC_LOCAL=1, iPhone 17e, iOS 27, HEAD c53c383761), `-only-testing` RefreshTapTests,
  ExtensionLaneTests, ExtensionBridgeTests: 135 executed, 0 skipped, 0 failures (ops/runs/xcodebuild-20261117-163611.log).
  RefreshAgeRendererTests was in the filter and ran nothing (it is an extension of TreeNodesTests, not a class); not counted.
- A probe (scratch, not committed): the three Core rule files compiled with a main that asks LaneRerunRule about an
  atEnd tree whose run was 40 min ago and whose last entry was 30 min after the run (M1 below).
- Not run: the iOS 26.0 UI test (needs the forced-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> build and a private Simulator; the handoff's logs are read
  instead), the author's mutants (T-4416 3/3, T-4417 4/4 by their commits), the full unit target.

## Verdict: FIX FIRST (one High, two Medium, one Low)

The code is sound as far as it goes, and it is the right shape for what the handoff measured. RefreshTapRule chooses by
the process the intent lands in, not by OS, so a tap that iOS 26 runs in the app goes through the app's writer
(`refreshButton`, forced, trigger intent). Since T-4414 the rerun rule counts the newest row in any lane, so the app's
row stops the extension's post-intent reload from running the script again. The handoff's log shows exactly one row
(app/intent) and no lane row. Slice 3's intent row is correct for a tap that starts the extension turn or joins it
before the row is written. What blocks TestFlight: on no runtime has any test seen a tap put a new value on a widget,
and the one test that tries asserts the premise the 26.0 run disproved. Separately, T-4414 moved the age onto the last
run but left the interval measured from `sampled_at`.

## The handoff (7500ae478a) against HEAD


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The handoff (7500ae478a) against HEAD, scrolls sideways" style="--tw:960px" markdown="1">

| Claim at HEAD | Handoff's measurement | Agrees? |
|---|---|---|
| RefreshWidgetIntent.swift:7-9, RefreshTapRule.swift:4-6: on 18-26 "in the extension a `lane: widget` script runs there" | 26.0: the intent ran in the app, launched in the background, with or without `supportedModes` | No (doc) |
| RefreshTapRule.run: the app branch when `appWriter` is installed | the app ran it (row app/intent), so the writer was installed on a background launch | Yes (code) |
| One run per tap (LaneRerunRule, any-lane rows) | +1 row in any lane, +0 lane rows | Yes |
| WidgetKitCheckTests.swift:1287-1296, 1368: the tap leaves the app `.notRunning` | app state 3 (runningBackground) | No: the test fails by design on the only runtime it runs on |
| The handoff's two test fixes (firstMatch, TOK token) | | Applied by T-4417 (WidgetKitCheckTests.swift:1326, 1339, 1351) |

</div>


My answer to the handoff's question, for Ines to <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> (a review is not a decision): accept the app-side tap on 26, as
on 27. The code already handles it. A tap that gets the app does better than one that gets the extension: the app has
the memory, no 4 s deadline, and it can run every widget whatever the lane flag says. I would not chase a way to force
WidgetKit into the extension on 18-26: one binary cannot keep the intent out of the app target, and what we would be
building on is Simulator behaviour Apple does not document. The cost is a background app launch per tap. That is now
the figure T-4181's Done should measure ("time and memory inside the widget" is the wrong process on 26 and 27).

## Earlier findings (t0678-pernille)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Earlier findings (t0678-pernille), scrolls sideways" style="--tw:790px" markdown="1">

| Finding | Line | State at HEAD |
|---|---|---|
| H1 the rule ages `sampled_at` | T-4414, 9ab6cbe2af | Closed for the age (`lastRun` = newest row, else the tree's mtime; RefreshTapTests 135-147). Not closed for the interval: M1 below |
| M1 a failed tap run is followed by a second | T-4414 | Closed (RefreshTapTests `testFailedTapRunIsNotFollowedByASecondRun`, `testFailedFirstRunWithNoTreeDoesNotRerun`) |
| M2 the button looks live where nothing runs | T-4415 | Open on the board; unchanged. On 26 it now matters less (the app runs it), on 18 still unknown |
| M3 the iOS 27 install line untested | T-4416, 802ac4b30d | Closed: a comment-stripped source pin; 3 mutants killed per the commit |
| L1 TreeFile adapter mutants | T-4417 | Closed: three trees (RefreshTapTests 203-230); I checked by reading that each <span title="A test written in advance. If it fires, we drop the idea.">kills</span> its mutant |
| L2 the UI test counts runs | T-4417 | Done in the test, but see H1: the test cannot pass where it runs |
| L3 exemption by line text | T-4417 | Closed: `exemptedFiles` is pinned to the two files, with a planted third file named |
| L4 `wants-run` ignored | T-4417 | Closed as asked: a comment (LaneRerunRule.swift:37-38) |

</div>


## Findings

**H1. No test anywhere sees a tap refresh a widget, and the one that tries asserts what the 26.0 run disproved.**
`UITests/WidgetKitCheckTests.swift:1298` skips on 27, and iOS 27 is the runtime on every Simulator the company uses
and on the iPhone 17e of T-4181's Done. `:1368` asserts the app stays `.notRunning`; on 26.0 the system launches it, so
the test is red there whatever the code does. The 26.0 run also never saw a new value: the app's run wrote `error`,
probably because the test seeds `lane-scripts/<id>/` only and the app reads `scripts/<id>/`. Nobody checked that. So
the path that ships, tap → app in the background → `refreshButton` → new tree → reload, has never been seen to put a new
token on a widget. Under Commandment 1 that blocks TestFlight for a button `ui.RefreshButton()` draws on any widget.
Fix: make the test say what was measured. On any runtime: seed both script folders as T-4494's send does; one tap gives
a new token, exactly one new row in any lane, trigger `intent`; the app never comes to the foreground
(`app.state != .runningForeground`); print which process ran it instead of asserting the extension. Run it on the
iPhone 17e (27.x) and on the 26.0 Simulator, and attach both logs. Change the two doc comments
(RefreshWidgetIntent.swift:7-12, RefreshTapRule.swift:4-6) to the measured process once Ines rules on the handoff.
Board: T-4772.

**M1. The rerun interval is still measured from `sampled_at`, but now applied from the last run.**
`Shared/LaneRerunRule.swift:40` returns `ask - sampledAt`; `Shared/RefreshWidgetIntent.swift:103` hands that interval to
`reruns(lastRun:...)`. The ask itself is absolute (RefreshAsks.askDate: the `after` date, the last entry's date, the
stale mark). When the script dates its data earlier than the run, which is the case T-4414 was written for, the gap is
added to the interval. The probe, for an atEnd tree whose run was 40 min ago and whose last entry was 30 min after the
run (so its timeline ran out 10 min ago):

```
sampled_at = run time      : interval 30 min, reruns=true
sampled_at 1 h before run  : interval 90 min, reruns=false
sampled_at fixed 2020-01-01: interval 1440 min, reruns=false
fixed, last run 23 h ago   : interval 1440 min, reruns=false
```

So a widget dated an hour back reruns an hour late, and one with a fixed date reruns once a day, while getTimeline goes
on drawing a timeline that has run out. Before T-4414 the fixed-date case reran on every reload; now it barely reruns.
T-4494 put every sent widget in the lane, so once the flag is on this rule governs all of them. Fix: compare dates, not
intervals. The run is due when `now >= max(lastRun + floor, min(askDate ?? lastRun + floor, lastRun + cap))`, with the
past-the-clock guard kept. Tests: the three probe cases (atEnd, `after`, a stale mark), with `sampled_at` an hour before
the tree's write. RefreshTapTests' trees all have `sampled_at` equal to the write time, so none of them catches this.
Board: T-4773.

**M2. The cost of a tap is unmeasured, and on 26 and 27 it is an app launch.** Every tap on 26 (measured) and on 27
(pinned) is a background launch of the app: PyWidgetApp's init, ProStore, the console model, then a cold interpreter and
the script, inside the intent's background time. My earlier review asked for that figure before the button ships; it is
still missing, and T-4181's Done measures the wrong process. Fix: a Simulator figure now (the launch-to-row time and the
app's peak footprint per tap, cold and warm, on 27 and 26.0), and the device figure in the gate build's checklist.
Board: T-4774.

**L1. A tap that joins a turn after its row is written gets no intent row, and the tap is answered by a run that began
before it.** `Shared/ExtensionLane.swift:279` inserts into `tapped` when the tap joins `inFlight[id]`, but the row is
written at `:435` before the turn clears `inFlight` (the size judging runs in between). A tap landing in that window
starts no run and leaves no `intent` row, so state-spec s10 B5's badge cannot follow a failed fetch there. Narrow, and
only in the extension (which 26.0 did not use). Fix, or a comment that accepts it: a tap that finds a turn whose row is
already written should queue one run of its own after it. The doc for getTimeline (`Widget/PyWidget.swift:40-41`) still
says the rule reads `sampled_at`; T-4414 changed that. Board: T-4775.

## Not checked

Device behaviour of any kind; iOS 18 (no runtime offered); whether the app's `error` in the handoff's run was the
missing `scripts/<id>/`; the Lock Screen accessory taps (T-0678's notes, item 2); gate results for these commits.
{% endraw %}

</div>
