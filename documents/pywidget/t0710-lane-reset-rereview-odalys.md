---
layout: "default"
title: "T-0710: Commandment 13 re-review of 8e9615c7 (T-0705 to T-0707, the widget lane&#x27;s reset after T-0704)"
section: "documents"
description: "Changes requested before the lane flag is turned on: 2 Medium, 3 Low. The T-0704 fixes do what they say, and my five pinned attempts are now refused on host and device. The new report raises no false alarms on ordinary\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0710-lane-reset-rereview-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0710-lane-reset-rereview-odalys.md</code></span></div><h1>T-0710: Commandment 13 re-review of 8e9615c7 (T-0705 to T-0707, the widget <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s reset after T-0704)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys (not the author; Pernille wrote the code). Date: 2026-10-29, ET.
Read: the diff of 8e9615c7 (lane.py, runner.py `_reset`/`reset`/`_prepare`/`_never_resident`, records.finish,
test_lane_reset.py, the flipped FixedTests, lane_reset_mutants.json), the board line, and my own T-0704 review. Not
read: the author's done-notes and memory. Disclosure: I opened `t0705-evidence/test-results.txt` while looking for the
replay notes, so I saw the author's evidence prose. It did not change any finding. Every finding below comes from my
own tests.

**Publication note (Commandment 42).** M1 and M2 are not fixed. This file names each one at the level the fix needs.
The working attempts are in the private repository only, as pinned tests in
`pywidget/tests/bridge/test_lane_reset_rereview.py` (OPEN_* and LIMIT_*). Each OPEN test fails once its fix lands; then
flip it to the refusal and the report.

## Verdict

**Changes requested before the lane flag is turned on: 2 Medium, 3 Low.** The T-0704 fixes do what they say, and my
five pinned attempts are now refused on host and device. The new report raises no false alarms on ordinary scripts. The
audit-hook refusal is sound and breaks nothing that exists.

Two problems remain:

- The reset still puts builtins back through a lookup the run controls (M1).
- The reset's last step can still run a run's code, and the report then blames the wrong run (M2).

Severity scale, unchanged from T-0704: the lane is a memory guard, not a sandbox. The worst outcome is a widget that
goes over the extension's memory and is killed. Nothing here is rated above Medium.

## Tests run


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Tests run, scrolls sideways" style="--tw:1115px" markdown="1">

| Where | Interpreter | Suite | Result |
|---|---|---|---|
| host | 3.9.6 | full bridge suite (with the new file) | 193 OK, 5 skipped |
| host | 3.13.18 | full bridge suite | 193 OK |
| Simulator iPhone 17, `device_replay.py` | 3.15.1, `lazy_imports=all` | test_lane_reset_rereview, test_lane_reset, test_lane_lazy_review (25 scenarios, one process each) | 28 OK, then 9 OK on a second pass of the new file |

</div>


Device facts: `pywidget/docs/reviews/t0710-evidence/facts-device-3.15.1.jsonl` (30 lines; `t0710/*` are mine, and
`t0704/*` and `t0705/*` come from re-running those suites).

## My T-0704 attempts, re-run


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: My T-0704 attempts, re-run, scrolls sideways" style="--tw:912px" markdown="1">

| # | Attempt | Host 3.9/3.13 | Device 3.15.1 lazy=all |
|---|---|---|---|
| A1, A2 | spoofed identity, trusted globals, callbacks in trusted frames (22 cases) | refused | refused |
| A3, A4 | record cell replaced, run's own lazy filter | undone at the next reset | same |
| A5 (M1 x2) | the run's builtins used by the rebuild; a raising builtin | **now refused**; later runs `ok` | same |
| A6 (M2) | an object in `sys.modules` read by the rebuild | refused | **now refused** |
| A7 (M3) | code in the reset after the last restore | **now refused, and reported** in `lane_tampered_before` | same |
| A8 (M3) | frozen state edited in place | **now refused** (tuples); MESSAGES edit reported | same |
| A9, A10 | by reading / out of scope | unchanged | |
| LIMIT | the closure cell that points at the frozen tuples, rebound | documented, pinned: off-list names load, nothing reported | same |

</div>


## Findings

### M1 (Medium; the pattern is older, but T-0705 now depends on it): the reset restores builtins through the run's own `vars`

`runner.py:442-447` (`_restore_builtins`, called at `:459` and `:480`) calls `vars(builtins)` and `list(...)`. Both are
looked up by name in the builtins dict, and the run has just had the chance to change that dict.

- **Scenario:** the run's `vars` fools that single call. Builtins never go back, so the run's builtins stay in place
  for the rest of the process. Its code then runs inside every later reset and run, after the lane's last step (for
  example `len` in `_prepare`, or `sorted` in `reset()` at `:523`).
- **Shown (host and device):** the next two runs load off-list names (`wave`, `csv`). NEVER is still refused.
  `lane_tampered` and `lane_tampered_before` are empty in all three runs. A `vars` that raises there instead makes
  every later run `internal_error`, which is T-0704 M1's second effect by another door.
- **The app lane too:** run A's added builtin is still there in run B. There it is a correctness leak between runs,
  not a memory one.
- **Fix:**
  1. At runner import, bind `builtins.__dict__` and the few builtins `_reset`/`reset` call after the lane step.
  2. Restore builtins without calling any run-made key's `__hash__`/`__eq__`: <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> `tuple(b.items())` until the next
     reset, then `b.clear()` and `b.update(snap["builtins"])`.
  3. Optional: let the lane's check compare the builtins dict with the snapshot by identity and report `builtins`.
- **Tests:** `OpenTests.test_OPEN_F1_*` (3).

### M2 (Medium, new): the last step still runs a run's code, and the report names the wrong run

`lane.py:674` → `_install` (`:708-724`) runs inside `reset_step` after the check. It reads and sets `sys` attributes by
name. A key the run plants in that module's dict gets its comparison called there. Python code therefore runs after the
check and before the rebuild.

- **Shown (host and device):** the next run loads off-list **and NEVER** names (`ssl`). That next run's own
  end-of-run check catches it (`lane_tampered: ["code:_user_frame", "code:denied"]`). The run that planted the key
  reports nothing, and the key keeps firing in every later reset. With T-0709's demotion as planned, the innocent widget
  is demoted and the culprit is not.
- **Reordering alone is not enough:** the same key also fires in `_prepare` after the step. That is the class lane.py
  documents ("the runner calls stdlib functions a run may have replaced"). Here, though, the run never replaced a
  function; it only added a key to a dict.
- **Fix:**
  1. Every check scans the dicts the runtime reads by name after the step: `sys`, `builtins`, the runner's and lane's
     globals, and `LaneFinder`'s real dict. The scan is a type test only (`_type(k) is not _str`), with no hashing and
     no comparing. It reports `sys:?` and so on. The run that plants the key is then the one reported, at its own
     end-of-run check.
  2. Make the identity check the last operation of `reset_step`: install and rebuild first, then compare.
- **Test:** `OpenTests.test_OPEN_F4_last_step_runs_a_planted_key`.

### L1 (Low): the record's contents are outside every check

`lane.py:653-664` checks only that the `record`/`mine` cells still hold a `set`. Nothing compares what is in the set.
The rebuild replaces it at the last step without looking.

- **Scenario:** names added after the last step, by any of the routes lane.py itself lists as "not held", are never
  reported, not even one run late. In the test the route is a stdlib function the runner calls.
- **Shown (host and device):** off-list names in two later runs; all reports empty. Denied names are still refused,
  because they are checked before the record.
- **Fix:** have the rebuild publish a `frozenset`, and let every check compare the record cell's identity with the last
  rebuilt one. Keep the filter's in-run additions in a separate set that the rebuild empties, and say in the docstring
  that those are in-run only.
- **Test:** `test_OPEN_F2_record_contents_never_checked`.

### L2 (Low): the docstring promises detection that the documented limits switch off

`lane.py:41-45` ends: "Such a run is caught at the next check, one run late." That is not true for the runner's
references (`runner.py:226`). Rebinding them removes every later check: NEVER names load and nothing is ever reported
(host and device). It is not true for the frozen cell either (the author's own LIMIT test says "nothing in the process
can tell"), or for L1.

- **Fix:**
  1. Reword: these routes turn the check off and nothing reports them; the memory <span title="A test written in advance. If it fires, we drop the idea.">kill</span> is the backstop.
  2. Optional hardening, cheap now that the hook exists: let `_no_audit_hooks` refuse `object.__setattr__` of
     `__code__`, `__defaults__` and `__kwdefaults__` on the lane's own functions. Code swaps then become impossible
     instead of detected. Cells stay settable.
- **Test:** `test_LIMIT_F3_runner_references_rebound`.

### L3 (Low): a non-str key in LaneFinder's dict is reported at every check and never removed

`lane.py:622-623` reports `class:?` but takes the key out only for str keys.

- **Scenario:** every later check in the process reports it again, so every later widget run in that extension
  process carries a tamper report it did not cause.
- **Fix:** rebuild the real class dict from the frozen items (hold the old items, `clear`, `update`, then one no-op
  `setattr` to invalidate the type cache), or report it once.
- **Test:** `UnitTests.test_OPEN_L1_non_str_class_key_reported_every_check_never_removed` (host, in-process).

## The focus questions

1. **Run code after the last lane step:** yes, by M1 and M2, and by the documented routes (threads, the runner's
   references, replaced stdlib functions). The finalizer route from T-0704 is closed: what a check replaces goes to
   `grave`, and the test of a cycle dying in `gc.collect` passes on the device.
2. **The frozen state beyond the LIMIT:** the tuples can't be edited in place (the A8 re-run). MESSAGES, the one dict,
   is checked by content. Beyond the pinned cell, what can still be changed is the record's contents (L1) and the
   runner's references (L2).
3. **False alarms on 3.15 lazy=all:** none. I ran 7 ordinary runs on host and device: a typical widget with allowed
   modules, a class, lambdas, strptime and zoneinfo; `raise`; `sys.exit(3)`; a syntax error; a refused import; and an
   `os.environ` write plus a `sys.meta_path` read. Each one, and a reset after them, gave `[]` and `[]`. The author's
   clean test passes on the device too.
4. **The audit-hook refusal is sound.**
   - The refusal depends only on `event == "sys.addaudithook"`, an exact str from C. CPython drops a new hook when any
     existing hook raises an Exception.
   - Both ways to change the hook (`__code__`, `__defaults__`) raise its own event, and both were refused in the
     author's test, re-run on the device.
   - It breaks nothing that exists: only lane.py adds an audit hook in `pywidget/ios` (Vendor excluded), and the app
     lane never installs it. It would also refuse a C-level `PySys_AddAuditHook` added later in the extension.
   - Cost: 114 to 140 ns per audited event (host 3.13 and 3.9, `sys._getframe` loop, 200,000 calls, best of 5).
     LaneFinder calls `_getframe` once per find, so the cost is negligible. Not measured on the device.
5. **The rebuild reads "as text":**
   - It visits values whose type is exactly ModuleType and reads `mod.__dict__` (a C getset) as items.
   - `__file__` is used only as an exact str under an exact-str key, and paths are compared as text.
   - `repr` is called only on exact `LazyImportType` objects. On the device a run can't create one: four constructor
     forms all raise `TypeError: cannot create 'lazy_import' instances`. So the name in the repr is always the
     interpreter's own str.
   - The one lookup by name is `LaneFinder.trusted`, which can reach a planted class-dict key. That key is reported
     (L3), so I don't count it as a separate finding.
6. **My five pinned tests:** all five now give the safe outcome on host and device (table above).

## What the author got right

- Builtins bound in lane.py at import, and a rebuild that fails closed.
- Identity comparison against tuples, and `grave` holding what a check replaces so that no finalizer runs after the step.
- `gc.callbacks` put back through the collector's own list.
- A clean-run test, and a mutant for each layer (14 of 14 killed).
- One rebuild per reset, down from four.
- The docstring now states what is not held. L2 asks only that it stop promising detection for those routes.
{% endraw %}

</div>
