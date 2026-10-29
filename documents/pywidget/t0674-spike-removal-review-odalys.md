---
layout: "default"
title: "T-0742: review of T-0674 (adf9d3be, Idris), spike widget out of the shipping extension"
section: "documents"
description: "Verdict: approve. The change does what ADR-007 chair line item 9 asks. I found one Medium, and it was there before this change: alpha row A3&#x27;s test cannot fail once its gallery taps go through. Two Lows and one note\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0674-spike-removal-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0674-spike-removal-review-odalys.md</code></span></div><h1>T-0742: review of T-0674 (adf9d3be, Idris), spike widget out of the shipping extension</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys, 2026-10-29, independent (diff, tests and my own builds; not the author's notes).
Tree at review: ceb7dc4b (adf9d3be plus board and memory commits only). Simulator iPhone 17e, iOS 27.0.

**Verdict: approve.** The change does what ADR-007 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line item 9 asks. I found one Medium, and it was there before
this change: alpha row A3's test cannot fail once its gallery taps go through. Two Lows and one note follow.

## What I measured


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I measured, scrolls sideways" data-n="1" style="--tw:774px" markdown="1">

| # | Check | Result | n |
|---|-------|--------|---|
| 1 | Unit suite PyWidgetTests, Debug (ops/runs/xcodebuild-20261029-175931.log) | 417 tests, 0 failures, 93.6 s. Same count as the author's run | 1 run |
| 2 | WidgetKindsTests inside run 1 | 3 of 3 passed | 1 run |
| 3 | A3, AddWidgetTests/testAddWidget (ops/runs/xcodebuild-20261029-180312.log) | passed, 30.7 s | 1 run |
| 4 | Release build, simulator, own derived data (/tmp/t0742-rel, not in git; ops/runs/xcodebuild-20261029-180140.log) | The extension built. The app target then stopped at the LegalLinks Release guard (no https privacy URL yet; T-0485 and T-0497 cover it), which is expected and unrelated | 1 build |
| 5 | Byte read of the Release PyWidgetExtension.appex (executable only; Release has no .debug.dylib) | control "Draws your script's widget." 2; "Runs a tiny Python script in the widget extension." 0; "importlib.import_module(m)" 0; "now = datetime.datetime(2026, 10, 25, 19, 30)" 0; "Python result" 0; "PWBENCH" 0; "bench.jsonl" 0; "bench-lazy" 0 | 1 binary |
| 6 | `grep -rn "Bench\|bench" Widget Shared` | one hit, the new doc comment at Widget/PyWidget.swift:82 | whole tree |
| 7 | `git grep bench_widget` | no tool, script, scheme or alpha row runs it. Left: a comment in App/PyWidgetApp.swift:163, the L3 research record, Idris's memory archive, an old review patch | whole repo |

</div>


Points from the packet:

- **No TestFlight or App Store build can show a bench or spike widget.** The extension's only WidgetBundle is
  `PyWidgets { TreeWidget() }`. project.yml builds the extension from Widget/ and Shared/ only, and it is the only
  app-extension target. Row 5 shows the Release binary has none of the spike's text. Confirmed.
- **Bench in App/.** No Bench code is left in the extension (row 6). In the app, `-bench` sits outside `#if DEBUG`, so
  it compiles into Release. Nobody using the app can reach it: iOS gives no launch arguments to an app opened from the
  Home Screen, a URL, a Shortcut or TestFlight. Only Xcode, simctl or devicectl can pass one. Harmless (I1).
- **Would the test catch a regression?** For the spike as it was, yes. The mutant test fails on all three rules, and
  the author's run of the byte check against the 10-27 build failed on all three literals. The byte check works in
  Release (row 5) and in Debug (it reads the .debug.dylib, and the control literal makes sure the read sees text).
  It fails when the binary is missing: no appex means `Bundle(url:)` returns nil and `XCTUnwrap` fails, and a
  missing dylib means the control literal fails. One gap in the source scan is listed as L1.
- **A3 and the other alpha rows.** A4b and A5b find gallery pages by the label "Python widget", so losing the
  spike's two pages does not affect them. A3 now places the tree widget, not the bench widget, which fits its row
  ("a fixture widget") better. But its placement check is weak (M1).

## Findings, ranked

### M1 (Medium, existed before T-0674; alpha row A3): testAddWidget's "placed" check matches any PyWidget widget

UITests/AddWidgetTests.swift:254-257 waits for the first element with label 'PyWidget' and value 'Widget'. After my
run 3, the iPhone 17e Home Screen held **30** PyWidget widgets, 6 of them on screen, left by earlier UI-test runs.
So the assertion would pass even if the final Add Widget tap placed nothing. The test still fails if the gallery,
the search or the Add button is missing, but its comment, "Passed must mean placed", is not true on a used
Simulator. The test also writes no tree and takes no screenshot, so A3's screenshot half (fixture text readable)
stays a hand step for the run.

Fix (Idris): count the matching widgets before the add and require one more after it. Or clear them first with the
remove helper WidgetKitCheckTests already has and require exactly one.
**Timing: before the 10-30 dry run.** A3 is not red, so once the dry run starts the freeze lets no fix in. If it
misses that window, I record A3's test half as "gallery path only, placement not proven" and grade placement on the
screenshot alone.

### L1 (Low, after the alpha): the source scan's WidgetBundle rule can switch itself off

The bundle pattern `:\s*WidgetBundle\s*\{` only matches when WidgetBundle is the first conformance. Written as
`struct PyWidgets: Sendable, WidgetBundle {`, nothing matches, so the member check never runs. The "one WidgetBundle"
count still passes, because it uses a plain `contains`. The scan also misses `StaticConfiguration.init(kind:`, and it
does not count a member written with arguments (`X(a: 1)`). The kind rule still catches a new literal kind in each of
these cases, and the byte check only looks for the old spike's text. So the risk is a re-added widget that reuses the
shipped kind. Fix: assert that the bundle pattern matched exactly once, and allow `.init` in the kind pattern.

### L2 (Low, after the alpha): stale comments

App/PyWidgetApp.swift:163 still says the `-reload` hook is for scripts/bench_widget.sh. That script is retired, and the
hook ships in Release. It is harmless: it only calls reloadAllTimelines, and only when a launch argument is passed.
App/Bench.swift's `lazyFlagURL` doc still says "the extension reads it". Reword both, or drop `-reload` with the next
change to that file.

### I1 (note): bench code ships in the Release app binary

`-bench` and Bench's two Python scripts are in the Release app. Nobody using the app can reach them (above). No action
needed for the alpha or for App Review. If the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> runner (T-0675) does not need Bench, putting it behind `#if DEBUG`
later keeps measurement code out of the store build.

## Not checked

- Device builds. Row 5 is a simulator Release build. The strings check does not depend on the architecture, but I did
  not measure a device build.
- The Release app binary itself. The build stopped at the LegalLinks guard, so I judged `-bench` from the source.
{% endraw %}

</div>
