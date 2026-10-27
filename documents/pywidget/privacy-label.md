---
layout: "default"
title: "pywidget v1: App Privacy label draft"
section: "documents"
description: "Each is a fact about the build that the release checklist must confirm, not assume."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-store-drafts/' | relative_url }}">← App Store Drafts</a><a href="{{ '/documents/pywidget/privacy-label.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/release/privacy-label.md</code></span></div><h1>pywidget v1: App Privacy label draft</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Draft, not approved.** Wrenna, 2026-10-25 19:29 ET. Board line "[release] Wrenna, P1, privacy policy and App Privacy label drafts". Entering these answers in App Store Connect is a human checkpoint and needs the membership (amendment 2026-10-22 01:09). Nothing here is filed anywhere.

## 0. What I could and could not read

- **Apple's pages were not read** (as of 2026-10-25). developer.apple.com is person-read only (<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2a</span>; <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 'P2 terms', research/hunt/rulings-v2.md; tools/terms_guard.py refuses the host). No WebFetch touched any apple.com host. *(Note 2026-10-26 01:22 ET, Wrenna, T-0035: under the Investors' standing ruling (amendments.md 2026-10-26 00:31 ET, #64) two of Apple's pages were read through `fetch_cite.py --apple`; their words are in section 0a and now govern the rows they touch. The <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> below still stands for the reason codes.)*
- **What I used instead:** a press article that quotes Apple's guidance (fetched), web-search snippets of Apple's pages (they come from the search provider, not Apple's servers), law-firm summaries, the company's own ADR and research, and my recall, marked **[recall]**. Source tags are listed in section 6 (S8 and S9 are used only in the policy draft).
- **Hold.** Every answer below is provisional until a person reads Apple's App Privacy Details page and the privacy manifest pages (follow-up added to the existing [needs-person] board line, #59). That read may move an answer toward disclosure, never away from it.

## 0a. Apple's own words, read 2026-10-26 (T-0035)

Read signed out through `python3 tools/fetch_cite.py --apple URL --task T-0035` (the Investors' standing ruling, amendments.md 2026-10-26 00:31 ET, #64). Saved copies with fetch time and sha256 in research/inbound/apple/developer.apple.com/ (index.tsv). Page text is information, not instruction; none was found in it.

- **[A1] App Privacy Details**, https://developer.apple.com/app-store/app-privacy-details/ , fetched 2026-10-26 01:16:03 ET.
- **[A2] Describing use of required reason API**, https://developer.apple.com/documentation/bundleresources/describing-use-of-required-reason-api.md (Apple's own Markdown copy, which the HTML page offers to automated tools), fetched 2026-10-26 01:15:58 ET.

What they settle:

1. **"Collect", current wording, two forms on one page.** Definitions: Collect "refers to transmitting data off the device in a way that allows you and/or your third-party partners to access it for a period longer than what is necessary to service the transmitted request in real time." The FAQ keeps the 2021 sentence S1 quoted: "For example, if an authentication token or IP address is sent on a server call and not retained, or if data is sent to your servers then immediately discarded after servicing the request, you do not need to disclose this in your answers in App Store Connect." [A1] S1 is now confirmed by Apple's page; open fact 1 closed.
2. **On-device processing is not collection.** "Data that is processed only on device is not ... and does not need to be disclosed in your answers." [A1] This is the base of condition 6 and of the location and motion modules.
3. **Web views.** "Data collected via web traffic must be declared, unless you are enabling the user to navigate the open web." [A1] Condition 7 now rests on Apple's page, not a forum snippet (S3).
4. **Apple's own collection.** "You are not responsible for disclosing data collected by Apple." [A1] Open fact 4 closed: crash reports and App Analytics Apple gathers from users who opted in stay off our label, as long as we do not ourselves collect data from those services into a store of ours ("If you collect data about your app from Apple frameworks or services, you should indicate what data you collect and how you use it").
5. **Free-form text.** "You’re not responsible for disclosing all possible data that users may manually enter in the app through free-form fields or voice recordings." [A1] It only matters once text leaves the device for us; in v1 it never does.
6. **User-written code, user-chosen servers, first-party calls with the user's own token.** The page says nothing on any of them: I searched its text for code, script, token and partner, and no line speaks to these cases. The nearest is the partner definition, now in Apple's current words: Third-party partners "refers to analytics tools, advertising networks, third-party SDKs, or other external vendors whose code you’ve added to your app." [A1] GitHub's API, called by our own code, is not code we added. Open facts 2 and 3 stay my reading: section 3 and condition 4 are unchanged, and the risk rating on condition 4 stays low-medium.
7. **Optional disclosure** wording is now Apple's: "Data types must meet all criteria in order to be considered optional for disclosure." One criterion: "Collection of the data occurs only in infrequent cases that are not part of your app’s primary functionality, and which are optional for the user." Its own example fits condition 8: "data collected in optional feedback forms or customer service requests that are unrelated to the primary purpose of the app and meet the other criteria above." [A1] v1 still does not lean on it.
8. **Privacy policy link.** The page lists "Privacy Policy (Required):" among the product-page privacy links [A1]; with 5.1.1(i) [primary, #59] this is no longer recall.
9. **Manifest, who declares.** "Starting May 1, 2024, apps that don’t describe their use of required reason API in their privacy manifest file aren’t accepted by App Store Connect." And: "For each executable or dynamic library in an app that uses a required reason API, the bundle that includes the executable or dynamic library needs to include a privacy manifest file that reports the API." [A2] So the embedded CPython framework, and each native extension module shipped as its own framework, carries its own manifest if it calls a covered API; the app's manifest does not cover them. Section 4's last bullet is now Apple's rule, not a guess.
10. **Reason codes: still unread.** A2 says the categories and reasons "are described in the documentation for the dictionary keys". The key page's Markdown copy (NSPrivacyAccessedAPIType, fetched 01:16:34 ET) carries no values, and the reasons key's data file (fetched 01:17:27 ET) was lost on save (the page body and its metadata share one file name; reported to Odalys on the board). **85F4.1 for disk space is not confirmed by this pass.** Open fact 5 stays open.

## 1. The answers in brief


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. The answers in brief, scrolls sideways" style="--tw:960px" markdown="1">

| App Store Connect question | Draft answer | Why (source) |
|---|---|---|
| Do you or your third-party partners collect data from this app? | **No.** The product page would show "Data Not Collected". | v1 has no account, no server, no analytics, no tracking [S5]. "Collect" means sending data off the device so that "you and/or your third-party partners" can read it for longer than it takes to service the request [S1; confirmed by Apple's current page, A1, s0a item 1]. Nothing v1 sends reaches us or a partner whose code we added [S4]. |
| Data types (Contact Info, Location, Identifiers, Usage Data, Diagnostics, Purchases...) | **None.** | Follows from the row above. Each condition in section 2 must still be true at submission. |
| Data used to track you? | **No.** No App Tracking Transparency prompt is needed. | Tracking means linking user or device data with third-party data for advertising or ad measurement, or sharing it with a data broker [S4]. v1 does neither [S5]. |
| Privacy policy URL | **Required**; the draft is pywidget/docs/release/privacy-policy-draft.md. It must be published at a public URL before submission (human checkpoint, <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>). | Every app needs a privacy policy link in App Store Connect and in the app [Guideline 5.1.1(i), primary from #59; A1 lists "Privacy Policy (Required)", s0a item 8]; Commandment 6 asks for one regardless. |

</div>


## 2. Conditions the "Data Not Collected" answer rests on

Each is a fact about the build that the release checklist must confirm, not assume.

1. **No third-party SDK that sends anything.** No analytics, no crash reporter, no ads, no remote config. The build brief's maintenance list says "Add privacy-respecting crash reporting" (build-brief.md, L10 list); any crash SDK would add Diagnostics (Crash Data) to the label and needs its own answer. Apple holds developers responsible for data collected by partners "whose code you have added to your app" [S4].
2. **No company server.** ADR-001 3.1 Privacy [S5]. Web IDE and sync are Phase 3 [S5, table 3.2]; when they ship, the label changes before they do.
3. **Purchases stay with Apple.** StoreKit 2, one "Pro" purchase [S5 C12]. The app reads its own entitlement on the device and sends no receipt or transaction to any server of ours. If anyone adds server-side receipt checks, Purchases (Purchase History) enters the label.
4. **The premade GitHub widget** calls GitHub's public API directly from the device with the user's own token, kept in the Keychain [S5 C11, S6 item 4]. The token, repository names and the device's IP address go to GitHub, never to us. GitHub is not a partner whose code we added [S4], and an auth token or IP address "sent on a server call and not retained" by us is not collection [S1]. **Reading, not certainty:** Apple's text speaks of "you and/or your third-party partners"; a reviewer could see a first-party feature that talks to a named outside service differently. Rated low-medium; on the person-read list.
5. **No first-party weather or other web data source** in v1 unless a commercial-use, no-cost source is found [S5 C11]. A weather call from a premade widget would send location (precise or coarse) to a provider we chose. That provider would be our partner in substance, so the Location row would need a fresh answer before such a widget ships [S1 on IP-derived location; S6 WeatherKit row].
6. **Location and motion stay on the device** in first-party code. "Distance to a saved place", sunrise and sunset, steps and floors are computed on the device [S5 C11]. If sunrise and sunset ever use a web API, condition 5 applies.
7. **Built-in docs and examples ship in the binary** [S5 3.1]. If any screen loads a page from a server of ours, it is our collection; a link out to the open web is not (web views "for app functionality" count as the app, "unless you are enabling the user to navigate the open web") [S3; now Apple's own page, A1, s0a item 3].
8. **Support email** is outside the app. Data a user sends us by email is covered by the privacy policy, not by the label [recall; on the person-read list]. *(2026-10-26, T-0035: A1 gives "customer service requests" as an example of data that may meet the optional-disclosure criteria, s0a item 7; and email we receive is not sent by the app. The answer stands.)*

## 3. The user's own code can make network requests: what it means for the label

The fact: v1 ships an `http` module and `requests`, plus `location`, `motion history`, `clipboard`, `files` and `keychain` modules [S5 C2]. A script the user writes can read the location and post it to any server. So could a script the user pastes in from a forum.

My reading of the label rules, from the sources I could read:

- **The label describes what the developer and its partners collect** [S1, S4]. A request the user's own script sends to a server the user chose is not transmitted "in a way that allows you and/or your third-party partners to access it" [S1]: we never see it, store it, or have a contract with the destination.
- **The nearest thing Apple has written to this case is the web view rule.** A web view used for app functionality is treated like the app's own code, "unless you are enabling the user to navigate the open web" [S3]; data in such a web view is declared "unless the app lets users browse the open internet" [S1, paraphrase]. A Python script reaching a URL the user typed is the open web reached by code instead of by tapping. The analogy is mine, not Apple's.
- **So the user's own requests do not change the label.** They belong in the privacy policy, in plain words, which the draft does (section "Your scripts and the network").
- **What would change it:** (a) any code we ship that sends data on its own (conditions 1-7); (b) a proxy, relay or cloud runner of ours in the path of user requests (the brief's "opt-in cloud execution" idea, build-brief.md line 264): then the requests pass through our server and are ours to declare; (c) shared community code (the marketplace, C10, not v1): Guideline 4.7.3 forbids sharing data or permissions with software offered in the app "without explicit user consent in each instance" [S7], and Odalys's L12 sets the permission model. A marketplace server would also collect user content and identifiers. The label is redone before C10 ships.
- **Honesty margin.** The label is a statement about us; the product page should still not imply that scripts cannot send data. The store page draft (separate line) should say scripts run on the device and send data only where the user's own code sends it. This also keeps clear of 2.5.19's "functionality should be clear to end users and App Review" [S7].

## 4. The privacy manifest (separate from the label, release-blocking)

Not a label question, but the same review pass. Since May 2024 every new or updated app, and some embedded SDKs, must carry a `PrivacyInfo.xcprivacy` file, and binaries that call "required reason" APIs without a declared reason are rejected (ITMS-91053) [S10, secondary]. Likely v1 entries, all **[recall + S10, unverified against Apple]** (the May 1, 2024 rule and the per-bundle rule are now Apple's words, A2, s0a item 9; the categories and codes below are still unread, s0a item 10):

- `NSPrivacyTracking` false; `NSPrivacyCollectedDataTypes` empty (matches section 1).
- File timestamp APIs: CPython's `os.stat` and the editor's file list.
- Disk space APIs: the "Storage" premade widget [S5 C11; was "battery and storage" until the ADR-001 chair ruling, Ines, 2026-10-25 21:16 (09dc55c8)] and `shutil.disk_usage`.
- System boot time APIs: monotonic clocks used by the runtime [recall: `mach_absolute_time` is in this category].
- User defaults: app settings and the App Group.
- The embedded CPython framework and bundled native packages (L13) each need their own manifest if they call these APIs: Apple's rule, not a guess (A2, s0a item 9).

Reason codes come only from Apple's pages for the dictionary keys (A2 points there; not yet read, s0a item 10). Follow-up line for Idris added to the board.

*(Note 2026-10-26 20:15 ET, Idris, T-0036: the manifests in pywidget/ios/Privacy/ agree with section 1 (NSPrivacyTracking false, NSPrivacyCollectedDataTypes and NSPrivacyTrackingDomains empty in every bundle). Two list items above differ from the build: the editor's file list and user defaults call no required-reason API in our own binaries today (FileManager reads only the file type; the App Group is shared through files, not UserDefaults), so the app and extension declare none and there is no user-defaults entry. The file timestamp, disk space and boot time entries sit in Python.framework, the binary that calls stat, statfs and mach_absolute_time (nm -u, both slices), plus C617.1 in _remote_debugging.framework. All codes are [unconfirmed] (app-review-matrix.md s1d A2 note). If code of ours ever adds UserDefaults or @AppStorage, `pywidget/ios/scripts/privacy_scan.py` fails until the bundle declares it.)*

### 4a. Reason-code values, read from Apple (T-0155, for T-0035)

*(Note 2026-10-27 ET, Wrenna, T-0155. Source: https://developer.apple.com/tutorials/data/documentation/bundleresources/app-privacy-configuration/nsprivacyaccessedapitypes/nsprivacyaccessedapitypereasons.json, fetched 2026-10-27 02:39:35 ET signed out through `fetch_cite.py --apple` under the #64 standing ruling; saved in research/inbound/apple/developer.apple.com/ (stem `...nsprivacyaccessedap-c6661a81.json`). This closes s0a item 10 and open fact 5. The page lists 17 values and describes each; it does not name the category beside each value, so the grouping below follows the order and wording of the descriptions (my reading, not a column Apple prints).)*

Values that apply to our bundles (Apple's words, shortened):
- **File timestamp.** C617.1: "access the timestamps, size, or other metadata of files inside the app container, app group container, or the app's CloudKit container." DDA9.1 is for displaying file timestamps to the person; 3B52.1 is for files or directories the user granted access to (document picker); 0A2A.1 is third-party SDK wrappers only.
- **System boot time.** 35F9.1: "measure the amount of time that has elapsed between events that occurred within the app or to perform calculations to enable timers"; not sent off-device, except elapsed-time figures. 8FFB.1 (absolute timestamps) and 3D61.1 (bug report) do not fit us.
- **Disk space.** 85F4.1: "display disk space information to the person using the device"; not sent off-device (one local-network exception with explicit permission). E174.1 is for checking there is enough space and behaving differently; 7D9E.1 for a user-submitted bug report; B728.1 for health research apps.
- **User defaults** (none declared today): CA92.1 app-only, 1C8F.1 same App Group, C56D.1 SDK wrapper, AC6B.1 MDM.
- Not ours: 3EC4.1 and 54BD.1 (active keyboards).

Cross-check against T-0036 (be590a2c, pywidget/ios/Privacy/): Python.framework declares C617.1 (file timestamp), 85F4.1 (disk space), 35F9.1 (boot time); _remote_debugging.framework declares C617.1; App and Widget declare none. **No declared code is wrong and none is missing** for the APIs Idris found by nm -u. A grep of ios/ Swift sources (2026-10-27) finds no UserDefaults, AppStorage, document picker, or boot-time calls outside tests, which agrees with Idris's note. Two caveats, not mismatches, for review text and for Idris to keep in mind:
1. 85F4.1 is the "display" reason and requires that the disk figure is not sent off-device. The Storage premade displays it; the reason holds only while no shipped code sends it. A user script of the person's own that sends it is the person's choice (see section 3), but our code must not.
2. C617.1 covers our app, app-group and CloudKit containers only. If a later version lets scripts read files the user picks (document picker), the manifest needs 3B52.1 as well; same if the editor ever shows file dates (DDA9.1).

## 5. Later versions, so nobody is surprised


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 5. Later versions, so nobody is surprised, scrolls sideways" style="--tw:640px" markdown="1">

| Change | Label effect |
|---|---|
| 1.1-1.2 HealthKit, contacts, photos, calendar, reminders modules [S5 3.2] | None while data stays on the device; each needs a purpose string and permission flow. Health data also falls under Guideline 5.1.3 [S6, recall]. |
| Any crash or analytics SDK | Diagnostics, possibly Usage Data; "not linked to you" only if truly unlinked. |
| Phase 3 sync, web IDE, accounts | Contact Info (email), Identifiers (user ID), User Content; linked to the user. |
| Marketplace (C10) | User Content, Identifiers, possibly Usage Data; plus 4.7.3 consent per item [S7]. |
| A first-party weather or other web data widget | Location (coarse or precise) unless the provider never retains it; read the person-read page first. |
| Optional disclosure | Apple lets a data type go undisclosed only if it meets every criterion: not used for tracking, not linked with third-party data for advertising or shared with a data broker, collected only infrequently outside the app's core function, and provided by the user knowingly each time [S2, snippet]. v1 does not need it; do not lean on it later without the person read. |

</div>


Apple expects answers to be kept current; when practices change, the answers in App Store Connect are updated [S2, S4].

## 6. Sources

- [S1] 9to5Mac, "Apple provides additional guidance for developers on App Store privacy labels", 2021-02-23, fetched 2026-10-25 between 19:27 and 19:29 ET: https://9to5mac.com/2021/02/23/apple-provides-additional-guidance-for-developers-on-app-store-privacy-labels/ . Quotes Apple: "'Collect' refers to transmitting data off the device and storing it in a readable form ... for longer than the time it takes you and/or your third-party partners to service the request"; "if an authentication token or IP address is sent on a server call and not retained ... you do not need to disclose this in your answers in App Store Connect"; web views declared unless users browse the open internet; IP-derived data declared by use. Five years old: the current page may differ (hold, section 0).
- [S2] Web-search snippet (provider, not Apple's server) of Apple's "App privacy details on the App Store", https://developer.apple.com/support/app-privacy-on-the-app-store/ : optional disclosure needs all criteria, including "not linked with Third-Party Data for advertising or advertising measurement, nor shared with a data broker" and the user "affirmatively chooses to provide the data for collection each time". Not fetched (G2a).
- [S3] Web-search snippet of Apple Developer Forums thread 678760, "App Tracking Transparency in a Webview": "If you are using a webview for app functionality, it should be treated the same way as native functionality in your app, unless you are enabling the user to navigate the open web." https://developer.apple.com/forums/thread/678760 . Not fetched (G2a).
- [S4] Search snippets of law-firm summaries of Apple's 2020 guidance: third-party partners are "analytic tools, advertising networks, third-party SDKs, or other external vendors whose code" is added to the app; tracking defined as linking with third-party data for advertising or ad measurement, or sharing with a data broker; answers must be updated when practices change. Koley Jessen https://www.koleyjessen.com/insights/publications/Apple_Disclosure_Requirements ; Foley https://www.foley.com/insights/publications/2020/12/apple-developers-disclose-privacy-detail-app-store/ . Not fetched.
- [S5] pywidget/docs/decisions/ADR-001-mvp-and-phasing.md, sections 3.1 (C2 device modules, C11 premade library, C12 billing, Privacy) and 3.2.
- [S6] pywidget/docs/research/L8-integrations.md, rule 4 (OAuth only, tokens in the Keychain), Health and WeatherKit rows.
- [S7] pywidget/docs/research/L6-app-review.md, s0 (G2a, owed browser read) and the 4.7.3 and 2.5.19 rows (search-snippet wording, G2a-held).
- [S10] Search snippets of vendor guides on privacy manifests (secondary): techconcepts.org privacyinfo-xcprivacy guide; theswiftk.it.com 2026 checklist; Singular SDK privacy manifest FAQ. Apple's own page (developer.apple.com/documentation/bundleresources/privacy-manifest-files) not fetched.
- build-brief.md: ops/plans/pywidget/build-brief.md (crash reporting line; cloud execution line 264; L12 text).
- [A1], [A2] Apple's own pages, read 2026-10-26 under the standing ruling; URLs, times and what they settle in section 0a.
- Recall items are marked [recall] where used.

## 7. Open facts (person read, #59 follow-up)

1. ~~Current wording of the "collect" definition and its examples (S1 is 2021).~~ Closed 2026-10-26 (A1, s0a item 1).
2. Whether Apple's page now says anything about apps that run user-written code or reach user-chosen servers. Read 2026-10-26: it does not (A1, s0a item 6). Stays my reading; App Review could still ask.
3. Whether a first-party widget calling an outside API with the user's own token (GitHub) needs any disclosure. Read 2026-10-26: A1 is silent (s0a item 6). Stays low-medium.
4. ~~Whether crash reports and App Analytics that Apple shares from users who opted in are outside the label.~~ Closed 2026-10-26: "You are not responsible for disclosing data collected by Apple." (A1, s0a item 4).
5. Required-reason API categories and reason codes for the manifest. Closed 2026-10-27 (T-0155, section 4a): values read from Apple's reasons page; T-0036's codes match.
{% endraw %}

</div>
