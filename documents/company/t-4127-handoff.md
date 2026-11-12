---
layout: "default"
title: "T-4127 handoff before the Fable limit (Operator, 15:5x 11-12)"
section: "documents"
description: "The Restructuring&#x27;s third run on account a: restarted 15:39 11-12 after the 15:30 reset, paused 15:47 by the pause file (T-4128): &quot;the 5-hour row at 66% burns 8.112%/min: 4.1 min to its limit, one wrap-up is 4.6 min\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4127-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/T-4127-handoff.md</code></span></div><h1>T-4127 handoff before the Fable limit (Operator, 15:5x 11-12)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The Restructuring's third run on account a: restarted 3:39 PM 11-12 after the 3:30 PM reset, paused 3:47 PM by the pause
file (T-4128): "the 5-hour row at 66% burns 8.112%/min: 4.1 min to its limit, one wrap-up is 4.6 min (pause line
53.1%)". Every agent stopped at its next tool round and committed; nothing was lost and nothing is loose. Read
`documents/restructuring/00-plan.md` and `work/prompt.md` first, then this note.

## Done

- Run plan updated for this run (step 2 split into 2a Ines and 2b Pernille, so the audit finishes sooner).
- 1a (Idris), `work/01a-platform-limits.md`, 1,339 words: all six sections written (WidgetKit, Pages, iMessage,
  Shortcuts and background, Sources, Questions). Marked [recalled]: the iOS sandbox wording, what a Messages extension
  cannot do, `LongRunningIntent` details, Background Tasks in iOS 27, an app-owned helper process, the 30 MB widget
  figure. Nothing measured.
- 1b (Wrenna), `work/01b-review-and-marketplace.md`, 2,071 words: sections 1 to 3 written (review and agreement points
  with quotes and risks, marketplace needs, the three audiences). Found: the guidelines PDF and the live page have the
  same wording; the live licence agreement is newer (October 29 against October 13) but 3.3.1(B) is identical and
  bars a storefront for "other Applications" ("other code" appears only in the learning paragraph).
- 2a (Ines), `02-audit.md`, 2,496 of 3,500 words: front matter, model and commit line (read at 765f0785d8), what the
  plan, state and board say, positioning, founder decisions 1 to 10, every ADR.
- 2b (Pernille), `work/02b-code-and-design.md`, 1,039 words (read at 765f0785d8): sections 1 to 3 (what exists,
  architecture, navigation and design). Three findings so far: nothing is proven on a phone (the only device record is
  a failure, T-3783 open); a project is three copies joined by scanning source for `Widget("id")`, with five
  identities, no assets and no manifest of outputs; the approved layout (tab bar, Projects home, preview pane) is
  unbuilt and the app opens on an editor.
- S (Odalys): read only, no file changed. Her plan is under Next step.

## In flight

Nothing running. No commit ends "final"; the steps below pick up from the committed drafts.

## Next step

1. 1a (Idris): cut about 40 words to stay under 1,300, then a commit ending "final".
2. 1b (Wrenna): section 4 Sources (keys S1 to S6 are already cited in the text), section 5 Questions with
   recommendations, then cut from 2,071 to about 1,600 words; commit ending "final". The live Mini Apps Partner
   Program page is unread (the PDF of 10-25 only); hosting costs, the CloudKit quota, the DMCA agent fee, COPPA, GDPR
   and CCPA lines are marked "recalled" and want a web check.
3. 2b (Pernille): section 4 (one manifest and identity; components from the premades' read/draw split; permissions
   enforced at the device router; a tab shell) and section 5 (device proof, imported code's trust model, extension
   memory unmeasured), about 460 words; commit ending "final".
4. 2a (Ines): the numbered questions with recommendations, "More intuitive, and room for the Builder", "Risks,
   ranked" (about 700 words), then fold 2b into "Where the app stands (from 2b)" (about 300) with cuts to stay under
   3,500; commit ending "final".
5. S (Odalys), ready to build: a new FOLDERS entry "restructuring" in tools/site/documents.py, its loader called
   after load_library; pages at `/documents/restructuring/<name>.html`, the mock-ups' index at
   `/documents/restructuring/04-mockups/`; relative links get relink tokens before the scrub (delink drops them);
   mock-up files go through site.copy of scrubbed text (Site.write would rewrite their clock times); refusals listed in
   the folder's held list with the reason; test beside tests/site_documents_test.py. Operator's answers to her three
   open points: (a) strip_media holds mock-ups until a creative approval (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>), but the Investor asked for the whole
   result to show under Documents (an Investor #41 c6815915432), so these publish, each page marked "proposal, not
   approved"; (b) rule 42: the Operator reads 02-audit.md before it lands and HOLD stays the switch, no automatic
   hold; (c) keep the "Questions for the Investors" sections here: the questions are what these documents are for.
6. Then the plan's chain: 1 (merge), 3, 4A to 4C with 5, 6, and the #41 link.

Pacing, measured this run: five xhigh Fable agents burned about 8% of account a's 5-hour row a minute (66% eight
minutes in), so the pause line sat at 53%, half the window kept for the wrap-up. Fewer agents at once (two or three)
spend the same total but let the pause line sit much higher, so more of each window does work. The Apple fetch tool's
day <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> (12 pages) was reached on 11-12; it is fresh on 11-13.

## Commits

765f0785d8 (plan), 663d85081c, 62209cced5, 333f73bb8f (2a), b0d4ae5d2e, 3f4ca15744, e2423e22ad, b4ea45bd85 (2b),
51a966075e, edcb7de30b, 2aed0887e5, 3b8cf24453, 0551cffe34 (1a), d7246eca5c, 76483ec93c (1b). Two commits carry
another worker's email under the right name (663d85081c, d7246eca5c); not amended.
{% endraw %}

</div>
