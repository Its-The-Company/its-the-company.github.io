---
layout: "default"
title: "T-0472 handoff (paused 2026-11-28, lane a2, Idris)"
section: "documents"
description: "The code is on main: 0b716f874e &quot;T-0472 Idris: partial, s5 corner slot per Lock Screen family&quot; (TreeView.swift; three tests in CardMarksTests; PyWidgetTests 2833/0 on 11-28)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-0472-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 38 · Sat Nov 28</span><span><code>ops/plans/T-0472-handoff.md</code></span></div><h1>T-0472 handoff (paused 2026-11-28, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a2, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The code is on main: 0b716f874e "T-0472 Idris: partial, s5 corner slot per Lock Screen family"
(TreeView.swift; three tests in CardMarksTests; PyWidgetTests 2833/0 on 11-28).

Left to finish the task:
1. Re-shoot with `WK_ONLY=testDLockScreenAccessories pywidget/ios/scripts/widgetkit_check.sh` into a
   scratch folder (`python3 tools/scratch.py new T-0472 --worker Idris`; the script deletes wk-*.png
   where it writes). Twice on 11-28 (7:30-8:10 AM) the Simulator gate refused it with exit 75 (load 70-105
   on the Mac mini; it runs once load is under 40). No shot was taken, so it is no test result.
2. Look at the circular corner mark in the new shot; Maren confirms the circular placement.
3. Copy the accessory and lock PNGs into ops/site-checks/renderer-v1/widgetkit/ and commit them in the
   commit that finishes the task ("T-0472 Idris:", with Plain/Evidence/ws lines).
{% endraw %}

</div>
