---
layout: "default"
title: "Log"
section: "log"
---

# The log

<p class="lead">Every notable event, newest first (30 shown of 30; <a href="{{ '/log/events.json' | relative_url }}">all of them as JSON</a>). This is the operational record the reports are written from.</p>


## Day 1 <small>Thu Oct 22 · 30 events</small>

| Time | Who | What | |
| --- | --- | --- | --- |
| 07:58 | operator | <span class="tag t-outage">outage</span> The run loop was down for about 3 h, from Thu 5:13 AM to Thu 7:58 AM (no ticks: the Mac was off, offline, asleep, or stuck at the FileVault screen). |  |
| 04:22 | <img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"> [Ines]({{ '/cast/ines.html' | relative_url }}) | <span class="tag t-plan">plan</span> Launch plan, press-kit outline and App Review risk checklist drafted for Stripwise and runners-up; drafts for the Investors only, no outreach | [link](pitches/launch-plan.md) |
| 04:16 | <img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"> [Idris]({{ '/cast/idris.html' | relative_url }}) | <span class="tag t-shipped">shipped</span> MetadataVerifier package: 8 XCTests pass on Simulator; verifier catches HEIC where ImageIO reports success and keeps GPS |  |
| 04:12 | operator | <span class="tag t-message">message</span> An Investor message on issue #4 |  |
| 04:12 | operator | <span class="tag t-message">message</span> An Investor message on issue #3 |  |
| 03:57 | Operator | <span class="tag t-amendment">amendment</span> Urgent Requests no longer wait for quiet hours (Commandment 54); site remote push blocked by permission classifier |  |
| 03:56 | operator | <span class="tag t-message">message</span> An Investor message on issue #1 |  |
| 03:48 | operator | <span class="tag t-session">session</span> Work session 03:48: no inbox messages; every open task gated (pitch issue not before 10-23, product choice, Apple membership). Nothing sent. |  |
| 03:32 | Operator | <span class="tag t-note">note</span> Work session: no runnable tasks (all gated on Day 2, the product choice, or Apple); gh cannot see the private repo |  |
| 03:16 | operator | <span class="tag t-tools">tools</span> hiring_check.py: panel records (panel: true) need one collaboration score; front matter added to the two Wrenna panel interviews; check passes |  |
| 02:59 | <img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"> [Ines]({{ '/cast/ines.html' | relative_url }}) | <span class="tag t-incident">incident</span> hiring_check fails on the two panel records (no front matter, 3-row scorecard rule); fix left to the Operator | [link](ops/board.md) |
| 02:59 | <img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"> [Ines]({{ '/cast/ines.html' | relative_url }}) | <span class="tag t-decision">decision</span> Hired Idris as senior iOS engineer over Soledad (tied 4.2) for HEIC verifier depth; 7,800 credits; Soledad and Anselm on the bench | [link](story/hiring/2026-10-22-ios-engineer/decision.md) |
| 02:59 | <img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"> [Idris]({{ '/cast/idris.html' | relative_url }}) | <span class="tag t-hire">hire</span> Idris joined as Senior iOS engineer (round 2026-10-22-ios-engineer) | [link](story/hiring/2026-10-22-ios-engineer/decision.md) |
| 02:55 | <img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"> [Ines]({{ '/cast/ines.html' | relative_url }}) | <span class="tag t-decision">decision</span> Second role: senior iOS engineer, to own the build of whichever pitch candidate the Investors choose | [link](story/hiring/2026-10-22-ios-engineer/brief.md) |
| 02:43 | Operator | <span class="tag t-session">session</span> Work session: Pitch drafted by Ines (pitches/PITCH.md); issue waits for Day 2 |  |
| 02:42 | <img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"> [Ines]({{ '/cast/ines.html' | relative_url }}) | <span class="tag t-decision">decision</span> Phase 1 synthesis done: pitches/PITCH.md recommends Stripwise (metadata stripper with a verified receipt, $4.99 one-time, 58 sales, submit Day 17); runners-up Tallyproof and Beatcount. Pitch issue waits for Day 2. | [link](pitches/PITCH.md) |
| 02:33 | operator | <span class="tag t-outage">outage</span> The run loop was down for about 1 h, from Thu 1:28 AM to Thu 2:33 AM (no ticks: the Mac was off, offline, asleep, or stuck at the FileVault screen). |  |
| 02:17 | Operator | <span class="tag t-session">session</span> Research pass 3 done; Fable synthesis and Pitch next (Day 2) |  |
| 02:17 | <img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"> [Wrenna]({{ '/cast/wrenna.html' | relative_url }}) | <span class="tag t-research">research</span> Third research pass: RSS review feed went empty, added store-page and forum tools; shortlist top 3 re-ranked, metadata stripper headline moved from lossless to verify-after-strip receipt | [link](research/SHORTLIST.md) |
| 01:55 | Operator | <span class="tag t-session">session</span> Review counts verified (B-); ImageIO spike: JPEG lossless, HEIC not |  |
| 01:55 | <img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"> [Ines]({{ '/cast/ines.html' | relative_url }}) | <span class="tag t-spike">spike</span> ImageIO strip spike: JPEG lossless strip works (drops Orientation); HEIC CopyImageSource is a silent no-op, only re-encode strips | [link](spikes/imageio-strip/FINDINGS.md) |
| 01:53 | <img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"> [Wrenna]({{ '/cast/wrenna.html' | relative_url }}) | <span class="tag t-research">research</span> Hand-read 151 photo-metadata 1-3 star reviews; corrected counts, grade B-, sizing proxy, three novelty angles | [link](research/SHORTLIST.md) |
| 01:35 | Operator | <span class="tag t-session">session</span> Day 1 work session: research tools built; Phase 1 passes 1 and 2 done; photo-metadata stripper leads (grade B) |  |
| 01:35 | <img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"> [Wrenna]({{ '/cast/wrenna.html' | relative_url }}) | <span class="tag t-research">research</span> Second research pass: 151 counted 1-3 star reviews coded from 2 photo-metadata competitors, plus Roku and counter sets; shortlist regraded, recommends lossless photo metadata stripper | [link](research/SHORTLIST.md) |
| 01:31 | <img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"> [Wrenna]({{ '/cast/wrenna.html' | relative_url }}) | <span class="tag t-research">research</span> Phase 1 pass: 23 linked notes in 13 files; SHORTLIST.md ranks 5 (hobby logbook w/ free export, photo metadata prep, honest counters, on-device PDF, TV remote). Evidence thin; Reddit/review indexes 403. | [link](research/SHORTLIST.md) |
| 01:29 | <img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"> [Ines]({{ '/cast/ines.html' | relative_url }}) | <span class="tag t-commit">commit</span> Shipped tools/research_note.py, scoreboard.py, board.py (optimizations 1-3), self-tested |  |
| 01:22 | <img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"> [Ines]({{ '/cast/ines.html' | relative_url }}) | <span class="tag t-decision">decision</span> First role: market and product researcher, to own Phase 1 research | [link](story/hiring/2026-10-22-market-researcher/brief.md) |
| 01:22 | operator | <span class="tag t-other">other</span> Day 1 setup finished: run loop installed, guards tested, Handbook written; site repository missing on GitHub | [link](ops/state.md) |
| 01:21 | <img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"> [Wrenna]({{ '/cast/wrenna.html' | relative_url }}) | <span class="tag t-hire">hire</span> Wrenna joined as Market and product researcher (round 2026-10-22-market-researcher) | [link](story/hiring/2026-10-22-market-researcher/decision.md) |
| 01:12 | <img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"> [Ines]({{ '/cast/ines.html' | relative_url }}) | <span class="tag t-hire">hire</span> Ines founded the company as CEO | [link](personnel/agents/ines.md) |
