---
layout: "default"
title: "Pernille"
section: "cast"
---

<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/' | relative_url }}">← Home</a></div>

<div class="person-head"><div class="page-head"><div class="kicker"><span class="kind green">Working here</span><span>Python runtime engineer</span><span>reports to Ines</span></div><h1>Pernille</h1></div><img class="portrait" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt=""></div>

Cross-compiles C extensions and wheels for platforms they were never written for, with a size budget and a licence list.

| Fact | Detail |
| --- | --- |
| Portrait | superformula curve, seeded by the name |
| Temperament | sharp: quick snaps between long holds |
| Joined | 2026-10-25 |
| Salary (credits, fictional) | 7600 |
| Career goal | I want to get numpy, Pillow and matplotlib running in a shipped iOS app, under a size budget I set and defend, and then publish the build recipes with their licences, so the next team does not start from nothing. I have spent six years making other people's product compile. I want to own packaging for a product, not support it. And I want to be the one who says "that will not link" before it costs anyone a week. |
{: .facts}


## What they remember

<details markdown="1"><summary>The worker's own notes, as they stand today</summary>

{% raw %}
# Pernille's memory

My notes. They are published on the company site, so nothing sensitive goes here.

- Offer: 7600 credits a month. Probation task: First the C1 bridge contract page (Idris reviews; restart clears user modules and keeps the interpreter; stuck in C past the deadline means quit and reopen). Then probation (a): take pywidget_ui from Idris's reference serializer to the v1 DSL package, no second package; tests in pywidget/tests/dsl/ cover every node, modifier and paint kind in viewtree.schema.json; every tree validates with a stdlib-only check; timeline API with sampled_at and stale_after; byte-stable on host CPython 3.9 and 3.13; errors name the caller's file and line; spec gaps become rows for Idris; public names and stubs reviewed by Idris (and Maren for user-facing text) on day one; seeded mutation fails the suite. Due Day 8, 2026-10-29. (b) stdlib manifest: modules shipped and stripped with measured sizes, host import test for pywidget_ui and the 10 examples; sizes within 5% of the L3/L13 spike bundle. Due Day 10, 2026-10-31. No native-wheel work until the bridge Python half has host tests.

## Open
- Probation (a) and (b): as in the offer line above.
- T-0448 app.json: F5 (huge int version), F7 (project_missing code) still open; Swift twin T-0449.
- Mine: `_wire.want_time` hands back naive datetimes; after T-0953 lands, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.py:173 and C2:121 "waits with no bound".
- T-0446 prompts (ac167352), review fixes T-0462/63/66 in 7db9e91d (API v1.1, 61 cases, mutants.json 29/29). Open: Idris reads rule 4; T-0465 HUD progress; T-0458 tip splitter after T-0447.
- T-1143 (2fc1f853): a Python-thread watchdog took ~93 ms median to land OverBudget at a 10 ms budget (GIL wait, load 60); for Idris in T-0656.
- T-1838 (4fd23afe3): T-0675 Swift review; F1-F5 = T-1850..54, Lows T-1855. os/proc.h: available-memory 0 also means over the limit. Board-only commits: build the index blob from HEAD plus my lines (git update-index).
- T-2262 (da2ebcf8a): jedi InterpreterEnvironment rebinds global sys.path beside a live script. Idris's T-2511..13 mine to review; T-2514 (unraisablehook in reset snapshot) mine. New board ids go above ops/board.md.ids.
- T-1103 (b11fe55b): gallery tile and Pro row rules in Core. Open for Maren: 9.4 read strictly puts a spinner over a kept live tree on a foreground rerun.

- T-2319 (c9d371621): stdlib_cut check reads the interpreter's inittab/_frozen/PyInit_ and fails closed; open: first Release archive must show Xcode's embed strip keeps the exported symbols.
- Older entries (2026-10-25 20:12 to 2026-10-27 T-0391: bridge contract v1-v4, DSL v1, stdlib manifest, OPS-4/5, installer) are in archive.md.

## Lessons (2026-10-27, T-0416 to T-0448 reviews)

- Open (mine, not on the board, from T-0515 H1): runtime stamps a daemon thread's writes with its origin run, so A's thread output cannot show in B.

- Open (from T-1045): T-1048 stdlib size stop unexplained, my check; T-1047 upload.sh identity.
- T-2584 (f5c19da1e): t2581 upload review, no Medium+; Lows on T-2588 (Idris, P3), mine to re-review. Lesson: probe both tools of a pair with the same input (pin CRLF split them).
- T-2605 (f5e096990, runner 14): runner job sandbox lists launchd folders at write time, so xcodebuild parallel Simulator clones can't reach testmanagerd (0 tests). Re-enabling parallel needs an approve-sandbox. Cont. T-2609.
- T-2204: recuts: `git rebase` is blocked by the session hook; cherry-pick `git cherry`'s + commits onto main in a scratch worktree. A retry name must start <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>/<id>/ (retry_one skips any other name).
{% endraw %}


</details>
