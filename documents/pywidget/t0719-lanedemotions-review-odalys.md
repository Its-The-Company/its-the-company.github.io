---
layout: "default"
title: "T-0736: review of ca6cfe4e (T-0719, Idris): LaneDemotions.add under a lock"
section: "documents"
description: "Pass. T-0718 M1 and L2 are closed. No Critical, High or Medium. Four Lows, in one P3 line (T-0737)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0719-lanedemotions-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0719-lanedemotions-review-odalys.md</code></span></div><h1>T-0736: review of ca6cfe4e (T-0719, Idris): LaneDemotions.add under a lock</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys, 2026-10-29. Independent review (Commandment 13): I read the diff, the tests, Core/mutants-t0719.json and the evidence file, not the author's reasoning.
Bar: ADR-007 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line T-0733, items 2b ("Swift fails closed") and 2d ("ordinary concurrency loses nothing"); my T-0718 M1 and L2.

## Verdict

Pass. T-0718 M1 and L2 are closed. No Critical, High or Medium. Four Lows, in one P3 line (T-0737).

## What I ran (n beside each)

1. LaneGuardTests through `tools/xc.sh` (scheme PyWidgetCore-Package, macOS): 27/27 passed. Log ops/runs/xcodebuild-20261029-172945.log.
2. The surviving mutant, measured instead of argued. In a throwaway copy of Core/, I removed only the NSLock and raised the concurrency test to 500 trials x 16 threads: 8,000 adds, 0 ids lost, every add true. flock alone excludes threads in one process on Darwin, because each `add` makes its own `open()` (a new open file description per call, closed by `defer` on every path). The mutant is equivalent for correctness. The NSLock is a second guard, not a hole in the tests.
3. Cross-process check, also in the throwaway copy. A separate python3 process held `flock(LOCK_EX)` on `.lane-demoted.lock` for 1.5 s. `add` waited 1.59 s, then returned true with the id written (n=1). This is the real two-process case (app and extension), not only two fds in one process.
4. The author's mutant table (read, not rerun): 7/8 killed. The no-lock mutant fails 93 assertions, so the concurrency test does catch the regression it exists for.

## Checked and holding

- Lock file beside the list in the App Group widgets folder, so both processes open the same inode. `O_CREAT` without `O_EXCL` has no creation race: two creators get the same file. The lock file is never unlinked by the code, so no unlink/recreate split. The list is replaced by `rename` (`.atomic`), so it rightly carries no lock.
- fd lifetime: `guard fd >= 0` returns nil before any `defer`; after that `defer { close(fd) }` covers the body, the EINTR loop and the non-EINTR `return nil`. `O_CLOEXEC` set. Closing the fd releases the flock.
- Fails closed (2b): lock file can't be opened -> false, nothing written (tested with a directory at the lock path). List present but unreadable (directory at path, mode 000) or undecodable -> `ids()` nil, every widget demoted, `add` false, the old bytes kept (tested). `carryOut` ends the process on false.
- Read-back runs under the lock, after the write. The `afterWrite` hook proves it is real: emptied, deleted and corrupted lists each make `add` false.
- `WidgetLibrary.ids()` keeps only valid directory names, so `.lane-demoted.lock` is never read as a widget.
- The T-0718 L2 test for grave_full in `never_resident` and `lane_tampered_before` is right. In the second call, `demote == ["a"]` is the earlier run's blame, as rule 3 says.

## Findings (ranked)

1. **Low L1. Nothing pins the lock file's location.** Every test reaches the lock through `store.lockURL`. A change that put the lock in a per-process place (for example `FileManager.temporaryDirectory`) would pass all 27 tests and the 8 mutants, and still lose ids between the app and the extension. Fix: one assertion that `lockURL == folder/.lane-demoted.lock`, the same folder as `url`.
2. **Low L2. The doc comment says the NSLock covers threads in this process, but flock already does (item 2 above).** Either say the NSLock is a second guard and the surviving mutant is equivalent, or remove it. I would keep it: it is cheap and does no harm. Correct the comment and the mutant's note in test-results.txt.
3. **Low L3. `flock(LOCK_EX)` has no timeout, and the lock is in the shared container.** Nothing calls `LaneDemotions` yet (the flag is off and no call site exists), so this is about wiring, not this commit. Apple ends an app with 0xdead10cc if it is suspended while holding a file lock in a shared container. That is Apple's documented rule; I have not measured it here. The <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> is milliseconds, but it is a crash route under 2a if the app ever calls `add`. When the call site is wired: call `add` only from the extension, or in the app inside a background-task assertion. Consider `LOCK_NB` with a bounded retry that returns false (fail closed), instead of blocking a timeline provider with no limit.
4. **Low L4. "Not held" names `.lane-demoted.json` but not `.lane-demoted.lock`.** A script that deletes the lock file on purpose, while another process is holding it, splits the lock, and one id can be lost. This is item 3 class (deliberate reach). The backstop is the same as T-0720's: the next run's report demotes the widget again. Add the lock file to that bullet in <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.py and C2 1.7.

## New board line

- T-0737 (Idris, P3): L1-L3 above. L4 goes to Pernille as one sentence in the same line.
{% endraw %}

</div>
