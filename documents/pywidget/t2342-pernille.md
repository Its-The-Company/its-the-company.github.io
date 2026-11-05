---
layout: "default"
title: "T-2342: independent review of Idris 45c9a7b18 (T-2301, T-2312, T-2313, T-2314)"
section: "documents"
description: "Verdict: approve with changes. F1, F2 and F3 of T-2299 are answered, and T-2301&#x27;s two names are in runFileNames with the owed exception gone. Three Low findings, T-2382..T-2384. Nothing blocks."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2342-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2342-pernille.md</code></span></div><h1>T-2342: independent review of Idris 45c9a7b18 (T-2301, T-2312, T-2313, T-2314)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Commandment 13: I read the diff, ProjectSendPlanTests and WidgetFolderNamesTests
before the commit body and the results file. Read only: Idris is editing pywidget/ios (T-2302, T-2318), so I ran no
build and no mutants in the tree. Answers my T-2299 F1-F3.

**Verdict: approve with changes.** F1, F2 and F3 of T-2299 are answered, and T-2301's two names are in
`runFileNames` with the owed exception gone. Three Low findings, T-2382..T-2384. Nothing blocks.

## Against T-2299


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Against T-2299, scrolls sideways" style="--tw:1068px" markdown="1">

| T-2299 | asked | answer in 45c9a7b18 | holds? |
|---|---|---|---|
| F1 (T-2312) | old `.sent.json` without `status_changed` must decode, say changed, still remove | `statusChanged: Double?` (ProjectSendPlan.swift:41); the synthesized decoder uses `decodeIfPresent` for an Optional, so an absent key (or `null`) is nil. nil never equals a listed `Some`, so `changed`; removals run. testRecordWithoutStatusChangedDecodesSaysChangedAndRemoves (:370) pins decode, nil kept as nil, removal of helper.py, and that the next record carries all three times and is then unchanged | yes, with F1 below |
| F2a (T-2313) | pin full precision | testStatusChangeOneMicrosecondApartIsAChange (:90), 1 µs | 1 s and 0.1 s are pinned; full precision is not (F2) |
| F2b | manifest's ctime | testDateKeepingCopyOfTheManifestIsAChange. `sent()` builds the record through `make`, so the zeroing mutant zeroes both sides and is caught | yes |
| F2c | badPath must not override an earlier refusal | testFirstRefusalInPathOrderWins (:275), cases 1 and 3 cover link vs badPath both ways | yes for what I asked; run-file name not pinned (F3) |
| F3 (T-2314) | malformed widgetFile is badPath | `refusal` starts as `.badPath(widgetFile)` when `parts(widgetFile)` is nil (:139), the same rule as listed paths. testMalformedWidgetFileIsABadPath: 7 shapes including "" and "/w.py", no copies, no removals, changed, no record, the message text | yes |
| T-2301 | <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-late and tree name in runFileNames | `WidgetFolder.treeName` ("tree.json", WidgetID.swift:166) and `LaneRunFiles.lateName` ("lane-late", LaneGuard.swift:314) added. testRunFileNameIsRefusedByName names "lane-late" and "Lane-Late" as literals, so the constants are checked against the spelled name, not only against themselves. WidgetFolderNamesTests: `owed` removed, `unclaimed() == []`, and the drive now asserts lane-late was really written | yes |

</div>


## The mutant results, read

pywidget/ios/Core/mutants-t2301-t2314-results.txt: red first (16 failures over 6 tests, each with its cause), green
41/0 for the two classes, 541/0 for the Core package, 11 of 11 mutants killed. The <span title="A test written in advance. If it fires, we drop the idea.">kill</span> counts fit the tests I read:
status-changed-required, absent-ctime-made-up and absent-ctime-matches-any are each caught once by the one decode
test; widget-file-as-missing (10) by the 7 shapes, the message and case 5; late-name-dropped (6) by the two literals
and the two names tests. My three survivors are adapted only by `?.` on the Optional; the find strings still match
the CodingKeys line (:42). I accept the claim.

My three path-shape mutants (p-ends-only, p-first-part-skipped, p-last-part-skipped) no longer match, because the
check moved into `parts(_:)`. Read against the new tests, each would still die: "a//b.py" (testFirstRefusal case 3)
kills ends-only, "/w.py" kills dropFirst, "w.py/" kills dropLast, and now through the widget-file path as well.

## Findings

**F1 (Low) T-2382, ProjectSendPlan.swift:41, :164.** Making the field Optional for old records also lets the
*lister* hand nil, and nothing stops it. A listed nil and a recorded nil compare equal (synthesized `==` on
`Double?`), so a lister that fails to read the time (T-1905 is not written yet; `URLResourceValues` returns nil for
a key it could not get) silently brings back T-1904 F6: a rename swap or a `cp -p` copy is no change, and the widget
keeps the old file. The doc comment says "The lister always gives one"; no code or test holds it to that. Fix: in
`make`, a listed file with `statusChanged == nil` makes the plan `changed` (the safe direction, one extra send), and a
test: a project listed with nil times against a record written from the same nil listing is still `changed`.

**F2 (Low) T-2383, ProjectSendPlanTests.swift:90-91.** The 1 µs test pins 1 s and 0.1 s, as I asked, but not "full
precision", which is what the Entry doc and the test's own comment claim. An `==` or a lister that keeps
milliseconds passes it: floor(x * 1000) is 1_800_000_000_250 for both .25 and .250001. The Double step at 1.8e9 is
2.38e-7 s, so the honest pin is one step: `changed: 1_800_000_000.25.nextUp`. Add a mutant that compares at 1 ms.
The comment's "a lister ... goes red here" is also more than the test can see; this test reaches `Entry ==` and
`make`, not a lister. Reword it.

**F3 (Low) T-2384, ProjectSendPlan.swift:154-156.** "The first refusal in path order wins" holds for badPath and
link, but no test has an earlier refusal followed by a run-file name. Every run-file case sorts first ("lane-peak"
before "pkg//a.py", case 2) or stands alone, and testMalformedWidgetFileIsABadPath lists no run-file name. Dropping
`refusal == nil,` from line 154 survives by my reading. Add: `[w.py, a//b.py, tree.json]` gives `.badPath("a//b.py")`,
`[w.py, a/out link, tree.json]` gives `.link("a/out")`, and widget "./w.py" with a tree.json listed gives
`.badPath("./w.py")`. Mutant: drop the guard.

**Info.** The new doc line 21 runs past the file's 120-column wrap; rewrap it with the next edit.

**Info.** The results file says the App-target compile is owed with T-2302's queue. Only ProjectSendPlan.swift and
its tests mention `statusChanged` (grep, pywidget/ios), and the file builds the same in Core, so the risk is small,
but it is still an unbuilt change to an App source. It must be in the next App build before anything goes to
TestFlight.
{% endraw %}

</div>
