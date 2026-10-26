---
layout: "default"
title: "L7: Competition teardown and differentiators (pywidget)"
section: "documents"
description: "All rows from the 2026-10-25 19:20 Lookup unless marked. Store links are cited, not fetched. Ratings are US only."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/pywidget/l7-competition.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/L7-competition.md</code></span></div><h1>L7: Competition teardown and differentiators (pywidget)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, market and product researcher. 2026-10-25, from 19:18 ET by `date`; written by 19:25 (times below from `date` or the tool logs, not typed from memory). Brief: ops/plans/pywidget/build-brief.md, L7 (and 1.2-1.4, 2.1). Passive reading only; no contact with anyone (Commandment 10). Web text was read as data; nothing in it was followed as an instruction (Commandment 58).

> Listen to this, from Pythonista 3's own review feed: "Not maintained: Go with Pyto instead: This app had no updates for 2 yrs and functionalities on newer IOS versions are broken." (US review RSS for id 1085978097, read 2026-10-24, research/hunt/H186-<span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>.md section 3.) The reviewer points to Pyto. Pyto's last version is 2024-06-09. Here is the shape of it: the two apps people name for Python and code-built widgets on iPhone have both stopped shipping, and the maintained ones each cover only half of what we plan.

## 0. Sources, routes and what stays unread


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 0. Sources, routes and what stays unread, scrolls sideways" style="--tw:1280px" markdown="1">

| Source | Route | Read | Status |
|---|---|---|---|
| Price, ratings, version, version date, seller URL, description, release notes for 18 apps | Bare `itunes.apple.com/lookup?id=...&country=us` through tools/store_http.py, one call | 2026-10-25 19:20:14 ET | Raw: L7-raw/lookup-us-2026-10-25.json |
| Widgetsmith terms, then its Premium page | tools/terms_guard.py fetch, robots allow `/`; terms located from the sitemap, read first (no robot, scrape or crawl clause; the only "automatic" sentences are about subscription renewal) | 2026-10-25, between 19:20 and 19:24 ET (no per-fetch stamp kept) | Raw: L7-raw/widgetsmith-terms.html, L7-raw/widgetsmith-premium.html |
| Low (1-3 star) reviews, theme counts and quotes | US customer-review RSS, read in H186 on 2026-10-24 18:45-18:58 ET, **before** the 19:51 robots <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> | 2026-10-24 | Kept as read, **robots-unverified**, not refreshed (research/hunt/robots-itunes-ruling.md). Counts: research/hunt/H186-raw/review_codes.tsv; text: H186-raw/rev/ |
| Pythonista community, 2026 posts | H154 (GitHub Discussions read 2026-10-24, before the AUP 7 <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>; Arctic Shift for r/Pythonista) | 2026-10-24 | Reused with date, not re-read |
| Shelf position, Pythonista sizing, 2026 low reviews | H134, <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">PITCH</span>-12 (#44) | 2026-10-24 | Shelf rows came from the iTunes Search API, now barred: robots-unverified, reused, not refreshed |

</div>


**Unread, and why** (each needs a permitted route; none was worked around):
- Developer sites: pythonista.app (now the seller URL in Lookup) redirects to omz-software.com, whose terms are unread, so the redirect was not followed. scriptable.app, docs.scriptable.app, juno.sh, pyto.app, xnu.app (ScriptWidget): robots allow, terms unfound, so no page read (<span title="A figure we could not read because the source&#x27;s terms or robots file do not let our software read it. It never lowers a grade.">G2 gap</span>; tools/lane_preflight.py, 19:20 ET). widgy.app: robots.txt did not answer today, which counts as a full disallow. holzschu.github.io (a-Shell, Carnets) and every GitHub repo (stars, issue counts): held under the GitHub AUP 7 ruling and #53.
- Prices of in-app purchases and subscriptions: the Lookup API has no IAP field, and apps.apple.com product pages are refused by host (<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2a</span>). So Juno's Pro price, Pyto's subscription price, Widgy's slot price and Widgetsmith Premium's price are **unread**. Only what a description or a permitted developer page states is given.
- Update cadence: Lookup gives only the current version and its date; the version history lives on the product page (refused). Cadence below is "last version date" plus what the current release notes say.
- Community size: US rating counts are the only like-for-like number. Subreddit sizes (r/Scriptable, r/widgy, r/Widgetsmith) and Discord or forum sizes are **unread** (no permitted route chosen this session). New store entrants cannot be searched (iTunes Search barred); the entrants below are those already on file from the 2026-10-24 shelf reads.

## 1. Teardown

All rows from the 2026-10-25 19:20 Lookup unless marked. Store links are cited, not fetched. Ratings are US only.

### 1a. The named six


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 1a. The named six, scrolls sideways" style="--tw:2043px" markdown="1">

| App | Store link | Price model (as stated) | Last version | US ratings | What it does | Limits we can see | Review complaints (H186, 2026-10-24, low reviews of the most recent pages) |
|---|---|---|---|---|---|---|---|
| **Pythonista 3** (Ole Zorn) | [id1085978097](https://apps.apple.com/us/app/id1085978097) | $9.99 paid up front; no IAP named | **3.4, 2023-04-27** (confirms the brief) | 1,529, 4.45 | Python 3.10 IDE; numpy, matplotlib, pandas, requests bundled; iOS modules (ui, console, dialogs and more); share sheet, custom keyboard; scripts as Shortcuts actions | Python 3.10 (end of life 2026-10); no pip; no widget claim in the description; 30 months without a version | 150 low of 500 fetched: modules/pip 55, abandonment 26, crash 26, price 32 (regex codes). All 11 of its 2026 low reviews are on 3.4 (H134). "abandonware ... python has moved on while this is stuck in the past" |
| **Pyto IDE** (Develobile S.p.A.) | [id1436650069](https://apps.apple.com/us/app/id1436650069) | Free; "Full version exclusive third party modules" (price unread; reviews say trial and subscription) | **19.0.1, 2024-06-09** (notes: "updated by Apple to prepare for watchOS 27 compatibility. No new features") | 1,001, 3.67 | Python 3.10, 100+ packages, C/C++ compiler, terminal, debugger, GUI builder, `widgets` module for Home Screen widgets, `watch` complications, Shortcuts support | Stale 16 months; Python 3.10; numpy, pandas, matplotlib only in the paid full version; no interactive-widget claim | 158 low of 229: price/subscription 67, crash 40. "Old IAP no longer honored: I bought the in app purchase a long time ago and now it's requiring me to purchase it again." "PyPi only about 2/5" of the time |
| **Scriptable** (Simon Stovring) | [id1405459188](https://apps.apple.com/us/app/id1405459188) | Free; none named | **1.7.19, 2024-09-30** (notes: a tintable-widget fix for iOS 18) | 3,985, 4.68 | JavaScript widgets on Home and Lock Screen; native APIs (files, calendar, reminders, contacts, photos, location, web views); Siri Shortcuts with input and output | Stale 13 months; JavaScript, not Python; no interactive-widget claim; no iOS 26 release | 35 low of 150: crash 8, docs 6. One asks for Python: "I'm suggesting to the dev to create apps for python and php as well.. take my money" |
| **a-Shell** (Nicolas Holzschuch) | [id1473805438](https://apps.apple.com/us/app/id1473805438) | Free; none named | **2.3.0, 2026-10-24** (new commands incl. node, npm, ruff; crash fixes) | 561, 4.56 | Terminal with Python, numpy, matplotlib, clang to WebAssembly, TeX; Shortcuts runs commands and returns text or files | A terminal, not an IDE: no native UI from Python, no widgets | 33 low of 128: crash 6. "trying to copy output in this app is a living nightmare" |
| **Widgy** (Woodsign jdoo) | [id1524540481](https://apps.apple.com/us/app/id1524540481) | Free; "Optional in-app purchases unlock additional widget slots and features" (price unread) | **27.0.1, 2026-09-17** (iCloud sync, tap actions in Dynamic Island, Control Center, Live Activity) | 26,135, 4.65 | Visual layer editor for Home, Lock Screen, Apple Watch, Live Activities, Dynamic Island; custom data sources; community sharing by QR, link or file | No code (a layer editor); slot paywall; steep learning curve | 273 low of 500: widget 145, price 76, crash 63, docs 31. "you have to pay after uploading ONE widget." "Widget refresh rate is too slow to be useful." |
| **Widgetsmith** (Cross Forward) | [id1523682319](https://apps.apple.com/us/app/id1523682319) | Free; Premium monthly or annual (amount unread); 7-day trial ([widgetsmith.app/premium](https://widgetsmith.app/premium), read 2026-10-25 before 19:24) | **8.7, 2026-09-28** (stock photo collections) | **777,214**, 4.61 | Template widgets (photos, countdowns, weather, music), Lock Screen, Control Center, wallpapers, themes; widgets with Actions that run Shortcuts | No code; **interactive widgets, weather and tide are Premium only** (Premium page) | 100 low of 500: widget 54, price 18, crash 12. "you had to buy a subscription just to get it How I wanted it to turn out" |

</div>


### 1b. Serious entrants the brief does not name


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 1b. Serious entrants the brief does not name, scrolls sideways" style="--tw:1571px" markdown="1">

| App | Store link | Price model | Last version | US ratings | Why it matters |
|---|---|---|---|---|---|
| **Juno** (Rational Matter) | [id1462586500](https://apps.apple.com/us/app/id1462586500) | Free to edit; "Only one thing in Juno is Pro: running code", one-time purchase, "not a subscription" (price unread) | **4.3.6, 2026-10-20** | 1,141, 4.60 | Python 3.13, Jupyter, projects, REPL, Polars, DuckDB, pygame; App Intents run a file or code with arguments; "native alerts and pickers" and an Objective-C bridge; AI assistant. No widgets. Low reviews (50 of 118): price 14, crash 11. "DONT DOWNLOAD THiS APP ITS PAY TO USE" |
| **PythonIDE: Python Code Editor** (文禄 张) | [id6753987304](https://apps.apple.com/us/app/id6753987304) | Free; "Some features require Pro" | 1.7.5, 2026-09-15 | 44, 4.80 | The closest feature match on paper: Python 3.14, pure-Python packages from PyPI, "native MiniApps", "Create widgets, Shortcuts, and automation workflows", AI agent. Released 2026-02-13; small. No interactive-widget claim |
| **Scripting** (Shenzhen Yin Shi) | [id6479691128](https://apps.apple.com/us/app/id6479691128) | Free; none named | 3.2.1, 2026-10-01 | 138, 4.93 | TypeScript with SwiftUI components: widgets, **interactive tools**, Control Center toggles, Dynamic Island, custom keyboards, Shortcuts, share extensions; AI on the user's own key. The only maintained app claiming interactive code-built widgets. Not Python |
| **ScriptWidget** (峰 朱) | [id1555600758](https://apps.apple.com/us/app/id1555600758) | Free; none named | 27.1.4, **2026-10-25** | 99, 4.53 | JSX-style JavaScript widgets for iOS and macOS, templates, "write, preview, and refine" |
| **Color Widgets** (Digital Charms) | [id1531594277](https://apps.apple.com/us/app/id1531594277) | Free; Pro "USD$2.50/month billed yearly" after a 3-day trial (stated in the description) | 9.0.0, 2026-09-15 | 527,327, 4.60 | Thousands of predesigned widgets, a customizer, themes and icon packs, user-crafted theme library; already ships iOS 27 XL widgets |
| Carnets (Holzschuch) | [id1450994949](https://apps.apple.com/us/app/id1450994949) | Free | 1.9.1, 2025-11-26 | 321 (+91 for the scipy build) | Jupyter notebooks; pure-Python `%pip install`. No native UI, no widgets |
| Python Coding Editor & IDE App; Python Editor App | [id6444399635](https://apps.apple.com/us/app/id6444399635), [id1672453872](https://apps.apple.com/us/app/id1672453872) | Free; Python Editor App: subscription after a 3-day trial | 2026-09-22; 2026-05-16 | 3,042; 6,447 | Generic editors with AI help, the biggest Python names by ratings; neither claims Shortcuts, native UI or widgets |

</div>


## 2. What the teardown says, counted

- Apps that build widgets from **Python**: 2 (Pyto, stale since 2024-06-09; PythonIDE, 44 ratings). From JavaScript or TypeScript: 3 (Scriptable, stale since 2024-09-30; ScriptWidget; Scripting).
- Of the 18 Lookup descriptions, those claiming **interactive widgets**: 1 (Scripting, in TypeScript). Widgetsmith claims them on its Premium page (Premium only, no code). Python with interactive widgets: 0. (Five descriptions say "interactive"; by hand, the other four mean a REPL or interactive input. Counted by script, contexts read: 2026-10-25, by 19:24.)
- Maintained (a version in 2026) Python IDEs with native UI and Shortcuts: 2 (Juno, PythonIDE). Juno charges to run code; PythonIDE paywalls "some features".
- Apps that state they run scripts written for Pythonista's modules: 0 of 18 descriptions (H150 K1-2 not triggered). The word appears in one other description, Python Coding Editor & IDE App's "Become a Pythonista", as wordplay.
- Apps that describe a **block or visual builder that also produces editable code**: 0. Widgy and Color Widgets are visual only; the code apps are code only.
- Apps that describe Shortcuts **authoring tooling** (flow view, diff, lint): 0 of 18 (the five "diff" hits are the Unix command or part of another word). Not a full search of Shortcuts helpers (H209 read six; none did).
- Apps with a web or desktop IDE companion: 0 of 18 described (Juno's and Python3IDE's "browser" is an in-app viewer; ScriptWidget runs on macOS itself, a second app target, not a web editor).
- Price complaint share of low reviews: Pyto 67 of 158, Widgy 76 of 273, Juno 14 of 50, Widgetsmith 18 of 100. People are tired of paying to run or place the thing they made.

## 3. The brief's differentiators, tested


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 3. The brief&#x27;s differentiators, tested, scrolls sideways" style="--tw:958px" markdown="1">

| Differentiator | Survives? | Why |
|---|---|---|
| Compatibility with the abandoned app's scripts (C3) | **Survives as unique, but narrow** | 0 of 18 claim it. But the static ceiling is 3 of 113 public scripts using only version-1 modules (H153), and 0 of 27 2026 Discussions posts ask where to move (H154). It pulls a small, motivated buyer and catches store searches for that name; it cannot carry the headline, and the name stays out of metadata (PITCH-12 section 5; L15 legal checkpoint) |
| Block↔code bridge | **Survives** | No app describes blocks that turn into editable code. Demand is unmeasured (0 forum asks for Python widgets in 12 months, H186), so it is a novelty claim, not a proven pull. Hard to build (L17) |
| Best-in-class widget design | **Does not survive** | Widgetsmith (777,214 ratings) and Color Widgets (527,327) own "beautiful"; Widgy already does Live Activities and Dynamic Island. Unprovable at launch; keep it as quality, not a claim |
| Live preview | **Does not survive** | ScriptWidget says "write, preview, and refine"; Widgy and Widgetsmith are WYSIWYG. Table stakes |
| Shortcut Lab tooling | **Survives on the shelf, held by feasibility** | No helper read describes flow view, diff or lint. L9 says we cannot read the user's library, so the claim depends on what imports allow. Lead with it only after L9 is solved |
| Curated, safe marketplace | **Partly** | Sharing exists (Widgy by QR, link, file; Color Widgets' theme library). A reviewed marketplace of runnable Python widgets is new, but it carries the most App Review risk (L6, 4.7, 2.5.2) and is the paid tier. Say "safe" only when moderation ships |
| Keeping Python current | **Survives only against the stale three** | Juno ships 3.13 and updated on 2026-10-20; PythonIDE ships 3.14; a-Shell updated yesterday. Against Pythonista, Pyto and Scriptable it is the whole story; against Juno it is parity |
| Web IDE | **Survives as unclaimed** | No competitor describes one. Value unmeasured; L14 says it cannot match the phone exactly |

</div>


**Two the brief did not list, which survive:**
1. **Interactive widgets whose logic is Python.** 0 apps (H186 found the same on 2026-10-24; today's descriptions unchanged). Scripting proves people build interactive code widgets in TypeScript; Widgetsmith sells interactivity as Premium. L1 and L5 bound it (snapshots, App Intents buttons and toggles), which is still more than any Python app claims.
2. **Running code is never paywalled.** Juno's only Pro item is running code; Pyto locks numpy, pandas and matplotlib behind its full version; Pythonista is $9.99 and stale. The brief already makes the base app free and charges for the marketplace (2.1), so this costs us nothing to say, and it answers the most common complaint in these feeds.

## 4. The competitor that threatens us most

**Juno.** It is maintained (2026-10-20), current (Python 3.13), rated 4.60 on 1,141 US ratings, and already has the parts of our IDE pillar that are hardest to copy: App Intents with arguments, native alerts and pickers, an Objective-C bridge, bundled data packages. It lacks widgets and builder blocks. One release adding a `widget` API would put it on both pillars with a two-year head start on the IDE. What protects us: Juno is a notebook-first data tool ("This is not an IDE, this is a notebook", a 1-star review), it charges to run code, and nothing in its description points at the Home Screen.

Watch also: **Scripting** (the interactive-widget bar, 4.93, maintained monthly, TypeScript) and **PythonIDE** (the same feature list on paper, Python 3.14, 44 ratings; if it gains ratings it is the direct rival).

## 5. Positioning statement (proposal; messaging needs Investor approval, <span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>)

For people who want their iPhone to do something only they would think of, from Python hobbyists and Shortcuts tinkerers to people who just want a widget nobody sells, pywidget is the maintained Python app for iPhone and iPad that runs your scripts free and puts them on your Home Screen as interactive widgets, built in code or in blocks. Unlike Juno, it does not charge you to run code and it reaches the Home Screen; unlike Scriptable and Pyto, it is current and still shipping; unlike Widgetsmith and Widgy, the widget can do whatever your code can.

## 6. Top 3 differentiators to lead with (proposal)

1. **Interactive widgets powered by Python.** Buttons and toggles on the Home and Lock Screen whose logic is your Python. No app claims this today (0 of 18 descriptions; the one interactive code-widget app, Scripting, is TypeScript).
2. **Code or blocks, same widget.** Start with blocks, open the Python behind them, keep editing either way. No app describes this (0 of 18 mention blocks). Demand unmeasured: present it as an on-ramp, not as an answered request.
3. **Free to run, current, maintained.** A current CPython, native dialogs and Shortcuts actions, and running code never paywalled. Answers the price complaints (Pyto 67 of 158 low reviews, Juno 14 of 50) and the abandonment complaints (Pythonista 26 of 150).

Held back on purpose: compatibility with the abandoned app (unique, but narrow and a legal checkpoint: use it on the migration page, not the headline), Shortcut Lab (until L9), the marketplace (until moderation), design and live preview (table stakes).

## 7. Corrections filed

Brief claims this read contradicts or weakens: [CORRECTIONS.md](corrections.html), rows dated 2026-10-25 (Wrenna). The brief's Pythonista facts (3.4, 2023-04-27, Python 3.10) are **confirmed**, not corrected.

## 8. Open

- IAP and subscription prices for Juno, Pyto, Widgy and Widgetsmith: need a permitted route (a person's browser read of the product pages, or Investor approval of a route).
- Subreddit and Discord sizes for Scriptable, Widgy and Widgetsmith; GitHub stars for Pyto and a-Shell (held, AUP 7).
- PythonIDE's and Scripting's real widget limits: their docs are unread.
- Juno roadmap: whether widgets are planned. Its site terms are unfound, so juno.sh is unread.
{% endraw %}

</div>
