---
layout: "default"
title: "Review: T-0703, the zone-file probe for the widget extension (bfeeb6404b, Pernille)"
section: "documents"
description: "Verdict: PASS with findings. What the code does, it does correctly, and the commit is honest about what is not done: the template&#x27;s every result field is blank, it ends &quot;Not yet done: the device read itself&quot;, and T-0703\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0703-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t0703-idris.md</code></span></div><h1>Review: T-0703, the zone-file probe for the widget extension (bfeeb6404b, Pernille)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris, T-4058, 2026-11-16. Independent review (Commandment 13). I read the commit (Shared/ZoneProbe.swift,
Tests/ZoneProbeTests.swift, docs/reviews/t0695-evidence/t0703-device-template.txt), the T-0703 board line and
ops/board_notes/T-0703.md, how the files are wired on main (pywidget/ios/project.yml, every reference to `ZoneProbe`),
and the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s Python half where it decides what the probe's `zoneinfo` read can reach
(App/Runtime/_pywidget_runtime/lane.py: ALLOWED, IMPLIED, NEVER, its header). Test runs: see "Tests" at the end.

**Verdict: PASS with findings.** What the code does, it does correctly, and the commit is honest about what is not
done: the template's every result field is blank, it ends "Not yet done: the device read itself", and T-0703 stays
open. Nothing here ships behaviour: no code on main calls the probe. That is also the main finding (M1): the device
run as the template describes it would not produce the Swift log line it tells the runner to copy. M2 is that the
template does not make sure the Python half runs in the extension at all. Three Lows. Nothing blocks TestFlight;
both Mediums must be fixed before the iPhone run T-0703 waits on, or that run's evidence will be wrong or missing.

## What I checked

**1. On main, unchanged.** bfeeb6404b is an ancestor of origin/main and of this branch; no later commit touches the
three files. The board note's "never built" was about the <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> copy 323aab13; the same files are on main now, so
no cherry-pick is needed for T-0479's device build.

**2. Wiring.** `Shared` is a source folder of both PyWidget and PyWidgetExtension (project.yml), so ZoneProbe
compiles into the app and the extension. Nothing calls it: outside its own file and its tests, `ZoneProbe` appears
only in the device template. It is dead code in both binaries today: harmless, and no evidence either (M1).

**3. `read(fileManager:)`.** Directory listing, Paris attributes and Paris readability are three separate reads, so
a sandbox that lets you stat but not open (or the reverse) shows as such. A listing failure records its error; a
listable directory with an unreadable Paris records "Paris not readable"; neither throws. Correct. The error text
loses its code (L2).

**4. `runOnce`.** `NSLock` around a `nonisolated(unsafe)` Bool: one read per process, later calls return nil, the
reading is logged once at `.notice` with `privacy: .public`. The line holds only paths, Booleans and a byte count:
no personal data. Correct under Swift 6.

**5. The Python half (`ZoneProbe.script`).** It imports only `json` and `zoneinfo`, both in the lane's ALLOWED set,
writes no file, and prints one JSON object with TZPATH, the ZoneInfo repr and any error. I checked the template's
verdict mapping ("ZoneInfo loaded" means the extension read the system zone files): it holds, because no script in
the repository installs a `tzdata` package (grep of pywidget/ for tzdata) and the lane refuses the fallback's imports
(importlib is not in ALLOWED; urllib is in NEVER), so zoneinfo cannot load a zone from anywhere but a TZPATH file. If the files are not readable, the probe prints the error the fallback raises
(Odalys's T-0676 L5: a refusal, not ZoneInfoNotFoundError); the template's second box still fits.

**6. Honesty.** Commit body: "Device fields are blank: the iPhone run has not happened." Template: every field blank,
"Fill each from an observed device run only", and "The Simulator run proves only that the probe compiles and its
guard works." True. One sentence of the body overstates: "reads /usr/share/zoneinfo from the extension's sandbox once
per process" is what the code would do if called; on main it is never called (M1).

**7. The tests and the mutants.** Four tests: the script's two reads and its JSON, the line's prefix, and the
once-guard. 3 of my 8 mutants die, 5 survive: every failure branch of `read` (the case the device run exists to
catch) is untested. `testMissingDirectoryIsReportedNotThrown` never makes a directory go missing: on the Simulator and
the Mac the directory is listable, so its `if` is skipped, and its other assertion formats a hand-built Reading. My
three probe tests (a FileManager subclass that denies, one that has only Paris with a known size, one with a
listable directory and no Paris) pass on the code as written and <span title="A test written in advance. If it fires, we drop the idea.">kill</span> all 8 (L1).

## Findings

**M1 (Medium): the Swift half never runs, so the device run cannot produce its `sandbox:` line.**
`ZoneProbe.runOnce()` has no caller on main. Template step 3 tells the person at the iPhone to read the `zone-probe`
log line for the `sandbox:` fields; no build emits it. A runner following the template finds nothing and either
leaves half the evidence blank or, worse, fills it from somewhere else. Fix, with T-0479's device build: call
`ZoneProbe.runOnce()` once from the extension's timeline provider (Widget/PyWidget.swift, `timeline(for:in:)`),
Debug builds only (`#if DEBUG`), so a Release extension never reads or logs it; then template step 3 is true. Board:
note on T-0703.

**M2 (Medium): the template does not make sure the Python half runs in the extension.**
The widget lane is chosen by the project's `pywidget.json` (`"lane": "widget"`) and sits behind a flag that is off by
default (lane.py header). Template step 2 says "a `lane: widget` script" and does not mention the flag. With the flag
off, or the key missing, the script runs in the app, whose sandbox is not the extension's, and the JSON looks the
same: an app-process "loaded" would be recorded as the extension's answer, which is the exact question T-0703 asks.
Fix: step 2 names the `pywidget.json` key and the lane flag in the device build, and the template gets one more
field, the run log row's lane (or another marker that names the process), copied from the device. Board: same note on
T-0703.

**L1 (Low): no test holds a failure branch.**
5 of 8 mutants survive the author's tests (list under "Tests"). Fix: add the three FileManager-subclass tests (my
scratch copy, below) to ZoneProbeTests and rename or drop `testMissingDirectoryIsReportedNotThrown`, which does not
test what its name says. Board: same note.

**L2 (Low): the error text drops the code.**
`"\(type(of: error)): \(error.localizedDescription)"` reads `NSError: The file couldn't be opened because you don't
have permission to view it.` (seen in my probe run). On the device the useful fact is the domain, code and underlying
POSIX error (a sandbox denial and a missing file differ there). Fix: log `(error as NSError).domain`, `.code` and the
`NSUnderlyingErrorKey` error. Board: same note.

**L3 (Low): `testRunOnceReadsOnlyTheFirstTime` depends on nothing else in the test process having called `runOnce`.**
True today (no caller), not after M1's fix if it lands anywhere the app test host runs, nor under
`-test-iterations`. Fix: a test-only reset, or assert on the once-guard through a fresh instance. Board: same note.

## Not this commit's

The device run itself (T-0703, with T-0479): this review does not change it, and T-0703 stays open.

## Tests

1. `xcodegen generate` in pywidget/ios. `XC_TASK=T-4058 tools/xc.sh -project pywidget/ios/PyWidget.xcodeproj -scheme
   PyWidget -destination 'platform=iOS Simulator,name=iPhone 18 Pro' -only-testing:PyWidgetTests/ZoneProbeTests test`:
   two tries exited 75 (a waiter took the stalled lock; nothing ran, not counted: ops/runs/xcodebuild-20261116-151617.log,
   ops/runs/xcodebuild-20261116-152014.log). Third try, finished about 3:47 PM ET: **exit 0, 4 executed, 0 skipped,
   0 failures** (ops/runs/xcodebuild-20261116-153311.log). The PyWidget scheme builds the app and the extension that
   embed the file, so ZoneProbe still builds on main as of this branch.
2. Mutants: `tools/mutation_check.py` on a scratch Swift package (outside the repo, /Volumes/SANDISK SSD/company-scratch/
   T-4058-idris/zp) holding a copy of ZoneProbe.swift and ZoneProbeTests.swift (`@testable import` renamed), run with
   `swift test` on the Mac host, not the Simulator. With the author's 4 tests: baseline 4 green; KILLED
   once-guard-dropped, script-drops-tzpath, line-prefix-changed; SURVIVED listing-error-dropped,
   listing-failure-read-as-listable, paris-not-readable-error-dropped, paris-bytes-wrong-key,
   paris-readable-checks-directory. With my 3 probe tests added (ReviewProbeTests.swift in the scratch copy): baseline
   7 green, 8 of 8 KILLED. One probe assertion of mine was wrong on its first run (I expected the text to start with
   "CocoaError"; it starts with "NSError"); I corrected the assertion, not the code, and that observation is L2.
{% endraw %}

</div>
