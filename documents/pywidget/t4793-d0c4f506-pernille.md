---
layout: "default"
title: "Review of T-4793 at d0c4f506: the Day phases refresh path (plan s4.3, s9, s10; premade-inputs s0)"
section: "documents"
description: "Pass with fixes. Every Fix and Done when on T-4793&#x27;s line is met, and every claim I checked against ADR-007, ADR-011, log/rulings.md and the code at d0c4f506 is true, the corrected ADR-011 s4 citation and the absence of\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4793-d0c4f506-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t4793-d0c4f506-pernille.md</code></span></div><h1>Review of T-4793 at d0c4f506: the Day phases refresh path (plan s4.3, s9, s10; premade-inputs s0)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5468, Commandment 13). Author: Ines. Reviewed: e29cc78eff, the T-4793 commit on top of the
d0c4f506 plan (its parent f13c5654ef merges d0c4f506; `git merge-base e29cc78eff d0c4f506` is d0c4f506), changing
[`ops/plans/T-4672-showcase-premades.md`](../company/t-4672-showcase-premades.html) and [`pywidget/docs/design/premade-inputs.md`](premade-inputs.html). 0cde42ff43, the same change on
another <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, has the same patch-id for those two files (c79161d356 for both), so this review covers both. Main
carries it (`widget lane first` at plan line 201 on main). Code and ADRs read at d0c4f506; between d0c4f506 and
e29cc78eff only `pywidget/ios/spikes/T-0044-webview/` changes under `pywidget/ios`, and no ADR changes. The T-4795
section of the plan is another reviewer's and is not read here. I read the diff and the commit message, not the
author's reasoning. Plan line numbers are e29cc78eff's. Date: 2026-11-21.

## Tests run

Host only, read-only; no Xcode, no Simulator, no device.

- `git grep "BGTaskScheduler\|\.backgroundTask\|UIBackgroundModes\|BGAppRefreshTask" d0c4f506 -- pywidget/ios`: two
  comment hits only, `Shared/RefreshSchedule.swift:5` and `Tests/Core/RefreshScheduleTests.swift:8`. Background
  refresh is not built, as the plan says (line 252-253).
- Every cited code line opened at d0c4f506 (list under "What holds").
- `log/rulings.md` at d0c4f506: line 2102 is #283's heading (11-13 10:46 AM), line 2640 is #278's Effect ("background
  refresh is free"), #324 A is the 2026-11-18 12:36 AM entry at line 2994.
- The board note on the Day phases build line: `ops/board_notes/T-4673.md:3` ("Ines 4:01 PM (T-4793, plan s4.3
  rewritten) ..."), matching the queued record in e29cc78eff's `ops/lane-outbox/a-1795294897446227000-72215.json`;
  the event (4:01:44 PM) is `log/events.jsonl:4816`. Commit time 4:01:52 PM; no time in the texts disagrees.

## The line's Fix and Done when


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The line&#x27;s Fix and Done when, scrolls sideways" style="--tw:960px" markdown="1">

| Asked | Where | Met |
|---|---|---|
| Widget lane first: fetch plus pure-Python decode inside 2.0 s at P <= 11 MB, measured in the Day phases build | plan 208-217 | yes |
| App lane on app open, refresh tap, Shortcuts automation as fallback | plan 235-249 | yes |
| Background refresh only once built | plan 250-255 | yes (adds "a signed phone has seen it fire", ADR-007 s12) |
| What the Gallery page may claim | plan 261-271 | yes; see L1 |
| s9 rewritten | plan 512-521 | yes |
| Note on the Day phases build line | `ops/board_notes/T-4673.md:3` | yes |
| Done when: "widget lane first" in the plan | plan 201 | yes |
| Done when: premade-inputs s0 says how Day phases refreshes | `premade-inputs.md:80-90`, inside "## 0." (line 43) | yes; see L2 |

</div>


## What holds

- **ADR-011 s4 has no "network wait".** Read whole (ADR-011 lines 97-118): it is the button table and the in-widget
  run's lock, margin and 2.0 s budget; "network" appears nowhere in the section. The correction (plan 202-203) is right.
- **`pywidget.net.get` in both processes.** ADR-007 s2's table, last row; `Shared/Bridge/LaneDevice.swift:38` routes
  `net` calls not in `NetCall.appOnlyMethods` to `NetCall.handle` in the extension. True.
- **A WidgetKit reload of an app-lane widget runs no Python.** ADR-007 s4.1 T6: "no app run ... an app-lane widget
  reads its saved tree". The plan cites T6, which is more exact than the line's s2 and s3 item 7. ADR-007 s3 item 7
  lists "when the app is open, by the refresh tap, and in the background with Pro": the plan keeps the first two and
  puts the third behind T-0793 and T-0795, both open on the board.
- **Lane limits.** 2.0 s (`budget_s`, ADR-007 s5 "Time"), P <= 11 MB at W = 23 MB (s3 items 2 and 3), 256 KiB body and
  512 KiB escaped reply in the extension (`Shared/NetFetch.swift:16`, `:32`), the 3.0 s request cap (`:18`). No
  `struct` on the lane's allowlist (`_pywidget_runtime/lane.py:273-278`), so the decoder's `int.from_bytes` plan holds.
- **The 15-minute rerun floor.** `Shared/LaneRerunRule.swift:40-47` (`due` = max(last run + `RefreshSchedule.floor`,
  ...)); `RefreshSchedule.swift:15` sets the floor to 15 * 60; `Widget/PyWidget.swift:53` calls the rule before
  `ExtensionLane.shared.refresh`. True.
- **`net.get` is text only** (`pywidget/net.py:19-22`: the charset, else UTF-8, U+FFFD for bytes that do not decode;
  `Response` holds `text` only, `:76-84`). A GTFS-realtime protobuf cannot pass intact. `net.request` returns
  base64 bodies (`Shared/NetFetch.swift:363-370`) and is app-only (`lane.py:522`; `Bridge/NetCall.swift:13`). This is a
  real find the original plan and my T-4720 review both missed.
- **The lane flag.** `Shared/LaneGuard.swift:16-19`: on only with `PYWIDGET_LANE_FORCED && DEBUG` or
  `PYWIDGET_LANE_GATE`. T-2317 is open and says what the plan says it says. s10 item 4 is the right place for it.
- **Refresh tap.** `Shared/RefreshTapRule.swift:22-25` and `Shared/ExtensionLane.swift:288-290` (`.notInLane` for an
  entry the lane does not hold) bear out "in the extension an app-lane widget runs nothing";
  `RefreshWidgetIntent.swift:21-22` pins iOS 27+ to `.main`. Maren's frames (`widgets/showcase.md`, Day phases) draw no
  refresh button.
- **Shortcuts.** `Shared/RefreshWidgetsIntent.swift:10-12, 26`: runs the placed widgets' scripts where the app's
  writer is installed, else a plain reload. The plan's "Not yet tried with Day phases on a phone" (line 241) is the
  honest form.
- **34 asks.** Two transit phases of 4 hours each (s4.1): 2 asks before them plus 4 x 8 inside, 34. L2's 40 to 70 for a
  frequently viewed widget, fewer when rarely viewed (`docs/research/L2-refresh-budget.md:15`), quoted right.
- **Gallery limits.** ADR-007 s10's sentence is quoted word for word, and "no number" plus creative approval for store
  copy is what s10 says. #324 A (rulings 2994) does make a widget's own in-widget updates free for everyone.
- Out of scope, already owned: ADR-007 s3 item 7 and s12 still say background refresh is Pro (T-4821); plan s7's
  `free.all` row still lists background refresh (T-4794, my T-4720 H2).

## Findings

### M1. One Day phases script cannot carry both fetch paths: the lane scan sends it to the app for good

Plan 235-236: in the app lane "the fetch reads the body as bytes (`pywidget.http`'s `content`, or `urllib`)"; plan
274-275: "the same code runs in either lane". The lane is chosen by a static scan of the whole source:
`lane.py:403-427` (`_imports`) walks every node of the AST, so an import inside an `if` counts; `pywidget.http` is in
`DENIED_SUBMODULES` (`lane.py:301-304`) and `urllib` in `NEVER` (`:291-294`), and `scan_source` (`:440-445`) refuses
both. A premade is placed by that same check before any run (`lane.py:513-516`, T-4631; ADR-007 s5 "The premade list":
"only if its scan is clean").

Failure case: T-4673 writes `day_phases.py` with `net.get` for the widget and `pywidget.http.get(...).content` as the
app-lane fallback. The scan finds `pywidget.http`, the premade is `app` on every phone, and the widget-lane path the
plan puts first never runs, with no error anywhere to say why.

Fix: state the order in s4.3 item 1 and item 2. Until a binary-safe `net.get` exists, Day phases fetches with
`pywidget.http` and is an app-lane premade (the editor says so, ADR-007 s3 item 8). Once it exists, Day phases fetches
with `net.get` only, in both lanes, and imports neither `pywidget.http` nor `urllib`; T-4673's host tests assert
`lane.scan_source` of the module is empty at that point. Board: T-5494.

### L1. "Always true": opening PyWidget does not always update a widget-lane Day phases

Plan 263-264 allows, always: "opening PyWidget updates them". T1 runs app-lane widgets only and then reloads every
timeline (ADR-007 s4.1 T1). A widget-lane Day phases then reruns only if its last run is 15 minutes old or more
(`LaneRerunRule.swift:40-47`, `PyWidget.swift:53`); inside that window opening PyWidget redraws the same times. And
offline, in either lane, nothing updates (the last good tree stays, plan s4.3 "Parsing"). The sentence is close to
true, but s4.3 calls it the one always-allowed claim under Commandment 6. Fix: "opening PyWidget asks for new times",
or say "times older than 15 minutes". Board: T-5495.

### L2. premade-inputs s0 and plan s9 drop the hedges plan s4.3 keeps; one plan attribution is off

- `premade-inputs.md:86` names the Shortcuts automation as a path with no "not yet tried with Day phases on a phone"
  (plan 241); plan 515-516 (s9) does the same ("fresh when PyWidget opens or a Shortcuts automation runs").
- `premade-inputs.md:87-88`: background refresh "counts only once T-0793 is built and kept in 1.0"; plan 254-255 and
  ADR-007 s12 "Whether it ships" also need a signed phone to have seen it fire.
- `premade-inputs.md:84` names only the 256 KiB body cap; for a binary body the 512 KiB escaped-reply cap
  (`NetFetch.swift:22-26, 32`) can be the one that binds (see L3). Plan 219-220 has both.
- Plan 217: "The extension cuts a request to the time left and never past 3.0 s (`Shared/NetFetch.swift:18`)". The cut
  to the time left is Python's (`net.py:16-17`); Swift's part is the 3.0 s cap.

Fix: carry the three hedges into s0 and s9, and split the attribution in plan 217. Board: T-5496.

### L3. The binary-safe `net.get` the plan defers has two constraints its future line needs

Plan 226-229 leaves the line to T-4673. Two facts at d0c4f506 decide its shape, and the plan should carry them:
a lane script cannot import `base64` or `binascii` (neither is in `ALLOWED`, `lane.py:273-278`), so the bytes must be
decoded inside `pywidget.net` (an off-list name is refused only from a person's frame, `lane.py:518-520`); and the wire form decides the reply cap: base64 turns a 256 KiB body into about 342 KiB, under the
extension's 512 KiB, while escaped text grows a non-text byte to 3 bytes and a control byte to 6 (`NetFetch.swift:22-26`),
so a binary feed well under 256 KiB can be refused. One route to weigh against a new primitive: admit `net.request`
(already base64, `NetFetch.swift:369-370`) in the extension under `Limits.widgetExtension`. Fix: two sentences in
s4.3 item 1 and the T-4673 note. Board: T-5497.

### Info (no work)

- In the app lane the 34 asks only redraw (plan 259-260), which the 5-minute timeline entries already do; they spend
  that widget's own budget and nothing else. Harmless; the same tree serves both lanes.

## Verdict

**Pass with fixes.** Every Fix and Done when on T-4793's line is met, and every claim I checked against ADR-007,
ADR-011, `log/rulings.md` and the code at d0c4f506 is true, the corrected ADR-011 s4 citation and the absence of
background refresh included. The rewrite also found a real blocker (`net.get` is text only). M1 is the one that would
cost a week: as written, the fallback import would keep Day phases out of the widget lane for good. Lines for Ines:
T-5494 (M1), T-5495 (L1), T-5496 (L2), T-5497 (L3).
{% endraw %}

</div>
