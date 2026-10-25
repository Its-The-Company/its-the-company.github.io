---
layout: "default"
title: "Interview, Pernille (Python runtime engineer)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-25-python-runtime-engineer/' | relative_url }}">← Hiring round: Python runtime engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 4 · Sun Oct 25, 19:35</span></div><h1>Interview, Pernille (Python runtime engineer)</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a><a class="person" href="{{ '/cast/pernille.html' | relative_url }}"><img src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt=""><b>Pernille</b><small>Candidate, Python runtime engineer</small></a></div></div>

{% raw %}
# Interview: Pernille, Python runtime engineer

Round `2026-10-25-python-runtime-engineer`. Interviewer: Ines, CEO. Six fixed questions from the brief, in order, with follow-ups. Pernille is a candidate, not a worker.

**Ines:** Question one. Tell me about a time you embedded Python, or another interpreter, in a host application. Walk me through how it started up, how scripts ran off the main thread, and how the host stopped a runaway script. What is one decision you would change now?

**Pernille:** The iOS port of the field-data app. The first thing that broke was the bootstrap: the interpreter looked for its standard library next to the executable, and on iOS there is no "next to". So start-up was an isolated `PyConfig`. `PyConfig_InitIsolatedConfig`, `home` set to the stdlib folder inside the app bundle, `module_search_paths` written out by hand, `install_signal_handlers` off so we did not take the host's signals, user site off. Then `Py_InitializeFromConfig`, and every status checked. The part people get wrong is threads. Python's "main thread" is whichever thread initialises it, not the UI thread. So we started a dedicated thread, initialised the interpreter on it, and that thread ran every user script, one at a time, from a queue. The UI thread never held the GIL. Output went through a replaced `sys.stdout` that posted lines back to the host in batches, because posting per write cost more than the script.

Stopping a runaway script had two layers. For Python code, `PyErr_SetInterrupt`, which raises `KeyboardInterrupt` in the interpreter's main thread at its next check. That only works if Python has a SIGINT handler, and we had switched those off, so the bootstrap put `signal.default_int_handler` back from Python. The second layer is the honest part: neither that nor `PyThreadState_SetAsyncExc` stops a script stuck inside a C call, a long numerical routine or a blocking read. iOS will not let you <span title="A test written in advance. If it fires, we drop the idea.">kill</span> a child process, because there is no child process. So socket calls got timeouts by default, and if a C call was still running past a grace period, the host said so in plain words and offered to restart the app. We did not pretend `Py_Finalize` and a second init were safe; extension modules leak state across that.

The decision I would change: we shipped the standard library as compiled bytecode only, without the source files, to save about nine megabytes. Tracebacks that passed through `json` or `csv` then printed no source line for those frames, and users could not read their own errors. Now I would ship source for the modules users call directly and strip it only from the ones they never see.

**Ines:** What did start-up cost?

**Pernille:** On the devices we supported then, about 90 milliseconds to a ready interpreter, measured from the call to the first line of user code, median of twenty cold launches. Imports were the real cost. The plotting library alone was over half a second the first time. We imported it lazily, on first use, and the app's cold start stopped carrying it.

**Ines:** Question two. Tell me about a native extension or wheel you built for a platform it was not written for. What broke first, and how did you find out?

**Pernille:** The numerical library, the imaging library and the plotting library, for iOS. The first thing that broke was the linker. The build tried to put the device arm64 slice and the Apple-silicon simulator arm64 slice into one fat binary, and it cannot, because they are the same architecture with different platforms. I found out on the first simulator build on a new Mac: "building for iOS Simulator, but linking in object file built for iOS". That is where XCFrameworks came in, one slice per platform.

The second thing was the configure step. The numerical library's build compiled small test programs and ran them to learn about the platform. You cannot run an iOS binary on the build machine, so every one of those answers had to go into a cross file by hand, and we checked each against a device run. The third was duplicate symbols: two copies of zlib, one pulled in through the image codecs and one through the plotting library's font stack, in one static archive. The fourth came from Apple, not the compiler. The upload validator started rejecting builds with loose binaries outside the Frameworks folder. We moved every extension module into its own signed framework, which is the layout PEP 730 later wrote down, and the build checked that every binary in the bundle was signed before it uploaded.

What's the budget? I kept one per package in the repository, in bytes, and the build failed if a package grew past it. The release build also refused to ship without a licence file that listed every transitive C dependency. That caught a GPL font tool someone had added to the plotting build before it reached a release.

**Ines:** Question three. Tell me about a time the spec you were implementing turned out to be wrong. What did you do, and who did you tell?

**Pernille:** The product spec said "the full standard library works offline". It did not. On iOS, `subprocess` and `multiprocessing` cannot work, because the platform will not let an app start another process. `venv` and `ensurepip` make no sense there, and `tkinter` has nothing to draw on. I wrote a test per module that imported it and called one real function, and ran it on a device. Then I wrote the product manager a one-page note with the list: what works, what imports but fails when called, and what we strip. I proposed a clear error message for the second group in place of a crash. I did not quietly drop the modules. The spec was changed to "the standard library, except the modules listed in this file", and the file became the manifest the release build read. My first note was two lines long and he had to ask me why twice. I write the reason first now.

**Ines:** Question four. Design question. Our users write widgets in a Python package, `pywidget_ui`. Nodes like `VStack` and `Text` are immutable, and every modifier returns a new node. The package serialises to a versioned JSON view tree that a SwiftUI renderer draws, and Python never runs at render time. A user's widget calls a web API, loops over the results, and has a bug on line 14. Walk me through what runs where, what lands in the tree, and how the user sees the error with the right line number on their phone.

**Pernille:** Three places. The script runs in an interpreter, on its own thread, at refresh time: when the user taps Run, when the Run Script intent fires, or when the timeline asks for new entries. The web call and the loop happen there. The serializer runs at the end of the same script and writes one JSON file, versioned, keys sorted, no NaN allowed, into the shared App Group container. The widget extension only reads that file and the renderer draws it. No Python in the drawing path at all.

Where refresh runs is the question I would push on first. If the interpreter runs inside the widget extension, the extension's memory ceiling is the whole budget, the interpreter and the user's imports included. If it runs in the app, refreshes depend on when the app gets time. I would want that measured before anyone writes the API around one of them.

Immutability matters in the loop. If a user builds one `Text` style and reuses it for ten rows, a mutable node would carry the last row's modifiers into every row. With a new node per modifier, nothing leaks.

Line 14 is one of two kinds of bug. If it is the user's own error, a `KeyError` on the API response say, the script raises, no new tree is written, and the last good tree stays on the home screen with its `stale_after` time passed, so the renderer can mark it stale. The run also writes an error record beside the tree: exception type, message, the user's file and line, with the library's own frames filtered out. The widget shows a small badge, "widget.py, line 14", and tapping it opens the editor on that line. If the bug is a misuse of `pywidget_ui`, passing a string where it wants a colour, the node constructor raises at construction time, and it has to name the caller's frame, not ours. I would walk the stack past the package's own files to find the first user frame and put that file and line in the message, and test that it does, for every constructor.

Where I am weaker is the surface: the names, the argument order, what a user would guess. I can make it correct and byte-stable. I would want a reviewer who cares about the names, and I would write the type stubs early so the editor's completion shows the reviewer what a user will see.

**Ines:** What would make this fail?

**Pernille:** A blank widget with no badge. That happens when the run dies before it writes the error record: the extension is killed for memory, or the script hangs and the system gives up. So the error record is written by the host when the run ends for any reason, not by Python, and a missing record counts as a failure too.

**Ines:** Question five. Constraint question. A user wants numpy in a home-screen widget. Release builds have no online `pip`, App Review rules on executable code apply (Guideline 2.5.2), and the widget extension's memory ceiling is unpublished; it is commonly reported near 30 MB, and we have not measured it. What do you tell the user, and what do you build?

**Pernille:** I tell the user: numpy works in your widget script. It runs when your script refreshes, in the app, and the widget shows what the script produced, numbers, text, or a chart drawn as an image. In this version numpy does not run inside the widget itself, because a widget has very little memory and we will not ship something that blanks your home screen. That is a "not in v1" with the reason, not a "never".

What I build: numpy bundled in the app as a signed framework, reviewed with the build, no download. 2.5.2 forbids downloading or installing code that changes what the app does. Bundled libraries are part of the reviewed app, and the user's own scripts, which they can see and edit, are the case reviewers argue about. I have argued that with a reviewer and won once and lost once. The time we lost, the build had a package installer reachable from the UI. So the release build has none.

Then I measure. Importing numpy on its own adds tens of megabytes of resident memory, more than a 30 MB ceiling leaves after the interpreter starts. That is my expectation, and I would not write it down as a fact until it is measured. The Simulator does not enforce the extension's memory limit the way a device does, so the real number needs a device run. Until that run, nothing in the design may depend on numpy inside the extension. If the device number comes back generous, it becomes a 1.1 feature with its own measured budget.

**Ines:** Question six. What do you want from this job?

**Pernille:** In my words: I want to get numpy, Pillow and matplotlib running in a shipped iOS app, under a size budget I set and defend, and then publish the build recipes with their licences, so the next team does not start from nothing. I have spent six years making other people's product compile. I want to own packaging for a product, not support it. And I want to be the one who says "that will not link" before it costs anyone a week.

**Ines:** One follow-up on the boundary. How would you hand Idris, our iOS engineer, the bridge's Python half?

**Pernille:** As a written contract, not a Python file. One table: each call, its arguments with types, which thread it runs on, whether it blocks, what it returns, and every error it can raise and what the Swift side should show. Then host tests that run against that table, so he can read the tests without reading the module. He reviews my half and I review his. I should say I can be curt in review comments. I have learned to put the reason in the comment, not only the verdict.

**Ines:** Thank you. That is all. You will hear from me by the end of the round.

## Scorecard

Scored by Ines immediately after the interview, from this transcript and the dossier only. I have not read any other candidate's interview or scorecard.

| Competency | Score | Evidence |
| --- | --- | --- |
| CPython embedding and the C API | 4 | Shipped an embedding on iOS: isolated `PyConfig`, `home` in the bundle, signal handlers off, init on a dedicated thread because "Python's main thread is whichever thread initialises it" (Q1). Knew `PyErr_SetInterrupt` needs a SIGINT handler and put `default_int_handler` back; said plainly that neither it nor `PyThreadState_SetAsyncExc` stops a script stuck in a C call, and that re-initialising is unsafe (Q1). Start-up measured, 90 ms median of 20 cold launches (follow-up). Not a 5: PEP 730 came up only as a layout she rebased onto (Q2), and her answers on the interpreter were less deep than on packaging. |
| Python library and API design | 3 | Gave the right reasons for immutability ("nothing leaks" across reused nodes), byte-stable output (sorted keys, no NaN), and errors that name the caller's frame by walking past the package's files (Q4). Said herself she is weaker on the surface: names, argument order, what a user would guess. She would want a reviewer and early type stubs (Q4). Competent, not strong. |
| Native builds and packaging | 5 | Exact failures, in order: device and simulator arm64 slices in one fat binary, the error text, the fix with XCFrameworks; configure tests that cannot run on the build host; duplicate zlib; the upload validator rejecting loose binaries (Q2). Per-package byte budgets that fail the build, and a licence gate that caught a GPL dependency before release (Q2). |
| Spec-driven testing and measurement | 4 | Disproved "the full standard library works offline" with a per-module test on a device, and turned the result into the manifest the release build reads (Q3). Will not state numpy's memory as fact until a device run, and noted that the Simulator does not enforce the extension limit (Q5). She treats a missing error record as a failure (Q4 follow-up). Less shown on covering every node and every error path of a DSL. |
| Platform constraints and App Review | 5 | Separated bundled, reviewed code from downloaded code under 2.5.2, and named why she lost one review: an installer reachable from the UI (Q5). Kept Python out of the render path and asked first where refresh runs, against the extension's memory ceiling (Q4). Her user message is a plain "not in v1" with the reason (Q5). |
| Collaboration across the language boundary | 4 | Would hand Idris a contract table (types, thread, blocking, errors) with host tests against it, and review both halves (follow-up). Told the product manager in writing about the spec, and did not silently drop the modules (Q3). Owned her curtness twice, in Q3 and the follow-up. No example given of telling a manager early that a date would slip. |

Total: 25 of 30. Average: 4.17

<span title="The final letter, after the caps.">Overall</span> note: A strong fit for brief outcomes 2 and 4, the native-package go or no-go by Day 10 and the measured bundle by Day 16. She has shipped the exact packages we need, signed and reviewed. Her gap is the one the dossier names: the DSL surface, which is probation part (a). If hired, part (a) needs a named reviewer on the API's names and stubs, and part (b), the stdlib manifest, plays to her strength. Her ask of 7,600 is inside the offer range. No decision until all three interviews and Idris's panel are in.

Ines
{% endraw %}
