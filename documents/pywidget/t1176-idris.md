---
layout: "default"
title: "T-1176 review (T-1204): 58e1f064, Pernille"
section: "documents"
description: "cutStart now takes the line start only when u.count - (nl + 1) &gt;= max(minKept, 1); cutOutput passes lineCutFloor = 8 1024. The error-text trim keeps the default minKept = 1, unchanged."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1176-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1176-idris.md</code></span></div><h1>T-1176 review (T-1204): 58e1f064, Pernille</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris. Read from `git show 58e1f064` only. Verdict: **PASS**, with one non-blocking finding.

## What I checked

`cutStart` now takes the line start only when `u.count - (nl + 1) >= max(minKept, 1)`; `cutOutput` passes `lineCutFloor = 8 * 1024`. The error-text trim keeps the default `minKept = 1`, unchanged.

Boundaries, read against the code:
- Exactly 8 KiB kept: taken (`>=`). 8,191 kept: not taken. `testTheFloorIsInclusive` covers both sides.
- No newline at all: `firstIndex` is nil, falls to the scalar-boundary cut. Right by the code; no test has a newline-free input (the streams test has a newline after the cut).
- Multi-byte straddle: the cut lands on the second byte of an "é"; start moves to 16,383 kept, no U+FFFD, a suffix of the input.
- Empty or under-limit input: `cutOutput` returns before `cutStart`; `cutStart` on empty gives 0.
- Window ending on a newline: last byte "\n" gives kept 0, below the floor, mid-line cut. Not tested directly; correct by the code. Newline at index drop-1 gives start = drop, the full 16 KiB (see finding 1).

## Run

`swift test --filter 'RunDetail|RunLog'` in `pywidget/ios/Core` (scratch worktree at 58e1f064, host only): 47 tests, 0 failures, 7 of them RunDetailCutTests.

## Mutants (RunDetailCutTests only)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Mutants (RunDetailCutTests only), scrolls sideways" style="--tw:510px" markdown="1">

| Mutant | Result |
|---|---|
| `>=` to `>` | killed (floor inclusive) |
| floor 8 KiB + 1 | killed |
| floor 8 KiB - 1 | killed (8,191 case) |
| remove the UTF-8 continuation skip | killed (scalar boundary) |
| output passes `minKept: 1` (old behavior) | killed (crash and failures) |
| search from `drop` instead of `drop - 1` | **survived** |

</div>


## Findings

1. Minor, not blocking: no test has a newline exactly at byte `drop - 1`, so the `drop - 1` start of the search is unpinned (a mutant to `drop` passes all 7). That line is older than this commit and the change does not touch it. Suggested: one test where the byte before the 16 KiB window is "\n" and expect exactly 16,384 kept, starting at the line start.
2. Minor: no test for an input with no newline at all (the fallback path). The streams test is close but contains a newline.

Passed is not the same as correct: the threshold and the UTF-8 boundary are pinned by tests that fail for the right reason; finding 1 is the one gap.
{% endraw %}

</div>
