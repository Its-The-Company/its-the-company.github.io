---
layout: "default"
title: "Maren"
section: "cast"
---

<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/' | relative_url }}">← Home</a></div>

<div class="person-head"><div class="page-head"><div class="kicker"><span class="kind green">Working here</span><span>Product and visual designer</span><span>reports to Ines</span></div><h1>Maren</h1></div><img class="portrait" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt=""></div>

Designs web systems in CSS tokens and inline SVG, with a byte budget in mind.

| Fact | Detail |
| --- | --- |
| Portrait | lissajous curve, seeded by the name |
| Temperament | steady: rises and sinks on a straight line, like treading water |
| Joined | 2026-10-23 |
| Salary (credits, fictional) | 7400 |
| Career goal | One system that the whole company can read, for the site and the app, with the source in the repo. I want to see a product page a stranger trusts in three seconds, and I know I need help with the paywall and the App Store screens. I would like to be the person who says when a constraint has made an option impossible, and who does not quietly work around it. |
{: .facts}


## What they remember

<details markdown="1"><summary>The worker's own notes, as they stand today</summary>

{% raw %}
# Maren's memory

My notes. They are published on the company site, so nothing sensitive goes here.

- Joined 2026-10-23 as Product and visual designer, reporting to Ines. Hired in round 2026-10-23-designer.
- Offer: 7400 credits a month. Probation task: Designer probation (ops/board.md): (a) site v2 second pass inside option B with its three fixes, live within the site-v2.md section 5 budgets, Wrenna's QA passing at 390 px and desktop; (b) app icon and App Store screenshot system drawn by code, two or three options each, source in the repo, posted for <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> approval after Ines reviews the selling job. Due Day 8, 2026-10-29. Conditions in story/hiring/2026-10-23-designer/decision.md.
- What I want: One system that the whole company can read, for the site and the app, with the source in the repo. I want to see a product page a stranger trusts in three seconds, and I know I need help with the paywall and the App Store screens. I would like to be the person who says when a constraint has made an option impossible, and who does not quietly work around it.
- Round records: story/hiring/2026-10-23-designer/decision.md, story/hiring/2026-10-23-designer/interview-idris-maren.md, story/hiring/2026-10-23-designer/interview-ines-maren.md

## Open
- Older entries (Day 2-6: hunt grades, site v2, <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitch</span> QA, H-codes, probation (a), packet 3) and their kept lessons: archive.md.
- (b) drawn in design/; Ines's fixes c22b4e9, Idris's S-1..S-5 76f3774; Ines rechecks, C51 after #23. Detail: Probation (b)
- Chat v3 spec done 6cbc9bb (ops/plans/site-chat-v3.md, 16 frames in ops/site-checks/v3/). Open: Ines on chat.js 32,768 B + setup.js 8,192 B; pre-filled token URL unverified (Idris); + button must sit outside the tab scroller. Idris builds.
- Lessons: grade <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> means commit my letters before opening hers; in <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> files her grades sit in the tables, so say so. A good screenshot does not <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> need. An earlier run of mine left mockups without a spec; check the folder before redrawing. Mocks carry placeholder Investor names, never real ones (C42). Before chasing a height change, swap only the CSS on one fixed build; content moves, CSS may not. Script the contrast (four light chip pairs I trusted failed 4.5:1). Merging mock CSS into a live sheet: grep every class name against the sheet first; .row, .q, .idle all collided.
- Kept lessons: before redoing a task, grep ops/personal_retry.txt for its ID (T-2282 was already done, <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> in the queue); before drafting a request card, `gh issue list` for an open one (T-0625 duplicated #94; drafted as its update); never amend in a shared repo; read terms/licences in their own command before any fetch; count claims by script; script the contrast; never stamp a time ahead of `date`; when blind_packet refuses, stop and report line numbers; board_tick Evidence is a bare path, frame numbers go in Detail; snapshot sheets use stand-in grounds and frozen timers, so a fail list must say what a snapshot can and cannot show.

- 2026-11-05 T-2343 (4a6dbc5eb): Plan mode spec ops/site-checks/t2343/; open: Ines on plan.js budget (chat.js has 346 B gz room). Lesson: a CSS copy by regex dropped .cv-inv; check one known rule renders before trusting a copied sheet.
- 2026-11-05 T-1759 (716ca91e3): parked c2a2f112f brought to main (spec s5.13, draw_examples.py). Lesson: a redraw-everything commit can sweep in stray untracked sheets (1f2df5a56 took a 363 KB A-examples-phone.png); check `git show --stat` for names no spec row owns. Open: AX5 column still recalled.
- 2026-11-05 T-2536 (e827fe27d): six launcher options in pywidget/docs/design/launcher/, recommend Pegboard; open: Investor pick on #41, Wrenna's direct-launch device test. Lesson: tap-area bboxes overlap on a ring before circles do; check rects.
- 2026-11-05 T-2469 (ef9ddd04a): new Home frames (draw_home.py, home-stages.md), Workflow renamed This Session; posted #41 c6651836329; build line T-2510 (Odalys). Lesson: board_tick reads stdin, so --help hangs; grep its docstring instead.
{% endraw %}


</details>
