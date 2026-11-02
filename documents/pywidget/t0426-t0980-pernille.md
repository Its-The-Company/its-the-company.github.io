---
layout: "default"
title: "T-0980: review of T-0426 (Stop&#x27;s repeats around render() only), Pernille, 2026-11-02"
section: "documents"
description: "Commit: d78d1c4c (Idris). Not mine. The line came from my T-0401 review of 40f00baa, finding 3."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0426-t0980-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t0426-t0980-pernille.md</code></span></div><h1>T-0980: review of T-0426 (Stop's repeats around render() only), Pernille, 2026-11-02</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Verdict: **PASS**

Commit: d78d1c4c (Idris). Not mine. The line came from my T-0401 review of 40f00baa, finding 3.

What the line asked: repeats on only around build() (the user's render), quiet right after, under finish's
condition (ok, or exit code 0); the seeded repro as a host test that fails on HEAD and passes after;
`run_host --both bridge` green.

## What I checked

- `runner.py` (run tail, now ~line 1269): the `_user_on()` after the thread join is gone; `user_on=_user_on,
  quiet=_quiet` go into `records.finish`, which hands them to `widget_tree.emit` only inside its own
  `status == "ok" or (exit and exit_code == 0)` branch (`records.py:111`). So `sys.exit(3)` never turns them on.
- `widget_tree._render` (`widget_tree.py:169`): `user_on()` then `build()`, `quiet()` in a finally, and an outer
  `except KeyboardInterrupt: quiet(); raise` for a trip that lands in the finally before `quiet()` runs.
  `_quiet` itself loops four times over `user_code(False)` + `_swallow_pending_interrupt`, so a trip inside it is eaten.
- Size check, flush and emit now run quiet: a Stop after render() returned leaves the run `ok` with the tree out.
  That is a behaviour choice, written in the commit and the docstring; it matches s7 (Stop reaches user code).
- Later commits on these three files: one (9375dfc5, T-0632), which does not touch this path.

## Runs (host, foreground)

- `python3 pywidget/tests/run_host.py --both bridge`: 261 tests on 3.9.6 (6 skipped) and 261 on 3.13.18, all pass.
- `test_runner_render_window.py` against the parent's runtime (`git archive d78d1c4c^`, `PW_RUNTIME_DIR`):
  **8 failures on 3.9 and 8 on 3.13**; against HEAD: OK on both. The test does catch the bug.

## Findings

- **L1 (Low, no action):** `widget_tree.py:179-181`: a second trip that lands on entry to the outer `except`,
  before its `quiet()` call, leaves `_render` with the repeats on; `records.finish` then runs `format_error` with
  them on, and a third trip there would end the run `internal_error` through `_last_resort`. That needs two repeats
  inside a few microseconds of each other after render() was already interrupted once. Not worth code; if it ever
  shows, the outer handler can loop as `_quiet` does.
{% endraw %}

</div>
