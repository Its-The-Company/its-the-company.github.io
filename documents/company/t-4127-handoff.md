---
layout: "default"
title: "T-4127 handoff before the Fable limit (Operator, 12:2x AM ET 11-13)"
section: "documents"
description: "The Restructuring&#x27;s sixth run, on account b (Jeremy&#x27;s), ran 11:36 PM ET 11-12 to 12:16 AM ET 11-13 from main at cc60253b04, picking up from the 10:40 PM ET handoff of the fifth run on account a. The pause file was\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4127-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 23 · Fri Nov 13</span><span><code>ops/plans/T-4127-handoff.md</code></span></div><h1>T-4127 handoff before the Fable limit (Operator, 12:2x AM ET 11-13)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The Restructuring's sixth run, on account b (Jeremy's), ran 11:36 PM ET 11-12 to 12:16 AM ET 11-13 from main at cc60253b04,
picking up from the 10:40 PM ET handoff of the fifth run on account a. The pause file was written at 12:16 AM ET 11-13 (the 5-hour row projected at
94.6%, burning 2.4 to 3.3% a minute with two or three Fable workers; readings in ops/runs/personal-tick-b.log). Every
worker committed and reported before this note; nothing was left uncommitted. Read
[`documents/restructuring/00-plan.md`](../restructuring/00-plan.html) (run rules and the step table, both current) and `work/prompt.md` first, then
this note.

## Done

- The <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> fourth run (parked/a/20261112-211856-42832) needs nothing more: its work is on main as 464e00c005, and
  T-4230's name, the line its rebase conflicted on, is on main as 4a6e61c0de. Since T-4234 (9c318c9b87, 10:33 PM ET
  11-12) `ops/task-names.tsv` merges by union, so that conflict can't recur.
- Step D1 (Wrenna), `07-documentation.md` research half, final 9957342d3c, 1,986 words. The recommendation for D2 is
  unchanged in substance, plus one line on 03's `pywidget/docs/how-it-works/` folder. Four quotes were corrected on
  re-reading. GitLab's website terms (3.2) and GitBook's (4.4) bar automated retrieval: four docs.gitlab.com pages were
  fetched before the clause was read (event queued, 3820acf5b6). Neither host is fetched again; T-4241 adds both to
  `tools/terms_guard.py`.
- Step 5 (Ines), `05-timeline.md`, final 428a009a57, 2,487 words, eight questions. 1.0 with the Builder is likely late
  March 2027 (range early February to early June); Day 60 falls one week into foundations (recommends an outside
  TestFlight build then); the custom block is sized at 1.25 weeks (0.75 to 2.25). Apple's review time, the
  late-December slowdown, the $99 renewal and the $350 iPad are recalled, unverified: no Apple page was fetched (the
  11-12 Apple day <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> was spent; it is fresh on 11-13).
- Step 4A (Maren), direction A inside Paper and Studio, final bd9fc5fd2c: four files in `04-mockups/a/` (22 frames:
  five screens, Paper and Studio, iPhone and iPad) and `04-mockups/index.md` (intro, Direction A, empty B and C
  headings). Read by eye in Chromium only; one contrast failure fixed. Open: no Gallery row shows a price or Pro mark
  (#87's seven Pro premades against phase 2 question 8 is the Investors' call); the sample Python is placeholder
  (Idris should read it); editor and Builder share a file (the four-file cap); first run, a Page and Increase Contrast
  are not drawn. Tip for B and C: inside SVG `<use>` copies Chromium drops descendant selectors, so single-class rules
  only.
- Step D2 passed to the main session on Opus as board line T-4240 (c6841572370: "Feel free to pass Opus tasks to the
  main session"), so account b's Fable room went to phase 4. It writes `tools/site/`, `tests/`,
  `pywidget/docs/how-it-works/` and the build half of 07. Its line names no link to T-4127 on purpose ("part of" made
  T-4127 an umbrella held by T-4230 at 9:05 PM ET 11-12).
- Step 4B (Maren), direction B, the programmer-first workbench, final 3ec530cbba: four files in `04-mockups/b/` (20
  frames, both devices, both appearances) and B's index section (screens, departs and keeps, 03 answers, measured,
  open). Contrast: 163 pairs, none under 4.5:1 (script in /tmp, not kept); 17 of 20 frames read by eye.
- Progress posted on #41: c6844219927 (start, 11:41 PM ET) and the pause post after this note.

## In flight

Nothing running. Step 4C (Maren, direction C, creative-first: roomier, tiles and cards, larger type, the Builder and
finished things up front, code one tap away) was cut by the pause with two of its four files committed:

- `04-mockups/c/1-projects.html` (f46470f420, 685d1c8dd7): Projects on iPhone and iPad, light and dark, with C's
  departs-and-keeps table. Light renders read by eye; the dark iPad frame not read.
- `04-mockups/c/2-builder-editor.html` (e4fbbd1fd9): the Builder and the editor on iPhone and iPad, 8 frames; Chromium
  drew them with no console errors and no sideways scroll, but no frame was read by eye: treat as unchecked.
- Left: `3-gallery.html` and `4-preview.html`, not started; the "Direction C" section of `04-mockups/index.md`
  (heading only); the contrast check on C's 12 new tile tints. Maren's join helper (copies file 1's style block and its
  `shared:begin` to `shared:end` drawings into each new page) was in /tmp/c4/build.py and may be gone; rebuild it from
  file 1 if so.

## Next step

1. 4C (Maren, Fable xhigh): read the two committed C files by eye (the dark iPad Projects frame and all 8 Builder and
   editor frames), then draw `c/3-gallery.html` and `c/4-preview.html` from file 1's style block, run the contrast
   check, fill index.md's Direction C section, last commit "final". Use single-class CSS rules inside SVG `<use>`
   copies (Chromium drops descendant selectors there). The round stays at 12 files plus index.md.
2. Step 6 (Ines, Fable xhigh) once 4C is final: `06-decisions.md`, under 1,500 words, from 01, 02, 03, 04-mockups
   (index.md), 05 and 07; it gathers every question and working assumption as a numbered decision and writes the #41
   summary under 800 words. Carry the mock-ups' open points into it (below). Then the #41 link to the Documents page.
3. D2 is on the board as T-4240 for the main session on Opus; step 6 notes whether it has landed.

Mock-up open points for step 6: no Gallery row shows a price or a Pro mark in A or B (#87's seven Pro premades
against phase 2 question 8 is the Investors' call); the sample Python is placeholder (Idris to read); B draws run data,
timing and checks the app may not record yet (Idris and Pernille to size); larger text sizes, Increase Contrast,
Tinted and Clear widgets, first run and a Page are not drawn; every direction was read in Chromium 148 only, not
Safari or Firefox.

Small cleanups: `tools/ampm.py lint` flags the front-matter `time:` line of each write-up (the README and the site's
parse_when want it 24-hour, so leave it).

## Commits

This run, on personal/b: 0e18fe8613, c8ae82a554 and 3820acf5b6 (Operator: the plan, T-4240's name, the queued T-4241
note and D1 terms finding), then this note; 240f7e09b5, 216d197214, b1ab9e1526, 71caa15045, 9957342d3c (D1, Wrenna);
79c6c2eac9, a3744565f5, 1035e30fff, c8da051740, ea4c0dbf6d, 676bff2a0a, 25d71e0bcd, 25b9c4375e, 42126964d4,
428a009a57 (step 5, Ines); e55393b480, 1ee56bbbe0, 44b647eba8, 108b82e2ef, a04b2e62d6, f2fcb3ee96, 64ceff7458,
bd9fc5fd2c (4A, Maren); 34056fc1a4, 25d5c99d7e, 0fb8165560, e7e555082e, 0641f7843a, e091fe64ec, ff59117e54,
a5bd98f993, 3be648c363, abb36a49ec, 3f8dc406d6, 33bd1b9f47, 3ec530cbba (4B, Maren); f46470f420, 685d1c8dd7,
e4fbbd1fd9 (4C, Maren, not final). Landing rebases them onto main under new hashes (`git log --grep T-4127 main`).

## Investor additions (5:22 and 5:23 PM ET 11-12)

Both are carried into `00-plan.md`'s run rules (the documentation part, steps D1 and D2); their exact words are in
log/<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>.md (2026-11-12 5:22 PM, 5:23 PM).
{% endraw %}

</div>
