---
layout: "default"
title: "T-5047 at da4c8d07: Commandment 13 re-review (T-5508)"
section: "documents"
description: "H1 is fixed. Every code begins with P. The six fresh letters of the id leave out every letter of the tokens, P and W included, and neither prefix (&quot;token_&quot;, &quot;lane_&quot;) has a P. So the name a card prints cannot hold a\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t5047-da4c8d07-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 34 · Tue Nov 24</span><span><code>pywidget/docs/reviews/t5047-da4c8d07-pernille.md</code></span></div><h1>T-5047 at da4c8d07: Commandment 13 re-review (T-5508)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. This follows my FAIL at 50a2c3dd (t5047-50a2c3dd-pernille.md, 4843de25e6).

Scope: `git diff main...HEAD -- pywidget/` on personal/a at 33bd448db8, read whole: UITests/WidgetKitCheckTests.swift
(testE, whyNotDrawn, appGroupFolders, freshID, holds, testI, testK, the shared read loop), UITests/TokenReadTests.swift
and docs/how-it-works/script-to-home-screen.md. 33bd448db8 is records only. For context I read
docs/design/states/state-tokens.json (every card word), Shared/StateCardView.swift (the small card), project.yml
(PyWidgetUITests) and tools/land_xc.py (what a landing runs).

Runs, on the office Simulator 87E108D4 (XC_LOCAL=here, XC_TASK=T-5047):
- TokenReadTests, 6 iterations: 18 executed, 0 failed (ops/runs/xcodebuild-20261124-094313.log). The Vision card test
  did not flake in six fresh draws.
- Mutant: freshID lets the tokens' P and W into the id (`Set(tokens.map { $0.dropFirst(2) }.joined())`):
  testWidgetIDsHoldNoTokenLetter red, "lane_aamflw shares W with PWRXJHYY PWNPUTXT"
  (ops/runs/xcodebuild-20261124-094518.log). Reverted, and git diff is clean.
- Idris's revert mutant (ops/runs/xcodebuild-20261124-092326.log) turned both new tests red, with the card read
  `["TOKEN_PWFHJUAN", "Not drawn yet", "Open PyWidget to draw it"]`. His testE + TokenReadTests 4/0 (091920) and
  testI 1/0 (093443) are in ops/runs as stated.
- tests/run.sh site_how_it_works: passed. The fingerprint is 5a626eccfcdc.

## Verdict: PASS with findings

H1 is fixed. Every code begins with P. The six fresh letters of the id leave out every letter of the tokens, P and W
included, and neither prefix ("token_", "lane_") has a P. So the name a card prints cannot hold a code. No card word in
state-tokens.json holds "PW" with the spaces dropped. The nearest is "PyWidget", and the letters after its P (Y, I, D,
G) are not in the alphabet. No small-card string ends in P either, so no "PW" can form where two of Vision's strings
are joined. The other findings are wording and coverage, and none of them blocks.

## The asked questions

- **Can a card, "No view for this size" or a stale token still pass?** No.
  - The first-draw, error and update cards at systemSmall print the name in capitals, then their title, a line number
    or "Needs a newer PyWidget", and "Tap to open" or "Open PyWidget to draw it". None of these holds a P followed by
    W.
  - The placeholder line has no P.
  - An earlier run's tree or picture holds an earlier code. Six letters drawn fresh from 18 do not repeat this run's
    code in practice.
  - When the record does answer, a card answer (f, e, u) still fails at the record check, and that check runs
    whenever an answer is in when the wait ends. An answer that lands during the photographs is not checked again, but
    a card is still a card and cannot pass the read.
- **Is freshID fresh each run, and disjoint in every case?**
  - Fresh: yes. It uses `randomElement()` from the system <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> in each process, and testE draws from at least 10
    letters, so at least 10^6 ids. testI avoids two tokens and draws from at least 4 letters, so at least 4,096 ids
    (L1).
  - Disjoint: its six letters are disjoint from the tokens' letters in every case. The set can never be empty, since
    at most 14 of the 18 letters are taken. The prefix is not disjoint (M1). It holds no P, and the test asserts
    that.
- **Does the new test belong in its target, and does it run where the landing expects?** It has to be in
  PyWidgetUITests, because freshID, recognize and holds live in WidgetKitCheckTests. That is the precedent of T-1652's
  token test. It runs only on a Simulator, never on the host. It is not part of a landing either: land_xc runs
  PyWidgetTests only, so the "PyWidgetTests 2216 run" says nothing about it (L2).
- **Is the docs page true?** Mostly. The waits match the code: up to three minutes for the record and up to a minute
  for the photographs. The M1 claim from my last review is now worded as "points to ... not proven", and the reason
  given (the test stops at its first failure) is correct. One statement is false (M1 below).

## Findings

### M1: "shares no letter with the code" is false for the prefix

The page says the widget name is "made from other letters than the code's" and that it "now shares no letter with the
code". The same claim is in TokenReadTests' doc comment ("shares no letter with its tokens") and in the testE comment.
But the name is "token_" plus six letters, and T, K, E and N are all in the code's alphabet. A code such as PWTKEN..
shares four letters with every name. Only the six fresh letters avoid the code's letters. What actually makes the
check sound is that the whole name has no P, and every code starts with P.

Fix: say so on the page. For example: "the letters added to the name each run are none of the code's, and the name has
no P, which every code starts with". Re-fingerprint the page, and correct the two comments. This is a false sentence
on a published page (Commandment 2), so it is worth fixing in this landing if that is cheap. Otherwise it goes on the
board.

### L1: "six letters from at least eleven" is at least ten, and testI's ids come from at least four

The code is PW followed by six letters, and both P and W are in the alphabet. One token takes out at most 8 letters,
which leaves 10 (a code of PWACEFHJ, for example). testI avoids two tokens, which takes out at most 14 letters and
leaves 4, so at least 4^6 = 4,096 ids. The `seen` count only covers the single-token case.

This does not make the check unsound. If testI's id repeats an earlier run's id, an earlier picture can only show an
earlier code, so the result is a rare false red, never a false pass. Correct the comment. If the false red matters,
drawing testI's id against the first token alone keeps the second read sound too, because the second token is new.

### L2: the new checks run in no landing

TokenReadTests is a UI-test class, so a landing's PyWidgetTests run never executes it. It runs only in the daily full
suite and in local Simulator runs. That is acceptable for a guard on test code. But the landing note should not cite
the 2216 unit tests as evidence for it. The evidence is 091920 and this review's 094313.

### L3: the "earlier run's tree" assertion is close to vacuous

The test draws a different eight-letter code and asserts that this run's code is not in what Vision reads. That can
only fail on a Vision misread. It checks the `holds` predicate, not anything a widget can draw. It costs nothing, so it
may stay, but its doc comment should not count it as a guard.

## Checked and sound

- L1 of my last review: the "no answer: " prefix is decided when the message is built. L2: groups are sorted by path,
  and "r"/"t" name which folders hold the record and the tree. Both fixes are correct and fit the 200-character
  budget.
- testK uses the same freshID, with prefix "lane_" (no P).
- The shared read loop in the T-0684 helper now uses `holds`, and its behaviour is unchanged.
{% endraw %}

</div>
