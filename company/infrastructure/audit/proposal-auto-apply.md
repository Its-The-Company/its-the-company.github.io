---
layout: "default"
title: "Proposal draft: switch on the 12-hour proposal path (T-0124)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/proposal-auto-apply.md</code></span><span>2026-10-26</span></div><h1>Proposal draft: switch on the 12-hour proposal path (T-0124)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Drafted 2026-10-26 01:21 ET by Odalys for the Operator to open as a GitHub issue, label `proposal` (not
`urgent`: no work waits on it). It changes how the applier checks approval, so under the standing ruling
(#65 c6408374269 item 2) it needs an explicit **approve**; the applier itself refuses to auto-apply it
(ops/proposal_auto.json is on its list of paths that always need approve). The code is in main since
6c8c9226 (the revert-rule reader widened in the commit that adds this file) and is switched off.

Title: `Proposal: switch on the 12-hour auto-apply for proposals (T-0124, #65 item 2)`

Everything between the two rules below is the issue body.

---

**Proposal**: turn on the 12-hour path you ruled in #65 (c6408374269, item 2) by changing one value in
`ops/proposal_auto.json`, from `false` to `true`.

**What it does once on.** `tools/apply_proposal.py` runs between sessions, as now. A proposal labelled
`proposal` that nobody has approved is applied 12 hours after it was posted (or last edited, whichever is
later) only if all of these hold:

1. No allowlisted Investor wrote anything on the issue except "approve", and no allowlisted comment anywhere
   (a report's questions, for example) says hold or no next to its number ("approve 63 65, no 64" holds 64),
   or mentions #N without approve. Any such reply means it waits for your explicit approve.
2. Its text states a revert rule or a switchback.
3. Its text names its tests (a "Tests:" line), and they pass on main plus the exact diff, run in a throwaway
   copy of the repository, never in the live files.
4. It touches none of: Commandments 2, 6-11, 33-35, 42, 58, 59; `investors/`; `rules/hooks/`; the guard
   scripts; the Claude Code settings (anything in `.claude/`); the applier, its test, this switch and the
   allowlist reader.
5. It touches no Investor words: `CLAUDE.md` (any line), `amendments.md`, `rules/worker-rules.md`,
   `rules/build_agents.py`, `rules/lookup.py`, or any file that mentions amendments. These always need approve.

A proposal that fails a condition after its 12 hours gets one comment saying it needs approve. Each approval,
refusal and application is recorded in `log/optimizations.md` with its link (item 3; already live).

**Why the switch is safe to leave in a company file.** The applier counts it on only when the last commit to
`ops/proposal_auto.json` is a proposal it applied (author Operator, "Apply proposal #"). A worker's edit can
turn it off, never on.

**Evidence.** `tests/apply_proposal_test.py` 51/0 (32 before), with fixtures and a stand-in GitHub, no network:
off by default; a company commit switching it on counts as off; applies after 12 h and records the link; waits
12 h from the post or last edit; a hold, no or question from an Investor on the issue holds it, a non-Investor's
"no" doesn't; "no 51" and "hold #54" in a report hold those two; no revert rule or no named tests needs approve;
failing tests on the exact diff need approve and leave the live files untouched; each protected path and each
kind of Investor words needs approve (10 cases); an explicit approve still wins; urgent, closed issues and pull
requests are never auto-applied. Nine deliberate breaks of the checks (Investor-reply check removed, switch
forced on, test result ignored, 12 h skipped, path list skipped, amendments scan skipped, switch provenance
skipped, revert check skipped, tests run in the live tree) were each caught by the tests.

**Predicted effect.** A proposal that meets every condition lands about 12 hours after posting instead of
waiting for a reply; the rest wait exactly as now.

**Revert rule.** Reply **no** or **hold** here before it applies. Once on, any commit that sets `"auto_apply"`
back to `false` turns it off at the next tick, and the company does that at once if an auto-applied proposal
breaks a test or goes against a reply of yours.

Tests: `tests/apply_proposal_test.py`

```diff
diff --git a/ops/proposal_auto.json b/ops/proposal_auto.json
index 0bf27767..d6e131d0 100644
--- a/ops/proposal_auto.json
+++ b/ops/proposal_auto.json
@@ -1,4 +1,4 @@
 {
-  "auto_apply": false,
+  "auto_apply": true,
   "note": "Switch for the 12-hour proposal path in tools/apply_proposal.py (#65 c6408374269 item 2). It is part of how the applier checks approval, so turning it on needs an explicit approve: the applier counts it on only when the last commit to this file is a proposal it applied (author Operator, 'Apply proposal #'). Any edit may turn it off."
 }
```

---

Checks on this draft (Odalys, 2026-10-26): `git apply --check` of the diff above is clean at the commit that adds this file; the
body holds exactly one diff block and names `ops/proposal_auto.json`; on approval the applier's normal path
applies it (the file isn't in its never-list), and its auto path would refuse it (on the needs-approve list).
{% endraw %}

</div>
