---
layout: "default"
title: "T-0797 names review: bound fields (T-0679), branch pernille/t0679-bound-fields at 43e10db36"
section: "documents"
description: "Overall: the shape is right; three names should change before T-0682 merges anything, one rule is a real bug, and I agree with the chair on Gauge. Nothing here blocks the branch staying parked."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0797-bound-fields-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/t0797-bound-fields-idris.md</code></span></div><h1>T-0797 names review: bound fields (T-0679), branch pernille/t0679-bound-fields at 43e10db36</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris, 2026-11-03. Independent of Maren's verdict, which I have not read. Read from `git diff main...pernille/t0679-bound-fields` and [`pywidget/docs/design/bound-fields.md`](bound-fields.html) s11 on main; nothing checked out in the main folder. I ran the branch's `pywidget_ui/__init__.py` from a scratch copy in `/tmp` against twelve calls (below); I did not run the branch's suites. Judged as the engineer who renders and ships these: Swift naming, WidgetKit fit, App Review, and what a Python user expects.

<span title="The final letter, after the caps.">Overall</span>: **the shape is right; three names should change before T-0682 merges anything, one rule is a real bug, and I agree with the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> on Gauge.** Nothing here blocks the branch staying <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>.

## Verdicts


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Verdicts, scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | Question (s11) | Verdict | Reason |
|---|---|---|---|
| 1 | `bind=` on `Text` and `ProgressView`; `bind` and `field` in the tree | **keep** | One-way data binding is the ordinary meaning (Kivy, Vue, WPF), and a string kwarg in a constructor will not be read as tkinter's event `bind`. Tree object `p.bind {field, format, style}` groups what the renderer needs in one place, and `content` stays required, so a build that does not know `bind` draws the fallback (checked at HEAD by Pernille, s0). Swift side: name the decoded type `TreeBind` or `BoundField`, never `Binding`, so the renderer never reads as SwiftUI's two-way `Binding`. |
| 2 | `Number.unit(suffix, fraction_digits=0)` and tree `{"style": "unit", "unit": ...}` | **change to `Number.suffix(text, fraction_digits=0)`, tree `{"style": "suffix", "suffix": ...}`** | It is a suffix, and the branch already calls the parameter `suffix` while the key is `unit`: one word, not two. "Unit" on the Swift side means Foundation's `Unit`/`Measurement`, which converts and localizes (km to mi, °C to °F); a later engineer "fixing" the case with `.measurement` would break "as written". It also keeps `unit` free for a real Measurement style later. If the team keeps `unit`, at least make the parameter `unit` too. Either way the Swift case appends the text verbatim to `TreeText.number`'s string (no `.measurement`, no trimming), and it lands in the same commit as the DSL: on the branch `ui.Text(3, format=ui.Number.unit(" min"))` builds today and the HEAD renderer draws "3". |
| 3 | The space: `" min"` writes its own space | **keep (literal), and fix the character rule** | Literal is one rule and `°` needs no escape; Maren decides, and I support literal. **Bug:** the DSL uses `str.isprintable()`, which refuses U+00A0 (no-break space) and U+202F (narrow no-break space); the schema pattern accepts both. Run on the branch: `Number.unit(" min")` and `Number.unit(" km")` raise ViewTreeError. Those are exactly the characters a careful user wants in a small widget so "12" and "min" never wrap apart, and U+202F is what Apple's own formatters put between number and unit in several locales [recalled]. Make the DSL refuse what the schema refuses (C0 controls and DEL; I would add U+2028/U+2029 to both), nothing more. Also count the 16 the same way on all three sides: Python `len` and the schema count scalars, Swift `String.count` counts graphemes; use `unicodeScalars.count` in the Swift check. (A ZWJ emoji is refused today only because U+200D is format class; with the fix it counts 5 scalars.) |
| 4 | Manifest `fetch` | **keep** | Says what happens: a network request. That matters for the privacy reading in s9: a person reading `pywidget.json` sees there is a request. Python users know the word from JS. No clash on the Swift side (the step calls `NetFetch.run`). App Review: a path from a closed JSONPath subset with no filters is data, not code (2.5.2); keep it that way, since `?()` filters would be expressions. |
| 5 | `fetch.fields` | **keep** | Keys are the names `bind` uses; values are paths. Reads right in the manifest. |
| 6 | `fetch.max_age_s` | **change to `max_age`** (seconds) | The tree already has `stale_after` in seconds with no suffix, T-0053's board line calls its own key `max_age`, and HTTP's `max-age` is seconds: Python and web users will expect the bare name to be seconds. One <span title="One product idea inside a lane. C1 is the lane&#x27;s first idea.">concept</span>, one spelling across the manifest and the tree. If the team prefers explicit units, then it is a rename of `stale_after` too, not a new convention for one key. |
| 7 | `sensors: ["steps"]` | **keep** | A closed list of bindable names that share the `fields` namespace, with `field_is_sensor` stopping a clash: clear. The prompt the person sees says Motion & Fitness, not "sensors"; the guide should use Apple's words for the permission. App Review: the Motion string has to be where the system looks for it (BF1); the name changes nothing there. |
| 8 | `fetch.json`, `data/` | **change to `data/<id>/fields.json`; keep `data/`** | The file <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> `steps` too (s4 example), which is not fetched. Name it for what it holds: the values of the declared fields. `data/<id>/` as the per-widget, extension-written folder is fine. |
| 9 | DRAFT <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> error texts | **ask (Maren owns the copy); four accuracy notes** | (a) `Number.unit takes 1 to 16 printable characters`: after the row 3 fix, "1 to 16 characters, no line breaks or control characters". (b) `bind takes a field name ... lower-case letters, digits and underscores, 32 at most`: omits the first-character rule; add "starting with a letter or underscore", and "at most 32 characters". (c) validate's `a Text binds string, number or date content`: reads as if the content is what is bound; say "a bound Text needs string, number or date content to show until the field has a value". (d) `Text bind takes style 'relative' and no other`, `format or style, not both`, `ProgressView bind needs a value to show until the field has one`, and the `accessibility_value` line: accurate, keep. The s2 refusal codes (`bad_fetch` ... `bound_in_lane`) are not on the branch; as codes they read fine. |
| 10 | Does `Gauge` join? | **keep the chair's answer: no Gauge bind (Ines, T-0798, 2026-10-30 14:35 item 3). I agree.** | Branch: `Gauge(0.5, bind="steps")` raises TypeError, as ruled. A smaller public surface was my own 08:03 objection. The cost to record for T-0682: on iOS a circular `ProgressView` with a value is not a ring [recalled; check before relying on it], so the steps premade's ring moves only through `Gauge`. If `steps` is built and that ring must move, Gauge is one additive row of the same shape (value clamped to `min...max`), and it goes back to the chair then, not now. |
| 11 | `style="relative"` only | **keep** | Matches the chair. `Text("--", bind="updated", style="relative")` builds; `style="time"` is refused with a clear text. `time` is one enum word later. |
| 12 | `location`'s key (T-0053) | **change: its own key, `"location": {"max_age": 900}`, not `sensors: ["location"]`** | (i) Everything in `sensors` is a bindable name; location is not bindable (s1), so `bind="location"` would pass the name check and draw the placeholder for ever. (ii) It needs its own parameter (T-0053's `max_age`), which a list entry cannot hold. (iii) Different target and gate: `NSWidgetWantsLocation` lives in a second extension that holds only location widgets, so the system prompts only for those (Apple's advice, L1-live-sensors.md, `NSWidgetWantsLocation` row [apple-page A4]); steps needs the Motion string. (iv) Location is the more sensitive declaration: its own key keeps the save check, the privacy reading and the App Review note per key. 900 is a placeholder; T-0053 sets the number. I own T-0053 and will write it this way unless the chair rules otherwise. |

</div>


## What I ran (scratch copy of the branch module, `/tmp`, Python 3)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: What I ran (scratch copy of the branch module, /tmp, Python 3), scrolls sideways" style="--tw:640px" markdown="1">

| Call | Result |
|---|---|
| `Number.unit(" min")`, `Number.unit("°", 1)` | built, text kept as written |
| `Number.unit(" min")`, `Number.unit(" km")` | **refused** (row 3) |
| `Text("--", bind="updated", style="relative")` | built, `bind.style = relative`, content stays string |
| `Text("--", bind="updated", style="time")`, `bind="Next"`, `ProgressView(bind="steps")` | refused, texts as quoted in row 9 |
| `ProgressView(0, total=10000, bind="steps")` | built |
| `Gauge(0.5, bind="steps")` | TypeError (no Gauge bind) |
| `Text(3, format=Number.unit(" min"))` | built, unbound; HEAD renderer would draw "3" (row 2) |

</div>


Not checked: the branch's 24 tests and 18 mutants, the Swift schema checker on the new rows, any device behaviour. Names only.
{% endraw %}

</div>
