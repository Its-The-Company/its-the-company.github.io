---
layout: "default"
title: "Review of cb989fd1c8: T-4555&#x27;s When tapped frames, with Idris&#x27;s build notes answered"
section: "documents"
description: "The frames cover every part the board line asks for: the picker with its default row and empty states (3-11), the Buttons rows per name with count, gone and family-cap lines (1, 2, 7), the link field and its three M6\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/cb989fd1c8-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/cb989fd1c8-pernille.md</code></span></div><h1>Review of cb989fd1c8: T-4555's When tapped frames, with Idris's build notes answered</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div><p class="meta">Mockup screens are drawn; they go public after creative approval.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4602, Commandment 13). Author: Maren. Reviewed: the pair 361f801c9c (34 frames, README spec,
strings DRAFT) and cb989fd1c8 (build notes answered; frames 4, 27, 29-34 changed, frame 35 added), as a whole:
`pywidget/docs/design/when-tapped/` (`README.md`, `draw_when_tapped.py`, `qa.json`, the eight PNGs). Read against
T-4555's board line (`ops/board.md`), ADR-011 s5, s8, s9 at cb989fd1c8 ([`pywidget/docs/decisions/ADR-011-widget-actions.md`](adr-011-widget-actions.html)),
`creative/approved.md` items 2, 8 and 9, and the README's own "Idris's build notes answered" section. Idris's notes
themselves are not in the repository (see L3), so the answers were read against the frames and the ADR. Line numbers
are at cb989fd1c8. Date: 2026-11-17.

The copies. bc81afa05d has the same patch as 361f801c9c (`git show --format=` of each, `diff`: identical; same
`patch-id`). 2145414c5d differs from 361f801c9c only in Maren's two memory files (a different base for
`.claude/agent-memory/maren/`); `git diff 361f801c9c 2145414c5d -- pywidget/docs/design/when-tapped` is empty.
522e17e7da and 19daf17332 have patches identical to cb989fd1c8's. So the review holds for every copy.

## Tests run

- From a `git archive` of `pywidget`, `tools`, `creative`, `log/software.md` and `log/assets.md` at cb989fd1c8 into
  scratch (`company-scratch/T-4602-pernille`), so the tree's `qa.json` was never written:
  `python3 draw_when_tapped.py` exit 0 in 1 min 50 s, 8 sheets, 70 frames (35 per appearance), issues 0 on every
  sheet, min text contrast 5.72 (A) and 5.6 (B), largest sheet 293,714 B. These are the README's numbers.
- `qa.json` from that run against the committed one: one line differs, `B-when-tapped-notices` `bytes` 292,758
  committed, 292,676 rerun. Seven PNGs are byte-identical; the B notices sheet differs in 1,252 of 6,423,810 pixels,
  at most 26 of 255 in one channel (palette quantisation of the soft shadow and glass). Every QA count and contrast
  figure is identical. See Info.
- Looked at `A-when-tapped-setting.png` (frames 1-13, 35), `A-when-tapped-access.png` and `B-when-tapped-access.png`
  (28-34), `B-when-tapped-notices.png` (20-27). Frame 4: Open an app hidden, footer "PyWidget opens first, then the
  page." (E5 fixed). Frame 27: the slot shows the drawn `app` glyph, id `music-2` fixed in the In Scripts row.
  Frames 30 and 31: chevrons kept on rows that push, none on Open Projects. Frame 32: middle truncation
  "lib/so…ather.py". Frame 34: the notice grows down, Change and Close visible. Frame 35: `add_water` first and
  checked, warning glyph and "Not in this widget's script" in the warning colour, words carry the state.
- Strings: `draw_when_tapped.py --strings` prints the README's table exactly (68 IDs, `S` at
  `draw_when_tapped.py:35-113`; diff of the rows: identical). The ADR-sourced ones
  match ADR-011 s8 and s9 word for word, with "pywidget" written "PyWidget" (README s9; the voice rule in
  `creative/approved.md` item 8 says the same).
- Commandment 6: every pixel is HTML, CSS or SVG in this script and the shared `ide/draw_ide.py`,
  `ide/draw_settings.py`, `launcher/draw_editor.py`. No `` of an outside file, no network URL, no model call; the
  only `url()`s are the system SF Pro, SF Rounded and New York fonts, as in every earlier sheet. Names are invented,
  `example.com` is reserved. No new outside asset, so no asset log row is owed.
- No Xcode run. Nothing in this pair is Swift.

## Verdict: PASS with findings

The frames cover every part the board line asks for: the picker with its default row and empty states (3-11), the
Buttons rows per name with count, gone and family-<span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> lines (1, 2, 7), the link field and its three M6 errors one at
a time (14-19), N1-N6 with Close and Change only on N1-N3 (20-25), Set Up App's two reasons (26, 27), VoiceOver order
and labels (28, 29) and AX3 (30-34), in Paper and Studio. The QA numbers are the run's numbers. The answers to the
build notes are concrete and none contradicts the ADR; F5 is correctly raised as a proposed ADR s5 change, not taken.

Two findings are Medium. Both are places where a frame still says what the answered notes changed, in the two parts
Idris builds and tests from directly: the AX rule and the VoiceOver labels.

## Findings

### M1. Frame 30's caption still says "chevrons hide"; the README and the drawing say they stay

- Where: `draw_when_tapped.py:454` (`"title above choice; chevrons hide"`), printed under frame 30 on both access
  sheets. README s8 (`README.md:72`) and the F11 answer (`:94`) say chevrons **stay** at AX sizes on rows that push,
  and frames 30-31 were redrawn that way.
- Why it matters: F11 was one of the changes this commit made. The caption is the one place the old rule survives,
  and it sits on the frame the step-8 build checks its AX layout against. A builder who reads captions gets the
  opposite of the spec.
- Fix (Maren): caption "title above choice; chevrons stay on rows that push"; rerun. Board: T-4765.

### M2. Frame 29 (What VoiceOver reads) disagrees with the README in two places

- Where: `draw_when_tapped.py:378-384`.
  1. "A Buttons row drawn 5 times" lists `check` and `skip` without the hint. The F10 answer (`README.md:93`) says
     "frame 29 now gives the hint on every Buttons row"; it does on the three rows under "Widget settings" only.
  2. "The picker" starts "When tapped, Back button". The picker is pushed from the widget's settings, titled "Today"
     (frame 3's back label reads "Today"), so the back button reads "Today, Back button". The list as drawn has the
     title twice.
  3. Smaller: "The link field" starts at "Web Page, heading"; the back button ("Back, Back button") is missing, though
     the other lists start with it.
- Why it matters: F12 agrees that step 8 tests labels, hints and traits. These lists are what those tests will be
  written from, and the README's claim about F10 is only partly true of the frame.
- Fix (Maren): add the hint to both rows (and to `ax.row.n`'s use), "Today, Back button", the link field's back
  button; rerun. Board: T-4765.

### L1. "13 strings are new" is stale, and one "ADR-011" source is new words

- Where: `README.md:77` says 13 strings are new; the table now marks 24 `new, DRAFT` (cb989fd1c8 added 11). `l.app.used`
  "Also in {where}" is marked `ADR-011, DRAFT`, but the ADR gives only the behaviour ("where else it is used", s5a and
  the review table), not these words. Also `README.md:14`: "5.6:1 (B) Every sheet" lacks its full stop.
- Fix (Maren, with T-4765): say 24 and let the list follow the table, mark `l.app.used` new. No separate line.

### L2. Frame 33 wraps the URL over three lines; the F4 answer says the field is one line that scrolls

- Where: frame 33 (`draw_when_tapped.py:458`, `link_screen(..., kb=False)` at AX3) shows "http://exampl / e.com/train- /
  times" in a growing field. F4 (`README.md:87`) says to use a single-line field that scrolls, and calls only frame
  18's wrap "the drawing's".
- Fix (Maren, with T-4765): either draw frame 33 as one scrolled line, or extend F4's sentence to frame 33. No separate
  line.

### L3. Idris's build notes are answered but not recorded

- Where: README "Idris's build notes answered" cites F1-F14 and E1-E19. Neither read is in the repository
  (`git grep` at cb989fd1c8 finds the IDs only in this README), so a reader cannot check an answer against its
  question. Commandment 9 counts only what is written down.
- Fix (Idris): commit the two reads, as given, beside the README or under `pywidget/docs/reviews/`, before step 8's
  review. No separate line; I will ask for them in T-4557's review if they are not there.

### Info

- `qa.json` is not byte-reproducible for `B-when-tapped-notices` (82 B, 1,252 pixels within 26 levels). The QA counts
  are, so the verdict does not depend on it. If a later rerun is used to prove "nothing changed", compare the QA
  fields, not the file's bytes.
- `creative/approved.md` items 8 and 9 were recorded after this commit (2026-11-16 9:45 PM and 10:42 PM). Item 8: strings
  that follow the voice rule are now cleared, so the "DRAFT, no copy guide" labels can be revisited; the strings I
  read follow the rule (plain, what happened then what to do, "PyWidget", no exclamation marks). Item 9: Studio is
  no longer purple. The B sheets draw `tokens.json`'s violet accent and gradients (Change, checkmarks, the Run pill).
  The build takes colours from the asset catalog, not from these PNGs, so nothing here needs changing; a rerun after
  Studio's tokens turn grey redraws them.
{% endraw %}

</div>
