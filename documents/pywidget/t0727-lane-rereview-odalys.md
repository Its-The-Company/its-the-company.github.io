---
layout: "default"
title: "T-0727: re-review of 79b6fcd5 (T-0721, runner._go rebuilds the run&#x27;s __main__ dict)"
section: "documents"
description: "Changes needed before the flag defaults on. N1, N1c and the deleted-builtins case are closed and cause no false alarms. K1 reopens N1b&#x27;s family with one more descriptor; it is a two-line fix. One line added for Pernille\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0727-lane-rereview-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0727-lane-rereview-odalys.md</code></span></div><h1>T-0727: re-review of 79b6fcd5 (T-0721, runner._go rebuilds the run's __main__ dict)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys, 2026-10-29. Independent of the author. Order: code diff (runner.py, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.py),
then the tests (test_lane_t0721.py, the flipped N1/N1b in test_lane_t0717_odalys.py, the T-0713
harness), then my attempts. I read the author's notes (t0721-evidence/test-results.txt) only
after the findings below were reproduced; I used it for nothing but the device_replay command.

Reproducers: `pywidget/tests/bridge/test_lane_t0727_odalys.py` (OPEN_ tests pin today's
behaviour; flip them when the fix lands). Evidence: `t0727-evidence/test-results.txt`,
`t0727-evidence/facts-device-3.15.1.jsonl`.

## What the fix gets right (checked)

1. g is read through `ModuleType.__dict__["__dict__"].__get__`: no lookup on main's class, always
   the module's exact dict. N1b's `__dict__` property is never used for the run. Pinned (N1b).
2. After `_last_step(g)`, g is cleared and rebuilt from `_MAIN_FRESH` (+ `__file__` when an exact
   str), `__builtins__` set last through `dict.__setitem__`. Keys are exact str after the scan, so
   `_dict_get`, `k == ...` and `_main_is` run no run's code. N1, N1c (`print`), deleted
   `__builtins__`: refused and named. Pinned.
3. Replaced values: the old items tuple and the planted class go to `_GRAVE`; when nothing was
   replaced, the cleared values are the same str/None objects, so no `__del__` can run.
4. No false alarms: bridge suite 216 tests OK on host 3.9.6 (6 skipped) and 3.13.18; Simulator
   iPhone 17, bundled 3.15.1, `lazy_imports=all`, replay of test_lane_t0721 + test_lane_t0727
   (6 tests) OK through tools/xc.sh, including the two-ordinary-runs check.
5. My earlier OPEN_/LIMIT_ routes (test_lane_t0713_rereview, test_lane_t0717_odalys) all pass as
   pinned on both hosts (inside the 216).

## Findings

### High

None.

### Medium

**K1. The class is not put back when the planted class owns `__class__`.** Medium, the same rank as T-0717 N1, whose family it is.
`_setattr = object.__setattr__` is generic setattr: it looks `__class__` up on `type(main)`'s MRO
first. A planted `class M(ModuleType)` with a `__class__` property gets its setter called
instead of object's.

- M2 (setter raises), `test_OPEN_M2_class_setter_raises_before_the_step`: `_go` raises before
  `_last_step` and before `_BEFORE` is set. The innocent run ends `error` with the planter's
  `RuntimeError('planted')`, its own `lane_tampered` is `["code:_user_frame", "code:denied"]`
  (verdict demote), `lane_tampered_before` is `[]`. The planter is not named, and its code ran
  in the innocent run with no step in between. N=1 per host, 3.9/3.13/Simulator 3.15.1.
- M1 (setter does nothing), `test_OPEN_M1_class_setter_keeps_the_planted_class`: main keeps
  class M through the run. `main:class` is named, the probe is refused, but `run()` reads
  `main.__dict__` for `records.finish(main_globals=...)` after the run's code, so M's `__dict__`
  property runs the planter's code inside the innocent run's end: its own check reports
  `code:_user_frame, code:denied`. Same three platforms.

Fix suggestion: `object.__dict__["__class__"].__set__(main, _ModuleType)` (the descriptor itself,
no MRO lookup), then check `_type(main) is _ModuleType`; and read `main_globals` in `run()`
through `_main_dict` too in the widget lane.

### Low

**L1. A planted `__file__` passes as what `_prepare` made.** `want` takes `__file__` from g after
the step, not from what `_prepare` set. An exact-str `__file__` planted into an editor run (which
has none) is kept and not named; one planted into a file run replaces the real path silently.
No code runs; a script that opens files beside `__file__` reads the planter's path.
`test_OPEN_L1_planted_file_passes_as_what_prepare_made`: probe prints `/tmp/planted.py`, both
reports empty. Fix: <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> the path `_prepare` set (it is in `_S["main_path"]` for file sources;
an editor run has no `__file__`) and compare.

## Verdict

Changes needed before the flag defaults on. N1, N1c and the deleted-builtins case are closed and
cause no false alarms. K1 reopens N1b's family with one more descriptor; it is a two-line fix.
One line added for Pernille (K1, with L1 folded in as optional).

---

# T-0731: re-review of 5b00c066 (T-0730, K1 and L1 fix)

Odalys, 2026-10-29. Read the diff and tests before the author notes. Reproducers:
pywidget/tests/bridge/test_lane_t0731_odalys.py (S1, OPEN_P1, OPEN_P2). Host 3.9.6 and 3.13.18.

## What holds (n = 1 run each, both hosts)

- K1 is closed. `object.__dict__["__class__"].__set__` bound at import skips type(main)'s MRO. S1
  plants a class with a metaclass (its own `mro`, `__setattr__`, `__instancecheck__`), empty
  `__slots__` and a `__getattribute__` trap: the class goes back, no trap code runs, the probe is
  refused, and the planter is named `main:class`. A class with non-empty `__slots__` cannot be
  planted at all (layout differs). The planted class has no non-module target: `__class__`
  assignment on a module needs a compatible layout. `object`'s dict is immutable, and the bound
  setter holds the descriptor, so its owner cannot be replaced.
- `_main_dict` cannot lie by itself. `__dict__` on ModuleType is a read-only slot, and
  `ModuleType.__init__` re-run keeps the same dict.
- L1 is closed for the route it named (M1/M2/L1/L1b pass).
- No false alarms. Full bridge suite: 220 tests (216 + 4 new), OK on 3.9 (skipped=6). On 3.13: OK
  2 of 3 runs. 1 of 3 runs had one failure that I did not capture and could not reproduce in 2
  reruns. I treat it as an unidentified flake, not as caused by this change.
- Simulator replay: not rerun by me (time box). Pernille's replay evidence is
  pywidget/docs/reviews/t0730-evidence/test-results.txt.

## Findings, ranked

1. **P2, Medium (new route, pre-existing since T-0721, widened by T-0730).** Every runner global
   that `_go` reads before `_last_step` can be rebound by the planter. The planter reaches it
   through the `_prepare` frame (`sys._getframe(2).f_globals` from the sys.argv hook). The step
   does put the runner's globals back and names them (`runner:_main_dict`). But `g =
   _main_dict(main)` was already read through the rebound name. So g is the planter's dict
   subclass, the trap runs inside the innocent run's code, the lane is undone, and the probe's
   imports go through (wave, csv, ssl LOADED, not refused). The same applies to `_set_class`,
   `_type`, `_S` and `_GRAVE` before the step. The planter is named, but its code ran after
   the step. Reproducer: `test_OPEN_P2_runner_global_rebound_before_go`.
   Fix direction: read nothing rebindable before the runner-globals restore has run. Either call
   the restore first in `_go`, or take g and the class-setter from objects the planter cannot
   reach. Note that function `__defaults__` and closure cells are writable too.
2. **P1, Low (L1 bypass through state, not a global).** The same frame reaches the runner's `_S`
   dict. Writing the planted path into `_S["main_file"]` as well as `__file__` makes it pass as
   what `_prepare` set: it is kept and not named. Reproducer:
   `test_OPEN_P1_file_planted_through_runner_S`. The same route should reach
   `_S["lane_tampered_before"]` (it would hide what the reset put back). I did not test that
   (time box). It is a lead for P2's fix: keep per-run state where `_prepare`'s frame cannot
   reach it, or check it in the step.

## Verdict

K1's descriptor route is closed and causes no false alarms. Changes are still needed before the
flag defaults on: P2 (Medium) gets a line for Pernille, with P1 folded in.
{% endraw %}

</div>
