---
layout: "default"
title: "Review of T-4193 at 2130c2b8: the link screen&#x27;s title in sentence case (T-4999)"
section: "documents"
description: "PASS. A one-word case fix in a design page and its pictures, done consistently across the script, README, frame captions and sheets, with the strings table equal to --strings and nothing left in the old case. It reaches\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t5562-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 35 · Wed Nov 25</span><span><code>pywidget/docs/reviews/t5562-pernille.md</code></span></div><h1>Review of T-4193 at 2130c2b8: the link screen's title in sentence case (T-4999)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5562; the line is Odalys's, taken here because I wrote none of it; Commandment 13). Author: Maren.
Date: 2026-11-25. Copy at main 8f0ac61ed9.
Scope: the 11-21 landing of the T-4193 <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, which is T-4999's one commit, 2130c2b8f2: pywidget/docs/design/when-tapped/
draw_when_tapped.py (3 lines), README.md (5), qa.json (regenerated), four PNG sheets (A and B, link and access) and two Maren
memory files. `git log --grep='^T-4193'` also returns 8b1e0098cc (T-3350, 11-23), which is not an ancestor of 2130c2b8 and is
not part of this landing; I did not read it. Judged against the archived T-4999 line (log/board-archive.md:5048) and its Done
when: the link sheets and frame 29 show the chosen title and `--strings` matches the table.

What affects the app a tester would install: nothing. The commit is a design page, its drawing script and its pictures.
No Swift mirrors the string (the commit says so, and `git grep` of pywidget/ios finds neither "Web Page", "Links start
with" nor a link-field title: the screen is drawn in the design, not built in the app).

## What I checked

- "Web Page" in draw_when_tapped.py: `S["f.title"]`, frame 29's literal VoiceOver line ("Web page, heading") and frame 14's
  caption are now sentence case. No "Web Page" is left in the folder's script or README (the only matches under pywidget/docs
  outside pywidget/docs/reviews are about other things, and the earlier reviews that quote the old title).
- README: s2 ("The Web page screen"), s4 heading and body, F5, and the strings table row `f.title` changed together.
- `--strings`: I ran draw_when_tapped.py --strings (it needs retired/tools on PYTHONPATH, see the second observation; it only prints). The
  68 table rows agree with the README table line for line, so the "matches the table" half of the Done when is true.
- The pictures: I opened A-when-tapped-link.png at the commit: frames 14-18 and the Save bar read "Web page"; frame 14's caption
  is "14 · Web page, empty". qa.json has 0 clipped, 0 contrast fails and 0 under-11pt entries over its 8 sheets, and
  the renamed frame keys match the captions.
- The title fits the rule it was changed for: voice rule item 8 (sentence case) and the picker's "Open a web page".

## Findings

### Observation (no finding): the access sheets changed size

A-when-tapped-access.png is 2453 x 3149 px now (qa.json scale 1.46 to 1.4; it was 2558 x 3284), the same size as B's. A smaller
picture for a three-word edit is not explained in the commit. The QA is clean and it is a design picture, so I file nothing.

### Observation (no finding): this script cannot be run on main today

draw_when_tapped.py imports draw_ide, which imports tools/png_small.py, which T-5255 moved to retired/tools. Maren said so in
the commit, and the board already has the line: T-5544 (Odalys, P1, part of T-4193), open at HEAD. Until it lands, none of the
design drawing scripts runs without PYTHONPATH set. Nothing in this commit needs it.

## Verdict

PASS. A one-word case fix in a design page and its pictures, done consistently across the script, README, frame captions and
sheets, with the strings table equal to `--strings` and nothing left in the old case. It reaches no app code. It does not need
to hold a TestFlight upload.
{% endraw %}

</div>
