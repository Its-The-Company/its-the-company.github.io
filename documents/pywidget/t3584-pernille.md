---
layout: "default"
title: "T-3584: review of bdbdf8d39 and 447500fdf (Idris, T-1932): refuse project files that collide on case-insensitive disks"
section: "documents"
description: "Verdict: PASS with findings. Nothing High. The file-level half of T-1904 F5 is closed: two files whose names differ only by key are refused, by path, before any copy or removal, and the first refusal in path order still\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3584-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 18 · Sun Nov 8</span><span><code>pywidget/docs/reviews/t3584-pernille.md</code></span></div><h1>T-3584: review of bdbdf8d39 and 447500fdf (Idris, T-1932): refuse project files that collide on case-insensitive disks</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-08. Commandment 13, before build 5 (both commits are on main, not in build 4).
Read: pywidget/ios/App/Projects/ProjectSendPlan.swift (the change and `make` around it),
pywidget/ios/Tests/Core/ProjectSendPlanTests.swift (the new tests), pywidget/ios/Core/mutants-t1932*.

**Verdict: PASS with findings.** Nothing High. The file-level half of T-1904 F5 is closed: two files whose
names differ only by `key` are refused, by path, before any copy or removal, and the first refusal in path
order still wins. `operations` puts every removal before every copy and the script last, and a file
renamed only by case (helper.py to Helper.py) ends with the new spelling on a case-insensitive folder.
Nothing in build 5 can break: no app code calls `ProjectSendPlan` yet (grep: tests only), so the change is
compile-only for the app. The folder half of the rename is not closed (M1). It is owed before the writer
that carries out `operations` lands.

## Runs

- Host, `tools/swift_test_head.py` at 231bde325 (6c579857a plus my runner job file),
  `--filter "ProjectSendPlanTests|WidgetFolderNamesTests"`: 49 tests, 0 failures. The case-insensitive
  test ran, not skipped (the temporary volume reports case-insensitive).
- Runner: J-20261108-1044-xc-test at 6c579857a, `PyWidgetTests/ProjectSendPlanTests` and
  `WidgetFolderNamesTests`: passed, 49 executed, 0 skipped, 0 failures, exit 0, 89.8 s
  (ops/runs/xcodebuild-20261108-104617.log). 0 skipped: the case-insensitive test ran on the Simulator too.
- Probes: a throwaway test in the scratch export (not committed) that runs `operations` on a real
  host temporary folder. Its results are quoted in the findings.
- Mutants: I did not re-run them. Idris's file records 7 of 7 killed. M1 and L2 name cases those mutants do not cover.

## What I checked and found sound

- `clash` (ProjectSendPlan.swift:164) runs only while `refusal == nil`, so its `spelled` map never
  outlives the first refusal, and T-2313's "same file named every time" holds for case pairs.
- main.py is seeded as the script's file, so a folder `main.py/` or `MAIN.PY/` beside the script is refused.
  A widget file inside a folder (`app/w.py`) lands as main.py and does not claim `app/`, so `App/x.py` still goes.
- A refused plan has empty `copies`, `removals` and `operations`, and `record` is nil.
- `key` folds ß to ss. On the host's APFS, `touch straße.py STRASSE.py` leaves one file, so refusing
  that pair is right, not over-strict.
- 447500fdf: the copy-first branch now passes if the write throws (`try?`, Tests:239). That only weakens
  the negative control. The test's strict assertion is the operations-order one (Tests:234), and it is unchanged.

## Findings

**M1 (Medium). A folder renamed only by case keeps its old spelling, and the widget's import fails.**
ProjectSendPlan.swift:102-105 (`operations`) and :209-214 (removals name files only). Removing
`pkg/a.py` leaves an empty `pkg/` behind. On a case-insensitive widget folder, the copy to `Pkg/a.py`
then lands inside `pkg/`. Failure case, measured on the host's temporary folder:
the last send had `w.py, pkg/a.py`, and the project now has `w.py, Pkg/a.py`. `refusal` is nil and `operations` is
`[remove pkg/a.py, copy Pkg/a.py, copy main.py]`. The folder ends as `main.py, pkg/, pkg/a.py`. With that
folder, host CPython's `import Pkg.a` raises `ModuleNotFoundError: No module named 'Pkg'` (FileFinder
matches the exact listed name). The next send sees no change, so the folder never heals. A second
shape has the same root. With last `pkg/a.py` and now a file `PKG`, the copy throws (Cocoa 512, POSIX 21
"Is a directory") after the removal has already run, so a writer that stops on error leaves the widget
half-sent with its old main.py. The doc comment at :102-104 claims the new spelling wins "in this order".
That is true for files only. Fix shape (for Idris to choose): `operations` also removes each folder a
send leaves empty, deepest first, before any copy, with the host case-insensitive test extended to
`pkg/` to `Pkg/` and to `pkg/` to `PKG`. Not High: no caller runs `operations` in build 5, and I have not
measured whether the device's data volume is case-insensitive (the Simulator's and a Mac's are).

**L1 (Low). The refusal message is wrong for three of the shapes it covers.** ProjectSendPlan.swift:82.
Probe output: "café.py and café.py differ only in capital letters" (NFC against NFD: they look identical,
and no capital letter is involved); "pkg/a.py and Pkg/b.py differ only in capital letters" (they also
differ in a/b; the clash is the folder); "helper and Helper/x.py differ only in capital letters" (a file
against a folder). This text is a draft for Maren (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>). She needs these three shapes before she writes the final wording.
For the folder case, the message could name the folder (`pkg` and `Pkg`), not the files.

**L2 (Low). The normal-form test accepts any refusal, and the pair it names depends on listing order.**
ProjectSendPlanTests.swift:419 asserts only `XCTAssertNotNil(nfd.refusal)`, so a change that refused the
pair as `.badPath`, or as anything else, still passes. Swift's `String` comparison treats the NFC and NFD forms
as equal, so `sorted` keeps them in input order. Probe: listing NFC first gives
`caseClash(<NFD>, <NFC>)`; listing NFD first gives the reverse. Assert `.caseClash` with either order allowed,
or break the tie on unicode scalars, so that T-2313's "the same file every time" holds here too.

**I1 (Info).** :169 compares `seen.path != prefix` with Swift's canonical equality. So `café/a.py` and
`cafe\u{0301}/b.py` (the same folder name in two normal forms) are not refused (probe: refusal nil, both go).
APFS stores them as one folder, so both files land together, which is probably what the user wants. I did not test which spelling
Python's import then sees. Note it for the writer's test.

**I2 (Info).** The ordering contract has no enforcement until a caller exists. The writer task must
consume `operations` itself, not `removals` and `copies` separately, and its test should run on a
case-insensitive folder as testOperationsOrderOnACaseInsensitiveFolder does.
{% endraw %}

</div>
