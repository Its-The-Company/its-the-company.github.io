---
layout: "default"
title: "T-0797 names review, bound fields: Maren"
section: "documents"
description: "Nothing merges from this; the branch waits for T-0682. These are verdicts on names and words only."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0797-bound-fields-maren.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/t0797-bound-fields-maren.md</code></span></div><h1>T-0797 names review, bound fields: Maren</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-03 21:07 ET. <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">Blind</span> to Idris's verdict. Read: branch `pernille/t0679-bound-fields` (`git diff main...`: `pywidget_ui/__init__.py`, `.pyi`, `API.md`, `viewtree.schema.json`), main's pywidget/docs/design/bound-fields.md s11, creative/approved.md, and for precedent `pywidget.device.location.sample(max_age=)`, `app_manifest.py`'s texts, API.md's naming rule.

Nothing merges from this; the branch waits for T-0682. These are verdicts on names and words only.

## Verdicts


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Verdicts, scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | Question (s11) | Verdict | Reason |
|---|---|---|---|
| 1 | `bind` on `Text` and `ProgressView` | **keep** | Short, reads as a verb at the call site (`ui.Text("--", bind="next")`), and the first error already says what it takes ("a field name from pywidget.json"). Not a SwiftUI name, but neither are `Updated` or `RefreshButton`; the naming rule covers schema names that exist in SwiftUI. The SwiftUI reader may think of a two-way `Binding`; the guide's first line should say "one way, from the feed". |
| 2 | `bind` and `field` in the tree (`p.bind.field`) | **keep** | One object leaves room for `format`/`style` beside the name; `field` matches the manifest's `fields`. |
| 3 | `Number.unit(suffix, fraction_digits=0)` | **change to `Number.suffix(text, fraction_digits=0)`**, tree `{"style": "suffix", "suffix": ...}` | It is not a unit: no conversion, no plural, not translated (its own docstring says so). A Swift-minded writer reads `unit` as `Measurement`/`UnitDuration` and expects "12 Min." in German; `suffix` promises exactly what it does. The argument is already called `suffix`. If the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> keeps `unit`, row 4 and row 5 still apply. |
| 4 | Its space: `(" min")` writes its own space | **keep: literal, the writer types the space** | One rule, no escape. `°`, `%`, `×`, `k` take none; French and German want "21 °C" or a narrow no-break space; only the writer knows. The docstring's two examples (`" min"` -> "12 min", `"°"` -> "21°") are the right ones to show. |
| 5 | Characters `Number.unit` accepts | **change** | Python refuses what the schema accepts. `str.isprintable()` is False for U+00A0 and U+202F (checked: `' min'`, `' min'`, `' h'` all False), and for U+200D, so `" min"` (keeps "12 min" on one line in a narrow widget) and any joined emoji are refused by the DSL while `viewtree.schema.json` (`^[^\u0000-\u001f\u007f]{1,16}$`) accepts them. Use the schema's rule in Python (refuse C0 controls and DEL, plus line and paragraph separators), and refuse a suffix that is only spaces in both. |
| 6 | Manifest `fetch` | **keep** | Says that the network is involved, which is the thing a reader of `pywidget.json` should notice first (privacy, s9). Noun-usable ("one fetch per `max_age`"). |
| 7 | Manifest `fields` | **keep**, with one text fix outside the branch | Plural of the tree's `field`; reads right. But `app_manifest.py`'s existing `duplicate_key` text says "names the same field twice", meaning a JSON key. Once `fields` exists that word means a bound field. At T-0682, change that text to "...names the same key twice." (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> DRAFT, mine to approve as wording). |
| 8 | Manifest `max_age_s` | **change to `max_age`** (seconds) | The public API already has the same idea under that name: `pywidget.device.location.sample(max_age=120)`, "a fix younger than `max_age` seconds is used without waking GPS", and T-0053's board line uses `max_age` for the location declaration. Every other public duration is seconds with no suffix (`stale_after`, `Widget.action(timeout=2.0)`). `budget_s` is wire-only. Two spellings of one idea is the inconsistency people notice. |
| 9 | Manifest `sensors: ["steps"]` | **keep** | Plain word, closed list, room for one more. The shared namespace (a field may not be called `steps`) is the right call, since `bind="steps"` must mean one thing; the `field_is_sensor` text should name both places: "`steps` is a sensor in this pywidget.json, so a fetch field can't use that name." |
| 10 | `location`'s key (Idris's question; my read only) | **ask Idris; my lean: its own top-level key `location`, not `sensors: ["location"]`** | `sensors` is the bindable set: every word in it is a name `bind` can use. A word in it that `bind` refuses breaks that one rule. Location has its own prompt, its own extension key (`NSWidgetWantsLocation`), its own file (`location/last.json`) and its own label question, so it reads better as its own declaration. T-0053's line already says "widgets whose manifest declares `location`". Value shape (`true` or an object with `max_age`) is Idris's. |
| 11 | `Gauge` joins | **keep the chair's ruling: no Gauge bind** (I do not disagree) | One condition for the product, not the API: on a widget, a bound number beside an unbound ring that shows the same quantity contradicts itself, and that costs trust in three seconds. So if T-0682 ships `steps`, the steps premade is redrawn so every mark of the step count is bound (`ProgressView` ring style, or the ring dropped), and the guide says: a `Gauge` or `Path` showing a bound value will not move. No change to the branch. |
| 12 | `style="relative"` only | **keep** | Matches the chair's list; `"time"` is one enum word later. |
| 13 | `fetch.json`, `data/` | **keep** | Internal file names; nobody types them. `data/<id>/` sits well beside `widgets/<id>/`. |

</div>


## DRAFT C51 texts (developer-facing; they stay DRAFT until approved)

House voice for these, from the texts already on main (`Text time_zone is for a datetime, ...; pass a datetime or remove time_zone`): name the parameter, say what is wrong in plain words, then the fix. Most of the branch's texts do the first two; four miss the fix or use a word a reader has to decode.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: DRAFT C51 texts (developer-facing; they stay DRAFT until approved), scrolls sideways" style="--tw:846px" markdown="1">

| Text on the branch | Verdict | Proposed |
|---|---|---|
| `Number.unit takes 1 to %d printable characters, got %r` | change (with rows 3 and 5) | `Number.suffix takes 1 to 16 characters, no line breaks or control characters, got %r` |
| `bind takes a field name from pywidget.json: lower-case letters, digits and underscores, 32 at most, got %r` | change | `bind takes a field name from pywidget.json: up to 32 lower-case letters, digits and underscores, not starting with a digit, got %r` (`"2nd"` is refused today and the text does not say why) |
| `Text bind does not take time_zone; a bound time is drawn in the phone's zone` | change | `Text bind does not take time_zone: a bound time is shown in the phone's time zone. Remove time_zone.` ("the phone's zone" makes the reader stop.) |
| `Text bind takes style 'relative' and no other, got %r` | change | `Text bind takes style="relative" (time since the field's date) or no style, got %r` |
| `Text bind takes format or style, not both: a field is drawn as a number or as a time` | keep | |
| `Text format takes ui.Number.decimal, percent, currency or unit, got %r` | keep (`suffix` if row 3) | |
| `ProgressView bind needs a value to show until the field has one` | change | `ProgressView bind needs a value to show until the field has one, such as value=0` |
| validate: `only Text and ProgressView take bind, not %s` | keep | |
| validate: `must be an object with a field` | keep | |
| validate: `a ProgressView binds its value, so it needs one and no timer` | keep | |
| validate: `a Text binds string, number or date content` | change | `a bound Text needs string, number or date content` |
| validate: `accessibility_value would go out of date; a bound node speaks its own value` | change | `accessibility_value would go out of date; VoiceOver reads the bound value instead` |
| docstring of `Number.unit` | keep (rename with row 3) | |

</div>


**Not on the branch, needed before T-0682 ships:** texts for the eight manifest codes in s2 (`bad_fetch` ... `bound_in_lane`) and the run-time `error` codes that Activity shows (`offline`, `http_status` and the rest). They are person-facing, so they follow `app_manifest.py`'s voice ("This project's pywidget.json ..."), and they come to me as DRAFT before the build lands.

## Open

- Row 5 is a mismatch between the DSL and the schema, not only a naming point; it is the one item I would not let merge as is.
- Rows 3 and 8 change public names; if Idris disagrees, the chair rules.
{% endraw %}

</div>
