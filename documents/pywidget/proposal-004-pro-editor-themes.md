---
layout: "default"
title: "PROPOSAL-004: three Pro editor theme pairs (C51, DRAFT)"
section: "documents"
description: "Each pair is a light and a dark set that follows the system appearance, as the free pair does, and each has a 7:1 Increase Contrast set."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/' | relative_url }}">← Build Plan</a><a href="{{ '/documents/pywidget/proposal-004-pro-editor-themes.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Proposal</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/proposals/PROPOSAL-004-pro-editor-themes.md</code></span></div><h1>PROPOSAL-004: three Pro editor theme pairs (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>, DRAFT)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: **draft for creative approval (Commandment 51). Not shipping.** Maren, T-0271, 2026-10-26 20:33 ET. Due by Day 11 (2026-11-01).
- Why: DECISION-2026-10-26-revenue-gap.md s3 puts editor themes in Pro beside the premades. ADR-004 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 3: v1 ships only the approved pair (Quill light, Lumen dark); any extra theme goes to the Investors first. The Pro `themes` row ships only if this is approved by Day 12 (2026-11-02); otherwise the row is off and Pro ships premades only. The picker is T-0272 (Idris), built only after approval.
- Preview: `pywidget/docs/design/themes-pro/preview.png` (772 x 1052 px, 279 KB). The free pair first, then each draft, light and dark, on one 12-line code sample (every role, a selection, the current line with the caret, one inline error).
- Source: `pywidget/docs/design/themes-pro/themes.json` (draft values and their OKLCH seeds). Script: `themes_pro.py` (pick, check, draw). Nothing is in tokens.json, tokens-app.json, Theme.xcassets or tokens.css.

## The options

Each pair is a light and a dark set that follows the system appearance, as the free pair does, and each has a 7:1 Increase Contrast set.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The options, scrolls sideways" style="--tw:1022px" markdown="1">

| Option | Character | Light page / keyword / string / function | Dark page / keyword / string / function |
|---|---|---|---|
| **A. Ember** | Warm. Cream page, brown-black night; rust keywords, olive strings, ochre numbers, one cool blue for functions | #FCF6EE / #993608 / #456110 / #195A8A | #19120E / #E88E6B / #90AF69 / #79AAD3 |
| **B. Fern** | Green and calm. Pale sage page, green-black night; green keywords, copper strings, rose numbers, violet built-ins | #F1F8F2 / #08662E / #8C4809 / #096071 | #0C1510 / #66B779 / #DA976A / #67B0C7 |
| **C. Graphite** | Quiet. Neutral grey; only keywords (slate blue), strings (green) and comments (grey) take colour, the rest is ink | #F7F8FA / #2E4376 / #1E6249 / #14171C | #141517 / #A9BCF2 / #89C3A9 / #F5FAFE |

</div>


**Recommendation: approve all three as the Pro set.** Three pairs make a row worth listing on the paywall; one does not. If only one is approved, Graphite: it serves a need the free pair does not (reading code with little colour), where Ember and Fern are matters of taste.

## Rules every pair keeps

- **Syntax keys only.** Each set <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> exactly the 22 keys of the shipped `Syntax*` colour sets. No new token names, so the adapter takes a theme as data (ADR-004 ruling 3) and Swift holds no hex.
- **Contrast.** `python3 pywidget/docs/design/check_tokens.py --themes themes-pro/themes.json`: 1,804 pairs, **0 fails** (780 of them the drafts: 65 per set, 12 sets). Every text role 4.5:1 on bg, current line, selection, IME marked text and find match; line numbers 4.5:1 on the gutter and the current line; caret and invisibles 3:1. Closest standard pair: invisibles on selection 3.20:1 (floor 3.0).
- **7:1 sets.** Derived, not picked: `appearance.syntax_hc`, the method the free pair uses (lightness moves only, hue kept). 6 to 13 colours move per set; every text role reaches 7:1, caret and invisibles 4.5:1. The gutter hairline moves to 3:1 on its own page (the free pair takes the app's line colour instead).
- **Control.** `python3 themes-pro/themes_pro.py check` runs the check, then a broken copy with three planted faults (a 2.2:1 comment in Ember light, an extra key in Fern dark, a vanishing caret in Graphite dark). Result: exit 1, all three caught, nothing else flagged.
- **Find matches** = selection, as approved now. If the find-tint question (ops/questions.md, T-0232) is approved as A, each theme takes its own tint by the same rule.
- **Role distance.** The closest coloured roles sit 0.068 to 0.08 apart in OKLab (the free pair: 0.053 to 0.067). Graphite repeats colours on purpose: function = text; type = built-in; decorator = keyword.

## Not shown, not decided

- The 7:1 sets are checked by script but not drawn in the preview.
- Names (Ember, Fern, Graphite) are working names; they appear in the picker, so they are part of this approval.
- Seen in the preview, not mine to change: in Lumen dark the selection on `today` (line 7) is faint against the page (#28234F on #0E1120). Text on it passes 4.5:1; the fill itself is not a boundary.
{% endraw %}

</div>
