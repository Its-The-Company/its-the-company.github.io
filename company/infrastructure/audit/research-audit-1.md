---
layout: "default"
title: "Research audit 1 (OPS-7, #41 c6407113363 item 5)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/research-audit-1.md</code></span><span>2026-10-26</span></div><h1>Research audit 1 (OPS-7, #41 c6407113363 item 5)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Wrenna, 2026-10-25 23:10 ET. Board line "[ops] Wrenna, P2, OPS-7 research audit".

Every number below comes from `python3 tools/research_audit.py all` (test: `python3 tests/research_audit_test.py`, 33 pass), run at 23:10 ET on HEAD 656e28fb plus the working tree. The tool reads raw sources only: the run streams in ops/runs/ through ops_metrics.py's splitter (the cost unit is the governor's recorded cost_usd per run, list-price equivalent), the backtest keys and blind grade files in research/hunt/, git (through `tools/subject_letters.py --all`), and pywidget/docs/research/CORRECTIONS.md. No number is copied from a memo, verdict, diary or event line. Where a memo said something first, I say whether the recomputation agrees.

Listen to this, from the H140 verdict's own limits paragraph: "Twelve of the 14 non-earners are free apps, all 15 earners are paid." That one sentence, counted across all four backtests, is most of the story.

## 1. Measures

### 1.1 Research share of usage, per day

"[research]" is calls tagged [research]. "Process" adds any call whose description names a hunt lane (Hnn), blind grading, a grade, a backtest, a chair, a ruling, a re-code or a pitch, whatever its tag (blind grades were mostly tagged [review], chair grading [plan]). "Grading" is the part of the process whose description names grading, a backtest, a chair, a ruling, a re-code or a verdict. A run counts to the day it started (ET). 2026-10-25 is partial (to 23:10).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1.1 Research share of usage, per day, scrolls sideways" style="--tw:855px" markdown="1">

| Day | Project cost | [research] | Share | Research process | Share | Of which grading |
|---|---|---|---|---|---|---|
| Day 1, 2026-10-22 | 79.33 | 30.83 | 38.9% | 43.01 | 54.2% | 6.49 |
| Day 2, 2026-10-23 | 419.16 | 117.87 | 28.1% | 135.22 | 32.3% | 6.78 |
| Day 3, 2026-10-24 | 952.67 | 483.19 | **50.7%** | 672.33 | **70.6%** | 165.02 |
| Day 4, 2026-10-25 (partial) | 372.50 | 124.46 | 33.4% | 148.98 | 40.0% | 17.66 |

</div>


The Investors' "half of Day 3" holds on the tag alone (50.7%). Counted by what the calls did, the research process was 70.6% of Day 3's project usage, and grading (blind grades, chairs, rulings, backtests) was 165.02, a quarter of the process and 17.3% of the whole day.

### 1.2 Cost per lane

A call naming several lanes is split evenly between them.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 1.2 Cost per lane, scrolls sideways" data-n="4 5" style="--tw:729px" markdown="1">

| Lane family | Lanes | Total | Median per lane | 90th percentile | Max |
|---|---|---|---|---|---|
| Hunt lanes (H) | 267 | 744.61 | 2.03 | 5.40 | 32.62 (H205) |
| Generators (G) | 22 | 38.31 | 1.32 | 3.56 | 4.39 |
| pywidget research (L) | 16 | 19.48 | 0.69 | 2.59 | 4.91 |
| Research-process calls with no lane id | 157 calls | 197.16 | | | |

</div>


Most expensive lanes: H205 32.62, H186 13.04, H115 12.52, H185 11.87, H140 11.75, H133 10.47. H186 is the lane pywidget came from; its chair ruling is B- (rulings-v2.md, gradebook row). The Investors chose a B- concept, so the letter did not decide the one decision that mattered. 197.16 of research cost (157 calls) carries no lane id and cannot be tied to an output; for pywidget, most L-doc work carries no L id in its call description either (only 16 L ids appear).

### 1.3 Backtest validity, recomputed

Final letter against the key's outcome (earner on a US chart on 2026-10-24, or matched stale non-earner). AUC is the chance a random earner's letter beats a random non-earner's (ties half; 0.5 is a coin flip). The 95% interval is a bootstrap (2,000 resamples, earners and non-earners resampled separately, seed 1). "Price only" is the AUC of the key's Price column alone (paid = 1, free = 0); cards carry no price, but a card can read like a paid tool.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 1.3 Backtest validity, recomputed, scrolls sideways" data-n="5 7" style="--tw:1305px" markdown="1">

| Backtest | Rubric | Cards (earners/non) | Paid share, earners / non | Price-only AUC | Grader | Final AUC | 95% interval | AUC within free apps |
|---|---|---|---|---|---|---|---|---|
| H89 (H95a-b) | v1 | 12 / 12 | 50% / 8% | 0.71 | Ines | **0.45** | 0.24-0.67 | 0.33 (6/11) |
| | | | | | Maren | **0.50** | 0.28-0.74 | 0.40 (6/11) |
| H89b (H95c-d) | v1 + Store demand | 18 / 13 | 67% / 8% | 0.80 | Ines | 0.78 | 0.61-0.93 | 0.62 (6/12) |
| | | | | | Maren | 0.69 | 0.50-0.86 | 0.68 (6/12) |
| H110 (H89 + H89b re-graded) | v2 | 30 / 25 | 60% / 8% | 0.76 | Maren | 0.68 | 0.54-0.82 | 0.53 (12/23) |
| | | | | | Idris | 0.70 | 0.57-0.83 | 0.52 (12/23) |
| H140 (fresh cards) | v2, graders' judgment letter | 15 / 14 | 100% / 14% | **0.93** | Maren | 0.83 | 0.66-0.96 | none (0 free earners) |
| | | | | | Wrenna | 0.87 | 0.70-0.98 | none |

</div>


The recomputation agrees with the memo figures the Investors quoted (v1 0.45 / 0.50) and with the H140 verdict (0.83 / 0.87). What the memos did not set beside them:

- **The price column alone beats or matches every grader on every set after v1.** On H140 it is 0.93 against the graders' 0.83 and 0.87. Within paid apps the backtests cannot speak: there are 1 or 2 paid non-earners per set.
- **Within free apps, where there are enough cards on both sides (H110: 12 earners, 23 non-earners), v2 is a coin flip: 0.53 and 0.52.**
- Every interval is wide. H89's runs from 0.24 to 0.67; H140's lower bounds (0.66, 0.70) are the only ones clear of chance, and that set is the one most confounded by price.
- H140's leak gauge ("N of the top 10 released before", `tools/backtest_marks.py --h140 --cards`) recomputes at 0.43, as the verdict said: the letters were not riding that line. They may be riding price.

### 1.4 Agreement between blind graders

Final letters on the 12-step scale (D- to A+). Quadratic-weighted Cohen's kappa and Krippendorff's alpha (interval) agree to two places on every set.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 1.4 Agreement between blind graders, scrolls sideways" data-n="3 4 5" style="--tw:905px" markdown="1">

| Set | Graders | Cards | Exact | Within one step | Kappa (quadratic) | Alpha (interval) |
|---|---|---|---|---|---|---|
| H89 (v1) | Ines / Maren | 24 | 18 | 24 | 0.893 | 0.895 |
| H89b (v1 + SD) | Ines / Maren | 31 | 17 | 29 | 0.734 | 0.737 |
| H110 (v2) | Maren / Idris | 55 | 37 | 47 | 0.883 | 0.884 |
| H140 (v2 judgment) | Maren / Wrenna | 29 | 14 | 23 | 0.808 | 0.809 |
| All backtests pooled | | 139 | 86 | 123 | **0.869** | **0.870** |
| Lane blind pairs pooled (20 pairs, H113-H149) | | 66 | 24 | 60 | **0.648** | **0.651** |

</div>


**Truly blind?** Backtest pairs: each grader's call read neither the key nor the other grader's file before committing (the transcript scan in 1.5 finds no such read on H95, H110 or H140). But both graders read the same cards, so a shared cue on a card (wording that sounds like a paid tool) lifts agreement and AUC together. Lane pairs are blind to each other's letters, not to the author: the packets carry the author's lean in prose, and graders said so in their own files. So 0.65 is an upper bound on independent agreement on live concepts, and 0.87 on cards.

**Here is the shape of it.** The v1 backtest has the highest agreement of all (0.89) and an AUC of 0.45 to 0.50. Two careful people agreed with each other almost perfectly about something that did not track earning at all. Agreement is necessary and nowhere near sufficient.

### 1.5 How often blindness leaked


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 1.5 How often blindness leaked, scrolls sideways" style="--tw:960px" markdown="1">

| Measure | Count | Source |
|---|---|---|
| board_tick blind-guard refusals | 2 (both H192, 2026-10-24 23:42 and 2026-10-25 02:49 UTC) | tool results in the run streams; a third string match was a reader viewing the guard's source, not a refusal |
| Blind-grader calls (description names blind grading) | 87; 79 show their tool uses in the stream | run streams; 8 calls ran where the stream does not show their work and cannot be audited |
| Calls that displayed a forbidden file (lane note, key, other grader's file) before committing their lane | **3 of 79**, all Day 2: Maren H8/H10/H11 (`cat` of the three lane notes), Maren H12-H15 (Read of H12.md), Maren H29-H31 (`cat H29.md`) | run streams |
| Calls that handled a forbidden file without displaying it before committing (a copy to /tmp for a packet workaround, a count, an ls) | 6 (H53/H54/H69, H99, H117/H118, H136, H157, H160) | run streams |
| Lane-note commit subjects naming a letter beside a cell | 7 of 632 | git, `subject_letters.py --all` |
| Keys committed into the shared tree before the graders graded | H89-key 08:31, grades 08:47-08:48; H140-key in the same commit as the cards (76284287, 17:45), grades 18:01 and 18:04 | git |

</div>


The three Day-2 reads predate tools/hunt_blind.py and blind_packet.py; Maren's own file for H1-H5 already says those letters were "not blind". From Day 3 onward the scan finds no display of a forbidden file before a commit. But blindness held by trust, not by tools: the keys sat one `cat` away in the same working tree, and six calls handled a forbidden file before committing (copies of the lane note for hand-built packets after blind_packet.py refused, counts, listings).

What the scan cannot see: a grep of the board (the H186 leak that led to the guard), commit subjects shown in the session context, prose leans inside a clean packet, and the 8 calls whose work is not in the stream.

### 1.6 pywidget research: claims that proved wrong

`research_audit.py corrections` on pywidget/docs/research/CORRECTIONS.md: 89 table rows. 22 rows are claims in the build brief that proved wrong when a primary source was read (Idris, Wrenna, Odalys, 19:23-19:37 ET); 35 rows in upkeep pass 1 (L- and C-docs against the brief, ADRs and each other; 10 of them stale claims in my own docs); 9 from Idris's primary read of the App Review Guidelines; the other 23 are status and chair-check rows, not corrections. There is no denominator yet (claims checked), so this is a count, not a rate. Experiment R3 below builds the rate.

## 2. Why the grade failed as a measure

1. **The outcome was confounded with price, every time.** Earners were drawn from top-paid and top-grossing charts; non-earners from search results with under 20 ratings, and 92% of them (H89, H89b, H110) or 86% (H140) were free. A grader who reads "this sounds like a $5 tool" scores high on earners without knowing anything about earning. Price alone gets 0.71 to 0.93. Within free apps, v2 gets 0.52 to 0.53.
2. **v2 was tested in-sample.** method-v2.md was first committed at 10:39 ET on 2026-10-24, after both H89 and H89b keys had been read for the H95 verdict (and it named four card names, the recorded outcome leak). H110 re-graded the same 55 cards eight minutes later (10:47), and one of its two graders (Maren) had graded both sets before. H110 measures memory and fit, not validity. Only H140 was out of sample, and it failed its pre-registered marks.
3. **The outcome is not the Mission's outcome.** "Earner" meant on a genre chart on one day, often with under 20 ratings; "non-earner" meant stale and unrated. That selects on survival and price, not on $200 in 30 days.
4. **The samples are too small to decide.** 24 to 55 cards gives intervals 0.3 to 0.4 wide. Pass or fail on a pre-registered mark swung on one or two cards (by the H140 verdict, dropping two recognised cards flipped Wrenna's pass).
5. **Reliability was mistaken for validity.** Pooled kappa 0.87 looks like a sound instrument. H89 shows the same agreement with zero separation. The graders shared a rubric and the same visible cues, so they agreed.
6. **The grade became the target.** In about ten hours on Day 3 the rubric went v1, v1 + Store demand, v2, v3 wording, then the graders' judgment letter, each after a failed check on cards the authors had seen. The share of cards at B- or better rose from 1 of 24 (H89) to 12 and 15 of 29 (H140). Cost per B would have rewarded exactly that drift.
7. **The decision did not use it, and it cost a quarter of the research.** Grading was 165.02 of Day 3's 672.33 research-process cost. The product the Investors chose was ruled B-.
8. **Blindness was a promise, not a property.** Keys and lane notes lived in the same tree the blind graders worked in; the guard and the packet tool were added after leaks, and hand-built packets went around the tool when it refused.

## 3. Research-process design for pywidget

pywidget's research now answers questions that the outside world will settle: will App Review pass this build, which competitor features matter, which keywords rank, what people pay, what breaks. So research is judged by whether its claims hold when checked and whether its forecasts come true, not by a letter.

### 3.1 What counts as evidence


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 3.1 What counts as evidence, scrolls sideways" style="--tw:755px" markdown="1">

| Class | What it is | May carry a decision? |
|---|---|---|
| E1 primary | The page or file itself, saved under a `-raw/` folder with its URL and fetch time; the claim quotes the sentence | Yes |
| E2 secondary | Press quotes, search snippets, someone else's summary of a primary source; labelled [snippet] or [secondary] | Only with the label shown, and never alone on an App Review or legal-adjacent point |
| E3 paraphrase | Our wording of a source we read but did not save | No; upgrade it or drop it |
| E4 recall | What a worker remembers | Never |

</div>


Every finding is a quote with its link and a count by script from the saved raw (quote-and-count). Counts typed by hand are not evidence; my own memory file shows why (typed counts wrong more than once on Day 4, each caught by a script or a later grep).

### 3.2 How a claim gets verified

- A decision-bearing claim (one an ADR, the App Review matrix, the store page or the privacy label rests on) gets an id in its doc and a pointer to its E1 file and the quoted sentence.
- A quote check (proposed tool, R3) confirms the quoted sentence is in the saved raw file, and that the raw file is not older than the doc's stated read date.
- A second researcher re-reads the primary source for a sample of claims, from a packet that holds the claim's question and the source link but not the author's conclusion. Disagreements go to CORRECTIONS.md (append-only, as now). The correction rate per sampled claim is the quality number beside the research cost.

### 3.3 Blind review enforced by tools, not trust

- **Blind by construction.** The reviewer works in its own git worktree checked out with a sparse checkout that holds only the packet and the raw files the packet names. The lane note, the key and the other reviewer's file are not on disk for that agent. This is the worktree-per-agent fix item 3 asks for, applied where it matters most.
- **Sealed keys.** A backtest key (or any answer sheet) is committed only as a hash until both blind files are committed; a script reveals it and checks the hash.
- **Kept as they are:** blind_packet.py (but a refusal stops the review rather than inviting a hand-built copy), the commit-subject gate (`subject_letters.py --check`), the board_tick blind guard.
- **Audited after the fact:** `research_audit.py leaks` runs each session and reports forbidden displays, touches, guard refusals and subject letters beside the cost numbers.

### 3.4 What research is judged by from now on

- Forecast accuracy against outside outcomes (Brier score on dated probabilities: App Review result per matrix row, keyword rank, Day 30 sales band, review themes after launch).
- Correction rate on sampled decision-bearing claims.
- Agreement between two blind coders (unweighted kappa, `research_audit.py codes A.tsv B.tsv`) when reviews or posts are coded and counted.
- Leaks per blind call.
- Cost per verified claim, as the cost number beside those. Never cost per B.

### 3.5 If a hunt ever reopens

No letter enters a decision until a backtest passes on fresh cards neither grader has seen, with price-matched non-earners (paid apps off the charts), at least 40 cards a side, a sealed key, and an outcome closer to the Mission (sales or ratings growth in the first 30 to 90 days rather than a chart position today). Experiment R2 below.

## 4. Experiments

Each is one change, one metric, a prediction written now, a window set by sample size, and a revert rule. They are written for Pernille's ledger to import; none is in log/optimizations.md.


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 4. Experiments, scrolls sideways" style="--tw:2495px" markdown="1">

| Id | Change | Hypothesis | One metric (tool) | Baseline | Prediction | Window | Revert rule |
|---|---|---|---|---|---|---|---|
| R1 | Blind reviewers run in a sparse worktree holding only the packet and its named raw files; a blind_packet refusal stops the review instead of a hand-built copy | Leaks happen because forbidden files are on disk; removing them removes touches without raising cost much | Share of blind calls that touch or display a forbidden file before committing (`research_audit.py leaks`) | 9 of 79 calls (3 display, 6 touch) | 0 of the next 10 blind calls | The next 10 blind calls (one or two sessions with reviews) | If median cost per blind call rises more than 20% against the last 10 blind calls, or any blind call fails to start because of the worktree, revert to the shared tree plus packet |
| R2 (dormant until a hunt reopens) | Backtest with price-matched non-earners, at least 40 cards a side, sealed key | The H140 separation is mostly price | Final AUC within paid apps, two blind graders (`research_audit.py backtest`) | Not measurable (1-2 paid non-earners per set) | 0.55 to 0.70, below H140's 0.83 / 0.87 | One backtest set | If both graders reach 0.75 with interval lower bound above 0.60, the letter returns as a screen for the paid route; otherwise no letter enters any decision |
| R3 | Claim ids plus a quote check for decision-bearing claims in pywidget research docs | Claims fail on re-read because they were never tied to a saved sentence | Share of a random sample of 30 decision-bearing claims that fail a blind primary re-read | To be measured: first sample of 30 claims before the change | 10% to 25% fail before; at most half that after | Two samples of 30 claims (before and after), about one session each | If the after sample is not at most half the before share, or the check costs more than 10% of research usage in the window, drop the quote check and keep CORRECTIONS.md alone |
| R4 | A forecast ledger: every research doc that predicts an outside outcome writes a dated probability; a script scores it when Apple, the store or sales answer | Our research has never been scored against the world; a ledger makes its accuracy visible | Brier score against a base-rate forecaster | None (no forecasts recorded) | Brier within 0.03 of the base rate on the first 20 resolved (we are new at this) | Until 20 forecasts resolve (App Review from about Day 13, sales by Day 30) | If fewer than 10 forecasts can resolve by Day 20, keep only App Review rows; if Brier is worse than the base rate after 20, research stops making that kind of forecast and says so |
| R5 | Two-coder blind coding for review mining (competitor reviews now, pywidget reviews after launch), counts by script | Quote-and-count holds when a second coder, blind to the first, codes the same reviews with the same codebook | Unweighted Cohen's kappa on a 40-review sample (`research_audit.py codes`) | None for pywidget; lane blind letters pooled 0.65 (different instrument) | 0.60 or more on the first sample | One 40-review sample per codebook | Below 0.60: revise the codebook and re-test once; below 0.40 twice: that codebook's counts are reported as single-coder and carry no decision |
| R6 | No letter grades in pywidget research; evidence classes and forecasts instead | The grading machinery is cost without validity once a product is chosen | Grading share of project usage per day (`research_audit.py usage`, grading column) | Day 3 17.3%; Day 4 (partial) 4.7% | Under 2% on each of 2026-10-26 and 2026-10-27 | Two days | If a chair records a decision that could not be made without a ranking, allow one ranking for that decision, with R2's conditions stated beside it |

</div>


## 5. Limits

- Cost is the governor's recorded cost_usd split by stream messages; 8% of each run's cost on Day 3 is spread pro rata (ops_metrics stream coverage 0.923). Day boundaries follow run start times.
- "Research process" and "grading" are classified by call descriptions; a call described without a lane id or a grading word is missed, and a planning call that names a lane is counted.
- The leak scan sees files a call opened by path. It does not see board greps, commit subjects in the session context, or prose leans inside packets; and 8 of 87 blind calls do not show their work in the stream.
- Agreement on lane pairs mixes rubric versions (v2, v3, judgment) across pairs; within a pair the version is the same.
- I graded H140 myself (the Wrenna row). The recomputation is a script over committed files, and the scan of my own call finds no forbidden read, but a reader should know.
{% endraw %}

</div>
