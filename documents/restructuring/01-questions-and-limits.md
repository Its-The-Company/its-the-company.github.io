---
layout: "default"
title: "The Restructuring, phase 1: questions, objections and limits"
section: "documents"
description: "Blank-slate questions for the Investors, platform limits, App Review risks, marketplace needs and what &quot;served equally&quot; means."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/restructuring/' | relative_url }}">← The Restructuring</a><a href="{{ '/documents/restructuring/01-questions-and-limits.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Restructuring</span><span>Day 22 · Thu Nov 12, 11:18 PM ET</span><span><code>documents/restructuring/01-questions-and-limits.md</code></span></div><h1>The Restructuring, phase 1: questions, objections and limits</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Model: claude-fable-5-2

Merged from [`work/01a-platform-limits.md`](01a-platform-limits.html) (Idris) and [`work/01b-review-and-marketplace.md`](01b-review-and-marketplace.html) (Wrenna), both blank slate, so no company research doc is cited. Marks: **[G]** the saved guidelines (R1), quoted; **[Apple, key]** Apple's page, quoted; **[Python docs, key]**, **[W, key]** another site's page; **[search]** search summaries, page unread; **[recalled]** from memory, verify. Keys, URLs, dates: section 6. Every rating is a reading of the text.

## Questions for the Investors, each with a recommendation

Brackets name the source question. Later phases take the recommendations as working assumptions.

1. **A live marketplace in 1.0?** Recommend: no. A curated gallery shipped inside the app (free path A); a live one waits for Apple's answer (question 3) and a wall proven on a device (question 6). [1b 1, 1a 3]
2. **Paid items?** Recommend: no. They bring Attachment 2's bar on executable code, creator payouts and real-money sign-ups. [1b 2]
3. **Will you ask Apple** whether Python projects fall under 4.7 and the Mini Apps Partner Program, and whether a gallery of runnable projects is a "storefront for other Applications"? Recommend: yes, in writing, before marketplace work starts; only you can. [1b 3]
4. **What may a listing be?** Recommend: widgets and components with visible source; no full-screen Page with its own icon, rating or price until Apple answers. [1b 5]
5. **May the store page say the app downloads and runs community projects?** Recommend: it must, for 3.3.1(B)(a); the wording goes to phase 6 with the mission statement. [1b 8]
6. **May downloaded code run with the app's full reach?** Recommend: no. Keep keys and other projects out of its reach by design, show its code before first run, and prove a wall on a device before any marketplace of runnable code. [1a 3]
7. **Where does Python run for a widget?** In the app, entries are only as fresh as the app's last run; in the extension, every budgeted reload can run Python, if it fits in memory. Recommend: measure that on a real phone first; the extension if it fits with room to spare, the app otherwise. [1a 1]
8. **What draws a Page?** Recommend: data drawn by our SwiftUI, so one script can feed a widget and a Page; a web view later if wanted; never the bridge to Apple's UI classes for downloaded code. [1a 2]
9. **iMessage in 1.0?** Recommend: no. A second extension of unknown memory, and recipients need the app. Measure, then decide. [1a 4]
10. **Servers: push, accounts and hosting?** Recommend: no server for 1.0: budgeted reloads, button taps and user-built automations only; push as a costed proposal later. Once a marketplace is live: Sign in with Apple, only to publish; CloudKit first, once its quota is read; a paid backend only as a request card. [1a 5, 1b 6]
11. **Depend on iOS 27 features?** Recommend: use them where present, never require them. [1a 6]
12. **Who answers reporters and takedown notices?** Recommend: you own the published address and every reply, and register the DMCA agent; workers sort and draft. [1b 4]
13. **Age?** Recommend: terms say 13 or over; the Declared Age Range API gates the marketplace; no likes, comments or feeds. [1b 7]

## 1. Each product and each audience: questions, objections, difficulties

- **Widgets:** fixed SwiftUI snapshots fed only data; whether Python fits in the extension's memory (question 7).
- **Pages:** what draws them (question 8); when one looks like an app (question 4).
- **iMessage extensions:** unknown memory; recipients need pywidget (question 9).
- **The Builder:** its blocks can only be what our SwiftUI draws; another user's block is downloaded code (section 3, point 1).
- **The marketplace:** a storefront or mini apps to Apple (questions 1 to 5); downloaded code with the app's reach (question 6); its needs: section 4.
- **Audiences:** section 5.

## 2. Platform limits

### WidgetKit

- **Memory ceiling.** No published number. [Apple, P1] "Memory limits for running app extensions are significantly lower than the memory limits imposed on a foreground app". Developers report 30 MB [recalled]. Whether Python fits is unmeasured.
- **Refresh budget (how fresh).** [Apple, P2] "For a widget the user frequently views, a daily budget typically includes from 40 to 70 refreshes", "every 15 to 60 minutes", for each placed widget, at the system's choosing. Not counted, so at once: reloads while the app "is in the foreground", and after a button or toggle [Apple, P3]. Timer text ticks by itself [Apple, P2].
- **No code on screen.** [Apple, P2] "your widget extension is not continually active, even if the widget is onscreen."
- **Interactivity.** Only `Button`, `Toggle` and `Link`, each running an App Intent (a named action the system can run) [Apple, P3]; "On a locked device, buttons and toggles are inactive". By default the intent runs "in the same process as the widget extension", under the same ceiling; iOS 27 lets it name another process [Apple, P4].
- **UI is SwiftUI.** [Apple, P2] "Widgets use SwiftUI views to display their content." It is compiled into our binary: Python cannot add views or new widget kinds [recalled].
- **Network.** [Apple, P5] "a request may not have enough time to complete before the system halts the widget extension."

**How Python output reaches a widget.** As data, never views: dated entries, each describing what to draw, rendered by fixed SwiftUI in the extension. Python runs in the app or in the extension (question 7). One run can return a day of entries.

**Never.** Run continuously; refresh every few seconds; scroll, take typed text or free gestures, show a web view or video [recalled]; promise an exact refresh time.

### Pages

- **Can.** [Python docs, P7] "the only way you can use Python on iOS is in embedded mode": the interpreter runs inside our app's one process. It can run while the screen is open, keep state and answer every touch.
- **Cannot.** Compile code at run time or start other programs [recalled]. Download compiled modules: [Python docs, P7] binary modules must be "stored in the Frameworks folder of the packaged app", so pure-Python packages plus what we ship. Keep running off screen (below).
- **UI Python can drive** [recalled]: (a) Python returns a description our SwiftUI draws, as for a widget: native, but only the controls we build; (b) Python produces HTML for a web view: anything a web page can do, less native; (c) Python calls Apple's UI classes through a bridge: most power, hardest to contain.
- **Untrusted code.** Section 4.

### iMessage extensions

- **Separate target.** [Apple, P8] iMessage apps are "app extensions within a containing iOS app": a second extension in our download.
- **Memory.** No published number; P1 applies. Unmeasured.
- **Allowed** [Apple, P8]: "Present a custom user interface inside the Messages app"; "Insert text, stickers, or media files into the Messages app’s input field"; "Create interactive messages that carry app-specific data". Code runs while its panel is open, so Python could run live.
- **Not allowed** [recalled]: send without the user tapping send; read the conversation or learn who is in it; run with its panel closed; show its live view to a recipient without pywidget (they see a picture and an install prompt).
- **Review.** With the app, in the same binary (section 3, point 11).

### Shortcuts and background

The app can never say "run this at 9:00 AM": either the user asks or the system picks the moment.

- **App Intents, App Shortcuts.** A script offered as an action runs when the user asks: Shortcuts, Siri, Spotlight, or [Apple, P15] a button or toggle in "Control Center, their Lock Screen, and the Action button". A Shortcuts automation the user builds (time of day, arriving somewhere) is the one user-set schedule [recalled]. [Apple, P9] "Each app can include up to 10 App Shortcuts", so user scripts share one action with a "which script" choice.
- **Background Tasks.** [Apple, P10] refresh "is for short-duration tasks"; [Apple, P11] "the system doesn’t guarantee launching the task at the specified date". About 30 seconds, a few times a day, never after a force-quit [recalled]. A task the user starts "can continue running in the background" [Apple, P12].
- **Push.** Widget and Live Activity pushes need "your server" [Apple, P6, P14] and are budgeted: money, so a proposal only.
- **Live Activities.** [Apple, P13] started "while the app is in the foreground", "active for up to eight hours", data within "4 KB"; SwiftUI snapshots, like widgets.
- **iOS 27** [Apple, P16]: `LongRunningIntent` ("Extend an app intent’s background runtime"); `RunSystemShortcutIntent` (shortcuts "from interactive widgets").

## 3. App Review and agreement points, with risk ratings

1. **2.5.2.** [G] No app may "download, install, or execute code which introduces or changes features or functionality of the app"; teaching apps may, if the source is "completely viewable and editable by the user". The user's own code is settled [recalled]; marketplace downloads are not. Helps: readable source, the shipped runtime only, install on the user's tap. **Risk: medium** (IDE), **high** (marketplace downloads).
2. **Agreement 3.3.1(B).** [Apple, R2] Downloaded interpreted code must keep to the "intended and advertised purpose of the Application", must not "bypass signing, sandbox, or other security features of the OS", and "for Applications distributed on the App Store, does not create a store or storefront for other Applications." A "programming environment intended for use in learning how to program" is barred from a store "for other code or applications", so claiming 2.5.2's teaching exception rules out any store of code. The general rule bars a storefront for other **Applications**, not for code: the store page must advertise community projects (question 5), and no listing may look like an app (question 4). 3.2.2(i) adds [G] no "interface for displaying third-party apps, extensions, or plug-ins similar to the App Store". **Risk: high** for paid, app-like Pages; **medium** for a free gallery of widgets and components.
3. **4.7.** It names HTML5 and JavaScript, not Python; [Apple, R3] mini-app code is "written in HTML5 or JavaScript, or another language approved by Apple". If it covers us, [G] we owe filtering, reporting and blocking (4.7.1), consent "in each instance" (4.7.3), a web address per listing (4.7.4), an age mechanism (4.7.5), and "may not extend or expose native platform APIs or technologies to the software without prior permission from Apple" (4.7.2), which bites any shared project reading location, photos or sensors. **Risk: high**: the fit is Apple's to say.
4. **1.2.** [G] "A mechanism to report offensive content and timely responses to concerns", with filtering, blocking of abusive users and "Published contact information". Clear rules; the cost is a watched inbox. **Medium.**
5. **3.1.1 and paying creators.** [G] "If you want to unlock features or functionality within your app ... you must use in-app purchase". [Apple, R2, Attachment 2] A purchased item arrives "solely as data" and may not "add any additional executable code"; whether a paid Python project is data is unverified. Apple keeps 30% [Apple, R2, Schedule 2], or 15% in the Small Business Program [Apple, R4]; paying creators is ours. **High** for paid items, none while all is free.
6. **5.1.1, 4.8.** [G] "let people use it without a login" unless account features are significant; accounts need in-app deletion; Sign in with Apple alone settles 4.8. **Low.**
7. **5.1.2.** [G] "You must clearly disclose where personal data will be shared with third parties"; a shared project that sends data to its author's server is such sharing. **Medium.**
8. **2.3.** [G] "All new features ... must be described with specificity in the Notes for Review"; no marketplace switched on later by a server flag (2.5.19). **Low** if disclosed.
9. **1.1, 1.4.** Every listing is held to them; 1.1.6 bars [G] "inaccurate device data or trick/joke functionality", a likely widget genre. **Medium.**
10. **Age rating.** [Apple, R5] "User-Generated Content" can sit at 4+; "Social media" (feeds with "likes, comments, and shares") is 13+; "Unrestricted web access" is 16+. **Medium**: one design choice moves it.
11. **Also.** 4.4: [G] "extensions may not include marketing, advertising, or in-app purchases"; 5.2.1, 5.2.2 (logos, scraped services); Agreement 3.3.4(A)(iv): [Apple, R2] no "malware, malicious or harmful code".

## 4. Marketplace needs

Every money item is a proposal.

- **Accounts.** None to browse or install (5.1.1); to publish, report or block: Sign in with Apple, a display name, in-app deletion that also unpublishes; a demo account for App Review (2.1).
- **Hosting.** Free A: a curated gallery shipped in each app update; no server, new items wait for a release. Free B: Apple's CloudKit, free within a quota [recalled; search found no current figure]. Free C: a static index on the company's site, free gallery only: GitHub's terms bar running an online business on Pages [W, R6]. Paid: a managed backend, $0 to about $25 a month [search: Supabase]; a .com, $10 to $20 a year [search].
- **Moderation.** Review before listing: automated checks, then a worker reads each submission against written rules. A report button, author blocking, a published contact (question 12), action within 24 hours [search: App Review's rejection notices], removal that flags installed copies, a decision log.
- **Sandboxing untrusted code.** The iOS sandbox walls off apps, not projects [recalled]. It protects other apps' data, the system, and photos, contacts or location until the user grants each. It does not protect, from a downloaded project in our process: other projects' files, keys the app has saved, permissions already granted, or the network (what it reads, it can send). Python has no safe restricted mode [recalled]. Possible walls, none measured [recalled]: a web view's content runs in a separate system process, so a Page drawn as HTML, or Python compiled to WebAssembly inside one; an app-owned helper process on newer iOS. As policy, a shared project gets less than the user's own: no other project's files or keys; network only to declared hosts; permissions asked per project; source shown before install; no silent updates.
- **Licences.** The publisher picks from a short list (MIT, Apache-2.0, CC0; CC BY for media) and affirms the right to share; every copy carries author and licence. GPL on the App Store is disputed (VLC, 2010 to 2011 [search]); leave it off 1.0.
- **Takedowns.** A complaint form; a DMCA agent registered with the US Copyright Office, renewed every three years [W, R9], $6 a filing [search: law-firm pages, 2016 to 2020]; removal on a valid notice, a counter-notice path, a repeat-infringer rule.
- **Privacy.** A policy in the app and on the store page (5.1.1(i)). Collect only an account identifier, display name, published content and reports; nothing about what people run. Access, export and deletion on request (GDPR [recalled]). CCPA starts at $25 million in revenue or 100,000 residents' data [W, R8]: far above us, honour it anyway.
- **No under-13 users.** Terms require 13 or over; never the Kids Category (5.1.4); the Declared Age Range API gates the marketplace, allowed [Apple, R2] for "age-appropriate content and/or features". Once a general-audience app knows a user is under 13, COPPA demands a parent's consent or deletion [W, R7]: we delete. EU consent age: 16, lower by state, never below 13 [search].
- **Payments and payouts.** In-app purchase only (section 3, point 5). Paying creators needs a legal entity, a bank account, a payout processor, identity checks and tax forms: real money, human sign-ups, close to the banned finance area.

## 5. What "served equally" means for each audience

"Served equally": each audience has its own first screen, a complete path to a finished thing without another audience's tools, and a share of every release.

- **Programmers.** A real editor and real Python; the code behind every Builder block and download is visible and editable. Not for them if the editor hides behind "Advanced" or the Builder rewrites their code.
- **Casual creators.** A finished widget on the Home Screen without seeing code; errors that say what to change; "edit the code" is an offer, never a step. Not for them if first run opens an empty file or the error is a traceback.
- **Users of finished products.** Install in a few taps, no account; each listing says who made it and what it can reach. Not for them if they must build first, or the gallery is thin. They depend wholly on the marketplace, the part App Review is least sure to allow.

## 6. Sources, and what was measured

**Measured: nothing.** No device, no build, no code read, nothing tested with App Review.

**P1 to P16,** by 2026 fetch date; Apple's are saved in `research/inbound/apple/developer.apple.com/` (file names: [`work/01a-platform-limits.md`](01a-platform-limits.html)).

- 10-26: P2 https://developer.apple.com/documentation/widgetkit/keeping-a-widget-up-to-date.md
- 10-29: P3 https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities.md, P5 https://developer.apple.com/documentation/widgetkit/making-network-requests-in-a-widget-extension.md, P6 https://developer.apple.com/documentation/widgetkit/updating-widgets-with-widgetkit-push-notifications.md, P13 https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities.md, P14 https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications.md
- 11-02: P9 https://developer.apple.com/design/human-interface-guidelines/app-shortcuts.md
- 11-05: P10 https://developer.apple.com/documentation/uikit/using-background-tasks-to-update-your-app.md, P11 https://developer.apple.com/documentation/backgroundtasks/bgtaskrequest/earliestbegindate.md
- 11-12: P1 https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/ExtensionCreation.html, P4 https://developer.apple.com/documentation/appintents/intentexecutiontargets.md, P7 https://docs.python.org/3/using/ios.html (not saved in the repository), P8 https://developer.apple.com/documentation/messages.md, P12 https://developer.apple.com/documentation/backgroundtasks.md, P15 https://developer.apple.com/documentation/updates/widgetkit.md, P16 https://developer.apple.com/documentation/updates/appintents.md

**R1 to R9,** read 2026-11-12 unless dated; "saved" is a copy under `research/inbound/`.

- R1 https://developer.apple.com/app-store/review/guidelines/ fetched 11-12; PDF saved 10-25, same wording.
- R2 https://developer.apple.com/support/terms/apple-developer-program-license-agreement/ (October 29) fetched 11-12; PDF saved 10-25 (October 13); 3.3.1(B) is identical.
- R3 https://developer.apple.com/programs/mini-apps-partner/: PDF saved 10-25; the live page was refused twice on 11-12 (day <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>).
- R4 https://developer.apple.com/app-store/small-business-program/ saved 11-02.
- R5 https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions saved 10-26.
- R6 https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features saved 11-09.
- R7 https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions (A.12, H.3, H.6); it may predate the Rule's April 22, 2025 amendment.
- R8 https://oag.ca.gov/privacy/ccpa, "Updated on August 28, 2026" (search summaries give $26.625 million since 2025).
- R9 https://blogs.loc.gov/copyright/2019/10/it-may-be-time-to-renew-your-dmca-agent-registration/ (October 17, 2019).

**Not read; those facts stay [recalled] or [search]:** Apple's pages on the app sandbox, `MSConversation`, `LongRunningIntent`, Background Tasks updates, helper processes and CloudKit (the day cap of 12 Apple pages; fresh 11-13); a forum thread on widget memory (refused earlier); www.copyright.gov (terms guard: robots.txt unreachable); ecfr.gov (an access check); eur-lex.europa.eu (empty page).
{% endraw %}

</div>
