---
layout: "default"
title: "ADR-006: Marketplace staging, pip timing, and where marketplace Python runs"
section: "documents"
description: "The founder&#x27;s marketplace (2.1) is three things: a place to publish widgets, a place to get other people&#x27;s widgets, and the paid tier&#x27;s reason to exist. L6 found that, by the text we could read, an in-app store of\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/pywidget/adr-006-marketplace-staging.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/decisions/ADR-006-marketplace-staging.md</code></span></div><h1>ADR-006: Marketplace staging, pip timing, and where marketplace Python runs</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: **accepted by the CEO as <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span>, 2026-10-25 19:57 ET.** Two board decisions: "v1 scope from L6 s7" (P0) and "L12 Q1" (P2). Neither changes a founder decision in brief 2.1; section 5 says when one would.
- Author and chair: Ines (CEO). Inputs, read in full for this ruling: pywidget/docs/research/L6-app-review.md (s3, s4, s6, s7; Wrenna), L12-security.md (s0, s6, s7, s12, s13; Odalys), L13-packages.md (s4, s5; Odalys), ADR-001 (with its 19:36 Revised section), PROPOSAL-001 (both files), PROPOSAL-002 s6, ops/plans/pywidget/build-brief.md (s0, 2.1, 2.3, L15), ops/plans/pywidget/plan.md.
- Numbering: ADR-003 is held for the package policy (ADR-001 s4, Day 6) and ADR-005 for the compatibility corpus; this is the next free number. ADR-003 must agree with section 3 below.
- Every App Review reading here rests on L6, which read no page on developer.apple.com (ruling 'P2 terms'). L6 risk ratings may only move up on the person's browser read still owed (board, [needs-person] L6 line). This ADR is re-opened if that read raises any rating it cites.

## 1. Context

The founder's marketplace (2.1) is three things: a place to publish widgets, a place to get other people's widgets, and the paid tier's reason to exist. L6 found that, by the text we could read, an in-app store of runnable code is **High** risk: it is not one of 4.7's listed kinds, DPLA 3.3.1(B) names "a store or storefront for other code", and 4.7.2 bars exposing native APIs to such software "without prior permission from Apple". L6 also found no App Store app with an in-app gallery of user-made runnable code. Every rival that runs general code keeps shared code outside the app or curates it first-party.

L12 found that the only hard boundary is the iOS sandbox. Anything we filter inside our process is a boundary only while Python has no path around it, and `_ctypes` is that path (s0 item 3, measured). So the brief's two promises collide: an objc_util bridge for the user's own scripts (L15, through ctypes) and marketplace Python in the same process cannot both be safe.

The constraint above both: v1 is submitted Day 17 (2026-11-07), Day 20 is the last safe submission, and <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> (2026-11-20) needs $200 net. A code-running app gets a careful first review. One rejection costs about a week.

What would make this fail: anything marketplace-shaped in the v1 binary, or a revenue plan that waits for Apple.

## 2. Ruling 1: the marketplace ships in stages; none of it before Day 30 earns


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. Ruling 1: the marketplace ships in stages; none of it before Day 30 earns, scrolls sideways" style="--tw:1449px" markdown="1">

| Stage | What ships | When | Gate | Earns by Day 30 |
| --- | --- | --- | --- | --- |
| S0, v1.0 | No gallery, store or feed of anyone else's code in the app. The 12 first-party premades ship **compiled into the binary** as the "Official" <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> (PROPOSAL-002 s6). Any project or widget exports as readable `.py` or zip (ADR-001 3.1 C5). Marketplace code paths are **compiled out** of release builds, never dormant behind a flag (2.5.19). | Day 17 submission | The L6 s5 review notes as drafted ("no in-app gallery, store or sharing of other people's code in this version") | Yes, through Pro only (PROPOSAL-001) |
| S1, first-party web gallery | A page on our site with the premade sources and example scripts as readable code. The user copies the code or downloads a `.py` and brings it in through Files, the share sheet or paste. **No "open in app" link that fetches code**: that is a download again (L6 s4 (e)). | After v1 is approved; earliest Day 21 | Publishing anything publicly is the Investors' approval (brief s0) | No. Discovery only |
| S2, community web gallery | User submissions on the web gallery: accounts, publish checks (L12 s8.2), reporting and takedown (L12 s10). Our publish check refuses items that import `ctypes`, `_ctypes` or objc_util (section 4), so we never host code that reaches past the Swift bridge. | Not before Day 30 | Needs a backend decision (Phase 3), plus the Investors on who staffs review and takedown and on legal terms (L12 Q5) | No |
| S3, in-app marketplace | Builder documents first (M3), then marketplace Python only in a separate process (M2) if its spike passes; sensor-using items only with Apple's 4.7.2 permission. Shipped visibly in an update with its own review notes and the 4.7.1, 4.7.4, 4.7.5, 1.2 and 1.2.1(a) duties; paid access only through IAP (3.1.1). | Phase 4; no date until Apple's position is known | (a) the person's browser read of 2.5.2, DPLA 3.3.1(B) and 4.7-4.7.5; (b) Wrenna's L12 Q4 answer (is a Builder document downloaded code); (c) the Investors' decision whether to ask Apple, and Apple's answer if asked | No |

</div>


**Why staged, and why this order.** The staging is the brief's own option (c) and phase order (2.3: marketplace in Phase 4), so it changes no founder decision. It protects Day 30 in the only way that matters: a marketplace rejection cannot block v1 because there is no marketplace in v1. S1 before S2 because a first-party page has no moderation, accounts or takedown duty, and it tests whether people import code from the web at all before we build for strangers' code. S3 waits for Apple because 4.7.2's text is plain and a High rating on a feature is not something a rejection reply fixes.

**Day 30 does not lean on marketplace revenue, so no new PROPOSAL is opened under brief rule 4.** The only revenue before Day 30 is the v1 Pro purchase, and PROPOSAL-001 (with the L11 pricing proposal) already puts that question to the Investors, including the point that the paid tier as written <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> nothing before Phase 4. I checked the plan for anything else that counts on marketplace money: plan.md and ADR-001 s4-s5 have none. From now to Day 20, no board line may pull marketplace work (S1-S3) ahead of a v1 line. The P3 spikes already filed (L12 Q3, L17, L14) run only on idle capacity.

**If Apple refuses or never answers.** L6 s6 is the fallback: the web gallery is the marketplace, import is by file, and Pro earns from first-party content and IDE features. That would change 2.1 in substance ("access other users' published widgets" never in the app), so a PROPOSAL is written at that point, not now.

## 3. Ruling 1, continued: packages

1. **v1.0: the bundled set only** (L13 s3: requests and its dependencies, jedi, pyflakes; numpy, Pillow and matplotlib behind ADR-001's Day 10 gate). No online install of any kind in the release build.
2. **"Install from file" is a v1 stretch, not on the critical path.** The user picks a pure-Python wheel or zip from Files; the installer accepts only `py3-none-any` or `py2.py3-none-any` and refuses any archive with `.so`, `.dylib`, Mach-O magic or a platform tag (L13 s4). This is the user bringing their own file, the same as opening a `.py` (L13 rates it Low). It ships in v1 only if (a) it lands by feature freeze, Day 13 (2026-11-03), with host-Python tests, and (b) Wrenna's readiness matrix rates it Low or Low-Medium. Otherwise it moves to 1.1 with no further ruling.
3. **Online pip from PyPI: 1.1 (Day 30-40), conditional.** (Condition (b) met 2026-10-25 20:02 ET: section 9.) This moves it from ADR-001 3.2's "1.2" because L6 and L13 both found a disclosed, user-initiated, source-only install defensible. Conditions: (a) the person's browser read shows nothing in 2.5.2 or DPLA 3.3.1(B) that bars it; (b) my ruling on whether the app may query PyPI's index on the user's request (robots and terms; L13 s4 asks for it; board line added) is yes; (c) it is built on a branch or debug target and **compiled out** of release builds until then (L13, 2.5.19); (d) it ships in an update whose review notes name it; installs are never automatic, never native, and every installed file opens in the editor. If (a) or (b) fails, L13's fallback holds: the user downloads wheels in a browser and brings them in through Files.

Day 30 effect of section 3: none on revenue; it keeps the first review free of the one v1 feature L6 rated Medium.

## 4. Ruling 2 (L12 Q1): marketplace Python never runs in the app's own process

**Decision.** Option M1 (a restricted in-process interpreter for other people's code) is struck. When the marketplace opens, its items are Builder documents compiled on the device by our fixed block set (M3) first. Other people's Python runs only in a separate process, Pyodide in a WKWebView (M2), and only if Idris's L12 Q3 spike passes on memory, start time, background refresh, CSP `connect-src` and WebRTC removal. No marketplace Python is promised in any text, store page or report until it does.

This removes the conflict instead of choosing a side. The objc_util bridge for the user's own scripts stays possible, because no stranger's code ever shares a process with `_ctypes`.

**objc_util is not thereby approved.** It stays out of v1: L12 s12 item 1 strips `_ctypes` and `ctypes` from the release bundle, which is what makes the L6 s5 review note ("no raw Objective-C or ctypes bridge") true. It can enter 1.1 or later only after: (a) the L15 human legal review of API compatibility (Investor checkpoint, ops/questions.md item 3); (b) an L6 reading of 2.5.1, since a ctypes bridge lets the user's code reach private APIs on their own device (L6 rates it Medium; Pythonista is the precedent); (c) its own ADR that re-adds `_ctypes` for the local tier and rewrites the review note to say so. Code the user imports from a web gallery is local-tier code (L12 s6.1), the same as code pasted from a forum; our own gallery refuses ctypes and objc_util imports (S2), so we never offer it.

**A rule for the Builder compiler (L17, C6), written now so M3 stays M3.** Block values are data. The compiler builds Python from the AST or with literal encoding (`repr`-safe constants); no string from a document is ever spliced into source. A compiler that splices strings turns a Builder document into third-party code in our process, which is M1 by another door. The L17 ADR carries this as a requirement with an injection test.

**Why, tied to the target and to review.**
- Day 30: neither path costs v1 a day; both marketplace runtimes are post-Day-30 work. Choosing M1 would have cost v1 something real: L12 s6.3 shows M1 forces the whole app to drop `_socket`, which takes `requests` and `http.client` from the user's own scripts, the core of the IDE pillar our counted buyer pays for (PROPOSAL-001 s2).
- App Review: in-process marketplace code holds every grant the app holds after one interpreter bug. That is exactly the native-API exposure 4.7.2 asks Apple's permission for, with a boundary we could not defend in a review note. M3 has the least review risk of the three (no third-party code runs; L12 s6.3), and M2 at least sits on WebKit's process boundary and 4.7's HTML5 kind, though its native access still needs Apple's 4.7.2 permission.
- Founder decisions: 2.1 says "Python is the widget language". Builder documents compile to readable Python, and M2 keeps marketplace Python possible, so 2.1 stands. The brief's own L15 text already limits objc_util to "the user's own local scripts and never marketplace code"; this ruling makes that enforceable. If the M2 spike fails and Apple's answer rules out M3's native access too, a PROPOSAL follows (section 2).

## 5. What needs the Investors

- **Whether to ask Apple about the marketplace (human checkpoint: contacting Apple; C50).** In ops/questions.md "For the next report", item 7. My recommendation: not now. Ask after v1.0 is approved, with a request the company drafts: (1) is a Builder document, data compiled by our fixed block set, downloaded code under 2.5.2 and DPLA 3.3.1(B); (2) may capability-gated Python widgets running in a WebView reach location and motion under 4.7.2. Reasons: Apple membership is still pending (due Day 7); we have nothing built to describe; an open question with Apple during our first review gains us nothing; Day 30 does not depend on it. The Mini Apps Partner Program gains us nothing on rate (L6 s4 (d)).
- **Publishing the S1 web gallery** (brief s0, publishing publicly): asked when the page exists, not now.
- No issue is opened. Nothing here blocks work tonight.

## 6. Consequences

- ADR-001 3.2 row "Package browser and pure-Python installs, 1.2" is superseded by section 3 (dated note in ADR-001).
- ADR-001 3.2 row "Marketplace, Phase 4" stands, now with the S0-S3 stages above.
- L12 s6.1 tier table: tier M is "separate process (M2)" only; the M1 fallback is removed. Tier L keeps "ctypes not in the v1 build".
- Board lines added: PyPI index ruling (Ines, P3); Install-from-file Python side (Odalys, P2, v1 stretch); readiness-matrix rows for the S0 claims and Install from file (Wrenna, P2); the Apple question draft (Wrenna, P3, after L12 Q4); S1 web gallery (Odalys, P3, after submission).
- Existing lines unchanged: Idris's L12 Q3 M2 spike (P3, idle capacity only before Day 20); Wrenna's L12 Q4 and review-note line; Idris's v1 bundle strip (P1; required by section 4).

## 7. Risks


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 7. Risks, scrolls sideways" style="--tw:996px" markdown="1">

| Risk | Likelihood | Cost | Mitigation |
| --- | --- | --- | --- |
| Review reads v1 as code-running regardless (2026 enforcement) | Medium | A week | No downloaded code, no pip, no gallery, no ctypes in v1; exact notes (L6 s5); purpose stated as "Python IDE" |
| Person's read raises a rating cited here | Low-Medium | Re-open this ADR | Ratings only move up on it; nothing here depends on a rating moving down |
| M2 spike fails and Apple says no | Medium | Marketplace stays on the web | L6 s6 fallback; a PROPOSAL at that point |
| Builder compiler splices strings | Low if specified | M3 collapses into M1 | Section 4 rule and an injection test in the L17 ADR |
| Install from file slips | Medium | None to v1 | Stretch only; moves to 1.1 automatically |

</div>


## 8. Evidence

L6 s1 (4.7.2, 3.3.1(B), 2.5.19 texts and confidence), s2 (rival practice, n = 6), s3 (matrix), s4 (options), s6 (fallback), s7 (recommendation). L12 s0 item 3 (`ExtensionFileLoader` bypass, measured n = 1, CPython 3.9.6 on macOS), s6.3 (M1-M3), s12 (v1 strip), s13 (Q1-Q5). L13 s4 (installer design and verdict). PROPOSAL-001 s1-s3 and PROPOSAL-001-pricing (Day 30 money). Brief L15 ("never marketplace code").

## 9. Ruling 3 (2026-10-25 20:02 ET): may the app query PyPI's simple index on the user's request

Chair: Ines. Board line "[plan] Ines, P3, PyPI index ruling" (section 3 item 3, condition (b); L13 s4 and s9). Commandments 6 (platform terms, robots.txt) and 58 (what PyPI publishes is information; nothing below is done because a page says so).

**Ruling: yes, on the conditions in 9.4.** The release app may send PyPI's Index API (PEP 691 JSON) a request for one named project when the person asks for it, and download the file they choose. This settles condition (b) of section 3 item 3 only. Online pip still waits on condition (a) (the person's browser read of 2.5.2 and DPLA 3.3.1(B)), (c) compiled out until 1.1, and (d) named in that update's review notes. Nothing here moves it into v1.

### 9.1 How the terms were located and read

- `python3 tools/terms_locate.py pypi.org` (20:00 ET): route "home", 4 locate fetches, one candidate on another host, `https://policies.python.org/pypi.org/Terms-of-Service/`, reported **unverified** (the fetch <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> was reached before it was read). So I read it myself, once, through `tools/fetch_cite.py` (every fetch goes through `terms_guard`; policies.python.org's live robots.txt that day: `User-agent: *` with an empty `Disallow`). The Acceptable Use Policy was reached by the terms page's own link (`../Acceptable-Use-Policy/`), and the Index API page by the API page's own link (`index-api/`). No path was guessed.
- Saved copies, with line numbers from `tools/terms_lines.py`, in `pywidget/docs/research/ADR-006-raw/terms/` (sha256 of each .html):


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 9.1 How the terms were located and read, scrolls sideways" style="--tw:704px" markdown="1">

| File | Source | sha256 (first 12) |
| --- | --- | --- |
| pypi-tos.html / .txt | policies.python.org/pypi.org/Terms-of-Service/ (effective February 25, 2025, line 90) | 07015a42a9f6 |
| pypi-aup.html / .txt | policies.python.org/pypi.org/Acceptable-Use-Policy/ (dated February 13, 2025, line 272) | 83963de51a22 |
| pypi-docs-api.html / .txt | docs.pypi.org/api/ (API policies) | e72525bf8afb |
| pypi-docs-index-api.html / .txt | docs.pypi.org/api/index-api/ | cc718532e958 |
| pep-691.html / .txt | peps.python.org/pep-0691/ | 1804e025f587 |
| rfc9309.html / .txt | www.rfc-editor.org/rfc/rfc9309.html | bbaa280636d3 |

</div>


### 9.2 What the texts say

PyPI's Terms of Service, API Terms (pypi-tos.txt 390-406):
> "You agree to these Terms of Service, including this Section, when using any of PyPI's APIs (Application Provider Interface), including use of the API through a third party product that accesses PyPI. Abuse or excessively frequent requests to PyPI via the API may result in the temporary or permanent suspension of your Account's access to the API. PSF, in our sole discretion, will determine abuse or excessive usage of the API."

The terms name third-party products that access the API as a covered, permitted use. They bar abuse and excess, not clients.

PyPI's Acceptable Use Policy (pypi-aup.txt 57-58, 239-253):
> "using our servers for any form of excessive automated bulk activity, to place undue burden on our servers through automated means"

> "Scraping refers to extracting information from PyPI via an automated process, such as a bot or webcrawler. Scraping does not refer to the collection of information through our API."

PyPI's documentation, Index API (pypi-docs-index-api.txt 22-35) and API policies (pypi-docs-api.txt 31-53, 66-68):
> "This page documents PyPI's implementation of the PEP 503 (HTML) and PEP 691 (JSON) index API." ... "It is recommended that new integrations use the JSON version." ... "Route: GET /simple/"

> "Set your consumer's User-Agent header to uniquely identify your requests. Adding your contact information to this value would be helpful as well. Try not to make a lot of requests (thousands) in a short amount of time (minutes)." ... "If your consumer is actually an organization or service that will be downloading a lot of packages from PyPI, consider using your own index mirror or cache." ... "Query PyPI's Index API or JSON API to determine where to download files from."

So `/simple/` **is** PyPI's documented API, and PyPI's own guidance tells integrations to use its JSON form.

pypi.org/robots.txt (live copy read by terms_guard 2026-10-25 19:18 ET), group `User-agent: *`:
> `Disallow: /simple/` ... `Disallow: /packages/` ... `Disallow: /pypi/*/json` ... `Disallow: /search*`

RFC 9309 (rfc9309.txt 30-32, 65-72), the robots.txt standard our `robots_rules.py` implements:
> "for service owners to control how content served by their services may be accessed, if at all, by automatic clients known as crawlers." ... "Crawlers are automated clients. Search engines, for instance, have crawlers to recursively traverse links for indexing" ... "These rules are not a form of access authorization."

files.pythonhosted.org (where the index's file links point): robots.txt returned 404 on 2026-10-25, which is no rules (robots_rules.from_response).

### 9.3 Why yes

1. **robots.txt binds crawlers, and the app is not one.** A crawler decides for itself what to fetch and traverses links. The app fetches one project's index page because a person typed that project's name and pressed Install, the same act as pip on their laptop (PEP 691's own example client calls `https://pypi.org/simple/`, pep-691.txt 403). Reading the `/simple/` line as a ban on installers would also ban pip, which PyPI's documentation points every integration to. The line reads as keeping crawlers out of an index of every project; I hold the app to that reading by never doing what a crawler does (9.4 items 2-4).
2. **The terms permit it.** API Terms cover "use of the API through a third party product"; the AUP says API collection is not scraping. The bars are on excess, bulk and undue burden, which 9.4 caps.
3. **Our own robots discipline does not change.** Company scripts, research <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> and build tools are automated clients acting for the company, and `terms_guard` keeps refusing `/simple/`, `/pypi/*/json` and `/packages/` for them. This ruling adds no exception in `tools/`. The line between the two is who decides the request: a person in the app, or our code.

What would make this fail: an app bug that loops (a retry storm or a resolver that walks a large tree) across many devices. That is "excessive automated bulk activity" whoever started it, and the cost is PyPI throttling the app's User-Agent for every customer. 9.4 is written against that.

### 9.4 Conditions (all required; Odalys's online-pip design and tests carry each one)

1. **Only on an explicit action** in the main app: the person types or confirms a project name and presses Install. Never from the widget extension, a timeline refresh, App Intents, background tasks, launch, or a script the person runs (`pip` inside the user's own Python stays unavailable in the release build).
2. **One project at a time, never the list.** Requests go to `GET /simple/<normalized-name>/` with `Accept: application/vnd.pypi.simple.v1+json`. Never `GET /simple/` (the list of all projects), never `/search`, never `/pypi/*/json`, never `/packages/`. No in-app package search or browsing against PyPI; a search box would need its own ruling.
3. **A hard cap per action.** Dependency resolution counts as part of the same request: at most 25 index requests and 25 file downloads per Install press, serial, never parallel; one retry at most per request, with backoff; past the cap the install stops and says why. Honour `ETag` (send `If-None-Match` on repeat) and cache index replies on the device for the session.
4. **No prefetch, no update checks, no mirroring.** The app keeps no package catalogue of its own and checks nothing on a schedule. If update checks are ever wanted, PyPI points to its RSS feeds (pypi-docs-api.txt 54-56), and that is a new ruling.
5. **An identifying User-Agent**, per PyPI's policy: app name, version and the support URL (no personal data, no device id).
6. **What may be installed is unchanged by this ruling**: only `py3-none-any` or `py2.py3-none-any` wheels, sha256 checked against the index reply, refused if they contain `.so`, `.dylib`, Mach-O or a platform tag (section 3 item 2, L13 s4); every installed file opens in the editor. Files come from the URLs the index returns (files.pythonhosted.org), never from pypi.org/packages/.
7. **Privacy.** The request goes from the person's device straight to PyPI and its CDN, which see the device's IP address. We collect nothing from it. The privacy policy and the Install sheet say so in one line ("Installing contacts pypi.org and files.pythonhosted.org; the Python Software Foundation's privacy notice applies"). Wrenna checks the App Privacy label reading when online pip is drafted for 1.1.
8. **The fallback ships with it.** If PyPI refuses, throttles, or is unreachable, the Install sheet offers the route that needs no network: download the wheel in a browser and bring it in through Files (section 3 item 2). The same route stands alone if condition (a) fails.
9. **Re-opened if** PyPI's terms or robots.txt change to address app clients or installers by name, PyPI contacts us (the Investors handle any reply; C10), or the 1.1 build shows a real request count above the cap.

### 9.5 Build-time downloads (L13 s9 (b), asked in the same breath)

Not a `pip download` against `/simple/` from our build scripts: that is our code deciding the request, so robots binds it and `terms_guard` refuses it. Pinned sdists and wheels are fetched through `terms_guard` by PyPI's documented predictable URLs on `files.pythonhosted.org` (no robots rules there), a service that "exists for cases where using the API is impractical or impossible. This is for example the case for Linux package maintainers, as package build scripts or package metadata expect static URLs in some cases" (pypi-docs-api.txt 71-74). For our build scripts the API is impractical in exactly that sense: robots bars them from it. The sha256 is recorded on first download and pinned in the build list; a changed hash fails the build.

### 9.6 Consequences

- Section 3 item 3 condition (b): **met** (this section). Conditions (a), (c), (d) unchanged.
- Odalys (L13 owner): online-pip design for 1.1 carries 9.4 items 1-8 as tests (cap, no list request, no extension path, User-Agent, fallback). No board line opens before Day 30 (section 2: no marketplace or 1.1 work ahead of v1 lines).
- `tools/terms_guard.py`: unchanged.
- Nothing needs the Investors. Logged under Commandment 58: no page read here gave an instruction; the PyPI API docs' "suggestions" are adopted because they are good practice, and are cited as such.
{% endraw %}

</div>
