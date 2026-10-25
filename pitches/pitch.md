---
layout: "default"
title: "The Pitch: what we should build"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span></a></div>
<div class="page-head"><div class="kicker">Pitch 1</div><h1>The Pitch: what we should build</h1><p class="lead"><code>pitches/PITCH.md</code>, as written, scrubbed for the public site.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}




Prepared Day 1 (<span class="nw">2026-10-22</span>) by Ines, from Wrenna's three research passes. Posted as the `pitch` issue on Day 2 at the earliest, per Phase 1.

## In plain English (added <span class="nw">2026-10-22</span>, per #10)

**What it is.** Stripwise is an iPhone app that removes the hidden information inside your photos before you send or post them. Every photo a phone takes carries a hidden label: often the exact place it was taken (GPS coordinates), the date and time, the phone model, and sometimes the editing app and the owner's name. Stripwise takes that label off and saves a clean copy. Then it does the thing no competitor does: it reopens the clean file, reads it again, and shows a short before-and-after list, for example "14 tags found, 0 remain, location removed, picture unchanged." It works from the app itself or from the Share button inside Photos, Messages, Facebook, or any other app. Nothing is uploaded and there is no account; all of it happens on the phone.

**One session, pictured.** A seller is listing a dresser on Facebook Marketplace and photographed it in her living room. Before posting, she taps Share, then Stripwise. Two seconds later the receipt says the location and twelve other tags are gone. She posts the clean copy. Her first ten photos are free. On the eleventh, she pays $4.99 once and never sees the meter again.

**Who it is for.** Adults, roughly 20 to 60, who post photos where strangers can see them: marketplace and resale sellers (Facebook Marketplace, eBay, Craigslist, Depop), people renting out or selling a room or a home, people on dating apps, and people who have a reason not to be found, such as someone avoiding an ex. Secondary: journalists, and small businesses posting photos from customers' homes. Why they pay: the paid apps they use today often say "done" while the data is still there, or charge and <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> them (the review evidence in this pitch). $4.99 once, for proof rather than a checkmark, is cheap peace of mind. iOS offers a location switch in some share menus; how far it reaches is a [verify] item for Day 13, and Stripwise's answer is every tag, on every route, with proof. This audience is my judgment from the review themes, not a measured split.

---

**Recommendation first.** Build candidate 1, **Stripwise**, a photo metadata stripper whose headline is a verified receipt: it re-reads the saved file and shows you which tags are gone. One-time unlock at $4.99. Submit to App Review on Day 17 (<span class="nw">2026-11-07</span>). It needs 58 sales to reach $200 net at Apple's 30 percent.

Why now and not after another research pass: the top candidate rests on 151 hand-read one-to-three-star reviews from two competitors, plus a working technical spike. The runners-up are weaker and another pass would not change their order. What we lack is not evidence but days. Submission by Day 17 leaves about ten selling days. Every research day after this one costs a selling day.

What would make this fail: discovery. Ninety-two percent of Utilities are free. Our job is to be found by 58 strangers in ten days with no marketing of our own. The plan below is built around that risk, not around the technology.

---

## Candidate 1: Stripwise (recommended)

Memo: `pitches/stripwise.md`. Mockup: `pitches/mockups/stripwise.png` (drawn by `tools/mockup.py`, no images).

### Evidence of need
- 151 hand-read 1-3 star reviews across Exif Metadata (6.1K ratings) and Photo Investigator (1.4K ratings), coded in `research/reviews/exif-1455197364.md` and `research/reviews/exif-571574618.md`. Leading themes: edits fail, crash, or stopped after an update (25 + 10); "said done, data still there" or not saved (5); paid but nothing unlocked, pay again, or must pay before anything works (9 + 7); ads (12); batch caps (5 + 2); HEIC or quality loss (4 + 4). Sources: [Exif Metadata reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1455197364/sortby=mostrecent/json), [Photo Investigator reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=571574618/sortby=mostrecent/json).
- Quote: "The paid version does not appear to edit metadata on HEIC photos. It does work for jpegs. Basically useless unless you have an old phone." (1 star, Exif Metadata). Quote: "it saves the new image at about twice the original size of the photo. 4mb ends up around 8mb." (3 star, Photo Investigator).
- People pay here: [Exif Viewer](https://apps.apple.com/us/app/exif-viewer-photo-metadata/id1468747693) is $2.99 up front, no IAP, 714 ratings at 4.5. Exif Metadata sells a $19.99 lifetime tier; Photo Investigator sells $2.99 and $4.99 unlocks.
- Our own spike (`spikes/imageio-strip/FINDINGS.md`) reproduced the trust problem from the inside: ImageIO returns success on HEIC while leaving every tag in place. An app that trusts the return value ships exactly the bug the reviews describe.

### The idea, and what is new
Stripwise removes location, time, camera, owner, and editing metadata from photos before you share them. The new part is the receipt. After every strip it reopens the saved file, reads the metadata back, and shows a before-and-after list: fourteen tags found, zero remain, pixel checksum matched. JPEG is stripped without re-encoding (verified byte-identical scan data in the spike). HEIC is re-encoded at high quality, and the app says so and shows the size change rather than hiding it. There is no batch cap, no account, no network access, and no subscription. A Share Extension cleans a photo inside any app's share sheet and hands back the clean copy without leaving a duplicate in the library. No competitor we found shows proof; they show a checkmark.

### Names, checked <span class="nw">2026-10-22</span>
Checks: App Store via the iTunes Search API (US), domains via whois and DNS, trademarks via web search only (a USPTO database search is still needed before the name goes on the store; the USPTO site requires a browser session, which the Investors can run in a minute).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Names, checked &lt;span class=&quot;nw&quot;&gt;2026-10-22&lt;/span&gt;, scrolls sideways" style="--tw:1067px" markdown="1">

| Product name | App Store | .com | .app | Trademark (web search) |
|---|---|---|---|---|
| **Stripwise** (preferred) | no app with this name | registered (no DNS; <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>) | no DNS record; registry whois did not answer | nothing found |
| Barepixel | none | registered (parked, Afternic) | no DNS record | nothing found |
| Nulltag | none | registered | no DNS record | nothing found |

</div>


Company name options, same checks: **Lowtide Software** (lowtidesoftware.com: whois "No match", available; no company found), Smallproof (smallproof.com registered; nothing found), Hedgerow Software (hedgerowsoftware.com registered; an unrelated HEDGESOFT filing exists). Recommendation: Stripwise by Lowtide Software, with stripwise.app as the product domain, pending a registrar check.

### <span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span>
- A tool that does one useful job (Commandment 8). Privacy is not a banned area (7). Nothing leaves the device, so the privacy label is "Data Not Collected" and there is no server, account, or personal data to protect (6).
- Buildable and testable on one M1 Mac mini: ImageIO and PhotoKit run in the Simulator, which ships with sample photos; the Share Extension and StoreKit purchases test in Xcode without App Store Connect, which is what the Apple gate requires until Day 7.
- Icon, screenshots, and the receipt graphic are all drawn by code (9). The mockup already is.
- Scope has a long road: video metadata, PDF and document metadata, a before-you-post checker, a Shortcuts action, Live Photo and RAW handling, a Mac version. Version 1 is small enough for one engineer in twelve days.

### Revenue plan
Free download. The first ten photos are free with the full receipt, so nobody can write "paid and nothing worked" before they have seen it work. After ten, a single non-consumable unlock, **Stripwise Unlimited, $4.99**. No subscription, no ads.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Revenue plan, scrolls sideways" data-n="3 4" style="--tw:609px" markdown="1">

| Price | Net per sale at 30% | Sales for $200 | Per selling day (10 days) |
|---|---|---|---|
| $4.99 (plan) | $3.49 | 58 | 5.8 |
| $3.99 (fallback, switch by Day 25 if under pace) | $2.79 | 72 | 7.2 |

</div>


Why $4.99: it sits under Photo Investigator's combined unlocks and far under Exif Metadata's $19.99 lifetime, and a one-time price is itself an answer to the reviews. Why not paid up front: the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s loudest anger is paying <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span>. Sales expectations are arithmetic, not a forecast; Wrenna's ratings-to-downloads range puts the incumbents at tens of thousands of lifetime downloads, so 58 sales is a discovery problem, not a market-size problem.

### Build plan (Day N = <span class="nw">2026-10-21</span> + N)

<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Build plan (Day N = &lt;span class=&quot;nw&quot;&gt;2026-10-21&lt;/span&gt; + N), scrolls sideways" style="--tw:526px" markdown="1">

| Day | Date | Milestone |
|---|---|---|
| 2 | 10-23 | Pitch posted. Hiring round for one iOS engineer opens (we have none). |
| 3 | 10-24 | Investors choose. Engineer hired. First commit: project, strip engine ported from the spike, unit tests on code-generated fixtures. |
| 4-6 | 10-25 to 10-27 | Engine complete on Simulator: JPEG lossless path, HEIC re-encode path, orientation decision, read-back verifier, receipt model. |
| 7 | 10-28 | Apple membership due. Photo picker, receipt screen, share and save flows. |
| 8-10 | 10-29 to 10-31 | Share Extension, unlimited batch, StoreKit configuration, paywall and ten-photo meter tested with StoreKit testing. |
| 11-12 | 11-01 to 11-02 | Code-drawn icon and screenshots, App Store copy, privacy label; creative approvals requested in reports. Paid Apps Agreement, tax, banking due Day 12. |
| 13-15 | 11-03 to 11-05 | Real-device pass through TestFlight: real iPhone HEIC, portrait orientation, Live Photo and RAW rejected gracefully. Bug fixing only. |
| 16 | 11-06 | Submission candidate archived; release notes and App Review notes. |
| 17 | 11-07 | Submit to App Review. |
| 18-20 | 11-08 to 11-10 | Review; answer any rejection within hours. Launch target Day 20. |
| 20-30 | 11-10 to 11-20 | Selling days. Price fallback decision Day 25. |

</div>


Budget asked: one domain (approved by default). Nothing else.

### Main risks
1. **Discovery in ten days.** Mitigation: the keyword set is narrow and searchable ("remove exif", "strip metadata", "photo location remover"); a press kit and launch note ready for the Investors on Day 16; a free tier that earns ratings early.
2. **Guideline 4.3.** Seven exif removers released since 2025. Mitigation: the receipt is a visible, demonstrable difference; the App Review note says so in one paragraph with a screenshot.
3. **HEIC.** No lossless route exists. Mitigation: we never claim lossless HEIC; we show the size and quality setting. One real iPhone HEIC must be tested before the copy is final (Day 13).
4. **Orientation.** The lossless JPEG path drops the orientation tag. Mitigation: product decision on Day 4; likely re-apply orientation by rotating pixels only when the tag is non-default, and say so in the receipt.
5. **Apple membership slips past Day 7.** Everything before Day 13 is Simulator-safe. A slip past Day 10 pushes submission one day per day lost; the report will say so.
6. **iOS already has a location toggle in the share sheet.** True, and it covers location only; the reviews above are from people who used it and still wanted more. Our copy will say exactly what iOS does and does not remove.

---

## Candidate 2: Tallyproof (runner-up)

Memo: `pitches/tallyproof.md`. Mockup: `pitches/mockups/tallyproof.png`.

**Evidence.** Tally: Counter and Score Tracker (1.1K ratings): 23 of 50 recent reviews are 1-3 stars; 10 are widgets not refreshing, 6 are paywall or subscription anger, one a $30 a year complaint ([reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1412716242/sortby=mostrecent/json), coded in `research/reviews/tally-1412716242.md`). Quote: "A subscription fee to use a tally app." Counter Tally Count has 14K ratings and is free with a $19.99 remove-ads purchase.

**Idea and novelty.** A counter whose widgets never lie silently. Every widget carries the time it last matched the app and turns a visible stale badge when it lags, with a tap to refresh; counters sync through App Groups and a timeline the widget can trust. One-time unlock, no ads.

**Names.** Tallyproof (no App Store app; tallyproof.com registered; .app no DNS; web search found nothing, though "Tally: Proof of Work" exists as an app title), Steadycount (none; .com held by a brand marketplace), Clickstone (none; .com registered).

**Fit.** Pure SwiftUI and WidgetKit, Simulator-testable. Commandments 7 and 8 fine.

**Revenue.** Free with a $2.99 one-time unlock: $2.09 net, 96 sales, about 10 a day. That is the weakness: a low ceiling against a free incumbent with 14K ratings.

**Build plan.** Same shape as candidate 1, submission Day 17.

**Risks.** Guideline 4.3 is the most likely rejection in the App Store's most crowded utility lane; the stale badge is a small difference to defend. Why it is second: the novelty is honest but thin, and 96 sales is harder than 58.

---

## Candidate 3: Beatcount (runner-up)

Memo: `pitches/beatcount.md`. Mockup: `pitches/mockups/beatcount.png`.

**Evidence.** Seven of eleven low store-page reviews across three acoustic timegrapher apps say the readings are inconsistent or wrong (`research/watch-accuracy.md`; [Watch Tuner reviews](https://apps.apple.com/us/app/id991367080?see-all=reviews)). Quote: "A waste of $15. This app give inconsistent readings." People pay: Watch Tuner is $1.99 plus IAP; tickIQ has 804 ratings and paid tiers.

**Idea and novelty.** A timegrapher that shows a confidence score next to every reading, computed from beat count, duration, and noise floor, and greys the numbers out below a threshold with the reason (room noise, phone too far, too few beats). Competitors show a number with no idea how good it is.

**Names.** Beatcount (no App Store app; .com held by a domain marketplace; .app no DNS), Tickproof (none; .com parked), Ticktrust (none; .com registered). Hairspring was considered and is taken by an existing timegrapher app.

**Fit.** Audio capture and FFT on device; Commandments fine. Testable on the Mac from recorded audio, but final tuning needs real watches, which we do not have.

**Revenue.** $4.99 one time, 58 sales, in a hobby lane where $15 has been paid.

**Risks.** Most crowded lane Wrenna checked (8 of 14 top results new since 2025); signal-processing risk we cannot retire without hardware; a confidence score that is wrong is worse than none. Why it is third: we cannot test the core claim before launch.

---

## Recommendation and runners-up

1. **Stripwise.** Recommended. Strongest counted evidence, a technical spike already done, a novelty that is visible in one screenshot, a one-time price that answers the lane's complaints, and a version 1 one engineer can submit by Day 17.
2. **Tallyproof.** Runner-up if the Investors prefer the broadest market. Needs 96 sales and faces a free 14K-rating incumbent.
3. **Beatcount.** Runner-up for a hobby niche with proven willingness to pay. Not recommended for month one because the accuracy claim cannot be tested on our hardware.

Decisions asked of the Investors: the candidate; the product name and company name from the options above; whether to register the domain. The visual identity will come separately for creative approval (<span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>).

Wildcards set aside: a darkroom easel meter (one Hacker News ask, no competitor, untestable in the Simulator), beekeeping logbook (no counted complaints), TV remote (free official app with 6.3M ratings, needs hardware).
{% endraw %}

</div>
