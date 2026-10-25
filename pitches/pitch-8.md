---
layout: "default"
title: "Pitch 8: Themecount, review mining for app makers, built in public on our own reviews (round 2 of #10, pitch 3 of 3, the meta one)"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← Pitches</a></div>
<div class="page-head"><div class="kicker">Pitch 8</div><h1>Pitch 8: Themecount, review mining for app makers, built in public on our own reviews (round 2 of #10, pitch 3 of 3, the meta one)</h1><p class="lead"><code>pitches/PITCH-8.md</code>, as written, scrubbed for the public site.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}




Prepared Day 1 (2026-10-22) by Ines, from Wrenna's pass 6 (`research/pass6.md`, idea D) and pass 5 (3C), plus my own checks today (Apple's public review feed, store search, names, the 5.2.2 and 5.6 guideline text). Posted as a `pitch` issue as soon as formed, per #6. Pitches #7, #9, #11, #12, #14, Pitch 6 (Partfix) and Pitch 7 (Seatsolve) stay stored; nothing is withdrawn. This is the meta pitch the Investors asked for at 15:24 ET: meta components like Boardseat's, with a different product.

**Conflict of interest, first.** This idea is Wrenna's own research method turned into a product, and Wrenna said so in writing twice (pass 5 and pass 6) and graded it with a heavy hand. I have weighed it myself from the evidence and not from their enthusiasm, and I rate it the weakest of the three for Day 30 money. It stays in the round because the Investors asked for a meta pitch and this is the honest one.

## In plain English

**What it is.** Themecount is an app for people who make apps. You enter any app on the App Store, yours or a competitor's, and it pulls the public one-to-three-star reviews, groups the complaints into themes on your device ("subscription or price", "accuracy", "crashes", "cannot edit"), counts them, and, the important part, lets you tap any count and read every review behind it, so you never trust a number you have not checked. Each finding exports as one line with its count, its quotes and links to the reviews. For your own app, you add your App Store Connect key and it tracks how each theme rises or falls from version to version, so "crashes went from 4 to 19 after 2.3" is a fact on a chart, not a feeling. It runs on iPhone, iPad and Mac, keeps nothing on a server, and costs one price, once.

**The meta part.** The company builds Themecount in public on its own reviews. The app's first worked example is this company's own launch: from the day our app has reviews, Themecount counts them, the counts are published on the company site every week, and every Themecount release note names the counted complaint, with links, that caused the change. The method is the one the company's researcher used to choose what to build; the app's story is the record of how its maker decides. The first screen says the company is run by AI and the workers are AI-simulated characters (Guideline 5.6.2, as read for Boardseat).

**One session, pictured.** An indie developer with a $3/month photo utility opens Themecount on her Mac, enters her two biggest competitors, and in a minute sees that 37 of 209 low-star reviews on the leader are about the subscription and 24 are about being unable to correct mistakes. She taps "24", reads the twelve strongest, exports the line with quotes into her planning doc, and decides her next feature. On her own app she sees "login" climbing since 4.1 and ships a fix with a release note that cites the count.

**Who it is for.** Indie iOS developers and two-to-ten-person studios, mostly 25 to 45, who read reviews by hand today or pay for a web dashboard (Appbot starts at $49 a month billed annually, $59 monthly, for one user and five apps; AppFollow is sales-led with no public price); second, product managers and UX researchers at small software firms. Why they pay: the web tools are monthly, team-priced and cloud-hosted; nothing on the Mac or iPad does quote-and-count with the evidence attached, one price, offline. Demographics are my judgment; the honest gap is that pass 7 counted developers asking for this outside our walls and found none (0 of 1,459 Hacker News comments since 2023; 0 Ask HN posts).

---

**Recommendation first.** Not ahead of Partfix (Pitch 6) for Day 30. Themecount has the best story and the weakest numbers: an uncounted market of developers, a data source that failed twice today, and a researcher's conflict of interest. If the Investors want the meta product, this is the one, at **Themecount, $19.99 one-time**; 15 sales reach $200 net at 30 percent, 12 at 15 percent; submit Day 17 (2026-11-07). My recommendation: store it, and build it later as the company's second product or as a side tool, where its meta story is strongest because the first product's reviews will exist by then.

**Ratings (per #10).** 5 is most, except complexity, where 5 is hardest to build and hardest to copy.

```
novelty          ██░░░  2   corrected from 3: ReviewHeron (129 EUR once, local Mac) and App Feedback Hub ($9.99 Mac) already hold offline, one price, on the Mac; our edge is the hand-check
market need      ██░░░  2   our own daily use; pass 7: 0 askers in 1,459 HN comments, 0 Ask HN posts, against 12 builder Show HN posts (median 2 points)
profitability    ███░░  3   Appbot is $49-$59/month minimum and exports only from $166/month; $19.99 once is a real price edge; small audience
complexity       ███░░  3   on-device clustering with NaturalLanguage embeddings, counting with hand-check, trend by version; below Netsmith
room to grow     ████░  4   competitor comparison, keyword gaps, reply drafts by hand, Play Store, team sharing, trend alerts
meta             ████░  4   built in public on our own reviews; release notes cite counted complaints; the method that chose the product
```

**Complexity, honestly.** Below Netsmith and well below Partfix. Fetching and parsing reviews is a day. Clustering is NaturalLanguage sentence embeddings on device plus agglomerative grouping with editable theme names, two to three days, and the hard part is making the groups make sense to a human, which is why every count is one tap from its reviews. Version trends are a join on the review's version field. Export is Markdown. The honest complexity is in the data source, not the algorithm, and that is a risk, not a moat. Eight to ten engineer-days for version 1 on iPhone, iPad and Mac (Catalyst).

What would make this fail: the public review feed. Apple's RSS endpoint for customer reviews returned zero entries for a whole research pass earlier today and returned zero again when I checked it at 15:35 ET (`itunes.apple.com/us/rss/customerreviews/.../id=884984324`). When it is empty, competitor mining is empty. Your own app's reviews come from the App Store Connect API with your own key, which is reliable and official, so version 1's dependable half is "your own apps" and the competitor half is best effort.

---

## Candidate: Themecount

Mockup: `pitches/mockups/themecount.png` (drawn by `tools/mockup.py`; the counts shown are Wrenna's real hand-checked counts for Sheet Music Scanner from `research/pass6.md`; the version trend line is illustrative).

### Evidence of need
- **Inside the company.** `tools/review_mine.py` and `tools/theme_count.py` are used every day here, and the hand check corrected the regex count four times today (knitting: lost 10 to 5, size 11 to 4; pass 6: cut-list 12 to 10, Seat Puzzle 8 to 7). Uncorrected keyword counting is the mistake this product prevents, and it is the mistake I made in PITCH-2 before Wrenna's hand read.
- **Outside, thin; counted in pass 7.** 0 of 1,459 HN comments since 2023 ask for a review-analysis tool or how others read reviews, and 0 Ask HN posts do; 12 Show HN posts (11 products) build one, median 2 points, 1 comment in all 12. The one crowd-pleaser was an article about a $2M/month app's reviews (37 points), which supports the published-counts meta half, not the paid tool. Indie Hackers and r/iOSProgramming were unreadable (403). HN 45989976 (2025-11-20): "AppReview AI, a Mac + iPad app to analyze App Store reviews privately and offline ... as an indie developer, reading hundreds of reviews from competitor apps was slow, noisy, and hard to ext[ract]". HN 37480763 (37 points): reading a $2M/month app's strategy through its reviews. Count of developers asking for this: none found. That is the reason for the rating of 2.
- **Store, checked today** (`tools/appsearch.py`, US, "app store review analysis", "app reviews analyzer"): App Store Connect (Apple), App Reviews - iOS & Android (1552567648, 77 ratings, a review monitor), AppSpy (15 ratings), Reviews Time (10 ratings, last updated 2020), Appboard (48 ratings, rankings). Nothing counts themes with evidence attached. AppReview AI from the HN post is not findable by store search.
- **Mac competitors I did not know about (pass 7):** ReviewHeron (hamme.software; local-first review manager, 129 EUR one-time, 14-day trial, App Store and Google Play, on-device reply drafts, search by theme; an inbox and reply tool, not a counted-themes tool with a hand check) and App Feedback Hub (Mac App Store id6759007525, $9.99, 0 ratings, released 2026-02-18). Also AppReviewAI (HN 45989976, Mac and iPad, offline). They take "offline, one price, on the Mac" from us.
- **Web competitors:** Appbot: $49/month annual, $59 monthly (1 user, 5 apps); Medium $99/$119; Large from $166/$219; CSV/Excel export only on Large, so about $2,000 a year to export counted reviews. AppFollow: sales-led, no public price. AppTweak. Monthly, cloud, team-priced.

### The idea, and what is new
Themecount is quote-and-count with the receipts. Sources: your own apps through the App Store Connect API (your key, stored in the Keychain, never leaving the device except to Apple), any app through Apple's public review feed when it answers, and import of a reviews CSV or JSON for anything else. Themes are built on device by embedding each review's sentences and grouping them; you rename, merge and split themes; every count is a tap from its reviews, and a review that does not belong is removed from the count by hand, which the export records ("24, hand-checked, 2 removed"). Trend by version for your own apps. Export as Markdown with quotes and links. Mac, iPad, iPhone. No server.

New: the hand-check as a first-class step, recorded in the export; offline and one-time; built in public with the maker's own counts published. Not new: review dashboards and sentiment tools, which exist on the web.

### Names, checked 2026-10-22
Checks: App Store via `tools/name_check.py` (iTunes Search, US), domains via DNS and whois, trademarks by web search only. A USPTO search is still needed.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Names, checked 2026-10-22, scrolls sideways" style="--tw:1261px" markdown="1">

| Product name | App Store | .com | .app | Note |
|---|---|---|---|---|
| **Themecount** (preferred) | none; nearest are theme and font apps | **whois: not found** (unregistered today) | no DNS record | the only unregistered .com in this round |
| Starcount | none; nearest are star-map apps | registered | no DNS record | reads as astronomy |
| Review Desk (Wrenna's working title) | Photo Review Desk exists; dropped | registered | NS only | dropped |

</div>


Recommendation: Themecount by Lowtide Software, themecount.com if the Investors register it.

### Fit
- A tool with a real job (Commandment 8). Reviews are public data; the developer's own key is their own credential, stored in the Keychain, never in anything we write (7). Guideline 5.2.2 (read today: "ensure that you are specifically permitted to do so under the service's terms of use") applies to Apple's own public feed; I have not found Apple terms that forbid reading it, and the App Store Connect API is explicitly for this. The Operator should ask the Investors to confirm the Apple Media Services terms before build, as a report question.
- Buildable on one M1 Mac mini: Swift packages `ReviewSource` (feed, API, import), `ThemeKit` (NaturalLanguage embeddings, grouping, hand-check state), `Trend`, with XCTests on saved review files from `research/reviews/`; SwiftUI; Catalyst for Mac; StoreKit testing in Xcode. The App Store Connect half needs our own key, which follows the Apple membership (Day 7) and the API key (after).
- Every visual is drawn by code (9): bars, trends, the icon (a tally mark).
- Scope: enter app, count, read, export is a coherent slice App Review accepts.

### Roadmap after version 1
Competitor side-by-side; keyword-gap reading (what reviewers say that the store page does not); reply drafts written by the developer with the quote pinned (no automated replies; C10 is ours, not theirs); Play Store import; team sharing by file; trend alerts; a public "built in public" page format other developers can publish.

### Revenue plan
Free download: one app, counts and reading, no export. **Themecount, $19.99 one-time**: unlimited apps, your own apps by API key, trends, export. No subscription, no ads.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Revenue plan, scrolls sideways" data-n="3 5" style="--tw:617px" markdown="1">

| Price | Net at 30% | Sales for $200 | Net at 15% (SBP) | Sales for $200 |
|---|---|---|---|---|
| $19.99 (plan) | $13.99 | 15 | $16.99 | 12 |
| $29.99 (test if developers convert) | $20.99 | 10 | $25.49 | 8 |

</div>


Why $19.99: Appbot's cheapest plan is $49 a month annual ($59 monthly); a one-time $19.99 is under half of one month of that. Against ReviewHeron at 129 EUR once, we are far cheaper, against App Feedback Hub at $9.99 we are double. Fifteen buyers in ten days from an uncounted audience is the whole risk of this pitch, and the Investors' reach into developer circles would decide it, as with Boardseat.

### Build plan (Day N = 2026-10-21 + N)

<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Build plan (Day N = 2026-10-21 + N), scrolls sideways" style="--tw:526px" markdown="1">

| Day | Date | Milestone |
|---|---|---|
| 3 | 10-24 | Investors choose. `ReviewSource`: public feed parser with empty-feed handling, CSV/JSON import, fixtures from `research/reviews/`. |
| 4-6 | 10-25 to 10-27 | `ThemeKit`: embeddings, grouping, theme editing, hand-check state; tested on the saved review sets against Wrenna's hand counts. |
| 7-9 | 10-28 to 10-30 | Apple membership due Day 7. App Store Connect API client (own key in Keychain), version trend, Mac layout. |
| 10-12 | 10-31 to 11-02 | Export, StoreKit 2 unlock with StoreKit testing, iPad layout; code-drawn icon and screenshots, store copy, privacy label, AI-run disclosure on first screen; creative approvals requested. Paid Apps Agreement, tax and banking due Day 12. |
| 13-15 | 11-03 to 11-05 | TestFlight pass; the company's own key tested against our own (empty) reviews. Bug fixing only. |
| 16 | 11-06 | Submission build archived; review note explains data sources and the 5.2.2 position. |
| 17 | 11-07 | Submit to App Review. |
| 18-20 | 11-08 to 11-10 | Review; launch target Day 20. |
| 20-30 | 11-10 to 11-20 | Selling days. Price decision Day 25. Weekly published counts begin when our app has reviews. |

</div>


Cut list if behind on Day 12, in order: Mac layout (ship iPad and iPhone), trends, CSV import. Never cut: counts with the reviews behind them, hand-check, export.

Budget asked: one domain. Nothing else.

### Main risks
1. **The public review feed.** Empty twice today. Mitigation: import and the official API; the store copy promises competitor mining "when Apple's public feed is available", which is weak copy and I say so.
2. **Terms.** 5.2.2 and Apple's media terms on reading public reviews: unconfirmed. A report question for the Investors before build.
3. **A counted-empty market.** Pass 7 found no developers asking for this (0 of 1,459 comments). Fifteen sales in ten days from developers found by search in a lane where the nearest app has 77 ratings is not supported by evidence.
4. **Conflict of interest.** Wrenna's. Declared twice by them and once by me; the Investors should discount their grade and read mine.
5. **The meta story depends on our own reviews existing.** They will not exist until Day 20 at the earliest; the first worked example at launch would be competitor counts, with our own counts following. Honest: the story is stronger as a second product.
6. **Guideline 4.3.** Low to medium, raised from low: App Feedback Hub, ReviewHeron and AppReviewAI are similar Mac tools.
7. **Apple membership and API key.** The own-apps half needs the key; a slip pushes that half, not the launch.

---

## Across all open pitches
In order for Day 30: **Partfix (Pitch 6)** with its Day 6 tripwire; **Netsmith (#11)** as the fallback on a fixed calendar; **Seatsolve (Pitch 7)** if the Investors want the lowest build risk and accept a crowded lane; **Themecount (this pitch)** as the meta option, best built second; Boardseat (#14) and Scope (#12) stored as games; Purlwright (#9) and Stripwise (#7) stored as the counted-market and lowest-review-risk options. One decision from the Investors on Day 3 (2026-10-24) keeps the Day 17 submission for whichever is chosen.

Decisions asked of the Investors: whether Themecount is a candidate, a second product, or stored; the product name (Themecount, Starcount) and whether to register themecount.com; confirmation of Apple's terms on reading the public review feed. Open research (board): Indie Hackers and r/iOSProgramming (unreadable, 403); full feature pages of ReviewHeron and AppReviewAI before any build decision; USPTO check for the names.
{% endraw %}

</div>
