---
layout: "default"
title: "Submission answers sheet: age rating and export compliance (DRAFT)"
section: "documents"
description: "T-1110, Wrenna, 2026-11-02. Reader: the Investors, at submission (Days 47-48). The Investors fill in App Store Connect; nothing here is entered for them, and the questionnaire itself sits behind sign-in (I did not see\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-store-drafts/' | relative_url }}">← App Store Drafts</a><a href="{{ '/documents/pywidget/submission-answers.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/release/submission-answers.md</code></span></div><h1>Submission answers sheet: age rating and export compliance (DRAFT)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
T-1110, Wrenna, 2026-11-02. Reader: the Investors, at submission (Days 47-48). The Investors fill in App Store Connect; nothing here is entered for them, and the questionnaire itself sits behind sign-in (I did not see it).

**Code read at commit `33789648`** (HEAD of main when written; `pywidget/ios`). Facts from `Shared/NetFetch.swift` were last changed at `17108b8e`. Every fact below carries the grep or file that supports it. Re-run them at the submitted build; any change in the web, sharing or crypto rows below changes an answer.

**Apple's text**, saved signed out under the 2026-10-26 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>, no fresh page fetched:
- Age ratings: https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions, fetched 2026-10-26 01:17:46 ET, `research/inbound/apple/developer.apple.com/help_app-store-connect_reference_app-information_age-ratings-values-and-definitions-e3df83c5.html` (T-0132). Called **AGE** below.
- Encryption: https://developer.apple.com/documentation/security/complying-with-encryption-export-regulations.md, fetched 2026-10-26 01:17:51 ET, `research/inbound/apple/developer.apple.com/documentation_security_complying-with-encryption-export-regulations.md-d41c9f28.html`. Called **ENC** below.

Marks: **[mine]** a reading from code, safe to type as written; **[theirs]** the Investors' to give, with the reason.

## 0. Company limits, said plainly (Commandments 6 and 7)

The app is not in any banned area: not finance, medical, legal, gambling, adult content, weapons and substances, or politics. It is not made for children under 13 and does not market to them. The age rating below is a content rating, not a claim that children are the audience. Choose the "not for kids" path where the form offers one (the Kids Category is not sought) **[theirs]**, because it is the company's decision of audience and the form asks the person. Nothing here is legal advice; where the encryption answer turns on law it is marked **[theirs]**.

## 1. Age rating

Scale in AGE: 4+, 9+, 13+, 16+, 18+, Unrated ("An Unrated app can't be published on the App Store"). Categories and wording are quoted from AGE; the form's exact question text was not read, so match each row to the question that carries the same label.

**Draft result: 4+.** It <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> only while every row below stays "None" or "No". AGE places Unrestricted Web Access at 16+; that is the one row with a live question (row 1).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Age rating, scrolls sideways" data-n="1" style="--tw:1241px" markdown="1">

| # | AGE descriptor (quoted) | Draft answer | Code fact and how to re-check | Who |
|---|---|---|---|---|
| 1 | Unrestricted Web Access: "Users can navigate to any webpage within the app or freely browse the web." "May include: embedded browser functionality or browser app." | **No** (reading). Reason in note A. | No web view or browser: `grep -rnE "WKWebView\|SFSafariViewController\|import WebKit\|import SafariServices" pywidget/ios --include=*.swift` returns 0 in App, Shared, Widget (checked at `33789648`). `pywidget.net.get` takes an `https://` URL only (`Shared/NetFetch.swift` line 83) and returns text to the script; nothing is rendered. | **[theirs]**, the one judgement call. If you read user-written fetching as "freely browse the web", the rating is 16+. |
| 2 | User-Generated Content: "broad distribution of content created by users", broadly distributed videos, photos, text, audio | **No** | No server, no account, no feed. Share is a person's own file or project zip to the system share sheet (`ShareLink` in `App/Projects/ProjectsView.swift` lines 52, 213, 225; Files import in the same file, lines 81, 233). No gallery, no download of others' code in v1 (ADR-006 line 200: "no pip, no downloaded code, no gallery"). Re-check: `grep -rnE 'https?://' --include='*.swift' App Shared Widget` shows one fixed link (`App/LegalLinks.swift` line 11, Apple's standard licence text, opened by the system, not in an in-app browser) and no app-owned endpoint. | [mine], but see note B |
| 3 | Social Media / Social Media Disabled for Users Under 13 | **No / not applicable** | No feed, likes, comments or discovery; same greps as row 2. | [mine] |
| 4 | Messaging and Chat | **No** | No in-app communication feature; no MessageUI, CloudKit or GameKit import (grep of `import (MessageUI\|CloudKit\|GameKit)` found 0). | [mine] |
| 5 | Advertising | **No** | No ad SDK, no AdSupport or tracking import (grep 0). | [mine] |
| 6 | Parental Controls (in-app) | **No** | No such feature in the app. | [mine] |
| 7 | Age Assurance | **No** | No age check; Declared Age Range not used. | [mine] |
| 8 | Profanity or Crude Humor; Horror/Fear; Alcohol, Tobacco, Drugs | **None** | The app's own text and the 10 bundled examples (`pywidget/examples/*.py`: csv_summary, date_calculator, dice_roller, http_status, json_pretty, password_generator, text_cleaner, tip_splitter, unit_converter, word_count) hold none. A person should read the final store text and any sample data at the submitted build. | [mine], re-read at submit |
| 9 | Medical or Treatment Information; Health or Wellness Topics | **None** | Steps, altitude and similar come from the device sensors as numbers for the user's own widget; the app gives no diagnosis, advice or calorie or diet guidance. Check the Pro premade names at the submitted build: if any widget offers "exercise recommendations" or "calorie tracking", this row becomes "Health or Wellness Topics" (9+). | **[theirs]**, since a premade list is still moving (Q11, `store-page-draft.md` line 224) |
| 10 | Mature or Suggestive; Sexual Content or Nudity; Graphic Sexual | **None** | Nothing in the bundle. | [mine] |
| 11 | Cartoon or Fantasy Violence; Realistic Violence; Prolonged Graphic; Guns or Other Weapons | **None** | Nothing in the bundle. The `dice_roller` example is a die, not a game of chance for stakes. | [mine] |
| 12 | Gambling; Simulated Gambling; Loot Boxes | **None** | No betting, no randomized purchase. The one purchase is a single StoreKit 2 non-consumable "Pro" (`App/Store/ProStore.swift` lines 6 to 11), a fixed feature set, not a loot box. | [mine] |
| 13 | Contests | **None** | No ranking, leaderboard or competition. | [mine] |

</div>


**Note A, why row 1 is "No".** Apple's own examples are "embedded browser functionality or browser app", and the Python code a person writes asks for text through one function and prints it. A script can also reach any HTTPS host through the bundled `urllib`, `http.client` or `socket` (`urllib` is in the bundle: the stdlib manifest keeps `_ssl` and `_hashlib`, [`pywidget/docs/research/stdlib-manifest.md`](stdlib-manifest.html) lines 51, 64; `examples/http_status.py` imports `urllib.request`). So the reachable set is "any URL by code", not "any page for a person to view". I read that as not browsing, and I read the questionnaire's own wording only through AGE, not the form. This is a reading, not a ruling: an App Review reviewer or Apple could read it the other way, and the cost of "Yes" is a 16+ label. It is the Investors' to give.

**Note B, user-generated content.** Users write scripts and widgets, and may export a project file. That is content they create but is not "broadly distributed" by the app. If a later version adds a gallery or an Explore tab with other people's code (ADR-006 section 13 plans it for after 1.0), rows 2 and 3 change at once, and Guideline 1.2 duties (report, block, filter) apply (`research/L6-app-review.md` line 53). Not so in the build described here.

## 2. Export compliance (encryption)

### 2a. The question, in Apple's words (ENC)

"Set the value to `NO` if your app, including any third-party libraries it links against, doesn't use encryption, or if it only uses forms of encryption that are exempt from export compliance documentation requirements. Otherwise, set it to `YES`." And: "Typically, the use of encryption that's built into the operating system, for example, when your app makes HTTPS connections using URLSession, is exempt from export documentation upload requirements, whereas the use of proprietary encryption is not." And: "If your app uses exempt forms of encryption, you might alternatively be required to submit a year-end self-classification report to the U.S. government."

### 2b. What the code does at `33789648`


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2b. What the code does at 33789648, scrolls sideways" style="--tw:960px" markdown="1">

| Fact | Support | <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span> |
|---|---|---|
| `pywidget.net.get` makes one HTTPS GET through `URLSession` (ephemeral configuration, no cookies, no cache); anything not `https://` is refused. | `Shared/NetFetch.swift` header (lines 1 to 12), `makeSession` (lines 214 to 225), scheme check (line 83). This is Apple's own exempt example, system TLS. | app and widget extension |
| Our own Swift hashes: SHA-256 through CryptoKit in a developer bench only (`App/Editor/EditorBench.swift` line 136); it is a digest, not encryption of data. The Pro purchase uses StoreKit 2. | `grep -rn "import CryptoKit\|import CommonCrypto" pywidget/ios --include=*.swift` (App, Shared, Widget): only `EditorBench.swift`. | app |
| Stored secrets use the system Keychain (`kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`), the OS's own. | `App/Device/KeychainCall.swift` lines 18, 135 | app |
| **The one non-system item:** the bundled CPython ships `_ssl` and `_hashlib`, linked against its own **OpenSSL 3.5.9** (read from the vendored `_ssl.cpython-315-iphoneos.so` strings). User code that imports `ssl`, `urllib`, `http.client` or `hashlib` uses that OpenSSL rather than the system's TLS. | [`pywidget/docs/decisions/ADR-003-package-policy.md`](adr-003-package-policy.html) line 121; [`pywidget/docs/research/stdlib-manifest.md`](stdlib-manifest.html) lines 51, 64 | app only: the widget extension links no Python and `lane.py` line 252 lists `ssl`, `_ssl`, `urllib` among names that cannot run there |
| No algorithm of our own. We wrote no cipher, no key exchange, no custom protocol; OpenSSL is standard, public, third-party code, and TLS and hash functions are the standard algorithms. | `grep -rniE "AES\|ChaCha\|RSA\|HMAC\|encrypt\|decrypt" pywidget/ios/App pywidget/ios/Shared pywidget/ios/Widget --include=*.swift` found 3 hits at `33789648`, all text: two in `App/Projects/MiniZip.swift` (it refuses encrypted zips) and one error message in `Shared/NetFetch.swift`; no cipher code (re-run at submit). | |
| `ITSAppUsesNonExemptEncryption` is **not** in either Info.plist, deliberately, so the form is asked each upload. | `grep -n "ITSApp" pywidget/ios/App/Info.plist pywidget/ios/Widget/Info.plist pywidget/ios/project.yml` returns nothing | |

</div>


### 2c. Draft position and who decides

The form's key question, "does your app use encryption", is **Yes in the plain sense** (TLS, hashing, Keychain), because ENC says "including any third-party libraries it links against", and CPython's OpenSSL is one. The follow-up (non-exempt or exempt) is the part that turns on law.

- **Where my reading ends.** The system-TLS part is Apple's stated exempt case. The OpenSSL part is standard, public, unmodified, used for ordinary HTTPS and hashing, and is not proprietary. Apple's page gives operating-system encryption (HTTPS through URLSession) as its typical exempt example; whether standard open-source TLS inside a bundled interpreter also meets the exemption, and whether a year-end self-classification report to the U.S. government is owed, I have not read from a primary text (BIS rules, Apple's "Determine and upload app encryption documentation" page, not saved). That is a question of law and the form's declaration is a legal statement. **[theirs]**, under Commandment 6.
- **Questions for the Investors** (raise in ops/questions.md):
  1. At submission, answer the encryption question yourself on the form. A Python IDE with a full OpenSSL is probably a case Apple expects to say "Yes, standard encryption only", but I have not confirmed it and will not guess. Do you want the company to fetch the one Apple page, "Determine and upload app encryption documentation" (a single public page under the standing ruling), before Day 47? I did not, to keep to one page budget; I can on your word.
  2. Do you accept filing, or deciding about, the BIS annual self-classification report that ENC mentions? It is a government filing and only you can make it.
  3. Do you want `ITSAppUsesNonExemptEncryption` set in the plist once you decide (Idris's file edit; `YES` or `NO` is your declaration)? Until then there is no key, so App Store Connect asks every upload.
  4. Would you prefer to remove the OpenSSL question altogether by pointing Python's `ssl` at system TLS? ADR-003 line 118 floats it for 1.1 at best; it is Pernille's and Idris's decision, and it would not remove the hashing library.
- **No one has claimed** the app uses no encryption. Do not type "No" on the strength of this sheet.

## 3. What is left

- Item 12 in `ops/questions.md` (named in the matrix, [`app-review-matrix.md`](app-review-matrix.html) lines 256, 276) is not in the file as written; the matrix points to it for the encryption question. I added no pointer, as there is nothing to attach it to; Ines should open it from section 2c (task note).
- Row 9 (premade list) and the OpenSSL question are the only two answers that could move the result. If row 1 is "Yes", the rating is 16+.
- Not read: the form's own question text; Apple's "Set an app age rating" and "Determine and upload app encryption documentation" pages; BIS rules.
{% endraw %}

</div>
