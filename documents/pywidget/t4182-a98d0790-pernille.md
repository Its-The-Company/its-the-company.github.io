---
layout: "default"
title: "Review of T-4182 at a98d07901f: the Activity screen slice (T-0048), the lane&#x27;s own run record (T-1764) and &quot;Could not start&quot; (T-4244)"
section: "documents"
description: "The three steps do what their board lines ask, within what each says it leaves out. Nothing here is a crash, data loss or a review-rejection risk, so this read does not hold a TestFlight build. One Medium (M1) makes\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4182-a98d0790-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/t4182-a98d0790-pernille.md</code></span></div><h1>Review of T-4182 at a98d07901f: the Activity screen slice (T-0048), the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s own run record (T-1764) and "Could not start" (T-4244)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4697, Commandment 13). Author: Idris. Reviewed: main at a98d07901f, which takes in 53c5f25f42
(T-0048), 266014fca7 (T-1764) and aad4739f81 (T-4244). I read the three diffs and the files they touch as they stand
at a98d07901f. This worktree (personal/b3, a98d07901f is an ancestor) differs from it in those files only by three
DEBUG lines in `App/PyWidgetApp.swift` (T-3764's scene probe) and one doc comment in `RunLogRecorder.swift`; the
tests below ran on that tree. Date: 2026-11-17.

**Which feature.** All three are T-4182's. T-0048 and T-1764 carry "Links: part of T-4182" on their board lines.
T-4244's line says "Links: none", but [`ops/plans/app-features.md`](../company/app-features.html) places it in T-4182 (from T-4242, my review of
T-3895, a step of this feature; the fix is in `Shared/RunLog`, a Target here).

Runs (iPhone 17e, iOS 27.0 Simulator, local, `XC_TASK=T-4697`):
- ActivityListTests, ExtensionLaneTests, BridgeTests, RunLogExportTests, WidgetTapRoutingTests, WidgetTapLinkTests:
  339 executed, 0 skipped, 0 failures (`ops/runs/xcodebuild-20261117-184146.log`). The seven new tests are each
  listed as passed in that log, the four T-1764 ones included.
- `swift test` in a scratch copy of the Core package (`/Volumes/SANDISK SSD/company-scratch/T-4697-pernille`):
  ActivityListTests and RunLogExportTests 19 executed, 0 failures.
- Mutant, in the copy only: the start-failure branch of `ActivityList.strip` switched off (`if false, ...`).
  `testAStartFailureStripSaysCouldNotStart` fails ("InternalError" is not "Could not start"), 13 executed, 1 failure.
  Restored afterwards; the copy's file is byte-identical to the worktree's.

Not run: RunLogUITests (the commit reports 2/0, with the three screenshots under `docs/screenshots/t0048/`), the
whole PyWidgetTests target, any other runtime. No product file in this worktree was edited.

## Verdict: PASS with findings

The three steps do what their board lines ask, within what each says it leaves out. Nothing here is a crash, data
loss or a review-rejection risk, so this read does not hold a TestFlight build. One Medium (M1) makes Clear Activity's
own words untrue and breaks spec 12.7's "deleted when the sheet closes"; it should be fixed before testers outside the
company are told Clear deletes their output. Two Lows are tidy-ups.

## What I checked

1. **T-1764 against its line and ADR-007 (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 2026-11-03 9:09 PM, item 2).** At a98d07901f every lane run that
   reaches an outcome writes its row, detail and status.json through the one recorder: a run with a log at
   `ExtensionLane.swift:445` (`recordWidgetRun`), a start failure at `:422-427` (`logStartFailed`), a refusal and a
   demotion through `log(...)` (`:532`, `:538`) into `recordLaneTurn` (`:561`). That is "one writer with T-1728's
   refusal write, not two". `RunLogRecorder.recordWidgetRun` (`:111-129`) runs the status write inside the store's
   hold. The commit says honestly that the tests are not red first: the writer landed earlier with T-1854.
2. **Would the T-1764 tests catch the bug they pin?** By reading, yes. `:445` is the only call that writes a lane run
   with a log (`git grep "recordWidgetRun("` finds no other caller in Shared/; the app lane's is in WidgetWriter).
   Delete it and `rows("lane_ok")` is empty, so all four new tests fail on their first row assertion. The forged-ok
   tests also assert `showsBadge` comes back, which is the effect a person sees. I did not run this mutant: it needs
   an app-host build of a full copy of the project, and the reading is unambiguous.
3. **T-0048 against 12.1-12.5 and the card's "lists each run with its time, result and error".** Widget rows only,
   newest first, ties in file order (`ActivityList.swift:28-33`). Failed filter and count from the outcome word. Day
   groups in the device's time zone; an undated row goes in the oldest group and is not lost. The strip follows
   status.json, so it matches the badge. While the badge is oom_guard's, show=failed opens All (12.4, frame 13): this
   answers Maren's T-2234 question in the code, and `testOomBadgeOpensAllNotFailed` pins it. Clear removes
   `log/widgets/<id>/` under the widget lock and leaves status.json, as the alert says. The slice's list of what it
   leaves out (act.open, 12.6 iPad, the AX1 menu, 12.5.1, the four error states, Run as widget) matches the code. The
   T-0048 line stays open, which is right.
4. **The route.** `pywidget://open?widget=<id>&view=activity[&show=failed]` is read strictly: one widget, one view,
   the id rule, no path (`WidgetTapLink.swift`, `testActivityLinkIsReadStrictly`). It is checked before the launcher's
   `open?slot=` in `LauncherTapHandling.handle`, and `open?slot=` still falls through to the launcher. Any script can
   draw this link, but it only opens a read-only screen of the person's own widgets, and Clear asks first. Acceptable.
5. **T-4244 against its line and 12.4 row `:741`.** `startFailed` is `error` with `lane_outcome=start_failed`. The
   reason is `o.nostart`, ahead of `o.internal`. The detail line is `d.nostart` with the app's name. Export and detail
   draw no output or traceback for it, and an empty Output card reads `d.noran` for every row that ran nothing. An
   app-lane InternalError without the lane word keeps "Internal error", and the test asserts that too. The line's
   third ask ("no act.open for a failing status with no line") has nothing to act on yet, because act.open is not
   built. When T-0048 builds it, 12.4 `:741` still applies.
6. **Privacy: what Export lets leave the phone.** Nothing leaves without the person's tap on the share sheet. No
   upload and no mail composer, so the label draft's "no data collected" stands. The file holds, for each run the list
   shows: the widget id and a project name, ISO times with the UTC offset, outcome, reason, trigger, lane, duration,
   peak MB, the script's own printed output (up to 16 KB a run) and the traceback text. The commit itself notes that
   the traceback carries the full App Group path, so the container's install-unique folder name and the person's
   project and file names go out too. That is the person's own data, shared on their own tap. Spec 12.7 shortens only
   bundle paths, so this is not a spec breach. Maren may want to fold the App Group prefix when 12.5.1 lands. I add no
   line for it. Where the file stays behind on the phone is M1.

## Findings

### M1. The export file is written before anyone taps Export and is never deleted, so Clear leaves the output behind

`WidgetActivityView.swift:61-72` with `:166-168`: `exportFile` writes `<id>-activity-<date>.txt` (or
`-failed-runs-`) into the temporary folder every time the screen appears, the app comes back to the front, or the
filter changes. `ShareLink` (`:155-158`) only points at that file. Nothing ever removes it (no `removeItem` in the
file). Three consequences:
- After **Clear Activity** (`:161`), `exportFile` returns nil because there are no rows, but the file from the last
  appearance is still in `tmp/`. It holds every output and traceback the person just cleared. The alert said "Every
  run of [widget] and its output is deleted from this iPhone." (`ActivityList.swift`, `clearMessage`). That is not
  true until iOS purges the folder, which it does not do on any schedule while the app is used.
- The same goes for the card's "run history older than 14 days is gone": one file per widget, filter and day builds
  up in `tmp/` beside the store that the prune keeps to 14 days.
- Spec 12.7 says the file is "written to the temporary folder and deleted when the sheet closes". Also, each write
  reads up to 100 detail files on the main actor whether or not the person ever shares.

No test covers `WidgetActivityModel` (export, clear). The UI test covers list, filter and detail only.
**Fix:** build the file when Export is tapped (a `Transferable` `FileRepresentation`, or a button that writes the file
and presents `UIActivityViewController`). Delete it when the sheet closes, delete the widget's export files on Clear,
and at launch sweep any `*-activity-*.txt` and `*-failed-runs-*.txt` left in `tmp/`. Tests, red first: no export file
exists before Export is tapped, and after Clear none is left. Line: see the board.

### L1. The export's header names the editor's project, not the widget's

`PyWidgetApp.swift:1126` passes `model.projectFile?.deletingLastPathComponent().lastPathComponent` to the screen,
and `RunLogExport.text` puts it in the first line (`<app> activity: <id> (<project>)`). From the More menu that is
the widget's own project. From the link, when no project here declares the widget (`file == nil`, `:1159`, the
deleted-or-renamed case 12.2 keeps on purpose), or when `openProjectFile` refuses because the open file could not be
saved, the header names whatever project the editor happens to hold, or "()". A person who sends that file to
someone helping them sends a wrong project name.
**Fix:** carry the project name in `ActivityRequest`, from the file the route found
(`WidgetTapRouting.scriptFile`'s project) or the menu's open file. Leave it empty when there is none, and drop the
" (...)" in that case. Test the header for a link with no file. Line: see the board.

### L2. T-1764's new comment says a run with no log leaves status.json alone; four of the five no-log cases write it

`ExtensionLane.swift:431-433`: "no log means no script ran ... so status.json stays as it is, a forged one included,
until a run that does end writes over it." Since T-3895, `ran.log == nil` means `ran.start` is set, and
`:422-427` writes a `start_failed` row with `.error(..., InternalError)` for noConfig, python, notQueued and noMarker.
That replaces a forged `ok` too. Only `bridgeStuck` (`logClosed`, `deferred`, which carries the old status) leaves it.
The code is right; the comment is not. It matters because T-1766 (mine) will quote this backstop in lane.py's header
and in C2 1.7. **Fix:** say that a start failure writes its own error status (T-3895), and that only the closed lane's
`deferred` keeps the old one. Comment only. Line: see the board.

### Info (no new line)

- **Board upkeep.** T-1764's and T-4244's asks are met at a98d07901f, and this is the review each line asked for, so
  their owner may tick them. T-4244's Links field should say "part of T-4182", as the plan places it. T-0048 stays
  open.
- **Card Targets.** The slice's screen is `App/WidgetActivityView.swift` (new), and it routes through
  `App/WidgetTapRouting.swift`, which is a T-4185 Target (the plan's line for T-4068). Neither is in T-4182's Targets,
  which still name `App/WidgetRunView.swift`. For Ines: add `App/WidgetActivityView.swift` to the card, so the next
  step's files show up in the feature's own list.
- `ActivityList.strip` passes `treeExists: true` to `showsBadge` for the oom case. The screen does not know whether
  the tree exists, and the strip only words it, so I raise nothing.
{% endraw %}

</div>
