---
layout: "default"
title: "Review of bef6b4506a: T-4886, &quot;PyWidget&quot; in the premade widgets&#x27; lines, the Settings pages and Acknowledgements"
section: "documents"
description: "PASS with findings. Every line the commit changes changes only the name&#x27;s case, apart from the two &quot;the app&quot; rewordings the voice rule asks for. Every regenerated fixture differs only in the name, plus the hashes that\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4886-bef6b4506a-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4886-bef6b4506a-idris.md</code></span></div><h1>Review of bef6b4506a: T-4886, "PyWidget" in the premade widgets' lines, the Settings pages and Acknowledgements</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris (T-4889, Commandment 13). Author: Maren. Reviewed: bef6b4506a as a whole (34 product files; the
author's memory files not read), against `creative/approved.md` entry 8 (the voice rule) and
[`pywidget/docs/design/copy-card-pending.md`](copy-card-pending.html). None of the reviewed files, nor `widgets/premade/steps.py`, has changed
between bef6b4506a and main b3d8bce28e, so line numbers hold at both. Date: 2026-11-18.

## Tests run

All on a clean `git archive` export of b3d8bce28e in a scratch folder (see the note under L3 on why).

- `python3 pywidget/docs/design/states/check_states.py`: exit 0, "state pairs checked: 71 ... fails: 0".
- `python3 pywidget/tests/fixtures/tour/make_tour_fixtures.py --check`: exit 0, no DRIFT.
- `python3 pywidget/tests/run_host.py --both a11y widgets root tooling`: OK on Python 3.9.6 and 3.13.18, 1208 tests,
  0 failed suites (a11y 35; widgets 443, including `test_first_renders` "checked 2 first renders",
  `test_premade_trees_fixture`, `test_tour_fixtures`, `test_clocks_after_horizon`, `test_premade_catalog`).
- `python3 -m unittest pywidget/tests/test_settings_strings.py`: OK, 2 tests.
- Two mutants of the new rule, each on its own copy, running `test_choose_card_lock_voiceover.py`:
  (a) the two `lower_name_in(...)` calls replaced by `pass`: 2 failures (both mutant tests), KILLED;
  (b) `LOWER_NAME` widened to a bare `pywidget`: 1 failure (`test_code_names_are_not_copy`), KILLED.
- Not run: the Swift suites. The Swift edits are three string literals and one xcstrings key and value (below).

## Question 1: does any line change more than the case?

A line-by-line comparison of every changed line before and after (only `p`/`P` and `w`/`W` may differ): every
changed line in the 21 premade, fixture, Swift and xcstrings files is case-only, with exactly two exceptions,
both "the app":

- `SettingsPage.swift:22` `page.newer`: "... a newer pywidget. Update the app to change them." becomes
  "... a newer PyWidget. Update PyWidget to change them."
- `SettingsPage.swift:55` `page.nocities`: "pywidget couldn't read its city list. Reinstall the app to get it back."
  becomes "PyWidget couldn't read its city list. Reinstall PyWidget to get it back."

The same `page.newer` change is mirrored in `premade-inputs.md`. `Acknowledgements.swift`, the xcstrings key and its
`en` value change together, so the lookup still matches. No code identifier moved: every new "PyWidget" sits inside
a user-facing string (a `k.notice` line, a `label`, a VoiceOver string, a catalog "uses" line, a Settings string, a
test assertion of one). No `pywidget://`, `from pywidget import`, `pywidget.` id or path was touched.

## Question 2: do the regenerated fixtures differ only in the name?

Yes. The two first renders (`habits.json`, `countdown.json`), the seven tour trees that draw the empty countdown,
`premade-trees/shortcuts.json` and the design tree `07-shortcuts.json` are one-line JSON files whose only changes
are the case of the name. `tour/index.json` changes in eleven lines: three case-only lines and eight hashes (seven
`tree_sha256` for the seven changed trees, and `premade_sha256` for the edited `countdown.py`). The <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span>'s
`--check` reproduces every byte, and `test_tour_fixtures` checks each hash against a fresh payload, so the hashes are
the generator's, not hand-written.

## Question 3: does the new rule miss copy?

The rule (`check_states.py:123-143`) reads only `state-tokens.json`'s `copy` and `voiceover` tables. Within that
file it works: no shipped value matches, and both mutants die. Its regex spares code names correctly
(`pywidget://`, `pywidget.http`, `pywidget/docs`, `pywidget_ui`), and catches "Open pywidget.", "pywidget's" and
"(pywidget)". A scan of the shipped sources at main for the same pattern, outside comments, found these strings a
person still reads with the name in lower case:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Question 3: does the new rule miss copy?, scrolls sideways" style="--tw:960px" markdown="1">

| Where | String | Status |
|---|---|---|
| `widgets/premade/steps.py:119` | Turn on Motion & Fitness for pywidget in Settings. | missed: a premade empty-state line (M1) |
| `ios/App/Runtime/_pywidget_runtime/runner.py:481` | ... the %s package built into pywidget is used instead. | missed: Console note, DRAFT words (L1) |
| `docs/design/states/draw_states.py:149` | Open pywidget | design mockup's update steps, not shipped (L1) |
| `ios/App/Store/pro-strings.json:4`, `:60` | pywidget Pro | Investor-approved words; the copy card holds them on purpose (line 129). Not a fault here. |

</div>


Everything else the scan found is code: module imports, `pywidget.` ids, the URL scheme, the city-file header,
crash-marker and argument tags, and developer-facing bridge errors that name the module (`pywidget.http ...`).

## Findings

### M1 (Medium): the Steps widget's "Motion is off" line still writes "pywidget"

`widgets/premade/steps.py:119`: `k.notice(f, "figure.walk", "Motion is off", "Turn on Motion & Fitness for pywidget in Settings.")`.
It is a premade empty-state line drawn on the Home Screen, the same kind as rows 12 to 20 of the copy card, and the
copy card lists Steps in the Gallery (`copy-card-pending.md:35`). The commit does not touch it, and the copy card's
new table does not list it. My own T-4746 review (M1) left it out of the list this commit worked from, so the miss
started with my list. Nothing in this commit is wrong because of it, but the claim "the premade lines now read
PyWidget" is not yet true.
**Fix (Maren):** case-only change in `steps.py:119`; add it to the copy card as row 25. No first render or fixture
carries this line today (a grep of the tree finds it only in `steps.py`).

### M2 (Medium): the new guard does not reach the lines this commit fixed

`check_states.py` guards only `state-tokens.json`. The sixteen premade lines, the six catalog "uses" lines, the
eight Settings strings and the Acknowledgements line fixed here have no guard. Only `test_clocks_after_horizon.py`
pins two of them (by assertion on the new text). A later edit back to "pywidget" in any of the others would pass
every host suite, and M1 shows this has already happened once. The copy card's last paragraph reads as if the rule
covers the change; it covers the earlier T-4746 strings.
**Fix (Maren):** a host test that runs the same pattern over the user-facing strings in `widgets/premade/*.py`
(string literals passed to `k.notice`, `label` and the VoiceOver returns, or simply every string literal outside
docstrings and imports), `launcher/catalog.json` (`uses`, `caption`), `ios/App/Pages/SettingsPage.swift`'s
`page.*` table, `ios/App/Settings/settings-strings.json` and `ios/Localization/Localizable.xcstrings` values, with
a mutant per source. Widening the pattern to "pywidgets" and to "Pywidget" (wrong case, not a code name) costs
nothing at the same time. Then say on the copy card which files the guard reads.

### L1 (Low): two more lower-case names a person can read

- `runner.py:481`, the Console note for a folder file that shadows a bundled package: "the %s package built into
  pywidget is used instead." It is Maren's DRAFT text (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>, [`t0632-console-words.md`](t0632-console-words.html)), shown to a person in the
  Console. Case-only change.
- `draw_states.py:149`, the update card mockup's steps, "Open pywidget". Not shipped; the mockups it draws would
  show the old spelling next to cards that now say "PyWidget". Case-only change, then redraw.

### L2 (Low): small inaccuracies in the copy card and the claim

- Rows 22 and 23 say "the app" becomes "PyWidget" for eight strings; it did so in two (`page.newer`,
  `page.nocities`). The other six are case-only. Write "case" on those and "case; 'the app' becomes PyWidget" on
  the two.
- "Add a habit in PyWidget is the line the bundled first render draws": there are two first renders; the Countdown
  one draws "Add a countdown in PyWidget." too.
- The board line and the copy card say three new mutants; the test adds two mutants (a lower-case name in
  `voiceover`, one in `copy`) and one false-positive guard (`test_code_names_are_not_copy`). All three are worth
  having; the count is off. The guard test is good: my mutant (b) shows it is the only test that stops the rule
  from flagging code names.
- The corrected "ship today" paragraph is right: `ChooseCardView.swift:74-75` and `FirstDrawCardView.swift:70-71`
  read strings 5, 6 and the two `first_draw` strings; nothing in Swift reads `update.*` or `too_large.steps`.

### L3 (Low, process, not the author's): the shared working tree carried someone else's edits

My first `run_host.py --both` ran in the worktree, which at the time held uncommitted changes to
`widgets/premade/countdown.py` and `tests/fixtures/tour/index.json` from another session. Python 3.9.6 reported
the widgets suite red (2 failures); the same suites on a clean export of main are green on both interpreters, and two
later 3.9.6 widgets runs were green. The red is not this commit's. Noted so nobody reads that run as evidence.

## Verdict

**PASS with findings.** Every line the commit changes changes only the name's case, apart from the two "the app"
rewordings the voice rule asks for. Every regenerated fixture differs only in the name, plus the hashes that follow
from it, and the generators reproduce them byte for byte. The new `check_states.py` rule works for
`state-tokens.json`: no false positives on code names, and both mutants die. Host suites are green on 3.9.6 and 3.13.
Open: one premade line still says "pywidget" (M1, Steps), and nothing guards the lines this commit fixed (M2). Both
go to Maren as board lines: T-4895 (M1, with L1 folded in) and T-4896 (M2, with L2 folded in).

## Re-check at main e5b3da87a0 (2026-11-20, T-4889 dispatched again)

The review above landed on 2026-11-18 (f5532eb710) and its findings went to the board as T-4895 and T-4896, but
T-4889 was never ticked. I re-checked rather than wrote a second review.

- **Name spelling.** Every new name in the commit reads exactly "PyWidget", the spelling in `creative/approved.md`
  entry 8 (the voice rule). Entry 8 also says the name itself is still open (#90): "PyWidget" there stands for
  whatever name is chosen. So the commit follows the approved rule; it does not, and cannot, settle the name. No
  other words in the voice changed.
- **Nothing moved.** Between bef6b4506a and main, none of the 36 files changed a name string; the changes in
  `draw_settings.py`, `spec.md`, `premade-inputs.md`, `premade.py` and `altitude.py` are other tasks' (T-4635,
  T-5293). `steps.py:119` still reads "Turn on Motion & Fitness for pywidget in Settings." (M1, T-4895, still open).
- **Fixtures, again.** Every JSON leaf in the 13 changed JSON files, old against new: each change is the name's case
  (or "the app"), except the `tour/index.json` hashes; `make_tour_fixtures.py --check` exit 0.
- **Tests, in a scratch worktree at e5b3da87a0.** `check_states.py`: fails 0. `test_choose_card_lock_voiceover.py`
  (the three new tests): 10 OK. `run_host.py --both a11y widgets`: a11y 35/35 on both; widgets green on 3.13.18 (462,
  8 skipped); on 3.9.6 one failure, `test_http_budget_reserve` `test_headers_that_drip_are_cut_on_time` (median 0.060 s
  past a 0.05 s bound), a timing test under load in a file this commit never touched. Not this commit's.

### L4 (Low, new): the rule's lookahead lets "pywidget:" through

`LOWER_NAME`'s lookahead `(?![\w:/]|\.\w)` refuses any following colon, not just `://`. Probed directly:
"pywidget: couldn't save." is not flagged, while "Open pywidget." and "pywidget's list" are. The reverse holds for
hyphens: "pywidget-run" and "#pywidget-cities" (code tags) are flagged, which matters only once T-4896 widens the
rule beyond `state-tokens.json`. Fix with T-4896: exclude `://` rather than `:`, and keep a false-positive case for a
hyphenated tag. Folded into T-4896 as a note, not a new line.

**Verdict unchanged: PASS with findings** (M1 T-4895, M2 T-4896, L1-L4).
{% endraw %}

</div>
