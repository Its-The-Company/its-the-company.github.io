---
layout: "default"
title: "Review of T-4181 at 8db4535c84: the refresh glyph&#x27;s Lock Screen gate (T-4433) and its three wrappers (T-4435)"
section: "documents"
description: "The code this range adds (T-4435 (a)) is correct and does what it says. Its render test is strong for layout but blind to the button style (L1). Nothing in the range is half-built. But the range does not take the T-4418\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4181-8db4535c-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/t4181-8db4535c-pernille.md</code></span></div><h1>Review of T-4181 at 8db4535c84: the refresh glyph's Lock Screen gate (T-4433) and its three wrappers (T-4435)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4609, Commandment 13). Author: Idris. Reviewed: main at 8db4535c84, which takes in ad226df1f4
(T-4433), 49f0f1e54f (its back-out), 61d2556254 (T-4435) and the records commits 4cac22227b and 8db4535c84. I read
the diffs and `Shared/TreeView.swift` and `Tests/RefreshAgeRendererTests.swift` as they stand at 8db4535c84; this
worktree's copies of those two files and of `state-spec.md` are identical to it (`git diff 8db4535c84 HEAD` is empty
for all three). Date: 2026-11-17.

Runs (iPhone 17e, iOS 27.0 Simulator, local, `XC_TASK=T-4609`):
- `TreeNodesTests`: 53 executed, 0 failures, `testTheRefreshGlyphSitsTheSameInEveryWrapper` passed
  (`ops/runs/xcodebuild-20261117-172520.log`).
- Mutant, `.buttonStyle(.plain)` deleted from `TreeView.swift:689`: the wrapper test still passed, 1 executed, 0
  failures (`ops/runs/xcodebuild-20261117-172700.log`). I restored the file afterwards. See L1.

I did not run the whole PyWidgetTests target. 27.1 has a runtime but no device created, and 27.2 is not installed, so
I ran nothing on either.

## What is in the tree from T-4433: nothing

`ad226df1f4` is the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> copy of the <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> `39afa8c746` (`git diff` of the two patches is byte-identical; 39afa8c746
lives only on `parked/b3/20261116-085447-68429`). `49f0f1e54f` is its exact inverse: the diff of ad226df1f4 and the
reversed diff of 49f0f1e54f compare equal. No later commit up to 8db4535c84 touches those lines again. So at
8db4535c84 the gate, its test changes and the s10 status table are all absent.
`TreeRefreshButton.tap` (`Shared/TreeView.swift:643-653`) still returns `.intent(widgetID:)` for accessoryCircular
and accessoryRectangular in the extension. The board line T-4433 and its notes say so honestly ("backed out, still
open").

## Verdict: PASS with findings. This is not a TestFlight clearance

The code this range adds (T-4435 (a)) is correct and does what it says. Its render test is strong for layout but <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span>
to the button style (L1). Nothing in the range is half-built. But the range does not take the T-4418 M1 hold away,
because the gate is not in the tree. A TestFlight build cut from 8db4535c84 would ship the Lock Screen refresh tap
with none of s10's three checks answered. Until T-4433 lands (gate plus test) or s10's table is full, no TestFlight
build carries this tree (H1).

## What I checked

1. **T-4435 refactor is behaviour-preserving.** `body` now builds `Drawn(tap:)` and puts the `Chosen` preference
   on it (`:672-676`). Before, the preference sat on a `Group` around the same switch. The switch, the `face` and the
   environment it reads (`treeFamily`, `treeOnCard`, `widgetRenderingMode`) moved into `Drawn` (`:680-719`)
   unchanged, apart from `Self.` becoming `TreeRefreshButton.`. The outer view drops the two keys only `face` read.
   Hosted tap tests `:223` and `:270` pass on 27.0, so the preference still reaches `TreeEntryView`.
2. **Widget extension memory and timing.** `Drawn` is a value view with one stored enum and three environment reads.
   It adds no state, no observation, no image and no work at timeline time. `RefreshWidgetIntent` is built per body
   as before. Nothing to measure.
3. **Layout in the three paths.** `wrapped` (`Tests/RefreshAgeRendererTests.swift:325`) draws `Drawn` by name
   top-leading in a 60 pt box, measures its frame with a background GeometryReader and compares the whole render to
   plain. That checks the 44 pt frame, the ink box, centring and every pixel within tolerance 8, in small, medium and
   rectangular, full colour and accented (`:341-366`). Idris's note says a 1 pt Link inset fails it 18 times. An inset
   or a size change on either wrapper cannot pass. accessoryCircular is not in the list, but it has the same `.glyph`
   look and code path as rectangular, so I raise no finding.
4. **What it cannot see.** ImageRenderer in the app host is not WidgetKit. The test comment (`:336-339`) says the
   system's accented recolouring is out of reach, which is honest. The assertion message at `:362` ("no tint, no
   pressed look") claims more than that. See L1.
5. **The backed-out gate, read for when it re-lands.** `guard look(family:) == .circle` gives `.none` for both
   accessory families and for inline, and keeps every system family. Unknown families fall to `.circle`, as before.
   Its test changes <span title="A test written in advance. If it fires, we drop the idea.">kill</span> the obvious mutant (reverting to `!= .none`) at both the static rule and the hosted
   `chosenTaps` read. Sound. But it no longer applies cleanly (H1).

## Findings

### H1. The Lock Screen refresh tap is live at 8db4535c84; T-4433's gate is not in the tree

`Shared/TreeView.swift:643-653` with `:667`: in the extension, accessoryCircular and accessoryRectangular get
`Button(intent: RefreshWidgetIntent(...))` (`:689`). state-spec s10 (`state-spec.md:248`) makes that control
conditional on three checks, and none is answered. T-4418 M1 asked for the gate until they are. ad226df1f4 is that gate
(reviewed above, sound), but 49f0f1e54f backed it out because the whole target had not run. Two facts for whoever
re-lands it:
- `git diff ad226df1f4^ ad226df1f4 | git apply --check` now fails on `TreeView.swift:626`. T-4435 deleted the
  `treeOnCard` and `widgetRenderingMode` lines that the doc-comment hunk uses as context. The board note's "cherry-pick
  ad226df1f4" will stop on a conflict. It is a one-line hand merge. The `tap` hunk and both test hunks still apply.
- The Mac mini now has an iOS 26.0 runtime with three devices (`xcrun simctl list runtimes`, 2026-11-17). The s10
  table's "iOS 26 Sim: not run: no runtime" cells are runnable now. 27.1 has its runtime but no device.
**Fix:** tracked by T-4433 (P1, open); I add no new line, only a note on it. Re-land the gate with the one-line merge.
Run `TreeNodesTests` and the whole PyWidgetTests target on one runtime, and commit when both pass. No TestFlight
build carries the refresh tap until then.

### L1. The wrapper test cannot see `.buttonStyle(.plain)`, and its message says it can

Mutant: delete `.buttonStyle(.plain)` from `TreeView.swift:689`. `testTheRefreshGlyphSitsTheSameInEveryWrapper`
still passes (log above). In the app host, ImageRenderer draws the default-styled Button with the same pixels, because
`face` paints its glyph and circle with explicit colours. In a widget the system's default button style is not
`.plain`. Whether it tints or dims the label is exactly M3 (b)'s open question, and this test would not notice the
style going away. The message at `Tests/RefreshAgeRendererTests.swift:362` and the doc comment at `:337-338` ("A
wrapper that adds ... a tint or a resting pressed look fails here") claim that it would.
**Fix:** pin the two wrapper lines with a source scan, the way T-0430's pin does
(`Tests/PreviewQueueTests.swift`): `Button(intent: RefreshWidgetIntent(widgetID: id)) { face }.buttonStyle(.plain)`
and `Link(destination: url) { face }` inside `TreeRefreshButton.Drawn`. Then prove it with this same mutant. Narrow
the message and comment to what ImageRenderer shows: frame, inset and ink. The widget host's tint and pressed look
stay with M3 (b), which is still open on T-4435.

### Info (no new line)

- **T-4435 is (a) only.** It ran on 27.0 and 27.1 (board note). 27.2 is not installed, and (b) (a placed widget,
  screenshot, one tap, one run row) has not started. The T-4435 line stays open and says so. Before TestFlight, (b) is
  the only check that sees the real wrapper in a widget host.
- **Record.** The back-out's subject names `39afa8c746` (the parked copy), not `ad226df1f4` (the commit on main it
  reverts). The patches are identical and the board note names ad226df1f4, so nothing is lost. Commits are not
  rewritten; this line is the correction.
- T-4418 L4 (`.isButton` on `face`, now `TreeView.swift:715`) is still present and still tracked in T-4436.
{% endraw %}

</div>
