---
layout: "default"
title: "Install from file: refusal copy read"
section: "documents"
description: "Voice (same as the PWL003/PWL012 drafts, fb0e859d): what happened, then what to do, second person, 10 to 36 words here. Each message ends with something the person can do, or says plainly that there is nothing to do\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/installer-messages-maren.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/reviews/installer-messages-maren.md</code></span></div><h1>Install from file: refusal copy read</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Draft copy, not approved. Source: `pywidget/runtime/installer/_pywidget_install/messages.py` at HEAD (Pernille, T-0049 e483d9de; T-0211 5e423495 did not change it). Pernille applies; I have not edited messages.py.

**Voice** (same as the PWL003/PWL012 drafts, fb0e859d): what happened, then what to do, second person, 10 to 36 words here. Each message ends with something the person can do, or says plainly that there is nothing to do. Word counts by script (placeholders count as one word).

**The test** for each refusal: plain, short, beginner-friendly, says what happened, says what to do. 22 refusals: 21 change, 1 stays as it is (18). The usual gap is the second half: 17 say what happened and stop.

**Strings the tests need** (tests/installer/test_refuse.py, test_resolver.py); every recommendation below keeps them: `pure-Python` and `{member}` in 5 and 6; `{tag}` in 7; `{version}` in 17; `never downloads` and `{needs}` in 20; `{count}` and `{limit}` in 3; no `{` left after formatting.

## Refusals

1. **not_a_package_file**. Now: "{file} isn't a package file. Add a wheel (.whl) or a zip of Python source (.zip)." Close; the verb on this screen is pick, not add.
   - Recommended (19): "{file} isn't a file pywidget can add. Pick a wheel (.whl) or a zip of Python source code (.zip)."
   - New code, Pernille's call: **not_a_package_file_targz**, when the name ends in `.tar.gz`. A beginner on PyPI sees "Source Distribution" first, and it is a `.tar.gz`. Recommended (22): "{file} is a .tar.gz archive, which pywidget can't open. On the package's PyPI page, download the file that ends in .whl instead."

2. **bad_zip**. Now says what happened, not what to do, and "zip archive" confuses someone who picked a `.whl`.
   - Recommended (20): "{file} couldn't be opened. It may be damaged or only partly downloaded. Download it again and pick the new copy."

3. **too_many_files**. Now has no action. The likely cause for a beginner is a zipped project folder (a `.git` or a virtual environment inside).
   - Recommended (25): "{file} <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> {count} files, more than the {limit} pywidget can add from one package. If you zipped a whole project, zip only the package folder."
   - Format the limit with a thousands separator, `{limit:,}`: "20,000", not "20000". Same for `{count}`.

4. **too_big**. Same gap, same likely cause.
   - Recommended (25): "{file} unpacks to {size}, more than the {limit} pywidget can add from one package. If you zipped a whole project, zip only the package folder."

5. **native_file**. Now explains well (26 words) but gives no next step.
   - Recommended (28): "{file} contains compiled code ({member}), and iOS runs only the compiled code that comes with the app. Look for a pure-Python version: its file name ends in py3-none-any.whl."
   - "ends in py3-none-any.whl" is true of both accepted tags (archive.py line 36: `py3-none-any`, `py2.py3-none-any`).

6. **native_magic**. "{kind}" shows "Mach-O" or "ELF"; that word helps nobody here. Keep `kind` in the fields for logs, drop it from the sentence. Same next step as 5.
   - Recommended (29): "{file} contains a compiled program ({member}), and iOS runs only the compiled code that comes with the app. Look for a pure-Python version: its file name ends in py3-none-any.whl."

7. **platform_tag**. Now names the tag and the rule, not the next step.
   - Recommended (22): "{file} is built for {tag}, and pywidget can add only pure-Python wheels. Look for the version whose file name ends in py3-none-any.whl."

8. **not_pure**. "platform-specific parts" is vague; the field name is the useful clue for someone who searches it.
   - Recommended (26): "{file} is marked as not pure-Python (Root-Is-Purelib in its WHEEL file isn't true), so pywidget can't add it. Look for a pure-Python version of the package."

9. **compiled_only**. Now has no next step, and its second sentence starts with lowercase "pywidget".
   - Recommended (29): "{file} has a compiled Python file ({member}) without its .py source, and pywidget adds only code you can read and edit. Pick a copy that includes the .py files."

10. **unsafe_path**. "won't open it": it did open it; it won't add it. No next step. This one can mean a tampered file, so point to the source.
    - Recommended (26): "{file} has a file ({member}) that would be saved outside your packages folder, so pywidget won't add it. Download it again from the package's own page."

11. **link_member**. No next step. Only the person who made the zip can fix it.
    - Recommended (33): "{file} contains a link ({member}) where a file should be, so pywidget won't add it. If you made this zip, put the real file in place of the link and zip it again."

12. **case_clash**. Says what iOS does but not what that means for the install, and no next step.
    - Recommended (36): "{file} has two files whose names differ only in capital letters ({member} and {other}). iOS sees them as one file, so pywidget can't add both. If you made this zip, rename one and zip it again."

13. **bad_wheel**. The frame is fine; the reasons are where the copy lives, and each needs its own next step. Change the frame and put the action in each reason (every reason ends with a period, so the frame adds none).
    - Frame (8 + reason): "{file} can't be added as a wheel: {reason}"
    - a. file name (archive.py line 197). The common beginner case: a browser or Files adds " (1)" or " 2" to a second download, and the space breaks the pattern. Recommended: "its name isn't in the form name-version-py3-none-any.whl. If your browser or Files added something like \" (1)\" to the name, remove it."
    - b. dist-info count (211): "it should have exactly one .dist-info folder. Download it again."
    - c. dist-info name (214): "its .dist-info folder is for a different package than the file name says. Download it again."
    - d. WHEEL or METADATA missing (219): "its WHEEL or METADATA file is missing. Download it again."
    - e. not UTF-8 (221): "its WHEEL or METADATA file isn't readable text (UTF-8). Download it again."
    - f. wheel format (224): "it uses a newer wheel format than pywidget can read. Look for an older release of the package."
    - g. METADATA name (234): "its METADATA names a different package (%s). Download it again from the package's own page."
    - h. RECORD unreadable (272, fallback text): "its RECORD file can't be read. Download it again." The upstream `e.reason` text comes from the vendored installer and is not ours; make sure it ends with a period, and if it reads as code, use the fallback.
    - i. store.py line 185 shows `str(e) or type(e).__name__`. A class name such as "KeyError" is not a sentence. Recommended fallback: "something inside it couldn't be read. Download it again." Log the type, don't show it.

14. **record_mismatch**. "altered" is right and worth keeping as "changed"; no next step.
    - Recommended (24): "{file} doesn't match its own list of files (RECORD), so it may be damaged or changed. Download it again from the package's own page."

15. **nothing_to_install**. Right on content, but it starts with lowercase "pywidget" and ends on a rule rather than a step.
    - Recommended (31): "{file} has no Python code pywidget can add. Put .py files, or a folder with __init__.py, at the top of the zip or in a src folder, then zip it again."

16. **requires_python**. Says what happened, no next step.
    - Recommended (21): "{name} {version} needs Python {spec}, and pywidget runs Python {python}. Look for a version of {name} that works with Python {python}."
    - Later, optional: `{spec}` shows ">=3.14". "3.14 or later" reads better, but only for simple specs; not worth a parser now.

17. **built_in**. Correct, but it reads as a refusal of something the person already has. Lead with the good news.
    - Recommended (26): "{name} is already built into pywidget (version {version}), so you don't need to add it. Import it as usual; an added copy would never be used."

18. **duplicate**. Passes. Keep: "You picked two files for {name} ({first} and {second}). Pick one." (11)

19. **file_conflict**. "replace it": "it" could be the file or the package. Say the two can't live together.
    - Recommended (23): "{name} would replace {member}, a file that belongs to {owner}, so the two can't be added together. To add {name}, remove {owner} first."
    - "remove" must match the button on the packages screen; that screen is not in the IDE spec yet. If the button says Delete, this says delete.
    - Remove or Delete: not settled here. No voice or copy guide is approved, so it went to the same <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> item (2026-10-26 20:15). Recommended: "Remove" for packages (the picked file stays in Files; pairs with "add"), "Delete" only for the person's own scripts and projects.

20. **missing**. Right on content, and is the most important one. Two fixes: lead with the rule, and name PyPI, because "download as wheels" assumes the reader knows where.
    - Recommended (30): "{name} needs {needs}, which {verb} not installed, and pywidget never downloads packages. Download {pronoun} as wheels (.whl) from pypi.org in your browser, then pick {pronoun} in Files together with {name}."
    - Keep "as wheels (.whl)": PyPI's source downloads are `.tar.gz`, which pywidget refuses (item 1).

21. **version_conflict**. No next step, and "is installed" is wrong in two of its three cases. resolver.py lines 96-111: `{have}` can be built in (`installed` holds bundled and user packages, line 69), user-installed, or another file picked in the same go (`by_key`). Pass where it came from and use one sentence per case:
    - user (26): "{name} needs {requirement}, but {have} is installed. Look for a version of {name} that works with {have}, or remove {have} and add a version that fits."
    - built in (26): "{name} needs {requirement}, but pywidget has {have} built in, and the built-in copy is always used. Look for a version of {name} that works with {have}."
    - picked together (20): "{name} needs {requirement}, but you picked {have}. Pick a version of {have} that fits, or a different version of {name}." ("a version of {have}" reads "a version of helper 1.0"; if Pernille can pass the name alone, use it.)

22. **not_installed** (uninstall). Close; add why it matters.
    - Recommended (10): "{name} isn't in your packages, so there's nothing to remove."

## Two notes beyond the refusals

- **Name.** Copy uses the working name "pywidget" (IDE spec line 123: the name is the Investors' call), while ios/project.yml lines 47 and 79 set the display name to "PyWidget". No recommended sentence above starts with the name, so either casing reads. The name and its form are the Investors' (C51), not Ines's; asked in ops/questions.md "For the next report" (2026-10-26 20:15, preview ide/name-options.png). Recommended: "PyWidget" in copy, `pywidget` only in code. One find-and-replace either way.
- **Warnings** (not in this task): `dropped_compiled` says "file(s)"; use the `{verb}`/`{pronoun}` pattern the refusals already use. The rest read plainly.
{% endraw %}

</div>
