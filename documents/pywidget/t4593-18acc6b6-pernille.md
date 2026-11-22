---
layout: "default"
title: "Review of T-4593 at 18acc6b6: check the inherited versions in the licence list (from T-4031 M1)"
section: "documents"
description: "FAIL. The check itself does what T-4593&#x27;s Done asks: every hand-typed &quot;as in&quot; version is tied to its ancestor&#x27;s, a stale or misspelled one is refused, a CPython or Jedi bump now flags all 18 rows, and the .txt matches\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4593-18acc6b6-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t4593-18acc6b6-pernille.md</code></span></div><h1>Review of T-4593 at 18acc6b6: check the inherited versions in the licence list (from T-4031 M1)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5538, Commandment 13). Author: Odalys. Reviewed: `git show 0f1cb3b290` (the work; 18acc6b636 is
its board tick in the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> outbox), that is tools/acknowledgements.py (+49/-4: `INHERITED`, `own_version_ancestor`,
`check_inherited_versions`, the .txt writer), tests/acknowledgements_test.py (+51/-1) and
pywidget/ios/Acknowledgements/Acknowledgements.txt (18 headings split). Judged against T-4593's Done on the board (an
"as in " version must equal "as in <name> <version>" of an ancestor with a version of its own; a part with no version
of its own must use that form; the .txt heading moves the inherited version to the line under the name, as the app
does; the test refuses a stale and a misspelled inherited version). Also read, for what it relies on: the rest of
`evaluate` and `outputs` in tools/acknowledgements.py (the manifest and `version_from` checks, `part_of` rows, the
missing list), the real rows of pywidget/licenses/components.json, and the app's rule in
pywidget/ios/App/Acknowledgements.swift (`inheritedPrefix`, `title`, `rowFootnote`, `NoticeBlock`). Nothing after
0f1cb3b290 touches these files (HEAD 8f0cdb5d34). Line numbers are HEAD's. Date: 2026-11-21.

What I ran (scratch copies under the T-5538 scratch folder; no tracked file edited; no Xcode, Investors' #325):
- `python3 tests/acknowledgements_test.py` at HEAD: PASS 98 FAIL 0, and no "real tree" line printed.
- The same test at the parent 0f1cb3b290^ (git archive of pywidget/, tools/, tests/, log/assets.md): PASS 138 FAIL 0.
- HEAD's test with the early return put back in the SKIP branch (H1's fix, scratch only): PASS 152 FAIL 0, that is
  the 138 old cases, all real-tree ones included, plus the 14 new ones. So the new check passes on the real registry.
- `python3 tools/acknowledgements.py check` on the tree: ok. `build` with `--root` on a scratch export of HEAD, then
  `diff -r` against the committed pywidget/ios/Acknowledgements/ and pywidget/licenses/audit.json: identical. The
  committed Acknowledgements.txt is what the tool writes.
- On the scratch export, `check` with typeshed set to "as in Jedi 0.19.1" (stale) and django-stubs to "as in jedi
  0.19.2" (misspelled): both refused by name ("expected 'as in Jedi 0.19.2'"), exit 1. CPython set to 3.15.2: 16
  inherited-version failures, every CPython-derived row (hacl-krml through hacl, whose own version is inherited, to
  CPython). Jedi set to 0.19.3: typeshed and django-stubs refused, jedi-authors not (M1).
- `check_inherited_versions` called directly on near-misses (L1).

## What holds

- The rule is right where the Done puts it. `own_version_ancestor` (tools/acknowledgements.py:318) walks bundle.of,
  which is all `part_of` is (`outputs`, :574-575), skips ancestors whose version is itself inherited, and stops on a
  cycle; the check (:330) compares the whole string, so a stale number, a wrong-case name, a lost or capitalised prefix,
  a bare "as in " and "as in CPython" with no number are each refused. A part naming a non-ancestor fails.
- The 18 real "as in" rows (16 under CPython, typeshed and django-stubs under Jedi) all hold, and a bump of either
  parent now refuses every one of them, which is the failure T-4031 M1 named.
- The app's footnote rule still matches. The app moves a version when it has the exact prefix "as in "
  (Acknowledgements.swift:33-37); the tool's `INHERITED` is the same string and the .txt writer tests it the same way
  (:592-597, :606). Since the check refuses any other "as in" spelling, every version the app treats as inherited is
  the exact ancestor form, and the 18 split .txt headings are the same 18 rows the app shows without a version after the
  name.
- The tests are the ones the Done asks for and they bite: stale and misspelled are refused with exit 1, the exact form
  and a real own version pass, a grandchild is judged against its nearest own-version ancestor, and the heading test
  reads the built .txt for the name alone with the version on the next line.

## Findings

### H1 (High): the new cases cut off the old ones; 54 assertions, the real-tree checks among them, no longer run

tests/acknowledgements_test.py:571-622. The block was pasted into section 17's SKIP branch: the branch's
`return finish(roots)` became a comment (:573), the new cases follow at function level, and a new
`return finish(roots)` at :622 ends `main()` before the old section 17 (`failures(ROOT)` onward), 17b (the incorporated
list) and the otool -L cases. Lines 623-866 are now dead, 54 assertions as run (152 with the fix less 98), and among them every check on the
shipped licence files: no failure beyond the known open notices, HACL*'s and mimalloc's notice texts, libffi on the
screen iff _ctypes ships, no host-only package on the screen, and the archive gate failing iff `complete` is false.
The suite prints PASS 98 FAIL 0 and exits 0, so tests/run.sh and the land check see green. A regression in any of
those would now pass. The commit message's "was 83 before" is also wrong: the parent runs 138. Fix: put
`return finish(roots)` back as the SKIP branch's body, move the T-4593 block above section 17 (or after its end), and
check the count is 152. Filed as T-5545 (Odalys, P1).

### M1 (Medium): three parts with no version of their own still carry a copied number the check accepts

tools/acknowledgements.py:333 and :339; tests/acknowledgements_test.py:598. jedi-authors "0.19.2", parso-authors
"0.8.7" and requests-notice "2.32.5" (pywidget/licenses/components.json) are files inside their parent's wheel or tag:
an AUTHORS.txt or NOTICE has no version of its own, the number is the parent's, typed by hand. The check counts a
version equal to the parent's as the part's own (the docstring names Jedi's authors file as the example, and the
`inh-same` test pins it), so a Jedi bump to 0.19.3 refuses typeshed and django-stubs but leaves "Jedi authors
(AUTHORS.txt) 0.19.2" on the screen, and the check passes. That is T-4031 M1's drift on three rows, and the Done's "a
part with no version of its own must use that form". Their notice paths carry the version too, so a re-pin would
probably catch the eye, but nothing checks the version. Fix: write those three "as in Jedi 0.19.2", "as in parso
0.8.7", "as in Requests 2.32.5" (the app then shows them as it shows typeshed), and refuse a part's plain version
that equals its nearest own-version ancestor's; turn the `inh-same` case round. Filed as T-5546 (Odalys, P2).

### L1 (Low): some near-misses of the form still pass as an own version

:339 recognises an attempted inherited version by `lower().startswith(("as in", "in "))`, "inherited", "same" or
empty. Called directly, "as  in CPython 3.15.1" (two spaces), "(as in CPython 3.15.1)", "per CPython 3.15.1" and
"CPython 3.15.1" all pass, and the app and the .txt would then print them after the name ("cfuhash as  in CPython
3.15.1"). No real row is like that today. Fix: treat any version containing a word "in" or an ancestor's name as an
attempt (`re.search(r"\bin\b", v, re.I) or anc.name in v`) and require the exact form.

### L2 (Low): the .txt puts the inherited version above the licence; the app puts it below

:592-597 write name, "as in CPython 3.15.1", "Licence: ...". The app's notice page (NoticeBlock,
Acknowledgements.swift:380-384) shows the title, the licence, then the inherited version, and the list row puts it after
the licence ("MIT License · as in Jedi 0.19.2"). The Done asks only for the line under the name, which holds; the
order differs. Fix, when convenient: write it after the Licence line, so the two read the same.

### L3 (Low): the missing-notice branch for an inherited version is not tested

:606-609 split the heading of a row with no notice the same way, but no case builds one; today `missing` is empty in
the real tree, so the branch first runs when a notice goes missing. Fix: one case with an "as in" part whose notice is
absent, reading the NOTICE MISSING block.

## Verdict

FAIL. The check itself does what T-4593's Done asks: every hand-typed "as in" version is tied to its ancestor's, a
stale or misspelled one is refused, a CPython or Jedi bump now flags all 18 rows, and the .txt matches what the tool
writes and the app's footnote rule. The shipped files are correct (I rebuilt them and ran the real-tree checks with
the fix in a scratch copy: 152 pass). But the commit disables 54 of its test file's assertions, all the real-tree
ones included, while reporting green (H1), and three parts keep a copied version the check accepts (M1). H1 is a
two-line move; with it fixed and re-run this would be PASS with findings. Board lines T-5545 (H1) and T-5546 (M1);
the three Lows can ride with T-5546.
{% endraw %}

</div>
