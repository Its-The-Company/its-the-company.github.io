---
layout: "default"
title: "ADR-010: How 1.0 offers the three Shortcut recipes"
section: "documents"
description: "Option (b). The three recipes in pywidget/widgets/recipes/ (next_event, reminders_today, pinned_share) ship in the app bundle. They appear in the Gallery as a &quot;Shortcut recipes&quot; group, and each one opens through\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/decisions/' | relative_url }}">← Decisions</a><a href="{{ '/documents/pywidget/adr-010-shortcut-recipes-in-1-0.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 18 · Sun Nov 8</span><span><code>pywidget/docs/decisions/ADR-010-shortcut-recipes-in-1-0.md</code></span></div><h1>ADR-010: How 1.0 offers the three Shortcut recipes</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: **decided** (T-2896, Ines, 2026-11-08 02:51 ET). Build: Idris, the board line after T-0901.
- Asked by: Pernille in T-2376 (4b123c9b1). Numbering: ADR-008 stays held for the builder ADR (ADR-009 line 3), so this is ADR-010.
- Checked at 0ed644707, plus T-2857's run (cf5a6527c, `ios/Tests/ShortcutRecipeTests.swift`, on <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>/a/20261107-205309-q33 and not on main yet).

## Decision

**Option (b).** The three recipes in `pywidget/widgets/recipes/` (next_event, reminders_today, pinned_share) ship in the app bundle. They appear in the Gallery as a "Shortcut recipes" group, and each one opens through T-0901's editable copy. Option (a), a bundled read-only folder with nothing else, is rejected. (b) needs that folder anyway. It is the floor, not the offer.

## Why

1. **(a) leaves the step that fails in silence.** T-2857's `testLibraryIdMustEqualTheWidgetId` proved it: if a recipe is saved under a library id other than its `ui.Widget` id, the Shortcut still saves, but the widget run finds no widget and draws nothing. The person sees no error. A read-only folder still leaves them to copy the file and name it by hand.
2. **Most of (b) exists already.** `WidgetScriptSave.send` writes `widgets/<id>/main.py` under the id the script declares (`declaredID`, the literal in `ui.Widget("…")`), not under the project or file name. All three recipes declare a literal id. Two gaps remain. First, a send happens only at a boundary (Run, leaving the file), so a fresh copy is not in the library until the person runs it. Second, a send to an id that already exists replaces that widget ("the later save wins", WidgetScriptSave line 9). R4 and R5 close both gaps.
3. **Simpler than a premade copy.** The recipes import only `pywidget_ui` and `pywidget.context`/`files`, which are in the runtime. None of them imports `_premade`, so T-0901's `_premade` fix is not needed for them. (A note for Idris: a premade copy's id comes from `make()` at run time, so `declaredID` returns nil for it. That question belongs to T-0901, not to this ADR.)
4. **App Review and scope.** The code is in the binary and the person can view and edit all of it (ADR-001 risk row 2.5.2; ADR-006 13.6: nothing downloaded, nothing shared). It keeps PROPOSAL-002 s6's promise ("Free premades open as editable source") and adds no feature beyond B-staged item 8 (v1_scope `shortcut-recipes`).

## Build requirements

- **R1 Bundle.** A build phase copies `pywidget/widgets/recipes/*.py` to `Runtime/recipes/`. That folder is the one source, read-only, with no caches. One sample tree per recipe also ships, made from the inputs in `tests/widgets/test_shortcut_recipes.py`.
- **R2 Group.** The Gallery shows a section headed **Shortcut recipes** after the premade <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>, with three tiles: Next event, Due today, Pinned (each from its `ui.Widget(name=…)`). Each tile draws its bundled sample tree under the existing `st.sample` line, with no preview run, because a recipe has no data until its Shortcut runs. One line sits under the heading (draft, Maren's copy): "Each shows what a Shortcut sends it. The steps are in the guide." The recipes are not counted among the 12 premades, and the store text does not change.
- **R3 Free.** All three recipes are Free, with no Pro chip and no lock. The widget redraws when the Shortcut's Refresh Widgets runs, which is free (v1_scope `pro-placement`). Pro's background refresh is not involved.
- **R4 Open makes the copy and saves it at once.** Open source goes through T-0901's path. It creates a new project named after the tile (ProjectStore's clash naming). The project's `main.py` holds the bundled bytes exactly. The copy is then sent once through `WidgetScriptSave` straight away, so `widgets/<id>/main.py` exists before the person leaves for Shortcuts.
- **R5 Id match.** The library id is always the id the script declares, never the project name or the file name.
- **R6 Name taken.** Before writing, the copy checks `WidgetLibrary.ids()` by `WidgetID.key`, which ignores case. If the id is held, the existing widget stays as it is. The copy rewrites its one id literal to the first free `<id>_2`, `<id>_3`, and so on, and the sheet says so (draft): "You already have a widget called next_event, so this copy is next_event_2. In your Shortcut, choose next_event_2 in Run Script with Input." If the send is refused for any other reason, the sheet shows the refusal line and the project copy stays. One simplification is allowed if the rewrite proves risky: refuse the copy with the same message. A silent overwrite is never allowed.
- **R7 Unchanged.** The bundled recipe never changes. The copy survives an app restart, as T-0901 requires.
- **R8 Guide.** Section 9.5's sentence "The app does not offer these scripts as ready-made starting points yet" is replaced by the Gallery route in the same commit. The [unverified] note on whether the name must match is replaced by T-2857's answer.

## The test that proves it (Done)

- **<span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span>** (XCTest, temporary App Group). For each recipe, with an empty library: copy it, then check that `widgets/<id>/main.py` matches the bundled file byte for byte before any edit. Then run RunScriptWithInputIntent with T-2857's sample text, and the Refresh Widgets run. The tree must show that text, as in ShortcutRecipeTests.
- **T2** (XCTest, name taken). `widgets/next_event/` already holds a sentinel `main.py`, and a second case uses `Next_Event`. The copy must land in `widgets/next_event_2/`, its `declaredID` must be `next_event_2`, the sentinel must be unchanged byte for byte, and the message must name both ids. One more case: with `_2` also taken, the copy gets `_3`.
- **T3** (UI test). The Gallery shows the Shortcut recipes heading and three tiles. Tapping Next event, then Open source, puts the copy in the editor. Screenshots in light and dark go to `ops/site-checks/`.
- **T4.** `Runtime/recipes/` is unchanged after T1 to T3, and `tools/xc.sh` is green.

## Date, and what would make this fail

The build is about 0.5 day on top of T-0901, inside B-staged item 8's day. T-0901 (P1, after T-0191's gallery) must land by 2026-11-25 to leave room before the Day 40 freeze (2026-11-30). **If it misses:** the group does not ship, and 1.0 offers the recipes through the guide only (9.5: paste the script in and save it under its id). The store text then claims no recipes inside the app. The date does not move for this.

## Rules checked

- **Gate 2 (creative identity): no approval needed.** "Shortcut recipes" is the app guide's own heading (9.5). The group uses the approved gallery components and tokens (creative/approved.md entry 2: "screens, states and widgets drawn from these tokens" need no further approval). Its strings join the gallery's draft table. If a store screenshot shows the group, it goes with the screenshot ask already open.
- **C6.** The recipe code and text are the company's own (Pernille, 4b123c9b1). Apple's action names appear only as names in the guide, still marked unverified until T-0757. The sample trees are drawn by code. No outside asset is used, so nothing is added to the asset log.
- **C58.** No outside page was read for this decision, and no outside text gave an instruction.
{% endraw %}

</div>
