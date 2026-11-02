---
layout: "default"
title: "pywidget v1: launch plan, third draft"
section: "documents"
description: "Wrenna, market and product researcher. First draft 2026-10-26 (T-0249). Second draft 2026-10-30, T-0770, for the Investors&#x27; Day 15 review (Thu 2026-11-05). Every claim was read against the code at HEAD 16ffb92b; section\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-store-drafts/' | relative_url }}">← App Store Drafts</a><a href="{{ '/documents/pywidget/launch-plan-draft.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/release/launch-plan-draft.md</code></span></div><h1>pywidget v1: launch plan, third draft</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, market and product researcher. First draft 2026-10-26 (T-0249). Second draft 2026-10-30, T-0770, for the Investors' Day 15 review (Thu 2026-11-05). Every claim was read against the code at HEAD **16ffb92b**; section 8 lists each one.

**DRAFT under <span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>. Nothing here is approved, posted, sent or scheduled.** Under Commandment 10 the company never contacts anyone and never posts anywhere: this file proposes, and the Investors decide whether any of it happens and do it themselves, from their own accounts. Every post below is copy for their approval, not a promise that it goes out. Commandment 6 <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> throughout: no claim v1 does not make good, no fake or paid reviews, no asking people to upvote or rate, no false scarcity, no countdowns.

Companion file: [press-kit-draft.md](press-kit-draft.html). **store-page-draft.md was brought to HEAD by T-0789** (2026-10-30; its own notes list the gates still open); where it differs from this file, check both against the T-0788 sweep (2026-12-06). The posts and the store page must agree before submission.

**Decided since the first draft.** Option A with every room (#91, an Investor, 2026-10-30 08:37, card "Decided"). Pro is one-time $14.99 with 7 Pro premades and 3 themes, Family Sharing off, no trial (#87 "Decided"). numpy, Pillow and matplotlib are 1.1 and appear here only as things 1.0 lacks, with no date ([ADR-003 s4](adr-003-package-policy.html), T-0287). **Third draft, 2026-11-02, T-1151:** sections 4 and 5 are re-based on the release-date plan (freeze 2026-11-30, submit 2026-12-08, release 2026-12-15, Day 55; [plan.md](pywidget-plan.html)). There is no revenue target or need-date (amendment 2026-10-31 12:43); the Investors do all outreach and the company only plans it. Sections 1-3, 5a and 8 are from the second draft and **section 8 is still read against HEAD 16ffb92b**; its re-read at today's HEAD is a board line, and T-0788 [release-candidate sweep, 2026-12-06] repeats it. NAME stays a placeholder until #90.

**Gates.** A gated sentence is deleted, never softened, if its gate fails. Gates are the checklist's own freeze rows ([alpha-day10-checklist.md](alpha-day10-checklist.html)) where one exists. The drafts go to the Investors on Day 15 with their gates showing, because most gates close after Day 15; the company removes them in a final sweep on Day 46, 2026-12-06 (release candidate, T-0788), and nothing is posted with a gate still in it.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:1094px" markdown="1">

| Gate | What must be true | Decided | If it fails |
|---|---|---|---|
| **W** | Widgets ship: at least 8 of 12 premades pass (F1), a person's tap reaches the Home Screen (F19, T-0684), Maren's screens pass | Widget cut line, Freeze 2026-11-30 | Every [[W: ]] sentence goes; <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitch</span> P-C; Pro is the themes alone at $4.99 (#87 "Decided") |
| **N** | The count of premades that pass (F1) | Freeze 2026-11-30 | "12" and "7" become the real counts, from pro-flags.json |
| **<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">LANE</span>-ON / LANE-OFF** | The flag default for Python in the widget extension, set from device numbers ([ADR-007 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 2026-10-29 08:03](adr-007-execution-architecture.html) item 1, T-0680) | Before the release candidate, 2026-12-06 | Exactly one of the two survives. A Simulator number never opens it |
| **E** | Completion and inline errors in the editor (T-0656) | Feature freeze | The words go |
| **F3** | Projects and Files (T-0355) | Feature freeze | No submission as scoped (checklist F3) |
| **F18** | Open a script from the Home Screen (T-0449), press kit only | Feature freeze | The row goes |
| **F4** | iPad sidebar, split and keyboard shortcuts (checklist F4) | Feature freeze | The words go; the two-window sentence stays |
| **F6** | Gallery, and a way to open a premade's source (T-0191) | Feature freeze | "Open and change" goes |
| **F7** | Pro premades place only while entitled (T-0051) | Feature freeze | No Pro premades; the Investors decide what Pro holds (checklist F7) |
| **F9** | A traceback opens the failing line (T-0389) | Feature freeze | The words go |
| **F13** | The 3 themes are in the build (T-0769, T-0272) | Feature freeze | "and 3 editor themes" goes |
| **F17** | Native prompts, Swift half (T-0447) | Feature freeze | The words go |
| **S** | A person's own saved script can be picked in the Run Script actions (T-0510; see section 8, row 14) | Feature freeze | The Shortcuts sentences about "your scripts" go; Refresh Widgets stays under W |

</div>


### Gate status 2026-11-02

Read from ops/v1_scope.json (its stamp is 2026-10-29, so a state may be newer on the board). **No gate can be closed today**: each rests on a build that the scope file shows not done. Nothing was softened, and no sentence is deleted yet because no gate has failed.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Gate status 2026-11-02, scrolls sideways" data-n="3" style="--tw:777px" markdown="1">

| Gate | Scope row and state | Closed now? | What decides it |
|---|---|---|---|
| W, N | widget-by-tap, premades, gallery: in progress, in progress, not started | Open | Freeze rows F1 and F19 at 2026-11-30 |
| LANE-ON / OFF | not a scope row; ADR-007 T-0680 | Open | Device numbers before 2026-12-06 |
| E | completion-lint: in progress | Open | Freeze 2026-11-30 |
| F3 | projects: in progress | Open | Freeze 2026-11-30 |
| F18 | home-screen-scripts: in progress | Open | Freeze 2026-11-30 |
| F4 | ipad: in progress | Open | Freeze 2026-11-30 |
| F6 | gallery: not started | Open | Freeze 2026-11-30 |
| F7 | pro-placement: in progress | Open | Freeze 2026-11-30 |
| F9 | traceback-taps: not started | Open | Freeze 2026-11-30 |
| F13 | themes: not started | Open | Freeze 2026-11-30 |
| F17 | prompts: in progress | Open | Freeze 2026-11-30 |
| S | intents: done, but a person's own script is not pickable (T-0510) | Open | Freeze 2026-11-30 |

</div>


**Cut to 1.1 per the scope file:** preview pane, install from a file, share extension, and native packages (T-1085). I searched this draft for each; none appears in any claim or post draft, and numpy, Pillow and matplotlib appear only as things 1.0 lacks, with no date. **No refresh number appears anywhere.**

Fills: NAME (#90) and [App Store link]. Pro's name is **NAME Pro**, the approved Pro screen's eyebrow with #90's name in it.

Tags: [doc] a company file says it, linked; [count] a script counted it from a saved file; [recall] my memory, unverified; [open] a fact we do not have, which a person reads or the Investors supply; ASSUMPTION as in L11; [judgment] my reading, not a measurement.

> Listen to this, from the abandoned Python app's own forum, 2026-10-21: "would very much like to continue using the existing app" ([omz/Pythonista discussion #140](https://github.com/omz/Pythonista/discussions/140), quoted in [H154](../hunt/h154.html)).

Here is the shape of it. The people who would buy NAME already have a Python app on their phone, and they love it more than it deserves. They are not out searching for us. Nobody in twelve months of the forums I could read asked for "Python widgets" in those words (0 counted, H186-<span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> s4). So this launch cannot wait to be found. It has to be put, once and plainly, in front of the few rooms where Python people who use iPhones already talk, by the two people allowed to speak there. And since the freshness ruling it has only a few days to do it in.

## 1. Who buys, and where they already gather


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 1. Who buys, and where they already gather, scrolls sideways" data-n="1" style="--tw:1320px" markdown="1">

| # | Buyer | Evidence (counts, with links) | Where they gather | Ours to post in? |
|---|---|---|---|---|
| B1 | **Owners of the abandoned Python app** who want a current Python. The one paying buyer we have counted. | $9.99 up front, 1,529 US ratings, last version 2023-04-27, Python 3.10 ([L7 s1a](l7-competition.html)). Low reviews: 150 of 500 fetched; modules/pip 55, abandonment 26, crash 26 ([L7 s1a](l7-competition.html), H186 review read 2026-10-24, robots-unverified). All 11 of its 2026 low reviews are on 3.4 (PROPOSAL-001-v1-paid-tier s2). Implied lifetime downloads 51,000-153,000 ([L11 s5](l11-economics.html), tools/sizing.py) | Its GitHub Discussions: 27 posts in 2026, by people still building on the app; 0 of 27 ask where to move ([H154](../hunt/h154.html)). r/Pythonista: the archive's newest post is 2020-04-15 (H154). r/Python and Discord: not read (H154 line 48) [open] | **No.** The Discussions are another maker's room; a rival's launch post there is poor manners and likely against its norms [open: its rules unread]. They reach us through the general Python rooms in B2 |
| B2 | **Hobbyist Python programmers on iPhone and iPad** who want their code to do something on the device (PROPOSAL-002 s1, the v1 audience). B1 is a named subset. | 11 of the 18 apps in the saved Lookup describe Python ([count], L7-raw/lookup-us-2026-10-25.json, 2026-10-25): demand is real enough to hold a shelf. Price fatigue: Pyto 67 of 158 low reviews on price, Juno 14 of 50 ([L7 s2](l7-competition.html)) | r/Python (16 hits on "Scriptable but python" were desktop CLI posts, H186-shelf s4: the room is active, the topic is new to it). Hacker News: two Show HN precedents, "Show HN: Python Widget – run python code on iOS today screen" (2015-04-22, [item 9423491](https://news.ycombinator.com/item?id=9423491)) and "Show HN: Build Android homescreen widgets with Python" (2026-04-14, [item 47768556](https://news.ycombinator.com/item?id=47768556)), both from H186-shelf s4, HN figures terms-unverified. Python newsletters [recall: PyCoder's Weekly and Python Weekly take link submissions] [open]. Sizes of all of these: [open] | Yes, through the Investors' own accounts, under each room's self-promotion rules [open: read by a person before Day 15] |
| B3 | **People who already run Python from Shortcuts and see it break.** | U = 6 distinct authors (7 issues) in the a-Shell and Pythonista trackers, 2025-01 to 2026-05; A = 3 who asked for Python as a Shortcuts action or watch face (H186-demand). Example: "The same operation times out when executed through the a-Shell Shortcuts action" ([a-shell#1060](https://github.com/holzschu/a-shell/issues/1060)) | r/shortcuts: active (158 titles on 5 phrases in 12 months, floors, [H157](../hunt/h157.html); 22 posts on 4 of 12 queries in 30 days, [H209 s3](../hunt/h209.html)); none of those 22 asks to run code. The two trackers above | r/shortcuts yes (Investors, rules [open]). The trackers **no**: rivals' rooms |
| B4 | Shortcuts power users who do not write Python (secondary, PROPOSAL-002 s1) | Paid helpers exist (Pushcut Pro $1.99 a month, [H209 s2](../hunt/h209.html)) | r/shortcuts | Same post as B3; no separate effort |
| - | Non-coders who want pretty widgets: **not a v1 target** | Widgetsmith 777,214 US ratings sells templates and a visual editor; twelve premades and no Builder lose to it on the first screen (PROPOSAL-002 s1) | r/homescreen and similar [open] | Not proposed for v1 |

</div>


What is missing from this table, and I want it said: no subreddit, newsletter or HN size is read. Every "expected reach" in section 5 that depends on one is [open].

## 2. Positioning and the one-line pitch (options for the Investors, C51)

**Positioning (v1 only).** For people who already write Python and carry an iPhone, NAME is a place to write and run current Python on the phone, free to run[[W: , where a script can put what it makes on the Home Screen and Lock Screen as a widget]]. It is maintained, it asks for no account, and nothing leaves the device unless a script you run sends it.

Public copy names no rival. It leads with current Python and free to run, the two pulls we have counted, and puts widgets second (PROPOSAL-002 s1).


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 2. Positioning and the one-line pitch (options for the Investors, C51), scrolls sideways" data-n="3" style="--tw:842px" markdown="1">

| # | One-line pitch | Gates | Note |
|---|---|---|---|
| **P-A (recommended)** | "Python® 3.15 on your iPhone, free to run, and your scripts can live on your Home Screen." | W | Says the three things in the order a Python person checks them. Same claims as store promo P1 and screenshots 1-2 |
| P-B | "Write Python on your iPhone. Run it free. Put it on your Home Screen." | W | Shorter, for social posts; drops the version |
| P-C | "Current Python on iPhone and iPad: a real editor, a console and Shortcuts actions." | S | The fallback if W fails. "native dialogs" dropped from the first draft's wording unless F17 passes |

</div>


® on the first mention follows the PSF rule (names.md); a social post may need it too [open: the same nominative-use read as store-page F1].

## 3. What is new (Tenet 3), counted, and what is not

Counted from the 11 Python apps among the 18 saved App Store descriptions (L7-raw/lookup-us-2026-10-25.json, read 2026-10-25; recounted by script 2026-10-30). This is our candidate set, not the whole shelf: store search is barred to scripts (<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2a</span>), so a person checks it again on launch day.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 3. What is new (Tenet 3), counted, and what is not, scrolls sideways" style="--tw:960px" markdown="1">

| Claim | Count | Holds? |
|---|---|---|
| Python widgets on the **Lock Screen** and in **StandBy** | 0 of 11 Python descriptions say "Lock Screen"; 0 say "StandBy" | **New** [W] |
| **Python 3.15** | Newest version named: 3.14 (PythonIDE, Pythona); Juno says 3.13. (Python3IDE's "3.17" is a package version, not Python) | **New** on the day of launch; it stays new only until a rival updates |
| **Every premade widget is Python you can open and change** (free ones at once, Pro ones once bought) | 0 of 11 Python descriptions mention premade widgets or templates; the precedent is JavaScript (Scriptable's gallery, "tap Get to view the code", [L6](l6-app-review.html)) | **New for Python** [W, F6] |
| **Running your own code is never paywalled**, with widgets | Juno's one Pro item is running code; Pyto locks numpy, pandas, matplotlib; the stale incumbent is $9.99 ([L7 s3](l7-competition.html)) | **New as a combination** [W]; if W fails it is not new, because a-Shell and Carnets are free |
| Python **running inside the widget** with the app closed | Pyto does it today ("a very limited amount of RAM"), and Scriptable does it in JavaScript ([L20 s1](l20-live-widget.html)) | **Not new.** Even under LANE-ON, never claimed as first |
| A widget extension that **runs no code** (it draws a tree the script saved) | not claimed by any description | True only under LANE-OFF; a reason to trust, not to buy. Press note only |
| Python on iPhone; widgets from code; Shortcuts actions | 11 Python apps; Home Screen widgets claimed by 2 (Pyto, PythonIDE; Carnets and Python3IDE mean ipywidgets); Shortcuts named by 5 of 11 | **Not new.** Never claimed as first |

</div>


And one novelty outside the app: it was made by a company whose staff are AI agents, with every outside action taken by two people, and no image generator used anywhere (Commandment 9). That is the press angle (press kit, section 4), and it cuts both ways (risk R6).

## 4. Sizing, as an estimate and not a target

**This section is an estimate for planning the Investors' outreach. It is not a revenue target and it has no need-date.** Profit is still a goal; the cost against proceeds lives on the site's cost page, not here ([amendment 2026-10-31 12:43](pywidget-plan.html)). Apple's cut is 30%, or 15% if the Small Business Program enrollment comes through ([L11 s0](l11-economics.html)); at $14.99 that is $10.49 or $12.74 a sale. US storefront; sales outside the US net less after VAT/GST, and Apple's proceeds per price point are rounded by Apple [recall].

The window is no longer three days. Release is Tuesday 2026-12-15 (Day 55) and the Investors' goal is release by Day 60, so a launch has days to run and nothing in this plan is cut to fit a tally date. What the length of the window does not change: organic downloads with no outreach are an assumption, 5-20 a day (Ines, memo s1) or 5-35 (mine, L11 s3), and buyers per download are an assumption too, 2% (Ines, range 1-3%) or 1-4% (mine). Neither is a measurement; section 4a says what the repo holds.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 4. Sizing, as an estimate and not a target, scrolls sideways" style="--tw:1001px" markdown="1">

| Case | Buyers per 1,000 downloads at 1% / 2% / 3% | Net at $10.49 a sale (30%) | Net at $12.74 (15%) |
|---|---|---|---|
| **$14.99, decided (#87)** | 10 / 20 / 30 | $105 / $210 / $315 | $127 / $255 / $382 |
| $4.99, the themes-only fallback if W fails (Ines judges the rate lower, 0.5%) | 5 at 0.5% | $17 | $21 |

</div>


Arithmetic by script (downloads x rate x price x 0.70 or 0.85), 2026-11-02. An estimate, and the rates are the assumptions above.

Here is the shape of it. The number of downloads the Investors' posts and the store listing bring is the unknown, and no file in the repo measures it. I do not forecast it. What I can say [judgment] is that the organic floor (5-20 a day) is small beside what a single well-received post can bring, which is why the outreach plan in section 5 puts the rooms in the order of expected fit and leaves the Investors room to run it over more than one week if a thread goes quiet.

The fallback: with W failed, Pro is the themes alone at $4.99 and every widget claim goes. If F13 also fails, the Pro sentence is deleted and "Writing and running your own code is free" stands alone.

### 4a. Measured figures from comparable apps: what the repo holds

I looked for any measured conversion or download figure for a paid developer tool or a widget app in what the company has already saved: L11 and its raw files, L7, the hunt archive, research/sizing.md and the store-research files. No new fetch was made for this. **No measured conversion or download figure exists in the repo for a Python, coding or widget app.** Every "downloads a day" for a rival (L11 s2, the hunt's lane sizes) is ratings multiplied by 33-100, and that ratio is itself an assumption (tools/sizing.py: "Assumption is the caller's"). Idris's H173 calibration found one post to test it and could not confirm it ([H173 s6](../hunt/h173.html)).

What the repo does hold is a few launch posts in which developers reported their own numbers ([H173 s4-s5](../hunt/h173.html), raw posts in research/hunt/H173-raw/). Each figure is the poster's own claim, not verified. All were read through Arctic Shift on 2026-10-24, a route barred since then pending #53, so they are reused from the saved file, terms-unverified, and nothing was read again. None is a Python or widget app.


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 4a. Measured figures from comparable apps: what the repo holds, scrolls sideways" style="--tw:1236px" markdown="1">

| Post (saved) | App type and model | Figure as posted | What it says about us |
|---|---|---|---|
| [r/iOSProgramming 1v7vvb3](https://www.reddit.com/r/iOSProgramming/comments/1v7vvb3/), 2026-07-27 | **10 paid-up-front developer and media tools** (a Redis GUI, an SFTP client, a web-IDE client, video tools, a Markdown editor) | "10+ sales", "Total revenue: ~$70" over 2 months; "Zero ratings"; best app 4 sales on 263 product page views | The closest comparable we hold: developer tools with no audience and no ratings sold about one unit per app in two months. Well under the 20 buyers per 1,000 downloads that the 2% row assumes |
| [r/SideProject 1tczn4a](https://www.reddit.com/r/SideProject/comments/1tczn4a/), 2026-05-14 | habit app, free with a purchase | 60 downloads, 1 paying user, $16, about 2 months | 1 of 60 is 1.7%, inside Ines's 1-3%; one buyer is not a rate |
| [r/SideProject 1s56udi](https://www.reddit.com/r/SideProject/comments/1s56udi/), 2026-03-27 | fitness app, free with in-app purchases and a trial, paid ads run | first 20 days: 305 downloads, 59 in-app purchases, $99; "Day 7 download-to-paid 3.13%" | At the top of Ines's range, with paid ads, a trial, a mailing list and 100 TestFlight users beforehand, none of which we have |
| [r/SideProject 1to4awo](https://www.reddit.com/r/SideProject/comments/1to4awo/), 2026-05-26 | Reflect, free with optional premium | ~27 downloads in 12 days with no audience, 5 ratings | About 2 a day, below the 5-20 a day Ines plans on: organic reach with no posts can be smaller than both our ranges |

</div>


Read together, these four posts put us at Ines's planning value or below it, and they do not support my 4%. These are four posts chosen by the people who wrote them, so I treat them as a check on direction only, not as a rate.

How each sale would arrive, by source (proposal for what to watch, not a forecast): App Store search for "python" terms (keywords kw-a to kw-c, store page s4), the launch-day posts (section 5), and word of mouth from buyers who are happy. Only the first runs without anyone posting. The Investors can read the split in App Store Connect's analytics (sign-in; theirs) and paste it into a report; the company does not read it.

## 5. The calendar, on the release-date plan

**Dates ([plan.md](pywidget-plan.html), chair note 2026-10-31):** feature freeze Monday 2026-11-30 (Day 40); release candidate sweep Sunday 2026-12-06 (Day 46, T-0788 stays that sweep); submit Tuesday 2026-12-08 (Day 48), with the Investors' approval; release **Tuesday 2026-12-15 (Day 55)**; the Investors' goal is release by Day 60 (2026-12-20). The plan says the dates can move either way and every move goes in the next report. This section holds no date that is not one of those or an offset from L.

**Who does what.** The Investors do all of the outreach, from their own accounts. The company only plans it (Commandment 10): this file proposes, writes DRAFT copy for approval (Commandment 51), and posts nothing, contacts no one and schedules nothing. Every row below is an Investor action unless marked company. **Cost $0 for every row**; no paid row is proposed (section 5b).

**Launch day, L,** is the first US morning with the app on sale. The plan case is **L = Tue 2026-12-15** with a release setting the Investors choose; if Apple approves earlier, the app can be held for L (the matrix's recommended Automatic release would put it on sale at approval, so the Investors choose Manual or a date: [matrix s2c](app-review-matrix.html)). Apple's review time is not in any company file; [recall: Apple says most apps are reviewed within a day or two]. Nothing is posted before L, because the first impression happens once. Which Investor is present on L is still open (asked on #91).

### 5.0 Before launch day


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: 5.0 Before launch day, scrolls sideways" style="--tw:1115px" markdown="1">

| Date | Where | Action (the Investors', unless marked) | Status 2026-11-02 |
|---|---|---|---|
| Any day it can be done | Apple developer account, signed in | **Ask 1.** Enroll in the Small Business Program: 15% instead of 30% [recall: the lower rate applies from enrollment, not back to earlier sales] | Not yet done (ops/state.md) |
| Before submission | App Store Connect | Bank and tax. No sale can happen without them | Due; T-0771 [bank and tax setup card] follows |
| Day 15 (Thu 2026-11-05) | Report reply | Review D1-D6 and the press kit. Read the posting rules of r/Python, r/shortcuts, r/iOSProgramming, Product Hunt and HN's Show HN guidelines, and each newsletter's form, as a person (about 15 minutes). Paste anything that changes a draft into the report thread | Drafts ready |
| Day 40 (Mon 11-30) | Company | Feature freeze. Each gate in the table at the top is decided from the freeze rows | Plan.md |
| Day 46 (Sun 12-06) | Company | Release-candidate sweep, T-0788 [the release-candidate sweep]: gates closed, section 8 re-read at the candidate, every draft recounted, D2 refilled | Plan.md |
| Day 46-47 | App Store Connect | The Investors fill the product page from approved copy, price, Support URL and Privacy Policy URL ([matrix s2c](app-review-matrix.html)), and the release setting | Waits on #90, #98 |
| Day 48 (Tue 12-08) | none | Submission (Ines, with your approval). Nothing posted | Plan.md |
| After the app record exists | App Store Connect, signed in | **Ask 4.** Apple's featuring nomination, if the form exists as recalled [recall]; Apple asks for lead time, so the sooner the better; about ten minutes | Waiting on the app record |
| Between submission and L | Company site | The company publishes the product's own page once the creative is approved (C10 passive presence; not outreach) | Waits on #90, #92 |

</div>


### 5.1 The rooms, one a day, as the card has it

Option A, as approved (#91). The spacing is the card's: it keeps each post inside a room's rules and avoids looking like a campaign. Calendar B (two rooms a day) was only there to fit a <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> tally; with no tally it is dropped.


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: 5.1 The rooms, one a day, as the card has it, scrolls sideways" data-n="2 4" style="--tw:962px" markdown="1">

| Room | Offset | Action | Draft | Date if L = Tue 12-15 |
|---|---|---|---|---|
| Hacker News, Show HN | L | **Ask 2.** One Investor posts, US morning, and one of you is present all day to answer questions (support is the Investors', C10). No Show HN score is read; the largest unknown | **D1** | Tue 12-15 |
| PyCoder's Weekly, Python Weekly | L | **Ask 3.** Submit through each one's own form [recall; forms unread]. The issue date is the editor's, and [recall: both are weekly] | **D4** | Tue 12-15 |
| Your own social accounts | L | One post linking the App Store page; reach is your own follower counts [open] | **D5** | Tue 12-15 |
| r/Python | L+1 | Post under the sub's showcase rules. Active room, new topic (H186-shelf s4) | **D2** | Wed 12-16 |
| r/shortcuts | L+2 | The Shortcuts actions, with the worked example (activity counted, H157, H209) | **D3** | Thu 12-17 |
| r/iOSProgramming | L+3 | D2's text, only if its rules allow that day [recall: it limits self-promotion to a set day, possibly Saturday, unverified]. Developers, not the core buyer: dropped first | D2 | Fri 12-18, or Sat 12-19 if Saturdays |
| Product Hunt | L+5 | Optional, only if one of you already has an account. Weakest fit | **D6** | Sun 12-20 |

</div>


All 8 rooms fit between L and Day 60 (2026-12-20); Product Hunt lands on it.

### 5.2 If the dates move

A later L moves every row by the same offset; the order does not change. If release moves past Day 60 the goal moves, and the report says so. If Apple rejects (R2), the posts wait for the resubmission's L. If a room's rules bar a post that day, it takes the next free day after L+5 rather than doubling up. Nothing is posted twice, and no room is reposted.

### 5.3 After launch


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: 5.3 After launch, scrolls sideways" style="--tw:648px" markdown="1">

| When | Where | Action |
|---|---|---|
| L+2 and about a week after L | Report reply | Paste units and downloads by source from App Store Connect (sign-in; theirs), so the next report can compare with section 4a. The company does not read it |
| Any day after L | Same rooms | **Only if there is real news** (a 1.0.1 that fixes what launch-day users reported, a new premade): one follow-up in the thread already started. No reposting |

</div>


The Investors' read of rival in-app prices (questions item 9) and no paid ads stand from the memo's list.

### 5a. Post drafts (DRAFT, C51; the company does not post them)

Every draft says who made the app, because the Investors are speaking for an AI-run company and the rooms will ask (Commandment 35: disclose AI involvement wherever platform rules require it or someone asks). Every claim is in section 8 with its evidence. No rival is named, no price word is used where a room's rules bar it, and nothing asks anyone to upvote, review or rate. Under W-fail, use the fallback lines at the end of this section.

**D1. Show HN (title under 80 characters [recall], body).**

> Show HN: NAME – Python 3.15 on iPhone, and your scripts on the Home Screen
>
> NAME is an iPhone and iPad app for writing and running Python. It ships CPython 3.15 from python.org's own iOS build, with the standard library minus what iOS can't run or our build removes (ctypes, tkinter, curses, venv and a few more), and requests built in. There is a code editor with syntax colours and a key row for the characters a phone hides[[E: , with completion and inline errors]], and a console with input(). Everything runs on the device, and it works offline.
>
> Scripts can use the clipboard, files, notifications, location while the app is in use, step counts and the Keychain[[F17: , and can show native alerts, prompts and forms]]. [[S: Two Shortcuts actions, Run Script and Run Script with Input, run your scripts from your own shortcuts and hand back what they print.]]
>
> [[W: A script can also save a widget for the Home Screen, the Lock Screen or StandBy. It saves a description of the widget (stacks, text, gauges), and the widget extension draws it. [[LANE-OFF: The extension runs no Python: your script runs in the app, so a widget is as fresh as its last run, which is when you open the app or when a Shortcuts automation runs the Refresh Widgets action.]][[LANE-ON: A script can also declare that it runs inside the extension, with the app closed, each time iOS wakes the widget. It gets 2 seconds and a short list of modules (json, datetime, math, re and a few more), plus pywidget.net for a network call. Anything heavier runs in the app.]] A widget shows its script's last run, not a live feed. Clocks, countdowns and progress bars tick by themselves. The [[N: 12]] built-in widgets[[F6:  are Python you can open and change, the Pro ones once bought]][[not-F6:  come with the app]].]]
>
> Writing and running your own code is free, with no paywall on Run. One one-time purchase, NAME Pro, is $14.99 with no subscription[[W: , and adds [[N: 7]] more premade widgets[[F13:  and 3 editor themes]]]]. No account, no analytics; nothing leaves the device unless a script you run sends it.
>
> Not in this version: widgets with buttons or toggles, pip or any online package installer, numpy, Pillow, matplotlib or any other compiled package, and sharing widgets between users.
>
> How it was made: NAME was built by an experimental company whose staff are AI agents. The two of us fund it, make every outside decision and posted this. The work log is public: https://its-the-company.github.io. No image in the app or on its store page came from an image generator.
>
> [App Store link]

**D2. r/Python (shaped to a showcase format [recall]: what it does, who it is for, comparison).**

> NAME: write and run Python 3.15 on iPhone and iPad[[W: , and put your scripts on the Home Screen]]
>
> What it does: a code editor, a console and CPython 3.15 with most of its standard library, on the phone and offline. requests is built in. Compiled packages such as numpy are not in this version, and there is no pip. Scripts can use device features such as location, step counts and the Keychain[[F17: , show native iOS dialogs and forms]][[S: , run from Shortcuts]][[W: , and save Home Screen and Lock Screen widgets, which show the script's last run, not a live feed]]. Running your own code is free; one one-time purchase, $14.99, adds [[W: more premade widgets[[F13:  and editor themes]]]].
>
> Who it is for: people who write Python and want it to do something on their phone. Not a beginner course, and not a notebook.
>
> Comparison: of the 11 Python apps whose App Store descriptions we read on [re-read date], [n] say they make Home Screen widgets, none says Lock Screen, and the newest Python named is [version].
>
> Made by an AI-run company; the two people who run it posted this. Public log: https://its-the-company.github.io
>
> [App Store link]

The comparison is filled by a person on the day, never from this file. The saved read of 2026-10-25, recounted 2026-10-30, gives 2, none, 3.14.

**D3. r/shortcuts.**

> Run Python from Shortcuts, with input and output.
>
> NAME is an iPhone and iPad app that runs Python, and it adds two actions: Run Script, and Run Script with Input, which hands text to your script. Whatever the script prints comes back as the action's result, so a script can be one step in the middle of a shortcut. The app doesn't open. A run gets 20 seconds, and if the script fails, the shortcut stops with the error instead of passing it along.
>
> A worked example, using the word counter from NAME's example scripts, saved as your own script:
>
> 1. New shortcut. Add Get Clipboard.
> 2. Add NAME's Run Script with Input. Set Script to word_count, and Input to Clipboard.
> 3. Add Show Result.
>
> Run it with text on your clipboard and you get the word, sentence and character counts, the reading time and your most used words. For "The <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">park</span> was quiet. We walked the long loop twice!" that is 10 words, 2 sentences, 50 characters. The result starts with the script's own prompt line, which you can delete from your copy of the script.
>
> [[W: A third action, Refresh Widgets, reruns the scripts of the Python widgets you've placed and redraws them, so an automation you set up (at 7:00, on arrival) can keep them current. iOS can still delay the redraw.]]
>
> Free to run your own scripts. Built by an AI-run company; one of the two people behind it posted this. [App Store link]

D3 as a whole carries gate **S**: if S fails, the worked example cannot be run by a stranger and the post goes. The output above is from `word_count.py` run on the Mac, not in the app; a person runs the three steps once on a phone before posting, and confirms the action is still called Show Result [recall].

**D4. Newsletter submission (one paragraph).**

> NAME is a new iPhone and iPad app that runs CPython 3.15 (python.org's iOS build) with an editor and a console[[F17: , native dialogs]][[S: , and Shortcuts actions]][[W: ; scripts can also save Home Screen and Lock Screen widgets]]. Running your own code is free. It was built by a company whose staff are AI agents, as a public experiment. [App Store link]

**D5. Social post (under 300 characters, Bluesky's limit [recall]).**

> We launched NAME: Python® 3.15 on iPhone and iPad, free to run[[W: , and your scripts can live on your Home Screen and Lock Screen as widgets]]. Built by our AI-run company, with no image generator anywhere. [App Store link]

**D6. Product Hunt (tagline about 60 characters [recall]).**

> Tagline: Python 3.15 on iPhone, with your scripts as widgets
> First comment: D4's paragraph.

**If W fails.** D1 title: "Show HN: NAME – Python 3.15 on iPhone and iPad". D1's Pro line: "One one-time purchase, NAME Pro, is $4.99 with no subscription[[F13: , and adds 3 editor themes]]"; if F13 also fails, delete it and keep "Writing and running your own code is free." D2's clause becomes "one one-time purchase, $4.99, adds 3 editor themes" on the same terms. D6 tagline: "Python 3.15 on iPhone and iPad, free to run". The "Not in this version" line drops "widgets with buttons or toggles" and adds "widgets".

**If W passes and T-0678 ships** (LANE-ON only): the "Not in this version" line reads "widgets with buttons or toggles, apart from a Refresh button".

Lengths are in section 8, last row. The company recounts every draft in the T-0788 sweep, 2026-12-06.

### 5b. Considered and not proposed


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: 5b. Considered and not proposed, scrolls sideways" style="--tw:640px" markdown="1">

| Option | Why not |
|---|---|
| Apple Search Ads or any paid ads | Spending is the Investors' (Commandment 7). Cost per install is unread [open]. At $14.99 an install is worth $10.49 net per sale times 2%, about **$0.21** (memo s4 item 7); one launch post in the repo reports "$6.86 avg CPA" on Apple's ads ([1s56udi](https://www.reddit.com/r/SideProject/comments/1s56udi/), the poster's claim, H173-raw), and another "Same $ on Apple Search Ads ≈ ~20 installs" for $100 ([1nvndes](https://www.reddit.com/r/SideProject/comments/1nvndes/), same caveats): both far above $0.21. Not proposed; the Investors may ask for a costed version |
| Posting in the incumbent's GitHub Discussions, or in rivals' issue trackers | Other makers' rooms (section 1). Also keeps the abandoned app's name out of our words (store page s0; 5.2.1) |
| Asking friends, family or followers to rate or review | Commandment 6: no fake or solicited-for-show reviews. Ratings come only from Apple's own in-app prompt, a product decision (Ines, Idris), shown after a successful run, never tied to a reward. That prompt is T-0273, and 1.1 if it misses (checklist F15) |
| A "launch price" | Allowed only with a real end date, stated and kept (L11 s5). A lower price raises the sales needed (section 4); not proposed for v1 |
| Contacting writers, podcasters or the people behind Python's iOS support | Influencer and press outreach is the Investors' alone (C10). The press kit exists so that, if they choose to, they have it ready |
| A public TestFlight link before launch | Needs Beta App Review [recall]; testers are not buyers and leave no App Store rating. Possible for 1.1, not proposed for 1.0 |
| Posting before L to gain days | A post with no working link spends the one first impression. The app can't be bought, so it can't help |

</div>


## 6. Risks


<div class="tbl" role="region" tabindex="0" aria-label="Table 12: 6. Risks, scrolls sideways" data-n="1" style="--tw:1005px" markdown="1">

| # | Risk | What it does to the release | What we do |
|---|---|---|---|
| R1 | Bank and tax due Day 12 (11-02); signing (#100) lands late | No sale without bank and tax. If #100 lands after 2026-11-30, the release candidate waits day for day (plan.md) | Listed under Upcoming needs in every report |
| R2 | A rejection on first review | One rejection moves release past 2026-12-15; Day 60 is the Investors' goal | The review matrix and its gates; the posts wait for L |
| R3 | **Demand is unproven** | 0 forum asks for Python widgets in 12 months (H186-shelf); 0 of 27 owners asking where to move (H154). Section 4 needs 1,000 downloads in three days at Ines's 2%, against 15-60 organic | Lead with current Python and free to run (counted pulls), widgets second (PROPOSAL-002 s1) |
| R4 | Posts removed under a room's self-promotion rules, or ignored | Lose that channel's share, and the calendar has no spare day to retry | Rules read by a person on Day 15; no reposting |
| R5 | The one Show HN chance goes badly | The largest reach is a single shot [open] | Plain post, limits stated, an Investor answers questions on the day |
| R6 | "Built by AI" turns readers away, or brings scrutiny | Either way it is the true story; hiding it is not an option (Commandment 35) | Say it once, plainly; the app's quality and the no-AI-art rule answer the "slop" worry (#10 direction) |
| R7 | A claim outruns the build | A false claim breaks C6 and 2.3.1(a). Section 8 has 8 rows with wording cut and 11 rows gated because HEAD does not do it yet, so this is live, not theoretical | Gates on every sentence; section 8 re-read on Day 24 |
| R8 | A rival ships the same week (Juno adds widgets; PythonIDE grows) | Section 3's "new" column shrinks | Re-check section 3 by a person on L-1; D2's comparison is filled on the day, never from this file |
| R9 | Support load from launch-day posts | Unanswered questions sour a thread; one room a day keeps it manageable | Support is the Investors'; they may hand it to workers in a report reply (C10) |
| R10 | Name not chosen (#90); USPTO check by a person still owed; Python® nominative use (store F1); caption font licence (PROPOSAL-003 S1) | Any of them can change copy late | Fills stay NAME until the Investors choose |
| R11 | Non-US sales and Apple's rounding | Net per sale lower than section 4 | Section 4 counts the US case; one or two more sales of margin |
| R12 | Apple approves late or the date moves | Every row moves by the same offset (5.2) | The cut order is written now, so nobody decides it under pressure |
| R13 | A reader finds a limit we did not state (no pip, no numpy, no ctypes, no background refresh) | Show HN readers test claims within minutes | D1 states those limits up front; better a smaller claim that holds |

</div>


## 7. Open, for a person or the Investors

1. **Release setting** (Manual or a date, so L is 2026-12-15), at submission.
2. Which Investor is present on L (asked on #91).
3. Room sizes and self-promotion rules (r/Python, r/shortcuts, r/iOSProgramming, Product Hunt, Show HN guidelines, newsletter forms): a person's read, Day 15.
4. Show HN precedent scores (items 9423491, 47768556): a person's read, if wanted.
5. Featuring nomination: whether the form exists as I recall and its lead time (App Store Connect, signed in).
6. Release-day check of section 3's counts (store search by a person).
7. Which social accounts, if any, the Investors are willing to use.
8. Ines's view of the section 4 estimate, if she wants to restate it; no target hangs on it.

## 8. Claim check against HEAD 16ffb92b (2026-10-30, read by Wrenna)

Each row is a checkable claim in D1-D6 or the press kit. **Confirmed** means I read the code or a test record at this commit. "Simulator" means no real iPhone has run it yet. **Gated** means the code is not there; the sentence carries a gate. **Cut** means the first draft said it and it came out. An unsure row was not marked Confirmed.


<div class="tbl" role="region" tabindex="0" aria-label="Table 13: 8. Claim check against HEAD 16ffb92b (2026-10-30, read by Wrenna), scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | Claim | Evidence at HEAD | Status |
|---|---|---|---|
| 1 | CPython 3.15, from python.org's iOS build | `ios/Vendor/python/.../patchlevel.h` says 3.15.1; `ios/scripts/fetch_python.sh`, `verify_python_sigstore.sh` | Confirmed, Simulator |
| 2 | Standard library minus ctypes, tkinter, curses, venv and a few more | `runtime/stdlib-manifest.json` `stripped`, 30 names | Confirmed as the rule; enforced by F11, which blocks submission if it fails. First draft's plain "and its standard library" was too wide, and "the language on your phone is the one on your desktop" **Cut** |
| 3 | requests built in | `packages/manifest.toml`; alpha row A9, 3 of 3 | Confirmed, Simulator |
| 4 | No numpy, Pillow, matplotlib; no date given | ADR-003 s4, S1 trigger 2026-10-29 | Confirmed. Stated as absent, never promised. Every G3 sentence **Cut** |
| 5 | Editor: syntax colours, line numbers, key row | `App/Editor/RunestoneEngine.swift`, `EditorKeyRow.swift`; T-0565; rows A2a-c | Confirmed, Simulator |
| 6 | Find | `isFindInteractionEnabled = true` (RunestoneEngine:69); no test names it | Code only. Left out of the posts; press kit carries it under T-0635. "Find and replace" **Cut**: replace is unread |
| 7 | Completion, inline errors | Only stored-diagnostic stubs in `CodeEditorEngine.swift`; T-0656 not before the alpha commit | **Gated E** |
| 8 | A traceback opens the failing line | Slice a only; T-0389 open | **Gated F9** |
| 9 | Console: input(), Stop, Restart, Copy All, timing line | Row A1, 63 of 63; `App/PyWidgetApp.swift` menu | Confirmed, Simulator |
| 10 | Console: run history, table output, script arguments | No Swift renderer for the `table` record; no history code; no board line; arguments exist only as the Run Script parameter | **Cut** from the press kit. Screenshot 4's "a table" needs a look (press kit s3) |
| 11 | Native alerts, prompts, forms, lists, HUD | Python half `App/Runtime/pywidget/prompts.py`; no prompt handler in `DeviceRouter.swift`; T-0447 open | **Gated F17** |
| 12 | Clipboard, files, notifications, location while in use, steps, Keychain | `App/Device/*Call.swift`, `App/Runtime/pywidget/`; F2 | Confirmed in code. Pedometer has only its unavailable path on the Simulator, so step counts wait on a device (T-0011). "Each only after you allow it" **Cut**: clipboard, files and Keychain have no such prompt |
| 13 | Run Script, Run Script with Input; output returned; no app opening; 20 s; failure stops the shortcut | `App/Intents/RunScriptIntents.swift` (titles, `openAppWhenRun = false`, `result()`); `BridgeLimits.swift:12`; row A10, 8 of 8 | Confirmed, Simulator |
| 14 | ...on **your own** scripts | The action's picker lists `widgets/<id>` only. The editor's save to that folder does not exist yet (T-0684), and the T-0355 branch does not change the picker, so a plain saved script, or one of the 10 examples, cannot be picked | **Gated S.** New board line for Idris. D3 depends on it |
| 15 | Refresh Widgets reruns placed widgets' scripts | `Shared/RefreshWidgetsIntent.swift` with T-0512's `WidgetRefresh`; row A10. From an automation on a phone it is unmeasured (ADR-007 chair line 2026-10-30 13:35) | Confirmed, Simulator. The automation half is **gated A** on the store page (T-0789); D3's "can keep them current" takes the same gate in the Day 24 sweep |
| 16 | Home Screen small, medium, large; Lock Screen circular, rectangular, inline | `Shared/TreeNodes.swift` `TreeFamilies.supported`; App Guide s8.4 renders | Confirmed as renders, under W. "Nobody has yet seen them on a real iPhone" (App Guide 8.3) |
| 17 | StandBy | Follows from `.systemSmall`; no test names it | Under W; the device session must look at it |
| 18 | A person places a widget and sees their script | T-0512 runs placed widgets on foreground; user-script save is T-0684, due at F19 | **Gated W** |
| 19 | The extension runs no Python, draws a saved tree | `Widget/PyWidget.swift`; T-0675 not landed | True today: **Gated LANE-OFF**, because it stops being true if the lane ships. First draft stated it flat |
| 20 | Script reruns in the extension, 2 s, short module list | ADR-007 chair line items 1-2; `_pywidget_runtime/lane.py`; Swift half T-0675 held | **Gated LANE-ON** |
| 21 | No number; never "live" (was: every 15 to 60 minutes at best, dropped by the chair line 2026-10-30 17:14) | ADR-007 chair line 2026-10-30 17:14 (T-0813); Apple's page (research/inbound/apple/, 2026-10-26) | Apple calls 15 to 60 minutes typical, not a bound, and at HEAD a reload runs no script. Reply if a reader asks how often: Apple's page says a well-viewed widget typically gets 40 to 70 reloads a day; we have not measured ours |
| 22 | Clocks, countdowns, progress bars tick by themselves | `Shared/TreeView.swift:477` `Text(timerInterval:)`, `.timer` | Confirmed, Simulator |
| 23 | Runs in **background refresh** | No `BGTaskScheduler`, `.backgroundTask` or `UIBackgroundModes` anywhere in App, Shared or Info.plist; no board line. App Guide 4.1 calls it "shipped" | **Cut.** Not in any draft. New board line, for Ines to rule |
| 24 | 12 premades, 5 free, 7 Pro | 12 files in `widgets/premade/`; `runtime/pro-flags.json` | Confirmed as files and tiers. Passing count is **Gated N** |
| 25 | Premade source you can open and change | No path at HEAD; T-0191 open | **Gated F6** |
| 26 | $14.99 one-time, no subscription, no trial, Family Sharing off | PROPOSAL-001 card "Decided". Build still has the test price; `family_sharing: false` in pro-flags.json. T-0769, T-0771 pending | Confirmed as decided |
| 27 | 3 themes in Pro | #93, #87; `entitlements.themes.on` is false at HEAD | **Gated F13** |
| 28 | No account, no analytics, no tracking | [privacy-label.md](privacy-label.html); `NSPrivacyTracking` false in `ios/Privacy/App/PrivacyInfo.xcprivacy` | Confirmed |
| 29 | Nothing leaves the device unless a script you run sends it | The GitHub premade calls api.github.com (`widgets/premade/github.py`), which is shipped code, so the first draft's "your own code" was wrong | Confirmed in the new wording |
| 30 | No image generator used | Commandment 9; no image files in App, Shared or Widget at HEAD | Confirmed. "Every image is drawn by code" **Cut**: the app shows Apple's SF Symbols, and store screenshots are captures of the app (PROPOSAL-003 card) |
| 31 | iOS 18.0 or later | `ios/project.yml` | Confirmed |
| 32 | iPad: one file per window | T-0478, `App/PyWidgetApp.swift` | Confirmed, Simulator |
| 33 | iPad: sidebar, split editor, keyboard shortcuts | No `NavigationSplitView` at HEAD; only indent and outdent commands in the shipping editor | **Gated F4** |
| 34 | Works offline | Python is embedded (App Guide 3.6); scripts that fetch and Pro need a connection | Confirmed; D1 says it of the app, not of those |
| 35 | 10 example scripts; word_count's output in D3 | 10 files in `pywidget/examples`; row A6ii, 11 of 11; output run by me on the Mac with `python3 -I`. A person reaches them only on iPad ("Open in New Window", `App/PyWidgetApp.swift:671`); on iPhone the one path is `PW_EXAMPLE`, UI tests only (`App/SceneFile.swift:16`), and the T-0355 branch adds no list (read at 6f3cade5, T-0789) | Files and output confirmed, not yet in Shortcuts. **Gated X** on the store page; D3's worked example needs the same path, and the Day 24 sweep carries it |
| 36 | Public log at its-the-company.github.io | `site.json` | Confirmed. "Code anyone can read" **Cut**: the company repository is private |
| 37 | Comparison 2, none, 3.14 | Recount of L7-raw/lookup-us-2026-10-25.json, 2026-10-30; PythonIDE says "widgets", Pyto says Home Screen | Confirmed for the saved file only; refilled on the day |
| 38 | Interactive widgets not in 1.0 | ADR-001 3.2; T-0430 refused a Button; Refresh button only under the lane (T-0678) | Confirmed |
| 39 | Lengths, with the longest name (Coilwork) and gates passed | D1 title 78 characters; D5 244 with a 39-character link; D6 tagline 51. If W fails: title 50, tagline 43 | Counted by script; recounted Day 24 |

</div>
{% endraw %}

</div>
