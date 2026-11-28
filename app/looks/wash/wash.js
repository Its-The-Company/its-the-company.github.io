/* The watercolor wash, live (T-5860). Maren, 2026-11-26. PROPOSAL ONLY: Paper and Studio stay the app's look.

   A port of pywidget/docs/design/new-look/wash.py: the same seed (5856), the same generator (mulberry32), the same
   pools, layers and crops, in the same order, so frame 0 is the still. Then each pool of pigment drifts, turns and
   swells a little on its own slow cycle (50 to 90 seconds), from a second seed, so the motion is the same on every
   phone. No outside library, no network, no build step; colours are watercolor.py's three palettes, light and dark.

   Pause stops the clock and keeps the frame. Under Reduce Motion the page draws frame 0 once and never starts the
   clock. A hidden tab draws nothing (requestAnimationFrame stops), and a window off screen is skipped. */
(function () {
  "use strict";

  var SEED = 5856, WASH_W = 1000, WASH_H = 1400, POOLS_X = 3, POOLS_Y = 4, LAYERS = 28;
  var BASE_DEPTH = 2, LAYER_DEPTH = 3;
  var FPS = 20;          // the drift is about 2 px a second, so 20 frames a second is smooth and spares the battery
  var MAX_DPR = 2;       // the stills are drawn at 2x; a 3x phone draws at 2x and lets the browser scale

  // watercolor.py PALETTES, the tokens this page uses (live.py checks they match)
  var PALETTES = {
    warm: {
      light: {ground: "#F8F3EC", surface: "#FFFDF9", fill: "#F0E7DC", line: "#E5D9CB", text: "#231C17", text2: "#6A5D52",
              accent: "#A6452A", "on-accent": "#FFFFFF", p1: "#E0937A", p2: "#E9BC6E", p3: "#CF8E9E", p4: "#97B394",
              wa: ".026", "wa-edge": ".06"},
      dark: {ground: "#141210", surface: "#1F1C19", fill: "#2B2724", line: "#36312C", text: "#F5EFE8", text2: "#B6AA9F",
             accent: "#F2A486", "on-accent": "#2B140B", p1: "#C0583C", p2: "#C08C35", p3: "#A2506C", p4: "#5E845C",
             wa: ".024", "wa-edge": ".05"}
    },
    cool: {
      light: {ground: "#F3F6F8", surface: "#FFFFFF", fill: "#E6ECF1", line: "#D6DFE6", text: "#15202B", text2: "#536170",
              accent: "#1E5DA6", "on-accent": "#FFFFFF", p1: "#86ADDD", p2: "#83C6BE", p3: "#AF9FDA", p4: "#9CC0E6",
              wa: ".026", "wa-edge": ".06"},
      dark: {ground: "#0F1215", surface: "#191D21", fill: "#24292E", line: "#30363C", text: "#EBF0F5", text2: "#A4B0BC",
             accent: "#92BFF3", "on-accent": "#0A1A2C", p1: "#2F5F9C", p2: "#2A7D75", p3: "#5F4D96", p4: "#3D70A9",
             wa: ".03", "wa-edge": ".06"}
    },
    muted: {
      light: {ground: "#F4F3EF", surface: "#FDFCFA", fill: "#E9E7E1", line: "#DBD8D0", text: "#1E1F1B", text2: "#5D5F58",
              accent: "#3D6A5A", "on-accent": "#FFFFFF", p1: "#AFBDA8", p2: "#C9B19D", p3: "#A2AEBA", p4: "#D4C7AA",
              wa: ".03", "wa-edge": ".06"},
      dark: {ground: "#121311", surface: "#1C1D1A", fill: "#272825", line: "#32342F", text: "#ECEBE5", text2: "#AAAAA1",
             accent: "#A3CBB9", "on-accent": "#102019", p1: "#506352", p2: "#715847", p3: "#4B5866", p4: "#6D6450",
             wa: ".034", "wa-edge": ".06"}
    }
  };

  // ---------------------------------------------------------------- the generator, as wash.py has it
  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1) >>> 0;
      t = (t ^ ((t + (Math.imul(t ^ (t >>> 7), t | 61) >>> 0)) >>> 0)) >>> 0;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function Rand(seed) {
    var r = mulberry32(seed);
    this.uniform = function (lo, hi) { return lo + (hi - lo) * r(); };
    this.gauss = function () {
      var u = 1.0 - r(), v = r();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };
  }

  var CRC = (function () {
    var t = [], c, n, k;
    for (n = 0; n < 256; n++) {
      c = n;
      for (k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
      t.push(c >>> 0);
    }
    return t;
  })();

  function crc32(s) {          // zlib.crc32 of the key's UTF-8 bytes (the keys are ASCII)
    var c = 0xFFFFFFFF;
    for (var i = 0; i < s.length; i++) c = CRC[(c ^ s.charCodeAt(i)) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  function roundHalfEven(x) {  // Python's round(), which wash.defs() uses on every point
    var f = Math.floor(x), d = x - f;
    if (d > 0.5) return f + 1;
    if (d < 0.5) return f;
    return f % 2 === 0 ? f : f + 1;
  }

  function deform(pts, depth, scale, rnd) {
    for (var k = 0; k < depth; k++) {
      var out = [], n = pts.length;
      for (var i = 0; i < n; i++) {
        var p0 = pts[i], p1 = pts[(i + 1) % n];
        out.push(p0);
        var length = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
        var d = rnd.gauss() * length * scale * p0[2];
        var a = rnd.uniform(0.0, 2.0 * Math.PI);
        out.push([(p0[0] + p1[0]) / 2 + Math.cos(a) * d, (p0[1] + p1[1]) / 2 + Math.sin(a) * d,
                  (p0[2] + p1[2]) / 2 * rnd.uniform(0.85, 1.1)]);
      }
      pts = out;
    }
    return pts;
  }

  // [{pig, cx, cy, layers: [[[x, y], ...] rounded as in the still]}] for the whole field
  function pools(seed) {
    var rnd = new Rand(seed), cw = WASH_W / POOLS_X, ch = WASH_H / POOLS_Y, order = [1, 2, 3, 4], out = [];
    for (var gy = 0; gy < POOLS_Y; gy++) {
      for (var gx = 0; gx < POOLS_X; gx++) {
        var cx = (gx + 0.5) * cw + rnd.uniform(-0.3, 0.3) * cw;
        var cy = (gy + 0.5) * ch + rnd.uniform(-0.3, 0.3) * ch;
        var r = rnd.uniform(0.55, 0.85) * Math.max(cw, ch) * 0.58, n = 10, base = [];
        for (var i = 0; i < n; i++) {
          var x = cx + r * Math.cos(2 * Math.PI * i / n) * rnd.uniform(0.8, 1.15);
          var y = cy + r * Math.sin(2 * Math.PI * i / n) * rnd.uniform(0.8, 1.15);
          base.push([x, y, rnd.uniform(0.25, 1.0)]);
        }
        base = deform(base, BASE_DEPTH, 0.42, rnd);
        var layers = [];
        for (var l = 0; l < LAYERS; l++) {
          layers.push(deform(base, LAYER_DEPTH, 0.36, rnd).map(function (p) {
            return [roundHalfEven(p[0]), roundHalfEven(p[1])];
          }));
        }
        var pig = order[(gx + gy * 2 + Math.floor(rnd.uniform(0, 4))) % 4];
        out.push({pig: pig, cx: cx, cy: cy, layers: layers});
      }
    }
    return out;
  }

  function crop(key, w, h, seed, zoom) {
    var rnd = new Rand((seed ^ crc32(key)) >>> 0);
    var uw = Math.min(WASH_W, rnd.uniform(380, 560) / zoom), uh = uw * h / w;
    if (uh > WASH_H) { uh = WASH_H; uw = WASH_H * w / h; }
    var x = rnd.uniform(0, WASH_W - uw), y = rnd.uniform(0, WASH_H - uh);
    return [x, y, uw, uh];
  }

  // ---------------------------------------------------------------- the motion: each pool on its own slow cycle
  // A wave that starts at 0, so frame 0 is the still: amp * (sin(2 pi t / period + phase) - sin(phase)).
  function wave(m, t) { return m[0] * (Math.sin(2 * Math.PI * t / m[1] + m[2]) - Math.sin(m[2])); }

  function motions(n, seed) {
    var rnd = new Rand((seed ^ crc32("live")) >>> 0), out = [];
    for (var i = 0; i < n; i++) {
      out.push({
        dx: [rnd.uniform(14, 26), rnd.uniform(50, 90), rnd.uniform(0, 2 * Math.PI)],              // wash units
        dy: [rnd.uniform(14, 26), rnd.uniform(50, 90), rnd.uniform(0, 2 * Math.PI)],
        turn: [rnd.uniform(0.012, 0.03), rnd.uniform(60, 90), rnd.uniform(0, 2 * Math.PI)],       // radians
        swell: [rnd.uniform(0.012, 0.025), rnd.uniform(50, 80), rnd.uniform(0, 2 * Math.PI)]      // of its size
      });
    }
    return out;
  }

  var POOLS = pools(SEED), MOTION = motions(POOLS.length, SEED);
  var PATHS = POOLS.map(function (p) {
    return p.layers.map(function (poly) {
      var path = new Path2D();
      for (var i = 0; i < poly.length; i++) path[i ? "lineTo" : "moveTo"](poly[i][0], poly[i][1]);
      path.closePath();
      return path;
    });
  });

  // ---------------------------------------------------------------- drawing
  var root = document.documentElement;
  var darkQ = window.matchMedia("(prefers-color-scheme: dark)");
  var stillQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  var palette = "warm", tokens = null;

  function setTokens() {
    tokens = PALETTES[palette][darkQ.matches ? "dark" : "light"];
    for (var k in tokens) root.style.setProperty("--" + k, tokens[k]);
  }

  var windows = [].map.call(document.querySelectorAll(".wash[data-key]"), function (el) {
    var w = +el.dataset.w, h = +el.dataset.h, fade = el.dataset.fade.split(",");
    var g = "linear-gradient(180deg,transparent 0,#000 72px,#000 " + fade[0] + "%,transparent " + fade[1] + "%)";
    el.style.webkitMaskImage = g;
    el.style.maskImage = g;
    return {el: el, canvas: el.querySelector("canvas"), crop: crop(el.dataset.key, w, h, SEED, 1.0), seen: true};
  });

  function size(win) {
    var dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR), r = win.el.getBoundingClientRect();
    var cw = Math.round(r.width * dpr), ch = Math.round(r.height * dpr);
    if (win.canvas.width !== cw || win.canvas.height !== ch) { win.canvas.width = cw; win.canvas.height = ch; }
  }

  function drawWindow(win, t) {
    var c = win.canvas, ctx = c.getContext("2d"), cr = win.crop;
    var s = Math.max(c.width / cr[2], c.height / cr[3]);    // xMidYMid slice, as the stills' <svg> has it
    var ox = (c.width - cr[2] * s) / 2, oy = (c.height - cr[3] * s) / 2;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.fillStyle = tokens.ground;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.lineWidth = 1.2;
    var wa = +tokens.wa, we = +tokens["wa-edge"];
    for (var i = 0; i < POOLS.length; i++) {
      var p = POOLS[i], m = MOTION[i], col = tokens["p" + p.pig];
      var a = wave(m.turn, t), k = 1 + wave(m.swell, t), cos = Math.cos(a) * k, sin = Math.sin(a) * k;
      var tx = p.cx + wave(m.dx, t), ty = p.cy + wave(m.dy, t);
      // wash units -> canvas: slice scale, then this pool turned and swelled about its centre, then moved
      ctx.setTransform(s, 0, 0, s, ox - cr[0] * s, oy - cr[1] * s);
      ctx.transform(cos, sin, -sin, cos, tx - cos * p.cx + sin * p.cy, ty - sin * p.cx - cos * p.cy);
      ctx.fillStyle = col;
      ctx.strokeStyle = col;
      var paths = PATHS[i];
      for (var l = 0; l < paths.length; l++) {
        ctx.globalAlpha = wa;
        ctx.fill(paths[l]);
        ctx.globalAlpha = we;
        ctx.stroke(paths[l]);
      }
    }
  }

  var clock = 0, last = null, frames = 0, running = false, paused = false, raf = 0;

  function drawAll(force) {
    for (var i = 0; i < windows.length; i++) {
      if (force || windows[i].seen) { size(windows[i]); drawWindow(windows[i], clock); }
    }
    frames++;
    root.dataset.frames = frames;          // read by live.py's check: a still page stops counting
    root.dataset.clock = clock.toFixed(2);
  }

  function tick(now) {
    raf = 0;
    if (!running) return;
    if (last === null) last = now;
    var dt = now - last;
    if (dt >= 1000 / FPS - 2) {
      clock += Math.min(dt, 100) / 1000;   // a hidden tab or a slow frame never makes the wash jump
      last = now;
      drawAll(false);
    }
    raf = requestAnimationFrame(tick);
  }

  var button = document.getElementById("pause"), state = document.getElementById("state");

  function update() {
    var still = stillQ.matches;
    if (still) clock = 0;                  // Reduce Motion: the still, frame 0, and no clock
    running = !still && !paused;
    button.disabled = still;
    button.textContent = paused && !still ? "Play" : "Pause";
    button.setAttribute("aria-label", paused && !still ? "Play the wash" : "Pause the wash");
    state.textContent = still ? "Reduce Motion is on, so the wash stays still." :
      paused ? "Paused." : "Moving, slowly.";
    root.dataset.motion = still ? "reduced" : paused ? "paused" : "moving";
    drawAll(true);
    if (running && !raf) { last = null; raf = requestAnimationFrame(tick); }
    if (!running && raf) { cancelAnimationFrame(raf); raf = 0; }
  }

  button.addEventListener("click", function () { paused = !paused; update(); });
  [].forEach.call(document.querySelectorAll("input[name=palette]"), function (r) {
    r.addEventListener("change", function () { palette = r.value; setTokens(); drawAll(true); });
  });
  function listen(q, f) { if (q.addEventListener) q.addEventListener("change", f); else q.addListener(f); }
  listen(darkQ, function () { setTokens(); drawAll(true); });
  listen(stillQ, update);
  window.addEventListener("resize", function () { drawAll(true); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        windows.forEach(function (w) { if (w.el === e.target) w.seen = e.isIntersecting; });
      });
    });
    windows.forEach(function (w) { io.observe(w.el); });
  }

  // for live.py's check: the port's numbers, to compare with wash.py's
  window.PywidgetWash = {pools: POOLS, crop: crop, crc32: crc32, palettes: PALETTES, seed: SEED};

  setTokens();
  update();
})();
