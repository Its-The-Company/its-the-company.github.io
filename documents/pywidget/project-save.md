---
layout: "default"
title: "What a project save does for its widgets (T-0866)"
section: "documents"
description: "The rule. A project saves as one thing. At a boundary, if anything in it changed, every Widget part in it gets the whole project, then one refresh. When a widget can&#x27;t show that work, the person gets a word in the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/project-save.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 11 · Sun Nov 1</span><span><code>pywidget/docs/design/ide/project-save.md</code></span></div><h1>What a project save does for its widgets (T-0866)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-01. For Idris to build. Strings DRAFT <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>. Layout and colour stay in the approved tokens. Read at HEAD 1ba3b63c, by reading only; nothing here was run.

This builds spec.md s5.11.7, my rule of 2026-10-31 (b72f6458), and wins where the two differ. Reading the code again found three things that rule missed:

- `status.json` does not exist. Only comments name it (RunResultSink.swift:9, :119). s5.11.7 item 7 reads a file nobody writes.
- Nothing asks iOS for time after leaving the app (0 `beginBackgroundTask` in pywidget/ios). The likeliest route is edit, swipe Home, look at the widget, and on that route the refresh can be cut off.
- Data files travelling with the project can land on the widget's own run files. A project's `tree.json` would replace the widget's tree.

**The rule.** A project saves as one thing. At a boundary, if anything in it changed, every Widget part in it gets the whole project, then one refresh. When a widget can't show that work, the person gets a word in the editor and the widget carries a mark. It never shows old work bare.

## 1. The four cases


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. The four cases, scrolls sideways" style="--tw:825px" markdown="1">

| Case | What the person sees | What the app does |
|---|---|---|
| **1. Saved only a sibling** | They leave the editor and every widget in the project draws the new work. No toast and no tap: success is the widget changing. | The list in s2 differs, so every Widget part is sent, not only the open file's. |
| **2. Removed a sibling** | The file is gone from the widget too. A widget that still imports it fails as Run fails: row `st.fail` with `ModuleNotFoundError` and the line, badge on the widget. | A path on the last `.sent.json` and not in this send goes. A rename is one removal and one addition. A delete or rename on the project screen is a boundary even with no editor open. |
| **3. A package folder** | `import helper` works on the Home Screen as it does in Run. So does a data file beside the script (T-0865 L3): same question, same answer. | Everything in the project goes, at any depth, by relative path. Exclusions and limits are in s2. |
| **4. `import main`** | Row and console say `st.main`, from the first send. The file still reaches the widget and the refresh fails, so the widget keeps its last picture with the badge. Tap opens the file at the import. | Stays impossible, in both <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>: at refresh `main` is the widget's own script, and changing that changes the runner's contract for one rare case. The T-0748 scan looks for `import main` and `from main import` in every project file, so `helper.py` is caught too (T-0865). A dynamic import gets past the scan and lands in `st.fail`. |

</div>


On a widget whose own file is `main.py`, case 4 does not apply. On the row `st.main` outranks `st.fail`, because the error the run raises names nothing useful.

## 2. One send

1. **When.** T-0747's boundaries, after every window has saved. Never at the pause in typing. At HEAD `save(widget:)` skips the send when the open file's text is unchanged, and `deleteProjectFile` sends nothing, so the check belongs above ConsoleModel, where `everyModel` is.
2. **Changed.** Path, size and date for the project, from attributes, compared per widget with `.sent.json`. No file is read unless the list differs. `pywidget.json` counts as a change (the mirror carries it) but does not go to `widgets/<id>/`. T-0972 writes the manifest during the send, so take the list after that write, or every boundary sends again. A refused widget's list still differs, so the next boundary retries it, which is T-0881 M3 for free.
3. **What goes.** Everything except links (refused by name), hidden files, `__pycache__` and `pywidget.json`. The widget's own file lands as `main.py`; a top-level project `main.py` stays out (T-0844). lane-scripts/<id>/ gets the same set.
4. **Run-file names.** A top-level project name equal to one the widget folder keeps for itself is refused by name: `tree.json`, `status.json`, `state.json`, `render-fault.json`, `state.lock`, `ext.marker`, `lane-peak`, `lane-refused`, compared by `nameKey`. One constant, with a test that every name written to `widgets/<id>/` is in it.
5. **Budget.** `MiniZip.Limits` from attributes before any read, as T-0881. Clone, don't read: T-0881 reads bytes on the main actor at every boundary, and this send can be 32 MB times the number of widgets. A clone must keep `tree.json`'s date (s4, s3).
6. **All or nothing, per widget.** One refusal stops only that widget. Build on T-0906's one rename: rebuild the folder in staging and case 2 needs no extra steps. `.sent.json` sits in the folder, so it swaps with it. Check `state.lock` under the swap, because a lock held on the old folder's file is not a lock on the new one (flag on only).
7. **Refresh.** One `scriptSaved(id)` per widget per send: the open file's widget first, then placed ones, then the rest. Runs go one at a time, so a project of 6 widgets is 6 runs. No time is measured yet.

## 3. The word when it goes wrong


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. The word when it goes wrong, scrolls sideways" style="--tw:781px" markdown="1">

| What happened | Project row | Console | Home Screen |
|---|---|---|---|
| Sent and drew | nothing (s5.11.4: a line only when something is wrong) | nothing | the new picture |
| Send refused | `st.notsent` with the reason | one line | last picture, clock mark |
| Refresh failed | `st.fail` | one line | last picture, error badge |
| Refresh cut off by iOS | nothing yet; it reruns at the next active | nothing | last picture, clock mark |
| `import main` seen | `st.main` | one line | as refresh failed |

</div>


A good send and a good run clear all of it. Two parts with one id still show `st.clash`.

What has to exist for this, none of it at HEAD:

1. **`status.json`, smallest version.** Per widget: the last run's kind, error type, line and time from `WidgetRunOutcome`, plus the last send's refusal. Written where RunResultSink says it will be. T-0198 is P2 and adds only `expired_runs`, so this half moves into T-0866 and T-0198 stays on top of it. T-0881's rule now reads "a refusal leaves that widget's work as it was": `status.json` may change, and `snapshot()` excludes it.
2. **The console hears the run.** `ConsoleModel.scriptSaved` returns Void and drops `WidgetWriter.Outcome` (PyWidgetApp.swift:362).
3. **Time to finish.** The refreshes run inside `beginBackgroundTask`. On expiry: stop, then one timeline reload so the clock draws. Apple's page exempts reloads only while the app is in the foreground, so this one counts against the budget; once per cut-off is the price of saying so (keeping-a-widget-up-to-date, research/inbound/apple).
4. **The widget's own check.** State-spec s1 gains triggers, order unchanged:
   - Row 4, badge: `status.json` says the newest run failed. It reuses `e.badged`, which today means demoted only.
   - Row 5, clock: as now, or `status.json` <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> a refusal, or `tree.json` is older than `.sent.json`'s `sent_at`.
   - The check lives in `getTimeline`, so it holds with the app gone.
5. **Catch-up.** At the next active, any widget whose tree is older than its send runs once, outside `WidgetPasses.spacing`.

New strings, DRAFT C51, not yet on the sheets. 0 hits for "app".


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3. The word when it goes wrong, scrolls sideways" style="--tw:755px" markdown="1">

| Key | Text | Where |
|---|---|---|
| `st.name` | [file] is a name a widget keeps for itself; rename it | the [reason] for s2 item 4 |
| `vo.stale.sent` | {widget}. Last updated {good_time}. | VoiceOver for the new clock triggers; the current string needs a `stale_after` |

</div>


## 4. `sampled_at` (ADR-007 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 2026-11-01 18:17, T-0961)

- No case touches `tree.json`. The ruling rejected a save that clears it, and the last good picture is what the marks sit on.
- A sibling edit can carry an older hard-coded date. Under item 2 that refresh still lands, because the old tree landed before the run began. Flag off, no check runs at all.
- `sent_at` is a file time. It never enters `isOlder`. The clock trigger compares dates of files, not `sampled_at`.
- **One gap, flag on only, for Ines.** An old-code extension run that began before the send can land during the save's refresh, or after it with a later date. Either way a tree of old work lands after `sent_at`, so the clock trigger misses it, until the next run. The window is the 4 s deadline. Proposal: a run that began before the folder's `sent_at` writes no tree. Item 2 rejected a marker because a run in flight beats it; this check is on that run. It freezes nothing, since any run after the send writes. It changes her rule, so it is hers. It does not hold up the flag-off build. It should be answered before T-0680's chair line. **Ruled (T-0973): ADR-007 chair line 2026-11-01 18:38, which wins here. The check goes in with four additions; "it freezes nothing" needed one of them. T-0866 builds only when and how `sent_at` is stamped (item 3). The rest is T-0976.**

## 5. Freeze row F3

No new row, and the date stays 11-03 23:59. F3's test as written passes without T-0866, because "one imports the other, and run it" passes in the editor. Store page row 17 is gated on F3 and is not true for a widget without this rule.

- **Add one case to T-0355's UI tests:** edit only a sibling, leave the editor, the widget's tree changes.
- **Add one shot to my F3 read:** frame 8's rows on the real screen.

The case passes only after T-0866 lands. s5.11.12 said 1.0 day. s3 adds about 0.5, so 1.5 days, not measured, on top of T-0906. From 11-02 that ends at or past F3's date. If it misses, Ines rules whether the case holds F3 or moves alone.

## 6. Tests and leftovers

- **Invert:** `testEditedSiblingReachesTheWidgetOnlyWithItsScript`, `testRemovedSiblingStaysInTheWidget`, `testPackageFolderDoesNotReachTheWidget`, and T-0865's data file probe.
- **Keep:** `testImportOfTheProjectMainPyDoesNotReachTheWidget`, plus the row line.
- **New:** a run-file name is refused; a refusal draws the clock; a failed refresh draws the badge and writes `status.json`; a refresh cut off draws the clock and reruns at active; `helper.py` with `from main import X` shows `st.main`; two widgets in one project both change on a sibling edit; a delete with no editor open removes the copy.
- **T-0865 and T-0900 leftovers, closed by this:** a renamed sibling or widget file (s1 case 2); two projects with one id, whose union of siblings goes at the later send; L4, a failed refresh saying nothing (s3).
- **The remade folder (T-0900).** A run in flight during a move remakes `widgets/wea/` with only `tree.json` (RunResultSink.swift:94). Make that folder only for a premade id.
- **Deleting the Widget part itself is not one of the four, and is open.** Its folder stays, so a placed widget keeps drawing a script that no longer exists, with no mark. Check it. My rule: treat it as T-0747's move with no destination. The folder goes, the console says so, and the placed widget has no script until the person chooses one in Edit Widget.
- **A limit, said plainly.** A change made in Files while the app is not running reaches the widget at the next boundary after the app runs. iOS gives no hook before that, so the widget carries no mark until then.

## 7. A refused save and the copy (T-0355 notes, T-0666 L3)

When a save is refused (autosave paused after "Not Now", or another window saved the file meanwhile) and the scene leaves the foreground, the text goes to a copy (`main (conflict).py`) and the editor opens that copy. "Inactive" counts as leaving: pulling down Control Center or the notification list does it. So "Not Now" lasts only until the next glance at Control Center, and a tester will say "my file changed name". That is intended, the safe side: iOS may end the app after the scene leaves the foreground without another call, and the text must be on disk by then. The console says where the text went. The next launch names the copy only while it exists: a rename or delete of the copy, or of its project, in any window updates or drops that note (T-0668, L1).

### 7.1 Wording fix (T-1115, T-0996 L1; strings DRAFT C51)

Ruling s5 keeps "app" out of user-facing text. The next-launch line said "when the app left the screen". And "Autosave is paused until you save a copy." followed by "Saved your text as ..." read as a contradiction: the second line never said the pause was over. Plain words, 0 hits for "app" in all four strings; "PyWidget" passes the word check (it is the product's name, as in home-setup.md s2).


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 7.1 Wording fix (T-1115, T-0996 L1; strings DRAFT C51), scrolls sideways" style="--tw:930px" markdown="1">

| Where | Old | New |
|---|---|---|
| `recoveredHead` | A save was refused when the app left the screen, so your text was saved as  | A save was refused when you left PyWidget, so your text was saved as  |
| `recoveredLine` (head, then `folder/file`) | ... (open it from Projects). | unchanged tail: ... (open it from Projects). |
| `autosavePaused` | Autosave is paused until you save a copy. | Autosave is paused. Save a copy to turn it back on. |
| `saveCopy()` say line | Saved your text as p/main (conflict).py. | Saved your text as p/main (conflict).py. Autosave is on again. |

</div>


The last row keeps the old text as its prefix, so ProjectStoreTests line 439 (`contains`) still passes. Notes stored by an older build keep the old head and will not follow a later move (Pernille, T-0996); harmless, one launch.
{% endraw %}

</div>
