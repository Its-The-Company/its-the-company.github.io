---
layout: "default"
title: "Review of T-4763 at 685ef258: habit marks and Page edits merge by operation"
section: "documents"
description: "At 685ef258 the design, built as written, gives a button that never marks (H1) and, once that is fixed, a tap that shows nothing until midnight (H2). Both are claims about the runtime that the code contradicts. The\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4763-685ef258-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/t4763-685ef258-pernille.md</code></span></div><h1>Review of T-4763 at 685ef258: habit marks and Page edits merge by operation</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4923, Commandment 13). Author: Maren. Reviewed: 685ef25829 (docs/design/premade-inputs.md:
s2.3.1's dated line of 2026-11-17, the s9 head's dated line, s9.2 "Where the mark is written" to the end of route A,
s9.4's table, test and estimate, s9.5 item 1). Line numbers below are in the file at 685ef258 unless a path says
otherwise. Also read, for what the design describes, at 685ef258 (paths under pywidget/):
- ios/App/Runtime/_pywidget_runtime/runner.py (where `_first_party()` is entered, `_clear_first_party`) and
  widget_tree.py (`is_first_party`, `run_handler`, `emit`);
- python/pywidget_ui/__init__.py (`_first_party`, `Widget.run_action`, `Widget.document`, `validate`);
- widgets/premade/_premade.py (`Store`, `MemoryStore`, `open_store`, `install`) and habits.py (`read`, `plan`, `SETTINGS`);
- ios/App/Pages/PremadeSettings.swift (`PremadeSettingsFile.write`, `locked`, `SettingsKinds.days`) and
  SettingsPage.swift (`putRow`, `deleteRow`); ios/Shared/LauncherPremadeSlots.swift; ios/project.yml (extension sources).
Date: 2026-11-19. HEAD f8246c1089.

What I ran (host only, no Xcode build): the s9.2 example's numbers in python3 (`0x1a2b3c4d` is 439041101, day 20774 is
2026-11-17; both right); `git log -S` on `PremadeSettingsFile.locked` (landed f5f268e6cf, 2026-11-15, T-4532); greps for
every name the section uses. I checked that each code fact below holds at 685ef258 as well as at HEAD.

## What holds

- The diagnosis is right. s2.3.1's by-key merge sets an owned key to the writer's copy, and `habits` gets two writers
  with the button, so a whole-list write loses a mark or a rename. An operation applied to the re-read file is the
  fix, and limiting it to the one key with two writers keeps the rest of s2.3.1 as built.
- `habits.py` never `set()`s `habits` (no `set(` in the file), so the Python by-key save cannot touch the key. True.
- The mark carries a target state (`done` 0 or 1), not a flip, so applying it twice gives the same file and a stale tap
  does what the person saw. A deleted habit makes the writer write nothing, without an error. Both are right.
- The lock order (`run.lock`, `state.lock`, premade lock) cannot deadlock against the Page or Python, which take only
  the premade lock. The file is written before `state.json`, so a crash between them leaves a mark the next run draws.
- The s9.4 test can fail. A whole-list writer loses the rename when the mark saves last, and loses the mark when the
  rename saves last; running both orders catches either. It replaces a "same second" test a whole-list writer could
  pass by timing, which is the right call.
- The cost row says the writer must be built into the extension target. That is needed: project.yml gives
  `PyWidgetExtension` only `Widget` and `Shared`, and the locked writer lives in `App/Pages/`.

## Findings

### H1 (High): the channel's gate is `ui._first_party()`, but the handler never runs inside it, so the button could never mark (premade-inputs.md:628-631)

s9.2 says `_premade_op` "can be called only inside `ui._first_party()` in an action run" and any other call raises. The
runner enters `_first_party()` only around the module's own execution (runner.py:1289, `with
_first_party_ui()._first_party(): _go(code, main)`). The handler runs later, from `widget_tree.emit` (widget_tree.py:451,
`run_handler`) in `records.finish`'s tree step, after that `with` has closed. So built as written, every real tap raises,
the handler fails, and nothing is ever written. The s9.4 tests would not catch it: they call `Widget.run_action` on the
host, where a test that wraps the call in `_first_party()` passes. Second, `_first_party()` is not an origin gate: its
docstring (`__init__.py:1840`) says a script can enter it too. The real lock is Swift check (3) on the widget id, which
the doc has, so this is not an escalation path, but the doc names the wrong gate. Fix: a gate the runtime opens around
`run_handler` only for a first-party action request, emptied at the start of each run, and a test through
`widget_tree.emit` with a first-party action request, not only `run_action`.

### H2 (High): "the render that follows draws the mark" is false against the code; the widget would show no change until midnight (premade-inputs.md:598-599)

s9.2 says the handler "also applies that operation to its own in-memory copy, so the render that follows draws the
mark". There is no shared copy. `Widget.run_action` gives the handler a deep copy of the state; the render then runs
`install()`'s timeline provider, which calls `read(now, open_store(widget.id, state))` (_premade.py:416), a new `Store`
read from `premade.json`. The file gets the mark only at the commit, after the render. So the tree committed with the
mark is drawn without it. On success nothing is queued (the `.settingsSaved` refresh at :605 is only for a deleted
habit), and Habits' next entry is the next local midnight (habits.py `plan`). The person taps, sees no change until
midnight, and a second tap sends `done: 1` again and still shows nothing. The core of the feature looks broken. Fix: the
render's own read must see the pending operation, applied in memory without making the store dirty (or the handler
must hand the marked data to the render some other way that is never committed as state), with a test that the tree
of an action run shows the mark.

### M1 (Medium): check (2) is placed in `validate()` of the document, which never sees the request (premade-inputs.md:633-634)

"(2) In `validate()` of the document: `premade_op` is allowed only when the request carried `first_party: true` and an
`action`." `validate(doc)` (`__init__.py:2327`) takes only the document, and `Widget.document` calls it
(`__init__.py:2181`) with no request in reach. Built as written, check (2) cannot be implemented where it is placed.
Either it gets quietly dropped or it becomes a document-only check that cannot fail on the case it names. The request
rule belongs in `widget_tree.emit`, which has the request; `validate` can check the shape and the `pywidget.premade.`
prefix.

### M2 (Medium): the Page's reload breaks an open edit sheet's Save, and the doc says it does not (premade-inputs.md:620-623)

"An edit sheet that is open keeps its fields. Its Save is applied per id as above, so the reload neither throws the
edit away nor overwrites the mark." `SettingsPageModel.putRow` and `deleteRow` (SettingsPage.swift:241-262 at 685ef258)
find the edited row with `rows.firstIndex(of: original)`, by value. After a reload brings in a mark, the sheet's
`original` no longer equals the row, so `putRow` takes the `original != nil, index == nil` branch: `failed.insert`, the
section shows `page.cantsave`, and the rename is refused. The reload this commit adds creates that case. The doc says
"per id" for the merge in the file, but nothing says the lookup of the row being edited must change from by-value to by-id.
Fix: name `putRow` and `deleteRow`'s lookup as by `id` for a list with an `id` rule, and add the test "sheet opened
before a mark, saved after the reload, keeps both".

### L1 (Low): "every writer, Swift and Python, posts a Darwin notification" has no Python mechanism and is not needed (premade-inputs.md:620-621)

`_premade_lock.save` has no way to post one: the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> refuses `ctypes`, and there is no wire call for it. Python
never writes `habits`, and for every other key the Page is the only writer, so the Page loses nothing if Python does
not post. As written, it is uncosted work in nobody's s9.4 row. Fix: say that only the Swift operation writer posts it.

### L2 (Low): the estimate's range does not follow from its rows, and one push risk was already retired (premade-inputs.md:687, 700-703)

The slot rows are Idris 1 (0.5 to 1.5) and Idris 0.5 (0.25 to 1). Their sum is 1.5 (0.75 to 2.5), not "1.5 (1 to 2.5)".
Either the low end is 0.75 or a row's range changes. Among "what would push it to 2.5", "the Page's Swift locked writer
(T-4468's Swift half) not landed when this starts" was already retired when this commit was written:
`PremadeSettingsFile.write` takes the lock since f5f268e6cf (2026-11-15, T-4532). The T-4570 aside is true
(`LauncherPremadeSlots.write` takes no lock), but it writes launcher premades' files, not Habits', so it does not bear on
this slot. The s2.3.1 heading ":136 Python half landed, Swift half next" is older text with the same staleness.

### L3 (Low): the Page's check-in edit must be stated as target states, because the Page's own toggle is a flip (premade-inputs.md:610-614)

"For check-ins, only the days the person toggled in this edit are added or removed, one by one, like the mark." The
Page's toggle, `SettingsKinds.days` (PremadeSettings.swift:552-561 at 685ef258), is a flip
(`if set.contains(key) remove else insert`). If the build replays toggles against the re-read file, a Page tap on a day
that a widget mark set meanwhile removes it: the person tapped to mark the day done and gets it unmarked. The doc's next
paragraph ("two target states, the later save's state stands") is right only if the Page's operations are the
difference between the sheet's `done` and its original, as `mark` with `done: 1` or `0`. Say so in those words.

## Verdict: FAIL

At 685ef258 the design, built as written, gives a button that never marks (H1) and, once that is fixed, a tap that shows
nothing until midnight (H2). Both are claims about the runtime that the code contradicts. The diagnosis and the
operation itself are sound, and the s9.4 test is a good one.

## The later commit 39ddda27e4 (same task, not part of this verdict)

I read its diff to premade-inputs.md and checked the code facts it cites (project.yml's extension sources,
`_clear_first_party()` at the start of each run at runner.py:787, `WidgetStateCommit` used only by its tests,
`putRow`'s by-value lookup). In its text it addresses H1 (a slot `widget_tree.emit` opens around `run_handler`), H2
(`open_store` applies the pending operation in memory, not through `Store.set`), M1 (request rule in `emit`, shape in
`validate`), M2 (by-id lookup in `putRow`/`deleteRow`, and the sheet-after-reload test), L1 (only Swift posts), L3
(check-ins as `mark` with `done` 1 or 0 from the sheet-versus-original difference) and the retired risk in L2. That is a
reading of the text, not a review of 39ddda27. **L2's range is still open there**: the rows are unchanged and the total
still says 1 to 2.5. Filed as its own line.
{% endraw %}

</div>
