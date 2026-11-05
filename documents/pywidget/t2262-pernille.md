---
layout: "default"
title: "T-2262: runtime read of EditorTooling.swift (06c77dbdc) for T-0656"
section: "documents"
description: "The first thing that breaks is not the Swift. It is jedi itself: with InterpreterEnvironment it rebinds the process-wide sys.path while it imports a compiled module, on the editor thread, beside a live script (H1)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2262-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2262-pernille.md</code></span></div><h1>T-2262: runtime read of EditorTooling.swift (06c77dbdc) for T-0656</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Read: `pywidget/ios/App/Editor/EditorTooling.swift` and its call site
`ConsoleEditor.swift:117-133`, against `pywidget/python/pywidget_tooling/editor.py` (the contract) and the runtime
it shares an interpreter with: `Shared/Bridge/pwbridge.c`, `Shared/Bridge/PyBridge.swift`,
`App/Runtime/_pywidget_runtime/runner.py`, `lane.py`, and the bundled jedi 0.19.2 / pyflakes 3.4.0 in
`app_packages`. No Xcode (lock held). Two host checks on CPython 3.13.18, scripts in
`/Volumes/Company SSD/company-scratch/T-2262-pernille/` (`mon.py`, `swap.py`); outputs quoted below.

The first thing that breaks is not the Swift. It is jedi itself: with `InterpreterEnvironment` it rebinds the
process-wide `sys.path` while it imports a compiled module, on the editor thread, beside a live script (H1).

## Answers to the line's questions

**1. Does runner reset or `pw_rt_hard_stop` invalidate the cached module objects?** No.
- Reset (`runner.py:768-833`) never finalizes the interpreter and keeps every module whose file is under the bundle
  root or the stdlib (`_keep_module`, `runner.py:568-584`). `pywidget_tooling` is in `Runtime/` (project.yml:248) and
  jedi, parso and pyflakes are in `app_packages/`, so none of them is popped.
- Even if one were popped, `EditorTooling.call` (`EditorTooling.swift:229-230`) holds a strong reference to `_call`,
  whose `__globals__` holds `_editor` and `_json`; popping from `sys.modules` does not clear a module's dict. The
  `OverBudget` and `Cancelled` classes it caches are the ones `editor.py` raises from, so the identity stays right.
- `pw_rt_hard_stop` (`pwbridge.c:739-749`) only arms a `sys.monitoring` tool (`runner.py:856-888`); the next reset
  frees it (`_release_hard_stop`, `runner.py:891-900`). Nothing cached is touched. Its side effect on the editor
  thread is M3.
- Restart keeps the interpreter (bridge contract s6), so no path re-creates objects under the cache.

**2. Does any per-run hook change what jedi and pyflakes see while a script runs?** Yes, in both directions.
- Audit hook: none in the app <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>. `lane.py:1078` installs `_no_audit_hooks` only in the widget extension, where
  the editor does not run. No effect.
- `sys.path` and cwd: jedi reads the live list (`InterpreterEnvironment.get_sys_path` returns `sys.path`,
  jedi/api/environment.py:151) and, with no `path` in the request, roots its project at `Path.cwd()`
  (jedi/api/project.py:403). During a run, `sys.path[0]` and the cwd are the script's folder
  (`runner.py:1180-1199`) plus whatever the script appended; between runs they are the bootstrap snapshot. So the
  same text completes differently with a run live (M1).
- `app_packages` placement: the runtime makes bundled and stdlib names win through the `_BundledFirst` meta-path
  finder (`runner.py:364-472`). jedi's module search calls `PathFinder.find_spec` on its own `sys_path` and never
  sees meta_path, so during a run a user `json.py` or `requests.py` in the script folder shadows for jedi but not
  for the real import (M1).
- `sys.modules` reset: no effect on jedi's view (its caches are its own), but the editor writes into it (H1).
- Other interpreter-wide state a script can change mid-run and jedi/pyflakes then inherit: `warnings.filters`
  (a script's `simplefilter("error")` turns jedi's `UserWarning` in `access.load_module` into an exception, answer
  "error"), `sys.setrecursionlimit`, user `sys.monitoring` tools (their callbacks run on the editor thread), and
  monkeypatched stdlib or builtins (user code then runs on the editor thread). All Low; reset puts each back.

**3. Is warm() at launch acceptable beside the first Run?** Not as wired, and not at launch either.
- It is not at launch: `start()` is called only from `scheduleDiagnostics` (`ConsoleEditor.swift:128`), so warm()
  runs after the first 0.8 s typing pause, and the first diagnostics waits behind it (M4).
- warm() is seconds of pure-Python CPU (jedi is 10,412 KB on disk in the bundle, compiled from source on every
  launch since `write_bytecode = 0`). Beside a live run it takes about half the GIL at the 5 ms switch interval,
  and it is the call most likely to hit H1 and M2. Acceptable only when no run is live: gate warm() and prime() on
  `PyBridge.shared.activeRunInC == 0 && !PyBridge.shared.stuck` (both lock-free, `PyBridge.swift:469,693`) and
  requeue them otherwise. No new bridge entry point is needed for that.

**4. GIL and deadlock with stop and stuck.** No lock-order deadlock: every path takes the GIL before `cond`
(`perform` :175/:190, `raise` :157/:159), and nothing holds `cond` while waiting for the GIL. The risks are waits
without a bound (M2) and stop latency (M3).

## Findings

### High

**H1. jedi swaps the global `sys.path` and imports extension modules on the editor thread, beside the script.**
`editor.py:183-188` uses `jedi.InterpreterEnvironment()`; jedi then loads builtin and extension modules with
`access.load_module` (jedi/inference/compiled/access.py:117-137): `temp, sys.path = sys.path, sys_path;
__import__(name); finally: sys.path = temp`. `builtins_module` does it with `sys_path=[]` on every Script
(jedi/inference/__init__.py:129). While importlib's bytecode runs, the GIL switches, and the script thread sees a
different list, sometimes `[]`.
Measured (`swap.py`, CPython 3.13.18, bundled jedi 0.19.2): completing `import _bz2\n_bz2.` and 12 more extension
modules on one thread put all 13 in `sys.modules` (their init ran on that thread), and a polling "script" thread saw
a different `sys.path` object 472,193 times. Consequences, derived from the code:
- a script's `import x` in that window resolves against jedi's list, or fails with ModuleNotFoundError on `[]`;
- a script's `sys.path.insert(...)` in that window goes into jedi's list and is lost when jedi restores;
- a reset that lands in the window writes the snapshot into jedi's list (`runner.py:793`) and jedi then restores
  the run's list, so the next run starts with the previous run's folder still on `sys.path`, which is what reset
  exists to prevent;
- the `warnings.warn(... sys_path ...)` on a failed import prints jedi's whole path into the user's console (L1).
Fix (editor.py, host half): replace `jedi.inference.compiled.access.load_module` once, at warm(), with a version
that never assigns `sys.path`: return `sys.modules[name]` when loaded, import builtins with
`importlib.import_module`, and refuse (return None) any other not-yet-loaded extension module. Add a host test that
runs completions on one thread and asserts `sys.path` identity on another. Until it lands, gate jedi calls on
`activeRunInC == 0` in Swift and answer the fallback during a run.

### Medium

**M1. jedi's import view depends on whether a run is live.** No `path` is sent (`EditorTooling.swift:96`), so
jedi uses the live `sys.path` and cwd (answer 2). A sibling module of the edited file completes only while a run of
that folder is live, and a user file can shadow a bundled name for jedi only. Fix: Swift sends `path` (the
document's file URL, when it has one); editor.py builds `jedi.Project(path=,
sys_path=<snapshot order: stdlib, app_packages, then script folder>, smart_sys_path=False)` from a copy taken at
warm(), never from the live list.

**M2. A stuck script <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parks</span> the editor and the watchdog forever, and diagnostics jobs pile up.** When the script is
stuck in C with the GIL (the "quit and reopen" case), `perform` blocks in `PyGILState_Ensure`
(`EditorTooling.swift:175`) and `raise` blocks the serial `watchdogQueue` (:157). Each later typing pause queues
another diagnostics job (:113-115; only completions are coalesced, :125-132), each holding a full copy of the text,
and its continuation never resumes. The same pile-up happens without a stuck script: the diagnostics budget is
1,000 ms plus up to 94 ms of watchdog lateness (T-1143), and the typing pause is 800 ms, so bursts queue answers
that `ConsoleEditor` then throws away by version. Fix: coalesce queued, not-started diagnostics the way completions
are (answer the old one nil), and skip `submit` while `PyBridge.shared.stuck`.

**M3. Stop latency: a hard stop arms global monitoring events that fire on the editor thread.** `sys.monitoring`
events are process-wide. Measured (`mon.py`): a LINE tool enabled on the main thread fired 44 times on a second
thread in 0.2 s. While `hard_stop` is armed (`runner.py:868-886`), every new jedi or parso line location runs the
callback on the editor thread (`_is_user` does a realpath per new file, then DISABLE), holding the GIL the script
needs to unwind inside its 2.0 s window; a stop can then cross the stuck line and show "quit and reopen" for a run
that was ending. Fix: do not start editor calls while a stop is in progress (gate on `activeRunInC` as in answer
3), and send the running call `Cancelled` when Stop is pressed.

**M4. Keystrokes and the first lint wait seconds behind warm().** The worker is serial and warm() is queued first
with no budget (`EditorTooling.swift:86`), so the contract's "cold" fallback never happens: a completion or
diagnostics call sits in the queue until warm() returns, then jedi is warm. Latent for completion (not wired in
slice 1), real for the first lint. Fix: while `!isWarm`, `complete()` answers "cold" from Swift without queueing
(or warm() is split so a keystroke can run between its steps); start warm() at launch once the bridge is up and no
run is live, not on the first lint. Also `warmDone` is set when warm() returned False (:86-89), so `isWarm` is true
when jedi is missing; carry the result.

**M5. The editor's `catch_warnings` wipes filters a script sets meanwhile.** `editor.py:401-404` wraps `compile()`
in `warnings.catch_warnings()`, which saves and restores the global `warnings.filters` (3.13 has no per-thread
warnings context). Measured (`mon.py`): a filter the "script" thread added while the other thread was inside
`catch_warnings` was gone afterwards (2 filters, then 0). The editor's "ignore" also applies to the script's own
warnings while it is inside. Fix: do not use `catch_warnings` off the script thread; add a single
`("ignore", SyntaxWarning, module="<editor>")` filter if it is absent (compile warnings take the filename as the
module) and leave it, accepting that reset removes it and the next call puts it back.

### Low

**L1. Editor output lands in the running script's console.** The runtime's streams stamp each write with the run
live at that moment (`pwbridge.c:347-351, 374`). From the editor thread: "Exception ignored ... OverBudget" when a
watchdog raise is swallowed in a finalizer (the contract says this happens), jedi's import warnings (H1),
`PyErr_Print()` in `prepare()` on every job while the glue fails (`EditorTooling.swift:223`), and SyntaxWarnings if
M5's filter is dropped. They count against the run's output <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span>. Fix: `prepare()` reports once and caches the
failure; editor.py installs, at warm(), an `unraisablehook` wrapper that drops `OverBudget`/`Cancelled` and
delegates the rest. Runtime gap I own, separately: `sys.unraisablehook` is not in the reset snapshot
(`runner.py:250-272`), so a script that replaces it keeps it for later runs.

**L2. User code can run on the editor thread.** A script that monkeypatches a stdlib function jedi calls, or adds
a `sys.monitoring` tool, runs its code on the editor thread outside the run's stop machinery; under an armed hard
stop, a user-file frame there raises KeyboardInterrupt (`runner.py:875-878`), which escapes `editor.complete`'s
handlers (BaseException) and comes back as `invoke` nil. Handled, but `complete` then breaks "never raises".
Gating jedi on no live run (H1) closes most of it.

**L3. Contract drift.** `editor.py:90-91` says warm() imports pyflakes; it does not (`editor.py:191-204`), so the
first diagnostics pays the pyflakes import. Either import `pyflakes.api` in warm() or fix the docstring.

## What is right

- Thread state: `PyGILState_Ensure`/`Release` on a thread with no state creates and destroys a fresh `PyThreadState`
  per call, so a late async exception dies with it and cannot land in the next call; rule 2 (:194) is then
  belt and braces, which is fine.
- Targeting: `PyThread_get_thread_ident()` is the editor's own ident, and `raise` re-checks `running` under the GIL
  (:159), so a Cancelled or OverBudget cannot reach the script thread, and the soft stop's KeyboardInterrupt goes to
  Python's main thread, which is the script thread (`pw_rt_start` runs `Py_InitializeFromConfig` there).
- Latest-wins by id for completions (:100), prime queued behind keystrokes (:133-136), 8 MB worker stack (:82).

## Out of scope, for the size budget

jedi in `app_packages` is 10,412 KB on disk, most of it typeshed; parso 756 KB, pyflakes 332 KB. That is mine to
budget on the packaging side, not this review's.
{% endraw %}

</div>
