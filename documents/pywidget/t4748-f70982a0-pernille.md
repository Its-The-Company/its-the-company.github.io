---
layout: "default"
title: "Review of T-4748 at f70982a0: the widget token alphabet is letters only"
section: "documents"
description: "The change is right and it ships nothing. Both files are in the PyWidgetUITests bundle only (project.yml: its sources are UITests and App/LegalLinks.swift; no app or extension target lists UITests), so no TestFlight or\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4748-f70982a0-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 29 · Thu Nov 19</span><span><code>pywidget/docs/reviews/t4748-f70982a0-pernille.md</code></span></div><h1>Review of T-4748 at f70982a0: the widget token alphabet is letters only</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4929, Commandment 13). Author: Idris. Reviewed: f70982a0db (ios/UITests/WidgetKitCheckTests.swift,
6 lines: `freshToken()` loses 3, 4 and 9; `testETokenOnTheHomeScreen` drops its own copy of the alphabet and calls
`freshToken()`). Also read, for where tokens are made and matched: ios/UITests/TokenReadTests.swift, every
`freshToken()` caller (ExtensionMemoryTests, RunLogUITests, TapCostTests, WidgetKitCheckTests), every `Self.recognize`
site and `recognize` itself, ios/scripts/make_widgetkit_fixtures.py (the live-text gallery's tokens), ios/project.yml
(target membership), the T-4748 board line, and the failure it cites (J-20261117-0414-xc-test, as recorded in
ops/board_notes/T-4742.md). Paths are under pywidget/ unless they start with tools/ or ops/. The changed lines are
unchanged at this branch's HEAD 3578c7478f (`freshToken` is now at line 1682). Date: 2026-11-18.

What I ran:
- A swiftc probe on the Mac: f70982a0's `freshToken()` compiled as is, with TokenReadTests' check copied beside it.
  20,000 draws hold no digit, and the check holds. A mutant with the old alphabet put back ("...XY349") also holds:
  the check is green on the alphabet T-4748 removed (L1).
- A Vision probe on the Mac (macOS Vision, not the Simulator): tokens drawn white on black in the system monospaced
  bold face at 16 and 20 pt, read with the test's own settings (`.accurate`, `usesLanguageCorrection = false`).
  `recognitionLanguages` defaults to `["en_US"]` with `automaticallyDetectsLanguage` false; setting `["en-US"]` changed
  no read. Results: PWWMA3AP reads "PWWMАЗАР" at both sizes: not only the 3, but the A, A and P after it come back
  Cyrillic (U+0410, U+0417, U+0410, U+0420). PWA3 reads "PWAЗ" at both sizes. PWC4, PWX9E4T3 and PWRAMM7Y read
  exactly. Of letters-only tokens, 30 random `freshToken` draws at 16 pt all read exactly, and PWHKMTXY did at both sizes.
  PWACEPYX read exactly at 16 pt and as "PWACEPYХ" (U+0425, Cyrillic Ha) at 20 pt (M1).
- `make_widgetkit_fixtures.py` into a scratch folder: 267 live-text cases, 28 of them with a 3 or 4 in the token (L2).
- Not run: any Xcode build or UI test. I queued `tools/xc.sh build-for-testing` (generic Simulator); it waited for the
  machine's Xcode lock at load 480 and never started xcodebuild, and I stopped it. The Swift compile check above
  covers the changed function only, not the target. TokenReadTests' and the UI suite's results on the land are not mine.

## Verdict: PASS with findings

The change is right and it ships nothing. Both files are in the PyWidgetUITests bundle only (project.yml: its sources
are UITests and App/LegalLinks.swift; no app or extension target lists UITests), so no TestFlight or App Store binary
changes.

The key question: does letters-only stop Vision reading a correct widget's token as something else? It stops the case
that failed. My probe reproduces it: the digit 3 is read as Cyrillic З, and it pulls the letters beside it into Cyrillic
as well, so one digit spoils the whole token. With no digit, the reads I made were exact in 33 of 34. So letters-only
is the bigger half of the fix. It is not the whole fix. A letters-only token can still come back with a Cyrillic twin
(M1), and the matchers compare raw strings. The board line offered "or fold lookalikes before matching", and that half
is still open.

Consistency: every random token now comes from one function. `testETokenOnTheHomeScreen` was the only other maker,
and it now calls `freshToken()`. Every caller (ExtensionMemoryTests, RunLogUITests, TapCostTests and the WidgetKitCheck
tests) gets letters. The ids built from it (`tap_`, `lane_`, `cost_` + lowercased token) stay valid widget ids. At
f70982a0, testQ's `TOK<digits>` token was read from tree.json, not by Vision, so its digits did no harm; HEAD has since
moved it to the same letters (line 1340) and a matching `PW[ACEFHJKLMNPRTUVWXY]{6}` pattern (line 1363), which agrees.
The one maker left with digits is the Python fixture script for the live-text gallery (L2).

Collisions: 18^6 = 34,012,224 tokens (25.0 bits), down from 21^6 = 85,766,121 (26.4 bits). Two draws in one test
(testK's first and second) are equal with probability 3e-8. Tokens only need to differ within a run and from a stale
tree, so this is ample.

## Findings

### M1. Letters-only tokens can still be read with Cyrillic twins (T-5008)

- Where: `ios/UITests/WidgetKitCheckTests.swift` `recognize` and each token match on its output (HEAD lines 221, 318,
  363, 1363, 1668): `read.joined(...).uppercased()...contains(token)`, raw string comparison.
- 10 of the 18 letters (A C E H K M P T X Y) have Cyrillic capitals that look the same, and P is in every token. On the
  Mac, PWACEPYX at 20 pt came back "PWACEPYХ". The new comment, "a read that is not whole Latin letters is not the
  token", turns that read into a red test on a correct widget: the same failure T-4748 was opened for, from a different
  character. Pinning `recognitionLanguages` does not help (the default is already en_US). This is one read in 34, on
  macOS Vision, not the Simulator, so I cannot give the Simulator's rate. It is a test flake, not a release risk.
- Fix: one fold from Cyrillic and Greek capitals that look Latin to the Latin letter, applied to every Vision read
  before a token match. Add a unit test beside TokenReadTests: "PWACEPYХ" and "РWАСЕРYX" match PWACEPYX, and "PWACEPYZ"
  does not, so the fold does not weaken the check.

### L1. TokenReadTests does not hold the new line (T-5009)

- Where: `ios/UITests/TokenReadTests.swift:11` (`misread` has no 3, 4 or 9); `WidgetKitCheckTests.swift:1681` ("TokenReadTests
  holds the line").
- The probe's mutant puts 3, 4 and 9 back, and the test's check stays green. A later edit can undo T-4748 and every test
  stays green.
- Fix: assert that every character after PW is an ASCII capital letter outside `misread`, with T-4748 named as the reason.

### L2. The live-text gallery still draws tokens with 3 and 4 (T-5010)

- Where: `ios/scripts/make_widgetkit_fixtures.py:255`, `itertools.product("ACEFHJKLMNRTUVXY34", repeat=2)`; matched in
  `testGLiveTextSizedToItsIdeal` (WidgetKitCheckTests.swift:221) with `uppercased().contains(token)`.
- 28 of the 267 cases carry a digit, 14 of them a 3. 11 of those 14 are not `-num-` cases, so a miss counts (for
  example PWA3-relative-toggle). On the Mac, PWA3 reads "PWAЗ" at 16 and 20 pt. That sweep runs only through
  widgetkit_check.sh, by hand, and I found no run of it on this machine to say whether the Simulator agrees.
- Fix: letters only. 16 letters give 256 pairs, fewer than the 266 needed, so add P and W (324 pairs) or use three
  letters. Keep PWZZ-inline-first.

### Notes (no work)

- N1. The new comment says 4 and 9 "have the same kind of lookalike (Ч)". In my probe, 4 and 9 read correctly (PWC4,
  PWX9E4T3); only the 3 was seen misread. Dropping them anyway is cheap and right; the comment states a guess as a fact.
- N2. Vision's script choice is per word, not per character. PWWMA3AP came back with the A, A and P after the 3 in
  Cyrillic, so a single ambiguous glyph puts the whole token at risk. M1's fold should therefore cover every twin, not
  just the one that was seen.
{% endraw %}

</div>
