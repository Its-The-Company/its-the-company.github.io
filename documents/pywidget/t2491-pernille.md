---
layout: "default"
title: "Review: T-2491, the deleted widget folder fix (cd02f8f959, Idris)"
section: "documents"
description: "Verdict: PASS with notes. The fix does what F1 asked. No widget folder is made for a user id any more on the lane paths, and premades keep every write they had. The tests go red on the old code. Two Low findings, both\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2491-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 25 · Sun Nov 15</span><span><code>pywidget/docs/reviews/t2491-pernille.md</code></span></div><h1>Review: T-2491, the deleted widget folder fix (cd02f8f959, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, T-4520, 2026-11-15. Independent review (Commandment 13). Read only: no Xcode build and no
Simulator run. Answers T-2272 F1 (pywidget/docs/reviews/t2272-pernille.md:31-33).

**Verdict: PASS with notes.** The fix does what F1 asked. No widget folder is made for a user id any more on the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>
paths, and premades keep every write they had. The tests go red on the old code. Two Low findings, both wording or
tidy-up, each on its own board line. Neither blocks TestFlight.

## What I checked

**1. Every writer that can make widgets/<id>/ in the extension's lane.** I grepped `createDirectory`, `LaneRunFiles(`
and every LaneRunFiles write in Shared/, App/ and Widget/ at cd02f8f959. Nothing has changed these files on main
since then.
- `logClosed` (ExtensionLane.swift:584-594): makes the folder only for a premade. For a user id with no folder it
  returns before `closedLogged`. Covered.
- `turn()` (ExtensionLane.swift:341): `makesFolder: RunResultSink.premadeFoldersOnly(id)`. This one `files` value
  covers `writeMarker` (:391), `recordLate` (:357, :367, :373), `record(refusal:)` (:516), `record(moved:)` (:348,
  :434, :522) and `record(peak:)` (LaneGuard.swift:549, which never made the folder). Covered.
- `WidgetLaneGuard.keep` (LaneGuard.swift:294-301), the T-2665 judged marker: premade prefix only. Covered. This is the
  writer added since F1, and Idris found it himself.
- The remaining `LaneRunFiles(folder:)` sites use the default `makesFolder = false` and only read or remove:
  ExtensionLane.swift:331 (`clearLate`), :485 (`owedSince`), RunLogRecorder.swift:98 (`movedReason`) and
  WidgetScriptSave.swift:310 (`clearLastRun`). Defaulting to false is the right choice: a new caller cannot make a
  folder unless it asks to.
- Rows and status: `recordLaneTurn` -> RunLogStore.recordWidgetRun makes only a premade's folder (RunLogStore.swift:79-81,
  T-3572). WidgetStateLock opens state.lock in the folder and does not create it, and the status write
  (WidgetStatus.swift:478-481) is a plain atomic write. So no lane row or status can bring a folder back.
- RunResultSink is already `premadeFoldersOnly` in the extension (ExtensionLane.swift:246) and in the app
  (WidgetWriter.swift:573). LaneDevice.swift:53 and heldURL (ExtensionLane.swift:621) are premade-only.
  LauncherSlots/LauncherPremadeSlots and CrashMarker write other folders, not the lane's.

**2. Is the premade/user test the same one RunResultSink uses?** Yes, in substance. ExtensionLane uses
`RunResultSink.premadeFoldersOnly` itself (:341, :587). LaneGuard.swift:298 and RunLogStore.swift:79 each repeat its
body, `id.hasPrefix(WidgetID.premadePrefix)`, because the Core package does not compile RunResultSink. The prefix match
is case-sensitive. That is safe: WidgetID.problem refuses any user id whose key starts with `pywidget.`, in any case,
so no user id can match, and the premade ids are built from the prefix itself. See L2.

**3. A rename racing the check.** `logClosed` checks `fileExists` and then writes. If the send moves or removes the
folder between the check and `WidgetStateLock.with`, the lock's open fails (ENOENT) and nothing is written. If the
folder goes after the lock is taken, the status write fails and nothing re-creates the folder. In both cases the fix is
safe because no writer after the check creates a user folder; the check itself is not what makes it safe. The only
thing that can still land is the `deferred` row in log/widgets/<id>/runs.jsonl, the Run log's own folder. That folder
is not removed with the widget (RunLogStore.swift:154-158 prunes it), so a row for a removed id there is not a T-0753
breach. In `keep` and in LaneRunFiles there is no check at all: the write into a missing folder fails, and that is the
behaviour we want.

**4. Does any premade lose a write it needs?** No. A premade gets `makesFolder: true` in `turn()` and in `keep`, and
`logClosed` still makes its folder. The order in `logClosed` changed: the premade's `createDirectory` now runs before the
`stuckHere`/`closedLogged` guard. That is harmless: the call is idempotent, and a premade that is stuck here already has
its folder from its marker. A locked premade still gets a folder and a `closed` row, because `logClosed` runs before
`mayRun`. That is T-2272 F3, which stays on T-2493; this commit neither fixes it nor makes it worse.

**5. Would the tests fail on the old code? Does the fixture match a send?**
- LaneGuardTests.swift:217 `testAFolderThatIsNotOursIsNeverMade`: with the old unconditional `createDirectory`,
  `writeMarker` returns true and both folder asserts fail. It also pins the default (`XCTAssertFalse(files.makesFolder)`).
  Red on old code.
- LaneGuardTests.swift:581 `testCarryOutMakesNoFolderForAUserWidgetThatIsGone`: the old `keep` makes widgets/gone/.
  Red. The premade half pins that a premade's marker is still written. The existing carryOut test (:556) now makes
  a/, b/ and c/ first, which is right: a widget that was blamed has run, so its folder exists.
- ExtensionLaneTests.swift:1327 `testAWidgetRemovedWhileItsTurnWaitsBehindAStuckRunStaysGone`: this is F1's exact
  failure. The old `logClosed` makes widgets/b/ with a row. Red.
- ExtensionLaneTests.swift:1350 `testATurnForAUserWidgetWhoseFolderIsGoneMakesNoFolder`: the old `writeMarker` makes
  the folder and the run happens (`ranCount` 1), and the old `recordLate` makes it too. Red.
- ExtensionLaneTests.swift:1309 `testTheClosedLaneMakesOnlyAPremadesFolder`: passes on the old code. It is a guard
  against over-restriction, not a red-first test. See L1.
- Mutations, checked by reading: flipping the default to true, passing `true` in `turn()` or in `keep`, or restoring
  the user branch of `logClosed` each turn one of the four tests above red. Existing tests that write a user widget's
  closed row with its folder present (`testTheClosedLaneLogsOnceAWidget`, :1288) guard the other direction.
- Fixture (ExtensionLaneTests.swift:1826-1833): `laneProject` now makes widgets/<id>/ next to lane-scripts/<id>/, and
  `sent: false` leaves it out for the removed state. A real send also leaves main.py in that folder (WidgetScriptSave).
  The lane never reads that file (it runs the lane-scripts entry), so only the folder matters here and the fixture is
  right where it counts. The wording at :1297 ("as a send leaves it, nothing in it yet") is not quite true; see L1.
- `testNoMarkerNoRun` now uses `sent: false`. That is right: the test plants a file where the folder would be.

**Runner:** J-20261115-1028-land-m2-035a6c passed with code 0 (ops/metrics/land_xc.jsonl, 10:38 AM ET). Its verdict
tree 3e9e2b93c3 is cd02f8f959's tree. Idris reports 1855 run and 0 failures. The record carries the code, not the
count.

## Findings

**L1 (Low, wording and test title): ExtensionLane.swift:576-578, ExtensionLaneTests.swift:1297 and :1305-1309.**
- In the `logClosed` doc, the T-2211 paragraph still says the folder is "Made here, as the late mark, the refusal file
  and the marker each make it". None of those makes a user folder any more.
- The premade branch at :587-588 duplicates RunLogStore.swift:79-81 (T-3572), which makes a premade's folder before
  the row. So `testTheClosedLaneMakesOnlyAPremadesFolder` stays green if that branch is deleted. Its title says more
  than it pins.
- The message at :1297 says "as a send leaves it", but a send leaves main.py in the folder.

Fix: reword the T-2211 sentence to "premade only" and name RunLogStore's matching rule. Either retitle the test as
what it is (the premade's closed row and status land) or drop the duplicate branch. Change :1297 to "the folder a
send makes, with no lane file in it yet". No behaviour change.

**L2 (Low, one rule in one place): LaneGuard.swift:298, RunLogStore.swift:79, RunResultSink.swift:42.** T-0753's
"only a premade's folder is ours to make" is now written three times. Core cannot see RunResultSink, so LaneGuard and
RunLogStore each repeat the prefix test. The three copies agree today, but the next one could drift (a `WidgetID.key`
compare in one place, for example). Fix: one `WidgetID.isPremade(_:)`, or a `premadeFoldersOnly` in WidgetID.swift,
which Core compiles. Use it in all three places and keep `RunResultSink.premadeFoldersOnly` as an alias to it.

## Notes (no change asked)

- N1: ExtensionLaneTests.swift:1335 relies on timing: a 150 ms sleep inside a 0.8 s hang. On a slow runner, if b's
  `refresh` has not resolved its entry before lane-scripts/b/ is removed, it returns `.notInLane` and the test goes
  red. It can fail falsely but cannot pass falsely, so I accept it. If it flakes, wait on a queued count rather than a
  sleep.
- N2: in `logClosed`, the `fileExists` early return now only keeps `closedLogged` free for an id whose folder is gone.
  If the same id is sent again in this process, its closed row is still written. That is the better behaviour.
- N3: on macOS (the Simulator host, case-insensitive APFS), a case-only id change (`b` -> `B`) leaves `fileExists`
  true for `b`. iOS devices are case-sensitive, and RunResultSink has the same property, so I raise nothing here.

Board lines (owner Idris, from T-4520): L1, L2.
{% endraw %}

</div>
