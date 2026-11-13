---
layout: "default"
title: "The Restructuring, phase 3: structure"
section: "documents"
description: "The project model, the app&#x27;s navigation, the Builder and the marketplace, drawn so that one Project serves the programmer, the casual creator and the person who only wants finished things."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/restructuring/' | relative_url }}">← The Restructuring</a><a href="{{ '/documents/restructuring/03-structure.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Restructuring</span><span>Day 22 · Thu Nov 12, 11:18 PM ET</span><span><code>documents/restructuring/03-structure.md</code></span></div><h1>The Restructuring, phase 3: structure</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Model: claude-fable-5-2. Commit read: 3cc4481247 (branch personal/a, 2026-11-12 10:25 PM ET). Of the app's files I read two, for what the project file already holds: `pywidget/ios/App/Runtime/_pywidget_runtime/app_manifest.py` and `pywidget/docs/design/manifest.schema.json`. The rest comes from phases 1 and 2 and two documents they cite: [`pywidget/docs/research/L17-builder.md`](../pywidget/l17-builder.html) ("L17") and [`pywidget/docs/decisions/ADR-006-marketplace-staging.md`](../pywidget/adr-006-marketplace-staging.html) ("ADR-006"). I built, ran and measured nothing. Project, Page, Builder, Gallery and component are placeholder names.

## Questions for the Investors, each with a recommendation

Phases 4 to 6 work from the recommendations, as working assumptions.

1. **Is the manifest (the one file listing what a project makes) the truth, and the folders only a habit?** Recommend: yes. Templates lay out tidy folders; a programmer may keep a single file.
2. **What is a component?** Recommend: a source (returns data), a view (draws data), or the pair, with a small file saying what it needs and touches. Shared in the app it is blocks; as Python it travels by file.
3. **How do updates reach an installed copy?** Recommend: the app offers a newer version and the person chooses. Never silent. A file they changed is kept unless they say otherwise.
4. **Keep the four approved tabs, with three ways to start on Projects?** Recommend: yes. It stays inside `creative/approved.md` item 2. Any other tab set is a new layout and needs your "approve".
5. **One first-run question that picks where a person lands?** Recommend: yes. It can be skipped and hides nothing.
6. **How do blocks and hand-written code live together?** Recommend: the generated Python is always on view, read-only; "Edit as code" detaches a file and can be undone; hand-written code joins a Builder project as a custom block. Editing either side freely comes later.
7. **May a Gallery item offer its parts in 1.0?** Recommend: yes, for our own items, which ship inside the app: "Get" the whole Weather widget, or "Add to project" only its weather source.
8. **May items shared with other people carry pictures?** Recommend: a person's own project holds any media; an item listed in the app for others is text and system symbols only at first, so moderation stays a reading job.
9. **Where does each part's documentation live?** Recommend: one plain-English page per part beside the code, its diagram drawn from the code onto the site. A new part's design starts with that page.

## Working assumptions

Each line is a recommendation from phase 1 ([`01-questions-and-limits.md`](01-questions-and-limits.html), "P1 Qn") or phase 2 ([`02-audit.md`](02-audit.html), "P2 Qn") with no Investor answer yet. Text that leans on one says "(WA)".

- The Builder is in 1.0, on the widget output first (P2 Q1 and "How the Builder fits 1.0").
- The Project is the unit: one folder, one manifest, one ID (P2 Q3).
- 1.0 outputs: the widget, the Shortcuts action, the plain run screen. Pages in 1.1; a message card after a phone measurement (P2 Q4, P1 Q9).
- Python makes data and our SwiftUI draws it (P1 Q8). Python runs in the app unless a phone measurement says otherwise (P1 Q7, P2 Q6).
- 1.0 has no live marketplace, paid items, server or account (P1 Q1, Q2, Q10). Browsing and installing stay free; Pro is power features (P2 Q8).
- In the app, other people's work is block documents; their Python waits for Apple's answer (P2 Q5; P1 Q3, Q4, Q6).
- 13 or over; no likes, comments or feeds (P1 Q13).
- Documentation is a done condition (P2 Q9), built as [`07-documentation.md`](07-documentation.html) recommends.

One seam: P1 Q4 allows "widgets and components with visible source"; P2 Q5, block documents only. They agree if "visible source" is the Python our compiler writes from the blocks, shown before install. I read it so.

## 1. The Project as a directory

### Layout

```
My Weather/                      one Project: one folder, one ID
├── pywidget.json                the manifest (below)
├── sources/weather.py           read(settings) -> data             never draws
├── views/today.py               draw(data) -> screen description   never fetches
├── views/forecast.py            a second view over the same data
├── blocks/today.blocks.json     a Builder document; compiles to views/today.py
├── components/local-weather/    an installed part, with its own component.json
└── assets/                      images, fonts, data files
```

The manifest exists today with an ID, a name and one entry file (`app_manifest.py`). A separate draft lists permissions, and nothing reads it (`manifest.schema.json`; 2b s1). The proposal joins them in one file:

```
pywidget.json
  id, name, version      who I am; the ID never changes
  outputs                what I make
    today     widget    view views/today.py     source weather   small, medium
    forecast  page      view views/forecast.py  source weather   (1.1)
    refresh   shortcut  run  main.py
  sources                weather = components/local-weather, settings: units
  touches                location while in use; network: one named host
  origin                 the Gallery item, its version, author and licence,
                         and a fingerprint of each file as installed
  formats                screen description 1, block catalog 1
```

- Every other identity derives from the ID: the widget's, the Shortcuts entry, the key store. Today there are five (2b s2).
- The copy the widget extension reads is a cache built from the folder, never a second original.
- Keys and passwords stay in the keychain under the ID, never in the folder, so an exported project cannot leak them.
- A project from a newer app is refused in plain words; the reader's Python half already does this (`newer_version`).

**Choice: free layout or fixed folders.** (A) The manifest names each output's file and function; folders are what templates and the Builder create, and a programmer may keep one `main.py`. (B) Folders the app enforces. Recommend A: B is tidier for us and a fence for the programmer.

### What a component is

A component is the smallest thing worth reusing: a **source** (a `read()` that returns data), a **view** (a `draw()` that turns data into a screen description, the data our SwiftUI draws), or the pair. It carries `component.json`: name, version, settings with types and defaults, a sample of its data, what it touches, author, licence. The premades already split this way, in private (2b s4).

Two forms, one file format:

- **Block component:** blocks and settings, no code. Our compiler, inside the reviewed app, writes its Python on the device. This is the form the app may list from other people (WA).
- **Python component:** a folder of hand-written Python. Ours ship inside the app. Another person's arrives as a file the person opens themselves, behind a notice that says it is outside code and what it touches (WA; the notice is unbuilt, 2b s5).

A whole project is a manifest, its components and its outputs. A premade is a project.

### One piece of Python, several outputs

```
              sources/weather.py   read()      one fetch per refresh
                       │ data
       ┌───────────────┼────────────────┐
       ▼               ▼                ▼
 views/today.py   views/forecast.py   (message card, later)
 draw()           draw()
       │               │
 widget: saved,   Page: drawn live
 drawn by the     in the app (1.1)
 extension
```

One run queue serves every output (P2's proposed rule for ADR-007). On a refresh it calls each source once and hands the same data to every view that asked for it. The widget still gets a saved description, as fresh as the app's last run [company research: [`work/01a-platform-limits.md`](01a-platform-limits.html) s1]. A checker says what each output may draw: a Page may scroll and take typed text; a widget may not.

**How the app shows which product uses which code.** The manifest is the one truth, and three places read it:

- **The project page** lists Outputs, Code and Touches. Each code row says "Used by: Today widget, Forecast page". Each output row says what it uses. Code that no output uses is marked "not used".
- **The editor** shows the same line above the file. Its preview switch offers exactly those outputs.
- **The Builder** shows a source as one data block, and its inspector lists the outputs that read it.

Sources are declared, so that half is exact. Helper files are found from each file's `import` lines, read without running anything; an import built at run time is missed, so the row says "may also use".

### Copy, edit, add

```
Gallery item ── Get ─────────────► a new Project, new ID, origin recorded
             ── Make it mine ────► the same copy, opened in the Builder
             ── Add to project… ─► pick a project ► components/<name>/ and a line in sources
A file from outside ── Open ─────► the outside-code notice ► the same three choices
```

- An installed item is always the person's own editable copy. The author's later changes never overwrite it (ADR-006 13.3).
- A component that touches more than the project does asks first: "This adds: your location."

### Versions and updates

Every item carries a version and its origin. Options:

- **(A) None.** A copy is a copy; install again for the new one.
- **(B) Offered, never silent.** The project page says "Version 1.3 is available" and what changed. Untouched files (the app keeps a fingerprint of each as installed) are replaced on the person's tap. A changed file is shown side by side and kept unless they choose otherwise. If the update touches more, it asks.
- **(C) Automatic.**

Recommend B. C changes running code without the person's act; phase 1 lists "no silent updates" among a shared project's limits [company research: [`work/01b-review-and-marketplace.md`](01b-review-and-marketplace.html) s2]. In 1.0 the Gallery ships inside the app, so a new version arrives with an app update and takes the same path.

## 2. Navigation and layout

### Sections

The approved layout is four tabs with Projects as home (`creative/approved.md` item 2). It is drawn, not built: the app opens on a code editor (2b s3). Options:

- **(A) Keep the four tabs; the tools live inside a project.** Projects (my things, and New), Gallery (finished things and parts; the marketplace later), Docs, Settings.
- **(B) Tabs by tool:** Projects, Builder, Code, Gallery, Settings. One project is then spread over three tabs.
- **(C) Tabs by audience:** Make, Browse, Mine. People change audience: a person who taps "Make it mine" has left their tab.

Recommend A. B and C are new layouts and would need "approve".

```
 [ Projects ]        [ Gallery ]         [ Docs ]     [ Settings ]
      │                   │
      │ New ▸ From the Gallery · With blocks · With Python
      │                   └─ item page ▸ Get · Make it mine · Add to project…
      ▼
 Project page     Outputs · Code · Touches · From
      ├─ Builder   blocks and inspector ─┐ two views of one output
      ├─ Editor    Python and console  ──┘
      └─ Preview   every output, every size, light and dark; beside either tool
```

The project page is the hub. The Builder and the editor are two ways into the same output, never two places. The marketplace is the Gallery tab with more <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelves</span>, not a new section.

### First run

One screen, one question: "What would you like to do first?" It sets where the person lands, once. It can be skipped, hides nothing and asks for no account. Onboarding's look is not yet approved (`creative/approved.md` item 2); phase 4 draws it.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: First run, scrolls sideways" style="--tw:839px" markdown="1">

| Choice | Lands on | Taps to a result (counted on paper) |
| --- | --- | --- |
| "Use a ready-made widget" | Gallery | Item, Get, then the "Add to Home Screen" steps: 3 |
| "Make my own, no code" | Gallery starters | Starter, Make it mine, change one setting in the Builder: 3 |
| "Write Python" | A new project from a template, editor and preview open | Run: 2 |

</div>


The last step for a widget is the person's own: an app cannot place a widget on the Home Screen [recalled, verify], so a sheet shows the steps.

After first run, all three start from Projects ▸ New. Projects shows each project as a live picture of what it makes, so a person with only installed widgets sees widgets, not folders.

### iPhone and iPad

```
iPhone, 390 wide            iPad
┌────────────────────┐      ┌──────────┬───────────────────┬────────────┐
│ Today  Blocks|Code │      │ Project  │ Builder or Editor │ Preview    │
│ blocks or code     │      │ Outputs  │ blocks beside     │ output     │
│ ▲ Preview: pull up │      │ Code     │ read-only code    │ size       │
├────────────────────┤      │ Touches  │ Console           │ light/dark │
│ tab bar            │      └──────────┴───────────────────┴────────────┘
└────────────────────┘
```

On iPhone the tool fills the screen, a switch chooses Blocks or Code, and the preview is a sheet pulled up from the bottom. On iPad the three sit side by side: the approved iPad drawing (file list, editor, live preview; 2b s3) with the Builder in the middle column.

## 3. The Builder

**Readable Python.** The Builder edits a block document: block names from one catalog and their settings, no code. A compiler written in Python turns it into one `.py` file, built through Python's own syntax tree and never by pasting text, so a setting's value cannot become code (L17 s2: a probe passed 15 of 15 hostile values on a Mac's Python; it has not run in the app). Readable means one statement per block, in block order, under a comment naming the block; the same `read()` and `draw()` a programmer writes; the same document always giving the same file. The preview runs that file, so what the person sees is what runs, and an error lands on its block.

**"Edit the code" without breaking the Builder.** Options; the first three are L17 s4's:

- **(a) One way.** "Convert to code", and the blocks are gone.
- **(c) Hybrid.** The Python sits beside the blocks, read-only; selecting a block lights its lines. "Edit as code" detaches the file and keeps the block document; "Back to blocks" first shows what would be lost. An untouched file reopens in blocks exactly.
- **(b) Round trip.** Edit either side. One loop the Builder has no block for and the file is code only: a rule people meet by surprise. It costs 2.5 to 3 engineer-weeks over (c), an estimate (L17 s4).
- **(d) Custom block.** Hand-written Python is its own file, a source or a view, which the Builder shows as one block with its settings and never rewrites. New here, and unsized.

Recommend (c) with (d): the hybrid inside a file, the custom block across files. The folder does the work a parser would otherwise do, the statement's "option to edit the underlying code" is met, and neither side can break the other. (b) is the first follow-up, if people are seen detaching and coming back.

```
blocks/today.blocks.json ── compile on the device ──► views/today.py    generated
      ▲ the Builder edits                               │ read-only; block ↔ lines
      └── Back to blocks (shows the loss) ◄── Edit as code (hand-written from here)

custom block "weather" ──── points at ────► sources/weather.py    never rewritten
```

**Making a component publishable.** "Save as component" on a group of blocks, a source or a view writes the component folder and checks it on the device:

1. Settings have names, types and defaults, and sample data is present, so a preview needs nobody's real data.
2. What it touches is declared and matches what it uses.
3. A licence is picked from a short list and "I have the right to share this" is ticked (1b s2).
4. For listing in the app: blocks only, no detached file, no custom block (ADR-006 13.3), and question 8's limit on pictures.

Passing 1 to 3, it can be shared as a file from 1.0 (WA). Passing 4 too, it can enter a live gallery's queue when there is one. Same folder, same check.

## 4. The marketplace


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4. The marketplace, scrolls sideways" style="--tw:1092px" markdown="1">

| What is listed | Form | In 1.0 | Later |
| --- | --- | --- | --- |
| Our projects and components | Readable Python; blocks | Inside the app: the 12 premades, and their sources and views as Gallery parts and Builder blocks | More, by app update |
| Other people's projects and components | Block documents | By file only | A live shelf, after Apple's answer (WA) |
| Other people's Python | Files | By file, behind the notice | In the app only if Apple approves |

</div>


Never listed (WA): a Page with its own icon, rating or price; anything paid.

**Options for 1.0.** (A) The Gallery ships inside the app; sharing is by file; no server, account or desk. (B) A, plus our examples as readable code on the company site after release. (C) A live community shelf, which needs Apple's answer, accounts, hosting and a staffed desk first. Recommend A, then B.

**Install and copy.** Before install, an item page shows a live preview, what the item touches, its maker, licence and version, and its blocks or code. Then section 1's three choices. One item per tap; no account.

**Moderation, once other people's items are listed.**

```
Publish (Sign in with Apple, 13 or over) ► automatic checks
        ► a worker reads it against written rules ► listed
Report (any item, no account) ► a worker sorts and drafts within 24 hours
        ► the Investors reply, and take appeals and legal notices
Removal ► a signed list read at launch, which only hides or stops
        ► installed copies are flagged
```

In 1.0 every item is ours and none of this is in the binary: guideline 2.5.19 bars dormant features (as P2 cites it).

**Free and paid.** Browsing, installing, sharing and publishing are free. Nothing listed has a price and no creator is paid (WA). Pro remains a purchase of the app's own power features through Apple's in-app purchase. Nothing is sold from a widget.

**Inside phase 1's review points** [company research: [`work/01b-review-and-marketplace.md`](01b-review-and-marketplace.html) s1, with the quotes and ratings]. None is tested with App Review.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 4. The marketplace, scrolls sideways" style="--tw:540px" markdown="1">

| Point | What this structure does |
| --- | --- |
| 2.5.2 | Source always viewable and editable; only the shipped runtime; install on the person's tap; other people's items in the app are data, compiled by our reviewed compiler |
| Agreement 3.3.1(B); 3.2.2(i) | The store page says community projects exist; a listing has no icon, rating, price or chart, so it reads as content, not an app |
| 4.7 (unsettled) | Built as if it applied: consent per item; no device capability or author-chosen host in other people's items; an age gate |
| 1.2 | Filter before listing, report, block, a published contact |
| 3.1.1; 4.4 | Nothing listed is sold; no offer inside the widget |
| 5.1.1; 4.8; 5.1.2 | No account to browse or install; Sign in with Apple only to publish; network hosts declared and shown |
| 2.3; 2.5.19 | A live shelf arrives in a reviewed update, named in the review notes; never switched on from a server |
| Age rating | No likes, comments or feeds |

</div>


## 5. Where the documentation lives

The Investors ruled that documentation is part of designing each app part, with diagrams drawn by code from the code and shown on the site (#41, 5:22 PM and 5:23 PM ET, 11-12). In this structure (WA: the tool [`07-documentation.md`](07-documentation.html) recommends):

```
pywidget/docs/how-it-works/<part>.md   three to six plain sentences;
                                       each step names a file and a name in it
tools/site/                            the company's own generator reads the
                                       code and writes the diagram
site ▸ Documents ▸ How the app works   per part: its diagram, the same facts
                                       as a list, the commit it was drawn from
```


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 5. Where the documentation lives, scrolls sideways" style="--tw:640px" markdown="1">

| Part | Its diagram is drawn from |
| --- | --- |
| The Project | The manifest's format and the project store |
| Outputs and shared code | The run queue and each output's entry |
| The Builder | The block catalog and the compiler |
| Gallery and install | The item format and the copy path |
| What a project touches | The manifest and the device router |
| Screens, the Python run, script to Home Screen, storage, the extension, purchases | 07's first set |

</div>


The page is written before the part's code. The part is not done until its diagram is on the site and its words are checked against it. No AI images, and no words written by a program. The folder path is a proposal for step D2 to confirm.

In the app, the Docs tab carries each part's help.

## Maybe later

- A map of a project inside the app, sources to outputs.
- Editing blocks and code either way (option b).
- Other people's Python listed in the app; paid items and paying creators. Each is its own proposal.
- Pages drawn in a web view; a message card; projects synced between devices.
- One project using another's code without copying it.
{% endraw %}

</div>
