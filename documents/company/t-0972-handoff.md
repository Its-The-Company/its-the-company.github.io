---
layout: "default"
title: "T-0972 handoff"
section: "documents"
description: "The line stays open. The Python slice is done; the Swift slice waits on Ines&#x27;s answer to step 1&#x27;s two points."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-0972-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 26 · Mon Nov 16</span><span><code>ops/plans/T-0972-handoff.md</code></span></div><h1>T-0972 handoff</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The line stays open. The Python slice is done; the Swift slice waits on Ines's answer to step 1's two points.

## Step 1 (contract s7 "Project run", Make App)
A pywidget.json written into a plain project changes nothing a person sees in today's build:
- the project screen lists `.py` files only (`ProjectStore.files(in:)`), and export zips `.py` files only (`ProjectTransfer`);
- the app's Documents are not shared to Files (no `UIFileSharingEnabled` in project.yml);
- no Swift code sends a `project` run request, so nothing opens from the Home Screen yet.

T-4656 (2026-11-17): the send writes no <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> key, so neither point below needs an answer for T-0972; they stay for the manifest ADR (T-4476). The two points as raised:
1. To carry `lane`, the file has to be a full s7 manifest (schema, version, a new id, a name, an entry): `LaneEntry.entry(inManifest:)` and `app_manifest.read` both need them. When the Home Screen open lands, every project that was ever sent becomes openable from it, under the folder's name. Also, a project with two widget scripts would change `entry` on each send.
2. ADR-001's Project row: "a tested migration of existing projects ... an app update never changes a person's copy silently", and the manifest belongs to the unwritten manifest ADR (T-4476). A send that writes the file is that kind of silent change.

## Done
- `lane.send_lane(source, filename, typed)` in pywidget/ios/App/Runtime/_pywidget_runtime/lane.py returns `{lane, name, line}` (T-4656 took out `write`: the send reads the person's key and never writes it). The rules, by case:
  - clean: `widget`;
  - a refused import or an app-only one (`APP_ONLY_SUBMODULES`: pywidget.device.location, pywidget.device.pedometer): `app` and one line;
  - a typed lane: read, never changed;
  - typed `widget` over a refused import: the line, and the lane is `app`, so no mirror;
  - typed `app`: no line;
  - a SyntaxError: `app`, no line.
- Tests: `SendLaneTests` in pywidget/tests/bridge/test_lane.py (12; T-4656 added a refused-import send then a clean one, which ends in `widget` with the project folder unchanged). One of them holds `DENIED_SUBMODULES | APP_ONLY_SUBMODULES` equal to `LaneDeviceRouter.appOnlyModules`.
- The draft line, for Maren: `MESSAGES[CODE_SEND]` in lane.py.

## Left (the Swift slice, about 4 h)
1. Run `send_lane` on the app's Python. The send is synchronous on the main actor, and no app-side call outside a run exists except EditorTooling's worker (jedi). Add a job kind there, or a small worker of the same shape. Never take the GIL on the main thread: a run can hold it.
2. The send writes no lane key (T-4656, from T-4598 M1). It reads the project's pywidget.json `lane`, if any, and passes it as `typed`; it never writes pywidget.json. A written `app` came back on the next send as typed, so a script whose refused import was removed stayed in the app for good with no line. Since 6d64e84bfe (T-4494) no key already means the widget lane, so writing `widget` changed nothing either. The lane a send decides lasts that send only; the next send decides again from the new text.
3. LaneMirror.plan takes the send's lane as a second input: `app` plans what a typed non-`widget` key plans today (`.remove` if lane-scripts/<id>/ exists, else `.keep`), even over a typed `widget`. ConsoleModel says the line once, as it does for `lastWidgetRefusal`.
   Do T-4494's "every sent script mirrors" and T-0972's "no mirror over a refused import" agree? Not as the code stands: `LaneMirror.plan` reads only the key, so a refused import with no key mirrors and starts in the widget, and a typed `widget` over one mirrors too. They agree once this item lands, because both are per-send rules and neither is stored: T-4494's rule becomes "every sent script mirrors unless its key or this send's scan keeps it out", and its "new text sends it back" holds, since a clean resend gets `widget` and mirrors. Until then nothing breaks: the extension's finder refuses the import on the first run and T-4280 moves the widget to the app; the item saves that one failed run and gives the line at send time.
4. Swift tests: clean, banned, typed, app-only and no-manifest projects. Plus one two-send test through `WidgetScriptSave` (T-4819, from T-4759 M1), `testRefusedImportThenCleanSendPlansNoMirrorThenPutAndWritesNothing` in WidgetScriptSaveTests: one project sent with a refused import, then sent clean, plans no mirror and then a mirror (`.put`), and its pywidget.json (absent; present with no `lane`) is the same bytes after both sends. `send_lane` has no project path and does no file I/O, so only this test can fail if the Swift send ever stores a lane again. Then a Simulator send of a new project that reaches scripts/<id>/ and lane-scripts/<id>/ and runs with the flag forced on. Then `-only-testing:PyWidgetTests` once through tools/xc.sh.
{% endraw %}

</div>
