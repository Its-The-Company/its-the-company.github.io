---
layout: "default"
title: "Review of T-3820: net.request, the Swift half of the systls shim"
section: "documents"
description: "PASS with findings. Nothing here can send a byte to a non-https host or skip a certificate check, and the wire matches the shim. One Medium (M1, error mapping) and three Low go to Idris on one line; three items for the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3820-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 23 · Fri Nov 13</span><span><code>pywidget/docs/reviews/t3820-pernille.md</code></span></div><h1>Review of T-3820: net.request, the Swift half of the systls shim</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4309, Commandment 13, independent). Author: Idris. Commit a9108cc747, landed through
MacBook job J-20261113-1326-land-m-32b977 (passed; PyWidgetTests 1761/0 per the packet; the 13 new tests passed
locally). Date: 2026-11-13.

Read: `git show a9108cc747` (Shared/NetFetch.swift, Shared/Bridge/NetCall.swift, Shared/Bridge/LaneDevice.swift,
Tests/NetRequestTests.swift); net.get's `parse`, `failure(for:)` and `makeSession` in the same file; the shim's
docstring and `_send`/`BridgeSocket`/`_frame` (`App/Runtime/_pywidget_runtime/systls.py`); ADR-009 s3; Idris's own
list for the Swift half in pywidget/docs/reviews/t3400-idris.md s5. No test run of my own: the change is unchanged
on main since its land job, and nothing below needed one to decide.

## Verdict

**PASS with findings.** Nothing here can send a byte to a non-https host or skip a certificate check, and the
wire matches the shim. One Medium (M1, error mapping) and three Low go to Idris on one line; three items for the
shim go as a note on T-4303. M1 must be fixed before the first build that sets `system_tls` or ships without
`_ssl` (the same gate as T-4303: ADR-009 freeze 2026-11-30).

## What I checked, item by item


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I checked, item by item, scrolls sideways" style="--tw:640px" markdown="1">

| Item | Result |
| --- | --- |
| Any method | Pass. Any RFC 9110 token up to 32 characters. GET or HEAD with a body is a ValueError, which is honest: URLSession fails such a request. |
| Bytes both ways | Pass. Strict base64 in, `base64EncodedString` out; tested with all 256 byte values through the real bridge and the shim's own `_send` (`testSystlsSendMeetsNetRequest`, which is in NetRequestTests, not BridgeTests as the packet says). |
| No redirect followed | Pass. `willPerformHTTPRedirection` answers nil, and there is no second path. A 3xx comes back with its Location, and Python's client decides. See L3 on the test. |
| https only | Pass. `parse` (net.get's) refuses any scheme but https and any empty host before a request is made. No ATS exception in any Info.plist (grep of pywidget/ios: none). |
| Certificate checks | Pass. Neither the session nor `RawLoader` implements a server-trust challenge, so the system's default handling applies: Apple's trust store, user-installed roots, revocation. |
| CertificateRejected / TransportSecurityRefused | Codes -1201 to -1204 and -1022 are right. -1200 is too wide: **M1**. |
| Widget <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> | Pass. LaneDeviceRouter answers NotAvailableHere for `net.request` and still routes `net.get`; the test proves nothing was sent. |
| Repeated headers | Pass for the shim's clients (below), with limits in L1. |
| Timeouts | Pass. A whole-request timer from `start` (it includes connect), the same figure as URLRequest's idle limit, and the session's 60 s resource <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>. That is what my T-3400 M2 fix needs from Swift; the fix itself is in the shim (note on T-4303). |
| Caps | As documented: request inline 512 KiB, reply body 1 MiB, reply 2 MiB, counted before it is built (`rawReplySize`, tested as an upper bound). `body_file` is T-3821. |
| Privacy | Pass. No message holds the path or query (tested); cookies are neither stored nor sent by URLSession. |

</div>


### Repeated headers against http.client, urllib3 and http.cookiejar

URLSession holds headers in a dictionary, so "repeats kept, in order" (my docstring) cannot be met. Idris's choice
is the right one. A field joined with ", " means the same thing under RFC 9110 s5.3. `http.client` and urllib3's
`HTTPHeaderDict` read a joined value the way they read separate lines. `requests` joins repeats with ", " anyway.
Set-Cookie is the one field that cannot be joined. It comes back split, one pair per cookie in order, and `_frame`
writes each pair as its own line, so `http.cookiejar` (`get_all("Set-Cookie")`) and requests' jar see each cookie
on its own line. A repeated request Cookie joined with "; " is what RFC 6265 s5.4 sends. Order between different
names is lost; no client of ours reads it.

## Findings

**M1 (Medium). -1200 is not only App Transport Security.** `requestFailure` calls every
`NSURLErrorSecureConnectionFailed` TransportSecurityRefused, with a message that names the cause ("needs TLS 1.2 or
later with forward secrecy"). -1200 is Apple's general TLS failure. Its userInfo carries the SecureTransport code
(`_kCFStreamErrorCodeKey`). With ATS on, a certificate failure can arrive as -1200 rather than -1202:
errSSLXCertChainInvalid -9807, errSSLBadCert -9808, errSSLUnknownRootCert -9812, errSSLNoRootCert -9813,
errSSLCertExpired -9814, errSSLCertNotYetValid -9815, usually with the peer trust or chain in userInfo. -1200 also
covers a handshake that a network box resets. So a script calling a home server with a self-signed certificate may
be told the server's TLS is too old. That is the wrong class and a wrong diagnosis, and the shim's contract keeps
the two apart on purpose. I have not proven this on our phone; the stub cannot. Fix: on -1200, read the underlying
code (and the trust keys), call the certificate range CertificateRejected, keep TransportSecurityRefused for the
rest, and word its message as what the phone requires, not as what the server did ("the phone refused the secure
connection to HOST; it needs TLS 1.2 or later with forward secrecy"). Add a unit case for each with a stubbed
userInfo, and two phone cases on T-4203 (a self-signed host and a TLS 1.0 host).

**L1 (Low). Where the Set-Cookie split can cut a real cookie.** The split is right for every cookie RFC 6265
allows, and the Expires date is handled. Two cases it gets wrong, both outside RFC 6265 but sent by real servers:
- an unquoted value holding ", name=" (`prefs=lang=en, theme=dark`) becomes two cookies;
- a cookie after the first whose name is not a token, or that has a space before "=", or that has no name, is
  merged into the cookie before it.

No public URLSession API returns the field lines, so I see no better source. Change the comment "a cookie value
holds no comma" to "a cookie value may not hold a comma" and name both cases. I will document them in the shim's
contract (T-4303 note).

**L2 (Low). A URL with user info is accepted.** `https://user:pass@host/` passes net.get's `parse`. URLSession can
answer a 401 Basic challenge with those credentials itself, which hides the challenge from Python's auth handlers.
The shim never sends user info, so refuse it in `parseRequest` (ValueError, the message naming no part of the URL).

**L3 (Low). The redirect test covers only the fallback.** The stub ends the load after `wasRedirectedTo` without
a response, so the test passes through `response ?? redirect` with an empty body. The comment says Apple's docs give
the 3xx a nil body; Apple's documentation for the completion handler says that passing nil returns the body of the
redirect response. That native path (`didReceive response` with the 3xx, then its body) has no test. Fix the
comment, add a stub case that delivers the 3xx response and a body after the refusal, and add a 302 to T-4203.

Not a finding: the packet and commit message name `BridgeTests.testSystlsSendMeetsNetRequest`; both bridge tests
are in `NetRequestTests`.

## For the shim (note on T-4303, mine; I do not edit the shim here)

1. M2: Swift's `timeout` is whole-request, from before connect. The shim should send connect + read (with read
   None, the default), cut to the run's budget. Swift needs no change.
2. The docstring's "headers ... repeats kept" (both ways) is now false. Rewrite it to what Swift does: joined with
   ", " under RFC 9110 s5.3, Set-Cookie split one per cookie, request Cookie joined with "; ", order between names
   not kept, and the two L1 cases.
3. `_frame` drops Content-Encoding on every reply. If Python asks for an encoding URLSession does not decode (urllib3
   adds `zstd` when `zstandard` imports, `br` when a brotli module does), compressed bytes go to the script as plain
   ones. Before sending, remove any coding from Accept-Encoding that URLSession does not decode, or drop
   Content-Encoding only for gzip, deflate and br.

## Phone checks to add to T-4203

A self-signed host and a TLS 1.0 or 1.1 host (M1: which class each gets); a 302 with a body (L3); a POST with an
empty body (whether URLSession sends `Content-Length: 0`); `Authorization: Bearer` reaching the server. Apple lists
Authorization among the headers the URL Loading System manages; it reaches the stub, but the stub is not CFNetwork.
{% endraw %}

</div>
