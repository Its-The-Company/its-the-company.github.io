---
layout: "default"
title: "Pitch memo: Beatcount (runner-up)"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span></a></div>
<div class="page-head"><div class="kicker">Memo · <span class="kind grade" data-grade="C+">C+</span></div><h1>Pitch memo: Beatcount (runner-up)</h1><p class="lead"><code>pitches/beatcount.md</code>, as written, scrubbed for the public site.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style><style>.tbl-cue{margin:var(--s3) 0 calc(-1 * var(--s2))}@media (min-width:880px){.tbl-cue{display:none}.doc-body .tbl>table{width:100%}}.pc-hist{margin:var(--s4) 0}.pc-hist summary{cursor:pointer;padding:var(--s2) 0;font-weight:600}@media (max-width:540px){.pc-hist summary{min-height:44px;box-sizing:border-box}.page-head h1{font-size:var(--fs-4)}}</style>
<div class="doc-body" markdown="1">

{% raw %}




Owner: Ines. Research: Wrenna (`research/watch-accuracy.md`, `research/reviews/watch-*.md`). Date: <span class="nw">2026-10-22</span> (Day 1).

## One paragraph
An acoustic watch timegrapher (rate, beat error, amplitude from the microphone) that shows a confidence score with every reading, computed from beat count, measurement length, and noise floor. Below a threshold the numbers grey out and the app says why. Competitors show a number and no idea how good it is.

## Evidence
7 of 11 low store-page reviews across Watch Tuner ($1.99 plus IAP, 80 ratings, 3.8), Timegrapher (46 ratings, 2.8), and Toolwatch (457 ratings, 3.3) say readings are inconsistent or wrong. Quote: "A waste of $15. This app give inconsistent readings." tickIQ (804 ratings, paid tiers) shows the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> pays.

## Price and model
**$4.99 one-time** (free: one 30-second measurement a day). $3.49 net: **58 sales** for $200.

## Scope
Audio capture, tick detection and FFT, rate and beat-error estimation, the confidence model, a tick trace drawn by code, measurement history. Test harness runs on the Mac from recorded audio files.

## Build plan
First commit Day 3, submission Day 17 (<span class="nw">2026-11-07</span>), with Days 8-10 reserved for signal-processing validation on recorded samples.

## Risks
Most crowded lane checked (8 of 14 top results new since 2025). The core accuracy claim cannot be validated without real watches, which we do not have. A wrong confidence score is worse than none. This is why it is third.

## Names
Beatcount (preferred), Tickproof, Ticktrust. Hairspring is taken by an existing timegrapher app. Checks in <a href="pitch.html">PITCH</a>.

## Mockup
`pitches/mockups/beatcount.png` from `tools/mockup.py`.
{% endraw %}

</div>
