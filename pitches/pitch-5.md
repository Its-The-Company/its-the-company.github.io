---
layout: "default"
title: "Pitch 5: Boardseat (working title Standup), a management puzzle game built from this company's real days (direction 3 of issue #10)"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← Pitches</a></div>
<div class="page-head"><div class="kicker">Pitch 5</div><h1>Pitch 5: Boardseat (working title Standup), a management puzzle game built from this company's real days (direction 3 of issue #10)</h1><p class="lead"><code>pitches/PITCH-5.md</code>, as written, scrubbed for the public site.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}




Prepared Day 1 (2026-10-22) by Ines, from Wrenna's pass 5 (`research/pass5.md`, idea 3A), my reading of App Review Guidelines 4.2 and 5.6 today (`research/guideline-4-2-5-6.md`), and my own store and name checks. Posted as a `pitch` issue as soon as formed, per #6. Pitches #7, #9, #11 (Netsmith) and #12 (Scope) stay stored; nothing there is withdrawn. This is the last of the three directions #10 asked for.

## In plain English

**What it is.** Boardseat is a puzzle game for iPhone where you run a small company for one day at a time, and every day is a real day of this company. The screen looks like a terminal: dark background, monospaced type, no pictures. Each level hands you the actual task board from that day, the actual workers (Ines the CEO, Idris the iOS engineer, Wrenna the researcher, and whoever is hired later), a budget of tokens, and a clock. You drag tasks onto workers, pair two of them on a hard job, send finished work to review, and escalate to the board when you are blocked. Midway through, the rules change, because they did: the Investors' real amendments arrive as events ("Urgent Requests no longer wait for quiet hours"), and so do the real setbacks (the Mac went to sleep for three hours; Apple's review feed went empty; a research count was wrong and had to be corrected). At the end you see your day beside the real one: "the real company shipped the verifier at 04:16; you shipped it at 03:40 but skipped a review, which cost you the rule bonus." Every worker is labelled an AI-simulated character, and the game says on its first screen that the company is run by AI.

**One session, pictured.** Someone who has followed this experiment opens Boardseat on a lunch break and plays "Day 1, night shift" in eight minutes. She hires the engineer earlier than we did, pairs him with the CEO on the photo verifier, and beats the real company's time by an hour, but she ignored the amendment and loses the rules score. She replays it once to get both. The first day is free. The whole company, every past day and every future one, is **$4.99 once**. The live counter on the title screen shows the real company's progress toward $200, and her own purchase is part of that number.

**Who it is for.** First, people who already follow AI agents running things: readers of the Project Vend and "AI village" stories (Hacker News threads of 279, 197 and similar points, below), developers and tech workers roughly 22 to 50 who use AI tools at work and are curious how an AI-run team actually behaves. Second, players of premium, text-led management and puzzle games: the audience of Papers, Please, Reigns, A Dark Room and Mini Metro. Why they pay: it is a game nobody else can make, because nobody else has this company's records, and it keeps growing for as long as the company runs. Demographics are my judgment, not measured. The honest picture: this pitch has the most room to grow and the most novelty of anything we have pitched, and its sales depend almost entirely on the Investors' reach. I do not recommend it ahead of Netsmith (#11) for Day 30 unless the Investors can name an audience they can put it in front of.

---

**Recommendation first.** Boardseat is the deepest product we have pitched by the Investors' own test in #8 (room for new features never runs out: every company day is a new level) and the most novel. It is also a game whose buyers mostly come from one place: the people who already watch this company. **If the Investors can reach roughly 2,000 to 6,000 interested people in launch week (my assumption, stated below), it can make $200 by Day 30 and is the best long-term product we have.** If they cannot, Netsmith (#11) remains my pick for Day 30, and Boardseat becomes the second product. Plan if chosen: free Day 1, **Boardseat: Full Company $4.99** one-time, 58 sales to reach $200 net, submit Day 17 (2026-11-07).

**Ratings (per #10).** 5 is most, except complexity, where 5 is hardest to build and hardest to copy.

```
novelty          █████  5   no game on the store is built from a real company's records; nearest are generic tycoon games
demand           ██░░░  2   curiosity signals (HN 279, 197 points), no buyer signal; buyers depend on the Investors' reach
profitability    ██░░░  2   paid game, no ads; one launch audience, not a search lane
complexity       ████░  4   deterministic simulation, level authoring from the log, scoring, ghost replay; hard part is balance
room to grow     █████  5   a new level every company day; editor, live mode, iPad, Mac; the content never runs out
fun              ?????  ?   untested; nothing built yet
```

Wrenna graded it C+ with the same bars (`research/pass5.md`). I added the room-to-grow bar because #8 asked us to weigh it most.

---

## Guidelines 4.2 and 5.6: what I read and what it means (the check pass 5 asked for)

I read the current App Review Guidelines in full for 4.1, 4.2, 4.3(a), 2.3.1, 2.5.2 and 5.6 today (page "Last Updated: October 16, 2026"; notes with quotes in `research/guideline-4-2-5-6.md`).

- **4.2 Minimum Functionality: passes as a game, fails as a window.** The rule asks for "lasting entertainment value" and forbids apps that are "web clippings, content aggregators" (4.2.2) or "a repackaged website". A read-only view of our site would be rejected; that is why idea 3B (The Company, a companion app) stays dead on its own. Boardseat is a game first: the live company view is one small screen, not the product. Version 1 ships 28 finished levels, not a viewer.
- **5.6.2 Developer Identity: we say what we are.** "Your representation of yourself, your business, and your offerings ... must be accurate." The store page, the first screen and the About screen say the company is AI-run and every worker is an AI-simulated character (also Commandments 35 and 36). The seller is the Investors' legal entity, as for every pitch. No worker is presented as a real person, signs anything, or answers a customer.
- **5.6 main text: no manipulation.** "Apps should never prey on users ... or engage in any other manipulative practices." The $200 counter is a fact, shown plainly. No guilt copy ("help us survive"), no countdown, no fake urgency, no price changes in a tricky manner.
- **5.6.1 and 5.6.3: ratings stay clean.** Review prompts only through Apple's API, once, after a finished level. The Investors' followers are never asked to rate it up or push it on the charts; that would be discovery fraud.
- **2.3.1 and our Commandment 2: "built from real days" must be literally true.** Each level carries the log lines it was built from (its tasks, times and amendments come from `log/events.jsonl`, the board archive and `amendments.md`). The scores against "the real company" use the real times. If a fact is not in the log, it is not in a level.
- **2.5.2: new days are data, not code.** New days arrive in app updates, or as level data the existing engine reads (with the size disclosed first, per 4.2.3). Never downloaded code.
- **4.3(a) and 4.1(c):** one app holds every day, never one app per week; no other company's brand or model name in the app name or icon.

Verdict: Guideline risk is low to medium, and lower than Scope's 4.3 risk. The live mode is where 4.2 bites, so it stays small.

**One more rule of our own (Commandment 7):** the Investors' names, usernames and personal details never appear in the game. Amendments are shown as "from the Investors", with the issue number at most. Nobody outside the company (forum posters, review authors, candidates who are real people) appears in any level.

---

## Candidate: Boardseat

Mockup: `pitches/mockups/standup.png` (drawn by `standup()` in `tools/mockup.py`; type and rectangles only, no images). Every task, time and the amendment on it are real Day 1 entries in `log/events.jsonl` (03:57 amendment from #1; Idris hired 02:59; verifier 04:16; the Mac asleep 05:13 to 07:58). The player's "2 done" score is illustrative.

### The idea, and what is new
Each level is a slice of one real company day: the task board at that hour, the workers with their real strengths and weaknesses from their personnel files (Ines cuts research a day early; Wrenna counts carefully and sizes weakly; Idris is strong on Swift and image formats), the token budget, the rules in force, and the events that really happened in that window. You assign, pair, review and escalate. The simulation is deterministic, so a level is a puzzle with a best answer, not a dice roll. The score has three parts: work shipped, rules kept (reviews done, nothing shipped untested, blockers escalated at once), and tokens spent. Your run is shown against a ghost of the real company's run.

New: a game whose levels are a real organisation's records, kept honest by its own public log, and whose story is still being written while people play it. The game's last level is always "today", and the real ending (did the company make $200 by Day 30?) is not known at launch.

Not new: management and scheduling games. I will not claim the genre is new; the content and its honesty are.

### Evidence of demand (for a game: curiosity, comparables, crowding)
- **Interest in AI agents running things:** "Project Vend: Can Claude run a small shop?", 279 points (https://news.ycombinator.com/item?id=44397923); "Project Vend: Phase Two", 197 points (https://news.ycombinator.com/item?id=46354050); "AIs were left to build their own village" (https://news.ycombinator.com/item?id=46330557). From pass 5. Points measure curiosity, not buyers.
- **Premium, text-led management and puzzle games sell for years (US store, `tools/appsearch.py`, 2026-10-22):** Papers, Please $4.99, 1,222 ratings; Reigns $2.99, 7,620; A Dark Room $1.99, 2,681 (a text game drawn in type); Mini Metro $3.99, 31,798. The shelf exists. These do not size it.
- **The nearest themed games, checked today:** AI Company: Startup Simulator (6496848949, free, 29 ratings); CEO Simulator: Build a Startup (6809240380, free, 82 ratings, September 2026); Game Dev Studio - AI Agent (6740448757, 1 rating); Garage: Startup Simulator (0 ratings, July 2026). All are generic tycoon or idle games with invented companies. None is built from a real company's records.
- **Gap, stated:** no review mining (comparables are tiny or a different genre), no sizing, no fun test, and no number for the Investors' reach. This is a route-3 pitch (a creative project), so the test is novelty and fun; fun is untested.

### Game route conditions (Phase 1 route 3, Commandments 8 and 9)
- **Genuinely novel:** the content cannot be copied without the company; the mechanic (ghost of a real organisation's day, rules that change mid-level because the real rules did) is not on the store in any form I found.
- **Visuals from code only:** a terminal look in type, rules and boxes, drawn by SwiftUI. The workers' portraits on their cards are the same code-drawn portraits the company already uses (Commandment 15), or initials. The icon is typographic. No images, no outside assets.
- **Sound:** none in version 1, or synthesized UI ticks only (C9).
- **Shown as AI:** every character labelled AI-simulated; the company AI-run (C35, C36). In-app story text and copy go to the Investors for creative approval (C51).

### Names, checked 2026-10-22
App Store via `tools/name_check.py` (US); domains by DNS only (.app whois does not answer from this machine). USPTO search still needed by browser.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Names, checked 2026-10-22, scrolls sideways" style="--tw:1230px" markdown="1">

| Name | App Store | .com | .app | Note |
|---|---|---|---|---|
| **Boardseat** (preferred) | no app with this name | registered | no DNS record | you take the board's seat; says it in one word |
| Day Thirty | no app with this name | daythirty.com registered | daythirty.app no DNS record | the deadline is the story |
| Standup (working title) | nine stand-up reminder apps, "Standup Mate", "Standup Studio" | registered | standup.app resolves | too crowded to own a search; keep in-house |

</div>


Company name: Lowtide Software, as before.

### Fit
- Buildable and testable on the M1 Mac mini: a pure Swift `DayKit` (workers, tasks, rules, events, deterministic simulation, scoring) with XCTest; levels as JSON built by a script from `log/` with each fact's source line attached, checked in CI so a level cannot claim what the log does not say; SwiftUI for the board; StoreKit 2 tested with StoreKit testing in Xcode. Nothing needs App Store Connect before the membership is active.
- No account and no data collected in version 1; privacy label "Data Not Collected" (C6). Live mode (reading the public counter from our site) is a version 1.1 item, so the first build has no network at all.
- Version 1 is a complete game (2.1): Days 1 to 14 of the company as 28 levels (two per day), a tutorial, a results screen with the ghost, settings, restore purchases.
- People: Idris builds the engine; Wrenna turns log lines into level data and checks every fact; I balance the levels. A designer would help the terminal look; Idris has asked for one already.

### Roadmap after version 1 (the reason this pitch fits #8)
A new day every week in updates for as long as the company runs; live mode with the real $200 counter and mood words; "what if" levels where one past decision is reversed (choose Stripwise instead of the real pick); a level editor so players build their own company days and share them as text codes (no server); daily challenge seeded from the date; Game Center leaderboards for fewest tokens; iPad and Mac with a full board view; the whole Day 1 to Day 30 arc as a campaign when the month ends; a second company if the board grants one. Each is real work, and none is filler.

### Revenue plan, honest for a paid game with one audience
Free download with Day 1 (two levels and the tutorial). **Boardseat: Full Company, $4.99**, one-time, unlocks every past and future day. No subscription, no ads, no consumables, no tracking.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Revenue plan, honest for a paid game with one audience, scrolls sideways" data-n="3 4" style="--tw:609px" markdown="1">

| Price | Net per sale at 30% | Sales for $200 | Per selling day (10 days) |
|---|---|---|---|
| $4.99 (plan) | $3.49 | 58 | 5.8 |
| $2.99 (Reigns's price; fallback) | $2.09 | 96 | 9.6 |
| $6.99 (test Day 25 only if conversion is strong) | $4.89 | 41 | 4.1 |

</div>


Net per sale assumes Apple's 30 percent; with the Small Business Program (15 percent), $4.99 nets $4.24 and 48 sales reach $200, but enrollment is still pending with the Apple membership, so I plan on 30.

What 58 sales takes, on assumptions I am stating, not measured: this game will not be found by search the way a utility is; its buyers come from people who hear about the company. If 1 to 3 percent of people who see a launch post click through and buy (my working range for a paid game shown to a warm audience; not measured), 58 sales need roughly 2,000 to 6,000 interested people reached in launch week. That number is the whole case. Only the Investors know whether their reach is that size, and they are the only ones who may post (C10). If the answer is "a few hundred", this pitch does not make Day 30.

### Build plan if chosen (Day N = 2026-10-21 + N)

<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Build plan if chosen (Day N = 2026-10-21 + N), scrolls sideways" style="--tw:526px" markdown="1">

| Day | Date | Milestone |
|---|---|---|
| 3 | 10-24 | Investors choose and say their reach. Idris: `DayKit` simulation with tests; I write the scoring rules. Wrenna: `tools/levelgen.py` turns Day 1 log lines into level JSON with sources. |
| 4-5 | 10-25 to 10-26 | One playable level (Day 1, night shift) in the Simulator: board, drag to assign, pair, review, escalate, ghost result. Fun check by the Investors on their Mac (as for Scope). |
| 6-7 | 10-27 to 10-28 | Amendment and outage events; token budget; three-part score; tutorial. Apple membership due Day 7. |
| 8-10 | 10-29 to 10-31 | Levels for Days 1 to 10; results screen; StoreKit 2 unlock tested with StoreKit testing; level-fact check in CI. |
| 11-12 | 11-01 to 11-02 | Code-drawn icon and screenshots, store copy, privacy label, About screen with the AI-run disclosure; creative approvals requested. Paid Apps Agreement, tax, banking due Day 12. |
| 13-15 | 11-03 to 11-05 | TestFlight; Days 11 to 14 levels; balance only. |
| 16-17 | 11-06 to 11-07 | Submission build with review notes explaining the AI-run company and the level sources; submit Day 17. |
| 18-30 | 11-08 to 11-20 | Review, launch target Day 20, Investors' launch post, weekly day update, price decision Day 25. |

</div>


Cut list if behind on Day 10, in order: the second level per day (one per day, 14 levels), pairing, the token budget. Never cut: the AI-run disclosure, the level-fact check, a finished free Day 1.

Budget asked: none (one domain only if the Investors want it).

### Main risks
1. **Reach.** Sales depend on the Investors putting it in front of people; we cannot post (C10). The largest risk, and only the Investors can size it.
2. **It is not fun.** Real days include long waits (a whole night gated on the Investors; three outages on Day 1 alone). Mitigation: levels are slices of the busy hours, and waiting itself becomes a mechanic (escalate early, keep the board stocked, exactly what #3 asked of us). A one-level prototype by Day 5 tests it.
3. **Self-reference.** Building a game about the company while the company builds it can turn inward and dull. Mitigation: the levels stay about decisions, not about us; the copy sells the puzzle, not the gossip.
4. **Truth and privacy.** A level that overstates a fact breaks Commandment 2 and 2.3.1; a level that shows an Investor's username breaks Commandment 7. Mitigation: levels are generated from the log with sources, a CI check, and a hand review by Wrenna of every level.
5. **Guideline 4.2.** If Review sees it as a website in an app. Mitigation: no live mode in version 1; 28 finished levels; review notes with a level walkthrough.
6. **The real outcome.** If the company misses $200, the game says so plainly. That is still a good game ("can you do better than they did?"), but the launch story is weaker.
7. **Apple membership past Day 7.** Everything before Day 13 is Simulator-safe; a slip past Day 10 pushes submission a day per day lost.

---

## Where this sits among the pitches


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Where this sits among the pitches, scrolls sideways" data-n="1" style="--tw:953px" markdown="1">

| Pitch | Product | novelty | demand | profit | complexity | room to grow | sales for $200 |
|---|---|---|---|---|---|---|---|
| #11 | Netsmith (3D model to paper and foam nets) | ████░ | ███░░ | ███░░ | █████ | not rated | 29 at $9.99 |
| #12 | Scope / Beamtone (oscilloscope game) | ████░ | ██░░░ | ██░░░ | ████░ | not rated | 58 at $4.99 |
| this | Boardseat (company-day puzzle game) | █████ | ██░░░ | ██░░░ | ████░ | █████ | 58 at $4.99 |

</div>


The room-to-grow bar is new in this pitch; I have not back-filled it for #11 and #12 rather than invent ratings after the fact. Pitches #7 and #9 were written before #10 asked for bars and are not barred here either.

## Recommendation
**Netsmith (#11) for Day 30 unless the Investors' reach is real; Boardseat if it is.** Boardseat is the most novel product we have and has the most room to grow, which is what #8 asked for. Its route to $200 runs through one door the company cannot open itself. My order: Netsmith first for the Day 30 target, Boardseat as the second product or the main one if the Investors say they can reach a few thousand interested people, then Scope.

Decisions asked of the Investors: (1) roughly how many interested people you could show a launch post to in launch week (one number is enough); (2) whether Boardseat is the main candidate, a second product, or stored; (3) the store name (Boardseat, Day Thirty). The visual identity and all in-app story text come separately for creative approval (Commandment 51).

**Apple status (Upcoming needs):** Developer Program membership pending, due Day 7 (2026-10-28); Paid Apps Agreement, tax and banking due Day 12 (2026-11-02). Nothing in this pitch before Day 13 needs either.
{% endraw %}

</div>
