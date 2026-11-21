---
layout: "default"
title: "T-0044: marketplace Python in Pyodide inside a WKWebView (L12 Q3 spike)"
section: "documents"
description: "What M2 means today: ADR-006 s4 holds. No marketplace Python is promised. If M2 goes ahead, the walls are CSP plus the removal script (CSP alone leaks through WebRTC), with a host-side deadline. The device rows below\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/t-0044-pyodide-webview-spike.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/research/T-0044-pyodide-webview-spike.md</code></span></div><h1>T-0044: marketplace Python in Pyodide inside a WKWebView (L12 Q3 spike)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div><p class="meta">Mockup screens are drawn; they go public after creative approval.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-11-17 (draft, nothing run) and 2026-11-21 (runs). Inputs: L12-security.md s6.3 (M2 row) and s13 Q3;
ADR-006 s4 and s10.3; L14-web.md; L14-raw/src/pyodide_*.

## Verdict: walls and start time answered on the Simulator; background and device memory are not

Measured on 2026-11-21, iOS 27.0 Simulator (iPhone 17, private device `T0044-idris`), Pyodide 314.0.7 (Python 3.14.2):

1. **CSP `connect-src` holds for every ordinary channel, and Python inherits it.** fetch, XHR, WebSocket,
   sendBeacon and EventSource to the unlisted host never reached the server, and each raised a
   `securitypolicyviolation`. From Python, a synchronous `XMLHttpRequest` raised `NetworkError` and nothing arrived.
2. **CSP does not cover WebRTC, and neither does a WKContentRuleList.** With either wall in place,
   RTCPeerConnection still sent STUN over UDP and TURN over TCP to the unlisted host, in every run.
3. **A document-start removal script stops WebRTC**, in the main frame and in a fresh `about:blank` iframe, and
   Python then sees `js.RTCPeerConnection` as `None`. That is the route for a shipping app. The private switch
   (`_setPeerConnectionEnabled:`) also works, but it is SPI, so it is a 2.5.1 rejection risk and not a route.
4. **Pyodide needs `'wasm-unsafe-eval'` and does not need `'unsafe-eval'`.** It starts under
   `default-src 'none'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'; connect-src 'self'`. Without
   `'wasm-unsafe-eval'` it does not fail: `loadPyodide` stalls with no error and no violation event, for the full
   45 s the page waits. So the host must time it out itself.
5. **Start: about 1.1 to 2.0 s to a first `print`**, a fresh web view each time, loading from a loopback server.
   **Memory: about 140 to 150 MiB** for the WebContent process once Pyodide has loaded. Both numbers are from the
   Simulator. It runs on a Mac CPU and has no jetsam, so neither is a device number.
6. **Background: not answered.** On the Simulator, a page's timer kept running in the background, but slowed and
   with gaps of up to 27.6 s. A background task did not change that reliably. The Simulator does not suspend apps
   the way a device does, so this says nothing about a device. A widget refresh that depends on marketplace Python
   still cannot be promised.
7. **Found along the way: an awaited `js.fetch` that CSP blocks never settles in Python.** Pyodide's
   `_future_helper.set_exception` raises `TypeError: invalid exception object`, so the coroutine hangs. It happened
   in runs 4, 5 and 6 and I have not diagnosed it. A host running marketplace code needs its own deadline on every run.

What M2 means today: ADR-006 s4 holds. No marketplace Python is promised. If M2 goes ahead, the walls are CSP plus
the removal script (CSP alone leaks through WebRTC), with a host-side deadline. The device rows below come first.

## Measured (Simulator, 2026-11-21)

Runs through `tools/xc.sh` (`XC_SIM_SETUP=0 XC_TASK=T-0044`, `-destination id=2093156E-...`). Logs are in `ops/runs/`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Measured (Simulator, 2026-11-21), scrolls sideways" style="--tw:767px" markdown="1">

| Run (log) | What ran | Result |
|---|---|---|
| 1 `xcodebuild-20261121-152759` | 9 tests, first compile | The rule-list test stopped the runner 3 times: the first WebKit call (`+[WKContentRuleListStore defaultStore]`) ran off the main thread and failed in `WebKit::runInitializationCode` (crash report). The UI tests read a label after `terminate()`. Both fixed: `compileRules` is `@MainActor`, and the label is read first |
| 2 `xcodebuild-20261121-153351` | 9 tests (7 unit, 2 UI) | 9 passed |
| 3-5 `...154127`, `...154704`, `...154955` | Pyodide tests | Start test passed in all; the CSP and walls tests timed out until the page got a watchdog and Python used a sync XHR (finding 7) |
| 6 `xcodebuild-20261121-155147` | all 12 | **12 executed, 0 skipped, 0 failures** |

</div>


Numbers below are from run 6, with runs 1, 2 and 3 in brackets where they exist.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Measured (Simulator, 2026-11-21), scrolls sideways" style="--tw:640px" markdown="1">

| Question | Measured |
|---|---|
| Control (no walls) | Unlisted fetch and XHR answered `ok`; the WebSocket, beacon, EventSource and `` requests all arrived at the server; RTC sent STUN/UDP and TURN/TCP packets (`udp 20 bytes`, `tcp raw 28 bytes`) |
| CSP `connect-src` | 0 unlisted HTTP or WS hits. fetch `TypeError`, XHR error, WebSocket and EventSource `SecurityError` thrown, `sendBeacon` returned **true** but sent nothing. Violations: `connect-src` for f, x, w, b, e; `img-src` (from `default-src 'none'`) for the image |
| WKContentRuleList (block `.*`, allow `127.0.0.1:P`) | 0 unlisted HTTP or WS hits, no violation events, `sendBeacon` returned false. **STUN and TURN still left** (same packets as the control) |
| WebRTC under CSP | 14 unlisted STUN/TURN packets in run 6 (and in runs 1 and 2); candidates `host/host`, SDP about 715 characters |
| WebRTC with removal script | `RTCPeerConnection` undefined in the main frame and the `about:blank` iframe; 0 STUN/TURN packets |
| Private switch (SPI) | Responds; undefined in both frames; 0 packets |
| Wasm and CSP (8-byte module) | without `'wasm-unsafe-eval'`: `CompileError`; with it: compiles |
| Empty web view, load to first message | 577, 538, 542, 542, 537 ms (run 1: 610-706; run 2: 889-3,787, while the Mac was loaded) |
| WebContent footprint, empty page | 14.5 MiB (14.9, 14.4); the WebContent pid is not the test's pid |
| ... holding 64 MiB of Wasm memory | 79.8 MiB (79.6, 79.4) |
| ... plus 256 MiB (320 held) | 335.8 MiB (335.6, 335.4) |
| ... plus 1,024 MiB (1,344 held) | 1,362.3 MiB (1,362.8, 1,361.1): the Simulator let it grow; a device's jetsam limit is not tested here |
| Pyodide cold start, first view | `loadPyodide` 1,796 ms, first print 1,798 ms, 2,611 ms from `loadHTMLString` to the result (run 3: 1,210 / 1,215 / 1,832) |
| Pyodide, three more fresh views | load 1,359 / 2,030 / 1,290 ms; to result 2,081 / 2,687 / 1,925 ms (run 3: 1,058-1,115 / 1,606-1,666) |
| Footprint after the cold load | 141.6 MiB (run 3: 147.1) |
| ... after `sum(list(range(1_000_000)))` | 152.3 MiB (run 3: 153.6), result `499999500000` |
| Pyodide without `'wasm-unsafe-eval'` | stalled in `loadPyodide`, no error, no violation event, 45 s watchdog (runs 4 and 6) |
| Pyodide under the strict policy | started, `print` worked; load 1,630 ms (run 4: 1,271) |
| Python sync XHR to the unlisted host | `NetworkError`, 0 hits, a `connect-src` violation |
| Python awaited `js.fetch` to it | blocked (violation, 0 hits) but the await never settled (finding 7) |
| Background, no task (40 s at Home) | timer ticks 15 of 159 expected, longest gap 21.3 s (run 1: 23, 5.8 s; run 2: 22, 10.4 s) |
| Background, with `beginBackgroundTask` | 8 of 159, longest gap 27.6 s (run 1: 8, 22.6 s; run 2: 41, 1.9 s) |

</div>


Not measured: anything on a device (jetsam limit, suspension, thermal state), `BGAppRefreshTask`, a custom URL
scheme handler in place of the loopback server, and any Pyodide package beyond the core.

## Pyodide source (2026-11-21)

The GitHub release asset was refused on 11-17 by github.com's robots.txt (`Disallow: /*/*/download/*`). It was not
tried again, and the API asset endpoint was not used. The route checked instead is Pyodide's npm package. Pyodide's
deploy docs say the core tarball is "the same set of files that are installed if you use `npm install pyodide`"
(`L14-raw/src/pyodide_deploy.html`).
`terms_guard` allowed both registry URLs (live robots.txt). The npm Open-Source Terms allow downloading packages
"via application programming interfaces that npm publicly documents". Their automation ban is about the Website,
www.npmjs.com, not the registry. Pages saved with URL and date in `research/inbound/t0044-pyodide-route/`.

`fetch_pyodide.py` makes two requests, 5 s apart, signed out: the version document, then the one tarball it names.
**The pin is npm's, not a sha256.** npm publishes no sha256 for the file, and the only sha256 on file (the GitHub
digest) belongs to the `.tar.bz2`, a different file. So the tarball was checked against the registry's
`dist.integrity` (sha512) and `dist.shasum` (sha1). Both matched. Its sha256 is recorded here so a later fetch can pin it:

- `pyodide-314.0.7.tgz`, 6,488,647 bytes, sha256 `66b7949e5a0cba2250b586d7e368bf12fb482800748d182c4618254b685ffaa0`,
  sha512 `0YvXxEhfEdpLfb/XkM2BFAeMROq0iMUX2bzzH9pOttyMcWkwq+HbE5uyuGD82LN7y2q+SNvi/6V5JEsOlD2R1A==`, MPL-2.0,
  14 files (`pyodide.asm.wasm` 9,598,218 bytes, `python_stdlib.zip` 2,545,637, `pyodide.asm.mjs` 1,250,344).

It is unpacked with `tar -C` into `T-0044-idris/core/` in the scratch folder, outside the repository. Nothing from
Pyodide is committed or shipped. The test bundle reads it from `TEST_RUNNER_T0044_PYODIDE_DIR`. Without that variable
the Pyodide tests skip, and a skipped test proves nothing.

## The harness

`pywidget/ios/spikes/T-0044-webview/` is an XcodeGen project of its own (`T0044Spike`). It is never part of
PyWidget.xcodeproj or any shipping target, and `pywidget/ios/project.yml` is untouched. To run it:
`cd pywidget/ios/spikes/T-0044-webview && xcodegen generate`, then from the worktree root
`TEST_RUNNER_T0044_PYODIDE_DIR=<unpacked package> XC_SIM_SETUP=0 XC_TASK=T-0044 tools/xc.sh -project
pywidget/ios/spikes/T-0044-webview/T0044Spike.xcodeproj -scheme T0044Spike -destination id=<private Simulator> test`
(about 6 minutes).


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: The harness, scrolls sideways" style="--tw:491px" markdown="1">

| Test | How it decides |
|---|---|
| `WebViewSpikeTests` (7) | A loopback server logs every hit. The listed host is `127.0.0.1:P`; the unlisted one is `localhost:P`, the same server. A block means the path never arrived. RTC uses a TURN/TCP and a STUN/UDP server on the unlisted host. Removal is a document-start `WKUserScript` in all frames that pins 18 RTC globals to undefined |
| `PyodideSpikeTests` (3) | The same server serves the package at `/py/`. The page posts its stage, timings, stdout and violations, with a 45 s watchdog. The footprint is read with `proc_pid_rusage` on `_webProcessIdentifier` (SPI, spike only) |
| `BackgroundUITests` (2) | The page stamps `Date.now()` every 250 ms; the app goes Home for 40 s, with and without a background task |

</div>


The tests check the leaks they found as well as the walls: STUN under CSP and under the rule list is asserted to
arrive. If a later WebKit closes either leak, those tests go red and the finding needs a new look.

## To finish (on the board)

1. Device run: background (`BackgroundUITests` plus a `BGAppRefreshTask` probe) and memory against the device's
   jetsam limit. Simulator numbers do not stand in for either.
2. Finding 7: a minimal reproduction, then decide whether to report it to Pyodide. That report is outreach, so the
   Investors decide.
3. If M2 goes ahead: replace the loopback server with a `WKURLSchemeHandler` and measure start time again that way.
{% endraw %}

</div>
