---
layout: "default"
title: "Review of d0c4f506: T-4795, the showcase plan weighed against the Builder-first and Developer mode rulings"
section: "documents"
description: "Pass with fixes. Every Fix and Done when item on the T-4795 line is met, and the quotations are exact. One Medium: the T-4673 row and its chair line say Day phases takes nothing from the Builder, but Pernille&#x27;s lane\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4795-d0c4f506-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t4795-d0c4f506-pernille.md</code></span></div><h1>Review of d0c4f506: T-4795, the showcase plan weighed against the Builder-first and Developer mode <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span></h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5469, Commandment 13). Author: Ines. Reviewed: T-4795's two commits to
[`ops/plans/T-4672-showcase-premades.md`](../company/t-4672-showcase-premades.html): 69770633cc (11-19 4:50 AM, s0 citations, the s8 weighing table, three priority
moves, the T-4673 chair line, the corrected date effect) and d0c4f50670 (11-21 4:04 PM, the re-check at that day's board,
T-4766 and T-5000 weighed, the release range, the T-4704 slot-day correction), plus their <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox entries. Sources
read: the T-4795 board line, `log/rulings.md` (the 2026-11-16 11:26 PM and 11:37 PM entries, and the 2026-11-18 6:23 AM
an Investor #325 entry), `ops/board.md` at d0c4f506, `ops/board_notes/T-4673.md`, `T-4704.md`, `T-4705.md`, `T-4706.md`,
`ops/state.md` line 6, the `release` and `release-goal` rows of `ops/milestones.json`, the charter's Mission
(`rules/lookup.py "Mission"`), [`ops/plans/pywidget/plan.md`](pywidget-plan.html)'s 11-17 1:18 PM chair note, and
[`pywidget/docs/design/premade-inputs.md`](premade-inputs.html) s0 at the line's Base (d8d5b41f4835) and at d0c4f506. I read the commits and
the plan, not the author's memory or reasoning. Plan line numbers are d0c4f506's; board line numbers are
`ops/board.md` at d0c4f506; "rulings:N" is line N of `log/rulings.md`. The T-4793 section (s4.3) is another reviewer's and is not read here. Date: 2026-11-21.

d2e39f4096 has the same patch as 69770633cc (`git patch-id` 0570d2bc6d for both); 69770633cc is the one that is an
ancestor of d0c4f506, so the plan describes what landed. The only later commit to the plan (e29cc78eff, T-4793)
changes s4.3, not s0 or s8.

## Checks run

Host only, read-only; no Xcode.

- Each quotation in s0 (plan:24-32) and s8 (plan:374-379, 417-419) against `log/rulings.md:2645` and `:2648`
  (c6938306456) and `:2785` and `:2788` (c6938494530), word for word.
- `grep "\] T-NNNN " ops/board.md` at d0c4f506 for every line the weighing names: T-4673, T-4704, T-4705, T-4706,
  T-4688, T-4477, T-4478, T-4550, T-4553, T-4554, T-4556, T-4766, T-5000, T-5001, T-4202, T-4203, T-4189, T-4192,
  T-4186, T-4187, T-4712; T-4703 and T-5432 in `log/board-archive.md` and the board.
- Every open Maren line on the board at d0c4f506 (to test "no open Maren line is IDE, Builder or Developer mode work").
- `ops/plans/T-4266-release-range.py` for T-4704 (no match), the release row and state.md's Target for the dates.
- `tools/board_tick.py --help` (where `add` puts a new line) and `tools/dispatch.py:325` (how the queue ranks).

## What holds

- **Fix, part 1: both rulings cited in s0 and s8.** s0 cites c6938306456 at plan:24-29 and c6938494530 at plan:30-32;
  s8 cites both at plan:375-378 and again at plan:417-419. The line's Done when, `file: ... "c6938306456"`, is met.
- **The words are exact.** The s0 quotation of c6938306456 (plan:24-28) is the Investor's text at rulings:2645 from
  "the pre-made widgets are" to "that we are promising", unchanged. Its Effect quote, "Premade work is sized to that
  role; where premade polish and IDE or Builder work compete, the IDE and Builder go first." is rulings:2648's last
  sentence. "we should prioritize building a Developer mode so that Pro widgets can be tested moving forward" is
  rulings:2785, and "Build a Developer mode next, as a priority" is in rulings:2788. Times (11:26 AM and 11:37 PM ET 11-16)
  match the entry headings at rulings:2644 and :2784.
- **Done when, part 2: premade-inputs.md s0 keeps its build order.** The twelve-item "new set, in build order" is the
  same list in the same order at d8d5b41f4835 and at d0c4f506 (Day phases, Habit tracker, Focus timer, Next 24 hours,
  ... Pattern of the day). Neither commit touches that file, and plan:436-437 says so truly.
- **Priority claims match the board.** T-4673 is open, Pernille, P1, at board:602. T-4704, T-4705, T-4706 are open at P2
  at board:618-620, in the set's order, each with an 11-19 T-4795 note in its notes file. T-4688 is Idris, P1, at
  board:604; T-4477 is P1 at board:321. T-4202 (board:152), T-4203 (:153), T-4189 (:129) and T-4192 (:163) are
  Pernille's P1 lines above T-4673. T-4703 is ticked 2026-11-18 3:51 AM, f32bea8ad4 (board-archive:4447). T-4766
  (board:617) and T-5000 (board:675) are Maren, P1; T-5001 (board:677) is Maren, P2. The re-check's line numbers
  (602, 604, 618 to 620) are right at d0c4f506.
- **The three moves are judged right.** T-4704 and T-4705 are Idris's slot work and would take it from T-4688 and phase
  B; T-4705 and T-4706 need T-4556, a Pages step (board:422), so they cannot run ahead of the Builder and Pages anyway.
  Moving them to P2 is what c6938306456's Effect asks.
- **The T-4766 and T-5000 weighing (d0c4f50670) holds.** Both are premade design lines on Maren's lane; no open Maren
  line is a phase B step (T-4181 to T-4192), a Builder or Pages step, or T-4688, so neither takes anything the ruling
  ranks first. (One sentence in that paragraph is not exact; L2.)
- **The release range.** plan:428-429's "likely Sat 2027-07-17, range 2027-04-07 to 2027-12-11, after T-5432 on 11-21"
  matches `ops/state.md:6` ("+2 days 11-21, Idris's check of the Foundations and Pages weeks, T-5432") and the
  milestones `release` row; T-5432 is ticked (board:460). `T-4266-release-range.py` names no T-4704, as plan:432 says.
  One day is under an Investor #325 c6977134306's threshold (rulings: "more than two weeks, or past either end of the
  range"), so not moving the date for it alone is within that ruling, and the d0c4f50670 correction owns the 11-19
  promise that was not kept, with a note on T-4704 asking Idris to size the day (applied: `ops/board_notes/T-4704.md`).
  On the charter, see I1.

## Verdict

**Pass with fixes.** Every Fix and Done when item on the T-4795 line is met, and the quotations are exact. One Medium:
the T-4673 row and its chair line say Day phases takes nothing from the Builder, but Pernille's lane carries open Pages
work (T-4550) and her Python share of the Builder (T-4477). The placement holds on today's board, but the plan sets no
rule that keeps it so when a Builder step opens. Two Lows, one Info. One fix line for Ines covers M1, L1 and L2:
**T-5489** ("Put Day phases behind the Builder's Python steps", P1, part of T-4672).

## Findings

### M1. T-4673's row and chair line say it takes nothing from the Builder; Pernille's lane carries Builder and Pages work

plan:387 says T-4673 competes "Not with Developer mode or the Builder (Idris's work; phase D has not started)", and the
chair line (plan:399-400) gives as a reason that "it runs on Pernille's lane, not Idris's slot, so it takes nothing from
Developer mode or the Builder". Three things on the record say otherwise:

- c6938306456's Affects line (rulings:2647) sets the IDE against "the Builder and Pages (phase D, ADR-008)", so Pages
  is part of what goes first. T-4550, "Python contract and action run for widget buttons", is Pernille, P1, "step of
  T-4478 (Pages phase, beside the Xcode slot)", open at board:417.
- T-4477 is "Idris with Pernille" (board:321). Its steps include "the block format, catalog and compiler in the app's
  own Python" and "premades as blocks", with "Idris for the Python" as reviewer, so the Python steps are mine.
- The plan's own T-4706 row (plan:391) counts "her share of the Builder (T-4477 is Idris with Pernille)" as
  competition, and the 11-19 note on T-4706 says P2 "keeps it behind Pernille's phase B and Builder lines". The same
  lane cannot compete with the Builder for T-4706 and not compete for T-4673.

Today's placement survives this. T-4550 (board:417) stands above T-4673 (board:602) at the same P1, and the queue ranks
by priority and then board order (`tools/dispatch.py:325`), so T-4550 gets my time first. But the re-check (plan:420-421)
lists only my phase B lines above T-4673 and leaves T-4550 out. And no rule covers the next step: T-4477's steps are
"each added as its own line when it starts", and `board_tick.py add` puts a new line `--before` a heading or `--end`,
so a Builder Python step opened later at P1 would most likely land below board:602, and T-4673 would take my time
ahead of it, which is the reverse of the ruling's Effect. The plan writes that rule for Maren (plan:396 and :427: "if a
design line for the IDE, Builder or Developer mode opens on her lane, it goes first") but not for me.

Fix: in the T-4673 row and the chair line, say that T-4673 shares Pernille's lane with Pages work (T-4550) and with her
Python share of the Builder (T-4477); add T-4550 to the re-check's list of lines above it; and give Pernille's lane
the same rule as Maren's: a Builder or Pages step that opens on her lane goes ahead of T-4673 (added above it, or
T-4673 moved below it). Board: T-5489.

### L1. The Simulator "yield" to Developer mode is a note, and board order says the opposite

The chair line (plan:402-403) and the 11-19 note on T-4673 say its Simulator turns through `tools/xc.sh` "yield to
phase B and Developer mode runs when both wait". Nothing makes them yield. T-4673 (board:602) sits above T-4688
(board:604) at the same P1, so by the plan's own queue rule ("P0 first, then board order within a priority",
plan:382-383) Day phases ranks ahead of Developer mode, and the xc.sh slot lock is held by whichever job takes it first.
The re-check reads T-4704 to T-4706's place against line 604 (plan:422) but does not note that T-4673 is above it.
Moving T-4673 below T-4688 costs nothing, since my phase B lines above it decide my own order anyway. Alternatively,
the plan could say how the yield is carried out. Board: T-5489.

### L2. "Her open lines are site, test and premade design lines" leaves out two P2 lines

plan:426-427. At d0c4f506 Maren also holds T-4895 (board:444, P2), which changes the IDE's Console note in
`ios/App/Runtime/_pywidget_runtime/runner.py:481`, and T-4999 (board:674, P2), the When tapped link screen's title
(ADR-011's tap choices, Foundations). Neither is a phase B, Builder, Pages or Developer mode step as the plan defines
them (plan:381-382), and both are small copy fixes at P2, so the conclusion that T-4766 and T-5000 stay P1 is right. But
the sentence describing her lines is not exact. Say "no open Maren line is a step of phase B, the Builder, Pages or
Developer mode", or name the two. Board: T-5489.

### I1. The range agrees with state.md and milestones.json, not with the charter's words; already tracked

The charter's Mission says "range early April to late November 2027". The plan's 2027-04-07 to 2027-12-11
(plan:428) runs past that. It agrees with `ops/state.md:6` and the milestones `release` row, which are the dated
records, and the gap is already with the Investors: state.md:6 records the charter Mission line proposal (#309, re-cut
7af7f3fbe3) waiting on an approve, and the milestones `release-goal` row explains the same. This is not T-4795's to fix,
and the company may not edit the charter (Commandment 59). No board line.
{% endraw %}

</div>
