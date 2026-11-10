---
layout: "default"
title: "T-0987: review of T-0551 at 8578d364 (Idris)"
section: "documents"
description: "Verdict: PASS with fixes. R3, R4, R5 are right and tested. R6&#x27;s Done criterion (&quot;removing the callback line turns a test red&quot;) is not met for the delegate&#x27;s own line (M1), and the move to a Task opens an ordering gap\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0551-t0987-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t0551-t0987-pernille.md</code></span></div><h1>T-0987: review of T-0551 at 8578d364 (Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-02. Author: Idris. Independent read (Commandment 13).

**Verdict: PASS with fixes.** R3, R4, R5 are right and tested. R6's Done criterion ("removing the callback line
turns a test red") is not met for the delegate's own line (M1), and the move to a Task opens an ordering gap (L1).

## What the line asked

From T-0549 R3-R6: (R3) delete the pre-T-0540 App Group copy once at launch whatever the status; (R4) `store()`
writes nothing while a revocation flag set by the callback is on; (R5) cache folder out of backups; (R6) route
`SystemLocationCore`'s authorisation callback through `LocationCall.authorizationChanged` so the test covers the
code that runs, and test or explain `LocationCacheGuard.app`. Say what failed in the 7:41 AM log. Done: one test per
item, removing the callback line turns a test red.

## Checked

1. **R3.** `LocationCacheGuard.install` calls `source.forgetLegacyCopy()` before the status check
   (LocationCall.swift, install). Test keeps location on and sees the legacy file gone, current cache kept.
2. **R4.** `authorizationChanged` sets the flag first (LocationCall.swift:93), then `forgetCache`. Both take
   `cacheLock`; `store` checks the flag under the same lock. Any `store` lands either before the flag (then deleted
   by `forgetCache`) or after it (refused). No window. Test covers revoke, late fix, grant.
3. **R5.** `isExcludedFromBackup` set on `Application Support/pywidget/device/` after every write. That folder
   holds only `location.json`, so nothing else is pulled out of backups. Test covers remade folder.
4. **R6 explanation of `LocationCacheGuard.app`**: given in the test's comment; acceptable.
5. **7:41 AM cause** is in the commit's done-note (tests in the tree before their fixes, ad580920). Accepted.
6. **Green.** All five `LocationCacheFollowUpTests` passed in ops/runs/xcodebuild-20261102-093615.log (test case
   lines only). The cited ops/runs/xcodebuild-20261101-213413.log is not in the repo (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> worktree, git-ignored);
   the done-note's evidence path does not resolve.
7. **Host suite.** `run_host.py --both` at HEAD 462dc137 (no Python touched; land:host floor only).

## Findings

**M1 (Medium, Done criterion). The delegate's call is still untested.** LocationCall.swift:376,
`authorizationDidChange(s)` inside `locationManagerDidChangeAuthorization`. No test calls the delegate method
(`git grep` finds no caller outside the class); the R6 test calls `authorizationDidChange` directly. Delete line 376
and every test stays green. That is exactly the gap T-0549 R6 named, moved one call down. Failure scenario: a later
edit to the delegate (say, the main-actor waiter code above it is reorganised and the call is dropped) ships, and a
person who turns Location off in Settings keeps their last position on disk until the app next becomes active,
with every test green. Fix: a test that calls
`SystemLocationCore.shared.locationManagerDidChangeAuthorization(CLLocationManager())` and polls, branching on the
Simulator's status the way `testTheAppGuardActsOnTheSharedSourceWhenTheAppBecomesActive` does (flag turned the wrong
way first, expect the callback to turn it right). Then the mutant "delete line 376" goes red.

**L1 (Low, ordering). Two quick callbacks can land in the wrong order.** LocationCall.swift:389:
`Task { await LocationCall.authorizationChanged(s, source: SystemLocation.shared) }` captures `s` at callback time,
and unstructured Tasks have no order. Before this commit the delete ran inside the callback. Scenario: allowed then
denied in quick succession (Settings toggled twice, or the launch callback racing the didBecomeActive guard's
task); if the "allowed" task runs last, `cacheAllowed` ends true while Location is off, and a fix still in flight is
written. Narrow, and the next activation corrects it. Fix: inside the Task, read the status at run time
(`await SystemLocation.shared.status()`) instead of the captured `s`, so whichever task runs last applies the
current state. The tests that pass a status string can keep a test-only overload.

## Not findings

- The callback now deletes on the next executor turn, not inside the callback. Milliseconds; fine.

Fix line: T-1114 (Idris, P2), M1 and L1.
{% endraw %}

</div>
