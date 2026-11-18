---
layout: "default"
title: "Review of 762cdfda80: T-4746, the product&#x27;s name written &quot;PyWidget&quot; in the widget&#x27;s words"
section: "documents"
description: "PASS with findings. All eleven strings named on the T-4746 line now write &quot;PyWidget&quot;. Each changes the name&#x27;s case and nothing else, so each stays inside the approved voice and needs no Investor card. No other\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4746-762cdfda-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4746-762cdfda-idris.md</code></span></div><h1>Review of 762cdfda80: T-4746, the product's name written "PyWidget" in the widget's words</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris (T-4885, Commandment 13). Author: Maren. Reviewed: 762cdfda80 as a whole (14 files), against
`creative/approved.md` entry 8 (the voice rule, #141) and [`pywidget/docs/design/copy-card-pending.md`](copy-card-pending.html)
("How the rule was read", "Breaks the voice rule"). Line numbers are at main e0334949ac, where none of the
reviewed files has changed since 762cdfda80. Date: 2026-11-18.

## Tests run

- `python3 pywidget/tests/run_host.py a11y widgets` (host Python 3.9.6): PASS, a11y 32 tests; widgets 442 tests,
  1 skipped, 2 expected failures.
- `python3 pywidget/docs/design/states/check_states.py`: exit 0.
- `python3 pywidget/tests/widgets/test_first_renders.py`: OK, 2 first renders checked.
- `draw_gallery.py` re-run: A phone 293,075 B, A iPad 224,751 B, B phone 291,590 B, 0 issues, coverage
  missing none. The bytes equal the committed sheets (the working tree stayed clean), so spec s9.10's new figures
  reproduce.
- A host cross-check of the Swift tests' literals against the bundled `state-tokens.json`: `pro_card`,
  `first_draw`, `first_draw.tap`, `unset` and `unset_lock` each equal the string the Swift tests assert, after
  `{name}` is filled. No `copy` or `voiceover` value (keys without `$`) still matches `\bpywidget\b`.
  `update.inline` is 15 characters, as before.
- Not re-run: the Swift suites. The author's MacBook land run J-20261117-1931-land-m5-3505d6 is green (2043 run,
  0 failures, ops/board_notes/T-4746.md). Equality asserts that held on the old text cannot also hold on the new,
  so these tests turned red, then green, for the right reason.

## What changed, string by string


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What changed, string by string, scrolls sideways" data-n="1" style="--tw:919px" markdown="1">

| # | Where | Now | Read by shipped code |
|---|---|---|---|
| 1 | `draw_gallery.py:73` `add.home2` | Search for PyWidget and add the widget. | No: design script; step stays held |
| 2 | `draw_gallery.py:76` `add.lock2` | Tap the widget area and choose PyWidget. | No: design script; step stays held |
| 3 | `state-tokens.json:74` `too_large.steps[0]` | Open it in PyWidget | Bundled, read by no Swift |
| 4 | `state-tokens.json:109` VO `pro_card` | {name}. Needs Pro. Double-tap to open in PyWidget. | Yes, `WidgetPlacement.swift:331` |
| 5 | `state-tokens.json:110` VO `unset` | PyWidget. Not set to a widget yet. Touch and hold, then choose Edit Widget. Double-tap to open PyWidget. | Yes, `ChooseCardView.swift:74` |
| 6 | `state-tokens.json:111` VO `unset_lock` | PyWidget. Not set to a widget yet. Double-tap to open PyWidget. | Yes, `ChooseCardView.swift:75` |
| 7 | `state-tokens.json:63` `update.detail` | Needs a newer PyWidget | Bundled, read by no Swift |
| 8 | `state-tokens.json:65` `update.inline` | Update PyWidget | Bundled, read by no Swift |
| 9 | `state-tokens.json:88` `first_draw.tap` | Open PyWidget to draw it | Yes, `FirstDrawCardView.swift:70` |
| 10 | `state-tokens.json:107` VO `update` | {widget}. Needs a newer PyWidget. Double-tap to open. | Bundled, read by no Swift |
| 11 | `state-tokens.json:112` VO `first_draw` | {name}. Not drawn yet. Double-tap to open PyWidget, which draws it. | Yes, `FirstDrawCardView.swift:71` |

</div>


**Voice.** Each of the eleven changes the case of one word and nothing else: same words, same order, same
lengths. Each already followed the rest of the rule (plain words, sentence case, short sentences, no "the app",
no exclamation marks, no jokes), so each now follows all of it. No new wording, so nothing needs an Investor card
(entry 8: "new ones written the same way need no card"). The 2026-10-25 8:08 PM ET <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>'s own quoted words in
state-spec s3.2 are rightly left as written. `add.home2` and `add.lock2` stay held with the other four add steps;
the copy card says so.

**Tests: retargeted, not weakened.** Each changed assertion keeps its form (exact `XCTAssertEqual` before and
after, `WidgetPlacementTests.swift:161`). No assertion was removed or loosened. Two were added:
`ChooseCardLockVoiceOverTests.swift:20` now pins the whole Lock Screen line (before, only that it lacked "touch and
hold" and "Edit Widget" and said "Double-tap"), and `FirstDrawCardTests.swift:160` pins `first_draw.tap`.
The a11y test's three edits (`test_choose_card_lock_voiceover.py:19`, `:78`, `:84`) change case only; each mutant
still fails the checker for the reason its name gives.

**VoiceOver.** The labels were already built name first, then state, then gesture. "PyWidget" in camel case
gives VoiceOver a word break ("Py Widget"). The lower-case "pywidget" was one unknown word, so the new spelling can
only read better. Nobody has listened to it on a device, and how "Py" is spoken (as in "Python", or letter by
letter) is unverified (L2).

## Findings

### M1 (Medium): fourteen premade widget lines still write "pywidget", and two ship in the extension's bundle

The task line and the copy card cover state-tokens.json and the Gallery. The premade scripts draw their own
empty-state lines on the Home Screen. Those lines are the widget's words too, they write the name in lower case,
and no copy card lists them:

- `widgets/premade/habits.py:94` "Add a habit in pywidget."; `countdown.py:135` "Add a countdown in pywidget."
  Both are also in the bundled first renders the extension draws before the app's first open
  (`widgets/premade/first-renders/habits.json`, `countdown.json`; `project.yml` PyWidgetExtension resources).
- `sun.py:135`, `altitude.py:115`, `distance.py:158` and `:162`, `shortcuts.py:69` and `:83` ("Edit in pywidget"),
  `github.py:156`, `clocks.py:89`, `:90`, `:175` and `:223` (a VoiceOver line), `launcher/_launch.py:231`.
- Next to these, in the Gallery: `widgets/premade/launcher/catalog.json:11`, `:21`, `:31`, `:41` ("The apps you save
  in pywidget ...").

This was not caused by 762cdfda80 and is outside T-4746's eleven, so it does not hold up the verdict. It answers
the review's question, though: the widget still says "pywidget" in other places.
**Fix:** a follow-up for Maren. Change the case only in these lines. Regenerate the two first renders with
`pywidget/ios/scripts/first_renders.py` so `test_first_renders` stays byte-equal. List the lines on the copy card,
inside the voice rule, as T-4746 did.

### L1 (Low): four of the eleven are pinned by no test, and the copy card says more of them ship than do

`update.detail`, `update.inline`, `too_large.steps` and the `update` VoiceOver line are bundled with the widget
and with the app, but no Swift reads them yet: only `pro_card`, `unset`, `unset_lock`, `first_draw` and
`first_draw.tap` are read (`WidgetPlacement.swift:331`, `ChooseCardView.swift:74-75`, `FirstDrawCardView.swift:70-71`).
`copy-card-pending.md:96` says "Strings 3 to 6 and these five ship today". Strings 3, 7, 8 and 10 are bundled but
drawn by nothing, so no test would catch them if they went back to lower case before an update or too-big card
reads them. The fix is right; only the claim and the guard are off.
**Fix:** add a rule to `check_states.py`: fail on any `copy` or `voiceover` value (keys without `$`) that matches
`\bpywidget\b`, with a mutant case in `tests/a11y/test_choose_card_lock_voiceover.py` next to
`test_lock_row_with_the_id_fails`. Change the copy card line to "Strings 4 to 6 and three of the five are drawn
today; 3, 7, 8 and 10 are bundled for cards not yet built."

### L2 (Low): how VoiceOver says "PyWidget" is unverified

See VoiceOver above. **Fix:** add one step to the next phone check that already runs VoiceOver on a placed
widget: focus the Choose card and the Pro card and write down how "PyWidget" is spoken. If "Py" comes out
letter by letter, raise it then. No change now.

### L3 (Low, outside the widget): the app's Settings pages and Acknowledgements still write "pywidget"

`ios/App/Pages/SettingsPage.swift:20`, `:21`, `:22`, `:31`, `:39`, `:45`, `:55`, `:57` (`:22` and `:55` also say
"the app"), and `ios/Localization/Localizable.xcstrings:1412` "pywidget is built on open-source software.", which
also starts a sentence in lower case. These are the app's words, not the widget's, so they are out of this
task's scope. They break the same rule.
**Fix:** fold them into M1's follow-up as a second part: a case-only change for the name. Rewording "the app"
stays inside the voice ("Update PyWidget to change them."). No card is needed.

## Verdict

**PASS with findings.** All eleven strings named on the T-4746 line now write "PyWidget". Each changes the
name's case and nothing else, so each stays inside the approved voice and needs no Investor card. No other
lower-case name is left in `state-tokens.json`'s shipped copy or VoiceOver lines. No test got weaker: every
changed assertion is still an exact match, and two new ones pin the Lock Screen Choose line and the first-draw
tap line. Host suites are green, and the author's MacBook run is green. T-4746's own work is complete.
M1 (premade widget lines that still say "pywidget") goes to Maren as a follow-up. L1 to L3 are noted for the
same pass.
{% endraw %}

</div>
