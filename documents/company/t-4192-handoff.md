---
layout: "default"
title: "T-4192 handoff: T-0043"
section: "documents"
description: "Stopped on the coordinator&#x27;s word: an Investor on #325 at 2:23 PM ET (c7067981085), &quot;Stop the app work until the comparison work is done&quot;. No commit was made. The changes below are left uncommitted on personal/b3."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4192-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 31 · Sat Nov 21</span><span><code>ops/plans/T-4192-handoff.md</code></span></div><h1>T-4192 handoff: T-0043</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Stopped on the coordinator's word: an Investor on #325 at 2:23 PM ET (c7067981085), "Stop the app work until the comparison work is done". No commit was made. The changes below are left uncommitted on personal/b3.

## What I found

- Most of T-0043 is already on main. The cut: the manifest strips all 30 names, including every L12 name (T-0052). The build-phase check: `stdlib_cut.py check` runs in every mode, and Release needs zip (T-0339, T-0364). The interpreter scan is T-2319. The escape tests are in `pywidget/ios/Tests/EscapeCorpusTests.swift`, landed as e51140f8a2.
- Build-for-testing this session: green, Debug zip (ops/runs/xcodebuild-20261121-141840.log). The bundle check passed (no L12 name; python/lib 11,313,152 B, -0.1% against the manifest; Frameworks/ 29,102,080 B, +0.8%). The appex holds no Python and no Frameworks.
- The gap: `check` reads only python/lib (tree and zip), lib-dynload and Frameworks/. install_packages.sh covers app_packages. Nothing at build time reads Runtime/, the premades or other resource folders, and those are on the script import path.
- The vendored 3.15 slice has 70 extension modules. Every test and xx module in it is covered by DENY_EXACT/DENY_PREFIX.

## What I changed (uncommitted, untested by the plan's checks)

- `pywidget/ios/scripts/stdlib_cut.py`: a new `sweep <app> [--warn-only]` command. It reads the whole .app at any depth, PlugIns/ and zips included. It fails on any module-shaped entry with an L12 name: a .py/.pyc/.so/.fwork/.dylib file, a .framework folder, or an importable folder. An exact name fails anywhere; a _test*/xx* name fails unless it sits inside a regular package. jedi's typeshed folders (.pyi stubs only) don't count as modules.
- `pywidget/ios/project.yml`: a new "Python denylist sweep" postBuild phase, placed just before the Acknowledgements check (so after the embed phases). It warns only in Debug with STDLIB_MODE=full.
- Tried by hand: on the built Debug app the sweep passes (exit 0). On a copy with a seeded Runtime/ctypes.py and Runtime/premade/_testx/__init__.py it fails (exit 1) and names both. --warn-only exits 0. A missing bundle exits 2.

## What's left

1. Host tests: a `Sweep` class in pywidget/tests/stdlib/test_stdlib_cut.py (clean pass, exact name at depth, prefix outside and inside a package, the .pyi stub folder, zip members, PlugIns/, warn-only, bad input), and mutants in stdlib_cut_mutants.json.
2. Check whether tests/xc_inputs_test.py, main_gate_test.py, privacy_scan_phase_test.py or pywidget/tests/widgets/test_bundle_runtime.py pin the postBuild phase list.
3. `python3 tools/feature_session.py plan T-4192 T-0043` and every check it prints; the whole PyWidgetTests target; a Release Simulator build for the bundle measurement (not yet taken).
4. One commit, then feature_session check and lane_landcheck --task T-0043.

## The patch

The uncommitted change is saved as `ops/plans/T-4192-handoff.patch` (stdlib_cut.py sweep and the project.yml phase), made against 4bbb3f10dc. The next session applies it with `git apply ops/plans/T-4192-handoff.patch` and goes on from "What's left".
{% endraw %}

</div>
