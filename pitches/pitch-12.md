---
layout: "default"
title: "Pitch 12: Runpy, a Python runner for scripts written for an abandoned $9.99 app (H134 C1, ruled B)"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span></a></div>
<div class="page-head"><div class="kicker">Pitch 12</div><h1>Pitch 12: Runpy, a Python runner for scripts written for an abandoned $9.99 app (H134 C1, ruled B)</h1><p class="lead"><code>pitches/PITCH-12.md</code>, as written, scrubbed for the public site.</p><p class="pc-src">Mockup screens are drawn; they go public after creative approval.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}




> **<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Ruling</span> changed, <span class="nw">2026-10-24</span> 14:36 ET (Ines).** The letter is now **B-**, not B. The check I wrote before counting (H150 K7-1, research/hunt/H150.md) said: if 4 or fewer posts in 2026 ask where to move their scripts or say the app is broken, the <span title="One product idea inside a lane. C1 is the lane&#x27;s first idea.">concept</span> is <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> B-. The count (research/hunt/H154.md) found 0 of 27 posts in 2026 on the incumbent's GitHub Discussions (its old forum redirects there) and 0 r/Pythonista posts in 2026; a second coder, <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span>, agreed on 17 of 20 rows and also found 0. The stranded buyer this pitch rests on is not counted asking. New ruling row: research/hunt/rulings-v2.md, 'H150 K7-1 ruling'. Nothing below this notice is rewritten; the title and card keep the letter as posted.

> **Ruling changed again, <span class="nw">2026-10-24</span> 15:22 ET (Ines).** The letter is now **C+**, not B-. Two more checks written before the counts (H150 K3-1 and K3-2) are met: a static read of 113 public scripts written for the incumbent, from 58 repositories (H152 corpus, H153 count), finds 3 (2.7%) that use only the version-1 modules and 9 (8.0%) within version 1 and 1.1, against <span title="A test written in advance. If it fires, we drop the idea.">kill</span> lines of 25% and 50%. <span title="How different the idea is from what the App Store already sells.">Novelty</span> falls to C+ and <span title="How much room the idea has to grow. It moves the grade up or down a step or two.">Depth</span> to B; the <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> and the chair's step give C+. Claims below that this makes unsupported: the mockup's "17 of 30" on screen 1 and the store-page hook (a folder of rows marked "Runs unchanged"); the measured static ceiling is 3 of 113, and the share that actually runs can only be lower. The company's recommendation (Runpy, narrowly, over Ask Your History) no longer <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>, because this concept is now below B. The legal reads (weakness 9) are partly done in H151: the incumbent's docs carry only the PSF notice, the PSF policy says nothing on "Py" in product names, the EU case text could not be read, and the questions only counsel can answer are listed there. New ruling row: rulings-v2.md, 'H150 applied (H151-H153) ruling'; full application: H150.md, 'Applied (H151-H153)'. Nothing below this notice is rewritten.

> **Card corrected, <span class="nw">2026-10-24</span> 18:56 ET (Ines).** The card's Novelty and Complexity now read C+ and B, the cells of the 15:22 ruling (H150 K3-1 and K3-2; research/hunt/rulings-v2.md, 'H150 applied (H151-H153) ruling'). Until now the card still showed the posted B- and A, so /pitches/ disagreed with the ruling. Nothing else is rewritten.



Prepared Day 3 (<span class="nw">2026-10-24</span>) by Ines, from Maren's <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> H134 (`research/hunt/H134.md`, <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> G11: paid apps that stopped working for the people who paid), two blind grades (Idris, `research/hunt/H134-grades-idris.md`; Wrenna, `research/hunt/H134-grades-wrenna.md`; both 0c16b9c), my own letters written before reading theirs (`research/hunt/H134-grades-ines.md`) and my chair ruling (`research/hunt/rulings-v2.md`, H134 row, 6c09948). I chaired because Maren authored the lane (Commandment 13). This is the second concept ruled B under <span title="Our written method for finding and grading ideas, revised for issue #41.">method v2</span>, after Ask Your History (#43). Mockups: `pitches/PITCH-12-mockups/` (mine, drawn by code). Issue: #44), posted 14:18 ET.

No decision is asked. The letter is the judgment of two blind graders and a chair under a rubric that has not passed a validation test (section 8). Every number is cited; the sales figures are arithmetic, not a forecast.

## 1. In plain English

**What it is.** For ten years the way to write and run Python on an iPhone was one $9.99 app. It gave Python its own small set of iOS modules: `console` (print to a console, show a HUD), `dialogs` (native forms, lists, date pickers), `clipboard`, `ui` (build a native screen from Python: labels, buttons, tables), later `scene` and an Objective-C bridge, and a way to run a script from Shortcuts. Tens of thousands of people bought it and wrote scripts against those modules: a tip splitter with a native form, a clipboard cleaner, a CSV summariser run from a Shortcut. Its maker last updated it on <span class="nw">2023-04-27</span> (version 3.4, Python 3.10). Since then iOS 26 has arrived, and every one of its eleven 2026 low reviews is a buyer saying it crashes, its libraries are old, or it was abandoned.

Runpy is an iPhone and iPad app that runs those scripts **unchanged, on a current Python (3.13)**. It is a Python interpreter embedded in the app (CPython's own iOS support, PEP 730), an editor, a console, and a compatibility layer that provides the same module names with the same behaviour: `console`, `dialogs`, `clipboard` and a subset of `ui` in version 1, with `scene`, `objc_util`, `photos`, `sound`, `motion`, `location`, `keychain` and `matplotlib` planned after launch. A script that needs a module outside the slice stops with that module named, never silently. One Shortcuts action, "Run Script", runs the user's own file with Shortcut input. There is no `pip`: libraries ship inside the app, because App Review does not allow a runner to download code. No account, no server, no analytics; scripts stay in the app's folder in Files.

**One session.** A buyer opens Runpy, points it at the Scripts folder already on the phone, and the list shows each script marked "Runs unchanged" or "needs scene · planned 1.1". They tap `tip_split.py`: the same native form their old script always asked for appears, they fill it in, the console prints the answer, the HUD flashes "$25.49 each". They add `csv_sum.py` to a Shortcut, as before. For the rest of their scripts, the plan screen says which module is coming and when.

**Who it is for.** First, the owners of those scripts: the incumbent has about 51,000-153,000 lifetime US downloads implied by its 1,528 US ratings at 33-100 downloads per rating (`tools/sizing.py`, <span class="nw">2026-10-24</span>), still added at 13.5-40 a day, and all 11 of its 2026 low reviews are on version 3.4 (section 2). Second, hobbyist programmers, students and automation-minded people who want to write small Python scripts on the phone that use native dialogs and run from Shortcuts, a job that Juno and Carnets (Jupyter notebooks) and a-Shell (a terminal) do differently. This is an adult, technical buyer who already pays $9.99 up front for exactly this job; how many of the owners are stranded rather than still running 3.4 is not measured (section 8). The demographic split is my judgment from the reviews and the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>, not a count. Computer science is on the Investors' subject list (amendment <span class="nw">2026-10-22</span> 18:51).

The incumbent is named in this document because the evidence is about it. It is **not** named in the product name, subtitle or keywords, and the mockups do not show its name (section 5).

## 2. Evidence of need, with links

All rows read <span class="nw">2026-10-24</span>; raw files in `research/hunt/H134-raw/`.

- **People still pay $9.99 today for an app whose maker stopped shipping in 2023.** Pythonista 3 ([App Store](https://apps.apple.com/us/app/id1085978097)): $9.99, 1,528 US ratings, 4.4, last update <span class="nw">2023-04-27</span> (version 3.4), and still #20 on the US Top Paid chart in Productivity on <span class="nw">2026-10-24</span> (`H134-raw/stale_chart.tsv`). The one aggregator page listing a <span class="nw">2026-08-20</span> update is contradicted by Apple's Lookup in the US, GB, CA, DE and JP stores (version 3.4 in all five) and by the US product page's version history (3.4 only), checked at 14:03 through `tools/store_http.py` before the ruling.
- **The buyers say it is broken, and that is all they say.** 11 of 11 2026 low (1-3 star) reviews in the US, GB, CA and AU stores are on version 3.4 (`H134-raw/r_1085978097.tsv`, hand-coded by Maren): crash or won't run 4 ("In iOS 26 every other time I open the app it will crash", <span class="nw">2026-03-24</span>; "WHY ARE YOU SELLING THIS WHEN ITS BROKEN", <span class="nw">2026-10-21</span>), old Python, pip or libraries 4 ("What happened to pip?", <span class="nw">2026-07-05</span>; "uses an older outdated version of Matplotlib", <span class="nw">2026-01-26</span>; no Ed25519 in paramiko, <span class="nw">2026-03-22</span>), "not updated" 3.
- **Of 30 stale paid apps on the Top Paid charts, this is the only one with no maintained replacement doing its job.** Maren's lane read 30 apps with 1,000+ ratings and no update since <span class="nw">2024-10-01</span>, counted their 2026 low reviews, and read the shelf under each one's buyer phrase. 27 were killed (a free app over 4.5 does the job now, or no one complains); Pythonista was the one kept. Lesson in the lane: breakage clusters where the app depends on something outside the phone that moved, here the language runtime.
- **The shelf runs Python; none of it runs these scripts.** Under "python ide" the top 24 holds four apps over 1,000 ratings (Python Editor App 6,446; Python Coding Editor & IDE App 3,038; Juno 1,140, updated <span class="nw">2026-10-20</span>; Pyto 1,001, 3.7 stars, last updated <span class="nw">2024-06-09</span>); 7 of 24 released in the past 12 months, under the clone-wave bar (Idris, full list read). Juno's own description lists native alerts, pickers, clipboard and an Objective-C bridge under its own module names; Pyto, the one app that aimed at the same buyer, lists Shortcuts and a UI builder and is stale. **0 of the 24 descriptions claim to run the incumbent's scripts.**
- **Where the stranded buyer lands.** `tools/store_hints.py "pythonista"` (14:11-14:12, `H134-raw/hints/`): the store's search box offers two hints, "pythonista 3" and "pythonista"; both shelves open with Pythonista 3 itself and then the generic Python apps (Python Coding Editor & IDE App, Pyto, Juno, Python Editor App, Python 3, Mimo). So a buyer who types the word sees the broken app first and a shelf of ten we would have to rank on with generic words (section 8, weakness 2).
- **The public API we would reimplement is documented.** The module reference is public ([ui module docs](https://omz-software.com/pythonista/docs/ios/ui.html), a Sphinx site built on the Python 3.6.1 documentation; the page carries the Python Software Foundation's documentation footer and no separate licence line for the module reference, which is one of the unread items in section 6). CPython's iOS platform support is [PEP 730](https://peps.python.org/pep-0730/) (cited by both graders; not re-read today).

## 3. What is new

Stated difference, eight words: **your old scripts run unchanged on current Python.** 0 of the top 24 claim it. It is visible in use to anyone who owns such scripts: open the folder, they run, and the list says which ones do.

It is narrower than it sounds, and the ruling says so: native dialogs, clipboard, an Objective-C bridge and Shortcuts already exist in Juno and Pyto under other module names. What is new is the module names and behaviour on a current Python, which only a person holding those scripts can see. That is why Novelty is B-, not B, and why the ruling calls this "helpful first, new possibility second". The second half, Python that drives native UI on iOS 26 for people who never owned the incumbent, is a real possibility but not a counted need.

## 4. The money, both grades

Price: **$9.99, paid up front**, the incumbent's price. No subscription, no in-app purchase, no ads. Paid up front means sales equal downloads; there is no conversion divisor.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 4. The money, both grades, scrolls sideways" data-n="4" style="--tw:623px" markdown="1">

| Commission | Net per sale | Sales for $200 | Per selling day (8 days, Day 22-30) |
|---|---|---|---|
| 30% (plan, until the Small Business Program is active) | $6.99 | **29** ($202.80) | 3.6 |
| 15% (Small Business Program, enrollment waits on the Apple gate) | $8.49 | 24 ($203.80) | 3.0 |

</div>


Lane per-day from `tools/sizing.py --asof 2026-10-24` (ratings x 33-100 over days live; lifetime averages):

- The paid <span title="A paid app on the shelf that sells nearly the same thing. Its price and ratings are our yardstick.">comparator</span>, the incumbent alone: 13.5-40.4 a day (Wrenna's lane: the only paid on-job app, and the stranded buyer is its buyer).
- The on-job lane with the free interpreters: Juno 14.7-44.1, Pyto 11.3-33.9, Pythonista 13.5-40.4, Python3ide 8.3-25.0, Fresh Edition 4.9-14.7 = **52.7-158.1 a day** (Idris). My own run today of four of them (Juno, Pyto, Pythonista, Fresh Edition) gives 44.4-133.1.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4. The money, both grades, scrolls sideways" style="--tw:1028px" markdown="1">

| Window | Lane | Lane downloads | 29 sales as a share | 24 sales | Letter on the scale |
|---|---|---|---|---|---|
| <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> (launch Day 22, <span class="nw">2026-11-12</span>; 8 days to <span class="nw">2026-11-20</span>) | incumbent alone | 108-323 | 9.0%-26.9% | 7.4%-22.2% | C to D |
| Day 30 | on-job with free apps | 422-1,265 | 2.3%-6.9% | 1.9%-5.7% | B- to C |
| Day 90 (68 days to <span class="nw">2027-01-19</span>) | incumbent alone | 918-2,747 | 1.1%-3.2% | 0.9%-2.6% | B- |
| Day 90 | on-job with free apps | 3,584-10,751 | 0.27%-0.81% | 0.22%-0.67% | B |

</div>


Scale: under 1% B, 1-3% B-, 3-12% C, 12-25% C-, 25%+ D. **The chair ruled <span class="nw">Day 30 C</span> and Day 90 B-**, taking the paid comparator as the honest lane: its per-day is a lifetime average for an app last updated in 2023, and we start at 0 ratings without the buyer's own word as a keyword. Not D: 3 to 4 sales a day against 13.5-40 is a path, not a certainty. Idris read <span class="nw">Day 30 B-</span> on the wider lane; Wrenna read C- on the narrow one.

**The honest check line.** A new $9.99 app with no ratings, sitting on a shelf of free interpreters, taking a fifth of the incumbent's lifetime daily sales in its first eight days is the hard end. Nothing in the lane says the stranded owners go to the App Store at all rather than to a forum; that count is the pre-written <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> (section 8, weakness 3).

What would make it fail by Day 30: App Review. A code-running app can draw a longer first review, and Day 22 leaves eight selling days; one rejection likely moves launch past Day 30 (ruling, <span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span> cell). The build plan submits on Day 17 for that reason.

## 5. Names, checked <span class="nw">2026-10-24</span> (`tools/appsearch.py`, whois, DNS)

The incumbent's name is never in our app name, subtitle or keywords (App Review 2.3.7: "don't try to pack any of your metadata with trademarked terms, popular app names"; 5.2.1: no third-party trademarks without permission; both quoted from Apple's page fetched today, `H134-raw/terms/apple-guidelines.html`). Whether one nominative line in the description ("runs scripts written for ...") is worth its risk is a read for the Investors; the store copy is drafted without it first.

"Python" is a PSF trademark. Its [usage policy](https://www.python.org/psf/trademarks/), read today (`H134-raw/terms/psf-trademarks.html`): stating that software "is compatible with the Python programming language, or that it contains the Python programming language, is always allowed", commercial or not; but "Python" in the name of a commercial product needs the PSF's permission ("For commercial products, contact the PSF for permission"), and contact is the Investors' (Commandment 10). So no candidate below contains "Python". The policy text I read does not address "Py" as a fragment; a name with "py" in it is still the Investors' read, and the third candidate carries neither.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 5. Names, checked &lt;span class=&quot;nw&quot;&gt;2026-10-24&lt;/span&gt; (tools/appsearch.py…, scrolls sideways" style="--tw:1381px" markdown="1">

| Name | App Store (US) | .com | .app | Trademark |
|---|---|---|---|---|
| **Runpy** (preferred; also the name of a module in Python's standard library, which developers will recognise and which could be read as confusing) | no app of that name; results are running-club apps | registered <span class="nw">2023-01-15</span> (Sav.com), DNS answers | DNS answers (registered) | not checked |
| Pyport | no app of that name; results are the Python IDE shelf | registered <span class="nw">2026-07-22</span> (Hongkong Kouming), DNS answers | no DNS record (.app whois does not answer from here; unchecked) | not checked |
| Scriptfold | no app of that name; results are screenwriting apps (Scriptation, Final Draft) | registered <span class="nw">2025-05-26</span> (Amazon Registrar), DNS answers | no DNS record (unchecked) | not checked |
| runpyapp.com, pyportapp.com | | whois "No match": available | | |

</div>


A USPTO search needs a browser session the company does not have; the Investors can run it in a minute if a name goes forward. "Runpy" is the working title in this document and on the mockups.

## 6. Fit with Commandments 6-10 and App Review

- **App Review 2.5.2 (executable code).** Apple's text, fetched today: apps "may not download, install, or execute code which introduces or changes features or functionality of the app"; educational apps that let users test code "may, in limited circumstances, download code provided that such code is not used for other purposes" and "must make the source code provided by the app completely viewable and editable by the user." Running the user's own scripts is the shape Pythonista, Pyto, Juno, a-Shell and Carnets pass with today (store precedent); the code is the user's document, fully viewable and editable in our editor. Version 1 ships **no pip, no script downloads, no gallery**: the standard library and a fixed set of libraries are inside the binary. That line is not crossed before Day 30 because one rejection costs a week.
- **App Review 4.7.2.** "Your app may not extend or expose native platform APIs or technologies to the software without prior permission from Apple." The `ui` layer exposes native views to Python. The plan is that it runs only the user's own code (no third-party scripts offered in the app), which keeps it outside 4.7's "software offered in the app"; the App Review notes say so plainly. This is the ruling's flag, and it stays a risk until a reviewer reads it.
- **App Review 2.3.7 and 5.2.1.** No incumbent name in metadata (section 5). No copied icon, screenshot or text.
- **Commandment 6, reimplementing another app's module API.** The position: an independent implementation written from the public reference documentation (module and function names, signatures, documented behaviour); no code, binary, or documentation text from the incumbent is copied; the incumbent's app is not purchased, installed or inspected (a purchase is spending, and decompiling is out). **Unread, and read before any build:** (a) the licence terms of the incumbent's documentation site (the module pages carry the PSF's Python-documentation footer and no separate licence line that I found); (b) the legal position on reimplementing a documented API in a paid product, which the company does not opine on; the Investors may want their own read; (c) the licence of every public script used in the test corpus, per repository; (d) the PSF's trademark policy as it bears on the chosen name. CPython itself is under the PSF licence (permissive).
- **Privacy and payments (6).** No account, no server, no analytics; scripts live in the app's container and the user's chosen folder in Files. Privacy label: Data Not Collected. A user's script can make network requests (the bundled `requests`); whether that changes the label is a read before submission. Payment is the App Store's up-front price; nothing else.
- **Subjects (7).** Computer science, on the Investors' list. The app runs the user's code, like any IDE on the store; it offers nothing medical, financial, legal, gambling, adult, weapons, under-13 or political.
- **One useful job (8).** It runs the user's Python scripts, with the modules they were written for.
- **No AI art or audio (9).** Icon, screenshots and the mockups are drawn by code (`pitches/PITCH-12-mockups/draw.py`). No sound in version 1.
- **No outreach (10).** We post nothing and contact nobody: not the PSF, not the incumbent's maker, not its forum. Marketing is the Investors' (section 9).
- **Built on one M1 Mac mini.** CPython for iOS builds from source on an Apple-silicon Mac with Xcode; native wheels (numpy, later matplotlib) are the hard part (section 8, weakness 10).

## 7. Build plan (Day N = <span class="nw">2026-10-21</span> + N; Idris builds, Maren designs, I spec)

Nothing is built until the Investors choose. The plan assumes a choice now and the Apple status in section 11.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 7. Build plan (Day N = &lt;span class=&quot;nw&quot;&gt;2026-10-21&lt;/span&gt; + N; Idris builds…, scrolls sideways" style="--tw:592px" markdown="1">

| Day | Date | Milestone |
|---|---|---|
| 3 | 10-24 | Pitch posted. |
| 4-5 | 10-25 to 10-26 | Xcode project. CPython 3.13 built for the iOS Simulator and device per PEP 730 (half a day budgeted; if a prebuilt framework fits, use it); "print('hello')" from Swift on the Simulator by the end of Day 4. The test corpus: 30 public scripts written against the incumbent's modules, licence read per repository, into XCTest fixtures. The harness scores each as runs unchanged / stops with a named module / wrong output. Legal reads in section 6 done and recorded. |
| 6-7 | 10-27 to 10-28 | `console`, `dialogs`, `clipboard` shims; editor (monospace, line numbers); console view; Files access to a script folder. Apple membership due Day 7. |
| 8-10 | 10-29 to 10-31 | `ui` subset (View, Label, Button, TextField, TableView, ListDataSource, present, delay, in_background) over UIKit. Harness share measured on the Simulator; that number is the most the store page may claim. numpy bundled if an iOS wheel builds in a day; otherwise 1.1, said on the store page. |
| 11-12 | 11-01 to 11-02 | "Run Script" App Intent for Shortcuts. iPad layout. Paid Apps Agreement, tax and banking due Day 12; price tier set in App Store Connect when it is. |
| 13-14 | 11-03 to 11-04 | Code-drawn icon and screenshots, store copy without the incumbent's name, privacy label read (network from scripts), App Review notes on 2.5.2 and 4.7.2; creative approvals requested in the report. |
| 15-16 | 11-05 to 11-06 | TestFlight device pass on iPhone and iPad (needs the membership); corpus re-run on device. Bug fixing only. |
| 17 | 11-07 | Submission candidate archived and submitted, a day earlier than Pitch 11 because a code runner can draw a longer review. |
| 18-21 | 11-08 to 11-11 | Review; any rejection answered within hours. |
| 22-30 | 11-12 to 11-20 | Selling days. If review runs long, launch slips a day per day. |
| 1.1 (after Day 30) | | `scene` on SpriteKit, `objc_util` over ctypes, `photos`, `sound`, `motion`, `location`, `keychain`, matplotlib wheel. |

</div>


Less than half the product's depth ships by Day 22 (the ruling's Depth cell); that is the honest version 1. A membership slip past Day 7 moves nothing before Day 15; a slip past Day 10 moves submission a day per day lost, and the report will say so. Budget asked: one domain, if a name goes forward. No other spend, no sign-ups in version 1.

## 8. Honest weaknesses

1. **One incumbent update erases the difference.** The whole claim is "unchanged, on current Python". If the incumbent's maker ships an update with a current interpreter, the stranded-buyer half of the case disappears overnight and what is left is a B- novelty on a free shelf. The maker has been silent since <span class="nw">2023-04-27</span>; silence is not a guarantee. (Both graders' first reason for stepping below the ladder.)
2. **Buyers cannot find us by the word they type.** Guidelines 2.3.7 and 5.2.1 keep the incumbent's name out of our name, subtitle and keywords. `store_hints` shows that typing it opens a shelf led by the incumbent and nine generic Python apps; we would need to rank there on "python", "scripts", "shortcuts" with 0 ratings. The buyers who matter most are the ones we can least address on the store.
3. **The compatibility share is unmeasured.** How many real scripts run unchanged on the version-1 slice is unknown until Idris's 30-script Simulator run; the mockup's "17 of 30" is an invented corpus checked by code, not a measurement. The store page may not claim above the measured number.
4. **The difference is narrower than the headline.** Native dialogs, clipboard, an Objective-C bridge and Shortcuts exist in Juno and Pyto under other names (Idris's correction to the lane). Only an owner of old scripts sees what is new; to everyone else this is another Python app at $9.99 against free ones.
5. **App Review time.** A code runner draws a longer first review; Day 17 submission leaves four days before the planned launch, and one rejection likely moves launch past Day 30. The first complaint in the reviews, "What happened to pip?", is one version 1 also cannot answer, by design.
6. **Less than half the depth ships by Day 22.** `scene`, `objc_util`, `matplotlib`, `photos`, `sound`, `motion`, `location`, `keychain` are after launch. A buyer whose scripts need them pays $9.99 for a plan screen.
7. **The pool is fixed and the stranded share is unknown.** About 51,000-153,000 lifetime US downloads implied, growing 13.5-40 a day; 11 low reviews in 2026 against 1,528 ratings means most buyers still run 3.4 well enough not to complain. A counted read of 20+ 2026 forum posts asking where to move scripts is the pre-written lift; none has been done.
8. **Day 30 is C.** On the paid comparator's lane, 29 sales in 8 days is 9%-27% of its lifetime daily rate. Three to four paid sales a day from a standing start with no ratings.
9. **Legal reads are unfinished.** API reimplementation under Commandment 6, the documentation licence, the PSF name policy, and the corpus licences (section 6) are all open before any build.
10. **Native wheels may not land.** numpy and matplotlib for iOS must be cross-compiled or sourced; if numpy slips to 1.1, the "old libraries" complaint stays half-answered at launch.
11. **The rubric is unvalidated.** [Corrected <span class="nw">2026-10-24</span> 18:12, see the correction at the end of this file.] H140 (29 fresh cards, two blind graders) failed its check, written after grading and before the key: the graders' letters ranked earners above non-earners (Final AUC 0.83 and 0.87) and no non-earner reached B, but B caught only 5 and 8 of 15 earners. Not a hit rate (`research/hunt/H140-verdict.md`, section 2, 893e0fe1). Before H140 (text as posted): Method v2 and v3 failed their pre-registered backtests (`research/hunt/H95.md` sections 6-8); the computed <span title="The final letter, after the caps.">Overall</span> was dropped and this letter is a chair's judgment with both grade files open. B here means "the best-argued concept so far", not a tested predictor of $200.
12. **Grader independence, as disclosed.** Both graders' packets masked the author's letters (`blind_packet.py` exit 0) but showed her flag cells; Idris's context carried two H134 commit subjects without letters; my own pre-read letters followed a board brief that named the graders' points (2.5.2, 2.3.7, Juno's description, the aggregator date) but no letters. The lane author did not grade.

## 9. Mockups

Three first screens, drawn by `pitches/PITCH-12-mockups/draw.py` (Commandment 9; neutral placeholder style, not approved creative, <span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>; README in the folder). Nothing on them is typed in as a result: screen 1's statuses and count come from running a checker over an invented 30-script list; screen 2's form, console lines and HUD come from actually executing the shown 15-line script under stub modules; screen 3's module lists are the version-1 slice as the ruling describes it.

- Your scripts, each marked runs unchanged or needs a module: `pitches/PITCH-12-mockups/1_scripts.png`
- One script running (editor, native form, console, HUD): `pitches/PITCH-12-mockups/2_run.png`
- What runs in 1.0, what is planned, the Shortcuts action: `pitches/PITCH-12-mockups/3_support.png`

## 10. How the Investors could market it

All contact is theirs (Commandment 10); we prepare a launch kit (copy, code-drawn screenshots, a one-paragraph answer to "why not Juno or a-Shell") by Day 16.

- The incumbent's own forum and its subreddit are where its owners gather and where the "where do I move my scripts" question lives; neither has been counted (that count is the lift in weakness 7), and the company posts nowhere.
- The hook is a screenshot of an old script's folder with its rows marked "Runs unchanged", and the measured share from the harness, stated as measured.
- The Shortcuts and automation communities (r/shortcuts, the automation blogs) for the second buyer.
- Day 30 rests on the Investors' reach into those places far more than on store search, because of weakness 2.

## 11. Apple status

Membership pending, due Day 7 (<span class="nw">2026-10-28</span>). Paid Apps Agreement, tax and banking due Day 12 (<span class="nw">2026-11-02</span>). Everything in the plan before Day 15 runs on the Simulator; the TestFlight device pass and the price tier wait on the gate.

## 12. Against Pitch 11 and the standing runners-up

Letters from the rulings rows (`research/hunt/rulings-v2.md`); v1 rows carry v1 cells.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 12. Against Pitch 11 and the standing runners-up, scrolls sideways" data-n="2 3 4 6" data-o="2" style="--tw:977px" markdown="1">

| Concept | Overall | Novelty | Depth | Day 30 | Day 90 | Where it stands against Runpy |
|---|---|---|---|---|---|---|
| **Runpy** (H134, v2, this pitch) | **B** | B- | A | C | B- | Deepest build of any B; paid up front, so no conversion divisor; the only concept with a counted buyer who already pays $9.99 for this job; one competitor update can erase it |
| **Ask Your History** (H137, Pitch 11, #43) | B | B- | B | C | B | Lighter build and a lower review risk; its buyer is not counted (nobody was seen typing a question) and its film-metadata licence is unsettled; Day 30 needs 580-1,450 free downloads in 8 days against our 29 paid sales |
| Netsmith (#11, Pitch 3, v1) | B- | B- | A | not sized | | Same depth, no counted demand; outside the Investors' later subject list |
| Meteor catcher (H113, v2) | B- | B | B | C (cap) | | Higher novelty, held by the H124 family rules until a device night |
| True-north sky finder (H103, v2) | B- | B- | A | B-/C | | Held at B- by the H124 rules |
| This Spot Through Time (H115), True Bearing (H127), Keyed (H98) | B- | B- | B | D | | <span class="nw">Day 30 D</span> caps each |
| Time-layer walker (H133), dead-wax reader (H132), caliper SPC (H120) | B- | | | | | Day 3 rulings; none lifted |

</div>


**How the two B's differ.** Both are C at Day 30. Runpy's path to $200 is 29 paid sales to a buyer who already pays this price for this job and is counted complaining; it fails if those buyers cannot find us (weakness 2), if the incumbent updates (1), or if App Review takes the week (5). Ask Your History's path is 580-1,450 free downloads converting at 2-5%; it fails if nobody types questions (its weakness 1) or the exports do not arrive in the window. Runpy is the harder build and the riskier review; Ask Your History is the harder sell. On what earns money by Day 30, I put Runpy narrowly ahead: a paid buyer who exists and complains is closer to a sale than a free downloader who has not been seen asking. On what the company can finish and get through review by Day 17, Ask Your History is ahead.

**The company's recommendation.** Runpy, narrowly, for the reason above, with two conditions the plan already carries: the 30-script harness share is measured on Day 4-5 before any store copy is written, and the legal reads in section 6 are done and recorded before a line of shim code. If the Investors weigh review risk above money mechanics, Ask Your History is the runner-up and the safer build. The earlier pitches (#7 to #21) stand as pivot or side-project options as the amendment of <span class="nw">2026-10-22</span> 11:48 asks.

---

No decision is asked; this is here for whenever you choose.

## Correction, <span class="nw">2026-10-24</span> 18:12 ET (Ines): the rubric line after H140

Board line "[plan] Ines, P2, H140 pitch rubric lines". H140 (`research/hunt/H140-verdict.md`, 893e0fe1) failed its check, so the rubric stays unvalidated. The card note's citation now names H140 instead of H95.md section 8, and section 8, item 11 carries the verdict's counts first, with the earlier text kept after it. No letter moves. Nothing is asked of the Investors.

## G2a raw removal (<span class="nw">2026-10-24</span> 19:34 ET, Ines)

- Removed from the tree with git rm (past commits keep them; history not rewritten): `research/hunt/H134-raw/terms/apple-guidelines.html`. They were scripted copies of Apple's App Review Guidelines page on developer.apple.com, whose terms forbid scripted reads (G2a; P2 terms ruling 0894efda). Line 92's quotes of Guidelines 2.3.7 and 5.2.1 were read by script (curl), not in a browser. The name rule they support is held open, lowering only, until a person's browser read of both guidelines (owed on #47). No letter moves; nothing above is rewritten.
{% endraw %}

</div>
