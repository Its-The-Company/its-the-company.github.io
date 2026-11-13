---
layout: "default"
title: "The Restructuring (T-4127): run plan"
section: "documents"
description: "Kept current by the Operator at each step; every step commits its own files by path on its lane&#x27;s branch (personal/a, or personal/b when account b runs it) with the ID first. Hashes cited here are the commits as made on\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/restructuring/' | relative_url }}">← The Restructuring</a><a href="{{ '/documents/restructuring/00-plan.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Restructuring</span><span>Day 23 · Fri Nov 13, 12:19 AM ET</span><span><code>documents/restructuring/00-plan.md</code></span></div><h1>The Restructuring (T-4127): run plan</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Kept current by the Operator at each step; every step commits its own files by path on its <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s branch (`personal/a`, or `personal/b` when account b runs it) with the ID first. Hashes cited here are the commits as made on that branch; landing rebases them onto main under new hashes (`git log --grep T-4127 main`).

- Ask: an Investor #41 c6815915432 (12:54 AM ET 11-12), the prompt in #41 c6815645150 (edited 12:46 AM ET), with the
  Investor's five changes: concurrent agents on Fable 5.2 (claude-fable-5-2) at xhigh wherever a step doesn't need the
  one before it; web reading allowed and encouraged; frequent progress posts on #41; mock-ups need no Investor
  instruction (several options for review, nothing adopted without "approve"); the complete result viewable under
  Documents. Checkpoint after every step and pause cleanly near the Fable limit (c6815964526, 12:57 AM ET).
- Where it runs: account a's lane worktree (`[local folder]`, branch `personal/a`), not the main
  folder the prompt first named: the Operator note of 02:4x 11-12 moved it here so the lane's pause watch (T-4128)
  covers it. Every step commits at once, so the lane's <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">park</span> step never finds loose files. Account b's lane worktree (`[local folder]`, branch `personal/b`) carries it whenever account a is at its limit and b has room (an Investor #41 c6841572370, 9:00 PM ET 11-12); the sixth run is there.
- Where it writes: `documents/restructuring/` only (this folder), plus Apple pages saved to `research/inbound/` under the
  10-26 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>. No app code, no ADRs, no board lines, no Handbook, no `creative/approved.md`.
- Phase stops: the prompt stops after each phase for the Investors' answers. The Investors asked for the run to be
  completed in one go, so each phase lists its numbered questions with a recommended answer, the next phase works
  from those recommendations, marked "working assumption", and phase 6 gathers every one as a decision. The mock-ups
  stop at round 1 (three directions); round 2 waits for the Investors' pick.
- Commit read: phase 2 states the commit it read (app work keeps landing). Run started at f9c19ea885.
- Saving as it goes (an Investor #41 c6824162128, 7:54 AM ET 11-12): every agent writes its draft into its own file
  section by section and commits that file by path at least every 10 minutes, so a pause or a usage limit loses
  nothing. Restarted 8:3x AM ET 11-12 at c520811fbe after the 3:14 AM ET pause (the three drafts of 3:1x AM ET were never committed).
  Stopped again at 8:39 AM ET at account a's 5-hour limit with the plan and the WidgetKit part of 1a committed (df20e409ae).
  Restarted 3:3x PM ET 11-12 at bb2ee510e7 after the 3:30 PM ET reset, from those drafts. Step 2 is split in two so it runs
  faster: 2a (Ines: plans, ADRs, research, board) writes [`02-audit.md`](02-audit.html), 2b (Pernille: the code, the app guide and the
  design files) writes [`work/02b-code-and-design.md`](02b-code-and-design.html), which 2a folds in. Paused 3:47 PM ET by the pause file (five agents
  burned about 8% of the 5-hour row a minute); every draft committed; ops/plans/T-4127-handoff.md says what is left.
- Two at a time (an Investor #41 c6836228832, 4:19 PM ET 11-12): from the fourth run on, at most two Fable 5.2 agents
  run at once, the two steps that unblock the most first (the phase 2 audit, then phase 1's App Review part).
- Both accounts, audits wait (an Investor #41 c6841419857, 8:50 PM ET 11-12): the Restructuring is finished before the
  queue audit resumes, using both personal accounts. Fourth run started 8:58 PM ET 11-12 on account a after the 8:30
  PM ET reset, at a7f4eee031, from the 3:47 PM ET drafts. Paused 9:16 PM ET by the pause file (three slots on account a burned 3.2 to
  4.1% of the 5-hour row a minute); 1b, 2a and 2b final; ops/plans/T-4127-handoff.md says what is left.
- Fifth run (an Investor #41 c6842238940, 9:43 PM ET 11-12: "Run until the 5 hour usage is completely done, so long
  as the work can be safely passed to the next worker"): started 10:2x PM ET 11-12 on account a at 7ad7c8fb1f, from the
  9:16 PM ET drafts, two workers: step 1 (Wrenna) and step 3 (Ines). Step 3 reads phase 1's two final parts and the 13
  merged questions directly rather than waiting for step 1's sections, so phase 3 started at once. Both final by
  10:38 PM ET; paused then by the pause file (the 5-hour row at 95%, burning 1.7 to 2.8% a minute); nothing was in
  flight. ops/plans/T-4127-handoff.md says what is left.
- Sixth run: started 11:3x PM ET 11-12 on account b (its window had reset; account a was at its limit) at cc60253b04,
  from the 10:40 PM ET handoff. Three Fable 5.2 workers at once (c6841598799, more than two while usage allows; back
  to two if it burns too fast, c6841609331): 4A (Maren), 5 (Ines), D1 (Wrenna); 4B, 4C and D2 follow as they report.
  D1 and 5 were final by 11:5x PM ET; D2 went to the main session on Opus as T-4240; 4A and 4B final, 4C half drawn.
  Paused 12:16 AM ET 11-13 by the pause file (the 5-hour row projected at 94.6%); every draft committed;
  ops/plans/T-4127-handoff.md says what is left.
- Documentation part (an Investor #41 c6837559986 and c6837583046, 5:22 and 5:23 PM ET 11-12): documentation becomes a
  standing step of designing each app part; diagrams of how everything in the app works (screens, the Python run, the
  widget path from script to Home Screen, storage, the extension, purchases) are drawn by code from the code itself
  (no AI images), regenerated whenever the code changes and shown on the site, in plain English. Step D1 researches
  how other software companies keep documentation and diagrams current with the code (open-source tools on public
  GitHub with their licences checked under Commandment 6, and paid services); step D2 builds the chosen free solution
  and a first set of diagrams. A paid service is a request card with its price and waits for "approve" (gate 3).
  Steps S and D2 write outside this folder (the site <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> under `tools/`, its tests under `tests/`; D2 also the
  hand-written explanations in `pywidget/docs/how-it-works/`, which 03 section 5 proposes: documentation, not code);
  nothing else does, and no step changes app code.

## Steps


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Steps, scrolls sideways" style="--tw:1138px" markdown="1">

| Step | What | Who | Needs | State |
|---|---|---|---|---|
| 1a | Phase 1 platform limits: WidgetKit, Pages, iMessage, Shortcuts and background (blank slate) | Idris | none | all six sections committed 3:47 PM ET (0551cffe34), 1,339 words; trim about 40 and mark final |
| 1b | Phase 1 App Review, licence agreement, marketplace needs, the three audiences (blank slate) | Wrenna | none | final 9:1x PM ET 11-12 (2cedc59296), 1,672 words; still recalled: the CloudKit quota, GDPR access and deletion rights; the live Mini Apps page was refused by the Apple day <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> (fresh 11-13) |
| 2a | Phase 2 audit: plans, ADRs, research, proposals, state, board, ledger; writes [`02-audit.md`](02-audit.html) | Ines | none (folds in 2b) | final 9:1x PM ET 11-12 (6a316240b8), 3,484 words, questions 1 to 9; read by the Operator (rule 42) |
| 2b | Phase 2 audit: the code, the app guide, the design files, `creative/approved.md` | Pernille | none | sections 1 to 3 committed 3:47 PM ET (b4ea45bd85); final 9:0x PM ET 11-12 (d1f87bd7e4), 1,547 words |
| 1 | Phase 1 merged: [`01-questions-and-limits.md`](01-questions-and-limits.html) (folds in 1a's last 40-word trim) | Wrenna | 1a, 1b | final 10:3x PM ET 11-12 (20865b05ee; on main 721185c210), 2,993 words; two 1a items cut to fit (WidgetKit lists nothing after June 2025; "How fresh" folded into the refresh bullet) |
| S | Documents page shows this folder (the write-ups and the HTML mock-ups) | Odalys | none | done on main as T-4230 (638e59888e), passed 9:0x PM ET 11-12 to the main session on Opus (an Investor #41 c6841572370) |
| D1 | Documentation part: how other companies keep docs and diagrams current with code; tools and services compared, licences checked; writes [`07-documentation.md`](07-documentation.html) (research half) | Wrenna | none | final 11:5x PM ET 11-12 (9957342d3c), 1,986 words: the recommendation for D2 unchanged in substance, six questions; four quotes corrected on re-reading; GitLab's and GitBook's terms bar automated retrieval, so neither is fetched again (T-4241 adds them to tools/terms_guard.py) |
| D2 | Documentation part: build the chosen generator, a first set of code-drawn diagrams of the whole app, shown on the site, regenerated on code change; finishes [`07-documentation.md`](07-documentation.html) | Odalys | D1, S (T-4230) | passed to the main session on Opus as T-4240 at 11:5x PM ET 11-12 (c6841572370), so account b's Fable room goes to phases 4 and 6; it writes the build half at the end of 07 |
| 3 | Phase 3 structure, [`03-structure.md`](03-structure.html) | Ines | 2a, 2b, 1a and 1b final (step 1's questions) | final 10:3x PM ET 11-12 (af19dceb7d; on main 65183431b9), 3,488 words, nine questions; read commit 3cc4481247 |
| 4A, 4B, 4C | Phase 4 round 1: one style direction each, five main screens, in `04-mockups/a/`, `b/`, `c/` with one `index.md` | Maren | 3 | 4A final 12:0x AM ET 11-13 (bd9fc5fd2c; inside Paper and Studio, 22 frames) with index.md; 4B final 12:1x AM ET (3ec530cbba; programmer-first workbench, 20 frames); 4C (creative-first, tiles and cards) paused 12:16 AM ET with files 1 and 2 committed (e4fbbd1fd9), files 3 and 4 and its index section left |
| 5 | Phase 5 timeline | Ines | 3 | final 11:5x PM ET 11-12 (428a009a57), 2,487 words, eight questions; 1.0 with the Builder likely late March 2027 (early February to early June); the custom block 1.25 weeks |
| 6 | Phase 6 decisions, hand-over and the #41 summary | Ines | 4, 5 | waiting on 4C (5 is final) |

</div>


## Files

- [`work/01a-platform-limits.md`](01a-platform-limits.html), [`work/01b-review-and-marketplace.md`](01b-review-and-marketplace.html): the phase 1 parts; [`work/02b-code-and-design.md`](02b-code-and-design.html):
  the code part of phase 2.
- [`01-questions-and-limits.md`](01-questions-and-limits.html), [`02-audit.md`](02-audit.html), [`03-structure.md`](03-structure.html), `04-mockups/` (with `index.md`), [`05-timeline.md`](05-timeline.html),
  `06-decisions.md`: the deliverables the prompt names; [`07-documentation.md`](07-documentation.html) and its diagrams: the documentation part
  the Investors added at 5:22 PM ET 11-12.
{% endraw %}

</div>
