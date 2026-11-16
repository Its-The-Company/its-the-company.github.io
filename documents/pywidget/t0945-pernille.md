---
layout: "default"
title: "Review: T-0945, the held New widget id refused in any letter case (8c1bbebd, Idris)"
section: "documents"
description: "I also read these files as they are now on personal/b2 (55f7702836). Since 8c1bbebd, WidgetScriptSave.swift changed in T-4280 (newText) and WidgetPlacement.swift in T-4212, T-1442 and T-4440/T-4441. None of those\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0945-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t0945-pernille.md</code></span></div><h1>Review: T-0945, the held New widget id refused in any letter case (8c1bbebd, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, T-4040, 2026-11-16. Independent review (Commandment 13): I read the commit and the code, not the
author's notes. Scope: 8c1bbebd, three files:
- `ios/App/Projects/WidgetScriptSave.swift`: `send` compares `WidgetID.key(id)` with `heldID`.
- `ios/Shared/WidgetPlacement.swift`: two doc comments (an unset Python widget draws the Choose a widget card).
- `ios/Tests/WidgetHeldIDCaseTests.swift` (new).

I also read these files as they are now on personal/b2 (55f7702836). Since 8c1bbebd, WidgetScriptSave.swift changed in
T-4280 (`newText`) and WidgetPlacement.swift in T-4212, T-1442 and T-4440/T-4441. None of those changes touches the held-id
check or the two comments. The test file is unchanged. Line numbers below are for the current files.

**Verdict: PASS with findings.** The fix is correct and small. The test goes red without it; I checked that myself
(below). Neither finding is a crash, data loss, or something App Review would reject, so neither blocks TestFlight. Both
are on one board line, T-4588 (Idris, P3).

## What I checked

**1. The comparison (WidgetScriptSave.swift:182).** `heldID` is `"new_widget"`, which is already its own key.
`WidgetID.key` (WidgetID.swift:72) lower-cases A-Z only, so `key(id) == heldID` matches exactly the ids whose key is
`new_widget`: every ASCII case variant and nothing else. It cannot match a non-ASCII look-alike, and those never get
past `WidgetID.problem` anyway (`isIDScalar` is ASCII only). The check runs before the `widgets == nil` guard and before
`problem`, so the person always gets the New widget message for this id, even when there is no App Group. It also
runs before any id-change bookkeeping. A send that renames an existing widget to `NEW_WIDGET` is refused before
`owned(last)` or a rename, and `last` comes back unchanged. That is right.

**2. Is the case-sensitive comparison anywhere else?** I looked at every Swift and Python use of the held id (grep for
`heldID` and `new_widget` across `pywidget/`):
- `TreeProvider.widgetID`, `WidgetWriter.unsetWidgetID`, `WidgetRunView.widgetID` and `WidgetInstallView.widgetID` are
  the unset id and the Debug test hooks' folder. Nothing a person types is compared with them.
- `TreeDrawable.showsChooseCard` (WidgetPlacement.swift) decides from `chosen == nil` alone. No id comparison, so no
  case question.
- `WidgetWriter.placedIDs` maps an unset widget to `new_widget`, and `source(for:)` finds no script there because no
  send makes that folder. With this fix, no send makes a case variant either.
- `WidgetLibrary.save`, `importScript` and `duplicate` (WidgetID.swift:254-292) do not know the held id in any case.
  This is finding L1.
- Python: `pywidget_ui` does not hold the id, which is right. The template runs under it in the console, and the
  contract says the Swift checks are the lock.

**3. The comments (WidgetPlacement.swift).** Both now agree with the code. An unset configuration draws the Choose a
widget card (`showsChooseCard`, T-0684 b). `resolve` drops only ids that fail `WidgetID.problem`, and a dropped id
leaves the widget unset. The old text ("would turn the widget into the New widget") described the behaviour before
T-0684.

**4. The test.** `testHeldIDRefusedInAnyCase` saves three case variants through the real `WidgetScriptSave.save`
into a temporary `widgets/`. For each one it checks that the outcome is `.refused` with the same id, that the reason
is the New widget one, and that `widgets/` is still empty. It reads the folder back from disk, not a model. The exact
lower-case id is already covered in `WidgetScriptSaveTests.testRefusedWidgetIDsWriteNoWidget`. Small notes, none
worth a line on its own:
- `return XCTFail(...)` stops at the first variant, so a red run names only `NEW_WIDGET`. That is enough to see the
  fault.
- `widgets/` does not exist before the save, so "widgets/ changed" really checks that nothing created the folder.
  Without the fix it is the folder's creation that shows, so the check still bites.
- The doc comment's reason is partly wrong (L2).

**5. Anything that would hurt a TestFlight build.** The test target alone gains one file. The app gains one
`WidgetID.key` call per send, on an id of at most 128 scalars. Nothing new is bundled, signed or linked.

## Test results (tools/xc.sh, XC_TASK=T-4040, iPhone 18 Pro Simulator, XC_LOCAL=1, after `xcodegen generate`)

- As committed: `WidgetHeldIDCaseTests` plus `WidgetScriptSaveTests/testRefusedWidgetIDsWriteNoWidget`: 2 executed,
  0 failures, exit 0 (ops/runs/xcodebuild-20261116-114253.log).
- With line 182 put back to `if id == Self.heldID {` in my working tree only, `WidgetHeldIDCaseTests`: the first try
  ended exit 75 (another run took the Xcode lock; nothing counted). The second try: 1 executed, 1 failure, exit 65.
  The failure was "NEW_WIDGET: saved as wrote(id: "NEW_WIDGET", ...widgets/NEW_WIDGET/main.py), not refused; widgets/
  holds ["NEW_WIDGET"]" (ops/runs/xcodebuild-20261116-114858.log). Afterwards I restored the line with
  `git checkout -- <file>`, and line 182 reads `WidgetID.key(id) == Self.heldID` again.

## Findings

**L1. The held id is held only in `send`, not in the library (T-4588).** `WidgetScriptSave.send` is the only place
that refuses `new_widget`. `WidgetLibrary.save(id:origin:)` is what the contract calls the lock, and it accepts
`new_widget` and every case variant. So do `importScript` and `duplicate`, which call it. Worse,
`WidgetID.userCopyID("new_widget", taken:)` returns `new_widget` itself, because no library ever lists that folder. A
Duplicate of the New widget template would therefore make `widgets/new_widget`. Once that folder holds a `main.py`,
`WidgetWriter.source(for: "new_widget")` would find it, and every refresh pass would run that script for each unset
widget, which only ever draws the Choose a widget card. Today no app path calls `duplicate`, `importScript` or
`copyID` (only tests do), so this is latent. Fix: refuse the held key in `WidgetLibrary.save` for `.user` origin (or
in `WidgetID.problem` when `firstParty` is false), and have `userCopyID` treat the held key as taken. The check in
`send` can then go or stay as the early, friendlier message.

**L2. The test's comment gives a partly wrong reason (T-4588).** WidgetHeldIDCaseTests.swift:4-6 says `NEW_WIDGET`
would be "the same id as widgets/new_widget on a case-insensitive volume and in the library". The Simulator's volume
is case-insensitive. An iPhone's data volume is case-sensitive, so on a device the two folders are separate. The real
clash there is the library key (contract s7) and the id the person sees. Say that, so nobody "fixes" this later by
assuming the folders alias.

Not a finding: a build from before 8c1bbebd could have left a `widgets/NEW_WIDGET` folder. It would still be offered in
Choose a widget and would work as an ordinary own widget. I found nothing that says such a build reached TestFlight, so
I have not put it on the board.
{% endraw %}

</div>
