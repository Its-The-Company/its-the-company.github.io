---
layout: "default"
title: "T-3330: review of 15b10f34d (Idris, T-2264): a forced fetch &quot;came back&quot; is judged by fields.json&#x27;s clocks"
section: "documents"
description: "Verdict: PASS with findings. Nothing High. The rule is right, and it answers F2. A forced fetch came back when this attempt moved fetched_at, and failed when a url is declared and the clock did not move. Without a url\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3330-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 18 · Sun Nov 8</span><span><code>pywidget/docs/reviews/t3330-pernille.md</code></span></div><h1>T-3330: review of 15b10f34d (Idris, T-2264): a forced fetch "came back" is judged by fields.json's clocks</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-08. Commandment 13. This answers my own T-1989 F2
(pywidget/docs/reviews/t1989-pernille.md). I raised the finding, but I did not write this fix. Read:
pywidget/ios/Shared/RefreshOutcomeRule.swift (`forcedFetchOK(declaresURL:fetchedAtBefore:fetchedAtAfter:)`),
pywidget/ios/Tests/Core/RefreshOutcomeRuleTests.swift (the three new tests), state-spec.md s10 (d) item 2,
pywidget/ios/Core/mutants-t2264.json and -results.txt, and the B5 board lines.

**Verdict: PASS with findings.** Nothing High. The rule is right, and it answers F2. A forced fetch came back
when this attempt moved `fetched_at`, and failed when a `url` is declared and the clock did not move. Without a
`url` there is no forced fetch to judge (nil). The six-case clock table, the offline-with-Motion-off case and the
body-came-back case are all pinned. The author's 7 mutants were all killed, and they cover each branch.

For build 4, this change does not affect the running app. `forcedFetchOK(declaresURL:...)` has no production
caller at d3d39da37: B5 (T-0678 / T-1882 part 1) has not landed, and `effect` is reached only from tests. The only
caller of `RefreshOutcomeRule` in shipped code is `RunLogExport.isFetchFailure`
(Shared/RunLog/RunLogExport.swift:78), which this commit does not touch. So the review can pass the gate for
build 4. The findings below are about the work this commit sets up for B5.

## Runs

- Runner job J-20261108-0912-xc-test at 24b4a2b9c (the d3d39da37 tree plus the job file): `RefreshOutcomeRuleTests`
  with two other classes, 72 executed, 0 failures, exit 0 (ops/runs/xcodebuild-20261108-091533.log).
- Host, pywidget/ios/Core: `swift test --filter "RunLogRecorderTests|RefreshOutcomeRuleTests"`: 71 tests, 0 failures.

## Findings

**M1 (Medium). The board line that B5 will be built from still gives the old, error-code rule.**
ops/board.md:39 (T-1882, part 1 is still open) says: "false only when its `error` is `offline`, `timeout`,
`http_status`, `too_large`, `tls` or `not_json`". That is exactly the rule 15b10f34d replaced. The commit message
says "Its writer tests are a note on T-0678's board line", but ops/board.md:249 (T-0678) mentions neither
`forcedFetchOK` nor `fetched_at`. Failure case: whoever builds B5 from T-1882's line maps fields.json's `error`
onto the Bool, and does not call the new function. Then an offline tap with Motion access off stores
`no_permission`, reads as "came back", and loses its badge. That is the T-1989 F2 failure this commit fixed in
the rule. Fix (Idris, as author of both lines): rewrite T-1882 part 1 so that B5 calls
`RefreshOutcomeRule.forcedFetchOK(declaresURL:fetchedAtBefore:fetchedAtAfter:)`. Put B5's two writer tests on
T-0678 as the commit says: a body missing one bound path gives no failed row, and an offline tap with `no_permission`
gives one `error` row and a badge.

**L1 (Low). The precision B5 needs is written only in a doc comment.**
RefreshOutcomeRule.swift:87-89: "Equal clocks read as not moved, so B5 writes `fetched_at` at a precision two
attempts cannot share; at whole seconds a tap inside the same second as a good fetch would badge." No writer exists
yet, so nothing is wrong today. But the requirement is not on B5's line, and no test will hold B5's writer to it.
The one fields.json-shaped writer in the tree writes `isoformat()` of `k.utc(now)`
(pywidget/widgets/premade/github.py:71, :78). Failure case: B5 writes `fetched_at` the same way with the
microseconds dropped (for example `timespec="seconds"`). A good scheduled fetch at 10:00:00 AM.2 is followed by a
tap whose fetch also succeeds at 10:00:00 AM.7. Both write `10:00:00`, the rule reads "not moved", and the tap
badges "Could not get new data" though new data arrived. Fix: add this to the same T-1882/T-0678 note as M1, with
a writer test of two good fetches in the same second.

**I1 (Info).** state-spec.md:314 marks the new s10 (d) item 2 wording "DRAFT until Maren confirms it", and
the spec does not yet record her confirmation. Closing that is Maren's job, not part of this review.
{% endraw %}

</div>
