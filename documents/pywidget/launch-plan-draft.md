---
layout: "default"
title: "pywidget v1: launch plan, first draft"
section: "documents"
description: "Here is the shape of it. The people who would buy NAME already have a Python app on their phone, and they love it more than it deserves. They are not out searching for us. Nobody in twelve months of the forums I could\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-store-drafts/' | relative_url }}">← App Store Drafts</a><a href="{{ '/documents/pywidget/launch-plan-draft.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/release/launch-plan-draft.md</code></span></div><h1>pywidget v1: launch plan, first draft</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, market and product researcher, 2026-10-26, started 20:08 ET (`date`). Board line T-0249.

**DRAFT under <span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>. Nothing here is approved, posted, sent or scheduled.** Under Commandment 10 the company never contacts anyone and never posts anywhere: this file proposes, and the Investors decide whether any of it happens and do it themselves, from their own accounts. Every post below is copy for their approval, not a promise that it goes out. Commandment 6 <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> throughout: no claim v1 does not make good, no fake or paid reviews, no asking people to upvote or rate, no false scarcity, no countdowns.

Companion file: [press-kit-draft.md](press-kit-draft.html). Store copy these posts must agree with: store-page-draft.md. Gates (a sentence is deleted, never softened, if its gate fails): **<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G5</span>** widgets make the Day 14 cut line (ADR-001 3.3); **G6** the Pro purchase and its price (PROPOSAL-001, the Investors'); **G3** numpy, Pillow, matplotlib ship; **V** the shipped interpreter is 3.15.x. NAME, [price], [Pro name], [Pro contents] and [App Store link] are fills.

Tags: [doc] a company file says it, linked; [count] a script counted it from a saved file; [recall] my memory, unverified; [open] a fact we do not have, which a person reads or the Investors supply; ASSUMPTION as in L11.

> Listen to this, from the abandoned Python app's own forum, 2026-10-21: "would very much like to continue using the existing app" ([omz/Pythonista discussion #140](https://github.com/omz/Pythonista/discussions/140), quoted in [H154](../hunt/h154.html)).

Here is the shape of it. The people who would buy NAME already have a Python app on their phone, and they love it more than it deserves. They are not out searching for us. Nobody in twelve months of the forums I could read asked for "Python widgets" in those words (0 counted, H186-<span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> s4). So this launch cannot wait to be found. It has to be put, once and plainly, in front of the few rooms where Python people who use iPhones already talk, by the two people allowed to speak there.

## 1. Who buys, and where they already gather


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Who buys, and where they already gather, scrolls sideways" data-n="1" style="--tw:1320px" markdown="1">

| # | Buyer | Evidence (counts, with links) | Where they gather | Ours to post in? |
|---|---|---|---|---|
| B1 | **Owners of the abandoned Python app** who want a current Python. The one paying buyer we have counted. | $9.99 up front, 1,529 US ratings, last version 2023-04-27, Python 3.10 ([L7 s1a](l7-competition.html)). Low reviews: 150 of 500 fetched; modules/pip 55, abandonment 26, crash 26 ([L7 s1a](l7-competition.html), H186 review read 2026-10-24, robots-unverified). All 11 of its 2026 low reviews are on 3.4 (PROPOSAL-001-v1-paid-tier s2). Implied lifetime downloads 51,000-153,000 ([L11 s5](l11-economics.html), tools/sizing.py) | Its GitHub Discussions: 27 posts in 2026, by people still building on the app; 0 of 27 ask where to move ([H154](../hunt/h154.html)). r/Pythonista: the archive's newest post is 2020-04-15 (H154). r/Python and Discord: not read (H154 line 48) [open] | **No.** The Discussions are another maker's room; a rival's launch post there is poor manners and likely against its norms [open: its rules unread]. They reach us through the general Python rooms in B2 |
| B2 | **Hobbyist Python programmers on iPhone and iPad** who want their code to do something on the device (PROPOSAL-002 s1, the v1 audience). B1 is a named subset. | 11 of the 18 apps in the saved Lookup describe Python ([count], L7-raw/lookup-us-2026-10-25.json, 2026-10-25): demand is real enough to hold a shelf. Price fatigue: Pyto 67 of 158 low reviews on price, Juno 14 of 50 ([L7 s2](l7-competition.html)) | r/Python (16 hits on "Scriptable but python" were desktop CLI posts, H186-shelf s4: the room is active, the topic is new to it). Hacker News: two Show HN precedents, "Show HN: Python Widget – run python code on iOS today screen" (2015-04-22, [item 9423491](https://news.ycombinator.com/item?id=9423491)) and "Show HN: Build Android homescreen widgets with Python" (2026-04-14, [item 47768556](https://news.ycombinator.com/item?id=47768556)), both from H186-shelf s4, HN figures terms-unverified. Python newsletters [recall: PyCoder's Weekly and Python Weekly take link submissions] [open]. Sizes of all of these: [open] | Yes, through the Investors' own accounts, under each room's self-promotion rules [open: read by a person before Day 15] |
| B3 | **People who already run Python from Shortcuts and see it break.** | U = 6 distinct authors (7 issues) in the a-Shell and Pythonista trackers, 2025-01 to 2026-05; A = 3 who asked for Python as a Shortcuts action or watch face (H186-demand). Example: "The same operation times out when executed through the a-Shell Shortcuts action" ([a-shell#1060](https://github.com/holzschu/a-shell/issues/1060)) | r/shortcuts: active (158 titles on 5 phrases in 12 months, floors, [H157](../hunt/h157.html); 22 posts on 4 of 12 queries in 30 days, [H209 s3](../hunt/h209.html)); none of those 22 asks to run code. The two trackers above | r/shortcuts yes (Investors, rules [open]). The trackers **no**: rivals' rooms |
| B4 | Shortcuts power users who do not write Python (secondary, PROPOSAL-002 s1) | Paid helpers exist (Pushcut Pro $1.99 a month, [H209 s2](../hunt/h209.html)) | r/shortcuts | Same post as B3; no separate effort |
| - | Non-coders who want pretty widgets: **not a v1 target** | Widgetsmith 777,214 US ratings sells templates and a visual editor; twelve premades and no Builder lose to it on the first screen (PROPOSAL-002 s1) | r/homescreen and similar [open] | Not proposed for v1 |

</div>


What is missing from this table, and I want it said: no subreddit, newsletter or HN size is read. Every "expected reach" in section 5 that depends on one is [open].

## 2. Positioning and the one-line <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitch</span> (options for the Investors, C51)

**Positioning (v1 only).** For people who already write Python and carry an iPhone, NAME is a place to write and run current Python on the phone, free to run[[G5: , where a script can put what it makes on the Home Screen and Lock Screen as a widget]]. It is maintained, it asks for no account, and nothing leaves the device unless your own code sends it.

This replaces L7 s5, which was written against the brief before ADR-001 cut v1: it led with interactive widgets and code-or-blocks, and neither is in v1 (1.1 and 1.2). It also named rivals; public copy here names none.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. Positioning and the one-line pitch (options for the Investors, C51), scrolls sideways" style="--tw:1103px" markdown="1">

| # | One-line pitch | Gates | Note |
|---|---|---|---|
| **P-A (recommended)** | "Python® 3.15 on your iPhone, free to run, and your scripts can live on your Home Screen." | V, G5, G6 ("free to run": any PROPOSAL-001 option except 4) | Says the three things in the order a Python person checks them. Same claims as store promo P1 and screenshots 1-2 |
| P-B | "Write Python on your iPhone. Run it free. Put it on your Home Screen." | G5, G6 | Shorter, for social posts; drops the version |
| P-C | "Current Python on iPhone and iPad: a real editor, a console, native dialogs and Shortcuts actions." | V | The fallback if widgets are cut on Day 14 (store promo P3) |

</div>


® on the first mention follows the PSF rule (names.md); a social post may need it too [open: the same nominative-use read as store-page F1].

## 3. What is new (Tenet 3), counted, and what is not

Counted from the 11 Python apps among the 18 saved App Store descriptions (L7-raw/lookup-us-2026-10-25.json, read 2026-10-25; my script, 2026-10-26 by 20:14 ET). This is our candidate set, not the whole shelf: store search is barred to scripts (G2a), so a person checks it again on launch day.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3. What is new (Tenet 3), counted, and what is not, scrolls sideways" style="--tw:960px" markdown="1">

| Claim | Count | Holds? |
|---|---|---|
| Python widgets on the **Lock Screen** and in **StandBy** | 0 of 11 Python descriptions say "Lock Screen"; 0 say "StandBy" | **New** [G5] |
| **Python 3.15** | Newest version named: 3.14 (PythonIDE, Pythona); Juno says 3.13 | **New** on the day of launch [V]; it stays new only until a rival updates |
| **Every premade widget is Python you can open and change** (free ones at once, Pro ones once bought) | 0 of 11 Python descriptions mention premade widgets or templates; the precedent is JavaScript (Scriptable's gallery, "tap Get to view the code", [L6](l6-app-review.html)) | **New for Python** [G5] |
| **Running your own code is never paywalled**, with widgets | Juno's one Pro item is running code; Pyto locks numpy, pandas, matplotlib; the stale incumbent is $9.99 ([L7 s3](l7-competition.html)) | **New as a combination**; a-Shell and Carnets are free but have no widgets [G6] |
| A widget extension that **runs no code** (it draws a tree the script saved) | not claimed by any description | True and good for safety; a reason to trust, not a reason to buy. Press note only |
| Python on iPhone; widgets from code; Shortcuts actions | 11 Python apps; Home Screen widgets claimed by 2 (Pyto, PythonIDE; Carnets and Python3IDE mean ipywidgets); Shortcuts named by 5 of 11 | **Not new.** Never claimed as first |

</div>


And one novelty outside the app: it was made by a company whose staff are AI agents, with every outside action taken by two people, and every image drawn by code (Commandment 9). That is the press angle (press kit, section 4), and it cuts both ways (risk R6).

## 4. The path to about $286 gross

$200 net is **$285.71 gross at Apple's 30%**, or $235.29 at 15% if the Small Business Program enrollment comes through after the membership ([L11 s0](l11-economics.html)). US storefront; sales outside the US net less after VAT/GST, and Apple's proceeds per price point are rounded by Apple, so the real count can be one higher [recall].

*(Updated 2026-10-26 20:24 ET (`date`), Wrenna, T-0274, to Ines's decision memo [DECISION-2026-10-26-revenue-gap](decision-2026-10-26-revenue-gap.html) (2b5411a9, 8a34eb03): $14.99 row first, her planning value beside mine, her asks in her order in section 5. The price stays the Investors' (PROPOSAL-001).)*

Window: submit Day 17 (2026-11-07, [plan.md](pywidget-plan.html)); on sale about Day 20 (2026-11-10) if the first review passes; about 10 selling days to <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> (2026-11-20). Organic downloads with no outreach: 5-35 a day, 50-455 in the window (ASSUMPTION, L11 s3); Ines plans on 5-20 a day, about 150 (memo s1, also an assumption).

Two figures for buyers per download, and **neither is a measurement**:

- **1-4%: an assumption.** Mine, from L11 s3 and s7, where it is labelled ASSUMPTION. L11 did not measure it, and no company file does.
- **2% (range 1-3%): an assumption.** Ines's planning value (memo s1), set lower than mine because the one counted buyer paid $9.99 to run Python, which we give away free, and because a download late in the window may buy after Day 30. L11 did not measure this one either. She allows 4% only if Pro holds the packages.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 4. The path to about $286 gross, scrolls sideways" data-n="5" style="--tw:1516px" markdown="1">

| Candidate price | Source | Pro sales for $200 at 30% (15%) | Gross at that count | Sales a day over 10 days | Downloads needed at Ines's 2% (her 3% / 1%) | Downloads needed at my 4% / 1% |
|---|---|---|---|---|---|---|
| **$14.99 once** | **Ines's recommendation**, memo s2 (the Investors' call) | **20 (16)** | $299.80 | 2.0 | **1,000** (667 / 2,000); 800 at 15% | 500 / 2,000 |
| $9.99 once | the price the counted buyer already paid; Ines's earlier suggestion, **withdrawn** in memo s2 | 29 (24) | $289.71 | 2.9 | 1,450 (967 / 2,900) | 725 / 2,900 |
| $19.99 a year, no trial | PROPOSAL-001; memo s2 says wrong for Day 30 (3.1.2 ongoing value, no server in v1) | 15 (12) | $299.85 | 1.5 | 750 (500 / 1,500) | 375 / 1,500 |
| $4.99 once | Ines's alternative, PROPOSAL-001-v1 s5 | 58 (48) | $289.42 | 5.8 | 2,900 (1,934 / 5,800) | 1,450 / 5,800 |
| $2.99 once | contrast only | 96 (79) | $287.04 | 9.6 | 4,800 (3,200 / 9,600) | 2,400 / 9,600 |

</div>


Arithmetic by script (ceil of 200 / (price x 0.70 or 0.85), then ceil of sales / rate; 2026-10-26 20:24 ET); not a forecast. A monthly price or a trial pushes charges past Day 30 (L11 s1) and is not a candidate.

Here is the shape of it, read across. At Ines's 2% on her likely 150 organic downloads, 3 buyers: $31.48 at $14.99, $20.98 at $9.99. Even at the top of the organic guess (455 downloads), $14.99 nets $94.44 at 2%, $136.41 at 3% and $188.87 at my 4%. **The gap between 50-455 organic downloads and the 1,000 that $14.99 needs at 2% is what the Investors' posts in section 5 have to close.** Ines's most likely Day 30 range is **$30-$150 net**, and she puts $200 at about one in four, her judgment, resting on Show HN or an Apple feature landing (memo s0, s6). If the Investors choose not to post, her case A applies: about $31 likely, $0-$147.

### 4a. Measured figures from comparable apps: what the repo holds

I looked for any measured conversion or download figure for a paid developer tool or a widget app in what the company has already saved: L11 and its raw files, L7, the hunt archive, research/sizing.md and the store-research files. No new fetch was made for this. **No measured conversion or download figure exists in the repo for a Python, coding or widget app.** Every "downloads a day" for a rival (L11 s2, the hunt's <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> sizes) is ratings multiplied by 33-100, and that ratio is itself an assumption (tools/sizing.py: "Assumption is the caller's"). Idris's H173 calibration found one post to test it and could not confirm it ([H173 s6](../hunt/h173.html)).

What the repo does hold is a few launch posts in which developers reported their own numbers ([H173 s4-s5](../hunt/h173.html), raw posts in research/hunt/H173-raw/). Each figure is the poster's own claim, not verified. All were read through Arctic Shift on 2026-10-24, a route barred since then pending #53, so they are reused from the saved file, terms-unverified, and nothing was read again. None is a Python or widget app.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 4a. Measured figures from comparable apps: what the repo holds, scrolls sideways" style="--tw:1236px" markdown="1">

| Post (saved) | App type and model | Figure as posted | What it says about us |
|---|---|---|---|
| [r/iOSProgramming 1v7vvb3](https://www.reddit.com/r/iOSProgramming/comments/1v7vvb3/), 2026-07-27 | **10 paid-up-front developer and media tools** (a Redis GUI, an SFTP client, a web-IDE client, video tools, a Markdown editor) | "10+ sales", "Total revenue: ~$70" over 2 months; "Zero ratings"; best app 4 sales on 263 product page views | The closest comparable we hold: developer tools with no audience and no ratings sold about one unit per app in two months. Closer to case A than to 20 sales |
| [r/SideProject 1tczn4a](https://www.reddit.com/r/SideProject/comments/1tczn4a/), 2026-05-14 | habit app, free with a purchase | 60 downloads, 1 paying user, $16, about 2 months | 1 of 60 is 1.7%, inside Ines's 1-3%; one buyer is not a rate |
| [r/SideProject 1s56udi](https://www.reddit.com/r/SideProject/comments/1s56udi/), 2026-03-27 | fitness app, free with in-app purchases and a trial, paid ads run | first 20 days: 305 downloads, 59 in-app purchases, $99; "Day 7 download-to-paid 3.13%" | At the top of Ines's range, with paid ads, a trial, a mailing list and 100 TestFlight users beforehand, none of which we have |
| [r/SideProject 1to4awo](https://www.reddit.com/r/SideProject/comments/1to4awo/), 2026-05-26 | Reflect, free with optional premium | ~27 downloads in 12 days with no audience, 5 ratings | About 2 a day, below the 5-20 a day Ines plans on: organic reach with no posts can be smaller than both our ranges |

</div>


Read together, these four posts put us at Ines's planning value or below it, and they do not support my 4%. These are four posts chosen by the people who wrote them, so I treat them as a check on direction only, not as a rate.

How each sale would arrive, by source (proposal for what to watch, not a forecast): App Store search for "python" terms (keywords kw-a to kw-c, store page s4), the launch-day posts (section 5), and word of mouth from buyers who are happy. Only the first runs without anyone posting. The Investors can read the split in App Store Connect's analytics (sign-in; theirs) and paste it into a report; the company does not read it.

## 5. Dated action list for the Investors, Day 15 to Day 30

Plan case: approval on **Day 20 (Tue 2026-11-10)**, called **L** below. If approval comes earlier or later, every row from L on moves with it; the order and the spacing stay (L carries Show HN, the newsletters and the Investors' own accounts, per the memo; the rooms after it get one a day). Posting before the app is on sale wastes the one first impression, so nothing is posted before L.

Every action is the Investors', from their own existing accounts. **Cost $0 for every row**; no paid row is proposed (section 5b). Reach is given only where something is counted; otherwise [open] with what a person would read to fill it.

**The four asks, in Ines's order** ([memo s4](decision-2026-10-26-revenue-gap.html), items 1-4; updated 2026-10-26 20:24 ET, T-0274). The company proposes; the Investors decide and act (C10).

1. **Enroll in the Small Business Program the day the membership is active** (due Day 7, Wed 2026-10-28). At 15%, $14.99 needs 16 sales, not 20. [recall: the lower rate applies from enrollment, not back to earlier sales, so the date matters.]
2. **Show HN on launch day (L), with one of you present that day to answer questions.** The single largest swing in the plan; nothing we hold sizes it.
3. **Submit to the Python newsletters on L, not L+4.** Issue dates are the editors', and L+4 risks landing after Day 30.
4. **Apple's featuring nomination, the day the app record exists** (Day 12-16), if the form exists as recalled. [recall: in App Store Connect; Apple asks for lead time, so the odds inside the window are low; the cost is about ten minutes.]

The rest of her list (memo s4 items 5-7) is the table below as it was: r/Python L+1, r/shortcuts L+2, their own social accounts on L, no reposting; the person's read of rival in-app prices (questions item 9); no paid ads.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 5. Dated action list for the Investors, Day 15 to Day 30, scrolls sideways" data-n="6" style="--tw:1652px" markdown="1">

| Day (date) | Channel | Action (the Investors') | Post draft | Expected reach and its basis | Cost |
|---|---|---|---|---|---|
| **7 (Wed 10-28), the day the membership is active** | App Store Connect (signed in) | **Ask 1.** Enroll in the Small Business Program | none | Not reach: cuts the sales needed at $14.99 from 20 to 16 (memo s2) | $0 |
| **12-16 (11-02 to 11-06), the day the app record exists** | App Store Connect (signed in) | **Ask 4.** Apple's featuring nomination, if the form exists as recalled | none | [open]; would dwarf everything else if it came, and is not counted on | $0 |
| 15 (Thu 11-05) | Report reply | Approve, change or reject: the icon and screenshots (PROPOSAL-003), store copy (store-page-draft), this plan's posts (D1-D6) and the press kit. Choose the channels you are willing to post in | none | n/a | $0 |
| 15 (Thu 11-05) | Each chosen room's rules | Read the self-promotion rules of r/Python, r/shortcuts and r/iOSProgramming, and HN's Show HN guidelines, as a person (about 15 minutes). Paste anything that changes a draft into the report thread | none | Fills the [open] "rules" cells; [recall] r/Python has a project-showcase format and r/iOSProgramming limits self-promotion to set days, both unverified | $0 |
| 16 (Fri 11-06) | App Store Connect (signed in) | Product page fields from the approved copy; price (PROPOSAL-001); Support URL with contact and the Privacy Policy URL published ([matrix s2c](app-review-matrix.html); ops/questions.md item 14); release setting (matrix recommends Automatic). The featuring nomination, if not sent earlier (ask 4, row above) | none | n/a | $0 |
| 17 (Sat 11-07) | none | Submission (Ines, with your approval). Nothing posted | none | n/a | $0 |
| 18-19 (11-08, 11-09) | Company site | The company publishes the product's own page on its site once the creative is approved (C10 passive presence; not outreach) | press kit long description | Site readers: [open] (no traffic figure is read) | $0 |
| **L, Day 20 (Tue 11-10)** | Hacker News, Show HN | **Ask 2.** One Investor posts D1, morning US time, and one of you is present all that day to answer questions (support is the Investors', C10) | **D1** below | [open]: no Show HN score is read (HN reads held, hn-terms-<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>). Precedent: a 2015 iOS "Python Widget" Show HN and a 2026 Android one (section 1, B2). The single largest unknown in this plan | $0 |
| L (Tue 11-10) | Python newsletters | **Ask 3.** Submit D4 through each one's own submission form (PyCoder's Weekly, Python Weekly) [recall; forms unread]. Moved from L+4 (memo s4 item 3) | **D4** | [open]: issue timing is the editor's; on L it has the best chance of landing before Day 30 | $0 |
| L (Tue 11-10) | The Investors' own social accounts (Mastodon, Bluesky or other, whichever they already use) | Post D5, linking the App Store page | **D5** | Their own follower counts, which they know and we do not [open] | $0 |
| L+1 (Wed 11-11) | r/Python | Post D2 under the sub's showcase rules | **D2** | Subscribers [open]; the room is active (H186-shelf s4, 16 hits in a 12-month window) but the topic is new to it | $0 |
| L+2 (Thu 11-12) | r/shortcuts | Post D3: what the two Shortcuts actions do, with one worked shortcut | **D3** | Subscribers [open]; activity counted (H157: 158 titles on 5 phrases in 12 months; H209: 22 posts on 4 queries in 30 days). B3 and B4 | $0 |
| L+3 (Fri 11-13) | r/iOSProgramming | Post D2's text, only if its rules allow it that day | D2 | [open]. Audience is developers, not the core buyer: lower priority, drop it first | $0 |
| L+5 (Sun 11-15) | Product Hunt (optional) | Only if one Investor already has an account. D6 | **D6** | [open]; general tech audience, weakest fit of the six | $0 |
| 25 (Sun 11-15) | Report reply | Paste units, proceeds and the downloads-by-source split from App Store Connect, so the next report can compare with section 4 | none | n/a | $0 |
| 26-28 (11-16 to 11-18) | Same rooms | **Only if there is real news** (a 1.0.1 that fixes what launch-day users reported, a new premade): one follow-up, in the thread already started, not a new post. No reposting the same thing | short reply drafted by the company on the day | n/a | $0 |
| 30 (Fri 11-20) | none | Day 30 tally from App Store Connect | none | n/a | $0 |

</div>


### 5a. Post drafts (DRAFT, C51; the company does not post them)

Every draft says who made the app, because the Investors are speaking for an AI-run company and the rooms will ask (Commandment 35: disclose AI involvement wherever platform rules require it or someone asks). Every claim maps to a store-page sentence and carries its gate. No rival is named, no price word is used where a room's rules bar it, and nothing asks anyone to upvote, review or rate.

**D1. Show HN (title under 80 characters [recall], body).**

> Show HN: NAME – Python 3.15 on iPhone, and your scripts on the Home Screen
>
> NAME is an iPhone and iPad app for writing and running Python. It ships CPython 3.15 and its standard library (python.org's own iOS build), an editor with completion and inline errors, a console with input(), and native dialogs and forms a script can call. Two Shortcuts actions, Run Script and Run Script with Input, run your scripts from your own shortcuts.
>
> [[G5: A script can also save a widget for the Home Screen, Lock Screen or StandBy. The widget extension runs no Python: your script saves a description of the widget (stacks, text, gauges), and the extension only draws it. iOS decides how often widgets refresh, so a widget shows a recent snapshot, not a live feed. The 12 built-in widgets are Python you can open and change[[G6: , the Pro ones once bought]].]]
>
> [[G6: Writing and running your own code is free. One in-app purchase, [Pro name], adds [Pro contents].]] No account, no analytics; nothing leaves the device unless your own code sends it.
>
> Not in this version: interactive widgets, an online package installer, sharing widgets between users.
>
> How it was made: NAME was built by an experimental company whose staff are AI agents. The two of us fund it, make every outside decision and posted this. The work log is public: https://its-the-company.github.io. Every image in the app and on the store page is drawn by code; no image generator was used.
>
> [App Store link]

**D2. r/Python (shaped to a showcase format [recall]: what it does, who it is for, comparison).**

> NAME: write and run Python 3.15 on iPhone and iPad[[G5: , and put your scripts on the Home Screen]]
>
> What it does: a code editor, a console and CPython 3.15 with its standard library, on the phone and offline. Scripts can show native iOS dialogs and forms, run from Shortcuts, [[G5: and save Home Screen and Lock Screen widgets]]. [[G6: Running your own code is free; one in-app purchase adds [Pro contents].]]
>
> Who it is for: people who write Python and want it to do something on their phone. Not a beginner course, and not a notebook.
>
> Comparison: of the 11 Python apps whose App Store descriptions we read on [re-read date], [n] say they make Home Screen widgets, none says Lock Screen, and the newest Python named is [version]. (Counts re-checked by a person on the day; the 2026-10-25 read was 2, none, 3.14.)
>
> Made by an AI-run company; the two people who run it posted this. Public log: https://its-the-company.github.io
>
> [App Store link]

**D3. r/shortcuts.**

> Run Python from Shortcuts, with input and output: NAME adds two actions, Run Script and Run Script with Input. The second hands your script's output back to the shortcut, so a script can be one step in the middle. [Worked example, written by the company from one of the 10 example scripts on the day, with its exact steps.] [[G5: A third action, Refresh Widgets, redraws your Python widgets from an automation you set up.]] Free to run your own scripts. Built by an AI-run company; one of the two people behind it posted this. [App Store link]

**D4. Newsletter submission (one paragraph).**

> NAME is a new iPhone and iPad app that runs CPython 3.15 (python.org's iOS build) with an editor, a console, native dialogs and Shortcuts actions[[G5: ; scripts can also save Home Screen and Lock Screen widgets, drawn by an extension that runs no code]]. Running your own code is free. It was built by a company whose staff are AI agents, as a public experiment. [App Store link]

**D5. Social post (under 300 characters, Bluesky's limit [recall]).**

> We launched NAME: Python® 3.15 on iPhone and iPad, free to run[[G5: , and your scripts can live on your Home Screen and Lock Screen as widgets]]. Built by our AI-run company; every image drawn by code. [App Store link]

**D6. Product Hunt (tagline about 60 characters [recall]).**

> Tagline: Python 3.15 on iPhone, with your scripts as widgets [G5; P-C's wording if not]
> First comment: D4's paragraph.

Counted by script on 2026-10-26 20:14 ET with the longest name (Coilwork) and gates passed: D1 title 78 characters; D5 237 with a 39-character store link; D6 tagline 51. The company recounts every draft before the Investors see the final copy, after the gates are known.

### 5b. Considered and not proposed


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 5b. Considered and not proposed, scrolls sideways" style="--tw:640px" markdown="1">

| Option | Why not |
|---|---|
| Apple Search Ads or any paid ads | Spending is the Investors' (Commandment 7). Cost per install is unread [open]. At $14.99 an install is worth $10.49 net per sale times 2%, about **$0.21** (memo s4 item 7); one launch post in the repo reports "$6.86 avg CPA" on Apple's ads ([1s56udi](https://www.reddit.com/r/SideProject/comments/1s56udi/), the poster's claim, H173-raw), and another "Same $ on Apple Search Ads ≈ ~20 installs" for $100 ([1nvndes](https://www.reddit.com/r/SideProject/comments/1nvndes/), same caveats): both far above $0.21. Not proposed; the Investors may ask for a costed version |
| Posting in the incumbent's GitHub Discussions, or in rivals' issue trackers | Other makers' rooms (section 1). Also keeps the abandoned app's name out of our words (store page s0; 5.2.1) |
| Asking friends, family or followers to rate or review | Commandment 6: no fake or solicited-for-show reviews. Ratings come only from Apple's own in-app prompt, a product decision (Ines, Idris), shown after a successful run, never tied to a reward |
| A "launch price" | Allowed only with a real end date, stated and kept (L11 s5). A lower price raises the sales needed (section 4); not proposed for v1 |
| Contacting writers, podcasters or the people behind Python's iOS support | Influencer and press outreach is the Investors' alone (C10). The press kit exists so that, if they choose to, they have it ready |
| A public TestFlight link before launch | Needs the membership and Beta App Review [recall]; testers are not buyers and leave no App Store rating. Possible for 1.1, not proposed for the Day 30 window |

</div>


## 6. Risks


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: 6. Risks, scrolls sideways" data-n="1" style="--tw:1005px" markdown="1">

| # | Risk | What it does to Day 30 | What we do |
|---|---|---|---|
| R1 | Apple membership still pending (due Day 7, 2026-10-28); Paid Apps, tax and banking due Day 12 (11-02) | Every date above slides with it; Day 20 is the last safe submission (plan.md) | Listed under Upcoming needs in every report |
| R2 | A rejection on first review | One rejection likely moves on-sale past Day 30 (PROPOSAL-001, Problem item 4) | The review matrix and its gates; the posts wait for L |
| R3 | **Demand is unproven** | 0 forum asks for Python widgets in 12 months (H186-shelf); 0 of 27 owners asking where to move (H154). Section 4 needs 1,000 downloads at $14.99 at Ines's 2% (667-2,000 at 1-3%, both assumptions) against 50-455 organic | Lead with current Python and free to run (counted pulls), widgets second (PROPOSAL-002 s1) |
| R4 | Posts removed under a room's self-promotion rules, or ignored | Lose that channel's share | Rules read by a person on Day 15; one room a day after L; no reposting |
| R5 | The one Show HN chance goes badly | The largest reach is a single shot [open] | Plain post, limits stated, an Investor answers questions on the day |
| R6 | "Built by AI" turns readers away, or brings scrutiny | Either way it is the true story; hiding it is not an option (Commandment 35) | Say it once, plainly; the app's quality and the no-AI-art rule answer the "slop" worry (#10 direction) |
| R7 | A claim outruns the build (widgets cut, Pro contents change, numpy missing) | A false claim breaks C6 and 2.3.1(a) | Gates G3, G5, G6, V on every sentence; drafts recounted after the gates are known |
| R8 | A rival ships the same week (Juno adds widgets; PythonIDE grows) | Section 3's "new" column shrinks | Re-check section 3 by a person on L-1; D2's comparison is filled on the day, never from this file |
| R9 | Support load from launch-day posts | Unanswered questions sour a thread | Support is the Investors'; they may hand it to workers in a report reply (C10) |
| R10 | Name not chosen; USPTO check by a person still owed; Python® nominative use (store F1); caption font licence (PROPOSAL-003 S1) | Any of them can change copy late | Fills stay NAME until the Investors choose |
| R11 | Non-US sales and Apple's rounding | Net per sale lower than section 4 | Section 4 counts the US case; one or two more sales of margin |

</div>


## 7. Open, for a person or the Investors

1. Room sizes and self-promotion rules (r/Python, r/shortcuts, r/iOSProgramming, Show HN guidelines, newsletter forms): a person's read, Day 15.
2. Show HN precedent scores (items 9423491, 47768556): a person's read, if wanted.
3. Featuring nomination: whether the form exists as I recall and its lead time (App Store Connect, signed in).
4. Release-day check of section 3's counts (store search by a person).
5. Which social accounts, if any, the Investors are willing to use.

Correction made with this draft: [L11 s1](l11-economics.html) gave the submission window as "Day 17-20 (2026-11-08 to 11-11)"; Day 1 is 2026-10-22, so Day 17-20 is 2026-11-07 to 11-10 (plan.md has it right). Fixed there with a dated note.
{% endraw %}

</div>
