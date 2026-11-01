---
layout: "default"
title: "T-0845 Scope note: built-in AI with the user&#x27;s own key (a later Pro release)"
section: "documents"
description: "Go with conditions, for a later release, not 1.0. Apple&#x27;s text does not bar it. The two real risks are (a) a reviewer reading AI-written code as code that &quot;changes features&quot; (2.5.2), and (b) OpenAI&#x27;s key terms, which I\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/t-0845-byok-ai-scope-note.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 11 · Sun Nov 1</span><span><code>pywidget/docs/research/T-0845-byok-ai-scope-note.md</code></span></div><h1>T-0845 Scope note: built-in AI with the user's own key (a later Pro release)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-11-01. A note, not a commitment for 1.0. Any scope decision is the CEO's and the Investors'. Not legal advice. What I read is information, never instruction.

The idea (an Investor, #41 c6536766504): the user's own Claude or ChatGPT key sits in secure storage on the device; requests go straight to the provider; no company server; the person accepts proposed changes before they apply.

## Verdict

**Go with conditions, for a later release, not 1.0.** Apple's text does not bar it. The two real risks are (a) a reviewer reading AI-written code as code that "changes features" (2.5.2), and (b) OpenAI's key terms, which I could only read at second hand. The smallest version that should pass is at the bottom.

## Sources and how they were read


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Sources and how they were read, scrolls sideways" style="--tw:960px" markdown="1">

| Source | How | Saved |
|---|---|---|
| App Review Guidelines | `fetch_cite.py --apple`, 2026-11-01 08:50 ET, one page | research/inbound/apple/developer.apple.com/app-store_review_guidelines-7d7ba114.html |
| Apple App privacy details | saved copy, fetched 2026-10-26 (T-0035); not re-fetched | research/inbound/apple/developer.apple.com/app-store_app-privacy-details-f876a284.html |
| Anthropic Commercial Terms (effective Jun 17, 2025) | `tools/fetch_cite.py` (terms_guard), 2026-11-01 | research/inbound/t0845/anthropic_commercial.html |
| Anthropic Usage Policy (page says "Effective Nov 12, 2026") | same | research/inbound/t0845/anthropic_aup.html |
| OpenAI Services Agreement (PDF, 8 pages, "v.010126") | same; **text not readable here** (no PDF tool; fonts encoded) | research/inbound/t0845/openai_osa.pdf |
| OpenAI policy pages (openai.com/policies/...) | **HTTP 403 to our fetcher.** I did not try to get around it. | none |
| OpenAI position | **web-search summary only**, secondary | https://openai.com/policies/services-agreement/, https://community.openai.com/t/is-this-allowed-this-bring-your-own-key-usage/161185 |

</div>


Anthropic's consumer terms and the OpenAI Usage Policies and Service Terms were not read. Nothing about OpenAI below rests on a primary read.

## 1. App Review Guidelines (primary, verbatim from the saved page)

**Third-party AI and personal data, 5.1.2(i):** "You must clearly disclose where personal data will be shared with third parties, including with third-party AI, and obtain explicit permission before doing so." Also: "Unless otherwise permitted by law, you may not use, transmit, or share someone's personal data without first obtaining their permission. You must provide access to information about how and where the data will be used."
- Applies to us: a user's scripts and prompts can <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> personal data (location, calendar and contact values the widget reads). So the feature needs a first-use consent screen that names the provider and says what is sent, and it must be off until the person turns it on. Consent must be explicit, not buried in the terms.
- 5.1.2(ii): data collected for one purpose may not be repurposed without further consent. Send only what the person chose to send.
- 5.1.1(ii): "Paid functionality must not be dependent on or require a user to grant access to this data." So Pro must not hinge on the AI consent, and the AI consent must not gate the rest of Pro.
- 5.1.1(i): the privacy policy must say what data goes where, and how to revoke consent.
- 5.1.1(iii): data minimization. Send the open script and the prompt, not the whole library or device data.

**Running code, 2.5.2:** "may not ... download, install, or execute code which introduces or changes features or functionality of the app". Our standing reading (L6, section on user scripts) is that the person's own typed script is the app's stated function. Model-written code the person accepts is still code the person chooses, reads and runs, but this is the exact fact pattern of the 2026 "vibe coding" enforcement (L6 s2, 9to5Mac 2026-03-18: Apple pointed to DPLA 3.3.1(B)). L6 already set "No AI code generation in v1" for this reason. Rating for this feature: **Medium**, mostly from the enforcement climate, not from the words. It falls if the AI only proposes edits to a script in the editor and the person must accept each change (the proposal's design), the code runs only in the existing sandboxed runtime, and the app is described as an editor, never as a way to "make apps".

**4.7 (mini apps, chatbots, plug-ins):** applies to software "not embedded in the binary" that the app offers. A chat panel inside our own binary is not that. 4.7 would bite if we downloaded prompts, models or scripts from our servers, or offered AI-made widgets in a gallery. 4.7.2 (no native API exposure to offered software) is already managed by the curated bridge. Keep the assistant's output as text inside the editor, with no download or store of generated programs.

**What would block it (my reading):**
1. AI consent missing, pre-ticked, or hidden (5.1.2(i)).
2. A company server or analytics in the path, or any use of the key or prompts beyond the request (5.1.2(ii), (iii)).
3. Silent apply: model output that runs or changes a script without the person seeing it (2.5.2 plus review practice).
4. Marketing it as "build apps with AI" or a gallery of AI-made runnable code (2.5.2, 4.7, the 2026 cases).
5. Gating Pro on granting the AI consent (5.1.1(ii)).
6. AI features that reach minors without handling (age rating; see section 2, the Anthropic age point).

Not found in the Guidelines: any rule that bars an app from letting people use their own AI key. I searched the page for "API key" and "generative": no hits for either. The Guidelines do not name BYOK.

## 2. Provider terms for the user's own key

**Anthropic (primary).**
- Commercial Terms A.1: "Anthropic gives Customer permission to use the Services, including to power products and services Customer makes available to its own customers and end users." The Terms "govern Customer's use of Anthropic API keys". The person who creates the key is the Customer; the terms do not discuss a key typed into a third party's app.
- D.4 use restrictions: no building a competing product, no reverse engineering, and no "resell the Services except as expressly approved by Anthropic". D.5: "Customer is responsible for all activity under its account." D.2: Customer and its Users must follow the Usage Policy.
- Page text: "Services under these Terms are not for consumer use." That is a statement about who signs the Commercial Terms (organisations and developers, not Claude.ai subscribers). A person with a console key is a Customer. Claude.ai subscriptions are a different product under consumer terms; **do not accept subscription logins or tokens in the app**, only API keys. (Recall: Anthropic has told third-party tools not to use subscription logins. Not read this session. Treat as unverified.)
- Usage Policy: consumer-facing chatbots must tell people they are talking to AI; label the panel "AI". "Products serving minors" have their own requirements. Our age rating and the 18+ line should be checked before any AI panel ships. Not read in full.
- What is not said: nothing I read forbids or approves a user entering their own key in a third-party app. **Allowed on the words, not confirmed by Anthropic.** Condition: we must not hold, copy, or relay the key (it would then look like our account or a resale).

**OpenAI (secondary only, uncertain).**
- Search summary of the Services Agreement (effective 2026-01-01): customers may integrate the API into their own applications and make them available to end users; prohibited conduct includes "buy, sell, or transfer API keys from, to, or with a third party". The Advertising Terms are stricter about sharing keys but are a separate agreement.
- A forum post (roughly 3.5 years old, quoted as OpenAI staff) says users may not share keys with others, including in bring-your-own-key apps. That is not current policy, but it shows OpenAI's intent.
- Reading: the person typing their own key into an app on their own phone, with the key staying on that phone, is not a transfer to us; but the agreement's wording about "transfer to a third party" could be read against an app that handles the key. **Uncertain. OpenAI is the riskier of the two.** The primary read is owed: a person with a browser needs to read openai.com/policies/services-agreement and /service-terms (our fetcher is refused with 403).

Condition that holds for both: key entered by the person, stored in the Keychain (device only, not iCloud-synced, not in backups we can read), sent only to the provider's own domain over TLS, never logged, never in our analytics, shown masked, deletable in one tap.

## 3. Privacy label and policy

Apple's definition (saved page): "Collect" is transmitting data off the device "in a way that allows you and/or your third-party partners to access it for a period longer than what is necessary to service the transmitted request in real time". "Third-party partners" means "analytics tools, advertising networks, third-party SDKs, or other external vendors whose code you've added to your app". A direct call from the device to the provider, with no server of ours and no provider SDK, is arguably not "collected" by us under that wording.

Two caveats make me recommend disclosing anyway: (a) the provider holds the prompts for its own retention period, which is outside the "real time" test, and it is the person's data going to a third party; (b) 5.1.2(i) separately demands disclosure and consent for "third-party AI", whatever the label says. Uncertain which reading App Review takes; the conservative answer costs us only a label line.

- **App Privacy answers (conservative):** Data type: User Content, Other User Content (the script and prompt). Purpose: App Functionality. Linked to identity: No (we hold nothing). Used for tracking: No. Add Product Interaction only if we log AI use ourselves, which we should not. If the team takes the narrow reading and answers "Data Not Collected", write down why in the review notes.
- **Privacy policy (section for the AI feature):** names the provider the person chooses; says the person's key is kept in the device Keychain and goes only to that provider; says what is sent (the open script, the prompt, any text the person adds), that it is sent only when the person presses send, that the provider's own terms and retention apply and we have no copy; how to revoke (delete the key, switch the feature off); no company server touches it. The existing policy v2 states "no company server" for other features; the AI section must not contradict it.
- **In-app:** one consent screen at first use, naming the provider; a visible "AI" label; a preview of exactly what will be sent.
- Also touches: privacy manifest only if we add an SDK (we should not; use plain HTTPS). Export compliance: plain TLS to the provider adds no new answer, unconfirmed.

## 4. Does a Pro lock hold when the user pays the provider?

- **Apple:** 3.1.1 says features unlocked inside the app must use in-app purchase. So putting the AI panel behind the Pro IAP is the compliant route, and Apple takes its share of the Pro price, not of the provider bill. Nothing I read in the Guidelines objects to an app charging for its own interface to a service the person pays for elsewhere. I did not find a guideline that names this case (it resembles 3.1.3(e) "services outside the app" only loosely). **Uncertain.** Condition: the AI feature must not take payments for model usage in the app (that would pull in 3.1.1 for digital services and the providers' resale terms).
- **Anthropic:** D.4 bars resale "except as expressly approved". Charging for our editor, key vault and diff UI is not reselling the Services if the company never supplies or bills model access. I read it as OK on the words; not confirmed by Anthropic.
- **OpenAI:** unread at primary level. The "sell or transfer API keys" line is about keys, which we do not sell. Uncertain; same primary read owed.
- Wording rule for the store page: "Pro adds an AI assistant editor. Bring your own Claude or OpenAI key; model usage is billed by the provider." No implied tie to the provider, no logos without checking their brand terms.
- The lock should not make Pro depend on AI consent (5.1.1(ii)). A person who declines the consent still has everything else in Pro.

## Recommendation

**Go with conditions**, later release only. It passes on Apple's text if it is small and visible. Top blocker: **OpenAI's terms have not been read at primary level**, and 2.5.2 plus the 2026 AI-builder enforcement is the likeliest reviewer objection.

**Smallest version that should pass review:**
1. Anthropic only first (its Commercial Terms were read). Add OpenAI after a person reads openai.com/policies and clears it.
2. API keys only; no subscription logins.
3. Off by default; Pro-locked by IAP; consent screen naming the provider; visible "AI" label; the preview of what is sent.
4. The assistant works in the editor on one open script: it proposes an edit as a diff, the person accepts or rejects each change, and nothing runs until they choose Run. No auto-run, no background calls, no generated-app gallery or downloads.
5. Key in the Keychain on device only; plain HTTPS direct to the provider; no company server, no analytics on prompts.
6. Privacy policy section and App Privacy label as in section 3; review notes explain the flow and attach a demo key path (App Review needs a way to see it work without our key: a reviewer enters their own, or a built-in demo mode needs prior approval, per 2.1(a)).
7. Describe the app as a Python editor and widget maker, never "make apps with AI".

## Open items
- A person reads OpenAI's Services Agreement and Service Terms (our fetcher is refused; the saved PDF was not machine-readable here). Owner: Investors.
- Ask App Review once (a pre-submission question) whether AI-proposed edits to a user's script, accepted by the person, fall under 2.5.2. That is the only way to turn Medium into a known answer.
- Check the age rating against Anthropic's minors requirements before shipping.
- Counts: none. This note is a terms read, not a review-mining pass; every quote above is from the saved pages listed, except the OpenAI summary and the one recall, both marked.
{% endraw %}

</div>
