---
layout: "default"
title: "T-0867: crash finding, and review of e616b3a6 (T-0860, Text suffix)"
section: "documents"
description: "SwiftUICore/Layout.swift:1555: Fatal error: view origin is invalid: (nan, 98.75), UnitPoint(x: 0.0, y: 0.0), (inf, 4.0)"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0867-e616b3a6-suffix-review-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 10 · Sat Oct 31</span><span><code>pywidget/docs/reviews/t0867-e616b3a6-suffix-review-idris.md</code></span></div><h1>T-0867: crash finding, and review of e616b3a6 (T-0860, Text suffix)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris, 2026-10-31. Read: `git show e616b3a6`, L4 s8, L5 s13. Simulator: pywidget-wk-check, iPhone 17e, iOS 27.0.

## The crash

The failure first. In the widget extension a live date text reports an infinite ideal width. Anything that asks for the
ideal size gets inf, a GeometryReader beside it gets a nan origin, and SwiftUI stops the process:

    SwiftUICore/Layout.swift:1555: Fatal error: view origin is invalid: (nan, 98.75), UnitPoint(x: 0.0, y: 0.0), (inf, 4.0)

T-0860's finding read this as fixed_size above a ProgressView. It is wider than that:

- Reached by fixed_size on style relative, offset, timer, Text.timer and suffix text, and by whole-stack fixed_size,
  Button or Link around that text, and aspect_ratio fill. `time` and `date` styles drew: they have a real width.
- The same tree blanks the widget with no process crash when nothing beside the text reads the width.
- A crash stops the extension, so every placed widget of the app stops drawing until WidgetKit starts it again.

Second class, found by the sweep: numbers the validator accepts. 1e308 in padding crashed the extension. `line_limit(10**30)`
and `fraction_digits=10**30` trap in `Int()`, and `fraction_digits=-1` traps in SwiftUI (22 fatal errors, run 08:21). Width,
font and spacing at 1e308 blanked the widget. min_width above max_width logged SwiftUI's invalid frame fault.

## The fix

- `TreeText`: live text gets `frame(idealWidth:)`, the widget's width less its margins, in the extension only. Only a request
  for the ideal size reads it, so a text offered a width lays out as before. Not in accessoryInline, where the system <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span>
  the first Text out and does no layout.
- `TreeRules` (`length`, `size`, `count`, `frameMaximum`): every number into a length or an Int is finite and <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> at
  2,000 pt. No length in any premade or design tree is above 500. Unit tests in TreeRulesTests.
  The renderer stays tolerant (L4 s8); the schema is unchanged.

Left, by design: a `Text` beside a fixed_size live date is pushed off the edge, because the live text takes the widget's
width. No crash and no ellipsis. API.md says to use `suffix`.

## Evidence

Failing first: 3 runs on the unfixed renderer, 63 cases: 07:39, 07:53, 08:21 (ops/runs/xcodebuild-20261031-*.log).
After the fix, all 0 fatal errors and 0 crash reports:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Evidence, scrolls sideways" style="--tw:724px" markdown="1">

| Run | What | Result |
|---|---|---|
| 08:31 | 45 cases, small and medium | 0 fatal; 12 frame faults on one case, fixed after with frameMaximum |
| 08:58 | 10 cases, one of each class, small, medium, large and the 3 Lock Screen families | passed |
| 09:13 | testA, the 12 design trees at Home Screen families | passed |
| 09:29 | live text first in accessoryInline, with fixed_size and suffix | passed; the shot reads "20 hr 38 min left" |
| 09:31 | a live text case, small and medium, after the inline line | passed |

</div>


Unit tests: TreeRulesTests 9, app suites 56 (08:54). Host 2,210 on 3.9 and 3.13. Shots: ops/site-checks/t0867-extension/.
widgetkit_check.sh now fails a run on any extension fatal error or crash report. Passed is not the same as drawn: reports
alone undercount, 7 reports for 13 crashes in one run.

Not run: the full 231-case sweep (about 2.5 hours; cut on the coordinator's call), so the product of every kind and every
placement is unproven. Offset and timer have only the two bar placements on the fixed build.

testD stopped at 07-shortcuts on the shipping flag file: 06 and 07 both draw the "Needs Pro" card (T-0562), so "same
pixels" is the gate, not this change. 01 to 06 were shot with 0 fatal errors. 07 to 12 are not re-run on the Lock Screen;
that needs the alpha run's flag variant.

## Review of e616b3a6

Verdict: approved, one finding fixed here, one check open.

- Names: `suffix` is plain and the row in API.md is right. Additive inside major 1 (L4 s8). A renderer that does not know
  it drops the word and still draws.
- Renderer: the branch is right. `timeZone` and `suffix` cannot meet: the schema and DSL <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> them to different styles.
- **Medium, fixed here:** a newline in `suffix` passed the DSL and `ui.validate`, then the schema refused the tree, so a user
  got a bare schema_error. The DSL now refuses it with a sentence. The test failed first (3 subtests).
- **Low, for Pernille:** LIBRARY_VERSION stays 0.3.0 with a new public keyword, and `generator.version` will not tell the two
  apart.
- **Open, device check:** whether a live date inside an interpolated Text keeps ticking is unproven. A Simulator shot cannot
  say: the 20 hour timer with no suffix read the same twice, 4 s apart (09:38), so `testHSuffixTextKeepsTicking` skips when its
  control stands still. Day progress small depends on this.
- Not re-run by me: the extension reads of clocks-widest and progress at T-0860's small rows. The snapshot tests that read
  them through ImageRenderer are green with this renderer. Maren's read of T-0860 is still hers.

Numbers beyond those above, Path geometry and shape fills were not swept. This commit is headed to TestFlight, so it needs
a reviewer who is not me.
{% endraw %}

</div>
