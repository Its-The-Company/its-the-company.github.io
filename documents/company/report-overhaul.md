---
layout: "default"
title: "Report overhaul plan"
section: "documents"
description: "Spec: an Investor, 2026-10-26 23:06, #41 c6432739086, verbatim at the end of amendments.md. Read it, not this summary. Items 1-8 are its items 1-8. Board lines T-0370 to T-0383 are under &quot;## Report overhaul&quot;."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/report-overhaul.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 5 · Mon Oct 26</span><span><code>ops/plans/report-overhaul.md</code></span></div><h1>Report overhaul plan</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
> Saved by the Operator under #85 A (an Investor, 2026-10-26 23:16): the session's permission layer refused Ines's write of this file. Text as she drafted it.
>
> **Narrowed 2026-10-26 23:15 by the Investor (#41 c6432847087): "Don't go overboard into this request. No need to do a design study. We want improved reports, but the main priority should always be the product (pywidget)".** So item 4's references study and directions (T-0375, T-0376) are dropped: reports keep the approved site look. Items 7 and 8 (T-0380, T-0382) and the design build (T-0381) wait until after the Day 17 submission. Items 1, 5 and 6 stay, done lean. Items 2 and 3 are done within the current look. The text below is as drafted before that narrowing.

Spec: an Investor, 2026-10-26 23:06, #41 c6432739086, verbatim at the end of amendments.md. Read it, not this summary. Items 1-8 are its items 1-8. Board lines T-0370 to T-0383 are under "## Report overhaul".

Priority (Tenet 1): the alpha on Day 10 and submission on Day 17 come first. Odalys owns tools and the site, Maren owns design, I own the rules, cards and reports. Idris and Pernille's <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> take none of this, except one review by Pernille (C13). No overhaul unit is booked on Day 10. Days: Day 6 = 10-27 ... Day 12 = 11-02.

Order: items 1 and 6 on Day 6. Then design: references (Day 6), directions (Day 7), the Investors' pick, the build (Days 9 and 11). Content (item 2) is built in the current look on Day 8, so it does not wait for the pick. Item 7 on Day 9, item 8 on Days 11-12.

## Files the Investors own (they go as proposals)
- CLAUDE.md C38 (the story rule ends), C39 (new structure), C45 (word limits end), C55 (requests become issues), plus ops/prompts/evening.md, morning.md and work.md (done-note line): one proposal, T-0374. It auto-applies under c6430791389. Folded Investor <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> stay byte-identical, checked by script.
- The applier merging a PR on "approve" or A/B/C: a separate approve-only proposal.
- rules/hooks/model-guard.py, if it refuses "[report] fresh-reader": a separate approve-only proposal.
- Everything else is company-owned.

## 1. Source (T-0370, T-0371; Odalys, Sonnet high, Day 6 12:00)
- Done-note format: `(Workers, commit; ws: <workstream>) Plain: <sentence>. Evidence: <path|https>. Detail: <optional>`.
- board_tick refuses a note missing any field and names the field. Workstreams live in ops/workstreams.json (widgets, editor, Python runtime, packages, App Store, design, site, operations, research, team).
- report_facts drops the 80-event <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, every short() cut and every slice. It writes ops/report_ledger.json (every finished task, by workstream) and ops/report_commits.md.
- Done test: one test per missing field, plus mutants. The Report 7 to 8 window shows all 369 events whole. The ledger count equals the window's board ticks.

## 6. Requests (T-0372 Ines Opus high, PROPOSAL-001 card by Day 6 10:00, the rest by 18:00; T-0373 Odalys Sonnet high, 18:00; T-0379 panel Odalys Opus high, Day 8, Pernille review Day 9)
- Each card has seven parts: the decision; the options and what happens next; the recommendation and why; the default and when it takes effect; the deadline and what it blocks; evidence links; how to answer.
- tools/request_card.py lints a card and writes the issue body. The Operator posts it.
- PROPOSAL-001 goes first. It merges the $14.99 recommendation (T-0260) and the $4.99 fallback (T-0277). Then PR #71, the launch plan, and Maren's <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> items.
- requests_close: a sweep never closes a request. A request closes only when answered, withdrawn or defaulted, with a comment saying which.
- Needs-you panel: the live cards, buttons and comment box use the saved token. Without a token, readers see only the open count.
- Done test: a fresh Haiku call can decide from the card alone. A sweep fixture test passes. The panel posts exactly the chosen answer.

## 5. Writing (T-0374 by Day 6 16:00; T-0383)
- The CEO writes on Opus, in active voice, with numbers in context. Recurring features: the number, the bug, the before-and-after.
- If a report would pass the 3% cap, the Investors get a request instead of a shorter report.
- Day 6 evening is the first report under the new rules.

## 2 and 3. Content and portraits (T-0377 Ines Opus high, Day 7 12:00; T-0378 Odalys Sonnet high, Day 8 18:00)
- New files: ops/milestones.json, v1_scope.json, predictions.json.
- The page gets the full section order from the spec: contents, a sticky menu, <details> sections, a new-since-last-visit marker, tap-to-define glossary terms, and portraits beside every worker named.
- Done test: Reports 8 and 9 rebuild with every section. Zero undefined terms, zero names without a portrait. The page works with JavaScript off.

## 4. Design (T-0375 Maren Sonnet high, Day 6 18:00; T-0376 Maren Opus high, Day 7 18:00; T-0381 build by Day 11 12:00)
- References: 8 to 12, each with "what we take".
- Directions: 2 or 3, drawn by code, on Reports 8 and 9, at 390 and 1280 px, light and dark. They go out as an approval card with the references on #41.
- Default: the new content stays in the current look.
- Build done test: zero contrast fails, zero images without alt, zero outside scripts, Maren's sign-off, screenshots at both widths in both modes before every report.

## 7. Test and measure (T-0380, Odalys Sonnet high, Day 9 18:00)
- tools/fresh_reader.py: a Haiku reader answers the 7 questions. Questions 2 to 4 are graded by code, the rest by a Haiku rubric. Misses are fixed before publishing.
- Useful and Not useful buttons, and 5 metrics on Infrastructure.

```experiment
id: OPT-0xx (next free number when logged)
title: report overhaul (#41 c6432739086): source done-notes, full ledger, request issues, new report page
owner: Ines
status: proposed
legacy: no
hypothesis: done-notes written at the time of the work, a full generated ledger and request issues let a reader who has read nothing else answer the seven questions, and let the Investors decide without leaving the page
metric: fresh-reader score (of 7) per report; secondary: ledger coverage (ledger items / board ticks), unexplained terms per report, median hours from request to answer, requests defaulted, Useful share
direction: up (score, coverage, Useful); down (terms, hours, defaults)
prediction: Report 8 as published scores 3/7 or less; the first three new-format reports score 6-7/7; coverage 100% (now about 15%: 5 bullets for 33 shipped); 0 unexplained terms in generated parts, 2 or fewer in prose; median request-to-answer under 24 h
window: the first 6 reports after the page ships (Day 9 evening to Day 12 evening), against Reports 1-9 scored by the same tool
revert_rule: content and request changes stay (Investor order); revert the page design by switchback if a pre-publish check fails twice running at 390 px or with JS off, or if the report session passes its 3% cap twice (which also goes to the Investors as a request)
design: before/after on archived reports, then the live window
started: not yet
due: 2026-11-02 18:00
result: pending
verdict: pending
evidence: pending
raw_data: yes: ops/site-checks/fresh-reader/*.json, ops/report_ledger.json, report issue reactions and comments
notes: one bundle by the Investors' order; the archive scoring separates content from design only where the old reports allow
```

## 8. Archive (T-0382, Odalys Sonnet medium, Days 11-12 12:00)
- Rebuild the generated parts for Reports 1 to 9.
- Ticks from before the switch are shown as written, marked as such, with their workstream inferred and marked.
- Prose stays byte-identical.

What would make this fail:
1. Done-notes that have the right shape but are written badly. The fresh-reader test and the term count catch these.
2. The 3% cap. I measure it on Day 6 and ask the Investors before cutting anything.
3. The overhaul taking Day 10 from the alpha. Nothing is booked on Day 10.
{% endraw %}

</div>
