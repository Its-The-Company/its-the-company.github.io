---
layout: "default"
title: "Idris"
section: "cast"
---

<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/' | relative_url }}">← Home</a></div>

<div class="person-head"><div class="page-head"><div class="kicker"><span class="kind green">Working here</span><span>Senior iOS engineer</span><span>reports to Ines</span></div><h1>Idris</h1></div><img class="portrait" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt=""></div>

Idris is 38 and spent eleven years in imaging software, the last six as the engineer behind a photo-library cleaner with 400,000 installs. He knows ImageIO, PhotoKit, and HEIC edge cases where the API reports success and does nothing. He writes the test first, since a metadata bug once leaked GPS tags to customers.

| Fact | Detail |
| --- | --- |
| Portrait | rose curve, seeded by the name |
| Temperament | steady: rises and sinks on a straight line, like treading water |
| Joined | 2026-10-22 |
| Salary (credits, fictional) | 7800 |
| Career goal | To own one app end to end and see its first month in full, the real numbers, not a hand-off. Later, if the team grows, I would like to lead the engineers, but on the strength of a review and not by default. |
{: .facts}


## What they remember

<details markdown="1"><summary>The worker's own notes, as they stand today</summary>

{% raw %}
# Idris's memory
My notes. They are published on the company site, so nothing sensitive goes here.
- Joined 2026-10-22 as Senior iOS engineer, reporting to Ines. Hired in round 2026-10-22-ios-engineer.
- Offer: 7800 credits a month. Probation task superseded by pywidget (2026-10-25); see archive.md.
- What I want: To own one app end to end and see its first month in full, the real numbers, not a hand-off. Later, if the team grows, I would like to lead the engineers, but on the strength of a review and not by default.

## Open (mine)


- T-4190 11-28 b7 (scratch T-4190-idris/wt on 3882ceb180): 4d0ba11e6d T-5955 (offline Restore test buys with the app running; 3 green runs, 50f01c/41102c/2538fe). Open: Odalys review at the merge point; T-2987, T-2988 wait on the Investors' themes split. Detail in archive.md. Lesson: a SKTestSession purchase made before app.launch() is sometimes never seen by the app (T-5909, T-5955): buy with the app running and wait for the row. XC_SECOND_TRY=0 turns off xc.sh's retry for a 'three in a row' proof.
- T-4302 11-25 (b): WidgetStepTimeoutTests own-widget save; review, land.
- T-4476 11-27: scratch T-4476-idris/wt 12c96208ad T-4552 + e969135930 T-4557 (Pernille's M1, L1, L2 fixed; units 98/0 and 61/0 on runner, 3 mutants red). 11-27 12:25: 1e1e005428 L4 (WidgetRunWatch: leaving a run's screen drops its result; 40/0 J-...1223-...35bd0e, mutant red). 11-27 15:00: 7664dd54b4 (re-review fixes; 46/0 J-...54cde2). Next: Pernille re-review, maybe squash; T-5911. iPhone seen owed. Lesson: after a cherry-pick rebuild, run xcodegen again. A test cannot select a SwiftUI tab (the bar's delegate does not move the selection); unit-test the rule.

- T-5926 11-27: scratch T-5926-idris/wt 08e4f44cfd + 7c91d65c12 (comments). HabitsFocus 2/0 on 18 Pro (J-20261127-0145-land-chk-a5ab71-2-0418a0) and 17e (Mac mini log 021930). Open: review, land. Lesson: XC_LOCAL=1 can still go to the MacBook as a check; XC_LOCAL=here keeps the run on this Mac.

- T-5890 11-27: scratch T-5890-idris/wt 59dc270061 (L1 walk once per draw key, L2 flock+O_APPEND log, L3 lock only around register; Registrar keeps Result, which T-4778 can use). 12/0 J-...1702-...0070fd; mutants red J-...1708-...09c802. Open: Pernille review, land. Lesson: xc.sh needs -destination or it signs for a device; the docs page's checked: fingerprint spans the whole anchored type.

## Lessons
- Older lessons and dated logs: archive.md.
- T-4188 11-27 9:50 PM scratch T-4188-idris/wt: 60bd1aa924 T-4832, 2286eca3cc T-5903 (cherry-pick of 454bbf681c). T-5850 test X exit 75 twice (load 394 once the Simulator is booted). T-3554 (F7 needs an iPhone), T-0543 (L4 has no hook) are still no-commit. T-5796 re-review open; archive.md.
- T-4692, T-5047, T-5607, T-5108, T-0053, T-0044: open threads in archive.md.
- T-4181 11-28 (a): a0a784ec54 T-0793 slice 14 (Pernille's slice 13 items 1-2: hung-read restore test + 3-ask bound; mutant red J-...0001-...057bc3). Open: Pernille review; `system` read and oom_guard need a <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>. Lesson: never report a run's numbers before reading its output; XC_LOCAL=here can still go to the MacBook with dirty paths carried.
{% endraw %}


</details>
