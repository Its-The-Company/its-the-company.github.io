---
layout: "default"
title: "Store capture list, version 1.0 (T-1125)"
section: "documents"
description: "Pro mark, guideline 2.3.2: an image that shows paid content must say so. Every premade on screen in this set is free (premades 1 to 5), so no shot needs a mark. draw_store.py fails any shot that draws a premade outside\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/capture-list.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/design/store/capture-list.md</code></span></div><h1>Store capture list, version 1.0 (T-1125)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-02. Proposal for the single Investor review of the store page and shots (<span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>). Source: `draw_store.py` (SHOTS), scope from `ops/v1_scope.json` (as_of 2026-10-29) and `pywidget/widgets/premade/catalog.json` (12 premades; the first five in its order are free, seven are Pro).
Today every shot is a code-drawn frame (marked PROPOSAL on the image). The shipped set is Simulator captures: `draw_store.py OUTDIR --capture DIR` takes `DIR/<id>.png` (e.g. `1-editor.png`) and composes it in the same layout. No generative images (Commandment 9).

Pro mark, guideline 2.3.2: an image that shows paid content must say so. Every premade on screen in this set is free (premades 1 to 5), so no shot needs a mark. `draw_store.py` fails any shot that draws a premade outside that set. A later shot with a Pro premade needs a visible "Pro" mark on it.

## iPhone 6.9-inch (1320 x 2868), 7 shots


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: iPhone 6.9-inch (1320 x 2868), 7 shots, scrolls sideways" style="--tw:1211px" markdown="1">

| id | 1.0 screen (v1_scope id) | Reached in the Simulator | Premade or example on screen | Pro mark |
|---|---|---|---|---|
| 1-editor | Editor after a run (editor) | AppPicturesUITests `testEditorAndConsoleWithASampleScript` (`PW_SOURCE`); the sample is the rides.csv script, so its source must be set to match | csv_summary (example) | none, no premade |
| 2-home | Home Screen with widgets (widget-by-tap) | Not built, waits on T-0512 [a tap places a written widget, no test hook]. Premades alone could be placed by hand on a device; Simulator needs T-0512 | Countdown, Sunrise and sunset, Steps and floors (free 1 to 3 shown with two more free) | none; free only |
| 3-widget-code | Editor on a widget's source (editor, premades) | `PW_SOURCE` launch state with the countdown snippet (as 1-editor); opening a premade's source from the gallery waits on T-0191 [gallery screen] | Countdown source | none; code only |
| 4-console | Console with table output (runtime) | AppPicturesUITests `testEditorAndConsoleWithASampleScript` (console-after-run) | csv_summary (example) | none, no premade |
| 5-traceback | Failed run, folded traceback (traceback-taps) | Failed run in the console is reachable now; the tappable frames wait on T-0389 [traceback frames open the file at the line] | none | none |
| 6-forms | Native form sheet (prompts) | Not built, waits on T-0447 [native prompts, Swift half] | password_generator (example) | none, no premade |
| 7-lock | Lock Screen widgets (widget-by-tap) | Not built, waits on T-0512; 7 is optional in the set | Countdown, Sunrise and sunset, Steps and floors (accessory families, free) | none; free only |

</div>


## iPad 13-inch landscape (2752 x 2064), 2 shots


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: iPad 13-inch landscape (2752 x 2064), 2 shots, scrolls sideways" style="--tw:1176px" markdown="1">

| id | 1.0 screen | Reached in the Simulator | Premade or example on screen | Pro mark |
|---|---|---|---|---|
| 1-split | Sidebar, editor and the widget preview pane (ipad, previews) | iPad destination: sidebar and editor are in the app; the preview pane waits on T-0192 part A [editor preview pane]; the iPad run waits on T-0556 [iPad pictures] | Countdown source with its preview (free premade) | none; free only |
| 2-console | Editor and console side by side (ipad, runtime) | SceneWindowsUITests and AppPicturesUITests on an iPad destination; T-0572 [iPad console] is done; the pictures wait on T-0556 | csv_summary (example) | none |

</div>


## Changes, T-2374 (c) (Maren, 2026-11-04): the iPad preview shot comes back

- B-staged (#142, <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> note 2026-11-04 10:03 PM ET item 5) puts the editor preview pane back in 1.0 (T-0192 part A). So **iPad 1-split** gets its preview column back, the layout it had before ADR-001's cut: sidebar, editor, and the widget preview pane beside it, in A Paper light. The editor holds the Countdown premade's source (was csv_summary), so the pane has a widget to show. Caption back to **"Write a widget and / see how it looks"** (DRAFT C51; it is true again). "A sidebar, a split, / and your keyboard" retires; the shortcut list drops out of the set.
- **Where on the store page:** iPad slot 1, first of the two iPad shots, ahead of 2-console. On the page (store-page-draft.md, Wrenna's file, not edited here) it is the shot behind the description's iPad sentence ("On iPad: a sidebar, a split editor"), which can now add the preview. Gate: T-0192 part A on main; if the Fallback in the chair note moves the preview pane to 1.1, this shot reverts to the shortcut-list version above and its caption.
- iPhone 3-widget-code is unchanged in this task (code only). The same pane could come back under it on iPhone; that is a choice for the Day 41 packet, not drawn.
- `draw_store.py` still draws the shortcut-list frame; its 1-split entry is redrawn on the continuation line (T-2374 continuation, board).

## Changes in this task

- 3-widget-code lost its Widget preview pane (editor preview pane T-0192 is 1.1). The screen is now the editor at full height on the same code. Caption unchanged: "Every widget is / Python you can edit".
- iPad 1-split showed the preview column, so it is replaced by the sidebar and editor with the shortcut list. Its caption "Write a widget and / see how it looks" promised the preview, so it needs new words. Proposed: "A sidebar, a split, / and your keyboard". This is the only caption change, for the Investors to confirm at the review. T-0261 [store captions] should read it before touching iPad 1.
- Install from file and the share extension were never on a shot (DENY holds "Send to Home Screen" and "Share sheet action"; screen text is checked for them).
- Open: the Gallery (T-0191) may go to 1.1 on F6's verdict (T-0624 [Pro strings]). No shot shows the Gallery, so that verdict changes nothing here beyond the 3-widget-code route above.
- Checks: `draw_store.py` 0 faults (18 frames, both layouts), `test_money.py` green.
{% endraw %}

</div>
