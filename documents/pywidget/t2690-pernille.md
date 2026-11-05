---
layout: "default"
title: "T-2690 review: the last changes before the first test build"
section: "documents"
description: "The first thing that broke is the branch, not the code: main&#x27;s upload.sh, as it stands at 5075b6a88, sends an --internal --upload build to App Store Connect without Apple&#x27;s internal-only key. App Store Connect would\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2690-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2690-pernille.md</code></span></div><h1>T-2690 review: the last changes before the first test build</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (independent, Commandment 13: code only, no author reasoning). Author: Idris. 2026-11-05.

Scope: (a) aef5bb0f9 (BridgeSlice2Tests stuck-marker poll, PremadesTests catalog.json, tools/clean_export.sh);
(b) 6beb56a49 on idris/t2270-internal-only (tools/upload.sh, tests/upload_test.sh: `--internal` export plist sets
`testFlightInternalTestingOnly`, read back); (c) abc73fb20 + 51b22e84e on main (T-2662: check_lane_gate.py reads
OTHER_SWIFT_FLAGS and the product; LaneGateMark in Shared/LaneGuard.swift; upload.sh refuses an archive holding it).

The question: can a build that is not internal-only, or that carries the phone test gate, still reach App Store
Connect through upload.sh?

## Verdict

The first thing that broke is the branch, not the code: main's upload.sh, as it stands at 5075b6a88, sends an
`--internal --upload` build to App Store Connect without Apple's internal-only key. App Store Connect would then let
that build into an external group or App Review, and the only thing in the way is our own ledger. (b) fixes that,
and it applies cleanly on main.

Gate builds: no. With (c) on main, every upload.sh path (`--project`, `--archive`, strict, `--internal`, export or
upload) greps the archive's Products for the gate mark before any export call or ledger row. It fails closed when
there are no product files or a file it cannot read. I checked this on real iOS arm64 binaries, not only on the test's
text stand-ins (probe below).

**The upload may go once H1 is closed** (6beb56a49 on main, upload_test green there). The Lows don't block it.
Before the first internal build goes to any tester, someone signed in to App Store Connect (the Investors) has to
see it marked internal under its build number (L2).

## Runs


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Runs, scrolls sideways" style="--tw:930px" markdown="1">

| What | Where | Result |
|---|---|---|
| `bash tests/upload_test.sh` | main 5075b6a88 | PASS 88 FAIL 0 |
| `python3 -m unittest pywidget/tests/widgets/test_lane_gate_flag.py` (no pytest on this Python) | main | 43 tests OK (5.2 s) |
| 6beb56a49 applied (`git apply --3way`) onto 5075b6a88 | scratch worktree T-2690-pernille/wt | applies cleanly |
| `bash tests/upload_test.sh` | main + 6beb56a49 | PASS 91 FAIL 0 (88 + 3 new) |
| (a)'s two tests on the MacBook runner | ops/runs/J-20261104-2341-xc-test-result.json, commit aef5bb0f9 | passed, 2 executed, 0 failures, 93.5 s |

</div>


## Probe: does upload.sh's own grep find the mark in a real binary?

upload_test's gate cases write `head<mark>tail` into text files. test_lane_gate_flag.py compiles a host binary but
checks it with the Python reader (`holds_mark`). So nothing tested upload.sh's `grep -rlaF` line on a Mach-O.
Scratch probe (`T-2690-pernille/probe/probe1.sh`): LaneGateMark from LaneGuard.swift plus a `main.swift` calling
`announce()`. Built with `xcrun --sdk iphoneos swiftc -target arm64-apple-ios17.0 -wmo -Xlinker -dead_strip`, at
both `-O` and `-Osize`, with and without `-D PYWIDGET_LANE_GATE`. Then `strip -x`, a full `strip` plus ad-hoc
`codesign`, and upload.sh's grep line run under both a UTF-8 and a C locale.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Probe: does upload.sh&#x27;s own grep find the mark in a real binary?, scrolls sideways" style="--tw:583px" markdown="1">

| Binary | Bytes (raw / strip -x / strip+sign) | grep rc, both locales |
|---|---|---|
| -O, gate on | 68,192 / 67,176 / 67,584 | 0 (found) on all three |
| -O, gate off | 50,048 / 49,648 / 50,032 | 1 (clean) on all three |
| -Osize, gate on | 68,192 / 67,176 / 67,584 | 0 on all three |
| -Osize, gate off | 50,048 / 49,648 / 50,032 | 1 on all three |

</div>


A 150 MB newline-free file with the mark at its very end, next to a real gate binary: both found, rc 0, 1.57 s.
Every `#if PYWIDGET_LANE_GATE` is in Shared/ (LaneGuard.swift, LaneRestBench.swift), and project.yml compiles
Shared/ into both the app and the widget (lines 145, 340). So no gate code reaches a product without the mark.

## Findings

### H1 (High): main's upload.sh does not set testFlightInternalTestingOnly; (b) is still on a branch

On main, `tools/upload.sh --internal --upload` writes an ExportOptions.plist that has method, destination, team,
signing and symbols, and no internal-only key (main lines 146-156). App Store Connect then treats the build as an
ordinary one: it can go to an external TestFlight group or be submitted for review. What stands in the way is
ops/testflight-internal.tsv and `testflight_ledger.py check`, which a person has to run. That person is exactly the
one who slips. (b) is correct:

- The strict plist must not carry the key, and the `--internal` plist must carry `true`. Both are read back with
  PlistBuddy before any xcodebuild call, and either mismatch dies with exit 2.
- The key is real in this Mac's Xcode 27.2: IDEDistribution.framework's export-options help reads
  "testFlightInternalTestingOnly : Bool. When enabled, this build cannot be distributed via external TestFlight or
  the App Store."
- Apple's saved page (research/inbound/apple/developer.apple.com/help_app-store-connect_test-a-beta-version_add-internal-testers-1d9a64bd.html)
  says builds uploaded as TestFlight Internal Only from Xcode are shown as internal under the build number.
- Merged with (c), upload_test is 91/0.

Fix: land 6beb56a49 on main, run upload_test there, and run no `--internal --upload` before it lands. (Idris, T-2702.)

### L1 (Low): upload_test never runs upload.sh's grep on a real Mach-O

The probe above shows the line works. But a later change (dropping `-a`, a different grep first in PATH, a mark
the compiler packs into instructions) would pass the current text-file cases. Suggest one upload_test case, skipped
without xcrun like test_lane_gate_flag's host build, that puts a host `swiftc -O -dead_strip` gate binary into
`mkarch`'s Products and expects the refusal, plus the ungated binary passing.

### L2 (Low): the read-back proves the plist, not App Store Connect's marking

What Apple does with the key is evidenced by Xcode's help text and Apple's page. It is not yet evidenced by one of
our builds. It is also unverified whether an `--internal` export kept locally (destination `export`) and then
uploaded some other way (Transporter, Organizer) keeps the mark. Xcode does carry a `TFInternalTestingOnly` string,
which suggests it does, but that is not shown. Two things follow. After the first `--internal --upload`, App Store
Connect must show the build as internal before any tester group gets it, and that is a signed-in view, so it is the
Investors'. And upload.sh's usage should say the internal-only path is `--internal --upload`, not an export
uploaded by hand.

### L3 (Low): the post-build `--product` phase is not wired (author says so)

project.yml runs only the pre-build `check_lane_gate.py`, which reads settings. An archive made and distributed from
Xcode's Organizer never passes through upload.sh, so the product-level check doesn't see it. That is outside
upload.sh and outside this question. Wire `--product` into both targets' postBuildScripts when project.yml is next
open.

### L4 (Low): a strict `--archive --upload` does not re-check legal links in the product

An archive made by hand with `PW_INTERNAL_TESTFLIGHT=YES`, which turns the legal-links failure into a warning,
gets refused for having no `PWSourceCommit`. Only upload.sh `--project` writes that key. Getting such an archive
through means forging the key with PlistBuddy, which is not a slip. No action. Noted so nobody counts on a check
that isn't there.

### (a): no findings

- The stuck poll is sound. `markStuck` sends `stuck` through `pw_emit_live` into the C record queue (lock, then
  g_qlock), and the test callback runs on the run's own `for await` loop (BridgeTests.swift:36), not under
  `PyBridge.lock`. So a 10 ms poll there cannot hold up the marker write it is waiting for. A line that never comes
  still fails the assertions below it, with the marker text in the message.
- The `catalog.json` expectation matches project.yml line 268. Later, de81cd4d5 added `trees/` to both the install
  phase and the test.
- clean_export.sh does what its header says, under `set -euo pipefail`, and refuses a destination that is not empty.

## Probe files

Scratch: `/Volumes/Company SSD/company-scratch/T-2690-pernille/` (`wt/` is main plus 6beb56a49, uncommitted;
`probe/probe1.sh`, `probe/mark.swift`, `probe/main.swift`).
{% endraw %}

</div>
