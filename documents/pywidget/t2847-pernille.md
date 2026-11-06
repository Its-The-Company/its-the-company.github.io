---
layout: "default"
title: "T-2847: review of T-2511 (completion never rebinds sys.path), commit 02134c594"
section: "documents"
description: "H1 is fixed. No path through jedi 0.19.2 that runs in this process assigns sys.path any more, and the new test catches the old code. One Medium and three Lows, none blocking. They are filed as T-2869 and T-2870."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2847-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2847-pernille.md</code></span></div><h1>T-2847: review of T-2511 (completion never rebinds sys.path), commit 02134c594</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-05. Author: Idris. Independent review (C13) of the commit, not its reasoning.
Scope: `pywidget/python/pywidget_tooling/editor.py` (`_load_module`, `_get_module_info`, `_guard_sys_path`),
`pywidget/tests/tooling/test_editor.py` (`SysPathUnderCompletion`), `pywidget/tests/tooling/mutants-t2511.json`.
My original finding: H1 in [`pywidget/docs/reviews/t2262-pernille.md`](t2262-pernille.html). Host only, no Xcode or Simulator.

## Verdict: PASS

H1 is fixed. No path through jedi 0.19.2 that runs in this process assigns `sys.path` any more, and the new test
catches the old code. One Medium and three Lows, none blocking. They are filed as T-2869 and T-2870.

## What I ran (scratch: `company-scratch/T-2847-pernille`, `git archive 02134c594`)

- Tooling suite, `run_host.py --python <py> -v tooling`: 3.13.18 gave 77 tests, OK (16 skipped). 3.9.6 gave
  77 tests, 2 failures, both `test_bundled_clean.UiCompletesInEveryKind` keystroke budgets (143 and 116 ms against
  100). Load average was 58-63. The parent commit 02134c594^ fails the same test the same way back to back (165 and
  125 ms), so these failures come from the load, not this commit.
- The new `SysPathUnderCompletion` class on the parent (old editor.py, new test file), 3.13: red. The second thread
  saw a foreign `sys.path` 277,845 times, `mmap` was imported on the editor thread, and the guard test errors.
  On the commit: green.
- `mutants-t2511.json` through `tools/mutants.py`, test command `test_editor.py SysPathUnderCompletion`: 5/5 KILLED
  on 3.9.6 and 3.13.18.
- My own 5 mutants (`work/extra-mutants.json`) against the full `test_editor.py`: all 5 SURVIVED on 3.9 and 3.13
  (L3).
- Differential check (`work/diff.py`): jedi's own `get_module_info` against `_get_module_info`, on 27 names times 4
  `sys_path` lists plus 3 submodule searches, 111 cases on each Python. The cases cover the stdlib, extensions,
  builtins, frozen modules, a missing name, a two-portion namespace package, a module loaded from a folder since
  removed from `sys.path`, a `sys.modules` entry with no spec, and one whose spec has a loader that no finder
  knows. The two answer identically except for one case: a frozen module that is not loaded and has no file
  (`__hello__`). There jedi answered `(None, False)` and then imported the module through `load_module`. The new
  code answers `(None, None)`. That is the same refusal `_load_module` makes, so it is correct. 2 diffs on 3.13, 4
  on 3.9 (3.9 ships no `__hello__.py`).
- Completion loss, host layout (`work/loss.py`, 3.13). I compared labels from jedi's own `load_module` with labels
  under the guard, for every iOS bundle extension that is not loaded (34 of them) plus 34 everyday texts. The losses
  are confined to modules imported by their private names (`_sqlite3.`, `_ssl.`, `_codecs_jp.` and so on, which
  have no typeshed stub) and to dunder methods (`sqlite3.connect('x').` loses 17 dunders, `ET.` loses
  `__loader__` and `__spec__`). Public names are untouched. The old run imported all 34 extensions on the editor
  thread. The guarded run imported none.
- Completion loss, device layout (`work/mkzip.py`, `work/loss_zip.py`, 3.13): the stdlib served from a zip that
  holds only `.pyc` files, like the app's `python315.zip` (543 `.pyc` files, 1 `.py`). See M1. Of 84 public modules,
  37 were not loaded. 36 of those answered from typeshed with the same counts as before. One, `dataclasses`, went
  from 12 names to 0 (L2).

## Answers to the line's checks

**Refusing unloaded extensions loses no completion that matters.** Holds for every public stdlib name I could
measure: typeshed answers for them. The losses are private `_x` modules, dunders, and stdlib modules that jedi
0.19.2's typeshed lacks (L2).

**`_get_module_info` matches jedi's search for namespace packages and the `sys.modules` fallback.** Yes. Passing
jedi's list as `PathFinder`'s `path` gives the same `ImplicitNSInfo` name and paths as rebinding `sys.path`.
`full_name = string if not path else full_name` (jedi `functions.py`, `_find_module`) agrees because jedi's global
search passes `string == full_name`, and `path=[]` (the `builtins_module` case) is falsy, as `None` was. The
`sys.modules` fallback covers every case jedi's `importlib.util.find_spec` covered except the import of an unloaded
frozen module, which is now correctly refused. I diffed the 3.15.1 importlib sources the app ships against 3.13:
`PathFinder.find_spec`, `PathFinder._get_spec` and `importlib.util.find_spec` are the same, apart from the rename
`_NamespacePath` to `NamespacePath`, which keeps `._path` (`_bootstrap_external.py:1078-1080`, alias at :1144).

**Nothing else in jedi 0.19.2 assigns `sys.path`.** Confirmed by grep of jedi, parso 0.8.7 and pyflakes 3.4.0 for
assignments, slice assignments, `insert`, `append`, `pop`, `remove`, `meta_path`, `path_hooks` and `chdir`. The only
assignments are `access.py:118/137` and `subprocess/functions.py:38/45`, and both are replaced. What remains is
`utils.py:80/97` (`setup_readline`, which editor.py never calls) and `subprocess/__main__.py` (the subprocess
environment, never spawned here). jedi reaches both replaced functions through call-time attribute lookups
(`InferenceStateSameProcess.__getattr__` -> `getattr(functions, name)`, then `functions.load_module` ->
`access.load_module`). Nothing holds the original functions, so the module-attribute swap takes effect.

**Thread safety against a run starting mid-completion.** There is no window. The replacement is installed once,
permanently, on the editor thread, before the first `jedi.Script` (`editor.py:361`, after `import jedi` and before
`_environment()`). Neither `import jedi` nor `InterpreterEnvironment()` reaches either function. The script thread
never calls jedi. `list(sys_path)` (`editor.py:232`) copies the live list in one C call under the GIL, so a
script's `sys.path.insert` cannot change the list mid-iteration under `PathFinder`. A module still initialising on
the script thread is now read from `sys.modules` rather than through `__import__`, so the editor no longer waits on
that module's import lock with no bound. That is a small improvement on M2 of T-2262.

**Originals restored on every exit path.** By design there is nothing to restore. Neither replacement mutates
process state, so an exception, `Cancelled` or `OverBudget` mid-call leaves `sys.path` as it was (the old `finally:
sys.path = temp` is gone, not moved). Putting jedi's originals back after each call would reopen H1, so the
permanent install is the right shape. The test that does restore (`test_editor.py:512-524`) does so in `finally`.

**The iOS bundle's Python matches what was tested.** It does not (M1).

## Findings

### Medium

**M1. The fix is tested on 3.9 and 3.13 with a `.py` stdlib, but the app ships 3.15.1 with a `.pyc`-only zip, and
the zip is the layout this fix changes most.**
`pywidget/ios/scripts/fetch_python.sh:7` pins `PY_VERSION="3.15.1"`, and the built `Python.framework/Info.plist`
reads 3.15.1. `pywidget/tests/run_host.py:14` still says "the app embeds 3.13", and `:68` runs 3.9 and 3.13 only.
No host 3.15 is installed.

The version gap is not the main risk: the importlib code the fix relies on is the same in 3.15 (above). The layout
gap is. On the device every stdlib module is `.pyc`-only in `python315.zip`, so jedi's `_from_loader` gets `None`
from `zipimporter.get_source`. Every stdlib module that is not loaded, `json` and `datetime` included, then goes
through `_load_module`, which now refuses it. Before the fix, the device imported each one on the editor thread
with `sys.path` swapped, so H1 struck on every stdlib completion, not only on extensions.

On the host, jedi parses the `.py` file instead, so the suite never takes this path. Concrete failure case: a
mutant that makes `_load_module` return `None` for everything not in `sys.modules`, or a change that breaks the
typeshed fallback, would pass the whole suite and still blank `import json\njson.` on the device. My zip simulation
shows the current code is fine (36/37 answered).

Fix (T-2869): add a test class that serves the stdlib from a `.pyc`-only zip (as `work/loss_zip.py` does) and
asserts that public modules complete without being imported. Correct the run_host.py docstring to say 3.15.1.

### Low

**L1. jedi still imports modules on the editor thread through `DirectObjectAccess.getattr_paths`, and editor.py's
docstring says it never does.**
`editor.py:93` reads "never import a module the script has not loaded", and `_guard_sys_path`'s docstring says the
same. jedi's `access.py:393` runs `__import__(return_obj.__module__)` on any compiled object whose `__module__`
names another module. Measured on 3.9 and 3.13 (`work/getattr_import.py`): with `_sqlite3` loaded and `sqlite3`
not, completing `import _sqlite3\n_sqlite3.Connection.` under the guard imported `sqlite3` and `sqlite3.dbapi2` on
the editor thread. It does not rebind `sys.path`, so this is not H1, but module code still runs beside the script.
It is rare (it needs a private extension that the script loaded without its public wrapper).

Fix: in `_guard_sys_path`, set `access.__import__` to a function that returns `sys.modules[name]` or raises
`ImportError`. The `IMPORT_NAME` opcode uses the frame's builtins, so this catches only the explicit call. Or
correct the two docstrings.

**L2. Stdlib modules that jedi 0.19.2's typeshed lacks complete empty on the device until a run imports them.**
Measured in the zip layout: `import dataclasses\ndataclasses.` gave 12 names before and 0 after (jedi has
`stdlib/3.7/dataclasses.pyi`, and it still answers nothing, for a reason I did not chase). From the bundle contents
and the typeshed, `tomllib` and 3.15's `compression.zstd` have no stub either and fall into the same case; that is
inferred, not measured. `pywidget/__init__.py` imports `reading`, which imports `dataclasses`, so after the first
run that imports `pywidget` it completes again (reset keeps stdlib modules). The case is the cold editor.

Fix: import a short allow-list of pure-Python, side-effect-free stdlib modules (`dataclasses`, `tomllib`) at
bootstrap or in a gated warm(), or find why the dataclasses stub does not answer.

**L3. Four branches of the new code are untested, and the guard's install leaks across tests.**
These 5 mutants survive the whole `test_editor.py` on 3.9 and 3.13:
- `builtin-branch-dropped` (`editor.py:210`): no test completes a builtin that is not loaded.
- `sysmodules-fallback-dropped` (`editor.py:237`): no test has a loaded module that the finders cannot find.
- `fallback-without-sys-path-guard` and `path-override-always` (`editor.py:231,238`): close to equivalent, because
  jedi never passes both `sys_path` and `path`.
- `guard-only-in-warm` (install only on warm's and prime's text). It survives because whichever test calls warm()
  or prime() first installs the guard for the rest of the process. Concrete failure case: if a later change moves
  the guard into warm() alone, a `complete()` issued before warm() (the 0.8 s diagnostics pause in T-2262 Q3 makes
  that order possible) runs jedi unguarded, and no test notices.

Also, `test_unloaded_extension_answers_without_importing` (`test_editor.py:506-510`) checks `mode == "jedi"` but
not that any name came back.

Fix: a subprocess test in which `complete()` is the first jedi call; a case for a builtin that is not loaded and
one for the `sys.modules` fallback (a module loaded from a folder since removed from `sys.path`); assert at least
one label in :506.

## Filed

- T-2869 (Idris, P1): a stdlib test in the `.pyc`-only zip layout, and the run_host.py docstring corrected to 3.15.1 (M1).
- T-2870 (Idris, P2): L1 to L3.
{% endraw %}

</div>
