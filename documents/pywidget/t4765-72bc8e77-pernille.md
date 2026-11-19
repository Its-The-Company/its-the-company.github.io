---
layout: "default"
title: "Review of 72bc8e77a3: T-4765, the When tapped frames answer T-4602 (M1, M2, L1, L2)"
section: "documents"
description: "The commit does what it says, and only that: four findings closed, no frame other than 29, 30 and 33 changed in content, every QA count unchanged. No new UI words: the strings&#x27; text in S is untouched; only two &quot;Where&quot;\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4765-72bc8e77-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 29 · Thu Nov 19</span><span><code>pywidget/docs/reviews/t4765-72bc8e77-pernille.md</code></span></div><h1>Review of 72bc8e77a3: T-4765, the When tapped frames answer T-4602 (M1, M2, L1, L2)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div><p class="meta">Mockup screens are drawn; they go public after creative approval.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4925, Commandment 13). Author: Maren. Reviewed: 72bc8e77a3 as a whole, 8 files in
`pywidget/docs/design/when-tapped/` (`README.md`, `draw_when_tapped.py`, `qa.json`, five PNGs), against my T-4602
review of cb989fd1c8 ([`pywidget/docs/reviews/cb989fd1c8-pernille.md`](cb989fd1c8-pernille.html), findings M1, M2, L1, L2) and `creative/approved.md`
item 8 (the voice rule). Read as a diff and as content; the author's memory files not read. None of the eight files has
changed between 72bc8e77a3 and HEAD fbf1569bf2 (`git diff --stat` empty, `git log` empty). Of the helpers it imports,
only `ide/draw_settings.py` changed since (d057115665, bef6b4506a, f531d51b2c, 8e22b68221): Settings strings and Settings
frame captions; this script uses only `ds.row` and `ds.ico` from it, which did not change. Date: 2026-11-18.

## Tests run

- From a `git archive` of `pywidget` at 72bc8e77a3 into scratch (`company-scratch/T-4925-pernille`), so the tree's
  `qa.json` and PNGs were never written: `python3 pywidget/docs/design/when-tapped/draw_when_tapped.py` exit 0 in
  8 min 52 s (machine under load), 8 sheets, 70 frames, issues 0 on every sheet, min text contrast 5.72 (A) and 5.6 (B).
  The script offers no `--check`; the rerun is the check.
- `qa.json` rerun against the committed one: every QA field is identical (per-frame clipped, truncated, overlaps,
  under 11 pt, contrast checked and fails, min contrast; fonts; `css_px`). Differences are in `bytes`, `scale` and
  `decoded_px` only: `A-when-tapped-access` 298,159 B at 1.46x committed, 285,664 B at 1.4x rerun; `B-when-tapped-notices`
  292,676 committed, 292,758 rerun; `B-when-tapped-setting` 279,704 committed (not touched by this commit), 279,703 rerun.
  Five PNGs byte-identical; see Info 1 for A-access.
- A-access probe: the sheet alone, rendered twice, takes the same path both times, 2.0x 422,817 B, 1.62x 341,029 B,
  1.47x 305,930 B (over 300,000), 1.4x 285,664 B. Forced to start at 1.46x (one-line change in the scratch copy of
  `draw_ide.py`), it writes 298,159 B, **byte-identical** to the committed `A-when-tapped-access.png`. So the committed
  sheet is the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span>'s output; only the size search path differs.
- `draw_when_tapped.py --strings` against README's "Strings" table: identical (68 IDs); 25 rows `new, DRAFT`.
- Looked at `A-when-tapped-access.png`: frames 29, 30, 31 and 33 as described below.
- Host tests: none read these files (`git grep` for `when-tapped`/`draw_when_tapped` outside the folder finds only
  reviews, reports, memory and the board archive). No Xcode run: nothing here is Swift.
- Commandment 6: the only drawing change is an HTML `div data-scroll` around the field text; no ``, no outside
  file, no model call. No new outside asset.

## Findings against T-4602

- **M1, closed.** Frame 30's caption reads "title above choice; chevrons stay on rows that push"
  (`draw_when_tapped.py:459`); the frame shows chevrons on every row, matching README s8 and F11.
- **M2, closed, all three parts.** Frame 29 (`:382-390`): both "drawn 5 times" rows end with
  "Changes what happens when you tap it."; the picker list starts "Today, Back button"; the link field list starts
  "Back, Back button". The `ax.row.n` note says the hint follows it. The sheet shows each.
- **L1, closed.** `l.app.used` is marked new words in `S` and the table; README s9 says 25 and points at the table,
  and the table has 25 `new, DRAFT` rows. The QA line has its full stop.
- **L2, closed.** Frame 33 draws the field one line, clipped at its edge in a `data-scroll` box (the same convention
  the other sheets use for scrolled content, so the clip QA does not count it), caption "keyboard down; one line that
  scrolls (F4)"; F4 names frame 33. Frame 18 keeps its wrap as the drawing's.
- L3 (Idris's reads) stays with Idris, as the README says; not this commit's.

## Verdict: PASS with findings

The commit does what it says, and only that: four findings closed, no frame other than 29, 30 and 33 changed in
content, every QA count unchanged. No new UI words: the strings' text in `S` is untouched; only two "Where" notes
changed. Frame 29's new lines are existing strings plus iOS's own "Back button" trait.

## Findings

### L1. `f.title` "Web Page" is in title case; the voice rule and this spec's other titles are sentence case

- Where: `draw_when_tapped.py` `S["f.title"]` ("Web Page", marked new words), drawn on frames 14-19 and 33 and read in
  frame 29's link field list. The picker row that opens it says "Open a web page" (ADR-011 s8's words), and the
  spec's other screen title is "When tapped", sentence case. `creative/approved.md` item 8: "sentence case".
- Why it matters: "Page" with a capital is a PyWidget thing in this same spec (a project's Page: "Open its Page",
  "Not in this project"). "Web Page" reads as a kind of Page. It is one of the 25 new strings this commit counts.
- Not this commit's change: it was there at cb989fd1c8 and I passed it in T-4602. My miss.
- Fix (Maren): "Web page" in `S` and in frame 29's hard-coded "Web Page, heading" (`:389`, a literal, not `T()`),
  rerun, README table regenerated; or a line in s9 saying why it stays. Board: T-4999.

### Info

1. A-access sits on the size cliff: 1.47x is 305,930 B, 1.46x is 298,159 B. Which one the search lands on depends on
   a few bytes in an earlier pass (the same palette noise T-4602's Info named), so a rerun may write 1.4x and
   285,664 B. The README's "largest 298,159 B" is true of the committed file. Its own note, "compare the QA fields,
   not the bytes", is the right rule; this run confirms it again: `B-when-tapped-notices` came back to 292,758, not the
   292,676 the README now says matches my earlier rerun. No work.
2. Seen outside this commit's scope: `set.dev.reset.msg` ("This erases everything the app keeps ... The app then
   closes") in `ide/draw_settings.py:77` and `ios/App/Settings/settings-strings.json:36` says "the app", which the voice
   rule rules out. It is Developer mode only (Debug and internal builds), so not an App Store string. Noted for
   T-4688's reviewer; no line.
{% endraw %}

</div>
