---
layout: "default"
title: "C13 review: pywidget.http and the github fallback (T-0423)"
section: "documents"
description: "Not ready for the alpha build until H1 is fixed. H1 is a leak of a URL&#x27;s query (where API keys go) into the run&#x27;s error record and traceback. M1 to M3 should be fixed before Day 10 too, or accepted in writing by Ines\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/http-c13-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/reviews/http-c13-review-odalys.md</code></span></div><h1>C13 review: pywidget.http and the github fallback (T-0423)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys. Written 2026-10-28 02:41 ET. Commit under review: 18310b6a (T-0394, Pernille), read from
the code alone; the author's reasoning was not given to me.

Files read at HEAD (0870bd1e):

- `pywidget/ios/App/Runtime/pywidget/http.py`: unchanged since 18310b6a.
- `pywidget/widgets/premade/github.py`: one later commit (64763475, T-0509) that changes only the medium
  layout's "Pushed" row (lines 156-161). The fetch and fallback code is the same as in 18310b6a.
- `pywidget/tests/widgets/test_http_bundle.py`: unchanged since 18310b6a.

For context only: `_pywidget_runtime/runner.py` (how a run's error is recorded), `_premade.py` (stamp, timeline),
`pywidget_ui` Timeline (stale mark).

## Verdict

**Not ready for the alpha build until H1 is fixed.** H1 is a leak of a URL's query (where API keys go) into the
run's error record and traceback. M1 to M3 should be fixed before Day 10 too, or accepted in writing by Ines.
Everything else is Low.

What <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> (each one checked, not assumed):

1. Nothing is printed except the one plain-http warning. No URL, header or body goes to stdout or stderr.
   That is in the code (http.py:174-179 is the only print) and tested (test file :470-476).
2. The cache file holds no request header, no Set-Cookie and no address. Its name is sha256 of the URL
   (http.py:282-298; test :436-449).
3. TLS: `ssl.create_default_context` with certifi, so verification and hostname checks are on. A bad
   certificate raises SSLCertVerificationError and never falls back to the cache (http.py:182-187, 268-269;
   test :461-468, untrusted CA and wrong host).
4. The 10 MiB <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> works with and without Content-Length. Accept-Encoding is identity, so the cap counts the
   bytes kept (http.py:206-234; test :422-426).
5. A redirect to another origin (scheme, host or port) drops Authorization, Cookie and Proxy-Authorization
   (http.py:261-262). There are at most 5 redirects. 303, and 301/302 after a POST, become a GET with no body.
6. HTTPStatusError, Offline, TimeoutError and the size error name the host only, in their own message.
7. github.py honesty: when a fetch fails, the old cache comes back with its old `fetched_at`. `plan()` hands
   that time to the timeline as `sampled_at` (github.py:191-192). The medium family shows "as of" or "Last
   read" (`stamp`). Every family gets the renderer's stale mark 45 min after the reading. A 403, 429, drop,
   non-JSON answer or missing module never writes a new `fetched_at`. **Stale data is not shown as fresh.**
8. Privacy: the module adds only `User-Agent: PyWidget-iOS` and `Accept-Encoding: identity`. github.py sends
   the repo path, its own User-Agent, Accept, the API version and the person's own token if they stored one.
   The token goes only to api.github.com. That is what the widget needs and nothing more.

## Test runs (foreground, this machine)

`cd pywidget/tests/widgets && python3 -m unittest test_http_bundle test_bundle_runtime` under macOS
`sandbox-exec` with the profile `http-c13-odalys/no-network.sb`. The profile denies every outbound IP
connection except loopback, and denies the mDNSResponder socket, so no DNS lookup can leave the machine either.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Test runs (foreground, this machine), scrolls sideways" data-n="1" style="--tw:628px" markdown="1">

| Run | Python | Network | Result (n) |
|---|---|---|---|
| 1 | 3.9.6 (/usr/bin/python3) | outbound IP blocked | 39 tests OK, 0 skipped |
| 2 | 3.13.18 (Homebrew) | outbound IP blocked | 39 tests OK, 0 skipped |
| 3 | 3.9.6 | outbound IP and DNS blocked | 39 tests OK, 0 skipped |
| 4 | 3.13.18 | outbound IP and DNS blocked | 39 tests OK, 0 skipped |

</div>


The guard does fail a real connect. Under the profile, `connect(("1.1.1.1", 443))` and
`connect(("140.82.112.6", 443))` raise `[Errno 1] Operation not permitted`, `getaddrinfo("api.github.com")`
fails, and a loopback connect succeeds. Without the profile, both outside connects succeed on this machine, so
the network was really there to be blocked. **No test touches the real network.**

One run that did not count: my first DNS-blocking profile listed the unix-socket deny after the loopback allow.
That denied loopback as well, and 15 of 39 tests failed with PermissionError on 127.0.0.1. The fault was in the
profile, not the suite. I fixed the rule order and reran (runs 3 and 4).

## Findings

### High

**H1. A URL's query (an API key) reaches the run's error record through the exception chain.**
http.py:202 passes the target to `http.client.putrequest`. When the URL holds a space or a control character
(for example `?q=New York&key=...` built by hand rather than through `params=`), http.client raises
`InvalidURL("URL can't contain control characters. '/v1?q=New York&key=<KEY>' ...")`. http.py:272-273 catches it
as an HTTPException and raises `Offline(...) from exc`. The Offline message is clean, but the runner records
`cause` and `context` with their messages, plus a `text` traceback that prints the chain
(`_pywidget_runtime/runner.py:558, 572-582`). The key therefore lands in the error the person sees and in the
run record.

Measured with `http-c13-odalys/probe.py` (P1, n=1, deterministic): `str(e)` holds the key: False.
`str(e.__cause__)` holds the key: True. The formatted traceback holds the key: True.

It is also misfiled. No connection was ever made, yet the error says "could not reach 127.0.0.1". Because it is
Offline, `get(..., cache_for=...)` would answer from the cache for a URL that can never be sent.

Fix:
- (a) In `_split`, reject a target with any character in `[\x00-\x20\x7f]` or any non-ASCII character. Raise a
  ValueError that does not repeat the URL, for example "url holds a space or control character; pass the
  query as params= or quote it". Then http.client never sees it.
- (b) In `_fetch`, raise Offline and TimeoutError outside the `except` block, so neither `__cause__` nor
  `__context__` carries the original. `from None` is not enough: the runner serializes `__context__` even when
  it is suppressed (runner.py:580).
- (c) Add a test: a URL with a space and a secret in the query. Assert the secret is absent from `str(e)`,
  from every message in the cause and context chain, and from `traceback.format_exception`. Assert the
  exception is a ValueError, not Offline.

### Medium

**M1. `timeout` is not the whole request. A slow server can hold a run about 10 times past it.**
The deadline is checked only before connecting (http.py:193-195) and between body reads (:222-228). Inside
`HTTPSConnection(..., timeout=left)`, each socket operation gets the full `left` again. That covers the
connect to each address `getaddrinfo` returns, the TLS handshake, and every `recv` inside `getresponse()`
(:213) and inside a chunk-size line. So a server that drips header bytes keeps the request alive for as long as
it likes, within http.client's 64 KiB line and 100-header limits. DNS (`getaddrinfo`) has no timeout at all.

Measured with `probe.py` P2 (n=1): status line, then one header byte every 0.3 s, `timeout=1`. Result:
TimeoutError after 9.6 s. The docstring (http.py:11-13) promises the opposite. With a run budget, the request overruns
the budget instead of raising TimeoutError in time to fall back to the cache.

The test `drip` (test :140-150, :410-415) drips only the body, which is the one phase that is guarded.

Fix: enforce the deadline per receive. Wrap `conn.sock` after connect, or subclass HTTP(S)Connection and give
the response a socket file whose `readinto` sets `settimeout(deadline - now)` and raises socket.timeout when
it reaches zero or below. Connect to each address yourself with the remaining time. For DNS, run
`getaddrinfo` in a daemon thread and join it with the remaining time. Add a test that drips headers and
asserts `elapsed < timeout + 1`.

**M2. An https:// request follows a redirect to http:// and sends custom headers in clear text.**
http.py:255-266 follows any http(s) Location. When https goes to http, Authorization is dropped (the scheme
is part of the origin). But custom key headers (`X-Api-Key`, `Private-Token`) are still sent, and the answer
comes back over plain text as `source="network"`, where anyone on the path can change it. The only signal is
the once-per-process stderr warning.

Measured with `http-c13-odalys/probe_tls.py` (P4, n=1, local TLS server with a throwaway CA): a 301 to
`http://localhost` was followed. The plain hop received `X-Api-Key`, and the result was status 200,
body `PLAINTEXT`, source network.

Fix: refuse a redirect from https to http. Raise `PyWidgetError("<host> redirected https:// to plain
http://; not followed")` and name the host only. Add a test.

**M3. github.py shows "No CI runs" when it did not read the CI runs.**
github.py:83-91 sets `out["ci"] = None` whenever the second request fails (403 rate limit, timeout, drop,
non-JSON). It does the same when the latest run has no final conclusion yet (in progress, queued, skipped,
neutral). The small family then draws "No CI runs" (:149), and medium and accessory silently drop the CI row.
That is a statement of fact from a reading that did not happen, and it replaces the last CI state that was read.

Fix: keep the previous `ci` value (with its own time) when the runs request fails. Use a separate value for
"latest run not finished" (draw "CI running" or keep the last finished conclusion). Draw "No CI runs" only for
a 200 with an empty `workflow_runs`. Add tests for a runs 403 and an in-progress run.

### Low

- **L1. A cross-host redirect keeps custom key headers** (http.py:64, :262; the test asserts it at :399,
  `X-Keep`). Measured in P3 (n=1): on a 127.0.0.1 to localhost redirect, Authorization was dropped and
  X-Api-Key was sent. requests and curl do the same, so this is in line with common practice. Still, the module
  tells authors to keep tokens in the Keychain, and many APIs take them in a custom header. Fix: on a
  cross-origin hop, keep only an allowlist (Accept, Accept-Language, User-Agent, Content-Type), or add
  `follow_redirects=False`. Document whichever is chosen.
- **L2. The cache key ignores request headers** (http.py:316, :327, :333). If the same URL is fetched with two
  different tokens (two accounts), one cache file is shared, and the offline fallback can show account A's
  answer to a call made with account B's token. Fix: put a hash of the Authorization value (never the value) in
  the key.
- **L3. The cache fallback has no maximum age** (http.py:301-308). A week-old answer comes back with
  `source="cache"` and a past `stale_after`. That is honest, but only if the widget checks it. Fix: document it
  in the docstring example, or add `max_stale=`.
- **L4. Server protocol errors count as Offline** (http.py:272): BadStatusLine, LineTooLong, IncompleteRead.
  The server was reached and answered badly. The cache fallback is still labelled, so this is about the label
  only. Fix: raise a PyWidgetError naming the host for HTTPException, and keep Offline for OSError.
- **L5. Memory on a widget run.** A 10 MiB body is held twice (chunks plus the join, :234-235), then
  base64-encoded and JSON-dumped for the cache (:293-295). That peaks around 40 MB. If the run happens inside the
  widget extension, that is above its memory limit, which is commonly cited at about 30 MB. I did not
  measure this on a device. Fix: join into a bytearray, write the cache body raw next to a small JSON header,
  and consider a lower cap in the widget context.
- **L6. The TLS context is rebuilt for every request and every redirect** (http.py:182-187, :197), which
  reparses certifi's CA file each time. Fix: build it once per process.
- **L7. github.py takes missing fields as zero** (:76-78). A 200 JSON object without `stargazers_count`
  (a proxy or a changed API) is stored as 0 stars, 0 forks and 0 issues with a fresh `fetched_at`. Fix: require
  the keys (and `full_name` equal to the repo, ignoring case), or else keep the old cache.
- **L8. github.py does not validate the repo string** (:95-98). `owner/na me` or `owner/x?y` passes. A space
  then hits H1's path, with the repo name rather than a secret in the chain. Fix: match
  `^[A-Za-z0-9-]{1,39}/[A-Za-z0-9._-]{1,100}$`, or else status "empty".
- **L9. A rate limit is shown as "could not be reached".** github.py:137 says "GitHub could not be reached;
  trying again soon." after a 403 or 429 with no cache. Fix: a separate line, "GitHub asked us to wait;
  trying again at <time>", using `backoff_until`.
- **L10. Test gaps.** No test for a cached reading followed by a failure (test :564-569 covers only empty
  caches), so the stale path in item 7 is verified by reading, not by test. Nothing covers H1, M1 (headers),
  M2 or M3. The Offline test (:428-434) checks only `str(e)`, not the chain.

## Board lines

Each High and Medium is a line for Pernille, added before "## Report overhaul": T-0520 (H1), T-0521 (M1),
T-0522 (M2), T-0523 (M3). The Lows are left to Pernille's judgement and are not on the board.

## Reproducing

```
cd pywidget/docs/reviews/http-c13-odalys
python3 -I probe.py "$REPO/pywidget/ios/App/Runtime"                         # P1, P2, P3
openssl req -x509 -newkey ec -pkeyopt ec_paramgen_curve:prime256v1 -nodes -subj /CN=localhost \
  -addext "subjectAltName=DNS:localhost" -keyout /tmp/k.pem -out /tmp/c.pem -days 1
python3 -I probe_tls.py "$REPO/pywidget/ios/App/Runtime" /tmp/c.pem /tmp/k.pem # P4
cd "$REPO/pywidget/tests/widgets" && sandbox-exec -f ../../docs/reviews/http-c13-odalys/no-network.sb \
  python3 -m unittest test_http_bundle test_bundle_runtime
```

The probes open only 127.0.0.1 and localhost sockets.

## Re-review of 709fbdf8 (T-0524), 2026-10-28

Reviewer: Odalys. Written 2026-10-28 03:00 ET. Commit under review: 709fbdf8 (Pernille: T-0520, T-0521, T-0522),
read from the diff and the code at HEAD 39c1492d alone. New probe: `http-c13-odalys/probe_rr.py` (R1 to R6,
local sockets only, throwaway CA). Every probe below was run on 3.9.6 and 3.13.18; both gave the same result.

### Verdict

**Ready for the alpha build, with one Medium (N1) to fix before Day 10 or accept in writing.** H1, M1 and M2 are
closed. The fix leaks no thread past the resolver and no socket, and adds no path for request contents. N1 is a gap
left in M1: for a `Connection: close` answer the deadline timer is cancelled before the body is read.

### The three findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: The three findings, scrolls sideways" data-n="1" style="--tw:1176px" markdown="1">

| Finding | Probe (n) | Before (18310b6a) | Now (709fbdf8) | State |
|---|---|---|---|---|
| H1 | P1 (1 per Python); R1 space, tab, DEL, non-ASCII, NBSP, and a server `Location` holding a space (1 each) | Offline; key in `__cause__` and traceback | ValueError (UnicodeEncodeError for non-ASCII); no secret in str, args, cause, context or formatted traceback; chain depth 0 | **Closed** |
| M1 | P2 (1 per Python); R3 header drip, TLS handshake stall, connect with no reply, body stall (3 each, timeout=1) | header drip 9.6 s | 1.03 to 1.15 s; the other phases 1.00 s | **Closed**, except N1 |
| M2 | P4 (1 per Python); R2 (1) | followed; X-Api-Key sent in clear; 200 from network | PyWidgetError "localhost redirected https:// to plain http://; not followed"; the plain server got 0 connections; no secret in the chain | **Closed** |

</div>


P3 (L1, a custom key header crosses hosts) is unchanged, as expected: X-Api-Key is still sent on the second hop.

### Leaks and races in the new code

1. Sockets and timer threads (R4, n=60: 30 header drips, 30 TLS handshake stalls, timeout=0.3, all TimeoutError).
   Open fds 7 -> 7 (3.9) and 6 -> 6 (3.13); threads 1 -> 1; ResourceWarnings 0. The timer is cancelled in
   `close()`, which `_once` always calls in `finally`; a timer left behind would end at the deadline anyway.
2. DNS threads (R5, n=50, a resolver that hangs until released, timeout=0.1). Each request raised TimeoutError
   in time. Threads 1 -> 51 while the resolver hung, back to 1 once it returned. So the threads pile up, one per
   lookup, for as long as the resolver hangs, and no longer. See N2.
3. Timer against a closed or reused socket (R6, n=400 per Python, deadline set to land within the server's
   10 to 30 ms delay, while a second thread opened and checked socket pairs non-stop). 380/385 TimeoutError,
   20/15 status 200, 0 Offline, 0 churn sockets harmed. At the Python level a closed socket's fd is -1, so a late
   `shutdown` raises EBADF and is swallowed. A narrow C-level window remains; see N3.
4. Request contents. Every new error is built from the host, the timeout, or fixed text. `_resolve` re-raises
   the gaierror from its thread, which `_fetch` turns into Offline with no context. The failures are raised
   outside the `except` block, so `__cause__` and `__context__` are None (R1, R2: chain depth 0). Nothing new is
   printed, logged or cached. **No new leak found.**

### New findings

**Medium**

**N1. A `Connection: close` answer cancels the deadline timer, so a stalled body can run to about twice the
timeout.** When an answer will close the connection (`Connection: close`, HTTP/1.0, or no length), http.client
calls `conn.close()` inside `getresponse()` and hands the socket to the response. `_Deadline.close()`
(http.py:259-263) then cancels the timer. `conn.sock` is now None, so the body loop skips `settimeout(left)`
(http.py:335-336). Each `read1` then waits for the timeout set at connect (plain) or before the handshake (TLS),
which is close to the whole timeout. Measured in R3 (n=3 per case, per Python), headers sent late and then
nothing:


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: New findings, scrolls sideways" style="--tw:470px" markdown="1">

| Case | Elapsed |
|---|---|
| timeout=1, headers at 0.8 s, Content-Length | 1.00, 1.00, 1.00 s |
| timeout=1, headers at 0.8 s, Connection: close | 1.87 to 1.95 s |
| timeout=3, headers at 2.5 s, Content-Length | 3.00, 3.00, 3.00 s |
| timeout=3, headers at 2.5 s, Connection: close | 5.55 to 5.65 s |

</div>


`timeout` is cut to the run's time left (`_timeout`), so this takes a run past its budget, the case M1 was about.
A drip (bytes keep coming) is still caught by the check between reads; a stall is not.
Fix: keep the timer alive until `_once` ends. Cancel it in `_once`'s `finally` after `conn.close()`, not in
`close()`. Keep the armed socket on the connection (`self._armed`) and call `settimeout(left)` on it in the body
loop when `conn.sock` is None. Add a test: `Connection: close` headers at 0.8 s, then a stall, timeout=1,
assert elapsed < 1.5 s.

**Low**

- **N2. Hung DNS lookups pile up one thread each** (http.py:196-218; R5, 51 threads after 50 lookups). Each
  thread ends when the resolver gives up, so the count is the request rate times the hang. With a few requests
  per widget run that is small, but a script that retries in a loop would build it up fast. Fix: share one
  outstanding lookup per (host, port), or cap outstanding lookups (for example 4) and raise TimeoutError
  at the cap without starting a thread.
- **N3. The timer and `close()` are not serialized** (http.py:248-263). If the deadline fires while `_once` is
  closing the socket, `fire()` can call `shutdown` on an fd that `close()` has just released. From my reading of
  CPython's `sock_shutdown`, the fd is read after the GIL is released. Another thread (a DNS thread, the app)
  could get the same fd number in that window and have its socket shut down. Not reproduced (R6, n=400 per
  Python, 0 harmed); this is from reading the code. Fix: a lock in `_Deadline`, plus a `closed` flag that
  `fire()` checks and `close()` sets while holding the lock, before the timer is cancelled.
- **N4. A bad `Location` from the server escapes as ValueError with advice meant for the author** (R1: "pass
  query values through params="). The ValueError is not Offline, so `get(..., cache_for=)` raises instead of
  using the cache. Non-ASCII in a URL still reaches http.client and comes back as a UnicodeEncodeError. It holds
  no secret in its message, but its `.object` is the whole request line, key included. H1 fix (a) asked for
  non-ASCII to be refused too. Fix: refuse non-ASCII in `_split`. Turn a ValueError from `_split(nxt)` into a
  PyWidgetError, for example "<host> sent a redirect address that cannot be sent".

### Test runs (foreground, network blocked)

`sandbox-exec -f http-c13-odalys/no-network.sb`. Under it, `connect(("1.1.1.1", 443))` raised `[Errno 1]
Operation not permitted`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Test runs (foreground, network blocked), scrolls sideways" data-n="1" style="--tw:513px" markdown="1">

| Run | Python | Suite | Result (n) |
|---|---|---|---|
| 1 | 3.9.6 | test_http_bundle + test_bundle_runtime | 42 OK |
| 2 | 3.9.6 | widgets (`unittest discover`) | 96 OK |
| 3 | 3.13.18 | test_http_bundle + test_bundle_runtime | 42 OK |
| 4 | 3.13.18 | widgets (`unittest discover`) | 96 OK |

</div>


The new tests cover H1 (five URL forms, the whole chain), M1 (header drip, slow DNS) and M2. None covers N1.

### Board lines

N1 is T-0525 for Pernille. N2 to N4 are Low and left to Pernille's judgement.

Reproduce: `python3 -I http-c13-odalys/probe_rr.py "$REPO/pywidget/ios/App/Runtime" /tmp/c.pem /tmp/k.pem`
(certificate as in "Reproducing" above).
{% endraw %}

</div>
