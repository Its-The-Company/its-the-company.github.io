---
layout: "default"
title: "T-0983: review of T-0517 at 08099f72 (Idris)"
section: "documents"
description: "Verdict: PASS with fixes (behaviour right by reading; the UI proof has no recorded run)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0517-t0983-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t0517-t0983-pernille.md</code></span></div><h1>T-0983: review of T-0517 at 08099f72 (Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-02. Author: Idris. Independent read (Commandment 13).

**Verdict: PASS with fixes** (behaviour right by reading; the UI proof has no recorded run).

## What the line asked

T-0312 slice a, the "Copied 5 lines" HUD over editor lines 1-2 for 1.5 s: confirm non-interactive
(`allowsHitTesting(false)`, never blocks Run/Stop or taps), post a VoiceOver announcement with the same text, keep
the Reduce Motion no-slide rule. Position under the nav chrome accepted.

## Checked

1. **No touch.** `HUDView` ends in `.allowsHitTesting(false)` on the whole subtree (ReplBar.swift:81).
2. **Reduce Motion.** `.transition(reduceMotion ? .opacity : .move(edge: .top).combined(with: .opacity))`
   (ReplBar.swift:76). The no-slide rule holds.
3. **Announcement.** `showHUD` posts the HUD's own text (PyWidgetApp.swift:736) through a seam
   `static var announce` (:731) whose default is the same `AccessibilityNotification.Announcement(...).post()` call
   as before. The seam is main-actor typed, the tests restore it with `defer`. No production change in behaviour.
4. **Unit tests.** `HUDAnnouncementTests`: ok and failure text, Copy All (text equals HUD text, pasteboard equals
   transcript), empty console posts nothing. All three passed in ops/runs/xcodebuild-20261102-093615.log (test case
   lines only). A mutant that drops the `announce` call turns two of them red by reading.
5. **Host suite.** `run_host.py --both` at HEAD 462dc137 (no Python touched; land:host floor only).

## Findings

**L1 (Low, evidence). `HUDHitTestUITests` has no recorded run.** pywidget/ios/UITests/HUDHitTestUITests.swift.
It compiles in two logs in ops/runs (`-093252`, `-140729`), but no log in the repo shows it executed, passed, or the
mutant the commit describes ("no allowsHitTesting(false) plus a tap gesture fails at the editor-focus assertion").
The <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s own logs are gone with its worktree. The line's main ask is "confirm non-interactive", and that proof is
the UI test. Failure scenario: the test is red on the runner for an unrelated reason (the `hasKeyboardFocus` KVC read,
or the HUD's frame not over the editor on a smaller Simulator, in which case the test asserts and stops) and nobody
learns it, because UI tests are not in the land:xc unit run. Fix: one run of this test on the MacBook runner, log
cited in the line, plus the tap-gesture mutant run once.

**L2 (Low, device). The announcement can be cut off on a real device.** Copy All is a menu item; when the menu
closes, VoiceOver moves focus back to the "more" button and speaks its label, which can interrupt an announcement
posted in the same turn. The commit says so and leaves it to a device pass. Fix: add "the HUD announcement is heard
after Copy All" to T-0479's device VoiceOver checks, so it has a home. If it is cut off there, post it after a short
delay, or post an attributed string with `.accessibilitySpeechQueueAnnouncement` set so it queues instead.

## Not findings

- The "Run while the HUD is up" step proves little (the frames do not intersect, asserted just above), but it is
  harmless and documents the "never blocks Run/Stop" half of the line.

Fix line: T-1113 (Idris, P3).
{% endraw %}

</div>
