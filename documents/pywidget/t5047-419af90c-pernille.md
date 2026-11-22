---
layout: "default"
title: "T-5047 at 419af90c: Commandment 13 review (T-5508)"
section: "documents"
description: "Nothing here ships, nothing here can crash, and nothing here can hide the red. Two medium findings, though, make the new record harder to read on exactly the run it was built for. Fix them before the next full MacBook\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t5047-419af90c-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t5047-419af90c-pernille.md</code></span></div><h1>T-5047 at 419af90c: Commandment 13 review (T-5508)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Read fresh, as landed; my pre-commit approval of 2982c640da counts for nothing here.

Scope: `git log --grep=T-5047 419af90c94` gives dba03420a8, f6a7b386cb, 2982c640da (code) and 419af90c94 (an outbox
note only); 81a18acbdc matched the grep but is T-4866 and touches none of these files. Files read at 419af90c94:
Widget/PyWidget.swift, Widget/DebugDrawRecord.swift, UITests/WidgetKitCheckTests.swift (testE, whyNotDrawn,
appGroupFolder), docs/how-it-works/script-to-home-screen.md, and for context Shared/TreeView.swift,
Tests/LaneRestBenchTests.swift, Tests/PreviewQueueTests.swift, project.yml, tools/xc.sh, tools/upload.sh. No Xcode
this session (Mac mini kept clear, an Investor #325 c7048540099).

## Verdict: PASS with findings

Nothing here ships, nothing here can crash, and nothing here can hide the red. Two medium findings, though, make the
new record harder to read on exactly the run it was built for. Fix them before the next full MacBook suite is read
as evidence. Follow-up: T-5524 (Idris).

## The asked checks

- **Debug only.** DebugDrawRecord.swift is `#if DEBUG` from line 4 to line 59. The four call sites in PyWidget.swift
  (:24-26, :44-46, :55-57, :64-66) are each inside their own `#if DEBUG`. The new file is picked up by the extension
  target's `- Widget` source path (project.yml:444); the unit-test target does not compile Widget/. Archives are
  `-configuration Release` (tools/upload.sh:213), and project.yml sets no DEBUG condition for Release. Holds.
  Unverified without Xcode: that a Release build of the extension carries no `debug-draws` string.
- **Lock and <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>.** No crash: every file call is `try?`, the NSLock is never taken twice in one call (note() reads the
  tree outside it), and there is no await while it is held. The file is bounded: `suffix(keep)` with keep = 200
  (:16, :55), and each line is a timestamp, a mark, an id, a family, a TreeFile word and one face letter per entry.
  The writes are atomic (a rename), so a reader never sees a torn file. The lock is not cross-process, though (L1).
- **recordAtRest first.** Still timeline()'s first statement (PyWidget.swift:54). The T mark follows it at :55-57,
  before the first await. LaneRestBenchTests.swift:103-106 pins this by source, and the commit records it green
  (PyWidgetTests 2184/0, Mac mini, XC_LOCAL). I did not rerun it.
- **200 characters.** xc.sh:464 cuts `File.swift:LINE: <message>`. The fixed part, `WidgetKitCheckTests.swift:323:
  XCTAssertTrue failed - `, is 54 characters. A realistic bad case, `ext T2t1S2 p14: S S 31s, T S 31s, t S
  unreadable n 30s (+57 other); disk 773B S; read [No, view, ...]`, comes to 167, so the counts, the last three
  lines and the disk field all fit, with some of Vision's words. Holds.
- **The assertion is unchanged.** `XCTAssertTrue(found, ...)` (WidgetKitCheckTests.swift:323) passes or fails exactly
  as before; only its message grew. The extension's extra work is a read and rewrite of a file of at most 200 lines
  before the first await, plus one more tree read after an answer. That is milliseconds against a 30 s window, so it
  cannot hide the red. In principle it can shift timing, but nothing in the record so far points to a race that small.
- **Docs and fingerprints.** `tests/run.sh site_how_it_works`: see the Host check below. The page's prose follows the
  code, with two exceptions (M1 on "stand-in view", L2 on the cause).
- **Commit messages.** Their test counts and run ids agree with the board notes. One self-contradiction (L3).

## Findings

**M1 (medium): `p` counts more than WidgetKit's placeholder asks.** PyWidget.swift:25 marks `p` inside
`placeholder(in:)`, and the provider itself calls that function in two places. drawn()'s `.missing` case
(PyWidget.swift:102: tree.json unreadable, undecodable, or the folder gone) and snapshot()'s fallback (:47) both call
it. So a timeline that hits `.missing` writes `T, p, t`, and a snapshot that falls back writes `S, p`. Meanwhile the
record's comment (DebugDrawRecord.swift:38), the test's doc (WidgetKitCheckTests.swift:329) and the docs page (line
58, "each stand-in view iOS asks for while it waits") all say p is iOS asking. On a red run, "p1" could mean WidgetKit
showed its placeholder, or that our own fallback ran. Those two point at different fixes. Fix: mark only the call
WidgetKit makes. For example, the provider's two internal calls build the empty entry through a private helper, and
`placeholder(in:)` alone marks and then calls that helper.

**M2 (medium): a snapshot's answer is not recorded.** snapshot() marks `S` on arrival (PyWidget.swift:45) but writes
nothing about what it returned (:47), while timeline() writes its `t` line with faces (:65). "No view for this size"
(TreeView.swift:115) is drawn by any entry with no root and no card. That covers three cases: the placeholder entry
(:27), drawn()'s `.missing` fallback (:102), and a decoded tree with no view for the family. A snapshot can return
either of the first two. Fix: an `s` line after the snapshot, with the same file and face fields as `t` (one entry),
so a run where the shown picture came from a snapshot reads apart from a placeholder.

**L1 (low): the lock serialises one process only.** DebugDrawRecord.swift:45-56 is an NSLock around a
read-and-rewrite. If two processes write in the same moment, one line is lost (last rename wins). Two processes would
be, for example, the extension and a second extension process, or a unit-test host on the same Simulator. Nothing
crashes and the file stays whole and bounded. On its own, a lost line makes a false "T with no t". Since 4fad1da677
(T-5108, after this review's commit) testE waits on the record's own `t <id> systemSmall` line. A lost line there is
now a false red, not just a misreading. Fix (in T-5524): `flock` a sibling lock file around the append, or append
with O_APPEND and trim only when the file passes about 2x keep.

**L2 (low): the docs page states a cause as fact.** script-to-home-screen.md:58 says the widget "could not find a
picture for the small size in what it read". The same text is the placeholder's face and the `.missing` fallback's
(M2's three sources). The record from 20 November (no timeline answered at all, in the whole run) fits the
placeholder at least as well. Fix: say what was seen, the "No view for this size" line, and the sources it has, not
which one it was. As of HEAD the sentence is still there.

**L3 (low, no fix): a test name in the claims.** 2982c640da's message lists "ExtensionBridgeTests,
PreviewQueueTests, WidgetKindsTests 8/0" and then, later in the same message, says PreviewQueueTests is no such class.
The later statement is right: Tests/PreviewQueueTests.swift is `extension BridgeTests`, so an `-only-testing` run of
that name ran nothing. The full PyWidgetTests 2184/0 covers it, so the claim holds overall.
DebugDrawRecord.swift:13 names it as the guard. That guard (PreviewQueueTests.swift:277) checks only
Widget/PyWidget.swift for `.write(`, and the record passes by living in its own file. That is within the guard's
intent (the extension never writes tree.json), but the scan does not name the Debug writer. Optional: list it there.

**N1 (note): an empty record is still ambiguous.** append() returns silently with no App Group and ignores a failed
write (DebugDrawRecord.swift:48, :56). So `T0t0S0 p0 (+0 other)` still cannot tell an extension never asked from one
that could not write. Any non-zero p or other count settles it. No fix asked.

## Is T-5047 fixed?

No, and nothing here claims it. This is a probe. The done-when (testE green on a full MacBook suite) is unmet, and the
next full suite's record is the evidence, read with M1 and M2 in mind. The likely cause Idris then named, StoreKit
delaying the first timeline, is T-5108's change (4fad1da677). That is outside this review and needs its own.

## Host check

`tests/run.sh site_how_it_works` at HEAD (the reviewed files differ from 419af90c94 only by 4fad1da677): All tests passed (site_how_it_works_test.py, 6.4 s), exit 0.

Unverified without Xcode: the Release strings check above; LaneRestBenchTests and the full PyWidgetTests, which I take
from the commit and board notes.
{% endraw %}

</div>
