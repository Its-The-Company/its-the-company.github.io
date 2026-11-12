---
layout: "default"
title: "T-4070: review of T-3558 and T-3758 as lane-landed at a11bc041"
section: "documents"
description: "Verdict: PASS with findings. Both changes do what their lines ask and are lock-safe. One Medium, and it is not in the code: the privacy policy draft at HEAD says the opposite of what main now does. Four Low."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4070-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 22 · Thu Nov 12</span><span><code>pywidget/docs/reviews/t4070-pernille.md</code></span></div><h1>T-4070: review of T-3558 and T-3758 as <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-landed at a11bc041</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-12. Commandment 13 (independent of the author, Idris). Reading review: no build, no
Simulator, no Swift test run; mutants below are reasoned, not run. Paths are under pywidget/ios/ unless they say
otherwise.

Read: `git show` of 57af160924 (T-3558) and f84da4aaf9 (T-3758); a11bc041 itself is only the lane's board tick
(ops/lane-outbox). At main HEAD c461f31bde: App/Bridge/LaunchRunLog.swift, App/PyWidgetApp.swift (:106-124, :631-645),
App/Bridge/WidgetWriter.swift (BackgroundHold :400-437, launch-log step :258), Shared/RunLog/RunLogStore.swift
(pruneAll :151-191, withWidgetLock :217-221, append prune :225-248), RunLogRetention.appendNeedsPrune,
WidgetStateLock.with, RunLogRecorder.atLaunch/recovered, App/Gallery/GalleryPreview.swift, both test files;
pywidget/docs/release/privacy-policy-draft.md :37, :81, gate 2a; pywidget/docs/reviews/t3789-idris.md; the
T-3558 line (log/board-archive.md:3752), the T-3758, T-3789 and T-3798 lines and ops/board_notes/T-3798.md.

**Verdict: PASS with findings.** Both changes do what their lines ask and are lock-safe. One Medium, and it is
not in the code: the privacy policy draft at HEAD says the opposite of what main now does. Four Low.

## Main still holds the reviewed code

Both commits are first-parent ancestors of HEAD; T-3758 landed on main 2026-11-09 7:54 AM ET as f84da4aaf9, the
same tree under pywidget/ios as a683ba360 (`git diff a683ba360 f84da4aaf9 --stat -- pywidget/ios` is empty).
Since f84da4aaf9, LaunchRunLog.swift, LaunchRunLogTests.swift, GalleryPreview.swift and
GalleryModelRunAllTests.swift are unchanged. PyWidgetApp.swift changed in other hunks only (T-4093's
TesterProMark, T-3762's GalleryPush); the T-3758 call at :121 is as reviewed.

## T-3558: GalleryModel takes its grant reader and preview runner

Intent (archived line): test runAll itself, with every grant given and with one held. The defaults
(`{ $0.grant }`, `{ await GalleryPreviewRun.run($0) }`) are the old calls, and all three readers (`allow`, `tile`,
`runAll`) go through `grantOf`, so the product is unchanged and the tile and the run cannot disagree on a grant.
The tests <span title="A test written in advance. If it fires, we drop the idea.">kill</span> the two mutants the line names: the iOS read put back in runAll fails the first test on a
Simulator without Motion or Location granted, and `continue` turned into `break` fails the second, which asserts
the held tile is not last. The <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> guards (more than one entry; Motion and Location premades present) keep the
tests from passing on an empty shelf. No findings.

## T-3758: prune on scene activation, at most once a day

Correct for the case M2 named: a process kept suspended for days now prunes on the first activation more than
24 h after its last prune. The check-and-set on `lastPrune` is one lock hold, so two activations cannot both
prune; the launch pass records its own prune with `max`, so it counts; the prune runs alone (no recovery) in its
own BackgroundHold, so 0xdead10cc is covered as for the launch pass. pruneAll takes each widget's state.lock and
console.lock, and a removed widget (no widgets/<id>/) needs none, so a concurrent writer or a second pruneAll
cannot tear a file. The 14-day rule holds within one day: a row can live up to about 15 days while the person
keeps switching back to a running app, which is what T-3789 F2's wording says.

Tests: the 25 h test kills "no spacing", "spacing never recorded" and "pruneEvery 48 h"; the launch-pass test kills
"launch pass does not count"; `pass.ran == false` kills "activation runs the whole pass"; the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> log kills
"prune outside the assertion". Not killed: see L1 and L3.

### M1 Medium: the privacy policy draft says switching back makes no check; main does check

privacy-policy-draft.md:37 says "Runs older than 14 days are deleted at a check pywidget makes each time it starts;
switching back to it while it is still running makes no check", and :81 and gate 2a (iii) say the same ("true at
HEAD ... a 'switch back' check exists only in a build with a683ba360"). That was written on 2026-11-09 at 3:21 PM ET
(6f63ec6014, T-3798), when the note says a683ba360 was "<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>, not on main". It was parked, but its landed copy
f84da4aaf9 had been on main since 7:54 AM that day. So every build cut from main from now on (TestFlight build 4,
d3d39da3, does not have it) prunes on switching back, and the policy says it does not. The error is in the safe
direction (data goes sooner than said), but the policy must say what the build does (Commandment 6; gate 2a).

Fix: use T-3789 F2's wording for :37 and :81 (it matches the code: `> pruneEvery`, LaunchRunLog.swift:82-86), and
correct gate 2a (iii) and the source-table row. One addition to F2's note: with T-3758 a fresh start prunes on its
first activation even if Python never starts, so "each time it starts" no longer depends on Python. The text is
Wrenna's (T-3798); the line for it is Idris's to route.

### L1 Low: "the two never overlap" is not true on a cold launch

LaunchRunLog.swift:75-76 says a launch pass under way is awaited first. On a cold launch the scene goes `.active`
before Python has started, so `pass` is still nil: the activation prunes at once, and the launch pass (recovery,
render faults, a second pruneAll) starts a second or two later and can run while the first prune is still going.
The locks keep that safe, but it costs a second full prune (two tree walks of log/) on every cold launch, and it
puts a prune beside refreshPlaced's widget runs, which before T-3758 never overlapped a prune (every runner awaits
the launch pass, WidgetWriter.swift:258). One ordering change too: a prune now runs before recovery, so a crashed
run's row older than 14 days is gone when `recovered` checks `hasRow`, and recovery writes a killed row that the
pass's own prune then removes. Fix: either correct the comment and accept the double prune, or skip the activation
prune when the launch pass is about to run (for example, leave the first activation in a process to the launch pass
when the bridge is starting). No test covers either path.

### L2 Low: a busy widget is skipped, and the day is marked done anyway

`lastPrune` is set before the prune, and `PruneReport.busy` (RunLogStore.swift:170) is dropped. A widget whose
state.lock is held for more than the 0.5 s wait is not pruned for another day. A widget that is busy is usually
being written, and its own append prunes aged rows (RunLogRetention.appendNeedsPrune), so the gap is small; but
nothing retries. Fix: if `busy` is not empty, leave `lastPrune` so the next activation tries again.

### L3 Low: nothing fails if the app stops calling it

The fix is one line, PyWidgetApp.swift:121. Delete it and every test stays green: the tests call
`sceneBecameActive` directly. A host check that the `.active` case calls `LaunchRunLog.app.sceneBecameActive()`
would hold the wiring (tests/swift_strings_catalog_test.py already reads Swift sources from the host).

### L4 Low: wall-clock spacing

The 24 h spacing compares `Date`s. Set the clock back and `at.timeIntervalSince(last)` is negative, so a running
process makes no activation prune until the clock passes the old time again. Fix: also prune when the difference
is negative (or space on a monotonic clock and keep `Date` for the 14-day rule).

## For the board

M1: new line, part of T-4070, owner Idris (route the text to Wrenna's T-3798). L1-L4: here only.
T-4070 does not hold TestFlight on the code; M1 holds gate 2a, before the policy is published or a build from
main goes to App Review.
{% endraw %}

</div>
