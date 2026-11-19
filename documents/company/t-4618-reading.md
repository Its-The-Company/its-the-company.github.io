---
layout: "default"
title: "T 4618 reading"
section: "documents"
description: "Answering Evan&#x27;s 2:40 PM ET Mon 11-16 message on #41 (c6927100090, &quot;You may increase the merge limit if needed&quot;): here is the two-day reading of the raised merge limit (12 to 20). It was due 3:00 PM Wed 11-18 and the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4618-reading.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 29 · Thu Nov 19</span><span><code>ops/plans/T-4618-reading.md</code></span></div><h1>T 4618 reading</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Answering Evan's 2:40 PM ET Mon 11-16 message on #41 (c6927100090, "You may increase the merge limit if needed"): here is the two-day reading of the raised merge limit (12 to 20). It was due 3:00 PM Wed 11-18 and the Operator ran it late, just after 12:00 AM Thu 11-19. It uses the fixed window it was meant to cover: 2:40 PM 11-16 to 3:00 PM 11-18.

**The number.** Of the attempts that joined the merge line with 12 or more tasks waiting, 72% landed on the first try (132 of 184). The rule was to go back to 12 if this fell under 65%, so the limit stays at 20 and nothing in ops/merge_capacity.json changes.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" data-n="2" style="--tw:457px" markdown="1">

| Waiting when it joined | Attempts | Landed first try |
|---|---|---|
| 12 to 19 | 96 | 78% (75) |
| 20 or more | 88 | 65% (57) |
| 12 or more | 184 | 72% (132) |
| 0 to 5 | 0 | none joined in the window |

</div>


Because the queue never dropped below 12 in these two days, there is no 0 to 5 band in the window. For comparison, the same count on the 11-10 to 11-16 2:26 PM window gave 66% at 0 to 5 (40 of 61), 64% at 6 to 11, 48% at 12 to 19 and 30% at 20 or more. That window includes the 11-10 reset and the red-test period, so it is not read as a like-for-like baseline.

**Caveats.** The 20 or more band sits at exactly 65%, so it is the weak spot to watch. This count does not reproduce the 573 attempts in the first reading (c6926825727); it counts a trip to the merge line from its first "waiting to merge" row to its landing, send-back or reset, so it has fewer attempts. A second way (every landing or reset, with the waiting count at that moment) gave 83% at 12 or more in the same window. Both are above 65%.

**Decision.** Keep the limit at 20. Jeremy has not answered the Double Spread question (limit 30 for app work only, or keep 20), and no <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> since 11-16 has set the limit, so it stays 20 until he answers. The split from 11-17 (app 20, process and site 8, gate and scheduler 1) is unchanged.

**How to rerun it.** `python3 tools/merge_limit_reading.py ops/metrics 2026-11-16T19:40:00Z 2026-11-18T20:00:00Z` (times in UTC; 2:40 PM ET is 7:40 PM UTC).

(Posted here because #41 has reached its comment limit.)
{% endraw %}

</div>
