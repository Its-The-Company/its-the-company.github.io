---
layout: "default"
title: "Phase 1, part a: platform limits (T-4127 step 1a, Idris, blank slate)"
section: "documents"
description: "Marks: [Apple] = quoted from Apple&#x27;s page; [Python docs] = quoted from python.org; the S keys are in section 5. [recalled] = from memory, verify. Nothing here was measured: no device, no build, no code read. Review and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/restructuring/work/' | relative_url }}">← Working drafts</a><a href="{{ '/documents/restructuring/01a-platform-limits.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Working draft</span><span>Day 22 · Thu Nov 12, 3:55 PM ET</span><span><code>documents/restructuring/work/01a-platform-limits.md</code></span></div><h1>Phase 1, part a: platform limits (T-4127 step 1a, Idris, blank slate)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Model: claude-fable-5-2


Marks: **[Apple]** = quoted from Apple's page; **[Python docs]** = quoted from python.org; the S keys are in section 5. **[recalled]** = from memory, verify. Nothing here was measured: no device, no build, no code read. Review and licence quotes are Wrenna's ([`01b-review-and-marketplace.md`](01b-review-and-marketplace.html)).

## 1. WidgetKit

- **Memory ceiling.** No published number. [Apple, S1] "Memory limits for running app extensions are significantly lower than the memory limits imposed on a foreground app". Developers report 30 MB [recalled]. Whether a Python interpreter fits is unmeasured.
- **Refresh budget.** [Apple, S2] "For a widget the user frequently views, a daily budget typically includes from 40 to 70 refreshes", "every 15 to 60 minutes", for each placed widget. Not counted: reloads while the app "is in the foreground", and after a button or toggle [Apple, S3].
- **No code while on screen.** [Apple, S2] "your widget extension is not continually active, even if the widget is onscreen."
- **Interactivity.** Only `Button`, `Toggle` and `Link`, each running an App Intent (a named action the system can run) [Apple, S3]; "On a locked device, buttons and toggles are inactive". By default the intent runs "in the same process as the widget extension", under the same ceiling; iOS 27 lets it name another process [Apple, S4].
- **UI is SwiftUI.** [Apple, S2] "Widgets use SwiftUI views to display their content." It is compiled into our binary: Python cannot add views or new widget kinds [recalled].
- **Network.** [Apple, S5] "a request may not have enough time to complete before the system halts the widget extension."

**How Python output reaches a widget.** As data, never views: dated entries, each describing what to draw, rendered by fixed SwiftUI in the extension. Python runs either (a) in the app, saving entries where the extension can read them, or (b) in the extension at reload time, under the ceiling. One run can return a day of entries.

**How fresh.** Every 15 to 60 minutes, at the system's choosing; at once while the app is open or after a button tap; timer text ticks by itself [Apple, S2]. Push: section 4.

**Never.** Run continuously; refresh every few seconds; scroll, take typed text or free gestures, show a web view or video [recalled]; act while locked; promise an exact refresh time.

## 2. Pages inside the app

- **Can.** [Python docs, S7] "the only way you can use Python on iOS is in embedded mode": the interpreter runs inside our app's one process. Unlike a widget, it can run while the screen is open, keep state and answer every touch.
- **Cannot.** Compile code at run time or start other programs [recalled]. Download compiled modules: [Python docs, S7] binary modules must be "stored in the Frameworks folder of the packaged app", so pure-Python packages plus what we ship. Keep running off screen (section 4).
- **UI Python can drive** [recalled]: (a) Python returns a description and our SwiftUI draws it, as for a widget: native, but only the controls we build; (b) Python produces HTML for a web view: anything a web page can do, less native; (c) Python calls Apple's UI classes through a bridge: most power, hardest to contain.
- **Untrusted marketplace code.** The iOS sandbox walls off apps, not projects [recalled]. It protects other apps' data, the system, and photos, contacts or location until the user grants each. It does not protect, from a downloaded project running in our process: other projects' files, keys the app has saved, permissions already granted, or the network (what it reads, it can send). Python has no safe restricted mode [recalled]. Possible walls, none measured [recalled]: a web view's content runs in a separate system process, so (b), or Python compiled to WebAssembly inside one; an app-owned helper process on newer iOS.

## 3. iMessage extensions

- **Separate target.** [Apple, S8] iMessage apps are "app extensions within a containing iOS app": a second extension in our download.
- **Memory.** No published number; S1 applies. Unmeasured.
- **Allowed** [Apple, S8]: "Present a custom user interface inside the Messages app"; "Insert text, stickers, or media files into the Messages app’s input field"; "Create interactive messages that carry app-specific data". Code runs while its panel is open, so Python could run live.
- **Not allowed** [recalled]: send without the user tapping send; read the conversation or learn who is in it; run with its panel closed; show its live view to a recipient without pywidget (they see a picture and an install prompt).
- **Review.** Reviewed with the app, in the same binary; what review expects: 01b.

## 4. Shortcuts and background

The app can never say "run this at 9:00": either the user asks or the system picks the moment.

- **App Intents, App Shortcuts.** A script offered as an action runs when the user asks (Shortcuts, Siri, Spotlight, Action button). A Shortcuts automation the user builds (time of day, arriving somewhere) is the one user-set schedule [recalled]. [Apple, S9] "Each app can include up to 10 App Shortcuts", so user scripts share one action with a "which script" choice.
- **Background Tasks.** [Apple, S10] refresh "is for short-duration tasks"; [Apple, S11] "the system doesn’t guarantee launching the task at the specified date". About 30 seconds, a few times a day, never after a force-quit [recalled]. A task the user starts "can continue running in the background" [Apple, S12].
- **Push.** Widget and Live Activity pushes need "your server" [Apple, S6, S14] and are budgeted: money, so a proposal only.
- **Live Activities.** [Apple, S13] started "while the app is in the foreground", "active for up to eight hours", data within "4 KB"; SwiftUI snapshots, like widgets.
- **Controls.** A button or toggle in "Control Center, their Lock Screen, and the Action button" that runs an intent [Apple, S15].
- **iOS 27** [Apple, S16]: `LongRunningIntent` ("Extend an app intent’s background runtime"); `RunSystemShortcutIntent` (shortcuts "from interactive widgets"); choosing the process (S4). WidgetKit lists nothing after June 2025 [Apple, S15].

## 5. Sources

Key, URL, date fetched, saved file. Apple files are under `research/inbound/apple/developer.apple.com/`.

- S1 https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/ExtensionCreation.html 2026-11-12 `library_archive_documentation_General_Conceptual_ExtensibilityPG_ExtensionCreation.html-748cd8b2.html`
- S2 https://developer.apple.com/documentation/widgetkit/keeping-a-widget-up-to-date.md 2026-10-26 `documentation_widgetkit_keeping-a-widget-up-to-date.md-0b3389e1.html`
- S3 https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities.md 2026-10-29 `documentation_widgetkit_adding-interactivity-to-widgets-and-live-activities.md-20980691.html`
- S4 https://developer.apple.com/documentation/appintents/intentexecutiontargets.md 2026-11-12 `documentation_appintents_intentexecutiontargets.md-a0da3bb4.html`
- S5 https://developer.apple.com/documentation/widgetkit/making-network-requests-in-a-widget-extension.md 2026-10-29 `documentation_widgetkit_making-network-requests-in-a-widget-extension.md-7573ac64.html`
- S6 https://developer.apple.com/documentation/widgetkit/updating-widgets-with-widgetkit-push-notifications.md 2026-10-29 `documentation_widgetkit_updating-widgets-with-widgetkit-push-notifications.md-46146374.html`
- S7 https://docs.python.org/3/using/ios.html 2026-11-12, not saved in the repository
- S8 https://developer.apple.com/documentation/messages.md 2026-11-12 `documentation_messages.md-5be71fe0.html`
- S9 https://developer.apple.com/design/human-interface-guidelines/app-shortcuts.md 2026-11-02 `design_human-interface-guidelines_app-shortcuts.md-1eeacf13.html`
- S10 https://developer.apple.com/documentation/uikit/using-background-tasks-to-update-your-app.md 2026-11-05 `documentation_uikit_using-background-tasks-to-update-your-app.md-99195af7.html`
- S11 https://developer.apple.com/documentation/backgroundtasks/bgtaskrequest/earliestbegindate.md 2026-11-05 `documentation_backgroundtasks_bgtaskrequest_earliestbegindate.md-9c584ac2.html`
- S12 https://developer.apple.com/documentation/backgroundtasks.md 2026-11-12 `documentation_backgroundtasks.md-7392e612.html`
- S13 https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities.md 2026-10-29 `documentation_activitykit_displaying-live-data-with-live-activities.md-5025d436.html`
- S14 https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications.md 2026-10-29 `documentation_activitykit_starting-and-updating-live-activities-with-activitykit-push-noti-eab3972e.html`
- S15 https://developer.apple.com/documentation/updates/widgetkit.md 2026-11-12 `documentation_updates_widgetkit.md-837e56d8.html`
- S16 https://developer.apple.com/documentation/updates/appintents.md 2026-11-12 `documentation_updates_appintents.md-8578eb08.html`

Not read: Apple's pages on the app sandbox, `MSConversation`, `LongRunningIntent`, Background Tasks updates and helper processes (the fetch guard refused them at today's <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> of 12 Apple pages), and a forum thread on widget memory (refused earlier). Those facts stay [recalled].

## 6. Questions from 1a

1. **Where does Python run for a widget?** In the app, entries are only as fresh as the app's last run; in the extension, every budgeted reload can run Python, if it fits in memory. Recommend: measure that on a real phone first; the extension if it fits with room to spare, the app otherwise.
2. **What draws a Page?** Recommend (a), data drawn by our SwiftUI, so one script can feed a widget and a Page; a web view later if wanted; never the bridge (c) for downloaded code.
3. **May downloaded code run with the app's full reach?** Recommend no: keep keys and other projects out of its reach by design, show its code before first run, and prove a wall on a device before any marketplace of runnable code.
4. **iMessage in 1.0?** Recommend no: a second extension of unknown memory, and recipients need the app. Measure, then decide.
5. **A server for push?** Recommend none for 1.0: budgeted reloads, button taps and user-built automations only; a costed proposal later.
6. **Depend on iOS 27 features?** Recommend: use them where present, never require them.
{% endraw %}

</div>
