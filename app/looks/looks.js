// The look picker, /app/looks/ (T-5924). Source: tools/site/look_picker.py in the company repository.
// Explorations, not the app's look. Restyles the framed screen by CSS tokens alone, keeps the choice in the address,
// fetches a font only when it is picked, and draws the moving wash only when asked.
(function () {
  "use strict";
  var lp = document.getElementById("lp"), raw = document.getElementById("lp-data");
  if (!lp || !raw) return;
  var D = JSON.parse(raw.textContent), base = lp.getAttribute("data-base") || "/app/looks/";
  var frame = document.getElementById("lp-frame"), now = document.getElementById("lp-now");
  var status = document.getElementById("lp-status"), link = document.getElementById("lp-link");
  var ctl = lp.querySelector(".lp-ctl"), loaded = {}, seq = 0;
  var dark = !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  var st = {look: "swiss", screen: "projects", mode: dark ? "dark" : "light", palette: "", font: "sf-pro", shape: ""};

  function find(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function look() { return D.looks[st.look]; }
  function palette() { return find(look().palettes, st.palette) || look().palettes[0]; }
  function shape() { return find(D.shapes, st.shape) || find(D.shapes, look().shape); }
  function font() { return find(D.fonts, st.font) || D.fonts[0]; }
  function screen() { return find(D.screens, st.screen); }

  function read() {
    var q = new URLSearchParams(location.hash.slice(1));
    if (!q.has("look")) return;
    if (Object.prototype.hasOwnProperty.call(D.looks, q.get("look"))) st.look = q.get("look");
    if (find(D.screens, q.get("screen"))) st.screen = q.get("screen");
    if (D.modes.indexOf(q.get("mode")) >= 0) st.mode = q.get("mode");
    st.palette = find(look().palettes, q.get("palette")) ? q.get("palette") : "";
    st.font = find(D.fonts, q.get("font")) ? q.get("font") : "sf-pro";
    st.shape = find(D.shapes, q.get("shape")) ? q.get("shape") : "";
  }
  function hash() {
    var q = new URLSearchParams();
    q.set("look", st.look); q.set("screen", st.screen); q.set("mode", st.mode);
    q.set("palette", palette().id); q.set("font", font().id);
    if (st.shape) q.set("shape", st.shape);
    return "#" + q.toString();
  }
  function key() { return [st.look, st.screen, st.mode, palette().id, font().id, shape().id].join("/"); }
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
    var mode = st.mode === "dark" ? "dark" : "light";
    now.textContent = look().name + ", " + screen().name + ", " + mode + ": " + palette().name + ", " + font().name +
      ", " + shape().name + (st.shape ? "" : " (as drawn)");
  }

  function draw() {
    sync();
    var h = hash(), url = base + "screens/" + st.look + "-" + st.mode + "-" + st.screen + ".html";
    if (location.hash !== h) history.replaceState(null, "", h);
    if (link) link.setAttribute("href", h);
    lp.removeAttribute("data-drawn");
    if (frame.getAttribute("src") !== url) { seq++; frame.setAttribute("src", url); return; }
    apply();
  }

  function done(want, my) { if (my === seq) lp.setAttribute("data-drawn", want); }

  function apply() {
    var doc = frame.contentDocument, my = ++seq, want = key();
    var path = "/screens/" + st.look + "-" + st.mode + "-" + st.screen + ".html";
    if (!doc || !doc.documentElement || !doc.head || doc.URL.indexOf(path) < 0) return;
    var r = doc.documentElement, t = tokens(), k;
    r.removeAttribute("style");
    for (k in t) r.style.setProperty("--" + k, t[k]);
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
    if (n === "look") { st.look = el.value; st.palette = ""; } else st[n] = el.value;
    draw();
  });
  [].forEach.call(lp.querySelectorAll(".lp-tabs button"), function (b) {
    b.addEventListener("click", function () {
      ctl.setAttribute("data-group", b.getAttribute("data-group"));
      [].forEach.call(lp.querySelectorAll(".lp-tabs button"), function (o) { o.setAttribute("aria-pressed", String(o === b)); });
    });
  });
  document.getElementById("lp-reset").addEventListener("click", function () {
    st.palette = ""; st.font = "sf-pro"; st.shape = ""; draw();
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
