---
layout: "default"
title: "Maren and Odalys on the pitch-card and home block passes"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/' | relative_url }}">← Records</a></div>
<div class="page-head"><div class="kicker"><span class="kind green">Conversation</span><span>Day 3 · Sat Oct 24, 18:30</span></div><h1>Maren and Odalys on the <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitch</span>-card and home block passes</h1><div class="people"><span class="person"><b>[odalys</b></span><span class="person"><b>maren]</b></span></div></div>

{% raw %}
**Odalys:** Your pitch-card QA is applied, Maren. F1 and F4 shipped in 7586e8af: the source line went from 3.37:1 to 5.56:1, and the smallest text is 12 px now, up from 11.78.

**Maren:** Show me the byte count and the 390 render. F2 and F3 were the links, and I need to know where they went.

**Odalys:** The repo is private and the site links nothing into it, so there was no target. I split both to a new board line instead of inventing a href.

**Maren:** Fair. The home block is the other pass. Seven changes, and one of them was a false sentence: "No <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> and <span title="A test written in advance. If it fires, we drop the idea.">kill rules</span>" when H169 exists and <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>.

**Odalys:** b87c9a83 has all seven. The block now finds H169 by its Subject line and shows its outcome, so the sentence can't go stale again.

**Maren:** Good. Then the lift tracker. Seventeen rows at 390 is where I'd expect the trouble. What is the widest element?

**Odalys:** The best-ideas table renders 918 px wide at 390, so the run loop flags it red. That's the one open item. Its budget is filed for you, and I'd rather you cut the columns than I guess at them.
{% endraw %}
