---
layout: "default"
title: "Bound fields: the spec for the contingency"
section: "documents"
description: "One sentence. The person&#x27;s manifest names one public JSON URL and the fields to pull from it; on each reload the widget extension fetches it with no Python, keeps those few values in data/&lt;id&gt;/fetch.json, and the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/bound-fields.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 9 · Fri Oct 30</span><span><code>pywidget/docs/design/bound-fields.md</code></span></div><h1>Bound fields: the spec for the contingency</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-10-30, T-0679. Status: **spec finished; names not yet reviewed.** Nothing here is built. The build is T-0682, held until T-0680's verdict: it starts only if the extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> fails its gates after one cut and re-run (ADR-007 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 2026-10-29 08:03, items 3 ii and 6). If the lane passes, none of this ships in 1.0.

**One sentence.** The person's manifest names one public JSON URL and the fields to pull from it; on each reload the widget extension fetches it with no Python, keeps those few values in `data/<id>/fetch.json`, and the renderer puts them into the `Text` and `ProgressView` nodes marked `bind`, so those numbers can move without the app running. Everything else in the picture stays as old as the last app run.

**What it is not.** It cannot compute: no arithmetic, no conditions, no colour that turns red at 10 minutes. A feed that needs more than a path is the lane's job or the app lane's. No statement here says how often a reload comes; that belongs to Apple's budget and to item 7 of the 08:03 session.

## 0. What exists at HEAD (6e5a6907), checked in the code


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 0. What exists at HEAD (6e5a6907), checked in the code, scrolls sideways" style="--tw:960px" markdown="1">

| Thing | At HEAD | Consequence |
|---|---|---|
| `ProgressBar` (the 08:03 line and the board say this) | **No such name.** The node and the DSL class are `ProgressView` | `bind` goes on `ProgressView`; the words in the ADR are a slip |
| `pywidget.json` | Real: `app_manifest.py`, schema `pywidget.app`, unknown keys kept (`Manifest.extra`) | `fetch` and `sensors` live there, read the way `lane.lane_of` reads `lane`. `manifest.schema.json` is Odalys's L12 marketplace draft with `additionalProperties: false`; nothing reads it, and this spec does not touch it |
| `lane` in `app-manifest.schema.json` | Absent; the key is in `lane.py` only | Same treatment for `fetch` and `sensors`: the fragment in s2 is the contract, and T-0682 adds it with `lane` |
| `data/<id>/` | Named only in my 10-30 view. Not in ADR-007 5.2's layout, not in code | New. Needs the ADR-007 line in s10 |
| `NetFetch` (`Shared/`) | Real: https only, 5 redirects, ephemeral session, 3 s and 256 KiB in the extension, host-only errors, tested on a `URLProtocol` stub | The step calls it. No second network path |
| `NetFetch` run from inside the extension | **Not run.** T-0687 (a) waits on T-0675's bridge | Unverified, s7 |
| `PedometerCall` | Real, app only (`DeviceRouter`, `App/Device/`) | The query must move to Shared or be rewritten for the extension |
| Second widget extension | **Does not exist.** `project.yml` has one `app-extension` target; T-0053 is open; no `NSWidgetWantsLocation` | `sensors` depends on a target nobody has built. See s10 |
| App Group mirror of the manifest | `scripts/<id>/` exists as the scripts' shared folder (`FilesCall`). The save-time mirror of T-0675 is not built, and it covers `lane: widget` only | T-0682 widens the mirror, s5 |
| Bound trees against the HEAD schema | Run: a tree with `p.bind` on `Text` and `ProgressView` gives 0 problems (`schema_check.py`, HEAD schema) | The row is additive. A build without it draws `content` |
| Renderer on an unknown number style | `TreeText.number` falls to plain decimal, no suffix | `Number.unit` needs its Swift case before any tree uses it |

</div>


## 1. Scope

In: the two manifest keys, the `bind` attribute and its formats, the file the extension writes, the reload steps, the stale rule, the gates. Out: a Python API that reads `fetch.json`, more than one URL per widget, headers or POST, any computed value, `Gauge` and `Path` (open item in s11), location as a bound value.

## 2. The manifest

Two more keys in `pywidget.json`, beside `lane`, in schema `pywidget.app` version 1:

```json
{
  "fetch": {
    "url": "https://api.example.com/departures?stop=4021",
    "fields": {"next": "$.arrivals[0].minutes", "line": "$.arrivals[0].route"},
    "max_age_s": 600
  },
  "sensors": ["steps"]
}
```


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. The manifest, scrolls sideways" style="--tw:960px" markdown="1">

| Key | Rule | Why |
|---|---|---|
| `fetch.url` | `https://`, at most 2,048 bytes, same check as `NetFetch.parse`. A literal: **no templating of any kind** | Nothing from the device can reach a URL through this path, s9 |
| `fetch.fields` | 1 to 8 entries. Key: `^[a-z_][a-z0-9_]{0,31}$`. Value: a path, below | A small <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> keeps `fetch.json` small; 8 is my number, not a measurement |
| `fetch.max_age_s` | Integer, 60 to 86,400 | Precedent is T-0053's `max_age`: younger than this and no request is made. It also sets when a value counts as stale (s6). It is not a schedule |
| `sensors` | Unique list from a closed set; `["steps"]` is the set | A later sensor is one enum word and one gate |
| A field named `steps` while `sensors` <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> `steps` | Refused | Fields and sensors share one namespace, so `bind="steps"` means one thing |
| `lane: widget` with `fetch` or `sensors` | Refused at save | Such a script has `net.get` and the pedometer. Two routes to one number is a bug farm |

</div>


Both keys are optional. Neither alone changes any other behaviour.

**Path grammar.** A strict subset of JSONPath, chosen so that a Swift reader and a Python checker fit in a few dozen lines with one fixture file:

```
^\$(\.[A-Za-z_][A-Za-z0-9_]*|\[(0|[1-9][0-9]{0,5})\]|\['[^'\\\u0000-\u001f]{1,64}'\])+$
```

So `$.a.b`, `$.a[0].b`, `$['odd-key'].b`; at most 128 bytes. Not supported: `*`, `..`, filters, slices, negative indexes, a bare `$`. Every path that passes means the same in RFC 9535 [recalled; the RFC was not read for this spec]. No evaluator, so nothing to review as code.

**Refusals.** At save (`strict`, as `lane_of`), a stable code and a plain message: `bad_fetch`, `bad_fetch_url`, `bad_field_name`, `bad_field_path`, `bad_max_age`, `bad_sensors`, `field_is_sensor`, `bound_in_lane`. At run time in the extension the check is the same and the outcome is quiet: a bad block means no step, and the widget draws its `content`.

**Name check against the tree.** A `bind` that names no declared field is a typo that would show the placeholder for ever. The app run refuses it after the tree is built, as a `schema_error`, naming the node's file and line (the node's `_site`). `pywidget_ui.validate` cannot do this: the document does not hold the manifest.

## 3. The tree and the DSL

```python
ui.Text("--", bind="next", format=ui.Number.unit(" min"))     # "12 min"
ui.Text("--", bind="temp", format=ui.Number.decimal(1))        # "21.5"
ui.Text("--", bind="updated", style="relative")                # time since it, ticks by itself
ui.Text("--", bind="line")                                     # "42", as text
ui.ProgressView(0, total=10000, bind="steps")
```

Tree: `p.bind` beside `content`, never instead of it.

```json
{"t": "Text", "p": {"content": {"kind": "string", "value": "--"},
                    "bind": {"field": "next", "format": {"style": "unit", "unit": " min", "fractionDigits": 0}}}}
{"t": "ProgressView", "p": {"value": 0, "total": 10000, "bind": {"field": "steps"}}}
```

Why this shape and not a new content kind: `content` stays required, so the node always has something honest to draw before the first fetch, and a build that does not know `bind` draws it (checked at HEAD, s0). `--` is better than `0 min`: a placeholder is not a claim. That is also why `format` lives in `bind` and not only on the fallback.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3. The tree and the DSL, scrolls sideways" style="--tw:909px" markdown="1">

| `bind` holds | The field's JSON value | Drawn as |
|---|---|---|
| `format` (decimal, percent, currency) | number, or a string of the form `-?[0-9]+(\.[0-9]+)?` | The existing `TreeText.number` path |
| `format` (`unit`) | same | That number, then the text exactly as written, 1 to 16 characters. `" min"` keeps its space, `"°"` has none. The number follows the locale; the text is not translated |
| `style: "relative"` | ISO 8601 with a zone, or Unix seconds | `Text(date, style: .relative)`, the same path as a date `Text`; the system ticks it, no reload needed |
| neither | string, or number | The string verbatim (`Text(verbatim:)`: a feed is not markdown or a localization key), at most 256 scalars, then cut; a number by the plain decimal path |
| `ProgressView` | number or numeric string | Replaces `value`, clamped to 0...`total` |

</div>


A value of the wrong type, `null`, a bool, an object or an array counts as missing (s6). No millisecond guess: a 13-digit "date" is a wrong date, so it is refused as `bad_value`, not divided.

**DSL rules.** `bind` takes a field name. `Text`: `format` or `style="relative"`, not both; `time_zone` refused (a bound time is in the phone's zone); a `datetime` fallback implies `style="relative"`. `ProgressView`: `value` required (it is the fallback), no `.timer` form. `Text.timer`, `Text` state content and every other node take no `bind`. `accessibility_value` on a bound node is refused: a fixed string would go out of date beside a moving number. The renderer speaks the value it drew.

## 4. `data/<id>/fetch.json`

`<id>` is the id of `widgets/<id>/`. New top-level folder in the App Group.

```json
{
  "schema": "pywidget.fetch", "version": 1,
  "declared": {"url": "...", "fields": {"next": "$.arrivals[0].minutes"}, "max_age_s": 600},
  "attempted_at": "2026-11-20T14:05:00Z",
  "fetched_at": "2026-11-20T14:05:00Z",
  "error": null,
  "fields": {
    "next":  {"value": 7, "at": "2026-11-20T14:05:00Z"},
    "steps": {"value": 4210, "at": "2026-11-20T14:05:00Z", "until": "2026-11-21T05:00:00Z"}
  }
}
```

- **Holds the declared values and nothing else.** The body is dropped after the paths are read. Timestamps are in the JSON, so no file-timestamp API is called for this (no new required-reason code).
- **`declared`** is a copy of the block in force. If it differs from the mirror's (the person changed the URL), the file counts as empty: an old feed's number never appears under a new URL.
- **`attempted_at`, `fetched_at`**: the last request of any outcome, and the last that gave a 2xx JSON body. Step 4 of s5 reads both.
- **`error`** is one code or null: `offline`, `timeout`, `http_status`, `too_large`, `tls`, `not_json`, `bad_value`, `no_permission`, `unavailable`. Never a URL, path or query (NetFetch's rule). The app shows it in Activity.
- **`until`**: a sensor's day ends. Steps "today" expire at the next local midnight, and the value is then gone, not stale (s6). Without this a Tuesday morning shows Monday's total.
- **Writers.** The reloading extension, and on iOS 27+ the app if the Refresh intent is pinned to `.main` (08:03 item 2). Atomic per ADR-007 5.2 (temp, `fsync`, `rename`). A field whose `at` is newer than the writer's is kept. No `flock`: this is a cache, and a lost write costs one refresh.
- **Creation and removal.** The extension creates `data/<id>/` (unlike `widgets/<id>/`, which it may never create). The app removes `data/<id>/` in the same step that moves a widget to `.trash`; a restored widget refetches. Deleting a widget must leave no step count behind.
- **Size.** 8 fields of 256 scalars and the declared block: a few KiB, by arithmetic.

## 5. One reload

In `getTimeline`, with the lane flag off. Never a failure path: any step that fails falls through to step 7.

1. No `tree.json`: T6 as today, no step.
2. Read the manifest from the App Group mirror. T-0682 widens T-0675's rule: the app mirrors every widget with `fetch` or `sensors`, not only `lane: widget`, in the same directory `rename`. Missing or bad: step 7.
3. Load `fetch.json`; apply the `declared` rule.
4. A fetch is due if `fetched_at` is absent, or `max_age_s` old or more, or in the future (a moved clock), and `attempted_at` is at least 60 s old. A path that misses does not make it due again, so one broken path cannot cost a request on every reload.
5. In parallel, under one wall-clock limit of 3 s (`NetFetch.extensionTimeoutCap`): the fetch through `NetFetch.run` with the extension's limits and no added headers; the `steps` query for widgets that declare it, only if `CMPedometer.isStepCountingAvailable()` and `authorizationStatus` is authorized. A status outside 200-299 is `http_status`. A body that is not a JSON object or array is `not_json`. A path that misses leaves that field's old value and its old `at`, and the other fields update.
6. Write `fetch.json` if anything changed.
7. Resolve the bound values once, into the timeline entries. The renderer reads no file. Build entries as ADR-007 7.4, adding s6's stale and `until` entries.

**Refresh button.** T-0678's intent runs steps 2 to 6 with `force`, which skips step 4's test. The reload after it finds a young value and makes no request, so a tap costs one request. If it fails, `attempted_at` stops that reload repeating it inside 60 s.

**In-app preview.** Draws `content`. The app does not fetch for the preview.

**Widget instances.** The cache is per id, so two placed copies share one file and, inside `max_age_s`, one request.

## 6. Missing and stale


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 6. Missing and stale, scrolls sideways" style="--tw:571px" markdown="1">

| State of the field | Drawn | Mark |
|---|---|---|
| Never had a value, or the `declared` rule cleared it | `content` | Tree clock only |
| Has a value, younger than its age limit | The value | Tree clock only |
| Has a value, at or past its age limit (fetch failed, or no reload came) | The last value | **Stale mark** |
| Past `until` | `content` | Tree clock only |

</div>


A field's age limit is `max_age_s`; for `steps`, a constant `SENSOR_MAX_AGE_S` = 3,600 (L1's default for steps; tune from T-0680, not a measurement).

**Two clocks, earliest wins.** T(tree) = `sampled_at + stale_after`, unchanged (ADR-007 7.4). T(field) = the earliest `at + limit` among fields this tree binds and that have a value. The provider uses `min(T(tree), T(field))`, and inserts its synthetic entry there, and one more at each `until`. `When("stale")` resolves to the same flag. Threat-model floor (16:54 line, 2a): a stale picture always carries its mark.

So a widget whose only moving parts are bound leaves `stale_after` unset, or its 30-minute template clock marks fresh numbers stale. The New-widget template needs a bound variant if T-0682 ships.

**Rejected: newest wins between `content` and the field.** It sounds right and it is wrong: every app run would write a newer tree, so a `--` placeholder would beat a good value until the next fetch. A field with a value always wins.

## 7. Which facts are which


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 7. Which facts are which, scrolls sideways" style="--tw:960px" markdown="1">

| Fact | Status | Source |
|---|---|---|
| A bound tree passes the HEAD schema; the branch schema accepts bound trees and refuses 4 bad ones in the Swift checker too | **Measured** | `schema_check.py`; `swift test` on `ViewTreeSchema`, 2026-10-30, a throwaway test not kept |
| `net.get` in the app process, extension limits, stub body: peak 4.19 MiB above the call, largest of 37 cold samples, not a bound | **Measured, not in the extension, no real network** | C2 s6a, T-0691, T-0698 |
| `CMPedometer.h` has no `NS_EXTENSION_UNAVAILABLE` (grep count 0, iOS 27.1 SDK); the query "is available for up to 7 days", "computed from a system-wide history that is continuously being collected in the background", "returned on a serial queue" | **Apple source** | SDK header, read 2026-10-30 |
| `isStepCountingAvailable`, `authorizationStatus` (iOS 11+) exist | **Apple source** | Same header |
| "Collect" means transmitting off the device so that you or partners can access it longer than needed to serve the request; on-device processing is not disclosed | **Apple source** | matrix s1d A1, privacy-label.md s0a |
| Whether `CMPedometer` answers inside any extension | **Unverified** | T-0011 |
| Whether a Motion prompt can come from an extension, and whether that extension needs its own `NSMotionUsageDescription` (the key is in the app's Info.plist only) | **Unverified** | T-0011 |
| Whether a pedometer query works with the phone locked | **Unverified** | L1 open list |
| Whether the extension's `URLSession` call finishes inside 3 s on cellular | **Unverified** | 08:03 item 5.6 |
| How long `getTimeline` may wait before the system ends it | **Unverified**; Apple publishes no number; `getTimeline` halt time is unmeasured | 08:03 item 5.4 |
| Memory of `JSONSerialization` on a 256 KiB body in the extension | **Unverified**; "a few hundred KB" in my 10-30 view was a guess, and this replaces it | T-0696 covers the fetch, not the parse |
| Whether the extension can write the App Group file before first unlock, and after it while locked | **Unverified** | None in the repo |
| RFC 9535 subset claim | **Unverified** [recalled] | Not read |
| How often any reload happens | **Not claimed here** | 08:03 item 5.7 |

</div>


## 8. Device gates

BF1-BF3 need no bound-fields code and belong in T-0680's one session: they are items already on its list or a two-line addition to it. BF4-BF7 need T-0682's build, so they are a second session, on the same phone, before the release candidate. Nothing ships on a Simulator pass.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 8. Device gates, scrolls sideways" style="--tw:783px" markdown="1">

| Gate | Check | Fail means |
|---|---|---|
| BF1 (T-0011, 5.6) | `CMPedometer` query answers inside the second extension; Motion prompt comes from that extension or the rule for it is learned; footprint recorded | `sensors` drops from the build; `fetch` stands alone |
| BF2 (5.6) | A real `URLSession` GET completes over cellular inside 3 s in the extension | Raise the limit if BF3 allows; if not, `fetch` is not worth building |
| BF3 (5.4) | `getTimeline` halt time known; 3 s plus the render fits under it | Lower the limit |
| BF4 | Peak with a real 256 KiB JSON body: fetch, parse, paths, write. Against 0.5 C with B, same rule as <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span> | Lower `Limits.widgetExtension` for this step |
| BF5 | Reload with the phone locked, after and before first unlock: the write, the read, the old value and its mark | Skip the write; last value stands |
| BF6 | No network: the value stays, the stale mark arrives at the right time, Activity shows `offline` | Bug, fix before release |
| BF7 | Midnight rolls over with no reload: `until` entry fires; `content` draws | Bug, fix before release |

</div>


## 9. Privacy, App Review, Commandment 6

**Label: no change.** "Data Not Collected" stands, on the existing reading, if these stay true.

- A fetch is a request the person wrote, to a server the person chose. privacy-label.md s3 covers this: it does not change the label, and it belongs in the privacy policy's "Your scripts and the network", which already says so. Apple's page is silent on user-chosen servers (s0a item 6), so this is our reading, not Apple's ruling, as there.
- The person's IP address and `User-Agent: PyWidget-iOS` reach that server. Nothing else: ephemeral session, no cookie, no cache, no added header.
- **`url` is a literal, so steps and location cannot leave through this path.** Steps stay in `fetch.json` on the device (condition 6). If a later version templates the URL, this section is reopened before anything else.
- `fetch.json` holds only the declared values and goes when the widget goes.
- `url` sits as plain text in `pywidget.json`, its mirror and `fetch.json`. The shape has no headers, so it is for public URLs. A key put in a query string is not protected. If this ships the guide must say so; the route for a secret is a script using `pywidget.keychain`.

**A premade that declares `fetch` is a different case.** Then the company chose the server. Condition 5 needs a fresh answer, that provider's terms need the Commandment 6 check, and `tools/terms_guard.py` gets a row. No premade declares `fetch` under this spec.

**Commandment 6, the rest.** The app ships no URL list and does not crawl: one public URL per widget, the person's own request. At most one request per `max_age_s` (floor 60 s) while it succeeds, at most one a minute while it fails, plus taps. A 429 is `http_status`; the old value stays and nothing retries before the next reload.

**App Review.** No code runs in the extension and a path is not code. L20 row 6 rates this low on the Ruling 2 precedent. `CMPedometer` with no Motion string in the right place would be a rejection, which is why BF1 asks.

## 10. What lands where, and what T-0682 inherits

**Main now:** this file and one dated row in ADR-002. Docs only.

**Branch `pernille/t0679-bound-fields`, pushed, not merged:** `viewtree.schema.json` (`numberFormat`, `fieldName`, `textBind`, the `Text` and `ProgressView` rows), `pywidget_ui` (`bind`, `Number.unit`, `validate`), `__init__.pyi`, API.md rows, `tests/dsl/test_bind.py` (24 tests). Host suites on the branch: 2,242 tests on 3.9 and 3.13, 0 failed suites. 18 seeded mutants, 18 killed: one survived the first run because a test was too loose, and the test was tightened.

**Why it is off main, and stays off.** Alpha rows A4 to A6 run the bundled schema (`RunResultSink`, `ViewTreeSchema`) and `pywidget_ui`, so this change would sit under the alpha commit: code freeze applies. **The freeze lifting does not change the answer.** A public `bind=` that nothing fills is a parameter that does nothing, and `Number.unit` draws without its suffix until Swift has the case. Idris's objection, accepted at 08:03 item 3, is a public surface kept for ever for a path Python covers. So the branch merges **only when T-0682 starts**, and if the lane passes it does not merge in 1.0. It will drift; rebasing it is part of T-0682.

**T-0682's real size.** The 3-day build in 08:03 item 3 rests on my 10-30 view, which said the pedometer waits on T-0011 and priced no target. (a) `fetch` alone, in the current extension: 3 days stands, plus my half-day for the manifest check and the name check. (b) `sensors` needs the second extension, and T-0053 has not built it. If it is missing when T-0682 starts, `steps` costs that target as well, not estimated here. `fetch` can ship without `steps`.

**ADR-007 needs one dated line before T-0682 writes anything.** Amendment 2 item 1 says the extension writes only `wants-run`, `location/last.json` and `state.json`. `data/<id>/fetch.json` joins that list, with `data/` in the 5.2 layout. That line is the chair's.

**ADR-002 ruling 6:** after the Day 21 feature freeze a format change needs a dated line. The row in ADR-002 is it, if the build happens.

## 11. For the names review

Idris and Maren, as usual. Reviewers get the branch, not my reasoning. The names:

- `bind` on `Text` and `ProgressView`, `Number.unit(suffix, fraction_digits=0)`; `bind` and `field` in the tree; `fetch`, `fields`, `max_age_s`, `sensors` in the manifest; `fetch.json`, `data/`.
- `Number.unit(" min")` writes its own space. Literal and one rule, against `Number.unit("min")` adding a space and needing an escape for `°`. Maren decides.
- All new error texts are DRAFT under <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>, for Maren.
- **Gauge.** The steps premade's tree has 2 `Gauge`, 5 `Path`, 2 `ProgressView`. `bind` reaches only the last of those: the ring and the week chart would not move. The chair's line says `Text` and `ProgressView`. `Gauge` is one more row if the reviewers and the chair want it; `Path` is computed geometry and cannot be bound.
- `style` is `relative` only, as the chair listed. `time` ("next at 14:05") is one enum word.
- T-0053's `location` declaration has no key yet. Should it be `sensors: ["location"]` with no bindable value, or its own key? Idris.
{% endraw %}

</div>
