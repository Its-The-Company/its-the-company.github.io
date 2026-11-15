---
layout: "default"
title: "T-4430: loading the TestFlight encryption answers without a setting in the build"
section: "documents"
description: "Apple offers exactly one way to answer for a build without a setting inside it: the App Store Connect API. It can mark a build as using non-exempt encryption and link it to one saved encryption declaration (Standard\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4430-encryption-answers.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 25 · Sun Nov 15</span><span><code>ops/plans/T-4430-encryption-answers.md</code></span></div><h1>T-4430: loading the TestFlight encryption answers without a setting in the build</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-11-15. Board line T-4430 (P1, build), as overridden by the Operator's note of 11-14 15:3x: an Investor answered
F on #138 (c6883751259, 3:29 PM ET; the company's reply c6883782641). Builds that carry Python's OpenSSL get no encryption
setting; "Standard encryption algorithms" and France "No" are answered at each upload until the OpenSSL-free build (T-3399).
Jeremy's original question: #41 c6873915614 (2026-11-14 2:36 AM ET): "Is there a way to automatically push builds to
testflight with 'Standard encryption…' and 'No' to the France question as the loaded answers?"

## 1. Answer in one paragraph

Apple offers exactly one way to answer for a build without a setting inside it: the App Store Connect API. It can mark a
build as using non-exempt encryption and link it to one saved encryption declaration (Standard algorithms, not on the
French store). That route needs an App Store Connect API key, which is option B on #100; the Investors chose option A
(Xcode sign-in, no key), so the company has no key and cannot use it today. Neither export options nor the upload command
take an encryption answer. The setting inside the build would not remove the clicks either for an OpenSSL build (section 3).
So until T-3399, the answer is given by hand at each upload: about six clicks, listed in section 4, and now printed by
`tools/upload.sh` after every successful upload of an OpenSSL build. A question for #138 (API key or keep the clicks) is
drafted in section 6; the Operator posts it.

## 2. What Apple offers (sources, all saved under research/inbound/apple/developer.apple.com/, see index.tsv)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. What Apple offers (sources, all saved under…, scrolls sideways" data-n="2" style="--tw:1033px" markdown="1">

| Route | Needs a setting in the build? | Works for an OpenSSL build under F? | Source |
|---|---|---|---|
| Info.plist `ITSAppUsesNonExemptEncryption` = NO | yes | No: false for a build that carries OpenSSL, and F forbids it | Complying with Encryption Export Regulations (saved 2026-10-26, T-0132) |
| Info.plist `ITSAppUsesNonExemptEncryption` = YES | yes | No: F forbids it, and a YES build still has to be linked to a declaration (API page note below) | App Encryption Declarations (saved 2026-11-15, T-4430) |
| Info.plist `ITSEncryptionExportComplianceCode` | yes | No: F forbids it; Apple gives the code only after uploaded documents are approved, and with France out no document is required | Determine and upload app encryption documentation (saved 2026-11-06, T-3121); Complying... |
| App Store Connect API: `PATCH /v1/builds/{id}` with `usesNonExemptEncryption`, then `PATCH /v1/builds/{id}/relationships/appEncryptionDeclaration` to a declaration made once with `POST /v1/appEncryptionDeclarations` (`containsThirdPartyCryptography` true, `containsProprietaryCryptography` false, `availableOnFrenchStore` false, `appDescription`) | **no** | **Yes, on paper**: the only no-setting route. Needs an API key (#100 option B), not held | App Encryption Declarations; Assign the app encryption declaration for a build; BuildUpdateRequest.Data.Attributes; AppEncryptionDeclarationCreateRequest.Data.Attributes (all saved 2026-11-15, T-4430) |
| Old `POST /v1/appEncryptionDeclarations/{id}/relationships/builds` | no | Not to be built on: Apple lists it for API 1.0.0 to 2.4.0 only | Assign builds to an app encryption declaration (saved 2026-11-15) |
| `xcodebuild -exportArchive` options (our upload path, #100 A) | n/a | No: none of the export option keys `xcodebuild -help` lists (Xcode 27.1, 27A9275, read locally 2026-11-15) is about encryption | local |
| App Store Connect, App Information > App Encryption Documentation (+), answered once | no | No: Apple's beta page still has each build answered ("click Manage beside the relevant build") or attached to approved documentation per build | Provide export compliance information for beta builds (saved 2026-11-15) |

</div>


Not verified, and not claimable until someone with the sign-in sees it: whether a declaration made through the API for
"Standard, France out" is accepted at once (state `APPROVED`) with no document, and so whether the API route really ends
"Missing Compliance" with no human step. Apple's pages say documents are needed only for France or proprietary
algorithms; they do not show the declaration's state in that case.

## 3. Why the in-build setting is not the shortcut for OpenSSL builds

Per the API page: "Builds that have the `usesNonExemptEncryption` flag set to true in the app's property list must link to
an app encryption declaration before the app can be submitted for beta app review." So YES alone moves the click, it does
not remove it; the zero-click in-build route is YES plus a compliance code, and the code comes from approved documents the
company does not need under F. NO is the true answer only for the OpenSSL-free build (ADR-009, T-3399). The #138 reply
promised to ask before adding any setting; nothing here asks to add one.

## 4. The Investors' clicks at each upload (until T-3399)

From Apple's "Provide export compliance information for beta builds" (required role: Account Holder, Admin or App
Manager). Signed in, by an Investor; no worker signs in.

1. App Store Connect > Apps > the app > **TestFlight** tab.
2. In the sidebar under **Builds**, click **iOS**.
3. Beside the new build (status **Missing Compliance**), click **Manage**. (Apple's other route: click the build's icon or
   build string, then **Provide Export Compliance Information**.)
4. The encryption algorithms question: choose the answer that starts **"Standard encryption algorithms"**.
5. The France question: choose **"No"**.
6. Click **Save**. The build leaves Missing Compliance and internal testers can install it.

If the dialog asks anything else, or asks for a document (**Go to App Encryption Page**), stop and say so on #138: under
F no document is needed. The exact radio-button wording is the dialog's own; Apple's public pages do not print it, so
steps 4 and 5 use the words Jeremy quoted on #41.

France itself (out of the countries the app is offered in) is set under **Pricing and Availability**, also behind the
sign-in; the #138 reply already covers that step. It is not an upload-time click.

## 5. What changed in the company's tooling (no setting added)

`tools/upload.sh` (T-4430):
- reads the archive for Python's OpenSSL (`_ssl` / `_hashlib` frameworks, or their lib-dynload `.fwork`/`.so` files;
  build 6's archive holds `Frameworks/_ssl.framework` and `Frameworks/_hashlib.framework`) and for either encryption key
  in the app's or the widget extension's Info.plist;
- **refuses** to export or upload an archive that carries OpenSSL and sets either key (#138 F), before any xcodebuild call;
- after a **successful upload** of an OpenSSL build, prints the six clicks above with the build number; an OpenSSL-free
  build with the key prints a read-back reminder; a build with neither prints "Ask on #138" (F's by-hand answer covers
  OpenSSL builds only). Nothing is printed for a folder export or a failed upload.

Tests: `tests/upload_test.sh`, 12 new T-4430 cases (159 pass, 0 fail, 2026-11-15); 7 new mutants in
`tests/upload_mutants.json`, all 7 killed (section 7). `tests/run.sh upload_test.sh`: all tests passed.

## 6. Draft question for #138 (the Operator posts it; no worker posts)

> Jeremy, a follow-up to F, on your #41 question (Sat 2:36 AM ET) about loading the TestFlight encryption answers
> automatically. Apple's public documentation shows one way that adds nothing to the build: the App Store Connect API can
> mark each uploaded build and link it to one saved encryption declaration (Standard algorithms, France: No). That needs
> an App Store Connect API key, option B on #100; you chose A (the Xcode sign-in), so the company holds no key today. A
> setting inside the build would not do it for these builds: Apple still asks each one to be linked to a declaration.
> I. Keep answering by hand: about six clicks per upload (TestFlight, iOS, Manage, "Standard encryption algorithms",
> France "No", Save), printed by the upload script after each upload, until the OpenSSL-free build (planned before
> 2026-11-30), which needs no answer. J. Make an App Store Connect API key with the App Manager role, as #100 B describes;
> the company then links each build after upload, with no clicks. The company recommends I: the clicks last about two
> weeks, and J would put a lasting credential in a file, which #100 B notes is also your <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>. A one-letter reply is
> enough.

## 7. Evidence

- Saved pages (2026-11-15, T-4430): app-encryption-declarations.md, post-...-relationships-builds.md,
  patch-v1-builds-_id_-relationships-appencryptiondeclaration.md, appencryptiondeclarationcreaterequest attributes (.md and
  .json), buildupdaterequest attributes (.json), provide-export-compliance-information-for-beta-builds; earlier saves:
  overview-of-export-compliance, determine-and-upload-app-encryption-documentation,
  export-compliance-documentation-for-encryption (T-3121, 2026-11-06), complying-with-encryption-export-regulations
  (T-0132, 2026-10-26). Seven Apple requests this task, through `tools/fetch_cite.py --apple` (terms_guard.apple_page).
- Mutants: ops/runs/t4430-mutants.txt.
{% endraw %}

</div>
