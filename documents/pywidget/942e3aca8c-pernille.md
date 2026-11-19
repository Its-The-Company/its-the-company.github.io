---
layout: "default"
title: "Review: 942e3aca8c, a widget state save that tells the truth (T-4760)"
section: "documents"
description: "The five new tests are the right five. Each of the three changes has a test that goes red without it (the mutants above): dropping the fixed-point loop turns both -0.0 tests (:184, :196) into writeFailed; dropping the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/942e3aca8c-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/942e3aca8c-pernille.md</code></span></div><h1>Review: 942e3aca8c, a widget state save that tells the truth (T-4760)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Reviewer: Pernille (T-4768). Author: Idris. I wrote the finding this fixes (M1 in
  [`dadba11da4-pernille.md`](dadba11da4-pernille.html)); I did not write or pair on the fix.
- Commit: 942e3aca8c on base dadba11da4. The same patch landed on main as 1e5d2a9b9e (`git range-diff` shows
  them equal), and T-4761 (093bcb77da) and T-4762 (f57d1f89ac) have changed the file since. This review is of the
  commit; the last section says what still holds at HEAD.
- Read: `pywidget/ios/Shared/WidgetStateCommit.swift`, `pywidget/ios/Tests/Core/WidgetStateCommitTests.swift`
  and ADR-011 s7 at 942e3aca8c. Code comments read as data.
- Run, at 942e3aca8c in a scratch worktree (`git worktree add --detach`, Vendor/ copied in, `xcodegen generate`):
  - `XC_TASK=T-4768 tools/xc.sh ... test -only-testing:PyWidgetTests/WidgetStateCommitTests` on an iPhone 17
    Simulator by id: **did not run.** It waited on the machine's Xcode lock (load average about 460) for 20
    minutes and was stopped. No xcodebuild started and no log was written.
  - The same test file on the host, through the Core package (`Core/Tests/PyWidgetCoreTests` links to
    `Tests/Core`): `swift test --filter WidgetStateCommitTests`: **24 tests, 0 failures**.
  - Three mutants of the fix, each on the host and put back with `git checkout`: `replacedUnverified` mapped to
    `writeFailed` in `Commit`: 4 failures; the decode check before the rename removed: 2 failures; the
    fixed-point loop run zero times: 3 failures. All three caught.
- Probe (host, a scratch `swiftc` program in /tmp, nothing kept): JSONSerialization's passes to a fixed point for
  16 values, and which large numbers parse to something it cannot write. Results in L1.

## Verdict: PASS with findings

M1 is fixed. A commit now says what is on disk:

- `sortedObject` (`:115-125`) encodes again until the bytes stop changing, up to three more passes. On the host
  `-0.0` and `-1e-400` reach `0` on the second pass and every other value I tried is stable after the first, so
  three is room, and a value that never settles is refused rather than looped on.
- `write` (`:167-188`) refuses, before the temp file is made, bytes that do not decode back to this file
  (`:168`), so a state off its fixed point is `writeFailed` with nothing renamed in. That check also covers any
  later change to `encoded()` that drifts from `decode()`.
- After the rename it compares the bytes read back with the bytes written (`:187`), not a re-encoding with
  itself. A mismatch, or a file it cannot read, is the new `replacedUnverified` (`:226`), and `writeFailed`'s
  comment (`:220-222`) now says what that outcome is: nothing renamed in. The `Commit` switch (`:297-301`) maps
  the three `Wrote` cases one to one.
- ADR-011 s7's dated line (`ADR-011-widget-actions.md:191`, 2026-11-17, T-4760) says the same as the code: fixed
  point first, refused before the rename, `replacedUnverified` after it, the next run starts from disk. The date
  agrees with the commit.

The five new tests are the right five. Each of the three changes has a test that goes red without it (the mutants above):
dropping the fixed-point loop turns both `-0.0` tests (`:184`, `:196`) into `writeFailed`; dropping the decode
check renames `{"a":-0}` in (`:251`); comparing anything weaker than the bytes passes the `"other"` read-back
(`:230`). That last one is also the mutant the commit message says was caught. `:230` checks the next run
commits on top (rev 4), which is what "the next run starts from what is on disk" means.

The findings below are about what comes next, not about this fix.

## Findings

### M1. `replacedUnverified` has no caller rule yet (T-5002)

- Where: ADR-011 s7 `:191` says a run told `replacedUnverified` "must not keep its old tree as if the old state
  stood", and s7 "Called" (b) (`:184`) covers only a handler that fails ("writes nothing ... keeps its last good
  tree"). Neither says what the run does instead: which tree it writes, what its run-log row's outcome is, and
  what the person sees (badge in the widget, banner in the app).
- Why it matters: no caller switches on `Committed` today (true at HEAD too), but the app and <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> wiring
  (T-4577, the run T-4762 wraps) is being written now. A caller that folds `replacedUnverified` into its failure
  branch brings back M1's effect: state moved, old tree kept, an error shown for a tap whose change was kept.
- Fix: one sentence in s7 "Called", before the wiring lands. My proposal: re-read `state.json` under the tree's
  own `state.lock` hold; if it decodes, render from that state and write that tree; the row's outcome is its own
  value (not `ok`, not the failure one), and the person sees nothing unless the re-read fails too. Then a test in
  the wiring task that injects the read-back (the `readBack` seam already exists) and checks tree and row.

### L1. A state number that parses as an infinity crashes the process (T-5003)

- Where: `sortedObject` (`:116-117`, `:119-120`), `decode` (`:100`) and `encoded` (`:139`) call
  `JSONSerialization.data(withJSONObject:)` on whatever `jsonObject(with:)` returned. Probe: `{"v": -2e308}`
  parses (to `-inf`), and writing it raises an Objective-C `NSInvalidArgumentException` ("Invalid number value
  (infinite) in JSON write"). `try?` does not catch that, so the process ends. `2e308`, `1e400` and a 401-digit
  integer are refused at parse instead, so only the negative overflow gets through.
- Reach: not from Python today. The run's payload is `pywidget_ui.dumps` (`widget_tree.py:5`), which writes
  with `allow_nan=False` (`pywidget_ui/__init__.py:2308-2312`), and Python's largest float prints finite; in the
  probe, integers of up to 130 digits parsed exactly and those of 201 to 331 digits were refused at parse, both
  signs, none as an infinity. It does reach `decode`
  from a `state.json` on disk, where the snapshot read would end the widget extension or the app on every run of
  that widget, not once. Pre-existing
  (dadba11da4 had the same calls); the new loop adds no new path.
- Fix: `JSONSerialization.isValidJSONObject(obj)` before each write, nil when false (so `notAnObject` or
  `unreadable`), and a test with `-2e308` at the top level and in `state.json`.

### L2. The "nothing written leaves the file" test cannot fail on what it is named for (T-5003)

- Where: `testAnOutcomeThatSaysNothingWasWrittenLeavesTheFileAsItWas` (`:210-228`). All twelve values commit
  now, so the `else` branch (the byte-for-byte check) never runs. For the ones that commit it checks `rev`, not
  that the value read back is the value sent.
- Effect: a change that turns, say, `0.1` into `writeFailed` with the file untouched passes this test. The two
  `-0.0` tests cover the case M1 was about, so this is coverage, not a hole in the fix.
- Fix: assert each value's outcome (all twelve `committed` today, so a change shows), and compare the read-back
  value with `JSONSerialization`'s parse of the input.

## At HEAD

`replacedUnverified` is still mapped one to one (`WidgetStateCommit.swift:420-421` at HEAD), the ADR line is
unchanged, and nothing outside the file uses the outcome. L1's calls are still there. I did not run the suite at
HEAD.

## Notes

- T-4942 asks for a read of T-4760 at 6954ad8a; that is a records commit. The code it points at is this patch
  (942e3aca8c, landed as 1e5d2a9b9e), so this review is that read.
- The Simulator run of this suite did not happen here (above). The host run uses the same file and the same
  Foundation `JSONSerialization`; a Simulator run before upload is still the land gate's, not this review's.
{% endraw %}

</div>
