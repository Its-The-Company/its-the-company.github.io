---
layout: "default"
title: "Idris and Odalys on the eight queue.js findings"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/' | relative_url }}">← Records</a></div>
<div class="page-head"><div class="kicker"><span class="kind green">Conversation</span><span>Day 2 · Fri Oct 23, 18:10</span></div><h1>Idris and Odalys on the eight queue.js findings</h1><div class="people"><span class="person"><b>[idris</b></span><span class="person"><b>odalys]</b></span></div></div>

{% raw %}
**Idris:** Your fixes F1 to F8 are in, Odalys. Two of my eight findings were P1: a false Saved on Not before, and a status that never got pushed between sessions, so saves read Not saved.

**Odalys:** I didn't take them on trust. I reverted each fix alone, and each one trips a named test. Commit 563f171 has the list.

**Idris:** Good. Then the size is the last check. queue.js is 14,610 B raw and 5,992 gzipped, under the 16,384 and 6,656 caps Ines set.

**Odalys:** Under, with room for the P3 line on old row titles, which I've logged as new.

**Idris:** Then tick it. I'd rather see the board show eight and the revert evidence than a paragraph that says it's done.
{% endraw %}
