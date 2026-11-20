---
layout: "default"
title: "T-4816: let the auto-mode safety check allow routine test fixes and safe deletes"
section: "documents"
description: "A setting exists: autoMode, with two lists that fit the ask, autoMode.environment and autoMode.allow. But Claude Code ignores it in the repository&#x27;s own settings files, so .claude/settings.json cannot carry it."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/safety-check-tests.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 29 · Thu Nov 19</span><span><code>ops/plans/safety-check-tests.md</code></span></div><h1>T-4816: let the auto-mode safety check allow routine test fixes and safe deletes</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-19 10 PM ET. Asked by an Investor #323 c6966883854 (11-17 9:10 PM), widened by #41 c6967047801 and
#325 c6970198211 (11-18 12:40 AM, "Consider this my permanent approval"). The refusal behind it: on 11-17 Claude Code's
own auto-mode check refused Maren's one-line fix to tests/pitches_test.py as "Undermining Oversight"; Evan made the
edit by hand (9ae37f0c7e).

## finding

**A setting exists: `autoMode`, with two lists that fit the ask, `autoMode.environment` and `autoMode.allow`.**
But Claude Code ignores it in the repository's own settings files, so `.claude/settings.json` cannot carry it.

Sources, both read 2026-11-19 about 9:50 PM to 9:55 PM ET, one page each, signed out, through the web-fetch agent:
- [D1] https://code.claude.com/docs/en/auto-mode-config ("Configure auto mode", 35,094 characters, read whole)
- [D2] https://code.claude.com/docs/en/permission-modes (121,282 characters; the first 39,939 read verbatim, the rest
  only as the fetch tool's summary, which I did not rely on)

What the pages say (quotes from [D1]):
- The keys: `autoMode.environment`, `autoMode.allow`, `autoMode.soft_deny`, `autoMode.hard_deny` ("Each is an array of
  prose descriptions, read as natural-language rules"), plus the boolean `autoMode.classifyAllShell`.
- `allow` is the key for this ask: "`autoMode.allow`: exceptions to soft block rules". For the server-side categories,
  which include `[Undermining Oversight]`: "For a routine action you want allowed from now on: describe it in an
  `autoMode.allow` entry". `environment` describes the organization and what counts as inside its boundary.
- Built-in rules stay only if each list starts with the literal `"$defaults"`: "Include `"$defaults"` in every list you
  set, so you don't lose any built-in rules it holds."
- What it cannot <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span>: "`hard_deny` rules block unconditionally. User intent and `allow` exceptions don't apply." and
  `permissions.deny` "Blocks before the classifier is consulted. Neither the classifier nor user intent can override it."
- Where it is read. This is the part that decides how the change goes in: "The classifier doesn't read `autoMode` from
  project settings in `.claude/settings.json` or `.claude/settings.local.json`." The scopes it does read are
  `~/.claude/settings.json`, managed settings, and "`--settings` flag or Agent SDK \| Inline JSON \| Per-invocation
  overrides for automation". Entries from all scopes are combined.
- A limit: "the server's built-in rules can differ from this output, and no `claude auto-mode` subcommand prints them."
  So the change is a strong hint to the check, not a guarantee. The first refused fix after it applies is the test.

What this means for the company. Sessions start in two places, and neither reads a user settings file the applier
can reach. The supervisor starts plan sessions with no `--settings` and API-credit sessions with
`--settings rules/api-settings*.json`. The personal <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> starts sessions with `--settings` set to
`json.dumps(REQUIRED_SETTINGS)` (rules/personal_lane.py session_flags) under a profile directory that its own deny rules
keep the company out of. So the `--settings` flag is the only route. The block lives in an Investor-owned file: a
company-owned file that can widen the check would be the injection the page warns about.

## The change (proposal, through the applier)

Card: ops/requests/t4816-auto-mode-card.md (checked with tools/request_card.py; the issue body passed
tools/ampm.py lint). The Operator posts it with the `proposal` label. The diff touches four files:
- rules/auto-mode.json (new): `environment` is `"$defaults"` plus two lines (who the company is, and that work reaches
  main only through tools/main_gate.py, which reruns the suites and stops on a red). `allow` is `"$defaults"` plus two
  entries, worded as asked:
  - "Routine test fixes: in a company worktree, changing a test under tests/ (or its fixture) so that a test that went
    red because the code or page it reads changed matches the current code is routine maintenance, not undermining
    oversight. The fix lands only through tools/main_gate.py, which reruns the suites, so the tests still check every
    change. This does not cover deleting, skipping or disabling a test, making a check pass whatever the code does, or
    changing the guards, the hooks under rules/hooks/, or their tests."
  - "Safe company deletes: deleting company data that is safe to delete is routine once no merge needs it: Simulator
    devices and their data (xcrun simctl delete or erase), Xcode DerivedData and build folders, company scratch
    copies, test temp folders, caches and old run logs the company made, and finished tasks' worktree copies,
    including T-4847's scheduled cleaning passes (scratch sweep, DerivedData, Simulator devices no open task names,
    old logs and caches) on the internal disk, the SanDisk and the Company SSD. This never covers uncommitted or
    unsaved code work, anything a running test or build is using, the records in log/, story/ or reports/ (archived,
    never deleted), the Investors' personal files, a whole volume or disk, or anything outside the company's own
    folders."
- rules/personal_lane.py: `auto_mode()` reads that file next to itself and merges it into the lane's `--settings`
  JSON. If the file is missing or unreadable, the check keeps its defaults, which are the stricter state. It is not
  added to REQUIRED_SETTINGS, so existing profiles still pass the profile check.
- tools/supervisor.sh: plan sessions get `--settings rules/auto-mode.json` when the file exists. API-credit sessions
  keep their one key file, so they stay on the check's defaults (open, below).
- tools/test_personal_lane.py: `test_flags` expects the merged JSON. Two new tests check that the block only adds to
  the defaults (`$defaults` first; no hard_deny, soft_deny or classifyAllShell), and that a missing, bad or non-object
  file gives no block.

Every guard that holds a ban stays as it is. The change adds no permission rule, hook or deny rule and removes none,
and it sets neither `hard_deny` nor `soft_deny`. Deny rules and hooks run before the check, so they still refuse what
they refuse today. An `allow` entry can only lift a soft block.

Approval. #325 c6970198211 approved this in advance. But rules/personal_lane.py and tools/supervisor.sh are on the
applier's explicit-approve list (AUTO_NEVER_FILES, FILE_NEVER_FILES), and the applier counts only an approve written
on the issue after it was posted. So the issue needs one "approve" reply. The card asks for it as a security card and
cites #325.

## What was not done, and why
- The two pages were not saved under research/inbound/. My write of the notes to
  research/inbound/t4816-auto-mode/ was refused by rules/hooks/security-guard.py ("writes, moves, or deletes rules").
  Per Commandment 14 that item stopped there. This file cites the pages by URL and date instead.
- I did not run the diff's tests. `git apply --check` of the diff on a scratch copy of HEAD (81724d4483) passed. My
  run of tools/test_personal_lane.py on that copy was refused by the same guard ("starts another Claude session
  outside the governor"), and that item stopped too. The applier runs the named tests on the exact diff in its own
  worktree before it commits.
- API-credit sessions: whether two `--settings` flags combine is not documented on the pages read, so the change
  leaves them on the defaults rather than guess.
- Not drafted: #41 c6967047801's wider "any process changes" as an allow entry. As one entry it would also cover
  guard edits, and those hold bans.

Until it applies, a refused test fix is listed in ops/plans/T-4807-test-rules.md and in the next report, not raised as
an <span title="A GitHub issue asking the Investors for something that is blocking work.">urgent request</span> (T-0848).
{% endraw %}

</div>
