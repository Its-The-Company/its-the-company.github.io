---
layout: "default"
title: "T-5047 at 50a2c3dd: Commandment 13 review (T-5508)"
section: "documents"
description: "The record is a Debug diagnostic, so letting it stop being the verdict is a fair call in principle. But on the runner the record has been empty in every full run since 11-20, so this change makes the pixel read the only\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t5047-50a2c3dd-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 34 · Tue Nov 24</span><span><code>pywidget/docs/reviews/t5047-50a2c3dd-pernille.md</code></span></div><h1>T-5047 at 50a2c3dd: Commandment 13 review (T-5508)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Read fresh. I reviewed the earlier probe (t5047-419af90c-pernille.md), and that
review does not carry over to this change.

Scope: `git diff main...HEAD -- pywidget/` on personal/a at 7a3ce03b20. The only app commit is 50a2c3dd39:
UITests/WidgetKitCheckTests.swift (testE, whyNotDrawn, appGroupFolders) and docs/how-it-works/script-to-home-screen.md.
7a3ce03b20 is records only. For context I read Widget/PyWidget.swift, Widget/DebugDrawRecord.swift,
Shared/TreeView.swift, Shared/FirstDrawCardView.swift, Shared/StateCardView.swift, Shared/WidgetPlacement.swift
(PremadeTitles.title, firstDrawTimeline), App/Settings/DeveloperMode.swift (erase), tools/xc.sh (the why line) and the
runner results on origin/macbook-results for J-20261121-2243-xc-test, J-20261122-0202, J-20261123-0201 and
J-20261124-0203. Run: tests/run.sh site_how_it_works passed, and a host Vision probe is described under H1. No
Simulator run: no mutant of the extension was run on a Simulator.

## Verdict: FAIL

The record is a Debug diagnostic, so letting it stop being the verdict is a fair call in principle. But on the runner
the record has been empty in every full run since 11-20, so this change makes the pixel read the only gate there. The
pixel read can be passed by a card that does not draw this run's tree (H1). Fix H1 before this lands. Otherwise the
first green on the runner cannot be told apart from a first-draw or error card.

## Findings

### H1: a card that names the widget passes the pixel check

The id is `"token_" + token.lowercased()` (testE, line 285). The check uppercases what Vision reads, strips the
spaces, and accepts any read that *contains* the token (line 336). For an own widget,
`PremadeTitles.title(widgetID:)` returns the id itself (Shared/WidgetPlacement.swift:34). The first-draw card
(FirstDrawCardView.swift:45), the error card and the update card (StateCardView.swift:205) all draw
`name.uppercased()` at systemSmall, which is `TOKEN_PW......`, and that string contains the token. So the widget
passes while it draws one of three wrong things:

- the first-draw card, which is what the extension draws when it sees this run's folder but not its tree.json
  (`.firstDraw`);
- the error card;
- the update card.

None of these is this run's tree. Host probe (/tmp, not committed): I rendered the card's systemSmall stack with
SwiftUI's ImageRenderer at 2x and 3x and ran the test's own VNRecognizeTextRequest settings on it. Vision read
`["TOKEN_PWACEFHJ", ...]`, and the test's predicate returned `found true` at both scales.

Before 50a2c3dd this hole was covered whenever the record had an answer, because the answer had to be `decoded` with
all faces `r`, and a card answers `f`, `e` or `u`. With no answer there is now nothing to cover it.

To the asked questions: "No view for this size" cannot pass, and neither can a stale tree. The token is six letters
drawn fresh from an 18-letter alphabet each run, and no earlier tree carries it. The weakness is only the id.

Fix: draw the id from its own fresh letters, independent of the drawn token (for example,
`"token_" + Self.freshToken().lowercased()` from a second draw). Alternatively, require one Vision string that equals
the token. Then update the docs box to say a card naming the widget cannot pass.

### M1: "the record went missing, not the drawing" is stated as fact, and testE's own widget was never seen

The class sets `continueAfterFailure = false` (line 25). So on every runner red, testE stopped at the record wait
(line 315 in the why lines of all four runs), and its widget was never photographed there. The evidence that the
extension draws on that Simulator comes from testI and testR, later in the run, for other widgets. That supports
"the extension can draw and write in this run". It does not show that the extension was asked for testE's widget.
The runner's result.json keeps only the failing names, so testI and testR being green is inferred from their
absence there with `complete: true`. It is not a recorded pass.

The next-day argument is sound as far as it goes: DeveloperMode.erase keeps the group's Library, so the record should
have survived. The code comment (lines 317-321) and the docs paragraph should say "points to" rather than "So what
went missing there is the record". That holds until a runner run shows testE's own pixels, and after H1 is fixed
those pixels can be trusted.

### L1: the "no answer: " prefix can go stale

`answered` is fixed when the 180 s wait ends. If an answer lands afterwards, the final message still starts
"no answer: " while its own ext part counts t1. Decide the prefix from `Self.answer(id:group:) == nil` when the
message is built.

### L2: more than one App Group folder is counted, not identified

When there is more than one group folder, whyNotDrawn says `groups N` but not which folder holds debug-draws.txt or
tree.json. `contentsOfDirectory` has no defined order, so `appGroupFolder()`'s `.first` could change between runs.
That is cheap to name (for example, the index of the folder holding the record) and it fits the budget.

## The asked checks

- **whyNotDrawn and appGroupFolders.** Both are correct:
  - `attributesOfItem[.size] as? Int` bridges from NSNumber.
  - `rec` shows only when no line was read: none, 0B, or nB for a file that is not UTF-8.
  - `groups` shows only when the count is not 1. Zero cannot happen, because the test unwraps the group first.
  - `appGroupFolder()` is `appGroupFolders().first`, which is the same folder as before.
- **The 200-character budget.** xc.sh keeps 200 characters after "why: Class/method: ", and
  `WidgetKitCheckTests.swift:343: XCTAssertTrue failed - ` takes 54 of them. The worst case is
  `no answer: ext T0t0S0 p0 rec none groups 2:  (+0 other); disk 773B S; read [`, which is 76 characters. That leaves
  70 characters for Vision's read, which is enough for its first two strings. It fits.
- **Docs.** The docs page matches the code on three points: "up to a minute" (waitUntil(60)), "up to three minutes"
  (180), and "starts with no answer and says whether the record file was there". "21 to 24 November" holds, because
  J-20261121-2243-xc-test failed the same way (the 11-21 daily timed out in its build). The fingerprint 5e7a58edbfbe
  passes site_how_it_works. Two statements are not true: the conclusion in M1, and "nothing left over from an earlier
  run can pass it" read together with "the photographs still decide", since a card that names the widget passes
  (H1).

## Later work

- testI's first read has the same weakness as H1 (`id = "token_" + first.lowercased()`, line 1041). Its second read is
  sound, because the second token is not in the id. This is on the board as a follow-up for Idris. It is outside this
  diff, so it does not block this change.
{% endraw %}

</div>
