---
layout: "default"
title: "App launcher widgets: what iPhone allows, and how pywidget&#x27;s would be new (T-2535)"
section: "documents"
description: "Every Apple quote below is from a page read signed out, one page at a time, saved with its URL and fetch time under research/inbound/apple/ (index: research/inbound/apple/index.tsv). Store facts are from the iTunes\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/app-launcher.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/research/app-launcher.md</code></span></div><h1>App launcher widgets: what iPhone allows, and how pywidget's would be new (T-2535)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-11-05 (first answer 3:00 AM ET; refined after). Asked by the Investors on #41 (an Investor, c6652747463, 2:53 AM ET): an idea for a premade, "a custom app launcher like Cuatro". Maren draws six options in parallel (T-2536).

Every Apple quote below is from a page read signed out, one page at a time, saved with its URL and fetch time under `research/inbound/apple/` (index: `research/inbound/apple/index.tsv`). Store facts are from the iTunes Lookup API, saved at `research/inbound/t2535-launcher/lookup-launchers.json`. Where a thing is not documented, it says **Not documented** or **Uncertain**, and why.

## The plain answer, for the Investors

1. **Can a widget tap open another app?** Apple's documentation describes only one path: a tap opens *our* app, which gets the URL. Apple's documentation does not say a tap goes straight to another app. But two launcher apps on the store today say theirs do, from iOS 17 on. Developer forum posts, which I saw only as search snippets, add a split. An `https` link through `OpenURLIntent` opened Safari (so it leaves our app). A custom scheme (`spotify:`) through `OpenURLIntent` reportedly does not work, because it needs a universal link. So: **probably yes on iOS 17 and later, likely more reliably for apps with universal links than for custom schemes. We only have it from other developers' store text and forum snippets. We have to test it on a device before we promise it.**
2. **Does our app open first (a flash)?** On the documented path, yes: the system "activates the containing app and passes the URL" to it, and only then could our app open the other one. That is a visible flash. A launcher built that way would feel broken. The direct path, if the device test passes, has no flash.
3. **Which apps can be opened, and how does a user pick one?** iOS can open any app that registers a URL scheme (`spotify:`, `whatsapp:` and the like) or a universal link (an `https` address the app claims), plus Apple's own (`tel:`, `facetime:`, `https:` to Safari). iOS does **not** let one app list the apps installed on a phone. So the user picks from a list we make (known schemes) or types or pastes a link. A Shortcut can be launched too (`shortcuts://run-shortcut?name=...`; the scheme itself is **uncertain**, see s3).
4. **How many taps per widget?** Small: Apple now names it among sizes "with enough space for more than one interaction target" (this used to be one tap only; **uncertain** from which iOS version). Medium, large and Lock Screen rectangular take several links. Inline Lock Screen widgets: one target. Apple gives no number per size. The guidance is "make sure people can tap … with confidence". Our own sensible <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>: 4 in a small, 8 in a medium, 16 in a large (that is a design call, not Apple's).
5. **App Review risk.** Medium, and it is manageable. **4.3** (spam, "saturated categories"): launchers are a crowded field (3 checked below, one since 2014 with 3,387 ratings). A launcher-only app would be a copy. As one premade inside a Python widget IDE, it is a feature, not the app. **4.2** (minimum functionality): fine, since the app is an IDE. Apple's own HIG warns that "replicating an app icon offers little additional value", so the tiles should show something. **2.5.1** (public APIs only): we must use only documented URL opening. No private `App-Prefs:` settings links (a known rejection cause; **uncertain** how strictly it is enforced today). No guessing at installed apps.
6. **Other apps' notification badge counts?** **None.** The only badge API Apple documents "updates the badge count for your app's icon". The docs I read name nothing that reads another app's badge or notifications. That is the absence of an API, not a page that says "forbidden". It matches twenty years of iOS sandboxing. A launcher cannot show "WhatsApp: 3 unread", and we must not imply it can.
7. **What makes ours new (Tenet 3).** Every launcher today draws a fixed grid of icons. In pywidget, a Python script decides what each tile shows and which tiles show: a tile that says "Train in 6 min" and opens the transit app, "Standup in 4 min" that opens the meeting app, the grid that reorders by time of day. The launch itself stays one tap. The script computes the face, never the destination (see s6 for why).

## 1. The documented path: Link and widgetURL go to our own app

Apple, *Linking to specific app scenes from your widget or Live Activity* (fetched 2026-11-05 2:55 AM ET, `research/inbound/apple/developer.apple.com/documentation_widgetkit_linking-to-specific-app-scenes-from-your-widget-or-live-activity.m-2ddbd2ad.html`):

- "By default, tapping or clicking your widget or Live Activity opens its corresponding app."
- "If the view hierarchy includes more than one `widgetURL` modifier, the behavior is undefined."
- "For widgets with enough space for more than one interaction target — `WidgetFamily.accessoryRectangular`, `WidgetFamily.systemSmall`, and larger system family sizes — add one or more `Link` controls … If an interaction targets a `Link` control, the system uses the URL in that control."
- "Note: When the widget or Live Activity receives an interaction, the system activates the containing app and passes the URL to `onOpenURL(perform:)` …"

The page never mentions another app's URL. Read literally, every tap lands in our app first.

Apple, *Adding interactivity to widgets and Live Activities* (saved T-0671): "An interaction with a button or toggle should do more than open the app. If you want to offer an interaction that opens the app, use `Link` and `widgetURL(_:)`." So a Button is the wrong tool for a plain launch.

**`OpenURLIntent` (App Intents, interactive widgets).** Apple, *OpenURLIntent* (fetched 2:55 AM ET, `…documentation_appintents_openurlintent.md-d8212f2e.html`): "An app intent that opens one of your universal links … You can also place the app intent on a button in an interactive widget … the system sends the URL to your app's URL handling code", and "The system automatically brings your app to the foreground to run an app intent of this type." As documented it is for **our own** universal links, and it foregrounds **our** app. **Uncertain:** whether it opens a third-party URL from a widget button. Not documented, and I found no first-hand test. Secondhand, from web-search snippets of developer forum threads (2024; the pages themselves not read, since developer.apple.com/forums is not documentation under the #64 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>): a developer reports that swapping in "https://www.apple.com" made the intent open Safari ([forums 762586](https://developer.apple.com/forums/thread/762586), [758911](https://developer.apple.com/forums/thread/758911)). An answer reportedly from an Apple engineer says it "does require universal links and custom URL schemes are not supported". A write-up says the same ([onmyway133](https://onmyway133.com/posts/how-to-open-app-with-control-widget-on-ios-18/)). Those threads are mostly about iOS 18 Control Center controls, not Home Screen widgets. If they hold for widgets, `OpenURLIntent` reaches other apps through their `https` universal links, with no flash of ours, but not through custom schemes. The page I saved gives no iOS version line in its body (the intent is generally given as iOS 18; **uncertain**, not read from Apple).

## 2. The undocumented path that rivals use: direct launch from iOS 17

From the iTunes Lookup API (2026-11-05 2:57 AM ET, saved JSON), the developers' own store text:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. The undocumented path that rivals use: direct launch from iOS 17, scrolls sideways" style="--tw:1014px" markdown="1">

| App | Id | Current version | First released | Ratings | What it says about the tap |
|---|---|---|---|---|---|
| Launcher with Multiple Widgets | 905099592 | 5.8.2, 2026-09-22 | 2014-09-17 | 3,387, 4.51 | "Launch any app or shortcut on your device straight from the widget, with no detour through the Launcher app"; "Quick Widget for direct launching of apps and shortcuts on iOS 27" |
| Widgit - App Launcher Widgets | 1574162184 | 1.0.6, 2024-04-29 | 2021-07-20 | 149, 4.54 | "tapping on the Weather element will launch the iOS Weather app—this feature is only supported on devices with iOS 17 or above installed" |
| Launcher x – App Launcher | 6742345585 | 3.1.4, 2026-10-31 | 2025-02-26 | 195, 4.45 | "launch your frequently used applications, shortcuts and websites" (no word on a detour) |

</div>


Here is the shape of it. Two developers, independently, say "direct" and "iOS 17 or above". iOS 17 is the release that brought interactive widgets (App Intents on buttons). So the direct launch likely rides on that machinery, or on the system opening a `Link` URL that is not ours. **Uncertain which.** The first one also names something new for direct launching on iOS 27, which I could not tie to an Apple page in this pass.

**What would settle it (a device test, one afternoon for Idris):** a test widget with (a) `Link(destination: URL(string: "music://")!)`, (b) `widgetURL` to a third-party scheme, (c) a `Button(intent: OpenURLIntent(URL(string: "https://maps.apple.com/")!))`, (d) the same intent with a custom scheme, on iOS 17, 18 and the current OS. Record on screen whether pywidget flashes. Until that runs, the store copy must not say "opens instantly".

## 3. Which apps can be opened, and how a user picks one

- Apple, *canOpenURL(_:)* (fetched 2:56 AM ET, `…documentation_uikit_uiapplication_canopenurl___.md-eef9e288.html`): "The URL can have a common scheme such as `http`, `https`, `tel`, or `facetime`, or a custom scheme"; "you must declare the URL schemes you pass to this method by adding the `LSApplicationQueriesSchemes` key … Apps linked on or after iOS 15 are limited to a maximum of 50 entries … Apps linked on or after iOS 27 are limited to a maximum of 25 entries"; and "Unlike this method, the `open(_:options:completionHandler:)` method isn't constrained by the `LSApplicationQueriesSchemes` requirement. If an app is available to handle the URL, the system will launch it."
- So we **can** open any scheme, and we **can** check at most 25 schemes (iOS 27 SDK) to see whether the app is installed. We **cannot** list installed apps. The only public route is canOpenURL with declared schemes. I found nothing else in the pages I read.
- **Who publishes schemes:** big consumer apps (music, maps, messaging, social, notes, to-do apps), Apple's own apps, and power-user apps (Shortcuts, Drafts, Things and the like, the x-callback-url crowd). Many apps publish none. Apps change their schemes without notice. **Uncertain** for any one app until tested. The `shortcuts://run-shortcut?name=` form is widely used but I did not read it on an Apple page this pass.
- **How the user picks (proposal for Maren):** (1) a curated list of perhaps 25 common apps. We check those with canOpenURL so that only installed ones show. (2) "Paste a link" for anything else, including a universal link copied from the app's share sheet. (3) "Run a Shortcut" by name. The Shortcuts route reaches *any* app, because Shortcuts has an "Open App" action. It is the honest answer to "my app has no scheme". The icon is the user's choice of SF Symbol, colour and text. We cannot fetch other apps' icons (no API that I know of; **uncertain**), and copying their artwork is out anyway.

## 4. Tap targets per size

- Apple names small, medium, large and Lock Screen rectangular as sizes with room for more than one target (s1 quote). HIG *Widgets* (saved T-1443): "Note that inline accessory widgets offer only one tap target", and "Pay attention to the size of targets and make sure people can tap or click them with confidence".
- Lock Screen: HIG: "don't treat it as an additional way for people to launch into your app". A launcher on the Lock Screen is going against Apple's grain there. Home Screen first.
- Apple gives no maximum per size. Proposed cap (design, mine, for Maren to overrule): small 4 (2x2), medium 8 (4x2), large 16 (4x4). Each target is at least about 44 pt, the general iOS hit-target guidance (**uncertain** that Apple applies the 44 pt figure to widgets; not read this pass).

## 5. App Review

Quoted from the saved guidelines (`research/inbound/apple/developer.apple.com/app-store_review_guidelines-7d7ba114.html`, saved 2026-11-01):

- **4.2** "If your app is not particularly useful, unique, or 'app-like,' it doesn't belong on the App Store." Also **4.2.2** "apps shouldn't primarily be … a collection of links". A launcher-only app is close to "a collection of links". pywidget is an IDE where a launcher is one premade, which is far from it. **Low risk** for us.
- **4.3** (spam, duplicates, and (b) "saturated categories"): launchers are not named in 4.3(b)'s list, but the field is crowded (s2). Leading with "app launcher" in the store name or first screenshot would invite the comparison. **Low-to-medium**: keep the launcher a premade, never the headline, unless it is the script-computed kind (s7).
- **2.5.1** "Apps may only use public APIs … Apps should use APIs and frameworks for their intended purposes." Opening a URL is public. The risks are private settings schemes (`App-Prefs:`/`prefs:`) and any trick to detect installed apps beyond declared schemes. **Avoid both** and the risk is low. Whether a widget `Link` to a third-party scheme counts as "intended purpose" is **uncertain**. Apple's docs describe links into your own app. Rival apps doing it since 2023 (s2) is evidence that review accepts it, not proof.
- **4.2.3(i)** "Your app should work on its own without requiring installation of another app". The premade must still draw something with zero tiles set up.

## 6. Our own rule that stands in the way

pywidget today refuses any widget link that is not `pywidget://` (`pywidget/ios/Shared/TreeRules.swift`, `linkURL`, L12 P5, T-1134: "A tap in a widget goes into this app, never out of it"). The Python side refuses the same (`pywidget_ui._link_url_problem`). That rule is right for scripts. A script someone shares must not be able to send a tap to an address of its choosing. A launcher needs an exception that keeps the safety:

- The **user**, in the app's UI, saves launch targets (a list of slots, each holding a URL and a label). The list lives in the app group.
- A **script** names a slot (`ui.Launch("slot-3", ...)`), never a URL. The renderer looks the URL up from the user's list. A script cannot add or change one.
- This is a security design change to L12 P5, so it goes to whoever owns L12 (Idris and the reviewer) before any code. I have not decided it. I am only noting it.

## 7. Why ours would be new (Tenet 3)

Cuatro: I could **not** read its page. Gumroad's terms forbid it (s8). The store's three launchers all draw fixed grids of icons. The user chooses the icons once and they never change. What none of them can do, and pywidget can:

- **Tiles whose face a script computes.** "Train 6 min" opens the transit app. "3 PRs waiting" (from a public API the user's script calls) opens GitHub. "Standup in 4 min" opens the call. The data is what the script fetches itself, never another app's badge (plain answer, item 6).
- **Tiles that come and go.** At 8 a.m. the grid is commute apps, at 9 work, at night reading. The script picks which saved slots show, from the time, a calendar it reads, or a Shortcut input.
- **A launcher you can read in twenty lines of Python.** Fork the premade, change one rule, and it is yours. That is the product's whole <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitch</span>, applied to a job people already pay for.

The pitch is the script, not the grid. Uncertain: whether people want computed faces over plain icons. No review count backs it yet. A pass over 1-3 star reviews of the three launchers above would tell us what they complain about (my next step if asked).

## 8. Sources not read, and why

- **Cuatro, https://darugedigital.gumroad.com/l/cuatro: not read.** robots.txt allows it (`User-agent: *` / `Disallow: /purchases/` only, saved `research/inbound/t2535-launcher/gumroad-robots.html`). But Gumroad's terms (saved `research/inbound/t2535-launcher/gumroad-terms.html`, 2026-11-05 ~2:55 AM ET) forbid using "any manual or automated software … (including but not limited to spiders, robots, scrapers, crawlers …) to 'scrape' or download data from any web pages contained in the Services". They also forbid "using manual or automated software or other means to access … any pages". Terms first, so that stops this source. A web search snippet shows the same seller's "iLauncher" is a Widgy template ("requires the Widgy app", medium 2 launchers, large 5). Cuatro is likely the same kind of thing: a template for another widget app, not an App Store app. **Uncertain.** An Investor can open the page in a browser if its details matter.
- Proposal for Odalys: add `gumroad.com` to `terms_guard`'s refused hosts so no fetcher repeats this.
{% endraw %}

</div>
