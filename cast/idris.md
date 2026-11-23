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



- T-0043 11-19 04d6503c07 on personal/b2 (recut of 6e5fc761ba): 6 escape tests green on main, 0 skipped. Open: ready b2 T-0043 xc (refused in-session), full PyWidgetTests. Lesson: scratch copy needs Vendor/ links, and Runestone from the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> worktree, not ~/itsthecompany (stale, no lineNumberMarks).

- T-5125 11-20: 8ca8746ce1 xc.sh probes quiet spells (XC_PROBE_AFTER 300 s; spells on stderr). T-5226 = host-wide stall (both slots silent same seconds), requeued J-20261120-0121. Open: T-5124 token test, never green since T-4962's own id; read the 2:00 AM daily's why line (f6a7b386cb ext answers). T-5251 mine: 'slow healthy run' flakes on main too under load. Lesson: runner/progress.json history (git log on macbook-results) gives per-minute log bytes per job.

- T-5315 11-20 (after T-5293): Altitude's heights in scripts/pywidget.premade.altitude/heights/today.json; Swift makes+marks the folder (launch, active) and deletes it in forgetCache under today.json.lock; the run never makes the folder. Open: Wrenna names it (T-5301). Lesson: Python can't set the backup flag, so Swift owns the folder.

- T-0053 11-20: C2-Q1 ruled (fix only in 2nd extension's container). Parts 1-2 as T-5365 (Shared/Bridge/LocationRefresh.swift, route not installed). Open: part 3 target + lane placement (Pernille), part 4 footprint. Lesson: XCTAssert autoclosures take no await; hoist into a let.

- T-5432 11-21: Foundations 6.0 (3.8-9.7), Pages 4.25 (2.6-7.75) on the slot; release Sat 2027-07-17 (T-4266 range 04-07 to 12-11; T-4770 line Sun 07-18). Lesson: grep --include needs quotes in zsh.

- T-4182 11-21 (a2): T-0048 slice = T-5272 (ConsoleModel.openAt, 3/5 red on mutant) + T-4801 (export names the widget's own project). Left: T-5438 (s3 rows, update steps, Home Screen capture); T-4800, T-4802, T-5273 open. Lesson: board add wants a 3-10 word title, a docs page in Done when, --by.

- T-0044 11-21: spike ran 12/12 on iOS 27.0 Sim (a52aa73d1a); Pyodide via npm registry (sha512 pin). Open: T-5462 device run (background, jetsam). Lesson: first WebKit call off main thread <span title="A test written in advance. If it fires, we drop the idea.">kills</span> the runner; Pyodide stalls silently without wasm-unsafe-eval.

- T-5108 11-21: stopped (pre-comparison first). Premades (free too) await currentEntitlements unbounded; 5 s bound written, 30 tests green, 4/4 mutants, NOT committed: patch in ops/plans/T-5108-handoff.md. Verify job waits in after-sync (normal drain). Lesson: "No view for this size" is our own placeholder (root nil) = no timeline came.

- T-5607 11-22: 86cf99245a on personal/b (after d01a7a1f1e). Cause: a job stopped at its limit in the UI target leaves Pro/tester switch on its slot's Simulator; next job there reads Pro. Open: Pernille review, merge, 3 runs on main. Lesson: result.json's simulator.slot/udid across jobs finds a device-carried leftover.

- T-4692 11-23: part 1 867acca236 on personal/a3 (tag = #324 A list: only habits Pro; isProTagged for chips; 2195/0). Open: review, land; gate flip waits T-0901 + T-4715. Lesson: purchases.md box order is pinned by tests/site_how_it_works_test.py (new box after Pro card).

## Lessons
- Older lessons and dated logs: archive.md.
{% endraw %}


</details>
