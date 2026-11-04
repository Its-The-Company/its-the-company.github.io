---
layout: "default"
title: "issue 142 option b costing"
section: "documents"
description: "How to read the costs: &quot;days&quot; means working days of one worker, and a &quot;week&quot; is five of those days. Every figure is the company&#x27;s desk estimate, not a measurement, and our estimates have run long before. The plan of Oct\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/' | relative_url }}">← Build Plan</a><a href="{{ '/documents/pywidget/issue-142-option-b-costing.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 13 · Tue Nov 3</span><span><code>ops/plans/pywidget/issue-142-option-b-costing.md</code></span></div><h1>issue 142 option b costing</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
## Option B costing: what each change costs, and the effect on the Dec 15 release

Written by the company (Ines, CEO), 2026-11-03. **Nothing in the build changes until you agree.** Work already planned carries on meanwhile.

### Decision card

- **The decision:** which of your option-B changes (items 1, 2, 3, 5, 6, 8) go into version 1.0, and which go into a later update with its own date. Items 4 and 7 stand as written.
- **Options:**
  - **B-full:** all six changes in 1.0. Next: we re-plan 1.0 around them. Release moves from Tue Dec 15 to **mid-April 2027 at the earliest** (about four months), and the first submission carries one feature Apple's rules rate high risk and two rated medium.
  - **B-staged (recommended):** items 3, 5, 6 and 8 (in the form Apple allows), plus a small website, go into 1.0, and **Dec 15 holds**. The Builder and building with your own AI keys go into 1.1, target early March 2027. "See my projects" on the web, widget buttons and the advanced libraries come in 1.2. Sharing other people's work comes in a later update, after Apple has been asked.
  - **A:** the seven answers as originally written. Nothing changes, and Dec 15 holds with about five days of slack.
- **Recommendation:** B-staged. It gives all three audiences a real path at launch and keeps the date. It also keeps the two things most likely to get a first-time Python app rejected out of the first submission: AI-written code and other people's code. Reasons are at the end.
- **Default if there is no answer:** nothing in the build changes, and the seven answers as originally written stand (#142's own default). Takes effect Mon 2026-11-09. After that date, items 5 and 6 no longer fit before the Nov 30 feature freeze without moving Dec 15.
- **Deadline:** Mon 2026-11-09, for what goes into 1.0. The 1.1 and later items can be decided any time before Dec 15.
- **Evidence:** linked under each item and in the Apple section.

How to read the costs: "days" means working days of one worker, and a "week" is five of those days. Every figure is the company's desk estimate, not a measurement, and our estimates have run long before. The plan of Oct 31 leaves about **5 days of slack** in the build window from Nov 1 to Nov 30. Most of the cost lands on Idris, the only iOS engineer, whose time is booked through the freeze.

---

### 1. Three audiences in 1.0


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Three audiences in 1.0, scrolls sideways" style="--tw:1600px" markdown="1">

| Audience | What it takes | Cost and who | Apple risk | Effect if it is in 1.0 |
|---|---|---|---|---|
| People who write Python | What 1.0 is built for now | None | Low-medium (the 2026 climate around apps that run code) | None |
| Non-coders, drag-and-drop Builder | Blocks that turn into readable Python. Planned for 1.2 today | About **6.75 weeks**: Idris on the app, Pernille on the blocks-to-Python compiler (L17 s5)) | Low (every block is built into the app) | **+7 to 9 weeks** |
| Non-coders, building with their own AI key (Claude, ChatGPT) | The smallest version that should pass review: the key stays on the phone, the feature is off until the person turns it on, a consent screen names the provider, the AI proposes an edit, the person accepts it, and nothing runs by itself (T-0845 note)) | About **1.5 to 2 weeks**: Idris, plus Wrenna for the privacy policy and label (my estimate) | **Medium.** No rule bans a user's own key, but in 2026 Apple pushed back on "vibe-coding" apps whose users generate code that then runs inside them, citing 2.5.2 and the developer agreement ([9to5Mac, 2026-03-18](https://9to5mac.com/2026/03/18/apple-pushing-back-on-vibe-coding-iphone-apps-developers-say/)). A non-coder AI path fits that pattern exactly. 5.1.2(i) also requires explicit permission before personal data goes to "third-party AI" | **+2 weeks**, and a higher chance that the whole first submission is rejected |
| People who only install widgets: **ours** | The gallery of 12 premades, already in 1.0. With item 6 they are all free, so this audience gets a complete path at no extra cost | None beyond item 6 | Low (built into the app) | None |
| People who only install widgets: **other users'** | Browse, preview, install, publish and report inside the app | Other people's **Python**: not plannable until Apple says yes. Builder documents only (blocks, no code): about **8 weeks** (range 6 to 12), plus a backend (iCloud's CloudKit, which needs your sign-in), a daily moderation desk of about 15 to 30 minutes, and terms with a content licence. It needs the Builder first (ADR-006 s13)) | Python: **High**. Apple's text bars it without permission (2.5.2, 4.7, 4.7.2). Blocks: **Medium**, not cleared | **+15 weeks or more**, on top of the Builder |

</div>


Needs from you if the AI path goes ahead: a person reads OpenAI's terms (our fetch tool can't read them), and ideally you ask App Review one question before submission. Contacting Apple is yours.

### 2. A website at launch


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. A website at launch, scrolls sideways" style="--tw:960px" markdown="1">

| Level | Cost and who | Effect |
|---|---|---|
| (a) Our free premades and examples on the site as readable code that people copy or download into the app | About **2 days**: Odalys builds the page, Maren lays it out. No accounts and no server. Not Idris's time | Fits Dec 15. Needs your OK to publish, at 1.0's approval |
| (b) "See my own projects" on the web | The phone's projects have to reach the web. The cheapest way is the person's own iCloud (CloudKit JS): about **2 to 4 weeks**, partly Idris's. Needs a CloudKit web token that you create under the Apple account, and it changes our privacy answers | +3 to 4 weeks |
| (c) Browse other users' projects | The same moderation, accounts and legal work as row 5 of item 1, on the web: about **5 weeks** more. For Python, someone must read each item before it goes public. Hosting with sign-in probably costs money, which is your decision | Not before 1(d)'s backend |
| (d) Its own editor | A desktop-browser editor that runs Python in the page and draws widgets the way the phone does: about **10 to 16 weeks** (L14 s2, s8)). A browser can't reach the phone's sensors, so its preview uses sample data. It needs a web host that allows the required settings, which is an account you would open | +3 months or more |

</div>


Recommended: (a) at launch, (b) in 1.2, (c) and (d) later.

### 3. Internet access as a main draw

- **Mostly built already.** Scripts can reach the internet today (the `requests` library ships in 1.0). Widgets that fetch on their own are the freshness work you made top priority on Oct 29, and it is in progress.
- **Cost of the change:** about **1 to 2 days**. Wrenna rewrites the store text and first-run tour to lead with it and adds two or three examples that use public data. We read each source's terms first (Apple 5.2.2, our Commandment 6). Maren spends half a day on it. **Fits Dec 15.**
- **Offline behaviour stays** (the editor works offline, and a widget keeps its last good picture). I read item 3 as an addition, not a replacement.
- **Apple's limit:** a widget can't refresh whenever it likes. iOS gives a frequently viewed widget "from 40 to 70 refreshes" a day, "roughly ... every 15 to 60 minutes" ([Apple, Keeping a widget up to date](https://developer.apple.com/documentation/widgetkit/keeping-a-widget-up-to-date); our saved copy)). So "live" has to mean "keeps itself fresh through the day", not second by second, and the store text has to say it that way.

### 5. Previews back in 1.0 (try it as a widget, step through planned updates, editor preview pane)

- **Cost:** **2 to 2.5 days** of Idris's Xcode time (the size given when it was cut on Oct 27, ADR-001)), plus half a day for Maren to bring back the iPad screenshot it removed.
- **Effect:** fits inside the slack if the widget test on a real phone (Nov 12-13) passes. No Apple issue.

### 6. All premades free; Pro = advanced libraries, buttons, live data, remix

- **All 12 premades free, with badges:** about **2 days**. Idris spends 1.5 days on the gallery, the placement rules and their tests. Maren spends half a day on the badge. Wrenna rewrites the Pro screen and store copy. This replaces #107's split of 5 free and 7 Pro. Pro stays $14.99, one-time, unless you say otherwise.
- **Pro still needs something real in 1.0.** Today Pro is the 7 premades. A purchase that unlocks nothing a reviewer can see is a rejection risk. Here are your four Pro features in 1.0 terms:
  - **Advanced libraries** (numpy, Pillow, matplotlib): 1.1 today, because a settings change they need (#79) was never applied. To bring them into 1.0, you would apply that rule, then Pernille needs 3 to 5 days, and a package could still fail on a phone. We don't sell what isn't in the build.
  - **Buttons on widgets:** 1.1 today. About **2 weeks** for Idris and Pernille after the device test (my estimate), so **+2 weeks** if in 1.0.
  - **Live data:** about **1 day**, a Pro check on background refresh. It is in 1.0 if the device test passes.
  - **Remixing other people's projects:** there are no other people's projects in 1.0 (item 1, last row). Opening a premade as your own editable copy stays free, as already promised.
- **The tension with item 3.** If internet access is the reason to buy the app, a free user has to see it working. Two ways to draw the line:
  - **6a (recommended):** the internet is free in scripts and the editor, and every premade works for free. A widget that keeps itself fresh from the internet **in the background** is Pro. A free user's internet widget updates when they open the app or run a Shortcut. Free users see the draw, and Pro sells it running on its own. The badge reads along the lines of "Live with Pro".
  - **6b:** the internet is free everywhere, background refresh included. Pro at 1.0 is then the themes only (the fallback recorded on #87), until buttons and libraries arrive.
- **Rules either way:** no Pro feature may depend on a permission such as location (Apple 5.1.1(ii)), and a widget may not show an offer or a price (Apple 4.4). A free user's badged widget shows a plain "Pro" state.
- **What would make 6a fail:** the device test fails and background refresh misses 1.0. Then Pro falls back to 6b.

### 8. Integrations with other apps and their widgets

- **Not possible as described.** iOS gives one app no public way to show, read or control another app's widgets. Each app's widgets come from that app's own extension, which shares data with its app through their common app group ([Apple, Developing a WidgetKit strategy](https://developer.apple.com/documentation/widgetkit/developing-a-widgetkit-strategy)). Apple allows only public APIs (2.5.1), and 2.5.2 bars reading or writing data "outside the designated container area".
- **What is allowed, and mostly in 1.0 already:** Shortcuts as the bridge. Any app that offers Shortcuts actions can pass its data into a pywidget script ("Run Script with Input" is done), and that script's widget shows it. Other services' public web data also works, where their terms allow it (5.2.2). The Control Center button is already planned for 1.1.
- **Cost:** about **1 day** for three ready-made Shortcut recipes (Wrenna and Pernille). **Fits Dec 15.** The store text must say "works with your apps through Shortcuts", not "integrates other apps' widgets".

---

### Apple's rules that limit this

All quotes are from Apple's App Review Guidelines, our saved copy of 2026-11-01). They are read in full in L6 s1 and s3).

- **[2.5.2](https://developer.apple.com/app-store/review/guidelines/#2.5.2), downloaded code:** apps may not "download, install, or execute code which introduces or changes features or functionality of the app, including other apps." The one exception is for educational apps, and we don't claim it. A person's own typed or opened code is the app's stated job. Code fetched from other people is not. It also bars reading data "outside the designated container area" (item 8).
- **[4.7](https://developer.apple.com/app-store/review/guidelines/#4.7) and [4.7.2](https://developer.apple.com/app-store/review/guidelines/#4.7.2), software not built into the app:** allowed "specifically" for "HTML5 and JavaScript mini apps and mini games, streaming games, chatbots, and plug-ins". Python isn't on the list. Such software may not reach phone features "without prior permission from Apple". 4.7.1, 4.7.4 and 4.7.5 add filtering, reporting, blocking, an index with links, and age controls.
- **Sharing other people's code or projects:** 2.5.2 and 4.7 above, plus [1.2](https://developer.apple.com/app-store/review/guidelines/#1.2) for any user content: "A method for filtering objectionable material", "A mechanism to report offensive content", "The ability to block abusive users", and published contact details. [1.2.1](https://developer.apple.com/app-store/review/guidelines/#1.2.1) treats creator content as user content, which is the one route left open for Builder documents. The developer agreement (3.3.1(B)) also lets downloaded code through only if it doesn't create "a store or storefront". Result: other people's Python in the app is **High** risk, and Builder documents are **Medium**.
- **Other apps' widgets:** no public API exists ([2.5.1](https://developer.apple.com/app-store/review/guidelines/#2.5.1): "Apps may only use public APIs"). The route is Shortcuts.
- **Own AI keys:** [5.1.2](https://developer.apple.com/app-store/review/guidelines/#5.1.2)(i): "You must clearly disclose where personal data will be shared with third parties, including with third-party AI, and obtain explicit permission before doing so". Plus the 2.5.2 climate above.
- **Pro:** [3.1.1](https://developer.apple.com/app-store/review/guidelines/#3.1.1), every unlock goes through in-app purchase. 5.1.1(ii), no paid feature may need a permission. 4.4, no offers inside widgets.

### Combined effect on the date

- **B-full:** about 17 to 18 weeks of iOS work (Builder 6.75, in-app sharing about 6, AI 2, buttons 2, previews and pricing 1, iCloud sync 1), plus 20 to 30 weeks of web and backend work spread across others. Release **mid-April 2027 at the earliest**, and the sharing part also waits on Apple's answer. I would not promise that date.
- **B-staged:** 1.0 gains about **4 of Idris's days** (previews 2.5, pricing 1.5) against about 5 days of slack. The site and copy work falls outside his time. **Dec 15 holds, with about one day of slack left.** If the Nov 12-13 phone test fails and its 3.5-day fallback runs, the slack is gone. Then I would move the update step-through back to 1.1 rather than move the release past Day 60, and say so in that day's report. 1.1 (the Builder and own AI keys) is about 9 weeks of iOS work after release, so **early March 2027**.
- **A:** Dec 15 with about 5 days of slack.

### Recommendation: B-staged

1. **All three audiences get a real path on Dec 15.** Python writers get the full app. People who only install get 12 free premades that work without code. Non-coders get the same premades now and the Builder in 1.1.
2. **It keeps the first submission clean.** This is a first-time app that runs code, in a year when Apple has been strict about that. AI-written code and other people's code are the two features most likely to get it rejected. We would rather learn what App Review accepts from a clean 1.0, then send the AI and sharing questions to Apple with a real build in hand (sending is yours).
3. **Item 6a resolves the tension.** The internet is free and is the draw. Pro sells the widget that keeps itself fresh, plus everything 1.1 and 1.2 add.

**Needs from you** (outreach and every contact with Apple stay with you): an answer here by Mon Nov 9. At 1.0's approval, your OK to publish the premades page. Before 1.1, a person's read of OpenAI's terms, and whether to ask App Review the AI question. For 1.2 and later: the CloudKit web token, any hosting cost, who staffs moderation, and the legal terms for shared content. The store page and screenshots still come to you before submission, as always.

**How to answer:** reply "B-staged with 6a" (or 6b), "B-full", "A", or name item by item what you want.
{% endraw %}

</div>
