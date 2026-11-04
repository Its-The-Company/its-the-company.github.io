---
layout: "default"
title: "T-1829 review: T-1756 traceback fold (Pernille, 5925a4146)"
section: "documents"
description: "Approve with changes. The rule is correct for what the five fixtures cover, and the path rule holds. Two P2 gaps should be closed before T-0389 draws the card: the repeat count is wrong after the runtime&#x27;s 100-frame cut\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1829-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/t1829-odalys.md</code></span></div><h1>T-1829 review: T-1756 traceback fold (Pernille, 5925a4146)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys. 2026-11-03. Judged against C5 spec s3 "Traceback card", 12.5 `d.tb` and row 689, and
bridge contract s8, from the diff, the fixtures and one `swift test`. Author notes not used.

## Verdict

**Approve with changes.** The rule is correct for what the five fixtures cover, and the path rule <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>.
Two P2 gaps should be closed before T-0389 draws the card: the repeat count is wrong after the runtime's
100-frame cut (F1), and a SyntaxError raised while importing a project module goes to the wrong line (F2).

## Measured

- `swift test` in pywidget/ios/Core, run once in the foreground, load average about 530: **445 tests, 0 failures**.
  TracebackFoldTests: 15 of 15 passed. Untracked files from other workers were in the tree when it ran.
- Mutants: I read pywidget/ios/Core/mutants-t1756.json (35 entries). They cover each branch of the path rule,
  the collapse, the counts, goTo and raw being passed through unchanged. I did not re-run them because of the load.
- F2 reproduced once (n=1) with make_fixtures.run on host 3.13.18. Script: /tmp/t1829/import_syntax.py (scratch).

## Checked and sound

- Innermost first, one jump per user frame (file, line, UTF-16 col, col 0 when missing), goTo = innermost
  user frame. TracebackFold.swift:72-95, :103-106.
- Path rule, TracebackFold.swift:60-70. The project is checked first, then site-packages/dist-packages, then the
  stdlib roots, and everything else counts as bundled. `/private/var`, `/var`, `/private/tmp` and `/tmp` match
  either way, for both the path and the root (:108-110, :113). Folder matching stops at whole folder names
  (:115). The deep_recursion fixture tests the real case: the root is [local folder] and the frames are
  /var/... (Tests :140-146).
- Library frames are counted per place, and the innermost one is kept for the "(mean, statistics.py)" example.
- raw is never parsed or changed. The raw-trimmed and raw-carets-dropped mutants check this.
- SyntaxError (status `syntax_error`) produces no rows. Go to Line is offered only when the file is the user's (:98-101).

## The repeat collapse (beyond the spec)

Spec s3 says "one row per user frame". The fold collapses only *adjacent* user frames that are identical in file,
line, col, end col and name (:85-86). Every distinct call site still gets its own row, innermost first, with its
own jump. CPython's own "[Previous line repeated N more times]" does the same thing, and the Raw switch shows
that line. Without the collapse, the deep_recursion fixture would draw 99 identical rows above the folded row.
**I judge that it matches the spec's intent, so the rule can stay.** It does need **Maren's word** on what the
count looks like on screen: 12.5's string table has `d.yours`, `d.lib` and `d.start`, and nothing for a repeat
count. It also needs F1's fix first, because the number it shows is currently wrong.

## Findings

**F1. P2 (T-1841). The repeat count is understated after the runtime's frame cut, and nothing marks it.**
TracebackFold.swift:30-36, :85-86; TracebackFoldTests.swift:68, :72; runner.py:971-972.
The runtime keeps the first 50 and last 50 frames, and no record of the cut survives. In the deep_recursion
fixture the card would read `walk main.py:2 x99`, but Raw on the same card shows 3 printed lines plus
"repeated 991 more times", which is 994 frames. The cut has the same effect elsewhere: it can silently drop
library frames from the counts and drop distinct user frames altogether. The doc comment calls the count a
lower bound, but the UI has no way to tell that.
Fix: have the runner record the cut (for example, `frames_omitted: N` on the error object, plus a contract s8
line). The fold then carries `omitted` in `Folded`. Where the frames on both sides of the cut are the same
collapsed frame, it adds N to `repeats`; otherwise it gives the card an "N frames not kept" fact. Test this
against deep_recursion: 994 walk frames, which is the same number Raw shows.

**F2. P2 (T-1842). A SyntaxError in an imported project module sends Go to Line to the `import` line.**
runner.py:1238-1240 handles only the main file's compile. A SyntaxError raised by `import helpers` comes back as
status `error` with type `SyntaxError`. Reproduced (n=1, 3.13.18), with helpers.py = `def f(:` and
main.py = `import helpers`: status `error`, `syntax` null, frames `[main.py user line 1]`. The error object
has no filename, line or offset for helpers.py (runner.py:1013-1014), yet Raw shows the caret under
helpers.py line 1. The fold would put "Start here" and Go to Line on `import helpers`. Spec row 689 says a
SyntaxError gets no frames. No fixture covers this case.
Fix: when the exception is a SyntaxError, the runner adds `syntax` (`_syntax(e, e.filename)`) to the `error`
outcome. The card then uses `TracebackFold.syntax` on that `syntax` value whatever the status is. Add the case
above to make_fixtures.py as `import_syntax_error`, with a test that goTo is helpers.py line 1 and there are no rows.

**F3. P3 (T-1843). Two classifiers for the same frame.** TracebackFold.swift:60-70 against runner.py:928-936.
Contract s8 sends each frame's `kind`, which the runtime works out on realpaths. The fold works it out again from
the path string, and the only path difference it handles is the /private prefix. The two can disagree on a root
or file reached through a symlink, and on `<string>`: the runtime takes the realpath under the cwd, which is the
project for a project run, while the fold says bundled. The runtime also has no site-packages kind.
Fix: add `kind` to `Frame`. The runtime's `user` wins. The path rule only splits the other frames into stdlib,
site-packages and bundled, and it is the fallback when `kind` is missing. Keep
testEveryFixtureFramePlacesAsTheRuntimeKindsIt as the guard.

**F4. P3 (T-1844). Unmeasured claim in the fixture header.** make_fixtures.py:12 says 3.13's caret lines "are the same
markers 3.15 prints", but there is no 3.15 on the host. Fix: say that this has not been checked on 3.15, and name
the check that will prove it: the same cases on the Simulator's 3.15, under T-0389.

## Does CPython 3.13 instead of 3.15 matter for the caret markers?

**Not for this rule.** The fold never reads raw. The caret assertions (Tests :61, :86-87) check fixed 3.13 text
that passes through unchanged, so they show that raw is untouched. They show nothing about how 3.15 formats
carets. Column positions are inputs to the fold, so a change in 3.15's `co_positions` would not change its logic.
**It matters for the card.** On 3.15 the keyword-typo hint can rewrite a SyntaxError's text and offset while
formatting (contract s8 SyntaxError; runner.py:1025). Raw's caret could then sit under a different span from the
structured col16 that Go to Line uses. The `if x = 3:` fixture does not exercise this. A 3.15 Simulator fixture
belongs to T-0389, not this rule.

## Note for Maren (spec, not Pernille's work)

`d.lib` reads "[n] frames in the standard library", but it is the only folded row, and it can hold site-packages
and bundled frames too. The copy needs a decision.
{% endraw %}

</div>
