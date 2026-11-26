---
layout: "default"
title: "T-4182 handoff (lane a2, 2026-11-26 01:2x)"
section: "documents"
description: "The session reached MERGE POINT: yes at minute 108 (the hand-in) after three step commits. Pernille reviews once at the merge point."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4182-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 36 · Thu Nov 26</span><span><code>ops/plans/T-4182-handoff.md</code></span></div><h1>T-4182 handoff (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a2, 2026-11-26 01:2x)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The session reached MERGE POINT: yes at minute 108 (the hand-in) after three step commits. Pernille reviews once at the merge point.

- On main already: T-3791 (692ac2e857), T-1765, T-1643. T-3792 belongs to T-5797's session.
- On this branch (personal/a2):
  - T-3291 slice 1, 042b2dd841 (partial, no Plain line): TreeProvider.drawn badges from status.json through
    `WidgetBadge.of` (Shared/WidgetBadge.swift) as well as the demoted list; the cause (script, norun, memory, moved)
    gives CornerMark s11's VoiceOver words (state-tokens.json voiceover badge_*, DRAFT <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>) and, on medium and
    larger, the slot's own Link to Activity; small and the Lock Screen tap through to Activity. Whole unit 2425/0
    (J-20261126-0012-land-chk-a5ab71-1-58b117), RunLogUITests 2/0.
  - T-2836, b7a9e98c4a: a report demotion writes its demoted row. Whole unit 2430/0
    (J-20261126-0053-land-chk-a5ab71-2-4628e5), RunLogUITests 2/0.
  - T-2841, 1693b7f060: (a) WidgetStatusTests clock-stepped-back pin, (b) four refusals of one reload in ExtensionLaneTests (a
    fresh-picture test plus the no-status case, which does badge as memory: the first refusal reads as under way).
    (c) was answered by Ines (T-2846 item 7). Whole unit 2431/0 (J-20261126-0119-land-chk-a5ab71-1-3878a9).
- T-3291, still open:
  1. **<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Chair</span> question for Ines, unanswered:** s11 row 6 (`expired` with `failing_since` keeps the badge) narrows
     ADR-007 2026-10-26 2:40 AM item 1 (no badge). Building it turned WidgetStatusTests (a) red, so showsBadge's expired
     case is unchanged and WidgetBadgeTests pins it as 2:40 AM has it. If Ines rules for s11, flip the one case in
     WidgetStatus.showsBadge and the two tests.
  2. The norun card (s11 "No picture yet"): StateCard needs a norun variant and copy keys `norun.*` in state-tokens.json.
  3. Simulator check: dark large slot contrast (3.86:1 drawn) and accessoryCircular clipping (s8 item 2).
  4. `moved` has no time to say ("Last run was stopped."): the demoted list keeps none.
- T-2232, not started, needs a person's answer: ADR-007 revision 2 (section 3 item 1, chair line 2026-11-13) now
  says `peak_mb` on lane rows is P, the peak above the process's baseline, which is what the lane writes today. The
  <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> patch (refs/archive/parked/b3/20261109-152815-recut, 50543fd25d) made `peak_mb` the lifetime peak in both
  lanes and would contradict r2. What is left is the app row's meaning (lifetime peak when the run raised it, vs r2
  3.5's "peak above the app's footprint at its start"); ask Ines which, then record it in r2 section 9 or 3.
- T-2492, next: the parked commit b43cac308d marked a stuck run's marker with the text "stuck"; main's marker is now
  the Codable `LaneRunFiles.Marker` (figures, judged), so add `stuck: Bool?` to it, write it in `turn` when
  `ran.stuck`, and in `logMarkerDemotion` skip the killed row only when `found?.stuck == true` and the last lane row
  is stuck. Tests from b43cac308d's ExtensionLaneTests hunk (stuck, un-demote, marker with no row ends killed).
- `swift build` in pywidget/ios/Core fails on main: WidgetID.swift:212 uses ProcessKind, which is not in Core.
{% endraw %}

</div>
