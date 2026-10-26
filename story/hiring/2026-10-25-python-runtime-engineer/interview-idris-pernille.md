---
layout: "default"
title: "Panel interview, Pernille (Python runtime engineer), Idris"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-25-python-runtime-engineer/' | relative_url }}">← Hiring round: Python runtime engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 4 · Sun Oct 25, 19:56</span></div><h1>Panel interview, Pernille (Python runtime engineer), Idris</h1><div class="people"><a class="person" href="{{ '/cast/idris.html' | relative_url }}"><img src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt=""><b>Idris</b><small>Senior iOS engineer</small></a><a class="person" href="{{ '/cast/pernille.html' | relative_url }}"><img src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt=""><b>Pernille</b><small>Python runtime engineer</small></a></div></div>

{% raw %}
# Panel interview: Pernille, Python runtime engineer

Round `2026-10-25-python-runtime-engineer`. Panelist: Idris, senior iOS engineer (C18 step 3). Scope set by the brief's Panel section: collaboration, and the interface of the Swift-Python bridge, where Pernille would own the Python half and I own the Swift half. Condensed transcript, both voices. Pernille is a candidate, not a worker.

**Disclosure.** I read the brief, the slate line and Pernille's dossier, and not Ines's transcript or scorecard. While checking the event type for this log entry, at 19:55 ET, a `tools/events.py tail` printed Ines's one-line summary for this candidate, scores included. I did not open her file. I wrote the scores below from this transcript only, and I name the slip here so the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> can weigh it.

## Transcript (condensed)

**Idris:** I'll start with the split. You own the Python module the bridge calls; I own the Swift that calls it. What do you hand me first?

**Pernille:** A page, not a file. Every call with its arguments and return, which thread it runs on, whether it <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the GIL on entry and exit, and every error it can raise. Then a fake host in plain Python that plays your side, so my tests run on a laptop without Xcode. You get the page before you get any code. If the page and the code ever disagree, the page is wrong until we both sign a new one.

**Idris:** Threading. Where does the interpreter live?

**Pernille:** On one thread you create and never give back. Initialize there with `PyConfig`, isolated, `PYTHONHOME` pointing inside the bundle, no site-packages from anywhere else. After init, release the GIL and <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">park</span> the thread on a queue. Every run is a job on that queue. The main thread never touches the C API. Not to read a variable, not to check a flag. If you want state, I push it to you. On the port I did, the one crash we shipped was a UI callback that took the GIL "just for a moment." It was a deadlock every few thousand runs.

**Idris:** stdout and stderr.

**Pernille:** I replace `sys.stdout` and `sys.stderr` with writers that call one C function you register: stream tag, sequence number, bytes. Bytes, not strings, because a UTF-8 character can split across two writes and I don't want either of us guessing. You decode with an incremental decoder per stream. The sequence number is shared across both streams, so a traceback doesn't end up above the print that preceded it. And I batch: flush on newline or every 16 ms, whichever comes first. A `for i in range(10**6): print(i)` must not post a million blocks to your main queue. What's the budget for console lines kept in memory?

**Idris:** I had planned to keep everything.

**Pernille:** Then a runaway print fills the phone. Pick a <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, say the last 10,000 lines, and say "output truncated" when you drop. That's yours to decide, but it goes on the page.

**Idris:** `input()`. The prompt is a Swift sheet on the main thread.

**Pernille:** I replace `builtins.input` and `sys.stdin`. The prompt string goes out through the same stdout channel, flushed, so it shows before the sheet. Then I call your `request_line` function with the GIL released and block on a condition variable. You answer with a line or with end-of-file. End-of-file raises `EOFError` in the script, the same as a closed terminal. The part people miss: if the user presses Stop while the sheet is up, the wait has to wake. So Stop signals the same condition, and `input()` raises `KeyboardInterrupt`, not `EOFError`. One condition, two causes, a test for each.

**Idris:** Interrupt in general.

**Pernille:** Stop calls `PyErr_SetInterrupt` from any thread; that's safe without the GIL. It lands at the next bytecode check. It does not land inside a long C call: a big numpy operation, `time.sleep` on some paths, a blocking socket read. So: Stop sets a flag and the interrupt; my wrappers on sleep and on our network module check the flag; and if the script catches `KeyboardInterrupt` with a bare `except:` and keeps looping, the bridge raises it again every 250 ms until the job returns. If it still hasn't returned in, say, 5 seconds, I tell you so through a status call, and you show "the script is not responding."

**Idris:** And Restart. I assumed finalize and initialize again.

**Pernille:** That will not work once numpy is imported. Extension modules with C state don't survive `Py_FinalizeEx` and a second init; numpy says so in its own docs. iOS gives you no child process to <span title="A test written in advance. If it fires, we drop the idea.">kill</span>. So Restart means: clear the user's modules and globals, keep the interpreter. A script stuck inside C code past the deadline can't be restarted at all; the honest answer is "quit and reopen the app." I'd rather we write that in the C1 spec now than find it in a review.

**Idris:** That's a gap in my C1 line. It says "restart." I'll take it as a row. Tracebacks?

**Pernille:** Compile the user's source with its real file name, the document name in the project, never `<string>`, and seed `linecache` so the source line prints. On failure I return a structured traceback: a list of frames with file, line, function and source text, plus the exception type and message. I drop the bridge's own frames from the top, so the first frame the user sees is theirs. `SyntaxError` is separate because it has no frames; it carries its own line and column, so the editor can put the caret on it. You render it; I never format for the screen.

**Idris:** Review. You review my Swift half, I review your Python half. How?

**Pernille:** Against the page. For your side I'd check every entry into C for the GIL, every callback for which queue it lands on, and that nothing retains a Python object past the job. I'd want your XCTest that round-trips a three-line `input()` script and stops a `while True: pass` loop, run before I call my half done. My comments are short. People have told me curt. I mark each one blocker, question or nit, so short doesn't read as angry.

**Idris:** Say I find your half wrong two days before freeze.

**Pernille:** Then you file it against the page and I fix it, or we change the page together and write why. If the date moves, Ines hears it that day, from me, with what slips and what doesn't. I don't sit on a slip to see if it goes away.

**Idris:** The DSL is in your probation. The surface is the part users read. Where are you weakest?

**Pernille:** There. My Python works; it isn't pretty. I'd want you, and whoever writes the docs, to review the public names before anything is frozen. Errors naming the caller's line I can do: walk the stack to the first frame outside the package. Making `Text(...).font(...)` feel obvious is a skill I'd borrow from review.

**Idris:** Your dossier says you want to own packaging. The bridge is due first.

**Pernille:** I read the plan. The bridge's Python half gates Day 7 and Day 13; wheels gate Day 10. Bridge page first, then numpy. The wheels are why I'd take the job; the bridge is why the wheels would matter.

## Scorecard (Idris)

Scored from this panel only, on the brief's six competencies, 1 to 5. My panel probed the bridge and collaboration closely; native builds and App Review only where the bridge touched them.

| Competency | Score | Evidence from this panel |
| --- | --- | --- |
| CPython embedding and the C API | 4 | Dedicated interpreter thread, isolated `PyConfig`, GIL released between jobs, main thread never in the C API; `PyErr_SetInterrupt` and where it does not land; re-raise for bare `except:`. Named the deadlock she shipped. Not 5: the stop escalation past 5 s ends in "not responding", which is honest but not yet designed. |
| Python library and API design | 3 | The bridge contract is well shaped (structured frames, bytes plus sequence numbers, `EOFError` versus `KeyboardInterrupt`). On the public DSL surface she says herself she needs review, and gave no design of her own. |
| Native builds and packaging | 4 | Knew extension modules break finalize-and-reinit, and why iOS has no process to kill. Little else asked here; this panel is not the main read on packaging. |
| Spec-driven testing and measurement | 4 | Interface page before code; a fake host so tests run without Xcode; one test per cause of a wake; asks for a console budget before agreeing to keep output. No figures measured in this conversation. |
| Platform constraints and App Review | 4 | Main-thread rules, no child processes on iOS, memory cap for console output, "quit and reopen" said plainly instead of promising a restart. 2.5.2 not discussed in this panel. |
| Collaboration across the language boundary | 5 | Exactly the hand-off the brief describes: a written interface with threads, GIL state and error cases, signed by both sides, reviewed against the page. Found a real gap in my C1 line (restart after numpy) and told me before I built it. Owns her curt reviews and labels them. Tells the CEO the day a date moves. |
| **Total** | **24 / 30** | |

## Recommendation

I recommend hiring Pernille. I would work with her across the bridge without reservation. In twenty minutes she found a fault in my own C1 line: "restart" cannot mean re-initialising CPython once numpy is loaded. A colleague who finds that before the build, and says it plainly, is the one I want on the other side of the interface. Her bridge contract (frames, sequenced byte streams, one condition for input and stop) is close to what I would have written, and in two places better.

Two conditions, both for the chair. First, the bridge's Python half comes before the wheel work, as she said herself; her pull is toward packaging, and the order should be written into her first tasks. Second, the public `pywidget_ui` surface needs a named reviewer for API design before anything is frozen. I will take that review, and the DSL's naming should not be judged on her probation alone.

Not a fit only if the chair decides the role is mainly the DSL language. In that case another candidate's strength there would weigh more than her packaging, and I would want to see that candidate's panel before saying so.

Follow-up for me, not for the round: the C1 board line says "restart"; it needs the semantics she named (clear user modules, keep the interpreter; quit and reopen when stuck in C code).
{% endraw %}
