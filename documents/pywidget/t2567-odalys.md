---
layout: "default"
title: "T-2705 review: T-2567 + T-2568 (Pernille, 233f2ab88; same content landed as 6cd420c40)"
section: "documents"
description: "Verdict: pass. F1, F2 and F3 are fixed in the code, not only in the fixtures. One note (N1) is for T-0389, which will wire the card. It is older than this commit and does not block it."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2567-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2567-odalys.md</code></span></div><h1>T-2705 review: T-2567 + T-2568 (Pernille, 233f2ab88; same content landed as 6cd420c40)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys, 2026-11-05. Independent review (Commandment 13) of the fixes for my review
pywidget/docs/reviews/t1872-odalys.md F1-F3. Read: the diff (runner.py `_frames`, `_site`, `_user_syntax`,
`run`, `_internal`; TracebackFold.swift; contract s8; both test files; make_fixtures.py; the mutant lists and
pywidget/ios/Core/mutants-t2567-results.txt) and RunDetail.swift's error trim. Not read: Pernille's notes.
The Swift half is judged by reading only: this session did not hold the Xcode slot, so I did not run
`swift test`. The TracebackFoldTests 23/0 and Swift mutants 58/58 figures are Pernille's, not mine.

**Verdict: pass.** F1, F2 and F3 are fixed in the code, not only in the fixtures. One note (N1) is for
T-0389, which will wire the card. It is older than this commit and does not block it.

## Measurements (host, load average ~21)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Measurements (host, load average ~21), scrolls sideways" style="--tw:694px" markdown="1">

| Check | Result | n |
|---|---|---|
| Bridge suite, `python3 -m unittest discover` in pywidget/tests/bridge, CPython 3.9.6 | 279 run, OK, 5 skipped, 54 s | 1 run |
| Same, CPython 3.13 | 279 run, OK, 43 s | 1 run |
| My own probes, real runner through `Scenario` (probe.py in scratch), 16 programs | all as below, the same on 3.9 and 3.13 | 2 runs |

</div>


Probe results (`frames_cut_repeats` is the flag):

- Two-function cycle, both parities (omitted 202 and 203; the odd one has equal neighbours f1/f1): flag false. Three-function cycle (omitted 204): false. Five-function cycle where 5 does not divide omitted + 1 (405): false.
- A real `RecursionError` (no depth guard): omitted 894 on 3.9 and 895 on 3.13, flag **true**.
- A cut of exactly one frame (101 frames): flag true. Exactly 100 frames: omitted 0, flag false.
- Recursion broken once in the dropped part by a different user function (`walk -> helper -> walk`): neighbours equal (walk line 6), flag false. Broken by a stdlib frame (`functools.reduce` calling back into `walk`): neighbours equal, flag false.
- `import helpers` with a bad line 3: status `error`, `syntax` at helpers.py line 3. `import pkg.bad` (a user package): `syntax` at bad.py line 1. A bad line in the run's own file: status `syntax_error`, as before.
- `raise SyntaxError('m', ('main.py', 1, 1, 't'))` (a relative name): `error`, no `syntax`, no crash. A `str` subclass filename pointing at the user's file: `syntax` sent, no crash.

## F1-F3

1. **F1 fixed.** `_frames` (runner.py:973-983) compares every dropped frame and the inner neighbour
   (`out[k:len(out) - k + 1]`) with the outer neighbour `out[k - 1]`, by path, line, both UTF-16 columns
   and name. I checked the slice bounds by hand, and the probes above cover both neighbours, a cycle of
   each period, and a break by a user or library frame. In Swift, `fold` joins across the cut only when
   `i == at - 1` and `cut.repeats` is true (TracebackFold.swift:133-135). Without the flag, the two equal
   neighbours stay two rows and `omitted` stays shown. A missing flag (an older runtime) reads as false
   (`cut(omitted:repeats:)`), which is the safe side. The old `[b, a, a, b]` test now runs both ways.
   Contract s8 says the same thing in plain terms, including why equal neighbours prove nothing.
2. **F2 fixed.** `_user_syntax` sends `syntax` only when `_kind(filename) == "user"`, the runtime's
   realpath rule. The new test covers `exec`, `eval`, `compile`, `ast.parse` and a site-packages import;
   each keeps the frames, with the innermost user frame at the call. `card` in Swift also refuses a
   non-user `syntax` by its path (defence in depth, mutant-pinned).
3. **F3 fixed.** The `isinstance(path, str)` guard is in place, and `_syntax` is wrapped so a failure keeps
   `error` and its frames. The test proves the s6 thread join still runs (`late` printed). The old
   `_format` crash (my T-1872 note 6) is not claimed as fixed, which is correct.

Card text (contract s8): this commit adds no text a user sees. TracebackFold returns rows, counts and a
jump, and the card's words belong to T-0389. The contract wording stays plain.

## Notes (not blocking)

- **N1, for T-0389. The stored run detail drops the outer frames, so the cut index no longer marks the cut.**
  RunDetail.trimError (RunDetail.swift:82-90) keeps an error under 8 KiB by removing frames from the outer
  end. Any error with a cut is far over that: the deep_recursion fixture's `error` is 26,687 bytes and
  mutual_recursion's is 87,603. Imitating the trim in Python (text cut to its 2 KiB floor, then frames
  from index 0), about 28 and 22 frames are left. `frames_omitted` and the flag survive, but
  `Cut(at: 50)` is past the end of the array. The card would then read "walk x28, 895 not kept" while 72
  more frames were dropped and never counted. If 50 to 99 frames were left, index 49 would not be the cut
  at all. This is older than 233f2ab88 (T-1841 plus RunDetail) and matters only if T-0389 builds the card
  from the stored detail. Fix options: have the trim also remove `frames_omitted`/`frames_cut_repeats` (or
  add the frames it drops and clear the flag), or have the runtime send the cut index (my T-1872 note 4).
  Board line T-2724.
- **N2.** `compile(src, __file__, 'exec')` with a bad string sends `syntax` at the user's own file, at the
  string's line. With `exec(compile('\n\ndef f(:', __file__, 'exec'))` in a one-line file, that is line 3
  of a 1-line file. CPython's Raw says the same, so the card agrees with Raw. Rare. T-0389 should treat a
  jump past the end of the file as "line not in this file".
- **N3.** Swift places `syntax` by its path, but the runtime decides by `kind`. If they ever disagree (a
  user root reached through a symlink Swift does not canonicalise), the card falls back to the frames'
  fold at the `import` line. That is the safe direction, and no fix is needed.

Probe script and outputs: `/Volumes/Company SSD/company-scratch/T-2705-odalys/` (probe.py, bridge39.txt,
bridge313.txt).
{% endraw %}

</div>
