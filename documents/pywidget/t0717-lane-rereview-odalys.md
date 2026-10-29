---
layout: "default"
title: "T-0717: re-review of dd36661c, 889f2e94, 2b88da84 (T-0714-T-0716), Odalys, 2026-10-29"
section: "documents"
description: "Recipes are in the private test file pywidget/tests/bridge/test_lane_t0717_odalys.py, not in this prose (Commandment 42)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0717-lane-rereview-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0717-lane-rereview-odalys.md</code></span></div><h1>T-0717: re-review of dd36661c, 889f2e94, 2b88da84 (T-0714-T-0716), Odalys, 2026-10-29</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Scope: the fixes for my T-0713 M1, M2, M3 and L2, and L1/L3 recorded as limits, in <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.py and runner.py.
I read the code diffs and the tests. I did not read the done-notes or commit bodies past their subjects.
**Author notes seen:** the baseline evidence file (t0714-evidence/test-results.txt) ends with a paragraph
from the author ("Flipped ... L1, L3: LIMIT_ ..."). I read it while looking for the baseline numbers, before
I wrote these findings. As on T-0713, I say so here.

Recipes are in the private test file `pywidget/tests/bridge/test_lane_t0717_odalys.py`, not in this prose
(Commandment 42).

## Measurements


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Measurements, scrolls sideways" style="--tw:610px" markdown="1">

| Run | Result | n |
|---|---|---|
| Host 3.9.6, whole bridge suite | OK (6 skipped, 3.12+ only) | all |
| Host 3.13, whole bridge suite | OK | all |
| test_lane_t0713_rereview on the Simulator (3.15.1, lazy imports) | 12/12 OK | 12 |
| New routes (test_lane_t0717_odalys), host 3.9 / 3.13 / Simulator | 3/3 open on each | 3 x 3 |

</div>


Evidence: pywidget/docs/reviews/t0717-evidence/ (test-results.txt and facts for each interpreter).

## Checklist

1. **M1, hooks and globals (889f2e94).** A profile function, a trace function and a stray sys.monitoring tool
   are cleared before and after the check, through functions bound when the runner is imported. The run's
   globals lose keys that are not exact str. My three T-0713 routes (M1a/b/c) are now refused and name the
   planter in `lane_tampered_before`, on host and on the Simulator. **Held for those routes.**
   The scan does not cover the *value* of `__builtins__`, or the *type* of the globals dict: see N1.
2. **M2, the grave (2b88da84).** Nothing a check takes out is freed in the extension, and past 256 entries
   every check reports `grave_full`. M2 and M2-full pass. **Held.** One consequence is listed under N2.
3. **M3 (dd36661c).** `_CFG["lane"]` is recorded as the single gate, and the fail-closed rule is placed in
   Swift (C2 1.7). Verdicts on real outcomes are "end" for all four. **Held as a design.** The Swift half is
   reviewed in T-0718.
4. **L2, records' dict held.** `records.finish` is put back and `records:finish` is reported. **Held.**
5. **L1, L3.** Both are recorded in lane.py "Not held", and their LIMIT_ tests still pass. I retried both,
   and they still work as documented. **Accepted as limits.**

## Findings

### N1 (Medium): code from the previous run still runs after the last step, through the globals' `__builtins__` value or a dict-subclass globals. Verdict: fix first (before the flag defaults on)

This is the T-0713 M1 class again, by a route next to the one that was fixed. Code that runs in `_prepare`
(the same sys.argv hook as M1a-c) can set the next run's `__builtins__` to a dict subclass. Or it can give
`__main__` a module class whose `__dict__` returns a dict subclass. `_scan_main` checks only key types, so
the subclass's `__getitem__` runs at the next run's first builtin or global lookup, after the step.
Facts (identical on 3.9, 3.13 and the Simulator): the innocent run **loads `ssl`**. Its own `lane_tampered`
names `code:_user_frame` and `code:denied`, so Swift demotes **the innocent widget**. The planter reports
`[]`, `[]` and keeps its lane.
In N1b, `_scan_main`'s own `g.items()` / `g.clear()` / `g.update()` are calls on the subclass. That is code
that runs after the step's final compare.
Reproducer: `test_OPEN_N1_builtins_value_in_the_runs_globals`, `test_OPEN_N1b_globals_dict_subclass_through_main_class`.
Fix direction (for the author to choose): in `_go`, read `g` without going through attribute lookup on
`main`. Require `type(g) is dict`, and otherwise build a fresh exact dict from its exact-str keys. Set
`g["__builtins__"]` back to the builtins module through bound dict functions as the very last operation.
Flip the two tests.

### N2 (Low): keeping the grave for the process lets one tampering run keep any amount of memory resident. Verdict: ship; consider a Swift rule change

`GRAVE_CAP` counts entries, not bytes. One planted 64 MiB object is one entry. The planter is demoted
(verdict "demote", not "end"), and the process lives on with the 64 MiB kept, against a 15 MB cold-peak
target. Its `__del__` never ran across 2 runs, a Restart and 1 more run (n=1 per interpreter, all three).
The next widget run is then the likely memory <span title="A test written in advance. If it fires, we drop the idea.">kill</span>, and T-0693 demotes the widget that was running.
Planted values that no check scans can already keep memory resident by other routes, so this is not unique to T-0715.
It does make every reported tamper <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> its memory permanently.
The cheapest mitigation is in Swift: end the extension process on any demotion, not only on rule 1 or 3.
That also limits N1 to one innocent run per process.
Reproducer: `test_OPEN_N2_grave_pins_memory_for_the_process_without_grave_full`. On the replay pass, `freed` is
checked on the host path, so that one assertion is only meaningful on host runs.

### Low notes (no line)

- The monitoring half of M1 is exercised only on 3.13 and the Simulator. 3.9 has no `sys.monitoring`
  (expected skip). This is fine; I mention it so the skip count is not read as a gap.
- The sys.argv list-subclass hook that runs code in `_prepare` is still unreported. By design it runs
  before the step, but it enables N1 and the M1 family. Note it in "Not held" if N1's fix does not
  remove it.

## Not tried (time box)

`records` functions replaced by `__code__` swap; a hook set from inside the step through an L3 route
(documented as possible in the lookups note); `_SNAP["tools"]` with a tool bootstrap had.

## <span title="The final letter, after the caps.">Overall</span> verdict

**Fix first for N1** before the extension flag defaults on. The M1-M3 and L2 fixes hold for the routes
they were made for. N2 can ship. The open LIMIT_ items stay recorded.
{% endraw %}

</div>
