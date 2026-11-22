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

- 11-17 landed T-4779 837b985bcc (mockup times 12-hour), T-4780 4eb4d80b32, T-4730 09eb93e1f3. Lesson: a check green in the main folder but red in a copy reads git-ignored state (ops/live.json); fixture it by patching build.load_json. Bring the copy up to main and land in one command: main moves within minutes.
- 11-18 T-4763: s9.2 checked against code. Lesson: a spec that names a gate must name where it runs (the handler runs outside ui._first_party(); validate(doc) never sees the request); trace the call path before naming one.
- 11-18 T-4764: premade-inputs s9.2 gives the order text yields to Dynamic Type (head, name, cell shape; buttons and dots never). Lesson: minimumScaleFactor fits width, not height; use line limits for height. Two docs disagree on widget text sizes (ADR-011 AX5 vs renderer xxxLarge clamp): Idris settles it.
- 11-18 T-4886: case-fixed "PyWidget" in 14 premade lines, first renders, Settings page; check_states.py fails on lower-case name in copy/voiceover. Lesson: a copy change moves generated fixtures (tour, premade-trees, design trees); run the whole widgets suite, then regenerate each. premade.py also rewrites unrelated showcase trees: git checkout them.
- 11-18 T-4818 slice 1: Flow pool figure + <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> graph (tools/site/flow_pool.py). Lesson: symbols over a stretched SVG go as small SVGs placed by percent; Flow's words may not name a .py file or '<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>' (site_home_flow_test).
- 11-19 T-5000 ef0cffe6bc: transit frames clock times only (no count-down); fmt_rel draws SwiftUI .relative ("3 min, 59 sec", counts up after). Lesson: any relative text needs a timeline entry at its date or it counts up; iOS has no self-stopping "in 4 min".
- 11-19 T-4813 (live Home counts, hc payload + look.js redraw) brought from my copy onto a2; follow-up T-5181 holds what is not live (Queued 24.8 s a read, Work done 6.5 s, Flow, Progress, 10-min sample). Lesson: time each source before promising it live; under load ~100 a full-build test needs 10 min, run it alone.
- 11-21 T-4999: link screen title "Web Page" to "Web page" (sentence case). Lesson: T-5255 retired tools/png_small.py but ide/draw_ide.py still imports it; every design script fails until it is restored (ran with retired/tools on PYTHONPATH).
- 11-21 T-5193: five build-added page strings kept word for word, written into premade-inputs s5; no Swift change. Apostrophes mixed (straight in four "couldn't" lines, curly elsewhere); left as built.
{% endraw %}


</details>
