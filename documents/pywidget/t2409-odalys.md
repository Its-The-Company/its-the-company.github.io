---
layout: "default"
title: "Review: T-2409, E1 review fixes in the earthquakes example (e6dc5a9e16, Pernille)"
section: "documents"
description: "Verdict: PASS with findings. Each of the four fixes does what it says, and each is pinned: I removed each one in a scratch copy and the suite went red on 3.9 and 3.13 every time (5 of 5 mutants killed, table below)\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2409-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t2409-odalys.md</code></span></div><h1>Review: T-2409, E1 review fixes in the earthquakes example (e6dc5a9e16, Pernille)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys, T-4047, 2026-11-16. Independent review (Commandment 13): Pernille wrote e6dc5a9e16, so the line's
owner could not review it. I read the diff, then pywidget/examples/earthquakes_today.py, its test file, its fixture
(usgs_summary_2.5_day_2026-11-05.geojson), test_all_examples.py, example_harness.py and the earthquakes entry in
make_sim_cases.py as they stand on personal/a2 at ae837fe79e (none of the three changed files has moved since
e6dc5a9e16: `git diff e6dc5a9e16 HEAD` on them is empty). I judged the code, not the commit message. Test runs: see
"Tests" at the end.

**Verdict: PASS with findings.** Each of the four fixes does what it says, and each is pinned: I removed each one in a
scratch copy and the suite went red on 3.9 and 3.13 every time (5 of 5 mutants killed, table below). Missing fields,
wrong types, NaN and infinite magnitudes and times, an empty feed, every network failure I could name, and nested JSON
100,000 deep all end as a printed result, never a traceback. One Low remains in the same class as the first fix: a
magnitude that is a whole number too large for a float still crashes `parse`. It needs a broken or hostile feed (the
feed is HTTPS from USGS), so it does not block TestFlight, but it is a crash in shipped code, so it gets a board line.
Two more Lows are notes.

## What I checked

**1. Non-finite magnitudes (earthquakes_today.py:94-97).** `mag` must be an int or float, not a bool, and
`math.isfinite`. NaN, Infinity, -Infinity and 1e400 (json reads it as inf) all become "no magnitude": the quake still
counts, it is not ranked, and "None of them has a magnitude yet." prints when none has one. Correct. 1e308 is finite
and prints as a 309-digit number; ugly, no crash, not a value USGS sends (L2). A whole number of 400 digits crashes
here (L1).

**2. Times (89-93), unchanged by this commit but on the same path.** NaN, -Infinity, -1e20, 10**20 and a 400-digit
integer all reach `fromtimestamp` or the division and end as "time not given" (ValueError / OverflowError / OSError
caught). Correct.

**3. Broken connection (131-132).** `http.client.HTTPException` sits after `HTTPError` and before the OSError branch,
inside the same `try` as `response.read()`, so an IncompleteRead mid-body is caught. RemoteDisconnected is both a
BadStatusLine and a ConnectionResetError; the order sends it to "the connection broke ...", the better wording.
HTTPError is an OSError but is caught first, so its status line is kept. `http.client` is in NETWORK_MODULES and now
in ALLOWED_IMPORTS; it is the stdlib module urllib.request already loads, so it ships in the bundle.

**4. No console (171-175).** EOFError at the size prompt keeps DEFAULT_SIZE and goes on, also after a wrong answer
first. This matches the app: runner.py `_input` raises EOFError when there is no line, and a Shortcuts run with no
input text has an empty stdin (RunScriptIntents.swift:238). KeyboardInterrupt (Stop) is untouched, as it should be.

**5. Deep JSON (75).** `RecursionError` joins the parse's except list. `"[" * 100000`, 100,000 nested arrays inside
`features`, and 100,000 nested objects all print "not the earthquake list" on 3.9 and 3.13. On 3.13 a 5,000-digit
number is a ValueError (int digit limit) and is reported the same way; on 3.9 it is the L1 crash. The app's 3.15.1
was not run here (no host 3.15); scripts run on an 8 MiB thread stack (BridgeLimits.scriptStackBytes) where
BridgeSlice2Tests already shows deep recursion ends as RecursionError, so I expect the same, but the deep-JSON case is
not among the Simulator cases (L3).

**6. The rest of the example, unchanged.** Empty feed ("No earthquakes ..." and the credit line), `features`
missing, null, a dict, or the top level a list: all "not the earthquake list". Non-dict features are skipped, a
non-dict `properties` reads as empty, a blank or non-string place reads "place not given". Ties keep feed order
(`sorted` is stable on `-magnitude`). The credit line prints on every success and never on a failure. Only the top
five are listed. The real network is blocked in every test (example_harness), and the run-as-script test patches
`urllib.request.urlopen`, so no test touches USGS.

**7. The tests pin each fix.** One mutant per fix, in a scratch copy, run on both interpreters:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I checked, scrolls sideways" style="--tw:583px" markdown="1">

| Mutant (fix removed)                                 | 3.9                | 3.13               |
|------------------------------------------------------|--------------------|--------------------|
| no `math.isfinite` on the magnitude                   | FAILED (failures=1) | FAILED (failures=1) |
| no `except http.client.HTTPException`                 | FAILED (errors=2)   | FAILED (errors=2)   |
| no `except EOFError` at the prompt                    | FAILED (errors=1)   | FAILED (errors=1)   |
| no `RecursionError` in the parse                      | FAILED (errors=1)   | FAILED (errors=1)   |
| `http.client` out of ALLOWED_IMPORTS                  | FAILED (failures=1) | FAILED (failures=1) |

</div>


The NaN test calls `parse` only; it does not check that the report then says "None of them has a magnitude yet."
That path is pinned by `test_one_without_a_magnitude` (mag null), and the two meet at `magnitude = None`, so this is
enough.

## Findings

**L1 (Low): a whole-number magnitude too large for a float still crashes the example.**
`math.isfinite(magnitude)` (earthquakes_today.py:96) converts an int to a float first; for an integer above about
1.8e308 it raises OverflowError, which neither `parse` nor `main` (catches OSError and ValueError, :181) handles, so
the run ends in a traceback. Repro on 3.9 and 3.13: `parse('{"features":[{"properties":{"mag":' + "9"*400 + '}}]}')`.
A 400-digit number is under 3.15's 4,300-digit limit, so json reads it; only a broken or hostile feed sends one. The
same value would also crash `-q.magnitude` sorting and `"%.1f"`. Fix: treat a magnitude that cannot become a finite
float as unknown (`float(magnitude)` in a try that catches OverflowError, then `isfinite`), and add the 400-digit case
to `test_a_magnitude_that_is_not_a_number_is_not_ranked`. Owner: Pernille. Board: new line, "Earthquakes example
treats an oversized magnitude as unknown" (By: review of T-2409).

**L2 (Low, note): valid but absurd values print as they come.**
A magnitude of 1e308 prints as 309 digits; a place with a newline in it breaks the row into two lines. Neither is a
crash and USGS sends neither. If L1 is fixed, a sane range (say -2 to 12) and a place with control characters
replaced would close both in the same edit. No board line.

**L3 (Low, note): the deep-JSON and broken-connection paths are proven on host Python only.**
run_host.py --both runs 3.9 and 3.13; the app embeds 3.15.1, and sim_cases.json replays only the online and offline
worlds of this example. A Simulator case with a faked deep or truncated body would prove the app's own interpreter.
Also, pywidget/tests/examples/README.md still says "the 10 scripts" (there are 11 since T-2409; not this commit's
change). No board line; for whoever next touches make_sim_cases.py.

## Tests

1. `python3 pywidget/tests/run_host.py --both examples`, 2026-11-16 about 2:45 PM ET: **exit 0**, 123 tests on
   Python 3.9.6 and 123 on 3.13.18, 0 failed suites (246 tests).
2. `python3 pywidget/tests/examples/make_sim_cases.py --check`: exit 0, "sim_cases.json matches the harness".
3. Mutation check, 5 mutants in a scratch copy under /tmp (removed after): `-m unittest test_earthquakes_today
   test_all_examples` on both interpreters, all 5 killed on both (table above).
4. Edge probe, `parse` + `report` on 12 hand-made bodies on both interpreters (scratch, not committed): all reported or
   printed except the 400-digit magnitude (L1), and on 3.9 only, the 5,000-digit one (3.13 and 3.15 refuse it as a
   ValueError).
5. Not run: tests/run.sh. It runs the kit's tests/*_test.* suites and does not cover pywidget/tests/examples. No Xcode
   run: nothing in the commit reaches Swift.
{% endraw %}

</div>
