// The look picker, /app/looks/ (T-5924). Source: tools/site/look_picker.py in the company repository.
// Explorations, not the app's look. Restyles the framed screen by CSS tokens alone, keeps the choice in the address,
// fetches a font only when it is picked, and draws the moving wash only when asked. T-5950: the details, ideas from
// the details.so Vault's names, each written here from scratch: covers between screens drawn in this page, and
// arrivals, button and panel touches set as CSS inside the frame. Under Reduce Motion none of them moves.
(function () {
  "use strict";
  var lp = document.getElementById("lp"), raw = document.getElementById("lp-data");
  if (!lp || !raw) return;
  var D = JSON.parse(raw.textContent), base = lp.getAttribute("data-base") || "/app/looks/";
  var frame = document.getElementById("lp-frame"), now = document.getElementById("lp-now");
  var status = document.getElementById("lp-status"), link = document.getElementById("lp-link");
  var ctl = lp.querySelector(".lp-ctl"), loaded = {}, seq = 0;
  var dark = !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  var st = {look: "swiss", screen: "projects", mode: dark ? "dark" : "light", palette: "", font: "sf-pro", shape: "", x: []};
  var cover = document.getElementById("lp-cover"), play = document.getElementById("lp-play");
  var xAll = document.getElementById("lp-x-all"), xNone = document.getElementById("lp-x-none");
  var calm = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var covered = false, parts = null, wantUrl = "", replay = false;

  function find(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function look() { return D.looks[st.look]; }
  function palette() { return find(look().palettes, st.palette) || look().palettes[0]; }
  function shape() { return find(D.shapes, st.shape) || find(D.shapes, look().shape); }
  function font() { return find(D.fonts, st.font) || D.fonts[0]; }
  function screen() { return find(D.screens, st.screen); }

  // ---- the details (T-5950)
  function fits(x) { return !!x && x.looks.indexOf(st.look) >= 0; }
  function setX(ids) {   // the address order, only those that fit the look, one per kind for move and type
    var out = [], taken = {};
    D.details.forEach(function (x) {
      if (ids.indexOf(x.id) < 0 || !fits(x)) return;
      if (D.one_of.indexOf(x.kind) >= 0) { if (taken[x.kind]) return; taken[x.kind] = 1; }
      out.push(x.id);
    });
    st.x = out;
  }
  function on(kind) {
    for (var i = 0; i < st.x.length; i++) { var x = find(D.details, st.x[i]); if (x && x.kind === kind) return x; }
    return null;
  }
  function still() { return !!(calm && calm.matches) || !cover || !cover.animate; }
  var BTN = '.row[style*="background:var(--accent)"]', PANELS = [".card", ".start", ".grp", ".blk", ".runcard"];
  function each(list, tail) { return list.map(function (s) { return s + tail; }).join(","); }
  function moving(css) { return "@media (prefers-reduced-motion:no-preference){" + css + "}"; }
  var FX = {
    rise: moving(".lt,.lede,.t2{animation:lpx-rise .75s cubic-bezier(.2,.75,.25,1) backwards}.lede{animation-delay:.12s}" +
      ".t2{animation-delay:.2s}@keyframes lpx-rise{from{transform:translateY(.7em);clip-path:inset(0 0 100% 0)}}"),
    strip: moving(".lt,.t2,.t3,.lede{animation:lpx-strip .9s steps(14,end) backwards}.lede,.t3{animation-delay:.15s}" +
      "@keyframes lpx-strip{from{clip-path:inset(0 100% 0 0)}}"),
    register: moving(".lt,.t2,.lede{animation:lpx-reg 1s cubic-bezier(.3,.7,.2,1) backwards}.lede{animation-delay:.1s}" +
      "@keyframes lpx-reg{from{text-shadow:7px 4px 0 var(--accent);transform:translate(-3px,-2px)}}"),
    fill: BTN + "{background-image:linear-gradient(var(--text),var(--text))!important;background-repeat:no-repeat!important;" +
      "background-size:0 100%!important;cursor:pointer}" + BTN + ":hover," + BTN + ":active{background-size:100% 100%!important}" +
      moving(BTN + "{transition:background-size .35s cubic-bezier(.3,.7,.2,1)}"),
    arrow: BTN + ":not(.chip){cursor:pointer}" + BTN + ":not(.chip)::after{content:'\\2192';display:block;flex:none;width:0;" +
      "margin-left:auto;overflow:hidden;opacity:0;font-weight:600;transform:translateX(-6px)}" + BTN + ":not(.chip):hover::after," +
      BTN + ":not(.chip):active::after{width:1.1em;padding-left:.2em;opacity:1;transform:none}" +
      moving(BTN + ":not(.chip)::after{transition:width .25s,padding .25s,opacity .2s,transform .3s cubic-bezier(.3,.7,.2,1)}"),
    lift: PANELS.join(",") + "{cursor:pointer}" + each(PANELS, ":hover") + "," + each(PANELS, ":active") +
      "{filter:drop-shadow(4px 4px 0 var(--accent))}" + moving(PANELS.join(",") + "{transition:transform .18s ease-out,filter .18s ease-out}" +
      each(PANELS, ":hover") + "," + each(PANELS, ":active") + "{transform:translate(-2px,-2px)}"),
    halftone: each(PANELS, ':not([style*="background:var(--accent)"])') + "{background-image:radial-gradient(color-mix(in srgb," +
      "var(--accent) 24%,transparent) .9px,transparent 1.3px)!important;background-size:5px 5px!important}"
  };
  function fxCss() {
    return st.x.map(function (id) { return FX[id] || ""; }).join("");
  }
  function fx(doc, again) {   // the details that live in the frame, set as one style; again: play the arrivals again
    if (!doc || !doc.head || !doc.body) return;
    var css = fxCss(), el = doc.getElementById("lp-fx");
    if (el && el.textContent === css && !again) return;
    if (el) el.parentNode.removeChild(el);
    if (!css) return;
    void doc.body.offsetWidth;   // let the old arrivals end, so the new ones start from the top
    el = doc.createElement("style"); el.id = "lp-fx"; el.textContent = css;
    doc.head.appendChild(el);
  }
  function build(id) {   // the cover's pieces for a screen change: [{el, in, out, d}]
    cover.textContent = "";
    var t = palette()[st.mode], a = t.accent, b = t.text, list = [], i, r, c;
    function add(css, a1, a2, d) {
      var el = document.createElement("i"), k;
      for (k in css) el.style.setProperty(k, css[k]);
      cover.appendChild(el);
      list.push({el: el, "in": a1, out: a2, d: d});
    }
    if (id === "shutter") for (i = 0; i < 8; i++)
      add({left: "0", right: "0", top: i * 12.5 + "%", height: "13.5%", background: a},
          [{transform: "scaleY(0)", transformOrigin: "50% 0"}, {transform: "scaleY(1)", transformOrigin: "50% 0"}],
          [{transform: "scaleY(1)", transformOrigin: "50% 100%"}, {transform: "scaleY(0)", transformOrigin: "50% 100%"}], i * 24);
    if (id === "columns") for (i = 0; i < 4; i++)
      add({top: "0", bottom: "0", left: i * 25 + "%", width: "25.3%", background: b},
          [{transform: "translateY(-100%)"}, {transform: "none"}], [{transform: "none"}, {transform: "translateY(100%)"}], i * 60);
    if (id === "ink") {
      var blend = st.mode === "dark" ? "screen" : "multiply";
      add({inset: "0", background: a}, [{transform: "translateX(-101%)"}, {transform: "none"}],
          [{transform: "none"}, {transform: "translateX(101%)"}], 0);
      add({inset: "0", "background-image": "radial-gradient(" + b + " 1.7px,transparent 2.3px)", "background-size": "6px 6px",
           "mix-blend-mode": blend}, [{transform: "translate(-101%,6px)"}, {transform: "translate(5px,3px)"}],
          [{transform: "translate(5px,3px)"}, {transform: "translate(101%,6px)"}], 70);
    }
    if (id === "cells") for (r = 0; r < 13; r++) for (c = 0; c < 6; c++)
      add({left: (c * 100 / 6).toFixed(3) + "%", top: (r * 100 / 13).toFixed(3) + "%", width: (100 / 6 + 0.3).toFixed(3) + "%",
           height: (100 / 13 + 0.3).toFixed(3) + "%", background: a, "box-shadow": "inset 0 0 0 .5px " + t.ground},
          [{transform: "scale(0)"}, {transform: "scale(1)"}], [{transform: "scale(1)"}, {transform: "scale(0)"}], (r + c) * 14);
    return list;
  }
  function run(list, phase, ms) {
    return Promise.all(list.map(function (p) {
      return p.el.animate(p[phase], {duration: ms, delay: p.d, easing: "cubic-bezier(.65,0,.35,1)", fill: "both"}).finished;
    }));
  }
  function closeOver(then) {   // cover the screen with the chosen move, then call then()
    if (covered) { then(); return; }
    covered = true; lp.setAttribute("data-moving", "1");
    parts = build(on("move").id);
    run(parts, "in", 280).then(then, then);
  }
  function openUp() {   // lift the cover; the frame's arrivals start as it opens
    var list = parts;
    if (!covered || !list) return Promise.resolve();
    if (replay) { replay = false; fx(frame.contentDocument, true); }
    function end() {
      if (parts !== list) return;
      cover.textContent = ""; parts = null; covered = false; lp.removeAttribute("data-moving");
    }
    return run(list, "out", 360).then(end, end);
  }

  function read() {
    var q = new URLSearchParams(location.hash.slice(1));
    if (!q.has("look")) return;
    if (Object.prototype.hasOwnProperty.call(D.looks, q.get("look"))) st.look = q.get("look");
    if (find(D.screens, q.get("screen"))) st.screen = q.get("screen");
    if (D.modes.indexOf(q.get("mode")) >= 0) st.mode = q.get("mode");
    st.palette = find(look().palettes, q.get("palette")) ? q.get("palette") : "";
    st.font = find(D.fonts, q.get("font")) ? q.get("font") : "sf-pro";
    st.shape = find(D.shapes, q.get("shape")) ? q.get("shape") : "";
    setX(q.has("details") ? String(q.get("details")).split(".") : []);
  }
  function hash() {
    var q = new URLSearchParams();
    q.set("look", st.look); q.set("screen", st.screen); q.set("mode", st.mode);
    q.set("palette", palette().id); q.set("font", font().id);
    if (st.shape) q.set("shape", st.shape);
    if (st.x.length) q.set("details", st.x.join("."));
    return "#" + q.toString();
  }
  function key() {
    return [st.look, st.screen, st.mode, palette().id, font().id, shape().id].join("/") + (st.x.length ? "/" + st.x.join(".") : "");
  }
  function tokens() {
    var t = {}, k, p = palette()[st.mode], s = shape().tokens;
    for (k in p) t[k] = p[k];
    for (k in s) t[k] = s[k];
    t.font = font().stack; t["font-display"] = "var(--font)";
    return t;
  }

  function sync() {
    lp.setAttribute("data-mode", st.mode);
    var ins = lp.querySelectorAll("input[type=radio]");
    for (var i = 0; i < ins.length; i++) {
      var el = ins[i], n = el.name.slice(3);
      var want = n === "palette" ? palette().id : n === "shape" ? shape().id : n === "font" ? font().id : st[n];
      if (n === "palette") {
        var off = el.getAttribute("data-look") !== st.look;
        el.disabled = off; el.parentNode.hidden = off;
      }
      el.checked = el.value === want;
    }
    var xs = lp.querySelectorAll("input[name=lp-x]"), names = [];
    for (var j = 0; j < xs.length; j++) {
      var cb = xs[j], fit = cb.getAttribute("data-looks").split(" ").indexOf(st.look) >= 0;
      cb.disabled = !fit; cb.parentNode.hidden = !fit; cb.checked = st.x.indexOf(cb.value) >= 0;
    }
    st.x.forEach(function (id) { names.push(find(D.details, id).name); });
    if (xNone) xNone.hidden = !st.x.length;
    if (play) play.hidden = still() || !(on("move") || on("type"));
    var mode = st.mode === "dark" ? "dark" : "light";
    now.textContent = look().name + ", " + screen().name + ", " + mode + ": " + palette().name + ", " + font().name +
      ", " + shape().name + (st.shape ? "" : " (as drawn)") + (names.length ? "; details: " + names.join(", ") : "");
  }

  function draw() {
    sync();
    var h = hash(), url = base + "screens/" + st.look + "-" + st.mode + "-" + st.screen + ".html";
    if (location.hash !== h) history.replaceState(null, "", h);
    if (link) link.setAttribute("href", h);
    lp.removeAttribute("data-drawn");
    wantUrl = url;
    if (frame.getAttribute("src") !== url) {
      seq++;
      if (on("move") && !still() && lp.hasAttribute("data-ready")) {
        closeOver(function () { if (frame.getAttribute("src") !== wantUrl) frame.setAttribute("src", wantUrl); });
      } else frame.setAttribute("src", url);
      return;
    }
    apply();
  }

  function done(k, my) {
    if (my !== seq) return;
    if (!covered) { lp.setAttribute("data-drawn", k); return; }
    openUp().then(function () { if (my === seq) lp.setAttribute("data-drawn", k); });
  }

  function apply() {
    var doc = frame.contentDocument, my = ++seq, want = key();
    var path = "/screens/" + st.look + "-" + st.mode + "-" + st.screen + ".html";
    if (!doc || !doc.documentElement || !doc.head || doc.URL.indexOf(path) < 0) return;
    var r = doc.documentElement, t = tokens(), k;
    r.removeAttribute("style");
    for (k in t) r.style.setProperty("--" + k, t[k]);
    if (covered) replay = true; else fx(doc, false);
    var f = font(), face = doc.getElementById("lp-face");
    if (!f.family) {
      if (face) face.parentNode.removeChild(face);
      status.textContent = "";
      done(want, my);
      return;
    }
    if (!face) { face = doc.createElement("style"); face.id = "lp-face"; doc.head.appendChild(face); }
    var src = new URL(base + "fonts/" + f.file, location.href).href;
    face.textContent = "@font-face{font-family:'" + f.family + "';src:url('" + src + "') format('truetype');font-weight:" +
      f.weight + ";font-style:normal;font-display:block}";
    if (!loaded[f.id]) status.textContent = "Loading " + f.name + " (" + f.size + ")...";
    var asks = [400, 600, 700, 800].map(function (w) { return doc.fonts.load(w + " 17px '" + f.family + "'"); });
    Promise.all(asks).then(function (got) {
      var ok = got.some(function (list) { return list.length > 0; });
      if (ok) loaded[f.id] = true;
      if (my !== seq) return;
      status.textContent = ok ? "" : f.name + " could not be loaded, so the system font stands in.";
      done(want, my);
    }, function () {
      if (my !== seq) return;
      status.textContent = f.name + " could not be loaded, so the system font stands in.";
      done(want, my);
    });
  }

  function fit() {
    var boxes = document.querySelectorAll(".lp-phone");
    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].clientWidth) boxes[i].style.setProperty("--k", (boxes[i].clientWidth / D.w).toFixed(4));
    }
  }
  var ro = window.ResizeObserver ? new ResizeObserver(fit) : null;
  function watch(el) { if (ro) ro.observe(el); }
  [].forEach.call(document.querySelectorAll(".lp-phone"), watch);
  window.addEventListener("resize", fit);

  lp.addEventListener("change", function (e) {
    var el = e.target;
    if (!el.name || el.name.slice(0, 3) !== "lp-") return;
    var n = el.name.slice(3);
    if (n === "x") {
      var x = find(D.details, el.value), ids = st.x.filter(function (id) {
        var o = find(D.details, id);
        return id !== el.value && !(el.checked && D.one_of.indexOf(x.kind) >= 0 && o.kind === x.kind);
      });
      if (el.checked) ids.push(el.value);
      setX(ids);
    } else if (n === "look") { st.look = el.value; st.palette = ""; setX(st.x); } else st[n] = el.value;
    draw();
  });
  if (xAll) xAll.addEventListener("click", function () {
    setX(D.details.map(function (x) { return x.id; })); draw();
  });
  if (xNone) xNone.addEventListener("click", function () { st.x = []; draw(); });
  if (play) play.addEventListener("click", function () {
    if (on("move") && !still()) closeOver(function () { replay = true; openUp(); });
    else fx(frame.contentDocument, true);
  });
  if (calm && calm.addEventListener) calm.addEventListener("change", sync);
  [].forEach.call(lp.querySelectorAll(".lp-tabs button"), function (b) {
    b.addEventListener("click", function () {
      ctl.setAttribute("data-group", b.getAttribute("data-group"));
      [].forEach.call(lp.querySelectorAll(".lp-tabs button"), function (o) { o.setAttribute("aria-pressed", String(o === b)); });
    });
  });
  document.getElementById("lp-reset").addEventListener("click", function () {
    st.palette = ""; st.font = "sf-pro"; st.shape = ""; st.x = []; draw();
  });
  frame.addEventListener("load", apply);
  window.addEventListener("hashchange", function () { read(); draw(); });

  var show = document.getElementById("lp-wash-show"), box = document.getElementById("lp-wash-box");
  if (show && box) show.addEventListener("click", function () {
    var f = document.createElement("iframe");
    f.title = "The watercolor wash, live";
    f.src = base + "wash/";
    box.appendChild(f); box.hidden = false; show.hidden = true;
    watch(box); fit();
  });

  read();
  draw();
  fit();
  lp.setAttribute("data-ready", "1");
})();
