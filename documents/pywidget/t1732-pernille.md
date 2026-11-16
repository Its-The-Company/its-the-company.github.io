---
layout: "default"
title: "Review: T-1732, the lane keeps a learned stdlib root only when it is python3. (1e8077ff42, Idris)"
section: "documents"
description: "Verdict: PASS with findings. The change does what it says. A learned root of &quot;/&quot;, &quot;&quot; or &quot;.&quot; (and every other shape whose last part is not python3.) is dropped, and the lane then fails closed. The real vendored iOS name\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1732-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t1732-pernille.md</code></span></div><h1>Review: T-1732, the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> keeps a learned stdlib root only when it is python3. (1e8077ff42, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, T-4049, 2026-11-16. Independent review (Commandment 13): I read the commit and the code, not
the author's notes. Scope: 1e8077ff42 (cherry-pick of 8825c9e3a2), `pywidget/ios/App/Runtime/_pywidget_runtime/lane.py`
(`compiled_stdlib_root`) and `pywidget/tests/bridge/test_lane.py` (`SourcelessStdlibTests`), from T-1674 F3.
Checked against personal/a3 at 55f7702836. Line numbers below are for the files at that HEAD.

**Verdict: PASS with findings.** The change does what it says. A learned root of "/", "" or "." (and every other
shape whose last part is not python3.*) is dropped, and the lane then fails closed. The real vendored iOS name is
kept. The new tests go red when the check is dropped, on 3.9 and 3.13. One Low: the tests pin the three roots
they name, not the rule, so a looser check would still pass them (L1, T-4586). Nothing here blocks
TestFlight.

## What I checked

**1. It still stands at HEAD.** 1e8077ff42 is an ancestor of HEAD. Six later commits touch lane.py or test_lane.py
(T-3784, T-3282, T-3310, T-4468, T-4494, T-0972). None of them touch the reviewed code: `compiled_stdlib_root`
(lane.py:1128-1144), `_norm`/`_under`/`LaneFinder` (:511-591), `install_finder` (:1147-1162) and
`SourcelessStdlibTests` are byte-identical between 1e8077ff42 and HEAD (diffed function by function).

**2. The rule against the roots a builder can really produce.** The root is `dirname(dirname(co_filename))` of
`json.loads`; the check is `basename(normpath(root)).startswith("python3.")` (:1142). I ran the real function on
3.9.6 and 3.13.18 with `json.loads` recompiled under each name:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I checked, scrolls sideways" style="--tw:640px" markdown="1">

| compiled name of json/__init__.py | learned root |
|---|---|
| `Platforms/Apple/iOS/Frameworks/arm64-iphoneos/lib/python3.15/json/__init__.py` (the vendored one, below) | kept, `Platforms/.../lib/python3.15` |
| `/b/lib/python3.15/...`, `python3.15/...`, `/x/python3.15//json//__init__.py` | kept (the last as `/x/python3.15`) |
| host stdlib (Xcode 3.9, Homebrew 3.13) | kept, the real `lib/python3.N` folder |
| `/json/...`, `//json/...`, `///json/...`, `json/...`, `./json/...`, `json.py`, `<frozen json>` | `""` |
| `lib/python3/...` (no minor) | `""` (fails closed; no CPython stdlib lives in a bare `python3`) |
| `/app/python/lib/python315.zip/json/...` (a source .py loaded by zipimport) | `""` |
| `/a/lib/python3.15/../../json/...`, `/var/json/...` | `""` |

</div>


- **The shipped name.** The zip (scripts/make_stdlib_zip.py) stores the XCframework's own `__pycache__` .pyc, so the
  compiled name is upstream's. I read it from `Vendor/python/Python.xcframework/lib/python3.15/json/__pycache__/
  __init__.cpython-315.pyc`: `Platforms/Apple/iOS/Frameworks/arm64-iphoneos/lib/python3.15/json/__init__.py`. Kept.
- **Trailing slashes and doubled slashes.** `dirname` never leaves a trailing slash except on "/" itself, and the
  check normalises first; `//` (which `normpath` keeps on POSIX) has an empty basename and is dropped.
- **".." shapes.** Normalised before the basename is taken, so `.../python3.15/../..` is judged as what it means.
- **The zipped-layout root.** A `python315.zip` root is dropped. That costs nothing: stdlib_root (the zip path) is
  passed to `configure` separately, so a source member loaded from the zip is trusted through it anyway.
- **Relative roots.** Kept as names, never resolved (`configure` :543 adds realpath only for absolute roots), and
  `_trusted_file` (:649) refuses every relative path, so a relative learned root widens nothing there.
- **Symlinks.** For an absolute root, `configure` also trusts `realpath(root)`, and the basename check is not
  applied to that (N1).

**3. Other places that trust a learned root.** `compiled_stdlib_root` has one caller, `install_finder` (:1155),
which feeds `LaneFinder.configure`; the roots are frozen after (`_freeze_roots`). `LaneFinder.trusted` is read by
`_user_frame` (:560-580, user roots asked first, T-1642 L3) and by the lazy recorder through `_trusted_file`
(:649-663, absolute paths only). The other learned roots in the same list are `runtime_dir` and `_package_dir`
(:594-603, the folder of a package's `__init__.py`; a namespace package gives None, which is skipped). runner.py has
no copy of the json trick; its `stdlib_root` is `dirname(os.__file__)` (runner.py:284), not learned from code names.

**4. The tests fail on the old code: mutants.** I edited lane.py:1142 in place, ran `SourcelessStdlibTests` on
/usr/bin/python3 (3.9.6) and Homebrew 3.13.18, and restored from a copy after each (`cmp` identical each time;
`git diff` empty at the end).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: What I checked, scrolls sideways" style="--tw:471px" markdown="1">

| mutant | 3.9.6 | 3.13.18 |
|---|---|---|
| M1 drop the check (`if False:`) | FAILED (2) | FAILED (2) |
| M2 `startswith("python3")` (no dot) | OK, survives | OK, survives |
| M3 no `_norm` | OK, survives | OK, survives |
| M4 refuse only `""`, `"/"`, `"."` | OK, survives | OK, survives |
| M5 `startswith("python")` | OK, survives | OK, survives |

</div>


M1 is the mutant the line asked for, and it is red. M3 is equivalent: a root made by two `dirname`s never has a
basename that normalising changes into python3.*. M2, M4 and M5 are L1.

**5. Runs.** `python3 pywidget/tests/run_host.py --both bridge`: PASS, 327 tests on 3.9.6 (5 skipped, 88.8 s) and
327 on 3.13.18 (68.5 s), 0 failed suites. No Xcode run: the change is Python only, and the Swift lane suites
(ExtensionLaneTests through the real bridge, on the zip stdlib, which project.yml sets for Debug too) were not
needed to answer the question; I did not run them.

## Findings

**L1 (Low, the tests pin three roots, not the rule): `pywidget/tests/bridge/test_lane.py:218-239`.** The tests
name "/", "", "." and two python3.* roots. A check rewritten as a denylist of those three (M4), or loosened to
`startswith("python3")` (M2) or `"python"` (M5), passes every test on both interpreters. Failure scenario: someone
"simplifies" :1142 to M4; a builder that compiled at `/var/json/__init__.py` then gives a learned root of `/var`,
and `configure` trusts `/var` and `/private/var`, the whole data volume on a device. User roots are asked first, so
the lane's scripts stay user code, but a module a script wrote elsewhere in the App Group (its data folder) and put on
sys.path would run as trusted, and its off-allowlist imports would go through. No suite would go red. Fix: add
rejects for `/var/json/__init__.py` (gives `/var`), `lib/python3/json/__init__.py` (gives `python3`) and
`/app/python/lib/python315.zip/json/__init__.py` (gives `python315.zip`), and the vendored
`Platforms/Apple/iOS/Frameworks/arm64-iphoneos/lib/python3.15/...` name as a keep.

## Notes (no change asked)

- N1: for an absolute learned root, `configure` (:543-544) also trusts `realpath(root)`, and the python3.* check is
  on the name only. On a device the shipped root is relative, so no realpath is added; with source on disk the root
  is the bundle's own stdlib folder. A symlinked final part cannot be planted from inside the sandbox. Accepted.
- N2: `_norm(root) or ""` (:1142): `_norm("")` already returns "", so `or ""` is dead. Harmless.
- N3: as the docstring says (:1133-1134), a compile() that names a file under the learned root still forges a
  trusted frame; NEVER and the denied submodules hold regardless. Known since T-0675, unchanged here.

Board line (owner Idris, from T-4049): L1 = T-4586.
{% endraw %}

</div>
