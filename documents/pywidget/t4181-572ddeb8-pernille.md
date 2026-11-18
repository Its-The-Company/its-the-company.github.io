---
layout: "default"
title: "Review of T-4181 at 572ddeb8: the send writes no lane key (T-4656)"
section: "documents"
description: "The question the task asks: does a script whose refused import was removed now return to the widget lane on resend? For the decision, yes. send_lane no longer returns anything to write (lane.py:461-490); the person&#x27;s\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4181-572ddeb8-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4181-572ddeb8-pernille.md</code></span></div><h1>Review of T-4181 at 572ddeb8: the send writes no <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> key (T-4656)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4759, Commandment 13). Author: Idris (572ddeb878); the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> it carries out is Ines's, 9:34 AM in
`ops/board_notes/T-0972.md`. Reviewed: 572ddeb878 "T-4656: the send writes no lane key; send_lane returns lane, name and
line". I read its diff; `App/Runtime/_pywidget_runtime/lane.py` (`send_lane`, `MESSAGES`, `LANES`),
`tests/bridge/test_lane.py` (`SendLaneTests`) and [`ops/plans/T-0972-handoff.md`](../company/t-0972-handoff.html) as they stand at 572ddeb8; the source
review `docs/reviews/420538d670-pernille.md` (M1, L2); Ines's 9:34 AM ruling; the T-4656, T-0972, T-4657 and T-4658
board lines; `App/Projects/LaneMirror.swift` (`plan`, :62-79) and `Shared/LaneGuard.swift:429-459`
(`refusedImportTypes`), to check the handoff's claims about them; every caller of `send_lane` in the repository.
Date: 2026-11-17.

Later commits up to HEAD (9931365183): none touches the three files. `lane.py` at HEAD is byte-identical to 572ddeb8,
and `git log 572ddeb878..HEAD` on all three paths is empty. Nothing outside `test_lane.py` calls `send_lane`, in Python
or Swift, so dropping the `write` key breaks no reader.

## Runs

- At HEAD, in this worktree: `python3 -u pywidget/tests/run_host.py --both bridge`: 330 tests OK on Python 3.9.6 and
  3.13.18 (one more than the commit's 329: a later test elsewhere in the suite). Output kept in the scratch folder
  `company-scratch/T-4759-pernille/run_host_head.txt`.
- At 572ddeb8, from a `git archive` of `pywidget/` into that scratch folder: `test_lane` 59 tests OK, and
  `SendLaneTests` 12 OK, on both Pythons.
- Mutants on `send_lane` in that copy, `SendLaneTests` on both Pythons (`company-scratch/T-4759-pernille/mutants.py`;
  the original restored and green after):
  - A, M1's pin rebuilt in Python (a refused send remembers "app" for its filename; a later clean send returns it):
    killed. The new test alone <span title="A test written in advance. If it fires, we drop the idea.">kills</span> it on both Pythons.
  - B, the `write: "app"` key put back on a refused import: killed by three tests.
  - D, a typed "widget" over a refused import left as "widget": killed by two tests.
  - E, the typed-"app" branch removed: killed.
  - C, `send_lane` writing `{"lane": "app"}` into a pywidget.json beside the entry it is given: survived on both. See M1.

No Xcode run: the commit changes no Swift, and the Swift side of the send does not exist yet.

## Verdict: PASS with findings

The question the task asks: does a script whose refused import was removed now return to the widget lane on resend?
For the decision, yes. `send_lane` no longer returns anything to write (`lane.py:461-490`); the person's key is only
read, as `typed`. With no key, send 1 (`import sqlite3`) gives `app` and the line, and send 2 (clean) gives `widget`,
which is the test at `test_lane.py:755-786` and was the two-send probe in T-4598 M1. With a file that holds no `lane`
the same. Mutant A, the M1 failure written inside Python, is caught by that test alone. Every older case keeps its
answer; only the dict lost a key. Nothing regresses: no code reads `write`, and the 330 bridge tests pass on both
Pythons.

The handoff now says what the T-4656 line asks. Left 2 (`T-0972-handoff.md:28`) says the send writes no lane key,
and why. Left 3 (`:29-30`) answers whether T-4494's "every sent script mirrors" and T-0972's "no mirror over a refused
import" agree, and the answer checks against the code. `LaneMirror.plan` reads only the project's key
(`LaneMirror.swift:65`), so a refused import with no key mirrors today. The interim claim, that the extension catches it
on the first run and T-4280 moves the widget, holds for both kinds of module: `refusedImportTypes` holds
`LaneImportError` and `NotAvailableHere` (`LaneGuard.swift:431`). The handoff's rows match Ines's 9:34 AM ruling row by
row: clean, nothing written; banned, `app` for this send only; typed `widget` over a banned import, the line, no mirror,
key untouched; typed `app`, no line.

The fix holds only while the Swift slice writes nothing, and no test guards that yet (M1). The board line that slice's
author reads first still states the old rule (L1).

## Findings

### M1. The "nothing is written" half of the new test cannot fail; the write can only come back in Swift, untested

- Where: `test_lane.py:755-786` (`snapshot(project)` before and after each send, `:783`, `:786`), `lane.py:461`
  (`send_lane(source, filename, typed)`: no project path, no file I/O), and `T-0972-handoff.md:31` (Left 4).
- `send_lane` never had a project folder to write into, before this commit or after. The `write` key was an
  instruction to the unbuilt Swift caller. So the folder snapshot holds by construction, and mutant C, a `send_lane`
  that does write a lane file beside the entry it is given, passes the test on both Pythons. What does catch a write
  coming back into Python is the dict equality in nearly every `SendLaneTests` case (mutant B). That is a fair guard
  for this file, but the test's name and docstring claim more than it checks.
- The failure T-4598 M1 found was a stored write, and the only code that could store one again is Left 2's Swift send.
  Left 4 lists clean, banned, typed, app-only and no-manifest projects, each one send. None sends twice, so a Swift
  slice that writes `"lane": "app"` on a refused import would pass every listed test and pin cleaned scripts again.
- Fix (Idris): add to Left 4 a Swift test through `WidgetScriptSave`. One project is sent with a refused import, then
  sent clean. The first send plans no mirror, the second plans `.put`, and the project's pywidget.json (absent; present
  with no `lane`) is the same bytes after both sends. Rename the Python test, and reword its docstring, to claim the two
  decisions rather than the folder. Board: T-4819.

### L1. T-0972's board line still states the rule T-4656 removed

- Where: `ops/board.md`, the T-0972 line: "Clean: `lane: widget` in pywidget.json" and "key left as typed".
- Ines's 9:34 AM note (`ops/board_notes/T-0972.md`) rewrites the rows: clean, nothing written; the send reads the key and
  never writes it. That note is the recorded ruling, and the handoff agrees with it. The line itself was not changed,
  so a person who reads the line as the spec, as its Done list invites, builds the write back in.
- Fix (Ines): rewrite those two sentences of the T-0972 line to the 9:34 AM rows. Board: T-4820.

## Still open, not this commit's

- `"lane": null` (T-4598 L2, T-4658). With no write, the case is now only about the decision. A Swift caller that
  turns JSON null into `nil` gets `widget` and no line, while `LaneMirror` keeps the widget out because the key is not
  "widget". The person gets no mirror and no reason. T-4658 holds it; nothing here makes it worse.
- T-4657 (device package and `net.request` forms come out `widget`) is untouched by this commit.
- The Swift slice (handoff Left 1-4), and Maren on `MESSAGES[CODE_SEND]`, are still owed by T-0972.
{% endraw %}

</div>
