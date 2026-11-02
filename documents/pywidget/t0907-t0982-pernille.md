---
layout: "default"
title: "T-0982: review of T-0907 at 70ae6256 (Idris)"
section: "documents"
description: "Verdict: PASS with fixes (one Low test gap; no behaviour change needed)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0907-t0982-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t0907-t0982-pernille.md</code></span></div><h1>T-0982: review of T-0907 at 70ae6256 (Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-02. Author: Idris. Independent read (Commandment 13): diff, the code around it, and
`WidgetScriptSave.send`; not the author's notes beyond the commit message.

**Verdict: PASS with fixes** (one Low test gap; no behaviour change needed).

## What the line asked

T-0900 L1 on T-0881: the refused-send memory held one file and dropped the `Sent`. A refused, B refused, back to
A: A not retried. A refused id change, file left, retried with `last` nil: old folder stays, no console line.
"Keep refusals by path, each with its Sent; test both. Done: two tests, red before, green after."

## Checked

1. **Per-path memory.** `widgetRefused` is now `[path: (text, sent)]` (PyWidgetApp.swift:381). A refusal writes its
   own key (:392); a send that is not refused clears only its own key (:395). B's refusal no longer touches A's entry.
2. **The right `Sent`.** `WidgetScriptSave.send` returns `last` unchanged on every refusal (WidgetScriptSave.swift:176),
   so the stored `sent` is the last Sent that reached a widget. On reopen with the same text, `openProjectFile`
   restores it (:299-301). The retry then has the `last` the move logic needs.
3. **A stale `Sent` is safe.** If another window or a second file sharing the id wrote `widgets/<id>/main.py` in
   between, `owned(last)` compares the bytes on disk with `last.text` and refuses ownership, so the retry writes
   and says ".left", never moves a folder it does not own. Read through for: other window moved the folder first
   (old folder gone: `from = nil`, plain write); second file with the same id (bytes differ: `.left`).
4. **Tests red before.** `testARefusedThenBRefusedThenBackToAIsRetried`: with one slot, B's refusal replaces A's, A
   reopens with `widgetText = aText` and `saveNow` sends nothing, so `mainPy("aa")` keeps the old bytes. Red.
   `testRefusedIdChangeIsMovedAndSaidAfterLeavingTheFile`: with `widgetSent = nil` on reopen, the retry writes a new
   `widgets/weather/` beside `wea`. Red on the `["weather"]` assertion. Both read the bytes back from disk.
5. **Green.** Both passed in the unit run at ops/runs/xcodebuild-20261102-093615.log (test case lines only read;
   that run's 24 failures are elsewhere). The <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s own log is not in the repo.
6. **Host suite.** `run_host.py --both` at HEAD 462dc137 (no Python touched by this commit; land:host floor only).

## Findings

**L1 (Low, test gap). `refusalsMoved` has no test.** PyWidgetApp.swift:481-487, called from `projectMoved` (:492)
and `projectFileMoved` (:539). The commit says "a rename follows the refusal to the new path, a delete drops it",
but neither test renames or deletes. Failure scenario if the key arithmetic regresses (for example a later change to
`dropFirst(from.count)`, or a caller passing an unstandardized URL): A refused, the person renames project `p` to `q`
from Projects, fixes the cause, reopens `q/main.py`. The entry sits under the old path, `widgetText` is set to the
text, and the retry never happens: the widget keeps old code with no console line, which is the T-0900 L1 symptom
again. The code reads right today; it is untested new behaviour headed to TestFlight. Fix: one test, refuse in `p`,
rename `p` to `q`, clear the cause, reopen and assert the widget's bytes; one more, refuse, delete the file, and
assert a file later created at the same path with the same text is not treated as refused.

## Not findings

- `for (path, refusal) in widgetRefused where ...` mutates the dictionary inside the loop. Swift iterates a copy
  (value semantics), so this is safe.
- The map is never pruned within a session. One entry per refused path, text only; fine.

Fix line: T-1112 (Idris, P3).
{% endraw %}

</div>
