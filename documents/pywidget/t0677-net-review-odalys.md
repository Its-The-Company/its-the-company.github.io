---
layout: "default"
title: "T-0686: review of 1c47322e (T-0677, pywidget.net.get)"
section: "documents"
description: "Accept for the app (TestFlight). M1 gates the extension lane (T-0675/T-0687), not this commit: in the app the memory is there. Lows are optional."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0677-net-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0677-net-review-odalys.md</code></span></div><h1>T-0686: review of 1c47322e (T-0677, pywidget.net.get)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys, 2026-10-29. Independent review (Commandment 13): I read the diff, C2-device-api.md s6a,
pywidget/docs/reviews/t0677-evidence/test-results.txt and the code the diff calls (PyBridge reply path,
pwbridge.c `pw_call_reply`, DeviceRouter). I did not read the author's notes.

Checks run by me:
1. Host suites `python3 pywidget/tests/run_host.py --both`: 2 interpreters, 32 suites, 2020 tests, 0 failed.
2. Reply size and Python decode peak for a 1 MiB body (host Python 3.9, `tracemalloc`, n = 1 per body; the
   reply built as JSONSerialization builds it: control characters escaped as `\u00XX`, other text raw UTF-8):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:707px" markdown="1">

   | Body (1 MiB) | JSON reply | Python peak in `json.loads(bytes(raw).decode())` | Kept after |
   |---|---|---|---|
   | ASCII `a` | 1.00 MiB | 2.00 MiB | 1.00 MiB |
   | control byte 0x01 | 6.00 MiB | 7.07 MiB | 1.00 MiB |
   | binary, decoded to U+FFFD | 3.00 MiB | 9.00 MiB | 2.00 MiB |

</div>


No Xcode run; the Swift tests in the evidence are Idris's (16 NetFetch cases plus one through the router).

## Verdict

Accept for the app (TestFlight). M1 gates the extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> (T-0675/T-0687), not this commit: in the app the
memory is there. Lows are optional.

What <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>:
- https only, in Python (net.py:94) and again in Swift (NetFetch.swift:58), and for every redirect hop
  (NetFetch.swift:251). ATS applies on top. A redirect to http:// is never requested (tested).
- At most 5 redirects (count checked before following, NetFetch.swift:250-258).
- Cross-host hop drops Authorization, Cookie and Proxy-Authorization (NetFetch.swift:260-262). Stripped
  headers stay stripped on later hops, since each hop starts from the request returned to URLSession.
- One answer: `finish` takes `done` under the lock and nils it; the deadline, the size cut, the redirect
  refusal and the completion all go through it; later calls are dropped (NetFetch.swift:215-223).
- Whole-request timer from `start`, independent of URLRequest's idle timeout (NetFetch.swift:208). Python
  waits `t + 1 s`, so Swift always answers first; Python cuts `t` to the run budget minus 0.25 s.
- 1 MiB <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> on Content-Length before the body (NetFetch.swift:231) and while streaming, after content
  decoding (NetFetch.swift:239-246), so a gzip bomb stops at 1 MiB of decoded bytes.
- Ephemeral session, no cookie store, no URL cache, `reloadIgnoringLocalAndRemoteCacheData`.
- Privacy (Commandment 6): nothing in NetFetch, NetCall or the router logs; PyBridge logs no device-call
  payload. Error messages carry `comps.host` only (no userinfo, path or query), in Swift and in Python.
- net.py imports only `json`, `_wire`, `errors` (no ssl/urllib/http), tested on both interpreters.
- `TimeoutError` in BUILTIN_ERRORS; the mutant entry was updated with it.

## Findings

### M1 (Medium). The 1 MiB cap can cost about 20 MiB at once, not "about four times over"

C2 s6a says the body "is held about four times over (Data, String, the JSON reply, the Python str)" and
picks 1 MiB for a process with a 15 MB cold-peak target. That holds for ASCII only. Measured above:

- A body of control characters (valid UTF-8, so no U+FFFD) becomes a 6 MiB reply, because each byte is
  escaped as six. Python's decode peaks at 7.07 MiB.
- A binary body (an image fetched by mistake) decodes to U+FFFD per bad byte: 3 MiB of UTF-8 in Swift's
  String and in the reply, and a 9.00 MiB peak in Python (U+FFFD forces 2 bytes per character).

Adding the Swift side at reply time (body 1 MiB, `Answer.text` 1-3 MiB, the reply Data 3-6 MiB) and the
copy `pw_call_reply` posts to the slot (pwbridge.c:227, `post_slot`, which by its name holds the bytes until
Python takes them: I did not read its body), the transient total is roughly 19-21 MiB. That is my sum of the
parts, not a measurement of one process.

Failure scenario: inside the widget extension (T-0675), a `"lane": "widget"` script fetches a URL that
returns 1 MiB of binary or control bytes. On top of the runtime's cold peak, the extension passes its memory
limit and iOS <span title="A test written in advance. If it fires, we drop the idea.">kills</span> it; the widget draws nothing new and the person sees no error. In the app there is room,
so this commit is fine there.

Fix direction (Idris decides, before T-0687 runs it in the extension): cap the reply rather than the body
(refuse when the JSON reply passes N bytes), or lower the cap inside the extension (as the 3 s timeout is
lowered), then measure peak RSS in the extension with the three bodies above, n >= 6 each, and put the
numbers in C2 s6a beside the cap.

### L1 (Low). Custom secret headers go to another host on a redirect

NetFetch.swift:260-262 strips only Authorization, Cookie and Proxy-Authorization; the test asserts a custom
header is forwarded (NetFetchTests.swift:192, `X-Keep`). Many APIs take their key in `X-API-Key`,
`apikey` or `X-Auth-Token`. A server (or a compromised CDN entry) that redirects cross-host receives the key.
This matches Python requests and browsers, so it is not a defect; but net.py's docstring says only "drops
Authorization and Cookie". Suggest one sentence in the docstring and C2 s6a: other headers are sent to the
new host. Same host on another port keeps Authorization (the check compares hosts only); also worth a line.

### L2 (Low). A stopped run leaves its request running to the deadline

When the person presses Stop, or the budget stops the run, while `net.get` waits, the URLSession task is not
cancelled; it runs to its own deadline (up to 60 s in the app) and its reply goes to a dead wait. Bounded and
harmless; noted so T-0675's extension bridge cancels on stop if it can.

### L3 (Low). The deadline closure keeps each Loader for the full timeout

NetFetch.swift:208 captures `self` strongly in a non-cancellable `asyncAfter`; a request answered in 50 ms
keeps its Loader (small: `body` is emptied in `finish`) until its timeout, up to 60 s. A script that calls
`net.get` in a tight loop holds one Loader per call for a minute. A `DispatchWorkItem` cancelled in `finish`
would release it at once.

### L4 (Low). Duplicate header names differing in case

`headers={"Accept": "a", "accept": "b"}` passes both checks; `setValue` is case-insensitive, so the one sent
depends on dictionary order. Python could refuse duplicates by lower-cased name.

## Not checked

- Any run from inside the extension process (waits on T-0675; T-0687 owns it).
- Real network and real ATS behaviour (tests use a URLProtocol stub, correctly for CI).
- NetFetchTests.swift beyond the stub and the redirect, size and timeout cases (lines 1-200).
{% endraw %}

</div>
