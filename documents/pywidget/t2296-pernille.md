---
layout: "default"
title: "Review: T-2296, gallery family pager and iPad two columns (a0d9f23b5f, 42242b49dc, 4dfd8f3657; Idris)"
section: "documents"
description: "Plain: Idris&#x27;s change lets each gallery tile page through the sizes its widget comes in (swipe, or tap a dot), shows only the sizes iOS draws tinted when Vibrant is chosen, and lays the gallery out in two columns on an\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2296-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t2296-pernille.md</code></span></div><h1>Review: T-2296, gallery family pager and iPad two columns (a0d9f23b5f, 42242b49dc, 4dfd8f3657; Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, T-4060, 2026-11-16. Independent review (Commandment 13). I read the T-2296 board line and
ops/board_notes/T-2296.md; IDE spec s5.9 (9.2 in full, and 9.1, 9.5-9.8 and 9.11 where the slice touches them);
the diff of a0d9f23b5f (GalleryPager.swift, GalleryView.swift, GalleryPagerTests.swift, GalleryUITests.swift); the
outbox note in 42242b49dc and the memory in 4dfd8f3657; the four files as they stand on personal/a2 at c629f78f8b;
and the <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> ref the 11-11 merge reset names. Test runs: see "Runs" at the end.

Plain: Idris's change lets each gallery tile page through the sizes its widget comes in (swipe, or tap a dot), shows
only the sizes iOS draws tinted when Vibrant is chosen, and lays the gallery out in two columns on an iPad. The
logic matches the design spec and its tests catch every bug I planted. Three things need follow-up: the board still
says this part is unbuilt, VoiceOver now reads a tile as several pieces, and the iPad has had no Simulator check.

**Verdict: PASS with findings.** Nothing here blocks TestFlight on its own; M1 is a records error that would make
someone redo merged work, and M2 is an accessibility gap that must close before the Gallery ships.

## What I checked

**1. The pager's rules (GalleryPager, against 9.2 "Family pager").**
- Order = the premade's `families` list, in Full colour and Accented: `pages` returns it unchanged. Correct.
- Vibrant pages only Small and the Lock Screen families (`accessory*`): the filter is exactly that. Correct.
- Decision 1 (no Small, no Lock Screen family: keep the first family in Vibrant) goes past the spec, which says
  medium and larger never meet vibrant; it is documented in the header and no bundled premade meets it (every one
  claims Small; testEveryBundledPremadeFitsItsWells asserts a Vibrant page exists for each). Acceptable.
- "Per tile, remembered for the session": GalleryPageMemory is one store for the app's run, keyed by premade id,
  outside the screen, so leaving the Gallery keeps it. Decision 2 (a page hidden by Vibrant comes back in Full
  colour) is the right reading of "remembered", and the TabView setter writes only a real turn, so the settle after a
  mode change does not overwrite it.
- "Changing mode or family never starts a run": the pager draws `model.tree(id)` or the sample for every page; the
  mode is a plain property; the only run start is the screen's `.task { runAll() }`. Correct.

**2. The family line (9.2 Tile, 9.11 `fam.*`).** Lock Screen families say `fam.lock` ("Circular · Lock Screen") in
every mode, Small in Vibrant says `fam.standby`, Large and Extra large say `fam.half` and draw at 0.5, everything
else its `fam.*` name. The strings in GalleryStrings match 9.11 word for word (`fam.half`, `fam.lock`,
`fam.standby`) and s5.7's Where It Shows table (`fam.small` ... `fam.inline`). Dots only when there is more than one
page; the selected dot carries `.isSelected`.

**3. The tile and the well.** Well 194 high, radius 16, the tile's width, `bg.sunken`; Large at 50% fits (338 x 354
at 0.5 is 169 x 177). The well left the tile's button so the TabView's swipe and the dots get their touches; a tap
on the well and the name row both open the detail sheet, so "the whole tile opens the detail sheet" still holds for
touch. The family line and the state line do not open it (dead space, not wrong). See M2 for what this did to
VoiceOver.

**4. iPad layout (GalleryLayout, against 9.2 "iPad").** Margins 20, gap 20, tiles `min(395, (w - 40 - 20) / 2)`:
870 gives 395, 820 (portrait, sidebar collapsed) gives the spec's 380. Two columns only on a regular width of at
least 736 pt (2 x 338 + 20 + 40), so Medium is always at 100% (decision 3; testTwoColumnsOnlyWhenMediumFits sweeps
500-1400). Title inline and a 360 pt mode switch in the trailing toolbar on regular width; full-width switch under
the large title on compact. Matches "title and a 360-wide mode switch on one line". Not done and not claimed: the
sidebar's Gallery row (the Gallery is still reached from More on both devices).

**5. Since a0d9f23b5f.** GalleryView.swift changed in T-3671, T-3762, T-4468 slice 2 and T-4515 (widget-tap
routes, the settings Page row); each only adds `openWithPage = false` to the two open actions and new detail-sheet
code. The pager, family line and layout are on main unchanged. T-4091 (a68c57e6e1) already fixed one knock-on of
this slice: testPermissionTileShowsSampleAndAllow swiped the tile's button, which is now only the name row.

**6. The tests and the mutants.** GalleryPagerTests (10) pin every rule above, including the bundled catalog's
fit in the narrowest tile. testFamilyPagerSwipesAndRemembers swipes Small to Medium, checks Vibrant hides Medium and
says StandBy, checks Medium comes back in Full colour, and taps a Lock Screen dot. I planted 13 mutants in a scratch
copy of GalleryPager.swift; all 13 die (Runs, item 3).

## Findings

**M1 (Medium, records): the board says the pager and the iPad columns are still to do, and that the work was never
merged. Both are untrue.**
a0d9f23b5f reached main on 2026-11-10 5:26 AM ET (committer date; 8dafc46934 "<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> records applied" follows it). The
11-11 merge reset note on T-2296 says "its finished work waited 2.1 days unmerged" and points to
refs/archive/parked/b2/20261109-094606-61656; that ref (bd8bcdea98) holds one file, a renderer PNG, not the slice.
The board line's Title text still opens with "the family pager (9.2 ...); iPad two columns of 395 pt tiles and the
360 mode switch (9.2)" as open work. Whoever takes T-2296 next would redo merged code. This is the same pattern I
found on T-1972 in T-4046. Board: a note on T-2296 saying what is on main and what is left.

**M2 (Medium, accessibility): a tile is no longer one VoiceOver element, and nothing on the board owns 9.7 or 9.8.**
9.7 says each tile is one element (label, the premade's own value, trait `.adjustable` to page families with the
dots hidden, custom actions). Before this slice the tile was one button (well and name inside); now VoiceOver meets
the well as its own element (GalleryWell's combined children, with no action, so a double-tap on it does not open
the sheet; the `.onTapGesture` sits on an ancestor), then one button per dot ("Small", "Medium", ...), then the name
row button, whose value is `String(describing: tile.state)` (a debug word such as "live", which predates this
slice). The adjustable action and the AX-size `fam.menu` / `mode.menu` (9.8) are not built, and neither the T-2296
line, its notes, nor any other open line lists them. Fix, on T-2296: wrap the tile in one
`.accessibilityElement(children: .ignore)` with 9.7's label and value, `.accessibilityAdjustableAction` turning
`memory.choose`, the dots `.accessibilityHidden(true)`, `.accessibilityAction` for open and for the state's button;
keep `gallery.tile.<id>` on that element so the UI tests still find it; then 9.8's menus. Board: in the T-2296 note.

**L1 (Low): an iPhone Pro Max in landscape gets the iPad layout.**
GalleryLayout keys on the horizontal size class, and the app declares orientations only for iPad
(`UISupportedInterfaceOrientations~ipad`), so iPhone uses the system default, which includes landscape. A Max-size
iPhone in landscape reports a regular width and a content width over 736 pt, so it draws two columns and moves the
mode switch into the bar; 9.2 says iPhone is one column. Read from the code, not run. Medium still fits at 100%, so
it is not broken, only off-spec. testIPhoneOneColumn's case `columns(width: 932, regular: false)` labels a
compact 932 that no device reports. Fix: either pass `idiom == .pad` with the size class, or record the choice as
decision 4 and fix the test's label.

**L2 (Low): two promises have no test.**
(a) "Remembered for the session" across leaving the Gallery: the UI test never pops and re-enters, and a
`GalleryPageMemory()` per view instead of `.session` would pass every test. (b) A tap on the well opens the detail
sheet (the well's own `.onTapGesture`, now that it is outside the button): no test taps the well. Fix: extend
testFamilyPagerSwipesAndRemembers (Back, re-enter from More, line still "Medium"; tap the well, `gallery.detail`
exists).

**L3 (Low, remainder): the open list misses three items that the code's header lists.**
GalleryView.swift's header says what is "Left on T-2296": the tab bar item and the iPad sidebar row are there; the
board line names neither (the 11-09 note names the sidebar row only). Also missing from the line: the iPad Simulator
screenshot of the two columns, which the note names. And "screenshots per premade/family/mode (runner needs the
commit on main)" is no longer blocked: the commit is on main. Board: in the same T-2296 note.

## The remainder, checked

Against the board line and the 11-09 note, still open on main today, each confirmed by reading the code: the detail
foot (`pro:e.add`, `pro:e.unlock`, `src`; the detail sheet has only Done and the settings row) and the add-to-home
sheet (9.5, 9.6; no `e.add`, `e.unlock` or `src` in the Gallery code); the string table (GalleryStrings is still an
in-code dictionary; pywidget/ios/Localization/Localizable.xcstrings has none of the gallery strings); the
foreground rerun over `stale_after` (T-1135; no scene-phase hook in the Gallery folder); the Pro purchased screen's
onDoneAction to the Gallery and its UI test; family point sizes on the Simulator (GalleryFamily still `[est]`, one
390 pt iPhone table used on iPad too); the screenshots; mutants for GalleryFace and the sample-tree copy
(GalleryPager's are now done, below). One item is out of date: "GalleryUITests/testPermissionTileShowsSampleAndAllow
not yet run" ran green under T-4091 (a68c57e6e1, iPhone 18 Pro, Motion & Fitness reset). With M2 and L3 added and
that item struck, the list is true.

## Runs

1. `xcodegen generate` in pywidget/ios. `XC_TASK=T-4060 tools/xc.sh ... test` from the lane: exit 75, queued as a
   MacBook job that is created only when this branch lands (ops/lane-outbox/a2-1794860297205911000-56435.json; the
   runner runs the full suite). Not counted.
2. `XC_LOCAL=1`, destination `name=iPhone 17`: exit 70, no device matched, nothing ran
   (ops/runs/xcodebuild-20261116-153127.log). Not counted.
3. `XC_LOCAL=1 XC_TASK=T-4060 tools/xc.sh -project PyWidget.xcodeproj -scheme PyWidget -destination
   'platform=iOS Simulator,name=iPhone 18 Pro' test -only-testing:PyWidgetTests/GalleryPagerTests
   -only-testing:PyWidgetUITests/GalleryUITests/testFamilyPagerSwipesAndRemembers`, about 3:50 PM ET: **exit 0,
   11 executed, 0 skipped, 0 failures** (10 GalleryPagerTests, 1 UI test in 27.3 s)
   (ops/runs/xcodebuild-20261116-154608.log).
4. Mutants: GalleryPager.swift copied with stubs of GalleryModel.Mode, GalleryStrings (the `fam.*` rows) and
   GalleryFamily into a scratch SwiftPM package outside the repo, with GalleryPagerTests minus
   testEveryBundledPremadeFitsItsWells (it reads the app bundle's catalog). `tools/mutation_check.py`: baseline 9
   green; **13 of 13 KILLED**: Vibrant filter off (4 failures), Vibrant fallback empty (1), remembered page shown
   when hidden (2), StandBy in Accented (1), Large at full size (3), 736 threshold strict (2), no 395 <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> (3), iPad
   margin 16 (3), Large named Medium (1), choose forgets (4), Lock Screen line dropped (3), compact gets two columns
   (1), Accented filtered like Vibrant (2). (The first form of the filter mutant, `true`, did not build; rewritten as
   `!$0.isEmpty`.) Not mutated: GalleryView's drawing (the UI test covers swipe, Vibrant, dot) and the M2/L2 gaps.
{% endraw %}

</div>
