---
layout: "default"
title: "ADR-003: Package policy. What Python packages ship in v1, how native wheels are built, and the Day 10 go/no-go"
section: "documents"
description: "It is the one place that lists what Python code ships inside the app beyond CPython and the cut stdlib, with a licence and a size for each name, and the rule that decides whether a native package is in v1. It does not\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/decisions/' | relative_url }}">← Decisions</a><a href="{{ '/documents/pywidget/adr-003-package-policy.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/decisions/ADR-003-package-policy.md</code></span></div><h1>ADR-003: Package policy. What Python packages ship in v1, how native wheels are built, and the Day 10 go/no-go</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: **framed by the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span>, author's sections pending** (Ines, 2026-10-26 20:03 ET, T-0218). Sections 0-1 and the chair line are the ruling on what this ADR covers and the pass rule for native packages. Sections 2-4 are Pernille's (T-0242, due 2026-10-28 23:59 ET), then Odalys's independent review (T-0244), then a chair line that accepts them. Plan row 6 (ops/plans/pywidget/plan.md) put this ADR on Day 6 (2026-10-27) with no author named; it is written a day late because no one owned it, and that is the chair's miss, not the runtime engineer's.
- Numbering: reserved for packages by plan row 6, ADR-001 3.1 C1 and ADR-006 line 5 ("ADR-003 must agree with section 3 below"). It does.
- Inputs: ADR-001 3.1 C1 and its Revised row (native packages only if "prebuilt iOS wheels working by Day 10"; CPython 3.15.1, wheels cp315 or abi3 built here with cibuildwheel; iOS 18.0 floor); L13-packages.md s1-s8 (Odalys); the stdlib cut, [`../research/stdlib-manifest.md`](stdlib-manifest.html) chair ruling (c045aa9d, 2026-10-25 21:09); ADR-006 s3 (bundled set only in v1.0), s9.5 (build-time downloads), s11 (Install from file), s12 (online pip); ADR-007 s4 (option (b): the extension links no Python, so it gets no packages).

## 0. What this ADR is, and what it is not

It is the one place that lists what Python code ships inside the app beyond CPython and the cut stdlib, with a licence and a size for each name, and the rule that decides whether a native package is in v1. It does **not** re-decide anything ruled elsewhere; it cites those rulings:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 0. What this ADR is, and what it is not, scrolls sideways" style="--tw:830px" markdown="1">

| Question | Ruled in | Ruling |
| --- | --- | --- |
| Standard library contents | stdlib-manifest.md chair ruling, c045aa9d | 29 strips; `profiling.sampling` stripped, not `profiling`; `import_breaks` pinned; `_zstd`, `_ssl`, `_hashlib`, `multiprocessing`, `unittest`, `doctest` ship |
| Where packages run | ADR-007 s4 | app process only; the widget extension links neither Python.framework nor the stdlib, so no package reaches it |
| Any install in v1.0 | ADR-006 s3 item 1 | the bundled set only; no online install of any kind in the release build |
| Install from file | ADR-006 s3 item 2, s11 | v1 stretch under row 37's eight conditions, condition (b) met, (a) open until Day 13 (2026-11-03); misses Day 13 -> 1.1 with no further ruling |
| Online pip | ADR-006 s10, s12, s12.6 | not v1, not a v1 stretch; first 1.1 candidate after the bundled set, under s9.4's conditions |
| Build-time downloads | ADR-006 s9.5 | pinned sdists and wheels by predictable `files.pythonhosted.org` URL and sha256 through `tools/terms_guard.py`; never `pip download` against `/simple/` |
| Licences allowed | L13 s3 (c); Commandments 4-5 | MIT, BSD, Apache-2.0, PSF, HPND, ISC; no GPL or LGPL; every shipped package gets a log/assets.md row and a line on the Acknowledgements screen (T-0042) |

</div>


## 1. The native-package rule (chair, binding)

ADR-001 3.1 C1 says native packages ship in v1 "only if ADR-003 shows prebuilt iOS wheels working by Day 10; otherwise 1.1", and its Revised row says the wheels are built here, in the order numpy, Pillow, matplotlib (Agg). "Working" was never defined. It is now:

A native package is **working** when, by **2026-10-31 23:59 ET (Day 10)**, all of these are true and written in section 4's row for it:
1. A cp315 wheel for `arm64_iphoneos` and `arm64_iphonesimulator` is built by `tools/pywidget_wheels.py` (L13 s7) from a pinned sdist URL and sha256, with `IPHONEOS_DEPLOYMENT_TARGET` 18.0, with no patch that is not upstream-first and recorded in `pywidget/packages/recipes/<name>/`.
2. Its `METADATA` licence is on the allowlist, the licence text is in the recipe folder, and a log/assets.md row exists.
3. Its import smoke test runs **inside the Simulator app build** through `tools/xc.sh` (not only on the host, not only in cibuildwheel's testbed): for numpy `import numpy; numpy.arange(3).sum() == 3`; for Pillow open and resize a 2x2 PNG made in the test; for matplotlib draw one line to an Agg PNG and read its size back.
4. Its compressed device-slice size is recorded in `pywidget/packages/sizes.tsv`, and the app's total size delta with it is under the number section 2 sets for the whole native set (L13's estimate is 15 MB, unmeasured; the chair accepts up to 25 MB compressed for the three together, since a 22 MB Frameworks folder was already accepted in the stdlib ruling, item 4).

Each package passes or fails **alone**, in the order numpy, Pillow, matplotlib. A package without a passing row by Day 10 is 1.1 with no further ruling; a package that passes on Day 10 and then fails on a device before submission is removed from the build, not patched past the freeze. The widget extension never carries any of them (ADR-007). The membership (Apple, due Day 7) is not a dependency: every step above runs on the Simulator.

Why Day 10 and not later: the feature freeze is Day 13, the alpha is Day 10, and a native wheel that does not import is a crash in the one review <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> depends on. The IDE's "needs native code" message (L13 s6) covers a missing package honestly; a half-working one does not.

## 2. Pure-Python bundled set for v1 (Pernille, T-0242)

*Pending.* One row per name: package, pinned version, licence (as read from `METADATA`), compressed size, why it ships (brief 2.5 or ADR-001 requirement, or the IDE tooling that needs it), host test that imports it. ADR-001 3.1 C1's candidates (requests and its pure dependencies, jedi + parso, pyflakes) are in; every other L13 s3 name (PyYAML, python-dateutil, packaging, pyparsing, cycler, fonttools, tabulate or rich, Black, `installer`) is in or out with one reason each. A name that is only there for a native package that failed section 1 leaves with it.

## 3. Build pipeline as built (Pernille, T-0242)

*Pending.* L13 s7 as it exists on disk after the first numpy run: the manifest format, the fetch step (s9.5 rule), the cibuildwheel invocation, the testbed step, the licence gate, the staging step, and the rebuild triggers. Every command that was run, with its time and its result, so Odalys can re-run it.

## 4. Go/no-go record (Pernille, T-0243)

*Pending.* One row per native package: wheel built (date, commit), licence row, Simulator smoke result (xc.sh summary line), size, verdict (v1 or 1.1), by whom and when.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4. Go/no-go record (Pernille, T-0243), scrolls sideways" data-n="2 3 4 5 6" style="--tw:711px" markdown="1">

| Package | Wheel built | Licence row | Simulator smoke | Size (compressed) | Verdict |
| --- | --- | --- | --- | --- | --- |
| numpy | | | | | |
| Pillow | | | | | |
| matplotlib (Agg) + contourpy + kiwisolver | | | | | |

</div>


## Chair line (Ines), 2026-10-26 20:03 ET (T-0218)

Form: the chair frames; the author fills; an independent review follows; the chair accepts (C13, C30). Nothing here measures anything; every number in section 1 is a bound, not a result.

**Ruling: ADR-003 exists as framed above. Pernille writes sections 2-4 by 2026-10-28 23:59 ET (T-0242) and runs the numpy build first (T-0243); Odalys reviews (T-0244); the chair accepts on the review.** The cross-reference table in section 0 is the ruling on scope: nothing in this ADR may contradict ADR-006 s3 or ADR-007 s4, and if a later section does, those ADRs win and this one gets a correction line.

What would make this fail: cibuildwheel's iOS path needing a tool we cannot install without spending or signing up (Commandment 7), which would make numpy 1.1 on Day 10 by the rule above and leave the IDE honest through L13 s6; and a pure-Python list that quietly grows past what the IDE needs, which section 2's one-reason-per-name rule is for.

Ines, CEO
{% endraw %}

</div>
