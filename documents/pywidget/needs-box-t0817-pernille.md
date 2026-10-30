---
layout: "default"
title: "Needs-you box send fixes (T-0815, commit 632989fe): independent review, T-0817"
section: "documents"
description: "F1 (P2, test gap and a small bug). &quot;Send the text without the files&quot; (the button shown when the token cannot save files) calls post(false), but sent = files.slice() is taken whatever withFiles is (needs.js:233 region)\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/needs-box-t0817-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 9 · Fri Oct 30</span><span><code>pywidget/docs/reviews/needs-box-t0817-pernille.md</code></span></div><h1>Needs-you box send fixes (T-0815, commit 632989fe): independent review, T-0817</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Read: the diff of 632989fe, `tools/site/assets/needs.js` box() as it stands (it includes T-0816's
change to mark()/head, commit 2b34c01c), `tests/site_report_needs_test.py`, `tests/site_needs_test.py`. Fake GitHub only;
nothing was posted. Both suites run green on HEAD (site_needs 40/0; site_report_needs all pass).

## <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Rulings</span>


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Rulings, scrolls sideways" data-n="1 5" style="--tw:1360px" markdown="1">

| # | Question | Ruling | Where |
|---|----------|--------|-------|
| 1 | One post per Send, with anything tapped in flight | Held | needs.js:208 (`fly ||` in sync), :237 (flag set before the first await), :279 |
| 2 | A note or file added in flight is kept | Held for Send; NOT held for "Send the text without the files" (F1) | needs.js:239-243, :253 |
| 3 | A closed issue is refused before any write | Held | needs.js:267 reads state before upload, PATCH and POST; an unreadable state refuses too |
| 4 | A draft option is swapped, not stacked | Held | needs.js:211-214 (mark on load, on input, after a tap); T-0816 widened it to a lone letter |
| 5 | Nothing says Not sent or offers a retry before the thread is read | Held | needs.js:274 (only 5xx or lost connection count as unsure), :259-265 check(); an unreadable thread sets `doubt`, so Send only checks |
| 6 | The follow-up on a closed issue still reopens | Held | needs.js:267 `re ?` skips the closed read; PATCH at :268 |
| 7 | The raised <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> is justified and still bounds growth | Held, with a note | tests/site_needs_test.py:139 |

</div>


## Finding

F1 (P2, test gap and a small bug). "Send the text without the files" (the button shown when the token cannot save files)
calls `post(false)`, but `sent = files.slice()` is taken whatever `withFiles` is (needs.js:233 region), so won() at :243
removes every file from the box although none was uploaded. The Investor's attachments vanish after a Sent message that
says nothing about them. The old code also cleared them, so this is not a regression, but it breaks the stated rule "clears
only what went". The test `no_write` (site_report_needs_test.py:433) never checks the file list after the text-only send.
Reproduced: a scratch copy of the suite with one added assertion (file list still shows the file) failed on both pages
(report panel and /requests.html), 176 pass, 2 fail; scratch removed. Fix: `sent = withFiles ? files.slice() : []`, plus that
assertion in no_write and a mutant for it. Board line added.

## Observations, no action

- The 2 s wait in check() and slice(seen % 100) are right for threads over 100 comments (thread() asks for the last page).
- A found comment is matched by exact text after the read state, so the same words posted earlier do not count (tested).
- The text-only button is not tied to `fly`, but post() hides `extra` synchronously, so it cannot be double-tapped.
- Cap: 21,504/7,936 became 23,552/8,704 for +1,319 B raw (+540 gz). The new room was 4.5% raw, and after T-0816 the file
  ships 22,822/8,459, so 730 B raw (3.2%) and 245 B gz (2.8%) are left. Growth is still bounded, and T-0816 did not raise it
  again, which is the honest sign. I could not verify the claim "the bytes could not come out" without rewriting the
  function; the read-back is 552 B raw by the author's count. Next fix needs a trim or a fresh justification.

## Do the tests fail if the fix is removed?

The suite carries 43 box mutants run against the shipped source (BOX_MUTANTS, site_report_needs_test.py:627 on), each
tied to a case. All "mutant source found" and "mutant caught" lines pass on HEAD. Items 1, 2 (Send path), 3, 4, 5 and 6
each have a named mutant (flag ignored for typing, option and file; success clears everything; files dropped; state not
read; no mark on load; every failure is Not sent; a 500 counted as sure; no doubt held; follow-up refused for being closed).
I did not rerun individual mutants; the suite does, and it was green. The one hole is F1: no mutant or assertion covers the
text-only path, so `sent` dropping files passes.
{% endraw %}

</div>
