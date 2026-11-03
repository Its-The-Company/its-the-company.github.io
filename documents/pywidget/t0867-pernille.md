---
layout: "default"
title: "T-0867 review (T-0868, Pernille, 2026-11-03)"
section: "documents"
description: "Independent review of 811521cf (Idris): the diff and the tests, not the author&#x27;s notes (Commandment 13). dc126fda has landed since (pywidget_ui 0.4.0, LIBRARY_VERSION bumped for e616b3a6&#x27;s suffix), so the board&#x27;s &quot;bump\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0867-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/t0867-pernille.md</code></span></div><h1>T-0867 review (T-0868, Pernille, 2026-11-03)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Independent review of 811521cf (Idris): the diff and the tests, not the author's notes (Commandment 13).
dc126fda has landed since (pywidget_ui 0.4.0, LIBRARY_VERSION bumped for e616b3a6's suffix), so the board's
"bump LIBRARY_VERSION (Low)" item is already done: `LIBRARY_VERSION = "0.4.0"` at pywidget_ui/__init__.py:32.

**Verdict: approve.** The fix does what it says on the two crash classes it names (live text with an infinite ideal
width; numbers past what SwiftUI can <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>), the host tests pin each clamp, and the device-side check now fails a run
on an extension crash the runner never sees. Five findings, none blocking; F1, F2 and F5 go to Idris as board lines.

## What I read

- `Shared/TreeRules.swift` clamps: `length` (NaN to 0, +-2000), `size` (never negative), `frameMaximum`, `count`
  (no `Int()` trap), `isLiveText`, `liveIdealWidth`. Each has a host test in `Tests/Core/TreeRulesTests.swift`,
  including inf and NaN, which JSON cannot carry but a Swift caller can.
- `Shared/TreeView.swift`: every number in frame, padding, offset, spacing, Spacer, kerning, shadow, scaleEffect,
  lineLimit and fractionDigits now goes through TreeRules. `TreeText` gives live text an ideal width only in the
  extension and not in accessoryInline. `snapshot()` reaches `drawn()`, so the gallery path sets `displayWidth` too;
  `placeholder()` has no tree, so its nil width is harmless.
- `scripts/widgetkit_check.sh`: counts new `PyWidgetExtension-*` crash reports and greps the Simulator log for
  `Fatal error` / `Invalid frame dimension`; either fails the run. An exit 75 from xc.sh is kept as 75.
- `scripts/make_widgetkit_fixtures.py`: 8 date kinds x 25 placements, 30 `num-` cases, 1 inline case = 231 trees,
  all built through pywidget_ui, so each one is a tree the validator accepts.
- Python: suffix rejects `"\n"`; tests add three newline cases.

## Findings

### F1, Medium: the suffix still takes a line break, and the Python schema check agrees with the DSL, not the schema

`pywidget/python/pywidget_ui/__init__.py:1050` rejects only `"\n"`. The schema's `"pattern": "^.{1,64}$"`
(`docs/design/viewtree.schema.json:314`) is ECMA-262, where `.` matches none of `\n \r    `. The stdlib
checker (`tests/dsl/schema_check.py:100`) compiles it with Python `re`, where `.` matches all but `\n`.

Failing case, host CPython, run in this review:

```
ui.Text(T0, style="relative", suffix="a\rb")       # DSL accepts; ui.validate(doc) == []; Checker.errors == []
ui.Text(T0, style="relative", suffix="a b")   # same; a conforming JSON Schema validator rejects both
```

So the one-line rule T-0867 added holds for `\n` only, and the company's two Python validators pass a tree the
schema forbids. Fix: reject the ECMA line terminators (`\r`, ` `, ` `, and `\x85` for Swift's `Text`)
in the DSL, and in `schema_check._pattern` translate an unescaped `.` outside a class to `[^\n\r  ]` so the
checker is ECMA-strict like its `$` handling. Board line T-1289 (Idris).

### F2, Low: "<span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> every number" is wider than the diff

The commit message says TreeRules caps every number into a length or an Int. These still go to SwiftUI raw:
`TreeView.swift:344` (clipShape cornerRadius), `:395` (aspectRatio ratio), `:299` (minimumScaleFactor),
`TreeNodes.swift:48-49` (radial gradient radii), `:111` and `:179` (lineWidth), `:146` (arc radius), `:484`
(image `scale`, where 0 or negative is a size divided by zero). The sweep's `num-aspect-zero/neg/big` and
`num-corner-big` cover two of them (results below). No failing case for the rest; it is an untested claim, not
a known crash. Folded into T-1289 as "add num- cases for lineWidth, radii, arc radius, image scale 0, minimum
scale factor; clamp whichever crashes".

### F3, Low: the crash count reads the whole Mac, not this run's device

`widgetkit_check.sh:306-313` counts files in the host's `~/Library/Logs/DiagnosticReports`. A PyWidgetExtension crash
on any other Simulator on the Mac mini in the same window fails this run, and macOS rotating old reports makes
`NEW` negative, which passes. Today one Simulator runs at a time on the mini, so it holds; note it if two ever do.
No board line.

### F4, Low (observation): the app preview and the widget now lay out live text differently

`TreeText` applies the ideal width only when `TreeHost.isExtension`. A `fixed_size()` live date beside a Text looks
right in the app's preview and pushes the Text off the edge on the Home Screen. API.md:56 says so, which is the
honest minimum; Maren may want the same words where a user sees the preview. No board line from me.

## The rest of T-0867's run (part 2)

Both run on pywidget-wk-check (iPhone 17e, iOS 27.0), one Simulator, through tools/xc.sh, HEAD of 2026-11-03.
Shots kept in scratch, not the repository.

- **testD, Lock Screen accessories** (ops/runs/xcodebuild-20261103-064732.log): **passed**, 1 test, 0 failures,
  363 s. All 12 premades ran, rows 01 to 12 (07-shortcuts, 08-storage, 09-progress, 10-quote, 11-clocks,
  12-github included): 24 accessory shots, the count the test asserts. T-1072's `grantPro()` bought Pro in an
  SKTestSession first, so the Pro premades drew their trees, not "Needs Pro" (09-progress rectangular reads
  "Day 59% / Year 82%"). 0 extension fatal errors, 0 crash reports.
- **testG, the full 231-case sweep** at systemSmall and systemMedium (ops/runs/xcodebuild-20261103-065717.log):
  462 readings, 4,087 s. **0 extension fatal errors or frame faults, 0 crash reports**: no accepted tree crashed the
  extension, which is the fix's claim. 435 of 462 drew their token. Of the 27 not drawn, 26 are the exempt kinds
  (14 `num-` readings: font, frame, frame-tall, frame-min, padding, spacing, spacer at 1e308, which push the token
  off the widget; 12 `aspect-fill`, clipped), and `PWKA-date-aspect-fill` drew at medium. The test still **failed**
  on one reading: `PWZZ-inline-first systemMedium`, which drew "No view for this size". That case claims only
  systemSmall and accessoryInline, so medium is right to show the card; the test asks every case for both
  families. A test bug, not a renderer bug: F5.
- Not run: the `large` and `lock` phases of testG (WK_PHASES), which the board did not ask for.

### F5, Low: testG asks a case for a family it does not claim

`UITests/WidgetKitCheckTests.swift` testG appends to `missed` for every family in the phase. Failing case: this
run, `PWZZ-inline-first systemMedium`, read ["No view for this size", "PyWidget"]. Fix: skip a family the case's
tree does not claim (`families(path)` already exists in the file). Board line T-1294 (Idris).

## Why the snapshot PNGs changed (part 3)

None of the 47 is changed by a real fix; none is committed. All were restored, and the copies stay where the
Operator left them.

Compared pixel for pixel against 811521cf and HEAD (`png_sample.load`, no Pillow):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Why the snapshot PNGs changed (part 3), scrolls sideways" style="--tw:947px" markdown="1">

| Set | Files | Differing pixels | Where |
|---|---|---|---|
| t0867 premade-snapshots/alpha-a5 | 18 | 46 to 2,573 (0.05% to 2.6%) | countdown: one 8x8 px box (a digit); progress, clocks: one text row |
| t0867 premade-snapshots/design-trees | 13 | 46 to 1,539 | the same rows |
| t0867 renderer-v1 | 8 | 66 to 2,044 (0.01% to 0.26%) | countdown digits, sun times, progress percent, github "ago" row |
| t0867 widget-card | 2 | 140 (0.02%) | one 5 px high row: the card's time |
| t0867, t0684, t0675 app-guide-shots/lockscreen | 3 + 3 + 3 | 0 to 1,677 | countdown digits, progress percent, sun row |

</div>


Every box sits on text that reads the wall clock: a countdown's digits, a progress bar's "Day 59%", a clock, sun
times, "updated N min ago". `PremadeSnapshotTests.swift:125` renders at `p.date ?? .now` and `:212` rewrites every
relative date from `Date.now`; AppPicturesUITests shoots a live Lock Screen. T-0867's renderer change cannot reach
them: the live-text width applies only in the extension, and the snapshot tests run in the app's test host; the
number clamps change nothing below 2,000. t0675's progress shot is identical to HEAD because it ran in the same
minute of day as the committed one.

The cost is real: every Xcode run rewrites these and the Operator restores them by hand. Board line T-1290 (Idris):
pin the clock in the snapshot tests so a rerun is byte-identical.
{% endraw %}

</div>
