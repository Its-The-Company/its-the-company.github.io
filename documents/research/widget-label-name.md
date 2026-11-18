---
layout: "default"
title: "What sets the text under a Home Screen widget, and may it be &quot;^&quot;? (T-4839)"
section: "documents"
description: "Not run, and not run for any name. I raised no candidate names (a name is the creative gate; none was asked for)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/archive/market-research/' | relative_url }}">← Market research, Day 1 and 2</a><a href="{{ '/documents/research/widget-label-name.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 28 · Wed Nov 18</span><span><code>research/widget-label-name.md</code></span></div><h1>What sets the text under a Home Screen widget, and may it be "^"? (T-4839)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Asked by an Investor on #41 (c6968784628, 11:11 PM ET Nov 17). Read by Wrenna, 4:09 to 4:12 AM ET Nov 18, from Apple's public developer pages, one at a time under the #64 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> (signed out, 5 s apart, robots.txt followed, every page saved with URL and date in research/inbound/apple/). The name is the Investors' decision (creative gate); this file gives findings, not a pick. Per Evan's #41 c6969248114 note, "Widget Above" was not checked and no candidate here uses "widget".

## Short answers

1. **Is the label the app's Home Screen name, set by the app and not per widget or by the person?** Partly confirmed, partly not.
   - Confirmed: Apple documents one key, CFBundleDisplayName, as "the user-visible name for the bundle, used by Siri and visible on the iOS Home screen". It is set in the app's Info.plist. If it is missing, CFBundleName (up to 15 characters) "may" be shown instead.
   - Confirmed: the only per-widget name Apple documents (`configurationDisplayName`) is "shown in the widget gallery", the picker where a person adds a widget. It is not described as text under a placed widget.
   - Not confirmed: **no Apple developer page I could read describes a label under a placed Home Screen widget at all**, or says what text it shows. The Human Interface Guidelines widgets page (saved Nov 4) never mentions one. So "the label is the containing app's display name" is the best inference from the two documented names, not a quoted sentence. A 10-minute Simulator test settles it (see Open items).
   - Not found: any Apple page offering a per-widget label setting for developers, or a setting for a person to rename the label. Absence on the pages read is not proof of absence in iOS.
2. **May the display name differ from the App Store name, and how far?** Yes, by Apple's own documents the two are separate fields. App Store name: "at least two characters and no more than 30" (App Store Connect help, App information). Home Screen name: CFBundleDisplayName, a free string in the Info.plist, with no length or character rule on its page; CFBundleName is <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> at 15 characters. Review Guideline 2.3.7 ("App names must be limited to 30 characters") speaks of the App Store name; 2.3.8 asks that "app name and icons ... are similar to avoid creating confusion". I found no Apple sentence limiting how far the two may differ.
   - Consequence for "^": the App Store name itself can never be one character (two-character minimum), but the Home Screen name is a different field and is not shown the same minimum on the pages read.
3. **Would App Review accept a punctuation-only or one-character display name?** Unknown. **No Apple page I read says yes or no.** The Guidelines have no rule on Home Screen name length or characters. Rules that could be cited against it: 2.3.8 (name and icon should not confuse), 2.3.7 (metadata rules, written about the App Store name), and 4.1(c) only if the mark copies another developer's brand. Only App Review can answer; a rejection would come as a note in App Store Connect. Practical flags, not Apple statements: the same name is "used by Siri" (page above), so a spoken "open ^" is unclear; VoiceOver reading a caret is untested.
4. **Does a Home Screen setting hide labels (iOS 18+ large icons)?** **Not answered from an Apple page.** The user-facing Home Screen settings live on support.apple.com, which the company's fetch guard bars (Apple's site terms forbid automated reads) and the #64 ruling covers only developer.apple.com and apple.com/legal. The developer pages I read (HIG App icons, saved Nov 18) discuss default, dark, clear and tinted icon appearances but say nothing about hiding labels. From general knowledge, unsourced: iOS 18's Customize > Large icons shows icons without text labels. Whether that also hides the text under a widget is unknown. Needs a device look.

## USPTO check (Commandment 6)

Not run, and not run for any name. I raised no candidate names (a name is the creative gate; none was asked for).
- USPTO's search service (tmsearch.uspto.gov) sits behind an AWS WAF bot challenge (its own configuration.json, read Nov 17 under T-4693, research/names/T-4693-names.md line 19). The company never passes a bot check (Commandment 7). The official API needs a MyUSPTO key, which is the Investors' (#46).
- For a punctuation-only mark such as "^": I cannot say how USPTO's text search treats a lone symbol (not read). A symbol-only mark would likely need a design search by a person; that is a lawyer or Investor call, and legal advice is outside the company's <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>.
- If a short word-like name is chosen later, the search steps for the Investors are in research/names/T-4693-names.md (all statuses, no class filter, then Class 009 and 042).

## Open items for the Investors

- **10-minute device or Simulator test** (decisive for questions 1 and 4): in a test app set CFBundleDisplayName to "AAA" and a widget's configurationDisplayName to "BBB", add the widget to a Home Screen, and screenshot with and without iOS 18's large-icon setting. Not run here: it needs a build, and the task asked for a documentation read.
- Whether the App Store name (two characters minimum) and the Home Screen name need to match is an Investor naming call.
- Nothing here was sent to App Review or any outside party.

## Sources

All fetched with `tools/fetch_cite.py --apple`, signed out, on the date shown (ET). Local copies in research/inbound/apple/developer.apple.com/.
- CFBundleDisplayName: https://developer.apple.com/documentation/bundleresources/information-property-list/cfbundledisplayname (page shell fetched Nov 18, 4:09 AM; text from https://developer.apple.com/tutorials/data/documentation/bundleresources/information-property-list/cfbundledisplayname.json, Nov 18, 4:09 AM). Quoted: "The user-visible name for the bundle, used by Siri and visible on the iOS Home screen." and "Use this key if you want a product name that's longer than CFBundleName."
- CFBundleName: https://developer.apple.com/tutorials/data/documentation/bundleresources/information-property-list/cfbundlename.json (Nov 18, 4:10 AM). Quoted: "This name can contain up to 15 characters. The system may display it to users if CFBundleDisplayName isn't set."
- WidgetKit, Creating a widget extension: https://developer.apple.com/tutorials/data/documentation/widgetkit/creating-a-widget-extension.json (Nov 18, 4:11 AM). Quoted: "the modifiers specify the name and description shown in the widget gallery".
- App Store Connect help, App information: https://developer.apple.com/help/app-store-connect/reference/app-information/app-information (Nov 18, 4:10 AM). Quoted: "The name must be at least two characters and no more than 30 characters. You can edit it until you submit the app to App Review."
- App Store Connect help, Add a new app: https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app (Nov 18, 4:10 AM). Quoted: "You can use an app name for one app per localization."
- App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/ (saved Nov 1, 8:50 AM under T-0845, not refetched: 17 days old; read 2.3.7, 2.3.8, 4.1(c)). Re-reading it would need a stated reason under the saved-page rule.
- HIG Widgets: https://developer.apple.com/design/human-interface-guidelines/widgets.md (saved Nov 4 under T-1443; no mention of a label under a widget).
- HIG App icons: https://developer.apple.com/tutorials/data/design/human-interface-guidelines/app-icons.json (Nov 18, 4:11 AM; no mention of hiding labels).
- Not readable by the company: support.apple.com Home Screen pages (terms bar, tools/terms_guard.py).
- USPTO route: research/names/T-4693-names.md line 19.
{% endraw %}

</div>
