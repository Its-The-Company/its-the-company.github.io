---
layout: "default"
title: "T-2531: review of 29d961005 (Idris; T-2382..T-2384, my T-2342 F1-F3)"
section: "documents"
description: "Verdict: approve with one Low (T-2548). The F1 rule and the F3 cases are right and measured to matter. The F2 test change is right too, but the mutant committed for it does not show it: the old test already killed it\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2531-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2531-pernille.md</code></span></div><h1>T-2531: review of 29d961005 (Idris; T-2382..T-2384, my T-2342 F1-F3)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-05. Independent review: I read the diff, the tests and the mutants, not the commit notes.
Host `swift test` only, in scratch copies (`company-scratch/T-2531-pernille`), from `git archive HEAD`
(12096021e; the three files are unchanged since 29d961005). No Xcode.

**Verdict: approve with one Low (T-2548).** The F1 rule and the F3 cases are right and measured to matter. The F2
test change is right too, but the mutant committed for it does not show it: the old test already killed it. That
part of the miss is mine: my T-2342 F2 said a millisecond `==` passes the old test, and it does not.

## What I ran


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran, scrolls sideways" style="--tw:960px" markdown="1">

| run | copy | result |
|---|---|---|
| `swift test --filter ProjectSendPlanTests` | HEAD | 39 tests, 0 failures |
| `swift test --skip testParseSpeed` (whole Core) | HEAD | 549 tests, 0 failures (Idris had 545 at his commit; later commits added 4) |
| `tools/mutation_check.py` all 14 in mutants-t2301-t2314.json, `--filter "ProjectSendPlanTests\|WidgetFolderNamesTests"` | HEAD | baseline 42 green; 14 of 14 KILLED (the three new ones: 2, 1 and 3 failures) |
| the three new mutants, same filter | fixed source, **old** ProjectSendPlanTests.swift (from 29d961005^) | baseline 41 green; `unread-ctime-not-changed` SURVIVED; `p-ctime-milliseconds` **KILLED** (1: old testStatusChangeOneMicrosecondApartIsAChange :94); `runfile-guard-dropped` SURVIVED |
| extra mutant `p-ctime-microseconds` (the committed ms mutant with `* 1_000_000`), `--filter ProjectSendPlanTests` | old tests | SURVIVED |
| same | HEAD tests | KILLED (1) |

</div>


## Against T-2342


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Against T-2342, scrolls sideways" style="--tw:1061px" markdown="1">

| T-2342 | asked | answer in 29d961005 | holds? |
|---|---|---|---|
| F1 (T-2382) | a listed nil status-change time must not equal a recorded nil | ProjectSendPlan.swift:167 `list.contains { $0.statusChanged == nil }` makes the plan changed; `list` is the counted files only, so a hidden or `__pycache__` file with no time does not trigger it. Entry doc :41-43 and type doc :9 say so. testListedFileWithoutStatusChangeIsAChange (ProjectSendPlanTests.swift:105) covers a script file and the manifest, checks no refusal and no removals, and keeps the all-times-read listing at no change | yes; mutant survived the old tests and dies now (2) |
| F2 (T-2383) | pin full precision at one Double step; reword "a lister" | :91-99 use `1_800_000_000.25.nextUp` and assert it is under 1 µs and in the same millisecond; comment :86-90 now says the test reaches `Entry ==` and `make`, not a lister | the test, yes: it now <span title="A test written in advance. If it fires, we drop the idea.">kills</span> a microsecond compare the old one let through (measured). The mutant, no: F1 below |
| F3 (T-2384) | an earlier refusal before a run-file name keeps the earlier one | three cases at :312-317: bad path, link, malformed widget file, each before `tree.json`. The guard is `if refusal == nil, destination != scriptName,` at ProjectSendPlan.swift:156 | yes; mutant survived the old tests and dies now (3) |

</div>


## Findings

**F1 (Low) T-2548, Core/mutants-t2301-t2314.json:14 and Core/mutants-t2382-t2384-results.txt:27-28.** The
mutant for T-2383, `p-ctime-milliseconds`, was already killed by the old 1 µs test. floor(x * 1000) is equal for
.25 and .250001, so the mutated `==` calls them the same, `changed` goes false, and the old assertion fails. The
results file's "the arithmetic agrees" reads that equality backwards; my T-2342 F2 made the same mistake, and
Idris followed it. What the `nextUp` change really adds is the microsecond compare: floor(x * 1e6) differs for
.25 and .250001 but not for .25 and its next Double. Fix: add `p-ctime-microseconds` (the same replace with
`* 1_000_000`) to the mutants file, keep or drop the ms one as you like, name microseconds in the test comment at
:89, and correct results line 28 to what was measured here (ms killed by the old test; µs survived old, killed
new). No product code changes.

**Note (no line).** The F1 rule means a lister that can never read the key on some volume sends at every
boundary: safe, but every send is a rename and a reload. Nothing calls `ProjectSendPlan.make` in App yet, so there
is nothing to measure; when the lister lands (T-1905: the code that lists a project folder), its review should
check how often the key comes back nil on iCloud Drive and file-provider folders.
{% endraw %}

</div>
