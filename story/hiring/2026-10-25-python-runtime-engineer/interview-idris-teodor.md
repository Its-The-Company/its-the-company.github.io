---
layout: "default"
title: "Panel, Teodor (collaboration and the Swift-Python bridge, with Idris)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-25-python-runtime-engineer/' | relative_url }}">← Hiring round: Python runtime engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 4 · Sun Oct 25, 19:56</span></div><h1>Panel, Teodor (collaboration and the Swift-Python bridge, with Idris)</h1><div class="people"><a class="person" href="{{ '/cast/idris.html' | relative_url }}"><img src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt=""><b>Idris</b><small>Senior iOS engineer</small></a><a class="person" href="{{ '/cast/teodor.html' | relative_url }}"><img src="{{ '/assets/portraits/teodor.svg' | relative_url }}" alt=""><b>Teodor</b><small>Candidate, Python runtime engineer</small></a></div></div>

{% raw %}
# Panel: Teodor, on collaboration and the bridge interface

Round `2026-10-25-python-runtime-engineer`. Panelist: Idris, senior iOS engineer, owner of the Swift half of the C1 bridge. Run separately from the CEO's interview (C18 step 3). I read the brief and Teodor's dossier in the slate. I did not read Ines's interview files or any scorecard before writing mine. Condensed transcript; questions in the order I asked them.

**Idris:** Here is the split. I own the Swift half of the bridge: the thread, the console view, the input prompt, the stop button, the editor jumping to a line. You would own the Python half. Before any code, what do you hand me?

**Teodor:** A contract, not a Python file. First a C header, because that is the real boundary: every function the Swift side calls and every callback the Python side makes. Then a table beside it. For each function: which thread may call it, whether the GIL is held on entry, who owns each string (UTF-8, the callee copies), and every error it can return. Then a fixtures folder: scripts with the event stream they must produce, one JSON line per event. You run them in XCTest, I run them on host Python against a fake host. If we disagree, the fixture decides, and if the fixture is wrong, the contract changes first and the code second. A hardware team made me work this way. Before that, they read my Python to guess the threading, and they guessed wrong.

**Idris:** Threads. Walk me through a Run.

**Teodor:** First, one dedicated thread owns the interpreter for the life of the app. Not a dispatch queue: a thread you create, with a large stack, because a secondary thread's default stack is small and deep recursion will crash it before Python's recursion limit trips. I would measure the size we need, not guess it. Then I call `Py_InitializeFromConfig` on that same thread. That matters later for the stop button: Python delivers `KeyboardInterrupt` only to the thread that initialized it. Then a Run is a job posted to that thread. It takes the GIL, runs the user's code in a fresh `__main__` namespace, and releases the GIL. Your side never calls into Python from the main thread, and my side never blocks waiting on the main actor while it <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the GIL. That second rule is where I have seen deadlocks.

**Idris:** stdout and stderr.

**Teodor:** I replace `sys.stdout` and `sys.stderr` with a small text stream whose `write` calls one C callback with a stream tag, a sequence number and the bytes. One channel for both, so the order survives. I would batch on the Python side, by newline or a few kilobytes, because a `print` in a tight loop will flood the main thread otherwise. Your side then coalesces per frame. Two things I would put in the contract as open, not solved. First, C code that writes to file descriptor 1 directly bypasses `sys.stdout`. Catching that means a pipe and a reader thread, and I would only build it if a native package we ship actually does it. Second, the iOS build of CPython has its own idea of where stdout goes. I would read what the version we ship does and turn it off explicitly, not trust the default.

**Idris:** `input()`.

**Teodor:** First, the Python side calls a host callback with the prompt text. That call releases the GIL and blocks the interpreter thread on a wait. Then your side shows the prompt on the main thread, and when the user answers, you complete the wait with the string. Then Python returns it. The case people forget is Stop pressed while the prompt is open. The wait has to wake with "cancelled", and Python raises `KeyboardInterrupt` from `input()`, not an empty string. I would also define what `input()` does when there is no console at all, say from a Shortcuts run. It should raise an error that says why, with the user's line, not hang the intent.

**Idris:** The stop button. You built yours three times.

**Teodor:** Yes. `PyErr_SetInterrupt` alone missed scripts blocked in C. Async exceptions alone left half-written files. The one that stayed has three layers. First, a cooperative check in our own modules: every device call and our `sleep` look at a stop flag. Second, the interrupt as the general case for pure-Python loops. Third, if the script is still running after a timeout, the console says so plainly. There is no `kill -9` inside one process, and on iOS there is no second process. "Restart" cannot mean finalizing and re-initializing the interpreter either. Native packages like numpy do not survive that. So Restart is a fresh namespace and a cleared module cache for the user's own modules, and the last resort is "quit and reopen the app," written in the UI, not hidden. A plain `time.sleep(600)` is the test I would write first, because the interrupt flag alone does not wake it.

**Idris:** Tracebacks.

**Teodor:** The user's file is compiled with its real name, so every frame carries their path. Before anything crosses to Swift, I drop the frames that belong to our runner, so the first frame you see is theirs. I send a structure, not a formatted string: exception type, message, and a list of frames with file, line, function and the source line. Then your editor can jump to it. `SyntaxError` is the special case: its line and column live on the exception, not in a frame, so it gets its own branch and its own fixture. The test is a script with a bug on a known line, and the assertion is the line number, not the text.

**Idris:** How does our module get into the app? You have not built for iOS.

**Teodor:** Correct, I have shipped desktop builds only: the instrument SDK's extension on three desktop platforms. I have built a test host against the iOS framework layout on my own time, in the Simulator, never through App Review. For the bridge module itself, I would register it as a built-in with `PyImport_AppendInittab` before initialization and link it into the host, so it does not need its own framework. PEP 730 asks for binary modules in the app as frameworks with a marker file where the `.so` would be. That applies to the wheels, not to our bridge. On numpy I would lean on you and on whoever has built a mobile wheel before. I would not pretend.

**Idris:** Review. I will review your half; Odalys will review your process. What happens when a Swift engineer tells you your Python is wrong?

**Teodor:** I ask for the failing fixture. If there is one, I fix it the same day and add the fixture to the set. If there is not, we write one together before we argue. From a process engineer I expect to hear that my commits are too big or my measurement was not asked for. The second is fair. I can spend a day on a number nobody needed. I now write the question down before I measure, and if nobody owns the question, I stop.

**Idris:** Tell me about a date you missed.

**Teodor:** The second stop button. I knew two weeks out that async exceptions corrupted files, and I told my lead the same day with the failing case attached. The release moved one week. The first time, years earlier, I waited until I had a fix, and that cost more. I do not do that now.

**Idris:** The users of `pywidget_ui` are not scientists. Give me a modifier.

**Teodor:** My first instinct is `Text("Hi").font(2, BOLD)`. That is the C in me, and it is wrong for this user. They should be able to guess it: `Text("Hi").font(size=17, weight="bold")`, keyword arguments, string literals the stubs list, so the editor completes them. I would want you and the designer to review the names before they freeze. Names are where I am weakest, and they cannot change after users write widgets with them.

**Idris:** What do you want from me?

**Teodor:** The contract reviewed before either of us writes the code, not after. Your XCTest suite running my fixtures, not your own copy of them. And when you measure start-up in the Simulator, tell me the device and the build, so we compare like with like.

## Scorecard

Scored on the brief's competencies only. Evidence is from this panel; Ines's questions cover ground I did not.

| Competency | Score | Evidence |
| --- | --- | --- |
| CPython embedding and the C API | 5 | Initialize on the interpreter's own thread so `KeyboardInterrupt` reaches it; GIL released around the `input()` wait; three-layer stop with a reason for each layer; Restart without finalize because native modules do not survive re-init; `time.sleep(600)` as the first stop test. |
| Python library and API design | 3 | Structured traceback and event stream are well shaped. On the user-facing DSL his first answer was positional and flag-based; he corrected it to keywords with completable literals and asked for name review himself. Competent, not yet strong. |
| Native builds and packaging | 3 | Knows the built-in module route (`PyImport_AppendInittab`) and the PEP 730 framework rule for binary modules. Desktop wheels only; iOS work in the Simulator, never through App Review. Said so plainly. |
| Spec-driven testing and measurement | 4 | Shared fixtures as the arbiter for both halves; asserts the line number, not the text; separate `SyntaxError` fixture; "measure the stack size, not guess it." Owned that he over-measures and named his check. |
| Platform constraints and App Review | 3 | Knows there is no second process on iOS, that a stop may need "quit and reopen" said plainly, and that `input()` from a Shortcuts run must fail with a reason. Did not speak to Guideline 2.5.2 in my panel; not asked by me. |
| Collaboration across the language boundary | 5 | Offered a C header plus a thread, GIL, ownership and error table before code; fixtures decide disputes; contract changes before code. Told his lead of a slip two weeks out with the failing case attached. Asked for review of his weakest area unprompted. |

Total: 23 of 30. Average: 3.83.

**Idris's recommendation, in writing:** Hire. On the bridge he answered every case I own the other half of, including the two I would have found late: Stop while `input()` is open, and Restart without finalize. I would rather work with him than carry the Python half myself. Conditions: (1) the bridge contract (header, thread table, fixtures) is written and reviewed by both of us before either half is coded; (2) every public name in `pywidget_ui` gets a review from me and Maren before it freezes, since API naming is his weakest area and the probation task sits on it; (3) native wheels are paired with review until one has passed through a real iOS build. Pay is Ines's to settle; I make no comment on it. I have not seen the other candidates' panels, so this is not a ranking. No dissent.

Idris
{% endraw %}
