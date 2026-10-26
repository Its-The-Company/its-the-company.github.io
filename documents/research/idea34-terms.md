---
layout: "default"
title: "Idea 34: outside users donate a share of their Claude or ChatGPT usage"
section: "documents"
description: "Neither provider allows it on a consumer subscription. Anthropic forbids it in four places, and the newest rule names this exact pattern: &quot;services that route requests through consumer subscriptions&quot;. OpenAI&#x27;s Sign in\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/research/idea34-terms.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 2 · Fri Oct 23</span><span><code>research/idea34-terms.md</code></span></div><h1>Idea 34: outside users donate a share of their Claude or ChatGPT usage</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-10-23 (read 11:00 to 11:32 EDT). Issue: (private)
Passive reading only. Nobody contacted. Not legal advice; the Investors decide.

The idea, as the issue puts it: outside users "sign in with their Claude or ChatGPT account and dedicate a certain % of their usage towards our projects"; the company runs the work, users get "a portion of the pay", and each user's credits become a new Worker.

## Verdict first

**Neither provider allows it on a consumer subscription.** Anthropic forbids it in four places, and the newest rule names this exact pattern: "services that route requests through consumer subscriptions". OpenAI's Sign in with ChatGPT is the closest thing to a sanctioned pipe. As far as I can read it, plan usage covers the signed-in user's own activity in the connected app, and hosted or paid apps need OpenAI's approval first. A secondhand summary of its terms bars "pooling" and "using one user's subscription to fulfill another user's requests". I could not open OpenAI's own terms pages (403), so the OpenAI side is grade B evidence, not A.

The routes that are sanctioned all change the idea. Users would bring **API keys** (pay-as-you-go, billed to them), or the company would apply to a **partner program**. Under API keys, each user pays full API price to fund our work. That removes the reason the idea is attractive: subscription tokens are cheap only because they are priced for one person's ordinary use.

## 1. The terms, clause by clause

### Anthropic


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Anthropic, scrolls sideways" style="--tw:960px" markdown="1">

| Source (read 2026-10-23) | Exact words | Does it allow running our tasks on a user's Pro/Max plan? |
|---|---|---|
| Consumer Terms, eff. 2025-10-08, s.2. https://www.anthropic.com/legal/consumer-terms | "You may not share your Account login information, Anthropic API key, or Account credentials with anyone else. You also may not make your Account available to anyone else." | No. The company using a slice of the account is making it available to someone else. |
| Consumer Terms, s.3 item 7 | "Except when you are accessing our Services via an Anthropic API Key or where we otherwise explicitly permit it, to access the Services through automated or non-human means, whether through a bot, script, or otherwise." | No for a custom harness. Claude Code itself is the explicit permission, but only for the user's own use (next row). |
| Consumer Terms, s.3 item 2 | "...or resell the Services." | No. Paying users a share of proceeds in exchange for their usage is close to buying and reselling it. |
| Usage Policy, shows "Effective Nov 12, 2026" (the page offers no other in-force version). https://www.anthropic.com/legal/aup | "Resell, proxy, or otherwise provide access to Claude through unauthorized means, including services that route requests through consumer subscriptions or misrepresent the product or client being used" | No. This is idea 34 described in one line. |
| Usage Policy, same page | "Intentionally bypass or interfere with capabilities, restrictions, or guardrails." | Adds risk. Spreading company work across many users' limits works around per-user limits. |
| Claude Code docs, Legal and compliance. https://code.claude.com/docs/en/legal-and-compliance | "Advertised usage limits for Pro and Max plans assume ordinary, individual usage of Claude Code and the Agent SDK." | No. A company's backlog is not individual use. |
| Same page | "Anthropic does not permit third-party developers to offer Claude.ai login into their own applications, or to route requests through Free, Pro, or Max plan credentials on behalf of their users. Moreover, developers may not collect, store, or intermediate Claude.ai credentials or session tokens — sign-in to a Claude account must complete through Anthropic's own flow." | No. The "sign in with your Claude account" screen is itself forbidden. |
| Same page, on hosting Claude Code | "Customers may not pay for, resell, or intermediate Claude usage on their end users' behalf. Each end user must authenticate with their own Anthropic API key, Claude subscription plan credentials, or 3P inference provider credential" | Narrow opening only. A platform may host the unmodified Claude Code binary, and a user may sign in to it with their own plan. That covers the user's own work, not ours. The revenue share makes us the intermediary. |
| Same page | "Anthropic reserves the right to take measures to enforce these restrictions and may do so without prior notice." | Enforcement is live (see below). |

</div>


**Enforcement history** (secondary press; the dates agree across sources):
- 2026-01-09: server-side blocks stop subscription OAuth tokens outside the official client. In The Register, Anthropic's Thariq Shihipar says: "Third-party harnesses using Claude subscriptions create problems for users and are prohibited by our Terms of Service." https://www.theregister.com/software/2026/02/20/anthropic-clarifies-ban-on-third-party-tool-access-to-claude/5014546
- 2026-02-19: OpenCode removes Claude Pro/Max sign-in, and its commit cites "anthropic legal requests" (same article).
- 2026-04-04, 12pm PT: subscriptions stop covering OpenClaw and other third-party harnesses. That use moves to paid "extra usage" or an API key, and subscribers get a one-time credit. https://www.techradar.com/pro/bad-news-claude-users-anthropic-says-youll-need-to-pay-to-use-openclaw-now and https://aibusiness.com/agentic-ai/claude-subscribers-now-have-pay-use-openclaw
- Reported bans: holders of several Max accounts (mid-Feb 2026), and one team sharing a single Max seat across six developers ("flagged us within the first week"). These are anecdotes, not official. https://metricnexus.ai/blog/anthropic-banning-multiple-claude-accounts and https://www.indiehackers.com/post/how-we-stopped-worrying-about-client-side-tracking-and-switched-to-api-first-3-months-of-zero-bans-dd1e6d4247

**Anthropic's sanctioned alternatives:**
- API key from Claude Console, billed to the key owner. This is the documented route for "Developers building products or services ... including those using the Agent SDK".
- Contact sales for unusual authentication cases (link on the Legal and compliance page).
- Claude for Open Source: six months of Max 20x free for eligible maintainers. It launched 2026-02-26 and expanded to up to 10,000 people on 2026-07-07. The grant goes to a person for their own maintainer work. https://pasqualepillitteri.it/en/news/7643/claude-for-open-source-max-20x-free-maintainers

### OpenAI

openai.com/policies/*, help.openai.com, and the Sign in with ChatGPT Terms all returned **403** to our fetcher and to plain curl. I did not get around this. The OpenAI rows therefore come from OpenAI developer pages that did open, plus secondary copies of the terms. Treat the quoted terms text as unverified until someone opens the pages in a browser.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: OpenAI, scrolls sideways" style="--tw:960px" markdown="1">

| Source | Words | Allows our tasks on a user's Plus/Pro plan? |
|---|---|---|
| Terms of Use (consumer, dated 2026-01-01 per ConductAtlas capture of 2026-10-05). https://openai.com/policies/row-terms-of-use/ (403) | A secondary search summary says the registration section says you may not share credentials or make your account available to others. Its "What you cannot do" list reportedly covers leasing, selling or distributing the Services, automated or programmatic extraction of data or Output, and circumventing rate limits. I <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> no verbatim text. | Likely no, the same pattern as Anthropic. Unverified. |
| Account Sharing Policy. https://help.openai.com/en/articles/10471989-openai-account-sharing-policy (403) | Per secondary sources, the account is for the individual who created it, and others should sign up for their own account. | No (unverified). |
| Sign in with ChatGPT developer docs (opened). https://developers.openai.com/cookbook/articles/sign-in-with-chatgpt | Plan usage is available to "open-source projects, personal projects that run locally, and selected private apps." For paid or remotely hosted apps: "join the waitlist to request access before offering it to users." | Only after OpenAI approves. We would be a hosted, revenue-making app. |
| SIWC overview (opened). https://developers.openai.com/siwc/token-sharing-open-source | Plan usage is permission to use "the user's plan for eligible Responses API requests"; the "issued `client_id` is bound to the authenticated user". | Scope reads as the user's own requests. |
| Sign in with ChatGPT Terms. https://openai.com/policies/sign-in-with-chatgpt-terms/ (403) | The search-index summary lists as prohibited: "Pooling, transferring, reselling, gifting, or sharing ChatGPT plan usage or Authentication Tokens" and "Using one user's subscription to fulfill another user's requests." GrowthForge (2026-10-13) summarizes the terms the same way: they "restrict plan use to the connected application and the authenticated user's activity" and "prohibit pooling one person's allowance for other users." https://blog.growthforgeai.com/use-chatgpt-plan-in-other-apps-sign-in-limits-privacy/ | No. The company is "another user". Two independent secondary readings agree. |
| Codex auth docs (opened). https://learn.chatgpt.com/docs/auth | "Use API key authentication for programmatic Codex CLI workflows, such as CI/CD jobs." "API keys are still the recommended default for automation." | Points automation to API keys. |

</div>


**OpenAI's sanctioned alternatives:**
- Platform API keys, billed to the key owner.
- The Sign in with ChatGPT interest form for a paid or hosted app (https://openai.com/form/sign-in-with-chatgpt-interest/). Even if approved, the terms as summarized still limit usage to the user's own activity.
- Enterprise access tokens "for trusted scripts, schedulers, and private CI runners" inside one organization.

OpenAI is friendlier than Anthropic to third-party tools: OpenAI's Thibault Sottiaux publicly endorsed Codex subscriptions in third-party harnesses (The Register, above), and 11 to 16 partner apps launched at DevDay 2026. That friendliness covers the user doing their own work in another app. It does not cover donating usage to a company.

## 2. Prior art

Here is the shape of it: volunteer compute works when the donor gives hardware they own, and the gift goes to science. Subscription-token pooling exists only at the edge, and the providers are closing it.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 2. Prior art, scrolls sideways" style="--tw:1280px" markdown="1">

| Project | What | Dates | Outcome |
|---|---|---|---|
| BOINC (https://boinc.berkeley.edu/) | Volunteers donate their own CPU/GPU to about 30 science projects. No pay. Gridcoin adds a crypto reward on top (https://en.wikipedia.org/wiki/Gridcoin) | Since 2002 | Still running. The donor owns the hardware, so there are no terms to break. |
| Folding@home | Same model | Passed 1 exaflop on 2020-03-25 and 2.4 by 2020-04-13, with about a million new members during COVID (https://www.khronos.org/news/permalink/foldinghome-uses-opencl-for-covid19-research-and-breaks-the-exaflop-barrier) | The proof that people donate when the cause is clear and nobody profits. |
| AI Horde (https://aihorde.net/contribute/workers) | Volunteers run models on their own GPUs and earn "kudos" for priority. Kudos "can never be bought or sold" | Since 2022 | Running. Self-hosted open models, so no provider terms apply. |
| Imbue "unused Claude tokens for good" (https://imbue.com/blog/unused-claude-tokens-for-good) | Planned Claude skills to "donate your about-to-expire capacity to genetics research with one command" with Fred Hutch. Estimates 40% of a typical day's 5-hour quota expires unused | Posted 2026-07-08 | No sign it shipped. Never mentions Anthropic's terms. |
| Moochy (https://moochy.dev) | Donor runs a local app and a project's maintainers send requests through the donor's provider key. "Your key never leaves your machine." | HN 2026-10-04, 2 points (https://news.ycombinator.com/item?id=49958170) | Early access: 11 projects, about 4 donors. Uses API keys, not subscriptions, as far as the page says. |
| Open Public / opub (https://probablybot.ca/rip-opub) | "Donated agentic compute" for open source | HN 2026-05-21 (https://news.ycombinator.com/item?id=48223870); shut 2026-08-06 | The founder lost interest; "Everyone has been made whole." Terms not mentioned. |
| OCP Open Claude Proxy (https://github.com/dtzp555-max/ocp) | Shares one Pro/Max plan over a LAN by spawning the official CLI | HN 2026-04-10 | Live, 128 stars. Its own README warns that "pooling across distinct people may violate Anthropic's ToS." |
| Asale (https://github.com/asale-ai/asale) | "sell idle Claude, ChatGPT/Codex, Gemini, Kimi and Grok subscription quota for USDT" | Repo created 2026-07-26, pushed 2026-10-19, 20 stars | Live, and squarely against the Anthropic AUP clause above. Also crypto payouts. |
| Tokenaru (https://tokenaru.com), Quotra, Secondhand Tokens, Pairag | Token or quota marketplaces | HN 2026-02-04 (2 points); the others are self-described | No traction shown. |
| OpenCode, OpenClaw | Third-party harnesses on Claude subscriptions | Cut off 2026-02-19 and 2026-04-04 | **Shut out by the provider.** These are the closest cases to idea 34, and both lost. |
| Claude for Open Source (above) | The provider donates the subscription itself | 2026-02-26 onward | The sanctioned version of "free tokens for good work". |

</div>


## 3. Market need

Listen to this. "I can't even count how many 'free-tier' API keys I've seen just sit there and expire without being used." (HN, 2025-06-09, 2 points, https://news.ycombinator.com/item?id=44222367). The first reply: "LLMs is probably the thing they need the least."

Counts, all low:
- HN stories on donating, pooling, or sharing tokens (Algolia, five queries, since 2025-01-01): 5 relevant (44222367, 46884313, 47716791, 48223870, 49958170). None scored above 2 points or got more than 1 comment.
- Elixir Forum "Tokenware is the new form of donation" (https://elixirforum.com/t/tokenware-is-the-new-form-of-donation/75360): 1,055 views, 8 replies, 4 likes. The author's motive is staying under their own "$1K/month limit", not earning money.
- Supply is real: Imbue's 40% of the daily quota expiring unused, and Asale's "idle quota". The askers are maintainers, who want tokens for their own open-source work. I found **no one asking to fund a company's apps in exchange for a revenue share**, and no builder reporting donors at scale (Moochy: about 4).

What are they doing instead? Maintainers apply to Claude for Open Source. Heavy users buy Max 20x or extra-usage bundles. People with spare quota let it expire.

## Shortcomings beyond the terms

- **Commandment 6 (platform terms):** the subscription version breaks Anthropic's Consumer Terms s.2 and the AUP, and very likely the OpenAI SIWC terms. This is not a grey area for Anthropic.
- **Commandment 7:** paying outside people a share of app proceeds in return for contributed resources looks like a profit-sharing arrangement. That may fall under securities rules, which is a banned area for us. Asale's USDT payouts would add crypto. I am not a lawyer; the Investors should treat this as a stop until counsel says otherwise.
- **Economics with API keys:** each donor would pay full API rates, and only gets paid back if an app crosses into profit. Our own run costs far more per Worker than any revenue share could repay before <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span>.
- **Quality and control:** work done on a stranger's account sits under their data settings and history, and the company cannot audit it.

## Sanctioned variants worth a look (not graded)

1. A BYO-key tool where users run their **own** projects (not ours) on their own key. That is ordinary SaaS and legal, but a crowded <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>.
2. An open-source "donate my expiring quota" Claude Code skill that a user runs on **their own** machine for a cause they pick. This is closer to Imbue. It is still risky under "ordinary, individual usage" and should get a written answer from Anthropic sales first.
3. Applying to OpenAI's SIWC interest form for one of our real apps, so users can power AI features in that app with their own plan. This fits the terms. It is a feature, not a business.

## Logged

- smartscope.blog contained an "AI use" directive about citing its content. Treated as information and not followed.
- openai.com, help.openai.com: 403 (not bypassed). web.archive.org: the fetch tool refuses it.
{% endraw %}

</div>
