---
layout: "default"
title: "T-2085: review of 504703ed2 (T-1850, headroom 0 on a device)"
section: "documents"
description: "Approve with changes. No High. The rule is right: os/proc.h says 0 is &quot;not an app&quot; or &quot;over its limit&quot;, and allows() (LaneGuard.swift:257-259) now refuses 0 unless zeroIsUnknown, with the build&#x27;s answer as the default\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2085-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2085-pernille.md</code></span></div><h1>T-2085: review of 504703ed2 (T-1850, headroom 0 on a device)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Read the diff and the code at main, not the commit message or the board notes.
Files: Shared/LaneGuard.swift, Shared/ExtensionLane.swift, Tests/Core/LaneGuardTests.swift,
Tests/ExtensionLaneTests.swift, Tests/mutants-t1850.json, Core/mutants-t1850.json.

## Verdict

Approve with changes. No High. The rule is right: `os/proc.h` says 0 is "not an app" or "over its limit", and
`allows()` (LaneGuard.swift:257-259) now refuses 0 unless `zeroIsUnknown`, with the build's answer as the default
(LaneGuard.swift:238-242). The pure rule is pinned from both sides through the parameter, so the device-refuse
branch is tested on the Simulator and on the host. The two Mediums are about what nobody has measured and what the
committed tooling cannot run.

## Checks the line asked for

- Every `ExtensionLane` caller passes a real headroom. Three callers in pywidget/ios: the extension's `shared`
  (ExtensionLane.swift:123, `os_proc_available_memory()`), the test helper (ExtensionLaneTests.swift:59, a `Stub`),
  and the mirror test (ExtensionLaneTests.swift:984, `.max`). With the `{ 0 }` default gone, a new bare caller no
  longer compiles. Good.
- Device-refuse through the parameter: yes. `testMarginZeroOnADeviceRefuses` (LaneGuardTests.swift:25) calls
  `allows(..., zeroIsUnknown: false)`, including need 0 (lastPeak 8 MiB under residue 9 MiB) and headroom 1 as the
  edge. It runs on the Simulator, so it is not a branch the Simulator cannot reach.
- The helper's `headroom: Stub(0)` default (ExtensionLaneTests.swift:51): it does not hide a device bug today, but
  only because these tests never run on a device. See L1.

## Mutants

- Tests/mutants-t1850.json on the Simulator, tools/xc_mutants.py, rerun under T-2100 at 504703ed2's code (HEAD
  ce2ca3e1a, detached scratch worktree; no change under pywidget/ios between the two): 3/3 KILLED.
  old-body-zero-passes-everywhere 4 failure lines, zero-refuses-everywhere 7, zero-falls-to-need 10; xc_mutants exit 0.
  The first attempt queued 600 s on the shared xcodebuild lock behind other <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>, came back WAITED on mutant 1 (no
  verdict) and was stopped (exit 130); the rerun used XC_LOCK_WAIT=3000. Raw output: company-scratch/T-2100-pernille/
  run.txt (first attempt) and run2.txt (rerun).
- Core/mutants-t1850.json on the host: as committed it does not run (M2). With the paths made package-relative, in a
  scratch copy of pywidget/ios: baseline 54 green; 5/5 KILLED (zero-passes-everywhere 4 failures,
  zero-refuses-everywhere 2, zero-falls-to-need 3, device-reads-zero-as-unknown 1, default-ignores-build 1).

## Findings

### M1 (Medium). Nobody has measured what a widget extension on a device reads, and this change makes 0 fatal for every widget

ExtensionLane.swift:123 and :210, LaneGuard.swift:241 and :259, ExtensionLane.swift:269-275.

Before this commit, a 0 on a device passed. Now it refuses, then demotes. The header's two meanings of 0 are "over
its limit" and "not an app", and we have no reading from a widget extension on a device to say which bucket we are
in. The repository's only `os_proc_available_memory()` figures come from the Simulator (`LaneBench`,
ExtensionLane.swift:403-430, which is `PYWIDGET_LANE_FORCED && DEBUG` only) and from the app process (App/Bench.swift:67).
Failing scenario: on the first TestFlight build, if a WidgetKit extension process reads 0 (the "not an app" case),
every getTimeline returns `.oomGuard` in process 1 and `.demoted` in process 2 (`refused`, :269-275). Every widget
loses Python, there is no crash to point at, and the run log says only oom_guard. Before, the same reading would have
run the script with no margin, which is the bug T-1838 F1 named. Both outcomes are guesses until a device answers.
Fix: T-0680's device bench records `available_mb` from inside the widget extension (not the app) in a Release
build, and the (c) flag does not open until it reads non-zero there. If a device reads 0 in the extension at rest,
the margin rule needs another source (task_vm_info's `limit_bytes_remaining`) rather than a refusal.

### M2 (Medium). Core/mutants-t1850.json cannot run: its paths are relative to the repository, not the package

Core/mutants-t1850.json:2-6. Every other Core/mutants-*.json uses `Sources/PyWidgetCore/...`; this one uses
`pywidget/ios/Core/Sources/PyWidgetCore/LaneGuard.swift`. `tools/mutation_check.py pywidget/ios/Core
Core/mutants-t1850.json` runs the baseline and then dies with FileNotFoundError at
`Core/pywidget/ios/Core/Sources/...`. So the host half of the evidence is not reproducible from the committed file,
and the two mutants that only the host can <span title="A test written in advance. If it fires, we drop the idea.">kill</span> (device-reads-zero-as-unknown, default-ignores-build: the host
builds the device branch) have no runnable record. Fix: drop the `pywidget/ios/Core/` prefix on all five entries and
rerun; I did that in scratch and got 5/5 killed, so this is a file fix, not a test gap.

### L1 (Low). The lane's wiring to the build's answer is untestable anywhere we run tests

ExtensionLane.swift:210; ExtensionLaneTests.swift:51 and :595.

The lane calls `allows()` with the default. Plant `zeroIsUnknown: true` at :210 and it survives everywhere: the
Simulator's constant is already true, and ExtensionLane is not in the Core package, so the host never builds it.
About 60 of ExtensionLaneTests' 77 tests take the helper's `Stub(0)` and so ride the Simulator-only pass branch;
:595's `(0, LaneMargin.zeroIsUnknown)` is true on the only destination it runs on. Nothing fails today, and the
refuse chain the device would take is the same one need-1 already drives (:604, :619, :671-674). Fix, after T-2044
(lane b3) is out of the file: make the helper default a headroom that passes on any build (`Stub(.max)`), so the lane
tests stop depending on the Simulator constant, and keep 0 only in the test that is about 0.

### L2 (Low). The doc comment promises a `headroom=unknown` run row that nothing writes

LaneGuard.swift:232-233. No Swift source writes `headroom=unknown` (grep over pywidget/ios). After this commit a
device refusal at 0 and a refusal for need > headroom also look the same in the log. Fix: either write the field in
the run row (unknown on the Simulator, `zero` on a device) or cut the sentence. Pre-existing; the commit reworded it.
{% endraw %}

</div>
