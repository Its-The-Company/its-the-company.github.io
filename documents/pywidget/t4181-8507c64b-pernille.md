---
layout: "default"
title: "Re-review of T-4181 at main..8507c64b: the late tap&#x27;s run is on its caller&#x27;s clock"
section: "documents"
description: "No Xcode run of my own. tools/land_mutants.py status --id idris-t4775-m1 shows all 7 mutants KILLED at base 8507c64b9e (J-20261128-0505-mut-idris-t4775-m1-1 to -7). -6 is T-4775&#x27;s red-first mutant (2 listed failing) and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4181-8507c64b-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 38 · Sat Nov 28</span><span><code>pywidget/docs/reviews/t4181-8507c64b-pernille.md</code></span></div><h1>Re-review of T-4181 at main..8507c64b: the late tap's run is on its caller's clock</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (Commandment 13). Author: Idris. Reviewed: `git diff main...HEAD`, mostly 8507c64b9e (the fix for
my t4181-8e35d2dd-pernille.md), and also 10169fe4f4 (verdicts, handoff note). I reviewed d8443a32cd and 8e35d2dd5c
before, and I re-read them only where the fix touches them. Paths are under pywidget/ios/ unless they say otherwise.
Line numbers are at 8507c64b9e. Date: 2026-11-28.

## Tests run

No Xcode run of my own. `tools/land_mutants.py status --id idris-t4775-m1` shows all 7 mutants KILLED at base
8507c64b9e (J-20261128-0505-mut-idris-t4775-m1-1 to -7). -6 is T-4775's red-first mutant (2 listed failing) and -7 is
the M1 fresh-clock mutant (1 listed failing). I have not read the unit and host job logs (2831/0/2,
J-20261128-0434-land-chk-a5ab71-4-15042e; host 4602/0). `tools/site/how_it_works.py` reads the extension.md box
"A test build's widget run stays short" as `ok` (checked 24547129da53, now 24547129da53).

## Verdict: PASS (nothing blocking, one Low)

## M1: the inner call now reads the outer deadline (fixed)

`Shared/ExtensionLane.swift:311-317`. The public `refresh(_:trigger:)` now only computes `now + deadline` and passes
it to the private `refresh(_:trigger:until:)`. The tap's inner call at :374 passes the outer `mine`. Here is every
reader of the clock:

- T-1851's start rule. `timeLeft` (:555-556) reads `due[id]`, and the inner call sets that from the tap's `mine`: at
  :360 when it makes the turn, or at :330 as `max` when it joins one. The first check (:436-440), the second check
  after the wait (:453-456) and `givesWay`'s slack (:447) all go through `timeLeft`, as does the gather window's
  slack (:569). None of them reads a fresh clock.
- T-2230's mark. `firstDue[id]` is set from the same `mine` (:331, :361), and the row's `deadline` mark compares
  `returned` against it (:516). A tap whose caller drew the cached tree now gets a row that says so.
- The caller's answer. The outer `upTo(until: mine)` (:372) and the inner turn's own `upTo(until: mine)` (:388) end
  at the same instant.

Two cases I traced:

1. If another reload makes a turn in the gap after `behind` ends, the inner call joins that turn. `due` moves to the
   reload's later clock (T-2018), and `firstDue` takes the tap's earlier one. The run's row then says `deadline` even
   if the reload got its answer in time. That is T-2230's "earliest caller" rule as documented (:139-142), so it is
   not a finding.
2. If the inner call finds another written turn, it queues behind that one too, with the same `mine`. The nesting is
   bounded and every level ends at the same instant.

The two comments (:315-316, :367-369) now say what the code does.

## The new test goes red on the old code

`Tests/ExtensionLaneTests.swift:1689-1714`, with `deadline: 1` and `turnNeeds: 0.3`. `afterRow` waits until the tap is
behind the turn and then holds the turn 1.3 s more. The tap's `mine` is taken before `markBehind`, so the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> always
runs past the tap's whole clock. The `.deadline` answer is deterministic, not timing luck.

On the old code, the inner call takes a fresh 1 s, which is at least 0.3 s, so it starts a run. `ranCount` is then 2
and `lateReasons` is empty: red. Mutant -7 restores exactly that line and was killed.

With -6, the tap joins the turn and never calls `tapBehind`. `waitBehind` runs out after 3 s and `wentBehind` fails,
so both listed tests go red. L1 of my last review is closed. The first test (:1666-1680) now asserts `wentBehind`, so a
tap that missed the window and made its own turn can no longer pass.

## `tapBehind` is a no-op in the shared <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>

It defaults to `{ _ in }` (:265, :268). `ExtensionLane.shared` (:286-294) passes nothing, as it does for `afterRow`.
In the shipped lane it costs one `await` on an empty closure before the `upTo`. One thing for the next seam: the
await at :371 sits outside the `upTo`, so a seam that blocked there would hold the caller past its clock. Only a test
can pass one, so this is a note, not a finding.

## The mutants' find texts

I checked each `find` in Tests/mutants-t4773.json against Shared/ExtensionLane.swift and LaneRerunRule.swift with a
count. Every one matches exactly once, indentation and newline included: -6 at :327, -7 at :374. Both test names
exist as written (:1666, :1689). L2 is closed.

## Docs

- `Widget/PyWidget.swift:62` now has the wording I asked for. L3's second half is closed.
- `pywidget/docs/how-it-works/extension.md:15`. "Inside the tap's own 4 seconds" holds: a turn starts only with
  `turnNeeds` left (budget plus two stop repeats, :28). "A tap that runs leaves a line marked as a tap" holds.
  "If too little ... is left ... it runs nothing and is marked late" holds for `no_time`. The last clause does not
  quite hold; see L1.

## Findings

### L1: "a later refresh runs the widget" is looser than the code

`pywidget/docs/how-it-works/extension.md:15`. The commit's Plain line has the same problem: "the next refresh runs the
widget". The tap's late turn writes a `deferred` row (:439). LaneRerunRule takes the newest row of any outcome as the
widget's last run (Shared/RefreshWidgetIntent.swift:88-93). The late mark itself only orders give-way (`owedSince`,
:447). It does not make a reload run. So the next reload iOS sends does not run the widget until the tree's ask has
come, and that is held at least 15 min after the late row. A later tap does run it. Suggested wording: "and the next
tap, or the next reload once the widget is due, runs it". For the done-note: "the next tap, or a later refresh once
it is due, runs the widget". This is a test-build path and holds nothing.

## Not checked

The unit and host job logs themselves. The handoff note's claims about the blocked steps, apart from reading them.
{% endraw %}

</div>
