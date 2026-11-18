---
layout: "default"
title: "Review of 52b5af63bd: T-4767, a handler&#x27;s or render()&#x27;s SystemExit ends the run as the script&#x27;s error"
section: "documents"
description: "The commit fixes M1 as I asked for it: a SystemExit of any code from an action&#x27;s handler or from render() ends the run error, type SystemExit, no tree, the thread count kept and, in the widget lane, both lane keys\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/52b5af63bd-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/52b5af63bd-idris.md</code></span></div><h1>Review of 52b5af63bd: T-4767, a handler's or render()'s SystemExit ends the run as the script's error</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris (T-4859, Commandment 13). Author: Pernille. Reviewed: 52b5af63bd (commit message, the diff in
`records.py`, `tests/bridge/test_widget_action.py` and `docs/design/bridge-contract.md`). Checked against my own finding
M1 in [`pywidget/docs/reviews/e1b4dfbdbf-idris.md`](e1b4dfbdbf-idris.html) (T-4603), `runner.py` (`_classify`, the run tail, `_last_resort`),
`widget_tree.py` (`run_handler`, `_render`, `emit`), and on the Swift side `RunResultSink.swift`
(`WidgetRunOutcome.map`), `LaneGuard.swift` (`LaneReading`, `judge`, `refusedImportTypes`), `RunRow.swift`,
`RunLogExport.swift` and `BridgeFixtureTests.swift`. I did not see the author's reasoning beyond the commit message.
Date: 2026-11-18.

## Tests run

All in the foreground, in a scratch worktree at aaa161c108 (which holds 52b5af63bd), no Xcode.

- `python3 pywidget/tests/run_host.py --both bridge`: PASS on 3.9.6 and 3.13.18, 335 tests each, 0 failed suites.
- Mutant: the two added lines in `records.finish` removed, `test_widget_action` on 3.13.18: the four new tests go red
  (2 errors in process, 2 failures through the runner), as the commit says. Restored with `git checkout`, tree clean.
- Probe (`/tmp`, not added to the repository; it reuses `RunnerPath`'s real-runner scenario), app <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> and widget lane,
  on 3.9.6 and 3.13.18: a handler that raises a `BaseException` subclass of the script's own (`class Boom(BaseException)`),
  `GeneratorExit()`, or (3.13 only) `BaseExceptionGroup("g", [SystemExit(0)])`, and a render that raises `Boom`. Every
  one ends `internal_error`, `background_threads` 0, and in the widget lane with no `never_resident` and no
  `lane_tampered` key (L1 below). The same probe with `except Exception` in `finish` widened to `except BaseException`
  ends every case `error` with the user's type, and the widget lane carries `never_resident` and `lane_tampered == []`.
  Restored, tree clean.

## Verdict: PASS with findings

The commit fixes M1 as I asked for it: a `SystemExit` of any code from an action's handler or from `render()` ends the
run `error`, type `SystemExit`, no tree, the thread count kept and, in the widget lane, both lane keys present, so
LaneGuard no longer demotes the widget. Error, not exit, is the right status (below), and nothing on the Swift side
treats a `SystemExit`-typed error differently from another user error. The one open item (L1, Low) is the same hole
for the rarer `BaseException`s that are neither `SystemExit` nor `KeyboardInterrupt`, which my M1 also did not name.

## The key questions

### Is `error`, not `exit`, right for a handler's `sys.exit(0)`?

Yes, for four reasons.

1. **No tree was made.** Contract s7's `exit` with code 0 means "as `ok`": `RunResultSink.map` sends `exit` 0 through
   `withTree()`, and with no tree that becomes Swift's own `NoTree` ("No widget drawn" in the run log), which names
   neither the cause nor the line. As `error`, the payload carries the user's `SystemExit` with its frames, so
   `RunRow` takes the innermost user frame and the run log reads "SystemExit, line N": the line that stopped the tap.
2. **Grey "Exited" would be false.** In the app lane an `exit` 0 prints the grey success line, though the handler's
   state was not returned and nothing was drawn. A tap that changed nothing must not look like one that worked.
3. **A handler has no "done early" meaning.** Its contract is "return the new state, or `None` to keep it". An exit
   returns neither; reading it as `return None` (keep the state and redraw) would invent a rule, and a `render()` that
   exits has no tree to give at all. The run is the script's failure, and `error` is the status for that.
4. **It needs no wire change.** `exit` has `error` null by contract (s7), so carrying the user's exception and its line
   could only be done as `error`. The v5.12 row says so, and the main code's `SystemExit` stays `exit` as before
   (`_classify`), so a script that ends with `sys.exit(0)` before its render still draws.

### Does anything Swift-side treat a SystemExit-typed error differently?

No. Traced at 52b5af63bd:

- `WidgetRunOutcome.map` (`RunResultSink.swift:185`): status `error` becomes `.error` with `outcome.error?.type`, here
  `"SystemExit"`, like any user exception. The only `"SystemExit"` literal in Swift outside the editor's completion list
  is line 184, Swift's own type for a main-code `exit` with a non-zero code. The two now share the type name but differ
  in status and in having a line; nothing branches on the type name itself.
- `LaneGuard`: `LaneReading` reads only the three lane keys, which this commit makes present; `judge` checks the
  type only against `refusedImportTypes` (`LaneImportError`, `NotAvailableHere`). `RefreshOutcomeRule` compares only
  the fetch type. `RunLogExport.reason` special-cases `NoTree`, `schema_error`, `InternalError` and the fetch failure;
  `SystemExit` falls to the user type with its line. `RunResultSink.swift:109` writes a tree only for `ok` or `exit` 0,
  and Python sends none on this path anyway.
- So the extension keeps the widget in its lane, `status.json` shows a failing run of type `SystemExit` at the user's
  line, and the last good tree stays drawn.

## What I checked, and found sound

1. **Placement.** The new `except SystemExit` sits after `except KeyboardInterrupt` and before `except Exception`, so
   Stop in a render is still `interrupted`. `_render` and `run_handler` call `quiet()` in a `finally`, so Stop's repeats
   are off again after an exit, and no lock is held in Python across the handler (`widget_tree.py:31`), so nothing is
   left taken. The epilogue, flush and both lane callables run after the tree step as for any error.
2. **Nothing in the runtime raises `SystemExit` itself in the tree step.** The handler's time limit is measured after
   it returns (`run_handler`'s `clock()`), not enforced by an injected exception, and Stop is a `KeyboardInterrupt`. The
   only runtime `SystemExit`s are the patched `os._exit` and `pywidget/prompts.py`'s, both the user's own request. So
   catching it here cannot misfile a runtime stop as a script error.
3. **Tests.** In process and through the real runner, app and widget lanes: a handler exiting 0 and 3, a handler that
   leaves a thread and exits (count 1, so ADR-011 s7 (d) now holds on this path), and a render exiting 0 and 3 with and
   without an action; each asserts status, `exit_code` null, `tree_seq` null, the type, one `finished` last, and in the
   widget lane `lane_tampered == []` and `never_resident` present. The old weak test (status "not ok") is replaced.
4. **Contract.** The s7 `error` row and the v5.12 history row match the code; bootstrap stays `contract: 5`, rightly,
   since no key or record changed.

## Findings

### L1. Low: other `BaseException`s from a handler or render still reach the last resort

- Where: `records.py:115-124`. `finish` catches `KeyboardInterrupt`, `SystemExit` and `Exception` around
  `widget_tree.emit`. A `BaseException` that is none of these (a script's own `class Boom(BaseException)`,
  `GeneratorExit`, a `BaseExceptionGroup`) leaves `finish` and reaches `runner.py:1334`, so the run ends
  `internal_error` with `background_threads` 0 and no lane keys, LaneGuard marks the keys malformed, demotes the widget
  and ends the extension process: M1's failure, by a rarer road. The main code already files every such exception as
  the user's `error` (`_classify`), so the tree step is the only place that differs.
- Probed as above; widening the `except Exception` to `except BaseException` (after the two specific clauses) turns
  every case into `error` with the user's type and the lane keys present. It is rare (a script has to raise one on
  purpose), but it is pywidget blaming itself, and demoting a widget, for the script's exception.
- Fix: in `finish`, `except BaseException` in place of `except Exception` for the tree step, the comment saying why;
  tests through the real runner in both lanes for a handler raising a script-defined `BaseException` subclass and
  `GeneratorExit`, and a render raising the subclass (on 3.11 and later also `BaseExceptionGroup`), each ending
  `error` with the user's type, no tree, and in the widget lane `lane_tampered == []` and `never_resident` present.
  One clause in the contract's s7 `error` row. Board: T-4860 (Pernille, P2).

### Info (no action asked)

- A script author who writes `sys.exit()` in a handler sees a red traceback ending `SystemExit: 0`. That is accurate,
  but the API.md `Widget.action` row does not say that a handler ends by returning, and that an exit ends the tap as an
  error with the state and the last drawing kept. One sentence there would save someone a search; I put it in L1's
  line, since it is the same row of behaviour.
- `BridgeFixtureTests` maps fixture outcomes to `WidgetRunOutcome` by `error_type`; a fixture of a handler that exits
  would pin the Swift side's reading of this payload (error, `SystemExit`, the user's line). The mapping is already
  generic, so this is cover, not a fix.
- My own M1 named only `SystemExit`; L1 is a gap in my finding as much as in the fix.
{% endraw %}

</div>
