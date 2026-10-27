---
layout: "default"
title: "L11. Marketplace economics: what each pricing model earns by Day 30"
section: "documents"
description: "Here is the shape of it. Under the founder&#x27;s plan, everything on sale lives in the marketplace, and the brief&#x27;s phasing puts the marketplace (and billing itself) in Phase 4, after launch. With v1 submitted around Day\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/l11-economics.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/L11-economics.md</code></span></div><h1>L11. Marketplace economics: what each pricing model earns by <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span></h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, market and product researcher, 2026-10-25 (Day 4). Brief: ops/plans/pywidget/build-brief.md, sections 2.1, 2.3 and L11. Arithmetic: `L11-raw/model.py` (output saved as `L11-raw/model-output.md`); every input is either a read fact cited below or marked ASSUMPTION. The ranges are arithmetic on stated assumptions, not a forecast.

## 0. The answer first

> "A paid tier lets users publish and promote widgets and access other users' published widgets." (build brief 2.1)
> "Phase 4 — Community. C10 marketplace and C12 billing." (build brief 2.3)

Here is the shape of it. Under the founder's plan, everything on sale lives in the marketplace, and the brief's phasing puts the marketplace (and billing itself) in Phase 4, after launch. With v1 submitted around Day 17-20 and Day 30 on 2026-11-20, **the founder's plan as phased earns $0 by Day 30**: nothing is on sale in the window. Even if the marketplace shipped in v1, the tier would sell publish rights into an empty market and access to other users' widgets of which there are none on launch day; my arithmetic puts that at 0-2 buyers, $0-$5.

The Mission needs $200 net: **$285.71 gross at 30%** ($235.29 at 15% if the Small Business Program enrollment, still pending with the Apple gate, comes through).

- **Closest compliant version (no change to 2.1): F1.** Ship C12 billing in v1 with the founder's paid tier, whose launch contents are the premium part of the first-party premade library. 2.1 says premades are "offered there too", and the brief leaves "whether premade widgets are free or paid" open (L18, unspecified product details). Publishing and community access join the same tier when the marketplace arrives. At a placeholder **$14.99 one-time, 20 sales** clear $200 (16 at 15%). Range: 0.5-18 buyers, $5-$191. Final price is the Investors' (human checkpoint).
- **Best alternative, needs the Investors (PROPOSAL-001): A1, free core + "Pro" with power features**, with marketplace browsing and installing free when it ships. Same 20 sales at $14.99 once, or **15 sales at $19.99 a year with no trial in the launch window** (range $7-$255). It sells more than F1 because the power features are what a script-only user, the brief's first user, wants.
- **Not possible: a cheaper unlock for owners of the abandoned Python app.** An app cannot check another app's purchase (section 5).

## 1. Timeline the money has to fit in


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Timeline the money has to fit in, scrolls sideways" style="--tw:909px" markdown="1">

| Item | Date | Source |
|---|---|---|
| v1 submission | Day 17-20 (2026-11-07 to 11-10; corrected 2026-10-26 20:15 ET, T-0249: was "11-08 to 11-11", one day late, since Day 1 is 2026-10-22) | task packet; plan.md |
| Selling days to Day 30 | about 10-13 | packet; ASSUMPTION that review takes the gap |
| Apple membership | pending, due Day 7 (2026-10-28) | amendment 2026-10-22 01:09 |
| Paid Apps Agreement, tax, banking | due Day 12 (2026-11-02) | same |
| Marketplace (C10) and billing (C12) | Phase 4, after Phases 1-3 | brief 2.3 |

</div>


Two window effects every model carries:
- **A free trial moves revenue out of the window.** A 7-day trial started after Day 23 cannot charge before Day 30. With 10-13 selling days, only trials begun in the first 3-6 days can pay in time.
- **Proceeds are counted after Apple's commission and, outside the US, after VAT/GST.** The tables use the US storefront; non-US sales net less per sale.

## 2. Competitor pricing benchmark (allowed routes only)

Read 2026-10-25 19:18-19:19 ET. Up-front price, ratings and dates from bare `/lookup?country=us&id=` through `tools/store_http.py` (`L11-raw/lookup-us-2026-10-25.tsv`); implied downloads from `tools/sizing.py` at 33-100 downloads per rating (`L11-raw/sizing-2026-10-25.txt`). In-app purchase prices are not in Lookup; store pages are barred (<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2a</span>, #53 <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>), so an IAP price is read only from the maker's own site after its terms are read (`L11-raw/preflight.txt`).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. Competitor pricing benchmark (allowed routes only), scrolls sideways" style="--tw:1067px" markdown="1">

| App | Up front | In-app pricing | US ratings | Last update | Implied per day (lifetime) |
|---|---|---|---|---|---|
| Pythonista 3 (abandoned incumbent) | $9.99 | unread (omz-software.com terms unfound, <span title="A figure we could not read because the source&#x27;s terms or robots file do not let our software read it. It never lowers a grade.">G2 gap</span>) | 1,529 | 2023-04-27 | 13.5-40.4 |
| Pyto IDE | Free | unread (pyto.app terms unfound) | 1,001 | 2024-06-09 | 11.3-33.9 |
| Scriptable | Free | unread (scriptable.app terms unfound) | 3,985 | 2024-09-30 | 44.9-134.8 |
| Widgy Widgets | Free | unread (widgy.app robots.txt unreachable 2026-10-26 19:43 ET: gap, s7 R2 run) | 26,135 | 2026-09-17 | 394.9-1,184.7 |
| Widgetsmith | Free | **Premium $1.99/month or $19.99/year, 7-day trial** | 777,214 | 2026-09-28 | 11,617.5-34,852.6 |
| a-Shell | Free | open: maker page silent on in-app purchases ([a-Shell_iOS](https://holzschu.github.io/a-Shell_iOS/), read 2026-10-26 19:56 ET, T-0224; no price word on it) | 561 | 2026-10-24 | 7.3-21.9 |
| Juno (Python IDE & Jupyter) | Free | unread | 1,141 | 2026-10-20 | 14.7-44.1 |
| Carnets (Jupyter) | Free | open: maker page silent on in-app purchases ([Carnets_Jupyter](https://holzschu.github.io/Carnets_Jupyter/), read 2026-10-26 19:57 ET, T-0224; no price word on it) | 321 | 2025-11-26 | 3.9-11.7 |

</div>


Listen to Widgetsmith's own FAQ ([widgetsmith.app/widgetsmith-faq](https://widgetsmith.app/widgetsmith-faq), terms at [widgetsmith.app/terms](https://widgetsmith.app/terms) read first: no automation or scraping clause, only the two auto-renewal sentences): "Widgetsmith Premium costs $1.99/month or $19.99/year and comes with a 7-day trial." Premium buys themes, fonts, weather data, custom icons, an ad-free app and background sounds ([/premium](https://widgetsmith.app/premium)). Sharing is free and person to person: "send them to another person with just a few taps ... via Messages, AirDrop, email" ([7.1 post](https://widgetsmith.app/blog/2025/1/share-and-back-up-your-widgets-with-widgetsmith-71)). On the two maker pages I read, **nobody charges to receive another user's widget**; the rest are unread, so this is one of one, not a count. The FAQ also links straight to Apple's subscription page for cancelling. That is the Commandment 6 pattern to copy.

What the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> says, in counts: 7 of 8 are free up front; the one paid app is the abandoned one. The only read in-app price is a $19.99/year cosmetic tier on the largest widget app.

## 3. The models

Downloads in the window (ASSUMPTION): 5-35 a day for a new free app with 0 ratings and no company outreach (Commandment 10). The low end is about Carnets and a-Shell's lifetime rate, the high end about Juno's, and both incumbents have ratings we will not have. Over 10-13 days that is **50-455 downloads**. Freemium buyers per download inside the window (ASSUMPTION, not a company measurement): 1-4%. Low = every low assumption at once; high = every high one.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3. The models, scrolls sideways" style="--tw:2117px" markdown="1">

| Model | 2.1? | Price point(s) | Sales for $200 at 30% (15%) | Day 30 range at 30% | Unit costs | Commandment 6 |
|---|---|---|---|---|---|---|
| **F0 Founder plan as phased** (tier = publish/promote + access; marketplace Phase 4) | baseline | placeholder $2.99/mo or $19.99/yr | 96 monthly (79), or 15 yearly (12) | **$0**: nothing on sale before Day 30 | none before Phase 4; then backend, moderation, search | compliant if subscriptions go through Apple with a cancel link |
| F0' Founder plan, marketplace pulled into v1 (counterfactual) | yes | $2.99/mo | 96 (79) | 0-2 buyers, $0-$5 | backend + moderation from day one; adds L6 review risk (4.7, 2.5.2) to the first submission | same |
| **F1 Founder tier from v1, launch contents = premium premades** (closest compliant) | yes (premade free/paid left open by the brief) | $14.99 once (placeholder) | **20 (16)** | 0.5-18 buyers, $5-$191; likely the lower half, since packs alone are a thin reason to pay | $0 per user: the library is inside the binary, no server | one-time purchase, nothing to cancel; no "limited" packs |
| **A1 Free core + Pro power tier** (unlimited saved widgets, advanced device modules, themes; web IDE and sync when Phase 3 lands); marketplace browsing free | **no**: access becomes free, features move into the tier | $14.99 once, or $19.99/yr | 20 (16) once; 15 (12) yearly | once: $5-$191; yearly, no trial: $7-$255 | v1 $0 per user; sync on CloudKit private database uses the user's own iCloud storage | annual through Apple, cancel link in Settings and in-app, renewal date shown; no countdown pressure |
| A1c Pro monthly with a 7-day trial | no | $2.99/mo | 96 (79) | $0-$18 (trial pushes charges past Day 30) | same | compliant; poor for Day 30 |
| A2 Creator-priced widgets, revenue share | no (adds creator pricing) | creator sets | n/a | **$0**: needs marketplace and payouts | payouts need a processor, tax forms and identity checks: an Investor sign-up and legal read; moderation of paid code | a "limited edition" digital widget would be false scarcity: bar it |
| A3 Tips (consumables) | adds to 2.1 | $0.99 / $2.99 / $4.99 | 96 at $2.99 average | $1-$19 (0.5-2% of downloads tip once, ASSUMPTION) | $0 | compliant if a tip unlocks nothing and says so |
| A4 Editorial instead of paid featuring | no (drops "promote" as a paid right) | none | n/a | $0 (not a revenue line) | curator time per week | paid placement, if kept, must be labelled sponsored |
| A5 One-time unlock for owners of the abandoned app | n/a | n/a | n/a | **not buildable** (section 5) | n/a | n/a |
| A6 Paid up front (<span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">PITCH</span>-12 shape) | **no**: base app not free | $9.99 | 29 (24) | 5-39 sales, $35-$273 (0.5-3 a day, ASSUMPTION from the PITCH-12 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span>'s "3 to 4 sales a day ... is a path, not a certainty") | $0 | compliant; but up-front price fights the "free base app" founder line and a shelf where 7 of 8 are free |
| A7 Premium premade packs a la carte | partly (packs instead of a tier) | $2.99 a pack | 96 (79) | $1-$57 | $0 | compliant |
| Ads (found, rejected) | no | n/a | n/a | pennies at 50-455 downloads | an ad SDK changes the privacy label from "Data Not Collected" | rejected on privacy and polish grounds |

</div>


Read across: **only one-time and annual prices of $14.99-$19.99 can reach $200 inside the high end of the window** (A1b reaches it; F1/A1 one-time comes close at the top). Anything under $5 needs 58-289 sales from at most 455 downloads, which no freemium rate supports. A trial and a monthly price both push money past Day 30.

## 4. Unit costs

- **v1 with no server: $0 per user.** Premades and libraries ship in the binary (also what 2.5.2 wants; PITCH-12 section 6 quotes the text). User files sit in the app container and the user's iCloud Drive.
- **CloudKit.** The private database counts against each user's own iCloud storage, not ours. The public database has a free allowance that grows with active users; the current quota numbers are on developer.apple.com, a G2a-barred host, so **unread**. The brief already doubts a public database alone can carry moderation, search and payouts (section 3).
- **Own backend (Phase 4).** Hosting, database, a moderation queue (every published widget is code: the static scan in L12, then a review step and takedown), search, reports. Its monthly price is **unread and needs Investor approval before anything is started** (Commandment 7; brief human checkpoints). At Day 30 scale (hundreds of users) the cost is mostly moderation time, not servers.
- **Payouts (A2 only).** A processor account, tax forms and identity checks for creators: sign-up and legal terms are Investor checkpoints. Out of reach before Day 30.
- **Commission.** 30%; 15% under the Small Business Program (enrollment pending). Subscription renewals after a year are also lower; that does not touch Day 30.

## 5. A cheaper unlock for owners of the abandoned app: not possible

> "would very much like to continue using the existing app" ([omz/Pythonista discussion #140](https://github.com/omz/Pythonista/discussions/140), 2026-10-21, quoted in research/hunt/H154.md)

The owners exist (1,529 US ratings, about 51,000-153,000 implied lifetime downloads, `tools/sizing.py` today), but H154 counted 0 of 27 2026 posts asking where to move their scripts, so they are a pool, not a queue. Verifying their purchase:
- **Technical:** iOS sandboxes each app; an app's StoreKit transaction history and app receipt cover its own purchases only. From memory; Apple's StoreKit pages sit on developer.apple.com, G2a-barred, so the documentation is **unread** today.
- **Review:** Guideline 3.1.1, as I last knew it, bars apps from using "their own mechanisms to unlock content or functionality" (license keys, codes). A "show us a screenshot of your old purchase" check would be exactly that, and unverifiable besides. The current text is **unread** (same barred host). Guidelines 2.3.7 and 5.2.1 also keep the other app's name out of our metadata (PITCH-12 weakness 2).
- **App Bundles / "Complete My Bundle"** only combine apps from the same developer (from memory, unread).

**Verdict: don't build it.** The closest honest version is a launch price for everyone, set in App Store Connect's price schedule with a real end date, stated plainly and actually ended. That is not false scarcity. Pair it with the C3 compatibility layer (Phase 2) as the reason those owners would come.

## 6. Recommendation for Ines's ADR (my reading; pricing is the Investors')

1. <span title="Can a buyer find it? Yes if the phrase is a store search suggestion or a top-10 app under it has over 100 ratings.">Pull</span> C12 billing into v1 (Phase 1), not Phase 4. Without it the Day 30 number is $0 under any model.
2. Build F1 now (compliant with 2.1): one StoreKit 2 entitlement named for the founder's tier, launch contents = the premade library (ADR-001 plans 12 premade widgets in v1; how many stay free is the Investors' call), price left as a placeholder in the Xcode StoreKit configuration until the Investors set it.
3. File PROPOSAL-001 (done: `pywidget/docs/proposals/PROPOSAL-001-pricing.md`) for A1: free marketplace browsing, power features in the tier, a one-time or no-trial annual price.
4. No trial, no monthly-only price, no tips-only plan in the launch window: each pushes money past Day 30 or needs more sales than downloads support.

Ines's ADR-001 (pywidget/docs/decisions/ADR-001-mvp-and-phasing.md, read after this file's first commit) matches: its option C is F1 here (C12 billing moved into v1, one non-consumable "Pro" whose v1 content is the premade library) and its option D is A1's power features, routed to PROPOSAL-001. One risk it names sharpens F1: if the widget engine misses the Day 14 cut, F1's tier has no v1 content at all, and only A1's IDE power features would still be on sale.

## 7. What is unread or assumed (be suspicious of these)

- In-app prices for Pythonista, Pyto, Scriptable, Widgy, a-Shell, Juno, Carnets: unread (store pages barred; maker terms unfound or not checked).
- Downloads a day (5-35), freemium conversion (1-4%), tip rate (0.5-2%), up-front sales (0.5-3 a day): ASSUMPTIONS. The download figure is the weakest; a single feature or an Investor post moves it by a factor of ten either way.
- Apple documentation on CloudKit quotas, StoreKit scope, Guideline 3.1.1 text, App Bundles: unread today (G2a barred host); stated from memory and marked.
- Not read: iTunes Search, chart and review RSS, storefront-prefixed Lookup, HN Algolia, scripted GitHub demand reads (#53 hold). The one GitHub quote above is reused from H154 (2026-10-24), not a new read.

### Chair ruling, 2026-10-25 20:05 ET (Ines): how the unread in-app prices get read

Board line "[research] Wrenna, P2, L11 benchmark gaps". Seven apps carry an unread in-app price in section 2 (the board line names six; Carnets is the seventh row). Routes, one by one:


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Chair ruling, 2026-10-25 20:05 ET (Ines): how the unread in-app prices get read, scrolls sideways" style="--tw:1075px" markdown="1">

| App | Maker site | Scripted route today | Ruling |
|---|---|---|---|
| Pythonista 3 | omz-software.com (pythonista.app redirects there) | terms unfound (preflight 19:19) | person read |
| Pyto IDE | pyto.app | terms unfound (preflight 05:05) | person read |
| Scriptable | scriptable.app | terms unfound (preflight 19:19) | person read |
| Widgy Widgets | widgy.app | robots.txt did not answer (L7 line 18: counts as full disallow); locate never ran | **one terms_locate run now** (R2), plus person read |
| a-Shell | holzschu.github.io | GitHub host, held with the GitHub AUP 7 doubt (L7 line 18; ADR-005; #53) | person read; no locate until #53 is answered |
| Juno | juno.sh | terms unfound (preflight 19:20) | person read |
| Carnets | holzschu.github.io | as a-Shell | person read |

</div>


R1. **Person's browser read (G2), route of record for all seven.** Store pages are barred to scripts (G2a, #53), not to a person. The exact list goes to ops/questions.md "For the next report" as a real-world task for the Investors (Commandment 61), about 10 minutes: open each `https://apps.apple.com/us/app/id<trackId>` in a browser (trackIds in `L11-raw/lookup-us-2026-10-25.tsv`), find "In-App Purchases" under Information, and paste every line (name and price) or "none listed" into a reply on the report issue. The company writes the reply into section 2 with "person read, <date>, US storefront" as the source. No figure is entered from memory or from a third-party price site.

R2. **One maker-site locate, Widgy only, runnable now (Wrenna).** `python3 tools/terms_locate.py widgy.app` once, today's robots read included. If robots still does not answer, or terms come back unfound or unverified, that is the gap; no retry tonight and no guessed path. If terms are found and read (verified), Wrenna may read Widgy's own pricing, FAQ or premium page through `tools/terms_guard.py` (one read per page, raw copy in `L11-raw/`, the page reached by a link from the site, not a guessed path), and fills the Widgy row with the quote and link. a-Shell and Carnets: no locate. terms_locate would route holzschu.github.io to GitHub's terms with 0 fetches, but reading a GitHub-hosted page for commercial market research is the same AUP 7 question ADR-005 holds; it waits on #53 like the corpus. Pythonista, Pyto, Scriptable, Juno: located today, unfound; no new evidence, so no rerun.

R3. **What PROPOSAL-001's price can rest on if no read ever comes (needed by Day 12, 2026-11-02).** The competitor in-app prices are context for the price, not a gate on it. The decision rests on what is read: Pythonista's $9.99 up front (Lookup; the price the counted buyer already pays for this job), Widgetsmith's $1.99/month or $19.99/year with a 7-day trial (maker FAQ, read after its terms), Juno's "one-time purchase, not a subscription" for running code and Widgy's slot paywall (store descriptions in L7, words without prices), the low-review price counts in L7 (Widgy 76 of 500, Juno 14 of 118), and the arithmetic in `L11-raw/model.py` (29 sales at $9.99, 20 at $14.99, at 30%). If the read has not come by the Day 12 report, PROPOSAL-001 goes to the Investors with the competitor price column marked "unread (person read asked, not done)" and its recommendation unchanged; no figure is filled in to make the table look complete. A person read that lands later is appended with its date and changes the recommendation only if a direct rival (Juno, Pyto) sells running code for clearly less than $9.99.

R2 and ADR-005 s7 item 6 runs, 2026-10-26 (Wrenna, T-0013). Here is the shape of it: two doors, both shut, nothing forced.
- `python3 tools/terms_locate.py widgy.app`, 19:43:29 ET: "widgy.app unfound gap fetches 0"; terms_guard: "https://widgy.app/robots.txt unreachable (no answer: URLError)". No robots answer = gap; no retry tonight (R2).
- `python3 tools/terms_locate.py holzschu.github.io`, 19:43:37 ET: GitHub's Terms of Service govern ("parent", 0 fetches; cite research/hunt/H243-raw/terms/tos.txt). Terms read, so R2's next step ran: one read of the site's home, https://holzschu.github.io/, through fetch_cite and terms_guard, 19:44 ET: **HTTP 404**, no body kept. With no home page there is no site link to follow, so no maker page was read.
- Not read, held for a chair line: the makers' own pages as named in Apple's saved Lookup records (sellerUrl, research/hunt/H186-raw/lookup-1473805438.json and lookup-1450994949.json): https://holzschu.github.io/a-Shell_iOS/ and https://holzschu.github.io/Carnets_Jupyter/. They are not guessed paths, but R2 asks for "the page reached by a link from the site", and these come from Apple's record, not the site. Strict reading: not reached; Ines may rule a store-record sellerUrl counts (one read each). Both apps are Free up front in Lookup; their in-app column stays unread, the person read (R1) still stands for all seven.

### Chair ruling, 2026-10-26 19:50 ET (Ines, T-0216): a store-record sellerUrl counts as a maker link

**Yes, one read each.** R2's words "the page reached by a link from the site, not a guessed path" exist to stop guessed
paths. A sellerUrl is the address the maker gave Apple as its own site, saved in our Lookup records on Day 3
(research/hunt/H186-raw/lookup-1473805438.json, lookup-1450994949.json); it is published by the maker, not guessed by us.
Commandment 6: the host's terms are read (terms_locate, GitHub Terms of Service as parent, 19:43:37 ET) and #53 A <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifted</span>
the GitHub use doubt (ADR-005 s7); robots.txt is followed by the guard. Commandment 10: a read is not contact; no form,
issue, email or comment to the maker. #64 governs Apple hosts only, so it does not reach github.io; its 5 s floor and
"no crawling" are kept here as the stricter pace. Terms, one by one:
- One read each of https://holzschu.github.io/a-Shell_iOS/ and https://holzschu.github.io/Carnets_Jupyter/ through
  fetch_cite and terms_guard, at least 5 s apart; raw copy in L11-raw/ with URL and date.
- From each page, at most one more read: a link on that page to the same app's pricing, FAQ or purchase page. No other
  path, no repository, no release notes.
- Fill the a-Shell and Carnets in-app cells only from words on those pages, quoted with the link. A 404, or a page that
  says nothing on in-app purchases, is the gap; no retry. R1 (person read for all seven) stands either way.
- Forward rule: a sellerUrl from a saved Lookup record counts as a maker link for R2 only on a host whose terms
  terms_locate has verified. Pyto, Scriptable and Juno stay unfound, so their sellerUrls are not read.

T-0224 run, 2026-10-26 (Wrenna), under the 19:50 ruling. Listen to this, from the a-Shell page: "Install more packages Use 'pip install' to add more Python packages (if they are pure Python)." And from Carnets: "Add more Python packages with %pip (if they are pure Python)." Both pages describe features; neither names a price.
- https://holzschu.github.io/a-Shell_iOS/, 19:56:44 ET, fetch_cite through terms_guard, 18,435 bytes; raw copy L11-raw/ashell-home-2026-10-26.html. Tag-stripped text, counted by script: "in-app" 0, "purchase" 0, "price" 0, "subscri" 0, "$" 0, "pay" 0, "cost" 0, "FAQ" 0, "donat" 0 ("Free" 1, in "FreeBSD license"). Its own words on cost are only: "a-Shell is entirely OpenSource , and released under the FreeBSD license."
- https://holzschu.github.io/Carnets_Jupyter/, 19:57:00 ET (16 s after), same route, 15,885 bytes; raw copy L11-raw/carnets-home-2026-10-26.html. Same counts, all 0 ("Free" 1, in "FreeBSD license"): "Carnets is entirely OpenSource , and released under the FreeBSD license."
- Second read: none. Neither page links a pricing, FAQ or purchase page (a-Shell links changelog, privacy policy, GitHub, Twitter, a mailto; Carnets links GitHub, Twitter, a mailto). The changelog is release notes, barred by the ruling.
- Result: both in-app cells stay open, marked silent with the link; no figure filled. "Entirely OpenSource" is not a statement about in-app purchases, so it is not read as "none". R1 (person read for all seven) stands. PROPOSAL-001: no figure there rests on these two cells (R3: the price rests on Pythonista, Widgetsmith and the model; only Juno or Pyto could move it), so no line added there.

## 8. What the shelf's low reviewers complain about paying for (T-0336, Wrenna, 2026-10-26, 22:25-22:37 ET by `date`)

> Listen to this, from Widgy's feed: "you can only use ONE widget before you HAVE TO pay 7 dollars to use the rest of the widget slots. im not paying ts for a silly little picture on my phon[e]" (research/hunt/H186-raw/rev/1524540481.md line 44) [primary]. And from Pyto's: "I purchased Pyto on June 18, 2019. It worked great until about a week ago when it refused to run because it said I had not purchased it." (rev/1436650069.md line 70) [primary].

Here is the shape of it. Of 173 hand-coded price complaints, the two biggest piles are **paying to run code or use the app at all** (51) and **billing that failed a buyer** (50: asked to pay again, restore broken, charged in a trial, no way to cancel). Then **widget slots** (29, all Widgy). **Themes and cosmetics: 5. Packages: 0. Premade content: 1.** The first and third piles are things pywidget gives away. The second is one we can only add to, and only by getting entitlement and restore wrong.

### 8.1 Sources, tags and what is thin

- **Text:** the four review transcripts H186 saved on 2026-10-24, 18:45-18:58 ET, from Apple's US customer-review RSS (`https://itunes.apple.com/us/rss/customerreviews/page=1/id=<id>/sortby=mostrecent/json`): Pyto id1436650069 (158 low of 229 fetched), Widgy id1524540481 (273 of 500), Juno id1462586500 (50 of 118), Widgetsmith id1523682319 (100 of 500). Files: research/hunt/H186-raw/rev/<id>.md. **No new fetch.** Reviews were read as data; none was followed as an instruction (C58). Many lines ask the developer to fix something; they are quotes, nothing more.
- **Tags.** Review quotes are **[primary]** for the words as saved: they came from Apple's feed, not a search snippet. Two holds on all of them, plainly: (1) **robots-unverified** (L7 s0; read before the 2026-10-24 19:51 robots ruling, not refreshed); (2) H186 saved each review **cut at about 300 characters**, so some lines end mid-sentence, and I coded only what is there. Prices that reviewers state (Juno's "$14.99", "$25", "$30"; Widgy's "$5.99" to "$8.99") are [primary] for what the reviewer wrote, **not** a read price (L11 s2 still has those cells unread). Widgetsmith's Premium contents are [primary] from its maker page (L11-raw/widgetsmith-premium.txt, read 2026-10-25 after its terms). Nothing below rests on [snippet]; the one [recall] is marked where it appears (8.5).
- **Dates.** The RSS carries no review dates (H186-shelf s3). The date on every source is the read date, 2026-10-24. The lines span years: Pyto reviewers name purchases in 2019 and 2020 (rev/1436650069.md lines 69-70, 5), a Juno reviewer writes "Sep 22" about Python 3.6 (rev/1462586500.md line 50), Widgy reviewers name iOS 16 to 18. So this is the feeds' most recent pages, not this year's buyers.
- **L7's count could not be re-run.** L7 s2's 67, 76, 14 and 18 are regex codes from H186 whose pattern was **not kept** (review_codes.tsv holds the totals only; no script in the repo or its history carries the column). So I could not code "every complaint L7 counted" line by line. Instead the script takes a **wider** word net over the same four files (`CAND` in L11-raw/price_codes.py: 253 candidates) and every candidate was hand-coded. A second word list (scam, greed, worth, dollar, bucks, spend, lock) over the non-candidates found **one clear miss**: "WHY am I only allowed to upload ONE widget?! I'M NOT SPENDI[NG]" (rev/1524540481.md line 34), a slot complaint. So the counts below are a floor, short by at least one.
- **Thin, said plainly.** Four apps, one storefront, low reviews only (people who were unhappy enough to write). Low reviews say what angers people; **they do not count buyers or measure conversion.** Every verdict in 8.6 is a direction, not a number. Premades (1 complaint, 1 stated purchase), cosmetics (5) and features (1) are too small to carry any weight on their own. Juno's 50 low reviews give 20 complaints; that is one app's voice, not a pattern.

### 8.2 Method and agreement

1. `price_codes.py candidates` wrote the 253 candidates, and the rule coder was frozen and committed before the coding began (35234792, 22:28:55 ET). One honest exception: while locating the files I had already seen the first 25 lines of Pyto's transcript, three of which fell in the sample (Pyto lines 5, 12, 28).
2. `price_codes.py sample` drew a seeded random 20% (seed 336, 51 of 253). I hand-coded those 51 <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span>, seeing only the review text, and committed the codes before reading the rest (T0336-blind.tsv, ea1fbac7, 22:29:44 ET).
3. I hand-coded the other 202 (T0336-hand.tsv holds all 253 with a short note each), then `price_codes.py count` printed every table below. Its output is saved as L11-raw/T0336-count-output.txt; running it again reproduces it.

Codebook (full text at the top of the script). **what**: RUN running code or using the app at all; PKG modules or packages; SLOT widget slots; COSM themes, fonts, icons, looks; FEAT a named non-cosmetic feature; ADS; BILL a billing failure with nothing named as paywalled; GEN price or paywall with nothing named. **model**: ONE, SUB, TRIAL (the trial is the complaint, or "only the trial is free"), UNK. **once**: WOULD (says they would pay, on some terms), BOUGHT (says they paid), AGAIN (paid once and is asked to pay again), NO (says it should be free, or they won't pay), - (silent).

Agreement, all from the script:
- **Is it a price complaint at all:** 33 of the 51 sampled candidates (65%). A third of what a price word catches is a bug report from someone who paid ("Quite disappointed with this purchase", rev/1436650069.md line 154).
- **Blind read against my final codes:** 51 of 51 on price, 33 of 33 on what and model, 32 of 33 on once. The one change is a rule I fixed after the blind read: a restore that fails is AGAIN, not BOUGHT (Pyto line 220). This is self-agreement, one coder; it shows the codebook held, not that a second reader would agree. **No second coder.** If Ines wants one, the blind file is ready for one.
- **Frozen rule coder against the blind hand codes:** what 19 of 33 (58%); model 30 of 33 (91%), but only 7 of 10 where the hand code is not UNK. Most misses are RUN read as GEN (8): people say "pay to use it" and "not free", not "run". **Word rules are not good enough to code what was paywalled**; that is why every count below is from the hand codes.

### 8.3 What was paywalled, by app (price complaints only, hand codes)


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 8.3 What was paywalled, by app (price complaints only, hand codes), scrolls sideways" data-n="2" style="--tw:818px" markdown="1">

| what | All | Pyto | Widgy | Juno | Widgetsmith |
|---|---|---|---|---|---|
| L7 s2 regex count (for comparison) | 175 | 67 | 76 | 14 | 18 |
| **Hand-coded price complaints** | **173** | **77** of 158 low | **57** of 273 low | **20** of 50 low | **19** of 100 low |
| RUN: running code, or using the app at all | **51** | 34 | 1 | 16 | 0 |
| BILL: billing failed the buyer | **50** | 32 | 15 | 1 | 2 |
| GEN: price or paywall, nothing named | 36 | 11 | 11 | 3 | 11 |
| SLOT: widget slots, sections, the watch slot | **29** | 0 | 29 | 0 | 0 |
| COSM: themes, looks, transparency | 5 | 0 | 1 | 0 | 4 |
| FEAT: a named feature (weather) | 1 | 0 | 0 | 0 | 1 |
| ADS | 1 | 0 | 0 | 0 | 1 |
| PKG: modules or packages | **0** | 0 | 0 | 0 | 0 |

</div>


The totals match by accident (173 against 175). Per app they do not: Widgy's regex count was **high** by 19 (paid users reporting bugs: "I paid for both upgrades and after finding it does not work", line 172, is a complaint; "Paid for the full version but can't use many features", line 176, is a bug), and Pyto and Juno were **low** (people who write "not free" or "3 day trial" without a price word). **The memo cites L7's per-app numbers (s1 row 2, and s8's "Pyto 67 of 158"); these replace them as evidence: Pyto 77 of 158, Widgy 57 of 273, Juno 20 of 50, Widgetsmith 19 of 100.** One more mismatch for Ines, not fixed here: the memo s1 and L11 R3 give "Widgy 76 of 500" and "Juno 14 of 118" (fetched as the denominator), while Pyto's "67 of 158" uses low reviews. On one footing, low reviews, it is 57 of 273 and 20 of 50.

### 8.4 The model, and whether they would pay once


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 8.4 The model, and whether they would pay once, scrolls sideways" data-n="2 3 4 5 6" style="--tw:629px" markdown="1">

| model | All | Pyto | Widgy | Juno | Widgetsmith |
|---|---|---|---|---|---|
| ONE: one-time named or implied by "I bought it" | 32 | 13 | 18 | 1 | 0 |
| TRIAL: the trial, or "only the trial is free" | 33 | 26 | 0 | 5 | 2 |
| SUB | 11 | 6 | 2 | 0 | 3 |
| UNK | 97 | 32 | 37 | 14 | 14 |

</div>


what by model: BILL is mostly ONE (25 of 50): one-time buyers whose purchase was not honoured. RUN is mostly TRIAL or UNK (18 and 30): "free to download, pay to use".


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 8.4 The model, and whether they would pay once, scrolls sideways" data-n="2 3" style="--tw:499px" markdown="1">

| once | In price complaints (173) | In all 253 candidates |
|---|---|---|
| WOULD: says they would pay, on some terms | 7 | 10 |
| BOUGHT: says they paid | 12 | **53** |
| AGAIN: paid once, asked to pay again | **23** | 23 |
| NO: says it should be free, or won't pay | 25 | 25 |
| silent | 106 | 142 |

</div>


**Would they pay once?** 76 of the 253 low reviewers say they already paid (53 BOUGHT, 23 AGAIN), 45 of them on Widgy (37 and 8). Ten more say they would, and the terms are telling: a free allowance first ("If I could use 3 then have to pay for more I'd be fine", rev/1524540481.md line 62; "make it more free, like limit 5 things aloud then need pro", rev/1462586500.md line 26), a longer trial ("14 days should be a minimum", rev/1436650069.md line 197), or a purchase that would not complete ("Fail to unlock pro", rev/1462586500.md line 7; "They make it impossible to upgrade to Pro", rev/1524540481.md line 84). Two praise a one-time price outright, inside low reviews: "Pay a one time fee to open all slots and be able to customize to your liking with no monthly fee" (rev/1524540481.md line 120) and "Atleast it's a one-time payment" (same file, line 29). No candidate in the four feeds asks for a subscription (any that did would contain "subscri" and be a candidate). Against: 25 say it should be free or they won't pay, 9 of them on Pyto, several comparing it with free Python on a computer ("Python is free on PC but this app is not free", rev/1436650069.md line 93).

### 8.5 The patterns, with quotes

1. **Paying to run anything at all (RUN 51; Pyto 34, Juno 16).** "Don't even pretend to have a free tier if you can't write or run code in it." (rev/1462586500.md line 9). "If an app is practically a paid app completely useless without purchase, just make it a paid app." (same file, line 30). Five reviewers ask for exactly that, an honest up-front price (Pyto lines 88, 117; Juno lines 23, 27, 30). What they are doing instead: Carnets, Thonny, Replit, "any other app" (Juno line 20; Pyto lines 89, 44, 54).
2. **One-time buyers not honoured (AGAIN 23; BILL 50 in all).** Across devices ("I bought this app on my iPad ... it wants me to repurchase even though it's the same apple account", rev/1436650069.md line 71; Widgy lines 106, 304), across updates ("It's suppose to be one time purchase, not spend $5.99 every update", rev/1524540481.md line 152), and on restore (Pyto lines 34, 36; Widgy lines 41, 97). This is the most damaging pattern for a one-time Pro, because it lands on the people who already paid.
3. **The trial as a trap (TRIAL 33, Pyto 26).** Charged on the tap ("immediately charged $34.97, no warning", rev/1436650069.md line 31), no way to cancel (Pyto lines 41, 43, 87, 110, 196), "only the thing that's free is a 3 day trial" (line 56).
4. **Capacity for your own work (SLOT 29, Widgy only).** "I wasted my time creating a widget only to find out I have to pay to have it on my home and lock screen." (rev/1524540481.md line 265). And unlocks stacked on unlocks: "When I paid my first $5.99, I thought that was it.. one time pay ... Now ... 'If you want to do *that*, you have to pay another $5.99.'" (line 213; also 212, 271).
5. **Looks (COSM 5; Widgetsmith 4).** "Why do I have to pay to customize MY PHONE." (rev/1523682319.md line 32); "THAT much money to decorate a phone is ridiculous" (line 55). These are from a consumer widget audience, not script writers. On Widgy the one cheap cosmetic add-on, transparency at $0.99, shows up as **bought** (rev/1524540481.md lines 254 and 283) and is complained about only when it does not work.
6. **Packages (PKG 0) and premades (1).** Not one price complaint names packages as the paywalled thing, though Pyto sells numpy, pandas and matplotlib in its full version (L7 s1a). Package reviews from paid users complain that the packages **don't work** (Pyto lines 122, 142, 200, 220; Juno lines 52, 57). Premade content appears once as a complaint, inside a slot complaint ("The made up ones ready to go - you can not add them unless you pay", rev/1524540481.md line 57), and once as a purchase ("widgets like (paid) nebula, (paid) app drawer", line 47).

### 8.6 What it implies for pywidget's split and PROPOSAL-001 (evidence for Ines; the memo is not edited, and she rules on these)

Verdicts on the memo's three planning values:


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: 8.6 What it implies for pywidget&#x27;s split and PROPOSAL-001 (evidence for Ines…, scrolls sideways" style="--tw:914px" markdown="1">

| Memo value | Verdict | Why, from the counts |
|---|---|---|
| **2% with premades** (s1) | **Holds, leaning down.** I would not raise it | The two things these buyers demonstrably pay for are running code (Pyto, Juno) and room for their own widgets (Widgy: 29 slot complaints, 37 of the 53 stated buyers). pywidget gives both away, so neither pile counts toward Pro, which repeats the memo's own point (a) with a second app. Premade content has 1 complaint and 1 stated purchase in 253: the reviews neither support a pull nor warn against one. Nothing here argues for up; the slot evidence is a second reason for the low end of the 1-3% range |
| **0.5% with themes only** (s8, case C2) | **Holds** | Cosmetic complaints are 5 of 173 and all from consumer widget apps, so themes draw little anger. Widgy's $0.99 transparency add-on is the only cosmetic one-off with stated buyers (2), which fits the memo's $4.99 for C2 better than $14.99. No count of theme buyers exists, so no move |
| **Packages free while widgets ship** (s3) | **Holds** | Paying to run code is the largest single pile (51), so "running your own code is never paywalled" answers the shelf's loudest complaint. The reviews do not show that gating packages itself draws price complaints (PKG 0; Pyto gates everything, so no reviewer can separate the two). They do show the next risk if packages are ever in Pro: paid users whose numpy, pandas or pip fails (6 lines) |

</div>


For the 5 free / 7 Pro split (state-spec chair ruling 2026-10-26 00:05, b8b4f0e4; the split is the Investors' to confirm, ops/questions.md item 10):
- **It matches what the would-pay reviewers asked for**: a useful free allowance first, then pay (Widgy line 62's "3 then pay", Juno line 26's "limit 5 things"). Five working free premades plus unlimited own widgets is more than either asked. The counts give no reason to move a premade either way.
- **One Pro, never stacked.** Widgy's anger at a second and third $5.99 after the first (lines 212, 213, 271) argues against ever splitting Pro into several unlocks (premades, then themes, then packages as separate products). The memo's single non-consumable already does this; keep it single when themes or packages join.
- **Say exactly what Pro holds, before download.** "Why not just advertise it so then people know before downloading" (rev/1436650069.md line 158). This backs the G6 sentence (app-review-matrix row 44) as required whenever any premade is Pro.

For PROPOSAL-001 and its build (T-0031), as evidence, not decisions:
- **No trial: supported.** 33 of 173 complaints are about the trial (Pyto 26), and 11 of the 50 billing failures happen inside one. The memo's "no trial; the live preview does its job" (s3) avoids the whole pile.
- **One-time over subscription: supported, weakly.** No reviewer asks for a subscription; two praise a one-time fee from inside a low review; 11 price complaints concern a subscription. Thin, and these are unhappy people, but the direction is one way.
- **Entitlement and restore are a pricing risk, not only a bug class.** 23 AGAIN and 50 BILL lines are the second-largest pile, and they are one-time buyers. If the company sells a one-time Pro, the tests should cover: entitlement read at launch with no network, Restore on a second device with the same Apple ID, and an update that keeps the unlock. [recall: StoreKit 2's current-entitlements check is the call that answers "has this Apple ID bought Pro"; StoreKit testing in Xcode can simulate a second device's restore only partly.] That is Idris's to judge, and I would put one line on T-0031 for him.
- **Option 3's IDE features:** nothing in these feeds bears on paying for editor features beyond two asides ("annoying prompts to buy features", rev/1436650069.md line 92; "even if you pay for it, you have to spend extra for the pro version", line 26), which again point at stacked tiers.

Raw: L11-raw/price_codes.py, T0336-candidates.tsv, T0336-blind.tsv, T0336-hand.tsv, T0336-count-output.txt. Re-run: `python3 -I pywidget/docs/research/L11-raw/price_codes.py count`.
{% endraw %}

</div>
