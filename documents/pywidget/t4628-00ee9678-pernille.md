---
layout: "default"
title: "Review T-4700: T-4628 at 00ee9678 (Distance keeps no location fix in its App Group file)"
section: "documents"
description: "Verdict: PASS with findings. My T-4082 H1 (a Distance widget run wrote the exact fix into scripts/pywidget.premade.distance/premade.json, which is in device backups and stays after Location is turned off) is fixed, and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4628-00ee9678-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/t4628-00ee9678-pernille.md</code></span></div><h1>Review T-4700: T-4628 at 00ee9678 (Distance keeps no location fix in its App Group file)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-17. Author: Idris. Commandment 13: I read the work, not the author's reasoning or memory.

**Verdict: PASS with findings.** My T-4082 H1 (a Distance widget run wrote the exact fix into
`scripts/pywidget.premade.distance/premade.json`, which is in device backups and stays after Location is turned off)
is fixed, and nothing after it at HEAD (3e6e534c06) undoes it. Nothing here blocks TestFlight. One medium finding:
Distance's timeout face now departs from a recorded design <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> that nobody has updated.

## What was reviewed

- 1c05c647a0 "T-4628: Distance keeps no location fix in its App Group file; a timeout draws the notice"
  (`_premade.py` Store.drop, `_premade_lock.py` merge removes a dropped key, `distance.py` forget_fix and the
  except path, `test_premade_sensor_timeout.py`). <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span> commit 30146f7528 is the same change before it landed.
- 00ee9678e7 board tick (lane outbox line). `git log --grep=T-4628` finds no other commit.
- Later commits on the same files up to HEAD: only 507a1caa39 (T-3564), which adds a re-raise for errors that are
  neither a timeout nor a refusal. forget_fix still runs first in `read()`, so the drop is saved before any raise; the
  test's "error" sub-case covers it.

## What I checked

1. **Policy text.** `pywidget/docs/release/privacy-policy-draft.md` line 35 ("Your last location reading ... kept out
   of your device backups, and it is deleted when you turn off pywidget's access") and source row 133. At HEAD no
   premade writes latitude or longitude to its file: `grep` of `keep_reading`/`latitude` over
   `widgets/premade/*.py` finds Distance's `_fill` arguments, Sun's in-memory `data["place"]` (from
   `location.last_known()`, never saved), Steps (motion, not location) and Altitude (T-4649, below).
2. **The code comments' claims (Commandment 58: checked, not trusted).** The runtime's own copy is in Application
   Support with `isExcludedFromBackup` (`ios/App/Device/LocationCall.swift:510`) and `forgetCache` on a status that is
   not When In Use or Always; `location.sample()` in a widget run waits `remaining - GRACE_S`
   (`ios/App/Runtime/pywidget/device/location.py:98-112`), so after a timed-out sample there is no budget left for a
   `last_known()` call. The claim holds.
3. **What the run hands on.** `install()` puts `read()`'s data in the provider's state, which the renderer draws but
   `widget_tree.build` does not write (tree.json carries the request's state only). Distance's data now has `tz`,
   `units`, `places` (name, symbol, rounded distance, bearing), `sampled_at`: no coordinates (probe step 4).
4. **Store.drop and the locked merge.** A dropped key is popped from the file as it is under the lock, so the Page's
   newer places and units stay (`test_the_drop_keeps_what_the_page_saved_since`). With the lock held by another
   writer the drop is not written and the next run removes it (probe step 2); no temp file is left (step 3).
5. **Every path removes an older build's `_reading`:** ok, timeout, nofix, error (T-3564 raise), empty, preview, app
   (`test_an_older_builds_fix_is_dropped_on_every_path`), and the real-runner good/hung/Stopped/off runs.
6. **Mutant.** `forget_fix` made a no-op in a scratch copy of `widgets/premade` (PW_PREMADE_DIR): DistanceKeepsNoFix
   fails 8 assertions in 4 tests. The tests catch the regression.
7. **Altitude (T-4649).** Altitude still keeps its samples and `{"accuracy_m"}` as `_reading` in its file. T-4628 was
   right not to change it without an answer on whether CoreLocation altitude is "your location reading"; Idris
   raised T-4649 for that from this task. Note: T-4649's text says Wrenna, its owner parenthesis says Idris.

## Runs

- `python3 -u pywidget/tests/run_host.py --both --timeout 560 widgets` at 3e6e534c06: 3.9.6 432 tests, 0 failed;
  3.13.18 432 tests, 0 failed (8 skipped, 2 expected failures each). Log:
  `/Volumes/SANDISK SSD/company-scratch/T-4700-pernille/host-widgets-both.txt`.
- Probe (T-4082 H1 probe again, lock held, leftovers, drawn data): `.../T-4700-pernille/probe.py`, output
  `probe-out.txt`: good run leaves no coordinates; off run leaves no `_reading`; busy lock keeps it one run.
- Mutant: `.../T-4700-pernille/mutant-out.txt` (FAILED, failures=8).
- No Xcode run: T-4628 changes no Swift.

## Findings

**M1 (medium) T-4832: Distance's timeout face contradicts the recorded ruling, which still describes the old code.**
[`pywidget/docs/design/states/state-spec.md`](state-spec.html) "Ruling, 2026-11-12 11:46 AM ET (Maren, T-3565)" (a)-(b) and its case
paragraph (line 461) say a Distance timeout inside its 30-minute rule, and on the same local day past it, draws the
kept reading with its own time and the clock. Since T-4628 every Distance timeout draws "No location yet / Could not
get new data." The privacy fix rightly comes first, but the spec now describes behaviour the code no longer has, and
the change has no recorded design decision (Commandment 9). The title is also the one the "nofix" card uses ("No
location yet / Open pywidget once to take a fix."), so a person who saw "2.4 km to Home" five minutes ago is told the
app has no location, which the ruling's own reasoning (a) calls less true. Needs Maren's ruling for Distance without
a kept fix (for example: keep the notice with truer words, through <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>; or end the timeout so the last good tree
stays under the clock, noting tree.json holds distances and bearings, not coordinates), then the spec text and a test.

**L1 (low) T-4833: an older build's fix leaves the App Group only when Distance runs again.** Builds 0.1 (6)
(65f23b1c7c) and 0.1 (7) (bb4b184e34) on internal TestFlight both contain T-3563's `keep_reading` in Distance. On a
device where Distance is no longer placed, nothing removes `_reading` (latitude and longitude) from its
`premade.json`: it stays in backups and after Location access goes. T-0551's `forgetLegacyCopy` is the precedent: a
launch step that removes `_reading` from `scripts/pywidget.premade.distance/premade.json` under the s2.3.1 lock,
whatever the status, closes it.

**L2 (low, research) T-4834: the policy's source table does not show where the App Group side is proven, and two
rows cite moved lines.** Row 133 (line 35's source) cites only LocationCall.swift; it should also cite
`distance.py` `forget_fix` and `DistanceKeepsNoFix` as the evidence that premade files keep no fix. Rows 122 and 124
cite `distance.py:54` and `:53-57`, which are now `haversine_m` (the code moved before T-4628); the `altitude.py`
line numbers in row 124 should be read again too.

**I1 (info).** The board done-note cites 30146f7528, the lane commit; the landed commit is 1c05c647a0. Both are in
git; no action.
{% endraw %}

</div>
