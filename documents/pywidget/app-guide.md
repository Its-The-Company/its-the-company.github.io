---
layout: "default"
title: "The pywidget app guide, version 1"
section: "documents"
description: "What the app is, every screen so far with a picture, how it works underneath, the limits and the decisions behind them, and what is still being built."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-guide/' | relative_url }}">← App Guide</a><a href="{{ '/documents/pywidget/app-guide.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Guide</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/guide/app-guide.md</code></span></div><h1>The pywidget app guide, version 1</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Last updated: 2026-10-28, describing the app as of commit d06a981f; the editor section (2.3) and the Console pictures describe the later commits 5ac90a05 and 210a1362, where the real code editor reached the main screen. "pywidget" is the placeholder name; the Investors have not chosen the real one, and this guide says nothing about the icon or the store page.

This guide is for the Investors. It has no code in it. Where a technical word is needed it is explained the first time. Every picture is a real screenshot of the app running on the iPhone Simulator (a program on the Mac that behaves like an iPhone; the clock in the pictures is the Mac's), in light mode and dark mode side by side. The pictures show only the app's own screens, with no personal data.

**How to read the marks.** "Built" means the screen exists and has a picture here. "Not built yet" means it does not exist; the part called "Being built now" gives each one its task number and date. Dates in this guide: alpha check (the first internal test, run by the team on a test build) Day 10, 2026-10-31; feature freeze (no new features after this) Day 13, 2026-11-03; submission to Apple Day 17, 2026-11-07.

## 1. What pywidget is, and who it is for

pywidget is an iPhone and iPad app where you write and run real Python (a popular programming language, written as lines of text instructions) and can turn the same Python into widgets, the small live tiles on the Home Screen, Lock Screen and StandBy. It is for people who already like to script: they want to try an idea on the phone, automate something small, or put their own information on the Home Screen. It is also for people who would never write code but want a good-looking widget, because the app comes with 12 ready-made ones (called premades), whose source they can open and change.

Running any script is free. A single one-time purchase, called Pro (the name of the paid upgrade), unlocks the seven premade widgets that are not free. There is no account, no server run by the company, no tracking and no subscription (decision record ADR-001, "Version 1 scope and phasing").

## 2. A tour of every screen, in the order a new person meets it

Decision records are named by number, for example ADR-001. The list is in section 4.

### 2.1 First-run tour: not built yet

A short tour is planned for the first launch, with a third page that lets you pick a date and watch a countdown widget redraw. Nothing exists yet. Task T-0193, due Day 12 (2026-11-02).

### 2.2 The Console: where you write and run

This is the screen the app opens on today. Your script (the text of your program, shown in a monospaced typeface) sits in the code editor at the top, coloured and with line numbers (section 2.3). At the bottom is the console, a strip of text where the script's output appears. When the app opens, the console says "Python 3.15.1 ready" and how long that took (about 0.2 seconds). Three buttons sit at the top right: Run, a bin that clears the console, and a "more" button (three dots in a circle). While a script runs, Run turns into Stop. The script in this picture asks for a name and then greets you.

<p class="guide-shots"><img src="app-guide-shots/console-default-light.png" alt="The Console with the default script, light" width="195" height="422" loading="lazy"> <img src="app-guide-shots/console-default-dark.png" alt="The Console with the default script, dark" width="195" height="422" loading="lazy"></p>

What you can do: type or paste a script, press Run, and read the output. What happens behind it: the app starts Python inside itself, runs your text, and shows everything the script prints in the console as it happens. No server is involved.

After Run, the console shows what the script printed and a line saying how long it took ("Finished in ..."):

<p class="guide-shots"><img src="app-guide-shots/console-after-run-light.png" alt="The Console after a run, light" width="195" height="422" loading="lazy"> <img src="app-guide-shots/console-after-run-dark.png" alt="The Console after a run, dark" width="195" height="422" loading="lazy"></p>

A script can ask you a question (Python's command for this is `input()`). The console then shows a rounded answer box labelled "input()" with a send arrow, the keyboard rises, and the script waits for your answer. The button at the top now says Stop:

<p class="guide-shots"><img src="app-guide-shots/console-input-waiting-light.png" alt="Waiting for an answer, light" width="195" height="422" loading="lazy"> <img src="app-guide-shots/console-input-waiting-dark.png" alt="Waiting for an answer, dark" width="195" height="422" loading="lazy"></p>

Behind it: the script is paused, not stopped, until you reply. Stop ends the run at any time.

### 2.3 The editor

Since 28 October 2026 (task T-0565, commit 5ac90a05) the box you type in on the Console screen is the real code editor. It colours the script by meaning (reserved words, text in quotes, numbers), numbers the lines, and adds a row of extra keys above the keyboard on iPhone for characters that are hard to reach (tab, brackets, colon, equals, quote mark, undo, and a button to hide the keyboard). With a hardware keyboard attached, the extra row stays hidden. The first picture is the Console screen itself; the other two come from a separate test screen that <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the same editor. The pictures were taken by an automatic test:

<p class="guide-shots"><img src="app-guide-shots/editor-sample-light.png" alt="Editor with a sample script, light" width="195" height="422" loading="lazy"> <img src="app-guide-shots/editor-sample-dark.png" alt="Editor with a sample script, dark" width="195" height="422" loading="lazy"></p>

<p class="guide-shots"><img src="app-guide-shots/editor-gate-key-row-light.png" alt="Editor with the extra key row, light" width="195" height="422" loading="lazy"> <img src="app-guide-shots/editor-gate-key-row-dark.png" alt="Editor with the extra key row, dark" width="195" height="422" loading="lazy"></p>

Note: the small block of text above the code in the "editor-gate" pictures (the key-row ones, the picture above this note) is the test's own readout, not part of the app. The Console screen shows the same key row without it.

<p class="guide-shots"><img src="app-guide-shots/editor-gate-sample-light.png" alt="Editor holding the sample used for the editor test, light" width="195" height="422" loading="lazy"> <img src="app-guide-shots/editor-gate-sample-dark.png" alt="Editor holding the sample used for the editor test, dark" width="195" height="422" loading="lazy"></p>

Behind it: the editor is a ready-made open-source component (software others wrote and share freely) called Runestone, wrapped so the company can swap it if it fails its checks (ADR-004). It is accepted only when three checks pass: speed on a long file (measured once; a second measure after adjustments is pending, T-0460), use with VoiceOver (the iPhone's spoken screen reader) and with the user's chosen text size, and use with an iPad's attached keyboard. The last two are not yet done (T-0460, Day 10; device checks T-0479 need a real device). Not yet in the editor: completion suggestions, find and replace, several scripts open in tabs, and tapping an error to jump to its line (T-0389).

### 2.4 Ready-made example scripts

The app carries ten example scripts, for instance a tip splitter, a word counter, a unit converter and a password <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span>. One opens in the editor like any script (the picture shows the start of it; the box scrolls):

<p class="guide-shots"><img src="app-guide-shots/editor-example-tip-splitter-light.png" alt="The tip splitter example, light" width="195" height="422" loading="lazy"> <img src="app-guide-shots/editor-example-tip-splitter-dark.png" alt="The tip splitter example, dark" width="195" height="422" loading="lazy"></p>

Behind it: examples are ordinary text files that ship inside the app. You can edit and run them; nothing is downloaded. The tip splitter will be rewritten to use the app's own pop-up questions once those exist (T-0458, after T-0447).

### 2.5 The "more" menu

The button with three dots opens a menu: Restart (starts Python afresh), Copy All (copies the console text), then, below a line, Acknowledgements and pywidget Pro.

<p class="guide-shots"><img src="app-guide-shots/console-more-menu-light.png" alt="The more menu, light" width="195" height="422" loading="lazy"> <img src="app-guide-shots/console-more-menu-dark.png" alt="The more menu, dark" width="195" height="422" loading="lazy"></p>

This is a stopgap. The plan puts these in a Settings screen, which does not exist yet (section 5).

### 2.6 pywidget Pro

The Pro screen explains what the one purchase unlocks: the seven premade widgets that are not free (Habit tracker, Shortcuts launcher, Storage, Day progress, Quote of the day, World clocks, GitHub repository). A box says what stays free: running any Python, the editor and console, projects and files, Shortcuts actions, the device features, your own widgets and the five free premades. A blue button ("Unlock Pro") buys it; a link ("Restore purchase", for people who bought before on another device or after reinstalling) brings an earlier purchase back.

<p class="guide-shots"><img src="app-guide-shots/pro-offer-light.png" alt="The Pro screen before buying, light" width="195" height="422" loading="lazy"> <img src="app-guide-shots/pro-offer-dark.png" alt="The Pro screen before buying, dark" width="195" height="422" loading="lazy"></p>

After a purchase the screen says "Pro is active" with a green tick. Its line says the Pro premades are "open in the Gallery", and the Gallery does not exist yet (section 2.8). There is no button to it, because the app only shows that button where the Gallery can be reached:

<p class="guide-shots"><img src="app-guide-shots/pro-purchased-light.png" alt="The Pro screen after buying, light" width="195" height="422" loading="lazy"> <img src="app-guide-shots/pro-purchased-dark.png" alt="The Pro screen after buying, dark" width="195" height="422" loading="lazy"></p>

Important: the price shown ($0.99) comes from a stand-in price list used only while testing and is not a proposal. The real price is the Investors' decision (PROPOSAL-001); an answer is needed by Day 12 (2026-11-02). Behind it: the app asks Apple's own purchase system, which charges you and tells the app the result; the app unlocks Pro only when Apple's reply checks out as genuine and the purchase has not been refunded. In this build, the purchase works only against the test file; the real store listing does not exist until the Investors' Apple accounts are ready (membership due Day 7, 2026-10-28; Paid Apps Agreement Day 12, 2026-11-02).

About the Pro words, and why they are not changed now. Every word on the Pro screen is a draft that still needs the Investors' approval (the screen's word file says so on its first line). The style guide approved the app's two looks, not the Pro screen beyond its shared colours and type, so the Pro screen's look and words go to the Investors as one request, with pictures, before anything is sent to Apple (task T-0625: Maren drafts, Ines posts). "Gallery" itself is not new: it is the name of the premade <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> in the approved mockups, so using it needs no new approval. Renaming it would be a new decision and would go in that request. The two sentences that run ahead of the build:

- "The Pro premades are open in the Gallery" is true only once the Gallery is built (T-0191, Day 12). The alpha on Day 10 is an internal test build, so the line stays for it. If the Gallery is moved to version 1.1 at its check (freeze row F6, 2 November), the line changes to one that does not name it, before the freeze. That is task T-0624, for Maren and Idris.
- "Put every premade on your Home Screen" is true once a tap puts a widget on the Home Screen (T-0512) and Pro premades can be placed and locked again after a refund (T-0051). If Pro premades are cut from 1.0, the Pro screen drops this headline by itself, because it only shows the parts of Pro that the build switches on.

### 2.7 Acknowledgements

Open-source software the app is built on requires that its licence notices are shown. This screen lists them in two groups (Python itself, then add-on Python packages), and each opens as a page of licence text:

<p class="guide-shots"><img src="app-guide-shots/acknowledgements-list-light.png" alt="Acknowledgements list, light" width="195" height="422" loading="lazy"> <img src="app-guide-shots/acknowledgements-list-dark.png" alt="Acknowledgements list, dark" width="195" height="422" loading="lazy"></p>

<p class="guide-shots"><img src="app-guide-shots/acknowledgements-notice-certifi-light.png" alt="One notice page, light" width="195" height="422" loading="lazy"> <img src="app-guide-shots/acknowledgements-notice-certifi-dark.png" alt="One notice page, dark" width="195" height="422" loading="lazy"></p>

One row reads "Mozilla Public License 2.0, full text 2.0". It is meant to be there; the wording is a small slip. certifi (the add-on that holds the list of trusted web certificates, used for secure web addresses) is shared under the Mozilla Public License 2.0, and that licence asks for its full text to travel with the app. certifi's own download carries only a short notice, so the company added the full text as its own entry, marked "part of certifi" (decision ADR-003, Odalys's list of 27 October). certifi's page shows that text too. The slip is in how the list prints a row: name, then version. For a licence the version is already in its name, so "2.0" appears twice, and the row looks like one more package. The fix: such a row drops the version and says "Part of certifi" underneath. It is task T-0623, for Idris, with Odalys checking that the record still matches; the licence duty is met either way.

Behind it: the list is produced automatically from the company's record of every outside piece, so a piece cannot ship without its notice. An automatic check by Odalys compares the two, and a build that fails the check is not sent anywhere (ADR-003, 2026-10-27 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>).

### 2.8 Screens not built yet

These have no picture because the screens do not exist. Each is marked in section 5 with its task and date.

- **Projects and Files**: folders of scripts, scripts that import each other, import and export of .py files and zips, opening a folder from the Files app. Task T-0355.
- **The premade gallery**: a shelf of the 12 premade widgets with live previews, where the free ones can be added and Pro ones are previewed. T-0191.
- **Widget preview beside the editor**: runs the script you are writing as a widget in every size. T-0192.
- **Settings**: Acknowledgements, Pro and (only if the Investors approve) an editor theme picker will live here. Specified; T-0042 and T-0272.
- **Pop-up questions from scripts**: alerts, text and number questions, forms, lists, a short toast message. T-0447.
- **The full-screen run screen and Home Screen scripts**: turn a script into an icon on the Home Screen that runs it full screen. T-0449 (the design for it exists).
- **Placing a widget from a tap**: see section 5, task T-0512, the most urgent open task.

## 3. How it works underneath

### 3.1 The Python inside the app

The app carries a complete Python (version 3.15.1) taken from python.org, unmodified. Python runs in the app, not on a server, so scripts work without a connection. Apple does not let an app download code that changes how it works, so the scripts are your own and the pieces Python needs ship inside the app. A small fixed set of extra Python packages (add-on libraries of ready-made code) is bundled, and Python's built-in toolbox (its standard library) has a few unneeded parts cut out to save space (ADR-003).

### 3.2 From a script to a Home Screen widget

A widget cannot run Python itself: Apple gives the widget part of an app only a small amount of working memory and a short time. So the work is split (ADR-007, option b):

1. The app runs your script. The script describes the widget as a short plain-text description of a picture: which text, which colours, which sizes. This description is called a view tree (a list of the pieces of the widget picture, ADR-002).
2. The app saves that description in a folder the app and its widget part share.
3. The widget part reads the description and draws it with Apple's own screen-drawing software. It never runs your Python.

Benefits: the widget works with light and dark mode, large text and the Lock Screen styles for free, and old widgets keep drawing after the app updates. Cost: the widget is only as fresh as the last time the app ran the script (section 4).

### 3.3 Device features

Scripts can use these (ADR-001, "device modules"). Location, steps and notifications ask the person's permission through Apple's standard prompt the first time they are used; the app's explanatory sentences are written already.

- **Location**, only while the app is in use. Text shown: your scripts and widgets read your location only when they ask for it; the app keeps the last reading on the device and never sends it anywhere.
- **Steps, floors and distance** from the phone's motion sensors, for the last seven days. Same promise.
- **Notifications**, local ones the script schedules. The prompt is not drawn in any picture yet because no screen asks for it.
- **Clipboard**: iOS itself may ask before a script reads text copied in another app. **Files**: only places you pick. **Keychain**, the phone's locked store for passwords and keys, for example a service password a script needs.
- **Network**: a script may fetch from the internet if you write it to. The app itself has no account and no analytics.

None of the sensors work inside the widget; they run in the app, which then saves the answer for the widget. Not in version 1: health data, contacts, photos, calendar, reminders (each needs its own permission and review).

### 3.4 Where files are kept

Scripts and widget data stay on the device. The app's own folder holds your scripts and projects. A second folder, shared between the app and its widget part, holds each widget's drawing, a small note on how its last run went, and a 14-day log of runs (ADR-007). You can export a script as a .py file or a zip. Nothing is uploaded and there is no cloud copy unless you put a folder in iCloud Drive yourself (that option, "open in place", is part of task T-0355 and may move to 1.1).

### 3.5 What Pro unlocks and how buying works

Pro is one non-consumable purchase (bought once, not renewed), no subscription. Today it unlocks seven premade widgets; five are free. Pro may also carry editor themes or native packages if the Investors approve them and they pass their checks; the build settings say both are off today. The Pro contents are fixed in the build before it is sent to Apple and are shown in the app; there is no hidden switch that changes what Pro unlocks after release (ADR-001; Apple's App Review rule 2.5.19). Apple handles the payment; the company never sees card details.

### 3.6 What works with no connection

Running scripts, the editor, the examples, the Pro screen's wording, Acknowledgements, and every widget drawing from the last run all work offline. Scripts that fetch from the web, and the GitHub repository premade, need a connection. Buying or restoring Pro needs one.

## 4. Limits and the decisions behind them

Each limit has the record it comes from. Records are in pywidget/docs/decisions/ (Documents > Pywidget > Build Plan > Decisions).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 4. Limits and the decisions behind them, scrolls sideways" style="--tw:960px" markdown="1">

| Limit | Why | Record |
| --- | --- | --- |
| Version 1 is the editor plus a narrow widget engine plus 12 premades. The full brief (web editor, block builder, marketplace and more) is several products. | One engineer and one test slot at a time. A first review of a code-running app is careful and one rejection costs about a week. | ADR-001 |
| Widget cut line, Day 14 (2026-11-04): widgets ship in 1.0 only if 8 of 12 premades draw correctly in every size and mode, a user-written widget reaches the Home Screen, and the design checks pass. Otherwise 1.0 is the editor only. | Decided in advance so the call is not made under pressure. If cut, Pro has little to sell, which is why the pricing proposal exists. | ADR-001, section 3.3 |
| Widgets are not live. They show what the app last drew, and Apple decides refreshes: about 40 to 70 a day for a widget you look at often, roughly every 15 to 60 minutes, fewer if you rarely look. | Apple's published budget, in Apple's own words on its current developer page "Keeping a widget up to date" (read signed out on 26 October 2026 under the Investors' ruling of that day; the saved copy is in research/inbound/apple/). The page does not tie the figure to an iOS version; it is the page Apple publishes now, and Apple calls it typical, not a promise. The company's team believes test tools on the Mac <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> the limit, but that sentence is not on Apple's page, so it is a belief, not a fact; only a real phone gives real numbers. | ADR-007; research note L2; App Review notes, item A3 |
| The widget part never runs Python. | Its memory allowance is small and unmeasured on a phone; running in the app keeps the editor full-size. A hybrid is allowed only if three device tests pass. | ADR-007 |
| No buttons or toggles inside widgets in the first release; widgets are static pictures that update over time. | Cut to 1.1 to protect the date (the description format already reserves room for them). | ADR-001 section 3.2; ADR-002 |
| A fixed set of bundled packages in version 1. No online installs and no browsing for packages. Install from a file is a stretch goal that lands by Day 13 or moves to 1.1. | Apple's rules on downloading code carry review risk; the bundled set is checked for licence and size. Compiled add-ons such as NumPy or Pillow ship only if they work on a phone by Day 10. | ADR-003; ADR-006 |
| No marketplace, gallery of other people's code, or sharing in the app. The 12 premades are inside the app; any script exports as a readable file. | Apple's rule on apps that run code from other people is unclear and risky. A web gallery comes after approval, an in-app one much later. | ADR-006 |
| Location only while the app is open; a distance widget may show an old reading, and says when it was taken. | Asking for "always" location in a first review would raise the risk. | ADR-001 (revised table) |
| No compatibility layer for another app's scripts. | Needs a legal review and a ruling on collecting public scripts, held until the Investors answer. | ADR-005 |
| Not in 1.0 (moved to 1.1 or later): debugger, code formatter, share-sheet "Run Python on this", interactive widgets, health/contacts/photos/calendar, Install from file if late, block builder, web editor, marketplace, Watch, Mac. | Each adds work, permissions or review risk. | ADR-001 section 3.2 |
| The editor is accepted only after its three checks. If they fail, a plainer editor replaces it. | Speed, screen-reader and iPad use must pass first. | ADR-004 |
| No account, no server, no analytics. Pro's contents and price are the Investors' call. | Keeps the privacy story simple and the review easy; Investor rule. | ADR-001; PROPOSAL-001 |

</div>


## 5. Being built now

Status is taken from the task board on 2026-10-28. "Alpha" is Day 10 (2026-10-31); "freeze" is Day 13 (2026-11-03); "submit" is Day 17 (2026-11-07).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 5. Being built now, scrolls sideways" style="--tw:989px" markdown="1">

| What | What is missing | Task | Date |
| --- | --- | --- | --- |
| A tap puts a widget on the Home Screen | Today only test code writes a widget's drawing; neither a premade nor your own script reaches the Home Screen from a tap. The most urgent gap. | T-0512 (P0) | Alpha check |
| Premade widgets | Code exists; 6 are due for the alpha, 12 by Day 12. Their pictures come from a test that is still being corrected. | T-0191, T-0511 | Day 10 to Day 12 (2026-11-02) |
| Premade gallery | Not built | T-0191 | Day 12 |
| Widget preview beside the editor | Not built | T-0192 | Day 12 |
| Projects and Files | Not built; floor: container projects and .py import and export, "open in place" to 1.1 if late | T-0355 | Freeze (Day 13) |
| Pro placement and refund handling | Free users must not see Pro widgets placed; refunds must lock them again | T-0051 | Freeze |
| Pop-up questions from scripts | The screen half (alerts, forms, lists, toast) is not built; the Python half is a separate task (T-0446) | T-0447 | Day 12 |
| Home Screen scripts and the full-screen run screen | Designed (design notes for the run screen and the setup walkthrough); the app half is not built. Copy is a draft until one hand-run test | T-0449 | Freeze |
| Settings, with Acknowledgements and Pro moved in | Not built; the "more" menu stands in | T-0042 | Day 14 to 15 |
| Editor: screen-reader, text-size and iPad checks | Not run | T-0460, T-0479 | Day 10; real device later |
| Editor: tappable error lines | Not built | T-0389 | Not dated |
| Shortcuts actions (Run Script) | Refresh Widgets works; Run Script was a stub and was wired for the alpha check A10; follow-ups open | T-0510 | Alpha |
| Editor themes in Pro | Waiting for the Investors' approval of a design (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>) | T-0272 | Day 12 |
| First-run tour | Not built | T-0193 | Day 12 |
| App-rating request after a real success | Rule written; screen not built | T-0273, T-0346 | Not dated |
| Install from a file | Stretch goal; 1.1 if not done | T-0212 | Day 13 |
| Pictures not yet taken | iPad two-window view, premade widgets on the Home Screen, permission prompts, and every screen above | T-0556 | Not dated |
| Pricing answer from the Investors | Needed to set Pro's real price | PROPOSAL-001 | Day 12 |
| Verdict on the alpha | A written pass or fail per check | T-0361 | 2026-10-31, 23:59 |
| Feature freeze | After this only fixes | | Day 13 (2026-11-03) |
| Widget cut line | The call on whether widgets ship in 1.0 | | Day 14 (2026-11-04) |
| Icon, screenshots, store page (need the Investors' approval) | Not part of this guide | | Day 15 (2026-11-05) |
| Submission to Apple (needs the Investors' approval) | | | Day 17 (2026-11-07) |

</div>


## Open questions

None open on 28 October 2026. The four questions raised in review are answered in the text: the editor on the main screen (section 2.3), the Pro and Gallery words (section 2.6), the licence row (section 2.7), and the source of the refresh figures (section 4).


<style>.guide-shots{display:flex;gap:.5rem;flex-wrap:wrap}.guide-shots img{max-width:calc(50% - .25rem);height:auto;border:1px solid var(--line);border-radius:12px}</style>
{% endraw %}

</div>
