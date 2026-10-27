---
layout: "default"
title: "T-0432 review: c1e46861 (T-0424, Idris), http.status in Swift, HTTPS over the app&#x27;s _ssl and certifi"
section: "documents"
description: "Verdict: pass with one medium and two lows. Nothing blocks the Day 10 alpha build. No key reaches git or the shipped app, certifi is the only trust root on the shipped path, and the monitor cannot double-reply or leak\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/http-status-t0432-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/reviews/http-status-t0432-pernille.md</code></span></div><h1>T-0432 review: c1e46861 (T-0424, Idris), http.status in Swift, HTTPS over the app's _ssl and certifi</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-10-27. Code, tests, script and contract lines only; not the author's notes.

**Verdict: pass with one medium and two lows.** Nothing blocks the Day 10 alpha build. No key reaches git or the
shipped app, certifi is the only trust root on the shipped path, and the monitor cannot double-reply or leak in
practice. The medium is a missing guard on one line that every C2 device call in the app depends on.

## Re-run

- `tools/xc.sh -project PyWidget.xcodeproj -scheme PyWidget -destination "platform=iOS Simulator,id=FCC3968B-..."
  -only-testing:PyWidgetTests/DeviceCallFixtureTests -only-testing:PyWidgetTests/BridgeTests test`:
  **53 tests, 0 failures**, exit 0 (ops/runs/xcodebuild-20261027-093118.log). All five new tests passed.
- `cd pywidget/tests/device && python3 -m unittest test_device_modules`: **21 tests OK**.
- `c2_calls_build.document()` equals `fixtures/c2_calls.json` (the fixture is the builder's output); 12
  http.status cases, 8 with a `network` given and `swift: true`, matching the Swift test's count of 8.

## What I checked and found sound

- **Keys and certificates.** `git ls-files` has no `.pem`, `.key`, `.crt`, `.csr` or `.srl`, and no `tls/`.
  `pywidget/ios/build/` is ignored. In the built Debug-iphonesimulator `PyWidget.app`, the only PEM outside
  `PlugIns/PyWidgetTests.xctest/` is `app_packages/certifi/cacert.pem`; `ca.pem`, `leaf.pem` and `leaf.key` sit in
  the test bundle's `tls/` only (CA `CN=pywidget test CA`, notAfter 2026-10-29). The CA key stays in the
  `mktemp` dir and the EXIT trap deletes it. `codesign -v --strict` passes on the app and on the test bundle, so the
  post-build phase runs before signing. The scheme builds only PyWidget and PyWidgetExtension for archive;
  PyWidgetTests is a test-action target, so the phase never runs in an archive.
- **Trust root on the shipped path.** `pywidget/http.py` `_context()` passes `cafile=certifi.where()`, so
  `create_default_context` loads that file only, never the default verify paths. The new test proves the leaf
  is refused with certifi's roots and accepted only after `certifi.where` is pointed at the test CA. (The
  `ImportError` fallback to the default context is mine, T-0394, and fails closed on iOS: no default store.)
- **Monitor lifetime and threading** (NetworkStatusCall.swift:65-72). The handler runs on its own serial queue,
  nils itself (breaking the closure-monitor cycle) and cancels. A second queued update cannot reach Python twice:
  `DeviceCall.reply` is first-reply-wins in C and returns false afterwards. A stopped or timed-out run makes the
  late reply a no-op. The only leak is a monitor that never delivers a first path, which NWPathMonitor does at
  start; acceptable.
- **Mapping.** Not satisfied is `none`; `requires_connection` is `none` (safe for widgets: a skipped download
  beats a spent budget); loopback-only is `none`; `other` reads `wired`; the Python side rejects a bad kind,
  a missing key and a non-bool flag (3 Python-only cases). Router and PyBridge use the same Unsupported wording.
- **Launch install.** `ConsoleModel()` is built in `PyWidgetApp.init`, which runs for any launch of the app
  process, background intent launches included; bench and theme-check launches pass `bridge: false` and correctly
  get no router. The widget extension does not link PyBridge. So the placement is right; only the guard is missing
  (R1).
- **C2 s6 lines.** The 10 MiB <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> and whole-request timeout reasons are sound and match `http.py`.

## Findings

### R1 (medium) No test that the app installs the router at launch: pywidget/ios/App/PyWidgetApp.swift:103

Every router test installs `DeviceRouter.handle` itself (HTTPDeviceTests.swift:49, :68), and each test that sets
a handler sets it back to nil in teardown. No test reads the handler the app installs, so deleting line 103 would
leave all 53 tests passing (reasoned from the tests, not run as a mutant), while the shipped app answers
every device call with "pywidget.http.status isn't available in this build.", which a tester reads as intended,
not as a bug. Once T-0353 puts location, pedometer, clipboard and files on the same router, this one line gates
all of C2 in the app. That is why it matters before the alpha.

Fix: one UI test in `UITests/` in the `AddWidgetTests` pattern: `launchEnvironment["PW_SOURCE"] = "from pywidget
import http\nprint('reason', http.status().unavailable_reason)\n"`, run, and assert the console shows
`reason None`. Seed the mutant (line 103 removed) and confirm the test fails.

### R2 (low) "Wi-Fi wins over cellular" is not pinned: NetworkStatusCall.swift:45-46, c2_calls_build.py:550

No fixture case gives a path that uses both `wifi` and `cellular` (the eight givens are wifi; cellular;
other+wifi; wired; other; unsatisfied; requires_connection+cellular; loopback). Swap lines 45 and 46 and the
fixture test still passes, though rule 13 and C2 s6 both state the precedence. The C2 s6 line also says "(a VPN
reports both)"; a VPN reports `other` plus its carrier, which `wifi_over_vpn` already covers.

Fix: add `case("http.status.wifi_and_cellular", ...)` with `given=net("satisfied", ["cellular", "wifi"])` and
reply `path("wifi")`; regenerate the fixture; raise the count at HTTPDeviceTests.swift:38 from 8 to 9; seed the
swap mutant and see it fail. In C2-device-api.md:226 replace "(a VPN reports both)" with "(a path can list both)".

### R3 (low) The HTTPS test leaves `certifi.where` patched for the rest of the test process: HTTPDeviceTests.swift:123-126

The runner keeps every module under the bundle root between runs (runner.py:284), so `certifi` stays imported
with `where` returning the throwaway CA. Any later test in the same process that makes an HTTPS request through
`pywidget.http` trusts only the test CA and fails against a real host. If the test fails before line 126,
the server thread also stays up holding its port. Test process only; nothing ships.

Fix: wrap lines 118-126 in `try/finally`: save `orig = certifi.where` before patching, and in `finally` restore
`certifi.where = orig` and call `srv.shutdown(); srv.server_close()`.

## Not findings

- xc.sh printed several hundred lines of CHHapticPattern Simulator noise instead of its 40-line summary on this
  run. That is xc.sh's filter, not this commit; noted for Odalys, no line added.
{% endraw %}

</div>
