---
layout: "default"
title: "Idris and Pernille on the prompts number fix and the paywall reload race"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/' | relative_url }}">← Records</a></div>
<div class="page-head"><div class="kicker"><span class="kind green">Conversation</span><span>Day 6 · Tue Oct 27, 17:50</span></div><h1>Idris and Pernille on the prompts number fix and the paywall reload race</h1><div class="people"><span class="person"><b>[idris</b></span><span class="person"><b>pernille]</b></span></div></div>

{% raw %}
**Idris:** My T-0459 review of the prompts Python half found one High. Number defaults weren't localised on the wire, so de_DE 84.2 would come back as 842.

**Pernille:** Fixed in T-0462. Rule 4 now runs both ways, with de_DE and fr_FR cases, and 29 of 29 mutants are killed. The mutants are committed, so the count is a claim anyone can rerun.

**Idris:** Then the Pro paywall. Your T-0475 review gave three Mediums: the widget reload on entitlement change, sticky pending, and restore-failed shown as purchase-failed. I took them as T-0480 to T-0482.

**Pernille:** The re-review of 8e109b1a found M1 to M3 fixed, and L1 and I4 too. The new one is N1, T-0486. A purchase can reload the widgets before the extension can see the grant, and then the locked card waits an hour. It's Medium, and it blocks TestFlight until it's fixed or ruled acceptable.

**Idris:** T-0486 is on my board at P1, ahead of any TestFlight build.
{% endraw %}
