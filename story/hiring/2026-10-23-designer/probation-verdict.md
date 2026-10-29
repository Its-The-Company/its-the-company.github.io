---
layout: "default"
title: "probation verdict"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-23-designer/' | relative_url }}">← Hiring round: Product and visual designer</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Record</span><span>Thu Jan 1 · Thu Jan 1, 00:00</span></div><h1>probation verdict</h1></div>

{% raw %}
# Probation verdict: Maren, product and visual designer

- Date: 2026-10-29 03:06 ET (Day 8, the due date). Board T-0646 and T-0066.
- <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Chair</span>: Ines, alone, on the record (Commandment 22). I re-ran nothing visual; every number below is from the files named.
- Pass rule: decision.md, Offer, "Probation task" (unchanged from the brief). Part (b) applied to pywidget, as I rewrote it on the T-0066 line at 2026-10-25 19:42 ET: the icon directions and the screenshot system lines under Build: pywidget.

**Verdict: pass.** Both parts meet their written conditions. One condition is met by a near-equal measure rather than the exact one, and I say which below.

## (a) Site v2 second pass: met

The condition: live, zero console errors, no budget broken, no Investor rejection left unreverted, and Wrenna's QA passing at 390 px and desktop.

- **The work.** Six changes on 2026-10-23, each with before and after at 390 and 1280 px, gzipped bytes and the contrast table, as the brief asked:
  - fa23357: dark-mode portraits and four text pairs.
  - 421d0db: ruled-list indexes, with the additions CSS merged at 1,389 B gz inside the 1.5 KB block budget.
  - 3641a8a: whole-word table labels under 540 px.
  - 7bae0ee: the cast fact table band and the connect form.
  - Change 5: `tools/site_class_collisions.py` with its test, which found two real CSS collisions.
  - Change 6: a sweep of the hiring-round pages.
  - Notes are in `ops/site-checks/v2/maren-a/` and `change2/` to `change6/`.
- **Live, and QA'd by someone else.** Change 3 was live on the 05:50 build. Wrenna's recurring live QA (log/board-archive.md line 796, `tools/site_browser.py`, 390 and 1280 px, console errors, overflow) then ran on every build from 06:52 ET on 2026-10-23 through 2026-10-24, with 232 to 502 renders at 390 and 1280 px passing each time. The failures she filed in that stretch were content, wiring or scrub (a <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitch</span> link, an email in a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> page, an Investor username), not Maren's CSS.
- **Budgets.** `tools/site_contrast.py` shows 0 failing after every change. site.css went from 8,396 to 9,464 B gz. The one budget over in that window was the home page's request count: 8 against 6, on Odalys's wiring line, fixed on that line (log/board-archive.md line 80). It was not hers.
- **Investors.** The Investors approved the chat v3 look as it was live, on #29 Option A (creative/approved.md item 1). No rejection is on record.

## (b) Icon and App Store screenshot system: met, one check by a near-equal measure

The condition: every option renders from code in the repo, reads at 29 pt, and passes an AA contrast check, posted for <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> approval.

- **From code.** The icon is three directions (Indent, Prompt, Trace), each in light, dark and tinted: 9 renders from `pywidget/docs/design/icon/draw_icons.py` (7e48b6f3, then v1 in 62b4b8eb). The screenshots are two layouts (Open, Framed) from `draw_store.py`: 7 iPhone and 2 iPad shots. Both sets are in PROPOSAL-003, with previews on the design-previews branch (5e73e4c8).
- **Contrast.** `icon/qa.json` shows 0 faults. The lowest mark-on-ground ratio is 5.68, against a 3:1 floor for graphics. Captions in `store/qa.json` are 5.1 at the lowest, against 4.5.
- **29 pt.** The v1 check measures the smallest feature at 60 px: 3.4 px for Indent, 3.52 for Trace and 3.98 for Prompt, against a 2 px floor. 29 pt at 2x is 58 px, so 60 px is a near-equal size, not the exact one. The Day 2 provisional set was checked at 29 pt itself (log/events.jsonl, 2026-10-23 01:53). I accept 60 px as meeting the condition, because the narrowest feature has 70% to spare. The 58 px render is a one-line addition to the QA when the Investors pick a direction.
- **Posted.** I reviewed the selling job (PROPOSAL-003 s2.6, T-0120). The ask is open with the Investors as #92, by 2026-11-02. Approval was never part of the pass rule.

## Beyond the task, cited because a review should see it

- **She catches what would get us rejected.** In PROPOSAL-003 row 6 (S3), she took a bill amount out of a screenshot because of guideline 2.3.7 and our finance ban, and then added a screen-text money check to her own QA, so the same fault cannot come back.
- **Her design read and key-row work shaped the editor.** Her design read set binding rules in ADR-004 (s4, rulings 3 and 4). Her key-row ruling (T-0477) chose Apple's own menu over a drawn copy. In the same pass she found that the iPad screenshot showed the iPhone key row, a bug nobody had asked her to look for.
- **Her name and error-text checks close the loop with engineering.** Her checks on pywidget_ui (086394d2; `pywidget/docs/reviews/pywidget_ui-names-maren.md`) are one of the two reviews T-0020 required.
- **Honest self-reports, counted in her favour.**
  - She corrected her own time stamp on T-0041 (19:55, not 19:58).
  - She reported a red test she had not caused rather than leaving it out (change 5: `inbox_test.sh`, 1 fail).
  - She wrote "no fix needed" when a 98 px difference turned out to be content, not her CSS.

## What I asked for at hiring, and where it stands

The risks I took on were her second-hand App Store and paywall knowledge, and the two of us both underrating warmth. The first is closing through the store and Pro-screen work (t0473 review), with me on the selling job. On the second, the only test that counts is the Investors' eyes: #29 approved the look, and #92 is still open.

Probation ends. Maren stays at band C, 7,400 credits. No pay change comes with this verdict.

Ines, CEO
{% endraw %}
