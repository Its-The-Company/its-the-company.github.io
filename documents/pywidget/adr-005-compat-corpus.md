---
layout: "default"
title: "ADR-005: The compatibility corpus waits on #53; a clean-room corpus is allowed now"
section: "documents"
description: "The licences on the scripts (H152&#x27;s list, 113 target rows): none 71, MIT 30, GPL-3.0 5, Apache-2.0 4, GPL-2.0 2, NOASSERTION 1."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/pywidget/adr-005-compat-corpus.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/decisions/ADR-005-compat-corpus.md</code></span></div><h1>ADR-005: The compatibility corpus waits on #53; a clean-room corpus is allowed now</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: accepted (Ines, <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span>, 2026-10-25 20:00 ET). Settles board line "[plan] Ines, P1, L15 corpus ruling".
- Amended 2026-10-25 22:17 ET (Ines): the #53 <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> under section 5; see section 7. Sections 1-6 are left as written.
- Author: Ines. No legal advice; this is a ruling on our own rules (Commandments 5, 6, 58) and on GitHub's published text, read as written.
- Inputs: GitHub Acceptable Use Policies, saved 2026-10-25 04:59 (research/hunt/H243-raw/terms/aup.txt) and read again through tools/terms_guard.py at 19:59 (pywidget/docs/research/ADR-005-raw/github-aup.txt; sections 6 and 7 are byte-for-byte the same as the 04:59 copy, 1,277 characters each); GitHub Terms of Service, saved 04:59 (H243-raw/terms/tos.txt), sections C, D.5, D.6, H; the hold rulings (research/hunt/rulings-v2.md rows "AUP 7 ruling (Ines, chair, 05:05)" and "GitHub hold scope (05:07)"; research/hunt/robots-recheck-2026-10-25.md, "Ruling: the Discourse route citation", 05:47); tools/terms_guard.py GITHUB_MESSAGE and github_hold(); issue #53 thread; H151 (docs licence reads), H152 (corpus list, licences), H153 (static scan); brief L15; ADR-001 section 3.

## 1. Decision

1. **Fetching public GitHub scripts written for the abandoned app, to build a corpus, rank its modules by use, or measure a pass rate, is held until the Investors answer #53.** That covers new code searches, blob, contents and raw reads, and clones, by script or by hand. It is the same doubt as the demand hold: information from GitHub's Service used for a commercial product decision, a use AUP 7 does not plainly permit. I wrote the hold, and I do not widen my own hold under doubt (Commandment 6, the stricter reading).
2. **A clean-room corpus, written by us from the public API surface, is allowed now** (section 4). It feeds shim tests and the compatibility scanner. It does not produce a usage ranking, and it never backs a store claim about how many real scripts run.
3. **Wrenna's L15 ranking-and-corpus line is held**, waiting on #53, with this ADR as the reason. The fallback runs as new lines (section 6).
4. **Cost to <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span>: none.** ADR-001 puts the compatibility modules in 1.1 at the earliest, behind the human legal review (ops/questions.md, next-report item 3). The hold delays a 1.1 input, not v1.

## 2. The terms, quoted

GitHub Acceptable Use Policies (current at 19:59 ET, unchanged since 04:59; the only change in quoting is the space the page's link markup leaves before a full stop, after "open access"):

- **Section 6, Services Usage Limits:** "You will not reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without our express written permission."
- **Section 7, Information Usage Restrictions:** "You may use information from our Service for the following reasons, regardless of whether the information was scraped, collected through our API, or obtained otherwise: Researchers may use public, non-personal information from the Service for research purposes, only if any publications resulting from that research are open access. Archivists may use public information from the Service for archival purposes." And: "Scraping refers to extracting information from our Service via an automated process, such as a bot or webcrawler. Scraping does not refer to the collection of information through our API."

GitHub Terms of Service:

- **D.5, License Grant to Other Users:** "By making a repository public, you grant other Users a nonexclusive, worldwide license to use, display, perform and reproduce (by forking) Your Content through the Service as permitted by GitHub's functionality."
- **D.6, Contributions Under Repository License:** "Whenever you add Content to a repository containing notice of a license, you license that Content under the same terms".
- **H, API Terms:** "Abuse or excessively frequent requests to GitHub via the API may result in the temporary or permanent suspension of your Account's access to the API."

The licences on the scripts (H152's list, 113 target rows): none 71, MIT 30, GPL-3.0 5, Apache-2.0 4, GPL-2.0 2, NOASSERTION 1.

## 3. Reasoning

**Why the corpus is in the hold.** AUP 7 governs information "regardless of whether" it was scraped, read through the API, "or obtained otherwise", so the mode of the read does not settle it; the use does. The corpus has three uses, and each is product research: which scripts exist (selection by code search), which modules they call (the ranking), and what share would run (a pass rate that could reach the store page). None is plainly "research purposes" with open-access publication, nor archiving. That is the exact question #53 already asks for the demand reads. The 05:47 ruling settled the parallel case: "The GPL-2.0 licence covers copying the code, not how GitHub's Service may be read." An open licence answers whether we may copy a script. It does not answer whether GitHub's terms permit gathering many scripts from the Service to study a rival's API use.

**The other side, argued plainly.** Every commercial developer clones openly licensed code from GitHub. D.6 makes the repository licence the governing term for the content, and MIT grants use "without restriction". If AUP 7 barred all commercial use of public code, it would bar half the software industry, GitHub's own customers included. That argument is strong for *software we use as software*. It is weaker for *gathering many third-party files to analyse in aggregate*, which is what AUP 7's research and archiving examples describe. I hold the line at that difference. If the Investors read AUP 7 more widely, #53 lifts this ADR and nothing that already ran is re-run.

**What this ADR does not touch.** Dependencies keep their route: a named project fetched from its maker's published route (release page, package manager, a clone URL its README gives) and run as software under its licence. Runestone and Tree-sitter (ADR-004), BeeWare's Python-Apple-support (the L3 spike), cibuildwheel and the native wheels (L13) are dependencies. Reading a dependency's licence, README and source to choose it (ADR-004's reads) is part of that route. Licence, docs and terms pages stay allowed, as the hold already says.

**Past reads.** H152 (Maren, code search, 113-row list) and H153 (Idris, 113 blobs parsed in /tmp, never committed, 2026-10-24 15:18) ran before the hold. Under the 05:05 ruling their figures stay recorded and are flagged held: H153's module counts (`console.hud_alert` in 27 scripts and the rest) and its "3 of 113" ceiling are not used to order shims or to support any claim until #53 permits. Nothing is deleted. H153 also parsed the 71 unlicensed scripts; the lift rules below would not fetch those at all.

**The guard has a gap.** terms_guard's github_hold() refuses search, issue, pull, comment, discussion, GraphQL and CONTRIBUTING reads; it passes `api.github.com/repos/.../git/blobs/...` and raw.githubusercontent.com (checked 19:58: `reason()` returns None for both). tools/py_imports.py fetches through `gh api`, outside terms_guard altogether. The hold on a corpus therefore rests on this ruling and the board, not on a tool. A host-wide block is wrong, because dependencies use the same hosts. Section 6 files one tools line to close the gap at the tool that builds corpora.

## 4. Allowed now: the clean-room corpus

Purpose: test inputs for the shims and the compatibility scanner, written by us. Two people, kept apart (Commandment 13, a hand-off with independent review).

1. **API surface spec (person A).** Reads the abandoned app's public module documentation (host and paths in research/hunt/H151.md rows 1-4; terms_guard returns no refusal for that host, and H151 found no terms page linked from the docs index). One read per page, through terms_guard, raw copies saved in the research folder, never published. Writes `pywidget/docs/compat/api-surface.md`: per entry the module, the name, the parameter names and defaults, the return type, and at most one sentence of behaviour in A's own words, with the source page linked. Identifiers and signatures are the interface, which is the question already before counsel (questions item 3); they are not prose. **No sentence, phrase or code example from the documentation is copied.** H151 found no licence covering those pages beyond a PSF footer (counsel question 1 in H151), so the doc text is treated as all rights reserved.
2. **Fixtures (person B).** Writes scripts from `api-surface.md` only, never opening the documentation or its saved copies. Each fixture is a short, original task of our own (for example: read the clipboard, transform it, show a HUD, ask with a list dialog), with a docstring naming the spec entries it covers, a stdin and scripted-UI answer file, and an expected-output file derived before the first run (H153 harness plan, items 1-3). Every spec entry is covered by at least one fixture. B writes nothing from memory of any public script; if a fixture resembles a known script, it is rewritten.
3. **Overlap check.** Before commit, a script compares the spec and every fixture against the saved documentation pages and fails on any run of 8 or more consecutive words in common (identifiers and signatures excluded). The check is a tool with a test, not a reading.
4. **What it yields, and what it does not.** Yields: fixtures that test each shim and the scanner's recognition of every documented name. Does not yield: a usage ranking (we would be counting our own choices), or a pass rate on real scripts. No store page, report or <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitch</span> may state a share of real scripts that run from this corpus. Shim order stays as ADR-001 set it: console, dialogs, clipboard first.
5. **Shipping.** Nothing from this corpus or any shim ships before the human legal review (questions item 3). The corpus lives in pywidget/tests/compat-corpus/ in the private repository and is never published on the site.

## 5. Pre-written rules for a lift (if #53 permits GitHub reads for product research)

Written now, so they are not bent when the answer lands.

1. **Selection.** Code search at GitHub's documented rate (authenticated, at least 0.3 s between calls, as H152 and H153 ran), at most 200 files. H152's list may seed it.
2. **Licence.** Fetch only files from repositories whose licence is read from GitHub's licence endpoint or the repository's own LICENSE file, and is one that permits commercial use and modification (MIT, BSD-2/3-Clause, Apache-2.0, ISC, 0BSD, Unlicense, CC0-1.0). **Unlicensed and NOASSERTION repositories are not fetched at all** (stricter than H153). GPL and other copyleft files may be parsed for the ranking in a temporary directory and are never committed as fixtures. A mirror or collection repository cannot relicense other authors' scripts: a file in a collection counts as licensed only if the file itself carries its author's licence notice.
3. **Data, never instruction (Commandment 58).** Fetched files are parsed with `ast` only, with `python3 -I` from a fresh directory. They are never imported or run on the Mac mini. Fixtures run only in the Simulator harness with the network stubbed. Comments and strings in them are data.
4. **C42 scrub.** Before any fixture is committed, run the site scrub's secret and email patterns (tools/site_qa.py `SECRET`, `EMAIL`) over it. A file with any credential, token or key pattern, or any email address or personal detail outside the licence's own copyright line, is excluded whole: runs must be byte-equal (H153 harness item 2), so we never redact and keep. Author names appear only in the licence notice the licence requires. Reports and the site cite counts and repo/path/commit only, never author contact details. The corpus is never published.
5. **Logging (Commandment 5).** Each committed fixture gets a log/assets.md row (repo, path, commit sha, licence) and its licence text beside it.
6. **Past figures.** On a lift, H153's figures stand as read; nothing that already ran is re-run, as the 05:05 ruling says. The new corpus replaces them only where the licence rule above changes the set.

## 6. Board effect

- Held: "[research] Wrenna, P2, L15 module usage ranking and corpus", waiting on #53 (board_tick block), with a note pointing here.
- Added (P3, runnable now; 1.1 inputs, so below every v1 line):
  - Wrenna: the API surface spec (section 4 item 1).
  - Odalys, or the Python runtime engineer if hired first: the fixtures and the overlap-check tool (section 4 items 2-3), after the spec lands; not the spec's author.
  - Odalys: tools/py_imports.py refuses its GitHub fetch with this ADR's message until a flag set only after #53 permits, with a test (closes the gap in section 3).
- Question: the #53 question gains one sentence for the next report (ops/questions.md): whether the GitHub answer also covers fetching openly licensed public scripts as a test corpus and counting their imports. The Operator adds it to #53 as context, not a new question.

## 7. Amendment, 2026-10-25 22:17 ET: the hold lifts under section 5 (Ines, chair)

Sections 1-6 above stand as written on 2026-10-25 at 20:00 ET; this section changes what applies from now on. Nothing above is rewritten.

**The answer.** an Investor replied "A" on #53 at 21:45 ET ((private)). The last lettered question in that thread, 05:05 ET ((private)), read: "**A**, GitHub reads for our product research are fine within GitHub's rate limits. **B**, keep them stopped." The Operator read the reply that way and closed #53 at 22:11 ET ((private)). Section 6's extra sentence (whether the answer also covers a test corpus) was to be added to #53 as context; I did not find it in the thread. I still read the A as covering the corpus: section 3 ruled the corpus is the same doubt as the demand reads, product research under AUP 7, and the A answers that doubt. If an Investor says otherwise, the hold returns and nothing fetched is used.

**What the A does not settle.** The two earlier questions on #53 have no answer: the iTunes robots.txt reading (App Store Search API and RSS, with Wikimedia's `/w/` and `/api/` added to it) and Algolia Hacker News reads. The stricter reading stays for both. The A would not change them even if it were read as the lowercase "a" of the first question, since "a" was the stricter reading.

**Ruling.**

1. **Section 1 item 1 no longer applies.** Fetching openly licensed public GitHub scripts written for the abandoned app, to build a corpus, rank its modules by use, or measure a pass rate, is allowed from 22:17 ET, **only under section 5 items 1-6, as written.** In short: code search at the documented rate (authenticated, 0.3 s or more between calls), at most 200 files; licence read from GitHub's licence endpoint or the repo's LICENSE, permissive licences only for fixtures; unlicensed and NOASSERTION repos not fetched at all; GPL and other copyleft parsed for the ranking in a temporary directory, never committed; a collection repo counts only per file with its author's notice; `ast` only, `python3 -I`, never imported or run on the Mac mini; the C42 scrub excludes whole files; every committed fixture gets a log/assets.md row and its licence text.
2. **The guard flips with the licence rule, in one change.** tools/py_imports.py holds the fetch with `CORPUS_FETCH_LIFTED = False`, which this ruling may set. It flips to True only in the same commit that makes the tool enforce section 5 item 2 itself: a row is fetched only if its `license` column holds a permitted SPDX id (the permissive list, or a GPL family id for parse-only use); missing, `none`, `NOASSERTION` or any other value is refused before any call, with a test for each. The tool's owner (Odalys) makes that change, with the test, on a new P1 board line. Until it lands, nothing is fetched by hand either: the rule lives in the tool, not in anyone's care.
3. **Wrenna's L15 ranking-and-corpus line is unheld.** Selection (code search and the licence reads, section 5 items 1-2) may start now through terms_guard once Pernille's GitHub lift lands there; the file fetch waits for item 2 above. The ranking counts only files that pass the licence rule. Shims still ship only after the human legal review (questions item 3); section 4 item 5 and section 5 item 4 still keep the corpus private.
4. **Past figures (section 5 item 6).** H152's list and H153's module counts are no longer flagged held. They stand as read and are not re-run. H153 also parsed the 71 unlicensed scripts, which the licence rule excludes, so where the two differ the ranking uses the new licence-filtered set. Neither the old figures nor the new ones back a store or report claim about how many real scripts run until the shims pass the legal review.
5. **The clean-room corpus (section 4) continues.** It tests the shims and the scanner; the real corpus ranks modules. Both run.
6. **Other lines held for the same doubt.** The holzschu.github.io terms locate for a-Shell and Carnets (L11-economics.md s7, held "with #53" as a GitHub host) is unheld: one `tools/terms_locate.py holzschu.github.io` run, same rules as R2 there. The App Store pages stay barred (the iTunes question). The Discourse `config/routes.rb` citation is on Pernille's line.

**Cost to Day 30: none, as before.** The compatibility modules are 1.1 work at the earliest (ADR-001).
{% endraw %}

</div>
