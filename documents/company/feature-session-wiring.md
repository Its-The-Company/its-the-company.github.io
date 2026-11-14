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
patch below names the file, the function and the line, and the code to put there. None of it has run: it is a
suggestion read against the code, not a tested change.

Refreshed 2026-11-14 (Idris): every file and line below was read again at commit 99f8222e6d (branch personal/b3;
the first write-up used 20c7dc5067). Six of its nine line numbers had moved; the code at each place is as quoted,
and each of the 30 references now in this file was checked by a script against the file's own line. Target, from
T-4194's line: the wiring on by Wednesday 2026-11-18, so the first trial (T-4191) can merge by Friday 2026-11-20
and the week's counts are in by 2026-11-27. New in this refresh: Patch 5 (the counts), the reviewer change in
Patch 4, and the after-sync note's missing field.

## What exists

`tools/feature_session.py` is read only: it writes no board line, makes no commit and starts no build.
`tests/feature_session_test.py` checks it on a fixture repository (136 checks), and
`tests/feature_session_mutants.json` plants 73 faults in it. Nothing calls the tool yet.


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
| `counts --since DATE` | the five counts of app-features.md 3.4, features beside lines (Patch 5) |

</div>


## The switch

`ops/feature_sessions.json`, which does not exist yet:

```json
{"on": ["T-4191"], "most": 2}
```

No file means nothing is on, `due` prints nothing and every patch below changes nothing. The first trial turns on
T-4191 alone. "most" is the two sessions at once from app-features.md 3.2 item 11.

## Patch 1: the feature is what is handed out, its steps are not

File: `tools/board.py`, `lanes_view` (line 501), the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> at line 521, inside the loop that starts at line 517. This
file is not on rule 62's list, but `dispatch.py runnable()` reads its output, so it belongs with the rest. Today an umbrella never starts while a piece is open, so a
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
its six steps. The conditions above the hold (line 519: `stuck(ln)`, and `lane_out` with `person_owned`, the Xcode
gate and a wait date) are untested for a feature line; if one drops T-4191, that is the next thing to read.
`pinned_stuck` (line 480, new since 11-12, T-4432) repeats the hold at line 495 for its own report of pinned lines
that wait. It hands nothing out, so I left it out of the patch.

## Patch 2: one feature per session, and two sessions at most

File: `tools/dispatch.py`.

`cmd_tick` (line 1500), after `tasks = open_tasks(menu, lines, busy, done, stale_flags())` (line 1541). `due` counts the claims it
is given; this covers two accounts dealt in the same tick and the hand-outs not yet claimed (`busy` holds both):

```python
        fs_on, fs_most = FS.switch(ROOT)                                # T-4194 (6)
        fs_room = max(0, fs_most - sum(1 for t in busy if t in fs_on))
        fs_keep = [t["id"] for t in tasks if t["id"] in fs_on][:fs_room]
        tasks = [t for t in tasks if t["id"] not in fs_on or t["id"] in fs_keep]
```

`deal` (line 666), the batch loop at line 689; the first line quoted below is line 692. A session starts with up to
BATCH (4, line 180) tasks; a feature must be alone:

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

`runnable()`, line 1317, after `t = parse_line(ln)` at line 1324, so "files in use" holds a feature's Targets and not
only the paths its line happens to name:

```python
            if t and t["id"] in FS_TARGETS:
                t["paths"] = sorted(set(t["paths"]) | set(FS_TARGETS[t["id"]]))
```

`FS_ON` is `FS.switch(ROOT)[0]`; `FS_TARGETS` is `{f["id"]: f["targets"] for f in plan["features"] if f["id"] in
FS_ON}`.

## Patch 3: a feature is never <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifted</span> mid-session

File: `tools/personal_tick.sh`, `lift_finished`, line 1197; its loop starts at line 1200. `personal_land.sh lift`
(`lift_one`, line 2593) picks the commits whose subject starts with the task's ID (the awk at line 2606). For a feature that is only its review fixes; the step commits would stay
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

The session's words, for `ops/prompts/lane.md`, where it says what to do with a line from `lane_take.py` (line 5):

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
  python3 -I "$ROOT/tools/feature_session.py" landed "$TASK" --since "$before" --main HEAD --ticks \
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

and for a live landing in the after-sync pass (`after_sync`, line 2308), after its `review_line` call at line 2345.
That pass works from a note the landing left: `after_sync_keep` (line 2274) writes `task`, `tip` and `review` at
line 2277, and no main-before. So the note needs a fourth line, `before $MAIN_BEFORE`, written there and read back
beside `tip` at line 2340; without it the pass has no revision to give `landed --since`. The land has no log
variable (`say`, line 419, prints to the land's own output), so the tool's stderr, which names each step that
landed with no done-note, is left to go there.

The reviewer. `review_line` asks `lane_owner reviewer "$TASK"` at line 1831. Since 11-14 (35c66ab1f6)
`tools/lane_owner.py reviewer` prints the reviewer a feature's card names when one of the IDs is a feature and
that person owns none of the IDs: `reviewer T-4191` prints Maren. It can only see the IDs it is given. A session
of another worker's steps lands under the feature's ID too, and for T-4180 the card's reviewer is Pernille, who
owns steps there. So for a feature the land names the landed steps beside it:

```bash
  # in review_line, before the line is built: a feature's review is asked for the feature and the steps that landed
  local who="$TASK" steps=""
  if python3 -I "$ROOT/tools/feature_session.py" on "$TASK" 2>/dev/null; then
    steps="$(python3 -I "$ROOT/tools/feature_session.py" landed "$TASK" --since "$MAIN_BEFORE" --main HEAD --json 2>/dev/null \
      | python3 -c 'import json, sys; print("+".join(x["id"] for x in json.load(sys.stdin)["landed"]))' 2>/dev/null)"
    [ -z "$steps" ] || who="$TASK+$steps"
  fi
  # ... (owner: $(lane_owner reviewer "$who"), P1)
```

With the steps named, a card reviewer who wrote one of them is passed over and the choice falls to the built-in
list, past every owner named (tests/lane_owner_test.py, "the card's reviewer owns one of the steps named").

Nothing else in the land changes. The branch is the account's branch at session end, as now. Its marker's task is the
feature's ID. The floor already adds host and xc for a branch that touches a product path. `review_line` already
writes one line for the branch.

A session may also tick a step itself with `tools/board_tick.py`, as <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> do today. Then the line is already ticked
when the land looks, `landed` reports it as not open, and nothing is ticked twice.

## Patch 5: the counts (nothing to change, three things to keep true)

`python3 tools/feature_session.py counts --since 2026-11-18` prints the five counts of app-features.md 3.4,
features beside lines, and `--json` gives the same as one object. It reads `ops/metrics/land_xc.jsonl` and
`flow.jsonl` in the main checkout, `xc.jsonl` in every checkout, and main's log. It writes nothing. With no feature
merge in the window it says "no feature merge yet" and prints the lines' figures. It needs no patch, but it counts
a feature merge only if the wiring keeps these true:

1. **The land's task is the feature's ID.** A feature merge is a flow.jsonl row with `task` equal to the feature's
   ID and `to` "merged" (as `src: land` and `main_gate` write for a line today), and its iPhone results are
   land_xc.jsonl rows whose `task` names the feature. A branch landed under a step's ID is counted as a line.
   Check after the first trial merge: the command above must list `T-4191 merged <time>: <n> steps (...)`.
2. **The feature's own line is claimed when its session starts.** The session's start is the feature's first
   "being_built" row after its last merge. The steps of a merge are the commits on main whose subject names one
   step and whose author time lies between that start and the merge. With no such row, every earlier commit of
   those steps is counted and the output says so on the merge's line.
3. **Every Xcode line of a session carries `XC_TASK`.** `plan` prints each line with the step's ID and `packet`
   prints the first build with the feature's. Count 4 (a red at the merge after a session whose last run under
   each step's ID ended 0) and the feature line of count 5 read xc.jsonl's `task`. A run without it is counted
   only under "all runs".

What it cannot say: which step caused a red at the merge, and how long the bisect took. That is the bisect's
answer and stands in no ledger; the feature's next session writes it in its note. Review findings per step (the
sixth line of 3.4) are counted by hand from the review files.

Found while writing it: `tools/xc.sh` writes a run's row into `ops/metrics/xc.jsonl` of the checkout it ran in
(line 364, `$ROOT`), so the main checkout's file is not all the runs. From 11-07 on it holds 72 runs, 8% of them
waited at the lock, mean 15.6 s; all 69 checkouts together hold 137 runs, 30% waited, mean 86.7 s. `counts`
reads every lane copy under `~/company-personal` and counts a row found in two of them once. A session on
another machine is not read.

The lines' figures on 11-14, from 11-07 on, for the week's comparison: 1.33 iPhone results per passing change
(170 results, 128 passes); 36 of 164 results with a verdict red (22%); a median 5.4 hours from a task's first
"being_built" row to its first "merged" row (588 tasks). The plan's 1.5 and 31% are of 11-06 to 6:48 AM 11-12, and
the same rules give exactly those there (124 results, 81 passes, 37 of 118 red; a scratch read cut at that
minute). The plan's 9.1 hours over 188 tasks is not reproduced: the rule here gives 9.6 over 208 for those days,
and I do not know the review's filter.

## Left with a question, not a patch

1. **A red feature merge must not be retried as merge runs.** 3.2 item 6 says the next session bisects. Today a
   <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch goes to `ops/personal_retry.txt` and `tools/merge_queue.py` runs it again. For a feature whose red
   is a test, that is the series of merge runs the design removes. The retry feed should pass over a parked name
   whose task is an on feature and whose last result is red tests, and leave a conflict or a time-out as now. I have
   not read merge_queue.py closely enough to name the line; the feed's names are read in `retry_names` (line 170).
2. **The reviewer.** Answered on 11-14: `tools/lane_owner.py reviewer` prints the card's reviewer for a feature
   (35c66ab1f6), and what the land must pass it is in Patch 4.
3. **Subjects.** `lift` and the step check read a subject differently. `lift` wants the ID as the first word.
   `check` accepts the one checklist ID anywhere in the subject. The session words above ask for the ID first, which
   satisfies both.

## Four corrections to the design, found while building

These are in the tool's header with the evidence. They change app-features.md 3.2 item 3 and the cards.

1. Ten of the 85 names in the cards' "tests" are files, not classes: `PremadeFirstRenderTests.swift` is `extension
   BridgeTests`. As an `-only-testing` value such a name matches nothing. Alone, tools/xc.sh calls that run red
   because no test ran. Beside other filters, xcodebuild runs the others and the run can be green without it; that
   is xcodebuild's usual behaviour and I did not run it here. The tool resolves a name to its class, or to the
   classes and test methods its file holds. All ten resolve. Corrected in `ops/plans/app-features.json` on 11-14
   (35d99ad90a): all 85 names are classes now, and the tool keeps the file rule for a card that names a file again.
2. "Incremental build when the step changed Swift" is too narrow. A changed resource, C file, bundled Python file
   or project.yml leaves the built bundle just as stale. The build comes first whenever the step touched anything
   the build reads.
3. The incremental build is `build-for-testing`. The PyWidget scheme's build action holds the app and the extension
   only, so a plain `build` leaves the test bundles old.
4. The session's Xcode arguments are read from the land's own `XC_ARGS`, so a step is tested on the Simulator the
   merge will use.
{% endraw %}

</div>
