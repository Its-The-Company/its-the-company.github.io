---
layout: "default"
title: "T-0734: re-review of 829a3f91 (T-0732), last round of the lane hardening class"
section: "documents"
description: "Each runs from a planter that left a hook (an A(list) as sys.argv) firing in the next run&#x27;s _prepare, which reads sys._getframe(2).f_globals: the runner&#x27;s globals. Host 3.13 and device 3.15.1 gave the same facts."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0732-lane-rereview-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0732-lane-rereview-odalys.md</code></span></div><h1>T-0734: re-review of 829a3f91 (T-0732), last round of the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> hardening class</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys. 2026-10-29. Scope set by ADR-007's T-0733 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line, item 4: (i) no false
alarm or regression, host and Simulator; (ii) classify the named residuals against item 3, do
not fix; (iii) re-rank any Medium that needs deliberate reach to "Not held".

Evidence: `t0734-evidence/test-results.txt`, `t0734-evidence/facts-device-3.15.1.jsonl`.
Probes: `pywidget/tests/bridge/test_lane_t0734_odalys.py` (6 tests; they pin today's behaviour,
none of them asks for a change).

## Verdict

1. (i) **No false alarm, no regression.** Host 3.9.6 and 3.13.18: 2188 tests, 0 failed suites
   (N=1 per interpreter; T-0732's 2176 plus my 6 per interpreter). Simulator iPhone 17, bundled
   3.15.1, `lazy_imports=all`: 28 scenarios (t0713 re-review including CleanTests, t0721,
   t0727, t0731, t0734), one testbed process each through tools/xc.sh, replay OK (N=1). This
   is the replay T-0732 owed. T-0732's flipped P1 and P2 <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> on the device.
2. (ii) **Every residual needs deliberate reach** (a frame walk into `_prepare` and a rebound
   runner name or `_S` value, both listed in item 2c). None is an ordinary-script route. None
   breaks 2a, 2b or 2d. All are **Not held**.
3. (iii) No Medium survives the re-rank. **No new board line.** T-0735 (Pernille) takes the
   bullets below.

## Residuals, classified (for T-0735's "Not held" bullets)

Each runs from a planter that left a hook (an `A(list)` as `sys.argv`) firing in the next run's
`_prepare`, which reads `sys._getframe(2).f_globals`: the runner's globals. Host 3.13 and device
3.15.1 gave the same facts.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Residuals, classified (for T-0735&#x27;s &quot;Not held&quot; bullets), scrolls sideways" data-n="1" style="--tw:1325px" markdown="1">

| # | Route | Observed effect (runs a plants, b next, then c, d) | Item 3 class | Backstop |
|---|---|---|---|---|
| R1 | Rebind `_hooks_off` | The fake runs once at the top of b's `_go`, before the check. The check right after puts it and the lane back: b's probe is refused, b's `lane_tampered_before` = `code:_user_frame, code:denied, runner:_hooks_off`, so **a** is demoted. c and d are clean. | Not held: planter code runs once in the next run, before its check. Blame is right. | The check right after it, then demotion of the planter. |
| R2 | Rebind `_LANE_CHECK` (its first call rebinds `_main_dict`, as T-0731 P2 did) | g is the planter's dict subclass again. Its trap runs UNDO inside b's own code: b loads wave, csv and ssl (NEVER). b's own `lane_tampered` = `code:_user_frame, code:denied` (**b wrongly blamed**). Its `lane_tampered_before` = `runner:_LANE_CHECK, runner:_main_dict` (a blamed too). The step's final check (reset_step) puts the lane back for c and d, but d still gets wave and csv from sys.modules, reported nowhere (by design `_keep_module` keeps stdlib modules and purges only NEVER ones). | Not held: wrong blame among the person's own widgets, plus off-list imports (memory only). | Demotion of both a and b. The NEVER module is purged at the next reset. The memory <span title="A test written in advance. If it fires, we drop the idea.">kill</span> covers what stays resident. |
| R2b | Rebind `_LANE_CHECK` and `_last_step` together | No call reaches `_LANE_STEP`, so no check runs again in that process. b and d load wave, csv and ssl. Every report is empty and every verdict is ok. a is never named. Same effect as the existing bullet for `_LANE_CHECK` + `_LANE_STEP`, reached through `_last_step` instead. That bullet's "one alone is put back by the other" is not true when the caller of `_LANE_STEP` is rebound. | Not held: the lane's checks are off for the rest of that process, and off-list imports load (memory only). | **Memory kill only.** Nothing reports it, and the report keys are present and empty, so Swift's fail-closed rule (2b) does not fire. |
| R3a | Write a forged name into `_S["lane_tampered_before"]` after the reset | b's `lane_tampered_before` = `runner:forged`. C2 1.7 charges that slot to the previous widget run, which is the planter here. | Not held. Blame lands on the planter when the hook fires in the very next run. A delayed hook moves it to another of the person's widgets: the existing "resident code" bullet. | Demotion. |
| R3b | Overwrite it with `[]` or a list with no str (non-str entries are dropped) | What the reset's check put back is no longer named. The write itself goes unseen: `_S` is scanned for non-str keys only. The lane was still put back. The probe found nothing for the reset to catch, so this pins the route, not a loss. | Not held: a missed blame (wrong blame among own widgets). The state is safe. | The reset's check already restored the state. The memory kill. |
| R3c | Delete it, or write a non-list | Named `?`, so the planter is demoted. Fails closed. | Held. Nothing to list. | n/a |

</div>


For R2b, the T-0735 bullet should **widen the existing `_LANE_CHECK` + `_LANE_STEP` bullet**:
rebinding `_LANE_CHECK` together with any runner name on the path to `_LANE_STEP`
(`_last_step`, or a fake `_hooks_off` that rebinds both) turns every later check off. It
should not add a separate entry.

## For Ines (no action asked of me)

- R2b and the existing bullet rely on the memory kill alone, with no demotion, because the keys
  arrive present and empty. Item 3 allows "checks turned off for the rest of that process"
  when it ends at the memory kill, so I classify it Not held. If "fail-open with no backstop"
  was meant to exclude a silent lane-off whose only bound is memory, this is the one row to
  re-read. Reaching it still takes a frame walk plus two rebinds.
- Off-list stdlib modules that a lane-off run loads stay resident for later runs (R2, d). This
  follows from `_keep_module` and is memory only. It is worth one clause in the R2 bullet.

## What I did not do

No fix. I probed only the named residuals, not further descriptors (item 4: the bar is item 3).
The 3.13 "1 in 3" bridge failure from T-0731 did not recur in this one host run (N=1).
{% endraw %}

</div>
