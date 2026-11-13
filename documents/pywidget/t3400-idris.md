---
layout: "default"
title: "T-3400: the system https shim (Python&#x27;s https through Apple&#x27;s TLS), independent review"
section: "documents"
description: "Verdict: PASS for what landed. It is off in today&#x27;s build, so nothing changes for users now. NOT ready to turn on. One High and two Medium must be fixed before any build that sets system_tls or ships without _ssl: an\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3400-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 23 · Fri Nov 13</span><span><code>pywidget/docs/reviews/t3400-idris.md</code></span></div><h1>T-3400: the system https shim (Python's https through Apple's TLS), independent review</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris, 2026-11-13. Task T-4294, Commandment 13 (independent review before TestFlight).
Read: ADR-009 s3 and s6; `git show ea5eb9a749` (8 files): `_pywidget_runtime/systls.py`, runner.py's install,
`pywidget/http.py`, `pywidget/errors.py` (app and stubs), C2 s6, `pywidget/tests/systls`. Also read, unchanged:
`_pywidget_runtime/device.py` (call, budget, error mapping). Checked in build 6's archive
(`ops/runs/upload-internal-20261113-115546.xcarchive`, 65f23b1c7c, which predates the shim) how `_ssl` ships.
Ran, in my own copy at main: `pywidget/tests/systls` 13/13 on 3.13 and 13/13 on 3.9.6; six host probes against
a fake bridge (below). No Xcode build, no device run. Line numbers are systls.py's unless named.

**Verdict: PASS for what landed. It is off in today's build, so nothing changes for users now.
NOT ready to turn on.** One High and two Medium must be fixed before any build that sets `system_tls` or ships
without `_ssl`: an https request through a proxy goes, whole and with its Authorization header, to the proxy
host (H1); a 10 MiB upload from a file or <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> takes 10-13 s of CPU on a Mac before it reaches the
bridge (M1); requests' `timeout=(connect, read)` gives Swift only the connect figure for the whole request (M2).
None of them can leak a request to a non-https address, and none can skip a certificate check.

## 1. Off in today's build (checked)

- `wanted(None)` (:456-462) is True only when `_ssl` is in `sys.modules` as None, or when neither
  `PathFinder.find_spec("_ssl")` nor the builtins find it. Build 6 ships
  `python/lib/python3.15/lib-dynload/_ssl.cpython-315-iphoneos.fwork` and `Frameworks/_ssl.framework`. On iOS,
  CPython's FileFinder loads `.fwork` stubs through `AppleFrameworkLoader`, so PathFinder finds `_ssl` and the
  shim stays off. This is a reading of CPython, not a device observation (see L4).
- No Swift file sets `system_tls` (grep over pywidget/ for `system_tls` in *.swift: none), so the config cannot
  force it on. `runner.bootstrap` keeps the key only when it is a bool; anything else is None (auto).
- With the shim off, `pywidget.http` is unchanged in behaviour: `_system_tls()` is False, `_Secure` subclasses
  the stock `HTTPSConnection`, `ssl` is imported in `_context()` as before, and `_cert_errors()` still catches
  `ssl.SSLCertVerificationError` because `ssl` is in `sys.modules` by then. The driver's `with_openssl` scenario
  covers this on the host.

## 2. Patch order (correct)

- `systls.install` runs inside `_import_guards` at bootstrap, after `_bundle_first`, before any user code, and
  again at every reset. No runtime module imports `http.client`, `urllib` or `urllib3` at module level before it
  (grep over `_pywidget_runtime/*.py`), so `http.client` gets `HTTPSConnection` and `_create_https_context` the
  moment it executes and `urllib.request` defines `HTTPSHandler`. `TestBootstrap` proves it through the real
  runner, including a run that removes the finder.
- The decision is taken once (`_state["on"]`), so a reset with a different `sys.path` cannot flip it. Good.
- The finder wraps only the three names it owns and falls through for everything else.

## 3. Timeouts and budget (correct, one Medium)

- In a budgeted run, Swift gets `left - 0.5 - 0.25` s and `device.call` waits `min(t + 1.0, left - 0.5)`, so
  Swift's own timeout comes back 0.25 s before the wait ends; a spent budget sends nothing (`budget` scenario).
  Both outcomes are `TimeoutError` subclasses, so `pywidget.http` reports them as late, never Offline.
- `pywidget.http` passes its whole-request deadline as the bridge timeout (`_bridged`), which matches its
  documented "timeout is the whole request".
- **M2.** urllib3 sets `conn.timeout` to the *connect* timeout before `connect()` and `request()`, and the
  bridge call happens inside `request()` (:212-215). Probe: `requests.get(url, timeout=(3.05, 27))` sends
  `"timeout": 3.05` to Swift for the whole request. The read figure is lost. Fix: in `SystemTLSConnection`, give
  the bridge connect + read (urllib3 has both on the pool's `Timeout` object; the connection can take them in
  `request()`), and say in C2 that the shim's timeout is whole-request, not per-read.

## 4. Error mapping (correct; two Lows)

- `CertificateRejected` and `TransportSecurityRefused` are `PyWidgetError, OSError`; `device.error_for` finds
  them by name, so no device.py change was needed. urllib wraps them in `URLError`; `pywidget.http` re-raises
  them before its OSError handler and never serves the cache (`pywidget_http` scenario).
- **L1.** requests reports a refused certificate as `requests.exceptions.ConnectionError`, not `SSLError`
  (probe; the driver asserts this too). Scripts written against the OpenSSL build that catch `SSLError` will
  miss it. Unavoidable without `ssl`; one sentence in C2 s6 and the module help.
- **L2.** Plain urllib3 (`PoolManager().request`, default `Retry(3)`) retries a certificate refusal: probe saw
  4 bridge calls before `MaxRetryError`. requests (retries 0) makes one. Harmless but slow; worth a line in the
  device test list, or note it.

## 5. Non-https hosts and certificate checks (no leak found)

- With the shim on, every request through `HTTPSConnection` or urllib3's https pool is built as
  `https://host[:port]/target` (:259-262) and goes to URLSession. Plain `http://` stays on Python sockets, as
  before and as documented. A redirect from https to http is followed by Python's client, which is CPython's
  and requests' normal behaviour; `pywidget.http` refuses it (the driver checks the message).
- `verify=False`, `ssl_context`, `cert_reqs`, `context=` are dropped (:312-316, :339-342). The system still
  verifies, so the shim is stricter, never looser. `is_verified = True` is honest for URLSession.
- **H1 (High). A proxy tunnel is ignored, and the request goes whole to the proxy host.** `connect()` (:318-319,
  :344-345) never reads `_tunnel_host`. When a script sets an https proxy, http.client and urllib3 make the
  connection to the proxy and call `set_tunnel(target)`; the shim then sends the request to
  `https://<proxy>:<port>/<path>`. Probe with requests,
  `proxies={"https": "http://proxy.example:8080"}` and an Authorization header: the bridge got
  `url: https://proxy.example:8080/secret` with `Authorization: token x`. urllib's `ProxyHandler` does the same.
  With OpenSSL the proxy sees only `CONNECT api.example.com:443`. Here the proxy host receives the credentials
  and the target never gets the request. It stays https, so not a plain-text leak, but it is a request to the
  wrong host. Fix: when `_tunnel_host` is set, build the URL from the tunnel host and port (URLSession uses the
  system proxy settings, not the script's), or refuse with a named error. I would refuse: a script that names a
  proxy expects it to be used. Add a scenario for both urllib and requests. `HTTPS_PROXY` in the environment
  reaches the same path through requests' `trust_env`, though the app sets no such variable today.
- What the Swift half must do so this stays true (mine, T-3401, noted here so the contract carries it): refuse
  any `url` whose scheme is not `https` or whose host is empty; never install a server-trust challenge handler
  that accepts; add no ATS exceptions; use a whole-request timer (resource timeout), not the idle timeout;
  read `body_file` only under the app's temporary folder; delete a reply `body_file` Swift wrote when Python has
  stopped waiting.

## 6. Correctness and cost of the socket

- **M1 (Medium). Large streamed bodies are quadratic.** `sendall` appends with `self._buf += bytes(data)` and
  `_complete()` re-partitions the whole buffer (and `_dechunk` re-joins it) on every call (:212-251). http.client
  sends a file body in 8 KiB blocks, urllib3 a generator in 16 KiB chunks. Host probe, 10 MiB minus one byte,
  Python 3.13 on this Mac: bytes body 0.01 s; file body with Content-Length 10.56 s; requests generator
  (chunked) 12.72 s. A phone is slower, and a widget or Shortcut run never has that long. Fix: a `bytearray`,
  parse the head once, keep a running length (and a chunk cursor for chunked), and only assemble at the end.
  Add a timing scenario (10 MiB from a file under, say, 1 s on the host).
- **L3.** A folded header (`putheader("X-Multi", "a", "b")`, which http.client writes as a continuation line)
  becomes two headers, `X-Multi: a` and a bogus `b:` with an empty value (probe). Rare; join continuation lines
  in `_head()` (:225-228).
- **L4.** `importlib.util.find_spec("ssl")` raises `ModuleNotFoundError` instead of returning None, because the
  finder raises from `find_spec` (:425-426). Some packages probe with `find_spec` before importing. Acceptable;
  if you keep it, say so in the docstring. Also add to the device test list one line that prints
  `systls.active()` in today's bundle and in the stripped one, so "off with `_ssl`" is observed, not reasoned.
- Reply framing (`_frame`) drops CR/LF headers, rewrites Content-Length after URLSession's decoding, keeps a
  HEAD's announced length, and always adds `Connection: close`, so pooled connections are dropped cleanly and
  urllib3 never calls `select` on the fake `fileno() == -1`. Correct.

## 7. Docs

C2 s6 and `pywidget.http`'s TLS paragraph say what the code does. The two new error names and the `ssl`
sentence go to Maren for wording (asked on T-4294, not a blocker). C2 should also gain the L1 sentence and the
whole-request timeout sentence (M2).

## Lines

H1, M1, M2 and L1-L4 go to Pernille as one board line from T-4294, to be done before the first build that sets
`system_tls` or ships without `_ssl` (ADR-009 s6 item 2's freeze, 2026-11-30).

## Probe outputs (host, python3.13 -I, fake bridge, `_ssl` blocked; script kept in my scratch)

```
proxy_urllib    url sent: https://proxy.example:8080/secret | headers: [['Accept-Encoding', 'identity'], ['User-Agent', 'Python-urllib/3.13']]
proxy_requests  url sent: https://proxy.example:8080/secret | headers: [..., ['Authorization', 'token x']]
timeout_tuple   Swift timeout for timeout=(3.05, 27): 3.05
find_spec       find_spec('ssl') raised ModuleNotFoundError
folded_header   headers sent: [['Accept-Encoding', 'identity'], ['X-Multi', 'a'], ['b', '']]
chunked_cost    bytes: 0.01 s | file, Content-Length: 10.56 s | requests generator (chunked): 12.72 s
u3_retries      MaxRetryError after 4 bridge calls | requests: ConnectionError (not SSLError) after 1 call(s)
```
{% endraw %}

</div>
