---
layout: "default"
title: "Decision memo: closing the revenue gap in Wrenna&#x27;s launch plan"
section: "documents"
description: "On organic reach, the $200 target is unlikely at any price. My most likely Day 30 range is $30-$150 net. I put the chance of reaching $200 at about one in four. That is my judgment, not a measurement, and nearly all of\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/' | relative_url }}">← Build Plan</a><a href="{{ '/documents/pywidget/decision-2026-10-26-revenue-gap.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Proposal</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/proposals/DECISION-2026-10-26-revenue-gap.md</code></span></div><h1>Decision memo: closing the revenue gap in Wrenna's launch plan</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Ines (CEO, <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span>), 2026-10-26, written 20:16-20:21 ET (`date`). Board line T-0260. Commandment 30: this memo is the record.
- Read: pywidget/docs/release/launch-plan-draft.md and press-kit-draft.md (Wrenna, c8b9fd2c), PROPOSAL-001-v1-paid-tier.md, research/L11-economics.md, decisions/ADR-001-mvp-and-phasing.md (3.1, 3.3, 4, Revised), ADR-004 ruling 3 (themes), IDE spec s5 item 7 (Pro rows).
- What the company decides here: what it builds and what it recommends. What stays with the Investors: the price, the Pro contents that depart from founder decision 2.1 (PROPOSAL-001), creative approval (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>), and every post (C10).

## 0. The answer first

**On organic reach, the $200 target is unlikely at any price.** My most likely <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> range is **$30-$150 net**. I put the chance of reaching $200 at about one in four. That is my judgment, not a measurement, and nearly all of it rests on one Investor post landing well (Show HN, or an Apple feature). Price changes the count of buyers we need. It cannot close a gap that is two to six times wide. Reach closes it, and reach is the Investors' to give.

What changes:
1. **Price recommendation moves from $9.99 to $14.99, one-time.** I owned the $9.99 suggestion in PROPOSAL-001 s5; I am withdrawing it (section 2).
2. **Pro <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> premades and editor themes, not packages,** while widgets ship. Packages move into Pro only if widgets are cut on Day 14. Pre-ruled here, so Day 14 is not decided under pressure (section 3).
3. **No trial, Family Sharing off, one review prompt after a real success** (section 3).
4. **Seven asks of the Investors,** two of them new: Small Business Program on the day the membership activates, and the newsletter submissions moved to launch day (section 4).
5. **Submission stays Day 17 (Sat 2026-11-07).** No earlier date is realistic (section 5).

## 1. Her conversion assumptions, checked against L11's evidence

L11 labels both inputs ASSUMPTION (s3, s7): 5-35 downloads a day, and 1-4% of downloads buying inside the window. **L11 holds no measurement of either.** Neither does any company file. So the check is which read facts push each number up or down.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Her conversion assumptions, checked against L11&#x27;s evidence, scrolls sideways" style="--tw:1159px" markdown="1">

| Input | Pushes it down | Pushes it up | My planning value |
|---|---|---|---|
| Downloads a day, 5-35 | The anchors are rivals' **lifetime** averages, and those rivals have ratings we will not have: a-Shell 561, Carnets 321, Juno 1,141 (L11 s2). A new app with 0 ratings, and with search barred to us for checking our own rank, likely sits in the lower half. | Launch-day posts, which L11 leaves out by design (C10) | 5-20 a day organic, about 150 in the window |
| Buyers per download, 1-4% | (a) The one counted willingness to pay is $9.99 **for running Python** (Pythonista, 1,529 ratings, L11 s2). We give that away free. Pro sells extras, so the counted buyer is not counted for Pro. (b) Window lag: a download on Day 27 may buy on Day 35. (c) Price fatigue in the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>'s own reviews: Pyto 67 of 158 low reviews on price, Juno 14 of 50, Widgy 76 of 500 (L7). | Pyto sells numpy, pandas and matplotlib behind a purchase and keeps 1,001 ratings. Widgetsmith sells cosmetics at $19.99 a year at scale (L11 s2). The live preview of Pro premades on the user's own data (state-spec chair ruling 2026-10-25 20:08) is the strongest honest pull we have. | **2%** (range 1-3%). 4% only if Pro holds the packages |

</div>


At 2%: $14.99 needs 1,000 downloads (800 at 15%); $9.99 needs 1,450 (1,200). Her table's 725-2,900 at $9.99 stands as arithmetic; at my planning value the middle of it, about 1,450, is the number to beat.

## 2. Price and tier: recommendation for the Investors (their call)

**Recommend one non-consumable "Pro" at $14.99 (US), one-time. No monthly, no annual, no launch price in v1.**


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. Price and tier: recommendation for the Investors (their call), scrolls sideways" style="--tw:1116px" markdown="1">

| Option | Sales for $200 at 30% (15%) | At 3 buyers (no posts, central) | At 10 buyers | Why or why not |
|---|---|---|---|---|
| $9.99 once | 29 (24) | $20.98 | $69.93 | The incumbent's price, but for the whole app. With reach fixed, it only wins if it sells 1.5 times as many units as $14.99. Nothing we hold says a $5 cut does that for a niche technical buyer |
| **$14.99 once (recommended)** | **20 (16)** | **$31.48** | **$104.93** | Fewest buyers needed for a price a script writer will pay once; the one-time model Juno advertises ("one-time purchase, not a subscription", L7) |
| $19.99 a year, no trial | 15 (12) | $41.98 | $139.93 | Fewest sales, but Guideline 3.1.2 asks a subscription to show ongoing value, and v1 has no server and no content stream. Review risk on a first submission, plus the shelf's price fatigue. Wrong for Day 30 |
| Paid up front $9.99 (option 4) | 29 (24) | n/a | n/a | No conversion divisor, but it breaks "the base app is free" (2.1), and 7 of 8 rival apps are free up front (L11 s2) |

</div>


My $9.99 was anchored on the incumbent's up-front price. That buyer paid to run Python, and we give running Python away. Pro sells what comes after, so its price is set by how few buyers we can reach, not by the incumbent. That was my mistake, and the reason is in Wrenna's table.

The Small Business Program cuts every row by about a fifth (20 sales to 16 at $14.99). It is the largest lever on this page that costs nothing (section 4, ask 1).

## 3. Conversion levers inside v1 (company decisions; scope and dates hold)

Pro's rows come from the flag file (IDE spec s5 item 7: `premades`, `themes`, `packages`). Each choice below is configuration, fixed before submission (2.5.19: no dormant features).


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3. Conversion levers inside v1 (company decisions; scope and dates hold), scrolls sideways" style="--tw:1280px" markdown="1">

| Lever | Decision | Reason | Cost and owner |
|---|---|---|---|
| `premades` | **On.** 7 Pro, 5 free (b8b4f0e4; questions item 10 asks the Investors to confirm) | The free 5 prove the engine; the Pro 7 are previewed live and locked at placement (state-spec ruling) | Built already (T-0031) |
| `themes` | **On, if approved.** Maren drafts 3 extra editor theme pairs (light and dark, with 7:1 sets) as a C51 proposal by Day 11 (2026-11-01); a picker in Settings only if approved by Day 12. If not approved, the row is off and Pro ships premades only | ADR-004 ruling 3 already keeps themes a data change. It is the one non-code power feature in v1 scope that a coder pays for. The catch is that it is cosmetic | T-0271 Maren, T-0272 Idris (after T-0041) |
| `packages` (numpy, Pillow, matplotlib) | **Off while widgets ship; on if widgets are cut on Day 14** | "Running your own code is never paywalled" is the launch post's hook (launch plan s3) and the counted answer to price fatigue. Gating numpy would make the first HN comment about the paywall. If widgets are cut, Pro has no other content, so the packages carry it, and the <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitch</span> is P-C | Configuration; PROPOSAL-001 option 3 already asks the Investors for it |
| <span title="A measured fact that holds a grade below a letter, however good the rest is.">Cap</span> on the user's own widgets (the Widgy slot model) | **Not recommended**; listed for the Investors | Likely the strongest converter, but it gates the core promise, departs from 2.1, and would be the headline of every thread | none |
| Free trial | **None** (PROPOSAL-001 q2 default stands) | A 7-day trial begun after Day 23 cannot charge by Day 30 (L11 s1). The live Pro preview does the trial's job | none |
| Family Sharing on the Pro purchase | **Off at launch**; revisit for 1.1 | It can lower unit sales per household inside the window, and [recall: once Family Sharing is turned on for a purchase it cannot be turned off]; so start off, which keeps both options open | none; an App Store Connect checkbox (Investors, Day 16) |
| Rating prompt | **One request, after a real success**: the first time a user's own widget or a premade is placed, or after a third successful run on a second day. Never after an error, never tied to a reward, never in the first session | We launch with 0 ratings, which hurts both search and the store page. Apple's own prompt (`requestReview`) is the only compliant route (C6; launch plan s5b) | T-0273 Idris, after T-0031 |
| The paywall screen | One screen: the rows that ship, the price from StoreKit, Restore, nothing "coming". Entry points: the Pro premade's Add button, a Settings row, and the gallery grid. No pop-up at launch, no countdown | Commandment 6, and the people we sell to dislike pushy paywalls | T-0031 as written |

</div>


## 4. What the plan asks of the Investors (C10: the company proposes, they act)

Wrenna's dated list (launch plan s5) stands, with these changes. All of it costs $0.

1. **New: enroll in the Small Business Program the day the membership is active** (due Day 7, 2026-10-28). At 15%, $14.99 needs 16 sales, not 20. [recall: the lower rate applies from enrollment, not back to the first sale, so the date matters.]
2. **Show HN on launch day (L), and one of you is present that day to answer questions.** This is the single largest swing in the plan. If it reaches the front page, the target is likely; if it does not, the target is unlikely. Nothing we hold sizes it (HN reads are held).
3. **Changed: submit to the Python newsletters on L, not L+4.** Issue dates are the editors', and L+4 risks landing after Day 30.
4. **New, if the form exists as recalled: Apple's featuring nomination the day the app record exists** (Day 12-16). [recall: in App Store Connect; Apple asks for lead time, so the odds inside the window are low, but the cost is ten minutes.]
5. r/Python on L+1, r/shortcuts on L+2, your own social accounts on L, under each room's rules as read by a person on Day 15. No reposting.
6. The person's ten-minute read of the seven rival in-app prices (questions item 9). It confirms or moves the $14.99 recommendation (L11 R3: only Juno or Pyto selling running code for well under $9.99 would move it).
7. **No paid ads.** Break-even cost per install is $10.49 net per sale times 2%, about **$0.21**. [recall: Search Ads installs in developer categories cost well over that.] Not proposed.

## 5. The earliest realistic submission date

**Day 17, Sat 2026-11-07. It does not move earlier.** The single Xcode <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> is the bottleneck: freeze Day 13, widget cut line Day 14, store assets and creative approval Day 15, release candidate Day 16. Pulling submission earlier would mean cutting widgets, and widgets are what the launch posts lead with. One rejection costs more days than an early submission gains.

The date holds only if:
- the membership is active by Day 7 (2026-10-28);
- the Paid Apps Agreement, tax and banking are active by Day 12 (2026-11-02). [recall: an in-app purchase cannot be submitted for review without the Paid Apps Agreement];
- the Investors approve submission on Day 16.

Each day the membership slips past Day 7 moves Day 17 with it, day for day. Day 20 (Tue 2026-11-10) is the last safe submission. If review passes the first time, the app is most likely on sale Day 19-20 (2026-11-09 to 11-10), which leaves 10-11 selling days.

## 6. Most likely range, plainly (C41)

At $14.99 and 30%, at my planning conversion of 2% (range 1-3%):


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 6. Most likely range, plainly (C41), scrolls sideways" style="--tw:875px" markdown="1">

| Case | Downloads in the window | Buyers | Net by Day 30 |
|---|---|---|---|
| A. No Investor posts | 50-455, about 150 likely | 0-14, about 3 likely | $0-$147, about $31 likely |
| B. Posts go out; Show HN does not reach the front page (my judgment: the likeliest case if you post) | 200-1,050 [judgment] | 4-21 | $42-$220 |
| C. Show HN front page, or an Apple feature | 1,000-5,000 [judgment] | 20-100 | $210-$1,049 |

</div>


**Most likely: $30-$150.** $200 needs case C or the top of case B. I would rather say this on Day 5 than on Day 28. If the Investors want a higher chance, the levers are theirs: the posts, the Small Business Program, and the membership date. Inside the app, the levers are set above and will not change the order of magnitude.

## 7. Work this creates (board lines)

- T-0271 Maren, P2: 3 Pro editor theme pairs as a C51 proposal, by Day 11.
- T-0272 Idris, P3: theme picker and the `themes` flag row, after T-0041, only if T-0271 is approved by Day 12.
- T-0273 Idris, P2: one rating request after a real success (section 3), after T-0031.
- T-0274 Wrenna, P2: update launch-plan-draft s4-s5 to this memo ($14.99 row first, the 2% planning value, asks 1, 3, 4), and the store copy's <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G6</span> sentences for packages off while widgets ship.
- Done with this memo (Ines): PROPOSAL-001 s5 and s7 carry a dated note pointing here; ops/questions.md "For the next report" has one line.

## 8. Fallback Pro content when widgets are cut and the native packages fail (added 2026-10-26 20:32 ET, `date`; T-0277)

Wrenna found the hole (T-0274, 4c85c8ae; store-page-draft s6b case C): section 3 moves the packages into Pro if widgets are cut on Day 14, but if no native package passes ADR-003's Day 10 gate, that move has nothing to carry, and Pro is empty. ADR-001's risk table already said so ("Widget engine misses Day 14: Pro has no v1 content under 2.1"). It is ruled here, before either date.

**Ruling.** The order is fixed by the calendar: the native verdict lands Day 10 (Sat 2026-10-31), theme approval Day 12 (2026-11-02), the freeze Day 13, the widget cut Day 14 (2026-11-04). So the fallback is set on Day 10, not Day 14.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 8. Fallback Pro content when widgets are cut and the native packages fail…, scrolls sideways" style="--tw:1257px" markdown="1">

| Case | Pro holds | Store fill (s6b) | Price (Investors') |
|---|---|---|---|
| C1. Widgets cut, **some** native packages pass | Exactly the packages that pass, plus themes if approved. numpy alone is enough to carry it. matplotlib needs numpy and Pillow (ADR-003 s4), so it cannot pass alone | The passing names, in s1 order | $14.99 recommendation stands |
| C2. Widgets cut, **none** pass, themes approved by Day 12 | **The 3 editor theme pairs** (T-0271), light and dark, with their 7:1 sets | `3 more editor themes, light and dark` | **I recommend $4.99 here** (judgment, not measured): three cosmetic themes at $14.99 invite the price reviews L7 counted (Pyto 67 of 158 low reviews on price) |
| C3. Widgets cut, none pass, themes not approved | **No in-app purchase in v1.0.** The app ships free and complete; Pro arrives in 1.1 with widgets | The IAP sentence is deleted, not filled | n/a |

</div>


Why themes, and only themes. They are the one item in PROPOSAL-001 option 3 that v1 scope and the dates can deliver with no new engineering risk: ADR-004 ruling 3 keeps themes a data change, Maren's proposal is due Day 11, and the picker is a Settings row. Everything else in option 3 is 1.1 (debugger, formatter, compatibility modules; ADR-001 3.2), and pulling any of them past the Day 13 freeze trades the one review Day 30 depends on for a feature we have not tested. I will not gate anything on PROPOSAL-001's never-gated list (running Python, the editor, console, projects, Shortcuts actions, the device modules) to fill Pro. That would break the launch post's hook and the free base of 2.1.

Why C3 ships no purchase rather than a thin one. A Pro screen that unlocks nothing, or a "supporter" row with no content, is the kind of in-app purchase App Review sends back [recall: 3.1.1 and 2.3.1 ask that a purchase unlock what it says], and a rejection costs more days than C3 costs dollars. The Investors may instead choose PROPOSAL-001 option 4 (paid up front) or option 5 (tip jar) for this case. Both depart from 2.1, so both are theirs; I do not recommend either, because 7 of 8 rivals are free up front (L11 s2) and we would launch with 0 ratings.

**What it does to the numbers, plainly.** C2 at my judgment of 0.5% conversion (range 0.25-1%; themes are cosmetic, and section 1's 2% was for premades) and section 6's case A downloads of about 150: about 0.75 of a buyer, so $3-$8 expected net ($3.49 or $10.49 a sale at 30%). C3 is $0 from the app. Either way, the Day 30 target in the widgets-cut cases rests entirely on the Investors' posts and on 1.1 arriving fast. I would rather name that on Day 5.

**What changes in the build.**
- If no native package passes on Day 10, T-0272 (Idris, theme picker) rises to P2 and starts Day 11 without waiting for approval, behind the `themes` flag, so a Day 12 approval is data, not code. If the themes are not approved, the Settings row is removed before the freeze; nothing dormant ships (2.5.19).
- Packages stay free in every case where widgets ship (section 3 unchanged).
- Wrenna fills s6b rows C1-C3 with these fills and runs the checker (T-0283).
{% endraw %}

</div>
