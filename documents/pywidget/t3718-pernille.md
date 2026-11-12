---
layout: "default"
title: "T-3718: review of T-0729 as landed (229fa3e4)"
section: "documents"
description: "Verdict: PASS with findings. The change does what T-0729 asked: ProjectStore.nameKey now gives the same key to names APFS treats as one, through U+0345, and the tests that guard it go red without it. One Medium found\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3718-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 22 · Thu Nov 12</span><span><code>pywidget/docs/reviews/t3718-pernille.md</code></span></div><h1>T-3718: review of T-0729 as landed (229fa3e4)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-12 10:34 AM ET. Author: Idris. Workstream: editor.

Verdict: **PASS with findings.** The change does what T-0729 asked: `ProjectStore.nameKey` now gives the same key
to names APFS treats as one, through U+0345, and the tests that guard it go red without it. One Medium found while
checking it (M1). It is older than this change and my T-0728 review missed it: New File can empty an existing file
whose name APFS treats as the same, because `free` still compares with `caseInsensitiveCompare`.

## What was read

- `git show 229fa3e4`: `pywidget/ios/App/Projects/ProjectStore.swift` (+5 -3, `nameKey` decomposes, folds, composes)
  and the new `pywidget/ios/Tests/ProjectNameKeyTests.swift` (5 tests). Intent: the T-0729 line (from T-0728 Low,
  in [`pywidget/docs/reviews/t0722-projects-slice2-review-pernille.md`](t0722-projects-slice2-review-pernille.html), "Low (new)").
- Other T-0729 commits: 8ae955ef1a (retry line), a5719cc448 (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> record). No code.
- Main's HEAD (a71fdadffb): no commit since 229fa3e4 touches either file; `git diff 229fa3e4 HEAD` on both is
  empty. HEAD holds the code as reviewed.
- Callers of `nameKey`: `ProjectTransfer.archiveNames` (import naming), `WidgetScriptSave.siblings` (filters
  `main.py`, ASCII, unchanged). Keys are held in memory only, never stored, so nothing needs migrating.
- Test target: `project.yml` builds `Tests/` into PyWidgetTests; the file is in the project (4 entries).

## How it was checked (host only, no Xcode)

A host harness (scratch `T-3718-pernille/h/`, not kept) with the old and the new `nameKey` side by side, and an
APFS probe: write the first name, then the second with `O_CREAT|O_EXCL` on a case-insensitive APFS volume.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: How it was checked (host only, no Xcode), scrolls sideways" style="--tw:543px" markdown="1">

| Check | Old key | New key |
|---|---|---|
| `ῷ.py` against `Ω` + U+0342 + U+0345 + `.py` (test 1) | different (red) | same |
| `ῷ.py` = `ῼ͂.py` (test 1, the review's pair, `ῼ` + U+0342) | different (red) | same |
| six "already worked" pairs (test 4) | all hold | all hold |
| Greek Extended loop, 256 scalars x 3 forms (test 5) | 0 failures | 0 failures |
| 29,424 random pairs, mixed scripts, vs APFS | 13 disagree | 0 disagree |
| 21,882 random Greek vowel + mark pairs, vs APFS | 293 disagree | 0 disagree |

</div>


The new key agreed with APFS on all 51,306 pairs. Tests 2 and 3 (`archiveNames` numbers the second spelling; a zip
with both spellings imports both) rest on the key from test 1, so they go red with the old key too: under the old
key both names pass the Set, and the second write fails `.withoutOverwriting`. I did not run the XCTests themselves
(no Xcode in this packet).

Concurrency and file locks: `nameKey` is a pure static function; no state, no lock, no file touched. The import's
staging and `.withoutOverwriting` write are unchanged. Privacy: no names are logged or sent. Cost: one extra
normalisation pass per name; 1,000-copy imports were 0.24 s before and this does not change their shape.

## Findings

### M1 (Medium, older than this change): New File empties an existing file whose name APFS treats as the same

`ProjectStore.free` (line 282) still refuses a name only when `caseInsensitiveCompare` matches. That is looser
than APFS in some places and stricter in others. Where it says "different" and APFS says "same", `createFile`
goes on to `write(_:to:)` with no `replacing`, which sees the file exists, checks it is a regular file, and writes
`.atomic` over it. Probe on case-insensitive APFS, with the exact sequence (`free`'s comparison, then an atomic
write of the empty text):


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: M1 (Medium, older than this change): New File empties an existing file whose…, scrolls sideways" data-n="3 4" style="--tw:624px" markdown="1">

| In the project | Typed in New File | `free` refuses | `nameKey` equal | Result |
|---|---|---|---|---|
| `αι.py` ("precious = 1") | `ᾳ.py` | no | yes | one file, now empty |
| `𐐀.py` (Deseret) | `𐐨.py` | no | yes | one file, now empty |
| `ῷ.py` | `ῼ͂.py` | yes | yes | refused (correct) |

</div>


That is data loss, and it needs no import: a Greek user who has `αι.py` and makes `ᾳ.py`. It happens only on a
case-insensitive volume: the Simulator, and an iPhone app run on an Apple silicon Mac unless the app opts out. An
iPhone's own data volume is case-sensitive, so there the two names should be two files. I have not checked that
on a device here. The conflict-copy path (`free` then `write`, line 251) has the same shape.

My T-0728 review counted 397 such pairs and called the only effect "a ' 2' that was needed anyway". That was true
for import and wrong for New File. I missed it.

Fix: `free` compares by `nameKey` (the set of keys of what is there, without `current`'s key); the probe above shows
that key matches APFS. Also make `createFile` write without replacing (`O_EXCL` or `.withoutOverwriting`), so New
File can never replace a file whatever the name check says. `move`'s case-only test (`caseInsensitiveCompare(old)`)
should use the same key. Test, red on today's code: a project holding `αι.py` with text, `createFile("ᾳ")` throws
`.exists` and `αι.py` keeps its text; the same with `𐐀.py` and `𐐨`. The doc comment on `nameKey` ("the equality
`free` uses") is only true once this lands. Board line T-4176, owner Idris.

### L1 (Low): `ProjectSendPlan.key` still has the old rule

`pywidget/ios/App/Projects/ProjectSendPlan.swift` line 119 says it is "ProjectStore.nameKey's rule, here so Core
can test it", and still composes before folding (written in 1c955ed795, before 229fa3e4 landed). So the send's
case-clash refusal (from T-1932) misses `ῷ`/`ῼ͂` and the like. Nothing in the app calls `ProjectSendPlan` yet, so it
does nothing today. Fix when it is wired: make it decompose first, or have `nameKey` call it, so there is one rule.
No line.

### L2 (Low): the Greek block test does not guard the fix

`testGreekExtendedBlockKeysAgreeAcrossFormsAndCase` passes with the old key too (0 failures in the harness): single
precomposed scalars, their NFD and their uppercase all agree under both orders. The failing case needs a mark
before U+0345 in a decomposed name of a different case. Tests 1 to 3 do guard the fix, so this is a weak test, not a
missing one. Cheap repair, checked in the harness: also compare `nameKey(c)` with the key of the scalar's titlecase mapping
(`sc.properties.titlecaseMapping`, as is and decomposed). That fails for 3 scalars with the old key and 0 with the
new. No line.

### Note: "add the pair to the fixtures"

The board line asked for the pair in the T-0722 fixtures. It is in the unit test instead (MiniZip builds the zip),
which is the better place. `make_collisions.py` is unchanged.
{% endraw %}

</div>
