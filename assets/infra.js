// Company > Infrastructure > Workflow (T-0203, #41 c6410160408). Odalys.
// Draws the workflow diagram from the Mermaid source the site build wrote into #wf-src (tools/site/workflow.py reads
// it from the company's own files), with Mermaid 12.2.0 (MIT, self-hosted at assets/vendor/). Each box opens its step's
// detail, the same <article> that is listed as text below the diagram, in a dialog. Old links to the one-page
// Infrastructure (#techniques, #metrics, #experiments, #opt-..., #m-..., #t3) go to the sub-tab that now holds them.
(function () {
  var tabs = document.querySelector('nav.inf-tabs');
  var h = location.hash;
  if (tabs && h) {
    var to = /^#(techniques|rejected|t\d+)$/.test(h) ? 'techniques' : /^#(metrics|m-.+)$/.test(h) ? 'metrics'
      : /^#(experiments|opt-\d+)$/.test(h) ? 'experiments' : '';
    var a = to && tabs.querySelector('a[data-tab="' + to + '"]');
    if (a) { location.replace(a.href.split('#')[0] + (/^#(techniques|metrics|experiments)$/.test(h) ? '' : h)); return; }
  }
  var boxes = [].slice.call(document.querySelectorAll('.wf-chart[data-src]'));
  if (!boxes.length || !window.mermaid) return;
  var dlg = document.getElementById('wf-dlg'), body = document.getElementById('wf-dlg-body');
  var css = getComputedStyle(document.documentElement);
  function v(name, dflt) { var x = css.getPropertyValue(name).trim(); return x || dflt; }

  function open(id, from) {
    var art = document.getElementById('step-' + id);
    if (!art) return;
    var on = document.querySelectorAll('.wf-chart .node.wf-on'), i;
    for (i = 0; i < on.length; i++) on[i].classList.remove('wf-on');
    var gs = document.querySelectorAll('.wf-chart [data-wf="' + id + '"]');
    for (i = 0; i < gs.length; i++) gs[i].classList.add('wf-on');
    if (!dlg || typeof dlg.showModal !== 'function') { location.hash = 'step-' + id; return; }
    body.innerHTML = '';
    var copy = art.cloneNode(true);
    copy.removeAttribute('id');
    body.appendChild(copy);
    if (!dlg.open) { dlg._from = from || null; dlg.showModal(); }
    dlg.scrollTop = 0;
  }
  if (dlg) {
    document.getElementById('wf-dlg-x').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[data-step]');
      if (a) { e.preventDefault(); open(a.getAttribute('data-step')); return; }
      if (e.target === dlg) dlg.close();  // a click on the backdrop
    });
    dlg.addEventListener('close', function () { if (dlg._from && dlg._from.focus) dlg._from.focus(); });
  }

  mermaid.initialize({
    startOnLoad: false, securityLevel: 'strict', theme: 'base',
    themeVariables: { fontFamily: v('--font', 'sans-serif'), fontSize: '15px', primaryColor: v('--soft-2', '#e9ebf0'),
      primaryTextColor: v('--ink', '#17191d'), primaryBorderColor: v('--line', '#dfe2e8'), lineColor: v('--muted', '#5c6270'),
      background: v('--bg', '#ffffff'), mainBkg: v('--soft-2', '#e9ebf0'), clusterBkg: v('--soft', '#f3f4f7'),
      clusterBorder: v('--line', '#dfe2e8'), edgeLabelBackground: v('--bg', '#ffffff'), titleColor: v('--ink', '#17191d') },
    flowchart: { useMaxWidth: false, curve: 'basis', nodeSpacing: 30, rankSpacing: 42, padding: 10, wrappingWidth: 180 }
  });

  // Fit the width when the drawing is up to 1.6 times wider than the box; wider than that (a phone) it keeps its
  // own size and scrolls sideways, and the button switches.
  function fit(box, zoom, want) {
    box.classList.toggle('fit', want);
    if (zoom) { zoom.setAttribute('aria-pressed', want ? 'true' : 'false'); zoom.textContent = want ? 'Actual size' : 'Fit to width'; }
  }
  function bind(box) {
    var nodes = box.querySelectorAll('g.node');
    for (var i = 0; i < nodes.length; i++) {
      var m = /flowchart-([A-Za-z0-9_]+)-\d+$/.exec(nodes[i].id || '');
      if (!m || !document.getElementById('step-' + m[1])) continue;
      (function (g, id) {
        g.setAttribute('data-wf', id);
        g.setAttribute('tabindex', '0');
        g.setAttribute('role', 'button');
        g.setAttribute('aria-label', (g.textContent || id).replace(/\s+/g, ' ').trim() + ': open the detail');
        g.addEventListener('click', function () { open(id, g); });
        g.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(id, g); }
        });
      })(nodes[i], m[1]);
    }
  }
  var k = 0;
  function next() {
    if (k >= boxes.length) {
      var want = /^#step-([A-Za-z0-9_]+)$/.exec(location.hash);
      if (want) open(want[1]);
      return;
    }
    var box = boxes[k++], src = document.getElementById(box.getAttribute('data-src'));
    var zoom = document.querySelector('.wf-zoom[data-for="' + box.id + '"]');
    mermaid.render(box.id + '-svg', src ? src.textContent : '').then(function (r) {
      box.innerHTML = r.svg;
      var svg = box.querySelector('svg');
      svg.setAttribute('role', 'group');
      svg.setAttribute('aria-label', (box.previousElementSibling && box.previousElementSibling.previousElementSibling
        ? box.previousElementSibling.previousElementSibling.textContent + ': ' : '') + 'each step is a button that opens its detail');
      bind(box);
      var natural = svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width || svg.getBBox().width;
      var room = box.clientWidth - 24;
      if (zoom) {
        zoom.hidden = natural <= room;
        fit(box, zoom, natural > room && natural <= room * 1.6);
        zoom.onclick = function () { fit(box, zoom, !box.classList.contains('fit')); };
      }
    }).catch(function (e) {
      box.innerHTML = '<p class="meta">The diagram could not be drawn here (' + String(e && e.message || e).slice(0, 160)
        + '). The same steps are listed below as text.</p>';
    }).then(next);
  }
  // Links to a step from the text list open it in the dialog too.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.wf-step a[data-step]');
    if (a && !(dlg && dlg.contains(a))) { e.preventDefault(); open(a.getAttribute('data-step')); }
  });
  next();
})();
