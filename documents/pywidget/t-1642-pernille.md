---
layout: "default"
title: "T-1642: independent review of the extension lane&#x27;s Python side (compiled root, Not held list)"
section: "documents"
description: "Verdict: passes with fixes. The compiled root is correct and its trust is no wider than the absolute stdlib root&#x27;s. The suite now kills 13 of 13 planted bugs (12 of 13 before this review). The Not held bullet for the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t-1642-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/T-1642-pernille.md</code></span></div><h1>T-1642: independent review of the extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s Python side (compiled root, Not held list)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. 2026-11-03. Base: 88bb11d4a (T-1634's 6920317b6 on main). Read: lane.py (`_norm`, `_under`,
`LaneFinder.configure`, `_user_frame`, `compiled_stdlib_root`, `install_finder`, the header's threat model, Not held
list and stated limit, `mirror_entry`); test_lane.py `SourcelessStdlibTests`; LaneGuard.swift (`LaneMargin`,
`LaneRunFiles`), ExtensionLane.swift (the margin and `refused`), WidgetStatus.swift (`oomGuard`, `showsBadge`);
ADR-007's <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> lines of 2026-10-29 16:54 (the board line says 2026-11-01; there is no 16:54 line that day) and
2026-11-02 04:02. Idris's notes not read, as the line asks.

**Verdict: passes with fixes.** The compiled root is correct and its trust is no wider than the absolute stdlib
root's. The suite now <span title="A test written in advance. If it fires, we drop the idea.">kills</span> 13 of 13 planted bugs (12 of 13 before this review). The Not held bullet for the three
run files had one wrong effect and two effects item 3 does not cover; the first is fixed, the two go to the chair.

## The compiled root and what it trusts

`compiled_stdlib_root()` is `dirname(dirname(json.loads.__code__.co_filename))`: the name the builder compiled the
stdlib under, relative in the zipped sourceless stdlib, the stdlib folder itself with source on disk. Checked:

- It is read once, at the first `install_finder`, before any user code, and the roots are frozen there
  (`_freeze_roots`); a later run can't rebind `json.loads` and have it re-read.
- `configure` adds a relative root as given and never its `realpath`, so it is not also resolved against the working
  directory. `_user_frame` matches a relative frame name against it with `_under` (separator-bounded, normalised),
  and a relative name outside it is user code before any `realpath` is tried.
- A frozen json (`<frozen json>`) or a builder that compiled with no folder gives `""`, which `configure` drops: the
  stdlib's own imports would then be refused in bootstrap. That fails closed and loud, not open.
- The trust it grants is the same as an absolute stdlib path's: a `compile()` that names a file under it gets past
  the frame check. The header's "Not a sandbox" paragraph already says so ("code that fakes its own file name");
  the effect is an off-list import, memory only, and NEVER names and denied submodules don't ask whose frame it is.
  No new row needed.

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Findings, scrolls sideways" data-n="1" style="--tw:1084px" markdown="1">

| # | Severity | Finding | Evidence | Status |
|---|---|---|---|---|
| L1 | Low | `mirror_entry`'s docstring said the folder sits under `<group>/scripts`; the code and the 04:02 line item 1 say `lane-scripts`. | lane.py `mirror_entry`, `SCRIPTS_DIR = "lane-scripts"` | Fixed (docstring) |
| L2 | Medium | Not held bullet for `ext.marker`, `lane-peak`, `lane-refused`: "`lane-peak` deleted lets through a run the margin would refuse" is wrong at HEAD. A missing or unreadable `lane-peak` reads as `LaneMargin.firstRunPeak` (21 MiB, need 42 MiB), which refuses every widget whose real peak was below that. Only a low value, or a deletion for a widget whose real peak was above 21 MiB, lets a run through. | LaneGuard.swift `LaneMargin.need`, `LaneRunFiles.lastPeak` | Fixed in lane.py and C2 1.7 |
| L3 | Low | `_user_frame` asks user roots before trusted ones, and nothing tested it: the mutant that swaps the two checks survived. It matters if a learned root is ever wider than the stdlib. | t1642-evidence/mutants_result.txt (last block) | Fixed: `test_a_user_root_inside_a_trusted_root_stays_user_code` |
| M1 | Medium | Two effects of that bullet are outside 16:54 item 3's three effects (and 04:02 item 4's one row): a low `lane-peak` costs a memory kill whose neighbours lose that reload; a `lane-refused` deleted between every two refusals keeps the widget skipped as `oom_guard` with no demotion and no badge (`showsBadge` is false for `oom_guard`), which reads against 16:54 item 2a ("a stale picture always carries its badge"). Not mine to classify by stretching item 3. | ExtensionLane.swift `refused`, WidgetStatus.swift `showsBadge` | Board: T-1650 (Ines, chair line) |
| L4 | Low | "Another widget's `lane-refused` written with another text refuses or demotes" overstated it: the file alone refuses nothing; it demotes at the widget's next margin refusal. "`lane-peak` high" refuses, then demotes in a later process. | ExtensionLane.swift `refused` | Fixed (wording) |
| I1 | Info | The board line dates the first chair line 2026-11-01 16:54; it is 2026-10-29 16:54 (T-0733). lane.py and C2 cite it by time only, so no text change. | ADR-007 line 512 | Noted |

</div>


Checked and right: the Not held intro's 04:02 item 4 row (deleted marker only, own kills unseen across processes,
backstop the memory kill each reload, neighbours keep cached trees); the stated limit's words match 04:02 item 3
(C2's heading now cites it as the 04:02 line, as lane.py does); the bullet's route (by path, a lane run's folder is
`lane-scripts/<id>/`) matches `SCRIPTS_DIR` and `LaneRunFiles`.

The earlier session on this task wrote the bullet's chair reference as T-1645, which is not on the board and was
never added; it is T-1650 now.

## The tests

Six tests in `SourcelessStdlibTests` (the five from T-1634 plus L3's). 13 planted bugs over `configure`,
`install_finder`, `compiled_stdlib_root`, `_user_frame` and `_under`: 13 killed with this review's test, 12 without
it. Spec: t1642-evidence/compiled_root_mutants.json; run: t1642-evidence/mutants_result.txt (tools/mutants.py,
throwaway copy). Host suites: `pywidget/tests/run_host.py --both bridge` 269 tests on 3.9.6 and 3.13.18, all pass;
`run_host.py` all 18 suites, 1257 tests, pass. Docstring and test changes only, so no Xcode run.

## Board

- New: T-1650 (Ines, P1), chair line on M1.
{% endraw %}

</div>
