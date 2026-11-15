---
layout: "default"
title: "T-2869: review of the .pyc-only stdlib completion test (from T-2847 M1)"
section: "documents"
description: "The test reproduces the device layout that matters and provably takes the .pyc path. It fails for the right reasons, and the run_host.py statements are accurate. Two Lows and one nit, none blocking."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2869-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2869-pernille.md</code></span></div><h1>T-2869: review of the .pyc-only stdlib completion test (from T-2847 M1)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-05. Independent review (C13) of the uncommitted working-tree diff on `personal/a`, not
its reasoning. Scope: `pywidget/tests/tooling/test_editor.py` (`_pyc_only_stdlib_zip`, `_PYC_CHILD`,
`PycOnlyStdlib`), `pywidget/tests/run_host.py` (docstring, `BOTH` comment), `pywidget/tests/tooling/mutants-t2869.json`.
Code under test: `pywidget/python/pywidget_tooling/editor.py`, unchanged. Host only, no Xcode or Simulator.

## Verdict: PASS with findings

The test reproduces the device layout that matters and provably takes the `.pyc` path. It fails for the right
reasons, and the run_host.py statements are accurate. Two Lows and one nit, none blocking.

## What I ran (scratch: `company-scratch/T-2869-pernille`; load average 48-61)

- `run_host.py --both tooling`: 3.9.6 gave 81 tests, PASS (16 skipped), 18.1 s. 3.13.18 gave 81 tests, PASS (16
  skipped), 19.9 s.
- `mutants-t2869.json` through `tools/mutants.py`, test command `test_editor.PycOnlyStdlib`: 4/4 KILLED on 3.9.6
  and on 3.13.18.
- My own 4 mutants (`work/extra.json`) against `PycOnlyStdlib`, 3.9.6:
  - `guard-never-installed` (jedi's own `load_module` back in place): KILLED.
  - `zip-keeps-source` (the test's zip also stores the `.py` files, the host layout): KILLED.
  - `child-keeps-py-stdlib` (the child never swaps its stdlib folder for the zip): KILLED.
  - `load-module-empty-module` (`_load_module` answers an empty `ModuleType` for an unloaded module instead of
    `None`): SURVIVED. That is close to equivalent, because the typeshed stub answers either way, so it is not a
    finding.
- Hermeticity probe (`work/probe.py`, then a scratch copy of the test with the child's `cwd` changed to a folder
  that holds a `csv.py`): see L1.

## Answers to the line's checks

**Does it reproduce the device layout?** Yes, for the part this test is about. `pywidget/ios/project.yml:16,29`
set `STDLIB_MODE: zip` for both configurations, and `scripts/make_stdlib_zip.py:4-5,25` stores each pure-Python
module as a sourceless legacy-location `mod.pyc`, `ZIP_STORED`. The test's `_pyc_only_stdlib_zip` does the same
(`test_editor.py:556`). Two differences do not touch these modules: the app's zip also carries data files and any
`.py` that has no `.pyc`, and it keeps folders that have no `__init__.py`. Extensions stay in `lib-dynload` on the
host, where the device has frameworks. None of the four names under test is an extension.

**Does it take the `.pyc` path?** Yes, and the test proves it rather than assuming it. jedi calls `load_module`
only when `get_module_info` finds a module but gets no file for it. The `calls` assertion (`_load_module` was asked
for exactly the four names) therefore holds only when the zip, not a `.py` file, served them. The `spec` assertion
pins the origin inside the zip, `get_source` to `None`, and bytecode to loadable. `zip-keeps-source` and
`child-keeps-py-stdlib` show the test goes red when either half of the layout is missing.

**Does it fail for the right reasons?** Yes. Importing on the editor thread fails `imported`. Raising, or refusing
at the module search, fails `answers` (missing names). Answering with another module's names fails the `_pyio`
forbid list. The decision to leave `json` out is correct: `jedi/api/project.py` imports `json`, so it is loaded
before any completion, here and on the device. `csv` is a fair stand-in.

**run_host.py.** Accurate. `fetch_python.sh` and `packages/manifest.toml:11` say 3.15.1. Only `python3.13`
exists in `/opt/homebrew/bin`, and no 3.15 is installed. The zip is the shipped stdlib in both configurations (see
above). See N1 for the formatting.

## Findings

### Low

**L1. The child runs with `$TMPDIR` as its working directory, and jedi searches the working directory ahead of the
stdlib.**
`test_editor.py:641` passes `cwd=tempfile.gettempdir()`. `editor.complete` builds `jedi.Script(text, path=path)`
with no project (`editor.py:367`), so jedi's default project is the cwd, and its smart sys path puts that folder
first. `-I` keeps the cwd off `sys.path` but not off jedi's path. Measured: with a `csv.py` defining `zzplanted`
in the cwd, `csv.` offered `zzplanted`. When I pointed the test's child at such a folder,
`test_the_compiled_only_path_reaches_load_module` failed (`['_pyio', 'datetime', 'socket'] != ['_pyio', 'csv',
'datetime', 'socket']`). The per-user `$TMPDIR` is shared by every process this account runs. A stray
`csv.py`, `socket.py`, `datetime.py` or `_pyio.py` left there by any job makes this test fail for a reason
unrelated to the code. The same `cwd=tempfile.gettempdir()` pattern appears at `:773` and `:813`.

Fix: run the child in an empty folder of its own, `os.makedirs(os.path.join(cls.tmp, "cwd"))`, and pass that as
`cwd`.

**L2. If `setUpClass` raises, the temporary folder leaks.**
`test_editor.py:637-645`. A `TimeoutExpired` (300 s), an `OSError` while zipping, or a `literal_eval` error on a
stray last stdout line all raise out of `setUpClass`, and unittest then never calls `tearDownClass`. That leaves
`t2869-*` behind: the zip of the whole stdlib, plus the `pyc` build folder when `_pyc_only_stdlib_zip` itself
raised. On a loaded host the timeout is the likely path.

Fix: register the cleanup right after `mkdtemp` with `cls.addClassCleanup(shutil.rmtree, cls.tmp, True)`
(available on 3.8+). Then drop `tearDownClass`, and in the helper put the `rmtree` of `build` in a `finally`.

### Nit

**N1. The run_host.py docstring line runs to 151 characters.** `run_host.py:17`, ("is the nearest stand-in, ...
names the interpreters instead. An") is the line. Every other line of the docstring wraps near 90. Reflow the
paragraph.

## Filed

Nothing new. L1, L2 and N1 are small enough to fix in T-2869 before it lands.

## Fixes (Idris, 2026-11-05)

- **L1.** Every child interpreter in test_editor.py (PycOnlyStdlib, NoSpawn, InstallPhase) now runs with cwd
  `_CWD`, an empty folder inside the module's own `_TMP`. Checked: with `TMPDIR` pointing at a folder holding
  `csv.py`, PycOnlyStdlib is OK (4/4).
- **L2.** `cls.addClassCleanup(shutil.rmtree, cls.tmp, True)` right after `mkdtemp`, `tearDownClass` dropped;
  the `pyc` build folder is removed in a `finally`. After the run above, the `TMPDIR` folder held only `csv.py`.
- **N1.** Paragraph reflowed (all lines under 92).

After the fixes: `run_host.py --both tooling` 81/0 on 3.9.6 and 3.13.18; mutants-t2869.json 4/4 killed on both.
{% endraw %}

</div>
