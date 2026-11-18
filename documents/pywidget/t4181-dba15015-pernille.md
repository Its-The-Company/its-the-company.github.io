---
layout: "default"
title: "Review of T-4181 at dba150158f: which moves to the app draw the error badge (T-4630)"
section: "documents"
description: "The code does what the ruling&#x27;s five items say, line by line, and it fails closed everywhere the ruling asks. The badge still shows for killed and refused moves. The tests cover every case in item 5, and each would\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4181-dba15015-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/t4181-dba15015-pernille.md</code></span></div><h1>Review of T-4181 at dba150158f: which moves to the app draw the error badge (T-4630)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4699, Commandment 13). Authors: Ines (the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>, daeb885e9c) and Idris (the code, dba150158f).
Reviewed: dba150158f and the commit it rests on, daeb885e9c. I read both diffs; `Shared/LaneGuard.swift`,
`Shared/ExtensionLane.swift`, `Tests/Core/LaneGuardTests.swift`, `Tests/ExtensionLaneTests.swift` and
`docs/how-it-works/extension.md` as they stand at dba150158f; the callers `Widget/PyWidget.swift:89` and
`App/Projects/WidgetScriptSave.swift` `newText`; the T-4630, T-4633 and T-4181 board lines; ADR-007 s7.1 row 4 and
s7.2; state-spec s11. Date: 2026-11-17.

Later commits up to HEAD (a29b618d73): none touches a line T-4630 added or changed. `LaneGuard.swift` and
`LaneGuardTests.swift` are byte-identical at HEAD. `ExtensionLane.swift` changed in two places away from these lines (a
T-1764 comment at :431, and T-4494's `LaneEntry.inLane`). `ExtensionLaneTests.swift` gained T-1764's tests. T-4494
(6d64e84bfe) matters for M1 below, because it starts every sent widget in the widget <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, so every widget now passes
through the size rule.

Runs (iPhone 17e, iOS 27.0 Simulator, local, `XC_TASK=T-4699`, the HEAD tree):
- `LaneGuardTests` and `ExtensionLaneTests` in this worktree: 188 executed, 0 failures. The twelve new T-4630 tests
  all passed (`ops/runs/xcodebuild-20261117-190254.log`).
- Probe, in a scratch copy with no product line changed, three tests added to `ExtensionLaneTests` only
  (log `ops/runs/xcodebuild-20261117-190904.log` in that copy). The control (a run reporting `lane_tampered` alone)
  is listed and badged, and passed. Both M1 cases print `badged=false reason=memory`; see M1. Nothing was edited in
  this worktree's product files. The copy is under `company-scratch/T-4699-pernille`.

I did not run the whole PyWidgetTests target; Idris's commit records 1,964 executed, 0 failures, on 11-16. I ran
nothing on 26.0 or 27.1.

## Verdict: PASS with findings

The code does what the ruling's five items say, line by line, and it fails closed everywhere the ruling asks. The
badge still shows for `killed` and `refused` moves. The tests cover every case in item 5, and each would catch the bug
it names. One demotion path is missing from the classification (M1). A judged demotion made at once by `carryOut`,
not through a marker, writes no reason and clears none. When that same run, or an earlier run of the blamed widget in
this process, was a size move, the old `memory`, `time` or `refused_import` stays on file and hides the badge. The
widget is still demoted and runs in the app, so nothing unsafe runs. Only the error mark is missing. This is not a
TestFlight blocker on its own.

## What I checked

1. **Every move cause, classified.** At dba150158f four places put an id on `.lane-demoted.json`, and nothing in the
   app adds to it:
   - `ExtensionLane.turn` marker path (`ExtensionLane.swift:350-363`): a plain marker writes `killed` after the add
     (badged). A judged marker clears `lane-moved` before the add and writes none (badged). Item 3, as ruled.
   - The size move (`:446`): `choice != .fits` adds and writes `memory`, `time` or `refused_import` (not badged).
     `LaneChoice.judge` (`LaneGuard.swift:456-463`) returns only those three or `fits`, so nothing else reaches this
     write.
   - The margin refusal in a second process (`:532-535`): writes `refused` (badged).
   - `WidgetLaneGuard.carryOut` (`LaneGuard.swift:316-320`), called from `ExtensionLane.judge` (`:657-659`) for
     `never_resident`, `lane_tampered`, `lane_tampered_before` and a malformed payload: adds and writes nothing. This
     path is not named in the ruling, the commit or the tests. See M1.
2. **The read itself.** `WidgetLane.badged` (`LaneGuard.swift:37-43`): flag off or no folder, no badge, as before. A
   list that does not read, badge. Not listed, no badge. A folder `WidgetFolder.url` refuses, badge. Otherwise the
   badge shows unless `movedReason()?.isSizeMove == true`. An unknown cause therefore badges: no file, a file that is
   not a regular file or is over 4,096 bytes (`boundedRead` returns nil), and any bytes that are not exactly one
   raw value. `String(decoding:as:)` turns bad UTF-8 into U+FFFD, so it can never match. `fits` decodes, but
   `isSizeMove` is false, so it badges. Swift's `==` uses canonical equivalence, so I checked whether any other
   code points fold to these ASCII words. None do (the Kelvin sign folds to `K`, and no word here has one).
3. **`isSizeMove`** (`:449`) is exactly `.memory`, `.time`, `.refusedImport`. Items 1 and 2 hold for each of the six
   cases.
4. **The two T-4633 L1 parts.** `remove` clears the reason only after the write read back, still under the list's
   flock (`:262-266`). An extension `add` needs the same lock, and its `record(moved:)` comes after that `add`, so the
   clear cannot delete a newer reason. The judged-marker clear (`ExtensionLane.swift:355`) runs before the `add`, and
   `turn` has already checked that the id is not listed, so a failed add leaves an unlisted id with no reason and the
   marker kept. Both are correct.
5. **The widget's read cost.** One more bounded read of a file of at most 4 KB, per drawn timeline, only for a listed
   id. That is nothing.
6. **The badge still shows for failure moves.** `killed` and `refused` badge through the read. The run's own outcome
   still badges through `showsBadge` (unchanged). state-spec s11's "demoted" row keys on `WidgetLane.badged`, so its
   `badge.moved` copy now shows only for failure moves. That matches the ruling, and s11 needs no edit.
7. **The tests would catch what they pin.** Item 5's list is complete: the three size words, `killed`, `refused`, no
   file, `fits`, `Memory`, `memory\n`, over the limit, an unreadable list, a judged marker over an old `memory`, and
   not listed. The extras (empty, non-UTF-8, a folder, a symlinked id, flag off) are all useful. By reading, each
   mutant I would try fails a test: `isSizeMove` gains `killed` or loses a word; `badged` back to `isDemoted`
   (`testASizeMoveThroughARunDrawsNoBadge`); a nil folder treated as no badge; `remove` without the clear, or the
   clear moved before the `noAppRun` return; and the judged marker's clear dropped. Idris's two host mutants are the
   same idea. One gap is harmless: no test has `remove` fail its read-back after the write. A clear moved above that
   check would survive, but it fails in the safe direction (a listed id with no reason badges).
8. **The docs page.** The new section in `how-it-works/extension.md` is accurate for a reader who is not an engineer.
   Its sentence "when its run broke the widget's rules; those are failures, and the widget shows the badge" is the
   promise M1 breaks.

## Findings

### M1. A judged demotion made at once writes no reason and clears none, so a size reason hides its badge

`ExtensionLane.turn` makes the size move before the judging (`ExtensionLane.swift:446`, then `:451`).
A run that comes back over the memory rule, over 2 s, or after asking for an app-only module, and whose `finished`
payload names it in `lane_tampered` or `never_resident` (or is malformed), is first listed with `memory`, `time` or
`refused_import`. Then `carryOut` adds it again (`LaneGuard.swift:317`): the add succeeds, writes nothing and clears
nothing. `WidgetLane.badged` reads the size word and draws no badge. The same thing happens to the widget that
`lane_tampered_before` blames. If an earlier run of that widget in this process was size-moved, its word is still on
file. The ruling's principle (s7.2 chair line: "the lane stopped trusting the widget" badges) and item 3's heading
("No stale size reason under a failure move") both cover this. Item 2's list names only "a judged marker's
demotion", but the marker is only `carryOut`'s fallback when its `add` fails (`keep`, `:325-333`). A script that does
this on purpose could also write its own `lane-moved` (item 4), so this is not a new hole. It matters for an honest
widget's `never_resident` report, and for the badge's meaning.
Probe output, iPhone 17e, 27.0, through the real `ExtensionLane.refresh` with a stubbed run:
- `w` runs with a 40 MB peak and `lane_tampered: ["x"]`: listed, `lane-moved` = `memory`, `badged=false`.
- `a` runs with a 40 MB peak (moved for memory), then `b` runs and its `lane_tampered_before` blames `a`: `a` is still
  `memory`, `badged=false`.
**Fix:** in `WidgetLaneGuard.carryOut`, before `store.add`, clear `lane-moved` for each id in `decision.demote`
(resolve each folder as `keep` does and skip one that is gone). That covers the run's own id, `lane_tampered_before`'s
id and a Restart reply's. Tests: in ExtensionLaneTests, a run with `lane_tampered: ["x"]` and a 40 MB peak, and one with
`never_resident` and `askedAppOnly`, each listed with no reason and badged. Also a run of `a` moved for memory, then
`b` reporting `lane_tampered_before`, with `a` badged. Prove each with the clear removed. Add the `carryOut` path to
s7.2 item 2 (Ines) so the ruling names it. Filed as T-4804 (Idris, P2). It is close to T-4633 (Keep the moved reason in step with demotions) but is not the same: T-4633's
L2 is the save race, and this is the judging path.

### Info (no new line)

- **A save whose <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> is refused now badges a size-moved widget.** `WidgetScriptSave.newText` (HEAD
  `WidgetScriptSave.swift:368-371`) clears the reason before `liftForNewText`. If the lift times out on the lock, the
  widget stays listed with no reason and shows the badge until the next save. That fails closed, as the ruling wants,
  and T-4633 L1's last clause ("delete it only after a lift that worked") still tracks it. T-4633 stays open, and its
  L2 race is untouched.
- **T-4630's board line is still open.** The ruling says the code's review is this card. Once M1 is filed, nothing
  else in T-4630 is left.
{% endraw %}

</div>
