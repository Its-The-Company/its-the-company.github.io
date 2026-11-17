---
layout: "default"
title: "T-4188 handoff"
section: "documents"
description: "Branch personal/a, from main 51e2c94187. On it, not landed: e58b4d893b T-1241, 534e1793a3 T-0543, 706c248efe T-1671, f238a802e0 T-1672, then 53ea686e39 T-2027 (this session). T-3554 (0ca25f84f9) and T-0550 (51e2c94187)\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4188-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 27 · Tue Nov 17</span><span><code>ops/plans/T-4188-handoff.md</code></span></div><h1>T-4188 handoff</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Branch personal/a, from main 51e2c94187. On it, not landed: e58b4d893b T-1241, 534e1793a3 T-0543,
706c248efe T-1671, f238a802e0 T-1672, then 53ea686e39 T-2027 (this session).
T-3554 (0ca25f84f9) and T-0550 (51e2c94187) were already on main: no new commit for either.

## T-2027: done here, cause named

On never-used iPhone 17e Simulators (iOS 27.0; 60E96F53, E86936B6, 30C42DD8) the notification server first
answers `notificationSettings()` after 27-172 s, grants provisional in under 1 s, then refuses `add` with
UNErrorDomain 2003 ("Repository could not save notification. Source is not authorized.") for more than 10 s
in the same process (40 tries, 0.25 s apart: ops/runs/xcodebuild-20261117-142143.log). A second run on the
same device passes (ops/runs/xcodebuild-20261117-130108.log). The 11-03 red was this, plus a 10 s
BridgeTimeout (device_call's DEFAULT_TIMEOUT_S), never PERMISSION_WAIT_S's 120 s.
The bridge now maps 2003 to a plain PyWidgetError ("iOS has not finished turning on notifications for
PyWidget yet.", native kept); the integration test skips, naming it, only from not determined.
Open: whether a real iPhone ever answers 2003 after a first grant (phone sitting, not the Simulator).

## T-0053: not started, waits on a person's answer (no commit)

Nothing of C2-Q1 exists yet: no second widget extension, no `NSWidgetWantsLocation`, no
`location/last.json`. Before code, Ines (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span>) and Wrenna (privacy matrix) must answer one question:

- C2-Q1 (pywidget/docs/research/C2-device-api.md s7) put the fix in the App Group on the premise
  "no Python in the extension". ADR-007 now runs <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> scripts' Python in the extension, and T-0540 moved the
  app's own location cache out of the App Group for exactly that reason (LocationCall.swift, SystemLocation
  comment). A `location/last.json` in the App Group would be readable by any lane script's Python, in either
  extension. Where may the refreshed fix live, and who may read it? Wrenna's matrix row (no label change)
  depends on that answer.

Once answered, the next session picks up in this order, each a whole tested part:
1. A Shared/ policy (no target yet): refresh only when the manifest declares `location`,
   `isAuthorizedForWidgetUpdates` is true and the cached fix is older than `max_age`; a 3 s bound, then the
   cached tree. Unit tests with a fake source, including no fix in 3 s.
2. The atomic writer for the ruled file (`source="refresh"`, `sampled_at`), and Python reading it as `refresh`.
3. The second extension target in project.yml with `NSWidgetWantsLocation` and its Privacy manifest; only
   location/steps widgets in it; PyWidgetExtension never links CoreLocation.
4. Footprint of the second extension measured in the Simulator against ADR-007 s6's margin; C2 s7 from open
   to ruled.

## Where the next session starts

1. Run the whole unit target (`-only-testing:PyWidgetTests`) on this branch if this session could not (see
   its final line below), and fix any red from the four cherry-picked commits in a new commit.
2. The skip path of testNotificationScheduleAndCancelThroughTheBridge on a never-used Simulator has not been
   seen yet (two tries ended exit 75: a stalled-lock takeover, then disk under 20 GB). A never-used
   "T2027 Idris never-used 1117d" (B584278E) is kept for it; delete it after. Note that its first settings read
   can sit silent for up to 180 s, which other sessions' xc.sh waiters may read as a stall.
3. T-0053 once Ines and Wrenna answer the question above.

Final line (11-17 ~3:20 PM): the whole unit target did not run: xc.sh exit 75, disk 13 GB free after its own
cleaning, under the 20 GB line; nothing ran. Last green on this branch's code: the six step classes, 227 tests,
0 failures (ops/runs/xcodebuild-20261117-145048.log), and host suites 21/0. MERGE POINT: no.
{% endraw %}

</div>
