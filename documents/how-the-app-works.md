---
layout: "default"
title: "How the app works \u00b7 Documents"
section: "documents"
description: "The app's parts, screens, Python run, path to the Home Screen, storage, widget extension and purchases, drawn from its code."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Diagrams</span><span>Drawn from commit <code>a282a83415 2026-11-14 5:59 AM ET</code></span></div><h1>How the app works</h1></div>
<style>.wf-legend{display:flex;flex-wrap:wrap;gap:var(--s2) var(--s4);list-style:none;padding:0;margin:var(--s3) 0}.wf-legend li{display:flex;align-items:center;gap:6px;font-size:var(--fs-1);color:var(--muted)}.wf-key{display:inline-block;width:14px;height:14px;border-radius:3px;border:1px solid var(--line);flex:none;margin-right:6px;vertical-align:-2px}.wf-key.script{background:var(--grey-bg)}.wf-key.decision{background:var(--amber-bg)}.wf-key.operator{background:var(--blue-bg)}.wf-key.worker{background:var(--green-bg)}.wf-key.investor{background:var(--pink-bg)}.wf-key.ghost{background:var(--bg);border:1.5px dashed var(--muted)}.wf-tools{display:flex;justify-content:flex-end;margin:0 0 var(--s2)}.wf-chart{overflow-x:auto;border:1px solid var(--line);border-radius:var(--r-m);background:var(--bg);padding:var(--s3)}.wf-chart svg{display:block;margin:0 auto;height:auto}.wf-chart.fit svg{width:100%!important;max-width:100%!important}.wf-chart .node{cursor:pointer}.wf-chart .node:focus{outline:none}.wf-chart .node:focus-visible rect,.wf-chart .node:focus-visible polygon,.wf-chart .node.wf-on rect,.wf-chart .node.wf-on polygon{stroke:var(--accent)!important;stroke-width:3px!important}.wf-chart .node.script rect,.wf-chart .node.script polygon,.wf-chart .node.script path{fill:var(--grey-bg)!important;stroke:var(--line)!important}.wf-chart .node.decision rect,.wf-chart .node.decision polygon{fill:var(--amber-bg)!important;stroke:var(--amber-fg)!important}.wf-chart .node.operator rect,.wf-chart .node.operator polygon{fill:var(--blue-bg)!important;stroke:var(--blue-fg)!important}.wf-chart .node.worker rect,.wf-chart .node.worker polygon{fill:var(--green-bg)!important;stroke:var(--green-fg)!important}.wf-chart .node.investor rect,.wf-chart .node.investor polygon,.wf-chart .node.investor path{fill:var(--pink-bg)!important;stroke:var(--pink-fg)!important}.wf-chart .node.script .nodeLabel,.wf-chart .node.script text{color:var(--grey-fg)!important;fill:var(--grey-fg)!important}.wf-chart .node.decision .nodeLabel,.wf-chart .node.decision text{color:var(--amber-fg)!important;fill:var(--amber-fg)!important}.wf-chart .node.operator .nodeLabel,.wf-chart .node.operator text{color:var(--blue-fg)!important;fill:var(--blue-fg)!important}.wf-chart .node.worker .nodeLabel,.wf-chart .node.worker text{color:var(--green-fg)!important;fill:var(--green-fg)!important}.wf-chart .node.investor .nodeLabel,.wf-chart .node.investor text{color:var(--pink-fg)!important;fill:var(--pink-fg)!important}.wf-chart .node.ghost rect{fill:var(--bg)!important;stroke:var(--muted)!important;stroke-dasharray:5 4}.wf-chart .node.ghost .nodeLabel,.wf-chart .node.ghost text{color:var(--muted)!important;fill:var(--muted)!important}.wf-chart .cluster rect{fill:var(--soft)!important;stroke:var(--line)!important}.wf-chart .cluster .nodeLabel,.wf-chart .cluster-label text{color:var(--ink)!important;fill:var(--ink)!important;font-weight:600}.wf-chart .flowchart-link{stroke:var(--muted)!important}.wf-chart marker path,.wf-chart .arrowheadPath{fill:var(--muted)!important;stroke:var(--muted)!important}.wf-chart .edgeLabel,.wf-chart .edgeLabel p,.wf-chart .edgeLabel rect,.wf-chart .labelBkg{background:var(--bg)!important;background-color:var(--bg)!important;fill:var(--bg)!important;color:var(--muted)!important}.wf-step{border:1px solid var(--line);border-radius:var(--r-m);background:var(--bg);padding:var(--s3);margin:var(--s3) 0}.wf-step h4{margin:0 0 var(--s1);font-size:var(--fs-2)}.wf-step:target{border-color:var(--accent)}.wf-ref{border-left:3px solid var(--line);padding-left:var(--s3);margin:var(--s2) 0}.wf-ref p{margin:0;overflow-wrap:anywhere}.wf-ref .ref{margin-top:2px}.wf-facts{display:grid;grid-template-columns:minmax(8em,max-content) 1fr;gap:var(--s1) var(--s3);margin:var(--s2) 0}.wf-facts dt{font-weight:600}.wf-facts dd{margin:0;overflow-wrap:anywhere}.wf-ladder code{font-size:var(--fs-0)}.wf-obs caption{text-align:left;font-size:var(--fs-1);color:var(--muted);padding-bottom:var(--s1)}.wf-obs th{font-weight:600;white-space:nowrap}.wf-obs td{overflow-wrap:anywhere}.wf-dvo td{overflow-wrap:anywhere}.wf-chart .nodeLabel i{font-style:italic;font-size:var(--fs-0);opacity:.85}#wf-dlg{width:min(720px,94vw);max-height:86vh;border:1px solid var(--line);border-radius:var(--r-m);background:var(--bg);color:var(--ink);padding:0}#wf-dlg-x,.wf-zoom{font:inherit}#wf-dlg::backdrop{background:rgba(0,0,0,.45)}.wf-dlg-bar{position:sticky;top:0;display:flex;justify-content:space-between;align-items:center;padding:var(--s2) var(--s3);background:var(--bg);border-bottom:1px solid var(--line)}#wf-dlg-body{padding:0 var(--s3) var(--s3)}#wf-dlg-body .wf-step{border:0;padding:0;margin:var(--s3) 0 0}</style>
<p class="meta">Every anchor was found in this build; 7 explanations are marked for a re-read.</p>
<p>pywidget is an iPhone and iPad app where a person writes a short Python script that becomes a widget on the Home Screen. The app holds the code editor, a Python interpreter and the person's projects. A separate small program, the widget extension, draws the widgets; iOS runs it apart from the app.</p>
<p>The app runs each script once, in the app, and saves the drawing it describes in a folder the app and the widget share. The widget reads that saved drawing and paints it; in any build that reaches the App Store it never runs Python itself.</p>
<p>The diagrams below are drawn from the app's code on every site build. The sentences beside them are written by people and are marked when the code under them changes.</p>
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
<ol><li><strong>PyWidget</strong> <span class="meta">(application; uses Python.xcframework, TreeSitter, TreeSitterPython, TreeSitterPythonQueries, Runestone, TreeSitterPythonRunestone, Runestone_Runestone, TreeSitterLanguages_TreeSitterPythonQueries, PyWidgetExtension)</span><br>The app a person installs: the editor, the console, projects, the gallery and settings, with the Python interpreter and pywidget's own Python modules packed inside.</li><li><strong>PyWidgetExtension</strong> <span class="meta">(app-extension; uses Python.xcframework; also sdk WidgetKit.framework, sdk SwiftUI.framework)</span><br>The widget extension: the small program iOS runs to draw pywidget's widgets on the Home Screen. It is shipped inside the app and reads what the app saved.</li><li><strong>PyWidgetTests</strong> <span class="meta">(bundle.unit-test; uses PyWidget, Python.xcframework; also sdk StoreKitTest.framework)</span><br>The automated tests of the app's code, run on the Simulator before any build is shipped.</li><li><strong>PyWidgetUITests</strong> <span class="meta">(bundle.ui-testing; uses PyWidget; also sdk StoreKitTest.framework)</span><br>The automated tests that open the app's screens and tap through them as a person would.</li><li><strong>Runestone</strong> <span class="meta">(library.static; uses TreeSitter)</span><br>The open-source text editor view the code editor is built on.</li><li><strong>Runestone_Runestone</strong> <span class="meta">(bundle; uses no other target)</span><br>The editor's own resources (its themes and privacy file), packed as a bundle.</li><li><strong>TreeSitter</strong> <span class="meta">(library.static; uses no other target)</span><br>The open-source parsing library the editor uses to understand code as it is typed.</li><li><strong>TreeSitterLanguages_TreeSitterPythonQueries</strong> <span class="meta">(bundle; uses no other target)</span><br>The colouring rule files themselves, packed as a bundle.</li><li><strong>TreeSitterPython</strong> <span class="meta">(library.static; uses no other target)</span><br>The Python grammar for that parser.</li><li><strong>TreeSitterPythonQueries</strong> <span class="meta">(library.static; uses no other target)</span><br>The rules that tell the editor which parts of Python code to colour, and how.</li><li><strong>TreeSitterPythonRunestone</strong> <span class="meta">(library.static; uses Runestone, TreeSitterPython, TreeSitterPythonQueries)</span><br>The small piece that connects the Python grammar to the editor view.</li></ol>
<h2 id="screens">2. Screens</h2>
<p>Every SwiftUI view in the app's App folder, grouped by folder. A view is a whole screen or a piece of one. The screens open from the IDE window's toolbar and its More menu until the tab bar lands.</p>
<p class="meta">39 views found in pywidget/ios/App/ by a line scan (31 SwiftUI, the slanted boxes UIKit views wrapped for SwiftUI). A solid arrow: one screen presents the other (a sheet, a cover or a push); dotted: it draws the other inside itself.</p>
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
    n_StaleCheckView["StaleCheckView"]
    n_ThemeCheckView["ThemeCheckView"]
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
  subgraph n_f_App_Projects["App/Projects/"]
    n_ProjectsView["ProjectsView"]
    n_ProjectFilesView["ProjectFilesView"]
  end
  subgraph n_f_App_Settings["App/Settings/"]
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
  n_ProjectsView --> n_ProjectFilesView
  n_IDEScene -.-> n_ContentView
  n_IDEScene -.-> n_SceneTitle
  n_ContentView --> n_AcknowledgementsView
  n_ContentView --> n_GalleryView
  n_ContentView --> n_ProPaywallView
  n_ContentView --> n_ProjectsView
  n_ContentView --> n_SettingsView
  n_ContentView -.-> n_ConsoleEditor
  n_ContentView -.-> n_ConsoleTextView
  n_ContentView -.-> n_HUDView
  n_ContentView -.-> n_ReplBar
  n_EditorThemePicker --> n_ProPaywallView
  n_EditorThemePicker -.-> n_EditorThemeSwatch
  n_GateMeasurementsRow --> n_ActivitySheet
  n_GateMeasurementsRow -.-> n_SettingsRowLabel
  n_SettingsView --> n_AcknowledgementsView
  n_SettingsView --> n_ProPaywallView
  n_SettingsView --> n_SettingsRowLabel
  n_SettingsView -.-> n_EditorThemePicker
  n_SettingsView -.-> n_GateMeasurementsRow
  n_SettingsView -.-> n_LauncherSettingsRow</script>
{% endraw %}
<h3>Screens, as a list</h3>
<ol><li><strong>AcknowledgementsView</strong> <span class="meta">(App/Acknowledgements.swift line 269; opens AckRow, NoticePage)</span><br>The open-source software in the app and the licence of each.</li><li><strong>AckRow</strong> <span class="meta">(App/Acknowledgements.swift line 324)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>NoticePage</strong> <span class="meta">(App/Acknowledgements.swift line 344; holds NoticeBlock)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>NoticeBlock</strong> <span class="meta">(App/Acknowledgements.swift line 370)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ConsoleTextView</strong> <span class="meta">(App/ConsoleTextView.swift line 9 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ConsoleEditor</strong> <span class="meta">(App/Editor/ConsoleEditor.swift line 17 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>EditorBenchView</strong> <span class="meta">(App/Editor/EditorBench.swift line 331 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>EditorCheckView</strong> <span class="meta">(App/Editor/EditorCheck.swift line 104 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>GalleryWell</strong> <span class="meta">(App/Gallery/GalleryView.swift line 66)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>GalleryView</strong> <span class="meta">(App/Gallery/GalleryView.swift line 150; opens GalleryDetailView; holds GalleryWell)</span><br>The gallery of ready-made widgets. A widget's tap on the Home Screen can open it at that widget's page.</li><li><strong>GalleryDetailView</strong> <span class="meta">(App/Gallery/GalleryView.swift line 379; holds GalleryWell)</span><br>One ready-made widget at full size in every size it offers, with its name and whether it needs Pro.</li><li><strong>LauncherTile</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 99)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherSettingsRow</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 226; opens LauncherAppsView, SettingsRowLabel)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherAppsView</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 261; opens LauncherSlotSheet; holds LauncherSlotRow, LauncherTile)</span><br>The launcher widget's slots in widget order; a tap on a slot opens the sheet that picks its app and symbol.</li><li><strong>LauncherSlotRow</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 359; holds LauncherTile)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherSlotSheet</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 399; opens LauncherAppChooser, LauncherSymbolGrid; holds LauncherTile)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherAppChooser</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 805; holds LauncherTile)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherSymbolGrid</strong> <span class="meta">(App/Launcher/LauncherEditor.swift line 851)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherWindowProbe</strong> <span class="meta">(App/LauncherTapHandling.swift line 166 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>LauncherSetUpSheet</strong> <span class="meta">(App/LauncherTapHandling.swift line 187)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ProjectsView</strong> <span class="meta">(App/Projects/ProjectsView.swift line 9; opens ProjectFilesView)</span><br>The list of projects: make, rename, delete, import a zip and export one. A tap opens the project's files.</li><li><strong>ProjectFilesView</strong> <span class="meta">(App/Projects/ProjectsView.swift line 176)</span><br>One project's Python files. A tap opens the file in this window's editor.</li><li><strong>IDEScene</strong> <span class="meta">(App/PyWidgetApp.swift line 132; holds ContentView, SceneTitle)</span><br>One editor window. On iPad there can be several; each has its own text, console and run, and they share one Python, one run at a time.</li><li><strong>ContentView</strong> <span class="meta">(App/PyWidgetApp.swift line 966; opens AcknowledgementsView, GalleryView, ProPaywallView, ProjectsView, SettingsView; holds ConsoleEditor, ConsoleTextView, HUDView, ReplBar)</span><br>The main screen inside a window: the code editor, the console under it and the toolbar. Projects, the Gallery, Settings, Pro and Acknowledgements open from here.</li><li><strong>ReplBar</strong> <span class="meta">(App/ReplBar.swift line 9)</span><br>The input field under the console when a running script asks for typed input.</li><li><strong>HUDView</strong> <span class="meta">(App/ReplBar.swift line 60)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>SceneSessionProbe</strong> <span class="meta">(App/SceneFile.swift line 210 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>SceneTitle</strong> <span class="meta">(App/SceneFile.swift line 236 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>EditorThemePicker</strong> <span class="meta">(App/Settings/EditorThemePicker.swift line 14; opens ProPaywallView; holds EditorThemeSwatch)</span><br>Choosing the editor's colours. Some themes need Pro, so it can open the Pro screen.</li><li><strong>EditorThemeSwatch</strong> <span class="meta">(App/Settings/EditorThemePicker.swift line 85)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ActivitySheet</strong> <span class="meta">(App/Settings/MeasurementExport.swift line 129 (a UIKit view wrapped for SwiftUI))</span><br><span class="meta">No explanation written yet.</span></li><li><strong>GateMeasurementsRow</strong> <span class="meta">(App/Settings/MeasurementExport.swift line 139; opens ActivitySheet; holds SettingsRowLabel)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>SettingsView</strong> <span class="meta">(App/Settings/SettingsView.swift line 54; opens AcknowledgementsView, ProPaywallView, SettingsRowLabel; holds EditorThemePicker, GateMeasurementsRow, LauncherSettingsRow)</span><br>Settings: the editor theme, Pro, the launcher widget's apps and the acknowledgements.</li><li><strong>SettingsRowLabel</strong> <span class="meta">(App/Settings/SettingsView.swift line 253)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>StaleCheckView</strong> <span class="meta">(App/StaleCheckView.swift line 6)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>ProPaywallView</strong> <span class="meta">(App/Store/ProPaywallView.swift line 218)</span><br>The Pro screen: what Pro adds and the buy and restore buttons. Pushed from Settings, or shown as a sheet elsewhere.</li><li><strong>ThemeCheckView</strong> <span class="meta">(App/ThemeCheckView.swift line 6)</span><br><span class="meta">No explanation written yet.</span></li><li><strong>WidgetInstallView</strong> <span class="meta">(App/WidgetInstallView.swift line 11)</span><br>A test-only screen: the automated widget checks use it to place a saved drawing where the widget reads it, without running Python.</li><li><strong>WidgetRunView</strong> <span class="meta">(App/WidgetRunView.swift line 13)</span><br>A test-only screen: it runs a widget script the way the product does and reads back what was saved. No person reaches it.</li></ol>
<h2 id="python-run">3. The Python run</h2>
<p>How the app runs a person's script. One Python interpreter lives inside the app and runs one script at a time; the app's Swift code talks to it through a small layer written in C.</p>
<p class="meta">The numbered boxes are the steps of a run. Below them, 24 Python modules read from pywidget/ios/App/Runtime/ with Python's own parser; a dotted arrow: one module imports the other.</p>
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
  n_m_pywidget_net -.-> n_m_pywidget__wire
  n_m_pywidget_net -.-> n_m_pywidget_errors
  n_m_pywidget_notifications -.-> n_m_pywidget__wire
  n_m_pywidget_notifications -.-> n_m_pywidget_errors
  n_m_pywidget_prompts -.-> n_m__pywidget_runtime_device
  n_m_pywidget_prompts -.-> n_m__pywidget_runtime_runner
  n_m_pywidget_prompts -.-> n_m_pywidget__wire
  n_m_pywidget_prompts -.-> n_m_pywidget_errors</script>
{% endraw %}
<h3>The Python run, as a list</h3>
<ol><li><strong>1. Python starts once</strong> <span class="meta">(Shared/Bridge/pwbridge.h: pw_rt_start)</span><br>The first time the app needs Python, it starts the interpreter with the Python library packed inside the app, and keeps it running for as long as the app is open.</li><li><strong>2. The runtime gets ready</strong> <span class="meta">(App/Runtime/_pywidget_runtime/runner.py: bootstrap)</span><br>pywidget's own runner sets up the rules every run shares: where scripts may import from, how printed text reaches the console, and how a run can be stopped. <span class="kind amber" title="anchor App/Runtime/_pywidget_runtime/runner.py bootstrap: was 1347a86e48d6, now b05682c665a1">The code changed after this was last checked.</span></li><li><strong>3. The app asks for a run</strong> <span class="meta">(Shared/Bridge/PyBridge.swift: RunRequest)</span><br>A run request says what to run (a saved file or the editor's text), why it runs (the console, a widget, a shortcut or a preview), and how long it may take.</li><li><strong>4. Runs wait their turn</strong> <span class="meta">(Shared/Bridge/PyBridge.swift: scriptLoop)</span><br>One thread takes the requests in order. A run that waited longer than it was allowed to take ends as "busy" without starting.</li><li><strong>5. Swift hands the run to Python</strong> <span class="meta">(Shared/Bridge/pwbridge.h: pw_rt_run)</span><br>The C layer passes the request to Python as text and waits for the run's summary. Swift never touches a Python object directly.</li><li><strong>6. The runner runs the script</strong> <span class="meta">(App/Runtime/_pywidget_runtime/runner.py: run)</span><br>The runner compiles the script, runs it, catches any error, waits for the threads the script started, and works out how the run ended: finished, stopped, or failed with an error.</li><li><strong>7. The script asks the phone for things</strong> <span class="meta">(Shared/Bridge/PyBridge.swift: DeviceCall)</span><br>When a script uses pywidget's modules (location, steps, files, the web, notifications, secrets), each call goes to the app's Swift code, which checks permission again and answers.</li><li><strong>8. Output comes back as records</strong> <span class="meta">(Shared/Bridge/PyBridge.swift: drain)</span><br>What the script prints, asks for, and draws is queued as numbered records. The app collects them in order and shows them in the console or saves the widget's drawing.</li><li><strong>9. The run ends</strong> <span class="meta">(App/Runtime/_pywidget_runtime/records.py: finish)</span><br>A last record always goes out, saying how the run ended and how long it took, so the app never waits on a run that is over.</li><li><strong>The speed bench's interpreter</strong> <span class="meta">(Shared/PythonRuntime.swift: PythonRuntime)</span><br>An older, simpler way to start Python, used only by the app's start-up speed bench. A person's scripts never run through it.</li><li><strong>Shared/PyBridge.h</strong> <span class="meta">(lets the Swift code call C; includes Python/Python.h, Bridge/pwbridge.h, mach/mach.h, sys/sysctl.h, unistd.h)</span></li><li><strong>_pywidget_runtime</strong> <span class="meta">(App/Runtime/_pywidget_runtime/__init__.py; no public functions or classes; imports _pywidget_runtime.device, _pywidget_runtime.limits, _pywidget_runtime.runner)</span></li><li><strong>_pywidget_runtime.app_manifest</strong> <span class="meta">(App/Runtime/_pywidget_runtime/app_manifest.py; defines ManifestError, Manifest, check_id, check_name, check_entry, check, parse, resolve_entry, read, encode, write, run_setup; imports _pywidget_runtime.limits)</span></li><li><strong>_pywidget_runtime.device</strong> <span class="meta">(App/Runtime/_pywidget_runtime/device.py; defines effective_timeout, error_for, parse_reply, call_with, remaining_budget, call; imports _pywidget_runtime.runner, pywidget.errors)</span></li><li><strong>_pywidget_runtime.<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span></strong> <span class="meta">(App/Runtime/_pywidget_runtime/lane.py; defines import_message, allowed, LaneImportError, Refusal, lane_of, LaneError, scan_source, check_project, LaneFinder, denied, never_resident, restore_guard, reset_step, compiled_stdlib_root, install_finder, containing_app, extension_config, mirror_entry; imports _pywidget_runtime.app_manifest)</span></li><li><strong>_pywidget_runtime.limits</strong> <span class="meta">(App/Runtime/_pywidget_runtime/limits.py; no public functions or classes)</span></li><li><strong>_pywidget_runtime.records</strong> <span class="meta">(App/Runtime/_pywidget_runtime/records.py; defines encode, outcome, error_summary, finish; imports _pywidget_runtime.limits, _pywidget_runtime.widget_tree)</span></li><li><strong>_pywidget_runtime.runner</strong> <span class="meta">(App/Runtime/_pywidget_runtime/runner.py; defines bootstrap, reset, hard_stop, run; imports _pywidget_runtime.app_manifest, _pywidget_runtime.lane, _pywidget_runtime.limits, _pywidget_runtime.records, _pywidget_runtime.systls, _pywidget_runtime.widget_tree)</span></li><li><strong>_pywidget_runtime.systls</strong> <span class="meta">(App/Runtime/_pywidget_runtime/systls.py; defines budget_timeout, ProxyNotSupported, BridgeSocket, patch_http_client, patch_urllib3, SystemTLSFinder, wanted, install, active; imports _pywidget_runtime.device, _pywidget_runtime.runner)</span></li><li><strong>_pywidget_runtime.widget_tree</strong> <span class="meta">(App/Runtime/_pywidget_runtime/widget_tree.py; defines TreeTooLarge, WidgetChoiceError, WidgetRequestError, parse_date, widget_id_problem, parse_request, is_first_party, check_first_party_source, find_widget, build, emit; imports _pywidget_runtime.limits)</span></li><li><strong>pywidget</strong> <span class="meta">(App/Runtime/pywidget/__init__.py; no public functions or classes; imports pywidget.errors, pywidget.reading)</span></li><li><strong>pywidget._wire</strong> <span class="meta">(App/Runtime/pywidget/_wire.py; defines now_s, remaining, run_context, prompt_wait, call, number, flag, text, name, moment, span, bad, want_bool, want_int, want_float, want_str, want_choice, want_strs, want_time, local_time, want_object, want_reading, stream; imports _pywidget_runtime.device, _pywidget_runtime.runner, pywidget.errors, pywidget.reading)</span></li><li><strong>pywidget.clipboard</strong> <span class="meta">(App/Runtime/pywidget/clipboard.py; defines has_text, has_url, has_image, detect, get_text, get_texts, set_text, change_count; imports pywidget._wire, pywidget.errors)</span></li><li><strong>pywidget.context</strong> <span class="meta">(App/Runtime/pywidget/context.py; no public functions or classes; imports pywidget._wire)</span></li><li><strong>pywidget.device</strong> <span class="meta">(App/Runtime/pywidget/device/__init__.py; no public functions or classes; imports pywidget.device.location, pywidget.device.pedometer)</span></li><li><strong>pywidget.device.location</strong> <span class="meta">(App/Runtime/pywidget/device/location.py; defines Location, status, accuracy, request_permission, request_full_accuracy, last_known, sample, updates; imports pywidget._wire, pywidget.errors, pywidget.reading)</span></li><li><strong>pywidget.device.pedometer</strong> <span class="meta">(App/Runtime/pywidget/device/pedometer.py; defines PedometerData, available, status, request_permission, history, today, by_day, updates; imports pywidget._wire, pywidget.errors, pywidget.reading)</span></li><li><strong>pywidget.errors</strong> <span class="meta">(App/Runtime/pywidget/errors.py; defines PyWidgetError, PermissionDenied, PermissionNotDetermined, NotAvailableHere, LiveOnlyInWidget, Unsupported, DeviceLocked, BridgeTimeout, TooManyPending, Offline, CertificateRejected, TransportSecurityRefused, HTTPStatusError)</span></li><li><strong>pywidget.files</strong> <span class="meta">(App/Runtime/pywidget/files.py; defines documents, shared, pick, bookmark, bookmarks, open_bookmark, forget; imports pywidget._wire, pywidget.errors)</span></li><li><strong>pywidget.http</strong> <span class="meta">(App/Runtime/pywidget/http.py; defines NetworkStatus, Response, get, post, get_json, status; imports _pywidget_runtime.device, pywidget._wire, pywidget.errors, pywidget.files, pywidget.reading)</span></li><li><strong>pywidget.keychain</strong> <span class="meta">(App/Runtime/pywidget/keychain.py; defines Secret, set, get_bytes, get, exists, delete, names; imports pywidget._wire, pywidget.errors)</span></li><li><strong>pywidget.net</strong> <span class="meta">(App/Runtime/pywidget/net.py; defines Response, get; imports pywidget._wire, pywidget.errors)</span></li><li><strong>pywidget.notifications</strong> <span class="meta">(App/Runtime/pywidget/notifications.py; defines Notification, status, request_permission, schedule, pending, cancel, cancel_all, set_badge; imports pywidget._wire, pywidget.errors)</span></li><li><strong>pywidget.prompts</strong> <span class="meta">(App/Runtime/pywidget/prompts.py; defines available, alert, text, number, choose, pick, TextField, NumberField, ToggleField, ChoiceField, DateField, form, hud; imports _pywidget_runtime.device, _pywidget_runtime.runner, pywidget._wire, pywidget.errors)</span></li><li><strong>pywidget.reading</strong> <span class="meta">(App/Runtime/pywidget/reading.py; defines Reading)</span></li></ol>
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
  s7 --> s8</script>
{% endraw %}
<h3>Script to Home Screen, as a list</h3>
<ol><li><strong>1. The app starts a widget run</strong> <span class="meta">(App/Bridge/WidgetWriter.swift: WidgetWriter)</span><br>When a person saves a script, when the app comes to the front, or when the Refresh shortcut runs, the app runs each placed widget's script once. <span class="kind amber" title="anchor App/Bridge/WidgetWriter.swift WidgetWriter: was 165616f952ed, now e17834df350e">The code changed after this was last checked.</span></li><li><strong>2. Python runs the script</strong> <span class="meta">(Shared/Bridge/PyBridge.swift: PyBridge)</span><br>The bridge starts the Python interpreter inside the app and hands it the script and which widget to draw. <span class="kind amber" title="anchor Shared/Bridge/PyBridge.swift PyBridge: was 75c417a315cb, now 6ac16e5ae89e">The code changed after this was last checked.</span></li><li><strong>3. The script describes its widget</strong> <span class="meta">(App/Runtime/_pywidget_runtime/widget_tree.py: emit)</span><br>When the script finishes, pywidget turns the widget it built into one description of the drawing: its text, shapes and colours for each size, and when to draw it again.</li><li><strong>4. The app saves the description</strong> <span class="meta">(Shared/Bridge/RunResultSink.swift: RunResultSink)</span><br>The app checks the description, writes it as tree.json in the widget's own folder, unless a newer one is already there, and asks iOS to redraw that widget.</li><li><strong>5. The shared folder (group.app.pywidget)</strong> <span class="meta">(Shared/WidgetID.swift: WidgetFolder)</span><br>The one folder both the app and the widget may open. Each widget has its own folder inside it, named by its id.</li><li><strong>6. The widget reads it</strong> <span class="meta">(Widget/PyWidget.swift: TreeProvider)</span><br>When iOS asks the widget for its timeline, it reads the chosen widget's tree.json; a locked Pro widget gets the Pro card instead. <span class="kind amber" title="anchor Widget/PyWidget.swift TreeProvider: was 5ca974a41016, now cefd52a838fa">The code changed after this was last checked.</span></li><li><strong>7. The widget plans its timeline</strong> <span class="meta">(Shared/TreeTimeline.swift: TreeTimelinePlanner)</span><br>It turns the description into the entries iOS will show over time, never asking for a refresh sooner than 15 minutes, and adds an entry that marks the data as old.</li><li><strong>8. The widget draws it</strong> <span class="meta">(Shared/TreeView.swift: TreeEntryView)</span><br>Each entry is painted with SwiftUI, with a small badge in the corner when the last run failed or a clock when the data is stale. <span class="kind amber" title="anchor Shared/TreeView.swift TreeEntryView: was aa0f3ffd900d, now 2d244237b0c8">The code changed after this was last checked.</span></li></ol>
<h2 id="storage">5. Storage</h2>
<p>Where the app keeps things on the phone, and which code opens each place. Nothing here leaves the phone unless a person exports or shares it.</p>
<p class="meta">31 Swift files in pywidget/ios/App/, Shared/ and Widget/ open one of these places, found by a line scan; an arrow: the file opens that place.</p>
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
    n_sf_App_Projects_ProjectStore_swift["ProjectStore.swift"]
    n_sf_App_Projects_WidgetScriptSave_swift["WidgetScriptSave.swift"]
    n_sf_App_PyWidgetApp_swift["PyWidgetApp.swift"]
    n_sf_App_RatingFactsLedger_swift["RatingFactsLedger.swift"]
    n_sf_App_SceneFile_swift["SceneFile.swift"]
    n_sf_App_Settings_MeasurementExport_swift["MeasurementExport.swift"]
    n_sf_App_Store_ProStore_swift["ProStore.swift"]
    n_sf_App_WidgetInstallView_swift["WidgetInstallView.swift"]
    n_sf_App_WidgetTapRouting_swift["WidgetTapRouting.swift"]
  end
  subgraph n_top_Shared["Shared/"]
    n_sf_Shared_Bridge_CrashMarker_swift["CrashMarker.swift"]
    n_sf_Shared_Bridge_LaneDevice_swift["LaneDevice.swift"]
    n_sf_Shared_Bridge_PyBridge_swift["PyBridge.swift"]
    n_sf_Shared_ExtensionLane_swift["ExtensionLane.swift"]
    n_sf_Shared_LaneRestBench_swift["LaneRestBench.swift"]
    n_sf_Shared_LauncherSlots_swift["LauncherSlots.swift"]
    n_sf_Shared_RefreshWidgetIntent_swift["RefreshWidgetIntent.swift"]
    n_sf_Shared_RunLog_RunLogRecorder_swift["RunLogRecorder.swift"]
    n_sf_Shared_TesterPro_swift["TesterPro.swift"]
    n_sf_Shared_WidgetID_swift["WidgetID.swift"]
    n_sf_Shared_WidgetPlacement_swift["WidgetPlacement.swift"]
  end
  subgraph n_top_Widget["Widget/"]
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
  n_sf_App_Projects_ProjectStore_swift --> n_st_Documents
  n_sf_App_Projects_WidgetScriptSave_swift --> n_st_The_shared_folder
  n_sf_App_PyWidgetApp_swift --> n_st_Settings
  n_sf_App_RatingFactsLedger_swift --> n_st_Settings
  n_sf_App_SceneFile_swift --> n_st_Settings
  n_sf_App_Settings_MeasurementExport_swift --> n_st_The_shared_folder
  n_sf_App_Store_ProStore_swift --> n_st_Settings
  n_sf_App_WidgetInstallView_swift --> n_st_The_shared_folder
  n_sf_App_WidgetTapRouting_swift --> n_st_The_shared_folder
  n_sf_Shared_Bridge_CrashMarker_swift --> n_st_Caches
  n_sf_Shared_Bridge_LaneDevice_swift --> n_st_The_shared_folder
  n_sf_Shared_Bridge_PyBridge_swift --> n_st_The_shared_folder
  n_sf_Shared_Bridge_PyBridge_swift --> n_st_Documents
  n_sf_Shared_ExtensionLane_swift --> n_st_The_shared_folder
  n_sf_Shared_LaneRestBench_swift --> n_st_The_shared_folder
  n_sf_Shared_LauncherSlots_swift --> n_st_The_shared_folder
  n_sf_Shared_RefreshWidgetIntent_swift --> n_st_The_shared_folder
  n_sf_Shared_RunLog_RunLogRecorder_swift --> n_st_The_shared_folder
  n_sf_Shared_TesterPro_swift --> n_st_Settings
  n_sf_Shared_WidgetID_swift --> n_st_The_shared_folder
  n_sf_Shared_WidgetPlacement_swift --> n_st_The_shared_folder
  n_sf_Widget_PyWidget_swift --> n_st_The_shared_folder</script>
{% endraw %}
<h3>Storage, as a list</h3>
<ol><li><strong>The shared folder</strong> <span class="meta">(opened in 20 files: App/Bench.swift, App/Bridge/WidgetWriter.swift, App/Device/FilesCall.swift, App/Device/LocationCall.swift, App/Intents/RunScriptIntents.swift, App/Launcher/LauncherEditor.swift, App/Projects/WidgetScriptSave.swift, App/Settings/MeasurementExport.swift, App/WidgetInstallView.swift, App/WidgetTapRouting.swift, Shared/Bridge/LaneDevice.swift, Shared/Bridge/PyBridge.swift, Shared/ExtensionLane.swift, Shared/LaneRestBench.swift, Shared/LauncherSlots.swift, Shared/RefreshWidgetIntent.swift, Shared/RunLog/RunLogRecorder.swift, Shared/WidgetID.swift, Shared/WidgetPlacement.swift, Widget/PyWidget.swift; file names written beside it: bench.jsonl, device/location.json, index.json, lane-bench.jsonl, lane-rest.jsonl, launcher/slots.json, manifest.json, premade.json, pywidget.json, pywidget/bookmarks.plist, pywidget/device/location.json, render-fault.json, tree.json)</span><br>The one folder both the app and the widget may open. It holds a folder per placed widget with its saved drawing (tree.json), the scripts' own shared data, the launcher's slots, and the run log. Scripts in the app can write here, so the widget never takes its Pro answer from this folder.</li><li><strong>Documents</strong> <span class="meta">(opened in 4 files: App/Device/FilesCall.swift, App/Editor/EditorBench.swift, App/Projects/ProjectStore.swift, Shared/Bridge/PyBridge.swift; file names written beside it: editor-bench.json, pywidget/bookmarks.plist)</span><br>The person's projects and their Python files, in a folder called Scripts. This is the folder the Files app can see.</li><li><strong>Application Support</strong> <span class="meta">(opened in 2 files: App/Device/FilesCall.swift, App/Device/LocationCall.swift; file names written beside it: device/location.json, pywidget/bookmarks.plist, pywidget/device/location.json)</span><br>Small private files only the app reads: the bookmarks to files a person picked in the Files app, and the last known location a script asked for, deleted when the permission is withdrawn. <span class="kind amber" title="anchor App/Device/FilesCall.swift SystemFiles: was 221c0addeb1b, now c80c156ba15c">The code changed after this was last checked.</span></li><li><strong>Caches</strong> <span class="meta">(opened in 2 files: App/Editor/LaunchProbe.swift, Shared/Bridge/CrashMarker.swift; file names written beside it: faulthandler.txt, launch-probe.json, run.marker)</span><br>A marker for the run in progress and Python's crash text. If the app is killed during a run, the next launch finds the marker and records the run that was cut short.</li><li><strong>Settings</strong> <span class="meta">(opened in 6 files: App/Editor/EditorThemeChoice.swift, App/PyWidgetApp.swift, App/RatingFactsLedger.swift, App/SceneFile.swift, App/Store/ProStore.swift, Shared/TesterPro.swift)</span><br>Small preferences: the editor theme, a note about text saved on leaving the app, and the facts used to decide when to ask for a rating. In test builds only, the tester's Pro switch sits in the shared folder's settings so the widget can read it.</li><li><strong>Keychain</strong> <span class="meta">(opened in 1 file: App/Device/KeychainCall.swift)</span><br>Secrets a person's scripts save through pywidget.keychain, each script in its own space. They stay on this device, are never synced to iCloud, and are limited to 16 KB each.</li></ol>
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
    n_x_appAcknowledgements_Acknowledgements_json["Acknowledgements/Acknowledgements.json"]
    n_x_appAcknowledgements_Acknowledgements_txt["Acknowledgements/Acknowledgements.txt"]
  end
  subgraph x_both["Built into both"]
    n_x_bothShared["Shared/<br/>41 code files"]
    n_x_bothShared_Bridge["Shared/Bridge/<br/>10 code files"]
    n_x_bothShared_RunLog["Shared/RunLog/<br/>7 code files"]
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
    r3["Pro is asked of the App Store, not of the shared folder"]
    r4["The widget only reads the saved drawing"]
  end
  x_ext --- x_rules</script>
{% endraw %}
<h3>The extension, as a list</h3>
<ol><li><strong>App</strong> <span class="meta">(in the app only)</span></li><li><strong>App/Runtime</strong> <span class="meta">(in the app only)</span></li><li><strong>Privacy/App/PrivacyInfo.xcprivacy</strong> <span class="meta">(in the app only)</span></li><li><strong>../docs/design/viewtree.schema.json</strong> <span class="meta">(in the app only)</span></li><li><strong>Acknowledgements/Acknowledgements.json</strong> <span class="meta">(in the app only)</span></li><li><strong>Acknowledgements/Acknowledgements.txt</strong> <span class="meta">(in the app only)</span></li><li><strong>Shared/</strong> <span class="meta">(built into both: AgeLine.swift, ChooseCardView.swift, DisplayFont.swift, ExtensionLane.swift, FirstDrawCardView.swift, FirstRender.swift, GatePremade.swift, LaneGuard.swift, LaneRerunRule.swift, LaneRestBench.swift, LauncherPremade.swift, LauncherPremadeSlots.swift, LauncherSlots.swift, NetFetch.swift, Premades.swift, ProCardView.swift, ProEntitlement.swift, ProFlags.swift, PyBridge.h, PythonRuntime.swift, RefreshAsks.swift, RefreshOutcomeRule.swift, RefreshSchedule.swift, RefreshTapRule.swift, RefreshWidgetIntent.swift, RefreshWidgetsIntent.swift, StaleEntryPlan.swift, TesterPro.swift, TreeNodes.swift, TreePaint.swift, TreePresence.swift, TreeRules.swift, TreeTimeline.swift, TreeView.swift, ViewTreeSchema.swift, WidgetFaceRule.swift, WidgetID.swift, WidgetPlacement.swift, WidgetStatus.swift, WidgetTapLink.swift, ZoneProbe.swift)</span></li><li><strong>Shared/Bridge/</strong> <span class="meta">(built into both: BridgeLimits.swift, CrashMarker.swift, DeviceSupport.swift, LaneDevice.swift, NetCall.swift, PyBridge.swift, RunResultSink.swift, WidgetRunLog.swift, pwbridge.c, pwbridge.h)</span></li><li><strong>Shared/RunLog/</strong> <span class="meta">(built into both: RunDetail.swift, RunLogExport.swift, RunLogRecorder.swift, RunLogRetention.swift, RunLogStore.swift, RunRow.swift, TracebackFold.swift)</span></li><li><strong>../runtime/pro-flags.json</strong> <span class="meta">(built into both)</span></li><li><strong>../docs/design/states/state-tokens.json</strong> <span class="meta">(built into both)</span></li><li><strong>Widget</strong> <span class="meta">(in the widget only)</span></li><li><strong>Privacy/Widget/PrivacyInfo.xcprivacy</strong> <span class="meta">(in the widget only)</span></li><li><strong>../widgets/premade/first-renders</strong> <span class="meta">(in the widget only)</span></li><li><strong>No Python in the App Store build</strong> <span class="meta">(Shared/LaneGuard.swift: WidgetLane)</span><br>The switch that would let the widget run a script itself is off in every build that can reach the App Store. The code that starts Python is built into the widget, but nothing in the widget calls it in those builds, and an automated test checks that.</li><li><strong>A test build's widget run stays short</strong> <span class="meta">(Shared/ExtensionLane.swift: ExtensionLane)</span><br>In the test builds where the switch is on, a widget script gets 2 seconds, and the widget answers iOS within 4 seconds whatever the script is doing, drawing the last saved result if the run is not done.</li><li><strong>Pro is asked of the App Store, not of the shared folder</strong> <span class="meta">(Shared/ProEntitlement.swift: ProEntitlement)</span><br>The widget asks Apple's purchase system itself whether Pro was bought, and reads the list of Pro widgets from its own copy of the flag file. A script could write the shared folder, so a Pro answer saved there could be faked.</li><li><strong>The widget only reads the saved drawing</strong> <span class="meta">(Widget/PyWidget.swift: TreeProvider)</span><br>The widget's one entry point reads the drawing the app saved for that widget and paints it; a Pro widget that is locked shows the Pro card instead. <span class="kind amber" title="anchor Widget/PyWidget.swift TreeProvider: was 5ca974a41016, now cefd52a838fa">The code changed after this was last checked.</span></li></ol>
<h2 id="purchases">7. Purchases</h2>
<p>How a person buys Pro, how a purchase is restored, and how the app and the widget decide what Pro unlocks. Pro is one purchase, paid once. Which widgets need it comes from a flag file built into both the app and the widget.</p>

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
  s8["8. Locked widgets show the Pro card<br/>Shared/ProEntitlement.swift: mayDraw"]
  s7 --> s8
  subgraph n_data["Read from the app's data files"]
    p1[("PyWidget Pro<br/>app.pywidget.pro, NonConsumable<br/>test price 14.99")]
    fl[("pro-flags.json<br/>app.pywidget.pro<br/>5 free, 7 Pro widgets")]
  end</script>
{% endraw %}
<h3>Purchases, as a list</h3>
<ol><li><strong>1. The flag file names the product</strong> <span class="meta">(../runtime/pro-flags.json: product)</span><br>The flag file says which App Store product is Pro. With no product named, nothing is for sale and nothing is locked.</li><li><strong>2. The app loads the product</strong> <span class="meta">(App/Store/ProStore.swift: loadProduct)</span><br>The Pro screen asks the App Store for that product, to show its name and the price in the person's own currency.</li><li><strong>3. A person taps Buy</strong> <span class="meta">(App/Store/ProStore.swift: purchase)</span><br>The App Store shows its own purchase sheet. The person can buy, cancel, or the purchase can wait for approval (for example, Ask to Buy).</li><li><strong>4. The purchase is settled</strong> <span class="meta">(App/Store/ProStore.swift: settlePurchase)</span><br>A completed purchase is checked, marked finished with the App Store, and Pro turns on at once, even if the App Store's list of purchases has not caught up yet; the app keeps re-reading that list for a few seconds.</li><li><strong>5. Restore asks the App Store again</strong> <span class="meta">(App/Store/ProStore.swift: restore; follows The app loads the product)</span><br>Only when a person taps Restore: the app asks the App Store for this account's purchases and reads them again. It says whether anything was restored.</li><li><strong>6. The one rule for Pro</strong> <span class="meta">(Shared/ProEntitlement.swift: grants; follows The purchase is settled, Restore asks the App Store again)</span><br>Pro is on when there is a verified purchase of the named product that has not been refunded or revoked. The app and the widget use this same rule.</li><li><strong>7. The widget asks for itself</strong> <span class="meta">(Shared/ProEntitlement.swift: gates)</span><br>The widget does not trust anything the app saved: it reads its own flag file and asks the App Store directly. In test builds a tester's switch can also turn Pro on.</li><li><strong>8. Locked widgets show the Pro card</strong> <span class="meta">(Shared/ProEntitlement.swift: mayDraw)</span><br>A ready-made widget marked Pro is drawn only when Pro is on; otherwise the widget shows the Pro card. A person's own widgets are never locked.</li><li><strong>StoreKit product app.pywidget.pro</strong> <span class="meta">(StoreKit/PyWidget.storekit: NonConsumable, 'PyWidget Pro', test price 14.99 (a price for Xcode's testing only; the price people pay is set in App Store Connect))</span></li><li><strong>pywidget/runtime/pro-flags.json</strong> <span class="meta">(product app.pywidget.pro (non-consumable); Pro covers: premades on, themes off, packages off; free widgets: countdown, sun, steps, distance, altitude; Pro widgets: habits, shortcuts, storage, progress, quote, clocks, github)</span></li></ol>
<p class="latest">Drawn on each site build by tools/site/how_it_works.py from pywidget/ios/project.yml (through xcodegen), the Swift in pywidget/ios/App/, Shared/ and Widget/, the bridging header, the Python in App/Runtime/ (read with ast), StoreKit/PyWidget.storekit, pywidget/runtime/pro-flags.json and the entitlements. The sentences are written by people in pywidget/docs/how-it-works/ and checked against the code by fingerprint; no program writes them. Drawn in your browser by Mermaid 12.2.0 (MIT licence, served from this site: <a href="{{ '/assets/vendor/mermaid.LICENSE.txt' | relative_url }}">licence</a>). No model writes this page.</p>
<script src="{{ '/assets/vendor/mermaid.tiny.js' | relative_url }}"></script><script src="{{ '/assets/infra.js' | relative_url }}"></script>
