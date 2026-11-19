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

<nav class="fld-grid" aria-label="Folders"><a class="btn fld" href="{{ '/documents/pywidget/' | relative_url }}"><span id="pywidget-plan"></span><span id="pywidget-research"></span><span id="pywidget-design"></span><span id="pywidget-release"></span><b>Pywidget</b><small>5 folders · 414 documents</small></a><a class="btn fld" href="{{ '/documents/restructuring/' | relative_url }}"><b>The Restructuring</b><small>2 folders · 25 documents</small></a><a class="btn fld" href="{{ '/documents/reports/' | relative_url }}"><span id="reports"></span><b>Reports</b><small>53 documents</small></a><a class="btn fld" href="{{ '/documents/company/' | relative_url }}"><span id="company"></span><b>Company</b><small>2 documents</small></a><a class="btn fld" href="{{ '/documents/operations/' | relative_url }}"><b>Operations</b><small>104 documents</small></a><a class="btn fld" href="{{ '/documents/write-ups/' | relative_url }}"><span id="write-ups"></span><b>Write-ups</b><small>2 documents</small></a></nav>

<div class="ix">

<h2 id="newest">Newest documents</h2>
<p class="meta">By the date each document gives.</p>
<div class="cards"><a class="card" href="{{ '/documents/company/t-4618-reading.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Day 29 · Thu Nov 19</span></span><b>T 4618 reading</b><p>Answering Evan's 2:40 PM ET Mon 11-16 message on #41 (c6927100090, "You may increase the merge limit if needed"): here is the two-day reading of the…</p></a><a class="card" href="{{ '/documents/pywidget/t4773-f20116b9-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Pernille</span><span>Day 29 · Thu Nov 19</span></span><b>Review of T-4773 at f20116b9: the rerun rule compares dates</b><p>PASS. The formula is correct on every case I was asked to check (past ask, nil ask, clock set back, floor against <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, time zone) and on the…</p></a><a class="card" href="{{ '/documents/pywidget/t4761-093bcb77-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Pernille</span><span>Day 29 · Thu Nov 19</span></span><b>Review of T-4761 at 093bcb77: state.json in L5 s5.1's layout under pywidget.state/1</b><p>PASS with findings. The written layout is L5 s5.1's subset field for field, the cap is s5.4's measure, later files are read and carried, the T-4554…</p></a><a class="card" href="{{ '/documents/pywidget/t4748-f70982a0-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Pernille</span><span>Day 29 · Thu Nov 19</span></span><b>Review of T-4748 at f70982a0: the widget token alphabet is letters only</b><p>The change is right and it ships nothing. Both files are in the PyWidgetUITests bundle only (project.yml: its sources are UITests and…</p></a><a class="card" href="{{ '/documents/pywidget/t4640-1afa9858-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Pernille</span><span>Day 29 · Thu Nov 19</span></span><b>Review of T-4640 at 1afa9858: a location fix that arrives after Choose a Place is left is dropped</b><p>The change does what M2 asked, in the way M2 suggested. The run lives in view state (CurrentFixRun). It is cancelled when the screen disappears, and…</p></a><a class="card" href="{{ '/documents/pywidget/t4183-cc9297f4-idris.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Idris</span><span>Day 29 · Thu Nov 19</span></span><b>Review of T-4183 at cc9297f4: T-4533, the premade settings save on disk errors and the sync before the rename</b><p>PASS with findings. The atomic write is right on both halves: the temp file is written whole, flushed with F_FULLFSYNC (plain fsync as fallback)…</p></a></div>

<p class="meta"><span id="hunt"></span><span id="best-ideas"></span><span id="method-v2"></span><span id="v2-rulings"></span><span id="hunt-funnel"></span><span id="hunt-looked"></span><span id="hunt-notes"></span><span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span>, the idea hunt and the Day 1 and 2 market research stopped on 2026-10-25: <a href="{{ '/documents/archive/' | relative_url }}">Archive</a>, <a href="{{ '/documents/hunt/' | relative_url }}">the idea hunt at a glance</a>, the <a href="{{ '/documents/ideas/' | relative_url }}">Ideas library</a>.</p>

<p class="meta" id="held">18 documents stay off the public site; each folder names its own with the reason.</p>

</div>
