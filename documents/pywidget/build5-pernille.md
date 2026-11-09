---
layout: "default"
title: "Build 5 review: product commits on main since build 4 with no review (T-3813)"
section: "documents"
description: "Run for this review: python3 pywidget/ios/scripts/first_renders.py --check --verbose on the host, exit 0, &quot;checked 2 first renders&quot; (countdown, habits bundled; the other ten each give a reason), saved in\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/build5-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 19 · Mon Nov 9</span><span><code>pywidget/docs/reviews/build5-pernille.md</code></span></div><h1>Build 5 review: product commits on main since build 4 with no review (T-3813)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-09. Independent review (Commandment 13) of the commits Idris's T-3783 check found unreviewed
(`/private/tmp/company-scratch/T-3783-idris/b5-not-uploaded.txt`), read with `git show` on main. bfeeb6404 is mine and
is not reviewed here; 229fa3e4f, 52377587a, 0eae5043f and 3b6d5321c are reviewed under T-3718, T-3349, T-3680, T-3757.

Run for this review: `python3 pywidget/ios/scripts/first_renders.py --check --verbose` on the host, exit 0, "checked 2
first renders" (countdown, habits bundled; the other ten each give a reason), saved in
`/private/tmp/company-scratch/T-3813-pernille/first_renders_check.txt`. No Xcode build or suite was run for this
review; the verdicts read code and the authors' own test records.

## Verdicts


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Verdicts, scrolls sideways" style="--tw:662px" markdown="1">

| Commit | What | Verdict |
|---|---|---|
| df2f223b4 | a refused `stuck` still gets a run-0 `unstuck`; console withdraws the banner | PASS (L1 optional) |
| f50eef694 | Acknowledgements tables in a sideways scroll | PASS with fixes (L2) |
| 582df0235 | R1/R2 scope note (doc and comment only) | PASS with fixes (L3, L4) |
| ec19529fd | refresh button tap writes `intent` run rows | PASS (L5 noted) |
| 648ebf069 | extension draws countdown's and habits' bundled first render | PASS with fixes (M1 = T-3814, L6) |
| 5644d56f7 | <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> and project.yml for the bundled first renders | PASS |
| 2dbf109d4 | save-copy wording per project-save.md s7.1 | PASS |

</div>


## The iPhone bug (only Countdown draws): no candidate cause in these commits

None of the seven is in build 4: `git merge-base --is-ancestor d3d39da37 <c>` holds for every one, so none of them can
cause what Jeremy sees on build 4 today.

For build 5, I read 648ebf069 and 5644d56f7 for anything that could leave the other premades undrawn on a device and
found nothing. `TreeDrawable.decide(widgetID:tree:gates:titles:firstRender:)`
(`pywidget/ios/Shared/WidgetPlacement.swift:196-205`) asks the bundle only after the existing decision is already
`.missing` and `neverDrawn`; for every premade without a file (ten of twelve), `FirstRender.document` returns nil and
the result is `.firstDraw`, exactly as in build 4. A tree.json the app wrote is decided before the bundle is touched.
`FirstRender.document` (`pywidget/ios/Shared/FirstRender.swift:20-29`) uses `try?` for the read and the decode and
checks the id, so a missing folder, file or bad JSON falls back to the card, never to a crash or an error card. The
lock is still checked on the bundled document (`habits` is Pro: a locked one stays the Pro card).

What 648ebf069 does change is how the bug looks, which is M1.

## Findings

### M1 (Medium) 648ebf069: in build 5 a drawn Countdown no longer proves the app wrote its tree. Board: T-3814 (Idris)

`pywidget/ios/Widget/PyWidget.swift:53-62`, `pywidget/ios/Shared/WidgetPlacement.swift:199-204`.

Build 5's purpose is the P0 hunt: why on Jeremy's iPhone the app's trees reach Countdown and not the other four. With
648ebf069, a Countdown with no tree.json draws the extension's bundled "No events / Add a countdown in pywidget."
picture; Habits, for a tester without Pro, stays the Pro card either way. So if the app's write path is still broken
on the phone in build 5, the Home Screen looks exactly as it would if the app had written an empty Countdown tree.
Countdown is the one widget the hunt treats as "working", and this commit makes its face say nothing about who drew it.
Nothing in the entry marks the first render (sampled_at is 2026-01-01, never shown; no `firstDraw`/`proCard` flag).

Fix (one of): keep 648ebf069 and 5644d56f7 out of the hunt build; or make the source visible where Jeremy will look,
e.g. the build-5 Run log (bb00149d8) lists each placed widget with whether its tree.json exists, and the #41 ask says
the "No events" Countdown may be the bundled picture. Do not rely on the widget's face for this build.

### L1 (Low) df2f223b4: the new test waits 200 ms for a subscription instead of waiting for it

`pywidget/ios/Tests/BridgeTests.swift:405`. `stuckConsole()` sleeps 200 ms for the console's records subscription to
register. Under runner load a late subscription misses the run-0 `unstuck` and the test goes red for the wrong reason
(it fails, it does not pass falsely). Fix: wait on the registration itself (a subscriber count or a probe record) with
`until`, not a fixed sleep. The product change is right: run-0 `unstuck` goes only when `isStuck && !stuckSent`
(`pywidget/ios/Shared/Bridge/PyBridge.swift:1046`), the run's own records still end at its `finished` (S5), and the
console withdraws only its own stuck banner (`pywidget/ios/App/PyWidgetApp.swift:849`). Note: T-3783's main_gate
audit lists df2f223b4 and f50eef694 as not verified on the MacBook before main; build 5's full suite on the runner
covers that.

### L2 (Low) f50eef694: the table's columns do not line up, and the code says they do

`pywidget/ios/App/Acknowledgements.swift:124` (comment) and `:390-394` (the table's `Text`). The table keeps one source
line per row, but in proportional body type a run of spaces is not a column: the commit's own sheet
`ops/site-checks/acknowledgements-t0418/07-cpython-table.png` shows CPython's release table with "1991-1995",
"2000" and "2001" at different x positions on every row, and "yes"/"no" drifting. Every character of the notice is
still shown, so the licence obligation is met; this is legibility and a false comment. Fix: use
`.font(.body.monospaced())` for table blocks only (a design exception to s5.10.4's "never monospaced", for Maren to
rule), or change the comment and commit claim to "one line per row" and drop "columns stay lined up".

### L3 (Low) 582df0235: the cited line is the wrong line

`pywidget/docs/research/L5-interactivity.md:780` cites `Shared/Bridge/RunResultSink.swift:165` for the `schema_error`
refusal. Line 165 is the `stuck` mapping; the refusal is `case .invalid: return WidgetRunOutcome(kind: .error,
errorType: "schema_error")` at line 175. Fix: cite the symbol (`RunResultSink.map`, `.invalid`) rather than a line.

### L4 (Low) 582df0235 with 648ebf069: "refused before anything is drawn" now has one exception

`pywidget/ios/Shared/TreeRules.swift:110-114`, `L5-interactivity.md:780`. Every app and extension-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> run goes
through RunResultSink (the lane too, `pywidget/ios/Shared/ExtensionLane.swift:160`), but the bundled first renders
reach the renderer with only a Swift decode; neither `test_first_renders.py` nor `FirstRenderTests` validates them
against `viewtree.schema.json`. They come from our own generator, so the risk is low. Fix: have
`pywidget/tests/widgets/test_first_renders.py` validate each file against the schema, and add "and the bundled first
renders, schema-checked at build" to the note.

### L5 (Low) ec19529fd: the writer has no caller yet, and its mutants were never run

`pywidget/ios/App/Bridge/WidgetWriter.swift:170`. `refreshButton(_:passes:)` is not called anywhere in App, Shared or
Widget; it waits for T-0678's button, so it ships in build 5 as unused code (no behaviour change). The commit says
`mutants-t1861.json` was "written, not yet run", and its full suite ran with XC_LOCAL. Fix: run the three mutants on
the MacBook runner before T-0678 wires the button, and keep this item open on T-0678 rather than here. The logic is
right: one id, forced, `intent`, which `RefreshOutcomeRule.isRefreshTap` reads as the tap and LoopBreaker never counts.

### L6 (Low) 648ebf069: the first render does not carry the Pro recheck

`pywidget/ios/Widget/PyWidget.swift:53` drops `pro` from `.firstRender(doc, pro)` and asks again after
`firstDrawRecheck` (30 min), which is shorter than `proRecheck` (60 min), so a lapsed Pro is still caught in time. No
fix needed today; if `firstDrawRecheck` is ever raised above `proRecheck`, pass `recheckWithin` as the `.drawn` case
does. Recorded so the coupling is written down.

## Read and found right

- 5644d56f7: `first_renders.py` bundles only a premade whose capabilities are `("widget.timeline",)` with no network
  and that draws the same at 8 clocks in 8 zones; `--check` exits 0 today; `project.yml` adds the folder to the
  extension's resources only (about 7.5 KB, per the commit). `test_first_renders.py` sits in the widgets suite that
  `tools/main_green.py` and `tools/upload.sh` run, so a premade edited without regenerating fails before upload.
- 2dbf109d4: the three strings match [`pywidget/docs/design/ide/project-save.md`](project-save.html) s7.1 rows exactly. A note stored by
  build 4 in the old wording is read and removed at build 5's first launch (`pywidget/ios/App/SceneFile.swift:47-48`)
  before any rename can need to match its prefix, so the upgrade leaves no stale note.
{% endraw %}

</div>
