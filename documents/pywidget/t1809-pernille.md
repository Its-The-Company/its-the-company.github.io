---
layout: "default"
title: "C13 review: the fake&#x27;s Stop Timer, the atexit Stop test on 3.9, contract s7 v5.6 (T-1809)"
section: "documents"
description: "Verdict: pass, with one low test gap (T-1848). The commit does all three things T-0401 asked for. (a) The Timer is daemon (fake_pwbridge.py:65-67), so the runner&#x27;s join no longer catches a harness thread, and the 3.9\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1809-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/t1809-pernille.md</code></span></div><h1>C13 review: the fake's Stop Timer, the atexit Stop test on 3.9, contract s7 v5.6 (T-1809)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Code under review: 1c54294a (Idris, T-0427): `fake_pwbridge.py`, `test_runner.py`, `bridge-contract.md` s7 and the v5.6 history row. Read against my T-0401 review ([`stop-tail-t0401-pernille.md`](stop-tail-t0401-pernille.html), "The 5 host tests", "The 3.9 hang", finding 4), not against the commit's reasoning. Reviewed 2026-11-03 at HEAD a15f3a2a. Host only. Line numbers are at HEAD.

**Verdict: pass, with one low test gap (T-1848).** The commit does all three things T-0401 asked for. (a) The Timer is daemon (`fake_pwbridge.py:65-67`), so the runner's join no longer catches a harness thread, and the 3.9 hang is gone. (b) The test runs on 3.9 again. It proves the callback was reached once, that Stop cut its sleep short, and that the status is the main code's (`test_runner.py:482-495`). (c) Contract s7 now says which status a Stop in atexit gives (`bridge-contract.md:221`), and that matches what I measured in T-0401. The red-first claim in the commit reproduces exactly. The gap: the contract makes two more claims that it attributes to this host test, and the test does not check them. Both claims are true; I probed them.

## Runs


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Runs, scrolls sideways" style="--tw:640px" markdown="1">

| Run | Result |
|---|---|
| Red first: HEAD test, fake at 1c54294a^ (non-daemon Timer), 3.13.18, 3 runs | 3/3 fail `('interrupted', None) != ('ok', None)` |
| Same, 3.9.6, 6 runs, 40 s <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> per run | 5 hang, 1 fails `interrupted != ok`. Same as the commit's "5 of 6 hang" |
| HEAD, the one test, 8 runs each on 3.9.6 and 3.13.18 | 16/16 OK |
| Mutant on a `PW_RUNTIME_DIR` copy: `_user_on()` removed from `_epilogue` | killed on both Pythons, both subtests (`2.65 not less than 1.0`) |
| Probe, not committed: two callbacks, Stop lands in the first's sleep, 3 runs each Python | `ok`; stdout `READY A_IN B_IN` (no `A_OUT`); stderr starts `Error in atexit._run_exitfuncs:` on 3.9 and `Exception ignored in atexit callback <function a ...>:` on 3.13; `KeyboardInterrupt` in stderr each time |
| `run_host.py --both bridge`, foreground, main checkout | 3.13.18: 269 pass. 3.9.6: 269, 5 skipped, **1 failed** (see Unknown) |
| `run_host.py -v --python /usr/bin/python3 bridge`, straight after | 3.9.6: 269, 5 skipped, pass (467 s, load average about 400) |

</div>


The 5 skips on 3.9 are the `co_positions`, ExceptionGroup, two `sys.monitoring` tests and `test_lane_t0713_rereview.py:204`. None of them is the atexit test.

## Findings

1. **Low. The contract's stderr and next-callback claims are not tested.** `bridge-contract.md:221` says the next callback still runs and that the callback's `KeyboardInterrupt` traceback goes to the run's stderr, with the header text for each Python. Then it names `test_stop_still_reaches_atexit` as the host test. The test (`test_runner.py:482-495`) registers one callback and never reads stderr. My probe shows both claims <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> today. But a change that ends `_run_exitfuncs` at the first interrupted callback, or that swallows the traceback, would still pass this test. One more precision point: Stop's repeats stay on through all remaining callbacks, so a "next one" that runs longer than one repeat (about 250 ms) is cut short too. "Still runs" means "is started". Fix: register a second callback first (atexit runs it last) that prints `AFTER`. Assert `AFTER` appears once, assert `KeyboardInterrupt` is in `st.text("stderr")`, and add "is started (Stop still reaches it)" to the s7 sentence. That is about 4 lines of test and a few words of doc. Line: T-1848 (Idris, P3).

2. **No finding: the Timer comment and the test comment** (`fake_pwbridge.py:60-63`, `test_runner.py:479-481`) give the reason (Swift's consumer is not a user thread) and the bug (bpo-45274). Correct, and that is the right place to record it.

3. **No finding: the `exit` 3 subtest.** `sys.exit(3)` followed by a Stop in atexit gives `exit`/3 with `error` null. That matches `_epilogue`, which swallows the callback's exception (`runner.py:1094-1100`) and leaves the outcome alone. It is a good addition. T-0401 did not ask for it.

## Unknown

- **One 3.9 failure in the first `--both` run, test not identified.** I did not save that run's output; that is my mistake. The verbose 3.9 run straight after passed 269/269, and the atexit test passed 8/8 alone on 3.9. The machine was at load average about 400 (other agents' Xcode work). I cannot tell whether that failure was this test, a timing-bound test somewhere else in the suite, or an outside cause. It does not block the verdict, but it is not explained. Next time: `run_host ... | tee`.
- Five hung 3.9 `bridge_driver.py` processes from the main checkout, each about 36 to 38 min old, were still running during this review. They are not mine. My own six orphans from the red-first runs in `/tmp/t1809` were killed. A killed `unittest` leaves its driver child running, so any red-first done with an outer timeout needs a matching `pkill`.

## Lines for Idris

- T-1848 (P3): test the atexit stderr traceback and the next callback (finding 1).
{% endraw %}

</div>
