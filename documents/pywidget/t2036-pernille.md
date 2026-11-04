---
layout: "default"
title: "T-2036: review of f501acb86 (T-2031..T-2034, answers to T-2030 F1-F6)"
section: "documents"
description: "Verdict: approve with one change (F1, Medium). The rest is sound. Third round on this file, so only real failure cases below."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2036-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2036-pernille.md</code></span></div><h1>T-2036: review of f501acb86 (T-2031..T-2034, answers to T-2030 F1-F6)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Author: Idris. Read: the diff to `pywidget/ios/Shared/ExtensionLane.swift` and
`Shared/LaneGuard.swift`, the bench note `pywidget/ios/bench/t2031-review-fixes.txt`. Nothing run: this is a reading
review (no host target for the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>; the MacBook full suite of this commit is still owed, as the note says).

Verdict: **approve with one change** (F1, Medium). The rest is sound. Third round on this file, so only real failure
cases below.

## What I checked and found sound

- **N widgets, one run per reload.** Each turn ahead of the oldest queued owed widget gives way in milliseconds, so
  that widget comes up with its own time left and runs; everyone behind it is late by time. A first-late date is fixed
  until the widget runs, and every new mark is later than it, so a widget with k widgets owed longer than it waits for
  at most k runs. With all N widgets in every reload the worst case is N-1 late reloads in a row, then a run. No
  unbounded wait, provided the oldest owed widget's turn is seen (F1 is the case where it is not). Equal dates
  (strict `<`) give way to neither side; queue order decides, and both stay bounded.
- **"Never three in a row".** I agree. With one run per reload and three widgets, there are three runs in any three
  reloads; if no widget were late twice running, each would run at least every other reload, which needs 1.5 runs per
  reload. My T-2030 wording was wrong for N = 3. The right bar in general is "late at most N-1 reloads in a row", which
  for this test is "never three"; the test's x, y, z, x order is the stronger check and the one that matters.
- **Owed-since across processes and clocks.** The date is wall-clock seconds in the file, read by any process. Clock
  set back under 300 s: one new mark can sort ahead of an older one once; still bounded. Set back further: the old
  marks read stale and restart at the next late turn (a widget can lose its place once per clock change; rare,
  bounded). Set forward past 24 h: all marks expire. A pre-T-2031 empty mark counts from its mtime. Fine.
- **F3-F6.** Re-check after the wait, clear on every end but `.late`, 300 s ahead rule, T-2018 numbers: each correct,
  each with a test and a killed mutant.

## Findings

### F1 (Medium): the gather right is spent by a turn that never reaches the gather; an owed widget can starve again

`ExtensionLane.swift:143` decides `gathers` when the turn is made (first turn while `queued == 0`). The gather itself
is at `:195`, after early returns at `:176` (`.notInLane`), `:177` (`.locked`), `:181` (`.demoted`) and `:188` (late
by time). A first turn that ends at one of those has used the burst's only wait without waiting.

Failing case: a free user with a Pro premade P (locked) on the Home Screen, plus two own lane widgets `a` and `o`
whose runs use the whole budget, in step. `o` is owed. WidgetKit asks in the order P, a, o, a few ms apart.
P's turn is made with `gathers = true`, `a`'s with `false`. P's gate answers `false` in about a millisecond and returns
`.locked`. `a`'s turn starts at once, looks once (`givesWay`, gather zero), `o` has not asked yet, so `a` runs its
whole budget; `o` is late by time and its mark is rewritten, so the 24 h rule never expires it. Every reload repeats
this: `o` never runs. This is T-2030 F1's starvation back, through F2's fix. Before f501acb86 every turn gathered,
so `a` would have waited for `o`. The same <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> whenever the burst's first caller ends early for any reason; a locked
premade is the common one, since it comes back on every reload.

Suggested fix: decide at the gather, not at the queue. Keep a burst flag under `lock`, e.g. `gathered`, reset to
`false` where `queued` returns to 0 (`:148`); at `:195` the turn takes the wait only if it is the first to get there:
`let first = lock.withLock { defer { gathered = true }; return !gathered }`. An orphan mark still costs a burst one
wait (F2 holds). Test: P (mayRun false, instant) first, then `a` (not owed, a run long enough that the next turn comes up late, as in the three-widget test), then
`o` (owed) 20 ms later; `o` runs on that reload. Mutant: `gathers` from queue position at creation (this commit).

No other findings.
{% endraw %}

</div>
