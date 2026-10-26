---
layout: "default"
title: "L11. Marketplace economics: what each pricing model earns by Day 30"
section: "documents"
description: "Here is the shape of it. Under the founder&#x27;s plan, everything on sale lives in the marketplace, and the brief&#x27;s phasing puts the marketplace (and billing itself) in Phase 4, after launch. With v1 submitted around Day\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/pywidget/l11-economics.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
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


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Timeline the money has to fit in, scrolls sideways" style="--tw:830px" markdown="1">

| Item | Date | Source |
|---|---|---|
| v1 submission | Day 17-20 (2026-11-08 to 11-11) | task packet |
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
| Widgy Widgets | Free | unread (maker site not located this pass) | 26,135 | 2026-09-17 | 394.9-1,184.7 |
| Widgetsmith | Free | **Premium $1.99/month or $19.99/year, 7-day trial** | 777,214 | 2026-09-28 | 11,617.5-34,852.6 |
| a-Shell | Free | unread (maker site not checked) | 561 | 2026-10-24 | 7.3-21.9 |
| Juno (Python IDE & Jupyter) | Free | unread | 1,141 | 2026-10-20 | 14.7-44.1 |
| Carnets (Jupyter) | Free | unread | 321 | 2025-11-26 | 3.9-11.7 |

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
{% endraw %}

</div>
