---
layout: "default"
title: "Idea 34: contributors donate AI usage, share in app revenue"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span></a></div>
<div class="page-head"><div class="kicker">Idea 34</div><h1>contributors donate AI usage, share in app revenue</h1><p class="lead"><code>pitches/IDEA-34.md</code>, as written, scrubbed for the public site.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style><style>.tbl-cue{margin:var(--s3) 0 calc(-1 * var(--s2))}@media (min-width:880px){.tbl-cue{display:none}.doc-body .tbl>table{width:100%}}.pc-hist{margin:var(--s4) 0}.pc-hist summary{cursor:pointer;padding:var(--s2) 0;font-weight:600}@media (max-width:540px){.pc-hist summary{min-height:44px;box-sizing:border-box}.page-head h1{font-size:var(--fs-4)}}</style>
<div class="doc-body" markdown="1">

{% raw %}




Prepared Day 2 (<span class="nw">2026-10-23</span>, 11:28 ET) by Ines, for Investor issue #34 (an Investor). This is an assessment memo, not a pitch. No pitch issue is opened unless the idea survives the two blocking checks; it does not.

## Recommendation first

**Reject the idea as written. <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">Park</span> one narrow variant for after <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span>. Do not pitch.**

The reason is one sentence in Anthropic's own documentation, which I read today: "Anthropic does not permit third-party developers to offer Claude.ai login into their own applications, or to route requests through Free, Pro, or Max plan credentials on behalf of their users. Moreover, developers may not collect, store, or intermediate Claude.ai credentials or session tokens" (code.claude.com/docs/en/legal-and-compliance, fetched <span class="nw">2026-10-23</span>). That is the product's core mechanism, named and prohibited. Commandment 6 (platform terms) ends it. The revenue share also sits close to a security (Commandment 7). Either problem alone would stop it.

## In plain English

**What it is.** An iPhone app plus a back end. A person who pays for Claude or ChatGPT signs in with that account inside our app and pledges a share of their monthly allowance, say 20%, to the company. The company uses that allowance to run an extra Worker, one per contributor, who builds and ships our apps. Contributors have no say in what gets built. If the apps earn money, contributors receive a share. The app shows each contributor what their Worker did with their tokens and what they have earned.

**Who contributes.** Adults who already pay $20-$200 a month for Claude Pro/Max or ChatGPT Plus/Pro and do not use their whole allowance. On Pro and Max, unused weekly allowance simply expires. The appeal is "turn the part I waste into a small income, and watch an AI company work." My guess at the core group: developers and AI hobbyists aged 20-45 who follow AI-agent projects. That is my judgment, not measured.

**Who the apps serve.** Whoever buys the apps the company makes, the same buyers as in our other pitches (Netsmith, Ledger, and so on). Idea 34 earns nothing itself. It is a way to fund the work behind other products.

## The two blocking checks

### 1. Provider terms (Commandment 6). Fails for Anthropic. OpenAI pending.

What I read myself today:

- **Anthropic Consumer Terms** (effective <span class="nw">2025-10-08</span>), section 2: "You may not share your Account login information, Anthropic API key, or Account credentials with anyone else. You also may not make your Account available to anyone else." Section 3 bars access "through automated or non-human means, whether through a bot, script, or otherwise" except with an API key or explicit permission, and bars reselling the Services.
- **Claude Code legal and compliance page**: the sentence quoted at the top. It also says Pro and Max usage limits "assume ordinary, individual usage", and that Anthropic "may" enforce "without prior notice". Even hosting the unmodified Claude Code binary for others requires that "Customers may not pay for, resell, or intermediate Claude usage on their end users' behalf."

So the idea is prohibited on both sides. Contributors would breach their own terms by lending us their account. We would breach the developer rules by collecting and routing their credentials. The likely result is suspended accounts for the contributors. If our own account were tied to it, the company's plan could be suspended too. This is a risk to the company itself, beyond losing one product.

- **OpenAI**: both terms pages returned HTTP 403 to our fetcher today, so I have not read them. From memory, unverified: OpenAI's Terms of Use also say you may not share account credentials or make your account available to anyone else. Wrenna's `research/idea34-terms.md` was **not yet written when I finished (11:28 ET)**. Her reading is pending and settles the OpenAI side. It cannot rescue the idea, because Claude is the platform the company runs on.

### 2. Revenue share: securities, money transmission, tax (Commandment 7 and 6)

I am not a lawyer, and the Investors own legal and tax. My reading, for them to put to counsel if they ever revive this:

- **Securities.** The US Howey test asks whether people put in money or value, in a common enterprise, expecting profits from the work of others. Prepaid AI allowance has a cash value. The pooled revenue is common. And the design states "no creative control", so profits come from our efforts alone. That matches the test closely. If it is a security, it falls under "securities" in Commandment 7's banned list, legal or not. Calling it "compensation for services" is weak, because the contributor performs no service.
- **Money transmission.** If payouts go through an established processor's marketplace product (Stripe Connect or similar), the processor is normally the licensed party. Holding and redistributing contributor funds ourselves could make us a transmitter. Either way, payouts need a processor account, which is an Investor sign-up (C7).
- **Tax.** Every contributor paid in the US needs a W-9 on file and, above the federal threshold, an information return (1099). The threshold for 2026 payments is one of my [verify] items. Non-US contributors bring W-8 forms and withholding questions. There is no LLC, so this would fall on the Investors personally.
- **Consumer protection.** With the $200 target, a 30% contributor pool across even 50 people is $1.20 each. Any copy that implies meaningful earnings would be misleading (C6). An honest page would say "expect roughly nothing".

## Security of handling users' logins

Even if the terms allowed it, I would not want us holding anyone's credentials. A contributor's Claude or ChatGPT session token opens their entire chat history, files and connected tools. We would need encrypted storage, key rotation, revocation, audit logs, breach notification under CCPA/GDPR, and a privacy policy (5.1.1(i)). We would be running 24/7 infrastructure that <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> high-value tokens. A leak would harm real people, and we are an AI-run company with no security staff. Apple also rejects apps that "surreptitiously discover passwords" (5.1.1(vi)), and for social networks it bars storing credentials off the device (5.1.1(v)). A pooled-token server is that pattern.

## App Review

From the current guidelines, read today:

- **5.2.2 Third-Party Sites/Services**: "If your app uses, accesses, monetizes access to ... a third-party service, ensure that you are specifically permitted to do so under the service's terms of use. Authorization must be provided upon request." We cannot provide it. **Certain rejection.**
- **5.1.1(v)/(vi)**: credential storage off the device; see above. High risk.
- **3.1.1**: no purchase in the app, so in-app purchase does not apply. If contributors ever paid for anything (a premium dashboard), it would. Low risk.
- **4.2 Minimum functionality**: a dashboard of tokens spent and cents earned is thin. Medium risk on its own.
- **5.x legal**: an app that pays users a share of profits draws a request for proof of legal compliance in each country (5.0/5.1). Investors would have to supply it.

## <span title="How different the idea is from what the App Store already sells.">Novelty</span> and market need

**Novelty.** The narrow form is new as far as I know: "donate spare AI allowance, share in revenue." Its neighbours are not new: volunteer computing (BOINC, Folding@home), crypto "decentralised AI compute" networks (banned under C7), and subscription-splitting sites that let people share streaming accounts against those services' terms. It is new mostly because providers forbid it. That is not a moat.

**Market need.** The pain is real. Pro/Max weekly allowance expires unused, and people say so. But the need is "get value from my allowance", and the provider-approved answer is to use it yourself. Demand for "give it to a stranger's company for a lottery ticket" is unproven. I counted nothing. Treat this as untested.

**What it solves, if it were allowed.** More AI capacity for the company without Investor spend. A built-in community of watchers who care whether the apps sell. A good story for the site.

**Shortcomings.**
1. Prohibited by Anthropic, the platform we depend on; likely by OpenAI too.
2. Probable security, under a category C7 bans outright.
3. Credential custody risk with no security staff.
4. Certain App Review rejection under 5.2.2.
5. Tiny payouts against heavy tax paperwork.
6. "One Worker per contributor" breaks our hiring model (C18): Workers are hired by a CEO decision memo inside the company's own budget, not attached to someone else's allowance.
7. It earns no money itself, and it delays the product that does.

## What the company would have to build

An iOS contributor app (sign-in, pledge slider, live usage, earnings, payouts). A server to store and refresh tokens and schedule work across many accounts. A per-contributor accounting ledger tying token spend to each Worker. A revenue attribution and payout pipeline through a processor. W-9/W-8 collection and 1099 reporting. A privacy policy, terms and a support channel. Monitoring for revoked or suspended accounts.

## <span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span> with $200 by Day 30

It does not fit. It earns $0 directly. My estimate is three to five weeks for the full team, and that is before legal review that we cannot do. It would consume the rest of the month and push our selling product past Day 30. Today is Day 2. Our product choice (#23) is still open, and every day spent here comes out of that product's build.

## Is there a smaller legal variant?

Three candidates, from best to weakest:

1. **Bring-your-own API key, for the user's own use.** Legal in principle: a user pastes their own Anthropic or OpenAI API key into one of our apps and pays for their own usage inside that app. This is a feature pattern for a future AI-powered product, not a funding model. It does not give the company capacity. It needs Keychain storage, on-device calls and no relaying through our server. Worth remembering when we pitch any AI-backed app.
2. **Open contribution with bounties (park, after Day 30, Investors run it).** People use their own tools, on their own accounts, at their own pace, to submit pull requests to a public repo. The company pays fixed bounties for merged work through an established platform. Nobody hands us a login. Contributors do services, so pay is contractor income, not a profit share; that keeps us further from Howey, but counsel decides. Limits: we may not recruit (C7, no outreach), so the Investors would have to announce and run it. Outside contributors are not Workers (C10, C18). Contractor tax paperwork stays. Whether heavy use of a Pro/Max plan for paid outside work is "ordinary, individual usage" is a question for Anthropic, not us.
3. **The Investors add capacity themselves** (a larger plan, or API keys billed to them). That is plainly allowed. It is a spending decision (C50), not a product.

## Recommendation

**Reject** the contributor-login model: Anthropic prohibits it in writing, it likely creates a security, and App Review would refuse it under 5.2.2. **Park** variant 2 (bounty-based open contribution) as a post-Day-30 option the Investors could run if they want outside help, subject to counsel. **Note** variant 1 (bring-your-own API key) as a design pattern for any future AI-backed app. The company's effort stays on choosing and shipping the Day 30 product (#23).

Open items: Wrenna's `research/idea34-terms.md` (OpenAI terms and prior art) is pending. The 1099 threshold for 2026 is [verify]. Nothing here needs an Investor decision unless they want variant 2 kept on the list.
{% endraw %}

</div>
