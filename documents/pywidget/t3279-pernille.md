---
layout: "default"
title: "T-4439: review of T-3279, the first draw of a premade placed before the app&#x27;s first open"
section: "documents"
description: "Held under Commandment 42: nothing in this file goes on the site or into public text."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3279-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 24 · Sat Nov 14</span><span><code>pywidget/docs/reviews/t3279-pernille.md</code></span></div><h1>T-4439: review of T-3279, the first draw of a premade placed before the app's first open</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Held under Commandment 42: nothing in this file goes on the site or into public text.

**Verdict: PASS with findings.** Findings: 0 High, 3 Medium, 3 Low, plus 3 observations that need no board line.
The first thing that broke was not the code. It was the evidence: the runner job queued to tick T-3279 filters on a
test class that does not exist (M3). The product change does what Medium 1 of my T-3170 review asked for. A premade
chosen in Edit Widget before the app's first open no longer shows "No view for this size". Countdown and habits draw
their own empty state, and every other premade draws a card that names it and says "Not drawn yet". The app's own tree
always wins, and the lock is checked first. The appex grows by 7,528 B. I found no crash, data loss or App Review
problem.

Read, at main 4f545d4d14: 879944ec03 and 10846f0c51 (slice 1, T-3298), 5644d56f70 and 648ebf0693 (slice 2);
Shared/FirstDrawCardView.swift, FirstRender.swift, WidgetPlacement.swift (`TreeDrawable.decide`, `TreeFile`,
`firstRenderTimeline`), Widget/PyWidget.swift (provider), TreeView.swift (card order), TreeTimeline.swift (planner and
stale mark), Bridge/RunResultSink.swift (`finish`), Bridge/LaneDevice.swift (where a premade's file lives);
Tests/FirstDrawCardTests.swift, FirstRenderTests.swift, PremadeFirstRenderTests.swift; scripts/first_renders.py,
widgets/premade/first-renders/, countdown.py, habits.py, _premade.py (Store, open_store); project.yml; the
first_draw.* words in state-tokens.json. Background: ops/board_notes/T-3279.md and Medium 1 of my t3149-pernille.md.

## Checks I ran (host only; no Xcode, no Simulator)

- `python3 -m unittest -v test_first_renders` in pywidget/tests/widgets: **5 tests, OK** (0.76 s). pytest is not
  installed on this Mac's python3, so I used unittest.
- `python3 pywidget/ios/scripts/first_renders.py --check --verbose`: **exit 0, "checked 2 first renders"**. Countdown
  and habits are bundled. Clocks, progress, quote and storage draw differently across the 8 clocks x 8 zones. Altitude,
  distance, github, shortcuts, steps and sun read something outside their own file.
- I ran no Swift suites. Job J-20261114-0859-xc-test (3e2954af) was queued at 8:59 AM and had no result in ops/jobs
  when I read it. Read M3 before ticking T-3279 on it.

## What I checked and found sound

- **A stale bundled render cannot outlive the app's tree.** `decide(widgetID:tree:...)` asks for the bundled render
  only when the tree-based decision is `.missing` and `TreeFile.neverDrawn` is true (WidgetPlacement.swift:216-218).
  A decoded tree.json is drawn. A tree.json that exists but cannot be read (file protection before first unlock) or
  decoded stays on the error path. The sink reloads the kind when it writes the first tree, so the bundled render is
  replaced within one timeline reload. Nothing deletes a premade's widgets/<id>/ folder (grep of removeItem in App
  and Shared).
- **Pro.** The lock is checked on the configured id and on the bundled document's own id before anything is drawn
  (`decide(widgetID:document:...)`, :200-203, reused for the bundled document at :219). Habits without Pro draws the
  Pro card, and FirstRenderTests pins that. After a refund, a first render changes to the Pro card at the next ask:
  30 min (`firstDrawRecheck`), sooner than `proRecheck` at 60 min. Before the first open, the picker offers habits only
  when StoreKit already grants Pro (a reinstall with Pro, or Family Sharing). Uninstalling clears the App Group, so
  "No habits yet" is true in that case.
- **Time zone and clock.** The <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> proves that each bundled premade draws the same views at 8 clocks (two DST
  edges, a year end, a leap day, 2031) in 8 zones (UTC-11 to UTC+14, half- and quarter-hour offsets), for every entry
  of its timeline. Neither file has `stale_after` (both `timeline` objects hold only `policy` and `sampled_at`), so the
  stale mark never draws. Neither has an `Updated` node, so the fixed `sampled_at` never reaches an age line. Nothing
  enforces either (L1).
- **Nothing made up.** Each file is the premade's own timeline provider run through pywidget_ui, on an empty
  MemoryStore, in the "widget" context. The words come from countdown.py:84 and habits.py:84 ("No events / Add a
  countdown in pywidget.", "No habits yet / Add a habit in pywidget."), the same notice the app's own first run
  draws. The card carries no number and no sample data. FirstDrawCardTests checks that its words hold no digits, no
  fault words and not the old size message.
- **What each family shows.** Countdown draws all five of its families from the file. Habits draws systemSmall,
  systemMedium, systemLarge and accessoryCircular. Habits placed as accessoryRectangular or accessoryInline draws "No
  view for this size". That is true, and it is also what it draws after the app runs. Every other premade draws the
  card in every family, named by its title from premade-titles.json. Inline shows the glyph and "Not drawn yet".
- **Size, memory, signing, review.** first-renders/ is 3,713 B + 3,815 B = 7,528 B, in the appex only. The app's
  Runtime copy step takes only *.py, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.json and catalog.json (project.yml:283-285), so there is one copy. The
  extension reads one file of about 3.7 KB, and only for a widget that has never drawn. The files are JSON resources in
  a folder reference. Code signing seals them like any other resource. They hold no executable code, so Guideline
  2.5.2 does not apply.
- **Ids.** `FirstRender.document` accepts only `pywidget.premade.` followed by `[a-z0-9_]` and starting with a
  letter. It refuses a file whose own widget id is different. FirstRenderTests covers path traversal, case variants
  and suffix variants.
- **Host test strength.** test_first_renders fails on a premade change that was not re-exported (`--check`), on an
  extra or missing file, and on a drawing that moves (the notice mutant). It runs in run_host.py, which the land and
  tools/main_green.py run.

## Findings

1. **Medium (cannot happen yet). The bundled render can say "No events" to a person who has events.**
   WidgetPlacement.swift:214-223, RunResultSink.swift:107-112. `neverDrawn` looks only at widgets/<id>/. A premade's
   own file lives somewhere else: scripts/<id>/premade.json in the App Group (LaneDevice.swift:40-44). The sink writes
   no tree.json when a widget run fails, times out, finds the state lock held, or loses to a newer tree. The folder
   under widgets/ is made only when a tree is written. So take a countdown whose file holds events and whose runs keep
   failing. It is `.noFolder`, counts as never drawn, and draws the bundled "No events. Add a countdown in pywidget."
   Slice 1 drew the honest "Not drawn yet" in that case. Today I found no Swift code that writes countdown events or
   habits (a grep of App and Shared for "events", "habits", "pinned" and "set_at" finds nothing), so no person can get
   here yet. It becomes possible the day an editor for either premade ships; T-0193's date picker is on the board. Fix:
   draw the bundled render only when scripts/<id>/premade.json does not exist either (check that the file exists in
   the App Group; no read). Otherwise draw the card. Add a FirstRenderTests case with the settings file present.
2. **Medium (test strength). No test covers the extension's own path, so slice 2 could disappear with every test
   still green.** Widget/PyWidget.swift:30-32. Every FirstRenderTests case calls `TreeDrawable.decide` with its own
   `firstRender:` closure. The provider scan in FirstDrawCardTests checks only the prefix `TreeDrawable.decide(widgetID:
   id, tree: tree(for: id)`. That prefix still matches if the `firstRender:` argument is dropped, because its default
   is `{ _ in nil }`. No test outside FirstRenderTests names `FirstRender` or `.firstRender` (grep of Tests and
   UITests). And `checkDrawsItsFirstRender` runs countdown only with `entitled: true`, so the most common real case
   (free, no Pro) is not covered: a change that gated first renders on Pro would stay green. If it breaks, people see
   the honest card, not a wrong render. That is why this is Medium and not High. Fix: test `TreeProvider.drawable`, or
   a function it calls, with the appex folder, and add a countdown case with `entitled: false`.
3. **Medium (evidence). The runner job meant to tick T-3279 does not run the T-3364 tests.**
   ops/jobs/J-20261114-0859-xc-test.json filters on `PyWidgetTests/PremadeFirstRenderTests`. PremadeFirstRenderTests.swift
   declares no class. Its 13 tests are an `extension BridgeTests` (line 11), so that filter matches nothing. The job
   will either fail to start or report green without them, unless the runner refuses a filter that matches nothing.
   Either way it is not evidence for those tests. Fix: queue it again with `PyWidgetTests/BridgeTests/testT3364...`
   (or all of `BridgeTests`), and tick T-3279 only on a result that lists them.
4. **Low. The generator does not enforce the two things that make the fixed `sampled_at` harmless.**
   scripts/first_renders.py:94-98. The bundled tree's `sampled_at` is 2026-01-01, a moment no run sampled at, and the
   generator copies the premade's own `stale_after`. If a bundled premade ever gets `stale_after`, the stale mark draws
   from the first moment. If one draws `Updated()`, the age line shows a time no run happened at. FirstRenderTests'
   `XCTAssertFalse(e.stale)` checks at 2027-01-15. It catches the first case only for a stale_after under about a year,
   and nothing catches the second. Fix: `why_not` refuses a premade that has `stale_after` or an `Updated` node, and
   the host test asserts both are absent.
5. **Low. The bundled entry is dated 2026-01-01, not now.** WidgetPlacement.swift:242-249, TreeTimeline.swift:209-211.
   On a phone whose clock is set before 2026-01-01, the planner treats the entry as a future one, and there is no
   current entry. I have not checked what WidgetKit draws then, but it is not the render. The generator already proves
   the views are the same at every clock, so `firstRenderTimeline` can date its one entry `min(entry.date, now)`, and
   the problem goes away. An edge case with a cheap fix.
6. **Low (test strength). Nothing compares the host render with the device run.** Only host Python proves that the
   bundled file equals the app's first run. PremadeFirstRenderTests already gets the app pass's real tree for countdown
   and habits on the iOS runtime. One assert there that those views equal the bundled file's views would catch a
   difference that shows only on the device (stubs, zone lookup, run context).

## Observations (no board line from me)

- **O1. The empty state asks for something the app cannot do yet.** "Add a countdown in pywidget." and "Add a habit
  in pywidget." are the premades' own copy, and the app's run draws them too; these slices did not write them. I
  found no app code that adds either (see F1), and T-0193 is still open. The bundled render shows the line earlier
  and to more people. Whoever owns the <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> copy and T-0193 should look at it before TestFlight testers take it as a
  promise.
- **O2. Name case.** The card's words say "pywidget", but the Home Screen label is "PyWidget" (CFBundleDisplayName,
  project.yml:207). This is Maren's C51 decision; first_draw.* is still PROPOSED.
- **O3. Still owed, not by me:** the Simulator or phone check of a premade placed before the first open (both
  slices), and Maren's C51 sign-off on first_draw.*.

## Board

Follow-ups for Idris: F1 and F2 get one P1 line each. F4-F6 share one P2 line. F3 is already noted on T-3279's line
(Operator), so it gets no line of its own. O1-O3 get no line.
{% endraw %}

</div>
