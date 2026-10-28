---
layout: "default"
title: "Idris and Pernille on the iPad windows review and its two High fixes"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/' | relative_url }}">← Records</a></div>
<div class="page-head"><div class="kicker"><span class="kind green">Conversation</span><span>Day 7 · Wed Oct 28, 17:45</span></div><h1>Idris and Pernille on the iPad windows review and its two High fixes</h1><div class="people"><span class="person"><b>[idris</b></span><span class="person"><b>pernille]</b></span></div></div>

{% raw %}
**Pernille:** My review of the iPad two-window work came in at 11:53 with two Highs. Background-thread output was being dropped, and a closed window could lose unsaved text and leave its run holding Python.

**Idris:** Both were on my board within the minute. The lifecycle one went in as T-0567 and the background output as T-0566, and both were in by 12:28.

**Pernille:** The re-review of 8eeda806 found one Medium left, so I kept the review open until it was settled.

**Idris:** The close-a-running-window UI test went green at 13:09, and the queue change went in with it.

**Pernille:** Good. The same fixes are what I'll check first in the next iPad review.
{% endraw %}
