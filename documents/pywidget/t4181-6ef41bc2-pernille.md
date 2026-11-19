---
layout: "default"
title: "Review of T-4181 at 6ef41bc2 (T-4750): the Swift replay of c2_calls.json&#x27;s net.get cases"
section: "documents"
description: "PASS with findings. The replay covers every swift: true net.get case in c2_calls.json (six of six; the seventh is Python-only by rule 11), it compares the whole reply and what was sent, it cannot pass on an unstaged\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4181-6ef41bc2-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 29 · Thu Nov 19</span><span><code>pywidget/docs/reviews/t4181-6ef41bc2-pernille.md</code></span></div><h1>Review of T-4181 at 6ef41bc2 (T-4750): the Swift replay of c2_calls.json's net.get cases</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4936, Commandment 13). Author: Idris. Reviewed: 6ef41bc26a (ios/Tests/NetFetchTests.swift
`testEveryNetGetCaseOfTheC2FixtureReplays`, docs/research/C2-device-api.md s6a) and 3b62717918
(ios/Tests/mutants-t4750.json, the same doc paragraph). `git log --grep=T-4750 main` shows no other T-4750 commit (the
third hit, dfd70d5b80, is my T-4600 review). Also read, for what the replay leans on: the fixture
tests/device/fixtures/c2_calls.json (rule 19, `given_keys.net`, every case with a `net` exchange), Shared/NetFetch.swift
(`Limits`, `limits`, `inExtension`, `parse`, `reply`, `failure(for:)`, `run`, `Loader`), Shared/Bridge/NetCall.swift,
Shared/Bridge/LaneDevice.swift:38-39, App/Device/DeviceRouter.swift:21, the `NetStub` URLProtocol and
`testNetGetThroughTheRouter` in NetFetchTests.swift, ExtensionRuntimeTests' <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> router test, and tools/land_mutants.py.
Paths are under pywidget/ unless they start with tools/. main was fbf1569bf2 when I read it; NetFetchTests.swift,
NetFetch.swift, c2_calls.json and mutants-t4750.json are unchanged on main since 3b62717918. Date: 2026-11-18.

What I ran:
- The fixture, by script: 7 cases have a `net` exchange, all `get`. 6 have a `swift: true` exchange (`net.get`,
  `.headers_sent`, `.not_found_is_an_answer`, `.extension_hang_cut_to_3s`, `.extension_answer`, `.offline`), each with
  one exchange and a `given.net`. The seventh, `net.get.reply_bad_status`, is `swift: false` with no `given.net`: a
  malformed reply Python must refuse, Python-only under rule 11. No case uses `net.request`.
- Each `find` of mutants-t4750.json against the files: each occurs exactly once (control, M1, M2, M3).
- `tools/land_mutants.py status --id t4750-idris` and the four result.json files on origin/macbook-results (runner 30,
  Xcode 27.2, the base 3b62717918): control passed (1 test, 0 failures); M1, M2 and M3 KILLED, and the failure lines are
  the right ones (below).
- One probe of my own (see L1), `NetCall.handle` passing `limits: .app`, planted here after `xcodegen generate` and run
  with `XC_LOCAL=1 XC_TASK=T-4936 tools/xc.sh ... test` on the replay, `testNetGetThroughTheRouter` and
  ExtensionRuntimeTests: it NEVER RAN. It waited over 20 minutes for this Mac's one-xcodebuild lock behind other
  workers' builds and my shell's time limit stopped it before xcodebuild started; no verdict. I restored NetCall.swift.
  L1 therefore rests on reading the call path, not on a red or green run.

## What holds

- Coverage: the replay's filter (`swift == true`, module `net`, method `get`) picks exactly the six cases above, and the
  count it checks is derived from the fixture with the same filter plus a floor of 6, so a seventh Swift case is
  replayed or the test fails. Every one of the six is staged from its own `given.net`: `answer` as a status, headers
  and body; `hang`; `fail` as an NSURLErrorDomain code. Anything else is an explicit XCTFail, not a skip.
- It cannot pass on a missed stage: NetStub answers an unstaged host+path with -1003, which is Offline with native
  [NSURLErrorDomain, -1003]; that differs from every fixture reply, including `.offline`'s -1009.
- The comparison is the whole reply as NSDictionary: class, message (host only, and the hang's "within 3 s" carries the
  <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>), `fix`, `native` for Offline, status, headers and text for answers. Only a TimeoutError's `native` is dropped,
  which is what fixture rule 19 says (NetFetch's deadline and URLSession's fire together).
- What was sent is checked: exactly one request, the fixture's URL (query included), GET, and every header the args
  name (`X-Api-Key` in `.headers_sent`).
- The hang must end between min(asked, cap) - 0.5 and + 2 s: for `.extension_hang_cut_to_3s`, asked 19.25, between
  2.5 and 5 s. A run that used the app's 60 s cap would take 19.25 s and fail on both the time and the message.
- Limits are restored by a teardown block, so a throw mid-loop does not leave `.widgetExtension` set for later tests.
- The mutants die for the right reasons, from the runner's failure lines:
  M1 (offline's exchange no longer swift): NetFetchTests.swift:396, "5 is less than 6", the floor.
  M2 (the replay skips `net.get.offline`): :395, "5 is not equal to 6", replayed against eligible (2 failures: the
  floor fires too, see L3).
  M3 (`NetFetch.run` ignores `NetFetch.limits`): :374, "19.25499701499939 is not less than 5.0 ...
  the deadline was not cut to 3.0 s", plus the message mismatch.
  The control stayed green on the same base, so the replay is green on the code it reviews.
- The doc paragraph (C2-device-api.md s6a) names the test, the six cases, the floor and the mutants file, and says
  what the replay compares; it matches the code.

## Findings

### L1 (Low): the replay sets the extension's limits itself, so what chooses them in the real widget lane is outside it

NetFetchTests.swift:355 sets `NetFetch.limits` from `given.net.extension` and :363 calls `NetFetch.run` directly. In the
product, both lanes reach `net.get` through `NetCall.handle` (Shared/Bridge/NetCall.swift:17; the extension through
LaneDevice.swift:38-39), which calls `NetFetch.run(call.payload)` with no limits, and the extension's 3 s cut then rests
on the `limits` getter falling back to `inExtension` (NetFetch.swift:59, :66-68: `Bundle.main.bundleURL.pathExtension
== "appex"`). Neither link is on the replay's path, and in the unit test host both answer `.app`, so no unit test I found
can tell. So a mutant of `NetCall.handle` passing `limits: .app` (the widget lane loses its 3 s cap and its 256 KiB body cap)
would leave the replay green by construction: the replay never calls NetCall. I tried to run it and could not (the
lock wait above), so the rest of the unit suite's answer to it is unmeasured. The only check of the real chain is T-0687 (a)'s one-off extension run (UITests/ExtensionMemoryTests.swift,
by run-ext.sh, not in any gate). The harm is bounded: in the lane Python's 2 s budget ends a hung fetch first
(C2-device-api.md s6a), but the body cap is not bounded that way, and the doc's "the app and the extension lane through
the same NetFetch.run" is held only for the second half.
Fix: make the replay enter where the product does. Stage the stub on `NetFetch.session` (as `testNetGetThroughTheRouter`
does) and call `NetCall.handle` with a DeviceCall, and for `extension: true` cases leave `NetFetch.limits` alone and give
the process's choice a seam the test can set (e.g. `NetFetch.processIsExtension` overriding `inExtension`), so the test
exercises the fallback instead of replacing it. Add the NetCall mutant above to mutants-t4750.json.

### L2 (Low): a TimeoutError's `native` is dropped, not checked to be one of the two values rule 19 allows

NetFetchTests.swift:369-371. Rule 19 says `native` is null (NetFetch's deadline) or [NSURLErrorDomain, -1001]
(URLSession's). The replay deletes it from both sides, so a TimeoutError carrying any other native (a wrong domain, a
code from a mapping slip in `failure(for:)` or the Loader's deadline) passes. Fix: before deleting, assert
`g["native"]` is NSNull or equals ["NSURLErrorDomain", -1001].

### L3 (Low): M2 does not isolate the "replayed equals eligible" check

mutants-t4750.json M2 skips one of the six cases, so the floor of 6 (:396) fails as well as :395 (the runner counts 2
failures). Deleting the :395 assertion would leave M2 KILLED by the floor, so nothing shows :395 earns its place; it only
matters once the fixture holds more than six Swift net.get cases. Fix: either a mutant that adds a seventh eligible
case to the fixture (a copy of `net.get` under a new name with its exchange) together with a replay skip of that
name, or say in the mutants file that M2 holds :395 and :396 together.

## Verdict

PASS with findings. The replay covers every `swift: true` net.get case in c2_calls.json (six of six; the seventh is
Python-only by rule 11), it compares the whole reply and what was sent, it cannot pass on an unstaged case, and the
three mutants die on the assertions they name, with a green control on the reviewed base. The three Lows are about
reach, not correctness: L1 (the replay bypasses the router and the process's own choice of limits) is the one worth
doing before the widget lane's net.get ships on a phone; L2 and L3 are small and can ride with it. One board line,
T-5007, carries all three to Idris.
{% endraw %}

</div>
