---
layout: "default"
title: "Review of 359a4e52fb: T-4558, which premades get buttons in 1.0"
section: "documents"
description: "The choice is sound and stays inside every limit it cites. One premade gets a button, and its counts sit inside ADR-011 s3&#x27;s caps per family. The four-part test in s9.1 follows Apple&#x27;s &quot;do more than open the app&quot; and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/359a4e52fb-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 25 · Sun Nov 15</span><span><code>pywidget/docs/reviews/359a4e52fb-pernille.md</code></span></div><h1>Review of 359a4e52fb: T-4558, which premades get buttons in 1.0</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4601, Commandment 13). Author: Maren. Reviewed: 359a4e52fb as a whole
([`pywidget/docs/design/premade-inputs.md`](premade-inputs.html) s9, 130 added lines; its patch is identical to the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-landed bc332cb0ac,
checked by diffing the two: 0 lines) and its tick record 89f225bf93 (`ops/lane-outbox/a3-1794828556846060000-58883.json`,
Maren's memory). Read against T-4558's board line (`log/board-archive.md`), ADR-011 s1, s3, s4, s7, s8 and s13 step 10
as accepted at 137c133087, plan.md's step 10 row and its 2026-11-15 10:00 PM <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> note, premade-inputs.md s2.3.1,
s3.5 and s4.2, and the twelve premade modules, all at 89f225bf93. Line numbers are the file's at 359a4e52fb.
Date: 2026-11-17.

## Tests run

- `pywidget/tests/widgets/test_premade_store_lock.py` (the s2.3.1 contract the design's route B reuses), run from its
  folder with `python3 -m unittest`: 20 tests, OK. The commit touches no code, and `docs/design` has no tests.
- A scratch check of route B against s2.3.1's merge (`company-scratch/T-4601-pernille/lost_mark.py`, run with
  `python3 -I` against `widgets/premade/_premade_lock.py`): a widget mark and a Page rename, each holding the `habits`
  list read before either wrote, saved one after the other through `_premade_lock.save`. Result:
  `{'done': [], 'id': 'h0000abcd', 'name': 'Read'}`, so the mark was lost and the rename was kept (H1).
- Checked by hand against the code at 89f225bf93:
  - The <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> match ADR-011 s3: Small 1 of 2, Medium 3 of 4, Large 6 of 8, `accessoryCircular` 0 of 0.
    `habits.py` shows `hs[0]` in Small and `hs[:3]` and `hs[:6]` in Medium and Large, and its `SETTINGS` sets `max` 6.
  - Habits has no `accessoryRectangular` family.
  - Three stacked 44 pt rows with 12 pt gaps take 156 pt and six take 324 pt, as stated. Medium columns of
    88 + 12.5 + 88 + 12.5 + 88 fill 289 pt, and their hit areas sit 56.5 pt apart.
  - The ids are `"h"` plus 8 hex digits (`SETTINGS` `id`), so the habit id fits a 32-bit number exactly in JSON.
  - The eleven named in s9.3 are exactly the other modules in `widgets/premade/` (altitude, clocks, countdown,
    distance, github, progress, quote, shortcuts, steps, storage, sun). No premade draws `ui.Button`, `ui.Toggle`,
    `RefreshButton` or `widget.action`.
  - The stated reasons hold in the code: `PERSON_PICKED = False` in quote.py, GitHub and Steps import
    `_premade_lock`, and Steps reads Motion.
  - plan.md sizes step 10 at 1 (0.5 to 2) slot day.
- No Xcode run. Nothing in this commit is Swift.

## Verdict: PASS with findings

The choice is sound and stays inside every limit it cites. One premade gets a button, and its counts sit inside
ADR-011 s3's caps per family. The four-part test in s9.1 follows Apple's "do more than open the app" and ADR-011 s4's
in-widget run. Each of the eleven refusals is true of the code. The args design is careful: the habit is named by id
rather than by row, the day is the one drawn, and `done` is the target state rather than a flip. It uses numbers only,
treats `args` as untrusted, and `v` covers it. The rows-to-columns reflow is forced by the arithmetic, and the
arithmetic is right. The design adds no image or asset (Commandment 6). The words keep to the person's own log, which
keeps clear of the health ban. The tick record and Maren's memory agree with the commit and with `log/board-archive.md`.

One finding is High. Route B, the recommended path for writing the mark, loses data under the file contract it reuses.
The test s9.4 asks for cannot pass. T-4705, the build line taken from s9.4, inherits both problems. It should not
start until s9.2 says how a mark and a Page edit merge.

## Findings

### H1. Route B commits the whole `habits` list, so a widget mark and a Page edit overwrite each other

- Where: s9.2 "Where the mark is written" (543-553, route B at 547): "the handler returns the changed `habits` list as
  a premade key; Swift commits it ... with the Page's own locked writer (s2.3.1)". s9.4:583 asks for "tests that a mark
  from the widget and a Page save in the same second both survive". T-4705 carries the same test.
- What is true: s2.3.1 merges **by key**. Under the lock, a writer sets each key it owns to its own value, and the
  file's value for that key is not consulted (`_premade_lock.py:42-46`). The Page owns `habits` whole (s4.2), and so
  far it is the key's only writer. Route B makes the widget run a second writer of the same key. Each writer holds a
  copy read earlier: the handler's copy from the run's read, and the Page's from when it opened (s2.3 step 1 re-reads
  the file but still replaces `habits` with its own list). So whichever saves last wins. The scratch run above shows
  it: a Done today tap followed by a rename in an open Page loses the check-in, with no error. The reverse order loses
  the rename. Route A has the same fault, because `Store.set("habits")` followed by `_premade_lock.save` is the same
  key-level replace.
- Why it matters: a person's own record disappears without a message. This is data loss, which Commandment 1 puts
  ahead of any feature. The design's own acceptance test catches it only if someone writes the test in a way that can
  fail.
- Fix (Maren, with Idris for the Swift writer): s9.2 makes the mark an operation, not a value. The handler yields
  `(habit id, day, done)`. The writer takes the premade lock, re-reads the file, and applies that operation to the list
  it just read: it adds or removes one date in that id's `done`, and an unknown id writes nothing. The Page applies its
  own edit to the list it re-reads under the lock: per habit id the name, the days changed in this edit, adds, deletes
  and order, rather than replacing the list with the copy it opened. The Page also reloads its rows when a widget run
  commits the file. s2.3.1 gains one dated line: a key with two writers is merged by operation under the lock, never by
  value. s9.4's test becomes "a widget mark and a Page rename, each from a copy read before the other wrote, both kept"
  (`lost_mark.py` is the shape). Board: T-4763.

### M1. Route B needs a result channel that ADR-011 s7 does not have, and s9.4 does not cost it

- Where: s9.2:547 ("returns the changed `habits` list as a premade key"); s9.4:582-585.
- What is true: the contract is `handler(state, args) -> state` (ADR-011 s7, `pywidget_ui` `Widget.action`). s7 (b)
  commits only state and tree, and a premade's render state is `{}` in 1.0 (`_premade.py` docstring). Nothing in the
  request, the result or `RunRequest` carries a premade key back to Swift. Route B therefore changes the Python
  contract: a new result field from the handler, its check, a contract version line and an API.md row. It also needs
  the Page's Swift locked writer to be reachable from the widget extension, because on iOS 18 to 26 the commit runs
  there. s9.4 gives Pernille 0.5 day for the handler, layouts and tests only, and Idris 0.5 for "reusing the Page's
  locked writer". Neither covers the new channel. The "1 (0.5 to 2)" total is stated as matching plan.md without it.
- Fix (Maren, with Pernille for the contract): s9.2 names the channel and its shape (after H1, the operation, not the
  list) and says where it is checked. s9.4 adds its Python half to step 5's scope or as its own row, and the extension
  half to Idris's row. It then says whether 1 slot day still holds or the likely figure moves. Board: T-4763 (same
  line as H1; one rewrite of s9.2 and s9.4).

### M2. The fit is checked only at the default text size

- Where: s9.2:522-524 ("estimates from the type sizes at the default text size") and the family table.
- What is true: every text in these layouts uses a text style (`_premade.ts` -> `Font.text_style`), so it grows with
  Dynamic Type. ADR-011 s3 notes that widgets take Large to AX5. The 44 pt hit areas do not shrink. Medium's column,
  with a two-line footnote name, the dots and the button, leaves 15 pt spare at the default size. Large's cell leaves
  28 pt for the grid. At larger sizes the stacks overflow, and SwiftUI then clips or compresses something. Nothing says
  what gives way first. If it is the button row, a counted button can be pushed partly out of the widget, so its
  44 pt hit area is no longer whole.
- Fix (Maren): s9.2 says the order in which things give way when text grows. One sensible order is: the name drops to
  one line, then the dots shrink, and the button keeps its 44 pt. Maren's frames row in s9.4 and T-4705's screenshots
  add one Medium and one Large at the largest text size. Board: T-4764.

### L1. s9's opening count is now contradicted by s0 in the same file

- Where: 480 ("One premade gains a button in 1.0 ... The other eleven gain none"); s0 added later by T-4672
  (76741f2d7b, Ines, 11-17).
- What is true: the sentence was true at 89f225bf. Since then s0 plans Focus timer, Flashcards and Day phases with
  buttons, and six of the eleven leave the Gallery. s0 says that sections 3 and 9 "describe the built premades as
  designed". But s9's heading is still "Buttons in 1.0", and its count and its 1 slot day (Habits only) read as the
  whole of 1.0.
- Fix (Maren): add a dated line under the s9 heading. It says s9 covers the built twelve, that s0 supersedes the 1.0
  count, and that each new premade's buttons are counted against s3's caps in its own build line. Board: T-4764.

### L2. "A habit with no stored id draws no button" has to read the file, not `read()`'s data

- Where: s9.2:518-519.
- What is true: `habits.py:44` replaces a missing `id` with `_slug(name)`, so by the time `draw()` runs, every habit
  has an id. A pre-Page habit whose name's first word is `h` followed by 8 hex characters gets a slug of the stored id's
  shape and would draw a button with a made-up id.
- Fix (Maren, a note for T-4705): s9.2 says `read()` marks a habit whose id came from the file, and only those get a
  button. T-4705's handler cases add a pre-Page habit. Board: T-4764.
{% endraw %}

</div>
