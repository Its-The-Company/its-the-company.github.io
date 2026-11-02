---
layout: "default"
title: "T-0979: review of T-0750 (a save&#x27;s widget run never holds Python ahead of a console Run), Pernille, 2026-11-02"
section: "documents"
description: "Commit: 0f94ba37 (Idris). Not mine. Line from T-0746 M3."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0750-t0979-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t0750-t0979-pernille.md</code></span></div><h1>T-0979: review of T-0750 (a save's widget run never <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> Python ahead of a console Run), Pernille, 2026-11-02</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Verdict: **PASS**

Commit: 0f94ba37 (Idris). Not mine. Line from T-0746 M3.

What the line asked: a save (scriptSaved) must not start a widget run that a console Run then waits behind,
unplaced ids included; debounce with T-0747's boundary or skip ids not in `placedNow()`; a test that a burst of
saves makes one call.

## What I checked

- Burst: `scriptSaved` is called only from `ConsoleModel.scriptSaved` at T-0747's boundaries.
  `WidgetScriptSaveBurstTests.testT0750ABurstOfSavesMakesOneCall`: five `pauseSave()` give no call, three
  `saveNow()` give exactly `["burst"]`. That is the test the line asked for.
- Unplaced: `WidgetWriter.scriptSaved` (`WidgetWriter.swift:112`) returns `notPlaced` without running while
  `bridge.appRunPending` and the id is not in `placed()`.
- Run ahead of a console run: `ConsoleModel.run` (`PyWidgetApp.swift:587`) calls `SaveRuns.app.yield` right after
  queueing; `yield` stops every registered save run once (queued: leaves the queue; running: the <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>) and marks
  it; `scriptSaved` reruns a placed id behind the console run, and stops on `wrote`, `stuck`, a run id of 0, or a
  run nobody yielded. The loop goes round again only when a new console Run yields it, so it is bounded by the
  user's own taps.
- `ended(runID)` runs before the stuck check in the guard (short-circuit order), so `live` never keeps a stale id.
- Two saves that share one queued run (the "already pending" path): the set holds it once; the first `ended`
  gets the yield and reruns, the second returns. One rerun, which is enough.
- With T-0753 on top: a yielded run that ends `noTree("widget folder gone")` loops, finds no `main.py` for the old
  id, gets `skipped("no script")` with run id 0, and returns. No loop.
- Tests: four bridge tests (unplaced while pending; placed behind pending writes; console stops a slow save run,
  finishes inside 1.5 s, placed widget redrawn from the file as it is now; unplaced stopped run not rerun) and a
  source test pinning the yield call to the line after the queue.

## Findings

- **L1 (Low, no action):** `SaveRuns` misses a save run between `bridge.run` and `began` (written in its doc as
  best effort). Such a run holds Python up to its budget plus the ladder, the T-0746 M3 cost, once. Narrow window.
- **L2 (Low, no action):** `ConsoleModel.run` reads `backgroundRunAhead` before the yield, so it may still print
  the waiting line for a run it is about to stop. Cosmetic; the line goes when the run starts.

## Not run

Swift tests need Xcode; Idris holds the slot. I read the tests against the code; I did not run them.
{% endraw %}

</div>
