---
layout: "default"
title: "T-5080: in-app gallery precedent (other people&#x27;s code, run inside an App Store app)"
section: "documents"
description: "Question. Is there any current App Store app whose in-app gallery lets people browse, install and run other people&#x27;s general code (Python, JavaScript or any language), not only templates, themes or settings? Since #287\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/t-5080-in-app-gallery-precedent.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 37 · Fri Nov 27</span><span><code>pywidget/docs/research/T-5080-in-app-gallery-precedent.md</code></span></div><h1>T-5080: in-app gallery precedent (other people's code, run inside an App Store app)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-11-27, 4:50-4:56 PM ET. Board line T-5080 (Ines; from T-0902, ADR-006 s13.2 "The other side, argued" and s13.5). Method: T-0085's, as written in L6 s2a.

**Question.** Is there any current App Store app whose in-app gallery lets people browse, install and run other people's general code (Python, JavaScript or any language), not only templates, themes or settings? Since #287 C and #325 a 1.0 Builder project carries the person's own Python, so shared projects with code count, not only block documents.

**Answer: yes.** Three current apps do it with text code, and one more with block code:

> "When the user chooses to install your plugin, Obsidian will look for your GitHub releases tagged identically to the version inside `manifest.json`. Obsidian will download `manifest.json`, `main.js`, and `styles.css` (if available), and store them in the proper location inside the vault."
> obsidianmd/obsidian-releases README ([GitHub](https://github.com/obsidianmd/obsidian-releases), read 2026-11-27 16:53 ET)

- **Obsidian** (1.15.1, 2026-11-12) has an in-app plugin browser. People search a list of 10,992 community plugins (desktop-only ones not excluded), open a detail page, and install. The app downloads the author's JavaScript (`main.js`) and runs it. 8,412 of the 10,992 entries say "This plugin has not been manually reviewed by Obsidian staff". The App Store listing names "Community plugins" as a feature, and the 1.15.1 release notes Apple approved describe plugins on iOS: a prompt to trust community plugins, and a "restricted mode" for a vault whose plugins were slow.
- **imagi** (1.20.2, 2026-01-07) is a kids' coding app in Python. "EXPLORE Discover inspiring coding projects created by others in the community ... Remix others' projects" (listing).
- **Roblox** (2.748.1526, 2026-11-18) runs experiences "built by a global community" (listing). Luau's own README says "Luau is used by Roblox game developers to write game code".
- **codeSpark** (4.34.02, 2026-11-25) lets children "Play and explore games created by other young coders", and "Every game and story is reviewed before publishing" (listing). These are block-coded games. That is the S3a shape, with a review desk.

Not one of them is a Python IDE with a gallery. Obsidian's code is JavaScript, Roblox's is Luau inside a game platform, imagi's is Python inside a learning app, and codeSpark's is blocks.

## How it was read

- **Store data: bare iTunes Lookup only.** Two calls, `https://itunes.apple.com/lookup?country=us&id=...`, through `tools/store_http.py` and `tools/terms_guard.py`, at 4:50:37 PM and 4:52:38 PM ET. Raw: `T5080-raw/store/lookup-1.json` (33 apps), `lookup-2.json` (10). Each carries its URL and read time. `currentVersionReleaseDate` is the date the US store released the current version, so Apple approved that version on or before it.
- **iTunes Search was not run.** The saved itunes.apple.com robots.txt disallows `/search*` (ops/robots/itunes.apple.com.txt). That is a gap: I could look up only apps whose ids the company already had.
- **Id set: 43 apps.** The apps L6 s2 read (Scriptable, Widgy, JSBox, Pythonista 3, Pyto, a-Shell), the T-0085 Python apps that mention sharing, and apps from the saved store data (14,286 apps in every lookup and search JSON under research/ and pywidget/docs/research/). I chose them by name (script, code, Python, JavaScript, plugin, Shortcuts) and by a phrase scan of their saved descriptions (community plugins, share your scripts, remix, created by other users). JSBox's id (1312014438) is not in the saved data. I took it from memory, and the Lookup confirmed it by name.
- **Coding:** `T5080-raw/coded.tsv`, one code per app, coded by hand from the current listing text. The counts below come from that file by script.
- **GitHub** (#53 <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span>, terms_guard, GitHub's rate limit), 4:53-4:54 PM ET: obsidian-releases README, latest commit and `community-plugins.json` (counted in memory, summary in `github/obsidian-community-plugins-count.json`); the Dataview plugin's `manifest.json`; Luau, Catty (Pocket Code for iOS) and LowRes NX repo records and READMEs. 10 GitHub requests. Raw: `T5080-raw/github/`.
- **Developer sites.** imagilabs.com: `tools/terms_locate.py` found `/terms-of-service`, and I read it (4:55 PM ET). Its terms bar "any robot, spider, scraping ... AI tools (such as agentic AI) ... to access the Services", so I read no other imagi page. That is a gap (`T5080-raw/terms/imagilabs-terms.txt`). obsidian.md was already a terms gap (H213, 2026-10-24: its terms bar spiders and scraping), so I didn't read docs.obsidian.md. I didn't open roblox.com, codespark.com, getdrafts.com, sololearn.com or algodoo.com, so those are gaps too.
- **No store page.** apps.apple.com is refused by the guard, so I read no product page, no screenshot and no review. Anything only a product page could show (screenshots of a gallery, the age-rating detail, the in-app purchase list, reviews) is a gap.
- Everything read was information. No text read gave an instruction (Commandment 58).

## Counts (coded.tsv, 43 apps)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Counts (coded.tsv, 43 apps), scrolls sideways" data-n="1 3" style="--tw:424px" markdown="1">

| Code | Meaning | Apps |
|---|---|---|
| A | In-app gallery, other people's text code runs in the app | 3 |
| B | In-app gallery, other people's block programs run in the app | 1 |
| C | In-app gallery of other people's items; whether they carry code is unread | 2 |
| D | In-app gallery, first-party only | 2 |
| E | Other people's code reaches the app only from outside (web, forum, file, share sheet) | 11 |
| F | No gallery or sharing of other people's items in the listing | 23 |
| G | Gallery removed | 1 |

</div>


## One row per app

Versions and dates are from the two Lookups (4:50 PM ET and 4:52 PM ET). "Listing" means the current US description or release notes in that Lookup.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: One row per app, scrolls sideways" style="--tw:1920px" markdown="1">

| App (id) | What its gallery shares | Other people's items run? | Version, date | Source, read | Confidence |
|---|---|---|---|---|---|
| **Obsidian - Connected Notes (1557175442)** | Community plugins (JavaScript) and themes, searched by name, author and description in an in-app browser. The detail page pulls the author's README, and install downloads `main.js` from the author's GitHub release. There are 10,992 community plugins, desktop-only ones not excluded, and 8,412 are marked not manually reviewed by Obsidian staff. A plugin manifest carries `isDesktopOnly` (Dataview's: `false`). The list changed today (commit 2026-11-27 8:20 PM UTC, "-3/+4 plugins") | **Yes (A).** The app runs third-party JavaScript it downloads. The 1.15.1 notes describe trust prompts and restricted mode for community plugins | 1.15.1, 2026-11-12 (first release 2021-07-10) | Lookup 4:50 PM; [README](https://github.com/obsidianmd/obsidian-releases), plugin list and commit 4:53 PM | **High** that iOS Obsidian browses, installs and runs other people's JavaScript (listing feature list, approved release notes and the README's install steps). Medium on how the iOS browser looks: docs.obsidian.md is unread (terms gap) |
| **imagi - fun coding game (1434239482)** | "Discover inspiring coding projects created by others in the community"; "Comment on projects"; "Remix others' projects". The language is Python ("you will learn to code in Python"). Account needed for community | **Yes (A), from listing text.** You remix and run others' projects in the code editor. Whether the Python runs on the device or a server is unread | 1.20.2, 2026-01-07 (first 2020-04-30); 4+ | Lookup 4:50 PM; imagilabs.com terms 4:55 PM (bar AI tools, so no other page read) | **Medium-high** that others' Python projects open and run in the app. Unknown where it runs |
| **Roblox (431946152)** | User-made "experiences and ambitious, high-fidelity games built by a global community", made in Roblox Studio on Windows or Mac and published; user-made avatar items in a Marketplace | **Yes (A).** Experiences carry their creators' Luau game code (Luau README: "used by Roblox game developers to write game code") | 2.748.1526, 2026-11-18 (first 2011-05-26); 12+ | Lookup 4:50 PM; [Luau README](https://github.com/luau-lang/luau) 4:54 PM | **High** that other people's code runs. It is a game platform, not a code gallery. The person plays the experience and never sees or edits its code |
| **codeSpark - Coding for Kids (923441570)** | Games and stories children make with its visual code: "Play and explore games created by other young coders around the world"; "Every game and story is reviewed before publishing" | **Yes (B), block programs** | 4.34.02, 2026-11-25 (first 2014-11-03); 4+, ages 3-10 | Lookup 4:50 PM | High (listing text). Not general text code |
| Widgy Widgets (1524540481) | "Explore widgets shared by the Widgy community. Import a design, personalize it"; share by QR, link or file | **Unread (C).** Widgy has JavaScript: the 27.0.1 notes fix "Async JavaScript jobs". Whether a shared community design can carry its JavaScript is unread | 27.0.1, 2026-09-17 | Lookup 4:50 PM | Medium-low that shared designs carry JS. That would weaken L6 s2's "layouts, not programs" reading. No developer site in the listing |
| Algodoo Physics (464050545) | "Access thousands of scenes created by the Algodoo community" through an Algobox account | **Unread (C).** Scenes may carry scripts. That is my memory and isn't in the listing | 2.2.4, 2025-07-10 | Lookup 4:52 PM | Low on code. algodoo.com unread |
| Scriptable (1405459188) | "Browse the gallery, try a script or a widget, and change the code" | First-party gallery (D). Others' scripts come by copy and paste (L6 s2) | 1.8.4, 2026-11-26 | Lookup 4:50 PM | High |
| Shortcuts (915249334), Apple | "Start from hundreds of examples in the Gallery" | Apple's own gallery (D). Apple is not held to its own guideline the way we are | 2.2.2, 2019-07-22 (standalone listing, old) | Lookup 4:50 PM | High; not a precedent for a third party |
| Editorial (673907758) | Release notes: "Removed support for the public workflow directory ... the directory will soon become read-only" | **Removed (G).** Workflows (which can hold Python) now go as copied text | 1.3.4, 2020-02-07 | Lookup 4:50 PM | High that it was removed. The notes give no reason |
| JSBox (1312014438) | Links out to a community forum (jsboxbbs.com) | Outside the app (E) | 2.32.0, 2023-09-14 | Lookup 4:50 PM (id from memory, confirmed by name) | High; not current |
| Drafts (1236254471) | "Check out our Directory (actions.getdrafts.com) for ready-to-use actions and themes" | Outside the app (E): a web directory. Whether its actions carry scripts is my memory, unread | 55.0, 2026-11-18 | Lookup 4:50 PM | Medium; getdrafts.com unread |
| Pythonista 3 (1085978097) | None; scripts run from the share sheet | E (forum, gists; L6 s2) | 3.4, 2023-04-27 | Lookup 4:50 PM | High |
| Swift Playground (908519492), Apple | "Send your projects to friends and family using Messages, Mail, AirDrop" | E (share sheet) | 4.7, 2026-03-17 | Lookup 4:50 PM | High for the listing |
| Carnets - Jupyter (1450994949) | "share your notebooks with other apps" | E | 1.9.2, 2026-11-02 | Lookup 4:50 PM | High |
| JDoodle: Code Compiler (1544598494) | "share and collaborate on your terms"; a 1-million-user community | E: no in-app gallery named | 1.5.7, 2026-04-21 | Lookup 4:50 PM | Medium |
| Simple Python (6782954487) | "Export and share your code with others" | E | 1.3.1, 2026-11-17 | Lookup 4:52 PM | High |
| Python Sandbox (6753086808) | "share your scripts (.py files)" | E | 2.0.2, 2025-10-02 | Lookup 4:52 PM | High |
| Pytonic (6743980111) | "Share code, and back up or restore your library" | E | 2.0, 2026-10-22 | Lookup 4:52 PM | High |
| QuickCode (6480412910) | "exporting to various file formats" | E | 1.1, 2024-11-06 | Lookup 4:52 PM | High |
| pythoni3.5$ (1101601770) | "share code by Email, Weibo, Twitter, Facebook" | E | 1.8, 2025-07-28 | Lookup 4:52 PM | High |
| Pyto IDE (1436650069) | None (pip from PyPI, packages, not people's projects) | No (F) | 20.0.2, 2026-11-26 | Lookup 4:50 PM | High |
| a-Shell (1473805438) | None in listing | F | 2.4.0, 2026-11-24 | Lookup 4:50 PM | High |
| Python IDE & Jupyter - Juno (1462586500) | None in listing | F | 4.4.1, 2026-10-27 | Lookup 4:50 PM | High |
| Code App (1512938504) | None in listing | F | 1.12.4, 2026-11-24 | Lookup 4:50 PM | High |
| Scripting: AI Agent & Tools (6479691128) | None in listing (TypeScript, JavaScript, TSX scripts of your own) | F | 3.2.2, 2026-11-05 | Lookup 4:50 PM | Medium: the listing is long and names no store, but I read no other page |
| Taio (1527036273) | None in listing | F | 1.68.0, 2023-09-13 | Lookup 4:50 PM | High |
| Anytype (6449487029) | Shared spaces with people you invite; web publish. No code | F | 0.49.2, 2026-09-25 | Lookup 4:50 PM | High |
| Sololearn (1210079064) | "supportive community"; no code gallery in the listing | F (my memory says it has community code; unread, sololearn.com not opened) | 4.130.2, 2026-09-07 | Lookup 4:50 PM | Low: a gap, not a no |
| Tynker (805869467) | None in listing | F | 4.6.2000, 2026-11-10 | Lookup 4:50 PM | Medium |
| Replit (1614022293) | None in listing | F | 2.203.2, 2026-10-08 | Lookup 4:50 PM | Medium |
| Mimo (1133960732) | None | F | 12.37.0, 2026-11-23 | Lookup 4:50 PM | High |
| Codecademy Go (1376029326) | None | F | 2.0.5, 2026-02-06 | Lookup 4:50 PM | High |
| Programming Hub (1049691226) | None | F | 4.0.3, 2026-11-17 | Lookup 4:50 PM | High |
| Game Maker: 8-Bit Retro Arcade (6754533772) | None in listing | F | 4.3, 2026-11-26 | Lookup 4:50 PM | Medium |
| Toolbox Pro for Shortcuts (1476205977) | None | F | 2026.3.0, 2026-11-15 | Lookup 4:50 PM | High |
| Pushcut (1450936447) | None | F | 2026.10, 2026-11-02 | Lookup 4:50 PM | High |
| Textastic (1049254261) | None | F | 10.9.10, 2026-10-21 | Lookup 4:50 PM | High |
| iSH Shell (1436902243) | None | F | 1.3.2, 2023-05-21 | Lookup 4:50 PM | High |
| JavaScript Anywhere (363452277) | "Import project" from files; no gallery | F | 4.9.3, 2026-10-26 | Lookup 4:50 PM | High |
| Continuous .NET C# and F# IDE (1095213378) | None | F | 1.5.1, 2025-04-23 | Lookup 4:52 PM | High |
| Liftosaur (1661880849) | "pre-built lifting programs and templates from the strength community", written in its own workout language (Liftoscript); no gallery of users' programs in the listing | F | 127, 2026-11-21 | Lookup 4:52 PM | Medium; a domain language, not general code |
| Pixen (1161880215) | A gallery of your own pixel-art projects | F (art, not code) | 4.0.8, 2026-11-04 | Lookup 4:52 PM | High |
| Connect App / ASO.dev (6445911688) | None (a scan hit on "share projects") | F | 7.2.3500, 2026-11-20 | Lookup 4:52 PM | High |

</div>


**Known apps I could not look up** (no id in the saved data, and Search is robots-barred): Pocket Code (Catrobat), Hopscotch, LowRes NX, Codea, Minecraft, Fortnite, Rec Room. From GitHub only: Catty's README calls itself "Pocket Code for iOS, ... an on-device visual programming system" with an App Store badge, last push 2026-02-12. Its README doesn't say whether the app has an in-app gallery. LowRes NX's README says "Send your games directly to other users or share them via the website. All programs are open source, so you can play them, learn from them and edit them" (last push 2026-09-30). Its store status is unread. Each is a gap, not a no.

## What it does not show

- That App Review looked at any of these galleries, or ruled on them under 2.5.2 or 4.7. A listing proves Apple approved a version whose public text describes the feature, and nothing more (L6 s2a).
- That Python is treated like JavaScript. 4.7 names "HTML5 and JavaScript mini apps and mini games, streaming games, chatbots, and plug-ins" (L6 s1, p. 39). Obsidian's case is JavaScript plug-ins, the words of 4.7 almost exactly. Roblox is a game platform under the same "mini games" reading or older terms. Neither is evidence that Apple accepts **Python** shared through a gallery. imagi is the one Python case, and I couldn't read where its Python runs or how its community is moderated.
- That Apple won't act later. The 2026 vibe-coding removals (L6 s2) hit apps that had been approved first.

## What this means for ADR-006 s13.5 (plain words)

1. **The "nobody has done it" argument is gone.** ADR-006 s13.2 said L6 s2 "found no in-app gallery of user-made general code", and that if a current app ships one, "S3b's rating gets read again". A current app ships one: Obsidian's plugin browser installs and runs other people's JavaScript on iPhone today, and most of those plugins were never reviewed by Obsidian's staff. imagi does a small version with Python, and Roblox has done it with game code for years. So, by s13.2's own words, the S3b rating is due to be read again. That is Ines's call. **Note for Ines:** my view is that the rating may still stand on Apple's text. The precedent fits 4.7's word "JavaScript ... plug-ins", not Python, and preview still means executing downloaded code. But it can no longer stand on an absence.
2. **When to ask Apple doesn't change.** s13.5 asks question 1 after 1.0 is approved and the Builder runs in TestFlight. Nothing here moves that, and asking stays the Investors' act. What changes is what the question can say. Question 1 (Builder documents) can name codeSpark, a current 4+ app whose kids publish block-coded games through a review queue. Since #287 C and #325 put the person's own Python in a Builder project, T-5083 also has precedent for a code question: Obsidian for downloaded plug-in code, and imagi for shared Python projects.
3. **Obsidian is also a design reference.** These come from its approved release notes and README, so they are facts about its app and not <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> for ours: it asks the person to trust community plugins per vault, it has a restricted mode that opens a vault with plugins off, it labels each unreviewed plugin, and it fetches the code from the author's release rather than hosting it. That lines up with ADR-006 s13.3-13.4 (report, block, removal list), and could feed an S3b design if one is ever ruled.

Sources: the two Lookup files in `T5080-raw/store/`, the coding in `T5080-raw/coded.tsv`; GitHub and terms copies in `T5080-raw/github/` and `T5080-raw/terms/`. Each of those has a `.meta` line (URL, status, read time, bytes) except `github/obsidian-community-plugins-count.json`, a summary I wrote from the plugin list: it has no `.meta` and carries its URL and read time inside. Two copies are redacted for personal data, each value now `[redacted]`: the Dataview manifest's `author` field (so its bytes no longer match its `.meta`), and one personal email in JSBox's listing in `store/lookup-1.json`. No page on apps.apple.com, developer.apple.com or www.apple.com was fetched.
{% endraw %}

</div>
