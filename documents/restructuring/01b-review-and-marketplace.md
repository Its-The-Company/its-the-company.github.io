---
layout: "default"
title: "Phase 1, part b: App Review, the agreement, marketplace needs, the three audiences (T-4127 step 1b, Wrenna, blank slate)"
section: "documents"
description: "Marks: [G] saved guidelines, quoted (S1); [A, Sn] Apple&#x27;s page, quoted; [W, Sn] another site&#x27;s page; [search] web search summaries, page unread; [recalled] verify. Keys and dates: section 4. No code, plan or ADR was\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/restructuring/work/' | relative_url }}">← Working drafts</a><a href="{{ '/documents/restructuring/01b-review-and-marketplace.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Working draft</span><span>Day 22 · Thu Nov 12, 9:34 PM ET</span><span><code>documents/restructuring/work/01b-review-and-marketplace.md</code></span></div><h1>Phase 1, part b: App Review, the agreement, marketplace needs, the three audiences (T-4127 step 1b, Wrenna, blank slate)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Model: claude-fable-5-2


Marks: **[G]** saved guidelines, quoted (S1); **[A, Sn]** Apple's page, quoted; **[W, Sn]** another site's page; **[search]** web search summaries, page unread; **[recalled]** verify. Keys and dates: section 4. No code, plan or ADR was read; nothing was tested with App Review, so every rating is my reading of the text.

## 1. App Review and agreement points

1. **2.5.2.** [G] No app may "download, install, or execute code which introduces or changes features or functionality of the app"; teaching apps may, if the source is "completely viewable and editable by the user". The user's own code is settled [recalled]; marketplace downloads are not. What helps: readable source, the shipped runtime only, install on the user's tap. **Risk: medium** (IDE), **high** (marketplace downloads).
2. **Agreement 3.3.1(B).** [A, S2] Downloaded interpreted code must keep to the "intended and advertised purpose of the Application", must not "bypass signing, sandbox, or other security features of the OS", and "for Applications distributed on the App Store, does not create a store or storefront for other Applications." A "programming environment intended for use in learning how to program" is barred from a store "for other code or applications", so claiming 2.5.2's teaching exception rules out any store of code.
   The general rule bars a storefront for other **Applications**, not for code. So the store page must advertise community projects, and the rest turns on whether a listing looks like an app: a full-screen Page with its own icon, rating and price does; a widget or component with visible source reads as content. 3.2.2(i) adds [G] no "interface for displaying third-party apps, extensions, or plug-ins similar to the App Store". **Risk: high** for paid, app-like Pages; **medium** for a free gallery of widgets and components.
3. **4.7.** It names HTML5 and JavaScript mini apps, not Python; [A, S3] mini-app code is "written in HTML5 or JavaScript, or another language approved by Apple". If it covers us we owe filtering, reporting and blocking (4.7.1), consent "in each instance" (4.7.3), a web address per listing (4.7.4), an age mechanism (4.7.5), and [G] "may not extend or expose native platform APIs or technologies to the software without prior permission from Apple" (4.7.2), which bites any shared project that reads location, photos or sensors. **Risk: high**: the fit is Apple's to say.
4. **1.2.** [G] "A mechanism to report offensive content and timely responses to concerns", with filtering, blocking of abusive users and "Published contact information". Clear rules; the cost is a watched inbox. **Medium.**
5. **3.1.1 and paying creators.** [G] "If you want to unlock features or functionality within your app ... you must use in-app purchase". [A, S2, Attachment 2] A purchased item arrives "solely as data" and may not "add any additional executable code"; whether a paid Python project is data is unverified. Apple keeps 30% [A, S2, Schedule 2], or 15% in the Small Business Program [A, S4]; paying creators is ours. **High** for paid items, none while all is free.
6. **5.1.1, 4.8.** [G] "let people use it without a login" unless account features are significant; accounts need in-app deletion; Sign in with Apple alone settles 4.8. **Low.**
7. **5.1.2.** [G] "You must clearly disclose where personal data will be shared with third parties"; a shared project that sends data to its author's server is such sharing. **Medium.**
8. **2.3.** [G] "All new features ... must be described with specificity in the Notes for Review"; no marketplace switched on later by a server flag (2.5.19). **Low** if disclosed.
9. **1.1, 1.4.** Every listing is held to them; 1.1.6 bars [G] "inaccurate device data or trick/joke functionality", a likely widget genre. **Medium.**
10. **Age rating.** [A, S5] "User-Generated Content" can sit at 4+; "Social media" (feeds with "likes, comments, and shares") is 13+; "Unrestricted web access" is 16+. **Medium**: one design choice moves it.
11. **Also.** 4.4: [G] "extensions may not include marketing, advertising, or in-app purchases"; 5.2.1, 5.2.2 (logos, scraped services); Agreement 3.3.4(A)(iv): [A, S2] no "malware, malicious or harmful code".

## 2. Marketplace needs

Nothing is bought; every money item is a proposal.

- **Accounts.** None to browse or install (5.1.1); one to publish, report or block: Sign in with Apple, a display name, in-app deletion that also unpublishes; a demo account for App Review (2.1).
- **Hosting.** Free A: a curated gallery shipped in each app update; no server, new items wait for a release. Free B: Apple's CloudKit, free within a quota [recalled; search found no current figure]. Free C: a static index on the company's site, free gallery only: GitHub's terms bar running an online business on Pages [W, S6]. Paid: a managed backend, $0 to about $25 a month [search: Supabase]; a .com, $10 to $20 a year [search].
- **Moderation.** Review before listing: automated checks, then a worker reads each submission against written rules. A report button, author blocking, a published contact (question 4), action within 24 hours [search: App Review's rejection notices], removal that flags installed copies, a decision log.
- **Sandboxing (policy side).** A shared project gets less than the user's own: no other project's files or keys; network only to declared hosts; permissions asked per project; source shown before install; no silent updates.
- **Licences.** The publisher picks from a short list (MIT, Apache-2.0, CC0; CC BY for media) and affirms the right to share; every copy carries author and licence. GPL on the App Store is disputed (VLC, 2010 to 2011 [search]); leave it off 1.0.
- **Takedowns.** A complaint form; a DMCA agent registered with the US Copyright Office, renewed every three years [W, S9], $6 a filing [search]; removal on a valid notice, a counter-notice path, a repeat-infringer rule.
- **Privacy.** A policy in the app and on the store page (5.1.1(i)). Collect only an account identifier, display name, published content and reports; nothing about what people run. Access, export and deletion on request (GDPR [recalled]). CCPA starts at $25 million in revenue or 100,000 residents' data [W, S8]: far above us, honour it anyway.
- **No under-13 users.** Terms require 13 or over; never the Kids Category (5.1.4); the Declared Age Range API gates the marketplace, allowed [A, S2] for "age-appropriate content and/or features". Once a general-audience app knows a user is under 13, COPPA demands a parent's consent or deletion [W, S7]: we delete. EU consent age: 16, lower by state, never below 13 [search].
- **Payments and payouts.** Sales only through Apple's in-app purchase. Paying creators needs a legal entity, a bank account, a payout processor, identity checks and tax forms: real money, human sign-ups, close to the banned finance area.

## 3. The three audiences

"Served equally": each audience has its own first screen, a complete path to a finished thing without another audience's tools, and a share of every release.

- **Programmers.** A real editor and real Python; the code behind every Builder block and download is visible and editable. Not for them if the editor hides behind "Advanced" or the Builder rewrites their code.
- **Casual creators.** A finished widget on the Home Screen without seeing code; errors that say what to change; "edit the code" is an offer, never a step. Not for them if first run opens an empty file or the error is a traceback.
- **Users of finished products.** Install in a few taps, no account; each listing says who made it and what it can reach. Not for them if they must build first, or the gallery is thin. They depend wholly on the marketplace, the part App Review is least sure to allow.

## 4. Sources

Read 2026-11-12 unless dated; "saved" is a copy under `research/inbound/`.

- **S1** App Review Guidelines: PDF saved 10-25; live https://developer.apple.com/app-store/review/guidelines/ fetched 11-12, same wording.
- **S2** Program License Agreement: live https://developer.apple.com/support/terms/apple-developer-program-license-agreement/ (October 29) fetched 11-12; PDF saved 10-25 (October 13); 3.3.1(B) is identical.
- **S3** Mini Apps Partner Program, https://developer.apple.com/programs/mini-apps-partner/: PDF saved 10-25. Live page unread: the fetch tool refused it twice on 11-12 (day <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>).
- **S4** https://developer.apple.com/app-store/small-business-program/, saved 11-02.
- **S5** https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions, saved 10-26.
- **S6** GitHub's additional product terms, https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features, saved 11-09.
- **S7** FTC's COPPA FAQ (A.12, H.3, H.6), https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions; it may predate the Rule's April 22, 2025 amendment.
- **S8** California Attorney General, https://oag.ca.gov/privacy/ccpa, "Updated on August 28, 2026" (search summaries give $26.625 million since 2025).
- **S9** US Copyright Office blog, October 17, 2019, https://blogs.loc.gov/copyright/2019/10/it-may-be-time-to-renew-your-dmca-agent-registration/.
- **[search]** The $6 fee (law-firm pages, 2016 to 2020); Supabase's prices; the .com price; "within 24 hours"; GDPR Article 8; the GPL dispute.
- **Not reached:** www.copyright.gov (terms guard refused: robots.txt unreachable); ecfr.gov (an access check); eur-lex.europa.eu (empty page); Apple's CloudKit page (day cap).

## 5. Questions for the Investors

1. **A live marketplace in 1.0?** No: a curated gallery inside the app (free A); a live one waits for question 3.
2. **Paid items?** No: they bring Attachment 2's bar on executable code, creator payouts and real-money sign-ups.
3. **Will you ask Apple** whether Python projects fall under 4.7 and the Mini Apps Partner Program, and whether a gallery of runnable projects is a "storefront for other Applications"? Yes, in writing, before marketplace work starts; only you can.
4. **Who answers reporters and takedown notices?** You own the published address and every reply, and register the DMCA agent; workers sort and draft.
5. **What may a listing be?** Widgets and components with visible source; no full-screen Page with its own icon, rating or price until Apple answers.
6. **Accounts and hosting, once live?** Sign in with Apple, only to publish. CloudKit first, once its quota is read; a paid backend only as a request card.
7. **Age?** Terms say 13 or over; the Declared Age Range API gates the marketplace; no likes, comments or feeds.
8. **May the store page say the app downloads and runs community projects?** It must, for 3.3.1(B)(a); the wording goes to phase 6 with the mission statement.
{% endraw %}

</div>
