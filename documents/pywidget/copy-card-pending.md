---
layout: "default"
title: "Copy card (C51): approved 2026-11-16"
section: "documents"
description: "The rule: &quot;Plain words, sentence case, short sentences; says what happened, then what to do; calls the product &quot;PyWidget&quot;, never &quot;the app&quot;; no exclamation marks, no jokes.&quot; I applied it as written and added nothing to\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/copy-card-pending.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/design/copy-card-pending.md</code></span></div><h1>Copy card (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>): approved 2026-11-16</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Status: approved 2026-11-16**, except the strings under "Breaks the voice rule" and "Held" at the end. an Investor, 2026-11-16 9:45 PM ET, "approve", option A of #141 ((private)); recorded in `creative/approved.md` entry 8 and `log/rulings.md` 2026-11-16 9:45 PM. The rule and its two samples, quoted word for word, are in [`pywidget/docs/design/ide/spec.md`](ide-spec.html) s2.2.

Maren, 2026-11-17, T-4671. I read every string this card names against the rule. Each one that follows it has its DRAFT mark taken off here and reads "approved 2026-11-16". Each one that breaks it is listed at the end, with its reason, for its own card (T-4746). The file keeps its name so links to it hold. What still prints DRAFT elsewhere (the spec tables' C51 column, comments in the Swift source) is out of date; this card is the record.

Maren, 2026-11-02, T-1132 (the card as first written). No copy card existed: `grep -rl "copy card"` under pywidget/docs/design and ops/requests found none, and the only C51 cards in ops/requests are for look (NAME, PRO-SCREEN, FIND-TINT, PROPOSALs). This file collects every string marked DRAFT that day. Ines decides when it goes to the Investors. No Investor request is opened by this file.

## How the rule was read (T-4671)

The rule: "Plain words, sentence case, short sentences; says what happened, then what to do; calls the product "PyWidget", never "the app"; no exclamation marks, no jokes." I applied it as written and added nothing to it. Three readings, each taken from the approval or its samples, for Ines to confirm:

- **"Says what happened, then what to do"** is read on lines that report an event. Where the next step is the button beside the line (Try again, Open Settings, Allow Location), the button says what to do. A line with nothing for the person to do says what happened and stops (`st.closed`, `d.killed.mem`). Descriptions such as the captions and Uses lines report no event and are read for the other parts of the rule. Sample 2 does both.
- **Button and menu labels.** The approval says one-word labels follow Apple's conventions and need nothing. Sample 2 itself uses Apple's title case on longer labels ("Clear Activity", "Go to Line [n]", "Try in the Widget"), so a title-case label of two words or more is read as inside the voice.
- **The name.** "pywidget" in lower case is not "PyWidget": a string that writes it so breaks the rule. `[appname]` and `{app}` are `CFBundleDisplayName`, today "PyWidget", so they pass.

## What C51 covered here (2026-11-02; history, superseded by #141)

On 2026-11-02 `creative/approved.md` held **no copy guide and no voice**. Its only approved words were item 4, the Pro screen's headlines and "Pro is active" lines (pro-strings.json). s9.11 said so itself: "no copy guide is approved". So the split was by kind:

- **Class W (approved words):** reuses an approved string or an Apple label. Needs nothing.
- **Class F (functional label):** a one-word control label (Cancel, Done, Copy, Stop, Save). Apple's conventions, no identity in it. #141 now says so: "One-word button labels follow Apple's conventions and need none."
- **Class V (voice):** a sentence the product says in its own words. These were the new identity decisions; #141 approved the voice once, so every V string that follows the rule is cleared.

Voice as drawn then, and approved on 2026-11-16 as the rule above: plain words, sentence case, short sentences, says what happened then what to do, no "app" (the product is "PyWidget"), no exclamation marks, no jokes.

## 1. T-1102 premade catalog (T-1132's strings): approved 2026-11-16 (sample 1)

File: `pywidget/widgets/premade/catalog.json` (`caption`, `uses`, `empty_line`); screen: Gallery detail sheet, "What it shows" and "Uses" (spec [`pywidget/docs/design/ide/spec.md`](ide-spec.html) s9.11, `about.*`). They match `draw_gallery.py` ABOUT, read by `ast`. These 12 rows are sample 1 of the approved voice. catalog.json carries no DRAFT mark.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. T-1102 premade catalog (T-1132&#x27;s strings): approved 2026-11-16 (sample 1), scrolls sideways" style="--tw:725px" markdown="1">

| id | What it shows (caption) | Uses |
|---|---|---|
| countdown | Days to a date you choose. | The clock and the dates you save. |
| sun | Sunrise and sunset for a place you save. | A saved place; worked out on this iPhone. |
| steps | Today's steps and floors. | Motion & Fitness, asked once. |
| distance | How far you are from a saved place. | Your location while PyWidget is open, asked once. |
| altitude | Your altitude, with its accuracy. | Your location while PyWidget is open, asked once. |
| habits | A week of the habits you log. | What you log in PyWidget. |
| shortcuts | Your shortcuts, one tap away. | The shortcut names you pick. |
| storage | Free space on this iPhone. | The storage figure iOS gives PyWidget. |
| progress | How much of the day has gone. | The clock. |
| quote | A public-domain quote each day. | A list inside PyWidget. |
| clocks | The time in the places you pick. | The clock and time zones. |
| github | Stars, issues and checks for a repository. | GitHub, over the network; your token if you add one. |

</div>


- `st.empty` / `empty_line` (tile line when nothing is saved yet): "No data yet, so this shows sample data." Approved 2026-11-16.
- **Fixed (T-1147):** the five uses lines read "while PyWidget is open", "in PyWidget", "gives PyWidget", "inside PyWidget"; catalog.json regenerated, host tests green on both interpreters. *T-4671:* until today this table still showed the five old lines with "the app"; it now shows catalog.json's text, read 2026-11-17, which is what s9.11 lists.

## 2. Gallery, rest of s9.11: approved 2026-11-16, except six add steps

File: [`pywidget/docs/design/ide/spec.md`](ide-spec.html) s9.11, `python3 pywidget/docs/design/ide/draw_gallery.py --strings` (58 ids today; 56 when this card was written). Screen: Gallery tiles, add sheet, detail sheet.

- **Approved 2026-11-16 (47 ids, the 12 `about.*` rows of section 1 among them):** labels `title`, `mode.*`, `sec.*`, `chip.*`, `src`, `st.retry`, `st.sample`, `st.allow.*`, `st.settings`, `fam.*`, `d.done`, `d.what`, `d.uses`, `add.t`; sentences `cap.free` "Live preview on your data."; `st.loading` "Running preview…"; `st.failed` "The preview didn't run."; `st.perm.motion`, `st.perm.loc`; `st.off.loc`, `st.off.motion` (read "PyWidget", T-1147); `st.offline` "You're offline. This shows sample data."; `st.empty`; `st.closed` "Premades can't be added right now."; `add.foot` "iOS adds widgets from the Home Screen and Lock Screen; PyWidget can't place one."
- Class W, not this card's: `pro:e.*` (5 ids), approved with the Pro screen (approved.md item 4).
- Not cleared: `add.home1..3`, `add.lock1..3`. Two break the rule, four are held; see the end.

## 3. Activity, s5.12: approved 2026-11-16 (sample 2)

File: [`pywidget/docs/design/ide/spec.md`](ide-spec.html) s5.12 and `draw_activity.py --strings` (104 strings today, 71 when this card was written; word check: no "app"). Screen: Activity list, status strip, run detail, clear alert, export. The whole table is sample 2 of the approved voice, so every string in it is approved 2026-11-16: the status words (Working, Failing, Too big to draw, Not run yet), the reasons (`o.*`: "Cut short by iOS", "Skipped: memory was low", "Waited for the next run"), triggers `t.*`, the three empty states, `d.*` detail lines, `note` ("Runs from the last 14 days. Kept on this iPhone, never sent anywhere."), `clear.m`, the labels.
- **`d.nokept`** (T-1146): "Output no longer kept. Only recent runs keep it." Approved 2026-11-16.

## 4. Completion and lint, s3.3 - 7 ids: approved 2026-11-16

File: `spec.md` s3.3, `draw_complete.py --strings`. Screen: editor completion popover foot, lint label and lens, VoiceOver. `cmp.basic` "Basic suggestions" (also `va.cmp.basic`); `lint.sheet.h` "{n} messages on line {line}"; `va.lint`, `va.lint.n`, `va.lint.hint`; `lint.more` "+{n}". The lint label itself is the module's `code` as words, e.g. "Unused import" (sentence case, as the rule asks). All follow the rule.

## 5. T-1115 console words - 4 strings: approved 2026-11-16

File: [`pywidget/docs/design/ide/project-save.md`](project-save.html) s7.1. Screen: editor console, next-launch line after a refused save, and the autosave line. Build ticket T-1120.
- `recoveredHead`: "A save was refused when you left PyWidget, so your text was saved as " (tail unchanged: "(open it from Projects).")
- `autosavePaused`: "Autosave is paused. Save a copy to turn it back on."
- `saveCopy()` line: "Saved your text as p/main (conflict).py. Autosave is on again."

## 6. Other DRAFT sets, one line each

- Run screen: [`pywidget/docs/design/ide/run-screen.md`](run-screen.html), 28 ids (Running, Waiting for you, Nothing was printed, the stop-and-open alert, `busy.line`, `restart.*`). **Approved 2026-11-16**, all 28.
- Home Screen setup and walkthrough: [`pywidget/docs/design/ide/home-setup.md`](home-setup.html), 55 ids. **Held:** #141 did not approve "the Home Screen setup walkthrough", and the steps wait on Idris's Simulator hand run (CHECK rows).
- Project save: `project-save.md` s5 (`st.name` "[file] is a name a widget keeps for itself; rename it", `vo.stale.sent`) and the rest of s7. **Approved 2026-11-16.**
- Words iOS shows outside PyWidget, [`pywidget/docs/design/states/state-spec.md`](state-spec.html) s9: the 15 ids in its table (`picker.intent.title` "Choose a widget" and the rest), the parameter labels and the six phrases. **Approved 2026-11-16.**
- Widget cards, state-spec: s3.1 the too-big card ("Too big to draw", "Script ran fine", "Tap to open", "Its view is more than a widget can hold in memory.", "Details in Activity", "What to do", steps 2 and 3, "Too big", its VoiceOver line), **approved 2026-11-16** except step 1. s3.2 the Pro card ("Needs Pro", "Tap to open"), **approved 2026-11-16** except its VoiceOver line. s3.3 ("Taps off"): its words follow the rule and are **approved 2026-11-16** as words; the design itself stays NOT APPROVED in state-spec for its own open points (glyph, route, the s4.1 branch). The unset card ("Choose a widget"; "Touch and hold, then Edit Widget"; "Touch and hold this widget, then tap Edit Widget."; "Choose"): the six visible rows **approved 2026-11-16**; its two VoiceOver lines break the rule.
- Bound-field errors: [`pywidget/docs/design/bound-fields.md`](bound-fields.html) s11: T-2461 ruled their wording and T-2463 applied it on Pernille's branch with the DRAFT markers off. Nothing left on this card.
- Pro (s5.7): approved with the Pro screen (approved.md item 4, words in pro-strings.json). Not this card's; see the note at the end.

## Breaks the voice rule (own card: T-4746)

Six strings on this card. Each writes the product's name "pywidget" in lower case; the rule says "PyWidget". Rewording each inside the rule needs no Investor card (entry 8: "new ones written the same way need no card").


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Breaks the voice rule (own card: T-4746), scrolls sideways" data-n="1" style="--tw:886px" markdown="1">

| # | Where | String | Reason |
|---|---|---|---|
| 1 | Gallery `add.home2` (spec s9.11) | Search for pywidget and add the widget. | "pywidget", not "PyWidget" |
| 2 | Gallery `add.lock2` (spec s9.11) | Tap the widget area and choose pywidget. | "pywidget", not "PyWidget" |
| 3 | Too-big card, systemLarge step 1 (state-spec s3.1; state-tokens.json `too_large.steps`) | Open it in pywidget | "pywidget", not "PyWidget" |
| 4 | Pro card VoiceOver (state-spec s3.2; state-tokens.json `pro_card`) | {name}. Needs Pro. Double-tap to open in pywidget. | "pywidget", not "PyWidget" |
| 5 | Unset card VoiceOver (state-spec <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 2026-10-31; state-tokens.json `unset`) | pywidget. Not set to a widget yet. Touch and hold, then choose Edit Widget. Double-tap to open pywidget. | "pywidget", twice |
| 6 | Unset card VoiceOver, Lock Screen (state-tokens.json `unset_lock`) | pywidget. Not set to a widget yet. Double-tap to open pywidget. | "pywidget", twice |

</div>


Same fault, outside this card's sets, found while checking state-tokens.json and folded into T-4746: `update.detail` "Needs a newer pywidget", `update.inline` "Update pywidget", `first_draw.tap` "Open pywidget to draw it", and the `update` and `first_draw` VoiceOver lines. Strings 4 to 6 and two of these five (`first_draw.tap` and the `first_draw` VoiceOver line) are drawn today: the widget reads state-tokens.json, and WidgetPlacementTests, ChooseCardLockVoiceOverTests and FirstDrawCardTests assert the lower-case text. String 3 and the other three of the five (`update.detail`, `update.inline`, the `update` VoiceOver line) are bundled for cards not yet built, and no Swift reads them yet (corrected T-4886; the first line said they all ship today).

- **Fixed (T-4746, Maren, 2026-11-17):** all eleven now write the name "PyWidget" and change nothing else: the same words, the same order, the same lengths (`update.inline` "Update PyWidget" is still 15 characters). Strings 3 to 6 and the five are fixed in state-tokens.json, and where state-spec.md quotes them (s3, s3.1, s3.2, s9); the 2026-10-25 8:08 PM ruling's own words, quoted in s3.2 and in the ruling's section, stay as written. 1 and 2 are fixed in draw_gallery.py and spec s9.11. Strings 3 to 6 and the five are cleared under the rule. `add.home2` and `add.lock2` now pass the rule but stay held with the other four add steps (below). The three test files assert the new text, and the Choose card's Lock Screen line and the first-draw tap line are now asserted too. Code identifiers, bundle IDs, file paths and the `pywidget://` scheme are untouched.

## The name in the premade widgets' own lines and the Settings pages (T-4886, Maren, 2026-11-18)

Found in Idris's review of T-4746 (M1, L3). These lines wrote the name "pywidget" in lower case on the Home Screen, the Lock Screen and in the app. Each changes the case of the name and nothing else, except where the line said "the app", which the voice rule forbids (entry 8: "calls the product PyWidget, never the app"). All are cleared under the rule; no Investor card is needed. Code identifiers, module names, bundle IDs, file paths and the `pywidget://` scheme stay lower case.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: The name in the premade widgets&#x27; own lines and the Settings pages (T-4886…, scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | Where | String now | Change |
|---|---|---|---|
| 12 | Habits, no habits yet (`habits.py`; also the bundled first render `first-renders/habits.json`) | Add a habit in PyWidget. | case |
| 13 | Countdown, no events (`countdown.py`; also `first-renders/countdown.json`) | Add a countdown in PyWidget. | case |
| 14 | Sun, no place set (`sun.py`) | Choose a place for sunrise and sunset in PyWidget. | case |
| 15 | Altitude, location off and no fix (`altitude.py`, two lines) | Allow location for PyWidget to see altitude. / Open PyWidget once to take a fix. | case |
| 16 | Distance, no places, location off, no fix (`distance.py`, three lines) | Save a place in PyWidget. / Allow location for PyWidget to see distances. / Open PyWidget once to take a fix. | case |
| 17 | Shortcuts, empty and the Edit link (`shortcuts.py`, two lines) | Pick shortcuts in PyWidget. / Edit in PyWidget | case |
| 18 | GitHub, no repository (`github.py`) | Choose a repository in PyWidget. | case |
| 19 | World clocks, hints, empty, VoiceOver (`clocks.py`, four lines) | Open PyWidget for times / Offsets from here. Open PyWidget for times. / Pick cities in PyWidget. / World clocks, times paused. {cities}. Open PyWidget for times. | case |
| 20 | Launcher, no apps (`launcher/_launch.py`) | Add apps in PyWidget, then pick this widget. | case |
| 21 | Gallery "Uses" lines of the six launcher looks (`launcher/catalog.json`) | The apps you save in PyWidget ... | case |
| 22 | Settings page, widget settings unreadable, not saved, from a newer version (`SettingsPage.swift` `page.unreadable`, `page.cantsave`, `page.newer`) | PyWidget couldn't read this widget's settings, so it changed nothing. / PyWidget couldn't save this change. Try again. / These settings come from a newer PyWidget. Update PyWidget to change them. | case; "the app" becomes "PyWidget" |
| 23 | Settings page, location and city list (`page.loc.off`, `page.sun.cur`, `page.sc.foot`, `page.nocities`, `page.loc.nofix`) | Location is off for PyWidget. / Uses where this iPhone was when PyWidget was last open, ... / ... PyWidget can’t see your shortcuts to check it. / PyWidget couldn't read its city list. Reinstall PyWidget to get it back. / PyWidget couldn't find where this iPhone is. Try again outside or near a window. | case; "the app" becomes "PyWidget" |
| 24 | Acknowledgements intro (`Acknowledgements.swift`, `Localizable.xcstrings`, `set.ack.intro`) | PyWidget is built on open-source software. Thank you to the people who wrote it. | case (it also started a sentence in lower case) |

</div>


Add a habit in PyWidget is the line the bundled first render draws before the app's first open. `check_states.py` now fails on any `copy` or `voiceover` value in state-tokens.json that writes the name in lower case (a scheme, module or file name is not copy), and `test_choose_card_lock_voiceover.py` has a mutant for each table.

## Held (not cleared, not breaking)

- `add.home1`, `add.home3`, `add.lock1`, `add.lock3` (Gallery add sheet). With `add.home2` and `add.lock2` they are a six-step Home Screen walkthrough in small, which #141 did not approve, and `add.home1`, `add.lock1` and `add.lock2` describe iOS from memory ([recall]). They wait on a Simulator check and Ines's word on whether they count as the walkthrough.
- `home-setup.md`, all 55 ids (section 6).

## Note for Ines: approved Pro words that the newer rule would not pass

Approved with the Pro screen on 2026-10-28 (item 4), so not cleared or blocked here: `eyebrow` and `e.settings` "pywidget Pro"; `row.refresh.l` "... with the app closed. iOS decides when."; `row.packages.l` "Bundled in the app, ..."; `free.all` "... when you open the app or a Shortcut runs". Rewording them inside the voice needs no card, but changing approved words is your call.

## What Ines decides

1. Whether class F needs no card (my reading: none). *Answered by #141: one-word labels need none.*
2. Whether to send the voice once (section 1 and 3 as samples) rather than 200+ strings. *Done: #141, approved 2026-11-16.*
3. Holding home-setup.md until the hand run. *Still held; #141 did not approve the walkthrough.*
4. The "app" fixes in sections 1 and 2 before the card goes. *Done in T-1147.*
5. *New (T-4671):* the three readings under "How the rule was read", the held add steps, and the approved Pro words above.
{% endraw %}

</div>
