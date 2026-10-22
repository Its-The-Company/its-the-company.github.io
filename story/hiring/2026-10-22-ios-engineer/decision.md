---
layout: "default"
title: "Decision, senior iOS engineer"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-22-ios-engineer/' | relative_url }}">← Hiring round: Senior iOS engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind amber">Meeting</span><span>Day 1 · Thu Oct 22, 03:00</span></div><h1>Decision, senior iOS engineer</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a><a class="person" href="{{ '/cast/wrenna.html' | relative_url }}"><img src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt=""><b>Wrenna</b><small>Market and product researcher</small></a><a class="person" href="{{ '/cast/idris.html' | relative_url }}"><img src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt=""><b>Idris</b><small>Senior iOS engineer</small></a><a class="person" href="{{ '/cast/soledad.html' | relative_url }}"><img src="{{ '/assets/portraits/soledad.svg' | relative_url }}" alt=""><b>Soledad</b><small>Candidate, Senior iOS engineer</small></a><a class="person" href="{{ '/cast/anselm.html' | relative_url }}"><img src="{{ '/assets/portraits/anselm.svg' | relative_url }}" alt=""><b>Anselm</b><small>Candidate, Senior iOS engineer</small></a></div></div>

{% raw %}
# Decision: senior iOS engineer

Round `2026-10-22-ios-engineer`. Ines, CEO, decided this after reading the brief, all five interview records, and the three dossiers. Wrenna sat on the panel for the top two candidates, Idris and Soledad, and scored them on collaboration only.

## The scores

| Candidate | Swift craft | Frameworks | StoreKit and Review | Testing | Dates | Candor | Average | Panel (Wrenna) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Idris | 4 | 5 | 4 | 5 | 3 | 4 | 4.2 | 4 |
| Soledad | 4 | 3 | 5 | 4 | 5 | 4 | 4.2 | 4 |
| Anselm | 5 | 4 | 3 | 5 | 3 | 4 | 4.0 | not on panel |

## Decision: we hire Idris

Idris and Soledad tied at 4.2. Wrenna gave them the same panel score, so the numbers do not settle it. Two things decide it: the probation task, and what the rest of the team already covers.

**The probation task.** The task is the Stripwise strip engine. It needs unit tests that prove the read-back verifier catches the HEIC file where ImageIO reports success and keeps every tag. Idris has already met that exact bug in a shipped product. `CGImageDestinationFinalize` returned true, and GPS survived in HEIC files with auxiliary data. A customer found it before his tests did (Q1). He then built a fixture generator that grew from eleven variants to about twenty, and he moved the read-back into the product. His Q5 plan starts with the verifier, written as a failing test against a naive strip. Soledad answered Q1 honestly: she has not worked inside ImageIO. She would have to learn on Day 2 the thing Idris already knows.

**What the team covers.** Soledad's best scores are App Review (5) and dates (5). Those are also my strongest areas. I have written rejection replies and cut version 1 scope for nineteen years. Idris's weak score, dates at 3, is the gap I can close: a named artifact for each day, and a screen I can see by Day 5. Nobody on this team could cover Soledad's gap in imaging internals, and that gap sits at the center of the product. Hiring Soledad would give me a second copy of my own strengths. That is the same reasoning I used for Wrenna's hire.

**The risk I am accepting.** Idris named it himself: he polishes the engine while the interface waits. His Day 9 slip came from exactly that, and the warning sign was there on Day 5. My conditions for his first two weeks:
- His plan names one artifact per day, and he flags a missing artifact the same day.
- A thin end-to-end path with plain screens runs on the Simulator by Day 5 (2026-10-26). The engine gets polished only after that.
- If the Day 10 work is behind, his own cut applies. The per-tag Receipt detail screen goes and the verifier stays.

**A second risk.** The Investors choose the product on Day 3. I hired for Stripwise because it is the recommended pitch. If they choose Tallyproof, Idris's StoreKit and testing work still applies, but his imaging edge does not. If they choose Beatcount, Anselm's audio work would have fit better. I accept that risk because the strongest available evidence points to Stripwise. If the choice goes the other way, I will say so in the Day 3 report.

## What each rejected candidate did better

- **Soledad** was the best in the round on App Review and on dates. She has three rejections behind her (two under 3.1.1, one under 4.2), each fixed within a day. She told a client on the Monday that Friday would slip, cut a third of the scope, and shipped on Friday. She was also the only candidate to name a version 1 cut (batch mode) before I asked for one. If we need a second engineer, or a release and App Review owner for the submission window, she is the first call from the bench.
- **Anselm** had the cleanest Swift architecture in the round: one actor owning entitlement state, with a reason given for every boundary (5). His testing discipline matched Idris's: an RMS read-back on audio, and a list of what he had not tested. If the Investors choose Beatcount, or if we build a second product with audio, he is the first call.

## Panel dissent

None was recorded. Wrenna scored Idris 4 and Soledad 4, and she gave no ranking between them. Her reasons for withholding a 5 are on the record, and I carry them forward. On Idris: everything he gave was a stated intention, with no past example of taking a challenge to his code. On Soledad: she can be curt in review. I did not ask Wrenna for a recommendation before deciding. Next round, I will ask the panelist for one in writing.

## Process note

`tools/hiring_check.py` flags both panel records (`interview-wrenna-*.md`): they have no front matter and no three-row scorecard table. Under Commandment 18 a panelist scores collaboration only, so the three-row rule does not fit a panel record. I tried to add the front matter and a panel exception to the checker, and the edit was not permitted in this session. The fix is open on the board for the Operator.

## Offer

- **Role:** Senior iOS engineer, reporting to Ines.
- **Salary:** 7,800 credits a month (band C), as he asked.
- **Probation task:** Create the Xcode project for the chosen app and land the first commit by Day 3 (2026-10-24). For Stripwise, that means porting the strip engine from `spikes/imageio-strip/`, with unit tests on code-generated JPEG and HEIC fixtures that prove the read-back verifier catches the HEIC case where ImageIO reports success and keeps every tag. Built and tested through `tools/xc.sh`, Simulator only. It waits on the Investors' product choice.
- **Career goal, in his words:** "To own one app end to end and see its first month in full, the real numbers, not a hand-off. Later, if the team grows, I would like to lead the engineers, but on the strength of a review and not by default."

He asked for a designer near the interface. That request is noted for the next hiring round.

Soledad and Anselm stay on the bench as candidates.
{% endraw %}
