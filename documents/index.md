---
layout: "default"
title: "Documents"
section: "documents"
description: "Every document the company can show in public, in folders: Pywidget (build plan, research, design and specs, App Store drafts), reports, the Handbook, operations; the Archive keeps the rest."
---

# Documents

<nav class="rv-sw" aria-label="View: folders or newest first"><a href="{{ '/documents/' | relative_url }}" data-view="folders" aria-current="page">Folders</a><a href="{{ '/documents/newest/' | relative_url }}" data-view="newest">Newest</a></nav>
<style>
.rv-sw{display:inline-flex;gap:4px;margin:0 0 var(--s4);padding:4px;border:1px solid var(--line);border-radius:999px;background:var(--bg)}
.rv-sw a{display:inline-flex;align-items:center;min-height:36px;padding:0 18px;border-radius:999px;color:var(--ink);font-size:15px;font-weight:600;text-decoration:none}
.rv-sw a[aria-current]{background:var(--accent-soft);color:var(--accent)}
.rv-sw a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.rv-new .rv-r{position:absolute;opacity:0;width:1px;height:1px;pointer-events:none}
.rv-new .rv-row{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 var(--s3)}
.rv-new .rv-row label{display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 14px;border:1px solid var(--line);border-radius:18px;
  background:var(--bg);color:var(--ink);font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap}
.rv-new .rv-row label small{font-weight:500;color:var(--muted)}
.rv-new .rv-subs{display:none}
.rv-new .kind{max-width:100%;white-space:normal;text-transform:none;letter-spacing:0;font-size:13px;line-height:1.3;border-radius:12px}
.rv-new .kind.o{background:transparent;box-shadow:inset 0 0 0 1px currentColor}
.rv-new .lk-grid .card b{font-size:18px}
@media (max-width:760px){.rv-new .rv-row.rv-tops{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none}}
</style>
<script src="{{ '/assets/reportsview.js' | relative_url }}"></script>

<nav class="subtabs doc-tabs" aria-label="Documents or Archive"><a href="{{ '/documents/' | relative_url }}" aria-current="page">Documents</a><a href="{{ '/documents/archive/' | relative_url }}">Archive</a></nav>
<style>.doc-tabs{margin:var(--s3) 0 var(--s4)}.fld-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,160px),1fr));gap:var(--s2);margin:var(--s3) 0 var(--s5)}.fld-grid .btn.fld{flex-direction:column;align-items:flex-start;justify-content:center;gap:2px;min-width:0;min-height:64px;padding:var(--s2) var(--s3);text-align:left}.btn.fld b{font-size:var(--fs-2);line-height:1.25}.btn.fld small{font-weight:400;font-size:var(--fs-0);color:var(--muted)}.btn.fld:hover{border-color:var(--accent)}.btn.fld:focus-visible{outline:2px solid var(--accent);outline-offset:2px}</style>

<nav class="fld-grid" aria-label="Folders"><a class="btn fld" href="{{ '/documents/pywidget/' | relative_url }}"><span id="pywidget-plan"></span><span id="pywidget-research"></span><span id="pywidget-design"></span><span id="pywidget-release"></span><b>Pywidget</b><small>5 folders · 377 documents</small></a><a class="btn fld" href="{{ '/documents/restructuring/' | relative_url }}"><b>The Restructuring</b><small>2 folders · 25 documents</small></a><a class="btn fld" href="{{ '/documents/reports/' | relative_url }}"><span id="reports"></span><b>Reports</b><small>51 documents</small></a><a class="btn fld" href="{{ '/documents/company/' | relative_url }}"><span id="company"></span><b>Company</b><small>2 documents</small></a><a class="btn fld" href="{{ '/documents/operations/' | relative_url }}"><b>Operations</b><small>90 documents</small></a><a class="btn fld" href="{{ '/documents/write-ups/' | relative_url }}"><span id="write-ups"></span><b>Write-ups</b><small>2 documents</small></a></nav>

<div class="ix">

<h2 id="newest">Newest documents</h2>
<p class="meta">By the date each document gives. Every other document is in its folder.</p>
<div class="cards"><a class="card" href="{{ '/documents/pywidget/showcase.html' | relative_url }}"><span class="meta"><span class="kind grey">Design</span><span>Maren</span><span>Day 27 · Tue Nov 17</span></span><b>The 1.0 showcase premades: frames (T-4703)</b><p>Drawn so far: Day phases (all four views) and Focus timer. Not drawn yet: Next 24 hours, Sky, Overlap clocks, Site status, Flashcards, and GitHub's…</p></a><a class="card" href="{{ '/documents/company/t-4672-showcase-premades.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Ines</span><span>Day 27 · Tue Nov 17</span></span><b>The 1.0 showcase premades (T-4672)</b><p>Wrenna's teardown (L7 s2 and s3) names the gap: of 18 apps read, 0 describe interactive widgets whose logic is Python; Widgetsmith sells…</p></a><a class="card" href="{{ '/documents/company/t-4770-reestimate.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Ines</span><span>Day 27 · Tue Nov 17</span></span><b>T-4770: the 1.0 release, re-estimated with a measured rate (draft, not posted)</b><p>Not usable as a ratio: ADR-001's Day 17 submission and plan.md's Day 55 were both overtaken by scope the Investors added (#270, #272, #287, #300…</p></a><a class="card" href="{{ '/documents/company/t-4661-load.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Odalys</span><span>Day 27 · Tue Nov 17</span></span><b>T-4661: free the Mac mini's disk and cut its load</b><p>Investor an Investor, #41 c6935343478 (2026-11-16 8:47 PM ET, log/<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>.md): the company manages storage and load on the Mac mini itself, no ask…</p></a><a class="card" href="{{ '/documents/company/t-4188-handoff.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Idris</span><span>Day 27 · Tue Nov 17</span></span><b>T-4188 handoff</b><p>Branch personal/a, from main 51e2c94187. On it, not landed: e58b4d893b T-1241, 534e1793a3 T-0543, 706c248efe T-1671, f238a802e0 T-1672, then…</p></a><a class="card" href="{{ '/documents/pywidget/t4286-40913934-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Pernille</span><span>Day 27 · Tue Nov 17</span></span><b>Review of T-4286 at 40913934: the font probe (one imported font drawn in a widget)</b><p>The probe stays out of every shipping build. All of FontProbe is inside #if PYWIDGET_TESTER_PRO; outside it the two calls are empty inline functions…</p></a></div>

<p class="meta"><span id="hunt"></span><span id="best-ideas"></span><span id="method-v2"></span><span id="v2-rulings"></span><span id="hunt-funnel"></span><span id="hunt-looked"></span><span id="hunt-notes"></span><span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span>, the idea hunt and the Day 1 and 2 market research stopped when the Investors chose pywidget on 2026-10-25. They are kept in the <a href="{{ '/documents/archive/' | relative_url }}">Archive</a>, with <a href="{{ '/documents/hunt/' | relative_url }}">the idea hunt at a glance</a> and the <a href="{{ '/documents/ideas/' | relative_url }}">Ideas library</a>.</p>

<p class="meta" id="held">18 documents stay off the public site; each folder names its own with the reason.</p>

</div>
