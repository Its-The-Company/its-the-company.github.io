---
layout: "default"
title: "Review of T-4703 at 91d78b9a: showcase frames for Day phases (transit, today, night, no recent times) and Focus timer"
section: "documents"
description: "The frames are honest about what they are, they reproduce (four of five sheets byte for byte), they stay inside items 2 and 9, and they carry no licence or marks problem. The QA numbers on the page are the numbers the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4703-91d78b9a-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4703-91d78b9a-pernille.md</code></span></div><h1>Review of T-4703 at 91d78b9a: showcase frames for Day phases (transit, today, night, no recent times) and Focus timer</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4927, Commandments 13 and 6). Author: Maren. Reviewed: 91d78b9aaa (docs/design/widgets/premade.py,
the "1.0 showcase premades (T-4703)" section; render.py, the `--set showcase` changes; showcase.md; showcase/01..05 JPEGs;
showcase/qa.json; showcase/trees/01..05). Read for comparison: ops/plans/T-4672-showcase-premades.md s1 to s4 (the spec
the frames draw), python/pywidget_ui/__init__.py (Timeline, sampled_at), ios/Shared/TreeView.swift (how the app maps a
date text's style) and ios/Shared/TreeNodes.swift (the timer ProgressView), creative/approved.md item 9. Paths are under
pywidget/ unless they start with ops/, tools/ or creative/. I did not read Maren's memory, handoff or board notes on T-4703.
The later T-4703 commit f32bea8ad4 is outside this review; the lines named below are unchanged by it at this branch's
HEAD fbf1569bf2. Date: 2026-11-18.

There is no app code for either premade yet: `widgets/premade/day_phases.py` exists on no branch (`git log --all` on the
path is empty, as showcase.md says), and there is no Focus timer premade (only the Gallery design
`widgets/gallery/focus_timer.py`). So "what the app would draw" is checked against the plan, the tree library and the
app's renderer, which is what a build from these frames would go through.

What I ran (a detached scratch worktree at 91d78b9aaa under the T-4927 scratch folder; nothing from it is committed):
- `python3 premade.py` in docs/design/widgets: exit 0, 0 problems for the 12 premades and all five showcase sheets with
  every state. Trees 01 and 04 come out byte-identical to the commit; 02, 03 and 05 differ in one field each,
  `sampled_at` (committed 2026-11-17T18:34:22Z, mine 2026-11-19T04:27:42Z): see L2.
- `python3 render.py --set showcase` (Playwright Chromium, 116 s): 184 renders, 0 layout faults, card text and graphics
  faults 0, as claimed. JPEGs 01, 02, 03 and 05 are byte-identical to the commit (shasum). 04 differs, and qa.json differs
  only in 04's `bytes` (307013 -> 307078): see M1.
- The QA table in showcase.md against qa.json: render counts (42/36/32/34/40 = 184), full colour worst text and card
  marks per sheet, the one declared tail truncation ("Reply to Sam about Friday") all match. 1.8 MB for five is
  1,762,660 bytes. Sample sunrise for Wednesday 28 October at 125 St prints 7:21 AM, as the page says.
- The Studio grey map: `_grey_hex` gives #0A0C13 -> #0C0C0C, #5B33E6 -> #5A5A5A, #1E1450 -> #1F1F1F, #A08BFF -> #9C9C9C,
  the four values showcase.md quotes. Status colours are exempt in code (`greyed`). Item 9 asks for exactly this
  ("plain black or dark grey") and the tokens file is untouched.
- A SwiftUI probe on the Mac (swiftc, `ImageRenderer`, no Xcode project, no Simulator): `Text(date, style: .relative)`,
  the style ios/Shared/TreeView.swift:791 maps "relative" to, for dates 4 min 12 s ahead, 4 min 0 s ahead, 65 s past,
  2 h 55 min ahead and 59 min 30 s ahead. It drew "4 min, 11 sec", "3 min, 59 sec", "1 min, 5 sec", "2 hr, 54 min",
  "59 min, 29 sec". This is macOS 27's SwiftUI, not iOS on a device; the style is the same API, and the Simulator check
  should confirm it.
- render.py with `fmt_rel` patched (scratch only) to draw SwiftUI's under-an-hour form at its widest second
  ("N min, 59 sec"), sheets 01, 02 and 05 re-run: 01 has 8 layout faults, every systemLarge panel, every count-down
  truncated ("in 3 min, 59 sec", "in 19 min, 59 sec", ...). 02 and 05 stay at 0 (02's count-down is over an hour at
  2:05 PM; 05 uses timer text, not relative).
- Looked at the five JPEGs whole. Code-drawn by render.py from the trees, system fonts loaded by @font-face from the
  Mac's own SF and New York files as for the 12 premades (Apple's licence covers mock-ups of apps for its platforms), SF
  Symbols replaced by dotted circles; no image model, stock art, photo or outside asset (Commandment 6). No MTA mark:
  route letters are plain bold letters in token colours, no route colour, no circle, no MTA name or logo on any frame.
  "Pomodoro" appears nowhere in the frames or trees. Every sheet's Data row says the arrivals are sample predictions,
  not MTA data, and the footer says the sheets approximate SwiftUI and that the Simulator check counts.
- Not run: any Xcode build or the Simulator. No board read (the direct read of ops/board.md was refused by the auto-mode
  classifier; I used only `tools/board.py open`).

## Verdict: PASS with findings

The frames are honest about what they are, they reproduce (four of five sheets byte for byte), they stay inside items 2
and 9, and they carry no licence or marks problem. The QA numbers on the page are the numbers the script writes. The
plan gaps Maren lists are real ones; gap 2 (the inline text goes stale) is right and I agree with clock times.

Where they do not show what the app would draw is the Transit count-down, the one thing the Morning and Evening views are
built around (H1), and the "never fetched" state, whose caption says the opposite of its own picture (M1). Neither
reaches TestFlight from this commit, which has no app code; both would if the Day phases build followed the frames as
drawn. H1 must be settled before that build draws its count-downs.

## Findings

**H1. "in 4 min" is not what iOS draws, and after the train leaves it says "in 1 min, 5 sec".** The count-down is
`ui.Text(when, style="relative")` (premade.py `in_rel`), which the app renders as SwiftUI's `.relative` style
(TreeView.swift:791). render.py's `fmt_rel` draws "4 min"; SwiftUI draws "3 min, 59 sec" and ticks every second (probe
above). Three consequences:
1. Large truncates every count-down in all eight panels when the real string is measured (8 faults, above). Medium and
   small fit, but every row ticks seconds, a busier widget than the frames show.
2. `.relative` counts up again once the date has passed. Entries are at most every 5 minutes (plan s4.3), so for up to
   five minutes a departed train reads "in 1 min, 5 sec": a false arrival told to someone deciding whether to run for
   the platform. The frames and showcase.md's checklist item 2 ("relative text") both specify this.
3. The VoiceOver label is one string per entry ("B at 7:42 AM, in 4 minutes"), stale by up to five minutes the same way.

The fix is a design choice and Maren's: for example timer text that stops at 0:00 (`Text(timerInterval:countsDown:)`,
the one self-updating form that stops), or clock times only with no count-down, and a label with clock times only.
render.py's `fmt_rel` should draw SwiftUI's under-an-hour form so every sheet measures the real string; Countdown,
Sunrise and Today's "Evening trains in ..." line (from 4:00 PM) use the same style. The Day phases build takes whichever
form the frames settle on. Board line: T-5000 (Maren).

**M1. The "Never fetched (no Updated line)" frame shows "Updated 2:34 PM".** showcase.md says "The same words show with
no Updated line, because there is no `sampled_at`", and the state passes `sampled=None`. But `ui.Timeline` fills a
missing `sampled_at` with the current clock, as its docstring says (pywidget_ui `Timeline`, "Left out, it is the current
time"), so the tree carries the time the script ran and render.py draws it as an Updated line (visible in both states
of 04-day_phases-norecent.jpg). That is also why sheet 04 and its qa.json row do not reproduce. In the app a premade
that has never fetched would likewise say "Updated <now>", a false freshness claim. The view has to leave `ui.Updated()`
out in that state (a state flag in `transit_norecent`), not rely on a missing `sampled_at`. Board line: T-5001 (Maren),
with L1 to L4.

**L1. Focus timer, "No block running": the words say 3 blocks, the chart draws 4.** `done_words` drops the running block
when idle ("3 blocks, 1 hr 40 min"), but `ft_chart` always draws all four `FT_BLOCKS`, the last in primary as if
running. T-5001.

**L2. Trees 02, 03 and 05 are not byte-stable.** They pass no `sampled_at`, so each run writes the clock time
(2026-11-17 in the commit, three weeks after the sample day of 27 October). Passing `sampled_at=w["now"]` makes them
stable and keeps the sample day consistent. T-5001.

**L3. Two plan gaps not in showcase.md's list.** (a) Night runs 9:00 PM to 6:00 AM, so after midnight "Tomorrow,
Wednesday October 28" is wrong: it is today's morning. The frame at 10:20 PM is true; the words for 12:00 PM to 6:00 AM are
undecided. The Day phases build is mine and I will take (a) there, but it belongs in the frames' gap list. (b) Focus
timer's medium and large show a task name ("Draft the notes"); plan s2 row 3 has no input for one. Either it becomes a
Page field in the plan or the frames drop it. T-5001.

**L4. showcase.md's list of symbols with no stand-in misses `checklist`** (the Today inline), which also shows as a
dotted circle. T-5001.
{% endraw %}

</div>
