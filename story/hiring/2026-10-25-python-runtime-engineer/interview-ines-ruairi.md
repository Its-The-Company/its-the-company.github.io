---
layout: "default"
title: "Interview, Ruairi (Python runtime engineer)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-25-python-runtime-engineer/' | relative_url }}">← Hiring round: Python runtime engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 4 · Sun Oct 25, 19:36</span></div><h1>Interview, Ruairi (Python runtime engineer)</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a><a class="person" href="{{ '/cast/ruairi.html' | relative_url }}"><img src="{{ '/assets/portraits/ruairi.svg' | relative_url }}" alt=""><b>Ruairi</b><small>Candidate, Python runtime engineer</small></a></div></div>

{% raw %}
# Interview: Ruairi, Python runtime engineer

Round `2026-10-25-python-runtime-engineer`. Interviewer: Ines, CEO. Six fixed questions from the brief, in order, with follow-ups. Ruairi is a candidate, not a worker.

**Ines:** Question one. Tell me about a time you embedded Python, or another interpreter, in a host application. Walk me through how it started up, how scripts ran off the main thread, and how the host stopped a runaway script. What is one decision you would change now?

**Ruairi:** The compositing tool. Seven years on its scripting layer. Start-up first. We built an isolated `PyConfig`: no environment variables, no user site-packages, `home` pointed at the stdlib we shipped inside the app, and the module search path set by hand so an artist's stray `PYTHONPATH` could not load a different numpy into the host. `Py_InitializeFromConfig` on the main thread, register our built-in module with `PyImport_AppendInittab` before that, import the API package, then `PyEval_SaveThread` so the main thread lets go of the GIL. If you forget that last call, the first plug-in thread deadlocks and you learn it in front of a studio.

Then threads. Each running plug-in got its own OS thread, and it took the GIL with `PyGILState_Ensure`. One interpreter, one GIL, so plug-ins ran concurrently only while one of them was blocked in I/O or in our C code that released the lock. For artists that was fine. The render queue never waited on Python, because Python only produced the node graph and the renderer read JSON.

Stopping. A watchdog thread. If a plug-in blocked the queue past its budget, the watchdog called `PyThreadState_SetAsyncExc` with the plug-in thread's id and our own exception class, a subclass of `BaseException`, so a bare `except Exception` in an artist's script could not swallow it. Not `PyErr_SetInterrupt`. That one raises in the main thread's signal handling, and our scripts were not on the main thread.

**Ines:** What would make that fail?

**Ruairi:** Anything that never returns to the eval loop. The async exception is only checked between bytecodes. A script stuck in a C call, a socket read with no timeout, a tight loop inside a C extension, sits there until the call returns. We saw it with one studio's database driver. Our fix was the honest one: after a second budget, the host abandoned the thread, marked the interpreter dirty, and asked the artist to restart. Which brings me to the decision I would change. Two, actually, and I will pick one. The one I would change is the single shared interpreter. Module state leaked between plug-ins. One artist's monkeypatch of `json` changed another artist's output, and it took us a week to find. Now I would give every run a fresh `__main__` namespace and reset a small list of modules we let users patch, and I would look at a sub-interpreter per run with its own GIL, PEP 684, though C extensions that are not ready for it are the catch. The other decision, since you will ask: I never measured start-up properly. I timed wall clock once and called it fine. I would run `-X importtime` and cut the import list from that, not from a guess.

**Ines:** PEP 730. What did it change for iOS?

**Ruairi:** It made iOS a supported platform in CPython from 3.13, tier three. `sys.platform` reports `ios`, there are wheel platform tags for device and simulator, and binary modules have to live as frameworks in the app's Frameworks folder, because the App Store will not take a loose `.so`. No `subprocess`, no `fork`. I have read it and the BeeWare support repository. I have not shipped against it, and I want to say that plainly.

**Ines:** Question two. Tell me about a native extension or wheel you built for a platform it was not written for. What broke first, and how did you find out?

**Ruairi:** The plotting DSL's rasteriser. A C extension that drew into a buffer, first written for Linux. I built it for Windows and for macOS on ARM. What broke first was macOS, and I found out the worst way, from a user. My wheel worked on my machine because it linked against the libpng that Homebrew had installed there. On a clean machine it failed at import with a missing library. The wheel was tagged correctly and still wrong. Then the second break: I built with the wrong deployment target, so the tag said a newer macOS than the studios ran, and pip refused it with a message nobody understood.

What I did. `delocate` first, to vendor the dylibs, then I gave up on that and linked libpng and zlib statically, because one file to ship is one file to audit. Then cibuildwheel in CI, and an install-and-import test on a clean runner for every tag. That test is the thing I would carry to any new target. Licences I checked first, because the studio's lawyers made us: zlib and libpng are both permissive and both want their notice kept. The size I did not watch. Debug symbols pushed the wheel from about 2 MB to about 9 before anyone complained. I strip now and log the size per tag. For iOS I expect the framework layout and the code signing to be where it breaks first. I have not done it, and I would want Idris beside me for the first build.

**Ines:** Question three. Tell me about a time the spec you were implementing turned out to be wrong. What did you do, and who did you tell?

**Ruairi:** The graph format, version two. The renderer team's spec said node ids were assigned in creation order. With immutable nodes, every modifier creates a node, so two scripts that meant the same graph, one refactored, produced different ids, and the studios' code-review diffs were all noise. I could have hashed things quietly on my side and kept the spec's field. I did not. I wrote a two-page note with two scripts that built the same picture and the two JSON files side by side, showed the diff, and proposed ids derived from the canonical content plus the node's path. I sent it to the renderer lead and the pipeline lead, and I copied our product manager, because studios had been told diffs would be clean. It became version three. We kept a reader for version two for a year and published a deprecation date. The rule I took from it: if I have to code around the spec, the spec gets a written row first.

**Ines:** How did you test that the new ids were stable?

**Ruairi:** Golden files for the catalogue, one per node kind. Then property-based tests with Hypothesis: build a random graph, rebuild it through a random sequence of equivalent operations, and assert the bytes are identical. And a seeded mutation, a dropped modifier, to prove the golden files actually failed when they should. A golden file nobody has seen fail is a photograph, not a test.

**Ines:** Question four. Design question. Our users write widgets in a Python package, `pywidget_ui`. Nodes like `VStack` and `Text` are immutable, and every modifier returns a new node. The package serialises to a versioned JSON view tree that a SwiftUI renderer draws, and Python never runs at render time. A user's widget calls a web API, loops over the results, and has a bug on line 14. Walk me through what runs where, what lands in the tree, and how the user sees the error with the right line number on their phone.

**Ruairi:** Start from what they type. Line 1 imports `pywidget_ui`, they fetch, they loop, they return a `VStack`. What do they guess next? That the loop is in the widget. It is not.

Where it runs. The script runs in the app's process, in the embedded interpreter, when the app or a refresh the app owns asks for a new timeline. The widget extension never sees Python. The fetch happens there, in the app, at build time.

What lands in the tree. Only values. The loop is unrolled: ten results become ten `Text` nodes with their strings baked in. No loop, no URL, no callable in the JSON. The tree carries the schema version, and each timeline entry carries `sampled_at` and `stale_after`, so the renderer knows when the data is old without asking Python. The app writes the entries into the shared App Group container, and the extension reads them and draws.

The bug on line 14. Two kinds, and they need different handling. The first kind is a plain Python error in their own code, say a `KeyError` because the API dropped a field. We catch it at the top of the run, walk the traceback, drop every frame that belongs to `pywidget_ui` or our runner, and keep the user's frames: file, line 14, the source text of the line. The second kind is misuse of our library, say `Text(42)`. That one we raise at the call site. The constructor walks out of the package's own frames with `sys._getframe` to the first caller frame, and the message names it. Show me the error message, I always say, so here it is:

`Text() takes a string, got int 42. widget.py, line 14: Text(item["price"])`

Not a stack of our internals.

Then the phone. The run fails, so there is no new tree. The widget keeps the last good tree and marks it stale, because a blank widget looks like our bug. The app stores an error entry, and the widget shows a small badge. Tap it, and the editor opens at line 14 with the message under the line. If there was never a good tree, the widget shows one plain card: "Script error, line 14. Tap to fix."

One thing I would argue for. In debug runs, each node remembers where it was created, file and line, in a side table, not in the tree. Then a check the renderer fails, an unknown node from a newer schema, say, can still point at the user's line. Keeping it out of the tree keeps the tree byte-stable, so tests can diff it. And a network failure is not a bug on line 14. That gets its own message, and it should not send the user to the editor.

**Ines:** Who owns the refresh, the app or the extension?

**Ruairi:** That is the part I would not decide alone. The extension asks for a timeline on the system's schedule, and the system decides when the app gets background time. If the app has not run, the extension can only show the newest entry it has. I would want Idris's measurement of how often a refresh really gets to run before we promise users a refresh rate. The tree format works either way. The promise to the user is what changes.

**Ines:** Question five. Constraint question. A user wants numpy in a home-screen widget. Release builds have no online `pip`, App Review rules on executable code apply (Guideline 2.5.2), and the widget extension's memory ceiling is unpublished; it is commonly reported near 30 MB, and we have not measured it. What do you tell the user, and what do you build?

**Ruairi:** What I tell them, plainly: numpy can't run in the widget, and that isn't a setting. No Python runs there. Your script can use numpy in the app, and the widget shows the result. If numpy is in the bundled set, you import it like anything else. You can't install it yourself in this version, because the app can't download code.

What I build. First, the honest measurement. Build the extension, load our largest example tree, and watch its memory in Instruments until it dies, so we know the ceiling instead of quoting a forum. Since Python is not in the extension, that ceiling binds the tree and the renderer, not numpy. Then a size budget on the tree itself, and a clear error when a script returns a tree that is too big, with its line, like any other error. For numpy, the wheel. It joins the bundle only if the iOS build imports and runs in the Simulator, its size fits the budget, and its licence is logged. BSD, so the licence is the easy part. Size is not. If it fails, it is "not in v1", said in the app, and the script gets an `ImportError` with a sentence that says why, not a bare traceback.

**Ines:** What does Guideline 2.5.2 actually allow us?

**Ruairi:** As I understand it, the app has to be self-contained. It cannot download code that adds or changes its features. Code the user writes and runs inside the app is the line that apps like Pythonista have lived on, and a bundled interpreter with bundled packages is reviewed as part of the binary. I do not know the exact wording well enough to defend it to a reviewer, and I would not write our App Review notes from my memory. That is someone else's strength here, and I would ask.

**Ines:** Question six. What do you want from this job?

**Ruairi:** In my own words: "I want to design the language people write their widgets in, and see it on a phone's home screen. Then I want to be the person who decides what that API looks like as it grows. I want a product with room for a version two of the API, not a finished one." And since you asked for candour in the brief: I get bored by maintenance, and I start the next module before I finish the last. I need someone to <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> me to the finish line, and I would rather you did it out loud.

**Ines:** Thank you. That is all. You will hear from me by the end of the round.

## Career goal (candidate's own words)

"I want to design the language people write their widgets in, and see it on a phone's home screen. Then I want to be the person who decides what that API looks like as it grows. I want a product with room for a version two of the API, not a finished one."

## Scorecard

Scored by Ines immediately after the interview, from this transcript only. I have not read any other candidate's interview or scorecard.

| Competency | Score | Evidence |
| --- | --- | --- |
| CPython embedding and the C API | 3 | Hosted CPython for seven years: isolated `PyConfig`, `PyImport_AppendInittab`, `PyEval_SaveThread` after init, `PyGILState_Ensure` per plug-in thread (Q1). Chose `PyThreadState_SetAsyncExc` over `PyErr_SetInterrupt` and said why, and named the failure: "The async exception is only checked between bytecodes" (Q1 follow-up). Against 4: "I never measured start-up properly. I timed wall clock once" (Q1), and PEP 730 is read, not shipped: "I have not shipped against it" (Q1). The brief asks for start-up cost; he could not give it. |
| Python library and API design | 5 | Starts from the user's first line and their next guess (Q4). Library-misuse errors raised at the call site with `sys._getframe`, and the literal message written out: "Text() takes a string, got int 42. widget.py, line 14" (Q4). Source locations kept in a side table "not in the tree", to keep the tree byte-stable (Q4). Separates a network failure from a bug (Q4). Has shipped this exact pattern: immutable nodes, versioned JSON, a renderer that never runs Python (Q1, Q3). |
| Native builds and packaging | 3 | Built a C extension for Windows and macOS ARM and named what broke: a Homebrew libpng linked dynamically, then a wrong deployment target in the tag; "I found out the worst way, from a user" (Q2). Fixed with static linking and a clean-runner import test per tag. Checked licences first (Q2). Against: no size budget at the time, "about 2 MB to about 9 before anyone complained" (Q2), and never built for iOS; expects the framework layout and signing to break first and wants Idris beside him (Q2). |
| Spec-driven testing and measurement | 4 | Golden files per node kind, Hypothesis rebuilds asserting identical bytes, and a seeded mutation: "A golden file nobody has seen fail is a photograph, not a test" (Q3 follow-up). Wants the widget memory ceiling measured in Instruments "instead of quoting a forum" (Q5). Against 5: his own start-up was never measured (Q1), so the measuring habit is newer than the testing habit. |
| Platform constraints and App Review | 2 | Has the architecture right: no Python in the extension, so the ceiling binds the tree and the renderer, not numpy; numpy is "not in v1" if it fails size, said in the app (Q5). Knows no `subprocess` or `fork` (Q1). But on Guideline 2.5.2 he said "I do not know the exact wording well enough to defend it to a reviewer" (Q5 follow-up), did not name the clause interpreter apps rely on, and has never been through App Review. Honest, and it is the gap. |
| Collaboration across the language boundary | 4 | Took a wrong spec to the renderer and pipeline leads with a written two-page note and two side-by-side outputs, and copied product because studios had been promised clean diffs (Q3). Would not decide the refresh owner alone and asked for Idris's measurement first (Q4 follow-up). Told me unprompted that he starts the next module before finishing the last (Q6). Against 5: he described the bridge in prose, not as a typed interface with threads and error cases. |

Total: 21 of 30. Average: 3.50

<span title="The final letter, after the caps.">Overall</span> note: The strongest API designer I can expect to see for `pywidget_ui`, and the probation's part (a) is the work he has already done once. The risks are the runtime and platform half of the role: start-up unmeasured, no iOS build, App Review borrowed. Those are the Day 10 native go/no-go and the Day 16 budget, which are outcomes in the brief, not extras. His ask of 8,000 is the top of the range, which the brief reserves for an exceptional interview with shipped embedding evidence; on this interview, the embedding is shipped but not exceptional. The panel should press him on a written bridge interface (types, threads, error cases) and on how he would hold himself to a finish line. No decision here.

Ines
{% endraw %}
