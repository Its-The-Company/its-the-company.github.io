---
layout: "default"
title: "T-0718: review of 75a07e83 (T-0709, Shared/LaneGuard.swift), Odalys, 2026-10-29"
section: "documents"
description: "Against: pywidget/docs/research/C2-device-api.md 1.7, &quot;The extension&#x27;s rule for the lane keys&quot; (rules 1-3). Read: Shared/LaneGuard.swift (Core symlink checked: same file), Tests/Core/LaneGuardTests.swift\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0718-laneguard-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0718-laneguard-review-odalys.md</code></span></div><h1>T-0718: review of 75a07e83 (T-0709, Shared/LaneGuard.swift), Odalys, 2026-10-29</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Against: pywidget/docs/research/C2-device-api.md 1.7, "The extension's rule for the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> keys" (rules 1-3).
Read: Shared/LaneGuard.swift (Core symlink checked: same file), Tests/Core/LaneGuardTests.swift,
Core/mutants-t0709.json, the evidence file. Not read: done-note, author notes. The evidence file
(t0709-evidence/test-results.txt) <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> a one-line header and test output only, no author reasoning.

## Baseline (re-run by me)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Baseline (re-run by me), scrolls sideways" style="--tw:571px" markdown="1">

| Check | Result | n |
|---|---|---|
| `swift test --filter LaneGuardTests` (Core, macOS) | 20 passed, 0 failed | 20 |
| Author's mutants (evidence) | 8/8 killed | 8 |
| My mutants (`scripts/core_mutants.sh`, list below) | 0/3 killed | 3 |
| Scratch reproducer (`pywidget/docs/reviews/t0718-evidence/repro_main.swift`, compiled with LaneGuard.swift) | see findings | 200 trials |

</div>


## Checklist

1. **Who each key blames.** Matches rule 2: run `never_resident` and `lane_tampered` blame this run's widget;
   `lane_tampered_before` the previous widget run in this process (none: nothing); reset `lane_tampered` the
   last run, and the reset keeps `lastWidgetID`. Correct. Duplicate JSON key (`["x"]` then `[]`) still demoted
   (n=1). Holds.
2. **Fail closed.** Missing key, `null`, number, bool (`[true]` is refused: the NSNumber check works), nested
   list, object, non-object payload (`""`, `[]`, `null`, `{`, `"ok"`): each ends the process and demotes this run.
   `grave_full` ends the process. Holds, with the test gap in L2.
3. **Demotion file and read-back.** Missing file reads as none, undecodable as nil (every widget demoted),
   atomic write. Two gaps: M1 and M2; the read-back is not tested (L2).
4. **Flag off, app lane.** `WidgetLane.extensionFlag = false`; nothing outside the file and its tests names
   `WidgetLaneGuard`, `LaneDemotions` or `.lane-demoted.json` (grep over pywidget/ios and docs). The file is
   compiled into the app and the extension (pbxproj lines 1358, 1407) but has no caller. Nothing changes. Holds.

## <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Ruling</span>: a missing `lane_tampered_before` also demotes the previous widget

**Right, not too wide.** The keys go missing when `_CFG["lane"]` is off. If the run itself turned it off, its
own outcome loses the keys and that run is demoted. But a previous run can plant code that runs later and turns
the gate off during the next run (a finalizer, a gc callback, a hook). Then the next outcome has no keys and
the real culprit is the previous widget. The extension cannot tell these two cases apart. Within this process
only two widgets could be responsible, and the process ends anyway, so demoting both is the narrowest choice
that is still fail closed. The cost is one innocent widget moved to the app lane, where it still runs. See L3
for the cost when the cause is harmless.

## Findings

### M1 (Medium): concurrent `add` loses demotions, and the read-back does not notice. Verdict: fix before any caller exists or the flag defaults on

`add` reads the list, merges and writes it with no lock. Four `add([id])` calls on `DispatchQueue.global()`
against one folder: **200/200 trials ended with fewer than 4 ids; `add` returned false 1 time in 800**.
The read-back runs right after the caller's own write, before the other thread overwrites the file, so it
returns true and the id is lost later. WidgetKit can call timeline providers for different widgets at the
same time, so the extension will have concurrent callers unless the integrator serializes them.
Reproducer: `pywidget/docs/reviews/t0718-evidence/repro_main.swift`, case 1 (the text is in this file's appendix).
Fix: serialize `add` inside the type (a static lock, plus `flock` on the file if the app also writes it),
and add a concurrency test.

### M2 (Medium): the demotion list can be rewritten or deleted by the scripts it is meant to stop. Verdict: fix or record as a limit in C2 1.7 before the flag defaults on

The widget lane allows `os` and the `open` builtin. The script runs from the App Group mirror
(`scripts/<id>/`), so the widgets folder is a sibling path any script can reach. A planter can write `[]`
to `.lane-demoted.json` or delete it. I simulated the write from Swift (n=1 each): after the overwrite and after the
delete, `isDemoted("planter")` is **false**. A deleted list reads as "none", so the extension fails open.
The app lane can do the same thing with the full stdlib.
Reproducer: case 2 in the appendix (a Swift simulation of a script writing or deleting the file; the
Python route is left out of this prose, Commandment 42).
Fix options: keep the list, or a digest of it, where Python cannot reach. The Keychain is one option:
`pywidget.keychain` is refused in the lane and `ctypes` is never loaded, but the app lane's keychain module
must also refuse that service. If no fix is made, add this route to the 1.7 "Not held" list next to the `_CFG` gate.

### L1 (Low): when the write fails, `carryOut` ends the process, but the demotion is not saved. Verdict: ship; fix the comment

Case 3: the folder is missing, so `exit` is called (correct), but the next process sees `isDemoted("w") == false`
and runs the widget in the lane again. The comment "must not run here again" claims more than the code does.
In practice this is rare (disk full, or the container is gone). Correct the comment, or count the failure so the
device numbers show it.

### L2 (Low): three of my mutants survive. Verdict: ship; add the tests with M1


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: L2 (Low): three of my mutants survive. Verdict: ship; add the tests with M1, scrolls sideways" style="--tw:724px" markdown="1">

| Mutant | Result | Gap |
|---|---|---|
| `ids()`: an unreadable but present file (e.g. a directory at the path, chmod 000, before first unlock) reads as `[]` | SURVIVED | No test covers an unreadable but present file. |
| `add`: read-back replaced by `true` | SURVIVED | The read-back is never tested. |
| `grave_full` counted only in `lane_tampered` | SURVIVED | Rule 3 says "any list". No test puts `grave_full` alone in `never_resident` or `lane_tampered_before`. |

</div>


### L3 (Low, product note): one harmless internal_error demotes two widgets permanently. Verdict: ship; note for the integrator

Rule 1 treats a run's `internal_error` outcome without the keys as tampering. Under the ruling above, it demotes
that run and the previous widget. Demotions are "only ever added", so both widgets stay in the app lane until
the person edits the script, even when the cause was harmless (a MemoryError in the runner). That is fail
closed and matches the spec. Record the reason for each id so the app can say why a widget moved, and count
how often this happens on device before the flag's default is set.

## <span title="The final letter, after the caps.">Overall</span> verdict

**Ship as is behind the flag (off, no caller).** Fix M1 and M2 before the integration that calls `carryOut`,
and before the flag defaults on. The rule logic (who is blamed, fail closed, grave_full) is right.

## Appendix: reproducer

`pywidget/docs/reviews/t0718-evidence/repro_main.swift`, built with `swiftc -O -o repro pywidget/ios/Shared/LaneGuard.swift repro_main.swift`:

```
concurrent add: trials with a lost id 200/200, add() returned false 1 times
after script overwrite: planter demoted = false
after script delete: planter demoted = false
failed write: exited=true, next process sees w demoted=false
only lane_tampered_before missing: ["cur", "prev"]
dup key (bad then []): ["w"]
[true]: ["never_resident"]
```

Case 1 is four `DispatchQueue.global().async { store.add([id]) }` calls per trial, ids a-d, a fresh folder each trial.
My mutants: `pywidget/docs/reviews/t0718-evidence/mutants-odalys.json`; the three entries are in L2.
{% endraw %}

</div>
