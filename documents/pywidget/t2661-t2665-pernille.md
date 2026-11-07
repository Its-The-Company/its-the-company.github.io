---
layout: "default"
title: "T-2738: review of T-2661 and T-2665, the killed row&#x27;s margin figures and the judged marker (Idris; b8b7e5bd1, 7f66e0d9a, 12aebde0e)"
section: "documents"
description: "Verdict: PASS. The first thing that broke was the evidence, not the code: the mutant commit (12aebde0e) never reached main, so the board&#x27;s evidence path does not exist there (L1). The product change does what both tasks\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2661-t2665-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 17 · Sat Nov 7</span><span><code>pywidget/docs/reviews/t2661-t2665-pernille.md</code></span></div><h1>T-2738: review of T-2661 and T-2665, the killed row's margin figures and the judged marker (Idris; b8b7e5bd1, 7f66e0d9a, 12aebde0e)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Verdict: PASS.** The first thing that broke was the evidence, not the code: the mutant commit (12aebde0e) never
reached main, so the board's evidence path does not exist there (L1). The product change does what both tasks ask.
In the gate build a run that dies now has its margin verdict on the `killed` row the next process writes. A judged
demotion that the list cannot take is kept as a marker, so the next process demotes the widget before it runs it
again. A shipping build writes no gate fields, whatever a marker holds. No crash path in normal use, no data loss, no
App Review issue. Findings: 0 High, 1 Medium, 3 Low. None is a FAIL finding, so I added no board line. M1 is a cheap
fix and should go in before the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> ships to anyone outside the company.

Read: the three commits' diffs; at HEAD 3d84d4dfb, ExtensionLane.swift `turn` (:247-313), `log` and
`logMarkerDemotion` (:395-443), the stuck path in `run` (:509-520); LaneGuard.swift `LaneDemotions.ids/add`
(:164-190), `carryOut` and `keep` (:219-234), `LaneRunFiles.Marker`, `writeMarker`, `markerContent` (:370-405);
RunLogRecorder.recordLaneTurn; lane.py's Not held entry for `ext.marker` (:181-192); WidgetScriptSave's
`clearLastRun` calls. After 7f66e0d9a, main changed only comments and the gate mark in these two files (T-2662,
T-2721, T-2851). None of those changes touches the reviewed logic. I did not read Idris's notes beyond the commit
messages.

## Runner checks

- **MacBook full suite, covering the fix:** J-20261107-0813-xc-test at dd99eefbf passed 1493/0.
  b8b7e5bd1 and 7f66e0d9a are ancestors of dd99eefbf (`git merge-base --is-ancestor`). The suite ran all 8 new tests:
  the 3 T-2661 ExtensionLaneTests, `testAnEnforcingBuildIgnoresTheFiguresInAMarker`, the 2 T-2665 ExtensionLaneTests,
  and in LaneGuardTests `testCarryOutKeepsADemotionItCannotWriteAsMarkers` and
  `testTheMarkerHoldsItsContentAndJunkReadsAsNone`. PyWidgetTests' sources include Tests/, so they cover
  Tests/Core (project.yml:393-397).
  I queued nothing new.
- **12aebde0e is not on main and is not an ancestor of dd99eefbf.** Its replays 0751c5692 and 9ae4d8103 did not land
  either. The commit is <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> (ops/personal_retry.txt:144, `parked/b3/20261107-090441-q216 T-2661 host`). See L1.

## What I checked and found sound

- **Figures before the run, gate build only.** `figures` is nil unless `recordOnly` (ExtensionLane.swift:287-290).
  The shipping marker is `writeMarker(nil)`, an empty file, as before. testAnEnforcingBuildsKilledRowHasNoFigures
  pins the empty file byte for byte.
- **Copy onto the killed row, gate build only.** `logMarkerDemotion` takes figures only when `recordOnly` (:442). A
  gate build's marker found by a shipping build installed over it writes a bare `killed` row. The test is
  testAnEnforcingBuildIgnoresTheFiguresInAMarker. The headroom column goes through `recordLaneTurn(headroom:)`. The
  new parameter has a nil default, so every other caller is unchanged.
- **Stuck runs.** A stuck run keeps its marker, and its own `stuck` row gets the figures through `ran.log`
  (:297-305). The next process writes no row over it (:441). The verdict is on exactly one row either way.
- **Junk markers.** Any content that does not decode reads as no content, and the file still demotes
  (`hasMarker` decides, not `markerContent`). This holds for a negative headroom too, through UInt64 decoding. The
  test is testTheMarkerHoldsItsContentAndJunkReadsAsNone.
- **T-2665 order.** `carryOut` writes the judged markers before `exit()`. `keep` skips an id that already has a
  marker, so it never turns a real <span title="A test written in advance. If it fires, we drop the idea.">kill</span> into a judged one. A judged marker found later demotes the widget, writes no
  `killed` row and leaves status.json alone (:439). The run that came back already wrote its own row before the
  judging (:297-305).
- **A holder that never lets go.** A script's flock on `.lane-demoted.lock` held in the extension's own process
  blocks the extension's own `add`, because flock is per open file description. `add` times out, `keep` writes the
  marker and `_exit` drops the script's fd. The next process's `add` then succeeds. A list that reads as nil fails
  `add` every time. The marker then stays and keeps returning `.demoted`, which is consistent with `isDemoted`
  failing closed.
- **Blamed ids.** `WidgetFolder.url(for:in:)` validates each id before `keep` writes anything (LaneGuard.swift:229),
  so a report cannot steer the write outside `widgets/`.

## Findings

**M1. `Shared/LaneGuard.swift:400-403` (`markerContent`), called at `ExtensionLane.swift:249`. Medium.** The marker
path now reads the whole `ext.marker` into memory with `Data(contentsOf:)`. It does this in the widget extension,
before `demotions.add`. lane.py:181-186 already accepts that a script can write this file by its path. Before this
change its content was never read, so the worst a forged marker did was demote its own widget. Now a script that
writes tens of MB there kills the extension on that widget's next turn, before the demotion lands. The marker stays,
so every later turn for that widget kills the extension again. Other widgets' runs in flight in that process die with
it and get demoted. The widget that caused it never does. What the user sees: all their widgets go stale or demoted,
and one keeps its place. A real marker is under 200 bytes. Fix: read at most 4,096 bytes
(`FileHandle.read(upToCount:)`) and treat anything longer as no content. A test can write 4,097 bytes of valid-looking
JSON and expect nil plus a demotion. `LaneDemotions.ids()` (:164-169) has the same whole-file read on the list. That
read is older, and lane.py:165 names its route. It deserves the same <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, but it is outside this review.

**L1. Evidence: `pywidget/ios/Tests/mutants-t2661-results.txt` and `mutants-t2661.json` are not on main.** They exist
only in 12aebde0e and its parked replays. The board line and T-2661's done-note point at a path that does not exist on
main. The commit's RefreshAgeRendererTests.swift hunk is already on main in another form (T-2456, 23e7a7d5f).
That is a likely cause of the replay's rebase conflicts (T-3034 lists 2). Fix: re-land only the two mutant files and
drop the test hunk. I read the 4 mutants in 12aebde0e and they target the right lines. The figures written, the
figures copied, the shipping copy and the shipping write are each guarded by a test that the full suite ran. I trust
"4 of 4 killed" as reported, but nobody has reproduced it on main.

**L2. `App/Runtime/_pywidget_runtime/lane.py:181-192`, Not held entry for `ext.marker`.** The entry still describes
only an empty marker that exists or does not. The new content opens two routes, which the Swift doc comment on
`LaneRunFiles.Marker` names and the register does not. (a) A script writes `{"judged":true}` into its own marker
during its run. Its later memory kill is still demoted, but no `killed` row is written and status.json stays as it
was, so the person never sees that it was killed. (b) In the gate build, forged `figures` change the margin verdict
that T-0680 counts. Then add M1's route, or its cap. Fix: three lines in the entry.

**L3. T-2665 has no mutants, and one branch is untested.** Dropping `if !files.hasMarker` in `keep`
(LaneGuard.swift:232) would overwrite a real kill's empty or figures marker with a judged one, and that kill's row
would be lost. No test covers it. Today it is unreachable: a blamed id is the current run or the one before it, and
both markers are already cleared before the judging. A future caller of `keep` could reach it, and the mutant would
survive. The other T-2665 branches are covered. Removing the `judged` guard (ExtensionLane.swift:439) fails
testAReportTheListCannotTakeIsKeptAsAMarker on its rows assertion. Writing an empty marker fails the LaneGuardTests
`kept` assertion. Not writing one fails both tests. Fix: a LaneGuardTests case that leaves an empty marker on "a",
holds the lock and expects `markerContent()` to stay nil afterwards, plus a mutants file for T-2665.

## Note, not a finding

Nothing <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> a demotion today: there is no `LaneDemotions.remove`, and WidgetScriptSave's `clearLastRun` clears only
the peak and the refusal file. When a "try it in the widget again" path is built, it must also clear `ext.marker`.
Otherwise a judged marker left by a failed `add`, or any older marker, demotes the newly saved script at its first
turn.
{% endraw %}

</div>
