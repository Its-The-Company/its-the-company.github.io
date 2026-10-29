---
layout: "default"
title: "T-0713: Commandment 13 re-review of 9bb407d7 (T-0711/T-0712, the widget lane after T-0710)"
section: "documents"
description: "Fix first: 3 Medium, 3 Low. Fix these before the lane flag defaults on and before T-0709&#x27;s demotion relies on the reports."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0713-lane-rereview-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0713-lane-rereview-odalys.md</code></span></div><h1>T-0713: Commandment 13 re-review of 9bb407d7 (T-0711/T-0712, the widget <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> after T-0710)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys (not the author; Pernille wrote the code). Date: 2026-10-29, ET.
Read: lane.py and runner.py at 9bb407d7, records.finish, the existing lane tests, my own T-0710 review, the board line.
Not read: the author's done-notes, memory and review replies. Disclosure: the evidence baseline the board line names
(`t0711-evidence/test-results.txt`) ends with a "notes for the re-review" section in the author's words. I read it
because it is the baseline. Every finding below comes from my own tests.

**Publication note (Commandment 42).** This file names each problem at the level its fix needs. The working attempts
are in the private repository only, as pinned tests in `pywidget/tests/bridge/test_lane_t0713_rereview.py`. Each OPEN
test asserts today's behaviour, so it fails once the fix lands; then flip it to the refusal and the report.

## Verdict

**Fix first: 3 Medium, 3 Low.** Fix these before the lane flag defaults on and before T-0709's demotion relies on the
reports.

What the fixes got right:

- Builtins go back through names bound at import (T-0710 M1 is closed).
- Non-str keys in sys, builtins, `runner._S`, the held dicts and `LaneFinder` are taken out and reported by the run
  that planted them.
- The record is checked by identity.
- `LaneFinder`'s dict reports a bad key once.
- No false alarms on host 3.9 and 3.13, or on the Simulator's 3.15.1 with lazy imports on.

What is still open:

- The step's central claim does not <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>. The last step is not the last thing before the run's code: three channels
  run a run's code after it (M1).
- The lane's own `grave` makes every later run report tampering it did not do (M2).
- One value the hold covers switches every check off, because the checks are gated on it (M3).

Severity scale, unchanged from T-0704 and T-0710: the lane is a memory guard, not a sandbox. The worst outcome is a
widget over the extension's memory, killed. With T-0709 as planned, a second outcome counts too: an innocent widget is
demoted to the app lane. Nothing here is above Medium.

## Tests run


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Tests run, scrolls sideways" style="--tw:1071px" markdown="1">

| What | Where | n | Result |
|---|---|---|---|
| Baseline, every host suite (`run_host.py --both`) | host 3.9.6, 3.13.18 | 1063 tests each | OK; matches the t0711 baseline |
| My tests (`test_lane_t0713_rereview.py`) | host 3.9.6 | 10 tests (1 skipped: 3.12+ only) | OK |
| The same | host 3.13.18 | 10 tests | OK |
| The same, through `device_replay.py` | Simulator, 3.15.1, `lazy_imports=all` | 10 scenarios | OK, no skips |
| Bridge suite with my file | both hosts | 205 tests | OK |

</div>


Evidence: `pywidget/docs/reviews/t0713-evidence/` (`test-results.txt`, `facts-device-3.15.1.jsonl`,
`facts-host-3.13.jsonl`).

## False alarms (3.15.1, lazy imports = all)

**None found.** `CleanTests.test_ordinary_scripts_and_restart_report_nothing` runs T-0710's six ordinary scripts, an
empty script, a Restart and two more runs. That is 9 runs and 1 reply, all with empty `lane_tampered` and
`lane_tampered_before`, on device and both hosts.

Every OPEN test also asserts its exact report lists. Across 10 device scenarios, no spurious name appeared.

## "Lookups after a run", line by line (lane.py:46-66)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: &quot;Lookups after a run&quot;, line by line (lane.py:46-66), scrolls sideways" style="--tw:916px" markdown="1">

| Docstring line | Against the code | Holds? |
|---|---|---|
| end-of-run check: `_LANE_CHECK, _builtins_back, _S, lane, _SNAP` | These names are right. Missing: `lane.never_resident` is an attribute lookup through `type(lane)`, which nothing holds. Inside it, `n not in keep` hashes every `sys.modules` key, and nothing scans those keys. The check is also reached only through `records.finish`, which is not held (L2). It runs only if `_CFG["lane"] == "widget"` (M3). | Partly (L2, L3, M3) |
| the check: closure names only; sys and builtins read by iteration | Confirmed. `compare` touches nothing a run controls before it has scanned or put it back. | Yes |
| builtins back: `_SNAP["builtins"]`, `_BUILTINS`, `_tuple`, `_len`, `_GRAVE` | Confirmed, and tried (HeldTests): rebinding `runner._len`, shortening `_SNAP["builtins"]`, or swapping `runner._go`'s code is put back by the run's own check before builtins go back. All are reported by that run. | Yes |
| reset_step: `_get_filter`, `_set_filter`, sys's dict by name, `_install`, ... | `sys.dont_write_bytecode = ...` and `sys.meta_path` go through `type(sys)`, which nothing holds. Code runs there, but before the final compare, so the lane is put back and the change is reported. The class persists, so it fires in every later step (L3). | Yes for the step; L3 for attribution |
| after the step: `_go` uses `_BEFORE`, `_exec`, `code`, `g`; "Nothing else runs before the run's code" | Not true. `exec` reads `g` by name. A profile or trace function sees the call to `exec`. A `sys.monitoring` CALL callback sees it too. | **No (M1)** |
| before the step: may run a run's code; the step puts the lane back and reports it | True only if the step comes last (M1) and the reports reach the outcome (L2, M3). | Partly |

</div>


"Not held" list: the first bullet ("the references through which the runner calls the check") is missing two
routes. `_CFG["lane"]` is the gate on every call (M3). `records.finish` is the caller of the end-of-run check (L2).

## Findings

### M1 (Medium): the last step is not the last thing before the run's code

`runner.py:1036-1040` (`_go`). After `_last_step()`, three channels still run code that an earlier run left behind:

1. **A profile or trace function** (all versions). It fires on the `c_call` of `_exec`. The reset clears these, but
   anything that runs between the reset and the step can set one again.
2. **A `sys.monitoring` callback** (3.12+; the device runs 3.15.1). It fires on the CALL of `_exec`.
   `_free_user_tools` runs in the reset, before the step.
3. **A key in the run's own `__main__` dict** (`g`). `exec` looks up `__builtins__` in `g`. A key with the same hash
   gets its `__eq__` called, and `g` is never scanned.

The hook that arms all three needs no replaced function: a run leaves a list subclass in `sys.argv`. Sys's dict is
scanned for keys only, and `_prepare` writes to `sys.argv` after `main` exists.

- **Shown (host 3.9/3.13 and device; the monitoring channel on 3.13 and device):**
  - The next run loads off-list **and NEVER** names (`ssl`).
  - Its `lane_tampered_before` is `[]`.
  - Its own `lane_tampered` is `[code:_user_frame, code:denied]` and its `never_resident` is `[_ssl, ssl]`.
  - The planting run reports nothing.

  This is the outcome T-0710 M2 asked to end: under T-0709 the innocent widget is demoted and the culprit is not.
- **Fix:**
  1. At the start of `_last_step`, before its first check, clear the profile and trace functions with `sys`
     functions bound at import, and free every monitoring tool not in `_SNAP["tools"]`. Optional: have
     `_no_audit_hooks` refuse the `sys.setprofile` and `sys.settrace` audit events in the extension.
  2. Pass `g` to the step and scan it like `runner._S`: a type test only, non-str keys taken out and reported.
  3. Correct the docstring's "after the step" line.
- **Tests:** `OpenTests.test_OPEN_M1a_profile_function_runs_after_the_last_step`, `..._M1b_key_in_the_runs_globals_...`,
  `..._M1c_monitoring_callback_...`.

### M2 (Medium): the grave's finalizers are reported as the current run's own tampering

`lane.py:818-822` (`restore`). A non-final check empties `grave` **before** it compares. Whatever the freed objects'
finalizers change is then found by that same check. At the end-of-run check, that report is the current run's own
`lane_tampered`.

A run leaves one object with a `__del__` that plants another. From then on every check catches a new object, and the
next check frees it. The runner's `_GRAVE` (`runner.py:516`) has the same pattern, but it is freed only at the reset,
so it lands in `before`.

- **Shown (host and device):** three later runs of an empty script each report `global:t0713_e` in their own
  `lane_tampered` and in `lane_tampered_before`. Under T-0709, every later widget in that extension process is demoted.
  This is worse than T-0710 L3: that was one report per check; this one never stops.
- **Fix:** in the extension, never free what a check takes out. Keep `grave` (and `_GRAVE`) for the life of the
  process. Only tampering runs fill it, and the process ends when the demotion or the memory <span title="A test written in advance. If it fires, we drop the idea.">kill</span> ends it. A finalizer
  that never runs cannot re-plant. If memory matters, <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> it and report `grave_full`, so Swift ends the process.
  Correct the docstring sentence about `grave` to match.
- **Test:** `OpenTests.test_OPEN_M2_grave_finalizer_blames_every_later_run`.

### M3 (Medium): one value switches every check off

`runner.py:515`, `:1036`, `:1019-1020`. The reset's checks, the last step, the end-of-run check and the report keys
are all gated on `_CFG["lane"] == "widget"`. `_CFG` is held, but the hold can only put it back from inside a check,
and that gate skips every check.

- **Shown (host and device):** a run sets the value to `"app"` and turns the lane's functions off. The next run loads
  `ssl`. After a Restart `ssl` is still resident, because the NEVER purge in `_keep_module` is gated the same way.
  From then on, no outcome has `lane_tampered`, `lane_tampered_before` or `never_resident`, and the Restart reply has
  no `lane_tampered`.

  This is the effect of LIMIT_F3 (both check references rebound), reached through one dict value the docstring says
  is held, and it is not in "Not held".
- **Fix:**
  1. Swift (T-0709 or a sibling line): in the extension, treat an outcome or reset reply with any lane key missing as
     tampered. Demote, and end the process.
  2. Python: add the gate to "Not held", bullet 1.

  No Python value is out of a run's reach, so the fail-closed check belongs on the Swift side.
- **Test:** `OpenTests.test_OPEN_M3_one_cfg_value_turns_every_check_off`.

### L1 (Low): the record's identity check compares two cells a run can reach

`lane.py:777-799`. `record` is compared with `pub`, and `pub` is only type-checked. A run that rebinds both to the
same frozenset passes.

- **Shown:** `wave` and `csv` load in that run, with nothing reported. They stay in `sys.modules`, so the next run
  gets them too, also unreported. The capability is the same as the documented "calls PathFinder.find_spec itself"
  limit, but the T-0712 L1 claim reads as closed.
- **Fix:** say so in the docstring: both cells are reachable, and rebinding both is in-run only, like `added`. Any
  further cell would be just as reachable.
- **Test:** `OpenTests.test_OPEN_L1_pub_and_record_rebound_together`.

### L2 (Low): `records.finish` is the caller of the end-of-run check, and nothing holds it

`runner.py:1013-1020`. Replacing `records.finish` once (one assignment in a resident runtime module) lets the run
drop `never_resident` and `lane_tampered` for itself and every later run. The last step still puts the lane back
before each run's code, but nothing is ever reported.

- **Shown:** the next run loads `ssl`; `never_resident` is `[]` and both reports are empty.
- **Fix:** hold `records.__dict__` (and its functions' code) with `lane.hold`, as the runner's globals are held. The
  next reset's check then puts it back and reports it in `lane_tampered_before`, which names the planter. Until then,
  list it in "Not held", bullet 1.
- **Test:** `OpenTests.test_OPEN_L2_records_finish_replaced_turns_reports_off`.

### L3 (Low): unscanned resident state keeps firing, and each later report names an innocent run

Three plants, none of them a replaced function:

- a `str`-subclass key in `sys.modules` (the purge keeps it);
- a `ModuleType` subclass assigned to the lane module's `__class__` (fires in `_never_resident` after the check);
- a `ModuleType` subclass assigned to `sys.__class__` (fires inside the step, before its final compare).

- **Shown:** the planter reports nothing. Every later run's `lane_tampered_before` carries all three, so from the
  second run on it names an innocent predecessor. "Not held" bullet 2 describes the effect ("not always the
  planter") but lists only replaced functions, classes, finders and threads.
- **Fix:** every check scans `sys.modules`' keys (type test only, as `scan` does). It also puts `ModuleType` back as
  the class of `sys`, `builtins`, `lane` and `runner`, by identity and without calling into the run's class. Or list
  these routes in bullet 2.
- **Test:** `OpenTests.test_OPEN_L3_unscanned_resident_state_fires_every_later_reset`.

## Board lines added

- T-0714 (Pernille): M1, clear profile, trace and monitoring hooks in the step and scan `g`.
- T-0715 (Pernille): M2, keep the grave for the life of the process.
- T-0716 (Pernille, with a Swift note for Idris's T-0709): M3, fail closed when the lane keys are missing.

The Lows go to Pernille's discretion inside those lines, or onto a later docstring pass.
{% endraw %}

</div>
