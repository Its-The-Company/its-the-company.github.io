---
layout: "default"
title: "Xcode queue, Day 6-10 (chair ruling, one page)"
section: "documents"
description: "Conclusion. Main never idles, and it does the alpha lines in this order. Every line with no build goes to another worker. Classes: alpha (Day 10), freeze (Day 13), rc (release candidate, Day 16), 1.1."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/' | relative_url }}">← Build Plan</a><a href="{{ '/documents/pywidget/xcode-queue-day6-10.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 5 · Mon Oct 26</span><span><code>ops/plans/pywidget/xcode-queue-day6-10.md</code></span></div><h1>Xcode queue, Day 6-10 (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> ruling, one page)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-10-26 22:17 ET, task T-0331. Replaces the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> order in ops/state.md "Plan, Day 5 evening" item 2 and the lane sentence in T-0286's chair note (20:34). Dates: plan.md milestones. Slots: #78 (ops/prompts/work.md step 2): **main** = the one Xcode task in the main tree, the only slot that commits Swift; **wt** = one detached worktree at HEAD for checks, screenshots, mutation runs and reviews, records only; never two xcodebuilds at once (tools/xc.sh waits). **MacBook**: nothing is planned on it. The runner is not installed; T-0330 re-reviews it now, then SETUP.md goes to the Investors. When they install it and approve the test-run job kind, the wt slot's Simulator test runs move there first.

**Conclusion.** Main never idles, and it does the alpha lines in this order. Every line with no build goes to another worker. Classes: alpha (Day 10), freeze (Day 13), rc (release candidate, Day 16), 1.1.

**Money check.** About $968 is left in the week to 11-01 02:00, about $185 a day, which buys about 18 agent-hours a day at $10 an hour. When pool_max is 1, that agent is Idris's main slot. The wt slot runs only when pool_max is 2 or more.

## Main slot, in order


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Main slot, in order, scrolls sideways" style="--tw:771px" markdown="1">

| Day | Line | Class | Needs first |
| --- | --- | --- | --- |
| 5-6 | T-0206 renderer node set and families (running), then T-0161 in the same renderer files (P2 -> P1) | alpha | - |
| 6 | T-0312 slice a: `input()` sheet / REPL bar, Copy all (Day 7 milestone) | alpha | Maren C5 screens (landed) |
| 6 | T-0208 App Intents stubs, StoreKit configuration file | alpha | - |
| 7 | T-0052 stdlib cut build phase, with T-0213's STDLIB_MODE=zip default | alpha | Pernille T-0339 |
| 7 | **T-0207 bridge Swift half, tree.json write (P1 -> P0)** | alpha | - |
| 7 | T-0286 ADR-003 B2 Xcode phase (due Day 9 23:59) | alpha | T-0052, T-0285 (done) |
| 8 | T-0041 editor spike, <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span>-G3 (verdict by 10-30 23:59, ADR-004 ruling 2) | alpha | T-0207 |
| 9 | T-0031 Pro purchase in StoreKit testing (Day 9 milestone) | alpha | T-0208, Pernille T-0338, Maren T-0333 |
| 9 | T-0041 adapter day, only if keystroke p95 is 16-33 ms | alpha | G1 numbers |
| 9 | End to end: editor to home-screen widget, recorded in ops/site-checks/ | alpha | T-0206, T-0207, T-0208, T-0041 |
| 10 | T-0051 Pro premade placement (entity query, revocation) | alpha | T-0031 |
| 10 | T-0312 slice b: tappable traceback frames, flood frame drops | freeze | T-0041 |
| 10-11 | T-0191 gallery screen (5 free / 7 Pro from the flag file) | freeze | T-0021, Maren T-0334, T-0338 |
| 11 | T-0043 escape tests (its denylist half is T-0052/T-0339), T-0198, T-0105, T-0309 Swift cases, the T-0245 Swift twin | freeze | Pernille's halves |
| 12 | T-0192 preview pane (1.1 if it misses the Day 12 build, as written), T-0193 tour page 3, T-0048 error states and Activity screen, T-0273 wiring, T-0106 reader half, T-0025, T-0047, T-0063, T-0053 | freeze | T-0191; Pernille T-0340, Maren copy |
| 12 | T-0272 themes, only under its Day 10/12 conditions | freeze | T-0041, T-0271 |
| 14-15 | T-0042 Acknowledgements screen and UI test | rc | Odalys's text |

</div>


If Day 12 runs short, lines drop to 1.1 in this order: T-0053, the T-0048 Activity screen, T-0192's entry stepper, T-0063's typed place.

## Worktree slot (records only)

T-0330 review (running). Day 6: T-0021 Material and ContainerRelativeShape snapshot (T-0191 needs it), T-0024 Simulator items. Day 6-7, after T-0206 lands: T-0306 gallery trees, T-0039 C13 check, T-0206 mutation runs; Maren reads the deltas. Day 8, after T-0052: T-0213 measurements (frozen modules, Release rerun). Once the #83 settings rule is applied (Odalys T-0325): T-0321 Release generic build, rc. The first day the Apple membership is active: T-0076 placeholder archive, then T-0008 and T-0011 device runs, rc.

## Moved to other workers (no build)

- Odalys: T-0042's notice text, generated by a script from log/assets.md rows and the vendored LICENSE files, with a host test. Day 12. Idris keeps the screen.
- Pernille: T-0273's trigger rule as a pure Swift function in Core with `swift test` host tests, no xcodebuild. Day 10. Idris wires `requestReview` on Day 12.
- Pernille: T-0106's schema half (viewtree.schema.json rows and their tests). Day 11. Idris keeps the run-log reader.
- Wrenna: T-0259, the Apple privacy-reasons page, on 10-27 within the daily page <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> (it edits plists only).
- Maren: T-0047's purpose-string copy before Idris adds the strings.

## 1.1 or <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>

1.1: T-0212 install from file (ADR-006 s11 allows it), T-0032 share-extension probe (the share extension is 1.1 already), T-0044 Pyodide spike. Parked, no slot: T-0064 (waits on #29), T-0069 (Unrelated, parked by the Investors). T-0243's wheel staging goes to main after T-0286, once Pernille's line is unblocked.

## What would make Day 10 fail

**T-0207.** It is the only line between user code and a home-screen widget, and it has no fallback. T-0041 has one (ADR-004 s5, and the chair rules on the numbers in hand by Day 10). T-0206 already draws small and medium. If T-0207 is not green by Day 9 18:00, the alpha moves. I will rule that evening on cutting T-0286 or T-0031's restore case to buy the day back.
{% endraw %}

</div>
