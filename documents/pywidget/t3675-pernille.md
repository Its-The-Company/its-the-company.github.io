---
layout: "default"
title: "Review: T-3675, copy the saved launcher slots into a launcher premade&#x27;s file (c5936786ee, Idris)"
section: "documents"
description: "Verdict: PASS with findings. The writer does what it says. It copies launcher/slots.json into a launcher premade&#x27;s premade.json in order, first of two with one id, without url. It keeps the file&#x27;s other keys and never\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3675-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t3675-pernille.md</code></span></div><h1>Review: T-3675, copy the saved launcher slots into a launcher premade's file (c5936786ee, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, T-3970, 2026-11-16. Independent review (Commandment 13) of T-3675 as it stood at 9cdb1eb9, plus
the same code on personal/a3 today (518a1e8c30). Core tests run (`swift test`); no Xcode build and no Simulator run.

**Verdict: PASS with findings.** The writer does what it says. It copies launcher/slots.json into a launcher premade's
premade.json in order, first of two with one id, without `url`. It keeps the file's other keys and never writes over a
file it cannot read. The tests read the file back from disk and pin each of those. Nothing here reaches a Release or
TestFlight build: launcher premades are installed only with `LauncherEditorGate` on (PYWIDGET_LAUNCHER, or DEBUG with
PW_LAUNCHER). One Medium (the writer skips the premade.json lock contract that landed after it) and two Lows. None
blocks TestFlight. M1 has its own board line for Idris, to close before #192.

## What T-3675 is

Two commits carry the ID up to 9cdb1eb9:
- c5936786ee: app code. New `pywidget/ios/Shared/LauncherPremadeSlots.swift` (80 lines) with its Core symlink. In
  `LauncherSlots.swift`, `LauncherSlotStore.Top` and `readTop()` go from private to internal. New
  `pywidget/ios/Tests/Core/LauncherPremadeSlotsTests.swift` (10 tests).
- 557771d120: one <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox board note. Records only.

Since then: T-3852 (74bec6aa61), T-4211 (5ba672265d) and T-4218 (7e8c3009c2) changed `LauncherPremadeSlots.swift`. They
added `LauncherSlotSync`, the `afterRead` seam, and a call under slots.lock. The T-3675 body of `entries` and `write` is
unchanged apart from that seam. The test file is unchanged. Those later commits are their own tasks' work and are not
judged here, except where they change what T-3675's code means (M1).

## What I checked

**1. The copy matches what the tap and the draw read.** `entries(from:)` (LauncherPremadeSlots.swift:27-41) dedupes
by id, the first wins, with `LauncherLink.isSlotID`. `LauncherSlotStore.readSlots` (LauncherSlots.swift:235-252) uses
the same order and the same check, so the premade and the tap agree on which entry an id means. `_launch.read_slots`
(_launch.py:116-131) checks the name before it dedupes. Fed directly from slots.json, it could draw the second entry of
a pair whose first has no name, while the tap opened the first. The copy removes the duplicate before Python sees it,
so the two cannot diverge. Python's `SLOT_RE` ends in `$`, which also matches before a trailing newline ("inbox\n"). The
Swift check refuses that id first, so it never reaches the file.

**2. No link in premade.json.** `url` is removed from every copied entry (:37). The test greps the written text for
`"url"`, the scheme and the host (LauncherPremadeSlotsTests.swift, `testSlotsAreCopiedInOrderWithoutTheirLinks`). See
L1: this is a deny-list.

**3. Unreadable inputs.** An unreadable slots.json (not JSON, format 2, `slots` not a list, a top level that is a list,
over `maxFileBytes`) throws `.unreadableSlots` and leaves premade.json byte-identical. A premade.json that is not a JSON
object (including an empty file) throws `.unreadablePremadeFile` and is left as it was. Both are tested to the byte.
Missing slots.json gives `[]`, which clears the premade's list and keeps `notes`. That is the right empty case after
every slot is deleted.

**4. Unchanged means no write.** `(old as AnyObject).isEqual(slots)` compares the bridged NSArray. NSNumber equality
makes 3 and 3.0 equal, so a file Python rewrote with a float hue is not rewritten for nothing. The test checks the
bytes are untouched.

**5. Ids and paths.** `write(toPremades:)` goes through `WidgetFolder.url(for:in:)`. `../outside` and `""` are refused
as `.badPremade`, the others are still written, and nothing appears outside scripts/ (tested). It creates
scripts/<id>/ for a valid id with no folder. The T-3852 caller passes only installed launcher ids, so that is
acceptable.

**6. Making `readTop` internal.** It is a read with no side effects, and `Top` gains no new case. No Release-build
caller outside the launcher code uses it (grep). Safe.

**7. Tests.** `swift test --filter 'LauncherPremadeSlotsTests|LauncherSlotSyncTests'` in pywidget/ios/Core, today:
23 run, 0 failures (10 of T-3675, 13 of the later sync tests). Each T-3675 test reads the result from disk, not from
the function's return value. The commit's single PyWidgetTests failure is
`BridgeTests/testNoPromptFollowsTheRunsFinished`, which came from another worker's uncommitted diff. That is plausible
and not in this commit's files.

## Findings

**M1 (Medium): the premade.json writer does not take premade.json.lock.** LauncherPremadeSlots.swift:48-66 reads
premade.json, merges `slots` and renames over it with no lock. premade-inputs.md s2.3.1 (T-4468 H1, landed 11-15, after
this commit) says every writer of premade.json takes an exclusive `flock` on `premade.json.lock`, re-reads under it and
merges. `PremadeSettings.locked` (App/Pages/PremadeSettings.swift:255-271) already does that. Today nothing else writes
a launcher premade's file: its run only reads it, and the Page does not cover launchers. So there is no live loss, and
the code is not in a Release build. But `_launch.py`'s own contract (lines 20-27) says `notes` and `counts` are "what
the person's script wrote". Once a script writes them through `_premade_lock.save`, the two writers can interleave.
Python reads under its lock, Swift reads and renames, then Python renames the file it read before Swift's write, and
the new slots are lost until the next edit. The reverse order loses the script's notes. Fix: wrap the read, compare and
write in `write(from:toPremadeFolder:)` in the same flock (one synchronous block, as the contract says; it is already
milliseconds). Then add a test that holds the lock from the `afterRead` seam. Board line for Idris, before #192.

**L1 (Low): the copy is a deny-list of one key.** `entry.removeValue(forKey: "url")` (:37) keeps every other key "as
saved". The save path merges into existing entries (LauncherSlots.swift:285), so keys from a hand-edited or older file
are carried along (`testOnlySlotsTheTapAcceptsAreCopied` pins `extra` being copied). Python allow-lists id, name,
symbol and hue, so nothing reaches a tree today. But "the links live in one file" holds only while `url` is the only
link-bearing key. Copying `id`, `name`, `symbol` and `hue` would make that true by construction. No board line;
for Idris to take with M1 if he agrees.

**L2 (Low): the mutant evidence is not in the repository.** The commit says "4 mutants all caught", but there is no
`pywidget/ios/Core/mutants-t3675*.json` or results file beside the others. I did not re-run mutants. The tests do go
red on the obvious ones by reading (drop the url removal, drop the dedupe, write on unreadable). Record only.

## Not judged

`LauncherSlotSync`, the slots.lock call and the T-4218 redraw (T-3852, T-4211, T-4218) belong to their own reviews.
Whether the launcher ships at all waits on #192 and the Investors.
{% endraw %}

</div>
