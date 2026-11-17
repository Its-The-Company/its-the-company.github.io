---
layout: "default"
title: "Review of c00ce27e15: T-4468&#x27;s Python half (SETTINGS, all_day, measured text limits)"
section: "documents"
description: "The declarations match the spec&#x27;s s3 tables and s4.1 shape key for key: the seven owned key sets are what s4.2 says each Page writes (the test pins it), places store only what their premade needs (Clocks a zone and no\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/c00ce27e15-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/c00ce27e15-idris.md</code></span></div><h1>Review of c00ce27e15: T-4468's Python half (SETTINGS, all_day, measured text limits)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris (T-4642, Commandment 13). Author: Pernille. Reviewed: c00ce27e15 as a whole, against
[`pywidget/docs/design/premade-inputs.md`](premade-inputs.html) s2.2 to s4.2 and s6, and against the Swift reader that decodes the
catalog's `"settings"` entries (`pywidget/ios/App/Pages/PremadeSettings.swift` `SettingsSchema` and `SettingsField`,
`pywidget/ios/App/Gallery/GalleryPreview.swift` `GalleryEntry.shelf`). The Swift reader is my own code; I read it
here only as the contract the Python has to meet. Line numbers are at c00ce27e15; `premade_catalog.py` and
`countdown.py` have not changed since, so they hold on HEAD too. Date: 2026-11-16.

Later commits on the same files, read only to say where a point already stands: 7333f05ec1 (T-4504, Clocks Name
9 -> 11), db8484cbb7 (T-4505, Distance Small), 30ea7b46f1 (the lock, and the M5 tests in `test_premade_settings.py`).

## Tests run

- HEAD (ce68534814), `python3 pywidget/tests/run_host.py widgets` with the host's Python 3.9.6: PASS, 421 tests,
  1 skipped, 2 expected failures, 83.1 s. Run verbosely, `test_premade_text_max` (MaxTrees and MaxRender, with
  Playwright and its Chromium present) and `test_premade_settings`: 35 tests, all pass.
- c00ce27e15 itself, from a `git archive` of `pywidget/` without `ios/` in scratch: `test_premade_text_max`,
  `test_premade_settings`, `test_premade_catalog`, `test_premade_design`: 37 tests, 2 failures, both in
  `test_premade_catalog` (Steps' `empty_case` comes out true, so the catalog re-run differs). The parent commit
  in the same kind of archive fails the same two tests in the same way, so it comes from the archive leaving
  `ios/` out, not from this commit. All the commit's own tests pass at the commit.
- Probes I ran against `settings_problems` (F1), and a Countdown draw of an all-day event on its own day (F3).
  Neither went into the repository.

No Swift run: the Swift test `testTheRealCatalogDecodesSevenDeclarationsAtVersion1` is the check that matters for
F1 and F2, and I read it but did not run it.

## Verdict: PASS with findings

The declarations match the spec's s3 tables and s4.1 shape key for key: the seven owned key sets are what s4.2
says each Page writes (the test pins it), places store only what their premade needs (Clocks a zone and no
coordinates, Sun and Distance coordinates and no zone), and Clocks' defaults come from one list that both the
widget and the Page read. Countdown's `all_day` follows s2.2 and s2.3.2. The event stays upcoming until
`local_midnight(at, tz, 1)`, which adds a calendar day, so it is right on a 25-hour day. There is no under-a-day
timer, and `_start` never gives the bar an empty interval (I worked through an event added on its own day: the bar
is full, not 0/0). The text-limit test is the right kind of test: it measures the limit instead of trusting the
design width, every cut it allows is listed, and a listed cut that stops happening fails as stale. Five limits came
down because of it.

Nothing here loses data or risks App Review, so nothing holds TestFlight. The one Medium is about how far the
Python gate can be trusted. It passes declarations that the app cannot decode, and if one of those ships, the whole
Gallery goes empty.

## Findings

### M1. `settings_problems` passes declarations the Swift decoder refuses

- Where: `pywidget/tools/premade_catalog.py:65-133`. Its docstring says it lists "what makes a premade's SETTINGS a
  Page the app cannot draw". Against `PremadeSettings.swift:77-181`.
- The failure: I took a deep copy of each real SETTINGS, made one edit, and passed it to `settings_problems`. Every
  case below came back with no problems, and in every case the Swift `Decodable` throws:
  - Countdown's `summary` without `"none"`: `Summary.none` is a non-optional `String`.
  - Habits' `id` rule without `"hex"`: `IDRule` needs `key`, `prefix` and `hex`.
  - `"required": "yes"`: `required` is `Bool?`, and a string there is a type mismatch, not nil.
  - A symbol option given as `{"value": "x"}` with no label: `Option` needs both.
  - Habits' `"days": "7"`: `days` is `Int?`.
  The checker does check `kind`, `key`, `label`, a text field's `max`, and choice options. It does not check the
  rest of what the decoder needs, or the types of the optional members.
- Why it matters: `GalleryEntry.shelf` decodes the whole catalog under one `try?` (F2). One such typo in one premade
  gives an empty Gallery for all twelve, while `run_host.py widgets` stays green. The only test that catches it is
  the Swift one, so a Python-only change finds out at the Xcode land, or later.
- Fix (Pernille): make `settings_problems` check what the decoder needs. That means the required members (`v`,
  `title`, `page_family`, `summary.none`, `sections`; each field's `key`, `kind`, `label`; an `id` rule's `key`,
  `prefix` and integer `hex`; each option's `value` and `label`) and the JSON type of every optional member
  `SettingsField` decodes (Bool, Int, String, list), by name, from one table. Add the five probes above to
  `test_mutants_are_red`. Board: T-4645.

### L1. One bad declaration empties the whole Gallery (Swift side, my own code)

- Where: `pywidget/ios/App/Gallery/GalleryPreview.swift:36-41`. `try? JSONDecoder().decode(File.self, ...)`, and
  `GalleryEntry.settings` is decoded as part of each entry.
- The failure: a `settings` value that does not decode, whether a type slip (M1) or a future kind that the `Kind`
  enum does not know, throws out the whole file, so the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> is `[]`. The spec's own refusal for a declaration
  it cannot use is `page.newer` (s4.1), which is narrower: only that premade loses its Page. Today the catalog and
  the app ship together, so a `v: 2` cannot reach an older app. A Python typo can.
- Fix (Idris, reviewed by someone else): decode `settings` on its own per entry (a wrapper that turns the error
  into nil, so that premade stays on the shelf without its settings row), and add a test where a catalog with
  one broken declaration still gives every entry, that one with no Page. M1 is still worth doing; this only limits the damage when something
  gets past it. Board: T-4646.

### L2. Countdown Medium says "Today" twice for an all-day event on its day

- Where: `pywidget/widgets/premade/countdown.py:115-118` (`_count` gives the hero "Today") and `:107-112` with
  `:167` (`_when` gives the caption below it "Today").
- The failure: I drew an all-day "Lisbon trip" on its own day, plus a timed event three days later. Medium's
  left column reads `NEXT UP`, `Lisbon trip`, `Today`, `Today`. Small does not have this: its caption under the
  hero is the date (`Mon, Oct 26`). Timed events do not either: their hero is a timer and their caption
  "Today, 3:00 PM". No test looks at this text. `test_tomorrow_and_today_have_no_clock` checks `_when` alone.
- Fix (Pernille, with Maren choosing the words): when the hero already says Today, the caption under it says the
  date, as Small's does. Add a test on Medium's texts for an all-day event on its day. Board: T-4647.

### L3. The spec still gives the design widths, and the design trees wait on a temporary list

- Where: `premade-inputs.md` s3.1 (Name `max` 28), s3.2 (24), s3.3 (32, "`NAME_MAX`"), s3.4 (20), s3.5 (24), and the
  s4.1 example (`"max": 28`, `"name_max": 24`). The code carries 16, 20, 11 (9 at this commit; T-4504 raised it),
  10 and 13. `clocks.py:65` keeps `NAME_MAX = 32` as the widget's own cut of a hand-written file, which is fine,
  but s3.3 names it as the Page's limit. In `test_premade_design.py`, the `LIMITS_T4468` rows add the new
  modifiers to the expected design-tree diffs "until Maren regenerates the design trees". No board line asks for
  that.
- Why it matters: the app reads its limits from `catalog.json`, so nothing is wrong on the phone today. The spec
  is what a reviewer, a test author or phase C's component settings (s2.6) builds from, and on five numbers it
  now disagrees with the code. The temporary rows also hide any later design-tree change that lands on the same
  paths.
- Fix (Maren): s3 and s4.1 give the measured limits with one line saying `test_premade_text_max.py` decides them,
  s3.3 stops naming `NAME_MAX`, and the design trees are regenerated with the T-4468 modifiers so `LIMITS_T4468`
  can go. Board: T-4648.

### L4. CATALOG.md does not list the new field

- Where: `pywidget/widgets/premade/CATALOG.md`, the field table (rows `stale_after_seconds`, `trees`,
  `empty_case`). The commit adds `settings` to every catalog entry and to `premade_catalog.py`'s docstring, but
  not to the page that documents the file for its readers.
- Fix (Pernille, with M1): a `settings` row (the SETTINGS literal or null, its shape in premade-inputs.md s2.2
  and s4.1, checked by `settings_problems`). Board: T-4645, with M1.

## Notes (no work asked)

- `settings()` (`premade_catalog.py:51-62`) catches only `ValueError` from `ast.literal_eval`. A literal with an
  unhashable key raises `TypeError` and stops the tool with a traceback instead of the tool's own message. A
  `SETTINGS: dict = {...}` (an annotated assignment) is not seen, so that premade silently has no Page.
  `test_the_seven_and_only_they_have_a_page` would catch the second. Both are cosmetic.
- The limits are measured with English text, as the test's docstring says. A name in a script with wider glyphs
  (CJK) at the same character count will be cut by an ellipsis or scaled. It is not lost: the file keeps the whole
  name. That fits a 1.0 in English. If the Page is localised, the measure should be looked at again.
- `test_the_text_at_its_limit_is_in_some_tree_whole` checks only the first row of each list. The other rows share
  the same code path, so that is enough.
- GitHub's `max` 140 is owner 39 + "/" + name 100, as s3.6 allows. How a pasted link longer than 140 is treated is
  the Swift Page's business (`SettingsKinds.normalised`), not this commit's.

Findings: 1 Medium, 4 Low; board lines T-4645 (M1 and L4), T-4646 (L1), T-4647 (L2), T-4648 (L3).
{% endraw %}

</div>
