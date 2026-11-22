---
layout: "default"
title: "Review: T-0044 at 20b45d31 (Pyodide in a WKWebView spike)"
section: "documents"
description: "The spike&#x27;s main answers stand on the run 6 log: 12 executed (10 unit, 2 UI), 0 failures, Pyodide loaded (so the three Pyodide tests did not skip). CSP connect-src stops fetch/XHR/WS/beacon/EventSource and the log shows\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0044-20b45d31-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t0044-20b45d31-pernille.md</code></span></div><h1>Review: T-0044 at 20b45d31 (Pyodide in a WKWebView spike)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div><p class="meta">Mockup screens are drawn; they go public after creative approval.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-21, for T-5471 (Commandment 13). Author: Idris. Commits read: 7138c954d4 (harness,
findings doc, npm terms pages), 20b45d3101 (board notes, event, memory), e4f6478461 (11-17 records). No drift in the
reviewed paths between 20b45d31 and this branch's HEAD.

Read: [`pywidget/docs/research/T-0044-pyodide-webview-spike.md`](t-0044-pyodide-webview-spike.html), every file under
`pywidget/ios/spikes/T-0044-webview/`, `research/inbound/t0044-pyodide-route/`, `pywidget/ios/project.yml`, and the
six run logs `ops/runs/xcodebuild-20261121-{152759,153351,154127,154704,154955,155147}.log`. Nothing re-run: the logs
carry every `T0044 <name> <json>` line the doc quotes, so this is a reading review.

## Verdict: PASS with findings

The spike's main answers stand on the run 6 log: 12 executed (10 unit, 2 UI), 0 failures, Pyodide loaded (so the
three Pyodide tests did not skip). CSP `connect-src` stops fetch/XHR/WS/beacon/EventSource and the log shows a
`connect-src` violation for each; STUN/UDP and TURN/TCP still reach the unlisted host under CSP (14 packets in run 6,
counted) and under the rule list; the removal script leaves 0 RTC packets and `absent:undefined` in both frames;
`'wasm-unsafe-eval'` is needed (`CompileError` without it) and `'unsafe-eval'` is not; Pyodide 314.0.7 (Python 3.14.2)
loads in 1,058-2,030 ms across runs 3, 4 and 6; the WebContent footprint is 141.6 / 147.1 MiB after load and
152.3 / 153.6 MiB after the workload. Finding 7's `invalid exception object` is in runs 4, 5 and 6, as stated.

The spike cannot reach the shipping app: it is its own XcodeGen project (bundle prefix `app.pywidget.spike`), no
target in `pywidget/ios/project.yml` lists a path under `spikes/` (PyWidget: App, Shared; the extension: Widget,
Shared; tests: Tests, UITests), and T-0044 changed neither `project.yml` nor `PyWidget.xcodeproj`. Its SPI
(`_webProcessIdentifier`, `_setPeerConnectionEnabled:`) stays in spike files.

Source and terms: I judge the npm route sound, not a way round the 11-17 refusal. The refused step (a github.com
release download) was not retried, reworded or sent through another tool; the package came from a different
publisher channel that Commandment 4 names ("a standard package manager (such as Homebrew, npm, or pip)"), through
`terms_guard`, two requests 5 s apart, signed out. The three quotes in `sources.md` and the doc are in the saved
pages (`npm-open-source-terms.html`, `npm-terms.html`, `L14-raw/src/pyodide_deploy.html`). Nothing from Pyodide is
committed or shipped, so MPL-2.0's distribution terms are not triggered yet. What is missing is the software log
entry (M2) and a pin the company holds (L3).

Findings needing work are on the board as three lines (below). None blocks anything shipping: nothing here is in
the app.

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Findings, scrolls sideways" data-n="1" style="--tw:764px" markdown="1">

| # | Sev | Where | Finding |
|---|---|---|---|
| M1 | Medium | doc:44 | "Start test passed in all" for runs 3-5 is not what the logs say. `testPyodideStartAndMemory` ran only in run 3; run 4 (154704) ran 2 tests (CSPNeeds, walls) and run 5 (154955) ran 1 (walls). Records must agree with the log (charter, Commandment 2): say "ran in run 3 only, passed". |
| M2 | Medium | log/software.md (no row) | Pyodide 314.0.7 was downloaded and run but has no Commandment 4 row (name, version, source, license, purpose). The doc holds those facts, but it is neither `log/software.md` nor a lockfile or manifest. |
| M3 | Medium | Tests/WebViewSpikeTests.swift:86-95 | The control asserts only fetch, XHR and the WebSocket arriving. The beacon, EventSource, ``, STUN and TURN arrivals are in the log only. So the "never reached the server" asserts for `/b`, `/e`, `/i` (lines 107-109, 127-129) are anchored by nothing asserted: a WebKit that stopped sending beacons at all would leave them green. Assert every channel's arrival in the control. Same kind, smaller: the rule-list test asserts STUN but not TURN (line 131) though doc:53 states both; the CSP test asserts one `connect-src` violation (line 110), not one per channel (doc:11-12, 52); the SPI test does not assert the `absent:undefined` frames doc:56 states (lines 173-175); `testPyodideCSPNeeds` passes on any error (PyodideSpikeTests.swift:107), not the `loadPyodide` stall with no violation that finding 4 states; the wasm probe asserts `!= ok` (line 193), not `CompileError`. |
| M4 | Medium | doc:15-16 | "That is the route for a shipping app" is wider than the test. The removal script was tested in the main frame and one `createElement('iframe')` about:blank frame. Against hostile marketplace code it is a candidate route until a bypass set is tried: a `srcdoc` iframe, a nested iframe, an iframe navigated to a same-origin page, and a page that reads the globals before or after a frame swap. Say "candidate route", and put the bypass set in the M2 work (doc:118-124). |
| L1 | Low | doc:63; Tests/PyodideSpikeTests.swift:65-67 | "Cold start, first view" is the third Pyodide page of the run: XCTest runs `testPyodideCSPNeeds` first (alphabetical, run 6 log lines 134-163), which already loaded Pyodide twice. The true first loads were 1,630 ms (run 6) and 1,271 ms (run 4), so the 1.1-2.0 s headline still holds; the row's label does not. Rename it, or name the order. |
| L2 | Low | doc:13-14 | "With either wall in place ... in every run": the rule-list test ran in runs 2 and 6 only (it stopped the runner in run 1). Say which runs. |
| L3 | Low | fetch_pyodide.py:41-54 | The "pin" is the sha512 in a registry document fetched seconds earlier from the same host: it proves the transfer, not that the bytes are the ones reviewed. Now that doc:92-93 records sha256 and sha512, put them in the script as constants and check those. Before any M2 use, add the package to `pywidget/packages/manifest.toml` by URL and sha256 (Commandment 4). |
| L4 | Low | doc:93 | "MPL-2.0" is the npm `license` field, which covers Pyodide's own code. The core also carries CPython's stdlib (`python_stdlib.zip`, PSF-2.0) and a wasm build of CPython and its C libraries. Fine for a spike (nothing distributed); say so, and make a component licence audit a step before M2 ships anything. |
| L5 | Low | Tests/Support.swift:152-153; Tests/WebViewSpikeTests.swift:2-3 | Two stale or wide comments: the footprint helper says it reads the process "the way jetsam would count it on a device" (a Simulator footprint is a Mac process's; doc:24 has it right), and the WebView test header says Pyodide is not loaded because GitHub refused it (it is loaded now, from npm, in the other class). |

</div>


Checked and true (no finding): doc:8 Simulator id matches the run 6 command line; doc:42-43 and the bracketed run 1
and 2 numbers (start 610-706 and 889-3,787 ms; idle 14.9 / 14.4 MiB; background 23 / 5.8 s, 8 / 22.6 s, 22 / 10.4 s,
41 / 1.9 s); doc:51-72 against run 6; doc:54 "14 packets" (counted); doc:67 "runs 4 and 6"; doc:79-85 and
`sources.md` quotes; the fresh WebContent process per view (distinct PIDs in run 6).

## Board lines filed

- T-5527 Correct the web view spike's records (M1, M4 wording, L1, L2, L4, L5): Idris, P3.
- T-5528 Assert every channel in the web view spike (M3): Idris, P3.
- T-5529 Log and pin the spike's Pyodide download (M2, L3): Idris, P3.
{% endraw %}

</div>
