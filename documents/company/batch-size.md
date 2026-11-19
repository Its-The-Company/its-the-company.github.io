---
layout: "default"
title: "T-4843: how many steps merge together, worked out from measured records"
section: "documents"
description: "One rule for every queue. It uses the last 14 days of records and is worked out again each day."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/batch-size.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 29 · Thu Nov 19</span><span><code>ops/plans/batch-size.md</code></span></div><h1>T-4843: how many steps merge together, worked out from measured records</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-19. Answers Investor an Investor on #41 (c6969786057, 2026-11-18 12:15 AM ET: "10 appears to be an arbitrary limit, and should be determined deterministically based on task complexity/ what would cause the most speedup and best quality") and the 12:23 AM <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> (c6969915295: each batch's size and measurements are logged where the Flow panel reads them, in their own section). Tool: `tools/batch_size.py`. Test: `tests/batch_size_test.py`.

## What changed

- The fixed ten is gone from `tools/feature_session.py` (it was `LIMIT = 10`) and from `tools/park_group.py` (`--max 10`). Both now ask `tools/batch_size.py` how many to take. `--limit N` and `--max N` still let a person set a count by hand, and the record says so when they do.
- Ines's bound in [`ops/plans/app-features.md`](app-features.html) 3.2 item 4 ("ten steps on the branch") is replaced by this rule in the tools. Her text is her document and I have not edited it. It needs a line that points here.

## The rule

One rule for every queue. It uses the last 14 days of records and is worked out again each day.

1. **Red chance of a change.** p = 1 - (1 - base[kind]) x (1 - per_file)^files. This is fitted by maximum likelihood to every land attempt (one task and tree) at the merge gate. The kinds are app, runtime, tools, site, other and pipeline. They come from the paths the change touches, after record files are taken out. A kind with fewer than 20 attempts uses the pooled rate. Some reds are counted as the run's fault and not the change's. They feed a separate rate f, which only makes runs dearer: a red that was also red on main, a suite that passed again on the same tree, a red the gate calls a bad test, and a bad test, time limit or runner error listed in [`ops/plans/T-4787-red-causes.md`](t-4787-red-causes.html).
2. **Cost of one batch at the gate.** S(n) = (T + sum(p) x (ceil(log2(n+1)) x Tb + T)) / (1 - f). T is the gate's run time for the kind. Each change at fault costs one bisect, plus one more run for the others. The bisect's try count is the one `feature_session.py bisect` already uses. A batch of one pays no bisect, because its red is its own fix at any size.
3. **Queue.** The gate serves one batch at a time. The wait is the Pollaczek-Khinchine mean for fixed service time: rho x S / (2(1 - rho)), where rho = L x S(n) / n and L is the arrival rate measured for that gate. A size with rho >= 1 is ruled out.
4. **Choice.** Batches go one after another. In a feature session the worker does n steps (a seconds each, after a session start of s seconds), the batch merges, and the next session starts from main (app-features.md 3.2 item 4). In a backlog (<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> refs) everything is already finished. The rule picks the n with the least mean time from now to merged over the items on hand, and a tie goes to the smaller n. Each item is weighed by its own files when they are known: steps on the branch, or a parked ref's own files.
5. **Rides alone.** A change to a gate or scheduler tool (Handbook rule 62's list, plus `main_green.py`, `xc.sh` and `batch_size.py`) always merges alone, because its run tests the tester.

## What it gives today (records to 2026-11-19 1:30 AM ET)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What it gives today (records to 2026-11-19 01:30 ET), scrolls sideways" style="--tw:825px" markdown="1">

| input | value | from |
|---|---|---|
| attempts / base red rate | app 247 / 10.8%, tools 144 / 11.3%, runtime 60 / 12.5%, site 76 / 18.4%, pipeline 179 / 13.5% | main_gate.jsonl |
| per extra file | +0.16% | fitted |
| host gate run, bisect try, arrivals, run faults | 269 s, 306 s, 2.1 an hour, 7.9% | main_gate.jsonl |
| iPhone run, bisect try, arrivals, run faults | 438 s, 326 s, 1.9 an hour, 2.8% | land_xc.jsonl, xc.jsonl |
| a step's work (being_built to waiting_to_merge) | about 72 min median | flow.jsonl |

</div>


Result: **a feature session merges 1 step at a time** for every kind. A backlog of ten parked refs merges **3 at a time** (app, runtime, tools; Dorfman's 1/sqrt(p) alone also gives 3), and site/other changes go 1 at a time. The reason for the feature result is that a step takes about an hour of work, while a merge costs about 8 minutes and the gate is lightly loaded (rho about 0.2-0.3). Holding a finished step for the next one costs more than the run it saves. The answer changes as the inputs change: with 10-minute steps the rule gives 3, and with the iPhone gate at 7 arrivals an hour it gives 3 for features and 7 for a backlog.

## Limits, said plainly

- Session start-up cost is only the first build (median 120 s). The tokens and reading time a new session spends are in no record, so they are not counted. If they were, feature batches would come out larger. Measuring them is the next step.
- The red rate is an upper bound on the change's own share. T-4787 found that 36% of reds have an unknown cause, and those are counted against the change here.
- Lines changed are not used. The gate's records list files, not lines.
- Feature step time is measured on ordinary tasks, because feature sessions have no step-level rows yet.

## The record (for the Flow panel, T-4818)

The record is `ops/metrics/batch_size.jsonl` in the main checkout, which `tools/records_round.py` commits under ops/metrics. Each line is one JSON object:
- `params`: the day's inputs and each kind's sizes, written once a day.
- `batch`: written by `feature_session.py check` at a merge point and by `park_group.py combine` when a change is parked. It holds the tasks, the size, the rule's size or a hand `--max`, the inputs (each item's p and files, the gate's times, the arrival rate and the fault rate) and `predicted_s` (seconds from the batch to merged).
- `actual`: written by `batch_size.py check` from flow.jsonl's merged rows. It holds `actual_s` beside `predicted_s`, once every task has merged, or after 7 days with whatever merged.

Open: nothing runs `batch_size.py check` on a schedule yet. It needs a line in the jobs loop or the supervisor (a pipeline tool, so rule 62's daily batch applies).

## Sources

Ideas only; no code was copied from any of these. Checked 11-19 against the public pages: the GitHub and GitLab docs (quoted points as below); the Uber and Google papers could not be read, and their lines say so.
- R. Dorfman, "The Detection of Defective Members of Large Populations", Annals of Mathematical Statistics 14(4), 1943: pooled testing and its optimum group size near 1/sqrt(p).
- F. K. Hwang, "A method for detecting all defective members in a population by group testing", JASA 67, 1972: binary splitting on a positive pool, the bisect cost used here.
- Pollaczek-Khinchine mean waiting time for an M/G/1 queue (any queueing text, e.g. Kleinrock, Queueing Systems Vol. 1, 1975).
- GitHub Docs, "Managing a merge queue": merge group size limits (minimum and maximum pull requests to merge), and a pull request whose group fails its checks removed from the queue with the groups behind it rebuilt; it describes no splitting or bisect.
- GitLab Docs, "Merge trains": each merge request tested on top of the ones ahead of it, and a failure drops it and restarts those behind.
- S. Ananthanarayanan et al. (Uber), "Keeping Master Green at Scale", EuroSys 2019 (SubmitQueue): cited for predicting build outcomes from change features to decide what to test together. Its text could not be read for this plan (11-19: the ACM page refused, the Uber page was gone), so that point is not yet checked against the paper.
- A. Memon et al. (Google), "Taming Google-Scale Continuous Testing", ICSE-SEIP 2017 (TAP, Google's continuous test system): named in the T-4843 board line for batching changes and finding the culprit when a batch fails. Only the abstract was read for this plan (11-19; it speaks of controlling test workload without losing quality), so that point is not yet checked against the paper's text.
- Company records: ops/metrics/main_gate.jsonl, ops/metrics/land_xc.jsonl, ops/metrics/xc.jsonl, ops/metrics/flow.jsonl, ops/plans/T-4787-red-causes.md, ops/plans/app-features.md section 3.2, Handbook rule 62.
{% endraw %}

</div>
