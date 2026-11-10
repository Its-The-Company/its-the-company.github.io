---
layout: "default"
title: "App guide, part 3: How it works underneath"
section: "documents"
description: "The Python inside the app, how a script becomes a Home Screen widget, device features, files and offline use."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-guide/' | relative_url }}">← App Guide</a><a href="{{ '/documents/pywidget/app-guide-03-how-it-works.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Guide</span><span>Day 9 · Fri Oct 30</span><span><code>pywidget/app-guide-03-how-it-works.md</code></span></div><h1>App guide, part 3: How it works underneath</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Part 3 of 10 of the pywidget app guide. The index, with the reading notes, is [app-guide.md](app-guide.html).

## 3.1 The Python inside the app

The app carries a complete Python (version 3.15.1) taken from python.org, unmodified. Python runs in the app, not on a server, so scripts work without a connection. Apple does not let an app download code that changes how it works, so the scripts are your own and the pieces Python needs ship inside the app. A small fixed set of extra Python packages (add-on libraries of ready-made code) is bundled (pure Python only; native packages such as NumPy, Pillow and matplotlib come in 1.1, ADR-003 s4.1, 638f21ff), and Python's built-in toolbox (its standard library) has a few unneeded parts cut out to save space (ADR-003).

## 3.2 From a script to a Home Screen widget

Today's design, and the fallback if the widget-part Python <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> fails its phone tests (section 4.1): a widget cannot run Python itself, because Apple gives the widget part of an app only a small amount of working memory and a short time. So the work is split (ADR-007, option b):

1. The app runs your script. The script describes the widget as a short plain-text description of a picture: which text, which colours, which sizes. This description is called a view tree (a list of the pieces of the widget picture, ADR-002).
2. The app saves that description in a folder the app and its widget part share.
3. The widget part reads the description and draws it with Apple's own screen-drawing software. It never runs your Python.

Benefits: the widget works with light and dark mode, large text and the Lock Screen styles for free, and old widgets keep drawing after the app updates. Cost: the widget is only as fresh as the last time the app ran the script (section 4.1).

## 3.3 Device features

Scripts can use these (ADR-001, "device modules"). Location, steps and notifications ask the person's permission through Apple's standard prompt the first time they are used; the app's explanatory sentences are written already.

- **Location**, only while the app is in use. Text shown: your scripts and widgets read your location only when they ask for it; the app keeps the last reading on the device and never sends it anywhere.
- **Steps, floors and distance** from the phone's motion sensors, for the last seven days. Same promise.
- **Notifications**, local ones the script schedules. The prompt is not drawn in any picture yet because no screen asks for it.
- **Clipboard**: iOS itself may ask before a script reads text copied in another app. **Files**: only places you pick. **Keychain**, the phone's locked store for passwords and keys, for example a service password a script needs.
- **Network**: a script may fetch from the internet if you write it to. The app itself has no account and no analytics.

None of the sensors work inside the widget; they run in the app, which then saves the answer for the widget. Not in version 1: health data, contacts, photos, calendar, reminders (each needs its own permission and review).

## 3.4 Where files are kept

Scripts and widget data stay on the device. The app's own folder holds your scripts and projects. A second folder, shared between the app and its widget part, holds each widget's drawing, a small note on how its last run went, and a 14-day log of runs (ADR-007). You can export a script as a .py file or a zip. Nothing is uploaded and there is no cloud copy unless you put a folder in iCloud Drive yourself (that option, "open in place", is part of task T-0355 and may move to 1.1).

## 3.5 What Pro unlocks and how buying works

Pro is one non-consumable purchase (bought once, not renewed), no subscription. Decided on 2026-10-30 (#87): one purchase at $14.99, unlocking the seven Pro premade widgets (five are free) and the three editor themes Ember, Fern and Graphite. At HEAD the build's flag file still says pending and themes off, and the theme picker does not exist: T-0769 and T-0272 build that. Native packages are not in Pro and not in 1.0 (version 1.1). The Pro contents are fixed in the build before it is sent to Apple and are shown in the app; there is no hidden switch that changes what Pro unlocks after release (ADR-001; Apple's App Review rule 2.5.19). Apple handles the payment; the company never sees card details.

## 3.6 What works with no connection

Running scripts, the editor, the examples, the Pro screen's wording, Acknowledgements, and every widget drawing from the last run all work offline. Scripts that fetch from the web, and the GitHub repository premade, need a connection. Buying or restoring Pro needs one.
{% endraw %}

</div>
