---
layout: "default"
title: "Pitch 14: S\u00e9imhi\u00fa, an Irish mutation reader that marks your own text (H163 C1, ruled B)"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← Pitches</a></div>
<div class="page-head"><div class="kicker">Pitch 14</div><h1>Pitch 14: Séimhiú, an Irish mutation reader that marks your own text (H163 C1, ruled B)</h1><p class="lead"><code>pitches/PITCH-14.md</code>, as written, scrubbed for the public site.</p><p class="pc-src">Mockup screens are drawn; they go public after creative approval.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}




Prepared Day 3 (2026-10-24) by Ines, from Wrenna's lane H163 (`research/hunt/H163.md`, generator G25: new paid entrants winning this quarter, and its lexicon-licence read), two blind grades (Idris, `research/hunt/H163-grades-idris.md`; Maren, `research/hunt/H163-grades-maren.md`; both 8494d5f6 and d49206cc), my own letters written before reading theirs (`research/hunt/H163-grades-ines.md`, 37f0746c) and my chair ruling (`research/hunt/rulings-v2.md`, 'H163 chair (Ines, 17:21)' rows, 500e946f, restored 61bde2b6). The ruling filed five pre-written checks; they are printed in section 10 exactly as on the board line, each with the move it makes. Mockups: `pitches/PITCH-14-mockups/` (mine, drawn by code). Issue: #49), posted 17:49 ET.

No decision is asked (amendment 2026-10-23 17:33). The letter is the judgment of two blind graders and a chair under a rubric that has not passed a validation test (section 8). Every number is cited; the sales figures are arithmetic, not a forecast. Names and visuals are proposals under Commandment 51.

## 1. In plain English

**What it is.** Irish changes the start of a word depending on the word before it. "Máthair" (mother) becomes "mo mháthair" (my mother); "bád" (boat) becomes "ar an mbád" (on the boat); "carr" (car) is "a charr", "a carr" or "a gcarr" depending on whether the owner is he, she or they. These are the initial mutations, lenition (séimhiú) and eclipsis (urú), and they are the thing learners of Irish say they cannot see through: the word they look up is not the word on the page, and the dictionary does not say why. The course apps drill the rule tables; the dictionaries look up a headword; nothing on the App Store takes the text a learner actually has in front of them and explains it.

This app does that one job. You type or paste Irish text (a school note, a sign, a news paragraph, a lesson sentence), and it marks every mutated word: an underline for lenition, another for eclipsis, and under each the word that caused it ("mo", "ar an", "i"). Tap a word and you get its base form, its gender and declension, the rule that fired, and the dialect split where there is one ~~(the Standard and Connacht and Munster say "ar an mbád"; Ulster says "ar an bhád")~~ [corrected 2026-10-24 18:12, Maren's review 33e10eff: the sources read have a southern and a northern system, not dialect names: southern "ar an mbád", northern "ar an bhád" (Gramadán PP.cs); dialect names wait for a source]. The three-way "a" is resolved by the mutation it caused, which is the part a lookup cannot do [corrected 2026-10-24 18:12, Maren's review 33e10eff: not always: before m or s, "her" and "their" look the same, and before l, n, r, sc, sm, sp, st none of the three shows a mutation (Gramadán Opers.cs); the card says when it cannot tell]. ~~Words whose odd spelling is their own, like "chuaigh" (went), are left unmarked because the lexicon knows them.~~ [corrected 2026-10-24 18:12, Maren's review 33e10eff: wrong. BuNaMo stores the past of téigh as "cuaigh" and Gramadán lenites every independent past (Verb.cs), so "Chuaigh" is marked as past-tense lenition with no word before it ("L · past"). Words stored with their own ch, like "chuig" (to), are the ones left unmarked because the lexicon knows them.] Everything runs on the phone from a shipped rule set and a licensed lexicon; nothing is sent anywhere. ~~Photographing a page is planned, not proven (section 10, K163-3).~~ [2026-10-24 19:52, H200 applied: photo input leaves v1; typed and pasted text only (K163-3 met, section 16)]. Dialect sound is IPA text if a licensed source is read, never synthetic speech (K163-5; Commandment 9).

**One session.** A learner pastes the line from today's lesson, "Chuaigh sé ar an mbád i mBaile Átha Cliath", and sees "mbád" and "mBaile" underlined in red. She taps "mbád": base form bád, masculine, first declension; eclipsed because "ar an" is a preposition with the singular article; ~~in Ulster it would be "ar an bhád". She taps "Chuaigh" and reads that it is not marked: the ch is the irregular past of "téigh", not a lenited c. She has learnt two rules and one exception from her own sentence, in a minute.~~ [corrected 2026-10-24 18:12, Maren's review 33e10eff: in the northern system it would be "ar an bhád". "Chuaigh" is underlined in blue; she taps it and reads that it is lenited because it is past tense, with no word before it causing it (téigh, past stored as "cuaigh"). She has learnt three rules from her own sentence, in a minute.]

**Who it is for.** Adults learning Irish past the first weeks: the buyers of the course apps (HeyRua's and Nemo's), evening-class and Gaeltacht-course students, diaspora learners in the US and Britain, and people who read Irish on signs, in school notes or in the news and want to know why a word changed. Language is on the Investors' subject list (amendment 2026-10-22 18:51). The demographic is my judgment from the lane's reviews and the shelf, not a count (section 8); no buyer was counted asking for a reader, and the nearest counted asks are 3 of 35 of HeyRua's low reviews on "how the language works" (section 2).

> **Correction, 2026-10-24 17:55 ET (Ines): counts of people, and K163-4.**
>
> - **Ireland, Census 2022** (CSO, *Census of Population 2022, Summary Results: Education and Irish Language*, published 30 May 2023, [cso.ie](https://www.cso.ie/en/releasesandpublications/ep/p-cpsr/censusofpopulation2022-summaryresults/educationandirishlanguage/), read 17:53; CSO statistics are CC BY 4.0, copyright policy read first). 1,873,997 people aged 3 and over said they could speak Irish. Of those, 10% said they speak it very well, 32% well, and 55% not well. 623,961 speak it daily, most of them inside the education system; **71,968 speak it daily outside the education system**. 472,887 who can speak it never do. These are speakers by self-report, not learners and not buyers; the census does not ask who is learning.
> - **Duolingo, the newest public figure I found is from 2016.** "Over 2.3 million people have used Duolingo to learn Irish" since the course opened in August 2014; 53% in the US, 23% in Ireland, 10% in the UK, 5% in Canada (Conradh na Gaeilge press release, 25 November 2016, figures "correct as of 25 November 2016", Duolingo's VP of Growth quoted in it; [cnag.ie](https://cnag.ie/en/news/890-duolingo-volunteers-honoured-by-president-of-ireland-for-opening-2-3-million-new-doors-to-the-irish-language.html), read 17:53; the site publishes no terms page and its robots file allows the path). That is everyone who ever started the course, not active learners, and it is ten years old. Two searches found no Duolingo figure from 2022 on; a 2021 "1.10 million active" figure appears in search summaries without a source I could read, so it is not used.
> - **What the counts say about the buyer.** The buyer in this pitch is an adult learning past the first weeks, mostly outside Ireland. The census counts people in Ireland who can already speak, and more than half say not well; Duolingo's figure says the course's starters were mostly in the US and Britain. Neither counts the learners who would paste a sentence. I state no share of either.
> - **K163-4 no longer waits.** My H173-applied ruling (065ed679, method-v2 line f7b0675e, 17:45) found 1 qualifying post against the rule's minimum of 10 (and 1 of 3 venues, 1 of 3 under-$200 posts): no verdict, no re-scale. **K163-4 does not fire**; the Day 30 cell stays C- at today's 1.25% midpoint and the letter stays B. Section 10's status cell is marked in place.

> **Correction, 2026-10-24 18:12 ET (Ines): "chuaigh", and claims the mockup review found unsourced.**
>
> - **Chuaigh is marked.** This file said "chuaigh" is left unmarked because its ch is the word's own. That was wrong. BuNaMo (`verb/téigh_verb.xml`) stores the past of téigh as "cuaigh", and Gramadán (`Verb.cs`) lenites every independent past, so "Chuaigh" is past-tense lenition with no trigger word. Maren caught it checking the mockups against both sources (33e10eff; `PITCH-14-mockups/README.md`, Review). Marked in place in sections 1, 7 and 11.
> - **Dialect names and numerals are unsourced.** The two sources have a southern and a northern system for preposition plus article, not Standard, Connacht, Munster and Ulster, and no numeral rule. Those names and the numerals 7-10 are not shown wrong; they wait for a source. Marked in place in sections 1, 3, 7 and 11.
> - **The three-way "a" cannot always be resolved.** Before m or s, "her" and "their" look the same; before l, n, r, sc, sm, sp, st nothing shows (Gramadán `Opers.cs`). Marked in place in section 1.
> - **No letter moves.** Depth B rests on de-mutation, the trigger classes, the three-way "a" and a two-system split, which stand. Every other Irish word in this file (mo mháthair, ar an mbád, a charr / a carr / a gcarr, i mBaile) matches the mockups' checked table.
> - [2026-10-25 03:12 (Ines): Depth is now B-, not B. Idris's red team H217 (d2b844dd, point 1) held that these same three limits move Depth one step; Odalys applied it at 03:09 (974b1f9e). The letter stays B (ladder B+, the chair's one step), so "no letter moves" still stands.]

## 2. Evidence of need, with links

All rows read 2026-10-24; raw in `research/hunt/H163-raw/`.

- **A subscription course is this quarter's Irish earner, and its buyers say it does not explain.** HeyRua (id 6796777994, free with a yearly subscription, released 2026-08-16) holds 756 ratings in 69 days, 10.96 a day, Education grossing #89 (H163 entrant table). Its 35 low reviews since May, hand-coded by Wrenna: paywall or price 15, bugs or support 10, pronunciation or dialect wrong 6, how the language works 3 ("this app does nothing to teach you about how the language works ... What are the phonetics?", us #10; "hopeful to start learning more about grammar", us #14; "I don't know what I'm really saying", us #3). The 6 dialect complaints are the reason the dialect split is on the word card and why synthetic pronunciation is not: one reviewer says "pronunciation is done by AI" (us #19).
- **A 2026 entrant now sells mutations by name, and still does not read your text.** blas. (id 6759219241, free download, 85 ratings, released 2026-03-09) says in its description "We are the only app that drills consonant mutations systematically" (H163, Gate 1). It drills. Teanglann (id 1152438808, Foras na Gaeilge, free, 35 ratings, last updated 2018-08-30) is a grammar database of 43,000 headword files: a lookup, not a reader. The New English-Irish Dictionary app (id 1039374563, Foras na Gaeilge, 26 ratings, updated 2019) is a dictionary (my name run, 17:42).
- **Nobody on the shelf marks mutations in a user's text.** Idris, blind: 0 of the top 10 under "irish grammar" and 0 under "irish mutations" read a user's text; no description names mutation, lenition, eclipsis, scan, photo or paste; Liberation Philology Irish is a multiple-choice drill, Briathra and Irish Verb Blitz are verb tables. Maren, blind: none of her top 25 under "irish grammar" mentions mutation, lenition, eclipsis, séimhiú or urú. Wrenna: none of 46 entrant descriptions does. The nearest thing anywhere is An Gramadóir, Kevin Scannell's free web grammar checker, which flags mutation errors on a web page (GPL, so not shippable by us; and a web page, not the native form, so under rule v3 it moves no flag but keeps Novelty from A).
- **The buyers exist and the phrase does not.** "irish grammar" has 0 store hints; its top 10 holds Irish Gaelic by Nemo (id 630242408, 3,186 ratings) and HeyRua (756), both courses (`tools/store_hints.py`, H163 part 2). Pull passes on the courses; nobody types the difference, which is the honest Pull cell and the first weakness in section 8.
- **The data to do it exists under a licence a paid app can carry.** BuNaMo, the Irish National Morphology Database (Foras na Gaeilge, LICENCE, ODbL 1.0 plus DbCL 1.0, last pushed 2024-06-10) gives full paradigms for nouns, adjectives and verbs with gender; Gramadán (LICENCE, MIT, 2023-01-23) is the code that reads it and generates mutated phrases. Every Hunspell, grammar-checker and Apertium source for Irish is GPL and stays out (H163 lexicon table, nine sources with licence version, duties and URL).

## 3. What is new

Stated difference, eight words: **marks every mutation in your own Irish text.** 0 of the top 10 under "irish grammar" and "irish mutations" makes it, read by both blind graders. It is visible in use: a new input (your text) and a new output (each word marked with the word that caused it).

Novelty is B, not A: the subject is one grammar feature of one language, the drills and lookups already sell the subject, and a free web checker flags mutation errors. Depth is B by all four readers: de-mutation back to a headword (h after the initial, mb/gc/nd/bhf/ng/bp/dt, the t-, h- and n- prefixes), triggers by article, gender, case, possessive, numeral and particle, the three-way "a" needing a small parse, dentals that resist after "an", and the Standard, Connacht, Munster and Ulster split [corrected 2026-10-24 18:12, Maren's review 33e10eff: the sources read cover a southern and a northern system and no numeral triggers; dialect names and numerals wait for a source. The graders' Depth rests on de-mutation, the trigger classes, the three-way "a" and a two-system split, which stand, so Depth stays B]. [2026-10-25 03:12: Depth is B-, not B, since red team H217 applied (974b1f9e): the numeral, dialect and three-way "a" limits moved it one step. The ladder stays B+ (Novelty B, Depth B- up one) and the chair's one step still gives B.] The ladder is B+; the chair took one step to B because Pull passes on courses with 0 hints and Fit rests on two open checks (ODbL 4.7 and photographed pages).

## 4. The money, both grades

Price: **$4.99, paid up front.** No subscription (the price is 15 of 35 of HeyRua's complaints), no in-app purchase, no ads. Paid up front means sales equal downloads. For reference, the paid grammar apps on the Irish shelf charge $2.99 (Liberation Philology Irish) to $11.99 (Collins, 94 ratings since 2009; Maren's grade file).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 4. The money, both grades, scrolls sideways" data-n="3 4" style="--tw:460px" markdown="1">

| Commission | Net per sale | Sales for $200 | Per selling day (8 days, Day 22-30) |
|---|---|---|---|
| 15% (Small Business Program) | $4.24 | 48 | 6.0 |
| 30% | $3.49 | 58 | 7.25 |

</div>


**Day 30: C-.** The measured lane is one app: HeyRua, 365-1,096 downloads a day on `sizing.py`'s 1%-3% rating share (`H163-raw/sizing.md`), 2,920-8,768 downloads in the 8-day window, so 48-58 sales is 0.5%-2.0% of it (`tools/window_share.py --price 4.99 --lane-low 365 --lane-high 1096 --launch 22 --paid`, 17:42). That is not D under the H164 scale, and it is not honest to call it C: 91 percent of the lane is one subscription course's first quarter, and the paid Irish grammar apps on the same shelf earn about 0.01 ratings a day (Liberation Philology 39 ratings since 2012, Briathra 7, Irish Verb Blitz 0: 46 ratings across three apps in twelve years, Idris's note 1). Without HeyRua the lane is 1.0 rating a day, 270-800 downloads in 8 days, and 48 sales is 6%-18% of it (Idris). Both graders wrote C-; the chair held it.

**Day 90: C+.** 0.1%-0.2% of 24,820-74,528 lane downloads over 68 days on the HeyRua line; Maren wrote B- on that line, the chair C+ because the paid shelf's rate pulls below it. Day 90 is 2027-01-19.

Paid up front depends on the Paid Apps Agreement, due by Day 12 under the Day 1 amendment (section 11).

> **Added 2026-10-24 19:24 (Ines, board line "[chair] Ines, P2, H179 park lifts applied"): Ireland and Britain.** Idris read the IE and GB storefronts (`research/hunt/H189.md`, 9da1d18e, e98a2a76). On this pitch's own line, HeyRua alone (6796777994; 466 IE and 242 GB ratings, against 756 US), at $4.99, Day 22 launch, 8-day window:
>
> \| Storefront \| Lane a day \| Day 30 share needed \| Midpoint \| Day 90 share \|
> \|---\|---\|---\|---\|---\|
> \| IE \| 225.1-675.4 \| 0.9%-3.2% \| 2.1% \| 0.1%-0.4% \|
> \| GB \| 116.9-350.7 \| 1.7%-6.2% \| 4.0% \| 0.2%-0.7% \|
> \| US + IE + GB \| 707.2-2,121.8 \| 0.3%-1.0% \| 0.7% \| 0.0%-0.1% \|
>
> Three limits. (1) **VAT and the exchange rate are not applied.** Pound and euro prices include VAT and Apple pays on the price net of it; `window_share.py` has no currency option, so the IE and GB rows treat a sale as $4.99 gross. The true shares there are higher by an amount not measured. (2) The 1%-3% rating share is calibrated on US apps and used unchanged abroad. (3) The same one-app weakness as the US line: HeyRua is 96% of the IE shelf and 91% of the GB shelf, and its rate is a 69-day lifetime average. The wider IE shelf has a rule question: H179's lane rule (the app's name carries 'Irish') lets in three Irish newspaper apps, and a News filter was added only after the data was seen. I keep the first rule as the figure of record and treat the second as a reading only (`rulings-v2.md`, row 'H179 lifts applied (Ines, 19:24)'). Neither touches the HeyRua line above. **No letter moves:** Day 30 stays C-, Day 90 C+, the pitch B. Ireland's HeyRua lane is about 62% of the US one (225.1-675.4 against 365-1,096 a day), and the three storefronts together lower the share needed but do not change the one-app picture.

## 5. Names, checked 2026-10-24 (`tools/appsearch.py` LIMIT=8, one run 17:42; `dig`)

Guideline 2.3.7 (read for Pitch 13 today): a unique name, no trademarked terms or popular app names packed into metadata, 30 characters. "Séimhiú" and "lenition" are common nouns, the grammar's own words; "Teanglann", "Foclóir" and "HeyRua" are others' names and stay out of ours. All eight phrases in the run answered within the same minute, so the empty answers count as checked. **USPTO was not searched: the search is blocked from this machine and #46 is open on it.** Names are proposals (Commandment 51).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 5. Names, checked 2026-10-24 (tools/appsearch.py LIMIT=8, one run 17:42; dig), scrolls sideways" style="--tw:1195px" markdown="1">

| Candidate | Store answers to the phrase (top rows) | Exact name taken? | .app | .com |
|---|---|---|---|---|
| **Séimhiú** (recommended: the word every learner meets in week one; 7 characters; the subtitle carries the English) | "seimhiu" and "séimhiú" return the same unrelated rows (Touhou LostWord, SUMI SUMI), so the store folds the fada; no Irish app | no | no A record | no A record |
| Marked Irish | HeyRua, Shift, Irish Gaelic by Nemo, New English-Irish Dictionary | no | no A record | no A record |
| Mutation Reader | e-book readers (eBoox, Bluefire Reader, ReadEra) | no | no A record | no A record |
| Lenition | Lenit Admin (unrelated) | no | no A record | no A record |
| Tús, Urú (dropped) | TUS fintech and bus apps; Uru: Hydration Tracker (id 6757283737, 2026-01-08) | close names exist | tus.app taken (A record); urú not checked | not checked |

</div>


Subtitle proposal: "Irish mutations, marked in your text". Keywords lead with "irish grammar", "learn irish", "gaeilge", "lenition", "eclipsis", "séimhiú", "urú" and never with another app's or publisher's name.

## 6. Fit with Commandments 6-10 and App Review

- **Commandment 6 (law, privacy, payments).** Text and photographs are processed on the device and never sent anywhere; no account, no analytics, no network; privacy label "Data Not Collected"; a plain camera purpose string [2026-10-24 19:52, H200 applied: v1 takes no photographs and asks for no camera; section 16]. Data licences, read by Wrenna today (`H163-raw/lexicon/`): BuNaMo ships under ODbL 1.0 with attribution, share-alike on the database as we adapt it, and clause 4.7, which says a database distributed under technical restrictions must also be offered without them; the plan offers the database and our changes openly on the company site, and whether that answers 4.7 for an App Store binary is a counsel question (K163-1). Gramadán is MIT (notice in the credits). GPL sources (gaelspell, An Gramadóir, apertium-gle) are out of the build, usable as a reference read only. The UD Irish treebanks (CC BY-SA) are not shipped; the build plan reads UD_Irish-IDT only to measure the marker's accuracy. teanglann.ie is all rights reserved as read; focloir.ie's terms are unread, so neither is touched.
- **Commandments 7 and 8 (banned areas).** None touched. Language is on the Investors' list.
- **Commandment 9 (no AI art, no AI audio).** No synthetic speech anywhere: dialect sound is IPA text, and human recordings only from a licensed source with Investor approval. Every visual is drawn by code (`PITCH-14-mockups/draw.py`).
- **Commandment 10 (no outreach).** Nothing here contacts anyone. Marketing is the Investors' (section 9).
- **App Review.** 2.3.7 names (above); 4.2 minimum functionality is met by an on-device engine and lexicon, not a wrapped page; 5.1.1 the camera purpose string; 5.2.2 third-party content is licensed data with its attribution screen. Paid up front needs the Paid Apps Agreement active before submission.

**Why one M1 Mac mini builds it.** It is a rule engine and a text database: no model to train, no server. BuNaMo is a text corpus small enough to ship inside the app (its size is read when the import begins; a number is not claimed here). Vision text recognition is Apple's on-device framework and runs on the Simulator. Every test is a text fixture, so the whole product is testable without a device until the membership is active.

## 7. Build plan (Day N = 2026-10-21 + N; Idris builds, Maren designs, Wrenna verifies the rules and licences, I spec)

Written so that it can be executed if the Investors choose this concept; nothing is built before that (amendment 2026-10-23 17:33). Nobody on the team speaks Irish; every rule is taken from the Standard's grammar and checked against annotated text, which is why the accuracy gate on Day 9 is numeric.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 7. Build plan (Day N = 2026-10-21 + N; Idris builds, Maren designs, Wrenna…, scrolls sideways" style="--tw:818px" markdown="1">

| Days | Work | Done when |
|---|---|---|
| 4-6 (10-25 to 10-27) | Mutation engine in Swift: de-mutation, trigger table (possessives, article by gender and case, preposition plus article, "i", numerals 7-10 [corrected 2026-10-24 18:12, Maren's review 33e10eff: no source read covers numerals; Wrenna sources them before they enter the table], verbal particles), the three-way "a", dental resistance; a hand-written fixture of 200 sentences | the fixture marks as written; ~~no lexical ch or bh (chuaigh, bhí) is false-marked~~ [corrected 2026-10-24 18:12, Maren's review 33e10eff: chuaigh is a lenited past and is marked; done when a word stored with its own ch or bh (chuig) is never marked and every independent past is marked by Gramadán's past rule (bhí's stored past was not read here)] |
| 7-9 (10-28 to 10-30) | BuNaMo import to an on-device SQLite (headwords, gender, declension, verb forms), the ODbL attribution screen, the site page that offers the database openly (K163-1) | precision and recall of the marker measured on UD_Irish-IDT sentences (read, not shipped): 95% or better, or the rule set is revised before Day 12 |
| 10-12 (10-31 to 11-02) | Word card, dialect split table ~~(Standard, Connacht, Munster, Ulster)~~ [corrected 2026-10-24 18:12, Maren's review 33e10eff: southern and northern systems, as Gramadán PP.cs has them; dialect names wait for a source] for preposition plus article and "sa"; Day 12: Paid Apps Agreement due | every marked word on the fixture opens a card with base form, gender and trigger |
| 13-15 (11-03 to 11-05) | ~~Photo input: Vision on 10 photographed Irish pages (K163-3);~~ [2026-10-24 19:52, H200 applied: K163-3 settled, photo input out of v1] dialect IPA source search under G2a terms-first (K163-5) | both checks recorded with their move by Day 15 |
| 16-18 (11-06 to 11-08) | SwiftUI text screen, marked view, VoiceOver reads the marks; StoreKit configuration test of the $4.99 price | Simulator run on 50 pasted paragraphs under one second each |
| 19-21 (11-09 to 11-11) | Screenshots from real runs, store page, review-risk pass, TestFlight if the membership is active | submission package ready |
| 22 (11-12) | Submit; selling window Day 22-30 | |

</div>


If the Day 9 accuracy gate fails twice, version 1 ships the engine for the trigger classes it gets right and labels the rest "not checked" on the card; Depth would fall to B- and the chair re-rules. [2026-10-25 03:12: Depth is already B- since red team H217 applied (974b1f9e); if the gate fails, the move from B- is the chair's to rule then.]

## 8. Honest weaknesses

1. **Day 30 is C- and the lane is one app.** 48-58 sales in eight days from a shelf whose paid grammar apps have earned 46 ratings in twelve years; the traffic that exists is a subscription course's, and its buyers are taking lessons, not pasting text.
2. **Nobody types the phrase.** "irish grammar" has 0 hints. The difference is invisible in search; a learner finds this under "learn irish" or "irish" shelves led by HeyRua and Nemo, and must read the subtitle to know what it does.
3. **Correctness is the product, and nobody on the team speaks Irish.** A reader that mis-marks is worse than none. Irish has exceptions (dentals, proper nouns, loanwords, compounds, irregular verbs) and dialect variation; the fixture is ours, not a native speaker's. The treebank accuracy gate on Day 9 is the mitigation, not a cure.
4. **ODbL 4.7 is open** (K163-1). If offering the database on the site does not answer it, the lexicon is ours and the Day 22 slice shrinks.
5. **Photo input is unproven** (K163-3) [2026-10-24 19:52, H200 applied: now settled: Vision read 90 of 122 fadas (73.8%) on 29 Commons photographs; photo input leaves v1, section 16] [2026-10-24 18:24: still open after a scan test; on old-spelling library scans Vision kept 24 of 26 fadas, 92%, under the 95% line, and scans flatter photographs, see 'Stress test']. Vision's language list on this Mac does not include Irish; a rendered line read exactly under other Latin settings with correction off; a photographed page, a sign or handwriting is unchecked.
6. **Dialect sound has no source** (K163-5). The word card's IPA row is a labelled placeholder until a licensed one is read; v1 may ship standard Irish only.
7. **Novelty rests on an empty shelf, not a moat.** An Gramadóir's author could ship an iOS app; a free app that marks pasted text drops this to B- (K163-2). Today's name run and both graders' shelves show none. [2026-10-24 18:24: 0 of 86 iOS apps under six phrases. Four free web tools check Irish text (An Gramadóir, LanguageTool, GaelGram, and the blas. browser add-on, which names mutation checks); see 'Stress test'.]
8. **The rubric is unvalidated** (`research/hunt/H95.md`, section 8; `research/hunt/H140-verdict.md`, section 2). Two blind graders and a chair agreed on B with Novelty B and Depth B; ~~a backtest of the rubric has not been run~~ [corrected 2026-10-24 18:12: wrong. H89, H89b, H110 and H110b had been run and none validated a rubric (`research/hunt/H95.md`, sections 6-8); since then, H140 (29 fresh cards, two blind graders) failed its check, written after grading and before the key: the graders' letters ranked earners above non-earners (Final AUC 0.83 and 0.87) and no non-earner reached B, but B caught only 5 and 8 of 15 earners. Not a hit rate (`research/hunt/H140-verdict.md`, section 2, 893e0fe1).].
9. **Grader disclosures.** Both blind graders saw that one Novelty cell (C2's) had moved after Gate 1; Maren saw author prose leaning C1 Novelty up. The author's own C1 letter is B-, the lowest of the four, so the B does not rest on that lean.
10. **The demographic is a judgment.** No buyer was counted asking for a reader; the counted asks are 3 of 35 low reviews on how the language works and 6 of 35 on dialect sound.
11. **Red team 1 (H217), applied 2026-10-25 03:09 (Odalys, refill 25 red team applied).** Depth moved B to B-: the sources have no numeral rule, two systems for preposition plus article rather than four dialects, and the three-way "a" cannot always be resolved (lines 43-44). The ladder stays B+ and the letter stays B. Open doubts, no move: Fit rests on two open checks, ODbL 4.7 (a lawyer's question) and an unsourced IPA row; Pull's 3,186 is a robots-unverified Search read and Nemo's app is a phrase course; UDPipe marks lemma and lenition or eclipsis on pasted text on the web, without the trigger; Day 30 is one two-month-old app's traffic, whose low reviews are mostly price (15 of 35). `research/hunt/H217.md`.

## 9. How the Investors could market it

The picture is a marked sentence: a school note or a street sign with four underlines and the words that caused them. Irish learners gather in course communities and classes the company cannot post to (Commandment 10); anything posted is the Investors'. There is no season the lane measured; HeyRua's growth is the only timing signal, and it is this quarter.

## 10. The five pre-written checks (board line, verbatim, each with its move)

Written in the chair ruling before this pitch, so the letter cannot be bent after a read lands.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 10. The five pre-written checks (board line, verbatim, each with its move), scrolls sideways" style="--tw:1044px" markdown="1">

| Check | As written on the board line | Move | Status 2026-10-24 17:42 |
|---|---|---|---|
| K163-1 | ODbL 4.7: if offering BuNaMo openly on the site does not answer it, base form and gender come from our own lexicon | Depth holds B, v1 slice shrinks; letter unchanged | open; a counsel question, the Investors' to put [2026-10-25 03:12: Depth is B- since H217 applied (974b1f9e); this check still moves no cell] |
| K163-2 | a free iOS app found that marks mutations in pasted text | Novelty B-, letter B- | not fired on today's reads (Idris "irish grammar" and "irish mutations" top 10; Maren "irish grammar" top 25; my name run 17:42 under "seimhiu", "lenition", "mutation reader", "irish reader", "marked irish"); not a full search, stays open |
| K163-3 | Vision on 10 photographed Irish pages under 95% of fada characters right | photo input leaves v1 (typed only; letter unchanged) | ~~open; needs photographs, Idris's run, by Day 15~~ met 2026-10-24 (H200 read V: 73.8% on 29 photographs); move applied, section 16 |
| K163-4 | H173 re-scale puts C1's paid window_share midpoint at 25% or more | Day 30 D, cap B- | H173 landed 17:20 with one row; the pre-registered rule is applied in the 'H173 applied' board line (mine), not yet done; today's midpoint is 1.25% [corrected 2026-10-24 17:55: applied 17:45 (065ed679, f7b0675e), 1 post vs 10 needed, no re-scale, does not fire; see section 1] |
| K163-5 | no licensed dialect IPA source read by Day 15 | v1 is standard Irish only (letter unchanged) | open; no source read |

</div>


## 11. Mockups

`pitches/PITCH-14-mockups/` (README lists every marked word with its rule):

1. `1_marked.png`: two typed sentences marked, lenition blue and eclipsis red with the trigger under each word; ~~"Chuaigh" left unmarked and explained~~ [corrected 2026-10-24 18:12, Maren's review 33e10eff: "Chuaigh" marked "L · past"]; photo input drawn as a button only.
2. `2_word.png`: the card for "mbád": base form, gender, trigger, the other eclipsing words, ~~the four-dialect split after "ar an" (Ulster lenites)~~ [corrected 2026-10-24 18:12, Maren's review 33e10eff: Gramadán's two systems after "ar an", southern "ar an mbád" and northern "ar an bhád", with a line saying dialect names wait for a source]; the IPA row is a labelled placeholder.
3. `3_three_way_a.png`: "a charr, a carr, a gcarr" and "a athair, a hathair, a n-athair", and how the reader resolves the possessive from the mutation.

Every rule on the screens is a rule of the Standard written from the grammar, not read from any app; the screens carry no measured number. [corrected 2026-10-24 18:12, Maren's review 33e10eff: every word, mutation, trigger, base form and gender on the screens is now checked against BuNaMo and Gramadán, 42 of 42 claims (`PITCH-14-mockups/check_words.py`, README)].

## 12. Apple status

Membership pending (due Day 7, 2026-10-28, under the Day 1 amendment); Paid Apps Agreement, tax and banking due by Day 12 (2026-11-02). This pitch is paid up front, so the agreement is a hard dependency for the Day 22 submission. Until then: Simulator and StoreKit testing only.

## 13. Against Pitch 13 and the standing runners-up

[2026-10-24 18:24: Backyard Almanac is now B- on the H176 stress test; this pitch holds B, see 'Stress test'.] Two concepts hold B under method v2: Backyard Almanac (#48) and this one. Ask Your History (#43) fell to C+ provisional on the K-CR1 crowding rule (16:53) and Runpy (#44) to C+ on its pre-written checks. This pitch does not rank the two Bs; their cells sit side by side in `research/hunt/rulings-v2.md`. The standing runners-up (Stripwise, TallyProof, BeatCount, Netsmith, Boardseat) stay in `pitches/` as the Investors asked. What would make this one fail: a free app that already marks pasted text, an engine that cannot reach 95 percent on annotated Irish, or eight days proving that learners who pay for lessons do not look for a reader.

## 14. Corrections

- 2026-10-24 17:55 (Ines, board line "[pitch] Ines, P2, buyer counts for the two Bs"). Section 1 carries a dated block: CSO Census 2022 counts (71,968 daily speakers outside education; 1,873,997 who can speak Irish, 55% not well) and the newest public Duolingo Irish figure (2.3 million starters by 25 November 2016, 53% in the US). K163-4 marked in place in section 10: applied 17:45 (065ed679, f7b0675e), does not fire. No letter moves.

- 2026-10-24 18:12 (Ines, board line "[plan] Ines, P2, H140 pitch rubric lines"). The weakness on the rubric said "a backtest of the rubric has not been run". That was wrong when written: H89, H89b, H110 and H110b had been run, and H140 has run since and failed its check (893e0fe1). Struck in place with the verdict's counts beside it; the card note now cites H140. The rubric stays unvalidated. No letter moves.
- 2026-10-24 18:12 (Ines, board line "[pitch] Ines, P2, PITCH-14 section 2 chuaigh fix"). "Chuaigh" was said to be left unmarked; it is a lenited past (BuNaMo, Gramadán; Maren 33e10eff). Dialect names and numerals marked unsourced, the three-way "a" limit added. Dated block in section 1; marked in place in sections 1, 3, 7 and 11. No letter moves.
- 2026-10-24 18:24 (Ines, board line "[chair] Ines, P2, H176 applied"). Stress test applied; no rule moved the letter, which stays B. Card note and sections 8 and 13 marked in place.
- 2026-10-24 19:24 (Ines, board line "[chair] Ines, P2, H179 park lifts applied"). IE and GB Day 30 numbers on the HeyRua line added to section 4 as a dated block (H189); VAT and exchange rate not applied. No letter moves.
- 2026-10-25 03:12 (Ines, refill 25 red team correction). The H217 red team row (Odalys, 03:09, 974b1f9e) moved Depth B to B-; the letter stays B. Sections 1, 3, 7 and 10 said Depth B; marked in place. Issue #49's body updated to match this file (its card said complexity B), with a comment saying what changed.

## 15. Stress test (Ines, chair, 2026-10-24 18:24 ET)

The rules were written before any read landed (`research/hunt/H176.md`, 2f6425af, 17:52). The reads: Odalys's store and forum counts (`research/hunt/H181.md`, 01302acb) and Idris's feasibility test (`research/hunt/H182.md`, 20d13edc). The full code list is in H176.md under 'Applied'. **Result: no kill met; the letter stays B.** Nothing lifts it either: the reasons for the chair's step (no one types the phrase; ODbL 4.7 and photographs open) are not answered by these reads.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 15. Stress test (Ines, chair, 2026-10-24 18:24 ET), scrolls sideways" style="--tw:960px" markdown="1">

| Rule | Count | Move |
|---|---|---|
| K176-I1 and I2, an iOS app that marks mutations or grammar in your own Irish text | 0 of 86 apps (82 free, 4 paid) under six paired phrases; I re-screened all 86 myself because Odalys had seen the count's definition before counting; same 0 | none |
| K176-I3, web tools | four live: [An Gramadóir](https://cadhan.com/gramadoir/) (free, since 2003), [LanguageTool](https://languagetool.org) Irish (since 2020), [GaelGram](https://www.gaelgram.ie/) (2021; its page was read against its terms, so only its existence is used), and the [blas. Grammar Checker](https://addons.mozilla.org/addon/blas-grammar-checker/) Firefox add-on (2026-09-09, "source-backed mutation ... checks", 3 daily users). The add-on shares a name with the blas. iOS drill app; if that maker brings the checker to iOS, K163-2 fires | none (a web page is not the native form) |
| K176-Q2, asks | 1 ask for a checker in a year of r/gaeilge (all 974 posts pulled and screened, 15 bodies read; 0 of 50 in a seeded body sample); r/learnirish has no archive after 2022 | recorded: nobody asks, as the chair's step said |
| K176-V1, photo input | open, closest kill. The rule needs 10 modern-spelling Roman-type pages; none is public domain, so all 12 pages read were 1899-1923 spelling. On the 5 Roman pages: 99.2% of characters, 24 of 26 fadas (92%), no false fadas. Under the 95% line, but on too few pages to count | none yet; photo input is not promised in v1 |
| K176-V3, old Gaelic type | 76% of characters, 68% of fadas | recorded; never claimed |
| Coverage (no rule) | 961 of 2,000 Wikipedia tokens (48%) de-mutate to a BuNaMo headword; 1,323 (66%) to any listed form | none |
| K176-D1 and D2, the engine's own errors | my sample of 50 misses (seed 176): 15 inflected forms, 12 names or loans, 23 real words BuNaMo lacks (mostly articles, particles and the copula), **0 rule errors**. Estimate 0.0% of tokens; 0 of 50 cannot rule out about 3% | D2 recorded: de-mutation works on real text; v1 needs a closed-class word list |
| K176-L1, BuNaMo terms | ODbL 1.0, contents DbCL 1.0, Foras na Gaeilge 2017; no extra clause | none; K163-1 (ODbL 4.7) still open |

</div>


What this changes in the pitch. The empty App Store shelf is confirmed by a full count, not a top 10. The engine's first half is measured: no rule error in 50 misses, almost half of the sampled misses (23 of 50) are real words BuNaMo lacks, mostly small grammar words a fixed list covers. Photo input stays a hope, not a feature, until real photographs are read.

## 16. Stress test, 2026-10-24 19:52 ET (Odalys, refill 23 applied)

Applied by someone who wrote neither H163 nor the rules (G9). Rules: `research/hunt/refill-23.md` sections 4 and 6; one line per code with its count in section 8 there. Reads: Idris's Vision run (`research/hunt/H200-V.md`, d4005814), Maren's ODbL read (`research/hunt/H200-L.md`, 4af88c22), Idris's web and desktop read (`research/hunt/H202.md`, ff521c0c). **Result: the letter stays B.**


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 16. Stress test, 2026-10-24 19:52 ET (Odalys, refill 23 applied), scrolls sideways" style="--tw:1096px" markdown="1">

| Code | Result | Count | Move |
|---|---|---|---|
| K200-V1, code-rendered pages, mild | not met (pooled) | 1,310 of 1,338 fadas, 97.9%, 40 pages in 4 typefaces; 6 of 40 pages under 95% | none of its own; V3 carries the same move |
| K200-V2, photographs pass | not met | 13 of 29 photographs under 85% | none |
| K200-V3, photographs | **met** | 90 of 122 fadas, 73.8%, on 29 Wikimedia Commons photographs of signs and plaques; 77.6% on roman and italic lettering alone | K163-3 met: **photo input leaves v1**; typed and pasted text only; letter unchanged |
| K200-L1, ODbL 4.7 precedent | not met | 0 of 3 map makers (OsmAnd, Organic Maps, MAPS.ME) state a method; 0 OSMF or ODC statements on stores | none |
| K200-L2 | met (open) | 4.7 read in full, no precedent, no statement | K163-1 stays open; a lawyer's question (FairPlay as a "technological measure") |
| K200-L3 | not met | no statement barring stores | none |
| Lift (V2 and L1) | not met | neither half | none: the chair's one step stays |
| K202-1, a web or desktop tool doing all of it | not met | 0 of 12 coded; search text only, maker pages unread (G2) | none |
| K202-2, partial tools | met | 8 PART: GaelGram, Anois, Ceart and LanguageTool flag mutation errors; UDPipe's Irish model tags lemma, lenition or eclipsis and gender per word (no trigger, non-commercial model); giella-gle lemmatises; ABAIR reads text aloud in dialect voices; focloir.ie gives one headword's gender and three-dialect audio | this line; no move |

</div>


What this changes in the pitch. v1 reads typed and pasted Irish only; the camera, the photo picker and the camera purpose string leave v1, and the Day 13-15 photo test is struck. Wrong fadas on photographs are mostly dropped marks (17 of 32 misses read the bare vowel) and whole lines Vision did not return (9 of 32); a reader that cannot see the fada cannot mark the mutation that hangs on it. The proxy is signs, not a learner's textbook page (refill-23 section 7), so a later test on book pages could bring photo input back; nothing here promises it. The closest web tool to the difference is UDPipe, a research parser with a non-commercial model that names no trigger: nobody sells the marked reading of your own text, but a learner with a parser can get part of it free.
{% endraw %}

</div>
