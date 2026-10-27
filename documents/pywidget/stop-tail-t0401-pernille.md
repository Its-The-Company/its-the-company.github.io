---
layout: "default"
title: "C13 review: Stop repeats in the runner&#x27;s tail, the HoldGIL fixture, 5 host tests (T-0401)"
section: "documents"
description: "Verdict: pass with fixes. The fix does what the commit says for app runs, and the tests prove it: the two tail tests fail on the parent runtime and pass on HEAD, and each of the three seeded mutants is killed. Two\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/stop-tail-t0401-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/reviews/stop-tail-t0401-pernille.md</code></span></div><h1>C13 review: Stop repeats in the runner's tail, the HoldGIL fixture, 5 host tests (T-0401)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Code under review: 40f00baa (Idris, T-0400): `runner.py`, `HoldGIL.c`, `Tests/TestsBridge.h`, `project.yml` (test target), `BridgeSlice2Tests.swift`, `bridge_driver.py`, `test_runner.py`, contract s5 and s9 rows. Reviewed 2026-10-27 against HEAD a1998307 from the diff, `records.finish`, `widget_tree.emit` and `fake_pwbridge.py`. Since 40f00baa, `runner.py` and `test_runner.py` changed only in 6adf11d0 (app_packages on sys.path, T-0408), which does not touch the tail. `tools/xc_wait.sh` is out of scope. Host only; no Xcode run.

**Verdict: pass with fixes.** The fix does what the commit says for app runs, and the tests prove it: the two tail tests fail on the parent runtime and pass on HEAD, and each of the three seeded mutants is killed. Two things are open. In widget and preview runs the repeats stay on through runner code after `render()` (T-0426). The 3.9 hang is a harness thread and a CPython 3.9.6 bug, not the runner (T-0427).

## Runs


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Runs, scrolls sideways" style="--tw:640px" markdown="1">

| Run | Result |
|---|---|
| `run_host.py --both bridge` at HEAD | 3.9.6: 91 tests, 5 skipped, pass. 3.13.18: 91, pass |
| The 5 new tests, 3.13, `PW_RUNTIME_DIR` = the runtime at 40f00baa^ | 2 fail (`repeats_do_not_land_in_the_runners_tail`, `last_resort_still_emits_finished`), 3 pass, as claimed |
| Mutants on HEAD, 3.13: `_user_on()` removed in `_epilogue` / `_join_new_threads` / `run()` before the tree | each killed by its test (atexit / thread_join / render) |
| `test_stop_still_reaches_atexit`'s scenario through the driver, 3.9.6, 12 runs | driver hangs at exit in 7 of 12 |
| Same scenario, 3.13.18, 3 runs | exits; outcome `interrupted`, raised in `Thread.join` |
| Same scenario with the fake's stop Timer made daemon, 10 runs each on 3.9.6 and 3.13.18 | 0 hangs; outcome `ok`, `stop_dt` 0.04 to 0.19 s, so the atexit sleep was cut short |
| Widget run, `stop_after` 0.1, seeded `slow={"_epilogue": 0.6}`, sources `pass` / `sys.exit(0)` / `sys.exit(3)`, 3.9 and 3.13 | all three `internal_error` (KeyboardInterrupt). Same seed in an app run: `ok`, `exit 0`, `exit 3` |

</div>


Probe scripts were scratch files in /tmp and are not committed. The scenarios are reproduced in the board lines.

## runner.py

1. **`_quiet()` right after the user's main code, `exc` kept when a repeat lands in the handler.** Correct. If a repeat lands between `exc = e` and `_quiet()`, the outer handler keeps the user's own exception (`if exc is None`). A user error is no longer replaced by the Stop that came after it.
2. **`_join_new_threads`.** Correct. It turns the repeats on only when there is a thread to join, and it re-scans for threads started by a joined thread. When the join is interrupted, `run()` calls `_quiet()` before it classifies anything.
3. **Widget and preview runs: repeats stay on after `render()` (finding, T-0426).** `run()` calls `_user_on()` before `records.finish`. Nothing turns the repeats off until `_epilogue`. So the tree's size check, the flush, `bridge.emit("widget_tree")`, the return through `finish`, and entry into `_epilogue` all run with repeats on. A repeat that lands after `emit` returns and before `_epilogue`'s `try` escapes `finish`. `_last_resort` then reports `internal_error`, the same failure class this commit fixes. Two smaller problems sit in the same area:
   - The `_user_on()` condition is `status in ("ok", "exit")`, but `finish` renders only for `ok` or exit code 0. With `sys.exit(3)` the repeats are on with no user code to reach.
   - A repeat during the tree flush turns a completed render into `interrupted`. That is defensible after a Stop, but it should be a decision, not a side effect.

   The seeded run above shows the escape deterministically. Without the seed the window is a few bytecodes. It is reachable when a widget's budget runs out just as `render()` returns. Fix: turn the repeats on around `build()` (the render) and nowhere else, quiet again right after, and use `finish`'s own condition.
4. **`_epilogue`.** Correct for the case it targets. Two points for the record, no fix needed. When Stop lands in an atexit callback, the outcome stays `ok`, while a Stop in the join turns `ok` into `interrupted`; contract s7 does not say which is intended (T-0427 c). On 3.13 and later, `atexit._run_exitfuncs` reports a callback's KeyboardInterrupt through the unraisable hook and runs the next callback. So each further stuck callback costs one more repeat (about 250 ms) and prints a traceback to the run's stderr.
5. **`_last_resort`.** The fallback payload has every key `records.outcome` has, and the test checks that. It now runs `_release_hard_stop` and `_quiet` first. One note: it does not check whether `finish` already emitted `finished`. After this commit I found no path that raises after that emit (repeats are off and monitoring is released by then). If one is ever added, S5's "exactly one" would break silently.
6. **Hard-stop callback cache (`seen`).** Correct. `_is_user` depends only on `user_roots`, which is fixed for the run. The cache is per arm, so it dies with the tool.

## HoldGIL.c, TestsBridge.h, project.yml

- **Linking.** The test target links `Python.xcframework` with `embed: false` and is hosted by the app (`TEST_HOST`). `@rpath/Python.framework/Python` resolves to the app's embedded copy, so there is one Python image and one interpreter. If a second copy were ever loaded, `Py_IsInitialized()` would return 0 there and the Swift test's `installed` assertion would catch it. Nothing in `Tests/` is in the app target's sources (`App` and `App/Runtime` only), so the app gains no symbols and no bytes.
- **The module.** Single-phase `PyModule_Create` (m_size -1) put straight into `sys.modules`. `PyGILState_Ensure` from the record consumer is fine. The script thread is in `time.sleep` at that point, with the GIL released. `METH_O` with no `Py_BEGIN_ALLOW_THREADS` <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the GIL for the whole busy-wait, as the PyDLL call did. `PyFloat_AsDouble` error handling is right. Nit, no line: `pw_test_hold_gil` no longer needs default visibility. It could be `static`.
- **Device builds.** Not new, but recorded: the test target's `FRAMEWORK_SEARCH_PATHS` names only the simulator slice. A device-destination test build of this target will not link. The Simulator is the only destination in use.
- **Fixture.** The `WAIT` handshake with a 5 s <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, then `import _pw_test_native`, is sound. A failed install shows up as a `ModuleNotFoundError` and as the stdout assertion. I accept the Xcode result in the commit (3/3 zip, 2/2 full) as reported; I did not re-run it.

## The 5 host tests

They pass, and the first two fail on the old runtime. `test_stop_still_reaches_atexit` does not test what its name says first, though. `FakeBridge.write` starts Stop from a `threading.Timer`, and that Timer is non-daemon. It starts during the run, so `_join_new_threads` counts it as a user thread. In this test the user's code ends right after `READY`, so the first repeat lands in the join of the harness's own Timer: outcome `interrupted`, top frame `Thread.join`, on 3.13 as well. The atexit sleep is reached only after that. The mutant is still killed, because without `_user_on` the sleep runs its full 2.5 s. But the test cannot see the status an atexit Stop really gives (`ok`, measured with a daemon Timer). The same Timer is in every `stop_on` test, where it adds a harness thread to the join.

## The 3.9 hang: cause found

The hang is in `threading._shutdown`, on the tstate lock of the fake's Timer thread. Evidence: at exit, `threading._shutdown_locks` holds two locks, the main thread's and one more that is still held. A driver that exits has the second lock released. The faulthandler stack of a hung driver is `threading.py:1448 _shutdown`.

The mechanism is CPython 3.9.6's `Thread._wait_for_tstate_lock`:

```
elif lock.acquire(block, timeout):
    lock.release()
    self._stop()
```

The Timer thread ends, `acquire` succeeds, and the pending SIGURG handler (the fake's `_wake`, which trips SIGINT) runs before `lock.release()`. The KeyboardInterrupt leaves the lock held and `_stop()` never runs. `_shutdown` then waits on that lock forever. The outcome's frames show exactly this: the KeyboardInterrupt is raised at `threading.py:1069` from `_wake`. Whether it hangs depends on where the interrupt lands: after a successful acquire it hangs, during the wait it does not (7 of 12). Upstream fixed this race in bpo-45274, which wraps that code in a handler that releases the lock. To my knowledge the fix shipped in 3.9.8 and 3.10.1; I have not checked the release notes. 3.13 joins through `_ThreadHandle` and is not affected. The app embeds 3.15.1 (`patchlevel.h`), so the product is not exposed.

This also explains why it reproduced "with the runner before it too": that runner joined with `user_code` still on from `call_run`. With the Timer made daemon, the hang is gone on 3.9 (0 of 10) and the test can run there.

Unknown: nothing material. I did not check the exact 3.9.x release that carries the fix (above).

## Lines for Idris

- T-0426 (P2): repeats only around `render()` in widget and preview runs (finding 3).
- T-0427 (P2): fake Timer daemon, un-skip and tighten the atexit test, contract s7 status for a Stop in atexit.

Side note, not a line: `run_host.py`'s docstring says the app embeds 3.13; the vendored framework is 3.15.1.
{% endraw %}

</div>
