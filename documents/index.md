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

<nav class="fld-grid" aria-label="Folders"><a class="btn fld" href="{{ '/documents/pywidget/' | relative_url }}"><span id="pywidget-plan"></span><span id="pywidget-research"></span><span id="pywidget-design"></span><span id="pywidget-release"></span><b>Pywidget</b><small>5 folders · 480 documents</small></a><a class="btn fld" href="{{ '/documents/restructuring/' | relative_url }}"><b>The Restructuring</b><small>2 folders · 25 documents</small></a><a class="btn fld" href="{{ '/documents/reports/' | relative_url }}"><span id="reports"></span><b>Reports</b><small>69 documents</small></a><a class="btn fld" href="{{ '/documents/company/' | relative_url }}"><span id="company"></span><b>Company</b><small>3 documents</small></a><a class="btn fld" href="{{ '/documents/operations/' | relative_url }}"><b>Operations</b><small>138 documents</small></a><a class="btn fld" href="{{ '/documents/write-ups/' | relative_url }}"><span id="write-ups"></span><b>Write-ups</b><small>2 documents</small></a></nav>

<div class="ix">

<h2 id="newest">Newest documents</h2>
<p class="meta">By the date each document gives.</p>
<div class="cards"><a class="card" href="{{ '/documents/company/t-4181-handoff.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Day 38 · Sat Nov 28</span></span><b>T-4181 handoff (Operator, from Idris's report, 2026-11-26 ET, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a)</b><p>This session resumed the 11-25 <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch (parked/a/20261125-233308-38972) and did not start over.</p></a><a class="card" href="{{ '/documents/company/t-0472-handoff.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Idris</span><span>Day 38 · Sat Nov 28</span></span><b>T-0472 handoff (paused 2026-11-28, lane a2, Idris)</b><p>The code is on main: 0b716f874e "T-0472 Idris: partial, s5 corner slot per Lock Screen family" (TreeView.swift; three tests in CardMarksTests…</p></a><a class="card" href="{{ '/documents/pywidget/t4181-8e35d2dd-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Pernille</span><span>Day 38 · Sat Nov 28</span></span><b>Review of T-4181 at main..8e35d2dd (T-4775, T-5018): a late tap gets a run of its own; the due moment is pinned</b><p>T-5018 does what its L1 asked. T-4775's lock is right, and so is its seam, but the tap's own run is not on the tap's clock. The code comment says it…</p></a><a class="card" href="{{ '/documents/pywidget/t4181-8507c64b-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Pernille</span><span>Day 38 · Sat Nov 28</span></span><b>Re-review of T-4181 at main..8507c64b: the late tap's run is on its caller's clock</b><p>No Xcode run of my own. tools/land_mutants.py status --id idris-t4775-m1 shows all 7 mutants KILLED at base 8507c64b9e…</p></a><a class="card" href="{{ '/documents/pywidget/t-5080-in-app-gallery-precedent.html' | relative_url }}"><span class="meta"><span class="kind grey">Research</span><span>Wrenna</span><span>Day 37 · Fri Nov 27</span></span><b>T-5080: in-app gallery precedent (other people's code, run inside an App Store app)</b><p>Question. Is there any current App Store app whose in-app gallery lets people browse, install and run other people's general code (Python, JavaScript…</p></a><a class="card" href="{{ '/documents/pywidget/pkg-sandbox-t0801-review-odalys.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Day 37 · Fri Nov 27</span></span><b>T-0802: independent re-review of T-0801 (pkg_sandbox Mach default-deny), Odalys, 2026-11-21</b><p>Most of the bar is met, and well. Three things are not, and T-0299 does not <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> on this review.</p></a></div>

<p class="meta"><span id="hunt"></span><span id="best-ideas"></span><span id="method-v2"></span><span id="v2-rulings"></span><span id="hunt-funnel"></span><span id="hunt-looked"></span><span id="hunt-notes"></span><span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span>, the idea hunt and the Day 1 and 2 market research stopped on 2026-10-25: <a href="{{ '/documents/archive/' | relative_url }}">Archive</a>, <a href="{{ '/documents/hunt/' | relative_url }}">the idea hunt at a glance</a>, the <a href="{{ '/documents/ideas/' | relative_url }}">Ideas library</a>.</p>

<p class="meta" id="held">18 documents stay off the public site; each folder names its own with the reason.</p>

</div>
