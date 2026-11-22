---
layout: "default"
title: "Review of T-4442 at 18acc6b6: the bundled first renders&#x27; small edges (T-4439 L1-L3)"
section: "documents"
description: "PASS with findings. The change does what T-4442&#x27;s Done asks, finding by finding: the generator refuses a premade with stale_after or an Updated node, and the host test asserts both absent with mutants that are red on\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4442-18acc6b6-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t4442-18acc6b6-pernille.md</code></span></div><h1>Review of T-4442 at 18acc6b6: the bundled first renders' small edges (T-4439 L1-L3)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5537, Commandment 13). Author: Idris. Reviewed: `git show 00cb609274 -- pywidget`, that is
ios/scripts/first_renders.py (+12/-3), tests/widgets/test_first_renders.py (+28), ios/Shared/WidgetPlacement.swift
(+3/-1), ios/Shared/TreeTimeline.swift (+2/-1), ios/Tests/FirstRenderTests.swift (+4/-2) and
ios/Tests/PremadeFirstRenderTests.swift (+24). Judged against T-4442's Done on the board and against findings 4, 5
and 6 of docs/reviews/t3279-pernille.md (the L1-L3 the line names). Also read, at 18acc6b6, for what the change relies
on: first_renders.py whole (`first_run`, `views_of`, `render`, `bundled`, `main`), TreeTimelinePlanner.entries and
.timeline and `drawsAgeLine` (TreeTimeline.swift:192-315), TreeDrawable.decide and the timelines around
firstRenderTimeline (WidgetPlacement.swift:226-296), the provider's `drawn` and `snapshot` (Widget/PyWidget.swift:43-89),
checkDrawsItsFirstRender (FirstRenderTests.swift:55-78), and checkPremadeDrawsInBothPlaces with `assertDraws`
(PremadeFirstRenderTests.swift:30-66). Between 00cb609274 and 18acc6b6 three of the six files changed, only in code
that is not this change's (T-0048's version and state-card lines in TreeTimeline.swift and WidgetPlacement.swift,
T-4679's launcher count in PremadeFirstRenderTests.swift). Paths are under pywidget/. Line numbers are at
18acc6b6. Date: 2026-11-21.

What I ran:
- `python3 pywidget/tests/widgets/test_first_renders.py -v` in this worktree (8f0cdb5d34; the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span>, its test, the
  premades, pywidget_ui and the stubs are the same as at 18acc6b6): 7 tests, OK.
- `python3 pywidget/ios/scripts/first_renders.py --check --verbose`: exit 0, "checked 2 first renders"; countdown and
  habits bundled, clocks/progress/quote/storage "draws differently", the six that read the device or the network "reads ...".
- Red first, in a throwaway copy of 18acc6b6 under /tmp (removed after): the new test file against the generator
  before the change (00cb609274^) fails `test_stale_after_or_updated_is_refused` with `None != 'has stale_after'`;
  the Updated mutant alone gives `[None, None]` on the old generator and `['draws Updated', 'draws Updated']` on the
  new one. The serialised mutant view holds `{"t": "Updated"}`, which is the substring why_not looks for.
- One mutant of my own (L2 below): with line 83 (`stale = stale or tl.stale_after is not None`) made a no-op, the
  seven tests still pass.
- No Xcode run: no Xcode on the Mac mini (Investors' #325), and this is a read review. The Swift half I judge from
  the code and from the commit body's record: PyWidgetTests (XC_LOCAL=1), 2058 executed, 0 failures. I found no other
  record of that run in log/.

## What holds

- **L1 (finding 4) is done as asked.** why_not (first_renders.py:74-97) now refuses a premade whose widget or whose
  timeline, at any clock in any zone, has `stale_after` ("has stale_after"), or whose views at any clock draw an
  `Updated` node anywhere in the tree ("draws Updated"). Both refusals come after the clock and zone loop, so a premade
  that moves still reports "draws differently", which is the more useful reason, and storage's line is unchanged. The
  substring test on `json.dumps(views, sort_keys=True)` matches the Swift side's `drawsAgeLine` (any object with
  `t == "Updated"`, nested at any depth); text that merely says `"t": "Updated"` would be escaped and not match. The
  host test asserts both absent from the bundled files (test_first_renders.py:60-66) and has a mutant for each
  (:68-86), both red on the old generator. Since `bundled()` runs why_not first, nothing with `stale_after` reaches
  `render`, and `--check` ties the files to the generator.
- **L2 (finding 5) is done, and reaches the product.** firstRenderTimeline (WidgetPlacement.swift:272-281) sets each
  entry's date to `min(entry.date, now)`. The planner keeps the bundled entry when now is before 2026-01-01 (a future
  entry, TreeTimeline.swift:224), so moving it to now makes it the current one. Nothing else moves: no `stale_after`
  means `stale` is false, and no `Updated` node means no age clones, so the one entry stays one (FirstRenderTests
  asserts the count). The provider's timeline and its snapshot both go through this function (PyWidget.swift:47, :82).
  The `let` to `var` on `TreeWidgetEntry.date` is commented and changes nothing else. FirstRenderTests now runs each
  family at 2027-01-15 and at 2025-06-01 (1_748_736_000, checked); `XCTAssertLessThanOrEqual(e.date, now)` at the
  second clock is red without the fix, since the entry would be dated 2026-01-01.
- **L3 (finding 6) is done as asked.** After the app pass writes countdown's and habits' trees on the iOS runtime,
  assertEqualsBundledFirstRender (PremadeFirstRenderTests.swift:68-87) reads the built appex's bundled file and
  compares every entry of the app's tree, family by family, with the bundled entry's views. It cannot pass vacuously:
  `assertDraws` has already asserted that every app entry has a view for every family, so a missing bundled view is a
  nil against a non-nil and fails; and an empty app timeline is asserted separately. `nonisolated` on
  `FirstRenderTests.bundled` is what lets the non-MainActor BridgeTests read it.

## Findings

No High or Medium.

### L1 (Low): `render` still copies the premade's `stale_after`, though the docstring now says it does not

first_renders.py:17 says the bundled tree has "no stale_after"; first_renders.py:105-106 still passes
`stale_after=m.widget.stale_after`. Today that is always None, because only `bundled()` calls `render` and why_not
has refused anything else, so the files are right. But the line that finding 4 named as the cause is still there,
and a later caller of `render(name)` outside `bundled()` would copy it again. Fix: `stale_after=None`, so the code says
what the docstring says.

### L2 (Low): the timeline-level `stale_after` refusal has no test

first_renders.py:83 refuses a premade whose provider returns a `ui.Timeline(..., stale_after=...)` of its own (the
constructor takes one, python/pywidget_ui/__init__.py:1776, and `run_timeline` returns the provider's timeline as it is). The mutant at test_first_renders.py:68-75 sets only
`m.widget.stale_after`, which line 79 catches by itself; with line 83 made a no-op, all seven tests still pass. The
branch is right and conservative, but nothing holds it. Fix: a second mutant that wraps countdown's provider to return
its timeline with `stale_after=3600` and leaves `m.widget.stale_after` alone.

### L3 (Low): the evidence is the commit body and the findings file

The Xcode result (2058 executed, 0 failures) is in the commit body only, and the board tick's Evidence points at
docs/reviews/t3279-pernille.md, the findings, not at a result. Nothing records the two Swift asserts going red first
(the second clock in FirstRenderTests, the equality in PremadeFirstRenderTests); my read says the first would be red
without the fix, and the second is red only if the device run differs, which is its purpose. Also cosmetic: the new
`for now in` loop (FirstRenderTests.swift:63-76) leaves its body at the old indent. Fix, when next in these files: keep
the xc.sh summary line for the run beside the commit, and indent the loop.

## Verdict

PASS with findings. The change does what T-4442's Done asks, finding by finding: the generator refuses a premade with
`stale_after` or an `Updated` node, and the host test asserts both absent with mutants that are red on the old code;
the bundled entry is dated `min(entry.date, now)` on the path the extension really draws; and on the iOS runtime the
app pass's countdown and habits views are compared with the bundled file's in every entry and family. Host test 7/0
and the generator's check pass here; the Xcode run is judged from the commit body. No Medium or higher, so no new board
lines; the three Lows (a stale line in `render`, one untested branch, evidence in the commit body only) can ride with
Idris's next change to these files.
{% endraw %}

</div>
