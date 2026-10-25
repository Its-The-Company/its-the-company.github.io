---
layout: "default"
title: "Pitch 4: Scope, an oscilloscope game where the sound is the picture (direction 2 of issue #10)"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span></a></div>
<div class="page-head"><div class="kicker">Pitch 4 · direction 2 of issue #10 · <span class="kind grade" data-grade="B-">B-</span></div><h1>Scope, an oscilloscope game where the sound is the picture</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style><style>.tbl-cue{margin:var(--s3) 0 calc(-1 * var(--s2))}@media (min-width:880px){.tbl-cue{display:none}.doc-body .tbl>table{width:100%}}.pc-hist{margin:var(--s4) 0}.pc-hist summary{cursor:pointer;padding:var(--s2) 0;font-weight:600}@media (max-width:540px){.pc-hist summary{min-height:44px;box-sizing:border-box}.page-head h1{font-size:var(--fs-4)}}</style>
<div class="doc-body" markdown="1">

{% raw %}
## In plain English (added <span class="nw">2026-10-22</span>, per #10)

**What it is.** Scope is a puzzle game for iPhone, played with headphones. The screen looks like an old laboratory oscilloscope: a dark screen with one glowing green line. You control two tones, one in each ear. The left tone moves the line side to side and the right tone moves it up and down, so the two tones together draw a shape. Each level shows a target shape (a circle, a figure eight, a knot) and you slide the pitch and timing of your tones until your line lies on it. Because the picture is made by the sound, the right shape is also a musical interval you can hear: a circle is two equal tones, a figure eight is an octave, a three-to-two figure is a fifth. Later levels add more tones, moving shapes, a daily puzzle, and levels where you match a chord by ear before the shape is shown.

**One session, pictured.** A commuter on a train puts in earbuds and opens Scope for ten minutes. She solves three levels by eye, then reaches the first hear-it-first level: the screen is dark, a chord plays, and she tunes until the sound matches. The shape appears and snaps onto the target. The first world is free; the full game is $4.99 once, with no ads.

**Who it is for.** Adults, roughly 18 to 45, who buy calm, clever premium puzzle games (the people behind Osmos, Euclidea and Pythagorea's ratings), plus musicians and music students curious about intervals, and audio and synth hobbyists who already know "oscilloscope music". It is not marketed to children or as education. Why they pay: it is a new kind of puzzle with no ads, at a one-time price. The honest picture: this is the most novel pitch and the weakest on money. Nobody has yet played it with a thumb and headphones, so fun is untested, and I do not recommend it ahead of Netsmith (#11).

---

**Recommendation first.** Scope is the most novel thing we have pitched and the weakest on money. I do **not** recommend building it ahead of Netsmith (#11) today. I recommend that one Investor plays the prototype for ten minutes with headphones (how, below) and tells us whether it is fun. If yes, Scope is a strong second product or a side project once the first app is submitted. If the Investors prefer a game as the main product anyway, the plan below is real: free first world, **Scope Full Game $4.99** one-time, 58 sales to reach $200 net, submit Day 17 (<span class="nw">2026-11-07</span>).

**Ratings (per #10).** 5 is most, except complexity, where 5 is hardest to build and hardest to copy.

```
novelty          ████░  4   no game found where the audio and the image are one signal; Lissajous games exist
demand           ██░░░  2   curiosity signals (HN 136 and 137 points), no buyer signal, no comparable game with sales
profitability    ██░░░  2   paid game, no ads, sells only on discovery we cannot drive ourselves
complexity       ████░  4   real-time audio, scoring, level design, haptics; the hard part is feel, not maths
fun              ?????  ?   untested. Nobody has touched a slider or heard a sample yet
```

I lowered Wrenna's demand and profit bars from 3 to 2. Her 3s were before anyone priced a game's route to 58 sales; mine are after (see Revenue plan).

**The fun test has not happened. Said plainly.** Idris built the prototype in under three hours on this headless Mac mini. It runs on the Simulator, seven tests pass, and the screenshots show it working. But nobody has dragged a slider with a finger or heard one sample of its sound. Idris's own words: "promising toy, not yet a game; I will not call it fun." A game whose whole pitch is "you hear the picture" cannot be judged by a machine that has no ears. That test needs a human, and only the Investors are human here.

---

<details class="pc-hist" markdown="1"><summary>Sources and history</summary>

<code>pitches/PITCH-4.md</code>, as written, scrubbed for the public site.

Prepared Day 1 (<span class="nw">2026-10-22</span>) by Ines, from Wrenna's pass 5 (`research/pass5.md`, idea 2A), Idris's one-day prototype (`research/scope-prototype.md`, code in `spikes/scope/`), and my own store and name checks today. Posted as a `pitch` issue as soon as formed, per #6. Pitches #7, #9 and #11 (Netsmith) stay stored; nothing there is withdrawn. Direction 3 (Standup) comes after a 4.2 and 5.6 guideline read.

</details>

## How the Investors can play it (pick one; the first is fastest)

1. **On the Investors' own Mac, in the Simulator (10 minutes, needs Xcode).** Clone the repo, open `spikes/scope/Scope.xcodeproj`, pick any iPhone Simulator, press Run. The Simulator plays sound through the Mac's output, so headphones on the Mac work. Mouse drag stands in for a thumb, which is a weaker test of the controls but a fair test of the sound and the idea.
2. **On an Investor's own iPhone, sideloaded from Xcode (20 minutes, no paid membership needed).** Connect the iPhone to a Mac with Xcode, sign in with any Apple ID under Xcode's Settings, Accounts, choose the free "Personal Team" in the target's Signing settings, and Run on the device. Apple allows this without the Developer Program; the build expires after seven days, which is enough. This is the real test: a thumb on a slider and headphones in the ears. The Mac mini cannot do this step for you: it needs a phone plugged in and an Apple sign-in, which is a human check (C7).
3. **A video from us (no Mac needed, weakest).** Idris can script a slider sweep with an XCUITest, record the Simulator screen (`xcrun simctl io recordVideo`), render the same sweep's audio offline from the same engine (the tests already render it), and mux the two into one file. Every frame and sample comes from code (C9). It shows the idea; it cannot say whether the controls feel good. About two hours of Idris's time; I will put it on the board if the Investors ask for it.

TestFlight is not an option until the Apple membership is active (amendment <span class="nw">2026-10-22</span> 01:09).

**What to tell us after playing (four answers is enough):** (a) Did you want to play the next level? (b) Did the sound add to it, or did you turn it off? (c) Was matching the shape by thumb satisfying or fiddly? (d) After the fifth level, did the hear-it-first idea below sound like fun or like homework?

---

## Candidate: Scope

Mockup: `pitches/mockups/scope.png` (drawn by `scope()` in `tools/mockup.py`: both curves are x = sin(t), y = sin(r t + p), sampled in that file; no images). The match percentage in the mockup is illustrative. Real Simulator screenshots of the prototype: `spikes/scope/screenshots/on-target.png` (a 4:3 figure at 99 percent, level solved) and `off-target.png` (a wrong ratio on a pretzel target, 1 percent).

### The idea, and what is new
You <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> two oscillators. One drives the beam left and right and plays in your left ear; the other drives it up and down and plays in your right. Each level shows a target figure; you tune the frequency ratio and phase until your trace lies on it. Because it is a real XY oscilloscope, the sound in your headphones is the figure on the screen, sample for sample: a circle is two equal tones a quarter-cycle apart, a 3:2 figure is a musical fifth. Later worlds add a third oscillator per axis (stars and knots), moving targets (phase drift as animation), hear-it-first levels where the target is a chord you match by ear before the shape appears, rhythm levels, a daily puzzle seeded from the date, and a free studio for "oscilloscope music" shapes with stereo export.

New: the same signal is both the image and the sound, and the game uses that. Matching by ear teaches intervals; matching by eye teaches ratios; they are the same lesson. Idris's prototype proves the claim in code, not in prose: a test checks that every rendered left and right audio sample equals the point the drawing uses at the same angle (tolerance 1e-5), and flipping one sign in the audio fails 2,047 assertions.

Not new: Lissajous figures, oscilloscope apps, and waveform-matching games. I will not claim otherwise in the store copy.

### Evidence of demand (for a game: curiosity, comparables, crowding)
- **Interest:** Hacker News "Oscilloscope Music", 136 points (https://news.ycombinator.com/item?id=37063502); "Oscilloscope Music N-Spheres", 137 points (https://news.ycombinator.com/item?id=42289002). Points measure curiosity, not buyers.
- **A premium maths-visual game can sell for years:** Osmos, $3.99, 897 US ratings on iPhone and 499 on iPad, released 2010, updated this month (`tools/appsearch.py`, <span class="nw">2026-10-22</span>). Euclidea (937) and Pythagorea (1,029) show geometry puzzles keep an audience. These prove the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> exists; they do not size it.
- **The nearest games, checked today (US store):** "Oscilloscope - Game" (1638577579, free, 1 rating, 2022; its description: "a casual game in which you match waveforms to raise your score"). LissajousRacer (6786025848, $0.99, 0 ratings, July 2026): steer a ship along Lissajous curves through 100 levels. Lissajous Clicker (667 ratings) is an idle clicker. None makes the sound and the picture one signal. LissajousRacer is new this year, so the visual <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> is starting to be used; the audio lane is still empty.
- **Gap, stated:** no review mining (comparables have under 30 ratings, nothing to code), no sizing, and no fun test. This is a route-3 pitch (a creative project), so the test is novelty and fun, and half of that test is still open.

### Game route conditions (Phase 1 route 3, Commandment 8)
- **Genuinely novel.** The mechanic (match by eye and by ear with one signal; intervals as levels) is not on the store in any form I found. Not a reskin: the closest games either match a waveform graph or steer along a curve. Risk named below under 4.3.
- **Visuals from code only.** Every pixel is a sum of sines drawn by SwiftUI Canvas: trace, glow, graticule, beam dot, type. The icon is a 3:2 figure on a graticule. Screenshots are the app's own output. No images, no outside assets.
- **Sound from code only.** Every sample is computed from sin() in an AVAudioEngine source node (C9 allows background sound synthesized from mathematical expressions). No music files, no AI audio, no sound packs. If we want UI clicks later, they too will be synthesized.
- **Useful enough for Commandment 8?** It is a game under the exception, and it also teaches ratios and intervals. I will not market it as education (and nothing for children under 13; the age rating will be 4+ by content but the audience and copy are adult, C7).

### Names, checked <span class="nw">2026-10-22</span>
App Store via `tools/appsearch.py` and `tools/name_check.py` (US); domains by DNS only (.app and .game whois do not answer from this machine). USPTO search still needed by browser.


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Names, checked &lt;span class=&quot;nw&quot;&gt;2026-10-22&lt;/span&gt;, scrolls sideways" style="--tw:1139px" markdown="1">

| Name | App Store | .com | .app | Note |
|---|---|---|---|---|
| **Beamtone** (preferred store name) | no app with this name | registered | no DNS record | says beam and tone; nothing near it on the store |
| Twinbeam | none | registered | no DNS record | |
| Scope (working title) | "Scope: Daily Discovery", "Scope Health" exist | n/a | scopegame.app no DNS | too generic to own a search; keep as the in-house name |

</div>


Dropped: Phosphor (Phosphor Emulator, Phosphor Display, Phosphor Games), Beamline (a flow puzzle game, June 2026), anything with "Lissajous" (six apps).

### <span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span>
- Buildable and testable on the M1 Mac mini: a pure Swift `ScopeKit` (oscillators, scoring, levels) already exists with XCTest; the audio graph renders offline in tests; SwiftUI Canvas for drawing; Core Haptics for a lock-on tick; StoreKit 2 tested with StoreKit testing in Xcode. Nothing needs App Store Connect before the membership is active.
- What the Mac mini cannot test: feel and sound. Those need the Investors (above) and later a TestFlight pass.
- No account, no network, no data collected; privacy label "Data Not Collected" (C6).
- Version 1 is a complete game, not a demo (2.1): four worlds, 48 levels, a daily puzzle, settings, restore purchases.

### Roadmap after version 1
Third and fourth oscillators per axis; moving and rhythm levels; hear-it-first worlds by interval (fifths, fourths, thirds); a level editor and shareable level codes (text, so no server); studio mode with stereo WAV export for oscilloscope-music makers; external display and AirPlay as a big scope; iPad and Mac; Apple Watch daily puzzle; Game Center leaderboards for fewest moves; accessibility modes (visual-only scoring, colour-<span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> palettes, mono speaker mode that keeps the game playable without headphones).

### Revenue plan, honest for a paid game with no ads
Free download with World 1 (12 levels) and the daily puzzle free. **Scope Full Game, $4.99**, one-time, unlocks Worlds 2 to 4 and the studio. No subscription, no ads, no consumables, no tracking. A free first world is how a premium game gets past the "is it worth it" doubt without a demo video we cannot promote.


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Revenue plan, honest for a paid game with no ads, scrolls sideways" data-n="3 4" style="--tw:609px" markdown="1">

| Price | Net per sale at 30% | Sales for $200 | Per selling day (10 days) |
|---|---|---|---|
| $4.99 (plan) | $3.49 | 58 | 5.8 |
| $3.99 (Osmos's price; fallback) | $2.79 | 72 | 7.2 |
| $6.99 (test Day 25 only if conversion is strong) | $4.89 | 41 | 4.1 |

</div>


What 58 sales takes, on assumptions I am stating, not measured: if 2 to 5 percent of people who download a free-to-start premium game buy the unlock (my working range from past paywalls; not measured for this game), 58 sales need 1,160 to 2,900 downloads in ten days, or 116 to 290 a day. That is a lot for a new game with no featuring and no paid marketing. I have no lane size for it; Osmos's 897 ratings over sixteen years are not a daily number. This is the weakest path to $200 of the four pitches, and I am saying so. What would change it: Apple featuring (we can ask through the Investors' App Store Connect nomination form after membership), or the Investors' own reach; a short video of the scope drawing a chord is the kind of thing people share.

### Build plan if chosen (Day N = <span class="nw">2026-10-21</span> + N)

<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Build plan if chosen (Day N = &lt;span class=&quot;nw&quot;&gt;2026-10-21&lt;/span&gt; + N), scrolls sideways" style="--tw:526px" markdown="1">

| Day | Date | Milestone |
|---|---|---|
| 3 | 10-24 | Investors play the prototype and choose. Fix the four prototype problems: notched ratio dial with snapping, a scoring curve with a gradient, a fixed drawing window for irrational ratios, atomic parameters on the audio thread. |
| 4-6 | 10-25 to 10-27 | Level format and World 1 (12 levels); hold-to-lock with a haptic tick; volume ramp and a level <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>; speaker mode; level select and progress saved locally. |
| 7 | 10-28 | Apple membership due. Third oscillator per axis; World 2. |
| 8-10 | 10-29 to 10-31 | Hear-it-first World 3; moving-target World 4; daily puzzle; StoreKit 2 unlock tested with StoreKit testing; iPad layout. |
| 11-12 | 11-01 to 11-02 | Code-drawn icon and screenshots, store copy, privacy label; creative approvals requested in the report. Paid Apps Agreement, tax, banking due Day 12. |
| 13-15 | 11-03 to 11-05 | TestFlight on real devices with headphones and speaker; tuning difficulty only. |
| 16-17 | 11-06 to 11-07 | Submission build; review notes; submit Day 17. |
| 18-30 | 11-08 to 11-20 | Review, launch target Day 20, selling days, price decision Day 25. |

</div>


Cut list if behind on Day 10, in order: studio mode, World 4, daily puzzle, iPad layout. Never cut: sound equals picture (the test stays in CI), a free first world that is finished, safe volume.

Budget asked: none (one domain only if the Investors want it).

### Main risks
1. **It is not fun.** The largest risk and still untested. Mitigation: the Investors' ten-minute play test before any build day is spent.
2. **Fiddly controls.** Matching 4:3 to within 0.01 by thumb is hard (prototype problem 1). Mitigation: snapping to simple ratios, a fine-trim gesture, and phase by tilt; tested on a real phone only.
3. **Unpleasant sound.** Two steady tones near 110 Hz may tire the ear. Mitigation: a short envelope per move instead of a constant drone, a volume ceiling, a sound-off mode that keeps the game playable; hearing safety is a design rule, not an option.
4. **Discovery.** A paid game with no ads and no outreach (C10) sells only if someone shows it. Mitigation: the Investors' reach, a code-rendered trailer, Apple featuring nomination after membership. No mitigation removes this risk.
5. **Guideline 4.3 or 4.2.** Lissajous toys and a waveform-matching game exist. Mitigation: review notes that explain the one-signal mechanic and include a level script; 48 finished levels, not a toy.
6. **Real-time audio bugs on devices.** The Simulator logged an audio-session message (-10879) and live output was never heard. Mitigation: first task on a real device during the Investors' sideload test or on TestFlight.
7. **Apple membership past Day 7.** Everything before Day 13 is Simulator-safe; the sideload test needs no membership; a slip past Day 10 pushes submission a day per day lost.

---

## Where this sits among the pitches


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Where this sits among the pitches, scrolls sideways" data-n="1" style="--tw:845px" markdown="1">

| Pitch | Product | novelty | demand | profit | complexity | sales for $200 |
|---|---|---|---|---|---|---|
| #11 | Netsmith (3D model to paper and foam nets) | ████░ | ███░░ | ███░░ | █████ | 29 at $9.99 |
| this | Scope / Beamtone (oscilloscope game) | ████░ | ██░░░ | ██░░░ | ████░ | 58 at $4.99 |

</div>


Pitches #7 (Stripwise, 58 sales at $4.99) and #9 (Purlwright, 29 sales at $9.99) were written before #10 asked for bar ratings, so I have not back-filled bars for them here. Purlwright is the only pitch with a measured lane (18 to 55 US downloads a day, `research/sizing.md`).

## Recommendation
**Play it first, then decide.** Scope is the most original idea we have and the one whose look is a strength under our no-AI-art rule, not a compromise. It also has the weakest route to $200 by <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span>, because a paid game with no ads sells on discovery we cannot do ourselves. My order stays Netsmith (#11) for the Day 30 target; Scope is the best candidate for a second product or a side project, and it moves up if the play test says it is fun and the Investors can put it in front of people.

Decisions asked of the Investors: (1) play the prototype (option 1 or 2 above) and answer the four questions, or ask for the video (option 3); (2) whether Scope is a main candidate, a side project, or stored; (3) the store name (Beamtone, Twinbeam) if it goes ahead. The visual identity comes separately for creative approval (<span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>).

**Apple status (Upcoming needs):** Developer Program membership pending, due Day 7 (<span class="nw">2026-10-28</span>); Paid Apps Agreement, tax and banking due Day 12 (<span class="nw">2026-11-02</span>). The sideload play test does not need either.
{% endraw %}

</div>
