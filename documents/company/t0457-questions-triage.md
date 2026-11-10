---
layout: "default"
title: "T-0457: the seven old questions Report 10 dropped without a card"
section: "documents"
description: "The 23:53 triage was made on personal lane b2, which did not land (d73476fe3); its commits sit on parked/b2/20261103-004144-48276. This copy restores the note and card on main, unchanged. Re-checked now: #142 is open\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t0457-questions-triage.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 12 · Mon Nov 2</span><span><code>ops/plans/t0457-questions-triage.md</code></span></div><h1>T-0457: the seven old questions Report 10 dropped without a card</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-11-02 11:53 PM EST. Source: ops/questions.md is git-ignored (.gitignore line 21), so git history never held it. Its last full version is ops/archive/questions-report-7.md (committed df799ad9 with Report 8); Report 10 overwrote the live file with a five-line stub. Open issues checked first (`gh issue list --state open`, 11:40 PM): #41, #90, #133, #138, #141.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:1044px" markdown="1">

| Item | What it asked | Verdict | Record |
|---|---|---|---|
| 3 | Human legal review of API compatibility for the abandoned app's modules (brief L15) | Obsolete for 1.0 | The default is the plan: compatibility modules are 1.1 at the earliest, and ADR-001 line 79 keeps the legal review as their gate. Nothing in 1.0 needs it; it returns as a new card only if 1.1 schedules compatibility. |
| 6 | PROPOSAL-002, the seven L18 product details; the brief makes the final answers a human checkpoint | Still open: carded | Never confirmed, and no open issue asks it. Card ops/requests/PRODUCT-DETAILS-card.md, posted as #142 (approval, by 2026-12-01). It carries the current answers: premades 5 free and 7 Pro after #87 option A (#107), and "Run as widget" and the entry stepper moved to 1.1 with the preview pane (ops/v1_scope.json). |
| 7 | Whether to ask Apple about an in-app marketplace | Answered | The recommendation (ask Apple once 1.0 is approved, with a company draft; nothing now) reached the Investors on #41 c6544347824 (2026-10-31), in reply to an Investor's Explore question. T-0870 carries the staged plan. Draft: pywidget/docs/release/apple-marketplace-question-draft.md. |
| 12 | Export compliance (encryption declaration) | Answered by an open issue | Covered by #138 question 2 (options C, D, E; no default). Not asked twice. |
| 13 | Thanks for the License Agreement PDF; changed recommendation on the pip question | Obsolete | It asked nothing ("nothing to answer unless you disagree"). The <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> sits in ADR-006 s12.6, and "Install from file" has since been cut to 1.1 (ops/v1_scope.json), which overtakes its "1.0 stretch" line. |
| 14 | App Store Connect entries only the Investors can give | Part answered, rest deferred by the Investors | Seller name and licence answered on #98 c6487087605 (enrolled as an individual; Apple's standard licence). The Investors asked for the rest nearer launch: #98 c6564242390 and #108 c6564258788 ("open another issue when we are much closer to launch"). Not carded now; board line T-1216 (queued from this <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>) sends one card for support contact, copyright owner, App Review contact and release setting by 2026-11-24. |
| 16(b) | "Say this on #70 too": the arXiv correction (32 reads, not 4) | Answered | Posted on #70 c6409545424 (2026-10-26 2:15 AM ET); #70 closed 2026-10-26. |

</div>


Issues opened: #142 only.

## Re-landed, 2026-11-03 8:00 PM EST

The 11:53 PM triage was made on personal lane b2, which did not land (d73476fe3); its commits sit on <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>/b2/20261103-004144-48276. This copy restores the note and card on main, unchanged. Re-checked now: #142 is open; an Investor answered part of it on 2026-11-03 (c6605918154, who 1.0 is for) and the company replied with option-B costing (c6606927330), so item 6 is in progress on its card. The cited comments #41 c6544347824, #70 c6409545424, #98 c6487087605 and c6564242390, and #108 c6564258788 all read as quoted above. T-1216 is added to the board now, held until 2026-11-17 so it waits for launch as the Investors asked. No new issue opened this run.
{% endraw %}

</div>
