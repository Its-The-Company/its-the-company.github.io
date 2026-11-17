---
layout: "default"
title: "Review of e1b4dfbdbf: T-4564, run a button&#x27;s action and redraw in one run"
section: "documents"
description: "One Medium: a handler that calls sys.exit() ends the run as internal_error, which skips (d)&#x27;s thread count and the widget lane&#x27;s reports, so Swift demotes the widget. State and tree are still kept, so nothing is lost\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/e1b4dfbdbf-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/e1b4dfbdbf-idris.md</code></span></div><h1>Review of e1b4dfbdbf: T-4564, run a button's action and redraw in one run</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris (T-4603, Commandment 13). Author: Pernille. Reviewed: e1b4dfbdbf ("run a button's action and
redraw in one run", ADR-011 s7 "Called" (a), (b), (d)). Checked against T-4564's board line and Done when
("test: land:host") and ADR-011 ([`pywidget/docs/decisions/ADR-011-widget-actions.md`](adr-011-widget-actions.html) as accepted at 137c133087)
s6, s7 "Called" (a), (b), (d) and the lock order under H2. Files: `widget_tree.py` and `runner.py` in
`pywidget/ios/App/Runtime/_pywidget_runtime/`, `pywidget/tests/bridge/test_widget_action.py`. I read the diff, the
runtime tail it plugs into (`records.finish`, `runner.run`, `runner._last_resort`) and Swift's `LaneGuard.swift`
for how a widget-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> outcome is read. Line numbers are at e1b4dfbdbf. None of the three files, nor `records.py`,
has changed between e1b4dfbdbf and HEAD (9bb5eba0fe), so everything below holds at HEAD too. The commit message
cites an earlier review with numbered findings; I have no file for it and did not use it. Date: 2026-11-17.

## Tests run

All in a scratch worktree (`python3 tools/scratch.py worktree T-4603 --worker Idris`, detached), in the
foreground, on /usr/bin/python3 (3.9.6) and Homebrew python3.13 (3.13.18). The Mac mini was at load 90 to 136.

- e1b4dfbdbf, `python3 -I pywidget/tests/run_host.py --both <suites>`, in four calls that together cover all 20
  suites `--list` names (what `land:host` runs): PASS on both interpreters, 1796 tests per interpreter (bridge
  327, of which `test_widget_action.py` is 33; dsl 314; widgets 416; the rest as printed). 0 failed suites.
- HEAD (9bb5eba0fe), the same 20 suites in three calls: on 3.9.6 all PASS. On 3.13.18 the first call failed one
  test in bridge: `test_runner.py` `test_swallow_ends_by_hard_stop_twice` ("a soft Stop got past the swallow:
  stop_dt 2.47"), a timing assertion in a file this commit does not touch. I reran bridge on 3.13.18 alone: PASS,
  329 tests. All other suites PASS on both. I did not look further into that test.
- `tests/run.sh` (the kit's suites): not run. The line's Done when is `land:host`, and no file under `tests/` is
  touched by this commit.
- No Xcode run.
- Probes, in `/Volumes/SANDISK SSD/company-scratch/T-4603-idris/probes/`, run from `/tmp` with `python3 -I` on
  both interpreters against e1b4dfbdbf, not added to the repository: `parse_action` on 45 requests (name rule
  against `pywidget_ui`'s on prefix case, length, leading `.`, non-ASCII; args as text and embedded: NaN,
  Infinity, `1e400`, duplicate keys at depth, arrays, null, lone surrogates, 1024/1025 canonical bytes, deep
  nesting, integers past 2^53; tap ids; unknown and missing keys); handler returns (a nested int key, a bool key, a
  dict subclass, a 200 KB state, args mutated, a handler that raises its own declared timeout while running);
  `SystemExit` in a handler and in a render through the real runner, in the app lane and the widget lane (M1).

## Verdict: PASS with findings

The run reads the way ADR-011 s7 words it.

- (a) `action` is in `REQUEST_KEYS` (`widget_tree.py:86`) and `parse_request` calls `parse_action`, so a bad one
  ends the run as `WidgetRequestError` before `compile` (runner.py:1268-1276). An action on an app, Shortcut or
  preview run is refused there too (`check_action_context`, `widget_tree.py:255`), not ignored. The name rule is
  the DSL's pattern, compared with `fullmatch`, with the `pywidget.` prefix refused in any case; my probes and the
  test's 4,000 random names agree with `pywidget_ui`. `function`, `tap_id` and `widget.id` are required; unknown
  keys are refused. `args` must be an object; NaN, Infinity and overflow to infinity are refused in both the
  embedded and the text form; a key twice is refused in the text form; the 1 KiB bound is on Python's canonical
  bytes after integral floats become ints, which is the measure Swift's `argsProblem` mirrors (PyBridge.swift
  `pythonSize`). An integral float within 2^53 arrives as `int` (`_args_number`, `widget_tree.py:141`).
- (b) The handler runs in `records.finish`'s tree step, before the render, with Stop's repeats on around it only
  (`run_handler`, `widget_tree.py:400`); the render reads the returned state, and the document carries it. A raise,
  a state JSON cannot carry (non-string keys at any depth, a cycle, NaN, a set) or a return past the declared
  timeout ends the run `error` with no `widget_tree` record (probed and tested), so Swift writes nothing.
  `run_action` deep-copies state and args, so a handler that edits its args changes nothing.
- (d) The handler runs in the same tail in both lanes, and `background_threads` is read after it; the test counts
  a handler's leftover thread as a render's in the app lane and the widget lane, and I watched both pass.
- Locks: the diff opens no file and takes no lock (`grep -i lock` on the added lines finds only the docstring
  saying so and `run_handler`'s `clock` parameter). `run.lock` stays the Swift state-commit step.

One Medium: a handler that calls `sys.exit()` ends the run as `internal_error`, which skips (d)'s thread count and
the widget lane's reports, so Swift demotes the widget. State and tree are still kept, so nothing is lost and no
wrong tree is drawn. Buttons are inert on the phone until build step 6, so nothing holds TestFlight today.

## Findings

### M1. `SystemExit` in a handler ends the run `internal_error`: no thread count, no lane reports, the widget demoted

- Where: `records.py:111-118` (`finish` catches `KeyboardInterrupt` and `Exception` around `widget_tree.emit`, not
  `SystemExit`), so the exit leaves `finish` and reaches `runner.py:1334` (`except BaseException` in the tail),
  which calls `_last_resort` (`runner.py:1437-1449`): status `internal_error`, `background_threads` 0, and none of
  `never_resident`, `lane_tampered`, `lane_tampered_before`. `test_widget_action.py:497-507` asserts only that the
  status is not `ok`.
- The failure, probed through the real runner on 3.9.6 and 3.13.18: a handler `raise SystemExit(0)` ends
  `internal_error`, error type `SystemExit`, `tree_seq` None. `SystemExit(3)` is the same. A handler that starts a
  non-daemon thread and then exits reports `background_threads` 0, so (d) does not hold on this path. In the widget
  lane the outcome carries no `lane_tampered` or `never_resident` key; `LaneGuard.swift:84` marks a missing key
  malformed, and `LaneGuard.swift:126` then demotes the widget and ends the extension process. So an author whose
  handler stops early with `sys.exit()` sees "InternalError" (pywidget's fault, by RunResultSink.swift:194) in the
  run log, and the widget is moved to the app lane, where its buttons no longer run in the widget.
- Not new to this commit for `render()`: probed at e1b4dfbdbf, a render that raises `SystemExit(0)` with no action
  also ends `internal_error`. This commit adds a second user-code site in the same tail, and an early `sys.exit()`
  is a more natural thing to write in a handler than in a render.
- Fix: in `records.finish`, treat `SystemExit` from `widget_tree.emit` as the user's error: status `error`, no tree,
  its `error` formatted as the user's `SystemExit`, so `finished` still carries `background_threads` and the lane
  keys. Tests: a handler and a render that exit (0 and non-zero) end `error`, type `SystemExit`, with no
  `widget_tree` record; a handler that leaves a thread and then exits counts 1; in the widget lane
  `lane_tampered == []`. Board: T-4767 (Pernille).

### L1. Embedded integers in `args` take any size; floats past 2^53 do not

- Where: `_normal_args` and `_args_number` (`widget_tree.py:141-162`) convert only floats.
- Probed: embedded `{"n": 10**300}` is accepted (it fits in 1 KiB), and `{"n": 9007199254740993}` reaches the
  handler exactly, while the text form `{"n":9007199254740993.0}` reaches it as `9007199254740992`. ADR-011 says
  only "finite numbers", so this is not a breach. It is the runtime half of the open L3 in my review of T-4550
  ([`948b42cb28-idris.md`](948b42cb28-idris.html): bound run-args integers to plus or minus 2^53 - 1 on both sides). When that bound is
  settled, `parse_action` is where it is enforced "before user code runs", with the same message as the DSL's.
  Ride along with T-4767, or with the T-4550 L3 fix.

## Notes (no change asked)

- The timeout is checked when the handler returns, as the docstring says (`widget_tree.py:400-428`). A handler that
  runs past its declared timeout runs on until it returns or the run's `budget_s` Stop lands; its side effects
  happen and its state is dropped. That matches ADR-011's "times out ... writes nothing" for state. A handler that
  raises its own declared timeout while running is still held to the one read before it ran (probed).
- `emit` decodes the action twice: once inside `parse_request` and again in `parse_action` (`widget_tree.py:442-
  443`). Harmless at 1 KiB.
- `tap_id` is checked and never used in Python; Swift logs it. Fine.
{% endraw %}

</div>
