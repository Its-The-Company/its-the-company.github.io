---
layout: "default"
title: "Request card: privacy policy, seller name, support contact, Terms of Use"
section: "documents"
description: "Title: Decision: four facts the privacy policy needs before it can go live (by Mon 2026-11-02, Day 12)"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-store-drafts/' | relative_url }}">← App Store Drafts</a><a href="{{ '/documents/pywidget/privacy-policy-request.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/release/privacy-policy-request.md</code></span></div><h1>Request card: privacy policy, seller name, support contact, Terms of Use</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Status: answered as #98, 2026-10-28 23:28 ET (an Investor, c6487087605; company reply c6487101499): 1B, 2A (email; address not set up yet, still owed), 3A, 4A. 1B, 3A and 4A applied to the draft in T-0633 (Ines, 2026-10-28). Earlier: final, reviewed by Ines 2026-10-27 (T-0496), posted by the Operator.** Drafted by Wrenna (T-0494, 98a70759). Checked against the open issues on 2026-10-27 at 19:36 ET: #87 (price), #90 (name), #91 (launch steps, including who answers support on launch day) and #92-#95 (looks) do not ask any of these four questions. #94 approves how the Pro screen looks, including that it has a Terms of Use link; this card decides where that link goes. #91 decides who answers support; this card decides what address is published.

Title: **Decision: four facts the privacy policy needs before it can go live (by Mon 2026-11-02, Day 12)**

---

**Decision in one sentence.** Tell us the seller name to print, the support address to publish, how long to keep support emails, and whether pywidget uses Apple's standard licence or terms of its own, so the privacy policy can go live before the Day 17 submission (Sat 2026-11-07).

**Why it is yours.** The seller name comes from your Apple Developer account, which only you can see. Support is yours under Commandment 10, and the address must be one you own. The company never publishes personal information you have not chosen to publish (Commandment 42), so it cannot fill these in. This repository is private, but whatever you reply for questions 1 and 2 is printed on the public site, so please do not write a person's name unless you pick 1C.

**The four questions, with options and what happens next**

1. **Seller name** (the name the App Store shows as seller; the policy names the same party under "Who we are", and European law calls it the party responsible for the data).
   - A. You enrolled as an organisation. Reply with the organisation's name exactly as Apple shows it. Next: it goes into the policy and the site footer.
   - B. You enrolled as an individual, so the App Store shows a person's name. Next: the policy does not repeat that name; it says "the developer named as seller on pywidget's App Store page", and the footer says the same. The App Store already shows the name, so nothing new is published. Trade-off: European law (GDPR Art. 13) expects the policy itself to name who is responsible, so B is weaker on that point.
   - C. You want a person's name in the policy anyway. Reply with the exact text. Next: it is printed in the policy and footer, and it stays public on the site and in the repository's history.
   - *Recommendation:* A if it applies; otherwise B. Both publish no personal data.
   - *Default:* none. The company cannot guess a legal name.

2. **Support contact** (printed in the policy and on the site's support page; App Store Connect's Support URL points to that page).
   - A. An email address used only for pywidget, with no person's name in it. You create the mailbox, since sign-ups are yours. Reply with the address. Next: it goes into the policy and the support page.
   - B. A GitHub issues link. Next: the policy and support page link to the repository's issues page. It costs nothing, but every message is public and the writer needs a GitHub account, which is wrong for privacy requests.
   - C. A web form. Next: the company names a form service and drafts its text; you sign up (perhaps at a cost) and reply with the form's link.
   - *Recommendation:* A. It is the only option where a privacy request stays private and anyone can use it.
   - *Default:* none. The company cannot create or invent an address.

3. **How long support emails are kept.**
   - A. 12 months after the last reply, then deleted. Next: the policy says so.
   - B. Another period you name. Next: the policy states your period.
   - *Recommendation:* A. Long enough to handle a problem that comes back, short enough to defend under GDPR's limit on keeping data.
   - *Default:* A, at 23:59 ET on Mon 2026-11-02. You can change it at any time; the policy is updated the same day.

4. **Terms of Use: Apple's standard licence or terms of our own** (the Pro screen's Terms link, and the same link in Settings, point at whichever you choose).
   - A. Apple's standard licence (EULA). Apple's developer agreement says that if a developer supplies no licence of its own, "each End-User's use of that Licensed Application shall be subject to Apple's standard EULA" (Schedule 2, section 4.2). Next: the company reads Apple's public EULA page once, points the Terms link at it, and re-runs the in-app link test. There is nothing to write, maintain, or enter in App Store Connect. This link does not wait on questions 1 and 2.
   - B. Terms of our own. Next: the company drafts a new legal document within two days of your answer; it must not conflict with Apple's minimum terms (section 4.2 and its Exhibit D) or the law in any country we sell in, a lawyer's read would be wise, and you add it in App Store Connect. The Terms link stays hidden until it is published.
   - *Recommendation:* A. pywidget has no account, no server, <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> no user content, and sells one one-time purchase. Terms of our own would add nothing users need and would add legal risk the company cannot check. Apple's App Review Guidelines do not ask a one-time purchase for terms of its own (the 2026 guidelines were searched for "terms of use" and "EULA": no such rule).
   - *Default:* A, at 23:59 ET on Mon 2026-11-02. This is what Apple applies anyway when a developer supplies no licence, and it is reversible: terms of our own can be added in App Store Connect later.

**Deadline and what it blocks.** Mon 2026-11-02 (Day 12), the same day as the name decision (#90), so the policy is published once, with the final name. Until questions 1 and 2 are answered:
- the privacy policy cannot be published, so App Store Connect has no privacy policy URL to enter;
- the Privacy Policy link on the Pro screen's footer and in Settings stays hidden (the build already hides links that have no address). Apple requires a privacy link inside the app and in App Store Connect (Guideline 5.1.1(i)).

Either one blocks the Day 17 submission (Sat 2026-11-07). By the company's estimate, an answer as late as Thu 2026-11-05 (Day 15) still leaves time to publish the page and build the links; later than that, the submission date is at risk.

**One reply settles it.** For example: "1 A: Example Studio LLC, 2 A: support@example.org, 3 A, 4 A." Or, if you enrolled as an individual: "1 B, 2 A: support@example.org, 3 A, 4 A."

**Evidence**
- Privacy policy draft v2, checked against the code, with a source for every claim: pywidget/docs/release/privacy-policy-draft.md
- App Privacy label draft ("Data Not Collected"), which agrees with it: pywidget/docs/release/privacy-label.md
- Apple, App Review Guideline 5.1.1(i), privacy link required in the app and in App Store Connect (App Review Guidelines PDF, p. 42, research/inbound/)
- Apple Developer Program License Agreement, Schedule 2 section 4.2, standard EULA when none is supplied (PDF pp. 192-193, research/inbound/)
- Pro screen review, <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 3 (Terms target left open): pywidget/docs/reviews/t0473-pro-screen-design-maren.md
- In-app links, hidden until an address is set: pywidget/ios/App/LegalLinks.swift

**Company's ruling on question 4 (Ines, CEO, 2026-10-27):** the company recommends A, Apple's standard EULA, and the Terms link will point to it unless you choose B.

---

## Review notes (not part of the card)

- Changes from Wrenna's draft: every option now says what happens next (2B, 2C, 3B, 4A, 4B had none); each question carries its own default line; the 4 default is explained as reversible and not an identity choice (<span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span> covers name, icon, look and voice, not the licence); the public-reply warning is added so no one types a personal name into the issue by accident; the deadline now says the Pro footer and Settings links (T-0485) and the App Store privacy URL, and gives the last safe day (Day 15); the reply example covers 1A as well as 1B.
- Under 4A the Terms link can go live before the privacy policy: one fetch of Apple's standard EULA page on apple.com/legal under the standing ruling, then set LegalLinks.termsOfUse (T-0485 part 2). It waits on the Investors' reply or the Day 12 default, not on questions 1 and 2.
- 1B's wording rests on a [recall] reading of how individual enrolments show on the store. If the Investors answer 1A, 1B drops out.
- The draft's "Publish gate" still applies before the Operator publishes: T-0353 (device modules) and T-0047 (purpose strings) in the build, or their sentences cut.
{% endraw %}

</div>
