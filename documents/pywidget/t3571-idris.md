---
layout: "default"
title: "T-3571: review of afb32bf63 (Pernille, T-3562): device readings carry a time zone at the source"
section: "documents"
description: "Verdict: PASS with findings. Nothing High. The change does what its line says: every time the runtime makes from the wire (_wire.want_time, http._now, http._cache_get) is an aware datetime in the phone&#x27;s zone, so a\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3571-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 18 · Sun Nov 8</span><span><code>pywidget/docs/reviews/t3571-idris.md</code></span></div><h1>T-3571: review of afb32bf63 (Pernille, T-3562): device readings carry a time zone at the source</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris, 2026-11-08. Commandment 13, before build 4 (T-3574). Investor bug #41.
Read: the whole diff of afb32bf63 (15 files), and around it pywidget/ios/App/Runtime/pywidget/prompts.py
(DateField), notifications.py, device/pedometer.py, the stub pedometer, and every `parse_time` caller in
pywidget/widgets/premade/.

**Verdict: PASS with findings.** Nothing High. The change does what its line says: every time the runtime
makes from the wire (`_wire.want_time`, `http._now`, `http._cache_get`) is an aware datetime in the phone's
zone, so a reading's `sampled_at` goes into the timeline and a Text date without the ViewTreeError that
blanked Steps, Distance and Altitude. `is_stale` takes a naive or aware `at`. `parse_time` refusing a naive
datetime breaks no caller: all eight call sites in the premades pass stored ISO text, never a datetime.

Which commit: afb32bf63 is not on main. The landed commit is 37a6a29a3 (same title). `git diff afb32bf63
37a6a29a3` adds only research/inbound/227/* and investors/favorites.json, so the code reviewed here is the
code on origin/main (aaebd7bc6).

## Runs

- Host, unittest, at HEAD aaebd7bc6: pywidget/tests/device/test_device_modules (33 tests),
  pywidget/ios/python-stubs/tests/test_stubs, pywidget/tests/widgets/test_premade_sensor_timeout:
  all OK under the machine's zone, TZ=UTC, TZ=America/New_York and TZ=Australia/Lord_Howe (half-hour DST).
- Mutants (runtime copied to company-scratch/T-3571-idris/rt, `PW_RUNTIME_DIR`, TZ=America/New_York):
  - `local_time` back to `datetime.fromtimestamp(seconds)` (naive, the old behaviour): KILLED, 16 failures, 1 error.
  - `local_time` as `datetime.fromtimestamp(seconds).astimezone()` (local first, not from UTC): survives, and
    rightly: `fromtimestamp` sets `fold` on the repeated hour, so both forms give the same instant at
    2026-11-01 01:00 and 01:59:59. Equivalent, not a gap.
- Stub probe, parent 37a6a29a3^ against HEAD (finding L1 below), TZ=America/New_York.

## The two checks the board line asked for

- The stubs keep a test's aware zone instead of converting to local (`_host.local`). Deliberate and sound:
  a premade test that pins UTC stays TZ-free, and `test_the_stubs_agree_with_the_runtime` pins the naive case,
  which is the one a script author meets.
- `datetime.now() - r.sampled_at` now raises TypeError ("can't subtract offset-naive and offset-aware
  datetimes"). Accepted as an API change before 1.0. reading.py's docstring names the remedy. No template,
  example or premade does it (grep of pywidget/templates, pywidget/examples, pywidget/widgets).

## Findings

**L1 (Low). The stubs now count days with a fixed offset, so `by_day` and `today` are an hour off in a DST week.**
pywidget/ios/python-stubs/pywidget/_host.py:66-71 (`local` uses `astimezone()`, a fixed-offset zone) and
pywidget/ios/python-stubs/pywidget/device/pedometer.py:69-85 (`now.replace(hour=0)`, `midnight - timedelta(days=i)`).
Arithmetic on a fixed-offset datetime keeps the offset of `now`, not of the day it lands on.
Failure case, TZ=America/New_York: `fixed_now = datetime(2026, 11, 3, 12, 0)` (EST), `feed_steps(datetime(2026, 10, 28, 0, 30), 500)`,
`by_day(7)[0]`: before this commit, start 2026-10-28 00:00, 500 steps; now, start 2026-10-28 00:00-05:00
(01:00 EDT), 0 steps. On the phone `by_day` is Swift's calendar, so the stub and the phone now disagree for
a script author testing in the week after a clock change. Stubs only; nothing in build 4 runs this code.
Fix: build the day starts as naive wall-clock times, then `local()` each one (or use the ZoneInfo that
`_premade.local_zone` already finds).

**L2 (Low). Aware times also reach form dates, `pending().fire_at` and `PedometerData.start/end`, and only readings are documented.**
pywidget/ios/App/Runtime/pywidget/prompts.py:450 (`want_time` for a DateField answer) and :384-385
(docstring: "a datetime (local time)"); notifications.py:118; device/pedometer.py:57-58.
The commit message, C2 rule 4 and reading.py speak of readings. Failure case: a script with
`ans = prompts.form("t", [prompts.DateField("when", "When", with_time=True)])` then
`if ans["when"] < datetime.now():` worked on build 3 and raises TypeError on build 4. No test pins the type of
a with_time answer (pywidget/tests/prompts has none). Fix: say "aware, the phone's zone" in the DateField and
Notification docstrings and add one assertion in test_prompts for a with_time answer.

**I1 (Info). The DST cases only bite in a zone with those folds.**
pywidget/tests/device/test_device_modules.py:435 (`INSTANTS`, New York's 2026 edges). Under TZ=UTC every
subtest passes without touching a fold. The company machines run in New York time, so today they bite; a
runner in UTC would not. Optional: run the fold subtests in a subprocess with TZ set.

**I2 (Info). A note for the 1.0 release text.** Scripts that mixed `datetime.now()` with reading times must
switch to `datetime.now().astimezone()`. Worth one line in the app guide when the API is frozen.
{% endraw %}

</div>
