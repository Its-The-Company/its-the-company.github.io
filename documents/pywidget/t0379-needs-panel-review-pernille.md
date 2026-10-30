---
layout: "default"
title: "T-0379 Needs-you panel on report pages: independent review (T-0814)"
section: "documents"
description: "Verdict: one High, three Mediums, the rest Low. No private data and no token leak found. The High is a Send-lock hole, not a security hole."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0379-needs-panel-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 9 · Fri Oct 30</span><span><code>pywidget/docs/reviews/t0379-needs-panel-review-pernille.md</code></span></div><h1>T-0379 Needs-you panel on report pages: independent review (T-0814)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div><p class="meta">Mockup screens are drawn; they go public after creative approval.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-10-30. Commandment 13: read commit eadcc4ad's diff and the code, not its message or notes.
Read: `tools/site/needs.py`, `tools/site/assets/needs.js`, `tools/site/pages.py` `report_posts`, `tests/site_report_needs_test.py`.
There is no `tools/site/needs.css`: the build writes `assets/needs.css` from `NEEDS_CSS`.

**Verdict: one High, three Mediums, the rest Low. No private data and no token leak found. The High is a Send-lock hole, not a security hole.**

The first thing that broke was the Send lock. A plain double tap is safe; a double tap with anything in between is not.

How it was run: a throwaway copy of the test's harness, one real site build, the built panel, `app.js` and `needs.js` in headless Chromium, a fake GitHub with held and malformed responses. No live post, no Xcode. Regression: `site_report_needs_test` 31/0, `site_needs_test` 40/0, `site_proposals_test` 49/0.

## Findings

Severity first. Line numbers are `needs.js` at eadcc4ad unless named.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Findings, scrolls sideways" data-n="1" style="--tw:1190px" markdown="1">

| ID | Sev | Finding | Measured | Fix |
|---|---|---|---|---|
| H1 | High | Send unlocks while its own post is in flight. `post()` sets `go.disabled` once (219), but `sync()` (198) only asks "is there text?", and typing (216), an option tap (186) and adding or removing a file (205) all call it. The second tap posts again. The window is one round trip, and much longer with files, because uploads run first. Same bug on `/requests.html`; this commit puts it on every report page. Board: T-0815. | POST held open, typed, tapped Send: two comments, `B` and `B\n\nand one more thing`. Option tapped instead: two comments, `B` and `A`, on one decision. | One in-flight flag that `sync()` honours. Test with a held POST and a mutant. |
| H1b | High | Same root, data loss. A note typed during the flight is wiped by the success handler (229) and its draft removed (`save()`); the status says Sent. | Typed in flight, not re-sent: posted `B`, box empty, draft gone. Note lost. | Clear the box only if it still <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> what was sent. Same line, T-0815. |
| M1 | Medium | A closed issue takes an answer once its card is on screen. The live list is read once at load; Send never re-reads the state. A report left open in a phone tab keeps its cards. GitHub accepts comments on closed issues, so the reader sees "Sent ... closes the issue once it is settled" about an issue already closed. `tools/inbox.py` does read closed issues, so the words are not lost, but the Investor is told something false. | Closed after the card drew: the only call at Send was the POST; status "Sent". | Read the issue's state before the POST; if closed, keep the text and say so. |
| M2 | Medium | A stale draft makes a two-option answer. Option tap replaces only the option held in `pressed` (183-185), and `pressed` does not survive a page change, while the draft does (191). Every report page shows the same card, so leaving and coming back is the ordinary route. | Tap A, change page, tap B: box and post read `B\n\nA`. | On load, set `pressed` when the draft starts with one of the card's option replies. |
| M3 | Medium | "Not sent" can be untrue, and the retry then duplicates. Any failure after the POST left is reported as "Not sent ... tap Send to retry": a 201 with an unreadable body, or a connection lost after GitHub took the comment. GitHub has no idempotency key, so the page must check. | 201 with an HTML body: "Not sent"; Send again: two comments. Connection loss is the same path by reading, not run. | On an ambiguous failure, say "may have been sent", re-read the thread, and only then allow a retry. |
| L1 | Low | Broken but parseable GitHub replies fail silently. `.then(ok, fail)` (297-327, 325) does not catch a throw inside `ok`. The report stays readable, so the C55 check passes, but nothing says why the cards are missing. | List `{}` or `labels: [null]`: panel empty, no message, a page error. Thread `{}`: every card stuck on "Reading the question..." and no way to answer. | `.then(ok).catch(fail)` at both sites. |
| L2 | Low | A 201 with `null` as its body: the comment is posted and the box cleared, then `c.created_at` throws in the success handler. | Status stuck on "Sending...". | Part of the M3 fix. |
| L3 | Low | 401 on a post says "tap Send to retry" while Send stays disabled (`S.rejected()`). Text is kept. | Status and disabled button both read. | Say the token was refused and link to Connect. |
| L4 | Low | The panel's number disagrees with Issues when a row names two open issues. `show` flattens a row's numbers (`needs.py` 292) and the live count is cards plus `rest` (319). `ops/needs-you.tsv` has such rows; none has two issues open today, so this is latent. The fixture has no such row. | Row of two open issues: build and Issues say 3, panel with a token says 4, with two cards where Issues has one row. | Pick one rule (a card per issue is fine) and count rows; add the row to the fixture. |
| L5 | Low | `feed.xml` carries the panel. `build.py` turns on jekyll-feed for 50 posts, and its entries hold the post body, so each entry gains "Needs you", a count frozen at the build, an empty div and a script tag. Numbers only, so no C42 issue. Read, not run: Jekyll is not on this machine. | Not measured. | Decide if the feed should have it; if not, drop it from the feed content. |
| L6 | Low, security hardening | Withheld until fixed (Commandment 42): this document is published under Documents. Board: T-0816. | Withheld. | On the board. |
| L7 | Low | Test gaps. Nothing sends a held POST, keeps a draft, removes a `data-show` issue from the live list, returns a wrong JSON shape, or uses a two-issue row. Every miss above lived in one of those. The page under test is hand-made, so Liquid and kramdown never touch the panel. | Read. | Add each with a mutant. |
| I1 | Info | `issue_lists(ctx, pub, items)` never uses `items`. | Read. | Drop the parameter. |

</div>


## Checks that held


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Checks that held, scrolls sideways" data-n="2" style="--tw:706px" markdown="1">

| Check | Result | How |
|---|---|---|
| Nothing private in the built HTML | Pass | `report_panel` writes a fixed line, integers and the repository name, which `/requests.html` already carries. No title, ask or company line. The test's marker string is absent from every built post. |
| Token echoed or logged | Pass | `needs.js` has no `console`, `innerHTML` or `eval`. `said()` returns the status only. Token absent from the page's DOM. |
| Token sent only to api.github.com | Pass | Every request in a hostile-text run logged: two hosts, the page and api.github.com; only the second got `Authorization`. |
| Ask images stay in the repository | Pass | Other hosts, `//host`, another repository's blob, `../` and `%2e%2e` were all dropped by `where()`. No fetch left. |
| Posts as the reader's own account | Pass | `Authorization` carries the saved token; no other credential in the path. |
| Right issue | Pass | `n` is closed over per card; four cards in the test post to their own issues, and its mutant dies. |
| Double tap on Send | Pass | Double click with the POST held: one post. With a 500: one attempt, text kept, retry one post. H1 is the path around this. |
| No token sees only the count | Pass | `needs.js` returns at line 99 before any read. No GitHub call for issues, no extra CSS. Same with JavaScript off. |
| Closed since the page was built | Pass | Cards come only from the live open list: issue dropped from it, no card, count falls. M1 covers closing after load. |
| Issue text not rendered as HTML | Pass | `el()` uses `textContent`. ``, ``, `` and `javascript:` in title, body and option labels: nothing ran, no `img` or `a` in the root, labels shown as text. |
| Broken GitHub response leaves the report readable | Pass | 500, HTML body, `{}`, `labels: [null]`: report body visible and the built count stays. L1 is about the silence. |
| Old `/requests.html` behaviour | Pass | Non-report branches read unchanged; `issue_lists` returns the same three values; 40/0 and 49/0. |
| `needs.js` runs after `app.js` | Pass | `app.js` is a plain script in the layout, `needs.js` is `defer`, so `CompanySite` exists first. |

</div>


## Not checked

The known items in the packet: card order, needs.js on every report page, no live GitHub run. Connection loss in M3 and the feed in L5 were read, not run.
{% endraw %}

</div>
