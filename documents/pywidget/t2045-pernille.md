---
layout: "default"
title: "Review: T-1670 at 36f8409e (Pernille, T-2045)"
section: "documents"
description: "Provenance: written on personal lane a2 on 2026-11-04 (b223a9818, also 154763031 on parked/a2/20261104-085024-28297); never reached main. Brought to main on 2026-11-05 and re-checked against main at 8e68919c9 rather\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2045-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2045-pernille.md</code></span></div><h1>Review: T-1670 at 36f8409e (Pernille, T-2045)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Provenance: written on personal <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a2 on 2026-11-04 (b223a9818, also 154763031 on
<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>/a2/20261104-085024-28297); never reached main. Brought to main on 2026-11-05 and
re-checked against main at 8e68919c9 rather than redone. Re-check today:

- Source and test unchanged in the lines that matter: `notifications.py:66-71` (`_limits`),
  test at `test_device_modules.py:238-246`.
- Suite: 28 tests OK on host CPython 3.9.6 and 3.13.
- Mutant `len(v) > most` -> `>=`: red on 3.9 and 3.13 (ValueError: title is 100 characters).
- Mutant `wait < MIN_AFTER_S` -> `<=`: red on 3.9 and 3.13 (ValueError: after must be at least 1 second).
- Both mutants against the test file at `36f8409e^`: 27 tests OK, so they survive without this commit.
- Method today: a scratch copy of `pywidget/ios/App/Runtime` via `PW_RUNTIME_DIR`, one mutant at
  a time. `tools/mutants.py` copies only `tools/` and `tests/`, and `--also pywidget/ios` is far too
  heavy to copy per run, so today's run did not go through it (the 2026-11-04 row below did).
- L1 still stands: `pywidget/tests/device/mutants.json` has neither mutant. Its board line was
  T-2078 on the lane, never added on main; it is T-2515 now.


**Verdict: approve. No High and no Medium findings.** Two Lows, neither blocks TestFlight.

What was asked (board T-1670, from T-1662 F1): add the accepting call at the notification
limits (title 100, body 500, thread 128, after=1.0) through Replay with one staged schedule
reply, so the `len(v) >= most` and `wait <= MIN_AFTER_S` mutants in
`pywidget/ios/App/Runtime/pywidget/notifications.py:66-71` go red.

What landed: `pywidget/tests/device/test_device_modules.py:238-246`,
`test_t0543_l1_notification_limits_accept_exactly_at_the_boundary`.

## Checks


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Checks, scrolls sideways" style="--tw:640px" markdown="1">

| Check | Result |
|---|---|
| Limits against the source | `notifications.py:31-34`: MIN_AFTER_S 1.0, TITLE_MAX 100, BODY_MAX 500, THREAD_MAX 128. The test uses exactly those, and `test_t0543_l1_notification_floor_and_lengths` (line 228) pins the four constants, so a moved constant fails there. The stub `ios/python-stubs/pywidget/notifications.py:13-16` carries the same four numbers. |
| Staged request | The expected args dict matches what `schedule()` builds at `notifications.py:100-102` key for key; timeout is `_wire.PERMISSION_WAIT_S` (120.0), as sent at line 103. Replay checks module, method, args, sorted-compact bytes and timeout. |
| Suite, host CPython 3.9.6 | `python3 pywidget/tests/device/test_device_modules.py`: 28 tests, OK. |
| Suite, host CPython 3.13 | 28 tests, OK. |
| Mutant `len(v) > most` -> `len(v) >= most` (line 68) | Red: the new test errors with ValueError, title is 100 characters. |
| Mutant `wait < MIN_AFTER_S` -> `wait <= MIN_AFTER_S` (line 70) | Red: the new test errors with ValueError on after. |
| Same two mutants against the test file before the commit (`36f8409e^`) | Both survive (TestRules 17 tests OK), so this commit is what <span title="A test written in advance. If it fires, we drop the idea.">kills</span> them. |
| Same two mutants through `tools/mutants.py` (temp mutants file outside the tree) | `2 of 2 killed`. |

</div>


All four values sit at their boundary in one call, so if the shared loop at line 67 is ever
split per field, a `>=` on any one field still rejects this call. Thread is checked twice
(lines 87 and 99); both checks see 128 and both are covered. The test also asserts exactly one
bridge call, so a silently dropped send fails too.

## Findings

**L1 (Low). The two boundary mutants are not registered in `pywidget/tests/device/mutants.json`.**
The file already holds the other notifications mutants (lines 57-64: schedule-wait-short,
schedule-both-allowed and so on), but not these two. Failure scenario: someone later loosens or
deletes `test_..._accept_exactly_at_the_boundary` (say, trims the args dict while changing
`schedule()`), the seeded-mutation run over mutants.json still reports all killed, and the
inclusive boundary can regress to exclusive with nothing red. The commit message's "both boundary
mutants go red" is true today, but nothing in the repo re-checks it. Fix: add the two entries
(the exact find/replace pairs I ran are in the table above: `if v is not None and len(v) > most:`
and `if wait is not None and wait < MIN_AFTER_S:`). Board line T-2515 added for Idris.

**L2 (Low). The test uses ASCII only, so it does not pin what "characters" means.**
`notifications.py:68` counts `len(str)`, that is code points. Failure scenario: a later change
to count UTF-16 units (to match `NSString.length` on the Swift side) or grapheme clusters
would pass this test unchanged, and a 100-emoji title would flip between accepted and refused
with no test noticing. Not in T-1670's scope and the contract (s4, "proposed") does not yet say
which count it means, so no board line; noting it for whoever settles T-0543 L1 in the contract.

Nothing brittle beyond the usual: the args dict duplicates `schedule()`'s wire shape, so a new
schedule key breaks this test along with every notifications fixture case. That is the
contract test doing its job, not a defect.
{% endraw %}

</div>
