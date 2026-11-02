---
layout: "default"
title: "T-0632 (2): console words for a passed-over file. For Maren&#x27;s review"
section: "documents"
description: "Since T-0414 (ADR-003 s3.6 item 4) a file beside a script that has the same name as a package that comes with the app (requests.py, idna.py) is not imported by that name. Since T-0632 (1) the same is true of a file\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0632-console-words.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t0632-console-words.md</code></span></div><h1>T-0632 (2): console words for a passed-over file. For Maren's review</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-02. DRAFT copy (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>). Maren decided the words on 2026-11-02 (below); the line is on for console runs since T-1111.

## What happens now

Since T-0414 (ADR-003 s3.6 item 4) a file beside a script that has the same name as a package that comes with the app (`requests.py`, `idna.py`) is not imported by that name. Since T-0632 (1) the same is true of a file named like a stdlib module the app ships (`random.py`, `json.py`). Plain Python on a Mac does the opposite: the user's file wins. That is why we changed it: across runs the user's file and the real module got mixed, two copies at once (the host probe and the rule are in ADR-003 s3.6 item 4, T-0632 correction). The cost is that someone who writes their own `random.py` and runs `import random` gets Python's, with no word of it. Today their code then fails some way further on (`AttributeError: module 'random' has no attribute 'roll'`) or, worse, works with the wrong module.

## Recommendation: yes, the console says so

One line per such file, on stderr, before the script's first output, in every console run where it applies (the same folder gives the same lines every run, whatever earlier runs loaded). Only when the run's own code imports that name: the script, or a module of the folder's own that the script imports, followed file by file. A `random.py` that nothing in the run imports, or a sibling script the run never reaches, says nothing. Not in widget runs, previews or editor-buffer runs (no folder). A stdlib name the app does not ship (`turtle`, `test`) still imports the user's file, so it gets no line.

## Draft words

Stdlib name (shown for `random.py`), 24 words:

    random.py in this folder isn't imported as random: Python's own random module is used instead. To use your file, give it another name.

Bundled package (shown for `requests.py`), 26 words:

    requests.py in this folder isn't imported as requests: the requests package that comes with pywidget is used instead. To use your file, give it another name.

A package folder shows as `requests/` in the first slot: "requests/ in this folder isn't imported as requests: ...".

Voice as in your installer read ([`installer-messages-maren.md`](installer-messages-maren.html)): what happened, then what to do, second person.

## Questions for Maren

1. The words above, or yours.
2. The folder case: `requests/ in this folder` or `The folder requests/ isn't imported as requests: ...`.
3. stderr draws in the console's error style. Is a note in that style right, or does this want a quieter one? A quieter style is a Swift and design change, not in this task; if you want it, it is a new row.
4. A prefix (`Note:`) or none. The draft has none.

## Where it stands in the code

- Built, tested and on since T-1111: `runner._note_passed_over`, gated by a bootstrap config key `passed_over_note` (on unless the key is false). The draft words are `runner._NOTE`. Host tests: `ConsoleNoteTests` and `NoteOnByDefaultTests` in `pywidget/tests/bridge/test_runner_t0632.py` (3.9.6 and 3.13.18).
- Why it was off: an existing test, `CrossRunResolutionTests.test_audit_probe_shadowing_folder_then_plain_folder` (`pywidget/tests/bridge/test_runner.py` line 628), asserts a silent console for exactly this case. It was written for T-0414 before any note existed. My <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> for this task may not change an existing test, so switching it on was a follow-up row, T-1111: that assertion now expects the line, and the default in `runner.bootstrap` is on.
- Nothing here departs from `creative/approved.md` that I can see: it is console text that reports a fact, drawn in the existing stderr style. If question 3 ends in a new style, that part goes to the Investors as C51 asks.

## Maren's decision, 2026-11-02

Yes, the console says so, on the terms in your recommendation: one line per passed-over name the run's own code imports, every console run, never in widget runs, previews or buffer runs. Still DRAFT copy under C51 like the installer words: console text that reports a fact, in the existing stderr style.

### 1. The words: yours, with two changes

- "To use your file, give it another name." becomes "To use yours, rename it and import the new name." A beginner who renames `random.py` to `dice.py` and keeps `import random` gets the same surprise again; the step has to say both halves. "Yours" also covers a folder, so one template per kind serves files and folders, and the code needs no file/folder switch.
- "the requests package that comes with pywidget" becomes "the requests package built into pywidget". Same phrase as installer item 17 ("already built into pywidget") and 21 ("pywidget has {have} built in"), so a person who meets both reads one idea in one set of words. "pywidget" stays lower case as in the installer copy; the name is still the Investors' (C51) and moves with the same find-and-replace.

The first half stays as you wrote it. "isn't imported as random" is true of `import random` and `from random import roll` alike, which "isn't used by import random" would not be.

Arguments stay positional in the order your code passes them, `% (shown, name, name)`. Word counts by script, with the names filled in: 25 (stdlib), 27 (bundled). One line each, 143 to 161 characters.

Stdlib name, `runner._NOTE["stdlib"]`:

```python
"%s in this folder isn't imported as %s: Python's own %s module is used instead."
" To use yours, rename it and import the new name.\n"
```

Shown: `random.py in this folder isn't imported as random: Python's own random module is used instead. To use yours, rename it and import the new name.`

Bundled package, `runner._NOTE["bundled"]`:

```python
"%s in this folder isn't imported as %s: the %s package built into pywidget is used instead."
" To use yours, rename it and import the new name.\n"
```

Shown: `requests.py in this folder isn't imported as requests: the requests package built into pywidget is used instead. To use yours, rename it and import the new name.`

### 2. The folder case: same frame, the trailing slash marks the folder

`requests/ in this folder`, not "The folder requests/". One sentence shape for files and folders, the name first where the eye lands, and the slash is how a folder is written in a path. No extra string; the first `%s` is `requests/` (or `json/` for a stdlib-named folder):

```text
requests/ in this folder isn't imported as requests: the requests package built into pywidget is used instead. To use yours, rename it and import the new name.
```

### 3. Style: ship in the existing stderr style; a quieter note is a follow-up for the Investors

The stderr style is right enough to ship. In the common case this line explains the error that follows a few lines later, and it sits just above it. It is not an error itself, though, and a run that then works prints a line in error ink for nothing wrong. A quieter note line (`text.secondary` on `bg.console`, the `codeConsole` size, no danger colour) would read better. That is a new console style: a third kind of output line, which needs a Swift change and a way for the runtime to mark the line. I don't decide it here.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 3. Style: ship in the existing stderr style; a quieter note is a follow-up for…, scrolls sideways" style="--tw:823px" markdown="1">

| Follow-up | Who | What |
|---|---|---|
| Console note style (C51) | Investors, after Idris says what it costs | A third console line style for notes: `text.secondary` on `bg.console`, `codeConsole` size, no colour, no icon. Used first for this line. Recommendation: yes. Until approved, the line ships in the stderr style with the words above. Preview to draw for the card: the `random.py` case, light and dark, above the `AttributeError` it explains. |

</div>


### 4. No prefix

No `Note:`. The line starts with the file name, which is the thing the person will search their folder for. A prefix adds a word that only says the line is a line, and in error ink "Note:" beside red reads as a contradiction. If the quieter style in 3 is approved, the style does the prefix's job.

### For Pernille

Replace the two strings in `runner._NOTE` with the blocks above, word for word. The comment on line 475 can keep "DRAFT (C51)". Switching the note on stays your follow-up row (the one assertion in `test_runner.py` line 628, and the bootstrap key).
{% endraw %}

</div>
