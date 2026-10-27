---
layout: "default"
title: "C13 review: the Swift reader for the bundled premades (T-0416)"
section: "documents"
description: "Verdict: pass with fixes. The reader is correct for every edge case I could build, and the tests would catch a regression in each skip rule. One claim had no test behind it: that Runtime/ is not in the widget extension\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/premades-reader-t0416-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/reviews/premades-reader-t0416-pernille.md</code></span></div><h1>C13 review: the Swift reader for the bundled premades (T-0416)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Code under review: e93d5f36 (Idris, T-0404): pywidget/ios/App/Premades.swift, pywidget/ios/Tests/PremadesTests.swift (and its BridgeTests extension). Reviewed 2026-10-27 06:50-07:05 ET from the diff, pywidget/ios/project.yml and Shared/WidgetID.swift; not from the commit or board notes.

**Verdict: pass with fixes.** The reader is correct for every edge case I could build, and the tests would catch a regression in each skip rule. One claim had no test behind it: that Runtime/ is not in the widget extension. I added that test (below) and it passes.

## Runs


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Runs, scrolls sideways" style="--tw:937px" markdown="1">

| Run | Result | Log |
|---|---|---|
| `tools/xc_wait.sh 900 ... -only-testing:PyWidgetTests/PremadesTests -only-testing:PyWidgetTests/BridgeTests/testBundledPremadesRunFromTheBundleInTheAppProcess test`, iPhone 17e Simulator, after `xcodegen generate` | TEST SUCCEEDED: 5 of 5 (the author's 4 plus the new extension test) | ops/runs/xcodebuild-20261027-065422.log |

</div>


The run exited cleanly; xc_wait did not have to stop it.

## Edge cases, checked against the code


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Edge cases, checked against the code, scrolls sideways" style="--tw:960px" markdown="1">

| Case | What happens | Covered by a test |
|---|---|---|
| `_premade.py`, `_x.py` | skipped by `hasPrefix("_")`. `WidgetID.problem("_x")` is nil, so that prefix check is the only guard here, and removing it lists `_premade` and `_x` | yes (skip test, plus the `named("_premade")` nil assertion) |
| `.hidden.py` | `contentsOfDirectory` without `.skipsHiddenFiles` returns it. The name `.hidden` fails `problem` (leadingDot) | yes |
| `bad name.py` | badCharacter | yes |
| symlink `link.py` -> `a.py` | `isSymbolicLink` is true and `isRegularFile` is false (no symlink following), so it is skipped | yes; with the check removed, `link` would be listed and the test fails |
| folder `folder.py` | not a regular file | yes |
| `a.pyc`, `notes.txt` | wrong extension | yes |
| `pywidget.x.py` | `problem("pywidget.x")` is firstPartyPrefix, so it is skipped | no; low risk |
| name long enough that `pywidget.premade.<name>` passes 128 | the second `problem` call rejects it | no; low risk |
| Runtime/premade missing | `[]` | yes (the `missing` folder) |
| extension target | Premades.swift is under App/, and PyWidgetExtension builds only Widget + Shared, so the type does not exist there. Runtime/ is only a resource of the app target | **was not tested; now is** |

</div>


The run source is `.file(url)` with the bundle URL, and first_party comes from `RunRequest.json()` through `WidgetID.isInside`, which resolves symlinks on both sides. The test checks that the path resolves inside the bundle and that `first_party` is true for all 12.

## Would the tests catch a regression?

Yes, for the reader's rules: each skip rule has its own case in a temp folder, and the built-app test pins the exact set (the 12 plus `_premade.py`) and checks them byte for byte against widgets/premade. The bridge test runs 5 premades from the bundle and has a control (a mismatched id must draw no tree), so it can fail. Two limits:

- The byte comparison reads the source tree through `#filePath`. That works only on the Simulator, which can read the Mac's files. On a device the test would fail, not pass, so the limit is safe.
- `XCTAssertEqual(Bundle.main.bundleURL.pathExtension, "app")` is always true in a hosted test. It does not prove where runs happen; the new extension test does that job.

## Fix committed by the reviewer

`PremadesTests.testTheWidgetExtensionHasNoRuntimeFolder`: PyWidgetExtension.appex exists in the built app, has no Runtime/, and `Premades.all(in: appex)` is empty. Passed in the run above.

## For Idris (board, P2)

- `Premades.named` and `forWidgetID` compare names exactly (`==`, case-sensitive `hasPrefix`). Contract s7 compares ids by `WidgetID.key` (ASCII lower-case), so `pywidget.premade.Countdown` finds no premade in Swift, though the Python side may treat it as the same id. Either compare by key, or write down that premade ids are exact and lower-case. No current caller is affected: _premade.make() writes lower-case ids.
{% endraw %}

</div>
