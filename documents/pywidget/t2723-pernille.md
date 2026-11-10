---
layout: "default"
title: "Review: T-2409 E1 earthquakes_today (T-2723)"
section: "documents"
description: "PASS on what could be read. Nothing High or Medium. The Simulator run (ExamplesBundleTests and ExamplesUITests) has not happened, so this does not close T-2723 by itself."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2723-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 19 · Mon Nov 9</span><span><code>pywidget/docs/reviews/t2723-pernille.md</code></span></div><h1>Review: T-2409 E1 earthquakes_today (T-2723)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-09. Commandment 13, independent (author: Wrenna).
Reviewed at c678b3723 (on origin/main): examples/earthquakes_today.py, tests/examples/test_earthquakes_today.py,
the USGS fixture, sim_cases.json, testEarthquakesToday in ExamplesUITests.swift, and the diffs to test_all_examples.py
and test_sim_cases.py. Host run: `run_host.py --both examples`, 121 tests green on 3.9.6 and on 3.13.18.
No Simulator run: the MacBook runner is silent (see Open), so the Swift tests are read, not run.

## Verdict

**PASS** on what could be read. Nothing High or Medium. The Simulator run (ExamplesBundleTests and ExamplesUITests) has not happened, so this does not close T-2723 by itself.

Counts: High 0, Medium 0, Low 4.

## Checked and sound

- **Credit.** `CREDIT = "Data: U.S. Geological Survey"` is printed as the last line of every successful run, including a quiet day. A host test pins the constant (test_all_examples) and the end-to-end test asserts the last line. It is not printed on failure, which is right: no data was shown.
- **Online outcome.** The saved real feed (26 events, generated 1793908119000) gives the exact docstring output; a test checks every output line appears in the docstring, so the docstring cannot drift.
- **Offline outcome.** DNS failure, both timeout shapes, refused connection, HTTP 503, HTML, a JSON object without features, features as a dict, and a bare list all print "Could not read the USGS feed: ..." plus "Check the connection and run again.", return None, and no credit. `HTTPError` is caught before `URLError`, correct. On 3.9 `socket.timeout` is an OSError subclass; on 3.13 it is TimeoutError; both pass.
- **Odd data.** bool magnitudes, empty place, string time, a 10**20 time, a non-dict feature and `properties: null` all parse without a crash.
- **No real request in tests.** FakeFeed is injected; the script-run test patches `urllib.request.urlopen`. One request per run, a fixed URL chosen from three sizes, a fixed 15 s timeout, User-Agent names the example only. Nothing is sent but the GET.
- **Secrets and personal data in the fixture.** None. It is public USGS GeoJSON: event ids, public eventpage URLs, magnitudes, places, coordinates of earthquakes, network codes. No tokens, no cookies, no account or device data. The SOURCES.md row carries the URL and fetch time.
- **Sim case.** `expect` holds the always-present first line; the `online` and `offline` alternatives share no line (a host test checks it), and a broken feed must not pass as online.

## Findings (all Low)

- **L1. Feed policy rests on an archived copy.** The live policy page is 404 (SOURCES.md, three reads). The 6-month and 30-day notice promise comes from a Wayback snapshot of 2026-09-20. Fine to ship; re-read before the first release goes to review.
- **L2. The "online" sim alternative needs a non-quiet day.** It demands "Largest first:". At the default 2.5 a day is never empty, so this holds; if the case ever scripts 4.5 it can fail on a quiet day. Say so in the case's `unchecked_why`, or leave it.
- **L3. EOF at the prompt.** `input()` raising EOFError (a closed stdin) is not caught in `main`, so it is a traceback. The REPL bar never closes stdin, so this is not reachable in the app. Low.
- **L4. TLS errors print the library's text.** `URLError(SSLCertVerificationError)` goes out as `str(reason)`, long and technical. Readable enough for an example; no data leaks.

## Open

- Simulator: `runner_queue.py --only-testing` takes PyWidgetTests filters only, so the ExamplesUITests filter was refused. I queued `--full` instead. The runner has been silent since 2026-11-08 19:36 ET (965 min at the time), and this <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s session wrote the job to ops/lane-outbox/b3-1794242493324531000-78332.json; the job is made on main when the branch lands. No job ID exists yet, so nothing could be polled.
{% endraw %}

</div>
