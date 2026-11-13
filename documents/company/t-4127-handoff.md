---
layout: "default"
title: "T-4127 handoff before the Fable limit (Operator, 22:4x 11-12)"
section: "documents"
description: "The Restructuring&#x27;s fifth run, on account a, ran 22:25 to 22:38 11-12 from main at b99902435e (plus 7ad7c8fb1f, the parked run&#x27;s one leftover record), and was paused 22:38 by the pause file: the 5-hour row was at 95%\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4127-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/T-4127-handoff.md</code></span></div><h1>T-4127 handoff before the Fable limit (Operator, 22:4x 11-12)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The Restructuring's fifth run, on account a, ran 10:25 PM to 10:38 PM 11-12 from main at b99902435e (plus 7ad7c8fb1f, the
<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> run's one leftover record), and was paused 10:38 PM by the pause file: the 5-hour row was at 95% and burning 1.7
to 2.8% a minute (readings in ops/runs/personal-tick-a.log). Two workers ran, both finished and committed before the
pause; nothing was in flight. Read [`documents/restructuring/00-plan.md`](../restructuring/00-plan.html) (run rules and the step table, both current)
and `work/prompt.md` first, then this note.

## Done

- The parked fourth run (parked/a/20261112-211856-42832): its work landed on main as 464e00c005; the one record left
  behind, T-4230's name in ops/task-names.tsv (the line the rebase conflicted on), is 7ad7c8fb1f.
- Step 1 (Wrenna), `01-questions-and-limits.md`, final 20865b05ee, 2,993 words: sections 1 to 6 merged under the 13
  questions (unchanged from 349261bb52), keys P1 to P16 (platform limits) and R1 to R9 (review points). To fit, section
  1 is a short index, and two 1a items were cut ("WidgetKit lists nothing after June 2025"; the "How fresh" paragraph,
  folded into the refresh bullet). Still recalled: the CloudKit quota, GDPR rights, the sandbox facts.
- Step 3 (Ines), `03-structure.md`, final af19dceb7d, 3,488 words, commit read 3cc4481247: project model, navigation
  and first run, the Builder, the marketplace, documentation, nine questions, a maybe-later list. Open points it names:
  the Builder's custom-block option for hand-written code is new and unsized (phase 5 sizes it); the first-run screen
  is onboarding, which creative/approved.md item 2 leaves unapproved; the docs folder `pywidget/docs/how-it-works/` is
  a proposal for D2 to confirm; "an app cannot place a widget on the Home Screen" is recalled, to verify.
- Step S: on main as T-4230 (638e59888e), so D2 waits on D1 only.
- Progress posted on #41: c6842876933 (start, 10:27 PM ET) and the pause post after this note.

## In flight

Nothing. Both workers reported before the pause.

## Next step

Steps that need nothing else now (run them two at a time, or more when the account isn't shared, per c6841598799):

1. 4A, 4B, 4C (Maren, one direction each): phase 4 round 1 from `03-structure.md`, HTML/SVG in
   `documents/restructuring/04-mockups/` with `index.md`, under 15 files, every page marked "proposal, not approved";
   say plainly where a direction departs from Paper and Studio.
2. Step 5 (Ines): `05-timeline.md`, under 2,500 words, from 01, 02 and 03; it sizes the Builder's custom-block option.
3. D1 (Wrenna): trim `07-documentation.md` from 2,066 to under 2,000 words; one-line notes for DOT, UML, "vendored" and
   Docker; re-check the [W] quotes; commit ending "final". Then D2 (Odalys, Opus suits it) builds the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> and the
   first diagrams; it confirms or changes 03's proposed `pywidget/docs/how-it-works/` folder.
4. Then step 6 (Ines) once 4 and 5 are final, and the #41 link.

Small cleanups for whoever writes next: `tools/ampm.py lint` flags the front-matter `time:` line of 01, 02 and 03 (the
README and the site's parse_when want it 24-hour, so leave it), and the run notes in 00-plan.md still carry 24-hour
times in the body (3:14 AM, 8:39 AM, 3:30 PM, 3:47 PM, 8:30 PM, 8:58 PM, 9:16 PM): change them to 12-hour with ET when the plan is
next edited.

## Commits

This run: 7ad7c8fb1f (T-4230 name), 3cc4481247 and the plan with this note (Operator); 58fb0ba0f3 (a duplicate board
line, T-4237, closed in favour of T-4221); 1f1e881551, f9bae3b073, 2c2a4d0a21, 0803e4cb11, 804951f297, 75de328141,
c8a9cda034, 20865b05ee (step 1, Wrenna); 5aebb9e1b3, 2eea9a408d, f92c4c7e50, 3932e50371, b8d402c1f5, 899a1dc965,
803f9eaf33, af19dceb7d (step 3, Ines).

## Investor additions (5:22 and 5:23 PM ET 11-12)

Both are carried into `00-plan.md`'s run rules (the documentation part, steps D1 and D2); their exact words are in
log/<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>.md (2026-11-12 5:22 PM, 5:23 PM).
{% endraw %}

</div>
