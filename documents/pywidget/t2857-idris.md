---
layout: "default"
title: "T-2857: review of the Python half of the Shortcut recipes (T-2376, 4b123c9b1)"
section: "documents"
description: "Verdict: no blocker. The three recipes save only what the Shortcut sends, refuse bad input without touching the saved file, never read stdin or write in a widget run, and ask for no permission. Findings below are Medium\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2857-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2857-idris.md</code></span></div><h1>T-2857: review of the Python half of the Shortcut recipes (T-2376, 4b123c9b1)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris, 2026-11-05. Independent (Commandment 13): read `widgets/recipes/{next_event,reminders_today,pinned_share}.py`
and `ios/App/Runtime/pywidget/context.py` as code, not Pernille's notes. Scope is the Python half; the Swift run is
`ios/Tests/ShortcutRecipeTests.swift` (this task).

**Verdict: no blocker.** The three recipes save only what the Shortcut sends, refuse bad input without touching the
saved file, never read stdin or write in a widget run, and ask for no permission. Findings below are Medium and Low.

## Checked and clean
- Save is atomic (temp file in the folder, `os.replace`), and bad input raises before `save`.
- `files.shared()` is called with no argument in load and save: it is the folder of the run's own script id. The Swift
  test proves the Shortcut run and the `.widget` run reach the same folder (see Answers).
- Input is read to a 64 KiB <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>; titles, lines and the pin are cleaned of control characters and capped.
- `context.mode` maps the runtime's `preview` to `widget` and has no guess for `foreground` (raises AttributeError).
- No network, no `documents()`, no keychain; capabilities are only `widget.timeline`.

## Findings
**M1. Guide copy and widget copy name the third Shortcut differently.** `pinned_share.py` tells a new user "Share text or
a link to your Pinned Shortcut" (and the widget is called "Pinned"); guide 9.5 tells them to name the Shortcut "Pin to
widget". The other two match ("Next event", "Due today"). Pick one name. (Copy is Maren's; I changed nothing.)

**M2. A pinned link shows the whole address, query string included.** A share of a signed link or one with a token
(`?token=...`, `user:pw@host`) is drawn in full on the Home Screen and, in systemMedium, readable without unlocking when
widgets are shown on a locked screen. The recipe shows the host as the heading and the full URL beneath. Suggest
dropping the query and userinfo from the displayed URL (keep the saved one if the widget is to open it later).

**L1. DST.** `zone()` is `datetime.now().astimezone().tzinfo`, a fixed offset of today. "Midnight" in `reminders_today`
and the day words in `next_event` are an hour off on the two days a year when the offset changes between now and
the date being computed. Cosmetic: "New day" arrives an hour early or late.

**L2. One reminder with a line break in its title becomes two rows** (`splitlines`) and counts twice. Shortcuts'
Combine Text gives no way to tell them apart; document it or accept it.

**L3. All-day events.** Calendar's Start Date for an all-day event is midnight, so the widget says "Today 12:00 AM",
then "Ended" at the event's end (11:59 PM). The recipe has no all-day word. Accept for v1 and say so in 9.5.

**L4. ISO parsing depends on the Python version.** `datetime.fromisoformat` accepts `+0500` (no colon) only from 3.11. The
device is said to run 3.13 (the guide's host tests run 3.9 and 3.13; I did not open the framework), so the device should be fine; a host-only run on 3.9 would reject
that form. The test fixtures all use the colon form, so nothing here checks the no-colon form either way.
Unverified: which exact string the Shortcuts "ISO 8601" date format produces; a device run (T-0757) settles it.

**L5. `reminders_today` app-mode print.** `", ".join(items) or "nothing due" if data else "nothing"` parses as
`(join or "nothing due") if data else "nothing"`. Right, but it reads as a bug; add parentheses.

## Not covered
The Shortcuts app, Calendar and Reminders data, and a device are T-0757. The Simulator has the Shortcuts, Reminders and
Calendar apps installed but no way to build a Shortcut there without driving the Shortcuts UI, which this task did not do.

## Reply (Pernille, 2026-11-05)

Thanks. All seven taken; red first on 3.9 and 3.13 where a red was possible (rows in `ReviewT2857`, `tests/widgets/test_shortcut_recipes.py`, now 24 tests).

- **M1.** The Shortcut is called "Pinned" everywhere. The other two Shortcuts carry their widget's name ("Next event", "Due today"), and the widget, its eyebrow and its empty state already say "Pinned"; guide 9.5 changed, the script did not. No new identity, so inside the style guide.
- **M2.** Fixed. `shown()` draws scheme, host, port and path only: no `user:pw@`, no `?query`, no `#fragment` (an OAuth implicit grant puts the token there). The saved pin keeps the address as shared, in the script's own folder. Red row: a URL carrying all three; no family may show any of them. Guide 9.5 says so in one sentence.
- **L1.** Fixed, small. `zone()` is gone; `local(d)` is `d.astimezone()` with no argument, which takes the offset in force at `d`, and the midnight is built as local wall time and then given its own offset. Red row: TZ=America/New_York, ZONE unset, a July time and a December time both read "6:30 PM" (was "5:30 PM" for July today), and the July and December midnights are 4:00 AM and 5:00 AM UTC.
- **L2, L3.** Accepted for v1, one line each in 9.5.
- **L4.** Checked: the device runs CPython **3.15.1** (`ios/scripts/fetch_python.sh` pins it; `Vendor/python/Python.xcframework` headers say 3.15.1 in both slices), not 3.13. So `-0500` parses on the device. New row `test_l4_an_offset_with_no_colon` proves it on 3.13 and is skipped on 3.9, which cannot. What Shortcuts' "ISO 8601" format actually emits stays with T-0757. Side note for whoever owns it: `tests/run_host.py` still says "the app embeds 3.13".
- **L5.** Parenthesised, and it was worse than style: a saved file with no `items` key raised KeyError in the console run. Red row for that.

**<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">Parked</span> battery recipe (938b373c0).** Nothing taken. It was two scripts, and the input one wrote into the widget's folder with `files.shared("battery")`; your run settled the one-script, own-folder shape, and a fourth recipe is not in scope. Its Swift test was replaced by `ShortcutRecipeTests.swift`.

**How 1.0 offers the recipes:** T-2896, for you and Ines; I recommend T-0901's editable copy, saved under the `ui.Widget` id.

No Swift-read text changed (samples and expected trees are as they were), so no Xcode run.
{% endraw %}

</div>
