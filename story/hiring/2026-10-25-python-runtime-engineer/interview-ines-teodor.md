---
layout: "default"
title: "Interview, Teodor (Python runtime engineer)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-25-python-runtime-engineer/' | relative_url }}">← Hiring round: Python runtime engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 4 · Sun Oct 25, 19:35</span></div><h1>Interview, Teodor (Python runtime engineer)</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a><a class="person" href="{{ '/cast/teodor.html' | relative_url }}"><img src="{{ '/assets/portraits/teodor.svg' | relative_url }}" alt=""><b>Teodor</b><small>Candidate, Python runtime engineer</small></a></div></div>

{% raw %}
# Interview: Teodor, Python runtime engineer

Round `2026-10-25-python-runtime-engineer`. Interviewer: Ines, CEO. Six fixed questions from the brief, in order, with follow-ups. Teodor is a candidate, not a worker.

**Ines:** Question one. Tell me about a time you embedded Python, or another interpreter, in a host application. Walk me through how it started up, how scripts ran off the main thread, and how the host stopped a runaway script. What is one decision you would change now?

**Teodor:** Nine years of it, in the control software for a family of laboratory instruments. A C++ desktop host, CPython inside, so scientists could script their own experiments. Start-up first. We built an isolated `PyConfig`, set the home and the module search path to our own directory so nothing on the scientist's machine leaked in, turned off `site` imports, and called `Py_InitializeFromConfig`. The stdlib was stripped and frozen into the installer. Cold start was 1.9 seconds when I inherited it. I got it to 340 milliseconds by freezing the modules we always imported and dropping the site imports nobody used. That number is the median of twenty cold launches on our reference machine after a cache purge, and it went into a log with the bundle size for every release.

Then threads. The interpreter was initialized on a dedicated worker thread, not the UI thread. That matters more than people think: to CPython, the thread that initializes is the main thread, and only the main thread runs signal handlers. The UI thread never touched the GIL except through a queue. Every hardware call in our C extension released the GIL around the blocking part, so a script waiting on a motor did not freeze the console.

Then the stop button. I shipped it three times. The first used `PyErr_SetInterrupt`. It works when the eval loop is running bytecode. It does nothing when the script is blocked inside a C call, and our scripts spent most of their lives in C calls. The second used `PyThreadState_SetAsyncExc`. That one lands at the next bytecode boundary, which can be inside a `finally` or a context manager's `__exit__`. We left half-written data files. The third, the one that stayed, put a cooperative check into the instrument API: every hardware call checks a stop flag and raises a stop exception at a point where state is known. The interrupt is the fallback for pure-Python loops. The motor has its own hardware watchdog, because software is not where you stop a motor.

The decision I would change: I would write the stop contract before the first line of code. Which calls are interruptible, which are not, and what state each one leaves behind. I learned it by shipping it wrong twice.

**Ines:** Follow-up. On iOS, the user's script will block in our device modules and in network calls. Same design?

**Teodor:** Same shape. Our device modules and our network wrapper get the cooperative check, because we own them. A blocking call inside the stdlib, a raw socket read with no timeout, is the case the interrupt misses. So the wrapper sets timeouts we choose, and the interrupt covers loops. If a script still will not stop, the host restarts the interpreter. I would want Idris and me to agree how long "will not stop" is, as a number in the interface.

**Ines:** Question two. Tell me about a native extension or wheel you built for a platform it was not written for. What broke first, and how did you find out?

**Teodor:** The instrument SDK's C extension. It was written for Windows with MSVC, and I built it for macOS and Linux. What broke first on macOS: the extension linked against `libpython` directly. Inside our host that worked, because our host had already loaded it. In a scientist's own Python it loaded a second copy and crashed. I found it from a crash report with two Python images in the loaded-library list. The fix was to stop linking `libpython` and let the symbols resolve at load time. What broke second: the vendor's motor library was a static archive with an x86_64 slice only. The universal2 build linked, and the import failed on Apple silicon with an architecture error from `dlopen`. On Linux it was glibc symbol versions, which `auditwheel` showed me.

I have not built a wheel for a mobile target, and I will not dress that up. What I have done is build a test host on my own time against the iOS framework layout PEP 730 defines. I know the parts that are different: the platform tags, `ios_13_0_arm64_iphoneos` and the simulator tags beside it, and that a binary module has to live in the app's Frameworks folder as a signed framework, with a `.fwork` file left where the interpreter looks for it. iOS will not load an unsigned library at run time. I have read that cibuildwheel now builds iOS wheels. I have not run it on numpy.

**Ines:** Follow-up. Sizes and licences, when?

**Teodor:** Before shipping, in the same log as start-up. Each binary, its size on disk, its licence, and the licences of whatever it links statically. A static BLAS inside a wheel carries its own licence, and that is easy to miss if you only read the top-level one.

**Ines:** Question three. Tell me about a time the spec you were implementing turned out to be wrong. What did you do, and who did you tell?

**Teodor:** The hardware team's interface spec said the motor controller's stop command was synchronous: when it returned, the motor had stopped. I write tests from the spec's tables before I write the code, so the test for that line asserted zero motion after the call. It failed about one time in twelve. I measured it: the command returned on acknowledgement, and the motor took up to 40 milliseconds more to stop. I did not put a sleep in the code. I wrote it up with the measurements and sent it to the hardware lead and to my manager the same day, and asked for the spec to be changed. They added a status query, and I polled it. Two other teams had coded around the same line with sleeps.

To be fair to the question: I then spent most of a day measuring the full distribution of that lag, when the first fifty samples already settled it. Nobody asked for that day. I know that habit.

**Ines:** Question four. Design question. Our users write widgets in a Python package, `pywidget_ui`. Nodes like `VStack` and `Text` are immutable, and every modifier returns a new node. The package serialises to a versioned JSON view tree that a SwiftUI renderer draws, and Python never runs at render time. A user's widget calls a web API, loops over the results, and has a bug on line 14. Walk me through what runs where, what lands in the tree, and how the user sees the error with the right line number on their phone.

**Teodor:** First, the script runs in the app's process, on the interpreter's worker thread, never in the widget. The source is compiled with the user's file name, so every frame in their code carries `weather.py` and its real line. Then the web call goes through our network wrapper, with a timeout. Then the loop builds nodes. Each modifier returns a new node, so a half-built widget is never shared with anything. When the script finishes, the package serialises the root to JSON, keys sorted and floats formatted one fixed way, so the same input gives the same bytes. That file goes to the shared app group container, with the time it was sampled. Then the widget extension reads the file, and SwiftUI draws it. No Python in that process.

Now line 14. There are two kinds of error there. If line 14 is the user's own bug, say a `KeyError` on the API's response, the traceback already points at line 14, because we compiled with their file name. If line 14 passes a bad value into our package, say a string where `padding` wants a number, the exception is raised deep inside `pywidget_ui`, and a naive traceback ends in our `__init__.py` at line 400. That is useless to the user. So the package checks arguments at its public edge and reports the caller's frame, and the host trims our package's frames from the traceback it shows. The user sees `weather.py, line 14` and one sentence about what was wrong. On Python 3.11 and later we also get the column, so the editor can underline the call, not just the line.

What lands in the tree: nothing new. A failed run must not overwrite the last good tree with a blank one. The widget keeps the last good tree, marked stale. The app shows the full error in the console, opens the editor at line 14, and the run log keeps it. Whether the widget itself shows a small error mark is a schema question. I do not know if the v1 schema has a node for it. If it does not, I would write that as a row for Idris rather than invent a node.

**Ines:** Follow-up. Write me the signature of `padding`.

**Teodor:** `padding(edges, amount)`, with `edges` an integer bit set, the way SwiftUI's `Edge.Set` works.

**Ines:** Would a Python user guess that?

**Teodor:** No. That is me writing C in Python, and it is the weakest part of my work. A Python user would guess `padding(16)` for all sides and `padding(horizontal=12, top=4)` for the rest, keyword-only, with a type stub so the editor completes it. I can build that correctly once someone tells me it reads badly. I am slower than I should be to see it myself. I would ask for a review from someone who writes Python for users, and I would take it.

**Ines:** Question five. Constraint question. A user wants numpy in a home-screen widget. Release builds have no online `pip`, App Review rules on executable code apply (Guideline 2.5.2), and the widget extension's memory ceiling is unpublished; it is commonly reported near 30 MB, and we have not measured it. What do you tell the user, and what do you build?

**Teodor:** I tell the user the truth in one line. "Your widget's script runs in the app, not in the widget, so numpy can compute the numbers and the widget draws them. numpy inside the widget itself is not in v1." That is not a dodge. Python never runs in the widget for anyone, numpy or not.

Then what I build. First, numpy has to be in the app bundle at build time, because there is no `pip` and iOS will not load code we did not sign. A compiled extension that ships inside the app and passes review is part of the app. Downloading one later is what 2.5.2 forbids. Second, I measure before anyone promises anything. What `import numpy` costs in memory and start-up time in the app, on a device. On my desktop it adds tens of megabytes to a bare interpreter. That is measured on a desktop, so for a phone it is a guess. Third, its size on disk goes into the bundle log, with its licence and the licence of its linear-algebra library. If the size or the import cost breaks ADR-003's budget, it does not ship in v1, and I say so on Day 10 with the numbers.

On the widget ceiling: it should be measured, not quoted from a forum. A test widget that allocates in steps and writes the last step that survived. That has to run on a real device, because the Simulator does not enforce the same limit. If we have no device to run it on, that is a blocker to name, not a number to assume. It also tells us how large a JSON tree the renderer can <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>, which matters more than numpy.

**Ines:** Follow-up. The DSL probation is due Day 8. What would make it fail?

**Teodor:** Two things. The API design, for the reason I gave you; I would put the public signatures in front of a reviewer on day one, not day four. And the schema check: if there is no stdlib-only validator yet, I write a small one, and that is a day. If I see Day 8 moving, you hear it the day I see it, with the reason, not on Day 8.

**Ines:** Question six. What do you want from this job?

**Teodor:** I want to own a runtime from the first `Py_InitializeFromConfig` to the last measured millisecond, on a platform where every megabyte counts. Until now the interpreter I hosted was used by scientists. I want to see one I host in the hands of people who are not scientists, on a phone. And I want a small team that reviews my work seriously, because my best work came out of the reviews that annoyed me.

**Ines:** Thank you. That is all. You will hear from me by the end of the round.

## Career goal (in his words)

"To own a runtime from the first `Py_InitializeFromConfig` to the last measured millisecond, on a platform where every megabyte counts, and to see an interpreter I host in the hands of people who are not scientists. With a small team that reviews my work seriously."

## Scorecard

Scored by Ines immediately after the interview, from this transcript only. I have not read any other candidate's interview or scorecard; none exist yet.

| Competency | Score | Evidence |
| --- | --- | --- |
| CPython embedding and the C API | 5 | Isolated `PyConfig`, own search path, `site` off, frozen stdlib; cold start 1.9 s to 340 ms, "the median of twenty cold launches ... after a cache purge" (Q1). Knew that "only the main thread runs signal handlers", so initialized on the worker thread (Q1). Stop button shipped three times, each failure named: `PyErr_SetInterrupt` "does nothing when the script is blocked inside a C call"; `PyThreadState_SetAsyncExc` "left half-written data files"; final design cooperative check plus interrupt fallback (Q1). Has built a PEP 730 test host (Q2). |
| Python library and API design | 3 | Strong on the parts that come from embedding: compile with the user's file name, check arguments "at its public edge and report the caller's frame", trim package frames, sorted keys and fixed float format for byte-stable output (Q4). Weak on guessability: first offered `padding(edges, amount)` with "an integer bit set", and said himself, "That is me writing C in Python" (Q4 follow-up). Named keyword-only arguments and stubs only after the push. |
| Native builds and packaging | 3 | Real cross-platform breakage, found from evidence: two Python images in a crash report, an x86_64-only static slice failing in `dlopen`, glibc versions via `auditwheel` (Q2). Sizes and licences logged before shipping, including statically linked BLAS (Q2 follow-up). Never built for a mobile target, said plainly: "I will not dress that up" (Q2). iOS knowledge is from reading and a home test host. |
| Spec-driven testing and measurement | 4 | "I write tests from the spec's tables before I write the code"; the stop-lag failure came from that (Q3). Measured the 40 ms lag, refused to code around it with a sleep, told the hardware lead and his manager the same day (Q3). "Measured on a desktop, so for a phone it is a guess" (Q5). Held at 4 because he owned spending a day on a measurement nobody asked for (Q3). |
| Platform constraints and App Review | 4 | Told the user "not in v1" in one line with the reason (Q5). Bundled, signed code versus downloaded code under 2.5.2; unsigned libraries will not load (Q2, Q5). Widget ceiling to be measured on a device, "not quoted from a forum", Simulator does not enforce it (Q5). A failed run keeps the last good tree, marked stale (Q4). Not 5: no shipped iOS work. |
| Collaboration across the language boundary | 4 | Wants the stop timeout "as a number in the interface" agreed with Idris (Q1 follow-up). Would write a missing schema node "as a row for Idris rather than invent a node" (Q4). Asked for API review on day one and said "I would take it" (Q4, follow-up on Day 8). Early warning: "you hear it the day I see it" (follow-up on Day 8). His evidence is with a hardware team, not a Swift engineer. |

Total: 23 of 30. Average: 3.83

<span title="The final letter, after the caps.">Overall</span> note: The strongest possible fit for what the brief calls the heart of the role, the embedded runtime and the bridge's Python half, with shipped evidence on every point the brief asks about. His soft spot is the probation's part (a): the DSL is user-facing API, and his first instinct there reads like C. He knows it and asked for the review that would fix it. Packaging for iOS is unproven; the Day 10 native-package call would be his first mobile build. His ask (8,200, would accept 7,800) is above the brief's offer range; pay is the decision memo's business, not this scorecard's.

Ines
{% endraw %}
