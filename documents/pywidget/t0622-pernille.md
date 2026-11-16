---
layout: "default"
title: "Review: T-0622, one appearance flag for the editor bench (50a8e26197, Idris)"
section: "documents"
description: "Verdict: PASS with findings. The change is the F2 fix, whole, and it still stands at HEAD. There is one flag, one parser and one Debug guard. The Release binary no longer carries a style switch: I built it and checked\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0622-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t0622-pernille.md</code></span></div><h1>Review: T-0622, one appearance flag for the editor bench (50a8e26197, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, T-4048, 2026-11-16. Independent review (Commandment 13): I read the commit and the code, not the
author's notes. Answers my own T-0619 F2 (pywidget/docs/reviews/t0617-ui-style-review-pernille.md:62-72), which
asked for exactly this change, so read me as the person who asked for it and check the bias.

Scope: `git show 50a8e26197` (a cherry-pick of c34d7d11cf, 2026-11-04): App/Editor/EditorBench.swift,
App/SceneFile.swift, UITests/EditorGateUITests.swift. I also read, at personal/a3 HEAD (2490e78504), what it now
leans on: UITestStyle (App/SceneFile.swift:104-189), its install call (App/PyWidgetApp.swift:24-27), the launch
helper (UITests/UITestLaunch.swift:16-21) and `keep`/`ShotPixels.assertDrawn` (EditorGateUITests.swift:24-35,
UITestLaunch.swift). No commit after 50a8e261 touches the three reviewed files (`git diff 50a8e26197 HEAD` on them is
empty). PyWidgetApp.swift and UITestLaunch.swift have changed since (T-4219 marks, T-4212 `safari()`), not in the
parts this change uses. Line numbers are HEAD's.

**Verdict: PASS with findings.** The change is the F2 fix, whole, and it still stands at HEAD. There is one flag,
one parser and one Debug guard. The Release binary no longer carries a style switch: I built it and checked the
bytes. Light and dark go through the same path. The A2c assertions still prove the appearance, through the kept
shots' pixel check. One Low finding: two comments went stale (L1). One gap in evidence: the A2c runs the commit cites
are not on this machine, and no A2c run since the change is on record here. I queued one. Nothing here blocks
TestFlight.

## What I checked

**1. The change does what F2 asked.**
- `expectedStyle` (EditorBench.swift:35-41) is `UITestStyle.requested` under `#if DEBUG` and `nil` otherwise. The
  `#if` is needed and correct: `UITestStyle` sits inside SceneFile.swift's `#if DEBUG` block (:104 to :189), and
  EditorBench.swift compiles in Release because the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span> timing runs use a Release build (PyWidgetApp.swift:68).
- The bench's `viewIsAppearing` override is gone. The window now takes its override from UITestStyle's
  `UIWindow.didBecomeVisibleNotification` observer (SceneFile.swift:178-188). That observer is added in
  `PyWidgetApp.init` before the first window exists, so it runs earlier than the old hook did. The bench is a
  WindowGroup root (PyWidgetApp.swift:87-89), so its window gets the override.
- The bounded wait remains (EditorBench.swift:98-109): up to 30 s for `window.traitCollection.userInterfaceStyle`,
  then `error` if it never arrives. `style_by` is now `"ui-style"` (:104).
- A2c launches with `XCUIApplication.pywidget(style:)` and appends with `+=` (EditorGateUITests.swift:165-166), so
  `-ui-style <style>` survives. The old `=` would have wiped it. `PW_FRESH_SCENES=1` is set in both versions (the
  default `fresh: true`), so the launch environment did not change.

**2. Callers of the old flag.** `git grep` for `editor-bench-style`, `editor-bench-expect-style`,
`"window override"` and `style_by` across the repository finds no live caller in Swift, UITests, `tools/`,
`pywidget/ios/scripts/` (editor_bench.sh, editor/g1_summary.py) or the docs. The only hits are records: log/board-
archive.md:1492-1493 and :3807, ops/merge-queue/2026-11-05-<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>-sweep.json, ops/queue_audit/ledger.jsonl:28 and
my T-0619 review. Those are history and should stay as they are. EditorBenchUITests.swift:17 launches the timing
bench with `["-editor-bench"] + extra` and never passed a style. Nothing reads `style_by` except A2c.

**3. Light and dark behave the same.** One parser (SceneFile.swift:152-156): `"dark"` gives `.dark`, `"light"` gives
`.light`, anything else gives nil. One setter for both. One wait for both. A misspelt style (`"Dark"`) gives nil.
The bench then skips the wait and writes no `style_by`, so A2c fails at :178 and does not pass quietly. A Release
build with `-ui-style` behaves the same way. The two halves together cover the mechanism. When the Simulator's
system appearance is light (the default), only the dark half exercises the override. If an earlier run left the
system dark, the light half does it instead. Either way, a broken override fails one of the two. This is the same
N-level gap I accepted in T-0619, and the change does not widen it.

**4. Are the UI test's assertions still meaningful? Yes.**
- `style_by == "ui-style"` (:178) is a constant, written only inside the `expectedStyle != nil` branch. It proves
  that a Debug build read the flag and waited for the window, nothing more. Before the change it was the same
  constant, `"window override"`. No meaning was lost.
- `px["style"] == style` (:179) reads the editor view's own trait. The keyword, string and comment pixel counts
  (:180-182) are matched against that trait's theme colours, and those differ by far more than the 12-per-channel
  tolerance between light and dark.
- What binds the result to the picture is `keep(app, ..., style: style)` (:183, :193, :201). It runs
  `ShotPixels.assertDrawn` on the real screenshot (EditorGateUITests.swift:27-30): the app must be in the
  foreground, the frame must not be blank, and the dark share must be over 60% for dark or under 40% for light. A
  wrong-appearance or blank shot fails there, and that check does not depend on the bench's own report.

**5. Debug only, checked in the binary (show me the bytes).** I ran `strings -a` on the Release build below
(PyWidget, 25,019,040 bytes). `-editor-bench-style`, `-ui-style`, `ui-style-live`, `UITestStyle`, `style_by` and
`window override` each appear 0 times. The Debug build's PyWidget.debug.dylib has `-ui-style` 4 times and
`-editor-bench-style` 0 times. The style switch that T-0619 found in the Release binary is gone.

## Runs

- `xcodegen generate` in pywidget/ios: no tracked file changed.
- Release, `XC_TASK=T-4048 tools/xc.sh -scheme PyWidget -configuration Release -destination 'generic/platform=iOS
  Simulator' build`: exit 65. The Legal links check stops a Release build that has no privacy URL (T-0497, by
  design), and no Swift was compiled (ops/runs/xcodebuild-20261116-114554.log). This is not about this change.
- The same build with `PW_EDITOR_BENCH=YES` (the bench's own Release route, where that check only warns): first try
  exit 65 on RunestoneEngine.swift:166/:277 (`lineNumberMarks`), because this worktree's gitignored
  Vendor/Runestone was older than patch runestone-0003 (T-4256). EditorBench.swift was in the same whole-module
  compile and had no error (ops/runs/xcodebuild-20261116-115333.log). I re-vendored with `scripts/fetch_editor.sh`
  (`--offline` failed for lack of a cached tarball; the clone route from the cache passed). The rebuild exited 0
  (ops/runs/xcodebuild-20261116-115805.log).
- Debug `build-for-testing` (app, PyWidgetTests, PyWidgetUITests), generic iOS Simulator: TEST BUILD SUCCEEDED,
  exit 0 (ops/runs/xcodebuild-20261116-120110.log).
- A2c on a Simulator: **nothing ran.** xc.sh queued it as a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> job, exit 75
  (ops/lane-outbox/a3-1794848982847465000-160.json). That job is a full xc-test run on the MacBook runner, made on
  main when personal/a3 lands. My iPad request was folded into the same job, so it is not a separate iPad run.
- The evidence 50a8e26197 cites, ops/runs/xcodebuild-20261104-150126.log (iPhone 17e) and -151809.log (iPad Pro
  11-inch (M5)), is not on this machine. ops/runs/*.log is gitignored, and neither run is in ops/metrics. The only
  runner job since then that contains the change, J-20261110-1924-xc-test-2, ran PyWidgetTests only. I cannot
  confirm "A2c green" from the records here. The queued job will.

## Findings

**L1 (Low, stale wording): `App/SceneFile.swift:147-148`, `UITests/EditorGateUITests.swift:159`.**
- SceneFile's doc now reads "(T-0585; the editor / editor bench reads this same flag)", with the word doubled across
  the line break.
- A2c's comment still says "the appearance is the bench window's own override". Since this change, that override
  belongs to `-ui-style` and is set on every window by UITestStyle. The next person to debug a light iPad shot
  will look in EditorBench.swift for a hook that no longer exists.
- Fix: correct the doubled word, and rewrite the comment as "the appearance is `-ui-style`'s per-window override
  (UITestStyle), not XCUIDevice's system switch".

## Notes (no change asked)

- N1: A Release bench launched with `-ui-style dark` is now ignored without a word. Nothing does this:
  editor_bench.sh and EditorBenchUITests pass no style. If someone tries it, the result's `trait_start` shows the real
  appearance, and there is no `style_by`.
- N2: The other tests share the A2c pattern. EditorGateUITests' own `launch` helper (:37-42) still assigns
  `launchArguments =`. It passes no style today, so nothing breaks. If a style is ever added through
  `pywidget(style:)` there, it will be wiped. This is outside T-0622.
- N3: UITestLaunchScanTests could ban `-editor-bench-style` the way it bans `XCUIDevice.shared.appearance`. With zero
  callers and the parser gone, it is not worth a line.

## Board lines

L1, plus quoting the queued A2c result: **no board line.** `python3 tools/board_tick.py add` refused it (exit 2:
"links: T-4591: names T-0622 in its text with no link; add 'part of' or 'needs' for each, or write it as plain
provenance 'from T-X'"). Under my rule that a refusal stops the item, I did not reword it and send it again. The
Operator can file it: owner Idris, P3, targets App/SceneFile.swift and UITests/EditorGateUITests.swift. The text is
L1 above and "quote the A2c result of lane job a3-1794848982847465000-160".
{% endraw %}

</div>
