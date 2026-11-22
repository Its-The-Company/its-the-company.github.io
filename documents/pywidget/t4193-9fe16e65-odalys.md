---
layout: "default"
title: "Review of 9fe16e65: T-0337&#x27;s three land re-checks since 504705b48e, and T-0337&#x27;s research at 9fe16e65"
section: "documents"
description: "PASS with findings. The three commits say what is true. Each land red matches a pick I simulated against 9fe16e65, and the T-4182 hold matches the ruling and the board at the cited main. T-0337&#x27;s research still holds\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4193-9fe16e65-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t4193-9fe16e65-odalys.md</code></span></div><h1>Review of 9fe16e65: T-0337's three land re-checks since 504705b48e, and T-0337's research at 9fe16e65</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys (T-5457, Commandment 13). Authors: Wrenna (f9a797cae4, f70705a138) and Idris (8647a53840, a
<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-a session). This is the one review for this T-4193 merge, and it covers T-0337. Range: the T-4193/T-0337
commits reachable from 9fe16e655b and not reviewed at 504705b48e. That merge's review has two halves: T-0337 in
`docs/reviews/t4193-504705b4-odalys.md` and the code in [`t4193-c0e4a0f0-odalys.md`](t4193-c0e4a0f0-odalys.html) (T-5440). There are three new
commits, all on 11-21, and each adds lane-outbox board notes only:

- f9a797cae4 (12:46 PM, Wrenna): `ops/lane-outbox/a2-1795283196739139000-67969.json`, the T-0337 land red "re-checked
  on main cf1b55ec36".
- 8647a53840 (1:05 PM, Idris): `a-1795284300778120000-52056.json`, the T-0337 land red "on main 4dbf67fee0", and
  `a-1795284306048834000-53328.json`, a note on T-4182 that lane-a released its claim under the pre-comparison hold.
- f70705a138 (1:56 PM, Wrenna): `a-1795287400081562000-55226.json`, the T-0337 land red "on main dcf5aabc69".

The Records rounds drained all four outbox files (ba24dcf51b, a7824ac0c5, 961e2111bd). All four notes are on the
board at 9fe16e65: T-0337 at `ops/board.md:344` and T-4182. There is no app code, test or Xcode step in the range,
so nothing here can reach TestFlight. I also read T-0337's own research again at 9fe16e65 (unchanged since the
504705b4 review, so the checks below repeat it independently): `pywidget/docs/research/CORRECTIONS.md:385-398`,
the memo's Recall checks note (`pywidget/docs/proposals/DECISION-2026-10-26-revenue-gap.md:125-133`),
`ops/board_notes/T-0337.md`, `research/inbound/apple/index.tsv:61-65` and the five saved pages with their
`.meta.json`. I read the commits and files, not the authors' memory or reasoning. The research files are the same
at 9fe16e65 and at this branch. Date: 2026-11-21.

## Checks run

Host only: git and one small Python reader. No Xcode, since the mini is held (ops/state.md, top line).

- **The land reds are true.** Against 9fe16e65 I simulated each pick as a three-way merge with
  `git merge-tree --write-tree --merge-base c^ 9fe16e65 c` and compared the result with 9fe16e65's tree.
  8701e3c223 and 44625609eb give exactly that tree, so they pick empty. 147cd0859f differs only in
  `.claude/agent-memory/wrenna/archive.md`: one repeated "Moved from" header plus the T-0494 and T-0671 lines, which
  main already holds twice (archive.md:912-913 and :923-924). That is "a third copy" as each note says. The <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>
  ref `parked/b2/20261103-t1228-recut` (fa85dc13ae) exists. `git cherry` puts "+" on those three T-0337 commits, so
  lane_take offers them. It puts "-" on 3f7c14a718 (the old outbox note), so the notes are right to leave it out. The
  ref also carries commits for T-0259, T-0457 and T-0624 that are not empty, so "parked copy kept" is correct.
- **The cited mains are real.** cf1b55ec36 (12:08 PM), 4dbf67fee0 (12:49 PM) and dcf5aabc69 (1:55 PM) are each on
  origin/main, each an ancestor of 9fe16e65, and each older than the commit that cites it.
- **The T-4182 note is true.** an Investor's #325 c7064087072 is at `log/rulings.md:3454` (9:26 AM ET). It says "only
  resume app work when all of the remaining steps are complete". At 4dbf67fee0 (12:49 PM), all nine lines the note names
  were open: T-5431, T-5354, T-5397, T-5399, T-5256, T-5262, T-5263, T-5247 and T-5265.
- **T-0337's quotes are in the saved pages.** I removed the tags and HTML entities and counted each quoted phrase
  in its saved page. Each is there: R1's "fifteen (15) days after the end of the fiscal calendar month in which your
  enrollment is approved", the March 14, 2022 example and "Paid Apps agreement"; R2's "you can't turn it off"; R5's
  "minimum lead time of 3 weeks", "App Launch: ..." and "In Apps, select the app"; and R4's "must be submitted with a
  new app version". R4 says the IAP page is silent on the agreement. That holds: its 11 hits for "agreement" are all
  in the navigation and footer, none in the body. The guessed path in index row 62 saved a "Page Not Found" (2 hits),
  as CORRECTIONS R2 says.
- **The #64 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> (Commandment 58).** All five fetches were signed out (`signed_in: false`). Each is saved with its
  URL, its fetch time and the ruling in `.meta.json`. They are 24, 34, 17 and 23 s apart, so every gap is at least
  5 s. The sha256 prefixes in index.tsv match the files (I checked two). There is no crawl: five single pages, one
  of them a guess, and the guess is disclosed.
- **Quoted Apple text (copyright).** Each claim quotes one to three sentences, credits Apple and gives the page's
  URL. The full pages are kept only in research/inbound/, because the ruling requires the saves. There are no long
  extracts, so I have no finding.
- **Memo line references.** I checked the memo at 9fe16e65. Lines 55, 56, 63, 66 and 77, and launch-plan-draft
  lines 146 and 153, hold the recalled text that the CORRECTIONS rows cite. The memo's body is untouched since
  8701e3c, as the note says: only 8047d2f71c and a2830f3ad2 touch the file.

## Findings

No must-fix. One should-fix, filed. Three Low findings with no board line.

### M1 (Medium): the land re-check loop keeps running, and its fix cannot run under the process freeze

- Where: `ops/board.md:344`, the T-0337 line, which now carries 11 land reds, 9 of them on 11-21 and 3 of them in this
  range. The fix's line is `ops/board.md:23` (T-5437). The freeze is `ops/trim_freeze.json`.
- What happens: T-5437 (stop re-offering refs that are already empty) was added at 12:02 PM (8b51a660e6). The three
  sessions in this range ran after it was added and found the same thing again. T-5437 is a `[process]` line that
  targets `tools/`. The freeze holds both `process` and `tools/`, and T-5437 is not on the allow list. So the hand-out
  will not give it out until the freeze <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span>, and lane_take keeps offering T-0337 to every lane that finds no work.
  The 9:26 AM ruling puts the pre-comparison lines first and on their own. T-5162's land items are not on that list,
  so each of these sessions was time taken from it. The usage spent is not measured: lane metrics do not travel.
- Cause, for whoever builds T-5437: lane_take asks `git cherry`, which compares patch-ids. 8701e3c was reapplied
  as 8047d2f71 with its index rows merged, so the patch-ids differ and the commit shows "+" even though picking it
  changes nothing. A tree check gives the right answer: `git merge-tree --write-tree --merge-base c^ main c`, equal
  to main's tree, means the pick is empty.
- In the 504705b4 review this was I1, which I marked "not this review's to fix". I have raised it, because the line
  that would fix it cannot run.
- Board: a note on T-5437 (it is held by the freeze, plus the method above). The allow list holds only the Investors'
  named lines (an Investor #325 c7064786059), so adding T-5437 to it is theirs to decide, not mine. No new line.

### M2 (Medium): T-0337's dated advice for Ines still counts down to the old 12-15 release

- Where: `pywidget/docs/research/CORRECTIONS.md:391` (R1: the SBP approval must fall in a fiscal month ending by
  about 2026-11-30, "ops/state.md line 4") and `:393` (R5: nominate by about 2026-11-24). `ops/board_notes/T-0337.md`
  (line 3) carries the same dates under "For Ines".
- What happens: both dates were computed from the 2026-12-15 release, which was true on 11-02. Now
  `ops/state.md:6` says 1.0 is likely 2027-07-17. Anyone who reads the open T-0337 line and its notes today sees
  "nominate by about 11-24", three days away, for a release that is not coming. A featuring nomination sent eight
  months early is the wrong ask to put to the Investors, who own the signed-in step. The rows are honest records of
  their date, so they are not edited. What is missing is a dated line that recomputes them from the date of record.
- Smaller, in the same row: "the lag is about two to six weeks" (R1, and memo `:129`) understates the upper end. If
  approval falls on the first day of a five-week fiscal month, the adjustment starts about 50 days later, which is
  about seven weeks. Apple's own example, 10 Feb to 14 Mar, is 32 days.
- This is my own L1 and L2 from [`t4193-504705b4-odalys.md`](t4193-504705b4-odalys.html), raised. There I marked them Low and left them to "the
  next T-0337 session", with no board line. Since then, every session on T-0337 has been a land re-check (three in
  this range), and none has worked on the research. The 11-24 date is three days off. Left to that session, the fix
  would come too late, so it gets a line of its own.
- Board: T-5526 ([research], Wrenna, P3).

### L1 (Low): the lane counts in the notes are wrong

- Where: `ops/board.md:344` says "Third lane", "Fourth lane", "fourth lane" again and "Fifth lane", and T-5437
  (`:23`) says "six lanes". Only three lanes have taken it (a, a2 and a3), across 11 reds. The reports are built
  from these notes, so the counts should be the number of reds, or not given at all. Board line: none (Low). T-5437
  will end the run.

### L2 (Low): "read on main as 8047d2f71 and a2830f3ad" mislabels 44625609

- 44625609 is Wrenna's memory lesson, not part of the read. It picks empty because the lesson line is already on
  main, not because of those two commits. All 11 notes repeat the phrase. It is harmless, but it is not literally
  true. Board line: none.

### L3 (Low): R3 and R4 have not moved since 11-03

- T-0337 has been runnable since 2026-11-03, and two of its five rows are still open. In that time the line has
  drawn 11 land sessions and no research session. This is not a fault in the range; it is where the usage went.
  Board line: none, since its own line stands.

## Verdict

**PASS with findings.** The three commits say what is true. Each land red matches a pick I simulated against
9fe16e65, and the T-4182 hold matches the ruling and the board at the cited main. T-0337's research still holds:
the quotes are in the saved pages, the #64 conditions are met, and the quotes are short and credited. M1 is a note
on T-5437. M2 is T-5526. Nothing in this range goes to TestFlight.
{% endraw %}

</div>
