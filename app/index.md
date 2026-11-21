---
layout: "default"
title: "App"
section: "app"
description: "How the app works: its parts, screens, Python run, path to the Home Screen, storage, widget extension, purchases, and the editor's completion and caret, drawn from its code."
---
<div class="page-head"><div class="kicker"><span class="kind blue">Diagrams</span><span>Drawn from commit <code>10a2a5f228 2026-11-21 2:32 PM ET</code></span></div><h1>App</h1></div>
<style>.wf-legend{display:flex;flex-wrap:wrap;gap:var(--s2) var(--s4);list-style:none;padding:0;margin:var(--s3) 0}.wf-legend li{display:flex;align-items:center;gap:6px;font-size:var(--fs-1);color:var(--muted)}.wf-key{display:inline-block;width:14px;height:14px;border-radius:3px;border:1px solid var(--line);flex:none;margin-right:6px;vertical-align:-2px}.wf-key.script{background:var(--grey-bg)}.wf-key.decision{background:var(--amber-bg)}.wf-key.operator{background:var(--blue-bg)}.wf-key.worker{background:var(--green-bg)}.wf-key.investor{background:var(--pink-bg)}.wf-key.ghost{background:var(--bg);border:1.5px dashed var(--muted)}.wf-tools{display:flex;justify-content:flex-end;margin:0 0 var(--s2)}.wf-chart{overflow-x:auto;border:1px solid var(--line);border-radius:var(--r-m);background:var(--bg);padding:var(--s3)}.wf-chart svg{display:block;margin:0 auto;height:auto}.wf-chart.fit svg{width:100%!important;max-width:100%!important}.wf-chart .node{cursor:pointer}.wf-chart .node:focus{outline:none}.wf-chart .node:focus-visible rect,.wf-chart .node:focus-visible polygon,.wf-chart .node.wf-on rect,.wf-chart .node.wf-on polygon{stroke:var(--accent)!important;stroke-width:3px!important}.wf-chart .node.script rect,.wf-chart .node.script polygon,.wf-chart .node.script path{fill:var(--grey-bg)!important;stroke:var(--line)!important}.wf-chart .node.decision rect,.wf-chart .node.decision polygon{fill:var(--amber-bg)!important;stroke:var(--amber-fg)!important}.wf-chart .node.operator rect,.wf-chart .node.operator polygon{fill:var(--blue-bg)!important;stroke:var(--blue-fg)!important}.wf-chart .node.worker rect,.wf-chart .node.worker polygon{fill:var(--green-bg)!important;stroke:var(--green-fg)!important}.wf-chart .node.investor rect,.wf-chart .node.investor polygon,.wf-chart .node.investor path{fill:var(--pink-bg)!important;stroke:var(--pink-fg)!important}.wf-chart .node.script .nodeLabel,.wf-chart .node.script text{color:var(--grey-fg)!important;fill:var(--grey-fg)!important}.wf-chart .node.decision .nodeLabel,.wf-chart .node.decision text{color:var(--amber-fg)!important;fill:var(--amber-fg)!important}.wf-chart .node.operator .nodeLabel,.wf-chart .node.operator text{color:var(--blue-fg)!important;fill:var(--blue-fg)!important}.wf-chart .node.worker .nodeLabel,.wf-chart .node.worker text{color:var(--green-fg)!important;fill:var(--green-fg)!important}.wf-chart .node.investor .nodeLabel,.wf-chart .node.investor text{color:var(--pink-fg)!important;fill:var(--pink-fg)!important}.wf-chart .node.ghost rect{fill:var(--bg)!important;stroke:var(--muted)!important;stroke-dasharray:5 4}.wf-chart .node.ghost .nodeLabel,.wf-chart .node.ghost text{color:var(--muted)!important;fill:var(--muted)!important}.wf-chart .cluster rect{fill:var(--soft)!important;stroke:var(--line)!important}.wf-chart .cluster .nodeLabel,.wf-chart .cluster-label text{color:var(--ink)!important;fill:var(--ink)!important;font-weight:600}.wf-chart .flowchart-link{stroke:var(--muted)!important}.wf-chart marker path,.wf-chart .arrowheadPath{fill:var(--muted)!important;stroke:var(--muted)!important}.wf-chart .edgeLabel,.wf-chart .edgeLabel p,.wf-chart .edgeLabel rect,.wf-chart .labelBkg{background:var(--bg)!important;background-color:var(--bg)!important;fill:var(--bg)!important;color:var(--muted)!important}.wf-step{border:1px solid var(--line);border-radius:var(--r-m);background:var(--bg);padding:var(--s3);margin:var(--s3) 0}.wf-step h4{margin:0 0 var(--s1);font-size:var(--fs-2)}.wf-step:target{border-color:var(--accent)}.wf-ref{border-left:3px solid var(--line);padding-left:var(--s3);margin:var(--s2) 0}.wf-ref p{margin:0;overflow-wrap:anywhere}.wf-ref .ref{margin-top:2px}.wf-facts{display:grid;grid-template-columns:minmax(8em,max-content) 1fr;gap:var(--s1) var(--s3);margin:var(--s2) 0}.wf-facts dt{font-weight:600}.wf-facts dd{margin:0;overflow-wrap:anywhere}.wf-ladder code{font-size:var(--fs-0)}.wf-obs caption{text-align:left;font-size:var(--fs-1);color:var(--muted);padding-bottom:var(--s1)}.wf-obs th{font-weight:600;white-space:nowrap}.wf-obs td{overflow-wrap:anywhere}.wf-dvo td{overflow-wrap:anywhere}.wf-chart .nodeLabel i{font-style:italic;font-size:var(--fs-0);opacity:.85}#wf-dlg{width:min(720px,94vw);max-height:86vh;border:1px solid var(--line);border-radius:var(--r-m);background:var(--bg);color:var(--ink);padding:0}#wf-dlg-x,.wf-zoom{font:inherit}#wf-dlg::backdrop{background:rgba(0,0,0,.45)}.wf-dlg-bar{position:sticky;top:0;display:flex;justify-content:space-between;align-items:center;padding:var(--s2) var(--s3);background:var(--bg);border-bottom:1px solid var(--line)}#wf-dlg-body{padding:0 var(--s3) var(--s3)}#wf-dlg-body .wf-step{border:0;padding:0;margin:var(--s3) 0 0}</style><style>.hiw-list li{overflow-wrap:anywhere}.hiw-list .kind{white-space:normal}</style>
<p class="meta">22 explanations are marked for a re-read.</p>
<p>pywidget is an iPhone and iPad app where a person writes a short Python script that becomes a widget on the Home Screen. The app holds the code editor, a Python interpreter and the person's projects. A separate small program, the widget extension, draws the widgets; iOS runs it apart from the app.</p>
<p>The app runs each script once, in the app, and saves the drawing it describes in a folder the app and the widget share. The widget reads that saved drawing and paints it; in any build that reaches the App Store it never runs Python itself.</p>
<h2 id="made-of">1. What the app is made of</h2>
<p>Xcode builds the app from separate pieces called targets. Arrows point from a piece to the pieces it is built with.</p>

<div class="wf-tools"><button type="button" class="btn wf-zoom" data-for="wf-made-of" aria-pressed="false" hidden><span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span> to width</button></div>
<div class="wf-chart" id="wf-made-of" data-src="wf-src-made-of"><p class="meta">Drawing the diagram...</p><noscript><p class="meta">The diagram is drawn by a script; the same facts are listed below.</p></noscript></div>
{% raw %}
<script type="text/plain" id="wf-src-made-of">flowchart LR
  subgraph n_What_people_install["What people install"]
    n_PyWidget["PyWidget<br/>application"]
    n_PyWidgetExtension["PyWidgetExtension<br/>app-extension"]
  end
  subgraph n_Tests["Tests"]
    n_PyWidgetTests["PyWidgetTests<br/>bundle.unit-test"]
    n_PyWidgetUITests["PyWidgetUITests<br/>bundle.ui-testing"]
  end
  subgraph n_Code_the_app_is_built_with["Code the app is built with"]
    n_Runestone["Runestone<br/>library.static"]
    n_Runestone_Runestone["Runestone_Runestone<br/>bundle"]
    n_TreeSitter["TreeSitter<br/>library.static"]
    n_TreeSitterLanguages_TreeSitterPythonQueries["TreeSitterLanguages_TreeSitterPythonQueries<br/>bundle"]
    n_TreeSitterPython["TreeSitterPython<br/>library.static"]
    n_TreeSitterPythonQueries["TreeSitterPythonQueries<br/>library.static"]
    n_TreeSitterPythonRunestone["TreeSitterPythonRunestone<br/>library.static"]
  end
  n_Python_xcframework[("Python.xcframework")]
  n_PyWidget --> n_Python_xcframework
  n_PyWidget --> n_TreeSitter
  n_PyWidget --> n_TreeSitterPython
  n_PyWidget --> n_TreeSitterPythonQueries
  n_PyWidget --> n_Runestone
  n_PyWidget --> n_TreeSitterPythonRunestone
  n_PyWidget --> n_Runestone_Runestone
  n_PyWidget --> n_TreeSitterLanguages_TreeSitterPythonQueries
  n_PyWidget --> n_PyWidgetExtension
  n_PyWidgetExtension --> n_Python_xcframework
  n_PyWidgetTests --> n_PyWidget
  n_PyWidgetTests --> n_Python_xcframework
  n_PyWidgetUITests --> n_PyWidget
  n_Runestone --> n_TreeSitter
  n_TreeSitterPythonRunestone --> n_Runestone
  n_TreeSitterPythonRunestone --> n_TreeSitterPython
  n_TreeSitterPythonRunestone --> n_TreeSitterPythonQueries</script>
{% endraw %}
<h3>What the app is made of, as a list</h3>
<ol class="hiw-list"><li><strong>PyWidget</strong> <span class="meta">(application; uses Python.xcframework, TreeSitter, TreeSitterPython, TreeSitterPythonQueries, Runestone, TreeSitterPythonRunestone, Runestone_Runestone, TreeSitterLanguages_TreeSitterPythonQueries, PyWidgetExtension)</span><br>The app a person installs: the editor, the console, projects, the gallery and settings, with the Python interpreter and pywidget's own Python modules packed inside. Python's standard library goes in while the app is built. One build step copies it from the Python that pywidget ships, turns each of Python's compiled modules into a small signed framework (the only form iOS lets an app load), removes the modules the app must not ship, and, for a release build, packs the rest into one zip file. The same step then checks the result and stops the build if a banned module is still there or the size is off. The tests on the Mac run that same step for real, once for each set of files it reads, and keep what each run produced. A later test run with the same files reads that record instead of copying the 8,786 library files again, in any working copy: a record is filed under what those files contain, never under the folder they sit in, so a copy made for the next change reuses what an earlier copy made. On 20 November, with the Mac busy, that took the tests from more than ten minutes (stopped at their limit) to between one and four; a first run from a fresh copy took 437 seconds, and a second fresh copy then took 61. Change any of those files and the step runs again. If a test run is stopped partway, the copies it was working on are deleted when the next test run starts, so they do not fill the Mac's disk. <span class="kind amber" title="anchor project.yml PyWidget: was f8627304f26c, now ffcc0bb5323b">The code changed after this was last checked.</span></li><li><strong>PyWidgetExtension</strong> <span class="meta">(app-extension; uses Python.xcframework; also sdk WidgetKit.framework, sdk SwiftUI.framework)</span><br>The widget extension: the small program iOS runs to draw pywidget's widgets on the Home Screen. It is shipped inside the app and reads what the app saved.</li><li><strong>PyWidgetTests</strong> <span class="meta">(bundle.unit-test; uses PyWidget, Python.xcframework; also sdk StoreKitTest.framework)</span><br>The automated tests of the app's code, run on the Simulator before any build is shipped.</li><li><strong>PyWidgetUITests</strong> <span class="meta">(bundle.ui-testing; uses PyWidget; also sdk StoreKitTest.framework)</span><br>The automated tests that open the app's screens and tap through them as a person would.</li><li><strong>Runestone</strong> <span class="meta">(library.static; uses TreeSitter)</span><br>The open-source text editor view the code editor is built on.</li><li><strong>Runestone_Runestone</strong> <span class="meta">(bundle; uses no other target)</span><br>The editor's own resources (its themes and privacy file), packed as a bundle.</li><li><strong>TreeSitter</strong> <span class="meta">(library.static; uses no other target)</span><br>The open-source parsing library the editor uses to understand code as it is typed.</li><li><strong>TreeSitterLanguages_TreeSitterPythonQueries</strong> <span class="meta">(bundle; uses no other target)</span><br>The colouring rule files themselves, packed as a bundle.</li><li><strong>TreeSitterPython</strong> <span class="meta">(library.static; uses no other target)</span><br>The Python grammar for that parser.</li><li><strong>TreeSitterPythonQueries</strong> <span class="meta">(library.static; uses no other target)</span><br>The rules that tell the editor which parts of Python code to colour, and how.</li><li><strong>TreeSitterPythonRunestone</strong> <span class="meta">(library.static; uses Runestone, TreeSitterPython, TreeSitterPythonQueries)</span><br>The small piece that connects the Python grammar to the editor view.</li></ol>
<h2 id="screens">2. Screens</h2>
<p>Every SwiftUI view in the app's App folder, grouped by folder. A view is a whole screen or a piece of one. The screens open from the IDE window's toolbar and its More menu until the tab bar lands.</p>
<p class="meta">56 views in pywidget/ios/App/ (47 SwiftUI; slanted: UIKit wrapped for SwiftUI). Solid arrow: presents the other (sheet, cover or push); dotted: draws it inside itself.</p>
<div class="wf-tools"><button type="button" class="btn wf-zoom" data-for="wf-screens" aria-pressed="false" hidden>Fit to width</button></div>
<div class="wf-chart" id="wf-screens" data-src="wf-src-screens"><p class="meta">Drawing the diagram...</p><noscript><p class="meta">The diagram is drawn by a script; the same facts are listed below.</p></noscript></div>
{% raw %}
<script type="text/plain" id="wf-src-screens">flowchart LR
  subgraph n_f_App["App/"]
    n_AcknowledgementsView["AcknowledgementsView"]
    n_AckRow["AckRow"]
    n_NoticePage["NoticePage"]
    n_NoticeBlock["NoticeBlock"]
    n_ConsoleTextView[/"ConsoleTextView"/]
    n_LauncherWindowProbe[/"LauncherWindowProbe"/]
    n_LauncherSetUpSheet["LauncherSetUpSheet"]
    n_IDEScene["IDEScene"]
    n_ContentView["ContentView"]
    n_ReplBar["ReplBar"]
    n_HUDView["HUDView"]
    n_SceneSessionProbe[/"SceneSessionProbe"/]
    n_SceneTitle[/"SceneTitle"/]
    n_SceneCounts[/"SceneCounts"/]
    n_StaleCheckView["StaleCheckView"]
    n_ThemeCheckView["ThemeCheckView"]
    n_WidgetActivityView["WidgetActivityView"]
    n_ActivityStripView["ActivityStripView"]
    n_ActivityRowView["ActivityRowView"]
    n_RunDetailView["RunDetailView"]
    n_WidgetInstallView["WidgetInstallView"]
    n_WidgetRunView["WidgetRunView"]
  end
  subgraph n_f_App_Editor["App/Editor/"]
    n_ConsoleEditor[/"ConsoleEditor"/]
    n_EditorBenchView[/"EditorBenchView"/]
    n_EditorCheckView[/"EditorCheckView"/]
  end
  subgraph n_f_App_Gallery["App/Gallery/"]
    n_GalleryWell["GalleryWell"]
    n_GalleryView["GalleryView"]
    n_GalleryDetailView["GalleryDetailView"]
  end
  subgraph n_f_App_Launcher["App/Launcher/"]
    n_LauncherTile["LauncherTile"]
    n_LauncherSettingsRow["LauncherSettingsRow"]
    n_LauncherAppsView["LauncherAppsView"]
    n_LauncherSlotRow["LauncherSlotRow"]
    n_LauncherSlotSheet["LauncherSlotSheet"]
    n_LauncherAppChooser["LauncherAppChooser"]
    n_LauncherSymbolGrid["LauncherSymbolGrid"]
  end
  subgraph n_f_App_Pages["App/Pages/"]
    n_PlacePicker["PlacePicker"]
    n_SettingsPage["SettingsPage"]
    n_ToggleRow["ToggleRow"]
    n_ChoiceRow["ChoiceRow"]
    n_TextRow["TextRow"]
    n_PlaceRow["PlaceRow"]
    n_PickRow["PickRow"]
    n_ItemEditor["ItemEditor"]
    n_ItemFieldRow["ItemFieldRow"]
    n_DaysRow["DaysRow"]
  end
  subgraph n_f_App_Projects["App/Projects/"]
    n_ProjectsView["ProjectsView"]
    n_ProjectFilesView["ProjectFilesView"]
  end
  subgraph n_f_App_Settings["App/Settings/"]
    n_DeveloperModeSection["DeveloperModeSection"]
    n_DeveloperLogsView["DeveloperLogsView"]
    n_EditorThemePicker["EditorThemePicker"]
    n_EditorThemeSwatch["EditorThemeSwatch"]
    n_ActivitySheet[/"ActivitySheet"/]
    n_GateMeasurementsRow["GateMeasurementsRow"]
    n_SettingsView["SettingsView"]
    n_SettingsRowLabel["SettingsRowLabel"]
  end
  subgraph n_f_App_Store["App/Store/"]
    n_ProPaywallView["ProPaywallView"]
  end
  n_AcknowledgementsView --> n_AckRow
  n_AcknowledgementsView --> n_NoticePage
  n_NoticePage -.-> n_NoticeBlock
  n_GalleryView --> n_GalleryDetailView
  n_GalleryView -.-> n_GalleryWell
  n_GalleryDetailView --> n_SettingsPage
  n_GalleryDetailView -.-> n_GalleryWell
  n_LauncherSettingsRow --> n_LauncherAppsView
  n_LauncherSettingsRow --> n_SettingsRowLabel
  n_LauncherAppsView --> n_LauncherSlotSheet
  n_LauncherAppsView -.-> n_LauncherSlotRow
  n_LauncherAppsView -.-> n_LauncherTile
  n_LauncherSlotRow -.-> n_LauncherTile
  n_LauncherSlotSheet --> n_LauncherAppChooser
  n_LauncherSlotSheet --> n_LauncherSymbolGrid
  n_LauncherSlotSheet -.-> n_LauncherTile
  n_LauncherAppChooser -.-> n_LauncherTile
  n_SettingsPage --> n_ItemEditor
  n_SettingsPage -.-> n_ChoiceRow
  n_SettingsPage -.-> n_GalleryWell
  n_SettingsPage -.-> n_PickRow
  n_SettingsPage -.-> n_PlaceRow
  n_SettingsPage -.-> n_TextRow
  n_SettingsPage -.-> n_ToggleRow
  n_PlaceRow --> n_PlacePicker
  n_ItemEditor -.-> n_ItemFieldRow
  n_ItemFieldRow --> n_PlacePicker
  n_ItemFieldRow -.-> n_DaysRow
  n_ProjectsView --> n_ProjectFilesView
  n_IDEScene -.-> n_ContentView
  n_IDEScene -.-> n_SceneCounts
  n_IDEScene -.-> n_SceneTitle
  n_ContentView --> n_AcknowledgementsView
  n_ContentView --> n_GalleryView
  n_ContentView --> n_ProPaywallView
  n_ContentView --> n_ProjectsView
  n_ContentView --> n_SettingsView
  n_ContentView --> n_WidgetActivityView
  n_ContentView -.-> n_ConsoleEditor
  n_ContentView -.-> n_ConsoleTextView
  n_ContentView -.-> n_HUDView
  n_ContentView -.-> n_ReplBar
  n_DeveloperModeSection --> n_DeveloperLogsView
  n_DeveloperModeSection --> n_SettingsRowLabel
  n_DeveloperLogsView --> n_WidgetActivityView
  n_EditorThemePicker --> n_ProPaywallView
  n_EditorThemePicker -.-> n_EditorThemeSwatch
  n_GateMeasurementsRow --> n_ActivitySheet
  n_GateMeasurementsRow -.-> n_SettingsRowLabel
  n_SettingsView --> n_AcknowledgementsView
  n_SettingsView --> n_ProPaywallView
  n_SettingsView --> n_SettingsRowLabel
  n_SettingsView -.-> n_DeveloperModeSection
  n_SettingsView -.-> n_EditorThemePicker
  n_SettingsView -.-> n_GateMeasurementsRow
  n_SettingsView -.-> n_LauncherSettingsRow
  n_WidgetActivityView --> n_RunDetailView
  n_WidgetActivityView -.-> n_ActivityRowView
  n_WidgetActivityView -.-> n_ActivityStripView</script>
{% endraw %}
<h3>Screens, as a list</h3>
<ol class="hiw-list"><li><strong>AcknowledgementsView</strong> <span class="meta">(App/Acknowledgements.swift line 269; opens AckRow, NoticePage)</span><br>The open-source software in the app and the licence of each. <span class="kind amber" title="anchor App/Acknowledgements.swift AcknowledgementsView: was 7f88159034bc, now ce09a7afb91e">The code changed after this was last checked.</span></li><li><strong>AckRow</strong> <span class="meta">(App/Acknowledgements.swift line 324)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>NoticePage</strong> <span class="meta">(App/Acknowledgements.swift line 344; holds NoticeBlock)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>NoticeBlock</strong> <span class="meta">(App/Acknowledgements.swift line 370)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ConsoleTextView</strong> <span class="meta">(App/ConsoleTextView.swift line 9 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ConsoleEditor</strong> <span class="meta">(App/Editor/ConsoleEditor.swift line 17 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>EditorBenchView</strong> <span class="meta">(App/Editor/EditorBench.swift line 331 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>EditorCheckView</strong> <span class="meta">(App/Editor/EditorCheck.swift line 104 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>GalleryWell</strong> <span class="meta">(App/Gallery/GalleryView.swift line 84)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>GalleryView</strong> <span class="meta">(App/Gallery/GalleryView.swift line 175; opens GalleryDetailView; holds GalleryWell)</span><br>The gallery of ready-made widgets. A widget's tap on the Home Screen can open it at that widget's page. <span class="kind amber" title="anchor App/Gallery/GalleryView.swift GalleryView: was 02bcdf4dffc9, now 94305925ed76">The code changed after this was last checked.</span></li><li><strong>GalleryDetailView</strong> <span class="meta">(App/Gallery/GalleryView.swift line 420; opens SettingsPage; holds GalleryWell)</span><br>One ready-made widget at full size in every size it offers, with its name and whether it needs Pro. <span class="kind amber" title="anchor App/Gallery/GalleryView.swift GalleryDetailView: was 16de94296b12, now 73d31100cfed">The code changed after this was last checked.</span></li><li><strong>LauncherTile</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 110)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherSettingsRow</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 237; opens LauncherAppsView, SettingsRowLabel)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherAppsView</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 272; opens LauncherSlotSheet; holds LauncherSlotRow, LauncherTile)</span><br>The launcher widget's slots in widget order; a tap on a slot opens the sheet that picks its app and symbol.</li><li><strong>LauncherSlotRow</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 370; holds LauncherTile)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherSlotSheet</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 410; opens LauncherAppChooser, LauncherSymbolGrid; holds LauncherTile)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherAppChooser</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 816; holds LauncherTile)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherSymbolGrid</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 862)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherWindowProbe</strong> <span class="meta">(App/LauncherTapHandling.swift line 166 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherSetUpSheet</strong> <span class="meta">(App/LauncherTapHandling.swift line 187)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>PlacePicker</strong> <span class="meta">(App/Pages/PlacePicker.swift line 63)</span><br>Choose a Place: a search over the bundled city list, and for Distance a Use Current Location row. A location fix counts only while Choose a Place is open: leaving the screen (Back, or choosing a city) cancels the wait, and a fix that arrives afterwards is dropped, so it cannot overwrite the place the person picked after giving up.</li><li><strong>SettingsPage</strong> <span class="meta">(App/Pages/SettingsPage.swift line 308; opens ItemEditor; holds ChoiceRow, GalleryWell, PickRow, PlaceRow, TextRow, ToggleRow)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ToggleRow</strong> <span class="meta">(App/Pages/SettingsPage.swift line 520)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ChoiceRow</strong> <span class="meta">(App/Pages/SettingsPage.swift line 552)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>TextRow</strong> <span class="meta">(App/Pages/SettingsPage.swift line 568)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>PlaceRow</strong> <span class="meta">(App/Pages/SettingsPage.swift line 607; opens PlacePicker)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>PickRow</strong> <span class="meta">(App/Pages/SettingsPage.swift line 653)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ItemEditor</strong> <span class="meta">(App/Pages/SettingsPage.swift line 675; holds ItemFieldRow)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ItemFieldRow</strong> <span class="meta">(App/Pages/SettingsPage.swift line 785; opens PlacePicker; holds DaysRow)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>DaysRow</strong> <span class="meta">(App/Pages/SettingsPage.swift line 858)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ProjectsView</strong> <span class="meta">(App/Projects/ProjectsView.swift line 9; opens ProjectFilesView)</span><br>The list of projects: make, rename, delete, import a zip and export one. A tap opens the project's files.</li><li><strong>ProjectFilesView</strong> <span class="meta">(App/Projects/ProjectsView.swift line 176)</span><br>One project's Python files. A tap opens the file in this window's editor.</li><li><strong>IDEScene</strong> <span class="meta">(App/PyWidgetApp.swift line 133; holds ContentView, SceneCounts, SceneTitle)</span><br>One editor window. On iPad there can be several; each has its own text, console and run, and they share one Python, one run at a time. Where a widget tap was seen opening its own screen: on a real iPhone with build 7, all four taps (a ready-made and a script widget, from cold and from the background; an Investor's recordings on #319). On iPad only in the Simulator, because no iPad is bought (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> #299): there each tap opens the right screen. Where it opens on iPad: in a window that is already open, never a new one (T-4890). With one window open a tap from the Home Screen opens its screen in that window, and with two open it goes to one of them and there are still two; with no window open the app makes one. Every window accepts any link from outside (`handlesExternalEvents` with "*"), because a Home Screen tap brings no `pywidget:` identifier that a narrower match could find (UITests/LauncherWindowsUITests.swift testRealWidgetTapGoesToAnOpenWindow, iPad Simulator, iOS 27.0, Windowed Apps). Not yet seen on a real iPad or in the Release build (T-4615). <span class="kind amber" title="anchor App/PyWidgetApp.swift IDEScene: was 86c33109b181, now 7125581cccdc">The code changed after this was last checked.</span></li><li><strong>ContentView</strong> <span class="meta">(App/PyWidgetApp.swift line 1004; opens AcknowledgementsView, GalleryView, ProPaywallView, ProjectsView, SettingsView, WidgetActivityView; holds ConsoleEditor, ConsoleTextView, HUDView, ReplBar)</span><br>The main screen inside a window: the code editor, the console under it and the toolbar. Projects, the Gallery, Settings, Pro and Acknowledgements open from here.</li><li><strong>ReplBar</strong> <span class="meta">(App/ReplBar.swift line 9)</span><br>The input field under the console when a running script asks for typed input.</li><li><strong>HUDView</strong> <span class="meta">(App/ReplBar.swift line 60)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>SceneSessionProbe</strong> <span class="meta">(App/SceneFile.swift line 210 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>SceneTitle</strong> <span class="meta">(App/SceneFile.swift line 236 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>SceneCounts</strong> <span class="meta">(App/SceneFile.swift line 269 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>DeveloperModeSection</strong> <span class="meta">(App/Settings/DeveloperMode.swift line 118; opens DeveloperLogsView, SettingsRowLabel)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>DeveloperLogsView</strong> <span class="meta">(App/Settings/DeveloperMode.swift line 187; opens WidgetActivityView)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>EditorThemePicker</strong> <span class="meta">(App/Settings/EditorThemePicker.swift line 14; opens ProPaywallView; holds EditorThemeSwatch)</span><br>Choosing the editor's colours. Some themes need Pro, so it can open the Pro screen.</li><li><strong>EditorThemeSwatch</strong> <span class="meta">(App/Settings/EditorThemePicker.swift line 85)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ActivitySheet</strong> <span class="meta">(App/Settings/MeasurementExport.swift line 134 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>GateMeasurementsRow</strong> <span class="meta">(App/Settings/MeasurementExport.swift line 144; opens ActivitySheet; holds SettingsRowLabel)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>SettingsView</strong> <span class="meta">(App/Settings/SettingsView.swift line 55; opens AcknowledgementsView, ProPaywallView, SettingsRowLabel; holds DeveloperModeSection, EditorThemePicker, GateMeasurementsRow, LauncherSettingsRow)</span><br>Settings: the editor theme, Pro, the launcher widget's apps and the acknowledgements. In Xcode and internal TestFlight builds only, also Developer mode (Unlock Pro, where the copy came from, Refresh widgets now, the widget run logs and Reset to first launch). <span class="kind amber" title="anchor App/Settings/SettingsView.swift SettingsView: was 37457b0b1cac, now 5a04d0ddc1df">The code changed after this was last checked.</span></li><li><strong>SettingsRowLabel</strong> <span class="meta">(App/Settings/SettingsView.swift line 245)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>StaleCheckView</strong> <span class="meta">(App/StaleCheckView.swift line 6)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ProPaywallView</strong> <span class="meta">(App/Store/ProPaywallView.swift line 218)</span><br>The Pro screen: what Pro adds and the buy and restore buttons. Pushed from Settings, or shown as a sheet elsewhere.</li><li><strong>ThemeCheckView</strong> <span class="meta">(App/ThemeCheckView.swift line 6)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>WidgetActivityView</strong> <span class="meta">(App/WidgetActivityView.swift line 93; opens RunDetailView; holds ActivityRowView, ActivityStripView)</span><br>A widget's Activity screen: each run of the last 14 days, newest first, with its time, its result and, for a failed run, its error and the line it stopped at. It opens from the editor's More menu when the open script declares a widget, and from the Activity link a widget opens. Go to Line on a failed run goes back to the editor, opens that widget's own script, saving the file the editor held first, and puts the caret at the start of the failing line. If that file cannot be opened (its save was refused, or it is gone), the editor says why and the caret is not moved, so it never lands on a line of a different file (T-5272). Export shares the shown runs as a text file whose first line is the app's name, "activity:", the widget's name and, in brackets, the project folder that holds the widget's own script; a widget that no project on the device declares any more gets no brackets (T-4801).</li><li><strong>ActivityStripView</strong> <span class="meta">(App/WidgetActivityView.swift line 231)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ActivityRowView</strong> <span class="meta">(App/WidgetActivityView.swift line 292)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>RunDetailView</strong> <span class="meta">(App/WidgetActivityView.swift line 330)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>WidgetInstallView</strong> <span class="meta">(App/WidgetInstallView.swift line 11)</span><br>A test-only screen: the automated widget checks use it to place a saved drawing where the widget reads it, without running Python.</li><li><strong>WidgetRunView</strong> <span class="meta">(App/WidgetRunView.swift line 15)</span><br>A test-only screen: it runs a widget script the way the product does and reads back what was saved. The test can name the widget the run saves under, so each run of the Home Screen check gets a widget name of its own. No person reaches it.</li></ol>
<h2 id="python-run">3. The Python run</h2>
<p>How the app runs a person's script. One Python interpreter lives inside the app and runs one script at a time; the app's Swift code talks to it through a small layer written in C.</p>
<p class="meta">Numbered boxes: the steps of a run. Below them, 25 Python modules in pywidget/ios/App/Runtime/; dotted arrow: imports.</p>
<div class="wf-tools"><button type="button" class="btn wf-zoom" data-for="wf-python-run" aria-pressed="false" hidden>Fit to width</button></div>
<div class="wf-chart" id="wf-python-run" data-src="wf-src-python-run"><p class="meta">Drawing the diagram...</p><noscript><p class="meta">The diagram is drawn by a script; the same facts are listed below.</p></noscript></div>
{% raw %}
<script type="text/plain" id="wf-src-python-run">flowchart TD
  s1["1. Python starts once<br/>Shared/Bridge/pwbridge.h: pw_rt_start"]
  s2["2. The runtime gets ready<br/>App/Runtime/_pywidget_runtime/runner.py: bootstrap"]
  s1 --> s2
  s3["3. The app asks for a run<br/>Shared/Bridge/PyBridge.swift: RunRequest"]
  s2 --> s3
  s4["4. Runs wait their turn<br/>Shared/Bridge/PyBridge.swift: scriptLoop"]
  s3 --> s4
  s5["5. Swift hands the run to Python<br/>Shared/Bridge/pwbridge.h: pw_rt_run"]
  s4 --> s5
  s6["6. The runner runs the script<br/>App/Runtime/_pywidget_runtime/runner.py: run"]
  s5 --> s6
  s7["7. The script asks the phone for things<br/>Shared/Bridge/PyBridge.swift: DeviceCall"]
  s6 --> s7
  s8["8. Output comes back as records<br/>Shared/Bridge/PyBridge.swift: drain"]
  s7 --> s8
  s9["9. The run ends<br/>App/Runtime/_pywidget_runtime/records.py: finish"]
  s8 --> s9
  subgraph n_aside["Apart from these steps"]
    a1["The speed bench's interpreter<br/>Shared/PythonRuntime.swift: PythonRuntime"]
  end
  subgraph n_header["The bridging header, Shared/PyBridge.h"]
    h0["PyBridge.h"]
    h1["Python/Python.h"]
    h2["Bridge/pwbridge.h"]
  end
  h0 --> h1
  h0 --> h2
  subgraph n_pkg__pywidget_runtime["Python package _pywidget_runtime (App/Runtime/_pywidget_runtime/)"]
    n_m__pywidget_runtime["_pywidget_runtime"]
    n_m__pywidget_runtime_app_manifest["_pywidget_runtime.app_manifest"]
    n_m__pywidget_runtime_device["_pywidget_runtime.device"]
    n_m__pywidget_runtime_lane["_pywidget_runtime.lane"]
    n_m__pywidget_runtime_limits["_pywidget_runtime.limits"]
    n_m__pywidget_runtime_records["_pywidget_runtime.records"]
    n_m__pywidget_runtime_runner["_pywidget_runtime.runner"]
    n_m__pywidget_runtime_systls["_pywidget_runtime.systls"]
    n_m__pywidget_runtime_widget_tree["_pywidget_runtime.widget_tree"]
  end
  subgraph n_pkg_pywidget["Python package pywidget (App/Runtime/pywidget/)"]
    n_m_pywidget["pywidget"]
    n_m_pywidget__wire["pywidget._wire"]
    n_m_pywidget_clipboard["pywidget.clipboard"]
    n_m_pywidget_context["pywidget.context"]
    n_m_pywidget_device["pywidget.device"]
    n_m_pywidget_device_location["pywidget.device.location"]
    n_m_pywidget_device_pedometer["pywidget.device.pedometer"]
    n_m_pywidget_errors["pywidget.errors"]
    n_m_pywidget_files["pywidget.files"]
    n_m_pywidget_http["pywidget.http"]
    n_m_pywidget_keychain["pywidget.keychain"]
    n_m_pywidget_net["pywidget.net"]
    n_m_pywidget_notifications["pywidget.notifications"]
    n_m_pywidget_prompts["pywidget.prompts"]
    n_m_pywidget_reading["pywidget.reading"]
    n_m_pywidget_widgets["pywidget.widgets"]
  end
  n_m__pywidget_runtime -.-> n_m__pywidget_runtime_device
  n_m__pywidget_runtime -.-> n_m__pywidget_runtime_limits
  n_m__pywidget_runtime -.-> n_m__pywidget_runtime_runner
  n_m__pywidget_runtime_app_manifest -.-> n_m__pywidget_runtime_limits
  n_m__pywidget_runtime_device -.-> n_m__pywidget_runtime_runner
  n_m__pywidget_runtime_device -.-> n_m_pywidget_errors
  n_m__pywidget_runtime_lane -.-> n_m__pywidget_runtime_app_manifest
  n_m__pywidget_runtime_records -.-> n_m__pywidget_runtime_limits
  n_m__pywidget_runtime_records -.-> n_m__pywidget_runtime_widget_tree
  n_m__pywidget_runtime_runner -.-> n_m__pywidget_runtime_app_manifest
  n_m__pywidget_runtime_runner -.-> n_m__pywidget_runtime_lane
  n_m__pywidget_runtime_runner -.-> n_m__pywidget_runtime_limits
  n_m__pywidget_runtime_runner -.-> n_m__pywidget_runtime_records
  n_m__pywidget_runtime_runner -.-> n_m__pywidget_runtime_systls
  n_m__pywidget_runtime_runner -.-> n_m__pywidget_runtime_widget_tree
  n_m__pywidget_runtime_systls -.-> n_m__pywidget_runtime_device
  n_m__pywidget_runtime_systls -.-> n_m__pywidget_runtime_runner
  n_m__pywidget_runtime_widget_tree -.-> n_m__pywidget_runtime_limits
  n_m_pywidget -.-> n_m_pywidget_errors
  n_m_pywidget -.-> n_m_pywidget_reading
  n_m_pywidget__wire -.-> n_m__pywidget_runtime_device
  n_m_pywidget__wire -.-> n_m__pywidget_runtime_runner
  n_m_pywidget__wire -.-> n_m_pywidget_errors
  n_m_pywidget__wire -.-> n_m_pywidget_reading
  n_m_pywidget_clipboard -.-> n_m_pywidget__wire
  n_m_pywidget_clipboard -.-> n_m_pywidget_errors
  n_m_pywidget_context -.-> n_m_pywidget__wire
  n_m_pywidget_device -.-> n_m_pywidget_device_location
  n_m_pywidget_device -.-> n_m_pywidget_device_pedometer
  n_m_pywidget_device_location -.-> n_m_pywidget__wire
  n_m_pywidget_device_location -.-> n_m_pywidget_errors
  n_m_pywidget_device_location -.-> n_m_pywidget_reading
  n_m_pywidget_device_pedometer -.-> n_m_pywidget__wire
  n_m_pywidget_device_pedometer -.-> n_m_pywidget_errors
  n_m_pywidget_device_pedometer -.-> n_m_pywidget_reading
  n_m_pywidget_files -.-> n_m_pywidget__wire
  n_m_pywidget_files -.-> n_m_pywidget_errors
  n_m_pywidget_http -.-> n_m__pywidget_runtime_device
  n_m_pywidget_http -.-> n_m_pywidget__wire
  n_m_pywidget_http -.-> n_m_pywidget_errors
  n_m_pywidget_http -.-> n_m_pywidget_files
  n_m_pywidget_http -.-> n_m_pywidget_reading
  n_m_pywidget_keychain -.-> n_m_pywidget__wire
  n_m_pywidget_keychain -.-> n_m_pywidget_errors
  n_m_pywidget_net -.-> n_m__pywidget_runtime_device
  n_m_pywidget_net -.-> n_m_pywidget__wire
  n_m_pywidget_net -.-> n_m_pywidget_errors
  n_m_pywidget_notifications -.-> n_m_pywidget__wire
  n_m_pywidget_notifications -.-> n_m_pywidget_errors
  n_m_pywidget_prompts -.-> n_m__pywidget_runtime_device
  n_m_pywidget_prompts -.-> n_m__pywidget_runtime_runner
  n_m_pywidget_prompts -.-> n_m_pywidget__wire
  n_m_pywidget_prompts -.-> n_m_pywidget_errors
  n_m_pywidget_widgets -.-> n_m_pywidget__wire
  n_m_pywidget_widgets -.-> n_m_pywidget_errors</script>
{% endraw %}
<h3>The Python run, as a list</h3>
<ol class="hiw-list"><li><strong>1. Python starts once</strong> <span class="meta">(Shared/Bridge/pwbridge.h: pw_rt_start)</span><br>The first time the app needs Python, it starts the interpreter with the Python library packed inside the app, and keeps it running for as long as the app is open.</li><li><strong>2. The runtime gets ready</strong> <span class="meta">(App/Runtime/_pywidget_runtime/runner.py: bootstrap)</span><br>pywidget's own runner sets up the rules every run shares: where scripts may import from, how printed text reaches the console, and how a run can be stopped. <span class="kind amber" title="anchor App/Runtime/_pywidget_runtime/runner.py bootstrap: was 1347a86e48d6, now b05682c665a1">The code changed after this was last checked.</span></li><li><strong>3. The app asks for a run</strong> <span class="meta">(Shared/Bridge/PyBridge.swift: RunRequest)</span><br>A run request says what to run (a saved file or the editor's text), why it runs (the console, a widget, a shortcut or a preview), and how long it may take. <span class="kind amber" title="anchor Shared/Bridge/PyBridge.swift RunRequest: was 599bdd9a85ea, now b836c5da8a77">The code changed after this was last checked.</span></li><li><strong>4. Runs wait their turn</strong> <span class="meta">(Shared/Bridge/PyBridge.swift: scriptLoop)</span><br>One thread takes the requests in order. A run that waited longer than it was allowed to take ends as "busy" without starting. <span class="kind amber" title="anchor Shared/Bridge/PyBridge.swift scriptLoop: was 3994db6041c5, now 73f32ea8d93a">The code changed after this was last checked.</span></li><li><strong>5. Swift hands the run to Python</strong> <span class="meta">(Shared/Bridge/pwbridge.h: pw_rt_run)</span><br>The C layer passes the request to Python as text and waits for the run's summary. Swift never touches a Python object directly.</li><li><strong>6. The runner runs the script</strong> <span class="meta">(App/Runtime/_pywidget_runtime/runner.py: run)</span><br>The runner compiles the script, runs it, catches any error, waits for the threads the script started, and works out how the run ended: finished, stopped, or failed with an error. <span class="kind amber" title="anchor App/Runtime/_pywidget_runtime/runner.py run: was 8034bc293f1a, now 13e93cdf41b4">The code changed after this was last checked.</span></li><li><strong>7. The script asks the phone for things</strong> <span class="meta">(Shared/Bridge/PyBridge.swift: DeviceCall)</span><br>When a script uses pywidget's modules (location, steps, files, the web, notifications, secrets), each call goes to the app's Swift code, which checks permission again and answers.</li><li><strong>8. Output comes back as records</strong> <span class="meta">(Shared/Bridge/PyBridge.swift: drain)</span><br>What the script prints, asks for, and draws is queued as numbered records. The app collects them in order and shows them in the console or saves the widget's drawing.</li><li><strong>9. The run ends</strong> <span class="meta">(App/Runtime/_pywidget_runtime/records.py: finish)</span><br>A last record always goes out, saying how the run ended and how long it took, so the app never waits on a run that is over. When a widget button's code, or the code that draws the widget, stops the script or fails, that run ends as the script's error: the widget keeps its last drawing and its saved values, and the console shows the line that stopped it.</li><li><strong>The speed bench's interpreter</strong> <span class="meta">(Shared/PythonRuntime.swift: PythonRuntime)</span><br>An older, simpler way to start Python, used only by the app's start-up speed bench. A person's scripts never run through it.</li><li><strong>Shared/PyBridge.h</strong> <span class="meta">(lets the Swift code call C; includes Python/Python.h, Bridge/pwbridge.h, mach/mach.h, sys/sysctl.h, unistd.h)</span></li><li><strong>_pywidget_runtime</strong> <span class="meta">(App/Runtime/_pywidget_runtime/__init__.py; no public functions or classes; imports _pywidget_runtime.device, _pywidget_runtime.limits, _pywidget_runtime.runner)</span></li><li><strong>_pywidget_runtime.app_manifest</strong> <span class="meta">(App/Runtime/_pywidget_runtime/app_manifest.py; defines ManifestError, Manifest, check_id, check_name, check_entry, check, parse, resolve_entry, read, encode, write, run_setup; imports _pywidget_runtime.limits)</span></li><li><strong>_pywidget_runtime.device</strong> <span class="meta">(App/Runtime/_pywidget_runtime/device.py; defines effective_timeout, error_for, parse_reply, call_with, remaining_budget, call; imports _pywidget_runtime.runner, pywidget.errors)</span></li><li><strong>_pywidget_runtime.<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span></strong> <span class="meta">(App/Runtime/_pywidget_runtime/lane.py; defines import_message, allowed, LaneImportError, Refusal, lane_of, LaneError, scan_source, app_only, send_lane, check_project, premade_hits, premade_lanes, write_premade_lanes, LaneFinder, denied, never_resident, restore_guard, reset_step, compiled_stdlib_root, install_finder, containing_app, extension_config, mirror_entry; imports _pywidget_runtime.app_manifest)</span></li><li><strong>_pywidget_runtime.limits</strong> <span class="meta">(App/Runtime/_pywidget_runtime/limits.py; no public functions or classes)</span></li><li><strong>_pywidget_runtime.records</strong> <span class="meta">(App/Runtime/_pywidget_runtime/records.py; defines encode, outcome, error_summary, finish; imports _pywidget_runtime.limits, _pywidget_runtime.widget_tree)</span></li><li><strong>_pywidget_runtime.runner</strong> <span class="meta">(App/Runtime/_pywidget_runtime/runner.py; defines bootstrap, reset, hard_stop, run; imports _pywidget_runtime.app_manifest, _pywidget_runtime.lane, _pywidget_runtime.limits, _pywidget_runtime.records, _pywidget_runtime.systls, _pywidget_runtime.widget_tree)</span></li><li><strong>_pywidget_runtime.systls</strong> <span class="meta">(App/Runtime/_pywidget_runtime/systls.py; defines budget_timeout, ProxyNotSupported, TargetNotSupported, BridgeSocket, patch_http_client, patch_urllib3, SystemTLSFinder, wanted, install, active; imports _pywidget_runtime.device, _pywidget_runtime.runner)</span></li><li><strong>_pywidget_runtime.widget_tree</strong> <span class="meta">(App/Runtime/_pywidget_runtime/widget_tree.py; defines TreeTooLarge, WidgetChoiceError, WidgetRequestError, ActionTimeout, ActionStateError, parse_date, args_number_text, Action, widget_id_problem, action_name_problem, canonical_bytes, decode_action_args, parse_action, check_action_context, parse_request, is_first_party, check_first_party_source, find_widget, build, run_handler, emit; imports _pywidget_runtime.limits)</span></li><li><strong>pywidget</strong> <span class="meta">(App/Runtime/pywidget/__init__.py; no public functions or classes; imports pywidget.errors, pywidget.reading)</span></li><li><strong>pywidget._wire</strong> <span class="meta">(App/Runtime/pywidget/_wire.py; defines now_s, remaining, run_context, prompt_wait, call, number, flag, text, name, moment, span, bad, want_bool, want_int, want_float, want_str, want_choice, want_strs, want_time, local_time, want_object, want_reading, stream; imports _pywidget_runtime.device, _pywidget_runtime.runner, pywidget.errors, pywidget.reading)</span></li><li><strong>pywidget.clipboard</strong> <span class="meta">(App/Runtime/pywidget/clipboard.py; defines has_text, has_url, has_image, detect, get_text, get_texts, set_text, change_count; imports pywidget._wire, pywidget.errors)</span></li><li><strong>pywidget.context</strong> <span class="meta">(App/Runtime/pywidget/context.py; no public functions or classes; imports pywidget._wire)</span></li><li><strong>pywidget.device</strong> <span class="meta">(App/Runtime/pywidget/device/__init__.py; no public functions or classes; imports pywidget.device.location, pywidget.device.pedometer)</span></li><li><strong>pywidget.device.location</strong> <span class="meta">(App/Runtime/pywidget/device/location.py; defines Location, status, accuracy, request_permission, request_full_accuracy, last_known, sample, updates; imports pywidget._wire, pywidget.errors, pywidget.reading)</span></li><li><strong>pywidget.device.pedometer</strong> <span class="meta">(App/Runtime/pywidget/device/pedometer.py; defines PedometerData, available, status, request_permission, history, today, by_day, updates; imports pywidget._wire, pywidget.errors, pywidget.reading)</span></li><li><strong>pywidget.errors</strong> <span class="meta">(App/Runtime/pywidget/errors.py; defines PyWidgetError, PermissionDenied, PermissionNotDetermined, NotAvailableHere, LiveOnlyInWidget, Unsupported, DeviceLocked, BridgeTimeout, StateTooLarge, StateConflict, TooManyPending, Offline, CertificateRejected, TransportSecurityRefused, HTTPStatusError)</span></li><li><strong>pywidget.files</strong> <span class="meta">(App/Runtime/pywidget/files.py; defines documents, shared, pick, bookmark, bookmarks, open_bookmark, forget; imports pywidget._wire, pywidget.errors)</span></li><li><strong>pywidget.http</strong> <span class="meta">(App/Runtime/pywidget/http.py; defines NetworkStatus, Response, get, post, get_json, status; imports _pywidget_runtime.device, pywidget._wire, pywidget.errors, pywidget.files, pywidget.reading)</span></li><li><strong>pywidget.keychain</strong> <span class="meta">(App/Runtime/pywidget/keychain.py; defines Secret, set, get_bytes, get, exists, delete, names; imports pywidget._wire, pywidget.errors)</span></li><li><strong>pywidget.net</strong> <span class="meta">(App/Runtime/pywidget/net.py; defines Response, get; imports _pywidget_runtime.device, pywidget._wire, pywidget.errors)</span></li><li><strong>pywidget.notifications</strong> <span class="meta">(App/Runtime/pywidget/notifications.py; defines Notification, status, request_permission, schedule, pending, cancel, cancel_all, set_badge; imports pywidget._wire, pywidget.errors)</span></li><li><strong>pywidget.prompts</strong> <span class="meta">(App/Runtime/pywidget/prompts.py; defines available, alert, text, number, choose, pick, TextField, NumberField, ToggleField, ChoiceField, DateField, form, hud; imports _pywidget_runtime.device, _pywidget_runtime.runner, pywidget._wire, pywidget.errors)</span></li><li><strong>pywidget.reading</strong> <span class="meta">(App/Runtime/pywidget/reading.py; defines Reading)</span></li><li><strong>pywidget.widgets</strong> <span class="meta">(App/Runtime/pywidget/widgets.py; defines state, WidgetState; imports pywidget._wire, pywidget.errors)</span></li></ol>
<h2 id="script-to-home-screen">4. Script to Home Screen</h2>
<p>How a person's script becomes the widget they see. Python runs only in the app; the widget reads the result. In the App Store build the widget never starts Python: the switch that lets the widget run a script itself, for at most 4 seconds, is compiled only into test builds.</p>

<div class="wf-tools"><button type="button" class="btn wf-zoom" data-for="wf-script-to-home-screen" aria-pressed="false" hidden>Fit to width</button></div>
<div class="wf-chart" id="wf-script-to-home-screen" data-src="wf-src-script-to-home-screen"><p class="meta">Drawing the diagram...</p><noscript><p class="meta">The diagram is drawn by a script; the same facts are listed below.</p></noscript></div>
{% raw %}
<script type="text/plain" id="wf-src-script-to-home-screen">flowchart TD
  s1["1. The app starts a widget run<br/>App/Bridge/WidgetWriter.swift: WidgetWriter"]
  s2["2. Python runs the script<br/>Shared/Bridge/PyBridge.swift: PyBridge"]
  s1 --> s2
  s3["3. The script describes its widget<br/>App/Runtime/_pywidget_runtime/widget_tree.py: emit"]
  s2 --> s3
  s4["4. The app saves the description<br/>Shared/Bridge/RunResultSink.swift: RunResultSink"]
  s3 --> s4
  s5["5. The shared folder (group.app.pywidget)<br/>Shared/WidgetID.swift: WidgetFolder"]
  s4 --> s5
  s6["6. The widget reads it<br/>Widget/PyWidget.swift: TreeProvider"]
  s5 --> s6
  s7["7. The widget plans its timeline<br/>Shared/TreeTimeline.swift: TreeTimelinePlanner"]
  s6 --> s7
  s8["8. The widget draws it<br/>Shared/TreeView.swift: TreeEntryView"]
  s7 --> s8
  subgraph n_aside["Apart from these steps"]
    a1["The end-to-end check<br/>UITests/WidgetKitCheckTests.swift: testETokenOnTheHomeScreen"]
  end</script>
{% endraw %}
<h3>Script to Home Screen, as a list</h3>
<ol class="hiw-list"><li><strong>1. The app starts a widget run</strong> <span class="meta">(App/Bridge/WidgetWriter.swift: WidgetWriter)</span><br>When a person saves a script, when the app comes to the front, or when the Refresh shortcut runs, the app runs each placed widget's script once. <span class="kind amber" title="anchor App/Bridge/WidgetWriter.swift WidgetWriter: was 165616f952ed, now 5971e5369454">The code changed after this was last checked.</span></li><li><strong>2. Python runs the script</strong> <span class="meta">(Shared/Bridge/PyBridge.swift: PyBridge)</span><br>The bridge starts the Python interpreter inside the app and hands it the script and which widget to draw. <span class="kind amber" title="anchor Shared/Bridge/PyBridge.swift PyBridge: was 75c417a315cb, now 01f65d7ce7c8">The code changed after this was last checked.</span></li><li><strong>3. The script describes its widget</strong> <span class="meta">(App/Runtime/_pywidget_runtime/widget_tree.py: emit)</span><br>When the script finishes, pywidget turns the widget it built into one description of the drawing: its text, shapes and colours for each size, and when to draw it again. <span class="kind amber" title="anchor App/Runtime/_pywidget_runtime/widget_tree.py emit: was bc879530c958, now 51956cce63a3">The code changed after this was last checked.</span></li><li><strong>4. The app saves the description</strong> <span class="meta">(Shared/Bridge/RunResultSink.swift: RunResultSink)</span><br>The app checks the description, writes it as tree.json in the widget's own folder, unless a newer one is already there, and asks iOS to redraw that widget. <span class="kind amber" title="anchor Shared/Bridge/RunResultSink.swift RunResultSink: was 702a0a783b2a, now dda516d91121">The code changed after this was last checked.</span></li><li><strong>5. The shared folder (group.app.pywidget)</strong> <span class="meta">(Shared/WidgetID.swift: WidgetFolder)</span><br>The one folder both the app and the widget may open. Each widget has its own folder inside it, named by its id. <span class="kind amber" title="anchor Shared/WidgetID.swift WidgetFolder: was f9ef193b3a5f, now a81ecb9b8e93">The code changed after this was last checked.</span></li><li><strong>6. The widget reads it</strong> <span class="meta">(Widget/PyWidget.swift: TreeProvider)</span><br>When iOS asks the widget for its timeline, it reads the chosen widget's tree.json; a locked Pro widget gets the Pro card instead. <span class="kind amber" title="anchor Widget/PyWidget.swift TreeProvider: was acb85e263525, now b4f11cdfa9db">The code changed after this was last checked.</span></li><li><strong>7. The widget plans its timeline</strong> <span class="meta">(Shared/TreeTimeline.swift: TreeTimelinePlanner)</span><br>It turns the description into the entries iOS will show over time, never asking for a refresh sooner than 15 minutes, and adds an entry that marks the data as old.</li><li><strong>8. The widget draws it</strong> <span class="meta">(Shared/TreeView.swift: TreeEntryView)</span><br>Each entry is painted with SwiftUI, with a small badge in the corner when the last run failed or a clock when the data is stale. <span class="kind amber" title="anchor Shared/TreeView.swift TreeEntryView: was aa0f3ffd900d, now 0da10665ad8a">The code changed after this was last checked.</span></li><li><strong>The end-to-end check</strong> <span class="meta">(UITests/WidgetKitCheckTests.swift: testETokenOnTheHomeScreen)</span><br>An automated test on the iPhone 17e Simulator follows this whole path with a code made up of random letters, new each time, so nothing left over from an earlier run can pass it. It opens the app, which runs a short script as a widget run under a widget name made from the same code: the script prints the code and describes a widget that shows it, and the app saves that as tree.json and asks iOS to redraw. The test checks that the app wrote the file and that the script printed the code. Then it goes back to the Home Screen, puts the app's widget there at the small size, and chooses that new widget name in the widget's own Edit Widget sheet, as a person would. It photographs the placed widget for up to 30 seconds, and the phone's own text recognition must read the code off the widget's pixels. On 18 November it failed in four full runs on the test Mac with the text recognition reading the "Choose a widget" card. Then the widget was left with no widget chosen, and iOS can give a newly placed widget what an earlier one with the same settings showed, without asking the widget again; placing it before or after the redraw request made no difference. A widget name nobody has chosen before has no earlier picture, so iOS has to ask the widget, and the file is already there. After that change, the full run late on 18 November got as far as choosing the widget, and the widget then drew "No view for this size": the widget could not find a picture for the small size in what it read. Run on its own on the office Simulator on 19 November, the test passed, also right after the test that resets the app to its first launch. The next full run on the test Mac, on 19 November, failed the same way while the file was there. So in a test build the widget now also writes down each timeline it gives iOS: which widget, which size, what it found when it read the file, and whether it drew a picture or that line. When the test fails, its message starts with the widget's last three answers, then the file's size and the sizes it describes. The test Mac keeps only the first 200 characters of that message, so they tell a file the widget could not read apart from a widget iOS never asked.</li></ol>
<h2 id="storage">5. Storage</h2>
<p>Where the app keeps things on the phone, and which code opens each place. Nothing here leaves the phone unless a person exports or shares it.</p>
<p class="meta">38 Swift files in App/, Shared/ and Widget/ open one of these places; arrow: the file opens it.</p>
<div class="wf-tools"><button type="button" class="btn wf-zoom" data-for="wf-storage" aria-pressed="false" hidden>Fit to width</button></div>
<div class="wf-chart" id="wf-storage" data-src="wf-src-storage"><p class="meta">Drawing the diagram...</p><noscript><p class="meta">The diagram is drawn by a script; the same facts are listed below.</p></noscript></div>
{% raw %}
<script type="text/plain" id="wf-src-storage">flowchart LR
  subgraph n_stores["Where the app keeps things"]
    n_st_The_shared_folder[("The shared folder (group.app.pywidget)")]
    n_st_Documents[("Documents")]
    n_st_Application_Support[("Application Support")]
    n_st_Caches[("Caches")]
    n_st_Settings[("Settings")]
    n_st_Keychain[("Keychain")]
  end
  subgraph n_top_App["App/"]
    n_sf_App_Bench_swift["Bench.swift"]
    n_sf_App_Bridge_WidgetWriter_swift["WidgetWriter.swift"]
    n_sf_App_Device_FilesCall_swift["FilesCall.swift"]
    n_sf_App_Device_KeychainCall_swift["KeychainCall.swift"]
    n_sf_App_Device_LocationCall_swift["LocationCall.swift"]
    n_sf_App_Editor_EditorBench_swift["EditorBench.swift"]
    n_sf_App_Editor_EditorThemeChoice_swift["EditorThemeChoice.swift"]
    n_sf_App_Editor_LaunchProbe_swift["LaunchProbe.swift"]
    n_sf_App_Intents_RunScriptIntents_swift["RunScriptIntents.swift"]
    n_sf_App_Launcher_LauncherEditor_swift["LauncherEditor.swift"]
    n_sf_App_Pages_SettingsPage_swift["SettingsPage.swift"]
    n_sf_App_Projects_ProjectStore_swift["ProjectStore.swift"]
    n_sf_App_Projects_WidgetScriptSave_swift["WidgetScriptSave.swift"]
    n_sf_App_PyWidgetApp_swift["PyWidgetApp.swift"]
    n_sf_App_RatingFactsLedger_swift["RatingFactsLedger.swift"]
    n_sf_App_SceneFile_swift["SceneFile.swift"]
    n_sf_App_Settings_DeveloperMode_swift["DeveloperMode.swift"]
    n_sf_App_Settings_MeasurementExport_swift["MeasurementExport.swift"]
    n_sf_App_Store_ProStore_swift["ProStore.swift"]
    n_sf_App_WidgetActivityView_swift["WidgetActivityView.swift"]
    n_sf_App_WidgetInstallView_swift["WidgetInstallView.swift"]
    n_sf_App_WidgetTapRouting_swift["WidgetTapRouting.swift"]
  end
  subgraph n_top_Shared["Shared/"]
    n_sf_Shared_Bridge_CrashMarker_swift["CrashMarker.swift"]
    n_sf_Shared_Bridge_LaneDevice_swift["LaneDevice.swift"]
    n_sf_Shared_Bridge_LaneNetPeak_swift["LaneNetPeak.swift"]
    n_sf_Shared_Bridge_PyBridge_swift["PyBridge.swift"]
    n_sf_Shared_ExtensionLane_swift["ExtensionLane.swift"]
    n_sf_Shared_FontProbe_swift["FontProbe.swift"]
    n_sf_Shared_LaneRestBench_swift["LaneRestBench.swift"]
    n_sf_Shared_LauncherSlots_swift["LauncherSlots.swift"]
    n_sf_Shared_RefreshWidgetIntent_swift["RefreshWidgetIntent.swift"]
    n_sf_Shared_RunLog_RunLogRecorder_swift["RunLogRecorder.swift"]
    n_sf_Shared_SensorProbe_swift["SensorProbe.swift"]
    n_sf_Shared_TesterPro_swift["TesterPro.swift"]
    n_sf_Shared_WidgetID_swift["WidgetID.swift"]
    n_sf_Shared_WidgetPlacement_swift["WidgetPlacement.swift"]
  end
  subgraph n_top_Widget["Widget/"]
    n_sf_Widget_DebugDrawRecord_swift["DebugDrawRecord.swift"]
    n_sf_Widget_PyWidget_swift["PyWidget.swift"]
  end
  n_sf_App_Bench_swift --> n_st_The_shared_folder
  n_sf_App_Bridge_WidgetWriter_swift --> n_st_The_shared_folder
  n_sf_App_Device_FilesCall_swift --> n_st_The_shared_folder
  n_sf_App_Device_FilesCall_swift --> n_st_Documents
  n_sf_App_Device_FilesCall_swift --> n_st_Application_Support
  n_sf_App_Device_KeychainCall_swift --> n_st_Keychain
  n_sf_App_Device_LocationCall_swift --> n_st_The_shared_folder
  n_sf_App_Device_LocationCall_swift --> n_st_Application_Support
  n_sf_App_Editor_EditorBench_swift --> n_st_Documents
  n_sf_App_Editor_EditorThemeChoice_swift --> n_st_Settings
  n_sf_App_Editor_LaunchProbe_swift --> n_st_Caches
  n_sf_App_Intents_RunScriptIntents_swift --> n_st_The_shared_folder
  n_sf_App_Launcher_LauncherEditor_swift --> n_st_The_shared_folder
  n_sf_App_Pages_SettingsPage_swift --> n_st_The_shared_folder
  n_sf_App_Projects_ProjectStore_swift --> n_st_Documents
  n_sf_App_Projects_WidgetScriptSave_swift --> n_st_The_shared_folder
  n_sf_App_PyWidgetApp_swift --> n_st_Settings
  n_sf_App_RatingFactsLedger_swift --> n_st_Settings
  n_sf_App_SceneFile_swift --> n_st_Settings
  n_sf_App_Settings_DeveloperMode_swift --> n_st_The_shared_folder
  n_sf_App_Settings_DeveloperMode_swift --> n_st_Documents
  n_sf_App_Settings_DeveloperMode_swift --> n_st_Application_Support
  n_sf_App_Settings_DeveloperMode_swift --> n_st_Caches
  n_sf_App_Settings_DeveloperMode_swift --> n_st_Settings
  n_sf_App_Settings_DeveloperMode_swift --> n_st_Keychain
  n_sf_App_Settings_MeasurementExport_swift --> n_st_The_shared_folder
  n_sf_App_Store_ProStore_swift --> n_st_Settings
  n_sf_App_WidgetActivityView_swift --> n_st_The_shared_folder
  n_sf_App_WidgetInstallView_swift --> n_st_The_shared_folder
  n_sf_App_WidgetTapRouting_swift --> n_st_The_shared_folder
  n_sf_Shared_Bridge_CrashMarker_swift --> n_st_Caches
  n_sf_Shared_Bridge_LaneDevice_swift --> n_st_The_shared_folder
  n_sf_Shared_Bridge_LaneNetPeak_swift --> n_st_The_shared_folder
  n_sf_Shared_Bridge_PyBridge_swift --> n_st_The_shared_folder
  n_sf_Shared_Bridge_PyBridge_swift --> n_st_Documents
  n_sf_Shared_ExtensionLane_swift --> n_st_The_shared_folder
  n_sf_Shared_FontProbe_swift --> n_st_The_shared_folder
  n_sf_Shared_LaneRestBench_swift --> n_st_The_shared_folder
  n_sf_Shared_LauncherSlots_swift --> n_st_The_shared_folder
  n_sf_Shared_RefreshWidgetIntent_swift --> n_st_The_shared_folder
  n_sf_Shared_RunLog_RunLogRecorder_swift --> n_st_The_shared_folder
  n_sf_Shared_SensorProbe_swift --> n_st_The_shared_folder
  n_sf_Shared_TesterPro_swift --> n_st_Settings
  n_sf_Shared_WidgetID_swift --> n_st_The_shared_folder
  n_sf_Shared_WidgetPlacement_swift --> n_st_The_shared_folder
  n_sf_Widget_DebugDrawRecord_swift --> n_st_The_shared_folder
  n_sf_Widget_PyWidget_swift --> n_st_The_shared_folder</script>
{% endraw %}
<h3>Storage, as a list</h3>
<ol class="hiw-list"><li><strong>The shared folder</strong> <span class="meta">(opened in 27 files: App/Bench.swift, App/Bridge/WidgetWriter.swift, App/Device/FilesCall.swift, App/Device/LocationCall.swift, App/Intents/RunScriptIntents.swift, App/Launcher/LauncherEditor.swift, App/Pages/SettingsPage.swift, App/Projects/WidgetScriptSave.swift, App/Settings/DeveloperMode.swift, App/Settings/MeasurementExport.swift, App/WidgetActivityView.swift, App/WidgetInstallView.swift, App/WidgetTapRouting.swift, Shared/Bridge/LaneDevice.swift, Shared/Bridge/LaneNetPeak.swift, Shared/Bridge/PyBridge.swift, Shared/ExtensionLane.swift, Shared/FontProbe.swift, Shared/LaneRestBench.swift, Shared/LauncherSlots.swift, Shared/RefreshWidgetIntent.swift, Shared/RunLog/RunLogRecorder.swift, Shared/SensorProbe.swift, Shared/WidgetID.swift, Shared/WidgetPlacement.swift, Widget/DebugDrawRecord.swift, Widget/PyWidget.swift; file names written beside it: .sent.json, Library/Caches/debug-draws.txt, bench.jsonl, device/location.json, index.json, lane-bench.jsonl, lane-net-peak.jsonl, lane-rest.jsonl, launcher/slots.json, manifest.json, premade.json, probe-result.json, pywidget.json, pywidget/bookmarks.plist, pywidget/device/location.json, render-fault.json, sensors.jsonl, today.json, tree.json)</span><br>The one folder both the app and the widget may open. It holds a folder per placed widget with its saved drawing (tree.json), the scripts' own shared data, the launcher's slots, and the run log. Scripts in the app can write here, so the widget never takes its Pro answer from this folder. <span class="kind amber" title="anchor Shared/WidgetID.swift WidgetFolder: was f9ef193b3a5f, now a81ecb9b8e93">The code changed after this was last checked.</span></li><li><strong>Documents</strong> <span class="meta">(opened in 5 files: App/Device/FilesCall.swift, App/Editor/EditorBench.swift, App/Projects/ProjectStore.swift, App/Settings/DeveloperMode.swift, Shared/Bridge/PyBridge.swift; file names written beside it: editor-bench.json, pywidget/bookmarks.plist)</span><br>The person's projects and their Python files, in a folder called Scripts. This is the folder the Files app can see.</li><li><strong>Application Support</strong> <span class="meta">(opened in 3 files: App/Device/FilesCall.swift, App/Device/LocationCall.swift, App/Settings/DeveloperMode.swift; file names written beside it: device/location.json, pywidget/bookmarks.plist, pywidget/device/location.json, today.json)</span><br>Small private files only the app reads: the bookmarks to files a person picked in the Files app, and the last known location a script asked for, deleted when the permission is withdrawn. <span class="kind amber" title="anchor App/Device/FilesCall.swift SystemFiles: was 221c0addeb1b, now 3cf872391538">The code changed after this was last checked.</span></li><li><strong>Caches</strong> <span class="meta">(opened in 3 files: App/Editor/LaunchProbe.swift, App/Settings/DeveloperMode.swift, Shared/Bridge/CrashMarker.swift; file names written beside it: faulthandler.txt, launch-probe.json, run.marker)</span><br>A marker for the run in progress and Python's crash text. If the app is killed during a run, the next launch finds the marker and records the run that was cut short.</li><li><strong>Settings</strong> <span class="meta">(opened in 7 files: App/Editor/EditorThemeChoice.swift, App/PyWidgetApp.swift, App/RatingFactsLedger.swift, App/SceneFile.swift, App/Settings/DeveloperMode.swift, App/Store/ProStore.swift, Shared/TesterPro.swift)</span><br>Small preferences: the editor theme, a note about text saved on leaving the app, and the facts used to decide when to ask for a rating. In test builds only, the tester's Pro switch sits in the shared folder's settings so the widget can read it.</li><li><strong>Keychain</strong> <span class="meta">(opened in 2 files: App/Device/KeychainCall.swift, App/Settings/DeveloperMode.swift)</span><br>Secrets a person's scripts save through pywidget.keychain, each script in its own space. They stay on this device, are never synced to iCloud, and are limited to 16 KB each.</li></ol>
<h2 id="extension">6. The extension</h2>
<p>The widget is a separate small program that iOS starts on its own to draw the Home Screen widgets. It is built from the code in Shared/ (the same files the app is built from) and its own Widget/ folder. Below the diagram are the things it may not do.</p>

<div class="wf-tools"><button type="button" class="btn wf-zoom" data-for="wf-extension" aria-pressed="false" hidden>Fit to width</button></div>
<div class="wf-chart" id="wf-extension" data-src="wf-src-extension"><p class="meta">Drawing the diagram...</p><noscript><p class="meta">The diagram is drawn by a script; the same facts are listed below.</p></noscript></div>
{% raw %}
<script type="text/plain" id="wf-src-extension">flowchart LR
  subgraph x_app["In the app only"]
    n_x_appApp["App"]
    n_x_appApp_Runtime["App/Runtime"]
    n_x_appPrivacy_App_PrivacyInfo_xcprivacy["Privacy/App/PrivacyInfo.xcprivacy"]
    n_x_app___docs_design_viewtree_schema_json["../docs/design/viewtree.schema.json"]
    n_x_appData_cities_tsv["Data/cities.tsv"]
    n_x_appAcknowledgements_Acknowledgements_json["Acknowledgements/Acknowledgements.json"]
    n_x_appAcknowledgements_Acknowledgements_txt["Acknowledgements/Acknowledgements.txt"]
  end
  subgraph x_both["Built into both"]
    n_x_bothShared["Shared/<br/>45 code files"]
    n_x_bothShared_Bridge["Shared/Bridge/<br/>11 code files"]
    n_x_bothShared_RunLog["Shared/RunLog/<br/>8 code files"]
    n_x_both___runtime_pro_flags_json["../runtime/pro-flags.json"]
    n_x_both___docs_design_states_state_tokens_json["../docs/design/states/state-tokens.json"]
  end
  subgraph x_ext["In the widget only"]
    n_x_extWidget["Widget"]
    n_x_extPrivacy_Widget_PrivacyInfo_xcprivacy["Privacy/Widget/PrivacyInfo.xcprivacy"]
    n_x_ext___widgets_premade_first_renders["../widgets/premade/first-renders"]
  end
  x_app --- x_both --- x_ext
  subgraph x_rules["What the widget may not do"]
    r1["No Python in the App Store build"]
    r2["A test build's widget run stays short"]
    r3["A widget moved to the app for its size is not marked as an error"]
    r4["Which place a widget starts in, and why"]
    r5["Pro is asked of the App Store, not of the shared folder"]
    r6["The widget only reads the saved drawing"]
    r7["A refresh tap starts the app in the background"]
    r8["When a widget's script runs again"]
  end
  x_ext --- x_rules</script>
{% endraw %}
<h3>The extension, as a list</h3>
<ol class="hiw-list"><li><strong>App</strong> <span class="meta">(in the app only)</span></li><li><strong>App/Runtime</strong> <span class="meta">(in the app only)</span></li><li><strong>Privacy/App/PrivacyInfo.xcprivacy</strong> <span class="meta">(in the app only)</span></li><li><strong>../docs/design/viewtree.schema.json</strong> <span class="meta">(in the app only)</span></li><li><strong>Data/cities.tsv</strong> <span class="meta">(in the app only)</span></li><li><strong>Acknowledgements/Acknowledgements.json</strong> <span class="meta">(in the app only)</span></li><li><strong>Acknowledgements/Acknowledgements.txt</strong> <span class="meta">(in the app only)</span></li><li><strong>Shared/</strong> <span class="meta">(built into both: AgeLine.swift, ChooseCardView.swift, DisplayFont.swift, ExtensionLane.swift, FirstDrawCardView.swift, FirstRender.swift, FontProbe.swift, GatePremade.swift, LaneGuard.swift, LaneRerunRule.swift, LaneRestBench.swift, LauncherPremade.swift, LauncherPremadeSlots.swift, LauncherSlots.swift, NetFetch.swift, Premades.swift, ProCardView.swift, ProEntitlement.swift, ProFlags.swift, PyBridge.h, PythonRuntime.swift, RefreshAsks.swift, RefreshOutcomeRule.swift, RefreshSchedule.swift, RefreshTapRule.swift, RefreshWidgetIntent.swift, RefreshWidgetsIntent.swift, SensorProbe.swift, StaleEntryPlan.swift, StateCardView.swift, TesterPro.swift, TreeNodes.swift, TreePaint.swift, TreePresence.swift, TreeRules.swift, TreeTimeline.swift, TreeView.swift, ViewTreeSchema.swift, WidgetFaceRule.swift, WidgetID.swift, WidgetPlacement.swift, WidgetStateCommit.swift, WidgetStatus.swift, WidgetTapLink.swift, ZoneProbe.swift)</span></li><li><strong>Shared/Bridge/</strong> <span class="meta">(built into both: BridgeLimits.swift, CrashMarker.swift, DeviceSupport.swift, LaneDevice.swift, LaneNetPeak.swift, NetCall.swift, PyBridge.swift, RunResultSink.swift, WidgetRunLog.swift, pwbridge.c, pwbridge.h)</span></li><li><strong>Shared/RunLog/</strong> <span class="meta">(built into both: ActivityList.swift, RunDetail.swift, RunLogExport.swift, RunLogRecorder.swift, RunLogRetention.swift, RunLogStore.swift, RunRow.swift, TracebackFold.swift)</span></li><li><strong>../runtime/pro-flags.json</strong> <span class="meta">(built into both)</span></li><li><strong>../docs/design/states/state-tokens.json</strong> <span class="meta">(built into both)</span></li><li><strong>Widget</strong> <span class="meta">(in the widget only)</span></li><li><strong>Privacy/Widget/PrivacyInfo.xcprivacy</strong> <span class="meta">(in the widget only)</span></li><li><strong>../widgets/premade/first-renders</strong> <span class="meta">(in the widget only)</span></li><li><strong>No Python in the App Store build</strong> <span class="meta">(Shared/LaneGuard.swift: WidgetLane)</span><br>The switch that would let the widget run a script itself is off in every build that can reach the App Store. The code that starts Python is built into the widget, but nothing in the widget calls it in those builds, and an automated test checks that.</li><li><strong>A test build's widget run stays short</strong> <span class="meta">(Shared/ExtensionLane.swift: ExtensionLane)</span><br>In the test builds where the switch is on, a widget script gets 2 seconds, and the widget answers iOS within 4 seconds whatever the script is doing, drawing the last saved result if the run is not done. <span class="kind amber" title="anchor Shared/ExtensionLane.swift ExtensionLane: was 539d54379d20, now 2d794daad97f">The code changed after this was last checked.</span></li><li><strong>A widget moved to the app for its size is not marked as an error</strong> <span class="meta">(Shared/LaneGuard.swift: badged)</span><br>In the test builds where the switch is on, a widget's script runs in one of two places: in the widget itself, or in the app, which then hands the widget its drawing. Every person's script starts in the widget, and so does every built-in widget whose text does not already say it cannot run there (the next part). After each run the widget looks at that run: if the script needs more memory than the widget can safely hold (twice its peak above 23 MB), ran past its 2 seconds, or asked for something only the app can do, it moves to the app. That is the planned fallback, the script works there, so the widget is drawn without the error badge. A widget is also moved when a run never came back (iOS ended the widget during the run), when there was not enough memory to start it in two separate widget sessions, or when its run broke the widget's rules; those are failures, and the widget shows the badge. The reason is saved beside the script, and the badge is left off only when it reads exactly as one of the three size reasons: a missing or unreadable reason, any other word, or a list of moved widgets that cannot be read all show the badge, so a fault is never hidden. A run that fails or times out still shows the badge until a run in the app succeeds, and saving new script text sends the widget back to try the widget first.</li><li><strong>Which place a widget starts in, and why</strong> <span class="meta">(Shared/Premades.swift: laneEntry)</span><br>In the test builds where the switch is on, the app's build reads each built-in widget's script before it ever runs, with the same rule the widget applies to imports. A built-in widget that uses something the widget refuses (a module such as urllib, PyWidget's web, keychain or files tools, or the location and step sensors, which only the app answers) runs in the app from its first refresh. Of the twelve built-in widgets in the gallery, GitHub, Shortcuts, Storage, Altitude, Distance, Steps and Sun run in the app for this reason; Clocks, Countdown, Habits, Progress and Quote start in the widget, where only their memory and time can move them. A person's script is not read this way: it starts in the widget and its first run decides. During every run in the widget, the widget notes each module it refuses, even when the script catches the refusal and carries on, and moves that widget to the app after the run, without the error badge. Before this, a refused module was found only by a run that failed, and a script that caught the refusal, as GitHub does, was judged to fit and never fetched anything. If the build's list of built-in widgets that run in the app is there but cannot be read, no built-in widget runs in the widget.</li><li><strong>Pro is asked of the App Store, not of the shared folder</strong> <span class="meta">(Shared/ProEntitlement.swift: ProEntitlement)</span><br>The widget asks Apple's purchase system itself whether Pro was bought, and reads the list of Pro widgets from its own copy of the flag file. A script could write the shared folder, so a Pro answer saved there could be faked.</li><li><strong>The widget only reads the saved drawing</strong> <span class="meta">(Widget/PyWidget.swift: TreeProvider)</span><br>The widget's one entry point reads the drawing the app saved for that widget and paints it; a Pro widget that is locked shows the Pro card instead. <span class="kind amber" title="anchor Widget/PyWidget.swift TreeProvider: was 5ca974a41016, now b4f11cdfa9db">The code changed after this was last checked.</span></li><li><strong>A refresh tap starts the app in the background</strong> <span class="meta">(Shared/RefreshWidgetIntent.swift: RefreshWidgetIntent)</span><br>On the iOS 26.0 and 27.0 Simulators, a tap on a widget's refresh button does not run in the widget. The system starts the app in the background, or uses it if it is still there from an earlier tap. The app runs that widget's script and writes its drawing and its run row, so the process that runs a refresh tap is the app's, not the widget's. A test checks this in every run of the app's interface tests (T-4772, `testQRefreshTapRunsInTheExtension`, a name kept from when the tap was meant to run in the widget): with the app closed, one tap must put a new value on the widget's screen, write exactly one run row, marked as a tap, and never bring the app to the front; the test prints which process the row says ran it. What a tap costs: measured with a small script (T-4774, ops/plans/T-4774-tap-cost.md), a tap with the app closed took about 3.4 seconds from the tap to the row on iOS 27.0 and 1.3 seconds on iOS 26.0. Almost all of that is the app and Python starting; the script itself ran in about 25 milliseconds. The app's memory peaked at about 34 MiB on 27.0 and 48.5 MiB on 26.0. A tap while the app was still in the background took about 0.4 seconds and added at most 4 MiB. After a tap the app stays in the background holding 33 to 50 MiB until the system ends it. The phone's figures are taken in the gate build's session. <span class="kind amber" title="anchor Shared/RefreshWidgetIntent.swift RefreshWidgetIntent: was 4df388fbb1b3, now 866880c2d837">The code changed after this was last checked.</span></li><li><strong>When a widget's script runs again</strong> <span class="meta">(Shared/LaneRerunRule.swift: due)</span><br>In the test builds where the switch is on, iOS asks the widget for a fresh drawing whenever it chooses, and each time the widget decides whether to run the script again or draw the saved result. It counts from the widget's last run (the newest line in its run log, or else the time its drawing was saved), never from the time the script wrote into its data. The script runs again once the widget's own ask has come: the date the script set for its next update, the time of its last entry, or the moment its data goes stale, whichever is earliest. That ask is a time on the clock, so a script that labels its data an hour back, or with a fixed date, still runs on time (T-4773). Two limits hold whatever the script asks: never sooner than 15 minutes after the last run, and never later than 24 hours after it. A widget that asks for nothing (no update and no stale time) runs again after the 15 minutes. A widget that has never run, or whose last run is dated after the clock (a clock set back), runs at once. A refresh tap always runs the script; the reload that follows sees the tap's run as the last one, so a tap costs one run.</li></ol>
<h2 id="purchases">7. Purchases</h2>
<p>How a person buys Pro, how a purchase is restored, and how the app and the widget decide what Pro unlocks. Pro is one purchase, paid once. Which widgets need it comes from a flag file built into both the app and the widget. Test builds also have Developer mode, which opens Pro without a purchase so Pro widgets can be tried on a phone.</p>

<div class="wf-tools"><button type="button" class="btn wf-zoom" data-for="wf-purchases" aria-pressed="false" hidden>Fit to width</button></div>
<div class="wf-chart" id="wf-purchases" data-src="wf-src-purchases"><p class="meta">Drawing the diagram...</p><noscript><p class="meta">The diagram is drawn by a script; the same facts are listed below.</p></noscript></div>
{% raw %}
<script type="text/plain" id="wf-src-purchases">flowchart TD
  s1["1. The flag file names the product<br/>../runtime/pro-flags.json: product"]
  s2["2. The app loads the product<br/>App/Store/ProStore.swift: loadProduct"]
  s1 --> s2
  s3["3. A person taps Buy<br/>App/Store/ProStore.swift: purchase"]
  s2 --> s3
  s4["4. The purchase is settled<br/>App/Store/ProStore.swift: settlePurchase"]
  s3 --> s4
  s5["5. Restore asks the App Store again<br/>App/Store/ProStore.swift: restore"]
  s2 --> s5
  s6["6. The one rule for Pro<br/>Shared/ProEntitlement.swift: grants"]
  s4 --> s6
  s5 --> s6
  s7["7. The widget asks for itself<br/>Shared/ProEntitlement.swift: gates"]
  s6 --> s7
  s8["8. The Developer mode group<br/>App/Settings/DeveloperMode.swift: DeveloperModeSection"]
  s6 --> s8
  s9["9. Unlock Pro opens Pro for testers<br/>Shared/TesterPro.swift: isAllowed"]
  s8 --> s9
  s10["10. This copy says where the copy came from<br/>Shared/TesterPro.swift: StoreEnvironment"]
  s8 --> s10
  s11["11. Refresh widgets now<br/>App/Settings/DeveloperMode.swift: refresh"]
  s8 --> s11
  s12["12. Widget run logs<br/>App/Settings/DeveloperMode.swift: DeveloperLogsView"]
  s8 --> s12
  s13["13. Reset to first launch keeps the purchase<br/>App/Settings/DeveloperMode.swift: DeveloperReset"]
  s8 --> s13
  s14["14. Locked widgets show the Pro card<br/>Shared/ProEntitlement.swift: mayDraw"]
  s7 --> s14
  s9 --> s14
  s15["15. A Shortcut asks before a ready-made script<br/>App/Intents/RunScriptIntents.swift: premadeMayRun"]
  s6 --> s15
  subgraph n_aside["Apart from these steps"]
    a1["The Pro store tests wait on StoreKit<br/>Tests/ProStoreTests.swift: eventually"]
    a2["The Settings tests check Pro at the largest text<br/>UITests/SettingsUITests.swift: testProRowAtXXXLargeWithPendingForReview"]
  end
  subgraph n_data["Read from the app's data files"]
    p1[("PyWidget Pro<br/>app.pywidget.pro, NonConsumable<br/>test price 14.99")]
    fl[("pro-flags.json<br/>app.pywidget.pro<br/>5 free, 7 Pro widgets")]
  end</script>
{% endraw %}
<h3>Purchases, as a list</h3>
<ol class="hiw-list"><li><strong>1. The flag file names the product</strong> <span class="meta">(../runtime/pro-flags.json: product)</span><br>The flag file says which App Store product is Pro. With no product named, nothing is for sale and nothing is locked.</li><li><strong>2. The app loads the product</strong> <span class="meta">(App/Store/ProStore.swift: loadProduct)</span><br>The Pro screen asks the App Store for that product, to show its name and the price in the person's own currency.</li><li><strong>3. A person taps Buy</strong> <span class="meta">(App/Store/ProStore.swift: purchase)</span><br>The App Store shows its own purchase sheet. The person can buy, cancel, or the purchase can wait for approval (for example, Ask to Buy).</li><li><strong>4. The purchase is settled</strong> <span class="meta">(App/Store/ProStore.swift: settlePurchase)</span><br>A completed purchase is checked, marked finished with the App Store, and Pro turns on at once, even if the App Store's list of purchases has not caught up yet; the app keeps re-reading that list for a few seconds.</li><li><strong>5. Restore asks the App Store again</strong> <span class="meta">(App/Store/ProStore.swift: restore; follows The app loads the product)</span><br>Only when a person taps Restore: the app asks the App Store for this account's purchases and reads them again. It says whether anything was restored. In Settings that answer stays under the Pro group while Settings is open. If the person buys Pro on the Pro screen meanwhile, the "no purchase found" and "couldn't restore" lines go, because they would no longer be true.</li><li><strong>6. The one rule for Pro</strong> <span class="meta">(Shared/ProEntitlement.swift: grants; follows The purchase is settled, Restore asks the App Store again)</span><br>Pro is on when there is a verified purchase of the named product that has not been refunded or revoked. The app and the widget use this same rule.</li><li><strong>7. The widget asks for itself</strong> <span class="meta">(Shared/ProEntitlement.swift: gates)</span><br>The widget does not trust anything the app saved: it reads its own flag file and asks the App Store directly. In test builds a tester's switch can also turn Pro on.</li><li><strong>8. The Developer mode group</strong> <span class="meta">(App/Settings/DeveloperMode.swift: DeveloperModeSection; follows The one rule for Pro)</span><br>Builds made in Xcode and the builds the company sends to its own TestFlight testers have a Developer mode group in Settings (More, then Settings). Its rows, in this order: Unlock Pro (only where the switch is allowed, below), This copy, Refresh widgets now, Widget run logs and Reset to first launch, and a footer that says it is for testing only, nothing is charged and a purchase is unchanged. The group's code is left out of every other build when the app is compiled, so the copy people download from the App Store, the copy App Review tests and a TestFlight copy sent outside the company have none of it. A check run on every archive and every Release build looks inside the finished app and refuses one that holds the group's code, unless it is the company's internal TestFlight build. The drawing developer-mode.svg, beside this page, shows the group and what each row does; draw_developer_mode.py writes it from the app's own words.</li><li><strong>9. Unlock Pro opens Pro for testers</strong> <span class="meta">(Shared/TesterPro.swift: isAllowed; follows The Developer mode group)</span><br>The Unlock Pro switch opens every Pro feature on that device without buying anything: nothing is charged, nothing is sent to the App Store, and turning it off gives back exactly what was bought. The switch is kept in the settings the app shares with its widgets, so the widget reads the same switch and a Pro widget on the Home Screen, such as Quote of the day or Habit tracker, draws too. Inside a test build there is one more lock: if the App Store's own record says the copy came from the App Store, the switch is off and hidden. A copy whose record could not be read in time keeps the switch; until 18 November such a copy hid it without saying why. With no Pro product named in the flag file there is nothing to unlock, and the switch is not shown.</li><li><strong>10. This copy says where the copy came from</strong> <span class="meta">(Shared/TesterPro.swift: StoreEnvironment; follows The Developer mode group)</span><br>The This copy row shows where the App Store's own record says this copy of the app came from: TestFlight, Xcode, App Store, or Not confirmed when the record could not be read, could not be verified, or came too late. A copy installed from the company's TestFlight says TestFlight. Settings asks again each time it opens, so a copy that said Not confirmed can say TestFlight the next time. It explains the switch: App Store is the one answer that hides Unlock Pro.</li><li><strong>11. Refresh widgets now</strong> <span class="meta">(App/Settings/DeveloperMode.swift: refresh; follows The Developer mode group)</span><br>Refresh widgets now runs every placed widget's script, the same way the Refresh Widgets shortcut does, and then says how many widgets wrote a new drawing: "Ran 2 widgets. iOS redraws them when it allows." iOS decides when the Home Screen shows the new drawings, so they may appear a moment later. When no widget wrote one, it still asks iOS to redraw them all.</li><li><strong>12. Widget run logs</strong> <span class="meta">(App/Settings/DeveloperMode.swift: DeveloperLogsView; follows The Developer mode group)</span><br>Widget run logs lists each widget that has run on this device, by its id, and opens its Activity screen: every run of the last 14 days, its result and its error. Before any widget has run, it says "No widget has run yet."</li><li><strong>13. Reset to first launch keeps the purchase</strong> <span class="meta">(App/Settings/DeveloperMode.swift: DeveloperReset; follows The Developer mode group)</span><br>Reset to first launch puts the app back as it was when first installed. It asks first ("Reset to first launch?", with an Erase and Close button). Then it erases what the app keeps on the device, and nothing outside the app: the person's projects and scripts, placed widgets' drawings and their shared data, the launcher's slots, the run logs, picked-file bookmarks and the last location, the crash marker, the app's settings (the editor theme and the rest), Developer mode's own settings (so Unlock Pro goes off), and the secrets scripts saved in the Keychain. In the folder shared with the widgets everything goes but the system's Library folder, and the shared settings kept there are cleared one by one. It never touches a purchase: a purchase is kept by the App Store, not on the device, and the reset does not call the App Store at all. After the reset Pro is on only if it was bought. It asks iOS to redraw the widgets, whose drawings are gone, and then the app closes, because the open app still holds the old state; the next time it opens it is a first launch.</li><li><strong>14. Locked widgets show the Pro card</strong> <span class="meta">(Shared/ProEntitlement.swift: mayDraw; follows The widget asks for itself, Unlock Pro opens Pro for testers)</span><br>A ready-made widget marked Pro is drawn only when Pro is on; otherwise the widget shows the Pro card. A person's own widgets are never locked.</li><li><strong>15. A Shortcut asks before a ready-made script</strong> <span class="meta">(App/Intents/RunScriptIntents.swift: premadeMayRun; follows The one rule for Pro)</span><br>When a Shortcut runs a ready-made script, the app first reads its own flag file. A free one runs at once, without asking the App Store. When the file holds the script back for Pro, the app asks the App Store, and it waits no longer than the widget does for the same answer (15 seconds). If Pro is off, the Shortcut stops with "This script is part of Pro." If the App Store has not answered in time, the Shortcut stops with a message that the app couldn't check Pro just now and the person should try again (the words are a draft). It does not say the script is part of Pro, because a person who bought Pro has not lost it. In both cases nothing runs. A person's own scripts never wait for this check.</li><li><strong>The Pro store tests wait on StoreKit</strong> <span class="meta">(Tests/ProStoreTests.swift: eventually)</span><br>The tests buy, refund and restore against Xcode's StoreKit test store, which answers in its own time. So the tests wait in two ways. A single call to StoreKit gets a deadline (30 seconds unless the test says less), and if StoreKit has not answered by then, the test fails with the call's name. A wait for something to come true, such as "the purchase has reached the app", asks again every tenth of a second until its own deadline (10 seconds unless the test says otherwise), and then stops the test at that wait, naming it. Nothing after that wait runs, so a test never carries on with a purchase still on its way or a store that has not been cleared. Before each test and after it, the tests clear the store: they wait for every purchase to reach the app, clear, and wait until the app sees none. Each of those two waits gets 10 seconds. In 18 whole-suite runs from 9 to 17 November, the slowest test took 1.23 seconds including both clears (leaving out one test that waits out a 1-second deadline on purpose), so 10 seconds leaves about eight times that. The one red in those runs did not clear in its 10 seconds and then cleared at once when the store was cleared again, so a longer wait would not have helped. A call that StoreKit answers after its deadline is ignored, so it cannot make a later test fail.</li><li><strong>The Settings tests check Pro at the largest text</strong> <span class="meta">(UITests/SettingsUITests.swift: testProRowAtXXXLargeWithPendingForReview)</span><br>Two tests drive the real Settings screen on the Simulator. One sets the text size to the largest size below the accessibility sizes, makes a purchase that waits for a parent's approval (Ask to Buy), and checks that the Pro row then reads "Waiting for approval" and that the Developer mode group and its footer fit on the screen. The other works through the Developer mode group: Unlock Pro, Refresh widgets now, Widget run logs, and Reset to first launch, after which Unlock Pro must be off. On 18 November the first test failed: it looked for the footer by its words, and the test tool refuses words longer than 128 characters. The footer was shortened to 125, and the test was changed to run without a screenshot folder, so the company's MacBook test machine can run it. In that machine's whole-suite run on 19 November (job J-20261119-0757-xc-test, at commit dba03420a8), neither test failed and neither can be skipped; the one failure was a widget test unrelated to Pro. The run's record is ops/site-checks/t4688/settings-ui-rerun.txt. The first test now runs every day in the full suite, so a footer that grows past 128 characters will be caught.</li><li><strong>StoreKit product app.pywidget.pro</strong> <span class="meta">(StoreKit/PyWidget.storekit: NonConsumable, 'PyWidget Pro', test price 14.99 (a price for Xcode's testing only; the price people pay is set in App Store Connect))</span></li><li><strong>pywidget/runtime/pro-flags.json</strong> <span class="meta">(product app.pywidget.pro (non-consumable); Pro covers: premades on, themes off, packages off; free widgets: countdown, sun, steps, distance, altitude; Pro widgets: habits, shortcuts, storage, progress, quote, clocks, github)</span></li></ol>
<h2 id="editor">8. The editor's completion</h2>
<p>This page has two halves, each with its own diagram on the App page. The first is how the code editor suggests names while a person types, and which name it writes when one is chosen. Suggestions ignore letter case and forgive one small typo: "Pri" and "pirnt" both offer print. Names typed exactly as written come first, and choosing a row replaces the whole typed word with the name in its own case. The second half, from "A tap" on, is how the editor places the caret on a line wider than the screen, by a tap or by the space-bar trackpad (touch and hold the space bar, then slide); its drawing is also editor-caret.svg, drawn by hand as SVG source.</p>

<div class="wf-tools"><button type="button" class="btn wf-zoom" data-for="wf-editor" aria-pressed="false" hidden>Fit to width</button></div>
<div class="wf-chart" id="wf-editor" data-src="wf-src-editor"><p class="meta">Drawing the diagram...</p><noscript><p class="meta">The diagram is drawn by a script; the same facts are listed below.</p></noscript></div>
{% raw %}
<script type="text/plain" id="wf-src-editor">flowchart TD
  s1["1. Typing asks<br/>App/Editor/CompletionList.swift: trigger"]
  s2["2. Asked after the first letter<br/>App/Editor/CompletionList.swift: askOffset"]
  s1 --> s2
  s3["3. Python answers<br/>App/Editor/EditorTooling.swift: complete"]
  s2 --> s3
  s4["4. The Swift list while Python starts<br/>App/Editor/CompletionList.swift: CompletionFallback"]
  s2 --> s4
  s5["5. Each name is matched<br/>App/Editor/CompletionList.swift: match"]
  s3 --> s5
  s4 --> s5
  s6["6. The rows are ranked<br/>App/Editor/CompletionList.swift: ranked"]
  s5 --> s6
  s7["7. Choosing writes the name<br/>App/Editor/CompletionList.swift: edit"]
  s6 --> s7</script>
{% endraw %}
<h3>The editor's completion, as a list</h3>
<ol class="hiw-list"><li><strong>1. Typing asks</strong> <span class="meta">(App/Editor/CompletionList.swift: trigger)</span><br>After a dot the editor asks for suggestions at once; inside a name it waits for a short pause in typing. A space, a bracket, a number, a comment or a string asks nothing.</li><li><strong>2. Asked after the first letter</strong> <span class="meta">(App/Editor/CompletionList.swift: askOffset)</span><br>The question is asked as if only the word's first letter had been typed. The answer then holds every name starting with that letter, so the app itself can match the rest of the word without case and find a name the person nearly typed, which Python's own prefix match would drop.</li><li><strong>3. Python answers</strong> <span class="meta">(App/Editor/EditorTooling.swift: complete)</span><br>Once Python is ready, the app asks its Python side, which uses the jedi library to list the names that fit at that place in the script: the script's own names, the modules it imports, and Python's built-in names. If jedi is missing, fails, or takes longer than the app allows, the Python side answers instead from Python's keywords and built-in names and the members of already loaded modules the script imports, taking every name that starts with the asked letter in either case, so "Pri" still finds print.</li><li><strong>4. The Swift list while Python starts</strong> <span class="meta">(App/Editor/CompletionList.swift: CompletionFallback; follows Asked after the first letter)</span><br>Until Python is ready, or while a script is stopping, the app answers by itself from a fixed list of Python's keywords and built-in names, so typing never waits. The list then reads "Basic suggestions".</li><li><strong>5. Each name is matched</strong> <span class="meta">(App/Editor/CompletionList.swift: match; follows Python answers, The Swift list while Python starts)</span><br>A name matches when it starts with the typed word as typed, or starts with it in another case, or, for a word of four letters or more, is one small typo away with the same first letter: one letter wrong, missing, extra, or two neighbours swapped.</li><li><strong>6. The rows are ranked</strong> <span class="meta">(App/Editor/CompletionList.swift: ranked)</span><br>Rows come in three groups: names starting with the word in the same case, then in another case, then near matches. Near matches show only when no name starts with the word at all, at most five of them. Within a group the rows keep the order of the answer, and the word itself, typed in full, is not a row. As the person types more letters the same answer is matched again, with no new wait.</li><li><strong>7. Choosing writes the name</strong> <span class="meta">(App/Editor/CompletionList.swift: edit)</span><br>A tap, Return or Tab replaces the whole typed word with the chosen name, in the name's own case: "Pri" or "pirnt" becomes print. It is one step to undo.</li></ol>
<h2 id="editor-2">9. The caret on a long line</h2>


<div class="wf-tools"><button type="button" class="btn wf-zoom" data-for="wf-editor-2" aria-pressed="false" hidden>Fit to width</button></div>
<div class="wf-chart" id="wf-editor-2" data-src="wf-src-editor-2"><p class="meta">Drawing the diagram...</p><noscript><p class="meta">The diagram is drawn by a script; the same facts are listed below.</p></noscript></div>
<script type="text/plain" id="wf-src-editor-2">flowchart TD
  s1["1. The space-bar trackpad<br/>App/Editor/RunestoneEngine.swift: followFloatingCaret"]
  s2["2. Keeping the caret in sight<br/>App/Editor/CodeEditorEngine.swift: EditorCaretScroll"]
  s1 --> s2
  s3["3. A marked line's number<br/>App/Editor/EditorMarks.swift: gutterMarks"]
  s2 --> s3
  subgraph n_aside["Apart from these steps"]
    a1["A tap<br/>App/Editor/RunestoneEngine.swift: placeCaret"]
  end</script>
<h3>The caret on a long line, as a list</h3>
<ol class="hiw-list"><li><strong>1. The space-bar trackpad</strong> <span class="meta">(App/Editor/RunestoneEngine.swift: followFloatingCaret)</span><br>While the trackpad is in use the editor draws a floating caret where your finger points. On every screen refresh until you let go, the editor checks whether that floating caret has moved and, if so, puts the real caret at the nearest character on whichever line it is over: up and down between lines, and along a line. Slide past the end of a line and the caret stops at its end.</li><li><strong>2. Keeping the caret in sight</strong> <span class="meta">(App/Editor/CodeEditorEngine.swift: EditorCaretScroll)</span><br>The part of the line you can see starts after the line numbers and ends at the right edge. As the trackpad caret moves, the editor scrolls sideways just enough to keep the caret and about two characters either side of it inside that part, never under the line numbers and never past the end of the longest line. Running the trackpad to the right therefore carries the view out to the end of a long line. Unwrapped lines also end with a small gap after the longest line's last character, so a caret at that end is not cut off by the screen's edge. For a tap, the same part of the screen also has a top and a bottom (inside the bars above and below the text): the editor only slides the text back after a tap when the character you touched was wholly inside it, left to right and top to bottom.</li><li><strong>3. A marked line's number</strong> <span class="meta">(App/Editor/EditorMarks.swift: gutterMarks)</span><br>When the checks mark a line, its number in the gutter turns warning colour, or error colour for a mistake Python cannot run, and goes semibold. A line with both shows the error. The number keeps that colour while the cursor is on the line and in the dark theme, and returns to the plain number when the mark goes. When an edit moves a marked line up or down, even by pressing Return in the middle of a line, the number follows the line it marks, and the spoken "Line n" follows with it.</li><li><strong>A tap</strong> <span class="meta">(App/Editor/RunestoneEngine.swift: placeCaret)</span><br>Long lines do not wrap at the usual text sizes, so the editor scrolls sideways; the line numbers stay pinned on the left and the text slides under them. While you are typing, iPhone's own text handling can put a tapped caret at the nearest end of a word rather than at the character you touched. In code a "word" can be long, and when its end is off the screen the editor scrolls sideways to it, so the text moves under your finger and the next tap misses too. Now, just after the system's tap, the editor puts the caret at the character boundary nearest where your finger came down, measured at the sideways position you saw even if the system has already slid the line, and if the system slid the line while the spot you tapped was already on screen, it slides it back. At the accessibility text sizes long lines wrap instead, so a long word (a long string, a web address) runs over several rows, and the system can scroll up or down to its far end before the tap is read. The editor notes where the text was in both directions when your finger came down, measures the tap there, and slides the text back up or down too, so the caret stays on the row you touched. A double tap still selects a word, and a selection is left alone. An automated test on the iPhone 17e Simulator checks this as a person would. It opens a file with a 120-letter string on one line and taps the string, then taps again 90 points to the right on the same line. Each caret must land inside the string, not at either end of it, and the second must sit about ten characters to the right of the first. A second test slides the space-bar trackpad along that line until the caret reaches its end, then down to the next line. Both passed on 18 November in a full run of the app's tests on the code that split the tap in two. A unit test for the wrapped case opens a 1,000-character string between short lines with wrapping on, lays it out, scrolls its first row to the top and asks the editor which character is 200 points down, as a tap would. Then it does what the system's tap does: puts its caret at the string's end, scrolls three rows, and reports the tap three rows lower. The caret must go to the character under the finger and the text back where it was. It passed on 19 November on the MacBook test machine, and it fails, as it should, when the editor takes back only the sideways scroll, forgets the up-and-down position at touch-down, or puts back only the sideways position afterwards (ops/runs/t4888-mutants.txt). No test yet taps a wrapped line at an accessibility text size on the Simulator as a person would; that check is still owed.</li></ol>
<p class="latest">From pywidget/ios/ (project.yml through xcodegen, the Swift, the Python read with ast), StoreKit/PyWidget.storekit, pywidget/runtime/pro-flags.json and the entitlements. The sentences are written by people in pywidget/docs/how-it-works/ and checked against the code by fingerprint. Drawn in your browser by Mermaid 12.2.0 (MIT licence, served from this site: <a href="{{ '/assets/vendor/mermaid.LICENSE.txt' | relative_url }}">licence</a>). No model writes this page.</p>
<script src="{{ '/assets/vendor/mermaid.tiny.js' | relative_url }}"></script><script src="{{ '/assets/infra.js' | relative_url }}"></script>
