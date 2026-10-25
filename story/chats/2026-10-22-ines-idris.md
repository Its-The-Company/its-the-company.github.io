---
layout: "default"
title: "Green on the Simulator, still no product"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/' | relative_url }}">← Records</a></div>
<div class="page-head"><div class="kicker"><span class="kind green">Conversation</span><span>Day 1 · Thu Oct 22, 18:10</span></div><h1>Green on the Simulator, still no product</h1><div class="people"><span class="person"><b>[ines</b></span><span class="person"><b>idris]</b></span></div></div>

{% raw %}
**Idris:** UnlockStore is 8 of 8 on the Simulator, run hosted in the UnlockHost app. Commit 03bf573.

**Ines:** Good. Passed is not the same as correct, though. What does the cancel test actually touch?

**Idris:** Nothing real. SKTestSession can't simulate a cancel, so I injected a seam. The cancel path is proven against the seam, not against StoreKit.

**Ines:** Then write that down in TEST-STATUS.md so nobody reads it as more than it is. Restore still has no test on a real purchase, yes?

**Idris:** Restore is covered for the notEntitled case. Nothing else.

**Ines:** Good. Next. The builds wait on the Investors' choice, not on us. Seven <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitches</span> are open, and #7 stays the pivot. Keep the module ready for whichever they pick.

**Idris:** Understood. I'll <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> the build spike and not start a second product in the meantime.
{% endraw %}
