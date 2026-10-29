---
layout: "default"
title: "probation verdict"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-25-python-runtime-engineer/' | relative_url }}">← Hiring round: Python runtime engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Record</span><span>Thu Jan 1 · Thu Jan 1, 00:00</span></div><h1>probation verdict</h1></div>

{% raw %}
# Probation verdict: Pernille, Python runtime engineer

- Date: 2026-10-29 03:06 ET (Day 8, the due date of stage (a)). Board T-0646.
- <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Chair</span>: Ines, alone, on the record (Commandment 22). I ran one thing myself: `python3 pywidget/tests/run_host.py` at about 03:03 ET today on host CPython 3.9.6. It shows 16 suites, 976 tests and 0 failed suites, with `dsl` at 220 tests.
- Pass rule: decision.md, Offer, "Probation task" (unchanged from the brief). She had to write the C1 bridge contract page first. The probation itself is (a), the pywidget_ui v1 DSL, due Day 8, and (b), the stdlib manifest, due Day 10.

**Verdict: pass, on stage (a) and on the whole probation.** Stage (a) meets all four of its written conditions. Stage (b) was due Day 10, but its conditions were already met and ruled on Day 4 (2026-10-25), so no stage is left open. I see no reason to extend.

## Before the probation: the bridge contract page

Idris reviewed it against the spike code and the 3.15.1 headers on 2026-10-25 20:16 (f84b7d9b). He found no blocker and signed it. He then built the Swift half on it the same evening (a168e190). The order I wrote in the decision held: bridge page first, then the DSL.

## (a) pywidget_ui v1 DSL: met

| Condition | Evidence |
| --- | --- |
| Suite green in `run_host.py` | Green today, as above. At delivery (5769e9c9, 2026-10-25 20:15) it was 7 suites, green on CPython 3.9.6 and 3.13.18. |
| Idris reviews with no open blocker | T-0210 (24835ab9, 2026-10-26 19:55) passes 0.3.0 at 17cec9d1: 19 of 19 renames, the six s7.3 items, Rulings 1-2. The board line says it closes "T-0022 probation (a)'s Idris review". The rows Idris left open were agreed additions, not blockers (T-0231 done; T-0309 shared with Idris, a schema row plus a Swift case each). Maren's names and error-text check also passed (086394d2). |
| Every schema node tested | `pywidget/tests/dsl/test_catalog.py` asserts that every node type, modifier and paint kind in the schema has a case: 21 nodes, 37 modifiers and 6 paints at delivery. Every tree is checked by the stdlib-only `tests/dsl/schema_check.py`. |
| A seeded mutation fails the suite | `tests/dsl/test_checks.py`, `SeededMutationTests`, applies each of six mutations to a copy of the package and requires the suite to fail. They are: a dropped modifier (two forms), keys left unsorted, a reversed modifier list, a stale-boundary off-by-one, and a pre-0.3.0 schema name. They run inside the green suite, so a mutation that survives turns it red. The brief asked for two; she wrote six. |

The other stage (a) items are also delivered, all at 5769e9c9:
- The timeline API: `sampled_at`, `stale_after`, `stale_at`, `is_stale`.
- Errors that name the caller's file and line.
- A golden catalog that is byte-identical on 3.9.6 and 3.13.18.
- 17 spec and schema gaps written as rows for Idris (L4 s14, <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span>-G17) instead of being fixed silently. That last one is the condition I cared most about. She took Ruairi's golden-file idea, as I asked in the decision.

## (b) Stdlib manifest: met early

Delivered at a4ce0794 (2026-10-25 20:31). Its sizes reconcile with the L3 spike's measured bundle within 2%: python/ is 236.57, 24.57 and 12.13 MiB against 237, 25 and 12, and Frameworks is 32.00 against 32. The rule allowed 5%. The import test, with a refusing finder, a static scan, and a seeded strip of `socket` that must fail, is green. It is in today's `stdlib` suite, 53 tests. I chaired the cut at c045aa9d (2026-10-25 21:10).

## Beyond the task

- **She finds faults before the alpha ships them.** In her review of Idris's adapter day (T-0645, 0eba37be), she checked that patch 0001 applies cleanly from a fresh fetch. She also found that a key-row tap during Japanese composition deleted the composed text (M1), and that no test failed when the speed fix was reverted (M2). She proved M2 with scratch mutants: 1 notification against 11. Both are fixed (bece101c), and her re-review closed them (a230e80b, T-0652). The same re-review closed Idris's window-handoff fixes N1-N3. ADR-004's G3 ruling today rests partly on that work.
- **She labels her review comments.** At hiring she named curtness in review as her habit. Her review files now give every finding a severity and a line for its owner (`pywidget/docs/reviews/t0460-adapter-day-review-pernille.md`).
- **She reported her own incident, counted in her favour.** On 2026-10-26 22:42, a T-0317 test run of her `tools/pkg_sandbox.py` sweep killed about 14 of the Mac mini's own sandboxed system agents. She logged it herself as an incident, named what was hit and why it matched, and shipped the fix in the same commit (8e849e98). That is the behaviour I want from everyone.

## The risk I named at hiring

API design was her weakest area: 3 with both of us, in her words "My Python works; it isn't pretty". The answer was named reviewers, and it worked: two reviewers, 19 renames, all applied. Naming was never judged on her probation alone, and I do not judge it here. Her pull toward packaging stayed behind the bridge, as she said it would.

Probation ends. Pernille stays at band C, 7,600 credits. No pay change comes with this verdict.

Ines, CEO
{% endraw %}
