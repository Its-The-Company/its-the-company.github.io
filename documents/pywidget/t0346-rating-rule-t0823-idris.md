---
layout: "default"
title: "T-0823: independent review of T-0346, the rating-request rule, at 565eb81a"
section: "documents"
description: "Pass, with one comment edit at the merge (F1). The code does not change. T-0824 may merge once it has applied F1&#x27;s two comments word for word. They are comments only, written here by the reviewer, so they need no second\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0346-rating-rule-t0823-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 10 · Sat Oct 31</span><span><code>pywidget/docs/reviews/t0346-rating-rule-t0823-idris.md</code></span></div><h1>T-0823: independent review of T-0346, the rating-request rule, at 565eb81a</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris, 2026-10-31. Author: Pernille. Read: `git show 565eb81a`, `git diff main...565eb81a`, revenue-gap memo
s3 (the Rating prompt row), `App/Bridge/WidgetWriter.swift` (how the app sees a placement). I did not read the author's
reasoning beyond what the commit carries. Run in a throwaway clone at 565eb81a, host macOS, no xcodebuild, no Simulator.

## Verdict

**Pass, with one comment edit at the merge (F1). The code does not change.** T-0824 may merge once it has applied F1's two
comments word for word. They are comments only, written here by the reviewer, so they need no second review.

The rule is right against the memo, and all six decisions stand. The failure I found is in what the file tells its caller:
one line of its contract, followed faithfully, produces an ask on a cold launch, which decision 5 says cannot happen. Passed
is not the same as correct: the tests are green on that case because the caller is what breaks it, and the tests stand in
for the caller.

## What I ran


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran, scrolls sideways" style="--tw:640px" markdown="1">

| Check | Result |
|---|---|
| `swift test` in `pywidget/ios/Core` | 73 tests, 0 failures |
| `scripts/core_mutants.sh Core/mutants-t0346.json` | 20 of 20 killed; the failure counts match the author's evidence line for line |
| My own three walks, scratch file in the clone, not committed | Carry walk passes; the cold-launch walk below answers `true`; the premade-only walk never asks |

</div>


Against the memo, every clause is present: one request (`alreadyAsked`), placement or a third run on a second day, never
after an error, never in the first session, never tied to a reward (no input for one, and two tests pin the field list and
the outcome list). `testEveryCombinationKeepsTheRules` covers the whole table, and I reworked its count of 60 by hand: it
<span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>. The file has not been compiled in the Xcode app target (no slot here; T-0273's build is its first, as T-0824 says).

## The six decisions


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: The six decisions, scrolls sideways" data-n="1" style="--tw:680px" markdown="1">

| # | Decision | <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Ruling</span> |
|---|---|---|
| 1 | `alreadyAsked` is set at the call, whether or not iOS showed anything | **Stands.** The API reports nothing [recall: Apple's docs say it may show nothing], so the call is the only event the app can know. The memo says one request; one call is the honest reading |
| 2 | `successfulRuns` beside the day count | **Stands.** A day count alone cannot separate two runs on two days from a third on a second day; `testTwoRunsOnTwoDaysDoesNotAsk` is the proof |
| 3 | At least 3 runs in all across at least 2 local days | **Stands.** It is a fair reading of "a third successful run on a second day". The one edge: three runs on day 1, then one on day 2, asks at the fourth run. That person came back, which is what the clause wants |
| 4 | A first-session placement carries to the next success in a later session | **Stands.** See below |
| 5 | `lastOutcome` starts each session at `.nothingYet`, so a cold launch never asks | **Stands, and needs F1.** The sentence is right; the `Outcome` comment contradicts it |
| 6 | A session index below 2 never asks, 0 and negatives included | **Stands.** Failing closed is the right way round for a count the caller keeps |

</div>


**Decision 4, the one asked about most.** The memo says "the first time a user's own widget or a premade is placed" and
"never in the first session", and does not say which wins when the first placement falls in the first session. "Never" wins:
it is the harder rule. Carrying the placement is then what the memo means. The person earned it, and the ask still lands on
a real success, after no error, outside the first session. Dropping it would leave the keenest people to the run count.
My carry walk: placed in session 1, no ask; session 2 opens, no ask; a failed run, no ask; a good run, ask; never again.

Staying true after the widget is removed also stands. The person is still running code successfully, and a re-check adds a
call that can fail for a small gain. Two limits, recorded: the carry has no age limit, and it needs a success to land on (F3).

## Findings

### F1, Medium, changes the file (comments only): `.success` contradicts decision 5

The failure first. `Outcome.success` reads "a run finished with no error, or the app has just seen a placement". iOS tells
the app nothing at placement (WidgetWriter.swift lines 16-18): the app learns of one when a scene becomes active, and that
includes a cold launch. So a person places a widget with the app closed, opens the app the next day, the app sees the
placement, the wiring follows the comment and sets `.success`:

    WALK cold launch, placement just seen, .success -> true

The review sheet comes up on launch, before the person has done anything, and that is exactly what decision 5 rules out.
`testAColdLaunchDoesNotAskWhateverWasEarned` stays green, because it is handed `.nothingYet`.

Apply both, word for word, at the merge. Decision 5 in the header becomes:

    //   5. `lastOutcome` is this session's, and starts each session at `.nothingYet`, so a cold launch never
    //      asks: a person opening the app has done nothing yet to be asked about. That holds for a placement
    //      too: iOS tells the app nothing at placement, so one first seen as a session opens sets
    //      `placedWidgetOrPremade` only, and the ask waits for the next success.

The doc comment on `case success` becomes:

    /// A run the person started finished with no error, or the app has just seen a placement on the person's
    /// return inside a session. A placement first seen as a session opens is not a success (decision 5). A
    /// purchase is not a success.

No mutant's `find` string touches these lines. After the edit, confirm the diff is comment lines only, and rerun `swift test`
and the mutants.

### F2, Medium, T-0273, no change here: what starts a session is the whole first-session rule

"The caller says what starts a session" is a fair line for a pure function, but both obvious answers are wrong. Placing a
widget means leaving the app. If every `scenePhase == .active` starts a session, the return from the Home Screen is session 2,
and so is a Control Center pull-down (T-0690 note in WidgetWriter), so the first-session rule fails on the very path it
exists for. If only a process launch does, iOS can keep the process for days and a keen person stays in session 1.

Ruling for T-0273: a session starts at a process launch, or at a return after at least 30 minutes away. The 30 is my number;
change it with a reason. The wiring owns a test for each of the two wrong cases above.

### F3, Low, recorded, no change: a person who only places premades is never asked

Placing a premade in the first session is likely the main path. If that person never runs code, no success follows, so
no ask ever comes (my third walk, sessions 2 to 50). This is the rule failing towards silence: a missed ask, never a wrong
one. I would not widen it. F1 rules out the only cheap widening (asking on reopening).

### F4, Low, T-0273: decisions 1, 4 and 5 are caller behaviour, and these tests do not prove them

`placedWidgetOrPremade` staying true, `alreadyAsked` being kept, `lastOutcome` resetting: the function takes all three as
inputs. `testAFirstSessionPlacementCarriesToTheNextSuccessInALaterSession` hands the flag in by hand, and no mutant can reach
that behaviour here. What the 73 tests prove is that the function answers right given the facts. T-0273 needs tests on the
real store: set in one session, read back in the next after a restart. Read the file back.

### F5, Low, T-0273: what counts as a success and a placement

- WidgetWriter runs Python in the app process on scene active and on the Refresh intent. Those runs must not count as
  successful runs and must not set `.success`, or every launch is a success. F1's "a run the person started" says so.
- `placedIDs` returns `unsetWidgetID` for a widget with nothing chosen. That is not a person's widget placed: exclude it.
- `placedNow()` answers `[]` on an error, which fails closed. Good; keep that.
- [recall: TestFlight builds show no sheet, yet the call still sets `alreadyAsked`.] If a tester's data carries into the store
  build, that one ask is spent. Small; do not set the flag in a TestFlight build if it is cheap to tell.

### Notes, no action

- The file sits in `App/`, with a symlink from Core; the header's "sits in Core" is loose but harmless.
- `tools/mutation_check.py` reads `name`, `file`, `find`, `replace`, and ignores the `tests` key, and runs the whole suite. A
  <span title="A test written in advance. If it fires, we drop the idea.">kill</span> proves some test noticed, not the test named beside it.
- The header restates the memo's rule in full, so the rule survives if T-0888 retires the memo as a plan driver. No change.
- The branch sits on 6edabde8, behind main. T-0824's `swift test` after the merge is the check for that.
{% endraw %}

</div>
