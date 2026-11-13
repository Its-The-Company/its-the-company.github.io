---
layout: "default"
title: "Wiring the feature session into the pipeline (T-4194)"
section: "documents"
description: "By Idris, 2026-11-12, for the audit-implementation session. Rule 62 keeps these files with that session: tools/dispatch.py, tools/personal_tick.sh, tools/personal_land.sh, tools/merge_queue.py. I did not edit them. Each\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/feature-session-wiring.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/feature-session-wiring.md</code></span></div><h1>Wiring the feature session into the pipeline (T-4194)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
By Idris, 2026-11-12, for the audit-implementation session. Rule 62 keeps these files with that session:
tools/dispatch.py, tools/personal_tick.sh, tools/personal_land.sh, tools/merge_queue.py. I did not edit them. Each
patch below names the file, the function and the line at commit 20c7dc5067, and the code to put there. None of it has
run: it is a suggestion read against the code, not a tested change.

## What exists

`tools/feature_session.py` is read only: it writes no board line, makes no commit and starts no build.
`tests/feature_session_test.py` checks it on a fixture repository, and `tests/feature_session_mutants.json` plants 40
faults in it. Nothing calls the tool yet.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What exists, scrolls sideways" style="--tw:526px" markdown="1">

| Command | What it answers |
|---|---|
| `packet T-4191` | the card, and the steps this session takes, with the reason for every step left out |
| `plan T-4191 T-1445` | the checks for one step, from the files it touched |
| `check T-4191` | one commit per step, and whether the merge point is reached |
| `landed T-4191 --since REV` | the steps on main past REV; `--ticks` prints `<step><TAB><done-note>` |
| `bisect T-4191 --test Class` | the `git bisect run` command over the step commits |
| `due` | the features a dispatcher may hand out now: `<feature> <worker> <steps>` |
| `on T-4191` | exit 0 when the switch names the feature |

</div>


## The switch

`ops/feature_sessions.json`, which does not exist yet:

```json
{"on": ["T-4191"], "most": 2}
```

No file means nothing is on, `due` prints nothing and every patch below changes nothing. The first trial turns on
T-4191 alone. "most" is the two sessions at once from app-features.md 3.2 item 11.

## Patch 1: the feature is what is handed out, its steps are not

File: `tools/board.py`, `lanes_view`, the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> at line 492. This file is not on rule 62's list, but `dispatch.py
runnable()` reads its output, so it belongs with the rest. Today an umbrella never starts while a piece is open, so a
feature line is never runnable and its steps are.

```python
# beside the other optional imports
try:
    import feature_session as FS
except Exception:
    FS = None

# in lanes_view, before `for t in parse(text, today):`
    fs_due, fs_steps = set(), set()
    try:
        on, most = FS.switch(ROOT) if FS else (set(), 0)
        if on:
            plan = FS.load_plan(os.path.join(ROOT, "ops", "plans", "app-features.json"))
            state = FS.state_of(text, os.path.join(ROOT, "ops", "board_notes"),
                                os.path.join(ROOT, "log", "board-archive.md"))
            fs_due = {x["id"] for x in FS.due(plan, *state, on, claimed, most)[0]}
            fs_steps = {s for f in plan["features"] if f["id"] in on for s in f["steps"]}
    except Exception:
        fs_due, fs_steps = set(), set()   # a fault here hands lines out as before

# in the loop, in place of `if nodes and BL.held_by(nodes, t["id"], done):`
        if t["id"] in fs_steps:           # T-4194 (7): a step of a feature that runs as sessions is not handed out alone
            held += 1
            continue
        if t["id"] not in fs_due and nodes and BL.held_by(nodes, t["id"], done):
```

`due` has already left out a feature a session holds, one that shares a Target with a running feature, one with no
step to take, and any past "most". Check after applying: `python3 tools/board.py lanes 200` lists T-4191 and none of
its six steps. The conditions above line 492 (`t["runnable"]`, `person_owned`, the Xcode gate) are untested for a
feature line; if one drops T-4191, that is the next thing to read.

## Patch 2: one feature per session, and two sessions at most

File: `tools/dispatch.py`.

`cmd_tick`, after `tasks = open_tasks(menu, lines, busy, done, stale_flags())` (line 1450). `due` counts the claims it
is given; this covers two accounts dealt in the same tick and the hand-outs not yet claimed (`busy` holds both):

```python
        fs_on, fs_most = FS.switch(ROOT)                                # T-4194 (6)
        fs_room = max(0, fs_most - sum(1 for t in busy if t in fs_on))
        fs_keep = [t["id"] for t in tasks if t["id"] in fs_on][:fs_room]
        tasks = [t for t in tasks if t["id"] not in fs_on or t["id"] in fs_keep]
```

`deal`, the batch loop at line 639. A session starts with up to BATCH (4) tasks; a feature must be alone:

```python
                if t["id"] in taken or not eligible_for(t, s):
                    continue
                if t["id"] in FS_ON and batch:        # T-4194: a feature session is one feature and nothing beside it
                    continue
                hit = first_overlap(t["paths"], paths)
                ...
                batch.append(t)
                if t["id"] in FS_ON:
                    break
```

`runnable()`, line 1232, so "files in use" holds a feature's Targets and not only the paths its line happens to name:

```python
            if t and t["id"] in FS_TARGETS:
                t["paths"] = sorted(set(t["paths"]) | set(FS_TARGETS[t["id"]]))
```

`FS_ON` is `FS.switch(ROOT)[0]`; `FS_TARGETS` is `{f["id"]: f["targets"] for f in plan["features"] if f["id"] in
FS_ON}`.

## Patch 3: a feature is never <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifted</span> mid-session

File: `tools/personal_tick.sh`, `lift_finished`, line 1170. `personal_land.sh lift` picks the commits whose subject
starts with the task's ID (line 2607). For a feature that is only its review fixes; the step commits would stay
behind. The branch lands whole when the session ends, which is the merge point.

```bash
  while read -r t; do
    case "$LIFTED" in *" $t "*) continue ;; esac
    LIFTED="$LIFTED$t "
    # T-4194 (3): a feature session's branch lands as one piece at the session's end
    if python3 -I tools/feature_session.py on "$t" 2>/dev/null; then
      say "$t is a feature session: it lands with $BR when the session ends"; continue
    fi
```

The session's words, for `ops/prompts/lane.md`, where it says what to do with a line from `lane_take.py`:

> When the line is a feature that `python3 tools/feature_session.py on <ID>` accepts, do not split it. Run
> `python3 tools/feature_session.py packet <ID>` and give the worker it names the whole list in one agent call.
> Before each commit the worker runs `plan <ID> <step>` and every check it prints; a red check is fixed before the
> commit. One step is one commit with the step's ID in its subject and `Plain:`, `Evidence:` and `ws:` lines in its
> body. After each commit the worker runs `check <ID>`. At `MERGE POINT: yes`, or on a fault it cannot fix, the
> worker stops and reports. Never run `lane_take.py --done` for a step. End the session when the worker reports.

The session's length is the open question here. Ten steps with a host run and two Xcode runs each is longer than a
45-minute slice. A session cut short loses nothing it committed, but if the usual cut comes at three steps, the
"ten" bound never binds and the merge count in app-features.md 3.3 doubles. The first trial will show the number.

## Patch 4: the steps tick from their commits at the land

File: `tools/personal_land.sh`. Beside `review_line` (line 1825):

```bash
# tick_steps <main before the merge>: T-4194 (3). A landed feature session's steps tick from their commits on main. The
# branch's one review line covers them, so no step gets a review line. Only a step whose commit carries its own
# done-note (Plain:, Evidence:, ws:) ticks here; the tool names the others on stderr for the feature's owner.
tick_steps() {
  local before="${1:-}" s note
  [ -n "$before" ] && [ -f "$ROOT/tools/feature_session.py" ] || return 0
  python3 -I "$ROOT/tools/feature_session.py" on "$TASK" 2>/dev/null || return 0
  python3 -I "$ROOT/tools/feature_session.py" landed "$TASK" --since "$before" --main HEAD --ticks 2>>"$LOG" \
    | while IFS=$'\t' read -r s note; do
        board_do "ops: $s ticked from its commit ($TASK landed)" "$s" "$note" \
          || say "$s landed with $TASK and could not be ticked: a person can tick it"
      done
}
```

Called after line 2261, `[ "$LIVE" = 1 ] || review_line`:

```bash
    [ "$LIVE" = 1 ] || tick_steps "$MAIN_BEFORE"
```

and for a live landing after line 2345 in the after-sync pass, with the main that pass recorded before the merge. I
did not find where that pass keeps it; `$LOG` above also stands for whatever the land's log variable is.

Nothing else in the land changes. The branch is the account's branch at session end, as now. Its marker's task is the
feature's ID. The floor already adds host and xc for a branch that touches a product path. `review_line` already
writes one line for the branch.

A session may also tick a step itself with `tools/board_tick.py`, as <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> do today. Then the line is already ticked
when the land looks, `landed` reports it as not open, and nothing is ticked twice.

## Left with a question, not a patch

1. **A red feature merge must not be retried as merge runs.** 3.2 item 6 says the next session bisects. Today a
   <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch goes to `ops/personal_retry.txt` and `tools/merge_queue.py` runs it again. For a feature whose red
   is a test, that is the series of merge runs the design removes. The retry feed should pass over a parked name
   whose task is an on feature and whose last result is red tests, and leave a conflict or a time-out as now. I have
   not read merge_queue.py closely enough to name the line.
2. **The reviewer.** `review_line` asks `tools/lane_owner.py reviewer`, which picks from Pernille, Idris, Ines and
   Odalys. T-4191's card names Maren. lane_owner.py is not on rule 62's list, so I will change it in T-4194's next
   slice: for a feature in the plan, the reviewer is the card's.
3. **Subjects.** `lift` and the step check read a subject differently. `lift` wants the ID as the first word.
   `check` accepts the one checklist ID anywhere in the subject. The session words above ask for the ID first, which
   satisfies both.

## Four corrections to the design, found while building

These are in the tool's header with the evidence. They change app-features.md 3.2 item 3 and the cards.

1. Ten of the 85 names in the cards' "tests" are files, not classes: `PremadeFirstRenderTests.swift` is `extension
   BridgeTests`. As an `-only-testing` value such a name matches nothing. Alone, tools/xc.sh calls that run red
   because no test ran. Beside other filters, xcodebuild runs the others and the run can be green without it; that
   is xcodebuild's usual behaviour and I did not run it here. The tool resolves a name to its class, or to the
   classes and test methods its file holds. All ten resolve.
2. "Incremental build when the step changed Swift" is too narrow. A changed resource, C file, bundled Python file
   or project.yml leaves the built bundle just as stale. The build comes first whenever the step touched anything
   the build reads.
3. The incremental build is `build-for-testing`. The PyWidget scheme's build action holds the app and the extension
   only, so a plain `build` leaves the test bundles old.
4. The session's Xcode arguments are read from the land's own `XC_ARGS`, so a step is tested on the Simulator the
   merge will use.
{% endraw %}

</div>
