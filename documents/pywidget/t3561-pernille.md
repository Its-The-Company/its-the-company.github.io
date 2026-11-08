---
layout: "default"
title: "T-3561: review of 16e32a86e (Idris, T-3550): sensor timeouts keep a fresh good widget"
section: "documents"
description: "Verdict: PASS with fixes. The F1 fix does what F1 asked: a timeout in a widget run whose last good reading is inside the stale rule re-raises, the run ends error, and the good tree stands. Nothing false is said about\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3561-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 18 · Sun Nov 8</span><span><code>pywidget/docs/reviews/t3561-pernille.md</code></span></div><h1>T-3561: review of 16e32a86e (Idris, T-3550): sensor timeouts keep a fresh good widget</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-08. Commandment 13. Host Python only (3.9.6 and 3.13.18); no Xcode work (#228).
Answers my T-3477 F1 (pywidget/docs/reviews/t3477-pernille.md).

**Verdict: PASS with fixes.** The F1 fix does what F1 asked: a timeout in a widget run whose last good reading
is inside the stale rule re-raises, the run ends `error`, and the good tree stands. Nothing false is said about
the device. The naive-time find is real and is the bigger news for T-3393: it explains Steps, Distance and
Altitude going blank on a phone but not in the Simulator. It needs fixing where the times are made, in the
runtime, not in each premade.

## The naive-time answer for T-3393

- **Where the naive time starts.** `_wire.want_time` returns `datetime.fromtimestamp(v)`
  (pywidget/ios/App/Runtime/pywidget/_wire.py:220). C2 rule 4 makes this the contract
  (pywidget/tests/device/c2_calls_build.py:36, reading.py:3), and test_device_modules.py:278 checks it. The DSL
  refuses any naive datetime (pywidget/python/pywidget_ui/__init__.py:423-425, `iso`). I wrote that DSL check, and
  I never squared it with reading.py. The two first-party APIs contradict each other, and that part is mine.
- **Every path a naive time takes.**
  - Location and pedometer readings: `Reading.sampled_at` and `stale_after`, through `want_reading`
    (_wire.py:242), from location.py:95/112/121 and pedometer.py:73.
  - `PedometerData.start` and `end` (pedometer.py:57-58).
  - Form time values in prompts (prompts.py:450) and `fire_at` in pending notifications (notifications.py:118).
  - `http` responses: `sampled_at` and `stale_after`, for both network and cache (http.py:405, 432).
- **Premades.** Of the 12, only steps, altitude and distance put a runtime time into the tree. 16e32a86e covers
  all three (steps.py:49, distance.py:75, altitude.py:63).
  - steps.py:52 uses `PedometerData.start` only through `.astimezone(tz).date()`. That is safe, because a naive
    `astimezone` reads as local, the same as `fromtimestamp`.
  - altitude.py:54 and `mark_read` go through `utc()`, which is also safe.
  - **Sun** reads only latitude and longitude from `location.last_known()` (sun.py:66-68). Its times are built
    aware (sun.py:49), so naive time cannot blank Sun. Sun stays with the gallery-hold lead
    (GalleryPreview.swift:57-62).
  - github builds its own times from `fetched_at` (github.py:71/78/124). It does not use `http`'s `sampled_at`.
  - The other premades take no runtime times.
- **Phone versus Simulator.** The time zone does not decide it.
  `company-scratch/T-3561-pernille/naive_probe.py` turns the bundle's real `want_reading` into a Reading and passes
  its `sampled_at` to `Widget.timeline`. The result is `ViewTreeError: give the datetime a time zone` under
  TZ=UTC and under TZ=America/New_York, on 3.9 and on 3.13. `ui.Text(date)` fails the same way.
  What decides it is **whether a sensor answers with a value**:
  - In the Simulator the pedometer is unsupported, and there is no simulated fix. Idris's runs with permission
    granted took 8-152 ms (scratch T-3364-idris/NOTES.txt). The premades took the notice paths, which never touch
    `sampled_at`, so they drew.
  - On the phone a real reading takes the `ok` path, and the run ends ViewTreeError with no tree.
  - This matches an Investor's build-2 report (c6698789995). The tiles drew on first open, before permission, as
    notices. They failed on later opens, after the Motion grant.
- **Conclusion.** Every build before 16e32a86e, build 3 included, blanks Steps, Distance and Altitude on any
  iPhone where Motion or Location is allowed. Naive time does not explain Sun. The phone's run log (#227) confirms
  this if it shows `ViewTreeError ... give the datetime a time zone` for those three.

## Checklist


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Checklist, scrolls sideways" style="--tw:640px" markdown="1">

| Check | Result |
|---|---|
| A timeout in a widget run with a fresh reading ends `error`, so the good tree stands | Yes. `keep_fresh_tree` re-raises (_premade.py:310). In test_premade_sensor_timeout.py the run ends `error` with BridgeTimeout and the modelled sink keeps the tree byte for byte. Green on 3.9 and 3.13 (5 tests each). |
| Previews never mark `_read_at` | Yes. `mark_read` returns unless the context is "widget" (_premade.py:292). The first-open app pass runs as `.widget` (WidgetWriter.swift:222) and does write trees, so marking it is right. |
| Wording against Maren's `o.fetch` | Matches state-spec.md:319, "Could not get new data", with a full stop added as a notice body. The title is each premade's existing no-data title. There is no new copy. |
| test_device_call bound 0.6 -> 0.75 s | Acceptable. `calls[0][3] == 0.5` still pins the cut, and without the reserve the wait is 1.0 s. |
| Naive-time fix | Correct for the three premades. `aware()` round-trips every minute across both 2026 New York DST edges, folds included (0 errors on 3.9 and 3.13). Fixing it per premade is the wrong place: see F1. |

</div>


## Findings

**F1 (High). Runtime times are naive, the DSL refuses them, and the host stubs hide it.**
- Files: pywidget/ios/App/Runtime/pywidget/_wire.py:220; http.py:405, 432; reading.py:3, 40;
  pywidget/ios/python-stubs/pywidget/_host.py:62; pywidget/tests/widgets/premade_support.py:40.
- Failure case: a user's widget does
  `r = location.sample(); return w.timeline([now], {}, sampled_at=r.sampled_at)`. On a device this always ends
  ViewTreeError, in every time zone. That is the use `sampled_at` exists for (my DSL timeline API). Any
  `ui.Text(r.sampled_at, ...)`, `http.get(...).sampled_at`, prompt time value or notification `fire_at` placed
  in a view fails the same way.
- Why no test caught it: the host stubs hand back whatever `fixed_now` is, and the premade tests set that to an
  aware UTC time. So test_premade_schema and test_premade_data exercised a contract the device never gives. Only
  16e32a86e's bundle-runner test sees the real one.
- Fix at the source:
  - `want_time` and http's `_now` and `_cache_get` return aware local times (`fromtimestamp(v).astimezone()`).
  - `Reading.is_stale` defaults to an aware now.
  - Update C2 rule 4, reading.py's docstring and test_device_modules.py:278.
  - The stubs return aware times too, and one test pins that the stubs and the runtime agree.
  - Keep `_premade.aware()` as a no-op guard.
  - `parse_time` (_premade.py:207-212) says "naive means UTC" while `aware()` says "naive means local". Make
    `parse_time` refuse a naive datetime *object*: on the phone it would be off by the UTC offset, and correct
    only in a UTC Simulator.
- This is an API change, so it should go in before 1.0 ships. Priority P0: it is the cause behind three of the
  four blank free premades.

**F2 (Medium). `_read_at` is marked before a tree exists.**
- Files: steps.py:50, distance.py:76, altitude.py:59; _premade.py:289-296.
- The mark is saved during `read()`. tree.json is written only if the run then ends `ok`
  (RunResultSink.finish).
- Failure case:
  1. Motion was just allowed, and tree.json still holds the old "Motion is off" notice.
  2. A widget run reads steps at 1.8 s of its 2 s budget, saves `_read_at`, and is Stopped while drawing. The
     run is not `ok`, so nothing is written.
  3. Ten minutes later the pedometer times out. `keep_fresh_tree` finds a fresh mark and re-raises.
  4. For up to 60 min the widget keeps "Motion is off", now false, under a failed-run badge.
- The same happens after any failure between `read()` and the sink: a draw error, or a sink write that fails.
- Fix options:
  - Base the decision on the kept tree's own `sampled_at` and `stale_after`, which the Swift sink can see,
    instead of a Python-side mark.
  - Or always re-raise a timeout in a widget run that already has a tree, and let that tree's own stale rule
    speak.
  - Either way, add a test: a good read, then a Stop before the sink, then a timeout. The old notice must not
    be kept as fresh.

**F3 (Low). Other errors still claim the device lacks the sensor.** Pre-existing, in the lines this commit
touched.
- Files: steps.py:47, altitude.py:40-41, distance.py:63-64.
- Every non-timeout `Exception` still becomes "This device does not count steps" or "Location is off" and ends
  `ok`.
- Failure case: a newer Swift half sends `sampled_at` as a string. `_wire.bad` raises RuntimeError
  ("... has sampled_at '...', not Unix seconds"), and Steps overwrites a fresh good tree with "This device does
  not count steps". This is the false-claim class T-3477 F1 named.
- Fix: give the "unavailable" and "off" statuses only to Unsupported and PermissionDenied (and their
  relatives). Let anything else end the run `error`.

**F4 (Low, product call). Past the stale rule, a timeout swaps stale numbers for a notice.**
- Files: steps.py:45-46, altitude.py:38-39, distance.py:61-62.
- Failure case: Steps showed "9,412 steps" at 10:00. At 11:30 the pedometer times out, so the widget run draws
  "No step count / Could not get new data." and ends `ok`. The count is gone.
- Keeping the old tree would show the same count with the stale treatment, because the tree carries its own
  `stale_after` (state-spec s1). That may be more useful.
- This is Maren's decision. It folds into F2's second option if that option is chosen.

## Lines added to the board

- T-3562 (F1, Pernille, P0)
- T-3563 (F2, Idris, P1)
- T-3564 (F3, Idris, P2)
- T-3565 (F4, Maren, P2)

No security weakness was found. Evidence: company-scratch/T-3561-pernille/naive_probe.py, and the
test_premade_sensor_timeout run on both interpreters.
{% endraw %}

</div>
