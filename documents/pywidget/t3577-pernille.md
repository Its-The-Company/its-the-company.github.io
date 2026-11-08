---
layout: "default"
title: "T-3577: review of 9540d1245 (Idris, T-1114): the location callback reads the status at run time"
section: "documents"
description: "Verdict: PASS with findings. Nothing High. M1 (T-0987) is answered: the delegate&#x27;s own method is now under a test, and deleting its call leaves the shared cache flag the wrong way, so the test goes red. L1 makes the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3577-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 18 · Sun Nov 8</span><span><code>pywidget/docs/reviews/t3577-pernille.md</code></span></div><h1>T-3577: review of 9540d1245 (Idris, T-1114): the location callback reads the status at run time</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-08. Commandment 13. The change has been on main since build 3 and goes out in build 4
(T-3574). Read: pywidget/ios/App/Device/LocationCall.swift (`locationManagerDidChangeAuthorization`,
`authorizationDidChangeToCurrent`, `LocationCall.authorizationChanged`, `SystemLocation` cache methods,
`LocationCacheGuard`) and pywidget/ios/Tests/LocationAuthorizationChangeTests.swift.

**Verdict: PASS with findings.** Nothing High. M1 (T-0987) is answered: the delegate's own method is now under a
test, and deleting its call leaves the shared cache flag the wrong way, so the test goes red. L1 makes the callback
read the status when its task runs, which is the same pattern `LocationCacheGuard` already uses
(LocationCall.swift:526, :529). The privacy rule holds: a revoked permission drops the stored fix.

## Runs

- Runner job J-20261108-0912-xc-test at 24b4a2b9c (the d3d39da37 tree plus the job file):
  `LocationAuthorizationChangeTests` with RunLogRecorderTests and RefreshOutcomeRuleTests, 72 executed,
  0 failures, exit 0 (ops/runs/xcodebuild-20261108-091533.log).
- No mutants: the class is in the app target, so a mutant would need a pushed commit. The two cases below come
  from reading the code.

## Findings

**L1 (Low). Nothing tests the part of the change that is actually new.**
pywidget/ios/Tests/LocationAuthorizationChangeTests.swift:22. The test passes a fresh `CLLocationManager()`.
Its status is the same app-wide status that `SystemLocation.shared.status()` returns. So a revert of L1 to the
old line, `authorizationDidChange(s)` at LocationCall.swift:376, stays green. The only line this test protects is
the call itself. Failure case: someone "simplifies" line 376 back to `authorizationDidChange(s)`. The suite stays
green, and the out-of-order case L1 fixed comes back with nothing to catch it. Fix: let
`authorizationDidChangeToCurrent` take its `Source` (default `SystemLocation.shared`). Then add a test whose fake
source reports `denied` while the callback is given a manager that says `authorizedWhenInUse`, and assert the
cache is dropped.

**L2 (Low). The status is read and applied in two separate steps, so "whichever task runs last applies the
current state" is not guaranteed.**
LocationCall.swift:392-401. `source.status()` hops to the main actor, but `setCacheAllowed` and `forgetCache` run
afterwards on the cooperative pool. Failure case: task A reads `when_in_use`. Before A applies it, the person
turns Location off. The callback's task B reads `denied`, sets the flag false and deletes the fix. Then A
resumes and sets `cacheAllowed = true` while the status is `denied`. The harm is small. B has already deleted
the fix. A new fix needs the permission gate, and the next activation guard corrects the flag. But the doc
comment promises more than the code does. Fix: read and apply in one main-actor hop. Or change the comment to
say that the flag can be briefly wrong and that the gate is the real protection. The guard at :526 has the same
gap.

**I1 (Info).** `authorizationDidChange(_:)` (LocationCall.swift:386-389) no longer has a production caller.
Only the older tests reach it, so those tests now cover a path the app does not run. The class doc on
LocationAuthorizationChangeTests says this. When L1 is fixed, point those tests at the new function.

**I2 (Info).** The teardown at LocationAuthorizationChangeTests.swift:19 always leaves `cacheAllowed = true`.
That matches the initial value (LocationCall.swift:436), so it is fine, but on a Simulator with `denied` it
leaves the shared flag allowed for the tests that run after it.
{% endraw %}

</div>
