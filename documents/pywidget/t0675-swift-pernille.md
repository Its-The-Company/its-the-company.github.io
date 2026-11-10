---
layout: "default"
title: "T-1838: review of T-0675&#x27;s Swift half (extension lane (c)), Pernille, 2026-11-03"
section: "documents"
description: "No blocker for a TestFlight build with the flag off. WidgetLane.extensionFlag is false in every build that is not Debug with PYWIDGET_LANE_FORCED (LaneGuard.swift:14-18), so ExtensionLane.refresh is never called\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0675-swift-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0675-swift-pernille.md</code></span></div><h1>T-1838: review of T-0675's Swift half (extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> (c)), Pernille, 2026-11-03</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Independent review (Commandment 13) required by T-0675's done condition before any TestFlight build. Read against
ADR-007 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 2026-10-29 8:03 AM items 1-2 (with the later chair lines the code cites: 2026-11-01 1:03 PM, 6:17 PM,
2026-11-03 2:24 PM) and the T-0675 board line. I read the code at HEAD (1b57eb1d2), not Idris's notes. Scope: Idris's
T-0675 commits 5e8bd7660 through f75c0ff34 and dd26184c2 (privacy manifests). Files read: Shared/ExtensionLane.swift,
Shared/LaneGuard.swift, Shared/Bridge/RunResultSink.swift (lines 20-137), App/Projects/LaneMirror.swift,
App/Projects/WidgetScriptSave.swift (send's mirror path), Widget/PyWidget.swift (provider), Shared/WidgetPlacement.swift
(Pro gate), the two PrivacyInfo.xcprivacy diffs. All paths below are under pywidget/ios/.

No Xcode run (Idris holds the slot). Host tests run: pywidget/tests/privacy/test_manifest_sources.py (4 OK) and
pywidget/tests/bridge/test_lane.py (OK). One fact checked in the SDK: the os/proc.h header comment on
`os_proc_available_memory` (iPhoneOS.sdk, lines 80-82).

## Verdict

**No blocker for a TestFlight build with the flag off.** `WidgetLane.extensionFlag` is `false` in every build that is
not Debug with PYWIDGET_LANE_FORCED (LaneGuard.swift:14-18), so `ExtensionLane.refresh` is never called
(PyWidget.swift:37). The only lane code a flag-off build runs is the mirror on save, which is sound (F8 is a Low).

**Changes required before the flag opens, and F4 before the device session (T-0680):** F1 to F5. F1 is the one that
would hurt people: the margin rule lets a run start when the process is already over its memory limit.

No finding is a security weakness, so nothing is HELD under Commandment 42.

## Findings

### F1. High (before the flag opens): headroom 0 lets a run start in a process that is over its limit

LaneGuard.swift:249-251: `headroom == 0 || headroom >= need(...)`. The comment (228-233) reads 0 as "the Simulator's
answer, unknown". The SDK header says otherwise: "0 is returned if the calling process is not an app, or the calling
process exceeds its memory limit" (os/proc.h:81-82). On a phone, 0 is either "this process has no limit we can read"
or "already over it". In both cases the rule passes, and Python starts in the one state the margin rule exists to
stop. The next jetsam <span title="A test written in advance. If it fires, we drop the idea.">kill</span> then demotes the widget, but only after a kill, which is what the rule was meant to avoid on
a smaller phone (8:03 AM item 5, last sentence). ExtensionLane.swift:66 makes it worse: `headroom` defaults to `{ 0 }`,
so any caller that leaves it out gets the rule switched off without anyone noticing.

Fix: treat 0 as unknown only under `#if targetEnvironment(simulator)`. On a device, 0 refuses (`oomGuard`, the
refusal path at ExtensionLane.swift:149-156). Remove the default from `init` so every caller has to pass a headroom.
The stubbed-headroom test for 0 splits into two: a simulator case that passes and a device case that refuses. If T-0680
step 2 finds that the extension always reads 0, the gate fails as item 5.2 already says.

### F2. Medium: a queued turn runs after its own getTimeline has answered, and its marker can demote a healthy widget

ExtensionLane.swift:103-116 and 124-140. Turns run one at a time (`lastTurn`). `refresh` returns at 4 s, but a turn
waiting in the queue still writes `ext.marker` and runs when its time comes, which can be after its caller, and every
other caller, has been answered. Nothing promises the extension any lifetime after it answers. If the system kills it,
the marker stays and the next call demotes the widget (129-131), though the script did nothing wrong. If it suspends
the process while the sink holds `state.lock` on a shared-container file (RunResultSink.swift:123), the process is
killed (0xdead10cc, as LaneGuard.swift:201-202 itself warns) and the result is the same. When it happens: three or more
lane widgets reloaded together (after a save or a Refresh tap) with more than 4 s of work queued, or any widget queued
behind F3.

Fix: hand the caller's deadline to the turn. A turn that comes up with less than `budgetSeconds` plus the stop
<span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>'s margin left before that deadline does not run and writes no marker. It returns `.deadline`, the cached tree
stands, and the next reload runs it. Test, red first: three stub runs of 1.5 s each with a 4 s deadline; the third
never calls `run` and leaves no marker.

### F3. Medium: after a stuck run the process carries on, and every later lane run there is a 2 s `busy`

ExtensionLane.swift:140 and 222. A `stuck` run correctly keeps its marker, but the process goes on with a script thread
that never comes back. The comment at 224-225 says what follows: each later run "waited out its budget behind another
run and never started". So every other lane widget in that process spends 2 s per turn, gets no tree and is not
demoted, and those 2 s queue up into F2. The bridge contract's rule is "stuck in C past the deadline means quit and
reopen"; in the extension, the equivalent is ending the process.

Fix: on `ran.stuck`, close the lane for the rest of this process: later `refresh` calls return the cached tree with no
marker and no run. Then end the process once `inFlight` is empty, using the same `exit` closure `judge` uses. Test: a
stub run that returns `stuck: true`; the next refresh for another id never calls `run` and calls `exit` once.

### F4. Medium (planning; blocks T-0680): the device gate session cannot run the lane as built

T-0680 and ADR-007 item 5 call for a Release build on the oldest phone. The lane can only be forced on in Debug
(LaneGuard.swift:11-18: "no Release build can"). Even in that build, `LaneMargin.firstRunNeed` is 42 MiB, above the
recalled C of 30 MB (LaneGuard.swift:236-240, as the comment says). So on a phone, every first run is `oomGuard`, and
the widget is demoted in the next process (ExtensionLane.swift:149-155). <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span>, G3 and the halt-time ramp would measure
refusals, not runs.

Fix: before #100 lands, add a gate-session switch: a Release build setting that no shipping or archive scheme defines,
with a host test that checks this. Give it a record-only margin (it measures headroom and need and logs both, but never
refuses), or write into T-0680 how G1 to G3 get their numbers through the margin rule. Not a code bug today; without
it, the signing day yields no gate numbers.

### F5. Medium (tracked by T-1140): the extension writes no status.json and no run row

ExtensionLane.swift:87 and 228: the extension's sink writes `tree.json` only. Nothing in Widget/ or ExtensionLane.swift
calls `WidgetStatusStore` or `RunLogStore`. The store side already takes `state.lock` (WidgetStatus.swift:416,
RunLogStore.swift:75), so chair item 2's "flock in both processes from day one" holds for the app only. As a result,
lane outcomes (`error`, `timeout`, `deadline`, `oomGuard`, `demoted`, `locked`) reach neither the widget's face nor
Activity, and G3's "the Activity row" cannot pass. T-1140 already says "else T-0675 does". The board line keeps the
extension half from being lost between the two tasks.

### F6. Low: LaneDemotions waits on flock with no bound

LaneGuard.swift:178-185: `flock(fd, LOCK_EX)` loops with no bound, under a process-wide NSLock, on a Swift-concurrency
thread. No app-side caller exists today. T-1643 adds one (a locked remove), and an app suspended mid-hold would block
the extension until the system kills the app. The comment at 175-177 already asks for this fix. Fix: use the bounded
`LOCK_NB` retry that `WidgetStateLock` uses (0.5 s). A failed `add` already keeps the marker for the next call
(ExtensionLane.swift:130), so a timeout loses nothing. Fold into T-1643.

### F7. Low: `Foundation.exit(0)` with live threads

ExtensionLane.swift:90. `exit` runs atexit handlers and C++ static destructors while the Python thread and other
getTimeline tasks are still running. That can crash on the way out, so a deliberate end becomes a crash report. The
demotion is written and read back before `exit` is called (LaneGuard.swift:194-197), so nothing needs flushing. Fix:
`_exit(0)`.

### F8. Low: in a flag-off build, a mirror failure undoes the person's save

WidgetScriptSave.swift:282-285. The mirror is not gated on the flag (LaneMirror.swift:15-17, on purpose). If its
rename fails, the whole send is undone with "Its widget's copy for the extension couldn't be replaced", which fails a
save for a feature that is off. A stale mirror would be worse, so keep the rule when the flag is on. With it off, a
mirror failure should remove `lane-scripts/<id>/` best-effort and let the save stand: a missing mirror runs in the app
(LaneMirror.swift:11-12).

## Checked and sound

- **Margin rule** apart from F1: need = 2 x (peak - residue), overflow clamped, no peak or 0 is the first-run figure
  (LaneGuard.swift:243-247), matching the 2026-11-01 1:03 PM line. Lifetime peak is counted only when this run raised it
  (LaneGuard.swift:287-291), so a neighbour's peak never charges this widget.
- **Deadline**: `upTo` never waits on the script thread and never cancels it (ExtensionLane.swift:166-182). The `Once`
  wrapper resumes exactly once. A snapshot never runs (PyWidget.swift:31-38).
- **Marker order** (ExtensionLane.swift:127-143): ProGates first, with no marker, so a lapsed Pro is not read as a dead
  run. A demotion that cannot be written keeps the marker. The marker comes off before `judge` can end the process, and
  a stuck run keeps it.
- **Two writers of tree.json** (RunResultSink.swift:74-83, 117-131): read, compare and atomic rename in one
  `state.lock` hold. Only a tree that landed during this run and was sampled later stands. A `sampled_at` past the
  clock holds nothing, so a script cannot freeze its widget. With the flag off there is one writer.
- **Mirror** (LaneMirror.swift:53-130): one rename (RENAME_SWAP or RENAME_EXCL) as the send's last step, staged in the
  same container, earlier renames undone on failure. Identical bytes move nothing. A send that does not qualify removes
  the mirror. LaneEntry.resolve (ExtensionLane.swift:258-273) refuses links and paths that escape the folder, and a
  moved mirror clears `lane-peak` and `lane-refused` (WidgetScriptSave.swift:286).
- **ProGates**: the lane asks `ProEntitlement.mayWriteTimeline`, the gate drawing uses (WidgetPlacement.swift:17-18,
  PyWidget.swift:27-29), from StoreKit in the extension, with no App Group snapshot. A premade's entry comes from the
  bundle's list only (Premades.swift:109-113).
- **Privacy manifests** (dd26184c2): the extension declares FileTimestamp C617.1, the app declares C617.1 and
  UserDefaults CA92.1. bench/t0675-privacy-scan.txt shows red before and green after, with 5 of 5 manifest mutants
  killed. I re-ran the source test: 4 OK. The Release warning (declared but unused while the lane is compiled out) is
  expected.

## Board lines for Idris

F1, F2, F3, F4 and F5 have one line each. F6 to F8 share one line.
{% endraw %}

</div>
