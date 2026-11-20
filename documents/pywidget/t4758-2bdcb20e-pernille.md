---
layout: "default"
title: "Review of 2bdcb20e: T-4758, ShortcutRecipeTests no longer writes PNGs into the checkout"
section: "documents"
description: "Where the PNGs go now: nowhere on disk, unless PW_SHORTCUT_SHOTS_DIR is set in the test process (xcodebuild passes it through as TEST_RUNNER_PW_SHORTCUT_SHOTS_DIR). With it set, the six files (three recipes, small and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4758-2bdcb20e-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>pywidget/docs/reviews/t4758-2bdcb20e-pernille.md</code></span></div><h1>Review of 2bdcb20e: T-4758, ShortcutRecipeTests no longer writes PNGs into the checkout</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4940, Commandment 13). Author: Idris. Reviewed: 2bdcb20e18 as a whole (one file,
ios/Tests/ShortcutRecipeTests.swift, +7/-3), against the T-4758 board line. The author's memory and board notes were
not read. The file has not changed since 2bdcb20e (main at 90dd88de). Paths are under pywidget/. Date: 2026-11-20.

## Tests run

- MacBook runner, `XC_TASK=T-4940 tools/xc.sh ... -only-testing:PyWidgetTests/ShortcutRecipeTests test`, queued as
  J-20261120-0634-xc-test at 90dd88de (job file 7bbaa7cd0b): passed, exit 0, 78.8 s, 6 executed, 0 skipped,
  0 failures (runner log ops/runs/xcodebuild-20261120-063625.log, on the MacBook).
- Checkout after it: the main folder has no `app-guide-shots/shortcuts/` folder and no new PNG under `pywidget/`
  (`git status --porcelain --untracked-files=all`; the only untracked PNGs are this morning's site-check report
  shots under ops/site-checks/reports/, not this test's). The run itself happened in the runner's job checkout,
  which I cannot see from here; that it stayed clean rests on the code below, not on a look at that disk.
- No mutant: nothing in the repository asserts "the checkout is clean after a run", so putting the old write back
  would pass every test (see L3).

## Verdict: PASS with findings

Where the PNGs go now: nowhere on disk, unless `PW_SHORTCUT_SHOTS_DIR` is set in the test process (xcodebuild passes
it through as `TEST_RUNNER_PW_SHORTCUT_SHOTS_DIR`). With it set, the six files (three recipes, small and medium) go to
that folder under fixed names and are overwritten on each run, so the folder is bounded at six files; the caller
owns it and cleans it. With it unset, which is every runner job and every `tools/xc.sh` run in the repository (nothing
sets the variable; `git grep` finds it only in this file), the `draw()` helper writes nothing. Writable: the hosted
unit test runs as a Simulator process on the Mac, which could already write a host path (the old code wrote into the
checkout through `#filePath`), so any absolute folder the user can write works on both the local Mac and the MacBook;
the MacBook runner never sets it, so there is no write to fail.

The test checks what it checked before. Every assertion is unchanged: the printed line, the tree's widget id and
text, the reload ids, the family's root being present, and the renderer producing a CGImage and PNG data
(`XCTUnwrap`). The PNG was never compared with anything; only the side effect moved.

Readers of the old place: none that run. `git grep app-guide-shots` outside log/ finds the folder's own README (which
does not mention `shortcuts/`), plans and audit records that name the folder or list these six paths as history
(ops/queue_audit/links-2026-11-13.json and -14, ops/merge_queue_hold.txt:1298, ops/plans/T-4786-bad-tests.md row 18),
and no script, site page, docs page or test that opens `app-guide-shots/shortcuts/*.png`. The six files were never
tracked (`git ls-files` has none, no deletion in history), so nothing that was shipped or published loses a picture.

## Findings

### L1 (Low): the comment says the PNG "always travels as an attachment"; on a green run it does not

`ShortcutRecipeTests.swift:66` says the PNG always travels as an attachment, but `add(XCTAttachment(...))` leaves
`lifetime` at its default, which Apple documents as `.deleteOnSuccess`, and project.yml's scheme sets no attachment
lifetime. So a passing run keeps no copy of the drawing anywhere: not in the checkout (the point of this change) and
not in the .xcresult. I did not open the runner's .xcresult to see it; this rests on the documented default.
PremadeSnapshotTests.swift:140 sets `a.lifetime = .keepAlways` for the same purpose. Fix: either set `.keepAlways` so
the picture survives in the result bundle (bounded by the runner's own result clean-up), or change the comment to say
the attachment is kept only when the test fails.

### L2 (Low): the class doc comment still names the old folder

`ShortcutRecipeTests.swift:8` still says the tree is "drawn ... into app-guide-shots/shortcuts/<recipe>-<family>.png".
That is the one place left in the repository that sends a reader to the old folder. Fix: say "drawn with
TreeEntryView, attached to the test, and written to PW_SHORTCUT_SHOTS_DIR when set".

### L3 (Low): a relative folder lands somewhere odd, and nothing holds the clean checkout

`URL(fileURLWithPath: dir)` resolves a relative value against the test process's working directory on the
Simulator, not the checkout, so `TEST_RUNNER_PW_SHORTCUT_SHOTS_DIR=shots` writes into a Simulator folder nobody looks
at. Fix: say "absolute path" in the comment, or skip with a message when `dir` does not start with `/`. And no test
fails if a later edit writes into the checkout again (the bug T-4758 fixed, row 18 of the T-4786 plan); a one-line
RepositoryTests check that the Tests folder holds no `#filePath`-relative write into `app-guide-shots` would hold it.
Optional.

## Checked and fine

- The `!dir.isEmpty` guard: an empty variable writes nothing.
- `createDirectory(withIntermediateDirectories: true)` on an existing folder does not throw; a second run overwrites.
- The commit's message matches the diff; the T-4758 board line's claim (no PNGs into the checkout) holds by the code
  and by the local checkout after the runner job.

## Board lines

- L1-L3: T-5310 ("Keep the recipe drawings honestly"), owner Idris, from T-4940.
{% endraw %}

</div>
