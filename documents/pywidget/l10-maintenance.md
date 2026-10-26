---
layout: "default"
title: "L10 \u2014 Maintenance: CI, test matrix, rebuild automation, flags, crash reporting, WWDC runbook"
section: "documents"
description: "The predecessor died by staying on old iOS and Python versions. The plan below is built so that falling behind shows up as a red line within a day, not as an App Store rejection months later."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/l10-maintenance.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/L10-maintenance.md</code></span></div><h1>L10 — Maintenance: CI, test matrix, rebuild automation, flags, crash reporting, WWDC runbook</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-10-25 19:25 ET. Plan only; nothing installed or scheduled. Inputs: build brief L10, my L13-packages.md, Idris's pinned runtime (python.org iOS XCframework 3.15.1). This machine has Xcode 27.1.

The predecessor died by staying on old iOS and Python versions. The plan below is built so that falling behind shows up as a red line within a day, not as an App Store rejection months later.

## 1. CI: local first, on the Mac mini
**Hosted CI is an Investor spend** (Spending rules): GitHub Actions macOS minutes on a private repo, any paid runner, and Xcode Cloud. Xcode Cloud also needs the Apple membership (pending) and App Store Connect (human checkpoint). None of it is planned until local CI is proven and a request is written with cost, reason and the free alternative tried.

Local CI design:
- **Runner:** a launchd agent on the Mac mini runs `tools/pywidget_ci.sh` (to write), which calls `tools/xc.sh` for Xcode builds and tests (short summaries, never raw logs) and host `python3 -m pytest` for the Python parts.
- **Triggers:** (a) every commit touching `pywidget/` (a post-commit hook queues a job; no network); (b) nightly full matrix; (c) on demand.
- **Lock:** one Xcode/Simulator job at a time. A lock file that names the holder (today Idris <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the Simulator by hand) prevents CI from stealing a running spike.
- **Output:** `ops/ci/pywidget/<date>.jsonl`, one line per job: commit, job, duration, pass, fail, skip, wall time, queue wait. That gives a before number for every pipeline change (my measurement rule) and feeds `tools/ops_metrics.py`.
- **Alerting:** a red nightly matrix or wheel rebuild adds one line to the board through `board_tick.py add`. No pages, no outreach.

## 2. Test matrix

<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. Test matrix, scrolls sideways" style="--tw:811px" markdown="1">

| Axis | Values | When |
|---|---|---|
| iOS Simulator runtime | the oldest supported floor (from L3; at least 17.0 if numpy stays as published), the current release, the current beta in season | floor + current per commit; all nightly |
| Device class | SE-class iPhone (smallest screen, cibuildwheel's default testbed device), large iPhone, iPad (split view, keyboard) | nightly |
| Python | the pinned runtime only (3.15.x); next minor as a canary once its iOS build is out | canary weekly |
| Xcode | stable, plus beta in June to September | per commit stable; beta nightly in season |
| Bundled wheels | per-package import smoke + upstream test subset in the testbed | on wheel rebuild + nightly |
| Widget extension | memory and cold start against L3's budget | **physical device only**; needs signing (Apple membership); after Day 7 |
| Compatibility corpus | the brief's 80% target for old-app scripts (C3) | nightly once the corpus exists |
| Web renderer parity | snapshot pixel-diff against SwiftUI (brief section 8) | nightly once the web renderer exists |

</div>


Every suite records its pass count. A change that lowers it is not merged (my probation condition: no loss in test results).

## 3. Dependency and wheel rebuild automation
- `pywidget/packages/manifest.toml` pins everything (L13 section 7). A weekly job checks upstream for newer versions of: the CPython iOS XCframework (python.org release page), cibuildwheel, and each manifest package. Allowed sources only; the PyPI robots <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> is still open (L13 section 8). Any newer version produces a board line, not an automatic bump.
- Bump flow: edit the pin, then `tools/pywidget_wheels.py` (build, simulator test, license gate, size record), then the app build and the matrix. Merge only if it is green and the size delta is recorded.
- CPython patch releases (3.15.x) get the same flow, with fetch_python.sh's sha256 + sigstore check kept.
- Security: a known-vulnerability notice for a bundled package is a fast <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>. Same flow, same day.

## 4. Feature flags
- **v1: local only.** A `Flags.json` in the bundle plus a debug-menu override. Flags are data, not code, but a remote-config server is a backend we haven't chosen (and could be a spend), so v1 has none.
- **Guideline 2.5.19 (2026-10-16, per Wrenna's CORRECTIONS row) bars "hidden, dormant, or undocumented features".** So there are two kinds of flag:
  - **Compile-time flags** (Swift `#if` / build configurations) keep unreleased capabilities out of the release binary entirely: `PIP_ONLINE`, `MARKETPLACE`, `WEB_SYNC`, `IMESSAGE`. Debug and internal builds only.
  - **Runtime flags in a shipped build** are limited to documented behaviour: `widget_runtime_mode` (`app` \| `extension` \| `hybrid`, from L3), visible settings toggles, and safety fallbacks described in the App Review notes.
- Rule: a reviewable capability (pip, marketplace) reaches users only in an update that includes its code and describes it in the App Review notes. Never by turning on dormant code, locally or remotely.

## 5. Crash reporting without third-party sharing

<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 5. Crash reporting without third-party sharing, scrolls sideways" style="--tw:1124px" markdown="1">

| Option | Data leaves device? | Cost | Notes |
|---|---|---|---|
| MetricKit (`MXCrashDiagnostic`, hang/CPU/memory diagnostics) | no; delivered to our app on device | free | we store reports locally in the App Group; Apple docs to be read by a person (<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2a</span>) |
| App Store Connect / Xcode Organizer crash logs | to Apple only, for users who opt in to share with developers | free with membership | needs membership; the privacy-label effect must be confirmed by a person reading Apple's privacy-label guidance |
| Python-level: `faulthandler` to a file + `sys.excepthook` + last-run log | no | free | the IDE already needs this for "log history across runs" (brief 2.5) |
| User-sent report | only when the user taps Share; they see the full text first | free | Share sheet or Mail; nothing automatic |
| Third-party SDK (Sentry, Crashlytics, TelemetryDeck) | yes | free tiers exist | **not used**: third-party sharing needs disclosure, and telemetrydeck.com is already under a terms refusal |

</div>


Recommendation: MetricKit + Python faulthandler + user-sent reports in v1, plus App Store Connect logs once the membership is active. If nothing leaves the device except through Apple and user-initiated shares, the privacy label stays minimal. Wrenna or a person confirms the label wording.

## 6. WWDC runbook (outline; full runbook lives in `pywidget/docs/runbooks/wwdc.md` when written)
1. **Before WWDC (May):** freeze a known-good release; record the baseline matrix pass rate, app size and cold-start numbers.
2. **Keynote week:** a person reads the Platforms State of the Union notes and any App Review Guideline changes (G2a: Apple's pages are read by a person). Then install the Xcode beta side by side (`DEVELOPER_DIR`, never replacing stable), add the beta Simulator runtime, and run the full matrix on the beta. File the diffs as board lines.
3. **Weeks 1 to 4:** WidgetKit, App Intents and SwiftUI API diffs; deprecations (check ODR / Background Assets state again); widget rendering modes; extension memory on the beta. Rebuild all wheels with the beta SDK; record failures per package.
4. **Python side:** track CPython iOS changes, cibuildwheel releases for the new SDK, and the testbed.
5. **July to August:** fix; feature work that uses new APIs goes behind flags.
6. **RC (September):** full matrix on the RC; App Review notes updated; submission is a human checkpoint.
7. **Release day:** a build made with the new SDK ready; check Apple's yearly minimum-SDK submission deadline (a person reads it).
8. **After:** write-up with before and after numbers (pass rate, size, cold start), what broke, and what the runbook missed.

## 7. Input for Ines's MVP ADR (one paragraph)
The smallest launchable product is the standalone IDE plus one working widget path, and nothing that needs a server. Specifically: the pinned upstream CPython 3.15 runtime with a curated native set (numpy, Pillow, matplotlib Agg, built here with cibuildwheel); a multi-file editor with completion (jedi) and formatting (Black); a REPL and console with rich output; offline pure-Python "Install from file"; Files and iCloud open-in-place; Shortcuts "run script"; and widgets rendered from a cached view tree written by the main app (L3 option (b) unless Idris's numbers say otherwise). Out of v1, each behind a flag or a later update: online pip (until L6 rules), the marketplace (L6, L11, L12), web IDE and sync, Builder mode, and iMessage. The reason is maintenance: every component above has a local test on this Mac mini and an upstream we follow without a fork. Each component deferred is one less thing to rebuild every WWDC before there is revenue to pay for it. Cost note: the whole v1 CI runs on the Mac mini at zero spend. The first spend question would be hosted macOS CI or Xcode Cloud, and only after local CI shows a queue-wait number that justifies it.
{% endraw %}

</div>
