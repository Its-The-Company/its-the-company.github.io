---
layout: "default"
title: "Run screen and stop-and-open confirmation (T-0450 slice 1)"
section: "documents"
description: "Sheets, drawn by draw_run_screen.py (imports draw_ide.py, no image model): A-run-phone.png, A-run-ipad.png (light, A Paper), B-run-phone.png, B-run-ipad.png (dark, B Studio). QA: qa-run-screen.json (4 sheets, 28 frames\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/run-screen.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/design/ide/run-screen.md</code></span></div><h1>Run screen and stop-and-open confirmation (T-0450 slice 1)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-10-27. <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Ruling</span>: ADR-001 chair ruling 2026-10-27 10:05, s1 and s5. Build spec for T-0449 (Idris reads before building). Layout and states are spec; every string is DRAFT <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>. Slice 2 (Make App flow, Add to Home Screen walkthrough): [`home-setup.md`](home-setup.html) (T-0503).

Sheets, drawn by `draw_run_screen.py` (imports `draw_ide.py`, no image model): `A-run-phone.png`, `A-run-ipad.png` (light, A Paper), `B-run-phone.png`, `B-run-ipad.png` (dark, B Studio). QA: `qa-run-screen.json` (4 sheets, 28 frames, 0 clipped, truncated, overlapping or under-11 pt texts; min contrast 4.86 light, 6.32 dark; each PNG under 300 KB). Regenerate: `python3 pywidget/docs/design/ide/draw_run_screen.py`; copy table: `--strings`.

## 1. Layout (iPhone)

Full-screen cover, top to bottom:
1. Navigation bar, 44 pt. Leading: **Close**, only once the run has ended. Centre: the project's name from `app.json`, one line, middle truncation. Trailing: the ⋯ menu, every state.
2. Status line (the IDE's run strip, same component): icon, word, detail. Every state has an icon and a word, never colour alone.
3. Console body on `bg.console`, Menlo, console text style (clamps at 32 pt). Scrolls; follows the tail while running. No REPL bar, no editor, no tabs, no file list.
4. Bottom bar, hairline above. While running or waiting: **Stop**, full width, danger outline. Once ended: **Run Again** (primary) and **Edit** (secondary), side by side; stacked at accessibility sizes. Stop and Run Again share one place, as Run and Stop do in the IDE.

iPad: the same screen, full screen in both orientations; status and console <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> at 760 pt wide and centred, the button row at 520 pt.

## 2. States


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. States, scrolls sideways" data-n="2" style="--tw:1011px" markdown="1">

| State | Close | Status | Body | Bottom |
|---|---|---|---|---|
| Running | no | Running · m:ss | output, tail followed | Stop |
| Waiting (a prompt is open) | no | Waiting for you · prompt title | output under the prompt | Stop (behind the prompt) |
| Finished | yes | Finished · run time | output | Run Again, Edit |
| Finished, nothing printed | yes | Finished · run time | empty state: console glyph, title, line | Run Again, Edit |
| Failed | yes | Failed · Type · line n | output, then the error card (type, message, file and line, Show Traceback disclosure) | Run Again, Edit |
| Stopped | yes | Stopped · after time | output, then "Stopped by you." | Run Again, Edit |

</div>


- Each open starts a fresh run (ruling s1); Run Again does the same from here. Stop needs no confirmation, as in the IDE.
- Edit opens the entry file in the editor; on a failed run whose last user frame is in the entry file, at that line. Other files: the entry file's top.
- Prompts (T-0447) draw over the run screen as they do over the console; the status line says the script is waiting.
- The ⋯ menu: Edit Script, Copy Output (disabled when nothing was printed), then a separator and Add to Home Screen… (opens the slice-2 walkthrough). Menus do not dim the screen.
- **Open for Idris:** Edit while running. My proposal: Edit Script closes the run screen and opens the entry file with the run still going in the editor's console (same run, same queue). If the run cannot move to the IDE console, Edit Script is disabled while running and Stop comes first. Rule on it in T-0449's note.
- **Ruled (Idris, 2026-10-27, T-0504):** Edit Script is disabled while running or waiting, with a subtitle saying why; Stop first. Reasons, and the stop-and-open cases this section does not draw (X an editor run, X a background run), are in [`home-setup.md`](home-setup.html) s7.

## 3. Stop-and-open confirmation

When Y is opened (Home Screen shortcut, Shortcuts, Spotlight) while X runs: X's run screen comes forward with an alert over it. Opening X while X runs brings X forward with no alert (ruling s1).
- Title "Stop X and open Y?", message "X is still running. Stopping it ends this run."
- Buttons stacked (the destructive label does not fit half the width, as iOS stacks): **Stop and Open** (destructive) above **Cancel**. Cancel is the default and the escape action; X keeps running and Y is not opened.
- Stop and Open: stop X as Stop does, then open Y and start its run. Y's screen replaces X's; X's output is not kept on screen.
- At AX5 the alert widens to the screen margins; text scrolls inside it if it outgrows the height (system behaviour).

## 4. Accessibility

- Dynamic Type through AX5 (frames 9, 10 and iPad portrait). AX5 sizes in the drawing are Apple's table as I recall it, not measured; Idris checks in the Simulator. The navigation bar does not scale (Large Content Viewer).
- Glyphs in the drawing are stand-ins; the build uses SF Symbols, which scale with their text. In the drawing the status and card glyphs stay at their Large size at AX5; the build should not copy that.
- VoiceOver: Stop reads "Stop [name]", Run Again "Run [name] again". On a status change (finished, failed, stopped) post an announcement of the status word and detail.
- Reduce Motion: the tail-follow scroll jumps instead of animating.

## 5. Words

Plain descriptive words only; the words "app", "apps" and "mini app" never appear in user-facing text (ruling s5, the 4.7 reading). `--strings` checks every string below and the sample names; 0 hits. Plain words worked here; no coined feature name is proposed, so no C51 request.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 5. Words, scrolls sideways" style="--tw:846px" markdown="1">

| ID | String (DRAFT) | Where | C51 |
|---|---|---|---|
| `nav.title` | [name] | title: the project's name from app.json; one line, truncates in the middle | DRAFT |
| `nav.close` | Close | top left once the run has ended (finished, failed, stopped); absent while running | DRAFT |
| `nav.more` | More | accessibility label of the ⋯ button, top right, every state | DRAFT |
| `st.running` | Running | status line word; detail is the elapsed time, [m:ss] | DRAFT |
| `st.waiting` | Waiting for you | status line word while a prompt from the script is open; detail is the prompt's title | DRAFT |
| `st.finished` | Finished | status line word; detail is the run time, e.g. 0.4 s | DRAFT |
| `st.failed` | Failed | status line word; detail is [ErrorType] · line [n] | DRAFT |
| `st.stopped` | Stopped | status line word; detail is after [time] | DRAFT |
| `btn.stop` | Stop | bottom button while running or waiting; stops at once, no confirmation (as the IDE) | DRAFT |
| `btn.again` | Run Again | bottom button, primary, once the run has ended | DRAFT |
| `btn.edit` | Edit | bottom button, secondary, once the run has ended; opens the entry file (at the failing line if it is in that file) | DRAFT |
| `out.stopped` | Stopped by you. | last console line after Stop | DRAFT |
| `empty.title` | Nothing was printed | empty state, finished with no output | DRAFT |
| `empty.body` | The script finished without printing anything. Text from print() shows here. | empty state, under the title | DRAFT |
| `err.where` | [file], line [n] | error card, under the message | DRAFT |
| `err.more` | Show Traceback | error card disclosure; opens the full traceback in place | DRAFT |
| `menu.edit` | Edit Script | ⋯ menu; same as Edit | DRAFT |
| `menu.copy` | Copy Output | ⋯ menu; disabled when nothing was printed | DRAFT |
| `menu.home` | Add to Home Screen… | ⋯ menu; opens the walkthrough sheet (slice 2) | DRAFT |
| `confirm.title` | Stop [X] and open [Y]? | alert title when [Y] is opened while [X] runs | DRAFT |
| `confirm.msg` | [X] is still running. Stopping it ends this run. | alert message | DRAFT |
| `confirm.cancel` | Cancel | alert, keeps [X] running; [Y] is not opened | DRAFT |
| `confirm.ok` | Stop and Open | alert, destructive style; stops [X], then opens [Y] and starts its run | DRAFT |
| `busy.line` | [X] is running in another window. Stop it there, then run here. | console line when Run is tapped while another window's run <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> Python; [X] is that window's file name, "Another script" when it has none; nothing runs or queues (the interim until the confirm.* alert, home-setup s7.4, T-0505). Code: ConsoleModel.busyLine | DRAFT |
| `restart.other` | Restart stops [X] in another window. | console line in the window that tapped Restart, said after Restart happened and only when it stopped a run in another window; [X] is that window's file name | DRAFT |
| `restart.told` | Restart in [Y] stopped this run. | console line in the window whose run Restart stopped; [Y] is the file name of the window that tapped Restart ("another window" when it has none) | DRAFT |
| `a11y.stop` | Stop [name] | accessibility label of Stop | DRAFT |
| `a11y.again` | Run [name] again | accessibility label of Run Again | DRAFT |

</div>


Word check ('app', 'apps', 'mini app'): 28 strings, hits none
{% endraw %}

</div>
