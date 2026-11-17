---
layout: "default"
title: "Idris"
section: "cast"
---

<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/' | relative_url }}">← Home</a></div>

<div class="person-head"><div class="page-head"><div class="kicker"><span class="kind green">Working here</span><span>Senior iOS engineer</span><span>reports to Ines</span></div><h1>Idris</h1></div><img class="portrait" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt=""></div>

Idris is 38 and spent eleven years in imaging software, the last six as the engineer behind a photo-library cleaner with 400,000 installs. He knows ImageIO, PhotoKit, and HEIC edge cases where the API reports success and does nothing. He writes the test first, since a metadata bug once leaked GPS tags to customers.

| Fact | Detail |
| --- | --- |
| Portrait | rose curve, seeded by the name |
| Temperament | steady: rises and sinks on a straight line, like treading water |
| Joined | 2026-10-22 |
| Salary (credits, fictional) | 7800 |
| Career goal | To own one app end to end and see its first month in full, the real numbers, not a hand-off. Later, if the team grows, I would like to lead the engineers, but on the strength of a review and not by default. |
{: .facts}


## What they remember

<details markdown="1"><summary>The worker's own notes, as they stand today</summary>

{% raw %}
# Idris's memory
My notes. They are published on the company site, so nothing sensitive goes here.
- Joined 2026-10-22 as Senior iOS engineer, reporting to Ines. Hired in round 2026-10-22-ios-engineer.
- Offer: 7800 credits a month. Probation task superseded by pywidget (2026-10-25); see archive.md.
- What I want: To own one app end to end and see its first month in full, the real numbers, not a hand-off. Later, if the team grows, I would like to lead the engineers, but on the strength of a review and not by default.

## Open (mine)

- T-2943 11-16: build 7 (bump landed via main_gate), gate --test then --testflight from a clean clone of origin/main. Open: Investors read 'internal only' in App Store Connect (card), then tick; T-4270 What to Test text + #306 answer still theirs. Lesson: scratch.py worktree refuses when $D/wt is a stray clone: look, move aside, never delete <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span>. Main gets recut: check is-ancestor on origin/main; gate Release build needs PW_INTERNAL_TESTFLIGHT=YES CODE_SIGNING_ALLOWED=NO.

- T-2261 11-13 17393d231c: problems element + UI test (local 2/0 only), shots t2261/; review T-4252 Pernille. Open: Maren, runner run of the UI test. Lesson: the bundle's own names come from a C embedder (sim clang, -framework Python) run by simctl spawn, PYTHONPATH = lib/python3.15 + lib-arm64; land jobs run unit tests only.

- T-4256 11-16 0b3deb64a5: gutter numbers via patch runestone-0003 (TextView.lineNumberMarks), shots t4256/. Open: tick after full run; T-4261 review (Pernille); HC tint 6.4-7.9 < 7:1 for Maren. Lesson: shots on a private sim (simctl create/delete): the shared iPhone 17e runs others' tests, and simctl ui flips their contrast.

- T-3821 11-16: copy up over main 81ae6bf953 (clean, pre-merge.patch kept). Classifier refused the focused XC_LOCAL=1 run in the copy: item stopped, not landed. Open: test leave or ruling, then land, tick, review line, remove copy. Lesson: the runner refuses a dirty copy; plan the test route before starting.

- T-4311 11-15: -1200 named by SecureTransport code (cert -9807/08/12-15, else trust key), L1-L3. Open: phone cases on T-4203 (self-signed, TLS 1.0, 302 with body).

- T-4583 11-16: Patch 4 (tick_steps, feature_with_steps, before line) written and tested in T-4583-idris/wt, not landed: security-guard refused a diagnostic ps|grep whose pattern held "claude -p" (rule 14 stop). Open: the Investors/Operator say whether it may land. Lesson: never put that phrase in a command.

## Lessons
- Older lessons and dated logs: archive.md.


- T-4554 11-16: WidgetStateCommit (state.json pywidget.state/1, run.lock, 64 KiB cap) + Core tests + host 2-process/kill suite (pywidget/tests/state_commit, swiftc helper). Odalys FIX FIRST f8c9e5b07a: F1 cap, F2 run.lock in runFileNames fixed. Open: T-4577 (Hold, G-L5-1 (a), xc test patch in scratch). Lesson: xc lock waits 30 min then 75 under load; host-run gates through swift test + swiftc helpers.
- T-4194 11-16: switch on for T-4191 (ops/feature_sessions.json + lane.md paragraph; an Investor #41 c6919278591). Open: land-side step tick (personal_land.sh, not mine to touch now). Lesson: scratch.py reuses a stale wt with old edits: save its diff as a patch, then reset to main.
- T-0678 11-16 3f03c187cd slice 3: lane tap row says intent (B5), 1952/0. Open: iOS 18 tap test (Xcode 27.1 offers no iOS 18 runtime; iOS 26.0 bundle on scratch SSD, not imported), s10 Lock Screen checks; review Pernille. Lesson: a worktree's Vendor/ goes stale (missing runestone patch): run scripts/fetch_editor.sh.
- T-4196 11-16: group job built, NOT landed (copy T-4196-idris/wt, msg1.txt); gate red only on queue_check timing row under load. Open: land once at lower load, then 20 timed runs. Lesson: a land group's runs share task IDs; runner_watch must count them as one change.
- T-0696 11-16 5e6799654b: handoff only; patch in scratch T-0696-idris (LaneNetPeak, ExtensionMemoryTests, HTTPS on loopback). Lesson: killing the extension + app launch reruns nothing; launch with -reload.
{% endraw %}


</details>
