---
layout: "default"
title: "T-0704: Commandment 13 review of 5d1d06ac (T-0695, the widget lane&#x27;s lazy-import record)"
section: "documents"
description: "Changes requested before TestFlight. No route lets a script get a denied import through the record. NEVER and denied names are checked before the record is read and are never written into it. Spoofed identities, a\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0704-lane-lazy-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0704-lane-lazy-review-odalys.md</code></span></div><h1>T-0704: Commandment 13 review of 5d1d06ac (T-0695, the widget <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s lazy-import record)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys (not the author; Pernille wrote the code). Date: 2026-10-29, ET.
Read: the diff of 5d1d06ac (lane.py, test_lane_lazy.py, device_replay.py), the board line, lane.py around LaneFinder,
the NEVER/denied sets and the freezer, and runner.py's reset path (`_reset`, `_import_guards`, `_never_resident`),
which is what calls the record's rebuild. Not read: the author's done-note, memory or evidence prose.

**Publication note (Commandment 42).** M1, M2 and M3 are not fixed. This file names each one at the level the fix needs
and leaves out the steps. The working attempts are in the private repository only, as pinned tests:
`pywidget/tests/bridge/test_lane_lazy_review.py` (class `OpenTests`). Each fails once its fix lands, and then its
assertion flips to the refusal. Do not quote those tests on the site or in a report until the fixes ship.

## Verdict

**Changes requested before TestFlight. No route lets a script get a denied import through the record.** NEVER and
denied names are checked before the record is read and are never written into it. Spoofed identities, a trusted
globals dict and user callbacks inside trusted frames are all refused (4 held attempts below, on host and on the
device).

The weakness is the reset that rebuilds the record. The rebuild runs inside the reset, and that reset is not
reliable: a run can control what the next run gets.

- Two Medium findings are new in this commit and cheap to fix: M1 (the rebuild uses the run's builtins) and M2 (on
  3.15 the rebuild calls into objects the run left in `sys.modules`, after the last restore).
- One Medium finding came before this commit (T-0693), and the record inherits it: M3 (user code runs after the lane's
  last restore, and the freezer's saved state can be reached from the run).

M1 and M2 should be fixed before the lane flag can be turned on. M3 needs a design decision: either detect tampering
and demote the widget, or state the guarantee honestly. The cost is acceptable: a rebuild takes 5.7 ms, and 3 of the
4 rebuilds per run can be dropped (L1).

Severity scale: the lane is a memory guard, not a sandbox (lane.py's own docstring). So the worst outcome of any
finding here is a widget that goes over the extension's memory and is killed and demoted. No data is exposed and no
other app is affected. That is why nothing is rated above Medium.

## Tests run


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Tests run, scrolls sideways" style="--tw:1152px" markdown="1">

| Where | Interpreter | Suite | Result |
|---|---|---|---|
| host | 3.9.6 | test_lane_lazy_review (new, 10 tests) | 10 OK |
| host | 3.13 | test_lane_lazy_review | 10 OK |
| host | 3.9.6 and 3.13 | test_lane, test_lane_lazy (unchanged) | OK on both |
| Simulator iPhone 17, testbed, `device_replay.py` | 3.15.1, `lazy_imports=all` | test_lane_lazy_review, recorded, run, replayed | 10 OK (3 full passes: 9, 9 and 10 scenarios) |

</div>


Device facts: `pywidget/docs/reviews/t0704-evidence/facts-device-3.15.1.jsonl`. The OPEN tests pass because they
pin today's outcome.

## Attempts


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Attempts, scrolls sideways" data-n="1" style="--tw:1325px" markdown="1">

| # | Attempt | Host 3.9/3.13 | Device 3.15.1 lazy=all | Test |
|---|---|---|---|---|
| A1 | Trusted `__name__`/`__file__`/`__spec__`/`__package__` on globals, on a user module object, and as `__import__`'s globals; `importlib.import_module`; `exec` of imports in those globals. 8 cases | 8 refused | 8 refused | `HeldTests.test_spoofed_identity_and_trusted_globals` |
| A2 | User code called back from trusted frames (Formatter `__format__`, sort key, `__hash__`/`__eq__` in a Counter) tries off-list and NEVER imports. 14 cases | 14 refused | 14 refused | `HeldTests.test_user_callback_inside_trusted_frames` |
| A3 | The record's closure cell replaced with an always-true container | in-run only (documented); next run refused | same | `HeldTests.test_record_cell_replaced_is_undone_by_reset` |
| A4 | The run installs its own lazy-imports filter | next run refused; the lane's filter is back | same | `HeldTests.test_run_filter_replaced_is_put_back` |
| A5 | Something in the run's builtins that the rebuild uses | **next run loads off-list names** (M1) | same | `OpenTests.test_OPEN_M1_*` (2) |
| A6 | An object left in `sys.modules` that the rebuild reads | refused (the host rebuild skips the loop) | **next run loads off-list and NEVER names** (M2) | `OpenTests.test_OPEN_M2_*` |
| A7 | Code that runs during the reset after the lane's last restore | **next run loads off-list and NEVER names** (M3) | same | `OpenTests.test_OPEN_M3_user_code_after_the_last_restore` |
| A8 | The freezer's saved state edited from the run | **later runs load off-list names** (M3) | same | `OpenTests.test_OPEN_M3_frozen_state_reachable` |
| A9 | Callbacks inside a trusted importer's own lazy declaration | Not reachable: the filter reads `sys._getframe(1)`, the frame running the import statement. Its names are constants in the trusted module's bytecode, so no user code runs between the declaration and the filter. A user frame that declares lazily goes to `mine`. From reading, plus the author's unit tests. | | |
| A10 | Faked `co_filename` (compile with a stdlib path) | Out of scope: lane.py already lists it as a known way past the frame check | | |

</div>


## Findings

### M1 (Medium, new): the record is rebuilt with the run's builtins

`runner.py:445` and `:453` (via `lane.py:474` and `:494`) rebuild the record before `runner.py:464` puts builtins
back. The rebuild (`lane.py:389-410`) looks up builtins by name when it runs.

- **What goes wrong:** a run that changes a builtin the rebuild uses decides what the next run's record is. The next
  run then loads off-list modules (`wave`, `csv` loaded on host and device). Those modules stay resident for every
  later run, because stdlib modules survive the purge. NEVER is still refused.
- **A second effect:** a builtin that raises when the lane calls it makes `_reset` raise before builtins are put back.
  Every later run then ends `internal_error` until the process ends (2 of 2 later runs, host and device). The run's own
  report says `never_resident: ["?"]`.
- **Before this commit:** `restore()` already called `list`/`setattr`/`delattr` at this point, so this class of bug
  existed. The rebuild adds the first piece of state that is *built* from builtins and outlives the reset.
- **Fix:**
  1. In `_reset`, put builtins back before the first `lane_restore`.
  2. In `_recorder`/`_freezer`, bind every builtin the restore and rebuild path calls (`set`, `list`, `vars`, `type`,
     `repr`, `getattr`, `isinstance`, `any`) at import time, so no run can rebind them.
  3. Wrap the rebuild so that any exception leaves the record empty (fail closed) and does not abort the reset.

### M2 (Medium, new, 3.15 only): the rebuild calls into objects the run left in `sys.modules`

`lane.py:398-402` and `:420-422`: for every value in `sys.modules`, `_trusted_module` calls `getattr(mod, "__file__")`
and then `vars(mod)`. The final rebuild runs at the end of `install_finder`'s restore, the last lane step of the reset.

- **What goes wrong:** an object that a run places in `sys.modules` and that the purge keeps gets its code run after
  every restore. It can therefore undo the restore. On the device, the next run loaded `wave`, `csv` and **`ssl`**. The
  same code also runs inside `_never_resident`'s restore, so the demotion report can be emptied the same way.
- **Before this commit:** the purge (`_keep_module`) already called `getattr` on such objects, but a restore always
  came after it. The rebuild is the first thing that calls into run objects after the last restore.
- **Host tests:** they cannot show this. The host has no `LazyImportType`, so the loop is skipped.
- **Fix:** read without calling into the object.
  1. Visit only values whose type is exactly `types.ModuleType` (captured at import).
  2. Read `__file__` by iterating the module dict's items, accepting only exact `str` keys and values. Do not use
     `getattr`, `vars()` or a `dict.get` with a key that might hash-collide.
  3. Run the rebuild once, as the very last step of the reset (see L1).

### M3 (Medium, pre-existing T-0693; the record inherits it): the cross-run <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> can be undone by the run

Two routes, both shown on host and device:

1. **The reset runs user code after the lane's last restore.** It deletes the run's builtins at `runner.py:464-468`
   and calls `gc.collect()` at `:491`, and both can run finalizers.
2. **The freezer's saved state is reachable from the run**, and so is the record's own closure. The reset then puts
   back whatever the run left there. This commit's `codes` list and `_lazy_*` names join what can be reached that way.

Each route gives the next run off-list names, and route 1 gives NEVER names too.

- **Not fixable in Python alone.** Closure cells can be reassigned and threads can outlive a run, so in-process code
  cannot make the frozen state unreachable.
- **Fix, in three parts:**
  - (a) Make the lane restore and install the last step of `_reset`, after builtins, `gc.collect()` and everything else
    that frees run objects.
  - (b) Detect instead of trusting. `restore()` already compares what it finds with what it puts back (global
    identities, each function's `__code__`, LaneFinder's dict, the record's cell types, the freezer's own containers).
    On any difference it should report `lane_tampered` in the reset reply, and the extension should demote that widget
    to the app lane, the same as `never_resident`.
  - (c) Reword lane.py's docstring ("What holds across runs"). It should say the hold covers accidental state, and
    that deliberate tampering is answered by demotion, with the memory <span title="A test written in advance. If it fires, we drop the idea.">kill</span> as the backstop.

### L1 (Low, new): four rebuilds per run; one is enough

Measured with a counter on the device and on host:

- 4 rebuilds per run: 1 in `_never_resident` at the end of the run (`runner.py:948`), then 3 in the next reset
  (`runner.py:445`, `:331`, and `install_finder`'s `_restore`).
- On the Simulator, with 100 modules resident, one rebuild takes 5.73, 5.70 and 5.74 ms (3 device passes, 20 calls each).
- So about 23 ms per run, or 0.46% of the default `budget_s = 5` (ADR-007). An iPhone has not been measured.

**Is 5.8 ms acceptable?** Yes. **Are four calls needed?** No. Only the last rebuild survives, and the first runs
before the purge, over modules that are about to be dropped.

**Fix:** rebuild once, as the last step of the reset. `_never_resident` only needs `denied`, so its restore can skip the
rebuild. That saves about 17 ms per run.

### L2 (Low, new; documented limit): the record is broad

After a run that touches every attribute of the ten allowed stdlib modules, the device record held **59 off-list names**:

- 33 are `module.attribute` entries from fromlists, which are not modules.
- Others are the runtime's own deferred imports (`_pywidget_runtime.runner`, `.device`, `.app_manifest`), `importlib`,
  `importlib.machinery`, `pkgutil`, `ast`, `traceback`, `locale`, `struct` and `warnings`.

A computed `__import__` from user code loaded the 8 recorded names that were not yet resident: `ast`,
`importlib.machinery`, `locale`, `pkgutil`, `struct`, `traceback`, `_pywidget_runtime.app_manifest` and
`_pywidget_runtime.device`. None is denied, and an eager interpreter would hold all of them resident already, so memory
matches the host. The docstring already states the by-name limit.

**Fix (optional):** do not record declarations whose importer is `_pywidget_runtime.*`, because user attribute access
never needs them. Record fromlist entries only when they name a submodule (`importlib.util.find_spec` on the parent's
path, or skip them and let a reified submodule go through its parent).

### L3 (Low, new, by reading): `mine` covers only lazy declarations

`lane.py:374-381`: the filter sees only module-level (lazy) imports. So a user's own `import x` of a recorded name is
refused at module level but passes inside a function or a `try` block, which are eager and never call the filter. The
same is true of a computed `__import__`. The save-time scan refuses the literal forms, so only computed names get here.
That is consistent with L2, but the same import behaves differently depending on its form.

**Fix:** either drop `mine` and accept by-name, as the docstring does, or say in the docstring that the scan is the
guard for literal imports.

### N1 (Nit): `device_replay.py` PW_REPLAY_MAX

`int(os.environ.get("PW_REPLAY_MAX", "0") or 0)` raises on a non-integer, and a negative value stops before the first
scenario. Clamp with `max(0, ...)` and name the variable in the error. The batching itself worked for this review
(2, then 7 scenarios).

## What the author got right

- Denied comes first, in both the finder and the filter.
- The rebuild replaces both the record and `mine` rather than editing them.
- Function bodies are now restored, which closes the `__code__` swap.
- The filter is put back on every install.
- The record holds no denied name in any device pass (L2's 59, checked against `denied()`).
- The docstring states the by-name limit and the placeholder-planting limit.
{% endraw %}

</div>
