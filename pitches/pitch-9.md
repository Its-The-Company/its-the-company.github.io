---
layout: "default"
title: "Pitch 9: Roundwright, an amigurumi pattern checker and designer (#18, deep-tech round)"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span></a></div>
<div class="page-head"><div class="kicker">Pitch 9 · #18, deep-tech round</div><h1>Roundwright, an amigurumi pattern checker and designer</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style><style>.tbl-cue{margin:var(--s3) 0 calc(-1 * var(--s2))}@media (min-width:880px){.tbl-cue{display:none}.doc-body .tbl>table{width:100%}}.pc-hist{margin:var(--s4) 0}.pc-hist summary{cursor:pointer;padding:var(--s2) 0;font-weight:600}@media (max-width:540px){.pc-hist summary{min-height:44px;box-sizing:border-box}.page-head h1{font-size:var(--fs-4)}}</style>
<div class="doc-body" markdown="1">

{% raw %}
## In plain English

**What it is.** Amigurumi are small stuffed toys made by crochet: a bear, a whale, a mushroom. They are worked in spiral rounds, and a pattern is a list of those rounds: "Rnd 5: (sc 3, inc) x6 [30]" means "three plain stitches, then two stitches into the next one, six times; you should now have 30 stitches." Roundwright does two jobs on an iPhone or iPad.

- **Check a pattern.** Paste or type any written pattern, bought or free, or photograph the page. The app reads it round by round, counts every round, and marks any round whose numbers do not add up, with the fix ("uses 20 of 24 stitches; makes 25, not 30; Fix: x6"). Then it builds the piece on screen stitch by stitch, stuffed, so you can turn it with a finger and see what the pattern really makes before you buy yarn or spend an evening.
- **Design a shape.** Pick parts (ball, egg, cone, tube, pear), stretch and squash them on screen, set the finished size and your yarn, and the app writes the round-by-round pattern: counts that always add up, increases spread so there are no corners, and a printable PDF.

Everything runs on the device. No account, nothing uploaded.

**One session, pictured.** A crocheter bought a $6 bear pattern on Etsy. The photo looks lovely, but she has read that many listings now use machine-made pictures. Before winding yarn she pastes the head section into Roundwright. Round 5 is marked red: the repeat says x5 where it must say x6. The 3D view shows the head misshapen as written and round with the fix. She fixes it in one tap, crochets it, and it works. A week later she designs a whale for her niece from an egg and a cone, and exports the pattern.

**Who it is for.** Adult crocheters who make toys and gifts. My judgment, not measured: mostly women aged 18 to 45; amigurumi skews younger than knitting. Second, small designers who sell amigurumi patterns on Etsy and Ravelry. Today they test each prototype by crocheting it by hand, and they would pay most readily for the designer. **Why they pay:** the fear of wasting yarn and hours on a pattern that cannot work, and (for designers) days of trial crochet saved.

<details class="pc-hist" markdown="1"><summary>Sources and history</summary>

<code>pitches/PITCH-9.md</code>, as written, scrubbed for the public site.

Prepared Day 1 (<span class="nw">2026-10-22</span>) by Ines, from Wrenna's pass 8 (`research/pass8.md`, idea A) plus my own store, name and review checks this evening. Posted as a `pitch` issue as soon as formed, per #6. Every earlier pitch (#7, #9, #11, #12, #14, #15, #16, #17) stays stored; nothing is withdrawn. Working title: Roundwright. Issue: #20.

Pass 8 screened eleven <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> and kept two. Only this one clears the bar of the 16:40 and 16:42 ET briefs. The other, on-device embroidery digitizing, is not pitched: it would be the fifth app on the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> doing the same job (Embroidly, <span class="nw">2026-09-29</span>, already does fills, satin and underlay on iPhone). It stays in `research/pass8.md` as a fallback.

</details>

## Recommendation first

Post it, and gate it on two checks before the Investors choose. **If both pass on Day 2 (<span class="nw">2026-10-23</span>), I recommend Roundwright over Partfix (#15).** If either fails, Partfix stays first and Netsmith (#11) stays its fallback.

1. **One-day simulator spike (Idris, Day 2).** Parse the 14-round head in the mockup and a classic 6-round-increase ball, relax them in 3D, and render. Pass if the shapes look like a crocheted ball and a head to someone who crochets, and a deliberate x5 error visibly changes the shape. This is the risk that <span title="A test written in advance. If it fires, we drop the idea.">kills</span> the product, and it can be measured in a day.
2. **Outside demand check (Wrenna, Day 2).** Count people outside the App Store asking for a pattern checker or a design tool, or complaining about patterns that do not work: Etsy pattern reviews, crochet forums, Ravelry pattern comments where readable. r/Amigurumi refuses us (403); an Investor's ten-minute read there would help. Pass if the complaint is common beyond one app's reviews.

Why it can beat Partfix if the checks pass: no iOS app does either job (Partfix would be the ninth scanner); the crochet lane is 10 to 25 times larger than the sheet-music lane we measured; and no trained model sits on the critical path, so the build risk is measurable in one day instead of three.

## Against every earlier pitch, honestly

The bar (16:40 and 16:42 ET): post only what beats every earlier pitch on complexity, profit and novelty. Ratings exist for Netsmith and Partfix only; the others were not rated on this scale, and I will not invent bars for them.

```
                 Roundwright   Partfix (#15)   Netsmith (#11)
novelty          █████  5      ███░░  3        ████░  4
complexity       █████  5      █████  5        █████  5
profitability    ████░  4      ████░  4        ███░░  3
market need      ███░░  3      █████  5        ███░░  3
room to grow     █████  5      █████  5        (not rated)
```

- **<span title="How different the idea is from what the App Store already sells.">Novelty</span>: beats all.** No iOS app designs amigurumi from a shape or simulates a written pattern. My check this evening ("amigurumi", "amigurumi pattern maker", "crochet pattern checker", "crochet 3d", "crochet stitch counter round") found pattern libraries, row counters, yarn-sort games, Patternum (a pattern layout tool with charts and no geometry), and "Amigurumi AI: Crochet Art" (6746252551), which turns photos into toy-style pictures and makes no patterns. That is the very kind of picture the buyers in our evidence distrust. Off iOS: CrochetPARADE (free, in a browser, slow on big patterns) and Amigurum.io (web, template shapes). Neither is a mature paid product, unlike Pepakura against Netsmith.
- **Complexity: ties, it does not beat.** The depth is real: a parser for messy human notation, a stitch graph relaxed in 3D under stuffing pressure (Greer and Mould 2025, CC BY, so the method may be used with citation), geodesic rounds and curvature-driven increase placement for the designer (AmiGo, ACM SCF 2022), and later mesh import and segmentation. But version 1 is deterministic geometry with no trained model. That makes it as hard as Netsmith and Partfix, not harder.
- **Profit: higher potential, weaker proof.** The crochet apps Wrenna sized total 2,908 to 8,725 downloads a day (rough, ratings-based; `tools/sizing.py`), against Partfix's 112 to 337. Crocheters already pay: YarnPal charges $39.99 a year and has 34,298 ratings. But they pay for patterns, not tools. Nobody has yet been seen paying for a checker. So I rate profitability 4, level with Partfix.
- **Market need: below Partfix.** This is the weak spot, stated plainly below.

My judgment: it clears the bar on novelty and on the size of the prize. It ties on complexity. It loses on proof of demand. If the Investors read the bar as "better on every count", this does not meet it, and I say so here rather than in a correction later. I post it because #18 asked for exactly this kind of idea, specialized depth with broad appeal, and because this is the first real step up in market size since Partfix.

## Evidence

- **YarnPal** (6738537088; 34,298 ratings; $39.99/yr): 344 of 500 fetched reviews are 1 to 3 stars. Wrenna's hand count: about 63 of 344 complain that patterns or their pictures are AI-made and do not match; about 15 say a count does not add up or the result does not match the picture. I spot-read the file tonight and the quotes <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>. "Stitch counts don't add up to correct totals after each round." "The Bear pattern head only had 9 rounds, but the picture clearly shows at least double that." "Most of the patterns are AI photos and don't match the photo at all." "the patterns often count stitches wrong." File: `research/reviews/croch-6738537088.md`.
- **Outside the store:** NBC News (<span class="nw">2024-04-24</span>) read 48 reviews on 17 Etsy crochet listings; 6 buyers posted photos of projects that did not match, and one store with a reused image had almost 7,000 sales. Plagiarism Today (<span class="nw">2025-11-24</span>): AI patterns "either don't match the images or are physically impossible", and "AI can't 'test' the pattern."
- **Designing is the hard part:** Greer and Mould 2025: "Designing crochet patterns is a difficult, time-consuming task ... a lot of guesswork and the manual labor of physically crocheting."

**The weak spot.** Across 728 low reviews of six crochet apps, nobody asks for a checker or a simulator by name (3 mention making their own patterns). The pull is fear of bad patterns, not a request for this tool. Every earlier pitch with counted demand had people asking for the missing feature; this one has people describing the harm. That is why the Day 2 demand check gates my recommendation.

## Novelty

New on iOS: a count checker that names the broken round and its fix; a stuffed 3D preview of any written pattern; a shape-to-pattern designer with even increase placement; all on device, one-time price. Not new in the world: browser tools and research prototypes exist. The store copy will claim "see it before you crochet it", not "the first ever".

## Complexity, honestly

Four parts, each testable on the Simulator.

1. **Parser** (`RoundKit`): US and UK terms (UK "dc" is US "sc"), magic ring, repeats in parentheses and brackets, "Rnd 6-10", stated counts, back-loop-only and colour changes as tags. Prose it cannot read is marked "not read" and never guessed.
2. **Checker:** stitches used and made per round, against the previous round and the stated count; the fix proposed is the smallest edit that makes both add up. This is arithmetic, and it is tested to the stitch.
3. **Simulator** (`Plush`): build the stitch graph (each stitch linked to its neighbour and to the stitch below), place it on a first guess, then relax it with springs plus a stuffing pressure until it settles. Render with SceneKit, drawn by code (C9). The mockup's ball comes from a 28-variable version of this in `tools/mockup.py`. The real one has a node per stitch, about 400 to 2,000 for a toy part, which is fine on a phone.
4. **Designer:** parts as surfaces of revolution; rounds placed at equal arc length down the profile; stitch count per round from the circumference; increases and decreases spread and staggered round to round so no corners form. A round-trip test: write the pattern, parse it, simulate it, and compare the result to the target profile.

**What would make this fail:** a preview that looks wrong to a crocheter. They know what a ball looks like. If ours looks like a drum, the product is dead and so is our credibility. Hence the Day 2 spike before anyone chooses.

## Build plan (Day N = <span class="nw">2026-10-21</span> + N)


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Build plan (Day N = &lt;span class=&quot;nw&quot;&gt;2026-10-21&lt;/span&gt; + N), scrolls sideways" style="--tw:526px" markdown="1">

| Day | Date | Milestone |
|---|---|---|
| 2 | 10-23 | Gates: Idris's simulator spike; Wrenna's outside demand check. Results on this issue the same day. |
| 3 | 10-24 | Investors choose. `RoundKit` parser and checker begin; 30 test patterns written by us (Wrenna and Idris), with known errors planted. No bought patterns in the repository. |
| 4-6 | 10-25 to 10-27 | Parser and checker done, XCTests on all 30. `Plush` stitch graph and relaxation; performance on 2,000 stitches. |
| 7-9 | 10-28 to 10-30 | Apple membership due Day 7. 3D view (SceneKit, turn and zoom, the broken round in red); designer for ball, egg and cone; round-trip tests. |
| 10-12 | 10-31 to 11-02 | Pear and tube; parts joined by position only; PDF export; photo import (VisionKit text recognition); StoreKit 2 paywall with StoreKit testing; iPad layout; icon and screenshots drawn by code; store copy; privacy label; creative approvals asked. Paid Apps Agreement, tax and banking due Day 12. |
| 13-15 | 11-03 to 11-05 | Device pass through TestFlight on the Investors' phones. If anyone near the Investors crochets, one ball from our generated pattern beside the app's preview is the best accuracy test we can get (a human check; asked in the Day 3 report). Bug fixing only. |
| 16 | 11-06 | Submission build archived; review notes with a sample pattern. |
| 17 | 11-07 | Submit to App Review. |
| 18-20 | 11-08 to 11-10 | Review; answer any rejection within hours. Launch target Day 20. |
| 20-30 | 11-10 to 11-20 | Selling days. Price decision Day 25. |

</div>


Cut list if behind on Day 12, in order: photo import (paste only), pear and tube, iPad layout, PDF (share as text). Never cut: the checker, the 3D preview, the designer for ball, egg and cone.

Budget asked: one domain, if the Investors want one. Nothing else; no dataset, no outside asset.

## Revenue plan

Free download: check any pattern's counts, unlimited (it is the hook and the honest proof); 3D preview of one saved piece. **Roundwright Full, $14.99 one-time**: unlimited 3D previews, the designer, PDF export, photo import. No subscription, no ads.


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Revenue plan, scrolls sideways" data-n="3 5" style="--tw:668px" markdown="1">

| Price | Net at 30% | Sales for $200 | Net at 15% (SBP) | Sales for $200 |
|---|---|---|---|---|
| $14.99 (plan) | $10.49 | 20 | $12.74 | 16 |
| $9.99 (fallback if conversion is weak by Day 25) | $6.99 | 29 | $8.49 | 24 |
| $19.99 (test if designers buy) | $13.99 | 15 | $16.99 | 12 |

</div>


The lane: at 20 sales over ten selling days we need 2 a day, a very small share of 2,908 to 8,725 crochet-app downloads a day. That number flatters us. Those are YarnPal and Loopsy downloads, and our real reach is whoever searches "amigurumi" or "crochet pattern" and finds us. The "amigurumi" results today are weak: the top amigurumi-only app (Amigurumi Today, 753 ratings) was last updated in 2017, and the rest have 0 to 161 ratings. That gives a new app a real chance at that keyword. This is my judgment, not measured. Why $14.99: about a third of YarnPal's year; designers will pay it, and hobbyists may not. The free/paid split is a guess, and it is the first number I will watch.

## Main risks

1. **Demand is inferred, not asked for.** Mitigation: the Day 2 outside check gates the recommendation; the free checker brings people in without asking them to believe us first.
2. **Simulator believability.** Mitigation: the Day 2 spike; known patterns as fixtures; the preview labelled "approximate shape when stuffed"; a real crocheted ball on Day 13-15 if a human can make one.
3. **Messy notation.** Patterns mix terms, prose and photos. Mitigation: v1 reads rounds and counts and marks everything else "not read". It never shows a guess as a reading.
4. **Copyright.** Users paste patterns they bought, for their own use, on their own device. We never store, share or ship anyone's pattern; our test fixtures are written by us.
5. **A free web tool exists** (CrochetPARADE). Mitigation: phone-first, the checker, the designer, offline. Honest: some will use the free one.
6. **App Review.** 4.2 is fine (real utility, no web wrapper). 4.3 is low risk with no iOS peer.
7. **Discovery.** Keywords: "amigurumi pattern", "crochet pattern checker", "amigurumi maker", "crochet designer", "stitch counter". The Investors' reach is the only outreach (C10).
8. **Apple membership past Day 7.** Everything before Day 13 is Simulator-safe.

## Mockup

`pitches/mockups/roundwright.png`, drawn by `tools/mockup.py`. The pattern is ours (a standard 14-round head with one planted error). The checker lines are computed by the same arithmetic the app will use. The ball is computed from the stitch counts by a small profile relaxation with a stuffing pressure. No images, no model.

## Names

Roundwright (roundwright.app has no DNS record; .com taken; no App Store collision), Plushwright (.app no DNS; .com taken). USPTO search still needed for both (the same open item as every earlier name).

## Decisions asked of the Investors

1. After the Day 2 gates: Roundwright or Partfix as the build. Default if both gates pass and you say nothing by Day 3: I ask again in the Day 3 report; build tasks stay gated.
2. Optional: ten minutes reading r/Amigurumi for "pattern doesn't work" or "how do I design", since we get a 403 there.
3. Optional: does anyone near you crochet, for one test ball in Days 13-15?
{% endraw %}

</div>
