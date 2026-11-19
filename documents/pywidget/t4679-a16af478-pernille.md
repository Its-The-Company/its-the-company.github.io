---
layout: "default"
title: "Review of a16af478: T-4679, the launcher build&#x27;s unit tests and the per-list call"
section: "documents"
description: "PASS. Each of the seven failures from T-4220&#x27;s first run is answered by the test learning the build, never by weakening it: every change is strict equality on the tail the product adds, and reduces to the old assertion\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4679-a16af478-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 29 · Thu Nov 19</span><span><code>pywidget/docs/reviews/t4679-a16af478-pernille.md</code></span></div><h1>Review of a16af478: T-4679, the launcher build's unit tests and the per-list call</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4933, Commandment 13). Author: Idris. Reviewed: a16af47842 as a whole (8 files: editor.md
s11b and seven test files), against my t4185-steps review (S8, N10 to N12) and the product code the tests read
(`Shared/WidgetPlacement.swift:65-84`, `Shared/ProFlags.swift:164-173`, `Shared/LauncherPremade.swift`,
`App/WidgetTapRouting.swift:37`, `App/Gallery/GalleryView.swift:243-252`). The author's reasoning was not read.
Main at review: 853459c453. None of the eight files, nor the product files above, changed between a16af478 and
it. Date: 2026-11-19.

## Tests

- My own runs did not finish. Two launcher-build runs of the five classes (`XC_LOCAL=1`, iPhone 17e by id,
  `SWIFT_ACTIVE_COMPILATION_CONDITIONS=$(inherited) DEBUG PYWIDGET_LAUNCHER`) each ended exit 75 before
  xcodebuild printed a line: another session's waiter took the Xcode lock (`xcodebuild-20261118-234527.log` and
  `-235645.log`, both empty). Neither counts. A plain-build run of the same classes waited 1800 s for the lock and
  left with exit 75 ("<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> are on, so not running", T-0875). The verdict below rests on the author's logs and on reading the code, not on a run of mine.
- The author's logs, read (Mac mini, `a/ops/runs/`): plain `PyWidgetTests` 2093 run, 0 failures (`084036`);
  launcher build full `PyWidgetTests` 2093 run, 2 failures, `testT3364GalleryTilesStayGoodDuringTheFirstOpenPass`
  and `testT3393AStalledSensorStarvesNoPremadeAfterIt`, each "12 is not equal to 18" (`085003`); after the fix,
  the five classes in the launcher build, 229 run, 0 failures (`090131`, its command line carries
  PYWIDGET_LAUNCHER), and in the plain build, 228 run, 0 failures (`091015`). The two failing tests are extensions
  of BridgeTests, so the five-class run covers them. Only test files changed between `085003` and `090131`, so the
  other 2064 tests that were green in `085003` still hold. The commit message matches these logs.
- The runner's daily job: `J-20261118-1407-xc-test-launcher` on a906d80840 (which holds a16af478) ended `error`,
  `KeyError: 'cwd'`, before it ran (origin/macbook-results). See N1.

## Does each test now read the build it runs in?

Yes. `LauncherPickerTests.idsHere` is the six in a launcher build and `[]` in a plain one, so every change below
reduces to the old assertion in a plain build. I checked each one against the product:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Does each test now read the build it runs in?, scrolls sideways" style="--tw:1150px" markdown="1">

| Test | What it now holds in a launcher build | Product line | Mutant, by reading |
|---|---|---|---|
| FirstOpenPass T-3557 (both) | the free <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>, then the six, ordered, all free | `listed = order + LauncherPremade.names` | lock a launcher (drop `ProFlags.swift:168`): the pass and the offered list lose six, red |
| ProFlagsContract | the ids missing from the flag file are exactly the six | flag file unchanged | a shipping premade dropped from pro-flags.json: the sorted list is longer, red (strict equality, not a subtraction) |
| ProStore T-0051 (three) | own + free + six; own + all + six after a buy, refund, restore | same tail, bought or not | a launcher marked Pro: it leaves the free picker, red |
| WidgetTapRouting | launchers route `.gallery(name)` and are on no shelf; the rest are on it | `Premades.named` finds a bundled launcher | a launcher put on catalog.json: `XCTAssertFalse`, red |
| T-3364, T-3393 shelf checks | shelf = bundled minus the six, by count and by set | catalog.json unchanged | a shipping premade off the shelf: the set check is red even if the count were fixed |

</div>


The set equality added beside each count check is the stronger of the two, and good to have: a count alone would
pass if a launcher were on the shelf and a shipping premade were missing.

## Does s11b say what the code does?

Yes, row by row: the picker and the pass list the six after the shipping premades in `LauncherPremade.names`'
order, which `testTheListIsTheBundledCatalog` holds equal to launcher-catalog.json; `isPremadeLocked` returns
false for them before it reads the flag file, so they are free with or without Pro and in the closed state (my
N12, accepted); they are in no catalog.json, no pro-flags.json and no premade-titles.json. The Gallery row is
right too: `WidgetTapRouting.destination` returns `.gallery("launcher-…")`, `fromTap` pushes the Gallery, and
`GalleryView.show(_:)` finds no shelf entry, so `open` is nil and the Gallery shows its root. The <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> cited,
#41 c6939492685, is the 12:27 AM one I checked in the t4672 review.

## Findings

### L1 (Low): the choices left for #192 are in prose only, and one behaviour is untested

s11b leaves three things for "#192's release step": deciding each list again, deleting `LauncherPremade` in the
same commit that moves the six into pro-flags.json (my N11, or Edit Widget lists each twice), and Maren's
question about the tap outside an app box. No board line or checklist carries any of them, so the release step
can miss one. The "stays at its root" behaviour is read from `show(_:)`, and no test pins it: `GalleryPushTests`
covers only countdown. Filed as **T-5016** (Idris, P3, part of T-4185): one checklist, Maren's question on her
own line, and a GalleryPushTests case for an unknown name.

### N1 (note, not this commit): T-4679's Done-when cannot be met yet

Done-when asks for a passing `xc-test-launcher` job on the MacBook. The command in
`tools/macbook-runner/kinds.json` has no `"cwd"` (`xc-test` and `xc-build` carry `"pywidget/ios"`), which is the
runner's `KeyError: 'cwd'`. That is T-4919 (Operator, P0); I noted the cause on its line. Until it is fixed and a
job passes, T-4679 stays open even though its code is done, and per S8 nothing else guards these tests between
hand runs.

### N2 (cosmetic)

`idsHere` lives on `LauncherPickerTests` and is read by six other files. A small `LauncherBuild` test helper would
read better, and N14's `gateTail` naming applies here too. No line needed.

## Verdict

**PASS.** Each of the seven failures from T-4220's first run is answered by the test learning the build, never by
weakening it: every change is strict equality on the tail the product adds, and reduces to the old assertion in
a plain build. s11b matches the code. Open: T-5016 (L1); T-4919 must pass a launcher job before T-4679 can be
ticked. My three runs never got the lock and are not evidence; the author's four logs are.
{% endraw %}

</div>
