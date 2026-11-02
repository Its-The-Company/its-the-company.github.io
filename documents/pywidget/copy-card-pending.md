---
layout: "default"
title: "Copy card, pending (C51)"
section: "documents"
description: "creative/approved.md holds no copy guide and no voice. Its only approved words are item 4, the Pro screen&#x27;s headlines and &quot;Pro is active&quot; lines (pro-strings.json). s9.11 says so itself: &quot;no copy guide is approved&quot;. So\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/copy-card-pending.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/design/copy-card-pending.md</code></span></div><h1>Copy card, pending (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-02, T-1132. No copy card existed: `grep -rl "copy card"` under pywidget/docs/design and ops/requests found none, and the only C51 cards in ops/requests are for look (NAME, PRO-SCREEN, FIND-TINT, PROPOSALs). This file collects every string marked DRAFT today. Ines decides when it goes to the Investors. No Investor request is opened by this file.

## What C51 covers here (read this first)

`creative/approved.md` <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> **no copy guide and no voice**. Its only approved words are item 4, the Pro screen's headlines and "Pro is active" lines (pro-strings.json). s9.11 says so itself: "no copy guide is approved". So the honest split is by kind, not by "inside the voice":

- **Class W (approved words):** reuses an approved string or an Apple label. Needs nothing. Listed so nobody sends it.
- **Class F (functional label):** a one-word control label (Cancel, Done, Copy, Stop, Save). Apple's conventions, no identity in it. I read these as needing nothing; Ines to confirm that reading.
- **Class V (voice):** a sentence the product says in its own words. Each one is a small piece of the voice. **These are new identity decisions** and need approval before release. Proposal for the Investors: approve the voice once, from the sample below, so later strings fall inside it.

Voice as drawn so far (the rule behind every V string): plain words, sentence case, short sentences, says what happened then what to do, no "app" (the product is "PyWidget"), no exclamation marks, no jokes.

## 1. T-1102 premade catalog (T-1132's strings) - class V

File: `pywidget/widgets/premade/catalog.json` (`caption`, `uses`, `empty_line`); screen: Gallery detail sheet, "What it shows" and "Uses" (spec [`pywidget/docs/design/ide/spec.md`](ide-spec.html) s9.11, `about.*`). They match `draw_gallery.py` ABOUT, read by `ast`. Why new: first words any user reads about a premade. The catalog stays marked DRAFT until approved.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. T-1102 premade catalog (T-1132&#x27;s strings) - class V, scrolls sideways" style="--tw:725px" markdown="1">

| id | What it shows (caption) | Uses |
|---|---|---|
| countdown | Days to a date you choose. | The clock and the dates you save. |
| sun | Sunrise and sunset for a place you save. | A saved place; worked out on this iPhone. |
| steps | Today's steps and floors. | Motion & Fitness, asked once. |
| distance | How far you are from a saved place. | Your location while you use the app, asked once. |
| altitude | Your altitude, with its accuracy. | Your location while you use the app, asked once. |
| habits | A week of the habits you log. | What you log in the app. |
| shortcuts | Your shortcuts, one tap away. | The shortcut names you pick. |
| storage | Free space on this iPhone. | The storage figure iOS gives the app. |
| progress | How much of the day has gone. | The clock. |
| quote | A public-domain quote each day. | A list inside the app. |
| clocks | The time in the places you pick. | The clock and time zones. |
| github | Stars, issues and checks for a repository. | GitHub, over the network; your token if you add one. |

</div>


- `st.empty` / `empty_line` (tile line when nothing is saved yet): "No data yet, so this shows sample data."
- **Fixed (T-1147):** the five uses lines now read "while PyWidget is open", "in PyWidget", "gives PyWidget", "inside PyWidget"; catalog.json regenerated, host tests green on both interpreters.

## 2. Gallery, rest of s9.11 - 56 ids (12 are the about.* rows above), class V except where noted

File: [`pywidget/docs/design/ide/spec.md`](ide-spec.html) s9.11, `python3 pywidget/docs/design/ide/draw_gallery.py --strings`. Screen: Gallery tiles, add sheet, detail sheet. Why new: the Gallery is new in this build. Class F: `title`, `mode.*`, `sec.*`, `chip.*`, `src`, `st.retry`, `d.done`, `d.what`, `d.uses`, `add.t`. Class W: `pro:e.*` (approved item 4's family). Class V (sentences): `cap.free` "Live preview on your data."; `st.failed` "The preview didn't run."; `st.perm.*`, `st.off.*`, `st.offline` "You're offline. This shows sample data.", `st.closed`; `add.home1..3`, `add.lock1..3`; `add.foot` "iOS adds widgets from the Home Screen and Lock Screen; PyWidget can't place one." (T-1147: reworded). `st.off.*` now reads "PyWidget" (T-1147).

## 3. Activity, s5.12 - 71 ids

File: [`pywidget/docs/design/ide/spec.md`](ide-spec.html) s5.12 and `draw_activity.py --strings` (word check: 71 strings, no "app"). Screen: Activity list, status strip, run detail, clear alert, export. Why new: a new screen. Class F: `f.all`, `f.failed`, `clear.ok`, `clear.no`, `d.copy`, `d.done`-style words. Class V: the status words (Working, Failing, Too big to draw, Not run yet), the reasons (`o.*`: "Cut short by iOS", "Skipped: memory was low", "Waited for the next run"), triggers `t.*`, the three empty states, `d.*` detail lines, `note` ("Runs from the last 14 days. Kept on this iPhone, never sent anywhere."), `clear.m`.
- **`d.nokept`** (T-1146): "Output no longer kept. Only recent runs keep it." Run detail, Output section, older rows. Reads true after the 24 MiB trim (spec 12.8). Class V. Why new: first words that tell a user stored output was removed.

## 4. Completion and lint, s3.3 - 7 ids

File: `spec.md` s3.3, `draw_complete.py --strings`. Screen: editor completion popover foot, lint label and lens, VoiceOver. Class V: `cmp.basic` "Basic suggestions" (also `va.cmp.basic`); `lint.sheet.h` "{n} messages on line {line}"; `va.lint*` VoiceOver lines. Class F: `lint.more` "+{n}". The lint label itself is the module's `code` as words, e.g. "Unused import" (a rewording of pyflakes, V).

## 5. T-1115 console words - 4 strings, class V

File: [`pywidget/docs/design/ide/project-save.md`](project-save.html) s7.1. Screen: editor console, next-launch line after a refused save, and the autosave line. Why new: they replace wording that said "app". Build ticket T-1120.
- `recoveredHead`: "A save was refused when you left PyWidget, so your text was saved as " (tail unchanged)
- `autosavePaused`: "Autosave is paused. Save a copy to turn it back on."
- `saveCopy()` line: "Saved your text as p/main (conflict).py. Autosave is on again."

## 6. Other DRAFT sets, one line each

- Run screen: [`pywidget/docs/design/ide/run-screen.md`](run-screen.html), 28 ids (Running, Waiting for you, Nothing was printed, the stop-and-open alert, `busy.line`, `restart.*`). F for the buttons, V for the sentences.
- Home Screen setup and walkthrough: [`pywidget/docs/design/ide/home-setup.md`](home-setup.html), 55 ids. Walkthrough steps stay DRAFT until Idris's Simulator hand run (CHECK rows), so **do not send these yet**.
- Project save: `project-save.md` s5 and the rest of s7: new strings, 0 hits for "app".
- Widget picker, [`pywidget/docs/design/states/state-spec.md`](state-spec.html) s9: `picker.intent.title` "Choose widget" and 3 more. F and V mixed.
- Widget cards, state-spec s3.1, s3.2 (Pro card, "proposed copy"), s3.3 ("Taps off", NOT APPROVED) and the unset-widget card ("Choose a widget"; "Touch and hold, then Edit Widget"). V.
- Bound-field errors: [`pywidget/docs/design/bound-fields.md`](bound-fields.html) line 230, "all new error texts are DRAFT". V.
- Pro (s5.7): `spec.md` item 7 marks it DRAFT, but its headlines are approved (approved.md item 4); only anything added after #94 is open.

## What Ines decides

1. Whether class F needs no card (my reading: none).
2. Whether to send the voice once (section 1 and 3 as samples) rather than 200+ strings. One question to the Investors, one to three options, a recommendation.
3. Holding home-setup.md until the hand run.
4. The "app" fixes in sections 1 and 2 before the card goes.
{% endraw %}

</div>
