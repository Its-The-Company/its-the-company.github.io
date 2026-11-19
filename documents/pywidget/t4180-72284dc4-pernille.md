---
layout: "default"
title: "Review of 72284dc4: T-4180, the bundled first renders&#x27; small edges (step T-4442)"
section: "documents"
description: "PASS with findings. The commit closes T-4439&#x27;s L1, L2 and L3. On the host: the generator now refuses stale_after and Updated, three of four mutants die, --check is exit 0, and the widgets suite is green on 3.9.6 and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4180-72284dc4-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4180-72284dc4-pernille.md</code></span></div><h1>Review of 72284dc4: T-4180, the bundled first renders' small edges (step T-4442)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4924, Commandment 13). Author: Idris. Reviewed: the product commit 00cb609274 ("bundled first
renders' small edges (review T-4439 L1-L3)"), all six files: `ios/scripts/first_renders.py`,
`tests/widgets/test_first_renders.py`, `ios/Shared/TreeTimeline.swift`, `ios/Shared/WidgetPlacement.swift`,
`ios/Tests/FirstRenderTests.swift`, `ios/Tests/PremadeFirstRenderTests.swift`. 72284dc4c3 holds only <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> records
(an outbox row and the author's memory archive); I did not read the memory. Checked against findings 4, 5 and 6 (the
three Lows, L1-L3) of my T-4439 review, [`pywidget/docs/reviews/t3279-pernille.md`](t3279-pernille.html). Date: 2026-11-18 (finished just
after midnight, 2026-11-19).

**Between 72284dc4 and HEAD fbf1569bf2:** five of the six reviewed files are unchanged. `PremadeFirstRenderTests.swift`
changed in one place outside this commit's lines (a16af47842, T-4679: the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> count leaves out a launcher build's
launchers, lines 97-100). The two bundled files and `countdown.py`/`habits.py` changed in case only ("PyWidget",
bef6b4506a, T-4886). Nothing that moved touches L1-L3. Line numbers below are HEAD's; only PremadeFirstRenderTests.swift after line 96 sits 3 lower than at 72284dc4.

## Tests run

All on a clean `git archive` export of HEAD fbf1569bf2 in my scratch folder (`tools/scratch.py new T-4924`).

- `python3 -m unittest -v test_first_renders` (pywidget/tests/widgets): **7 tests, OK**.
- `python3 pywidget/ios/scripts/first_renders.py --check --verbose`: **exit 0, "checked 2 first renders"**. Countdown and
  habits are bundled. Clocks, progress, quote and storage are refused because they draw differently. The other six
  read something outside their own file. Same split as at T-4439.
- `python3 pywidget/tests/run_host.py --both widgets`: **OK on 3.9.6 and 3.13.18, 455 tests each, 0 failed suites**.
- Four mutants of `why_not`, one at a time on the scratch copy, each run against `test_first_renders`:
  (A) both stale_after checks removed: 1 failure (`test_stale_after_or_updated_is_refused`), KILLED;
  (B) the Updated detection removed: 1 failure, KILLED;
  (D) `return "draws Updated"` made `return None`: 1 failure, KILLED;
  (C) only the per-run check `stale = stale or tl.stale_after is not None` removed: **7/7 OK, SURVIVED** (L1 below).
- **Swift: no result.** A targeted run (FirstRenderTests plus BridgeTests' countdown and habits T-3364 tests, XC_LOCAL=1,
  iPhone 17 Simulator by id) was still compiling the test target after about 20 minutes on a Mac running about eight
  other xc.sh builds. My session's time limit stopped it; no process of mine is left. So L2 and L3 below are checked by
  reading the code, not by a run. The author's commit reports PyWidgetTests 2058 executed, 0 failures (XC_LOCAL=1). I
  did not see that run.

## Does it close T-4439's L1-L3?

- **L1 (finding 4): yes.** `why_not` now refuses a premade whose widget declares `stale_after`, or whose run at any
  clock and zone returns a Timeline with one (`first_renders.py:79-83`). It also refuses one whose views hold an
  `{"t": "Updated"}` node anywhere (`:86`). The views are compared as `json.dumps(sort_keys=True)`, whose `": "`
  separator matches the string the check looks for. The Swift renderer's `drawsAgeLine` also matches on `t == "Updated"`
  anywhere, so the two agree. The refusals come after the draws-differently loop, so storage still reports why it
  moves. The host test checks that both bundled files have neither, and its mutants prove the widget-level stale_after
  and the Updated refusal (A, B, D killed). The docstring now says what the file holds.
- **L2 (finding 5): yes, by reading.** `firstRenderTimeline` dates each planned entry `min(entry.date, now)`
  (`WidgetPlacement.swift:262`). I traced the planner (`TreeTimeline.swift:205-237`) at the test's earlier clock,
  1_748_736_000 (2025-06-01 12:00 AM UTC). No entry is at or before now, so `kept` holds the bundled entry as a future
  one. With no `staleAt` it is not stale, and with no Updated node no age-line clone is added. One entry comes back,
  moved to now. `FirstRenderTests.checkDrawsItsFirstRender` now loops over both clocks and asserts
  `e.date <= now`. Without the `min` line the entry would stay at 2026-01-01, after now, and that assert would fail,
  so the test pins the fix. `TreeWidgetEntry.date` became `var` with a comment saying why; nothing else assigns it
  (grep of Shared, App, Widget).
- **L3 (finding 6): yes, by reading.** After the app's own pass writes tree.json for countdown and habits on the iOS
  runtime, `assertEqualsBundledFirstRender` (`PremadeFirstRenderTests.swift:71-87`) loads the appex's bundled file
  through the product's own `FirstRender.folder` and `FirstRender.document`. It then compares every entry of the app's
  tree with the bundled entry, family by family, for every family the catalog lists. The gate
  `FirstRenderTests.bundled.contains(name)` gets the premade's id ("countdown", "habits"), so it is not vacuous, and
  the two T-3364 tests that pass those names exist (`:122`, `:127`). `bundled` became `nonisolated` so the
  non-MainActor BridgeTests extension can read it. A missing bundled file fails through `XCTUnwrap`, not silently.

## Findings

0 High, 0 Medium, 1 Low, 2 nits.

### L1 (Low, test strength): the per-run stale_after refusal has no test, and `render` reads a different source

`first_renders.py:83` refuses a premade whose run returns a Timeline with its own `stale_after` (a provider that calls
`widget.timeline(..., stale_after=X)` or builds `ui.Timeline(stale_after=X)`, with nothing declared on the widget).
Mutant C removes that line and every test stays green: the only stale mutant sets `m.widget.stale_after`, which the
widget-level check at `:79` catches first. No harm today. Neither bundled premade does it, and `render()`
(`:105-106`) writes `stale_after=m.widget.stale_after`, not the run's own value, so such a premade would still be
bundled with no stale mark. But it does mean `why_not` and `render` read stale_after from different places. And since
L1 refuses every premade with a widget-level value, `render`'s argument is now always None.
**Fix (Idris):** write `stale_after=None` in `render` (or assert the run's value is None there). Add a mutant in
`test_stale_after_or_updated_is_refused` where countdown's provider returns a Timeline with `stale_after` and the
widget declares none. Expect "has stale_after". Board line T-5020 (P3).

### Nits (no board line of their own; fold into T-5020 if convenient)

- N1. `FirstRenderTests.swift:63-76`: the new `for now in [...]` wraps the family loop without re-indenting it, so
  two closing braces sit at the same depth. It compiles, but reads like a mistake.
- N2. `firstRenderTimeline` applies `min(e.date, now)` to every planned entry. That is right only while the plan holds
  one entry. L1 now guarantees that (no stale_after means no synthetic stale entry, and no Updated means no age-line
  clones), and the test asserts `count == 1`. If either guarantee ever goes, several entries would collapse onto the
  same date. One comment line at `:262` saying "one entry by construction (first_renders.py why_not)" would make the
  dependency visible.

Seen, not this commit's: `first_renders.py --check` opens each bundled file without closing it (a ResourceWarning in
the unittest output, `:126`). It dates from slice 2. Folded into T-5020 as a one-liner.

## Verdict

**PASS with findings.** The commit closes T-4439's L1, L2 and L3. On the host: the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> now refuses stale_after
and Updated, three of four mutants die, `--check` is exit 0, and the widgets suite is green on 3.9.6 and 3.13.18. L2
and L3 are correct as I read them, and their tests would fail on a revert. I could not run them myself this session
(Swift build stopped by my time limit, above). Nothing here can crash, lose data or draw a wrong render, and nothing
touches App Review, signing or bundle size: both bundled files change by zero bytes in this commit. The one Low
(an untested branch and a dead argument) goes to Idris as T-5020, P3. It does not hold TestFlight.
{% endraw %}

</div>
