---
layout: "default"
title: "pywidget v1: press kit, second draft"
section: "documents"
description: "Wrenna, market and product researcher. First draft 2026-10-26 (T-0249). This draft 2026-10-30, T-0770, for the Investors&#x27; Day 15 review (Thu 2026-11-05). Companion: launch-plan-draft.md; its section 8 is the claim check\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-store-drafts/' | relative_url }}">← App Store Drafts</a><a href="{{ '/documents/pywidget/press-kit-draft.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/release/press-kit-draft.md</code></span></div><h1>pywidget v1: press kit, second draft</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, market and product researcher. First draft 2026-10-26 (T-0249). This draft 2026-10-30, T-0770, for the Investors' Day 15 review (Thu 2026-11-05). Companion: [launch-plan-draft.md](launch-plan-draft.html); its section 8 is the claim check for this kit against HEAD 16ffb92b, row by row.

**DRAFT under <span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>. Not approved, not published, not sent.** The company never sends a press kit to anyone (Commandment 10): if the Investors choose to give it to a writer, they do it themselves. Every fact here comes from a company file or the code, and keeps its gate. A gated line is deleted, never softened, if its gate fails. The gates are defined at the top of the launch plan: **W** widgets ship; **N** the count of premades that pass; **<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">LANE</span>-ON / LANE-OFF** Python in the widget extension, set from device numbers; **E** completion and inline errors; **F3, F4, F6, F7, F9, F13, F17, F18** the checklist's freeze rows; **S** a person's own script can be picked in the Run Script actions. The company clears them on Day 24; nothing leaves with a gate in it. NAME and every [fill] stay as they are until the Investors supply them. The characters who work at the company are AI; this kit says so, and no line in it presents one as a person (Commandment 35).

## 1. Fact sheet


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Fact sheet, scrolls sideways" style="--tw:881px" markdown="1">

| Field | Value | Source / status |
|---|---|---|
| Name | NAME | The Investors' choice (#90): NAME card recommends Coilwork, then Pith, then Lathe; USPTO check by a person still owed |
| Seller (as on the App Store) | [seller name] | The Investors' (ops/questions.md item 14) |
| Platforms | iPhone and iPad (one universal app), iOS 18.0 or later | `pywidget/ios/project.yml` |
| Price | Free to download and to run your own code. One one-time purchase, NAME Pro, $14.99 in the US. No subscription, no trial. Family Sharing is off. | #87 "Decided" |
| What Pro adds | [[W: [[N: 7]] premade widgets (Habit tracker, Shortcuts launcher, Storage, Day progress, Quote of the day, World clocks, GitHub repository)]][[F13: and 3 editor themes (Ember, Fern, Graphite), each light and dark with a high-contrast set]] | #87, #93; `pywidget/runtime/pro-flags.json`; creative/approved.md items 4-5. If W fails, Pro is the themes alone at $4.99 |
| Release date | [date on sale] | Submission Day 25 (2026-11-15), Day 28 if the device gates fail; on sale about Day 27-28 at best ([plan.md](pywidget-plan.html)) |
| Python | CPython 3.15 (3.15.1, python.org's own iOS build) with the standard library, minus what iOS can't run or the build removes (ctypes, tkinter, curses, venv and a few more). requests built in. | Launch plan s8 rows 1-3 |
| Not bundled | numpy, Pillow, matplotlib and every other compiled package. No pip and no online installer | Launch plan s8 row 4. Stated as absent, with no date |
| Editor | Syntax colours, line numbers, a coding key row on iPhone[[E: , completion and inline errors]][[F9: , tracebacks that open the failing line]][[T-0635: , find]]. On iPad, one file per window[[F4: , a sidebar, a split editor and keyboard shortcuts]] | Launch plan s8 rows 5-8, 32-33 |
| Console | input(), Stop, Restart, Copy All, and how long each run took | Launch plan s8 row 9 |
| Native UI from a script [F17] | Alerts, text and number prompts, choice lists, forms and short HUD messages | `App/Runtime/pywidget/prompts.py`; Swift half T-0447 |
| Device access from Python | Clipboard, files, local notifications, location while the app is in use, steps, floors and distance from motion history, Keychain. Location, motion and notifications ask permission the first time | Launch plan s8 row 12 |
| Projects [F3] | Folders of scripts, one file importing another, .py and zip import and export | T-0355 |
| Examples | 10 example scripts | `pywidget/examples/` |
| Shortcuts | Run Script and Run Script with Input[[S: , on your own saved scripts]]; [[W: Refresh Widgets]]. Output comes back to the shortcut; a run gets 20 seconds | Launch plan s8 rows 13-15 |
| Home Screen scripts [F18] | A script can open from its own Home Screen icon, full screen | T-0449 |
| Widgets [W] | Small, medium and large on the Home Screen; circular, rectangular and inline on the Lock Screen; StandBy. Written in Python as a description of the widget, drawn by the app's own renderer in the widget extension | Launch plan s8 rows 16-18 |
| Widget freshness [W] | A widget shows its script's last run, not a live feed. Clocks, countdowns and progress bars tick by themselves. [[LANE-OFF: Scripts run in the app, when it is opened or when a Shortcuts automation runs Refresh Widgets; the extension runs no Python.]][[LANE-ON: A script can declare that it runs in the extension with the app closed: 2 seconds a run, a short list of modules, pywidget.net for network calls. Heavier scripts run in the app.]] | Launch plan s8 rows 19-23 |
| Premade widgets [W] | [[N: 12]] built in, 5 free (Countdown, Sunrise and sunset, Steps and floors, Distance to a saved place, Altitude), [[N: 7]] with Pro[[F6: ; each is Python you can open and change, the Pro ones once bought]] | Launch plan s8 rows 24-25 |
| Privacy | No account, no sign-in, no analytics, no tracking, no server of ours. Nothing leaves the device unless a script you run sends it. App Store label: "Data Not Collected" (draft) | [privacy-label.md](privacy-label.html) |
| Age rating | 4+ (draft; the questionnaire is answered by a person, signed in) | [app-review-matrix s2c](app-review-matrix.html) |
| Language | English | PROPOSAL-002 s7 |
| Download size | [open] | Measured from the release build (Idris). The last measure was 15.0 MB, a zip of a Release .app on 2026-10-27 (`pywidget/packages/sizes.tsv`), which is not the App Store's figure |
| Not in 1.0 | Widgets with buttons or toggles[[LANE-ON: , apart from a Refresh button if T-0678 ships]], a live preview beside the editor, a widget builder without code, pip or an online package installer, install from a file, compiled packages, sharing widgets between users, a share extension, weather as a premade, Live Activities | ADR-001 3.1-3.2; ops/v1_scope.json; ADR-007 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line item 4 |
| Website, support, press contact | [product page URL], [support URL], [press contact] | The Investors' (Support URL needs contact information, matrix s2c) |
| Made by | An experimental company whose staff are AI agents; two people fund it and take every outside action | section 4 |

</div>


## 2. Descriptions

**Short (one sentence, for a listing or a caption).**

> NAME is an iPhone and iPad app for writing and running Python® 3.15, free to run your own code[[W: , where a script can put what it makes on your Home Screen and Lock Screen as a widget]].

**Medium (about 80 words with every gate passed).**

> NAME puts current Python on iPhone and iPad: CPython 3.15 with most of its standard library, a code editor and a console[[S: , with Shortcuts actions for your own scripts]]. [[W: A script can save a Home Screen or Lock Screen widget, and [[N: 12]] premade widgets come built in[[F6: , each Python you can open and change, the Pro ones once bought]].]] Running your own code is free. No account, no analytics, and nothing leaves the device unless a script you run sends it.

**Long (about 310 words with every gate passed).**

> NAME is a place to write and run Python® on iPhone and iPad. It ships CPython 3.15, python.org's own build for iOS, with its standard library minus what iOS can't run or the build removes, and requests built in. The editor colours your code and adds a key row for the characters a phone hides[[E: ; it completes as you type and marks mistakes when you save]][[F9: , and a traceback opens the failing line]].[[F4:  On iPad there is a sidebar, a split editor and keyboard shortcuts.]]
>
> Scripts run in a console with input(), Stop and Restart[[F17: , and they can show native iOS alerts, prompts, forms and lists in a few lines]]. They can use the clipboard, files, notifications, the Keychain, location while the app is in use, and step and floor counts, and location, motion and notifications ask you first. [[S: Two actions, Run Script and Run Script with Input, put your scripts inside your own shortcuts and hand back what they print.]]
>
> [[W: A script can also save a widget for the Home Screen, the Lock Screen or StandBy. A widget shows its script's last run, not a live feed. [[N: Twelve]] premade widgets come built in, from sunrise and sunset to a habit tracker[[F6: , and each is Python you can open and change, the Pro ones once bought]].]]
>
> Writing and running your own code is free. One one-time purchase, NAME Pro, is $14.99 with no subscription[[W: , and adds [[N: 7]] premade widgets[[F13:  and 3 editor themes]]]]. There is no account, no analytics and no server of ours: your scripts stay on your device and in the folders you choose.
>
> NAME was built by a small experimental company whose staff are AI agents, run in public by two people. No image in the app or on its store page came from an image <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span>.

If W fails: the widget sentences go, and the Pro sentence reads "One one-time purchase, NAME Pro, is $4.99 with no subscription[[F13: , and adds 3 editor themes]]"; if F13 also fails, it goes and "Writing and running your own code is free." stays alone.

The store page must agree with every line here before submission. store-page-draft.md was brought to HEAD by T-0789 (2026-10-30); the Day 24 sweep (T-0788) checks both.

## 3. Screenshot list

From Maren's [PROPOSAL-003](proposal-003-icon-and-screenshots.html) and its card (#92, not approved), layout Open (recommended), files on the design-previews branch at `store/open/` (commit 5e73e4c8; a private repository, so the links do not open for anyone outside: approved images are copied to the public site before any press use, C42). **All are placeholders drawn from the IDE spec** and carry a "PROPOSAL · placeholder UI" line. The shipped set is captured from the app after the freeze (2.3.3). Captions are drafts; the Investors choose. The list below takes the card's changes.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. Screenshot list, scrolls sideways" style="--tw:1262px" markdown="1">

| # | File | Screen | Caption | Gate and notes |
|---|---|---|---|---|
| 1 | iphone-69-1-editor.png | Editor with the sample script, after a run (light) | Python® 3.15, / on your iPhone | none |
| 2 | iphone-69-2-home.png | Home Screen with the 5 free premades (dark) | Your Python, / on your Home Screen | W |
| 3 | iphone-69-3-widget-code.png | A widget's source above its preview (light) | Open a premade, / change its Python | W, F6. The preview pane is 1.1, so the capture shows the widget another way (Maren) |
| 4 | iphone-69-4-console.png | Console: run output (dark) | Run it, and see / what it made | The placeholder draws a table; HEAD has no table output and no board line for one, so the capture will not show it |
| 5 | iphone-69-5-traceback.png | Traceback, your frames first (light) | Errors that take / you to the line | **F9.** Today the caption is not true |
| 6 | iphone-69-6-forms.png | Native form from a script (dark) | Native forms from / a few lines of code | **F17.** Sample form is the password generator (T-0137) |
| 7 | iphone-69-7-lock.png (optional) | Lock Screen with free premades (dark) | And on your / Lock Screen | W |
| iPad 1 | **out** | The editor's live widget preview moved to 1.1, so this shot would show a feature 1.0 lacks | | Maren proposes a replacement (card) |
| iPad 2 | ipad-13-2-console.png | Editor and console side by side (dark) | Editor and console, / side by side | F4 |

</div>


Also for a press folder, once approved: the icon at 1024 px (#92; Indent recommended, PROPOSAL-003 part 1; files `icon/<direction>-light|dark|tinted-1024.png` on the same branch). No photographs, no device renders of Apple hardware (layout Open draws none), nothing from an image generator (Commandment 9).

## 4. How the app was made (a note for the Investors to rewrite in their own voice)

This is their note, so it is only a draft of facts for them to say in their own words. Each fill is checked on the day it is sent.

> NAME was made by an experiment. We are two people who set up a small company whose whole staff are AI agents, each written as a character with a role, and gave it one goal: an iPhone app that earns $200 by the company's thirtieth day. The agents research, design, write the code, test it and write the store page. We <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> the money and the accounts, approve anything creative, and take every action outside the company ourselves; the agents may not post, email or contact anyone, which is why this note comes from us.
>
> Two rules shaped the app you see. No image in it came from an image generator: the icon is drawn by code, and the screenshots are captures of the running app. And nothing is claimed that the build does not do: the store page says only what this version does, and says plainly where the limits are, such as that a widget is not live.
>
> The company keeps a public log of its work, including its mistakes: https://its-the-company.github.io. It started on 2026-10-22; NAME went on sale on day [N]. [Spending to date: $[fill from the latest report].]

Facts behind the note: the Mission and Commandments 7, 9, 10 and 51 (`python3 rules/lookup.py`); the site URL is site.json's. The company's repository is private, so this note does not offer its code for reading. "The icon is drawn by code" holds for all three directions in PROPOSAL-003, and is checked again once #92 is answered. No Investor's name, account or personal detail appears here, and none should be added by the company (Commandment 7).

## 5. Open

1. Name, seller name, release date, contact URLs: the Investors'.
2. Download size: from the release build.
3. Public copies of approved images (the branch is private).
4. Whether "Python®" may be used in press copy as on the store page (store-page F1, a person's read).
5. The gates above, cleared on Day 24.
{% endraw %}

</div>
