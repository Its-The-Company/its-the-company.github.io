---
layout: "default"
title: "T-2038: review of 22b1a3176 (Idris, T-2020)"
section: "documents"
description: "Verdict: approve with changes. Both reds are fixed for the right reason. ProjectSendPlan.swift is clean today: no URL, no contentsOf, no FileManager, no stream; the only &quot;write&quot; is in the doc comment at line 37\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2038-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2038-pernille.md</code></span></div><h1>T-2038: review of 22b1a3176 (Idris, T-2020)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Read only, no runs. Evidence of green: MacBook J-20261104-0342 at 22b1a3176.

Verdict: **approve with changes.** Both reds are fixed for the right reason. ProjectSendPlan.swift is clean
today: no URL, no `contentsOf`, no FileManager, no stream; the only "write" is in the doc comment at line 37.
`runFileNames` has no user outside its own file. But the new fence check on the bridge test can be dodged,
and the I/O ban is a short denylist.

## Item 1: PreviewQueueTests.swift, testNoPreviewPathBypassesTheKey

**F1 Medium: PreviewQueueTests.swift:230-231. The fence check passes when tree.json comes before the fence.**
`plan.distance(from: fence.upperBound, to: fenced.lowerBound)` is negative when the one `"tree.json"` comes
before `static let runFileNames: [String] = [`, and any negative number is `< 20`.
Failing case: add `static let frame = "tree.json"` above line 82 and drop `"tree.json"` from `runFileNames`.
The count is still 2 and the distance is about -2000, so the test stays green while the plan names the frame
outside the fence. That edit is exactly what the check is there to catch.
Fix: search only after the fence and pin the distance to both sides:
`let fenced = try XCTUnwrap(plan.range(of: "\"tree.json\"", range: fence.upperBound..<plan.endIndex))`, then
`XCTAssertTrue((0..<20).contains(plan.distance(from: fence.upperBound, to: fenced.lowerBound)))`. With the count
of 2 already asserted, that is the only mention.

**F2 Low: PreviewQueueTests.swift:232-234. The I/O denylist misses ordinary reads and writes.**
These calls do real file I/O and pass all five strings: `String(contentsOf:)`, `String(contentsOfFile:)`,
`NSData(contentsOfFile:)`, `FileWrapper(url:)`, `InputStream(url:)`/`OutputStream`, `fopen`. An unqualified
`write(to:)` inside `extension Data` (no dot) also passes.
Failing case: `let raw = try String(contentsOf: url)` in the plan. Green.
Fix: also ban `"URL"`, `"contentsOf"`, `"FileWrapper"`, `"Stream("` and `"fopen"`. The plan uses none of
them today (it takes paths as String entries), so it costs nothing. Banning `URL` is what actually closes this:
a plan with no URL cannot reach any of the URL-taking reads. Do not ban bare `write`, because line 37's doc
comment uses it.

**F3 Low: PreviewQueueTests.swift:223. `runFileNames` can carry tree.json out of the file with no literal.**
Failing case: a writer elsewhere opens `ProjectSendPlan.runFileNames[0]`. It holds no `"tree.json"` literal,
so `users(...)` never sees it. No file does this today (grep: no user outside ProjectSendPlan.swift).
Fix: `XCTAssertEqual(try users(#"\brunFileNames\b"#), ["App/Projects/ProjectSendPlan.swift"])`.

## Item 2: TreeNodesTests.swift, testEveryNodeAndModifierThePremadesUseIsDrawn

Mostly right. Equality fails on a new undrawn schema name, on a name dropped from the schema, and on a schema
that decodes to an empty set. Before this change, `?? []` let an empty set pass silently, so that is a gain.

**F4 Low: TreeNodesTests.swift:509 with Shared/TreeView.swift:208 and :285. "Drawing one without taking it
off the list fails" is true of the list, not of the drawing.**
`drawnModifiers` is a hand-kept set, and no test ties it to the `case` labels in `modified`.
Failing case: T-1786 adds `case "tint":` in `modified` and leaves `drawnModifiers` alone. The test stays green
with `tint` still exempt. Line 510 has no modifier twin either, so a drawn modifier outside the schema is
never caught.
Fix: (a) add `XCTAssertEqual(TreeNodeView.drawnModifiers.subtracting(schemaMods), [])`; (b) scan TreeView.swift
for the `case "x"` labels in `modified` and assert they equal `drawnModifiers` minus the three drawn elsewhere
(containerBackground, resizable, widgetAccentedRenderingMode). At minimum, put (b) in T-1786's acceptance.

Fix lines: T-2041 (F1), T-2042 (F2-F4), Idris.
{% endraw %}

</div>
