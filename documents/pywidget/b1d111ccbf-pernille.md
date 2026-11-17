---
layout: "default"
title: "Review of b1d111ccbf: T-0687 (b), net.get cases in c2_calls.json and the host stub pywidget/net.py"
section: "documents"
description: "The Python half does what it says. The ten net.get cases are a real part of the contract: the replay checks the payload (compact, sorted), the timeout Python sends and the wait it uses, each to 1e-6, and the error\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/b1d111ccbf-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/b1d111ccbf-pernille.md</code></span></div><h1>Review of b1d111ccbf: T-0687 (b), net.get cases in c2_calls.json and the host stub pywidget/net.py</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4600, Commandment 13). Author: Idris. Reviewed: b1d111ccbf as a whole
(`pywidget/ios/python-stubs/pywidget/_host.py`, `pywidget/ios/python-stubs/pywidget/net.py`,
`pywidget/tests/device/c2_calls_build.py`, `pywidget/tests/device/fixtures/c2_calls.json`,
`pywidget/tests/device/test_device_modules.py`), against the fixture's own rule 19, the runtime module it mirrors
(`pywidget/ios/App/Runtime/pywidget/net.py`) and the Swift side (`pywidget/ios/Shared/NetFetch.swift`). Line numbers
are at b1d111ccbf. Date: 2026-11-17.

"Rule 19" here is the fixture's rule 19 (`c2_calls_build.py:98`), not the charter's.

Since then on main: no commit touches any of the five files (`git log b1d111ccbf..HEAD` on them is empty). The
runtime `net.py` changed once after it (6d64e84bfe, T-4494): one docstring line about the default <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>. No behaviour.

## Tests run

- At HEAD (309b6c1a36), in the worktree: `run_host.py --both device ios/python-stubs`: `device` 48 tests and
  `ios/python-stubs` 34, OK on Python 3.9.6 and 3.13.18 (164 in all, the count the commit message gives). pytest is
  not installed for either interpreter, so these ran under unittest through `run_host.py`. Root `tests/run.sh` does
  not cover `pywidget/tests/device`.
- Fixture regenerated in scratch: `c2_calls_build.py` at b1d111ccbf, `render()` written to a scratch file:
  byte-identical to the committed fixture (263 cases, 48 methods), and to the fixture at HEAD.
  `TestFixtureCases.test_fixture_is_what_the_builder_writes` holds the same thing on every run.
- Mutants, in a scratch copy of `pywidget/` (never the tree), `TestFixtureCases` + `TestNetStubReplaysTheFixture`
  (+ `test_net` for the runtime header check) on 3.9.6:
  - Killed: stub without the extension's 3 s cut; stub without the https check; stub answering an unknown URL
    `PyWidgetError` instead of `Offline`; stub accepting `timeout=0`; stub naming the URL (not the host) in its
    timeout message; runtime `MARGIN_S` 0.25 -> 0.75 (the fixture pins the timeouts); runtime without the status
    range check; runtime without the header CR/LF check (by `test_net`).
  - Survived: stub without the 256 KiB extension <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> (M2, L3); stub without the `headers` dict check (M2); stub
    decoding latin-1 instead of UTF-8 (L2); stub naming the URL in the `state.offline` message (L3).
- Probes of the stub against the runtime and NetFetch (scratch script, nothing kept): listed in M2 and L2.

No Xcode run: nothing in this commit is Swift, and the Swift replay the fixture names is not in the tree (M1).

## Verdict: PASS with findings

The Python half does what it says. The ten `net.get` cases are a real part of the contract: the replay checks the
payload (compact, sorted), the timeout Python sends and the wait it uses, each to 1e-6, and the error class, builtin
base, native and message. The fixture is what the builder writes. The stub replays the eight cases it can stage and
gets the classes and messages right, including the host-only messages (the `?key=secret` URLs are there to show
it). Nothing is logged by the stub or the tests (C6): the stub has no print or logging, and every message names the
host only. The commit message is honest that the Swift replay was written, not run, and left out.

Two things stop the work from being the whole of T-0687 (b), "so both halves replay one fixture". The Swift half
replays none of these cases, though rule 19 says NetFetchTests does (M1). And the stub accepts several things the
phone refuses, and nothing tests that (M2). Neither is a crash or a privacy fault, and nothing here reaches a
person by itself, so neither blocks TestFlight for T-4181. But T-0687 should not be ticked on (b) until M1 lands.

## Findings

### M1. Rule 19 says the Swift replay answers given.net from NetFetchTests; no Swift test replays any net case

- Where: `c2_calls_build.py:98-105` (rule 19, last sentence: "The Swift replay answers given.net from a URLProtocol
  stub (NetFetchTests)"), `GIVEN_KEYS["net"]` (`:125-126`), and the ten cases at `:987-1021`, six of them with
  `swift: true` exchanges.
- In the tree: `pywidget/ios/Tests/NetFetchTests.swift` was last changed on 10-29 (0c464a26f4) and does not read
  `c2_calls.json`. The Swift replays that do read it (`DeviceModulesTests.swift:30,71`, `DeviceModulesSlice2Tests`,
  `HTTPDeviceTests`) filter by module, so they skip `"net"` without a failure. So the `swift` flags on these
  exchanges promise a check that nothing runs. Nothing on the Swift side holds "within 3 s." for a hang under the
  3 s cut, the `[NSURLErrorDomain, -1009]` native on Offline, the header pass-through of `headers_sent`, or the
  `{status, headers, text}` shape against this fixture.
- The commit message says so ("written, not run ... not in this commit"), so this is not misreporting. But the
  committed contract text says the opposite, and a later reader of the fixture will believe it.
- Fix (Idris): land the NetFetchTests replay: every `net.get*` case with a `swift: true` exchange, `given.net` served
  by the URLProtocol stub, `extension` through `NetFetch.limits`, and a floor on the count (as
  `DeviceModulesTests.swift:74` has), run once through `tools/xc.sh`. Until then, either mark the rule-19 sentence
  "(T-4750, not yet run)" or keep T-0687 open on (b). Board: T-4750.

### M2. The host stub accepts what the phone refuses, and its tests cannot see it

- Where: `python-stubs/pywidget/net.py:77-101` against runtime `net.py:112-125` (`_headers`), `:130-137`
  (`_decode`), `_wire.number` and `NetFetch.swift:20,87-105,180-188`.
- Probed on the stub (each one raises on the phone, before or after Swift):
  - `headers={"a": "1\r\nb: 2"}` returns a Response; the runtime raises ValueError (header injection).
  - `headers={"a": 1}` returns a Response; the runtime raises TypeError.
  - `timeout=float("inf")` returns a Response; the runtime raises ValueError (`_wire.number` wants finite), and Swift
    refuses it too (`NetFetch.swift:88`).
  - A route fed with status 42 returns `Response(42, ...)`; the runtime raises RuntimeError (the fixture's own
    `net.get.reply_bad_status`, which the stub test skips because it is Python-only).
  - In the extension, 100 KiB of `\x01` returns a Response; on the phone it is about 600 KiB escaped, over the
    512 KiB reply cap (`NetFetch.swift:32`), so it raises PyWidgetError.
  - Over 256 KiB in the extension, the stub's message drops Swift's size name: stub "is over 262144 bytes, the most
    ...", Swift "is over 262144 bytes (256 KiB), the most ..." (`NetFetch.swift:181`).
- Why it matters: the stubs exist so a script that passes on a Mac meets the same names and behaviour on the phone
  (`test_device_modules.py:548-550`). A widget that builds a header from its own data, or reads a binary-heavy
  feed, passes on the host and fails on the iPhone. `test_same_names_and_signature` checks names, five constants and
  the signature. `test_every_net_case` runs eight fixture cases, none of them oversize, bad headers or a reply cap.
  So the mutants that drop the stub's 256 KiB cap or its headers check survive.
- Fix (Idris): have the stub share the runtime's argument checks instead of re-typing them (import or copy
  `_headers`, finite `timeout`, status 100-599), apply `REPLY_MAX_BYTES` / `EXTENSION_REPLY_MAX_BYTES` with the
  same escaped count, and use Swift's two size messages word for word. Add stub-side tests for each probe above:
  a CR/LF header, a non-text header value, `inf`, an over-cap body in each process, and a control-heavy body under
  the body cap but over the reply cap. Board: T-4751.

### L1. The fixture now pins net.get's inverted margin (T-3554)

- `net.get.extension_answer` (`c2_calls_build.py:1005`): budget 2.0 s, Python sends `timeout` 1.75 and waits 1.5.
  `net.get.extension_hang_cut_to_3s`: sends 19.75, waits 19.5. Python stops listening 0.25 s before Swift's own
  deadline. That is my T-3477 F5, already on the board as T-3554, and rule 19 now writes it down as the contract.
  In the 2 s extension lane, the case the fixture stages, an answer landing between 1.5 and 1.75 s is lost and the
  script gets `BridgeTimeout`, not the body or net's own TimeoutError. Systls fixed the same thing in T-3553
  (`budget_timeout`: `left - reserve - MARGIN_S`). No new line: T-3554 owns it, and when it lands it must
  regenerate these two cases and reword rule 19's second sentence. The killed `MARGIN_S` mutant shows the fixture
  will force that.

### L2. The stub ignores the charset and the app's 60 s cap

- `net.py:101` always decodes UTF-8. NetFetch decodes by the server's charset (`NetFetch.swift:198-209, 358`).
  Probed: a `charset=iso-8859-1` body "café" gives "caf�" on the stub and "café" on the phone.
- `net.py:89` caps only in the extension. In the app, Swift caps every timeout at 60 s (`appTimeoutCap`,
  `NetFetch.swift:20`). A hang at `timeout=100` says "within 100 s." on the stub and "within 60 s." on the phone.
  Rule 19 does not mention the 60 s cap either.

### L3. Coverage gaps in the fixture, one of them on the privacy path

- No case for: a body over the cap (either process), the reply cap, a redirect to `http://`, a TLS failure
  (PyWidgetError with native, never Offline), a refused header, or `state.offline` / `network_kind == "none"`.
- The last matters for C6: the mutant that puts the full URL (query and key) into the `state.offline` message
  survives, because the fixture's `net.get.offline` reaches the stub's other Offline path (no route). One stub case
  with `offline=True` and a `?key=` URL would hold it.

### L4. Smaller differences from the runtime module

- The stub has no `Response.__repr__` (runtime `net.py:93`), so `print(r)` differs on the host.
- `REPLY_MAX_BYTES`, `EXTENSION_REPLY_MAX_BYTES`, `MARGIN_S` and `GRACE_S` are missing from the stub, and the
  constants test (`test_device_modules.py:609-614`) lists five names by hand. It cannot notice a sixth.
- `TestNetStubReplaysTheFixture` builds its own `answer` lambda (`:632`) instead of the module's `answer`. They
  agree today; one source would keep them that way.

### L5. An IPv6 literal URL is refused in Python, stub and runtime alike

- `net.py:71` (and runtime `_url`): `"[::1]:443".split(":", 1)[0]` is `"["`, so `https://[::1]/` and
  `https://[2001:db8::1]/x` raise "url must name a host". `URLComponents` in NetFetch accepts them. This was already
  there in T-0677; the stub copied it. Rare for a widget, but it is a wrong ValueError. Parse the bracketed host first.

## What is good

- The fixture cases use URLs with `?key=` and assert host-only messages, so a message that leaks the query fails.
- `budget_s_left` in the extension cases tests the real cut chain (script 30 s -> budget 19.75 -> Swift 3 s), and
  the message comes from Swift's cut, not Python's.
- `reply_bad_status` is `swift: False`, correctly: it is a Python decode check, and the stub test skips it for that
  reason rather than faking it.
{% endraw %}

</div>
