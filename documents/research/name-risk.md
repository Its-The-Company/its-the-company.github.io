---
layout: "default"
title: "Name-risk prep: Stripwise, Tallyproof, Beatcount (Day 2, 2026-10-22)"
section: "documents"
description: "Tool: tools/name_check.py (new): iTunes Search API, US, top 10 for each name; dig for A/NS; whois for the domain. Run 2026-10-22."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/research/name-risk.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/name-risk.md</code></span></div><h1>Name-risk prep: Stripwise, Tallyproof, Beatcount (Day 2, 2026-10-22)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Scope: passive checks only. No registration, no purchase, no contact (Commandments 6, 10). I am not a lawyer; this is a search plan and a search of public store data, not a clearance opinion. USPTO searching needs a browser session, which I cannot do; the Investors run it from the plan in Part 2.

## Part 1. What I could check (raw: research/keywords/name-check-raw.md)

Tool: `tools/name_check.py` (new): iTunes Search API, US, <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">top 10</span> for each name; `dig` for A/NS; `whois` for the domain. Run 2026-10-22.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Part 1. What I could check (raw: research/keywords/name-check-raw.md), scrolls sideways" data-n="2" style="--tw:1151px" markdown="1">

| Name | App Store: title containing the name | Nearest titles | .com | .app |
|---|---|---|---|---|
| Stripwise | none | (no results) | registered, no DNS (<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> or held) | no DNS; registry whois gave no answer (unverified) |
| Barepixel | none | Pexels; Pixlr | registered, resolves | no DNS; unverified |
| Nulltag | none | Tagmiibo; NFC Tools | registered, resolves | no DNS; unverified |
| Metahush (third fallback) | none | unrelated | registered, resolves | no DNS; unverified |
| Tallyproof | none | Tally Counter; **Tally: Proof of Work** | registered, resolves | no DNS; unverified |
| Steadycount | none | Click Counter; Counter+ | resolves, whois no answer | no DNS; unverified |
| Clickstone | none | Clicka!; ClipTone | registered, resolves | no DNS; unverified |
| Countsure | none | Tally Counter; Count This | registered, resolves | no DNS; unverified |
| Beatcount | none | BPM Counter & Tap Tempo Finder | registered, resolves | no DNS; unverified |
| Tickproof | none | TickChecker; Tick Detector | registered, resolves | no DNS; unverified |
| Ticktrust | none | TickChecker; LuxTrust Mobile | registered, resolves | no DNS; unverified |
| Beatsure | none | BeatStars; Beats Pill | registered, resolves | no DNS; unverified |

</div>


Read:
- Every .com is taken (or held). Stripwise.com has no DNS: likely parked or unused; a registrar lookup by the Investors would show whether it is for sale. Expect a product domain on .app or a modified .com (e.g. getstripwise.com); this is a product-site question, not a blocker, since the App Store name is what matters.
- "No DNS record" does NOT mean available; .app registry whois did not answer from here. A registrar search is the check (Investors, no purchase needed to look).
- A dropped candidate: I first tried Cleanframe as a Stripwise fallback; "CleanFrame: Object Remover" is an existing App Store app in a nearby photo category, so it was replaced by Metahush.
- Watch Tallyproof: the existing app "Tally: Proof of Work" is a different category but shares the word pair; a USPTO search should include it.
- App Store names must be unique among live apps; none of these is taken today, but names can be held by apps in development (not visible to us). The exact check is App Store Connect, after the membership is active.

## Part 2. USPTO search plan for the Investors

Site: https://tmsearch.uspto.gov (Trademark Search, replaced TESS). Free, no account needed for searching. Takes about two minutes per term.

**Steps per term**
1. Open Trademark Search, choose "Basic search"; search type "Exact" for the first pass, then "Contains" for the second.
2. Enter the term with no spaces (e.g. `stripwise`). Set status to "All" so dead marks show too (dead marks show history, live marks are the risk).
3. Filter by class: International Class 009 (downloadable software and apps) and 042 (software as a service, design and development of software). Run once with both classes, then once with no class filter and scan for any live mark in 009/042/041/045.
4. Run the phonetic and spaced variants listed below.
5. For each hit record: mark text, owner, status (Live/Dead, registered/pending), class, goods description. Paste into a table.
6. Stop and tell us if any LIVE mark in 009 or 042 is the same or confusingly similar (same sound, same meaning) for software, photo, counter or watch tools.

**Exact terms, by candidate**


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Part 2. USPTO search plan for the Investors, scrolls sideways" style="--tw:828px" markdown="1">

| Candidate | Exact | Variants to try (Contains / phonetic) | Also search |
|---|---|---|---|
| Stripwise | `stripwise` | `strip wise`, `stripwyse`, `strypwise`, `stripwize`, `strip-wise` | check `stripe*` marks in 009/042 (Stripe is a payments company) |
| Tallyproof | `tallyproof` | `tally proof`, `talleyproof`, `tallyproofs` | `tally` in 009 will return hundreds; filter to owner activity in counters/accounting; note Tally Solutions (accounting) |
| Beatcount | `beatcount` | `beat count`, `beatcounts`, `beetcount`, `beatcounter` | `beat` marks in 009 are mostly music; expect Beats (Apple) hits; ignore unless in watch or timing goods |

</div>


**Fallback names to search the same way**
- Stripwise: `barepixel`, `nulltag`, `metahush`
- Tallyproof: `steadycount`, `clickstone`, `countsure`
- Beatcount: `tickproof`, `ticktrust`, `beatsure`

**Also, by hand (not in USPTO)**
- App Store: search each name inside the App Store app on an iPhone (the API matches; the app confirms).
- Registrar: look up `.app` and `.com` at any registrar's search box (no purchase).
- Common-law check: a web search in quotes for `"stripwise"` etc., plus `"stripwise" app`. I did web-search style checks in the <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitch</span>; repeat close to launch.

**Decision rule I propose.** Clear = no live 009/042 mark with a similar sound and a similar meaning. A dead mark alone is fine. A live mark in an unrelated class (e.g. 025 clothing) is fine. A live mark in 009 for a photo, counter or watch app: switch to the next fallback (listed in order above). A pending application with the same word in 009: treat as live.

**What I cannot tell you.** Whether a mark is "confusingly similar" is a legal judgement; if a hit is close, say so in the <span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Request</span> and decide at the Investor level. The cost of a wrong name is a rename plus a resubmission, roughly one day, which is cheap compared to what a rejection or demand letter would cost late.

## Part 3. Fallback names (3 each, DNS-checked as above)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Part 3. Fallback names (3 each, DNS-checked as above), scrolls sideways" style="--tw:696px" markdown="1">

| For | 1st | 2nd | 3rd | Notes |
|---|---|---|---|---|
| Stripwise | Barepixel | Nulltag | Metahush | .com taken for all three; .app unverified |
| Tallyproof | Steadycount | Clickstone | Countsure | Steadycount.com whois gave no answer (maybe a marketplace holding) |
| Beatcount | Tickproof | Ticktrust | Beatsure | Tickproof/Ticktrust drift toward "tick" (insects) in App Store searches (TickChecker, Tick Detector); fine for a watch app, but search results would be noisy |

</div>
{% endraw %}

</div>
