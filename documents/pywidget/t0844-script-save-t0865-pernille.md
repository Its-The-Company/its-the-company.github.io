---
layout: "default"
title: "T-0865: independent review of T-0844 (WidgetScriptSave copies a project&#x27;s .py files)"
section: "documents"
description: "Verdict: no High, three Medium. The happy path is right and the four pinned limits are what the tests say. The first thing that breaks is a refusal: it stops halfway and says nothing was written. None of this blocks\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0844-script-save-t0865-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 10 · Sat Oct 31</span><span><code>pywidget/docs/reviews/t0844-script-save-t0865-pernille.md</code></span></div><h1>T-0865: independent review of T-0844 (WidgetScriptSave copies a project's .py files)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-10-31. Reviewed 31b0ccf1 on idris/t0355-projects from the diff, the tests and the code they touch; Idris's notes not read (Commandment 13). Line numbers are at 31b0ccf1. New fixes: T-0881 (Idris). Nothing landed on main.

**Verdict: no High, three Medium. The happy path is right and the four pinned limits are what the tests say. The first thing that breaks is a refusal: it stops halfway and says nothing was written.** None of this blocks T-0355's landing: every Medium needs a send that fails partway, which takes a full disk or a link a script made. Fix them in T-0881 before 1.0.

## Evidence

One Simulator run in a throwaway worktree at 31b0ccf1, plus the probes: `T0865ReviewTests` 11 of 11, `WidgetScriptSaveTests` 22 of 22 (iPhone 17e, 2026-10-31 11:16, log `ops/runs/xcodebuild-20261031-111535.log`). An earlier attempt the same session stopped on two compile errors in my probe file and ran no tests. The probes assert what the reading predicts, so green means the defect is as described, not that the code is correct. Source and raw lines: `pywidget/docs/reviews/t0865-evidence/`.

The probes use a link in the widget folder as the refused sibling, because that is how to force `place` to fail in a test. Disk full, the natural cause, takes the same return at line 200 and was not simulated.

## Findings

### M1. A refused sibling leaves earlier siblings already new, and the old script runs on them

`WidgetScriptSave.swift:199-201` writes siblings one at a time and returns at the first refusal. Files already placed stay. Line 45 says of `.refused`, "Nothing was written", which is false. Lines 23-24 promise half the truth: the new script never meets old siblings (correct), with no word that the old script can meet new ones. No `scriptSaved` follows, so nothing corrects it.

Failing case (probe A): project with `a_first.py`, `b_second.py`, `main.py`, sent once. `a_first.py` renames `word()` to `label()`, `main.py` follows, and `b_second.py` can't be placed. After the send: `a_first.py` new, `main.py` old, console "main.py was saved, but not to its widget". The next refresh ends `AttributeError: module 'a_first' has no attribute 'word'`. The sink writes no tree, so the widget freezes on its last one, and it stays that way until a send succeeds (see M3).

`testLinkedSiblingIsRefusedAndTheOldScriptStays` can't see this: it has one sibling, so "half its siblings" (test line 395) can't happen.

Fix, the requirement: any refusal leaves `widgets/` as it was before the send. One way: check every destination for a link or a non-file first, write all of them to a hidden staging folder (a full disk fails here, and the staging folder is deleted), then rename into place with `main.py` last. Correct line 45 and lines 23-24 whatever is chosen.

### M2. The folder moves or is deleted before the siblings are written, so a refusal strands the widget

`WidgetScriptSave.swift:160-187` moves or removes the old folder; lines 199-204 can then refuse. Before T-0844 this hole was close to shut, since `owned()` had just checked that `main.py` is a regular file. Sibling writes open it. `send` then returns `.refused` with `last` unchanged.

Failing case 1 (probe B): id changes from `wea` to `weather`, a sibling refused. Result: `widgets/` <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> `weather` alone, its `main.py` is the **old** text declaring `wea`, and the console does not carry T-0747's "went with it" warning, so a placed `wea` widget has lost its folder with no word. On the next good save `made` comes out false (line 206: the folder now `existed`), so the following id change leaves it behind: `["tide", "weather"]`. The probe's own refresh of `weather` ended in a NameError from the link's bytes, so the wrong-id result was not measured. By reading it is `WidgetChoiceError`.

Failing case 2 (probe B2): id changes onto another widget `tide`, a sibling in `tide` refused. Line 182 has deleted `wea` by then, `tide` is unchanged, and nothing was sent. The person's text is safe in the project; the widget folder and its tree are gone.

Fix: the same requirement as M1, with the destination checks before line 160.

### M3. A refused send is never retried

`PyWidgetApp.swift:343-345` sets `widgetText = text` before calling `widgetSave`, so a refused text counts as sent. T-0747 did this when refusals were mostly permanent ones, such as a bad id. T-0844 adds transient ones: disk full, a sibling that couldn't be read.

Failing case (probe C): a send refused, the cause removed, then `saveNow()` and a reopen plus `saveNow()`. `main.py` is still the old text after both, with no second line in the console. Tapping Run does nothing for the widget until the text is edited again, and combined with M1 the frozen widget stays frozen.

Fix: move `widgetText` only on an outcome that isn't `.refused`. `lastWidgetRefusal` already stops the repeat line. Add a test.

### L1. A refresh during a send can draw a pair no save ever held

Requested check. The Python thread doesn't wait for the main actor, and siblings land before `main.py`. Failing case (probe G; the tags are the probe's, not findings): a refresh has read script version `M1` and is about to import; the send lands helper `H2` and script `M2`; the refresh imports `H2` and draws `M1:H2`. The next run draws `M2:H2`.

It heals: the queue coalesces only pending runs (`PyBridge.swift:488-494`), so `scriptSaved` runs behind the one in flight, and a failed run writes no tree. That cover exists only after the landing line sets the `scriptSaved` default. Severity stays Low on those terms. M1's staging shrinks the window to a few renames. Say this in the doc comment at lines 23-24.

### L2. Nothing bounds a sibling

`siblings(of:)` at `WidgetScriptSave.swift:213-219` reads every .py file fully into memory on the main actor, at every sent boundary, leaving the foreground included, and each widget in a project keeps a full copy. Zip import stops at 4 MiB an entry and 32 MiB a project (`MiniZip.Limits`), but a script can write any size into its own project folder. No test covers size.

Measured (probe F): 67,108,864 bytes copied in 54 ms, Simulator on the Mac's SSD. So time is not the problem at that size. I have no device figure, and the memory peak is the file's size. What's the budget? There isn't one. Set one: reuse `MiniZip.Limits`, checked from file attributes before any read, refused by name.

### L3. A data file beside the script is not copied, and nothing pins that

The package folder has a pin; a data file has none. Failing case (probe I): `cities.txt` beside `main.py`, read through `os.path.dirname(__file__)`, ends `FileNotFoundError` at refresh. `ProjectStore` lists other file types as a later slice, but a script can make them today. Decide it with T-0866's package-folder question: same question, same answer.

### L4. Four test comments claim more than their tests show

- `WidgetScriptSaveTests.swift:413`, "no move": line 417 passes `after: nil`, so no move can arise. A change that read the siblings after the id-change block would pass. The code is right today (probe J); add that case.
- Line 395, "half its siblings": see M1. The test also passes `Calls()` and never reads it, so "no `scriptSaved` on a refused sibling" is unasserted. It is right today (probe A).
- Line 424, "a new sibling is read at the next run": the test edits an existing sibling. A new one does work (probe E); add it or cut the sentence.
- Line 474, "which the widget shows as an error": nothing shows one. `RunResultSink` writes no tree, no status.json exists yet, and `PyWidgetApp.swift:381` drops the outcome. The widget keeps its last tree and the console is silent. Fix the comment; the behaviour goes to T-0866.

Also for the landing: `refresh()` at test line 289 is a copy of `WidgetWriter.run`, as its comment says. Point it at the real one once the branch has it.

## Requested checks that held

- **The pinned limits.** All four assert what they say. `import main` from `weather.py` ends `AttributeError: module 'main' has no attribute 'word'`, which is the script's own text coming back (probe H).
- **Name clash with main.py.** Any case is left out by `nameKey`, on both file systems, and the test covers `main.py` and `MAIN.py`. Only .py files move, so `tree.json` can't clash, and `files.shared()` is `scripts/<id>`, not the widget folder.
- **Read before change.** The sibling read at line 153 comes before the move, the library and every write (probe J).
- **Python's side.** Two widgets with a `helper` of different bytes each draw their own across three refreshes in one interpreter (probe D). No stale bytecode: `write_bytecode = 0` at `pwbridge.c:581`. A project's `pywidget_ui.py` can't shadow the bundled one (`_BundledFirst`, `runner.py`).

## Which goes where


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Which goes where, scrolls sideways" style="--tw:640px" markdown="1">

| Item | Goes to |
|---|---|
| M1, M2, M3, L1 (comment), L2, L4 | T-0881, new |
| Sibling edit alone leaves the widget stale; removed sibling stays; package folder; `import main` | T-0866, already pinned at 31b0ccf1; not filed again |
| A renamed sibling or renamed widget file leaves its old copy; two projects with one id leave a union of siblings | T-0866, same cause as "removed sibling stays" |
| `helper.py` doing `from main import X`, for a widget in another file | T-0866, same cause as `import main` |
| L3, and a refresh failure after a real send saying nothing (L4, line 474) | T-0866's decision with Maren; noted on T-0881 so neither is lost |

</div>
{% endraw %}

</div>
