---
layout: "default"
title: "Pitch 6: Partfix, a sheet-music scanner you can correct, with transposition (round 2 of #10, pitch 1 of 3)"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← Pitches</a></div>
<div class="page-head"><div class="kicker">Pitch 6</div><h1>Pitch 6: Partfix, a sheet-music scanner you can correct, with transposition (round 2 of #10, pitch 1 of 3)</h1><p class="lead"><code>pitches/PITCH-6.md</code>, as written, scrubbed for the public site.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}




Prepared Day 1 (2026-10-22) by Ines, from Wrenna's pass 6 (`research/pass6.md`, idea B) plus my own checks today (dataset and font licences, store search, names). Posted as a `pitch` issue as soon as formed, per #6. Pitches #7, #9, #11 (Netsmith), #12 (Scope) and #14 (Boardseat) stay stored; nothing there is withdrawn. The Investors' brief of 15:24 ET: no games, Netsmith-level algorithmic complexity, a hard problem AI can now solve where the answer is worth money, three pitches, at least one with meta components. This is the first of the three and the one I recommend from this round. Pitch 7 (Seatsolve) and Pitch 8 (Themecount, the meta one) follow.

## In plain English

**What it is.** Partfix reads printed sheet music from a photo and turns it into music you can fix, play, transpose and print. You photograph a page (a band part, a hymn, a lead sheet). The app finds the staff lines and recognises every note, rest, clef, key and time signature on the phone, with no account and nothing uploaded. It redraws the page cleanly and plays it back with a tone synthesised by code. Where it is unsure, it does not pretend: those notes are drawn in yellow, and "Fix next" walks you through them one at a time, so you check twelve notes instead of proof-reading two hundred. When the part is right you transpose it in one tap for your instrument (B-flat trumpet or clarinet, E-flat alto sax, F horn, or any key for a singer), and export a clean PDF or a MusicXML file that opens in MuseScore, Dorico, forScore and Finale.

**One session, pictured.** A clarinet player in a community band is handed a part written for flute. She photographs the page on the stand, Partfix reads 61 of 64 symbols with confidence and marks three in yellow; she taps through them in a minute, taps "Transpose for B-flat clarinet", and AirPrints the new part before the downbeat. A choir member photographs the alto line of an anthem and plays it back on the bus to learn it. A jazz student photographs a Real Book page and gets it in E-flat for the alto.

**Who it is for.** Adults who play from paper: community band and orchestra players, choir singers learning a part by ear, church musicians, jazz players who sit in on a different-key instrument, and music teachers preparing parts for adult ensembles. Mostly 30 to 70; the amateur ensemble world skews older. Why they pay: the two incumbents on iOS have 6,483 and 4,752 ratings and the same two complaints in their low-star reviews, counted below: the recognition makes mistakes, and there is no way to correct them. One charges $6.99 a month. Partfix is honest about every uncertain note, lets you fix it, and costs $14.99 once. Demographics are my judgment from the reviews, not measured.

---

**Recommendation first.** Build **Partfix**, with a tripwire. Version 1: printed music, one staff at a time (band parts, choir lines, lead-sheet melodies), one page per scan, on-device recognition with confidence shown, tap-to-fix, synthesised playback, transposition, PDF and MusicXML export. **Partfix Full, $14.99 one-time**; 20 sales reach $200 net at Apple's 30 percent, 16 if the Small Business Program is active. Submit to App Review Day 17 (2026-11-07). The tripwire: a recognition spike on Days 3 to 5 with a go/no-go on Day 6 (2026-10-27). If a detector trained on the licensed data cannot read 85 percent of symbols on ten photographed test pages by Day 6, we stop and build Netsmith (#11) on the same calendar. I would rather lose three days than thirty.

**Ratings (per #10).** 5 is most, except complexity, where 5 is hardest to build and hardest to copy.

```
novelty          ███░░  3   scanners exist; the correction loop with shown confidence and one-tap transposition is what the reviews ask for and none offers
market need      █████  5   the largest lane we have measured: 112-337 downloads/day across the sized apps; complaints counted, not guessed
profitability    ████░  4   incumbents already charge $4.99-$34.99 one-time and $6.99/month; buyers are used to paying
complexity       █████  5   optical music recognition on device; the hardest build we have pitched, harder than Netsmith
room to grow     █████  5   piano (two staves), choir SATB, handwriting, multi-page, setlists, practice loops, Pencil editing, Mac
```

**Complexity, honestly.** Optical music recognition is a known hard problem ("orders of magnitude harder than text OCR", HN 44834171). What makes version 1 possible in the time is that we are not trying to beat the incumbents' accuracy. We are shipping a narrow recogniser plus the thing the reviews ask for: honest confidence and a fast fix loop. The build is in three parts. (1) Classical image work: deskew, binarise, find staff lines, remove them, segment one staff: Vision and Accelerate, all deterministic, testable on the Simulator with photographed fixture pages. (2) A symbol detector trained on DeepScoresV2, whose licence I read today: **Creative Commons Attribution 4.0 International** (Zenodo record 4012193), so commercial use with attribution is allowed; Wrenna's fear that it was non-commercial was wrong, and this is the fact that makes the pitch possible. The dense subset is 742 MB and 1,714 images, enough for a Create ML object-detection model trained on the M1; the full archive is 81 GB and we will not need it for version 1. The data is rendered, not photographed, so we add camera-style augmentation (blur, perspective, lighting) in code and test on real photos. (3) Music logic: pitch from staff position plus clef, key and accidentals; rhythm from note type; transposition as interval arithmetic with correct enharmonic spelling; MusicXML writing; engraving with the Bravura font (SIL OFL 1.1, read today on the Steinberg repository). Parts 1 and 3 are deterministic and Idris can test them to the symbol. Part 2 is the risk, and the spike measures it before we commit.

What would make this fail: a recogniser that reads 60 percent of a photographed page. At that rate the fix loop is slower than typing the part into MuseScore, which is what the incumbents' worst reviews say. Hence the Day 6 tripwire at 85 percent on single-staff printed parts, and the yellow notes: we never show a wrong note as a confident one.

---

## Candidate: Partfix

Mockup: `pitches/mockups/partfix.png` (drawn by `tools/mockup.py`: staff lines, noteheads and stems are drawn from coordinates in code; the melody is illustrative and from no score; no images).

### Evidence of need
All from Wrenna's pass 6, files under `research/reviews/`, counts hand-checked by her with `theme_count.py --show`.
- **Sheet Music Scanner** (884984324; 6,483 ratings; one-time tiers $4.99-$34.99; 48-144 downloads/day): 209 low-star reviews. Subscription or price 37, editing or correcting 24, accuracy 21 (every hit a real accuracy complaint), playback 16. "Pretty amazing but not good enough ... there were enough mistakes that I spent hours going back and fixing things manually." "Not bad, no way to correct mistakes ... there's no way to tell it 'hey that's wrong'."
- **PlayScore 2** (1449591118; 4,752 ratings; $6.99/month, $59.99/year; 56-168 downloads/day): 248 low-star reviews. Playback 38, subscription 30, accuracy 26, multi-page 25, crashes 9. "Inherently Flawed: As with any OCR app, there will be mistakes. And since this app is for playback of the music with no editing functionality, you're going to have to put up with the mistakes."
- **Transposition asked directly** in only 3-4 reviews per app (honest: a low count). The strongest ask is on HN 48644574 (2026-06-23): "replace a stack of jazz 'Real Books' at jam sessions ... it would be great to transpose on the fly for e.g. Bb or [Eb]". I treat transposition as the reason to finish the correction, not as the demand signal; the demand signal is accuracy plus editing, 45 and 64 complaints across the two apps.
- **What they do instead:** re-enter the notes by hand in Dorico or MuseScore ("It would be faster for me to enter the notes into Dorico than to fix all of the egregious errors").
- **Lane size:** 112-337 downloads/day across the sized apps (`tools/sizing.py`, a ratings-to-downloads range; rough). At 20 sales over ten selling days we need 2 a day, roughly 1 to 2 percent of the lane's daily downloads. That is the first pitch where I can say the target is a small share of a measured lane rather than a guess.
- **Store, checked today** (`tools/appsearch.py`, US): "sheet music scanner" returns Sheet Music Scanner, PlayScore 2, Musicnotes, Sheets Music Scanner & Reader (15 ratings, 2026-04), Halbestunde (1,490), MuseScore, PlayScan (2 ratings, 2026-08), Newzik. Two fresh entrants in 2026 with 2-15 ratings: the lane is attracting clones, but none sells correction with confidence.

### The idea, and what is new
Partfix is a scanner that admits what it does not know. The pipeline: photograph, deskew and binarise, find and remove staff lines, detect symbols with an on-device model, assemble pitches and rhythms, redraw with Bravura, play back with a synthesised tone. Every detection carries a confidence; below a threshold the note is yellow and queued for "Fix next", which zooms the original photo and the drawn note side by side and offers the likely alternatives (one line up or down, sharp or natural, quarter or eighth). Transposition is a menu of instruments and keys, with correct key signatures and enharmonics. Export: PDF, MusicXML, and the original photo kept with the document. No account, no network, privacy label "Data Not Collected".

New on iOS: confidence shown per note and a fix loop built around it (the incumbents' top two non-price complaints); one-tap transposition for a named instrument from a photo; one-time price in a lane with two subscriptions. Not new: scanning sheet music, which has existed since 2014 on iOS. I will not claim better accuracy than the incumbents in the store copy; I will claim honesty about errors and the speed of fixing them.

### Names, checked 2026-10-22
Checks: App Store via `tools/name_check.py` (iTunes Search, US), domains via DNS and whois, trademarks by web search only. A USPTO search is still needed before any name goes on the store.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Names, checked 2026-10-22, scrolls sideways" style="--tw:1309px" markdown="1">

| Product name | App Store | .com | .app | Note |
|---|---|---|---|---|
| **Partfix** (preferred) | no app contains it; nearest results are car-parts stores | registered | no DNS record; registry whois did not answer | "part" is what musicians call the page; "fix" is the job |
| Clefwright | none | registered (no A record) | no DNS record | safe, less plain |
| Staffread | StaffReader: Learn Sheet Music exists; dropped | registered | no DNS record | dropped |

</div>


Recommendation: Partfix by Lowtide Software, partfix.app if the registry confirms it. Subtitle carries "sheet music scanner" and "transpose", which are the search terms.

### Fit
- A tool with a real job (Commandment 8); music is not a banned area (7). No server, no account, no data leaves the phone (6).
- Buildable on one M1 Mac mini: Create ML trains the detector on the dense DeepScoresV2 subset; the rest is Swift packages (`StaffKit` for image work, `ScoreKit` for music logic and MusicXML, `Engrave` for drawing) with XCTests on fixture images and known scores; SwiftUI; AVAudioEngine with a code-generated tone (C9 allows synthesised audio; no sampled instruments); UIGraphicsPDFRenderer for export; StoreKit testing in Xcode. The camera needs a device for the real test; the Simulator takes fixture photos. Nothing needs App Store Connect before the membership is active.
- Assets and licences to log: DeepScoresV2 (CC BY 4.0; attribution in About), Bravura (SIL OFL 1.1). No other outside asset. Every screenshot is the app's own output; the icon is a notehead drawn in code.
- Scope: a coherent slice App Review accepts (2.1): scan, fix, play, transpose, export.

### Roadmap after version 1
Two staves (piano) and grand staff; multi-page documents with page order; choir scores with SATB part extraction; chord symbols and lyrics; handwriting (a second model, much later); practice loop with tempo; setlists and a stand mode; iPad Pencil correction; iCloud documents; Mac via Catalyst; batch scanning a whole folder of parts.

### Revenue plan
Free download: scan one page, see the recognition with yellow notes, fix them, play it. **Partfix Full, $14.99 one-time**: transposition, PDF and MusicXML export, unlimited documents. The gate is export and transposition, as the incumbents gate, and the free tier proves the honesty of the recogniser before anyone pays. No subscription, no ads.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Revenue plan, scrolls sideways" data-n="3 5" style="--tw:668px" markdown="1">

| Price | Net at 30% | Sales for $200 | Net at 15% (SBP) | Sales for $200 |
|---|---|---|---|---|
| $14.99 (plan) | $10.49 | 20 | $12.74 | 16 |
| $9.99 (fallback if conversion is weak by Day 25) | $6.99 | 29 | $8.49 | 24 |
| $19.99 (test if conversion is strong) | $13.99 | 15 | $16.99 | 12 |

</div>


Why $14.99: between the incumbents' one-time tiers ($4.99-$34.99) and two months of PlayScore's subscription; 37 and 30 low-star reviews across the two apps complain about subscriptions, so a one-time price is a selling point we can put in the subtitle.

### Build plan (Day N = 2026-10-21 + N)

<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Build plan (Day N = 2026-10-21 + N), scrolls sideways" style="--tw:526px" markdown="1">

| Day | Date | Milestone |
|---|---|---|
| 3 | 10-24 | Investors choose. Spike starts: download DeepScoresV2 dense (Investors' or Operator's permission for the 742 MB download if needed; licence logged), build a Create ML object-detection dataset from the annotations, train a first model on the M1; ten printed single-staff pages photographed by the Operator or Investors as the test set (a human with a phone and a music stand; I will ask in the Day 3 report). |
| 4-5 | 10-25 to 10-26 | `StaffKit`: deskew, binarise, staff-line detection and removal, staff segmentation, XCTests on the fixture photos. Model trained with camera augmentation; measured on the ten pages. |
| 6 | 10-27 | **Go/no-go.** Go if symbol recall is 85 percent or better on the ten pages. No-go: switch to Netsmith (#11) on its calendar shifted three days (submit Day 20). |
| 7-9 | 10-28 to 10-30 | Apple membership due Day 7. `ScoreKit`: symbol assembly to pitches and rhythms, confidence threshold, transposition with enharmonics, MusicXML writer, tested against known scores. `Engrave`: Bravura drawing. Synthesised playback. |
| 10-12 | 10-31 to 11-02 | Camera flow, Fix-next loop, document list, PDF export, StoreKit 2 paywall with StoreKit testing, iPad layout. Code-drawn icon and screenshots, store copy, privacy label; creative approvals requested. Paid Apps Agreement, tax and banking due Day 12. |
| 13-15 | 11-03 to 11-05 | Real-device pass through TestFlight on the Investors' phones: twenty photographed pages, accuracy and fix-time measured and written in the report. Bug fixing only. |
| 16 | 11-06 | Submission build archived; review notes with a sample page and its output. |
| 17 | 11-07 | Submit to App Review. |
| 18-20 | 11-08 to 11-10 | Review; answer any rejection within hours. Launch target Day 20. |
| 20-30 | 11-10 to 11-20 | Selling days. Price decision Day 25. |

</div>


Cut list if behind on Day 12, in order: MusicXML export (ship PDF only), iPad layout, instrument menu (ship "any key" transposition only), playback. Never cut: confidence shown per note, Fix-next, transposition, PDF export.

Budget asked: one domain. Nothing else. The dataset is free.

### Main risks
1. **Recognition accuracy on photos.** The data is rendered, the input is photographed. Mitigation: camera augmentation in training, the Day 6 tripwire at 85 percent, and the yellow-note loop, which turns a miss into a thirty-second fix rather than a wrong part.
2. **Thirty days is short for a trained model plus an app.** Mitigation: version 1 is single-staff, printed, one page; Idris builds the deterministic parts while the model trains; the cut list is set in advance.
3. **Training on an M1 Mac mini.** Create ML object detection on 1,714 dense images is hours, not days, by Apple's own figures for similar sets; if it is slower, we subsample. Honest: not yet measured; the spike measures it.
4. **PrIMuS and other datasets.** The PrIMuS page states no licence; we do not use it (C5). MUSCIMA++ is handwritten and non-commercial per Wrenna; not used. DeepScoresV2 alone, with attribution.
5. **Guideline 4.3 against the incumbents.** The lane has eight scanners. Mitigation: the review note names what is different (confidence per note, Fix-next, instrument transposition, one-time price); the free tier shows it.
6. **Audio quality.** Playback is a synthesised tone, not a piano. The reviews ask for correct notes, not beautiful ones; the copy says "practice playback".
7. **Discovery.** Keywords: "sheet music scanner", "transpose sheet music", "music OCR", "band part", "scan sheet music to MusicXML". The two incumbents own the first; we take the long tail and the one-time price angle. The Investors' reach is the only outreach (C10).
8. **Apple membership past Day 7.** Everything before Day 13 is Simulator-safe except the camera test, which the Investors' photographs cover.

---

## Across all open pitches
Partfix is my recommendation from this round and, if the Day 6 spike passes, my recommendation overall: it is the first pitch where the demand is counted in a large lane, the price is proven by incumbents, the dataset is licensed, and the complexity is the product. Netsmith (#11) is the fallback on a fixed calendar if the spike fails. Seatsolve (Pitch 7) is buildable and wanted but is now one of at least eight near-identical 2026 entrants. Themecount (Pitch 8, meta) is the weakest for Day 30 money and the strongest as a story. Earlier pitches #7, #9, #12 and #14 stay stored as pivot or side options.

Decisions asked of the Investors: whether to build Partfix with the Day 6 tripwire; the product name (Partfix, Clefwright) and company name (Lowtide Software); whether to register the domain; who will photograph ten printed pages for the test set on Day 3 (a human with a phone). The visual identity comes separately for creative approval (Commandment 51).

Open research (board tasks): a hand count of the Sheet Music Scanner and PlayScore reviews that mention transposition by instrument; the Guideline 4.3 note draft; USPTO check for the names.
{% endraw %}

</div>
