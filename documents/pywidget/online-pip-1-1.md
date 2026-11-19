---
layout: "default"
title: "Online packages (pip from PyPI) in 1.1: design note and host-test plan"
section: "documents"
description: "One sentence. The person types a package name in the app and taps Install; the app asks PyPI for that one project, downloads only pure-Python wheels, and hands them to the same local installer that Install from file\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/online-pip-1-1.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 29 · Thu Nov 19</span><span><code>pywidget/docs/design/online-pip-1-1.md</code></span></div><h1>Online packages (pip from PyPI) in 1.1: design note and host-test plan</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-19, T-0101. Status: **spec and test plan only. Nothing here is built.** Written under ADR-006 s12.2 and s12.6 (online pip is on the 1.1 plan, rated Medium, under every condition of s9.4 and s3 item 3 (c)-(d)); s14.1 keeps those sections standing against the re-dated 1.0. Until the update that carries it is the build being submitted, online-pip code lives on a branch only: nothing reaches `main`, TestFlight or a release build before then, and it is never there dormant behind a flag (Guideline 2.5.19; matrix row 36). Code bound for TestFlight is reviewed by someone other than its author (Commandment 13).

Sources read for this note, and nothing else: ADR-006 s3, s9, s10-s14; ADR-003's section list; the Install from file Python side (`pywidget/runtime/installer/_pywidget_install/`, Pernille e483d9de; follow-up tests T-0211, 5e423495) and its open app wiring (T-0212); matrix rows 36-37; the review-notes draft. Apple's text is quoted only from the company's saved copies, signed out, under the #64 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>: the Program License Agreement (`research/inbound/apple/developer.apple.com/support_terms_apple-developer-program-license-agreement-3b1a90c7.html`, fetched 2026-11-12 3:10 AM ET, T-4127) and the App Review Guidelines (`.../app-store_review_guidelines-7d7ba114.html`, same fetch). PyPI's text is quoted from `pywidget/docs/research/ADR-006-raw/terms/` (ADR-006 s9.1). No page was fetched for this note.

**One sentence.** The person types a package name in the app and taps Install; the app asks PyPI for that one project, downloads only pure-Python wheels, and hands them to the same local installer that Install from file uses, so the only new thing is where the file comes from.

## 1. Shape: Swift fetches, Python decides, the installer stays offline


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Shape: Swift fetches, Python decides, the installer stays offline, scrolls sideways" style="--tw:1243px" markdown="1">

| Part | Where | What it does | What it never does |
| --- | --- | --- | --- |
| Install sheet | Swift, app target only | A name field, an Install button, the privacy line (s3 item 7), progress, the refusal text, and the Install from file button as the fallback | Runs from anywhere but the button's action |
| Transport (`PackageFetcher`) | Swift, app target only | HTTPS GET to two hosts: `pypi.org` for `/simple/<name>/` and `files.pythonhosted.org` for the file URLs the index returned. Serial, User-Agent, `Accept`, `If-None-Match`, one retry, the hard <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> | Any other host or path; parallel requests; background sessions; any call from the widget extension, App Intents or a background task |
| Planner (`_pywidget_install/online.py`) | Python, a pure module with no network import | Normalizes the name, reads PEP 691 JSON replies, picks the file, checks the hash, walks `Requires-Dist`, counts requests, and says what to fetch next or why it stopped | Opens a socket. It is fed bytes by Swift and returns actions |
| Installer | Python, unchanged (`install_files`, `archive.inspect`, the resolver) | Every check Install from file already makes: `py3-none-any` or `py2.py3-none-any` only, `.so`, `.dylib`, `.dll`, Mach-O/ELF/PE magic and platform tags refused, RECORD checked, bundled names refused, all-or-nothing store, `sys.path` not a site directory | Anything new |

</div>


Why the split. Condition 1 says `pip` inside the person's own Python stays unavailable. If the fetcher were Python, any script could import it; in Swift it can't be reached from Python at all. The decisions stay in Python because that is where the version, marker and requirement code already lives (`requirements.py`: `canonical`, `Version`, `specifier_contains`, `Requirement`) and where it can be tested on the host with fixtures. The existing test `test_no_network_imports_in_source` (test_isolation.py) walks the whole `_pywidget_install` package, so it covers `online.py` the day it is added.

The loop for one Install press:

1. The planner normalizes the typed name (`canonical`, PEP 503; PEP 691 gives "Silly_Walk" -> `silly-walk`, pep-691.txt 212) and refuses anything that isn't a valid project name before any request is made.
2. It returns `fetch_index("/simple/<name>/")`. Swift fetches it with `Accept: application/vnd.pypi.simple.v1+json` and hands back status, ETag and body.
3. The planner checks `meta.api-version` is 1.x (pep-691.txt 179-191), keeps files whose name has a `py3-none-any` or `py2.py3-none-any` tag, have a `sha256` in `hashes`, are not yanked, whose `requires-python` admits the app's Python, and whose URL is `https://files.pythonhosted.org/...`. It picks the highest such version that meets the requirement and returns `fetch_file(url, sha256)`.
4. Swift downloads into a temporary folder in the container. The planner checks the sha256, runs `archive.inspect` on it (native code is refused here, before anything is stored), and reads its `Requires-Dist`. Each requirement already met by a bundled or user-installed distribution is skipped; each unmet one becomes the next `fetch_index`.
5. When nothing is unmet, the planner returns `install(paths)` and the existing `install_files` stores the batch all-or-nothing. When a cap or a refusal is hit, it returns `stop(code)`, nothing is stored, and the temporary files are deleted.
6. Every installed file opens in the editor as source (s3 item 3 (d)); the sheet ends with a link to the package's folder.

Unread, so held conservative: PEP 592 (what "yanked" lets an installer do) and PEP 440's pre-release defaults are not in the company's saved copies. Until a person or a #64-style read adds them, the planner skips every yanked file and every pre-release unless the person typed an exact pre-release version.

## 2. Conditions (c)-(d) of ADR-006 s3 item 3 (its date superseded by s10)

Item 3's 1.1 date was superseded by s10; its conditions (c) and (d) still bind, by s10.3 and s12.6.

- **(c) Built on a branch, compiled out until it ships.** Branch `pip-1-1` (name may change; one branch). `main` holds no `online.py`, no `PackageFetcher`, and no string naming PyPI's hosts until the pip update's own merge. A release-build check (R1-R3 in s5) proves it each time a release is built.
- **(d) Its own update, named in its review notes; never automatic, never native, every file in the editor.** The update and its sentence are s4. "Never automatic" is condition 1; "never native" is the installer's existing refusal, run on every downloaded file; "in the editor" is step 6.

## 3. The s9.4 conditions, one by one


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. The s9.4 conditions, one by one, scrolls sideways" data-n="1" style="--tw:858px" markdown="1">

| # | Condition (ADR-006 s9.4, s12.6) | How the design meets it | Test (s5) |
| --- | --- | --- | --- |
| 1 | Only on an explicit action in the main app | The planner is created only by the Install button's action. The fetcher is in the app target only. `pip` and `ensurepip` stay out of the bundle (stdlib manifest) | H11, S5, S6, S7 |
| 2 | One project at a time, never the list | The planner's only index action is `/simple/<normalized-name>/`. No search box, no browsing | H2, S1 |
| 3 | Hard cap: 25 index requests and 25 downloads per press, serial, one retry with backoff, ETag honoured, session cache | Counted twice: in the planner (it stops and says why) and in `PackageFetcher` (a hard stop that doesn't trust the planner). One retry after a fixed backoff, then stop. Index replies cached in memory for the app session, keyed by name, with their ETag | H3, H4, H5, H6, S2, S3 |
| 4 | No prefetch, no update checks, no mirroring | No timer, no launch hook, no stored catalogue. The session cache is in memory and is dropped when the app quits | S6, S7 |
| 5 | Identifying User-Agent | `pywidget/<version> (+<support URL>)`. No device ID, locale or person's data | S4 |
| 6 | Only pure wheels, sha256 against the index reply, files from the URLs the index returns | Step 3's filter and step 4's hash check, then the unchanged installer checks. A file URL on any host but `files.pythonhosted.org`, or on `pypi.org/packages/`, is refused | H7, H8, H9, S1 |
| 7 | Privacy line in the sheet and the policy; Wrenna checks the App Privacy label | The sheet shows "Installing contacts pypi.org and files.pythonhosted.org; the Python Software Foundation's privacy notice applies" (s9.4 item 7's words). The policy line is Wrenna's, with the label | H14 |
| 8 | The fallback ships with it | Every `stop` code's message offers Install from file; the sheet always shows that button | H13 |
| 9 | Re-opened if PyPI's terms or robots change for installers, PyPI writes, or a 1.1 build shows real requests above the cap | The debug build counts requests per press in its own log on the device (nothing is sent to us). The TestFlight pass in s6 reads that count | S2, s6 |
| 10 | DPLA 3.3.1(C): no package enables an app feature; nothing on PyPI from us; bundled `pywidget` first on `sys.path` | See below | H10, H12, S8 |
| 11 | DPLA 3.3.1(D)(e): Mac availability stays off; name the clause | See below | R4 |

</div>


**Condition 10, DPLA 3.3.1(C).** The clause, as saved: "Without Apple's prior written approval or as permitted under Section 3.3.9(A) (In-App Purchase API), an Application may not provide, unlock or enable additional features or functionality through distribution mechanisms other than the App Store, Custom App Distribution or TestFlight." PyPI is such another mechanism. So:
- Pro and every app feature unlock only through StoreKit, checked in Swift. The Pro gate reads the StoreKit state and the bundled `pro-flags.json` only; no value that comes back from Python (a run's outcome, a file in the container, an installed package) is an input to it.
- The company publishes nothing to PyPI. No project on PyPI is ours, and the app has no list of preferred projects.
- The bundled `pywidget` modules stay first. `add_user_packages` already puts the user folder right after the bundled set, and the resolver already refuses a distribution the app bundles. The online path adds one more refusal: a downloaded distribution whose top-level names include `pywidget` or any `_pywidget*` module is refused, whatever its project name.

**Condition 11, DPLA 3.3.1(D)(e).** The clause binds "macOS Applications submitted to Apple for distribution on the App Store": "such Applications may not function as a distribution mechanism for software and may not include features or functionality that create or enable a software store, distribution channel or other mechanism for software delivery within such Applications". DPLA 6.3, in the same saved copy, says an app compiled for iOS or iPadOS is made available on macOS and visionOS by Apple "unless You opt out of making Your Application available on macOS and/or visionOS by following the opt out process in App Store Connect". So staying off the Mac is an act, not a default: a person has to opt out in App Store Connect. Whether an iPad app run on a Mac under 6.3 counts as a "macOS Application" for 3.3.1(D) isn't said in the text I read; this design treats it as binding. Mac availability stays off; any later Mac ruling re-checks this feature first (ADR-006 s12.6).

## 4. The separate update and its review-note sentence

**Its own update.** ADR-006 s12.3 says pip "ships in its own update, never bundled with a fix we need", and s13.3 item 6 says Explore and online pip never land in the same update. Online pip also needs Install from file's app wiring (T-0212: the bootstrap activates the user folder, the picker, the messages), which is a 1.1 item of its own and is the fallback condition 8 requires. Recommendation: Install from file ships in an update before pip, so a pip rejection can't hold back a feature that is rated Low-Medium on its own (matrix row 37); the pip update then carries pip and nothing else we need. If the chair prefers one update, the fallback still works because it ships in the same build. Which update number pip takes is the chair's.

**Review-note sentence (draft, for that update only; Guideline 2.3.1(a) asks for new features "described with specificity in the Notes for Review").**

> New in this version: when the user types a package name and taps Install, the app requests that one project's listing from pypi.org and downloads only pure-Python wheels (py3-none-any) from files.pythonhosted.org, checks each file's SHA-256 against the listing, and refuses any native code (.so, .dylib, Mach-O). At most 25 listing requests and 25 downloads per tap; nothing is fetched automatically, in the background or by the widget extension, and every installed file opens as editable source in the app's editor. Packages extend the user's own scripts only; no package can unlock any feature, which is sold only through In-App Purchase.

ADR-006 s12.6 lets this note also quote DPLA 3.3.1(B)'s interpreted-code sentence and map (a)-(c) to s9.4; whether to add that is decided when the update's notes are drafted, against their character budget. The 1.0 notes don't change: "there is no package installer" stays true for 1.0.

## 5. Test plan

All host tests run in `pywidget/tests/run_host.py` on the host Pythons the installer suite uses, with fixture replies and fixture wheels only. They never reach the network: the planner has no network import, the suite runs under the audit hook `test_isolation.py` already uses, and the company's `terms_guard` refuses `/simple/` for our own tools anyway (ADR-006 s9.3 item 3).

**Host tests (Python, `pywidget/tests/installer/test_online.py`):**
- H1. Names: "Silly_Walk" -> `silly-walk`; refused before any action: empty, spaces, `/`, `..`, a URL, a name with a version specifier the parser can't read.
- H2. Every index action, over every fixture run, matches `^/simple/[a-z0-9]+(-[a-z0-9]+)*/$`. Never `/simple/` alone, `/search`, `/pypi/`, `/packages/`.
- H3. A fixture chain of 30 dependencies stops at 25 index actions with the cap message; nothing is stored; the temporary folder is empty.
- H4. The same for 25 file downloads (a chain whose index replies are cached).
- H5. Serial: asking for the next action before the last one is fed raises; there is never more than one open action.
- H6. Retry: one failure then success installs; two failures stop with the fallback message. A 304 reuses the cached body; a repeat for the same name in a session carries its ETag.
- H7. Selection: an sdist-only project, a project with only `cp*` wheels, a yanked-only project, a `requires-python` the app's Python fails, an `api-version` 2.0 reply, a file with no `sha256`, a file URL on another host or on `pypi.org/packages/`: each refused with its own code. Pre-releases skipped unless pinned exactly.
- H8. A downloaded file whose sha256 differs from the reply is refused and deleted before `archive.inspect` runs.
- H9. The installer's own refusal fixtures (test_refuse.py: `.so`, Mach-O, platform tag, RECORD mismatch) fed through the online path are refused with the same codes.
- H10. Bundled first: a project the app bundles (`requests`) is refused; a project of any name whose top level holds `pywidget` or `_pywidget_runtime` is refused; after an install, the bundled set still comes before the user folder (the check in `test_next_launch_pth_inert_and_bundled_wins`, rerun after an online install).
- H11. The whole planner run, under the audit hook in a child process, records no socket, DNS, urllib or subprocess event. `test_no_network_imports_in_source` lists `online.py` among the files it scanned (so it can't be skipped by a rename).
- H12. Nothing in `_pywidget_install` reads or writes `pro-flags.json`, a StoreKit receipt or any path the Pro gate reads (a source scan with a seeded mutant that adds one).
- H13. Every `stop` and refusal code the online path can return has a message in `messages.py` that names Install from file as the other way.
- H14. The sheet's privacy line is one of the app's strings, word for word (in the settings-strings test).
- Mutants: one seeded mutant per condition (cap off by one, a parallel action, a list request, a skipped hash check, a bundled-name pass, a network import), each killed, recorded as `tests/installer/mutants-t0101.json` the way T-0211 did.

**Swift tests (XCTest, a stub `URLProtocol`, no live network):**
- S1. Only the two hosts and their two path shapes leave the fetcher; anything else is refused before a request is made.
- S2. The hard cap holds even if the planner asks for a 26th request; the debug log records the count per press.
- S3. Requests are serial; the retry waits its backoff once.
- S4. Headers: the User-Agent matches `pywidget/<version> (+<support URL>)` and has no device ID; `Accept` is the PEP 691 JSON type; `If-None-Match` is sent on a repeat.
- S5. The widget extension target doesn't compile or link `PackageFetcher` (a check over `project.yml`'s target sources).
- S6. No App Intent, background task, launch path or timer refers to `PackageFetcher` or the planner (a source scan; one call site, the Install button).
- S7. The fetcher uses a foreground, ephemeral session with no background configuration.
- S8. The Pro gate's inputs are StoreKit and the bundled flags file only (a test that feeds it a Python outcome claiming Pro and sees it stay locked).

**Release checks (each release build, from the day this lands on the branch):**
- R1. Before the pip update: the release app binary contains none of `pypi.org`, `files.pythonhosted.org`, `vnd.pypi.simple` (a `strings` check in the release gate).
- R2. Before the pip update: `main` has no `online.py` and no `PackageFetcher`. This check's expected value changes only in the pip update's own commit.
- R3. In the pip update: the review notes carry s4's sentence (a text check against the draft).
- R4. Before the pip update is submitted: a person confirms in App Store Connect that macOS (and visionOS) availability is off (DPLA 6.3), and the confirmation is recorded with its date. The company can't check this: App Store Connect needs a sign-in.

## 6. On a device

On the branch's debug build, before review: install a small pure package with no dependencies and one with three; open each installed file in the editor; try a project that has only native wheels (refused, fallback offered); turn on Airplane Mode (stopped, fallback offered); read the per-press request count in the debug log against the cap. This needs the iPhone and is a person's step or the MacBook runner's; it isn't host-testable.

## 7. Open items

1. **Mac and visionOS availability (condition 11).** DPLA 6.3 makes them on unless opted out in App Store Connect. I found no record that the opt-out has been made; PROPOSAL-002's row proposes it as a human step. Needs a person, signed in, before the pip update is submitted (R4).
2. **Whether 3.3.1(D)(e) reaches an iPad app run on a Mac under 6.3.** The text read doesn't say. The design treats it as binding; the chair may confirm.
3. **The Investors' Restructuring 15 answer (#284, 2026-11-14):** code from a project file someone else made gets less reach and is shown before it first runs. A PyPI package is not a project file, and it runs inside the person's own script with that script's reach. This design shows every installed file as source but adds no reach limit. The chair says whether that reading holds or whether a package should carry the outside-code notice.
4. **ADR-006 s14.2's S1b row** says a file the person opens is "the only way another person's Python enters the app", while s14.1 keeps s10-s12 (online pip) standing. The two read against each other; the chair reconciles them with a dated note.
5. **Update order (s4).** Recommended: Install from file (T-0212) in an earlier update, pip in its own. The chair rules.
6. **Free or Pro.** ADR-006 s12.2 sends it to the Investors with the pricing question; `pro-flags.json` already has a `packages` row. Not ruled here.
7. **Clauses not read.** PEP 592 (yanked) and PEP 440 (pre-releases) aren't in the saved copies, so the planner's rules for them are the conservative ones in s1. The DPLA's Attachment 2 (In-App Purchase terms, named by 3.3.9(A)) wasn't read; condition 10 rests on 3.3.1(C)'s sentence alone.
8. **App Privacy label** for the pip update: Wrenna's, when it is drafted (s9.4 item 7).

## 8. What would make this fail

A planner bug that walks a large dependency tree on many devices at once: the cap stops each press, and the Swift counter stops it if the planner is wrong. A reviewer reads Guideline 2.5.2 ("may not download, install, or execute code which introduces or changes features or functionality of the app") alone and rejects the update: it costs that one update, because pip ships alone (ADR-006 s12.6). PyPI throttles the app's User-Agent: the fallback is in the same sheet. A branch that lives for months drifts from `main`: rebase it when the installer changes, and run the host tests on both.
{% endraw %}

</div>
