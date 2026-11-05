---
layout: "default"
title: "T-1872 review: T-1841..T-1844 (Pernille, 52702d72d)"
section: "documents"
description: "Probe scripts and outputs: /Volumes/Company SSD/company-scratch/T-1872-odalys/ (probe_t1872.py, probe5.py, probe_hand.py, sw/main.swift)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1872-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t1872-odalys.md</code></span></div><h1>T-1872 review: T-1841..T-1844 (Pernille, 52702d72d)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys, 2026-11-05. Independent review (Commandment 13). Read: the diff of 52702d72d and the
code it touches (runner.py `_frames`, `_exc`, `_syntax`, `run`; TracebackFold.swift; the two test files;
fixture import_syntax_error; mutants-t1756.json). Not read: Pernille's notes.

**Verdict: fix first** (F1, F2, F3). The two properties the task names:

- *A non-user `kind` is never made user by its path:* holds. `place(_ f: Frame)` (TracebackFold.swift:81)
  returns `.user` only for `kind == "user"`; any other string, unknown ones included, maps a path-rule
  `.user` to `.bundled`. Mutant t1843-path-makes-user pins it. No finding.
- *The cut joins a repeat only when both sides are one call site:* holds as written (TracebackFold.swift:124
  joins only when `frames[49] == frames[50]`, both user). But equal neighbours do not prove the dropped
  frames are that call site. See F1.

## Measurements (host, load average ~200)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Measurements (host, load average ~200), scrolls sideways" style="--tw:724px" markdown="1">

| Check | Result | n |
|---|---|---|
| `python3 -m unittest test_runner` (pywidget/tests/bridge) | 46 run, OK, 4 skipped | 1 run |
| `swift test --filter TracebackFoldTests` (pywidget/ios/Core) | 20 run, 0 failures | 1 run |
| Five-function cycle `f1->f2->f3->f4->f5->f1`, real runner, then `TracebackFold.card` compiled on its own with swiftc | 100 frames kept, `frames_omitted` 894, `frames[49]` and `frames[50]` both `f4` line 8; card shows **`f4 x896`**, `omitted` 0 | 1 run |
| Two-function cycle, real runner (two shapes) | `frames[49] != frames[50]`, no join (correct here) | 2 runs |
| `exec('def f(:')` and `ast.parse('x = (1')` in a user file | status `error`, `syntax.path` `<string>` / `<unknown>`; frames hold the user's line | 2 runs |
| `raise SyntaxError('m', (5, 1, 1, 't'))` in a user file | status **`internal_error`** (AttributeError in `_display`) | 1 run |

</div>


Probe scripts and outputs: `/Volumes/Company SSD/company-scratch/T-1872-odalys/` (probe_t1872.py,
probe5.py, probe_hand.py, sw/main.swift).

## Findings

1. **Fix first. The cut joins a mutual-recursion cycle into one false repeat.** TracebackFold.swift:124 and
   bridge-contract.md:305. In a cycle of period k, `frames[49]` and `frames[50]` are the same call site
   whenever k divides `frames_omitted + 1`. Measured: a 5-cycle gives 894 + 1 = 895 = 5 x 179, and the
   card reads `f4 x896` with `omitted` 0. The truth is about 179 `f4` frames, never adjacent; CPython's
   Raw prints no "repeated" line. The card both invents a count and hides that 894 frames were not kept.
   The test at TracebackFoldTests.swift:259 (`[b, a, a, b]`, cut at 2) pins the same guess. Fix: the
   runtime has every frame before the cut, so let it decide. For example, `_frames` (runner.py:971-976)
   sends a flag only when every dropped frame has the same path, line, columns and name as both
   neighbours. Swift joins only on that flag, and otherwise shows `omitted`. Update contract s8 to match,
   and add a test with a cycle whose period divides `omitted + 1`.

2. **Fix first. `syntax` replaces the frames even when its file is not the user's.** runner.py:1264-1266,
   TracebackFold.swift:102-103 and 140, bridge-contract.md:306. `exc.filename` is truthy for `<string>`
   (exec, eval, compile of a string) and `<unknown>` (ast.parse). The same holds for a SyntaxError in a
   site-packages or stdlib module. `card` then returns `syntax(...)`: no rows and `goTo` nil, because
   `place("<string>")` is `.bundled`. Before 52702d72d the frames' fold went to the user's own `exec` or
   `import` line; now the card has nowhere to go. Measured in the runner for `<string>` and `<unknown>`;
   the Swift result follows from lines 103 and 140. Fix: send `syntax` only when
   `_kind(exc.filename) == "user"`. This also gives the syntax place the runtime's realpath answer, the
   same rule as T-1843. In Swift, `card` uses `syntax` only when its place is `.user`, else folds the
   frames. Add tests for `exec` of a bad string and for a bad site-packages import.

3. **Fix first (small). A hand-built SyntaxError with a non-str filename turns the user's error into
   `internal_error`.** runner.py:1264-1266. The guard is `exc.filename` truthy, but `_syntax` calls
   `_display(path)` (runner.py:925), which needs a str. `raise SyntaxError('m', (5, 1, 1, 't'))` (or
   `b'f.py'`) formats fine in CPython. Since 52702d72d it raises inside `run`, so the outer handler
   reports `internal_error`, and the run skips `_join_new_threads` (s6). Measured: status
   `internal_error`. Fix: require `isinstance(exc.filename, str)`, and keep the `error` outcome if
   `_syntax` fails (no `syntax` then).

4. **Note.** TracebackFold.swift:57 hard-codes 50, and runner.py:35 has MAX_FRAMES 100. The Python test
   checks only that `frames[49:51]` are both `walk`, which does not pin the index. If MAX_FRAMES changes,
   Swift places the cut wrongly and no test fails. A cheap guard: the runtime sends the cut index, or a
   test reads MAX_FRAMES. Not blocking.

5. **Note.** The 17 new mutants in mutants-t1756.json are all Swift. The runner lines (`omitted`, the
   T-1842 condition) have Python tests (test_deep_recursion_records_the_frames_it_cut,
   test_syntax_error_in_an_imported_module_carries_its_place) but no recorded mutants. Not blocking.

6. **Note, before 52702d72d.** `raise SyntaxError('m', ('f.py', 'one', 'x', 't'))` already ended as
   `internal_error`, because `_format` (runner.py:980) calls `traceback.format_exception` with no guard.
   Not caused by this change. Recorded so F3's fix does not claim it.

Checked and fine: `frames_omitted` is 0 with no cut and is in `_internal`. The contract s8 cut arithmetic
(keep 50 + 50, cut after `frames[49]`) matches runner.py:974-976. `held` clears `omitted` only when it
joins. A cut at an index the frames do not reach leaves `omitted` as a count. The T-1844 header text is
accurate. Fixture import_syntax_error matches its <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> entry.
{% endraw %}

</div>
