---
layout: "default"
title: "Review of T-4185 at ce68534814: T-3765&#x27;s Release Simulator tap check, the tap&#x27;s file pick, and the phone-check draft"
section: "documents"
description: "The code is correct and its tests would catch the bugs they pin. Each test kills the mutant I made for it. The Release Simulator check is sound evidence, and the draft&#x27;s account of the iPhone and iPad runs agrees with\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4185-ce685348-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/t4185-ce685348-pernille.md</code></span></div><h1>Review of T-4185 at ce68534814: T-3765's Release Simulator tap check, the tap's file pick, and the phone-check draft</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4698, Commandment 13). Author: Idris. Reviewed: main at ce68534814, which takes in 005db652a0
(the Release Simulator check of WidgetKit's own tap, its shots and the phone-check draft), 5874325758 (the file pick
proven against an exact-case lookup; only ASCII digits mark a copy) and ce68534814 (the draft says the tap's library
scan is the company's own measure, T-4638). All three are T-3765. I read the three diffs, and at ce68534814
`App/WidgetTapRouting.swift`, `Tests/WidgetTapRoutingTests.swift`, `UITests/WidgetKitCheckTests.swift`
(testSReleaseWidgetTapOpensItsScreen and its helpers, `:932-1190`), `Shared/WidgetID.swift` (`WidgetFolder.url`),
[`ops/plans/T-3765-device-check.md`](../company/t-3765-device-check.html), the twelve files in `pywidget/docs/screenshots/t3765/`, the T-3765, T-4185,
T-4615 and T-4638 board lines, `ops/board_notes/T-3765.md` and card 2.6 in [`ops/plans/app-features.md`](../company/app-features.html). Date: 2026-11-17.

This worktree's HEAD differs from ce68534814 in `WidgetTapRouting.swift` and its tests only by T-0048's Activity case
(53c5f25f42), which does not touch `scriptFile`, `pick`, `isCopy` or the four tests below. So the run below exercises
the reviewed code.

Runs:
- `WidgetTapRoutingTests` (iPhone 17e, iOS 27.0 Simulator, local, `XC_TASK=T-4698`, after `xcodegen generate`):
  15 executed, 0 skipped, 0 failures, the four T-3765 tests among them (`ops/runs/xcodebuild-20261117-184336.log`).
- Probes, compiled with `swiftc -O` in my scratch folder (no product file touched): `isCopy`'s body as landed and
  three mutants of its digit rule, over the suite's names and ten more; `pick`'s body as landed and two mutants of its
  last step, over the suite's tie. Results under "What I checked", 2 and 3.

I did not rerun the TAP_CHECK UI test. It needs a Home Screen and a placed widget on a private Simulator, and two other
reviewers share this worktree's Simulators now. I judged its evidence from the printed lines and the shots.

## Verdict: PASS with findings

The code is correct and its tests would catch the bugs they pin. Each test <span title="A test written in advance. If it fires, we drop the idea.">kills</span> the mutant I made for it. The Release
Simulator check is sound evidence, and the draft's account of the iPhone and iPad runs agrees with the printed lines
and the shots, with one sentence that says more than the lines show (L1). The finding that matters is about the record,
not the code: the draft on main still reads as unposted, and T-3765's board note waits for an Investor's iPad that
<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> #299 says is not coming. Read as they stand, they hold T-3765 open forever (M1).

## What I checked

1. **The exact-case seam (T-4068 L1).** `scriptFile(for:in:widgets:)` (`:50`) now hands `sentScript` to the new
   `scriptFile(for:in:readSent:)` (`:58`), so the shipped path and the tested path share one body. `WidgetFolder.url`
   (`Shared/WidgetID.swift:178`) keeps the spelling it is given and refuses a folder whose last component differs, so
   on a case-sensitive disk only an exact spelling finds `main.py`. The loop at `:73` is therefore live on a device.
   `testADeclaredSpellingFindsMainPyWhenTheTapsSpellingDoesNot` pins three things: the result, the order read
   (`CLOCK, Clock, clock`, case kept), and that the tap's own spelling decides when it has a `main.py`. Mutants, by
   reading: drop the declared spellings and the first assert fails (Finder order picks Alpha). Fold the spellings to
   `WidgetID.key` and the `asked` assert fails. Read declared spellings first and the third block fails. The tap's
   spelling first is the right order: a placed widget runs `widgets/<its id>/main.py`, so that file is what it draws.
2. **ASCII digits only (T-4068 L2).** `:109` takes `$0.isASCII && $0.isWholeNumber`. Probe over the suite's names plus
   2 with a combining acute, the keycap `2️⃣`, superscript `²`, Devanagari `१`, a no-break space before or inside
   "(conflict", "Conflict" capitalised, `0`, `1` and `02`: the landed rule refuses every non-ASCII form. The old rule
   (`isNumber`) differs on 8 names, `isWholeNumber` alone on 5, `isASCII` alone on `main (conflict x)`. The suite's
   asserts catch all three mutants. `0`, `1` and `02` still count as copies, though saveCopy never writes them. That
   is harmless: a copy is only ranked lower, and it still opens when its bytes equal `main.py`.
   `testEverySaveCopyNameCountsAsACopy` ties the rule to its only writer, `ProjectStore.saveCopy`, for three names.
3. **The path-bytes tie-break.** `pick` is now `static` and testable, and `guard let ... else { return nil }` replaces a
   force-unwrap with the same behaviour (the caller already returned on empty). Probe: comparing the paths with
   `localizedStandardCompare`, or dropping the last step, fails the suite's order asserts in one input order or both.
   The landed body passes both.
4. **The symlink test** builds both refusals (a linked `main.py`, a linked `widgets/clock`) with a winner that differs
   from Finder order, so reading through either link would change the pick. The two guards in `sentScript` (`:116`)
   overlap, so deleting one alone stays green. That is defence in depth, not a gap.
5. **The Release Simulator check (005db652a0).** It reads the installed app's Info.plist and requires no
   `CFBundleURLTypes`, so a Debug product cannot pass. `PW_EDITOR_BENCH=YES` only adds the bench file and softens the
   legal-links check (`project.yml:335-345`, `scripts/check_legal_links.py`), so "the same Release settings as build 7
   but no tester flags" is true. Each tap starts away from its target. Script taps require exactly one editor holding
   the run's token. The bare `navigationBars["main.py"]` assert is weak, because the other project's file is also
   main.py, but the token count carries it. `continueAfterFailure` is false for this class (`:25`) and true only
   around window counts (`settleWindows`), so the closing `T-3765 TAPS ... each opened its own screen` line prints only
   when every screen assert passed. With 2 failures on the iPad it still printed, and both failures are window counts.
   That matches the draft.
6. **"Built from main at 382010e28e; since build 7 the tap, window and Gallery code differs by one line."** True:
   bb4b184e34 is an ancestor of 382010e28e. Between them, `App/` and `Shared/` change in the editor, the runtime, the
   bridge, `TreeView`, `WidgetStateCommit` and `FontProbe`, and in `PyWidgetApp.swift` only by the one `FontProbe.seed()`
   line. Nothing in `WidgetTapRouting`, `LauncherTapHandling`, `WidgetTapLink`, the scenes or `Gallery/` changed.
   T-4468 (23788b915a) is in build 7, as the draft says.
7. **Shots against claims.** `iphone-script-backgrounded.png` shows `TOKEN = "PWM9RFW3"`, `tap_pwm9rfw3`, the
   2:25 PM run's id. `ipad-premade-backgrounded.png` shows the Events page over the Gallery. `ipad-two-windows.png` is
   tip_splitter.py in a window titled Console, which explains the `bars=Console` second windows in
   `ipad-run-windows.txt`. Each shot is the front window only, as the draft says.

## Findings

### M1. The draft and T-3765's board record no longer agree with what happened, or with ruling #299

- `ops/plans/T-3765-device-check.md:3` and `:17` still say "Nothing here has been posted" and that T-3765 "is marked
  waiting on the Investors". It was posted as #319. an Investor answered on 11-16: all 4 iPhone taps passed on build 7,
  recordings in `ops/site-checks/test1-1.mov` and `test1-2.mov`. #319 closed at 9:29 PM ET (`ops/board_notes/T-3765.md`).
  The T-3765 line is `- [ ]`, not `- [b]`. A reader of the plan on main would think the phone check is still owed.
- Idris's 11-17 note on T-3765 says the line "still waits for an Investor's iPad". The T-3765 line asks for the iPad
  Windowed Apps taps "on device". Card 2.6 and the T-4185 line ("Seen on: ... on a phone and an iPad, in the Investors'
  hands") ask the same. Ruling #299 (`log/rulings.md:2434`, answered B on 11-14) says the iPad steps stay in the
  Simulator, and each closing note says so. The draft follows that ruling. The board does not, so T-3765 has no end
  condition it can meet.
**Fix:** add a header to the draft: posted as #319, answered, iPhone half seen on build 7, iPad half is T-4615 on
the Simulator. Reword T-3765's open condition to this: iPhone seen (#319), iPad in the Simulator once T-4615's TAP_CHECK
run is green, the closing note citing #299. Ines rewords card 2.6's and T-4185's "Seen on" to match, since #299 holds
until the Investors say otherwise.

### L1. "A new Gallery window": the printed lines show a third window, not which one is new

`ops/plans/T-3765-device-check.md:57-59`: before the backgrounded Countdown tap the windows were Console, Console.
After it they were Gallery, Console, Console. That fits two different faults. Either the tap opened a new window on
the Gallery, or it moved an existing window to the Gallery and a spare window appeared beside it. The script tap is
just as open (Console, main.py, then main.py, Console, main.py). The count of 3 is shown, and the draft's headline
("made a third window") is right. But the sentence names which window is new, and the lines cannot say that.
For T-4615 the difference decides where the fix goes: `handlesExternalEvents` routing, or a scene the system makes on
its own. **Fix:** in T-4615's red run, give the two windows different files before the tap (tip_splitter.py, and the
other project's main.py, as the script half already does), and print each window's editor text as well as its bar. That
shows which window the tap changed and what the new one holds. Correct the sentence to "a third window". A note on
T-4615, no new line.

### Info (no line)

- 5874325758's subject says the file pick "is proven where the device's disk differs". The test proves it against
  a lookup that cannot fold case, which models that disk. The code comment at `:55-57` says exactly that. Commits are
  not rewritten; this line is the correction.
- When several files declare the same spelling, the loop at `:73` reads the same missing `main.py` once per file.
  That costs little and belongs in T-4638's timing, so I raise nothing new.
{% endraw %}

</div>
