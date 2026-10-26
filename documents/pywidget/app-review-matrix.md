---
layout: "default"
title: "pywidget v1: App Review readiness matrix"
section: "documents"
description: "Ruled 2026-10-26 (Ines, T-0059 follow-up): the two TODO(T-0059) items are closed. Row 37 Install from file stays a v1 stretch with condition (b) met (ADR-006 s11); row 39 and section 2b, the share extension stays in 1.1\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-store-drafts/' | relative_url }}">← App Store Drafts</a><a href="{{ '/documents/pywidget/app-review-matrix.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/release/app-review-matrix.md</code></span></div><h1>pywidget v1: App Review readiness matrix</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, market and product researcher. Day 4, 2026-10-25, started 19:57 ET. Draft, not approved. Inputs: ADR-001 section 3.1 and its "Revised" table (Ines, 19:36), PROPOSAL-002, L6, L12, L13, L16, privacy-label.md. Review notes draft: review-notes-draft.md (same folder).

Revised 2026-10-25, started 20:01 ET, for ADR-006 (Ines, 76434c17): rows 37 (Install from file) and 38 (Shortcuts and URL inputs are never code), section 2a (each S0 claim mapped to the notes sentence that states it), gate <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G10</span>, and the "Not in v1" list corrected. No rating elsewhere moved.

Revised 2026-10-25, started 23:52 ET (`date`), for T-0061, the L6 s8 duties (Idris, df971700): section 1b quotes Apple's own text from the #59 PDF with pages; rows 17, 20-22, 28, 32, 34, 35 and 37 re-tagged against it; new rows 39-44 (extension and framework disclosure, no offer in a Shortcut run or extension, privacy policy link, Pro without a permission grant, typed-place fallback, store-text purchase labels); gate G2 split, gates G11-G12 added. Ratings: none lowered (L6 s0 rule); row 34 and subtitle S3 rise (section 1b, 2.3.7). Two items wait on Ines's T-0059 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> (row 37 Install from file, row 39 the share extension's scope; the Apple question draft's third question already landed in T-0086, 1f21be73); each is marked **TODO(T-0059)** where it appears and guesses nothing. Apple quotes in section 1b were checked by tools/quote_check.py against the PDF text: 37 found; the 2 "missing" are my own old section-1 wordings, quoted as such.

Revised 2026-10-26, started 00:20 ET (`date`), for T-0109 (CORRECTIONS pass 3, U3-09, e80d0bed): section 1c adds Apple's text for the tags 1b did not quote; the 18 matrix tags pass 3 lists (rows 1, 2, 3, 4, 7, 24, 32, 38 and section 3) raised to [primary], plus 3 the same text settles (2.5.2 in rows 3 and 4, 4.7 in section 3), each cell naming its page; the section 3 quote of 2.5.2 corrected to Apple's words (*introduces or changes*, p. 18). Not raised: DPLA 3.3.1(B) (unread, #64), section 2c's Support URL "required field" (not in the guidelines PDF; App Store Connect, Day 7), and rows outside the pass 3 list. No rating moved.

Ruled 2026-10-26 (Ines, T-0059 follow-up): the two TODO(T-0059) items are closed. Row 37 Install from file stays a v1 stretch with condition (b) met (ADR-006 s11); row 39 and section 2b, the share extension stays in 1.1 (ADR-001 chair ruling 00:04). Row 42 is ruled too: way out (b), distance and altitude free (state-spec chair ruling 00:05). No marker text remains outside this note and gate G12.

> "Apple has taken issue with apps that it claims violate section 2.5.2 of the App Review Guidelines."
> 9to5Mac, 2026-03-30, on the removal of the vibe-coding app Anything ([link](https://9to5mac.com/2026/03/30/apple-steps-up-crackdown-on-vibe-coding-apps/), search snippet)

Here is the shape of it. Almost every v1 feature sits on ten years of precedent (Pythonista, Pyto, Scriptable, a-Shell, Juno). Three things can still sink a first review. (1) A sentence in our own notes that the binary makes false. The worst is "no ctypes bridge", which is false for a stock upstream CPython until the bundle strip lands. (2) Something the reviewer can't find or can't test, such as the Pro purchase or a widget that needs a background run. (3) Any route by which code reaches the app from somewhere other than the user's own hands. The matrix is built to catch those three.

## 0. Source status (read this first; Commandment 41)

developer.apple.com is read only by a person's browser (ruling 'P2 terms', research/hunt/rulings-v2.md; tools/terms_guard.py refuses the host). That read is owed (board line [needs-person], #59). Until it lands, **no guideline quote in this file counts as read from Apple's page.** Every row carries one of these tags, and none may be raised without the person read:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 0. Source status (read this first; Commandment 41), scrolls sideways" style="--tw:825px" markdown="1">

| Tag | Meaning | May it raise a risk rating or justify a "go"? |
|---|---|---|
| [G2a-held] | Read by script from Apple's page on 2026-10-24, before the ruling (research/hunt/inbox-41-python-runner.md) | No. It may lower or <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> a reading only |
| [snippet] | Words in a web-search result (from the search provider, not Apple's servers); link given | Substance yes, exact current wording no |
| [paraphrase] | Secondary source's restatement | Substance only, with care |
| [recall] | My working memory of the guideline; no source this session | No. Treated as a question for the person read |
| [primary] (added 23:52) | Quoted from the Investors' browser PDF, #59 answer A: "App Review Guidelines - Apple Developer.pdf", printed 10/25/26 9:47 PM, "Last Updated: October 16, 2026", 56 pages, in research/inbound/ (upload commit ce4f5682, blob 29972a1c). I read the session copy, same blob by `git hash-object`, with tools/pdftext.swift. Page numbers are the PDF's own footer | Yes. Apple's text as printed that night |

</div>


Rule carried from L6 section 0: every risk below is provisional, and the person read may move it **up**, never down.

**Status after #59 A (23:52).** The guidelines part of the person read has landed (G2a in section 4). A row whose status cell still says [recall], [snippet] or [paraphrase] for a guideline quoted in section 1b now rests on the [primary] wording in 1b; the cell was not rewritten row by row except for the rows named in the header. Still unread by anyone: DPLA 3.3.1(B), the App Privacy Details page, the required-reason API page, the age-rating questionnaire, the export-compliance form, and every App Store Connect field limit except the app name (G2b).

Snippet sources added this session (search only, no page fetched): 2.5.16 wording change (July 2026 adds App Clips) [iClarified 2026-07-04](https://www.iclarified.com/77531/apple-updates-app-store-review-guidelines-allows-streaming-games-if-each-title-is-submitted-for-review); 2.5.4 [conductatlas](https://conductatlas.com/platform/apple/apple-app-store-review-guidelines/provision/CA-P-018863/multitasking-background-services-limited-to-intended-purposes/) and [forum 726366](https://developer.apple.com/forums/thread/726366); 3.1.1 restore [forum 112115](https://developer.apple.com/forums/thread/112115), [forum 800637](https://developer.apple.com/forums/thread/800637); 5.1.1(ii) purpose strings, Apple's App Review Help page (title and text in snippet only) [5-1-1-purpose-strings](https://developer.apple.com/help/app-review/guideline-reference/5-1-1-purpose-strings); 5.1.5 [BetaNews 2018](https://betanews.com/2018/05/09/apple-location-sharing-apps) and [forum 112545](https://developer.apple.com/forums/thread/112545); 2.3.1 notes for review [forum 72176](https://developer.apple.com/forums/thread/72176); 2.1 demo info [RevenueCat](https://revenuecat.com/blog/growth/the-ultimate-guide-to-app-store-rejections/); notes field limit "4000 bytes" [newly.app](https://newly.app/how-to/app-store-review-notes) and [applaunchflow](https://www.applaunchflow.com/blog/app-store-metadata-character-limits-2026); 2025 age-rating questionnaire [iphoneincanada](https://www.iphoneincanada.ca/2025/07/25/updated-app-store-age-ratings), [appdevelopermagazine](https://appdevelopermagazine.com/apple-age-rating-update/).

## 1. Guideline text the matrix uses

L6 section 1 carries 2.5.2, 2.5.1, 2.5.19, DPLA 3.3.1(B), 4.7-4.7.5, 1.2, 1.2.1(a), 3.1.1, 4.2, 4.3(b) and 5.2.1-5.2.3, each with its tag. Not repeated here. The rows L6 did not carry:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 1. Guideline text the matrix uses, scrolls sideways" style="--tw:874px" markdown="1">

| Guideline | Text this matrix leans on | Tag |
|---|---|---|
| 2.1 App Completeness | Submit a final, tested build; "Include demo account info, and turn on your back-end service, if your app includes a login." Third-party lists name in-app purchases the reviewer can't find as a common 2.1 failure. | [snippet] (login sentence); [paraphrase] (IAP visibility) |
| 2.3 / 2.3.1 Accurate metadata | Hidden, dormant or undocumented features are barred (now also 2.5.19); new features must be described "specifically" in Notes for Review; generic notes are rejected. | [snippet] (forum 72176 and news copies) |
| 2.3.7 Metadata names, keywords | No competitor or other apps' names, no trademarked terms used without right, in name, subtitle or keywords. | [recall] (search found no 2.3.7 text) |
| 2.5.4 Background services | "Multitasking apps may only use background services for their intended purposes". DTS engineers on the forum: a background capability used without a related feature risks rejection. | [snippet] |
| 2.5.16 Widgets and extensions | "Widgets, extensions, and notifications should be related to the content and functionality of your app"; July 2026 wording adds App Clips. | [snippet] (older and current wording both via secondary copies) |
| 3.1.1 restore | "you should make sure you have a restore mechanism for any restorable in-app purchases"; rejections ask for a user-tapped Restore button (restore on launch alone failed). | [snippet] (forum quotes of older text) |
| 5.1.1(i) privacy policy | A privacy policy link in App Store Connect and inside the app. | [recall] |
| 5.1.1(ii) purpose strings | "Ensure your purpose strings clearly and completely describe your use of the data"; "To use location." given as a failing example. | [snippet] of Apple's App Review Help page (not fetched) |
| 5.1.1(iv) | The app must still work, or degrade gracefully, when a permission is refused; no nudging to grant. | [recall] |
| 5.1.5 Location | Use Location Services "only when it is directly relevant to the features and services provided by the app"; rejections where the app was "not functional when Location Services are disabled". | [snippet] (2018 copy; current wording unread) |
| 2.5.11 SiriKit / Shortcuts | Register only intents the app can handle; no misleading phrases. | [recall] |
| 4.1 Copycats | Don't copy another app's UI or name. Bears on the Pythonista-compatibility layer (1.1, L15), not v1. | [recall] |
| Notes field size | "4000 bytes" per one guide that reads Apple's help page; everyone else says 4,000 characters. Our draft is plain ASCII, so the two agree. | [snippet] |

</div>


## 1b. Apple's own text for the L6 s8 duties (#59 PDF; added 2026-10-25 23:52)

Quoted from the PDF's extracted text, line breaks joined; page is the footer page where the quoted words sit. Only the words a row leans on are quoted.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 1b. Apple&#x27;s own text for the L6 s8 duties (#59 PDF; added 2026-10-25 23:52), scrolls sideways" style="--tw:1152px" markdown="1">

| Guideline (page) | Apple's text | What it asks of v1 | Was in section 1 as |
|---|---|---|---|
| 2.1(a) (p. 11) | "Submissions to App Review ... should be final versions with all necessary metadata and fully functional URLs included; placeholder text, empty websites, and other temporary content should be scrubbed before submission." "include demo account info (and turn on your back-end service!) if your app includes a login." | The privacy policy URL must resolve to a real page at submission (row 41); no [bracket] left in any field | [snippet], substance right |
| 2.3 (p. 12) | "make sure all your app metadata, including privacy information, your app description, screenshots, and previews accurately reflect the app's core experience" | The store page claims map (store-page-draft s7) is this duty | not quoted |
| 2.3.1(a) (p. 12) | "All new features, functionality, and product changes must be described with specificity in the Notes for Review section ... (generic descriptions will be rejected)"; "promoting content or services that it does not actually offer ... is grounds for removal" | Notes and description name only what the build has (gates G1-G12) | [snippet], substance right |
| 2.3.2 (pp. 12-13) | "If your app includes in-app purchases, make sure your app description, screenshots, and previews clearly indicate whether any featured items, levels, subscriptions, etc. require additional purchases." | **New duty:** every premade the description names must say whether it needs Pro (row 44) | not carried |
| 2.3.7 (pp. 13-14) | "assign keywords that accurately describe your app, and don't try to pack any of your metadata with trademarked terms, popular app names, pricing information, or other irrelevant phrases just to game the system. App names must be limited to 30 characters. Metadata such as app names, subtitles, screenshots, and previews should not include prices ..." Subtitles "should not include inappropriate content, reference other apps, or make unverifiable product claims." | Title limit 30 is now Apple's text. A subtitle naming the Shortcuts app is a reference to another app (store-page S3, raised). "Free" stays out of name and subtitle | [recall]; my wording ("no competitor names") was narrower than Apple's |
| 2.3.10 (p. 14) | "don't include names, icons, or imagery of other mobile platforms or alternative app marketplaces in your app or metadata" | Page names no other platform; keep it so | not carried |
| 2.5.1 (pp. 17-18) | "Apps should use APIs and frameworks for their intended purposes and indicate that integration in their app description. For example, the HomeKit framework should provide home automation services" | **Duty:** the description names each framework integration (row 39) | [recall] |
| 2.5.2 (p. 18) | Apps "may not read or write data outside the designated container area, nor may they download, install, or execute code which introduces or changes features or functionality of the app, including other apps." Exception: "Educational apps ... may, in limited circumstances, download code provided that such code is not used for other purposes. Such apps must make the source code provided by the app completely viewable and editable by the user." | Unchanged reading (rows 6, 16, 37, 38). The "viewable and editable" sentence binds only the educational download exception; we keep to it anyway | [G2a-held], now confirmed word for word |
| 2.5.4 (p. 18) | "Multitasking apps may only use background services for their intended purposes: VoIP, audio playback, location, task completion, local notifications, etc." | Background refresh is not in the list; it rests on "etc." Row 23 stays Low-Medium | [snippet], confirmed |
| 2.5.11(i), (iii) (p. 19) | "(i) Apps integrating SiriKit and Shortcuts should only sign up for intents they can handle without the support of an additional app and that users would expect from the stated functionality." "(iii) Resolve the Siri request or Shortcut in the most direct way possible and do not insert ads or other marketing between the request and its fulfillment." | **Duty:** no offer inside a Shortcut run (row 40) | [recall] ("register only intents the app can handle"; (iii) was missing) |
| 2.5.16 (p. 20) | "Widgets, extensions, and notifications should be related to the content and functionality of your app." | Row 22 unchanged | [snippet], confirmed |
| 2.5.19 (p. 21) | "Don't include any hidden, dormant, or undocumented features in your app; your app's functionality should be clear to end users and App Review." | Rows 21, 36 unchanged | [snippet], confirmed |
| 3.1.1 (p. 22) | "you should make sure you have a restore mechanism for any restorable in-app purchases." | Row 32 unchanged; the user-tapped button is forum practice, not this text | [snippet], confirmed |
| 4.4 (pp. 35-36) | Extensions "should include some functionality, such as help screens and settings interfaces where possible. You should clearly and accurately disclose what extensions are made available in the app's marketing text, and the extensions may not include marketing, advertising, or in-app purchases." | **Duties:** the description names every extension (row 39); no offer, price or purchase inside one (row 40) | not carried |
| 5.1.1(i) (p. 42) | "All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app in an easily accessible manner." The policy must "Identify what data, if any, the app/service collects", confirm third-party protection, and "Explain its data retention/deletion policies and describe how a user can revoke consent and/or request deletion of the user's data." | **Duty:** both links, and a policy that answers all three (row 41) | [recall], substance right |
| 5.1.1(ii) (pp. 42-43) | "Apps that collect user or usage data must secure user consent ... Paid functionality must not be dependent on or require a user to grant access to this data." "Ensure your purpose strings clearly and completely describe your use of the data." | Row 42. The "this data" sentence follows "Apps that collect"; L6 s8 reads it as a v1 duty. I keep L6's reading (it can only make us safer) and flag the scope question there | [snippet] for purpose strings only |
| 5.1.1(iii) (p. 43) | "Where possible, use the out-of-process picker or a share sheet rather than requesting full access to protected resources" | The document picker for Install from file (row 37) and folders (row 6) | not carried |
| 5.1.1(iv) (p. 43) | "Where possible, provide alternative solutions for users who don't grant consent. For example, if a user declines to share Location, offer the ability to manually enter an address." | **Duty:** typed-place fallback where a premade needs location (row 43) | [recall] |
| 5.1.5 (p. 49) | "Use Location Services in your app only when it is directly relevant to the features and services provided by the app." "If your app uses Location Services, be sure to explain the purpose in your app" | Rows 17, 28 unchanged | [snippet] (2018 copy), confirmed |
| 5.2.1 (p. 49) | "Don't use protected third-party material such as trademarks ... in your app without permission, and don't include misleading, false, or copycat representations, names, or metadata" | Row 34; the PSF question (store-page F1) is still a person's | [recall] |

</div>


Not in the PDF, so still unverified: the 100-character keyword field, the 30-character subtitle, the 170-character promotional text, the 4,000-character description and notes fields (App Store Connect help, not the guidelines), and anything in the DPLA.

### 1c. Apple's text for the row tags raised on 2026-10-26 (T-0109)

Same PDF, same method as 1b; quotes taken from CORRECTIONS pass 3, section 3b (Q numbers there), each re-checked with tools/quote_check.py against the extracted text. 2.3.1(a), 2.5.11(i), 2.5.16 and 2.5.19 are already quoted in 1b.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 1c. Apple&#x27;s text for the row tags raised on 2026-10-26 (T-0109), scrolls sideways" style="--tw:641px" markdown="1">

| Guideline (page) | Apple's text | Rows |
|---|---|---|
| 2.1(b) (p. 11) | "If you offer in-app purchases in your app, make sure they are complete" ... "visible to the reviewer and functional. If any configured in-app purchase items cannot be found or reviewed in your app, explain the reason in your review notes." | 32 |
| 2.5.1 (p. 17) | "Apps may only use public APIs and must run on the currently shipping OS." | 1, 2, 4 |
| 2.5.2 (p. 18) | "Apps should be self-contained in their bundles" (the sentence 1b quotes from "may not read or write" on) | 1, 3, 4, 38; section 3 |
| 3.1.1 (p. 22) | "Apps may not use their own mechanisms to unlock content or functionality, such as license keys" | 32 |
| 4.2 (p. 33) | "Your app should include features, content, and UI that elevate it beyond a repackaged website." | 7 |
| 4.7 (p. 39) | "Apps may offer certain software that is not embedded in the binary, specifically HTML5 and JavaScript mini apps and mini games, streaming games, chatbots, and plug-ins." | section 3 |
| 4.7.2 (p. 39) | "Your app may not extend or expose native platform APIs or technologies to the software without prior permission from Apple." | 38 |
| 5.2.1 (p. 49) | "Don't use protected third-party material such as trademarks, copyrighted works, or patented ideas in your app without permission" | 3, 7 (the licence duty) |

</div>


## 2. The matrix: every v1 feature (ADR-001 3.1, as revised)

Risk: Low = precedent and clear text; Medium = precedent but text tight, silent or unread; High = text bars it without permission. "Evidence" names the precedent or our own measurement. "Status" is the source tag of the rule the row rests on.

### C1 Python runtime


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: C1 Python runtime, scrolls sideways" data-n="1" style="--tw:1923px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation (what must be true at submission) |
|---|---|---|---|---|---|---|
| 1 | Embedded CPython 3.15.1 and standard library, upstream iOS XCframework, pinned with checksum | 2.5.2 ("self-contained"), DPLA 3.3.1(B), 2.5.1 | 2.5.2 [primary] (1c, p. 18; was [G2a-held]+[snippet]); 3.3.1(B) [paraphrase]; 2.5.1 [primary] (1c, p. 17; was [recall]) | Pythonista, Pyto, a-Shell, Juno, Carnets ship an interpreter (L6 s3, L7). Interpreter is in the reviewed binary. | Low | Interpreter and stdlib inside the signed bundle; nothing fetched at runtime (fetch_python.sh runs at build time only). |
| 2 | **Bundle strip** (L12 s12 item 1): `_ctypes`, `ctypes`, `_ctypes_test`, `_test*`, `_xxtestfuzz`, `xx*`, `_remote_debugging` removed | 2.5.1, 2.3.1 (notes must be true), 2.5.19 | 2.5.1 [primary] (1c, p. 17); 2.3.1(a) [primary] (1b, p. 12); 2.5.19 [primary] (1b, p. 21) (all three were [recall]/[snippet]) | L12 s0: upstream `lib-dynload` ships 70 extension modules including `_ctypes` [build]. With `_ctypes` present, user code can call the Objective-C runtime and private API past the Swift bridge. L12 s0 item 3 [measured, n=1, macOS 3.9.6]: hiding a module from `import` is not removing it. | **High until the strip lands; Low after** | Board line "[ios] Idris, P1, v1 bundle strip" must be done, with its build-phase denylist check and the L12 escape tests green, **before** the notes say "no ctypes or Objective-C bridge". If the strip slips, the sentence comes out of the notes; it is never sent false. Idris's L12 Q2 (iOS loader behaves like the macOS test; matplotlib needs no `_ctypes`) is owed. |
| 3 | Bundled pure-Python packages (requests and its deps, jedi, pyflakes) | 2.5.2, 3.3.1(B), 5.2.1 (licences) | 2.5.2 [primary] (1c, p. 18; was [G2a-held]/[snippet]); 3.3.1(B) [paraphrase]; 5.2.1 [primary] (1c, p. 49: copyrighted works only with permission, so licences honoured; was [recall]) | Shipped in the binary, so not downloaded. Licences logged (ide-tooling.md; Acknowledgements screen line on the board). | Low | List them in the notes; Acknowledgements screen present (board line, Day 16). |
| 4 | Native packages numpy, Pillow, matplotlib (Agg), built here as cp315 wheels, only if the Day 10 gate passes | 2.5.2 ("self-contained"), 2.5.1 | 2.5.2 [primary] (1c, p. 18; was [G2a-held]/[snippet]); 2.5.1 [primary] (1c, p. 17; was [recall]) | L13 s1-s3: PEP 730 places binary modules as signed frameworks. Pyto shipped numpy and matplotlib (paid tier). | Low | Signed frameworks in the bundle; strip check (row 2) re-run on them; named in notes only if they ship. |
| 5 | Swift-Python bridge: run file or string, stdout/stderr, `input()`, stop, restart, tracebacks | 2.5.2 | as row 1 | Same as every Python IDE precedent. | Low | None beyond row 1. |

</div>


### C5 Python IDE, core


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: C5 Python IDE, core, scrolls sideways" data-n="1" style="--tw:1578px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 6 | Projects in the app container and a user-chosen Files or iCloud Drive folder (open in place); import and export `.py` and zip | 2.5.2, 3.3.1(B) | [G2a-held]/[snippet]/[paraphrase] | The user brings the file in, so the app downloads nothing (L6 s4 option e). Every general-code rival works this way (L6 s2). | Low-Medium | No "import from URL", no URL-scheme parameter that fetches code, no in-app browsing of anyone's code. Imported zips run only as Python source (a `.so` in a zip can't load: unsigned). Code from a file is shown in the editor before it runs. |
| 7 | Editor: highlighting, themes, iPhone key row, find/replace, line numbers, go-to-line, iPad keyboard shortcuts (Runestone, MIT, per ADR-004) | 4.2, 5.2.1 (licence) | 4.2 [primary] (1c, p. 33); 5.2.1 [primary] (1c, p. 49) (both were [recall]) | A full editor is well clear of minimum functionality. | Low | Runestone and Tree-sitter licences on the Acknowledgements screen. |
| 8 | Completion (jedi, in-process InterpreterEnvironment) and inline pyflakes errors | 2.5.2 | as row 1 | Odalys, ide-tooling.md: jedi's default environment spawns a process; in-process mode is the go. Nothing downloaded. | Low | jedi must not try to spawn (2.5.x: `subprocess` raises on iOS anyway, PEP 730). |
| 9 | Run console: `input()`, stop, restart, script arguments, run log, table output | 2.5.2 | as row 1 | Precedent. | Low | None. |
| 10 | Native UI from scripts: alerts, prompts, forms, lists, pickers, HUD | 2.5.1, 4.2 | [recall] | Juno and Pythonista ship native pickers and alerts (L7). | Low | Built on public UIKit/SwiftUI only. |
| 11 | Built-in docs, 10 example scripts, first-run tour | 2.5.2, 2.1 | [snippet]/[recall] | In the binary. Examples are our own (board line: nothing copied). | Low | Docs bundled, not loaded from a server of ours (also privacy-label condition 7). The reviewer's demo path starts here (notes). |
| 12 | iPhone and iPad universal; iPad sidebar and split; Dynamic Type, VoiceOver | 2.1, 2.4.1 (iPad) | [recall] | PROPOSAL-002 s2, s7. | Low | Reviewers test on iPad when the app claims it [recall]: run the demo path on an iPad Simulator before submission. |

</div>


### C2 device modules (Python reaches iOS only through our Swift bridge)


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: C2 device modules (Python reaches iOS only through our Swift bridge), scrolls sideways" data-n="1" style="--tw:1916px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 13 | clipboard | 5.1.1 | [recall] | Pasteboard read shows the system paste prompt (C2-device-api.md [M], unread). | Low | Read only when the user's script asks; no reading at launch. |
| 14 | files | 2.5.2 (container), 5.1.1 | [snippet]/[recall] | Container plus security-scoped user folders. | Low | No access outside the container except folders the user picked. |
| 15 | notifications (local only) | 4.5.4, 5.1.1 | [recall] | No push, no server. | Low | Permission at first use from a user's script, not at launch. |
| 16 | http (standard library and requests): the user's own code makes network requests | 2.5.2, 3.3.1(B), 5.1.1, 5.1.2 | [G2a-held]/[snippet]/[recall] | privacy-label.md s3: requests to hosts the user chose are not our collection [S1, press quote of Apple's 2021 definition]. **Residual:** user code can fetch a `.py` and `exec` it. That is the user's own act, as in Pythonista and Pyto; no API of ours fetches and runs code. | Medium (the 2026 enforcement climate, L6 s7) | Notes say plainly that user code may make network requests the user writes, and that the app never fetches code of its own. No "run from URL" helper in our modules. NSLocalNetworkUsageDescription purpose string (C2 board line). |
| 17 | location (When In Use) | 5.1.1(ii), 5.1.5, 5.1.1(iv) | [primary] (s1b, 23:52; was [snippet]/[recall]) | C2-device-api.md s1.4 drafts. Forum rejections (5.1.5) where the app failed with location off. | Low-Medium | Purpose string names the use concretely ("Lets your scripts and the Distance widget read where you are when you run them"), not "To use location". The app is fully usable with location refused; the distance premade shows a clear "location off" state. No Always prompt in v1 (ADR-001 Revised). Typed-place fallback: row 43. |
| 18 | motion history (CMPedometer steps, floors, distance) | 5.1.1(ii), 5.1.1(iv), 5.1.3 (health) | (ii) [snippet]; others [recall] | Steps are motion data, not HealthKit; 5.1.3 is about HealthKit/health research [recall]. | Low-Medium | NSMotionUsageDescription concrete; the steps premade degrades when refused. No HealthKit in v1 (ADR-001 3.1). |
| 19 | keychain (the user's own secrets) | 5.1.1 | [recall] | L12 s5.3: ThisDeviceOnly, per-script names, console redaction. | Low | None for review; it is the user's data on the device. |

</div>


### C7 Shortcuts


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: C7 Shortcuts, scrolls sideways" data-n="1" style="--tw:1828px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 20 | App Intents: Run Script, Run Script with Input (returns output), Refresh Widgets; AppShortcutsProvider. They run in the main app process, not an App Intents extension (L9 s2), so they are a framework integration (2.5.1), not a 4.4 extension | 2.5.11(i), (iii), 2.5.1, 2.5.2 | [primary] (s1b, 23:52; was [recall]) | Pythonista, Pyto, Scriptable, Juno ship Shortcuts actions (L6 s3, L7). | Low; **Medium if an intent accepts code text** | The intents name a script **from the user's library**; the "Input" is data, never source to execute. A "run this code string" intent would let a Shortcut pass in code from anywhere: leave it out of v1. L9 s2 answers it (`ScriptEntity`, input as data); row 38 carries the rule and its tests. No offer, price or purchase screen between the request and its result (2.5.11(iii)): row 40. |
| 21 | Control Center "Run Script" control (PROPOSAL-002 s2: stretch, Day 12, else 1.1) | 2.5.16, 2.5.19, 4.4 | [primary] (s1b, 23:52) | Runs the same intent as row 20. A control is a WidgetKit control widget, so it ships inside the widget extension [recall: SDK placement unverified by me; Idris confirms] and the 4.4 duties reach it. | Low | If it misses Day 12 it is compiled out, not hidden (2.5.19). Notes and store text mention it only if it ships (G4); the store text names it as part of the extension (row 39). No offer in it (row 40). |

</div>


### C4 widget engine (behind the Day 14 cut line, ADR-001 3.3)


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: C4 widget engine (behind the Day 14 cut line, ADR-001 3.3), scrolls sideways" data-n="1" style="--tw:1564px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 22 | Python view DSL, versioned JSON view tree, one SwiftUI renderer in the widget extension; families small/medium/large, accessory circular/rectangular/inline, systemExtraLarge on iPad; full-color, accented, vibrant | 2.5.2, 2.5.16, 4.4 | [primary] (s1b, 23:52; was [G2a-held]/[snippet]) | The extension draws data (a view tree), runs no code (ADR-001 3.1 option b). Widgets show the user's own script output, which is the app's function, so 2.5.16 is met. | Low | Renderer validates the schema, <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> sizes, allows only `pywidget://` links (L12 s12 item 5). 4.4: the extension is disclosed in the store text (row 39) and shows no marketing, advertising or purchase (row 40). 4.4's "help screens and settings interfaces where possible": the widget's edit sheet (pick a script) is the settings interface; help lives in the app [my reading]. |
| 23 | Widget runs happen in the main app (foreground, background refresh, Refresh Widgets intent) | 2.5.4 | [snippet] | DTS: background capability without a related feature risks rejection. Ours has one (refreshing widgets). | Low-Medium | Declare only the background mode we use (BGAppRefresh / background fetch); no audio or location background modes as a keep-alive. Notes say why the app refreshes in the background. |
| 24 | Widget debugging (PROPOSAL-002 s5): Activity screen, "Run as widget", four error states, export by share sheet only (proposed, plan line on the board) | 5.1.1, 2.5.19 | 5.1.1 [recall]; 2.5.19 [primary] (1b, p. 21; was [snippet]) | Logs stay in the App Group, 14 days, never sent. Share sheet is the system's, user-tapped. | Low | None; mention "Activity" in the demo path if it ships. |

</div>


### C11 premade library (12, in the binary; 5 free, 7 Pro as the build default by the state-spec chair ruling 2026-10-26 00:05 (Ines, b8b4f0e4), was PROPOSAL-002's 3 free, 9 Pro; the split is the Investors' to confirm)


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: C11 premade library (12, in the binary; 5 free, 7 Pro as the build default by…, scrolls sideways" data-n="1" style="--tw:1478px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 25 | 12 first-party widgets in our DSL, source viewable and editable | 2.5.2, 2.5.19, 2.3.1 | [G2a-held]/[snippet] | Compiled into the binary and reviewed: features of the app (L6 s3). New premades come only in app updates. | Low | No premade downloaded later. Locked Pro premades are visible (live preview) and named in the store text (PROPOSAL-002 s6), so nothing is hidden. |
| 26 | Time and countdowns, world clocks, day progress, habit tracker, Storage (was battery and storage; ADR-001 chair ruling, Ines, 2026-10-25 21:16 (09dc55c8)), Shortcuts launcher | 5.1.1 (required-reason APIs) | [recall] | Disk space and boot time are required-reason APIs (privacy-label.md s4). | Low | Privacy manifest entries (board line, Idris P2). |
| 27 | Sunrise and sunset (local computation, H249 engine) | none special | n/a | L16: computed on the device, no outside source. | Low | Location fallback: a city the user types. |
| 28 | Steps and floors; distance to a saved place; altitude | 5.1.1(ii), 5.1.5 | [snippet] | Rows 17-18. Under When In Use a widget gets a fix only if one was seen in the last few minutes (ADR-001 Revised, CORRECTIONS). | Low-Medium | Widget shows `sampled_at`; refused permission shows a plain state, not a broken card. Rows 42 and 43 (typed place). All three are free (state-spec chair ruling 2026-10-26 00:05, Ines, b8b4f0e4: 5 free / 7 Pro, no Pro premade needs a permission grant); PROPOSAL-002 s6 had distance and altitude in Pro. *(Note 2026-10-26 00:14 ET, Wrenna, T-0102.)* |
| 29 | Quote of the day from a bundled public-domain list | 5.2.1 | [recall] | L16: bundled, public domain by rule. | Low | Source list and licence note kept (L16). |
| 30 | GitHub repository status (GitHub REST API, optional user token in the Keychain) | 5.2.2, 5.2.1, 5.1.1 | [recall] | L16: GitHub terms read through terms_guard, commercial use allowed. privacy-label.md condition 4: token and IP go to GitHub, never to us; a reviewer could still see a first-party feature calling a named outside service differently (low-medium, on the person-read list). | Low-Medium | Works unauthenticated (public repos); token optional; GitHub name used only to describe the data source, no GitHub logo (5.2.1). Notes say no GitHub account is needed for review. |
| 31 | Weather: an example recipe (the user's own Shortcut with Apple Weather feeding Run Script with Input), not a premade | 5.2.2, 2.3.1 | [recall] | ADR-001 Revised, L16. | Low | Store text must not promise a weather widget; call it a recipe. |

</div>


### C12 billing


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: C12 billing, scrolls sideways" data-n="1" style="--tw:1960px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 32 | "Pro", one StoreKit 2 non-consumable; contents fixed by build setting, never a remote switch | 3.1.1, 2.1, 2.3.1, 2.3.2, 2.5.19, 4.4, 2.5.11(iii) | [primary] (s1b, 23:52); IAP visibility is 2.1(b) [primary] (1c, p. 11; was 2.1 [paraphrase]) | No server, no licence keys (3.1.1 bars "their own mechanisms to unlock content or functionality, such as license keys" [primary], 1c, p. 22; was [snippet, L6]). | Low-Medium (until App Store Connect exists, the product can't be reviewed at all) | A user-tapped **Restore Purchases** button (not restore-on-launch only). The IAP is submitted with the build and is reachable from a named screen in the notes. Pro contents in the store text match the build. Needs the membership (Day 7) and the Paid Apps Agreement (Day 12) per the 2026-10-22 amendment. Price and contents are the Investors' (PROPOSAL-001). The purchase is offered only in the app, never in the widget extension or a Shortcut run (row 40); the store text says which named items need it (2.3.2, row 44). |

</div>


### C13 design system and store presence


<div class="tbl" role="region" tabindex="0" aria-label="Table 12: C13 design system and store presence, scrolls sideways" data-n="1" style="--tw:1916px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 33 | Themes, icon, screenshots (all code-drawn, Commandment 9) | 2.3.3 (screenshots show the app in use), 4.1 | [recall] | Maren's v0 (c1edf839). | Low | Screenshots taken from the real app in the Simulator, not mockups. |
| 34 | App name, subtitle, keywords ("Python" as a word) | 2.3.7, 2.3.10, 5.2.1 | [primary] (s1b, 23:52; was [recall]) | names.md: PSF trademark policy (python.org/psf/trademarks, read 2026-10-25) refuses "Python IDE" as a product name; nominative subtitle use allowed. | Medium until the name is chosen; **subtitle S3 Medium-High** (23:52) | No competitor names (Pythonista, Pyto, Scriptable, Juno) in name, subtitle or keywords. "Python" only nominatively in the subtitle or description. Name is the Investors' call. 2.3.7's text is wider than my recall: keywords must "accurately describe your app", metadata must not be packed with "trademarked terms", and a subtitle must not "reference other apps". Store-page S3 ("Scripts, widgets and Shortcuts") names Apple's Shortcuts app in a subtitle: raised, held, never the default (store-page F5). The keyword term `shortcuts` is a description of a feature, kept, but it is the same question for a person. |

</div>


### Privacy and release discipline


<div class="tbl" role="region" tabindex="0" aria-label="Table 13: Privacy and release discipline, scrolls sideways" data-n="1" style="--tw:1802px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 35 | No account, no server, no analytics, no tracking; label "Data Not Collected"; privacy manifest | 5.1.1, 5.1.1(i), 5.1.2 | 5.1.1(i) [primary] (s1b, 23:52; was [recall]); "collect" definition [snippet of a 2021 press quote, privacy-label.md S1] | privacy-label.md: 8 build conditions. | Low if the conditions hold | No SDK at all; privacy policy URL in App Store Connect and in Settings: row 41; PrivacyInfo.xcprivacy with required-reason codes (person read owed). |
| 36 | Unreleased capabilities (online pip, marketplace, sync, iMessage) **compiled out** of release builds | 2.5.19, 2.3.1, 2.5.2 | [snippet] | ADR-001 Revised; L13 s4 verdict; L10 s4. | Low if compiled out; **High if any sits behind a flag** | A release-build check that the debug-only targets are absent (Idris/Odalys). The notes say there are no hidden, dormant or server-enabled features, which must be literally true. |

</div>


### Rows added for ADR-006 (2026-10-25 20:01)


<div class="tbl" role="region" tabindex="0" aria-label="Table 14: Rows added for ADR-006 (2026-10-25 20:01), scrolls sideways" data-n="1" style="--tw:1960px" markdown="1">

| # | Feature | Guidelines | Status | Evidence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| 37 | **Install from file** (ADR-006 s3 item 2; v1 stretch, Odalys's board line, due Day 13, 2026-11-03): the user picks a `py3-none-any` or `py2.py3-none-any` wheel, or a pure-Python zip, from Files or iCloud Drive; the installer refuses any archive with `.so`, `.dylib`, `.dll`, Mach-O magic or a platform tag; files land in a user site-packages folder after the bundled set (bundled wins); no network | 2.5.2, 4.7, 5.1.1(iii), DPLA 3.3.1(B), 2.5.19, 2.3.1 | [primary] (s1b, 23:52) for 2.5.2, 5.1.1(iii), 2.5.19, 2.3.1; 4.7 and the Mini Apps definition [primary, L6 s1 and s3 row 5, Idris]; 3.3.1(B) [paraphrase], still unread | The guideline text the rating rests on: 2.5.2, apps "may not download, install, or execute code which introduces or changes features or functionality of the app" [G2a-held, L6 s1]. The app downloads nothing: the user brings the file, which is row 6's case (L6 s4 option e; L13 s4 rates it Low). What it installs changes what the user's own scripts can import, not what the app does. DPLA 3.3.1(B) speaks to downloaded code and storefronts [paraphrase]; there is neither. Precedent: Pyto and a-Shell are said to ship pure-Python pip (L13 s4, unverified; store pages barred, #53); I found no precedent read for a file-only installer, n = 0. Residual: the word "install" sits in 2.5.2's text and would sit in our UI, and the 2026 climate is stricter for code-running apps (L6 s7). | **Low-Medium. Stays in v1** if it lands by Day 13 with host tests (ADR-006 s3 item 2 (a) and (b)). One step above Low for the residual named in Evidence. **G2a done (Idris, df971700, L6 s3 row 5): Low-Medium, not raised**, for the same residual ("install" in 2.5.2; the Mini Apps page counts "software packages ... added after app installation"). Not 4.7: the app offers no software. G2b (DPLA 3.3.1(B)) can still raise it; at Medium it moves to 1.1 with no further ruling. **Ruled 2026-10-26 00:04 (Ines, ADR-006 s11):** ADR-006 s10 did not move item 2. Still a v1 stretch; condition (b) is met by this row's Low-Medium; condition (a) (Day 13, host tests) is open; all eight conditions below are adopted as build conditions; G2b raising this row to Medium moves it to 1.1 with no further ruling. | (1) No network anywhere in the installer: no index lookup, no URL field, no dependency fetch; a wheel with missing dependencies gets a plain message naming them, never a download. (2) Refuse or drop `.pyc` files and `__pycache__` folders in the archive, so every executable file installed is readable source that opens in the editor (2.5.2's "completely viewable and editable by the user" [primary, p. 18]; strictly it binds the educational download exception, and we keep it anyway). (3) Add the folder to `sys.path` directly, not as a site directory (`site.addsitedir`), so no `.pth` line runs code at every launch from a file the user never opened (a hidden code path, 2.5.19). (4) A wheel that imports `ctypes` must fail with ImportError after G1; the installer never adds an extension module. (5) The notes name it in one sentence (G10 bracket); if it slips, the "No package installer" sentence stays instead. (6) G8 confirms the online-pip target is absent from the same build. (7) The file comes in only through the system document picker, the "out-of-process picker" of 5.1.1(iii) [primary, p. 43]; no broad file access is asked. (8) The UI label is "Add a package from Files" (L6 s3 row 5), and the store text says "pure-Python", "you pick in Files" and "no online installer" (store-page G10 bullet). These are L6 s8's conditions: user-picked through the document picker, pure-Python only, nothing fetched from a URL, every file opens in the editor, named in the review notes: (7), (4), (1), (2), (5). Items (1)-(4) and (7) are for Odalys's tests. |
| 38 | **Inputs from outside a user's tap are never code**: Shortcuts intent parameters (L9 s2: Run Script, Run Script with Input, Set Widget Data), `pywidget://` links, x-callback URLs | 2.5.2, DPLA 3.3.1(B), 2.5.11, 4.7.2 | 2.5.2 [primary] (1b, p. 18; was [G2a-held]+[snippet]); 3.3.1(B) [paraphrase]; 2.5.11(i) [primary] (1b, p. 19; was [recall]); 4.7.2 [primary] (1c, p. 39; was [snippet]) | My 19:57 note in row 20, carried as its own row so it gets a test. L9 s2 types the script as `ScriptEntity` (a stable id in the user's library) and passes arguments, text and files to that script; L9's test (4) refuses an inbound x-callback URL carrying code. An intent or link that took code text would let any Shortcut, or a Shortcut file someone shared, run code the user never opened: downloaded code by another door. | Low while the rule holds; **High if any input is executed as source** | Rule: no intent parameter, URL query or widget link is ever compiled, `exec`'d or saved as a script by the app; the app runs only a script already in the user's library. Inputs arrive as `sys.argv`, `shortcuts.input()` text or files in the script's temp folder; what the user's own script does with them is the user's code (row 16). Tests (Idris, with L9's list): (a) no App Intent parameter takes or is described as code; (b) L9 test (4), the x-callback refusal; (c) a `pywidget://` link with a code-like query runs nothing and creates no file. Notes sentence: "They run a script from the user's library; the input is data passed to that script, not code." |

</div>


### Rows added for the L6 s8 duties (T-0061, 2026-10-25 23:52)

L6 s8 (Idris, df971700) lists the v1 duties the primary read adds, "none of them scope". Each gets a row so it gets an owner and a check. Text: section 1b.


<div class="tbl" role="region" tabindex="0" aria-label="Table 15: Rows added for the L6 s8 duties (T-0061, 2026-10-25 23:52), scrolls sideways" data-n="1" style="--tw:1592px" markdown="1">

| # | Duty | Guidelines | Status | Evidence | Risk | What must be true at submission (owner) |
|---|---|---|---|---|---|---|
| 39 | **The description names every extension and every framework integration** | 4.4, 2.5.1 | [primary] | 4.4: "clearly and accurately disclose what extensions are made available in the app's marketing text" (p. 36). 2.5.1: apps "indicate that integration in their app description" (p. 18). v1 has **one app extension**: the widget extension (WidgetKit), which draws the user's widgets and, only if G4 passes, holds the Control Center control (row 21). The Shortcuts actions are App Intents running in the main app (L9 s2), so they fall under 2.5.1, not 4.4; the page names them anyway. Framework integrations a reviewer can see: WidgetKit (Home Screen, Lock Screen, StandBy), App Intents (Shortcuts), Core Location (When In Use), Core Motion (pedometer), local notifications, Keychain, the Files document picker and iCloud Drive, StoreKit (the Pro purchase). My reading of 2.5.1's HomeKit example: name the service in plain words, and give Apple's framework name in brackets where a reviewer would look for it (WidgetKit, App Intents, Core Location, Core Motion). | Low; **Medium if the description says less than the build** (an undisclosed extension is also a 2.5.19 question) | Store page s6 "ON iOS" paragraph, gated G4 and G5 so it never names an extension the build lacks (Wrenna). Idris confirms the build's extension list against it at G8 (target list, not memory). **The share extension: 1.1, ruled 2026-10-26 00:04 (Ines, ADR-001 chair ruling).** 3.2 stands; v1 has one app extension; T-0032's probe stub stays in a debug scheme and G8 confirms it is absent from the release target list. As found: ADR-001 3.2 puts "Share sheet / Action extension" in 1.1 (CORRECTIONS U1-24, and Idris's own 19:26 row: an extension cannot hand off to the app by itself). L6 s3's share extension row ("Ship, handing off to the app when memory runs short") and s8 (df971700), and the T-0061 board line, still name it. Two docs disagree on scope, which is Ines's to settle, not mine. Until she does, the page and notes stay silent on it (2.3.1: they match ADR-001). If she rules it into v1, the s6 paragraph gains one gated sentence, held ready in store-page s6a. |
| 40 | **No offer inside a Shortcut run or an extension** | 2.5.11(iii), 4.4, 3.1.1 | [primary] | 2.5.11(iii): "do not insert ads or other marketing between the request and its fulfillment" (p. 19). 4.4: extensions "may not include marketing, advertising, or in-app purchases" (p. 36). The places Pro can meet a non-buyer outside the app: (a) a Shortcut runs a Pro premade's script, or Refresh Widgets reaches one, after a refund or on a second device before restore; (b) a Pro premade already on the Home Screen when the entitlement is lost (ADR-007 s7.1 row 2, the Pro card, `entitlement_lost`); (c) the system widget gallery and the widget's edit sheet, which are the extension's own UI (ADR-007's picker query already lists Pro premades only with the entitlement, chair ruling item 2); (d) the Control Center control (G4). | Low while the rule holds; **Medium-High if any of (a)-(d) shows a price, a purchase sheet or a sales word** (4.4 says "may not") | (a) The intent ends with a plain error that states the fact ("This script is part of Pro.") and nothing else: no price, no "Upgrade", "Buy" or "Unlock", no purchase sheet, no link that opens the paywall (Idris, L9 intents). (b)-(c) The Pro card already shows no price, sales word or purchase (state-spec s3.2; its citation should be 4.4, CORRECTIONS P5); a tap opens the app at that widget, not at a purchase screen [my reading: a tap that lands on a purchase sheet is a purchase reached from the extension] (Idris, Maren). (d) same as (a). Test: a string scan of the widget extension target and the intent error strings for price formats and the words upgrade, buy, unlock, purchase, subscribe, offer, sale, trial, returning zero hits (Odalys, a G8 sibling). The store text never says a purchase can be made from a widget or a shortcut (store page s7). |
| 41 | **Privacy policy link in the app and in the metadata** | 5.1.1(i), 2.1(a) | [primary] | 5.1.1(i): "a link to their privacy policy in the App Store Connect metadata field and within the app in an easily accessible manner" (p. 42). 2.1(a): "fully functional URLs included; placeholder text, empty websites ... should be scrubbed" (p. 11). The policy must identify data collected, confirm third-party protection, and explain retention, deletion and how to revoke consent: privacy-policy-draft.md covers all three in substance (sections on what stays on the device, the GitHub widget, purchases, "Selling and sharing", your rights), with the support-mail retention period still a placeholder (its P3). | Low once live; **blocks submission until a public URL exists** | (1) Settings > Privacy Policy, one tap from the main screen's Settings, opens the policy at its public URL (Idris; Maren places the row). (2) The same URL in App Store Connect's Privacy Policy URL field (a person, at paste; store page s1). (3) The policy is approved and published by the Investors: legal name, support contact, retention period (P3), and the host (P5; publishing is a human checkpoint). Gate **G11**. |
| 42 | **No Pro feature needs a permission grant** | 5.1.1(ii) | [primary] | Text: "Apps that collect user or usage data must secure user consent ... Paid functionality must not be dependent on or require a user to grant access to this data" (pp. 42-43). L6 s8 reads it as a v1 duty. **Scope note:** "this data" follows "Apps that collect"; our label is Data Not Collected, so on the words alone the sentence may not reach us. I keep L6's reading because it only makes us safer, and flag the scope for a person. **Conflict found:** PROPOSAL-002 s6 makes steps and floors free (Motion), but puts **distance to a saved place** (location) and **altitude** in Pro. Distance cannot work without location; altitude needs location or the altimeter [recall: whether CMAltimeter's relative altitude asks for Motion permission is unverified by me]. Option 3 IDE features (PROPOSAL-001) need no permission. | Low for the IDE; **Medium for the two premades** under L6's reading | Not decided here (pricing is the Investors', scope is Ines's). Three ways out, for Ines and the Investors: (a) a person reads the scope and says "this data" is collected data only, and nothing changes; (b) swap distance and altitude into the free set and move two permission-free premades (for example world clocks and day progress) into Pro; (c) keep them in Pro with a working permission-free mode (row 43 shows that is not possible for these two). The store text carries no Pro split until G6 settles it (store page G6). **Ruled 2026-10-26 00:05 (Ines, state-spec chair ruling): way out (b).** Distance and altitude move to free (5 free, 7 Pro as the build default); no Pro premade, module or feature may need a permission grant; (a) rejected because the same paragraph's purpose-string sentence binds every prompt, (c) because row 43 shows no working permission-free mode. The split is the Investors' to confirm (ops/questions.md item 10). |
| 43 | **Typed-place fallback where a premade needs location and it is declined, where possible** | 5.1.1(iv), 5.1.5 | [primary] | 5.1.1(iv): "if a user declines to share Location, offer the ability to manually enter an address" and "must respect the user's permission settings and not attempt to manipulate, trick, or force people to consent" (p. 43). Location premades: sunrise and sunset (a typed city already planned, row 27), distance to a saved place, altitude. The `location` module for users' own scripts. | Low | Sunrise and sunset: a typed place works with no permission (row 27). Distance and altitude: no typed fallback can give "where you are now", so "where possible" ends at a plain "Location is off" state that says how to turn it on in Settings, once, with no repeated prompt and no nag (Idris, Maren). The saved place itself is typed, not picked from the current position only. `location` module docs show a script catching the refusal and asking for a typed place (Odalys's docs line). |
| 44 | **The store text says which named items need Pro** | 2.3.2, 2.3.7 | [primary] | 2.3.2: the description, screenshots and previews must "clearly indicate whether any featured items ... require additional purchases" (pp. 12-13). The description lists all 12 premades by name; the G6 sentence names the 5 free ones (time and countdowns, sunrise and sunset, steps and floors, distance to a saved place, altitude) and says the rest come with Pro, so all 7 Pro premades are marked and none of them needs a permission (row 42, ruling 2026-10-26 00:05, b8b4f0e4). 2.3.7: no prices in "app names, subtitles, screenshots, and previews" (p. 14). | Low if the split is stated; **Medium if the page lists Pro premades without saying so** | Store page s6: the G6 sentence that names the free premades is **required**, not optional, whenever any listed premade is Pro; if the Investors' answer puts no premade in Pro, it is deleted. Screenshots that show a Pro premade carry a "Pro" mark (Maren). No price in the title, subtitle or screenshots (store-page F4). *(Note 2026-10-26 00:14 ET, Wrenna, T-0102: split now 5 free / 7 Pro per the state-spec chair ruling, b8b4f0e4; store page s6 G6 sentence updated in f6bbb744.)* |

</div>


## 2a. The S0 claims, each mapped to the notes sentence that states it (ADR-006 s2)

ADR-006 makes the notes themselves the S0 gate. Each claim below has one sentence in review-notes-draft.md that states it, one thing in the build that makes it true, and the gate that proves it. A claim whose gate fails loses its sentence or stops the submission; it is never softened.


<div class="tbl" role="region" tabindex="0" aria-label="Table 16: 2a. The S0 claims, each mapped to the notes sentence that states it (ADR-006 s2), scrolls sideways" style="--tw:1364px" markdown="1">

| S0 claim | The sentence in the notes (quoted from the draft) | Made true by | Gate | If the gate fails |
|---|---|---|---|---|
| A. No gallery, store or feed of anyone else's code in the app | HOW CODE RUNS: "There is no store, sharing or import-from-URL of other people's code; the only in-app gallery shows our own premade widgets, compiled into this build." Backed by: "The app does not download, install or execute code from our servers or from other users." | No marketplace target in the release build (row 36); no import-from-URL (row 6); no input is ever code (row 38) | G8 | Do not submit. This sentence is the S0 gate itself |
| B. The 12 first-party premades are compiled into the binary (the "Official" <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>) | HOW CODE RUNS: "(2) the example scripts and premade widgets compiled into this build"; the gallery clause in A; WIDGETS: "Twelve premade widgets ship in the build." | Premades in the bundle, none fetched later (row 25) | G5 | If widgets are cut, every premade mention goes with them: the WIDGETS section, the words "and premade widgets" in (2) and in "including our examples and premade widgets", and the gallery clause in A (the A sentence then ends at "other people's code.") |
| C. Marketplace code paths compiled out of release builds, never dormant behind a flag | NO HIDDEN FEATURES: "There are no hidden, dormant or server-enabled features." and "the build contains no code paths for features that are not described here." | The release-build check that the marketplace, online-pip, sync and iMessage targets are absent (row 36) | G8 | Do not submit |
| D. Online pip compiled out | RUNTIME, one of two: "[G10 not shipped] No package installer is included in this version." or "[G10 shipped] Packages can be added only from a pure-Python wheel or zip the user picks in Files. Native code is refused, files stay viewable source, and there is no online installer." Plus the C sentences | Row 36 check; row 37 mitigations (1) and (6) | G8, G10 | G8 fails: do not submit. G10 fails: the "No package installer" sentence stays |
| E. No ctypes after the strip | RUNTIME: "[G1: Python reaches iOS features only through a fixed set of Swift functions we wrote on public APIs. The ctypes module and the Objective-C runtime bridge are removed from the build, so scripts cannot call native APIs directly.]" | Idris's bundle strip, its denylist build check, the L12 escape tests (row 2) | G1 | Delete both G1 sentences |
| F. Projects and widgets export as readable `.py` or zip (ADR-001 3.1 C5) | None, on purpose. Export is the user sending their own work out through the system share sheet; it is visible in the UI and claims nothing about code coming in. Costs about 80 characters if Ines wants it named | Share sheet only (row 24) | none | n/a |

</div>



## 2b. Not in v1, and why the notes must not mention them (2.3.1: notes match the build)

- **Share extension "Run Python on this"**: ADR-001 3.2 moves it to 1.1. L6's draft notes (section 5) still named it; the new draft drops it. L6 s3 and s7 listed it as a v1 "Ship" extension (s8, the verdict, does not name it). **Ruled 2026-10-26 00:04 (Ines, ADR-001): it stays in 1.1, so the drop stands;** the ready sentence is held for 1.1 in store-page s6a.
- ~~"Install from file" for pure-Python packages~~: answered by ADR-006 s3 item 2 (Ines, 19:57), which supersedes ADR-001 3.2's "1.2". It is now a v1 stretch: row 37, Low-Medium, in v1 if it lands by Day 13; the notes carry it only through the G10 bracket.
- **Online pip from PyPI**: 1.1 at the earliest (ADR-006 s3 item 3), compiled out (row 36). The notes say there is no online installer. *(Note 2026-10-26 00:12 ET, Ines: ADR-006 s12 now governs; s3 item 3 was superseded by s10. Online pip is on the 1.1 plan only if the DPLA 3.3.1(B) read (T-0060) shows nothing barring it. v1 unchanged: compiled out, and the notes keep "no online installer".)*
- Debugger, formatter, HealthKit and the other modules, interactive widgets, Builder, web IDE, marketplace, Shortcut Lab, iMessage, compatibility modules: ADR-001 3.2.

## 2c. Submission items that are not guideline rows (person or Investor)

- **Age rating questionnaire** (2025 scale, 13+/16+/18+): it asks about unrestricted web access. Sources disagree on whether an in-app browser lands at 16+ or 18+ [snippet]. We have no browser, but user code can fetch any URL. How Pythonista, Pyto and Juno answered is unread (store pages barred, #53). Owed: a person's read of the questionnaire text.
- **Export compliance**: CPython bundles its own OpenSSL (`_ssl`) rather than only the OS's TLS. The answer to the encryption question needs a person's read [recall: standard algorithms are usually exempt, but the form must be answered truthfully].
- **Contacting App Review, submitting, and replying to a rejection** are human checkpoints (L6 s5).
- **Privacy Policy URL** (App Store Connect field; 5.1.1(i) [primary]) and **Support URL** (required field [recall], not in the guidelines PDF): both need a public page the Investors approve and publish (row 41, G11). 2.1(a) rejects "empty websites" [primary], so a placeholder page does not count.
- **Apple question draft:** the third question (PyPI packages under 2.5.2) was added by T-0086 (1f21be73), so this is no longer a T-0059 TODO. If Ines's ruling disagrees with L6 s8 finding item 3, that question is the one to revisit.

## 3. The L12 bundle-strip caveat and L12 Q4 (folded in from board line "[research] Wrenna, P2, L6 review note")

**(a) "No raw Objective-C or ctypes bridge" is true only after the strip.** Answered: matrix row 2. The sentence appears in the draft notes in brackets with a gate: it is pasted only when the Idris strip line is done, its denylist build check passes, and the L12 escape tests (`import ctypes` raises ImportError; no `_ctypes*` file in the built bundle; no `_test*` importable) are green on the release build. If any fails, the sentence is deleted, not softened. The same gate covers the "Python reaches iOS only through our Swift functions" sentence, which is just as false with `_ctypes` present.

**(b) L12 Q4, part 1: is a Builder document "downloaded code" under 2.5.2 and DPLA 3.3.1(B)?** Not a v1 question (Builder is 1.2, the marketplace Phase 4), so this is a reading for later, and it stays **open**.
- My reading: a document of blocks drawn from our fixed block set, compiled on the device into Python by our compiler, is closer to data than to code. The nearest precedent is Widgy's Explore shelf of user-made JSON layouts shared in the app (L6 s2, from listing text via search). It does not download or execute code "which introduces or changes features or functionality of the app" (2.5.2 [primary], p. 18; the words were *introduce or change* here until 2026-10-26, CORRECTIONS U3-09; tag was [G2a-held]), because every possible behaviour is already in the reviewed binary.
- Why it is not settled: (1) the compiler's output *is* Python that runs, and a reviewer may look at the output, not the input; (2) 3.3.1(B) speaks of a "store or storefront for other code or apps" [paraphrase], and a gallery of documents that compile to code may read as one; (3) 4.7 lists the software kinds it allows ("specifically HTML5 and JavaScript mini apps and mini games, streaming games, chatbots, and plug-ins", [primary], p. 39; was [snippet]), and *Builder documents* are not among them; (4) no rival precedent ships user-made documents that compile to a general-purpose language. Risk for the Phase 4 marketplace: Medium, below Python items (High) but not Low.
- What would settle it: the person read of 2.5.2, 3.3.1(B) and 4.7, and, if the Investors choose, the question put to Apple with the 4.7.2 ask (L6 s4 option d, a human checkpoint).

**(c) L12 Q4, part 2: Apple's definition of "collect".** Answered as far as the ruling allows, in privacy-label.md section 1 and section 3 [S1]: collect means transmitting data off the device so that "you and/or your third-party partners" can access it for longer than it takes to service the request. Source: a 2021 press quote of Apple's App Privacy Details page, not Apple's page (G2a). Consequence for v1: requests the user's own code sends to hosts the user picked are not our collection. Still **open**: the current wording and any text on user-written code. That is the [needs-person] #59 follow-up line. L12 s11's "Not a CORRECTIONS row until Wrenna reads Apple's page" still holds: no correction is filed, because the read is still a press quote.

## 4. Gates before the notes are pasted (in order)


<div class="tbl" role="region" tabindex="0" aria-label="Table 17: 4. Gates before the notes are pasted (in order), scrolls sideways" style="--tw:958px" markdown="1">

| Gate | Owner | Changes in the notes if it fails |
|---|---|---|
| G1 Bundle strip done, denylist check and escape tests green (row 2) | Idris | Delete the ctypes sentence and the "only through our Swift functions" sentence |
| G2a Person's browser read of the guidelines: **done** (#59 A PDF, Idris df971700 and this pass, 23:52). Row 37 held at Low-Medium; row 34 and store-page S3 raised | Operator / Investors | Done; no notes sentence changed by it |
| G2b Person's read of DPLA 3.3.1(B), App Privacy Details, the required-reason page, the age-rating questionnaire, export compliance, and the App Store Connect field limits | Operator / Investors | Re-rate rows; a rating may only rise |
| G3 Day 10 native packages gate (row 4) | Idris/Odalys | Drop numpy/Pillow/matplotlib from the package list |
| G4 Day 12 Control Center stretch (row 21) | Idris | Drop the control sentence |
| G5 Day 14 widget cut line (ADR-001 3.3) | Ines | Drop the widgets paragraph; Pro contents change (PROPOSAL-001) |
| G6 Pro contents and price answered (PROPOSAL-001/002) | Investors | Fill the Pro paragraph |
| G7 App Store Connect product exists (needs membership Day 7, Paid Apps Agreement Day 12) | Investors | No Pro review possible; submit without IAP or wait |
| G8 Release-build check that unreleased targets are absent (row 36) | Idris/Odalys | Do not submit |
| G9 Purpose strings final and concrete (rows 15-18) | Maren copy, Idris | Fix before submitting (5.1.1(ii)) |
| G10 Install from file landed by Day 13 with host tests green, and row 37 still Low-Medium or lower after G2b (ADR-006 s3 item 2) | Odalys (tests), Wrenna (rating) | Keep "No package installer is included in this version." and delete the install sentence |
| G11 Privacy policy approved and live at a public URL; Settings > Privacy Policy opens it (row 41) | Investors (text, host), Idris (in-app row) | Do not submit (5.1.1(i), 2.1(a)) |
| G12 Ines's T-0059 ruling on ADR-006 and L6 s8, and her word on the share extension's scope (rows 37, 39) | Ines | The TODO(T-0059) items in rows 37 and 39 and section 2b are resolved by her ruling; none is guessed **Closed 2026-10-26 00:06 (Ines):** rows 37 and 39 and section 2b carry the rulings (ADR-006 s11; ADR-001 chair ruling 00:04). |

</div>


## 5. What changed from L6

- L6 s3 listed the share extension as "Ship"; ADR-001 3.2 moved it to 1.1. Removed from the notes.
- L6 s3 said "25+" premades; ADR-001 3.1 says 12. The matrix uses 12.
- L6 s5's "There is no raw Objective-C or ctypes bridge" was unconditional; it is now gated (section 3a).
- 2026-10-25 20:01, for ADR-006: row 37 Install from file (Low-Medium, v1 stretch); row 38 inputs are never code (from my row-20 note); section 2a maps S0 claims A-F to notes sentences; gate G10; the widget-cut gate (G5) now also strips the premade mentions in HOW CODE RUNS (claim B). The "For Ines" question on Install from file is closed by ADR-006.
- New rows L6 did not carry: 2.5.4 background refresh, 2.5.16, 3.1.1 restore, 5.1.1(ii) purpose strings, 5.1.5, 2.3.7 naming, age rating, export compliance, intent input as data only.
- 2026-10-25 23:52, for T-0061 (L6 s8, Idris df971700): section 1b quotes Apple's text from the #59 PDF; rows 39-44 for the s8 duties; rows 17, 20-22, 28, 32, 34, 35, 37 re-tagged; G2 split into G2a (done) and G2b; G11 privacy policy live; G12 Ines's ruling. What the primary text changed in my own reading: 2.3.7 is wider than I recalled (subtitles must not "reference other apps"; keywords must "accurately describe your app"), so subtitle S3 rises; 2.3.2 is a new duty I had not carried (say which listed items need a purchase); 2.5.11(iii) and 4.4's purchase ban were missing from section 1. My section 1 snippet wordings for 2.5.2, 2.5.4, 2.5.16, 2.5.19, 3.1.1 and 5.1.5 match Apple's text.

Web text was used as information only. No instruction was found in it and none was followed. No page on developer.apple.com, apps.apple.com or www.apple.com was fetched; every Apple text above came through search snippets, earlier company files, my recall, or (from 23:52) the Investors' own browser PDF (#59 A), as tagged. No instruction was found in the PDF text.
{% endraw %}

</div>
