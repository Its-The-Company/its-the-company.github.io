---
layout: "default"
title: "T-3140: re-review of e82847223 (Idris, T-2041/T-2042) against T-2038 F1-F4"
section: "documents"
description: "Verdict: PASS. All four fixes are in, each the way T-2038 asked, and each fails on the edit it was written for. Four Lows below are new holes of the same family, none in the code today. Idris can take them the next time\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2041-t2042-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 17 · Sat Nov 7</span><span><code>pywidget/docs/reviews/t2041-t2042-pernille.md</code></span></div><h1>T-3140: re-review of e82847223 (Idris, T-2041/T-2042) against T-2038 F1-F4</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-07. Code at HEAD 4ce1813fc; neither test file nor ProjectSendPlan.swift/WidgetID.swift
has changed in a way that touches these checks since e82847223 (TreeNodesTests changed in 08cba95a7 and 43be07d86,
both above line 528).

Verdict: **PASS.** All four fixes are in, each the way T-2038 asked, and each fails on the edit it was written for.
Four Lows below are new holes of the same family, none in the code today. Idris can take them the next time he
opens this test; none blocks.

## What I checked, and how

No xcodebuild or Simulator here (Idris holds the slot), and neither test is in Core, so `swift test` does not reach
them. I ran them on the host instead:

- `bypass.swift`: lines 188-256 of BridgeTests.testNoPreviewPathBypassesTheKey, copied with XCTAssert swapped for
  a collector, built with host `swiftc`, run over `git archive HEAD` of App/, Shared/, Widget/. GREEN at HEAD.
- `f4.py`: the F4 part of TreeNodesTests.testEveryNodeAndModifierThePremadesUseIsDrawn (drawnModifiers parsed from
  TreeView.swift, schema enum from viewtree.schema.json, the same two regexes and the same `"\n    }\n"` end).
  GREEN at HEAD: 39 outer cases, 42 listed, 42 in the schema.
- Idris's 8 mutants (pywidget/ios/Tests/mutants-t2041-t2042.json) on both replicas: **8/8 killed**, each on the
  assertion it names.
- MacBook J-20261107-0813 at dd99eefbf: e82847223 is an ancestor; result commit 8feea75c9 says passed, 1493
  executed, 0 failures (BridgeTests 125 run, 1 skipped). I could not see which test was skipped from here.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I checked, and how, scrolls sideways" data-n="1" style="--tw:706px" markdown="1">

| T-2038 | Claim | Holds? |
|---|---|---|
| F1 | fence searched from its end, distance pinned 0..<20 | Yes. PreviewQueueTests.swift:236-242. Above-fence and end-of-fence mutants both red. |
| F1+ | scan follows WidgetFolder.treeName | Yes for the qualified name (:226, :231). See R1 for the bare name. |
| F2 | I/O ban adds URL, contentsOf, FileWrapper, Stream(, fopen | Yes, on code with `//` comments cut (:243-250). Line 37's URLResourceValues sits in a `///` comment and is cut. See R3, R4. |
| F3 | runFileNames read by the plan only | Yes (:253). See R2. |
| F4a | drawn modifiers outside the schema fail | Yes (TreeNodesTests.swift:529). |
| F4b | modified's outer case labels equal drawnModifiers less three | Yes (:530-548). Fails closed on a split label (my R6: red) and on a modified the scan cannot find (`> 30`). A case with a `where` clause escapes the regex, but only for a name outside the schema, which no tree can carry, so the schema equality at :526 already covers it. |

</div>


## Findings

**R1 Low: PreviewQueueTests.swift:226. A bare `treeName` inside `extension WidgetFolder` in another file is not listed.**
The regex wants `WidgetFolder.treeName`. Inside an extension the name is just `treeName`.
Failing case: new file App/FramePeek.swift with `extension WidgetFolder { static func frameURL(_ id: String, in w: URL)
throws -> URL { try url(for: id, in: w).appendingPathComponent(treeName) } }`, plus a caller that writes
`Data()` to it. Replica: GREEN. A `treeURL` helper in an extension is an ordinary refactor, and the T-2041 comment
says such a file "is listed here".
Fix: `XCTAssertEqual(try users(#"extension\s+(WidgetFolder|WidgetStatus)\b"#), [])`. There is none today.

**R2 Low: PreviewQueueTests.swift:253. The plan can pass the frame name out under a new name.**
Failing case: `static let frameName = runFileNames[0]` in the plan, and another file writes to
`appendingPathComponent(ProjectSendPlan.frameName)`. treeName is still named once, after the fence, runFileNames
is still read only in the plan. Replica: GREEN. It is F3 one step further on.
Fix: pin the plan's own uses: `XCTAssertEqual(planCode.components(separatedBy: "runFileNames").count, 3)`
(the declaration at :95 and `runKeys` at :142).

**R3 Low: PreviewQueueTests.swift:248-249. POSIX `open(` is not banned.**
Failing case: `static func peek(_ p: String) -> Int32 { open(p, O_RDONLY) }` in the plan. It compiles because
Foundation brings in Darwin, and it contains none of the ten strings. Replica: GREEN.
Fix: ban `"open("` (it also covers `fopen(`). The plan's code has no `open(`, `read(` or `write(` today.

**R4 Low: PreviewQueueTests.swift:246. Cutting at the first `//` also cuts at a `//` inside a string literal.**
Failing case: `let _ = "//"; return try? String(contentsOfFile: p, encoding: .utf8)` on one line. Replica:
GREEN. Contrived, but this check is meant to stop exactly that kind of dodge.
Fix: cut only lines whose first non-space characters are `//`. Every comment in ProjectSendPlan.swift today is a
whole-line comment, so nothing else changes.

## Mutants run here


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Mutants run here, scrolls sideways" style="--tw:491px" markdown="1">

| Mutant | Result |
|---|---|
| Idris 1-6 (F1 x2, F2 x3, F3) on bypass replica | 6 killed |
| Idris 7-8 (F4a, F4b) on f4 replica | 2 killed |
| R1 extension WidgetFolder elsewhere | survived |
| R2 plan re-exports runFileNames[0] | survived |
| R3 POSIX open in the plan | survived |
| R4 `"//"` hides a read | survived |
| R6 a listed case split over two lines | killed (fails closed) |

</div>
{% endraw %}

</div>
