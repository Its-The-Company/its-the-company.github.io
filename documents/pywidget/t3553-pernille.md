---
layout: "default"
title: "T-3743: review of 03bf4f46a (T-3553, pywidget.http keeps the run&#x27;s drawing reserve)"
section: "documents"
description: "Verdict: PASS with fixes. The change does what it says for the case its test builds: a request stuck after the TLS handshake ends at remaining - device.BUDGET_RESERVE_S, and the GitHub premade then draws its own\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3553-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 19 · Mon Nov 9</span><span><code>pywidget/docs/reviews/t3553-pernille.md</code></span></div><h1>T-3743: review of 03bf4f46a (T-3553, pywidget.http keeps the run's drawing reserve)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-09. Independent review (Commandment 13), release standard, before the next TestFlight build.
Author: Idris. Scope: `pywidget/ios/App/Runtime/pywidget/http.py`, `pywidget/tests/widgets/test_http_budget_reserve.py`,
the one-paragraph change to [`pywidget/docs/research/C2-device-api.md`](c2-device-api.html).

**Verdict: PASS with fixes.** The change does what it says for the case its test builds: a request stuck after the TLS
handshake ends at `remaining - device.BUDGET_RESERVE_S`, and the GitHub premade then draws its own fallback before
the Stop. The first thing that broke was the clock, not the logic. Two of the cuts that bound a request (the name
lookup and the timer that ends a dripping answer) are timed lock waits. On this Mac those wake up to 150 ms late. That
is 30% of a 0.5 s reserve, and the test only runs the third cut, the socket timeout, which lands within 2 ms (M1).
One Medium, three Lows, two notes.

**Not on main.** 03bf4f46a is on `parked/b3/20261108-224538-55570` and `personal/b47` only (`git merge-base
--is-ancestor 03bf4f46a HEAD` is false at cdba24e31). It must land before the build it is meant for. http.py,
device.py, _wire.py and C2 are unchanged on main since its parent, so it should apply cleanly.

## What I ran

Scratch `/private/tmp/company-scratch/T-3743-pernille` (the Company SSD was not answering). `git archive 03bf4f46a
pywidget` into `tree/`, no Xcode.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran, scrolls sideways" style="--tw:741px" markdown="1">

| run | 3.9.6 | 3.13.18 |
|---|---|---|
| `test_http_budget_reserve` at 03bf4f46a | 7 OK, 6.8 s | 7 OK, 6.2 s |
| same, with the parent's http.py (red run) | | 6 failures, 1 error (matches the commit message) |
| `test_http_bundle` at 03bf4f46a | OK | OK |
| seeded mutant: `_reserve()` returns 0.0 (the import fallback taken in the app) | | 6 failures, 1 error: killed |

</div>


Probes, `probe/*.py` in the scratch folder, budget 1.5 s, so the cut is at 1.0 s. Each line below is
`TimeoutError` ending at:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: What I ran, scrolls sideways" style="--tw:960px" markdown="1">

| what hangs | cut by | ends at (3.9 / 3.13) |
|---|---|---|
| name lookup (`getaddrinfo` never returns) | `_resolve` thread join, http.py:234 | 1.147 / 1.091; again 1.088-1.173 over 3 runs |
| TLS handshake (TCP accepted, no ServerHello) | socket timeout, http.py:317-318 | 1.003 / 1.003 |
| body drips 1 byte per 0.1 s | socket timeout reset per read, http.py:360-364 | 1.003 / 1.002 |
| headers drip 1 byte per 0.1 s | `_Deadline` timer, http.py:278 | 1.131-1.141 (3.13, 3 runs) |
| 0.5 s left (the reserve) | `_time_up`, no connect | 0.000 |

</div>


Bare primitives on the same Mac, 4 runs each: `threading.Event().wait(d)` ends +0.008 to +0.150 s late at
d = 0.25, 1.0 and 4.5 s. A socket `recv` with `settimeout(d)` ends +0.000 to +0.002 s late. This is Darwin timer
coalescing on condition-variable waits, and it does not grow with d.

So DNS, connect, TLS, redirects and body are all inside the one deadline, as the docstring says. Two of them are
imprecise.

## Findings

### M1, Medium: a stuck name lookup or dripping headers end about 150 ms past the cut; the test covers neither

`http.py:234` (`th.join(...)` in `_resolve`) and `http.py:278` (`threading.Timer` in `_Deadline._arm`). Both are
timed lock waits, which overshoot (table above). The socket-timeout paths do not. The new test's hanging server
accepts the TLS handshake and then holds the request, so the only cut it runs is the socket timeout.

Failure scenario: a GitHub widget on Wi-Fi whose DNS server has stopped answering (the usual hanging network: the
resolver retries and never returns). The app's widget pass gives 5 s, and the request is cut at 4.5 s Python time. The
join wakes about 0.15 s later (host figure; a background app on a phone is coalesced at least as hard, unmeasured).
That leaves 0.35 s for Swift's head start on Python's clock (modelled at 0.25 s, never measured: L3) plus the fallback
render. If the head start is 0.25 s, about 0.1 s is left to draw before the Stop. A slower phone misses it, and the
first render stays blank: the bug T-3553 fixes, on a different path. The 2 s gallery preview has the same margin.

Fix: make the two lock-timed cuts land on time.
(a) `_resolve`: wait on a socket, not a lock. The worker writes one byte to a `socket.socketpair()` when it is done;
the caller does `r.settimeout(left); r.recv(1)`. A poll timeout lands within 2 ms here.
(b) `_Deadline`: start the timer early by a fixed slack (for example `deadline - 0.2`, still never below 0). It only
`shutdown`s the socket, and the normal socket timeouts end the request at the deadline anyway, so firing early costs
nothing. Then on `expired` treat the request as timed out (check `conn.expired`, not the clock, in `_fetch`'s
`OSError` branch, http.py:418-420).
Test: add two module cases beside `held`, a resolver that never returns and headers that drip. Assert each ends
under `cut + 0.05`. Both cases are red today by about 0.1 s on this Mac. Show the red run.

### L1, Low: the import fallback is safe today only because `_wire.remaining()` makes the same import

`http.py:173-178`. Inside the app, `_reserve()` can only fall back to 0.0 if `from _pywidget_runtime import device`
fails. `_wire.remaining()` (`_wire.py:46-54`) makes the same import and returns None when it fails, so then there is
no budget at all. A request in a budgeted run cannot get the 0.0 reserve, and the mutant above confirms the tests
would catch it if it could. The real in-app failure (runtime package missing) is unchanged from before T-3553: no
cut, the full 10 s timeout, Stop first, blank render. The stdlib/bundle checks keep `_pywidget_runtime` in the app,
so this is not live.

What is fragile: the two imports agree only by coincidence of code. If `remaining()` ever gets its number another way
(T-3400's shim is the likely place, N1), the 0.0 comes back silently. And where a test or a host stub patches
`_wire._remaining` without the runtime, the messages say "0 s or less of its budget was left, kept to draw".
Fix: one helper in `_wire` that returns the remaining time and the reserve from the single import. http asks it, and
the messages leave out the reserve clause when it is 0.

### L2, Low: the time-out messages a user reads (wording for Maren)

`http.py:196-197` and `http.py:426-430`. What a script that does not catch the error shows in the console:

- `api.github.com did not answer within 1 s; the run's time budget cut the wait to leave 0.5 s to draw`
- `the run's time is up: 0.5 s or less of its budget was left, kept to draw`

Problems: (a) "to draw" is wrong in a Shortcut run, which has a budget and draws nothing. (b) "time is up" while
0.5 s is still left reads as a contradiction. (c) "kept to draw" is not a sentence a user parses. (d) device.py says
the same event a third way (`device.py:79-80`, "the run's time budget had X s left, so the wait was cut to leave
0.5 s to draw"). (e) "did not answer" covers a lookup that never reached the host, which is acceptable in plain
words. Fix: one wording for all three places, set by Maren. A suggestion: `api.github.com did not answer in the 1 s
this run had left; the last 0.5 s is kept so the script can finish`, and for the no-connect case `not sent: this
run has 0.5 s or less left, kept so the script can finish`. The tests assert on "left" and "leave 0.5 s to draw" and
will need the new text.

### L3, Low: the Stop-lag model has the right shape and an unmeasured number

`test_http_budget_reserve.py:43, 187`. How Stop really arrives: `PyBridge.doRun` (`Shared/Bridge/PyBridge.swift:989-1003`)
starts the budget timer, then writes the crash marker, encodes the request and calls `pw_rt_run`, and the runner
resets before `_prepare` sets Python's deadline (`runner.py:1176`). When the timer fires, the stop <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>
`pthread_kill`s SIGURG to the script thread, which trips SIGINT (`pwbridge.c:265-304`), and a `KeyboardInterrupt`
skips the premade's `except Exception`. The driver's `stop_after` clock also starts before the runner's reset, and
the test asserts the Stop was never sent (`stop_dt` None). That holds however Stop is delivered, so the model is
sound in shape.

The number is not measured. `LAG_S = 0.25` stands in for the marker write, the GIL hand-over and the reset on a
phone, and that is still T-3477 F7's open ask. Also the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> in the GitHub case is the one precise cut (M1). Fix: once
M1 is in, run the GitHub case with a resolver that never returns as well as the held request. When the MacBook runner
is back (#238), the first TestFlight build's run log should record the time from the request's `TimeoutError` to
`finished` for GitHub, and from the budget timer's start to `_prepare`, so the 0.5 s is a measured number.

## Notes (no change asked of this commit)

**N1, the T-3400 rebase (mine).** I could not open my <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> shim patch: it is on the Company SSD, and
`tools/ssd_guard.py` refused the read. From the board's description of it, the merge will touch:
(1) `_fetch`'s `except ssl.SSLCertVerificationError` (http.py:414) sits right above T-3553's changed lines, and the
shim's lazy `ssl` and `CertificateRejected` rewrite that clause, so expect a hunk conflict there.
(2) The docstring's first bullet (T-3553) and the TLS paragraph (T-3400) are separate hunks.
(3) With the shim, an https request no longer runs through `_resolve`, `_open` or `_Deadline`. The bridge call is the
wait, and `device.call` cuts it at its own `remaining - BUDGET_RESERVE_S`, the same instant as http's deadline, so
the two agree. The shim must pass `deadline - now` per hop, or a run with no budget waits the bridge's default
10 s whatever http's `timeout` says. M1(a) then still matters for plain http only.
(4) `BridgeTimeout` is a `TimeoutError`. On 3.10+ `except socket.timeout` catches it and `_late` words it. On the
3.9 host run `socket.timeout` is not `TimeoutError`, so it falls into the `OSError` branch. There the clock decides,
and a timeout that lands a hair early is reported `Offline`. When I rebase I will catch `TimeoutError` explicitly
there.
I will carry these into T-3400 when I rebase.

**N2.** No test drives `post()` with a budget. It shares `_timeout` and `_once`'s zero-time check with `get`, so a
seeded change to `post` alone has nothing to break. I am not counting this as a finding.

## Board lines

- M1: NOT on the board. `tools/board_tick.py add` refused my line (exit 2: "a new open line needs a plain title ...
  length: 11 words; a title has 3 to 10"). Under T-0848 the item stopped there with no rewording. The line is in
  `/private/tmp/company-scratch/T-3743-pernille/board-lines.txt` for the Operator, and T-3743 is not ticked.
{% endraw %}

</div>
