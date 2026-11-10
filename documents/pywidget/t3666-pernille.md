---
layout: "default"
title: "Review: T-3666 launcher set-up sheet over other sheets (T-3680)"
section: "documents"
description: "PASS with fixes. UIKit presentation from the top-most controller is the right fix, and the code is careful about transitions. It is still not proven on the exact tree: no test has run on 0eae5043f (see The rerun)\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3666-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 19 · Mon Nov 9</span><span><code>pywidget/docs/reviews/t3666-pernille.md</code></span></div><h1>Review: T-3666 launcher set-up sheet over other sheets (T-3680)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-09. Commandment 13, independent; pre-release standard (#192: before any launcher premade ships).
Reviewed: Idris 0eae5043f (App/LauncherTapHandling.swift, UITests/LauncherTapUITests.swift, Shared/LauncherSlots.swift and
its tests, docs/design/launcher/tap-path.md). Line numbers are at 0eae5043f. Later commits to the file (T-3758 f84da4aaf,
+6 lines) are not in scope. The packet names UITests/LauncherWindowsUITests.swift: that file is T-3667's (a3415f7c8),
not in this commit, and I reviewed it in T-3692 (t3671-pernille.md).

## Verdict

**PASS with fixes.** UIKit presentation from the top-most controller is the right fix, and the code is careful about
transitions. It is still not proven on the exact tree: no test has run on 0eae5043f (see The rerun). Medium 2, Low 4,
High 0. M1 should land before a launcher premade reaches TestFlight. Its fix also deletes the Debug hook.

## The rerun

No result. I ran `-only-testing:PyWidgetUITests/LauncherTapUITests` on iPhone 17e at a clean clone of 0eae5043f
(XC_LOCAL=1, scratch on the Company SSD). It waited 392 s for the lock behind <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> b. Another waiter then marked it
stalled and took the lock (T-3014), and xc.sh ended it with exit 75, "stalled, not counted". Then tools/ssd_guard.py
refused my read of its log: the SSD had stopped answering. Commandment 14: I stopped there. So the only green run is
still Idris's 134751, which also carried T-3667's `handlesExternalEvents` line. That line routes external URLs to
scenes, and this test sends no URL (the hook goes through scenePhase), so I expect no difference. I have not shown
it. The 11-08 daily full suite (J-20261108-0247) is from before the commit. The scratch clone is still on the SSD:
company-scratch/T-3680-pernille.

## The DEBUG hook

Compiled out of Release. `testURL`, `wasBackground` and the two lines in `onChange` are all inside `#if DEBUG`
(LauncherTapHandling.swift:28-37, 43-46). In the generated project, `SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG` is set
once, in a Debug configuration; no Release configuration sets it. The EditorBench scheme runs UI tests against Release,
but scripts/editor_bench.sh filters to EditorBenchUITests, so this test never runs against a build without the hook. In
a Debug build launched with the argument, every return from the background hands the link over again, not just the
first. That is harmless for one test, but M1 removes the hook anyway.

## What I checked and found sound

- **Red, then green, on the cited logs.** ops/runs/xcodebuild-20261108-133507.log (main checkout) ends with the test's
  assertion at LauncherTapUITests.swift:44, "the Set Up App sheet did not show over the gallery's detail sheet", 1 test,
  1 failure; xcodebuild-20261108-134751.log: 1 test, 0 failures, TEST SUCCEEDED. Both iPhone 17e, `-only-testing`
  the one class. See L4 on the "single sheet" line.
- **Presenting over a sheet** (LauncherTapHandling.swift:102-111). The walk goes to the top-most presented controller,
  skipping one that is being dismissed, and presents from it. UIKit allows a sheet over a sheet, so this is the right
  fix for the SwiftUI one-sheet-at-a-time queue. A fullScreenCover's hosting controller is just another presented
  controller, so the same walk covers it (not tested; see M1).
- **A presentation still moving** (line 104). A top that is being presented or dismissed, or still holds a controller
  that is going away, is retried every 250 ms, up to 12 times. That is what keeps `present` from being called mid-transition,
  which UIKit refuses with a log line and nothing on screen.
- **Replacing an earlier sheet** (lines 98-100). The earlier sheet is dismissed without animation; if its controller is
  still attached when the walk runs, line 104 sends it to retry, so the new sheet never lands on a dying one.
- **Dismissal** (lines 107-109). Cancel, Done and a successful Save call `close`, which dismisses from the sheet's own
  presenter, so only this sheet goes. The UI test checks exactly that: after Cancel the gallery's Done button is back
  (LauncherTapUITests.swift:48-51). `[weak host]` means no retain cycle between the host and its root view. A swipe-down
  closes it too, and `shown` is weak, so nothing is left pointing at a dead controller.
- **One presenter per window** (lines 25, 49, 126-142). The presenter lives in the window's `@State`; the probe hands it
  the window it lands in, and a weak reference keeps a closed window from being held. On iPad, the window that received
  the link is the one that shows the sheet. A link that arrives before the probe has a window (a new scene) waits on the
  same retry.
- **Re-entrancy** is all on the main actor (class is `@MainActor`, retries are `Task { @MainActor }`), so two attempts
  never interleave. The first to present clears `waiting`; the other then returns at line 96.
- **L1-L3 in LauncherSlots** (`.unreadable` has no link field, line 157 `canSave`; the 64 KiB <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>; format 1 only) read
  as the commit says; they are covered by the 23 Core tests, which I did not rerun.

## Findings

**M1. The test skips the real entry point.** A widget tap reaches the app through `onOpenURL` (line 41). The test
goes through scenePhase and the Debug hook (lines 43-46) instead, so nothing on iPhone shows that `onOpenURL` fires
and presents while a sheet is up. T-3667 (a3415f7c8, landed after this commit) registers `pywidget` in Debug builds,
and LauncherWindowsUITests already opens the link with `XCUIDevice.shared.system.open`. That test skips on iPhone.
Fix: open the link the same way in LauncherTapUITests (gallery sheet up, `system.open(launcherLink)`), get one red run
with the old `.sheet` path, then delete `testURL`/`wasBackground` and the doc text about the hook (tap-path.md item 6).

**M2. A second tap can take down a script's prompt without an answer.** PromptDesk presents a script's alert from the
top-most controller too (Device/PromptDesk.swift), so it can land on top of the set-up sheet. A second launcher tap then
calls `old.dismiss(animated: false)` (line 100). Called on a controller that is presenting, UIKit dismisses its
presented child, which here is the prompt alert. Its answer never arrives. I did not check whether PromptDesk notices
an outside dismissal before its timeout. Fix: replace in place, without dismissing. Keep `shown`, set
`host.rootView` to the new sheet, and present only when nothing is shown. Test: a prompt over the set-up sheet, then
a second tap.

**L1. A dropped tap says nothing** (lines 115-117). After 12 retries (about 3 s) `waiting` is cleared, with no log and
nothing on screen. That breaks tap-path.md item 5 ("never silently does nothing"). It is rare: no window, or a
dismissal held open by a finger. Log it with os_log at least, so a TestFlight report can show it happened.

**L2. Two retry chains.** `present` resets `tries` while an earlier retry Task is still waiting. Both chains then call
`attempt`. Everything runs on the main actor, so this is safe, but they share `tries`, so the 3 s cap becomes about
1.5 s. Fix: keep the Task and cancel it in `present`, or only start one when none is pending.

**L3. A swipe-down loses a typed link.** The sheet sets no `isModalInPresentation`/`interactiveDismissDisabled` while
the link field has text, so a swipe throws away a pasted link with no confirmation. Apple's sheets with edits ask
first. Fix: put `.interactiveDismissDisabled(!link.isEmpty)` on the sheet's NavigationStack.

**L4. The cited log does not contain the cited line.** The commit says SwiftUI "logged 'only presenting a single sheet
is supported' (ops/runs/xcodebuild-20261108-133507.log)". That log (main checkout) has the failed assertion at
LauncherTapUITests.swift:44 but no such line. App console output does not go to xcodebuild's log, and a grep of every
xcodebuild-20261108-13*.log finds it in none of them. Tap-path.md item 6 says "the Simulator logged", which may be true,
but no record shows it. Name where it was seen, or keep only the assertion as the evidence.

Not covered by any test, and I did not check them on a device: the set-up sheet over the share sheet
(MeasurementExport's ActivitySheet), over a file importer, over a confirmation dialog shown as an iPad popover, and over
a script's prompt. The code walks all four the same way. M2 is the one where I can see a fault from reading.
{% endraw %}

</div>
