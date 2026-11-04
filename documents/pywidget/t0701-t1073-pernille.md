---
layout: "default"
title: "T-1073 (T-0701 half): review of T-0701 (net.get Lows from T-0699), Pernille, 2026-11-02"
section: "documents"
description: "What the line asked (my T-0699 Lows): L1 a utf-7 body with a lone surrogate gives an empty reply and Python raises RuntimeError: map it to PyWidgetError, with a test. L2 C2 s6a: add named-charset bodies to the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0701-t1073-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t0701-t1073-pernille.md</code></span></div><h1>T-1073 (T-0701 half): review of T-0701 (net.get Lows from T-0699), Pernille, 2026-11-02</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Verdict: **PASS**

Scope: the review line names acd59eeb, a range ending at Maren's T-0632 note. The T-0701 code is 17108b8e
(Idris). The T-0632 half (9375dfc5, which is mine, and acd59eeb) is Idris's to review; I did not judge it.

What the line asked (my T-0699 Lows): L1 a utf-7 body with a lone surrogate gives an empty reply and Python
raises RuntimeError: map it to PyWidgetError, with a test. L2 C2 s6a: add named-charset bodies to the
exclusions, say "measured in the app", drop "errs high" unless evidenced. L3 run-cold.sh accepts a relative OUT.
L4 a failed run's sample leaves the results file.

## What I checked

- **L1:** `NetFetch.text` (`NetFetch.swift:203-205`) now re-decodes a charset-decoded string through its UTF-8
  view, so the lone surrogate becomes U+FFFD and the reply builds; the body survives instead of turning into an
  error, which is better than the line asked. `reply` (`NetFetch.swift:124`) also no longer returns empty bytes on
  a success it cannot serialise: it answers `PyWidgetError`. `NetFetchCharsetTests` covers the utf-7 reply end to
  end (text is U+FFFD) and `text()` for utf-7 and iso-8859-1.
- **L2:** C2 s6a now says "under the extension's limits (measured in the app)", lists named-charset bodies first
  among what was left out (all 55 samples took the UTF-8 path), and says "may err high". Matches the evidence.
- **L3/L4, host check:** copy of run-cold.sh in a scratch tree with a fake `tools/xc.sh`:
  relative `OUT`, 2 rounds x 2 cases green: exit 0, 4 lines in the file under the caller's cwd.
  Red (exit 65) adding one line: exit 1, the line moved to `OUT.rejected`, OUT byte-identical to before.
  Zero lines or two lines on green: exit 1 with the right counts.

## Findings

- **L1 (Low, no action):** a red run that adds **two** lines keeps both in OUT (checked: exit 1, OUT 2 lines, no
  `.rejected`). The script still stops and names the counts, so no bad sample goes in silently; a person must
  remove them by hand.
- **L2 (Low, no action):** after a rejection the message reads "went from 4 to 4 lines (want 5)" and does not
  say a line was set aside in `OUT.rejected`.
- **L3 (Low, no action):** the new `PyWidgetError` fallback in `reply` is not reached by any test; with `text()`
  now always valid UTF-8 I found no input that reaches it. A guard, not a path.
- **L4 (Low, no action):** `Array(s.utf8)` plus the new String adds two transient copies of a named-charset body
  (up to 2 x 256 KiB under the extension's reply <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>). That path is already named as unmeasured in C2 s6a.

## Not run

Swift tests need Xcode; Idris holds the slot. run-cold.sh checked on the host as above.
{% endraw %}

</div>
