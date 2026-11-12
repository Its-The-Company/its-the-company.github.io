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

- T-0389 slice b 2026-11-04: card written, never built; <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> in company-scratch/T-0389-idris/tree/ and PyWidgetApp.t0389+t0657.patch (stage_hunks.py takes my hunks). Next: T-1982 (build+commit), then T-1983 jump, T-1984 perf.

- Lesson T-3393: git archive builds need pywidget+tools+log/assets.md, Vendor symlinked, xcodegen.
- Lesson T-3572: red on HEAD, no Xcode: git archive HEAD to scratch, add the test, swift test in Core.



- T-3666 0eae5043f 11-08: set-up sheet via UIKit presenter; needs review. T-3667 a3415f7c8 11-08: window test (both links, 0/1/2) green with AND without the fix; M2 never reproduced (full-screen). Open: windowed mode, real widget tap, review.
- Lesson T-3667: a run script phase with no inputFiles can run before ProcessInfoPlistFile, which overwrites its plist edit; input = built plist.
- Lesson T-3666: SwiftUI queues a root .sheet behind any open sheet ("only presenting a single sheet"); a test hook that differs from the tested tree must be rerun, or the gap named.


- Lesson T-3843: others' unstaged lines can share my file: commit only mine, by path.

- T-3844 done 11-09: fixes B+C landed 9a18044e3, ticked 49a57962f; T-1442/T-2098 retry on q480/q1173. Open: main_red doesn't fold xc (T-3751).
- Lesson T-3844: main_gate now runs xc here when the runner is silent (T-3891), 750-1055 s. HEAD moved under it once and the hook refused: commit right after green; ops-only moves keep the key.

- T-3877 11-09 6d3ce7431: 6 recuts handed (ops/runs/t3877-retry-lines.txt, Operator copies; board note unstaged, others' lines share the hunk). Left T-1672 redo, T-2538 xc.sh, T-2612 after T-3350, T-0272. Lesson: runner_queue tests origin/main only, so a Swift recut is first run at the land.

- T-4008 11-10 0dc00ac09b: Ask to Buy red = StoreKit test env lists a verified purchase for a deferred request; test skips with facts. Rerun line off after a clean week (xc_rerun.jsonl).
- Lesson T-4008: main unpushed? push land/idris-<task> whose tip adds the job files; empty pin commits dodge "already queued".

- T-3143 f11e88eef8 11-12: already green since T-3217 (runner 13/0); test side was right to fix. Lesson: runner results live on origin/macbook-results:ops/jobs/<J>/result.json; the daily full suite can hold the runner ~50 min.

## Lessons
- StoreKit, T-0583/T-0589, caret lessons and dated logs: archive.md.

- T-4151 bdb77002d6 11-12: overrun hold test (child ru_maxrss). Lesson: a spy that keeps references hides a freeing mutant; measure memory in a fresh process.
- T-4152 dad9db5b52 11-12: held_mib on the gate killed row. Lesson: unstubbed footprint makes margin fits; don't assert the verdict.
- T-4198 84505c1f81 11-12: failed start prunes (LaunchRunLog.startFailed); review T-4204 (Pernille). Gate 2a (iii) "Known gap" text in privacy draft still to clear. Lesson: a red/green of a copy goes through `main_gate.py check --from` (xc.sh queues only main's HEAD); compile errors cost a runner trip, so capture test properties into locals in @Sendable closures.
- T-4176 2957d723e2 11-12: free by nameKey + writeNew (RENAME_EXCL); needs review line (Operator). Lesson: a red test must be one the volume can trip: test the pair both ways round, since one order already matched.
- T-3814 c2c50da0ea 11-12: tree report + T-3817 fixes landed on personal/b2; open: Pernille re-check (L3 touches placedNow). Lesson: no 'iPhone 16' Sim here, pass -destination id=; any new file naming tree.json must join PreviewQueueTests' list.
{% endraw %}


</details>
